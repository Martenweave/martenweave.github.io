# Northstar Mobility Group — Synthetic Pilot

This is a fully fictional, reproducible SAP S/4HANA transformation scenario in
the public Martenweave Core repository. Northstar Mobility Group, its people,
systems, identifiers, and rows are invented for product evaluation. Every
participant address uses `example.com`; the scenario contains no client or SAP
production data.

Core source: <https://github.com/metalhatscats/martenweave-core/tree/main/examples/northstar_mobility_pilot>

![Northstar Mobility Group synthetic pilot in the connected local Workbench. The screen is driven by the 187 canonical objects in the example repository, not a separate UI dataset.](/assets/screenshots/northstar-mobility-pilot-workbench.png)

*Captured locally from `martenweave workbench --repo examples/northstar_mobility_pilot` after building the index. The Workbench is a local inspection and controlled-review surface; it does not write to SAP or apply changes automatically.*

## What the pilot contains

The model has seven connected domains: Business Partner and Customer, Supplier,
Material, Sales, Procurement, Logistics, and Finance. It connects Northstar CRM,
Voyager ERP, Freightlink TMS, and LedgerPro FI to SAP S/4HANA field endpoints
including `BUT000`, `KNVV`, `LFA1`, `LFB1`, `MARA`, `VBAK`, `EKKO`, `LIPS`,
`BKPF`, and `BSEG`.

Its fictional roles are a migration lead, solution architect, customer and supplier
data stewards, order-to-cash process owner, integration developer, and governance
reviewer. Canonical files include owners, evidence, decisions, issues, value lists,
mappings, validation rules, relationships, a pending high-risk `PatchProposal`,
and an approved `ChangeRequest` that remains reviewable rather than executable by
default.

## Deliberate findings

The model itself remains valid: the verified run has 187 canonical objects, zero
validation errors, and 13 intentional warnings. The synthetic extracts expose
delivery risks through gap and readiness workflows instead of corrupting canonical
truth:

- a sales-order extract has `order_total` rather than the mapped `net_value`;
- material records contain unmapped type codes;
- customer records include duplicate business keys;
- two legacy credit-limit mappings conflict at `KNVV-KLIMK`;
- Logistics intentionally has no owner; and
- the open high-risk proposal blocks readiness until a human review.

The deterministic pilot run reports 61 gaps. The readiness command returns not
ready because `active_object_missing_owner` and
`high_risk_unapproved_proposal` are both active. Shared payment terms trace across
Supplier, Procurement, and Finance (71 affected objects); shared customer credit
limit reaches Customer, Sales, and Finance (55 affected objects). These are
generated findings from the example, not claims about a customer programme.

## Reproduce it locally

Use Python 3.11+ and a clean Core checkout. The script regenerates the deterministic
CSV/XLSX inputs, validates the model, profiles the extracts, detects gaps, produces
reports, traces impact, verifies the no-silent-mutation proposal behavior, and
builds review artifacts.

```bash
python3.11 -m venv .venv
.venv/bin/python -m pip install -e '.[dev]'
bash scripts/demo_northstar_pilot.sh

# Start the same indexed canonical repository in the local Workbench.
.venv/bin/martenweave workbench --repo examples/northstar_mobility_pilot
```

The full command sequence, expected findings, deterministic data generator, and
individual CLI commands are documented in the example [README in Core](https://github.com/metalhatscats/martenweave-core/tree/main/examples/northstar_mobility_pilot).

## Boundaries and next use

This is a demonstration fixture, not a template for automatically changing SAP or
for handling personal data. Dataset profiles, gap reports, indexes, and bundles
are generated artifacts. Markdown/YAML canonical files remain authoritative; AI can
draft a proposal only when configured, deterministic validation runs first, and a
human must review and approve any governed change.

For a real pilot, begin with one bounded business decision, approved-to-share
representative evidence, named accountable reviewers, and an agreed clean-room
data boundary. See the [pilot project guide](/docs/pilot-projects.html) and the
[examples catalogue](/docs/examples.html).
