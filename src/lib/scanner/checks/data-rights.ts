import { Check, CheckResult, ScanContext } from '../types';

// Página o sección de derechos del titular (habeas data / derechos ARCO).
// Fundamento: Ley 1581/2012 art. 8 y Decreto 1377/2013 art. 13 num. 3.

const URL_KEYWORDS = [
  'derechos', 'rights', 'direitos', 'arco', 'ejercer-derechos', 'habeas-data',
];

const TEXT_KEYWORDS = [
  'derechos arco', 'derechos del titular', 'ejercer derechos', 'ejercer tus derechos',
  'data subject rights', 'your rights', 'direitos do titular',
  'sus derechos', 'tus derechos', 'habeas data',
];

const POLICY_CONTENT_KEYWORDS = [
  'derechos del titular', 'derechos que le asisten', 'ejercer sus derechos',
  'conocer, actualizar y rectificar', 'habeas data', 'derechos arco',
];

// Compara por palabra completa: normaliza los separadores de URL (- / _ .) a
// espacios para que 'arco' matchee en 'derechos-arco' pero NO dentro de
// 'narcotrafico'. Sirve para keywords de una o varias palabras.
function urlIncludesKeyword(href: string, keywords: string[]): boolean {
  const normalized = ` ${href.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()} `;
  return keywords.some((kw) => normalized.includes(` ${kw.replace(/-/g, ' ')} `));
}

export const dataRightsCheck: Check = {
  id: 'data_rights',
  label: 'Data Subject Rights (Habeas Data)',
  tier: 'free',
  description: 'Checks that your site informs visitors how to exercise their data rights (Ley 1581, art. 8).',
  weight: 4,

  async run(context: ScanContext): Promise<CheckResult> {
    const { allLinks, sitemapUrls, privacyPolicyContent } = context;

    // 1. Link o página dedicada a derechos del titular
    for (const link of allLinks) {
      const lowerText = link.text.toLowerCase();
      if (TEXT_KEYWORDS.some((kw) => lowerText.includes(kw)) || urlIncludesKeyword(link.href, URL_KEYWORDS)) {
        return {
          checkId: this.id,
          status: 'pass',
          label: this.label,
          labelEs: 'Derechos del Titular (Habeas Data)',
          details: `Data rights link found: "${link.text}" → ${link.href} (location: ${link.location}).`,
          detailsEs: `Enlace de derechos del titular encontrado: "${link.text}" → ${link.href} (ubicación: ${link.location}).`,
          suggestion: '',
          suggestionEs: '',
          tier: this.tier,
          weight: this.weight,
          meta: { href: link.href, text: link.text, location: link.location },
        };
      }
    }

    for (const url of sitemapUrls) {
      if (urlIncludesKeyword(url, URL_KEYWORDS)) {
        return {
          checkId: this.id,
          status: 'pass',
          label: this.label,
          labelEs: 'Derechos del Titular (Habeas Data)',
          details: `Data rights page found in sitemap: ${url}.`,
          detailsEs: `Página de derechos del titular encontrada en el sitemap: ${url}.`,
          suggestion: 'Consider adding a visible link in your footer so data subjects can find it easily.',
          suggestionEs: 'Considera agregar un enlace visible en el footer para que los titulares la encuentren fácilmente.',
          tier: this.tier,
          weight: this.weight,
          meta: { sitemapUrl: url },
        };
      }
    }

    // 2. Derechos mencionados dentro de la política de tratamiento
    const policyLower = privacyPolicyContent.toLowerCase();
    if (policyLower && POLICY_CONTENT_KEYWORDS.some((kw) => policyLower.includes(kw))) {
      return {
        checkId: this.id,
        status: 'warn',
        label: this.label,
        labelEs: 'Derechos del Titular (Habeas Data)',
        details: 'Data subject rights are mentioned inside your privacy policy, but there is no dedicated page or visible link explaining how to exercise them.',
        detailsEs: 'Los derechos del titular se mencionan dentro de tu política de tratamiento, pero no hay una página dedicada o enlace visible que explique cómo ejercerlos.',
        suggestion: 'Add a dedicated section or page explaining how data subjects can exercise their rights (access, correction, deletion, revocation) and through which channel, with the legal response times (10/15 business days).',
        suggestionEs: 'Agrega una sección o página dedicada que explique cómo el titular puede ejercer sus derechos (conocer, actualizar, rectificar, suprimir, revocar) y por qué canal, con los plazos legales de respuesta (10/15 días hábiles).',
        tier: this.tier,
        weight: this.weight,
        meta: { foundInPolicy: true },
      };
    }

    return {
      checkId: this.id,
      status: 'fail',
      label: this.label,
      labelEs: 'Derechos del Titular (Habeas Data)',
      details: 'No information found about data subject rights (access, correction, deletion, revocation). Ley 1581 (art. 8) grants these rights and your site must inform how to exercise them.',
      detailsEs: 'No se encontró información sobre los derechos del titular (conocer, actualizar, rectificar, suprimir, revocar). La Ley 1581 (art. 8) otorga estos derechos y tu sitio debe informar cómo ejercerlos.',
      suggestion: 'Create a data rights section or page with the channel to submit requests (e.g. a dedicated email) and the legal response times: 10 business days for queries, 15 for claims.',
      suggestionEs: 'Crea una sección o página de derechos del titular con el canal para radicar solicitudes (ej. un email dedicado) y los plazos legales de respuesta: 10 días hábiles para consultas, 15 para reclamos.',
      tier: this.tier,
      weight: this.weight,
      meta: {},
    };
  },
};
