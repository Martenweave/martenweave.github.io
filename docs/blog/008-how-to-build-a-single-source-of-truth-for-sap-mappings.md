# How to Build a Single Source of Truth for SAP Mappings

**Reviewed: 14 July 2026**

Most SAP programmes claim to have a single source of truth for mappings.

Usually, this means one workbook has been declared official.

The programme may store it in SharePoint, Teams or a controlled document repository. Access is restricted. Version history is enabled. One team is responsible for updates.

This is better than exchanging uncontrolled files by email.

It is not necessarily a single source of truth.

The workbook may contain the approved source-to-target fields while important decisions remain elsewhere:

- business definitions in Confluence;
- open questions in Jira;
- value mappings in another spreadsheet;
- transformation logic in migration code;
- target changes in SAP configuration;
- local exceptions in country files;
- data-quality findings in profiling reports;
- test evidence in a testing tool;
- approval history in email or meeting notes.

The official workbook is one important source.

The actual truth remains distributed.

We use a stricter definition:

> A single source of truth is the controlled representation from which the programme can determine the current approved mapping, its meaning, its context, its evidence and its dependencies.

It does not have to contain every project artefact.

It must provide a reliable way to connect them.

## Start by defining what “truth” means

The phrase “single source of truth” is used so often that it can become meaningless.

For SAP mappings, we believe the programme needs to distinguish at least four kinds of truth.

### Business truth

What does the attribute mean?

Who owns the definition?

Where does it apply?

Which values are valid?

### Design truth

How should the business attribute be represented in the target model?

Which SAP object, entity or field corresponds to it?

Which rules and contexts apply?

### Migration truth

Which legacy data supplies the value?

How is it transformed?

Which source values map to which target values?

What happens when data is missing or invalid?

### Implementation truth

What has actually been configured, coded, tested and deployed?

These truths should align, but they are not identical.

A source-to-target workbook often tries to compress all four into one row.

That is where control begins to break down.

## The goal is not one physical file

A single source of truth does not mean all project information must be stored in one document or application.

That would create another oversized repository and force every stakeholder into the same working method.

Different tools remain useful:

- Excel for business review and bulk editing;
- Jira or Azure DevOps for delivery work;
- Confluence or SharePoint for readable documentation;
- SAP MDG for operational governance;
- migration tools for execution;
- test-management tools for evidence;
- Git for controlled model changes;
- profiling tools for dataset analysis.

The issue is not the number of tools.

The issue is whether each tool refers to the same model objects and whether the approved state can be reconstructed without manual interpretation.

A useful architecture looks like this:

```text
Excel, Jira, documentation, datasets, SAP and test tools
                         ↓
             Controlled mapping model
                         ↓
        Validated views, reports and change history
```

The controlled model does not replace every surrounding system.

It defines the relationships that make their information coherent.

## What the mapping source of truth should contain

At minimum, a governed mapping model should separate the objects that are often mixed together in workbook rows.

## Business attributes

The business attribute should exist independently from the source and target fields.

For example:

```text
Customer classification
```

is a business concept.

```text
LEGACY_CUST.TYPE
```

is a source endpoint.

```text
KNVV-KDGRP
```

is a physical SAP target endpoint.

They may be connected, but they are not the same object.

Separating them allows the programme to change a source system or target implementation without losing the business meaning.

## Source endpoints

Each source endpoint should identify:

- source system;
- table, file or interface;
- column or field;
- data type;
- applicable population;
- extraction method where relevant;
- lifecycle status.

A field name without a system and context is rarely sufficient.

`CUSTOMER_TYPE` may exist in several systems and mean something different in each one.

## Target endpoints

The target should identify:

- target system;
- business object or entity;
- physical field;
- organisational context;
- applicable role or process;
- lifecycle status.

In SAP programmes, the same business concept can appear at central, company-code, sales-area, purchasing-organisation or plant level.

The context must be explicit.

## Mapping objects

The mapping itself should be a separate object connecting source and target.

It should contain:

- stable identifier;
- source endpoint;
- target endpoint;
- business attribute;
- applicable context;
- transformation reference;
- owner;
- status;
- approval;
- evidence;
- effective version;
- known exceptions.

This is different from treating the spreadsheet row number as the mapping identity.

Rows move. Tabs are renamed. Files are copied.

A stable mapping identifier can survive those changes.

## Transformation rules

A transformation should be identifiable independently from the mapping.

This matters because one transformation may be reused by several mappings, or one mapping may require several ordered transformations.

A transformation should state:

- input;
- condition;
- output;
- treatment of blanks;
- treatment of invalid values;
- applicable context;
- examples;
- owner;
- approval status;
- implementation location.

“Convert according to business rules” is not a controlled transformation.

## Value lists and value mappings

Field-level mappings and value-level mappings should not be treated as one status.

A source field can be connected to a target field while many actual source values remain unresolved.

The model should identify:

- target value list;
- source values;
- target values;
- many-to-one conversions;
- local variations;
- inactive codes;
- unknown values;
- defaults;
- effective dates;
- ownership.

Value coverage should be checked against actual datasets, not only against an intended list.

## Contexts

Country, company code, sales area, purchasing organisation, plant and business process should be structured objects or explicit references.

Context should not depend on:

- worksheet names;
- comments;
- colour coding;
- file naming;
- team memory.

If a mapping applies only to one country, the model should state that directly.

## Decisions and evidence

A mapping source of truth should not preserve only the final result.

It should retain enough evidence to explain significant decisions.

For example:

- why several source values were merged;
- why a target field was made mandatory;
- why a default was accepted;
- why one country received an exception;
- why a legacy distinction was removed;
- why a source field was rejected as unreliable.

The mapping does not need to contain the full meeting transcript.

It should point to the decision, owner and relevant evidence.

## Status and lifecycle

A single `Complete` flag is too weak for critical mappings.

We prefer a lifecycle such as:

- Identified;
- Defined;
- Business approved;
- Architecture approved;
- Implemented;
- Dataset validated;
- Tested;
- Ready;
- Retired.

This separates the existence of mapping logic from evidence that it works.

## One source of truth requires one object identity

The most important technical principle is stable identity.

A programme often identifies mappings by:

- row number;
- source and target text;
- worksheet and position;
- a generated sequence in one tool.

These references are fragile.

A stable identifier allows several tools to refer to the same object:

```text
MAP-CUSTOMER-0042
```

That identifier can appear in:

- the canonical model;
- an exported workbook;
- a Jira issue;
- a test case;
- a migration log;
- an impact report;
- a change request;
- an AMS investigation.

The tool-specific records remain where they belong.

The stable identifier connects them.

Without object identity, “single source of truth” usually means manual text matching.

## Canonical source and generated views

We recommend separating the canonical representation from the views used by stakeholders.

The canonical source should be:

- structured;
- versioned;
- validatable;
- portable;
- suitable for comparison;
- independent from presentation layout.

Stakeholders can then receive generated views:

### Business review view

Contains definitions, contexts, mappings, value translations, owners and open decisions.

### Migration view

Contains physical endpoints, transformations, dependencies, dataset coverage and implementation status.

### Architecture view

Contains business attributes, model relationships, rules, lineage and impact.

### Management view

Contains readiness, blockers, unresolved ownership and accepted risk.

### AMS view

Contains operational meaning, mapping history, dependencies, rules and approved exceptions.

These views can be spreadsheets, reports, diagrams or web pages.

They do not become competing sources of truth because they are generated from the same controlled model.

## Excel should remain part of the workflow

We do not recommend forcing business users to edit YAML files or work directly in Git.

Excel remains useful because it supports:

- bulk review;
- filtering;
- sorting;
- annotations;
- offline work;
- familiar approval discussions;
- exchange with external teams.

The important rule is:

> Excel may be a review and import format. It should not silently become a separate approved model.

A controlled Excel workflow can work like this:

1. Export the current approved mappings.
2. Include stable identifiers and model versions.
3. Allow reviewers to propose changes.
4. Import the reviewed workbook.
5. Validate the proposed changes.
6. Show the differences.
7. Approve or reject them.
8. Update the canonical model.
9. Regenerate the views.

This preserves Excel’s usability while keeping change control outside manual file merging.

## Jira should track work, not define the model

Jira or Azure DevOps is appropriate for:

- assigning mapping tasks;
- tracking unresolved questions;
- recording defects;
- planning changes;
- discussing implementation.

The issue should refer to stable mapping and model identifiers.

For example:

```text
Issue: Local customer classification cannot be mapped for Spain
Affected objects:
- ATTR-CUSTOMER-CLASS
- MAP-CUSTOMER-0042
- VLMAP-CUSTCLASS-ES
```

The issue contains the delivery discussion.

The model contains the approved outcome.

When the issue closes, the programme should be able to verify that the corresponding model objects changed—or that the decision was explicitly to make no change.

Otherwise, closed tickets and current mappings begin to diverge.

## SAP MDG should remain the operational governance system

SAP currently positions SAP Master Data Governance as a governance layer that unifies master data, policy and metadata. Its capabilities include governed golden records, profiling, matching, consolidation, change-request workflows, validated values, quality monitoring and audit trails.

That is operational master-data governance.

The mapping source of truth serves a different purpose.

It should explain:

- how legacy and external data reaches the governed model;
- what the business attribute means;
- which transformation was approved;
- which source limitations exist;
- which migration exceptions were accepted;
- how target changes affect mappings;
- what evidence supports readiness.

The SAP configuration remains part of implementation truth.

It should be linked to the controlled mapping model, not treated as a replacement for the surrounding project knowledge.

## Migration code should implement mappings, not become the only record of them

Transformation logic often becomes more precise in code than in the mapping workbook.

That is expected.

Code must handle conditions, nulls, errors, ordering and technical formats.

The risk appears when the code becomes the only reliable description of the mapping.

Then business and architecture teams cannot review the rule without reading implementation details, and the model cannot be compared easily with the approved design.

We recommend maintaining a clear relationship:

```text
Approved transformation rule
              ↓
Implementation reference
              ↓
Execution and test evidence
```

The canonical rule explains the intended behaviour.

The code implements it.

Tests provide evidence.

If the implementation requires a different rule, the model should change through review rather than allowing the code to redefine the mapping silently.

## The source of truth must include actual data evidence

A mapping repository can be internally consistent and still be disconnected from the data.

We therefore include dataset evidence in the control model.

For every critical mapping, the programme should be able to determine:

- whether the source column exists;
- how complete it is;
- which values occur;
- whether unexpected values exist;
- whether the current value mapping covers them;
- whether formats are consistent;
- which populations have gaps;
- which extract version was tested.

The source of truth should not copy every source record.

It should preserve the profiling results and their relationship to the relevant model objects.

This turns the mapping repository from a design catalogue into a readiness tool.

## Model baselines matter

Mappings should be approved against a defined model baseline.

Consider a mapping approved in March.

In April:

- the target field becomes mandatory;
- the target value list changes;
- a country exception is introduced;
- the transformation rule is revised.

The mapping still exists. Its previous approval may no longer be sufficient.

A controlled model should identify:

- which version was approved;
- which model change affected it;
- whether revalidation is required;
- which tests must be repeated;
- whether the current dataset still passes.

Without baseline awareness, the programme can have a source of historical truth rather than current truth.

## Change control is what makes the source authoritative

A repository becomes authoritative not because management says so, but because approved changes flow through it consistently.

A practical mapping-change process should include:

### Proposal

The requester identifies the mapping or related objects and describes the proposed change.

### Validation

Deterministic checks identify missing references, invalid objects, duplicated identifiers or structural conflicts.

### Impact analysis

The team identifies affected:

- mappings;
- source fields;
- target fields;
- value lists;
- datasets;
- countries;
- rules;
- tests;
- interfaces.

### Review

Business, architecture, migration and other relevant owners review the parts within their responsibility.

### Approval

The approved target state is recorded.

### Implementation

Migration code, MDG configuration, interfaces and tests are updated.

### Verification

The programme confirms that implementation and canonical model remain aligned.

The source of truth is therefore a process as much as a repository.

## Avoiding two parallel truths

A common failure pattern is creating a model registry without retiring the old approval path.

The programme then has:

- an official mapping workbook;
- an official model repository.

Both are updated.

Neither is consistently authoritative.

To avoid this, the team must decide explicitly:

- Which representation is canonical?
- Which formats are generated?
- Which formats may propose changes?
- Where does approval occur?
- How are emergency changes reconciled?
- How are local files imported?
- How is divergence detected?

A source of truth is weakened every time an approved change bypasses it.

Exceptions may be necessary. They must be visible and reconciled.

## Global and local mappings

Global SAP programmes need a model that supports both standardisation and legitimate variation.

We recommend separating:

- global mapping rule;
- local extension;
- local override;
- temporary migration exception;
- source-specific transformation.

These are not the same thing.

For example, a global customer attribute may map directly in most countries. One country may require a local source conversion because the legacy system uses a different classification.

The global business definition may remain unchanged.

The model should show:

```text
Global attribute
   ├── Global target endpoint
   ├── Standard mapping rule
   └── Country-specific source transformation
```

This is clearer than copying the global mapping into several country workbooks and modifying each copy.

## Ownership should attach to objects, not files

A workbook owner may control updates without owning the business meaning of its contents.

We separate several responsibilities:

- business definition owner;
- source-data owner;
- target-model owner;
- mapping owner;
- value-list owner;
- implementation owner;
- approver;
- test owner.

These responsibilities may belong to different people.

The model should represent them at the relevant object level.

This makes escalation more precise.

A missing source column belongs to the source owner.

An unresolved value translation belongs to the business or value-list owner.

A target-field ambiguity belongs to the target-model owner.

A generic workbook owner cannot resolve all three.

## The source of truth should be able to answer questions

A practical test is whether the programme can answer important questions without assembling a temporary investigation team.

For example:

- Which source fields populate this SAP attribute?
- Which mappings depend on this value list?
- Which countries use a local exception?
- Which approved mappings have not been tested?
- Which target fields have no reliable source?
- Which mappings changed since the last mock load?
- Which datasets were used to validate them?
- Which issues are still open?
- Which rules will be affected by this model change?
- Which migrated values require post-go-live remediation?

If the repository cannot answer these questions, it may be storing mappings without governing them.

## A practical implementation pattern

We recommend beginning with a limited domain.

For example:

- one Business Partner scope;
- one or two source systems;
- 50–100 critical mappings;
- current value mappings;
- one representative dataset;
- the most important validation rules;
- current open decisions.

### Step 1: Inventory current sources

Collect:

- mapping workbooks;
- data dictionaries;
- target designs;
- Jira issues;
- value-mapping files;
- validation reports;
- sample datasets.

Do not immediately merge everything.

First identify which artefact currently owns which decision.

### Step 2: Define canonical object types

At minimum:

- Attribute;
- SourceEndpoint;
- TargetEndpoint;
- Mapping;
- TransformationRule;
- ValueList;
- ValueMapping;
- Context;
- Decision;
- Issue.

Keep the initial model small.

### Step 3: Assign stable identifiers

Do not use workbook row numbers.

Identifiers should remain stable when files and labels change.

### Step 4: Import the current mappings

Preserve original source references.

Do not pretend the imported data is clean.

Flag:

- missing targets;
- missing contexts;
- duplicate mappings;
- unclear transformations;
- missing ownership;
- unresolved values.

### Step 5: Connect an actual dataset

Profile the current extract.

Compare model expectations with:

- columns;
- completeness;
- value distributions;
- reference values;
- context coverage.

### Step 6: Validate the model

Check structural consistency before architectural review.

### Step 7: Generate role-specific views

Export a business review workbook, migration gap report and architecture impact view.

### Step 8: Establish the change path

Define how proposed changes enter the canonical model and how updated views are regenerated.

The pilot is successful when the programme stops manually reconciling several interpretations of the same mappings.

## Where Martenweave fits

We built Martenweave around this model.

Martenweave turns knowledge from spreadsheets, datasets, tickets, validation reports, decisions and SAP context into structured model objects. The current product model supports attributes, contexts, field endpoints, mappings, value lists, rules, issues, decisions and controlled change proposals.

The canonical source is maintained in readable Markdown and YAML files. Deterministic validators check object identity, references and structural consistency before generated indexes and reports are built. The current core also supports CSV and XLSX review flows, dataset profiling, gap detection, lineage, impact analysis and a PatchProposal-to-ChangeRequest lifecycle.

For SAP migration scenarios, Martenweave can connect legacy columns to SAP field endpoints, represent different organisational contexts and compare the expected model with actual CSV or XLSX datasets.

Our intended operating model is:

```text
Integrations bring input.
Martenweave stores model knowledge.
Validators check consistency.
AI proposes changes.
Humans approve.
Reports create business value.
```

Martenweave does not replace SAP MDG, migration execution, Jira or Excel.

It gives those tools a shared model reference.

## AI and the mapping source of truth

AI can help with mapping work.

It can:

- extract candidate mappings from documents;
- identify possible duplicates;
- suggest transformation rules;
- compare source and target descriptions;
- detect missing evidence;
- summarise issues;
- draft value mappings;
- propose updates from tickets.

It should not change the approved mapping model directly.

An AI suggestion should become a reviewable proposal containing:

- affected objects;
- proposed change;
- source evidence;
- confidence or uncertainty;
- validation results;
- expected impact.

The team then approves, rejects or modifies the proposal.

This protects the source of truth from becoming a generated collection of plausible but unverified mappings.

SAP’s current MDG positioning also emphasises governed models, trusted data and steward workflows. The same governance principle should apply to AI-assisted implementation knowledge.

## Common mistakes

### Declaring a workbook authoritative without controlling other changes

The workbook cannot be the source of truth if configuration, code and local files change independently.

### Copying every project artefact into one repository

A source of truth should connect relevant evidence, not become an uncontrolled archive.

### Modelling only physical fields

Business meaning, context and ownership need independent representation.

### Ignoring actual datasets

A clean mapping model can still describe data that does not exist.

### Allowing local teams to maintain detached copies

Local variation should be modelled as variation, not hidden in separate truth.

### Treating generated reports as canonical

Reports are views. The structured approved model should remain canonical.

### Automating imports without review

Importing a spreadsheet does not mean accepting every row as approved truth.

### Measuring repository size instead of usefulness

The number of model objects is less important than the programme’s ability to answer impact, readiness and ownership questions.

## What management should expect

Managers should not be asked to approve a technical repository.

They should expect measurable improvements in delivery control.

A functioning source of truth should allow the programme to demonstrate:

- one identifiable approved mapping baseline;
- visible differences between versions;
- clear ownership of critical objects;
- alignment between global and local mappings;
- current dataset coverage;
- explicit unresolved gaps;
- traceability to decisions and evidence;
- impact analysis before change;
- consistent outputs for business, migration and testing;
- a usable handover to AMS.

These outcomes show that the model is authoritative in practice.

## How this reduces project risk

The immediate benefit is not fewer spreadsheets.

The benefit is fewer uncontrolled interpretations.

A governed mapping model reduces the risk of:

- loading against an outdated target;
- applying different rules by workstream;
- losing local exceptions;
- accepting incomplete value mappings;
- repeating design analysis;
- changing fields without understanding dependencies;
- handing over unexplained migration logic;
- becoming dependent on one workbook owner or consultant.

The main time saving comes from reducing reconstruction.

A decision should not need to be rediscovered during every design change, mock load and support incident.

## When a single workbook may still be enough

For a small migration, a well-managed workbook may provide sufficient control.

This is more likely when:

- there is one source system;
- one target context;
- few stakeholders;
- limited value conversion;
- a stable model;
- low change volume;
- short project duration;
- low cost of error.

In that case, the workbook can be the canonical source if:

- ownership is clear;
- changes are controlled;
- versions are managed;
- the current dataset is checked;
- approvals are explicit;
- the document can be handed over.

We do not recommend introducing a registry solely because the project uses Excel.

We recommend it when the relationships have outgrown what one document can reliably control.

## Our conclusion

A single source of truth for SAP mappings is not one file with an official label.

It is a controlled model that can explain:

- what the attribute means;
- where the value comes from;
- where it goes;
- how it changes;
- which context applies;
- who approved the rule;
- which evidence supports it;
- what will be affected if it changes.

The programme may continue to use many tools.

The truth becomes single when those tools refer to the same stable model objects and when approved changes flow through one controlled process.

Our recommendation is therefore not “replace Excel.”

It is:

> Separate the canonical mapping model from the formats used to collect, review, implement and report it.

That distinction allows business teams to keep familiar working methods while giving architects and delivery leads the traceability, validation and change control needed for a complex SAP programme.

A repository becomes the source of truth only when the team can trust it more than individual documents, environments or memories.

That trust has to be designed.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We work on practical model governance for SAP migration, MDG, MDM and AMS programmes. We focus on helping teams connect business meaning, physical mappings, datasets, decisions and change history without forcing every part of the programme into another large platform.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a governance layer for business-critical data, with governed models, golden records, profiling, matching, consolidation, steward workflows, validated values, quality monitoring and audit trails.

SAP also describes a single source of truth in the context of uniting SAP and third-party master-data sources. Our use of the term in this article is narrower: the controlled implementation model for SAP mappings and their supporting decisions.

Martenweave’s public product materials describe canonical model objects, deterministic validation, generated indexes, spreadsheet review flows, dataset profiling, gap detection, traceability, impact analysis and controlled change proposals.

The Martenweave SAP migration scenario documents explicit source-to-target mappings, organisational context and dataset comparison.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
