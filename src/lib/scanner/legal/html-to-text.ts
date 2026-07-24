// Convierte HTML crudo a texto plano para analizar señales legales.
// Sin dependencias externas: elimina scripts/estilos, tags y decodifica entidades comunes.

const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
  '&nbsp;': ' ',
  '&aacute;': 'á',
  '&eacute;': 'é',
  '&iacute;': 'í',
  '&oacute;': 'ó',
  '&uacute;': 'ú',
  '&ntilde;': 'ñ',
  '&Aacute;': 'Á',
  '&Eacute;': 'É',
  '&Iacute;': 'Í',
  '&Oacute;': 'Ó',
  '&Uacute;': 'Ú',
  '&Ntilde;': 'Ñ',
};

export function htmlToText(html: string): string {
  if (!html) return '';

  let text = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ');

  for (const [entity, char] of Object.entries(ENTITIES)) {
    text = text.split(entity).join(char);
  }
  // Entidades numéricas (&#225; → á)
  text = text.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));

  return text.replace(/\s+/g, ' ').trim();
}

// Recorre un valor JSON y junta todas las cadenas de texto significativas.
function collectStrings(node: unknown, out: string[]): void {
  if (typeof node === 'string') {
    if (node.trim().length > 2) out.push(node);
  } else if (Array.isArray(node)) {
    for (const n of node) collectStrings(n, out);
  } else if (node && typeof node === 'object') {
    for (const n of Object.values(node)) collectStrings(n, out);
  }
}

// Extrae el texto embebido en JSON (SPAs de Next.js/React guardan el contenido
// en <script id="__NEXT_DATA__"> o en scripts application/json, no en el DOM visible).
export function extractEmbeddedJsonText(html: string): string {
  if (!html) return '';
  const blocks: string[] = [];
  const scriptRe = /<script\b[^>]*(?:id=["']__NEXT_DATA__["']|type=["']application\/json["'])[^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = scriptRe.exec(html)) !== null) {
    try {
      const out: string[] = [];
      collectStrings(JSON.parse(m[1].trim()), out);
      blocks.push(out.join(' '));
    } catch {
      /* JSON inválido: ignorar este bloque */
    }
  }
  // Las cadenas pueden traer HTML/entidades embebidos → limpiar con htmlToText.
  return htmlToText(blocks.join(' '));
}

// Texto para analizar una política: el visible más el embebido en JSON
// (SPAs de Next.js/React guardan el contenido en __NEXT_DATA__, no en el DOM).
// Si no hay JSON embebido, equivale al texto visible.
export function documentText(html: string): string {
  const visible = htmlToText(html);
  const embedded = extractEmbeddedJsonText(html);
  return embedded ? `${visible} ${embedded}`.trim() : visible;
}
