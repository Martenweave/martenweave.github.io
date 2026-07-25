# Release Proof

Martenweave Core `v0.7.0` is the current supported public source and PyPI release.

- GitHub Release: `v0.7.0`
- PyPI package: `martenweave-core 0.7.0`
- Core repository: https://github.com/metalhatscats/martenweave-core
- PyPI project: https://pypi.org/project/martenweave-core/

The core remains backend-first: a Python package, CLI, local API, MCP-ready backend, canonical
Markdown/YAML files, validation, generated indexes, and reviewable PatchProposal workflows. There
is no hosted UI in the core release.

Martenweave Core is open-source software licensed under Apache License 2.0. It may be used,
modified, embedded, and distributed, including for internal and commercial purposes, subject to
the license terms. Optional commercial services include implementation, private SAP/MDM domain
packs, enterprise validation packs, integrations, training, hosted Workbench work, and support.

## Change log

### 0.7.0 — 2026-07-25

- `martenweave schema inspect|import` turns local machine-readable contracts (JSON Schema,
  OpenAPI, OData EDMX, WSDL, XSD, IDoc/WE60 documentation, CDS metadata, Integration Suite
  exports, Migration Cockpit templates, field catalogues) into normalized evidence and reviewable
  proposals that can create Interface, InterfaceEndpoint, MessageType, and SchemaNode lineage with
  recorded source provenance. Nothing is applied without human approval.
- `martenweave domain-pack build|validate|diff` manages built-in reference domain packs locally.
- Pilot preflight, bootstrap, and migration assessment now emit governed workbook suggestion
  artifacts with a protected review workbook roundtrip.
- The `agent-loop` command can accept a mapping workbook as preflighted, metadata-only evidence;
  the loop remains proposal-first and never applies or approves model changes.
- The Workbench labels interface-lineage object types distinctly in object and lineage views.

### 0.6.2 — 2026-07-24

- Workbench imports now inspect CSV/XLSX evidence before profiling or proposal preview, showing
  sheet/column interpretation and safety warnings without treating evidence as canonical truth.
- The reusable SAP migration/MDM scenario matrix and deterministic workbook evidence tests were
  added to Core.

These screenshots were refreshed from the local static site during the compact landing-page redesign.

The site was served locally and checked in the in-app Browser at desktop, tablet, and mobile widths.
The screenshots below were captured after `npm run build` and the static site validator passed.

## Homepage Desktop

![Homepage desktop screenshot](/assets/screenshots/homepage-desktop.png)

## Homepage Mobile

![Homepage mobile screenshot](/assets/screenshots/homepage-mobile.png)

## Docs Index

![Docs index desktop screenshot](/assets/screenshots/docs-index-desktop.png)

## Quickstart Docs Page

![Quickstart docs desktop screenshot](/assets/screenshots/docs-quickstart-desktop.png)
