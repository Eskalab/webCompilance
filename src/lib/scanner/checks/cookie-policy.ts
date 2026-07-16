import { Check, CheckResult, ScanContext } from '../types';

// Política de cookies: documento que lista qué cookies usa el sitio y con qué finalidad.
// Complementa el banner de consentimiento (posición SIC: Boletín 2016, Res. 32126/2022).

const URL_KEYWORDS = [
  'cookie-policy', 'cookies-policy', 'politica-cookies', 'politica-de-cookies', 'uso-de-cookies',
];

const TEXT_KEYWORDS = [
  'política de cookies', 'politica de cookies', 'cookie policy', 'uso de cookies',
  'aviso de cookies', 'cookie notice', 'política de cookies',
];

export const cookiePolicyCheck: Check = {
  id: 'cookie_policy',
  label: 'Cookie Policy',
  tier: 'free',
  description: 'Checks that your site has a cookie policy explaining which cookies it uses and why.',
  weight: 3,

  async run(context: ScanContext): Promise<CheckResult> {
    const { allLinks, sitemapUrls } = context;

    for (const link of allLinks) {
      const lowerText = link.text.toLowerCase();
      const lowerHref = link.href.toLowerCase();
      if (TEXT_KEYWORDS.some((kw) => lowerText.includes(kw)) || URL_KEYWORDS.some((kw) => lowerHref.includes(kw))) {
        return {
          checkId: this.id,
          status: 'pass',
          label: this.label,
          labelEs: 'Política de Cookies',
          details: `Cookie policy link found: "${link.text}" → ${link.href} (location: ${link.location}).`,
          detailsEs: `Enlace de política de cookies encontrado: "${link.text}" → ${link.href} (ubicación: ${link.location}).`,
          suggestion: '',
          suggestionEs: '',
          tier: this.tier,
          weight: this.weight,
          meta: { href: link.href, text: link.text, location: link.location },
        };
      }
    }

    for (const url of sitemapUrls) {
      const lower = url.toLowerCase();
      if (URL_KEYWORDS.some((kw) => lower.includes(kw))) {
        return {
          checkId: this.id,
          status: 'pass',
          label: this.label,
          labelEs: 'Política de Cookies',
          details: `Cookie policy page found in sitemap: ${url}.`,
          detailsEs: `Página de política de cookies encontrada en el sitemap: ${url}.`,
          suggestion: 'Consider adding a visible link to your cookie policy in the site footer or cookie banner.',
          suggestionEs: 'Considera agregar un enlace visible a tu política de cookies en el footer o en el banner de cookies.',
          tier: this.tier,
          weight: this.weight,
          meta: { sitemapUrl: url },
        };
      }
    }

    return {
      checkId: this.id,
      status: 'fail',
      label: this.label,
      labelEs: 'Política de Cookies',
      details: 'No cookie policy detected. If your site uses cookies that collect personal data, the SIC requires informing which cookies are used and for what purpose.',
      detailsEs: 'No se detectó política de cookies. Si tu sitio usa cookies que recolectan datos personales, la SIC exige informar qué cookies se usan y con qué finalidad.',
      suggestion: 'Create a cookie policy page listing each cookie (own and third-party), its purpose and duration. Link it from your cookie consent banner and footer.',
      suggestionEs: 'Crea una página de política de cookies que liste cada cookie (propia y de terceros), su finalidad y duración. Enlázala desde el banner de consentimiento y el footer.',
      tier: this.tier,
      weight: this.weight,
      meta: {},
    };
  },
};
