# How We Keep Business Decisions Traceable After the Mapping Workbook Is Gone

**Reviewed: 14 July 2026**

A migration team decides that MRP Controller must be derived differently for Plant PL30.

The decision appears in a meeting note:

> PL30 will use its own Planner Group conversion. Do not use the global controller fallback after Mock Load 3.

Someone updates the mapping workbook.

Someone else changes the transformation code.

The mock load succeeds.

Six months later, the workbook is archived.

A year later, an AMS team investigates why Product Plant records in PL30 have different MRP Controllers from otherwise similar records in PL20.

The current model shows the plant-specific Mapping.

The code shows the plant-specific conversion.

What is missing is the reason.

The team cannot easily answer:

- Why was PL30 treated differently?
- Which problem triggered the decision?
- What alternatives were considered?
- Was the global fallback rejected permanently or only for cutover?
- Which business owner accepted the change?
- Which evidence supported it?
- Did the decision apply to every Product or only one migration wave?
- Has a later decision superseded it?

This is the failure we want to prevent.

> A model is not fully traceable when we can see what it does but cannot explain why the organisation chose it.

Mapping workbooks often contain decision history accidentally.

The history survives through:

- comments;
- coloured cells;
- copied email text;
- status columns;
- tab names;
- meeting-note references.

When the workbook disappears, that context disappears with it.

Our goal is not to preserve the workbook forever as the source of truth.

Our goal is to move the decision into the canonical model without reducing it to a final value or a short comment.

Martenweave already treats Decisions, Evidence, Mappings, Rules and change proposals as first-class parts of the model-governance pipeline. Canonical files own truth, deterministic validation protects their consistency, and AI-generated changes require human review.

The product principle is simple:

```
We do not store only the chosen answer.

We store:
- why a decision was needed;
- what was decided;
- what evidence supported it;
- what scope it covered;
- what consequences followed;
- what replaced it later.
```

---

# The mapping does not contain the whole decision

Suppose the current canonical Mapping says:

```
Planner Group + Plant
→ Product Plant MRP Controller
```

For PL30, the Mapping uses a local conversion table.

That tells us how the value is produced.

It does not tell us why the Mapping exists in this form.

The original business context may have been:

- PL30 has a separate planning organisation;
- the same Planner Group codes have different meanings in PL30;
- the global conversion produced incorrect responsibility assignments;
- controller `001` was only a temporary mock-load fallback;
- the PL30 planning owner agreed to maintain a separate conversion.

Each statement matters.

Without it, a future developer may “simplify” the Mapping by restoring the global table.

The simplified model may validate technically.

It may even reduce the number of Mapping objects.

It would reintroduce the business defect that the original decision solved.

A Decision object therefore must do more than point to the final Mapping.

It must preserve the problem and rationale.

---

# We separate the decision from its implementation

The business decision is not:

```
Change line 17 in mapping.yaml.
```

The decision is:

> PL30 requires a Plant-specific Planner Group to MRP Controller conversion because its planning responsibilities differ from the global structure.

The current implementation may be:

- a value-list object;
- a Python transformation;
- an ETL lookup table;
- a migration rule;
- an SAP configuration reference.

Those implementations can change.

The business decision can remain valid.

We therefore separate:

## Decision

What the organisation agreed.

## Mapping

How the decision is represented in the migration model.

## Implementation

How the Mapping is executed.

## Evidence

Why we believe the decision was necessary and whether it worked.

This separation makes the decision reusable.

If the transformation platform changes, we do not lose the rationale.

If the target endpoint changes, we still understand the business rule.

---

# We record the decision trigger

Every important decision begins with a condition that required a choice.

For PL30, the trigger might be:

```
Mock Load 2 assigned controller 001
to 640 Product Plant records in PL30.

Local planners confirmed that the global conversion
does not represent PL30 planning responsibility.
```

This should be recorded explicitly.

A weak Decision says:

```
Use PL30-specific conversion.
```

A stronger Decision says:

```
Problem:
The global Planner Group conversion assigns incorrect
MRP Controller responsibility in PL30.

Decision:
Use a Plant-specific conversion for PL30.

Reason:
Planner Group codes are interpreted differently
by the PL30 planning organisation.
```

The trigger helps future readers determine whether the decision still applies.

If PL30 later adopts the global planning structure, the original reason may no longer exist.

Without the trigger, nobody knows what condition to reassess.

---

# We preserve alternatives

A decision becomes understandable when we know what was rejected.

For the PL30 case, the team may have considered three options.

## Keep the global conversion

Rejected because it assigned the wrong planning responsibility.

## Continue using fallback controller 001

Rejected for production because it concentrated unrelated Products under one controller and hid incomplete conversion coverage.

## Create a PL30-specific conversion

Accepted because it reflected the local operating model and could be maintained by the Plant planning owner.

We do not need to document every conversation.

We should preserve the alternatives that could realistically return later.

Otherwise, future teams repeat the same analysis.

A useful Decision record might contain:

```
Alternatives considered:

1. Global conversion
   Rejected: incorrect PL30 ownership.

2. Default controller 001
   Rejected for production:
   temporary fallback only.

3. PL30-specific conversion
   Accepted:
   matches local planning responsibility.
```

The Architecture Decision Record practice offers a relevant pattern here: a decision record captures a significant decision together with its context and consequences, and good records preserve rationale rather than only the selected action. The practice also recommends superseding prior decisions rather than silently rewriting their history.

Martenweave Decision objects are not limited to software architecture.

The same pattern applies to data, mapping and migration decisions.

---

# We connect each decision to evidence

A Decision without Evidence becomes an assertion.

For PL30, relevant Evidence may include:

- the Mock Load 2 result;
- the affected-record count;
- the planning workshop note;
- the global-to-local comparison;
- the approved PL30 conversion table;
- the Mock Load 3 validation result.

We should not attach these files without explaining what each one supports.

Instead, we link claims.

```
Claim:
Global conversion produces incorrect PL30 assignments.

Supported by:
Mock Load 2 exception report.

Claim:
PL30 planning owner accepts the local conversion.

Supported by:
Planning workshop approval record.

Claim:
The new conversion covers all Wave 1 PL30 records.

Supported by:
Mock Load 3 readiness report.
```

This gives us more than a document trail.

It gives us an argument trail.

W3C PROV-O provides a general provenance model based on entities, activities and agents, with relationships for derivation, generation, use and attribution. We do not need to implement the full ontology to use the core idea: an artefact, the activity that produced it and the responsible agent should remain distinguishable.

For Martenweave, that means we should be able to distinguish:

- the validation report;
- the mock-load execution that generated it;
- the model baseline used by that execution;
- the owner or system responsible for it;
- the Decision that relied on it.

---

# We record the scope precisely

One of the most dangerous decision-history failures is scope loss.

A workbook note may say:

> Use local conversion for PL30.

But what does that cover?

- all Product Plant records;
- only Wave 1;
- only active production Products;
- one legacy source system;
- one target release;
- one period before organisational redesign?

We should record scope as model data.

For example:

```
Decision:
DEC-PL30-MRP-CONTROLLER-CONVERSION

Applies to:
- Plant PL30
- Product Plant MRP Controller
- Wave 1 migration population
- Source system LEGACY-EU

Effective from:
Mock Load 3 baseline

Does not apply to:
- PL20
- future planning redesign
- Products created natively after go-live
```

This prevents a valid local decision from becoming an accidental enterprise standard.

Scope should be machine-readable where possible.

A narrative explanation remains useful, but validators and impact analysis need structured boundaries.

---

# We distinguish temporary and durable decisions

Not every migration decision is intended to survive go-live.

Some decisions exist only because of:

- incomplete source data;
- cutover timing;
- a delayed interface;
- a temporary value conversion;
- limited remediation capacity.

The PL30 fallback illustrates the difference.

A temporary decision might be:

```
Use controller 001 for unresolved PL30 records
during Mock Load 2 only.
```

A durable decision might be:

```
Use PL30-specific Planner Group conversion
for the migration model.
```

If both are stored as ordinary Mapping logic, the temporary path can survive indefinitely.

We therefore need explicit decision characteristics:

```
decision_type:
temporary_exception

valid_until:
Mock Load 2 completion

production_use:
not_approved

replacement:
DEC-PL30-MRP-CONTROLLER-CONVERSION
```

The model should be able to report:

- temporary Decisions approaching expiry;
- expired Decisions still referenced by active Mappings;
- Decisions with no replacement;
- production paths still relying on test-only exceptions.

This is more useful than storing “temporary” in a free-text comment.

---

# We never overwrite decision history

Suppose the organisation later centralises planning and PL30 adopts the global conversion.

We should not edit the original Decision to say:

> Use the global conversion.

That would destroy the explanation of the historical model.

Instead, we create a new Decision:

```
Decision:
DEC-GLOBAL-MRP-CONVERSION-2027

Supersedes:
DEC-PL30-MRP-CONTROLLER-CONVERSION

Reason:
PL30 planning responsibility was centralised.

Effective from:
Release 2027-02
```

The earlier Decision remains in history with status:

```
superseded
```

Now we can answer two different questions:

- Why did Mock Load 3 and cutover use a local conversion?
- Why does the current model use a global conversion?

An append-and-supersede approach is much safer than rewriting historical rationale. ADR guidance similarly recommends preserving existing records and creating a new record when a later decision replaces or invalidates an earlier one.

Git records file history, but Git history alone is not enough.

A commit tells us that text changed.

A Decision relationship tells us that one business choice superseded another.

---

# We connect the Decision to consequences

Every important Decision changes something.

For PL30, expected consequences may include:

- a new value list;
- removal of the global fallback;
- 640 records requiring recalculation;
- a new Plant owner;
- stale Mock Load 2 Evidence;
- required retesting of planning responsibility;
- updated transformation logic.

We record these consequences before approval.

```
Consequences:

Positive:
- correct PL30 planning responsibility;
- no production reliance on controller 001;
- clearer ownership.

Required work:
- maintain PL30 conversion table;
- rerun affected Product Plant records;
- retest MRP planning.

Invalidated evidence:
- Mock Load 2 MRP Controller coverage.

New owner:
- PL30 Planning Data Owner.
```

Consequences make the Decision operational.

Without them, the record becomes passive documentation.

With them, Martenweave can connect the Decision to:

- Findings;
- PatchProposals;
- affected objects;
- validation commands;
- delivery issues.

---

# We make the Decision part of validation

A Decision should not exist only for humans to read.

The model should enforce its important consequences.

If the Decision says that PL30 must use a local conversion, validation can check:

- an active PL30 conversion exists;
- the Mapping references it;
- fallback `001` does not apply to PL30 in production scope;
- the owner is assigned;
- required Evidence exists for the current baseline.

The Decision itself remains a human-approved statement.

Validators enforce the parts that can be expressed deterministically.

This is where traceability becomes operational governance.

The model no longer says only:

> We once decided this.

It also says:

> The current canonical state must remain consistent with this accepted decision.

---

# We link changes back to the Decision

When an AI agent proposes changing the MRP Controller Mapping, the proposal should identify the relevant Decision.

For example:

```
PatchProposal:
Replace PL30 local conversion with global conversion.

Conflict:
DEC-PL30-MRP-CONTROLLER-CONVERSION

Current Decision:
PL30 requires local conversion.

Required action:
Provide evidence that the PL30 operating model changed,
or supersede the existing Decision before applying.
```

This prevents a technically valid proposal from silently contradicting accepted business logic.

The AI may still propose the change.

It must explain the conflict.

Martenweave’s proposal-first design is intended for exactly this boundary: agents can propose, deterministic validators can identify inconsistencies and humans decide whether the accepted model should change.

---

# We keep the Decision understandable outside the model files

Canonical files are necessary.

They should not force every business owner to read YAML.

Martenweave Workbench or generated documentation should render a Decision as a concise review page.

## Decision

Use a PL30-specific Planner Group conversion for Product Plant MRP Controller.

## Why

The global conversion assigned incorrect planning responsibility in Mock Load 2.

## Scope

Plant PL30, Wave 1, legacy EU source.

## Rejected alternatives

Global conversion and production fallback `001`.

## Evidence

Mock Load 2 exception report, planning-owner approval and Mock Load 3 readiness report.

## Consequences

New conversion table, removal of PL30 fallback and planning retest.

## Status

Approved.

## Supersedes

Temporary Mock Load 2 fallback Decision.

## Implemented by

`MAP-PRODUCT-PLANT-MRP-CONTROLLER`.

The Workbench remains a local review and investigation surface over canonical files rather than an independent store of truth.

---

# We preserve the workbook as historical Evidence

After conversion, the workbook can be archived.

It should not disappear without a trace.

We preserve:

- file fingerprint;
- import date;
- workbook version;
- relevant sheet and row;
- extracted claims;
- Decisions created from it;
- unresolved Findings;
- later superseding Decisions.

The canonical model should be able to say:

```
Decision DEC-PL30-MRP-CONTROLLER-CONVERSION
was initially identified from:
Product_Planning_Mapping_FINAL_v7.xlsx
```

But the Decision should not depend on the workbook remaining the active source of truth.

This gives us both:

- historical provenance;
- current model independence.

---

# We use one Decision object for one decision

A common mistake is to create a large decision record called:

```
Product planning design approved.
```

Inside it are decisions about:

- MRP Controller;
- Procurement Type;
- MRP Type;
- Profit Centre;
- storage location;
- fallback values.

That record becomes difficult to understand and impossible to supersede cleanly.

If PL30 MRP Controller logic changes, we should not need to supersede the whole Product planning design.

Our rule is:

> If one part can change while the rest remains accepted, it should normally be a separate Decision.

The PL30 conversion is one coherent choice.

It deserves one Decision object.

---

# We keep Decisions few but meaningful

The opposite failure is recording every minor edit as a Decision.

We do not need a formal Decision for:

- correcting a typo;
- changing a label;
- reformatting a file;
- adding an obvious missing description.

We create Decisions for choices that affect:

- business meaning;
- source authority;
- target grain;
- transformation logic;
- fallback;
- risk acceptance;
- important scope;
- future implementation.

The question is:

> Would a reasonable future team need to know why this choice was made before changing it?

If yes, it is probably a Decision.

---

# A practical Decision model

A simplified Martenweave Decision might look like:

```
---
id: DEC-PL30-MRP-CONTROLLER-CONVERSION
type: Decision
status: approved

title:
  Use a PL30-specific MRP Controller conversion

scope:
  plant: PL30
  migration_wave: WAVE-1
  source_system: LEGACY-EU

trigger:
  Global conversion produced incorrect controller assignments.

decision:
  Derive MRP Controller through the PL30 conversion table.

alternatives_rejected:
  - global conversion
  - production fallback 001

evidence:
  - EVID-MOCK2-PL30-MRP-EXCEPTIONS
  - EVID-PL30-PLANNING-APPROVAL
  - EVID-MOCK3-PL30-MRP-READINESS

affects:
  - MAP-PRODUCT-PLANT-MRP-CONTROLLER
  - VL-PL30-PLANNER-MRP-CONTROLLER

supersedes:
  - DEC-MOCK2-MRP-CONTROLLER-FALLBACK
---

The PL30 planning organisation uses local responsibility
assignments that are not represented by the global conversion.
```

This is an illustrative product direction rather than a guarantee of the exact current schema.

The important qualities are:

- stable ID;
- explicit context;
- chosen option;
- rejected alternatives;
- scope;
- Evidence;
- consequences;
- lifecycle.

---

# The first product capability we should build

The next focused Martenweave slice should be **Decision Traceability**.

It should allow us to start with one Mapping and answer:

1. Which Decisions govern it?
2. Which Evidence supported those Decisions?
3. Which alternatives were rejected?
4. Which scope does each Decision cover?
5. Is the Decision temporary or durable?
6. Has it expired?
7. Has it been superseded?
8. Which objects implement it?
9. Which Evidence became stale after it?
10. Which proposed changes conflict with it?

For the PL30 case, a trace command should conceptually produce:

```
Mapping:
MAP-PRODUCT-PLANT-MRP-CONTROLLER

Governed by:
DEC-PL30-MRP-CONTROLLER-CONVERSION

Status:
Approved

Scope:
PL30 / Wave 1 / LEGACY-EU

Reason:
Global conversion assigned incorrect planning ownership.

Implemented by:
PL30 conversion value list.

Replaces:
Temporary fallback 001.

Evidence:
Mock Load 2 exceptions,
planning approval,
Mock Load 3 readiness.
```

---

# Product behaviour we need

## Decision creation from evidence

A workbook note or workshop record can produce a candidate Decision.

## Decision validation

Required fields, references, scope and lifecycle must validate.

## Supersession

A later Decision replaces an earlier one without deleting history.

## Expiry detection

Temporary Decisions must surface when they remain active beyond their validity.

## Conflict detection

PatchProposals that contradict active Decisions must be flagged.

## Impact analysis

Changing or superseding a Decision should reveal affected Mappings, Rules, Evidence and datasets.

## Human-readable rendering

Business owners should review rationale without reading raw files.

## Git history

Approval and implementation remain reviewable through canonical file changes.

This capability strengthens the model registry more than adding another generic dashboard.

---

# What we should not build

We should not create:

- a general meeting-minutes system;
- an enterprise knowledge-management platform;
- a generic approval engine;
- a replacement for Jira or ServiceNow;
- an autonomous AI decision-maker.

Martenweave should capture only the Decisions that govern the canonical model and its use.

The narrow boundary keeps the product useful.

---

# The business value

Decision traceability reduces a specific form of enterprise waste:

> repeated reconstruction of why the model looks the way it does.

Without it, organisations spend time:

- reopening settled questions;
- repeating workshops;
- restoring rejected defaults;
- contacting former consultants;
- comparing old workbook copies;
- reverse-engineering transformation code;
- arguing over whether an exception was temporary.

With it, a future team can see:

- the accepted choice;
- the original problem;
- the evidence;
- the scope;
- the consequences;
- the replacement history.

This does not eliminate new decisions.

It stops old decisions from becoming unexplained behaviour.

---

# Final perspective

When the mapping workbook is gone, we should not be left with only the final Mapping.

For the PL30 MRP Controller case, we want to retain:

- the global conversion failure;
- the affected population;
- the local planning requirement;
- the alternatives considered;
- the rejection of production fallback `001`;
- the approved PL30 conversion;
- the Evidence that supported it;
- the scope and baseline;
- the later decision that may replace it.

The chain should remain visible:

```
Evidence
→ Finding
→ Decision
→ Mapping
→ implementation
→ validation
→ later supersession
```

The practical test is:

> Can a person who never attended the original workshop understand why the current Mapping exists, what conditions made it valid and what would need to change before it should be replaced?

When the answer is yes, we have preserved decision knowledge.

When the answer is:

> Git shows that the Mapping changed in September,

we have preserved file history but lost business reasoning.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We are building Martenweave so that migration teams do not lose critical decisions when workbooks, consultants and project phases disappear.

We want the model to preserve not only:

```
what is true now
```

but also:

```
why it became true,
who accepted it,
what evidence supported it,
and what later replaced it.
```

Martenweave is a backend-first, source-available model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave Core currently treats canonical files as the source of truth and includes Decisions, Evidence, Mappings, Rules and change proposals in its generic object model. It places deterministic validation, gap detection, lineage, impact analysis and human-reviewed proposals around that model.

The current product workflow is explicitly proposal-first: evidence leads to proposals, validation, gap and impact analysis, review and Git-based delivery.

The Architecture Decision Record practice defines a decision record as a document capturing an important decision together with context and consequences. Its guidance recommends preserving rationale, keeping each record focused, timestamping changing information and superseding old records rather than silently rewriting them.

W3C PROV-O defines a provenance model using entities, activities and agents, together with relationships such as derivation, generation, use and attribution. Martenweave does not need to implement PROV-O directly, but these distinctions provide a useful foundation for linking Evidence, model changes and accountable actors.

The Decision schema, trace output, conflict checks and supersession behaviour described here are product directions. They should not be interpreted as guarantees of the exact current canonical schema, Workbench behaviour or CLI unless separately implemented and published.

Martenweave is independent and is not affiliated with or endorsed by SAP, W3C or the Architecture Decision Record project.
