# TealGuard

Public project and evidence website for TealGuard, a funded research, engineering,
clinical-validation, and production-readiness programme in gynecologic oncology.

## Local development

```bash
npm ci
npm run dev
```

## Production

```bash
npm run build
PORT=3000 npm run start
```

The application binds to `0.0.0.0` and exposes `/api/healthz` for the Ratio1
Worker App Runner health check. `https://tealguard.eu` is the canonical public
host; configured aliases redirect to it.

The footer resolves the current runner through `/api/host-id`. Runtime identity
uses `EE_HOST_ID`, `R1EN_HOST_ID`, or `RATIO1_HOST_ID`, with their
`NEXT_PUBLIC_*` counterparts as fallbacks.

## Verification

```bash
npm run check
npm run test:e2e
```
