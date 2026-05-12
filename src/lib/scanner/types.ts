export interface ScanContext {
  url: string;
  html: string;
  robotsTxt: string;
  sitemapUrls: string[];
  privacyPolicyContent: string;
  allLinks: LinkInfo[];
  fetchErrors: string[];
}

export interface LinkInfo {
  href: string;
  text: string;
  location: 'footer' | 'nav' | 'body';
}

export interface CheckResult {
  checkId: string;
  status: 'pass' | 'fail' | 'warn' | 'skip';
  label: string;
  labelEs: string;
  details: string;
  detailsEs: string;
  suggestion: string;
  suggestionEs: string;
  tier: 'free' | 'premium';
  weight: number;
  meta: Record<string, unknown>;
}

export interface ScanResponse {
  id: string;
  url: string;
  scannedAt: string;
  score: number;
  checks: CheckResult[];
  summary: {
    total: number;
    pass: number;
    warn: number;
    fail: number;
  };
}

export interface Check {
  id: string;
  label: string;
  tier: 'free' | 'premium';
  description: string;
  weight: number;
  run(context: ScanContext): Promise<CheckResult>;
}
