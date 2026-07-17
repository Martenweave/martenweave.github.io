# How We Prove That a Finding Is Actually Resolved

**Reviewed: 15 July 2026**

We identify a critical Supplier bank-data Finding.

Forty payment-active Suppliers have expired bank verification, but the expected payment block is not confirmed.

The programme creates a GitHub issue.

A developer updates the transformation.

The pull request is merged.

The issue is closed.

The project dashboard now shows:

```
Finding status:
Resolved
```

But what has actually been proven?

We know that code changed.

We may know that the delivery task is complete.

We do not yet know that:

- the correct 40 Suppliers were affected;
- payment blocks were generated for all of them;
- the blocks reached the target system;
- no other Suppliers were incorrectly blocked;
- the verification Rule was rerun;
- the new result used the current model and dataset baseline;
- Treasury reviewed the Evidence;
- the control remains effective in the cutover pipeline;
- the same problem will not return in the next migration wave.

This is the difference between task completion and Finding resolution.

> A Finding is resolved only when new Evidence demonstrates that the accepted business condition now holds for the intended scope.

A merged change is not enough.

A closed issue is not enough.

A validator that no longer reports an error may not be enough.

Even a successful mock load may not be enough if it used:

- the wrong dataset;
- an outdated Rule;
- a reduced population;
- an unapproved Exception;
- a different transformation path from the cutover process.

We therefore treat closure as an evidence-backed claim.

The claim is:

> The problem described by this Finding no longer exists within the declared baseline and scope, or the remaining deviation is governed explicitly.

Martenweave’s current architecture already provides the foundations for this approach. Canonical files own model truth, deterministic validation checks IDs, types, references and domain context, and the documented pipeline connects Evidence, gaps, lineage, impact analysis and human-reviewed proposals.

The missing product layer is a disciplined resolution contract.

---

# Closing work is not the same as proving an outcome

Delivery tools are designed to track work.

GitHub states that an issue may be closed when a bug is fixed, feedback is acted on, or simply to show that work is not planned. It also allows issues to be closed automatically through pull-request or commit keywords.

That behaviour is appropriate for delivery management.

It also proves why issue state cannot serve as the only source of Finding truth.

A closed issue may mean:

- the implementation was completed;
- the work was cancelled;
- the issue was duplicated;
- the scope moved elsewhere;
- the team decided not to proceed;
- a pull request used an automatic closing keyword.

Martenweave therefore imports delivery closure as Evidence about the work item.

It does not automatically interpret it as proof that the governed business problem disappeared.

The distinction is:

```
Issue closed:
delivery event

Finding resolved:
evidence-backed model assertion
```

---

# Our running case

The Finding is:

> Payment-active Suppliers with expired bank verification do not have the required payment block.

The accepted business condition is:

```
When bank verification is absent or expired,
the Supplier must not remain enabled
for outgoing payment.
```

The affected scope is:

```
40 Suppliers
Wave 1
Cutover RC4
Company codes DE01, NL01 and BE01
```

The implementation team changes the payment-block derivation.

Before we resolve the Finding, we need to prove several things.

## The change was implemented

The transformation or configuration now contains the intended logic.

## The correct population was processed

The 40 Suppliers were included in the regenerated dataset.

## The intended outcome was produced

Every in-scope Supplier received the required block.

## No unacceptable side effect was introduced

Verified Suppliers were not blocked incorrectly.

## The target state matches the generated state

The target system or load result contains the expected control.

## The governing Rule was rerun

The validation result now reflects the current model.

## Remaining deviations are explicit

Any unresolved records are linked to an approved Exception or remain open.

## The responsible owner accepted the Evidence

Treasury confirms that the control satisfies the business requirement.

Only then can we make a defensible resolution claim.

---

# We define closure criteria before implementation

A weak Finding says:

```
Fix payment-block logic.
```

This leaves closure open to interpretation.

The developer may reasonably consider the work complete when the code is merged.

The migration lead may expect a successful load.

Treasury may expect record-level proof.

We avoid this by defining closure criteria when the remediation is approved.

For our case:

```
Closure criteria:

1. All 40 affected Suppliers are included
   in the regenerated cutover dataset.

2. Every Supplier with expired verification
   has payment block active.

3. No Supplier with current authorised verification
   is blocked by this remediation.

4. The target reconciliation confirms the block.

5. The bank-verification Rule is rerun
   against the current cutover baseline.

6. Treasury approves the result.

7. No unresolved record remains outside
   an approved Exception.
```

These criteria define the outcome.

The implementation team can choose the technical method, but closure is judged against the governed result.

---

# We separate implementation Evidence from outcome Evidence

A pull request proves that files changed.

A test proves that a defined condition passed in a test environment.

A generated dataset proves that the transformation produced certain output.

A target reconciliation proves that the output reached the target.

A business-owner approval proves that the Evidence was accepted for the relevant decision.

These artefacts are complementary.

They are not interchangeable.

For the Supplier Finding, we may require:

## Implementation Evidence

- pull request;
- changed Mapping or code;
- deterministic model validation;
- unit or integration test.

## Dataset Evidence

- regenerated dataset fingerprint;
- affected-population count;
- payment-block derivation report;
- negative-control population.

## Target Evidence

- load result;
- target-field reconciliation;
- rejected-record report;
- target validation result.

## Governance Evidence

- Treasury approval;
- approved remaining Exceptions;
- current cutover-gate decision.

The resolution package connects these artefacts to one Finding.

---

# We test the positive population

The remediation targets 40 Suppliers.

We verify:

```
Expected affected population:
40

Payment block generated:
40

Payment block confirmed in target:
40
```

That proves the intended records received the control.

But this is only one side of the test.

A transformation can satisfy the positive population by applying the block too broadly.

We also need negative Evidence.

---

# We test the negative population

The change must not block Suppliers whose bank verification remains current and authorised.

We define a control population:

```
Verified payment-active Suppliers:
46,600

Unexpected new payment blocks:
0
```

This matters because a fix can remove one risk while creating another.

For example:

```
if verification_expiry_date is missing:
    apply payment block
```

may accidentally block records where a valid status exists but the expiry field is not used by that source.

A successful remediation must prove both:

```
Required blocks applied
```

and:

```
Unjustified blocks not introduced
```

A zero-error report against only the failed population cannot prove this.

---

# We prove population continuity

The original Finding affected 40 Suppliers in Cutover RC4.

The validation rerun may report zero failures because those Suppliers disappeared from RC5.

That could mean:

- they were intentionally removed from the wave;
- they were accidentally filtered out;
- the extraction scope changed;
- the Supplier IDs no longer matched;
- the issue was hidden rather than resolved.

We therefore reconcile populations.

Conceptually:

```
Original affected Suppliers:
40

Present in RC5:
40

Removed through approved scope decision:
0

Missing unexpectedly:
0
```

If records were removed deliberately, we require the Decision that changed their scope.

A disappearing error is not proof of corrected data.

It may be proof of disappearing records.

---

# We prove baseline compatibility

Resolution Evidence must identify:

- model commit;
- Rule version;
- Mapping version;
- dataset fingerprint;
- transformation version;
- target load or environment;
- active Exception set;
- execution date.

For example:

```
Finding:
FIND-BANK-VERIFY-NO-BLOCK

Model baseline:
abc123

Rule:
RULE-SUPPLIER-BANK-VERIFICATION v3

Dataset:
SUPPLIER-BANK-RC5

Transformation:
bank-migration build 2026.07.15.2

Target load:
CUTOVER-RC5-LOAD-04
```

Without these references, we may compare incompatible states.

The original Finding might have been created under Rule version 3.

The closure report might use Rule version 2, which accepted the legacy verification flag.

The report would appear green because the standard was weakened.

That is not resolution.

---

# We detect changed Rules during remediation

Suppose the Finding originally failed because Treasury verification was mandatory.

During remediation, someone changes the Rule:

```
Before:
Current Treasury verification required.

After:
Legacy VERIFIED flag accepted.
```

The validation now passes.

The Finding has not necessarily been resolved.

The accepted obligation changed.

That may be legitimate, but it requires:

- a Decision;
- source-authority review;
- impact analysis;
- Treasury approval;
- refreshed Evidence.

Martenweave should report:

```
Validation now passes.

Material Rule change detected.

Resolution cannot be inferred automatically.
Business Decision required.
```

This protects the programme from improving readiness by lowering the standard silently.

---

# We detect changed scope during remediation

The same principle applies to scope.

Original Rule:

```
Applies to all payment-active Suppliers.
```

Revised validator:

```
Applies only to Suppliers with scheduled payments
in the first post-go-live week.
```

The failed population shrinks.

That may be a valid cutover prioritization.

It does not resolve the original Finding for the excluded population.

We can split the state:

```
Immediate-payment population:
resolved

Remaining payment-active population:
controlled or open
```

Scope changes should create explicit Decisions or scoped Findings.

They should not erase the earlier obligation.

---

# We distinguish resolved from controlled

Some Findings cannot be eliminated before cutover.

The programme may apply a safe compensating control.

For the Supplier case:

```
Current verification:
not available

Payment block:
confirmed

Operational treatment:
Supplier cannot receive payment
until verification is renewed
```

The underlying verification gap remains.

The immediate payment risk is controlled.

The correct status is:

```
controlled
```

not:

```
resolved
```

We use the states differently.

## Resolved

The original required condition now holds.

## Controlled

The condition does not fully hold, but an approved compensating control reduces the business exposure within a defined scope and period.

## Accepted risk

The deviation remains, and an authorised owner accepts the residual consequence.

## Out of scope

An approved Decision removed the affected population from the governed scope.

## Superseded

A later Finding or Decision replaced the original interpretation.

These states prevent “closed” from becoming the only outcome.

---

# We distinguish resolved from no longer reproducible

A validator may no longer reproduce the failure because:

- the data changed;
- the validator changed;
- the environment changed;
- the issue is intermittent;
- the population is absent;
- an input source is temporarily unavailable.

“No longer reproduced” is Evidence.

It is not always resolution.

We ask:

> Can we explain why the failure disappeared?

For our case:

```
Failure disappeared because:
payment-block logic was corrected,
dataset was regenerated,
target load was reconciled,
and the Rule passed for the same population.
```

That is strong.

This is weaker:

```
Failure did not appear in the latest report.
```

The difference is causal traceability.

---

# We require evidence lineage

Every closure artefact should have provenance.

W3C PROV-O provides a general framework for representing provenance information created in different systems and contexts, including entities, activities, agents, generation, derivation and attribution.

Martenweave does not need to implement the full ontology.

We apply the same discipline.

For a closure report, we record:

```
Evidence entity:
Target payment-block reconciliation

Generated by:
Cutover RC5 validation activity

Used:
SUPPLIER-BANK-RC5 dataset
Martenweave model commit abc123
Target load CUTOVER-RC5-LOAD-04

Attributed to:
Migration Validation Team
```

This lets a reviewer answer:

- where the result came from;
- which baseline it used;
- who produced it;
- whether it remains current.

A screenshot without provenance is weak closure Evidence.

---

# We assess whether the control operates as intended

NIST SP 800-53A provides a methodology and procedures for assessing controls, with assessment activities performed at different system-lifecycle phases and tailored to organisational risk-management needs. It also emphasizes assessment planning and analysis of results.

Our migration use case is not a cybersecurity-control assessment.

The underlying principle is still useful:

> We need evidence that a control is implemented and operating as intended, not only evidence that its implementation artefact exists.

For the Supplier case:

- code presence shows implementation;
- generated block values show execution;
- target reconciliation shows deployment;
- rerun validation shows expected operation;
- Treasury review shows accepted business sufficiency.

Together, these provide assurance.

---

# We define an evidence window

Closure Evidence has a time boundary.

A payment-block reconciliation from Mock Load 3 may not prove the Cutover RC5 state.

The model or dataset may have changed.

We define:

```
Evidence valid for:
Cutover RC5 baseline

Evidence generated:
15 July 2026

Invalidated when:
- Rule changes materially;
- Mapping changes;
- affected population changes;
- target load is replaced;
- payment-block configuration changes.
```

This prevents historical green reports from being reused indefinitely.

---

# We mark closure Evidence as stale when dependencies change

After the Finding is resolved, a new Mapping release changes bank-verification logic.

The original closure package may no longer prove the current state.

We do not reopen the Finding automatically in every case.

We mark:

```
Closure Evidence:
stale

Reason:
Material Mapping change after resolution

Required action:
revalidate affected path
```

The next article in this series will address stale Evidence directly.

For resolution design, the key point is that closure is not an eternal Boolean.

It is a claim supported by Evidence under known conditions.

---

# We use closure confidence carefully

Not all resolution packages are equally strong.

We can describe Evidence quality transparently.

## Strong

- same population reconciled;
- current Rule and Mapping;
- target state confirmed;
- negative controls tested;
- business owner approved.

## Moderate

- regenerated data validated;
- target confirmation incomplete;
- no material scope change detected.

## Weak

- issue closed;
- implementation changed;
- no current record-level revalidation.

We should not hide this in an unexplained score.

A Finding may remain:

```
resolution proposed
```

until the required Evidence reaches the accepted level.

---

# We do not allow self-certification for critical Findings

The implementation owner should not be the only closure approver for a critical business-control Finding.

They can provide implementation Evidence.

An independent role should verify the result.

For our case:

```
Implementation owner:
Cutover Transformation Team

Evidence provider:
Migration Validation Team

Closure approver:
Treasury Data Owner
```

This separation reduces confirmation bias and protects the business owner’s authority.

It does not require a complex workflow engine.

It requires typed responsibilities and a closure contract.

---

# We preserve failed remediation attempts

Suppose the first fix reduces the failed population from 40 to 7.

The attempt was useful.

The Finding is not resolved.

We record:

```
Remediation attempt 1:
payment-block derivation updated

Result:
33 resolved
7 still uncontrolled

Finding status:
remediating
```

The failed attempt remains Evidence.

It tells future teams:

- which approach was tried;
- what it fixed;
- what remained;
- whether the root cause was fully understood.

We do not overwrite the history with the final successful change.

---

# We split the remaining population when its cause changes

The remaining seven Suppliers may fail for a different reason.

For example:

- the general payment-block Mapping now works;
- seven Suppliers use a local company-code configuration that overrides the block.

The original implementation Finding may be resolved for the common path.

A new child Finding is justified:

> Local company-code override prevents payment block for seven Suppliers.

This avoids keeping one Finding open indefinitely after its root cause is fixed.

The split should be evidence-based.

The new Finding references the original investigation and validation history.

---

# We verify the business outcome, not only the field value

The payment-block field may be populated correctly.

The target process may ignore it because:

- another flag overrides it;
- the Supplier is active in another company code;
- payment proposals use a different control path;
- the field is not distributed to the payment system;
- the target configuration interprets it differently.

Field reconciliation is necessary.

It may not be sufficient.

For critical controls, we test the operational path.

For example:

```
Supplier:
1000456

Bank verification:
expired

Payment block:
active

Payment proposal test:
Supplier excluded

Result:
control operates as intended
```

This is much stronger than confirming that one column contains `X`.

---

# We choose proportionate closure Evidence

Not every Finding needs an end-to-end business-process test.

A missing description may close through:

- corrected data;
- schema validation;
- targeted record check.

A critical payment-control Finding may require:

- model validation;
- dataset reconciliation;
- target confirmation;
- process-level test;
- business-owner approval.

The Evidence burden should reflect:

- business impact;
- reversibility;
- control criticality;
- affected scope;
- uncertainty.

We avoid both extremes:

- closing critical Findings with weak proof;
- imposing expensive end-to-end testing on minor documentation defects.

---

# We use sample-based Evidence carefully

For 50,000 records, exhaustive business review may be impractical.

We can combine:

- deterministic full-population checks;
- targeted high-risk sampling;
- negative controls;
- aggregate reconciliation;
- owner review.

For our 40-record critical population, full reconciliation is reasonable.

For a much larger low-risk population, sampling may be acceptable if the Rule and owner allow it.

The closure package must state:

```
Population tested:
full or sampled

Sampling method:
declared

Coverage:
declared

Residual uncertainty:
declared
```

We do not present sampled Evidence as full-population proof.

---

# We close at the right scope

A Finding may affect three company codes.

The remediation may resolve two.

We should not close the root Finding globally.

We can record:

```
DE01:
resolved

NL01:
resolved

BE01:
open
```

Possible root status:

```
partially resolved
```

or:

```
active with scoped occurrences
```

This is especially important across migration waves.

Wave 1 resolution does not automatically prove Wave 2 readiness.

The accepted Rule may be global.

The closure Evidence is usually scoped.

---

# We distinguish local resolution from systemic prevention

The 40 Suppliers are corrected.

The Finding is resolved for Cutover RC5.

But the rollout template still allows future waves to omit the payment-block control.

We have two questions:

1. Is the immediate Finding resolved?
2. Has recurrence been prevented?

The answers may be:

```
Immediate Finding:
resolved

Systemic prevention:
not implemented
```

This may justify a separate improvement Finding or model proposal.

We should not keep the urgent Finding open forever merely because the architecture can be improved.

We should also not claim that the root problem is permanently eliminated when only one occurrence was fixed.

---

# We define closure as a structured object

A conceptual Resolution record could contain:

```
---
id: RES-FIND-BANK-VERIFY-NO-BLOCK-RC5
type: Resolution

finding:
  FIND-BANK-VERIFY-NO-BLOCK

scope:
  migration_wave: WAVE-1
  baseline: CUTOVER-RC5
  company_codes:
    - DE01
    - NL01
    - BE01

claim:
  All in-scope Suppliers with expired verification
  have confirmed payment block.

implementation_evidence:
  - PR-PAYMENT-BLOCK-FIX
  - TEST-PAYMENT-BLOCK-DERIVATION

dataset_evidence:
  - EVID-RC5-AFFECTED-POPULATION
  - EVID-RC5-NEGATIVE-CONTROL

target_evidence:
  - EVID-RC5-TARGET-RECONCILIATION
  - EVID-RC5-PAYMENT-PROPOSAL-TEST

validation_evidence:
  - VALRUN-BANK-VERIFY-RC5

closure_approver:
  ROLE-TREASURY-DATA-OWNER

status:
  approved
---
```

This is a product direction.

It is not a claim about the exact current Martenweave schema.

The important part is that resolution becomes:

- explicit;
- scoped;
- evidence-backed;
- reviewable;
- invalidatable when dependencies change.

---

# We validate the resolution package

Deterministic checks can confirm:

- every required closure criterion has linked Evidence;
- the Evidence belongs to the current baseline;
- the affected population is reconciled;
- the Rule and Mapping versions match;
- no unresolved occurrence remains in the claimed scope;
- active Exceptions are disclosed;
- the closure approver has the required role;
- the Finding and Resolution references are valid.

Potential diagnostics:

```
MW-RES-001
Resolution has no current validation Evidence.

MW-RES-002
Closure Evidence uses a superseded Rule version.

MW-RES-003
Affected population was not reconciled.

MW-RES-004
Resolution claims global closure,
but an open scoped occurrence remains.

MW-RES-005
Delivery issue is closed,
but closure criteria are incomplete.

MW-RES-006
Resolution has no authorised approver.

MW-RES-007
Negative-control Evidence is required
but missing.

MW-RES-008
Closure Evidence became stale
after a material Mapping change.
```

These checks do not decide whether the business owner should approve closure.

They prevent incomplete closure packages from appearing complete.

---

# We separate proposed resolution from approved resolution

An AI agent can assemble a candidate closure package.

It may state:

```
All technical criteria appear complete.

Suggested status:
ready for closure review
```

The agent can:

- collect the relevant Evidence;
- compare populations;
- detect baseline mismatches;
- summarize test results;
- identify missing artefacts;
- draft the resolution claim.

It cannot approve the business outcome.

The states should be:

```
resolution candidate
→ validator checked
→ owner review
→ approved resolution
```

This follows Martenweave’s existing principle: agents propose, validators verify, humans approve and Git records.

---

# We do not let AI infer closure from silence

A common automation mistake is:

```
No new validation error
→ close Finding
```

That rule is unsafe.

No error may mean:

- the validator did not run;
- the dataset was empty;
- the population changed;
- the Rule was disabled;
- the report was incomplete;
- the failure was filtered;
- the environment was unavailable.

The system must distinguish:

```
zero failures
```

from:

```
no valid execution evidence
```

A valid closure run should prove:

- validator executed;
- expected population was evaluated;
- Rule was active;
- result was complete;
- baseline was current.

---

# We use explicit non-execution states

A validation run may be:

- completed;
- failed technically;
- skipped;
- incomplete;
- no applicable records;
- blocked by missing input.

These outcomes must not all appear as zero Findings.

For example:

```
Validation status:
blocked

Reason:
Treasury dataset unavailable

Failed records:
not calculated
```

This is not a passing result.

It is an Evidence gap.

---

# We link closure to readiness without hiding the details

When the Finding is approved as resolved, readiness can update.

Before:

```
Supplier Bank Readiness:
Blocked

Critical uncontrolled Findings:
1
```

After:

```
Supplier Bank Readiness:
Ready for Cutover RC5

Resolved critical Findings:
1

Remaining controlled Exceptions:
0
```

The readiness view should retain access to:

- resolution claim;
- Evidence package;
- approver;
- baseline;
- invalidation conditions.

A green badge without this trace is weak governance.

---

# We reopen only with new Evidence

After resolution, Cutover RC6 reports five Suppliers without payment block.

We should not simply change:

```
resolved
```

to:

```
open
```

without context.

We create a new occurrence and classify it:

- recurrence;
- regression;
- new scope;
- false positive;
- changed Rule.

The prior Resolution remains valid for RC5.

The new Evidence establishes that the claim does not hold for RC6.

The history becomes:

```
RC5:
resolved

RC6:
regression detected

Cause:
older transformation configuration deployed
```

This preserves both truths.

---

# We keep resolution and prevention separate

The immediate Finding may close when the affected population is safe.

A prevention proposal may remain open:

> Add payment-block validation as a mandatory control in every Supplier bank migration wave.

This avoids two poor choices:

- keeping the operational Finding open until a broad architecture improvement is finished;
- closing everything and losing the systemic lesson.

We can link:

```
Resolved Finding:
FIND-BANK-VERIFY-NO-BLOCK

Prevention proposal:
PROP-MANDATORY-BANK-CONTROL-DOMAIN-PACK
```

The first proves the current population is safe.

The second reduces recurrence risk.

---

# The Workbench view we need

A Finding page should not show only:

```
Status:
Resolved
```

It should show:

## Resolution claim

All in-scope Suppliers with expired verification have confirmed payment block.

## Scope

Wave 1, Cutover RC5, three company codes, 40 Suppliers.

## Implementation Evidence

The approved change and its tests.

## Population reconciliation

Original, processed, resolved, excluded and remaining counts.

## Target Evidence

The target block and process-level confirmation.

## Negative controls

No current verified Supplier was blocked incorrectly.

## Validation Evidence

The current Rule execution and baseline.

## Remaining Exceptions

None, or clearly listed.

## Closure approver

Treasury Data Owner.

## Invalidation conditions

Rule, Mapping, dataset or target-control changes.

This makes resolution inspectable.

---

# The first product slice we should build

The next focused Martenweave capability should be **Evidence-Backed Finding Resolution**.

## Goal

Prevent Findings from being marked resolved solely because a task closed or an implementation changed.

## Initial inputs

- Finding;
- closure criteria;
- original affected population;
- implementation Evidence;
- current dataset;
- validation result;
- target reconciliation;
- active Exceptions;
- closure approver.

## Initial outputs

- candidate Resolution;
- missing-Evidence report;
- population reconciliation;
- baseline-compatibility result;
- closure-readiness status;
- invalidation conditions;
- approved Resolution record.

## Supported closure outcomes

- resolved;
- controlled;
- accepted risk;
- partially resolved;
- out of scope by Decision;
- superseded;
- not ready for closure.

---

# Proposed commands

A future CLI could support:

```
martenweave findings closure-check \
  FIND-BANK-VERIFY-NO-BLOCK \
  --repo ./model
```

```
martenweave findings propose-resolution \
  FIND-BANK-VERIFY-NO-BLOCK \
  --evidence-dir ./reports/rc5 \
  --repo ./model
```

```
martenweave findings reconcile-population \
  FIND-BANK-VERIFY-NO-BLOCK \
  --current-dataset ./data/supplier-bank-rc5.csv \
  --repo ./model
```

```
martenweave findings validate-resolution \
  RES-FIND-BANK-VERIFY-NO-BLOCK-RC5 \
  --repo ./model
```

```
martenweave findings approve-resolution \
  RES-FIND-BANK-VERIFY-NO-BLOCK-RC5 \
  --dry-run \
  --repo ./model
```

These commands describe a recommended product direction.

They are not part of the currently documented CLI contract.

Martenweave’s existing canonical-file, deterministic-validation, dataset-readiness, impact and proposal-first architecture provides the necessary foundation.

---

# Acceptance criteria

We should consider the capability useful when it can prevent closure in each of these cases:

1. The GitHub issue is closed, but no new validation ran.
2. The validator ran against an outdated Rule.
3. The failed records disappeared from the dataset without an approved scope change.
4. The positive population passed, but verified records were blocked incorrectly.
5. The generated dataset is correct, but the target reconciliation is missing.
6. A technical task completed, but Treasury did not approve the Evidence.
7. Seven records remain outside an approved Exception.
8. The Finding is resolved in one company code but open in another.
9. The immediate population is safe, but recurrence-prevention work remains separate.
10. A later baseline invalidates the closure Evidence.

The system should also allow legitimate closure when the Evidence is complete.

Governance must prevent false resolution without making closure impossible.

---

# What we should not build

We should not turn Martenweave into:

- a test-execution platform;
- a deployment system;
- a generic quality-management suite;
- an audit-management platform;
- a sign-off workflow engine;
- a replacement for GitHub or ITSM.

Existing tools can execute transformations, tests and delivery workflows.

Martenweave should preserve:

- what had to become true;
- which Evidence proves it;
- which scope was resolved;
- who approved the claim;
- what changes would invalidate it.

That is the model-governance value.

---

# The economic value

False closure creates expensive downstream work.

It leads to:

- Findings rediscovered in later mock loads;
- cutover gates based on incomplete Evidence;
- tasks reported as complete while business controls remain ineffective;
- repeated root-cause investigations;
- untraceable changes in readiness percentages;
- disputes over whether a problem was ever fixed;
- AMS incidents caused by “resolved” migration defects.

Evidence-backed resolution changes the incentive.

Teams no longer optimize only for:

```
issue closed
```

They optimize for:

```
business condition demonstrated
```

This does not remove delivery pressure.

It makes completion meaningful.

---

# Final perspective

A Finding is not resolved because:

- a developer changed code;
- a pull request merged;
- an issue closed;
- an error count fell;
- a dashboard turned green.

Those events may contribute Evidence.

Resolution requires a stronger chain:

```
Accepted closure criteria
→ approved implementation
→ current population processed
→ target outcome confirmed
→ negative controls checked
→ governing Rule rerun
→ remaining deviations governed
→ authorised closure approval
```

For our Supplier bank-verification case, the practical question is:

> Can we demonstrate that every in-scope Supplier with expired verification is prevented from payment, using current Evidence tied to the current model, dataset and target baseline?

When the answer is yes, the Finding can be resolved for that scope.

When the answer is:

> The issue was closed by the pull request,

we know that delivery work ended.

We do not yet know that the business problem did.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We are building Martenweave so that “resolved” becomes an evidence-backed model statement rather than a project-status label.

Our operating model is:

```
Delivery changes the system.

Validators test the current state.

Evidence proves the outcome.

Owners approve the closure claim.

Martenweave preserves the trace.

Later changes can invalidate the Evidence,
but they cannot erase the history.
```

Martenweave is maintained by Dzmitryi Kharlanau.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

## Sources and notes

This article was reviewed on 15 July 2026.

Martenweave Core currently defines canonical files as the source of truth, generated indexes as disposable, deterministic validation as mandatory before indexing and AI-generated changes as human-reviewed proposals.

Its documented workflow moves from Evidence and profiling through validation, gaps and impact analysis to proposals and human-reviewed GitHub issues or pull requests.

GitHub documents issue closure as a delivery action that may indicate a bug was fixed, feedback was addressed or work is not planned. It also supports automatic closure through linked pull requests and commit messages. This supports the distinction made in this article: closed delivery work is useful Evidence, but it is not automatically proof that a model Finding is resolved.

NIST SP 800-53A Rev. 5 provides a methodology and procedures for assessing controls during different phases of a system lifecycle and includes guidance on assessment planning and analysis of results. Martenweave does not implement the NIST security-control framework, but the general principle of assessing whether a control operates as intended supports evidence-backed Finding closure.

W3C PROV-O provides classes and relationships for representing provenance information generated in different systems and contexts, including entities, activities, agents, generation, derivation and attribution. Martenweave does not need to adopt PROV-O directly, but provenance relationships are necessary for explaining which model, dataset, execution and responsible party produced closure Evidence.

Resolution objects, population reconciliation, closure diagnostics, Evidence invalidation and the proposed commands are product directions. They should not be interpreted as guarantees of the exact current Martenweave schema, Workbench behaviour or CLI until implemented and released.

Martenweave is independent and is not affiliated with or endorsed by SAP, NIST, W3C or GitHub.
