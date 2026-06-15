import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED = new Set([
  'CO','MX','BR','AR','PE','CL','EC','BO','PY','UY',
  'VE','PA','CR','GT','HN','SV','NI','DO','CU','PR','ES',
]);

export async function GET(request: NextRequest) {
  const country = request.headers.get('x-vercel-ip-country') ?? 'CO';
  const detected = SUPPORTED.has(country) ? country : 'CO';
  return NextResponse.json({ country: detected });
}
