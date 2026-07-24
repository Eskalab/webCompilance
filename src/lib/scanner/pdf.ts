// Extracción de texto plano de documentos PDF (políticas publicadas como PDF).
// Usa unpdf (motor pdfjs empaquetado, sin binarios nativos → sirve en serverless).

import { extractText, getDocumentProxy } from 'unpdf';

export function isPdf(url: string, contentType: string): boolean {
  return contentType.toLowerCase().includes('pdf') || /\.pdf(?:$|\?)/i.test(url);
}

export async function extractPdfText(data: ArrayBuffer): Promise<string> {
  try {
    const pdf = await getDocumentProxy(new Uint8Array(data));
    const { text } = await extractText(pdf, { mergePages: true });
    return (Array.isArray(text) ? text.join('\n') : text).replace(/\s+/g, ' ').trim();
  } catch {
    return '';
  }
}
