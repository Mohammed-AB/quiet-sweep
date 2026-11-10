# Publish on GitHub

The package is ready for a new repository. It contains no personal chat data. Authenticate your own GitHub CLI, choose a repository owner/name, and run from this directory:

```sh
git init -b main
git add .
git commit -m "Introduce Quiet Sweep skills and interactive demo"
gh repo create quiet-sweep --public --source=. --remote=origin --push
```

Do not run repository creation if that name already belongs to another project. Pick the intended owner and visibility explicitly.

## GitHub Pages
In repository Settings → Pages, choose “Deploy from a branch”, branch `main`, folder `/ (root)`. The app is static and uses relative asset links; no build step or API keys are required. This publishes only the synthetic demo. CI is test-only and never deploys or processes payments.

## Release assets
Attach `messenger-cleanup.zip` for skill import and a source archive. Use release title `Quiet Sweep 0.1 — interactive preview`. Describe live browser support as agent-assisted/experimental, not a ready-to-buy hosted service.

Suggested repository description:
> Local-first Messenger cleanup skills for Codex and Claude, with an interactive demo, precise ranges, and a message-credit product prototype.

Suggested topics: `agent-skills`, `claude-code`, `codex`, `messenger`, `privacy`, `browser-automation`, `demo`.

## Enable continuous integration
The initial upload includes `.github/test-workflow.yml.example` as an inactive template because the publishing credential lacks workflow scope. To enable it, use a workflow-authorized credential or GitHub’s editor to place it at `.github/workflows/test.yml`. It runs tests on Node 20 and 22 and does not deploy.
