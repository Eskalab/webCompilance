import { Check, CheckResult, ScanContext } from '../types';

interface LegalPage {
  name: string;
  nameEs: string;
  urlKeywords: string[];
  textKeywords: string[];
}

const LEGAL_PAGES: LegalPage[] = [
  {
    name: 'Terms of Service',
    nameEs: 'Términos de Servicio',
    urlKeywords: ['terminos', 'terms', 'termos', 'condiciones', 'conditions', 'aviso-legal', 'legal-notice'],
    textKeywords: [
      'términos', 'condiciones', 'terms', 'aviso legal',
      'términos de servicio', 'terms of service', 'terms of use',
      'termos de uso', 'termos de serviço', 'condiciones generales',
      'términos y condiciones', 'terms and conditions',
    ],
  },
  {
    name: 'Cookie Policy',
    nameEs: 'Política de Cookies',
    urlKeywords: ['cookie-policy', 'cookies-policy', 'politica-cookies', 'uso-de-cookies'],
    textKeywords: [
      'política de cookies', 'cookie policy', 'uso de cookies',
      'aviso de cookies', 'cookie notice',
    ],
  },
  {
    name: 'Data Subject Rights',
    nameEs: 'Derechos del Titular',
    urlKeywords: ['derechos', 'rights', 'direitos', 'arco', 'ejercer-derechos'],
    textKeywords: [
      'derechos arco', 'derechos del titular', 'ejercer derechos',
      'data subject rights', 'your rights', 'direitos do titular',
      'sus derechos', 'tus derechos',
    ],
  },
];

export const legalPagesCheck: Check = {
  id: 'legal_pages',
  label: 'Required Legal Pages',
  tier: 'free',
  description: 'Checks for common legal pages: terms of service, cookie policy, data subject rights.',
  weight: 7,

  async run(context: ScanContext): Promise<CheckResult> {
    const { allLinks, sitemapUrls } = context;
    const found: string[] = [];
    const foundEs: string[] = [];
    const missing: string[] = [];
    const missingEs: string[] = [];
    const foundDetails: Record<string, string> = {};

    for (const page of LEGAL_PAGES) {
      const result = findPage(page, allLinks, sitemapUrls);
      if (result) {
        found.push(page.name);
        foundEs.push(page.nameEs);
        foundDetails[page.name] = result;
      } else {
        missing.push(page.name);
        missingEs.push(page.nameEs);
      }
    }

    if (missing.length === 0) {
      return {
        checkId: this.id,
        status: 'pass',
        label: this.label,
        labelEs: 'Páginas Legales Requeridas',
        details: `All ${LEGAL_PAGES.length} legal pages found: ${found.join(', ')}.`,
        detailsEs: `Las ${LEGAL_PAGES.length} páginas legales encontradas: ${foundEs.join(', ')}.`,
        suggestion: '',
        suggestionEs: '',
        tier: this.tier,
        weight: this.weight,
        meta: { found: foundDetails },
      };
    }

    if (found.length > 0) {
      return {
        checkId: this.id,
        status: 'warn',
        label: this.label,
        labelEs: 'Páginas Legales Requeridas',
        details: `Found ${found.length} of ${LEGAL_PAGES.length} legal pages. Missing: ${missing.join(', ')}.`,
        detailsEs: `Se encontraron ${found.length} de ${LEGAL_PAGES.length} páginas legales. Faltan: ${missingEs.join(', ')}.`,
        suggestion: `Create the missing pages (${missing.join(', ')}) and add links in your site footer. These are required or recommended by most LATAM data protection regulations.`,
        suggestionEs: `Crea las páginas faltantes (${missingEs.join(', ')}) y agrega enlaces en el footer de tu sitio. Son requeridas o recomendadas por la mayoría de regulaciones de protección de datos en LATAM.`,
        tier: this.tier,
        weight: this.weight,
        meta: { found: foundDetails, missing },
      };
    }

    return {
      checkId: this.id,
      status: 'fail',
      label: this.label,
      labelEs: 'Páginas Legales Requeridas',
      details: 'No legal pages detected (terms of service, cookie policy, data subject rights).',
      detailsEs: 'No se detectaron páginas legales (términos de servicio, política de cookies, derechos del titular).',
      suggestion: 'Create at minimum: Terms of Service, Cookie Policy, and a Data Subject Rights page. Add visible links in your site footer.',
      suggestionEs: 'Crea como mínimo: Términos de Servicio, Política de Cookies y una página de Derechos del Titular. Agrega enlaces visibles en el footer de tu sitio.',
      tier: this.tier,
      weight: this.weight,
      meta: { missing },
    };
  },
};

function findPage(
  page: LegalPage,
  links: ScanContext['allLinks'],
  sitemapUrls: string[],
): string | null {
  // By anchor text
  for (const link of links) {
    const lower = link.text.toLowerCase();
    if (page.textKeywords.some((kw) => lower.includes(kw))) {
      return link.href;
    }
  }

  // By href
  for (const link of links) {
    const lower = link.href.toLowerCase();
    if (page.urlKeywords.some((kw) => lower.includes(kw))) {
      return link.href;
    }
  }

  // By sitemap
  for (const url of sitemapUrls) {
    const lower = url.toLowerCase();
    if (page.urlKeywords.some((kw) => lower.includes(kw))) {
      return url;
    }
  }

  return null;
}
