import { Check, CheckResult, ScanContext } from '../types';

const FORM_REGEX = /<form[\s>]/i;

const CONSENT_PATTERNS: Record<string, RegExp> = {
  'consent-checkbox': /type\s*=\s*["']checkbox["'][^>]*(?:consent|gdpr|acepto|autorizo|tratamiento|privacy|privacidad|datos\s*personales)/i,
  'acceptance-field': /class\s*=\s*["'][^"']*(?:wpcf7-acceptance|wpforms-field-gdpr|gfield_consent)/i,
  'consent-label': /<label[^>]*>[^<]*(?:consent|acepto|autorizo|tratamiento de datos|privacy policy|politica de privacidad|política de privacidad|datos personales)/i,
};

export const formsConsentCheck: Check = {
  id: 'forms_consent',
  label: 'Form Consent Checkboxes',
  tier: 'premium',
  description: 'Checks that contact and registration forms include a data consent checkbox.',
  weight: 5,

  async run(context: ScanContext): Promise<CheckResult> {
    const { html } = context;

    if (!html) {
      return {
        checkId: this.id,
        status: 'skip',
        label: this.label,
        labelEs: 'Consentimiento en Formularios',
        details: 'Could not fetch the page to scan for forms.',
        detailsEs: 'No se pudo obtener la página para buscar formularios.',
        suggestion: 'Make sure your site is publicly accessible.',
        suggestionEs: 'Asegúrate de que tu sitio sea accesible públicamente.',
        tier: this.tier,
        weight: this.weight,
        meta: {},
      };
    }

    const hasForms = FORM_REGEX.test(html);

    if (!hasForms) {
      return {
        checkId: this.id,
        status: 'pass',
        label: this.label,
        labelEs: 'Consentimiento en Formularios',
        details: 'No contact forms detected on the front page. No consent checkbox needed.',
        detailsEs: 'No se detectaron formularios de contacto en la página principal. No se necesita checkbox de consentimiento.',
        suggestion: '',
        suggestionEs: '',
        tier: this.tier,
        weight: this.weight,
        meta: { formsDetected: false },
      };
    }

    // Forms found — check for consent patterns
    const found: string[] = [];
    for (const [name, regex] of Object.entries(CONSENT_PATTERNS)) {
      if (regex.test(html)) {
        found.push(name);
      }
    }

    if (found.length > 0) {
      return {
        checkId: this.id,
        status: 'pass',
        label: this.label,
        labelEs: 'Consentimiento en Formularios',
        details: `Forms detected with consent mechanisms: ${found.join(', ')}.`,
        detailsEs: `Formularios detectados con mecanismos de consentimiento: ${found.join(', ')}.`,
        suggestion: '',
        suggestionEs: '',
        tier: this.tier,
        weight: this.weight,
        meta: { formsDetected: true, consentSources: found },
      };
    }

    return {
      checkId: this.id,
      status: 'fail',
      label: this.label,
      labelEs: 'Consentimiento en Formularios',
      details: 'Forms detected on the page but no consent checkbox or data authorization field was found.',
      detailsEs: 'Se detectaron formularios en la página pero no se encontró checkbox de consentimiento ni campo de autorización de datos.',
      suggestion: 'Add a required checkbox to your forms with text like "I consent to the processing of my personal data according to the Privacy Policy". Most form builders have a GDPR/consent field type.',
      suggestionEs: 'Agrega un checkbox obligatorio a tus formularios con texto como "Acepto el tratamiento de mis datos personales según la Política de Privacidad". La mayoría de constructores de formularios tienen un campo tipo GDPR/consentimiento.',
      tier: this.tier,
      weight: this.weight,
      meta: { formsDetected: true },
    };
  },
};
