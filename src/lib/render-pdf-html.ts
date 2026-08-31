import { ScanResponse, CheckResult } from './scanner/types';
import { Locale } from './i18n';
import { getICDLevel, getNextGoal, ICD_AREAS, ICD_LEVELS, calcAreaScore, worstStatus } from './scanner/icd';
import { ENGINE_VERSION } from './scanner/scanner';
import { getLogoBase64 } from './logo';

// ─────────────────────────────────────────────────────────────────────────────
// Reporte de Confianza Digital — informe gratuito ejecutivo (4-5 páginas A4)
//
// Diagnóstico ejecutivo, no reporte técnico: tarjeta ICD, escala de 5 niveles,
// 4 áreas, 5 hallazgos en lenguaje de negocio y CTA a LegalCheck 360°.
// Referencias normativas de alto nivel (Ley 1581 de 2012 / ISO 27001) sin
// artículos ni controles numerados: ese detalle es del diagnóstico premium.
// Sin evidencia técnica (headers, scripts, listados de cookies).
// ─────────────────────────────────────────────────────────────────────────────

const NORM_LEGAL = { es: 'Ley 1581 de 2012', en: 'Colombian Law 1581 of 2012' };
const NORM_SEC = {
  es: 'Buenas prácticas de seguridad de la información (ISO/IEC 27001)',
  en: 'Information security best practices (ISO/IEC 27001)',
};

interface FindingCopy {
  title: { es: string; en: string };
  detectedOk: { es: string; en: string };
  detectedBad: { es: string; en: string };
  why: { es: string; en: string };
  norm: { es: string; en: string };
  recOk: { es: string; en: string };
  recBad: { es: string; en: string };
}

// Copy ejecutivo por check: sin tecnicismos ni evidencia, apto para gerencia.
const FINDINGS: Record<string, FindingCopy> = {
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

const STATUS_BADGE = {
  pass: { emoji: '🟢', es: 'CORRECTO', en: 'CORRECT', color: '#30c48d', bg: '#ecfdf5' },
  warn: { emoji: '🟡', es: 'REQUIERE REVISIÓN', en: 'NEEDS REVIEW', color: '#b45309', bg: '#fffbeb' },
  fail: { emoji: '🔴', es: 'ATENCIÓN', en: 'ATTENTION', color: '#b91c1c', bg: '#fef2f2' },
  skip: { emoji: '⚪', es: 'NO APLICA', en: 'N/A', color: '#6b7280', bg: '#f3f4f6' },
};

const AREA_EMOJI = { pass: '🟢', warn: '🟡', fail: '🔴', skip: '⚪' };

function formatDuration(ms: number, lang: Locale): string {
  const totalSec = Math.round(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  if (lang === 'es') return min > 0 ? `${min} minuto${min > 1 ? 's' : ''} ${sec} segundos` : `${sec} segundos`;
  return min > 0 ? `${min} minute${min > 1 ? 's' : ''} ${sec} seconds` : `${sec} seconds`;
}

/** Top 5 hallazgos: peor estado primero (fail > warn > pass), luego mayor peso. */
function selectFindings(checks: CheckResult[]): CheckResult[] {
  const sev = { fail: 2, warn: 1, pass: 0, skip: -1 };
  return checks
    .filter((c) => c.status !== 'skip' && FINDINGS[c.checkId])
    .sort((a, b) => sev[b.status] - sev[a.status] || b.weight - a.weight)
    .slice(0, 5);
}

export function renderPdfHtml(scan: ScanResponse, lang: Locale): string {
  const es = lang === 'es';
  const level = getICDLevel(scan.score);
  const nextGoal = getNextGoal(scan.score, lang);
  const dateLocale = es ? 'es-CO' : 'en-US';
  const dateStr = new Date(scan.scannedAt).toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' });
  const findings = selectFindings(scan.checks);
  const logoSrc = getLogoBase64();

  const areas = ICD_AREAS.map((a) => ({
    ...a,
    status: worstStatus(scan.checks, a.checkIds),
    score: calcAreaScore(scan.checks, a.checkIds),
  }));

  // Prioridad empresarial: qué áreas caen en cada nivel
  const areasHigh = areas.filter((a) => a.status === 'fail');
  const areasMed = areas.filter((a) => a.status === 'warn');
  const areasLow = areas.filter((a) => a.status === 'pass');
  const areaNames = (list: typeof areas) => list.map((a) => (es ? a.nameEs : a.nameEn)).join(', ');

  const scaleRows = ICD_LEVELS.map((l) => {
    const current = l.id === level.id;
    return `
      <tr style="${current ? `background:${l.bg};` : ''}">
        <td style="white-space:nowrap;font-weight:${current ? '700' : '400'}">${l.min} – ${l.max}</td>
        <td style="white-space:nowrap;font-weight:700;color:${l.color}">${l.emoji} ${es ? l.nameEs : l.nameEn}</td>
        <td>${es ? l.shortEs : l.shortEn}</td>
      </tr>`;
  }).join('');

  const areaRows = areas.map((a) => `
      <tr>
        <td style="font-weight:600">${es ? a.nameEs : a.nameEn}</td>
        <td style="white-space:nowrap">${AREA_EMOJI[a.status]} ${STATUS_BADGE[a.status][es ? 'es' : 'en']}</td>
      </tr>`).join('');

  const findingsHtml = findings.map((c, i) => {
    const copy = FINDINGS[c.checkId];
    const badge = STATUS_BADGE[c.status as 'pass' | 'warn' | 'fail'];
    const ok = c.status === 'pass';
    return `
    <div class="finding">
      <div class="finding-head">
        <span class="finding-num">${i + 1}</span>
        <h3>${es ? copy.title.es : copy.title.en}</h3>
        <span class="badge" style="color:${badge.color};background:${badge.bg}">${badge.emoji} ${es ? badge.es : badge.en}</span>
      </div>
      <p class="q">${es ? '¿Qué detectamos?' : 'What did we detect?'}</p>
      <p>${ok ? (es ? copy.detectedOk.es : copy.detectedOk.en) : (es ? copy.detectedBad.es : copy.detectedBad.en)}</p>
      <p class="q">${es ? '¿Por qué es importante?' : 'Why does it matter?'}</p>
      <p>${es ? copy.why.es : copy.why.en}</p>
      <p class="q">${es ? 'Referencia normativa' : 'Regulatory reference'}</p>
      <p>${es ? copy.norm.es : copy.norm.en}</p>
      <div class="rec">
        <p class="q" style="margin-top:0">${es ? 'Recomendación' : 'Recommendation'}</p>
        <p style="margin:0">${ok ? (es ? copy.recOk.es : copy.recOk.en) : (es ? copy.recBad.es : copy.recBad.en)}</p>
      </div>
    </div>`;
  }).join('');

  const notAnalyzed = es
    ? ['cómo se almacenan realmente los datos,', 'quién tiene acceso a ellos,', 'si tus documentos reflejan la operación de tu empresa,', 'si tus procesos cumplen con la normativa,', 'ni cómo respondes ante incidentes de seguridad.']
    : ['how data is actually stored,', 'who has access to it,', 'whether your documents reflect your company’s operation,', 'whether your processes comply with regulations,', 'or how you respond to security incidents.'];

  const businessBullets = es
    ? ['La confianza de los clientes.', 'La percepción de profesionalismo.', 'La protección de la información que recopilas.', 'La preparación de tu empresa frente a futuras revisiones o reclamaciones.']
    : ['Customer trust.', 'The perception of professionalism.', 'The protection of the information you collect.', 'Your company’s readiness for future reviews or claims.'];

  const waMessage = encodeURIComponent(
    es
      ? `Hola, escaneé el sitio ${scan.url} con el Scanner de TDE y mi Índice de Confianza Digital es ${scan.score} (${level.nameEs}). Me gustaría agendar una sesión de revisión personalizada.`
      : `Hi, I scanned ${scan.url} with the TDE Scanner and my Digital Trust Index is ${scan.score} (${level.nameEn}). I would like to schedule a personalized review session.`,
  );
  const waUrl = `https://wa.me/573143992911?text=${waMessage}`;

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${es ? 'Reporte de Confianza Digital' : 'Digital Trust Report'} — ${scan.url}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    @page { size: A4; margin: 18mm 16mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; color: #1f2d3d; font-size: 13px; line-height: 1.6; background: #fff; }
    .page { max-width: 760px; margin: 0 auto; padding: 32px 24px; page-break-after: always; }
    .page:last-child { page-break-after: auto; }
    h1 { font-size: 30px; color: #1e2a52; line-height: 1.2; }
    h2 { font-size: 20px; color: #1e2a52; margin-bottom: 14px; }
    h3 { font-size: 15px; color: #1e2a52; }
    p { margin-bottom: 8px; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 12.5px; }
    th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
    th { background: #f3f6fa; color: #1e2a52; font-weight: 700; }
    .banner { background: linear-gradient(120deg,#1e2a52 0%,#1e2a52 38%,#2d7d9a 50%,#1e2a52 62%,#1e2a52 100%); border-radius: 16px; padding: 36px 32px; text-align: center; color: #fff; margin: 24px 0; }
    .banner h1 { color: #fff; }
    .banner p { color: #cfe3ea; }
    .meta { background: #f7f8fa; border: 1px solid #e5e7eb; border-radius: 12px; padding: 18px 22px; margin-top: 24px; }
    .meta p { margin: 3px 0; }
    .meta strong { color: #1e2a52; }
    .icd-card { border: 2px solid ${level.border}; background: ${level.bg}; border-radius: 20px; padding: 28px 32px; text-align: center; margin: 18px 0 22px; }
    .icd-card .icd-name { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #6b7280; font-weight: 700; }
    .icd-card .icd-score { font-size: 56px; font-weight: 800; color: ${level.color}; line-height: 1.15; }
    .icd-card .icd-level { font-size: 20px; font-weight: 800; color: ${level.color}; margin-bottom: 10px; }
    .icd-card .icd-interp { font-size: 13px; color: #374151; text-align: left; }
    .icd-card .icd-goal { margin-top: 12px; font-size: 12.5px; font-weight: 700; color: #1e2a52; background: #ffffffcc; border-radius: 10px; padding: 8px 14px; display: inline-block; }
    .disclaimer { font-size: 11.5px; color: #6b7280; border-left: 3px solid #cbd5e1; padding: 6px 12px; margin-top: 14px; }
    .finding { border: 1px solid #e5e7eb; border-radius: 14px; padding: 18px 22px; margin-bottom: 16px; page-break-inside: avoid; }
    .finding-head { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
    .finding-num { background: #1e2a52; color: #fff; font-weight: 700; border-radius: 50%; width: 26px; height: 26px; display: inline-flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0; }
    .finding-head h3 { flex: 1; }
    .badge { font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 999px; white-space: nowrap; }
    .q { font-weight: 700; color: #0f8b8d; margin: 10px 0 2px; font-size: 12.5px; }
    .rec { background: #f7f8fa; border: 1px solid #e5e7eb; border-radius: 10px; padding: 10px 14px; margin-top: 10px; }
    .check-list li { list-style: none; margin: 8px 0; font-size: 14px; }
    .cta-box { background: #1e2a52; color: #fff; border-radius: 16px; padding: 26px 30px; margin-top: 20px; text-align: center; }
    .cta-box h2 { color: #fff; }
    .cta-box p { color: #cfe3ea; }
    .cta-btn { display: inline-block; background: #0f8b8d; color: #fff; font-weight: 700; padding: 12px 28px; border-radius: 999px; text-decoration: none; margin-top: 12px; }
    .footer { margin-top: 28px; text-align: center; font-size: 11px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 14px; }
    ul.dash { margin: 8px 0 8px 4px; }
    ul.dash li { list-style: none; padding-left: 16px; position: relative; margin: 4px 0; }
    ul.dash li::before { content: '–'; position: absolute; left: 0; color: #0f8b8d; font-weight: 700; }
  </style>
</head>
<body>

  <!-- ═══ PÁGINA 1 — PORTADA ═══ -->
  <div class="page">
    ${logoSrc ? `<div style="text-align:center;margin-bottom:8px"><img src="${logoSrc}" alt="TDE" style="height:52px" /></div>` : ''}
    <div class="banner">
      <p style="letter-spacing:3px;text-transform:uppercase;font-size:12px;font-weight:700;margin-bottom:10px">${es ? 'Índice de Confianza Digital™' : 'Digital Trust Index™'}</p>
      <h1>${es ? 'Reporte de Confianza Digital' : 'Digital Trust Report'}</h1>
      <p style="font-size:15px;margin-top:10px;font-weight:600">${es ? 'Radiografía de Cumplimiento Digital' : 'Digital Compliance X-Ray'}</p>
      <p style="font-size:13px;margin-top:8px">${es
        ? 'Conoce el estado inicial de tu sitio web en materia de privacidad, seguridad de la información y cumplimiento normativo.'
        : 'Learn the initial state of your website regarding privacy, information security and regulatory compliance.'}</p>
    </div>
    <div class="meta">
      <p><strong>${es ? 'Sitio analizado' : 'Analyzed site'}:</strong> ${scan.url}</p>
      <p><strong>${es ? 'Fecha del análisis' : 'Analysis date'}:</strong> ${dateStr}</p>
      ${scan.summary.durationMs ? `<p><strong>${es ? 'Tiempo de análisis' : 'Analysis time'}:</strong> ${formatDuration(scan.summary.durationMs, lang)}</p>` : ''}
      <p><strong>${es ? 'Versión del escáner' : 'Scanner version'}:</strong> v${ENGINE_VERSION}.0</p>
      <p><strong>${es ? 'Normativa de referencia' : 'Reference framework'}:</strong></p>
      <ul class="dash">
        <li>${es ? 'Ley 1581 de 2012 (Colombia)' : 'Law 1581 of 2012 (Colombia)'}</li>
        <li>${es ? 'Buenas prácticas de privacidad y seguridad de la información (ISO/IEC 27001)' : 'Privacy and information security best practices (ISO/IEC 27001)'}</li>
      </ul>
    </div>
  </div>

  <!-- ═══ PÁGINA 2 — RESULTADO GENERAL ═══ -->
  <div class="page">
    <h2>${es ? 'Resultado General' : 'Overall Result'}</h2>
    <div class="icd-card">
      <p class="icd-name">${es ? 'Índice de Confianza Digital™' : 'Digital Trust Index™'}</p>
      <p class="icd-score">${scan.score} / 100</p>
      <p class="icd-level">${level.emoji} ${es ? level.nameEs : level.nameEn}</p>
      <p class="icd-interp">${es ? level.interpretationEs : level.interpretationEn}</p>
      ${nextGoal ? `<p class="icd-goal">🎯 ${es
        ? `Próxima meta: alcanzar el nivel ${nextGoal.name} (${nextGoal.threshold} puntos) mediante la implementación de las recomendaciones de este informe.`
        : `Next goal: reach the ${nextGoal.name} level (${nextGoal.threshold} points) by implementing the recommendations in this report.`}</p>` : ''}
    </div>

    <h3 style="margin-bottom:6px">${es ? 'Escala del Índice de Confianza Digital™' : 'Digital Trust Index™ Scale'}</h3>
    <table>
      <thead><tr><th>${es ? 'Puntaje' : 'Score'}</th><th>${es ? 'Nivel' : 'Level'}</th><th>${es ? 'Interpretación' : 'Interpretation'}</th></tr></thead>
      <tbody>${scaleRows}</tbody>
    </table>

    <h3 style="margin:16px 0 6px">${es ? 'Estado por área' : 'Status by area'}</h3>
    <table>
      <thead><tr><th>${es ? 'Área' : 'Area'}</th><th>${es ? 'Estado' : 'Status'}</th></tr></thead>
      <tbody>${areaRows}</tbody>
    </table>

    <p class="disclaimer">${es
      ? 'Este resultado corresponde a un análisis automatizado de los elementos visibles del sitio web y constituye una referencia inicial para apoyar la toma de decisiones. No constituye una auditoría legal.'
      : 'This result corresponds to an automated analysis of the visible elements of the website and is an initial reference to support decision-making. It does not constitute a legal audit.'}</p>
  </div>

  <!-- ═══ PÁGINAS 3-4 — HALLAZGOS ═══ -->
  <div class="page">
    <h2>${es ? 'Principales Hallazgos' : 'Main Findings'}</h2>
    ${findingsHtml}
  </div>

  <!-- ═══ PÁGINA 4 — QUÉ SIGNIFICA PARA TU EMPRESA + RECOMENDACIÓN DEL NIVEL ═══ -->
  <div class="page">
    <h2>${es ? '¿Qué significa esto para tu empresa?' : 'What does this mean for your company?'}</h2>
    <p>${es ? 'Los aspectos identificados pueden influir en:' : 'The identified aspects can influence:'}</p>
    <ul class="check-list">
      ${businessBullets.map((b) => `<li>✅ ${b}</li>`).join('')}
    </ul>

    <h3 style="margin:22px 0 6px">${es ? 'Recomendación estratégica para tu nivel' : 'Strategic recommendation for your level'}</h3>
    <div style="background:${level.bg};border:1px solid ${level.border};border-radius:12px;padding:16px 20px">
      <p style="font-weight:800;color:${level.color};margin-bottom:6px">${level.emoji} ${es ? level.nameEs : level.nameEn} (${level.min} – ${level.max})</p>
      <p style="margin:0">${es ? level.recommendationEs : level.recommendationEn}</p>
    </div>

    <h3 style="margin:22px 0 6px">${es ? 'Nivel de Prioridad Empresarial' : 'Business Priority Level'}</h3>
    <table>
      <thead><tr><th>${es ? 'Prioridad' : 'Priority'}</th><th>${es ? 'Significado' : 'Meaning'}</th></tr></thead>
      <tbody>
        <tr>
          <td style="white-space:nowrap;font-weight:700">🔴 ${es ? 'Alta' : 'High'}</td>
          <td>${es
            ? 'Se recomienda revisar este aspecto lo antes posible, ya que puede impactar la protección de la información y la confianza de los usuarios.'
            : 'We recommend reviewing this aspect as soon as possible, as it can impact information protection and user trust.'}${areasHigh.length ? `<br><strong>${es ? 'Áreas' : 'Areas'}:</strong> ${areaNames(areasHigh)}` : ''}</td>
        </tr>
        <tr>
          <td style="white-space:nowrap;font-weight:700">🟠 ${es ? 'Media' : 'Medium'}</td>
          <td>${es
            ? 'Existen oportunidades claras para fortalecer el cumplimiento y reducir riesgos futuros.'
            : 'There are clear opportunities to strengthen compliance and reduce future risks.'}${areasMed.length ? `<br><strong>${es ? 'Áreas' : 'Areas'}:</strong> ${areaNames(areasMed)}` : ''}</td>
        </tr>
        <tr>
          <td style="white-space:nowrap;font-weight:700">🟢 ${es ? 'Baja' : 'Low'}</td>
          <td>${es
            ? 'El aspecto evaluado presenta un nivel adecuado; se recomienda mantener controles y realizar revisiones periódicas.'
            : 'The evaluated aspect shows an adequate level; keep controls in place and perform periodic reviews.'}${areasLow.length ? `<br><strong>${es ? 'Áreas' : 'Areas'}:</strong> ${areaNames(areasLow)}` : ''}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ═══ PÁGINA 5 — QUÉ SIGUE / CTA ═══ -->
  <div class="page">
    <h2>${es ? 'Este análisis es solo el primer paso' : 'This analysis is only the first step'}</h2>
    <p>${es
      ? 'El escáner revisa únicamente elementos visibles de tu sitio web. No analiza, por ejemplo:'
      : 'The scanner only reviews visible elements of your website. It does not analyze, for example:'}</p>
    <ul class="dash">
      ${notAnalyzed.map((n) => `<li>${n}</li>`).join('')}
    </ul>
    <p style="margin-top:14px">${es
      ? 'Para obtener una evaluación integral desarrollamos <strong>LegalCheck 360°</strong>, un diagnóstico que revisa la operación digital, los procesos y la documentación de la empresa para entregar un mapa de riesgos y un plan de acción priorizado.'
      : 'For a comprehensive evaluation we developed <strong>LegalCheck 360°</strong>, a diagnosis that reviews the company’s digital operation, processes and documentation to deliver a risk map and a prioritized action plan.'}</p>

    <div class="cta-box">
      <h2>LegalCheck 360°</h2>
      <p>${es
        ? 'Mapa integral de riesgos, revisión de procesos y documentación, y plan de acción priorizado para tu empresa.'
        : 'Comprehensive risk map, process and documentation review, and a prioritized action plan for your company.'}</p>
      <a class="cta-btn" href="${waUrl}">${es ? 'Solicita una sesión de revisión personalizada' : 'Request a personalized review session'}</a>
      <p style="font-size:11.5px;margin-top:10px">+57 314 399 2911 · info@tde.com.co</p>
    </div>

    <div class="footer">
      <p>© ${new Date().getFullYear()} TDE Transformación Digital Empresarial · Bogotá, Colombia · tde.com.co</p>
      <p>${es
        ? 'Reporte generado automáticamente por el Escáner Legal TDE. Este documento es una referencia inicial y no constituye asesoría legal.'
        : 'Report automatically generated by the TDE Legal Scanner. This document is an initial reference and does not constitute legal advice.'}</p>
    </div>
  </div>

</body>
</html>`;
}
