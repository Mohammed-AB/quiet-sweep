<p align="center"><img src="docs/mark.svg" width="68" alt="Quiet Sweep" /></p>
<h1 align="center">Quiet Sweep</h1>
<p align="center">A little less history. A little more space.</p>
<p align="center"><strong>Messenger cleanup skills · Local demo · Precise boundaries</strong></p>

![Cleanup studio preview](docs/studio.png)

Quiet Sweep packages an agent-assisted Messenger cleanup workflow into a portable skill and a polished, interactive product prototype. Preview a date range, watch two disjoint cleanup lanes, pause and resume, and explore per-chat or message-credit purchases.

**The dashboard is a simulation. It never connects to Facebook, takes payments, or deletes real messages.** All demo conversations are fictional. The included skill guides a browser-capable agent through real cleanup; the CUA reference adapter requires host integration and fresh UI validation.

## Try it

Requires Node.js 20+. No npm dependencies or install step.

```sh
npm start
# Open http://127.0.0.1:4173
npm test
```

Click **Play demo** for a complete synthetic run. Or choose a chat and dates, preview the range, then start. Open **Plans & credits** to test both simulated purchase options. Reload or reset to restore the sample inbox.

The static app can also be hosted on GitHub Pages; see [publishing](docs/PUBLISHING.md).

## What is included

| Component | Status |
| --- | --- |
| Responsive cleanup studio | Working synthetic demo |
| Date preview, parallel lanes, pause/resume, reports | Working synthetic demo |
| Per-chat allowance and credit purchase UI | Simulated; no payment collection |
| Codex and Claude skill | Installable instructions; needs browser tools |
| CUA batch adapter | Experimental integration reference |
| Billing backend, extension, Facebook API | Not included |

## Install the skill

Copy `skills/messenger-cleanup` into your agent's skill directory:

```sh
# Codex, project scope (run from this repository)
mkdir -p .agents/skills
cp -R skills/messenger-cleanup .agents/skills/

# Claude Code, project scope
mkdir -p .claude/skills
cp -R skills/messenger-cleanup .claude/skills/
```

Invoke `$messenger-cleanup` in Codex or `/messenger-cleanup` in Claude Code. For GPT interfaces without a skill loader, use the instructions as context only; live execution still requires suitable browser tools. [Setup details](docs/QUICKSTART.md).

## The workflow

1. Identify the exact chat and inclusive boundaries.
2. Preview scope and obtain required authorization.
3. Select **Unsend for you** or **Remove for you** from the actual dialog.
4. Verify the removal before recording progress.
5. Recover from stale controls without losing the target.
6. Verify the final boundary and preserved history.

Two lanes own disjoint ranges; never let two workers race over the same message. Earlier messages and the other person's copy remain outside the operation. No blanket whole-chat deletion and no unsend-for-everyone shortcut.

## A paid product concept

Two illustrative options are included: **$4 per chat, up to 500 removals**, or **$9 for 2,000 message credits**. These are unvalidated example prices, not a live offer. Only confirmed synthetic removals spend demo credits. The interface includes no card fields.

[Cost model and recommended launch prices](docs/PRICING.md) provide the researched pricing proposal. The demo still displays the original illustrative prices.

[Production roadmap](docs/PRODUCT.md) explains entitlements, payment verification, job caps, refunds, and platform review. Client-side credits are not a secure billing system.

## Privacy

No analytics, external fonts, account login, private chat exports, or message uploads. Demo state exists in memory and resets on reload. A downloaded report contains synthetic job metadata. The source package excludes the original private conversation and its screenshots.

## Development

`src/engine.js` contains range planning, disjoint partitioning, and an idempotent in-memory ledger with reservations. `src/app.js` drives the demo adapter. `skills/messenger-cleanup` contains portable instructions and the CUA reference. Run `npm test` and `npm run check` before changes. The included CI template runs both on Node 20 and 22 when enabled.

English Messenger labels in the reference adapter are examples from observed UI, not a permanent API contract. Other languages and future layouts require fresh inspection. The new adapter was not live-tested on a real account in this release. No affiliation with Meta, OpenAI, or Anthropic.

MIT licensed. [Demo walkthrough](docs/DEMO.md) · [Publishing](docs/PUBLISHING.md) · [Contributing](CONTRIBUTING.md)
