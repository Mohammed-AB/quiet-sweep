# Agent setup

## Codex / GPT-powered agents
Copy this folder to `.agents/skills/messenger-cleanup/` in a project, or a supported personal skill directory. Invoke `$messenger-cleanup`. Follow the installed host's browser tool documentation. `agents/openai.yaml` supplies optional UI metadata.

A Custom GPT does not acquire browser automation simply by uploading this file. Its tool environment must independently support authenticated browser interaction. If unavailable, provide a preview/instructions only; do not pretend to run the script.

## Claude Code
Copy this folder to `.claude/skills/messenger-cleanup/` in a project or `~/.claude/skills/messenger-cleanup/` for personal use. Invoke `/messenger-cleanup` or describe the task. Browser/computer tools and authorization must be configured separately. The CUA example is host-specific; translate its workflow to the documented tools actually installed.

## Claude interfaces that support custom skills
Package the `messenger-cleanup/` folder as a zip and import it through the supported skill flow. Skill availability and browser tool availability are separate capabilities.

Sources checked November 2026:
- https://developers.openai.com/plugins/build/skills
- https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- https://code.claude.com/docs/en/skills
