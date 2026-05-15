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

  // Topbar
  topbar_talk_advisor: {
    es: 'Habla con un asesor',
    en: 'Talk to an advisor',
  },
  topbar_follow_us: {
    es: 'Síguenos',
    en: 'Follow us',
  },

  // Nav / Header
  nav_what_we_do: {
    es: 'Que Hacemos',
    en: 'What We Do',
  },
  nav_services: {
    es: 'Servicios',
    en: 'Services',
  },
  nav_training: {
    es: 'Capacitaciones',
    en: 'Training',
  },
  nav_blog: {
    es: 'Blog',
    en: 'Blog',
  },
  nav_policies: {
    es: 'Nuestras Políticas',
    en: 'Our Policies',
  },
  nav_contact: {
    es: 'Contacto',
    en: 'Contact',
  },
  nav_svc_ecommerce_data: {
    es: 'Manejo de Datos Personales para el Comercio Electrónico',
    en: 'Personal Data Management for E-Commerce',
  },
  nav_svc_horizontal: {
    es: 'Manejo de Datos Personales para Propiedad Horizontal',
    en: 'Personal Data Management for Condominiums',
  },
  nav_svc_medical: {
    es: 'Protección de Datos Personales para Consultorios Médicos',
    en: 'Personal Data Protection for Medical Offices',
  },
  nav_svc_legal_ecommerce: {
    es: 'Asesorías Jurídicas para Comercio Electrónico',
    en: 'Legal Advisory for E-Commerce',
  },
  nav_svc_audit: {
    es: 'Auditoria Interna en Seguridad de la Información',
    en: 'Internal Information Security Audit',
  },
  nav_svc_threats: {
    es: 'Amenazas & Vulnerabilidades en la Seguridad de la Información',
    en: 'Threats & Vulnerabilities in Information Security',
  },

  // Landing – Hero
  hero_page_title: {
    es: 'Escáner Legal',
    en: 'Legal Scanner',
  },
  hero_badge: {
    es: 'Plataforma de cumplimiento legal web',
    en: 'Web legal compliance platform',
  },
  hero_title_main: {
    es: 'Analiza si tu sitio cumple con privacidad y legalidad digital',
    en: 'Check if your site meets digital privacy and legal standards',
  },
  hero_subtitle_main: {
    es: 'Detectamos automáticamente problemas relacionados con cookies, privacidad, tracking, SSL y cumplimiento normativo para tu página web.',
    en: 'We automatically detect issues related to cookies, privacy, tracking, SSL and regulatory compliance for your website.',
  },
  badge_no_registration: {
    es: 'Sin registros',
    en: 'No registration',
  },
  badge_instant_result: {
    es: 'Resultado inmediato',
    en: 'Instant result',
  },
  badge_safe_scan: {
    es: 'Escaneo seguro',
    en: 'Safe scan',
  },

  // Landing – Features
  features_label: {
    es: 'Plataforma Compliance',
    en: 'Compliance Platform',
  },
  features_title: {
    es: 'Todo lo que necesitas analizar',
    en: 'Everything you need to analyze',
  },
  features_desc: {
    es: 'Detectamos automáticamente problemas legales, técnicos y de privacidad en sitios web empresariales.',
    en: 'We automatically detect legal, technical and privacy issues on business websites.',
  },
  feat_ssl_title: {
    es: 'SSL y Seguridad',
    en: 'SSL & Security',
  },
  feat_ssl_desc: {
    es: 'Validamos HTTPS, certificados y configuraciones seguras.',
    en: 'We validate HTTPS, certificates and secure configurations.',
  },
  feat_cookies_title: {
    es: 'Cookies y Consentimiento',
    en: 'Cookies & Consent',
  },
  feat_cookies_desc: {
    es: 'Detectamos banners inválidos y trackers sin autorización.',
    en: 'We detect invalid banners and unauthorized trackers.',
  },
  feat_legal_title: {
    es: 'Documentos Legales',
    en: 'Legal Documents',
  },
  feat_legal_desc: {
    es: 'Verificamos políticas, términos y cumplimiento normativo.',
    en: 'We verify policies, terms and regulatory compliance.',
  },
  feat_tracking_title: {
    es: 'Tracking y Scripts',
    en: 'Tracking & Scripts',
  },
  feat_tracking_desc: {
    es: 'Analizamos Google Analytics, Meta Pixel y rastreadores.',
    en: 'We analyze Google Analytics, Meta Pixel and trackers.',
  },

  // Landing – How it works
  how_label: {
    es: 'Cómo funciona',
    en: 'How it works',
  },
  how_title: {
    es: 'Escaneo en 3 pasos',
    en: 'Scan in 3 steps',
  },
  step1_title: {
    es: 'Ingresa tu dominio',
    en: 'Enter your domain',
  },
  step1_desc: {
    es: 'Escribe la URL de tu sitio web.',
    en: 'Type your website URL.',
  },
  step2_title: {
    es: 'Analizamos automáticamente',
    en: 'We analyze automatically',
  },
  step2_desc: {
    es: 'Escaneamos cookies, scripts y documentos.',
    en: 'We scan cookies, scripts and documents.',
  },
  step3_title: {
    es: 'Obtén tu reporte',
    en: 'Get your report',
  },
  step3_desc: {
    es: 'Visualiza riesgos y oportunidades de mejora.',
    en: 'View risks and improvement opportunities.',
  },

  // Landing – CTA
  cta_title: {
    es: 'Escanea tu sitio ahora',
    en: 'Scan your site now',
  },
  cta_subtitle: {
    es: 'Obtén un diagnóstico automático de cumplimiento legal y privacidad web.',
    en: 'Get an automatic legal compliance and web privacy diagnostic.',
  },

  // Landing – Footer
  footer_platform: {
    es: 'Plataforma',
    en: 'Platform',
  },
  footer_contact: {
    es: 'Contacto',
    en: 'Contact',
  },
  footer_desc: {
    es: 'Plataforma de análisis de cumplimiento legal y privacidad para empresas digitales.',
    en: 'Legal compliance and privacy analysis platform for digital businesses.',
  },
  footer_scanning: {
    es: 'Escaneo',
    en: 'Scanning',
  },
  footer_compliance: {
    es: 'Compliance',
    en: 'Compliance',
  },
  footer_privacy: {
    es: 'Privacidad',
    en: 'Privacy',
  },
  footer_reports: {
    es: 'Reportes',
    en: 'Reports',
  },

  // Results page
  site_analyzed: {
    es: 'Sitio analizado',
    en: 'Site analyzed',
  },
  scan_complete: {
    es: 'Escaneo completo',
    en: 'Scan complete',
  },
  compliance_high: {
    es: 'Cumplimiento alto',
    en: 'High compliance',
  },
  risk_medium: {
    es: 'Riesgo medio',
    en: 'Medium risk',
  },
  risk_high: {
    es: 'Riesgo elevado',
    en: 'High risk',
  },
  detected_data: {
    es: 'Datos detectados',
    en: 'Detected data',
  },
  label_domain: {
    es: 'Dominio',
    en: 'Domain',
  },
  label_https: {
    es: 'HTTPS',
    en: 'HTTPS',
  },
  label_cookies: {
    es: 'Cookies',
    en: 'Cookies',
  },
  label_policies: {
    es: 'Políticas',
    en: 'Policies',
  },
  label_active: {
    es: 'Activo',
    en: 'Active',
  },
  label_analyzed: {
    es: 'Analizadas',
    en: 'Analyzed',
  },
  label_detected: {
    es: 'detectadas',
    en: 'detected',
  },
  risks_detected: {
    es: 'Riesgos detectados',
    en: 'Risks detected',
  },
  risk_alert_title: {
    es: 'Tu sitio requiere ajustes de cumplimiento',
    en: 'Your site requires compliance adjustments',
  },
  risk_alert_desc: {
    es: 'Detectamos problemas relacionados con consentimiento, privacidad, tracking y cumplimiento normativo.',
    en: 'We detected issues related to consent, privacy, tracking and regulatory compliance.',
  },
  compliance_report: {
    es: 'Reporte de Compliance',
    en: 'Compliance Report',
  },
  analysis_results: {
    es: 'Resultados del análisis',
    en: 'Analysis results',
  },
  premium_recommendations_locked: {
    es: 'Recomendaciones premium bloqueadas',
    en: 'Premium recommendations locked',
  },
  premium_unlock_desc: {
    es: 'Desbloquea soluciones detalladas y PDF.',
    en: 'Unlock detailed solutions and PDF.',
  },
  btn_unlock: {
    es: 'Desbloquear',
    en: 'Unlock',
  },
  recommendation_title: {
    es: 'Recomendación',
    en: 'Recommendation',
  },
  recommendation_text: {
    es: 'Implementa una solución compatible con RGPD, Habeas Data y normativas internacionales para mejorar el cumplimiento legal de tu sitio web.',
    en: 'Implement a solution compatible with GDPR, Habeas Data and international regulations to improve your website\'s legal compliance.',
  },
  need_legal_help: {
    es: '¿Necesitas ayuda legal?',
    en: 'Need legal help?',
  },
  need_legal_help_desc: {
    es: 'Nuestro equipo puede ayudarte a implementar políticas, consentimiento de cookies y cumplimiento normativo.',
    en: 'Our team can help you implement policies, cookie consent and regulatory compliance.',
  },
  talk_advisor: {
    es: 'Hablar con un asesor',
    en: 'Talk to an advisor',
  },

  // PDF
  pdf_title: {
    es: 'Reporte de Compliance Legal LATAM',
    en: 'LATAM Legal Compliance Report',
  },
  pdf_score: {
    es: 'Puntaje de Cumplimiento',
    en: 'Compliance Score',
  },
  pdf_passed: {
    es: 'aprobados',
    en: 'passed',
  },
  pdf_warnings: {
    es: 'advertencias',
    en: 'warnings',
  },
  pdf_failed: {
    es: 'fallidos',
    en: 'failed',
  },
  pdf_check: {
    es: 'Verificación',
    en: 'Check',
  },
  pdf_status: {
    es: 'Estado',
    en: 'Status',
  },
  pdf_details: {
    es: 'Detalles',
    en: 'Details',
  },
  pdf_recommendation: {
    es: 'Recomendación',
    en: 'Recommendation',
  },
  pdf_priority_recommendations: {
    es: 'Recomendaciones Prioritarias',
    en: 'Priority Recommendations',
  },
  pdf_generated_by: {
    es: 'Generado por TDE — Transformación Digital Empresarial',
    en: 'Generated by TDE — Digital Business Transformation',
  },
  pdf_disclaimer: {
    es: 'Este reporte es una evaluación automatizada y no constituye asesoría legal.',
    en: 'This report is an automated assessment and does not constitute legal advice.',
  },
  // Cookie consent banner
  cookie_message: {
    es: 'Utilizamos cookies para mejorar tu experiencia en nuestro sitio. Al continuar navegando, aceptas nuestra política de cookies.',
    en: 'We use cookies to improve your experience on our site. By continuing to browse, you accept our cookie policy.',
  },
  cookie_accept: {
    es: 'Aceptar',
    en: 'Accept',
  },
  cookie_reject: {
    es: 'Rechazar',
    en: 'Reject',
  },
  cookie_policy_link: {
    es: 'Política de cookies',
    en: 'Cookie policy',
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
