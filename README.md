# Coco Water 40 — PlantBasedMan / Coco Protocol (MVP)

This is a minimal Next.js **App Router** MVP that:

- Locks public branding to **PlantBasedMan — Coco Protocol**
- Serves **Day content** from local JSON through API routes
- Posts **Check-ins** via API routes (stubbed: validate + echo)
- Includes optional **upload scripts** for Firestore and Supabase
- Includes a **brand firewall** that fails builds if forbidden branding appears

Project structure (scaffolded at repo root):
- `src/` for application code and API routes
- `scripts/` for brand firewall and upload utilities

## Quick start (local)

1) Install dependencies

```bash
npm install
```

2) Copy env

```bash
cp .env.example .env.local
```

3) Run

```bash
npm run dev
```

Open:
- http://localhost:3000
- http://localhost:3000/day/1
- http://localhost:3000/checkin

## Branding lock

Public branding is **hard-locked** by Zod schema constraints in:
- `src/config/brand.config.json`
- `src/contracts/brand.contracts.ts`

The build also runs:

```bash
npm run brand:firewall
```

to block forbidden terms.

## Content

Day Objects live at:
- `src/content/coco40_day_objects.json`

For MVP, it ships with Day 1.
Replace it with your full Day 1–40 JSON when ready.

## APIs

- GET ` /api/firestore/day/[dayNumber]`
- POST `/api/firestore/checkins`

- GET ` /api/supabase/day/[dayNumber]`
- POST `/api/supabase/checkins`

(For MVP, both checkin routes validate + echo. Swap to DB persistence when you want.)

## Optional: upload dayObjects into DB

Firestore:
```bash
npm run upload:firestore:dayObjects
```

Supabase:
```bash
npm run upload:supabase:dayObjects
```

## Codex build environment prompt

If you are using Codex inside Cursor/VS Code, paste this prompt:

> You are working in a Next.js App Router repo. Do not introduce MEGHA branding. Keep branding locked to PlantBasedMan — Coco Protocol. Implement the next milestone by editing only files under src/ and scripts/. Run type checks and keep routes contract-first. If you need new fields, update Zod schemas first.

Next milestone suggestions:
- Replace checkin stubs with Firestore persistence
- Add full Day 1–40 JSON and phase-specific UI
- Add symptom triage + coach flags
