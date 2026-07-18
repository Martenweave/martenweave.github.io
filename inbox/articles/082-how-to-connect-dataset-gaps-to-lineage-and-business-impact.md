# How to Connect Dataset Gaps to Lineage and Business Impact

**Reviewed: 14 July 2026**

A dataset-readiness report says:

```text
Missing column:
PAYMENT_METHOD
```

The finding looks technical.

A spreadsheet column is absent.

The obvious response is to ask the source team to add it.

That may be correct.

It may also be incomplete.

Before opening a ticket, the migration team needs to know:

- which business Attribute the column is expected to represent;
- whether the Attribute is mandatory;
- at which organisational level it applies;
- which Mapping requires it;
- whether another approved source exists;
- whether the missing field blocks the target;
- which SAP process depends on the result;
- how many records are affected;
- whether a controlled fallback exists;
- who owns the decision.

The real chain may be:

```text
Missing dataset field
→ incomplete Mapping input
→ Supplier Company Code Payment Method unavailable
→ payment proposal cannot select the Supplier
→ first payment run at risk
```

Or it may be:

```text
Missing dataset field
→ optional descriptive Attribute unavailable
→ no operational process affected
→ warning only
```

The physical gap looks similar.

The business impact is completely different.

> A dataset gap becomes actionable only when it is connected to the governed model path that depends on it.

This is why dataset profiling, lineage and impact analysis should not be separate reporting exercises.

Profiling detects what is present or missing.

The canonical model explains what the field means.

Lineage shows which path depends on it.

Impact analysis shows what happens if the path remains incomplete.

Martenweave’s current pipeline follows that direction: canonical files remain the source of truth, deterministic validation precedes generated indexing, and dataset/model gaps are assessed before lineage, impact and reviewable proposals.

---

# A missing column is only one kind of dataset gap

Teams often use “dataset gap” to mean:

```text
expected field not found
```

That is only the simplest case.

A migration dataset can be structurally complete and still fail the model.

Common gap types include:

## Missing field

The expected column does not exist.

## Renamed or unrecognised field

The value may exist under another name, but the relationship is not confirmed.

## Empty field

The column exists but contains no useful values.

## Partial population

The field exists for only part of the migration scope.

## Wrong grain

The value is present centrally but required per Plant, Company Code or Sales Area.

## Missing key

The business value exists, but the dataset lacks the keys needed to assign it correctly.

## Invalid datatype or format

The source value cannot be processed safely.

## Invalid value domain

Values do not belong to the governed or target code list.

## Missing conditional input

The direct source field exists, but a field used for lookup, selection or applicability is absent.

## Conflicting source values

Several columns or files provide inconsistent candidates.

## Stale source

The data exists but does not represent the approved snapshot.

## Unsupported fallback

The dataset supplies a value through a path that is not approved.

Each gap requires different lineage reasoning.

---

# Dataset schema is not the business model

Suppose a supplier extract contains:

```text
SUPPLIER_ID
NAME
COUNTRY
PAYMENT_TERMS
BANK_ACCOUNT
```

The file may look complete.

The target model may require:

- central Supplier identity;
- Company Code-specific Payment Terms;
- Purchasing Organisation data;
- bank country;
- bank key;
- account number;
- IBAN;
- account holder;
- payment method;
- tax-number category.

One source column may map to several target contexts.

Several source columns may be required for one business Attribute.

A single file row may need to expand into multiple target records.

Therefore, dataset readiness cannot be measured only by:

```text
number of expected columns found
```

It must be measured against the canonical Entity, Attribute, key and Mapping model.

---

# The first connection: DatasetField to business Attribute

When a dataset column is profiled, the system should attempt to connect it to a registered model object.

Example:

```text
DatasetField:
PAYMENT_TERM

Candidate Attribute:
Supplier Company Code Payment Terms
```

The relationship should not be approved merely because the names look similar.

The review needs to confirm:

- definition;
- grain;
- source authority;
- value domain;
- applicability;
- transformation.

A dataset may contain one central `PAYMENT_TERM` value.

The business Attribute may be Company Code-specific.

The field exists.

The Attribute coverage remains incomplete.

The gap is not:

```text
Payment Terms missing
```

It is:

```text
Company Code context missing for Payment Terms
```

That is a much more useful finding.

---

# Example 1: Supplier Payment Method

## Observed dataset

```text
SUPPLIER_ID
COMPANY_CODE
BANK_COUNTRY
IBAN
```

## Expected model path

```text
legacy payment instruction
+
Company Code
→ Payment Method Mapping
→ Supplier Company Code Payment Method
→ payment proposal
```

## Dataset finding

The source extract contains no payment-instruction field.

## Weak finding

```text
Column PAYMENT_METHOD missing.
```

## Model-aware finding

```text
No approved input is available for Supplier Company Code Payment Method.

Affected context:
Company Codes 3100 and 3200

Affected population:
4,280 payment-active Suppliers

Target consequence:
Payment Method cannot be assigned deterministically.

Business consequence:
Suppliers may be excluded from payment proposals or require manual maintenance.
```

The second finding can drive a decision.

The first only drives a column request.

---

# A field can exist and still leave a gap

Suppose the same extract includes:

```text
PAYMENT_METHOD = T
```

for every Supplier.

The column now exists.

The readiness problem may remain.

Questions include:

- Is `T` a source-system code or SAP target code?
- Does it apply to every Company Code?
- Is it valid for all countries?
- Was it defaulted?
- Does it match the Supplier’s bank and payment configuration?
- Is it authoritative?

Presence is evidence.

It is not proof of model conformance.

---

# Connect gaps to Mapping inputs

A Mapping should state what it requires.

For example:

```text
Mapping:
Supplier Payment Method

Direct input:
legacy payment instruction

Context input:
Company Code

Conditional input:
country

Target:
Supplier Company Code Payment Method
```

Dataset readiness can then compare observed fields with required Mapping inputs.

Possible results:

```text
Direct input:
missing

Company Code:
present

Country:
present
```

The Mapping is not executable as approved.

That is stronger than saying one column is absent.

It identifies the exact model path that cannot run.

---

# Direct and indirect gaps

Some missing fields supply the target value directly.

Others influence how the value is selected.

This distinction matters.

OpenLineage’s column-level model distinguishes direct dependencies from indirect influences such as joins, filters and conditional logic. A field can affect the output without contributing its value directly.

Consider Product Profit Centre:

```text
Product Family:
direct classification input

Plant:
conditional Mapping selector

Company assignment:
validity check
```

If Product Family is missing, the derivation has no main input.

If Plant is missing, the system cannot select the right local Mapping.

If Company assignment is missing, the result may not be valid for the organisational context.

All three are gaps.

They should not receive the same diagnostic message.

---

# Example 2: Product Plant Profit Centre

## Observed dataset

```text
PRODUCT_ID
PRODUCT_FAMILY
GLOBAL_PROFIT_CENTRE
```

## Target model

Profit Centre belongs to Product Plant and depends on:

```text
Product Family
+
Plant
+
company structure
```

## Initial assessment

The dataset contains a Profit Centre value.

## Real gap

The dataset has no Plant key.

The global value cannot safely be assigned to every Product Plant.

## Business impact

- incorrect responsibility assignment;
- inventory postings to the wrong Profit Centre;
- distorted management reporting;
- remediation before month-end close.

## Correct finding

```text
Product Profit Centre value is present,
but Plant context required by the approved Mapping is missing.

The dataset cannot establish Product Plant Profit Centre readiness.
```

This prevents false readiness based on a nonblank column.

---

# Connect gaps to target endpoints

A dataset gap matters because one or more target paths depend on it.

A useful finding should identify:

- target business Attribute;
- SAP endpoint;
- target Entity;
- organisational grain;
- criticality.

Example:

```text
Missing source:
PLANT

Affected Attribute:
Product Plant MRP Controller

Affected target:
SAP Product Plant planning data

Target grain:
one value per Product and Plant

Criticality:
high
```

The physical target can be included for technical users.

The business Attribute should remain the centre of the explanation.

---

# Example 3: Product MRP Controller

A source file contains:

```text
PRODUCT_ID
PLANNER_GROUP
```

The Mapping requires:

```text
PLANNER_GROUP
+
PLANT
→ MRP Controller
```

The dataset team argues that Planner Group is available and therefore the Mapping is 50 percent complete.

That metric is not useful.

Without Plant, the same Planner Group may map differently across locations.

The path is not half executable.

It is non-deterministic.

A readiness engine should support findings such as:

```text
Required conditional key missing.

Mapping outcome cannot be resolved unambiguously.

Readiness:
blocked for Product Plant MRP Controller.
```

---

# Gap severity comes from business impact

The number of missing fields does not determine severity.

One missing optional description may be low risk.

One missing key can invalidate thousands of records.

Severity should consider:

- Attribute criticality;
- target mandatory status;
- population;
- organisational scope;
- downstream processes;
- legal or financial relevance;
- fallback quality;
- correction timing.

A report containing ten gaps may be more serious than one containing one hundred.

The important question is:

> Which governed paths are broken?

---

# Example 4: Cost Centre validity

## Dataset fields

```text
COST_CENTRE
CONTROLLING_AREA
DESCRIPTION
VALID_TO
```

## Missing field

```text
VALID_FROM
```

At first glance, this is one missing date.

The lineage path is:

```text
source validity interval
→ Cost Centre validity Mapping
→ SAP Cost Centre
→ operational postings
```

If the team assigns the file-extract date as a default, every Cost Centre may become valid technically.

That does not mean the business treatment is correct.

Possible impact:

- historical records lose their intended start date;
- future Cost Centres become active too early;
- current Cost Centres may remain unusable at go-live;
- dependent postings and allocations fail.

The finding should state which populations need which treatment, not only that `VALID_FROM` is absent.

---

# Gap coverage should be population-specific

A field may be missing only for part of the scope.

Example:

```text
Tax category available:
Germany and Austria

Tax category missing:
Portugal

Tax identifier present:
all countries
```

Global field-level readiness may appear high.

Portugal remains blocked.

The finding should preserve scope:

```text
Affected Attribute:
Supplier Tax Identifier Category

Affected country:
Portugal

Affected records:
1,240

Other countries:
not affected
```

This allows targeted remediation without declaring the entire Supplier domain unready.

---

# Example 5: Supplier tax identifier category

A dataset contains:

```text
COUNTRY
TAX_NUMBER
```

It does not contain:

```text
TAX_CATEGORY
```

The team proposes deriving the category from Country.

That may be valid for some countries.

It may be ambiguous where several identifier types exist.

The lineage analysis should ask:

- Is Country sufficient?
- Does Supplier type matter?
- Does the source distinguish VAT, fiscal and national identifiers?
- Is legal evidence available?
- Which SAP category is required?

Possible result:

```text
Germany:
deterministic derivation available

Portugal:
multiple valid categories; manual or additional source input required

Global fallback:
not approved
```

The dataset gap becomes a scoped Mapping problem and legal-governance decision.

---

# Quality metrics need model context

Data-quality tools can produce metrics such as:

- row count;
- null count;
- distinct count;
- minimum and maximum;
- file count;
- update time.

OpenLineage’s Data Quality Metrics facet is designed to attach dataset health metrics, including row counts and column-level statistics, to lineage metadata.

These metrics are useful signals.

They do not determine fitness for an SAP migration by themselves.

A null rate of 10 percent can be:

- acceptable for an optional field;
- critical for an active Supplier bank account;
- expected for an inapplicable tax category;
- misleading when the denominator includes out-of-scope records.

The canonical model must explain:

- applicability;
- mandatory conditions;
- business criticality;
- expected population.

---

# Quality is fitness for purpose

The W3C Data Quality Vocabulary frames data-quality information as something that helps users judge whether a dataset is fit for their intended purpose, rather than assuming one universal definition of quality.

That principle is directly relevant to migration readiness.

A dataset can be:

- complete for reporting;
- insufficient for master-data creation;
- adequate for one country;
- inadequate for another;
- valid for a mock load;
- unsafe for production cutover.

Therefore, Martenweave should not label a dataset simply:

```text
good
```

or:

```text
bad
```

It should assess:

```text
fit for which model path,
scope,
phase,
and business purpose?
```

---

# Connect gaps to Rules

Some dataset gaps matter because a Rule cannot be evaluated.

Example:

```text
Rule:
Supplier Risk is mandatory for strategic Suppliers.

Required inputs:
Supplier Category
Supplier Risk
```

Dataset:

```text
Supplier Risk:
present

Supplier Category:
missing
```

The target Attribute is present.

The programme cannot determine whether the Rule applies.

This is a Rule-evaluation gap.

Another example:

```text
Rule:
Bank account must be verified before payment activation.

Dataset:
bank fields present
verification status absent
```

The bank data may load.

The control path remains incomplete.

Gap analysis must include Rules, not only Mappings.

---

# Example 6: Supplier bank verification

The extract contains:

```text
SUPPLIER_ID
BANK_COUNTRY
IBAN
ACCOUNT_NUMBER
```

It lacks:

```text
BANK_VERIFICATION_STATUS
```

Possible interpretations:

1. verification occurs outside the source dataset;
2. all included records are preverified;
3. the control was omitted;
4. the target process performs verification;
5. no verification exists.

The system should not assume the most convenient interpretation.

The finding should ask:

```text
How is bank-account approval evidenced?
```

The impact path includes:

```text
bank data
→ verification Rule
→ payment activation
```

A target-field completeness score cannot answer that question.

---

# Connect gaps to Relationships

Many important gaps are relational.

Examples:

- Product has no Plant assignment;
- Customer has no Payer relationship;
- Supplier bank account has no verified owner;
- Cost Centre has no hierarchy assignment;
- Business Partner has no required role;
- Unit of measure lacks conversion relationship.

A dataset may contain every individual field while missing the relationship needed to use them.

Example:

```text
CUSTOMER_ID
PARTNER_ID
PARTNER_ROLE
```

but no:

```text
SALES_ORG
DISTRIBUTION_CHANNEL
DIVISION
```

The Payer relationship cannot be assigned to the correct Sales Area.

The gap is not a missing descriptive field.

It is missing relationship context.

---

# Example 7: Customer partner functions

## Dataset

```text
CUSTOMER_ID
PARTNER_ID
PARTNER_ROLE
```

## Target relationship

```text
Customer Sales Area
→ partner role
→ Partner Business Partner
```

## Missing keys

```text
Sales Organisation
Distribution Channel
Division
```

## Business impact

- Payer may be assigned globally;
- invoices may route to the wrong party;
- Ship-to relationships may be duplicated;
- local sales processes may fail.

## Correct verdict

```text
Partner-function values are present,
but the dataset cannot establish Sales Area-specific relationships.

Readiness:
blocked for contextual partner assignment.
```

---

# Connect gaps to downstream impact

A gap may not block SAP loading but may still damage a downstream process.

Example: Product Base Unit is present, but alternative-unit conversion is missing.

SAP Product creation may succeed.

Warehouse or sales processing may fail.

The lineage path should continue:

```text
source unit conversion
→ SAP Product units
→ warehouse interface
→ operational quantity interpretation
```

Impact analysis should identify:

- which consumers depend on the missing relationship;
- whether they require the field immediately;
- which scenarios must be tested;
- whether a temporary manual process exists.

---

# Example 8: Product units of measure

Dataset:

```text
PRODUCT_ID
BASE_UNIT
SALES_UNIT
```

Missing:

```text
CONVERSION_NUMERATOR
CONVERSION_DENOMINATOR
```

The fields exist.

The relationship between them does not.

Possible target result:

```text
Base Unit:
PC

Sales Unit:
BOX
```

Without:

```text
1 BOX = 12 PC
```

the Product may be technically created but operationally unusable.

Business impact can include:

- incorrect order quantities;
- warehouse rejection;
- inventory inconsistencies;
- pricing or packaging errors.

The gap should be connected to the conversion relationship and downstream processes, not reported as two missing numeric columns.

---

# A gap may have several remediation options

Dataset gaps should not always become source-extract requests.

Possible responses include:

## Add the missing source field

Best when the source owns the value.

## Register an existing differently named field

Best when the value already exists and semantic equivalence is confirmed.

## Add an enrichment source

Best when the primary dataset cannot provide all required context.

## Derive through an approved Rule

Best when the value is deterministic from existing inputs.

## Use a controlled fallback

Best when bounded exception treatment is acceptable.

## Mark out of scope

Best when the Attribute does not apply to the selected population.

## Block the records

Best when no safe value can be produced.

## Change the target design

Appropriate only when the current model is wrong or unnecessarily restrictive.

The gap report should present options without selecting one automatically.

---

# Avoid automatic Attribute creation

Suppose an unexpected column appears:

```text
LEGACY_PRIORITY_CLASS
```

AI might propose:

```text
New Attribute:
Supplier Priority Class
```

That may be correct.

It may also be:

- a source workflow status;
- a reporting field;
- obsolete local data;
- an input to another derivation;
- outside migration scope.

The safe process is:

```text
unexpected field
→ Finding
→ candidate semantic interpretation
→ review
→ PatchProposal if justified
```

Martenweave’s existing principle is proposal-first: automation and AI can produce reviewable PatchProposals, but canonical model changes require validation and human approval.

---

# Avoid automatic defaults

A missing target input often creates pressure to default.

Defaults improve visible completeness.

They may weaken model integrity.

Before approving a default, identify:

- affected Attribute;
- business meaning of the default;
- scope;
- downstream consumers;
- expiry;
- remediation;
- owner;
- evidence.

Example:

```text
Missing MRP Controller
→ default 001
```

Questions:

- Does controller `001` accept responsibility?
- Does the value trigger notifications?
- Does it apply to every Plant?
- Can affected records be identified?
- When will the correct controller be assigned?

A default is a governed fallback path, not a data-cleaning convenience.

---

# Gap-to-impact traversal

A useful engine can start from a dataset finding and traverse outward.

```text
DatasetField gap
→ expected FieldEndpoint or Attribute
→ Mapping
→ Rule
→ target endpoint
→ downstream consumer
→ owner
→ evidence
```

The result should explain both direction and reason.

Example:

```text
Missing field:
PLANT

Required by:
MAP-PRODUCT-MRP-CONTROLLER

Used as:
conditional Mapping key

Produces:
Product Plant MRP Controller

Target:
SAP Product Plant planning data

Downstream:
MRP execution and planning responsibility

Owner:
Production Planning Data Lead
```

This is an actionable gap report.

---

# Gap classes should drive impact logic

## Missing direct input

Likely result:

- target value unavailable or defaulted.

## Missing conditional input

Likely result:

- target may be wrong or ambiguous.

## Missing key

Likely result:

- value may attach to the wrong record or context.

## Invalid value domain

Likely result:

- transformation rejection or incorrect conversion.

## Partial population

Likely result:

- scoped coverage gap.

## Conflicting source values

Likely result:

- authority or precedence decision required.

## Missing evidence field

Likely result:

- control cannot be proven.

## Unexpected field

Likely result:

- model discovery opportunity, not necessarily target gap.

The diagnostic should reflect the type.

---

# Example 9: Product valuation class

Dataset:

```text
PRODUCT_ID
PRODUCT_TYPE
VALUATION_CLASS
```

Observed values:

```text
3000
3001
3999
```

Canonical target value list permits:

```text
3000
3001
```

The gap is not a missing field.

It is an unsupported value.

Lineage and impact reveal that Valuation Class affects:

- account determination;
- inventory postings;
- Finance reporting;
- company or valuation-area context.

Possible remediation:

- map `3999` to an approved value;
- retain a local value if target configuration supports it;
- split the source population;
- reject affected Products.

The Finance owner must decide semantic compatibility.

The ETL developer should not guess from numeric proximity.

---

# Example 10: Address usage

A Customer dataset contains:

```text
CUSTOMER_ID
ADDRESS
COUNTRY
```

It lacks address usage or role.

The target model distinguishes:

- standard address;
- Ship-to address;
- Bill-to address;
- correspondence address.

The physical address is present.

The relationship and purpose are missing.

Business impact includes:

- delivery routing;
- invoice delivery;
- tax determination;
- correspondence.

The correct finding is:

```text
Address content is present,
but intended usage cannot be established.
```

This is a semantic and relational gap.

---

# Rank gaps by path criticality

A practical prioritisation model can consider:

- criticality of the target Attribute;
- number of affected records;
- process proximity;
- availability of fallback;
- confidence in the finding;
- correction deadline;
- evidence quality.

Example:

| Gap | Population | Impact | Priority |
|---|---:|---|---|
| Supplier Payment Method missing | 4,280 | First payment run | Critical |
| Product marketing text missing | 18,000 | No core process | Low |
| Cost Centre valid-from missing | 74 | Posting blocked | Critical |
| Partner-function Sales Area missing | 6,300 | Billing risk | High |
| Product alternative-unit conversion missing | 1,920 | Warehouse and orders | High |

Record count alone would prioritise the marketing text.

Business lineage produces a different order.

---

# Some gaps should block a subset, not the whole migration

A mature readiness report supports scoped decisions.

Example:

```text
Supplier central data:
ready

Supplier bank data:
ready with warnings

Supplier Company Code Payment Method:
blocked for Company Code 3200

Supplier tax data:
blocked for Portugal

Supplier purchasing data:
ready
```

This is more useful than:

```text
Supplier readiness:
76%
```

The programme can decide whether to:

- remediate;
- defer a context;
- exclude records;
- apply a controlled fallback;
- postpone the entire object.

---

# Distinguish model gap from dataset defect

A dataset finding may reveal that the model itself is incomplete.

Example:

- the source contains Plant-specific Product planning data;
- the canonical model defines only global Product planning Attributes.

The dataset is not necessarily wrong.

The model may be too coarse.

Possible classifications:

## Dataset defect

The dataset fails a valid model expectation.

## Model gap

The canonical model lacks a legitimate concept present in the source or target.

## Mapping gap

Both source and target are understood, but the transformation is missing.

## Evidence gap

The path may work, but current proof is absent.

## Scope mismatch

Dataset and model describe different populations.

This classification determines the right owner and remediation.

---

# Example 11: Serial-number profile

A source dataset contains:

```text
SERIAL_PROFILE
```

The canonical model does not include the Attribute.

During warehouse testing, some Products require serial handling.

This may be a model gap.

The workflow should ask:

- Does the source field represent the SAP concept?
- Is the value Plant-specific?
- Which Product types require it?
- Which warehouse and delivery processes depend on it?
- Is the field required for cutover?

The result may justify a new Attribute and Mapping proposal.

It should not be silently ignored because it was not in the initial model.

---

# Gap evidence should be reproducible

A useful gap report should identify:

- dataset identity;
- fingerprint or version;
- model baseline;
- profiling time;
- scope;
- expected object;
- observed condition;
- calculation method.

Without this, a later rerun cannot determine whether:

- the dataset changed;
- the model changed;
- the gap was fixed;
- the earlier report was wrong.

OpenLineage’s data-quality model associates metrics with dataset observations, while W3C DQV explicitly supports describing quality measurements and their provenance.

Martenweave can apply the same principle without storing all raw data in the canonical repository.

---

# Gap lifecycle

A gap should move through a clear lifecycle.

```text
detected
→ classified
→ assigned
→ remediation proposed
→ validated
→ verified
→ closed
```

Possible closure reasons:

- source field added;
- Mapping added;
- model corrected;
- fallback approved;
- population excluded;
- finding disproved;
- target requirement removed;
- records deferred.

Do not close a gap simply because the target field became nonblank.

Verify the path used to produce it.

---

# Gap regression

A previously resolved gap can return.

Examples:

- source extract drops a column;
- API version changes;
- new country joins the migration scope;
- fallback expires;
- Mapping changes;
- value list expands;
- source authority changes.

Regression detection should compare:

- current dataset;
- current canonical baseline;
- previous verified state.

A gap history can show:

```text
Mock Load 1:
missing

Mock Load 2:
resolved

Cutover rehearsal:
resolved

Cutover:
regressed
```

This is operationally important.

A binary current-state report loses the history.

---

# Use lineage to propose tests

Once a gap is connected to a path, the system can suggest targeted verification.

Example: missing Product Plant key.

Suggested tests:

- confirm Plant field in source;
- verify Product-to-Plant expansion;
- test plant-specific conversion;
- validate target record count;
- run planning scenario.

Example: missing tax category.

Suggested tests:

- country/category compatibility;
- duplicate detection;
- target category persistence;
- invoice or legal validation.

Example: missing partner-function context.

Suggested tests:

- Sales Area key completeness;
- partner-role cardinality;
- billing scenario;
- unresolved partner cross-reference.

These tests follow the impact path.

---

# Turn findings into reviewable proposals

Some gaps require model changes.

Examples:

- add a missing Attribute;
- add a source endpoint;
- change Mapping applicability;
- define a fallback;
- create a Rule;
- retire an invalid source path.

The safe workflow is:

```text
dataset evidence
→ gap Finding
→ lineage and impact
→ PatchProposal
→ deterministic validation
→ human review
```

Martenweave’s documented pipeline already places evidence, gaps, lineage and impact before issue or pull-request review.

The proposal should include:

- exact object changes;
- reason;
- supporting dataset evidence;
- affected paths;
- risks;
- validation results.

---

# What AI should and should not do

AI can help:

- match dataset columns to candidate Attributes;
- summarise missing-path impact;
- identify possible alternate sources;
- detect likely context fields;
- draft Findings;
- propose validation scenarios;
- group similar gaps.

AI should not autonomously:

- declare semantic equivalence;
- invent target values;
- approve defaults;
- transfer source authority;
- exclude records from scope;
- create canonical Attributes without review;
- close gaps based only on field presence.

Dataset names are often ambiguous.

Business meaning requires evidence and accountable review.

---

# A useful gap report

A business- and delivery-ready gap should look like:

```text
Gap:
Plant key missing from Product planning dataset.

Expected by:
MAP-PRODUCT-MRP-CONTROLLER

Role:
Conditional Mapping input

Affected Attribute:
Product Plant MRP Controller

Affected target:
SAP Product Plant planning data

Population:
12,800 Products across four Plants

Impact:
MRP Controller cannot be derived reliably.
Global default would assign planning responsibility incorrectly.

Fallback:
Not approved

Verdict:
Blocked

Owner:
Production Planning Data Lead

Next decision:
Add Plant to the source extract or define an approved alternate source.
```

This is much more valuable than:

```text
Missing column: PLANT
```

---

# Suggested diagnostics

A focused implementation could introduce diagnostics such as:

```text
MW-DATA-GAP-001
Expected dataset field is missing.

MW-DATA-GAP-002
Required Mapping key is missing.

MW-DATA-GAP-003
Conditional input is missing.

MW-DATA-GAP-004
Field exists but target grain is unsupported.

MW-DATA-GAP-005
Observed values fall outside the approved value domain.

MW-DATA-GAP-006
Source coverage is incomplete for an active context.

MW-DATA-GAP-007
Conflicting candidate source values require authority review.

MW-DATA-GAP-008
Dataset supplies an undocumented fallback value.

MW-DATA-GAP-009
Required control or verification evidence is absent.

MW-DATA-GAP-010
Unexpected field has no canonical interpretation.

MW-DATA-GAP-011
Resolved gap has regressed in the current dataset.

MW-DATA-GAP-012
Gap affects a downstream critical process.
```

Each diagnostic should preserve:

- dataset;
- baseline;
- model object;
- path;
- scope;
- severity;
- evidence;
- owner.

---

# Release-gate policy

Dataset gaps should block release when:

- a mandatory critical Attribute has no valid source path;
- a required key or organisational context is missing;
- a critical Mapping cannot execute deterministically;
- fallback is undocumented or expired;
- value-domain incompatibility affects active records;
- legal, bank or finance controls cannot be evaluated;
- downstream critical use is untested;
- affected population cannot be identified.

Warnings may be appropriate when:

- optional fields are missing;
- low-risk descriptions are incomplete;
- evidence is partial but the path is noncritical;
- future-state fields are not yet supplied;
- a controlled fallback covers a bounded population.

The gate should follow business impact, not gap count.

---

# What Martenweave should implement next

Martenweave already has the core workflow needed for this capability:

- canonical model files;
- deterministic validation;
- disposable generated indexes;
- dataset-readiness execution;
- gap detection;
- trace and impact;
- health and scorecards;
- PatchProposal generation;
- a local Workbench for investigation and review.

The next focused vertical slice should be **gap-to-impact traversal**.

## Goal

Convert each dataset gap into an explainable model and business-impact finding.

## Initial scope

Support:

- missing fields;
- missing keys;
- missing conditional inputs;
- partial population;
- invalid values;
- unexpected fields;
- conflicting source candidates;
- unsupported fallback.

## Required output

For every gap, return:

1. Dataset and field.
2. Expected Attribute or FieldEndpoint.
3. Mapping dependency.
4. Role of the missing input.
5. Target endpoint.
6. affected scope and population.
7. downstream process.
8. fallback status.
9. severity.
10. owner and next decision.

## Acceptance criteria

The implementation must distinguish:

```text
Payment Method column missing
```

from:

```text
Supplier Company Code Payment Method path unavailable,
placing the first payment run at risk.
```

It must distinguish:

```text
Profit Centre value present
```

from:

```text
Product Plant Profit Centre cannot be assigned safely
because Plant context is missing.
```

It must distinguish:

```text
Partner role present
```

from:

```text
Customer Sales Area partner relationship cannot be constructed
because Sales Area keys are absent.
```

It must distinguish:

```text
Units present
```

from:

```text
Base-to-alternative-unit conversion relationship is missing.
```

## Existing command

```
martenweave run dataset-readiness \
  --repo ./model \
  --dataset ./data/source.xlsx \
  --out ./reports/readiness
```

## Future focused report

```
martenweave gap-impact \
  --repo ./model \
  --report ./reports/readiness/gaps.json
```

The `gap-impact` command describes a recommended direction rather than a current documented CLI contract.

---

# Final perspective

Dataset gaps should not remain isolated spreadsheet findings.

A missing field, key, context or value matters because some governed model path depends on it.

The useful chain is:

```text
observed dataset condition
→ model expectation
→ Mapping dependency
→ business Attribute
→ target endpoint
→ Rule
→ downstream process
→ owner and decision
```

The practical test is:

> Can the programme explain not only what is missing from the dataset, but which business value cannot be created, which SAP context is affected, what process is at risk, which records are exposed and what safe remediation options exist?

When the answer is yes, dataset profiling supports migration governance.

When the answer is:

> Twelve columns are missing,

the programme has a schema comparison.

It does not yet have an impact assessment.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first, source-available model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects observed datasets to canonical Attributes, Mappings, Rules, target endpoints, Evidence and Decisions so that a technical gap can be translated into a controlled business response.

The aim is not to make every dataset conform mechanically.

It is to determine whether each dataset is fit for the governed migration path it is expected to support.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave Core currently treats canonical files as the source of truth, validates model references deterministically, builds disposable SQLite and JSONL indexes, detects dataset and model gaps and runs lineage and impact analysis before human-reviewed change proposals.

The current CLI exposes validation, health, scorecard, trace, impact, search, query, repository diff and a one-command dataset-readiness workflow.

OpenLineage’s Data Quality Metrics facet supports dataset-level and column-level health metrics such as row count, null counts, distinct counts and numerical summaries. These metrics become more useful when connected to lineage and model context.

OpenLineage’s column-level lineage model distinguishes direct value derivation from indirect dependencies such as conditional selection, joins and filtering. That distinction is important when a missing contextual field breaks a Mapping without being the direct source of the target value.

The W3C Data Quality Vocabulary provides a framework for describing dataset quality so that users can judge fitness for purpose and supports linking quality measurements to provenance and policy.

The diagnostic codes, gap-to-impact traversal and proposed `gap-impact` command described here are recommended Martenweave improvements. They should not be interpreted as guarantees of the current schema, Workbench behaviour or CLI unless separately implemented and published.

Martenweave is independent and is not affiliated with or endorsed by SAP, OpenLineage or W3C.
