# Capabilities

Martenweave Core is a local-first, backend-first model governance layer. It turns approved model knowledge into canonical Markdown and YAML files, then makes that knowledge inspectable through deterministic services and derived outputs.

## What works today

- **Canonical model files:** domains, entities, attributes, contexts, field endpoints, mappings, value lists, issues, decisions, ChangeRequests, and PatchProposals.
- **Deterministic validation:** identity, schema, cross-object references, and supported SAP context checks run before indexing.
- **Derived access layers:** SQLite and JSONL indexes, search, structured query, trace, impact analysis, reports, and a local read-only viewer can be rebuilt from canonical files.
- **Evidence and readiness work:** profile CSV/XLSX data, detect dataset-to-model gaps, prepare readiness and review outputs, and retain evidence separately from canonical truth.
- **Controlled changes:** AI and import flows create reviewable PatchProposals. Validators verify; humans approve; approved changes are recorded through ChangeRequests and Git-oriented bundles.
- **Local integration:** the CLI, bound local API, MCP server, and Workbench are integration surfaces around the same Core services.

## Practical use cases

### SAP migration

Compare mappings and representative datasets with the approved model before mock-load testing. Trace a field through source, target, rules, and relationships; then assess impact before a change.

### MDM and MDG delivery

Keep business definitions, field mappings, value logic, ownership, and decisions connected without pretending that a mapping workbook or an MDM platform is the sole source of implementation knowledge.

### Data governance and AMS

Use stable model objects and linked evidence to make recurring incidents, local exceptions, ownership questions, and post-go-live changes easier to investigate and review.

## Boundaries

Martenweave is not a hosted SaaS tenant platform, enterprise MDM replacement, generic chatbot, generic workflow engine, or direct SAP write-back tool. The local Workbench does not own model truth; canonical files remain authoritative.

## Next step

Read the [pilot-project approach](/docs/pilot-projects.html), see [how an engagement works](/docs/engagement.html), or [contact the team](/docs/contact.html) with a representative model slice or migration question.
