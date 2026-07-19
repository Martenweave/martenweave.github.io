# How to Build a Model Risk Register for SAP Migration and MDG

**Reviewed: 14 July 2026**

The programme risk register looks healthy.

Most items are familiar:

- environments may be delivered late;
- business resources may not be available;
- integration testing may slip;
- data cleansing may require more effort;
- country decisions may take longer than planned.

Each risk has an owner, probability, impact and mitigation.

The status is discussed every week.

Elsewhere, the migration team has discovered that a mandatory SAP target attribute has no reliable source in two legacy systems.

A local workbook contains an unapproved default.

Several mappings point to an endpoint that the architecture team intends to retire.

A temporary value introduced for the first mock load is now used in operational test data.

A country-specific validation has been copied into the global design.

None of these appears in the programme risk register.

They exist as:

- mapping comments;
- Jira defects;
- data-quality findings;
- meeting actions;
- temporary decisions;
- knowledge held by individual consultants.

The programme can see general delivery risk.

It cannot see concentrated risk inside the model.

This is why an SAP migration or MDG programme may report a manageable overall risk position while carrying unresolved structural problems in the fields, mappings, rules and decisions that determine whether the solution will work.

> A model risk register connects risk to the exact model objects, populations, decisions and dependencies that create the exposure.

It does not replace the programme risk register.

It supplies the model-level evidence that broad programme risks often lack.

## Programme risks are usually too broad for model decisions

A programme register may contain an item such as:

> Data quality may delay migration.

This is directionally useful.

It does not tell the migration or governance teams:

- which attributes are affected;
- which source systems are responsible;
- how many records are exposed;
- whether mappings exist;
- which countries are involved;
- which target rules will fail;
- when the risk becomes critical;
- what decision is required.

The result is a risk that everyone recognises but nobody can act on precisely.

A model risk register translates the broad concern into operationally useful records.

For example:

```text id="model-risk-01"
Risk:
ERP_B cannot provide Supplier Classification for active suppliers.

Affected model objects:
ATTR-SUPPLIER-CLASSIFICATION
MAP-ERP-B-SUPPLIER-CLASSIFICATION
RULE-SUPPLIER-CLASSIFICATION-REQUIRED

Affected population:
18,420 active suppliers.

Programme consequence:
Mock Load 3 will reject records if the target validation becomes blocking.

Decision required:
Approve source remediation, controlled enrichment or contextual exception.
```

The programme risk remains:

> Data quality may delay migration.

The model risk explains where and why.

## A model risk register is not another defect backlog

Defects describe observed failures.

Risks describe uncertain or unresolved conditions that may cause future harm.

A defect might say:

> Mapping for Customer Group produced the wrong target value in Mock Load 2.

A related model risk might say:

> Customer Group is represented at different organisational levels in CRM_A and SAP. Correcting the current defect without resolving the semantic difference may produce further incorrect mappings in later waves.

The defect needs correction.

The risk needs a decision about the model.

Some risks are discovered through defects.

Others appear before anything has failed:

- a source field is scheduled for retirement;
- a mandatory target has weak source coverage;
- a value has no owner;
- local rules conflict with a global definition;
- a temporary exception has no expiry;
- a critical attribute has no current test evidence.

A model risk register should therefore include more than production and test failures.

## Why model risk matters in SAP MDG

SAP currently describes SAP Master Data Governance as a central governance layer that combines master data, policy and metadata. Its capabilities include governed models, preservation of semantics and relationships, collaborative workflows, validated values, monitored business rules, mass changes and auditable data changes.

These capabilities depend on decisions about:

- which model is governed;
- which values are valid;
- which rules apply;
- who owns attributes;
- how data is sourced and distributed.

An operational governance platform can enforce an approved rule.

It cannot determine that the rule is based on an incomplete source, an ambiguous definition or an expired migration exception unless the programme identifies and governs that risk.

SAP also recommends curating master data well before an SAP S/4HANA implementation because more automated processes depend heavily on clean and correct master data.

A model risk register helps turn this broad preparation principle into a controlled list of specific exposures.

## Risk assessment should support accountable action

NIST describes risk assessments as part of an overall risk-management process that provides leaders with information needed to choose appropriate courses of action.

Although NIST SP 800-30 addresses information-system risk rather than SAP model governance specifically, the general principle is useful:

> The purpose of risk information is to support decisions.

A model risk register should therefore not become a long list of concerns with red, amber and green labels.

Every material entry should help the organisation decide whether to:

- avoid the risk;
- reduce it;
- transfer responsibility;
- accept it temporarily;
- gather more evidence;
- change the model;
- change the implementation sequence;
- stop the affected work.

## Define what counts as model risk

Model risk is the possibility that an incorrect, incomplete, ambiguous, unsupported or uncontrolled model state causes business, migration, implementation or operational harm.

It can arise from:

- business meaning;
- data availability;
- mappings;
- rules;
- contexts;
- ownership;
- lifecycle;
- implementation alignment;
- change control.

A useful model risk is specific enough to connect to identifiable objects and evidence.

Weak risk statement:

> Supplier data may be poor.

Stronger risk statement:

> ERP_B has no reliable source for Supplier Risk Classification. If the global mandatory rule is implemented without an approved exception, 6,840 active suppliers will fail migration validation.

The second statement makes action possible.

## The main categories of model risk

A practical register should classify risks so teams can identify patterns.

## 1. Semantic risk

The business meaning is unclear, inconsistent or incorrectly represented.

Examples:

- two systems use “Customer Group” for different concepts;
- one value combines several meanings;
- a local definition conflicts with the global attribute;
- a target field is selected because its label resembles the source field.

Potential consequences:

- incorrect mapping;
- misleading reporting;
- invalid global standardisation;
- repeated local exceptions.

## 2. Source risk

The expected source is unavailable, incomplete, unreliable or at the wrong level.

Examples:

- mandatory attribute absent from one legacy system;
- source field is being retired;
- source is global while target is organisational;
- several systems claim authority.

Potential consequences:

- migration gaps;
- manual enrichment;
- uncontrolled defaults;
- operational maintenance burden.

## 3. Mapping risk

Source-to-target treatment is missing, inconsistent or unsupported.

Examples:

- active source values have no target mapping;
- different countries map the same source value differently without context;
- transformation logic exists only in code;
- mapping points to a retired target endpoint.

Potential consequences:

- load failures;
- incorrect conversions;
- duplicated remediation;
- hidden loss of business distinctions.

## 4. Rule risk

Validation, derivation or policy logic is incomplete or misapplied.

Examples:

- global rule ignores country differences;
- mandatory rule includes historical records unintentionally;
- warning should be an error—or the reverse;
- derivation creates values that look authoritative but are not.

Potential consequences:

- valid records blocked;
- invalid records activated;
- high incident volume;
- compliance exposure.

## 5. Value-list risk

Allowed values are incomplete, duplicated or semantically unstable.

Examples:

- source values have no approved target;
- temporary values remain active;
- local values are visible globally;
- two values overlap in meaning.

Potential consequences:

- inconsistent classification;
- downstream rejection;
- inaccurate analytics;
- unremediated temporary data.

## 6. Context risk

The model does not represent where a rule or attribute applies.

Examples:

- country exception stored only in a comment;
- company-code rule implemented globally;
- person and organisation requirements mixed;
- migration-only treatment used operationally.

Potential consequences:

- overvalidation;
- inconsistent country behaviour;
- duplicated local models;
- difficult testing.

## 7. Ownership risk

No role has clear authority or operational responsibility.

Examples:

- nobody owns a value list;
- global and local owners disagree;
- implementation partner acts as permanent decision owner;
- key attribute depends on one individual.

Potential consequences:

- delayed decisions;
- unmanaged exceptions;
- weak handover;
- repeated disputes.

## 8. Evidence risk

A model decision is based on old, incomplete or unverified evidence.

Examples:

- dataset profile is six months old;
- mapping was never tested against current values;
- legal interpretation is referenced but unavailable;
- configuration documentation does not match production.

Potential consequences:

- false readiness;
- weak approval;
- incorrect impact analysis;
- rework after new evidence appears.

## 9. Implementation-alignment risk

Approved model and implemented behaviour differ.

Examples:

- SAP validation uses broader context;
- interface omits approved field;
- migration code uses an old mapping;
- tests reflect a superseded baseline.

Potential consequences:

- production inconsistency;
- repeated defects;
- audit difficulty;
- misleading documentation.

## 10. Change-control risk

Model changes can enter without proper review.

Examples:

- direct spreadsheet overwrite;
- direct push to canonical branch;
- AI-generated patch applied automatically;
- emergency configuration change never reconciled.

Potential consequences:

- silent model drift;
- weak auditability;
- inconsistent artefacts;
- inability to reconstruct decisions.

## 11. Lifecycle risk

Temporary, deprecated or retired elements remain active incorrectly.

Examples:

- expired migration default;
- retired source endpoint still referenced;
- obsolete local override still enabled;
- old test evidence treated as current.

Potential consequences:

- hidden operational debt;
- future release failure;
- incorrect impact results;
- accumulating complexity.

## 12. Traceability risk

Critical relationships are missing or unreliable.

Examples:

- target field cannot be traced to source;
- rule has no linked decision;
- change has no affected tests;
- incident cannot be connected to the model object.

Potential consequences:

- repeated investigation;
- missed dependencies;
- weak handover;
- excessive regression testing.

## Model risk should attach to model objects

A model risk register becomes useful when each risk links to the exact objects involved.

For example:

```text id="model-risk-02"
Risk ID:
MRISK-0048

Title:
Unapproved default for Supplier Risk

Affected objects:
- ATTR-SUPPLIER-RISK
- MAP-ERP-B-SUPPLIER-RISK
- VLIST-SUPPLIER-RISK
- RULE-SUPPLIER-RISK-REQUIRED

Affected dataset:
DATASET-ERP-B-SUPPLIERS-WAVE-2

Related decision:
DEC-SUPPLIER-RISK-DEFAULT-01

Related issues:
MIG-1842
MDG-763
```

This allows the programme to answer:

- Which critical attributes carry the most risk?
- Which mappings have several unresolved risks?
- Which source systems generate repeated exposure?
- Which decisions are blocked by weak evidence?
- Which risks affect the same target release?

A generic risk register cannot provide this view unless it knows the model structure.

## Write risk statements using cause, event and consequence

A disciplined risk statement can follow:

```text id="model-risk-03"
Because [cause],
there is a risk that [event],
which may result in [consequence].
```

Example:

> Because ERP_B does not maintain Supplier Classification for all active suppliers, there is a risk that the global mandatory rule will reject a significant migration population, resulting in delayed loading, manual enrichment and cutover pressure.

Another:

> Because the temporary value `MIGRATION_REVIEW` remains available to operational users, there is a risk that unresolved records will be treated as valid classified suppliers, resulting in incorrect workflow and reporting.

This format separates the condition from the harm.

It also makes mitigation more precise.

## Describe the current exposure

Every risk should identify what is exposed now.

Useful fields include:

- affected domain;
- affected objects;
- applicable context;
- affected records;
- source systems;
- consuming systems;
- migration waves;
- target release;
- current controls.

For example:

```text id="model-risk-04"
Applicable context:
Portugal, supplier organisations, active records

Affected population:
3,620 records

Current control:
Manual review before activation

Control weakness:
Review is not represented in workflow and cannot be monitored reliably
```

This helps reviewers distinguish a theoretical concern from an active programme exposure.

## Separate inherent and residual risk

Inherent risk describes the exposure before considering controls.

Residual risk describes what remains after current controls.

Example:

```text id="model-risk-05"
Inherent risk:
High

Reason:
Missing supplier classifications can bypass compliance routing.

Current control:
Manual pre-load review of affected records.

Residual risk:
Medium

Control limitation:
Manual review covers migration only and does not prevent operational creation.
```

The distinction matters because a high inherent risk may be temporarily manageable through a strong control.

It also prevents a manual workaround from making the underlying structural issue disappear from the register.

## Record evidence, not only assessment

A risk rating should be grounded in evidence where possible.

Useful evidence includes:

- dataset profile;
- value frequency;
- mapping coverage;
- failed test;
- interface specification;
- configuration comparison;
- incident history;
- approved decision;
- expert review.

For example:

```text id="model-risk-06"
Evidence:
- 8,420 blank values in current active population
- 27 related incidents in previous quarter
- no approved source field in ERP_B
- target rule configured as blocking in test
```

Also record evidence confidence:

- confirmed;
- representative;
- expert judgement;
- assumption;
- unknown.

Low-confidence evidence may increase the need for investigation.

It should not be hidden behind a confident risk score.

## Assess likelihood carefully

Likelihood should refer to the risk event, not merely the presence of the cause.

For example:

Cause:

> Source completeness is 70%.

Risk event:

> Records fail the next migration load.

Likelihood depends on:

- whether the target rule will be active;
- whether the affected population is included;
- whether remediation occurs first;
- whether a controlled exception exists.

Avoid treating an existing gap as automatically equal to a future failure.

Document the conditions.

Example:

```text id="model-risk-07"
Likelihood:
High if blocking validation is activated before remediation.

Likelihood:
Low for Mock Load 2 because the rule remains a warning.
```

This improves sequencing decisions.

## Assess impact across several dimensions

Impact may include:

### Business impact

- blocked sales or procurement;
- incorrect compliance handling;
- reporting distortion;
- financial error.

### Migration impact

- rejected records;
- delayed wave;
- manual remediation;
- load reconciliation difficulty.

### Operational impact

- incident volume;
- manual stewardship;
- workflow disruption;
- poor user adoption.

### Architecture impact

- duplicated models;
- inconsistent semantics;
- increased integration complexity.

### Audit and control impact

- weak evidence;
- unclear authority;
- inability to explain decisions.

A single overall rating may still be used.

The dimensions explain why.

## Include detectability

Some model failures are visible immediately.

Others create plausible but incorrect data.

Example:

### Highly detectable

An invalid code causes an interface error.

### Poorly detectable

A default value is accepted and appears legitimate.

Poor detectability can make a risk more serious even when failure probability is moderate.

The register should ask:

- Would the error be rejected?
- Would reconciliation find it?
- Would users recognise it?
- Could it persist until reporting or audit?
- Can affected records be identified later?

## Include reversibility

The programme should know whether the consequence can be undone.

Low reversibility examples include:

- merging distinct source values;
- overwriting original identifiers;
- deleting historical relationships;
- distributing an incorrect classification to many systems;
- losing the ability to identify defaulted records.

If recovery requires manual reconstruction, the risk deserves stronger control.

## Include time exposure

A risk register must show when exposure changes.

Relevant dates include:

- source retirement;
- mock load;
- mapping freeze;
- UAT;
- legal effective date;
- cutover;
- remediation deadline;
- exception expiry.

Example:

```text id="model-risk-08"
Risk becomes critical:
15 September 2026

Reason:
Mock Load 3 activates blocking validation.

Latest safe decision date:
31 August 2026

Source remediation lead time:
Ten working days
```

This is more useful than marking the risk amber until it suddenly becomes red.

## Assign an accountable risk owner

The risk owner is the person or role accountable for ensuring the risk is managed.

They do not need to perform every mitigation task.

For example:

```text id="model-risk-09"
Risk owner:
Global Supplier Data Owner

Mitigation task owners:
- ERP_B Source Owner
- Migration Lead
- SAP MDG Architect
```

Avoid assigning every model risk to:

- project manager;
- data migration lead;
- external consultant;
- generic workstream mailbox.

The owner should have authority to choose or escalate the treatment.

## Assign model ownership separately

Risk ownership and model ownership may differ.

The Global Supplier Data Owner may own the risk.

The Supplier Classification attribute may be maintained by a data architect.

The SAP validation may be implemented by the MDG team.

The register should identify these roles separately.

This avoids assuming that the person who owns a field also owns every programme consequence.

## Record the required decision

A risk should state what must be decided.

Examples:

- approve source remediation;
- approve temporary exception;
- select target concept;
- assign global owner;
- retire temporary value;
- defer mandatory rule;
- accept residual risk;
- stop affected migration scope.

Without a decision field, risks remain descriptive.

Example:

```text id="model-risk-10"
Decision required:
Choose one of the following before 31 August:

1. Remediate ERP_B source.
2. Introduce controlled enrichment.
3. Narrow mandatory rule by source.
4. Accept exclusion of affected suppliers from Wave 2.
```

## Distinguish mitigation from workaround

A mitigation reduces likelihood or consequence.

A workaround enables work to continue.

Example:

Risk:

> Source cannot provide required classification.

Workaround:

> Enter `UNKNOWN`.

Mitigation:

> Profile affected population, assign remediation owner and introduce a controlled review status.

The workaround may create new risk.

The register should not close the original item merely because delivery can continue temporarily.

## Record dependencies between risks

Model risks often interact.

For example:

```text id="model-risk-11"
MRISK-0048:
Source classification missing

depends on

MRISK-0051:
Business definition of Supplier Classification unresolved
```

Remediating the source before resolving the definition may create rework.

Another example:

```text id="model-risk-12"
MRISK-0062:
Temporary value still active

increases

MRISK-0064:
Downstream reporting treats temporary state as final classification
```

Risk relationships help the programme address root causes rather than several symptoms independently.

## Link risk to decisions and accepted deviations

When a risk is accepted, record:

- accountable approver;
- accepted residual exposure;
- temporary controls;
- expiry;
- review trigger;
- affected objects.

Example:

```text id="model-risk-13"
Decision:
Accept incomplete ERP_B classification for Mock Load 2.

Control:
Affected records remain blocked from activation.

Approver:
Migration Director and Supplier Data Owner.

Expiry:
Before UAT Cycle 1.

Review trigger:
Completion of ERP_B enrichment extract.
```

Risk acceptance should not mean moving the item to a closed archive.

The exposure remains active until the condition is resolved or permanently accepted.

## Include risk status that reflects lifecycle

Useful statuses include:

- identified;
- assessing;
- decision required;
- mitigation planned;
- mitigating;
- accepted temporarily;
- monitoring;
- resolved;
- superseded.

Avoid only:

- open;
- closed.

A risk may have an approved treatment but remain exposed while implementation is underway.

## Define resolution evidence

A risk should not close merely because a task was completed.

Resolution should require proof that the exposure has changed.

Examples:

### Source risk

- current dataset shows required completeness;
- ownership confirmed;
- extraction tested.

### Mapping risk

- all observed values covered;
- mapping approved;
- target load verified.

### Rule risk

- context corrected;
- positive and negative tests passed;
- production behaviour confirmed.

### Temporary-value risk

- new use blocked;
- affected records remediated;
- value retired;
- downstream consumers verified.

The resolution evidence should link to the same model objects as the risk.

## Use a practical risk-register schema

A model risk record might contain:

```yaml id="model-risk-14"
id: MRISK-0048
title: Unapproved Supplier Risk default
status: mitigating

risk_statement: >
  Because ERP_B cannot populate Supplier Risk,
  there is a risk that migration assigns STANDARD by default,
  resulting in apparently valid but unreviewed classifications.

affected_objects:
  - ATTR-SUPPLIER-RISK
  - MAP-ERP-B-SUPPLIER-RISK
  - VLIST-SUPPLIER-RISK

context:
  source_system: ERP_B
  population: active_suppliers
  wave: WAVE_2

affected_records: 10240
evidence_confidence: confirmed
inherent_risk: high
residual_risk: medium
detectability: low
reversibility: medium

owner: ROLE-GLOBAL-SUPPLIER-DATA-OWNER
decision_due: 2026-08-31

current_control:
  Identify defaulted records by migration batch ID.

treatment:
  Stop unrestricted defaulting and remediate the affected population.

expiry:
  2026-10-01
```

This is a conceptual example rather than a claim about one mandatory Martenweave schema.

The precise schema should remain small enough that teams maintain it.

## Build the first register from existing evidence

Do not begin with a large risk-identification workshop asking participants to imagine every possible problem.

Start with current evidence:

- failed tests;
- gap reports;
- incomplete mappings;
- unresolved decisions;
- expired deviations;
- repeated incidents;
- configuration differences;
- unsupported values;
- unowned critical objects.

Then ask which of these findings creates material future exposure.

This produces a more grounded register.

## Sources of model risks

### Dataset profiling

Can reveal:

- missing columns;
- low completeness;
- unsupported values;
- duplicate keys;
- relationship gaps.

### Deterministic validation

Can reveal:

- broken references;
- invalid lifecycle states;
- active dependencies on retired objects;
- missing ownership;
- incomplete mappings.

### Impact analysis

Can reveal:

- hidden consumers;
- local variants;
- tests affected by a change;
- transitive dependencies.

### Decision review

Can reveal:

- expired conditions;
- missing approval;
- temporary logic treated as permanent.

### AMS incidents

Can reveal:

- repeated model ambiguity;
- configuration drift;
- weak source responsibility.

### Configuration comparison

Can reveal:

- approved model not implemented;
- production changes not reconciled.

## Use risk thresholds carefully

A model-risk register may define thresholds such as:

- more than 5% incomplete critical population;
- more than one active consumer without confirmed compatibility;
- exception overdue by 30 days;
- critical attribute without owner;
- mandatory target without source treatment.

These should be programme policies, not universal truths.

For example, 1% missing bank data may be more serious than 20% missing optional descriptions.

Thresholds should consider object criticality and context.

## Do not measure readiness by risk count alone

A programme with 100 documented risks may be better controlled than one reporting only 10.

Useful measures include:

- critical risks without owner;
- high risks without treatment;
- risks past decision date;
- accepted risks past expiry;
- risks with low evidence confidence;
- risks concentrated on critical objects;
- risks that block the next milestone;
- recurring risks across countries or waves.

The goal is not to reduce the number by closing items administratively.

It is to reduce real exposure.

## Create role-specific views

### Programme management view

- critical and high residual risks;
- milestone exposure;
- decision deadlines;
- accepted conditions;
- accountable owners.

### Domain-owner view

- risks by attribute, rule and value list;
- unresolved semantic decisions;
- ownership gaps.

### Migration view

- source and mapping risks;
- affected populations;
- wave and cutover impact;
- remediation status.

### SAP MDG view

- rules;
- contexts;
- workflow and configuration alignment;
- implementation dependencies.

### AMS view

- operational deviations;
- recurring incidents;
- temporary values;
- post-go-live model debt.

These views should be generated from one register.

Separate spreadsheets for each audience will quickly diverge.

## Integrate with the programme risk register

Not every model risk belongs in the executive programme register.

A practical escalation rule may include:

- critical business or compliance consequence;
- impact across several workstreams;
- threat to a major milestone;
- unresolved decision outside workstream authority;
- accepted high residual risk;
- dependency on executive funding or scope decision.

The programme risk can reference one or more detailed model risks.

Example:

```text id="model-risk-15"
Programme risk:
Wave 2 supplier migration may miss cutover.

Supporting model risks:
- MRISK-0048: Supplier Risk source gap
- MRISK-0052: Payment Terms mapping conflict
- MRISK-0061: Local tax validation incomplete
```

This gives programme management a concise view without losing detail.

## Where Martenweave fits

The current Martenweave Core README describes Martenweave as an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS. It turns spreadsheets, datasets, tickets, validation reports, decisions and SAP context into canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-approved patch proposals.

Its current principles include:

- canonical Markdown and YAML files as source of truth;
- rebuildable SQLite and JSONL indexes;
- deterministic validation before indexing;
- AI-generated PatchProposals requiring human review;
- local-first operation.

Its current workflow includes evidence import or profiling, validation, index generation, dataset/model gap detection, lineage and impact analysis, proposal creation and GitHub-ready review outputs.

This provides much of the evidence needed for a model risk register.

Martenweave can help connect a risk to:

- attributes;
- endpoints;
- mappings;
- rules;
- datasets;
- decisions;
- owners;
- change proposals.

It should not autonomously decide business risk or acceptance.

## A Martenweave risk workflow

```text id="model-risk-16"
Evidence or validator finding
        ↓
Affected model objects identified
        ↓
Risk statement created
        ↓
Population and dependencies analysed
        ↓
Owner and decision date assigned
        ↓
Treatment or acceptance approved
        ↓
PatchProposal or implementation tasks created
        ↓
Resolution evidence validated
        ↓
Risk closed or residual risk accepted
```

This separates risk management from model mutation.

A finding may create a risk.

A risk decision may create a change proposal.

Only the approved proposal changes the canonical model.

## AI can help prepare the register

AI can assist with:

- extracting candidate risks from tickets and reports;
- grouping duplicate findings;
- drafting cause-event-consequence statements;
- identifying likely affected objects;
- summarising evidence;
- suggesting dependency relationships;
- preparing management views;
- flagging overdue decisions.

AI should not autonomously determine:

- business criticality;
- legal consequence;
- final likelihood;
- acceptable residual risk;
- risk ownership;
- approval.

AI-generated risks should remain candidate records until responsible reviewers confirm them.

The safe pattern is:

```text id="model-risk-17"
AI proposes the risk record.
Validators check references and structure.
Owners assess exposure.
Authorities accept or require treatment.
```

## A worked example: global mandatory rule

### Finding

The proposed MDG design makes Customer Group mandatory globally.

### Evidence

- CRM_A is 98% complete;
- ERP_B is 61% complete;
- several countries do not use the attribute operationally;
- target field is sales-area-specific;
- one source provides only a central value.

### Risk statement

> Because source availability and organisational meaning differ by system and country, there is a risk that a global mandatory rule will reject legitimate records or populate repeated values at the wrong level, causing migration failure and misleading sales data.

### Inherent risk

High.

### Current control

Rule remains a warning in the current test release.

### Residual risk

Medium until final configuration decision.

### Required decision

Choose between:

- contextual mandatory rule;
- source remediation;
- enrichment;
- scope reduction.

### Treatment

Run country-level population analysis and approve context-specific rules.

### Resolution evidence

- approved contexts;
- validated source treatments;
- successful migration tests;
- confirmed downstream consumers.

## A worked example: temporary migration value

### Finding

`MIGRATION_REVIEW` was introduced for Mock Load 1.

### Current state

- 7,200 records still contain it;
- users can select it operationally;
- one report counts it as a final classification;
- no expiry is recorded.

### Risk statement

> Because a migration-only value remains active and is interpreted as valid classification, there is a risk that unresolved suppliers will bypass final review and produce misleading compliance reporting.

### Detectability

Low.

### Reversibility

Medium because affected records remain identifiable.

### Treatment

- prevent new operational use;
- identify existing records;
- define remediation owner;
- update reporting;
- retire the value after remediation.

### Escalation

Programme-level due to compliance and post-go-live impact.

## A worked example: retired source endpoint

### Finding

A source field will be removed during legacy-system upgrade.

### Dependencies

- 18 mappings;
- two migration waves;
- one reconciliation report;
- six tests.

### Risk statement

> Because the current mappings depend on a source endpoint scheduled for retirement, there is a risk that future extracts will no longer populate approved target attributes, resulting in load failure and repeated design work.

### Time exposure

Critical in eight weeks.

### Treatment

- assess replacement source;
- validate semantics;
- update mappings;
- rerun dataset coverage;
- update tests.

This risk should be prioritised before the field disappears, not after the first failed load.

## Review the register on a fixed cadence

### Weekly delivery review

Focus on:

- new critical risks;
- milestone threats;
- decisions due;
- mitigation blockers.

### Monthly model-risk review

Focus on:

- high residual risks;
- repeated risks by model object;
- expired exceptions;
- ownership and evidence gaps.

### Before each migration cycle

Focus on:

- source and mapping risk;
- population;
- validation readiness;
- accepted conditions.

### Before each release

Focus on:

- change impact;
- implementation alignment;
- test evidence;
- emergency changes.

### After major incidents

Focus on:

- whether the incident exposed a new model risk;
- whether existing risk assessment was incomplete;
- which control should be added.

The register should stay connected to delivery rather than becoming a quarterly reporting exercise.

## What management should ask

1. Which model objects carry the highest residual risk?
2. Which critical risks have no accountable owner?
3. Which source and mapping risks threaten the next migration milestone?
4. Which temporary deviations have expired?
5. Which risks depend on unresolved business definitions?
6. Which high-risk items have weak evidence?
7. Which failures would be difficult to detect?
8. Which changes would be difficult to reverse?
9. Which risks are concentrated in one source system or country?
10. Which accepted risks need renewed approval?
11. Which programme risks are supported by detailed model evidence?
12. Which model risks should be escalated to programme level?
13. Which mitigation tasks are complete but lack resolution evidence?
14. Can each risk be traced to affected objects, decisions and datasets?

If the register cannot answer these questions, it is probably tracking concerns rather than controlling model risk.

## Common mistakes

### Recording broad risks with no affected objects

The team cannot act precisely.

### Treating every defect as a separate risk

The register becomes a copy of the issue backlog.

### Using only probability and impact

Detectability, reversibility, evidence and time exposure matter.

### Closing risks when a workaround is implemented

The underlying exposure may remain.

### Assigning risks to generic project roles

Accountability becomes unclear.

### Ignoring temporary values and deviations

They are common sources of long-term model debt.

### Storing risk only in programme slides

The relationship to mappings, rules and datasets disappears.

### Using risk count as a maturity metric

More documented risks may indicate better control.

### Allowing AI to assign final risk ratings

Business consequence and acceptance require accountable human judgement.

### Failing to connect resolution evidence

Tasks may close while the risk remains.

## When a spreadsheet risk register is sufficient

A controlled spreadsheet may be enough when:

- one domain is involved;
- the number of model objects is small;
- dependencies are simple;
- one team owns the risks;
- changes are infrequent.

At minimum, include:

- stable risk ID;
- affected model IDs;
- risk statement;
- population;
- owner;
- treatment;
- decision date;
- residual risk;
- expiry;
- evidence.

A registry-based approach becomes more useful when:

- several domains and countries are involved;
- risks depend on model relationships;
- dataset profiles change frequently;
- several implementation partners maintain separate backlogs;
- trace and impact analysis are required;
- risks must survive from migration into AMS;
- AI is used to process evidence.

## Our conclusion

A programme risk register can show that data quality is a concern.

A model risk register shows:

- which data;
- which field;
- which mapping;
- which rule;
- which records;
- which systems;
- which decision;
- which date.

That level of precision changes risk management from reporting into action.

The practical test is:

> Can the programme take one high-risk item and trace it to the exact model objects, evidence, affected population, owner, treatment, decision deadline and resolution proof?

When the answer is yes, the register supports delivery and governance.

When the answer is no, the programme may know that “data is risky” while still discovering the real consequences during migration testing, cutover or production support.

The purpose of a model risk register is not to create another administrative layer.

It is to prevent important structural risks from disappearing between mapping workbooks, dataset reports, Jira tickets, SAP configuration and individual memory.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We build practical model-governance infrastructure for SAP migration, MDG, MDM and AMS teams.

Martenweave connects canonical model objects, datasets, mappings, rules, evidence, decisions and change proposals. This creates the foundation for a model risk register that is traceable to the real implementation rather than maintained only as programme-level narrative.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer combining master data, policy and metadata. Its capabilities include governed models, preservation of semantics and relationships, collaborative workflows, validated values, monitored business rules, mass changes and auditable data changes. SAP also recommends curating master data early before an SAP S/4HANA implementation because automated processes rely heavily on clean and correct master data.

NIST SP 800-30 Rev. 1 describes risk assessments as part of an overall risk-management process that provides leaders with information needed to determine appropriate courses of action. This article applies that general principle to model risks in SAP migration and MDG programmes; it does not imply that NIST defines the model-risk method presented here.

The current Martenweave Core README describes Martenweave as an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS. As of July 2026, the source version is 0.6.1.

Martenweave uses canonical model files, deterministic validation, rebuildable generated indexes, dataset-gap analysis, trace and impact analysis, and reviewable `PatchProposal` and `ChangeRequest` workflows.

Martenweave is an independent project and is not affiliated with or endorsed by SAP or NIST. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
