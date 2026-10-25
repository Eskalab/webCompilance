import type { LandingContent } from './types';

// PIA = Privacy Impact Assessment (estudio o evaluación de impacto en la privacidad).
export const analisisPia: LandingContent = {
  path: '/productos/analisis-pia',
  meta: {
    title: 'Análisis PIA — Evaluación de impacto en la privacidad | TDE',
    description:
      'Evaluamos cómo un proyecto, sistema o proceso afecta los datos personales, qué riesgos genera y qué controles necesitas para cumplir la Ley 1581 desde el diseño.',
  },
  og: {
    kicker: 'TDE · Análisis PIA',
    title: 'Evalúa los riesgos de privacidad antes de lanzar',
    subtitle: 'Evaluación de impacto en la privacidad para proyectos y sistemas',
    tags: ['PIA', 'Privacidad desde el diseño', 'Riesgos', 'Ley 1581'],
  },
  name: { es: 'Análisis PIA', en: 'PIA analysis' },
  whatsapp: {
    es: 'Hola, vengo de la página de Análisis PIA y quiero evaluar un proyecto.',
    en: 'Hello, I come from the PIA analysis page and would like to assess a project.',
  },

  hero: {
    badge: { es: 'Evaluación de impacto en la privacidad', en: 'Privacy impact assessment' },
    title: {
      es: 'Evalúa los riesgos de privacidad antes de lanzar, no después',
      en: 'Assess privacy risks before launch, not after',
    },
    subtitle: {
      es: 'Un análisis PIA identifica cómo un nuevo proyecto, sistema o proceso afecta los datos personales, qué riesgos genera y qué controles necesitas para cumplir la Ley 1581 desde el diseño.',
      en: 'A PIA identifies how a new project, system or process affects personal data, which risks it creates and which controls you need to comply with Law 1581 by design.',
    },
    cta: { es: 'Evaluar mi proyecto', en: 'Assess my project' },
    trust: [
      { es: 'Privacidad desde el diseño', en: 'Privacy by design' },
      { es: 'Evidencia de responsabilidad demostrada', en: 'Evidence of demonstrated accountability' },
      { es: 'Plan de controles priorizado', en: 'Prioritized control plan' },
    ],
    card: {
      title: { es: 'Cuándo conviene un PIA', en: 'When a PIA makes sense' },
      items: [
        { icon: 'MonitorSmartphone', text: { es: 'Vas a lanzar una app, plataforma o CRM', en: 'You are launching an app, platform or CRM' } },
        { icon: 'Brain', text: { es: 'Usarás inteligencia artificial con datos de personas', en: 'You will use AI with people’s data' } },
        { icon: 'Fingerprint', text: { es: 'Tratarás datos sensibles: salud, biométricos o de menores', en: 'You will process sensitive data: health, biometrics or minors' } },
        { icon: 'Globe', text: { es: 'Compartirás datos con terceros o fuera de Colombia', en: 'You will share data with third parties or abroad' } },
        { icon: 'Eye', text: { es: 'Instalarás videovigilancia o control de acceso', en: 'You will install video surveillance or access control' } },
      ],
    },
  },

  risk: {
    label: { es: 'Por qué antes', en: 'Why before' },
    title: { es: 'Corregir después siempre cuesta más', en: 'Fixing it later always costs more' },
    cards: [
      {
        icon: 'Code',
        title: { es: 'Rediseñar en producción', en: 'Redesigning in production' },
        text: {
          es: 'Cambiar cómo un sistema recolecta o guarda datos cuando ya está en uso es lento y costoso.',
          en: 'Changing how a system collects or stores data once it is live is slow and expensive.',
        },
      },
      {
        icon: 'TriangleAlert',
        title: { es: 'Operaciones en riesgo', en: 'Operations at risk' },
        text: {
          es: 'Un tratamiento sin base legal puede terminar en sanciones, incluida la suspensión de actividades.',
          en: 'Processing without a legal basis can end in sanctions, including the suspension of activities.',
        },
      },
      {
        icon: 'FileCheck',
        title: { es: 'Sin evidencia, no hay defensa', en: 'No evidence, no defense' },
        text: {
          es: 'Ante la SIC no basta con haber actuado bien: tienes que poder demostrar que evaluaste los riesgos.',
          en: 'Before the SIC, acting well is not enough: you must be able to show that you assessed the risks.',
        },
      },
    ],
    note: {
      text: {
        es: 'La Ley 1581 permite a la SIC imponer multas de hasta 2.000 salarios mínimos mensuales y suspender actividades relacionadas con el tratamiento hasta por seis meses.',
        en: 'Law 1581 allows the SIC to impose fines of up to 2,000 monthly minimum wages and suspend processing-related activities for up to six months.',
      },
      source: { es: 'Ley 1581 de 2012, artículo 23.', en: 'Law 1581 of 2012, article 23.' },
    },
    ctaQuestion: {
      es: '¿Tu próximo proyecto usa datos de personas?',
      en: 'Does your next project use people’s data?',
    },
  },

  includes: {
    label: { es: 'Qué analizamos', en: 'What we analyze' },
    title: { es: 'Del flujo de datos al plan de controles', en: 'From data flow to control plan' },
    cards: [
      { icon: 'Route', title: { es: 'Flujo de datos', en: 'Data flow' }, text: { es: 'Qué datos se recolectan, de dónde vienen, dónde se guardan y a dónde van.', en: 'Which data is collected, where it comes from, where it is stored and where it goes.' } },
      { icon: 'Scale', title: { es: 'Finalidad y base legal', en: 'Purpose and legal basis' }, text: { es: 'Si la autorización cubre el uso y si los datos son necesarios y proporcionales.', en: 'Whether authorization covers the use and whether the data is necessary and proportionate.' } },
      { icon: 'TriangleAlert', title: { es: 'Riesgos para las personas', en: 'Risks to individuals' }, text: { es: 'Probabilidad e impacto de cada riesgo para los titulares de los datos.', en: 'Likelihood and impact of each risk for data subjects.' } },
      { icon: 'Lock', title: { es: 'Medidas y controles', en: 'Measures and controls' }, text: { es: 'Controles técnicos, organizativos y contractuales para reducir cada riesgo.', en: 'Technical, organizational and contractual controls to reduce each risk.' } },
      { icon: 'Handshake', title: { es: 'Terceros y transferencias', en: 'Third parties and transfers' }, text: { es: 'Proveedores, nube y envíos de datos fuera de Colombia.', en: 'Vendors, cloud and data transfers outside Colombia.' } },
      { icon: 'ListChecks', title: { es: 'Plan de acción', en: 'Action plan' }, text: { es: 'Qué hacer, en qué orden y quién es responsable.', en: 'What to do, in what order and who is responsible.' } },
    ],
  },

  process: {
    label: { es: 'Cómo funciona', en: 'How it works' },
    title: { es: 'Cuatro pasos', en: 'Four steps' },
    steps: [
      { title: { es: 'Entendemos el proyecto', en: 'We understand the project' }, text: { es: 'Qué quieres lograr, con qué tecnología y con qué datos.', en: 'What you want to achieve, with which technology and which data.' } },
      { title: { es: 'Mapeamos los datos', en: 'We map the data' }, text: { es: 'Dibujamos el recorrido de los datos de principio a fin.', en: 'We chart the data journey end to end.' } },
      { title: { es: 'Evaluamos los riesgos', en: 'We assess the risks' }, text: { es: 'Identificamos y priorizamos los riesgos para las personas.', en: 'We identify and prioritize the risks to individuals.' } },
      { title: { es: 'Entregamos el informe', en: 'We deliver the report' }, text: { es: 'Con las medidas recomendadas y el plan para aplicarlas.', en: 'With the recommended measures and the plan to apply them.' } },
    ],
  },

  audience: {
    label: { es: 'Para quién', en: 'Who it is for' },
    title: { es: 'Equipos que crean con datos', en: 'Teams that build with data' },
    items: [
      { icon: 'Code', text: { es: 'Equipos de producto y tecnología', en: 'Product and tech teams' } },
      { icon: 'Brain', text: { es: 'Proyectos de inteligencia artificial', en: 'Artificial intelligence projects' } },
      { icon: 'Stethoscope', text: { es: 'Salud: clínicas y consultorios', en: 'Healthcare: clinics and medical offices' } },
      { icon: 'Fingerprint', text: { es: 'Talento humano con biometría', en: 'HR teams using biometrics' } },
      { icon: 'House', text: { es: 'Propiedad horizontal con videovigilancia', en: 'Residential complexes with CCTV' } },
      { icon: 'ShoppingCart', text: { es: 'Startups y comercio electrónico', en: 'Startups and e-commerce' } },
    ],
  },

  highlights: {
    label: { es: 'Entregables', en: 'Deliverables' },
    title: { es: 'Lo que recibes', en: 'What you get' },
    columns: [
      {
        title: { es: 'Informe PIA', en: 'PIA report' },
        items: [
          { es: 'Descripción del tratamiento y del flujo de datos', en: 'Description of the processing and data flow' },
          { es: 'Matriz de riesgos', en: 'Risk matrix' },
          { es: 'Conclusiones para la dirección', en: 'Conclusions for management' },
        ],
      },
      {
        title: { es: 'Para implementar', en: 'To implement' },
        dark: true,
        items: [
          { es: 'Plan de controles priorizado', en: 'Prioritized control plan' },
          { es: 'Recomendaciones de avisos, autorizaciones y contratos', en: 'Recommendations for notices, authorizations and contracts' },
          { es: 'Evidencia documentada de responsabilidad demostrada', en: 'Documented evidence of demonstrated accountability' },
        ],
      },
    ],
    cta: { es: 'Quiero evaluar mi proyecto', en: 'I want to assess my project' },
  },

  faq: [
    {
      q: { es: '¿Es obligatorio hacer un PIA?', en: 'Is a PIA mandatory?' },
      a: {
        es: 'La Ley 1581 no lo exige con ese nombre en todos los casos, pero la SIC lo recomienda como parte del principio de responsabilidad demostrada, y es la mejor forma de evidenciar que evaluaste los riesgos antes de tratar datos.',
        en: 'Law 1581 does not require it under that name in every case, but the SIC recommends it as part of the demonstrated accountability principle, and it is the best way to show you assessed the risks before processing data.',
      },
    },
    {
      q: { es: '¿Sirve para un sistema que ya está funcionando?', en: 'Does it work for a system already running?' },
      a: {
        es: 'Sí. Lo ideal es hacerlo antes de lanzar, pero también identifica riesgos y mejoras en sistemas que ya operan.',
        en: 'Yes. Ideally it is done before launch, but it also identifies risks and improvements in systems already in operation.',
      },
    },
    {
      q: { es: '¿Cuánto tarda y cuánto cuesta?', en: 'How long does it take and how much does it cost?' },
      a: {
        es: 'Depende del alcance del proyecto y de cuántos sistemas y datos involucra. Escríbenos y te damos una propuesta.',
        en: 'It depends on the project scope and how many systems and data sets are involved. Write to us for a proposal.',
      },
    },
    {
      q: { es: '¿En qué se diferencia del Diagnóstico Legal 360?', en: 'How is it different from the Legal Diagnosis 360?' },
      a: {
        es: 'El Diagnóstico Legal 360 evalúa toda tu empresa. El PIA se enfoca en un proyecto, sistema o proceso específico.',
        en: 'The Legal Diagnosis 360 assesses your whole company. The PIA focuses on one specific project, system or process.',
      },
      link: { href: '/productos/diagnostico-legal-360', label: { es: 'Ver el Diagnóstico Legal 360', en: 'See the Legal Diagnosis 360' } },
    },
  ],

  final: {
    title: { es: 'Diseña con privacidad desde el inicio', en: 'Design with privacy from the start' },
    subtitle: {
      es: 'Cuéntanos qué vas a lanzar y te decimos cómo evaluarlo.',
      en: 'Tell us what you are launching and we will tell you how to assess it.',
    },
  },
};
