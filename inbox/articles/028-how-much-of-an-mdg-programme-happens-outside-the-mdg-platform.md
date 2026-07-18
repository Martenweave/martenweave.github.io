# How Much of an MDG Programme Happens Outside the MDG Platform?

**Reviewed: 14 July 2026**

The programme has selected SAP Master Data Governance.

The licence is approved. The system landscape is available. Architects have started designing the data model, change-request types, validations and workflows.

Management expects the difficult part to be the MDG implementation.

Several months later, the programme discovers where most of its unresolved work actually sits:

- nobody agrees which legacy source owns several critical attributes;
- country mappings use different definitions;
- the latest source extracts do not contain fields assumed by the design;
- temporary defaults have no approved expiry;
- workflow ownership remains politically unresolved;
- test cases refer to old model versions;
- interfaces cannot consume new values;
- migration and operational rules differ;
- handover material explains configuration but not the decisions behind it.

SAP MDG may be functioning correctly.

The programme around it is not yet ready.

This leads to an uncomfortable but important question:

> How much of an SAP MDG programme actually happens inside SAP MDG?

There is no universal percentage.

The answer depends on:

- whether the programme is greenfield or brownfield;
- the number of source and consuming systems;
- the number of countries;
- migration complexity;
- data quality;
- local variation;
- governance maturity;
- the amount of custom behaviour;
- whether the organisation already has reliable modelling, catalogue and delivery controls.

But in a complex implementation, it is entirely possible for the majority of programme activities to happen outside the MDG application itself.

That does not mean SAP MDG is unimportant.

It means the platform is the operational centre of a wider system of model decisions, source data, mappings, integrations, testing and organisational governance.

## Start with what SAP MDG is responsible for

SAP currently positions SAP Master Data Governance as a central governance layer that unifies master data, policy and metadata. Its stated capabilities include governed models, golden records, profiling and matching, steward workflows, validated values, data-quality monitoring, mass changes and an audit trail of master-data changes.

These are substantial operational capabilities.

Depending on the chosen implementation style and domain, work inside or directly around MDG may include:

- configuring the governed data model;
- defining entities, attributes and relationships;
- configuring change-request processes;
- implementing validations and derivations;
- designing workflow routing;
- configuring value help and governed values;
- defining stewardship roles;
- supporting consolidation and matching;
- monitoring master-data quality;
- managing operational changes;
- activating and distributing approved records.

This is the core platform implementation.

It is essential.

But it begins only after—or in parallel with—a much broader set of questions.

The platform needs to be told:

- what the organisation means by a customer, supplier or product;
- which attributes belong to the model;
- who owns them;
- where their values come from;
- which local differences are legitimate;
- which validations should apply;
- which systems will consume the governed result.

Those questions do not answer themselves because MDG has been installed.

## The programme is larger than the product

A useful model has three layers.

```text
Layer 1:
Operational governance platform

Layer 2:
Implementation and integration layer

Layer 3:
Programme knowledge and decision layer
```

SAP MDG occupies the centre of Layer 1.

It may also support parts of the other layers.

The full programme extends much further.

## Layer 1: operational governance

This is where governed master-data behaviour runs.

Typical concerns include:

- record creation and maintenance;
- validation;
- derivation;
- workflow;
- stewardship;
- matching and consolidation;
- activation;
- quality monitoring;
- auditability;
- mass processing.

This is the part most visible in product demonstrations.

It is also the part most likely to be treated as “the MDG programme.”

That label is too narrow.

## Layer 2: implementation and integration

This layer connects MDG to the surrounding landscape.

It includes:

- source-system analysis;
- target-model design;
- data migration;
- mappings;
- transformations;
- value conversions;
- interfaces;
- replication;
- security;
- test automation;
- release management;
- monitoring.

Some of this work may use SAP tooling.

Some may be delivered through another migration or integration platform.

It is still part of the MDG programme because MDG cannot operate in isolation.

## Layer 3: programme knowledge and decisions

This layer explains why the implemented solution has its current form.

It includes:

- business definitions;
- architectural decisions;
- ownership;
- accepted exceptions;
- global and local requirements;
- source-authority decisions;
- mapping approval;
- dataset evidence;
- test evidence;
- risk acceptance;
- handover knowledge.

This layer is often distributed across:

- Excel;
- Jira;
- Confluence;
- SharePoint;
- email;
- meeting notes;
- configuration documents;
- individual memory.

It may contain some of the programme’s most valuable knowledge while having the weakest control.

## 1. Business and governance design happens largely outside the platform

Before implementing a workflow, the organisation needs to decide:

- Which business roles own the data?
- Who may propose a change?
- Who must approve it?
- Which decisions are global?
- Which remain local?
- Which attributes are centrally governed?
- Which may be maintained operationally elsewhere?
- What happens when business units disagree?

These are operating-model decisions.

SAP MDG can execute the resulting governance process.

It cannot determine the organisation’s authority structure.

For example, the platform can route a supplier tax-data change to Country Finance.

The programme must decide:

- whether Country Finance has authority;
- whether global review is also required;
- which countries use the process;
- what counts as an exception;
- who owns unresolved cases.

A workflow can be technically correct and organisationally wrong.

The hard work may be the negotiation before configuration begins.

## 2. Definition and model harmonisation happen outside MDG before they happen inside it

A company may have several definitions of “customer,” “supplier group” or “risk classification.”

Different systems may use the same field name for different concepts.

Different countries may use different labels for the same concept.

Before selecting the technical representation, the programme needs to establish:

- business meaning;
- scope;
- granularity;
- organisational context;
- ownership;
- relationships;
- lifecycle.

Consider Customer Group.

One legacy system may use it for marketing segmentation.

Another may use it for pricing.

SAP may represent the target attribute at sales-area level.

The target field cannot be selected safely from name similarity.

The programme needs an independent business attribute:

```text
Attribute:
Customer Group for Sales Processing

Definition:
Classification used in sales-area processes.

Context:
Sales Area

Owner:
Global Order-to-Cash Data Owner
```

Only then can the team connect:

- source fields;
- transformations;
- target endpoint;
- validation;
- testing.

The model ultimately becomes implemented in MDG and related SAP structures.

The semantic harmonisation work precedes the configuration.

## 3. Source-system discovery happens outside MDG

SAP MDG governs the target master-data process.

The programme still needs to understand the systems supplying or consuming that data.

This includes:

- legacy ERP systems;
- CRM;
- procurement platforms;
- product systems;
- local applications;
- external databases;
- spreadsheets;
- third-party providers.

For every important attribute, the programme may need to determine:

- Which systems contain it?
- Which source is authoritative?
- Are definitions equivalent?
- Is the data maintained at the correct level?
- Is history required?
- Is the source complete?
- Can the source deliver it in time?
- Which source wins when values conflict?

MDG cannot make source authority a technical fact if the business has never agreed on it.

The programme may discover that the “authoritative source”:

- does not cover every country;
- uses obsolete codes;
- stores data at the wrong organisational level;
- has no reliable ownership;
- contains historical values rather than current values.

These findings influence the MDG design, but they originate outside the platform.

## 4. Data profiling and quality assessment happen before operational governance can help

A target rule may require a value to be mandatory.

The source data may be 40% complete.

This creates a programme decision:

- cleanse the source;
- enrich during migration;
- derive the value;
- introduce a temporary default;
- reduce the target requirement;
- exclude affected records.

SAP states that automated S/4HANA processes depend heavily on clean and correct master data and recommends curating master data well before implementation.

That preparation usually requires:

- source extracts;
- profiling;
- completeness analysis;
- duplicate analysis;
- value-distribution analysis;
- relationship checks;
- remediation;
- ownership.

MDG can monitor and improve operational quality after implementation.

It does not remove the need to understand the starting population.

## 5. Source-to-target mapping is usually a major external workstream

Mappings connect legacy reality to the intended target model.

They may include:

- source fields;
- target fields;
- transformation logic;
- value mappings;
- defaults;
- derivations;
- exclusions;
- context;
- ownership;
- approval;
- test evidence.

These mappings often live in Excel or a migration platform.

They are sometimes treated as temporary delivery artefacts.

In practice, they encode important model decisions.

A mapping may decide:

- which source is trusted;
- how several values are combined;
- which distinctions are retained;
- which records are excluded;
- how local codes become global values.

That is not merely technical ETL logic.

It can define what the migrated master data means.

## 6. Migration is not an internal MDG workflow

Operational governance and initial migration solve different problems.

An operational MDG process may govern one record change at a time through validation and approval.

Migration may need to process:

- millions of records;
- incomplete historical data;
- duplicates;
- obsolete codes;
- complex source relationships;
- inactive populations;
- temporary identifiers;
- conversion rules.

Migration may use different:

- interfaces;
- staging structures;
- validation timing;
- approval treatment;
- sequencing;
- reconciliation.

The target operational model must still be respected.

But the migration path often exists substantially outside MDG.

This is why teams need to distinguish:

```text
Operational rule
```

from:

```text
Migration treatment
```

For example:

```text
Operational:
Supplier Classification required before activation.

Migration:
Inactive suppliers may use a temporary controlled value.

Post-migration:
Temporary population must be remediated before reactivation.
```

Without this distinction, migration workarounds can become permanent business rules.

## 7. Integration multiplies the programme boundary

SAP describes master-data integration as the distribution layer that provides consuming applications with a harmonised view of master data in its current state. It distinguishes this distribution responsibility from improving the quality of the master data itself.

An MDG programme therefore needs to address:

- inbound sources;
- outbound consumers;
- message structures;
- transformation;
- replication timing;
- error handling;
- reconciliation;
- monitoring;
- code compatibility;
- ownership.

A new value in MDG may need corresponding changes in:

- S/4HANA;
- procurement;
- CRM;
- analytics;
- integration middleware;
- local applications.

The value-list configuration may take minutes.

The ecosystem change may take weeks.

The programme should not measure impact based only on the size of the MDG configuration update.

## 8. Testing happens across the complete chain

A test that proves a field can be entered in MDG is useful.

It does not prove that:

- the source can provide the value;
- migration transforms it correctly;
- workflow routes correctly;
- the value activates successfully;
- replication includes it;
- consumers interpret it correctly;
- local exceptions work;
- reporting remains consistent.

The test landscape may include:

- unit testing;
- configuration testing;
- migration testing;
- integration testing;
- workflow testing;
- security testing;
- data-quality testing;
- UAT;
- regression testing;
- cutover rehearsal.

Much of this work takes place outside the MDG user interface.

The real test object is often an end-to-end business and data path.

```text
Source record
→ extraction
→ transformation
→ target load
→ MDG validation
→ activation
→ replication
→ consumer
```

## 9. Reconciliation is an external evidence process

After a load or mass change, the programme needs evidence that the result is correct.

Useful reconciliation may include:

- source and target record counts;
- field-level comparisons;
- value-distribution comparisons;
- relationship counts;
- duplicate analysis;
- rejected-record analysis;
- activation status;
- downstream delivery status.

A technically successful load is not enough.

For example:

```text
100,000 records submitted
99,500 loaded
```

The result may look strong.

But the 500 failures may include:

- the largest customers;
- all records from one country;
- suppliers with active purchase orders;
- records with high compliance risk.

Reconciliation needs business context that the execution log alone does not provide.

## 10. Global and local alignment happens outside the platform before configuration

A global template may define:

- shared entities;
- shared attributes;
- common values;
- standard workflow;
- central ownership.

Local teams may require:

- legal identifiers;
- country-specific formats;
- local approval roles;
- local values;
- source-specific mappings;
- regulatory evidence.

MDG can implement contextual rules.

The programme still needs to decide whether a request is:

- a legitimate local requirement;
- a local extension;
- a contextual override;
- a temporary deviation;
- unnecessary customisation.

This analysis normally spans workshops, legal evidence, source data and target architecture.

Configuration is the result of the decision.

It is not a substitute for the decision.

## 11. Organisational change happens almost entirely outside the platform

An MDG implementation changes responsibilities.

People may lose or gain authority over data.

Local teams may need to submit changes through central governance.

Data stewards may receive new operational responsibilities.

Business owners may be expected to approve definitions and quality thresholds.

The programme needs:

- role design;
- capacity planning;
- training;
- communication;
- escalation;
- service levels;
- governance forums;
- performance measures.

A workflow does not create an operating model merely because users have been assigned to steps.

If ownership is unclear, the workflow will expose the ambiguity rather than solve it.

## 12. Handover and AMS knowledge largely exist outside operational configuration

After go-live, AMS receives incidents such as:

- Why is this field mandatory?
- Why was this record defaulted?
- Which source supplied this value?
- Is this country exception intentional?
- Which interface uses this code?
- Who may approve the change?

Configuration can show what currently happens.

It may not explain:

- why that treatment was chosen;
- which alternatives were rejected;
- whether the rule was temporary;
- which dataset supported it;
- which local context applies.

The support model therefore depends on preserved implementation knowledge outside the platform.

Without it, AMS repeatedly reconstructs project history.

## Why programmes underestimate the external work

Several factors create the illusion that the MDG platform is most of the programme.

## Product demonstrations show the finished operational path

A demo can show:

- create record;
- validate;
- approve;
- activate;
- monitor.

It does not show the months required to agree:

- the model;
- ownership;
- source authority;
- mappings;
- local exceptions;
- integration changes.

The demo is not misleading.

It demonstrates the product.

The programme must avoid confusing product capability with implementation readiness.

## Configuration is visible and countable

Teams can count:

- configured objects;
- completed workflows;
- delivered transports;
- resolved defects.

Knowledge work is less visible:

- resolving definitions;
- analysing source data;
- negotiating ownership;
- assessing impact;
- documenting decisions.

The invisible work may consume more senior attention than configuration.

## External artefacts are treated as temporary

Mapping workbooks, migration reports and decision logs are often called project documents.

This encourages underinvestment.

Some of these artefacts contain knowledge needed for:

- later waves;
- post-go-live support;
- audits;
- changes;
- platform replacement.

Temporary delivery formats can contain long-lived model truth.

## Responsibilities are split across vendors and workstreams

One partner implements MDG.

Another handles migration.

Another manages integration.

Business teams own cleansing.

Testing has a separate organisation.

Each group may report that its own work is progressing.

The cross-workstream model remains fragmented.

## What should remain inside MDG

The answer is not to move all programme artefacts into another tool.

MDG should remain the operational authority for the master-data governance processes it runs.

Depending on the implementation, this includes:

- governed master records;
- operational validation;
- workflow;
- stewardship;
- matching and consolidation;
- activation;
- quality monitoring;
- audit of operational changes.

These capabilities belong close to the operational record.

## What should remain outside—but controlled

The programme also needs a controlled external layer for:

- independent model specification;
- source and target endpoints;
- migration mappings;
- dataset profiles;
- gap analysis;
- implementation decisions;
- local deviations;
- test evidence;
- impact analysis;
- handover knowledge.

“Outside” should not mean “uncontrolled.”

That is the central mistake.

## Do not force every artefact into SAP MDG

A programme may respond by trying to store every mapping, decision, test and source profile inside the MDG platform.

This creates several problems.

### Tool misuse

Operational master-data governance becomes mixed with project knowledge management.

### Excessive customisation

The team builds custom objects and workflows for capabilities better handled elsewhere.

### Reduced portability

The independent model becomes tied to one implementation platform.

### Delayed value

The programme spends time extending the platform before proving the external control process.

### Confused authority

Users cannot distinguish operational master data from model-delivery metadata.

The goal is not one database for everything.

It is clear authority across connected systems.

## Do not leave every external artefact independent

The opposite approach is also weak.

The programme may leave:

- mappings in Excel;
- decisions in Jira;
- requirements in Confluence;
- data profiles in reports;
- tests in another tool.

Each tool performs its job.

No layer connects the approved model across them.

This creates competing truths.

The right pattern is:

```text
Specialist tools keep their operational responsibilities.

A shared model layer preserves identity, relationships and approved state.
```

## How to measure how much work is outside MDG

Do not rely on a generic percentage.

Measure the programme’s actual work packages.

Create an inventory using categories such as:

| Category | Primarily inside MDG | Primarily outside |
|---|---:|---:|
| Governed data-model configuration | Yes | Design inputs outside |
| Change-request workflow | Yes | Role and policy decisions outside |
| Operational validation | Yes | Requirement and evidence outside |
| Source-system analysis | No | Yes |
| Data profiling and cleansing | Partial | Mostly |
| Source-to-target mapping | Partial | Mostly |
| Initial migration | Partial | Mostly |
| Integration | Partial | Significant |
| End-to-end testing | Partial | Significant |
| Organisational change | No | Yes |
| Decision management | Partial | Mostly |
| Handover knowledge | Partial | Significant |

Then estimate for each work package:

- effort;
- cost;
- number of dependencies;
- number of unresolved decisions;
- number of systems involved;
- operational risk.

This provides a programme-specific answer.

## Separate effort from value

A small amount of MDG configuration can have high business value.

A large amount of migration analysis may be required only once.

The percentage of effort does not determine the importance of the platform.

The more useful question is:

> Which programme risks cannot be controlled by MDG configuration alone?

These risks often include:

- unknown source ownership;
- incomplete data;
- inconsistent mappings;
- conflicting local rules;
- unsupported downstream consumers;
- missing decision evidence;
- weak handover.

## A practical operating model

We recommend separating responsibilities explicitly.

## SAP MDG

Owns:

- operational master-data governance;
- record-level workflow;
- configured validation;
- activation;
- matching and consolidation where applicable;
- operational quality monitoring;
- audit of governed record changes.

## Migration and integration tools

Own:

- extraction;
- transformation;
- loading;
- interface execution;
- technical monitoring;
- reconciliation support.

## Jira and delivery systems

Own:

- work;
- defects;
- delivery tasks;
- status;
- release execution.

## Confluence and documentation tools

Own:

- narrative guidance;
- architecture explanation;
- procedures;
- training material.

## Model governance layer

Owns:

- stable model identities;
- independent model specification;
- source and target relationships;
- mappings;
- rules;
- contexts;
- decisions;
- dataset expectations;
- impact;
- approved model change.

This last responsibility is where Martenweave is positioned.

## Where Martenweave fits

The current Martenweave Core README describes it as an open-source, backend-first model governance and evidence layer for SAP migration, MDM, data governance and AMS. It turns spreadsheets, datasets, tickets, validation reports, decisions and SAP context into canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-approved AI patch proposals.

The current source version is identified as 0.5.0. The project remains CLI-driven and backend-first; it does not include a hosted editable product UI, although a local static viewer and an interactive local prototype are available for inspection and demonstration.

Its core principles are explicit:

- canonical files are the source of truth;
- generated indexes are disposable;
- deterministic validation runs before indexing;
- AI creates PatchProposals rather than silently changing the model;
- operation is local-first.

This makes Martenweave relevant specifically to the work that happens around the operational MDG platform.

It is not intended to replace MDG.

## The Martenweave pipeline

The current core describes the controlled flow as:

```text
evidence
→ proposal
→ validation
→ gaps and impact
→ review
→ GitHub issue or pull request
```

It summarises the principle as:

> Agents propose. Validators verify. Humans approve. Git records.



This pipeline can connect external programme evidence without turning Martenweave into a workflow engine or operational MDM platform.

## A concrete example: making a field mandatory

The business asks to make Supplier Classification mandatory.

### Inside MDG

The team may need to:

- configure or adjust the field;
- implement the validation;
- update workflow behaviour;
- update the user interface;
- test operational maintenance.

### Outside MDG

The programme must still determine:

- which suppliers are in scope;
- whether source systems contain the value;
- completeness by source and country;
- which values are valid;
- how legacy codes map;
- whether temporary treatment is allowed;
- which interfaces consume the field;
- who owns remediation;
- which tests become stale;
- which decision authorises the change.

The configuration may be the smallest part of the change.

It is the operational endpoint of a much larger decision.

## Another example: introducing a new value

The business requests a new risk value: `UNDER_REVIEW`.

### Inside MDG

- add the value;
- expose it to users;
- adjust validation;
- adjust workflow if required.

### Outside MDG

- define the meaning;
- determine who may assign it;
- decide whether it is temporary;
- map source values;
- update interfaces;
- update reporting;
- assess current records;
- add test cases;
- document remediation;
- approve local or global applicability.

A new dropdown value can be a small configuration change and a large governance change.

## Another example: onboarding a new country

A country rollout may require:

### Inside MDG

- contextual configuration;
- local workflows;
- value help;
- roles;
- validation.

### Outside MDG

- local-source discovery;
- field mapping;
- data profiling;
- legal requirements;
- local ownership;
- value harmonisation;
- migration planning;
- integration changes;
- test data;
- training;
- handover.

The “MDG rollout” may therefore be mostly a local data, process and integration programme with MDG at its governed centre.

## A useful programme diagnostic

Ask every workstream to identify its authoritative objects.

### Business governance

- definitions;
- owners;
- decisions.

### Migration

- source endpoints;
- mappings;
- transformations;
- datasets;
- gaps.

### MDG configuration

- target endpoints;
- rules;
- workflows;
- implementation evidence.

### Integration

- contracts;
- consumers;
- value dependencies.

### Testing

- scenarios;
- expected behaviour;
- evidence;
- applicable baseline.

Then ask:

- Are the same model objects identified consistently?
- Are relationships explicit?
- Can one field be traced across all workstreams?
- Can a change identify affected evidence?
- Is the approved state distinguishable from proposed state?

If the answer is no, the programme has many managed workstreams and no managed model across them.

## A small Martenweave pilot

Do not attempt to model the complete MDG implementation.

Select one painful cross-platform scenario.

For example:

- supplier classifications;
- customer tax data;
- payment terms;
- global/local customer groups;
- Business Partner relationships.

Include:

- 30–100 critical attributes;
- one or two source systems;
- one dataset;
- target endpoints;
- mappings;
- rules;
- decisions;
- recent defects;
- current test evidence.

The pilot should demonstrate:

1. Stable identities across tools.
2. Deterministic reference validation.
3. Source-to-target traceability.
4. Dataset-to-model gap detection.
5. Impact analysis for one real change.
6. A reviewable PatchProposal.
7. A generated issue or change bundle.
8. A useful handover or readiness report.

The current core already exposes commands for validation, index generation, trace, impact, dataset readiness, proposal generation and issue-draft production.

The pilot should measure whether these capabilities reduce reconciliation work.

## What Martenweave should not do

The project’s current boundaries are explicit.

Martenweave is not:

- a hosted MDM platform;
- a generic workflow engine;
- an autonomous mutation system;
- a direct SAP write-back tool;
- a generic B2B SaaS application or chatbot.

These boundaries are important.

The opportunity is not to rebuild everything that happens outside MDG inside a new monolithic platform.

The opportunity is to make the external model knowledge:

- canonical;
- validated;
- traceable;
- reviewable;
- portable.

## What management should ask

1. Which programme activities are truly performed inside SAP MDG?
2. Which critical decisions are currently outside the platform?
3. Where is the approved independent model?
4. How are source fields connected to target attributes?
5. Which datasets prove that mappings are feasible?
6. How are global and local variations controlled?
7. Which interfaces depend on critical values?
8. Can tests be traced to the model version they prove?
9. Can configuration differences be compared with the approved model?
10. Which temporary deviations remain active?
11. Can AMS explain why a rule exists?
12. Which knowledge still depends on one architect or consultant?
13. Are AI-generated suggestions separated from approved model truth?
14. Is the external work controlled, or merely distributed across tools?

These questions reveal more about programme readiness than the count of completed MDG configuration objects.

## Common mistakes

### Treating the platform implementation as the entire programme

This underestimates data, migration, integration and organisational work.

### Treating external work as secondary administration

Mappings, decisions and dataset evidence often determine whether the operational model can work.

### Moving every artefact into MDG

This risks over-customisation and confused authority.

### Leaving external artefacts disconnected

Separate tools become separate versions of model truth.

### Measuring progress only through configuration completion

A configured rule may have no source-data support or business approval.

### Treating migration as a one-time technical activity

Migration decisions often continue affecting support and later waves.

### Treating handover as document delivery

Operational understanding requires relationships and decision context.

### Assuming AI can reconstruct the missing model safely

AI can propose connections. It cannot determine approval and authority on its own.

## How much is outside, then?

The honest answer is:

> Enough that it should be designed and governed as a first-class part of the programme.

For a small implementation with:

- one domain;
- one source;
- one country;
- limited integration;
- mature governance,

the external layer may remain manageable through disciplined documents and workbooks.

For a large programme with:

- multiple countries;
- multiple sources;
- repeated migration waves;
- complex integration;
- several partners;
- substantial local variation,

the external layer may become the dominant source of delivery effort and risk.

Trying to assign one industry-wide percentage would create false precision.

The programme should measure its own work.

## Our conclusion

SAP MDG is the operational centre of an MDG programme.

It is not the programme’s complete knowledge system.

Inside the platform, organisations govern:

- master records;
- workflow;
- validation;
- stewardship;
- quality;
- operational changes.

Outside the platform, they decide and prove:

- what the model means;
- where values come from;
- how legacy data maps;
- which local differences apply;
- which integrations are affected;
- whether datasets are ready;
- why the current design was selected;
- how the solution can be changed and supported.

The practical test is:

> Can the programme take one critical attribute and trace its definition, source, mapping, target implementation, rule, decision, dataset evidence, tests and consumers?

When the answer is yes, the work inside and outside MDG forms one controlled system.

When the answer requires several meetings and the memory of the original architect, the programme may have implemented the platform without governing the knowledge around it.

The purpose of Martenweave is not to move every external activity into another application.

It is to make the model truth connecting those activities explicit.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We build practical model-governance infrastructure for SAP migration, MDG, MDM and AMS teams. Martenweave is designed for the large body of model knowledge that exists around operational platforms: mappings, datasets, decisions, rules, evidence, gaps and change impact.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as the governance layer of a business data fabric, with capabilities including governed models, golden records, matching and consolidation, steward workflows, validated values, business-rule monitoring, mass changes and auditable master-data processes.

SAP distinguishes master-data management from master-data integration and recommends curating clean and correct master data early, before an SAP S/4HANA implementation.

The current Martenweave Core README describes Martenweave as an open-source, backend-first model governance and evidence layer for SAP migration, MDM, data governance and AMS. The current source version is listed as 0.5.0.

The core uses canonical model files, deterministic validation, disposable generated indexes, dataset-gap reports, trace and impact analysis, and human-reviewed PatchProposal and ChangeRequest workflows.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
