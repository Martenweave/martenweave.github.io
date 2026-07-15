# Martenweave Roadmap

Martenweave is intentionally backend-first. The roadmap favors a useful, trustworthy model layer before a large platform surface.

## Phase 1 — Core Registry

Status: largely present in `martenweave-core 0.5.0`.

- initialize model repositories
- store canonical Markdown + YAML model files
- validate objects and references
- build generated SQLite and JSONL indexes
- search, query, trace, and impact-analyze objects
- export and import model review files

## Phase 2 — Model Intelligence

Status: partially present and expanding.

- dataset profiling
- dataset/model gap detection
- health reports
- governance scorecards
- ownership reports
- audit and usage reports
- source registry and stale-source patterns
- lineage and impact reporting

## Phase 3 — AI-Assisted Workflows

Status: proposal-first workflow exists; provider and agent integrations continue to evolve.

- evidence extraction
- PatchProposal generation
- issue drafts
- GitHub-ready change bundles
- approval gates
- ChangeRequest lifecycle
- AI usage telemetry and evaluation patterns

## Phase 4 — Domain Packs And Starter Scenarios

Status: active examples exist.

- SAP Business Partner / Customer starter pack
- Supplier / Vendor starter pack
- simple product example
- generic product model example
- data governance templates
- AMS knowledge continuity scenarios
- more domain packs without making any one domain define the core

## Phase 5 — Optional Workbench

Status: a focused local Workbench is available as an official Core integration surface. It remains
local-first and is deliberately not a hosted tenant platform.

- connected model search and inspection
- evidence-backed gap and assessment-finding views
- reports, repository activity, and workspace capability states
- impact and lineage exploration
- controlled proposal and review workflows, which continue to expand

The UI should support model truth, not replace it.

## Integrations And Agent Interfaces

Backend extensions may include:

- local API
- MCP server
- Google Drive / Sheets workflows
- GitHub issue and PR publishing
- database metadata imports
- JSON Schema / OpenAPI imports
- OpenLineage-style exports

These should remain bounded integrations. Integrations bring input; Martenweave stores model truth.
