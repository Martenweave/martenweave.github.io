# Import and Export

Martenweave treats import and export as model review workflows, not hidden synchronization.

The core rule is simple: imports should create evidence, profiles, or PatchProposals. Exports should produce reviewable files, reports, schemas, or context. Canonical model changes still go through validation and approval.

## Available Now

The current core includes commands and services for:

- profiling CSV and XLSX datasets
- detecting dataset-to-model gaps
- importing Google Drive files for profiling
- importing Google Sheets as PatchProposals
- importing spreadsheet edits as PatchProposals
- exporting canonical model objects to CSV or XLSX
- exporting JSON Schema for canonical object types
- exporting canonical model objects to Google Sheets
- generating search and lineage JSONL exports
- generating GitHub-ready change bundles
- publishing issue drafts and pull request bundles through review workflows

The exact command names and options are documented in the core repository and CLI help.

## Supported By Examples Or Manual Workflow

These workflows are practical today, but may still require manual setup, local files, or review steps:

- mapping spreadsheet review
- dataset profiling before mock load
- source-to-target field coverage checks
- export of model objects for steward review
- import of reviewed sheet edits as PatchProposals
- GitHub issue drafts for model gaps
- local automation around generated reports and JSONL files

## Planned Or Integration Direction

These are directionally aligned with the product, but should not be described as fully implemented hosted integrations:

- hosted workbench review queues
- enterprise connector marketplace
- automated bidirectional sync with MDM platforms
- direct SAP customizing extraction packs
- large-scale catalog or lineage platform replacement
- turnkey Jira, ServiceNow, or Confluence sync

Martenweave can grow toward these paths, but the current open-source core is a local-first package and CLI.

Teams building data or delivery platforms can discuss a bounded integration collaboration through [Partnerships](/docs/partnerships.html). Any such work begins with an explicit evidence flow, ownership model, and approval boundary.

## Import Safety Model

Raw files are not model truth.

Good import behavior:

- profile the source
- record evidence
- infer draft model objects only when appropriate
- create PatchProposal objects for review
- validate proposed references and types
- let humans approve changes

Bad import behavior:

- silently overwrite canonical files
- treat source spreadsheets as always correct
- bypass validation
- hide assumptions
- create unreviewed AI changes

## Export Safety Model

Exports should be reproducible from canonical model state.

Useful exports include:

- steward review workbooks
- search documents for retrieval
- lineage edges for analysis
- gap summaries
- impact reports
- schemas for integration
- AI context files

Generated files are disposable. Canonical model files remain the source of record.
