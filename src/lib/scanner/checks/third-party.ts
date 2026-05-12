import { Check, CheckResult, ScanContext } from '../types';

interface ServiceConfig {
  scripts: string[];
  keywords: string[];
  country: string;
}

const KNOWN_SERVICES: Record<string, ServiceConfig> = {
  'Google Analytics': {
    scripts: ['google-analytics.com', 'googletagmanager.com', 'gtag/js', 'ga.js', 'analytics.js'],
    keywords: ['google analytics', 'google tag manager', 'analítica', 'analytics'],
    country: 'United States',
  },
  'Facebook Pixel': {
    scripts: ['connect.facebook.net', 'fbevents.js', 'facebook.com/tr'],
    keywords: ['facebook', 'meta pixel', 'pixel de facebook'],
    country: 'United States',
  },
  'Hotjar': {
    scripts: ['hotjar.com', 'static.hotjar.com'],
    keywords: ['hotjar'],
    country: 'European Union',
  },
  'TikTok Pixel': {
    scripts: ['analytics.tiktok.com'],
    keywords: ['tiktok'],
    country: 'United States / Singapore',
  },
  'LinkedIn Insight': {
    scripts: ['snap.licdn.com', 'linkedin.com/insight'],
    keywords: ['linkedin'],
    country: 'United States',
  },
  'Google Ads': {
    scripts: ['googleads.g.doubleclick.net', 'googlesyndication.com', 'googleadservices.com'],
    keywords: ['google ads', 'adwords', 'publicidad de google'],
    country: 'United States',
  },
  'Microsoft Clarity': {
    scripts: ['clarity.ms'],
    keywords: ['clarity', 'microsoft clarity'],
    country: 'United States',
  },
  'Crisp': {
    scripts: ['client.crisp.chat'],
    keywords: ['crisp'],
    country: 'European Union',
  },
  'Intercom': {
    scripts: ['widget.intercom.io'],
    keywords: ['intercom'],
    country: 'United States',
  },
  'HubSpot': {
    scripts: ['js.hs-scripts.com', 'js.hubspot.com'],
    keywords: ['hubspot'],
    country: 'United States',
  },
};

const TRANSFER_KEYWORDS = [
  'transferencia internacional', 'international transfer',
  'transferencia de datos', 'data transfer',
  'datos fuera del país', 'datos al exterior',
  'servidores en el exterior', 'servidores fuera',
  'terceros países', 'cross-border', 'transfronterizo',
  'estados unidos', 'united states',
  'union europea', 'european union',
];

export const thirdPartyCheck: Check = {
  id: 'third_party',
  label: 'Third-Party Scripts Disclosure',
  tier: 'premium',
  description: 'Detects third-party tracking scripts and checks if they are disclosed in your privacy policy.',
  weight: 6,

  async run(context: ScanContext): Promise<CheckResult> {
    const { html, privacyPolicyContent } = context;

    if (!html) {
      return {
        checkId: this.id,
        status: 'skip',
        label: this.label,
        labelEs: 'Divulgación de Scripts de Terceros',
        details: 'Could not fetch front page HTML to scan for scripts.',
        detailsEs: 'No se pudo obtener el HTML de la página principal para buscar scripts.',
        suggestion: 'Make sure your site is publicly accessible.',
        suggestionEs: 'Asegúrate de que tu sitio sea accesible públicamente.',
        tier: this.tier,
        weight: this.weight,
        meta: {},
      };
    }

    // Detect scripts in HTML
    const detected = detectScripts(html);

    if (detected.length === 0) {
      return {
        checkId: this.id,
        status: 'pass',
        label: this.label,
        labelEs: 'Divulgación de Scripts de Terceros',
        details: 'No third-party tracking scripts detected on your front page.',
        detailsEs: 'No se detectaron scripts de rastreo de terceros en tu página principal.',
        suggestion: '',
        suggestionEs: '',
        tier: this.tier,
        weight: this.weight,
        meta: {},
      };
    }

    // Cross-reference with privacy policy
    const privacyLower = privacyPolicyContent.toLowerCase();
    const disclosed: string[] = [];
    const undisclosed: string[] = [];

    for (const service of detected) {
      if (isDisclosed(service, privacyLower)) {
        disclosed.push(service);
      } else {
        undisclosed.push(service);
      }
    }

    // Check for international transfer disclosure
    const mentionsTransfer = TRANSFER_KEYWORDS.some((kw) =>
      privacyLower.includes(kw),
    );

    const foreignServices = detected
      .filter((s) => KNOWN_SERVICES[s])
      .map((s) => `${s} (${KNOWN_SERVICES[s].country})`);

    if (undisclosed.length === 0) {
      const detailsEn = `Third-party scripts detected and all disclosed in privacy policy: ${disclosed.join(', ')}.`;
      const detailsEs = `Scripts de terceros detectados y todos divulgados en la política de privacidad: ${disclosed.join(', ')}.`;

      if (foreignServices.length > 0 && !mentionsTransfer) {
        return {
          checkId: this.id,
          status: 'warn',
          label: this.label,
          labelEs: 'Divulgación de Scripts de Terceros',
          details: detailsEn + ` However, international data transfer is not mentioned. Services processing data abroad: ${foreignServices.join(', ')}.`,
          detailsEs: detailsEs + ` Sin embargo, no se menciona la transferencia internacional de datos. Servicios que procesan datos en el exterior: ${foreignServices.join(', ')}.`,
          suggestion: 'Add an "International Data Transfer" section to your privacy policy explaining which services transfer data abroad and what safeguards are in place.',
          suggestionEs: 'Agrega una sección de "Transferencia Internacional de Datos" a tu política de privacidad explicando qué servicios transfieren datos al exterior y qué medidas de protección existen.',
          tier: this.tier,
          weight: this.weight,
          meta: { detected, disclosed, foreignServices },
        };
      }
      return {
        checkId: this.id,
        status: 'pass',
        label: this.label,
        labelEs: 'Divulgación de Scripts de Terceros',
        details: detailsEn,
        detailsEs,
        suggestion: '',
        suggestionEs: '',
        tier: this.tier,
        weight: this.weight,
        meta: { detected, disclosed },
      };
    }

    let detailsEn = `Third-party scripts detected but NOT mentioned in your privacy policy: ${undisclosed.join(', ')}.`;
    let detailsEs = `Scripts de terceros detectados pero NO mencionados en tu política de privacidad: ${undisclosed.join(', ')}.`;
    if (disclosed.length > 0) {
      detailsEn += ` Already disclosed: ${disclosed.join(', ')}.`;
      detailsEs += ` Ya divulgados: ${disclosed.join(', ')}.`;
    }

    return {
      checkId: this.id,
      status: 'warn',
      label: this.label,
      labelEs: 'Divulgación de Scripts de Terceros',
      details: detailsEn,
      detailsEs,
      suggestion: 'Update your privacy policy to mention all third-party services that collect visitor data. Include the service name, what data it collects, and why. Most LATAM data protection laws require this disclosure.',
      suggestionEs: 'Actualiza tu política de privacidad para mencionar todos los servicios de terceros que recopilan datos de visitantes. Incluye el nombre del servicio, qué datos recopila y por qué. La mayoría de leyes de protección de datos en LATAM requieren esta divulgación.',
      tier: this.tier,
      weight: this.weight,
      meta: { detected, disclosed, undisclosed, foreignServices },
    };
  },
};

function detectScripts(html: string): string[] {
  const found: string[] = [];
  for (const [service, config] of Object.entries(KNOWN_SERVICES)) {
    for (const pattern of config.scripts) {
      if (html.toLowerCase().includes(pattern.toLowerCase())) {
        found.push(service);
        break;
      }
    }
  }
  return found;
}

function isDisclosed(service: string, privacyContent: string): boolean {
  if (!privacyContent || !KNOWN_SERVICES[service]) return false;
  return KNOWN_SERVICES[service].keywords.some((kw) =>
    privacyContent.includes(kw),
  );
}
