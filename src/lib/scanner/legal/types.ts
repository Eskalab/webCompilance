// Tipos del motor de scoring legal (Ley 1581 de 2012 / Decreto 1377 de 2013).
// Este análisis se persiste en scans.legal_analysis y NO se expone en ScanResponse.

export interface RubricItemResult {
  id: string;
  law: string;
  labelEs: string;
  score: 0 | 0.5 | 1;
  weight: number;
  evidence: string[];
  missingSignals: string[];
}

export interface PoliticaAnalysis {
  documentFound: boolean;
  documentUrl: string | null;
  score: number;
  items: RubricItemResult[];
}

export interface AvisoAnalysis {
  applicable: boolean;
  score: number;
  flags: string[];
  items: RubricItemResult[];
}

export interface LegalAnalysis {
  version: number;
  engine: string;
  analyzedAt: string;
  politicaTratamiento: PoliticaAnalysis;
  avisoPrivacidad: AvisoAnalysis;
}
