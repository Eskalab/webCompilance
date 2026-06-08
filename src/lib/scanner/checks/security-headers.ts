import { Check, CheckResult, ScanContext } from '../types';

const REQUIRED_HEADERS = [
  {
    name: 'strict-transport-security',
    label: 'HSTS',
    descEn: 'Forces browsers to always use HTTPS',
    descEs: 'Fuerza a los navegadores a usar siempre HTTPS',
  },
  {
    name: 'x-frame-options',
    label: 'X-Frame-Options',
    descEn: 'Prevents clickjacking attacks via iframes',
    descEs: 'Previene ataques de clickjacking vía iframes',
  },
  {
    name: 'x-content-type-options',
    label: 'X-Content-Type-Options',
    descEn: 'Prevents MIME-type sniffing attacks',
    descEs: 'Previene ataques de MIME-type sniffing',
  },
  {
    name: 'content-security-policy',
    label: 'CSP',
    descEn: 'Controls which resources the browser can load (mitigates XSS)',
    descEs: 'Controla qué recursos puede cargar el navegador (mitiga XSS)',
  },
  {
    name: 'referrer-policy',
    label: 'Referrer-Policy',
    descEn: 'Controls what referrer info is sent with requests',
    descEs: 'Controla qué información de referencia se envía con las solicitudes',
  },
];

export const securityHeadersCheck: Check = {
  id: 'security_headers',
  label: 'Security Headers',
  tier: 'free',
  description: 'Checks for essential HTTP security headers: HSTS, X-Frame-Options, CSP, X-Content-Type-Options, Referrer-Policy.',
  weight: 6,

  async run(context: ScanContext): Promise<CheckResult> {
    const headers = context.responseHeaders ?? {};

    const present = REQUIRED_HEADERS.filter((h) => headers[h.name] !== undefined);
    const missing = REQUIRED_HEADERS.filter((h) => headers[h.name] === undefined);

    const presentNames = present.map((h) => h.label);
    const missingNames = missing.map((h) => h.label);

    if (present.length >= 4) {
      return {
        checkId: this.id,
        status: 'pass',
        label: this.label,
        labelEs: 'Cabeceras de Seguridad',
        details: `${present.length}/5 security headers present: ${presentNames.join(', ')}.`,
        detailsEs: `${present.length}/5 cabeceras de seguridad presentes: ${presentNames.join(', ')}.`,
        suggestion: missing.length ? `Consider adding: ${missingNames.join(', ')}.` : '',
        suggestionEs: missing.length ? `Considera agregar: ${missingNames.join(', ')}.` : '',
        tier: this.tier,
        weight: this.weight,
        meta: { present: presentNames, missing: missingNames },
      };
    }

    if (present.length >= 1) {
      return {
        checkId: this.id,
        status: 'warn',
        label: this.label,
        labelEs: 'Cabeceras de Seguridad',
        details: `Only ${present.length}/5 security headers present: ${presentNames.join(', ')}. Missing: ${missingNames.join(', ')}.`,
        detailsEs: `Solo ${present.length}/5 cabeceras de seguridad presentes: ${presentNames.join(', ')}. Faltan: ${missingNames.join(', ')}.`,
        suggestion: `Add the missing headers in your server or CDN configuration. Most hosting providers (Vercel, Netlify, Cloudflare) allow header configuration without code changes.`,
        suggestionEs: `Agrega las cabeceras faltantes en la configuración de tu servidor o CDN. La mayoría de proveedores (Vercel, Netlify, Cloudflare) permiten configurar cabeceras sin cambios de código.`,
        tier: this.tier,
        weight: this.weight,
        meta: { present: presentNames, missing: missingNames },
      };
    }

    return {
      checkId: this.id,
      status: 'fail',
      label: this.label,
      labelEs: 'Cabeceras de Seguridad',
      details: `None of the 5 essential security headers are present. Your site is vulnerable to clickjacking, XSS, and MIME sniffing attacks.`,
      detailsEs: `Ninguna de las 5 cabeceras de seguridad esenciales está presente. Tu sitio es vulnerable a clickjacking, XSS y ataques de MIME sniffing.`,
      suggestion: `Add these headers to your server configuration: ${missingNames.join(', ')}. Start with Strict-Transport-Security and X-Frame-Options as they offer the highest immediate protection.`,
      suggestionEs: `Agrega estas cabeceras a la configuración de tu servidor: ${missingNames.join(', ')}. Empieza con Strict-Transport-Security y X-Frame-Options ya que ofrecen la mayor protección inmediata.`,
      tier: this.tier,
      weight: this.weight,
      meta: { present: presentNames, missing: missingNames },
    };
  },
};
