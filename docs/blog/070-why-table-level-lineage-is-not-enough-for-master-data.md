# Why Table-Level Lineage Is Not Enough for Master Data

**Reviewed: 14 July 2026**

A migration architect opens the lineage view and sees:

```text
Legacy ERP Customer
→ Migration Staging
→ SAP S/4HANA Customer
```

The diagram looks complete.

Every system is connected.

Every table has an upstream and downstream dependency.

The programme can answer:

- which source application feeds SAP;
- which staging area receives the extract;
- which load object writes the target;
- which jobs run between them.

Then a defect appears.

Customer Group is correct for some customers and wrong for others.

The table-level lineage still says:

```text
Legacy customer table
→ customer staging table
→ KNVV
```

That does not explain:

- which source field supplied `KNVV-KDGRP`;
- whether the value was copied or derived;
- whether Sales Area influenced the result;
- which value-conversion table was used;
- whether a default was applied;
- which business definition the target field implements;
- which records followed a manual enrichment path;
- which decision authorised the mapping.

Table-level lineage proves that a dataset moved.

It does not prove that a master-data value was interpreted correctly.

> Master-data lineage needs to describe identity, granularity, context, transformation and governance—not only movement between tables.

OpenLineage’s current specification makes the same underlying distinction. Dataset-level lineage represents dependencies between datasets, while column-level lineage adds which input fields produce which output fields and how the transformation works. Its specification distinguishes direct value derivation from indirect influences such as filters, joins and conditional logic.

For SAP migration and MDM, even column-level technical lineage is only part of the answer.

The organisation also needs to know:

- what the field means;
- which business object owns it;
- at which organisational level it applies;
- which rules govern it;
- which evidence supports the mapping;
- which decision made it authoritative.

This is where a model registry such as Martenweave must go beyond ordinary table lineage.

---

# What table-level lineage does well

Table-level lineage is useful.

It answers important operational questions:

```text
Which source table feeds this staging table?

Which job writes this target table?

Which downstream datasets depend on this extract?

Which pipelines may be affected if a table is removed?
```

In a migration landscape, this can reveal paths such as:

```text
LEGACY_CUSTOMER
→ STG_CUSTOMER
→ LOAD_CUSTOMER
→ SAP_KNA1
```

or:

```text
LEGACY_CUSTOMER_SALES
→ STG_CUSTOMER_SALES
→ LOAD_CUSTOMER_SALES
→ SAP_KNVV
```

This helps with:

- pipeline monitoring;
- job failure investigation;
- dataset dependency;
- technical change planning;
- batch scheduling;
- storage impact.

OpenLineage’s object model is designed around Datasets, Jobs and Runs. It treats a Dataset as a discrete collection such as a database table or storage object and connects datasets through jobs that create or transform them. It also separates design-time metadata from runtime observations.

This is strong infrastructure lineage.

It becomes insufficient when the problem is not:

> Did the customer table arrive?

but:

> Did the correct Customer Group reach the correct Customer Sales Area under the correct rule?

---

# Master data is not one flat record

Transactional datasets are often analysed as streams of events or rows.

Master data is structurally different.

A Business Partner may have:

- central identity;
- Customer role;
- Supplier role;
- company-code data;
- sales-area data;
- purchasing-organisation data;
- addresses;
- tax numbers;
- bank details;
- classifications;
- relationships;
- time-dependent attributes.

The relevant unit is not always “the customer table.”

For example:

```text
Customer Name
```

may exist centrally.

```text
Payment Terms
```

may exist at company-code or sales-area level depending on the business context.

```text
Customer Group
```

may exist per Sales Area.

```text
Partner Function
```

may depend on Sales Area and partner-role structure.

A table-level graph may show that `KNVV` came from a source customer-sales table.

It does not show whether the source extract preserved:

```text
Customer
Sales Organisation
Distribution Channel
Division
```

Without those keys, the target field lineage is incomplete even when both tables are connected.

---

# Granularity is part of lineage

Suppose a legacy system stores one Customer Group per customer.

SAP expects Customer Group per Customer Sales Area.

The source and target tables may be linked correctly:

```text
LEGACY_CUSTOMER
→ KNVV
```

The granularity is not.

One source value may be:

- duplicated across all Sales Areas;
- converted differently by Sales Organisation;
- enriched through another source;
- rejected because no safe organisational assignment exists.

The lineage must therefore state:

```text
Source grain:
one value per Customer

Target grain:
one value per Customer Sales Area
```

and then explain the transition.

A useful path might be:

```text
Legacy Customer Segment
+
Legacy Sales Area Assignment
→ contextual Customer Group Mapping
→ Customer Group
→ KNVV-KDGRP
```

Table-level lineage cannot express this accurately because both source grain and target grain are hidden inside dataset structure.

---

# A table contains several unrelated semantic paths

One source table may contain hundreds of fields.

Those fields may feed different target objects through different logic.

For example:

```text
LEGACY_CUSTOMER
```

could supply:

- central Customer Name;
- Search Term;
- Tax Identifier;
- Customer Group;
- Credit Classification;
- Shipping Condition;
- obsolete local fields;
- fields used only as transformation conditions.

A single edge:

```text
LEGACY_CUSTOMER → SAP_CUSTOMER
```

implies a uniform relationship that does not exist.

The real model may be:

```text
NAME1
→ direct copy
→ Business Partner Name

SEGMENT_CODE
+ SALES_UNIT
→ enrichment
→ Customer Group

PAYMENT_CLASS
→ lookup
→ Payment Terms

LEGACY_STATUS
→ filter only
→ record eligibility

OLD_RISK
→ rejected as non-authoritative
```

Each field follows a separate semantic and governance path.

---

# Table lineage hides transformation diversity

Two tables can be connected through one job, but every target field may use a different transformation type.

OpenLineage’s column-level lineage facet distinguishes:

- direct identity;
- direct transformation;
- aggregation;
- indirect join dependency;
- filter dependency;
- grouping;
- sorting;
- windowing;
- conditional dependency.

SAP master-data migrations need additional business-oriented distinctions:

```text
direct copy
value conversion
reference-data lookup
organisational enrichment
manual assignment
default
rejection
split
merge
source-authority selection
```

Consider two fields in the same target table:

```text
KNVV-KDGRP
KNVV-VSBED
```

Both may be populated by the same migration job.

Customer Group may require a contextual lookup.

Shipping Condition may be copied directly.

At table level, both appear identical:

```text
STG_CUSTOMER_SALES → KNVV
```

At field level, they have different risk, ownership and test requirements.

---

# Table lineage does not show business meaning

A technical field can be connected perfectly and still represent the wrong concept.

Example:

```text
CRM_SEGMENT
→ KNVV-KDGRP
```

Technically, the source field populates the target.

Semantically, the questions remain:

- Is CRM Segment equivalent to Customer Group?
- Is it central or sales-area-specific?
- Are the value domains compatible?
- Is one a marketing category and the other a commercial control?
- Was direct equivalence approved?
- Does the mapping apply globally?

A lineage graph that connects only columns may tell the truth about implementation while hiding a false business assumption.

Martenweave needs a semantic layer between source and target:

```text
FEP-CRM-CUSTOMER-SEGMENT
→ Mapping
→ ATTR-CUSTOMER-GROUP
→ FEP-S4-KNVV-KDGRP
```

The business Attribute acts as the governed meaning of the path.

The Mapping explains whether the source actually satisfies that meaning.

---

# Physical field and business attribute are different objects

This distinction is essential.

```text
KNVV-KDGRP
```

is a physical SAP field endpoint.

```text
Customer Group
```

is a governed business Attribute.

The Attribute can survive:

- SAP upgrades;
- custom-to-standard field replacement;
- migration-tool changes;
- new source systems;
- API redesign.

The endpoint may not.

When these are collapsed, a field change looks like a business-model change.

When they are separate, the model can state:

```text
Business meaning:
unchanged

Physical SAP implementation:
changed
```

Martenweave’s current public example already separates the Customer Group business Attribute from the physical `KNVV-KDGRP` FieldEndpoint and supports trace and impact operations across mappings, decisions and evidence.

---

# Table lineage cannot represent rejected mappings

A migration team may investigate a possible source and conclude:

> Legacy Classification must not populate Supplier Risk.

That conclusion is valuable.

A normal lineage system records positive paths:

```text
source → target
```

It usually does not preserve:

```text
source must not map to target
```

Without the negative knowledge, a later team or AI agent may rediscover the same apparent similarity and propose the rejected mapping again.

A model-governance layer should preserve:

- rejected proposal;
- Decision;
- affected objects;
- rationale;
- evidence.

This is not table dependency.

It is institutional model memory.

---

# Table lineage does not show authority

Several source tables may contain a value called `RISK_CLASS`.

Only one may be authoritative.

Another may contain:

- a copied value;
- an outdated value;
- local interpretation;
- operational workflow state;
- reporting classification.

The graph may show all three feeding the migration environment.

That does not answer:

> Which source is approved for the target Attribute?

The lineage model needs source authority by:

- Attribute;
- population;
- country;
- organisational context;
- effective period;
- lifecycle stage.

Example:

```text
Global Risk System:
authoritative for final Supplier Risk

Local ERP:
temporary fallback for historical suppliers

Review Workflow:
authoritative for Review Status, not Risk
```

Table-level edges cannot express these distinctions clearly.

---

# Table lineage does not show applicability

A Mapping may be valid only when:

```text
Country = PT
Supplier Type = Organisation
Purchasing Organisation belongs to Region South
```

A table-level edge implies the transformation applies to every row moving between the tables.

The real path is conditional.

A field-level model must connect both direct and indirect inputs.

```text
Tax Status
→ direct value input

Country
→ conditional input

Supplier Type
→ applicability input
```

OpenLineage’s specification similarly distinguishes direct dependencies, where the output derives from an input value, from indirect dependencies, where an input controls selection or calculation without contributing its value directly.

For master data, these conditional fields are often as important as the primary source field.

---

# Table lineage hides keys

A migration target field is not meaningful without its target record.

For `KNVV-KDGRP`, the relevant record is determined by:

```text
KUNNR
VKORG
VTWEG
SPART
```

The value path alone is insufficient.

The migration must also establish:

```text
Legacy Customer ID
→ SAP Customer Number

Legacy Sales Unit
→ SAP Sales Organisation

Legacy Channel
→ SAP Distribution Channel

Legacy Division
→ SAP Division
```

If the key lineage is wrong, the right value can land on the wrong record.

Table-level lineage usually treats keys as part of the dataset rather than separate governed paths.

For migration assurance, key lineage must be explicit.

---

# Table-level completeness can be misleading

Suppose every source table and target table has a documented connection.

A programme reports:

```text
Lineage coverage: 100%
```

But among 200 target fields:

- 40 have no field-level source;
- 25 use undocumented defaults;
- 18 depend on manual enrichment;
- 12 have unresolved organisational context;
- 9 rely on rejected or expired Decisions.

The table graph is complete.

The migration lineage is not.

A meaningful coverage scorecard should separate:

| Measure | Coverage |
|---|---:|
| Target datasets with upstream dataset | 100% |
| Target fields with identified source | 82% |
| Target fields with approved Mapping | 69% |
| Transformations classified | 61% |
| Critical paths with test Evidence | 44% |
| Contextual fields with complete key lineage | 38% |

The first number alone creates false confidence.

---

# Master data includes rule lineage

Some target values are not simply transformed.

They are permitted, required or rejected through Rules.

Example:

```text
Supplier Risk is mandatory before activation
when Supplier Category = STRATEGIC.
```

The lineage question is not only:

> Which source field populates Supplier Risk?

It is also:

- Which field determines Supplier Category?
- Which Rule makes Risk mandatory?
- At which lifecycle stage?
- Which exception permits a blank?
- Which validation implementation enforces it?

A complete path may be:

```text
Risk Score
→ Supplier Risk Mapping
→ Supplier Risk Attribute
→ SAP Risk Field

Supplier Category
→ applicability condition
→ Risk Required Rule
```

Table-level lineage normally excludes this control layer.

For MDM and migration readiness, the control layer is part of the real dependency.

---

# Rule implementation may differ from rule intent

The canonical Rule may state:

```text
Missing Supplier Risk blocks activation.
```

The SAP implementation may issue only a warning.

The source-to-target table path is unaffected.

Table-level lineage reports no problem.

A model registry can record:

```text
Canonical Rule
→ implemented by SAP validation
→ observed behaviour
```

The difference becomes implementation drift.

This is a governance and control issue, not a data-movement issue.

---

# Master data includes lifecycle lineage

A value can change meaning depending on its lifecycle.

For example:

```text
PENDING
CLEARED
REJECTED
```

may describe review status.

```text
LOW
STANDARD
HIGH
```

may describe final risk classification.

If a source table stores both in one column, the migration may need to split them into two target Attributes.

At table level:

```text
LEGACY_SUPPLIER → SAP_SUPPLIER
```

looks simple.

At model level:

```text
Legacy Supplier Classification
→ semantic split
├── Supplier Risk
└── Supplier Review Status
```

This requires:

- new object identity;
- value conversion;
- historical interpretation;
- separate Rules;
- separate endpoints.

A table edge cannot represent the decomposition.

---

# One table may contain several business entities

A legacy table often mixes concepts that the target separates.

For example, one customer table may contain:

- Business Partner identity;
- Customer role;
- sales-area data;
- company-code data;
- address;
- tax data;
- relationship information.

The target may distribute these across several objects and contexts.

Table-level lineage may show one source table feeding five SAP targets.

This still leaves unanswered:

- which source fields belong to which business Entity;
- which fields are repeated at different grains;
- which records need to be expanded;
- which relationships must be created;
- which values belong to the role rather than the central partner.

The correct lineage must follow model objects, not only storage containers.

---

# Several tables may implement one business concept

The reverse problem is also common.

One business Attribute may be assembled from:

- central table;
- organisational table;
- lookup table;
- custom extension;
- external reference source.

Example:

```text
Customer Group
```

may depend on:

```text
CRM customer segment
legacy sales organisation
regional conversion table
manual exception list
```

The table graph shows four upstream datasets.

It does not explain their roles.

Field-level semantic lineage can distinguish:

```text
CRM Segment:
value input

Sales Organisation:
context input

Conversion Table:
lookup implementation

Exception List:
temporary override
```

---

# Table lineage does not explain defaults

Defaults are particularly dangerous in migration.

A target table can be fully populated even when the source does not support the value.

Example:

```text
Missing Customer Group
→ default 01
```

A table-level reconciliation may report:

```text
Target row count matches.
Target field completeness is 100%.
```

The business risk remains hidden.

A governed lineage path should show:

- source missing;
- default applied;
- Decision approving default;
- affected population;
- expiry;
- owner;
- downstream risk.

The correct lineage is not:

```text
Source Customer Table → KNVV
```

It is:

```text
No authoritative source
→ approved temporary default
→ Customer Group
→ KNVV-KDGRP
```

---

# Table lineage does not explain manual work

Many master-data migrations contain manual steps:

- business review spreadsheets;
- stewardship assignment;
- legal validation;
- local conversion lists;
- exception decisions;
- record-by-record correction.

Technical lineage often omits them because they are not jobs in the orchestration platform.

The resulting graph falsely suggests automation.

A truthful path might be:

```text
Legacy Tax Status
→ legal review workbook
→ approved Tax Exemption decision
→ migration Mapping
→ SAP Tax Classification
```

The workbook should not become canonical model truth.

The manual step should still be visible as Evidence or an implementation activity.

---

# Table lineage does not expose unresolved ambiguity

Suppose a target field is populated, but two teams disagree on the source meaning.

One says:

```text
CRM Segment is authoritative.
```

Another says:

```text
Legacy Sales Classification is authoritative.
```

The pipeline currently uses CRM.

Table-level lineage reports:

```text
CRM table → SAP table
```

This makes an implementation choice look like an approved semantic decision.

A model registry should represent:

- current implementation;
- disputed Finding;
- competing Evidence;
- Decision required;
- proposed alternatives.

This distinction prevents runtime behaviour from silently becoming governance truth.

---

# Table lineage is weak for impact analysis

Consider a change to Customer Group.

Table-level impact may identify:

```text
KNVV
customer staging table
migration customer job
```

A real impact assessment may need:

- Customer Group business definition;
- Sales Area Entity;
- source mapping;
- value conversion;
- mandatory Rule;
- readiness report;
- local override;
- downstream pricing interface;
- business owner;
- open proposal.

The change is not a table change.

It is a governed concept change with table consequences.

Martenweave’s pipeline explicitly runs lineage and impact analysis after validation and index generation, using canonical objects rather than an independently edited technical graph.

---

# The right model is layered lineage

The solution is not to discard table-level lineage.

It is to place it inside a layered model.

## System layer

```text
Legacy CRM
→ Migration Platform
→ SAP S/4HANA
```

Useful for architecture and ownership.

## Dataset layer

```text
CRM_CUSTOMER
→ STG_CUSTOMER
→ LOAD_CUSTOMER_SALES
→ KNVV
```

Useful for pipeline operations.

## Field layer

```text
SEGMENT_CODE
+ SALES_UNIT
→ KDGRP
```

Useful for transformation and defect investigation.

## Semantic layer

```text
Customer Segment
→ approved Mapping
→ Customer Group
```

Useful for business meaning.

## Governance layer

```text
Decision
→ Mapping
→ Rule
→ Evidence
```

Useful for approval and traceability.

## Runtime layer

```text
Extract 2026-07-12
→ transformation run 184
→ mock load 3
```

Useful for observed execution.

No single layer is enough.

Together, they create usable lineage.

---

# Not every field needs full semantic lineage

A programme should not model every technical column with equal depth.

Some fields may need only:

```text
source column
→ direct copy
→ target column
```

Others require the complete governance chain.

Prioritise fields that are:

- mandatory;
- key-forming;
- organisationally contextual;
- derived;
- legally significant;
- defaulted;
- manually enriched;
- disputed;
- heavily reused;
- changed between migration waves;
- connected to downstream interfaces.

This prevents lineage work from becoming another metadata-collection programme with no delivery outcome.

---

# A practical escalation rule

Use table-level lineage as the starting point.

Escalate to field-level and semantic lineage when at least one of these conditions applies:

```text
The target field is critical.

The transformation is not a direct copy.

Source and target grain differ.

Several sources compete.

A default is used.

A manual step exists.

A Rule affects applicability or requiredness.

A Decision is needed.

A defect cannot be explained at table level.

The field changes across releases.

Downstream consumers depend on its meaning.
```

This keeps the approach proportionate.

---

# A Customer Group example

## Table-level view

```text
CRM_CUSTOMER
→ CUSTOMER_STAGING
→ SAP_KNVV
```

Useful information:

- source dataset;
- staging dataset;
- target table.

Missing information:

- source field;
- Sales Area context;
- transformation;
- Attribute meaning;
- validation Rule;
- Decision;
- test Evidence.

## Field-level view

```text
CRM_CUSTOMER.SEGMENT_CODE
+
CRM_CUSTOMER.SALES_UNIT
→ CUSTOMER_STAGING.CUSTOMER_GROUP
→ SAP_KNVV.KDGRP
```

Better, but still incomplete.

## Governed lineage

```text
FEP-CRM-CUSTOMER-SEGMENT
+
FEP-LEGACY-SALES-AREA
→ MAP-CUSTOMER-GROUP-ENRICHMENT
→ ATTR-CUSTOMER-GROUP
→ FEP-S4-KNVV-KDGRP
```

Connected governance:

```text
DEC-CUSTOMER-GROUP-SOURCE-017
→ authorises Mapping

RULE-CUSTOMER-GROUP-REQUIRED
→ governs Attribute

EVID-MOCK-LOAD-3-KDGRP
→ verifies target result
```

This path supports investigation and controlled change.

---

# A Supplier example

## Table-level view

```text
LEGACY_SUPPLIER
→ SUPPLIER_STAGING
→ SAP_SUPPLIER
```

## Actual model problem

The legacy field contains:

```text
LOW
MEDIUM
HIGH
UNDER_REVIEW
```

The target separates:

```text
Supplier Risk:
LOW
MEDIUM
HIGH

Supplier Review Status:
PENDING
CLEARED
REJECTED
```

The correct lineage is a semantic split:

```text
LEGACY_SUPPLIER.CLASSIFICATION
→ classification interpretation
├── ATTR-SUPPLIER-RISK
└── ATTR-SUPPLIER-REVIEW-STATUS
```

Table lineage cannot explain why one source field produces two governed target concepts.

---

# A Product example

## Table-level view

```text
LEGACY_MATERIAL
→ PRODUCT_STAGING
→ MARA/MARC
```

## Missing granularity

A legacy field may be central.

The SAP target may be plant-specific.

Example:

```text
Planning Group
```

may require plant context.

The complete path needs:

```text
Legacy Product
+
Legacy Site
→ Plant mapping
→ Product Plant Attribute
→ SAP MARC field
```

The table path alone hides the central-to-plant expansion.

---

# Table-level lineage is still useful for discovery

A table graph can help identify where to investigate first.

For example:

1. find datasets feeding `KNVV`;
2. identify jobs writing the table;
3. inspect candidate source tables;
4. extract field-level mappings;
5. connect fields to business Attributes;
6. add Decisions and Evidence.

This is a sensible bottom-up workflow.

The mistake is stopping after step 1 and calling the lineage complete.

---

# Automated extraction has limits

Technical tools may extract lineage from:

- SQL;
- ETL configuration;
- mapping code;
- orchestration metadata;
- SAP interfaces.

This can produce valuable field dependencies.

It may still miss:

- manual enrichment;
- business interpretation;
- rejected alternatives;
- source authority;
- temporary defaults;
- local Decisions;
- implementation drift.

Automation should create candidate technical lineage.

The governance layer requires controlled model objects and human review.

---

# AI can bridge documents and technical lineage

AI can help connect:

- table mappings;
- field names;
- transformation code;
- design documents;
- tickets;
- test reports.

It might suggest:

```text
SEGMENT_CODE appears to feed KDGRP through lookup CUSTOMER_GROUP_MAP.
```

The proposal should remain reviewable.

Martenweave’s current operating principle is that agents propose, validators verify, humans approve and Git records the accepted change.

This is especially important for lineage.

One false edge can distort impact analysis across many objects.

---

# A layered lineage query

A useful Martenweave query for `FEP-S4-KNVV-KDGRP` should return something like:

```text
Physical target:
S4 KNVV-KDGRP

Business Attribute:
Customer Group

Entity:
Customer Sales Area

Upstream source:
CRM Customer Segment

Context inputs:
Sales Organisation
Distribution Channel
Division

Transformation:
Conditional enrichment

Mapping status:
Approved

Decision:
Direct equivalence rejected

Rule:
Required before Sales Area activation

Evidence:
Mock Load 3 validation

Open gap:
ERP_B lacks Sales Area context
```

This is much more actionable than:

```text
Upstream table:
CRM_CUSTOMER
```

---

# A minimum viable improvement over table lineage

Martenweave does not need to recreate a full enterprise lineage platform.

The smallest useful extension is to require, for critical target fields:

1. target FieldEndpoint;
2. business Attribute;
3. source FieldEndpoint or explicit missing source;
4. Mapping type;
5. contextual input fields;
6. approving Decision;
7. supporting Evidence;
8. unresolved Finding.

This is enough to support:

- gap analysis;
- impact;
- migration readiness;
- release comparison;
- AMS investigation.

---

# Acceptance criteria

A master-data lineage implementation should not be considered complete merely because every target table has an upstream table.

For each critical target field, verify:

## Identity

- target field has a stable FieldEndpoint ID;
- business Attribute is explicit;
- source fields have stable identities.

## Granularity

- source grain is known;
- target grain is known;
- key expansion or contraction is documented.

## Transformation

- copy, conversion, enrichment, default or manual treatment is classified;
- conditional inputs are represented separately.

## Governance

- authoritative source is declared;
- Decision is linked;
- applicable Rule is linked.

## Evidence

- latest test or load evidence is connected;
- unresolved ambiguity is represented as a Finding.

## History

- previous wave lineage remains traceable;
- retired mappings are not silently deleted.

When these checks fail, table-level lineage should be labelled as partial rather than complete.

---

# Common arguments for stopping at table level

## “The ETL tool already shows lineage.”

It shows technical dependencies.

It may not show business meaning, authority, local exceptions or decisions.

## “Field lineage is too expensive.”

Full field lineage for every field may be.

Critical-field lineage is far cheaper than repeated migration defects.

## “The mapping workbook already contains fields.”

A workbook may contain the mapping but not stable identity, rules, evidence and approved history.

## “The SAP table tells us the object.”

One table may contain several semantic contexts, and one business concept may span several tables.

## “We can investigate manually when a defect appears.”

That preserves dependency on the original experts and increases cutover risk.

## “AI can infer it later.”

AI can propose likely connections. It cannot recover missing approval and authority reliably.

---

# What Martenweave should build next

Martenweave already has:

- canonical object references;
- generated lineage edges;
- trace and impact;
- dataset-gap analysis;
- system-lineage objects;
- proposal-first change control.

The next vertical slice should introduce a **critical-field lineage completeness check**.

## Goal

Identify SAP target fields that have only dataset- or table-level lineage but lack governed field-level context.

## Scope

For selected FieldEndpoints, require:

- business Attribute;
- upstream source;
- Mapping;
- transformation classification;
- Entity context;
- Decision or declared provisional status;
- Evidence.

## Example warning

```text
MW-LINEAGE-004

Target:
FEP-S4-KNVV-KDGRP

Table-level upstream:
CRM_CUSTOMER

Missing:
- approved source FieldEndpoint;
- Sales Area context;
- transformation classification;
- supporting Decision.
```

## Acceptance criteria

The Customer Group example must distinguish:

```text
table dependency:
CRM_CUSTOMER → KNVV

governed field lineage:
CRM Segment + Sales Area
→ enrichment Mapping
→ Customer Group
→ KNVV-KDGRP
```

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

This would strengthen existing functionality without turning Martenweave into a generic pipeline-observability platform.

---

# Final perspective

Table-level lineage answers:

> Which datasets and systems are connected?

Master-data lineage must also answer:

> Which governed value moved, under what meaning, for which business context, through which transformation and with whose approval?

For SAP migration, the useful chain is not merely:

```text
Legacy table
→ staging table
→ SAP table
```

It is:

```text
source field
+
record keys
+
organisational context
→ transformation
→ business Attribute
→ SAP target field
```

supported by:

```text
Rule
Decision
Evidence
ownership
effective baseline
```

Table-level lineage remains valuable.

It is the map of the highways.

Master-data migration fails at the junctions:

- one field mapped to the wrong meaning;
- one central value expanded across the wrong contexts;
- one default hiding missing source data;
- one workflow status loaded as final classification;
- one unapproved source treated as authoritative.

Those failures are invisible at table level.

The practical test is:

> Can the programme explain why one specific Customer received one specific Customer Group in one specific Sales Area—and trace that result to source fields, transformation logic, a governed Attribute, an approved Decision and test Evidence?

When the answer is yes, the lineage is useful for master data.

When the answer is only:

> The customer table feeds `KNVV`,

the graph is technically correct and operationally incomplete.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It complements technical dataset lineage by connecting source and target fields to business Attributes, contextual Entities, Mappings, Rules, Decisions and Evidence.

The objective is not to replace pipeline-lineage tools.

It is to capture the model knowledge those tools usually cannot prove.

## Sources and notes

This article was reviewed on 14 July 2026.

OpenLineage’s current object model represents lineage through Datasets, Jobs and Runs and supports both runtime observations and design-time metadata. It treats database tables and similar discrete data collections as Datasets connected through transforming Jobs.

OpenLineage’s column-level lineage facet extends dataset dependency with information about which input fields produce output fields and how. It distinguishes direct identity, transformation and aggregation from indirect dependencies such as joins, filters and conditional logic.

Martenweave’s current public example generates lineage edges from canonical model files and provides trace and impact operations connecting business Attributes, physical SAP FieldEndpoints, Mappings, Decisions and Evidence.

Martenweave’s documented pipeline validates canonical files, builds generated indexes, detects gaps, runs lineage and impact analysis and routes proposed changes through human review rather than direct system mutation.

The layered-lineage model and critical-field completeness check proposed in this article describe a recommended Martenweave product direction. They should not be interpreted as a claim that every illustrated lineage object or validation code already exists in the current release.

Martenweave is independent and is not affiliated with or endorsed by SAP or OpenLineage.
