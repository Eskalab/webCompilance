import { ScanResponse } from './scanner/types';
import { Locale } from './i18n';
import { getICDLevel, getNextGoal, ICD_AREAS, ICD_LEVELS, calcAreaScore, worstStatus } from './scanner/icd';
import { ENGINE_VERSION } from './scanner/scanner';
import { getLogoBase64 } from './logo';

// ─────────────────────────────────────────────────────────────────────────────
// Reporte de Confianza Digital — informe gratuito ejecutivo (4-5 páginas A4)
//
// Diagnóstico ejecutivo, no reporte técnico: tarjeta ICD, escala de 5 niveles,
// 4 áreas, 5 hallazgos en lenguaje de negocio y CTA a LegalCheck 360°.
// Referencias normativas de alto nivel (Ley 1581 de 2012 / ISO 27001) sin
// artículos ni controles numerados: ese detalle es del diagnóstico premium.
// Sin evidencia técnica (headers, scripts, listados de cookies).
// ─────────────────────────────────────────────────────────────────────────────

import { FINDINGS, FINDING_STATUS as STATUS_BADGE, selectFindings } from './scanner/findings';

function formatDuration(ms: number, lang: Locale): string {
  const totalSec = Math.round(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  if (lang === 'es') return min > 0 ? `${min} min ${sec} s` : `${sec} segundos`;
  return min > 0 ? `${min} min ${sec} s` : `${sec} seconds`;
}

const dot = (color: string, size = 8) =>
  `<span style="display:inline-block;width:${size}px;height:${size}px;border-radius:50%;background:${color};flex:none"></span>`;

export function renderPdfHtml(scan: ScanResponse, lang: Locale): string {
  const es = lang === 'es';
  const level = getICDLevel(scan.score);
  const nextGoal = getNextGoal(scan.score, lang);
  const dateLocale = es ? 'es-CO' : 'en-US';
  const dateStr = new Date(scan.scannedAt).toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' });
  const findings = selectFindings(scan.checks);
  const logoSrc = getLogoBase64();

  const areas = ICD_AREAS.map((a) => ({
    ...a,
    status: worstStatus(scan.checks, a.checkIds),
    score: calcAreaScore(scan.checks, a.checkIds),
  }));

  const areasHigh = areas.filter((a) => a.status === 'fail');
  const areasMed = areas.filter((a) => a.status === 'warn');
  const areasLow = areas.filter((a) => a.status === 'pass');
  const areaNames = (list: typeof areas) => list.map((a) => (es ? a.nameEs : a.nameEn)).join(' · ');

  // Anillo del score (SVG): r=64 → circunferencia ≈ 402
  const RING_R = 64;
  const RING_C = 2 * Math.PI * RING_R;
  const ringOn = (RING_C * scan.score) / 100;

  // Escala como banda segmentada proporcional
  const ordered = [...ICD_LEVELS].reverse(); // crítico → confiable
  const scaleBands = ordered.map((l) => {
    const span = l.max - l.min + 1;
    const current = l.id === level.id;
    return `<div style="flex:${span} 0 0">
        <div style="height:8px;border-radius:99px;background:${l.color};${current ? 'outline:3px solid ' + l.color + '33;' : 'opacity:.25;'}"></div>
        <div style="margin-top:8px;font-size:8.5px;letter-spacing:.6px;text-transform:uppercase;font-weight:${current ? '800' : '600'};color:${current ? l.color : '#a3aab8'};line-height:1.3">${es ? l.nameEs : l.nameEn}</div>
        <div style="font-size:8.5px;color:#c0c5d0;font-variant-numeric:tabular-nums">${l.min}–${l.max}</div>
      </div>`;
  }).join('<div style="flex:0 0 5px"></div>');

  const areaCards = areas.map((a) => {
    const s = STATUS_BADGE[a.status];
    const al = getICDLevel(a.score);
    return `
      <div class="card area-card">
        <div class="area-head">
          <span class="area-name">${es ? a.nameEs : a.nameEn}</span>
          <span class="chip" style="color:${s.color};background:${s.tint}">${dot(s.color, 6)}${es ? s.es : s.en}</span>
        </div>
        <div class="area-num num">${a.score}<span>/100</span></div>
        <div class="track"><div class="fill" style="width:${a.score}%;background:${al.color}"></div></div>
      </div>`;
  }).join('');

  const findingsHtml = findings.map((c, i) => {
    const copy = FINDINGS[c.checkId];
    const badge = STATUS_BADGE[c.status as 'pass' | 'warn' | 'fail'];
    const ok = c.status === 'pass';
    return `
    <article class="card finding" style="--edge:${badge.color}">
      <div class="finding-top">
        <span class="finding-num num">${String(i + 1).padStart(2, '0')}</span>
        <h3>${es ? copy.title.es : copy.title.en}</h3>
        <span class="chip" style="color:${badge.color};background:${badge.tint}">${dot(badge.color, 6)}${es ? badge.es : badge.en}</span>
      </div>
      <div class="finding-grid">
        <div>
          <p class="k">${es ? 'Qué detectamos' : 'What we detected'}</p>
          <p class="v">${ok ? (es ? copy.detectedOk.es : copy.detectedOk.en) : (es ? copy.detectedBad.es : copy.detectedBad.en)}</p>
        </div>
        <div>
          <p class="k">${es ? 'Por qué importa' : 'Why it matters'}</p>
          <p class="v">${es ? copy.why.es : copy.why.en}</p>
        </div>
      </div>
      <div class="rec">
        <div>
          <p class="k" style="color:#0f8b8d">${es ? 'Recomendación' : 'Recommendation'}</p>
          <p class="v">${ok ? (es ? copy.recOk.es : copy.recOk.en) : (es ? copy.recBad.es : copy.recBad.en)}</p>
        </div>
        <span class="ref">${es ? copy.norm.es : copy.norm.en}</span>
      </div>
    </article>`;
  }).join('');

  const notAnalyzed = es
    ? ['cómo se almacenan realmente los datos', 'quién tiene acceso a ellos', 'si tus documentos reflejan la operación de tu empresa', 'si tus procesos cumplen con la normativa', 'cómo respondes ante incidentes de seguridad']
    : ['how data is actually stored', 'who has access to it', 'whether your documents reflect your company’s operation', 'whether your processes comply with regulations', 'how you respond to security incidents'];

  const businessBullets = es
    ? [['Confianza', 'La percepción de seguridad que tus clientes tienen al entregarte información.'],
       ['Profesionalismo', 'La imagen que proyecta tu empresa en cada punto de contacto digital.'],
       ['Protección', 'El resguardo real de la información que recopilas día a día.'],
       ['Preparación', 'Tu posición frente a futuras revisiones, auditorías o reclamaciones.']]
    : [['Trust', 'How safe your customers feel when handing over their information.'],
       ['Professionalism', 'The image your company projects at every digital touchpoint.'],
       ['Protection', 'The real safeguarding of the information you collect every day.'],
       ['Readiness', 'Your position for future reviews, audits or claims.']];

  const priorities = [
    { color: '#e02424', tint: '#fdeaea', label: es ? 'Prioridad alta' : 'High priority', areas: areasHigh,
      text: es ? 'Revisar lo antes posible: puede impactar la protección de la información y la confianza de los usuarios.'
               : 'Review as soon as possible: it can impact information protection and user trust.' },
    { color: '#c27803', tint: '#fdf3df', label: es ? 'Prioridad media' : 'Medium priority', areas: areasMed,
      text: es ? 'Oportunidades claras para fortalecer el cumplimiento y reducir riesgos futuros.'
               : 'Clear opportunities to strengthen compliance and reduce future risks.' },
    { color: '#0e9f6e', tint: '#e6f7f0', label: es ? 'Prioridad baja' : 'Low priority', areas: areasLow,
      text: es ? 'Nivel adecuado; mantener controles y realizar revisiones periódicas.'
               : 'Adequate level; keep controls in place and review periodically.' },
  ];

  const priorityCards = priorities.map((p) => `
      <div class="card prio" style="--edge:${p.color}">
        <span class="chip" style="color:${p.color};background:${p.tint}">${dot(p.color, 6)}${p.label}</span>
        <p class="v" style="margin-top:10px">${p.text}</p>
        <p class="prio-areas">${p.areas.length ? areaNames(p.areas) : (es ? 'Ninguna área en este nivel' : 'No areas at this level')}</p>
      </div>`).join('');

  const waMessage = encodeURIComponent(
    es
      ? `Hola, escaneé el sitio ${scan.url} con el Scanner de TDE y mi Índice de Confianza Digital es ${scan.score} (${level.nameEs}). Me gustaría agendar una sesión de revisión personalizada.`
      : `Hi, I scanned ${scan.url} with the TDE Scanner and my Digital Trust Index is ${scan.score} (${level.nameEn}). I would like to schedule a personalized review session.`,
  );
  const waUrl = `https://wa.me/573143992911?text=${waMessage}`;

  const secHead = (n: string, title: string, sub: string) => `
    <div class="sec">
      <span class="sec-n num">${n}</span>
      <div><h2>${title}</h2><p class="sec-sub">${sub}</p></div>
    </div>`;

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${es ? 'Reporte de Confianza Digital' : 'Digital Trust Report'} — ${scan.url}</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    @page{size:A4;margin:10mm 9mm}
    :root{
      --ink:#101728; --body:#414b5f; --muted:#8a92a3; --line:#e7eaf0;
      --navy:#1e2a52; --teal:#0f8b8d; --bg:#f3f5f9; --card:#ffffff;
    }
    html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Roboto,Helvetica,Arial,sans-serif;background:var(--bg);color:var(--ink);font-size:13px;line-height:1.6;-webkit-font-smoothing:antialiased}
    .wrap{max-width:820px;margin:0 auto;padding:36px 20px 28px}
    .num{font-variant-numeric:tabular-nums;font-feature-settings:'tnum','ss01'}
    .page{page-break-after:always;margin-bottom:36px}
    .page:last-child{page-break-after:auto;margin-bottom:0}

    .card{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:24px 26px;box-shadow:0 1px 2px rgba(16,23,40,.04),0 8px 24px -12px rgba(16,23,40,.08);break-inside:avoid}
    .chip{display:inline-flex;align-items:center;gap:6px;font-size:10.5px;font-weight:700;padding:5px 12px;border-radius:99px;letter-spacing:.2px;white-space:nowrap}
    .k{font-size:10px;letter-spacing:1.4px;text-transform:uppercase;color:var(--muted);font-weight:800;margin-bottom:4px}
    .v{color:var(--body);font-size:12.5px;line-height:1.62}
    .track{height:6px;background:#edf0f5;border-radius:99px;overflow:hidden}
    .fill{height:100%;border-radius:99px}

    /* ── Portada ── */
    .cover{position:relative;overflow:hidden;border-radius:26px;background:radial-gradient(120% 140% at 85% -20%,#2d7d9a 0%,#1e2a52 46%,#151d3b 100%);color:#fff;padding:46px 46px 40px;box-shadow:0 24px 48px -20px rgba(30,42,82,.45)}
    .cover::after{content:'';position:absolute;inset:0;background:radial-gradient(60% 55% at 12% 108%,rgba(15,139,141,.35),transparent 70%)}
    .cover>*{position:relative;z-index:1}
    .cover-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:52px}
    .cover-badge{font-size:10px;letter-spacing:2px;text-transform:uppercase;font-weight:700;color:#9fb6d8;border:1px solid rgba(255,255,255,.22);border-radius:99px;padding:6px 14px}
    .eyebrow{font-size:11px;letter-spacing:2.6px;text-transform:uppercase;color:#67d4cf;font-weight:800;margin-bottom:14px}
    .cover h1{font-size:44px;line-height:1.04;font-weight:800;letter-spacing:-1.4px;margin-bottom:16px;max-width:520px}
    .cover .lede{color:#b9c3dd;font-size:14.5px;line-height:1.6;max-width:460px;margin-bottom:44px}
    .cover-facts{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
    .cfact{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.13);border-radius:14px;padding:12px 15px;backdrop-filter:blur(4px)}
    .cfact dt{font-size:8.5px;letter-spacing:1.4px;text-transform:uppercase;color:#8fa2c9;font-weight:700;margin-bottom:3px}
    .cfact dd{font-size:12px;font-weight:600;color:#fff;word-break:break-word}
    .cover-frame{margin-top:12px;display:flex;gap:8px;flex-wrap:wrap}
    .cover-frame span{font-size:10.5px;color:#b9c3dd;border:1px solid rgba(255,255,255,.16);border-radius:99px;padding:5px 12px}

    /* ── Secciones ── */
    .sec{display:flex;gap:14px;align-items:flex-start;margin:34px 4px 16px}
    .sec-n{flex:none;width:34px;height:34px;border-radius:11px;background:var(--navy);color:#fff;font-size:12.5px;font-weight:800;display:flex;align-items:center;justify-content:center}
    .sec h2{font-size:19px;font-weight:800;letter-spacing:-.4px}
    .sec-sub{font-size:12px;color:var(--muted);margin-top:1px}

    /* ── Hero score ── */
    .hero{display:flex;gap:34px;align-items:center}
    .ring{flex:none;position:relative;width:168px;height:168px}
    .ring svg{transform:rotate(-90deg)}
    .ring-label{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
    .ring-score{font-size:44px;font-weight:800;letter-spacing:-1.5px;line-height:1;color:var(--ink)}
    .ring-den{font-size:10.5px;color:var(--muted);font-weight:600;margin-top:3px;letter-spacing:1px}
    .hero-body{flex:1}
    .hero-body .chip{font-size:11.5px;padding:6px 14px}
    .hero-body>p{margin-top:11px;color:var(--body);font-size:13px}
    .goal{margin-top:14px;display:inline-flex;align-items:center;gap:9px;background:#f0f7f7;border:1px solid #d5eaea;border-radius:12px;padding:9px 14px}
    .goal b{font-size:12px;color:var(--navy)}
    .goal span{font-size:10px;letter-spacing:1.2px;text-transform:uppercase;color:var(--teal);font-weight:800}
    .scale{display:flex;align-items:flex-start;margin-top:22px;padding-top:20px;border-top:1px solid var(--line)}

    /* ── Áreas ── */
    .areas{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
    .area-card{padding:20px 22px}
    .area-head{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px}
    .area-name{font-weight:700;font-size:13.5px}
    .area-num{font-size:30px;font-weight:800;letter-spacing:-1px;margin-bottom:10px}
    .area-num span{font-size:12px;color:var(--muted);font-weight:600;letter-spacing:0;margin-left:3px}
    .note{font-size:11px;color:var(--muted);line-height:1.6;margin-top:14px;padding:0 6px}

    /* ── Hallazgos ── */
    .finding{margin-bottom:14px;border-left:4px solid var(--edge);border-radius:20px}
    .finding-top{display:flex;align-items:center;gap:12px;margin-bottom:14px}
    .finding-num{flex:none;font-size:13px;font-weight:800;color:var(--muted);background:#f1f3f7;border-radius:10px;padding:6px 10px}
    .finding-top h3{flex:1;font-size:14.5px;font-weight:800;letter-spacing:-.2px}
    .finding-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px 22px}
    .rec{margin-top:14px;background:#f4f9f9;border:1px solid #dcecec;border-radius:14px;padding:13px 16px;display:flex;gap:18px;align-items:flex-start;justify-content:space-between}
    .ref{flex:none;font-size:9.5px;color:var(--muted);font-weight:600;max-width:150px;text-align:right;line-height:1.5;padding-top:2px}

    /* ── Negocio / prioridad ── */
    .biz{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
    .biz .card{padding:20px 22px}
    .biz h4{font-size:14px;font-weight:800;margin-bottom:5px;letter-spacing:-.2px}
    .biz .accent{width:26px;height:4px;border-radius:99px;background:linear-gradient(90deg,var(--teal),#67d4cf);margin-bottom:12px}
    .lvl-rec{margin-top:14px;border-left:4px solid ${level.color}}
    .prios{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:14px}
    .prio{padding:18px 20px;border-top:4px solid var(--edge);border-radius:18px}
    .prio .v{font-size:11.5px}
    .prio-areas{margin-top:10px;font-size:11px;font-weight:700;color:var(--ink);border-top:1px solid var(--line);padding-top:9px}

    /* ── Cierre ── */
    .excl{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:4px}
    .excl div{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:12px 16px;font-size:12px;color:var(--body);display:flex;gap:10px;align-items:center}
    .excl .x{flex:none;width:20px;height:20px;border-radius:7px;background:#f1f3f7;color:var(--muted);font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center}
    .cta{margin-top:16px;border-radius:24px;background:radial-gradient(120% 160% at 90% -30%,#2d7d9a 0%,#1e2a52 50%,#151d3b 100%);color:#fff;padding:36px 40px;display:flex;gap:30px;align-items:center;justify-content:space-between;box-shadow:0 24px 48px -20px rgba(30,42,82,.45)}
    .cta h3{font-size:26px;font-weight:800;letter-spacing:-.6px;margin:6px 0 8px}
    .cta p{color:#b9c3dd;font-size:12.5px;max-width:400px}
    .cta a{flex:none;display:inline-block;background:#fff;color:var(--navy);font-size:13px;font-weight:800;padding:14px 26px;border-radius:14px;text-decoration:none;box-shadow:0 8px 20px -8px rgba(0,0,0,.4)}
    .cta .contact{margin-top:10px;font-size:10.5px;color:#8fa2c9}
    .foot{margin-top:22px;display:flex;justify-content:space-between;gap:16px;font-size:10px;color:var(--muted);padding:0 8px;line-height:1.5}
  </style>
</head>
<body>
<div class="wrap">

  <!-- ══ PORTADA ══ -->
  <div class="page">
    <div class="cover">
      <div class="cover-top">
        ${logoSrc ? `<img src="${logoSrc}" alt="TDE" style="height:36px;filter:brightness(0) invert(1)">` : `<strong>TDE</strong>`}
        <span class="cover-badge">${es ? 'Informe de diagnóstico' : 'Diagnostic report'}</span>
      </div>
      <p class="eyebrow">${es ? 'Índice de Confianza Digital™' : 'Digital Trust Index™'}</p>
      <h1>${es ? 'Reporte de Confianza Digital' : 'Digital Trust Report'}</h1>
      <p class="lede">${es
        ? 'Una radiografía del estado inicial de tu sitio web en materia de privacidad, seguridad de la información y cumplimiento normativo.'
        : 'An X-ray of your website’s initial state regarding privacy, information security and regulatory compliance.'}</p>
      <dl class="cover-facts">
        <div class="cfact"><dt>${es ? 'Sitio analizado' : 'Analyzed site'}</dt><dd>${scan.url}</dd></div>
        <div class="cfact"><dt>${es ? 'Fecha' : 'Date'}</dt><dd>${dateStr}</dd></div>
        <div class="cfact"><dt>${es ? 'Duración' : 'Duration'}</dt><dd class="num">${scan.summary.durationMs ? formatDuration(scan.summary.durationMs, lang) : '—'}</dd></div>
        <div class="cfact"><dt>${es ? 'Escáner' : 'Scanner'}</dt><dd class="num">v${ENGINE_VERSION}.0 · ${scan.summary.total} ${es ? 'controles' : 'checks'}</dd></div>
      </dl>
      <div class="cover-frame">
        <span>${es ? 'Ley 1581 de 2012 — Protección de Datos (Colombia)' : 'Law 1581 of 2012 — Data Protection (Colombia)'}</span>
        <span>${es ? 'Buenas prácticas ISO/IEC 27001' : 'ISO/IEC 27001 best practices'}</span>
      </div>
    </div>
  </div>

  <!-- ══ 01 · RESULTADO ══ -->
  <div class="page">
    ${secHead('01', es ? 'Resultado general' : 'Overall result', es ? 'Tu posición en el Índice de Confianza Digital™' : 'Your position on the Digital Trust Index™')}
    <div class="card">
      <div class="hero">
        <div class="ring">
          <svg width="168" height="168" viewBox="0 0 168 168">
            <circle cx="84" cy="84" r="${RING_R}" fill="none" stroke="#edf0f5" stroke-width="14"/>
            <circle cx="84" cy="84" r="${RING_R}" fill="none" stroke="${level.color}" stroke-width="14" stroke-linecap="round"
              stroke-dasharray="${ringOn.toFixed(1)} ${RING_C.toFixed(1)}"/>
          </svg>
          <div class="ring-label">
            <span class="ring-score num">${scan.score}</span>
            <span class="ring-den">${es ? 'DE 100' : 'OF 100'}</span>
          </div>
        </div>
        <div class="hero-body">
          <span class="chip" style="color:${level.color};background:${level.bg}">${dot(level.color, 7)}${es ? level.nameEs : level.nameEn}</span>
          <p>${es ? level.interpretationEs : level.interpretationEn}</p>
          ${nextGoal ? `<div class="goal"><span>${es ? 'Próxima meta' : 'Next goal'}</span><b>${es ? `Nivel ${nextGoal.name} · ${nextGoal.threshold} puntos` : `${nextGoal.name} level · ${nextGoal.threshold} points`}</b></div>` : ''}
        </div>
      </div>
      <div class="scale">${scaleBands}</div>
    </div>

    ${secHead('02', es ? 'Estado por área' : 'Status by area', es ? 'Cuatro dimensiones del cumplimiento digital' : 'Four dimensions of digital compliance')}
    <div class="areas">${areaCards}</div>
    <p class="note">${es
      ? 'Resultado de un análisis automatizado de los elementos visibles del sitio web; referencia inicial para la toma de decisiones. No constituye una auditoría legal.'
      : 'Result of an automated analysis of the visible elements of the website; an initial reference for decision-making. It does not constitute a legal audit.'}</p>
  </div>

  <!-- ══ 03 · HALLAZGOS ══ -->
  <div class="page">
    ${secHead('03', es ? 'Principales hallazgos' : 'Main findings', es ? 'Los cinco aspectos más relevantes del análisis' : 'The five most relevant aspects of the analysis')}
    ${findingsHtml}
  </div>

  <!-- ══ 04 · EMPRESA ══ -->
  <div class="page">
    ${secHead('04', es ? '¿Qué significa para tu empresa?' : 'What this means for your company', es ? 'El impacto de estos resultados en el negocio' : 'The business impact of these results')}
    <div class="biz">
      ${businessBullets.map(([h, d]) => `<div class="card"><div class="accent"></div><h4>${h}</h4><p class="v">${d}</p></div>`).join('')}
    </div>

    <div class="card lvl-rec">
      <span class="chip" style="color:${level.color};background:${level.bg}">${dot(level.color, 6)}${es ? `Recomendación para tu nivel · ${level.nameEs}` : `Recommendation for your level · ${level.nameEn}`}</span>
      <p class="v" style="margin-top:11px">${es ? level.recommendationEs : level.recommendationEn}</p>
    </div>

    <div class="prios">${priorityCards}</div>
  </div>

  <!-- ══ 05 · QUÉ SIGUE ══ -->
  <div class="page">
    ${secHead('05', es ? 'El primer paso' : 'The first step', es ? 'Lo que este análisis no alcanza a ver' : 'What this analysis cannot see')}
    <div class="excl">
      ${notAnalyzed.map((n) => `<div><span class="x">×</span>${n}</div>`).join('')}
    </div>

    <div class="cta">
      <div>
        <p class="eyebrow" style="margin-bottom:0">${es ? 'Diagnóstico integral' : 'Comprehensive diagnosis'}</p>
        <h3>LegalCheck 360°</h3>
        <p>${es
          ? 'Revisa la operación digital, los procesos y la documentación de tu empresa para entregar un mapa de riesgos y un plan de acción priorizado.'
          : 'Reviews your company’s digital operation, processes and documentation to deliver a risk map and a prioritized action plan.'}</p>
        <p class="contact">+57 314 399 2911 · info@tde.com.co · tde.com.co</p>
      </div>
      <a href="${waUrl}">${es ? 'Solicitar una sesión →' : 'Request a session →'}</a>
    </div>

    <div class="foot">
      <span>© ${new Date().getFullYear()} TDE Transformación Digital Empresarial · Bogotá, Colombia</span>
      <span style="text-align:right">${es
        ? 'Generado por el Escáner Legal TDE. Referencia inicial; no constituye asesoría legal.'
        : 'Generated by the TDE Legal Scanner. Initial reference; not legal advice.'}</span>
    </div>
  </div>

</div>
</body>
</html>`;
}
