export type Locale = 'es' | 'en';

export const translations = {
  // Landing page
  hero_title: {
    es: '¿Tu sitio web cumple con la ley?',
    en: 'Is your website legally compliant?',
  },
  hero_subtitle: {
    es: 'Escanea tu sitio y verifica el cumplimiento de protección de datos personales en Latinoamérica. Gratis, en segundos, sin instalar nada.',
    en: 'Scan your site and check data protection compliance in Latin America. Free, in seconds, no installation needed.',
  },
  feature_ssl: {
    es: 'Conexión encriptada',
    en: 'Encrypted connection',
  },
  feature_cookie: {
    es: 'Consentimiento de cookies',
    en: 'Cookie consent',
  },
  feature_legal: {
    es: 'Políticas Legales',
    en: 'Legal Policies',
  },
  feature_legal_desc: {
    es: 'Privacidad, términos, cookies',
    en: 'Privacy, terms, cookies',
  },

  // Scan form
  placeholder_url: {
    es: 'ejemplo.com',
    en: 'example.com',
  },
  btn_scan: {
    es: 'Escanear',
    en: 'Scan',
  },
  btn_scanning: {
    es: 'Escaneando...',
    en: 'Scanning...',
  },
  error_invalid_url: {
    es: 'Ingresa una URL válida',
    en: 'Enter a valid URL',
  },
  error_scan: {
    es: 'Error al escanear',
    en: 'Scan error',
  },
  error_connection: {
    es: 'Error de conexión. Intenta de nuevo.',
    en: 'Connection error. Please try again.',
  },

  // Results page
  loading: {
    es: 'Cargando...',
    en: 'Loading...',
  },
  loading_result: {
    es: 'Cargando resultado...',
    en: 'Loading result...',
  },
  scan_another: {
    es: '← Escanear otro sitio',
    en: '← Scan another site',
  },
  scan_result: {
    es: 'Resultado del escaneo',
    en: 'Scan Result',
  },
  passed: {
    es: 'aprobados',
    en: 'passed',
  },
  warnings: {
    es: 'advertencias',
    en: 'warnings',
  },
  failed: {
    es: 'fallidos',
    en: 'failed',
  },
  download_pdf: {
    es: 'Descargar reporte PDF',
    en: 'Download PDF report',
  },
  compliance_score: {
    es: 'Puntaje de Cumplimiento',
    en: 'Compliance Score',
  },

  // Check card status labels
  status_pass: {
    es: 'APROBADO',
    en: 'PASS',
  },
  status_warn: {
    es: 'ADVERTENCIA',
    en: 'WARNING',
  },
  status_fail: {
    es: 'FALLO',
    en: 'FAIL',
  },
  status_skip: {
    es: 'OMITIDO',
    en: 'SKIP',
  },
  premium_locked: {
    es: 'Ingresa tu email para ver el detalle completo',
    en: 'Enter your email to see full details',
  },

  // Lead gate
  unlock_title: {
    es: 'Desbloquea el reporte completo',
    en: 'Unlock the full report',
  },
  unlock_desc: {
    es: 'Recibe las recomendaciones detalladas, el análisis de scripts de terceros y el reporte en PDF.',
    en: 'Get detailed recommendations, third-party script analysis, and the PDF report.',
  },
  unlock_btn: {
    es: 'Desbloquear',
    en: 'Unlock',
  },
  unlock_sending: {
    es: 'Enviando...',
    en: 'Sending...',
  },
  error_invalid_email: {
    es: 'Ingresa un email válido',
    en: 'Enter a valid email',
  },
  error_send: {
    es: 'Error al enviar. Intenta de nuevo.',
    en: 'Error sending. Please try again.',
  },

  // Footer
  footer: {
    es: 'TDE — Transformación Digital Empresarial',
    en: 'TDE — Digital Business Transformation',
  },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, locale: Locale): string {
  return translations[key][locale];
}

export function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'es';
  const stored = localStorage.getItem('locale');
  if (stored === 'en' || stored === 'es') return stored;
  const browserLang = navigator.language?.slice(0, 2);
  return browserLang === 'en' ? 'en' : 'es';
}
