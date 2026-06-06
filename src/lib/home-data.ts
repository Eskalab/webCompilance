export interface HeroSlide {
  id: string;
  title: { es: string; en: string };
  subtitle: { es: string; en: string };
  ctaText: { es: string; en: string };
  ctaHref: string;
}

export interface ServiceData {
  id: string;
  bannerTitle: { es: string; en: string };
  sectionTitle: { es: string; en: string };
  description: { es: string; en: string };
  benefits: { es: string; en: string }[];
  ctaWhatsApp: { es: string; en: string };
}

export interface TeamMember {
  id: string;
  name: string;
  role: { es: string; en: string };
  bio: { es: string; en: string };
}

export interface BlogPost {
  id: string;
  title: { es: string; en: string };
  date: string;
  href: string;
}

export interface TrainingAccordionItem {
  id: string;
  title: { es: string; en: string };
}

export interface TrainingBenefit {
  title: { es: string; en: string };
  description: { es: string; en: string };
}

// ── Hero Slides ──

export const heroSlides: HeroSlide[] = [
  {
    id: 'asesoria-legal',
    title: { es: 'ASESORÍAS LEGALES', en: 'LEGAL ADVISORY' },
    subtitle: {
      es: 'en Políticas de Manejo de Datos Personales',
      en: 'on Personal Data Management Policies',
    },
    ctaText: { es: 'VER MÁS', en: 'LEARN MORE' },
    ctaHref: '#que-hacemos',
  },
  {
    id: 'seguridad-info',
    title: { es: 'SEGURIDAD DE LA INFORMACIÓN', en: 'INFORMATION SECURITY' },
    subtitle: {
      es: 'Protege los datos de tu empresa',
      en: 'Protect your company data',
    },
    ctaText: { es: 'VER MÁS', en: 'LEARN MORE' },
    ctaHref: '#servicios',
  },
  {
    id: 'cumplimiento',
    title: { es: 'CUMPLIMIENTO NORMATIVO', en: 'REGULATORY COMPLIANCE' },
    subtitle: {
      es: 'Ley 1581 de 2012 y normativas vigentes',
      en: 'Law 1581 of 2012 and current regulations',
    },
    ctaText: { es: 'VER MÁS', en: 'LEARN MORE' },
    ctaHref: '#servicios',
  },
];

// ── Services ──

export const services: ServiceData[] = [
  {
    id: 'ley-1581',
    ctaWhatsApp: {
      es: 'https://wa.me/573143992911?text=Hola%2C%20me%20interesa%20la%20asesor%C3%ADa%20en%20Ley%201581%20de%202012%20para%20mi%20empresa.',
      en: 'https://wa.me/573143992911?text=Hello%2C%20I%20am%20interested%20in%20advisory%20services%20for%20Law%201581%20of%202012%20for%20my%20company.',
    },
    bannerTitle: {
      es: 'Asesorias e Implementación, Ley de Manejo de Datos Personales\npara el Comercio Electrónico LEY 1581 DE 2012.',
      en: 'Advisory & Implementation, Personal Data Management Law\nfor E-Commerce LAW 1581 OF 2012.',
    },
    sectionTitle: { es: 'LEY 1581 DE 2012', en: 'LAW 1581 OF 2012' },
    description: {
      es: 'Te asesoramos en la creación, desarrollo e implementación de los Protocolos Técnicos, los cuales generan los programas de Protección de Datos Personales, que como Responsable de los Datos, la empresa esta obligada a implementar. Según lo exige la Ley 1581 de 2012 en Colombia. Actúa desde la prevención, evítale un riesgo legal y económico a la empresa. En Transformación Digital Empresarial, somos facilitadores en la adopción de las nuevas regulaciones Legales para Empresas Digitales y comercio electrónico en Colombia. Como responsable de los datos impulsa las buenas prácticas en la organización y construya solidez Implementando las nuevas exigencias del mercado.',
      en: 'We advise you on the creation, development and implementation of Technical Protocols, which generate Personal Data Protection programs that, as Data Controller, the company is obligated to implement. As required by Law 1581 of 2012 in Colombia. Act from prevention, avoid legal and economic risk to the company. At Digital Business Transformation, we facilitate the adoption of new Legal regulations for Digital Companies and e-commerce in Colombia.',
    },
    benefits: [
      { es: 'Aumenta los niveles de seguridad digital.', en: 'Increases digital security levels.' },
      { es: 'Reduce los costos operacionales.', en: 'Reduces operational costs.' },
      { es: 'Reduce el Riesgo Legal por sanción de la SIC.', en: 'Reduces Legal Risk from SIC sanctions.' },
      { es: 'Adapta la empresa a las nuevas exigencias del mercado.', en: 'Adapts the company to new market demands.' },
    ],
    ctaWhatsApp: { es: '', en: '' },
  },
  {
    id: 'propiedad-horizontal',
    ctaWhatsApp: {
      es: 'https://wa.me/573143992911?text=Hola%2C%20me%20interesa%20la%20asesor%C3%ADa%20en%20protecci%C3%B3n%20de%20datos%20para%20Propiedad%20Horizontal.',
      en: 'https://wa.me/573143992911?text=Hello%2C%20I%20am%20interested%20in%20data%20protection%20advisory%20for%20Condominiums.',
    },
    bannerTitle: {
      es: 'Asesorias e Implementación, Ley de Manejo de Datos Personales\npara Propiedad Horizontal P.H',
      en: 'Advisory & Implementation, Personal Data Management Law\nfor Condominiums (P.H.)',
    },
    sectionTitle: { es: 'PROPIEDAD HORIZONTAL P.H', en: 'CONDOMINIUMS (P.H.)' },
    description: {
      es: 'Todo edificio o conjunto residencial, comercial o mixto que este sometido al régimen de propiedad horizontal P.H. y que, como persona jurídica recolecten o usen Datos Personales de los visitantes, empleados, residentes etc, están obligados implementar los protocolos dispuestos por la ley 1581 de 2012 al estar realizando Tratamiento de Datos Personales. Te asesoramos en la creación, desarrollo e implementación de los Protocolos Técnicos, los cuales generan los programas de Protección de Datos Personales, que como Responsable de los Datos, la propiedad horizontal esta obligada a implementar. Señor administrador como Responsable de los Datos, impulse los buenos usos de las bases de datos recolectadas, no exponga a la copropiedad al riesgo legal y económico de sanciones de hasta 2000 mil s.m.v. por parte de la SIC.',
      en: 'Every residential, commercial or mixed building under the horizontal property regime (P.H.) that collects or uses Personal Data from visitors, employees, residents, etc., is required to implement the protocols established by Law 1581 of 2012. We advise you on the creation, development and implementation of Technical Protocols to generate Personal Data Protection programs that the horizontal property is obligated to implement as Data Controller.',
    },
    benefits: [
      { es: 'Aumenta los niveles de seguridad digital.', en: 'Increases digital security levels.' },
      { es: 'Reduce el Riesgo Legal por sanción de la SIC.', en: 'Reduces Legal Risk from SIC sanctions.' },
      { es: 'Reduce el Riesgo de un mal uso de las bases de datos.', en: 'Reduces Risk of database misuse.' },
    ],
    ctaWhatsApp: { es: '', en: '' },
  },
  {
    id: 'consultorios-medicos',
    ctaWhatsApp: {
      es: 'https://wa.me/573143992911?text=Hola%2C%20me%20interesa%20la%20asesor%C3%ADa%20en%20protecci%C3%B3n%20de%20datos%20para%20consultorios%20m%C3%A9dicos.',
      en: 'https://wa.me/573143992911?text=Hello%2C%20I%20am%20interested%20in%20data%20protection%20advisory%20for%20medical%20offices.',
    },
    bannerTitle: {
      es: 'Asesoría e Implementación de la Ley de Proteccion de Datos Personales\npara Consultorios Médicos',
      en: 'Advisory & Implementation of Personal Data Protection Law\nfor Medical Offices',
    },
    sectionTitle: { es: 'CONSULTORIOS MÉDICOS', en: 'MEDICAL OFFICES' },
    description: {
      es: 'Los datos personales recolectados en los consultorios médicos, son información determinada como altamente sensible y confidencial por la ley 1581 de 2012. El tratamiento adecuado de estos datos garantiza que la información personal de los pacientes esté protegida contra accesos no autorizados y uso indebido que puede generar lesiones a los titulares. Te asesoramos en la creación, desarrollo e implementación de los Protocolos Técnicos, los cuales generan los programas de Protección de Datos Personales, que como Responsable de los Datos, el profesional de la salud o empresa, esta obligada a implementar, según lo exige la ley 1581 de 2012 en Colombia. Como responsable de los datos, actúa desde la prevención, evita el riesgo legal y económico al que se expone el profesional de la salud y/o empresa. En Transformación Digital Empresarial, somos facilitadores en la adopción de las nuevas regulaciones Legales para Consultorios medicos.',
      en: 'Personal data collected in medical offices is classified as highly sensitive and confidential under Law 1581 of 2012. Proper handling of this data ensures patients\' personal information is protected against unauthorized access and misuse. We advise on the creation, development and implementation of Technical Protocols for Personal Data Protection programs that health professionals or companies are obligated to implement.',
    },
    benefits: [
      { es: 'Mejora de la Calidad de la Atención Médica.', en: 'Improves Quality of Medical Care.' },
      { es: 'Aumenta los niveles de seguridad digital.', en: 'Increases digital security levels.' },
      { es: 'Cumples con lo exigido por la norma.', en: 'Comply with regulatory requirements.' },
    ],
    ctaWhatsApp: { es: '', en: '' },
  },
  {
    id: 'empresas-digitales',
    ctaWhatsApp: {
      es: 'https://wa.me/573143992911?text=Hola%2C%20me%20interesa%20la%20asesor%C3%ADa%20jur%C3%ADdica%20para%20empresas%20digitales%20y%20comercio%20electr%C3%B3nico.',
      en: 'https://wa.me/573143992911?text=Hello%2C%20I%20am%20interested%20in%20legal%20advisory%20for%20digital%20companies%20and%20e-commerce.',
    },
    bannerTitle: {
      es: 'Asesorías Jurídicas para Empresas Digitales & Comercio Electrónico',
      en: 'Legal Advisory for Digital Companies & E-Commerce',
    },
    sectionTitle: { es: 'EMPRESAS DIGITALES Y COMERCIO ELECTRÓNICO', en: 'DIGITAL COMPANIES & E-COMMERCE' },
    description: {
      es: 'La asesoría Jurídica estratégica es esencial para el éxito y la sostenibilidad a largo plazo de las empresas, brindando una base legal sólida para enfrentar los desafíos y aprovechar las oportunidades en el entorno digital empresarial actual. Las regulaciones en el ámbito digital están en constante evolución; es por esto que las asesorías jurídicas digitales ayudan a las empresas a comprender y cumplir con las leyes aplicables, como la protección de datos, privacidad en línea, ciberseguridad, entre otros. En Transformación Digital Empresarial, somos facilitadores en la adopción de las nuevas regulaciones Legales para Empresas Digitales en Colombia.',
      en: 'Strategic legal advisory is essential for long-term business success and sustainability, providing a solid legal foundation to face challenges and seize opportunities in today\'s digital business environment. Digital regulations are constantly evolving, which is why digital legal advisory helps companies understand and comply with applicable laws such as data protection, online privacy, cybersecurity, and more.',
    },
    benefits: [
      { es: 'Aprovechar las oportunidades en el entorno.', en: 'Leverage opportunities in the environment.' },
      { es: 'Adapta la empresa a las nuevas exigencias del mercado.', en: 'Adapts the company to new market demands.' },
      { es: 'Reduce los costos operacionales.', en: 'Reduces operational costs.' },
    ],
    ctaWhatsApp: { es: '', en: '' },
  },
  {
    id: 'auditoria-interna',
    ctaWhatsApp: {
      es: 'https://wa.me/573143992911?text=Hola%2C%20me%20interesa%20el%20servicio%20de%20auditor%C3%ADa%20interna%20en%20seguridad%20de%20la%20informaci%C3%B3n.',
      en: 'https://wa.me/573143992911?text=Hello%2C%20I%20am%20interested%20in%20internal%20information%20security%20audit%20services.',
    },
    bannerTitle: {
      es: 'Auditoria Interna en Seguridad de la Información de las empresas',
      en: 'Internal Information Security Audit for Companies',
    },
    sectionTitle: { es: 'INFORMACIÓN DE LAS EMPRESAS', en: 'COMPANY INFORMATION' },
    description: {
      es: 'La auditoría interna de seguridad de la información en las empresas es un proceso fundamental para evaluar y garantizar la efectividad de los controles de seguridad implementados, además de brindarnos una evaluación integral del estado de seguridad de la empresa, identifica áreas de mejora, contribuye a fortalecer la protección de los datos de la información y demostrar el compromiso (responsabilidad demostrada) que exige la Ley frente a mantener la seguridad y privacidad de los datos personales que utiliza. Proceso esencial para mantener la integridad, confidencialidad y disponibilidad de los datos en un entorno empresarial cada vez más digital.\n\nNuestro equipo de trabajo, es facilitador en la adopción de las nuevas regulaciones ISSO 27001 para Empresas Digitales.\n\nLa seguridad no es un evento único, sino un proceso continuo.',
      en: 'Internal information security audit is a fundamental process to evaluate and ensure the effectiveness of implemented security controls, providing a comprehensive assessment of the company\'s security status, identifying areas for improvement, and strengthening data protection while demonstrating accountability as required by law.\n\nOur team facilitates the adoption of ISO 27001 regulations for Digital Companies.\n\nSecurity is not a one-time event, but a continuous process.',
    },
    benefits: [
      { es: 'Contribuye a fortalecer la protección de los datos de la información.', en: 'Contributes to strengthening data protection.' },
      { es: 'Adapta la empresa a las nuevas exigencias del mercado.', en: 'Adapts the company to new market demands.' },
      { es: 'Reduce los costos operacionales.', en: 'Reduces operational costs.' },
    ],
    ctaWhatsApp: { es: '', en: '' },
  },
  {
    id: 'evaluacion-amenazas',
    ctaWhatsApp: {
      es: 'https://wa.me/573143992911?text=Hola%2C%20me%20interesa%20la%20evaluaci%C3%B3n%20de%20amenazas%20y%20vulnerabilidades%20para%20mi%20empresa.',
      en: 'https://wa.me/573143992911?text=Hello%2C%20I%20am%20interested%20in%20threat%20and%20vulnerability%20assessment%20for%20my%20company.',
    },
    bannerTitle: {
      es: 'Evaluación de Amenzas & Vulnerabilidades en la Seguridad de la Información en Empresas.',
      en: 'Threat & Vulnerability Assessment in Enterprise Information Security.',
    },
    sectionTitle: { es: 'SEGURIDAD DE LA INFORMACIÓN', en: 'INFORMATION SECURITY' },
    description: {
      es: 'La evaluación es un proceso necesario para las Pequeñas y Medianas Empresas (Pymes) que buscan crecer en el entorno digital, proteger sus activos y operaciones en línea, aumentar su competitividad en el mercado, entre otros. La protección de nuestros activos digitales es la clave. Actúa desde la prevención, evítale un riesgo legal y económico a la empresa. En Transformación Digital Empresarial, somos facilitadores en la realización de la evaluación de seguridad de amenazas y vulnerabilidades para Empresas Digitales y comercio electrónico en Colombia.',
      en: 'Assessment is a necessary process for SMEs seeking to grow digitally, protect their online assets and operations, and increase market competitiveness. Protecting our digital assets is key. Act from prevention, avoid legal and economic risk. At TDE, we facilitate security threat and vulnerability assessments for Digital Companies and e-commerce in Colombia.',
    },
    benefits: [
      { es: 'Identificación de Activos Críticos.', en: 'Critical Asset Identification.' },
      { es: 'Implementación de Controles de Seguridad.', en: 'Security Controls Implementation.' },
      { es: 'Reduce el Riesgo Legal.', en: 'Reduces Legal Risk.' },
    ],
    ctaWhatsApp: { es: '', en: '' },
  },
  {
    id: 'contratos-especializados',
    ctaWhatsApp: {
      es: 'https://wa.me/573143992911?text=Hola%2C%20me%20interesa%20el%20servicio%20de%20contratos%20especializados%20para%20transferencia%20de%20datos.',
      en: 'https://wa.me/573143992911?text=Hello%2C%20I%20am%20interested%20in%20specialized%20contracts%20for%20data%20transfer%20and%20transmission.',
    },
    bannerTitle: {
      es: 'Contratos especializados transferencia y transmisión de datos personales',
      en: 'Specialized contracts for personal data transfer and transmission',
    },
    sectionTitle: { es: 'CONTRATOS ESPECIALIZADOS', en: 'SPECIALIZED CONTRACTS' },
    description: {
      es: 'Construye relaciones de confianza con tus clientes y socios comerciales al demostrar tu compromiso y responsabilidad, con la seguridad y privacidad de los datos. Nuestro equipo de expertos legales te guiará a lo largo del proceso, asegurando que cada contrato refleje tus necesidades y se ajuste a las mejores prácticas legales.\n\nCon nuestro servicio de Contratos Especializados para Transmisión y Transferencia de Datos Personales le permitirá llegar a acuerdos claros y eficientes, reduciendo riesgos legales y mejorando la eficacia operativa.',
      en: 'Build trust with your clients and business partners by demonstrating your commitment and responsibility regarding data security and privacy. Our legal expert team will guide you through the process, ensuring each contract reflects your needs and adheres to best legal practices.\n\nOur Specialized Contracts service for Data Transmission and Transfer will help you reach clear and efficient agreements, reducing legal risks and improving operational efficiency.',
    },
    benefits: [
      { es: 'Proteccion Integral.', en: 'Comprehensive Protection.' },
      { es: 'Disminuye Riesgo Legal.', en: 'Reduces Legal Risk.' },
      { es: 'Responsabilidad demostrada.', en: 'Demonstrated accountability.' },
    ],
    ctaWhatsApp: { es: '', en: '' },
  },
];

// ── Training Accordion ──

export const trainingAccordion: TrainingAccordionItem[] = [
  { id: 'duracion', title: { es: 'Duración', en: 'Duration' } },
  { id: 'profesores', title: { es: 'Profesores', en: 'Instructors' } },
  { id: 'modalidad', title: { es: 'Modalidad', en: 'Modality' } },
  { id: 'habilidades', title: { es: 'Habilidades', en: 'Skills' } },
  { id: 'certificado', title: { es: 'Certificado', en: 'Certificate' } },
];

export const trainingBenefits: TrainingBenefit[] = [
  {
    title: { es: 'Prevención de Amenazas:', en: 'Threat Prevention:' },
    description: {
      es: 'Tus empleados aprenderán las mejores prácticas para prevenir, cerrar brechas de seguridad y mitigar amenazas cibernéticas, desde el phishing hasta la protección contra malware y ataques avanzados.',
      en: 'Your employees will learn best practices to prevent and close security breaches and mitigate cyber threats, from phishing to protection against malware and advanced attacks.',
    },
  },
  {
    title: { es: 'Cultura de Seguridad:', en: 'Security Culture:' },
    description: {
      es: 'Fomenta una cultura de seguridad en tu equipo, donde cada empleado comprenda su papel en la protección de la empresa contra posibles brechas y amenazas.',
      en: 'Foster a security culture in your team, where every employee understands their role in protecting the company against potential breaches and threats.',
    },
  },
  {
    title: { es: 'Enfoque Personalizado:', en: 'Personalized Approach:' },
    description: {
      es: 'Adaptamos nuestros cursos a las necesidades específicas de tu empresa, asegurándonos de abordar tus desafíos y fortalezas particulares.',
      en: 'We adapt our courses to your company\'s specific needs, ensuring we address your particular challenges and strengths.',
    },
  },
  {
    title: { es: 'Responsabilidad Demostrada:', en: 'Demonstrated Accountability:' },
    description: {
      es: 'Tomar medidas que conlleven a la mejora Continua, para asi evidenciar y demostrar de manera concreta el compromiso de la empresa con mantener los estándares, normas, regulaciones o requisitos exigidos por la ley, para mantenerla seguridad de la información, implementar controles técnicos y operativos de manera efectiva en seguridad digital, y garantizar una mejora continua en las prácticas de seguridad de la empresa.',
      en: 'Take measures that lead to continuous improvement, to demonstrate the company\'s commitment to maintaining standards, regulations and requirements demanded by law, implementing effective technical and operational controls in digital security.',
    },
  },
];

// ── Team ──

export const teamMembers: TeamMember[] = [
  {
    id: 'hector',
    name: 'HECTOR DAVID SANCHEZ',
    role: { es: 'INGENIERO', en: 'ENGINEER' },
    bio: {
      es: 'Ingeniero de sistemas, Msc. en Ingeniería de sistemas y computación de la Universidad de los Andes. Con 7 años de experiencia en empresas multinacionales en Trayectoria en frameworks basadas en JavaScript.\n\nCon una sólida experiencia en el diseño, implementación y mantenimiento de sistemas informáticos robustos y seguros. Especializado en seguridad digital, cuento con certificación ISSO 27001.',
      en: 'Systems Engineer, MSc. in Systems Engineering and Computing from Universidad de los Andes. With 7 years of experience in multinational companies working with JavaScript-based frameworks.\n\nWith solid experience in designing, implementing and maintaining robust and secure IT systems. Specialized in digital security, with ISO 27001 certification.',
    },
  },
  {
    id: 'paola',
    name: 'PAOLA ESQUIVEL',
    role: { es: 'ABOGADA', en: 'LAWYER' },
    bio: {
      es: 'Abogada, con Maestría en Innovación en Derecho Digital y Legal Tech, además de otros estudios en Manejo de datos, Marketing y gestión empresarial. Me desempeño como Asesora Legal en Políticas de manejo de datos personales & seguridad digital. Mi trayectoria laboral, se ha centrado en asesorar a empresas de diversos sectores, proporcionando soluciones jurídicas efectivas en el complejo entorno de privacidad de los datos y seguridad digital.',
      en: 'Lawyer with a Master\'s in Innovation in Digital Law and Legal Tech, plus studies in Data Management, Marketing and Business Management. Legal Advisor on Personal Data Management Policies & Digital Security. Career focused on advising companies across sectors, providing effective legal solutions in the complex data privacy and digital security landscape.',
    },
  },
  {
    id: 'melisa',
    name: 'MELISA ALFARO',
    role: { es: 'ABOGADA', en: 'LAWYER' },
    bio: {
      es: 'Abogada, con Maestría en Innovación en Derecho Digital y Legal Tech altamente capacitada con una profunda comprensión de la ley y una pasión por la innovación tecnológica en el ámbito legal. Especializada en Legal Tech, he combinado habilidades legales sólidas con el conocimiento práctico de las últimas herramientas tecnológicas para proporcionar soluciones legales eficientes y orientadas a resultados.',
      en: 'Lawyer with a Master\'s in Innovation in Digital Law and Legal Tech, highly qualified with a deep understanding of the law and a passion for technological innovation in the legal field. Specialized in Legal Tech, combining solid legal skills with practical knowledge of the latest technological tools to provide efficient, results-oriented legal solutions.',
    },
  },
];

// ── Blog Posts ──

export const blogPosts: BlogPost[] = [
  {
    id: 'onboarding',
    title: {
      es: 'El Onboarding y la Automatización en las Empresas',
      en: 'Onboarding and Automation in Companies',
    },
    date: 'enero 18, 2025',
    href: '#',
  },
  {
    id: 'malas-practicas',
    title: {
      es: 'MALAS PRÁCTICAS COMERCIALES QUE CASTIGA EL COMERCIO EN LÍNEA',
      en: 'BAD COMMERCIAL PRACTICES PUNISHED IN ONLINE COMMERCE',
    },
    date: 'octubre 9, 2024',
    href: '#',
  },
  {
    id: 'confidencialidad',
    title: {
      es: 'LA CLÁUSULA DE CONFIDENCIALIDAD EN EL COMERCIO ELECTRÓNICO',
      en: 'THE CONFIDENTIALITY CLAUSE IN E-COMMERCE',
    },
    date: 'diciembre 12, 2024',
    href: '#',
  },
];

// ── Partners ──

export const partners = [
  { id: 'sci', name: 'SCI - Sponsorship Consultancy Intelligence' },
  { id: 'eskalab', name: 'Eskalab - Analytics for Restaurants' },
  { id: 'storyland', name: 'Storyland Music Festival' },
];
