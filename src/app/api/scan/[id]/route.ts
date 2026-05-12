import { NextRequest, NextResponse } from 'next/server';
import { getScanById } from '@/lib/scanner/scanner';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const scan = await getScanById(id);
  if (!scan) {
    return NextResponse.json({ error: 'Scan not found.' }, { status: 404 });
  }

  return NextResponse.json(scan);
}
