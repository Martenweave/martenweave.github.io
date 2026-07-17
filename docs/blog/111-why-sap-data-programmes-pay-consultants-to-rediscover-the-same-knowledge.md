# Why SAP Data Programmes Pay Consultants to Rediscover the Same Knowledge

**Reviewed: 15 July 2026**

Why are we paying senior consultants to answer the same question for the fourth time?

During design, the programme asks:

> Which source owns the Supplier payment terms?

Before the first mock load, another consultant investigates the same question.

During interface testing, the integration team asks again because two systems send different values.

Before cutover, the readiness team recreates the answer in a new workbook.

After go-live, AMS receives an incident and starts the investigation from the beginning.

The organisation has paid for several analyses.

It still does not own the answer.

The answer may exist somewhere:

- in a mapping workbook;
- in a Jira ticket;
- in a design document;
- in an email;
- in an MDG change request;
- in a validation report;
- in the memory of a consultant who is leaving the project.

This is one of the most expensive patterns in SAP migration, MDM, integration and data-governance programmes.

The cost is rarely visible as one budget line.

It appears as thousands of small consulting activities:

- searching for definitions;
- reconciling conflicting documents;
- tracing interfaces;
- rebuilding field lineage;
- asking domain experts for context;
- preparing impact assessments;
- explaining old Decisions;
- reviewing the same mapping again;
- recreating cutover evidence;
- onboarding replacement consultants;
- investigating incidents without project history.

> The programme is not paying only for expert decisions. It is repeatedly paying to reconstruct the context required to make those decisions.

Martenweave does not remove the need for consultants.

It changes what consultants spend time doing.

Instead of paying specialists to rediscover:

- what an Attribute means;
- where it comes from;
- which interface uses it;
- which Rule validates it;
- why an Exception exists;
- which downstream objects are affected;

the programme maintains that knowledge in a controlled model registry.

Consultants can then focus on work that actually requires judgement:

- resolving business ambiguity;
- designing the target model;
- assessing risk;
- approving exceptions;
- improving processes;
- handling genuinely new problems.

This is the economic case for Martenweave.

It is not based on replacing an entire consulting team with AI.

It is based on reducing avoidable reconstruction, reconciliation and coordination work.

# Where consulting cost accumulates

SAP data programmes need specialist expertise.

The expensive part is not simply the daily rate.

The expensive part is using that expertise for low-leverage work.

A senior data architect may spend several days answering:

> If we change this Supplier field, what else breaks?

The investigation can require:

- finding the current mapping;
- checking which version is approved;
- locating related validation Rules;
- asking the integration team which messages carry the field;
- checking whether MDG, migration and operational interfaces use the same logic;
- identifying affected datasets;
- reading old Decisions;
- finding the owner;
- preparing a slide or spreadsheet.

The final answer may take ten minutes to explain.

Producing a defensible answer can take days because the knowledge is scattered.

The same pattern appears across the programme.

## Data migration

Consultants repeatedly compare:

- source extracts;
- mapping workbooks;
- transformation logic;
- load files;
- reconciliation reports;
- target results.

## MDM and MDG

Consultants repeatedly reconstruct:

- data ownership;
- source authority;
- duplicate Decisions;
- validation Rules;
- workflow responsibilities;
- exception history.

SAP positions Master Data Governance as a central governance layer that preserves semantics and relationships, supports golden records, allows teams to own specific Attributes, enforces business Rules and maintains an audit trail. Those controls are valuable, but migration and transformation programmes still need to connect governed data to external datasets, interfaces, mapping logic, project Decisions and temporary evidence.

## Interfaces

Integration specialists repeatedly investigate:

- which system publishes a value;
- which messages carry it;
- where transformations occur;
- whether consumer systems use the same meaning;
- which interfaces must change when the model changes.

## Cutover

Teams manually assemble:

- scope reconciliation;
- readiness reports;
- open Findings;
- Exceptions;
- evidence freshness;
- owner approvals;
- target-state confirmation.

## AMS

Support consultants investigate incidents with limited access to:

- migration history;
- original model Decisions;
- temporary workarounds;
- retired mappings;
- known lineage;
- previous Findings.

The work is legitimate.

The repetition is not.

# The real problem is knowledge ownership

Traditional project deliverables are designed primarily for human review.

They are often weak as an operational knowledge system.

A mapping workbook may contain the answer today.

Six months later:

- several copies exist;
- comments contain important context;
- the approved version is unclear;
- interface changes are not reflected;
- Decisions have moved into tickets;
- validation reports use different field names;
- nobody knows which parts remain current.

The programme owns documents.

It does not necessarily own a coherent model.

A coherent model requires stable objects and relationships.

For example:

```text
Attribute:
Supplier Payment Terms

Source authority:
Finance master source

Migration mapping:
LEGACY_VENDOR.ZTERM
→ SUPPLIER_COMPANY.PAYMENT_TERMS

Used by:
Supplier migration
MDG governance
Purchase-to-pay interface
Invoice processing

Validated by:
RULE-SUPPLIER-PAYMENT-TERMS

Decision:
DEC-PAYMENT-TERMS-AUTHORITY

Evidence:
RC5 validation
Cutover reconciliation
```

This structure can be searched, validated and reused.

A workbook cell cannot reliably provide the same operational control.

# What Martenweave changes

Martenweave creates a canonical layer for model knowledge.

Its current core turns spreadsheets, datasets, tickets, validation reports, Decisions and SAP context into canonical files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-reviewed AI patch proposals. It is designed to own the model layer while remaining embeddable in command-line pipelines, local APIs, MCP servers and agent workflows.

The economic value comes from six capabilities.

## 1. One canonical registry

The model stores:

- domains;
- entities;
- Attributes;
- relationships;
- mappings;
- Rules;
- datasets;
- interfaces;
- Evidence;
- Decisions;
- Exceptions;
- Findings;
- proposed changes.

The programme no longer needs to locate the same fact in five deliverables before every Decision.

## 2. Deterministic validation

Martenweave validates:

- IDs;
- references;
- object types;
- domain context;
- missing relationships;
- inconsistent mappings;
- unsupported changes.

The current architecture explicitly puts deterministic validation before indexing or AI-assisted changes.

This reduces manual review of structural problems that software can identify consistently.

## 3. Lineage and impact analysis

A field change can show:

- source fields;
- mappings;
- target Attributes;
- Rules;
- datasets;
- interfaces;
- dependent objects;
- existing Evidence.

Consultants still assess the business consequence.

They do not need to reconstruct the dependency graph manually every time.

## 4. Evidence and provenance

Martenweave can preserve which:

- dataset;
- execution;
- model version;
- validator;
- report;
- owner;

produced a result.

W3C PROV provides a general model for representing provenance across different systems and contexts through entities, activities and agents. Martenweave does not need to implement the full ontology to use the same discipline: every important result should remain traceable to what produced it and who was responsible.

## 5. AI-assisted proposals

AI can:

- extract candidate mappings;
- summarise Evidence;
- propose missing relationships;
- draft Findings;
- suggest impact;
- prepare PatchProposals;
- generate issue descriptions;
- identify likely contradictions.

AI does not silently update canonical truth.

The current Martenweave principle is explicit:

```text
Agents propose.
Validators verify.
Humans approve.
Git records.
```



## 6. Reusable project memory

The registry remains useful after the migration.

It supports:

- later waves;
- rollouts;
- MDG enhancements;
- interface changes;
- audits;
- hypercare;
- AMS;
- onboarding.

This is where the three-year value becomes substantially larger than the first-project saving.

# The consulting work Martenweave should reduce

We should be precise.

Martenweave does not reduce all consulting activity.

It should reduce particular forms of effort.

## Repeated discovery

Baseline question:

> Where is the latest definition of this field?

With Martenweave:

- canonical Attribute is searchable;
- current Mapping is linked;
- owner and Decision are visible;
- superseded objects remain traceable.

## Manual mapping reconciliation

Baseline task:

- compare workbook versions;
- compare source and target;
- compare transformation code;
- identify undocumented differences.

With Martenweave:

- mappings are canonical objects;
- missing references fail validation;
- proposed changes produce an explicit diff;
- implementation can be compared to the approved model.

## Manual impact assessment

Baseline task:

- call several teams;
- inspect interface documents;
- search tickets;
- create a dependency spreadsheet.

With Martenweave:

- known lineage is generated;
- affected objects are listed;
- stale Evidence can be identified;
- consultants analyse the consequence rather than discover every dependency manually.

## Readiness-pack preparation

Baseline task:

- combine reports;
- copy counts into slides;
- reconcile scope;
- identify Exceptions;
- chase owners;
- explain why reports disagree.

With Martenweave:

- readiness is generated from the current model and Evidence;
- exceptions remain visible;
- denominators are traceable;
- stale Evidence is flagged.

## Incident investigation

Baseline task:

- reproduce project history;
- ask who designed the Mapping;
- compare production values with old spreadsheets;
- determine whether the issue is data, Mapping, model or interface.

With Martenweave:

- the incident can start from known lineage and Decisions;
- previous Findings are visible;
- temporary Exceptions are not lost;
- likely affected model objects are identifiable.

## Consultant onboarding

Baseline task:

- read dozens of documents;
- schedule knowledge-transfer sessions;
- ask the same experts for context;
- build a personal understanding of the model.

With Martenweave:

- the consultant explores the current canonical model;
- definitions and relationships are searchable;
- Decisions and Evidence remain attached;
- project language becomes more consistent.

# The consulting work Martenweave should not reduce

A credible ROI case must protect the work that still needs experts.

Martenweave should not remove:

- business ownership;
- architecture Decisions;
- process design;
- SAP configuration expertise;
- data-policy approval;
- cutover risk acceptance;
- complex root-cause analysis;
- stakeholder negotiation;
- legal or regulatory judgement.

It should also not create the illusion that AI understands the enterprise automatically.

AI can misread:

- local abbreviations;
- overloaded field names;
- outdated documents;
- temporary exceptions;
- contradictory sources.

The validator can prove structural consistency.

It cannot decide that a business rule is sensible.

The economic goal is not:

> Use fewer qualified people regardless of risk.

The goal is:

> Use qualified people for decisions and new problems, not repeated document archaeology.

# An illustrative ROI model

The following model is not a market benchmark or a guaranteed result.

It is an example showing how a programme can calculate its own business case.

Assume a 12-month SAP data programme covering:

- Business Partner and Supplier;
- Material and logistics data;
- MDG;
- migration;
- major interfaces;
- cutover readiness;
- early AMS transition.

Assume a blended external consulting rate of:

```text
€1,200 per consultant-day
```

This is an explicit modelling assumption. Each organisation should replace it with its own commercial rates.

## Baseline annual effort

The programme estimates the following effort spent on knowledge reconstruction and manual coordination:

| Cost area | Consultant-days |
|---|---:|
| Repeated discovery and model reconstruction | 420 |
| Mapping reconciliation | 280 |
| Change and impact assessments | 240 |
| Interface and incident investigation | 300 |
| Readiness and Evidence preparation | 220 |
| Onboarding and handover | 160 |
| **Total** | **1,620** |

Baseline cost:

```text
1,620 days × €1,200
= €1,944,000
```

This is not the whole consulting budget.

It is the part targeted by the Martenweave operating model.

# Estimated future-state effort

We then make conservative-to-moderate assumptions about avoidable effort.

## Repeated discovery

Reduction:

```text
45%
```

The work falls from 420 to 231 days.

## Mapping reconciliation

Reduction:

```text
40%
```

The work falls from 280 to 168 days.

## Impact assessment

Reduction:

```text
60%
```

The work falls from 240 to 96 days.

This is one of the strongest opportunities because lineage and relationships can remove much of the initial dependency search.

## Interface and incident investigation

Reduction:

```text
35%
```

The work falls from 300 to 195 days.

Martenweave accelerates investigation, but difficult incidents still require expertise.

## Readiness and Evidence preparation

Reduction:

```text
50%
```

The work falls from 220 to 110 days.

## Onboarding and handover

Reduction:

```text
40%
```

The work falls from 160 to 96 days.

The resulting recurring effort is:

```text
896 consultant-days
```

Recurring consulting cost:

```text
896 × €1,200
= €1,075,200
```

Gross recurring effort avoided:

```text
724 consultant-days
```

Gross annual consulting-cost avoidance:

```text
724 × €1,200
= €868,800
```

# First-year Martenweave TCO

The savings are not free.

The first year must include implementation and operating costs.

Assume:

## Model onboarding and implementation

```text
260 consultant-days × €1,200
= €312,000
```

This includes:

- repository setup;
- canonical model design;
- importing priority mappings;
- defining object types;
- creating validators;
- connecting key Evidence;
- configuring CI and review;
- training the core team.

## Tooling, infrastructure and support

Illustrative annual cost:

```text
€90,000
```

This can include:

- commercial support;
- implementation assistance;
- hosting or local infrastructure;
- maintenance;
- security review;
- integration work.

## Internal governance capacity

Illustrative annual cost:

```text
€60,000
```

This represents dedicated internal ownership rather than assuming the registry will govern itself.

## First-year total

```text
Recurring consulting:
€1,075,200

Implementation:
€312,000

Tooling and support:
€90,000

Internal governance:
€60,000

First-year TCO:
€1,537,200
```

Compared with the baseline:

```text
Baseline:
€1,944,000

Martenweave first-year TCO:
€1,537,200

First-year net saving:
€406,800
```

# First-year ROI

For ROI, we separate:

## Incremental investment

```text
Implementation:
€312,000

Tooling and support:
€90,000

Internal governance:
€60,000

Total investment:
€462,000
```

## Gross consulting effort avoided

```text
€868,800
```

ROI formula:

```text
ROI
=
(Gross benefit − investment)
÷ investment
```

Result:

```text
(€868,800 − €462,000)
÷ €462,000
=
88%
```

Illustrative first-year ROI:

```text
88%
```

Estimated payback period:

```text
approximately 6.4 months
```

# The break-even question

Managers should not begin by asking:

> Is an 88 percent ROI realistic?

They should ask:

> How many consultant-days must we avoid to break even?

In this model:

```text
€462,000 investment
÷ €1,200 per day
=
385 consultant-days
```

The programme breaks even when Martenweave avoids approximately:

```text
385 consultant-days
```

That is roughly:

- 32 days per month;
- 1.5 full-time consultant equivalents across a year;
- or a small reduction spread across migration, MDM, interfaces, testing, cutover and AMS.

This is a more useful decision threshold.

The programme can measure whether it is actually achieving it.

# Three-year TCO

The first year carries the model-onboarding cost.

Later years reuse the canonical model for:

- additional waves;
- country rollouts;
- interface changes;
- data-governance improvements;
- AMS;
- audits;
- future transformations.

Assume the recurring consulting effort and annual operating costs remain unchanged.

## Baseline three-year cost

```text
€1,944,000 × 3
=
€5,832,000
```

## Martenweave three-year cost

Year 1:

```text
€1,537,200
```

Year 2:

```text
Recurring consulting:
€1,075,200

Tooling and support:
€90,000

Internal governance:
€60,000

Total:
€1,225,200
```

Year 3:

```text
€1,225,200
```

Three-year TCO:

```text
€3,987,600
```

Three-year cost reduction:

```text
€5,832,000 − €3,987,600
=
€1,844,400
```

TCO reduction:

```text
31.6%
```

Using the same investment-versus-avoided-effort method, the illustrative three-year ROI is approximately:

```text
242%
```

The result improves over time because the programme reuses the model instead of rebuilding it for every wave and operational change.

# A conservative scenario

The base model assumes 724 consultant-days avoided annually.

Suppose the programme achieves only:

```text
450 consultant-days
```

Gross benefit:

```text
450 × €1,200
=
€540,000
```

Net first-year benefit:

```text
€540,000 − €462,000
=
€78,000
```

ROI:

```text
16.9%
```

Payback:

```text
approximately 10.3 months
```

The conservative scenario still remains positive.

This is important because data-governance initiatives often fail by presenting only an optimistic scenario.

# What should be included in TCO

A serious TCO model must include more than licence or hosting cost.

## Initial costs

- canonical model design;
- data and document import;
- validator development;
- integration setup;
- security and architecture review;
- training;
- initial cleanup.

## Recurring costs

- model stewardship;
- validator maintenance;
- Evidence import;
- support;
- infrastructure;
- upgrades;
- change review.

## Transition costs

- parallel operation with existing workbooks;
- consultant adaptation;
- process redesign;
- data-owner participation.

## Residual costs

- expert Decision-making;
- difficult analysis;
- manual review of ambiguous AI proposals;
- ongoing SAP and interface expertise.

A business case that excludes these costs is not credible.

# What should be counted as benefit

The safest benefit categories are measurable effort reductions.

## Avoided rediscovery time

Track time spent finding definitions, mappings, owners and Decisions.

## Faster impact assessments

Measure elapsed time and consultant effort before and after canonical lineage.

## Faster readiness preparation

Measure manual effort required to prepare a current readiness package.

## Reduced onboarding time

Measure time required for a new consultant to become productive.

## Reduced incident investigation

Measure mean effort to identify the responsible data, Mapping, model or interface layer.

## Reduced duplicate deliverables

Count workbooks, mappings and reports retired or generated from the canonical model.

## Reduced external dependence

Measure which recurring activities can be handled by internal data owners with deterministic support.

Benefits such as fewer production incidents can be substantial.

They should be treated carefully unless the programme has reliable baseline data.

# How we measure whether the ROI is real

Martenweave should produce its own value Evidence.

The programme can track:

```text
Time to answer a lineage question

Time to prepare an impact assessment

Time to identify the current Mapping

Time to reconcile a dataset

Time to prepare readiness Evidence

Time to onboard a consultant

Time to investigate a data-related incident

Number of repeated Findings

Number of model changes proposed automatically

Number of proposals rejected by validators

Number of external consultant-days used by activity
```

The ROI dashboard should not claim that every saved hour came from Martenweave.

It should compare stable process measures.

For example:

```text
Average impact assessment before:
3.5 consultant-days

Average impact assessment after:
1.2 consultant-days

Assessments per quarter:
40

Quarterly effort avoided:
92 consultant-days
```

This is more defensible than an abstract productivity percentage.

# Where AI creates economic value

AI creates value when it reduces preparation effort.

Useful examples include:

- extracting candidate mappings from workbooks;
- classifying Evidence;
- summarising change history;
- proposing lineage links;
- drafting impact explanations;
- identifying inconsistent definitions;
- preparing GitHub issues;
- generating PatchProposals;
- suggesting likely owners;
- comparing datasets with the canonical model.

The AI result remains a proposal.

Deterministic validation checks its structure.

A human approves its meaning.

This boundary is essential.

Without it, AI can lower drafting cost while increasing review, correction and operational risk.

The Martenweave model is:

```text
AI prepares.

Validators verify.

Experts decide.

Git records.
```

# Where interfaces fit into the savings model

Interface knowledge is one of the most expensive forms of project knowledge to reconstruct.

A single Attribute may travel through:

- source system;
- extraction;
- transformation;
- migration load;
- MDG;
- replication;
- middleware;
- target application;
- reporting.

When the Attribute changes, consultants must determine:

- which interfaces carry it;
- whether names differ;
- whether values are transformed;
- whether consumers rely on the old semantics;
- which tests must be repeated.

Martenweave should not replace interface monitoring.

It should maintain the model relationship:

```text
Canonical Attribute
→ source field
→ mapping
→ interface message
→ target field
→ business process
```

Then an impact assessment begins with known dependencies.

The consultant validates and extends them rather than rebuilding them from documents.

# Where the biggest savings will appear

The first-year savings will not be distributed evenly.

The strongest early use cases are likely to be:

## Repeated impact analysis

Because relationships and lineage can be reused directly.

## Mapping and model reconciliation

Because canonical objects reduce workbook-version disputes.

## Readiness and Evidence assembly

Because current scope, Findings, Exceptions and Evidence can be generated together.

## Consultant onboarding

Because definitions and Decisions no longer depend entirely on personal knowledge transfer.

## AMS handover

Because incidents begin with project context rather than an empty ticket.

The weaker early use cases will be highly ambiguous business Decisions.

These still require workshops and domain expertise.

# What Martenweave must not become

Cost reduction can push the product in the wrong direction.

Martenweave should not become:

- a generic workflow platform;
- a replacement for SAP MDG;
- an interface runtime;
- a ticketing system;
- an autonomous change engine;
- a direct SAP write-back tool;
- a large consulting methodology encoded in software.

The current core deliberately keeps canonical files as the source of truth, generated indexes disposable and changes proposal-first. It also excludes generic workflow, hosted MDM and direct SAP mutation from its boundary.

The product should remain narrow:

> Store model truth, validate consistency, connect Evidence, explain impact and prepare controlled changes.

# The first commercial pilot

The right pilot is not:

> Model the entire enterprise.

The pilot should target one expensive recurring activity.

A strong scope would be:

```text
Domain:
Supplier and Business Partner

Processes:
Migration, MDG and three critical interfaces

Population:
One migration wave

Duration:
Eight to twelve weeks
```

The pilot should ingest:

- current mapping workbooks;
- key data definitions;
- validation Rules;
- interface field mappings;
- major Decisions;
- current Findings;
- readiness Evidence.

It should measure:

1. time to answer ten lineage questions;
2. time to prepare five impact assessments;
3. time to reconcile the current mapping baseline;
4. time to prepare one readiness package;
5. time to onboard one new consultant;
6. number of contradictions detected automatically.

The commercial result should be stated as:

```text
Consultant-days avoided

Decision time reduced

Findings detected earlier

Reusable model objects created

Future waves covered
```

Not:

```text
AI transformed the programme
```

# The management questions

Before approving the investment, leaders should ask:

1. How many consultant-days are currently spent finding information rather than making Decisions?
2. Which analyses are repeated across design, migration, interfaces, cutover and AMS?
3. How often are mapping and model baselines reconciled manually?
4. How long does an impact assessment take?
5. How much onboarding is required when consultants rotate?
6. Which project knowledge will disappear after go-live?
7. Which deliverables can become generated views of one canonical model?
8. Which activities can be validated deterministically?
9. Which activities still require expert judgement?
10. How many consultant-days must be avoided for break-even?
11. Who will own the registry internally?
12. How will savings be measured rather than assumed?

A programme that cannot answer these questions should not claim ROI yet.

It should first establish the baseline.

# Final perspective

The strongest cost-saving argument for Martenweave is not that consultants are expensive.

Good consultants are often worth their cost.

The problem is paying good consultants to repeatedly reconstruct information that the organisation should already own.

The practical test is:

> After a consultant answers an important model question, does the organisation retain the answer in a validated, traceable and reusable form?

When the answer is yes, each consulting day creates a durable asset.

When the answer is no, the next consultant is paid to start again.

Martenweave is maintained by Dzmitryi Kharlanau.

We are building Martenweave to turn consulting output into reusable model infrastructure:

```text
Consultants provide expertise.

Canonical files preserve the result.

Validators protect consistency.

Lineage makes impact reusable.

Evidence preserves trust.

AI reduces preparation work.

Humans retain approval and accountability.

Git preserves the history.
```

The economic value is not fewer decisions.

It is fewer repeated investigations before every decision.

## Sources and notes

This article was reviewed on 15 July 2026.

The ROI and TCO calculations are illustrative. They are based on explicit assumptions stated in the article: 1,620 baseline consultant-days, a blended rate of €1,200 per day, 724 recurring days avoided, 260 implementation days, €90,000 annual tooling and support, and €60,000 annual internal governance capacity. These figures are not market benchmarks, vendor guarantees or financial advice.

Martenweave Core currently describes a backend-first model-governance and Evidence pipeline that turns datasets, validation reports, Decisions and SAP context into canonical files, deterministic validation, dataset gaps, lineage, impact analysis and human-approved proposals.

Its current principles keep canonical files authoritative, generated indexes disposable, validation deterministic and AI-generated changes proposal-first.

Its documented workflow moves from Evidence through validation, gaps and impact analysis to human review and GitHub delivery.

SAP describes SAP Master Data Governance as a central governance layer that preserves semantics and relationships, supports golden records, lets teams own specific master-data Attributes, enforces business Rules and maintains an audit trail. SAP also recommends curating master data before an S/4HANA transformation because automated business processes rely heavily on clean and correct master data.

W3C PROV-O provides a model for representing and exchanging provenance generated in different systems and contexts. Its concepts of entities, activities and agents support the evidence discipline described in this article, although Martenweave does not need to implement the complete ontology.

The consulting-effort categories, ROI model, commercial pilot and value metrics are recommended operating models. They should not be interpreted as guarantees of the exact current Martenweave schema, Workbench functionality, commercial packaging or achieved savings.
