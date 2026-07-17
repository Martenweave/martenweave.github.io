# How Impact Analysis Should Work for Rules, Mappings and Value Lists

**Reviewed: 14 July 2026**

A team proposes three changes:

1. Customer Group should become mandatory before Sales Area activation.
2. CRM Segment should no longer map directly to Customer Group.
3. Value `01` in the Customer Group list should be replaced with `STANDARD`.

All three changes concern the same business Attribute.

They do not create the same impact.

The Rule change affects when records can progress.

The Mapping change affects how values are produced.

The value-list change affects which codes are valid and how existing data is interpreted.

A generic dependency graph may return many of the same connected objects:

- Customer Group;
- source fields;
- SAP field `KNVV-KDGRP`;
- migration datasets;
- validation tests;
- interfaces;
- reports;
- Decisions.

But the reason each object is affected differs.

That difference determines:

- which tests must run;
- which data may need conversion;
- which owners must review;
- whether existing records become invalid;
- whether the change is prospective or retrospective;
- whether the SAP implementation, source systems or only documentation must change.

> Impact analysis should follow the semantics of the change, not merely the object’s position in a graph.

Martenweave’s current core already treats Rules and Mappings as first-class model objects alongside Attributes, Relationships, datasets, evidence, Decisions and change proposals. It validates references before building generated indexes and exposes lineage, impact and diff operations over the canonical model.

The next step is to make impact propagation sensitive to object type.

A Rule does not propagate change like a Mapping.

A Mapping does not propagate change like a value-list entry.

---

# Three objects, three kinds of dependency

A Rule answers:

> Under which conditions must something be true?

A Mapping answers:

> How does one representation become another?

A value list answers:

> Which governed values may represent the Attribute?

These objects often connect to the same Attribute:

```text
ATTR-CUSTOMER-GROUP
├── governed by RULE-CUSTOMER-GROUP-REQUIRED
├── populated by MAP-CRM-SEGMENT-TO-CUSTOMER-GROUP
└── constrained by VALUE-LIST-CUSTOMER-GROUP
```

Their downstream effects are different.

## Rule dependency

A Rule affects:

- acceptance;
- validation;
- workflow;
- activation;
- distribution;
- exception handling.

## Mapping dependency

A Mapping affects:

- value derivation;
- source readiness;
- target population;
- transformation logic;
- lineage;
- reconciliation.

## Value-list dependency

A value list affects:

- code validity;
- conversion tables;
- interfaces;
- reporting groups;
- historical interpretation;
- existing records.

A useful impact engine needs separate propagation policies for each.

---

# Begin with an explicit change operation

The object ID alone is not enough.

Consider:

```text
RULE-CUSTOMER-GROUP-REQUIRED
```

Possible changes include:

- warning becomes error;
- creation-stage check moves to activation;
- applicability expands to another country;
- one exception is removed;
- Rule is retired;
- expression wording is clarified;
- implementation endpoint changes while meaning remains stable.

Each produces a different blast radius.

A PatchProposal should therefore describe the operation.

Conceptually:

```yaml
object_id: RULE-CUSTOMER-GROUP-REQUIRED
operation: change
changes:
  severity:
    before: warning
    after: error
  lifecycle_stage:
    before: creation
    after: activation
```

Impact should be calculated from the changed properties, not only from the object identity.

The same applies to Mappings:

```yaml
object_id: MAP-CRM-SEGMENT-TO-CUSTOMER-GROUP
changes:
  strategy:
    before: direct
    after: conditional_enrichment
```

and value lists:

```yaml
object_id: VALUE-LIST-CUSTOMER-GROUP
operation: replace_value
value:
  before: "01"
  after: "STANDARD"
```

---

# Rule impact begins with behaviour

A Rule change is behavioural.

The first question is:

> What records, lifecycle stages or decisions would behave differently after the change?

This is more useful than:

> Which objects are connected to the Rule?

Suppose:

```text
Before:
Customer Group missing → warning

After:
Customer Group missing → error
```

The Attribute and field remain unchanged.

The source Mapping may remain unchanged.

The effect appears when records are evaluated.

Potential consequences include:

- more rejected migration records;
- blocked Customer Sales Area activation;
- increased steward workload;
- new cutover exceptions;
- changed readiness score;
- changed test expectations;
- changed operational support procedure.

The impact engine should classify this as a **control-strength change**.

---

# Rule-change classes

A practical taxonomy can distinguish several forms.

## Severity change

```text
information → warning
warning → error
error → warning
```

Impact areas:

- release gates;
- readiness reports;
- migration rejection;
- workflow;
- incident volume.

## Applicability change

```text
global → strategic suppliers only
Germany → Germany and Austria
Customer → Customer Sales Area
```

Impact areas:

- affected population;
- local overrides;
- source coverage;
- organisational keys;
- reporting denominators.

## Lifecycle-stage change

```text
creation → activation
activation → distribution
```

Impact areas:

- when data must become available;
- which system enforces the control;
- exception duration;
- process design.

## Expression change

```text
Country = PT
→ Country in [PT, ES]
```

Impact areas:

- population;
- test scenarios;
- local Decisions;
- legal or policy review.

## Exception change

```text
temporary default allowed
→ default prohibited
```

Impact areas:

- unresolved records;
- steward workload;
- cutover risk;
- source remediation.

## Rule retirement

Impact areas:

- implementation controls;
- dependent Decisions;
- tests;
- reports;
- active exceptions.

The change class determines which relationship types should be traversed first.

---

# A stricter Rule may not require a Mapping change

Consider:

```text
Rule:
Customer Group is mandatory before activation.

Mapping:
CRM Segment plus Sales Area derives Customer Group.
```

Changing the Rule from warning to error does not necessarily alter the Mapping.

The Mapping still produces the same value.

However, source readiness becomes more critical.

The Mapping should appear in the impact report as:

```text
Review required:
Mapping must produce sufficient coverage under the stricter Rule.
```

not:

```text
Mapping must be changed.
```

This distinction matters.

Impact analysis should identify **review obligation**, not assume remediation.

---

# Rule impact must include affected population

The same Rule can have radically different impact depending on scope.

Example A:

```text
Applies to:
12 strategic suppliers
```

Example B:

```text
Applies to:
all active suppliers
```

The graph topology may be identical.

The operational impact is not.

A Rule-impact report should state:

- current applicability;
- proposed applicability;
- estimated or observed population;
- excluded contexts;
- historical exceptions;
- affected migration waves.

Where actual record counts are unavailable, the report should state that population impact is unknown rather than assign false precision.

---

# Rule impact reaches implementation controls

The canonical Rule may be implemented through:

- SAP MDG validation;
- BRFplus;
- ABAP;
- migration readiness check;
- source-system validation;
- data-quality platform;
- manual procedure.

The impact engine should traverse:

```text
Canonical Rule
→ implementation references
→ tests
→ operational procedures
```

Changing the Rule’s meaning may require every implementation to change.

Changing only one implementation does not necessarily change the canonical Rule.

That distinction exposes drift.

---

# Rule impact reaches Evidence

Existing Evidence may verify the previous Rule.

For example:

```text
EVID-MOCK-LOAD3-CUSTOMER-GROUP

Verified:
missing value produced warning
```

After severity changes to error, that Evidence remains historically valid.

It no longer proves the candidate behaviour.

The impact result should classify it:

```text
Historical evidence:
valid for previous Rule state

New verification:
required
```

Do not delete or relabel old evidence as though it tested the new Rule.

---

# Rule impact reaches local overrides

A global Rule may have contextual overrides.

```text
Global:
Tax Identifier required before activation.

Portugal:
approved exemption with legal evidence.

Legacy migration:
temporary warning until Wave 3.
```

When the global Rule changes, every override needs reassessment.

Possible outcomes:

- still valid;
- conflicting;
- redundant;
- broader than permitted;
- expired.

This should be a dedicated impact path:

```text
Global Rule changed
→ review all active overrides
```

Local overrides must not disappear inside a generic neighbour list.

---

# Mapping impact begins with the value path

A Mapping change is a lineage change.

The first question is:

> How will the target value be produced differently?

Suppose:

```text
Before:
CRM Segment → Customer Group

After:
CRM Segment + Sales Area → Customer Group
```

The target Attribute remains the same.

The target SAP field may remain the same.

But the transformation now requires:

- another source field;
- organisational context;
- new lookup logic;
- different tests;
- different gap handling.

The impact propagates upstream and downstream.

---

# Mapping-change classes

## Source replacement

```text
ERP_A field → CRM field
```

Impact:

- source authority;
- dataset availability;
- historical continuity;
- reconciliation;
- source ownership.

## Source addition

```text
CRM Segment
→ CRM Segment + Sales Area
```

Impact:

- extract schema;
- keys;
- join logic;
- missing-data rate;
- test combinations.

## Target replacement

```text
custom SAP field → standard SAP field
```

Impact:

- load structure;
- interfaces;
- reports;
- historical fields;
- implementation tests.

## Strategy change

```text
direct → lookup
direct → enrichment
default → blocking gap
manual → automated
```

Impact:

- transformation implementation;
- evidence;
- operational workload;
- control behaviour.

## Applicability change

```text
all customers → acquired-company customers only
```

Impact:

- population routing;
- alternative Mappings;
- unresolved records.

## Value-conversion change

```text
A → 01
A → 02
```

Impact:

- existing target values;
- reports;
- code consumers;
- business interpretation.

## Mapping retirement

Impact:

- orphaned target paths;
- fallback;
- historical lineage;
- active datasets.

---

# Direct and indirect inputs require different impact logic

A Mapping may use several fields.

```text
CRM Segment:
direct value input

Sales Organisation:
conditional lookup input

Customer Status:
filter input
```

If CRM Segment changes, the target value itself may change.

If Sales Organisation changes, the lookup route may change.

If Customer Status changes, the included population may change.

OpenLineage’s column-level lineage model distinguishes direct derivation from indirect influence, including conditional, join and filter dependencies. This is useful for deciding how an input-field change propagates through a Mapping.

Martenweave should preserve this distinction in Mapping impact:

```text
Value derivation affected
Conditional selection affected
Population affected
```

rather than one generic `upstream field changed` warning.

---

# Mapping impact must inspect alternative paths

One Attribute may have several Mappings.

```text
CRM population:
MAP-CRM-CUSTOMER-GROUP

ERP_A population:
MAP-ERP-A-CUSTOMER-GROUP

Missing source:
MAP-MANUAL-CUSTOMER-GROUP
```

Changing one Mapping may:

- affect only one population;
- increase use of another path;
- expose uncovered records;
- create overlap between two sources;
- change source precedence.

The impact engine should examine the Mapping set around the Attribute.

Questions include:

- Does another approved Mapping cover the affected population?
- Do two Mappings now overlap?
- Is a fallback path available?
- Does the fallback have an expiry?
- Does the source-precedence Decision still hold?

---

# Mapping impact reaches source datasets

When a Mapping gains another input field, all relevant datasets should be checked.

Example:

```text
New required context:
Distribution Channel
```

Affected artefacts may include:

- source extract specification;
- staging schema;
- sample CSV;
- profiling report;
- business-review workbook;
- migration API;
- mock-load dataset.

Martenweave’s dataset-readiness workflow can compare observed datasets with model expectations and turn gaps into reports, proposals or issue drafts.

A Mapping proposal should trigger readiness analysis against the candidate input requirements.

---

# Mapping impact reaches the target population

Changing a Mapping does not affect every target record equally.

The impact report should estimate or classify:

- newly covered records;
- records no longer covered;
- records receiving a different value;
- records requiring manual review;
- records remaining unchanged;
- records impossible to evaluate.

A useful summary might say:

```text
Affected population:
ERP_B customers without Sales Area context

Estimated consequence:
Customer Group no longer derivable

Fallback:
manual enrichment

Readiness:
blocked for Wave 3
```

That is more actionable than a list of connected datasets.

---

# Mapping impact reaches reconciliation

Existing reconciliation may assume:

```text
source value count
=
target value count
```

A new enrichment or split changes that expectation.

Reconciliation may need to compare:

- mapped populations;
- rejected values;
- defaulted values;
- context expansions;
- one-to-many output rows;
- manual assignments.

The Mapping change should therefore impact:

- reconciliation Rules;
- test evidence;
- expected result sets;
- sign-off criteria.

---

# Value-list impact begins with identity and meaning

A value list is often treated as static reference data.

It is part of the model.

A value has at least:

- code;
- label;
- meaning;
- status;
- applicability;
- effective period;
- mapping relationships.

Consider:

```text
code: 01
label: Standard
```

Possible changes include:

- label corrected;
- code changed;
- meaning changed;
- value retired;
- replacement introduced;
- scope narrowed;
- value split into several values.

These are not equivalent.

---

# Label change

```text
Standard Customer
→ Standard
```

Potential impact:

- UI;
- documentation;
- exports;
- translations;
- search.

Usually no data conversion is required if the code and meaning remain stable.

The impact should be classified as editorial or presentation-related.

---

# Code change

```text
01
→ STANDARD
```

Potential impact:

- persisted data;
- mappings;
- interfaces;
- reports;
- validations;
- source conversion tables;
- test data;
- historical comparisons.

The meaning may remain stable.

The implementation contract changes.

This is often a breaking physical change.

---

# Meaning change under the same code

```text
01 previously meant:
Standard Customer

01 now means:
Default Customer Group for incomplete records
```

This is more dangerous than a code change.

Systems may continue processing `01` successfully while users interpret it differently.

Impact includes:

- existing records;
- historical reports;
- Decisions;
- Mappings;
- business definitions;
- audit interpretation.

The value should usually not be silently redefined.

A new value or explicit temporal version may be safer.

---

# Value addition

Adding:

```text
DIGITAL_ONLY
```

may appear non-breaking.

Potential impact includes:

- interfaces with fixed enumerations;
- reports with exhaustive grouping;
- validation code;
- translations;
- source-system mappings;
- unknown-value handling;
- test coverage.

Compatibility must be assessed per consumer.

An SAP field may accept the new code while a downstream interface rejects it.

---

# Value retirement

Retiring:

```text
UNDER_REVIEW
```

requires several questions:

- Are active records using it?
- Is it replaced by another value?
- Does it move to another Attribute?
- Can historical records retain it?
- Which Mappings still produce it?
- Which reports filter on it?
- Which Rules reference it?

Retirement is not deletion.

The old value may remain necessary for historical interpretation.

---

# Value split

Suppose:

```text
OTHER
```

is replaced by:

```text
TEMPORARY
UNCLASSIFIED
OUT_OF_SCOPE
```

Impact includes:

- conversion of existing records;
- source reclassification;
- Mapping changes;
- report grouping;
- exceptions;
- data-quality Rules;
- human review for ambiguous records.

A deterministic conversion may not exist.

The impact report should mark records requiring judgement.

---

# Value merge

Suppose:

```text
LOW
STANDARD
```

become:

```text
NON_CRITICAL
```

Impact includes:

- loss of distinction;
- historical trend compatibility;
- downstream logic;
- Mapping simplification;
- report aggregation.

The change may be technically easy and analytically irreversible.

---

# Applicability change for one value

A value may remain valid globally but become prohibited in one context.

Example:

```text
Customer Group 01:
allowed globally

New Rule:
not allowed for Sales Organisation 2000
```

This change crosses value-list and Rule impact.

The impact engine should identify:

- records in the newly prohibited context;
- Mappings that can produce the value there;
- local overrides;
- reports;
- migration datasets;
- replacement values.

---

# Value-list impact reaches Mappings in both directions

Mappings may translate:

```text
source code → canonical value
canonical value → SAP code
SAP code → interface code
```

Changing the canonical value list can affect all three layers.

Example:

```text
CRM A
→ canonical STANDARD
→ SAP 01
→ interface STD
```

Retiring `STANDARD` requires reviewing:

- source conversion;
- SAP representation;
- outbound conversion;
- historical data.

A value list should not be analysed only against its immediate Attribute.

---

# Value-list impact reaches Rules

Rules may reference values explicitly:

```text
if Customer Group = STRATEGIC
then Credit Review is required
```

Adding, changing or retiring values may make Rule expressions:

- incomplete;
- invalid;
- redundant;
- over-broad.

The impact engine should find:

```text
Rule expression references value
Rule applicability excludes value
Rule default assumes value
```

This requires typed references where possible.

Free-text references should be detected cautiously and presented as candidates.

---

# Rule and value-list changes can interact

Suppose a new value is added:

```text
UNDER_REVIEW
```

and a Rule says:

```text
Customer Group must be one of:
STANDARD
STRATEGIC
HIGH_VALUE
```

The Attribute technically accepts the new value.

The Rule rejects it.

The candidate model is inconsistent.

Prospective validation should detect this before merge.

---

# Mapping and value-list changes can interact

Suppose a Mapping still produces:

```text
01
```

but the target value list now permits only:

```text
STANDARD
STRATEGIC
```

The Mapping becomes invalid.

The impact engine should identify:

```text
Mapping output no longer belongs to target value domain.
```

This is stronger than saying both objects changed.

It identifies an actual candidate-state contradiction.

---

# Rule and Mapping changes can interact

Suppose the Rule becomes stricter:

```text
Customer Group required before activation.
```

At the same time, the Mapping removes a default.

This may be the correct design.

Operationally, it can increase blocked records sharply.

The combined impact is larger than either isolated change.

A proposal-aware engine should evaluate the complete candidate patch rather than analyse each operation independently.

---

# Compound change impact

Real releases often contain several connected changes.

Example:

1. retire `UNDER_REVIEW` from Supplier Risk;
2. create Supplier Review Status;
3. split the old Mapping;
4. add lifecycle Rules;
5. add a new SAP endpoint.

The correct impact is not the union of five unrelated lists.

It is a model transition:

```text
Old overloaded concept
→ two governed Attributes
→ two Mappings
→ two target endpoints
→ separate Rules
```

The report should describe:

- old state;
- candidate state;
- conversion;
- affected records;
- implementation changes;
- historical treatment.

---

# Candidate-state validation is essential

Current-state impact answers:

> What is connected now?

Candidate-state validation answers:

> Will the proposed Rules, Mappings and values form a coherent model?

Conceptually:

```text
current repository
+
PatchProposal
=
candidate repository
```

Then run:

- schema validation;
- reference validation;
- Rule-value compatibility;
- Mapping-output compatibility;
- lifecycle checks;
- impact graph comparison.

Martenweave’s proposal-first principle is designed for this: AI or automation creates a `PatchProposal`; validators verify it; humans approve before canonical mutation.

---

# Existing records must be part of impact

A model can be internally valid after a change while existing records become invalid.

Examples:

- retired value still used;
- new mandatory Rule fails;
- Mapping no longer covers a population;
- value split requires reclassification;
- context-specific prohibition affects active records.

The impact report should distinguish:

```text
Model impact:
references and semantics

Data impact:
existing records and datasets

Implementation impact:
systems and controls
```

Martenweave should reference profiling or migration evidence rather than store every production record.

---

# Prospective versus retrospective effect

A change may apply only to future records.

Or it may require correcting historical data.

Example:

```text
New Supplier Risk value:
applies from 1 October
```

Possible policies:

- future use only;
- convert all active records;
- preserve historical records;
- reinterpret old code retrospectively.

The impact report must ask:

- effective date;
- record population;
- historical interpretation;
- backfill requirement.

Without temporal scope, “affected records” is ambiguous.

---

# Implementation locations

Rules, Mappings and value lists may be implemented in several places.

## Rules

- SAP MDG;
- BRFplus;
- ABAP;
- source controls;
- data-quality tools;
- migration validators.

## Mappings

- ETL code;
- SQL;
- conversion tables;
- integration middleware;
- manual enrichment files;
- SAP migration objects.

## Value lists

- SAP domains;
- configuration tables;
- MDG value lists;
- APIs;
- source-system reference tables;
- report logic.

Impact should traverse implementation references without assuming that one technology is authoritative for the business model.

---

# Design lineage and runtime evidence

A canonical Mapping may declare a dependency.

Runtime evidence may show which path actually executed.

OpenLineage distinguishes design-time metadata from runtime Job Run observations and models field-level transformations, including direct and indirect dependencies.

For Martenweave, this suggests a useful separation:

```text
Canonical Rule or Mapping:
approved intended behaviour

Runtime Evidence:
observed execution or result
```

Impact can be refined by runtime evidence:

- active path;
- unused path;
- zero-volume path;
- failed path;
- context-limited path.

But runtime behaviour should not silently redefine canonical truth.

---

# Impact confidence

Each impact result should state why it appears.

## Confirmed

A typed direct dependency is incompatible with the proposed change.

## Strong review

The object depends on the changed concept but compatibility requires testing.

## Possible

The connection is transitive, inferred or context-dependent.

## Historical

The relationship applies only to previous baselines.

## Excluded

The object was reviewed and shown unaffected.

This classification should be accompanied by the path.

---

# Path-aware output

Weak result:

```text
Affected:
RULE-001
MAP-004
VALUE-07
INTERFACE-002
```

Stronger result:

```text
MAP-004
produces value 01
for ATTR-CUSTOMER-GROUP

VALUE-01
is retired by the proposal

Therefore:
MAP-004 output becomes invalid
```

Another example:

```text
RULE-001
blocks activation when Customer Group is missing

MAP-004
removes the previous default

Therefore:
records without a source value may newly fail activation
```

The path and reasoning turn graph traversal into impact analysis.

---

# Suggested impact report structure

## Change summary

- changed objects;
- operations;
- target baseline;
- effective context.

## Candidate-state validation

- errors;
- warnings;
- incompatible references.

## Rule impact

- affected population;
- lifecycle;
- implementations;
- overrides;
- tests.

## Mapping impact

- source requirements;
- target changes;
- alternative paths;
- datasets;
- reconciliation.

## Value-list impact

- added, retired or redefined values;
- existing-record population;
- Mapping references;
- Rule references;
- interface compatibility.

## Compound effects

- interactions between changed objects.

## Required reviewers

- semantic owner;
- migration lead;
- SAP owner;
- integration owner;
- local owner.

## Verification plan

- datasets;
- tests;
- reports;
- release gates.

---

# A worked example: making Customer Group mandatory

## Proposal

```text
RULE-CUSTOMER-GROUP-REQUIRED

Before:
warning at activation

After:
error at activation
```

## Direct impact

- Rule implementation;
- validation tests;
- readiness score.

## Mapping review

- CRM Mapping coverage;
- ERP_A Mapping coverage;
- manual fallback capacity.

## Dataset review

- missing Customer Group count;
- missing Sales Area context;
- affected migration records.

## Operational review

- activation failure handling;
- exception process;
- steward workload.

## Unchanged

- business Attribute definition;
- target SAP field;
- value list.

The report should not claim that all connected Mappings must change.

It should state that their coverage must be proven under the stricter control.

---

# A worked example: replacing a direct Mapping

## Proposal

```text
Before:
CRM Segment → Customer Group

After:
CRM Segment + Sales Area → contextual enrichment
```

## Direct impact

- Mapping implementation;
- source dataset;
- transformation tests.

## Indirect impact

- organisational keys;
- unmatched records;
- manual fallback;
- readiness reports.

## Rule impact

The existing mandatory Rule may now block more records.

## Value-list impact

The target list is unchanged.

The conversion table may still require new combinations.

## Target impact

`KNVV-KDGRP` remains the same.

This is a lineage change without a physical target change.

---

# A worked example: retiring `UNDER_REVIEW`

## Current state

```text
Attribute:
Supplier Risk

Value:
UNDER_REVIEW
```

## Candidate state

```text
Supplier Risk:
LOW
STANDARD
HIGH

Supplier Review Status:
PENDING
CLEARED
REJECTED
```

## Value-list impact

- `UNDER_REVIEW` retired;
- historical records identified;
- replacement is not one-to-one.

## Mapping impact

- old source classification Mapping split;
- Review Status Mapping added;
- Risk Mapping amended.

## Rule impact

- activation Rule uses Review Status;
- final Risk Rule excludes pending state.

## Implementation impact

- new target endpoint;
- interface contract;
- reporting logic;
- conversion process.

This is a semantic decomposition, not a simple value deletion.

---

# A worked example: renaming code `01`

## Proposal A

```text
Code remains:
01

Label:
Standard Customer → Standard
```

Likely impact:

- display;
- documentation;
- translation.

## Proposal B

```text
Code:
01 → STANDARD

Meaning unchanged
```

Likely impact:

- stored values;
- interfaces;
- conversion tables;
- reports;
- tests.

## Proposal C

```text
Code remains:
01

Meaning changes:
Standard → Temporary Default
```

Likely impact:

- all historical interpretation;
- Rules;
- Mappings;
- Decisions;
- data remediation.

The textual size of the change does not indicate its impact.

---

# Test planning from impact paths

Impact results should produce a test plan.

## Rule tests

- positive condition;
- negative condition;
- boundary;
- exception;
- lifecycle transition;
- local override.

## Mapping tests

- direct source;
- missing source;
- unsupported value;
- conditional context;
- fallback;
- duplicate or conflicting sources.

## Value-list tests

- new value accepted;
- retired value rejected;
- interface response;
- report grouping;
- historical value handling.

## Compound tests

- stricter Rule with missing Mapping input;
- retired value still produced by Mapping;
- local override using deprecated value.

Testing should follow the model transition, not just the changed code.

---

# Ownership and review routing

Different change types require different reviewers.

| Change | Primary reviewer |
|---|---|
| Rule meaning | Semantic owner |
| Rule implementation | SAP or control owner |
| Mapping source | Source and migration owners |
| Mapping target | SAP target owner |
| Value meaning | Business data owner |
| Value code | Integration and implementation owners |
| Historical conversion | Migration and reporting owners |
| Local applicability | Local data owner |

The impact report should produce a review matrix automatically where ownership metadata exists.

---

# Release-gate conditions

A candidate change should be blocked when:

- a Mapping produces a retired value;
- a Rule references an unknown value;
- no Mapping covers a newly mandatory Attribute;
- local overrides conflict with a new global Rule;
- replacement values are ambiguous;
- required source fields are missing;
- active records cannot be converted safely;
- critical implementation owners are unknown;
- candidate-state validation fails.

Warnings may remain for:

- incomplete optional evidence;
- unverified low-risk consumers;
- planned future implementation;
- historical-only references.

---

# Avoid a universal impact score

A single number such as:

```text
Impact score: 82
```

can help sort work.

It should not become the explanation.

Two changes may receive the same score for different reasons:

- one affects millions of records but few systems;
- another affects a small population across many critical controls.

The report should expose dimensions:

```text
Semantic impact:
high

Data conversion:
medium

Implementation spread:
high

Population:
low

Reversibility:
medium

Evidence confidence:
high
```

---

# What AI can contribute

AI can help:

- summarise Rule expression changes;
- identify likely Mapping conflicts;
- explain value-list consequences;
- draft reviewer checklists;
- propose tests;
- detect references in prose.

It should not decide autonomously:

- that two values are equivalent;
- that a Mapping remains valid;
- that a stricter Rule is acceptable;
- that historical records may be reinterpreted;
- that a local override can be removed.

The deterministic engine should establish exact references and candidate-state contradictions.

Humans decide business compatibility.

---

# A focused Martenweave implementation slice

Martenweave already has the required foundation:

- canonical Rules and Mappings;
- deterministic validation;
- lineage and impact;
- repository diff;
- dataset readiness;
- proposal-first changes.

The next vertical slice should add **typed candidate-state impact policies**.

## Goal

Evaluate proposed changes differently for Rules, Mappings and value lists.

## Scope

Support:

- Rule severity, applicability and lifecycle changes;
- Mapping source, target and strategy changes;
- value addition, retirement, code change and meaning change;
- cross-object compatibility checks;
- direct and transitive impact paths.

## Acceptance criteria

The engine must detect:

1. Mapping produces a retired value.
2. Rule references a removed value.
3. New mandatory Rule has no complete Mapping path.
4. Mapping adds a source field absent from the dataset.
5. Local override conflicts with changed global Rule.
6. Historical Evidence refers to the previous state without being invalidated.

## Validation command

```bash
martenweave validate --repo examples/customer_bp_model
```

## Existing analysis commands

```bash
martenweave impact FEP-S4-KNVV-KDGRP \
  --repo examples/customer_bp_model

martenweave diff \
  examples/customer_bp_model \
  examples/customer_bp_model_candidate
```

## Future proposal-aware operation

```bash
martenweave impact \
  --proposal PATCH-CUSTOMER-GROUP-CONTROL-CHANGE \
  --repo examples/customer_bp_model
```

The last command describes a recommended product direction rather than current guaranteed CLI behaviour.

---

# Final perspective

Rules, Mappings and value lists are closely connected.

They are not interchangeable.

A Rule determines whether a value is acceptable or required.

A Mapping determines how the value is produced.

A value list determines which representations are governed as valid.

Changing one can invalidate the others.

The impact engine must therefore reason across the complete triangle:

```text
Rule
↕
Business Attribute
↕
Mapping
↔
Value List
```

and then continue into:

```text
datasets
SAP fields
interfaces
reports
tests
Decisions
Evidence
local overrides
```

The practical test is:

> Before approving a change, can the programme determine which records will behave differently, which Mappings will become incomplete, which values will become invalid, which implementations must change and which historical results must remain interpretable?

When the answer is yes, impact analysis supports governed change.

When the answer is only:

> These objects are connected in the graph,

the system has lineage, but it has not yet explained the consequences.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It treats Rules, Mappings, values, Attributes, physical fields, datasets, Decisions and Evidence as typed canonical objects so that proposed changes can be validated before they alter approved model truth.

The objective is not to predict every business consequence automatically.

It is to expose enough structured consequence that accountable people know what must be reviewed.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave Core currently represents generic data-model objects including Attributes, Relationships, datasets, Mappings, Rules, Evidence, Decisions and change proposals. It validates references before building generated lineage and impact indexes and requires human approval for proposed changes.

The current pipeline imports or profiles evidence, validates canonical files, builds generated indexes, detects model and dataset gaps, runs lineage and impact analysis and then routes proposals through human review.

OpenLineage’s current column-lineage specification models which input fields produce output fields and distinguishes direct value derivation from indirect influence. It classifies direct identity, transformation and aggregation dependencies and indirect join, grouping, filtering, sorting, window and conditional dependencies.

OpenLineage’s object model distinguishes design-time lineage metadata from runtime Job Run observations. This is useful for separating approved Rule or Mapping intent from evidence about how a particular implementation actually executed.

The value-list object model, typed change policies and proposal-aware impact command described here are recommended Martenweave directions. They should not be treated as guarantees of the exact current schema or CLI unless separately published and versioned.

Martenweave is independent and is not affiliated with or endorsed by SAP or OpenLineage.
