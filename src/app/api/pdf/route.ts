import { NextRequest, NextResponse } from 'next/server';
import { ScanResponse } from '@/lib/scanner/types';
import { Locale } from '@/lib/i18n';
import { renderPdfHtml } from '@/lib/render-pdf-html';

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
