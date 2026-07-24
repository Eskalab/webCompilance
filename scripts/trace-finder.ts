// Traza el procedimiento del buscador de política para un sitio:
// muestra los links extraídos, cuáles matchean en cada intento y cuál gana.
// Replica la lógica de findPrivacyPolicyUrl (context.ts) para diagnóstico.
//
// Uso: npx tsx scripts/trace-finder.ts <url>

import { buildContext } from '../src/lib/scanner/context';

const PRIVACY_KEYWORDS = [
  'privacidad', 'privacy', 'privacidade',
  'datos-personales', 'data-protection', 'protecao-de-dados',
  'habeas-data', 'aviso-de-privacidad', 'politica-de-privacidade',
  'tratamiento-de-datos',
];

const PRIVACY_TEXT_KEYWORDS = [
  'privacidad', 'privacy', 'privacidade',
  'política de privacidad', 'privacy policy',
  'aviso de privacidad', 'protección de datos',
  'datos personales', 'habeas data',
  'tratamiento de datos', 'proteção de dados',
];

async function main() {
  const url = process.argv[2];
  if (!url) {
    console.error('Uso: npx tsx scripts/trace-finder.ts <url>');
    process.exit(1);
  }

  const context = await buildContext(url);
  console.log(`URL final: ${context.url}`);
  console.log(`Links extraídos: ${context.allLinks.length}  |  URLs en sitemap: ${context.sitemapUrls.length}`);

  // Mismo orden que el buscador: footer → nav → body
  const rank = { footer: 0, nav: 1, body: 2 };
  const ordered = [...context.allLinks].sort((a, b) => rank[a.location] - rank[b.location]);

  console.log('\n── INTENTO 1: por TEXTO del link (en orden footer→nav→body) ──');
  let winner: string | null = null;
  for (const link of ordered) {
    const lowerText = link.text.toLowerCase();
    const kw = PRIVACY_TEXT_KEYWORDS.find((k) => lowerText.includes(k));
    if (kw) {
      const mark = winner ? '  ' : '►►';
      if (!winner) winner = link.href;
      console.log(`${mark} [${link.location}] texto="${link.text.slice(0, 70)}" (matcheó "${kw}")`);
      console.log(`      href=${link.href.slice(0, 110)}`);
    }
  }
  if (!winner) console.log('   (ningún link matcheó por texto)');

  console.log('\n── INTENTO 2: por HREF del link ──');
  let winner2: string | null = null;
  for (const link of ordered) {
    const lowerHref = link.href.toLowerCase();
    const kw = PRIVACY_KEYWORDS.find((k) => lowerHref.includes(k));
    if (kw) {
      const mark = winner2 ? '  ' : '►►';
      if (!winner2) winner2 = link.href;
      console.log(`${mark} [${link.location}] href=${link.href.slice(0, 100)} (matcheó "${kw}")`);
    }
  }
  if (!winner2) console.log('   (ningún link matcheó por href)');

  console.log('\n── INTENTO 3: por SITEMAP ──');
  const sitemapMatches = context.sitemapUrls.filter((u) =>
    PRIVACY_KEYWORDS.some((k) => u.toLowerCase().includes(k)),
  );
  for (const u of sitemapMatches.slice(0, 5)) console.log(`   ${u}`);
  if (!sitemapMatches.length) console.log('   (sin matches en sitemap)');

  console.log(`\n== GANADOR (lógica actual): ${winner ?? winner2 ?? sitemapMatches[0] ?? '(ninguno)'}`);
  console.log(`== Elegido por buildContext: ${context.privacyPolicyUrl ?? '(ninguno)'}`);
}

main();
