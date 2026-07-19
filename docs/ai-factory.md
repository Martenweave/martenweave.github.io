# Development AI Factory

The Martenweave Core repository contains a **repository-native Development AI
Factory**: the conventions, definitions, and a small harness that let AI coding
agents (for example Kimi) safely analyze, improve, test, document, and prepare
the product with minimal maintainer involvement.

Everything on this page describes what exists today in the Core repository at
[`docs/factory/`](https://github.com/metalhatscats/martenweave-core/tree/main/docs/factory)
and the `./factory` script at the repository root. It is not a separate platform,
a hosted service, or a roadmap item.

## What the factory is

- **Versioned documentation** (`docs/factory/`) — the durable context every agent
  loads: the product north star, policies, specialist agent definitions,
  workflows, and project memory (known limitations, rejected ideas, lessons
  learned, exact validation commands).
- **Reusable skills** (`skills/`) — 23 procedure cards covering audit, gap
  detection, issue triage, planning, patching, review, test/CI repair, synthetic
  pilot validation, AI evaluation, domain packs, documentation sync, website
  claim verification, and release preparation. All are structurally validated by
  `scripts/validate_skills.py`.
- **A GitHub issue backlog** — the durable work queue. Every task carries a Goal,
  Scope, Acceptance criteria, and a Validation command, and is labeled
  `agent-ready`.
- **One harness** — `./factory`, a standard-library-only Python script that runs
  audits, ranks the backlog, prints execution briefs, checks diffs, and executes
  deterministic gates. It orchestrates existing commands (pytest, ruff, the
  `martenweave` CLI, demo scripts, npm, `gh`); it implements no product logic.
- **Existing product machinery** — PatchProposal/ChangeRequest approvals,
  readiness gates, and CI. The factory uses these; it does not replace them.

## How to use it

Prerequisites: a Core checkout with the development environment installed
(`python3.11 -m venv .venv && .venv/bin/python -m pip install -e '.[dev]'`), plus
`jq` for the Northstar demo and Node/npm for Workbench gates. Run from the
repository root.

```bash
./factory audit           # inspect repos, docs, backlog → findings (L0, read-only)
./factory plan            # rank open agent-ready issues → recommended next task
./factory run-next        # execution brief for the top task (agent, skills, gates)
./factory review          # diff hygiene + critical-review checklist for current work
./factory validate        # deterministic gates G3–G10 (tests, lint, build, contracts,
                          # examples, Northstar regression, Workbench, docs)
./factory release-check   # G11 release evidence (read-only; never tags or publishes)
```

Every command also supports `--json` for machine consumption.

An agent session follows the loop documented in
[`docs/factory/WORKFLOWS.md`](https://github.com/metalhatscats/martenweave-core/blob/main/docs/factory/WORKFLOWS.md):
inspect → compare with the north star → verified gaps → issues → smallest
valuable task → patch → gates → critical review → docs sync → merge or request
approval → continue.

## Autonomy levels

Defined in
[`docs/factory/policies/AUTONOMY_LEVELS.md`](https://github.com/metalhatscats/martenweave-core/blob/main/docs/factory/policies/AUTONOMY_LEVELS.md):

- **L0 — Inspect**: always allowed.
- **L1 — Polish**: docs/test polish; ships after all gates pass.
- **L2 — Fix**: bug fixes with regression tests, doc synchronization; ships after
  gates and critical review.
- **L3 — Guarded**: new features, schema changes, security boundaries, licensing,
  destructive migrations, CI workflow changes, releases, canonical model data,
  public capability claims. The agent prepares a branch and evidence, then stops
  for explicit maintainer approval.

Hard prohibitions (P1–P10 in
[`AGENT_PREVENTIONS.md`](https://github.com/metalhatscats/martenweave-core/blob/main/docs/factory/policies/AGENT_PREVENTIONS.md)):
never weaken tests, duplicate existing functionality, invent capabilities,
change the north star, build chatbots/workflow engines/SaaS, modify canonical
model data without review, or publish releases automatically.

## Quality gates

Eleven gates (G1–G11) are defined in
[`QUALITY_GATES.md`](https://github.com/metalhatscats/martenweave-core/blob/main/docs/factory/policies/QUALITY_GATES.md):
product scope, architecture consistency, security/privacy, schema compatibility,
unit and integration tests, Ruff and package build, API and MCP contract tests,
the Northstar synthetic pilot regression (`bash scripts/demo_northstar_pilot.sh`),
Workbench build and smoke tests, documentation/website consistency, and release
readiness. `./factory validate` runs the full deterministic set; a failing gate
blocks the patch — it never "warns".

## Agents and memory

Seven specialist agent definitions live in
[`docs/factory/agents/`](https://github.com/metalhatscats/martenweave-core/tree/main/docs/factory/agents):
Product & Architecture, Core Development, AI & MCP, SAP/MDM Domain Quality,
Testing & Release, Documentation & Website, and Security & Critical Review.
Shared project memory lives in
[`docs/factory/memory/`](https://github.com/metalhatscats/martenweave-core/tree/main/docs/factory/memory)
and is updated in the same patch as any change to project truth.

## Does it work?

The factory was built and dogfooded on 2026-07-19. Its first live loop runs —
planner priority ranking (#553), CLI documentation drift (#546), planner L3
handling (#554), doctor host-tool checks (#547), and Workbench owner-name
resolution (#548) — each shipped with full gate evidence and are closed in the
[Core issue tracker](https://github.com/metalhatscats/martenweave-core/issues).
At the time of writing the Core suite reports 1823 passed, 3 skipped tests, and
the Northstar pilot regression passes 11/11 steps.

## Support

- **Bug or gap in the factory or product?** Open an issue in the
  [Core repository](https://github.com/metalhatscats/martenweave-core/issues)
  with a Goal, Scope, Acceptance criteria, and Validation command — that is the
  queue the factory itself works from.
- **Factory documentation and policies** live in
  [`docs/factory/`](https://github.com/metalhatscats/martenweave-core/tree/main/docs/factory);
  corrections and improvements follow the same issue path.
- **Sponsorship, design partnerships, and pilots**: see
  [Support Martenweave](/docs/support-martenweave.html).
- **General contribution rules**: see [Open source](/docs/open-source.html).
