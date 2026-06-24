# How Martenweave Works

Martenweave turns scattered model knowledge into checked, searchable model context.

The workflow is deliberately explicit so humans can inspect each step.

## 1. Bring Inputs

Inputs can include:

- Excel mappings
- CSV or XLSX datasets
- ticket notes
- validation reports
- decision logs
- SAP table and field context
- source-system extracts
- steward comments

Raw inputs are not treated as truth. They provide evidence.

## 2. Normalize Into Model Objects

Martenweave represents model knowledge as canonical objects such as:

- domains
- business entities
- entity contexts
- attributes
- attribute usages
- field endpoints
- mappings
- value lists
- validation rules
- issues
- decisions
- evidence
- patch proposals
- change requests

The canonical files are Markdown and YAML. They are readable in Git and can be reviewed without a hosted UI.

## 3. Validate Consistency

Validation checks object structure and references before trusted indexing.

Checks include:

- ID format
- required fields
- registered object types
- duplicate IDs
- broken references
- reference type mismatches
- ownership and readiness rules
- SAP context rules for SAP starter scenarios

## 4. Build The Index

Generated outputs are rebuildable.

They can include:

- SQLite index
- search JSONL
- lineage JSONL
- audit logs
- reports
- exports

If generated files disagree with canonical files, canonical files win.

## 5. Analyze Gaps And Impact

Once the model is indexed, teams can ask practical questions:

- Which dataset columns are missing expected model endpoints?
- Which attributes lack source evidence?
- Which field endpoints depend on a changed rule?
- Which mappings, owners, issues, and decisions are affected?
- What should be reviewed before a migration load or support handover?

## 6. Propose Changes

AI and import workflows create PatchProposal objects instead of silently changing canonical files.

A good proposal records:

- what evidence triggered the proposal
- which objects are affected
- what operations are proposed
- what assumptions were made
- what validation and impact checks should run

## 7. Human Approval

Humans approve, reject, or revise proposals.

Approved changes become ChangeRequests and then canonical updates. This keeps the change trail visible.

## 8. Export Reports And Context

Martenweave can export model context for review, analysis, automation, and AI-assisted work.

Examples include:

- search documents
- lineage exports
- model CSV or XLSX files
- JSON Schema
- gap reports
- impact reports
- GitHub-ready issue or change bundles

## Summary

Inputs bring evidence.

Model objects create structure.

Validators create trust.

Indexes create search and analysis.

Patch proposals keep AI and imports reviewable.
