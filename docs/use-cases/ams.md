# Application management services (AMS)

Martenweave is an open-source data model registry for SAP migration, MDM, and data governance. This page describes how AMS teams can use it to keep model knowledge available after go-live and reduce repeated rediscovery.

## What the problem looks like

After an SAP programme goes live, AMS teams inherit incidents, service requests, and small changes. The original design decisions, mappings, and exceptions are often buried in closed project documentation. That makes it hard to answer questions like:

- Why was this field mapped this way?
- Is this incident a data issue, a config issue, or an unapproved model change?
- Did a workaround become a permanent rule?
- What will break if we retire a workaround or change a mapping?

## How Martenweave helps

Martenweave stores model knowledge in canonical Markdown and YAML files. Each object has a stable ID, type, status, and references. Deterministic validators check IDs, types, references, and context rules before anything is indexed.

For AMS work this means:

- **Living model documentation** — keep domains, entities, attributes, mappings, and decisions in version-controlled canonical files instead of static documents.
- **Incident-to-model traceability** — link AMS incidents and service requests to the canonical objects they affect.
- **Workaround governance** — flag temporary workarounds as `Issue` or `Decision` objects with review dates and owners.
- **Safe change impact** — run impact analysis before retiring a workaround or changing an attribute, mapping, or value list.
- **Handover continuity** — preserve project knowledge in a searchable registry that new team members can explore without asking the original consultants.
- **Human-approved AI proposals** — ask AI to draft a `PatchProposal` from an AMS finding; deterministic validators verify it, and a human approves the change.

## What it is not

Martenweave does not replace an IT service-management tool, execute SAP transports, or autonomously apply changes to SAP. It is a model-governance and evidence layer that helps AMS teams understand and control the data model behind incidents and changes.

## Example scope

A typical AMS knowledge slice includes:

- `MasterDataDomain` and `BusinessEntity` objects for the supported master data areas.
- `Attribute` and `AttributeUsage` objects with ownership and change history.
- `FieldEndpoint` and `Mapping` objects that document current source-to-target paths.
- `Issue` objects for recurring data problems and workaround risks.
- `Decision` objects that capture why workarounds exist and when they should be reviewed.
- `ChangeRequest` objects for approved model changes that originate from AMS findings.

## Getting started

1. Install `martenweave-core` with `pip install martenweave-core`.
2. Run `martenweave init ./my-model` or import an existing model slice.
3. Link AMS findings to canonical objects under `model/`.
4. Run `martenweave validate` and `martenweave build-index --jsonl`.
5. Use lineage, impact, and gap reports to prioritize and review changes.

See [How it works](/docs/how-it-works.html) and [Governance](/docs/governance.html) for related workflows.
