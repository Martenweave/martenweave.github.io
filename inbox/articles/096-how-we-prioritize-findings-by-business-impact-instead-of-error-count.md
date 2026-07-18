# How We Prioritize Findings by Business Impact Instead of Error Count

**Reviewed: 15 July 2026**

We complete a Supplier bank-data validation run.

The report contains three Findings:

```text
Finding A:
3,000 Suppliers have an empty account-holder name.

Finding B:
180 Suppliers have no current Treasury verification.

Finding C:
40 Suppliers contain a verified bank account
but no payment block was applied after verification expired.
```

A volume-based backlog places Finding A first.

It affects the largest number of records.

The migration dashboard may even present the result as:

```text
3,220 total errors

Largest issue:
Missing account-holder name — 3,000 records
```

That ordering is easy to generate.

It may be operationally wrong.

The 3,000 missing account-holder values may concern Suppliers that:

- are inactive;
- will not receive payments;
- are outside the cutover wave;
- use bank accounts that will not be activated;
- have a safe downstream enrichment path.

The 40 records in Finding C may include payment-active strategic Suppliers scheduled for high-value payments immediately after go-live.

Those records already appear verified.

The missing payment block means the control intended to prevent use of stale bank verification has failed.

Forty records may therefore represent greater business exposure than three thousand incomplete text fields.

> Error count measures volume. It does not measure consequence.

We want Martenweave to help programmes prioritize the Findings that can cause the most serious business outcome, not simply the Findings that produce the longest CSV file.

That requires us to connect every Finding to:

- the business process it affects;
- the model objects involved;
- the affected population;
- the operational consequence;
- the timing of that consequence;
- available controls;
- reversibility;
- uncertainty;
- concentration;
- remediation effort.

Martenweave’s current architecture already connects canonical model files with deterministic validation, dataset-gap reports, lineage, impact analysis and human-reviewed proposals. The model registry is intended to own model truth inside that pipeline rather than become a generic workflow platform.

The prioritization layer should build on those relationships.

It should not be another arbitrary red–amber–green score.

---

# Why teams prioritize by count

Error count is attractive because it is objective.

We can count:

- failed records;
- missing fields;
- rejected values;
- unmapped codes;
- validation messages.

The number is easy to compare.

A Finding affecting 3,000 records looks larger than one affecting 40.

The trouble is that the count answers only one question:

> How many records exhibit this condition?

It does not answer:

> What happens if we do nothing?

Migration programmes often use count as a proxy for risk because the model does not preserve enough context to calculate anything better.

The validation tool sees records.

The issue tracker sees tickets.

The project plan sees deadlines.

The business owner sees operational consequences.

These views are rarely connected.

Martenweave should connect them through the canonical model.

---

# We begin with the business consequence

For every confirmed Finding, we ask:

> Which business capability may fail, become unsafe or require manual intervention?

For the Supplier bank case, the affected capability may be:

```text
Outgoing Supplier Payment
```

The failed model path is:

```text
Supplier
→ current bank account
→ authorised verification
→ payment eligibility
→ outgoing payment
```

Finding A may affect data presentation or matching quality.

Finding C affects the control between expired verification and payment activation.

The second path has a more direct relationship to financial execution.

We do not need to claim that a loss will certainly occur.

We need to recognize that the plausible consequence is more material.

This is consistent with established risk-assessment practice: NIST describes risk assessment as part of an overall risk-management process that provides leaders with information needed to choose appropriate responses to identified risks.

We are applying that general principle to migration Findings rather than cybersecurity threats.

---

# We do not equate a failed rule with business impact

A validator may assign severity:

```text
ERROR
```

That severity belongs to the technical check.

Business impact requires additional context.

The same missing account-holder name may have different consequences for:

- a payment-active Supplier;
- an inactive historical Supplier;
- a one-time Supplier;
- a Supplier excluded from the current wave.

The same validation failure can therefore produce several impact levels.

We keep these concepts separate:

```text
Validation severity:
How the technical test classifies the failure.

Finding priority:
How urgently the programme should respond.

Business impact:
What may happen if the condition remains unresolved.
```

A high-severity validator does not automatically create the highest-priority Finding.

A low-severity warning can become critical when it affects a cutover gate or a high-risk process.

---

# Our running case

We investigate the three Findings in the same Supplier bank dataset.

## Finding A

```text
3,000 Suppliers have no account-holder name.
```

Investigation shows:

- 2,700 are inactive or historical;
- 250 are payment-blocked;
- 50 are payment-active;
- the target can accept the bank account without the text;
- the missing value reduces review quality but does not alone activate payment.

## Finding B

```text
180 Suppliers have no current Treasury verification.
```

Investigation shows:

- all are payment-active candidates;
- a payment block is expected when verification is absent;
- the block exists for 140;
- 40 do not have the block.

## Finding C

```text
40 Suppliers have expired verification
and no payment block.
```

Finding C is actually the dangerous subset revealed during the investigation of Finding B.

Its count is the smallest.

Its impact is the most immediate.

If we prioritize only by volume, we can spend days enriching account-holder text while leaving the failed payment control unresolved.

---

# We separate exposure from population size

The affected population matters.

It should be measured in several ways.

For the 40 Suppliers, we may calculate:

- number of Suppliers;
- number of bank accounts;
- number of company codes;
- planned payment volume;
- payment timing;
- organisational concentration;
- strategic status;
- countries or legal entities affected.

A Finding that affects 40 Suppliers may represent:

- 40 dormant records;
- or 40 Suppliers responsible for a large share of near-term payments.

The record count is only the first denominator.

A useful Finding summary could state:

```text
Affected Suppliers:
40

Payment-active:
40

Payments scheduled in first post-go-live week:
28

Company codes:
3

Estimated payment exposure:
High

Current compensating control:
None confirmed
```

We do not need false monetary precision.

We do need a defensible description of exposure.

---

# We prioritize the scenario, not the data defect

The Finding itself is a condition:

```text
Expired bank verification without payment block.
```

The priority comes from the scenario that condition enables:

```text
A Supplier payment may use bank details
that are no longer covered by current verification.
```

The scenario helps us identify:

- the initiating condition;
- the operational action;
- the missing control;
- the possible consequence;
- the time window.

We can express the chain:

```text
Verification expires
→ payment block not applied
→ Supplier remains payment-active
→ outgoing payment may proceed
→ unverified bank details may be used
```

This does not claim that every payment will be wrong.

It explains why the Finding deserves attention.

A count alone cannot provide that reasoning.

---

# The dimensions we use

We do not need a complex risk engine for the first product slice.

We need a transparent set of dimensions.

## Business criticality

How important is the affected process?

Examples:

- payment execution;
- production planning;
- regulatory reporting;
- customer order fulfilment;
- informational reporting.

## Consequence

What can happen if the Finding remains?

Examples:

- payment blocked;
- payment sent using unverified data;
- production order delayed;
- reporting inconsistency;
- manual review required.

## Timing

When can the consequence occur?

Examples:

- during the next mock load;
- at cutover;
- in the first operational week;
- only after a later process activation.

## Exposure

How much business activity is connected to the affected population?

## Control state

Is there a compensating control?

## Reversibility

Can the outcome be corrected easily after it occurs?

## Concentration

Is the Finding spread across low-value records or concentrated in a critical Plant, company code or customer segment?

## Confidence

How strong is the Evidence supporting the impact assessment?

## Propagation

Can the defect affect downstream data, processes or decisions?

These dimensions are understandable to business and technical reviewers.

They also map naturally to Martenweave objects and lineage.

---

# Business criticality must come from the model

We should not classify every Supplier bank field as critical simply because it belongs to bank data.

The model should explain which process uses the Attribute.

For example:

```text
Attribute:
Supplier Bank Account

Used by:
Outgoing Supplier Payment

Control:
Treasury verification

Consequence of invalid use:
Payment must remain blocked
```

The Finding can inherit business criticality from the governed relationship.

This is better than assigning severity manually in every validation report.

If the same Attribute is used in another context, the impact may differ.

Martenweave’s generic model already includes entities, attributes, relationships, datasets, mappings, rules, evidence and decisions. These relationships provide the basis for model-aware impact rather than isolated error scoring.

---

# Timing changes priority

A Finding can be serious but not urgent.

Another can be moderate but immediately blocking.

Suppose:

```text
Finding A:
3,000 missing account-holder names

Required by:
Post-go-live supplier review process

Finding C:
40 expired verification records without payment block

Required by:
Cutover payment activation
```

Finding C should normally be handled first because the decision point is near.

We record:

```text
Impact horizon:
Cutover

Latest safe resolution date:
Before payment activation

Current stage:
Cutover rehearsal
```

A priority model without time context produces static rankings that quickly become misleading.

---

# We distinguish inherent impact from residual impact

Finding C may have high inherent impact:

```text
Payment-active Supplier uses expired verification.
```

But if every affected Supplier has a confirmed payment block, the residual impact is lower.

We therefore separate:

```text
Inherent impact:
Potential consequence without controls.

Current controls:
Blocks, exclusions, manual reviews or other safeguards.

Residual impact:
Remaining consequence after current controls.
```

For our case:

```text
Finding B:
180 Suppliers lack current verification.

Inherent impact:
High.

Compensating control:
Payment block for 140 Suppliers.

Residual high-risk population:
40 Suppliers.
```

This is why Finding C emerges as the true priority.

The larger Finding remains important.

Its unresolved subset requires immediate action.

---

# We do not let an unverified control reduce priority

A control should reduce residual impact only when we have Evidence that it exists and works.

A meeting note saying:

> These Suppliers should be payment-blocked

is not sufficient.

We need evidence such as:

- target-field value;
- load result;
- reconciliation report;
- approved cutover control;
- recent validation.

If the payment block has not been verified, we mark:

```text
Control state:
Expected but unconfirmed
```

We do not score it as effective.

This prevents optimistic assumptions from lowering priority.

---

# Reversibility matters

Some migration defects are easy to correct later.

Others create consequences that are difficult to unwind.

A missing account-holder name can often be enriched after load.

An incorrect payment can require:

- investigation;
- bank coordination;
- accounting correction;
- Supplier communication;
- fraud review.

We record reversibility separately:

```text
Reversibility:
Low, moderate or high

Recovery effort:
Estimated operational difficulty

Evidence:
Prior incident, process owner assessment
or documented recovery path
```

A small, hard-to-reverse population may deserve higher priority than a large, easily corrected one.

---

# Downstream propagation changes the ranking

A Finding may affect one field but propagate through many processes.

For example, an incorrect MRP Controller can affect:

- planning responsibility;
- exception handling;
- work allocation;
- reporting;
- operational ownership.

An unverified Supplier bank account can affect:

- payment readiness;
- bank-data approval;
- cutover control;
- post-go-live incident handling.

Lineage allows us to identify these paths.

Martenweave already positions lineage and impact analysis as core parts of the workflow after validation and dataset-gap detection.

The prioritization layer should use that graph.

A Finding linked to several critical downstream processes deserves different treatment from an isolated presentation defect.

---

# We consider concentration

Three thousand minor defects spread across historical Suppliers may be less urgent than forty defects concentrated in one company code that must run payments on day one.

Concentration can reveal hidden operational risk.

We may group the 40 Suppliers:

```text
Company code DE01:
32

Company code NL01:
6

Company code BE01:
2
```

If DE01 has a critical cutover payment run, the priority increases.

The Finding page should show this concentration rather than only the global count.

---

# We account for uncertainty

Not every impact assessment is equally reliable.

We may know with confidence that:

- payment block is absent;
- verification is expired;
- Supplier is payment-active.

We may be less certain about:

- payment volume;
- first payment date;
- alternative operational controls.

We record:

```text
Confirmed:
40 records lack payment block.

Probable:
28 are expected in the first payment run.

Unknown:
Whether local teams will apply a manual block.
```

A high-impact Finding with uncertain controls should not be ranked low merely because the programme hopes the control exists.

Uncertainty itself may increase the need for investigation.

---

# We use categories before scores

The first output should be a clear category:

```text
Critical:
Immediate business-control failure or cutover blocker.

High:
Material operational consequence likely
within the current stage.

Medium:
Important defect with safe temporary control
or later impact horizon.

Low:
Limited consequence, low exposure
or straightforward post-load remediation.
```

Then we show the dimensions that support the category.

We do not begin with:

```text
Risk score:
78.4
```

A precise-looking number can conceal weak assumptions.

NIST’s risk-assessment guidance is designed to help decision-makers determine appropriate responses to identified risks; it does not imply that a single numerical formula is always sufficient for judgment.

Our score, when used, should summarize reasoning—not replace it.

---

# A transparent scoring model

Martenweave could optionally calculate a priority score from declared dimensions.

For example:

```text
Business criticality:
5

Consequence severity:
5

Time urgency:
5

Control effectiveness:
1

Reversibility:
2

Propagation:
4

Evidence confidence:
4
```

The calculation may produce a ranking.

But we must retain the inputs.

Reviewers should be able to see why Finding C outranks Finding A.

We should also allow policy-based overrides.

For example:

```text
Any Finding that permits payment activation
without required bank verification
is automatically Critical before cutover.
```

This is clearer than relying only on weighted arithmetic.

---

# Count still matters

We are not arguing that volume is irrelevant.

A large population can create:

- remediation effort;
- load instability;
- manual workload;
- broad business exposure;
- poor readiness.

Finding A may still require significant work.

The point is that count must be interpreted.

We preserve several measures:

```text
Affected count

Affected percentage

Critical-process count

Uncontrolled count

Exception-covered count

Near-term operational count
```

For our case:

```text
Finding B total:
180

Controlled by payment block:
140

Uncontrolled:
40

Immediate-payment population:
28
```

That decomposition is more useful than the headline number.

---

# We prioritize Findings, not individual error rows

The priority belongs to the interpreted problem.

We do not calculate a separate governance score for every row unless record-level action requires it.

The Finding groups records that share:

- cause;
- business path;
- consequence;
- owner;
- remediation.

Within the Finding, we may segment the population by exposure.

For example:

```text
Segment 1:
28 Suppliers scheduled for immediate payment
Priority: immediate

Segment 2:
12 payment-active Suppliers with no scheduled payment
Priority: before payment activation
```

This gives delivery teams an actionable order without creating forty unrelated tickets.

---

# Priority can change when the model changes

A Finding is not permanently high or low.

Its priority may change when:

- the cutover date approaches;
- a compensating control is implemented;
- the affected population shrinks;
- new Evidence increases confidence;
- a downstream process is removed from scope;
- an Exception expires;
- a new migration wave begins.

We therefore store prioritization as an assessment tied to:

- model baseline;
- dataset baseline;
- project stage;
- Evidence date.

Conceptually:

```text
Priority assessment:
PA-FIND-BANK-VERIFY-RC4

Finding:
FIND-BANK-VERIFY-NO-BLOCK

Stage:
Cutover rehearsal

Priority:
Critical

Assessed on:
2026-07-15

Evidence:
RC4 validation and payment-readiness report
```

A later assessment can supersede it without rewriting history.

---

# We avoid permanent manual priority labels

A project manager may set:

```text
Priority:
High
```

That label can survive after the Finding is controlled or the scope changes.

Martenweave should recalculate or at least flag stale assessments when:

- the affected population changes materially;
- the Rule changes;
- related Evidence becomes stale;
- the Exception status changes;
- the migration stage advances.

Manual judgement remains important.

It should be based on current model context.

---

# We distinguish business priority from remediation effort

A Critical Finding may be easy to fix.

A Low-impact Finding may require weeks of cleansing.

We track both:

```text
Business priority:
Critical

Estimated remediation effort:
Low
```

This combination should normally be handled immediately.

Another Finding may be:

```text
Business priority:
Medium

Estimated remediation effort:
High
```

That may require planning, scope reduction or a controlled Exception.

A single backlog ordering cannot represent both dimensions adequately.

The Workbench should show them separately.

---

# We distinguish value from effort

A simple prioritization view can use four quadrants.

## High impact, low effort

Act immediately.

## High impact, high effort

Escalate, plan and define controls.

## Low impact, low effort

Batch where efficient.

## Low impact, high effort

Challenge the requirement or defer deliberately.

For Finding C:

```text
Impact:
High

Effort:
Low to moderate

Action:
Apply payment blocks,
verify the population
and rerun the control.
```

For the 3,000 account-holder names:

```text
Impact:
Low to medium

Effort:
High

Action:
Segment the population
and avoid blanket manual enrichment.
```

This stops large but low-value cleansing work from consuming the critical path.

---

# We connect priority to the next action

A prioritization result should not end with a coloured badge.

It should lead to a treatment.

## Critical

- immediate owner confirmation;
- control activation;
- cutover escalation;
- evidence deadline;
- explicit go/no-go implication.

## High

- planned remediation;
- impact review;
- monitored delivery;
- no unreviewed extension.

## Medium

- schedule within the current wave;
- retain compensating control;
- reassess before the next stage.

## Low

- batch remediation;
- post-load treatment;
- or accepted deferral with rationale.

For Finding C, the treatment may be:

```text
1. Apply payment block to all 40 Suppliers.
2. Confirm the block through target Evidence.
3. Obtain current Treasury verification.
4. Rerun the Rule.
5. Remove blocks only after verified approval.
```

The priority is useful because it changes action.

---

# We make cutover implications explicit

Before cutover, Findings should be translated into gate implications.

For example:

```text
Finding:
Expired bank verification without payment block

Cutover implication:
Blocks Supplier payment activation approval

Affected gate:
Supplier Bank Readiness

Decision owner:
Treasury Data Owner

Required Evidence:
Zero uncontrolled payment-active records
```

This is more meaningful than:

```text
Priority 1
```

A business owner can understand what decision is blocked and what evidence is required.

---

# We preserve minority critical populations

Aggregate readiness metrics can hide the 40 records.

Suppose the dataset contains 50,000 Suppliers.

The uncontrolled population is:

```text
0.08%
```

A dashboard may report:

```text
Bank-verification readiness:
99.92%
```

That looks excellent.

It may still fail the business gate.

We therefore distinguish:

```text
Coverage percentage:
99.92%

Critical uncontrolled records:
40

Gate result:
Not ready
```

A high percentage must not override a zero-tolerance control.

This is one of the most important design rules for migration readiness.

---

# We allow policy-based zero tolerance

Some Findings should not be averaged into a score.

Examples may include:

- payment-active Supplier without required bank control;
- legally required tax identifier absent for an in-scope process;
- critical Plant assignment missing before production planning;
- unresolved identity collision for a strategic Business Partner.

The business owner can define:

```text
Tolerance:
0 unresolved records
```

Martenweave should preserve that policy.

A readiness score of 99.9 percent does not satisfy a zero-tolerance Rule.

---

# We avoid universal risk formulas

Different domains require different impact dimensions.

Supplier bank data may emphasize:

- payment exposure;
- control state;
- verification authority.

Product planning may emphasize:

- production continuity;
- Plant scope;
- operational responsibility.

Customer data may emphasize:

- order blocks;
- credit;
- legal or tax treatment.

Martenweave should provide a common priority framework and allow domain-specific profiles.

It should not hard-code one universal formula.

SAP migration and MDM are the first proof domain, but the current repository explicitly treats them as a domain pack rather than the permanent product boundary.

---

# A conceptual priority assessment

A Finding assessment might look like:

```text
---
id: PA-BANK-VERIFY-NO-BLOCK-RC4
type: PriorityAssessment

finding:
  FIND-BANK-VERIFY-NO-BLOCK

baseline:
  model: abc123
  dataset: SUPPLIER-BANK-RC4
  stage: cutover_rehearsal

population:
  total: 40
  payment_active: 40
  immediate_payment: 28

impact:
  business_process: outgoing_supplier_payment
  consequence: unverified_bank_details_may_be_used
  criticality: critical
  reversibility: low

controls:
  payment_block:
    expected: true
    confirmed: false

confidence:
  overall: high

priority:
  category: critical

required_action:
  apply_and_verify_payment_block_before_cutover
---
```

This is a proposed product direction.

It is not a claim about the exact current Martenweave schema.

The key is that the category remains explainable through structured evidence.

---

# We compare Findings using the same baseline

We should not compare:

- one Finding assessed against Mock Load 2;
- another assessed against Cutover RC4;
- another assessed against historical production data.

The model and dataset baselines matter.

A comparison view should show:

```text
Assessment stage:
Cutover RC4

Model baseline:
abc123

Dataset baseline:
supplier-bank-rc4

Findings compared:
12
```

This makes the ranking reproducible.

---

# We use AI carefully

AI can help us:

- summarize business impact;
- retrieve downstream dependencies;
- segment affected populations;
- identify likely control gaps;
- draft priority assessments;
- compare Findings;
- explain why a small Finding may be critical.

AI should not:

- invent payment exposure;
- assume a control is effective;
- lower priority because the count is small;
- override a zero-tolerance Rule;
- approve risk acceptance;
- hide uncertainty inside a numeric score.

The output should remain a proposal:

```text
Suggested priority:
Critical

Reason:
All affected Suppliers are payment-active,
verification is expired
and no payment block is confirmed.

Evidence confidence:
High

Required human owner:
Treasury Data Owner
```

Human approval remains necessary for risk acceptance and cutover decisions.

---

# We keep delivery priority outside canonical business truth

A Finding’s business impact belongs in Martenweave.

Sprint ordering and resource allocation belong in the delivery system.

Martenweave can generate:

- recommended priority;
- rationale;
- affected scope;
- required completion horizon;
- acceptance criteria.

GitHub, Jira or ServiceNow can manage:

- assignee;
- sprint;
- milestone;
- status;
- team capacity.

This preserves the boundary.

Martenweave’s current product definition explicitly avoids becoming a generic workflow platform while supporting proposal-first GitHub issue and pull-request delivery.

---

# The Workbench view we need

A useful prioritization page should not begin with total errors.

It should begin with business exposure.

For each Finding, show:

## Business process

Outgoing Supplier Payment.

## Consequence

Expired verification may remain payment-enabled.

## Affected population

40 Suppliers, 28 near-term payments.

## Control state

Required payment block not confirmed.

## Timing

Must be resolved before cutover payment activation.

## Reversibility

Low.

## Evidence confidence

High.

## Recommended priority

Critical.

## Required owner

Treasury Data Owner.

The account-holder Finding may appear below it even though its count is much larger.

That ordering communicates the programme’s real risk.

---

# The first product slice we should build

The next Martenweave capability should be **Impact-Based Finding Prioritization**.

## Goal

Rank confirmed Findings using business consequence and model context rather than record count alone.

## Initial inputs

- Finding;
- affected Rule;
- affected Attributes and Entities;
- business-process relationships;
- affected population;
- migration stage;
- active controls;
- related Exceptions;
- downstream impact;
- Evidence confidence.

## Initial dimensions

- business criticality;
- consequence;
- timing;
- exposure;
- control effectiveness;
- reversibility;
- propagation;
- concentration;
- confidence;
- remediation effort.

## Required outputs

- priority category;
- clear rationale;
- unresolved assumptions;
- affected owner;
- required decision horizon;
- recommended treatment;
- optional transparent score.

---

# Proposed commands

A future CLI might support:

```text
martenweave findings prioritize \
  --repo ./model \
  --baseline ./reports/supplier-bank-rc4
```

```text
martenweave findings explain-priority \
  FIND-BANK-VERIFY-NO-BLOCK \
  --repo ./model
```

```text
martenweave findings compare \
  FIND-MISSING-ACCOUNT-HOLDER \
  FIND-BANK-VERIFY-NO-BLOCK \
  --repo ./model
```

```text
martenweave findings reassess \
  FIND-BANK-VERIFY-NO-BLOCK \
  --evidence EVID-PAYMENT-BLOCK-RC5 \
  --repo ./model
```

These commands describe a recommended product direction rather than the current published CLI.

The current Martenweave foundation already includes the canonical model, deterministic validation, dataset-gap detection, lineage, impact analysis and proposal-first review needed to support this capability.

---

# Acceptance criteria for the first slice

We should consider the capability useful when it can explain why:

```text
40 uncontrolled verification failures
```

rank above:

```text
3,000 missing account-holder names
```

The explanation must include:

- affected business process;
- payment-active status;
- current control state;
- timing;
- reversibility;
- Evidence confidence;
- required owner.

The result must not depend on a hidden AI score.

A reviewer should be able to inspect the reasoning and change an assumption deliberately.

---

# What we should not build

We should not turn Martenweave into:

- an enterprise risk-management suite;
- a financial exposure engine;
- a project portfolio tool;
- a universal risk calculator;
- an autonomous cutover decision-maker.

The prioritization feature should remain tied to model Findings.

Its role is to explain why one model or data problem deserves attention before another.

---

# The economic value

Volume-based prioritization creates predictable waste:

- teams clean thousands of low-impact values;
- critical minority populations remain hidden;
- cutover gates appear green through averages;
- manual effort follows error count rather than business consequence;
- senior experts must repeatedly reinterpret reports;
- urgent controls are discovered late.

Impact-based prioritization changes the order of work.

It helps us:

- protect critical business processes first;
- preserve zero-tolerance controls;
- use compensating controls deliberately;
- defer low-value cleansing when safe;
- focus experts on decisions rather than spreadsheets;
- explain priorities to programme leadership.

The value is not a better score.

It is better allocation of limited migration time.

---

# Final perspective

We do not prioritize Findings by asking only:

```text
How many records failed?
```

We ask:

```text
Which business process is affected?

What can happen?

How soon can it happen?

Which controls remain?

How reversible is the outcome?

How much exposure is concentrated
in the affected population?

How confident are we?
```

For our Supplier bank case:

```text
3,000 missing account-holder names
may be a large cleansing task.

40 expired verification records
without payment block
may be a cutover-critical control failure.
```

The practical test is:

> Can we explain why a small Finding should block a business decision while a much larger Finding can be deferred or segmented safely?

When the answer is yes, prioritization reflects business reality.

When the answer is:

> We started with the largest error file,

the programme is optimizing the visibility of progress rather than the reduction of risk.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We are building Martenweave so that migration programmes do not confuse:

```text
large data volume
with large business impact,

technical completeness
with operational safety,

and high readiness percentages
with readiness for critical processes.
```

Our operating model is:

```text
Validators detect conditions.

Findings explain shared causes.

Lineage connects them to business processes.

Impact analysis shows consequences.

Priority assessments order the work.

Humans accept risk and approve cutover decisions.
```

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

## Sources and notes

This article was reviewed on 15 July 2026.

Martenweave Core currently describes a pipeline that turns spreadsheets, datasets, validation reports, Decisions and SAP context into canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-approved PatchProposals.

Its current principles keep canonical files authoritative, generated indexes disposable, validation deterministic and AI changes proposal-first.

Its documented workflow runs from Evidence and profiling through validation, gap detection, lineage and impact analysis to proposals and human-reviewed GitHub delivery.

NIST SP 800-30 Rev. 1 describes risk assessment as part of an overall risk-management process that provides senior leaders with information for determining appropriate responses to identified risks. This article applies that general consequence-oriented principle to migration Findings; it does not claim that Martenweave implements the NIST cybersecurity risk methodology.

NIST describes the Cybersecurity Framework as a resource for helping organisations understand and improve their management of cybersecurity risk. The specific Finding dimensions proposed here are Martenweave product design choices for data migration and model governance, not direct NIST requirements.

PriorityAssessment objects, domain-specific impact profiles, control-effectiveness checks and the proposed commands are product directions. They should not be interpreted as guarantees of the exact current Martenweave schema, Workbench behaviour or CLI until implemented and released.

Martenweave is independent and is not affiliated with or endorsed by SAP or NIST.
