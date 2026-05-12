import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

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

  // Send to Brevo (best-effort)
  const apiKey = process.env.BREVO_API_KEY;
  if (apiKey) {
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
          listIds: process.env.BREVO_LIST_IDS
            ? JSON.parse(process.env.BREVO_LIST_IDS)
            : [2],
          updateEnabled: true,
        }),
      });

      if (!res.ok) {
        const errBody = await res.text();
        console.error('Brevo API error:', res.status, errBody);
      }
    } catch (err) {
      console.error('Brevo send error:', err);
    }
  }

  return NextResponse.json({ success: true });
}
