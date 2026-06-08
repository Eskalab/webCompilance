import { Check, CheckResult, ScanContext } from '../types';

export const mixedContentCheck: Check = {
  id: 'mixed_content',
  label: 'Mixed Content',
  tier: 'free',
  description: 'Detects HTTP resources (images, scripts, CSS) loaded on an HTTPS page.',
  weight: 7,

  async run(context: ScanContext): Promise<CheckResult> {
    if (!context.url.startsWith('https://')) {
      return {
        checkId: this.id,
        status: 'skip',
        label: this.label,
        labelEs: 'Contenido Mixto',
        details: 'Site does not use HTTPS — mixed content check skipped.',
        detailsEs: 'El sitio no usa HTTPS — verificación omitida.',
        suggestion: '',
        suggestionEs: '',
        tier: this.tier,
        weight: this.weight,
        meta: {},
      };
    }

    if (!context.html) {
      return {
        checkId: this.id,
        status: 'warn',
        label: this.label,
        labelEs: 'Contenido Mixto',
        details: 'Could not fetch page HTML to verify mixed content.',
        detailsEs: 'No se pudo obtener el HTML para verificar contenido mixto.',
        suggestion: 'Manually verify that all resources (images, scripts, CSS) load over HTTPS.',
        suggestionEs: 'Verifica manualmente que todos los recursos (imágenes, scripts, CSS) carguen por HTTPS.',
        tier: this.tier,
        weight: this.weight,
        meta: {},
      };
    }

    // Match src="http://, href="http://, data="http:// — excluding same-origin relative URLs
    const httpResourceRegex = /(?:src|href|data|action)\s*=\s*["']http:\/\/[^"']+["']/gi;
    const matches = context.html.match(httpResourceRegex) ?? [];

    // Filter out false positives: skip anchor links that are clearly navigation
    const resources = matches.filter((m) => !m.includes('mailto:') && !m.includes('tel:'));

    if (resources.length === 0) {
      return {
        checkId: this.id,
        status: 'pass',
        label: this.label,
        labelEs: 'Contenido Mixto',
        details: 'No mixed content detected. All resources appear to load over HTTPS.',
        detailsEs: 'No se detectó contenido mixto. Todos los recursos cargan por HTTPS.',
        suggestion: '',
        suggestionEs: '',
        tier: this.tier,
        weight: this.weight,
        meta: { found: [] },
      };
    }

    return {
      checkId: this.id,
      status: 'fail',
      label: this.label,
      labelEs: 'Contenido Mixto',
      details: `Found ${resources.length} HTTP resource(s) loaded on an HTTPS page. This exposes users to man-in-the-middle attacks and may trigger browser security warnings.`,
      detailsEs: `Se encontraron ${resources.length} recurso(s) HTTP cargados en una página HTTPS. Esto expone a los usuarios a ataques y puede generar advertencias en el navegador.`,
      suggestion: 'Update all resource URLs to use HTTPS. Check images, scripts, stylesheets, and iframes. Your hosting provider may offer automatic mixed content fixing.',
      suggestionEs: 'Actualiza todas las URLs de recursos para usar HTTPS. Revisa imágenes, scripts, hojas de estilo e iframes. Tu proveedor de hosting puede ofrecer corrección automática de contenido mixto.',
      tier: this.tier,
      weight: this.weight,
      meta: { found: resources.slice(0, 5) },
    };
  },
};
