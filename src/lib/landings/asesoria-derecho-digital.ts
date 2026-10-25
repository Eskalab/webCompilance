import type { LandingContent } from './types';

// Servicio "Asesorías jurídicas para empresas digitales y comercio electrónico" (home-data.ts).
// Equipo: abogadas con maestría en Innovación en Derecho Digital y Legal Tech (team en home-data.ts).
export const asesoriaDerechoDigital: LandingContent = {
  path: '/productos/asesoria-derecho-digital',
  meta: {
    title: 'Asesoría legal en derecho digital y TIC para empresas | TDE',
    description:
      'Asesoría jurídica para empresas digitales, startups y comercios electrónicos: protección de datos, contratos tecnológicos, comercio electrónico, ciberseguridad e inteligencia artificial.',
  },
  og: {
    kicker: 'TDE · Derecho digital y TIC',
    title: 'Asesoría legal para hacer negocios en el entorno digital',
    subtitle: 'Datos, contratos tecnológicos, comercio electrónico y ciberseguridad',
    tags: ['Derecho digital', 'TIC', 'Comercio electrónico', 'Contratos'],
  },
  name: { es: 'Derecho digital y TIC', en: 'Digital and ICT law' },
  whatsapp: {
    es: 'Hola, vengo de la página de asesorías en derecho digital y TIC y quiero hablar con un asesor.',
    en: 'Hello, I come from the digital and ICT law advisory page and would like to talk to an advisor.',
  },

  hero: {
    badge: { es: 'Derecho digital y TIC', en: 'Digital and ICT law' },
    title: {
      es: 'Asesoría legal para hacer negocios en el entorno digital',
      en: 'Legal advice for doing business in the digital world',
    },
    subtitle: {
      es: 'Acompañamos a empresas digitales, startups y comercios electrónicos en sus decisiones legales sobre tecnología: protección de datos, contratos tecnológicos, comercio electrónico, ciberseguridad y nuevas regulaciones.',
      en: 'We support digital companies, startups and online stores in their legal decisions about technology: data protection, tech contracts, e-commerce, cybersecurity and new regulations.',
    },
    cta: { es: 'Hablar con un asesor', en: 'Talk to an advisor' },
    trust: [
      { es: 'Abogadas con maestría en Derecho Digital y Legal Tech', en: 'Lawyers with a master’s in Digital Law and Legal Tech' },
      { es: 'Consulta puntual o acompañamiento', en: 'One-off advice or ongoing support' },
    ],
    card: {
      title: { es: 'Áreas de asesoría', en: 'Advisory areas' },
      items: [
        { icon: 'ShieldCheck', text: { es: 'Protección de datos y privacidad', en: 'Data protection and privacy' } },
        { icon: 'ShoppingCart', text: { es: 'Comercio electrónico y consumidor en línea', en: 'E-commerce and online consumers' } },
        { icon: 'FileSignature', text: { es: 'Contratos tecnológicos', en: 'Technology contracts' } },
        { icon: 'Lock', text: { es: 'Ciberseguridad e incidentes', en: 'Cybersecurity and incidents' } },
        { icon: 'Brain', text: { es: 'Inteligencia artificial y nuevas regulaciones', en: 'Artificial intelligence and new regulations' } },
      ],
    },
  },

  risk: {
    label: { es: 'El reto', en: 'The challenge' },
    title: {
      es: 'Lo digital avanza más rápido que los contratos',
      en: 'Digital moves faster than contracts',
    },
    cards: [
      {
        icon: 'FileText',
        title: { es: 'Términos copiados', en: 'Copied terms' },
        text: {
          es: 'Términos y condiciones tomados de otra página que no reflejan tu negocio ni la ley colombiana.',
          en: 'Terms and conditions taken from another site that do not reflect your business or Colombian law.',
        },
      },
      {
        icon: 'Handshake',
        title: { es: 'Proveedores sin reglas claras', en: 'Vendors without clear rules' },
        text: {
          es: 'Software, nube y desarrollo sin un contrato que diga quién responde si algo falla o si se filtran datos.',
          en: 'Software, cloud and development with no contract saying who is liable if something fails or data leaks.',
        },
      },
      {
        icon: 'Gavel',
        title: { es: 'Reglas que cambian', en: 'Rules that keep changing' },
        text: {
          es: 'Datos, comercio electrónico e inteligencia artificial tienen normas que se actualizan constantemente.',
          en: 'Data, e-commerce and artificial intelligence rules are constantly updated.',
        },
      },
    ],
    ctaQuestion: {
      es: '¿Tienes una decisión legal pendiente sobre tecnología?',
      en: 'Do you have a pending legal decision about technology?',
    },
  },

  includes: {
    label: { es: 'Qué hacemos', en: 'What we do' },
    title: { es: 'Soluciones legales para lo digital', en: 'Legal solutions for digital business' },
    cards: [
      {
        icon: 'FileText',
        title: { es: 'Documentos legales de tu sitio y app', en: 'Legal documents for your site and app' },
        text: { es: 'Términos y condiciones, política de tratamiento de datos y política de cookies.', en: 'Terms and conditions, data processing policy and cookie policy.' },
      },
      {
        icon: 'FileSignature',
        title: { es: 'Contratos tecnológicos', en: 'Technology contracts' },
        text: { es: 'SaaS, licencias de software, desarrollo, servicios en la nube y confidencialidad.', en: 'SaaS, software licenses, development, cloud services and confidentiality.' },
      },
      {
        icon: 'ShoppingCart',
        title: { es: 'Comercio electrónico', en: 'E-commerce' },
        text: { es: 'Información al consumidor, derecho de retracto y garantías en ventas en línea.', en: 'Consumer information, right of withdrawal and warranties in online sales.' },
      },
      {
        icon: 'BadgeCheck',
        title: { es: 'Firma electrónica y mensajes de datos', en: 'Electronic signatures and data messages' },
        text: { es: 'Validez de documentos, firmas y contratos celebrados por medios digitales.', en: 'Validity of documents, signatures and contracts made by digital means.' },
      },
      {
        icon: 'Siren',
        title: { es: 'Incidentes y requerimientos', en: 'Incidents and inquiries' },
        text: { es: 'Qué hacer ante una fuga de datos y cómo responder a un requerimiento de la SIC.', en: 'What to do after a data leak and how to answer an SIC inquiry.' },
      },
      {
        icon: 'Brain',
        title: { es: 'Inteligencia artificial', en: 'Artificial intelligence' },
        text: { es: 'Uso responsable de datos personales en herramientas y proyectos de IA.', en: 'Responsible use of personal data in AI tools and projects.' },
      },
    ],
  },

  explainer: {
    label: { es: 'Marco legal', en: 'Legal framework' },
    title: { es: 'Las normas que más aplicamos', en: 'The rules we apply most' },
    items: [
      {
        title: { es: 'Ley 1581 de 2012', en: 'Law 1581 of 2012' },
        text: { es: 'Protección de datos personales: autorización, derechos de los titulares y responsabilidad demostrada.', en: 'Personal data protection: authorization, data subject rights and demonstrated accountability.' },
      },
      {
        title: { es: 'Ley 527 de 1999', en: 'Law 527 of 1999' },
        text: { es: 'Comercio electrónico, mensajes de datos y firmas digitales.', en: 'E-commerce, data messages and digital signatures.' },
      },
      {
        title: { es: 'Ley 1480 de 2011', en: 'Law 1480 of 2011' },
        text: { es: 'Estatuto del Consumidor, con reglas para las ventas a distancia y en línea.', en: 'Consumer Statute, with rules for distance and online sales.' },
      },
    ],
  },

  process: {
    label: { es: 'Cómo funciona', en: 'How it works' },
    title: { es: 'Del caso a la solución', en: 'From case to solution' },
    steps: [
      { title: { es: 'Conversación inicial', en: 'First conversation' }, text: { es: 'Nos cuentas tu negocio y la decisión que tienes pendiente.', en: 'You tell us about your business and the decision you face.' } },
      { title: { es: 'Análisis del caso', en: 'Case analysis' }, text: { es: 'Revisamos documentos, contratos y la norma aplicable.', en: 'We review documents, contracts and the applicable rules.' } },
      { title: { es: 'Propuesta', en: 'Proposal' }, text: { es: 'Consulta puntual o acompañamiento continuo, según lo que necesites.', en: 'One-off advice or ongoing support, as you need.' } },
      { title: { es: 'Solución y seguimiento', en: 'Solution and follow-up' }, text: { es: 'Entregamos documentos, conceptos o acompañamiento, y seguimos contigo.', en: 'We deliver documents, opinions or support, and stay with you.' } },
    ],
  },

  audience: {
    label: { es: 'Para quién', en: 'Who it is for' },
    title: { es: 'Negocios que viven en lo digital', en: 'Businesses that live online' },
    items: [
      { icon: 'Code', text: { es: 'Startups y empresas SaaS', en: 'Startups and SaaS companies' } },
      { icon: 'ShoppingCart', text: { es: 'Comercios electrónicos', en: 'Online stores' } },
      { icon: 'Network', text: { es: 'Agencias digitales', en: 'Digital agencies' } },
      { icon: 'Building2', text: { es: 'Empresas en transformación digital', en: 'Companies going digital' } },
      { icon: 'Stethoscope', text: { es: 'Salud y telemedicina', en: 'Healthcare and telemedicine' } },
      { icon: 'Briefcase', text: { es: 'Emprendedores y profesionales independientes', en: 'Entrepreneurs and freelancers' } },
    ],
  },

  faq: [
    {
      q: { es: '¿Es por horas o por proyecto?', en: 'Is it hourly or per project?' },
      a: {
        es: 'Puede ser una consulta puntual o un acompañamiento continuo. Lo definimos contigo según tu necesidad.',
        en: 'It can be one-off advice or ongoing support. We define it with you based on your needs.',
      },
    },
    {
      q: { es: '¿Revisan contratos con proveedores tecnológicos?', en: 'Do you review contracts with tech vendors?' },
      a: {
        es: 'Sí. Revisamos y negociamos contratos de software, nube y desarrollo, con foco en responsabilidad, datos y confidencialidad.',
        en: 'Yes. We review and negotiate software, cloud and development contracts, focusing on liability, data and confidentiality.',
      },
    },
    {
      q: { es: '¿Atienden empresas fuera de Colombia?', en: 'Do you work with companies outside Colombia?' },
      a: {
        es: 'Nuestra asesoría se basa en la ley colombiana. Si tu operación involucra otros países, te lo decimos desde el inicio.',
        en: 'Our advice is based on Colombian law. If your operation involves other countries, we tell you from the start.',
      },
    },
    {
      q: { es: '¿Cuánto cuesta?', en: 'How much does it cost?' },
      a: {
        es: 'Depende del caso. En la primera conversación entendemos lo que necesitas y te enviamos una propuesta.',
        en: 'It depends on the case. In the first conversation we understand what you need and send you a proposal.',
      },
    },
  ],

  final: {
    title: { es: 'Cuéntanos tu caso', en: 'Tell us about your case' },
    subtitle: {
      es: 'Escríbenos por WhatsApp y te ponemos en contacto con una abogada especializada.',
      en: 'Write to us on WhatsApp and we will put you in touch with a specialized lawyer.',
    },
  },
};
