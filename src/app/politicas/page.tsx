'use client';

import Topbar from '@/components/topbar';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { useLanguage } from '@/contexts/language';

const policies = [
  {
    id: 'privacidad',
    title: { es: 'Política de Privacidad y Tratamiento de Datos Personales', en: 'Privacy and Personal Data Policy' },
    subtitle: { es: 'Transformación Digital Empresarial – TDE', en: 'Transformación Digital Empresarial – TDE' },
    sections: [
      {
        title: { es: '1. Objeto', en: '1. Purpose' },
        body: {
          es: 'La presente Política de Privacidad y Tratamiento de Datos Personales tiene por objeto establecer los lineamientos jurídicos, técnicos y organizacionales mediante los cuales la empresa Transformación Digital Empresarial – TDE realiza el tratamiento de datos personales, garantizando la protección de los derechos fundamentales de habeas data, intimidad, buen nombre, autodeterminación informativa y confidencialidad de la información de los titulares.\n\nLa presente política se adopta en cumplimiento de lo dispuesto en la Ley 1581 de 2012, el Decreto 1377 de 2013, el Decreto 886 de 2014, las directrices emitidas por la Superintendencia de Industria y Comercio y demás normas concordantes aplicables al tratamiento de datos personales en Colombia.',
          en: 'This Privacy and Personal Data Policy establishes the legal, technical and organizational guidelines under which Transformación Digital Empresarial – TDE processes personal data, guaranteeing the protection of fundamental rights including habeas data, privacy, good name, informational self-determination and confidentiality.\n\nThis policy is adopted in compliance with Law 1581 of 2012, Decree 1377 of 2013, Decree 886 of 2014, guidelines issued by the Superintendence of Industry and Commerce, and other applicable Colombian data protection regulations.',
        },
      },
      {
        title: { es: '2. Identificación del Responsable del Tratamiento', en: '2. Data Controller' },
        items: {
          es: ['Razón Social: Transformación Digital Empresarial – TDE', 'Correo electrónico: info@tde.com.co', 'Sitio web: tde.com.co', 'Teléfono: +57 314 399 2911'],
          en: ['Company Name: Transformación Digital Empresarial – TDE', 'Email: info@tde.com.co', 'Website: tde.com.co', 'Phone: +57 314 399 2911'],
        },
      },
      {
        title: { es: '3. Definiciones', en: '3. Definitions' },
        body: {
          es: 'Para efectos de interpretación de la presente política se aplicarán las definiciones contenidas en la Ley 1581 de 2012, incluyendo: Dato personal, Dato sensible, Encargado del tratamiento, Responsable del tratamiento, Titular, Tratamiento, Transferencia, Transmisión y Base de datos.',
          en: 'For the purposes of interpreting this policy, the definitions contained in Law 1581 of 2012 shall apply, including: Personal data, Sensitive data, Data processor, Data controller, Data subject, Processing, Transfer, Transmission and Database.',
        },
      },
      {
        title: { es: '4. Principios Rectores', en: '4. Governing Principles' },
        body: { es: 'El tratamiento de datos realizado por TDE se regirá por los siguientes principios:', en: 'Data processing by TDE shall be governed by the following principles:' },
        items: {
          es: ['Legalidad', 'Finalidad', 'Libertad', 'Veracidad o calidad', 'Transparencia', 'Acceso y circulación restringida', 'Seguridad', 'Confidencialidad', 'Responsabilidad demostrada (accountability)'],
          en: ['Lawfulness', 'Purpose limitation', 'Freedom', 'Accuracy', 'Transparency', 'Restricted access and circulation', 'Security', 'Confidentiality', 'Accountability'],
        },
      },
      {
        title: { es: '5. Datos Personales Recolectados', en: '5. Personal Data Collected' },
        body: { es: 'TDE podrá recolectar, almacenar y tratar:', en: 'TDE may collect, store and process:' },
        items: {
          es: ['Datos de identificación', 'Datos de contacto', 'Datos financieros y comerciales', 'Datos laborales', 'Datos empresariales', 'Datos de navegación digital', 'Direcciones IP', 'Cookies y trazabilidad digital', 'Información contractual', 'Información biométrica cuando sea estrictamente necesaria', 'Datos sensibles autorizados expresamente por el titular'],
          en: ['Identification data', 'Contact data', 'Financial and commercial data', 'Employment data', 'Business data', 'Digital browsing data', 'IP addresses', 'Cookies and digital tracking', 'Contractual information', 'Biometric data when strictly necessary', 'Sensitive data expressly authorized by the data subject'],
        },
      },
      {
        title: { es: '6. Finalidades del Tratamiento', en: '6. Purposes of Processing' },
        body: { es: 'Los datos personales podrán ser utilizados para:', en: 'Personal data may be used for:' },
        items: {
          es: ['Prestación de servicios legales, tecnológicos y de consultoría', 'Ejecución de contratos', 'Validación de identidad', 'Gestión administrativa y contable', 'Facturación y cartera', 'Atención de PQRS', 'Gestión de seguridad de la información', 'Prevención del fraude y delitos informáticos', 'Marketing digital y campañas publicitarias', 'Remarketing y segmentación comercial', 'Gestión de eventos y capacitaciones', 'Envío de boletines y contenido informativo', 'Analítica web y mejora de experiencia de usuario', 'Cumplimiento de obligaciones legales y regulatorias', 'Gestión de relaciones comerciales y corporativas', 'Estudios estadísticos y analíticos internos'],
          en: ['Provision of legal, technological and consulting services', 'Contract execution', 'Identity verification', 'Administrative and accounting management', 'Billing and accounts receivable', 'PQRS handling', 'Information security management', 'Fraud and cybercrime prevention', 'Digital marketing and advertising campaigns', 'Remarketing and commercial segmentation', 'Event and training management', 'Newsletter and informational content delivery', 'Web analytics and user experience improvement', 'Compliance with legal and regulatory obligations', 'Commercial and corporate relationship management', 'Internal statistical and analytical studies'],
        },
      },
      {
        title: { es: '7. Derechos de los Titulares', en: '7. Rights of Data Subjects' },
        body: { es: 'Los titulares podrán:', en: 'Data subjects may:' },
        items: {
          es: ['Conocer, actualizar y rectificar sus datos', 'Solicitar prueba de autorización', 'Ser informados sobre el uso de sus datos', 'Revocar autorización', 'Solicitar supresión de información', 'Presentar consultas y reclamos', 'Acceder gratuitamente a sus datos'],
          en: ['Know, update and rectify their data', 'Request proof of authorization', 'Be informed about the use of their data', 'Revoke authorization', 'Request deletion of information', 'Submit queries and complaints', 'Access their data free of charge'],
        },
      },
      {
        title: { es: '8. Autorización del Titular', en: '8. Data Subject Authorization' },
        body: {
          es: 'TDE solicitará autorización previa, expresa e informada para el tratamiento de datos personales, salvo las excepciones legales previstas en la normativa colombiana.\n\nLa autorización podrá obtenerse mediante: formularios físicos o digitales, sitios web, correos electrónicos, grabaciones, aceptación de términos digitales, firmas electrónicas o acciones inequívocas del titular.',
          en: 'TDE will request prior, express and informed authorization for personal data processing, except for legal exceptions provided in Colombian regulations.\n\nAuthorization may be obtained through: physical or digital forms, websites, emails, recordings, acceptance of digital terms, electronic signatures or unequivocal actions of the data subject.',
        },
      },
      {
        title: { es: '9. Datos Sensibles', en: '9. Sensitive Data' },
        body: {
          es: 'El tratamiento de datos sensibles será facultativo y estará sujeto a autorización explícita del titular, indicando claramente la finalidad específica del tratamiento. TDE garantizará mayores estándares de protección respecto de este tipo de información.',
          en: 'Processing of sensitive data will be optional and subject to explicit authorization from the data subject, clearly indicating the specific purpose. TDE will guarantee higher protection standards for this type of information.',
        },
      },
      {
        title: { es: '10. Datos de Niños, Niñas y Adolescentes', en: '10. Children and Adolescents Data' },
        body: {
          es: 'El tratamiento de datos de menores de edad se realizará únicamente cuando responda al interés superior del menor, respete sus derechos fundamentales, y cuente con autorización del representante legal.',
          en: 'Processing of data of minors will only be carried out when it responds to the best interests of the child, respects their fundamental rights, and has the authorization of their legal representative.',
        },
      },
      {
        title: { es: '11. Seguridad de la Información', en: '11. Information Security' },
        body: {
          es: 'TDE implementará medidas técnicas, administrativas, jurídicas y organizativas orientadas a proteger la confidencialidad, integridad, disponibilidad y resiliencia de la información personal.\n\nSe adoptarán controles de acceso, cifrado, autenticación, monitoreo, gestión de incidentes, respaldo, continuidad de negocio, auditoría, protección perimetral y gestión de riesgos. La organización promoverá estándares alineados con ISO/IEC 27001 y buenas prácticas de ciberseguridad.',
          en: 'TDE will implement technical, administrative, legal and organizational measures to protect the confidentiality, integrity, availability and resilience of personal information.\n\nAccess controls, encryption, authentication, monitoring, incident management, backup, business continuity, audit, perimeter protection and risk management controls will be adopted. The organization will promote standards aligned with ISO/IEC 27001 and cybersecurity best practices.',
        },
      },
      {
        title: { es: '12. Transferencia y Transmisión Internacional', en: '12. International Transfer and Transmission' },
        body: {
          es: 'TDE podrá transferir o transmitir datos personales a terceros ubicados dentro o fuera de Colombia, garantizando niveles adecuados de protección y cumplimiento legal.',
          en: 'TDE may transfer or transmit personal data to third parties located inside or outside Colombia, ensuring adequate levels of protection and legal compliance.',
        },
      },
      {
        title: { es: '13. Procedimiento para Consultas y Reclamos', en: '13. Queries and Complaints Procedure' },
        body: {
          es: 'Las solicitudes relacionadas con datos personales podrán presentarse mediante: correo electrónico oficial (info@tde.com.co), canal web, atención presencial o línea telefónica (+57 314 399 2911). Los términos de respuesta serán los establecidos por la Ley 1581 de 2012.',
          en: 'Requests related to personal data may be submitted through: official email (info@tde.com.co), web channel, in-person service or phone line (+57 314 399 2911). Response times will be those established by Law 1581 of 2012.',
        },
      },
      {
        title: { es: '14. Vigencia', en: '14. Validity' },
        body: {
          es: 'La presente política entra en vigencia a partir de su publicación y permanecerá vigente mientras TDE realice tratamiento de datos personales.',
          en: 'This policy enters into force upon publication and will remain in force as long as TDE processes personal data.',
        },
      },
    ],
  },
  {
    id: 'pqrs',
    title: { es: 'Política de PQRS', en: 'PQRS Policy' },
    subtitle: { es: 'Peticiones, Quejas, Reclamos, Sugerencias y Denuncias', en: 'Requests, Complaints, Claims, Suggestions and Reports' },
    sections: [
      {
        title: { es: '1. Objeto', en: '1. Purpose' },
        body: {
          es: 'La presente Política de Peticiones, Quejas, Reclamos, Sugerencias y Denuncias (PQRS) tiene por finalidad regular el procedimiento de recepción, gestión, seguimiento y respuesta de las solicitudes presentadas por usuarios, clientes, proveedores, aliados y terceros ante Transformación Digital Empresarial – TDE.',
          en: 'This PQRS Policy regulates the procedure for receiving, managing, tracking and responding to requests submitted by users, clients, suppliers, partners and third parties to Transformación Digital Empresarial – TDE.',
        },
      },
      {
        title: { es: '2. Alcance', en: '2. Scope' },
        body: { es: 'La política aplica para:', en: 'The policy applies to:' },
        items: {
          es: ['Peticiones', 'Quejas', 'Reclamos', 'Sugerencias', 'Felicitaciones', 'Denuncias', 'Solicitudes relacionadas con protección de datos'],
          en: ['Requests', 'Complaints', 'Claims', 'Suggestions', 'Commendations', 'Reports', 'Requests related to data protection'],
        },
      },
      {
        title: { es: '3. Canales de Atención', en: '3. Service Channels' },
        body: { es: 'TDE dispondrá de los siguientes canales:', en: 'TDE will provide the following channels:' },
        items: {
          es: ['Correo electrónico: info@tde.com.co', 'Formulario web', 'Línea telefónica: +57 314 399 2911', 'Atención presencial', 'Chat corporativo'],
          en: ['Email: info@tde.com.co', 'Web form', 'Phone: +57 314 399 2911', 'In-person service', 'Corporate chat'],
        },
      },
      {
        title: { es: '4. Definiciones', en: '4. Definitions' },
        body: {
          es: 'Petición: Solicitud respetuosa de información o actuación.\nQueja: Manifestación de inconformidad respecto a atención o conducta.\nReclamo: Solicitud para corregir incumplimientos o situaciones particulares.\nSugerencia: Propuesta orientada a mejorar procesos o servicios.\nDenuncia: Reporte de posibles actos indebidos, fraude o incumplimiento.',
          en: 'Request: Respectful request for information or action.\nComplaint: Expression of dissatisfaction regarding service or conduct.\nClaim: Request to correct non-compliance or particular situations.\nSuggestion: Proposal aimed at improving processes or services.\nReport: Report of possible improper acts, fraud or non-compliance.',
        },
      },
      {
        title: { es: '5. Procedimiento', en: '5. Procedure' },
        body: { es: 'Toda PQRS será:', en: 'All PQRS will be:' },
        items: {
          es: ['Recepcionada', 'Radicada', 'Clasificada', 'Analizada', 'Respondida', 'Archivada'],
          en: ['Received', 'Registered', 'Classified', 'Analyzed', 'Responded', 'Archived'],
        },
      },
      {
        title: { es: '6. Términos de Respuesta', en: '6. Response Times' },
        body: {
          es: 'Los términos se ajustarán a la legislación colombiana aplicable, especialmente en materia de: derecho de petición, protección al consumidor y habeas data.',
          en: 'Response times will comply with applicable Colombian legislation, especially regarding: right of petition, consumer protection and habeas data.',
        },
      },
      {
        title: { es: '7. Confidencialidad', en: '7. Confidentiality' },
        body: {
          es: 'TDE garantizará reserva y confidencialidad de la información suministrada en las PQRS.',
          en: 'TDE will guarantee confidentiality of all information provided in PQRS.',
        },
      },
      {
        title: { es: '8. Protección de Datos', en: '8. Data Protection' },
        body: {
          es: 'Los datos personales recolectados durante el trámite de PQRS serán tratados conforme a la Política de Privacidad y Tratamiento de Datos Personales de TDE.',
          en: 'Personal data collected during PQRS processing will be handled in accordance with TDE\'s Privacy and Personal Data Policy.',
        },
      },
      {
        title: { es: '9. Vigencia', en: '9. Validity' },
        body: {
          es: 'La presente política entra en vigencia a partir de su publicación oficial.',
          en: 'This policy enters into force upon official publication.',
        },
      },
    ],
  },
  {
    id: 'cookies',
    title: { es: 'Política de Cookies', en: 'Cookie Policy' },
    subtitle: { es: 'Transformación Digital Empresarial – TDE', en: 'Transformación Digital Empresarial – TDE' },
    sections: [
      {
        title: { es: '1. Objeto', en: '1. Purpose' },
        body: {
          es: 'La presente Política de Cookies tiene por finalidad informar de manera clara, previa, expresa e informada a los usuarios sobre el uso de cookies, tecnologías de rastreo, herramientas de analítica digital, publicidad comportamental y demás mecanismos de almacenamiento y recuperación de datos utilizados durante la navegación en los activos digitales de Transformación Digital Empresarial – TDE.\n\nSe adopta en cumplimiento de la Ley 1581 de 2012, el Decreto 1377 de 2013, las directrices de la Superintendencia de Industria y Comercio y buenas prácticas internacionales en privacidad y ciberseguridad.',
          en: 'This Cookie Policy aims to clearly and transparently inform users about the use of cookies, tracking technologies, digital analytics tools, behavioral advertising and other data storage and retrieval mechanisms used while browsing TDE\'s digital assets.\n\nIt is adopted in compliance with Law 1581 of 2012, Decree 1377 of 2013, SIC guidelines and international best practices in privacy and cybersecurity.',
        },
      },
      {
        title: { es: '2. Definición de Cookies', en: '2. Definition of Cookies' },
        body: {
          es: 'Las cookies son archivos o tecnologías similares que se descargan o almacenan en el dispositivo del usuario al acceder a un sitio web, permitiendo recopilar información sobre hábitos de navegación, preferencias, autenticación, comportamiento digital, geolocalización aproximada, interacciones con contenidos y actividades realizadas dentro del entorno digital.\n\nEstas herramientas pueden ser propias o de terceros y pueden utilizar identificadores únicos que permitan reconocer al usuario o su dispositivo en futuras visitas.',
          en: 'Cookies are files or similar technologies downloaded or stored on the user\'s device when accessing a website, allowing collection of information about browsing habits, preferences, authentication, digital behavior, approximate geolocation and interactions within the digital environment.\n\nThese tools may be first-party or third-party and may use unique identifiers to recognize the user or their device on future visits.',
        },
      },
      {
        title: { es: '3. Finalidades del Uso de Cookies', en: '3. Purposes of Cookie Use' },
        body: { es: 'TDE podrá utilizar cookies y tecnologías similares para:', en: 'TDE may use cookies and similar technologies for:' },
        items: {
          es: ['Garantizar el correcto funcionamiento técnico del sitio web', 'Facilitar la autenticación y seguridad de las sesiones', 'Recordar preferencias de navegación del usuario', 'Analizar patrones de comportamiento y experiencia de usuario', 'Medir métricas de tráfico, rendimiento y uso de la plataforma', 'Personalizar contenidos y experiencia digital', 'Desarrollar campañas de marketing digital y remarketing', 'Realizar segmentación publicitaria y análisis estadísticos', 'Detectar fraudes, accesos indebidos o incidentes de seguridad', 'Optimizar servicios, contenidos y funcionalidades', 'Gestionar integraciones con redes sociales y plataformas externas'],
          en: ['Ensuring proper technical functioning of the website', 'Facilitating session authentication and security', 'Remembering user navigation preferences', 'Analyzing behavior patterns and user experience', 'Measuring traffic, performance and platform usage metrics', 'Personalizing content and digital experience', 'Developing digital marketing and remarketing campaigns', 'Advertising segmentation and statistical analysis', 'Detecting fraud, unauthorized access or security incidents', 'Optimizing services, content and functionalities', 'Managing integrations with social networks and external platforms'],
        },
      },
      {
        title: { es: '4. Tipos de Cookies Utilizadas', en: '4. Types of Cookies Used' },
        body: {
          es: 'a) Cookies Técnicas o Necesarias: Permiten la navegación y funcionamiento básico del sitio web.\nb) Cookies de Preferencias: Permiten recordar configuraciones y preferencias del usuario.\nc) Cookies Analíticas: Recopilan información estadística sobre navegación y comportamiento.\nd) Cookies Publicitarias y de Remarketing: Permiten mostrar publicidad personalizada.\ne) Cookies de Redes Sociales: Permiten interactuar con plataformas externas como Facebook, Instagram o LinkedIn.',
          en: 'a) Technical or Necessary Cookies: Enable navigation and basic website functionality.\nb) Preference Cookies: Allow remembering user settings and preferences.\nc) Analytical Cookies: Collect statistical information about navigation and behavior.\nd) Advertising and Remarketing Cookies: Allow displaying personalized advertising.\ne) Social Media Cookies: Allow interaction with external platforms such as Facebook, Instagram or LinkedIn.',
        },
      },
      {
        title: { es: '5. Herramientas y Tecnologías de Terceros', en: '5. Third-Party Tools and Technologies' },
        body: { es: 'TDE podrá utilizar herramientas tecnológicas de terceros, incluyendo pero sin limitarse a:', en: 'TDE may use third-party technological tools, including but not limited to:' },
        items: {
          es: ['Meta Pixel', 'Google Analytics', 'Google Tag Manager', 'LinkedIn Insight Tag', 'Herramientas CRM', 'Plataformas de automatización de marketing', 'Sistemas de analítica web', 'Soluciones de ciberseguridad y monitoreo digital'],
          en: ['Meta Pixel', 'Google Analytics', 'Google Tag Manager', 'LinkedIn Insight Tag', 'CRM tools', 'Marketing automation platforms', 'Web analytics systems', 'Cybersecurity and digital monitoring solutions'],
        },
      },
      {
        title: { es: '6. Autorización del Titular', en: '6. User Authorization' },
        body: {
          es: 'Mediante la aceptación expresa del banner de cookies, la continuación de la navegación o la configuración autorizada por el usuario, este manifiesta haber leído, entendido y aceptado el uso de cookies conforme a las finalidades descritas.\n\nEl usuario podrá configurar, bloquear o eliminar las cookies desde su navegador o mediante las herramientas habilitadas en el sitio web, salvo aquellas estrictamente necesarias para el funcionamiento técnico de la plataforma.',
          en: 'By expressly accepting the cookie banner, continuing browsing or through authorized settings, the user acknowledges having read, understood and accepted the use of cookies for the purposes described.\n\nUsers may configure, block or delete cookies through their browser or the tools available on the website, except those strictly necessary for technical platform functionality.',
        },
      },
      {
        title: { es: '7. Transferencia Internacional de Datos', en: '7. International Data Transfer' },
        body: {
          es: 'Algunas cookies y herramientas de terceros utilizadas por TDE pueden implicar transferencia o transmisión internacional de datos personales hacia servidores ubicados fuera de Colombia. En tales casos, TDE adoptará las medidas razonables para verificar que dichos terceros implementen estándares adecuados de protección.',
          en: 'Some cookies and third-party tools used by TDE may involve international transfer of personal data to servers outside Colombia. In such cases, TDE will take reasonable measures to verify that such third parties implement adequate protection standards.',
        },
      },
      {
        title: { es: '8. Seguridad de la Información', en: '8. Information Security' },
        body: {
          es: 'TDE implementará medidas técnicas, administrativas, organizativas y de ciberseguridad orientadas a proteger la información recolectada mediante cookies, evitando accesos no autorizados, pérdida, alteración o uso fraudulento de los datos. La compañía promoverá prácticas alineadas con la ISO/IEC 27001.',
          en: 'TDE will implement technical, administrative, organizational and cybersecurity measures to protect information collected through cookies, preventing unauthorized access, loss, alteration or fraudulent use of data. The company will promote practices aligned with ISO/IEC 27001.',
        },
      },
      {
        title: { es: '9. Derechos del Titular', en: '9. Data Subject Rights' },
        body: {
          es: 'El titular de los datos personales podrá ejercer los derechos de conocer, actualizar, rectificar, solicitar prueba de autorización, revocar el consentimiento, solicitar supresión de datos y presentar consultas o reclamos a través de los canales oficiales de TDE.',
          en: 'Data subjects may exercise the rights to know, update, rectify, request proof of authorization, revoke consent, request data deletion and submit queries or complaints through TDE\'s official channels.',
        },
      },
      {
        title: { es: '10. Modificaciones a la Política', en: '10. Policy Modifications' },
        body: {
          es: 'TDE podrá modificar la presente Política de Cookies en cualquier momento para adaptarla a cambios normativos, tecnológicos, operativos o de negocio. Las modificaciones serán publicadas oportunamente en el sitio web oficial.',
          en: 'TDE may modify this Cookie Policy at any time to adapt to regulatory, technological, operational or business changes. Modifications will be published promptly on the official website.',
        },
      },
      {
        title: { es: '11. Vigencia', en: '11. Validity' },
        body: {
          es: 'La presente Política de Cookies entra en vigencia a partir de su publicación y permanecerá vigente mientras TDE realice tratamiento de datos mediante cookies o tecnologías equivalentes.',
          en: 'This Cookie Policy enters into force upon publication and will remain in force as long as TDE processes data through cookies or equivalent technologies.',
        },
      },
    ],
  },
];

function PolicySection({ section, locale }: { section: typeof policies[0]['sections'][0]; locale: 'es' | 'en' }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-[#0f8b8d] mb-2">{section.title[locale]}</h3>
      {section.body && (
        <p className="text-gray-600 leading-relaxed whitespace-pre-line mb-2">{section.body[locale]}</p>
      )}
      {(section as { items?: { es: string[]; en: string[] } }).items && (
        <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
          {((section as { items?: { es: string[]; en: string[] } }).items![locale]).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PoliticasContent() {
  const { locale } = useLanguage();

  return (
    <>
      <section className="relative h-[320px] lg:h-[400px] overflow-hidden">
        <img
          src="/politicas-hero.jpg"
          alt="Políticas"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a3a]/90 via-[#1a2a3a]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 text-center text-white">
          <h1 className="text-3xl lg:text-5xl font-bold mb-3">
            {locale === 'es' ? 'Políticas Corporativas' : 'Corporate Policies'}
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            {locale === 'es' ? 'Transformación Digital Empresarial – TDE' : 'Transformación Digital Empresarial – TDE'}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white px-6">
        <div className="max-w-3xl mx-auto space-y-20">
          {policies.map((policy) => (
            <div key={policy.id} id={policy.id}>
              <div className="mb-8 pb-4 border-b-2 border-[#1e2a52]">
                <h2 className="text-2xl font-bold text-[#1e2a52]">{policy.title[locale]}</h2>
                <p className="text-gray-500 mt-1">{policy.subtitle[locale]}</p>
              </div>
              <div className="space-y-8">
                {policy.sections.map((section, i) => (
                  <PolicySection key={i} section={section} locale={locale} />
                ))}
              </div>
            </div>
          ))}

          <div className="pt-8 border-t border-gray-200 text-center text-gray-400 text-sm">
            <p>Transformación Digital Empresarial – TDE</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default function PoliticasPage() {
  return (
    <main className="min-h-screen bg-[#f7f8fa]">
      <Topbar />
      <SiteHeader />
      <PoliticasContent />
      <SiteFooter />
    </main>
  );
}
