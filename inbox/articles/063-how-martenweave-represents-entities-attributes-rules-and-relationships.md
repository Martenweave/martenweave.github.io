# How Martenweave Represents Entities, Attributes, Rules and Relationships

**Reviewed: 14 July 2026**

A migration workbook contains one row:

| Source field | Target field | Rule |
|---|---|---|
| CRM_SEGMENT | KNVV-KDGRP | Map according to business decision |

The row appears to describe a mapping.

In reality, it compresses several different model concepts:

- Customer;
- Customer Sales Area;
- CRM Segment;
- Customer Group;
- the relationship between Customer and Sales Area;
- the physical source field;
- the physical SAP target field;
- the transformation between them;
- the applicability rule;
- the business decision authorising the treatment.

When these concepts are stored as one row, teams lose the ability to ask precise questions.

Is Customer Group central or sales-area-specific?

Does CRM Segment have the same business meaning?

Which customer and organisational context does the mapping require?

Is the rule about completeness, derivation or activation?

Does the SAP field implement the business attribute directly, or only in one specific target system?

The spreadsheet row cannot answer these questions reliably because it does not distinguish the things being described.

Martenweave uses separate object types for this reason.

Its current product model includes domains, entities, attributes, relationships, datasets, mappings, rules, evidence, decisions and change proposals. SAP migration and MDM are the first domain pack rather than the limit of the underlying registry.

The objective is not to create the largest possible metamodel.

It is to represent enough distinctions that model knowledge can be:

- validated;
- traced;
- compared;
- reviewed;
- changed safely.

> A useful metamodel separates business meaning, structural relationships, behavioural constraints and physical implementation.

Entities describe the things the organisation governs.

Attributes describe their properties.

Relationships describe how governed things are connected.

Rules describe conditions and expected behaviour.

Mappings describe how representations are transformed.

Field endpoints describe where data physically appears.

Decisions and evidence explain why the model has its current form.

Collapsing these concepts may make authoring look simpler. It makes every later investigation harder.

---

# Begin with the business thing, not the SAP table

A common SAP modelling habit begins with physical structure:

```text
KNA1
KNVV
LFA1
BUT000
MARA
MARC
```

These tables matter.

They are implementation structures.

They are not always the best starting point for governed meaning.

A business-oriented model begins with concepts such as:

- Business Partner;
- Customer;
- Customer Sales Area;
- Supplier;
- Supplier Purchasing Organisation;
- Product;
- Plant Product;
- Tax Identification;
- Supplier Risk Assessment.

The distinction matters because one business concept may be implemented:

- in several SAP tables;
- in several source systems;
- differently by country;
- differently before and after migration;
- through an MDM platform rather than directly in SAP.

If the canonical object is named after one table field, the model becomes coupled to that implementation.

A stronger separation is:

```text
Business concept:
Customer Group

Physical SAP endpoint:
KNVV-KDGRP
```

The first object answers:

> What does the organisation mean by Customer Group?

The second answers:

> Where is that concept represented in this SAP implementation?

This separation allows the same business attribute to connect to:

- a legacy source field;
- an SAP field;
- an MDM field;
- a report dimension;
- a future target endpoint.

Martenweave’s trace and impact examples deliberately distinguish the business attribute `ATTR-CUST-SALES-CUSTOMER-GROUP` from the physical SAP field endpoint `FEP-S4-KNVV-KDGRP`.

---

# Domain

The Domain is the broadest governance boundary in the core metamodel.

Examples:

```text
Customer
Supplier
Business Partner
Product
Finance
Organisation
```

A Domain can help determine:

- ownership;
- vocabulary;
- validation policies;
- repository navigation;
- domain-specific rules;
- reporting and scorecards.

A Domain should not become a miscellaneous folder for everything related to one SAP module.

For example, Customer is not simply `SD`.

Customer data may be used by:

- Sales and Distribution;
- Finance;
- Credit Management;
- Service;
- Reporting;
- external applications.

Likewise, Business Partner is not only an SAP technical construct. It may connect several roles and operational contexts.

A domain boundary should reflect governance responsibility and semantic coherence rather than the organisational chart of the implementation project.

A conceptual Domain object might contain:

```yaml
---
id: DOMAIN-CUSTOMER
type: Domain
name: Customer
status: approved
owners:
  - ROLE-GLOBAL-CUSTOMER-DATA-OWNER
---
```

The exact current schema may differ. The example demonstrates the object boundary.

---

# Entity

An Entity represents a governed type of business thing or context-bearing record.

Examples include:

- Customer;
- Customer Sales Area;
- Supplier;
- Supplier Purchasing Organisation;
- Product;
- Product Plant;
- Tax Exemption;
- Risk Assessment.

In conventional entity–relationship modelling, entity types classify things of interest in a domain, attributes describe their properties, and relationships express associations between entity types.

Martenweave uses the same broad distinction but applies it to model governance, migration evidence and physical implementations.

An Entity is not necessarily:

- one database table;
- one API object;
- one spreadsheet tab;
- one SAP transaction.

Consider Customer Sales Area.

It may be implemented in SAP through `KNVV`.

But the governed entity means more than the table.

It represents a Customer in a defined combination of:

- Sales Organisation;
- Distribution Channel;
- Division.

The Entity establishes the granularity at which relevant attributes exist.

That enables the registry to distinguish:

```text
Customer Name:
central Customer attribute

Customer Group:
Customer Sales Area attribute
```

Without the entity boundary, teams may map a central CRM field directly to an organisational SAP field because both appear to describe the customer.

---

# An entity is a type, not a production record

Martenweave’s model registry describes model objects.

It does not need to store every customer or supplier instance as a canonical Markdown object.

This distinction is essential:

```text
Entity type:
Customer

Instance:
Customer 1000458921
```

The canonical Entity defines:

- meaning;
- identifiers;
- relationships;
- applicable attributes;
- governance context.

Production systems and datasets contain the instances.

Dataset evidence can then be assessed against the Entity and its expected fields.

If the registry attempted to store all business records, it would become another operational data platform.

That is outside Martenweave’s intended role.

---

# Contextual entities are often more important than teams expect

Many migration problems result from modelling everything at the central master-record level.

SAP landscapes commonly contain data at organisational or contextual levels:

- Customer Sales Area;
- Customer Company Code;
- Supplier Purchasing Organisation;
- Supplier Company Code;
- Material Plant;
- Material Sales Organisation;
- Business Partner Role.

These are not merely technical extensions.

They represent contexts in which different facts can be true.

For example:

```text
Customer 1000
may have Customer Group A in Sales Area 1010/10/00
and Customer Group B in Sales Area 2010/20/00.
```

Treating Customer Group as a central Customer attribute destroys this possibility.

A canonical metamodel should therefore represent the contextual Entity explicitly rather than hide its granularity inside field descriptions.

---

# Attribute

An Attribute describes a governed property of an Entity.

Examples:

```text
Customer Name
Customer Group
Supplier Risk
Legal Form
Tax Identifier
Payment Terms
Review Status
```

An Attribute object should define more than a label.

Depending on scope, useful properties can include:

- business definition;
- owning Entity;
- Domain;
- datatype or value type;
- cardinality;
- allowed values;
- applicability;
- owner;
- confidentiality or criticality;
- physical endpoints;
- related rules;
- evidence and decisions.

A conceptual representation might be:

```yaml
---
id: ATTR-CUSTOMER-GROUP
type: Attribute
name: Customer Group
domain: DOMAIN-CUSTOMER
entity: ENTITY-CUSTOMER-SALES-AREA
status: approved
owners:
  - ROLE-GLOBAL-CUSTOMER-DATA-OWNER
---
```

The body can then explain meaning:

```markdown
Customer Group is a sales-area-specific commercial classification.

It must not be treated as automatically equivalent to a central CRM
segment without an approved organisational mapping.
```

The structured fields allow validation and traversal.

The body preserves human interpretation.

---

# Attribute and field are not synonyms

This is one of the most important Martenweave distinctions.

An Attribute is semantic.

A FieldEndpoint is physical.

Example:

```text
Attribute:
Supplier Risk

Possible endpoints:
ERP_A.RISK_CODE
ERP_B.SUPP_CLASS
MDG.ZZ_RISK_LEVEL
S4.BusinessPartner.SupplierRisk
```

The same Attribute can have several endpoints.

One physical endpoint can also be misleadingly named.

For example:

```text
CRM_SEGMENT
```

may appear related to:

```text
Customer Group
```

The names alone do not prove equivalence.

A Mapping must establish how one representation becomes another.

A Decision may be required to approve that Mapping.

This separation prevents the model from assuming that every similarly named field carries the same meaning.

---

# When something should not be an attribute

Teams often model every column as an Attribute.

That produces weak semantics.

A concept may deserve another object type when it has:

- its own lifecycle;
- its own ownership;
- several properties;
- relationships to several entities;
- effective dates;
- evidence;
- approval.

Consider Tax Exemption.

A simple implementation might use:

```text
Tax Exempt = Yes/No
```

But the real concept may require:

- jurisdiction;
- exemption reason;
- valid-from date;
- valid-to date;
- evidence document;
- approving authority;
- affected tax type.

That is no longer one scalar Attribute.

It may be better represented as an Entity or governed Relationship connected to the Supplier.

The practical rule is:

> When a concept has independent identity, lifecycle or several governed properties, consider modelling it as an Entity rather than compressing it into one Attribute.

---

# Relationship

A Relationship represents a semantic association between model objects.

Examples:

```text
Customer participates in Sales Area

Supplier is extended to Purchasing Organisation

Business Partner plays Customer Role

Product is maintained for Plant

Tax Exemption applies to Supplier in Jurisdiction
```

A Relationship is not merely a generic edge in a graph.

It should describe:

- what is connected;
- relationship meaning;
- direction or roles;
- cardinality;
- optionality;
- context;
- lifecycle where relevant.

A conceptual object might state:

```yaml
---
id: REL-CUSTOMER-SALES-AREA
type: Relationship
name: Customer participates in Sales Area
from_entity: ENTITY-CUSTOMER
to_entity: ENTITY-SALES-AREA
cardinality:
  from: one
  to: many
status: approved
---
```

The exact schema can evolve.

The key point is that the Relationship carries meaning that cannot be inferred safely from file proximity.

---

# Not every reference is a business relationship

Martenweave objects also have technical or governance references:

```text
Attribute references Entity
Mapping references target endpoint
Decision affects Rule
Evidence supports Finding
Proposal modifies Attribute
```

These references form graph edges in the generated index.

They are not all domain Relationships.

This distinction matters.

Compare:

```text
Customer participates in Sales Area
```

with:

```text
Decision DEC-017 affects Customer Group
```

Both can be traversed as edges.

Only the first is part of the business model.

The second is a governance relationship.

The index may store both as typed edges.

The canonical metamodel should preserve their different meanings.

---

# Relationship versus contextual entity

Some business associations are simple.

Others carry their own Attributes.

For example:

```text
Customer — participates in — Sales Area
```

If the connection carries:

- Customer Group;
- Shipping Condition;
- Sales Office;
- Pricing Procedure;

the association becomes a context-bearing business object.

It can be represented as:

```text
Customer Sales Area
```

rather than as a relationship with many attached properties.

This is a standard modelling trade-off.

For Martenweave, the decision should favour whichever representation makes:

- granularity;
- ownership;
- mappings;
- physical endpoints;
- rules;

most explicit.

The goal is not theoretical purity.

The goal is reliable governance and traceability.

---

# Rule

A Rule states a condition, constraint, derivation or expected behaviour.

Examples:

- Supplier Risk is required before activation for strategic supplier organisations.
- Customer Group is required when a Customer Sales Area is active.
- Tax Identifier must match the approved country format.
- Review Status `PENDING` blocks final distribution.
- CRM Segment may not be copied directly to Customer Group without an approved contextual mapping.

Rules should be separate from Attributes because one Attribute can have several rules:

```text
Supplier Risk
├── completeness rule
├── applicability rule
├── allowed-value rule
├── activation rule
└── distribution rule
```

Likewise, one Rule can involve several Attributes.

Example:

```text
If Supplier Category = STRATEGIC
and Review Status = CLEARED,
then Supplier Risk must be present before activation.
```

Compressing this logic into one Attribute definition makes it difficult to:

- validate;
- test;
- version;
- reuse;
- override by context;
- connect to implementation.

---

# Rule type matters

A useful model distinguishes several rule families.

## Definition rule

Clarifies semantic boundaries.

Example:

> Supplier Risk represents final classification, not review state.

## Applicability rule

Defines where a concept applies.

Example:

> Tax Identifier rule applies to Portuguese supplier organisations.

## Completeness rule

Defines when a value is required.

Example:

> Customer Group is required for active Customer Sales Areas.

## Validation rule

Defines acceptable values or formats.

Example:

> Country code must belong to the approved reference list.

## Derivation rule

Defines how a value is calculated.

Example:

> Risk Category is derived from approved score bands.

## Lifecycle rule

Defines permitted states or transitions.

Example:

> `PENDING` may transition to `CLEARED` or `REJECTED`.

## Distribution rule

Defines when information can be sent downstream.

Example:

> Records under review must not be distributed as final master data.

These distinctions help determine:

- required evidence;
- expected implementation;
- testing approach;
- impact.

A single generic `Rule` type can still carry a rule category rather than requiring a separate top-level object type for every family.

---

# A rule is not the same as its implementation

A Rule can be implemented in:

- SAP MDG validation;
- BRFplus;
- ABAP;
- migration transformation;
- source-system control;
- data-quality platform;
- manual stewardship procedure.

The canonical Rule describes intended behaviour.

Implementation references describe where the behaviour is enforced.

This creates a useful comparison:

```text
Canonical rule:
Supplier Risk blocks activation when missing.

SAP implementation:
BRFplus rule Z_SUPP_RISK_04.

Migration implementation:
Readiness validation RULE_018.

Operational procedure:
AMS review instruction KA-0081.
```

If one implementation differs, the Rule does not automatically change.

The difference becomes an implementation-drift finding.

SAP currently positions MDG around governed models, semantic relationships, ownership, validated values, workflows and business rules. Martenweave’s role is not to replace that operational enforcement, but to preserve the independent model context that implementations should follow.

---

# Mapping

A Mapping explains how one representation relates or transforms into another.

Examples:

```text
Legacy supplier class → Supplier Risk

CRM Segment → Customer Group

Legacy country code → ISO country code

Source table column → SAP field endpoint
```

A Mapping should not be treated as a generic Relationship.

A Relationship says:

> These concepts are associated.

A Mapping says:

> This source representation is transformed or interpreted as this target representation under defined conditions.

A Mapping may require:

- source object;
- target object;
- transformation;
- applicability;
- default behaviour;
- rejected values;
- owner;
- evidence;
- decision;
- status.

Conceptually:

```yaml
---
id: MAP-CRM-SEGMENT-TO-CUSTOMER-GROUP
type: Mapping
source: FEP-CRM-CUSTOMER-SEGMENT
target: FEP-S4-KNVV-KDGRP
business_attribute: ATTR-CUSTOMER-GROUP
status: pending_review
decision:
  - DEC-CUSTOMER-GROUP-SOURCE-017
---
```

Again, this demonstrates the distinction rather than the exact current schema.

---

# Mapping is not proof of equivalence

A mapping can express several different treatments:

## Direct equivalence

```text
A → B
```

## Value conversion

```text
01 → STANDARD
02 → STRATEGIC
```

## Conditional transformation

```text
When Country = PT and Supplier Type = ORGANISATION,
source value X becomes target value Y.
```

## Aggregation

Several source values contribute to one target.

## Split

One source value populates several target attributes.

## Enrichment

Target value requires source data plus external evidence.

## Rejection

No safe target mapping exists.

Therefore, the existence of a Mapping does not mean source and target are semantically identical.

The Mapping object should make the treatment explicit.

---

# FieldEndpoint

The physical endpoint object connects the semantic model to implementation.

A FieldEndpoint can represent:

- table field;
- API property;
- file column;
- message element;
- MDM attribute;
- report dimension.

Useful properties may include:

- system;
- object or table;
- field;
- path;
- datatype;
- length;
- organisational context;
- source or target role;
- technical owner.

Example:

```yaml
---
id: FEP-S4-KNVV-KDGRP
type: FieldEndpoint
system: S4
object: KNVV
field: KDGRP
business_attribute: ATTR-CUSTOMER-GROUP
status: active
---
```

Separating endpoints from Attributes enables:

- field-level lineage;
- migration-gap detection;
- target impact analysis;
- system replacement;
- comparison between physical and business definitions.

Martenweave’s dataset-gap workflow compares dataset fields with expected FieldEndpoints, while its trace and impact commands connect business Attributes to physical SAP endpoints and related evidence.

---

# Dataset and dataset field

A Dataset represents an observed data source used for:

- profiling;
- migration readiness;
- testing;
- evidence;
- gap detection.

Examples:

```text
ERP_B Customer Extract
Mock Load 3 Supplier File
SAP Production Customer Snapshot
MDG Validation Export
```

A DatasetField represents a concrete column or path in that dataset.

The distinction between DatasetField and FieldEndpoint can be useful.

A FieldEndpoint describes a registered physical location in a system or interface.

A DatasetField describes what appeared in one specific extract.

For example:

```text
Registered endpoint:
ERP_B.CUSTOMER.SEGMENT

Observed dataset field:
SEGMENT_CODE in extract dated 2026-07-10
```

The two may be linked.

They are not necessarily identical.

This allows Martenweave to detect:

- expected field absent from extract;
- unexpected field present;
- renamed column;
- different datatype;
- schema drift.

---

# Evidence

Evidence is not part of the business model in the same way as an Entity or Attribute.

It supports claims about the model.

Evidence may include:

- dataset profile;
- ticket;
- validation report;
- workshop outcome;
- source-system analysis;
- SAP configuration extract;
- legal interpretation;
- test result.

An Evidence object should answer:

- What was observed?
- Where did it come from?
- When was it collected?
- Which model objects does it concern?
- How reliable is it?
- Can the source be retrieved?

Evidence should not silently change the model.

It can support:

- Finding;
- Decision;
- PatchProposal;
- closure verification.

---

# Decision

A Decision records an authorised choice.

Examples:

- CRM Segment is not automatically equivalent to Customer Group.
- Supplier Review Status must be separate from Supplier Risk.
- Portugal may use a contextual Tax Exemption rule.
- ERP_B remains a temporary source pending remediation.

A Decision is distinct from a Rule.

The Decision explains what was chosen and why.

The Rule expresses the resulting governed behaviour.

Example:

```text
Decision:
Supplier Review Status must be separate from final risk classification.

Resulting objects:
ATTR-SUPPLIER-REVIEW-STATUS
RULE-SUPPLIER-RISK-ACTIVATION
REL-SUPPLIER-RISK-REVIEW
```

Keeping Decisions as objects preserves institutional memory and prevents future teams from reversing earlier conclusions without seeing the evidence.

---

# Finding

A Finding represents an interpreted issue or gap discovered through evidence.

Examples:

- source cannot provide Supplier Risk;
- mapping granularity is ambiguous;
- SAP configuration differs from approved Rule;
- local field has become a shadow model;
- ownership is missing.

A Finding should not be modelled as a Rule or Decision.

It is the object that connects:

```text
observation
→ investigation
→ decision
→ proposal
→ implementation
→ verification
```

The Finding may eventually be closed.

The resulting model objects remain.

---

# PatchProposal

A PatchProposal describes a possible canonical change.

It can propose:

- adding an Attribute;
- changing a definition;
- retiring a Mapping;
- adding a Relationship;
- changing Rule applicability;
- assigning an owner.

The proposal remains separate from approved truth.

Martenweave’s current workflow explicitly uses `PatchProposal` objects for AI- or automation-generated changes, keeps them in reviewable status and requires human approval before canonical state changes.

A proposal should reference:

- affected objects;
- evidence;
- finding;
- decision required;
- anticipated impact.

This makes change review more precise than editing a document and asking reviewers to find the semantic delta themselves.

---

# The metamodel should not become an ontology project

Once teams begin distinguishing object types, there is a temptation to model everything.

Possible additions include:

- processes;
- capabilities;
- applications;
- APIs;
- organisations;
- policies;
- controls;
- events;
- services;
- projects;
- requirements;
- risks.

Some may become useful.

Adding them too early would weaken the product.

Martenweave’s first value comes from a smaller chain:

```text
Domain
→ Entity
→ Attribute
→ FieldEndpoint
→ Mapping
→ Rule
→ Evidence
→ Decision
→ Proposal
```

This chain already supports:

- dataset gaps;
- lineage;
- impact;
- migration readiness;
- model change review;
- AMS investigations.

The criterion for adding another object type should be:

> Does this object enable a concrete validation, trace, impact or review capability that cannot be represented safely with the current model?

If not, it may belong in Markdown explanation or an external system.

---

# Avoid the universal-object anti-pattern

A superficially flexible design could use one object:

```yaml
type: Thing
properties: {}
links: []
```

This makes every concept technically representable.

It removes most deterministic meaning.

The validator cannot easily determine:

- whether a Mapping has valid endpoints;
- whether a Rule has applicability;
- whether a Decision has authority;
- whether a Relationship has valid cardinality;
- whether an Attribute belongs to an Entity.

A metamodel needs enough explicit types to make invalid combinations detectable.

Flexibility without constraints produces a graph of labels rather than a governed model.

---

# Avoid the universal-link anti-pattern

The same problem appears with relationships.

A generic edge:

```yaml
from: A
to: B
type: related_to
```

does not explain whether:

- A maps to B;
- A owns B;
- A is implemented by B;
- A supersedes B;
- A supports B;
- A applies to B;
- A depends on B.

Typed relationships enable:

- meaningful trace;
- targeted impact;
- validation;
- useful search results.

The generated index may use one general edge table internally.

The canonical relationship type should remain explicit.

---

# Ownership applies differently by object type

Ownership should not be represented as one generic `owner` field with no meaning.

Different objects may have different authority:

## Entity owner

Owns the governed business object.

## Attribute owner

Owns definition and applicability of one concept.

## Rule owner

Owns policy or control behaviour.

## Mapping owner

Owns transformation design and maintenance.

## Endpoint owner

Owns the technical system representation.

## Evidence owner

Owns collection or verification of evidence.

## Decision authority

Can approve the model choice.

One person may hold several roles.

The roles should not be treated as automatically interchangeable.

---

# Lifecycle also differs by object type

An Attribute may be:

```text
draft
approved
retired
```

A Proposal may be:

```text
draft
pending_review
approved
rejected
applied
```

A Finding may be:

```text
observed
classified
decision_required
actioned
verified
closed
```

A Dataset may be:

```text
registered
profiled
superseded
archived
```

Trying to use one universal status list makes the state model vague.

Object-type-specific lifecycle rules allow deterministic validation.

---

# A worked Customer Group model

The following conceptual chain illustrates the separation.

```text
DOMAIN-CUSTOMER
└── ENTITY-CUSTOMER
    └── REL-CUSTOMER-SALES-AREA
        └── ENTITY-CUSTOMER-SALES-AREA
            └── ATTR-CUSTOMER-GROUP
```

Physical representations:

```text
FEP-CRM-CUSTOMER-SEGMENT
FEP-S4-KNVV-KDGRP
```

Transformation:

```text
MAP-CRM-SEGMENT-TO-CUSTOMER-GROUP
```

Governed behaviour:

```text
RULE-CUSTOMER-GROUP-APPLICABILITY
RULE-CUSTOMER-GROUP-COMPLETENESS
```

Supporting context:

```text
EVID-ERP-B-CUSTOMER-GROUP-PROFILE
DEC-CUSTOMER-GROUP-SOURCE-017
PATCH-CUSTOMER-GROUP-ENRICHMENT-004
```

This structure allows precise questions:

- Which Entity owns Customer Group?
- Which SAP field implements it?
- Which source feeds it?
- Which Rule makes it mandatory?
- Which Decision rejected direct equivalence?
- Which Dataset exposed the gap?
- Which Proposal is pending?

One spreadsheet row cannot support this investigation reliably.

---

# A worked Supplier Risk model

Business structure:

```text
ENTITY-SUPPLIER
├── ATTR-SUPPLIER-RISK
└── ATTR-SUPPLIER-REVIEW-STATUS
```

Rules:

```text
RULE-RISK-REQUIRED-BEFORE-ACTIVATION
RULE-PENDING-REVIEW-BLOCKS-DISTRIBUTION
```

Physical endpoints:

```text
FEP-ERP-B-RISK
FEP-S4-SUPPLIER-RISK
FEP-S4-REVIEW-STATUS
```

Evidence and governance:

```text
EVID-ERP-B-RISK-GAP
FIND-RISK-SOURCE-CAPABILITY
DEC-SEPARATE-RISK-AND-REVIEW
PATCH-ADD-REVIEW-STATUS
```

The separation prevents `UNDER_REVIEW` from being added as another risk classification merely because it solves an operational problem.

---

# What the validator can do with typed objects

Once the metamodel distinguishes object types, Martenweave can check:

- every Attribute belongs to an Entity;
- every Mapping has valid source and target types;
- every physical endpoint identifies a system;
- every local Relationship references valid contexts;
- every approved Rule references existing governed objects;
- every Proposal identifies affected objects;
- every Decision has an authority;
- every retired Attribute has no unresolved active dependants;
- every DatasetField used in a Mapping is registered;
- every Finding promoted to change has evidence.

These checks would be impossible or unreliable in a universal document model.

---

# What trace and impact gain from typed objects

A trace operation can distinguish direction and meaning.

Example:

```text
upstream source endpoint
→ Mapping
→ business Attribute
→ target endpoint
→ Rule
```

Impact can distinguish consequences:

```text
Changing Attribute definition
may affect:
- Mappings;
- Rules;
- Decisions;
- endpoints;
- datasets;
- proposals.

Changing one FieldEndpoint
may affect:
- implementation mappings;
- dataset gaps;
- tests;
- interfaces;
but not necessarily the business definition.
```

Typed objects prevent impact reports from becoming one undifferentiated list of “related items.”

---

# Business and physical models should remain connected, not merged

A purely conceptual model can become detached from implementation.

A purely physical model becomes a catalogue of fields without business meaning.

Martenweave should hold the connection:

```text
Business Entity
→ business Attribute
→ Mapping
→ physical FieldEndpoint
```

and then extend it with governance:

```text
Evidence
→ Finding
→ Decision
→ Rule or model change
```

This is the distinctive value of the registry.

It does not stop at ER modelling.

It does not stop at technical metadata.

It links semantic, physical and decision layers.

---

# A model object should answer one primary question

A useful design heuristic is:

| Object | Primary question |
|---|---|
| Domain | Which governance area does this belong to? |
| Entity | What kind of business thing or context is governed? |
| Attribute | What property is governed? |
| Relationship | How are governed things associated? |
| Rule | What condition or behaviour must hold? |
| Mapping | How does one representation become another? |
| FieldEndpoint | Where does the data physically appear? |
| Dataset | What observed data source provides evidence? |
| Evidence | What was observed or documented? |
| Finding | What interpreted problem exists? |
| Decision | What was authorised? |
| PatchProposal | What canonical change is suggested? |

When one object attempts to answer several unrelated questions, it may need to be split.

---

# Common modelling mistakes

## SAP field modelled as business Attribute

The canonical concept becomes tied to one implementation.

## Organisational Attribute attached to central Entity

Granularity is lost.

## Workflow status stored as classification value

Lifecycle and business meaning become mixed.

## Mapping represented as generic Relationship

Transformation and applicability disappear.

## Rule stored only in prose

It cannot be validated or tested.

## Decision stored as comment

The current model loses its rationale.

## Dataset column treated as authoritative Attribute

Observed structure becomes approved meaning without review.

## Local override copied into global Rule

Context is lost.

## Evidence copied into the definition

Observation and policy become indistinguishable.

## Proposal written directly into approved object

Review boundaries disappear.

---

# How much structure is enough?

A model does not become better merely because it contains more objects.

A pilot should represent only what supports the target investigation.

For Customer Group, the minimum useful chain may be:

```text
Customer Sales Area
Customer Group
CRM Segment endpoint
KNVV-KDGRP endpoint
Mapping
applicability Rule
source Decision
dataset Evidence
```

That is enough to demonstrate:

- semantic granularity;
- source-to-target trace;
- dataset gap;
- impact;
- proposal review.

Do not begin by modelling every SAP Business Partner field.

Choose a critical chain where the distinctions matter.

---

# The metamodel should evolve through real cases

New object types and properties should emerge from repeated limitations.

For example:

- recurring temporary treatments may justify a `Deviation` object;
- complex role assignments may justify richer `GovernanceRole`;
- repeated implementation comparisons may justify `ImplementationEvidence`;
- cross-repository dependencies may require explicit external references.

The sequence should be:

```text
real case
→ modelling limitation
→ smallest metamodel extension
→ validator
→ example
→ documented use
```

Not:

```text
abstract enterprise ontology
→ hundreds of unused object types
```

This keeps Martenweave aligned with its backend-first MVP.

---

# Final perspective

Entities, Attributes, Relationships and Rules are not academic labels added to make the repository look formal.

They separate different kinds of truth.

An Entity establishes the governed thing and its granularity.

An Attribute establishes a property and its meaning.

A Relationship establishes how governed things are associated.

A Rule establishes expected behaviour.

A Mapping establishes transformation between representations.

A FieldEndpoint connects the business model to physical systems and datasets.

Evidence, Findings, Decisions and Proposals connect operational reality to controlled change.

The practical test is:

> Can the model distinguish Customer Group as a sales-area business Attribute, `KNVV-KDGRP` as its SAP endpoint, CRM Segment as a separate source concept, the mapping as a proposed transformation, and the approval as an independent Decision?

When the answer is yes, the registry can validate and trace the model.

When all five appear in one spreadsheet row called “mapping,” the organisation has stored a conclusion without preserving the structure needed to challenge it.

Martenweave should remain disciplined here.

The product does not need every possible enterprise object.

It needs the smallest metamodel that keeps business meaning, physical implementation, evidence and change authority separate—but connected.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It represents business concepts, physical fields, mappings, rules, evidence and decisions as distinct canonical objects so that validators, people and agents can reason about them without collapsing them into one document or one database row.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave Core currently describes its generic model scope as including domains, entities, attributes, relationships, datasets, mappings, rules, evidence, decisions and change proposals. SAP migration and MDM are positioned as the first domain pack rather than the limit of the registry.

The current product principles define canonical Markdown and YAML objects as the source of truth, require deterministic validation of IDs, types, references and domain context, and keep AI-generated changes in reviewable proposals.

The public demo uses separate stable IDs for a business Attribute and a physical SAP FieldEndpoint and shows trace and impact across attributes, endpoints, mappings, issues, decisions and evidence.

The dataset-gap workflow compares observed datasets with expected FieldEndpoints before migration readiness reviews.

Basic entity–relationship modelling distinguishes entity types, their attributes and relationships between them. Martenweave extends that separation with mappings, physical endpoints, evidence, decisions and proposals needed for operational model governance.

SAP currently describes SAP Master Data Governance as supporting governed models across business entities, semantic relationships, ownership, validated values, workflows and business-rule controls. Martenweave does not replace those runtime capabilities; it preserves an independent canonical model and evidence layer around them.

The conceptual YAML and Markdown examples in this article illustrate recommended modelling boundaries. They should not be treated as a complete guarantee of the exact current Martenweave object schemas unless those schemas are separately published and versioned.

Martenweave is independent and is not affiliated with or endorsed by SAP.
