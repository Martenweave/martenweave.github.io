# Why Consultant Turnover Makes SAP Programmes Pay Twice for the Same Knowledge

**Reviewed: 15 July 2026**

What exactly leaves the programme when an experienced consultant leaves?

The person leaves.

So does part of the practical model of the programme:

- which mapping is actually authoritative;
- why a field was excluded;
- which interface applies an undocumented transformation;
- which data-quality Rule has a known limitation;
- which Exception was intended to be temporary;
- which report can be trusted;
- which business owner approved a controversial Decision;
- which apparent defect is actually accepted design;
- which system is authoritative despite what the architecture diagram says.

Some of that knowledge exists in documents.

Some exists in tickets.

Some exists in code.

Some exists only in the consultant’s memory.

A replacement consultant joins.

The organisation pays for onboarding, workshops and knowledge transfer.

Then it pays again while the replacement verifies whether the transferred information is still correct.

> Consultant turnover becomes expensive when project knowledge is transferred as explanation rather than retained as validated model truth.

This is not an argument against external consultants.

SAP programmes need specialists.

The problem is using specialists as the primary storage mechanism for project knowledge.

When a consultant becomes the only reliable connection between:

- business definitions;
- data mappings;
- validation Rules;
- interface behaviour;
- implementation history;
- migration Evidence;
- operational Exceptions;

the programme has created a dependency that is expensive to maintain.

Martenweave reduces that dependency by turning the output of consulting work into a reusable model layer.

The goal is not to make consultants unnecessary.

The goal is to avoid paying every new consultant to reconstruct the same landscape.

# The hidden turnover tax

Consultant turnover creates several forms of cost.

The visible costs include:

- recruitment;
- contractual onboarding;
- access provisioning;
- knowledge-transfer sessions;
- documentation review.

The larger costs are less visible:

- senior experts repeating previous explanations;
- meetings slowed down because the new consultant lacks context;
- old Decisions reopened unnecessarily;
- mappings revalidated because nobody trusts the documentation;
- incidents escalated to former team members;
- duplicate analysis performed “to be safe”;
- temporary workarounds becoming permanent because their history was lost.

This cost is distributed across the programme.

No single invoice says:

```text
Knowledge reconstruction caused by consultant turnover:
€450,000
```

Instead, the cost appears inside:

- architecture;
- migration;
- MDM;
- integration;
- testing;
- cutover;
- hypercare;
- AMS.

That makes it easy to underestimate.

# Our running case

Consider a global SAP S/4HANA programme.

The programme includes:

```text
External consultants:
36

Internal core-team members:
18

Migration domains:
5

Critical interfaces:
42

Countries:
12

Migration waves:
4
```

The Supplier domain has been under development for 18 months.

An experienced Supplier data consultant leaves.

This consultant understood:

- the legacy Supplier structures;
- SAP Business Partner relationships;
- company-code extensions;
- purchasing-organisation extensions;
- MDG validation Rules;
- source-authority Decisions;
- Supplier portal mappings;
- replication interfaces;
- migration defects;
- approved cutover defaults.

The formal handover includes:

- 14 design documents;
- 8 mapping workbooks;
- 327 Jira tickets;
- 22 validation reports;
- 3 recorded sessions;
- several folders of interface specifications.

The replacement consultant has access to a large amount of information.

Access is not the same as understanding.

The replacement still needs to determine:

- which documents remain current;
- which workbook is authoritative;
- which tickets changed the design;
- which Rules are implemented;
- which Exceptions remain active;
- whether test reports refer to the current model;
- where production behaviour differs from the specification.

This is where the programme pays twice.

The first consultant was paid to build the knowledge.

The second is paid to reconstruct it.

# Why documents do not solve the problem

The usual response to knowledge loss is:

> Improve the documentation.

Better documentation helps.

It does not solve the whole problem.

A document is usually written from one perspective.

A data design document may explain business meaning.

An interface specification may describe message fields.

A mapping workbook may define transformations.

A test report may show execution results.

A ticket may explain why something changed.

The replacement consultant needs the relationships among them.

For example:

```text
Canonical Attribute:
Supplier Payment Terms

Owned by:
Finance

Proposed through:
Supplier Portal

Approved through:
SAP MDG

Migrated from:
Legacy field VENDOR.ZTERM

Distributed through:
Supplier replication interface

Consumed by:
S/4HANA
Invoice Automation
Procurement Analytics

Validated by:
RULE-SUPPLIER-PAYMENT-TERMS

Modified by:
DEC-PAYMENT-TERMS-AUTHORITY

Current Evidence:
RC6 reconciliation
```

No single document may contain this complete chain.

The consultant reconstructs it by reading across several artefacts.

The knowledge problem is relational.

The solution must preserve relationships.

# What is actually lost during turnover

Not all lost knowledge is equal.

## Definitions

What does the field or object mean in this programme?

“Supplier status” may refer to:

- onboarding status;
- purchasing block;
- payment block;
- approval state;
- external-portal status.

A new consultant cannot safely assume equivalence from field labels.

## Authority

Which source is trusted?

The architecture diagram may show MDG as central.

The current migration may still use a legacy Finance source for one Attribute.

That Exception may exist only in a Decision ticket.

## Applicability

Where does a Rule apply?

A global mapping may exclude:

- one country;
- one company code;
- one Supplier category;
- one transition wave.

## Rationale

Why was a Decision made?

The selected model may look inefficient until the consultant learns that it avoids a legal, operational or cutover risk.

## Evidence

Which results prove the current state?

A validation report may be technically valid but refer to an older mapping baseline.

## Informal operating knowledge

Which team really owns the issue?

Which interface fails most often?

Which default is safe?

Which workaround has never been volume-tested?

This knowledge has high operational value and weak formal representation.

# The dependency on senior consultants

When knowledge is not retained structurally, the programme develops a small group of human routing nodes.

Every difficult question goes to the same people.

```text
Ask Anna about Supplier mapping.

Ask Michael about the EWM interface.

Ask Priya about the old data-quality rule.

Ask Thomas why the company-code exception exists.
```

These people become essential.

Their productivity falls because they support:

- current delivery;
- new consultants;
- incident investigations;
- steering questions;
- historical explanation.

The programme pays senior rates for repeated context transfer.

The senior consultants may then leave because they are overloaded.

The dependency becomes worse.

# Why knowledge-transfer sessions have limited value

A handover session is useful.

It is also lossy.

The outgoing consultant decides what to explain.

The incoming consultant does not yet know which questions matter.

The session may cover:

- general design;
- current tasks;
- key risks.

It rarely captures every dependency.

Six weeks later, the replacement encounters an issue involving:

- an old mapping;
- a local exception;
- an interface field;
- a closed defect.

The relevant context was not discussed because nobody anticipated the question.

A reusable registry supports a different handover model.

The outgoing consultant does not need to predict every future question.

The consultant ensures that important objects have:

- definitions;
- owners;
- relationships;
- Decisions;
- Evidence;
- known Findings.

The incoming consultant can navigate the model when the question arises.

# The project-to-AMS handover problem

The largest knowledge transfer often occurs at the end of implementation.

The programme transitions to AMS.

The implementation team knows:

- what was designed;
- what was changed;
- which compromises were accepted;
- which temporary controls exist;
- which areas were not fully tested.

AMS receives:

- support documentation;
- ticket queues;
- interface lists;
- operating procedures;
- open defects.

The information is useful.

The model context is often incomplete.

An AMS incident says:

> Supplier payment terms were overwritten after an MDG update.

The AMS consultant needs to understand:

- which system owns the value;
- which interface transported it;
- which Rule permitted the update;
- whether a local Exception exists;
- which recent change affected the mapping;
- what the expected target state should be.

Without a model registry, the consultant investigates from the transaction outward.

With Martenweave, the consultant begins from the canonical Attribute and its lineage.

This does not eliminate diagnosis.

It reduces the time spent reconstructing the programme.

# Where SAP Cloud ALM fits

SAP positions SAP Cloud ALM as a central entry point for managing SAP landscapes across implementation and operations. SAP highlights guided implementation, test orchestration, end-to-end traceability, business continuity, automated operations, transparent reporting and reduced resolution time.

Those capabilities address important application-lifecycle and operational concerns.

Martenweave serves a narrower layer.

It focuses on canonical model knowledge connecting:

- data definitions;
- mappings;
- datasets;
- validation Rules;
- interfaces;
- Decisions;
- Evidence;
- Findings;
- proposed changes.

The tools can be complementary.

```text
SAP Cloud ALM:
implementation and operational lifecycle context

Martenweave:
canonical data-model, mapping and evidence context
```

Martenweave should not become another general ALM platform.

Its value is preserving the model knowledge that general implementation and operations tools may reference but do not necessarily own as canonical data truth.

# What Martenweave changes

Martenweave Core currently turns spreadsheets, datasets, tickets, validation reports, Decisions and SAP context into canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-approved AI patch proposals.

Its generic model includes:

- domains;
- entities;
- Attributes;
- relationships;
- datasets;
- mappings;
- Rules;
- Evidence;
- Decisions;
- change proposals.

Canonical files remain the source of truth. Generated indexes are rebuildable. Validation occurs before indexing, and AI cannot silently mutate the model.

The workflow explicitly moves through Evidence, proposal, validation, gap and impact assessment, human review and Git history.

This architecture supports a different knowledge-retention model.

Consultants do not hand over only documents.

They contribute to a validated registry that survives them.

# What consultants should leave behind

A consultant’s durable output should include more than presentation slides.

## Canonical objects

Stable definitions of:

- domains;
- entities;
- Attributes;
- relationships;
- interfaces;
- datasets.

## Mappings

Approved transformations with:

- scope;
- applicability;
- owner;
- rationale;
- status.

## Rules

Deterministic controls that can be executed again.

## Decisions

Why a model or Exception was accepted.

## Evidence

Which dataset, model version and execution support a conclusion.

## Findings

Known contradictions, gaps and risks.

## Exceptions

Temporary deviations with:

- owner;
- expiry;
- closure condition;
- compensating control.

## Lineage

What depends on what.

This is the difference between delivering analysis and delivering reusable infrastructure.

# The onboarding experience with a canonical registry

A new Supplier consultant should be able to begin with:

```text
Domain:
Supplier

Canonical entities:
Business Partner
Supplier
Company Code Extension
Purchasing Organisation Extension

Critical Attributes:
Payment Terms
Reconciliation Account
Order Currency
Purchasing Block

Interfaces:
Supplier Portal to MDG
MDG to S/4HANA
S/4HANA to Procurement Analytics

Active Exceptions:
4

Critical Findings:
7

Current readiness:
Green with conditions
```

The consultant can then inspect an Attribute.

```text
Attribute:
Supplier Payment Terms

Definition:
Default company-code payment condition

Authority:
Finance through approved MDG process

Source during migration:
Legacy Finance Supplier master

Portal role:
Proposed value only

Downstream consumers:
Invoice Automation
Analytics

Latest Decision:
Finance authority confirmed

Current Evidence:
RC6 Supplier reconciliation
```

This does not make the consultant productive instantly.

It eliminates several days of unstructured search.

# How AI helps with onboarding

AI can use the registry to prepare role-specific onboarding.

For a new integration consultant, it can produce:

- relevant interfaces;
- canonical Attributes transported by each interface;
- unresolved mappings;
- recent contract changes;
- active Findings;
- owners;
- current Evidence.

For a new data consultant, it can produce:

- object definitions;
- source-authority Decisions;
- mapping gaps;
- validation Rules;
- dataset coverage;
- cutover Exceptions.

For an AMS consultant, it can produce:

- recent model changes;
- known incident patterns;
- unresolved Findings;
- temporary controls;
- interface lineage;
- responsible teams.

The output is grounded in the registry.

AI should not invent missing context.

A useful AI response must distinguish:

```text
Known and validated

Known but stale

Candidate inference

Missing knowledge
```

This is especially important during onboarding.

A fluent but unsupported explanation can accelerate misunderstanding.

# AI-assisted handover

Before a consultant leaves, AI can prepare a handover gap report.

It can ask:

- Which objects have no owner?
- Which mappings lack a Decision?
- Which Exceptions have no expiry?
- Which interfaces lack current Evidence?
- Which critical Findings depend on the departing consultant?
- Which recent changes are not reflected in documentation?
- Which domains have low model coverage?

The handover becomes targeted.

Instead of asking the departing consultant to “document everything,” the programme asks the consultant to resolve specific gaps.

```text
Eight mappings lack business rationale.

Three active Exceptions have no expiry.

Two interface fields have no canonical reference.

Five Findings list the departing consultant as sole owner.
```

This is a much stronger exit process.

# Deterministic handover checks

A consultant handover can have validation criteria.

## No critical object without an owner

Every important Attribute, Mapping, Rule and Interface requires accountable ownership.

## No approved mapping without rationale

The next team must know why the target meaning was chosen.

## No active Exception without expiry

Temporary design should not disappear into operations.

## No current readiness Claim supported by stale Evidence

The incoming team must know which results can be trusted.

## No critical Finding assigned only to a departing person

Ownership should transfer to a role or named successor.

## No production interface without canonical data references

AMS must be able to connect an incident to model meaning.

## No undocumented recent change

Approved changes should update the canonical model.

These checks do not prove that every piece of knowledge has been captured.

They make important gaps visible.

# The consultant-turnover cost model

The following financial model is illustrative.

It is not a market benchmark, a guarantee or financial advice.

Assume a large SAP programme has:

```text
Consultant arrivals or replacements per year:
12

Formal domain handover cycles:
4

One major transition to AMS:
1

Blended external consulting rate:
€1,200 per consultant-day
```

# Baseline annual effort

## New-consultant onboarding

Assume each consultant requires:

```text
20 consultant-days
```

This includes time spent by the incoming consultant on:

- documentation review;
- landscape reconstruction;
- meetings;
- access and orientation;
- validation of current state.

Annual effort:

```text
12 × 20
= 240 consultant-days
```

## Senior-expert knowledge-transfer support

Assume senior SMEs spend:

```text
8 days per new consultant
```

Annual effort:

```text
12 × 8
= 96 consultant-days
```

## Repeated model reconstruction

Assume each new consultant performs:

```text
10 days
```

of duplicate discovery and verification after formal onboarding.

Annual effort:

```text
12 × 10
= 120 consultant-days
```

## Domain handover preparation

Assume four handovers require:

```text
30 days each
```

across outgoing consultants, incoming teams and project management.

Annual effort:

```text
4 × 30
= 120 consultant-days
```

## Project-to-AMS transition

Assume the major transition consumes:

```text
120 consultant-days
```

across documentation, workshops, ticket review and post-handover clarification.

## Total baseline

```text
240
+ 96
+ 120
+ 120
+ 120
=
696 consultant-days
```

Annual baseline cost:

```text
696 × €1,200
=
€835,200
```

This does not include the cost of defects caused by knowledge loss.

It includes only the direct consulting effort used for onboarding, reconstruction and handover.

# Future-state effort with Martenweave

Assume the canonical registry is operating and maintained.

## New-consultant onboarding

The registry reduces onboarding from 20 to:

```text
10 days per consultant
```

Annual effort:

```text
12 × 10
=
120 days
```

## Senior-expert support

Senior SME support falls from 8 to:

```text
4 days per consultant
```

Annual effort:

```text
12 × 4
=
48 days
```

## Repeated reconstruction

Duplicate discovery falls from 10 to:

```text
4 days per consultant
```

Annual effort:

```text
12 × 4
=
48 days
```

## Domain handover preparation

Each handover falls from 30 to:

```text
12 days
```

Annual effort:

```text
4 × 12
=
48 days
```

## Project-to-AMS transition

The transition falls from 120 to:

```text
55 days
```

## Total future-state effort

```text
120
+ 48
+ 48
+ 48
+ 55
=
319 consultant-days
```

Annual recurring consulting cost:

```text
319 × €1,200
=
€382,800
```

Consultant-days avoided:

```text
696 − 319
=
377 days
```

Gross annual consulting-cost avoidance:

```text
377 × €1,200
=
€452,400
```

# First-year investment

The saving requires a functioning model, not an empty repository.

## Initial model and handover onboarding

Assume:

```text
140 consultant-days × €1,200
=
€168,000
```

This includes:

- importing priority mappings;
- connecting data and interface objects;
- modelling owners and Decisions;
- importing Evidence;
- establishing handover checks;
- configuring CI and review;
- training the core team.

## Tooling, integration and support

Illustrative annual cost:

```text
€60,000
```

## Internal stewardship

Illustrative annual cost:

```text
€45,000
```

## Total incremental first-year investment

```text
€168,000
+ €60,000
+ €45,000
=
€273,000
```

# First-year TCO

```text
Recurring onboarding and handover consulting:
€382,800

Initial implementation:
€168,000

Tooling and support:
€60,000

Internal stewardship:
€45,000

First-year TCO:
€655,800
```

Baseline:

```text
€835,200
```

First-year net saving:

```text
€835,200 − €655,800
=
€179,400
```

# First-year ROI

Gross benefit:

```text
€452,400
```

Incremental investment:

```text
€273,000
```

ROI:

```text
(€452,400 − €273,000)
÷ €273,000
=
approximately 66%
```

Illustrative first-year ROI:

```text
66%
```

Estimated payback:

```text
approximately 7.2 months
```

# Break-even threshold

At €1,200 per consultant-day:

```text
€273,000 ÷ €1,200
=
approximately 228 consultant-days
```

The programme must avoid approximately:

```text
228 consultant-days
```

The base model assumes 377 days avoided.

This gives the programme a measurable test.

If onboarding and handover effort does not fall by at least 228 days in the first year, this use case alone has not reached break-even.

# Three-year TCO

## Baseline

```text
€835,200 × 3
=
€2,505,600
```

## Martenweave year one

```text
€655,800
```

## Martenweave years two and three

Each later year includes:

```text
Recurring consulting:
€382,800

Tooling and support:
€60,000

Internal stewardship:
€45,000

Annual TCO:
€487,800
```

Three-year Martenweave TCO:

```text
€655,800
+ €487,800
+ €487,800
=
€1,631,400
```

Three-year cost reduction:

```text
€2,505,600 − €1,631,400
=
€874,200
```

TCO reduction:

```text
34.9%
```

Total three-year platform, support and stewardship investment:

```text
€168,000
+ 3 × €105,000
=
€483,000
```

Gross consulting effort avoided over three years:

```text
€452,400 × 3
=
€1,357,200
```

Illustrative three-year ROI:

```text
approximately 181%
```

The value grows because the same model supports successive consultants, waves and support teams.

# Conservative scenario

Assume:

```text
Consultant arrivals:
8 per year

Handover savings:
40% rather than the base model

AMS transition saving:
35 days

First-year investment:
€273,000
```

Suppose total effort avoided is:

```text
250 consultant-days
```

Gross benefit:

```text
250 × €1,200
=
€300,000
```

Net benefit:

```text
€300,000 − €273,000
=
€27,000
```

First-year ROI:

```text
approximately 10%
```

This remains positive but weak.

It shows that turnover reduction alone may not justify Martenweave for a stable, small team.

The business case becomes stronger when the same registry also reduces:

- mapping reconciliation;
- impact assessment;
- readiness preparation;
- interface investigation;
- AMS incident analysis.

Martenweave should be evaluated as a reusable model layer across these activities, not as a standalone onboarding tool.

# What should be measured

The programme should measure actual change.

## Time to first productive contribution

How many working days pass before a new consultant can complete a meaningful task independently?

## Senior SME support

How many days do senior experts spend supporting onboarding?

## Reopened Decisions

How many old design Decisions are revisited because context is unavailable?

## Time to locate authoritative mapping

Measure the time required to identify the current Mapping and its approval.

## Handover preparation effort

How many consultant-days are consumed by each domain transition?

## AMS investigation time

How long does it take support teams to connect an incident to:

- canonical Attribute;
- interface;
- mapping;
- recent change;
- owner?

## Knowledge coverage

What percentage of critical objects have:

- owner;
- definition;
- Decision;
- Evidence;
- current status?

## Sole-person dependencies

How many critical objects depend on one named individual rather than a durable role and model?

These metrics make the knowledge-retention business case auditable.

# The first product slice

A focused capability should be:

## Consultant Handover and AMS Context Pack

### Goal

Generate a validated, role-specific handover from the canonical model rather than assembling one manually from project documents.

### Initial outputs

- domain overview;
- canonical object inventory;
- critical mappings;
- interface lineage;
- active Decisions;
- unresolved Findings;
- active Exceptions;
- stale Evidence;
- ownership gaps;
- recent changes;
- onboarding reading path.

### Initial validations

- critical object without owner;
- mapping without rationale;
- active Exception without expiry;
- stale Evidence supporting current readiness;
- unresolved Finding assigned only to departing consultant;
- interface without canonical Attribute references;
- undocumented approved change;
- domain with incomplete handover coverage.

### AI support

AI can:

- prepare role-specific summaries;
- draft onboarding guides;
- identify missing context;
- compare handover coverage between domains;
- summarise recent model history;
- generate candidate questions for the outgoing consultant.

### Human controls

Experts must approve:

- business meaning;
- risk interpretation;
- ownership transfer;
- Exception validity;
- handover completeness.

# A conceptual handover object

```text
---
id: HANDOVER-SUPPLIER-AMS-2026
type: HandoverPackage

domain:
  supplier

from_team:
  S4_IMPLEMENTATION

to_team:
  AMS_SUPPLIER_SUPPORT

model_version:
  commit: 7fa21d

includes:
  mappings:
    - MAP-SUPPLIER-PAYMENT-TERMS
    - MAP-SUPPLIER-ACCOUNT-GROUP

  interfaces:
    - IF-SUPPLIER-PORTAL-TO-MDG
    - IF-MDG-TO-S4

  findings:
    - FIND-SUPPLIER-004
    - FIND-SUPPLIER-009

  exceptions:
    - EXC-SUPPLIER-PAYMENT-TERMS

validation:
  owner_coverage: pass
  evidence_freshness: partial
  exception_expiry: pass

status:
  ready_with_actions
---
```

This is a proposed product direction.

It is not a claim about the exact current Martenweave schema.

# Proposed commands

A future CLI might support:

```text
martenweave handover assess \
  --domain supplier \
  --repo ./model
```

```text
martenweave handover ownership-gaps \
  --departing-role supplier-data-lead \
  --repo ./model
```

```text
martenweave handover generate \
  --domain supplier \
  --target-team ams \
  --out ./reports/supplier-ams-handover \
  --repo ./model
```

```text
martenweave handover stale-evidence \
  --domain supplier \
  --repo ./model
```

```text
martenweave handover propose-fixes \
  HANDOVER-SUPPLIER-AMS-2026 \
  --dry-run \
  --repo ./model
```

These commands describe a recommended capability.

They are not part of the currently documented CLI.

# What managers should require

## Require durable output from consulting work

Important Decisions, mappings and Evidence should not remain only in documents or memory.

## Require role-based ownership

Critical knowledge should not depend on one named person.

## Require handover validation

Do not treat document delivery as proof of knowledge transfer.

## Require current Evidence

A handover package should identify what is current, stale and missing.

## Require Exception transparency

AMS must know which controls are temporary.

## Require interface lineage

Support teams need to connect incidents to model meaning.

## Require AI grounding

Generated summaries must cite canonical objects and expose uncertainty.

## Require measurable onboarding improvement

Track whether consultants become productive faster.

## Require expert judgement to remain

The registry supports experts.

It does not replace domain competence.

# The management questions

1. Which critical knowledge exists only in the memory of consultants?
2. Which domains depend on one or two key people?
3. How long does a new consultant take to become productive?
4. How much senior-consultant time is spent on onboarding?
5. Which mappings and Decisions are repeatedly revalidated after turnover?
6. Which Exceptions will AMS inherit?
7. Which Evidence proves the current production model?
8. Which interface dependencies are documented only in technical specifications?
9. Can the programme generate a current handover package from the model?
10. Which critical objects lack owners or rationale?
11. How many consultant-days are spent on each handover?
12. Does the organisation retain the output of consulting work after the consultant leaves?

A programme that cannot answer these questions has a people dependency disguised as documentation.

# Final perspective

Consultant turnover is unavoidable.

Paying twice for the same knowledge is not.

The practical test is:

> When an expert leaves, does the programme lose only capacity—or does it also lose its understanding of the model?

When the organisation retains:

- definitions;
- mappings;
- Decisions;
- Evidence;
- lineage;
- known risk;

the replacement consultant can continue the work.

When those relationships remain in personal memory, the programme must buy them again.

We are Metalhatscats, the team behind Martenweave.

We are building Martenweave so that consulting work becomes a durable organisational asset:

```text
Experts create knowledge.

Canonical files preserve it.

Relationships preserve context.

Validators expose gaps.

Evidence preserves trust.

AI prepares onboarding and handover.

New consultants verify and extend the model.

Humans retain authority.

Git preserves the history.
```

The objective is not to remove consultants.

It is to ensure that every consulting day leaves behind more than a meeting, a workbook or a presentation.

## Sources and notes

This article was reviewed on 15 July 2026.

The financial model is illustrative. It assumes 12 consultant arrivals or replacements per year, four formal domain handovers, one major AMS transition, 696 baseline consultant-days, 319 future-state days, a blended external rate of €1,200 per day, 140 implementation days, €60,000 annual tooling and support, and €45,000 annual internal stewardship. These are modelling assumptions, not market benchmarks, vendor guarantees or financial advice.

Martenweave Core currently describes a backend-first model-governance and Evidence layer for SAP migration, MDM, data governance and AMS. It turns spreadsheets, datasets, tickets, validation reports, Decisions and SAP context into canonical files, deterministic validation, dataset gaps, lineage, impact analysis and human-reviewed proposals.

Its generic model includes domains, entities, Attributes, relationships, datasets, mappings, Rules, Evidence, Decisions and change proposals.

Its current principles keep canonical files authoritative, generated indexes disposable, validation deterministic and AI-generated changes proposal-first.

Its documented workflow moves from Evidence through validation, gaps and impact analysis to human review and Git delivery.

SAP describes SAP Cloud ALM as a central entry point for managing SAP landscapes with guided implementation and highly automated operations. SAP lists end-to-end traceability, business continuity, reduced resolution time, transparent reporting, implementation support and operational performance among its core value areas.

The Consultant Handover and AMS Context Pack, proposed validation Rules, commands and financial outcomes are product and operating-model directions. They should not be interpreted as guarantees of the exact current Martenweave schema, Workbench functionality, commercial pricing or achieved savings.

Martenweave is independent and is not affiliated with or endorsed by SAP.
