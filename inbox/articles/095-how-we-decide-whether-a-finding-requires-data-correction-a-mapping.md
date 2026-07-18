# How We Decide Whether a Finding Requires Data Correction, a Mapping Change or a Model Change

**Reviewed: 15 July 2026**

A Supplier bank-data validation fails for 3,400 records.

The canonical Rule states:

> A payment-active Supplier must have current, authorised verification evidence for the bank account used for payment.

The first reaction is predictable:

> Correct the failed records.

That may be the wrong action.

The records may not be incorrect.

The source data may be complete, but the migration dataset may have omitted the Treasury verification file.

The verification data may be present, but the Mapping may join it through an obsolete Supplier identifier.

The Mapping may work exactly as designed, but the canonical model may incorrectly treat a legacy verification flag as authoritative.

The Rule itself may be applied to Suppliers that are not intended for payment activation.

All of these situations can produce a similar validation output:

```
Bank verification requirement failed.
```

They represent different problems.

They require different owners.

They produce different changes.

The critical question is therefore not:

> How do we fix the failed records?

It is:

> At which layer is the accepted model no longer reflected correctly?

We separate three main remediation levels:

```
Data correction:
The accepted model is correct.
The implementation is correct.
The record does not satisfy the model.

Mapping change:
The accepted model is correct.
The required source evidence exists.
The transformation does not represent the model correctly.

Model change:
The current canonical interpretation is incomplete,
incorrect or no longer accepted.
```

Choosing the wrong level creates expensive rework.

A data team may manually correct thousands of records when one Mapping change would resolve the population.

A developer may change transformation logic when the actual problem is an unresolved business-policy decision.

A governance team may weaken the canonical Rule because the source extract is incomplete.

Our job is to prevent those category errors.

Martenweave already provides the foundations for this separation. Its current architecture treats canonical model files as the source of truth, validates model objects deterministically, detects dataset gaps, supports lineage and impact analysis, and uses human-reviewed PatchProposals for controlled change.

The product should help us trace a Finding back through the model before deciding what to edit.

---

# One Finding, three possible causes

We begin with one confirmed Finding:

> The Supplier bank migration dataset cannot establish authorised bank verification for 3,400 payment-active Suppliers.

The affected records all fail the same business Rule.

That does not prove that they share the same remediation.

To decide what must change, we inspect the complete path:

```
Business policy
→ canonical Rule
→ required Attributes
→ source authority
→ source Dataset
→ Mapping
→ transformed value
→ validation result
→ operational consequence
```

A defect can appear at any point.

For the Supplier case, the expected path is:

```
Treasury Review Dataset
→ Supplier identity match
→ current bank-account match
→ authorised verification evidence
→ canonical Bank Verification Attribute
→ payment-readiness Rule
```

We compare this expected path with what actually happened.

That comparison gives us the remediation level.

---

# We start by confirming the accepted model

Before correcting anything, we ask whether the current canonical model represents an approved business interpretation.

For the Supplier case, we verify:

- payment-active Suppliers require bank verification;
- Treasury is the accepted verification authority;
- verification must refer to the current bank account;
- an unverified Supplier may migrate only with payment block;
- the Rule applies to the current migration wave.

If these statements are unclear or disputed, we cannot diagnose the failure only as a technical problem.

Suppose the model says:

```
Legacy Finance verified flag
is the authoritative verification source.
```

Treasury now states:

> The legacy flag was an operational indicator and did not represent Treasury approval.

The validator may be executing the model correctly.

The Mapping may be implementing the model correctly.

The model itself contains the wrong authority assumption.

Correcting records against that assumption would reinforce the defect.

We therefore begin with the model, not the error rows.

---

# The first test: is the expected business meaning still accepted?

We ask:

1. Is the Rule still valid?
2. Is its scope correct?
3. Is the source authority approved?
4. Is the required Entity grain correct?
5. Are the failure consequences still accepted?
6. Has a later Decision superseded the model?

When the answer is no or unknown, we have a candidate model problem.

When the answer is yes, we continue down the path.

This order protects us from treating a disputed policy as a data-cleansing specification.

---

# When the Finding requires data correction

A Finding requires data correction when:

- the canonical model is accepted;
- the Mapping represents it correctly;
- the validator is correctly scoped;
- the relevant source data is present;
- specific records contain missing, invalid or contradictory values.

In our Supplier case, imagine that the Treasury Review Dataset is integrated correctly.

The join uses the approved canonical Supplier identifier.

The verification records are linked to bank-account fingerprints.

For 3,250 Suppliers, the path works.

For 150 Suppliers, the Treasury record refers to an older IBAN.

The bank account changed after verification.

The model says:

> Verification must apply to the current bank account.

The Mapping correctly compares the fingerprints.

The validator correctly rejects the mismatch.

The records do not satisfy the accepted business obligation.

This is a data remediation problem.

The appropriate action may be:

- obtain new Treasury verification;
- correct an incorrect bank account;
- keep the Supplier payment-blocked;
- remove the Supplier from the payment-active cutover scope.

We do not need to change the Mapping merely because records failed it.

We do not need to weaken the Rule to improve the readiness score.

The validation has identified exactly the condition it was intended to detect.

---

# Evidence that points to data correction

We classify the Finding as data correction when we can demonstrate:

```
Accepted model:
current and approved

Source authority:
available and correct

Mapping:
consistent with the model

Validator:
correctly scoped and reproducible

Failed records:
contain values that do not meet the obligation
```

For one failed Supplier, the evidence may show:

```
Current IBAN fingerprint:
A91F...

Verification IBAN fingerprint:
D22C...

Verification date:
before the current bank-account change

Result:
verification is stale
```

No transformation change can make this record genuinely verified.

A technical workaround could copy the old status.

That would suppress the failure without satisfying the policy.

The correct response is to remediate the underlying record or preserve the required operational control.

---

# Data correction should not alter canonical meaning

When we classify the problem as a data defect, the canonical model remains unchanged.

We may create:

- a remediation dataset;
- an owner assignment;
- a correction task;
- a controlled Exception;
- new validation Evidence.

The model should record that the Finding concerns actual record compliance, not the definition of the expected state.

Conceptually:

```
Finding classification:
data_defect

Canonical model change:
none

Required action:
refresh Treasury verification
for current bank account

Closure:
new verification evidence
and successful revalidation
```

This prevents every data-cleaning cycle from creating unnecessary model churn.

---

# When the Finding requires a Mapping change

A Finding requires a Mapping change when:

- the canonical business meaning is accepted;
- the necessary source data exists;
- the current transformation does not represent the accepted model correctly.

Return to the same Supplier population.

The Treasury Review Dataset contains current verification records for the 3,400 Suppliers.

The migration pipeline joins it using the legacy Supplier number.

After a company consolidation, many Treasury records use the canonical Supplier identifier instead.

The data exists.

The policy is clear.

The current Mapping fails to connect the correct records.

The expected path is:

```
Treasury Supplier ID
→ canonical Supplier ID
→ current bank account
→ verification evidence
```

The implemented path is:

```
Treasury Supplier ID
→ legacy local Supplier number
→ incomplete match
```

This is not primarily a record-correction problem.

Manually updating 3,400 verification statuses would duplicate the transformation logic and destroy provenance.

The correct change is to repair the Mapping.

---

# Evidence that points to a Mapping change

We classify the Finding as a Mapping defect when:

```
The required source value exists.

The source is approved.

The canonical target meaning is clear.

The current transformation omits, misuses
or incorrectly combines the available inputs.
```

Typical signals include:

- source values exist but do not reach the target Attribute;
- the wrong join key is used;
- context such as company code or Plant is omitted;
- precedence logic contradicts the accepted Decision;
- a fallback executes before an authoritative source is checked;
- implementation differs from the canonical Mapping;
- the correct source endpoint is registered but not connected.

For the Supplier case, we may compare populations:

```
Treasury records available:
3,400

Matched through current Mapping:
120

Matched through canonical Supplier ID:
3,350

Remaining without current verification:
50
```

The comparison shows that most failures are produced by the transformation path rather than by missing verification.

The Mapping should change.

The remaining 50 records may later become a separate data-correction Finding.

One initial error population can therefore split into multiple remediation levels after investigation.

---

# A Mapping change must preserve the business Rule

A dangerous response would be to modify the validator so that the unmatched records pass.

For example:

```
When Treasury verification is not found,
accept the legacy VERIFIED flag.
```

That may improve coverage.

It changes source authority.

It is not merely a Mapping repair.

Unless Treasury has approved the legacy flag, this workaround introduces an unapproved model change through transformation code.

A genuine Mapping correction preserves the accepted meaning:

```
Before:
join Treasury evidence through obsolete local key

After:
join Treasury evidence through canonical Supplier identity
and current bank-account fingerprint
```

The source authority, policy and target Attribute remain unchanged.

Only the implementation path changes.

---

# We validate the Mapping change as a candidate state

A Mapping change should not be applied directly because it appears to resolve more records.

We create a candidate proposal.

The proposal should state:

- which Mapping changes;
- why the current implementation is wrong;
- which source inputs are used;
- which records are affected;
- which previous Evidence becomes stale;
- which Rule results are expected to change;
- what remains unresolved.

Conceptually:

```
PatchProposal:
Replace legacy Supplier-number join
with canonical Supplier identity mapping.

Affected Finding:
FIND-SUPPLIER-BANK-VERIFICATION

Expected effect:
resolve verification linkage
for approximately 3,350 Suppliers.

Unresolved:
50 Suppliers may still lack current verification.
```

The candidate model is then validated and its impact calculated before human approval.

This is aligned with Martenweave’s documented proposal-first workflow: Evidence leads into validation, gaps, impact analysis and human-reviewed Git work rather than silent mutation.

---

# When the Finding requires a model change

A Finding requires a model change when the canonical representation of accepted truth is itself incomplete, incorrect or outdated.

In the Supplier case, assume the model currently says:

```
Supplier Bank Verification
is a Supplier-level Attribute.
```

The investigation reveals that one Supplier may have several bank accounts.

Treasury verifies a specific account, not the Supplier in general.

A Supplier-level verified flag allows this sequence:

1. Bank account A is verified.
2. The Supplier receives status `VERIFIED`.
3. Bank account B replaces account A.
4. The Supplier-level status remains `VERIFIED`.
5. The new account passes the migration validator.

The Mapping may correctly populate the canonical Attribute.

The validator may correctly test the Attribute.

The underlying model is wrong because verification belongs to the bank-account relationship, not to the Supplier as a whole.

This requires a model change.

---

# Model changes alter the meaning of the governed path

A model change can affect:

- Entity grain;
- Attribute meaning;
- source authority;
- required context;
- Rule applicability;
- fallback policy;
- evidence requirements;
- ownership;
- lifecycle.

For our case, the change may be:

```
Before:
Supplier has Bank Verification Status.

After:
Supplier Bank Account has Verification Evidence.

Verification applies to:
a specific account fingerprint
and a defined validity period.
```

This is larger than editing a join.

It changes what the organisation means by a verified bank account.

It may invalidate:

- existing Mappings;
- previous validation results;
- source extracts;
- cutover readiness;
- approved exceptions;
- Workbench views;
- target handoff logic.

That is why model changes require explicit Decisions and impact analysis.

---

# Evidence that points to a model change

We classify the Finding as a model gap when one or more of these conditions is true:

- the required business concept has no canonical object;
- the Attribute is attached to the wrong Entity grain;
- the Rule cannot express the accepted business requirement;
- source authority is undefined or disputed;
- multiple Mappings are valid because applicability is missing;
- the current model cannot distinguish accepted and rejected states;
- the model treats historical behaviour as approved policy;
- a new target requirement introduces an obligation not represented in the model;
- existing Decisions no longer reflect the operating model.

For the Supplier case:

```
Observed problem:
verification remains valid after bank-account replacement.

Root cause:
verification modelled at Supplier level.

Required change:
move verification to Supplier Bank Account context
and require account-specific Evidence.
```

Correcting individual records would not prevent recurrence.

Changing the Mapping alone would still target the wrong canonical concept.

The model must change.

---

# Model change should be the last justified level, not the default

It is easy to overreact to validation failures by redesigning the model.

That creates instability.

We should change the canonical model only when the investigation demonstrates that the accepted representation is inadequate.

Our order is conservative:

```
1. Confirm the Rule and model meaning.
2. Confirm source authority and availability.
3. Inspect Mapping and implementation.
4. Inspect failed records.
5. Change the highest layer that is actually wrong.
```

“Highest” does not mean most important.

It means furthest upstream in the chain of meaning.

A model change affects more downstream objects than a record correction.

We therefore require stronger evidence.

---

# The same Finding may require more than one remediation level

Real Findings do not always fit into one box.

Our Supplier investigation may conclude:

- the canonical model must move verification from Supplier to Bank Account;
- the Mapping must join Treasury evidence by account fingerprint;
- 50 remaining records need new Treasury review.

The complete remediation is:

```
Model change:
represent account-specific verification.

Mapping change:
link Treasury evidence to the account fingerprint.

Data correction:
obtain current verification for 50 accounts.
```

We should still separate these actions.

They have different owners, approval requirements and closure evidence.

A single vague issue such as:

> Fix bank verification failures

would conceal the sequence.

The correct order is:

1. approve the model interpretation;
2. update the Mapping;
3. regenerate the dataset;
4. identify genuinely non-compliant records;
5. remediate those records;
6. rerun validation.

Without this order, record corrections may be performed against a model that is about to change.

---

# We add a fourth outcome: no change yet

Sometimes the evidence does not justify selecting any of the three remediation levels.

For example:

- Treasury and Finance disagree over source authority;
- the target requirement is still being designed;
- the external verification dataset has not been inspected;
- the validator may be mis-scoped, but the affected population is unclear.

The correct status is:

```
Finding confirmed.

Remediation level:
undetermined

Required next step:
governance decision or evidence collection
```

We should not force every Finding into a PatchProposal.

“Insufficient evidence” is a valid result.

It is safer than allowing AI or delivery pressure to choose an arbitrary fix.

---

# Our diagnostic sequence

For each confirmed Finding, we use a sequence of questions.

## 1. What accepted obligation failed?

We identify the Rule, Decision and affected business concept.

## 2. Is the obligation still valid?

We check scope, authority, grain and current Decisions.

If not, investigate a model change.

## 3. Does the required authoritative input exist?

If not, determine whether this is:

- a dataset gap;
- a source-data gap;
- a missing business decision.

## 4. Does the Mapping correctly represent the accepted path?

If not, investigate a Mapping change.

## 5. Does the implementation match the Mapping?

If not, correct implementation drift.

## 6. Do the remaining records genuinely fail the accepted condition?

If yes, perform data correction or govern an Exception.

This sequence avoids starting with the error rows and working backward through assumptions.

---

# A compact decision matrix

For the Supplier case, the decision can be summarised as follows.

| Model accepted? | Source evidence available? | Mapping correct? | Record compliant? | Primary action |
|---|---:|---:|---:|---|
| No | Unknown | Unknown | Unknown | Model decision or model change |
| Yes | Yes | No | Unknown | Mapping change |
| Yes | Yes | Yes | No | Data correction or Exception |
| Yes | No | Not executable | Unknown | Dataset or source remediation |
| Unknown | Unknown | Unknown | Unknown | Gather Evidence; do not patch |

The table is a guide.

It does not replace investigation.

Its purpose is to stop us from treating every red validation result as a bad record.

---

# Dataset remediation is not always data correction

We also distinguish a missing dataset from incorrect data.

In the original 3,400-record failure, the Treasury Review Dataset may simply be absent from the migration package.

The authoritative evidence exists outside the current input.

The appropriate action is:

```
Register and ingest the missing dataset.
```

This is not record-by-record correction.

It may not require a canonical model change if the Dataset and Mapping are already represented correctly.

It is a delivery and evidence-supply problem.

Our remediation classification can therefore contain a more precise subtype:

```
Primary level:
data layer

Subtype:
missing dataset input

Record correction:
not yet justified
```

This prevents thousands of unnecessary manual updates.

---

# Implementation drift is not automatically a Mapping change

Suppose the canonical Mapping already uses the correct Supplier identity and bank-account fingerprint.

The production transformation still uses the old local key.

The model is correct.

The approved Mapping is correct.

The code is wrong.

This is implementation drift.

We should not edit the canonical Mapping just to create visible activity.

The appropriate output is an implementation issue tied to the existing model object.

Conceptually:

```
Finding classification:
implementation_drift

Canonical change:
none

Required implementation:
align transformation with
MAP-TREASURY-BANK-VERIFICATION
```

Martenweave should preserve this distinction even though it does not need to become a full deployment platform.

---

# We use impact analysis before selecting model change

Before changing the verification grain, we calculate impact.

The affected objects may include:

- Supplier Bank Account Attribute;
- verification Rule;
- Treasury Evidence type;
- source Dataset;
- Mapping;
- target handoff;
- payment-block logic;
- validation reports;
- active Exceptions;
- migration readiness score.

The impact analysis helps reviewers understand that a seemingly simple model correction changes the complete readiness path.

The decision is no longer:

> Move a status field.

It is:

> Redefine verification as evidence attached to a specific bank account and revalidate every dependent path.

This is the business value of model-aware impact analysis.

---

# We use Evidence strength to control the remediation level

The broader the proposed change, the stronger the Evidence should be.

## Data correction

May require record-level validation and owner confirmation.

## Mapping change

Requires proof that the source exists and the current path misrepresents the accepted model.

## Model change

Requires business rationale, authority and analysis of affected downstream objects.

We should not approve a model change only because an AI agent found a pattern in failed rows.

Patterns can identify a candidate problem.

They do not establish organisational meaning.

---

# We record the chosen remediation rationale

After investigation, the Finding should state why a particular level was selected.

For example:

```
Selected remediation:
Mapping change

Reason:
Treasury verification records exist for 3,350
of the affected Suppliers.

The canonical Rule and authority Decision remain valid.

The current transformation joins through
an obsolete local Supplier key.

No canonical business meaning changes.
```

For the remaining 50 records:

```
Selected remediation:
Data correction

Reason:
No current verification Evidence exists
for the active bank-account fingerprint.

Mapping and model are correct.
```

This rationale prevents the same debate from reopening in the next mock load.

---

# We prevent remediation from changing the wrong layer

Martenweave should detect suspicious changes.

## Validator weakened while Rule remains unchanged

Possible symptom suppression.

## Mapping changed to use an unapproved source

Possible hidden authority change.

## Model Rule changed after a failed readiness run

Requires Decision and impact review.

## Records mass-updated to a default

Possible ungoverned Exception.

## Finding closed without new validation Evidence

Resolution not demonstrated.

These controls do not decide the business outcome.

They make category mistakes visible.

---

# We create different outputs for different remediation levels

A data correction Finding should generate a remediation task such as:

```
Goal:
Obtain current Treasury verification
for 50 Supplier bank accounts.

Acceptance criteria:
Each account has authorised verification Evidence
or remains payment-blocked.

Validation:
Rerun bank-verification Rule.
```

A Mapping change should generate:

```
Goal:
Replace obsolete Supplier-number join
with canonical identity and account fingerprint.

Acceptance criteria:
The Mapping validates.
The candidate dataset links existing Treasury Evidence.
No legacy flag is promoted to authoritative status.
```

A model change should generate a PatchProposal:

```
Goal:
Represent verification at Supplier Bank Account grain.

Scope:
Attribute, Rule, Evidence relationship,
Mapping and readiness logic.

Approval:
Treasury Data Owner and Supplier Model Owner.
```

The issue format follows the type of problem.

We do not send every Finding into the same generic workflow.

---

# We close each level differently

## Data correction closes when

- the records satisfy the accepted Rule;
- or a valid Exception governs them;
- new Evidence is attached.

## Mapping change closes when

- the approved Mapping is implemented;
- candidate and actual behaviour align;
- affected data is regenerated;
- validation is rerun.

## Model change closes when

- the Decision is approved;
- canonical objects are updated;
- validation passes;
- impact obligations are addressed;
- dependent Evidence is refreshed.

A merged pull request is not sufficient closure for every Finding.

It proves that files changed.

It does not automatically prove that the population now satisfies the intended business outcome.

---

# A conceptual classification inside the Finding

A Finding could preserve the remediation decision like this:

```
---
id: FIND-SUPPLIER-BANK-VERIFICATION
type: Finding
status: remediation_approved

classification:
  primary: mapping_defect

accepted_model:
  rule: RULE-SUPPLIER-BANK-VERIFICATION
  status: confirmed_current

evidence_state:
  treasury_records_available: true
  authority_confirmed: true

mapping_state:
  current_join_key: legacy_supplier_number
  required_join_key: canonical_supplier_id
  account_match_required: true

remediation:
  mapping_change:
    required: true
  model_change:
    required: false
  record_correction:
    required_after_rerun: possible

closure:
  - candidate_mapping_validated
  - transformation_updated
  - dataset_regenerated
  - rule_rerun
---
```

This is a proposed design direction rather than a claim about the exact current Martenweave Finding schema.

The important part is that the remediation level and its rationale become explicit.

---

# What we should build next

The next focused Martenweave capability should be **Finding Remediation Classification**.

It should sit between Finding confirmation and issue or PatchProposal creation.

## Required inputs

- Finding;
- Rule;
- affected model objects;
- source availability;
- source authority;
- current Mapping;
- implementation Evidence;
- failed-record profile;
- relevant Decisions and Exceptions.

## Required outputs

- recommended remediation level;
- supporting Evidence;
- unresolved questions;
- affected owners;
- impact;
- proposed closure criteria;
- confidence without automatic approval.

## Supported outcomes

- data correction;
- dataset remediation;
- Mapping change;
- implementation correction;
- model change;
- governance Decision;
- controlled Exception;
- insufficient Evidence.

This is more useful than automatically creating a patch from every failed validation.

---

# Proposed commands

A future CLI might support:

```
martenweave findings diagnose \
  FIND-SUPPLIER-BANK-VERIFICATION \
  --repo ./model
```

```
martenweave findings classify-remediation \
  FIND-SUPPLIER-BANK-VERIFICATION \
  --repo ./model \
  --dry-run
```

```
martenweave findings propose-fix \
  FIND-SUPPLIER-BANK-VERIFICATION \
  --level mapping \
  --repo ./model
```

```
martenweave findings verify \
  FIND-SUPPLIER-BANK-VERIFICATION \
  --evidence EVID-SUPPLIER-BANK-RC6 \
  --repo ./model
```

These commands describe a product direction.

They are not part of the currently documented CLI contract.

The current Martenweave foundation already supports canonical files, deterministic validation, dataset gaps, lineage, impact analysis and proposal-first change.

---

# We keep the process deterministic where possible

Not every diagnostic step should be delegated to AI.

Software can establish:

- whether required fields exist;
- whether a Mapping references them;
- whether implementation output follows the Mapping;
- whether failed records share a source path;
- whether an active Decision defines authority;
- whether an Exception covers the population;
- whether Evidence was generated under the current baseline.

AI is useful for:

- interpreting workshop notes;
- identifying candidate causes;
- explaining impact;
- drafting remediation proposals;
- identifying missing questions.

Humans decide:

- whether business meaning is correct;
- which source is authoritative;
- whether risk is acceptable;
- whether the model should change.

The division remains:

```
Deterministic checks establish facts.

AI organises and proposes interpretations.

Humans approve semantic change.
```

---

# Why structured validation results matter

A validator that returns only:

```
Bank verification failed.
```

does not provide enough information for diagnosis.

We need structured result fields such as:

- focus record;
- result path;
- observed value;
- expected condition;
- source Rule;
- validator version;
- dataset;
- severity;
- supporting details.

The W3C SHACL Recommendation provides one established example of this separation: its validation reports distinguish the overall conformance result from individual results and include fields for focus node, result path, source constraint, detail, message and severity.

Martenweave does not need to use RDF or implement SHACL.

It should preserve equivalent diagnostic structure so that Findings can be classified reliably.

---

# Data quality dimensions do not select the remediation layer

A failure may be described as:

- incomplete;
- inaccurate;
- inconsistent;
- not current.

Those quality dimensions are useful.

They do not determine what must change.

For example, missing verification may look like a completeness problem.

The real cause may be:

- absent Treasury input;
- incorrect Mapping;
- wrong Entity grain;
- genuinely unverified account.

ISO/IEC 25012 defines a general data-quality model for structured data, but project-specific business meaning, authority, remediation and risk still need to be represented by the programme.

We use quality dimensions to describe symptoms.

We use the canonical model and lineage to choose the correction layer.

---

# The business value

Choosing the right remediation level reduces several recurring forms of waste:

- manual correction of data that was already available;
- Mapping changes that conceal a policy dispute;
- model redesign triggered by an implementation bug;
- weakened Rules used to improve readiness scores;
- repeated defects across migration waves;
- conflicting fixes by different teams;
- closed issues that leave the root cause unchanged.

The value is not merely better classification.

It is avoiding work at the wrong layer.

A single correct Mapping change may eliminate thousands of manual corrections.

A single model decision may prevent every future dataset from reproducing the same ambiguity.

A disciplined choice not to change the model may protect a valid business control from schedule pressure.

---

# Final perspective

A validation failure does not tell us what to edit.

It tells us where to investigate.

For the Supplier bank-verification Finding, we ask:

```
Is the business obligation correct?

Is the authority defined?

Does the required evidence exist?

Does the Mapping use it correctly?

Does implementation match the Mapping?

Which records remain genuinely non-compliant?
```

Only then do we choose:

```
Data correction
when the record violates a correct model.

Mapping change
when implementation misrepresents a correct model.

Model change
when the accepted representation itself is wrong.
```

The practical test is:

> Can we explain why the selected remediation changes the lowest necessary layer while preserving every accepted business decision above it?

When the answer is yes, the Finding is actionable.

When the answer is:

> The validator failed, so we updated something until it passed,

we have no assurance that we corrected the problem rather than suppressed the evidence.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We are building Martenweave so that migration teams can distinguish:

```
bad data
from bad transformation,

bad transformation
from bad model,

and bad model
from an unresolved business decision.
```

Our operating model is:

```
Validators detect deviations.

Findings explain the problem.

Lineage locates the failing layer.

Impact analysis shows the consequences.

AI proposes the smallest defensible change.

Humans approve changes to model truth.

New Evidence proves resolution.
```

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

## Sources and notes

This article was reviewed on 15 July 2026.

Martenweave Core currently describes a canonical model-governance pipeline that turns datasets, validation reports, Decisions and SAP context into validated model files, dataset-gap reports, lineage, impact analysis and human-approved proposals.

Its current principles keep canonical files authoritative, generated indexes disposable, deterministic validation mandatory and AI changes proposal-first.

Its documented workflow moves from Evidence and profiling through validation, gap detection, lineage and impact to PatchProposals and human-reviewed GitHub delivery.

The W3C Shapes Constraint Language defines conditions used to validate data graphs and structured validation reports containing individual results, focus nodes, result paths, source constraints, details, messages and severity. Martenweave does not need to implement SHACL directly, but structured validation output is necessary for reliable Finding diagnosis.

ISO/IEC 25012 defines a general data-quality model for structured data used by computer systems. It provides useful quality vocabulary, while the remediation distinctions in this article—record correction, Mapping change and canonical model change—remain domain and governance decisions specific to the modelled process.

Finding remediation classification, diagnostic commands and the proposed schema are product directions. They should not be interpreted as guarantees of the exact current Martenweave Finding model, Workbench behaviour or CLI until implemented and released.

Martenweave is independent and is not affiliated with or endorsed by SAP, W3C or ISO.
