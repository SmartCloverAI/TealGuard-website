import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const resolveHostId = () =>
  process.env.EE_HOST_ID ??
  process.env.R1EN_HOST_ID ??
  process.env.RATIO1_HOST_ID ??
  process.env.NEXT_PUBLIC_EE_HOST_ID ??
  process.env.NEXT_PUBLIC_R1EN_HOST_ID ??
  process.env.NEXT_PUBLIC_RATIO1_HOST_ID ??
  'unknown';

export function GET() {
  return NextResponse.json(
    { hostId: resolveHostId() },
    { headers: { 'Cache-Control': 'no-store, max-age=0' } }
  );
}
