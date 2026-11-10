# Quickstart

## Product demo
Run `npm start` from the repository root, then open `http://127.0.0.1:4173`. Click Play demo. Dates use UTC explicitly. The samples cover October 26–29, 2026. Pick October 27–28 for a partial cleanup that preserves the first and last days.

The demo begins with 80 global credits. Plans & credits lets you simulate adding 2,000 global credits or 500 removals restricted to a chosen fictional chat. No network payment request occurs. State resets on reload; reports can be downloaded before resetting.

## Skill installation
Copy `skills/messenger-cleanup/` to `.agents/skills/` for Codex or `.claude/skills/` for Claude Code, inside the project where you want to use it. For personal installation, use the directory documented by your host. A packaged `messenger-cleanup.zip` can be imported by interfaces that support custom skill uploads.

Example prompt:
> Use messenger-cleanup to inspect my selected Messenger chat. Preview October 27 through October 28, 2026, in the timezone displayed in Messenger. Remove only from my view after the required confirmation. Preserve everything outside the range.

The skill cannot install browser access or grant permissions. A general GPT chat without browser automation can only explain the process. Do not paste a deletion script into an unknown page.

## Reference adapter
`skills/messenger-cleanup/scripts/cua-batch.js` exports `runCuaBatch(tab, config)` for compatible CUA hosts. Supply explicit ISO start/end, a date parser grounded in the current displayed timezone, and a `verifyChat(tab)` callback that checks fresh UI evidence of the intended conversation. Inspect the script and current host documentation before integration. No relative weekday defaults, account identifiers, or pre-authorized range are bundled.

The adapter intentionally stops on duplicate labels, changed dialogs, and uncertain outcomes. A host must reconcile partial batches before resuming. It does not manage billing, persistence, or background scheduling.
