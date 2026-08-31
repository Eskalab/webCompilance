import { CheckResult } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Índice de Confianza Digital™ (ICD)
//
// Fuente única de verdad para los niveles de riesgo del scanner. Reemplaza las
// tres escalas que existían (results 99/85, PDF 80/50, email 80/50).
// Los textos de interpretación/recomendación son el copy ejecutivo aprobado:
// citan la Ley 1581 de 2012 sin artículos (el detalle es valor premium).
// ─────────────────────────────────────────────────────────────────────────────

export type ICDLevelId = 'confiable' | 'estable' | 'en_desarrollo' | 'expuesto' | 'critico';

export interface ICDLevel {
  id: ICDLevelId;
  min: number;
  max: number;
  emoji: string;
  color: string;      // hex principal del nivel
  bg: string;         // fondo suave para tarjetas
  border: string;     // borde suave para tarjetas
  nameEs: string;
  nameEn: string;
  shortEs: string;    // interpretación corta (tabla de escala)
  shortEn: string;
  interpretationEs: string;
  interpretationEn: string;
  recommendationEs: string;
  recommendationEn: string;
}

export const ICD_LEVELS: ICDLevel[] = [
  {
    id: 'confiable',
    min: 90, max: 100,
    emoji: '🟢',
    color: '#30c48d', bg: '#ecfdf5', border: '#a7f3d0',
    nameEs: 'CONFIABLE', nameEn: 'TRUSTED',
    shortEs: 'La empresa demuestra un alto nivel de madurez en privacidad y seguridad digital. Se identifican únicamente oportunidades menores de mejora.',
    shortEn: 'The company shows a high level of maturity in privacy and digital security. Only minor improvement opportunities were identified.',
    interpretationEs: 'Tu sitio web demuestra un alto nivel de madurez en materia de privacidad, transparencia y protección de la información. Los controles visibles evaluados presentan un adecuado nivel de cumplimiento y reflejan buenas prácticas alineadas con la Ley 1581 de 2012.',
    interpretationEn: 'Your website shows a high level of maturity in privacy, transparency and information protection. The visible controls evaluated show an adequate level of compliance and reflect good practices aligned with Colombian Law 1581 of 2012.',
    recommendationEs: 'Continúa realizando revisiones periódicas para mantener este nivel de cumplimiento y adapta tus políticas y procedimientos cuando cambien los servicios, tecnologías o procesos de tratamiento de datos personales. La mejora continua es clave para conservar la confianza de tus usuarios.',
    recommendationEn: 'Keep performing periodic reviews to maintain this level of compliance, and update your policies and procedures whenever your services, technologies or personal data processing change. Continuous improvement is key to preserving user trust.',
  },
  {
    id: 'estable',
    min: 75, max: 89,
    emoji: '🟢🟡',
    color: '#8fd14f', bg: '#f4fce8', border: '#d4f0a8',
    nameEs: 'ESTABLE', nameEn: 'STABLE',
    shortEs: 'El sitio cumple con la mayoría de los aspectos evaluados, aunque existen elementos que conviene fortalecer para reducir riesgos futuros.',
    shortEn: 'The site meets most of the evaluated aspects, although some elements should be strengthened to reduce future risks.',
    interpretationEs: 'Tu sitio web cumple satisfactoriamente con la mayoría de los aspectos evaluados. Sin embargo, se identifican oportunidades de mejora que, aunque no representan un riesgo inmediato, pueden fortalecer la protección de la información y reducir futuras contingencias legales.',
    interpretationEn: 'Your website satisfactorily meets most of the evaluated aspects. However, there are improvement opportunities which, while not an immediate risk, can strengthen information protection and reduce future legal contingencies.',
    recommendationEs: 'Prioriza la actualización de los elementos identificados en este informe para fortalecer la transparencia, mejorar la experiencia de los usuarios y consolidar una estrategia preventiva de cumplimiento conforme a la Ley 1581 de 2012.',
    recommendationEn: 'Prioritize updating the elements identified in this report to strengthen transparency, improve user experience and consolidate a preventive compliance strategy in line with Law 1581 of 2012.',
  },
  {
    id: 'en_desarrollo',
    min: 60, max: 74,
    emoji: '🟡',
    color: '#f5b942', bg: '#fffbeb', border: '#fde68a',
    nameEs: 'EN DESARROLLO', nameEn: 'DEVELOPING',
    shortEs: 'Se identifican oportunidades importantes de mejora en materia de protección de datos y cumplimiento.',
    shortEn: 'Important improvement opportunities were identified regarding data protection and compliance.',
    interpretationEs: 'El análisis evidencia que tu sitio cuenta con algunos controles básicos de privacidad y seguridad; sin embargo, existen aspectos relevantes que requieren atención para fortalecer la gestión de datos personales y disminuir la exposición a riesgos operativos y legales.',
    interpretationEn: 'The analysis shows your site has some basic privacy and security controls; however, there are relevant aspects that require attention to strengthen personal data management and reduce exposure to operational and legal risks.',
    recommendationEs: 'Se recomienda revisar y actualizar las prácticas identificadas como oportunidades de mejora, asegurando que la información publicada refleje la operación real de la empresa y que el tratamiento de datos personales se comunique de forma clara y transparente, conforme a la Ley 1581 de 2012.',
    recommendationEn: 'We recommend reviewing and updating the practices identified as improvement opportunities, making sure the published information reflects the real operation of the company and that personal data processing is communicated clearly and transparently, in line with Law 1581 of 2012.',
  },
  {
    id: 'expuesto',
    min: 40, max: 59,
    emoji: '🟠',
    color: '#f97316', bg: '#fff7ed', border: '#fed7aa',
    nameEs: 'EXPUESTO', nameEn: 'EXPOSED',
    shortEs: 'Existen riesgos relevantes que podrían afectar la confianza de los usuarios y el cumplimiento de obligaciones legales.',
    shortEn: 'There are relevant risks that could affect user trust and compliance with legal obligations.',
    interpretationEs: 'Se identifican varias debilidades que podrían afectar la confianza de los usuarios y el adecuado tratamiento de la información personal. Estas situaciones incrementan el nivel de exposición de la organización y hacen recomendable una revisión más detallada de sus procesos digitales.',
    interpretationEn: 'Several weaknesses were identified that could affect user trust and the proper handling of personal information. These situations increase the organization’s exposure and make a more detailed review of its digital processes advisable.',
    recommendationEs: 'Es aconsejable realizar una revisión integral de las políticas, formularios, mecanismos de recolección de datos y demás elementos relacionados con la privacidad y la seguridad de la información. Implementar estas mejoras permitirá reducir riesgos y fortalecer el cumplimiento de la Ley 1581 de 2012.',
    recommendationEn: 'A comprehensive review of policies, forms, data collection mechanisms and other elements related to privacy and information security is advisable. Implementing these improvements will reduce risks and strengthen compliance with Law 1581 of 2012.',
  },
  {
    id: 'critico',
    min: 0, max: 39,
    emoji: '🔴',
    color: '#ef4444', bg: '#fef2f2', border: '#fecaca',
    nameEs: 'CRÍTICO', nameEn: 'CRITICAL',
    shortEs: 'Se detectan múltiples aspectos que requieren atención prioritaria para fortalecer la seguridad y el cumplimiento del sitio web.',
    shortEn: 'Multiple aspects requiring priority attention were detected to strengthen the site’s security and compliance.',
    interpretationEs: 'El análisis identifica múltiples aspectos que requieren atención prioritaria. El sitio presenta un bajo nivel de madurez en materia de privacidad y protección de datos, lo que puede afectar la confianza de los usuarios y evidenciar oportunidades importantes de fortalecimiento.',
    interpretationEn: 'The analysis identifies multiple aspects requiring priority attention. The site shows a low level of maturity in privacy and data protection, which can affect user trust and reveals important strengthening opportunities.',
    recommendationEs: 'Se recomienda realizar una evaluación integral de la operación digital de la empresa, revisando no solo los elementos visibles del sitio web, sino también los procesos internos relacionados con el tratamiento de datos personales. Un diagnóstico especializado permitirá establecer un plan de acción priorizado para fortalecer el cumplimiento de la Ley 1581 de 2012, mejorar la gestión de riesgos y aumentar la confianza de clientes y aliados.',
    recommendationEn: 'We recommend a comprehensive assessment of the company’s digital operation, reviewing not only the visible elements of the website but also the internal processes related to personal data processing. A specialized diagnosis will establish a prioritized action plan to strengthen compliance with Law 1581 of 2012, improve risk management and increase the trust of clients and partners.',
  },
];

export function getICDLevel(score: number): ICDLevel {
  return ICD_LEVELS.find((l) => score >= l.min) ?? ICD_LEVELS[ICD_LEVELS.length - 1];
}

/** "Próxima meta: alcanzar el nivel X (N puntos)". null si ya está en Confiable. */
export function getNextGoal(score: number, lang: 'es' | 'en' = 'es'): { name: string; threshold: number } | null {
  const idx = ICD_LEVELS.findIndex((l) => score >= l.min);
  const current = idx === -1 ? ICD_LEVELS.length - 1 : idx;
  if (current <= 0) return null;
  const next = ICD_LEVELS[current - 1];
  return { name: lang === 'es' ? next.nameEs : next.nameEn, threshold: next.min };
}

// ─────────────────────────────────────────────────────────────────────────────
// Áreas del informe ejecutivo (4 indicadores)
// ─────────────────────────────────────────────────────────────────────────────

export interface ICDArea {
  id: 'privacidad' | 'seguridad' | 'cookies' | 'transparencia';
  nameEs: string;
  nameEn: string;
  checkIds: string[];
}

// legal_pages se mantiene por scans cacheados anteriores al split en data_rights/cookie_policy
export const ICD_AREAS: ICDArea[] = [
  { id: 'privacidad', nameEs: 'Privacidad', nameEn: 'Privacy', checkIds: ['privacy_policy', 'data_rights', 'legal_pages'] },
  { id: 'seguridad', nameEs: 'Seguridad del sitio', nameEn: 'Site security', checkIds: ['ssl', 'mixed_content', 'form_security', 'security_headers'] },
  { id: 'cookies', nameEs: 'Cookies', nameEn: 'Cookies', checkIds: ['cookie_banner', 'cookie_policy'] },
  { id: 'transparencia', nameEs: 'Transparencia', nameEn: 'Transparency', checkIds: ['third_party', 'forms_consent'] },
];

/**
 * Sub-score 0-100 de un grupo de checks, consistente con calculateScore():
 * pass = peso completo, warn = medio peso, skip no cuenta.
 */
export function calcAreaScore(checks: Pick<CheckResult, 'checkId' | 'status' | 'weight'>[], ids: Set<string> | string[]): number {
  const idSet = ids instanceof Set ? ids : new Set(ids);
  let totalWeight = 0;
  let earned = 0;
  for (const c of checks) {
    if (!idSet.has(c.checkId) || c.status === 'skip') continue;
    totalWeight += c.weight;
    if (c.status === 'pass') earned += c.weight;
    else if (c.status === 'warn') earned += c.weight * 0.5;
  }
  return totalWeight ? Math.round((earned / totalWeight) * 100) : 0;
}

/** Peor estado de un grupo de checks (fail > warn > pass); skip se ignora. */
export function worstStatus(checks: Pick<CheckResult, 'checkId' | 'status'>[], ids: string[]): 'pass' | 'warn' | 'fail' | 'skip' {
  const group = checks.filter((c) => ids.includes(c.checkId) && c.status !== 'skip');
  if (!group.length) return 'skip';
  if (group.some((c) => c.status === 'fail')) return 'fail';
  if (group.some((c) => c.status === 'warn')) return 'warn';
  return 'pass';
}
