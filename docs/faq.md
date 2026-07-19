# Martenweave FAQ

## What is Martenweave?

Martenweave is an open-source lightweight model registry for migration, MDM, data governance, and AMS teams. It turns scattered model knowledge into canonical files, deterministic validation results, generated indexes, reports, and reviewable change proposals.

## Is this an MDM system?

No. Martenweave is MDM-adjacent infrastructure: a model registry and validation layer. It can support MDM work, but it is not a full enterprise MDM platform or a replacement for tools such as SAP MDG.

## Is this a replacement for Excel?

No. Excel remains useful for working tables, review files, and steward feedback. Martenweave gives teams a validated model registry so spreadsheet knowledge can become structured, traceable, and reviewable.

## Is this only for SAP?

No. SAP migration and master data scenarios are proof domains and starter packs. The core model registry is designed for broader governed data model work.

## Is it certified by SAP or affiliated with SAP?

No. Martenweave is not certified by SAP and is not affiliated with SAP. SAP context appears as a practical migration and MDM scenario.

## Can it import and export?

Yes, with current local-first boundaries. The core supports dataset profiling, CSV/XLSX model review exports, spreadsheet review imports as PatchProposals, JSON Schema export, generated JSONL outputs, and Google Sheets/Drive-oriented commands. See the import/export page for what is available now versus planned.

## Can AI change the model automatically?

No. AI can draft PatchProposal objects, extract evidence from notes, and help explain impact from structured model context. AI does not silently mutate canonical model files.

## Who should use it?

SAP migration teams, MDM teams, data governance teams, AMS/support teams, data architects, data stewards, and consultants working with field mappings, rules, ownership, lineage, and validation evidence.

## What is free/open-source?

The open-source Core is the Python package `martenweave-core`, version `0.6.1`, licensed under Apache License 2.0.

## Can companies use it commercially?

Yes. Apache License 2.0 permits internal, production, consulting, client-project, modification, embedding, and redistribution use, including commercial use, subject to its terms. Organizations may separately engage the Martenweave team for implementation, SAP/MDM domain modelling, validation packs, integrations, assessments, support, training, and design-partner engagements.

## What exists now versus planned?

Available now: CLI package, canonical files, validation, generated indexes, search/query, trace/impact, dataset gap detection, reports, examples, and PatchProposal review flows.

Planned or future-facing: hosted workbench experiences, broader connector packs, richer review UI, and enterprise integration layers.

## Where is the source code?

The core repository is https://github.com/metalhatscats/martenweave-core. The website repository is https://github.com/Martenweave/martenweave.github.io.
