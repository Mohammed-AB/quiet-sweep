# Contributing

Run `npm test` and `npm run check`. Keep examples synthetic. Add behavioral tests for changes to ranges, scope, identity, reservations, or billing; do not test against a real inbox in CI. Document host-specific UI assumptions. Never add private endpoints, cookie extraction, or “unsend for everyone” fallbacks.

Use `docs/DEMO.md` for manual UI checks: valid/empty/reversed ranges, pause/resume, reset, both simulated purchase flows, and downloadable reports. State explicitly whether a change was tested only in simulation or against a consenting test account.
