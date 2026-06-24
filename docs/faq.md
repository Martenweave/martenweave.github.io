# Martenweave FAQ

## What is Martenweave?

Martenweave is a backend-first registry for governed data model truth. It turns scattered model knowledge into canonical Markdown/YAML files, deterministic validation results, generated indexes, reports, and reviewable change proposals.

## Who is it for?

It is for SAP migration, master data management, data governance, data quality, and AMS/support teams that need traceable model knowledge instead of disconnected spreadsheets, tickets, reports, and notes.

## Is it SAP-specific?

No. SAP migration and master data scenarios are proof domains and starter packs. The core model registry is designed for broader governed data model work.

## Is it certified by SAP or affiliated with SAP?

No. Martenweave is not certified by SAP and is not affiliated with SAP. SAP context appears as a practical migration and MDM scenario.

## Is it a chatbot?

No. Martenweave is not a chatbot. It stores structured model truth, validates it, indexes it, and supports reviewable AI-assisted change proposals.

## Is it a workflow engine?

No. Martenweave includes approval-aware model change objects, but it is not a general workflow engine or ticketing system.

## What does AI do?

AI can draft PatchProposal objects, extract evidence from notes, and help explain impact from structured model context. AI does not silently mutate canonical model truth.

## What does deterministic validation do?

Validation checks object IDs, object types, required fields, duplicates, broken references, reference type mismatches, ownership/readiness coverage, and domain-specific context rules before indexing or trusted reporting.

## What is open source?

The open-source core is the Python package `martenweave-core`, version `0.4.1`, licensed under MIT.

## Can companies use it commercially?

Yes. The MIT-licensed core allows commercial use when the license notice is preserved. Separate commercial offerings may include implementation support, private SAP/MDM domain packs, enterprise validation packs, hosted workbench work, custom integrations, and support SLAs.

## What is the current version?

The current public core package version is `0.4.1`.

## Where is the source code?

The core repository is https://github.com/metalhatscats/martenweave-core. The website repository is https://github.com/Martenweave/martenweave.github.io.
