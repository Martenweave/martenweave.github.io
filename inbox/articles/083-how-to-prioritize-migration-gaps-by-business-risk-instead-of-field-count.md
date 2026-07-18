# How to Prioritize Migration Gaps by Business Risk Instead of Field Count

**Reviewed: 14 July 2026**

A readiness report identifies 137 data gaps.

The programme sorts them by frequency:

```text
Missing Product descriptions: 18,400 records
Missing Customer search terms: 9,200 records
Missing Supplier marketing classifications: 6,700 records
Missing Cost Centre valid-from date: 74 records
Missing Supplier Payment Method: 31 records
```

The first three findings dominate the dashboard.

Teams are assigned to fix the largest populations.

The Cost Centre and Supplier findings remain lower in the backlog because they affect fewer records.

Then cutover begins.

The missing descriptions cause inconvenience.

The 74 Cost Centres cannot accept postings on the first day of production.

The 31 Suppliers cannot be included in the first payment run.

The programme fixed the largest gaps first.

It did not fix the largest risks first.

> Migration-gap priority should be based on the business consequence of an unresolved model path, not on the number of missing fields or affected rows alone.

Field count is easy to calculate.

Risk requires context.

A serious prioritisation model must consider:

- what the missing data means;
- which Entity and organisational level it belongs to;
- whether the path is mandatory;
- what process depends on it;
- how many records are affected;
- when the value is needed;
- whether a safe fallback exists;
- whether the defect can be detected after go-live;
- whether correction is reversible;
- which evidence supports the assessment.

Martenweave already connects canonical model objects, deterministic validation, dataset gaps, lineage, impact analysis and reviewable PatchProposals in one backend-first pipeline. Its current CLI also exposes health, scorecard, trace, impact and dataset-readiness operations.

That architecture makes it possible to prioritise a gap by the complete business path it interrupts rather than by its position in a spreadsheet.

---

# Field count is not risk

Consider two gaps.

## Gap A

```text
18,400 Products lack a secondary marketing description.
```

Potential consequence:

- incomplete search;
- reduced usability;
- weaker catalogue presentation.

## Gap B

```text
12 Product Plant records lack Procurement Type.
```

Potential consequence:

- incorrect planning behaviour;
- missing procurement proposals;
- production or replenishment disruption.

Gap A affects more records.

Gap B may carry more operational risk.

A prioritisation process that sorts only by affected-row count will place Gap A first.

A business-risk model should probably place Gap B first.

The point is not that descriptions never matter.

The point is that population size must be interpreted through business consequence.

---

# A gap is a broken obligation

A useful way to think about a migration gap is:

> Which obligation can no longer be fulfilled because this model path is incomplete?

Possible obligations include:

- create the target master record;
- assign the correct organisational extension;
- pass a legal validation;
- allow payment;
- allow posting;
- support production planning;
- route an invoice;
- replicate the value downstream;
- preserve historical interpretation;
- demonstrate control compliance.

The gap itself may be:

```text
field missing
```

The obligation may be:

```text
Supplier cannot be paid
```

or:

```text
Product cannot be planned correctly
```

Risk belongs to the obligation, not to the field count.

---

# Prioritise paths, not isolated columns

A dataset report may find:

```text
Missing field:
PLANT
```

The same field can participate in several paths:

- Product Plant MRP Controller;
- Product Plant Procurement Type;
- Product Plant Profit Centre;
- Product Plant loading group;
- Product Plant storage conditions.

One missing key can break several target assignments.

Conversely, five missing descriptive columns may affect only one low-criticality output.

Therefore, prioritisation should traverse:

```text
dataset gap
→ Mapping dependency
→ business Attribute or Relationship
→ target endpoint
→ Rule
→ downstream process
```

The priority belongs to the resulting impact set.

---

# Seven dimensions of migration-gap risk

A practical risk model can use seven dimensions.

## 1. Business criticality

What happens when the value is missing or wrong?

Typical levels:

### Critical

Could prevent a core process, create legal or financial exposure, corrupt ownership or produce unsafe operational behaviour.

### High

Could materially disrupt operations, reporting or a significant population.

### Medium

Creates manageable manual work, reduced quality or bounded process degradation.

### Low

Primarily affects convenience, description, search or noncritical reporting.

Criticality should be assigned to the Attribute in context, not only to the physical field.

## 2. Affected population

How many records, organisational units or transactions are exposed?

Population remains important.

It is simply not sufficient on its own.

## 3. Process proximity

When will the value be needed?

Examples:

- during master-data creation;
- before cutover;
- during the first payment run;
- during the first MRP run;
- before month-end close;
- only in a later reporting cycle.

A small gap needed tomorrow may be more urgent than a large gap needed in three months.

## 4. Fallback quality

Is there a safe alternative?

Possible classifications:

- no fallback;
- equivalent approved fallback;
- transformable fallback;
- manual controlled fallback;
- approximate fallback;
- undocumented default;
- expired fallback.

A good fallback lowers immediate delivery risk.

It may still create remediation debt.

## 5. Detectability

Will an incorrect value be detected quickly?

A missing mandatory field that blocks the load is highly visible.

A plausible but wrong Profit Centre may post successfully and remain unnoticed until financial reporting.

Low detectability increases risk.

## 6. Reversibility

How difficult is correction after go-live?

Examples:

- optional description: easy;
- wrong partner relationship after invoices are created: difficult;
- wrong base unit after stock exists: potentially severe;
- wrong tax category after documents are posted: complex;
- missing search term: usually easy.

Low reversibility increases priority.

## 7. Evidence confidence

How certain is the impact assessment?

A high-risk conclusion with weak evidence may require immediate investigation.

It should not automatically be downgraded because uncertainty exists.

---

# Severity and urgency are different

A gap can be severe without being immediately urgent.

Example:

```text
Historical Product classification required only for a later analytics migration.
```

Potential severity may be high for reporting integrity.

Urgency may be low before the analytics phase.

Another gap may be moderately severe but highly urgent:

```text
Missing Shipping Condition for customers in tomorrow’s cutover population.
```

A useful queue should therefore show both:

```text
Business severity
Delivery urgency
```

Combining them into one hidden score makes prioritisation harder to explain.

---

# Example 1: Supplier Payment Method

## Gap

Payment Method is missing for 31 Suppliers in Company Code 3100.

## Population

Small.

## Business criticality

High.

## Process proximity

Needed for the first payment proposal.

## Fallback

Manual maintenance is possible but requires Finance approval.

## Detectability

High: the payment run will exclude the Supplier.

## Reversibility

Moderate: records can be corrected, but delayed payments may have contractual consequences.

## Priority

Critical before the first payment run.

A field-count model sees 31 records.

A business-risk model sees payment continuity.

---

# Example 2: Product marketing descriptions

## Gap

Secondary description is missing for 18,400 Products.

## Population

Large.

## Business criticality

Low to medium, depending on downstream catalogue use.

## Process proximity

Not required for basic material creation or planning.

## Fallback

Primary description remains available.

## Detectability

High: users can see the missing text.

## Reversibility

High: description can usually be added later.

## Priority

Lower than operational planning, financial and legal gaps.

This gap should remain visible.

It should not consume the same cutover attention as a missing planning key.

---

# Example 3: Cost Centre valid-from date

## Gap

Valid-from date is absent for 74 Cost Centres.

## Population

Small.

## Business criticality

Critical.

## Process proximity

Required on the first day of posting.

## Fallback

A go-live-date default may be possible but requires Finance approval and historical review.

## Detectability

High when postings fail, but not necessarily during basic object creation.

## Reversibility

Moderate to difficult once dependent postings and assignments exist.

## Priority

Immediate.

The gap should outrank thousands of missing descriptive fields.

---

# Risk is contextual

The same Attribute can have different priority in different populations.

Consider Product Serial Number Profile.

## Population A

Products managed without serial tracking.

Missing profile may be inapplicable.

## Population B

High-value equipment requiring traceability.

Missing profile may create operational and audit risk.

The field is identical.

The business path differs.

Priority must be scoped by:

- Product type;
- Plant;
- process;
- regulatory or contractual requirement.

A universal field-level criticality flag is too coarse.

---

# Example 4: Product serial-number profile

A source file lacks Serial Number Profile for 120 Products.

Further analysis shows:

- 100 are ordinary consumables;
- 20 are repairable equipment requiring serial traceability.

A row-count view treats the entire gap equally.

A business-risk view separates:

```text
100 low-risk or not-applicable records
20 critical records
```

Recommended priority:

1. resolve the 20 traceability-critical Products;
2. confirm that the remaining population is truly out of scope;
3. do not spend cutover time manufacturing values for inapplicable records.

This is a better use of limited migration capacity.

---

# Mandatory does not always mean critical

A field can be technically mandatory in SAP because of configuration.

That does not automatically make the business meaning critical.

A default may satisfy the technical requirement without business harm.

Conversely, a technically optional field can be operationally critical.

Example:

- a custom Review Status field may be optional in the database;
- the business process may depend on it to prevent unapproved Supplier distribution.

Therefore, criticality should consider:

```text
technical requiredness
+
business requiredness
+
process consequence
```

Do not derive risk from target nullability alone.

---

# Example 5: Supplier bank-account ownership

The target bank fields are technically complete.

The gap is:

```text
Ownership verification evidence missing for 680 Suppliers.
```

No column is absent.

The issue may not appear in a schema-gap report.

Business risk is high because:

- payments could go to an account not sufficiently associated with the Supplier;
- duplicate or shared accounts may remain unresolved;
- control evidence is incomplete.

Priority should be based on:

- payment-active status;
- value volume;
- verification policy;
- available payment block.

A Supplier blocked from payment may be safely deferred.

An active Supplier scheduled for immediate payment may be critical.

---

# Gap type influences risk

Different gap types tend to create different risk patterns.

## Missing direct value

May cause blank target or explicit rejection.

Usually visible.

## Missing key or context

May attach a plausible value to the wrong record.

Often less visible and more dangerous.

## Invalid value

May be rejected—or may map incorrectly.

## Missing Rule input

May prevent the programme from deciding whether a control applies.

## Missing evidence

May leave a technically successful path unverified.

## Conflicting source values

May create silent source-authority mistakes.

## Unexpected field

May indicate a model gap rather than a data defect.

Risk logic should reflect the gap type.

---

# Missing context often deserves higher priority than missing value

Suppose a Customer partner-function dataset contains:

```text
CUSTOMER_ID
PARTNER_ID
PARTNER_ROLE
```

but lacks:

```text
SALES_ORG
DISTRIBUTION_CHANNEL
DIVISION
```

The partner values are present.

The context is missing.

A migration could:

- reject the records;
- assign them centrally;
- duplicate them across Sales Areas;
- apply a default Sales Area.

Only the first option makes the uncertainty obvious.

The other options can create plausible but wrong relationships.

A missing contextual key is often more dangerous than a blank optional value because the result can pass technical validation.

---

# Example 6: Customer Payer assignment

## Gap

Sales Area keys are missing for 240 Payer relationships.

## Population

Moderate.

## Business criticality

High.

## Process impact

Billing responsibility and invoice routing.

## Fallback

Self-Payer is technically possible but not approved globally.

## Detectability

Low to medium: invoices may be created successfully and sent to the wrong party.

## Reversibility

Difficult after billing documents exist.

## Priority

High, despite a relatively small population.

A field-count model may bury this gap beneath thousands of missing search terms.

---

# Detectability changes the ranking

Some defects fail loudly.

Others produce plausible output.

Loud failures are painful but easier to control.

Silent defects can be more dangerous.

## Loud failure

Missing mandatory Company Code key causes a load rejection.

## Silent failure

Central Payment Terms copied to every Company Code.

The second may load successfully and affect cash flow later.

A prioritisation model should penalise low detectability.

---

# Example 7: Supplier Payment Terms

A dataset contains one Payment Term per Supplier.

The target requires Company Code-specific values.

The migration applies the central value to all Company Codes.

No field is missing.

No load error occurs.

The gap is contextual model coverage.

Risk factors:

- local contractual differences;
- invoice due dates;
- payment forecasting;
- cash management;
- correction after posted invoices.

This can deserve higher priority than a visible missing-field rejection because the defect may remain hidden until financial processing.

---

# Reversibility changes the ranking

A gap that is easy to fix after go-live may tolerate a later deadline.

A gap that becomes expensive or dangerous after transactions exist should move earlier.

## High reversibility

- search term;
- optional description;
- noncritical classification;
- unused report label.

## Low reversibility

- Product Base Unit;
- legal identifier category;
- partner relationship used by documents;
- Cost Centre validity after postings;
- Profit Centre used in inventory postings;
- bank account used in payments.

This is not absolute.

Context matters.

But reversibility is a powerful prioritisation dimension.

---

# Example 8: Product Base Unit

## Gap

Source systems disagree whether the base unit is `PC` or `EA`.

## Affected population

Only 46 Products.

## Business criticality

Critical.

## Process proximity

Needed before stock and open documents are migrated.

## Fallback

None should be assumed.

## Detectability

Potentially low if both codes are technically valid.

## Reversibility

Very low after stock and transactional data exist.

## Priority

Immediate design decision before cutover.

Forty-six records can outrank tens of thousands of missing descriptions.

---

# Population still matters

Business-risk prioritisation should not swing too far and ignore volume.

A medium-risk issue affecting 500,000 records can be more serious than a high-risk issue affecting one record with a safe workaround.

Population can be measured as:

- record count;
- percentage;
- number of organisational units;
- number of downstream consumers;
- transaction volume;
- financial exposure;
- number of business owners.

The right denominator depends on the Attribute.

For bank data, payment-active Suppliers may matter more than total Suppliers.

For Product planning, active Product Plant records matter more than all Products.

For partner functions, active Sales Areas matter more than central Customer count.

---

# Use the affected business population

Weak denominator:

```text
680 of 80,000 Suppliers affected
```

Stronger denominator:

```text
680 of 4,200 payment-active Suppliers affected
```

Weak denominator:

```text
120 of 100,000 Products affected
```

Stronger denominator:

```text
20 of 140 serial-controlled repair Products affected
```

Risk changes when the correct population is used.

Lineage and applicability Rules help define that denominator.

---

# Example 9: Tax Identifier category

## Gap

Country-specific tax category is unresolved for 1,240 Suppliers.

## Total Supplier population

90,000.

The issue appears small.

## Relevant population

1,240 Suppliers in the affected country.

Coverage is effectively zero for that scope.

## Business impact

- legal validation;
- invoice processing;
- duplicate detection;
- reporting.

## Fallback

Generic category exists technically but is not legally confirmed.

## Priority

Critical for the affected country.

A global percentage would hide the local completeness failure.

---

# Local blockers should survive global aggregation

A programme dashboard may show:

```text
Tax data readiness: 98.6%
```

This can coexist with:

```text
Portugal tax-category readiness: 0%
```

The global result should not erase the local blocker.

A risk-prioritisation system should preserve:

- global score;
- local critical findings;
- lowest critical path;
- blocked scope.

A programme can be largely ready and still unable to release one jurisdiction safely.

---

# Fallback quality is central to priority

Two gaps with similar impact may have different urgency because one has a reliable fallback.

## Gap A

Authoritative source temporarily unavailable.

A verified replica exists and is less than one day old.

## Gap B

Authoritative source unavailable.

Only a manually maintained spreadsheet exists with unclear ownership.

Gap A may be controlled.

Gap B may require immediate intervention.

Fallback classification should include:

- semantic equivalence;
- freshness;
- governance;
- capacity;
- traceability;
- expiry;
- reconciliation.

---

# Example 10: Product MRP Controller

Two plants lack the final MRP Controller conversion.

## Plant PL10

Fallback is an approved planner-team assignment tested during rehearsal.

## Plant PL30

Fallback is controller `001`, selected only because it is technically valid.

The number of affected records is similar.

Risk differs.

PL10 may be conditionally ready.

PL30 may be blocked.

A fallback is not just a nonblank value.

It is an alternate governed path.

---

# Manual fallback capacity

A manual process may be safe for 20 records and impossible for 20,000.

Therefore, fallback risk should account for capacity.

Questions include:

- how many records require review;
- how long each review takes;
- which qualified owners are available;
- whether review can finish before the deadline;
- whether decisions are auditable;
- whether records can be identified later.

A manual fallback is not scalable by default.

---

# Timing should be tied to the first affected process

The deadline for a gap is not always cutover.

Examples:

## Supplier bank verification

Before first payment.

## Product Profit Centre

Before first inventory posting or month-end close.

## Product serial profile

Before warehouse or delivery execution.

## Customer Payer

Before billing.

## Cost Centre hierarchy assignment

Possibly before reporting or allocation, depending on process.

## Optional long text

May follow go-live.

The prioritisation model should identify:

```text
last responsible moment
```

rather than assigning every gap the same cutover deadline.

---

# A four-quadrant action model

A simple working model can use:

```text
business risk
×
time urgency
```

## High risk, high urgency

Act immediately.

Examples:

- unresolved Product Base Unit;
- Cost Centre invalid at go-live;
- payment-active Supplier missing Payment Method.

## High risk, lower urgency

Plan controlled remediation before the first affected process.

Examples:

- Product Profit Centre correction before first close;
- downstream value-list compatibility before interface activation.

## Lower risk, high urgency

Use bounded operational handling.

Examples:

- visible but noncritical description required by a cutover file format.

## Lower risk, lower urgency

Defer transparently.

Examples:

- optional search terms;
- nonessential classification;
- low-value documentation enrichment.

This model is simple enough for delivery meetings.

The underlying risk dimensions remain available for audit.

---

# Risk score versus release gate

A numerical risk score can help sorting.

It should not replace blockers.

Example:

```text
Risk score: 62
Release gate: Failed
```

Why can a moderate score still block?

Because the gap concerns one legally mandatory tax category.

Another gap may score 78 but remain conditionally acceptable because:

- a controlled fallback exists;
- affected records are isolated;
- process owners approve the temporary path.

Release policy and numerical priority are related but different.

---

# Hard-gate examples

A gap should usually block its affected scope when:

- no valid source exists for a mandatory critical Attribute;
- required organisational keys are missing;
- Product Base Unit is ambiguous;
- bank ownership is unresolved for a payment-active Supplier;
- Cost Centre validity excludes go-live;
- tax category cannot be determined;
- mandatory partner role cannot be assigned;
- fallback is undocumented or expired;
- affected records cannot be identified;
- correction after go-live would be unsafe.

These conditions should not be averaged against low-risk completed fields.

---

# Do not equate legal or financial importance with field category

A field named “status” can be critical.

A field named “amount” may be informational.

A custom field can govern an approval process.

A standard field can be unused.

Risk must derive from actual use and Rules.

Examples:

- Supplier Review Status may control distribution;
- Payment Block may stop all payments;
- Product Status may affect planning and sales;
- Address Usage may affect tax or delivery;
- Tax Category may determine legal treatment.

Names and technical types are weak proxies for business risk.

---

# Risk is not graph centrality

A highly connected Attribute is not automatically the highest priority.

A rarely used legal identifier may have few edges and severe consequences.

A descriptive field may connect to many reports and remain low risk.

Graph structure helps identify dependencies.

Risk requires:

- criticality;
- process;
- scope;
- timing;
- fallback;
- detectability;
- reversibility.

Martenweave should not rank gaps merely by node degree or number of downstream neighbours.

---

# Example 11: Product valuation class

## Gap

Value `3999` is not recognised in the target value list.

## Affected records

62 Products.

## Downstream path

```text
Product valuation class
→ account determination
→ inventory and financial postings
```

## Detectability

Medium: some postings may fail, others may hit an unintended account depending on configuration.

## Reversibility

Difficult after postings.

## Priority

High or critical, subject to Finance assessment.

This gap should outrank thousands of missing optional Product texts.

---

# Example 12: Address usage

## Gap

Address exists, but its intended usage is unknown for 3,100 Customer records.

## Possible uses

- standard;
- delivery;
- billing;
- correspondence.

## Risk

Varies by affected process.

If the standard address is available and the missing usage affects only correspondence, priority may be medium.

If Ship-to usage cannot be identified, delivery risk may be high.

The same missing relationship must be segmented before assigning one priority.

---

# Segmentation before prioritisation

A broad gap should often be divided into smaller findings.

Example:

```text
3,100 Customer address-usage gaps
```

Segment into:

- 2,000 correspondence-only;
- 700 Ship-to;
- 300 Bill-to;
- 100 legally registered address conflicts.

Each segment has different:

- owner;
- process;
- risk;
- deadline;
- fallback.

One aggregate priority would be misleading.

---

# Confidence should influence investigation priority

Suppose a potential high-risk gap is based on an uncertain column match.

Example:

```text
LEGACY_UOM may represent Product Base Unit.
```

The impact could be severe.

The semantic match is unconfirmed.

The correct action is not to assign a low priority because confidence is weak.

It is to prioritise clarification.

Useful distinction:

```text
Remediation priority
Investigation priority
```

A high-impact uncertain finding may receive:

- high investigation priority;
- unresolved remediation priority.

This avoids waiting until certainty arrives by accident.

---

# Prioritise by decision latency

Some gaps require decisions from scarce owners:

- Tax;
- Treasury;
- Finance controlling;
- production planning;
- legal;
- local business leadership.

Even when technical remediation is small, decision latency can be long.

These gaps should enter the queue early.

Example:

```text
62 Products require valuation-class decision.
```

The technical conversion may take one day.

Finance review may take three weeks.

Field-count sorting will not reveal this delivery risk.

---

# Dependency on external teams

Priority should increase when remediation depends on:

- external source-system teams;
- local countries;
- third-party data providers;
- SAP configuration;
- interface consumers;
- legal review.

This does not mean every external dependency is high risk.

It means the schedule risk must be explicit.

---

# Effort does not define priority

A common backlog strategy prioritises quick wins.

Quick wins can improve dashboard percentages while critical gaps remain untouched.

Example:

```text
Fix 4,000 missing descriptions:
two days

Resolve 31 Payment Methods:
requires Finance decision
```

The descriptions may be easier.

The Payment Methods may still need to start first.

Effort should influence sequencing and planning.

It should not override business risk.

---

# A useful priority record

Each gap should contain enough information to justify its position.

```text
Gap:
Supplier Payment Method unavailable.

Affected Attribute:
Supplier Company Code Payment Method.

Scope:
Company Code 3100.

Population:
31 payment-active Suppliers.

Business impact:
Excluded from first payment proposal.

Fallback:
Manual maintenance with Finance approval.

Deadline:
Before first payment run.

Detectability:
High.

Reversibility:
Moderate.

Business severity:
Critical.

Delivery urgency:
Critical.

Owner:
Accounts Payable Data Owner.
```

This is defensible.

“Priority 1” without context is not.

---

# Risk scoring model

A simple configurable model might assess:

```text
Criticality: 1–5
Population exposure: 1–5
Process proximity: 1–5
Fallback weakness: 1–5
Low detectability: 1–5
Low reversibility: 1–5
Evidence uncertainty: 1–3
```

The exact formula should be transparent and versioned.

One possible structure is:

```text
Base risk =
criticality
× maximum(process proximity, reversibility risk)

Exposure modifier =
population
+ fallback weakness
+ detectability risk
```

This is only an illustration.

The product should not claim that one universal formula represents every domain.

The important requirement is explainability.

---

# Avoid false numerical precision

A score such as:

```text
Risk: 83.47
```

creates a sense of precision that the inputs may not support.

Prefer:

```text
Critical
High
Medium
Low
```

with dimension details.

A numerical score can exist for sorting.

The business-facing decision should use clear categories and reasons.

---

# Domain-specific policies

Different domains require different risk rules.

## Supplier bank data

Emphasise:

- payment activity;
- account ownership;
- validation;
- duplicate account risk;
- payment-block fallback.

## Product planning

Emphasise:

- Plant context;
- planning cycle;
- procurement behaviour;
- operational fallback;
- first MRP run.

## Tax data

Emphasise:

- country;
- category;
- legal evidence;
- document processing;
- detectability.

## Finance master data

Emphasise:

- validity;
- organisational assignments;
- posting ability;
- period close;
- reversibility.

## Partner functions

Emphasise:

- Sales Area;
- role cardinality;
- billing and delivery;
- relationship correctness.

The common framework remains stable.

The policy varies.

---

# Risk by migration phase

The same gap can change priority over time.

## Early design

Focus on semantic uncertainty and source authority.

## Mock load

Focus on executable Mappings, source gaps and target fit.

## Cutover rehearsal

Focus on critical-path evidence, fallback and operational sequencing.

## Cutover

Focus on immediate blockers and controlled exceptions.

## Hypercare

Focus on production impact, recurring patterns and remediation debt.

A low-priority design question can become a cutover blocker if it remains unresolved.

Priority should be recalculated as context changes.

---

# Risk decay and risk escalation

Some gaps naturally become less urgent.

Example:

- optional description deferred to post-go-live enrichment.

Others escalate:

- temporary fallback approaching expiry;
- source extract still incomplete near freeze;
- unresolved legal Decision;
- repeated mock-load failure;
- affected population increasing.

The queue should support:

```text
priority changed because
```

not only the latest rank.

This creates accountable history.

---

# Accepted risk is not resolved risk

A programme may approve go-live with a bounded gap.

Record:

- what is accepted;
- scope;
- owner;
- expiry;
- controls;
- remediation deadline;
- affected records.

Example:

```text
Accepted risk:
regional Profit Centre fallback for Plant PL30.

Population:
1,842 Product Plant records.

Control:
monthly exception report.

Expiry:
before first month-end close.

Owner:
Plant Controller.
```

The gap remains active until remediated.

Changing its status to “closed” would hide the obligation.

---

# Deferred gaps need a valid future path

A deferred gap should answer:

- when it will be addressed;
- which process can operate without it;
- whether target correction is possible;
- who owns it;
- how affected records are identified;
- what event triggers escalation.

Weak:

```text
Post-go-live.
```

Stronger:

```text
Correct before first warehouse integration activation.
Affected Products are tagged through Evidence set EVID-UOM-GAP-001.
```

---

# Gap portfolio views

A useful portfolio should show more than counts.

## By business risk

Critical, high, medium and low.

## By affected process

Payment, planning, billing, posting, procurement, warehouse, reporting.

## By root cause

Source, Mapping, context, Rule, evidence, target, fallback.

## By owner

Finance, Tax, Planning, Procurement, Integration, local business.

## By deadline

Cutover, first payment, first MRP run, first close, later release.

## By remediation type

Source fix, Mapping change, manual review, fallback, scope exclusion, model proposal.

This makes the backlog operational.

---

# Example priority comparison

| Gap | Records | Process | Fallback | Reversibility | Priority |
|---|---:|---|---|---|---|
| Product secondary description | 18,400 | Search and display | Primary text exists | High | Low |
| Customer Payer Sales Area missing | 240 | Billing | Unsafe self-Payer default | Low | Critical |
| Cost Centre valid-from missing | 74 | Posting | Controlled date default possible | Medium | Critical |
| Supplier Payment Method missing | 31 | Payment | Manual Finance maintenance | Medium | Critical |
| Product alternative-unit conversion missing | 1,920 | Warehouse and sales | None confirmed | Low | High |
| Supplier tax category unresolved | 1,240 | Tax and invoices | Generic category unapproved | Low | Critical |

This table shows why count alone is a poor queue.

---

# Release decisions should remain scoped

Possible result:

```text
Wave 1 overall:
Conditionally ready

Blocked scopes:
- Portugal Supplier tax data
- Company Code 3100 Supplier Payment Method
- Plant PL30 Product MRP Controller

Ready scopes:
- central Supplier identity
- Germany bank data
- Product descriptions
- Plant PL10 planning data
```

This is more useful than blocking or approving the entire programme from one aggregate score.

---

# From prioritisation to action

Every critical or high-priority gap should end with one concrete next action.

Examples:

```text
Add Company Code payment-instruction extract.
```

```text
Obtain Finance approval for go-live-date default.
```

```text
Complete Plant PL30 planner conversion.
```

```text
Identify the legally correct Portuguese tax category.
```

```text
Confirm warehouse unit conversion instead of changing Product Base Unit.
```

Prioritisation without an action owner becomes reporting theatre.

---

# Use Findings before model mutation

A high-priority gap does not automatically mean the canonical model is wrong.

The cause may be:

- source dataset;
- implementation;
- missing evidence;
- target configuration;
- scope;
- actual model defect.

The safe workflow remains:

```text
gap evidence
→ risk classification
→ Finding
→ root-cause review
→ PatchProposal where justified
→ deterministic validation
→ human approval
```

Martenweave’s documented operating model explicitly keeps canonical files authoritative and routes changes through proposals, validation, impact analysis and human review.

---

# What AI can contribute

AI can help:

- summarise business impact;
- suggest process dependencies;
- group similar gaps;
- identify likely critical contexts;
- estimate which owners are needed;
- draft prioritisation explanations;
- propose targeted tests.

AI should not autonomously:

- reduce criticality;
- approve fallback;
- exclude population;
- accept legal or financial risk;
- close a gap;
- manufacture certainty from weak evidence.

Risk acceptance is a governance decision.

---

# Suggested diagnostic and priority labels

A first implementation could expose:

```text
MW-RISK-001
Critical path has no valid source.

MW-RISK-002
Required organisational context is missing.

MW-RISK-003
Gap may produce plausible but incorrect output.

MW-RISK-004
Correction becomes difficult after first transaction.

MW-RISK-005
No approved fallback exists.

MW-RISK-006
Fallback capacity is insufficient for affected population.

MW-RISK-007
Critical local scope is hidden by global coverage.

MW-RISK-008
Gap deadline precedes planned remediation.

MW-RISK-009
High-impact finding has low evidence confidence.

MW-RISK-010
Accepted risk has no expiry or owner.

MW-RISK-011
Deferred gap has no future verification point.

MW-RISK-012
Gap priority is based only on field or row count.
```

These diagnostics can support scorecards and CI policies without replacing human risk decisions.

---

# What Martenweave should implement next

Martenweave already provides:

- canonical model files;
- deterministic validation;
- dataset-readiness analysis;
- gaps, lineage and impact;
- health and scorecards;
- PatchProposals;
- a local Workbench for assessment and review.

The next focused vertical slice should add **business-risk gap prioritisation**.

## Goal

Rank migration gaps according to the business path and release obligation they threaten rather than their field count alone.

## Initial dimensions

- business criticality;
- affected population;
- process proximity;
- fallback quality;
- detectability;
- reversibility;
- evidence confidence.

## Required scope support

- country;
- Company Code;
- Plant;
- Sales Area;
- migration wave;
- active business population;
- effective period.

## Acceptance criteria

The system must rank:

```text
31 missing Supplier Payment Methods
```

above:

```text
18,400 missing optional Product descriptions
```

when the first payment run is at risk.

It must rank:

```text
46 ambiguous Product Base Units
```

above large low-risk descriptive gaps because correction becomes unsafe after stock migration.

It must identify:

```text
Portugal tax category readiness: blocked
```

even when global tax-field coverage exceeds 98 percent.

It must distinguish:

```text
temporary fallback available
```

from:

```text
safe fallback approved and operationally scalable
```

## Existing commands

```text
martenweave run dataset-readiness \
  --repo ./model \
  --dataset ./data/source.xlsx \
  --out ./reports/readiness

martenweave impact \
  ATTR-SUPPLIER-PAYMENT-METHOD \
  --repo ./model

martenweave scorecard --repo ./model
```

## Future focused operation

```text
martenweave gap-priority \
  --repo ./model \
  --report ./reports/readiness/gaps.json \
  --policy ./policies/migration-risk.yaml
```

The `gap-priority` command and policy file describe a recommended product direction rather than the current documented CLI contract.

---

# Final perspective

Migration teams do not run out of gaps.

They run out of time, attention and qualified decision-makers.

Prioritisation determines where those scarce resources go.

The useful chain is:

```text
dataset gap
→ broken model obligation
→ affected business process
→ exposed population
→ fallback
→ deadline
→ correction difficulty
→ accountable owner
```

The practical test is:

> Can the programme explain why one missing value must be resolved before cutover while another larger gap can be deferred safely?

When the answer is yes, the backlog reflects business risk.

When the answer is:

> This issue affects the most rows,

the programme is prioritising data volume, not migration safety.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first, source-available model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects dataset findings to canonical Attributes, Relationships, Mappings, Rules, target endpoints, downstream impact, Evidence and Decisions so that gap priority can be explained through business consequence.

The goal is not to create a mysterious risk score.

It is to make it difficult for a critical local or low-volume failure to disappear beneath large numbers of harmless missing fields.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave Core currently treats canonical files as the source of truth, validates IDs, types, references and domain context before indexing, and runs dataset-gap, lineage and impact analysis before human-reviewed change proposals.

The current CLI includes health, scorecard, trace, impact, search, query, repository diff and dataset-readiness operations. These provide the foundation for connecting observed gaps to governed paths and prioritising them by impact.

The risk dimensions, diagnostics and proposed `gap-priority` command described here are recommended Martenweave improvements. They should not be interpreted as guarantees of the current scorecard, canonical schema, Workbench behaviour or CLI unless separately implemented and published.

Martenweave is independent and is not affiliated with or endorsed by SAP.
