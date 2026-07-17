# How Metalhatscats Helps Teams Establish Model Governance

**Reviewed: 14 July 2026**

A programme has already created most of the artefacts it needs.

There are mapping workbooks, target-model documents, data-quality reports, Jira issues, architecture decisions, migration extracts, SAP configuration notes and test results.

The organisation is not missing information.

It is missing control over how that information becomes an approved model.

Different teams answer the same questions differently:

- Which file contains the current mapping?
- Who owns the definition of this attribute?
- Is this local requirement permanent or temporary?
- Which source field is authoritative?
- Why was this target selected?
- Which dataset proves that the mapping works?
- What is affected if the field changes?
- Has the current SAP configuration implemented the approved decision?

The programme may call this a documentation problem.

It may start a new Confluence structure, catalogue initiative, governance forum or data-cleaning workstream.

These activities can help.

They do not establish model governance on their own.

Model governance exists when an organisation can consistently decide:

1. What model objects exist.
2. Which version is approved.
3. Who owns each important decision.
4. Which evidence supports the current state.
5. How proposed changes are validated and approved.
6. How the result remains traceable across implementation and support.

That is the capability Metalhatscats helps teams establish.

We do not begin by selling a large governance transformation.

We begin with one difficult model problem and test whether it can be made explicit, validated and maintainable.

## Model governance is not another committee

Many organisations already have governance structures.

They may have:

- a data council;
- domain owners;
- data stewards;
- architecture boards;
- design authorities;
- change-control meetings;
- quality dashboards.

The presence of these bodies does not guarantee that the model itself is controlled.

A governance meeting may approve a requirement without recording:

- the affected attribute;
- its source and target representations;
- applicable organisational context;
- mapping implications;
- dataset evidence;
- implementation dependencies;
- test obligations.

The meeting creates authority.

It does not automatically create traceability.

A model-governance process should connect the decision to the model objects that the decision changes.

For example:

```text
Business request
→ affected Attribute
→ applicable Context
→ Mapping impact
→ Rule impact
→ dataset evidence
→ decision
→ approved model change
→ implementation verification
```

Without that chain, governance remains separate from delivery.

## Model governance is not an MDM replacement

SAP currently presents SAP Master Data Governance as a central governance layer for master data, policies and metadata, with capabilities including governed models, golden records, matching and consolidation, steward workflows, validated values, quality monitoring and auditable changes.

Those capabilities operate around trusted master-data records and governed operational processes.

Metalhatscats does not propose replacing them.

Our work focuses on the implementation knowledge around those processes:

- definitions;
- mappings;
- source and target endpoints;
- datasets;
- contextual rules;
- decisions;
- gaps;
- change impact;
- handover evidence.

This distinction matters.

An organisation can have a strong operational MDM platform and weak control over the model knowledge used to implement, migrate and change it.

It can also have excellent model documentation without an operational MDM requirement.

The engagement begins by clarifying which problem actually exists.

## Model governance is not a data-catalogue rollout

A broad enterprise catalogue can help users discover:

- databases;
- tables;
- columns;
- reports;
- pipelines;
- data products;
- owners;
- policies;
- lineage.

That can be valuable input.

A delivery team still needs to decide which discovered assets participate in the approved implementation.

For example, a catalogue may identify four fields containing supplier classification information.

The project must still determine:

- which field is authoritative;
- whether the meanings are equivalent;
- which context applies;
- how values map;
- whether current datasets support the decision;
- who approves the treatment.

Metalhatscats helps establish that narrower decision layer.

We do not recommend recreating an enterprise catalogue inside Martenweave.

Where a catalogue exists, the model should reference its asset identities and use its metadata as evidence.

## The practical objective

Our objective is not to make every model perfect.

It is to make the critical parts governable.

For a selected scope, the organisation should be able to answer:

- What is the approved model?
- What remains proposed or uncertain?
- Which source and target representations implement each critical concept?
- Which rules and values apply in each context?
- Which datasets support the mappings?
- Which gaps are accepted?
- Which person or role has authority?
- What will be affected by change?
- Which evidence confirms implementation?

If these questions can be answered reliably, the organisation has the foundation of model governance.

## We start with a real delivery problem

A generic governance workshop often produces broad principles:

- establish ownership;
- improve quality;
- document lineage;
- standardise definitions;
- introduce change control.

These principles are reasonable.

They are difficult to validate until they are applied to an actual problem.

We prefer to begin with a bounded scenario such as:

- Business Partner tax data;
- supplier classifications;
- customer sales attributes;
- payment terms;
- local registration information;
- product classifications;
- organisational relationships;
- a field generating repeated AMS incidents.

The selected problem should already create visible cost:

- repeated mapping reconciliation;
- late data gaps;
- conflicting country requirements;
- failed migration tests;
- unclear ownership;
- manual impact analysis;
- dependence on one architect.

This keeps the work connected to business and programme value.

## Step 1: establish the governance boundary

Before building model objects, we clarify what the organisation wants to govern.

This may include:

- a complete domain;
- a subset of critical attributes;
- one migration wave;
- one global/local model conflict;
- one change process;
- one handover package.

We explicitly separate:

### Operational master-data governance

Performed by SAP MDG, another MDM platform or the source system.

### Model governance

Control of definitions, relationships, mappings, rules, evidence and approved model changes.

### Delivery management

Tasks, defects, owners and status managed through Jira or another project system.

### Narrative knowledge

Architecture explanations, procedures and training stored in Confluence or documentation systems.

The purpose is not to introduce more boundaries than necessary.

It is to stop several tools from claiming authority over the same decision.

## Step 2: identify model authority

Most programmes have several possible sources of truth.

For example:

- target-design workbook;
- SAP configuration;
- migration mapping;
- architecture document;
- data dictionary;
- local country file;
- test expectation.

These sources may conflict.

We do not select one automatically based on file date.

We establish an authority hierarchy.

A practical hierarchy may be:

```text
Approved canonical model
        ↓
Approved decisions and changes
        ↓
Implementation configuration and mappings
        ↓
Generated reports and views
        ↓
Working notes and proposals
```

This does not mean the canonical model is always correct.

It means changes to it must be explicit.

If production configuration differs, the difference becomes:

- an implementation defect;
- an approved deviation;
- evidence that the model needs to change.

It does not silently redefine the approved model.

## Step 3: build the minimum viable model

We avoid importing every field and document.

For the selected scope, we create the objects needed to answer real questions.

These may include:

- Domain;
- Entity;
- Attribute;
- EntityContext;
- FieldEndpoint;
- Mapping;
- ValueList;
- Rule;
- Dataset;
- Decision;
- Issue;
- owner relationship;
- implementation reference.

An example chain might be:

```text
Dataset column:
ERP_A.VENDOR_RISK

Source endpoint:
FEP-ERP-A-VENDOR-RISK

Mapping:
MAP-SUPPLIER-RISK-ERP-A

Business attribute:
ATTR-SUPPLIER-RISK

Target endpoint:
FEP-SAP-SUPPLIER-RISK

Rule:
RULE-SUPPLIER-RISK-HIGH

Decision:
DEC-SUPPLIER-RISK-004
```

The objective is not data modelling for its own sake.

Each object should support:

- validation;
- traceability;
- impact analysis;
- readiness;
- change control;
- handover.

## Step 4: preserve business meaning separately from physical fields

One recurring cause of rework is treating source and target fields as the model.

A field is a physical representation.

The business attribute provides semantic stability.

For example:

```text
Business attribute:
Customer Group for Sales Processing
```

may be represented by:

- a CRM segment field;
- a legacy ERP customer-class field;
- an SAP sales-area field;
- an outbound API property.

These representations can change while the business concept remains stable.

Separating them allows teams to:

- replace a source without redesigning the complete target interpretation;
- identify semantic conflicts between similarly named fields;
- represent global meaning with local mappings;
- preserve the reasoning behind technical choices.

This is one of the most important modelling disciplines we introduce.

## Step 5: encode context explicitly

Enterprise models rarely apply uniformly.

A rule may vary by:

- country;
- company code;
- sales area;
- purchasing organisation;
- plant;
- Business Partner category;
- partner role;
- record status;
- migration wave.

We help teams replace comments such as:

> Mandatory except for Portugal and historical suppliers.

with structured context:

```text
Attribute:
Tax Registration Identifier

Applies when:
- Country = DE
- Category = Organisation
- Role = Customer
- Status = Active

Exemption:
Approved exemption type EX-02
```

This makes applicability queryable and testable.

It also prevents local requirements from being copied into detached model versions.

## Step 6: connect the model to actual datasets

A target model can appear coherent while being impossible to populate.

We connect model expectations to representative CSV or XLSX data.

Checks may include:

- required-column presence;
- completeness;
- observed values;
- duplicates;
- key integrity;
- relationship integrity;
- value-mapping coverage;
- context-specific populations.

SAP currently recommends curating clean and correct master data well before an SAP S/4HANA implementation because more automated processes depend heavily on its quality.

Our role is to turn that principle into evidence connected to specific model objects.

For example:

```text
Target attribute:
Supplier Classification

Required population:
Active suppliers

Dataset completeness:
82%

Approved value coverage:
94% of populated records

Unresolved values:
STRAT, UNKNOWN

Result:
Target requirement is not yet supported by current source evidence.
```

This finding may lead to:

- source remediation;
- enrichment;
- a contextual rule;
- a temporary deviation;
- target-model revision.

The decision remains with responsible owners.

## Step 7: introduce deterministic validation

Martenweave’s current core uses canonical model files, disposable generated indexes and deterministic validation of IDs, object types, references and context rules before indexing.

We help teams distinguish two questions.

### Structural question

Is the model internally consistent?

Examples:

- identifiers are unique;
- referenced objects exist;
- source and target roles are valid;
- local overrides have global parents;
- active mappings do not use retired endpoints;
- critical objects have owners.

### Governance question

Is this the model the organisation intends to approve?

Examples:

- is the source semantically correct?
- is the default acceptable?
- should the rule apply globally?
- who owns the risk?

Deterministic validators handle the first category.

Human owners handle the second.

This division reduces clerical review work without automating authority.

## Step 8: establish a proposal-first change process

Uncontrolled model changes are a major source of drift.

Changes may arrive through:

- Excel edits;
- Jira tickets;
- dataset findings;
- configuration discoveries;
- AI suggestions;
- architecture decisions.

We help teams introduce a consistent boundary:

```text
Evidence
→ PatchProposal
→ deterministic validation
→ impact analysis
→ human review
→ ChangeRequest
→ approved canonical model
```

The current Martenweave architecture states that AI must not silently mutate the model: AI creates reviewable `PatchProposal` objects, while approved changes become `ChangeRequest`s.

The same proposal boundary should also apply to human and spreadsheet changes.

The important distinction is not human versus AI.

It is proposed versus approved.

## Step 9: connect decisions to model objects

A decision log is useful.

A decision graph is more useful.

For material decisions, we connect:

- problem;
- alternatives;
- selected treatment;
- rationale;
- evidence;
- approvers;
- applicable scope;
- affected model objects;
- review conditions;
- implementation references.

For example:

```text
Decision:
Permit temporary value MIGRATION_REVIEW.

Affected objects:
- Supplier Classification attribute
- ERP_B mapping
- target value list
- migration validation
- remediation report

Scope:
Inactive suppliers in Wave 2.

Restriction:
Value may not be used for newly created suppliers.

Expiry:
Before production cutover.
```

This allows future teams to answer why a value exists and when it should disappear.

## Step 10: make change impact visible

Before approving a model change, the team should know what else may require review.

A field change can affect:

- source mappings;
- value mappings;
- datasets;
- validations;
- derivations;
- workflows;
- interfaces;
- reports;
- tests;
- local variants;
- remediation.

Martenweave’s core currently includes search, trace and impact analysis commands over the canonical model.

We use these capabilities to build a bounded impact view.

The objective is not to show the largest possible graph.

It is to identify work that would otherwise be forgotten.

## Step 11: produce role-specific views

The canonical model should not require every user to work directly with Markdown and YAML.

We generate or design views for different roles.

### Business owner view

- definitions;
- scope;
- values;
- ownership;
- decisions;
- unresolved questions.

### Migration view

- source fields;
- target fields;
- transformations;
- dataset coverage;
- gaps.

### SAP architect view

- target endpoints;
- rules;
- contexts;
- configuration references;
- impacted tests.

### Programme view

- readiness;
- blockers;
- accepted deviations;
- ownership;
- decision ageing.

### AMS view

- current model;
- history;
- known exceptions;
- source and target trace;
- support ownership.

The current Martenweave core is CLI-driven and backend-first, with a generated static viewer and a local interactive prototype rather than a hosted editable production UI.

For business collaboration, generated spreadsheets and reports may therefore remain important.

We treat that as an operating reality, not a failure.

## Step 12: define the operating model

Technology does not establish governance by itself.

We help define who performs each part of the process.

A practical responsibility model may include:

### Domain owner

Approves business meaning and material policy.

### Data architect

Protects semantic coherence and model relationships.

### Source owner

Confirms source definition, availability and quality.

### SAP MDG architect

Confirms target implementation and platform behaviour.

### Migration lead

Owns mapping and transformation delivery.

### Local owner

Approves legitimate contextual variation.

### Test lead

Confirms evidence and regression scope.

### AMS owner

Maintains the model after go-live.

### Model repository maintainer

Operates validation, indexing and controlled changes.

The exact roles vary.

The key is that each material model object and decision has identifiable authority.

## Step 13: test governance with one real change

Governance principles are easy to agree with in theory.

We test them using a real request.

For example:

> Make Customer Group mandatory for Germany.

The process should identify:

- affected attribute;
- German context;
- source availability;
- incomplete population;
- mappings;
- target validation;
- downstream consumers;
- required reviewers;
- tests.

The result may be:

- approved;
- rejected;
- narrowed in scope;
- deferred pending remediation;
- accepted as a temporary deviation.

The quality of the decision is more important than whether the requested change proceeds.

If the organisation cannot process one real model change consistently, a larger governance framework will remain theoretical.

## Step 14: measure operational value

We do not measure success primarily by:

- number of objects imported;
- number of documents indexed;
- number of relationships drawn;
- number of dashboards produced.

We measure whether the organisation can perform important work more reliably.

Useful measures include:

- time required to identify the approved mapping;
- time required to trace a target field to its source;
- number of dataset gaps discovered before testing;
- time required for impact analysis;
- number of stale or conflicting artefacts found;
- number of critical objects with accountable owners;
- repeated defects caused by previously known issues;
- AMS dependence on the original project team;
- time required to prepare readiness evidence.

The objective is reduced reconstruction and rework.

## What a first engagement can contain

A bounded engagement may include:

### Model-governance diagnostic

We inspect selected artefacts and identify:

- competing sources of truth;
- unowned model objects;
- broken lifecycle boundaries;
- gaps between mappings, datasets and target design;
- key-person dependencies;
- missing change controls.

### Critical-domain model

We structure one domain or problem area into canonical objects and relationships.

### Validation baseline

We introduce deterministic checks appropriate to the selected scope.

### Dataset evidence

We profile one or more current datasets and connect findings to model objects.

### Trace and impact demonstration

We trace critical fields and analyse one real proposed change.

### Decision and proposal flow

We establish how proposed changes become reviewed model updates.

### Readiness or handover report

We produce a decision-oriented output for management, delivery or AMS.

### Operating recommendations

We define roles, review rules, maintenance routines and the next smallest scope.

This is not a complete enterprise governance rollout.

It is enough to test whether the capability produces value.

## Typical deliverables

Depending on scope, deliverables may include:

- canonical model repository;
- model-object inventory;
- source and target endpoint register;
- approved mapping baseline;
- validation ruleset;
- dataset profile and gap report;
- traceability report;
- impact-analysis example;
- decision register linked to model objects;
- PatchProposal and ChangeRequest examples;
- ownership matrix;
- readiness scorecard;
- operating runbook;
- GitHub issue backlog;
- pilot findings and scale recommendation.

The deliverables should remain usable after our engagement ends.

A consulting output that requires the same consultants to interpret it has not reduced dependency.

## What we deliberately do not do

Focus is part of the offer.

We do not position Metalhatscats or Martenweave as:

- an SAP MDG replacement;
- an enterprise MDM platform;
- a full data-catalogue implementation;
- a generic governance transformation;
- a workflow-automation platform;
- a direct SAP write-back solution;
- an autonomous AI agent changing production models;
- a large custom UI programme.

The current Martenweave boundaries describe it as a backend-first model-governance pipeline, not a hosted MDM platform, generic workflow engine, chatbot or direct SAP write-back mechanism.

If the organisation primarily needs match-and-merge, golden-record operations, stewardship workflows or broad enterprise metadata discovery, another platform category is more appropriate.

## When our approach is likely to help

The approach is most relevant when several of these conditions are present:

- mappings exist in multiple spreadsheets;
- source and target definitions conflict;
- several countries maintain local versions;
- dataset gaps appear late in testing;
- target changes have unclear impact;
- decisions are buried in tickets;
- SAP configuration differs from approved design;
- later waves repeatedly redo analysis;
- AMS depends on original consultants;
- AI-assisted mapping is being considered;
- implementation partners maintain separate artefacts.

These conditions indicate that the problem is not only missing documentation.

The organisation lacks a controlled model layer.

## When the approach may not be necessary

A model registry is not automatically justified.

A simpler process may be enough when:

- one source and one target exist;
- the domain is small;
- mappings are stable;
- local variation is limited;
- one team owns design and support;
- impact analysis is easy;
- handover risk is low.

A disciplined workbook, decision log and version-controlled scripts may provide sufficient control.

We prefer to discover this through a bounded pilot rather than force a larger solution.

## Working with an existing SAP MDG programme

In an active MDG implementation, we can focus on one cross-workstream problem.

For example:

### Align target design and migration mappings

Connect target attributes to source evidence and current datasets.

### Validate global and local variation

Represent shared objects, contextual rules and local extensions.

### Establish decision traceability

Connect requirements, choices, model objects and implementation tasks.

### Build readiness evidence

Generate a baseline-specific report across model, mappings, datasets and target implementation.

### Prepare AMS handover

Preserve current model knowledge rather than only historical project documents.

We should not interrupt or redesign the entire programme unless evidence shows that the current model cannot be governed.

## Working before an MDG investment

Before detailed implementation begins, we can help answer:

- Is the proposed domain sufficiently defined?
- Are source systems understood?
- Can current data support the proposed target?
- Which local variations already exist?
- Who owns critical model decisions?
- Is the programme ready to design workflows and validations?
- Which issues should be resolved before vendor build starts?

This may confirm the MDG business case.

It may also reduce or reorder scope.

Both are useful outcomes.

## Working after go-live

After go-live, the immediate problem often shifts from design to maintainability.

We can help teams establish:

- current model baseline;
- field and rule traceability;
- decision recovery;
- configuration-alignment evidence;
- impact analysis;
- proposal-based model change;
- AMS operating views.

The aim is not to reconstruct the entire implementation history perfectly.

It is to establish a trustworthy current state and preserve future changes properly.

## How AI fits into our work

AI is useful for processing fragmented evidence.

It can assist with:

- extracting candidate model objects;
- comparing mapping versions;
- finding conflicting definitions;
- proposing source-to-target relationships;
- drafting decision records;
- grouping dataset gaps;
- preparing impact summaries;
- creating issue drafts.

The current Martenweave workflow is explicitly proposal-first:

```text
evidence
→ proposal
→ validation
→ gaps and impact
→ review
→ GitHub issue or pull request
```

The project summarises this as:

> Agents propose. Validators verify. Humans approve. Git records.



This is also our consulting principle.

AI reduces preparation effort.

It does not own business meaning, source authority or risk acceptance.

## Why Git and canonical files matter

Canonical files and Git provide several practical benefits:

- readable model history;
- reviewable differences;
- portability;
- reproducible generated views;
- integration with engineering workflows;
- separation of proposed and approved states;
- lower dependency on one hosted vendor platform.

This does not mean governance should become a developer-only activity.

Business users can review generated workbooks, reports and semantic diffs.

The canonical layer exists to protect authority and reproducibility.

## A practical engagement sequence

A minimal sequence could be:

### 1. Select the model problem

Choose one domain, change or repeated defect.

### 2. Gather current evidence

Use actual workbooks, datasets, tickets and design artefacts.

### 3. Establish canonical objects

Create the minimum model required for the decision.

### 4. Validate structure

Find broken references, missing owners and lifecycle inconsistencies.

### 5. Compare the dataset

Measure whether current data supports the model.

### 6. Trace critical relationships

Connect source, target, rule, decision and evidence.

### 7. Analyse one change

Demonstrate impact across workstreams.

### 8. Process a proposal

Keep candidate changes separate from approved truth.

### 9. Produce a decision report

State what is ready, uncertain or blocked.

### 10. Transfer operation

Ensure the client team can maintain and use the result.

This is deliberately smaller than a conventional governance transformation.

## What good looks like after the engagement

For the selected scope, the organisation should be able to:

- identify the approved model baseline;
- distinguish approved, proposed and retired objects;
- trace critical fields from source to target;
- connect rules to decisions and owners;
- compare current datasets with model expectations;
- detect structural inconsistencies automatically;
- understand local variations;
- assess a proposed change;
- produce a readiness or handover report;
- maintain the model without Metalhatscats.

The last point is essential.

Our role is to establish capability, not permanent dependency.

## Questions management should ask us

A credible model-governance engagement should withstand direct questions.

### What exactly will become more controlled?

We should identify specific model objects, decisions and workflows.

### Which current problem will be reduced?

We should name measurable reconstruction, rework or readiness costs.

### What remains outside Martenweave?

We should preserve clear roles for SAP MDG, Jira, Confluence, catalogues and migration tools.

### What evidence will the pilot use?

It should use real current artefacts and datasets.

### What happens when the pilot finds conflicting truth?

The conflict should become an explicit decision, not a silent merge.

### Who owns the model after the engagement?

A client role must be named.

### Can the outputs be maintained without us?

The operating model and commands should be transferred and tested.

### What are the product limitations?

The current core is backend-first, CLI-driven and not a hosted enterprise application.

### What would make us recommend stopping?

We should stop or reduce scope if the model problem is too small, ownership does not exist or current tools already solve the issue adequately.

## Our own limitations

We should be explicit about what this approach cannot guarantee.

A structured model does not guarantee:

- correct business policy;
- complete enterprise lineage;
- clean source data;
- successful SAP configuration;
- user adoption;
- regulatory compliance;
- perfect AI output.

It improves the organisation’s ability to identify, review and preserve the relevant decisions.

It is infrastructure for better governance—not a substitute for accountable owners and experienced implementation teams.

## Our conclusion

Companies do not establish model governance by purchasing another repository or creating another committee.

They establish it by making model authority operational.

That means being able to show:

- what the model contains;
- what evidence supports it;
- who owns each material decision;
- how source and target representations connect;
- which local variations apply;
- how proposed changes are validated;
- how approval changes the canonical state;
- how implementation is verified.

Metalhatscats helps teams establish this capability through a small, evidence-based implementation rather than a large abstract transformation.

Martenweave provides the technical foundation:

- canonical files;
- deterministic validation;
- generated indexes;
- dataset-gap analysis;
- traceability;
- impact analysis;
- proposal-first change control.

The organisation provides:

- business authority;
- source knowledge;
- implementation expertise;
- governance decisions;
- human approval.

The practical test is simple:

> Can a qualified person understand and safely change the selected model without manually reconstructing it from spreadsheets, tickets, datasets and individual memory?

When the answer becomes yes, model governance is no longer a presentation topic.

It has become an operating capability.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We help SAP migration, MDG, MDM, data-governance and AMS teams establish controlled model baselines, validate implementation knowledge, connect datasets to target requirements and introduce reviewable model-change workflows.

Our work is intentionally focused.

We do not replace SAP MDG or existing enterprise tools. We help teams govern the model knowledge that must remain coherent across them.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer unifying master data, policy and metadata. Its stated capabilities include governed models, golden records, matching and consolidation, collaborative steward workflows, validated values, data-quality monitoring and auditable changes. SAP also recommends curating master data early before an SAP S/4HANA implementation.

The current Martenweave Core README describes Martenweave as an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS. The current source version is listed as 0.5.0.

The core uses canonical Markdown and YAML files, deterministic validation, disposable generated SQLite and JSONL indexes, dataset-gap analysis, trace and impact analysis and human-reviewed `PatchProposal` and `ChangeRequest` workflows.

The current implementation is CLI-driven and backend-first. It does not provide a hosted editable production UI, generic workflow engine or direct SAP write-back.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
