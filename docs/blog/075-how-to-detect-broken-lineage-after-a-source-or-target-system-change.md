# How to Detect Broken Lineage After a Source or Target System Change

**Reviewed: 14 July 2026**

A source system is retired.

The migration programme updates its architecture diagram:

```text
ERP_A
→ retired

ERP_B
→ new source
```

The interfaces are redirected.

The old extract job is disabled.

The programme considers the transition complete.

Several weeks later, a data-quality defect appears in SAP.

Customer Group is blank for part of the migrated population.

The technical investigation finds that the new source system contains a field called `CUSTOMER_CLASS`, but the old source supplied Customer Group through a contextual conversion that also used Sales Area.

The system connection was replaced.

The lineage was not.

A similar failure can happen at the target end.

A custom SAP field is replaced by a standard field. The new field exists, accepts data and appears in the target extract. However:

- one Mapping still targets the custom endpoint;
- one outbound interface reads the old field;
- a Rule remains implemented against the custom field;
- historical reconciliation reports do not distinguish the two;
- the canonical Attribute links to both endpoints without an effective transition date.

Nothing is completely disconnected.

The model is still broken.

> Broken lineage exists when the declared or observed path can no longer explain how a governed value moves from its valid source context to its intended target context.

This is broader than a missing edge.

A lineage path can break because:

- a source disappears;
- a target is replaced;
- an interface contract changes;
- a field is renamed;
- a system is split or consolidated;
- the same endpoint name gains different meaning;
- runtime behaviour diverges from the approved design;
- historical and current paths are mixed together.

Martenweave Core already contains system-lineage object types including `System`, `Application`, `Interface`, `InterfaceEndpoint`, `IntegrationFlow`, `DataFlowStep` and `TransformationRule`. It also provides proposal impact analysis, repository diffing, canonical validation and generated lineage capabilities.

That object model provides the basis for detecting lineage breakage as a governed transition rather than a missing-document problem.

---

# A system change is not automatically a lineage change

Some technical changes preserve the model path.

Examples:

- infrastructure hostname changes;
- server moves to another environment;
- application receives a new display name;
- interface implementation is redeployed without changing its contract;
- source table moves to another schema while preserving identity and semantics.

Other changes alter lineage materially:

- source field removed;
- target field replaced;
- source authority transferred;
- record grain changes;
- interface field renamed without compatibility handling;
- direct Mapping becomes an enrichment;
- one source system is split into several systems;
- several sources are consolidated into one.

The first task is therefore classification.

Ask:

> Did the implementation location change, or did the governed dependency change?

A technical relocation may require endpoint metadata updates.

A semantic dependency change requires new lineage, impact analysis and approval.

---

# Four types of broken lineage

A practical detection model should distinguish four broad failure classes.

## Structural break

A required node or edge no longer exists.

Example:

```text
FEP-ERP-A-CUSTOMER-GROUP
→ retired

MAP-ERP-A-CUSTOMER-GROUP
→ still active
```

The Mapping has no usable source.

## Applicability break

The objects still exist, but the path no longer applies to the relevant population or context.

Example:

```text
ERP_B source Mapping:
valid for central Customer

Target Attribute:
Customer Sales Area
```

The field exists.

The grain is wrong.

## Semantic break

The path remains technically connected, but the source, transformation or target meaning changed.

Example:

```text
CUSTOMER_CLASS
→ mapped to
Customer Group
```

while `CUSTOMER_CLASS` now represents marketing classification rather than commercial grouping.

## Observability break

The approved design path exists, but current runtime or dataset evidence no longer confirms it.

Example:

```text
Approved Mapping:
CRM Segment + Sales Area → Customer Group

Observed extract:
Sales Area column missing
```

The model is intact.

The executable path is not currently supported.

These classes should not be collapsed into one `lineage invalid` message.

They require different action.

---

# Approved lineage and observed lineage

A lineage model needs two related views.

## Approved lineage

What the canonical model says should happen.

```text
FEP-ERP-A-CUSTOMER-GROUP
→ MAP-CUSTOMER-GROUP
→ ATTR-CUSTOMER-GROUP
→ FEP-S4-KNVV-KDGRP
```

## Observed lineage

What current datasets and runtime evidence show.

```text
ERP_B extract CUSTOMER_CLASS
→ transformation run 204
→ SAP load field KDGRP
```

Comparing these graphs reveals several conditions.

### Match

Observed execution supports the approved path.

### Missing observation

The approved path exists, but no current evidence confirms it.

### Undocumented execution

Runtime uses a path not represented canonically.

### Partial implementation

Only part of the approved transformation is observed.

### Contradiction

Observed source, transformation or target differs from the approved model.

OpenLineage’s current object model makes a similar distinction between design-time metadata and runtime events. `JobEvent` and `DatasetEvent` describe declared metadata, while `RunEvent` records an execution occurrence.

For Martenweave, canonical system and Mapping objects should represent approved design lineage. Dataset profiles, run reports and validation results provide observed evidence.

Neither view should silently overwrite the other.

---

# Register the system change as evidence first

When a source or target system changes, the first model action should not be automatic rewiring.

Record the change event.

Conceptually:

```yaml
id: FIND-ERP-A-RETIREMENT
type: Finding
subject: SYS-ERP-A
change_type: system_retirement
effective_from: 2026-10-01
evidence:
  - EVID-ERP-A-DECOMMISSION-PLAN
```

Possible system-change types include:

- retirement;
- replacement;
- rename;
- consolidation;
- split;
- ownership transfer;
- version upgrade;
- interface migration;
- endpoint deprecation;
- environment relocation.

This event becomes the anchor for impact analysis.

The safe sequence is:

```text
system change evidence
→ affected endpoint discovery
→ lineage impact
→ candidate replacement paths
→ validation
→ Decision
→ canonical update
```

not:

```text
system changed
→ replace IDs globally
```

---

# Source retirement

When a source system is retired, identify every model object that depends on it.

Start with:

```text
System
→ Applications
→ Interfaces
→ InterfaceEndpoints
→ FieldEndpoints
→ Mappings
→ Attributes
→ Rules
→ target endpoints
```

The first report should classify each dependency.

## Active dependency

The source currently provides an approved input.

## Historical dependency

The source is needed only to interpret previous migrations or records.

## Candidate dependency

A future Mapping was proposed but never approved.

## Incidental reference

Documentation or Evidence mentions the system without relying on it operationally.

## Replaced dependency

A successor path exists and has been approved.

A retirement should be blocked when an active critical dependency has no valid successor.

---

# Retiring a source system does not retire its history

Suppose ERP_A supplied Customer Group for Wave 2.

ERP_B will supply it for Wave 3.

The old path should remain historically queryable:

```text
Wave 2:
ERP_A Customer Group
→ direct Mapping
→ Customer Group
→ KNVV-KDGRP
```

The new path may be:

```text
Wave 3:
ERP_B Customer Class
+
Sales Area
→ enrichment
→ Customer Group
→ KNVV-KDGRP
```

Do not edit the old Mapping to point to ERP_B.

That would rewrite historical lineage.

Instead:

- retire or close the ERP_A Mapping for new use;
- preserve its effective period;
- create the ERP_B Mapping;
- connect the replacement relationship;
- identify affected baselines.

The old system is retired operationally.

Its model identity remains necessary for historical interpretation.

---

# Detect source fields without successors

A source-system retirement check should identify all active FieldEndpoints whose only physical parent is the retiring system.

Example:

```text
FEP-ERP-A-CUSTOMER-GROUP
FEP-ERP-A-PAYMENT-TERMS
FEP-ERP-A-SHIPPING-CONDITION
```

For each endpoint, ask:

1. Which business Attribute does it support?
2. Which active Mappings use it?
3. Which target endpoints depend on those Mappings?
4. Is a successor source registered?
5. Is semantic equivalence confirmed?
6. Are required context fields available?
7. Is the replacement path tested?

A similar field name in the new system should be treated as a candidate—not as confirmed replacement lineage.

---

# Source replacement can change grain

Source replacement often fails because teams compare fields but not record grain.

Example:

```text
Old source:
one Customer Group per Customer Sales Area

New source:
one Customer Class per Customer
```

The new field may have:

- matching datatype;
- similar codes;
- similar label.

It does not have matching cardinality.

The lineage detector should compare:

- source Entity;
- source keys;
- target Entity;
- Mapping context;
- expected cardinality.

A replacement should be classified as broken until the grain transition is explained.

---

# Source replacement can change authority

A new system may contain the data but not own it.

Example:

```text
CRM:
contains replicated Customer Group

ERP_B:
becomes operational source for Customer master

Global Reference System:
remains semantic authority
```

Redirecting lineage from ERP_A to ERP_B may be technically convenient and governantically wrong.

The transition analysis must distinguish:

- data availability;
- system of entry;
- system of record;
- semantic authority;
- temporary migration source.

A source system change should not silently transfer ownership of the business meaning.

---

# Target replacement

Target changes create a different impact pattern.

Suppose:

```text
Old:
FEP-S4-ZZ-REVIEW-STATUS

New:
FEP-S4-STANDARD-REVIEW-STATUS
```

The business Attribute remains:

```text
ATTR-SUPPLIER-REVIEW-STATUS
```

The detector should inspect:

- every incoming Mapping;
- every Rule implementation;
- outbound interfaces;
- reports;
- reconciliation;
- existing data;
- historical Evidence;
- local extensions;
- open proposals.

The key question is not only:

> Does the replacement field exist?

It is:

> Can the approved business Attribute be represented and operated equivalently through the replacement endpoint?

---

# Physical compatibility is not semantic compatibility

A replacement endpoint may have the same datatype and length.

Its value domain may differ.

Example:

```text
Old custom field:
PENDING
CLEARED
REJECTED

New standard field:
OPEN
COMPLETED
CANCELLED
```

The fields look similar.

The semantics may not be equivalent.

The lineage transition needs:

- value mapping;
- lifecycle comparison;
- Rule review;
- business Decision;
- historical-data treatment.

A direct endpoint replacement without these checks creates a semantic break.

---

# Detect stale target references

After target replacement, find all objects still pointing to the old endpoint.

Possible stale references include:

- incoming Mappings;
- transformation code references;
- interface fields;
- reports;
- Rules;
- test evidence;
- business-review exports;
- local overrides;
- dataset expectations.

Not all stale references require editing.

Historical Evidence should continue to point to the old endpoint when it tested the old implementation.

The detector should classify:

```text
active operational reference:
must migrate or justify

historical reference:
retain

candidate proposal:
refresh

documentation reference:
review

external consumer:
verify separately
```

---

# Parallel target operation

Some transitions include a coexistence period.

```text
Old custom field:
active for existing records

New standard field:
active for new records
```

or:

```text
Old interface:
consumed by legacy application

New API:
consumed by replacement application
```

The model should represent:

- effective dates;
- applicable populations;
- synchronisation Rules;
- source of truth during overlap;
- retirement criteria.

Without this, both endpoints appear active for the same Attribute and the graph cannot explain which is authoritative.

---

# Interface contract change

A system may remain unchanged while its interface contract changes.

Examples:

- property renamed;
- field removed;
- nested structure introduced;
- optional field becomes mandatory;
- code list changes;
- endpoint version changes;
- payload grain changes;
- filter behaviour changes.

Table- or system-level lineage may remain intact:

```text
CRM
→ Integration Platform
→ SAP
```

Field-level lineage may be broken.

The transition should inspect:

```text
Interface
→ InterfaceEndpoint
→ payload field
→ Mapping
→ business Attribute
```

A contract change can invalidate lineage even when every system remains online.

---

# Rename is not always replacement

Suppose an API property changes:

```text
customerGroup
→ salesAreaCustomerGroup
```

This could be:

1. a label improvement;
2. a clarified existing meaning;
3. a new sales-area-specific property replacing a central one.

Only the first two may preserve endpoint identity.

The third is a semantic and granularity change.

A rename detector should compare:

- stable external identifier if available;
- schema path;
- parent structure;
- definition;
- cardinality;
- keys;
- value domain;
- effective version.

Do not decide identity from text similarity alone.

---

# System rename versus system replacement

Enterprise landscapes frequently rename applications during mergers, platform programmes or branding changes.

Example:

```text
Legacy CRM
→ Customer Hub
```

The name changed.

The application may or may not have changed.

A stable `System` or `Application` ID should survive a true rename.

```yaml
id: SYS-CUSTOMER-HUB
name: Customer Hub
aliases:
  - Legacy CRM
```

However, if Customer Hub is a new product with:

- different data model;
- different ownership;
- different interfaces;
- migrated data;

then reusing the old system identity would hide a replacement.

The decision should be based on operational identity, not branding.

---

# System split

One source application may be divided into several successors.

```text
ERP_A
→ Customer Hub
→ Supplier Hub
→ Product Hub
```

A global replacement edge is insufficient.

Each source endpoint must be routed separately.

Example:

```text
ERP_A Customer Group
→ Customer Hub

ERP_A Supplier Risk
→ Supplier Hub

ERP_A Material Planning Group
→ Product Hub
```

The split may also divide ownership and effective dates.

The transition must be analysed per Attribute and endpoint.

---

# System consolidation

Several sources may be replaced by one target application.

```text
ERP_A
ERP_B
CRM
→ Master Data Hub
```

The new system may standardise representations.

It may also preserve source-specific semantics behind one field.

The detector should identify:

- formerly distinct Attributes merged into one;
- formerly shared Attribute split by source context;
- conflicting value domains;
- source-precedence changes;
- historical source identity loss.

Consolidation is not simply many edges redirected to one node.

---

# Dataset lifecycle events as detection signals

OpenLineage’s current object model includes dataset lifecycle metadata for events such as create, alter, drop, overwrite, rename and truncate.

These lifecycle signals can initiate model checks.

## Drop

Find every active lineage path depending on the dataset or its fields.

## Rename

Verify whether identity remains stable and update physical metadata without creating false deletion and addition.

## Alter

Compare field schema, keys, types and value domains.

## Overwrite

Check whether the logical dataset identity remains valid.

## Truncate

Treat as an operational data event, not necessarily a lineage-model change.

Martenweave does not need to reproduce an entire runtime lineage platform.

It can consume lifecycle evidence and assess the governed model consequences.

---

# Field-level schema comparison

When a source or target dataset changes, compare:

- fields added;
- fields removed;
- fields renamed;
- datatype changes;
- nullability;
- keys;
- nesting;
- value domains;
- descriptions where authoritative.

Then map each physical change to canonical objects.

Example:

```text
Removed:
ERP_A.CUSTOMER_GROUP

Canonical consequences:
- 1 active Mapping loses source
- 1 Customer Group Attribute loses approved input
- 2 migration datasets become unsupported
- 1 fallback path remains
```

A schema diff becomes valuable when translated into model impact.

---

# Direct and indirect dependencies

A changed field may not supply the target value directly.

It may control:

- filtering;
- joining;
- conditional logic;
- organisational selection;
- fallback behaviour.

OpenLineage’s column-lineage specification distinguishes direct dependencies, where an output value is derived from an input field, from indirect dependencies, where an input influences the result through a join, filter, grouping, sorting, window or conditional expression.

This distinction matters during system changes.

Removing a Sales Organisation field may not remove Customer Group’s source value.

It can still make Customer Group impossible to derive correctly because the contextual lookup no longer works.

The detector should report:

```text
Direct source preserved.

Conditional context lost.

Result:
lineage path structurally present but semantically incomplete.
```

---

# Broken key lineage

A system replacement may preserve payload fields while changing identifiers.

Example:

```text
Old source customer ID:
numeric internal number

New source customer ID:
global UUID
```

The business Attribute fields remain available.

The migration can no longer join them to existing organisational or historical records without a key cross-reference.

Broken key lineage can affect every downstream field even when those fields are unchanged.

The transition check should include:

- business key;
- technical key;
- cross-reference;
- parent-child keys;
- organisational keys;
- effective identity rules.

---

# Transformation-rule drift

A source or target change can leave the Mapping connected while invalidating its transformation.

Example:

```text
Old source code:
A, B, C

New source code:
01, 02, 03
```

The FieldEndpoint remains conceptually the source of Customer Class.

The conversion table still expects letters.

The graph is connected.

The transformation is broken.

Martenweave’s system-lineage model includes `TransformationRule` and `DataFlowStep` objects, which can represent this intermediate behaviour rather than treating the source-to-target connection as one undifferentiated edge.

---

# Rule-implementation drift

A target field may be replaced, but the Rule remains implemented against the old endpoint.

Example:

```text
Canonical Rule:
Supplier Review Status required before distribution.

Old implementation:
validation on custom field.

New field:
standard endpoint.

Current implementation:
not updated.
```

The lineage of the value may work.

The lineage of the control does not.

The broken-lineage detector should include:

- value path;
- validation path;
- workflow path;
- distribution path.

Master data depends on controls as well as values.

---

# Evidence can become stale without becoming false

An old mock-load report may prove that the previous lineage worked.

After system replacement, it no longer proves the new lineage.

Do not delete it.

Reclassify it:

```text
Historical Evidence:
valid for baseline CUSTOMER-WAVE2

Candidate replacement path:
not yet verified
```

This preserves auditability while exposing the new verification gap.

---

# Detecting broken lineage through graph comparison

A powerful method is to compare the graph before and after a proposed system change.

## Current graph

```text
ERP_A endpoint
→ Mapping A
→ Customer Group
→ KNVV-KDGRP
```

## Candidate graph

```text
ERP_B endpoint
→ Mapping B
→ Customer Group
→ KNVV-KDGRP
```

Compare:

- removed nodes;
- added nodes;
- redirected edges;
- changed edge types;
- changed statuses;
- changed applicability;
- changed transformation Rules;
- lost Evidence;
- new Findings.

A candidate graph is broken when required paths no longer connect appropriate roots to targets.

---

# Required path assertions

Rather than asking whether the graph remains generally connected, define critical assertions.

Example:

```text
For every approved mandatory SAP target FieldEndpoint:

there must be at least one
active or approved Mapping path

from an authoritative source
or declared manual creation process

covering each active applicability context.
```

Another assertion:

```text
Every active Rule implementation endpoint
must belong to an active system
or have an approved transition replacement.
```

Assertions turn lineage health into deterministic validation.

---

# Root-to-target continuity

For critical Attributes, test whether a complete path remains.

```text
authoritative source
→ observed dataset or creation process
→ Mapping
→ business Attribute
→ active target endpoint
```

The path may be considered broken when:

- no source exists;
- all sources are retired;
- required context is missing;
- Mapping is inactive;
- target is retired;
- source and target applicability do not overlap;
- transformation output is incompatible;
- replacement is only candidate status.

A path can remain graph-connected and fail one of these semantic requirements.

---

# Coverage by context

Do not test continuity only at the global level.

Customer Group may have:

```text
CRM population:
valid path

ERP_A historical population:
historical path

ERP_B Wave 3 population:
no approved path

manual exception population:
temporary path
```

A global query finds at least one source-to-target path.

The ERP_B context remains broken.

Lineage continuity must be evaluated per:

- country;
- business unit;
- source population;
- migration wave;
- organisational context;
- effective period.

---

# Detecting silent fallback

When a source disappears, the implementation may begin using:

- default values;
- another source;
- cached data;
- manual assignments;
- previous-period values.

The target remains populated.

A superficial completeness check shows no defect.

Observed lineage should identify the fallback path.

The model can then compare it with approved design.

Example:

```text
Approved:
ERP_A Customer Group

Observed after retirement:
default 01

Classification:
undocumented runtime fallback
```

This is a high-priority lineage break because data appears complete while provenance has changed.

---

# Detecting duplicate paths after replacement

During transition, both old and new sources may remain active.

```text
ERP_A Customer Group
→ Customer Group

ERP_B Customer Class
→ Customer Group
```

If applicability and precedence are not explicit, the model cannot determine:

- which source wins;
- whether values must agree;
- whether one path is fallback;
- whether populations overlap.

The detector should identify overlapping active paths to the same Attribute and context.

Possible status:

```text
parallel operation:
approved

uncontrolled duplication:
error
```

---

# Detecting path collapse

A new platform may simplify several transformation steps into one service.

Before:

```text
source field
→ staging normalisation
→ lookup table
→ enrichment
→ target field
```

After:

```text
source API
→ target API
```

The shorter runtime path may be valid.

The canonical model still needs to preserve:

- transformation meaning;
- lookup ownership;
- context dependencies;
- Rule assumptions.

Do not remove semantic Mapping objects merely because one technical service now implements several steps internally.

---

# Detecting path expansion

The opposite can occur.

A direct Mapping becomes:

```text
source
→ event bus
→ integration service
→ reference-data service
→ SAP API
```

The business Mapping may remain unchanged.

The implementation has more failure points and owners.

System lineage should expand while the semantic lineage remains stable.

This separation prevents technical topology from redefining business meaning.

---

# Detection workflow

A practical source- or target-change analysis can follow twelve steps.

## 1. Identify the change event

Retirement, replacement, rename, split, consolidation, interface version or endpoint change.

## 2. Fix the comparison baseline

Record current commit, candidate baseline and effective date.

## 3. Validate the current model

Do not analyse a graph with unresolved structural errors.

## 4. Locate affected system objects

Systems, Applications, Interfaces, InterfaceEndpoints and FieldEndpoints.

## 5. Traverse active dependencies

Find Mappings, TransformationRules, Attributes, Rules, datasets and consumers.

## 6. Preserve historical paths

Separate current operational dependencies from historical lineage.

## 7. Register candidate replacements

Do not approve them merely because names match.

## 8. Compare semantic contracts

Meaning, grain, keys, value domain, applicability and authority.

## 9. Build the candidate graph

Apply proposed replacements without changing canonical files.

## 10. Run required-path assertions

Check continuity per critical Attribute and context.

## 11. Compare approved and observed lineage

Use current dataset and runtime Evidence.

## 12. Generate Findings and review tasks

Do not mutate the model automatically.

---

# Suggested diagnostic codes

A focused implementation could expose diagnostics such as:

```text
MW-LINEAGE-BREAK-001
Active Mapping depends on retired source endpoint.

MW-LINEAGE-BREAK-002
Active Attribute has no source or creation path after system retirement.

MW-LINEAGE-BREAK-003
Replacement source has incompatible Entity grain.

MW-LINEAGE-BREAK-004
Replacement endpoint value domain is not equivalent.

MW-LINEAGE-BREAK-005
Interface contract removed a directly used field.

MW-LINEAGE-BREAK-006
Required conditional input is missing from replacement source.

MW-LINEAGE-BREAK-007
Active Rule implementation points to retired endpoint.

MW-LINEAGE-BREAK-008
Observed runtime path differs from approved Mapping.

MW-LINEAGE-BREAK-009
Old and new active paths overlap without precedence.

MW-LINEAGE-BREAK-010
Historical Evidence is being used to claim current verification.

MW-LINEAGE-BREAK-011
System rename created duplicate identities.

MW-LINEAGE-BREAK-012
Candidate target replacement leaves downstream consumers on old endpoint.
```

These findings should include:

- affected path;
- object IDs;
- context;
- severity;
- likely reviewer;
- suggested next action.

---

# Worked example: ERP_A retirement

## Current approved path

```text
FEP-ERP-A-CUSTOMER-GROUP
→ MAP-ERP-A-CUSTOMER-GROUP
→ ATTR-CUSTOMER-GROUP
→ FEP-S4-KNVV-KDGRP
```

## System event

```text
SYS-ERP-A
status:
retiring

effective date:
1 October 2026
```

## Candidate source

```text
FEP-ERP-B-CUSTOMER-CLASS
```

## Comparison

| Property | ERP_A | ERP_B |
|---|---|---|
| Meaning | Customer Group | Customer Classification |
| Grain | Customer Sales Area | Customer |
| Values | SAP-aligned codes | Local category codes |
| Authority | Approved | Unresolved |
| Context | Sales Area included | No Sales Area |

## Finding

```text
Replacement field exists,
but semantic equivalence and grain compatibility fail.
```

## Required actions

- define enrichment Mapping;
- add Sales Area source;
- approve source authority;
- profile ERP_B values;
- test candidate path;
- keep ERP_A Mapping historical.

The system replacement is not complete until the governed path is restored.

---

# Worked example: custom target field replaced

## Current path

```text
ATTR-SUPPLIER-REVIEW-STATUS
→ FEP-S4-ZZ-REVIEW-STATUS
```

## Proposed path

```text
ATTR-SUPPLIER-REVIEW-STATUS
→ FEP-S4-STANDARD-REVIEW-STATUS
```

## Detected dependencies on old endpoint

- migration Mapping;
- MDG Rule implementation;
- outbound interface;
- report filter;
- mock-load Evidence;
- local rollout exception.

## Candidate assessment

- Attribute meaning: mostly aligned;
- value domain: requires conversion;
- workflow Rule: not yet reimplemented;
- outbound interface: still uses old property;
- historical Evidence: remains valid only for old endpoint.

## Verdict

```text
Candidate lineage:
structurally connected

Operational continuity:
incomplete

Release:
blocked
```

A new target field alone does not restore the complete path.

---

# Worked example: interface property renamed

## Before

```text
API property:
customerGroup
```

## After

```text
API property:
salesAreaCustomerGroup
```

## Initial assumption

Simple rename.

## Discovered change

The new property is nested under Sales Area and may occur several times per customer.

## Classification

```text
Not a rename.

Change type:
grain and cardinality change
```

## Impact

- consumer data model;
- Mapping keys;
- report joins;
- API tests;
- source extract design;
- business Attribute context.

The detector avoids preserving false endpoint identity.

---

# Worked example: source system renamed

## Before

```text
SYS-LEGACY-CRM
name:
Legacy CRM
```

## After

```text
name:
Customer Hub
```

## Evidence

- same database;
- same interfaces;
- same ownership;
- same field identities;
- no migration event.

## Classification

```text
System rename.

Stable ID retained.
Old name preserved as alias.
No lineage rewiring required.
```

This prevents a cosmetic change from creating a false new system and orphaning the old paths.

---

# Worked example: observed path differs

## Approved path

```text
CRM Segment + Sales Area
→ Customer Group enrichment
→ KNVV-KDGRP
```

## Observed load

```text
Missing Sales Area
→ default 01
→ KNVV-KDGRP
```

## Technical result

Target field populated.

## Governance result

Approved lineage not followed.

## Classification

```text
Undocumented fallback.
Semantic and observability break.
```

## Required action

- identify affected records;
- determine whether fallback was authorised;
- correct implementation or create bounded deviation;
- retain runtime Evidence;
- rerun readiness.

---

# Release gates

A system transition should not be considered lineage-ready when:

- a critical Attribute loses its only active source;
- a replacement source has incompatible grain;
- required context fields are missing;
- a target replacement lacks updated Mappings;
- active Rules still point to retired endpoints;
- interface consumers remain on the old contract;
- overlapping paths have no precedence;
- candidate path has no supporting Evidence;
- historical lineage would be overwritten;
- observed runtime uses an undocumented fallback.

Warnings may remain when:

- noncritical endpoints are unclassified;
- low-volume consumers await verification;
- a historical report has incomplete metadata;
- future-state paths remain draft.

---

# CI and repository review

Broken-lineage checks should run during model changes.

A review can compare the base and candidate repositories:

```bash
martenweave validate --repo ./model
martenweave build-index --repo ./model --jsonl
martenweave diff ./model ./candidate-model
martenweave impact SYS-ERP-A --repo ./model
```

The documented Martenweave CLI currently supports validation, index construction, trace, impact and repository diff operations.

A future system-change-aware check could evaluate:

```bash
martenweave lineage-check \
  --change FIND-ERP-A-RETIREMENT \
  --repo ./model
```

The dedicated command is a recommended direction rather than current guaranteed behaviour.

---

# What AI can contribute

AI can help:

- extract candidate replacement fields from interface specifications;
- compare old and new descriptions;
- summarise schema differences;
- propose likely Mapping updates;
- identify references in tickets and reports;
- draft Findings and test plans.

AI should not decide autonomously:

- that two systems are the same identity;
- that similarly named fields are semantically equivalent;
- that a historical path can be deleted;
- that runtime fallback is acceptable;
- that source authority transfers to the replacement system.

The deterministic layer should establish exact model dependencies.

Humans approve identity, authority and semantic compatibility.

---

# What Martenweave should implement next

Martenweave already has the relevant architectural pieces:

- system-lineage objects;
- canonical Mappings and Rules;
- deterministic reference validation;
- repository diff;
- trace and impact;
- BFS-based proposal impact;
- dataset readiness;
- proposal-first change control.

The next useful vertical slice should be **system-change lineage continuity analysis**.

## Goal

Detect which approved lineage paths break when a System, Application, Interface or FieldEndpoint is retired, replaced or changed.

## Scope

Support change events for:

- system retirement;
- source replacement;
- target replacement;
- interface-field removal;
- interface-field rename;
- system rename.

## Required checks

1. Active Mappings using retired endpoints.
2. Mandatory Attributes losing all source paths.
3. Replacement fields with incompatible grain.
4. Missing direct or conditional inputs.
5. Rules implemented against retired targets.
6. Downstream interfaces still consuming old endpoints.
7. Duplicate old and new active paths without precedence.
8. Historical Evidence incorrectly treated as current.
9. Runtime observations contradicting approved lineage.
10. System rename represented incorrectly as replacement.

## Acceptance criteria

For an ERP_A retirement scenario, Martenweave should report:

- all affected source FieldEndpoints;
- active Mappings;
- business Attributes;
- SAP targets;
- replacement candidates;
- missing context;
- historical paths to preserve;
- required reviewers.

## Validation command

```bash
martenweave validate --repo examples/customer_bp_model
```

## Existing functional checks

```bash
martenweave trace \
  ATTR-CUST-SALES-CUSTOMER-GROUP \
  --repo examples/customer_bp_model

martenweave impact \
  FEP-S4-KNVV-KDGRP \
  --repo examples/customer_bp_model
```

## Future transition check

```bash
martenweave lineage-check \
  --system SYS-ERP-A \
  --change retirement \
  --repo examples/customer_bp_model
```

The final command describes a product direction, not a current documented CLI contract.

---

# Final perspective

A source or target system change is not complete when the new connection works.

It is complete when the organisation can still explain every critical governed path.

The relevant chain is:

```text
authoritative source
→ physical field
→ dataset or interface
→ transformation
→ business Attribute
→ target endpoint
→ downstream consumer
```

supported by:

```text
Rules
Decisions
Evidence
ownership
effective baseline
```

Broken lineage can appear as:

- a missing edge;
- a wrong grain;
- an outdated transformation;
- a stale Rule implementation;
- a silent fallback;
- a duplicated source path;
- a replacement endpoint with different meaning;
- historical evidence presented as current proof.

The practical test is:

> After the system change, can the team trace every critical Attribute from an authoritative and contextually valid source to the active target, prove that the candidate transformation works and preserve the previous path for historical interpretation?

When the answer is yes, lineage continuity has been restored.

When the answer is:

> The new interface is running,

the technical transition may be complete while the model transition remains unresolved.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects system, interface, endpoint, Mapping, Attribute, Rule, Decision and Evidence objects so that source and target changes can be assessed before they silently break model continuity.

The objective is not to preserve old systems forever.

It is to preserve the meaning and provenance of the data as systems change.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave Core currently includes system-lineage model objects such as `IntegrationFlow`, `DataFlowStep`, `TransformationRule`, `Interface`, `InterfaceEndpoint`, `Application` and `System`. Its release history also records proposal impact analysis, repository diffing, search and schema-version support.

The current Martenweave workflow uses canonical files as the source of truth, validates references before indexing and places lineage and impact analysis before reviewable AI-assisted proposals.

OpenLineage’s object model distinguishes runtime `RunEvent` observations from design-time `JobEvent` and `DatasetEvent` metadata. It also defines dataset lifecycle metadata for changes including create, alter, drop, overwrite, rename and truncate.

OpenLineage’s column-level lineage specification distinguishes direct field derivation from indirect influence and classifies indirect dependencies such as joins, filtering and conditional logic. This is important when a removed field controls context without directly supplying a target value.

The system-change events, lineage-break diagnostic codes and proposed `lineage-check` operation in this article describe recommended Martenweave improvements. They should not be interpreted as guarantees of the exact current schema or CLI unless separately implemented and published.

Martenweave is independent and is not affiliated with or endorsed by SAP or OpenLineage.
