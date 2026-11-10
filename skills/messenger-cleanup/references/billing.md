# Paid product boundaries

This repository includes a synthetic ledger and simulated purchase flow only. Do not use the client balance as proof of payment or charge real customers with it.

A production implementation needs authenticated accounts, server-side entitlements, payment-provider webhook verification, idempotent grants, reservations before mutation, and an auditable reconciliation process. A cleanup receipt should contain a pseudonymous job/message key, scope, result, and timestamps—not the private message body.

- Message bundle: reserve one credit per candidate; commit once after verified self-only removal. Release reservations for confirmed failures before removal.
- Per-chat cleanup: bind the entitlement to one selected chat and an agreed range/job, with an explicit cap. Do not silently convert it into reusable global credits.
- Ambiguous post-removal outcome: mark pending reconciliation; never blindly retry or double charge. A browser observation alone is not a tamper-proof billing receipt.
- Pause: allow in-flight actions to settle, preserve progress, and release unused reservations.
- Payment succeeds but browser fails: keep the unused entitlement available; provide a documented support/refund process.

The dashboard's per-chat allowance can be reused within that fictional chat and its ledger lives in memory. It illustrates the interaction, not production job-scoped enforcement. Prices are illustrative, unvalidated, and not a live offer. Review platform terms, payment rules, consumer obligations, and operational support before commercialization.
