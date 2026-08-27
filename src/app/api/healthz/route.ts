import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json(
    { status: 'ok', service: 'tealguard-website' },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
