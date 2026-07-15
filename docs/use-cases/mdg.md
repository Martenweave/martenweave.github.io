# SAP Master Data Governance (MDG)

Martenweave is an open-source data model registry for SAP migration, MDM, and data governance. This page describes how SAP MDG teams can use it to keep implementation knowledge traceable, validated, and aligned with MDG configuration decisions.

## What the problem looks like

SAP MDG governs master data with workflows, validation rules, and distribution. The model decisions behind that configuration—what each field means, why a rule exists, which values are allowed—often live outside MDG in spreadsheets, documents, and team memory. That makes it hard to answer questions like:

- Which MDG validation rules map to which business requirements?
- Why was a field excluded from a governance process?
- What is the approved data model behind an MDG change request?
- What breaks if we change a context, entity, or value list?

## How Martenweave helps

Martenweave stores model knowledge in canonical Markdown and YAML files. Each object has a stable ID, type, status, and references. Deterministic validators check IDs, types, references, and SAP context rules before anything is indexed.

For SAP MDG work this means:

- **Independent model specification** — maintain a canonical model that is not locked inside MDG configuration, so the specification can be reviewed before implementation.
- **SAP context rules** — attach `EntityContext` and `AttributeUsage` records for MDG-relevant grains such as Business Partner central, Customer company code, or Vendor purchasing organization.
- **Change control** — turn model changes into reviewable `PatchProposal` and `ChangeRequest` objects with linked decisions and evidence.
- **Dataset gap detection** — profile representative datasets and compare them against the canonical model to find missing attributes or unexpected values before MDG testing.
- **Lineage and impact analysis** — trace from a business attribute through contexts and usages to MDG-relevant SAP fields before changing a rule.
- **Human-approved AI proposals** — ask AI to draft a `PatchProposal` from an MDG design note; deterministic validators verify it, and a human approves the change.

## What it is not

Martenweave does not configure SAP MDG, run MDG workflows, or write changes back to SAP. It is a model-governance and evidence layer that complements SAP MDG. SAP table and field names are used descriptively for context; Martenweave is not an SAP product, partner, or certified solution.

## Example scope

A typical SAP MDG alignment slice includes:

- `MasterDataDomain` objects for Business Partner, Customer, or Vendor.
- `BusinessEntity` and `EntityContext` objects that mirror MDG-relevant grains.
- `Attribute` and `AttributeUsage` objects for governed fields.
- `FieldEndpoint` objects for SAP targets used in MDG validation and distribution.
- `ValueList` and `ValueMapping` records for approved codes.
- `Issue`, `Decision`, and `ChangeRequest` objects to capture design rationale and approved changes.

## Getting started

1. Install `martenweave-core` with `pip install martenweave-core`.
2. Run `martenweave init ./my-model` to scaffold a repository.
3. Add your MDG model objects as Markdown + YAML files under `model/`.
4. Run `martenweave validate` and `martenweave build-index --jsonl`.
5. Compare the canonical model with MDG configuration and dataset evidence.

See [Quickstart](/docs/quickstart.html), [SAP migration](/docs/use-cases/sap-migration.html), and [MDM](/docs/use-cases/mdm.html) for related workflows.
