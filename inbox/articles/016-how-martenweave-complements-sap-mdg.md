# How Martenweave Complements SAP MDG

**Reviewed: 14 July 2026**

A company has already invested in SAP Master Data Governance.

It has governed data models, change requests, validations, workflows, stewardship roles and integration with SAP systems.

Then someone proposes introducing Martenweave.

The first reaction is reasonable:

> Why do we need another model tool if SAP MDG already governs the master data?

A weak answer would be that Martenweave provides better documentation, more AI or a simpler interface.

That is not a sufficient reason to add another component to an enterprise architecture.

The stronger answer begins with a distinction.

SAP MDG governs master data in operation.

Martenweave governs the implementation knowledge used to design, migrate, validate, change and support that governed model.

The two products should not compete for ownership of the same operational process.

They address different layers of the problem.

SAP describes SAP Master Data Governance as a central governance layer that unifies master data, policy and metadata. Its current capabilities include governed models, golden records, profiling, matching, consolidation, workflow-based changes, validated values, data-quality monitoring, mass processing and auditable data changes.

Martenweave does not attempt to reproduce those capabilities.

It does not create or approve operational Business Partners. It does not replace MDG change requests. It does not distribute master data. It does not become the authoritative transactional master-data platform.

Instead, it helps answer questions that surround an MDG implementation:

- What is the approved model specification?
- Which source fields populate each target attribute?
- Which dataset gaps prevent migration?
- Why does a validation rule exist?
- Which mappings and tests are affected by a change?
- Which local exceptions differ from the global design?
- Which decisions produced the current configuration?
- What knowledge must be handed over to AMS?
- Can AI propose a model update without changing the approved model directly?

This is the space where Martenweave complements SAP MDG.

## The difference between governed data and governed model knowledge

Consider one supplier record.

SAP MDG may govern:

- the supplier identity;
- purchasing and company-code extensions;
- tax information;
- bank details;
- approval workflow;
- duplicate checks;
- validation;
- activation;
- distribution.

Martenweave may govern the knowledge explaining:

- what each supplier attribute means;
- which legacy fields supplied it;
- which transformations were applied;
- which value mappings were approved;
- which country rules apply;
- which SAP endpoints represent it;
- which validations implement the policy;
- which decisions changed the model;
- which datasets were used to verify readiness;
- which tests should be repeated after a change.

SAP MDG manages the record and its operational governance lifecycle.

Martenweave manages the structured knowledge around the model and its delivery lifecycle.

A simple representation is:

```text
SAP MDG
Governed master data
Workflows
Operational validation
Stewardship
Golden records
Distribution

Martenweave
Model specification
Source-to-target lineage
Dataset gaps
Impact analysis
Decision traceability
Change proposals
Implementation handover
```

There is overlap in terminology because both deal with models, rules and ownership.

The authority is different.

## SAP MDG should remain the operational authority

Introducing Martenweave should not create ambiguity about where operational master data is governed.

For an SAP MDG implementation, SAP MDG should continue to own the processes it is designed to operate:

- creation and maintenance of governed master data;
- change-request execution;
- workflow routing;
- validation and derivation during operational processing;
- matching and consolidation where implemented;
- activation of approved records;
- data-quality monitoring;
- distribution into the connected landscape;
- audit of operational data changes.

SAP’s current product description explicitly positions MDG around governed golden records, steward workflows, validation, quality monitoring and auditability.

Martenweave should not become an alternative approval channel for operational master-data changes.

It should not accept a model proposal and silently write directly into production MDG configuration or governed records.

Its role is to make a proposed implementation change understandable and reviewable before responsible teams execute it through established SAP and release-management processes.

## Where SAP MDG does not remove the need for an independent model layer

SAP MDG contains the operational data model and its configured behaviour.

An implementation programme still creates substantial knowledge outside the platform.

That knowledge includes:

- business definitions;
- global and local requirements;
- source-system inventories;
- legacy field interpretations;
- migration mappings;
- transformation logic;
- value translations;
- dataset profiles;
- migration exceptions;
- architecture decisions;
- configuration deviations;
- test evidence;
- unresolved remediation;
- impact assessments;
- handover context.

Some of this information may be linked to MDG documentation or configuration.

Much of it naturally lives in other systems:

- Excel;
- Jira;
- Confluence;
- SharePoint;
- migration tools;
- source extracts;
- test-management tools;
- integration repositories;
- email and meeting notes.

The problem is not that these tools exist.

The problem is that they rarely share a controlled identity for the model objects they describe.

A business attribute may appear under one name in design, another in a legacy source and a third in SAP.

A rule may be discussed in a ticket, implemented in MDG, partially duplicated in migration and tested under another label.

Martenweave provides the layer that connects these representations.

## The role of Martenweave before an MDG implementation

Martenweave can create value before SAP MDG configuration begins.

At this stage, organisations often have:

- existing data models;
- local workbooks;
- source-system metadata;
- incomplete business definitions;
- inconsistent code lists;
- previous implementation documents;
- data-quality reports;
- open architectural decisions.

The programme needs to establish what should be governed before configuring how it will be governed.

Martenweave can help structure:

- domains;
- entities;
- attributes;
- relationships;
- contexts;
- owners;
- source endpoints;
- proposed target endpoints;
- value lists;
- business rules;
- unresolved questions.

The output is not a replacement for SAP MDG design.

It is an independent, reviewable model specification that can guide that design.

A useful early workflow is:

```text
Existing documents and datasets
             ↓
Structured candidate model
             ↓
Reference and ownership validation
             ↓
Dataset-to-model gap analysis
             ↓
Business and architecture review
             ↓
Approved model baseline
             ↓
SAP MDG design and configuration
```

This reduces the risk that the configuration process becomes the first place where incompatible definitions and source limitations meet.

## The role during migration

SAP recommends curating master data before an S/4HANA implementation because more automated processes depend on clean and correct master data.

Migration requires more than cleaning records.

The programme must connect:

- source fields;
- business meaning;
- target attributes;
- transformation rules;
- value mappings;
- organisational contexts;
- validation;
- evidence.

Martenweave can model that chain explicitly:

```text
Legacy dataset column
→ source field endpoint
→ mapping
→ transformation
→ business attribute
→ organisational context
→ SAP target endpoint
→ validation rule
```

This supports questions that are often difficult to answer from one mapping workbook:

- Which required target attributes have no reliable source?
- Which source columns are absent from the latest extract?
- Which actual source values are not covered?
- Which mappings use unapproved defaults?
- Which country exceptions exist?
- Which target changes invalidate earlier mapping approval?
- Which relationships cannot be reconstructed?
- Which dataset version was used to validate the mapping?

SAP MDG remains the governed target.

Migration tooling remains responsible for extraction, transformation and loading.

Martenweave provides the model traceability between them.

## The role during MDG configuration

Configuration translates the intended model into operational behaviour.

This translation is not always direct.

During implementation, teams discover:

- technical constraints;
- required extensions;
- workflow dependencies;
- source-data limitations;
- performance considerations;
- local legal requirements;
- different interpretations of an attribute.

These discoveries may require the model to change.

Martenweave provides a controlled place to represent the intended change before configuration silently becomes the new architecture.

For example:

```text
Current attribute:
Supplier Risk Classification

Proposed change:
Add value “Under Review”

Potential impact:
- workflow routing;
- migration defaults;
- interface contracts;
- data-quality reports;
- existing supplier population;
- stewardship ownership;
```

The proposal can be validated, reviewed and approved.

SAP teams then implement the approved change in MDG.

The resulting configuration can be linked back to the model object and decision.

## The role during testing

Testing frequently exposes disagreement between several versions of the model.

A failed test may be caused by:

- incorrect source data;
- incorrect mapping;
- incomplete value mapping;
- wrong target configuration;
- ambiguous requirement;
- outdated test expectation;
- missing local context.

Without a connected model, these problems arrive in one defect queue and require repeated investigation.

Martenweave can connect defects and evidence to:

- affected attributes;
- mappings;
- rules;
- contexts;
- datasets;
- model baselines;
- decisions.

This allows the programme to classify the actual cause.

For example:

```text
Failed supplier load
        ↓
Validation RULE-SUPPLIER-TAX-DE
        ↓
Attribute ATTR-SUPPLIER-TAX-ID
        ↓
Mapping MAP-LEGACY-VENDOR-TAX
        ↓
Dataset profile shows 28% blank values
        ↓
Open business decision on exemption handling
```

The load defect is then understood as a source-data and governance decision gap rather than a generic technical error.

## The role in model change control

An SAP MDG solution continues changing after initial implementation.

Common requests include:

- adding a value;
- changing optionality;
- introducing a local exception;
- adjusting workflow routing;
- replacing a source field;
- changing a validation;
- adding an organisational context;
- revising matching behaviour.

The implementation task may be small.

The impact may be broad.

Martenweave can identify relationships to:

- mappings;
- value lists;
- source endpoints;
- datasets;
- rules;
- decisions;
- tests;
- ownership.

A change proposal can therefore include more than a request such as:

> Make field X mandatory.

It can show:

- the affected business attribute;
- current and proposed states;
- contexts;
- current-data population;
- incomplete sources;
- migration impact;
- rule impact;
- test impact;
- known consumers;
- required approvals.

The approved change is still implemented through SAP configuration and release controls.

Martenweave improves the evidence available before that implementation.

## The role after go-live

After go-live, the main value shifts from delivery readiness to knowledge continuity.

AMS teams need to understand:

- why a rule exists;
- where a value came from;
- whether a difference is intentional;
- who owns an attribute;
- which systems depend on a field;
- what tests are required after a change;
- which migration exceptions remain;
- whether a local rule belongs in the global model.

Project documentation rarely stays aligned automatically.

Martenweave can maintain the living model separately from the historical project archive.

The historical evidence includes:

- design documents;
- migration files;
- test results;
- release records;
- old datasets.

The living model contains the current:

- definitions;
- relationships;
- owners;
- mappings;
- rules;
- decisions;
- exceptions;
- dependencies.

This does not turn Martenweave into an AMS ticketing platform.

Jira or another service-management system can continue to track work.

Martenweave connects the issue to the model objects and preserves the approved result after the ticket closes.

## A practical division of responsibilities

A clear responsibility model prevents duplication.

| Capability | SAP MDG | Martenweave |
|---|---:|---:|
| Govern operational master records | Primary | No |
| Execute change-request workflows | Primary | No |
| Validate data during operational maintenance | Primary | Reference and trace rules |
| Matching and consolidation | Primary | Document dependencies and decisions |
| Activate and distribute governed data | Primary | No |
| Maintain independent model specification | Supporting documentation may exist | Primary |
| Connect legacy fields to target attributes | Not the main purpose | Primary |
| Compare datasets with model expectations | Partial, depending on implementation | Primary migration use case |
| Trace implementation decisions | Limited to surrounding process | Primary |
| Analyse model-change impact across project artefacts | Requires project-specific work | Primary |
| Generate reviewable model patch proposals | No | Primary |
| Preserve implementation knowledge for AMS | Requires additional documentation | Primary |

The table is not intended as a feature competition.

It shows that the two tools should occupy different architectural positions.

## The boundary must remain strict

Martenweave becomes dangerous if its product boundary is vague.

The current project documentation explicitly states that Martenweave is not:

- a full enterprise MDM replacement;
- a workflow engine;
- a generic data catalogue;
- a product certified by or affiliated with SAP;
- a replacement for SAP MDG, SAP S/4HANA, Jira or Confluence.

These boundaries should remain visible in product positioning and implementation design.

We would reject several possible directions.

### Direct operational master-data editing

Martenweave should not become another application for editing Business Partners or Materials.

### Parallel approval workflows

It should not replicate MDG change requests for operational data.

### Direct production write-back

Model proposals should not automatically alter production configuration or master records.

### Full metadata catalogue expansion

It should not attempt to ingest every enterprise data asset before proving its value for model delivery.

### Generic AI chatbot

The core value is structured, validated model knowledge—not a conversational layer over documents.

Protecting these boundaries keeps the product useful and understandable.

## What the current Martenweave core provides

Martenweave currently describes itself as a practical model-control layer that turns scattered knowledge from spreadsheets, datasets, tickets, validation reports, decisions and SAP context into structured model objects.

The current open-source core includes:

- canonical Markdown and YAML model files;
- deterministic validation;
- generated SQLite and JSONL indexes;
- search and structured queries;
- trace and impact analysis;
- dataset profiling and gap detection;
- health, ownership, audit and scorecard reports;
- CSV and XLSX review flows;
- a PatchProposal-to-ChangeRequest lifecycle;
- issue drafts and GitHub-ready change bundles.

This architecture is intentionally backend-first.

Canonical files remain the model source of truth.

Indexes and reports are generated.

AI-assisted changes become proposals rather than direct mutations.

This makes Martenweave suitable as a controlled layer beside SAP MDG rather than another operational master-data platform.

## The model should remain portable

An independent model specification has value only when the organisation controls it.

Canonical, readable files provide several advantages:

- version history;
- reviewable differences;
- portability;
- local operation;
- automation;
- reproducible indexes;
- independence from one user interface;
- easier handover between delivery partners.

This does not mean business users should edit YAML directly.

They can work through:

- generated workbooks;
- reports;
- review screens;
- diagrams;
- issue workflows.

The canonical format exists to protect model integrity, not to impose a developer interface on every stakeholder.

## Deterministic validation before AI

AI can help extract and organise implementation knowledge.

It can propose:

- candidate mappings;
- business definitions;
- value translations;
- lineage relationships;
- impacted objects;
- issue summaries;
- model changes.

AI cannot be assumed to know which conflicting project artefact is correct.

A ticket may contain a rejected option.

A mapping workbook may be outdated.

Two similar fields may represent different organisational contexts.

Martenweave therefore follows a safer sequence:

```text
Evidence
→ AI-generated proposal
→ deterministic structural validation
→ human review
→ approved ChangeRequest
→ implementation through established controls
```

This is particularly important in an SAP MDG environment where incorrect model assumptions can affect workflow, migration, compliance and downstream processing.

## Example: making a tax attribute mandatory

Suppose the business requests that a tax identifier become mandatory for German organisational Business Partners.

SAP MDG should ultimately enforce the approved operational rule.

Before configuration, Martenweave can help structure the decision.

### Model context

- Business Partner category: organisation
- Country: Germany
- Tax category: relevant German category
- Exemptions: to be defined

### Source-data evidence

- Legacy system A: 96% complete
- Legacy system B: 61% complete
- Legacy system C: field absent

### Migration impact

- 8,400 active records require enrichment
- 1,200 may qualify for an exception
- no approved treatment exists for the remainder

### Operational impact

- new and changed records will be blocked;
- old incomplete records may fail when edited;
- stewardship capacity is required;
- interface creation paths must be tested.

### Change impact

- validation rule;
- migration mapping;
- data-quality report;
- test cases;
- local business procedure;
- remediation backlog.

After responsible owners approve the treatment, the MDG team configures the rule.

Martenweave retains the model object, evidence, decision and dependencies.

SAP MDG enforces the operational result.

That is complementarity in practice.

## Example: adding a supplier classification value

The business requests a new value, `UNDER_REVIEW`.

In SAP MDG, the implementation may involve:

- adding the value;
- adjusting validation;
- updating workflow routing;
- testing maintenance and distribution.

Martenweave asks the surrounding questions:

- What does `UNDER_REVIEW` mean?
- Who may assign it?
- How is it cleared?
- Can migration use it as a default?
- Which existing records receive it?
- Which interfaces recognise it?
- Which reports use the classification?
- Is it a permanent value or temporary status?
- Which countries may use it?

The model proposal exposes these decisions before a small configuration update creates a large operational ambiguity.

## A sensible adoption pattern

We would not recommend modelling an entire SAP landscape before demonstrating value.

A small pilot should focus on a painful, bounded scenario.

For example:

- one Business Partner domain;
- one current mapping workbook;
- one representative dataset;
- 30–100 critical attributes;
- several validation rules;
- recent issues or change requests;
- one upcoming migration or release.

The pilot should demonstrate:

1. Import or structure the current model.
2. Assign stable identities.
3. Validate references.
4. Connect source and SAP target endpoints.
5. Profile a real dataset.
6. identify model and data gaps.
7. Trace one critical field.
8. analyse one proposed change.
9. produce a reviewable patch proposal.
10. generate a business-readable report.

The question is not whether Martenweave can store every object.

The question is whether it reduces a real delivery cost:

- repeated mapping reconciliation;
- late dataset-gap discovery;
- manual impact analysis;
- dependence on specific consultants;
- difficult handover;
- uncontrolled AI suggestions.

## When Martenweave may not be necessary

Not every SAP MDG implementation needs another model layer.

A disciplined combination of SAP documentation, Excel, Jira and configuration management may be enough when:

- the domain is small;
- there is one source system;
- there are few local variations;
- the model changes rarely;
- the team is stable;
- lineage is simple;
- handover risk is low;
- changes have limited downstream impact.

Adding Martenweave would be difficult to justify if it only duplicates existing documents.

The need grows when the programme has:

- several source systems;
- many countries;
- repeated migration waves;
- complex mappings;
- frequent model changes;
- multiple delivery partners;
- substantial local variation;
- strict audit or handover requirements;
- AI-assisted analysis;
- high key-person dependency.

We should be honest about this boundary.

Martenweave is useful when model relationships and change history have become difficult to manage through documents alone.

## When SAP MDG may not be necessary

The reverse distinction also matters.

A company should not implement SAP MDG merely because it has mapping or documentation problems.

SAP MDG is appropriate when the organisation needs operational master-data governance capabilities such as controlled creation and maintenance, workflows, validation, quality monitoring, golden records, consolidation or distribution across a substantial landscape.

Martenweave cannot provide those capabilities as a substitute.

An organisation may use Martenweave:

- before deciding on an MDM platform;
- during an S/4HANA migration without MDG;
- beside another MDM product;
- for model governance across files and delivery artefacts.

The products solve different decisions.

## The architectural principle

The relationship can be summarised in five lines:

```text
Integrations bring evidence.
Martenweave stores model truth.
Validators check structural consistency.
AI proposes changes.
Humans approve and SAP systems implement them.
```

This preserves clear authority.

SAP MDG remains responsible for governed operational data.

Martenweave remains responsible for the independent model specification and the evidence around its delivery and change.

## What management should expect

Management should not approve Martenweave because “AI needs more context” or because the project has too many spreadsheets.

It should expect specific outcomes.

A successful complementary layer should reduce the time required to:

- identify the approved model;
- find source-to-target mappings;
- detect missing source coverage;
- understand the impact of a field change;
- reconcile global and local requirements;
- explain validation rules;
- prepare migration readiness evidence;
- transfer implementation knowledge to AMS.

It should also increase visibility of:

- unresolved ownership;
- temporary defaults;
- stale mappings;
- broken references;
- unsupported target requirements;
- unreviewed AI proposals;
- production deviations.

If those outcomes cannot be demonstrated in a bounded pilot, the organisation should not add the layer.

## Common positioning mistakes

### Calling Martenweave an SAP MDG alternative

This creates the wrong expectation and places the product in a category it cannot credibly serve.

### Describing it as a documentation repository

Documentation is an output. The core value is structured, validated relationships.

### Leading with AI

AI is useful only after the model provides trustworthy context and review controls.

### Claiming one source of truth for all enterprise data

Martenweave stores model truth and related implementation knowledge. SAP MDG governs operational master data.

### Promising automatic architecture

Model suggestions still require business and technical judgement.

### Attempting direct SAP write-back too early

This would increase implementation risk and weaken the human-approval boundary.

### Expanding into a full enterprise platform

The strongest early value is in narrow, high-cost model delivery problems.

## Our conclusion

SAP MDG and Martenweave should not compete for ownership of master data.

SAP MDG governs the operational record:

- how it is created;
- how it is approved;
- how it is validated;
- how it is consolidated;
- how it is monitored;
- how it is distributed.

Martenweave governs the implementation knowledge around that record:

- what the model means;
- where values come from;
- how mappings work;
- which datasets support them;
- why rules exist;
- what a change affects;
- which exceptions remain;
- how knowledge survives handover.

The value of Martenweave is not that SAP MDG is incomplete as an MDM platform.

The value is that an MDG implementation creates a wider body of model knowledge than the operational platform alone is intended to manage.

Our test is simple:

> Can the programme explain, validate and change its MDG model without manually reconstructing knowledge from spreadsheets, tickets, datasets, configuration and former consultants?

When the answer is already yes, Martenweave may add little.

When the answer is no, Martenweave provides a focused control layer without attempting to replace the system that governs the actual master data.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We build practical model-governance infrastructure for SAP migration, MDG, MDM and AMS teams. Our focus is not replacing operational MDM platforms. It is preserving the model specification, evidence, lineage and change context required to implement and operate them with less rework and lower key-person dependency.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer supporting governed models, golden records, profiling, matching, consolidation, collaborative workflows, validated values, data-quality monitoring, mass changes and auditable data changes. SAP also recommends curating master data well before an SAP S/4HANA implementation.

Martenweave’s current public documentation describes it as a practical model-control layer that connects fields, attributes, rules, owners, issues and decisions and supports deterministic validation, dataset-gap detection, traceability, impact analysis and reviewable PatchProposals.

The current open-source core includes canonical Markdown and YAML files, generated SQLite and JSONL indexes, search, structured queries, trace and impact analysis, dataset profiling, reports, spreadsheet review flows and a PatchProposal-to-ChangeRequest lifecycle.

Martenweave’s documented boundaries state that it is not a full enterprise MDM replacement, workflow engine, generic data catalogue, SAP-certified product or replacement for SAP MDG, SAP S/4HANA, Jira or Confluence.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
