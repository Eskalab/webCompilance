// Orquestador del análisis legal (Ley 1581 / Decreto 1377).
// El resultado se persiste en scans.legal_analysis y NO se incluye en ScanResponse.

import { ScanContext } from '../types';
import { LegalAnalysis, PoliticaAnalysis } from './types';
import { documentText } from './html-to-text';
import { evaluatePolitica } from './politica-rubric';
import { evaluateAviso } from './aviso-rubric';

// Un documento con menos texto que esto no es una política real
const MIN_DOCUMENT_LENGTH = 200;

function analyzePolitica(context: ScanContext): PoliticaAnalysis {
  const text = documentText(context.privacyPolicyContent);
  const documentUrl = context.privacyPolicyUrl ?? null;

  if (text.length < MIN_DOCUMENT_LENGTH) {
    return { documentFound: false, documentUrl, score: 0, items: [] };
  }

  const items = evaluatePolitica(text);
  const totalWeight = items.reduce((s, i) => s + i.weight, 0);
  const earned = items.reduce((s, i) => s + i.weight * i.score, 0);
  const score = totalWeight ? Math.round((earned / totalWeight) * 100) : 0;

  return { documentFound: true, documentUrl, score, items };
}

export function analyzeLegal(context: ScanContext): LegalAnalysis {
  return {
    version: 1,
    engine: 'rubric-v1',
    analyzedAt: new Date().toISOString(),
    politicaTratamiento: analyzePolitica(context),
    avisoPrivacidad: evaluateAviso(context.html),
  };
}
