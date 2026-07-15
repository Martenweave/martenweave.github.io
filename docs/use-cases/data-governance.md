# Data governance

Martenweave is an open-source data model registry for SAP migration, MDM, and data governance. This page describes how data-governance teams can use it to make policies, standards, and decisions operational and auditable.

## What the problem looks like

Data governance frameworks define ownership, quality rules, lineage, and standards. In practice, those frameworks often stay on paper while projects make local decisions in spreadsheets and tickets. That makes it hard to answer questions like:

- Where is the approved definition of a business term or attribute?
- Which rules are global standards and which are project exceptions?
- Who approved an exception, and when does it expire?
- Can we prove a model change was reviewed before it reached a target system?

## How Martenweave helps

Martenweave stores model knowledge in canonical Markdown and YAML files. Each object has a stable ID, type, status, and references. Deterministic validators check IDs, types, references, and context rules before anything is indexed.

For data governance work this means:

- **Canonical policy artifacts** — store domains, entities, attributes, validation rules, value lists, and decisions as version-controlled objects.
- **Ownership and accountability** — assign owners to attributes and rules, with audit events and change requests for every update.
- **Exception management** — capture temporary exceptions as `Issue` or `Decision` objects with status, related objects, and expiry criteria.
- **Lineage and impact** — trace from a policy definition to every attribute, mapping, and system endpoint affected by a change.
- **Evidence-based review** — link validation findings, dataset gaps, and assessment results to the objects they affect.
- **Human-approved AI proposals** — ask AI to draft a `PatchProposal` from a governance review; deterministic validators verify it, and a human approves the change.

## What it is not

Martenweave is not a workflow engine, a generic data catalog, or a policy-enforcement layer inside a database. It is a model-governance and evidence layer that makes policies reviewable, traceable, and version-controlled. The local generated viewer is read-only.

## Example scope

A typical data-governance slice includes:

- `MasterDataDomain` objects for each governed data area.
- `Attribute` and `AttributeUsage` objects with ownership and quality-rule references.
- `ValueList` and `ValueMapping` records for approved reference data.
- `Decision` objects that capture approved standards and exceptions.
- `Issue` objects for gaps, risks, and overdue exceptions.
- `ChangeRequest` objects for approved model changes.

## Getting started

1. Install `martenweave-core` with `pip install martenweave-core`.
2. Run `martenweave init ./my-model` to scaffold a repository.
3. Add governance objects as Markdown + YAML files under `model/`.
4. Run `martenweave validate` and `martenweave build-index --jsonl`.
5. Review ownership, decisions, lineage, and gap reports with stakeholders.

See [Governance](/docs/governance.html) and [How it works](/docs/how-it-works.html) for the full workflow.
