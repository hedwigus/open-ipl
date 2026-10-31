# Open IPL v1.0

Open IPL helps groups manage membership, recurring dues, payments, and member communications.

## Project structure

- `apps/mobile` — Expo + React Native member app for Android and iOS.
- `apps/portal` — React + Vite group leader portal.
- `apps/api` — Express + TypeScript backend foundation.
- `docs` — agreed product flows and open decisions.

All packages start at version `1.0.0`.

## Run locally

Install dependencies separately in each app:

```bash
cd apps/api && npm install
cd ../portal && npm install
cd ../mobile && npm install
```

From the repository root, run an individual app with:

```bash
npm run dev:api
npm run dev:portal
npm run dev:mobile
```

The API listens on port 4000 by default; the portal uses Vite's default development port. Expo Go or an Android emulator can open the mobile app. Building an iOS native binary requires macOS, but Expo Go can be used for iOS development from other platforms.

Run the API and portal checks from the repository root with `npm test` and `npm run build`. Check the mobile app with `npm --prefix apps/mobile run typecheck` and create an Android bundle with `npm --prefix apps/mobile run export:android`.

## Current scope

This is the v1.0 project foundation: app shells, a responsive portal landing/dashboard, an API health endpoint, and product-flow documentation. Google sign-in, group application persistence/document upload, database, Midtrans transactions/webhooks, subscriptions, payouts, ads, and production security are **not yet implemented**. No real member or payment data is present.

See [`docs/MVP_FLOW.md`](docs/MVP_FLOW.md) before adding the first product workflow.
