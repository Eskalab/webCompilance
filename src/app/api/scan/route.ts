import { NextRequest, NextResponse } from 'next/server';
import { runScan } from '@/lib/scanner/scanner';
import { prisma } from '@/lib/db';

// const MAX_SCANS_PER_HOUR = 5;

export async function POST(request: NextRequest) {
  // const ip = request.headers.get('x-forwarded-for') ?? 'unknown';

  // Rate limiting via DB (disabled for testing)
  // const oneHourAgo = new Date(Date.now() - 3600000);
  // const recentCount = await prisma.rateLimit.count({
  //   where: { ip, requestedAt: { gte: oneHourAgo } },
  // });

  // if (recentCount >= MAX_SCANS_PER_HOUR) {
  //   return NextResponse.json(
  //     { error: 'Rate limit exceeded. Maximum 5 scans per hour.' },
  //     { status: 429 },
  //   );
  // }

  let body: { url?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { url } = body;
  if (!url) {
    return NextResponse.json({ error: 'URL is required.' }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: 'Invalid URL format.' }, { status: 400 });
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    return NextResponse.json({ error: 'Only HTTP and HTTPS URLs are supported.' }, { status: 400 });
  }

  // Record rate limit (disabled for testing)
  // await prisma.rateLimit.create({ data: { ip } });

  try {
    await fetch(parsed.href, { method: 'HEAD', signal: AbortSignal.timeout(6000) });
  } catch {
    return NextResponse.json(
      { error: 'El sitio no existe o no es accesible. Verifica la URL e intenta de nuevo.' },
      { status: 422 },
    );
  }

  try {
    const result = await runScan(parsed.href);
    return NextResponse.json(result);
  } catch (err) {
    console.error('Scan error:', err);
    return NextResponse.json(
      { error: 'Failed to scan the site. Please try again.' },
      { status: 500 },
    );
  }
}
