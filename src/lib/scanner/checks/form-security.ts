import { Check, CheckResult, ScanContext } from '../types';

export const formSecurityCheck: Check = {
  id: 'form_security',
  label: 'Form Security',
  tier: 'free',
  description: 'Checks that HTML forms submit data over HTTPS, not HTTP.',
  weight: 8,

  async run(context: ScanContext): Promise<CheckResult> {
    if (!context.html) {
      return {
        checkId: this.id,
        status: 'warn',
        label: this.label,
        labelEs: 'Seguridad de Formularios',
        details: 'Could not fetch page HTML to analyze forms.',
        detailsEs: 'No se pudo obtener el HTML para analizar los formularios.',
        suggestion: 'Ensure all forms submit data over HTTPS.',
        suggestionEs: 'Asegúrate de que todos los formularios envíen datos por HTTPS.',
        tier: this.tier,
        weight: this.weight,
        meta: {},
      };
    }

    // Find all form tags
    const formRegex = /<form\b[^>]*>/gi;
    const forms = context.html.match(formRegex) ?? [];

    if (forms.length === 0) {
      return {
        checkId: this.id,
        status: 'pass',
        label: this.label,
        labelEs: 'Seguridad de Formularios',
        details: 'No HTML forms detected on this page.',
        detailsEs: 'No se detectaron formularios HTML en esta página.',
        suggestion: '',
        suggestionEs: '',
        tier: this.tier,
        weight: this.weight,
        meta: { formsFound: 0 },
      };
    }

    // Check for forms with explicit HTTP action
    const insecureForms = forms.filter((form) =>
      /action\s*=\s*["']http:\/\//i.test(form)
    );

    if (insecureForms.length === 0) {
      return {
        checkId: this.id,
        status: 'pass',
        label: this.label,
        labelEs: 'Seguridad de Formularios',
        details: `${forms.length} form(s) found. None submit data over insecure HTTP.`,
        detailsEs: `Se encontraron ${forms.length} formulario(s). Ninguno envía datos por HTTP inseguro.`,
        suggestion: '',
        suggestionEs: '',
        tier: this.tier,
        weight: this.weight,
        meta: { formsFound: forms.length, insecureForms: 0 },
      };
    }

    return {
      checkId: this.id,
      status: 'fail',
      label: this.label,
      labelEs: 'Seguridad de Formularios',
      details: `${insecureForms.length} of ${forms.length} form(s) submit data over HTTP. User data (names, emails, messages) is transmitted in plain text — a direct violation of Ley 1581 data protection requirements.`,
      detailsEs: `${insecureForms.length} de ${forms.length} formulario(s) envían datos por HTTP. Los datos del usuario (nombres, emails, mensajes) viajan en texto plano — una violación directa de la Ley 1581 de protección de datos.`,
      suggestion: 'Update the form action attribute to use HTTPS or a relative URL (action="/submit"). Ensure your server endpoint also runs over HTTPS.',
      suggestionEs: 'Actualiza el atributo action del formulario para usar HTTPS o una URL relativa (action="/submit"). Asegúrate de que el endpoint del servidor también use HTTPS.',
      tier: this.tier,
      weight: this.weight,
      meta: { formsFound: forms.length, insecureForms: insecureForms.length },
    };
  },
};
