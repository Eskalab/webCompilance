import { Check, CheckResult, ScanResponse } from './types';
import { buildContext } from './context';
import { sslCheck } from './checks/ssl';
import { cookieBannerCheck } from './checks/cookie-banner';
import { privacyPolicyCheck } from './checks/privacy-policy';
import { legalPagesCheck } from './checks/legal-pages';
import { thirdPartyCheck } from './checks/third-party';
import { formsConsentCheck } from './checks/forms-consent';
import { mixedContentCheck } from './checks/mixed-content';
import { formSecurityCheck } from './checks/form-security';
import { securityHeadersCheck } from './checks/security-headers';
import { createHash } from 'crypto';
import { prisma } from '@/lib/db';
import { analyzeLegal } from './legal/analyze';

const checks: Check[] = [
  sslCheck,
  mixedContentCheck,
  formSecurityCheck,
  securityHeadersCheck,
  thirdPartyCheck,
  cookieBannerCheck,
  privacyPolicyCheck,
  legalPagesCheck,
  formsConsentCheck,
];

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

export async function runScan(url: string): Promise<ScanResponse> {
  const cacheKey = createHash('sha256').update(url).digest('hex').slice(0, 12);

  // Check DB cache
  const cached = await prisma.scan.findUnique({ where: { id: cacheKey } });
  if (cached && Date.now() - cached.scannedAt.getTime() < CACHE_TTL_MS) {
    return {
      id: cached.id,
      url: cached.url,
      scannedAt: cached.scannedAt.toISOString(),
      score: cached.score,
      checks: cached.checks as unknown as CheckResult[],
      summary: cached.summary as unknown as ScanResponse['summary'],
    };
  }

  const context = await buildContext(url);
  const results: CheckResult[] = [];

  for (const check of checks) {
    const result = await check.run(context);
    results.push(result);
  }

  const score = calculateScore(results);
  const now = new Date();

  const summary = {
    total: results.length,
    pass: results.filter((r) => r.status === 'pass').length,
    warn: results.filter((r) => r.status === 'warn').length,
    fail: results.filter((r) => r.status === 'fail').length,
  };

  // Análisis legal detallado (Ley 1581 / D.1377) — solo backend, no va en ScanResponse
  const legalAnalysis = JSON.parse(JSON.stringify(analyzeLegal(context)));

  // Persist to DB
  await prisma.scan.upsert({
    where: { id: cacheKey },
    update: { url, score, summary, checks: JSON.parse(JSON.stringify(results)), legalAnalysis, scannedAt: now },
    create: { id: cacheKey, url, score, summary, checks: JSON.parse(JSON.stringify(results)), legalAnalysis, scannedAt: now },
  });

  return {
    id: cacheKey,
    url,
    scannedAt: now.toISOString(),
    score,
    checks: results,
    summary,
  };
}

export async function getScanById(id: string): Promise<ScanResponse | null> {
  const scan = await prisma.scan.findUnique({ where: { id } });
  if (!scan) return null;

  return {
    id: scan.id,
    url: scan.url,
    scannedAt: scan.scannedAt.toISOString(),
    score: scan.score,
    checks: scan.checks as unknown as CheckResult[],
    summary: scan.summary as unknown as ScanResponse['summary'],
  };
}

function calculateScore(results: CheckResult[]): number {
  let totalWeight = 0;
  let earned = 0;

  for (const result of results) {
    if (result.status === 'skip') continue;

    totalWeight += result.weight;

    if (result.status === 'pass') {
      earned += result.weight;
    } else if (result.status === 'warn') {
      earned += result.weight * 0.5;
    }
  }

  if (totalWeight === 0) return 0;
  return Math.round((earned / totalWeight) * 100);
}
