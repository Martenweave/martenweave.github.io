# How to Calculate Downstream Impact Before Changing an SAP Field

**Reviewed: 14 July 2026**

A technical team proposes a simple change:

> Replace the custom Supplier Review Status field with a new standard SAP field.

The field contains one code.

The database change appears small.

A developer checks where the custom field is used in ABAP and finds three references.

The initial estimate is two days.

Then the programme discovers that the field is also used by:

- an SAP MDG validation;
- a migration Mapping;
- an outbound supplier interface;
- a reporting extract;
- a data-quality rule;
- a local stewardship workbook;
- an activation procedure;
- two open change requests;
- a rejected proposal that explains why the field must remain separate from Supplier Risk.

The field was not merely a column.

It was an implementation point for a governed business concept.

The original technical where-used check was useful.

It covered only one part of the blast radius.

> Downstream impact analysis asks which business meanings, controls, transformations, datasets, interfaces, reports and decisions may be affected when a model object or physical field changes.

The result should not be a flat list of everything connected to the field.

It should explain:

- how each item depends on the field;
- whether the dependency is direct or indirect;
- whether the effect is confirmed or only possible;
- which contexts are affected;
- what must be retested;
- who must review the change;
- which historical states must remain interpretable.

Martenweave already exposes `impact` and `trace` as separate operations. Its current quickstart uses `impact FEP-S4-KNVV-KDGRP` for a physical SAP FieldEndpoint and `trace ATTR-CUST-SALES-CUSTOMER-GROUP` for the related business Attribute.

That distinction is important.

Trace explains how an object is connected.

Impact asks what may need attention if it changes.

---

# Begin by defining the proposed change

Impact analysis is weak when the initiating change is vague.

Consider:

```text
Change KNVV-KDGRP.
```

This may mean:

- rename the field in documentation;
- replace its source;
- change its allowed values;
- make it mandatory;
- alter its organisational applicability;
- replace it with a custom field;
- retire it from one interface;
- change its datatype;
- remove a default;
- reinterpret its business meaning.

Each change creates a different impact pattern.

Before traversing the graph, classify the proposal.

A useful change description should identify:

```yaml
change:
  object: FEP-S4-KNVV-KDGRP
  type: target_endpoint_replacement
  proposed_replacement: FEP-S4-NEW-CUSTOMER-GROUP
  business_attribute: ATTR-CUSTOMER-GROUP
  effective_baseline: CUSTOMER-WAVE4-CANDIDATE
```

This is a conceptual shape rather than a claim about the current PatchProposal schema.

The impact engine needs to know whether it is evaluating:

- a physical implementation change;
- a semantic model change;
- a Rule change;
- a lifecycle change;
- an ownership change;
- a dataset change.

---

# Field change and Attribute change are not the same

Suppose the programme replaces:

```text
FEP-S4-ZZ-CUSTOMER-GROUP
```

with:

```text
FEP-S4-KNVV-KDGRP
```

while preserving:

```text
ATTR-CUSTOMER-GROUP
```

The business concept remains stable.

The primary impact is physical and operational:

- Mappings must target another endpoint;
- interfaces reading the custom field must change;
- migration load structures may change;
- reconciliation tests must change;
- historical data may require conversion;
- the custom field may need retirement.

Now suppose the programme changes the meaning of Customer Group from central to sales-area-specific.

The physical endpoint may stay `KNVV-KDGRP`.

The impact is broader:

- source grain;
- Mapping applicability;
- key structure;
- completeness Rules;
- dataset requirements;
- reports;
- ownership;
- historical interpretation.

A useful analysis starts by asking:

```text
Is the implementation changing,
or is the governed meaning changing?
```

Sometimes both change together.

They should still be classified separately.

---

# The impact anchor

Every analysis needs one or more anchor objects.

Possible anchors include:

- FieldEndpoint;
- Attribute;
- Rule;
- Mapping;
- Entity;
- Decision;
- value-list entry;
- interface field;
- DatasetField.

For an SAP field change, the initial anchor is usually the physical endpoint:

```text
FEP-S4-KNVV-KDGRP
```

The first traversal should find the implemented business Attribute:

```text
FEP-S4-KNVV-KDGRP
→ implements
ATTR-CUSTOMER-GROUP
```

From there, the analysis can expand across semantic and operational dependencies.

Starting only from the table field may miss model objects whose relationship is mediated through the Attribute.

---

# Direct impact

Direct impact includes objects with an explicit first-degree dependency on the changed object.

For a FieldEndpoint, direct dependants may include:

- Mappings that populate it;
- Mappings that read it;
- Rules implemented on it;
- interfaces exposing it;
- DatasetFields corresponding to it;
- validation Evidence referring to it;
- transformation tests;
- proposals modifying it.

Example:

```text
FEP-S4-KNVV-KDGRP
├── target of MAP-CRM-SEGMENT-TO-CUSTOMER-GROUP
├── implements ATTR-CUSTOMER-GROUP
├── exported by INTERFACE-CUSTOMER-OUTBOUND
└── verified by EVID-MOCK-LOAD3-KDGRP
```

These objects should normally appear first in the impact report.

They are the most likely to require a concrete change.

---

# Transitive impact

Transitive impact travels through one or more intermediate objects.

Example:

```text
FEP-S4-KNVV-KDGRP
→ implements
ATTR-CUSTOMER-GROUP
→ governed by
RULE-CUSTOMER-GROUP-REQUIRED
```

The Rule is not directly attached to the physical field.

It may still be affected if the field replacement changes:

- enforcement location;
- availability;
- lifecycle timing;
- organisational context.

Another path:

```text
FEP-S4-KNVV-KDGRP
→ consumed by
INTERFACE-CUSTOMER-OUTBOUND
→ consumed by
PRICING-APPLICATION
```

The external application is a second-degree dependant.

Impact depth matters.

A practical result should show:

```text
Depth 1:
direct dependency

Depth 2:
dependency through Attribute, Mapping or Interface

Depth 3:
downstream consumer or governance consequence
```

Without distance, the result becomes an undifferentiated graph dump.

---

# Direct dependency does not always mean stronger impact

A directly connected object may remain unaffected.

For example, an Evidence object may mention the old field only as historical test evidence.

A second-degree report may break immediately because it hard-codes the old field name.

Graph distance helps prioritisation.

It does not replace dependency interpretation.

The report should classify each result:

```text
confirmed change required
likely review required
possible impact
historical reference only
unaffected after verification
```

---

# Typed edges make impact analysis possible

A generic graph may contain:

```text
A related_to B
```

This provides little information about change propagation.

Typed edges support better reasoning:

```text
FieldEndpoint implements Attribute

Mapping populates FieldEndpoint

Interface exports FieldEndpoint

Rule governs Attribute

Evidence verifies Mapping

Decision authorises Mapping

Report consumes Interface Field

Proposal modifies Rule
```

Different edges propagate different risks.

Changing a display name may affect search and documentation.

Changing a datatype may affect:

- Mappings;
- interfaces;
- extracts;
- code;
- validation.

Changing semantic meaning may affect nearly every object connected through the Attribute.

---

# Direct and indirect field dependencies

A target value can depend on fields in different ways.

OpenLineage’s current column-lineage specification distinguishes direct dependencies, where an output value derives from an input field, from indirect dependencies, where a field influences the output through conditions such as joins, filters or conditional logic. It further classifies direct identity, transformation and aggregation, and indirect join, filter, grouping, sorting, window and conditional dependencies.

This distinction is valuable for SAP impact analysis.

Suppose Customer Group depends on:

```text
CRM Segment:
direct input

Sales Organisation:
conditional input

Customer Status:
filter input
```

If CRM Segment changes, value derivation is affected.

If Sales Organisation changes, contextual selection may be affected.

If Customer Status changes, the included population may change.

All three are downstream impacts.

They are not the same kind of impact.

---

# The semantic blast radius

Every physical field should connect to a business Attribute where possible.

The Attribute determines the semantic blast radius.

For Customer Group, this may include:

- business definition;
- Customer Sales Area Entity;
- allowed values;
- source authority;
- mandatory Rules;
- local overrides;
- migration Mappings;
- downstream reporting meaning;
- responsible owner.

Changing the field without reviewing the Attribute can create technical alignment and semantic drift.

Example:

```text
Old field:
custom ZZ_CUST_GROUP

New field:
standard KDGRP
```

A technical migration may copy values successfully.

The programme must still verify:

- value domains match;
- organisational grain matches;
- blank behaviour matches;
- code meanings match;
- downstream consumers interpret the same semantics.

Field replacement does not prove semantic equivalence.

---

# Rule impact

Rules often create the most important hidden dependencies.

A field may participate in:

- requiredness;
- format validation;
- value-list validation;
- derivation;
- activation controls;
- distribution controls;
- workflow routing;
- exception handling.

Changing the endpoint may require moving or reimplementing the Rule.

Changing the Attribute meaning may require changing the Rule itself.

Example:

```text
RULE-CUSTOMER-GROUP-REQUIRED

Before:
Customer Group required at Customer creation

After:
Customer Group required before Sales Area activation
```

This change affects:

- lifecycle behaviour;
- incomplete-record handling;
- migration readiness;
- SAP or MDG validation;
- exception procedures;
- tests.

A where-used search for the physical field may find the implementation.

It may not find the canonical Rule or the Decision behind it.

---

# Mapping impact

Mappings should be assessed in both directions.

## Incoming Mappings

Which sources populate the changed field?

```text
CRM Segment → Customer Group
ERP_A Customer Class → Customer Group
Manual Enrichment → Customer Group
```

A field replacement may require all active incoming Mappings to be redirected.

## Outgoing Mappings

Which systems consume the field?

```text
Customer Group → outbound customer API
Customer Group → reporting classification
Customer Group → pricing integration
```

The target field may also act as a source.

## Mapping internals

Review:

- strategy;
- datatype;
- value conversion;
- default;
- lookup;
- context inputs;
- rejected values;
- applicability.

A field change that preserves the technical type may still invalidate the conversion table or applicability logic.

---

# Value-domain impact

Changing a field often changes its values rather than its location.

Examples:

- adding a code;
- retiring a code;
- renaming a label;
- merging values;
- splitting one code into several;
- changing the meaning of an existing code.

These have different impacts.

## Additive value

Potentially affects:

- fixed code lists;
- interfaces;
- reports;
- validation Rules;
- test data.

## Retired value

Requires:

- existing-record analysis;
- conversion;
- historical interpretation;
- interface compatibility.

## Meaning change under the same code

This is particularly dangerous.

Technical consumers continue working.

Business interpretation changes silently.

The impact report should treat meaning changes as semantic breaking changes even when no table structure changes.

---

# Organisational-context impact

Many SAP fields exist at an organisational level.

Customer Group in `KNVV` is associated with Customer Sales Area.

A change may affect:

- Sales Organisation;
- Distribution Channel;
- Division;
- record cardinality;
- source-data expansion;
- local ownership;
- target completeness.

Suppose the old implementation copied one central value to every Sales Area.

The new implementation allows different values.

Impact includes:

- source redesign;
- dataset keys;
- transformation logic;
- business review;
- reports that assumed one value per customer;
- interfaces using only customer number.

This is a granularity change, not merely a field change.

---

# Key impact

The target field may remain unchanged while its record identity changes.

Example:

```text
Before:
Customer Group keyed by Customer

After:
Customer Group keyed by Customer + Sales Area
```

The impact includes every object that assumes the former key.

Key impact often reaches:

- extracts;
- joins;
- deduplication;
- interfaces;
- spreadsheets;
- reconciliation;
- APIs;
- reports.

A field-level impact engine must understand its Entity and keys.

---

# Dataset impact

The next question is:

> Which datasets contain, expect or derive this field?

Dataset impact can include:

- migration extracts;
- staging schemas;
- test files;
- mock-load input;
- reconciliation output;
- defect samples;
- business-review workbooks;
- training data.

Martenweave’s current dataset-readiness flow compares observed dataset structure with expected model fields, generates reports and can promote detected gaps into a PatchProposal or issue draft.

When a field changes, rerun readiness against the candidate model.

Possible findings include:

- old column still present;
- new target column missing;
- datatype incompatible;
- required key absent;
- deprecated value still used;
- source population incomplete.

---

# Interface impact

Interfaces may consume the field through:

- table extraction;
- CDS view;
- API property;
- IDoc segment;
- OData service;
- file export;
- replicated data product.

The physical field may not be visible in the interface contract.

The interface may expose a business-facing name.

The impact graph should connect:

```text
SAP FieldEndpoint
→ Interface Mapping
→ Interface Property
→ Consuming Application
```

A search limited to the SAP field name may miss consumers that use an alias.

---

# Report impact

Reports can depend on:

- field presence;
- code meaning;
- grouping;
- filtering;
- historical comparability;
- aggregation grain.

A new field may populate correctly but alter trend reporting.

Example:

```text
Old Customer Group:
one value per customer

New Customer Group:
one value per Sales Area
```

A customer-level report may now:

- duplicate customers;
- select an arbitrary value;
- require aggregation logic;
- become semantically invalid.

Report impact is frequently indirect.

It should not be omitted because the report does not reference the original SAP table directly.

---

# Data-quality impact

Data-quality controls can depend on:

- null thresholds;
- allowed values;
- format;
- cross-field rules;
- uniqueness;
- context completeness.

A field replacement or semantic change may require:

- new profiling baseline;
- revised thresholds;
- new assertions;
- retired checks;
- changed exception process.

A rule such as:

```text
Customer Group completeness must be 98%
```

may become meaningless when the Attribute changes from central to sales-area-specific.

The population denominator changed.

The threshold may need recalculation.

---

# Workflow and lifecycle impact

A field may drive:

- approval routing;
- activation;
- distribution;
- review status;
- change request type;
- exception escalation.

For example:

```text
Supplier Review Status = PENDING
→ block distribution
```

Replacing the field without updating workflow logic can produce a technically valid record that bypasses governance.

The impact report should identify both:

- direct field reference;
- business lifecycle dependency.

---

# Ownership impact

A changed object may require review from several owners:

- semantic owner;
- technical owner;
- Mapping owner;
- interface owner;
- data-quality owner;
- local steward;
- migration lead.

The impact analysis should route work, not merely list components.

Example:

| Impacted area | Review owner |
|---|---|
| Attribute definition | Customer Data Owner |
| SAP endpoint | SAP MDG Lead |
| Migration Mapping | Data Migration Lead |
| Outbound interface | Integration Owner |
| Reporting logic | Analytics Owner |
| Portugal override | Local Data Owner |

This is where impact analysis becomes delivery support.

---

# Decision impact

An approved Decision may explicitly refer to the field.

Examples:

- custom field retained because the standard field lacked required semantics;
- direct source mapping rejected;
- default permitted temporarily;
- local exception approved;
- field split from another concept.

Changing the field may invalidate the Decision’s assumptions.

The Decision should be reviewed, not silently left attached to a different implementation.

Possible outcomes:

- Decision remains valid;
- implementation reference is updated;
- Decision is superseded;
- a new Decision is required.

---

# Proposal impact

Open PatchProposals and ChangeRequests may already modify the field or related Attribute.

Before approving a new change, check for:

- overlapping proposals;
- stale proposals;
- conflicting replacements;
- proposals based on an older baseline;
- pending local overrides.

A field change should not be approved independently while another proposal is changing its business definition.

---

# Historical impact

Retiring a field does not remove its historical significance.

Past datasets, test evidence and production records may still refer to it.

The model should preserve:

- retired FieldEndpoint;
- effective period;
- replacement;
- historical Mappings;
- previous Decisions;
- applicable baselines.

Impact analysis should ask:

> Will historical records remain interpretable after this change?

This is especially important when codes are reused or meanings change.

---

# Impact across current and future baselines

The same field may appear in several active planning states:

```text
Production baseline:
custom field

Wave 4 candidate:
standard field

Local rollout:
custom field retained temporarily
```

The impact report should identify:

- current production impact;
- future release impact;
- local rollout impact;
- transition overlap.

A single “affected” flag hides these differences.

---

# Three-way impact analysis

For SAP changes, two-way comparison may be insufficient.

A useful assessment can compare:

```text
A:
current canonical model

B:
current implementation

C:
proposed target model or SAP release
```

This reveals:

## Canonical and implementation agree; proposal differs

A new model decision is required.

## Canonical differs from implementation; proposal matches canonical

The change may close existing drift.

## Implementation and proposal agree; canonical differs

The repository may be stale, or an unapproved implementation may have become established.

## All three differ

The programme needs design resolution before delivery estimation.

---

# Runtime evidence changes the impact verdict

Graph relationships identify potential impact.

Observed evidence can refine it.

For example:

```text
Interface is connected to Customer Group.
```

Runtime evidence may show:

- interface population is zero;
- field is never used by the consumer;
- interface uses a derived constant;
- only one country consumes it;
- deprecated path still runs.

The impact remains reviewable.

Its priority may change.

OpenLineage’s object model distinguishes design-time lineage metadata from runtime Run events, allowing declared dependencies and observed executions to remain separate.

Martenweave can apply the same principle:

```text
canonical dependency:
declared impact

runtime evidence:
observed relevance
```

---

# Candidate impact versus confirmed impact

A defensible report should distinguish:

## Confirmed

The object has an explicit dependency and the change breaks or modifies it.

## Probable

The dependency strongly suggests review, but compatibility is not yet tested.

## Possible

The object is connected transitively or through uncertain lineage.

## Historical only

The relationship applies to earlier baselines.

## Excluded

The object was reviewed and shown unaffected.

This classification prevents two common failures:

- under-reporting;
- overwhelming teams with every graph neighbour.

---

# Impact is path-dependent

The reason an object appears matters.

Weak result:

```text
Affected:
INTERFACE-CUSTOMER-OUTBOUND
```

Stronger result:

```text
FEP-S4-KNVV-KDGRP
→ exported_by
INTERFACE-CUSTOMER-OUTBOUND
→ consumed_by
PRICING-APPLICATION
```

The path explains:

- why the interface is included;
- whether the dependency is direct;
- how far the impact travels;
- which edge requires verification.

An impact report should preserve paths, not return only node IDs.

---

# Impact severity

Severity can be based on several factors.

## Change type

- editorial;
- physical;
- additive;
- restrictive;
- semantic;
- retirement.

## Dependency type

- direct value dependency;
- conditional dependency;
- governance dependency;
- historical reference.

## Object criticality

- key field;
- mandatory Attribute;
- legal field;
- high-volume interface;
- cutover blocker.

## Scope

- one local context;
- one migration wave;
- global model;
- production landscape.

## Evidence

- verified;
- declared;
- uncertain;
- disputed.

## Reversibility

- easy rollback;
- data conversion required;
- irreversible historical reinterpretation.

A score may help sort results.

It should not replace the underlying explanation.

---

# A worked example: replacing a custom field

## Proposed change

```text
Retire:
FEP-S4-ZZ-SUPPLIER-REVIEW-STATUS

Adopt:
FEP-S4-STANDARD-REVIEW-STATUS
```

## Business Attribute

```text
ATTR-SUPPLIER-REVIEW-STATUS
```

## Direct impact

- migration Mapping target;
- MDG validation implementation;
- outbound interface property;
- mock-load test;
- endpoint documentation.

## Transitive impact

- Supplier activation Rule;
- distribution Rule;
- stewardship procedure;
- report filter;
- local rollout deviation.

## Historical impact

- old records;
- previous load evidence;
- custom-field-based reconciliation;
- audit references.

## Required verification

- value-domain equivalence;
- datatype and length;
- lifecycle behaviour;
- interface contract;
- conversion of existing values;
- historical trace preservation.

The conclusion may be:

```text
Business meaning:
expected to remain stable

Physical implementation:
breaking change

Migration impact:
high

Semantic review:
required because standard value domain differs
```

---

# A worked example: changing Customer Group granularity

## Proposed change

```text
ATTR-CUSTOMER-GROUP

Before:
belongs to Customer

After:
belongs to Customer Sales Area
```

## Physical target

```text
FEP-S4-KNVV-KDGRP
```

The field remains the same.

## Direct semantic impact

- parent Entity;
- cardinality;
- key context;
- definition;
- owner approval.

## Mapping impact

- CRM Segment no longer sufficient alone;
- Sales Area fields required;
- central default must be reviewed;
- local Mappings may diverge.

## Dataset impact

- central customer extract insufficient;
- organisational keys required;
- duplicate customer rows expected.

## Report impact

- customer-level aggregation changes;
- one customer may have several groups.

## Rule impact

- requiredness moves to Sales Area activation.

## Interface impact

- consumers using customer number alone become ambiguous.

This is a high-impact change even though the SAP field name does not change.

---

# A worked example: adding one value

## Proposed change

Add:

```text
Customer Group = DIGITAL_ONLY
```

Possible direct impact:

- value list;
- validation Rule;
- test data;
- documentation.

Possible downstream impact:

- interface code list;
- report grouping;
- pricing logic;
- source conversion table;
- local translations;
- data-quality thresholds.

The database structure is unchanged.

The code meaning changes the blast radius.

---

# A worked example: removing a default

## Current path

```text
Missing CRM Segment
→ default STANDARD
→ Customer Group
```

## Proposed path

```text
Missing CRM Segment
→ unresolved
→ block activation
```

Impact includes:

- completeness;
- migration rejection rate;
- business workload;
- cutover plan;
- source remediation;
- exception procedure;
- Rule severity;
- reporting.

Removing a default can improve data integrity and still create major delivery impact.

---

# A practical impact workflow

## Step 1: Describe the change

Identify object, change type, target baseline and intended outcome.

## Step 2: Validate the current repository

Do not analyse a broken graph.

## Step 3: Locate the anchor

Use stable ID, not only a field label.

## Step 4: Traverse direct dependencies

Collect first-degree typed relationships.

## Step 5: Expand through the business Attribute

Reach semantic Rules, ownership and Mappings.

## Step 6: Expand through operational objects

Reach datasets, interfaces, reports and implementation evidence.

## Step 7: Apply scope filters

Filter by:

- baseline;
- country;
- migration wave;
- active status;
- edge type;
- maximum depth.

## Step 8: Classify each path

Confirmed, probable, possible, historical or excluded.

## Step 9: Assign review owners

Turn analysis into action.

## Step 10: Validate the candidate state

Apply the proposal in dry-run or candidate form and compare resulting impact.

---

# Current-state impact versus candidate-state impact

A current-state traversal answers:

> What is connected now?

A candidate-state analysis asks:

> What would become broken, redirected or newly connected after the change?

This is more useful.

Conceptually:

```text
current model
+
proposed patch
=
candidate model

compare:
current impact graph
vs.
candidate impact graph
```

This can reveal:

- orphaned Mappings;
- unimplemented Rules;
- lost Evidence links;
- consumers still pointing to the retired field;
- replacement endpoint without ownership;
- new dataset requirements.

Martenweave’s proposal-first architecture is suited to this pattern because proposed changes remain separate until validation and human review.

---

# Impact analysis should not mutate anything

The operation should produce:

- findings;
- report;
- review checklist;
- proposed issue;
- proposal annotations.

It should not automatically:

- redirect Mappings;
- retire fields;
- update interfaces;
- approve a replacement;
- modify SAP.

Martenweave’s operating principle remains that agents propose, validators verify, humans approve and Git records the accepted change.

---

# Human-readable output

A practical impact summary might look like:

```text
Change:
Retire FEP-S4-ZZ-SUPPLIER-REVIEW-STATUS

Business Attribute:
ATTR-SUPPLIER-REVIEW-STATUS

Confirmed direct impacts:
- MAP-LEGACY-REVIEW-STATUS-TO-S4
- INTERFACE-SUPPLIER-OUTBOUND
- EVID-MOCK-LOAD4-REVIEW-STATUS

Probable semantic impacts:
- RULE-SUPPLIER-ACTIVATION
- RULE-SUPPLIER-DISTRIBUTION

Historical references:
- EVID-MOCK-LOAD2
- DEC-CUSTOM-FIELD-RETENTION-004

Required reviewers:
- Supplier Data Owner
- SAP MDG Lead
- Integration Owner
- Migration Lead
```

This is more usable than a graph screenshot alone.

---

# Machine-readable output

A structured result should preserve:

- root object;
- proposed change;
- impacted object;
- path;
- depth;
- dependency type;
- confidence;
- severity;
- context;
- review owner;
- verification status.

Conceptually:

```json
{
  "root": "FEP-S4-KNVV-KDGRP",
  "change_type": "endpoint_replacement",
  "impacts": [
    {
      "object_id": "MAP-CRM-CUSTOMER-GROUP",
      "path": [
        "FEP-S4-KNVV-KDGRP",
        "TARGET_OF",
        "MAP-CRM-CUSTOMER-GROUP"
      ],
      "depth": 1,
      "classification": "confirmed",
      "severity": "high"
    }
  ]
}
```

This is a recommended direction, not a guarantee of the current command output.

---

# Release gates

A field change should not proceed when:

- the business Attribute is unknown;
- direct Mappings have no replacement;
- critical consumers have no owner;
- candidate state creates broken references;
- mandatory Rules have no implementation path;
- historical interpretation is lost;
- conflicting proposals remain unresolved;
- required datasets cannot support the new grain;
- high-risk impact remains unreviewed.

A release gate does not need to block every warning.

It should block conditions that make the candidate model unsafe or operationally unjustified.

---

# Common failure modes

## Running only an ABAP where-used search

Useful code dependencies are found; non-code model and business dependencies remain invisible.

## Starting from a table name

The actual business Attribute and field-level path remain ambiguous.

## Returning every connected object

The report becomes too broad to act on.

## Ignoring indirect dependencies

Conditional fields, keys and filters are missed.

## Treating graph proximity as confirmed breakage

Review effort is inflated.

## Ignoring historical references

Past datasets and evidence become uninterpretable.

## Assuming a standard field is semantically equivalent

Technical replacement bypasses model review.

## Analysing only current state

Orphaned candidate-state dependencies are missed.

## Omitting owners

The result describes risk without routing action.

## Letting AI apply the change

Plausible remediation bypasses approval.

---

# What Martenweave should implement next

The current core already provides:

- validated canonical references;
- generated lineage indexes;
- `trace`;
- `impact`;
- repository diff;
- dataset readiness;
- reviewable PatchProposals.

The next focused capability should be **candidate-state impact analysis**.

## Goal

Calculate downstream impact before an approved canonical change is applied.

## Scope

Given a PatchProposal:

- identify changed objects;
- create a candidate in-memory model;
- validate candidate references;
- compare current and candidate graphs;
- classify broken, redirected and newly created dependencies;
- assign direct and transitive impact.

## Acceptance criteria

Replacing `FEP-S4-KNVV-KDGRP` must identify:

- incoming Mappings;
- related Customer Group Attribute;
- Rules;
- DatasetFields;
- outbound interfaces;
- Evidence;
- local overrides;
- open proposals;
- historical references.

## Validation command

```bash
martenweave validate --repo examples/customer_bp_model
```

## Functional verification

```bash
martenweave impact FEP-S4-KNVV-KDGRP \
  --repo examples/customer_bp_model
```

A future extension could add:

```bash
martenweave impact \
  --proposal PATCH-REPLACE-CUSTOMER-GROUP-ENDPOINT \
  --repo examples/customer_bp_model
```

The proposal-aware command is a product direction, not a claim about the current CLI.

---

# Final perspective

An SAP field is rarely only a field.

It may be:

- the implementation of a business Attribute;
- the target of several migration Mappings;
- an input to interfaces and reports;
- the subject of Rules and Decisions;
- a dependency of local exceptions;
- the anchor for historical evidence.

The correct question before changing it is not:

> Where is this field used?

It is:

> Which governed meanings and operational paths depend on this field, and how would the candidate change alter them?

A useful impact calculation follows the chain:

```text
proposed field change
→ business Attribute
→ Mappings
→ Rules
→ datasets
→ interfaces
→ reports
→ decisions
→ evidence
→ owners
```

It then distinguishes:

```text
direct
transitive
confirmed
probable
possible
historical
```

The practical test is:

> Can the team explain, before implementation, which migration paths, SAP controls, interfaces, reports, local deviations and historical baselines must be changed or reviewed—and why each one appears in the result?

When the answer is yes, the programme has change impact analysis.

When the answer is:

> The where-used list found three ABAP objects,

the programme has completed one useful technical check and mistaken it for the complete blast radius.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It uses validated canonical objects, generated lineage indexes, typed relationships and reviewable proposals to calculate how model and implementation changes propagate through the landscape.

The objective is not to predict every consequence automatically.

It is to make the likely consequences visible early enough for accountable people to review them.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave Core currently treats canonical files as the source of truth, validates object references before indexing and exposes separate trace, impact, diff, dataset-readiness and proposal workflows.

The current Martenweave workflow places lineage and impact analysis after deterministic validation and generated-index construction and before AI-assisted proposals are routed to human review.

OpenLineage’s current column-lineage specification describes fine-grained dependencies between input and output fields and distinguishes direct value derivation from indirect influence through joins, filters and conditional logic.

OpenLineage’s object model distinguishes design-time Job and Dataset metadata from runtime Run observations. This provides a useful pattern for separating declared impact paths from evidence about which paths are actually active.

The candidate-state impact workflow, impact classifications and proposed machine-readable output in this article describe recommended Martenweave improvements. They should not be interpreted as guarantees of the exact current CLI behaviour unless separately published and versioned.

Martenweave is independent and is not affiliated with or endorsed by SAP or OpenLineage.
