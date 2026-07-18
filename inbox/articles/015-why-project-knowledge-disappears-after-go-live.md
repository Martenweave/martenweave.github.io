# Why Project Knowledge Disappears After Go-Live

**Reviewed: 14 July 2026**

Six months after go-live, an SAP MDG validation starts rejecting supplier changes.

The rule is working as configured. The error message is technically correct. The support team can see which field caused the failure.

What it cannot explain is why the rule exists.

The solution-design document contains an older version. A Jira issue records a debate but not the final decision. The consultant who implemented the rule has left the programme. The test case proves that the error appeared under one scenario, but does not explain the business policy behind it.

The business owner believes the rule was introduced only for one country.

Configuration applies it globally.

Nobody is certain whether production is wrong or the documentation is outdated.

This is usually described as a documentation problem.

It is more accurately a knowledge-structure problem.

The project created the necessary knowledge. It existed in workshops, spreadsheets, tickets, code, configuration, test results and people’s memories. What the programme failed to preserve was the connection between those pieces.

The knowledge did not disappear in one moment after go-live.

It became progressively harder to reconstruct.

> Project knowledge is lost when the organisation can still find the artefacts but can no longer recover the reasoning, relationships and ownership needed to use them.

That distinction matters because producing more documents does not necessarily solve the problem.

## Go-live changes the economics of knowledge

Before go-live, the project has a dense network of people who can fill gaps in the documentation.

A migration consultant remembers why a default was introduced.

An MDG architect knows which rule was temporary.

A local business lead can explain why one country uses a different classification.

A developer knows which configuration object implements the workshop decision.

The system of knowledge therefore includes both artefacts and people.

After go-live, the network begins to dissolve:

- consultants leave;
- business representatives return to their operational roles;
- project channels become inactive;
- tickets are archived;
- temporary folders stop being maintained;
- source systems are decommissioned;
- release pressure shifts attention elsewhere;
- the AMS team receives incidents rather than design context.

The same information may still technically exist.

Its retrieval cost rises.

A question that took ten minutes during the project may take several days after go-live because the receiving team must search across systems and infer relationships that were previously supplied by people.

## The project is organised around delivery. AMS is organised around questions

During implementation, knowledge is usually grouped by workstream:

- design;
- MDG configuration;
- migration;
- integration;
- testing;
- cutover;
- data quality;
- change management.

This structure fits programme delivery.

After go-live, support begins from a business object or incident:

- Why is this customer value blank?
- Why was this supplier classified as high risk?
- Which rule prevents the approval?
- Is this exception intentional?
- Where did this migrated value come from?
- Which systems will be affected if we add a code?
- Who owns this attribute?
- Can the rule be changed locally?
- Which tests should be repeated?

Answering these questions requires movement across workstreams.

For one field, AMS may need:

```text id="knowledge-loss-1"
Business definition
→ model decision
→ source mapping
→ value transformation
→ SAP MDG configuration
→ validation rule
→ workflow behaviour
→ interface dependency
→ test evidence
→ operational owner
```

If the project handed over separate folders but not this chain, the receiving team has to rebuild it.

## Documents preserve conclusions better than reasoning

A design document often records the selected state:

> Field X is mandatory for active suppliers.

It may not preserve:

- which alternatives were considered;
- why the field became mandatory;
- which countries objected;
- which source systems lacked the data;
- which temporary treatment was accepted;
- which population was excluded;
- when the decision should be reviewed.

This information often exists in:

- workshop notes;
- ticket comments;
- email;
- meeting recordings;
- personal notebooks;
- consultant memory.

The final document contains the conclusion, but not enough of the reasoning to evaluate a later change.

This becomes a problem when the original conditions no longer hold.

For example:

- a new country joins;
- a legacy system is replaced;
- the regulatory requirement changes;
- an interface no longer needs the field;
- a default creates operational problems;
- data quality improves;
- a temporary exception reaches its expiry date.

AMS can see what the project decided.

It cannot determine whether the decision should still apply.

## Configuration preserves behaviour, not intent

Production configuration is often treated as the final source of truth.

It is certainly the strongest evidence of what the system currently does.

It does not automatically explain why.

A configured rule can tell the support team:

- which fields are checked;
- under which technical conditions;
- whether an error or warning is raised;
- which workflow route is used.

It may not explain:

- the underlying business policy;
- the owner of the policy;
- the source-data limitation that shaped it;
- whether it was intended as temporary;
- which countries approved it;
- which downstream processes depend on it;
- which alternative was rejected.

SAP currently positions SAP Master Data Governance as a governance layer that combines governed models, policy, metadata, workflows, validation, data-quality monitoring and auditable changes.

The platform can preserve operational data governance and changes to governed records.

The implementation programme must still preserve the architectural and delivery reasoning that explains how its particular model, rules and integrations were designed.

## Tickets preserve discussion, not necessarily the approved state

Jira and similar systems retain valuable history.

They are useful for understanding:

- who raised an issue;
- which options were discussed;
- what work was assigned;
- which defects were found;
- when a ticket was closed.

A closed issue does not automatically become a clean model decision.

Typical problems include:

- the final decision appears in the middle of a long comment thread;
- the ticket closes after a technical fix without updating the model;
- several issues affect the same attribute;
- the summary no longer reflects the implemented solution;
- links point to outdated documents;
- a temporary workaround is mistaken for the final design;
- the decision was made in a meeting and only partially recorded.

After go-live, AMS may find the ticket but still be unable to identify the approved current state.

A ticket should track the work.

The model should preserve the approved outcome.

## Test evidence proves behaviour, not full meaning

A test can prove that:

- a validation raises an error;
- a workflow routes to a role;
- a value is replicated;
- a mapping produces the expected target code;
- a record can be created.

It may not explain why that behaviour is correct.

A test case such as:

> Leave Tax Number blank and confirm error message.

does not show:

- which population requires the identifier;
- whether exemptions exist;
- who owns the rule;
- whether migrated records were treated differently;
- whether the rule is global or country-specific;
- which model version the test represents.

Test evidence is essential.

It is one link in the knowledge chain, not a substitute for the model and decision behind it.

## Mapping workbooks become historical snapshots

Migration mappings are often among the most detailed project artefacts.

They may contain:

- source and target fields;
- transformations;
- value mappings;
- comments;
- owners;
- statuses;
- local variations.

After go-live, their reliability starts to decline.

The operational model continues changing:

- fields become mandatory;
- values are added;
- rules are corrected;
- interfaces are modified;
- local exceptions are approved;
- source systems are retired;
- migration defaults are remediated.

The original workbook still explains how the initial load was prepared.

It no longer necessarily explains current production behaviour.

This does not make the workbook useless.

It means the organisation must distinguish between:

### Historical migration evidence

How the initial population was created.

### Current operational model

How the attribute is governed and maintained now.

When these are mixed, AMS may apply an old migration rule to a new operational change.

## Knowledge is lost at the boundaries between tools

Each project system can be well maintained and the overall knowledge can still be weak.

For example:

- Confluence contains the definition;
- Excel contains the mapping;
- SAP contains the rule;
- Jira contains the exception;
- the test tool contains evidence;
- an interface repository contains the downstream transformation.

The missing element is the relationship.

The programme may not have a reliable way to state that all six artefacts refer to the same business attribute.

Names are not enough.

One system calls it `Customer Group`.

Another uses `Customer Classification`.

A source calls it `CUST_SEG`.

An interface calls it `Market Segment`.

Some may refer to the same concept. Others may not.

Without stable model identity, post-go-live investigation becomes a text-search exercise followed by human interpretation.

## Knowledge disappears through ordinary changes

Loss does not require a major failure.

It happens through small events.

### A person leaves

No artefact records the context they supplied informally.

### A field is renamed

Old tickets and tests no longer match current terminology.

### A value list changes

The old mapping remains in an archived workbook.

### A local exception is approved

The global design is not updated.

### An emergency fix reaches production

The intended model remains unchanged.

### A defect is closed

The technical implementation is corrected, but the decision history is not.

### A new AMS supplier takes over

The previous team’s practical knowledge is summarised rather than transferred structurally.

### A source system is decommissioned

Access to the original values and metadata disappears.

None of these events seems large enough to trigger a knowledge-governance initiative.

Together, they make the implementation progressively harder to understand.

## The project often preserves too much and too little

Enterprise programmes usually retain large volumes of material.

This creates a paradox.

They preserve too much:

- meeting recordings;
- draft presentations;
- duplicate exports;
- old mapping files;
- screenshots;
- email attachments;
- outdated specifications.

At the same time, they preserve too little:

- stable object identity;
- current definitions;
- decision rationale;
- affected relationships;
- ownership;
- approved exceptions;
- links between tests and model versions.

The result is an archive with high volume and low navigability.

The organisation can prove that work happened.

It cannot easily reuse the knowledge produced by that work.

## Knowledge transfer sessions do not solve structural loss

Knowledge-transfer sessions are useful.

They allow AMS to:

- meet the project team;
- ask questions;
- observe demonstrations;
- understand operational routines;
- learn practical shortcuts.

They are not sufficient as the main transfer mechanism.

A recorded session has several limitations:

- information is difficult to locate later;
- statements may be informal or incomplete;
- slides may already be outdated;
- decisions may not be distinguished from personal opinion;
- new team members will not have attended;
- the content does not automatically update after model changes.

A session can explain the model.

It should not be the only place where the explanation exists.

## The most valuable knowledge is often treated as temporary

During implementation, many decisions are described as project-specific:

- migration default;
- temporary code;
- local workaround;
- source limitation;
- cutover exception;
- manual correction;
- blocked population.

After go-live, these can become long-term operational facts.

For example:

- placeholder values remain in thousands of records;
- a temporary code continues driving workflow;
- an exception population never receives remediation;
- merged legacy classifications affect reporting;
- source identifiers remain necessary for reconciliation;
- manually enriched fields have no ongoing owner.

The project may consider the migration complete.

AMS inherits the consequences.

Temporary implementation knowledge should therefore be evaluated for operational relevance before handover.

The question is:

> Will someone need this information to understand, correct or safely change production data later?

If yes, it belongs in the living model.

## Knowledge loss creates key-person dependency

When relationships and decisions are not represented explicitly, the organisation relies on people who can mentally reconstruct them.

These people become valuable because they remember:

- why the rule exists;
- which workbook is authoritative;
- what the local code means;
- where the workaround was implemented;
- which test proves the behaviour;
- which business owner approved the exception.

This may appear efficient while the individuals remain available.

It is an operational risk.

A project should not require the original architect or migration consultant to explain routine production behaviour indefinitely.

The purpose of knowledge governance is not to remove expertise.

It is to ensure experts are used for judgement rather than historical reconstruction.

## Knowledge loss increases the cost of every change

Suppose the business asks to add one supplier classification value.

In a well-structured model, AMS can identify:

- the value-list owner;
- affected attributes;
- migration or historical mappings;
- workflow conditions;
- interfaces;
- reports;
- tests;
- existing records.

Without that structure, the team must rediscover the dependency network.

The cost of the change includes:

- document searches;
- meetings;
- environment inspection;
- interviews;
- repeated validation;
- risk buffers;
- additional testing.

The technical configuration may take an hour.

The investigation may take two weeks.

This is one reason seemingly small SAP changes become expensive after go-live.

The organisation is not paying only for implementation.

It is paying to reconstruct the model before implementation can begin.

## Knowledge loss weakens governance

SAP describes effective master data management as creating a trusted master reference and preventing inconsistent versions of important data across processes, operations and analytics.

The same principle applies to implementation knowledge.

If several teams maintain different interpretations of:

- a business definition;
- a rule;
- an ownership assignment;
- a value list;
- a local exception;

then the organisation can have governed records inside an insufficiently governed implementation model.

The platform may enforce a rule consistently.

The organisation may no longer know whether the rule is the right one.

That is not a technical reliability problem.

It is a governance problem.

## The knowledge that should survive go-live

We do not recommend preserving every project detail indefinitely.

The living model should retain knowledge needed to operate and change the solution safely.

For critical objects, this normally includes:

### Business meaning

What does the entity, attribute or relationship represent?

### Context

Where does it apply?

Global, country, company code, sales area, purchasing organisation or another scope?

### Ownership

Who owns the definition, values, rule and operational data?

### Physical representation

Where is it implemented in SAP MDG, S/4HANA, interfaces and relevant sources?

### Rules

Which validations, derivations, workflow conditions and quality checks apply?

### Lineage

Where do important values originate, and how were migrated values transformed?

### Decisions

Why was the current treatment selected?

### Exceptions

Which deviations and temporary populations remain?

### Dependencies

Which mappings, interfaces, reports and tests rely on the object?

### Evidence

Which tests, data profiles or approvals support the current state?

### Change history

What changed, when, why and with whose approval?

This is much smaller than the complete project archive.

It is also far more useful operationally.

## Build a living model, not a final document set

The phrase “final documentation” is misleading.

Production is not final.

After go-live:

- values change;
- rules evolve;
- local requirements appear;
- ownership moves;
- new integrations are added;
- defects reveal model weaknesses;
- regulations change;
- remediation closes exceptions.

The organisation needs two knowledge layers.

## Historical project evidence

This includes:

- approved designs;
- migration extracts;
- mapping baselines;
- test results;
- cutover reports;
- release records;
- original decisions.

Historical evidence should remain immutable or clearly versioned.

## Living operational model

This includes the current:

- definitions;
- ownership;
- active mappings;
- rules;
- value lists;
- dependencies;
- exceptions;
- operational decisions.

The living model changes through controlled review.

When these layers are separated, the organisation can understand both:

- how the production state was created; and
- how the model should work now.

## Assign ownership before the project ends

Knowledge becomes stale quickly when nobody owns it.

The project should assign operational responsibility for:

- domain model;
- business definitions;
- value lists;
- validation rules;
- mapping lineage;
- integration dependencies;
- exceptions;
- decision register;
- change approval.

Ownership should not remain with “the project.”

The project is temporary.

A useful ownership model may include:

- business domain owner;
- data architect;
- MDG product or platform owner;
- data steward;
- integration owner;
- AMS technical owner;
- data-quality owner.

Each role should know which model objects it maintains and which changes require broader approval.

## Make change update the knowledge automatically or procedurally

The model will remain current only if model updates are part of the change process.

A production change should not be considered complete until the relevant knowledge is reconciled.

For a material field change, this may include:

1. Update the business definition or confirm it remains unchanged.
2. Update the relevant target endpoint.
3. Update mappings and value lists.
4. Record the decision.
5. Update rule references.
6. Identify affected tests.
7. Record operational remediation.
8. Verify implementation.
9. Publish the new model baseline.

This does not need to be a large documentation task.

It should be part of the definition of done.

## Preserve decisions as structured records

A useful decision record includes:

- decision identifier;
- issue;
- affected model objects;
- current state;
- alternatives;
- selected option;
- rationale;
- evidence;
- approvers;
- effective date;
- review condition.

The review condition is often omitted.

It matters because some decisions depend on temporary facts:

- a source field is unavailable;
- a country is outside scope;
- a new interface is not ready;
- remediation has not been completed;
- a legal interpretation is pending.

A decision can remain valid until a condition changes.

Recording that condition helps AMS know when the decision should be reconsidered.

## Preserve accepted uncertainty

Projects often try to make handover look complete by presenting every object as resolved.

This creates false certainty.

Some areas may remain uncertain:

- a source definition is weak;
- a local process is changing;
- a value mapping is provisional;
- a quality threshold has not been proven;
- a workaround is still active.

The correct response is not to hide the uncertainty.

Record:

- what is uncertain;
- why;
- affected population;
- current treatment;
- risk;
- owner;
- review date.

Known uncertainty can be monitored.

Hidden uncertainty becomes an incident.

## Use operational scenarios to test knowledge retention

Before releasing the project team, test whether the receiving team can answer realistic questions.

### Scenario: unexplained migrated value

Can AMS identify:

- the source field;
- transformation;
- value mapping;
- migration wave;
- relevant decision;
- remediation obligation?

### Scenario: validation change request

Can AMS identify:

- the business rule;
- owner;
- affected contexts;
- existing data population;
- mappings;
- interfaces;
- required tests?

### Scenario: new local exception

Can the team determine:

- whether the global model changes;
- whether a local extension is appropriate;
- which configuration and mapping objects are affected;
- who may approve the exception?

### Scenario: interface failure

Can support distinguish between:

- incorrect governed data;
- replication failure;
- consumer-side rejection;
- obsolete value mapping?

If these scenarios require contacting departing consultants, the knowledge has not yet been transferred structurally.

## Measure knowledge health

Knowledge management should not be evaluated by document count.

We prefer indicators such as:

### Ownership coverage

What proportion of critical model objects has an active owner?

### Traceability coverage

Can important target fields be traced to definitions, sources, rules and evidence?

### Decision coverage

Do material exceptions and model choices have recorded rationale?

### Staleness

Which model objects have not been reviewed since relevant configuration changes?

### Broken references

Do mappings, rules or tests refer to retired objects?

### Unresolved deviations

Which production differences have passed their review date?

### Key-person dependency

Which critical areas still require one specific individual for explanation?

### Investigation time

How long does it take AMS to answer a model question?

These indicators show whether knowledge remains operationally usable.

## The role of AI

AI can help recover and maintain project knowledge.

It can:

- extract candidate definitions from documents;
- summarise ticket discussions;
- connect similar field names;
- propose decision records;
- identify conflicting rules;
- find artefacts related to a model object;
- draft handover summaries;
- suggest missing ownership;
- prepare impact reports.

This is particularly useful when the existing evidence is fragmented.

AI cannot determine automatically which historical statement represents the approved current truth.

A closed ticket may describe a rejected option.

A newer document may contain a copied error.

Two similar fields may have different organisational contexts.

An AI-generated relationship should therefore become a proposal, not an approved model update.

Our operating principle remains:

> AI proposes. Deterministic validators check structure. Responsible people approve meaning and change.

## Where Martenweave fits

Martenweave was built around the observation that real model knowledge is distributed across Excel mappings, datasets, tickets, validation reports, migration notes, decisions, SAP context and project history. Its public product description states that this fragmentation makes ownership unclear, disputes slow, handover painful and AI assistance risky.

Martenweave provides structured objects that connect:

- fields;
- attributes;
- rules;
- owners;
- issues;
- decisions.

It validates references, detects model and dataset gaps, traces impact and allows AI-assisted changes only through reviewable proposals.

The current core includes:

- canonical Markdown and YAML model files;
- deterministic validation;
- generated SQLite and JSONL indexes;
- search and structured queries;
- trace and impact analysis;
- dataset profiling and gap detection;
- ownership, audit, health and scorecard reports;
- CSV and XLSX review flows;
- PatchProposal-to-ChangeRequest lifecycle;
- issue drafts and GitHub-ready change bundles.

This architecture separates durable model truth from generated views and indexes.

The canonical files preserve the approved objects and relationships.

Indexes, reports and review exports can be regenerated.

Martenweave does not replace SAP MDG, Jira, Confluence or enterprise catalogues. It is intended to work beside them as a validated model registry.

## A Martenweave knowledge-retention flow

```text id="knowledge-loss-2"
Project evidence
Excel, tickets, datasets, decisions and SAP context
                         ↓
              Structured model objects
                         ↓
        Validation, ownership and traceability
                         ↓
              Approved model baseline
                         ↓
       AMS change proposals and impact analysis
                         ↓
             Maintained operational model
```

The objective is not to import the whole project archive.

The objective is to preserve the high-value relationships that make the archive understandable.

## Start with the knowledge most likely to be lost

A programme does not need to model everything before go-live.

We recommend prioritising:

- critical business attributes;
- high-impact validation rules;
- important value lists;
- migrated defaults;
- local exceptions;
- complex transformations;
- ownership;
- critical interface dependencies;
- unresolved remediation;
- major architecture decisions.

These areas are likely to generate future questions and expensive investigations.

A focused model of 50 critical objects can provide more operational value than thousands of unstructured documents.

## A practical recovery approach for an existing live system

Some organisations recognise the problem only after go-live.

The knowledge can still be reconstructed.

### Step 1: Choose one operational pain point

Examples:

- recurring validation incidents;
- unexplained migrated values;
- difficult value-list changes;
- unclear local exceptions;
- heavy dependence on one consultant.

### Step 2: Identify the critical objects

Select the fields, rules, mappings and decisions involved.

### Step 3: Collect evidence

Use:

- configuration;
- design documents;
- tickets;
- mappings;
- datasets;
- tests;
- support records;
- interviews.

### Step 4: Separate current truth from historical evidence

Do not assume the latest file is correct.

Compare the evidence with production behaviour and responsible-owner confirmation.

### Step 5: Build explicit relationships

Connect:

- definition;
- owner;
- physical endpoint;
- source;
- mapping;
- rule;
- decision;
- evidence;
- consumers.

### Step 6: Record uncertainty

Do not invent certainty where evidence is incomplete.

### Step 7: Put future changes through the model

Recovery only creates value if the reconstructed knowledge remains maintained.

This approach is narrower than a full documentation project and more likely to produce operational benefit.

## Common mistakes

### Writing one final handover document

It becomes outdated after the first material change.

### Retaining every project artefact without curation

Volume does not create navigability.

### Assuming configuration explains intent

It shows behaviour, not full rationale.

### Assuming Jira is the decision register

Tickets contain discussion and delivery history, not always the approved model state.

### Treating migration mappings as current operational truth

They describe the initial load and may not reflect later governance changes.

### Depending on recordings

They are supporting evidence, not maintainable model objects.

### Storing relationships only as text

Explicit object references are easier to validate and traverse.

### Ignoring uncertainty

Unsupported assumptions become inherited “facts.”

### Leaving ownership with the implementation partner

The operating organisation must own the living model.

### Starting knowledge capture at the end

The most important reasoning may already be unavailable.

## What management should ask before closing the programme

1. Which model baseline does production implement?
2. Can critical attributes be traced to their definitions, sources, rules and owners?
3. Are important design decisions preserved with rationale?
4. Which temporary migration treatments remain in production data?
5. Which local exceptions exist?
6. Where does production differ from the intended design?
7. Which unresolved populations require remediation?
8. Can AMS assess the impact of a field or value-list change?
9. Can the receiving team identify the correct regression tests?
10. Which areas still depend on specific consultants?
11. Who owns the living model after project closure?
12. How will operational changes update it?

If these questions cannot be answered, project closure is being measured against delivery completion rather than operational independence.

## Our conclusion

Project knowledge does not disappear because teams failed to create documents.

It disappears because the implementation knowledge was never preserved as a connected, owned and maintainable model.

The definition is in one place.

The mapping is in another.

The decision is in a ticket.

The implementation is in SAP.

The evidence is in a test tool.

The final explanation remains inside a person.

After go-live, the links weaken first.

The artefacts remain, but the organisation can no longer move confidently between them.

We reduce this risk by preserving:

- stable model objects;
- business meaning;
- ownership;
- lineage;
- rules;
- decisions;
- exceptions;
- dependencies;
- evidence;
- change history.

The practical question is not:

> Did we deliver the documentation?

It is:

> Can someone who was not part of the project understand why the model works this way and change it without rebuilding the original project team?

When the answer is yes, knowledge has been transferred.

When the answer is no, go-live has ended the project—but another discovery phase is waiting inside AMS.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We work on practical model governance for SAP migration, MDG, MDM and AMS programmes. We focus on preserving the relationships between model design, source data, configuration, decisions and operational ownership so that project knowledge remains usable after the original team has left.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a governance layer that unifies master data, policy and metadata and supports governed models, workflow-based changes, validated values, data-quality monitoring and auditable changes. SAP also describes master data management as the discipline of maintaining a trusted reference for important business data.

Martenweave’s current public documentation describes the problem of model knowledge being distributed across spreadsheets, datasets, tickets, validation reports, decisions, SAP context and project history. It also documents structured model objects, deterministic validation, trace and impact analysis, reporting and controlled change proposals.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
