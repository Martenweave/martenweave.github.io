# What Is a Data Model Registry? A Practical Guide for Managers

Most companies do not lack documentation.

They lack a reliable answer to a simpler question:

**What is the current, approved model of the data on which the project depends?**

During an SAP migration, warehouse rollout or master data programme, hundreds of documents may exist. There are mapping spreadsheets, interface specifications, Jira tickets, validation reports, workshop decisions, data extracts and technical designs.

Each document contains part of the truth.

None necessarily represents the truth as a whole.

A field is mandatory in the migration workbook but optional in the latest design. A transformation rule exists in a ticket but not in the validation script. A dataset contains a renamed column that the mapping still references under its old name. An interface depends on a value whose business meaning was changed during a workshop.

All the documents may have been reviewed.

The combined model can still be inconsistent.

This is the problem a data model registry is intended to solve.

## A working definition

“Data model registry” is not yet a universally established software category. I use the term for a controlled repository that manages the approved definitions, relationships, rules and change history behind a data initiative.

A practical data model registry should answer questions such as:

- Which business objects are in scope?
- Which attributes belong to them?
- Where does each value originate?
- Where is it used?
- How is it transformed?
- Which rules validate it?
- Which datasets are expected to provide it?
- Who owns its definition?
- Which decision explains the current design?
- What will be affected if it changes?

The registry does not merely store documents.

It stores connected model elements.

That distinction matters.

A document may say that `Customer Group` is mapped from a legacy source into SAP. A model registry should also know which source field provides it, which target field receives it, which validation rule checks it, which interface consumes it and which business decision approved the mapping.

A registry turns isolated statements into a model that can be checked.

## Why managers should care

At first, this may sound like a technical architecture concern.

It is not.

An unreliable data model creates management problems:

- readiness reports cannot be trusted;
- migration defects appear late;
- teams argue about ownership;
- changes have unexpected consequences;
- the same questions are investigated repeatedly;
- project knowledge disappears when consultants leave;
- testing becomes the main method of discovering missing decisions.

These are delivery risks, not metadata preferences.

When a project claims that its material data is 95% complete, management needs to know what that percentage means.

Does it mean 95% of cells are populated?

Does it mean 95% of target fields have mappings?

Does it mean all critical warehouse attributes are available?

Does it include unresolved value mappings?

Does it account for attributes needed by interfaces and downstream systems?

A completeness percentage without a governed model behind it is often little more than project decoration.

## The common situation: everyone has part of the answer

Consider a company preparing customer data for an SAP S/4HANA migration.

The migration team maintains a mapping workbook.

The business team records decisions in meeting notes.

The SAP team defines target requirements in a design document.

The integration team maintains its own interface mapping.

The data-quality team creates validation rules.

The project office tracks defects and open decisions in Jira.

Nothing is necessarily wrong with any of these tools.

The problem is that they do not automatically agree.

Suppose the business decides that a tax number is optional for private individuals in one country.

The decision is recorded in a ticket.

The mapping workbook still marks the field as mandatory.

The validation script rejects empty values.

The migration team introduces a temporary workaround.

The target design is never updated.

Several weeks later, another team uses the original mapping workbook for a new load.

The problem returns.

This is often described as poor communication.

That explanation is too convenient.

The project has a structural control problem. It has no authoritative model through which the decision can be connected to the field, rule, mapping and affected datasets.

Better meetings will not fully solve that.

Another spreadsheet will not solve it either.

## A data model registry is not another document library

A document library helps people store and retrieve information.

That is useful, but it is not enough.

A registry must understand that different pieces of information are related.

For example:

```text
Business object: Customer
    Attribute: Tax Number
        Source field: LEGACY_CUSTOMER.VAT_ID
        Target field: SAP Business Partner tax number
        Transformation: remove spaces and country prefix
        Validation rule: country-specific format
        Exception: optional for private individuals in Country X
        Owner: Global Tax Data Owner
        Evidence: approved design decision
        Used by: migration load and compliance interface
```

The important part is not the formatting.

The important part is that the registry can validate the references.

If the mapping points to a source field that no longer exists, the registry should report it.

If the exception exists but the validation rule still rejects the value, the inconsistency should be visible.

If the target field changes, the team should be able to see which mappings, rules and interfaces depend on it.

This is the difference between storing information and governing a model.

## What belongs in the registry

A registry does not need to capture every detail of every system.

That would create an unmanageable second copy of the enterprise architecture.

It should capture the model elements required to control the project.

For a migration or master data initiative, these normally include the following.

### Business objects

Examples include:

- customer;
- supplier;
- material;
- product;
- plant;
- warehouse;
- address;
- bank account;
- purchasing organisation;
- sales area.

The registry should show how these objects relate to one another.

### Attributes

An attribute represents a business concept such as:

- base unit of measure;
- shipping condition;
- customer group;
- payment term;
- batch-management indicator;
- warehouse product group.

The attribute should not be defined only by its technical field name. It needs a business meaning, ownership and context.

### Source and target fields

These identify where the value comes from and where it must go.

A single business attribute may have several technical representations across legacy systems, SAP, warehouse applications and external providers.

### Mappings and transformations

The registry should distinguish between:

- direct copies;
- value conversions;
- defaults;
- derivations;
- conditional mappings;
- manually supplied values;
- approved empty values.

“Mapped” is not a sufficiently precise status.

### Validation rules

Rules define what the project considers valid.

They may include:

- mandatory conditions;
- accepted values;
- formats;
- dependencies;
- uniqueness requirements;
- organisational restrictions;
- country-specific conditions.

### Datasets

The project should know which extract, workbook or interface payload is expected to provide each field.

This allows the actual data to be compared with the model.

### Decisions and evidence

A model should not show only what was decided.

It should also show why.

Evidence may include:

- an approved ticket;
- workshop minutes;
- an SAP design document;
- a regulatory requirement;
- a source-system specification;
- a test finding.

### Ownership

An owner is not simply the person who entered the field into a spreadsheet.

The registry should distinguish between technical maintenance, business ownership and approval responsibility.

### Change proposals

A proposed change should not overwrite the approved model immediately.

It should show:

- what is being changed;
- why;
- what evidence supports the change;
- which model elements are affected;
- who must review it.

## How it differs from a data catalog

A data catalog helps users discover and understand existing data assets.

It may index databases, tables, columns, dashboards and pipelines. It can show where data lives, who owns it and how it flows through the technical landscape.

For example, OpenMetadata describes lineage as a way to track how data moves through systems, including databases, pipelines and dashboards, supporting traceability and impact analysis.

That is valuable for enterprise data discovery.

A model registry starts from a different question.

A catalog asks:

> What data assets exist, and how are they connected?

A model registry asks:

> What should the approved project model be, and does the available data satisfy it?

The difference becomes clear during migration.

A catalog may show that a legacy customer table contains a field named `VAT_ID`.

A model registry should show whether that field is approved as the source for a particular target attribute, which transformation applies, which exceptions are allowed and whether the latest extract still contains it.

These capabilities can complement each other.

The registry should not attempt to rebuild an enterprise data catalog.

## How it differs from MDM

Master Data Management is concerned with creating and maintaining trusted master records.

SAP describes MDM as the discipline of creating a trusted master reference for important business data. SAP Master Data Governance includes golden-record creation, matching, consolidation, workflow, business-rule validation and data-quality monitoring.

That is a much broader operational responsibility than a model registry should assume.

An MDM platform asks:

> What is the approved customer, product or supplier record?

A model registry asks:

> What is the approved definition of that record, where do its attributes come from, and what depends on them?

The distinction is important.

A company may have SAP MDG and still struggle with migration mappings, external datasets, legacy field definitions, project decisions and integration dependencies.

MDG does not automatically turn every migration workbook, interface specification and testing decision into one coherent project model.

Conversely, a model registry does not replace the need for MDG when the organisation requires central master-data creation, matching, consolidation and workflow.

One manages operational records.

The other manages the model and evidence around them.

## How it differs from a schema registry

A schema registry is normally used to control technical data structures exchanged between applications.

Confluent Schema Registry, for example, manages schemas used with streaming data and supports schema evolution and compatibility controls.

This protects applications from incompatible technical changes.

A schema registry may establish that a field is a string, is required and appears in a particular message version.

It usually does not explain:

- the business meaning of the field;
- its source-to-target mapping;
- why a transformation exists;
- which project decision approved it;
- which dataset is expected to populate it;
- which business owner is responsible;
- which migration exception applies.

A schema registry protects technical compatibility.

A model registry protects model consistency.

They solve different problems.

## How it differs from a migration platform

An enterprise migration platform may support data extraction, transformation, cleansing, loading, reconciliation, dashboards and programme execution.

That is operational migration tooling.

A model registry should not try to compete with it.

Its role is to maintain an independent, validated representation of the model on which the migration depends.

This is particularly useful when several tools are involved.

A project may use:

- SAP Migration Cockpit;
- ETL software;
- custom Python or SQL transformations;
- data-quality tools;
- Excel workbooks;
- an MDM platform;
- an integration platform.

The model registry sits across these tools.

It does not perform all their work.

It makes their assumptions traceable.

## The manager’s test: can the project answer seven questions?

A project probably needs stronger model governance when it cannot answer these questions consistently.

### 1. What is the approved model today?

Not last month’s spreadsheet.

Not the latest email.

The current approved state.

### 2. Which parts are still assumptions?

Projects often mix approved requirements, working hypotheses and temporary workarounds.

These should not look identical.

### 3. Does the current dataset match the model?

The team should know:

- which expected fields are missing;
- which unexpected fields appeared;
- which values are unmapped;
- which mandatory conditions are not satisfied.

### 4. Who owns each important definition?

An unresolved mapping is different from an unresolved business definition.

The second cannot be solved by the migration developer alone.

### 5. What depends on the field being changed?

A change may affect:

- another migration object;
- a validation rule;
- an interface;
- a report;
- a warehouse;
- a country rollout;
- a downstream system.

### 6. Why was the current design chosen?

Without evidence and decision history, teams repeatedly reopen settled questions or preserve obsolete rules because nobody knows their origin.

### 7. Can the project reproduce its readiness assessment?

If two teams run the same check against the same model and dataset, they should receive the same result.

If readiness depends mainly on expert interpretation during a meeting, it is not yet controlled.

## What a registry should produce

The value of a registry is not the number of objects stored in it.

The value is the quality of the answers it produces.

Managers should expect outputs such as:

- unresolved model gaps;
- missing dataset fields;
- unmapped source values;
- attributes without owners;
- conflicting rules;
- outdated references;
- high-impact proposed changes;
- model readiness by object or domain;
- traceability from a decision to affected fields;
- traceability from a failed validation to its source definition.

A useful report might say:

> The supplier model contains 184 approved attributes. Nine required attributes are absent from the current source extract. Three country-specific mappings remain unresolved. Two high-impact fields have no confirmed business owner.

That is actionable.

A report saying “supplier data is 92% ready” is not.

## Why deterministic validation matters

A registry should not depend entirely on manual review.

Some conditions can and should be checked automatically.

For example:

- every mapping must reference an existing source and target field;
- every validation rule must reference known attributes;
- every relationship must point to an existing object;
- identifiers must be unique;
- required properties must be present;
- deprecated fields should not remain in active mappings;
- unresolved proposals should not appear as approved model truth.

These checks are deterministic.

The same model should produce the same validation result each time.

This does not replace expert judgement.

It reserves expert judgement for questions that actually require it.

A consultant should decide whether a business rule is correct.

They should not spend hours discovering that a mapping references a field deleted two weeks ago.

## Where AI helps—and where it should stop

AI can be useful in building and maintaining the registry.

It can:

- extract candidate fields from documents;
- identify possible mappings;
- summarise decisions;
- detect similar definitions;
- propose missing relationships;
- draft validation rules;
- suggest model updates from support tickets.

But AI should not silently rewrite the approved model.

A plausible suggestion is not the same as an approved definition.

A safe workflow is:

```text
Evidence → proposal → validation → impact analysis → human review → approved change
```

The AI proposes.

Deterministic validators check structural consistency.

The responsible person approves the business meaning.

This division is not a limitation. It is what makes AI usable in controlled enterprise work.

## When a data model registry is worth introducing

Not every project needs a separate registry.

A small migration with one system, a limited number of fields and a stable team may be managed adequately with disciplined spreadsheets and version control.

The case becomes stronger when several of the following conditions exist:

- multiple source systems;
- several SAP or non-SAP targets;
- more than one migration wave;
- country or business-unit exceptions;
- external warehouses or 3PL providers;
- complex value mappings;
- frequent design changes;
- several consulting teams;
- regulatory or audit requirements;
- recurring data-related support incidents;
- dependency on a few senior experts;
- AI-assisted analysis or change proposals.

The registry becomes particularly valuable when the cost of misunderstanding a field is larger than the cost of governing its definition.

## What not to build

The idea can easily become too large.

A model registry should not automatically grow into:

- a full MDM platform;
- an enterprise data catalog;
- a workflow engine;
- a migration execution platform;
- a process-mining product;
- a generic knowledge-management system;
- another editable database with hundreds of screens.

The first useful version can be much smaller.

It needs:

1. canonical model definitions;
2. deterministic validation;
3. a generated search index;
4. dataset-to-model gap detection;
5. lineage and impact analysis;
6. controlled change proposals;
7. human approval and audit history.

Anything beyond that should be justified by demonstrated use, not platform ambition.

## How Martenweave approaches the problem

Martenweave is built around this narrower interpretation of a model registry.

Canonical files contain the approved model. Generated SQLite and search indexes can be rebuilt. The application validates references, profiles CSV and XLSX datasets, detects gaps, traces dependencies and produces impact reports.

AI-assisted changes are represented as patch proposals rather than applied directly. Approved changes can then move through a reviewable Git and GitHub workflow.

This does not make Martenweave a replacement for SAP MDG, a data catalog or a migration tool.

It gives those systems and project teams a controlled model layer they often lack.

## The real question

The question is not whether every organisation needs a product called a data model registry.

The term itself is secondary.

The real question is whether the organisation can reliably connect:

- business meaning;
- technical fields;
- mappings;
- datasets;
- validation rules;
- ownership;
- decisions;
- evidence;
- and change impact.

If it cannot, the project is already paying for the missing layer.

It pays through repeated analysis, late defects, inconsistent documentation, dependency on individuals and decisions made without enough context.

A data model registry makes that layer explicit.

It does not eliminate complexity.

It makes complexity visible early enough to manage.
