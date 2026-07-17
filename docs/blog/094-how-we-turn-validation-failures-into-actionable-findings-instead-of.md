# How We Turn Validation Failures into Actionable Findings Instead of Another Error Report

**Reviewed: 15 July 2026**

We run a validation against a Supplier bank-data migration dataset.

The result contains 3,400 failed records.

The report says:

```
RULE-SUPPLIER-BANK-VERIFICATION failed.

Expected:
BANK_VERIFICATION_STATUS = VERIFIED
```

Technically, the validator did its job.

It evaluated the declared condition and identified records that did not satisfy it.

Operationally, the report is almost useless.

It does not tell us:

- whether all 3,400 records failed for the same reason;
- whether the source data is wrong;
- whether the required verification file was omitted;
- whether the Mapping is incomplete;
- whether the business Rule is incorrectly scoped;
- whether some Suppliers are covered by an approved exception;
- who must act;
- what must change;
- whether the model, dataset or implementation should be corrected;
- which downstream processes are affected.

The migration team now has a large error list, but it does not yet have a manageable problem.

This distinction matters.

> A validation failure is an observation. A Finding is an interpreted, bounded and actionable explanation of what that observation means.

We do not want Martenweave to become another tool that produces thousands of red rows.

Existing validators, ETL tools, data-quality platforms and SAP load utilities can already generate errors.

Our product opportunity begins after the test runs.

We want to connect the result to:

- the canonical Rule;
- the affected business Attribute;
- source and target lineage;
- the migration population;
- relevant Evidence;
- existing Decisions;
- accepted Exceptions;
- business impact;
- accountable ownership;
- a reviewable remediation path.

The useful workflow is:

```
Validation result
→ classification
→ grouped Finding
→ impact analysis
→ remediation decision
→ PatchProposal or implementation task
→ new Evidence
→ closure
```

Martenweave’s current architecture already provides canonical model files, deterministic validation, dataset-gap reporting, lineage, impact analysis and human-approved patch proposals. Its documented pipeline moves from Evidence and profiling through validation and gaps to impact analysis and reviewed Git work.

What we need to strengthen is the layer between a failed check and a proposed change.

That layer is the Finding.

---

# The report tells us what failed, not what the problem is

The Supplier bank-verification Rule says:

> A payment-active Supplier must have current verification Evidence for the bank account used for payment.

The validator checks the migration dataset and returns 3,400 failures.

A weak workflow creates 3,400 issues.

That creates noise.

Most of those records may share one underlying cause.

After investigation, we discover:

- 3,200 records come from the same legacy source;
- their Treasury verification exists in a separate file;
- the file was not included in the migration dataset;
- 200 records contain a legacy `VERIFIED` flag;
- that flag is not backed by an authorised Treasury review;
- 80 of those 200 Suppliers are already payment-blocked;
- 120 are expected to become payment-active at cutover.

The original output represented one failed technical condition.

The actual situation contains two different problems:

```
Problem 1:
Required verification Evidence exists,
but the authoritative dataset is missing from the migration path.

Problem 2:
A legacy status claims verification,
but the source is not authorised to establish it.
```

These problems need different owners and different remediation.

The first is primarily a dataset and Mapping gap.

The second is a governance and risk issue.

If we keep them in one error bucket, we obscure both.

---

# We preserve the raw validation result

We do not replace the original report with an AI summary.

The raw result remains Evidence.

We preserve:

- Rule ID;
- validator ID and version;
- model baseline;
- dataset fingerprint;
- execution timestamp;
- evaluated population;
- failed records;
- result categories;
- command or process that produced the report.

Conceptually:

```
Validation execution:
VALRUN-SUPPLIER-BANK-RC4

Rule:
RULE-SUPPLIER-BANK-VERIFICATION

Dataset:
SUPPLIER-BANK-CUTOVER-RC4

Model commit:
abc123

Population:
50,000

Failed:
3,400
```

This provides a reproducible starting point.

The Finding does not alter what the validator observed.

It interprets the result in model and business context.

That separation prevents a convenient explanation from replacing the underlying evidence.

---

# We determine the subject of the failure

Before classifying a Finding, we ask what actually failed.

Possible subjects include:

- canonical model;
- source dataset schema;
- source records;
- Mapping;
- transformation implementation;
- Evidence availability;
- target validation;
- business policy;
- exception control.

For the 3,200 Suppliers, the bank records themselves may be correct.

The failure occurs because the migration path does not include the authoritative Treasury review dataset.

The subject is therefore not simply:

```
Supplier record
```

It is:

```
Migration dataset and source-to-target evidence path
```

For the remaining 200 records, the subject is different:

```
Verification authority
```

This distinction controls the next action.

If we misclassify a missing input dataset as bad record quality, we may ask local teams to correct thousands of Suppliers manually.

That would treat the symptom and ignore the model gap.

---

# We classify the failure before proposing remediation

We need a small, practical failure taxonomy.

We should not build an elaborate enterprise defect ontology.

For Martenweave, a useful initial classification might include:

## Data defect

The source contains a value that violates the accepted Rule.

## Dataset gap

A required field or dataset is absent from the supplied evidence.

## Mapping defect

The required input exists, but the Mapping does not use it correctly.

## Model gap

The canonical model does not represent a necessary Attribute, Rule, relationship or authority decision.

## Implementation drift

The transformation behaves differently from the approved Mapping.

## Evidence gap

A claim may be true, but the required supporting Evidence is unavailable or stale.

## Authority conflict

Multiple sources claim to provide the same value, and the accepted authority is missing or contradicted.

## Scope defect

The Rule or validator was applied to records outside its intended population.

## Controlled exception

The Rule failed, but an approved, current and bounded Exception governs the affected records.

## Target mismatch

The target system or validation behaviour differs from the canonical model assumption.

Our Supplier case produces two classifications:

```
Finding A:
Dataset gap

Finding B:
Authority conflict and evidence gap
```

This is already more useful than 3,400 identical error messages.

---

# We group failures by cause, not only by error code

All 3,400 records failed the same Rule.

That does not mean they should become one Finding.

It also does not mean they should become 3,400 Findings.

We group records when they share:

- the same underlying cause;
- the same affected model objects;
- the same owner;
- the same remediation;
- the same risk treatment.

The 3,200 records belong together because:

- they come from the same source path;
- they lack the same Treasury input;
- one dataset integration can resolve them;
- one team owns that integration.

The 200 records require a separate Finding because their legacy verification claim is semantically weak.

A practical grouping key may combine:

```
Rule
+
failure classification
+
source system
+
affected Mapping
+
recommended owner
```

Grouping should remain explainable.

We should not let an AI clustering model create opaque categories that reviewers cannot reproduce.

AI can suggest the grouping.

The final Finding should state why the records belong together.

---

# We write the Finding as a problem statement

A Finding should not merely repeat the failed check.

Weak:

```
3,200 Suppliers failed bank verification.
```

Stronger:

> The current Supplier bank migration dataset does not include the Treasury Review Dataset required to establish authorised bank verification for 3,200 payment-active Suppliers from `LEGACY-EU`. The bank values are present, but the canonical verification obligation cannot be evidenced.

This tells us:

- what is wrong;
- where;
- for whom;
- why the Rule failed;
- what is not being claimed.

It avoids saying that all 3,200 bank accounts are incorrect.

They may be correct.

They are not sufficiently evidenced for the intended use.

That precision prevents unnecessary remediation.

---

# We connect the Finding to canonical objects

The Finding should reference the model, not only the report.

For our case:

```
Affected Entity:
Supplier

Affected Attribute:
Supplier Bank Verification

Affected Rule:
Payment-active Supplier requires verified bank account

Affected Dataset:
Supplier Bank Cutover RC4

Missing Dataset:
Treasury Review Dataset

Affected Mapping:
Treasury verification to canonical verification status

Target consequence:
Payment activation cannot be approved
without payment block or verified evidence
```

These references make the Finding useful for:

- trace;
- impact analysis;
- proposal generation;
- Workbench rendering;
- issue creation;
- later AMS investigation.

A free-text ticket cannot provide this reliably unless someone manually reconstructs the relationships.

---

# We separate severity from scale

A Finding affecting 3,200 records is not automatically more severe than one affecting 20 records.

Scale is one dimension.

Other factors include:

- business criticality;
- operational consequence;
- legal or financial exposure;
- cutover timing;
- availability of a safe fallback;
- concentration in critical organisational units;
- reversibility;
- evidence confidence.

For Supplier bank verification, even a small population can be critical if those Suppliers are scheduled for high-value payments.

We therefore record dimensions separately:

```
Affected records:
3,200

Business criticality:
High

Cutover consequence:
Payment activation blocked

Safe fallback:
Migrate with payment block

Reversibility:
Moderate

Evidence confidence:
High
```

We may calculate a priority later.

We should not hide the basis of that priority behind one unexplained score.

---

# We distinguish business impact from technical failure

The technical failure is:

```
No matching authorised verification record.
```

The business impact is:

```
The programme cannot demonstrate that the bank account
is approved for outgoing payment.
```

The migration consequence is:

```
Supplier may migrate only with payment block,
or must remain outside the payment-active population.
```

The delivery consequence is:

```
Treasury Review Dataset must be integrated
before cutover readiness can be approved.
```

These layers matter because different stakeholders need different explanations.

A developer needs the missing join path.

Treasury needs the unverified payment exposure.

The migration lead needs the cutover impact.

The data owner needs the affected population.

The Finding should preserve all four without forcing everyone to read the raw validation report.

---

# We attach a probable cause without pretending certainty

At the first investigation stage, we may believe that the Treasury file was omitted.

We should distinguish:

```
Confirmed cause
```

from:

```
Probable cause
```

A Finding might state:

```
Probable cause:
Treasury Review Dataset is absent from the readiness input.

Confidence:
High

Still to confirm:
Whether all 3,200 Suppliers have Treasury records
in the external review file.
```

This is better than asserting:

> Integrate the Treasury file and the problem is solved.

The file may itself be incomplete.

The Finding can evolve as new Evidence arrives.

---

# We make uncertainty visible

A high-quality Finding may include:

## Confirmed

- 3,200 payment-active Suppliers lack linked verification Evidence.
- All come from the `LEGACY-EU` migration population.
- The current dataset does not include the Treasury review source.

## Inferred

- Most failures may be resolved by importing the Treasury file.

## Unknown

- Whether every affected bank account has already been reviewed.
- Whether the Treasury file uses the same canonical Supplier identifier.
- Whether verification refers to the current account version.

This allows reviewers to make a decision without confusing inference with fact.

---

# We do not jump directly to a model patch

Not every Finding requires changing the canonical model.

For the 3,200-record dataset gap, the current model may already be correct.

It says that authorised verification Evidence is required.

The failure exists because the expected input is missing from the migration package.

The correct remediation may be:

- add the Treasury dataset to the pipeline;
- implement the approved Mapping;
- rerun validation.

No canonical policy change is needed.

For the 200 legacy-flag records, we may discover that the model never explicitly defined verification authority.

That is a model gap.

A PatchProposal may be appropriate:

```
Add Treasury Review Dataset as the authorised
verification source.

Classify the legacy Finance verified flag
as supporting evidence only.

Require payment block when authorised
verification is absent.
```

The Finding decides what kind of action is justified.

It prevents every validation failure from becoming an unnecessary model edit.

---

# We distinguish remediation types

A Finding should identify the likely remediation category.

## Source remediation

Correct or enrich the source data.

## Dataset remediation

Add a missing field, file or extraction scope.

## Mapping remediation

Correct transformation or source-to-target linkage.

## Model remediation

Add or change canonical Attributes, Rules, authority or relationships.

## Implementation remediation

Align code with the approved model.

## Evidence remediation

Produce, refresh or link the required proof.

## Governance decision

Resolve authority, scope, acceptable fallback or risk.

## Exception request

Permit a bounded deviation under controls.

For our main Finding:

```
Primary remediation:
Dataset remediation

Secondary remediation:
Mapping implementation

No policy change proposed.
```

This gives the delivery team a clear direction.

---

# We assign ownership by cause

The failed Rule may be owned by Treasury.

That does not mean Treasury owns every remediation task.

For the missing Treasury dataset:

## Business owner

Treasury Data Owner

Confirms what qualifies as authorised verification.

## Data owner

Treasury Review Dataset Owner

Confirms coverage and data semantics.

## Implementation owner

Migration Integration Team

Adds the dataset and join path.

## Migration owner

Supplier Migration Lead

Recalculates readiness and cutover scope.

One Finding can record these responsibilities without pretending that one assignee can solve the entire problem.

The implementation issue can then be assigned to the appropriate delivery owner.

---

# We define closure before creating the task

A Finding should not close when someone adds a comment saying “fixed.”

For the missing Treasury dataset, closure requires:

1. the Treasury Review Dataset is registered;
2. the Supplier join is defined;
3. the Mapping validates;
4. the candidate dataset is regenerated;
5. the bank-verification Rule is rerun;
6. unresolved records are classified;
7. payment-block treatment is confirmed;
8. new Evidence is linked.

The closure test is outcome-based:

```
The expected authorised verification path exists,
and every in-scope Supplier is either verified
or governed by an approved payment-block treatment.
```

This prevents a code change from being mistaken for a resolved business problem.

---

# We keep the Finding open across multiple executions

Mock Load 3 may reduce the affected population:

```
Original:
3,200 records

After Treasury dataset integration:
180 records
```

We should not create an unrelated new Finding automatically.

The same Finding can record its progression:

```
Observed in RC4:
3,200

After remediation attempt 1:
180

Remaining cause:
Treasury file contains no current-account match
for affected Suppliers.
```

The Finding’s core cause may have changed.

At that point, we can:

- update the Finding with new Evidence;
- split the remaining population into a new Finding if it now has a distinct cause;
- close the original dataset-gap Finding when the missing-input problem is resolved.

The lifecycle must preserve the reasoning.

---

# We split Findings when the remediation diverges

After importing the Treasury file, the remaining 180 records divide into:

- 140 bank accounts changed after verification;
- 40 Suppliers have no Treasury record.

These require different action.

We close the original Finding:

```
Treasury Review Dataset missing from migration path
```

Then create two derived Findings:

```
Verification is stale for 140 current bank accounts.
```

and:

```
No authorised verification Evidence exists
for 40 payment-active Suppliers.
```

The derived Findings reference the original validation and investigation history.

This creates a problem tree rather than an endless error list.

GitHub Issues supports hierarchical work through sub-issues and dependencies, and issue templates can standardise the information collected for recurring work types. We can use those delivery mechanisms after Martenweave has defined the semantic Finding and its required remediation.

---

# We prevent duplicate Findings

The same underlying problem may appear in:

- dataset readiness;
- mock-load validation;
- target rejection;
- reconciliation;
- an AMS incident.

Without deduplication, each execution creates another issue.

We can derive a stable Finding fingerprint from:

```
Rule
+
failure classification
+
affected source path
+
affected model object
+
scope
+
probable cause
```

New Evidence can then attach to the existing Finding.

We should still allow separate Findings when the business treatment differs.

Deduplication must reduce noise, not merge unrelated risks.

---

# We preserve record-level evidence without making the Finding enormous

A Finding should summarise the problem.

It should not embed thousands of record rows in the canonical Markdown file.

We can store:

- affected count;
- population definition;
- dataset fingerprint;
- external or generated record-list reference;
- sample records;
- aggregation by company code, Plant or source system.

For example:

```
Affected population:
3,200

Population definition:
payment-active LEGACY-EU Suppliers
with current bank account
and no authorised Treasury verification match

Evidence artifact:
bank-verification-failures-rc4.parquet

Top organisational concentration:
DE01: 1,820
DE02: 940
NL01: 440
```

The canonical Finding remains readable.

The detailed Evidence remains reproducible.

---

# We let validators produce structured results

The W3C SHACL validation model offers a useful precedent: validation reports can contain individual results with a focus node, result path, source constraint, message, detail and severity.

We do not need to use RDF or adopt SHACL directly.

We should preserve similar structure in Martenweave validation output:

```
subject
path
rule
validator
observed value
expected condition
severity
message
details
```

Structured results make reliable grouping possible.

If validators emit only free-text messages, Finding generation becomes fragile.

---

# We use AI for interpretation, not invention

AI can help us:

- summarise failure patterns;
- identify likely common causes;
- group similar records;
- retrieve relevant Mappings and Decisions;
- propose owners;
- draft a Finding;
- suggest remediation alternatives;
- prepare an implementation issue.

AI should not:

- fabricate a cause when Evidence is weak;
- change Rule scope to reduce failure count;
- label a source authoritative without a Decision;
- convert an unresolved failure into an approved exception;
- close a Finding because the score improved;
- modify canonical model files silently.

The AI output should remain a proposal:

```
Candidate classification:
Dataset gap

Supporting Evidence:
Treasury dataset absent from input manifest

Confidence:
High

Unresolved:
Coverage of external Treasury file

Suggested next action:
Register and profile the Treasury dataset
```

Human review establishes the accepted interpretation.

---

# We distinguish a Finding from an issue

A Finding and a GitHub or ITSM issue are related.

They are not the same object.

## Finding

Represents the governed understanding of a problem.

It contains:

- cause;
- affected model objects;
- Evidence;
- impact;
- remediation class;
- closure criteria.

## Issue

Coordinates delivery work.

It contains:

- assignee;
- status;
- milestone;
- task breakdown;
- implementation discussion.

A Finding may create:

- one issue;
- several issues;
- no issue when the result is accepted Evidence only.

An issue may also implement part of several Findings.

GitHub documents Issues as tools for tracking work, discussing specific problems, assigning status and breaking large work into smaller tasks.

We use GitHub for delivery.

We use Martenweave to preserve model meaning.

---

# We generate an agent-ready implementation issue

Once the Finding is approved, Martenweave can generate a precise issue.

```
Goal

Integrate authorised Treasury bank-verification evidence
into the Supplier migration readiness path.

Scope

- Register the Treasury Review Dataset.
- Map Treasury Supplier identifiers to canonical Supplier IDs.
- Match verification to the current bank-account fingerprint.
- Preserve payment block where verification is unavailable.
- Rerun Supplier bank readiness.

Acceptance criteria

- The Treasury Dataset is represented in the canonical model.
- All references validate.
- No Supplier is marked verified solely from the legacy flag.
- Every payment-active Supplier is either verified
  or covered by an approved payment-block treatment.
- New validation Evidence is linked to the Finding.

Validation command

martenweave validate --repo ./model
```

This issue is actionable because the Finding already established the cause and semantic outcome.

---

# We connect the Finding to impact

For the 3,200 affected Suppliers, impact analysis should reveal more than the record count.

The Finding may affect:

- Supplier Bank Verification Attribute;
- Treasury verification Mapping;
- payment-readiness Rule;
- payment-block Rule;
- cutover dataset;
- SAP Business Partner bank-data handoff;
- Treasury approval Evidence;
- Supplier migration scorecard.

The impact view should help us answer:

- Which cutover gate is blocked?
- Which Evidence becomes stale after remediation?
- Which teams must review the change?
- Which downstream reports currently treat the records as ready?
- Which accepted Exceptions overlap with the population?

This turns the Finding into a planning object without turning Martenweave into a general project-management platform.

---

# We distinguish Finding status from implementation status

An issue may be marked done because the Treasury dataset was added.

The Finding may remain open because 180 records still lack current verification.

We therefore keep separate states.

## Finding states

- observed;
- investigating;
- confirmed;
- remediation proposed;
- controlled;
- resolved;
- accepted risk;
- superseded.

## Delivery states

- backlog;
- in progress;
- review;
- done.

A completed task is Evidence of work.

It is not automatic proof that the underlying Finding is resolved.

---

# We close through revalidation

The strongest closure Evidence is a new execution against the accepted model.

For our case:

```
Original failure:
3,200

After integration:
180

After Treasury remediation:
0 unresolved

Controlled payment-block exceptions:
40

Final status:
Resolved for cutover baseline RC6
```

The Finding can close when:

- the required path exists;
- the Rule was rerun;
- remaining exceptions are explicitly governed;
- the result is tied to the current model and dataset baseline.

Closure should record:

- resolution summary;
- new Evidence;
- model commit;
- dataset fingerprint;
- approved remaining exceptions;
- date and reviewer.

---

# We reopen when the problem returns under a new baseline

After cutover, a new Supplier dataset is generated.

The same Treasury input is omitted.

The validator fails again.

Should we reopen the old Finding or create a new one?

We use scope and cause.

If the same pipeline defect returned, we may reopen or derive a recurrence linked to the original Finding.

If a different source system has the same symptom but another cause, we create a new Finding.

The history should reveal recurring failure patterns.

Repeated recurrence may indicate:

- weak pipeline controls;
- missing ownership;
- an incomplete canonical dependency;
- a check that runs too late.

---

# A conceptual Finding object

A focused Finding could look like:

```
---
id: FIND-SUPPLIER-BANK-VERIFICATION-DATASET-GAP
type: Finding
status: confirmed

title:
  Treasury verification dataset missing
  from Supplier bank readiness path

triggered_by:
  - VALRUN-SUPPLIER-BANK-RC4

classification:
  dataset_gap

affects:
  - RULE-SUPPLIER-BANK-VERIFICATION
  - ATTR-SUPPLIER-BANK-VERIFICATION
  - MAP-TREASURY-BANK-VERIFICATION
  - DATASET-SUPPLIER-BANK-CUTOVER

scope:
  source_system: LEGACY-EU
  migration_wave: WAVE-1
  affected_records: 3200

business_impact:
  Payment activation cannot be approved
  without verified evidence or payment block.

probable_cause:
  Treasury Review Dataset was omitted
  from the migration input package.

owner:
  ROLE-SUPPLIER-MIGRATION-LEAD

remediation_type:
  dataset_and_mapping

closure_criteria:
  - treasury_dataset_registered
  - current_account_match_implemented
  - verification_rule_rerun
  - unresolved_population_governed
---
```

This is a proposed product direction.

Our current repository describes dataset gaps, deterministic validation, lineage, impact analysis and PatchProposals, but our inspection did not establish a complete first-class Finding lifecycle matching the design above.

We should therefore describe Finding management as the next focused layer, not as finished functionality.

---

# The Workbench should show the problem, not only the count

A useful Finding page should answer:

## What happened?

The bank-verification Rule failed for 3,200 Suppliers.

## Why?

The authoritative Treasury dataset is missing from the migration path.

## What is affected?

Supplier payment readiness for the `LEGACY-EU` Wave 1 population.

## What do we know?

The bank accounts exist, but authorised verification Evidence is unavailable.

## What remains uncertain?

Coverage and key compatibility of the external Treasury file.

## What should change?

Register the dataset, implement the Mapping and rerun readiness.

## Who owns the decision?

Treasury defines verification authority; the migration team owns integration.

## How will we know it is resolved?

The Rule passes or remaining failures are covered by approved payment-block Exceptions.

This is more useful than a red badge saying:

```
3,200 errors
```

---

# The first product slice we should build

The next Martenweave capability should be **Validation Result to Finding Promotion**.

## Goal

Turn structured validation failures into deduplicated, model-aware and reviewable Findings.

## Initial scope

Support:

- validation-run reference;
- Rule and validator references;
- failure classification;
- affected model objects;
- population definition;
- affected count;
- business impact;
- cause and confidence;
- remediation type;
- owners;
- closure criteria;
- Evidence history;
- related issues and PatchProposals.

## Promotion workflow

1. run validation;
2. group results;
3. suggest Finding candidates;
4. review classification and cause;
5. confirm or reject the Finding;
6. calculate impact;
7. choose remediation path;
8. create PatchProposal or implementation issue;
9. rerun validation;
10. close with Evidence.

---

# Proposed commands

A future CLI might support:

```
martenweave findings suggest \
  --from ./reports/bank-validation.json \
  --repo ./model
```

```
martenweave findings show \
  FIND-SUPPLIER-BANK-VERIFICATION-DATASET-GAP \
  --repo ./model
```

```
martenweave findings impact \
  FIND-SUPPLIER-BANK-VERIFICATION-DATASET-GAP \
  --repo ./model
```

```
martenweave findings promote \
  FIND-SUPPLIER-BANK-VERIFICATION-DATASET-GAP \
  --to github-issue \
  --dry-run
```

```
martenweave findings verify-closure \
  FIND-SUPPLIER-BANK-VERIFICATION-DATASET-GAP \
  --evidence EVID-SUPPLIER-BANK-RC6
```

These commands are recommended product directions, not claims about the current published CLI.

---

# What we should not build

We should not turn Martenweave into:

- a generic defect-management platform;
- a replacement for GitHub Issues, Jira or ServiceNow;
- a high-volume record-remediation UI;
- a data-observability platform;
- an autonomous root-cause engine;
- a general workflow system.

The Finding exists to connect validation Evidence to canonical model change and delivery work.

That narrow boundary is enough to produce significant value.

---

# The business value

Validation reports usually create work for senior people.

Someone must:

- interpret the error;
- identify the real cause;
- find the right owner;
- determine business impact;
- decide whether the model should change;
- write a useful task;
- later verify closure.

That interpretation is repeated across mock loads and migration waves.

By making Findings explicit, we preserve the reasoning.

We reduce:

- thousands of duplicate tickets;
- false record-level remediation;
- repeated root-cause analysis;
- vague ownership;
- readiness scores disconnected from business impact;
- patches that treat symptoms rather than causes;
- closed tasks with unresolved data risk.

The value is not a prettier error report.

It is a shorter path from observed failure to governed resolution.

---

# Final perspective

We do not want Martenweave to stop at:

```
Rule failed for 3,400 records.
```

We want it to help the programme establish:

```
3,200 records failed because the authoritative
Treasury dataset is missing from the migration path.

200 records contain an unauthorised legacy status.

The first problem requires dataset and Mapping remediation.

The second requires Treasury review,
payment-block treatment or a governance decision.
```

That is the difference between errors and Findings.

The practical test is:

> Can we explain the shared cause, affected model path, business consequence, accountable owner and closure condition without asking someone to inspect thousands of rows manually?

When the answer is yes, validation creates controlled work.

When the answer is:

> The errors are attached to the ticket,

we have moved the report but not resolved the interpretation problem.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We are building Martenweave so that validation failures become reusable project knowledge rather than disposable error files.

Our operating model is:

```
Validators observe.

Findings explain.

Impact analysis shows consequences.

AI proposes remediation.

Humans approve model changes.

Delivery tools track implementation.

New Evidence proves closure.
```

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

## Sources and notes

This article was reviewed on 15 July 2026.

Martenweave Core currently describes a pipeline that turns datasets, validation reports, Decisions and SAP context into canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-approved PatchProposals.

The current documented workflow moves from Evidence and profiling through validation, gap detection, lineage and impact analysis to AI proposals and human-reviewed GitHub issues or pull requests.

The W3C SHACL Recommendation defines structured validation reports and results with concepts such as focus node, result path, source constraint, details, message and severity. Martenweave does not need to adopt RDF or SHACL, but this structure supports reliable conversion of raw validation output into grouped Findings.

GitHub documents Issues as a way to track work, discuss specific problems, classify tasks, use templates, establish dependencies and break larger work into sub-issues. In the design described here, GitHub remains the delivery system, while Martenweave preserves the model-aware Finding that gives the issue its meaning and acceptance criteria.

A dedicated Finding object, Finding deduplication, cause classification, validation-result promotion and the proposed commands are product directions. Our repository inspection did not confirm a complete current first-class Finding lifecycle matching this design. These capabilities should not be treated as released functionality until implemented and published.

Martenweave is independent and is not affiliated with or endorsed by SAP, W3C or GitHub.
