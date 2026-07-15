# Master Data Management (MDM)

Martenweave is an open-source data model registry for SAP migration, MDM, and data governance. This page describes how MDM teams can use it to keep master data definitions, ownership, and validation rules reviewable and consistent across systems.

## What the problem looks like

MDM programs define golden records, matching rules, data quality thresholds, and stewardship workflows. The definitions behind those rules often scatter across spreadsheets, design documents, and implementation tickets. That makes it hard to answer questions like:

- What does "Customer" mean across ERP, CRM, and data warehouse systems?
- Which attributes are global, and which are local to a country or system?
- Who owns a given attribute, rule, or value list?
- What breaks if we change a harmonized value or matching rule?

## How Martenweave helps

Martenweave stores model knowledge in canonical Markdown and YAML files. Each object has a stable ID, type, status, and references. Deterministic validators check IDs, types, references, and context rules before anything is indexed.

For MDM work this means:

- **Canonical entity definitions** — store `MasterDataDomain`, `BusinessEntity`, `EntityContext`, `Attribute`, and `AttributeUsage` objects with stable IDs.
- **Ownership and stewardship** — attach owners and decisions to attributes, rules, and value lists so accountability survives team changes.
- **Global/local rules** — model which rules apply everywhere and which are scoped to a system, country, or business unit.
- **Value-list governance** — keep allowed values, value mappings, and translations under version control with change requests.
- **Lineage and impact analysis** — trace from a harmonized attribute to every system-specific usage before changing a rule.
- **Human-approved AI proposals** — ask AI to draft a `PatchProposal` from a design note; deterministic validators verify it, and a human approves the change.

## What it is not

Martenweave does not replace an enterprise MDM platform, run matching engines, or execute data distribution. It is a model-governance and evidence layer that complements MDM tooling. The local generated viewer is read-only.

## Example scope

A typical MDM governance slice includes:

- `MasterDataDomain` objects for Customer, Vendor, Material, or Business Partner.
- `BusinessEntity` objects that define the conceptual entity independent of any system.
- `EntityContext` objects for system-specific grains such as ERP central, CRM, or data warehouse.
- `Attribute` and `AttributeUsage` objects for global and local field definitions.
- `ValueList` and `ValueMapping` records for harmonized codes.
- `Issue`, `Decision`, and `ChangeRequest` objects to capture triage outcomes and approved changes.

## Getting started

1. Install `martenweave-core` with `pip install martenweave-core`.
2. Run `martenweave init ./my-model` to scaffold a repository.
3. Add your master data objects as Markdown + YAML files under `model/`.
4. Run `martenweave validate` and `martenweave build-index --jsonl`.
5. Review ownership, lineage, and gap reports before changing MDM rules.

See [Quickstart](/docs/quickstart.html) and [How it works](/docs/how-it-works.html) for commands and the full workflow.
