# Martenweave Quickstart

Start with one local CSV, XLSX, XML, or JSON file. The installed CLI creates a local workspace,
profiles the file, records deterministic readiness findings and evidence, writes a readable report,
and gives you a local Workbench URL. No Git checkout, Node.js, or AI provider key is required.

## Prerequisites

- Python 3.11+
- `pip`

## First value from PyPI

```bash
python -m pip install martenweave-core
martenweave start ./customers.xlsx
```

On PowerShell:

```powershell
py -3.11 -m pip install martenweave-core
martenweave start .\customers.xlsx
```

`start` supports local `.csv`, `.xlsx`, `.xml`, and `.json` files. It creates
`./customers-martenweave-workspace` by default and reports the local Workbench URL. Use
`--no-open --json` for automation or `--out ./my-workspace` to choose the workspace location.

## What the first command does

The workspace contains a format preflight, dataset profile, deterministic readiness findings,
finding evidence, a readable report, and a manifest of generated outputs and decisions. The default
flow is fully useful without AI. It does not silently change canonical model files: any inferred
model or AI-assisted next step remains a reviewable proposal.

Findings can include unmapped columns, ownership gaps, and transformation risks. Invalid values are
reported when a governed value list is available; otherwise the manifest records that the rule was
not assessed. Unsupported file formats fail before creating a workspace and list the supported
formats.

## Inspect the local Workbench

The command prints a local URL after it completes. To reopen the workspace later:

```bash
martenweave workbench --repo ./customers-martenweave-workspace
```

Use the connected path: select file → preflight → profile → readiness findings → finding evidence
→ report → optional proposal. The Workbench uses the local API and does not store canonical truth
independently of the workspace files.

## Explore source examples (optional)

The checked-in Customer / Business Partner example is useful for contributors and deeper CLI
exploration. Clone the source only when you need those source examples or development dependencies.

```bash
git clone https://github.com/metalhatscats/martenweave-core.git
cd martenweave-core
python -m venv .venv
.venv/bin/python -m pip install -e ".[dev]"
```

## Validate and Index an Example

```bash
.venv/bin/martenweave validate --repo examples/customer_bp_model
.venv/bin/martenweave build-index --repo examples/customer_bp_model --jsonl
.venv/bin/martenweave index-fresh --repo examples/customer_bp_model
```

The generated SQLite and JSONL files are rebuildable. Canonical Markdown/YAML files remain the source of truth.

## Start from an Existing Mapping Workbook

For a new pilot, create a separate empty local repository from a source-to-target `.xlsx` workbook.
Martenweave profiles the workbook and writes a deterministic draft proposal, a bootstrap report, a
structural workbook manifest, and governed workbook suggestion artifacts with a protected review
workbook; it does not apply inferred model objects.

```bash
.venv/bin/martenweave bootstrap-assessment \
  --mapping ./sap-customer-mapping.xlsx \
  --name "SAP Customer Pilot" \
  --out-repo ./sap-customer-pilot

.venv/bin/martenweave validate --repo ./sap-customer-pilot
```

Review the generated `PatchProposal` before creating any canonical model object. An unsupported
workbook leaves a safe diagnostic report and no proposal.

## Turn Local Evidence into a Review Proposal

Use a Markdown review note or CSV/XLSX validation report to create a source-hashed proposal for
human review. The command writes the proposal to the explicit path you choose; it does not alter
the active repository’s canonical model files.

```bash
.venv/bin/martenweave evidence ingest \
  --repo examples/customer_bp_model \
  --from ./validation-report.csv \
  --out /tmp/evidence-proposal.md

.venv/bin/martenweave proposal validate \
  --repo examples/customer_bp_model \
  --proposal /tmp/evidence-proposal.md
```

## Search, Trace, and Impact

```bash
.venv/bin/martenweave search "Customer Group" --repo examples/customer_bp_model
.venv/bin/martenweave query --type Attribute --repo examples/customer_bp_model
.venv/bin/martenweave trace ATTR-CUST-SALES-CUSTOMER-GROUP --repo examples/customer_bp_model
.venv/bin/martenweave impact FEP-S4-KNVV-KDGRP --repo examples/customer_bp_model
```

## Health, Scorecard, and Gaps

```bash
.venv/bin/martenweave health --repo examples/customer_bp_model
.venv/bin/martenweave scorecard --repo examples/customer_bp_model
.venv/bin/martenweave gap-report --repo examples/customer_bp_model
.venv/bin/martenweave gaps \
  examples/customer_bp_model/data/samples/customer_sales_area_sample.csv \
  --repo examples/customer_bp_model \
  --check-model
```

## Proposal-First AI Flow

```bash
cat >/tmp/martenweave-note.md <<'NOTE'
Update CUSTOMER GROUP mapping for KNVV-KDGRP based on the CH01-A17 decision.
Keep the change as a reviewable PatchProposal.
NOTE

.venv/bin/martenweave propose-patch \
  --from /tmp/martenweave-note.md \
  --repo examples/customer_bp_model \
  --dry-run
```

The default adapter is deterministic and makes no external AI call. Provider-backed AI is optional, and AI output must remain reviewable.

## Use Mapping-Workbook Evidence in the Agent Loop

When a consultant already has a source-to-target workbook, the agent loop can use its preflighted
structure to draft a narrowly scoped proposal. It passes detected sheet names, columns, warnings,
exclusions, and assumptions into the proposer. Workbook values remain evidence only: the loop does
not make them canonical truth, apply changes, or approve a proposal.

```bash
.venv/bin/martenweave agent-loop \
  --repo examples/customer_bp_model \
  --mapping ./sap-customer-mapping.xlsx \
  --goal "Clarify the Customer Group mapping; keep the change reviewable." \
  --dry-run
```

Review the resulting `PatchProposal` in the local Workbench or with `martenweave proposal review`
before creating or approving a ChangeRequest.

## One-Command Verification

```bash
bash scripts/release_smoke.sh
```

This runs validation, indexing, health, scorecards, search, query, trace, impact, gaps, gap report, and dry-run proposal checks across bundled examples.
