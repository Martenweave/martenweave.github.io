# How Lineage Supports AMS Root-Cause Analysis After Go-Live

**Reviewed: 14 July 2026**

A production incident arrives in the AMS queue:

> Supplier cannot be paid.

The ticket contains:

- Supplier number;
- company code;
- payment run;
- screenshot of an error;
- priority marked as high.

The first assumption is that the migrated bank account is wrong.

An analyst checks the Business Partner and finds:

- bank country populated;
- IBAN populated;
- account number populated;
- bank details active.

The bank-data migration appears correct.

Further investigation shows that the Supplier has no permitted Payment Method for the relevant Company Code.

The operational symptom was a failed payment.

The affected Supplier contained bank data.

The root cause belonged to another business Attribute and another part of the model.

Without governed lineage, the analyst may:

- edit the bank record unnecessarily;
- reopen the wrong migration Mapping;
- assign the ticket to the wrong support team;
- close the incident after a manual workaround;
- fail to recognise that hundreds of Suppliers share the same Company Code gap.

With lineage, the investigation can move through a structured path:

```text
Payment failure
→ Supplier and Company Code context
→ payment-control Attributes
→ SAP endpoints
→ source Mappings
→ cutover evidence
→ affected population
```

> Root-cause analysis in AMS should connect an operational symptom to the smallest governed model condition that explains it.

This is not the same as identifying the first technical error message.

It is not the same as finding the first blank field.

It is not the same as locating the last interface that failed.

A production incident may originate in:

- master-data meaning;
- source authority;
- migration transformation;
- organisational context;
- SAP configuration;
- interface conversion;
- incomplete target extension;
- expired fallback;
- operational process;
- manual post-go-live correction.

Lineage helps the team distinguish these possibilities before changing production data.

---

# AMS receives symptoms, not model objects

Business users do not report:

> `ATTR-SUPPLIER-COMPANY-CODE-PAYMENT-METHOD` is missing.

They report:

> The Supplier cannot be paid.

They do not report:

> The Product Plant extension has no valid MRP Type Mapping.

They report:

> MRP did not create the expected purchase requisition.

They do not report:

> Payer partner-function lineage is incorrect for Sales Organisation 2200.

They report:

> The invoice went to the wrong company.

The AMS process must translate symptoms into model questions.

A useful first step is:

```text
business symptom
→ process step
→ business object
→ organisational context
→ candidate Attributes
```

Only then should the team descend into:

- tables;
- fields;
- APIs;
- jobs;
- transports;
- logs.

The technical layer matters.

Starting there too early creates a wide search with weak business context.

---

# Root cause is not the same as the failing component

An interface can fail because:

- its payload is malformed;
- the source master data is missing;
- the target code list changed;
- the interface Mapping is wrong;
- the consumer rejects a semantically valid value;
- the master record exists at the wrong organisational level.

The interface is where the failure appeared.

It may not be where the defect originated.

Similarly, an SAP validation can block a transaction because:

- the master data is wrong;
- the Rule is implemented incorrectly;
- the Rule is correct but the record followed an unapproved fallback;
- the process uses the Attribute earlier than the migration design assumed.

Root-cause analysis needs a dependency path.

Without it, teams confuse:

```text
failure location
```

with:

```text
defect origin
```

---

# Three layers of AMS investigation

A lineage-based investigation can separate three layers.

## Business symptom

What failed in operational language?

Examples:

- payment rejected;
- purchase requisition not created;
- invoice routed incorrectly;
- posting blocked;
- tax document rejected;
- delivery schedule wrong.

## Operational evidence

What was observed?

Examples:

- error message;
- failed job;
- rejected interface message;
- field value;
- missing organisational extension;
- production record;
- recent change;
- affected population.

## Canonical model

What should exist and how should it be produced?

Examples:

- business Attribute;
- parent Entity;
- source authority;
- Mapping;
- Rule;
- SAP endpoint;
- fallback;
- Decision;
- evidence from migration or testing.

The investigation compares operational evidence with the canonical model.

The model should not be changed simply because production differs.

The difference may be an implementation defect.

---

# Begin with the exact business context

An incident becomes actionable when its context is precise.

For a Supplier payment issue, collect:

- Supplier;
- Company Code;
- payment method;
- bank account;
- payment block;
- payment terms;
- currency;
- relevant payment run.

For a Product planning issue:

- Product;
- Plant;
- MRP Area where applicable;
- procurement type;
- MRP Type;
- MRP Controller;
- planning parameters;
- operational scenario.

For a Customer billing issue:

- Customer;
- Sales Organisation;
- Distribution Channel;
- Division;
- partner role;
- billing document;
- related Ship-to, Bill-to or Payer.

The same central object may behave correctly in one context and fail in another.

A Supplier can be valid centrally and unusable in one Company Code.

A Product can exist globally and lack a Plant extension.

A Customer can have the correct Payer in one Sales Area and the wrong one elsewhere.

Root-cause analysis without organisational context produces false conclusions.

---

# Example 1: Supplier payment failure

## Symptom

A payment proposal excludes a Supplier.

## First hypothesis

Bank data is missing.

## Operational observation

- IBAN exists;
- bank account is active;
- no bank-data validation error appears;
- Payment Method is blank in the relevant Company Code.

## Canonical lineage

```text
legacy payment instruction
+
Company Code
→ Payment Method Mapping
→ Supplier Company Code Payment Method
→ payment process
```

## Root cause

The migration source contained one central payment instruction.

The target required Company Code-specific Payment Method assignment.

The Mapping did not cover one acquired Company Code.

## Corrective action

- correct affected Supplier Company Code records;
- update the Mapping or source policy;
- identify other Suppliers in the same context;
- add a regression check.

## Incorrect corrective action

Changing bank details because the incident was raised as a payment problem.

The value of lineage is not only faster diagnosis.

It prevents damage caused by fixing the wrong Attribute.

---

# Correct one record or correct the model?

AMS teams must distinguish two questions:

```text
How do we restore service for this record?
```

and:

```text
Why could this defect occur, and which other records are exposed?
```

The first may require an immediate data correction.

The second may require:

- Mapping change;
- Rule change;
- source remediation;
- interface correction;
- fallback retirement;
- model clarification.

Closing the incident after correcting one record can leave the root cause active.

A lineage trace should identify the model path shared by similar records.

---

# Example 2: Product not planned

## Symptom

A Product is not included correctly in material planning.

## Operational observation

- Product exists;
- Plant extension exists;
- MRP Type is `ND`;
- business expects `PD`.

## Approved path

```text
legacy planning method
+
Plant
→ plant-specific conversion
→ Product Plant MRP Type
```

## Production path

The Product belonged to a Plant missing from the conversion table.

A cutover default assigned `ND`.

## Immediate correction

Change the affected Product Plant MRP Type after business approval.

## Root-cause action

- identify all records using the fallback;
- determine whether the fallback has expired;
- add missing plant-specific conversion;
- reassess first planning-run evidence;
- prevent new records from using the default.

The incident is not merely “wrong MRP Type.”

It is evidence that a temporary fallback remained operational after its intended period.

---

# Fallbacks become AMS risk when their expiry is forgotten

Migration programmes often approve temporary paths:

- default MRP Controller;
- regional Profit Centre;
- manual tax classification;
- replicated source value;
- placeholder partner assignment.

During cutover, these may be necessary.

After go-live, they can become invisible technical debt.

The model should preserve:

- why the fallback exists;
- affected scope;
- approver;
- expiry;
- reconciliation requirement;
- remediation owner.

AMS should be able to query:

```text
Which active production values were created through temporary fallbacks?
```

Without this, support teams treat later incidents as isolated data errors.

---

# Example 3: Invoice sent to the wrong Payer

## Symptom

An invoice is associated with the wrong business partner.

## First hypothesis

Customer master was replicated incorrectly.

## Context

- Sold-to Party;
- Sales Area;
- Payer role;
- Billing document.

## Approved lineage

```text
legacy billing-account relationship
+
Sales Area
→ Payer partner-function Mapping
→ SAP Customer Sales Area partner assignment
```

## Observed production state

The Sold-to Party was assigned as Payer through a self-partner fallback.

## Root cause

The external Payer existed, but its number cross-reference was unavailable during cutover.

The fallback was applied to the full Sales Area rather than only unresolved records.

## Impact

- invoice recipient;
- credit exposure;
- payment matching;
- downstream customer interfaces.

## Correct response

Do not edit the central Customer identity.

Correct the Sales Area partner assignment and investigate the bounded population that used the fallback.

Lineage identifies the right Entity grain and prevents a central-data change from being used to correct an organisational relationship.

---

# AMS needs both upstream and downstream trace

Upstream trace asks:

> How did this value get here?

Downstream trace asks:

> What uses this value?

Both matter during incident analysis.

For Product Base Unit:

```text
source unit
→ canonical unit
→ SAP Product Base Unit
→ warehouse interface
→ inventory and delivery process
```

If the warehouse rejects `PC` and expects `EA`, the root cause may be:

- incorrect Product master;
- missing interface conversion;
- inconsistent code-list governance;
- consumer assumption.

Upstream trace tests whether `PC` was created correctly.

Downstream trace tests whether consumers interpret it correctly.

Changing the Product Base Unit to satisfy one interface may corrupt inventory semantics.

---

# Example 4: Warehouse interface rejects a Product

## Symptom

A warehouse message rejects a Product because unit `PC` is unknown.

## Production data

SAP Product Base Unit is `PC`.

## Migration evidence

The approved source Mapping correctly normalised source `PCS` to canonical `PC`.

## Interface evidence

The warehouse contract expects `EA`.

## Root cause

Missing outbound interface conversion.

## Corrective action

Add or correct interface code conversion.

## Model consequence

The canonical Product Base Unit remains unchanged.

This is a strong example of lineage preventing a bad master-data correction.

The failing downstream system should not automatically redefine the governed Attribute.

---

# Root cause can belong to a Rule

Some incidents occur because data is present but control behaviour is wrong.

Example:

> Supplier became active without a required tax identifier.

Possible causes:

- Rule not implemented;
- Rule implemented as warning instead of error;
- incorrect lifecycle stage;
- local exception;
- manual override;
- category misclassification.

The lineage path includes:

```text
Tax Identifier Attribute
→ requiredness Rule
→ implementation control
→ lifecycle event
→ observed activation
```

A field trace alone cannot explain the incident.

AMS needs Rule lineage.

---

# Example 5: Tax-compliance failure

## Symptom

A Supplier invoice is rejected because the tax identifier is stored under the wrong category.

## Production state

A tax number is present.

## Initial dashboard status

Tax-number completeness: 100 percent.

## Canonical model

```text
country
+
tax-number type
+
identifier
→ category Mapping
→ SAP Business Partner tax number
```

## Root cause

The migration used a generic category for a country requiring a specific category.

## Consequence

- legal validation;
- duplicate detection;
- invoice processing;
- downstream reporting.

## AMS action

- correct the category;
- identify all records created through the same Mapping;
- update or supersede the conversion;
- rerun country-specific validation;
- preserve historical evidence explaining the correction.

The incident demonstrates why completeness is not correctness.

---

# Root-cause scope should expand from one record to one path

A single incident can reveal:

- one bad record;
- one source population;
- one Mapping version;
- one organisational context;
- one cutover batch;
- one entire Attribute design defect.

AMS should expand scope progressively.

## Level 1: record

Is this one record wrong?

## Level 2: context

Are records in the same Plant, Company Code or Sales Area affected?

## Level 3: Mapping

Did the same transformation create similar values?

## Level 4: source

Does one source system or extract contain the defect?

## Level 5: model

Is the business definition, Rule or authority decision incomplete?

Do not begin by assuming a global model defect.

Do not stop after correcting one record.

---

# Lineage helps calculate the probable blast radius

Suppose one Cost Centre cannot accept a posting.

The trace identifies:

```text
source validity dates
→ Cost Centre Mapping
→ SAP Cost Centre
→ internal orders and postings
```

The support team can search for records sharing:

- the same source extract;
- the same validity conversion;
- the same Controlling Area;
- the same Mapping version;
- the same fallback.

This produces a more defensible affected population than:

> Check all Cost Centres.

---

# Example 6: Cost Centre posting blocked

## Symptom

Posting fails on the first business day after go-live.

## Production observation

Cost Centre exists.

Its valid-from date begins one month later.

## Approved design

Validity should cover the go-live period.

## Runtime evidence

The cutover file used source dates without the approved go-live adjustment.

## Root cause classification

Implementation or cutover execution drift.

## Immediate fix

Correct the affected validity interval after Finance approval.

## Broader check

Identify all Cost Centres from the same load batch whose valid-from date excludes go-live.

## Canonical model change

Possibly none.

The approved Mapping may already be correct.

The implementation failed to apply it.

This distinction matters.

Changing the model to match the defective execution would institutionalise the problem.

---

# Approved design versus observed execution

A mature AMS investigation compares:

## Approved path

What should have happened.

## Implemented path

What configuration or code was intended to execute.

## Observed path

What data and logs indicate actually happened.

## Production outcome

How the business process behaved.

OpenLineage’s object model separates stable Jobs and Datasets from individual Runs, while column-level lineage distinguishes direct value derivation from indirect dependencies such as joins, filters and conditional logic. That separation is useful for comparing a declared model with a particular execution rather than treating runtime behaviour as permanent truth.

For Martenweave, the canonical model holds the approved path.

Operational platforms and incident evidence describe the observed path.

---

# Do not make Martenweave the monitoring system

AMS already uses tools for:

- job monitoring;
- interface monitoring;
- SAP application logs;
- alerts;
- incident tickets;
- service management;
- technical metrics.

Martenweave should not duplicate these systems.

Its role is to connect their evidence to model truth.

The division is:

```text
Monitoring system:
what failed and when

ITSM:
who owns the incident and its service status

Martenweave:
which governed model path explains the data dependency
```

This keeps the product focused.

Integrations bring input.

Martenweave stores model truth.

Validators check consistency.

AI proposes changes.

Humans approve.

---

# Incident evidence should be attached to a claim

A screenshot or log file is not enough.

The model should record what the evidence supports.

Examples:

```text
Claim:
Payment Method is absent for Company Code 3100.
```

```text
Claim:
Product Plant MRP Type was created through expired fallback MAP-MRP-DEFAULT-001.
```

```text
Claim:
Payer partner assignment differs from the approved Sales Area Mapping.
```

```text
Claim:
Cost Centre validity from the production record does not match cutover baseline.
```

This makes the evidence reusable in later investigations.

---

# Example 7: Purchasing block appears unexpectedly

## Symptom

Purchase-order creation is blocked for a Supplier.

## Initial interpretation

Supplier is centrally blocked.

## Lineage context

A Supplier can have:

- central block;
- Company Code posting block;
- Purchasing Organisation block;
- deletion indicator;
- workflow or compliance status.

## Production observation

The block exists only for Purchasing Organisation P100.

## Upstream path

```text
local procurement status
+
Purchasing Organisation
→ purchasing-block Mapping
→ Supplier purchasing data
```

## Root cause

A local source status code was interpreted as an active purchasing block after the source process had already cleared it.

## Response

- correct the Purchasing Organisation-specific value;
- inspect the source status Mapping;
- identify records with the same source code;
- avoid changing central Supplier status.

Again, organisational context narrows both correction and impact.

---

# Root cause can be historical model drift

After go-live, the landscape continues changing.

Examples:

- source system replaced;
- custom field retired;
- value list expanded;
- interface version changed;
- Rule moved to another lifecycle stage;
- business ownership transferred.

The canonical repository may become stale if these changes are not recorded.

An incident can therefore reveal:

```text
production is correct
but model is outdated
```

or:

```text
model is correct
but production drifted
```

AMS needs to distinguish the two.

---

# Example 8: Custom field retirement

## Symptom

A report shows blank Supplier Review Status.

## Landscape change

A standard SAP field replaced the former custom field.

## Production state

New field is populated.

## Report implementation

Still reads the retired custom field.

## Canonical model

If correctly maintained, it should show:

```text
Supplier Review Status
→ current standard endpoint

retired custom endpoint
→ historical implementation
```

## Root cause

Downstream report was not migrated.

## Correct response

Update the report.

Do not repopulate the retired custom field merely to satisfy the report.

Without endpoint history and downstream impact, AMS may recreate obsolete data structures.

---

# Known workaround versus root-cause correction

AMS teams often need a workaround.

A workaround restores service.

A corrective action removes the cause.

Example:

## Incident

Product does not plan.

## Workaround

Manually set MRP Type to `PD`.

## Corrective action

Complete the Plant-specific conversion and correct all affected Product Plant records.

The incident record should distinguish:

```text
service-restoration action
```

from:

```text
model or implementation correction
```

Otherwise, repeated manual fixes appear to be successful problem resolution.

---

# Repeated incidents should form a pattern

One missing Profit Centre may be a data error.

Fifty similar incidents in one Plant indicate a Mapping or source problem.

The model can group incidents by:

- business Attribute;
- Mapping;
- Rule;
- source endpoint;
- target endpoint;
- organisational context;
- fallback;
- model baseline.

This creates an AMS knowledge layer based on governed identities rather than ticket keywords.

---

# Example 9: Profit Centre incidents

Suppose several tickets report incorrect financial responsibility for Products.

The shared path is:

```text
Product Family
+
Plant
→ Profit Centre derivation
→ Product Plant Profit Centre
```

Incident clustering shows:

- all affected records belong to PL30;
- all use the regional fallback;
- the fallback should have expired before first month-end close.

The root cause is not a collection of unrelated Product errors.

It is an expired fallback policy.

The corrective action should include:

- model Finding;
- production correction;
- fallback retirement;
- validation Rule;
- prevention of future use.

---

# Problem records should reference canonical objects

An ITSM problem record can remain in the existing service-management system.

It should reference stable model IDs such as:

```text
ATTR-PRODUCT-PLANT-PROFIT-CENTRE
MAP-PRODUCT-PROFIT-CENTRE-DERIVATION
RULE-PROFIT-CENTRE-REQUIRED
FEP-S4-PRODUCT-PLANT-PROFIT-CENTRE
```

This allows:

- exact search;
- impact analysis;
- cross-ticket grouping;
- historical trace;
- proposal generation.

The incident system owns service-management state.

The model registry owns model identity and approved meaning.

---

# Root-cause categories

A practical classification for data-related AMS problems can include:

## Source defect

The authoritative source contains an incorrect or missing value.

## Source-authority defect

The wrong source was selected.

## Mapping defect

Transformation or applicability is incorrect.

## Key or grain defect

The value was attached to the wrong record or organisational level.

## Rule defect

The intended control is incorrect or incomplete.

## Rule-implementation defect

The canonical Rule is correct, but implementation differs.

## Target-configuration defect

SAP cannot store or process the intended result correctly.

## Interface defect

Downstream or upstream conversion is wrong.

## Execution defect

The approved design did not execute as expected.

## Fallback defect

A temporary or approximate path was used incorrectly.

## Model-documentation drift

Production changed legitimately, but the canonical model was not updated.

## Isolated record defect

One record differs without evidence of a systemic path problem.

This classification helps route the problem to the correct owner.

---

# Root-cause confidence

Not every investigation reaches certainty immediately.

Use statuses such as:

## Confirmed

Evidence directly supports the cause.

## Probable

The path and pattern strongly support the cause, but one verification remains.

## Possible

The object is connected, but evidence is incomplete.

## Rejected

The hypothesis was tested and disproved.

## Unknown

No defensible cause has been established.

This is better than recording the first plausible explanation as fact.

---

# Negative findings are valuable

Suppose an analyst proves:

> Supplier bank data is not the cause of the payment failure.

That conclusion should be retained.

Otherwise, the next incident may repeat the same investigation.

Negative knowledge can state:

```text
Bank Account path:
verified

Payment Method path:
nonconformant
```

A good model registry preserves both the root cause and important rejected hypotheses.

---

# Example 10: Delivery scheduling error

## Symptom

Deliveries are planned on an unexpected date.

## Candidate causes

- Customer unloading point;
- receiving hours;
- factory calendar;
- route;
- shipping condition;
- interface date conversion.

## Lineage investigation

The unloading point migrated correctly.

The relevant receiving calendar was not connected to the ship-to context.

## Root cause

Incomplete relationship and contextual assignment, not an incorrect unloading-point text.

## Correction

- establish correct calendar relationship;
- identify affected Ship-to/Sales Area population;
- retest delivery scheduling.

The business symptom involved scheduling.

The root cause belonged to relationship lineage.

---

# Relationships matter as much as fields

Many AMS incidents come from incorrect relationships:

- Customer to Payer;
- Supplier to bank account;
- Product to Plant;
- Cost Centre to hierarchy;
- Business Partner to role;
- Product to unit conversion;
- Supplier to Purchasing Organisation;
- address to usage.

A field can be correct.

Its attachment to the wrong Entity or context can still cause failure.

Lineage needs Entity and Relationship objects, not only FieldEndpoints.

---

# Time is part of the root cause

Effective dates can explain incidents that look like missing data.

Examples:

- Cost Centre not valid yet;
- tax exemption expired;
- fallback still active after expiry;
- source authority changed at cutover;
- old value list used for a new effective period;
- Partner assignment ended before transaction date.

A trace should support:

```text
What was the approved path on the date of the incident?
```

Current-state lineage alone may produce the wrong answer for historical incidents.

---

# Model baseline and production change history

A defensible investigation should identify:

- model baseline;
- deployment or transport;
- data correction;
- interface version;
- relevant date;
- incident time.

The team can then compare:

```text
model at approval
vs.
implementation at deployment
vs.
data at incident time
```

This helps isolate whether the defect entered through:

- design;
- implementation;
- migration;
- later maintenance.

---

# AMS changes can create new drift

An urgent correction may solve an incident and create inconsistency.

Examples:

- local field changed without updating source authority;
- interface conversion added without updating Mapping;
- Rule relaxed without Decision;
- custom field repopulated after retirement;
- default added directly in code.

Therefore, post-incident review should ask:

```text
Did the workaround change model behaviour?
```

When yes, create a PatchProposal or ChangeRequest.

Do not let emergency support changes become undocumented governance.

---

# AI in AMS root-cause analysis

AI can assist with:

- extracting objects and context from incident text;
- suggesting candidate Attributes;
- retrieving trace and impact paths;
- grouping similar incidents;
- summarising evidence;
- drafting root-cause hypotheses;
- proposing regression checks;
- drafting PatchProposals.

AI should not autonomously:

- edit production data;
- declare source authority;
- approve a new fallback;
- rewrite canonical lineage;
- close the problem record;
- infer causality from graph proximity alone.

A connected object is a hypothesis candidate.

It is not automatically the cause.

Recent research on automated cloud root-cause analysis continues to show the difficulty of reliable autonomous diagnosis, including failures from incomplete exploration and hallucinated interpretation. This reinforces the need for evidence-bound analysis and human confirmation rather than unconstrained agent conclusions.

---

# Root cause is not graph centrality

The node with the most connections is not necessarily the cause.

A central Business Partner Attribute may appear in many paths.

A small local conversion table may contain the actual defect.

Similarly:

- shortest path is not proof;
- newest change is not always the cause;
- most frequent error is not always the underlying cause;
- high-impact object is not necessarily defective.

Lineage narrows the investigation.

Evidence establishes causality.

---

# A practical AMS investigation workflow

## 1. Capture the symptom

Use business language and concrete transaction context.

## 2. Identify the object and organisational grain

Supplier Company Code, Product Plant, Customer Sales Area, Cost Centre in Controlling Area.

## 3. Locate candidate Attributes and Relationships

Do not begin only from tables.

## 4. Trace upstream

Identify source, Mapping, fallback, Rule and migration evidence.

## 5. Trace downstream

Identify process, interface, report and affected consumers.

## 6. Compare approved and observed state

Find differences in values, path, versions and context.

## 7. Test hypotheses

Preserve confirmed and rejected hypotheses.

## 8. Calculate affected population

Use shared Mapping, source, context, fallback or load batch.

## 9. Restore service

Apply bounded operational correction where necessary.

## 10. Decide whether the model must change

Create a proposal only when the approved model is incomplete or wrong.

## 11. Add prevention

Validation, test, monitoring, source remediation or fallback expiry.

## 12. Preserve evidence

Link problem record, Finding, Decision and accepted correction.

---

# Root-cause brief

A concise AMS brief can contain:

```text
Symptom:
Product not planned in Plant PL30.

Affected concept:
Product Plant MRP Type.

Expected path:
Planner method + Plant → approved conversion → SAP MRP Type.

Observed state:
Fallback ND used because PL30 conversion was missing.

Root cause:
Expired fallback and incomplete plant-specific Mapping.

Affected population:
1,140 Product Plant records.

Immediate action:
Correct priority Products.

Systemic action:
Add PL30 conversion and remove expired fallback.

Evidence:
Cutover run, production profile and planning failure.

Owners:
Production Planning Data Owner and Plant PL30 lead.
```

This is more useful than a collection of screenshots and SQL results.

---

# Root-cause evidence requirements

A confirmed model-related root cause should ideally identify:

- business symptom;
- affected object;
- organisational context;
- expected path;
- observed path;
- divergence;
- affected population;
- supporting evidence;
- rejected alternatives;
- immediate correction;
- systemic correction;
- owner;
- verification result.

Not every low-priority incident requires the full package.

Recurring, high-impact and governance-related incidents do.

---

# Verification after correction

A fix is not complete when the error disappears for one record.

Verification should check:

- affected record corrected;
- shared population assessed;
- approved path restored;
- workaround removed or bounded;
- downstream process succeeds;
- regression test added;
- evidence linked;
- canonical model updated where required.

For a Mapping defect, verify another representative population.

For a Rule defect, test positive, negative and exception scenarios.

For an interface defect, verify both payload and business outcome.

---

# AMS metrics derived from lineage

Useful metrics include:

- incidents by Attribute;
- incidents by Mapping;
- incidents caused by fallback;
- incidents caused by organisational-context gaps;
- recurring defects by source system;
- time to identify the affected model object;
- percentage of incidents with confirmed root cause;
- number of record fixes without systemic remediation;
- stale model paths discovered through support;
- evidence coverage for high-incident Attributes.

These metrics show model health more clearly than raw ticket volume alone.

---

# Incident volume does not equal model importance

A frequently used Attribute may generate many low-severity tickets.

A rarely changed tax or bank Attribute may generate one severe incident.

Prioritisation should include:

- business impact;
- affected population;
- legal or financial risk;
- recurrence;
- operational workaround;
- model criticality;
- correction complexity.

The model graph supplies context.

The service process supplies urgency and impact.

---

# What Martenweave should implement next

Martenweave currently provides the relevant foundation:

- canonical Domains, Entities, Attributes, Relationships, datasets, Mappings, Rules, Evidence and Decisions;
- deterministic validation;
- trace and impact analysis;
- health and scorecard operations;
- dataset readiness;
- PatchProposal and ChangeRequest workflow;
- a local Workbench for assessment, investigation, reports and controlled changes.

The next useful vertical slice should be an **incident-to-model investigation workflow**.

## Goal

Turn an AMS symptom into a bounded, evidence-backed model investigation without turning Martenweave into an ITSM platform.

## Scope

Given an incident note or ticket export:

- extract object identifiers and organisational context;
- propose candidate Attributes and Relationships;
- retrieve upstream and downstream paths;
- show relevant Mappings, Rules, fallbacks and evidence;
- capture hypotheses;
- classify confirmed and rejected causes;
- calculate affected model scope;
- draft a Finding or PatchProposal.

## Acceptance criteria

For a Supplier payment incident, the workflow must distinguish:

```text
bank-account issue
```

from:

```text
Company Code Payment Method issue
```

For a Product planning incident, it must distinguish:

```text
Product missing
```

from:

```text
Product Plant planning Attribute incorrect
```

For a warehouse unit error, it must distinguish:

```text
canonical Product Base Unit defect
```

from:

```text
outbound interface conversion defect
```

For a retired custom field, it must distinguish:

```text
missing production data
```

from:

```text
downstream consumer still reading historical endpoint
```

## Existing commands

```text
martenweave search "MRP Controller" --repo ./model

martenweave trace \
  ATTR-PRODUCT-PLANT-MRP-CONTROLLER \
  --repo ./model

martenweave impact \
  FEP-S4-PRODUCT-PLANT-MRP-CONTROLLER \
  --repo ./model
```

## Future focused operation

```text
martenweave investigate \
  --from ./incidents/INC-10482.md \
  --repo ./model
```

The `investigate` command describes a recommended product direction rather than the current documented CLI contract.

---

# Final perspective

AMS root-cause analysis becomes difficult when model knowledge is scattered across:

- migration workbooks;
- interface specifications;
- cutover reports;
- SAP configuration;
- tickets;
- decisions;
- individual memory.

Lineage does not replace technical investigation.

It gives the investigation a governed structure.

The useful path is:

```text
business symptom
→ operational context
→ business Attribute or Relationship
→ expected lineage
→ observed production state
→ divergence
→ affected population
→ corrective action
```

The practical test is:

> Can the AMS team explain why this Supplier could not be paid, why this Product was not planned, why this invoice used the wrong Payer or why this Cost Centre rejected a posting—and determine whether the cause is isolated, systemic, technical or model-related?

When the answer is yes, lineage is supporting operations rather than remaining migration documentation.

When the answer is:

> We corrected the field and closed the ticket,

the service may be restored while the root cause remains active.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

Martenweave is a backend-first, source-available model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects model truth, lineage, impact, evidence, Decisions and reviewable proposals so that support incidents can be investigated against an explicit model rather than reconstructed from scattered documents.

Martenweave Workbench is a local browser interface for assessment, investigation, reports and controlled changes. It reads through the local API and does not store canonical model truth independently of the model files.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave Core currently uses canonical model files as the source of truth, disposable generated indexes, deterministic validation and proposal-first AI-assisted changes. Its documented pipeline includes evidence import, gap detection, lineage, impact analysis and human review.

The current Martenweave CLI exposes health, scorecard, trace, impact, search, query, repository diff and dataset-readiness operations. These provide the foundation for incident-oriented investigation without requiring Martenweave to replace existing monitoring or service-management tools.

OpenLineage’s object model separates stable Jobs and Datasets from individual runtime Runs, while its column-level lineage model distinguishes direct transformations from indirect dependencies such as joins, filters and conditional logic. These distinctions are useful when comparing approved model paths with the execution evidence associated with one production incident.

The incident-to-model workflow, root-cause categories and proposed `investigate` command described in this article are recommended Martenweave improvements. They should not be interpreted as guarantees of the current canonical schema, Workbench behaviour or CLI unless separately implemented and published.

Martenweave is independent and is not affiliated with or endorsed by SAP or OpenLineage.
