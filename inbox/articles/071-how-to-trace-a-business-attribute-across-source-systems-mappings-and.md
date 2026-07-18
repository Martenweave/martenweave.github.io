# How to Trace a Business Attribute Across Source Systems, Mappings and SAP Fields

**Reviewed: 14 July 2026**

A business owner asks:

> Where does Customer Group come from?

The answer appears obvious:

> CRM.

Then the migration team examines the actual implementation.

Some customers receive Customer Group from CRM Segment.

Others receive it from a legacy ERP classification.

Several countries use a maintained conversion table.

Missing values are sent to a stewardship workbook.

The value is stored centrally in one source but must be created separately for each Sales Area in SAP.

An interface downstream uses the SAP field directly.

A report uses a replicated value with its own code conversion.

The original question was not simple.

It contained several different questions:

- What is the business meaning of Customer Group?
- Which source systems contain related information?
- Which source is authoritative?
- Which physical fields supply the value?
- Which mappings transform it?
- Which organisational keys control the result?
- Which SAP field implements it?
- Which rules determine whether it is valid?
- Which evidence proves that the path works?
- Which alternative paths are rejected, provisional or unresolved?

A useful trace must answer all of them without collapsing them into one arrow.

> Attribute tracing is the process of following one governed business concept through every relevant semantic, physical, transformation and governance layer.

This is different from searching for a field name.

It is different from opening a mapping spreadsheet.

It is different from looking at an ETL dependency graph.

A trace begins with a stable model object and follows typed relationships.

Martenweave’s current public example supports this approach directly. Its CLI demonstrates tracing the Customer Group business Attribute and calculating impact from the related SAP FieldEndpoint. The documented result connects business attributes, physical fields, mappings, decisions, issues and evidence.

The core pipeline validates canonical objects, builds generated indexes, detects gaps and then performs lineage and impact analysis before proposals are routed to human review.

The trace is therefore not a visual decoration.

It is one of the principal ways the registry explains model truth.

---

# Start from the business Attribute

A trace should usually begin with a business concept rather than a source column or SAP table.

For example:

```text
ATTR-CUSTOMER-GROUP
```

The Attribute establishes:

- current approved name;
- definition;
- parent Entity;
- Domain;
- ownership;
- lifecycle;
- related Rules;
- physical implementations.

Conceptually:

```yaml
id: ATTR-CUSTOMER-GROUP
type: Attribute
name: Customer Group
domain: DOMAIN-CUSTOMER
entity: ENTITY-CUSTOMER-SALES-AREA
status: approved
```

The exact current schema may differ. The important point is that the Attribute has an identity independent of its physical representations.

Starting from the Attribute prevents an early mistake:

```text
SAP field
=
business concept
```

The SAP field implements the concept in one system.

It is not necessarily the concept itself.

---

# The first trace question: what does the Attribute belong to?

Before looking for source fields, establish the business grain.

Customer Group may belong to:

```text
Customer
```

or:

```text
Customer Sales Area
```

These are materially different models.

If the Attribute belongs to Customer Sales Area, its identifying context may include:

```text
Customer
Sales Organisation
Distribution Channel
Division
```

A source field cannot be considered sufficient until the source can provide or derive that context.

This is why a trace must begin with:

```text
Attribute
→ parent Entity
→ identifying context
```

not only:

```text
Attribute
→ source field
```

A source may contain the right-looking value at the wrong grain.

---

# The semantic centre of the trace

A useful trace can be understood as several paths meeting at the business Attribute.

```text
Upstream physical path
        ↓
source fields
→ mappings
→ business Attribute
→ SAP endpoints
        ↓
Downstream physical path
```

Around this physical chain sit governance objects:

```text
Rules
Decisions
Evidence
Findings
Owners
Proposals
```

The Attribute is the semantic centre.

Source and target systems may change.

The governed meaning should remain identifiable.

---

# Search first, trace second

Users do not always know the canonical ID.

They may search for:

```text
Customer Group
KDGRP
customer classification
sales area group
```

Search should return typed candidates:

```text
ATTR-CUSTOMER-GROUP
Attribute

FEP-S4-KNVV-KDGRP
FieldEndpoint

MAP-CRM-SEGMENT-TO-CUSTOMER-GROUP
Mapping

RULE-CUSTOMER-GROUP-REQUIRED
Rule
```

The user then selects the Attribute as the trace anchor.

Martenweave exposes separate `search`, `query`, `trace` and `impact` commands. This separation is useful because discovery, structured filtering, lineage traversal and consequence analysis are different operations.

A search result tells the user which objects may be relevant.

A trace explains how they are connected.

---

# Upstream trace: which sources can contribute?

Once the Attribute is selected, the trace should find every upstream source candidate.

For Customer Group, these might include:

```text
FEP-CRM-CUSTOMER-SEGMENT
FEP-ERP-A-CUSTOMER-CLASS
FEP-ERP-B-SALES-CATEGORY
DATAFIELD-MANUAL-ENRICHMENT-CUSTOMER-GROUP
```

These sources should not be displayed as equivalent.

Each needs a role.

Possible source roles include:

- authoritative;
- secondary;
- contextual;
- fallback;
- temporary;
- historical;
- rejected;
- merely observed.

Example:

```text
CRM Customer Segment
role: input candidate

ERP_A Customer Class
role: authoritative for acquired population

ERP_B Sales Category
role: historical source, not approved for Wave 3

Manual Enrichment
role: controlled fallback
```

The trace should expose source plurality without implying that every upstream field is equally valid.

---

# Physical availability is not authority

A source system may contain a field that resembles the Attribute.

That proves availability.

It does not prove authority.

Suppose three applications contain Customer Group-like values:

```text
CRM.SEGMENT
ERP_A.CUST_GROUP
REPORTING.CUSTOMER_CLASS
```

Possible interpretation:

- CRM owns marketing segmentation;
- ERP_A owns operational Customer Group;
- Reporting contains a replicated value;
- none is authoritative for every country.

A useful trace must distinguish:

```text
contains related data
```

from:

```text
approved source for this Attribute and context
```

Source authority may depend on:

- population;
- country;
- effective period;
- migration wave;
- organisational level;
- record lifecycle.

This authority belongs in canonical mappings, Decisions or explicit source-role metadata—not in field-name similarity.

---

# Registered source endpoint versus observed dataset field

The source application may define:

```text
FEP-CRM-CUSTOMER-SEGMENT
```

The migration extract may provide:

```text
DATAFIELD-WAVE3-SEG_CODE
```

The trace should connect them:

```text
registered source endpoint
→ extract implementation
→ observed dataset field
```

Why keep both?

Because an extract can:

- rename the field;
- omit it;
- change datatype;
- derive it before delivery;
- flatten organisational structure;
- contain stale schema;
- combine several endpoints.

A registered endpoint tells the team what the source system is believed to contain.

An observed DatasetField tells the team what the migration process actually received.

Martenweave’s dataset-readiness command profiles an input dataset against the model and can promote detected gaps into reviewable proposals or issue drafts.

That observed evidence should enrich the trace rather than overwrite the registered model.

---

# Mapping objects are the trace’s verbs

Endpoints and Attributes are nouns.

Mappings explain what happens between them.

Without a Mapping, the graph may state:

```text
CRM Segment
→ Customer Group
```

but cannot explain the relationship.

A Mapping should make the verb explicit:

```text
copied as
converted into
used to derive
used as context for
enriched into
defaulted into
rejected as
manually assigned to
```

Conceptually:

```yaml
id: MAP-CRM-SEGMENT-TO-CUSTOMER-GROUP
type: Mapping
source:
  - FEP-CRM-CUSTOMER-SEGMENT
context:
  - FEP-LEGACY-SALES-AREA
target_attribute: ATTR-CUSTOMER-GROUP
strategy: conditional_enrichment
status: approved
```

A trace becomes understandable when it can say:

> CRM Segment is one direct input. Sales Area is a conditional context input. The result is Customer Group.

---

# Direct and indirect dependencies

A source field may contribute its value directly.

Another field may only influence which transformation is selected.

For example:

```text
CRM Segment:
direct value input

Sales Organisation:
indirect conditional input

Country:
indirect applicability input
```

OpenLineage’s column-lineage specification makes a similar distinction. It classifies a dependency as direct when an output value is derived from the input value, and indirect when the input influences the result through a condition such as a filter, join or conditional expression without contributing its value directly.

This distinction is particularly useful for SAP master data.

Otherwise, a trace may show four upstream fields but fail to explain which one actually supplies the classification.

---

# Transformation classification

A trace should classify how the target Attribute is produced.

## Identity

```text
source value
→ unchanged target value
```

## Conversion

```text
A1
→ lookup
→ STANDARD
```

## Conditional conversion

```text
source value + country
→ contextual lookup
→ target value
```

## Derivation

```text
risk score + supplier category
→ formula
→ Supplier Risk
```

## Enrichment

```text
partial source data + organisational context + stewardship input
→ completed target value
```

## Default

```text
missing source
→ approved default
→ target value
```

## Manual assignment

```text
business review
→ approved assignment
→ target value
```

## Rejection

```text
source candidate
→ rejected as semantically incompatible
```

OpenLineage’s current specification provides direct transformation subtypes such as identity, transformation and aggregation, together with indirect subtypes for joins, filtering, grouping, sorting, windowing and conditional logic.

Martenweave can use a migration-oriented taxonomy while retaining the same fundamental idea: the edge must describe the nature of dependency.

---

# One Attribute can have several approved paths

Customer Group may be produced differently for different populations.

```text
Population A:
CRM Segment + Sales Area lookup

Population B:
ERP_A Customer Group copied directly

Population C:
manual enrichment

Population D:
not migrated
```

The trace should not attempt to merge these into one vague upstream path.

Each Mapping needs applicability.

Example:

```text
MAP-CRM-CUSTOMER-GROUP
applies to:
active CRM-managed customers

MAP-ERP-A-CUSTOMER-GROUP
applies to:
legacy acquired company population

MAP-MANUAL-CUSTOMER-GROUP
applies to:
records with unresolved source classification
```

A business Attribute has one governed meaning.

It may have several controlled implementation paths.

---

# Alternative does not mean active

A trace should distinguish:

```text
approved active path
candidate path
historical path
rejected path
fallback path
```

Suppose ERP_B contains `CUSTOMER_CLASS`.

The current model may state:

```text
candidate source:
ERP_B.CUSTOMER_CLASS

status:
under investigation

reason:
value meanings do not align with Customer Group
```

Displaying the endpoint as a normal upstream edge would mislead users and agents.

The edge needs lifecycle or confidence.

---

# The approved trace and the observed trace

A migration programme has at least two relevant graphs.

## Approved trace

What the canonical model says should happen.

```text
CRM Segment
+
Sales Area
→ approved enrichment Mapping
→ Customer Group
→ KNVV-KDGRP
```

## Observed trace

What happened in a dataset or migration run.

```text
Wave 3 extract SEG_CODE
+
SALES_ORG
→ transformation run 184
→ load file KDGRP
→ mock-load result
```

The two should be compared.

Possible outcomes:

- observed path matches approved path;
- observed path is incomplete;
- observed path contains undocumented default;
- approved source is missing from dataset;
- runtime implementation uses another field;
- target remains blank.

Martenweave should preserve design lineage in canonical objects and attach observed datasets and validation reports as evidence.

---

# Trace status needs more than “connected”

A path can be connected but not ready.

Useful trace states include:

## Modelled

The path exists in canonical objects.

## Validated

All IDs and references resolve.

## Approved

The Mapping and relevant Decisions are approved.

## Source-ready

Required source and context fields exist in the dataset.

## Tested

A test or mock load has verified the transformation.

## Implemented

The Mapping exists in the actual migration or SAP implementation.

## Reconciled

Expected and observed outputs have been compared.

## Operational

The path is active in production.

These states should not be collapsed into one green edge.

---

# Target trace: where is the Attribute implemented in SAP?

An Attribute may map to one or more SAP endpoints.

For Customer Group:

```text
FEP-S4-KNVV-KDGRP
```

The trace should expose:

- SAP system;
- business object;
- table or API path;
- field;
- organisational grain;
- datatype;
- target role;
- implementation status.

A physical target might be:

```yaml
id: FEP-S4-KNVV-KDGRP
type: FieldEndpoint
system: S4
object: KNVV
field: KDGRP
business_attribute: ATTR-CUSTOMER-GROUP
status: active
```

Again, this is conceptual.

The key requirement is that the target remains a separate object from the business Attribute.

---

# One Attribute can have several target endpoints

The same Attribute may be implemented in:

- SAP S/4HANA;
- SAP MDG staging;
- an API;
- a replicated data warehouse;
- an outbound interface;
- a data-quality platform.

Example:

```text
ATTR-CUSTOMER-GROUP
├── FEP-MDG-CUSTOMER-GROUP
├── FEP-S4-KNVV-KDGRP
├── FEP-API-CUSTOMER-GROUP
└── FEP-DWH-CUSTOMER-GROUP
```

The trace should distinguish:

- system of entry;
- operational system;
- replicated consumer;
- reporting representation;
- migration-only staging endpoint.

Otherwise, every implementation appears equally authoritative.

---

# Target field is not necessarily final consumption

A migration trace often stops at SAP.

For many attributes, the path continues:

```text
SAP KNVV-KDGRP
→ outbound customer interface
→ pricing application
→ reporting dimension
```

Whether to include these consumers depends on scope.

For migration readiness, the first target may be enough.

For impact analysis, downstream endpoints matter.

A trace should allow the user to change depth rather than forcing every downstream system into the initial view.

---

# A trace needs direction and depth

Useful query controls include:

```text
direction:
upstream
downstream
both

depth:
1
2
3
all

edge types:
mapping
implementation
evidence
decision
rule

status:
active
historical
candidate
rejected
```

Without controls, a well-connected Attribute may return hundreds of nodes.

The correct default is a concise governed path, not the entire graph.

---

# Suggested trace views

## Business view

Shows:

- Attribute;
- Entity;
- definition;
- owner;
- Rules;
- Decisions.

## Migration view

Shows:

- source endpoints;
- DatasetFields;
- Mappings;
- context inputs;
- target endpoints;
- gaps.

## Implementation view

Shows:

- systems;
- interfaces;
- jobs;
- transformation rules;
- deployment status.

## Evidence view

Shows:

- source profiles;
- mapping tests;
- load results;
- Findings;
- confidence.

## Historical view

Shows:

- superseded mappings;
- previous endpoints;
- earlier baselines;
- retired decisions.

The same graph can support several views when edges are typed.

---

# Why reverse trace matters

Forward trace asks:

> Where does this source field go?

Reverse trace asks:

> What produces this SAP field?

Both are necessary.

Starting from:

```text
FEP-S4-KNVV-KDGRP
```

the reverse trace should identify:

1. business Attribute;
2. active Mappings;
3. direct source fields;
4. conditional fields;
5. dataset evidence;
6. unresolved gaps;
7. authority and ownership.

Martenweave’s current quickstart demonstrates both directions:

```bash
martenweave trace ATTR-CUST-SALES-CUSTOMER-GROUP --repo ./my-model
martenweave impact FEP-S4-KNVV-KDGRP --repo ./my-model
```



The commands are related, but their questions differ.

Trace explains the connected path.

Impact asks what may be affected if the selected object changes.

---

# Trace is not impact

Consider:

```text
ATTR-CUSTOMER-GROUP
```

Its trace may include:

- source endpoints;
- Mappings;
- target endpoints;
- Rules;
- Decisions.

Its impact may additionally include:

- migration datasets;
- reports;
- interfaces;
- tests;
- open proposals;
- local overrides;
- owners requiring review.

Every impact path uses lineage or model relationships.

Not every trace neighbour is necessarily affected by a proposed change.

A definition correction may not affect the target field.

A granularity change probably will.

---

# Rules belong in the trace

Suppose Customer Group is populated correctly but remains optional in the migration validation.

The data path works.

The governance path does not.

The trace should show:

```text
RULE-CUSTOMER-GROUP-REQUIRED
→ governs
ATTR-CUSTOMER-GROUP
```

and ideally:

```text
implemented by:
migration validation RULE_018
SAP control Z_CUST_GROUP
```

This allows the team to compare intended behaviour with implementation.

A field trace without Rules can explain movement but not acceptability.

---

# Decisions explain why the path exists

A Mapping often looks arbitrary without its Decision.

Example:

```text
CRM Segment
+
Sales Area
→ Customer Group
```

The relevant Decision may state:

- direct equivalence is rejected;
- CRM Segment is one input;
- Sales Area enrichment is mandatory;
- defaulting is permitted only for Wave 2;
- local values require owner approval.

The trace should attach that Decision to the Mapping.

This makes the path auditable and prevents future simplification from removing necessary context.

---

# Evidence proves individual claims

Different evidence verifies different parts of the trace.

```text
Source profile:
field exists and has observed values

Mapping specification:
transformation is defined

Unit test:
conversion table behaves as expected

Mock load:
target field was populated

Reconciliation report:
population matches approved expectation

Business approval:
meaning is accepted
```

A trace should not display one generic “verified” status unless the verification scope is clear.

---

# Trace confidence

A useful confidence model might classify edges as:

```text
approved
verified
declared
observed
inferred
disputed
rejected
```

Examples:

## Approved

Human-authorised canonical Mapping.

## Verified

Supported by test or runtime evidence.

## Declared

Documented but not tested.

## Observed

Detected in a dataset or implementation.

## Inferred

Suggested from names or values.

## Disputed

Competing interpretations exist.

## Rejected

Explicitly prohibited.

This makes the graph suitable for both current truth and investigation.

---

# Trace completeness

A trace can be structurally complete but operationally weak.

For each Attribute, evaluate:

## Semantic completeness

- definition exists;
- parent Entity exists;
- grain is known.

## Source completeness

- authoritative source identified;
- source endpoint registered;
- observed dataset field available.

## Transformation completeness

- Mapping exists;
- strategy classified;
- context inputs represented.

## Target completeness

- SAP endpoint identified;
- target grain known;
- implementation status known.

## Governance completeness

- owner exists;
- Decision linked;
- Rules linked.

## Evidence completeness

- source profile exists;
- transformation tested;
- target result verified.

A completeness score should expose dimensions rather than hide them behind one percentage.

---

# The trace should show gaps explicitly

A missing path should not disappear from the graph.

Example:

```text
ATTR-CUSTOMER-GROUP
├── target: FEP-S4-KNVV-KDGRP
├── source: unresolved for ERP_B
└── finding: FIND-ERP-B-CUSTOMER-GROUP-SOURCE
```

This is more informative than returning only the successful CRM path.

The user needs to know:

- which population is covered;
- which population is not;
- whether fallback exists;
- who owns the resolution.

---

# Unresolved gaps are part of the trace

A gap may concern:

- missing source field;
- missing context key;
- unapproved Mapping;
- unavailable value conversion;
- undocumented default;
- target endpoint not implemented;
- missing evidence;
- conflicting Decisions.

Martenweave’s dataset-readiness workflow can detect gaps, produce reports and promote them into a PatchProposal for human review.

The trace should link to that Finding or proposal rather than waiting until the canonical Mapping is complete.

---

# Rejected paths are also part of the trace

Suppose a team evaluated:

```text
ERP_B.CUSTOMER_CLASS
→ Customer Group
```

and rejected it.

A future user searching upstream sources should still be able to discover:

```text
candidate evaluated:
yes

status:
rejected

reason:
classification meanings incompatible

decision:
DEC-CUSTOMER-GROUP-SOURCE-017
```

This prevents repeated analysis and unsafe AI suggestions.

The rejected edge should not appear as an active lineage path.

It should appear as governed negative knowledge.

---

# Historical trace

The same Attribute may have different lineage over time.

## Wave 2

```text
CRM Segment
→ direct conversion
→ Customer Group
```

## Wave 3

```text
CRM Segment
+
Sales Area
→ enrichment
→ Customer Group
```

## Production support

```text
S/4HANA Customer Group
→ outbound interface
→ reporting platform
```

The trace should be baseline-aware.

Queries may need:

```text
as of baseline:
CUSTOMER-WAVE2

effective on:
2026-03-15

current:
approved latest
```

Without temporal scope, the graph may combine paths that were never active together.

---

# A complete Customer Group trace

## Anchor

```text
ATTR-CUSTOMER-GROUP
```

## Semantic context

```text
Domain:
Customer

Entity:
Customer Sales Area

Meaning:
Commercial classification applied in a Sales Area context.
```

## Direct source input

```text
FEP-CRM-CUSTOMER-SEGMENT
```

## Conditional inputs

```text
FEP-LEGACY-SALES-ORG
FEP-LEGACY-DISTRIBUTION-CHANNEL
FEP-LEGACY-DIVISION
```

## Observed dataset fields

```text
SEG_CODE
SALES_ORG
DIST_CHANNEL
DIVISION
```

## Mapping

```text
MAP-CUSTOMER-GROUP-ENRICHMENT
strategy:
conditional enrichment
```

## Decision

```text
DEC-CUSTOMER-GROUP-SOURCE-017
direct equivalence rejected
```

## Target

```text
FEP-S4-KNVV-KDGRP
```

## Rule

```text
RULE-CUSTOMER-GROUP-REQUIRED
required before Customer Sales Area activation
```

## Evidence

```text
EVID-WAVE3-CUSTOMER-PROFILE
EVID-MOCK-LOAD3-KDGRP-RESULT
```

## Open gap

```text
FIND-ERP-B-CUSTOMER-GROUP-CONTEXT
Sales Area keys unavailable for part of the population
```

## Rendered trace

```text
CRM Customer Segment
        │ direct input
        ▼
Customer Group Enrichment Mapping
        ▲
        │ conditional context
Sales Organisation / Channel / Division
        │
        ▼
Customer Group
        │
        ▼
S/4HANA KNVV-KDGRP
```

Governance attachments:

```text
Decision 017
→ authorises Mapping

Required Rule
→ governs Attribute

Mock Load 3 Evidence
→ verifies observed target population

ERP_B Finding
→ marks incomplete source coverage
```

This is a model trace rather than a field lookup.

---

# A Supplier Risk trace

A more complex trace may involve several source roles.

```text
Risk Score:
direct value input

Supplier Category:
conditional applicability

Compliance Status:
approval gate

Manual Review:
fallback evidence
```

Mapping:

```text
MAP-SUPPLIER-RISK-DERIVATION
```

Attribute:

```text
ATTR-SUPPLIER-RISK
```

Target:

```text
FEP-S4-SUPPLIER-RISK
```

Rejected path:

```text
Review Status
must not populate final Risk value
```

The trace can explain why four upstream objects exist without implying that all four are copied into the target.

---

# A trace should not expose production records by default

Field-level trace concerns model dependencies.

It does not need to reveal:

- customer names;
- supplier bank details;
- tax numbers;
- individual production values.

Observed evidence can be represented through:

- aggregate profiles;
- field availability;
- hashes;
- test summaries;
- restricted external references.

Record-level drill-down may exist in another controlled system.

Martenweave should preserve the reference, not duplicate sensitive data unnecessarily.

---

# Performance and graph traversal

A trace engine can use the generated index to follow relationships efficiently.

The current Martenweave architecture builds disposable SQLite and JSONL indexes after validating canonical files.

Traversal should remain constrained by:

- direction;
- edge type;
- status;
- baseline;
- maximum depth;
- scope.

A breadth-first traversal may be useful for finding connected objects by distance.

The result should preserve path explanation:

```text
ATTR-CUSTOMER-GROUP
→ implemented_by
FEP-S4-KNVV-KDGRP
```

not merely return an unordered set of related IDs.

---

# The path matters more than the node list

Weak trace output:

```text
Related:
FEP-CRM-SEGMENT
MAP-CUSTOMER-GROUP
FEP-S4-KDGRP
DEC-017
RULE-004
```

Stronger output:

```text
FEP-CRM-SEGMENT
→ direct input to
MAP-CUSTOMER-GROUP

MAP-CUSTOMER-GROUP
→ produces
ATTR-CUSTOMER-GROUP

ATTR-CUSTOMER-GROUP
→ implemented by
FEP-S4-KNVV-KDGRP

DEC-017
→ authorises
MAP-CUSTOMER-GROUP

RULE-004
→ governs
ATTR-CUSTOMER-GROUP
```

A trace must preserve edge semantics.

---

# Human-readable and machine-readable trace output

A human-readable report should explain the path.

A machine-readable response should preserve:

- node ID;
- object type;
- edge type;
- direction;
- status;
- depth;
- baseline;
- confidence;
- source path.

Conceptually:

```json
{
  "root": "ATTR-CUSTOMER-GROUP",
  "paths": [
    {
      "from": "FEP-CRM-CUSTOMER-SEGMENT",
      "edge": "DIRECT_INPUT_TO",
      "to": "MAP-CUSTOMER-GROUP-ENRICHMENT",
      "status": "approved"
    },
    {
      "from": "MAP-CUSTOMER-GROUP-ENRICHMENT",
      "edge": "PRODUCES",
      "to": "ATTR-CUSTOMER-GROUP",
      "status": "approved"
    }
  ]
}
```

This is a recommended output structure rather than a guarantee of the current command format.

---

# Trace comparison

A useful extension is to compare traces between baselines.

Example:

```text
Wave 2:
CRM Segment
→ direct Mapping
→ Customer Group

Wave 3:
CRM Segment + Sales Area
→ enrichment Mapping
→ Customer Group
```

The comparison should report:

- source added;
- transformation strategy changed;
- context dependency added;
- target unchanged;
- new Decision;
- datasets affected.

This connects lineage with model diffing.

---

# Trace-based readiness questions

For each critical Attribute, ask:

1. Is the business meaning approved?
2. Is the correct Entity and grain known?
3. Is an authoritative source identified?
4. Does the actual dataset contain the source field?
5. Are contextual keys available?
6. Is the Mapping approved?
7. Is the transformation classified?
8. Is the SAP target endpoint implemented?
9. Does a Rule define valid completion?
10. Has a test verified the path?
11. Are alternative and rejected sources documented?
12. Are unresolved populations visible?

A trace becomes a readiness instrument when it can answer these questions.

---

# Common failure modes

## Starting from a field name instead of an Attribute

Several unrelated objects are merged by terminology.

## Treating every upstream field as authoritative

Availability becomes mistaken for ownership.

## Omitting DatasetFields

Registered source capability is confused with delivered extract content.

## Mapping displayed as a generic arrow

Transformation meaning disappears.

## Context fields shown as direct value inputs

Conditional dependencies become misleading.

## Only the successful path is shown

Unresolved populations and fallbacks disappear.

## Approved and inferred edges look the same

Users cannot judge confidence.

## SAP target is treated as the business concept

Implementation replacement becomes a semantic change.

## Rules and Decisions are omitted

The trace explains movement but not governance.

## Historical paths are overwritten

Earlier migration waves cannot be reconstructed.

## Trace returns nodes without paths

Relationships lose their meaning.

---

# What Martenweave should implement next

The current core already exposes:

- validated canonical objects;
- generated lineage indexes;
- `trace`;
- `impact`;
- dataset gap analysis;
- PatchProposal promotion;
- search and query.

A focused improvement should make trace output explicitly **path-aware and status-aware**.

## Goal

Trace one Attribute across approved, observed, candidate and rejected paths.

## Scope

Support filters for:

- upstream and downstream;
- active and historical;
- approved, inferred, disputed and rejected;
- direct and conditional inputs;
- maximum depth;
- baseline.

## Acceptance criteria

Tracing Customer Group returns:

- parent Entity;
- approved source endpoints;
- observed DatasetFields;
- direct and contextual inputs;
- Mapping strategy;
- SAP target endpoint;
- Rules;
- Decisions;
- Evidence;
- unresolved Findings.

## Validation

```bash
martenweave validate --repo examples/customer_bp_model
```

## Functional verification

```bash
martenweave trace \
  ATTR-CUST-SALES-CUSTOMER-GROUP \
  --repo examples/customer_bp_model
```

## Expected distinction

The output must not present:

```text
ERP_B Customer Class
```

as an active source when its Mapping is pending or rejected.

That is a small, high-value extension of the current trace capability.

---

# Final perspective

Tracing a business Attribute is not the same as locating its SAP field.

The complete question is:

> How is this governed meaning represented, sourced, transformed, implemented, validated and evidenced across the landscape?

A useful trace begins with the Attribute:

```text
ATTR-CUSTOMER-GROUP
```

and expands in both directions:

```text
source systems
→ physical endpoints
→ observed dataset fields
→ mappings
→ business Attribute
→ SAP fields
→ downstream consumers
```

It also includes the governance layer:

```text
Rules
Decisions
Evidence
Findings
Owners
Proposals
```

The practical test is:

> Can a reviewer start with Customer Group and see every approved source path, every conditional input, the exact SAP endpoint, the decision authorising the treatment, the evidence verifying it and the populations still unresolved?

When the answer is yes, the organisation can investigate and change the model safely.

When the answer is:

> Search for `KDGRP` in the mapping workbook,

the knowledge still lives in documents and individual memory rather than in a governed trace.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects business Attributes to physical endpoints, datasets, mappings, rules, decisions and evidence through validated canonical objects and generated lineage indexes.

The objective is not to produce another large system diagram.

It is to make one critical business concept traceable enough that people and agents can reason about it without inventing missing connections.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave Core currently treats canonical Markdown and YAML files as the source of truth, validates object IDs, types, references and domain context, and builds disposable SQLite and JSONL indexes for search, lineage and impact analysis.

The current quickstart exposes separate commands for trace, impact, search, structured query, repository diff, dataset readiness and promotion of gaps into PatchProposals.

The documented Martenweave pipeline places lineage and impact analysis after canonical validation and index construction and before AI-assisted proposals are sent for human review.

OpenLineage’s current column-lineage specification describes fine-grained dependencies between input and output fields and distinguishes direct value derivation from indirect influence. It further classifies identity, transformation, aggregation, joins, filters, grouping, sorting, windowing and conditional dependencies.

OpenLineage’s object model separates Datasets, Jobs and Runs, providing a useful distinction between declared design metadata and observed runtime execution.

The status-aware trace model, confidence categories and proposed machine-readable output in this article describe recommended Martenweave improvements. They should not be treated as guarantees of the exact current CLI output unless separately published and versioned.

Martenweave is independent and is not affiliated with or endorsed by SAP or OpenLineage.
