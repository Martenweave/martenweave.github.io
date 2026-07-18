# How We Use Model Evidence During Cutover Approval

**Reviewed: 15 July 2026**

The Supplier migration team completes the final rehearsal.

The technical report looks strong:

```
Records in scope:
50,000

Records transformed:
50,000

Records loaded:
49,920

Load success:
99.84%

Critical interface errors:
0
```

The cutover meeting begins.

The migration lead recommends approval.

Treasury asks:

> How many payment-active Suppliers still rely on temporary payment blocks because bank verification is incomplete?

The answer is 700.

Procurement asks:

> How many Suppliers can be loaded but cannot support purchase-order creation because a required purchasing-organisation extension is missing?

The answer is 70.

The MDM lead asks:

> How many records remain inside unresolved duplicate clusters?

The answer is 110.

The data-governance lead asks:

> Which validation reports were produced before the latest Mapping change?

The answer is unclear.

The programme has enough information to know that the load can probably run.

It does not yet have a coherent body of Evidence showing that the resulting master data is safe for the intended business processes.

This is the cutover-approval problem.

> Cutover approval should not be based on whether the migration job can finish. It should be based on whether the resulting model state, business controls and residual risks are understood well enough to accept.

A cutover decision is rarely made with perfect data.

There may still be:

- temporary Exceptions;
- unresolved low-priority Findings;
- manual controls;
- records intentionally excluded from the wave;
- unverified downstream dependencies;
- delta loads still to come;
- Evidence that is valid only for part of the current scope.

The objective is not to eliminate every imperfection before approval.

The objective is to make the remaining imperfection explicit, bounded and owned.

Martenweave’s role is to assemble the model-aware Evidence behind that decision.

Its current architecture already connects datasets, validation reports, Decisions and SAP context to canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-reviewed proposals. Canonical files own model truth, while generated indexes remain disposable.

The cutover layer should turn those objects into a decision package that answers:

```
What are we approving?

For which population?

Against which model baseline?

For which business capabilities?

Using which Evidence?

With which Exceptions?

Under whose authority?

With what residual risk?
```

# Cutover approval is a claim about a specific state

A vague approval sounds like:

> Supplier migration is ready.

A defensible approval is narrower:

> The Wave 1 Supplier population is approved for the Cutover RC6 load under model commit `def456`, with the declared Exceptions and compensating controls, for the listed purchasing, invoicing and payment capabilities.

That statement identifies:

- the domain;
- the wave;
- the dataset;
- the model baseline;
- the target load;
- the intended use;
- the remaining limitations.

Without those boundaries, “approved” becomes difficult to interpret later.

A record may have been ready for purchasing but not for payment.

A company code may have been ready while another remained excluded.

An Exception may have been valid on cutover weekend but expired before the first payment run.

The approval package must preserve the exact state that was accepted.

# Our running case

We continue with one Supplier migration population.

The current readiness assessment shows:

```
Total in current scope:
50,000

Fully ready:
48,900

Ready under controlled Exception:
700

Not ready:
220

Not assessed under current baseline:
100

Approved out of scope:
80
```

The 220 not-ready records include:

```
110 unresolved duplicate clusters

70 missing purchasing-organisation extensions

40 payment-active Suppliers
without current verification
or confirmed payment block
```

The cutover decision is not simply whether 99.56 percent of records are acceptable.

The decision board must understand:

- which of the 220 records block a business gate;
- whether they can be excluded safely;
- whether temporary controls exist;
- whether the unresolved population contains strategic Suppliers;
- whether the Evidence covers the latest model and load;
- whether excluded records have approved scope Decisions.

The same number can support different decisions depending on context.

Forty inactive Suppliers may be deferred.

Forty payment-active Suppliers scheduled for the first payment run may block approval.

# We build approval from evidence claims

A report should not be included merely because it exists.

Every artefact in the cutover pack should support an explicit claim.

For example:

## Claim 1

The current migration population is complete and reconciled.

Supporting Evidence:

- scope manifest;
- source extract fingerprint;
- inclusion and exclusion Decisions;
- reconciliation of current and previous baselines.

## Claim 2

Every in-scope record was evaluated under the current Rule set.

Supporting Evidence:

- model commit;
- validator version;
- validation execution;
- not-assessed population report.

## Claim 3

Critical business controls operate in the target state.

Supporting Evidence:

- payment-block reconciliation;
- duplicate-survivor Mapping;
- organisational-extension report;
- targeted business-process tests.

## Claim 4

Every remaining deviation is governed.

Supporting Evidence:

- active Exception objects;
- owners;
- expiry conditions;
- compensating controls;
- closure plans.

## Claim 5

The delivery artefacts match the approved model.

Supporting Evidence:

- Mapping versions;
- transformation build;
- target load identifier;
- implementation and target reconciliation.

This claim-based structure prevents cutover packs from becoming folders of unrelated spreadsheets.

# We separate technical approval from business approval

The technical team can confirm that:

- source files were received;
- transformation completed;
- load files were generated;
- interfaces are available;
- technical errors are within tolerance;
- rollback procedures exist.

Business owners must confirm that:

- identity Decisions are acceptable;
- critical values come from approved authorities;
- business-process gates are satisfied;
- remaining Exceptions are acceptable;
- compensating controls are operational;
- excluded records will not be used accidentally.

These approvals should be related but separate.

For our Supplier case:

```
Technical load approval:
Migration Lead

Purchasing readiness approval:
Procurement Data Owner

Invoice readiness approval:
Finance Data Owner

Payment-control approval:
Treasury Data Owner

Overall cutover acceptance:
Cutover Decision Authority
```

A migration developer should not be expected to accept Treasury risk.

Treasury should not be expected to approve transformation code in detail.

The model connects each role to the claim it is authorised to approve.

# We use business-capability gates

The cutover pack should not present one global Supplier status.

We assess the capabilities required immediately after go-live.

For our population:

## Purchasing gate

Questions:

- Are required Supplier roles present?
- Are purchasing-organisation extensions complete?
- Are purchasing values governed?
- Are partner relationships available?
- Are unresolved records excluded from purchase-order creation?

Result:

```
Purchasing-ready:
49,850

Controlled:
60

Blocked:
70

Not assessed:
20
```

## Invoice-posting gate

Questions:

- Are company-code extensions present?
- Are reconciliation accounts valid?
- Are tax-relevant values governed?
- Are posting controls complete?

Result:

```
Ready:
49,940

Controlled:
20

Blocked:
20

Not assessed:
20
```

## Payment gate

Questions:

- Are bank accounts current?
- Is verification valid?
- Are payment methods available?
- Is payment block active when verification is absent?
- Are Exceptions current?

Result:

```
Ready:
19,500 of 20,000 payment-scope Suppliers

Controlled:
420

Blocked:
40

Not assessed:
40
```

The overall cutover decision cannot ignore the payment gate merely because the global load percentage is high.

# We preserve zero-tolerance conditions

Some conditions should not be averaged.

For example:

```
Payment-active Supplier
+
expired verification
+
no payment block
```

may be defined as a zero-tolerance control failure.

Even one such record may block payment activation.

The gate should therefore report:

```
Payment-control gate:
BLOCKED

Uncontrolled records:
40

Tolerance:
0
```

This is stronger than:

```
Payment readiness:
99.8%
```

The percentage remains useful for context.

It cannot override the declared gate policy.

# We distinguish ready, controlled and blocked

Cutover boards need a precise vocabulary.

## Ready

The current model conditions are satisfied, and current Evidence proves the result.

## Controlled

The final condition is not fully satisfied, but an approved Exception and effective compensating control permit the declared use.

## Blocked

A critical requirement is not satisfied, and no valid control covers it.

## Not assessed

No current Evidence proves either compliance or a governed deviation.

## Approved out of scope

A documented Decision removes the record from the cutover population.

These categories must remain separate in the approval pack.

A common mistake is to merge ready and controlled records into one green total.

That removes visibility into temporary debt.

# We show every Exception as a cutover commitment

An Exception is not merely permission to proceed.

It creates obligations.

For the 700 Supplier records migrating with payment block, the cutover pack should show:

```
Exception:
EXC-SUPPLIER-BANK-VERIFICATION-W1

Affected records:
700

Business reason:
Verification remediation incomplete

Compensating control:
Payment block

Owner:
Treasury Data Owner

Valid through:
First controlled payment activation

Expiry:
15 August 2026

Closure condition:
Current verification obtained
and payment block removed through approval
```

The board is not only accepting 700 controlled records.

It is accepting:

- the control;
- the owner;
- the time boundary;
- the remediation commitment;
- the consequence if the Exception expires.

An Exception without these elements should not support approval.

# We verify that compensating controls exist in the target

The model may declare:

```
Unverified Suppliers remain payment-blocked.
```

The cutover Evidence must prove that the target state actually contains the block.

We should not accept:

- an intended Mapping;
- an approved design;
- a developer statement.

We need target Evidence.

For example:

```
Exception-covered Suppliers:
700

Payment block generated:
700

Payment block confirmed in target:
700

Unexpected payment-enabled records:
0
```

A control described in a document but absent from the loaded record is not an operational control.

# We expose Exception concentration

The board should not see only the total count.

Seven hundred Exception-covered Suppliers may consist of:

```
Inactive or historical:
420

Future-use, no near-term transaction:
190

Payment-active but blocked:
70

Scheduled for first payment run:
20
```

The last 20 deserve specific review.

The same Exception status can carry different business exposure.

Martenweave should segment the population through model context rather than presenting one undifferentiated count.

# We verify duplicate Decisions

In MDM and MDG projects, unresolved duplicates can undermine cutover even when every field is populated.

For each critical duplicate cluster, the board may need Evidence that:

- the survivor was approved;
- source identifiers map to the survivor;
- bank and tax data were assigned correctly;
- open transactional references remain usable;
- duplicate target creation is prevented;
- downstream systems received the correct key.

SAP positions MDG around governed models, golden records, matching, merging, semantic reconciliation, workflows and continuous data-quality monitoring. Those functions can provide strong governance Evidence, but the migration decision still has to connect the governed record to the actual wave, load and consuming processes.

For our Supplier case:

```
Duplicate candidate clusters:
150

Resolved with approved survivor:
40

Confirmed separate entities:
0

Unresolved:
110
```

The 110 unresolved clusters should not disappear inside a 99-percent completion score.

# We verify organisational completeness

A Supplier can exist successfully without every required organisational extension.

For cutover approval, we compare intended use with actual extensions.

For example:

```
Supplier:
100045

Required for cutover:
Company code DE01
Purchasing organisation P100
Purchasing organisation P200

Loaded:
DE01
P100

Missing:
P200
```

The general Business Partner record is technically complete.

Purchasing readiness for P200 is blocked.

The cutover board must decide whether:

- P200 is required immediately;
- the Supplier can be excluded from that scope;
- a controlled manual process exists;
- the extension must be loaded before approval.

This is a business decision, not only a field-completeness issue.

# We reconcile the cutover population

A readiness result is meaningless when the population is unclear.

We establish:

```
Previous rehearsal scope:
49,800

Current cutover scope:
50,000

Added:
280

Removed by approved Decision:
80

Unexpectedly missing:
0
```

Every removed record should reference an approved scope Decision.

Every newly added record should have current Evidence.

A common false-green pattern occurs when difficult records disappear from the denominator.

The cutover pack must make denominator changes visible.

# We verify that Evidence is current

The payment-control report may have passed during RC5.

After RC5:

- the Rule moved from Supplier-level to bank-account-level verification;
- the Mapping changed;
- a new company code entered scope;
- an Exception was added.

The RC5 Evidence remains historically valid.

It no longer proves RC6 readiness.

The cutover package should show:

```
Evidence:
EVID-BANK-CONTROL-RC5

Historical status:
valid

Current-use status:
stale

Reason:
Rule, Mapping and scope changed

Replacement Evidence:
required before approval
```

A green historical report must not silently support a new decision.

# We trace Evidence provenance

Cutover Evidence should record where it came from.

A target reconciliation may reference:

```
Model commit:
def456

Dataset fingerprint:
SUPPLIER-RC6-7F21

Transformation build:
2026.07.15.4

Target load:
CUTOVER-RC6-LOAD-02

Validator:
BANK-CONTROL v4

Generated by:
Migration Validation Team
```

The W3C PROV model provides a general framework for representing provenance across different systems and contexts by distinguishing entities, activities and agents. Martenweave does not need to implement PROV-O directly, but the same discipline is useful when we must explain which dataset, model, activity and responsible party produced a cutover result.

Without provenance, the board may rely on a report that came from:

- the wrong environment;
- an earlier load;
- a reduced dataset;
- an outdated Rule;
- a manual spreadsheet revision.

# We distinguish evidence strength

Not every artefact carries the same assurance.

For a critical payment-control claim:

## Weak Evidence

- meeting statement;
- screenshot;
- issue marked done;
- Mapping document.

## Moderate Evidence

- current transformed dataset;
- current validation report;
- full-population control check.

## Strong Evidence

- current model and dataset;
- target reconciliation;
- negative-control testing;
- business-owner approval;
- explicit remaining Exceptions.

The board should know the strength of the evidence behind each gate.

We should not hide weak proof behind a green status.

# We include negative controls

To prove that payment blocks were applied correctly, we test:

```
Expired verification records:
block required

Current verification records:
block not introduced by this remediation
```

A remediation that blocks every Supplier may eliminate one risk while creating another.

For our case:

```
Required payment blocks:
700

Confirmed:
700

Current verified Suppliers incorrectly blocked:
0
```

The negative control strengthens the approval claim.

# We distinguish failure from non-execution

A report with zero failed records can mean:

- everything passed;
- no records were evaluated;
- the input was missing;
- the validator was skipped;
- the run failed before evaluation.

The cutover pack should show execution state explicitly.

```
Validation:
completed

Population expected:
20,000

Population evaluated:
20,000

Failed:
40
```

Not:

```
Failed:
0
```

with no execution metadata.

Unknown must never be converted into pass.

# We show open Findings by business impact

The board does not need every warning.

It needs the Findings that affect approval.

A useful summary is:

```
Critical blockers:
1

High controlled Findings:
3

Medium remediation Findings:
8

Low post-cutover Findings:
14
```

For every critical or high Finding, show:

- business consequence;
- affected population;
- owner;
- current treatment;
- Evidence;
- required decision.

We prioritize by business impact, not by raw error count.

# We separate cutover approval from permanent acceptance

A record may be safe for cutover because a temporary control exists.

That does not make the final design acceptable forever.

For example:

```
Cutover approval:
Supplier may be loaded with payment block.

Permanent target state:
Current Treasury verification required
before payment activation.
```

The cutover Decision should preserve both.

Otherwise the temporary control can become the production norm.

# We create explicit approval outcomes

The decision should not be limited to approve or reject.

Useful outcomes include:

## Approved

All required gates are satisfied.

## Approved with controlled Exceptions

The board accepts the declared temporary deviations and controls.

## Conditionally approved

Approval depends on Evidence or actions completed before a defined checkpoint.

## Partially approved

Specific company codes, capabilities or populations are approved; others remain excluded.

## Not approved

A critical uncontrolled gate remains.

For our case:

```
Technical load:
approved

Purchasing:
approved except P200 missing-extension population

Invoice posting:
approved

Payment activation:
not approved until 40 uncontrolled records are blocked

Overall cutover:
conditionally approved
```

This is more precise than one global traffic light.

# We record the Decision, not only the meeting minutes

A conceptual cutover Decision might contain:

```
---
id: DEC-CUTOVER-SUPPLIER-WAVE1-RC6
type: Decision

scope:
  domain: supplier
  migration_wave: WAVE-1
  model_commit: def456
  dataset: SUPPLIER-RC6
  target_load: CUTOVER-RC6-LOAD-02

outcome:
  conditionally_approved

approved_capabilities:
  - supplier_identification
  - invoice_posting
  - purchasing_except_P200_population

blocked_capabilities:
  - payment_activation_for_uncontrolled_records

accepted_exceptions:
  - EXC-SUPPLIER-BANK-VERIFICATION-W1

conditions:
  - apply_payment_block_to_40_records
  - confirm_target_reconciliation
  - approve_P200_scope_treatment

evidence:
  - READINESS-SUPPLIER-W1-RC6
  - EVID-TARGET-RECONCILIATION-RC6
  - EVID-DUPLICATE-DECISIONS-RC6

decision_authority:
  ROLE-CUTOVER-DECISION-OWNER
---
```

This is a proposed product direction.

It is not a claim about the exact current Martenweave schema.

# We validate the approval package

Deterministic checks can detect:

```
Cutover Decision references stale Evidence.

Critical gate is blocked,
but overall outcome is approved.

Exception is expired.

Exception has no owner.

Current scope contains unassessed records.

A removed population has no approved scope Decision.

Target reconciliation references an earlier load.

Decision has no authorised approver.

Conditionally approved Decision has no deadline.

Accepted Exception lacks compensating-control Evidence.
```

These checks do not make the cutover Decision.

They make contradictions visible before the meeting.

# We use AI to prepare, not approve

AI can help us:

- assemble the Evidence package;
- summarize Findings by business impact;
- identify stale reports;
- compare rehearsal and cutover populations;
- surface expiring Exceptions;
- draft the cutover Decision;
- identify missing owners or approval conditions.

AI cannot:

- accept residual Treasury risk;
- approve unresolved duplicate identity;
- decide that an uncontrolled record is safe;
- convert missing Evidence into a pass;
- silently exclude difficult records;
- issue final cutover approval.

The operating rule remains:

```
AI prepares the decision case.

Validators detect contradictions.

Business owners accept domain risk.

Cutover authority approves the state.
```

# We keep Martenweave out of cutover orchestration

Martenweave should not become:

- a cutover scheduler;
- a command-centre application;
- a runbook engine;
- a deployment orchestrator;
- a bridge-call tool;
- an incident-management platform.

Existing tools can manage tasks, timing, dependencies and communication.

Martenweave should provide the model evidence required at the decision checkpoints.

The current repository already defines Martenweave as a canonical model-governance pipeline rather than a generic workflow platform, and keeps human-reviewed GitHub delivery outside the source-of-truth model.

# The Workbench view we need

A cutover-approval page should show:

## Decision scope

Domain, wave, dataset, model commit and target load.

## Overall recommendation

Approved, conditional, partial or blocked.

## Capability gates

Purchasing, invoice posting, payment and other required uses.

## Population state

Ready, controlled, not ready, not assessed and approved out of scope.

## Critical Findings

Business consequence, affected population and owner.

## Exceptions

Scope, control, expiry and closure commitment.

## Evidence health

Current, stale, missing and partially current.

## Identity status

Resolved and unresolved duplicate populations.

## Organisational completeness

Company-code and purchasing-organisation gaps.

## Approval conditions

Actions and Evidence required before activation.

## Decision authorities

Who approves each domain claim and the overall cutover state.

The page should not begin with the load-success percentage.

# The first product slice we should build

The next focused Martenweave capability should be **Model-Evidence Cutover Approval**.

## Goal

Generate an explainable, model-aware decision package for cutover approval without turning Martenweave into a cutover workflow tool.

## Initial inputs

- cutover population;
- model commit;
- dataset fingerprint;
- readiness assessment;
- critical Findings;
- active Exceptions;
- Evidence freshness;
- duplicate Decisions;
- organisational-extension status;
- target reconciliation;
- approval roles.

## Initial outputs

- gate-by-gate status;
- residual-risk summary;
- Exception commitments;
- stale or missing Evidence;
- population reconciliation;
- recommended outcome;
- approval conditions;
- draft Decision object.

## Supported outcomes

- approved;
- approved with controlled Exceptions;
- conditionally approved;
- partially approved;
- not approved.

# Proposed commands

A future CLI could support:

```
martenweave cutover prepare \
  --scope supplier-wave1 \
  --dataset ./data/supplier-rc6.csv \
  --target-load CUTOVER-RC6-LOAD-02 \
  --repo ./model
```

```
martenweave cutover evidence \
  DEC-CUTOVER-SUPPLIER-WAVE1-RC6 \
  --repo ./model
```

```
martenweave cutover blockers \
  --scope supplier-wave1 \
  --repo ./model
```

```
martenweave cutover validate-decision \
  DEC-CUTOVER-SUPPLIER-WAVE1-RC6 \
  --repo ./model
```

```
martenweave cutover compare \
  --from READINESS-SUPPLIER-RC5 \
  --to READINESS-SUPPLIER-RC6 \
  --repo ./model
```

These commands describe a recommended product direction.

They are not part of the currently documented CLI contract.

The existing Martenweave core already contains the canonical-file, validation, dataset-gap, lineage, impact and dataset-readiness foundations required for this capability.

# Acceptance criteria

We should consider this capability useful when it prevents each of these weak cutover decisions:

1. A high load-success rate is treated as proof of business readiness.
2. Exception-covered records are counted as fully ready.
3. An expired Exception supports approval.
4. A critical payment-control population is hidden inside an average.
5. Unresolved duplicate clusters are reported only as data-quality warnings.
6. Missing organisational extensions are hidden by successful general-object creation.
7. Stale Evidence is reused after a Rule or Mapping change.
8. Records removed from scope have no approved Decision.
9. A validation report contains zero failures because the run did not execute.
10. A pull request or closed issue is treated as proof that the target control works.

The output must also be practical.

The decision board should be able to identify:

- what it is approving;
- which risks remain;
- who owns them;
- which controls exist;
- what conditions must be completed.

# The business value

Weak cutover approval creates predictable post-go-live pain:

- Suppliers exist but cannot support purchase orders;
- invoices fail because company-code data is incomplete;
- payment controls do not operate as expected;
- duplicate identities create conflicting transactions;
- temporary defaults become production behaviour;
- local exclusions are forgotten;
- stale reports are reused during hypercare;
- business owners discover risks after activation.

A model-evidence approval package does not eliminate those risks automatically.

It makes them visible before the Decision.

Instead of:

```
Supplier load success is 99.84%.
Recommendation: approve.
```

we can state:

```
The technical load is ready.

Purchasing and invoice posting
are approved for the declared scope.

Payment activation remains blocked
for 40 uncontrolled Suppliers.

Seven hundred Suppliers are approved
only under time-bounded payment controls.

One hundred ten duplicate clusters
remain unresolved and excluded.

The overall cutover is conditionally approved
subject to the listed controls and Evidence.
```

That is a decision a responsible owner can evaluate.

# Final perspective

Cutover approval is not the final status of a migration job.

It is an acceptance of a model state.

For our Supplier case, the board should understand:

```
which records are ready,

which are controlled,

which are blocked,

which are unassessed,

which are excluded,

which Evidence is current,

which Exceptions remain,

and which business capabilities
can operate safely.
```

The practical test is:

> Can an approver trace every critical cutover claim to the current model, population, target state, Exception and accountable owner?

When the answer is yes, cutover approval becomes defensible.

When the answer is:

> The load report is green and the remaining errors are small,

the programme is making a business-risk decision from a technical execution summary.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We are building Martenweave so that cutover approval is supported by a traceable model-evidence package rather than a collection of green reports and verbal assurances.

Our operating model is:

```
Canonical model defines the expected state.

Readiness gates define business use.

Evidence proves the current baseline.

Findings expose blockers.

Exceptions define controlled deviation.

Owners accept residual risk.

Cutover authority approves a bounded state.

Git records the Decision.
```

Martenweave is an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

## Sources and notes

This article was reviewed on 15 July 2026.

Martenweave Core currently describes a backend-first model-governance pipeline that turns datasets, validation reports, Decisions and SAP context into canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-approved proposals.

Its current principles keep canonical files authoritative, generated indexes disposable, validation deterministic and AI-generated changes proposal-first.

Its documented workflow includes gap detection, lineage, impact analysis, proposal generation and human-reviewed delivery, while explicitly avoiding a generic workflow or hosted platform.

SAP describes SAP Master Data Governance as a governance layer that creates governed models and golden records, supports profiling, matching, merging and semantic reconciliation, provides workflows and continuously monitors data quality. The article uses these capabilities as potential sources of governance Evidence while keeping migration-wave, target-load and cutover approval context separate.

W3C PROV-O provides a framework for representing and exchanging provenance information generated by different systems and under different contexts. Its distinction among entities, activities and agents supports the model used here for connecting cutover Evidence to the datasets, executions and accountable roles that produced it.

The Cutover Decision object, capability gates, approval outcomes, contradiction checks and proposed commands are product directions. They should not be interpreted as guarantees of the exact current Martenweave schema, Workbench behaviour or CLI until implemented and released.

Martenweave is independent and is not affiliated with or endorsed by SAP or W3C.
