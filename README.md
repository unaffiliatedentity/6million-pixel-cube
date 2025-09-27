# Million‑Pixel Cube (Next.js Starter)

A working starter to build a modern take on the Million Dollar Homepage using a rotatable 3D cube
with **1,000,000 pixels per face**. Includes 3D cube, 2D face viewer, tile picking, and API stubs.

## Quickstart
```bash
pnpm i   # or npm install / yarn
cp .env.example .env.local
pnpm dev
```
Open http://localhost:3000

## What’s included
- App Router pages: `/` (marketing), `/cube`, `/face/[id]`
- 3D cube via @react-three/fiber + drei
- 2D face viewer (canvas)
- API stubs: `/api/tiles`, `/api/checkout`, `/api/webhooks/stripe`
- Prisma schema (Postgres)

## Wire up Stripe + DB
1. Set `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in `.env.local`.
2. Set `NEXT_PUBLIC_SITE_URL` for redirect URLs.
3. Provide `DATABASE_URL` (Postgres), then:
```bash
pnpm prisma:migrate
```
4. Replace `lib/tilestore` usage with Prisma queries.

## Production checklist
- Cache face textures in object storage + CDN
- Admin moderation UI
- Content policy & Terms
- Analytics (views/clicks)
- Backups & monitoring
