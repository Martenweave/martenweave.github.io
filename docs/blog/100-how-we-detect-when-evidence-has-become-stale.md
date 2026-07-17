# How We Detect When Evidence Has Become Stale

**Reviewed: 15 July 2026**

We resolve a critical Supplier bank-data Finding during Cutover Rehearsal 5.

The Finding states:

> Payment-active Suppliers with expired bank verification do not have the required payment block.

The remediation is implemented.

The affected population is reconciled.

The target payment block is confirmed.

The validation Rule passes.

Treasury approves the closure Evidence.

The programme records:

```
Finding:
resolved

Baseline:
Cutover RC5

Affected Suppliers:
40

Uncontrolled records:
0
```

The evidence package is valid.

Two weeks later, the programme changes the bank-verification model.

Verification is no longer represented as a Supplier-level status. It is attached to a specific bank-account fingerprint.

The Mapping changes accordingly.

The cutover population also expands to include another company code.

A new Exception is approved for seven Suppliers.

The project dashboard still shows the RC5 Finding as resolved.

Its green validation report remains attached.

Nothing in the report itself looks wrong.

The problem is that the report proves a claim about an earlier state.

It does not automatically prove the current state.

> Evidence becomes stale when one of the assumptions, inputs, rules or scopes supporting its claim has changed materially.

Stale Evidence is not necessarily false.

The RC5 report may remain a completely accurate description of RC5.

It may no longer be sufficient for:

- the current model;
- the current Mapping;
- the expanded population;
- the new Exception set;
- the next cutover decision.

This distinction matters.

We do not want to delete historical Evidence when the model changes.

We also do not want to keep using an old green report as if nothing changed.

Martenweave therefore needs to treat Evidence as a versioned claim with explicit dependencies.

The relationship is:

```
Evidence
supports a claim

The claim applies to
a model, dataset, Rule, Mapping, scope and time

When a material dependency changes,
the claim may require revalidation
```

Martenweave’s current architecture already gives us the core components for this design. Canonical files own model truth, generated indexes are disposable, deterministic validation happens before indexing, and the pipeline connects Evidence, gaps, lineage, impact analysis and human-reviewed proposals.

The next step is to make Evidence freshness part of that dependency model.

# Evidence does not prove everything forever

The RC5 closure package proves a specific statement:

> Under the RC5 model, Rule, Mapping, dataset population and target load, all in-scope Suppliers with expired verification had the required payment block.

That statement contains hidden conditions.

It depends on:

- the definition of expired verification;
- the Entity grain of the verification Attribute;
- the Mapping used to calculate payment-block treatment;
- the list of company codes in scope;
- the Supplier population;
- the active Exceptions;
- the validator implementation;
- the target environment;
- the date on which the result was produced.

If those conditions remain stable, the Evidence may remain current.

If they change materially, the Evidence may no longer support the current readiness claim.

The green report is not wrong.

The claim being made from it has changed.

# We distinguish age from staleness

Old Evidence is not automatically stale.

Recent Evidence is not automatically current.

A three-month-old report may remain valid when:

- the model has not changed;
- the Rule has not changed;
- the Mapping has not changed;
- the population remains the same;
- the source authority remains the same;
- the target control remains unchanged.

A report created yesterday may already be stale if:

- a Mapping changed after the execution;
- the dataset was regenerated;
- the Rule scope was widened;
- an Exception expired;
- the target configuration was replaced.

We therefore separate:

```
Age:
How long ago was the Evidence generated?

Freshness:
Do its dependencies still match the current claim?
```

Time can be one invalidation factor.

It is not the only one.

# Our running case

The RC5 resolution package references:

```
Rule:
RULE-SUPPLIER-BANK-VERIFICATION v3

Mapping:
MAP-SUPPLIER-BANK-PAYMENT-BLOCK v5

Model commit:
abc123

Dataset:
SUPPLIER-BANK-RC5

Company codes:
DE01
NL01
BE01

Active Exceptions:
none

Target load:
CUTOVER-RC5-LOAD-04
```

The current baseline now contains:

```
Rule:
RULE-SUPPLIER-BANK-VERIFICATION v4

Mapping:
MAP-SUPPLIER-BANK-PAYMENT-BLOCK v6

Model commit:
def456

Dataset:
SUPPLIER-BANK-RC6

Company codes:
DE01
NL01
BE01
FR01

Active Exceptions:
EXC-BANK-VERIFY-FR01

Target load:
CUTOVER-RC6-LOAD-02
```

The Evidence dependency comparison shows several changes.

The question is not merely:

> Did something change?

Something always changes in a migration programme.

The question is:

> Did anything change that could affect the claim supported by this Evidence?

# We define the claim explicitly

Evidence should not be linked generically to a Finding.

It should state what it supports.

Weak:

```
Evidence:
RC5 bank validation report
```

Stronger:

```
Claim:
All payment-active Suppliers with expired
bank verification have payment block active
in the RC5 target load.
```

This allows us to examine which changes matter.

A change to the Supplier description Attribute probably does not invalidate the claim.

A change to bank-verification grain probably does.

A change to an unrelated Product Mapping should not trigger revalidation.

A change to the payment-block Mapping should.

Explicit claims make freshness analysis targeted rather than global.

# We record Evidence dependencies

A useful Evidence object should declare the state on which it depends.

For example:

```
Claim dependencies:

- RULE-SUPPLIER-BANK-VERIFICATION
- ATTR-SUPPLIER-BANK-VERIFICATION
- MAP-SUPPLIER-BANK-PAYMENT-BLOCK
- DATASET-SUPPLIER-BANK-RC5
- TARGET-LOAD-CUTOVER-RC5-04
- SCOPE-WAVE1-BANK-CUTOVER
- EXCEPTION-SET-RC5
```

We also record immutable identifiers where possible:

- Git commit;
- dataset hash;
- validator version;
- transformation build;
- load identifier;
- report fingerprint.

The dependency set does not need to include every file in the repository.

It should include the objects whose state materially affects the claim.

# We distinguish direct and indirect dependencies

The RC5 validation report directly depends on:

- the Rule;
- the dataset;
- the validator.

It may indirectly depend on:

- the Attribute definition;
- the source-authority Decision;
- the Mapping;
- the payment-block target field;
- the active Exception policy.

A change to an indirect dependency can still invalidate the Evidence.

For example:

```
Decision changes accepted verification authority
→ Rule meaning changes
→ validation result interpretation changes
→ closure Evidence may become stale
```

Martenweave already treats lineage and impact analysis as core workflow stages.

Evidence freshness should reuse the same dependency graph.

We should not create a second, unrelated staleness engine.

# The first trigger: Rule change

The Rule changes from:

```
Verification status must be current.
```

to:

```
Verification must refer to the current
bank-account fingerprint.
```

This is a material semantic change.

The RC5 report evaluated a Supplier-level status.

The current Rule evaluates account-specific Evidence.

The old report cannot prove compliance with the new Rule.

We mark:

```
Evidence status:
stale

Reason:
Material Rule change

Required action:
Rerun validation under Rule v4
```

The historical result remains valid for Rule v3.

It is not reused for Rule v4.

# Not every Rule edit is material

Suppose the Rule description changes from:

```
Payment-active Suppliers require current verification.
```

to:

```
Suppliers enabled for outgoing payment require
current authorised bank verification.
```

The wording changed.

The executable semantics may not have changed.

Martenweave should compare:

- applicability;
- required Attributes;
- authority;
- condition;
- consequence;
- exception policy.

A title or grammar edit should not invalidate Evidence.

A scope or semantic edit should.

This is why semantic model diffing matters.

Plain file modification timestamps are too coarse.

# The second trigger: Mapping change

The Mapping changes from Supplier-level matching to account-fingerprint matching.

The old Evidence used output generated by Mapping v5.

The current dataset uses Mapping v6.

Even when the Rule remains stable, the Evidence must be reassessed because the derivation path changed.

Possible status:

```
Evidence status:
at risk

Reason:
Mapping changed after Evidence generation

Materiality:
High

Required action:
Regenerate affected population
and rerun target reconciliation
```

We use `at risk` when a dependency changed but the effect has not yet been calculated.

We use `stale` when the old Evidence can no longer support the current claim without revalidation.

# The third trigger: dataset change

The RC5 dataset contained 40 affected Suppliers.

RC6 contains:

- 35 of the original Suppliers;
- 5 removed through an approved scope Decision;
- 18 newly in-scope Suppliers;
- a new company code.

The original Evidence cannot prove the state of the new records.

We reconcile populations:

```
Original covered population:
40

Still in scope:
35

Removed by approved Decision:
5

Newly in scope:
18

Current total requiring evaluation:
53
```

The RC5 Evidence may remain valid for the 35 unchanged records if all other dependencies remain stable.

It does not cover the 18 new records.

This suggests scoped staleness rather than an all-or-nothing status.

# We allow partial freshness

Evidence may be current for part of the scope.

For example:

```
DE01:
current

NL01:
current

BE01:
current

FR01:
not covered
```

The overall readiness claim is not current because FR01 is now included.

The historical Evidence remains usable for the original company codes.

A blanket invalidation would discard useful information.

A blanket green status would hide the uncovered scope.

The correct result is:

```
Evidence status:
partially current

Covered scope:
DE01, NL01, BE01

Uncovered current scope:
FR01

Required action:
Validate FR01 and active Exception
```

# The fourth trigger: source-authority change

Treasury decides that the legacy verification flag is no longer accepted as supporting Evidence.

The original report may have classified records using that flag.

The dataset values have not changed.

The Mapping may not have changed.

The authority Decision changed.

This is enough to make the result stale.

The dependency chain is:

```
Authority Decision changed
→ accepted Evidence changed
→ Rule interpretation changed
→ validation result must be reassessed
```

This is one reason Decisions must be first-class model objects.

Without them, a change in business authority may not appear in technical lineage.

# The fifth trigger: Exception change

RC5 had no active Exceptions.

RC6 introduces:

```
EXC-BANK-VERIFY-FR01
```

The Exception permits seven FR01 Suppliers to remain payment-blocked while verification is completed.

The old Evidence does not know:

- which records are covered;
- whether the Exception is current;
- whether the compensating control is implemented;
- when it expires.

The current readiness claim must distinguish:

```
Rule-compliant records

Controlled Exception records

Unresolved records
```

An Evidence package generated before the Exception existed cannot prove that split.

# The sixth trigger: Exception expiry

Evidence can become stale without any file changing.

Suppose an Exception expires on 31 July 2026.

The report generated on 25 July correctly classifies seven Suppliers as controlled.

On 1 August, the report is no longer sufficient for the current readiness claim.

The data did not change.

The Mapping did not change.

The validity condition changed with time.

We record:

```
Evidence valid through:
31 July 2026

After expiry:
revalidation required
```

This is temporal expiry rather than semantic staleness.

Both should be visible.

# The seventh trigger: target-state change

The RC5 Evidence confirmed the payment block in one target load.

A new target load replaces it.

The source dataset and Mapping may be unchanged.

The target state is new.

The old target reconciliation cannot prove the new load.

We mark:

```
Dataset Evidence:
current

Target Evidence:
stale

Overall closure Evidence:
incomplete for RC6
```

This decomposition prevents unnecessary reruns of every upstream check.

Only the invalidated layer must be refreshed.

# The eighth trigger: validator change

The validator implementation changes.

This can happen because:

- a bug was fixed;
- new fields were added;
- the comparison logic changed;
- a filter changed;
- error handling was corrected.

The Rule may remain the same.

The dataset may remain the same.

The result must still be compared.

If the validator bug could have affected the original conclusion, the Evidence becomes stale.

If the implementation change is unrelated, the Evidence may remain current.

We need validator version and change classification.

# The ninth trigger: source extraction change

The Treasury dataset extraction changes from:

```
current approved records only
```

to:

```
all historical verification records
```

The schema may remain identical.

The file name may remain identical.

The semantics changed.

Evidence freshness therefore cannot rely only on:

- column names;
- filenames;
- modification dates.

We need extraction definition, source version or dataset contract metadata.

# We distinguish stale, invalid and superseded

These terms should not be interchangeable.

## Current

The Evidence still supports the current claim.

## At risk

A dependency changed and materiality has not yet been resolved.

## Partially current

The Evidence supports only part of the current scope.

## Stale

The Evidence is historically valid but no longer sufficient for the current claim.

## Invalid

The Evidence was defective even for the state it claimed to represent.

Examples:

- wrong dataset;
- incomplete execution;
- broken validator;
- corrupted output.

## Superseded

A newer compatible Evidence package replaces it.

## Expired

A declared validity period or Exception window ended.

This vocabulary improves decision quality.

An invalid report is more serious than a stale report.

A superseded report remains useful for history.

# We never rewrite old Evidence as stale data

The RC5 report remains immutable.

We do not edit it to reflect RC6.

We create freshness assessments around it.

Conceptually:

```
Evidence:
EVID-BANK-CONTROL-RC5

Historical claim:
valid

Current-use status:
stale

Reason:
Rule and Mapping changed

Superseded by:
pending RC6 validation
```

This preserves provenance.

W3C PROV-O explicitly includes relationships for derivation, revision and invalidation, and distinguishes entities from the activities that generate or invalidate them.

Martenweave does not need to implement PROV-O directly, but this pattern supports immutable Evidence with changing applicability.

# We compute staleness through impact analysis

When a canonical object changes, Martenweave should ask:

1. Which Evidence depends on this object?
2. Which claims did that Evidence support?
3. Is the change material to those claims?
4. Which scopes are affected?
5. What level of revalidation is required?

For example:

```
Changed object:
MAP-SUPPLIER-BANK-PAYMENT-BLOCK

Dependent Evidence:
- EVID-BANK-CONTROL-RC5
- EVID-BANK-READINESS-RC5
- RES-FIND-BANK-VERIFY-NO-BLOCK-RC5

Affected claims:
- payment block correctly derived
- critical Finding resolved
- Supplier Bank gate ready
```

This turns Evidence freshness into a direct application of lineage.

# We do not rerun everything after every change

An over-sensitive staleness model creates validation fatigue.

If every documentation edit invalidates every report, teams will ignore the warnings.

We classify changes by materiality.

## Non-material

- spelling correction;
- label change;
- formatting;
- additional explanation;
- owner-contact update without authority change.

## Potentially material

- validator implementation refactor;
- dataset schema extension;
- Mapping optimisation;
- new optional source.

## Material

- Rule scope change;
- source-authority change;
- Entity-grain change;
- transformation logic change;
- Exception change;
- target-field change;
- population expansion.

Only material dependencies should force revalidation automatically.

Potentially material changes may require review.

# We define revalidation depth

Not every stale Evidence package requires a full end-to-end rerun.

We define levels.

## Metadata refresh

The claim remains valid; only references or descriptions changed.

## Model-only validation

Revalidate canonical object consistency.

## Dataset revalidation

Rerun the Rule against current data.

## Transformation revalidation

Regenerate derived data and compare output.

## Target reconciliation

Confirm the current target state.

## Business-process test

Verify that the operational control works end to end.

For our case:

```
Rule grain changed:
full dataset and transformation revalidation

New target load:
target reconciliation

New company code:
scoped validation for FR01

Exception introduced:
control and expiry validation
```

This is more efficient than restarting the complete migration test cycle.

# We identify the smallest affected scope

A global Mapping change may affect only records using one branch.

For example:

```
Changed Mapping branch:
FR01 exception path

Unaffected:
DE01, NL01, BE01 standard path
```

The prior Evidence may remain current for the unaffected branches.

Lineage and condition-aware impact analysis allow targeted revalidation.

This is a practical product advantage.

Without it, programmes choose between:

- rerunning everything;
- trusting old Evidence blindly.

# We tie readiness to current Evidence only

The readiness view should distinguish:

```
Current Evidence:
supports current baseline

Historical Evidence:
valid for earlier baseline

Stale Evidence:
requires refresh

Missing Evidence:
never produced for current scope
```

A readiness gate should not count stale Evidence as current proof.

For example:

```
Supplier Bank Readiness:
Not ready

Reason:
Critical Finding resolution Evidence
is stale after Rule v4 and Mapping v6

Current unresolved record count:
unknown until revalidation
```

This may feel conservative.

It is more honest than carrying forward a green score based on an obsolete state.

# We avoid reverting Findings automatically

When closure Evidence becomes stale, the original Finding does not always become open immediately.

Possible states include:

```
Finding:
resolved for RC5

Current baseline:
revalidation required

New occurrence:
not yet confirmed
```

We should not claim the defect has returned without new Evidence.

Staleness means:

> We can no longer prove the current claim.

It does not necessarily mean:

> The problem definitely exists again.

This distinction avoids unnecessary alarm.

# We create a revalidation obligation

When Evidence becomes stale, Martenweave can create a structured obligation:

```
Revalidation reason:
Material Rule and Mapping change

Affected claim:
All expired-verification Suppliers
have payment block active

Required scope:
RC6, including FR01

Required outputs:
- dataset validation
- target reconciliation
- Exception control check

Owner:
Migration Validation Team

Approver:
Treasury Data Owner
```

This is more precise than reopening the original issue with:

> Please test again.

# We separate freshness from trustworthiness

Evidence can be current but weak.

For example:

- current screenshot;
- current manual statement;
- current partial sample.

Evidence can be old but strong for historical analysis.

We therefore track:

```
Freshness:
Does it apply to the current state?

Strength:
How convincingly does it support the claim?

Provenance:
Can we explain where it came from?

Completeness:
Does it cover the required scope?
```

These dimensions should not be collapsed into one score.

# A conceptual Evidence model

A focused Evidence object could look like:

```
---
id: EVID-BANK-CONTROL-RC5
type: Evidence

supports_claim:
  All in-scope Suppliers with expired verification
  have payment block active.

generated_from:
  model_commit: abc123
  rule: RULE-SUPPLIER-BANK-VERIFICATION@v3
  mapping: MAP-SUPPLIER-BANK-PAYMENT-BLOCK@v5
  dataset: SUPPLIER-BANK-RC5
  target_load: CUTOVER-RC5-LOAD-04

scope:
  company_codes:
    - DE01
    - NL01
    - BE01

active_exceptions: []

generated_at:
  2026-07-15

freshness:
  status: stale
  reason:
    - material_rule_change
    - material_mapping_change
    - scope_expansion
---
```

This is a proposed product direction.

It is not a claim about the exact current Martenweave Evidence schema.

# A conceptual freshness assessment

We may keep the Evidence immutable and create a separate assessment:

```
---
id: FRESH-EVID-BANK-CONTROL-RC5-RC6
type: EvidenceFreshnessAssessment

evidence:
  EVID-BANK-CONTROL-RC5

current_baseline:
  model_commit: def456
  dataset: SUPPLIER-BANK-RC6
  target_load: CUTOVER-RC6-LOAD-02

status:
  partially_current

current_scope_covered:
  - DE01
  - NL01
  - BE01

current_scope_not_covered:
  - FR01

material_changes:
  - rule_grain_changed
  - mapping_changed
  - exception_added

required_revalidation:
  - dataset
  - transformation
  - target
  - exception_control
---
```

This preserves historical truth while making current applicability explicit.

# We validate freshness deterministically

Potential diagnostics include:

```
MW-EVID-001
Evidence references a superseded Rule version.

MW-EVID-002
Evidence does not cover the current scope.

MW-EVID-003
A material Mapping change occurred
after Evidence generation.

MW-EVID-004
Evidence depends on an expired Exception.

MW-EVID-005
Target Evidence references an earlier load.

MW-EVID-006
Validator version changed materially.

MW-EVID-007
Evidence has no declared claim.

MW-EVID-008
Evidence dependency cannot be resolved.

MW-EVID-009
Readiness gate relies on stale Evidence.

MW-EVID-010
Resolution Evidence is current only
for a subset of the active scope.
```

These checks make staleness visible before a business owner relies on the report.

# We use Git changes as triggers, not as the full answer

Git can tell us that canonical files changed.

It cannot always determine whether the change invalidates a business claim.

Martenweave should combine:

- Git diff;
- object type;
- changed properties;
- lineage;
- claim dependencies;
- scope;
- domain rules.

A change to `description` may be harmless.

A change to `source_authority` is material.

The semantic model gives meaning to the Git diff.

# We trigger checks on relevant events

A practical implementation can run freshness analysis when:

- a pull request changes canonical objects;
- a model commit is approved;
- a new dataset is profiled;
- a validation run completes;
- an Exception is approved or expires;
- a new target load is registered;
- the project stage changes.

GitHub Actions supports event-based workflow triggers and filters, which can be used to run checks when relevant repository events occur.

Martenweave should use such automation as an execution mechanism.

The canonical dependency logic remains inside the model layer.

# We need ongoing assurance, not one-time sign-off

The broader principle resembles continuous monitoring: confidence in a control depends on ongoing visibility into whether the implemented control remains effective as the environment changes. NIST SP 800-137 describes continuous monitoring as providing visibility into assets and control effectiveness and ongoing assurance aligned with organisational risk tolerance.

Martenweave is not a cybersecurity monitoring platform.

The relevant lesson is narrower:

> Evidence supporting an important control should be reassessed when the conditions that made it valid change.

A one-time green report should not survive every model and scope change without challenge.

# The Workbench view we need

The Evidence page should show:

## Supported claim

What does this Evidence prove?

## Historical validity

For which baseline was it valid?

## Current status

Current, at risk, partially current, stale, invalid, superseded or expired.

## Dependencies

Rule, Mapping, dataset, scope, target load, Exception set and validator.

## Changes since generation

Which dependencies changed?

## Materiality

Why do those changes matter to the claim?

## Covered current scope

Which part of the current baseline remains supported?

## Required revalidation

What must run again?

## Downstream impact

Which Findings, Resolutions and readiness gates rely on this Evidence?

A user should be able to understand why a report became stale without reading a raw Git diff.

# The first product slice we should build

The next focused Martenweave capability should be **Evidence Freshness and Invalidation**.

## Goal

Detect when Evidence can no longer support a current model, Finding resolution or readiness claim.

## Initial dependencies

- model commit;
- Rule version;
- Mapping version;
- dataset fingerprint;
- validator version;
- source authority;
- target load;
- scope;
- active Exceptions;
- validity period.

## Initial statuses

- current;
- at risk;
- partially current;
- stale;
- invalid;
- superseded;
- expired.

## Initial triggers

- material canonical object change;
- dataset or scope change;
- validator change;
- new target load;
- Exception approval or expiry;
- time-based validity expiration.

## Initial outputs

- freshness assessment;
- affected claim;
- material changes;
- current covered scope;
- missing scope;
- required revalidation depth;
- affected readiness gates and Finding Resolutions.

# Proposed commands

A future CLI could support:

```
martenweave evidence freshness \
  EVID-BANK-CONTROL-RC5 \
  --repo ./model
```

```
martenweave evidence impacted-by \
  MAP-SUPPLIER-BANK-PAYMENT-BLOCK \
  --repo ./model
```

```
martenweave evidence stale \
  --repo ./model \
  --scope cutover
```

```
martenweave evidence compare-baseline \
  EVID-BANK-CONTROL-RC5 \
  --current-model ./model \
  --current-dataset ./data/supplier-bank-rc6.csv
```

```
martenweave evidence revalidation-plan \
  EVID-BANK-CONTROL-RC5 \
  --repo ./model
```

These commands describe a recommended product direction.

They are not part of the currently documented CLI contract.

The existing Martenweave foundation already includes the canonical-file, deterministic-validation, lineage, impact and proposal-first architecture required to support this capability.

# Acceptance criteria

We should consider the capability useful when it can detect that the RC5 Evidence is no longer sufficient because:

1. the Rule moved from Supplier-level to account-level verification;
2. the Mapping changed;
3. FR01 entered scope;
4. a new Exception was approved;
5. the target load changed.

It should also avoid unnecessary invalidation when:

- only documentation wording changed;
- an unrelated Product object changed;
- owner contact details changed without changing authority;
- a new field was added outside the Evidence path.

The result should explain:

- what changed;
- why it matters;
- which claim is affected;
- which scope remains covered;
- what must be rerun.

# What we should not build

We should not turn Martenweave into:

- a generic data-observability platform;
- a continuous testing service;
- a workflow scheduler;
- a deployment system;
- an enterprise monitoring suite;
- a universal evidence-management platform.

The feature belongs inside the canonical model layer.

Its purpose is narrow:

> Determine whether existing Evidence still supports the current model claim.

# The business value

Stale Evidence creates a dangerous form of false confidence.

It leads to:

- cutover approvals based on earlier populations;
- resolved Findings whose dependencies changed;
- green dashboards that do not reflect current Rules;
- old test reports reused after Mapping changes;
- Exceptions added without refreshed control Evidence;
- repeated disputes over which report is still valid;
- unnecessary full retesting because the affected scope is unknown.

Evidence freshness gives us two benefits.

First, it blocks unsupported claims.

Second, it makes revalidation targeted.

We know:

- which Evidence became stale;
- which dependency caused it;
- which scope is affected;
- which tests must run again;
- which historical Evidence remains usable.

That is more useful than either trusting every old report or discarding all prior work.

# Final perspective

Evidence is not timeless.

It is a claim about a defined state.

For our Supplier bank case, the RC5 Evidence may remain historically valid:

```
Under Rule v3,
Mapping v5,
RC5 population
and RC5 target load,
the payment-block Finding was resolved.
```

It does not automatically prove:

```
Under Rule v4,
Mapping v6,
expanded RC6 scope
and a new Exception,
the current bank-control gate is ready.
```

The practical test is:

> Can we identify every assumption on which the Evidence depends and detect when a material change breaks the link between the old result and the current claim?

When the answer is yes, the programme can reuse Evidence safely.

When the answer is:

> The report is recent and it was green,

we do not know whether it still proves the thing we are asking it to prove.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We are building Martenweave so that model Evidence remains traceable through change rather than becoming an archive of unchallenged green reports.

Our operating model is:

```
Evidence supports explicit claims.

Claims depend on model state.

Lineage records those dependencies.

Material change triggers freshness analysis.

Stale Evidence remains historical.

Current decisions require current proof.

AI proposes revalidation.

Validators check compatibility.

Humans approve readiness.
```

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

## Sources and notes

This article was reviewed on 15 July 2026.

Martenweave Core currently describes a backend-first pipeline that turns datasets, validation reports, Decisions and SAP context into canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-reviewed proposals.

The current product principles keep canonical files authoritative, generated indexes disposable, validation deterministic and AI-generated changes proposal-first.

Its documented workflow moves from Evidence and profiling through validation, gaps, lineage and impact analysis to reviewed GitHub issues or pull requests.

W3C PROV-O provides a standard vocabulary for provenance across systems and contexts. It includes relationships for generation, derivation, revision and invalidation and distinguishes the Evidence entity from the activity that produced or invalidated it. Martenweave does not need to adopt PROV-O directly, but these concepts support immutable historical Evidence with changing current applicability.

NIST SP 800-137 describes continuous monitoring as providing visibility into assets and deployed control effectiveness and ongoing assurance that controls remain aligned with organisational risk tolerance. This article applies that general reassessment principle to migration Evidence rather than cybersecurity monitoring.

GitHub Actions supports event-based workflow triggers and filters. Those mechanisms can execute freshness checks when relevant repository events occur, while Martenweave retains the semantic logic for determining whether a model change is material to an Evidence claim.

Evidence claim dependencies, freshness assessments, partial staleness, revalidation depth and the proposed commands are product directions. They should not be interpreted as guarantees of the exact current Martenweave schema, Workbench behaviour or CLI until implemented and released.

Martenweave is independent and is not affiliated with or endorsed by SAP, W3C, NIST or GitHub.
