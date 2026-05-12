import { Check, CheckResult, ScanContext } from '../types';

const HTML_PATTERNS: Record<string, RegExp> = {
  'cookie-consent': /(?:class|id)\s*=\s*["'][^"']*cookie[-_]?consent[^"']*["']/i,
  'cookie-banner': /(?:class|id)\s*=\s*["'][^"']*cookie[-_]?banner[^"']*["']/i,
  'cookie-notice': /(?:class|id)\s*=\s*["'][^"']*cookie[-_]?notice[^"']*["']/i,
  'cc-window': /(?:class|id)\s*=\s*["'][^"']*cc[-_]window[^"']*["']/i,
  'CookieConsent': /CookieConsent/i,
  'Cookiebot': /Cookiebot/i,
  'Complianz': /cmplz[-_]/i,
  'Iubenda': /iubenda/i,
  'Osano': /osano/i,
  'OneTrust': /onetrust/i,
  'Termly': /termly/i,
};

export const cookieBannerCheck: Check = {
  id: 'cookie_banner',
  label: 'Cookie Consent Banner',
  tier: 'free',
  description: 'Detects whether your site displays a cookie consent banner to visitors.',
  weight: 9,

  async run(context: ScanContext): Promise<CheckResult> {
    const { html } = context;

    if (!html) {
      return {
        checkId: this.id,
        status: 'skip',
        label: this.label,
        labelEs: 'Banner de Consentimiento de Cookies',
        details: 'Could not fetch the page to scan for cookie banners.',
        detailsEs: 'No se pudo obtener la página para buscar banners de cookies.',
        suggestion: 'Make sure your site is publicly accessible.',
        suggestionEs: 'Asegúrate de que tu sitio sea accesible públicamente.',
        tier: this.tier,
        weight: this.weight,
        meta: {},
      };
    }

    const found: string[] = [];
    for (const [name, regex] of Object.entries(HTML_PATTERNS)) {
      if (regex.test(html)) {
        found.push(name);
      }
    }

    if (found.length > 0) {
      return {
        checkId: this.id,
        status: 'pass',
        label: this.label,
        labelEs: 'Banner de Consentimiento de Cookies',
        details: `Cookie consent banner detected (patterns: ${found.join(', ')}).`,
        detailsEs: `Banner de consentimiento de cookies detectado (patrones: ${found.join(', ')}).`,
        suggestion: '',
        suggestionEs: '',
        tier: this.tier,
        weight: this.weight,
        meta: { patterns: found },
      };
    }

    return {
      checkId: this.id,
      status: 'fail',
      label: this.label,
      labelEs: 'Banner de Consentimiento de Cookies',
      details: 'No cookie consent banner detected. Visitors are not being informed about cookie usage.',
      detailsEs: 'No se detectó banner de consentimiento de cookies. Los visitantes no están siendo informados sobre el uso de cookies.',
      suggestion: 'Add a cookie consent banner to your site. Popular solutions include CookieBot, CookieYes, Complianz, or OneTrust. These inform visitors about cookies and let them accept or reject tracking.',
      suggestionEs: 'Agrega un banner de consentimiento de cookies a tu sitio. Soluciones populares incluyen CookieBot, CookieYes, Complianz u OneTrust. Estos informan a los visitantes sobre las cookies y les permiten aceptar o rechazar el rastreo.',
      tier: this.tier,
      weight: this.weight,
      meta: {},
    };
  },
};
