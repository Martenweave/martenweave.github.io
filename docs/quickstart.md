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
.venv/bin/python -m pip install -e ".[dev]"
.venv/bin/modelops --version
```

## Validate and Index an Example

```bash
.venv/bin/modelops validate --repo examples/customer_bp_model
.venv/bin/modelops build-index --repo examples/customer_bp_model --jsonl
.venv/bin/modelops index-fresh --repo examples/customer_bp_model
```

The generated SQLite and JSONL files are rebuildable. Canonical Markdown/YAML files remain the source of truth.

## Search, Trace, and Impact

```bash
.venv/bin/modelops search "Customer Group" --repo examples/customer_bp_model
.venv/bin/modelops query --type Attribute --repo examples/customer_bp_model
.venv/bin/modelops trace ATTR-CUST-SALES-CUSTOMER-GROUP --repo examples/customer_bp_model
.venv/bin/modelops impact FEP-S4-KNVV-KDGRP --repo examples/customer_bp_model
```

## Health, Scorecard, and Gaps

```bash
.venv/bin/modelops health --repo examples/customer_bp_model
.venv/bin/modelops scorecard --repo examples/customer_bp_model
.venv/bin/modelops gap-report --repo examples/customer_bp_model
.venv/bin/modelops gaps \
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

.venv/bin/modelops propose-patch \
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
