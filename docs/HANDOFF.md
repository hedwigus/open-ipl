# Open IPL handoff

## Project location

`C:\Users\hedwi\StudioProjects\open-ipl-v1`

This is a new sibling project. The earlier `iuran-warga-app` directory was left untouched. Project version is `1.0.0`.

## Current foundation

- `apps/mobile`: Expo/React Native member-app shell.
- `apps/portal`: React/Vite group-leader portal shell.
- `apps/api`: Express/TypeScript API with `GET /api/v1/health`.
- `docs/MVP_FLOW.md`: product flow draft, privacy/payment constraints, and open decisions.

Verified from the project root:

- `npm test` — API and portal tests pass.
- `npm run build` — API and portal builds pass.
- `npm --prefix apps/mobile run typecheck` — passes.
- `npm --prefix apps/mobile run export:android` — Expo Android JavaScript bundle exported; this is not an APK.

Mobile dependency audit reported 8 findings (5 low, 3 high). npm's suggested forced fix would downgrade Expo to v51, so it was not applied.

## Product decisions captured so far

- Group leaders use the web portal; members use the Android/iOS app.
- Free groups are limited to Family and School/Class, with a backend-configurable member cap. A cap of 30 was proposed but the exact default is not locked. At the cap, adding/approving another member requires a subscription.
- Free groups keep core features and may show ads, but Open IPL will not send personal user data to ad networks. First-party ads are the privacy-aligned approach.
- The group leader pays Open IPL's subscription separately; the platform fee is not added to member dues. Subscription tier/pricing details are still undecided.
- Members sign in with Google; do not send group, payment, address, complaint, or ad-targeting data to Google. The sign-in flow is not implemented.
- Payment initiation belongs in the backend. Open IPL creates its own opaque transaction ID and maps it internally to member, group workspace, and bill. The backend initiates Midtrans Snap; verified HTTP Notifications update payment status. App/deeplink redirects are not authoritative.
- Midtrans acceptance is not yet integrated. Group settlement/payout support and exact provider data fields need review.
- Open IPL admin approval before group workspace activation is a proposed flow, not yet confirmed.

## Next implementation step

After confirming whether Open IPL admins must approve group applications, implement one vertical slice: group leader application → backend validation/persistence → pending-review status in the portal. Choose the database and document retention/access rules before storing group legal documents. Keep Google sign-in and Midtrans credentials server-side when those integrations are added.
