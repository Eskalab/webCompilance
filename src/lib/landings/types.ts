// Contenido de las landings de servicios (/productos/*). Solo datos: los íconos van
// por nombre para que el contenido pueda pasar de la página (server) al componente (client).

export type L = { es: string; en: string };

export type IconName =
  | 'FileText' | 'ShieldCheck' | 'Lock' | 'Users' | 'Database' | 'FileSignature'
  | 'Scale' | 'Camera' | 'Globe' | 'TriangleAlert' | 'GraduationCap' | 'Mail'
  | 'Fingerprint' | 'Brain' | 'Building2' | 'Stethoscope' | 'ClipboardCheck'
  | 'Search' | 'Workflow' | 'Gavel' | 'ShoppingCart' | 'Handshake' | 'UserCheck'
  | 'Eye' | 'Clock' | 'Award' | 'MonitorSmartphone' | 'Network' | 'KeyRound'
  | 'Siren' | 'Video' | 'Mic' | 'BadgeCheck' | 'ListChecks' | 'Share2'
  | 'Briefcase' | 'Presentation' | 'Route' | 'FileCheck' | 'Calculator' | 'House' | 'Code';

export interface IconCard {
  icon: IconName;
  title: L;
  text?: L;
  items?: L[];
}

export interface LandingContent {
  path: string;
  /** Metadata y Open Graph (en español: idioma por defecto del sitio) */
  meta: { title: string; description: string };
  og: { kicker: string; title: string; subtitle: string; tags: string[] };
  /** Nombre corto del servicio para el header */
  name: L;
  /** Mensaje prellenado de WhatsApp: identifica de qué landing viene el contacto */
  whatsapp: L;

  hero: {
    badge: L;
    title: L;
    subtitle: L;
    cta: L;
    trust: L[];
    card: { title: L; items: { icon: IconName; text: L }[]; note?: L };
  };

  risk: {
    label: L;
    title: L;
    cards: IconCard[];
    note?: { text: L; source?: L };
    /** Pregunta del CTA intermedio después del riesgo */
    ctaQuestion: L;
  };

  /** Bloque explicativo opcional (p. ej. transmisión vs. transferencia) */
  explainer?: { label: L; title: L; items: { title: L; text: L }[]; source?: L };

  includes: { label: L; title: L; desc?: L; cards: IconCard[]; note?: L };

  process: {
    label: L;
    title: L;
    steps: { title: L; text: L; duration?: L }[];
    table?: { title: L; rows: { label: L; value: L }[] };
  };

  audience?: { label: L; title: L; items: { icon: IconName; text: L }[] };

  /** Columnas de cierre: entregables, beneficios, siguientes pasos */
  highlights?: {
    label: L;
    title: L;
    columns: { title: L; items: L[]; dark?: boolean }[];
    cta: L;
  };

  faq: { q: L; a: L; link?: { href: string; label: L } }[];

  final: { title: L; subtitle: L };
}
