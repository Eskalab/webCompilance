import { Check, CheckResult, ScanContext } from '../types';

const PRIVACY_URL_KEYWORDS = [
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
  'política de privacidade',
];

export const privacyPolicyCheck: Check = {
  id: 'privacy_policy',
  label: 'Privacy Policy',
  tier: 'free',
  description: 'Checks that your site has a designated privacy policy page that is accessible.',
  weight: 10,

  async run(context: ScanContext): Promise<CheckResult> {
    const { allLinks, sitemapUrls } = context;

    // 1. Search links by anchor text (most reliable)
    for (const link of allLinks) {
      const lowerText = link.text.toLowerCase();
      if (PRIVACY_TEXT_KEYWORDS.some((kw) => lowerText.includes(kw))) {
        return {
          checkId: this.id,
          status: 'pass',
          label: this.label,
          labelEs: 'Política de Privacidad',
          details: `Privacy policy link found: "${link.text}" → ${link.href} (location: ${link.location}).`,
          detailsEs: `Enlace de política de privacidad encontrado: "${link.text}" → ${link.href} (ubicación: ${link.location}).`,
          suggestion: '',
          suggestionEs: '',
          tier: this.tier,
          weight: this.weight,
          meta: { href: link.href, text: link.text, location: link.location },
        };
      }
    }

    // 2. Search links by href keywords
    for (const link of allLinks) {
      const lowerHref = link.href.toLowerCase();
      if (PRIVACY_URL_KEYWORDS.some((kw) => lowerHref.includes(kw))) {
        return {
          checkId: this.id,
          status: 'pass',
          label: this.label,
          labelEs: 'Política de Privacidad',
          details: `Privacy policy link found in URL: ${link.href} (location: ${link.location}).`,
          detailsEs: `Enlace de política de privacidad encontrado en URL: ${link.href} (ubicación: ${link.location}).`,
          suggestion: '',
          suggestionEs: '',
          tier: this.tier,
          weight: this.weight,
          meta: { href: link.href, location: link.location },
        };
      }
    }

    // 3. Search sitemap
    for (const url of sitemapUrls) {
      const lower = url.toLowerCase();
      if (PRIVACY_URL_KEYWORDS.some((kw) => lower.includes(kw))) {
        return {
          checkId: this.id,
          status: 'pass',
          label: this.label,
          labelEs: 'Política de Privacidad',
          details: `Privacy policy page found in sitemap: ${url}.`,
          detailsEs: `Página de política de privacidad encontrada en el sitemap: ${url}.`,
          suggestion: 'Consider adding a visible link to your privacy policy in your site footer for easy access.',
          suggestionEs: 'Considera agregar un enlace visible a tu política de privacidad en el footer de tu sitio para fácil acceso.',
          tier: this.tier,
          weight: this.weight,
          meta: { sitemapUrl: url },
        };
      }
    }

    // 4. Not found
    return {
      checkId: this.id,
      status: 'fail',
      label: this.label,
      labelEs: 'Política de Privacidad',
      details: 'No privacy policy page detected. We checked your page links, URLs, and sitemap.',
      detailsEs: 'No se detectó página de política de privacidad. Revisamos los enlaces de tu página, URLs y sitemap.',
      suggestion: 'Create a privacy policy page and add a visible link in your site footer. Most LATAM data protection laws (Ley 1581 in Colombia, LGPD in Brazil, etc.) require this.',
      suggestionEs: 'Crea una página de política de privacidad y agrega un enlace visible en el footer de tu sitio. La mayoría de leyes de protección de datos en LATAM (Ley 1581 en Colombia, LGPD en Brasil, etc.) lo requieren.',
      tier: this.tier,
      weight: this.weight,
      meta: {},
    };
  },
};
