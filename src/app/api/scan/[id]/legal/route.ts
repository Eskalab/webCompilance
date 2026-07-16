import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Endpoint interno: devuelve el análisis legal detallado de un scan.
// Protegido con x-admin-key; sin key válida responde 404 para no revelar su existencia.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey || request.headers.get('x-admin-key') !== adminKey) {
    return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  }

  const { id } = await params;
  const scan = await prisma.scan.findUnique({
    where: { id },
    select: { id: true, url: true, scannedAt: true, legalAnalysis: true },
  });

  if (!scan) {
    return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  }

  return NextResponse.json({
    id: scan.id,
    url: scan.url,
    scannedAt: scan.scannedAt.toISOString(),
    legalAnalysis: scan.legalAnalysis,
  });
}
