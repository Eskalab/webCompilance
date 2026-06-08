import { ScanContext, LinkInfo } from './types';

const USER_AGENT = 'TDE-LegalScanner/1.0';
const TIMEOUT_HTML = 10000;
const TIMEOUT_OTHER = 5000;

export async function buildContext(targetUrl: string): Promise<ScanContext> {
  const origin = new URL(targetUrl).origin;
  const errors: string[] = [];

  const [htmlFetch, robotsRes, sitemapRes] = await Promise.allSettled([
    fetchWithTimeoutFull(targetUrl, TIMEOUT_HTML),
    fetchWithTimeout(`${origin}/robots.txt`, TIMEOUT_OTHER),
    fetchWithTimeout(`${origin}/sitemap.xml`, TIMEOUT_OTHER),
  ]);

  const { text: html, headers: responseHeaders } =
    htmlFetch.status === 'fulfilled'
      ? htmlFetch.value
      : { text: '', headers: {} };
  if (htmlFetch.status === 'rejected') errors.push(`Failed to fetch homepage: ${htmlFetch.reason}`);

  const robotsTxt = extractResult(robotsRes, errors, 'robots.txt');
  let sitemapXml = extractResult(sitemapRes, errors, 'sitemap.xml');

  // If robots.txt points to a different sitemap URL, fetch that too
  const sitemapFromRobots = extractSitemapUrl(robotsTxt);
  if (sitemapFromRobots && sitemapFromRobots !== `${origin}/sitemap.xml`) {
    try {
      const extra = await fetchWithTimeout(sitemapFromRobots, TIMEOUT_OTHER);
      sitemapXml += '\n' + extra;
    } catch {
      errors.push(`Failed to fetch sitemap from robots.txt: ${sitemapFromRobots}`);
    }
  }

  const sitemapUrls = parseSitemapUrls(sitemapXml);
  const allLinks = extractLinks(html);

  // Try to fetch privacy policy content for cross-reference checks
  const privacyUrl = findPrivacyPolicyUrl(allLinks, sitemapUrls, origin);
  let privacyPolicyContent = '';
  if (privacyUrl) {
    try {
      privacyPolicyContent = await fetchWithTimeout(privacyUrl, TIMEOUT_OTHER);
    } catch {
      errors.push(`Failed to fetch privacy policy: ${privacyUrl}`);
    }
  }

  return {
    url: targetUrl,
    html,
    robotsTxt,
    sitemapUrls,
    privacyPolicyContent,
    allLinks,
    fetchErrors: errors,
    responseHeaders,
  };
}

async function fetchWithTimeout(url: string, timeout: number): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': USER_AGENT },
      redirect: 'follow',
    });
    if (!res.ok) return '';
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

async function fetchWithTimeoutFull(
  url: string,
  timeout: number,
): Promise<{ text: string; headers: Record<string, string> }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': USER_AGENT },
      redirect: 'follow',
    });
    if (!res.ok) return { text: '', headers: {} };
    const text = await res.text();
    const headers: Record<string, string> = {};
    res.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });
    return { text, headers };
  } finally {
    clearTimeout(timer);
  }
}

function extractResult(
  result: PromiseSettledResult<string>,
  errors: string[],
  label: string,
): string {
  if (result.status === 'fulfilled') return result.value;
  errors.push(`Failed to fetch ${label}: ${result.reason}`);
  return '';
}

function extractSitemapUrl(robotsTxt: string): string | null {
  const match = robotsTxt.match(/^Sitemap:\s*(.+)$/im);
  return match ? match[1].trim() : null;
}

function parseSitemapUrls(xml: string): string[] {
  if (!xml) return [];
  const urls: string[] = [];
  const regex = /<loc>\s*(https?:\/\/[^<]+)\s*<\/loc>/gi;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1].trim());
  }
  return urls;
}

export function extractLinks(html: string): LinkInfo[] {
  if (!html) return [];

  const links: LinkInfo[] = [];
  const linkRegex = /<a\s[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;

  // Determine footer/nav zones
  const footerStart = html.search(/<footer[\s>]/i);
  const navStart = html.search(/<nav[\s>]/i);

  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1];
    const text = match[2].replace(/<[^>]+>/g, '').trim();
    const pos = match.index;

    let location: LinkInfo['location'] = 'body';
    if (footerStart !== -1 && pos > footerStart) location = 'footer';
    else if (navStart !== -1 && pos > navStart && (footerStart === -1 || pos < footerStart)) location = 'nav';

    links.push({ href, text, location });
  }

  return links;
}

const PRIVACY_KEYWORDS = [
  'privacidad', 'privacy', 'privacidade',
  'datos-personales', 'data-protection', 'protecao-de-dados',
  'habeas-data', 'aviso-de-privacidad', 'politica-de-privacidade',
  'tratamiento-de-datos',
];

const PRIVACY_TEXT_KEYWORDS = [
  'privacidad', 'privacy', 'privacidade',
  'política de privacidad', 'privacy policy',
  'aviso de privacidad', 'protección de datos',
  'datos personales', 'habeas data',
  'tratamiento de datos', 'proteção de dados',
];

function findPrivacyPolicyUrl(
  links: LinkInfo[],
  sitemapUrls: string[],
  origin: string,
): string | null {
  // 1. Search links by anchor text
  for (const link of links) {
    const lowerText = link.text.toLowerCase();
    if (PRIVACY_TEXT_KEYWORDS.some((kw) => lowerText.includes(kw))) {
      return resolveUrl(link.href, origin);
    }
  }

  // 2. Search links by href
  for (const link of links) {
    const lowerHref = link.href.toLowerCase();
    if (PRIVACY_KEYWORDS.some((kw) => lowerHref.includes(kw))) {
      return resolveUrl(link.href, origin);
    }
  }

  // 3. Search sitemap URLs
  for (const url of sitemapUrls) {
    const lower = url.toLowerCase();
    if (PRIVACY_KEYWORDS.some((kw) => lower.includes(kw))) {
      return url;
    }
  }

  return null;
}

function resolveUrl(href: string, origin: string): string {
  if (href.startsWith('http')) return href;
  return `${origin}${href.startsWith('/') ? '' : '/'}${href}`;
}
