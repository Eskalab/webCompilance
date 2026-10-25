import type { LandingContent } from './types';

// Formato (duración, modalidad, certificado) y beneficios: src/lib/home-data.ts (sección Capacitaciones del home)
export const capacitaciones: LandingContent = {
  path: '/productos/capacitaciones-seguridad-informacion',
  meta: {
    title: 'Capacitación en seguridad de la información y gobierno de datos para empresas | TDE',
    description:
      'Cursos B2B sobre buenas prácticas de seguridad de la información, protección de datos personales y gobierno de datos. Presencial o virtual, con certificado.',
  },
  og: {
    kicker: 'TDE · Capacitación empresarial',
    title: 'Seguridad de la información y gobierno de datos para tu equipo',
    subtitle: 'Cursos para empresas, presenciales o virtuales, con certificado',
    tags: ['Seguridad', 'Gobierno de datos', 'Ley 1581', 'B2B'],
  },
  name: { es: 'Capacitaciones empresariales', en: 'Corporate training' },
  whatsapp: {
    es: 'Hola, vengo de la página de capacitaciones y quiero información sobre los cursos de seguridad de la información y gobierno de datos para mi empresa.',
    en: 'Hello, I come from the training page and would like information about the information security and data governance courses for my company.',
  },

  hero: {
    badge: { es: 'Capacitación empresarial · B2B', en: 'Corporate training · B2B' },
    title: {
      es: 'Capacita a tu equipo en seguridad de la información y gobierno de datos',
      en: 'Train your team in information security and data governance',
    },
    subtitle: {
      es: 'Cursos para empresas sobre buenas prácticas de seguridad, manejo de datos personales y gobierno de datos, adaptados a tu sector y dictados por abogados e ingenieros especializados.',
      en: 'Courses for companies on security best practices, personal data handling and data governance, tailored to your industry and taught by specialized lawyers and engineers.',
    },
    cta: { es: 'Solicitar información', en: 'Request information' },
    trust: [
      { es: 'Presencial o virtual', en: 'On-site or online' },
      { es: 'Certificado de participación', en: 'Certificate of participation' },
      { es: 'Adaptado a tu empresa', en: 'Tailored to your company' },
    ],
    card: {
      title: { es: 'Formato', en: 'Format' },
      items: [
        { icon: 'Clock', text: { es: '3, 6, 9 o 12 horas según lo que necesites', en: '3, 6, 9 or 12 hours, as you need' } },
        { icon: 'MonitorSmartphone', text: { es: 'Presencial o virtual', en: 'On-site or online' } },
        { icon: 'GraduationCap', text: { es: 'Profesores certificados y con experiencia en el área', en: 'Certified instructors with field experience' } },
        { icon: 'Award', text: { es: 'Certificado de participación al finalizar', en: 'Certificate of participation at the end' } },
      ],
    },
  },

  risk: {
    label: { es: 'Por qué capacitar', en: 'Why train' },
    title: {
      es: 'La seguridad no depende solo de la tecnología',
      en: 'Security does not depend on technology alone',
    },
    cards: [
      {
        icon: 'Mail',
        title: { es: 'Engaños que parecen reales', en: 'Scams that look real' },
        text: {
          es: 'Un correo o un mensaje falso basta para entregar una contraseña o un archivo. Reconocerlos se aprende.',
          en: 'One fake email or message is enough to hand over a password or a file. Spotting them can be learned.',
        },
      },
      {
        icon: 'Share2',
        title: { es: 'Datos que circulan sin control', en: 'Data moving without control' },
        text: {
          es: 'Bases de clientes por WhatsApp, memorias USB, correos personales. Cada atajo es una puerta abierta.',
          en: 'Customer lists over WhatsApp, USB drives, personal email. Every shortcut is an open door.',
        },
      },
      {
        icon: 'Workflow',
        title: { es: 'Decisiones sin reglas claras', en: 'Decisions without clear rules' },
        text: {
          es: 'Quién accede a qué, cuánto tiempo se guarda y cuándo se borra. Eso es gobierno de datos, y casi nunca está escrito.',
          en: 'Who accesses what, how long it is kept and when it is deleted. That is data governance, and it is rarely written down.',
        },
      },
    ],
    note: {
      text: {
        es: '“La seguridad no es un evento único, sino un proceso continuo.”',
        en: '“Security is not a one-time event, but a continuous process.”',
      },
    },
    ctaQuestion: {
      es: '¿Tu equipo sabría qué hacer frente a un correo sospechoso?',
      en: 'Would your team know what to do with a suspicious email?',
    },
  },

  includes: {
    label: { es: 'Temario', en: 'Syllabus' },
    title: { es: 'Lo que aprende tu equipo', en: 'What your team learns' },
    desc: {
      es: 'Módulos prácticos, con ejemplos del día a día de tu sector.',
      en: 'Hands-on modules, with everyday examples from your industry.',
    },
    cards: [
      {
        icon: 'ShieldCheck',
        title: { es: 'Fundamentos de seguridad', en: 'Security fundamentals' },
        items: [
          { es: 'Confidencialidad, integridad y disponibilidad', en: 'Confidentiality, integrity and availability' },
          { es: 'Buenas prácticas basadas en ISO 27001 e ISO 27032', en: 'Best practices based on ISO 27001 and ISO 27032' },
        ],
      },
      {
        icon: 'Mail',
        title: { es: 'Prevención de amenazas', en: 'Threat prevention' },
        items: [
          { es: 'Phishing e ingeniería social', en: 'Phishing and social engineering' },
          { es: 'Malware y descargas', en: 'Malware and downloads' },
          { es: 'Contraseñas y doble factor', en: 'Passwords and two-factor authentication' },
        ],
      },
      {
        icon: 'UserCheck',
        title: { es: 'Protección de datos personales', en: 'Personal data protection' },
        items: [
          { es: 'Ley 1581: autorización y finalidad', en: 'Law 1581: authorization and purpose' },
          { es: 'Datos sensibles y de menores', en: 'Sensitive data and minors’ data' },
          { es: 'Derechos de los titulares', en: 'Data subject rights' },
        ],
      },
      {
        icon: 'Database',
        title: { es: 'Gobierno de datos', en: 'Data governance' },
        items: [
          { es: 'Roles y responsables', en: 'Roles and owners' },
          { es: 'Clasificación de la información', en: 'Information classification' },
          { es: 'Acceso mínimo, conservación y eliminación', en: 'Least-privilege access, retention and deletion' },
        ],
      },
      {
        icon: 'Siren',
        title: { es: 'Gestión de incidentes', en: 'Incident management' },
        items: [
          { es: 'Qué hacer y a quién avisar', en: 'What to do and whom to notify' },
          { es: 'Reporte de incidentes ante la SIC', en: 'Reporting incidents to the SIC' },
        ],
      },
      {
        icon: 'MonitorSmartphone',
        title: { es: 'Trabajo remoto y dispositivos', en: 'Remote work and devices' },
        items: [
          { es: 'Redes, equipos personales y celulares', en: 'Networks, personal computers and phones' },
          { es: 'Uso seguro de la nube', en: 'Safe use of the cloud' },
        ],
      },
    ],
    note: {
      es: 'El temario se ajusta a tu sector y a la duración que elijas.',
      en: 'The syllabus adapts to your industry and the length you choose.',
    },
  },

  process: {
    label: { es: 'Cómo funciona', en: 'How it works' },
    title: { es: 'De la necesidad al certificado', en: 'From need to certificate' },
    steps: [
      { title: { es: 'Conversamos', en: 'We talk' }, text: { es: 'Nos cuentas a quién quieres capacitar, en qué área y qué te preocupa.', en: 'You tell us whom you want to train, in which area and what concerns you.' } },
      { title: { es: 'Propuesta', en: 'Proposal' }, text: { es: 'Te enviamos el temario, la duración y la modalidad ajustados a tu empresa.', en: 'We send you the syllabus, length and format tailored to your company.' } },
      { title: { es: 'Sesiones', en: 'Sessions' }, text: { es: 'Clases prácticas, presenciales o virtuales, con ejemplos de tu sector.', en: 'Hands-on classes, on-site or online, with examples from your industry.' } },
      { title: { es: 'Certificado', en: 'Certificate' }, text: { es: 'Cada participante recibe su certificado de participación.', en: 'Each participant receives a certificate of participation.' } },
    ],
  },

  audience: {
    label: { es: 'Para quién', en: 'Who it is for' },
    title: { es: 'Todas las áreas que tocan datos', en: 'Every area that touches data' },
    items: [
      { icon: 'Briefcase', text: { es: 'Directivos y líderes de área', en: 'Executives and team leads' } },
      { icon: 'Users', text: { es: 'Talento humano', en: 'Human resources' } },
      { icon: 'ShoppingCart', text: { es: 'Equipos comerciales y de servicio', en: 'Sales and service teams' } },
      { icon: 'Code', text: { es: 'Tecnología y sistemas', en: 'IT and systems' } },
      { icon: 'ShieldCheck', text: { es: 'Responsables de SST', en: 'Occupational health and safety leads' } },
      { icon: 'FileText', text: { es: 'Áreas administrativas', en: 'Administrative teams' } },
    ],
  },

  highlights: {
    label: { es: 'Beneficios', en: 'Benefits' },
    title: { es: 'Lo que gana tu empresa', en: 'What your company gains' },
    columns: [
      {
        title: { es: 'En tu equipo', en: 'In your team' },
        items: [
          { es: 'Prevenir y cerrar brechas: del phishing al malware', en: 'Prevent and close gaps: from phishing to malware' },
          { es: 'Una cultura de seguridad donde cada persona sabe su papel', en: 'A security culture where everyone knows their role' },
          { es: 'Contenido adaptado a los retos de tu empresa', en: 'Content tailored to your company’s challenges' },
        ],
      },
      {
        title: { es: 'Frente a la ley', en: 'Before the law' },
        dark: true,
        items: [
          { es: 'Evidencia de capacitación para la responsabilidad demostrada', en: 'Training evidence for demonstrated accountability' },
          { es: 'Personal que aplica la Ley 1581 en su trabajo diario', en: 'Staff who apply Law 1581 in their daily work' },
          { es: 'Mejora continua de las prácticas de seguridad', en: 'Continuous improvement of security practices' },
        ],
      },
    ],
    cta: { es: 'Quiero capacitar a mi equipo', en: 'I want to train my team' },
  },

  faq: [
    {
      q: { es: '¿Cuánto cuesta?', en: 'How much does it cost?' },
      a: {
        es: 'Depende de la duración, la modalidad y el número de participantes. Escríbenos y te enviamos una propuesta.',
        en: 'It depends on length, format and number of participants. Write to us and we will send you a proposal.',
      },
    },
    {
      q: { es: '¿Se puede para un área específica?', en: 'Can it be for a specific team?' },
      a: {
        es: 'Sí. Podemos capacitar a un área, como comercial o talento humano, o a toda la empresa.',
        en: 'Yes. We can train one team, such as sales or HR, or the whole company.',
      },
    },
    {
      q: { es: '¿Entregan certificado?', en: 'Do you issue a certificate?' },
      a: {
        es: 'Sí, cada participante recibe un certificado de participación al finalizar.',
        en: 'Yes, each participant receives a certificate of participation at the end.',
      },
    },
    {
      q: { es: '¿Sirve como evidencia ante la SIC?', en: 'Does it count as evidence before the SIC?' },
      a: {
        es: 'Capacitar al personal es una de las medidas que demuestran responsabilidad en el tratamiento de datos. La capacitación ayuda, pero por sí sola no garantiza el cumplimiento de la Ley 1581.',
        en: 'Training staff is one of the measures that demonstrate accountability in data processing. It helps, but on its own it does not guarantee compliance with Law 1581.',
      },
      link: { href: '/productos/diagnostico-legal-360', label: { es: 'Ver el Diagnóstico Legal 360', en: 'See the Legal Diagnosis 360' } },
    },
  ],

  final: {
    title: { es: 'Tu equipo es parte de tu seguridad', en: 'Your team is part of your security' },
    subtitle: {
      es: 'Cuéntanos a quién quieres capacitar y te proponemos el curso.',
      en: 'Tell us whom you want to train and we will propose the course.',
    },
  },
};
