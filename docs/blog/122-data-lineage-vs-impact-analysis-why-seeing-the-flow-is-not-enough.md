# Data Lineage vs Impact Analysis: Why Seeing the Flow Is Not Enough

Data lineage is one of the most attractive ideas in data management.

A field appears on the screen. The user selects it and sees where it came from, which transformations touched it and which reports consume it.

For managers, this promises something valuable: visibility.

Instead of relying on technical specialists to reconstruct a chain across systems, the organisation can see the movement of data directly.

That visibility matters. It supports investigations, auditability, debugging and change planning. OpenLineage, for example, defines a standard model around datasets, jobs and execution runs so that lineage metadata can be collected consistently across processing systems. The W3C’s broader provenance model similarly describes the entities, activities and people involved in producing information, helping users assess its reliability and origins.

But lineage is often expected to answer a question it cannot answer alone:

> What will happen if we change this field, rule or definition?

That is an impact-analysis question.

Lineage may provide part of the evidence. It does not automatically provide the complete answer.

This distinction becomes particularly important in SAP migrations, MDM programmes, warehouse rollouts and logistics integrations. In these environments, many critical dependencies do not exist as executable data pipelines. They exist in mappings, business rules, validation files, tickets, exceptions, interface specifications and project decisions.

A technically complete lineage graph may still miss the dependency that causes the next rollout to fail.

Managers therefore need to understand both concepts:

- lineage explains where data came from and where it travels;
- impact analysis evaluates what may be affected by a proposed change.

They overlap, but they are not the same control.

## What data lineage tells us

At its simplest, data lineage describes the path taken by data.

A typical lineage chain may look like this:

```text
Legacy customer table
    → extraction job
    → transformation pipeline
    → SAP staging file
    → reporting dataset
    → management dashboard
```

At a high level, this tells the organisation which systems participate in the flow.

At a more detailed level, lineage may show:

- which source table produced the result;
- which column supplied a target field;
- which transformation modified the value;
- which pipeline executed the transformation;
- which downstream datasets received the output;
- which dashboards or reports consume it.

OpenLineage’s core model is explicitly centred on datasets, jobs and runs. This makes it useful for recording what processing activity occurred and which inputs and outputs participated in it.

The W3C provenance model is broader. It treats provenance as information about entities, activities and agents involved in producing something, including derivation, attribution, versioning and reproducibility.

These are strong foundations for answering questions such as:

- Where did this number come from?
- Which processing job changed it?
- Which downstream reports depend on this dataset?
- Which source should we inspect when a value looks wrong?
- Which outputs may contain data from a defective pipeline?
- Can we reproduce how this result was produced?

These questions are important.

They are not yet the whole impact question.

## What impact analysis tells us

Impact analysis begins with a proposed or suspected change.

For example:

- a source field will be removed;
- a material attribute will become mandatory;
- a value mapping will change;
- a customer classification will be redefined;
- a validation rule will be tightened;
- a 3PL code will be replaced;
- a country-specific exception will be withdrawn.

The purpose of impact analysis is to identify what may need attention before the change is approved or implemented.

A useful impact assessment may include:

- affected datasets;
- source and target mappings;
- transformations;
- validation rules;
- business processes;
- interfaces;
- reports;
- migration objects;
- organisations or countries;
- owners;
- decisions;
- test cases;
- unresolved proposals.

Some of these dependencies can be derived from lineage.

Others cannot.

Lineage can show that a target field feeds an outbound table.

It may not show that an interface specification assigns a particular business meaning to the field.

It can show that a pipeline reads a material attribute.

It may not show that a warehouse rollout requires the attribute only for one plant.

It can show that a report consumes the target column.

It may not show that a migration decision approved a temporary exception that expires after cutover.

Impact analysis needs a wider model than movement alone.

## A practical example: changing a shipping condition

Consider a company using SAP customer master data to control shipping processes.

The business decides that a group of customers should move from a standard shipping condition to an expedited condition.

The technical lineage may show:

```text
Legacy customer field
    → migration transformation
    → SAP customer sales-area field
    → outbound delivery extract
    → logistics reporting table
```

This is useful.

The team can see that the value originates in the legacy system, is transformed during migration and later appears in reporting.

But the proposed change may also affect:

- route determination;
- scheduling logic;
- warehouse handling assumptions;
- transportation planning;
- a 3PL mapping;
- a country-specific exception;
- a validation rule in the migration process;
- a report that groups deliveries by service level;
- a business decision that limits expedited handling to selected customer segments.

Not all these relationships appear as data movement.

Route determination may be represented in SAP configuration.

The 3PL meaning may exist only in an interface mapping document.

The country exception may be stored in a Jira ticket.

The migration validation may be implemented in a Python script.

The service-level interpretation may exist in a workshop decision.

If management reviews only the technical lineage, the change can look smaller than it is.

The field flows through four technical assets.

Its business impact spans several processes and teams.

## Why the terms are often confused

Many data platforms use lineage to support impact analysis.

That is reasonable.

Forward lineage is an important starting point: if a source changes, the organisation can follow the graph downstream and identify potentially affected assets.

The confusion begins when that capability is described as complete impact analysis.

It may be complete within the scope of the captured graph.

The scope is the issue.

A lineage system usually captures relationships it can ingest or infer from:

- SQL;
- ETL jobs;
- data pipelines;
- databases;
- dashboards;
- orchestration tools;
- application metadata.

It may not automatically capture relationships contained in:

- Excel mappings;
- migration workbooks;
- business rules;
- SAP configuration decisions;
- test evidence;
- local exceptions;
- support tickets;
- approval records;
- design documents.

The lineage engine is not necessarily failing.

It simply does not know that these relationships exist.

Managers should therefore ask:

> What kinds of dependency are represented in the graph, and what remains outside it?

A large graph can still be incomplete in the places that matter most to the project.

## Technical lineage and model lineage

It is useful to separate two forms of lineage.

### Technical lineage

Technical lineage follows executable or observable data movement.

It may connect:

- database tables;
- files;
- columns;
- jobs;
- pipelines;
- APIs;
- reports;
- dashboards.

This lineage is often discovered or generated automatically.

It is particularly valuable for:

- root-cause analysis;
- debugging;
- audit;
- regulatory traceability;
- pipeline changes;
- reporting dependencies.

### Model lineage

Model lineage follows the relationships that define the intended meaning and use of data.

It may connect:

- business concepts;
- attributes;
- source fields;
- target fields;
- mappings;
- transformations;
- validation rules;
- decisions;
- exceptions;
- owners;
- datasets;
- proposed changes.

This lineage often requires explicit modelling because the relationships do not exist in one executable platform.

A customer-group attribute may be linked to:

- three legacy fields;
- one approved harmonisation decision;
- two target fields;
- a conditional validation;
- a segmentation report;
- a logistics process;
- a proposed replacement mapping.

Some of those links may appear in technical metadata.

Others are project knowledge.

Both forms are needed when the organisation wants to understand not only where data flows, but why the flow is designed that way.

## Lineage describes what is; impact analysis evaluates what may change

This is another useful distinction.

Lineage is usually descriptive.

It represents an existing or observed relationship:

> Dataset A is an input to Job B, which produces Dataset C.

Impact analysis is prospective.

It asks:

> If we change A, which parts of the current and intended model require review?

The prospective question introduces additional concerns:

- Is the dependency still active?
- Is the change compatible with the target model?
- Does the affected item have an owner?
- Is the relationship global or conditional?
- Is there an approved exception?
- Does the change affect the current migration wave?
- Does it invalidate an earlier decision?
- Must the dataset be reprofiled?
- Which tests must be repeated?

A graph edge alone does not answer these questions.

The organisation needs status, context and governance around the edge.

## Not every downstream relationship represents real business impact

Another limitation appears when a lineage graph becomes large.

Suppose a source field feeds:

- three staging tables;
- two intermediate views;
- one data lake table;
- five reports;
- four archived datasets;
- an unused test pipeline.

Technically, all may be downstream.

Operationally, they are not equally important.

A manager needs to know:

- which assets are active;
- which are productive;
- which are critical;
- which belong to the current programme;
- which have owners;
- which are historical;
- which can be ignored for this change.

Impact analysis therefore requires prioritisation.

Without it, lineage can produce a long list that transfers the investigation burden back to the user.

The graph answers, “These objects are connected.”

The manager still needs an answer to, “Which connections matter now?”

## Not every important impact is downstream

Lineage is frequently visualised as an upstream or downstream graph.

But model changes may have lateral or governance effects.

For example, changing a definition of “active supplier” may affect:

- a procurement rule;
- an MDM validation;
- a migration filter;
- a compliance report;
- an ownership policy.

These elements may not sit downstream of one another technically.

They share a business concept.

A change to that concept affects all of them.

This is why a registry needs relationships beyond data flow.

It may need to express:

```text
Business definition
    → validation rule
    → migration filter
    → report logic
    → ownership decision
```

The connection is semantic and governed, not merely technical.

## A second example: changing a material unit of measure

Suppose a company changes the approved warehouse unit for a product group.

A technical lineage graph may identify:

- the source packaging table;
- the transformation job;
- the SAP target field;
- the EWM replication message;
- a warehouse reporting dataset.

This provides an important starting point.

But the impact assessment must also ask:

- Does the base unit remain unchanged?
- Are existing conversion ratios still valid?
- Does the change apply to every plant?
- Which products belong to the group?
- Is the warehouse unit derived or supplied?
- Do packaging instructions need revision?
- Will existing stock or handling units be affected?
- Does a 3PL expect the old code?
- Which migration dataset must be regenerated?
- Which reconciliation checks should be repeated?
- Who can approve the new operational meaning?

A complete technical flow does not contain every answer.

The project needs model context, scope conditions and ownership.

Without these, the lineage graph can show the path perfectly while the change is implemented incorrectly.

## Why this matters during migration

Migration projects are especially vulnerable because they contain both current-state and future-state relationships.

Technical lineage generally describes the systems and flows that exist or have been instrumented.

A migration also needs to represent relationships that are planned but not yet productive:

- a future SAP target field;
- a proposed transformation;
- an expected source extract;
- a mapping awaiting approval;
- a validation planned for the next load;
- a new 3PL interface;
- a warehouse rollout that has not started.

These relationships may have no runtime metadata yet.

The pipeline has not executed.

The target may not be live.

The interface may still be a specification.

Yet management needs impact analysis before implementation.

This is one reason a migration programme cannot rely only on runtime lineage.

It needs design-time lineage too.

## Design-time and runtime evidence should meet

The strongest architecture connects planned model relationships with observed runtime relationships.

For example:

### Design-time model

```text
Legacy field A
    → approved mapping
    → SAP target attribute B
    → outbound interface field C
```

### Runtime lineage

```text
Extract file A
    → transformation job
    → staging column B
    → interface payload C
```

The design-time model tells us what should happen.

The runtime lineage tells us what did happen.

Comparing the two can reveal useful gaps:

- the executed pipeline uses another source field;
- the target column is populated through an undocumented derivation;
- the interface consumes a field absent from the approved model;
- a registered mapping has never appeared in runtime evidence;
- a planned dependency was not implemented.

This is more valuable than either graph alone.

It allows the organisation to compare intent with execution.

## Why impact analysis needs evidence

An impact result should not be a mysterious list generated by an opaque algorithm.

The user should be able to see why each item appears.

For example:

> The 3PL interface is affected because mapping `MAP-SHIP-COND-03` references attribute `ATTR-SHIPPING-CONDITION`.

> The warehouse validation is affected because rule `RULE-WH-112` checks the same attribute for Plant 1200.

> The migration dataset is affected because field endpoint `FEP-LEGACY-SHIPCOND` supplies the attribute.

This evidence changes the quality of review.

Instead of asking teams to trust a graph, it gives them a traceable reason.

Martenweave’s core direction follows this approach: canonical model objects are validated, indexed and connected so the system can trace dependencies and generate impact reports. The generated index remains disposable; the canonical files remain the approved source.

## The quality of impact analysis depends on the quality of the model

Impact analysis can create false confidence.

A tool may return “No downstream impact found.”

That may mean:

- there is genuinely no impact;
- the relevant dependencies were never registered;
- the connector does not cover the affected system;
- the relationship exists only in a document;
- the graph is stale;
- the object is identified under another name.

Managers should treat absence of evidence carefully.

An impact system should therefore expose coverage and uncertainty.

For example:

> No registered downstream mappings were found. Interface specifications and local country workbooks have not yet been imported.

That is more honest than a green result.

The tool should distinguish:

- no impact found;
- no impact exists;
- impact cannot be assessed with current evidence.

These are different statements.

## What managers should expect from lineage

A useful lineage capability should provide:

- identifiable upstream and downstream assets;
- transformation context;
- suitable levels of detail;
- freshness information;
- ownership where available;
- evidence explaining each relationship;
- filtering to remove irrelevant technical noise.

Managers should also understand the capture method.

Ask:

- Is the lineage discovered automatically?
- Is it inferred from SQL?
- Is it reported by runtime jobs?
- Is part of it entered manually?
- How frequently is it refreshed?
- Which systems are covered?
- Are column-level relationships available?
- Are planned future-state flows represented?

A lineage graph without coverage information can be visually impressive but operationally misleading.

## What managers should expect from impact analysis

Impact analysis should begin with a specific change and produce a reviewable result.

A useful report should show:

- the object being changed;
- the proposed change;
- directly affected elements;
- indirectly affected elements;
- business and technical owners;
- criticality;
- unresolved gaps;
- relevant decisions and evidence;
- required validation or testing;
- known limitations of the analysis.

The report should not merely show everything connected to the object.

It should help the organisation decide:

- who must review the change;
- which implementation work is required;
- which tests must be repeated;
- whether the change can proceed safely;
- which risks remain unresolved.

## Five questions before approving a change

Managers do not need to inspect every graph edge.

They should insist that the team can answer five questions.

### 1. Where does the value come from?

This is the lineage question.

The answer should identify source fields, transformations and intermediate systems.

### 2. Where is the value used?

This is also partly lineage.

It should include downstream systems, reports and interfaces.

### 3. Which rules and decisions depend on its meaning?

This moves beyond technical lineage.

The answer should include validations, exceptions, mappings and approvals.

### 4. Who must review the change?

Impact must lead to ownership.

A list of affected assets without responsible people is incomplete.

### 5. How do we know the implementation still matches the model?

This requires validation after the change.

The dataset, pipeline or target should be checked against the approved design.

## When lineage alone may be enough

Not every change needs a broad model registry.

Technical lineage may be sufficient when:

- the change is limited to a data pipeline;
- business meaning remains unchanged;
- dependencies are fully represented in executable systems;
- the main concern is report or dataset breakage;
- ownership and testing procedures are already clear;
- there are few manual mappings or project artefacts.

For example, renaming an internal staging column may require only technical downstream analysis.

Adding model governance would not improve every small engineering change.

## When broader impact analysis becomes necessary

The need grows when the change affects:

- business meaning;
- source-to-target mappings;
- migration design;
- SAP master-data rules;
- organisational conditions;
- local exceptions;
- external partners;
- warehouses or 3PL providers;
- approved decisions;
- several project workstreams.

In these cases, technical movement is only one part of the dependency model.

## How Martenweave approaches the distinction

Martenweave does not aim to replace enterprise lineage platforms or automatically discover every pipeline in the data estate.

Its narrower purpose is to govern the model relationships surrounding migration, MDM, data governance and controlled change.

It can register and trace relationships among:

- domains;
- entities;
- attributes;
- field endpoints;
- mappings;
- datasets;
- rules;
- evidence;
- decisions;
- change proposals.

The CLI includes trace and impact operations, while the broader workflow validates canonical files, builds indexes, detects dataset gaps and creates proposals for human review.

This is model-centred impact analysis.

It should integrate with technical lineage where that evidence exists rather than attempting to duplicate the entire runtime metadata ecosystem.

## A sensible combined architecture

A practical enterprise setup may divide responsibilities as follows.

### Runtime lineage platform

Captures:

- datasets;
- jobs;
- runs;
- pipelines;
- technical transformations;
- reports and dashboards;
- observed data movement.

### Model registry

Controls:

- approved business definitions;
- mappings;
- target expectations;
- validation rules;
- exceptions;
- evidence;
- proposed changes;
- design-time dependencies.

### Operational and project systems

Execute and record:

- SAP transactions;
- migration loads;
- MDM workflows;
- integration messages;
- issues;
- approvals;
- testing.

The model registry can consume lineage as evidence.

The lineage platform can receive approved semantic context from the registry.

Neither needs to own the other’s entire responsibility.

## The management rule

The distinction can be expressed simply.

**Lineage asks:**

> How did the data get here, and where does it go?

**Impact analysis asks:**

> What must we review, change or retest if we alter this part of the model?

Lineage is a major input to impact analysis.

It is not always the complete result.

Seeing the flow is valuable.

Understanding the consequence requires more: business meaning, rules, ownership, evidence, scope and proposed change context.

A project that confuses the two may build a detailed graph of its data landscape and still discover critical dependencies during testing.

The objective is not to produce the largest graph.

It is to identify the right consequences before the change becomes a defect.
