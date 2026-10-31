# MVP flow — Open IPL v1.0

## Roles and surfaces

- **Group leader:** uses the web portal to apply for and manage a group.
- **Member:** uses the Android/iOS app to join groups, view dues, pay, and communicate.
- **Open IPL operations admin:** reviews group applications and manages platform settings (admin console not yet built).

## Group application and workspace

1. The leader creates an account and opens a group application in the portal.
2. They choose a group type and provide the group name, location/address, officer details, and required legal documents.
3. **Proposed pending decision:** Open IPL reviews the application and uploaded documents before activating the workspace.
4. Once activated, the backend provisions a private group workspace, a unique Group ID, and a join link/QR.
5. The leader configures group administrators, recurring dues, and payment settings.

## Member join and approval

1. A member signs in with Google.
2. The member enters a Group ID or scans a join link/QR and submits full name and address.
3. The request remains pending until a group leader approves or rejects it.
4. Approved members can access that group's features. Group data is isolated from other groups.
5. A free group at its configured member cap cannot add/approve another member until its leader subscribes. Existing members retain access.

## Member dues and payment

1. A leader configures recurring dues; Open IPL creates the member's bill for group dues only.
2. The member starts payment in the app.
3. The backend validates the bill, creates an opaque internal `transaction_id`, and maps it to the member, group workspace, bill, and Open IPL ledger.
4. The backend starts a Midtrans Snap transaction using the internal ID as an opaque order reference and the server-calculated amount. Do not send names, addresses, group IDs, or member IDs unless a provider field is strictly required and approved.
5. The app presents the gateway flow (for example GoPay/QRIS).
6. Midtrans HTTP Notifications are verified by the backend and update payment state. App/deeplink redirects are for user experience only, not authoritative payment confirmation.

## Group subscription and ads

- Free eligibility is limited to **Family** and **School/Class** groups.
- The free member limit is configurable from the backend; 30 is the proposed initial value.
- Free groups retain core functionality and may show first-party ads. Personal data is not sent to an ad network for targeting.
- Once the configured cap is reached, the group leader must subscribe before adding another member.
- Open IPL bills the group leader separately. The platform fee is not added to members' dues.
- Paid-tier prices, billing cadence, and feature differences are not yet finalized.

## Communications

- Leaders publish group news/announcements, broadcast notices, and send direct messages.
- Members submit questions, feedback, and complaints.
- **Proposed:** complaints are private to the sender and relevant group leaders, with a status visible to the sender.

## Privacy and payment constraints

- Google is used only for authentication; request the minimum identity claims needed. Do not send Open IPL group, payment, address, or complaint data to Google for advertising or analytics.
- Midtrans processes the transaction. Use opaque references and minimize callback data; verify exact provider fields and data-processing terms before launch.
- Separate Open IPL platform subscription invoices from member dues.
- Verify gateway support for group settlement/payouts before promising automatic group disbursement or fee deduction.

## Decisions still needed

1. Is Open IPL admin approval required before a group workspace activates?
2. Subscription pricing, billing cadence, grace period, and behavior for unpaid invoices.
3. Which gateway account receives member collections, how groups are paid out, and who bears gateway costs.
4. Google Sign-In scopes and consent/configuration for the member app and leader portal.
5. Exact group-member count rule (approved active members, and when it is measured).
6. Whether a separate internal operations console is required for the first release.
