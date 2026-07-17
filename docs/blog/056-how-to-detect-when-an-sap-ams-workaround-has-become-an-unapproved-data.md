# How to Detect When an SAP AMS Workaround Has Become an Unapproved Data Model

**Reviewed: 14 July 2026**

A supplier cannot be activated because its final risk classification is missing.

AMS creates a workaround:

> Enter `STANDARD` temporarily so the supplier can proceed. The business will correct the value later.

The workaround is documented in a knowledge article. It is used for one urgent supplier.

Two months later, the same procedure is applied to twelve more suppliers.

A spreadsheet is created to track which records still require review.

The support team adds a service-request template so business users can ask for the temporary value.

A report excludes the affected suppliers from risk statistics.

A local interface begins sending `STANDARD` downstream because that is the value stored in SAP.

Six months later, nobody describes the process as temporary.

The approved model still says:

> Supplier Risk represents the final approved exposure classification.

The operational model now says:

> When no assessment is available, use `STANDARD`, maintain the real status in a spreadsheet and exclude the record from selected reports.

The spreadsheet, default, support article and reporting filter together form another data model.

It has:

- its own states;
- its own lifecycle;
- its own ownership;
- its own interpretation rules;
- its own downstream consequences.

It was never approved as a model.

It emerged from repeated service restoration.

This is how SAP AMS workarounds become architecture.

Not through one large design decision, but through a sequence of reasonable local actions that gradually acquire permanence.

> A workaround becomes an unapproved data model when operational behaviour begins defining business meaning that the canonical model no longer explains.

The problem is not that workarounds exist.

AMS needs workarounds. They reduce disruption, preserve service and buy time while underlying causes are investigated.

The problem begins when the organisation cannot distinguish:

- a temporary operational technique;
- a recurring compensating control;
- a permanent business rule;
- a shadow model.

Detecting that transition early is one of the most valuable capabilities an AMS organisation can build.

---

# A workaround is supposed to reduce impact, not redefine truth

In service management, a workaround is normally understood as a temporary way to reduce the effect of a problem while the underlying cause remains unresolved. Atlassian’s problem-management guidance describes workarounds as temporary solutions used to limit business impact and distinguishes them from eliminating the underlying problem. It also warns that heavy, isolated problem-management processes can become backlogs where unresolved issues accumulate rather than improve services.

ServiceNow similarly positions problem management around visibility into known errors and workarounds, root-cause resolution, remediation plans and prevention of recurring incidents.

This distinction is straightforward for a technical workaround:

> Restart the interface after the failed job.

It becomes harder when the workaround manipulates master data.

Examples include:

- assign a default classification;
- store the missing value in a spreadsheet;
- use a custom field instead of the governed attribute;
- bypass validation for a selected population;
- enter a placeholder identifier;
- derive one concept from another without approved semantics;
- maintain an exception list outside the platform;
- suppress records from reporting until remediation.

These actions do not merely restore technical service.

They can alter what the data appears to mean.

Once that altered meaning is reused by processes, reports or integrations, the workaround has crossed into model territory.

---

# The transformation happens gradually

A workaround rarely becomes a shadow model on the day it is introduced.

It typically passes through five stages.

## Stage 1: Emergency containment

One operational case requires immediate treatment.

Example:

> Use temporary code `999` so the record can load.

At this stage, the workaround may be justified.

Its scope is narrow and visible.

## Stage 2: Repeatable procedure

The same condition appears again.

AMS documents the steps so other analysts can apply them consistently.

Example:

> When Legal Form is unknown, use `999` and add the record to the remediation sheet.

The workaround now has procedure.

## Stage 3: Parallel state

The official system can no longer represent the whole operational truth.

The remediation sheet or support queue carries additional state:

- pending;
- reviewed;
- exception approved;
- waiting for source;
- permanent limitation.

The workaround now has lifecycle.

## Stage 4: Downstream adaptation

Reports, interfaces and business processes adapt to the workaround.

Examples:

- reports filter out `999`;
- interface mappings convert `999` to blank;
- users interpret `STANDARD` as “not assessed” for certain sources;
- local teams use a custom status to decide activation.

The workaround now has semantics.

## Stage 5: Institutional dependence

Removing the workaround would disrupt operations.

People may no longer know how many processes depend on it.

The workaround has become an unapproved model.

The original temporary decision may still be recorded as open, resolved or obsolete.

Operational reality has moved on.

---

# The seven signs of a shadow model

Several signals show that a workaround is no longer merely temporary.

## 1. It introduces a new meaning

The clearest sign is that an existing value is being interpreted differently.

Example:

```text
Approved meaning:
STANDARD = approved standard risk classification

Operational meaning for ERP_B:
STANDARD = no final assessment available
```

One value now represents two states.

This is not just poor data quality.

It is semantic overloading.

Another example:

```text
Approved meaning:
Blank = no value maintained

Operational meaning:
Blank = exempt, pending, unavailable or not yet migrated
```

The system cannot distinguish four operational situations.

The distinction survives only in support knowledge or team memory.

## 2. It creates a parallel lifecycle

A spreadsheet may contain:

```text
New
Awaiting business
Approved for exception
Ready for update
Closed
```

These statuses govern the same business object as SAP but are not represented in the canonical model.

The spreadsheet is no longer only a task list.

It carries a shadow lifecycle.

## 3. Other processes begin depending on it

A workaround becomes structurally important when another process asks:

- Is this record on the exception list?
- Was the default entered by AMS?
- Has the spreadsheet status changed?
- Should this value be excluded from reporting?
- Is the manual review complete?

The workaround is now an input to business behaviour.

## 4. It outlives its stated boundary

Typical boundaries include:

- until the source release;
- until the next migration wave;
- during hypercare;
- for one country;
- for one known error;
- for ten business days.

A workaround that remains active after its boundary has expired has changed status, whether or not the documentation has been updated.

## 5. It receives its own ownership

A named team begins maintaining:

- the spreadsheet;
- exception list;
- custom values;
- manual enrichment;
- monthly upload.

Ownership makes the workaround more reliable operationally.

It also makes it easier to mistake the workaround for approved design.

## 6. It appears in training and knowledge articles

Support documentation begins telling users:

> For this supplier category, enter `STANDARD` and notify the support team.

The procedure becomes normalised.

Future analysts may assume it is policy rather than containment.

## 7. Removing it requires impact analysis

When the organisation says:

> We cannot remove this until we understand the reports, interfaces and countries that depend on it,

the workaround is already part of the architecture.

A temporary operational step should be removable through its documented exit plan.

A shadow model requires migration.

---

# The workaround inventory

Most organisations do not know how many active workarounds affect model meaning.

They know about:

- known errors;
- knowledge articles;
- incident resolutions;
- temporary changes;
- local procedures.

These records are usually organised by service or technical component.

To detect shadow models, build a narrower inventory of workarounds that affect data semantics.

Include any workaround that:

- creates or replaces a value;
- changes mandatory behaviour;
- maintains state outside the governed platform;
- bypasses validation;
- applies a default;
- introduces local mapping;
- suppresses data from reporting;
- changes source authority;
- allows activation without approved evidence.

A useful inventory entry contains:

```text
Workaround:
Default Supplier Risk to STANDARD for ERP_B

Origin:
Problem PRB-0142

Affected object:
Supplier Risk

Operational purpose:
Allow urgent supplier review to proceed

Scope:
ERP_B strategic supplier organisations

Introduced:
15 January 2026

Expected expiry:
31 March 2026

External state:
supplier_risk_pending.xlsx

Downstream adaptations:
Risk dashboard exclusion
Outbound interface blank conversion

Current owner:
Supplier AMS Team
```

This record already makes the shadow model visible.

---

# Do not trust the word “temporary”

A workaround is not temporary because the documentation calls it temporary.

It is temporary only when it has all of the following:

- defined scope;
- start date;
- expiry or exit condition;
- accountable owner;
- compensating control;
- residual population;
- removal procedure;
- verified convergence.

If one of these is absent, the workaround may still be necessary, but it is not controlled.

The strongest evidence of temporariness is not an expiry field.

It is an executable path back to the approved model.

For example:

```text
Exit condition:
ERP_B starts supplying final risk classification.

Convergence:
1. Stop assigning temporary STANDARD.
2. Reassess all affected suppliers.
3. Replace defaulted values.
4. Remove reporting exclusions.
5. Remove interface blank conversion.
6. Retire the support article.
```

Without this sequence, “temporary” is an intention.

---

# Defaults are particularly dangerous

Defaults often appear harmless because they reduce blanks.

They can improve superficial completeness while damaging semantic quality.

Consider:

```text
Missing Supplier Risk → STANDARD
```

The field becomes 100% complete.

The model becomes less trustworthy.

The default may hide:

- no assessment performed;
- source unavailable;
- assessment pending;
- local exemption;
- mapping failure.

All these states become indistinguishable from an approved standard-risk classification.

A default has become an unapproved model when users must know its provenance to interpret it correctly.

A defensible default needs:

- approved semantic meaning;
- applicability;
- traceable derivation;
- reversibility;
- downstream acceptance.

If the business interpretation is:

> `STANDARD` means standard risk unless it was entered by AMS for ERP_B,

the model is already fragmented.

---

# Placeholder values are hidden status systems

Values such as these should trigger investigation:

```text
UNKNOWN
N/A
TBD
999
ZZZ
TEMP
OTHER
MIGRATION
```

Some may be valid business values.

Many are carrying process state inside a business attribute.

Ask what each value means operationally.

For example, `UNKNOWN` may mean:

- source did not provide the value;
- business does not know;
- value is not applicable;
- value is awaiting review;
- historical record was not enriched;
- interface failed.

If one code represents several conditions, the organisation has created a compressed shadow model.

The correct response may be to:

- create explicit status;
- separate applicability;
- preserve source completeness;
- establish review state;
- reject the placeholder;
- approve a bounded historical treatment.

Simply documenting the overloaded meaning does not repair the model.

---

# Spreadsheets become models when they contain governing state

A spreadsheet is not automatically a governance failure.

It may be a practical intake or review tool.

The critical question is:

> Does SAP or another governed platform contain enough information to reconstruct the current approved state without the spreadsheet?

When the answer is no, the spreadsheet is part of the operational model.

Common examples include:

- exception-register spreadsheets;
- mapping override files;
- manual status trackers;
- country value lists;
- data-owner approval matrices;
- source-of-truth reconciliation sheets.

A spreadsheet becomes a shadow model when it determines:

- which value is correct;
- whether a record may activate;
- whether an exception remains valid;
- which source wins;
- which local rule applies.

The solution is not necessarily to prohibit spreadsheets.

It is to identify which content must become canonical and traceable.

---

# Knowledge articles can accidentally become policy

AMS teams need knowledge articles.

They speed resolution and make support consistent.

The risk appears when an article states business treatment that is absent from the approved model.

Example:

> When the tax number is unavailable, enter `N/A` and continue.

This statement contains several hidden decisions:

- the field is not always mandatory;
- `N/A` is an approved value;
- lack of source data is equivalent to non-applicability;
- activation is allowed;
- no evidence is required.

The article author may only have intended to document a practical workaround.

Future users experience it as policy.

A useful control is to classify model-affecting knowledge:

```text
Operational instruction:
Restart failed replication.

Model-affecting instruction:
Enter a substitute value or bypass a rule.
```

The second type should reference:

- canonical rule;
- approved decision;
- scope;
- expiry;
- owner.

A knowledge article must not be the only authority for model behaviour.

---

# Local fields can become semantic forks

A country may create a custom field because the global field cannot represent a local requirement quickly.

Initially:

```text
Global:
Supplier Risk

Portugal:
ZZ Compliance Status
```

Over time, users begin treating the local status as the real approval state.

The global risk value becomes secondary.

Reports combine them through local logic.

Interfaces consume one or the other depending on system.

This may be a legitimate contextual extension.

It becomes an unapproved model when:

- no relationship to the global object is defined;
- local meaning is not documented canonically;
- precedence is unclear;
- downstream usage expands outside the approved context;
- the field survives after the original limitation is removed.

The correct question is not:

> Is the field custom?

It is:

> Is the relationship between the local field and shared model explicitly governed?

---

# Reporting exclusions are model decisions

A workaround often includes a report filter:

> Exclude records with placeholder value `999`.

This is not only a reporting change.

It defines which records count as valid population.

The exclusion may alter:

- risk statistics;
- compliance measures;
- completeness metrics;
- operational KPIs;
- executive reporting.

When reports need special knowledge to interpret workaround data, the model has already diverged.

Every workaround-related reporting filter should answer:

- Which canonical condition does it represent?
- Is the exclusion approved?
- Is it temporary?
- What is the residual population?
- When will historical data be corrected?

A hidden filter can make a broken model appear healthy.

---

# Interface conversions create distributed shadow models

Suppose SAP stores `STANDARD` as the workaround.

The outbound interface converts it to blank for one consumer.

Another consumer receives `STANDARD`.

A reporting pipeline translates it to `UNASSESSED`.

The same record now has three meanings across systems.

This is no longer a local AMS workaround.

It is a distributed model fork.

SAP currently positions SAP MDG around one governed model, preserved semantics and relationships, validated values, ownership, workflows, business-rule monitoring and auditable changes.

Those controls are weakened when operational workarounds introduce alternative semantics outside the governed change path.

Martenweave should not replace MDG or the interfaces. Its role is to expose that several implementations no longer share one approved semantic source.

---

# The workaround dependency graph

To determine whether a workaround has become structural, trace its dependencies.

Start with the workaround:

```text
Default Supplier Risk to STANDARD
```

Then identify:

```text
Incident procedure
→ knowledge article
→ spreadsheet register
→ SAP value
→ activation rule
→ interface conversion
→ risk dashboard filter
→ monthly remediation process
```

The number of links is less important than their nature.

A workaround is structurally significant when it affects:

- business decisions;
- persisted data;
- downstream systems;
- reports;
- legal or compliance controls;
- recurring operational services.

This graph also shows why “just remove the workaround” may be unsafe.

The organisation first needs a controlled migration back to approved semantics.

---

# A shadow-model scorecard

Do not reduce the decision to one universal numerical threshold.

Use a qualitative assessment.

| Signal | Low concern | Strong shadow-model signal |
|---|---|---|
| Duration | One bounded event | Active beyond expiry |
| Population | Identified few records | Growing recurring population |
| State | No new state | Parallel lifecycle exists |
| Semantics | Meaning unchanged | Values interpreted differently |
| Persistence | No stored change | Workaround values stored |
| Consumers | No dependencies | Reports or interfaces depend on it |
| Ownership | Incident owner only | Dedicated recurring owner |
| Documentation | Temporary incident note | Standard knowledge or training |
| Removal | Direct rollback | Migration and impact analysis needed |
| Authority | Approved deviation | No clear approving decision |

The assessment should lead to one of four outcomes:

1. retain as controlled workaround;
2. strengthen expiry and monitoring;
3. formalise as approved model change;
4. retire and remediate.

---

# The mandatory conversion trigger

Some conditions should automatically force model review.

## The workaround survives its expiry

It cannot remain a normal temporary control.

## The affected population grows

The condition is no longer exceptional.

## A second system consumes the workaround

Semantic impact has spread.

## A second country copies it

The pattern may reveal a missing shared concept.

## A report or business decision depends on it

The workaround has acquired business meaning.

## Users request it as a standard service

Temporary treatment has become operational capability.

## Removing it requires data migration

It has become persisted design.

These triggers do not automatically approve the workaround as the new model.

They require the organisation to decide.

---

# Formalisation is not automatic acceptance

Once a workaround becomes structural, some teams argue:

> It is already used, so we should document it as the official model.

That is not sufficient.

Operational adoption proves dependence.

It does not prove correctness.

The review should consider four options.

## Accept and formalise

Appropriate when the workaround represents a valid concept or process that should persist.

Example:

- repeated manual review reveals a legitimate Supplier Review Status.

## Redesign

Appropriate when the operational need is valid but the representation is wrong.

Example:

- `UNDER_REVIEW` should become a separate status, not a Supplier Risk value.

## Contain while replacing

Appropriate when immediate removal is unsafe but the workaround must not become permanent.

Example:

- retain a placeholder during remediation, but stop new creation and plan conversion.

## Reject and remove

Appropriate when the workaround is unnecessary, dangerous or based on outdated constraints.

Formal review exists to choose among these outcomes.

---

# The conversion package

When a workaround requires model review, prepare a compact package.

## Original purpose

Which incident or problem was it designed to contain?

## Current operational behaviour

What do teams actually do?

## Affected model objects

Which attributes, rules, values, mappings and sources are involved?

## Population

How many records and contexts use it?

## External dependencies

Which reports, interfaces, procedures and services depend on it?

## Semantic divergence

How does operational meaning differ from approved meaning?

## Authority history

Who approved the original workaround, and for what scope?

## Options

- formalise;
- redesign;
- replace;
- remove.

## Recommendation

Which option best preserves business meaning and operational continuity?

This package turns support history into a model decision.

---

# Worked case: `STANDARD` as “not assessed”

## Approved model

Supplier Risk values:

```text
LOW
STANDARD
HIGH
```

Each is a final approved classification.

## Workaround

ERP_B cannot provide the classification.

AMS assigns `STANDARD` so supplier activation can continue.

## Shadow-model evidence

- 1,800 records now use the default;
- a spreadsheet identifies which values are temporary;
- reports exclude those records;
- one interface converts `STANDARD` back to blank;
- users request the default through a standard form.

## Finding

The operational model has created an undocumented state:

```text
Risk assessment pending
```

## Decision

Reject the overloaded meaning.

Create an explicit Supplier Review Status:

```text
PENDING
CLEARED
REJECTED
```

Retain Supplier Risk as final classification.

## Transition

1. Stop new temporary `STANDARD` creation.
2. Identify defaulted records.
3. Set Review Status to `PENDING`.
4. Reassess risk.
5. Remove reporting exclusions.
6. remove interface conversions.
7. retire spreadsheet and knowledge article.

The workaround was not simply documented.

It was decomposed into the correct concepts.

---

# Worked case: tax-identifier exception spreadsheet

A country maintains a spreadsheet listing suppliers allowed to proceed without a local tax identifier.

## Initial purpose

Support urgent onboarding while legal interpretation is confirmed.

## Current behaviour

- SAP validation checks only whether the supplier appears on the spreadsheet;
- local support maintains approval dates;
- expired entries are not removed consistently;
- downstream systems cannot identify the exemption reason.

## Shadow-model finding

The spreadsheet defines:

- exemption status;
- approval;
- validity;
- evidence;
- owner.

It is an external regulatory model.

## Decision

Create an explicit contextual exemption structure linked to:

- supplier;
- jurisdiction;
- evidence;
- effective period;
- approval;
- governing rule.

The spreadsheet may remain an intake interface temporarily.

It should no longer be the only source of approved exemption truth.

---

# Worked case: recurring mapping override

AMS maintains a CSV file that overrides Customer Group mappings for selected customers.

## Original reason

The central source segment did not reliably map to sales-area-specific Customer Group.

## Current behaviour

- the file contains 4,000 overrides;
- local teams request additions monthly;
- no expiry exists;
- some customers have different values by sales area;
- the approved mapping specification still describes direct central mapping.

## Finding

The CSV is acting as:

- authoritative source;
- organisational mapping;
- exception list;
- ownership process.

## Decision

Do not simply import the file as a permanent mapping table.

Investigate:

- correct granularity;
- business ownership;
- authoritative source;
- enrichment process;
- applicability.

The workaround may reveal that the original direct mapping was invalid.

---

# Worked case: disabled validation

A mandatory validation was changed from error to warning during hypercare.

## Original purpose

Prevent onboarding backlog while source remediation was completed.

## Current behaviour

- remediation was never finished;
- users expect warning-only behaviour;
- active records continue without the value;
- no residual population is maintained.

## Finding

The operational applicability rule has changed:

```text
Approved:
Value mandatory before activation.

Operational:
Value recommended but not blocking.
```

## Required action

Either:

- restore the blocking rule and remediate;
- approve a genuine applicability change;
- approve a bounded new deviation.

Leaving the warning active is itself a policy decision.

---

# Detecting shadow models through recurring evidence

AMS already produces evidence that can reveal these patterns:

- repeated incidents;
- repeated service requests;
- knowledge-article usage;
- problem records;
- temporary changes;
- exception files;
- configuration differences;
- manual upload jobs;
- recurring report filters.

The difficulty is that these signals live in different tools.

Martenweave can connect them around canonical objects.

For example:

```text
ATTR-SUPPLIER-RISK
├── PRB-0142: ERP_B source gap
├── KA-0081: temporary STANDARD procedure
├── REQ-2280: monthly default request
├── DATASET: 1,800 defaulted suppliers
├── REPORT: risk exclusion filter
├── INTERFACE: STANDARD-to-blank conversion
└── DECISION: temporary deviation expired
```

The graph makes the hidden model visible.

---

# Where Martenweave fits

The current Martenweave Core is a backend-first model-governance and evidence layer. It turns datasets, tickets, validation reports, decisions and SAP context into canonical model files, deterministic validation, gap reports, lineage, impact analysis and reviewable proposals.

Its core principles are directly relevant:

- canonical files remain the source of truth;
- generated indexes are rebuildable;
- validation is deterministic;
- AI creates proposals rather than silently mutating the model;
- approved changes remain human-controlled.

For workaround governance, Martenweave should preserve:

- the original operational signal;
- affected model object;
- workaround behaviour;
- scope;
- expiry;
- external state;
- dependencies;
- evidence population;
- proposed resolution.

It should not become the problem-management or knowledge-management platform.

---

# A conceptual workaround object

```yaml
id: WRK-SUPPLIER-RISK-ERP-B-001
type: Workaround

status: model_review_required

origin:
  problem: PRB-0142
  incidents:
    - INC-4821
    - INC-4930

affected_objects:
  - ATTR-SUPPLIER-RISK
  - RULE-SUPPLIER-RISK-ACTIVATION

behavior:
  description: >
    Assign STANDARD when ERP_B cannot provide final Supplier Risk.
  changes_persisted_data: true
  changes_semantic_interpretation: true

scope:
  source_systems:
    - ERP_B
  population:
    - active_strategic_supplier_organisations

introduced_on: 2026-01-15
expired_on: 2026-03-31

external_state:
  - supplier_risk_pending.xlsx

dependencies:
  - REPORT-SUPPLIER-RISK-DASHBOARD
  - INT-SUPPLIER-OUTBOUND-03
  - KA-SUPPLIER-RISK-TEMPORARY

assessment:
  shadow_model_signals:
    - expired
    - parallel_state
    - downstream_dependency
    - semantic_overload
    - standard_service_request

decision_required: >
  Replace the overloaded risk default with an explicit review lifecycle
  and remediate affected records.
```

This is a product direction, not a claim about the current schema.

The important point is that workaround behaviour becomes inspectable against the approved model.

---

# Deterministic checks worth adding

Martenweave could detect structural warning signs such as:

- active workaround past expiry;
- model-affecting workaround without affected object;
- persistent default without derivation decision;
- placeholder value used by several mappings;
- exception list without owner or validity;
- temporary field consumed outside approved context;
- workaround referenced by multiple systems;
- knowledge article prescribing values without a decision reference;
- report filter tied to an unapproved placeholder;
- workaround closed while affected population remains;
- new canonical proposal attempting to formalise a workaround without impact analysis.

These checks do not determine whether the workaround is good or bad.

They determine whether it has escaped its original control boundary.

---

# Compare model state with operational state

A workaround review needs two columns.

| Canonical model | Operational reality |
|---|---|
| Supplier Risk is final classification | `STANDARD` also means unassessed |
| Risk required before activation | Warning allows activation |
| No review status exists | Spreadsheet tracks pending review |
| Global values have shared meaning | Interface converts values by source |
| Temporary deviation expired | Monthly request still active |

The right-hand column is not automatically the new truth.

It is evidence of divergence.

The organisation must decide which side changes:

- implementation returns to the canonical model;
- canonical model is updated;
- both are replaced by a better design.

---

# Model drift is not always caused by weak discipline

Some workarounds exist because the approved model was incomplete.

The operational team may discover realities that the project missed:

- a genuine intermediate lifecycle;
- a valid local legal exception;
- a missing source concept;
- a recurring relationship;
- a population that cannot follow the global process.

Do not treat every shadow model as misconduct.

Treat it as evidence.

The objective is not to punish AMS for keeping the business running.

It is to convert operational learning into governed model change before the workaround becomes irreversible.

---

# Problem management and model management should meet at the workaround

Problem management asks:

> Why does this incident recur, and how can its effect or cause be removed?

Model management asks:

> Has the workaround introduced or exposed business meaning that the approved model does not represent?

These questions overlap but are not identical.

Atlassian recommends keeping incident and problem management close enough that underlying causes and long-term fixes are not isolated in a backlog. It describes a closed problem as one whose cause has been eliminated so that it can no longer create another incident.

For master-data workarounds, problem closure should therefore ask an additional question:

> Has every workaround-created semantic state also been removed, formalised or migrated?

Eliminating the technical cause is not enough when temporary values and external state remain in production data.

---

# Closing the source issue does not remove the shadow model

Suppose ERP_B is enhanced and now provides Supplier Risk correctly.

The technical problem is solved.

But 1,800 existing suppliers still contain temporary `STANDARD`.

The spreadsheet still marks them as pending.

The report still excludes them.

The interface still converts the value.

The organisation must perform model convergence:

1. identify affected records;
2. reassess or enrich them;
3. replace temporary values;
4. remove parallel state;
5. remove special report logic;
6. remove interface conversions;
7. retire operational instructions;
8. verify no new workaround records are created.

Without convergence, the old workaround survives its cause.

---

# How to retire a shadow model safely

Retirement should be treated as a controlled migration.

## Freeze expansion

Stop new records from entering the workaround where operationally possible.

## Establish the population

Identify all records, contexts and systems affected.

## Define the target state

State what each workaround condition becomes.

## Convert data

Replace placeholders, defaults and external statuses.

## Align implementations

Update SAP, interfaces, reports, workflows and tests.

## Remove external authority

Retire spreadsheets, local lists and knowledge instructions as sources of truth.

## Monitor recurrence

Confirm that new incidents do not recreate the workaround.

## Preserve history

Keep the decision and evidence explaining why the workaround existed and how it was removed.

The history remains useful.

The workaround itself should not remain operational by inertia.

---

# What AI may safely do

AI can help identify possible shadow models by:

- clustering recurring incidents;
- finding repeated workaround phrases;
- detecting placeholder values;
- comparing knowledge articles with canonical rules;
- identifying expired deviations;
- tracing reports and interfaces affected by workaround values;
- drafting the review package;
- proposing a migration plan.

AI should not decide:

- that operational adoption makes the workaround valid;
- that a placeholder is a legitimate business value;
- that a temporary exception should become permanent;
- that a spreadsheet is authoritative;
- that the canonical model should change.

The safe pattern remains:

```text
AI surfaces divergence.
Validators check structure.
Owners decide meaning.
Humans approve the change.
Git records the model.
```

---

# A monthly workaround review

A focused review does not need to inspect every known error.

Review only model-affecting workarounds with signals such as:

- expiry approaching or passed;
- population increasing;
- new downstream dependency;
- recurring request volume;
- local replication to another context;
- value or rule semantics changed;
- owner missing;
- removal blocked by unknown impact.

The review should choose one action:

```text
Continue under current control
Strengthen control and expiry
Formalise through model proposal
Replace through redesign
Retire and remediate
```

This creates movement.

A workaround register that only records status becomes another archive.

---

# Questions that expose an unapproved model

Ask these questions for any long-lived workaround:

1. Does it change what a stored value means?
2. Does it introduce a state not represented in the approved model?
3. Is external information required to interpret SAP data correctly?
4. Do reports or interfaces contain special logic for it?
5. Can users request it through a repeatable process?
6. Does it have a dedicated owner or maintenance routine?
7. Has it passed its original expiry or scope?
8. Would removal require data conversion or coordinated release?
9. Can the canonical model fully explain the current operational outcome?
10. Is there a current decision authorising the behaviour?

Several affirmative answers strongly indicate that the workaround has become a shadow model.

---

# Final perspective

An SAP AMS workaround becomes an unapproved data model before anyone calls it one.

The transition happens when temporary operational knowledge becomes necessary to interpret business data.

The evidence is visible:

- one value carries two meanings;
- a spreadsheet contains the real lifecycle;
- a support article defines policy;
- a report compensates for placeholders;
- an interface translates local semantics;
- a temporary procedure becomes a standard request.

The correct response is not to ban workarounds.

That would make AMS less capable of protecting operations.

The correct response is to give model-affecting workarounds a controlled lifecycle:

```text
Contain
→ observe
→ classify
→ review
→ formalise, replace or retire
→ verify convergence
```

SAP MDG can operationalise governed master-data models, ownership, workflows, validated values, quality rules and auditable changes.

Problem-management platforms can record known errors, workarounds, root causes and remediation plans.

Martenweave’s role is to connect those operational records to the model question they create:

> Has the workaround changed the effective meaning, lifecycle, applicability or authority of the data?

The practical test is:

> Could a new analyst interpret the SAP record correctly using only the approved model, without knowing which source, spreadsheet, support procedure or historical workaround touched it?

When the answer is yes, the workaround remains operational containment.

When the answer is no, another data model is already running.

It should be governed before it becomes impossible to remove.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects:

- canonical model objects;
- operational workarounds;
- incidents and problems;
- temporary deviations;
- datasets;
- external dependencies;
- decisions;
- impact analysis;
- reviewable model changes.

It does not replace SAP MDG, problem management, knowledge management or AMS delivery.

Its purpose is to make model drift visible while the organisation still has a choice about how to resolve it.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a governance layer that unifies master data, policy and metadata through one governed model, preserved semantics and relationships, attribute ownership, validated values, workflows, business-rule monitoring, data-quality controls and auditable changes.

Atlassian describes problem management as identifying and managing the causes of incidents, creating known-error records and using workarounds to limit business impact while root causes remain unresolved. Its guidance warns against isolated problem backlogs and recommends keeping incident and problem investigation closely connected.

ServiceNow’s current Problem Management offering emphasises visibility into known errors and workarounds, root-cause analysis, remediation plans, recurring-incident prevention and publishing operational solutions.

Martenweave Core currently positions itself as a backend-first model-governance and evidence layer that converts datasets, tickets, validation reports, decisions and SAP context into canonical model files, deterministic validation, gap reports, lineage, impact analysis and reviewable proposals.

Its current principles define canonical files as the source of truth, generated indexes as disposable, deterministic validation as the first gate, AI output as reviewable proposals and approved changes as human-controlled.

Martenweave is independent and is not affiliated with or endorsed by SAP, Atlassian, ServiceNow or other vendors named in this article. Product names and trademarks belong to their respective owners.
