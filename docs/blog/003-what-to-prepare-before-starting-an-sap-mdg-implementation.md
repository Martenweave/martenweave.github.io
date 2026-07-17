# What to Prepare Before Starting an SAP MDG Implementation

**Reviewed: 14 July 2026**

An SAP MDG implementation often appears to begin with the platform.

The programme selects a domain, confirms the system landscape, schedules design workshops and starts discussing data models, workflows, validations and replication.

Technically, this is understandable. A platform has to be installed, configured and integrated. Teams need environments, roles, transports and delivery plans.

But the most important preparation happens before configuration.

Before the first model is extended and before the first change request is designed, the organisation needs to understand what it is actually trying to govern.

That means answering questions about definitions, ownership, source systems, business contexts, data quality, existing processes, local exceptions and migration dependencies.

These questions are less visible than system configuration. They are also where many expensive implementation problems begin.

Our experience is that SAP MDG programmes do not usually struggle because nobody can configure a field or build a workflow. They struggle because the programme starts building before it has a stable view of the domain.

The platform then becomes the place where unresolved organisational questions are discovered.

That is late and expensive.

## Start with the governance problem, not the product name

SAP describes Master Data Governance as a central hub for master data management and governance. Its current scope includes governed master-data models, golden records, profiling and matching, change-request workflows, data-quality monitoring, mass processing and auditable changes.

This is a broad capability set.

It does not mean that every organisation needs every capability at the same time.

Before implementation begins, we recommend defining the concrete governance problem in operational terms.

For example:

- Customer records are duplicated across sales systems.
- Supplier bank data is changed without sufficient approval.
- Product classifications differ between countries.
- Business Partner roles are created inconsistently.
- Finance master data has unclear ownership.
- Material records cannot be trusted across plants.
- Local systems use incompatible code lists.
- S/4HANA migration requires harmonised data that does not yet exist.
- Data stewards cannot see which records violate agreed rules.
- Teams have no reliable process for requesting master-data changes.

These are actual problems.

“Implement SAP MDG” is not yet a problem statement. It is a proposed response.

This distinction prevents the project from treating platform delivery as proof that governance has improved.

## Define what success should look like

A programme needs more than a list of technical deliverables.

Installing MDG, activating a data model and demonstrating a workflow may prove that the software operates. It does not prove that the organisation can govern the domain effectively.

We prefer to define success through business and operational outcomes.

Examples include:

- one agreed definition exists for each critical attribute;
- every critical attribute has an accountable owner;
- local variations are explicit rather than hidden;
- duplicate records can be detected using agreed criteria;
- high-risk changes require appropriate review;
- data-quality rules can be measured;
- downstream systems receive governed data consistently;
- migration datasets can be checked against the approved model;
- support teams can explain why a rule exists;
- changes can be assessed before they are implemented.

These outcomes should be written before detailed solution design.

Otherwise, the programme may optimise what is easy to demonstrate rather than what matters in production.

## Choose the implementation scenario deliberately

Not every MDG programme has the same operational objective.

An organisation may want to:

- govern all new master-data creation centrally;
- consolidate data from multiple systems;
- create trusted golden records;
- introduce governance gradually while keeping local maintenance;
- improve data quality before an S/4HANA migration;
- govern only selected high-risk attributes;
- use MDG as part of a wider data fabric;
- establish a central model while distribution remains elsewhere.

SAP’s current positioning includes governed golden records, matching and consolidation, collaborative workflows, quality monitoring and integration of SAP and third-party sources.

That range creates flexibility, but it also creates a planning risk.

If the programme does not agree on the intended operating scenario, different teams may design different solutions under the same project name.

The business may expect central creation.

The architecture team may assume consolidation.

The migration team may expect a cleansing hub.

Local organisations may believe they will retain maintenance authority.

These are not small configuration differences. They affect ownership, workflows, integration, migration, support and organisational change.

We recommend documenting the intended scenario in plain language:

> Which data will be governed, where will it be created, who may change it, which systems remain authoritative, and where will approved data be distributed?

The answer should be understandable without product terminology.

## Select the first domain carefully

The first domain determines much of the programme’s early credibility.

Teams often select a domain because:

- it is politically visible;
- a senior sponsor requested it;
- the standard SAP content appears mature;
- the S/4HANA programme needs it first;
- a previous attempt already exists;
- it appears smaller than other domains.

These may be valid considerations. They are not sufficient by themselves.

A useful first domain should have:

- a clear business problem;
- identifiable owners;
- available subject-matter experts;
- enough complexity to demonstrate value;
- manageable integration scope;
- usable source data;
- realistic implementation boundaries;
- stakeholders willing to make decisions.

A domain with severe organisational conflict, no business owner and dozens of uncontrolled source systems may be strategically important. It may still be a poor first implementation.

Conversely, a domain that is technically simple but has no meaningful governance pain will produce a functioning demonstration with little business impact.

We generally look for a domain where better control will be visible within the first delivery cycle.

## Identify the actual business objects

A programme may begin with labels such as:

- Customer;
- Supplier;
- Business Partner;
- Product;
- Material;
- Finance.

These labels are useful, but too broad for detailed design.

“Customer” may include:

- general identity;
- addresses;
- tax registrations;
- company-code data;
- sales-area data;
- partner functions;
- credit information;
- contacts;
- relationships;
- external identifiers;
- local regulatory fields.

Different groups may use the same word while referring to different object boundaries.

Before design begins, we recommend identifying:

1. the business entities;
2. the contexts in which they are used;
3. the relationships between them;
4. the systems that currently store them;
5. the processes that create and change them.

This work does not require a complete enterprise ontology.

It requires enough precision to prevent the project from configuring a model around ambiguous labels.

## Build an initial attribute inventory

The programme needs an inventory of important attributes before detailed workshops begin.

This inventory will not be final. Its purpose is to expose the current landscape.

For each attribute, capture at least:

- business name;
- working definition;
- business object;
- organisational context;
- source systems;
- current owners;
- physical fields where known;
- value domain;
- known quality issues;
- regulatory relevance;
- downstream consumers;
- migration relevance;
- open questions.

The inventory should distinguish between a business attribute and a physical SAP field.

For example, a business concept such as “Customer classification” may be represented differently across legacy applications and SAP contexts.

If the programme begins directly with physical fields, it may preserve existing technical fragmentation rather than resolve it.

## Resolve definitions before workflow design

Workflow discussions are often easier than definition discussions.

A team can draw approval steps quickly:

```text
Requestor → Data Steward → Business Owner → Activation
```

The more difficult question is what exactly those participants are approving.

If the definition of an attribute remains unclear, a well-designed workflow will route an unclear decision efficiently.

We recommend preparing a business glossary for the critical scope.

Each definition should answer:

- What does the attribute mean?
- What business decision uses it?
- At which organisational level does it apply?
- Which values are permitted?
- When is it mandatory?
- Who decides its value?
- Which systems consume it?
- What would make a value invalid?

Definitions should not merely repeat technical labels.

“Payment Terms: terms of payment” is not a useful definition.

A stronger definition explains the business use, boundaries and ownership.

## Make ownership concrete

Almost every governance programme says that ownership is important.

Fewer programmes define what ownership means in practice.

A name in an Excel column is not an operating model.

For each critical object or attribute, clarify:

- who defines it;
- who approves changes;
- who maintains the data;
- who monitors quality;
- who resolves disputes;
- who funds remediation;
- who accepts local exceptions;
- who decides whether a rule may change.

These responsibilities may belong to different roles.

A business owner may approve the definition. A steward may maintain records. A process owner may accept operational risk. An architect may assess system impact.

We recommend using a responsibility model that reflects actual decisions rather than assigning one generic “owner” to everything.

If ownership remains unresolved, MDG configuration will not fix it. The workflow will simply expose the conflict each time a record requires approval.

## Map the current creation and change processes

Before designing a target workflow, the team should understand how master data is currently created and changed.

This includes informal processes.

A formal procedure may say that requests go through a service portal. In practice, urgent changes may arrive through email, spreadsheets, local applications or direct system access.

The current-state assessment should capture:

- who raises requests;
- which channels are used;
- which checks occur;
- where approvals happen;
- which changes bypass the process;
- which data is created automatically;
- which systems can overwrite values;
- which exceptions are common;
- how urgent requests are handled;
- how errors are corrected.

We are not suggesting that every existing step should be reproduced in MDG.

The purpose is to identify the controls that matter and the workarounds that the target process must address.

A workflow designed without this knowledge may be technically elegant and operationally ignored.

## Inventory the source and consuming systems

Master data governance is never limited to the hub.

The programme needs to know where data comes from and where it goes.

For each relevant system, identify:

- its role in the current landscape;
- which objects and attributes it owns;
- whether it creates or only consumes data;
- how identifiers are managed;
- how data is exchanged;
- how quickly updates are required;
- whether local changes are permitted;
- which validations already exist;
- which values are transformed;
- which interfaces are business-critical.

This system inventory should include non-SAP applications and manual sources.

SAP states that MDG can unite SAP and third-party sources and supports governance across a wider data landscape.

In practice, integration design depends on details that product-level diagrams do not answer:

- What happens when a downstream system rejects an update?
- Which system owns a local extension?
- How are keys reconciled?
- Can a legacy system overwrite governed values?
- Which changes require real-time distribution?
- Which interfaces depend on code conversions?
- How is replication monitored?
- Who resolves failed messages?

These questions should be visible during preparation, not discovered only during interface testing.

## Understand identifier strategy

Identifier design is often underestimated.

For Business Partner, Customer, Supplier, Product or Material, the programme should decide:

- whether global identifiers are required;
- whether existing identifiers will be retained;
- whether number ranges are internal or external;
- how legacy keys will be preserved;
- how key mappings will be stored;
- whether identifiers differ by system;
- how duplicates are detected;
- how merged records are handled;
- how downstream systems reference the object.

An identifier decision affects migration, interfaces, matching, reporting and operational support.

It should not be treated as a late technical detail.

## Assess the source data early

SAP recommends curating master data early and before an S/4HANA implementation because automated and integrated processes depend on clean and correct master data.

We agree, but “assess data quality” is too broad to be useful as a project task.

A practical assessment should examine:

- completeness;
- validity;
- duplicate patterns;
- conflicting values;
- inconsistent formats;
- invalid references;
- obsolete records;
- code-list variation;
- missing relationships;
- organisational coverage;
- country-specific issues;
- historical data that should not be migrated.

The assessment should use actual datasets.

Workshops and documentation reveal what teams believe exists. Profiling reveals what is present in the files and systems.

Both views are necessary.

## Separate data quality from data correction

A programme should decide how different classes of issues will be treated.

Possible responses include:

- correct the source system;
- cleanse data before migration;
- transform values during migration;
- reject invalid records;
- create a temporary exception;
- enrich data through an external source;
- accept the issue and monitor it after go-live;
- change the target rule.

These choices have different consequences.

If the programme does not establish a remediation strategy, data-quality discussions become repetitive. Every defect restarts the debate about whether the source, transformation or target should change.

We recommend defining decision rules before large-scale testing begins.

For example:

> Invalid tax identifiers must be corrected at source where possible. Migration transformations may normalise format but may not invent missing identifiers.

A statement like this is more useful than a generic target of “high data quality.”

## Identify global and local differences

Global programmes often declare an intention to create one harmonised model.

The difficult work begins when local teams explain why their requirements are different.

Some differences are legitimate:

- legal requirements;
- tax reporting;
- language and address formats;
- local market processes;
- industry-specific classifications;
- regulatory restrictions.

Other differences exist because systems and organisations evolved independently.

The programme needs a way to distinguish between:

1. globally standard requirements;
2. approved local extensions;
3. temporary migration exceptions;
4. legacy behaviour that should be retired;
5. unresolved differences requiring a decision.

Without this classification, the model grows through accumulation.

Every local field is added “just in case,” and the global design becomes a container for historical variation.

We recommend preparing a country and organisational variation matrix before detailed build begins.

## Prepare value lists and code mappings

Value lists are often treated as a later migration activity.

They should be part of model preparation.

For every significant code list, identify:

- the business meaning;
- allowed target values;
- source-system values;
- local variations;
- inactive codes;
- unknown or blank values;
- defaulting rules;
- ownership;
- effective dates;
- downstream dependencies.

A single attribute can appear ready while its values remain unresolved across several systems.

The field exists. The mapping exists. The data still cannot be loaded consistently.

Value mapping should therefore be tracked separately from field mapping.

## Decide which rules belong where

A typical programme contains rules in several layers:

- source-system validations;
- migration transformations;
- MDG validations;
- derivations;
- workflow conditions;
- integration mappings;
- downstream application controls;
- manual stewardship procedures.

Before implementation, the team should decide where each rule belongs.

Otherwise, the same logic may be duplicated in several places or omitted because each team assumes another component will handle it.

For each rule, record:

- business purpose;
- triggering context;
- input attributes;
- expected result;
- error or warning behaviour;
- responsible owner;
- implementation layer;
- test evidence;
- downstream impact.

This also helps distinguish governance rules from technical convenience.

Not every transformation should become an MDG business rule. Not every business rule should be hidden in migration code.

## Define the target operating model

SAP MDG introduces roles and processes that continue after the project ends.

Preparation must therefore include the future operating model.

The organisation should decide:

- who will request changes;
- who will steward each domain;
- who will own data quality;
- who will administer rules;
- who will support workflows;
- who will monitor integrations;
- who will resolve replication failures;
- who will approve emergency changes;
- who will manage local extensions;
- who will review the model over time.

The implementation team cannot remain the permanent operating model.

If these responsibilities are not staffed before go-live, the platform may enter production with no sustainable ownership structure.

## Prepare decision governance

An MDG programme produces many decisions:

- one global definition or several;
- central or local ownership;
- mandatory or optional attribute;
- source correction or migration transformation;
- standard model or extension;
- one value list or local variations;
- immediate replication or scheduled distribution;
- strict validation or warning;
- rejection or controlled exception.

These decisions should not live only in workshop minutes.

We recommend a decision record containing:

- decision title;
- affected model objects;
- context;
- alternatives considered;
- selected option;
- rationale;
- evidence;
- approver;
- date;
- conditions;
- review trigger.

The review trigger is important.

Some decisions are permanent. Others are valid only until a legacy system is retired or a country rollout is completed.

## Establish a change-control approach before the model changes

The model will change during implementation.

This is normal.

Requirements improve, data reveals exceptions, testing exposes gaps and SAP configuration introduces constraints.

The programme needs to define:

- how a change is proposed;
- what impact must be analysed;
- who reviews it;
- who approves it;
- which artefacts must be updated;
- how the change reaches configuration;
- how migration and testing teams are notified;
- how previous decisions remain traceable.

Without this process, the model changes through document edits, ticket comments and configuration transports that may not remain aligned.

Change control should not mean bureaucratic approval for every minor correction.

It should make significant model changes visible before they create downstream rework.

## Agree on testing evidence

Before design is finalised, decide what evidence will be required.

A model is not ready merely because:

- a workflow starts;
- an approval button works;
- a record can be activated;
- an interface message is sent.

Testing should cover the model itself:

- attribute behaviour;
- mandatory rules;
- derivations;
- value restrictions;
- organisational contexts;
- local exceptions;
- duplicate detection;
- integration behaviour;
- migration mappings;
- error handling.

The programme should be able to trace each critical rule to appropriate evidence.

This makes readiness discussions more precise than a general percentage of executed test cases.

## Prepare migration and MDG together

Migration is sometimes treated as a separate technical workstream.

For MDG programmes, this separation is risky.

The migration team needs the approved target model.

The MDG team needs to understand what the source data can actually support.

The two streams should align on:

- target attributes;
- contexts;
- required fields;
- legacy sources;
- transformation rules;
- value mappings;
- validation sequencing;
- duplicate handling;
- key strategy;
- initial-load approach;
- delta handling;
- error ownership.

A target model that cannot be populated from available data is not ready.

A migration mapping that does not reflect the governed target model is not reliable.

## Create an independent model specification

We recommend maintaining an implementation-level specification that is independent from individual documents and from the configured platform.

This does not mean duplicating the complete SAP system.

The specification should connect:

- business entities;
- attributes;
- contexts;
- source fields;
- target endpoints;
- mappings;
- value lists;
- rules;
- owners;
- decisions;
- datasets;
- tests;
- changes.

The SAP system remains the operational platform.

The independent specification explains what the programme intends to build, why it was designed that way and how the delivery artefacts relate to one another.

This becomes particularly valuable when the programme spans several vendors or waves.

## Where Martenweave fits

We built Martenweave to support this preparation and control layer.

The current product model turns spreadsheets, datasets, tickets, validation reports, decisions and SAP context into structured model objects that can be validated, searched, traced, reviewed and exported.

Before an MDG implementation, a Martenweave repository can be used to capture:

- domains and entities;
- business attributes;
- organisational contexts;
- source and target fields;
- mappings and transformations;
- value lists and mappings;
- validation rules;
- ownership;
- issues and decisions;
- datasets and detected gaps;
- proposed changes.

The core supports deterministic validation, generated indexes, dataset profiling, gap detection, trace and impact analysis, reports and a controlled PatchProposal lifecycle.

We do not present Martenweave as an alternative to operational MDG.

SAP MDG manages governed master data, workflows, quality and operational changes. Martenweave helps the delivery team establish and preserve the structured knowledge used to design, migrate, test and maintain that implementation.

## A practical preparation sequence

We recommend organising the pre-implementation work into seven stages.

### Stage 1: Frame the problem

Produce:

- governance problem statement;
- target outcomes;
- initial domain scope;
- key stakeholders;
- known constraints.

Do not begin with a feature list.

### Stage 2: Inventory the landscape

Produce:

- source-system inventory;
- consuming-system inventory;
- business-object inventory;
- current-process map;
- existing document and dataset inventory.

### Stage 3: Build the initial model

Produce:

- entities;
- critical attributes;
- contexts;
- relationships;
- working definitions;
- known physical fields.

### Stage 4: Assess ownership and variation

Produce:

- ownership matrix;
- country and organisational variation matrix;
- list of unresolved governance decisions;
- exception categories.

### Stage 5: Profile the data

Produce:

- completeness findings;
- value distributions;
- duplicate indicators;
- invalid references;
- missing fields;
- code-list conflicts;
- remediation candidates.

### Stage 6: Align model, migration and integration

Produce:

- source-to-target mappings;
- target endpoints;
- value mappings;
- identifier strategy;
- replication expectations;
- integration risks.

### Stage 7: Define delivery controls

Produce:

- decision log;
- model-change process;
- validation approach;
- test-evidence model;
- readiness criteria;
- handover expectations.

Only after these stages does detailed configuration begin with a sufficiently stable foundation.

## Minimum preparation checklist

A programme does not need to complete every possible analysis before starting build.

It should, however, have credible answers to the following questions.

### Scope

- Which domain is included?
- Which business objects are included?
- Which countries and organisations are included?
- What is explicitly excluded?
- Which implementation scenario is intended?

### Ownership

- Who owns each critical object?
- Who owns each critical attribute?
- Who approves definitions?
- Who manages data quality?
- Who accepts exceptions?

### Model

- Are critical attributes defined?
- Are organisational contexts explicit?
- Are relationships identified?
- Are global and local requirements separated?
- Are value lists available?

### Systems

- Which systems create the data?
- Which systems consume it?
- Which system owns each attribute today?
- How will identifiers be handled?
- How will governed data be distributed?

### Data

- Have representative datasets been profiled?
- Are missing attributes known?
- Are duplicate patterns understood?
- Are invalid and obsolete records identified?
- Is there a remediation strategy?

### Delivery

- Are migration and MDG models aligned?
- Are critical rules assigned to an implementation layer?
- Is change control defined?
- Is test evidence traceable?
- Is the future operating model staffed?

A project may start with open items. It should know that they are open.

Unknown problems are more dangerous than acknowledged decisions still awaiting resolution.

## Warning signs that the programme is not ready

We would pause detailed implementation when several of these conditions are present:

- the domain name is agreed but its boundaries are not;
- no business owner can approve definitions;
- source systems are still being discovered;
- global and local requirements are mixed together;
- mappings exist only in personal files;
- actual datasets have not been reviewed;
- identifier strategy is unresolved;
- the migration and MDG teams use different target models;
- workflows are being designed before responsibilities are agreed;
- data-quality rules have no owner;
- every exception is described as temporary;
- no one knows who will operate the solution after go-live.

This does not always mean stopping the entire programme.

It means redirecting effort toward discovery and decision-making instead of producing configuration that is likely to be reworked.

## What preparation does not mean

Preparation should not become an endless analysis phase.

The objective is not to document the whole enterprise before implementing one domain.

We avoid three common extremes.

### Trying to solve every data problem first

An organisation can begin with known limitations. The important point is to make them visible and decide how they will be handled.

### Designing the perfect global model

A useful first model can evolve. It needs controlled boundaries and decisions, not theoretical completeness.

### Replacing delivery with governance meetings

Governance exists to improve decisions and delivery. It should not create a review layer that cannot respond at project speed.

The right level of preparation is enough structure to prevent predictable rework.

## What managers should expect before approving build

Before a programme moves into detailed implementation, management should receive more than a technical architecture diagram.

We recommend a concise readiness package containing:

1. the governance problem and expected outcomes;
2. confirmed domain scope;
3. target operating scenario;
4. ownership matrix;
5. initial governed model;
6. source and consuming system map;
7. data-quality assessment;
8. migration alignment;
9. list of unresolved decisions;
10. implementation risks;
11. delivery and change-control approach;
12. go-live operating-model assumptions.

This package does not guarantee that the implementation will remain unchanged.

It demonstrates that the organisation understands the work it is asking the platform to perform.

## Our conclusion

SAP MDG can provide a strong operational foundation for governed master data.

But the platform should not be used as the place where the organisation first discovers what its data means, who owns it and why local processes differ.

Those questions belong in preparation.

We start with the governance problem, the business model, the actual datasets and the people responsible for decisions. We then connect that knowledge to migration, configuration, testing and operations.

This approach may appear slower during the first weeks because it exposes difficult questions early.

Across the programme, it is usually faster.

It reduces configuration rework, repeated workshops, late migration gaps and arguments about decisions that were never recorded properly.

Our main recommendation is simple:

> Do not ask the MDG implementation to define the organisation’s data governance by accident.

Prepare the model, ownership, evidence and delivery controls deliberately. Then use SAP MDG for the operational governance capabilities it is designed to provide.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We work on practical model governance for SAP migration, MDM, MDG and AMS programmes. Our focus is helping architects and delivery teams make model knowledge structured, validated and traceable before it becomes an implementation risk.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance hub supporting governed models, golden records, profiling, matching, consolidation, workflows, data-quality monitoring, mass processing and auditable changes. SAP also recommends curating master data early, before an SAP S/4HANA implementation.

Martenweave’s public product description documents its use of structured model objects, deterministic validation, dataset profiling, gap detection, impact analysis and human-reviewed change proposals.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
