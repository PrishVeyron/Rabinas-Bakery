# Rabina's Bakery

A full-stack bakery website for Rabina's Bakery — selling handcrafted cookies and cakes made with natural coconut oil, with online ordering, cart, QR/card payments, and WhatsApp order notifications.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/rabinas-bakery run dev` — run the frontend (port 24455)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, shadcn/ui, framer-motion, wouter
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- QR generation: qrcode npm package

## Where things live

- DB schema: `lib/db/src/schema/` (products.ts, orders.ts)
- API contract: `lib/api-spec/openapi.yaml`
- Generated hooks: `lib/api-client-react/src/generated/`
- Generated Zod schemas: `lib/api-zod/src/generated/`
- API routes: `artifacts/api-server/src/routes/` (products.ts, menu.ts, orders.ts)
- Frontend pages: `artifacts/rabinas-bakery/src/pages/`
- Cart context: `artifacts/rabinas-bakery/src/` (CartContext)

## Architecture decisions

- Cart state is client-only (React context + localStorage) — no server cart endpoint needed
- WhatsApp notification is a URL redirect built into the order confirmation page; the order API also generates a `whatsappUrl` field in the response
- QR code payment is generated client-side using the `qrcode` package with the order total and ID
- Credit card form is display-only (no real payment processing) — for a real integration, add Stripe or similar
- Orders store full item snapshot (name, price) in a JSONB column so they're immutable even if product prices change later
- WhatsApp number: 9864099823 (formatted as +9779864099823 for wa.me links)

## Product

- Home page with hero, featured items, and coconut oil story
- Menu page with Cookies / Cakes / Specials categories and filtering
- Shopping cart with qty controls, customer info form, payment method selection
- Order confirmation with QR code, card payment placeholder, WhatsApp confirmation
- About page with bakery story

## User preferences

- WhatsApp number for order notifications: 9864099823
- Currency: NPR (Nepali Rupees)

## Gotchas

- Always run codegen after changing `lib/api-spec/openapi.yaml`
- The `qrcode` package must stay in `artifacts/rabinas-bakery/package.json` dependencies (not devDependencies) for the build

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
