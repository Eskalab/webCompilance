// Rúbrica de la Política de Tratamiento de Datos Personales.
// Califica el texto del documento contra el contenido mínimo taxativo
// del art. 13 del Decreto 1377 de 2013 (compilado en el Decreto 1074 de 2015).

import { RubricItemResult } from './types';

interface Signal {
  name: string;
  regex: RegExp;
}

interface PoliticaItem {
  id: string;
  law: string;
  labelEs: string;
  weight: number;
  signals: Signal[];
  // Número mínimo de señales encontradas para puntuar 0.5 y 1 respectivamente
  thresholds: { half: number; full: number };
}

const ITEMS: PoliticaItem[] = [
  {
    id: 'identificacion_responsable',
    law: 'Decreto 1377/2013, art. 13, num. 1',
    labelEs: 'Identificación del responsable (razón social, NIT, domicilio, email, teléfono)',
    weight: 15,
    thresholds: { half: 1, full: 3 },
    signals: [
      { name: 'nit', regex: /\bNIT\b[\s.:]*\d[\d.,\s-]*\d/i },
      { name: 'email', regex: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i },
      { name: 'telefono', regex: /\b(?:tel[eé]fono|celular|pbx|l[ií]nea de atenci[oó]n)\b|\(?\+?57\)?[\s.-]?\d{7,10}/i },
      { name: 'razon_social', regex: /\braz[oó]n social\b/i },
      { name: 'domicilio', regex: /\b(?:domicilio|direcci[oó]n)\b/i },
    ],
  },
  {
    id: 'finalidades',
    law: 'Decreto 1377/2013, art. 13, num. 2',
    labelEs: 'Tratamiento al que serán sometidos los datos y finalidad específica',
    weight: 20,
    thresholds: { half: 1, full: 2 },
    signals: [
      { name: 'finalidad', regex: /\bfinalidad(?:es)?\b/i },
      { name: 'verbos_tratamiento', regex: /\b(?:recolecci[oó]n|recolectar|almacenamiento|almacenar|circulaci[oó]n|circular|transferencia|transmisi[oó]n|supresi[oó]n)\b/i },
      { name: 'tratamiento_datos', regex: /\btratamiento de (?:los |sus |tus |mis )?datos\b/i },
    ],
  },
  {
    id: 'derechos_titular',
    law: 'Decreto 1377/2013, art. 13, num. 3 (Ley 1581, art. 8)',
    labelEs: 'Derechos que le asisten al titular',
    weight: 20,
    thresholds: { half: 2, full: 4 },
    signals: [
      { name: 'rectificar', regex: /\brectifica(?:r|ci[oó]n)\b/i },
      { name: 'actualizar', regex: /\bactualiza(?:r|ci[oó]n)\b/i },
      { name: 'suprimir', regex: /\bsupr(?:imir|esi[oó]n)\b/i },
      { name: 'revocar', regex: /\brevoca(?:r|toria|ci[oó]n)\b/i },
      { name: 'sic', regex: /\bsuperintendencia de industria y comercio\b/i },
      { name: 'ley_1581', regex: /\bley\s*1581\b/i },
      { name: 'habeas_data', regex: /\bhabeas\s*data\b/i },
    ],
  },
  {
    id: 'area_responsable',
    law: 'Decreto 1377/2013, art. 13, num. 4',
    labelEs: 'Persona o área responsable de la atención de peticiones, consultas y reclamos',
    weight: 15,
    thresholds: { half: 1, full: 2 },
    signals: [
      { name: 'area', regex: /\b[aá]rea\s+(?:responsable|encargada|de\s+(?:protecci[oó]n|datos|atenci[oó]n|servicio))/i },
      { name: 'oficial_datos', regex: /\boficial de (?:protecci[oó]n|tratamiento|datos|privacidad)\b|\bdata protection officer\b|\bDPO\b/i },
      { name: 'responsable_atencion', regex: /\b(?:responsable|encargad[oa]) de (?:la )?atenci[oó]n\b/i },
      { name: 'email_datos', regex: /(?:datospersonales|protecciondatos|protecciondedatos|habeasdata|privacidad|tratamientodedatos)@[a-z0-9.-]+/i },
    ],
  },
  {
    id: 'procedimiento',
    law: 'Decreto 1377/2013, art. 13, num. 5 (Ley 1581, arts. 14-15)',
    labelEs: 'Procedimiento para consultas y reclamos',
    weight: 20,
    thresholds: { half: 1, full: 3 },
    signals: [
      { name: 'procedimiento', regex: /\bprocedimiento\b/i },
      { name: 'consultas', regex: /\bconsultas?\b/i },
      { name: 'reclamos', regex: /\breclamos?\b/i },
      { name: 'plazo_consultas', regex: /\bdiez\s*\(?\s*10\s*\)?\s*d[ií]as\b|\b10\s+d[ií]as\s+h[aá]biles\b/i },
      { name: 'plazo_reclamos', regex: /\bquince\s*\(?\s*15\s*\)?\s*d[ií]as\b|\b15\s+d[ií]as\s+h[aá]biles\b/i },
    ],
  },
  {
    id: 'vigencia',
    law: 'Decreto 1377/2013, art. 13, num. 6',
    labelEs: 'Fecha de entrada en vigencia y período de vigencia de las bases de datos',
    weight: 10,
    thresholds: { half: 1, full: 2 },
    signals: [
      { name: 'vigencia', regex: /\bvigencia\b|\bvigente\b/i },
      { name: 'entrada_vigencia', regex: /\b(?:entrada en vigencia|vigente a partir|rige a partir|entra en vigor)\b/i },
      { name: 'fecha', regex: /\b\d{1,2}\s+de\s+(?:enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+de\s+(?:19|20)\d{2}\b/i },
    ],
  },
];

function evidenceSnippet(text: string, regex: RegExp): string {
  const match = text.match(regex);
  return match ? match[0].slice(0, 80).trim() : '';
}

export function evaluatePolitica(text: string): RubricItemResult[] {
  return ITEMS.map((item) => {
    const evidence: string[] = [];
    const missingSignals: string[] = [];

    for (const signal of item.signals) {
      if (signal.regex.test(text)) {
        const snippet = evidenceSnippet(text, signal.regex);
        if (snippet) evidence.push(snippet);
      } else {
        missingSignals.push(signal.name);
      }
    }

    const found = item.signals.length - missingSignals.length;
    const score: 0 | 0.5 | 1 =
      found >= item.thresholds.full ? 1 : found >= item.thresholds.half ? 0.5 : 0;

    return {
      id: item.id,
      law: item.law,
      labelEs: item.labelEs,
      score,
      weight: item.weight,
      evidence,
      missingSignals,
    };
  });
}
