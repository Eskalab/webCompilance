import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generatePdfBuffer } from '@/lib/generate-pdf';

const scoreConfig = (score: number) => {
  if (score >= 80) return {
    level: 'VERDE',
    color: '#10b981',
    boxBg: '#ecfdf5',
    boxBorder: '#a7f3d0',
    boxTextColor: '#065f46',
    title: '¡Tu sitio está bien protegido!',
    desc: 'Tus controles básicos están en orden. Te recomendamos una revisión periódica para mantener este nivel.',
  };
  if (score >= 50) return {
    level: 'AMARILLO',
    color: '#f59e0b',
    boxBg: '#fffbeb',
    boxBorder: '#fde68a',
    boxTextColor: '#92400e',
    title: 'Hay aspectos por mejorar',
    desc: 'Tu sitio tiene advertencias de cumplimiento. Un experto puede ayudarte a resolverlas antes de que se conviertan en un problema.',
  };
  return {
    level: 'ROJO',
    color: '#ef4444',
    boxBg: '#fef2f2',
    boxBorder: '#fecaca',
    boxTextColor: '#b91c1c',
    title: '¡Acción inmediata requerida!',
    desc: 'Tu nivel de riesgo es muy alto. Tu sitio está expuesto a sanciones y brechas de seguridad. Habla con un experto ahora.',
  };
};

export async function POST(request: NextRequest) {
  let body: { email?: string; scanId?: string; url?: string; score?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { email, scanId, url, score } = body;

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
  }

  // Persist lead to DB
  await prisma.lead.create({
    data: {
      email,
      scanId: scanId ?? null,
      url: url ?? null,
      score: score ?? null,
    },
  });

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return NextResponse.json({ success: true });

  // Add contact to Brevo list (best-effort)
  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        attributes: {
          SITE_URL: url ?? '',
          SCORE: score ?? 0,
          SCAN_ID: scanId ?? '',
          SOURCE: 'lcs-web-scanner',
        },
        listIds: process.env.BREVO_LIST_IDS ? JSON.parse(process.env.BREVO_LIST_IDS) : [2],
        updateEnabled: true,
      }),
    });
    if (!res.ok) console.error('Brevo contacts error:', res.status, await res.text());
  } catch (err) {
    console.error('Brevo contacts error:', err);
  }

  // Send results email with PDF attachment (best-effort)
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://legalcompliance.tde.com.co';
    const resultUrl = `${baseUrl}/results?id=${scanId}`;
    const cfg = scoreConfig(score ?? 0);
    const waMessage = encodeURIComponent(
      `Hola, escaneé el sitio ${url} con el Scanner de TDE y mi nivel de riesgo es ${cfg.level}. Me gustaría agendar una consultoría gratuita.`
    );
    const waUrl = `https://wa.me/573143992911?text=${waMessage}`;

    // Generate PDF attachment from scan data
    let attachment: { name: string; content: string }[] = [];
    if (scanId) {
      try {
        const scan = await prisma.scan.findUnique({ where: { id: scanId } });
        if (scan) {
          const pdfRes = await fetch(`${baseUrl}/api/pdf`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ ...scan, checks: scan.checks, summary: scan.summary, lang: 'es' }),
          });
          const pdfHtml = await pdfRes.text();
          const pdfBuffer = await generatePdfBuffer(pdfHtml);
          attachment = [{
            name: `reporte-tde-${(url ?? 'sitio').replace(/https?:\/\//, '').replace(/[^a-z0-9]/gi, '-')}.pdf`,
            content: pdfBuffer.toString('base64'),
          }];
        }
      } catch (pdfErr) {
        console.error('PDF generation error (continuing without attachment):', pdfErr);
      }
    }

    const emailPayload = {
      sender: { name: 'TDE Transformación Digital', email: 'info@tde.com.co' },
      to: [{ email }],
      subject: `Tu reporte de seguridad para ${url}`,
      htmlContent: buildEmailHtml({ url: url ?? '', score: score ?? 0, cfg, resultUrl, waUrl }),
      ...(attachment.length > 0 && { attachment }),
    };

    const emailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'api-key': apiKey },
      body: JSON.stringify(emailPayload),
    });

    if (!emailRes.ok) console.error('Brevo email error:', emailRes.status, await emailRes.text());
  } catch (err) {
    console.error('Brevo email send error:', err);
  }

  return NextResponse.json({ success: true });
}

function buildEmailHtml(p: {
  url: string;
  score: number;
  cfg: ReturnType<typeof scoreConfig>;
  resultUrl: string;
  waUrl: string;
}) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f8fa;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fa;padding:40px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">

        <!-- Header -->
        <tr><td style="background:linear-gradient(120deg,#1e2a52 0%,#1e2a52 38%,#2d7d9a 50%,#1e2a52 62%,#1e2a52 100%);padding:32px 40px;text-align:center">
          <p style="color:#ffffff;font-size:22px;font-weight:bold;margin:0">Reporte de Seguridad Digital</p>
          <p style="color:rgba(255,255,255,0.75);font-size:14px;margin:8px 0 0">TDE Transformación Digital Empresarial</p>
        </td></tr>

        <!-- Score box -->
        <tr><td style="padding:40px 40px 24px;text-align:center">
          <p style="color:#6b7280;font-size:14px;margin:0 0 8px">Sitio analizado</p>
          <p style="color:#1f2d3d;font-size:16px;font-weight:bold;margin:0 0 32px;word-break:break-all">${p.url}</p>
          <div style="display:inline-block;background:${p.cfg.boxBg};border:2px solid ${p.cfg.boxBorder};border-radius:20px;padding:24px 40px">
            <p style="color:${p.cfg.color};font-size:56px;font-weight:bold;margin:0;line-height:1">${p.score}</p>
            <p style="color:${p.cfg.boxTextColor};font-size:14px;font-weight:600;margin:8px 0 0">${p.cfg.level}</p>
          </div>
        </td></tr>

        <!-- Status message -->
        <tr><td style="padding:0 40px 32px">
          <div style="background:${p.cfg.boxBg};border-left:4px solid ${p.cfg.color};border-radius:12px;padding:20px 24px">
            <p style="color:#1f2d3d;font-size:16px;font-weight:bold;margin:0 0 8px">${p.cfg.title}</p>
            <p style="color:#4b5563;font-size:14px;line-height:1.6;margin:0">${p.cfg.desc}</p>
          </div>
        </td></tr>

        <!-- CTAs -->
        <tr><td style="padding:0 40px 40px;text-align:center">
          <a href="${p.resultUrl}" style="display:inline-block;background:#1e2a52;color:#ffffff;font-size:15px;font-weight:bold;padding:14px 32px;border-radius:50px;text-decoration:none;margin-bottom:12px">Ver reporte completo</a>
          <br>
          <a href="${p.waUrl}" style="display:inline-block;background:#25d366;color:#ffffff;font-size:15px;font-weight:bold;padding:14px 32px;border-radius:50px;text-decoration:none">Hablar con un experto por WhatsApp</a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f3f4f6;padding:24px 40px;text-align:center;border-top:1px solid #e5e7eb">
          <p style="color:#9ca3af;font-size:12px;margin:0">© ${new Date().getFullYear()} TDE Transformación Digital Empresarial · Bogotá, Colombia</p>
          <p style="color:#9ca3af;font-size:11px;margin:6px 0 0">+57 314 399 2911 · info@tde.com.co</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
