# Martenweave Architecture

Martenweave is backend-first and local-first. The core design is intentionally simple: canonical files are truth, generated artifacts are acceleration, and changes are reviewable.

## Architecture Loop

![Martenweave architecture loop](/assets/architecture-loop.svg)

```text
Input artifacts
  -> canonical model files
  -> deterministic validation
  -> generated index
  -> gap / impact / health reports
  -> AI patch proposals
  -> human approval
  -> trusted model evolution
```

## Canonical Files

Canonical model objects are stored as Markdown files with YAML frontmatter.

Examples of object concepts:

- MasterDataDomain
- MigrationObject
- BusinessEntity
- EntityContext
- Attribute
- AttributeUsage
- FieldEndpoint
- Mapping
- ValueList
- ValueMapping
- ValidationRule
- Issue
- Decision
- Evidence
- PatchProposal
- ChangeRequest

These files are human-readable, Git-friendly, and safe to inspect without a product UI.

## Generated Indexes

Generated artifacts are disposable.

They can include:

- SQLite index
- search JSONL
- lineage JSONL
- audit logs
- usage and AI usage events
- export files

If generated artifacts disagree with canonical files, canonical files win.

## Deterministic Validation

Validation runs before trusted indexing and reporting.

Checks include:

- object ID format
- required fields
- registered object types
- duplicate IDs
- broken references
- reference type mismatches
- ownership/value-list/domain-pack rules
- SAP context rules for starter SAP scenarios

## Reports And Model Intelligence

Martenweave can produce practical outputs from the model:

- health reports
- governance scorecards
- gap reports
- ownership reports
- impact reports
- trace outputs
- search/query results
- issue drafts
- GitHub-ready change bundles

## AI Proposal Flow

AI does not own the model.

AI can help convert unstructured evidence into a structured PatchProposal. The proposal is validated, reviewed, and approved before canonical files change.

```text
note / ticket / validation finding
  -> evidence summary
  -> PatchProposal
  -> deterministic validation
  -> diff / impact review
  -> human approval
  -> ChangeRequest
  -> canonical update
```

## Interfaces

The current core is CLI/backend-first:

- `modelops` CLI
- local API server
- MCP-ready backend
- Git-friendly repository files
- CSV/XLSX import/export paths

A UI can be useful later, but the model truth should not depend on the UI.
