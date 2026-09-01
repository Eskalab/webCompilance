import { CheckResult } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Hallazgos ejecutivos del Reporte de Confianza Digital.
// Copy compartido entre el informe imprimible (render-pdf-html.ts) y la
// página /results. Lenguaje de negocio, sin evidencia técnica; referencias
// normativas de alto nivel (Ley 1581 / ISO 27001, sin artículos ni controles).
// ─────────────────────────────────────────────────────────────────────────────

const NORM_LEGAL = { es: 'Ley 1581 de 2012', en: 'Colombian Law 1581 of 2012' };
const NORM_SEC = {
  es: 'Buenas prácticas de seguridad de la información (ISO/IEC 27001)',
  en: 'Information security best practices (ISO/IEC 27001)',
};

export interface FindingCopy {
  title: { es: string; en: string };
  detectedOk: { es: string; en: string };
  detectedBad: { es: string; en: string };
  why: { es: string; en: string };
  norm: { es: string; en: string };
  recOk: { es: string; en: string };
  recBad: { es: string; en: string };
}

// Copy ejecutivo por check: sin tecnicismos ni evidencia, apto para gerencia.
export const FINDINGS: Record<string, FindingCopy> = {
  privacy_policy: {
    title: { es: 'Política de Privacidad', en: 'Privacy Policy' },
    detectedOk: {
      es: 'Se identificó una política de tratamiento de datos personales publicada y accesible en el sitio web.',
      en: 'A published, accessible personal data processing policy was identified on the website.',
    },
    detectedBad: {
      es: 'Se identificó que la política de privacidad no está publicada de forma clara, o algunos apartados podrían no reflejar completamente la forma en que actualmente se recopilan y utilizan los datos personales.',
      en: 'The privacy policy is not clearly published, or some sections may not fully reflect how personal data is currently collected and used.',
    },
    why: {
      es: 'La política de privacidad es uno de los principales mecanismos mediante los cuales una empresa informa a los titulares sobre el tratamiento de sus datos personales.',
      en: 'The privacy policy is one of the main mechanisms through which a company informs data subjects about the processing of their personal data.',
    },
    norm: NORM_LEGAL,
    recOk: {
      es: 'Revisar periódicamente la política para asegurar que corresponda con la operación real del negocio.',
      en: 'Review the policy periodically to make sure it matches the real operation of the business.',
    },
    recBad: {
      es: 'Publicar y mantener actualizada una política que refleje realmente la forma en que tu empresa recopila y utiliza la información.',
      en: 'Publish and keep updated a policy that truly reflects how your company collects and uses information.',
    },
  },
  data_rights: {
    title: { es: 'Derechos de los Titulares', en: 'Data Subject Rights' },
    detectedOk: {
      es: 'El sitio informa a los usuarios sobre los derechos que tienen respecto a sus datos personales y cómo ejercerlos.',
      en: 'The site informs users about their rights regarding their personal data and how to exercise them.',
    },
    detectedBad: {
      es: 'La información sobre los derechos de los usuarios respecto a sus datos personales podría presentarse de forma más clara y accesible.',
      en: 'Information about users’ rights regarding their personal data could be presented more clearly and accessibly.',
    },
    why: {
      es: 'Los usuarios deben poder conocer y ejercer fácilmente sus derechos sobre la información personal que entregan a la empresa.',
      en: 'Users must be able to easily know and exercise their rights over the personal information they hand to the company.',
    },
    norm: NORM_LEGAL,
    recOk: {
      es: 'Mantener visible y actualizada la información sobre cómo los usuarios pueden ejercer sus derechos.',
      en: 'Keep information on how users can exercise their rights visible and up to date.',
    },
    recBad: {
      es: 'Revisar que la información sobre derechos de los usuarios sea visible, comprensible y fácilmente accesible.',
      en: 'Make sure information about user rights is visible, understandable and easily accessible.',
    },
  },
  cookie_banner: {
    title: { es: 'Uso de Cookies', en: 'Cookie Usage' },
    detectedOk: {
      es: 'El sitio informa a los visitantes sobre el uso de cookies antes de su utilización.',
      en: 'The site informs visitors about cookie usage before they are used.',
    },
    detectedBad: {
      es: 'Se identificó el uso de tecnologías de seguimiento que podrían requerir mayor información para los usuarios antes de su utilización.',
      en: 'Tracking technologies were identified that may require clearer user information before being used.',
    },
    why: {
      es: 'Informar de manera clara el uso de cookies fortalece la transparencia y la confianza durante la navegación.',
      en: 'Clearly informing about cookie usage strengthens transparency and trust during navigation.',
    },
    norm: NORM_LEGAL,
    recOk: {
      es: 'Mantener el aviso de cookies actualizado cuando se incorporen nuevas herramientas al sitio.',
      en: 'Keep the cookie notice up to date as new tools are added to the site.',
    },
    recBad: {
      es: 'Verificar que el sitio informe adecuadamente el uso de cookies y permita al usuario conocer su finalidad.',
      en: 'Verify that the site properly informs about cookie usage and lets users know its purpose.',
    },
  },
  cookie_policy: {
    title: { es: 'Política de Cookies', en: 'Cookie Policy' },
    detectedOk: {
      es: 'Se identificó una política de cookies publicada que explica el uso de estas tecnologías.',
      en: 'A published cookie policy explaining the use of these technologies was identified.',
    },
    detectedBad: {
      es: 'No se identificó una política de cookies claramente publicada que explique el uso de estas tecnologías en el sitio.',
      en: 'No clearly published cookie policy explaining the use of these technologies was identified.',
    },
    why: {
      es: 'Documentar el uso de cookies ayuda a los usuarios a entender qué información se recopila durante su visita.',
      en: 'Documenting cookie usage helps users understand what information is collected during their visit.',
    },
    norm: NORM_LEGAL,
    recOk: {
      es: 'Revisar la política de cookies cuando cambien las herramientas del sitio.',
      en: 'Review the cookie policy whenever the site’s tools change.',
    },
    recBad: {
      es: 'Publicar una política de cookies accesible que describa las tecnologías utilizadas y su finalidad.',
      en: 'Publish an accessible cookie policy describing the technologies used and their purpose.',
    },
  },
  forms_consent: {
    title: { es: 'Formularios de Recolección de Datos', en: 'Data Collection Forms' },
    detectedOk: {
      es: 'Los formularios del sitio solicitan la autorización del usuario antes de recopilar su información personal.',
      en: 'The site’s forms request user authorization before collecting personal information.',
    },
    detectedBad: {
      es: 'El sitio recopila información personal mediante formularios visibles y algunos podrían requerir mecanismos más claros de autorización.',
      en: 'The site collects personal information through visible forms, and some may require clearer authorization mechanisms.',
    },
    why: {
      es: 'Los usuarios deben conocer de forma clara para qué serán utilizados los datos que suministran.',
      en: 'Users must clearly know what the data they provide will be used for.',
    },
    norm: NORM_LEGAL,
    recOk: {
      es: 'Mantener en cada formulario la información sobre la finalidad del tratamiento de los datos.',
      en: 'Keep information about the purpose of data processing on every form.',
    },
    recBad: {
      es: 'Confirmar que cada formulario informe la finalidad del tratamiento de los datos personales y solicite la autorización correspondiente.',
      en: 'Confirm that every form states the purpose of personal data processing and requests the corresponding authorization.',
    },
  },
  third_party: {
    title: { es: 'Transparencia sobre Servicios de Terceros', en: 'Third-Party Services Transparency' },
    detectedOk: {
      es: 'Los servicios externos utilizados por el sitio se encuentran informados a los usuarios.',
      en: 'The external services used by the site are disclosed to users.',
    },
    detectedBad: {
      es: 'El sitio utiliza servicios externos que podrían requerir mayor información hacia los usuarios sobre el uso que hacen de sus datos.',
      en: 'The site uses external services that may require clearer user information about how their data is used.',
    },
    why: {
      es: 'La transparencia sobre las herramientas que participan en el tratamiento de la información fortalece la confianza del usuario.',
      en: 'Transparency about the tools involved in information processing strengthens user trust.',
    },
    norm: NORM_LEGAL,
    recOk: {
      es: 'Actualizar la información publicada cuando se incorporen nuevos servicios externos.',
      en: 'Update the published information whenever new external services are added.',
    },
    recBad: {
      es: 'Revisar que los servicios externos utilizados estén informados en la política de privacidad del sitio.',
      en: 'Make sure the external services used are disclosed in the site’s privacy policy.',
    },
  },
  ssl: {
    title: { es: 'Seguridad de la Conexión', en: 'Connection Security' },
    detectedOk: {
      es: 'El sitio utiliza una conexión segura mediante HTTPS y la comunicación con los usuarios se encuentra cifrada.',
      en: 'The site uses a secure HTTPS connection and communication with users is encrypted.',
    },
    detectedBad: {
      es: 'El sitio no utiliza una conexión segura, por lo que la información intercambiada con los usuarios podría estar expuesta.',
      en: 'The site does not use a secure connection, so information exchanged with users could be exposed.',
    },
    why: {
      es: 'El cifrado de la comunicación ayuda a proteger la información intercambiada entre los usuarios y el sitio web, y mejora la confianza de quienes lo visitan.',
      en: 'Encrypting communication helps protect the information exchanged between users and the website, and improves visitor trust.',
    },
    norm: NORM_SEC,
    recOk: {
      es: 'Mantener vigente el certificado de seguridad y realizar verificaciones periódicas.',
      en: 'Keep the security certificate valid and perform periodic verifications.',
    },
    recBad: {
      es: 'Implementar un certificado de seguridad para que toda la comunicación del sitio viaje cifrada.',
      en: 'Implement a security certificate so all site communication travels encrypted.',
    },
  },
  mixed_content: {
    title: { es: 'Integridad de la Conexión Segura', en: 'Secure Connection Integrity' },
    detectedOk: {
      es: 'Todos los recursos del sitio se cargan a través de conexiones seguras.',
      en: 'All site resources load over secure connections.',
    },
    detectedBad: {
      es: 'Algunos elementos del sitio se cargan a través de conexiones no seguras, lo que puede debilitar la protección general de la página.',
      en: 'Some site elements load over insecure connections, which can weaken the page’s overall protection.',
    },
    why: {
      es: 'Cuando parte del contenido viaja sin cifrar, la protección que ofrece la conexión segura se ve reducida y los navegadores pueden mostrar advertencias a los visitantes.',
      en: 'When part of the content travels unencrypted, the protection offered by the secure connection is reduced and browsers may show warnings to visitors.',
    },
    norm: NORM_SEC,
    recOk: {
      es: 'Verificar periódicamente que los nuevos contenidos mantengan conexiones seguras.',
      en: 'Periodically verify that new content keeps using secure connections.',
    },
    recBad: {
      es: 'Revisar los contenidos del sitio para que todos se carguen mediante conexiones seguras.',
      en: 'Review site content so everything loads through secure connections.',
    },
  },
  form_security: {
    title: { es: 'Seguridad de los Formularios', en: 'Form Security' },
    detectedOk: {
      es: 'Los formularios del sitio envían la información de los usuarios a través de canales seguros.',
      en: 'The site’s forms send user information through secure channels.',
    },
    detectedBad: {
      es: 'Se identificaron formularios que podrían enviar información de los usuarios a través de canales no seguros.',
      en: 'Forms were identified that may send user information through insecure channels.',
    },
    why: {
      es: 'Los datos que los usuarios entregan en los formularios deben viajar protegidos para evitar que terceros puedan acceder a ellos.',
      en: 'Data users submit through forms must travel protected to prevent third parties from accessing it.',
    },
    norm: NORM_SEC,
    recOk: {
      es: 'Mantener los canales de envío seguros al incorporar nuevos formularios.',
      en: 'Keep submission channels secure when adding new forms.',
    },
    recBad: {
      es: 'Asegurar que todos los formularios envíen la información mediante canales cifrados.',
      en: 'Ensure all forms send information through encrypted channels.',
    },
  },
  security_headers: {
    title: { es: 'Protecciones del Navegador', en: 'Browser Protections' },
    detectedOk: {
      es: 'El sitio cuenta con configuraciones de seguridad que ayudan a proteger a los visitantes durante la navegación.',
      en: 'The site has security configurations that help protect visitors while browsing.',
    },
    detectedBad: {
      es: 'El sitio podría reforzar algunas configuraciones de seguridad que ayudan a proteger a los visitantes durante la navegación.',
      en: 'The site could strengthen some security configurations that help protect visitors while browsing.',
    },
    why: {
      es: 'Estas configuraciones reducen el riesgo de que el sitio sea utilizado de forma indebida y protegen la experiencia de los usuarios.',
      en: 'These configurations reduce the risk of the site being misused and protect the user experience.',
    },
    norm: NORM_SEC,
    recOk: {
      es: 'Mantener estas configuraciones activas y revisarlas ante cambios en la plataforma.',
      en: 'Keep these configurations active and review them when the platform changes.',
    },
    recBad: {
      es: 'Solicitar al equipo técnico o proveedor del sitio el fortalecimiento de las configuraciones de seguridad recomendadas.',
      en: 'Ask the technical team or site provider to strengthen the recommended security configurations.',
    },
  },
  legal_pages: {
    title: { es: 'Páginas Legales', en: 'Legal Pages' },
    detectedOk: {
      es: 'El sitio publica las páginas legales que informan a los usuarios sobre el tratamiento de su información.',
      en: 'The site publishes the legal pages that inform users about the processing of their information.',
    },
    detectedBad: {
      es: 'Algunos documentos legales que informan a los usuarios sobre el tratamiento de su información podrían no estar publicados o visibles.',
      en: 'Some legal documents informing users about the processing of their information may not be published or visible.',
    },
    why: {
      es: 'La documentación legal visible fortalece la transparencia y facilita el ejercicio de los derechos de los usuarios.',
      en: 'Visible legal documentation strengthens transparency and makes it easier for users to exercise their rights.',
    },
    norm: NORM_LEGAL,
    recOk: {
      es: 'Mantener las páginas legales actualizadas y accesibles desde cualquier página del sitio.',
      en: 'Keep legal pages up to date and accessible from any page on the site.',
    },
    recBad: {
      es: 'Publicar los documentos legales del sitio y verificar que sean fácilmente accesibles.',
      en: 'Publish the site’s legal documents and verify they are easily accessible.',
    },
  },
};

export const FINDING_STATUS = {
  pass: { es: 'Correcto', en: 'Correct', color: '#0e9f6e', tint: '#e6f7f0' },
  warn: { es: 'Requiere revisión', en: 'Needs review', color: '#c27803', tint: '#fdf3df' },
  fail: { es: 'Atención', en: 'Attention', color: '#e02424', tint: '#fdeaea' },
  skip: { es: 'No aplica', en: 'Not applicable', color: '#6b7280', tint: '#f1f2f4' },
};

/** Top 5 hallazgos: peor estado primero (fail > warn > pass), luego mayor peso. */
export function selectFindings(checks: CheckResult[]): CheckResult[] {
  const sev = { fail: 2, warn: 1, pass: 0, skip: -1 };
  return checks
    .filter((c) => c.status !== 'skip' && FINDINGS[c.checkId])
    .sort((a, b) => sev[b.status] - sev[a.status] || b.weight - a.weight)
    .slice(0, 5);
}
