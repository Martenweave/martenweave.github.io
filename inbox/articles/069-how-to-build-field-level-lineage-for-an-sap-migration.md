# How to Build Field-Level Lineage for an SAP Migration

**Reviewed: 14 July 2026**

A migration programme says that it has lineage.

The architecture diagram shows:

```text
Legacy CRM
→ Migration Platform
→ SAP S/4HANA
```

The arrow is correct.

It is also too broad to answer most migration questions.

A data owner asks:

> Where does Customer Group in SAP come from?

The programme replies:

> CRM.

That answer hides the actual chain:

```text
CRM customer segment field
→ source extract column
→ value normalisation
→ organisational enrichment
→ approved Customer Group mapping
→ migration load field
→ SAP KNVV-KDGRP
```

It also hides the evidence needed to trust the chain:

- which source table or API property was used;
- which extract version contained it;
- whether the value was copied, converted or derived;
- which Sales Area context was required;
- which decision approved the mapping;
- which records could not be evaluated;
- which validation report confirmed the result;
- which proposal remains open.

System-level lineage can show that data moved from CRM to SAP.

Field-level lineage explains what happened to one governed value.

> For an SAP migration, useful lineage must connect physical source fields, observed dataset columns, transformations, business attributes, target fields, rules, evidence and decisions.

Martenweave’s current public example already demonstrates the intended shape. It can trace the business Attribute `ATTR-CUST-SALES-CUSTOMER-GROUP` and calculate impact from the physical SAP FieldEndpoint `FEP-S4-KNVV-KDGRP`. Its documentation describes the trace as connecting business attributes, physical SAP fields, mappings, issues, decisions and evidence.

The product also generates `lineage_edges.jsonl` from canonical model files alongside the searchable SQLite index. Those generated edges remain disposable and rebuildable rather than becoming an independently edited lineage database.

The objective is not to draw the largest possible graph.

It is to create a graph precise enough to support migration decisions.

---

# Field-level lineage answers a different question

Dataset lineage asks:

> Which dataset produced this dataset?

Field-level lineage asks:

> Which input fields contributed to this output field, and how?

This distinction is recognised in established lineage specifications. OpenLineage describes column-level lineage as fine-grained dependency information that identifies which input columns produce an output column and the nature of that transformation.

For SAP migration, the question is broader than column-to-column dependency.

A target field often depends on:

- business interpretation;
- organisational context;
- reference data;
- conditional rules;
- manual enrichment;
- source authority;
- approved exceptions.

A technically accurate transformation path may still be semantically incomplete.

For example:

```text
CRM_SEGMENT
→ KDGRP
```

does not tell the reviewer whether:

- CRM Segment and Customer Group mean the same thing;
- one CRM value maps to several Customer Groups;
- Sales Area determines the result;
- unmapped values receive a default;
- the default is temporary;
- the mapping applies only to one migration wave.

Martenweave therefore needs to represent both:

```text
physical lineage
and
governed semantic lineage
```

---

# The minimum useful chain

A practical field-level lineage chain should usually contain at least five layers.

## Source endpoint

The registered physical field in the source landscape.

Example:

```text
FEP-CRM-CUSTOMER-SEGMENT
```

## Observed dataset field

The column or path actually found in one migration extract.

Example:

```text
DATAFIELD-ERP-B-WAVE3-SEGMENT-CODE
```

## Transformation or Mapping

The operation that copies, converts, derives, enriches or filters the value.

Example:

```text
MAP-CRM-SEGMENT-TO-CUSTOMER-GROUP
```

## Business Attribute

The governed semantic concept.

Example:

```text
ATTR-CUSTOMER-GROUP
```

## Target endpoint

The physical SAP field receiving the result.

Example:

```text
FEP-S4-KNVV-KDGRP
```

The resulting path is:

```text
registered source field
→ observed extract column
→ Mapping or transformation
→ governed business Attribute
→ SAP target field
```

Additional layers may include:

- reference-data lookup;
- Decision;
- Rule;
- Data Quality assertion;
- exception;
- manual enrichment;
- interface;
- intermediate staging field;
- downstream report.

The chain should expand only where the additional object explains real behaviour or risk.

---

# Separate registered fields from observed columns

Migration teams often assume that a registered source field and an extract column are the same object.

They are not always.

A source system may register:

```text
ERP_B.CUSTOMER.SEGMENT
```

The migration extract may contain:

```text
SEG_CODE
```

The extract might:

- rename the field;
- convert its datatype;
- combine several source fields;
- filter records;
- omit organisational context;
- contain a previous schema version.

A field-level lineage model should distinguish:

```text
Source FieldEndpoint:
where the data exists in the source application

DatasetField:
what appeared in one specific extract
```

This allows Martenweave to detect:

- expected source field not extracted;
- unexpected dataset column;
- extract schema drift;
- transformation performed before the migration team received the data;
- undocumented renaming;
- loss of granularity.

OpenLineage similarly distinguishes a Dataset from its schema fields and allows dataset metadata to include field names, types and descriptions.

---

# Begin with stable field identities

Lineage becomes fragile when endpoints are identified only by labels such as:

```text
Customer Group
Segment
Risk
Status
```

A reliable physical endpoint ID should include enough stable implementation context to distinguish it:

```text
FEP-CRM-CUSTOMER-SEGMENT
FEP-S4-KNVV-KDGRP
FEP-MDG-BP-ZZ-RISK-LEVEL
```

The corresponding business Attributes remain separate:

```text
ATTR-CUSTOMER-SEGMENT
ATTR-CUSTOMER-GROUP
ATTR-SUPPLIER-RISK
```

This separation matters because a business Attribute can survive:

- source-system replacement;
- SAP upgrade;
- custom-to-standard field migration;
- interface redesign;
- new migration tooling.

The endpoint identity changes when the physical location changes.

The business identity changes only when the governed concept changes.

---

# Do not infer lineage from similar names

These fields may appear equivalent:

```text
CRM_SEGMENT
CUSTOMER_SEGMENT
CUSTOMER_GROUP
KDGRP
```

Name similarity is not sufficient evidence.

Possible realities include:

- direct equivalence;
- partial overlap;
- value conversion;
- context-dependent mapping;
- two unrelated classifications;
- historical misuse of one field;
- temporary workaround.

The lineage edge should exist because an explicit Mapping or Decision supports it.

Not because an algorithm found similar words.

AI can suggest likely connections.

The canonical graph should require reviewable evidence.

---

# Transformation is an object, not an arrow label

A weak lineage diagram shows:

```text
SEGMENT
── mapped to ──>
KDGRP
```

A stronger model represents the Mapping itself.

```text
FEP-CRM-CUSTOMER-SEGMENT
→ MAP-CRM-SEGMENT-TO-CUSTOMER-GROUP
→ ATTR-CUSTOMER-GROUP
→ FEP-S4-KNVV-KDGRP
```

The Mapping object can carry:

- transformation type;
- applicability;
- input fields;
- output fields;
- lookup reference;
- fallback;
- owner;
- Decision;
- status;
- evidence.

This allows the graph to answer:

> Which transformation creates this value?

rather than only:

> Which fields are related?

---

# Classify transformation types

Field lineage becomes more useful when the transformation is typed.

OpenLineage distinguishes direct and indirect column dependencies and further classifies direct identity, transformation and aggregation, as well as indirect join, filter, grouping, sorting, windowing and conditional dependencies.

An SAP migration model can use a related but migration-oriented classification.

## Direct copy

```text
source value → target value unchanged
```

Example:

```text
COUNTRY_CODE → LAND1
```

This classification should still be verified for format and semantics.

## Value conversion

```text
01 → STANDARD
02 → STRATEGIC
```

A lookup or conversion table is involved.

## Conditional derivation

```text
if Country = PT and Supplier Type = ORGANISATION
then derive Tax Category
```

The output depends on one or more condition fields.

## Concatenation or split

Several fields form one target, or one source populates several targets.

## Aggregation

Several source records contribute to one target value.

This is less common in operational master-data loads but may appear in classification or summarisation.

## Enrichment

The source value is insufficient and must be combined with:

- organisational context;
- reference data;
- external evidence;
- manual stewardship.

## Default

The target receives a value when the source is absent.

Defaults need explicit justification because they can hide data gaps.

## Manual assignment

A steward or migration team determines the result.

This is still lineage.

The human step should not disappear from the graph.

## Rejection

A source value or record is deliberately excluded from the target.

The absence of a target value can be an intentional transformation outcome rather than a missing edge.

---

# Distinguish value derivation from control dependencies

Suppose Customer Group is calculated from CRM Segment, but Sales Area determines which lookup row is used.

```text
CRM Segment:
contributes to the output value

Sales Area:
controls which conversion applies
```

These are different dependencies.

A useful graph can represent:

```text
CRM Segment
── direct transformation input ──>
Customer Group Mapping

Sales Area
── conditional context ──>
Customer Group Mapping
```

OpenLineage’s column-level model similarly distinguishes direct dependencies, where an output value is derived from an input field, from indirect dependencies, where a field affects selection or calculation without contributing its value directly.

This distinction prevents every control field from being described as though its value were copied into the output.

---

# Organisational context must appear in lineage

SAP master data frequently exists at several levels:

- central Business Partner;
- Customer Sales Area;
- Customer Company Code;
- Supplier Purchasing Organisation;
- Supplier Company Code;
- Product Plant;
- Product Sales Organisation.

A field-level lineage path that omits these keys can be technically connected but operationally wrong.

Example:

```text
CRM customer segment
→ Customer Group
```

The missing question is:

> For which Sales Area?

A stronger chain is:

```text
CRM customer segment
+
legacy Sales Area assignment
+
approved contextual Mapping
→ Customer Group for Customer Sales Area
→ KNVV-KDGRP
```

The lineage should therefore include:

- parent Entity;
- organisational-key fields;
- cardinality;
- context Rules;
- applicable population.

Without this, one central source value may appear to support several organisational target records without explaining how they differ.

---

# Keys are part of lineage

Migration lineage is not only about payload fields.

Keys determine which source and target records are connected.

For a Customer Sales Area value, the relevant identity may require:

```text
Customer
Sales Organisation
Distribution Channel
Division
```

If the lineage records only:

```text
CRM_SEGMENT → KNVV-KDGRP
```

it does not explain how the value is assigned to one `KNVV` record rather than another.

Key lineage should show:

```text
Source Customer ID
→ Customer number mapping
→ SAP KUNNR

Legacy Sales Unit
→ organisational mapping
→ VKORG/VTWEG/SPART
```

These key paths establish the target row.

The value path establishes the target field.

Both are necessary.

---

# Model field-level and record-level lineage separately

Field-level lineage says:

```text
Source column A contributes to target field B.
```

Record-level lineage says:

```text
Source record 7182 produced SAP Business Partner 100045 and Customer Sales Area 1010/10/00.
```

Record-level lineage can be useful during:

- defect investigation;
- reconciliation;
- audit;
- cutover;
- rollback.

It also creates much larger volumes and greater privacy risk.

Martenweave’s canonical registry should focus first on model and field-level lineage.

Record-level evidence can remain in:

- migration logs;
- reconciliation reports;
- load-control tables;
- restricted evidence stores.

The registry can reference these sources without storing every business record.

---

# Design lineage and runtime lineage

A migration programme needs both intended and observed lineage.

## Design lineage

The approved path:

```text
CRM Segment
→ approved conversion
→ Customer Group
→ KNVV-KDGRP
```

## Runtime lineage

What happened in a particular load:

```text
Extract 2026-07-12
→ transformation job run 184
→ load file 019
→ SAP mock-load result
```

OpenLineage explicitly distinguishes design-time metadata events from runtime Job Run events. Design events describe declared datasets and jobs, while runtime events describe particular executions.

For Martenweave:

- canonical Mappings and Relationships express design lineage;
- dataset profiles and execution Evidence express observed lineage;
- findings expose differences between the two.

This separation avoids treating a successful one-time execution as proof that the approved design is complete.

---

# Lineage needs evidence confidence

Not every lineage edge has the same evidential strength.

A useful classification may include:

## Confirmed

Supported by:

- approved Mapping;
- code inspection;
- successful test evidence;
- validated source and target metadata.

## Declared

Documented in design but not yet verified in data.

## Observed

Inferred from an actual extract or run.

## Inferred

Suggested from names, values or statistical correlation.

## Disputed

Conflicting sources or Decisions exist.

## Deprecated

The lineage applied historically but should not be used for current loads.

This makes uncertainty visible.

The graph should not render every edge with equal authority.

---

# Connect decisions to lineage edges

A Mapping may exist because an architecture group decided:

> CRM Segment is not semantically equivalent to Customer Group, but it may be used as one input to an enrichment process.

That Decision should remain connected to the lineage path.

```text
DEC-CUSTOMER-GROUP-SOURCE-017
→ authorises
MAP-CUSTOMER-GROUP-ENRICHMENT
```

If a later Decision supersedes it, Martenweave can identify:

- affected lineage;
- target fields;
- migration waves;
- datasets;
- tests.

Without the Decision connection, the edge appears as a timeless technical fact.

---

# Connect rules to lineage

A Rule may define:

- when the Mapping applies;
- which values are permitted;
- whether enrichment is mandatory;
- whether missing data blocks load;
- whether a default may be used.

Example:

```text
RULE-CUSTOMER-GROUP-APPLICABILITY
→ governs
MAP-CUSTOMER-GROUP-ENRICHMENT
```

and:

```text
RULE-CUSTOMER-GROUP-REQUIRED
→ validates
ATTR-CUSTOMER-GROUP
```

This enables more useful investigation:

> The target field is missing. Was the source absent, the Mapping inapplicable, the enrichment incomplete or the Rule evaluated incorrectly?

---

# Connect evidence to the path, not only the final object

Evidence may support different parts of the chain.

Examples:

```text
Source profile:
confirms CRM Segment exists

Mapping test:
confirms value conversion

Load report:
confirms KNVV-KDGRP populated

Business decision:
confirms semantic treatment

Reconciliation:
confirms expected record count
```

A single “evidence” link to the Attribute does not reveal which claim was verified.

The graph should support evidence links such as:

```text
EVID-SOURCE-PROFILE
→ supports source availability

EVID-MAPPING-TEST
→ verifies transformation

EVID-MOCK-LOAD
→ verifies target population
```

---

# Missing lineage is a finding

Not every unknown connection should be filled with a guess.

Suppose the target field is populated in a test extract, but no approved source or Mapping can be identified.

Represent:

```text
FIND-UNKNOWN-SOURCE-FOR-CUSTOMER-GROUP
```

The Finding can state:

- target endpoint;
- observed values;
- suspected sources;
- evidence;
- investigation owner;
- status.

This is more honest than drawing a dashed edge and allowing users to treat it as confirmed lineage.

---

# Avoid the “one giant transformation” problem

Migration tools often contain broad jobs such as:

```text
Transform Customer
```

That job may handle hundreds of fields.

Representing all lineage as:

```text
Customer Extract
→ Transform Customer
→ SAP Customer
```

does not help field-level analysis.

The model should decompose the transformation logically.

This does not require one executable job per field.

It requires Mapping or TransformationRule objects that explain individual target outcomes.

```text
Transform Customer job
├── Customer Group Mapping
├── Shipping Condition Mapping
├── Payment Terms Mapping
└── Tax Classification Mapping
```

The runtime job and the semantic mappings can coexist.

---

# Intermediate staging fields matter

A field may pass through several stages:

```text
CRM_SEGMENT
→ STG_SEGMENT_NORMALISED
→ STG_CUSTOMER_GROUP
→ LOAD_KDGRP
→ KNVV-KDGRP
```

Do all intermediate fields belong in the canonical graph?

Include them when they explain:

- transformation behaviour;
- reconciliation point;
- ownership boundary;
- defect location;
- material semantic change.

Omit purely mechanical intermediate copies when they add no diagnostic value.

A useful lineage path should be detailed enough to investigate failure without becoming a dump of every temporary column.

---

# Manual transformations must be visible

Some migrations rely on:

- business review workbooks;
- steward assignment;
- manually maintained conversion tables;
- local exceptions;
- one-time correction files.

These steps often disappear from technical lineage because they are not implemented as code.

That makes the lineage misleading.

Example:

```text
CRM Segment
→ manually reviewed conversion workbook
→ approved Customer Group
→ SAP target
```

The workbook should not become the canonical source of truth.

It can still be represented as Evidence or an implementation artefact in the lineage.

The approved Mapping remains canonical.

---

# Default values deserve special treatment

A default can make lineage appear complete while hiding source failure.

Suppose:

```text
Missing Customer Group
→ default STANDARD
```

The target field is populated.

A completeness report may look good.

The lineage should expose:

- default condition;
- default value;
- approving Decision;
- applicable population;
- expiry;
- records affected.

A default is not equivalent to a source-derived value.

It should have its own transformation classification.

---

# Nulls are lineage outcomes

A missing target value may result from:

- missing source;
- Mapping not applicable;
- source value rejected;
- failed lookup;
- incomplete enrichment;
- deliberate blank;
- technical load failure.

The graph should allow these outcomes to be distinguished.

A lineage model that records only successful field population cannot support readiness analysis.

---

# Multi-source lineage

One SAP field may use several sources.

Example:

```text
Supplier Risk =
central risk score
+
local compliance status
+
supplier category
+
manual approval
```

The model should show:

```text
FEP-RISK-SCORE
FEP-COMPLIANCE-STATUS
FEP-SUPPLIER-CATEGORY
EVID-MANUAL-APPROVAL
→ MAP-SUPPLIER-RISK-DERIVATION
→ ATTR-SUPPLIER-RISK
→ FEP-S4-SUPPLIER-RISK
```

Each input should have a role:

- direct value input;
- condition;
- lookup key;
- approval gate.

This prevents a flat list of four upstream fields from implying that all four values are concatenated or copied.

---

# One source to many targets

A source field may populate several target fields.

Example:

```text
Legacy Partner Type
→ Business Partner category
→ Customer role eligibility
→ Supplier role eligibility
```

The graph should represent separate Mappings.

One broad edge:

```text
Partner Type → SAP Business Partner
```

does not show the different semantics and conditions.

---

# Many sources to one target

Several systems may supply the same business Attribute for different populations.

Example:

```text
CRM:
Customer Group for active commercial customers

ERP_B:
Customer Group for legacy regional customers

Manual enrichment:
missing organisational combinations
```

The lineage needs applicability:

```text
source A applies when...
source B applies when...
manual route applies when...
```

Otherwise, the graph appears to contain conflicting authorities.

---

# Authority is part of lineage

A field may be technically available from several systems.

The approved source of record may vary by:

- Attribute;
- country;
- business unit;
- effective date;
- lifecycle stage.

The lineage should distinguish:

```text
available source
from
authoritative source
```

A source field can be connected as Evidence without being approved for migration.

---

# Historical lineage must remain queryable

Wave 2 may have used:

```text
CRM Segment
→ direct Customer Group Mapping
```

Wave 3 may use:

```text
CRM Segment + Sales Area
→ enrichment
→ Customer Group
```

Do not overwrite the old lineage and pretend the new path always existed.

Use:

- model baselines;
- effective periods;
- superseded Mappings;
- Decisions.

This allows the team to interpret:

- older test results;
- historical defects;
- previous cutover files;
- production records loaded under earlier logic.

---

# Lineage quality dimensions

A field-level lineage chain can be evaluated across several dimensions.

## Identity completeness

Are all source, Mapping, Attribute and target IDs explicit?

## Transformation completeness

Is the nature of the transformation known?

## Context completeness

Are keys and organisational scope represented?

## Governance completeness

Are owner, Decision and status known?

## Evidence completeness

Has the declared path been verified?

## Temporal completeness

Is the applicable baseline or effective period known?

## Operational completeness

Can the team identify the implementation job or artefact?

A graph may be structurally connected and still weak in several dimensions.

---

# Lineage coverage should not be one percentage

A programme may report:

```text
95% lineage coverage
```

The number is meaningless without a definition.

Possible metrics include:

- target fields with any upstream source;
- target fields with an approved Mapping;
- target fields with transformation classification;
- target fields with evidence;
- critical fields with complete lineage;
- source fields connected to an SAP endpoint;
- paths verified in the latest load.

A better scorecard separates them:

| Measure | Coverage |
|---|---:|
| Target fields with upstream endpoint | 95% |
| Target fields with approved Mapping | 81% |
| Transformations classified | 74% |
| Paths verified by test evidence | 62% |
| Critical fields fully evidenced | 48% |

This prevents a broad technical edge from being counted as complete lineage.

---

# Build critical lineage first

A migration programme does not need field-level lineage for every field on day one.

Prioritise fields that are:

- mandatory;
- legally sensitive;
- used in key determination;
- organisationally contextual;
- derived;
- heavily defaulted;
- used by downstream interfaces;
- repeatedly failing;
- subject to local overrides;
- changed between releases.

For a Customer migration pilot, the first set might include:

- Business Partner category;
- Customer Group;
- Sales Organisation keys;
- Company Code;
- Tax Identifier;
- Payment Terms;
- Shipping Condition;
- partner roles.

The goal is to prove the method on a critical chain.

---

# A practical construction workflow

## Step 1: Register business Attributes

Define the governed concepts independently of source and target systems.

## Step 2: Register source and target FieldEndpoints

Include system, table, API path, file column or other physical locator.

## Step 3: Register expected datasets and DatasetFields

Capture what the migration process actually receives.

## Step 4: Create Mappings

Connect sources, transformations, Attributes and targets.

## Step 5: Add keys and context

Represent organisational and record-identification dependencies.

## Step 6: Add Rules and Decisions

Explain applicability, requiredness and authority.

## Step 7: Attach Evidence

Use source profiles, mapping tests and load reports.

## Step 8: Validate references

Ensure all IDs and types resolve.

## Step 9: Generate lineage edges

Build the derived graph.

## Step 10: Run trace from both directions

Trace:

```text
source → target
```

and:

```text
target → source
```

Both views expose different gaps.

---

# Trace from the target first

A target-first investigation is often the most useful during SAP migration.

Start with:

```text
FEP-S4-KNVV-KDGRP
```

Ask:

1. Which business Attribute does this endpoint implement?
2. Which Mappings populate it?
3. Which source fields feed those Mappings?
4. Which condition fields influence them?
5. Which Decisions approve them?
6. Which datasets contain the required fields?
7. Which Evidence verifies the path?
8. Which gaps remain?

Martenweave’s current `impact` example starts from `FEP-S4-KNVV-KDGRP`, while `trace` starts from the related business Attribute.

This dual direction is important:

```text
trace:
How is this concept connected?

impact:
What depends on this field or object?
```

---

# Trace from the source to find unused data

Source-first tracing answers:

> Where does this source field go?

Possible outcomes:

- one approved SAP target;
- several conditional targets;
- staging only;
- evidence only;
- no current use;
- retired Mapping.

This helps identify:

- redundant extracts;
- undocumented transformations;
- source fields included “just in case”;
- data collected but never governed;
- migration logic no longer needed.

---

# Impact analysis depends on typed lineage

Suppose the source field changes datatype.

Affected objects may include:

- DatasetField;
- Mapping;
- transformation lookup;
- SAP endpoint;
- validation test.

Suppose the business Attribute changes definition.

Affected objects may include:

- several source fields;
- several Mappings;
- Rules;
- reports;
- Decisions.

Typed lineage lets Martenweave distinguish these consequences.

A generic graph of `related_to` edges cannot.

---

# Lineage and dataset gaps should reinforce each other

Martenweave’s current dataset-gap flow compares a sample dataset with expected FieldEndpoints and can produce readiness findings or promote gaps into a draft `PatchProposal`.

Field-level lineage makes the gap more actionable.

Instead of:

```text
Column CUSTOMER_GROUP is missing.
```

the report can say:

```text
Target:
FEP-S4-KNVV-KDGRP

Business Attribute:
ATTR-CUSTOMER-GROUP

Expected source path:
FEP-CRM-CUSTOMER-SEGMENT
+ FEP-LEGACY-SALES-AREA
→ MAP-CUSTOMER-GROUP-ENRICHMENT

Observed gap:
Sales Area context absent from dataset.

Impact:
Customer Group cannot be evaluated for 18% of target records.
```

That is a migration finding, not merely a schema mismatch.

---

# Lineage and AI

AI can help extract candidate lineage from:

- mapping workbooks;
- SQL;
- transformation code;
- tickets;
- design documents;
- validation reports.

It can suggest:

```text
SEGMENT_CODE probably contributes to KNVV-KDGRP.
```

The safe workflow is:

```text
AI extraction
→ candidate Mapping
→ reference validation
→ evidence review
→ human approval
→ canonical lineage
```

AI should not create approved lineage solely from similarity.

A plausible edge can produce false impact results across the entire graph.

---

# Lineage needs negative knowledge

A mature model should also record conclusions such as:

```text
CRM Segment is not directly equivalent to Customer Group.

ERP_B does not provide Supplier Risk.

Local Review Status must not populate final Risk Classification.
```

These statements prevent future teams or agents from recreating rejected mappings.

Negative knowledge can be represented through:

- Decisions;
- rejected proposals;
- constraints;
- Findings;
- prohibited Mapping patterns.

A graph of only positive connections loses this protection.

---

# Do not confuse lineage with copying

Lineage describes dependency and provenance.

It does not imply that a value is copied unchanged.

Examples:

```text
source value copied directly
source value converted
source value used only as a condition
source value rejected
source value combined with manual evidence
```

The edge type and Mapping explain which case applies.

---

# Do not confuse lineage with process flow

A process diagram might show:

```text
Extract
→ Cleanse
→ Validate
→ Load
```

This explains stages.

It does not explain which fields feed which targets.

A field lineage graph might show:

```text
SEGMENT_CODE
→ Customer Group Mapping
→ KNVV-KDGRP
```

Both are useful.

They answer different questions.

Martenweave should link them where needed rather than turning one into a substitute for the other.

---

# Do not confuse lineage with data ownership

A source owner may not own the business definition.

Example:

```text
CRM team:
owns source field implementation

Customer Data Owner:
owns Customer Group meaning

Migration team:
owns transformation implementation

SAP team:
owns target field configuration
```

Field-level lineage should preserve these separate responsibilities.

This makes defect routing more precise.

---

# A worked Customer Group lineage

## Business concept

```text
ATTR-CUSTOMER-GROUP
Entity:
Customer Sales Area
```

## Source endpoints

```text
FEP-CRM-CUSTOMER-SEGMENT
FEP-LEGACY-SALES-AREA
```

## Dataset fields

```text
DATAFIELD-W3-SEGMENT-CODE
DATAFIELD-W3-SALES-ORG
DATAFIELD-W3-DISTRIBUTION-CHANNEL
DATAFIELD-W3-DIVISION
```

## Transformation

```text
MAP-CUSTOMER-GROUP-ENRICHMENT

Type:
conditional enrichment
```

## Decision

```text
DEC-CUSTOMER-GROUP-SOURCE-017

Direct equivalence rejected.
Sales Area context required.
```

## Target

```text
FEP-S4-KNVV-KDGRP
```

## Rule

```text
RULE-CUSTOMER-GROUP-REQUIRED

Required before Customer Sales Area activation.
```

## Evidence

```text
EVID-W3-CUSTOMER-GROUP-PROFILE
EVID-MOCK-LOAD-3-KDGRP-RESULT
```

## Complete path

```text
FEP-CRM-CUSTOMER-SEGMENT
+
FEP-LEGACY-SALES-AREA
→ MAP-CUSTOMER-GROUP-ENRICHMENT
→ ATTR-CUSTOMER-GROUP
→ FEP-S4-KNVV-KDGRP
```

with:

```text
DEC-CUSTOMER-GROUP-SOURCE-017
→ authorises Mapping

RULE-CUSTOMER-GROUP-REQUIRED
→ validates target Attribute

EVID-MOCK-LOAD-3-KDGRP-RESULT
→ verifies observed target population
```

This lineage can support:

- source readiness;
- mock-load investigation;
- impact analysis;
- change review;
- AMS handover.

---

# A worked Supplier Risk lineage

## Sources

```text
FEP-ERP-B-RISK-SCORE
FEP-COMPLIANCE-REVIEW-STATUS
FEP-SUPPLIER-CATEGORY
```

## Mapping roles

```text
Risk Score:
direct value input

Compliance Status:
approval condition

Supplier Category:
applicability condition
```

## Business output

```text
ATTR-SUPPLIER-RISK
```

## Target

```text
FEP-S4-SUPPLIER-RISK
```

## Rejected treatment

```text
UNDER_REVIEW must not become a Supplier Risk value.
```

The graph distinguishes:

```text
value dependency
from
control dependency
```

This prevents Review Status from being interpreted as another classification value.

---

# A worked manual-enrichment lineage

## Source state

The source contains no reliable Customer Group.

## Manual step

A business-owned workbook assigns values by Sales Area.

## Canonical treatment

```text
manual workbook:
Evidence and operational implementation

approved Mapping:
canonical transformation specification
```

## Lineage

```text
Customer identifier
+
Sales Area
+
reviewed enrichment workbook
→ MAP-MANUAL-CUSTOMER-GROUP
→ ATTR-CUSTOMER-GROUP
→ FEP-S4-KNVV-KDGRP
```

The workbook is visible.

It does not become the permanent source of model truth.

---

# Common failure modes

## System-to-system arrows only

The programme knows where data travelled but not how fields were produced.

## Field names used as identities

Similar labels create false lineage.

## Missing organisational keys

Central and contextual values are confused.

## Transformation hidden inside prose

The graph cannot distinguish copy, lookup, derivation or default.

## Manual enrichment omitted

The lineage falsely appears automated.

## Defaults treated as source values

Readiness looks better than reality.

## Runtime success treated as design approval

One successful load becomes mistaken for governed lineage.

## All edges shown as equally trusted

Inferred and approved connections become indistinguishable.

## Source and dataset columns collapsed

Extract schema drift is hidden.

## Every temporary staging column included

The graph becomes unreadable.

## No historical lineage

Previous waves cannot be reconstructed.

## AI-generated edges accepted directly

Plausibility replaces evidence.

---

# A field-level lineage acceptance test

For each critical SAP target field, the team should be able to answer:

1. What business Attribute does the field implement?
2. At what Entity and organisational level does it exist?
3. Which registered source endpoints contribute to it?
4. Which observed dataset columns provide those inputs?
5. Which inputs affect the value directly?
6. Which inputs only control applicability or selection?
7. What transformation produces the target?
8. Which Decision approved the Mapping?
9. Which Rule validates the result?
10. Which evidence verifies the latest migration run?
11. Which records remain unevaluable?
12. Which historical Mapping applied in earlier waves?
13. Who owns the business meaning?
14. Who owns the transformation implementation?
15. What would be affected if the source or target changed?

When several answers are missing, the programme has a partial diagram rather than governed field lineage.

---

# What Martenweave should implement next

Martenweave already has several foundations:

- canonical FieldEndpoints and business objects;
- generated lineage edges;
- trace and impact commands;
- system-lineage model objects;
- dataset-gap analysis;
- evidence, Decisions and proposal workflows.

The next focused vertical slice should strengthen **typed field lineage**.

## Goal

Represent and query field-level source-to-target paths with transformation semantics.

## Scope

Support:

- source FieldEndpoint;
- DatasetField;
- Mapping;
- business Attribute;
- target FieldEndpoint;
- direct and conditional inputs;
- Decision and Evidence links.

## First transformation classes

- direct copy;
- value conversion;
- conditional derivation;
- enrichment;
- default;
- manual assignment.

## Acceptance criteria

For `FEP-S4-KNVV-KDGRP`, Martenweave can return:

- related business Attribute;
- all upstream source fields;
- controlling context fields;
- Mapping type;
- approving Decision;
- latest supporting Evidence;
- unresolved dataset gaps.

## Validation command

```bash
martenweave validate --repo examples/customer_bp_model
```

## Functional verification

```bash
martenweave trace ATTR-CUST-SALES-CUSTOMER-GROUP \
  --repo examples/customer_bp_model

martenweave impact FEP-S4-KNVV-KDGRP \
  --repo examples/customer_bp_model
```

This would deepen an existing capability rather than create another platform.

---

# Final perspective

Field-level lineage for SAP migration is not a drawing exercise.

It is a governed explanation of how a target field came to exist.

A useful lineage path connects:

```text
source system field
→ observed extract field
→ transformation
→ business Attribute
→ SAP target field
```

and then attaches:

```text
keys
context
Rules
Decisions
Evidence
ownership
effective baseline
```

The path must distinguish:

- direct value inputs;
- conditional inputs;
- manual steps;
- defaults;
- rejected sources;
- historical alternatives.

The practical test is:

> Can the programme start from `KNVV-KDGRP` and identify the exact source fields, organisational context, approved transformation, business meaning, latest test evidence and unresolved gaps without opening five spreadsheets and asking the original consultant?

When the answer is yes, the programme has field-level lineage.

When the answer is only:

> `KNVV-KDGRP` comes from CRM,

the programme has a system arrow.

That is not enough to govern an SAP migration.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects canonical business Attributes, physical FieldEndpoints, Mappings, datasets, Rules, Decisions and Evidence so that lineage is reviewable rather than inferred from scattered documents.

The objective is not to build the largest lineage graph.

It is to make critical SAP field paths precise enough to validate, investigate and change safely.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave’s public demo generates `lineage_edges.jsonl` from canonical model files and provides trace and impact commands connecting business Attributes, physical SAP FieldEndpoints, Mappings, issues, Decisions and Evidence.

The current dataset-readiness workflow compares observed dataset structure with expected model fields, generates gap reports and can promote gaps into reviewable PatchProposals.

Martenweave Core’s release history records system-lineage objects including `IntegrationFlow`, `DataFlowStep`, `TransformationRule`, `Interface`, `InterfaceEndpoint`, `Application` and `System`, as well as proposal impact analysis and repository diffing.

OpenLineage’s current object model distinguishes Datasets, Jobs and Runs and supports both design-time and runtime lineage metadata. Its column-level lineage facet represents which input fields contribute to output fields and distinguishes direct identity, transformation and aggregation from indirect conditions such as joins, filters and conditional logic.

The proposed Martenweave transformation taxonomy and DatasetField object boundaries in this article describe a recommended product direction. They should not be treated as guarantees of the exact current canonical schema unless separately published and versioned.

Martenweave is independent and is not affiliated with or endorsed by SAP or OpenLineage.
