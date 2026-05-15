import { NextRequest, NextResponse } from 'next/server';
import { ScanResponse } from '@/lib/scanner/types';
import { translations, Locale } from '@/lib/i18n';

function tp(key: keyof typeof translations, locale: Locale): string {
  return translations[key][locale];
}

export async function POST(request: NextRequest) {
  let body: ScanResponse & { lang?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const lang: Locale = body.lang === 'en' ? 'en' : 'es';
  const html = renderPdfHtml(body, lang);
  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

function renderPdfHtml(scan: ScanResponse, lang: Locale): string {
  const scoreColor = scan.score >= 80 ? '#22c55e' : scan.score >= 50 ? '#eab308' : '#ef4444';

  const statusLabels = {
    pass: tp('status_pass', lang),
    warn: tp('status_warn', lang),
    fail: tp('status_fail', lang),
    skip: tp('status_skip', lang),
  };

  const checksHtml = scan.checks
    .map((c) => {
      const statusColor =
        c.status === 'pass' ? '#22c55e' : c.status === 'warn' ? '#eab308' : '#ef4444';
      const statusLabel = statusLabels[c.status] || c.status.toUpperCase();

      return `
        <tr>
          <td>${c.label}</td>
          <td><span style="color:${statusColor};font-weight:bold">${statusLabel}</span></td>
          <td>${c.details}</td>
          <td>${c.suggestion || '—'}</td>
        </tr>`;
    })
    .join('');

  const recommendations = scan.checks
    .filter((c) => c.status === 'fail' || c.status === 'warn')
    .map((c) => `<li><strong>${c.label}:</strong> ${c.suggestion}</li>`)
    .join('');

  const dateLocale = lang === 'en' ? 'en-US' : 'es-CO';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${tp('pdf_title', lang)} — ${scan.url}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a1a; padding: 40px; max-width: 900px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 32px; border-bottom: 2px solid #e5e7eb; padding-bottom: 24px; }
    .header h1 { font-size: 20px; color: #111827; }
    .header p { color: #6b7280; font-size: 13px; margin-top: 4px; }
    .score-box { text-align: center; margin: 24px 0; }
    .score-number { font-size: 64px; font-weight: bold; }
    .score-label { font-size: 14px; color: #6b7280; }
    .summary { display: flex; justify-content: center; gap: 24px; margin: 16px 0 32px; }
    .summary span { font-size: 14px; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; }
    th, td { text-align: left; padding: 8px 12px; border-bottom: 1px solid #e5e7eb; }
    th { background: #f9fafb; font-weight: 600; }
    .recommendations { margin: 24px 0; }
    .recommendations h2 { font-size: 16px; margin-bottom: 8px; }
    .recommendations li { margin: 6px 0; font-size: 13px; }
    .footer { margin-top: 40px; text-align: center; font-size: 11px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 16px; }
    @media print {
      body { padding: 20px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${tp('pdf_title', lang)}</h1>
    <p>${scan.url} — ${new Date(scan.scannedAt).toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  </div>

  <div class="score-box">
    <div class="score-number" style="color:${scoreColor}">${scan.score}%</div>
    <div class="score-label">${tp('pdf_score', lang)}</div>
  </div>

  <div class="summary">
    <span style="color:#22c55e">${scan.summary.pass} ${tp('pdf_passed', lang)}</span>
    <span style="color:#eab308">${scan.summary.warn} ${tp('pdf_warnings', lang)}</span>
    <span style="color:#ef4444">${scan.summary.fail} ${tp('pdf_failed', lang)}</span>
  </div>

  <table>
    <thead>
      <tr><th>${tp('pdf_check', lang)}</th><th>${tp('pdf_status', lang)}</th><th>${tp('pdf_details', lang)}</th><th>${tp('pdf_recommendation', lang)}</th></tr>
    </thead>
    <tbody>
      ${checksHtml}
    </tbody>
  </table>

  ${recommendations ? `
  <div class="recommendations">
    <h2>${tp('pdf_priority_recommendations', lang)}</h2>
    <ul>${recommendations}</ul>
  </div>` : ''}

  <div class="footer">
    <p>${tp('pdf_generated_by', lang)}</p>
    <p>${tp('pdf_disclaimer', lang)}</p>
  </div>

  <script class="no-print">window.onload = () => window.print();</script>
</body>
</html>`;
}
