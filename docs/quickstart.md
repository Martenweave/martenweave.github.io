# Martenweave Quickstart

This quickstart proves the core workflow from a fresh clone. It uses the bundled Customer / Business Partner example and does not require an AI provider key.

## Prerequisites

- Python 3.11+
- Git
- `jq` for the release smoke script

## Install Locally

```bash
git clone https://github.com/metalhatscats/martenweave-core.git
cd martenweave-core
python -m venv .venv
.venv/bin/python -m pip install martenweave-core
.venv/bin/martenweave --version
```

The clone provides the bundled example repositories used below. Contributors can install from source
with `.venv/bin/python -m pip install -e ".[dev]"`.

## Validate and Index an Example

```bash
.venv/bin/martenweave validate --repo examples/customer_bp_model
.venv/bin/martenweave build-index --repo examples/customer_bp_model --jsonl
.venv/bin/martenweave index-fresh --repo examples/customer_bp_model
```

The generated SQLite and JSONL files are rebuildable. Canonical Markdown/YAML files remain the source of truth.

## Start from an Existing Mapping Workbook

For a new pilot, create a separate empty local repository from a source-to-target `.xlsx` workbook.
Martenweave profiles the workbook and writes a deterministic draft proposal and bootstrap report; it
does not apply inferred model objects.

```bash
.venv/bin/martenweave bootstrap-assessment \
  --mapping ./sap-customer-mapping.xlsx \
  --name "SAP Customer Pilot" \
  --out-repo ./sap-customer-pilot

.venv/bin/martenweave validate --repo ./sap-customer-pilot
```

Review the generated `PatchProposal` before creating any canonical model object. An unsupported
workbook leaves a safe diagnostic report and no proposal.

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

## One-Command Verification

```bash
bash scripts/release_smoke.sh
```

This runs validation, indexing, health, scorecards, search, query, trace, impact, gaps, gap report, and dry-run proposal checks across bundled examples.
