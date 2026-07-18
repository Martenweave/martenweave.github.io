# How to Explain Lineage and Impact to Business Owners Without Showing Them a Graph Database

**Reviewed: 14 July 2026**

A data architect opens a lineage viewer during a business review.

The screen contains:

- dozens of nodes;
- colour-coded edges;
- table and field names;
- transformation objects;
- source-system identifiers;
- confidence scores;
- several levels of upstream and downstream relationships.

The architect explains that the graph contains everything the business owner asked for.

The business owner asks:

> Can the Product MRP Controller be changed safely before cutover?

The graph is technically complete.

The answer is still unclear.

Business owners rarely need to inspect the underlying graph structure. They need the graph translated into a decision:

- what the data means;
- where it comes from;
- how it is created;
- where it is used;
- what would change;
- which risks remain;
- who must approve;
- what evidence supports the conclusion.

> A lineage system should store technical precision and present business consequences.

The graph is an internal reasoning structure.

It should not dictate the review format.

Martenweave’s backend-first model is suited to this separation. Canonical objects and typed references can support deterministic validation, lineage and impact analysis, while a local viewer or generated report can present ownership, evidence, validation state and impact context without making the generated index the source of truth.

The objective is not to hide technical detail.

It is to reveal it progressively, beginning with the decision the owner must make.

---

# The business owner does not need a node list

A technical trace might return:

```text
ATTR-PRODUCT-PLANT-MRP-CONTROLLER
FEP-LEGACY-PLANNER-GROUP
FEP-LEGACY-SITE
MAP-PLANNER-GROUP-TO-MRP-CONTROLLER
RULE-MRP-CONTROLLER-REQUIRED
FEP-S4-MARC-DISPO
EVID-MOCK3-MRP-CONTROLLER
DEC-PLANT-PLANNING-017
```

This output is valuable to the system.

It is not a useful opening statement in a meeting.

The business translation is:

> MRP Controller is assigned per Product Plant. It is currently derived from legacy Planner Group and mapped plant. The target field is populated for 94 percent of Product Plant records. Six percent use a temporary default in plants PL20 and PL30. Changing the derivation now would affect production-planning ownership, the cutover file and the first planning run.

Both representations describe the same graph.

The second tells the owner what matters.

---

# Start with the business question

A lineage review should not begin with:

> Here is the full upstream graph.

It should begin with the specific decision.

Examples:

```text
Can this field become mandatory?

Can this source system be retired?

Can this custom SAP field be replaced?

Can we accept the current fallback?

Which records would require correction?

Which downstream processes depend on this value?

Does this test result prove readiness?
```

The query determines which slice of the graph should be shown.

A request to approve a value-list change needs a different view from a request to investigate a cutover defect.

---

# Translate the graph into five business questions

A reliable business-facing explanation can follow five questions.

## 1. What is this value?

State:

- business name;
- plain-language definition;
- Entity and organisational context;
- why the value matters.

## 2. How is it created?

State:

- authoritative source;
- relevant inputs;
- transformation;
- fallback;
- manual intervention.

## 3. Where is it used?

State:

- SAP target;
- downstream interfaces;
- reports;
- process controls;
- Rules.

## 4. What happens if it changes?

State:

- affected populations;
- systems;
- business processes;
- validations;
- migration cycles;
- historical interpretation.

## 5. What decision is required?

State:

- options;
- recommendation;
- unresolved evidence;
- required approvers;
- deadline.

This structure is more useful than navigating the graph node by node.

---

# Business meaning comes before the field name

Consider the SAP field:

```text
MARC-DISPO
```

A technical audience may recognise it.

A business owner should first see:

```text
Business concept:
MRP Controller

Context:
one value per Product and Plant

Purpose:
identifies the planning responsibility used in operational material planning
```

Only then show:

```text
SAP implementation:
Product Plant MRP Controller field
```

The field is evidence of implementation.

The business concept is the subject of the decision.

This distinction becomes critical when:

- a custom field is replaced;
- one concept exists in several systems;
- the same label is used at several organisational levels;
- a field name remains stable while its meaning changes.

---

# Explain grain in business language

Technical descriptions often say:

```text
Cardinality:
Product 1:N Product Plant
```

A business explanation says:

> The value is not global for the Product. The same Product can have a different MRP Controller in each Plant.

Another example:

```text
Customer partner function belongs to Customer Sales Area.
```

Business translation:

> The Payer or Ship-to assignment may differ by Sales Organisation, Distribution Channel and Division. One central customer assignment cannot safely be copied everywhere.

For Cost Centres:

> Validity is evaluated within the Controlling Area and time period. Creating the Cost Centre is not enough if its valid-from date begins after go-live.

Grain is often the hidden reason a change is risky.

It must be explained without requiring the owner to interpret a schema diagram.

---

# Use a one-page Attribute brief

For a critical Attribute, the default business view should be a compact brief.

## Example: Product Plant MRP Controller

**Meaning**

Person or planning group responsible for material planning for a Product in one Plant.

**Current source**

Legacy Planner Group combined with the mapped Plant.

**Transformation**

Plant-specific conversion table.

**SAP implementation**

Product Plant MRP Controller.

**Current readiness**

94 percent assigned through approved Mapping.

**Exceptions**

6 percent use temporary default `001` in PL20 and PL30.

**Business effect**

Incorrect assignments may send planning exceptions and material requirements to the wrong team.

**Decision required**

Either approve the temporary default through the first planning cycle or provide the missing plant-specific conversion.

**Owners**

Production Planning Data Owner, Plant PL20 lead and Plant PL30 lead.

**Evidence**

Mock Load 3 profile and planning simulation.

This page can be generated from a much larger graph.

The business owner does not need to see every graph edge unless a detail is disputed.

---

# Show the normal path first

Most owners need to understand the intended route before reviewing exceptions.

A plain-language lineage statement can be:

> Legacy Planner Group and Plant are converted through the approved plant-specific Mapping. The result is written to the SAP Product Plant MRP Controller field.

A compact visual form can be:

```text
Legacy planning responsibility
+
Plant
→ approved conversion
→ SAP Product Plant MRP Controller
```

This keeps:

- business input;
- context;
- transformation;
- target.

It removes:

- internal IDs;
- graph direction codes;
- technical storage details.

The user can expand the path when needed.

---

# Then show exceptions separately

Do not mix normal and exceptional paths into one diagram.

For the same MRP Controller example:

```text
Approved path:
Planner Group + Plant → plant-specific MRP Controller

Temporary fallback:
Missing conversion → default controller 001

Affected scope:
PL20 and PL30

Population:
6% of Product Plant records

Expiry:
before first production planning cycle
```

This makes the fallback visible without making the entire lineage view confusing.

It also prevents the fallback from appearing equally valid to the normal path.

---

# Example 1: Supplier bank account

A graph might connect:

```text
bank country
bank key
account number
IBAN
supplier
bank Mapping
validation Rule
SAP bank endpoint
payment process
```

The business owner needs a different explanation.

## What it is

Bank account approved for Supplier payments.

## How it is created

The source bank details are normalised and checked according to country-specific requirements. IBAN is used where applicable. Account ownership must be associated with the correct Supplier legal entity.

## Where it matters

- payment proposal;
- payment execution;
- fraud and duplicate-account review;
- Treasury or Accounts Payable controls.

## Current risk

680 payment-active suppliers have technically valid bank data but incomplete ownership verification.

## Change impact

Relaxing the ownership Rule would increase technical readiness but weaken payment-control assurance.

## Decision

Do not approve the relaxation. Keep affected suppliers payment-blocked until evidence is complete.

The owner does not need to inspect every bank-field edge to understand the decision.

---

# Use business outcome, not target persistence, as the final node

For Supplier Bank Account, the lineage should not end with:

```text
SAP field populated
```

The business-facing outcome is:

```text
Supplier can be paid through the intended controlled process
```

For Product MRP Type:

```text
Product participates correctly in plant planning
```

For Customer Partner Function:

```text
orders, deliveries and invoices use the intended business partners
```

For Cost Centre:

```text
postings are accepted in the correct period and organisational context
```

For Tax Identifier:

```text
the legal identity is represented using the correct country-specific category
```

Business owners care about whether the data works.

The physical target is one stage in that explanation.

---

# Example 2: Product units of measure

A technical trace may contain:

```text
legacy unit code
canonical unit
conversion numerator
conversion denominator
SAP base unit
SAP alternative unit
warehouse interface code
sales interface code
```

The business explanation is:

> The Product is stocked in pieces and sold in boxes. One box equals twelve pieces. SAP stores `PC` as the base unit and `BOX` as the sales unit. The warehouse interface currently sends `EA`, which has not been confirmed as equivalent to `PC`.

The impact statement is:

> Changing the base unit would affect inventory balances, open documents, conversion ratios, warehouse messages and sales-order quantities. Renaming the display label alone would not have the same impact.

The decision statement is:

> Keep `PC` as the base unit. Add an explicit `EA` to `PC` interface conversion rather than changing the Product master.

This is lineage-based reasoning without graph terminology.

---

# Explain direct and conditional inputs differently

A technical lineage model may distinguish direct and indirect dependencies. OpenLineage, for example, models which input fields produce an output field and can distinguish direct transformations from indirect influences such as joins, filters and conditional logic.

The business explanation should preserve the distinction.

Example: Profit Centre derivation.

```text
Product Family:
determines the profit-centre category

Plant:
selects the relevant organisational Mapping

Company assignment:
checks whether the selected Profit Centre is permitted
```

Do not say:

> Three fields populate Profit Centre.

Instead:

> Product Family supplies the main classification. Plant determines which local conversion applies. Company assignment validates whether the result is allowed.

This is clearer and more accurate.

---

# Example 3: Cost Centre validity

A business owner asks:

> Why is the Cost Centre migration blocked when all records were created?

A graph may show a complete source-to-target path.

The business explanation is:

> All Cost Centres were technically created. However, 74 active Cost Centres have a valid-from date after the planned go-live date. They will exist in SAP but cannot accept postings on day one.

The impact statement is:

- postings may fail;
- allocations may fail;
- dependent orders may reference unavailable Cost Centres;
- Finance may need manual correction after go-live.

The decision options are:

1. correct source validity dates;
2. approve target-date adjustment with Finance;
3. defer affected business scope.

The key message is that object creation and operational readiness are different.

---

# Present impact as categories, not as a neighbour count

A graph query might return:

```text
37 impacted objects
```

That number does not help the owner.

Group impact into business categories.

## Data impact

Which records or populations may change?

## Process impact

Which operational activities may behave differently?

## Control impact

Which Rules, approvals or legal checks must change?

## Integration impact

Which interfaces and consumers need updates?

## Reporting impact

Which metrics or historical comparisons may change?

## Delivery impact

Which tests, migration cycles or cutover steps must be repeated?

## Ownership impact

Who must approve or act?

For a value-list change, this structure is more useful than listing every connected node.

---

# Example 4: Supplier tax category

A proposal changes the interpretation of a tax category.

The technical impact graph identifies:

- source tax field;
- conversion Mapping;
- SAP tax-number category;
- validation Rule;
- two interfaces;
- one report;
- historical evidence.

The business summary should say:

**Proposed change**

Move a national tax identifier from a generic category to the country-specific category.

**Affected population**

12,400 suppliers in one jurisdiction.

**Data consequence**

Existing target values require reassignment, not only relabelling.

**Process consequence**

Supplier onboarding and invoice validation use the category.

**Control consequence**

Legal-format checks and duplicate detection must be rerun.

**Historical consequence**

Earlier reports must remain interpretable under the old category.

**Decision**

Approve only with a controlled conversion and legal-owner confirmation.

This is what impact analysis is for.

---

# Explain confidence explicitly

Not every lineage conclusion has the same evidence quality.

Business-facing terms can be:

## Confirmed

Supported by approved model and current evidence.

## Expected

Declared in the design but not fully tested.

## Observed

Seen in a dataset or implementation but not yet approved as model truth.

## Possible

Connected through an indirect or incomplete path.

## Disputed

Credible sources or owners disagree.

## Historical

Applied to an earlier baseline.

These terms are easier to interpret than:

```text
edge confidence: 0.73
```

The numerical confidence can remain available for technical use.

---

# Do not present inferred lineage as fact

AI or metadata analysis may suggest:

> The legacy `PLANNER_CODE` field probably maps to MRP Controller.

The business view should say:

```text
Candidate source:
Legacy Planner Code

Reason:
name and observed values align

Status:
not approved

Required evidence:
Plant-owner review and conversion-table confirmation
```

Do not draw the same solid line used for approved lineage.

A plausible connection can influence a major decision.

Its status must remain visible.

---

# Example 5: Customer partner functions

A business owner asks:

> What happens if we simplify all missing Payers to the Sold-to party?

The lineage-based answer should not begin with table names.

It should say:

> The proposal affects Customer Sales Area partner assignments. For 82 percent of customers, Sold-to and Payer are already the same. For 18 percent, a separate Payer exists or is unresolved. Applying the default globally would change billing responsibility for those customers and could affect invoice routing and credit processing.

Then show:

**Confirmed impact**

- Customer Sales Area partner assignments;
- billing-document partner determination;
- unresolved external Payer references.

**Possible impact**

- credit exposure consolidation;
- invoice delivery;
- downstream customer interfaces.

**Required decision**

The commercial process owner must decide whether self-Payer is an acceptable bounded fallback. The migration team should not decide this from technical convenience.

That is business-readable impact.

---

# Use scenarios instead of raw dependency chains

A business owner often understands scenarios better than graph topology.

For a proposed change, present three cases.

## Scenario A: no change

State:

- current risk;
- current fallback;
- operational consequence.

## Scenario B: proposed change

State:

- records affected;
- process impact;
- required remediation;
- evidence gap.

## Scenario C: safer alternative

State:

- reduced scope;
- staged transition;
- additional control;
- different timing.

Example: Product profit centre.

### No change

Nine percent of Product Plant records retain a temporary regional Profit Centre.

### Proposed global remapping

All affected records move to a new plant-specific derivation before go-live.

Risk: insufficient time for Finance review.

### Safer alternative

Keep the bounded cutover fallback, block new use after go-live and complete correction before first month-end close.

The graph supports all three scenarios.

The owner sees the trade-off.

---

# Impact should distinguish “must change” from “must review”

A connected object is not always broken by a proposal.

Use categories:

## Change required

The object will become invalid or incompatible.

## Retest required

The object may remain valid, but evidence no longer applies.

## Review required

Business compatibility must be confirmed.

## Notify

The owner should be aware, but no change is expected.

## Historical only

The reference should remain unchanged.

Example: replacing a custom Supplier Review Status field.

```text
Migration Mapping:
change required

SAP validation:
change required

Outbound interface:
retest required

Business definition:
review required

Old mock-load report:
historical only
```

This is more useful than saying all five objects are “impacted.”

---

# Example 6: Product serial-number profile

A technical change proposal replaces one serial-number profile with another.

The business-facing explanation should state:

**Current use**

The profile controls how serial numbers are handled during goods movements and delivery processing.

**Affected scope**

Products in plants PL10 and PL40.

**Direct impact**

Product Plant master data and warehouse transactions.

**Retest required**

Goods receipt, stock transfer and outbound delivery scenarios.

**Possible impact**

External warehouse messages and after-sales traceability.

**Historical impact**

Previously posted stock movements remain under the old profile.

**Decision**

Operations and warehouse owners must approve. A Product master-data owner alone cannot determine process compatibility.

This explanation comes from lineage and impact relationships.

It does not require the owner to inspect the underlying graph.

---

# Use progressive disclosure

A good business-facing interface can use three levels.

## Level 1: decision summary

One paragraph:

> Changing this value affects 8,420 Product Plant records and the first production planning cycle. The approved path is incomplete in two plants because a temporary fallback is still active. Approval is conditional on a remediation date and plant-owner acceptance.

## Level 2: structured explanation

Show:

- meaning;
- source;
- transformation;
- target;
- uses;
- evidence;
- risks;
- owners.

## Level 3: technical evidence

Allow expansion into:

- object IDs;
- physical fields;
- graph paths;
- Mapping definitions;
- dataset profiles;
- exact diagnostics;
- commit and baseline.

The graph remains accessible.

It is not the first thing every user sees.

---

# Do not oversimplify uncertainty

Business-friendly does not mean falsely simple.

Avoid:

> Product MRP Controller comes from the legacy system.

Prefer:

> For PL10 and PL40, MRP Controller is derived from Planner Group through approved plant-specific conversion. For PL20 and PL30, six percent of records still use a temporary default.

Avoid:

> Tax Identifier is ready.

Prefer:

> The identifier is present for 98 percent of suppliers. Country and category validation is complete for 88 percent. Legal evidence remains incomplete for one population.

Avoid:

> The interface is affected.

Prefer:

> The interface currently consumes the old code list. It must be tested against the new value before the change can be approved.

Precision builds trust.

---

# Show affected populations

An owner needs scope.

State:

- number of records;
- percentage;
- countries;
- plants;
- company codes;
- Sales Organisations;
- migration waves;
- active versus historical records.

Example:

```text
Affected records:
8,420 Product Plant assignments

Plants:
PL20 and PL30

Share of Wave 1 scope:
12%

Critical subset:
2,100 externally procured Products
```

This is more actionable than:

```text
Impact depth: 3
```

---

# Show the operational deadline

Impact is incomplete without timing.

Examples:

```text
Must be resolved before:
Cutover extract freeze
```

```text
May remain temporarily, but must close before:
First payment run
```

```text
Correction required before:
First MRP planning cycle
```

```text
Retest required before:
Interface production activation
```

Timing turns model analysis into a delivery decision.

---

# Example 7: Supplier purchasing block

A proposal removes a purchasing block because the central Supplier record appears active.

The lineage-based explanation is:

> The block is not central. It exists at Purchasing Organisation level and was sourced from a local procurement system. Removing it globally would affect 540 suppliers, including 73 under an unresolved compliance review.

Impact categories:

**Procurement**

Purchase orders may become possible.

**Compliance**

Local review controls may be bypassed.

**Data**

The central Supplier status would remain unchanged.

**Scope**

Only two Purchasing Organisations are affected.

**Decision**

Procurement and Compliance owners must decide whether the local block represents active policy or obsolete source data.

The graph tells the system where the block came from.

The business summary tells people what removing it would do.

---

# Example 8: Payment Terms

A proposal copies one Supplier Payment Term to every Company Code.

Business explanation:

> The source provides one central term, but SAP stores the operational term by Company Code. Three Company Codes have approved local terms. Copying the central value globally would overwrite local Finance policy.

Affected areas:

- invoice due-date calculation;
- cash forecasting;
- local vendor agreements;
- payment runs;
- reconciliation.

Recommendation:

> Use the central term only where no approved company-code term exists. Treat local values as contextual authority, not exceptions to be overwritten.

This is a source-authority and impact issue presented in business terms.

---

# Tailor the same lineage to different roles

The underlying graph is shared.

The explanation should change by audience.

## Data owner

Needs:

- definition;
- source authority;
- Rules;
- exceptions;
- approval.

## Process owner

Needs:

- operational effect;
- scenarios;
- failure modes;
- process tests.

## Local business owner

Needs:

- local population;
- local overrides;
- deadlines;
- required actions.

## Migration lead

Needs:

- Mapping coverage;
- dataset gaps;
- cutover consequence;
- retest scope.

## Integration owner

Needs:

- interface fields;
- code lists;
- contract changes;
- downstream consumers.

## Auditor or governance lead

Needs:

- Decision;
- evidence;
- approval;
- historical path;
- exception control.

One graph can generate several role-specific summaries.

---

# Separate model truth from observed evidence

The business view should state both.

Example: Supplier bank account.

**Approved model**

IBAN and bank-country data must be validated and linked to the correct Supplier legal entity.

**Observed result**

The latest mock load populated 99.4 percent of bank records, but ownership verification is complete for 93.1 percent.

**Interpretation**

The technical load is nearly complete. Payment readiness is not.

OpenLineage’s object model similarly separates design-time metadata from individual runtime observations, allowing stable definitions and particular executions to coexist without being confused.

This distinction is valuable even when OpenLineage itself is not used as the registry.

---

# Evidence should be summarised by claim

Do not present:

```text
Evidence files: 14
```

Present:

| Claim | Status |
|---|---|
| Source field available | Confirmed |
| Mapping approved | Confirmed |
| Required context complete | Partial |
| SAP target populated | Confirmed |
| Downstream process tested | Not tested |
| Business owner accepted | Pending |

This helps the owner understand what is known.

The file list can remain one click deeper.

---

# Use evidence language carefully

Different evidence proves different things.

## Source profile

Proves that fields and values were observed.

## Mapping test

Supports transformation behaviour.

## Target validation

Supports SAP persistence.

## Process test

Supports operational use.

## Business approval

Supports acceptance of meaning and risk.

A target screenshot does not prove source authority.

A successful interface run does not prove correct business interpretation.

A signed decision does not prove every record was transformed correctly.

Business summaries should avoid overstating evidence.

---

# Present contradictions directly

A useful system should not smooth over disagreement.

Example:

```text
Approved source:
national tax registry

Observed source:
legacy ERP extract

Business owner position:
registry should be authoritative

Current cutover implementation:
ERP value is loaded when registry value is absent
```

Business-facing conclusion:

> The current fallback is operationally active but not yet approved as an authority policy. Cutover approval requires either a bounded fallback Decision or remediation of the registry gap.

This is clearer than showing two upstream arrows with different colours.

---

# Show negative knowledge

A business owner may need to know what must not happen.

Examples:

```text
Review Status must not be loaded as Supplier Risk.

CRM Segment must not be copied directly into Customer Group.

A central Payment Term must not overwrite approved Company Code terms.

Product base unit must not be changed to fix an interface-code mismatch.

Historical Cost Centre values must not be reinterpreted under the new validity policy.
```

These rejected paths are part of governance.

They prevent future teams and agents from recreating known mistakes.

---

# Meeting format: the seven-line decision brief

For a normal review meeting, the following can be enough.

```text
Decision:
Approve plant-specific MRP Controller fallback through first planning cycle?

Business concept:
MRP Controller per Product Plant.

Current path:
Planner Group + Plant → approved conversion → SAP.

Exception:
6% use default 001 in PL20 and PL30.

Impact:
Planning responsibility and exception routing may be inaccurate.

Evidence:
Mock Load 3 and plant planning simulation.

Recommendation:
Conditional approval with plant-owner acceptance and fixed remediation date.
```

This is generated from lineage.

It does not look like a graph-database query result.

---

# Working-session format: the impact canvas

For more complex changes, use a structured canvas.

## Proposed change

What exactly changes?

## Business reason

Why is the change needed?

## Current lineage

How is the value created now?

## Candidate lineage

How would it be created after the change?

## Affected scope

Which records, contexts and systems?

## Controls

Which Rules, approvals and validations?

## Evidence

What has been tested?

## Residual risk

What remains uncertain?

## Decision

Who approves and under which conditions?

This format works for:

- source retirement;
- target replacement;
- value-list changes;
- Mapping redesign;
- Rule changes;
- fallback approval.

---

# Executive format: only the material consequences

Senior stakeholders may need only:

```text
Change:
Replace temporary regional Profit Centre default with plant-specific derivation.

Affected:
1,842 Product Plant records across two plants.

Business risk:
Incorrect responsibility assignment before month-end close.

Current evidence:
Target field populated; Finance approval incomplete.

Recommendation:
Allow cutover fallback, require correction before first close.

Decision owners:
Finance Data Owner and Plant Controllers.
```

The full graph remains available for challenge and audit.

---

# Use comparisons

Owners understand differences between current and proposed states.

Example: Cost Centre validity.

| Topic | Current state | Proposed state |
|---|---|---|
| Validity source | Legacy dates | Finance-approved dates |
| Go-live coverage | 94% | 100% |
| Manual correction | 74 records | None expected |
| Posting test | Partial | Required |
| Historical interpretation | Preserved | Preserved |

This is often clearer than a future-state lineage diagram alone.

---

# Use impact language consistently

Recommended terms:

```text
Affected:
relationship confirms relevance

Potentially affected:
indirect or uncertain dependency

Change required:
candidate becomes incompatible

Retest required:
old evidence is no longer sufficient

Review required:
business compatibility is unresolved

Historical only:
retain without changing
```

Consistent vocabulary makes reports comparable.

---

# Avoid technical theatre

A complicated graph can create an impression of precision without delivering a decision.

Warning signs include:

- hundreds of nodes shown by default;
- unexplained colour coding;
- centrality scores presented as business importance;
- database terminology in executive reports;
- every connected object labelled “impacted”;
- no affected record count;
- no owner;
- no recommendation;
- no evidence quality.

The business view should be simpler because the underlying model is structured—not because detail was discarded.

---

# Keep stable IDs available for audit

Business summaries should use plain names.

They should also preserve canonical IDs in metadata or expandable detail.

Example:

```text
Business name:
Product Plant MRP Controller

Canonical ID:
ATTR-PRODUCT-PLANT-MRP-CONTROLLER

SAP endpoint:
FEP-S4-MARC-DISPO
```

Stable IDs allow:

- issue linking;
- proposal generation;
- automated validation;
- historical comparison;
- exact technical follow-up.

The owner does not need to memorise them.

The system must preserve them.

---

# Example 9: Credit limit

A proposal changes the source of Customer Credit Limit.

Business explanation:

> Credit Limit is currently sourced from the legacy credit system and loaded into the SAP credit-management structure. The candidate design derives it from risk category and historical exposure. This would change the Attribute from an approved amount to a calculated amount.

Impact:

- credit review;
- order blocking;
- existing limits;
- source authority;
- audit trail;
- local credit-manager responsibility.

The critical question is not:

> Can the formula populate the field?

It is:

> Is the organisation changing the meaning and ownership of Credit Limit?

This is a semantic change disguised as a Mapping change.

---

# Example 10: Product valuation class

A proposed value-list simplification merges two valuation classes.

Business summary:

> Two Product valuation classes currently separate spare parts from production materials. The proposal merges them because both map to the same account in one company code. Other company codes use different account determination.

Impact:

- account determination;
- inventory posting;
- company-code-specific configuration;
- historical reporting;
- Product classification.

Recommendation:

> Do not approve a global merge based on one company code. Assess the value by valuation area and Finance context.

The graph may reveal all connected account-determination and Product objects.

The business explanation shows why the global change is unsafe.

---

# Explain “no impact” carefully

A graph may find no downstream dependency.

Do not simply state:

```text
No impact.
```

Prefer:

> No modelled downstream dependency was found in the current repository. The result does not prove that external or undocumented consumers do not exist.

Confidence depends on:

- repository coverage;
- interface inventory;
- runtime evidence;
- owner review.

A business owner should understand the limit of the analysis.

---

# Impact confidence should depend on coverage

Possible statements:

```text
High confidence:
all known interfaces and current runtime evidence are represented.

Medium confidence:
core SAP and migration paths are covered; reporting inventory is incomplete.

Low confidence:
only repository references were assessed; external consumers remain unverified.
```

This avoids presenting graph completeness as landscape completeness.

---

# Business owners should approve meaning and risk, not technical edges

A business owner should not be asked to approve:

```text
REL-00482
MAPS_TO
FEP-00891
```

They should approve:

> Legacy Product Family and Plant may be used to derive Profit Centre under the reviewed conversion. The regional default is permitted only through first month-end close.

Technical reviewers confirm:

- endpoints;
- fields;
- transformation implementation;
- schema compatibility.

Business reviewers confirm:

- meaning;
- authority;
- applicability;
- fallback;
- acceptable risk.

The review system should reflect this division.

---

# Human approval should be recorded at the right level

A Mapping may be technically correct but business-unapproved.

A business Decision might approve the principle while implementation remains untested.

Use separate states:

```text
Business meaning approved

Technical Mapping validated

Runtime evidence verified

Release accepted
```

Do not reduce them to one `approved: true` flag.

---

# What Martenweave should generate

Martenweave should preserve the complete graph internally and generate several business-facing outputs.

## Attribute brief

Explains one business concept.

## Source-policy brief

Explains authority, enrichment and fallback.

## Change-impact brief

Explains current state, proposed state and consequences.

## Readiness brief

Explains evidence, blockers and conditions.

## Incident trace brief

Explains source, load, target and downstream defect.

## Decision record

Captures options, rationale, owner and approval.

These can be static Markdown, JSON or local viewer pages generated from canonical data.

The generated presentation remains disposable.

The canonical model remains the source of truth.

---

# A focused Martenweave implementation slice

Martenweave already has the architectural foundation:

- canonical model objects;
- generated indexes;
- trace and impact analysis;
- Evidence and Decisions;
- ownership and validation context;
- local static and interactive review surfaces;
- proposal-first changes.

The next vertical slice should add **business-facing lineage briefs**.

## Goal

Translate one canonical lineage or impact result into a decision-ready business explanation.

## Initial outputs

- Attribute brief;
- change-impact brief;
- source and fallback brief;
- readiness brief.

## Required sections

1. Business meaning.
2. Context and grain.
3. Current source path.
4. Target and business use.
5. Exceptions and fallback.
6. Affected population.
7. Impact categories.
8. Evidence status.
9. Decision required.
10. Owners.

## Acceptance criteria

For Product MRP Controller, the brief must explain:

- one value per Product Plant;
- current plant-specific derivation;
- percentage using temporary default;
- effect on planning responsibility;
- required decision and owners.

For Supplier Bank Account, it must distinguish:

- target-field population;
- account validation;
- ownership verification;
- payment readiness.

For Cost Centre validity, it must explain why technically created records may still be unusable at go-live.

## Existing analysis commands

```bash
martenweave trace \
  ATTR-PRODUCT-PLANT-MRP-CONTROLLER \
  --repo ./model

martenweave impact \
  FEP-S4-PRODUCT-PLANT-MRP-CONTROLLER \
  --repo ./model
```

## Future brief generation

```bash
martenweave brief \
  ATTR-PRODUCT-PLANT-MRP-CONTROLLER \
  --audience business-owner \
  --repo ./model
```

The `brief` command describes a recommended direction rather than a current documented CLI contract.

---

# Final perspective

Business owners do not need less truth.

They need the truth organised around the decision they are responsible for.

The graph should preserve:

- exact object identity;
- typed relationships;
- source and target endpoints;
- transformation semantics;
- Rules;
- Evidence;
- Decisions;
- historical states.

The business explanation should answer:

```text
What is this?

How is it created?

Where is it used?

What changes?

Who is affected?

What evidence exists?

What must be decided?
```

The practical test is:

> Can a business owner understand the consequence of changing Product MRP Controller, Supplier Bank Account, Cost Centre validity or Tax Identifier category without interpreting a graph-database visualisation?

When the answer is yes, lineage supports governance.

When the answer is:

> Here are 64 connected nodes,

the system has exposed its internal model but has not completed the translation into a business decision.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It stores precise canonical relationships so that different audiences can receive different explanations without creating separate versions of model truth.

The purpose is not to hide the graph.

It is to make the graph useful to people who should not need to think like graph engineers.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave Core currently defines itself as a backend-first model-governance and evidence layer. Canonical files remain the source of truth, generated SQLite and JSONL indexes are disposable, validation precedes lineage and impact analysis, and AI-assisted changes require human review.

The current CLI exposes health, scorecard, trace, impact, search, query, repository diff and dataset-readiness operations. These provide the inputs from which business-facing briefs can be generated.

OpenLineage’s current object model distinguishes design-time Job and Dataset metadata from runtime Run observations. It also represents Jobs, Runs and Datasets separately so that stable definitions and individual execution events do not need to be collapsed into one representation.

OpenLineage’s column-level lineage facet represents which input columns contribute to output columns and how. Its transformation metadata distinguishes direct relationships from indirect influences, providing a useful technical foundation that can be translated into plain descriptions such as “supplies the value,” “selects the applicable conversion” or “filters the affected population.”

The proposed business briefs, impact categories and `brief` command describe a recommended Martenweave direction. They should not be interpreted as guarantees of the current canonical schema, viewer or CLI unless separately implemented and published.

Martenweave is independent and is not affiliated with or endorsed by SAP or OpenLineage.
