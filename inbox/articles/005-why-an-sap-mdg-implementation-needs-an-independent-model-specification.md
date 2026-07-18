# Why an SAP MDG Implementation Needs an Independent Model Specification

**Reviewed: 14 July 2026**

An SAP MDG implementation contains several versions of the model.

There is the model described in requirements. There is the model discussed during design workshops. There is the model recorded in mapping workbooks. There is the model configured in SAP. There is the model assumed by migration routines, integrations and test cases.

Ideally, these versions remain aligned.

In a real programme, they begin to diverge.

A field is added during configuration but not reflected in the mapping. A country exception is approved in a ticket but never enters the global design. A migration default becomes part of the loaded data without becoming part of the governance model. A validation rule is changed after testing, while the original design document remains marked as approved.

The system may still work. The project may continue to report progress. But the programme gradually loses the ability to answer a basic question:

> What is the currently approved model?

We recommend maintaining an independent model specification throughout an SAP MDG implementation.

By independent, we do not mean disconnected from SAP MDG. We mean that the approved model should exist in a form that is not dependent on one configuration environment, one workbook, one vendor or one project-management tool.

It should describe the model the programme intends to govern and provide a stable reference against which configuration, migration and changes can be checked.

## The configured system is necessary, but it is not the complete specification

SAP positions SAP Master Data Governance as a central governance layer for master data. It supports governed models, golden records, matching and consolidation, change-request workflows, validated values, data-quality monitoring, mass processing and auditable changes.

That makes SAP MDG the operational system for governed master data.

It does not automatically make the configured system the best place to preserve every element of implementation intent.

Configuration can tell us what currently exists in a particular environment. It may not explain:

- which business requirement created an attribute;
- why one design option was selected over another;
- which source systems can populate the attribute;
- which countries use different definitions;
- which migration transformations were approved;
- which rules are temporary;
- which downstream consumers depend on the field;
- which evidence supports a decision;
- which changes are planned but not yet transported;
- whether production, quality and development represent the same design state.

The system contains the implemented result.

The programme also needs to preserve the meaning, context and history surrounding that result.

## A model specification is not another design document

The phrase “model specification” can suggest a large document that is approved once and then becomes outdated.

That is not what we recommend.

A useful model specification is structured, versioned and connected to delivery.

It should contain identifiable model objects such as:

- domains;
- business entities;
- attributes;
- relationships;
- organisational contexts;
- source fields;
- target endpoints;
- mappings;
- value lists;
- validation rules;
- owners;
- decisions;
- issues;
- evidence;
- change proposals.

Each object should have a stable identity.

The specification should allow the programme to answer:

- What does this object mean?
- Where is it used?
- Who owns it?
- Which source data supports it?
- Which rules apply?
- Which decisions changed it?
- What will be affected if it changes?
- Is the configured implementation aligned with it?

This is different from a 200-page design document.

A document explains the design to a reader. A model specification gives the programme a controlled representation that can be reviewed, validated and compared.

The programme may still generate documents, workbooks and diagrams from that representation. Those outputs become views of the model rather than competing sources of truth.

## Why the SAP configuration alone is not enough

There are several practical reasons.

### Configuration reflects a technical state

A configured field or rule shows that something was built.

It does not necessarily show that the corresponding business decision is final.

During implementation, teams often configure options for testing before all decisions are closed. Temporary logic may be introduced. A workaround may be transported to keep a test cycle moving.

If the configured environment is treated as the sole specification, temporary implementation choices can quietly become approved architecture.

### Environments may differ

Development, quality and production do not always contain identical states.

Transports may be pending. Emergency corrections may have been applied. A configuration change may exist in one environment while related documentation and mappings reflect another.

The programme therefore needs a reference that distinguishes:

- approved design;
- current implementation;
- planned implementation;
- temporary deviation;
- production reality.

Without this distinction, teams can argue about which environment represents the truth.

### Some knowledge exists outside SAP

An MDG model depends on information that may never be stored directly in the platform:

- legacy source fields;
- migration transformations;
- dataset profiles;
- local requirements;
- rejected alternatives;
- project decisions;
- test evidence;
- remediation obligations;
- interface assumptions;
- planned decommissioning of source systems.

This knowledge still affects the correctness of the implementation.

A target attribute may be configured perfectly while the migration team cannot populate it. A validation rule may work correctly while no business owner accepts responsibility for the exceptions.

The configured system cannot be the complete specification because the implementation problem extends beyond the configured system.

## Why the requirements document is not enough

Requirements are essential, but they operate at a different level.

A requirement might state:

> Customer classification must be governed globally.

The model specification must make that statement implementable.

It needs to show:

- which business attribute represents the classification;
- whether there are several classification contexts;
- which target fields store it;
- which values are permitted;
- which countries require exceptions;
- which sources currently provide it;
- which mappings and transformations are needed;
- which validation rules apply;
- who owns the definition;
- which processes consume it.

Requirements explain what the organisation wants.

The specification connects that intention to the actual model.

Requirements also change.

If a requirement is updated, the programme needs to know which attributes, mappings, rules, interfaces and tests are affected. That relationship is difficult to maintain through document references alone.

## Why the mapping workbook is not enough

A mapping workbook focuses on movement from source to target.

That is necessary, especially during migration.

But a mapping does not fully define the governed object.

The same business attribute may:

- be populated from several sources;
- use different mappings by country;
- be maintained manually after go-live;
- participate in matching;
- trigger workflow routing;
- be mandatory only in specific contexts;
- use a governed value list;
- affect downstream integrations.

The workbook may record some of this information in columns and comments. As the programme grows, the row becomes an increasingly compressed representation of several different objects.

An independent specification separates the attribute, endpoint, mapping, context, rule and decision while preserving the relationships between them.

That allows one element to change without rewriting the meaning of the others.

## Why Jira and Confluence are not enough

Jira, Azure DevOps, Confluence and SharePoint are useful project tools.

We use and recommend them for the purposes they serve well.

Tickets are good for assigning work, discussing defects and tracking delivery. Documentation platforms are good for narrative explanations, meeting notes and accessible project communication.

They are not naturally structured around the model itself.

A Jira issue can state that a validation rule must change. It does not automatically know:

- which attributes use the rule;
- which mappings are affected;
- which datasets must be rechecked;
- which tests must be repeated;
- which countries rely on the current behaviour.

A Confluence page can describe a domain model. It does not automatically validate broken references or detect that a target field has no corresponding source mapping.

The problem is not the quality of the tools. The problem is asking them to perform model control indirectly through links and prose.

We prefer to keep issues in the issue system and documentation in the documentation system, while connecting both to stable model objects.

## The specification should sit between intent and implementation

A useful architecture looks like this:

```text
Business requirements and decisions
                 ↓
Independent model specification
                 ↓
SAP MDG configuration and workflows
                 ↓
Migration, integration and testing
                 ↓
Operational governance and AMS
```

The specification is not a replacement for any layer.

It translates between them.

From the business side, it receives definitions, ownership, policies and decisions.

From the technical side, it connects those concepts to SAP fields, contexts, rules, mappings and interfaces.

From migration, it receives evidence about source-data availability and transformation needs.

From testing, it receives evidence that the intended behaviour has been verified.

From AMS, it receives model changes and operational findings.

This creates a controlled feedback loop instead of a one-directional handover from requirements to configuration.

## What should be inside the specification

The exact structure will vary by domain, but several elements are consistently useful.

## Business entities

The specification should identify the main business objects and their boundaries.

For Business Partner, that may include:

- person or organisation;
- customer role;
- supplier role;
- address;
- tax registration;
- bank details;
- relationships;
- organisational assignments.

For Material or Product, the structure will be different.

The important point is that the entity model should be explicit rather than assumed from field groupings.

## Attributes

Attributes should have:

- stable identifiers;
- clear definitions;
- ownership;
- data type or value domain;
- lifecycle status;
- relevant contexts;
- sensitivity or regulatory relevance where applicable.

A business attribute should not be confused with one physical field.

One attribute may be represented by several source and target endpoints.

## Contexts

SAP master data often varies by organisational level.

The specification should represent contexts such as:

- company code;
- sales area;
- purchasing organisation;
- plant;
- country;
- business process;
- partner role.

Context should not exist only in a note.

A rule applying to one sales area is not the same rule as a global requirement with an informal exception.

## Source and target endpoints

The specification should connect the business model to physical implementation.

This includes:

- legacy tables and columns;
- files and datasets;
- SAP tables and fields;
- APIs;
- message attributes;
- interface structures;
- MDG entities and attributes where relevant.

Endpoints can change without changing the business meaning.

That is another reason to keep them separate from the attribute itself.

## Mappings and transformations

Mappings should describe the relationship between source and target.

They should include:

- applicable context;
- transformation logic;
- defaulting;
- filtering;
- concatenation or splitting;
- derivation;
- status;
- owner;
- evidence;
- known exceptions.

A transformation that changes business meaning should require business approval, not only technical review.

## Value lists and mappings

Code lists deserve separate treatment.

The specification should show:

- permitted target values;
- source values;
- translations;
- inactive values;
- unmapped values;
- defaults;
- local variants;
- effective dates;
- owner.

A field mapping can be complete while the value mapping remains unusable.

## Rules

Rules should have a business definition independent from their technical implementation.

A rule may be implemented in:

- SAP MDG validation;
- derivation logic;
- migration code;
- an interface;
- source-system controls;
- reporting;
- manual stewardship procedures.

The specification should make clear where the rule is expected to operate and why.

## Decisions

Important decisions should be attached to affected objects.

A useful decision record contains:

- the issue being decided;
- alternatives considered;
- selected option;
- rationale;
- evidence;
- approver;
- applicable context;
- review condition.

This prevents the approved model from becoming a collection of unexplained outcomes.

## Evidence

Evidence may include:

- data profiles;
- legal requirements;
- business-process documentation;
- test results;
- defect analysis;
- interface specifications;
- workshop outcomes;
- source-system extracts.

Not every detail needs to be copied into the specification.

The model should retain enough context to locate and evaluate the supporting material.

## How the specification should behave

A specification is useful only if it remains operational.

We expect it to support several behaviours.

### It should be versioned

The team should be able to compare two approved states.

A model change should show:

- what was added;
- what was removed;
- what was modified;
- which relationships changed;
- who approved it;
- why it changed.

File names such as `final_v9_updated` are not sufficient change control.

### It should be validatable

The programme should automatically detect structural problems such as:

- duplicate identifiers;
- missing references;
- invalid object types;
- mappings without endpoints;
- rules without owners;
- references to retired objects;
- missing mandatory context.

Validation does not replace architecture review.

It prevents architects from spending time on errors that a deterministic check can identify.

### It should be searchable

An architect should be able to search for a business term, SAP field, source column, decision or identifier and find the connected objects.

Search is especially important when domains contain hundreds or thousands of elements.

### It should support lineage

The programme should be able to trace:

```text
Legacy field
→ mapping
→ business attribute
→ SAP target endpoint
→ validation rule
→ consuming process
```

The exact chain varies by scenario.

The principle is that relationships should be explicit enough to follow.

### It should support impact analysis

Before changing an attribute or rule, the programme should identify likely downstream effects.

Impact analysis should help answer:

- Which mappings depend on this attribute?
- Which datasets contain it?
- Which rules refer to it?
- Which countries use it?
- Which interfaces consume it?
- Which tests should be repeated?
- Which decisions may need review?

The result is a starting point for architectural judgement, not an automatic approval.

### It should produce role-specific views

Business owners should not need to inspect technical model files.

Migration teams need mapping and dataset views.

Architects need relationships and impact.

Managers need readiness and risk summaries.

AMS needs understandable operational context.

One specification can produce several outputs while keeping the underlying model consistent.

## Independence protects the client

An independent specification has an organisational value beyond documentation.

It reduces dependence on:

- one implementation partner;
- one product configuration team;
- one spreadsheet owner;
- one architect;
- one environment;
- one proprietary documentation format.

The client retains a representation of its own model and the reasoning behind it.

This does not eliminate the need for experienced SAP MDG specialists. It makes their work more transferable and reviewable.

A programme should not have to rehire the original implementation team simply to understand why a field, rule or exception exists.

## Independence also protects the implementation partner

This is not only a client-control argument.

A clear specification helps an implementation partner demonstrate:

- what was approved;
- what remains open;
- which assumptions were provided by the client;
- which changes affected scope;
- which data limitations caused rework;
- which configuration corresponds to which decision.

Without a shared specification, disputes often become arguments about documents and meeting memory.

A controlled model makes responsibilities and changes more explicit.

## The specification should not become a second MDG implementation

There is an obvious risk.

A team may attempt to model every technical detail, every configuration setting and every project artefact in an external repository.

That creates duplication and administrative overhead.

We avoid this by using a simple rule:

> Store the model knowledge required to understand, validate and change the implementation. Do not reproduce information that another system already governs reliably.

For example, the independent specification may need to know that an attribute uses a particular approval rule. It may not need to reproduce every technical workflow node.

It may need to know that a target endpoint exists. It does not need to become a complete copy of the SAP data dictionary.

It may link to a test case. It does not need to replace the test-management system.

The specification is a control layer, not an archive of everything.

## How to keep the specification aligned with SAP MDG

Alignment requires a defined process.

We recommend the following cycle.

### 1. Propose the model change

The change should identify:

- affected objects;
- rationale;
- expected outcome;
- relevant evidence;
- requester.

### 2. Analyse impact

Architects and delivery teams review:

- configuration impact;
- migration impact;
- data impact;
- integration impact;
- test impact;
- operational impact.

### 3. Approve the model change

The appropriate owners approve the intended model state.

This should happen before the implementation becomes the de facto decision.

### 4. Implement the change

The MDG team configures the approved change.

Migration, integration and testing teams update their corresponding artefacts.

### 5. Verify alignment

The programme checks that:

- the configured implementation matches the approved model;
- related mappings were updated;
- validation and tests reflect the change;
- unresolved deviations are visible.

### 6. Record evidence

Test results, deployment references and relevant decisions are connected to the changed objects.

This cycle can be lightweight for minor changes and more formal for high-impact changes.

The important part is the sequence: approve intent, implement, verify.

## Common objections

## “SAP MDG already contains the model”

It contains the configured operational model.

The independent specification contains the approved implementation intent and its relationships to sources, mappings, decisions, evidence and changes.

They overlap, but they are not identical.

## “This creates duplicate maintenance”

It can, if the specification reproduces technical details indiscriminately.

A well-designed specification stores only the elements required for control and traceability.

The cost should also be compared with the current alternative: repeated workbook reconciliation, manual impact analysis, outdated documentation and knowledge reconstruction.

## “Our documentation is already in Confluence”

Confluence may remain the right place for readable architecture documentation.

The question is whether the underlying model can be validated, compared and traced.

A document page and a structured specification serve different purposes.

## “The model will change too often”

Frequent change is a reason for versioned model control, not an argument against it.

A static document becomes obsolete quickly. A structured specification can show how the model evolved.

## “Business users will not work with model files”

They should not have to.

Business users can review generated tables, workbooks, reports and diagrams.

The canonical representation exists to maintain consistency, not to impose a technical interface on every participant.

## A practical example

Consider a global supplier-governance implementation.

The programme defines a supplier risk classification.

The approved business concept appears simple:

- Low;
- Medium;
- High.

During implementation, the team discovers:

- one country uses four risk levels;
- another system stores a numeric score;
- one source has no classification;
- the approval workflow depends on the risk level;
- a downstream procurement application expects legacy codes;
- migration proposes defaulting missing values to Medium;
- compliance requires High-risk suppliers to receive additional review.

If the information remains distributed, the programme may end with:

- one definition in Confluence;
- one field in SAP MDG;
- one value mapping in Excel;
- one default in migration code;
- one workflow condition in configuration;
- one compliance decision in a ticket;
- one interface translation in middleware.

Each component may work.

The programme still lacks a coherent representation of the classification.

An independent specification connects:

- the business attribute;
- its allowed values;
- local variants;
- source fields;
- score transformation;
- defaulting decision;
- workflow impact;
- compliance rule;
- target endpoint;
- interface mapping;
- tests;
- affected owners.

A change to the classification can then be reviewed as a model change rather than a collection of unrelated technical updates.

## Where Martenweave fits

We built Martenweave as this type of independent model-control layer.

Martenweave stores model knowledge from spreadsheets, datasets, tickets, validation reports, decisions and SAP context as structured objects. The model can include attributes, contexts, source and target endpoints, mappings, rules, value lists, issues, decisions and change proposals.

The current core supports:

- canonical Markdown and YAML model files;
- deterministic validation;
- generated SQLite and JSONL indexes;
- search and structured queries;
- trace and impact analysis;
- dataset profiling and gap detection;
- ownership, audit and readiness reports;
- CSV and XLSX review flows;
- reviewable PatchProposal and ChangeRequest lifecycles.

The canonical files remain the approved source of model truth. Generated indexes and reports can be rebuilt from them.

This architecture is deliberate.

It means the model is:

- readable;
- versionable;
- portable;
- reviewable;
- independent from one database or UI;
- suitable for Git-based change control;
- usable by automation and AI without allowing silent mutation.

SAP MDG remains the operational governance platform. Martenweave records and validates the model knowledge used to design, migrate, test and maintain it.

## A minimum viable independent specification

A programme does not need to model the whole enterprise on day one.

We recommend starting with one domain and the objects carrying the greatest delivery risk.

For example:

- 20–50 critical business attributes;
- relevant organisational contexts;
- source fields from one or two systems;
- SAP target endpoints;
- important mappings;
- governed value lists;
- high-risk validation rules;
- open decisions;
- known dataset gaps;
- ownership.

This is enough to test the operating model.

The team should then verify that it can:

1. validate the model;
2. compare it with a real dataset;
3. trace source to target;
4. identify the impact of one change;
5. produce a business-readable review;
6. preserve an approved decision;
7. update the model through controlled review.

If these actions work, the specification can expand with the programme.

## What management should expect

Management does not need another large documentation deliverable.

It should expect a controlled capability.

The programme should be able to demonstrate:

- a clearly identified approved model;
- traceability from business concept to SAP implementation;
- visibility of source-data gaps;
- connection between decisions and affected objects;
- controlled model changes;
- impact analysis before implementation;
- evidence that configuration reflects the approved model;
- an understandable handover to AMS.

These outcomes are more valuable than the number of completed design pages.

## How this reduces delivery time

Maintaining an independent specification requires effort.

But it replaces repeated work that already exists:

- reconciling mapping workbooks;
- comparing environments manually;
- rebuilding the context behind old tickets;
- repeating design workshops after team changes;
- searching for affected interfaces and tests;
- preparing handover documents from scratch;
- explaining why configuration differs from documentation.

The goal is not to eliminate discussion.

It is to ensure that discussions begin from an accurate model rather than from fragmented memories.

The largest time saving comes from avoiding repeated discovery.

A model decision should be analysed once, recorded properly and reused whenever the object is reviewed or changed.

## What the specification cannot do

An independent specification does not create good architecture by itself.

It cannot replace:

- qualified SAP MDG design;
- business ownership;
- data stewardship;
- migration engineering;
- integration design;
- testing;
- organisational change.

It can represent weak decisions just as accurately as strong ones.

Its value is that those decisions become visible, reviewable and traceable.

That gives the programme a chance to correct them before they become embedded across configuration, migration and operations.

## Our conclusion

An SAP MDG implementation needs two forms of truth.

The first is operational truth: the governed master data and active behaviour of the platform.

The second is implementation truth: the approved model, its meaning, its sources, its mappings, its decisions and its expected effects.

SAP MDG is designed to govern the first.

The programme must deliberately preserve the second.

We recommend an independent model specification because no single configuration environment, workbook, ticket system or design document can reliably carry the complete implementation model.

The specification should not compete with SAP MDG.

It should make the implementation easier to design, validate, change and hand over.

Our test is simple:

> If the configuration team, migration team and business owner give different answers about what the model contains, the programme does not yet have an approved model—it has several interpretations.

A controlled specification turns those interpretations into one reviewable structure.

That is not additional architecture for its own sake.

It is a practical way to reduce rework, expose risk earlier and make the organisation less dependent on the people who happened to be present during the original implementation.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We work on practical model governance for SAP migration, MDG, MDM and AMS programmes. We focus on helping architects and delivery teams maintain an independent, validated representation of the model connecting business intent, source data, SAP implementation and operational change.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP describes SAP Master Data Governance as a central governance hub supporting governed models, golden records, matching and consolidation, collaborative workflows, validated values, data-quality monitoring, mass processing and auditable changes.

SAP also recommends curating master data before an SAP S/4HANA implementation because automated target processes depend on clean and correct master data.

Martenweave’s public product materials describe its structured model objects, canonical files, deterministic validation, generated indexes, dataset profiling, gap detection, traceability, impact analysis and controlled change-proposal workflow.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
