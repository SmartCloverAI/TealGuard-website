import packageJson from '../../../../package.json';

export const dynamic = 'force-dynamic';

export function GET() {
  return Response.json(
    {
      service: packageJson.name,
      version: packageJson.version,
      revision: process.env.NEXT_PUBLIC_BUILD_REVISION ?? 'unknown',
      builtAt: process.env.NEXT_PUBLIC_BUILD_TIME ?? 'unknown'
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
