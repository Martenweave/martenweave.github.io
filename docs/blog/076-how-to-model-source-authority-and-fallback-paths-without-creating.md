# How to Model Source Authority and Fallback Paths Without Creating Ambiguous Lineage

**Reviewed: 14 July 2026**

A migration team traces Customer Group upstream and finds four possible sources:

```text
CRM Customer Segment
ERP Customer Classification
Global Customer Reference
Manual Enrichment Workbook
```

All four contain values that resemble Customer Group.

All four are connected to the same business Attribute.

The resulting graph appears rich and complete.

It is also ambiguous.

A reviewer cannot determine:

- which source should normally be used;
- which source is authoritative for the business meaning;
- which source applies only to one population;
- which source is a temporary fallback;
- which source merely contains a replicated copy;
- which source provides context but not the value itself;
- what happens when two sources disagree;
- when the fallback is permitted;
- when the fallback must stop.

The graph says that several paths exist.

It does not say which path is legitimate.

> Lineage becomes operationally useful only when it distinguishes source availability from source authority and normal paths from exceptional paths.

This distinction matters in SAP migration, MDM and AMS because enterprise landscapes rarely contain one clean source for every Attribute.

Instead, they contain:

- systems of entry;
- systems of record;
- replicated copies;
- migration extracts;
- reference-data services;
- local applications;
- manual enrichments;
- temporary defaults;
- historical sources;
- target systems that become sources for downstream consumers.

A source can be technically available and still be unsuitable.

A fallback can be operationally necessary and still be non-authoritative.

A replicated field can be accurate and still be the wrong place to govern change.

Martenweave’s current model already treats Domains, Entities, Attributes, datasets, Mappings, Rules, Evidence, Decisions and proposals as separate canonical object types. The core validates references before generating lineage and impact projections, and routes proposed changes through deterministic validation and human approval.

The next requirement is to model the **role** of each source path.

---

# Authority is not the same as physical origin

Suppose a Customer Group value appears in CRM.

That may mean several things.

## CRM is the semantic authority

The business owner defines and maintains Customer Group in CRM.

## CRM is the system of entry

Users enter the value there, but a central reference system governs permitted values and meaning.

## CRM contains a replica

The value is copied into CRM from SAP or an MDM hub.

## CRM is a migration source

CRM supplies the value for a one-time migration even though another system is the long-term authority.

## CRM is a fallback

CRM is used only when the authoritative source is unavailable.

## CRM provides an input, not the final value

CRM Segment contributes to a Customer Group derivation but is not equivalent to Customer Group.

All six situations can produce an edge from CRM toward the target.

They should not produce the same edge type.

---

# Five separate questions

Source authority becomes clearer when the model separates five questions.

## Who defines the meaning?

This is semantic authority.

Example:

```text
Global Customer Data Owner
```

## Where is the value normally maintained?

This is the system of entry or maintenance.

Example:

```text
SAP MDG
```

## Which system is considered authoritative for current operational use?

This is the operational source of record.

Example:

```text
SAP S/4HANA
```

## Which source is approved for this migration or interface?

This is the approved extraction source.

Example:

```text
Legacy ERP_A for Wave 2
```

## Which path is allowed when the preferred source fails?

This is fallback policy.

Example:

```text
Manual enrichment after documented source gap
```

These roles may belong to different systems.

A lineage graph that labels only one system as “source” loses the distinction.

---

# Source roles

A practical source-role taxonomy can remain small.

## Authoritative source

The approved source for the Attribute within a declared context.

```text
role: authoritative
```

This does not necessarily mean that users enter data directly there.

It means that its value is the approved reference for the stated scope.

## System of entry

Where the value is created or changed operationally.

```text
role: system_of_entry
```

The value may subsequently be approved, mastered or replicated elsewhere.

## Replicated source

A copy derived from another authoritative location.

```text
role: replicated
```

It may be usable for downstream operations but should not silently become the source for remastering the same concept.

## Enrichment source

Provides one of several inputs to a derivation.

```text
role: enrichment
```

For example, Sales Area may help derive Customer Group without being Customer Group itself.

## Fallback source

Used only when the preferred path cannot be used and declared conditions are met.

```text
role: fallback
```

## Historical source

Was authoritative or operationally relevant for an earlier period or baseline.

```text
role: historical
```

## Candidate source

Under investigation but not approved.

```text
role: candidate
```

## Rejected source

Explicitly reviewed and found unsuitable.

```text
role: rejected
```

A source may hold more than one role in different contexts.

---

# Authority must be scoped

The statement:

```text
ERP_A is authoritative for Customer Group.
```

is rarely sufficient.

Authority may depend on:

- business Attribute;
- country;
- company;
- business unit;
- organisational level;
- source population;
- lifecycle stage;
- effective period;
- migration wave.

A stronger statement is:

```yaml
attribute: ATTR-CUSTOMER-GROUP
source: FEP-ERP-A-CUSTOMER-GROUP
role: authoritative
scope:
  population: acquired_company_customers
  migration_wave: WAVE-2
effective_from: 2026-02-01
effective_to: 2026-06-30
```

This is a conceptual representation rather than a guarantee of the exact current Martenweave schema.

Authority without scope creates hidden overlap.

---

# Authority belongs to a path, not merely a system

One application may be authoritative for one Attribute and unreliable for another.

Example:

```text
CRM:
authoritative for Customer Segment
not authoritative for Customer Group

ERP:
authoritative for Payment Terms
not authoritative for legal Tax Exemption

MDG:
system of entry for Supplier Risk
not original source for external compliance rating
```

Therefore, avoid declaring:

```text
SYS-CRM role: authoritative
```

at the whole-system level without qualification.

Authority should normally be attached to:

```text
system or endpoint
+
business Attribute
+
context
+
effective period
```

The same system can play different roles across the model.

---

# Authority is not transitive by default

Suppose:

```text
Global Reference System
→ replicates to CRM
→ CRM supplies migration extract
→ SAP receives value
```

The migration extract came from CRM.

That does not make CRM the semantic authority.

The full path is:

```text
semantic authority:
Global Reference System

replicated copy:
CRM

approved migration extraction point:
CRM extract

target:
SAP
```

If the model records only the physical source used by the migration, future users may conclude incorrectly that CRM owns the definition.

Authority should not be inferred merely from proximity to the target.

---

# Provenance and authority are related but different

Provenance describes how an Entity was generated, derived, attributed or influenced.

W3C PROV provides a general model for representing provenance across heterogeneous systems and contexts through concepts such as Entities, Activities and Agents.

That is useful for answering:

- where a value came from;
- which process transformed it;
- which agent or system was involved.

Authority adds another governance question:

> Which of the available sources is approved to determine the value for this particular purpose?

A value can have clear provenance and disputed authority.

Example:

```text
Value came from CRM.
CRM received it from a local sales process.
Global data owner does not accept it as Customer Group.
```

The provenance is known.

The source is not authoritative.

---

# Preferred path

For each governed Attribute and context, the model should identify a preferred path.

Example:

```text
Global Customer Reference
→ approved Mapping
→ Customer Group
→ SAP KNVV-KDGRP
```

The preferred path should state:

- authoritative source;
- required context fields;
- transformation;
- target;
- applicable population;
- expected evidence;
- owner.

This creates a clear normal route.

Fallback logic can then be evaluated relative to it.

---

# Fallback is an exception policy

A fallback source should not be represented as just another active Mapping.

A fallback must answer:

- Why is the preferred path unavailable?
- Under which conditions may fallback be used?
- Which population may use it?
- Who approves its use?
- Does it produce equivalent meaning?
- Must the resulting records be marked?
- When does the fallback expire?
- What happens when the preferred source returns?

A fallback is therefore a combination of:

```text
alternative source
+
trigger condition
+
priority
+
scope
+
approval
+
expiry
+
reconciliation requirement
```

Without those elements, fallback becomes uncontrolled source competition.

---

# Fallback triggers

Common triggers include:

## Source unavailable

The preferred system cannot provide the extract in time.

## Source field missing

The dataset lacks the required Attribute or context.

## Source value invalid

The value fails a domain or quality Rule.

## Population outside preferred source

The preferred source covers only part of the migration scope.

## Transition period

The new authority is not yet operational for all records.

## Emergency operational continuity

A temporary manual or replicated source is used during an incident.

The trigger should be machine-evaluable where possible.

Weak:

```text
Use CRM when needed.
```

Stronger:

```text
Use CRM fallback only when the global reference value is absent
and the record belongs to the Wave 2 acquired-company population.
```

---

# Fallback priority

Where several paths exist, define deterministic priority.

Example:

```text
Priority 1:
Global Customer Reference

Priority 2:
ERP_A approved historical source

Priority 3:
manual enrichment

Prohibited:
CRM Segment direct mapping
```

This prevents different teams from selecting different sources based on convenience.

A priority list should be scoped to the Attribute and context.

It should not become one global source hierarchy for the whole enterprise.

---

# Priority is not evidence quality

A lower-priority fallback may contain more recent data.

A higher-priority source may have stronger governance.

These are separate dimensions.

Model:

```text
source priority:
which path should be selected

evidence confidence:
how strongly current evidence supports that path

data freshness:
how recent the observed value is

quality:
how well the value passes checks
```

Do not automatically promote a fresher replicated field above the authoritative source without a governance Decision.

---

# Equivalent fallback versus approximate fallback

Not all fallbacks preserve meaning equally.

## Equivalent fallback

The fallback holds the same business Attribute with compatible grain and values.

Example:

```text
Primary:
MDG-approved Customer Group

Fallback:
verified replicated copy in ERP
```

## Transformable fallback

The fallback can produce the Attribute through an approved conversion.

Example:

```text
ERP Customer Class
→ conversion table
→ Customer Group
```

## Approximate fallback

The fallback is correlated but not semantically equivalent.

Example:

```text
CRM Segment
→ provisional Customer Group
```

## Operational default

No source value exists; a temporary default is assigned.

These should not share the same confidence or release policy.

---

# Approximate fallbacks must remain visible

Suppose Customer Group is unavailable and CRM Segment is used as a temporary approximation.

The target field becomes populated.

A completeness report may show success.

The model should preserve:

```text
source role:
approximate_fallback

semantic equivalence:
not confirmed

records affected:
tracked

remediation:
required

expiry:
before production cutover
```

Otherwise, an emergency workaround becomes indistinguishable from approved lineage.

---

# Manual enrichment is a source path

A business-owned workbook or stewardship process can be a legitimate fallback.

It should be represented truthfully:

```text
missing authoritative source
→ manual business review
→ approved assignment
→ Customer Group
```

The workbook itself should not become the enduring semantic authority.

The model should identify:

- who made the assignment;
- which evidence was reviewed;
- which Rule governed the decision;
- which records were affected;
- whether the assignment remains valid after the authoritative source is restored.

Manual does not mean ungoverned.

---

# Defaults are the weakest fallback

A default creates a target value without source-specific evidence.

Example:

```text
Missing Customer Group
→ default STANDARD
```

Defaults may be necessary for:

- technical load compatibility;
- temporary process continuity;
- low-risk optional classifications.

They create serious risks:

- false completeness;
- hidden source gaps;
- distorted reporting;
- incorrect downstream decisions;
- permanent temporary values.

A default path should require:

- explicit Decision;
- bounded scope;
- owner;
- effective period;
- affected-record tracking;
- remediation plan.

The model should not label the default as authoritative.

---

# Replicated copies

A replicated field may be the easiest extraction point.

Example:

```text
Global Reference
→ replicated to CRM
→ extracted for migration
```

The graph should represent both facts:

```text
Global Reference:
semantic authority

CRM field:
replicated extraction source
```

This allows the migration team to use CRM operationally without changing the authority model.

It also supports reconciliation:

```text
CRM replica must match Global Reference
as of extraction date.
```

---

# Replication lag

A replicated source may be valid but stale.

The authority model should optionally capture:

- expected replication interval;
- latest successful synchronisation;
- acceptable lag;
- conflict behaviour.

A fallback based on a replica may be allowed only when:

```text
replication age < 24 hours
```

or:

```text
source version matches approved snapshot
```

OpenLineage separates static design metadata from runtime Run observations, allowing declared inputs and outputs to be compared with actual execution events.

Martenweave can apply the same separation:

```text
declared replica relationship
+
observed synchronisation evidence
```

---

# Conflict resolution

When two active sources disagree, the model should not leave resolution implicit.

Possible policies include:

## Authority wins

Use the value from the authoritative source.

## Latest approved value wins

Use the most recent value that passed governance.

## Context-specific authority

One source wins for one country or organisational level, another elsewhere.

## Manual adjudication

Create a Finding and require owner decision.

## Block

Do not produce a target value until the conflict is resolved.

The policy should be represented as a Rule or Decision.

Do not encode it only in ETL code.

---

# Conflict is evidence, not a new source

Suppose:

```text
Global Reference:
STANDARD

ERP:
STRATEGIC
```

The difference should produce:

```text
FIND-CUSTOMER-GROUP-SOURCE-CONFLICT
```

It should not cause the transformation to select whichever value appears first in a join.

The Finding should capture:

- competing values;
- source roles;
- context;
- affected records;
- selection policy;
- owner;
- resolution evidence.

---

# Source precedence and source authority

These concepts are related but not identical.

## Authority

Which source is trusted to define the value.

## Precedence

Which source is selected first by an operational process.

A process may temporarily prefer a fallback for availability reasons while the semantic authority remains elsewhere.

Example:

```text
Semantic authority:
Global Reference System

Migration extraction precedence:
ERP replicated field

Reason:
Global source cannot produce the required bulk extract

Requirement:
reconcile ERP values to global source before load
```

The distinction prevents implementation convenience from redefining governance.

---

# Authority changes over time

An Attribute may change authority during a transformation programme.

Example:

```text
Before 1 September:
ERP_A authoritative

1 September–31 October:
ERP_A and MDG dual-running

After 1 November:
MDG authoritative
```

The transition needs:

- effective dates;
- dual-running policy;
- reconciliation;
- cutover condition;
- rollback approach;
- historical preservation.

Do not edit the old source relationship in place.

Create a time-bounded authority transition.

---

# Dual-running

During dual-running, two systems may legitimately maintain or produce the same Attribute.

The model should state:

- which source is primary;
- which is shadow;
- whether both may be edited;
- reconciliation frequency;
- acceptable differences;
- cutover criteria;
- conflict owner.

Example:

```yaml
attribute: ATTR-SUPPLIER-RISK
period: dual_run
primary_source: FEP-MDG-SUPPLIER-RISK
shadow_source: FEP-ERP-A-SUPPLIER-RISK
reconciliation: daily
cutover_condition: zero_unresolved_differences
```

Again, this is a proposed modelling shape.

Without this policy, dual-running appears as uncontrolled duplicate authority.

---

# Authority after SAP migration

After migration, SAP often becomes a downstream operational source for other applications.

That does not necessarily mean SAP becomes the semantic authority for every Attribute.

Example:

```text
External compliance service
→ Supplier Risk input
→ governed derivation
→ SAP
→ outbound interfaces
```

SAP is the distribution source for downstream applications.

The external service and business Rule remain part of the authority chain.

A trace should distinguish:

```text
semantic origin
operational master
distribution source
```

---

# Different authority by lifecycle stage

Authority may change during a record’s lifecycle.

Example:

```text
Creation:
supplier portal supplies legal name

Verification:
compliance system confirms status

Approval:
MDG becomes authoritative

Operation:
S/4HANA distributes the approved value
```

One global source declaration cannot represent this adequately.

Model authority by lifecycle where material.

---

# Different authority by Attribute

A Business Partner may have:

```text
Legal Name:
external registry

Customer Group:
sales governance

Payment Terms:
finance policy

Tax Identifier:
legal documentation

Review Status:
workflow system
```

The Business Partner object does not have one universal source of truth.

Authority belongs to individual Attributes or coherent Attribute groups.

---

# Attribute groups

Modelling authority for every field individually may be excessive.

Related Attributes can share authority when they genuinely move together.

Example:

```text
Postal Address group:
street
city
postal code
country
```

A group-level authority may be appropriate if:

- same source;
- same ownership;
- same lifecycle;
- same applicability.

Do not force group authority when one field has a different legal or operational source.

---

# Source Mappings should declare role

A Mapping should not merely state:

```text
source:
FEP-CRM-CUSTOMER-SEGMENT
```

It should explain the source’s role:

```yaml
inputs:
  - endpoint: FEP-CRM-CUSTOMER-SEGMENT
    role: direct_input
    authority: non_authoritative

  - endpoint: FEP-LEGACY-SALES-AREA
    role: conditional_context
```

The Mapping can then declare:

```text
output authority:
derived under Decision 017
```

This makes it clear that CRM Segment contributes to the result without owning the Customer Group meaning.

---

# Derived authority

Some Attributes are not authoritative in any single source.

They are governed derivations.

Example:

```text
Supplier Risk =
external score
+
supplier category
+
compliance status
+
approved Rule
```

No input alone is authoritative for the final Attribute.

The authoritative artefact is:

```text
approved derivation Rule or Mapping
```

The model should distinguish:

- authoritative input sources;
- authoritative transformation;
- authoritative output store.

This is especially important for classifications and statuses.

---

# Fallback chains

A model may require more than one fallback.

Example:

```text
Primary:
Global Customer Reference

Fallback 1:
ERP replicated copy

Fallback 2:
manual enrichment

Final fallback:
block record
```

This is a fallback chain.

Each step should declare:

- trigger;
- scope;
- confidence;
- owner;
- expiry;
- next action.

The chain should terminate explicitly.

A system should not continue selecting weaker sources indefinitely.

---

# “Block” is a valid fallback outcome

Teams often assume every fallback must produce a value.

Sometimes the safest fallback is:

```text
No acceptable source
→ do not load
```

This is particularly appropriate for:

- legal identifiers;
- bank data;
- high-risk classifications;
- mandatory organisational keys;
- regulated attributes.

A blocked record is visible operational debt.

A fabricated default is hidden data debt.

---

# Fallback records must be identifiable

Where a fallback path is used, retain evidence of that fact.

Possible metadata includes:

- selected source;
- fallback reason;
- selection time;
- Mapping version;
- Decision;
- steward;
- remediation status.

The target SAP field may not store all provenance.

The migration or Evidence layer should.

Otherwise, after load, the programme cannot distinguish authoritative values from temporary approximations.

---

# Reconciliation after fallback

Fallback use should often trigger later reconciliation.

Example:

```text
Manual Customer Group assigned during cutover.

After authoritative source restoration:
compare manual value with approved source.
```

Possible outcomes:

- values match;
- target correction required;
- authority Decision revised;
- manual assignment remains approved.

The fallback path is not complete until its reconciliation obligation is closed.

---

# Fallback expiry

Every temporary fallback should answer:

```text
When does this stop?
```

Expiry can be based on:

- date;
- migration wave;
- system go-live;
- source remediation;
- Decision replacement;
- successful reconciliation;
- record-level closure.

Weak:

```text
temporary fallback
```

Stronger:

```text
valid through Mock Load 3 only
```

or:

```text
valid until the Global Customer Reference bulk API is operational
```

An expired fallback that remains active should become a health error or high-severity warning.

---

# Permanent fallback

Some fallback paths are permanent by design.

Example:

```text
When no external legal registry covers the country,
manual legal review is the approved source.
```

The path is still a fallback because it applies only under a specific condition.

Permanent does not mean uncontrolled.

It still requires:

- trigger;
- owner;
- evidence;
- Rule;
- auditability.

---

# Local fallback versus global model

A country may need a local source because the global authority lacks coverage.

Example:

```text
Global source:
Tax Identifier validation for EU countries

Local fallback:
national registry for one jurisdiction
```

The local source may be authoritative within that context rather than merely approximate.

Model:

```text
global default authority
+
contextual authority override
```

Do not treat every local source as lower quality simply because it is local.

Authority follows approved scope, not organisational hierarchy.

---

# Avoid two active authoritative sources for the same scope

The most dangerous ambiguity is:

```text
Source A:
authoritative

Source B:
authoritative

Attribute:
same

Scope:
same

Effective period:
same
```

This may be intentional dual-running.

If so, the model needs a reconciliation and precedence policy.

Otherwise, validation should flag it.

Suggested diagnostic:

```text
MW-AUTH-001

Overlapping authoritative sources exist
for ATTR-CUSTOMER-GROUP
in the same context and effective period.

No conflict-resolution policy is declared.
```

---

# Detecting overlapping paths

For each Attribute, compare active source paths by:

- scope;
- population;
- organisational context;
- effective date;
- source role;
- priority.

Two paths are ambiguous when:

1. their applicability overlaps;
2. both can produce the final value;
3. neither has higher precedence;
4. no reconciliation or conflict Rule exists.

This is a semantic graph check, not simple duplicate detection.

---

# Detecting gaps in authority

The opposite problem occurs when no source is authoritative for a context.

Example:

```text
CRM:
candidate only

ERP:
historical only

Manual enrichment:
not approved

Target:
mandatory Customer Group
```

The target may still receive values in practice.

The model has an authority gap.

Suggested diagnostic:

```text
MW-AUTH-002

No authoritative or approved fallback path
covers the active population.
```

This should be distinguished from a missing physical source.

The field may exist.

The governance path does not.

---

# Detecting fallback without trigger

Example:

```text
MAP-MANUAL-CUSTOMER-GROUP
role:
fallback
```

but no trigger condition is declared.

The system cannot determine when it may be used.

Suggested diagnostic:

```text
MW-AUTH-003

Fallback Mapping has no activation condition.
```

---

# Detecting fallback without expiry

Example:

```text
temporary_default: 01
status: active
```

with no end date, wave or closure condition.

Suggested diagnostic:

```text
MW-AUTH-004

Temporary fallback has no expiry or remediation condition.
```

---

# Detecting replica mistaken for authority

Example:

```text
CRM Customer Group
role:
authoritative
```

while lineage shows:

```text
Global Reference
→ replication job
→ CRM Customer Group
```

The model may be correct if governance intentionally transferred authority.

Otherwise, the role conflicts with provenance.

Suggested diagnostic:

```text
MW-AUTH-005

Endpoint classified as authoritative
but observed lineage identifies it as a replica.
Review source-role assignment.
```

The system should not resolve the contradiction automatically.

---

# Detecting historical source used as current

A retired ERP source may remain available in extracts or archives.

A Mapping accidentally uses it for a current wave.

Suggested diagnostic:

```text
MW-AUTH-006

Historical source path is active
outside its effective baseline.
```

---

# Detecting fallback output that violates the Attribute

A fallback can be operationally available and semantically invalid.

Example:

```text
Fallback source value:
UNDER_REVIEW

Target Attribute:
Supplier Risk

Allowed values:
LOW, STANDARD, HIGH
```

The fallback Mapping cannot produce a valid target value.

Suggested diagnostic:

```text
MW-AUTH-007

Fallback output is outside the target value domain.
```

---

# Approved path versus observed selection

A model may declare:

```text
Primary:
Global Reference

Fallback:
ERP replica
```

Observed migration logs may show:

```text
ERP replica selected for 92% of records
```

This suggests:

- primary source unavailable;
- selection implementation wrong;
- scope incorrectly modelled;
- fallback has effectively become the operational source.

OpenLineage’s distinction between design-time metadata and runtime observations is useful here: a declared path and an observed Run are related but not interchangeable.

The result should be a Finding:

```text
Fallback usage materially exceeds declared scope.
```

Not an automatic authority update.

---

# Measuring fallback usage

Useful metrics include:

- records using preferred source;
- records using each fallback;
- records blocked;
- unresolved source conflicts;
- expired fallback usage;
- fallback age;
- remediation completion.

A readiness report might show:

| Path | Records | Share | Status |
|---|---:|---:|---|
| Global Reference | 82,400 | 91.4% | Approved |
| ERP replica | 5,900 | 6.5% | Temporary fallback |
| Manual enrichment | 1,320 | 1.5% | Review required |
| Default | 210 | 0.2% | Expired |
| Blocked | 340 | 0.4% | Open gap |

These metrics make source-policy drift visible.

---

# Source conflict metrics

A model can also track:

- values where primary and replica disagree;
- values where two candidate sources disagree;
- records with no source;
- records with stale replica;
- records whose fallback was not reconciled.

The objective is not to store every production record in Martenweave.

The repository can reference aggregate profiles and restricted evidence.

---

# Source authority during migration waves

A programme may deliberately use different sources by wave.

Example:

```text
Wave 1:
ERP_A

Wave 2:
ERP_B

Wave 3:
Global Customer Hub
```

This is not necessarily inconsistency.

It becomes ambiguous when:

- Mappings lack wave applicability;
- old sources remain active;
- Decisions do not explain the transition;
- downstream reports combine values without knowing the source policy.

Authority should be baseline-aware.

---

# Source authority in AMS

After migration, temporary source paths often remain embedded in support procedures.

Examples:

- old ERP lookup used for corrections;
- spreadsheet used for missing classifications;
- replicated reporting field treated as master;
- default values reintroduced during incidents.

AMS needs a clear operating rule:

```text
which source may correct which Attribute
under which incident or exception condition
```

Martenweave can make these paths reviewable without becoming an incident-management platform.

---

# Decision objects are essential

Authority is a governance conclusion.

A Decision should explain:

- considered sources;
- selected authority;
- rejected alternatives;
- scope;
- effective period;
- fallback policy;
- reconciliation;
- owner.

Example:

```text
DEC-CUSTOMER-GROUP-AUTHORITY-021

Decision:
Global Customer Reference is authoritative.

ERP_A may be used as a fallback for Wave 2
when the global value is absent.

CRM Segment is not semantically equivalent
and must not be used directly.
```

The Decision connects the lineage graph to accountable reasoning.

---

# Rules enforce source policy

A source-authority Decision should be enforceable through Rules.

Examples:

```text
If Global Customer Reference is present,
do not use ERP fallback.

If fallback is used,
record fallback reason.

If CRM Segment is the only input,
block automatic Customer Group assignment.

If fallback expiry has passed,
block candidate load.
```

Rules turn source policy into testable conditions.

---

# Mapping status is not enough

A Mapping marked `approved` may still be:

- primary;
- fallback;
- historical;
- local;
- temporary.

Status answers:

```text
Has this Mapping been approved?
```

Role answers:

```text
When and why should this Mapping be selected?
```

Both are required.

---

# Confidence is not authority

A candidate Mapping may have high statistical confidence.

An authoritative Mapping may rely on a manually approved source with limited automation.

Do not equate:

```text
AI confidence
data quality score
historical match rate
```

with:

```text
governance authority
```

Evidence can support an authority Decision.

It does not replace it.

---

# AI can propose source roles

AI can help compare:

- field definitions;
- value distributions;
- source ownership documents;
- interface specifications;
- historical mappings;
- tickets and decisions.

It can propose:

```text
ERP field appears to be a replicated copy.
CRM Segment is likely an enrichment input.
Manual workbook appears to be a fallback.
```

These are candidate classifications.

Humans must approve authority and fallback policy.

Martenweave’s existing product principle is explicit: agents propose, validators verify, humans approve and Git records the accepted change.

---

# Validation rules for source authority

A first implementation could check:

## Coverage

Every mandatory active Attribute has an authoritative or approved derivation path for each required context.

## Uniqueness

No overlapping authoritative sources exist without reconciliation policy.

## Role validity

Replicated, candidate and rejected sources cannot be treated as primary without Decision.

## Fallback trigger

Every fallback has an activation condition.

## Fallback termination

Temporary fallbacks have expiry or closure conditions.

## Priority

Overlapping paths have deterministic precedence.

## Semantic compatibility

Fallback outputs conform to the target Attribute and value domain.

## Temporal compatibility

Source paths operate only inside their effective periods.

## Governance

Authority and high-risk fallback paths have owners and Decisions.

## Evidence

Observed use can be traced to supporting reports or run evidence.

---

# Suggested diagnostic codes

```text
MW-AUTH-001
Overlapping authoritative sources without conflict policy.

MW-AUTH-002
No authoritative source covers an active context.

MW-AUTH-003
Fallback path has no trigger condition.

MW-AUTH-004
Temporary fallback has no expiry.

MW-AUTH-005
Replicated endpoint classified as authority without Decision.

MW-AUTH-006
Historical source used outside its effective period.

MW-AUTH-007
Fallback output violates target value domain.

MW-AUTH-008
Source precedence is undefined for overlapping paths.

MW-AUTH-009
Observed fallback usage exceeds approved scope.

MW-AUTH-010
Rejected source remains connected through an active Mapping.

MW-AUTH-011
Authority transition lacks dual-running or cutover policy.

MW-AUTH-012
Fallback records cannot be identified for reconciliation.
```

These diagnostics should create Findings or validation results.

They should not rewire the model automatically.

---

# Worked example: Customer Group

## Business Attribute

```text
ATTR-CUSTOMER-GROUP
```

## Context

```text
Entity:
Customer Sales Area
```

## Available sources

```text
Global Customer Reference:
Customer Group

ERP_A:
Customer Group replica

CRM:
Customer Segment

Manual workbook:
Customer Group assignment
```

## Approved policy

```text
Primary authority:
Global Customer Reference

Migration extraction source:
ERP_A replica

Enrichment input:
CRM Segment

Fallback:
Manual assignment when the global value is absent

Prohibited:
Direct CRM Segment to Customer Group conversion
```

## Lineage

```text
Global Customer Reference
→ replicated to ERP_A
→ extracted for migration
→ Customer Group
→ KNVV-KDGRP
```

Alternative path:

```text
Global value absent
+
CRM Segment
+
Sales Area
+
manual business review
→ approved Customer Group
→ KNVV-KDGRP
```

The trace remains clear because every source has a different role.

---

# Worked example: Supplier Risk

## Inputs

```text
External Risk Score
Supplier Category
Compliance Status
Manual Approval
```

No source contains final Supplier Risk directly.

## Authority model

```text
Authoritative inputs:
External Risk Score
Supplier Category
Compliance Status

Authoritative derivation:
RULE-SUPPLIER-RISK-DERIVATION

Authoritative output store:
SAP MDG
```

## Fallback

When external score is unavailable:

```text
manual compliance assessment
→ provisional Supplier Risk
```

Policy:

- valid for 30 days;
- requires owner approval;
- must be reconciled when external score returns;
- cannot produce `LOW` without supporting evidence.

The Rule and Decision, rather than one input system, establish authority for the derived Attribute.

---

# Worked example: Tax Identifier

## Preferred source

```text
National legal registry
```

## System of entry

```text
Supplier portal
```

## Operational master

```text
SAP MDG
```

## Fallback

```text
Verified legal document
+
manual steward entry
```

## Invalid fallback

```text
Legacy ERP tax number copied without evidence
```

This shows why “source of truth” is too imprecise.

Several systems participate in different roles.

---

# Worked example: temporary default

## Attribute

```text
ATTR-CUSTOMER-GROUP
```

## Default

```text
STANDARD
```

## Policy

```text
Allowed:
Mock Load 2 only

Population:
records without global Customer Group

Owner:
Customer Data Lead

Requirement:
records marked for enrichment

Expiry:
before Mock Load 3
```

## Health result after expiry

```text
210 records still use expired default.

Readiness:
blocked
```

The default was a controlled fallback.

It did not silently become the authoritative value.

---

# A practical modelling workflow

## Step 1: Define the Attribute and context

Clarify meaning, Entity, grain and applicability.

## Step 2: Inventory available source endpoints

Include direct, replicated, manual and external sources.

## Step 3: Classify source roles

Authority, entry, replica, enrichment, fallback, historical, candidate or rejected.

## Step 4: Define the preferred path

Identify normal source, Mapping, context and target.

## Step 5: Define fallback triggers

State when each alternative may activate.

## Step 6: Define priority and conflict policy

Specify how overlapping values are resolved.

## Step 7: Add effective periods

Record transition and expiry.

## Step 8: Connect Decisions and Rules

Make authority reviewable and enforceable.

## Step 9: Attach observed Evidence

Dataset profiles, reconciliation and fallback usage.

## Step 10: Validate coverage and ambiguity

Check every active context.

---

# Impact analysis for authority changes

Changing source authority can affect:

- source extracts;
- Mappings;
- datasets;
- ownership;
- Rules;
- reconciliation;
- interfaces;
- historical interpretation;
- operational procedures.

An authority change should therefore be treated as a material model change even if the target SAP field remains unchanged.

Example:

```text
Authority:
ERP_A → Global Customer Hub

Target:
KNVV-KDGRP unchanged
```

The physical target is stable.

The upstream governance and operational blast radius may be large.

---

# Authority change versus source replacement

A system can be replaced without changing authority.

Example:

```text
Global Customer Reference v1
→ Global Customer Reference v2
```

The same organisation, semantics and governance continue.

Only implementation changes.

Conversely, authority can change without replacing the physical field.

Example:

```text
ERP_A field remains available,
but MDG becomes authoritative.
```

The system still exists.

Its role changed.

These transitions should be modelled separately.

---

# Reporting source policy

A useful report for one Attribute might show:

```text
Attribute:
Customer Group

Context:
Customer Sales Area

Authoritative source:
Global Customer Reference

System of entry:
Customer Hub

Migration extraction:
ERP_A replica

Fallback:
Manual enrichment

Fallback trigger:
authoritative value absent

Fallback expiry:
Wave 2 cutover

Rejected source:
CRM Segment direct mapping

Observed fallback usage:
1.5%

Open conflicts:
27 records
```

This is far more useful than showing four incoming arrows.

---

# What Martenweave should implement next

Martenweave already has:

- canonical Attributes and Mappings;
- Rules, Evidence and Decisions;
- system-lineage objects;
- deterministic validation;
- trace and impact;
- dataset profiling;
- proposal-first changes.

The next focused vertical slice should add **source-role and fallback-policy validation**.

## Goal

Make every active source path for a critical Attribute unambiguous.

## Scope

Support source roles:

- authoritative;
- system of entry;
- replicated;
- enrichment;
- fallback;
- historical;
- candidate;
- rejected.

Support fallback properties:

- trigger;
- priority;
- scope;
- effective period;
- expiry;
- reconciliation requirement.

## Acceptance criteria

For Customer Group, the system must distinguish:

```text
Global source:
authoritative

ERP copy:
replicated migration extraction

CRM Segment:
enrichment input

Manual workbook:
fallback

Direct CRM Mapping:
rejected
```

Validation must detect:

1. overlapping authority without conflict policy;
2. missing source coverage;
3. fallback without trigger;
4. expired fallback;
5. replicated copy incorrectly labelled authoritative;
6. rejected source used by active Mapping;
7. fallback output outside the target value domain;
8. observed fallback usage outside approved scope.

## Existing validation

```bash
martenweave validate --repo examples/customer_bp_model
```

## Existing trace and impact

```bash
martenweave trace \
  ATTR-CUST-SALES-CUSTOMER-GROUP \
  --repo examples/customer_bp_model

martenweave impact \
  FEP-S4-KNVV-KDGRP \
  --repo examples/customer_bp_model
```

## Future focused report

```bash
martenweave source-policy \
  ATTR-CUST-SALES-CUSTOMER-GROUP \
  --repo examples/customer_bp_model
```

The final command describes a recommended product direction rather than current documented CLI behaviour.

---

# Final perspective

Most enterprise Attributes have more than one technically possible source.

That is not the problem.

The problem is when the model cannot explain why one path should be used instead of another.

A useful source model distinguishes:

```text
meaning authority
system of entry
operational master
migration extraction source
replicated copy
enrichment input
fallback
historical source
rejected source
```

A useful fallback model adds:

```text
trigger
scope
priority
approval
expiry
reconciliation
```

The practical test is:

> For every critical Attribute and context, can the programme identify the preferred authoritative path, explain each permitted fallback, resolve conflicts deterministically and identify every record produced through an exceptional path?

When the answer is yes, multiple sources can coexist without ambiguous lineage.

When the answer is:

> We take the value from whichever system has it,

the programme does not have a source-authority model.

It has an undocumented selection algorithm.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects business Attributes, source and target endpoints, Mappings, Rules, Decisions and observed Evidence so that source selection can be reviewed as governance rather than hidden inside transformation code.

The objective is not to force every Attribute into one physical system of truth.

It is to make authority, derivation and fallback explicit enough that multiple systems can participate without producing contradictory model paths.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave Core currently represents generic model objects including Domains, Entities, Attributes, datasets, Mappings, Rules, Evidence, Decisions and change proposals. It treats canonical files as the source of truth, validates references deterministically and generates disposable indexes for gaps, lineage and impact analysis.

The current Martenweave workflow imports or profiles evidence, validates the canonical repository, builds generated indexes, detects gaps, runs lineage and impact analysis and routes proposed changes through human review.

OpenLineage’s current object model distinguishes runtime `RunEvent` observations from design-time `JobEvent` and `DatasetEvent` metadata. It models how datasets are created and transformed rather than merely recording that relationships exist.

The W3C PROV Ontology provides a general framework for representing and exchanging provenance information across different systems and contexts. Its Entity, Activity and Agent concepts are useful for modelling where information came from and which processes or actors influenced it, although source authority remains an additional governance decision.

The source-role taxonomy, fallback-policy fields, diagnostics and proposed `source-policy` command in this article describe recommended Martenweave improvements. They should not be interpreted as guarantees of the exact current canonical schema or CLI unless separately implemented and published.

Martenweave is independent and is not affiliated with or endorsed by SAP, OpenLineage or W3C.
