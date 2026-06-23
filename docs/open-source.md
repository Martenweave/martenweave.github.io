# Open Source and Contribution Path

Martenweave is early open-source infrastructure for governed data model work. The most useful contributions are concrete, reproducible, and grounded in real model-registry workflows.

## License Reality

The current core package is MIT-licensed. MIT allows commercial use, copying, modification, distribution, sublicensing, and sale when the license notice is preserved.

Paid pilot, support, template, or future workspace conversations are optional services or future products. They are not a claim that the current MIT core requires a paid commercial license.

## Where to Contribute

- Core/product issues: https://github.com/metalhatscats/martenweave-core
- Website/docs issues: https://github.com/Martenweave/martenweave.github.io

## Useful Contributions

- reproducible CLI bugs
- failing validation cases with synthetic canonical files
- example-model improvements
- domain-pack scenarios for migration, MDM, governance, data quality, or AMS teams
- documentation corrections for commands that exist today
- tests that protect canonical/generated boundaries
- issue drafts with goal, scope, acceptance criteria, and validation command

## Contribution Guardrails

Do not contribute:

- real client data
- credentials, `.env` files, private keys, or tokens
- generated indexes unless maintainers explicitly request them
- claims about customers, SAP certification, or SAP partnership
- UI/platform rewrites that bypass the backend-first product boundary
- AI flows that mutate canonical files without PatchProposal and human approval

## Development Checks

```bash
.venv/bin/python -m ruff check .
.venv/bin/python -m ruff format --check .
.venv/bin/python -m pytest
bash scripts/release_smoke.sh
```

## Issue Format

Good issues include:

- Goal
- Scope
- Acceptance criteria
- Validation command
- Reproduction steps for bugs
- Out-of-scope notes when the boundary matters

This structure keeps the project useful for maintainers and AI coding agents without turning the repository into a vague backlog.
