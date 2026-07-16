// Rúbrica del Aviso de Privacidad + autorización en el punto de captura.
// Evalúa el HTML del homepage contra los arts. 14-15 del Decreto 1377 de 2013
// y el requisito de autorización previa, expresa e informada (art. 9, Ley 1581).

import { AvisoAnalysis, RubricItemResult } from './types';
import { htmlToText } from './html-to-text';

// Ventana de contexto alrededor de cada <form> para buscar el aviso
const CONTEXT_WINDOW = 800;

const CONSENT_KEYWORDS = /autoriz|acepto|consentimiento|tratamiento de (?:mis |los |sus )?datos|datos personales|pol[ií]tica de privacidad|pol[ií]tica de tratamiento/i;

const POLICY_LINK = /<a\b[^>]*href\s*=\s*["'][^"']*(?:privacidad|privacy|tratamiento-de-datos|datos-personales|habeas-data|politica-de-datos)[^"']*["']/i;

const POLICY_LINK_TEXT = /<a\b[^>]*>[^<]*(?:pol[ií]tica de privacidad|pol[ií]tica de tratamiento|tratamiento de datos|habeas data|privacy policy)[^<]*<\/a>/i;

interface FormBlock {
  html: string;
  context: string; // form + ventana alrededor
}

function extractForms(html: string): FormBlock[] {
  const blocks: FormBlock[] = [];
  const regex = /<form\b[\s\S]*?<\/form>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const start = Math.max(0, match.index - CONTEXT_WINDOW);
    const end = Math.min(html.length, match.index + match[0].length + CONTEXT_WINDOW);
    blocks.push({ html: match[0], context: html.slice(start, end) });
  }
  return blocks;
}

function hasConsentCheckbox(formHtml: string): { checkbox: boolean; premarked: boolean } {
  const checkboxes = formHtml.match(/<input\b[^>]*type\s*=\s*["']checkbox["'][^>]*>/gi) ?? [];
  if (checkboxes.length === 0) return { checkbox: false, premarked: false };
  const premarked = checkboxes.some((c) => /\schecked\b/i.test(c));
  return { checkbox: true, premarked };
}

function item(
  id: string,
  law: string,
  labelEs: string,
  weight: number,
  score: 0 | 0.5 | 1,
  evidence: string[],
  missingSignals: string[],
): RubricItemResult {
  return { id, law, labelEs, score, weight, evidence, missingSignals };
}

export function evaluateAviso(html: string): AvisoAnalysis {
  const forms = extractForms(html);

  if (forms.length === 0) {
    return { applicable: false, score: 0, flags: ['noForms'], items: [] };
  }

  const flags: string[] = [];
  const items: RubricItemResult[] = [];

  // 1. Checkbox de autorización (art. 9 Ley 1581 / art. 7 D.1377 — premarcado inválido)
  let checkboxScore: 0 | 0.5 | 1 = 0;
  const checkboxEvidence: string[] = [];
  for (const form of forms) {
    const { checkbox, premarked } = hasConsentCheckbox(form.html);
    if (!checkbox) continue;
    const hasKeywords = CONSENT_KEYWORDS.test(htmlToText(form.context));
    if (premarked && hasKeywords) {
      // Casilla de consentimiento premarcada: la autorización no es expresa
      flags.push('premarkedCheckbox');
      checkboxScore = 0;
      checkboxEvidence.push('checkbox de consentimiento premarcado (checked)');
      break;
    }
    if (hasKeywords) {
      checkboxScore = 1;
      checkboxEvidence.push('checkbox con texto de consentimiento');
      break;
    }
    if (checkboxScore < 0.5) {
      checkboxScore = 0.5;
      checkboxEvidence.push('checkbox sin texto de consentimiento identificable');
    }
  }
  items.push(item(
    'checkbox_autorizacion',
    'Ley 1581/2012, art. 9 + Decreto 1377/2013, arts. 5-7',
    'Mecanismo de autorización expresa (checkbox no premarcado) en formularios',
    30,
    checkboxScore,
    checkboxEvidence,
    checkboxScore === 1 ? [] : ['checkbox de consentimiento válido'],
  ));

  // 2. Texto de consentimiento cerca del formulario
  const consentText = forms.some((f) =>
    /autorizo|acepto el tratamiento|autorizaci[oó]n (?:previa|para el tratamiento)|doy mi consentimiento/i.test(htmlToText(f.context)),
  );
  items.push(item(
    'texto_consentimiento',
    'Ley 1581/2012, art. 9',
    'Texto de autorización/consentimiento en el punto de captura',
    20,
    consentText ? 1 : 0,
    consentText ? ['texto de consentimiento encontrado junto al formulario'] : [],
    consentText ? [] : ['frase de autorización (ej. "autorizo el tratamiento de mis datos")'],
  ));

  // 3. Link a la Política de Tratamiento cerca del formulario
  const policyLink = forms.some((f) => POLICY_LINK.test(f.context) || POLICY_LINK_TEXT.test(f.context));
  items.push(item(
    'link_politica',
    'Decreto 1377/2013, art. 15, num. 4',
    'Mecanismo para conocer la Política de Tratamiento (link cerca del formulario)',
    25,
    policyLink ? 1 : 0,
    policyLink ? ['link a política de privacidad/tratamiento junto al formulario'] : [],
    policyLink ? [] : ['enlace a la política de tratamiento cerca del formulario'],
  ));

  // 4. Finalidad mencionada en el punto de captura
  const finalidad = forms.some((f) =>
    /finalidad|ser[aá]n (?:utilizados|tratados|usados) para|con el fin de|para (?:enviarte|contactarte|responder)/i.test(htmlToText(f.context)),
  );
  items.push(item(
    'finalidad_captura',
    'Decreto 1377/2013, art. 15, num. 2',
    'Finalidad del tratamiento informada en el punto de captura',
    15,
    finalidad ? 1 : 0,
    finalidad ? ['mención de finalidad junto al formulario'] : [],
    finalidad ? [] : ['texto de finalidad (ej. "tus datos serán utilizados para...")'],
  ));

  // 5. Responsable identificado (en el aviso o en el footer)
  const pageText = htmlToText(html);
  const responsableSignals = [
    /\bNIT\b[\s.:]*\d[\d.,\s-]*\d/i.test(pageText),
    /©|&copy;|copyright/i.test(html),
    /\bS\.?A\.?S\.?\b|\bLtda\.?\b|\bS\.?A\.?\b/.test(pageText),
  ].filter(Boolean).length;
  const responsableScore: 0 | 0.5 | 1 = responsableSignals >= 2 ? 1 : responsableSignals >= 1 ? 0.5 : 0;
  items.push(item(
    'responsable_identificado',
    'Decreto 1377/2013, art. 15, num. 1',
    'Identificación del responsable del tratamiento en la página',
    10,
    responsableScore,
    responsableScore > 0 ? [`${responsableSignals} señal(es) de identificación (NIT/copyright/razón social)`] : [],
    responsableScore === 1 ? [] : ['NIT o razón social visibles'],
  ));

  const totalWeight = items.reduce((s, i) => s + i.weight, 0);
  const earned = items.reduce((s, i) => s + i.weight * i.score, 0);
  const score = totalWeight ? Math.round((earned / totalWeight) * 100) : 0;

  return { applicable: true, score, flags, items };
}
