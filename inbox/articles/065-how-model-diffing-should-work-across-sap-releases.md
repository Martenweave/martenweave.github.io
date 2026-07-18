# How Model Diffing Should Work Across SAP Releases

**Reviewed: 14 July 2026**

An SAP programme compares its Wave 2 and Wave 3 model repositories.

Git reports:

```text
14 files changed
96 insertions
41 deletions
```

The technical summary is correct.

It does not answer the questions that matter:

- Did a business concept change meaning?
- Was an Attribute moved to another Entity?
- Did an SAP field disappear, or was it merely renamed?
- Did a global Rule gain a local exception?
- Did a Mapping change from direct transfer to enrichment?
- Does an existing dataset remain compatible?
- Which interfaces, reports and validation rules must be retested?
- Is the difference caused by an SAP product release, a project decision or implementation drift?

A line diff shows textual modifications.

A model diff must explain semantic and operational consequences.

Consider a one-line change:

```diff
- severity: warning
+ severity: error
```

Git sees one replacement.

The programme may need to reconsider:

- migration readiness;
- source-data completeness;
- activation behaviour;
- test coverage;
- exception handling;
- cutover sequencing;
- AMS procedures.

Now consider a fifty-line rewrite of explanatory Markdown that does not change any structured property or business meaning.

Git sees a large diff.

The model may be unchanged.

> Model diffing should compare governed objects and their relationships, not merely files and lines.

Git remains essential. It provides the exact textual evidence and can compare arbitrary repository states. The official `git diff` documentation describes comparisons between working trees, indexes, commits, trees and files.

Martenweave needs to add another interpretation layer:

```text
Text diff
→ object diff
→ relationship diff
→ semantic classification
→ compatibility assessment
→ impact report
```

The purpose is not to replace Git.

It is to explain what the Git change means for an SAP data model.

---

# Begin with two explicit baselines

A useful comparison requires two identified states.

Weak request:

```text
Compare the old model with the new one.
```

Stronger request:

```text
Before:
MODEL-CUSTOMER-WAVE-2-APPROVED
commit 4f7a9c2

After:
MODEL-CUSTOMER-WAVE-3-CANDIDATE
commit 91d2be8
```

The comparison should also state:

- canonical schema version;
- Martenweave version;
- active domain packs;
- applicable scope;
- comparison purpose.

Example:

```yaml
comparison:
  before:
    baseline: MODEL-CUSTOMER-WAVE-2-APPROVED
    commit: 4f7a9c2
    schema_version: "1.0"

  after:
    baseline: MODEL-CUSTOMER-WAVE-3-CANDIDATE
    commit: 91d2be8
    schema_version: "1.0"

  scope:
    domains:
      - DOMAIN-CUSTOMER
      - DOMAIN-BUSINESS-PARTNER

  purpose:
    - migration_wave_assessment
    - implementation_impact
```

This is a conceptual representation rather than a guarantee of the current Martenweave comparison schema.

The comparison must not depend on whichever local directory happens to be called `latest`.

---

# Validate both sides before comparing them

A diff between two invalid repositories can produce misleading results.

Suppose the newer baseline contains:

- duplicate IDs;
- broken references;
- an unsupported schema;
- an Attribute pointing to a missing Entity.

The comparison may report that several relationships disappeared.

The real cause is that the new model cannot be resolved correctly.

The safer sequence is:

```text
Validate baseline A
→ validate baseline B
→ normalise compatible schemas
→ compare objects
```

The report should expose validation status for both sides.

```text
Baseline A:
valid

Baseline B:
3 errors
comparison completeness:
partial
```

A partial comparison may still be useful.

It should not claim complete semantic coverage.

Martenweave currently defines deterministic validation as the first gate before generated indexing and analysis.

---

# Schema migration must not masquerade as model change

The two baselines may use different canonical schemas.

Example:

Before:

```yaml
schema_version: "0.9"
owner: ROLE-CUSTOMER-DATA-OWNER
```

After:

```yaml
schema_version: "1.0"
owners:
  semantic:
    - ROLE-CUSTOMER-DATA-OWNER
```

The text and object structure changed.

The business authority may not have changed.

Comparing raw files would produce noise.

A model-aware process should:

1. detect schema differences;
2. migrate or normalise both sides into a common comparison form;
3. preserve migration warnings;
4. compare the normalised semantic state.

Martenweave’s changelog records schema-version migration support and normalisation of example objects to schema version 1.0.

The comparison report should distinguish:

```text
Schema-format change:
yes

Intended business-semantic change:
none detected
```

This prevents technical repository maintenance from being mistaken for an SAP design change.

---

# Match objects by stable identity

The safest comparison key is the canonical object ID.

Example:

```text
ATTR-CUSTOMER-GROUP
```

File path and display name may change:

```text
Before path:
model/attributes/customer-group.md

After path:
model/customer/sales-area/customer-group.md
```

The object remains the same when its stable ID remains unchanged.

This can be classified as:

```text
Object moved
No identity change
```

The same applies to a rename:

```diff
- name: Customer Classification Group
+ name: Customer Group
```

With a stable ID and unchanged meaning, this is a label change.

Matching by filenames would incorrectly report:

- old object deleted;
- new object added.

Stable IDs make the diff more accurate.

---

# Not every deletion and addition is unrelated

Sometimes identity really does change.

Suppose an overloaded Attribute is replaced:

```text
Removed:
ATTR-SUPPLIER-CLASSIFICATION

Added:
ATTR-SUPPLIER-RISK
ATTR-SUPPLIER-REVIEW-STATUS
```

This may be a split rather than one deletion and two unrelated additions.

The model should provide explicit transition evidence:

```yaml
id: DEC-SPLIT-SUPPLIER-CLASSIFICATION
replaces:
  - ATTR-SUPPLIER-CLASSIFICATION
creates:
  - ATTR-SUPPLIER-RISK
  - ATTR-SUPPLIER-REVIEW-STATUS
```

A semantic diff can then report:

```text
Change type:
object_split

Previous concept:
Supplier Classification

New concepts:
Supplier Risk
Supplier Review Status

Compatibility:
breaking
```

Without explicit supersession or decision links, automated detection should remain conservative:

```text
Possible replacement detected
Human confirmation required
```

Similarity is evidence.

It is not identity.

---

# The seven layers of a model diff

A complete comparison should examine seven layers.

## 1. Inventory

Which objects were:

- added;
- removed;
- retained;
- moved;
- renamed?

## 2. Properties

Which structured properties changed?

Examples:

- name;
- status;
- owner;
- Entity;
- datatype;
- cardinality;
- applicability;
- effective period.

## 3. Relationships

Which edges were:

- added;
- removed;
- redirected;
- retyped?

## 4. Rules

Which behaviour changed?

Examples:

- required versus optional;
- warning versus error;
- creation versus activation;
- global versus contextual.

## 5. Mappings and lineage

Which source-to-target paths changed?

## 6. Governance

Which Decisions, Evidence, ownership and approval references changed?

## 7. Compatibility and impact

Which consumers, datasets and implementations may no longer align?

A report that stops after inventory is a repository diff.

A report that completes all seven layers is a model diff.

---

# Inventory diff

The first layer is straightforward.

Example:

```text
Added:
ATTR-SUPPLIER-REVIEW-STATUS
RULE-REVIEW-STATUS-TRANSITION
FEP-S4-ZZ_REVIEW_STATUS

Removed:
VALUE-SUPPLIER-RISK-UNDER-REVIEW

Changed:
ATTR-SUPPLIER-RISK
RULE-SUPPLIER-RISK-ACTIVATION

Unchanged:
ENTITY-SUPPLIER
DOMAIN-SUPPLIER
```

This gives the reviewer a map.

It does not yet explain whether the change is safe.

---

# Property diff

Property comparison should be type-aware.

For an Attribute, significant properties may include:

- parent Entity;
- datatype;
- cardinality;
- value list;
- owner;
- applicability;
- status.

For a Rule:

- affected objects;
- lifecycle stage;
- severity;
- expression;
- context.

For a Mapping:

- source;
- target;
- transformation;
- scope;
- fallback;
- status.

The same field name may carry different significance by object type.

Example:

```diff
Object:
ATTR-CUSTOMER-GROUP

- entity: ENTITY-CUSTOMER
+ entity: ENTITY-CUSTOMER-SALES-AREA
```

Classification:

```text
Property:
entity

Change:
granularity change

Severity:
breaking

Reason:
Existing central mappings and datasets may lack Sales Area keys.
```

This is more useful than reporting only two changed strings.

---

# Relationship diff

Some important changes do not modify an object’s definition.

They modify how objects connect.

Before:

```text
CRM Segment
→ Customer Group
→ KNVV-KDGRP
```

After:

```text
CRM Segment
→ enrichment process
→ Customer Group
→ KNVV-KDGRP
```

The Customer Group Attribute and SAP endpoint may remain unchanged.

The lineage path changed materially.

A relationship diff should identify:

```text
Removed edge:
FEP-CRM-SEGMENT
DIRECTLY_MAPS_TO
ATTR-CUSTOMER-GROUP

Added edges:
FEP-CRM-SEGMENT
PROVIDES_INPUT_TO
MAP-CUSTOMER-GROUP-ENRICHMENT

MAP-CUSTOMER-GROUP-ENRICHMENT
POPULATES
ATTR-CUSTOMER-GROUP
```

This exposes the new operational dependency.

Martenweave’s current model already generates lineage-edge output and provides trace and impact commands connecting business Attributes, physical endpoints, Mappings, Decisions and Evidence.

---

# A graph diff is not just an edge count

The report should interpret graph changes.

Possible categories include:

- new upstream source;
- removed target endpoint;
- changed authoritative path;
- additional transformation step;
- broken path;
- new local override;
- reduced traceability;
- new dependency;
- detached object.

Example:

```text
Path before:
ERP_B.SEGMENT → KNVV-KDGRP

Path after:
ERP_B.SEGMENT
→ manual enrichment
→ Customer Group
→ KNVV-KDGRP

Interpretation:
The target is no longer directly source-derived.

New operational dependency:
Customer Data Steward

New readiness requirement:
Enrichment must be complete before load.
```

This turns topology into delivery information.

---

# Rule diff

Rules require their own comparison logic because small textual changes can alter control behaviour.

Consider:

```diff
- lifecycle_stage: creation
+ lifecycle_stage: activation
```

This may reduce early blocking while preserving the final control.

Another change:

```diff
- severity: warning
+ severity: error
```

may introduce a hard stop.

A useful Rule diff should report:

- previous behaviour;
- new behaviour;
- affected population;
- control direction;
- implementation consequence;
- evidence and Decision.

Example:

```text
Rule:
RULE-SUPPLIER-RISK-REQUIRED

Before:
Warning during activation

After:
Error during activation

Change class:
restrictive

Potential impact:
- incomplete records will block;
- source readiness becomes critical;
- existing deviations must be reviewed;
- regression testing required.
```

---

# Compare rule meaning, not only expressions

Two expressions may be textually different but logically equivalent.

Before:

```text
country = "PT" AND partner_type = "ORG"
```

After:

```text
partner_type = "ORG" AND country = "PT"
```

A raw diff reports a change.

A normalised logical comparison may report:

```text
No semantic condition change detected
Expression reordered
```

Conversely, one character can change scope:

```diff
- country = "PT"
+ country != "PT"
```

The diff must classify this as a major behavioural change.

A first implementation does not need a full theorem prover.

It can normalise:

- order-insensitive lists;
- Boolean condition order where supported;
- value casing;
- explicit defaults.

For complex free-text or executable rules, the report should state its limits.

---

# Mapping diff

Mapping comparisons should identify more than changed source and target IDs.

Important dimensions include:

- direct versus conditional;
- direct versus derived;
- default introduced or removed;
- lookup table changed;
- value conversion changed;
- source authority changed;
- granularity changed;
- fallback changed;
- unmapped condition added.

Example:

Before:

```yaml
source: FEP-CRM-SEGMENT
target: FEP-S4-KNVV-KDGRP
strategy: direct
```

After:

```yaml
source:
  - FEP-CRM-SEGMENT
  - FEP-LEGACY-SALES-AREA
target: FEP-S4-KNVV-KDGRP
strategy: enrichment
```

Classification:

```text
Mapping strategy:
direct → enrichment

New source dependency:
Legacy Sales Area

Compatibility:
breaking for datasets without Sales Area

Testing:
new value combinations required
```

This is the information a migration team needs.

---

# Value-list diff

Reference values deserve dedicated handling.

Possible changes include:

- value added;
- value retired;
- code changed;
- label changed;
- meaning changed;
- several values merged;
- one value split;
- applicability changed.

These are not equivalent.

Example:

```diff
- code: UNDER_REVIEW
- meaning: Supplier assessment is incomplete
```

If the state moves to another Attribute, the diff should explain:

```text
Value retired from:
ATTR-SUPPLIER-RISK

Replacement:
ATTR-SUPPLIER-REVIEW-STATUS = PENDING

Data conversion required:
yes
```

A label-only change may require no data conversion.

A code change may require interface and dataset changes even when meaning remains stable.

A meaning change under the same code is especially dangerous because existing data becomes ambiguous.

---

# Entity and granularity diff

Moving an Attribute between Entities is one of the most significant model changes.

Example:

```text
Before:
Customer Group belongs to Customer.

After:
Customer Group belongs to Customer Sales Area.
```

The change affects more than documentation.

Potential consequences:

- source requires organisational keys;
- one Customer can now have several values;
- central completeness metrics become invalid;
- migration file structure changes;
- SAP mapping may remain the same physically but gain context;
- reports must aggregate differently;
- ownership may shift.

The diff should classify:

```text
Change type:
attribute_reparented

Cardinality effect:
one value per Customer
→ potentially one value per Customer Sales Area

Dataset compatibility:
existing central extracts insufficient

Risk:
high
```

---

# Cardinality diff

Relationship cardinality changes should be treated as structural changes.

Before:

```text
Supplier has zero or one Risk Assessment.
```

After:

```text
Supplier has zero or many Risk Assessments over time.
```

This may require:

- new Entity identity;
- effective dates;
- history handling;
- table or interface redesign;
- migration of existing scalar values.

A diff should not reduce this to:

```diff
- max: 1
+ max: many
```

It should describe the operational consequence.

---

# Status and lifecycle diff

Changing object lifecycle can affect whether something is active.

Examples:

```text
draft → approved
approved → deprecated
deprecated → retired
pending_review → rejected
```

These transitions have different consequences.

An approved Mapping becoming retired may leave active dependants.

A Decision becoming superseded may require review of all objects that reference it.

A Rule moving from draft to approved may introduce no implementation change until deployment.

The report should distinguish:

```text
Canonical activation
from
implementation activation.
```

---

# Ownership diff

Ownership changes are often treated as administrative.

They can be governance changes.

Example:

```diff
- semantic_owner: ROLE-GLOBAL-CUSTOMER-DATA-OWNER
+ semantic_owner: ROLE-SALES-OPERATIONS
```

Questions include:

- Has semantic authority moved?
- Is this only a contact change?
- Does the new owner have global scope?
- Do approval routes change?
- Which pending proposals need rerouting?

The diff should classify ownership changes by role:

```text
Semantic ownership:
changed

Technical ownership:
unchanged

Operational stewardship:
unchanged
```

This prevents one generic `owner changed` message from hiding the nature of the transition.

---

# Decision diff

Decisions should generally not be rewritten after approval.

A later conclusion should create a new Decision that supersedes the old one.

A diff can then report:

```text
Superseded:
DEC-CUSTOMER-GROUP-SOURCE-017

New:
DEC-CUSTOMER-GROUP-SOURCE-026

Change:
Direct CRM derivation now permitted after source redesign.
```

If an approved Decision file is edited in place to reverse its conclusion, the validator or diff should warn:

```text
Approved historical Decision modified in place.

Recommended:
create a superseding Decision.
```

This protects the evidence chain.

---

# Evidence diff

Evidence additions do not necessarily change the model.

Example:

```text
Added:
EVID-MOCK-LOAD-3-CUSTOMER-GROUP
```

Possible classifications:

- supporting evidence only;
- evidence contradicts current model;
- evidence closes a gap;
- evidence triggers proposal.

The diff should avoid marking every evidence addition as a semantic release.

It should show whether the evidence changes confidence or closure status.

---

# SAP product changes and customer-model changes are different inputs

An SAP product release may introduce:

- a new field;
- a deprecated interface;
- changed validation behaviour;
- a new API property;
- a changed domain value;
- a replacement application or process.

These are external implementation changes.

They do not become part of the organisation’s canonical model automatically.

The flow should be:

```text
SAP release information
→ external evidence
→ affected endpoint assessment
→ model or implementation finding
→ decision
→ canonical proposal where required
```

For example, SAP may provide a new standard field that could replace a custom field.

Possible outcomes:

1. adopt the standard field and change the canonical endpoint;
2. retain the custom field for justified reasons;
3. use both temporarily;
4. defer the change.

The release note is evidence.

The organisation’s Decision establishes its model response.

---

# Do not compare only SAP metadata

A technical upgrade comparison may detect:

```text
Field added
Field removed
API changed
Table changed
```

That is valuable.

It does not show:

- which business Attribute the field implements;
- whether the field is actually used;
- which local Mapping depends on it;
- which migration datasets contain it;
- which Decision approved it;
- whether the replacement preserves semantics.

Martenweave’s role is to connect the SAP endpoint difference to the governed model.

```text
SAP endpoint change
→ business Attribute
→ Mapping
→ Rule
→ dataset
→ implementation owner
```

This is why the registry needs both semantic objects and FieldEndpoints.

---

# SAP release diff is not always chronological model progress

A newer SAP product release does not necessarily mean the customer’s model should change in the same direction.

The customer may:

- not activate the feature;
- retain an earlier process;
- defer migration;
- use a custom extension;
- adopt only part of the new standard;
- have legal or regional constraints.

Therefore:

```text
Newer SAP capability
≠
automatically newer approved customer model
```

The diff must compare actual customer baselines and declared implementation targets.

---

# Three-way comparison is often required

Across SAP releases, two-way comparison may be insufficient.

A useful analysis may need:

```text
A:
Current canonical model

B:
Current production implementation

C:
Target SAP release capabilities
```

This exposes several cases.

## Canonical and production agree; target changes

The upgrade creates a future impact.

## Canonical differs from production; target matches canonical

The upgrade may help remove existing drift.

## Canonical matches target; production remains old

Implementation work is required.

## Production and target agree; canonical differs

The repository may be stale or the implementation may be unapproved.

## All three differ

A design decision is required before upgrade work continues.

Martenweave should not reduce these situations to one red or green status.

---

# Four-way comparison may be needed during migration

Migration programmes often add a dataset baseline:

```text
A:
canonical model

B:
source dataset

C:
current SAP implementation

D:
target SAP release
```

Example:

- canonical Customer Group is sales-area-specific;
- source dataset is central;
- current SAP endpoint is sales-area-specific;
- target release retains the endpoint.

The SAP upgrade changes nothing.

The migration gap remains.

This prevents teams from incorrectly blaming an SAP release for a pre-existing model-source mismatch.

---

# Impact should follow the changed objects

Once changes are classified, impact analysis should traverse outward.

For an Attribute change, inspect:

- Rules;
- Mappings;
- FieldEndpoints;
- datasets;
- Evidence;
- Decisions;
- proposals;
- integrations;
- reports;
- owners.

For a FieldEndpoint change, inspect:

- source or target mappings;
- interfaces;
- datasets;
- implementation tests;
- lineage;
- custom code references.

For a Rule change, inspect:

- affected population;
- source readiness;
- validation implementation;
- deviations;
- test cases;
- operational procedures.

Martenweave’s changelog records BFS-based proposal impact analysis as an existing capability, while its current CLI exposes impact and trace commands.

The current capability is a foundation.

A semantic release diff should explain why each dependent appears.

---

# Direct and transitive impact should be separated

Suppose Customer Group changes granularity.

Direct impact:

```text
Attribute
Mapping
SAP endpoint
Rule
```

Transitive impact:

```text
migration dataset
pricing report
downstream interface
test scenario
local override
```

A report should distinguish:

```text
Distance 1:
direct dependency

Distance 2:
dependency through Mapping or Rule

Distance 3:
downstream consumer
```

Otherwise, a broad graph may produce an overwhelming list without priority.

---

# Impact is not certainty

Graph traversal identifies possible consequences.

It does not prove every connected object must change.

Example:

```text
Customer Group definition changed.

Connected report:
Customer Sales Dashboard.
```

The report may already consume the correct sales-area field.

It still deserves review.

The impact report should use language such as:

- affected;
- potentially affected;
- requires review;
- confirmed incompatible;
- unaffected after verification.

Do not label every graph neighbour as broken.

---

# Compatibility should be assessed per consumer

A model change may be compatible for one consumer and breaking for another.

Example:

Adding a new optional value:

- SAP storage accepts it;
- interface rejects unknown codes;
- report groups it under “Other”;
- migration dataset does not contain it;
- data-quality rule flags it as invalid.

Therefore, compatibility should not be one global Boolean.

A matrix is stronger:

| Consumer | Compatibility | Reason |
|---|---|---|
| SAP endpoint | Compatible | Field accepts value |
| Interface A | Breaking | Fixed code list |
| Report B | Review | Falls into default group |
| Migration dataset | Compatible | Value optional |
| Validation rule | Breaking | Value not registered |

The model diff identifies the change.

Consumer evidence determines compatibility.

---

# Risk classification

A semantic diff can support risk triage.

Possible factors:

- object criticality;
- change class;
- number of dependants;
- affected contexts;
- dataset compatibility;
- implementation spread;
- reversibility;
- evidence quality;
- active deviations.

A simple classification may be:

## Low

Editorial or evidence-only change.

## Moderate

Compatible addition with known consumers.

## High

Rule, mapping, ownership or endpoint change affecting active processes.

## Critical

Meaning, granularity, identity or mandatory-control change across several implementations.

Avoid pretending that a calculated score replaces review.

The score should route attention.

---

# A worked example: Customer Group between Wave 2 and Wave 3

## Wave 2

```text
Attribute:
Customer Group

Entity:
Customer

Source:
CRM Segment

Mapping:
Direct

Target:
KNVV-KDGRP

Rule:
Required for active Customer
```

## Wave 3

```text
Attribute:
Customer Group

Entity:
Customer Sales Area

Source:
CRM Segment + Sales Area enrichment

Mapping:
Conditional enrichment

Target:
KNVV-KDGRP

Rule:
Required before Customer Sales Area activation
```

## Raw Git summary

```text
4 files changed
22 insertions
9 deletions
```

## Model-aware summary

```text
Breaking semantic change

1. Attribute granularity changed:
   Customer → Customer Sales Area

2. Mapping strategy changed:
   direct → enrichment

3. New source dependency:
   Sales Area context

4. Rule lifecycle changed:
   Customer activation
   → Customer Sales Area activation

5. Physical SAP target:
   unchanged

6. Dataset compatibility:
   Wave 2 central extract insufficient

7. Required review:
   migration mapping
   source enrichment
   readiness checks
   reporting aggregation
```

This is what a release review needs.

---

# A worked example: standard field replaces custom field

## Before

```text
Business Attribute:
Supplier Review Status

SAP endpoint:
ZZ_SUPP_REVIEW
```

## Target release evidence

A standard SAP endpoint becomes available.

## Proposed after-state

```text
Business Attribute:
unchanged

SAP endpoint:
standard endpoint

Custom endpoint:
deprecated
```

## Model diff

```text
Semantic meaning:
unchanged

Physical implementation:
changed

Lineage:
target endpoint redirected

Compatibility:
breaking for direct custom-field consumers

Data conversion:
required

Historical interpretation:
custom endpoint retained as retired reference
```

The model should not create a new business Attribute merely because the physical field changed.

---

# A worked example: SAP release adds an unused field

A new standard field appears.

No current model object references it.

Model diff:

```text
External endpoint discovered:
yes

Canonical model change:
none

Impact:
none confirmed

Action:
evaluate for possible future use
```

This prevents technical metadata growth from automatically expanding the governed model.

---

# A worked example: mandatory rule changed

Before:

```text
Tax Identifier required at creation.
```

After:

```text
Tax Identifier required before activation.
```

Possible interpretation:

- early process becomes more flexible;
- final control remains;
- source enrichment window increases;
- creation datasets may remain incomplete;
- activation readiness becomes critical.

Classification:

```text
Rule applicability change
Potentially compatible for creation
Restrictive at activation
```

The report should not simply say:

```text
required condition changed
```

---

# Diffing global and local overlays

Suppose the global Rule changes.

A Portugal override exists.

The comparison should ask:

- Does the override still reference the correct parent?
- Is its condition still meaningful?
- Does the global change make the override redundant?
- Does it create a conflict?
- Does the local Decision remain valid?

Example:

```text
Global Rule:
Tax Identifier required before activation.

Portugal override:
Exemption allowed with approved legal evidence.

Result:
Override remains applicable.

Required review:
No structural conflict detected.
Legal evidence requirement unchanged.
```

Another case:

```text
Global Rule now includes the Portugal exemption.

Result:
Local override may be redundant.
Retirement review required.
```

This is more valuable than comparing the two files independently.

---

# Detecting drift during release comparison

The target canonical baseline may be correct, while the implementation remains on the old state.

A release report should track:

```text
Canonical diff:
approved

SAP implementation:
pending

Migration transformation:
aligned

Source system:
not ready

Report:
unknown
```

This separates model change from implementation progress.

A model release should not be marked fully complete merely because the canonical files were merged.

---

# The output should serve several audiences

One comparison can generate several views.

## Executive summary

- number of material changes;
- highest risks;
- affected domains;
- readiness recommendation.

## Model-owner report

- definitions;
- Rules;
- Relationships;
- Decisions;
- ownership.

## Technical impact

- FieldEndpoints;
- Mappings;
- interfaces;
- datasets;
- tests.

## Migration report

- required columns;
- transformations;
- defaults;
- conversion populations;
- wave impact.

## Machine-readable diff

- object operations;
- property deltas;
- edge deltas;
- classifications;
- references.

The reports should be derived from the same comparison result.

---

# Example semantic diff output

```yaml
comparison:
  before: MODEL-CUSTOMER-WAVE-2
  after: MODEL-CUSTOMER-WAVE-3

summary:
  added: 3
  removed: 1
  changed: 4
  breaking: 2
  review_required: 5

changes:
  - object_id: ATTR-CUSTOMER-GROUP
    object_type: Attribute
    class: semantic_breaking
    properties:
      entity:
        before: ENTITY-CUSTOMER
        after: ENTITY-CUSTOMER-SALES-AREA
    impact:
      - MAP-CRM-SEGMENT-TO-CUSTOMER-GROUP
      - RULE-CUSTOMER-GROUP-REQUIRED
      - DATASET-WAVE-2-CUSTOMER
```

This is a recommended output shape, not a claim about the current CLI format.

The machine-readable form can feed:

- CI;
- issue generation;
- release reports;
- agent review;
- dashboards.

---

# Exit codes should reflect comparison outcomes carefully

A diff command can complete successfully even when it finds breaking changes.

Possible semantics:

```text
0:
comparison completed, no differences

1:
comparison completed, differences found

2:
comparison failed or incomplete
```

A governance wrapper may apply stricter policy:

```text
Block release when:
- unapproved breaking change exists;
- reference integrity fails;
- critical implementation impact has no owner;
- target baseline is invalid.
```

The comparison engine discovers and classifies.

Release policy decides what blocks.

---

# Diffing generated indexes can be useful—but secondary

Comparing `modelops.db` or generated JSONL outputs can detect:

- unexpected build changes;
- search-projection differences;
- edge-generation regressions;
- index-schema changes.

That is useful for Martenweave engineering.

It should not replace canonical comparison.

Generated output may change because:

- Martenweave version changed;
- tokenisation changed;
- derived metadata changed;
- ordering changed.

The semantic source remains the canonical repository.

---

# Avoid false precision

A diff engine should state when it cannot determine meaning.

Examples:

```text
Markdown definition changed substantially.
Semantic effect:
human review required

Rule expression uses unsupported free-form syntax.
Logical equivalence:
not evaluated

Possible object replacement:
confidence medium
```

It is better to expose uncertainty than to declare a non-breaking change without sufficient evidence.

---

# AI can assist, but should not own the diff

AI is useful for:

- summarising long definition changes;
- suggesting semantic categories;
- identifying likely replacements;
- explaining impact chains;
- drafting release notes;
- comparing SAP release evidence with canonical objects.

Deterministic code should establish:

- object identity;
- exact property changes;
- reference changes;
- edge changes;
- lifecycle transitions;
- validation status.

Humans should approve:

- semantic equivalence;
- compatibility;
- business impact;
- release readiness.

The safe division is:

```text
Deterministic diff:
what changed

AI assistance:
what the change may mean

Impact engine:
what is connected

Human review:
what is approved and acceptable
```

---

# What Martenweave already has

Martenweave Core’s changelog records an existing repository diff command, schema-version migration, BFS-based proposal impact analysis, search and query, system-lineage objects and approval workflows.

The public CLI also exposes trace, impact and repository diff operations.

These are the correct foundations.

The next product step should not be a larger generic comparison UI.

It should be a semantic diff layer that classifies changes to:

- object identity;
- granularity;
- applicability;
- lifecycle;
- Mapping strategy;
- physical endpoints;
- global/local inheritance;
- governance authority.

---

# A focused implementation slice

A practical first semantic-diff increment could support five object types:

- Entity;
- Attribute;
- Rule;
- Mapping;
- FieldEndpoint.

## Inputs

Two valid repository baselines.

## Deterministic outputs

- added objects;
- removed objects;
- changed objects;
- property deltas;
- relationship deltas;
- lifecycle deltas.

## First classifications

- editorial;
- additive;
- restrictive;
- semantic;
- physical implementation;
- retirement.

## Impact

Traverse direct dependants for materially changed objects.

## Output

- JSON;
- Markdown summary;
- release-gate verdict.

## Acceptance example

Changing an Attribute’s Entity must be classified as a granularity change and identify dependent Mappings, Rules and DatasetFields.

This would create immediate value without attempting full logical equivalence across every possible Rule language.

---

# Release gate questions

Before adopting the target model baseline, ask:

1. Are both baselines valid?
2. Were schema differences normalised?
3. Were objects matched by stable identity?
4. Were additions, removals, splits and replacements distinguished?
5. Were Relationship and lineage changes compared?
6. Were Rule behaviour and applicability assessed?
7. Were Mapping strategy and source authority assessed?
8. Were global and local overrides re-evaluated?
9. Were direct and transitive impacts identified?
10. Was compatibility assessed by consumer?
11. Are implementation owners assigned?
12. Is the change supported by a Decision?
13. Can historical datasets still be interpreted?
14. Is the target model actually ready for the SAP release or migration wave?

A line diff can answer none of these by itself.

---

# Common anti-patterns

## Counting changed files as impact

One changed file can have enterprise-wide consequences.

## Treating every Markdown rewrite as semantic

Editorial work creates false release noise.

## Matching objects by path

Moves and renames look like deletion and creation.

## Treating new SAP fields as automatic model additions

External capability bypasses governance.

## Comparing only active objects

Historical compatibility and retirement effects disappear.

## Ignoring relationship changes

Objects appear unchanged while lineage is redesigned.

## One compatibility flag for the whole release

Different consumers behave differently.

## Diffing invalid baselines

Broken references distort the result.

## Allowing AI to declare equivalence

Plausible language replaces accountable review.

## Updating Decisions in place

The rationale for earlier releases disappears.

## Assuming newer SAP release means better model

Customer applicability and adoption are ignored.

---

# Final perspective

A useful SAP release comparison should not begin with:

> Which files changed?

It should begin with:

> Which governed meanings, relationships, controls and implementation contracts are different between these two approved states?

Git provides the exact textual comparison.

Martenweave should interpret it through stable model objects.

The complete chain is:

```text
Repository baseline A
vs.
Repository baseline B

→ validate
→ normalise schemas
→ match stable IDs
→ compare properties
→ compare relationships
→ classify semantic change
→ traverse impact
→ assess compatibility
→ connect implementation releases
→ produce review evidence
```

The practical test is:

> Can the programme explain why Wave 3 differs from Wave 2 without asking reviewers to inspect dozens of YAML files, spreadsheets and SAP release notes manually?

A good diff should state:

- Customer Group changed granularity;
- direct source equivalence was removed;
- the SAP target endpoint stayed the same;
- the migration dataset now requires Sales Area context;
- three Mappings and two Rules need review;
- one report is potentially incompatible;
- the change is supported by Decision 021;
- the SAP implementation remains pending.

That is a model diff.

“Four files changed” is only the beginning.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects canonical model baselines, deterministic validation, repository comparison, lineage, impact analysis, Decisions and reviewable proposals.

Its purpose is not to replace Git or SAP release documentation.

It is to explain how changes in repositories and SAP implementations affect governed model meaning.

## Sources and notes

This article was reviewed on 14 July 2026.

Git’s official `git diff` documentation describes comparison across working trees, indexes, commits, trees, blobs and filesystem paths. Git provides the exact textual foundation for model comparison, while semantic interpretation must come from the governed object model.

Martenweave Core currently records repository diffing, schema-version migration, BFS-based proposal impact analysis, system-lineage objects, search and query and approval workflows as existing capabilities.

The current public demo generates searchable and lineage projections from canonical files and provides `trace` and `impact` commands connecting business Attributes, physical FieldEndpoints, Mappings, Decisions and Evidence.

Martenweave currently defines canonical Markdown and YAML files as the source of truth, deterministic validation as the first gate and generated indexes as rebuildable outputs.

The semantic classifications, three-way release comparison and proposed machine-readable diff structures in this article describe a recommended product direction. They should not be treated as guarantees of the exact current `diff` command output.

Martenweave is independent and is not affiliated with or endorsed by SAP or Git.
