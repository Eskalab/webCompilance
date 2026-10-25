import type { LandingContent } from './types';

// Fuente: brain/Áreas/TDE/Base de conocimiento/Operaciones/proceso-diagnostico-legal-360.md
export const diagnosticoLegal360: LandingContent = {
  path: '/productos/diagnostico-legal-360',
  meta: {
    title: 'Diagnóstico Legal 360 — Protección de datos para tu empresa | TDE',
    description:
      'Auditoría de protección de datos personales y seguridad de la información: nivel de cumplimiento de la Ley 1581, riesgos priorizados y plan de acción concreto.',
  },
  og: {
    kicker: 'TDE · Diagnóstico Legal 360',
    title: '¿Qué tan protegida está tu empresa frente a la Ley 1581?',
    subtitle: 'Nivel de cumplimiento, riesgos priorizados y un plan de acción concreto',
    tags: ['Ley 1581', 'Datos personales', 'Seguridad', 'Plan de acción'],
  },
  name: { es: 'Diagnóstico Legal 360', en: 'Legal Diagnosis 360' },
  whatsapp: {
    es: 'Hola, vengo de la página del Diagnóstico Legal 360 y quiero agendar una sesión informativa.',
    en: 'Hello, I come from the Legal Diagnosis 360 page and I would like to book an information session.',
  },

  hero: {
    badge: { es: 'Ley 1581 de 2012 · Protección de datos', en: 'Law 1581 of 2012 · Data protection' },
    title: {
      es: 'Descubre qué tan protegida está tu empresa frente a la Ley 1581',
      en: 'Find out how protected your company is under Law 1581',
    },
    subtitle: {
      es: 'Revisamos cómo tu empresa recolecta, guarda y comparte datos personales, y te entregamos tu nivel de cumplimiento, los riesgos ordenados por prioridad y un plan de acción con pasos concretos.',
      en: 'We review how your company collects, stores and shares personal data, and deliver your compliance level, risks ranked by priority and an action plan with concrete steps.',
    },
    cta: { es: 'Agendar mi sesión gratuita', en: 'Book my free session' },
    trust: [
      { es: 'Sesión informativa sin costo', en: 'Free information session' },
      { es: 'Poca carga para tu equipo', en: 'Light load on your team' },
      { es: 'Informe pensado para directivos', en: 'Report built for executives' },
    ],
    card: {
      title: { es: 'Lo que recibes', en: 'What you get' },
      items: [
        { icon: 'FileCheck', text: { es: 'Informe con semáforo por área: rojo, amarillo y verde', en: 'Report with a traffic light per area: red, yellow and green' } },
        { icon: 'TriangleAlert', text: { es: 'Mapa de riesgos ordenado por criticidad', en: 'Risk map ranked by severity' } },
        { icon: 'ListChecks', text: { es: 'Plan de acción priorizado en formato checklist', en: 'Prioritized action plan as a checklist' } },
        { icon: 'Presentation', text: { es: 'Presentación ejecutiva en una sesión de 60 minutos', en: 'Executive presentation in a 60-minute session' } },
      ],
    },
  },

  risk: {
    label: { es: 'El riesgo que no se ve', en: 'The hidden risk' },
    title: {
      es: 'Toda empresa trata datos personales, aunque no lo note',
      en: 'Every company processes personal data, even without noticing',
    },
    cards: [
      {
        icon: 'Users',
        title: { es: 'Clientes', en: 'Customers' },
        text: {
          es: 'Formularios, CRM, listas de correo y chats. Cada dato necesita una autorización y una política que explique para qué se usa.',
          en: 'Forms, CRM, mailing lists and chats. Each piece of data needs an authorization and a policy explaining what it is used for.',
        },
      },
      {
        icon: 'Briefcase',
        title: { es: 'Empleados', en: 'Employees' },
        text: {
          es: 'Hojas de vida, nómina, incapacidades. Algunos son datos sensibles, como los de salud, y la ley les exige más cuidado.',
          en: 'Résumés, payroll, sick leave. Some are sensitive data, such as health data, and the law requires extra care.',
        },
      },
      {
        icon: 'Handshake',
        title: { es: 'Proveedores', en: 'Vendors' },
        text: {
          es: 'El contador, el software en la nube, la agencia de marketing. Si acceden a tus datos sin contrato, el riesgo sigue siendo tuyo.',
          en: 'Your accountant, cloud software, marketing agency. If they access your data without a contract, the risk is still yours.',
        },
      },
    ],
    note: {
      text: {
        es: 'La Ley 1581 aplica a toda empresa que trate datos personales, sin importar su tamaño. Las multas de la SIC pueden llegar a 2.000 salarios mínimos mensuales.',
        en: 'Law 1581 applies to every company that processes personal data, regardless of size. Fines from the SIC can reach 2,000 monthly minimum wages.',
      },
      source: { es: 'Ley 1581 de 2012, artículo 23.', en: 'Law 1581 of 2012, article 23.' },
    },
    ctaQuestion: {
      es: '¿No sabes si tu empresa cumple? Esa ya es una señal.',
      en: 'Not sure whether your company complies? That is already a sign.',
    },
  },

  includes: {
    label: { es: 'Qué evaluamos', en: 'What we assess' },
    title: { es: '7 áreas de tu empresa', en: '7 areas of your company' },
    desc: {
      es: 'Abogados e ingenieros revisan el cumplimiento legal y los controles técnicos.',
      en: 'Lawyers and engineers review legal compliance and technical controls.',
    },
    cards: [
      { icon: 'Database', title: { es: 'Bases de datos', en: 'Databases' }, text: { es: 'Qué bases tienes, cómo se protegen y, si te aplica, su registro ante la SIC.', en: 'Which databases you hold, how they are protected and, if it applies to you, their registration with the SIC.' } },
      { icon: 'UserCheck', title: { es: 'Autorización', en: 'Authorization' }, text: { es: 'Si tienes el consentimiento de los titulares y puedes probarlo.', en: 'Whether you have data subjects’ consent and can prove it.' } },
      { icon: 'FileText', title: { es: 'Política de tratamiento', en: 'Data processing policy' }, text: { es: 'Si existe, está publicada y refleja lo que de verdad hace tu empresa.', en: 'Whether it exists, is published and reflects what your company actually does.' } },
      { icon: 'Scale', title: { es: 'Derechos de los titulares', en: 'Data subject rights' }, text: { es: 'Si tienes un proceso para responder consultas y reclamos a tiempo.', en: 'Whether you have a process to answer requests and complaints on time.' } },
      { icon: 'Handshake', title: { es: 'Terceros y contratos', en: 'Third parties and contracts' }, text: { es: 'Si tus proveedores cumplen y hay contratos de transmisión y confidencialidad.', en: 'Whether your vendors comply and there are data processing and confidentiality contracts.' } },
      { icon: 'Lock', title: { es: 'Seguridad técnica', en: 'Technical security' }, text: { es: 'Controles de acceso, contraseñas, copias de seguridad.', en: 'Access controls, passwords, backups.' } },
      { icon: 'Siren', title: { es: 'Incidentes', en: 'Incidents' }, text: { es: 'Si ha habido fugas y si tu equipo sabe qué hacer cuando ocurre una.', en: 'Whether there have been leaks and whether your team knows what to do when one happens.' } },
    ],
  },

  process: {
    label: { es: 'Cómo funciona', en: 'How it works' },
    title: { es: 'Cuatro fases, de la duda al plan', en: 'Four phases, from doubt to plan' },
    steps: [
      {
        title: { es: 'Inicio y recolección', en: 'Kickoff and data gathering' },
        text: { es: 'Una reunión de inicio y te pedimos la información básica: bases de datos, herramientas, políticas y contratos.', en: 'A kickoff meeting, then we ask for the basics: databases, tools, policies and contracts.' },
        duration: { es: '2 a 3 días', en: '2 to 3 days' },
      },
      {
        title: { es: 'Análisis', en: 'Analysis' },
        text: { es: 'Evaluamos las 7 áreas con la información que nos compartes. Tu equipo sigue trabajando normal.', en: 'We assess the 7 areas with the information you share. Your team keeps working as usual.' },
        duration: { es: '1 a 2 semanas', en: '1 to 2 weeks' },
      },
      {
        title: { es: 'Informe', en: 'Report' },
        text: { es: 'Resumen ejecutivo, hallazgos con semáforo, mapa de riesgos y plan de acción priorizado.', en: 'Executive summary, traffic-light findings, risk map and prioritized action plan.' },
        duration: { es: '3 a 5 días', en: '3 to 5 days' },
      },
      {
        title: { es: 'Entrega', en: 'Delivery' },
        text: { es: 'Te presentamos el informe para que sepas exactamente qué hacer primero, segundo y tercero.', en: 'We walk you through the report so you know exactly what to do first, second and third.' },
        duration: { es: 'Una sesión de 60 minutos', en: 'One 60-minute session' },
      },
    ],
    table: {
      title: { es: 'Duración estimada según el tamaño de tu empresa', en: 'Estimated duration by company size' },
      rows: [
        { label: { es: 'Microempresa (1 a 10 empleados)', en: 'Micro business (1 to 10 employees)' }, value: { es: '1 a 2 semanas', en: '1 to 2 weeks' } },
        { label: { es: 'Pyme (10 a 50 empleados)', en: 'SME (10 to 50 employees)' }, value: { es: '2 a 3 semanas', en: '2 to 3 weeks' } },
        { label: { es: 'Empresa mediana (más de 50)', en: 'Mid-size company (50+)' }, value: { es: '3 a 5 semanas', en: '3 to 5 weeks' } },
      ],
    },
  },

  audience: {
    label: { es: 'Para quién', en: 'Who it is for' },
    title: { es: 'Empresas que manejan datos de personas', en: 'Companies that handle people’s data' },
    items: [
      { icon: 'Briefcase', text: { es: 'Directivos y gerentes', en: 'Executives and managers' } },
      { icon: 'Stethoscope', text: { es: 'Clínicas y consultorios', en: 'Clinics and medical offices' } },
      { icon: 'Calculator', text: { es: 'Contadores y firmas', en: 'Accountants and firms' } },
      { icon: 'House', text: { es: 'Propiedad horizontal', en: 'Residential complexes' } },
      { icon: 'Code', text: { es: 'Empresas SaaS y de tecnología', en: 'SaaS and tech companies' } },
      { icon: 'ShoppingCart', text: { es: 'Comercio electrónico', en: 'E-commerce' } },
    ],
  },

  highlights: {
    label: { es: 'Entregables', en: 'Deliverables' },
    title: { es: 'Claridad que puedes usar', en: 'Clarity you can act on' },
    columns: [
      {
        title: { es: 'Al terminar el diagnóstico', en: 'When the diagnosis ends' },
        items: [
          { es: 'Informe PDF del Diagnóstico Legal 360', en: 'Legal Diagnosis 360 PDF report' },
          { es: 'Presentación ejecutiva', en: 'Executive presentation' },
          { es: 'Plan de acción en formato checklist', en: 'Action plan as a checklist' },
          { es: 'Grabación de la sesión de entrega (opcional)', en: 'Recording of the delivery session (optional)' },
        ],
      },
      {
        title: { es: 'Si quieres que te acompañemos después', en: 'If you want us to help afterwards' },
        dark: true,
        items: [
          { es: 'Implementación de la política de tratamiento', en: 'Implementation of the data processing policy' },
          { es: 'Registro de bases de datos ante la SIC, si te aplica', en: 'Database registration with the SIC, if it applies to you' },
          { es: 'Capacitación de tu equipo', en: 'Training for your team' },
          { es: 'Acompañamiento mensual de cumplimiento', en: 'Monthly compliance support' },
        ],
      },
    ],
    cta: { es: 'Quiero mi diagnóstico', en: 'I want my diagnosis' },
  },

  faq: [
    {
      q: { es: '¿Cuánto cuesta?', en: 'How much does it cost?' },
      a: {
        es: 'Depende del tamaño de tu empresa y de cuántas bases de datos manejes. En la sesión informativa gratuita revisamos tu caso y te enviamos una propuesta. Se paga 50 % al firmar y 50 % al entregar el informe.',
        en: 'It depends on your company’s size and how many databases you handle. In the free information session we review your case and send you a proposal. You pay 50% when signing and 50% when the report is delivered.',
      },
    },
    {
      q: { es: '¿Cuánto tiempo le toma a mi equipo?', en: 'How much of my team’s time does it take?' },
      a: {
        es: 'Poco: una reunión de inicio, compartir la información que te pedimos y la sesión de entrega. El análisis lo hacemos nosotros.',
        en: 'Very little: a kickoff meeting, sharing the information we ask for and the delivery session. We do the analysis.',
      },
    },
    {
      q: { es: 'Somos una empresa pequeña, ¿esto nos aplica?', en: 'We are a small company, does this apply to us?' },
      a: {
        es: 'Sí. La Ley 1581 aplica a toda empresa que trate datos de clientes, empleados o proveedores, sin importar su tamaño.',
        en: 'Yes. Law 1581 applies to every company that processes data about customers, employees or vendors, regardless of size.',
      },
    },
    {
      q: { es: 'Ya tenemos un abogado, ¿para qué lo necesitamos?', en: 'We already have a lawyer, why do we need this?' },
      a: {
        es: 'Nos especializamos en protección de datos y seguridad de la información, un área muy técnica. Podemos trabajar de la mano con tu asesor actual.',
        en: 'We specialize in data protection and information security, a highly technical area. We can work hand in hand with your current advisor.',
      },
    },
    {
      q: { es: '¿En qué se diferencia del Escáner Legal gratuito?', en: 'How is it different from the free Legal Scanner?' },
      a: {
        es: 'El Escáner Legal revisa solo tu sitio web, de forma automática. El Diagnóstico Legal 360 revisa toda tu empresa: bases de datos, procesos, contratos y seguridad, con abogados e ingenieros.',
        en: 'The Legal Scanner only reviews your website, automatically. The Legal Diagnosis 360 reviews your whole company: databases, processes, contracts and security, with lawyers and engineers.',
      },
      link: { href: '/productos/escaner-legal', label: { es: 'Probar el Escáner Legal', en: 'Try the Legal Scanner' } },
    },
  ],

  final: {
    title: { es: 'Empieza con una conversación', en: 'Start with a conversation' },
    subtitle: {
      es: 'Agenda una sesión informativa gratuita: revisamos tu caso y te decimos si el diagnóstico es para ti.',
      en: 'Book a free information session: we review your case and tell you whether the diagnosis is right for you.',
    },
  },
};

