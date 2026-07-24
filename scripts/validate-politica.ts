// Validación de la rúbrica de Política de Tratamiento contra sitios reales.
// Corre el pipeline real (buildContext + analyzeLegal), imprime el desglose
// por ítem y guarda el texto de cada política en /tmp/rubric-validation/
// para revisión manual.
//
// Uso: npx tsx scripts/validate-politica.ts <url> [url2 ...]

import { mkdirSync, writeFileSync } from 'fs';
import { buildContext } from '../src/lib/scanner/context';
import { analyzeLegal } from '../src/lib/scanner/legal/analyze';
import { htmlToText } from '../src/lib/scanner/legal/html-to-text';

const OUT_DIR = '/tmp/rubric-validation';

async function run(url: string) {
  const slug = new URL(url).hostname.replace(/^www\./, '').replace(/\./g, '_');
  console.log('\n' + '='.repeat(70));
  console.log(`SITIO: ${url}`);
  console.log('='.repeat(70));

  const context = await buildContext(url);
  const analysis = analyzeLegal(context);
  const pol = analysis.politicaTratamiento;

  console.log(`URL final:        ${context.url}`);
  console.log(`Política hallada: ${pol.documentUrl ?? '(ninguna)'}`);
  console.log(`Texto política:   ${htmlToText(context.privacyPolicyContent).length} chars`);
  if (context.fetchErrors.length) {
    console.log(`Errores fetch:    ${context.fetchErrors.join(' | ')}`);
  }
  console.log(`documentFound:    ${pol.documentFound}`);
  console.log(`SCORE POLÍTICA:   ${pol.score}/100`);

  for (const it of pol.items) {
    const mark = it.score === 1 ? '✓' : it.score === 0.5 ? '~' : '✗';
    console.log(`  ${mark} [${String(it.score).padEnd(3)}] peso ${String(it.weight).padStart(2)}  ${it.id}`);
    if (it.missingSignals.length) console.log(`        faltan: ${it.missingSignals.join(', ')}`);
  }

  // Guardar texto de la política para revisión experta
  const text = htmlToText(context.privacyPolicyContent);
  if (text.length > 0) {
    writeFileSync(`${OUT_DIR}/${slug}.txt`, `URL: ${pol.documentUrl}\nSCORE: ${pol.score}\n\n${text}`);
  }
  writeFileSync(`${OUT_DIR}/${slug}.json`, JSON.stringify(pol, null, 2));
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const urls = process.argv.slice(2);
  if (!urls.length) {
    console.error('Uso: npx tsx scripts/validate-politica.ts <url> [url2 ...]');
    process.exit(1);
  }
  for (const url of urls) {
    try {
      await run(url);
    } catch (err) {
      console.error(`\nERROR en ${url}: ${err}`);
    }
  }
}

main();
