# How We Prevent Duplicate Findings Across Mock Loads and Migration Waves

**Reviewed: 15 July 2026**

We run the Supplier bank-verification check during Mock Load 2.

The validator finds 3,400 payment-active Suppliers without authorised verification evidence.

We investigate the result and confirm the Finding:

> The Treasury Review Dataset is not connected to the Supplier bank migration path.

The migration team creates an issue.

The Treasury dataset is added, but the implementation is incomplete.

During Mock Load 3, the validator finds 480 Suppliers without authorised verification.

A second Finding is created:

> Supplier bank verification missing for 480 records.

During Cutover Rehearsal 1, 95 records fail.

A third Finding is created.

Wave 2 starts in another country.

The same Treasury dataset dependency is absent from that wave’s configuration.

A fourth Finding is created.

By cutover, the programme has:

- four Findings;
- six issues;
- three spreadsheets;
- several validation reports;
- multiple owners;
- no clear view of whether these are separate problems or repeated observations of the same unresolved cause.

The error count decreased from 3,400 to 95.

The backlog count increased.

The programme appears to be discovering new problems while it is actually observing the same model failure repeatedly.

This is the duplication problem.

> A new validation result is not automatically a new Finding.

Every mock load produces new Evidence.

Every migration wave introduces a new scope.

A Finding should represent the governed interpretation of a problem—not each individual occasion on which the problem became visible.

We therefore separate:

```
Observation:
A specific execution detected a condition.

Finding:
The accepted explanation of the underlying problem.

Occurrence:
The Finding appeared in a particular baseline or scope.

Recurrence:
The Finding returned after it was believed to be resolved.

Regression:
A previously working control stopped working.

Related Finding:
A similar symptom has a materially different cause or treatment.
```

Without these distinctions, Martenweave would become another error-ingestion system that creates more objects every time a validator runs.

Our objective is different.

We want to preserve one coherent problem history across:

- mock loads;
- cutover rehearsals;
- migration waves;
- model releases;
- source systems;
- post-go-live incidents.

Martenweave’s current architecture already treats validation reports, datasets, Decisions and SAP context as inputs to canonical model files, gap reports, lineage, impact analysis and human-reviewed proposals. Canonical files own model truth, while generated indexes remain rebuildable.

The next product layer should ensure that repeated Evidence updates an existing Finding when the underlying problem is the same.

---

# The validation run is an event

Mock Load 2 produces a validation result:

```
Execution:
VALRUN-BANK-VERIFY-ML2

Rule:
RULE-SUPPLIER-BANK-VERIFICATION

Dataset:
SUPPLIER-BANK-ML2

Failed records:
3,400
```

Mock Load 3 produces another:

```
Execution:
VALRUN-BANK-VERIFY-ML3

Rule:
RULE-SUPPLIER-BANK-VERIFICATION

Dataset:
SUPPLIER-BANK-ML3

Failed records:
480
```

These are two distinct execution events.

They occurred:

- at different times;
- against different datasets;
- under different model baselines;
- with different populations.

They should remain separate Evidence objects.

The mistake is creating a separate canonical problem merely because the Evidence is new.

A provenance model needs to distinguish the artefact from the activity that generated it. W3C PROV-O similarly separates entities, activities and responsible agents, and supports derivation, generation, revision and invalidation relationships across heterogeneous systems.

Martenweave does not need to implement PROV-O directly.

We need the same basic discipline:

```
Validation report:
new Evidence

Validation execution:
new Activity

Underlying Finding:
possibly the same problem
```

---

# The Finding represents the root problem

After Mock Load 2, we confirm:

```
Finding:
Treasury verification evidence is not connected
to the Supplier bank migration path.

Classification:
Dataset and Mapping gap

Affected Rule:
Payment-active Supplier requires
authorised bank verification.

Affected source:
LEGACY-EU

Required remediation:
Register Treasury Review Dataset
and implement account-specific matching.
```

Mock Load 3 shows fewer failures because part of the integration was completed.

The underlying Finding remains open.

We do not create:

```
Finding 1:
3,400 missing verifications

Finding 2:
480 missing verifications
```

We update the existing Finding history:

```
Observed in Mock Load 2:
3,400 records

Observed in Mock Load 3:
480 records

Trend:
improving

Current state:
partially remediated

Remaining cause:
bank-account fingerprint matching incomplete
```

The count changed.

The problem identity did not.

---

# We do not use the error message as the Finding identity

Validators often emit messages such as:

```
Verification status missing.
```

That message is too broad for deduplication.

The same message may be produced by:

- an omitted Treasury file;
- an incorrect join;
- a stale account fingerprint;
- an out-of-scope Rule;
- a genuinely unverified bank account;
- an expired Exception.

These are different Findings.

Conversely, the same underlying problem may produce different messages in different tools:

```
BANK_VERIFICATION_STATUS is null
```

```
Treasury approval not found
```

```
Payment-active Supplier lacks evidence
```

```
Target bank record rejected
```

Text similarity is useful for candidate matching.

It is not sufficient for semantic identity.

---

# We identify Findings through stable model context

A useful Finding fingerprint should use the parts that describe the underlying problem.

For example:

```
Affected Rule
+
failure classification
+
affected model path
+
source authority
+
root cause
+
governed scope
```

For the Supplier case:

```
Rule:
RULE-SUPPLIER-BANK-VERIFICATION

Classification:
dataset_mapping_gap

Affected path:
Treasury Review Dataset
→ Bank Verification Evidence

Source:
LEGACY-EU

Cause:
authoritative dataset not connected

Scope:
Wave 1 Supplier bank migration
```

We exclude unstable execution details such as:

- validation-run ID;
- timestamp;
- current record count;
- report filename;
- mock-load number;
- message wording.

Those details belong to the occurrence.

They do not normally define the Finding.

---

# A fingerprint is a matching aid, not final authority

We can generate a deterministic candidate fingerprint:

```
RULE-SUPPLIER-BANK-VERIFICATION
| dataset_mapping_gap
| TREASURY-REVIEW-DATASET
| LEGACY-EU
| authoritative_input_not_connected
```

If Mock Load 3 produces the same fingerprint, Martenweave can suggest:

> Attach this observation to the existing Finding.

That suggestion may be correct.

Human review or stronger deterministic rules remain necessary when the context changes materially.

For example, Wave 2 may use:

- another Treasury system;
- another Supplier identifier;
- another operational owner;
- another accepted fallback.

The symptom may look identical.

The remediation may not be.

---

# We distinguish continuing occurrence from recurrence

A Finding can appear repeatedly because it was never fully resolved.

That is a continuing occurrence.

Timeline:

```
Mock Load 2:
Finding confirmed

Mock Load 3:
Finding still present

Cutover Rehearsal 1:
Finding still present
```

The Finding should remain open.

The later Evidence updates:

- affected population;
- severity;
- impact;
- remediation progress.

A recurrence is different.

Timeline:

```
Mock Load 2:
Finding confirmed

Mock Load 3:
Finding resolved and revalidated

Cutover Rehearsal 1:
same failure returns
```

Now we need to record:

```
Recurrence:
yes

Previous resolution:
Treasury dataset integrated

New observation:
dataset omitted from cutover pipeline

Possible cause:
deployment or configuration regression
```

The Finding history should preserve that it was once resolved.

We should not simply reopen it without recording the recurrence.

Repeated recurrence may indicate a control-design problem rather than another isolated implementation defect.

---

# We distinguish recurrence from regression

A recurrence means the same business problem has returned.

A regression means a previously working implementation or control has stopped working.

For the Supplier case:

## Recurrence

Wave 2 never connected its Treasury verification dataset.

The same governance gap appears in a new rollout scope.

## Regression

Wave 1 had a working Treasury integration in Mock Load 3, but the cutover pipeline used an older configuration and lost the join.

Both may attach to the same parent Finding family.

They require different delivery responses.

The regression may require:

- deployment control;
- baseline enforcement;
- pipeline comparison;
- release validation.

The recurrence may require:

- rollout template improvement;
- domain-pack reuse;
- onboarding control;
- ownership clarification.

We should not flatten them into one generic duplicate label.

---

# Migration waves require scoped identity

Wave 1 and Wave 2 may contain the same structural defect.

Should they share one Finding?

Sometimes yes.

Sometimes no.

We use two levels.

## Root Finding

Represents the reusable model or control problem.

For example:

> Supplier bank migration lacks a mandatory pattern for integrating authorised verification evidence.

## Scoped Occurrence

Represents how that problem appears in one wave.

For example:

```
Wave 1 occurrence:
LEGACY-EU Treasury dataset not connected

Wave 2 occurrence:
LEGACY-NA approval service not connected
```

This structure lets us see both:

- the repeated enterprise pattern;
- the wave-specific work.

The root Finding may lead to a reusable product or model improvement.

Each occurrence may require its own implementation issue.

---

# We avoid merging Findings that merely look similar

Over-deduplication is as dangerous as duplication.

Suppose two validation results say:

```
Bank verification missing.
```

In Wave 1, the cause is:

```
Treasury dataset absent.
```

In Wave 2, the cause is:

```
Verification exists,
but refers to a previous bank account.
```

The first is a dataset and Mapping gap.

The second is a record-level evidence defect.

They should not be one Finding.

They have different:

- causes;
- remediation levels;
- owners;
- closure criteria;
- risk treatments.

The correct relationship is:

```
Related through:
RULE-SUPPLIER-BANK-VERIFICATION

Separate Findings:
different cause and remediation
```

The common Rule supports navigation.

It does not force identity.

---

# Our deduplication test

Before attaching a new observation to an existing Finding, we ask:

1. Does it violate the same canonical Rule?
2. Does it affect the same business concept and model path?
3. Is the failure classification the same?
4. Is the probable or confirmed cause the same?
5. Would the same remediation resolve it?
6. Is the accountable owner materially the same?
7. Are the closure criteria the same?
8. Is the new scope a continuation, recurrence or rollout occurrence?

When the answers are mostly yes, we update the existing Finding.

When cause, treatment or closure diverge, we create a separate Finding and link it as related.

The strongest identity test is:

> Would one approved remediation resolve both observations without weakening the model?

If yes, they are likely the same Finding.

If no, they probably need separate Findings.

---

# We preserve every occurrence

Deduplication must not erase history.

The canonical Finding should keep an occurrence timeline.

For example:

```
Finding:
FIND-TREASURY-VERIFICATION-PATH

Occurrence 1:
Mock Load 2
3,400 affected
LEGACY-EU
confirmed

Occurrence 2:
Mock Load 3
480 affected
LEGACY-EU
continuing

Occurrence 3:
Cutover Rehearsal 1
95 affected
LEGACY-EU
continuing

Occurrence 4:
Wave 2 Assessment
1,200 affected
LEGACY-NA
related rollout occurrence
```

Each occurrence references:

- validation Evidence;
- dataset baseline;
- model commit;
- population;
- impact assessment;
- stage;
- status.

We retain the operational detail without creating four unrelated root problems.

---

# Counts belong to occurrences

The Finding’s identity should not depend on the current affected count.

Counts change because:

- data is corrected;
- scope changes;
- mappings improve;
- records leave the wave;
- new records enter;
- Exceptions are approved;
- validation logic becomes more precise.

The Finding should expose a trend:

```
3,400
→ 480
→ 95
```

This tells us that remediation is working but incomplete.

Creating a new Finding at each count loses that trend.

It also makes programme reporting misleading:

```
Closed Findings:
1

New Findings:
2
```

The programme may appear to be generating new defects when it is reducing one persistent defect.

---

# We separate problem history from task history

One Finding may create several delivery tasks:

- register the Treasury dataset;
- implement Supplier identity matching;
- add bank-account fingerprint matching;
- create a cutover control;
- update the rollout template.

Those tasks may be represented as GitHub Issues.

GitHub supports marking issues and pull requests as duplicates to group similar work and reduce unnecessary burden.

That mechanism is useful at the delivery layer.

Martenweave still needs a semantic layer above it.

Two issues may be duplicates because they implement the same remediation.

Two Findings may be related but not duplicates because they affect different model causes.

We therefore preserve:

```
Finding identity:
governed problem meaning

Issue identity:
delivery work item
```

GitHub can manage duplicate tasks.

Martenweave should decide whether observations represent the same model problem.

---

# We do not reopen every closed issue

Suppose the original GitHub issue implemented the Wave 1 Treasury integration and was completed.

Wave 2 later reveals the same structural gap.

Reopening the old issue may be inappropriate because:

- the original implementation was completed;
- a different team owns Wave 2;
- the acceptance criteria differ;
- the rollout template now needs improvement.

We may create a new issue linked to the existing root Finding.

The Finding history shows recurrence across waves.

The delivery history remains clear.

This is another reason not to equate Findings with issues.

---

# We use provenance to establish whether results are comparable

Before comparing two observations, we verify:

- same Rule version;
- same model baseline or known difference;
- comparable dataset scope;
- same validator semantics;
- known exception policy;
- compatible source authority.

Mock Load 2 may have used Rule version 1:

```
Any VERIFIED status accepted.
```

Mock Load 3 may use Rule version 2:

```
Only current Treasury verification accepted.
```

The failure counts are not directly comparable.

An increase may result from a stronger Rule rather than worsening data.

The occurrence record should state:

```
Comparable to previous run:
partially

Material Rule change:
verification authority narrowed
```

This protects trend analysis from false conclusions.

---

# We detect stale observations

An old validation result may remain attached to an active Finding after:

- the Rule changed;
- the Mapping changed;
- the dataset was regenerated;
- the affected population left scope.

We do not delete it.

We mark its relevance:

```
Historical Evidence:
valid for Mock Load 2 baseline

Current Evidence:
superseded by Mock Load 3 execution
```

PROV-O includes revision, derivation and invalidation concepts that illustrate why provenance systems should preserve relationships among historical entities rather than overwrite them.

For Martenweave, the practical result is:

- old Evidence remains available;
- current status relies on the newest compatible Evidence;
- historical counts do not pollute current readiness.

---

# The Finding lifecycle

A Finding may move through:

```
candidate
→ confirmed
→ remediating
→ controlled
→ resolved
→ recurring
→ resolved again
```

Occurrences can have their own states:

```
open
controlled
resolved
out_of_scope
superseded
```

The root Finding should not be marked resolved merely because one occurrence is closed.

For a multi-wave Finding:

```
Wave 1:
resolved

Wave 2:
open

Root Finding:
active across rollout
```

This lets leadership see that the reusable problem remains.

---

# We create a Finding family when needed

Some problems evolve.

The original Finding is:

> Treasury verification dataset is missing.

After integration, a smaller population remains because account fingerprints do not match.

That is not necessarily a duplicate of the original Finding.

It may become a child Finding:

```
Parent:
Authorised verification path incomplete

Child 1:
Treasury dataset missing

Child 2:
Current bank-account matching incomplete

Child 3:
Payment block not applied to unresolved records
```

The parent expresses the broader business-control failure.

The children express distinct causes and remediation paths.

This hierarchy is better than either extreme:

- one vague Finding containing everything;
- hundreds of disconnected record-level Findings.

---

# We make fingerprint changes explainable

A Finding fingerprint should be stable, but the Finding may evolve after investigation.

Candidate classification:

```
missing verification
```

Confirmed classification:

```
authoritative dataset not connected
```

We should preserve both:

```
Initial candidate fingerprint:
RULE + missing_verification + LEGACY-EU

Confirmed fingerprint:
RULE + dataset_mapping_gap
+ TREASURY-DATASET + LEGACY-EU
```

The system records why the identity became more precise.

We do not silently replace it.

This helps AI-assisted matching improve without hiding earlier uncertainty.

---

# AI suggests duplicates; it does not merge them silently

AI can compare:

- titles;
- descriptions;
- Rule references;
- model paths;
- failure populations;
- source systems;
- probable causes;
- proposed remediation.

It can return:

```
Possible duplicate:
FIND-TREASURY-VERIFICATION-PATH

Similarity:
High

Matching:
- same Rule
- same source
- same missing dataset
- same remediation

Difference:
new mock-load baseline
```

The safe action is:

```
Attach as new occurrence?
```

Not:

```
Merged automatically.
```

A wrong merge can hide a distinct risk.

A wrong split creates noise.

Both decisions require review where semantic meaning is uncertain.

---

# We can automate exact cases

Not every deduplication decision needs human review.

We can attach an observation automatically when all of these are true:

- exact Finding fingerprint match;
- same Rule version;
- same source path;
- same scope family;
- same cause classification;
- existing Finding is open;
- no material model change occurred.

We can require review when:

- model version changed materially;
- source authority changed;
- migration wave differs;
- Finding was previously resolved;
- remediation differs;
- confidence is below a threshold.

This gives us useful automation without autonomous semantic mutation.

---

# We do not use record overlap as the only criterion

Mock Load 2 and Mock Load 3 may contain mostly different records.

The same pipeline defect can affect both.

Low record overlap does not mean separate Findings.

Conversely, the same records may fail two different Rules for different reasons.

High record overlap does not mean duplicate Findings.

Record overlap is supporting Evidence.

Cause and remediation remain stronger identity signals.

---

# Migration-wave templates should prevent recurrence

When the same root Finding appears in multiple waves, we should ask whether the programme has failed to convert a lesson into reusable model control.

For example, after Wave 1 resolves the Treasury dependency, the domain pack or rollout template should require:

- authorised verification source;
- Supplier identity Mapping;
- account-specific matching;
- payment-block fallback;
- readiness validation.

If Wave 2 repeats the gap, the problem is no longer only local implementation.

It may indicate:

- missing model packaging;
- incomplete wave onboarding;
- weak required-object validation;
- poor reuse of accepted Decisions.

Martenweave should surface:

```
Cross-wave recurrence:
2 waves

Shared cause:
verification dependency not included
in rollout baseline

Recommended model improvement:
make verification dataset dependency mandatory
for Supplier bank domain pack
```

This turns repeated Findings into product and governance improvement.

---

# We measure recurrence, not just open count

Useful programme metrics include:

- unique root Findings;
- total occurrences;
- recurring Findings;
- regressions;
- cross-wave recurrences;
- average time to confirmed cause;
- average time to evidenced resolution;
- number of Findings reopened;
- number of repeated failures prevented by model changes.

A high number of observations with a low number of root Findings may indicate recurring systemic issues.

A simple “open issues” count cannot show this.

---

# A conceptual Finding model

A root Finding might look like:

```
---
id: FIND-TREASURY-VERIFICATION-PATH
type: Finding
status: active

title:
  Authorised Treasury verification
  is not reliably connected
  to the Supplier bank migration path

rule:
  RULE-SUPPLIER-BANK-VERIFICATION

classification:
  dataset_mapping_gap

root_cause:
  mandatory verification dependency
  is not enforced across migration baselines

affected_path:
  - DATASET-TREASURY-BANK-REVIEW
  - MAP-TREASURY-BANK-VERIFICATION
  - ATTR-SUPPLIER-BANK-VERIFICATION

scope_family:
  supplier_bank_migration

occurrences:
  - OCC-BANK-VERIFY-ML2
  - OCC-BANK-VERIFY-ML3
  - OCC-BANK-VERIFY-CR1
  - OCC-BANK-VERIFY-WAVE2
---
```

An occurrence might contain:

```
---
id: OCC-BANK-VERIFY-ML3
type: FindingOccurrence

finding:
  FIND-TREASURY-VERIFICATION-PATH

validation_run:
  VALRUN-BANK-VERIFY-ML3

stage:
  mock_load_3

source_system:
  LEGACY-EU

affected_records:
  480

occurrence_type:
  continuing

model_baseline:
  abc123
---
```

These are proposed product directions.

They are not claims about the exact current Martenweave schema.

---

# The Workbench view we need

A Finding page should show:

## Root problem

Authorised Treasury verification is not reliably connected.

## Current status

Active.

## Occurrence timeline

- Mock Load 2: 3,400 records.
- Mock Load 3: 480 records.
- Cutover Rehearsal 1: 95 records.
- Wave 2 assessment: 1,200 records.

## Occurrence type

Continuing, regression or new-wave recurrence.

## Scope

Source systems, countries, waves and baselines.

## Remediation history

Which changes reduced the population.

## Related Findings

Distinct causes under the same Rule.

## Delivery work

Issues and pull requests created for each scope.

## Recommended systemic change

Make the verification dependency mandatory in the Supplier bank domain pack.

This view tells the story of the problem.

A list of four tickets does not.

---

# The first product slice we should build

The next Martenweave capability should be **Finding Deduplication and Recurrence Tracking**.

## Goal

Prevent repeated validation runs and migration waves from creating duplicate root Findings while preserving every occurrence and its Evidence.

## Initial objects

- Finding;
- FindingOccurrence;
- validation Evidence;
- recurrence relationship;
- regression relationship;
- related-Finding relationship;
- optional Finding family.

## Initial matching inputs

- Rule;
- classification;
- affected model path;
- source system;
- authority;
- probable cause;
- scope family;
- remediation type.

## Excluded from primary identity

- error count;
- execution timestamp;
- report filename;
- mock-load number;
- free-text wording.

## Required outputs

- attach to existing Finding;
- reopen as recurrence;
- record as regression;
- create wave-specific occurrence;
- create distinct related Finding;
- request human review.

---

# Proposed commands

A future CLI could support:

```
martenweave findings match \
  --from ./reports/bank-validation-ml3.json \
  --repo ./model
```

```
martenweave findings attach-occurrence \
  FIND-TREASURY-VERIFICATION-PATH \
  --from ./reports/bank-validation-ml3.json \
  --repo ./model
```

```
martenweave findings recurrence \
  FIND-TREASURY-VERIFICATION-PATH \
  --repo ./model
```

```
martenweave findings duplicates \
  --repo ./model \
  --scope supplier-bank
```

```
martenweave findings compare-occurrences \
  OCC-BANK-VERIFY-ML2 \
  OCC-BANK-VERIFY-ML3 \
  --repo ./model
```

These commands describe a product direction, not the currently documented CLI.

Martenweave’s current foundation already provides canonical files, deterministic validation, generated indexes, dataset gaps, lineage, impact analysis and proposal-first Git delivery.

---

# Acceptance criteria

We should consider the capability useful when:

1. Mock Load 2 and Mock Load 3 results with the same cause update one Finding.
2. Their validation reports remain separate Evidence.
3. Record-count changes appear as a trend.
4. A resolved Finding returning later is marked as recurrence or regression.
5. The same structural issue in another wave becomes a scoped occurrence or related child.
6. A similar message with a different cause creates a separate Finding.
7. AI cannot merge Findings without review when semantics differ.
8. GitHub delivery issues remain linked but independent.
9. Current readiness uses current compatible Evidence.
10. Historical occurrences remain traceable.

---

# What we should not build

We should not turn Martenweave into:

- a generic ticket-deduplication service;
- an issue-tracker replacement;
- an opaque semantic-clustering engine;
- a high-volume event platform;
- a universal incident-management system.

The deduplication feature should remain tied to model-aware Findings.

Its job is to answer:

> Is this new Evidence about an existing governed problem, or evidence of a materially different problem?

That narrow question is valuable enough.

---

# The economic value

Duplicate Findings create more than administrative noise.

They cause:

- fragmented ownership;
- repeated root-cause analysis;
- contradictory remediation;
- misleading progress reporting;
- duplicated issues;
- repeated business workshops;
- lost cross-wave learning;
- incomplete closure Evidence.

Over-deduplication creates another risk:

- distinct causes are merged;
- minority risks disappear;
- one closure incorrectly closes several problems;
- different owners assume somebody else is acting.

A model-aware identity system reduces both errors.

It allows the programme to see:

```
one persistent root problem,
four observed occurrences,
three remediation attempts,
two migration waves,
one systemic improvement still required.
```

That is more useful than four separate red rows.

---

# Final perspective

Every mock load should create new Evidence.

It should not necessarily create a new Finding.

For the Supplier bank-verification case:

```
Mock Load 2:
3,400 failed records

Mock Load 3:
480 failed records

Cutover Rehearsal:
95 failed records
```

These may describe one continuing Finding.

Another wave may reveal the same structural weakness as a new scoped occurrence.

A different failure under the same Rule may require a separate Finding because its cause and remediation differ.

Our decision rule is:

```
Same symptom:
not enough.

Same Rule:
not enough.

Same records:
not enough.

Same cause,
same model path,
same treatment
and same closure:
likely the same Finding.
```

The practical test is:

> Can we preserve every validation execution and affected population while maintaining one coherent history of the underlying problem?

When the answer is yes, the programme can learn across runs and waves.

When the answer is:

> We created a new issue because the report had a new filename,

we have confused fresh Evidence with a new problem.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We are building Martenweave so that migration programmes can distinguish:

```
new Evidence
from a new problem,

continued failure
from recurrence,

recurrence
from regression,

and related symptoms
from true duplicates.
```

Our operating model is:

```
Validation runs create Evidence.

Evidence produces or updates occurrences.

Occurrences belong to governed Findings.

Findings preserve root cause and remediation.

Delivery systems track the work.

Canonical model changes prevent recurrence.
```

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

## Sources and notes

This article was reviewed on 15 July 2026.

Martenweave Core currently describes a backend-first model-governance and evidence pipeline that turns datasets, validation reports, Decisions and SAP context into canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-approved proposals.

Its current principles keep canonical Markdown and YAML files authoritative, generated indexes disposable, validation deterministic and AI changes proposal-first.

Its documented workflow moves from Evidence and profiling through validation, gap detection, lineage and impact analysis to reviewed GitHub issues or pull requests.

W3C PROV-O is a W3C Recommendation for representing and exchanging provenance information across systems and contexts. It distinguishes entities, activities and agents and includes relationships for generation, derivation, revision and invalidation. Martenweave does not need to implement PROV-O directly, but these distinctions support preserving separate validation executions while relating them to one continuing Finding.

GitHub supports marking issues and pull requests as duplicates so similar delivery items can be tracked together and unnecessary burden reduced. In the architecture described here, GitHub manages duplicate work items, while Martenweave determines whether validation observations refer to the same governed model problem.

FindingOccurrence objects, semantic fingerprints, recurrence and regression classification, cross-wave Finding families and the proposed commands are product directions. They should not be interpreted as guarantees of the exact current Martenweave schema, Workbench behaviour or CLI until implemented and released.

Martenweave is independent and is not affiliated with or endorsed by SAP, W3C or GitHub.
