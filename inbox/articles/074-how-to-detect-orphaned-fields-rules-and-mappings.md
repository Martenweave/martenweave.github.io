# How to Detect Orphaned Fields, Rules and Mappings

**Reviewed: 14 July 2026**

A repository validates successfully.

Every file has a valid ID.

Every declared reference resolves.

The generated index builds.

Search works.

No schema error appears.

The team concludes that the model is healthy.

Then someone asks what an old Mapping does.

It points from a legacy field to a valid business Attribute. The source system was retired two years ago. No active dataset uses the Mapping. No current migration wave references it. The last supporting evidence belongs to an obsolete test cycle.

The Mapping is structurally valid.

It is operationally orphaned.

Elsewhere, a Rule requires an Attribute before activation. The Attribute was moved to another Entity, but the Rule’s applicability was never updated. Its references resolve, yet it no longer governs a coherent population.

A custom SAP FieldEndpoint exists in the model. It is not connected to a business Attribute, active Mapping, interface or historical retirement decision. Nobody knows whether it is:

- still used;
- awaiting documentation;
- replaced;
- abandoned;
- incorrectly imported.

Again, the object is valid.

Again, it is not healthy.

> Reference integrity proves that declared connections are not broken. It does not prove that the object participates in a meaningful, current and governed model path.

Orphan detection must therefore look beyond missing references.

It must identify objects that have become:

- disconnected;
- one-sided;
- semantically stranded;
- inactive without retirement;
- unsupported by evidence;
- unreachable from the model’s operational entry points.

Martenweave already validates object IDs, types, references and domain context before building its generated indexes. It then uses the resulting model for gaps, lineage and impact analysis.

That is the correct foundation.

Orphan detection is the next layer:

```text
structurally valid
→ graph connected
→ semantically purposeful
→ operationally current
→ historically explainable
```

---

# An orphan is not simply an object with zero edges

The simplest graph definition would be:

> An orphan is a node with no relationships.

That catches obvious cases.

It misses most real enterprise-model problems.

Consider a Mapping:

```text
FEP-LEGACY-CUSTOMER-CLASS
→ MAP-LEGACY-CLASS-TO-CUSTOMER-GROUP
→ ATTR-CUSTOMER-GROUP
```

The Mapping has incoming and outgoing edges.

It is not graph-isolated.

But suppose:

- the legacy endpoint is retired;
- the Mapping status remains `approved`;
- no active dataset contains the source field;
- a newer Mapping now covers the same population;
- no historical applicability is recorded.

The Mapping is connected and still orphaned from the active operating model.

A better definition is:

> An orphan is an object whose declared role cannot be reached from, or justified by, an appropriate active, historical or governance context.

That context varies by object type.

A FieldEndpoint needs different justification from a Rule.

A Rule needs different justification from Evidence.

A Mapping needs both a meaningful source path and a meaningful target path.

---

# Six forms of orphaning

Orphaning is easier to detect when divided into specific failure modes.

## Isolated orphan

The object has no meaningful incoming or outgoing relationships.

Example:

```text
FEP-S4-ZZ-OLD-CLASSIFICATION
```

with no Attribute, Mapping, interface, Decision or retirement record.

## Source orphan

A transformation object has no usable upstream source.

Example:

```text
MAP-CUSTOMER-GROUP-ENRICHMENT
→ ATTR-CUSTOMER-GROUP
```

but its source FieldEndpoint was deleted or retired without replacement.

## Target orphan

A Mapping or Rule has no active governed target.

Example:

```text
MAP-LEGACY-RISK-CONVERSION
```

still references an Attribute that exists only as a historical tombstone.

## Governance orphan

An operational object has no accountable owner, Decision or approved purpose where one is required.

Example:

```text
RULE-SUPPLIER-RISK-DEFAULT
```

is active but no approved Decision explains why defaulting is allowed.

## Temporal orphan

An object remains active after its effective scope ended.

Example:

```text
MAP-WAVE2-TEMPORARY-CUSTOMER-GROUP
```

has no `effective_to`, despite Wave 2 being complete.

## Evidence orphan

Evidence exists but supports no current Finding, Decision, Rule, Mapping or release assertion.

The file may still be valuable historically. Its purpose is no longer represented.

These categories should produce different warnings and remediation actions.

---

# Start with the expected role of each object type

Orphan detection cannot use one universal degree rule.

The system must know what a healthy object normally connects to.

## Attribute

A healthy active Attribute usually belongs to:

- an Entity;
- a Domain;
- at least one owner;
- one or more physical implementations, Mappings, Rules or explicit conceptual-use declarations.

An Attribute may be valid without a current SAP endpoint if it represents:

- future model scope;
- non-SAP semantics;
- a concept under design.

That exception should be explicit.

## FieldEndpoint

A healthy active FieldEndpoint usually participates in at least one of:

- Mapping;
- business Attribute implementation;
- interface;
- dataset expectation;
- lineage path;
- historical replacement chain.

A physical field registered only because it exists in SAP is not automatically a governed model object.

## Mapping

A healthy active Mapping normally needs:

- at least one source;
- one target Attribute or endpoint;
- transformation classification;
- applicability;
- current or historical purpose.

## Rule

A healthy Rule needs:

- governed subject;
- applicability;
- lifecycle or evaluation context;
- accountable authority;
- implementation or declared design status.

## Evidence

Evidence should support a claim:

- Finding;
- Decision;
- Mapping;
- Rule;
- test result;
- release assertion.

## Decision

A Decision should affect or explain one or more model objects, rejected alternatives or governance states.

A Decision with no consequences is probably incomplete, incorrectly linked or purely narrative material outside the registry’s scope.

---

# Hard orphans and soft orphans

Not every orphan warning should block validation.

A useful policy separates hard and soft cases.

## Hard orphan

The object cannot fulfil its declared role.

Examples:

- active Mapping without a source;
- active Mapping without a target;
- Rule referencing no governed subject;
- replacement reference pointing nowhere;
- active FieldEndpoint attached only to retired objects;
- approved proposal whose target object no longer exists.

These should usually be errors.

## Soft orphan

The object may be legitimate, but its purpose is unclear or weakly supported.

Examples:

- Attribute with no implementation;
- Evidence not used for twelve months;
- Rule with no implementation reference;
- FieldEndpoint discovered from metadata but not yet classified;
- historical Mapping missing explicit effective dates.

These should usually be warnings requiring review.

The distinction prevents two bad outcomes:

- allowing unusable model paths;
- blocking legitimate early-stage modelling.

---

# Referential validity is only the first gate

Suppose this Mapping resolves correctly:

```yaml
id: MAP-OLD-CUSTOMER-CLASS
type: Mapping
source:
  - FEP-ERP-A-CUSTOMER-CLASS
target:
  - ATTR-CUSTOMER-GROUP
status: approved
```

Basic validation confirms:

- source ID exists;
- target ID exists;
- types are permitted.

Orphan analysis must ask more:

- Is the source endpoint active?
- Does it belong to an active system?
- Does the Mapping apply to a current population?
- Is another Mapping now authoritative?
- Is the target Attribute still active?
- Does the Mapping produce a valid value?
- Is supporting Evidence current enough for its declared status?
- Is the Mapping reachable from a current migration or operational scenario?

A reference can resolve and still lead into a dead branch.

---

# Reachability from operational roots

One useful technique is to define model entry points, or roots.

Possible roots include:

- active business Domains;
- active Entities;
- approved critical Attributes;
- active source systems;
- active SAP target systems;
- current migration waves;
- production interfaces;
- open Findings and proposals;
- named model baselines.

An object is suspicious when it cannot be reached from any appropriate root through permitted edge types.

Example:

```text
Current migration wave
→ expected dataset
→ DatasetField
→ Mapping
→ Attribute
→ SAP FieldEndpoint
```

A Mapping outside every current or historical path may be orphaned.

However, reachability must be baseline- and status-aware.

An old Mapping may be unreachable from the current baseline but reachable from:

```text
historical baseline:
CUSTOMER-WAVE2-APPROVED
```

That is not an orphan.

It is historical lineage.

---

# Active graph and historical graph

A model registry should not use one undifferentiated graph for orphan detection.

Use at least two views.

## Active graph

Includes objects currently applicable or approved for a selected baseline and context.

Used to detect:

- dead active paths;
- unused fields;
- missing targets;
- duplicate active Mappings.

## Historical graph

Includes retired, superseded and expired objects with their previous relationships.

Used to verify:

- historical interpretability;
- replacement chains;
- old evidence;
- previous migration waves.

An object can be absent from the active graph and healthy in the historical graph.

The problem is not retirement.

The problem is unrecorded disappearance.

---

# FieldEndpoint orphans

Physical fields are frequently imported in bulk from SAP metadata, interface definitions or source schemas.

This creates a large population of technically real but semantically unclassified fields.

A FieldEndpoint can be in several states.

## Governed endpoint

Connected to a business Attribute, Mapping, Rule or interface.

## Discovered endpoint

Known to exist physically but not yet assessed.

## Ignored endpoint

Reviewed and intentionally outside governance scope.

## Historical endpoint

Retired but retained for lineage.

## Orphaned endpoint

Declared active or governed, but with no meaningful path.

These states must be distinguished.

Otherwise, every unmodelled SAP field looks like a defect—or every imported field looks governed.

---

# A field without a business Attribute

Consider:

```text
FEP-S4-ZZ-SUPPLIER-CATEGORY
```

It may be connected to an interface but not to any business Attribute.

Possible explanations:

1. the Attribute was never modelled;
2. the field is purely technical;
3. the field carries an obsolete concept;
4. the interface connection is wrong;
5. the endpoint was imported speculatively.

The orphan detector should not automatically create an Attribute.

It should emit a Finding:

```text
Physical endpoint has operational usage
but no governed business meaning.
```

Suggested review:

- link to an existing Attribute;
- create a candidate Attribute;
- mark as technical-only;
- retire;
- exclude from managed scope.

---

# A field with a business Attribute but no implementation path

The reverse can also occur.

```text
ATTR-SUPPLIER-REVIEW-STATUS
→ implemented_by
FEP-S4-ZZ-REVIEW-STATUS
```

but no Mapping populates the field, no interface creates it and no manual procedure is recorded.

The relationship says where the concept belongs.

It does not explain how the value arrives.

This may be a design-stage object.

If its status is `approved` or `operational`, the missing population path is a meaningful gap.

The warning should be specific:

```text
Approved Attribute has target implementation
but no active source or creation path.
```

---

# Duplicate endpoint orphans

A custom field may be replaced by a standard field.

Both remain connected:

```text
ATTR-SUPPLIER-REVIEW-STATUS
├── FEP-S4-ZZ-REVIEW-STATUS
└── FEP-S4-STANDARD-REVIEW-STATUS
```

If neither endpoint has a clear status or effective period, the graph cannot explain which one is current.

One may be functionally orphaned even though it remains connected.

Detect:

- multiple active endpoints for a single-role implementation;
- no source Mapping to one endpoint;
- no Decision authorising coexistence;
- no transition dates.

The warning is not “duplicate field.”

It is:

> Competing implementations exist without an explicit transition model.

---

# Rule orphans

Rules become orphaned in several ways.

## Subject orphan

The Rule no longer governs an active Attribute, Entity, Relationship or process state.

## Applicability orphan

The Rule refers to a context that no longer exists.

Example:

```text
applies_to:
  migration_wave: WAVE-2
```

while status remains active.

## Implementation orphan

The Rule is approved and required, but no implementation or operating procedure is known.

## Evidence orphan

The Rule’s supporting evidence is obsolete, missing or tied only to an earlier definition.

## Exception orphan

An exception exists, but its parent Rule was retired or changed.

## Authority orphan

The Rule remains active without an accountable owner or Decision.

These conditions require different responses.

---

# A Rule with no implementation is not always invalid

The Rule may be:

- business policy awaiting implementation;
- migration-only validation;
- manually enforced;
- used to evaluate readiness rather than SAP runtime behaviour.

Therefore, the Rule needs an explicit implementation status:

```text
design_only
planned
implemented
manual_control
migration_control
retired
```

A Rule marked `implemented` with no implementation reference is suspicious.

A Rule marked `design_only` is not.

The orphan check must respect lifecycle.

---

# Rule references hidden in prose

Some Rules are referenced only in Markdown descriptions, tickets or code comments.

A deterministic graph may not see them.

AI or text search can identify candidate references:

```text
“Customer Group must be present before activation”
```

may refer to:

```text
RULE-CUSTOMER-GROUP-REQUIRED
```

These should be presented as possible links.

They should not be accepted automatically.

The safe process remains:

```text
candidate reference
→ human review
→ canonical relationship
```

---

# Contradictory Rule orphans

A Rule may remain connected but become logically redundant or contradictory.

Example:

```text
RULE-A:
Customer Group required before activation.

RULE-B:
Customer Group may be blank for all migrated customers.
```

If the temporary exception period has ended, Rule B is no longer a valid active control.

It is semantically orphaned from current governance even though both Rules reference the same Attribute.

Orphan analysis should therefore consider:

- supersession;
- effective dates;
- exception hierarchy;
- Decision precedence.

This is more than graph degree.

---

# Mapping orphans

Mappings are especially prone to orphaning because migration programmes create them rapidly and retire them unevenly.

Common cases include:

- source endpoint removed;
- target replaced;
- population moved to another Mapping;
- temporary default retained after source remediation;
- manual Mapping superseded by automation;
- code conversion table retired;
- local Mapping absorbed into the global model;
- Mapping created for a dataset that never arrived.

A healthy Mapping needs an explainable role in at least one active or historical path.

---

# One-sided Mapping

An active Mapping with only a source is incomplete:

```text
FEP-CRM-SEGMENT
→ MAP-CUSTOMER-GROUP
→ ?
```

An active Mapping with only a target is equally incomplete:

```text
?
→ MAP-CUSTOMER-GROUP
→ ATTR-CUSTOMER-GROUP
```

These are hard orphans unless explicitly represented as:

- Finding;
- incomplete proposal;
- design placeholder.

Canonical approved Mappings should not remain one-sided.

---

# Mapping with retired source

Suppose:

```text
FEP-ERP-A-CUSTOMER-CLASS
status: retired
```

but:

```text
MAP-ERP-A-CUSTOMER-GROUP
status: approved
```

The Mapping may remain legitimate historically.

It should not remain active without:

- historical applicability;
- replacement source;
- transition status.

The detector should suggest:

- retire Mapping;
- mark historical;
- redirect source;
- document dual-running period.

---

# Mapping with no reachable target consumer

A Mapping may populate an active Attribute that has:

- no SAP endpoint;
- no interface;
- no Rule;
- no report;
- no declared conceptual use.

This does not prove the Mapping is useless.

The Attribute may be part of a future-state model.

But if both are marked operational, the path ends without a consumer.

The warning should ask:

> What uses the mapped result?

This is a target-side orphan condition.

---

# Shadow Mapping

A new Mapping may fully supersede an old one, but the old Mapping remains active.

Example:

```text
MAP-CRM-SEGMENT-DIRECT
MAP-CUSTOMER-GROUP-ENRICHMENT
```

Both feed Customer Group for the same population.

Possible consequences:

- duplicate production logic;
- ambiguous source precedence;
- different values in separate implementations;
- inconsistent readiness results.

Detect overlapping applicability.

An orphaned Mapping is not always unused.

It may be dangerously still usable.

---

# Value-output orphan

A Mapping can remain structurally connected while producing no valid target value.

Example:

```text
Mapping output:
01

Current value list:
STANDARD
STRATEGIC
```

The Mapping references the Attribute correctly.

Its output is outside the current value domain.

This is a semantic orphan.

Candidate-state validation should report:

```text
Mapping output no longer belongs to target value list.
```

---

# Evidence orphans

Evidence is often accumulated faster than it is curated.

Typical orphan cases include:

- profile report with no linked Finding;
- screenshot supporting a Decision that was never recorded;
- test report tied to a retired Mapping;
- duplicate evidence imported from several folders;
- dataset sample whose source system is unknown;
- validation report from an unidentified model baseline.

Evidence should not be deleted merely because it is old.

It should be classified.

---

# Evidence needs a supported claim

A healthy Evidence object should say what it supports.

Examples:

```text
supports source availability
verifies Mapping result
demonstrates Rule behaviour
justifies Decision
confirms implementation drift
```

A generic attachment link is weaker:

```text
related evidence
```

Without claim-level context, evidence may remain connected but unusable.

The receiving team cannot determine why it matters.

---

# Baseline-less evidence

A validation report states that Customer Group completeness was 98%.

Without:

- dataset identity;
- model baseline;
- Rule version;
- execution date;
- scope;

the result is difficult to interpret.

The Evidence object is not graph-isolated.

It is context-orphaned.

Detect missing provenance fields for evidence types that require them.

---

# Decision orphans

A Decision can be orphaned when:

- no object reflects its conclusion;
- all affected objects were removed without supersession;
- the Decision was replaced but not marked superseded;
- implementation contradicts it;
- the Decision records discussion but no outcome;
- its evidence is inaccessible.

A Decision does not need to remain active forever.

It needs to remain historically interpretable.

---

# Decision with no consequence

Example:

```text
DEC-CUSTOMER-GROUP-SOURCE-017

Conclusion:
Direct CRM equivalence is rejected.
```

But the current graph contains:

```text
CRM Segment
→ direct Mapping
→ Customer Group
```

The Decision is linked to the Attribute but has no effect on the Mapping.

Possible explanations:

- implementation drift;
- missing relationship;
- Decision outdated;
- Mapping wrongly approved.

This is not a normal orphan.

It is a governance contradiction.

The health check should escalate it above a simple missing-link warning.

---

# PatchProposal orphans

Proposals become stale when:

- target objects changed;
- baseline advanced;
- referenced Findings closed;
- another proposal implemented the same change;
- candidate IDs were used elsewhere;
- affected Mappings were retired.

A proposal can remain syntactically valid while being unsafe to apply.

Detect:

- base commit no longer current;
- expected previous values no longer match;
- target object missing;
- proposal superseded;
- impact graph materially changed.

The response should be:

```text
rebase
refresh impact
supersede
reject
```

not silent application.

---

# Orphans caused by file deletion

Deleting a canonical file should not be treated as an ordinary repository cleanup when the object has dependants.

Basic validation catches explicit references pointing to the missing ID.

It may not catch:

- prose references;
- external issue links;
- generated reports;
- legacy IDs;
- archived evidence;
- code or interfaces outside the repository.

Deletion should therefore trigger an impact check before merge.

Safer lifecycle:

```text
active
→ deprecated
→ retired
→ tombstone retained
```

rather than immediate disappearance.

---

# Orphans caused by renaming IDs

Changing an object ID can create apparent new and deleted objects.

References inside the repository may be updated.

External references may not.

Potential orphans include:

- issue links;
- stored report IDs;
- package manifests;
- old proposals;
- external catalog mappings;
- agent prompts;
- interface metadata.

Stable IDs should normally survive label and path changes.

When ID migration is unavoidable, preserve:

- legacy ID;
- redirect;
- migration Decision;
- reserved historical identity.

---

# Orphans caused by system retirement

A source system is decommissioned.

Its endpoints, Mappings and Evidence remain.

Do not delete the entire branch blindly.

Classify each object:

## Historical lineage

Needed to interpret records migrated from the system.

## Active transition dependency

Needed until all waves complete.

## Replaced implementation

Should point to the new source.

## Truly obsolete material

May be archived or retired after review.

System retirement is a model transition, not a directory-deletion task.

---

# Orphans caused by SAP upgrades

An SAP release may replace:

- a custom field;
- an interface property;
- an API;
- a validation implementation;
- a value list.

The old objects may remain connected to the business Attribute.

Orphan checks should detect:

- endpoint no longer present in target release;
- active Mapping still targets old endpoint;
- new endpoint has no Mapping;
- Rule implementation references retired technology;
- old interface remains the only downstream consumer.

The product release is external evidence.

The organisation still needs a Decision about model transition.

---

# Zero degree is useful, but not enough

A basic graph-health report should still include:

```text
objects with zero incoming edges
objects with zero outgoing edges
objects with no edges
```

These lists are useful discovery tools.

They must be interpreted by type.

Examples:

- a Domain may legitimately have no incoming edges;
- a terminal Evidence object may have no outgoing edges;
- a target FieldEndpoint may have no outgoing edges if downstream scope is excluded;
- an active Mapping with no incoming source edge is probably invalid.

The same graph statistic means different things for different objects.

---

# In-degree and out-degree policies

A type-aware policy might include:

| Object type | Expected incoming | Expected outgoing |
|---|---|---|
| Attribute | Entity or Domain context | Mapping, Rule, endpoint or declared conceptual use |
| FieldEndpoint | System or dataset context | Mapping, Attribute or interface |
| Mapping | Source input | Attribute, endpoint or another transformation |
| Rule | Decision or authority optional | Governed object or implementation |
| Evidence | Source metadata | Finding, Decision, Rule or Mapping claim |
| Decision | Evidence or Finding | affected object or superseded Decision |

These are not universal cardinalities.

They are health expectations.

The schema should distinguish required structural references from recommended governance relationships.

---

# Strongly connected components are not automatically healthy

A cluster of objects may be internally connected and still isolated from the rest of the model.

Example:

```text
old source endpoint
↔ old Mapping
↔ old Attribute alias
↔ old evidence
```

The cluster has several edges.

It is unreachable from any active Domain, current baseline, migration wave or historical manifest.

This is an orphaned subgraph.

Graph analysis should therefore detect disconnected components, not only individual zero-degree nodes.

Each component should be classified:

- active model component;
- historical component;
- proposal component;
- imported unclassified component;
- orphaned component.

---

# Cycles can expose modelling defects

Some cycles are legitimate:

```text
Decision
→ authorises Mapping
→ affected by Decision
```

Others may indicate confused semantics.

Example:

```text
Mapping A derives Attribute B
Mapping B derives Attribute A
```

without a base source.

Both Mappings have sources and targets.

Together they form a closed derivation cycle with no external input.

This is a source-orphaned component.

Another example:

```text
Rule A depends on value created only if Rule A passes.
```

Cycle analysis can reveal model paths that are connected but impossible to initialise.

---

# Reachability must use typed paths

An Attribute should not be considered operationally connected merely because it links to Evidence.

Example:

```text
ATTR-OLD-CUSTOMER-CLASS
→ EVID-WAVE1-SCREENSHOT
```

The Attribute has an edge.

It has no implementation, Mapping, Rule, active consumer or historical retirement record.

Different health questions require different permitted paths.

## Operational reachability

Uses:

- source;
- Mapping;
- Attribute;
- target;
- interface;
- dataset.

## Governance reachability

Uses:

- Finding;
- Evidence;
- Decision;
- owner;
- proposal.

## Historical reachability

Uses:

- supersedes;
- replaced_by;
- baseline;
- effective period.

An object should be assessed against the path types relevant to its status.

---

# Criticality changes the response

An orphaned optional documentation object may be low priority.

An orphaned mandatory SAP field is not.

Prioritisation factors include:

- business criticality;
- mandatory status;
- data sensitivity;
- migration-wave proximity;
- production usage;
- number of records;
- downstream consumers;
- legal relevance;
- unresolved age;
- availability of replacement.

A health report should separate detection from priority.

---

# Age alone does not prove orphaning

A Mapping unchanged for five years may be stable and correct.

Evidence created yesterday may already be irrelevant if it came from the wrong dataset.

Use age as a signal, not a verdict.

Better questions include:

- Is the object still reachable?
- Is its effective period current?
- Does runtime evidence still support it?
- Is its source system active?
- Has it been superseded?
- Does an owner still accept responsibility?

---

# Runtime evidence can reduce false positives

A Mapping appears unreachable from current declared migration datasets.

Runtime evidence shows that an active integration still executes it.

Possible conclusions:

- canonical dataset relationships are incomplete;
- Mapping is operational outside the migration scope;
- runtime metadata is misclassified;
- Mapping should not be retired.

OpenLineage’s object model separates declared Dataset and Job metadata from individual runtime Runs, while column-level lineage describes how input fields contribute to outputs. This separation supports comparing intended paths with observed execution rather than treating either one as the sole truth.

Martenweave can use runtime evidence to challenge orphan findings.

It should not let runtime execution silently approve an undocumented model path.

---

# Orphan versus intentionally unused

Some objects are deliberately dormant.

Examples:

- future-state Attribute;
- optional domain pack object;
- source endpoint discovered for later assessment;
- archived historical Decision;
- reusable Rule template;
- candidate Mapping under review.

These should carry explicit states.

```text
planned
discovered
template
historical
candidate
excluded
```

Without such states, the health engine cannot distinguish intentional dormancy from neglect.

---

# Orphan versus out of scope

A FieldEndpoint may exist in SAP but lie outside the current project scope.

The correct representation is not necessarily to delete it.

It may be marked:

```text
scope_status: excluded
reason: not part of Customer migration
```

An out-of-scope object should not count against current lineage completeness.

It should remain searchable when useful.

This avoids inflating the repository with false gaps or hiding known landscape context.

---

# Orphan versus placeholder

Placeholders are acceptable during early modelling when they are visible.

Example:

```text
ATTR-CUSTOMER-CREDIT-SEGMENT
status: draft
implementation: unresolved
```

The health report can say:

```text
Draft Attribute has no implementation path.
Expected for current status.
```

A placeholder becomes problematic when it remains:

- approved;
- operational;
- required;
- release-scoped;

without the missing relationships being resolved.

---

# Orphan remediation is a governed change

Detection should not trigger automatic deletion.

Possible remediation actions include:

- connect to existing object;
- add missing source or target;
- classify as technical-only;
- mark out of scope;
- deprecate;
- retire;
- create replacement relationship;
- add effective period;
- attach Decision;
- reopen investigation;
- promote finding to proposal.

The selected action can affect history and downstream analysis.

AI may suggest it.

Humans should approve it.

---

# Create Findings before creating replacements

Suppose an active FieldEndpoint has no business Attribute.

An AI system might generate:

```text
ATTR-ZZ-SUPPLIER-CATEGORY
```

based on the field name.

That can create a false business concept.

A safer response is:

```text
FIND-UNCLASSIFIED-SUPPLIER-CATEGORY-ENDPOINT
```

The Finding records:

- endpoint;
- observed usage;
- possible meanings;
- owners;
- evidence;
- next decision.

Only after review should the system create or link an Attribute.

---

# Automated retirement is unsafe

An object with no current incoming edges may still be:

- referenced externally;
- used in production;
- needed historically;
- temporarily disconnected during a proposal;
- deliberately terminal.

Automatic retirement risks destroying traceability.

The product can generate a retirement proposal:

```text
candidate:
retire MAP-ERP-A-CUSTOMER-GROUP

reason:
source retired
no active population
superseded by MAP-CUSTOMER-GROUP-ENRICHMENT
```

Validators check the candidate state.

Humans decide.

---

# Orphan findings need suppression with reasons

Some warnings will be accepted.

Example:

```text
FEP-S4-TECHNICAL-LOAD-TIMESTAMP
```

has no business Attribute because it is purely technical.

The team should be able to suppress the warning with structured justification:

```yaml
orphan_check:
  excluded: true
  reason: technical audit field
  reviewed_by: ROLE-SAP-TECHNICAL-OWNER
```

A suppression should be:

- explicit;
- reviewable;
- baseline-aware;
- optionally expiring.

Do not hide exceptions in global configuration without object-level explanation.

---

# Orphan debt

Repositories accumulate orphan debt over time.

A useful scorecard can report:

```text
Active hard orphans:
3

Active soft orphans:
17

Historical-context gaps:
6

Unclassified imported endpoints:
84

Stale proposals:
4

Accepted suppressions:
12
```

Trends matter:

- Are hard orphans increasing?
- Is imported metadata being classified?
- Are temporary objects being retired?
- Are stale proposals being closed?

One percentage cannot express this adequately.

---

# A Rule-orphan example

## Current object

```text
RULE-CUSTOMER-GROUP-CREATION
```

It states:

```text
Customer Group is required at Customer creation.
```

## Current model

Customer Group now belongs to Customer Sales Area and is required before Sales Area activation.

## References

The Rule still points to the Attribute.

Basic validation passes.

## Orphan analysis

The Rule’s lifecycle and Entity context no longer match the Attribute.

Classification:

```text
semantic applicability orphan
```

Recommended action:

- supersede with the activation Rule;
- retain historical link;
- review implementation controls;
- preserve previous test Evidence as historical.

---

# A Mapping-orphan example

## Current object

```text
MAP-CRM-SEGMENT-DIRECT
```

## Current model

Direct equivalence was rejected. Customer Group now uses contextual enrichment.

## Graph state

The Mapping still has:

- valid source;
- valid Attribute target;
- approved status.

## Governance state

A newer Decision rejects its semantics.

## Classification

```text
governance-conflicted Mapping
```

This is more serious than an unused object because it remains a plausible active path.

Recommended action:

- retire or mark historical;
- link superseding Mapping;
- preserve the rejecting Decision;
- verify no runtime implementation still uses it.

---

# A FieldEndpoint-orphan example

## Current object

```text
FEP-S4-ZZ-REVIEW-STATUS
```

## Current model

A standard endpoint replaced the custom field.

## Remaining links

- old mock-load Evidence;
- historical Decision;
- no active Mapping;
- no active interface.

## Classification

Not an active orphan if status is historical and replacement is explicit.

It becomes an orphan when:

- status remains active;
- no replacement is recorded;
- users cannot tell whether the field should still be used.

---

# An Evidence-orphan example

## Evidence

```text
EVID-CUSTOMER-GROUP-PROFILE-2025-04
```

## Content

Profile of a dataset from ERP_A.

## Current state

ERP_A has been retired.

The Evidence is not linked to:

- historical baseline;
- Decision;
- Finding;
- retired Mapping.

## Classification

```text
historical-context orphan
```

Recommended action:

- link to Wave 2 baseline and retired Mapping;
- record dataset identity;
- or archive outside canonical scope if no governed claim depends on it.

---

# Detection workflow

A practical health run can use the following sequence.

## 1. Validate structure

Check IDs, types and explicit references.

## 2. Build status-aware graph

Separate active, draft, historical, candidate and excluded objects.

## 3. Apply type-specific degree checks

Find zero-sided and one-sided objects according to expected roles.

## 4. Calculate root reachability

Test active operational and governance paths.

## 5. Detect disconnected components

Classify components by baseline and purpose.

## 6. Check lifecycle compatibility

Find active objects connected only to retired or expired objects.

## 7. Check semantic compatibility

Detect Mapping outputs outside value lists, Rules on incompatible Entities and contradictory Decisions.

## 8. Check provenance

Find Evidence and reports without baseline, source or supported claim.

## 9. Check proposal freshness

Find stale or superseded candidate changes.

## 10. Produce Findings

Do not mutate the model automatically.

---

# Suggested health codes

A first implementation could use explicit diagnostic codes.

```text
MW-ORPHAN-001
Active object has no model relationships.

MW-ORPHAN-002
Active Mapping has no active source.

MW-ORPHAN-003
Active Mapping has no active target.

MW-ORPHAN-004
FieldEndpoint has operational usage but no business Attribute.

MW-ORPHAN-005
Approved Rule has no governed subject.

MW-ORPHAN-006
Approved Rule has no implementation or declared manual-control status.

MW-ORPHAN-007
Active object is connected only to retired objects.

MW-ORPHAN-008
Evidence has no supported claim or baseline.

MW-ORPHAN-009
Disconnected subgraph has no active or historical root.

MW-ORPHAN-010
Proposal target changed after proposal baseline.
```

The codes make findings:

- searchable;
- testable;
- suppressible;
- reportable;
- suitable for CI policy.

---

# Release-gate policy

Not every orphan should block release.

## Block

- active one-sided Mapping;
- active Rule with missing subject;
- candidate change creates unreachable mandatory Attribute;
- active implementation connected only to retired model objects;
- required target field has no population path;
- replacement chain is broken.

## Warn

- unclassified discovered endpoint;
- Evidence missing optional metadata;
- design-stage Attribute without implementation;
- historical component missing full provenance;
- stale low-priority proposal.

## Inform

- intentionally excluded technical field;
- terminal target endpoint;
- archived historical Evidence;
- accepted dormant future-state object.

This avoids both permissiveness and alert fatigue.

---

# Orphan detection in CI

A repository health check can run after normal validation:

```bash
martenweave validate --repo ./model
martenweave build-index --repo ./model --jsonl
martenweave health --repo ./model
martenweave scorecard --repo ./model
```

Martenweave already exposes validation, index, health and scorecard operations in its documented CLI.

A CI policy could fail when:

- new hard orphan count exceeds zero;
- an existing suppression expires;
- active orphan debt increases;
- a critical object becomes unreachable;
- a candidate proposal creates a broken path.

The report should compare against the base branch so that teams can see newly introduced debt rather than being blocked by every historical warning immediately.

---

# Orphan detection during diff review

The most useful time to detect orphans is before merge.

A repository diff can ask:

- Which objects lost their last source?
- Which objects lost their last target?
- Which components became disconnected?
- Which active objects now point only to retired objects?
- Which Rules lost applicable values?
- Which proposals became stale?
- Which Evidence lost its supported claim?

This converts orphan analysis from periodic cleanup into change prevention.

---

# Orphan detection after dataset profiling

Observed datasets can expose orphaned model paths.

Examples:

- expected source field never appears;
- dataset includes an unmapped field repeatedly;
- Mapping expects a context key absent from every extract;
- endpoint is documented but no observed data ever uses it.

The result should not immediately retire the object.

It should produce a Finding:

```text
Declared lineage has no observed dataset support
for the selected migration scope.
```

Martenweave’s dataset-readiness flow already supports profiling, gap reporting and promotion into reviewable proposals or issue drafts.

---

# Orphan detection after migration completion

When a migration wave closes, review temporary objects:

- wave-specific Mappings;
- defaults;
- manual enrichment paths;
- provisional Rules;
- temporary interfaces;
- gap Findings;
- candidate endpoints.

Each should be:

- promoted to ongoing governance;
- transferred to the next wave;
- marked historical;
- retired;
- closed with evidence.

Without this step, wave artefacts remain active indefinitely and make future impact analysis noisy.

---

# Orphan detection in AMS

AMS teams inherit a different pattern of orphans:

- old custom fields;
- superseded interfaces;
- temporary fixes;
- rules no longer aligned with process;
- unresolved change tickets;
- reports using retired codes.

A periodic health report can identify objects whose operational evidence has disappeared or whose replacement paths are incomplete.

This helps AMS move from incident repair toward model maintenance.

---

# What AI can do

AI can help:

- explain why a component appears disconnected;
- compare definitions of possible duplicate Attributes;
- suggest likely replacement links;
- identify references in prose;
- draft retirement proposals;
- group orphan findings by root cause.

AI should not:

- delete objects;
- merge semantic identities;
- retire active fields;
- infer that lack of observed data means lack of production use;
- close Findings;
- approve suppressions.

The graph engine detects structure.

AI helps interpret.

Humans decide model intent.

---

# What Martenweave should implement next

Martenweave already has the core pieces needed:

- canonical typed objects;
- deterministic reference validation;
- disposable graph and search projections;
- health and scorecard commands;
- lineage and impact analysis;
- proposal-first changes.

The next vertical slice should add **type-aware orphan diagnostics**.

## Goal

Detect objects that are structurally valid but disconnected from a meaningful active or historical model path.

## Initial scope

Support:

- Attribute;
- FieldEndpoint;
- Mapping;
- Rule;
- Evidence;
- PatchProposal.

## Required checks

1. Active Mapping without active source.
2. Active Mapping without active target.
3. Active FieldEndpoint with no Attribute, Mapping or explicit technical-only classification.
4. Approved Attribute with target endpoint but no population path.
5. Approved Rule without subject or implementation status.
6. Active object connected only to retired objects.
7. Evidence without supported claim or baseline.
8. Stale PatchProposal whose expected base state changed.
9. Disconnected component without active, historical or proposal root.
10. Suppression without reason or reviewer.

## Acceptance criteria

The Customer model example should distinguish:

```text
retired custom endpoint with replacement:
healthy historical object
```

from:

```text
active custom endpoint with no Mapping or replacement:
orphan warning
```

It should also identify:

```text
direct CRM Mapping still active
despite a Decision rejecting direct equivalence
```

as a governance conflict rather than a zero-degree orphan.

## Validation

```bash
martenweave validate --repo examples/customer_bp_model
```

## Health analysis

```bash
martenweave health --repo examples/customer_bp_model
martenweave scorecard --repo examples/customer_bp_model
```

A future focused command could be:

```bash
martenweave orphans \
  --repo examples/customer_bp_model \
  --status active
```

The dedicated command is a recommended direction, not a claim about current CLI behaviour.

---

# Final perspective

A model repository can contain no broken references and still contain a large amount of dead or misleading structure.

An orphan may be:

- a field without governed meaning;
- an Attribute without a creation path;
- a Rule without current applicability;
- a Mapping whose source disappeared;
- Evidence without a supported claim;
- a proposal based on an obsolete baseline;
- an entire connected component detached from every active and historical model root.

The right question is not:

> Does this object have an edge?

It is:

> Does this object still have a justified role in an active, planned or historically explainable model path?

A useful health process moves through several levels:

```text
reference integrity
→ type-specific connectivity
→ status-aware reachability
→ semantic compatibility
→ operational evidence
→ governance purpose
```

The practical test is:

> Can the team explain why every approved Rule, Mapping and critical FieldEndpoint exists, what active or historical path it belongs to, who is accountable for it and what should happen if the path is no longer used?

When the answer is yes, the repository is maintainable.

When the answer is:

> The file validates, so we left it there,

the model has accumulated hidden structural debt.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It uses canonical typed objects, deterministic validation, generated lineage indexes, health analysis and reviewable proposals to distinguish broken references from deeper model-health problems.

The objective is not to delete every disconnected object.

It is to make every active, historical and intentionally dormant object explainable.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave Core currently represents Domains, Entities, Attributes, Relationships, datasets, Mappings, Rules, Evidence, Decisions and change proposals in canonical files. It validates IDs, types, references and domain context before generating disposable indexes for gap, lineage and impact analysis.

The current Martenweave CLI documents validation, index building, freshness checks, health reports, scorecards, impact, trace, repository diff and PatchProposal creation.

OpenLineage’s column-level lineage model distinguishes direct dependencies, where an output derives from an input value, from indirect dependencies, where an input affects selection or calculation. It further identifies transformation subtypes such as identity, transformation, aggregation, joins, filters and conditional logic.

OpenLineage’s object model separates declared Datasets and Jobs from individual runtime Runs. This provides a useful pattern for comparing designed model reachability with evidence about paths that actually execute.

The orphan categories, diagnostic codes, status-aware graph views and proposed dedicated `orphans` command in this article describe recommended Martenweave improvements. They should not be interpreted as guarantees of the exact current health or scorecard implementation unless separately published and versioned.

Martenweave is independent and is not affiliated with or endorsed by SAP or OpenLineage.
