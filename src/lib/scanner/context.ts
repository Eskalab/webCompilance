import { ScanContext, LinkInfo } from './types';
import { htmlToText, documentText } from './legal/html-to-text';
import { isPdf, extractPdfText } from './pdf';
import { renderPage } from './render';

function countAnchors(html: string): number {
  return (html.match(/<a\b/gi) ?? []).length;
}

// El fetch plano no sirvió si vino casi vacío (bloqueo) o con muy pocos links
// (shell que arma su contenido con JavaScript).
function needsRender(html: string): boolean {
  return html.length < 2000 || countAnchors(html) < 5;
}

// Cabeceras de navegador real: muchos WAFs bloquean cualquier petición que no
// "vista" de navegador (User-Agent no-browser, sin Accept-Language, etc.) en el
// primer acceso. Esto no falsea la huella TLS —eso solo lo da el navegador real
// (render.ts)— pero sí evita los bloqueos simples por User-Agent.
const BROWSER_HEADERS: Record<string, string> = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
  'Accept-Language': 'es-CO,es;q=0.9,en;q=0.8',
  'Sec-CH-UA': '"Google Chrome";v="126", "Chromium";v="126", "Not.A/Brand";v="24"',
  'Sec-CH-UA-Mobile': '?0',
  'Sec-CH-UA-Platform': '"macOS"',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Sec-Fetch-User': '?1',
  'Upgrade-Insecure-Requests': '1',
};
const TIMEOUT_HTML = 10000;
const TIMEOUT_OTHER = 5000;

export async function buildContext(targetUrl: string): Promise<ScanContext> {
  const errors: string[] = [];

  const htmlResult = await fetchWithTimeoutFull(targetUrl, TIMEOUT_HTML).catch((reason) => {
    errors.push(`Failed to fetch homepage: ${reason}`);
    return { text: '', headers: {}, finalUrl: targetUrl };
  });

  let { text: html, finalUrl } = htmlResult;
  const { headers: responseHeaders } = htmlResult;

  // Hybrid fallback: if the plain fetch came back empty (blocked) or as a JS
  // shell (few links), re-render with a headless browser to get the real DOM.
  let didRenderHome = false;
  if (needsRender(html)) {
    const r = await renderPage(targetUrl);
    if (r && countAnchors(r.html) > countAnchors(html)) {
      html = r.html;
      finalUrl = r.finalUrl;
      didRenderHome = true;
      errors.push('Rendered with headless browser (plain fetch was empty or a JS shell)');
    }
  }

  const origin = new URL(finalUrl).origin;

  const [robotsRes, sitemapRes] = await Promise.allSettled([
    fetchWithTimeout(`${origin}/robots.txt`, TIMEOUT_OTHER),
    fetchWithTimeout(`${origin}/sitemap.xml`, TIMEOUT_OTHER),
  ]);

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
  let allLinks = extractLinks(html);

  // Try to fetch privacy policy content for cross-reference checks
  let privacyUrl = findPrivacyPolicyUrl(allLinks, sitemapUrls, origin);

  // Second chance: policy links often live in a JS-rendered footer. If the plain
  // HTML had no policy link and we haven't rendered yet, render and retry.
  if (!privacyUrl && !didRenderHome) {
    const r = await renderPage(targetUrl);
    if (r && countAnchors(r.html) > countAnchors(html)) {
      html = r.html;
      didRenderHome = true;
      allLinks = extractLinks(html);
      privacyUrl = findPrivacyPolicyUrl(allLinks, sitemapUrls, origin);
      if (privacyUrl) errors.push('Homepage rendered to find policy link (JS footer)');
    }
  }
  let privacyPolicyContent = '';
  if (privacyUrl) {
    try {
      privacyPolicyContent = await fetchWithTimeout(privacyUrl, TIMEOUT_OTHER);
    } catch {
      errors.push(`Failed to fetch privacy policy: ${privacyUrl}`);
    }

    // If the policy page reads like a shell (blocked, or a SPA that loads its
    // text via JS/API → few legal terms), render it. PDFs are already readable.
    if (
      !/\.pdf(?:$|\?)/i.test(privacyUrl) &&
      countLegalTerms(documentText(privacyPolicyContent)) < 3
    ) {
      const rendered = await renderPage(privacyUrl);
      if (
        rendered &&
        countLegalTerms(documentText(rendered.html)) >
          countLegalTerms(documentText(privacyPolicyContent))
      ) {
        privacyPolicyContent = rendered.html;
        errors.push('Policy page rendered with headless browser');
      }
    }

    // Hub detection + drill-down: business groups (e.g. banks) link an *index*
    // of per-entity policies instead of the policy itself. If the fetched page
    // reads like an index (low legal density + several policy links), follow one
    // level deeper to the entity that matches the domain brand.
    const drilled = await drillIntoPolicyHub(privacyPolicyContent, privacyUrl, origin);
    if (drilled) {
      errors.push(`Policy hub detected at ${privacyUrl}; drilled into ${drilled.url}`);
      privacyUrl = drilled.url;
      privacyPolicyContent = drilled.content;
    }
  }

  return {
    url: finalUrl,
    html,
    robotsTxt,
    sitemapUrls,
    privacyPolicyContent,
    privacyPolicyUrl: privacyUrl,
    allLinks,
    fetchErrors: errors,
    responseHeaders,
  };
}

// Core art. 13 vocabulary; a real policy is saturated with these, an index is not.
const LEGAL_TERMS = [
  /\bfinalidad(?:es)?\b/i,
  /\btratamiento\b/i,
  /\btitular(?:es)?\b/i,
  /\bautoriza/i,
  /\bsupr(?:imir|esi[oó]n)\b/i,
  /\bhabeas\s*data\b/i,
  /\brectifica/i,
  /\bresponsable del tratamiento\b/i,
];

function countLegalTerms(text: string): number {
  return LEGAL_TERMS.filter((re) => re.test(text)).length;
}

// Returns the drilled-down policy if the given content is an index/hub, else null.
async function drillIntoPolicyHub(
  content: string,
  currentUrl: string,
  origin: string,
): Promise<{ url: string; content: string } | null> {
  const text = documentText(content);
  // A real policy already has plenty of legal vocabulary — leave it alone.
  if (countLegalTerms(text) >= 4) return null;

  // Collect policy-like links inside this page (excluding a self-link).
  const policyLinks = extractLinks(content)
    .filter((l) => {
      const t = l.text.toLowerCase();
      const h = l.href.toLowerCase();
      return (
        PRIVACY_TEXT_KEYWORDS.some((kw) => t.includes(kw)) ||
        PRIVACY_KEYWORDS.some((kw) => h.includes(kw))
      );
    })
    .map((l) => resolveUrl(l.href, origin))
    .filter((u) => u !== currentUrl);

  const unique = [...new Set(policyLinks)];
  // Fewer than 2 policy links → it's not an index, just a thin/JS page.
  if (unique.length < 2) return null;

  // Prefer the entity that matches the domain brand (bancolombia.com → "bancolombia-sa").
  const brand = new URL(origin).hostname.replace(/^www\./, '').split('.')[0];
  const ordered = [
    ...unique.filter((u) => u.toLowerCase().includes(brand)),
    ...unique.filter((u) => !u.toLowerCase().includes(brand)),
  ];

  for (const candidate of ordered) {
    try {
      const fetched = await fetchWithTimeout(candidate, TIMEOUT_OTHER);
      if (countLegalTerms(documentText(fetched)) >= 4) {
        return { url: candidate, content: fetched };
      }
    } catch {
      // try next candidate
    }
  }
  return null;
}

type RawResponse = {
  ok: boolean;
  status: number;
  body: Buffer;
  headers: Record<string, string>;
  finalUrl: string;
};

function bufferToArrayBuffer(buf: Buffer): ArrayBuffer {
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

// Fetch en dos capas: primero fetch nativo (rápido); si el sitio lo bloquea
// (403 anti-bot) o falla la conexión, reintenta con got-scraping, que imita la
// huella TLS + headers de un navegador real y pasa la mayoría de WAFs simples
// SIN pagar el costo de un navegador headless. Solo si ambas fallan se queda sin
// contenido (y el caller decide si vale la pena renderizar).
async function fetchRaw(url: string, timeout: number): Promise<RawResponse> {
  // Capa 1 — fetch nativo.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: BROWSER_HEADERS,
      redirect: 'follow',
    });
    if (res.ok) {
      const headers: Record<string, string> = {};
      res.headers.forEach((value, key) => {
        headers[key.toLowerCase()] = value;
      });
      return {
        ok: true,
        status: res.status,
        body: Buffer.from(await res.arrayBuffer()),
        headers,
        finalUrl: res.url || url,
      };
    }
    // No-ok (403, 401, 429…): cae a got-scraping.
  } catch {
    // Error de red / abort: cae a got-scraping.
  } finally {
    clearTimeout(timer);
  }

  // Capa 2 — got-scraping (fingerprint de navegador, sin headless).
  try {
    const { gotScraping } = await import('got-scraping');
    const res = await gotScraping({
      url,
      timeout: { request: timeout },
      responseType: 'buffer',
      throwHttpErrors: false,
      followRedirect: true,
    });
    const headers: Record<string, string> = {};
    for (const [key, value] of Object.entries(res.headers)) {
      headers[key.toLowerCase()] = Array.isArray(value) ? value.join(', ') : String(value ?? '');
    }
    return {
      ok: res.statusCode >= 200 && res.statusCode < 400,
      status: res.statusCode,
      body: res.body as Buffer,
      headers,
      finalUrl: res.url || url,
    };
  } catch {
    return { ok: false, status: 0, body: Buffer.alloc(0), headers: {}, finalUrl: url };
  }
}

async function fetchWithTimeout(url: string, timeout: number): Promise<string> {
  const res = await fetchRaw(url, timeout);
  if (!res.ok) return '';
  // Policies published as PDF: extract text so the rubric can read them.
  if (isPdf(url, res.headers['content-type'] ?? '')) {
    return await extractPdfText(bufferToArrayBuffer(res.body));
  }
  return res.body.toString('utf-8');
}

async function fetchWithTimeoutFull(
  url: string,
  timeout: number,
): Promise<{ text: string; headers: Record<string, string>; finalUrl: string }> {
  const res = await fetchRaw(url, timeout);
  if (!res.ok) return { text: '', headers: {}, finalUrl: url };
  return { text: res.body.toString('utf-8'), headers: res.headers, finalUrl: res.finalUrl };
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
    // hrefs come HTML-encoded (&amp; / &#38; / &#x26;); decode or fetch fails
    const href = match[1]
      .replace(/&amp;/gi, '&')
      .replace(/&#38;/g, '&')
      .replace(/&#x26;/gi, '&');
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
  'tratamiento-de-datos', 'tratamiento-datos',
  'proteccion-datos', 'proteccion-de-datos', 'proteccion-de-datos-personales',
];

const PRIVACY_TEXT_KEYWORDS = [
  'privacidad', 'privacy', 'privacidade',
  'política de privacidad', 'privacy policy',
  'aviso de privacidad', 'protección de datos',
  'datos personales', 'habeas data',
  'tratamiento de datos', 'proteção de dados',
];

// Nombres fuertes del documento (título de la política) vs. menciones sueltas.
const STRONG_TEXT_KEYWORDS = [
  'política de privacidad', 'politica de privacidad',
  'política de tratamiento', 'politica de tratamiento',
  'aviso de privacidad', 'privacy policy', 'habeas data',
  'tratamiento de datos', 'protección de datos', 'proteccion de datos',
  'política de datos', 'politica de datos', 'proteção de dados',
];
const WEAK_TEXT_KEYWORDS = ['datos personales', 'privacidad', 'privacy', 'privacidade'];

// Rutas que NO son una política (cuenta de usuario, login, registro).
const NON_POLICY_PATH = /\/(?:my-account|mi-cuenta|account|cuenta|login|sign-?in|registro|register|crear?-?cuenta|creatucuenta|update-profile|perfil|profile)\b/i;
// Documentos de autorización puntual de un formulario (no la política general).
const OPTIN_HINT = /(?:opt-?in|autorizaci[oó]n|consentimiento|call-?back)/i;

// Puntúa un link como candidato a "la Política". Mayor = mejor. -Infinity = no aplica.
function scorePolicyLink(link: LinkInfo, origin: string): number {
  const text = link.text.toLowerCase().trim();
  const resolved = resolveUrl(link.href, origin);
  const href = resolved.toLowerCase();

  const strong = STRONG_TEXT_KEYWORDS.some((kw) => text.includes(kw));
  const weak = WEAK_TEXT_KEYWORDS.some((kw) => text.includes(kw));
  const hrefKw = PRIVACY_KEYWORDS.some((kw) => href.includes(kw));
  if (!strong && !weak && !hrefKw) return -Infinity; // ni siquiera es candidato

  let score = 0;
  if (strong) score += 10;        // el texto ES el nombre del documento
  else if (weak) score += 3;      // solo menciona "datos personales", etc.
  if (hrefKw) score += 4;         // la URL contiene un slug de política

  // Ubicación: la política vive en el footer.
  score += link.location === 'footer' ? 4 : link.location === 'nav' ? 2 : 0;

  // Un título es corto; una oración larga suele ser un texto de consentimiento.
  const words = text.split(/\s+/).filter(Boolean).length;
  if (words > 0 && words <= 5) score += 2;
  else if (words > 10) score -= 5;

  // Penalizaciones.
  if (NON_POLICY_PATH.test(href)) score -= 8;   // link de cuenta/login
  if (OPTIN_HINT.test(href)) score -= 6;        // PDF de opt-in de un formulario
  try {
    if (new URL(resolved).host !== new URL(origin).host) score -= 6; // dominio externo
  } catch {
    /* href inválido: sin penalización de dominio */
  }
  return score;
}

function findPrivacyPolicyUrl(
  links: LinkInfo[],
  sitemapUrls: string[],
  origin: string,
): string | null {
  // Ranking: puntuar todos los candidatos y quedarse con el mejor, en vez de
  // tomar el primero que aparezca (que podía ser un link de cuenta, un opt-in
  // de formulario o un dominio externo).
  let best: string | null = null;
  let bestScore = 0; // exigir puntaje positivo
  for (const link of links) {
    const score = scorePolicyLink(link, origin);
    if (score > bestScore) {
      bestScore = score;
      best = resolveUrl(link.href, origin);
    }
  }
  if (best) return best;

  // Fallback: sitemap, excluyendo rutas de cuenta/opt-in.
  for (const url of sitemapUrls) {
    const lower = url.toLowerCase();
    if (
      PRIVACY_KEYWORDS.some((kw) => lower.includes(kw)) &&
      !NON_POLICY_PATH.test(lower) &&
      !OPTIN_HINT.test(lower)
    ) {
      return url;
    }
  }

  return null;
}

function resolveUrl(href: string, origin: string): string {
  if (href.startsWith('http')) return href;
  return `${origin}${href.startsWith('/') ? '' : '/'}${href}`;
}
