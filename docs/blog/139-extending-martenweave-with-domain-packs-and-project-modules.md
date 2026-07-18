# Extending Martenweave with Project Modules and Domain Packs

<!-- **Reviewed: 18 July 2026** -->

A generic model registry becomes useful only when it can represent the distinctions that make a programme difficult. In SAP migration, a field is rarely just a field: its meaning can depend on sales area, company code, partner function, source-system authority, value conversion, release wave, and local exception.

Martenweave is designed to be extended in code and canonical content, but the extension must stay within its controlled model boundary.

## What exists in Core

Core provides registered canonical object types, Pydantic schema validation, cross-object reference validation, SAP context validation, generated SQLite and JSONL indexes, dataset profiling and gap detection, lineage and impact analysis, exports, and proposal/change-request workflows. The bundled examples provide Business Partner-to-Customer and Supplier-to-Vendor model slices.

The current SAP domain pack validates specific table-to-context expectations for supported field endpoints. This is deliberately deterministic: a rule either has sufficient model evidence or it reports a finding with a reason and suggested fix.

## Useful extension shapes

A project module should add a clearly owned capability rather than a second source of truth. Good examples include:

- a domain pack that adds validated contexts and rules for a supported business area;
- a canonical object convention for a regulated handover or project-specific evidence reference;
- a report that assembles existing model facts for a review meeting;
- a bounded import or export adapter that produces reviewable output;
- a starter model for a consulting team’s repeatable, client-safe delivery scenario.

The first test for an extension is whether it strengthens a real decision: does it clarify meaning, expose a broken reference, detect a dataset/model mismatch, trace a consequence, or make approval more explicit?

## Boundaries that preserve trust

Do not make an extension write directly into canonical files from an external system or an AI agent. External evidence can create a PatchProposal, a report, or a draft. Canonical changes remain subject to the existing validation and human review path.

Do not manually edit generated databases or JSONL files. They are rebuildable projections of canonical files. If a report needs a new relationship, represent it in the model or service layer rather than patching a generated output.

Do not call an unimplemented connector or domain pack available in marketing. State the actual interface, test it against a synthetic or safe model slice, and document what is in scope.

## A practical extension path

Start with a small example repository and a narrow acceptance test. Add the rule or object convention. Validate expected success and failure cases. Rebuild the index. Run the exact report, trace, impact, or export flow that the extension is meant to improve. Then decide whether the module is project-specific or a reusable domain pack.

This sequence is especially valuable for consulting and implementation teams: it turns a recurrent workshop question or handover problem into a tested delivery asset without claiming that every client uses the same model.

## Sources and notes

- [Martenweave architecture](/docs/architecture.html) documents canonical files, validation, and derived indexes.
- [Examples](/docs/examples.html) describes the supported bundled model slices.
- [Contributing scenarios](/docs/contributing-scenarios.html) explains useful contribution boundaries.
- [Partnerships](/docs/partnerships.html) describes co-designed domain packs, starter scenarios, and bounded integrations.
- The [Core repository](https://github.com/metalhatscats/martenweave-core) is the authoritative implementation source.

Project-specific extension and custom development may be commercial services; the Core remains available under Apache License 2.0. See [open source](/docs/open-source.html) and [consulting](/docs/consulting.html).
