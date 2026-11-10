# From prototype to paid service

## Offer
- Per-chat cleanup: a job-scoped entitlement for one selected chat and agreed message range, capped at a visible number of confirmed removals.
- Message bundle: a global balance usable across chats; one verified removal consumes one credit.
- Before checkout: show the selected account/chat, range, count confidence, scope, cap, total, and unused-credit treatment. Do not bill an estimate as an actual count.

The prototype uses $4/500 and $9/2,000 to demonstrate the interaction. These prices have not been validated against demand, browser execution costs, support costs, or taxes.

## Release gates
1. Validate the agent/browser integration on deliberately disposable test messages in a consenting test account. Test English and supported localized dialogs separately, including attachments and placeholders.
2. Choose a supported local browser integration. Keep authenticated message access on the user's device; do not ask customers to upload passwords or session cookies.
3. Review current Meta terms and allowed automation before distribution. Do not market the product as approved or guaranteed to work indefinitely.
4. Add an authenticated backend with payment-provider checkout and verified webhooks. Treat client balances as presentation only.
5. Implement a server-authoritative ledger: grant, reserve, commit, release, refund. Use idempotency keys per purchase and pseudonymous message/job receipt. Reserve before mutation to prevent concurrent overrun.
6. Resolve outcomes that cannot be verified. A message may be removed even if the browser disconnects before receipt. Hold for reconciliation; never charge twice or blindly repeat.
7. Bind per-chat purchases to a specific job/range, cap, and expiry policy disclosed before purchase. Document pause/resume, failure, refund, support, and unused-credit behavior.
8. Build persistent checkpoints, accessibility tests, recovery tests, billing reconciliation, and an integration health check before admitting paid jobs.

## Architecture
`Local browser runner → metadata-only job coordinator → entitlement ledger`
`Hosted checkout → verified webhook → credit grant`

Raw message bodies stay local. Minimize metadata retention and make deletion/export controls explicit. Payment credentials belong to the payment provider. Browser confirmation is not cryptographic proof; the receipt and abuse model needs independent design before selling per-message credits.

## Demo limitations
The demo stores balances in memory, grants sample entitlements without payment, and simulates removal latency. Its per-chat allowance is chat-scoped rather than production job-scoped. It deliberately has no real login, checkout, billing server, extension, or live Facebook transport.
