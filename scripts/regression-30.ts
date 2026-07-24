// Regression test — 30 sitios colombianos ya validados en lotes 1-3.
// Corre el pipeline real (buildContext + analyzeLegal) y compara el score de
// hoy contra el score esperado del historial, para detectar regresiones tras
// meter la ingesta en capas (got-scraping) + render con Crawlee.
//
// Uso: npx tsx scripts/regression-30.ts
//
// OJO red: un HTTP 000 / connection error suele ser artefacto del entorno de
// pruebas, no bloqueo del sitio (ver bitácora lote 2). Concluir en red real.

import { buildContext } from '../src/lib/scanner/context';
import { analyzeLegal } from '../src/lib/scanner/legal/analyze';

// [url, score esperado del historial]
const SITES: [string, number][] = [
  ['https://www.sura.co', 90],
  ['https://www.epm.com.co', 65],
  ['https://www.corona.co', 57],
  ['https://www.nequi.com.co', 57],
  ['https://www.alkosto.com', 70],
  ['https://www.uniandes.edu.co', 93],
  ['https://www.falabella.com.co', 100],
  ['https://www.postobon.com', 93],
  ['https://www.bancolombia.com', 85],
  ['https://www.claro.com.co', 93],
  ['https://www.tigo.com.co', 93],
  ['https://www.panamericana.com.co', 100],
  ['https://www.grupoargos.com', 100],
  ['https://www.bancopopular.com.co', 93],
  ['https://www.eafit.edu.co', 93],
  ['https://www.avvillas.com.co', 85],
  ['https://www.celsia.com', 100],
  ['https://www.homecenter.com.co', 93],
  ['https://www.colsubsidio.com', 85],
  ['https://www.crepesywaffles.com', 80],
  ['https://www.compensar.com', 53],
  ['https://www.juanvaldez.com', 85],
  ['https://www.arturocalle.com', 75],
  ['https://www.cruzverde.com.co', 0],
  ['https://www.d1.com.co', 28],
  ['https://www.mercadolibre.com.co', 30],
  ['https://www.avianca.com', 0],
  ['https://www.emcali.com.co', 0],
  ['https://www.bancodebogota.com', 0],
  ['https://www.totto.com', 0],
];

const PER_SITE_TIMEOUT_MS = 90_000;

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, rej) => setTimeout(() => rej(new Error('timeout')), ms)),
  ]);
}

type Row = {
  site: string;
  score: number | null;
  expected: number;
  doc: boolean;
  rendered: boolean;
  gotScraping: boolean;
  note: string;
};

async function run(url: string, expected: number): Promise<Row> {
  const site = new URL(url).hostname.replace(/^www\./, '');
  try {
    const ctx = await withTimeout(buildContext(url), PER_SITE_TIMEOUT_MS);
    const pol = analyzeLegal(ctx).politicaTratamiento;
    const errs = ctx.fetchErrors.join(' | ').toLowerCase();
    return {
      site,
      score: pol.score,
      expected,
      doc: pol.documentFound,
      rendered: /render/.test(errs),
      gotScraping: false, // no se expone en errors; se infiere aparte
      note: pol.documentUrl ? '' : 'sin política',
    };
  } catch (e) {
    return {
      site, score: null, expected, doc: false, rendered: false, gotScraping: false,
      note: (e as Error).message === 'timeout' ? 'TIMEOUT' : `err:${(e as Error).message.slice(0, 24)}`,
    };
  }
}

function fmt(row: Row): string {
  const score = row.score === null ? ' — ' : String(row.score).padStart(3);
  const d = row.score === null ? '' : String(row.score - row.expected);
  const delta = row.score === null ? '  ' : (row.score - row.expected === 0 ? ' 0' : (row.score! - row.expected > 0 ? '+' + d : d));
  const flags = [row.doc ? 'doc' : '   ', row.rendered ? 'render' : '      '].join(' ');
  return `| ${row.site.padEnd(22)} | ${score} | ${String(row.expected).padStart(3)} | ${delta.padStart(4)} | ${flags} | ${row.note} |`;
}

async function main() {
  console.log('Corriendo 30 sitios (secuencial, puede tardar varios minutos)...\n');
  const rows: Row[] = [];
  for (const [url, expected] of SITES) {
    const row = await run(url, expected);
    rows.push(row);
    console.log(fmt(row)); // progreso incremental
  }

  console.log('\n\n=== TABLA FINAL ===');
  console.log('| Sitio                  | Hoy | Esp | Δ    | flags       | nota |');
  console.log('|------------------------|-----|-----|------|-------------|------|');
  for (const r of rows) console.log(fmt(r));

  const withScore = rows.filter((r) => r.score !== null);
  const regressions = withScore.filter((r) => (r.score as number) < r.expected - 10);
  const improved = withScore.filter((r) => (r.score as number) > r.expected + 10);
  const failed = rows.filter((r) => r.score === null);
  console.log(`\nRESUMEN: ${withScore.length}/30 con score · ${regressions.length} regresiones (>10 abajo) · ${improved.length} mejoras (>10 arriba) · ${failed.length} sin conectar`);
  if (regressions.length) console.log('REGRESIONES: ' + regressions.map((r) => `${r.site}(${r.score} vs ${r.expected})`).join(', '));
  if (failed.length) console.log('SIN CONECTAR: ' + failed.map((r) => `${r.site}[${r.note}]`).join(', '));
}

main();
