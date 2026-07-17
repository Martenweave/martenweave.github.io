# Why a Successfully Loaded Material May Still Be Unusable

**Reviewed: 15 July 2026**

The material migration report looks successful.

```
Materials in scope:
120,000

Materials loaded:
119,640

Technical success rate:
99.7%

Critical interface failures:
0
```

The programme reports that the material domain is ready.

After go-live, the first operational problems appear.

A buyer cannot create a purchase order because the material is not extended to the required purchasing context.

A production planner cannot run the expected planning process because the Plant-specific settings are missing or defaulted incorrectly.

The warehouse receives an inbound delivery but cannot execute the intended putaway process because the warehouse product data is incomplete.

A picker sees an unexpected quantity because the warehouse and ERP systems interpret the packaging conversion differently.

Transportation planning uses dimensions and weights that were technically accepted but were copied from an unreliable source.

The material exists in the target system.

The migration interface accepted it.

Most required fields contain values.

The business still cannot use it correctly.

This is not an unusual edge case.

It is one of the central management problems in logistics data migration:

> A material can be technically loaded long before it is operationally usable.

The mistake begins when programmes use object creation as a proxy for readiness.

The technical question is:

> Did the target system create the material?

The management question should be:

> Can the material support the intended purchasing, planning, production, warehouse and transportation processes in every required organisational context?

Those questions lead to different project controls.

They also require a different data model.

Martenweave should not replace SAP S/4HANA, SAP EWM, SAP MDG, a migration cockpit or a warehouse management system.

Its role is to preserve the model knowledge that those systems and project artefacts do not hold together:

- what the material is expected to support;
- which extensions and relationships are required;
- where each value comes from;
- which Rules determine readiness;
- which Exceptions remain;
- which Evidence proves the current state;
- which owner can accept the remaining risk.

Martenweave Core is already positioned as a backend-first model-governance and evidence layer that turns datasets, validation reports, Decisions and SAP context into canonical files, deterministic validation, gap reports, lineage, impact analysis and human-approved proposals.

The logistics opportunity is to apply that foundation to a painful question:

> Why can the process still not run when every technical report says the material was loaded successfully?

# The management trap: reporting the object instead of the capability

A conventional migration dashboard is organised around objects.

It reports:

- Material created;
- Business Partner created;
- bill of material loaded;
- routing loaded;
- warehouse product replicated;
- open stock reconciled.

This is useful delivery information.

It is not sufficient operational information.

A manager does not ultimately need a material to exist.

The organisation needs the material to support capabilities such as:

- purchasing;
- material requirements planning;
- production supply;
- quality inspection;
- goods receipt;
- putaway;
- replenishment;
- picking;
- packing;
- transportation planning;
- delivery execution;
- billing.

SAP describes EWM as supporting high-volume warehouse operations and integrating warehouse and distribution processes with production, quality and track-and-trace capabilities. That breadth is precisely why the material’s readiness cannot be inferred from one global record or one successful replication event.

The manager’s unit of readiness should therefore be:

```
Material
+
business capability
+
organisational context
+
current Evidence
```

Not simply:

```
Material exists
```

# One material, several operational truths

Consider one automotive component:

```
Material:
AX-4711

Description:
Steering Module Assembly

Base unit:
EA

Procurement:
External

Required Plant:
DE10

Required warehouse:
EWM-WH01

Required purchasing organisation:
P100

Required production-supply scenario:
Line-side staging

Required transportation context:
Returnable pallet
```

The migration creates the material successfully.

The general description, material type, base unit and gross weight are populated.

The technical load report marks it as complete.

The project later discovers five problems:

1. The material is not extended to Plant DE10 with the approved planning parameters.
2. The purchasing data contains a temporary purchasing group copied from a migration default.
3. The EWM warehouse product exists, but the intended putaway and replenishment settings are missing.
4. The packaging hierarchy says 48 pieces per pallet, while the warehouse specification uses 40.
5. The weight was copied from an old engineering extract and does not match the current packaging level.

This is still one material.

It contains several separate readiness questions.

```
Ready for central identification:
Yes

Ready for purchasing:
Controlled

Ready for planning:
No

Ready for warehouse receipt:
Possibly

Ready for line-side replenishment:
No

Ready for transportation planning:
No
```

A single traffic light cannot represent this honestly.

# Why the existing project artefacts do not solve the problem

Most programmes already have a large amount of information.

They may have:

- migration workbooks;
- field-mapping specifications;
- data-quality reports;
- SAP configuration documents;
- MDG change requests;
- EWM setup sheets;
- test evidence;
- cutover trackers;
- incident tickets;
- business Decisions in meeting minutes.

The problem is not the absence of documents.

The problem is that the documents answer different fragments of the question.

The Mapping workbook can say where a value comes from.

It may not say whether that value is sufficient for warehouse execution.

The load report can prove that a record was created.

It may not say whether the required organisational extensions exist.

The EWM test can prove that one warehouse process worked for a small test set.

It may not identify which current production materials lack equivalent master data.

An MDG workflow can prove that an approved change was governed.

It may not prove that the cutover dataset used the approved version.

SAP positions MDG around governed models, golden records, profiling, matching, merging, workflow, data-quality Rules and auditability. Those are important sources of trusted Evidence, but a migration still has to connect the governed object to the exact dataset, Mapping, target load and operational scope used for cutover.

The project therefore needs a layer that connects the fragments without replacing their source systems.

# The real pain is fragmented operational context

The material master is often discussed as one object.

Operationally, it behaves more like a network.

```
Global Material
→ Plant
→ Storage Location
→ Purchasing Context
→ Warehouse Product
→ Packaging Specification
→ Product–Location
→ Transportation Context
→ Production Supply Relationship
```

Each node can have:

- separate Attributes;
- separate owners;
- separate source systems;
- separate Rules;
- separate migration timing;
- separate Evidence.

The global material can be correct while a local extension is wrong.

The Plant extension can be correct while the warehouse product is incomplete.

The warehouse product can be complete while packaging data contradicts the ERP unit conversion.

This is why logistics issues are frequently transferred between teams.

The MM team says the material exists.

The EWM team says the warehouse setup is incomplete.

The data team says all mapped fields were loaded.

The business says the process does not work.

Each team can be correct within its own boundary.

The programme lacks a shared model of the complete capability.

# The first management solution: define readiness by business capability

Before building more validation Rules, managers should define what “ready” means for each operational capability.

For AX-4711, purchasing readiness might require:

```
Material active in Plant DE10

Purchasing organisation P100 applicable

Approved purchasing group available

Order unit and conversion valid

Supplier sourcing relationship available

No purchasing block

Current Evidence generated from the cutover baseline
```

Warehouse readiness might require:

```
Warehouse product available in EWM-WH01

Required putaway control present

Required stock-removal control present

Replenishment settings present

Packaging specification aligned

Unit conversions consistent

Production-supply relationship available
```

Transportation readiness might require:

```
Current gross weight and volume

Correct packaging level

Returnable pallet relationship

Relevant transportation group

Valid loading characteristics

Location and route context available
```

These are not universal SAP requirements.

They are programme-specific capability contracts.

That is the point.

The project should state explicitly what the future operating model needs, rather than assuming that the target system’s minimum creation checks represent full business readiness.

# The second solution: model the organisational grain correctly

A recurring logistics failure occurs because a global Attribute is confused with a local one.

For example:

- base unit may be global;
- planning parameters are Plant-specific;
- warehouse controls are warehouse-specific;
- some procurement settings depend on purchasing organisation;
- packaging or handling assumptions may vary by location or process;
- lead times can depend on source, destination and activity.

If the canonical model stores everything under `Material`, it becomes impossible to express these differences safely.

We need first-class relationships such as:

```
Material–Plant

Material–Purchasing Organisation

Material–Warehouse

Material–Storage Location

Material–Packaging Level

Product–Location

Product–Transportation Lane
```

This changes the management conversation.

Instead of asking:

> Is the material complete?

We ask:

> Is the material complete for Plant DE10, purchasing organisation P100 and warehouse EWM-WH01 for the processes included in Wave 1?

The second question is longer.

It is also operationally meaningful.

# The third solution: distinguish data presence from data authority

A value can be present and still be unsafe.

For AX-4711, the gross weight is populated.

But which source owns it?

Possible sources include:

- engineering;
- legacy ERP;
- warehouse packaging data;
- supplier information;
- transportation planning;
- a manual migration file.

These sources may represent different things.

Engineering may describe the component itself.

Warehouse packaging data may describe the handled logistics unit.

Transportation may require the packed shipping weight.

The field name `GROSS_WEIGHT` does not resolve the semantic difference.

Managers need an authority Decision:

```
Component net weight:
Engineering authority

Packed case weight:
Packaging specification authority

Transport pallet weight:
Approved logistics packaging authority
```

Martenweave can preserve this as canonical model truth.

Then a validator can detect when a target Attribute is populated from a source that is technically available but not authorised for the intended meaning.

# The fourth solution: treat defaults as controlled debt

Defaults are common during migration.

They are sometimes necessary.

They are dangerous when they lose their temporary status.

For AX-4711, the migration team sets:

```
Purchasing group:
001
```

This can mean three very different things.

## Approved business default

Group `001` is the accepted permanent owner for the defined material population.

The value may count as ready.

## Temporary fallback

The final responsibility is not confirmed, but group `001` is approved for cutover under a time-bounded Exception.

The material is controlled, not fully ready.

## Undocumented technical constant

The value was used to avoid an empty target field.

The material is not governed.

Most completion dashboards treat all three as populated.

A useful readiness model must distinguish them.

Managers should require every material default to answer:

- Is this permanent or temporary?
- Who approved it?
- For which population?
- What business process does it affect?
- When does it expire?
- What replaces it?
- How will we identify every record using it?

Without those answers, the default becomes invisible operational debt.

# The fifth solution: validate relationships, not only fields

Many logistics failures are relationship failures.

Examples include:

- material exists, but Plant extension is absent;
- warehouse product exists, but packaging specification is not linked;
- unit conversion exists, but contradicts another conversion path;
- product-location exists, but no valid source of supply supports it;
- transportation lane exists, but the origin location is inactive;
- production material exists, but production-supply relationship is missing.

A field-level validator may report no problem.

The records are individually valid.

The network is incomplete.

Martenweave should support Rules such as:

```
Every production material in Plant DE10
requiring line-side staging
must have a valid warehouse product,
production-supply relationship
and replenishment treatment
for EWM-WH01.
```

This is closer to the real operational requirement than:

```
WAREHOUSE_NUMBER is not empty.
```

# The sixth solution: separate global correctness from local applicability

Global templates are useful.

They also create false confidence.

A Mapping may correctly derive a putaway indicator for the primary warehouse.

The same Mapping may be wrong for a smaller warehouse using different storage conditions.

A packaging hierarchy may be valid in Europe and invalid for a North American returnable-container process.

Managers should require every Rule and Mapping to declare applicability.

For example:

```
Applicable when:

Plant = DE10

Warehouse = EWM-WH01

Material category = Production Component

Storage condition = Standard

Production supply = Line-side staging
```

This prevents a global Mapping from silently becoming a global policy.

# The seventh solution: connect data gaps to business consequences

A migration gap should not stop at:

```
70 materials missing warehouse extension
```

Managers need the operational consequence.

For AX-4711:

```
Missing object:
Warehouse replenishment settings

Affected process:
Line-side production supply

Potential consequence:
Component not replenished to production supply area

Operational fallback:
Manual warehouse task creation

Fallback capacity:
Not validated for expected volume

Readiness:
Not ready
```

This lets the programme prioritize correctly.

A missing descriptive field affecting 10,000 materials may be less important than a missing replenishment relationship affecting 20 components required for production start.

Volume does not equal business impact.

# The eighth solution: define evidence-backed closure

When the team fixes AX-4711, a closed ticket is not enough.

A Mapping change is not enough.

The programme needs Evidence that:

1. the Plant extension exists;
2. the warehouse product exists;
3. the packaging relationship is consistent;
4. the replenishment setting is active;
5. the material is included in the current cutover population;
6. the target system contains the expected result;
7. the intended warehouse process can execute;
8. no new contradiction was introduced.

The closure package could contain:

```
Current model commit

Current material dataset fingerprint

Mapping version

Target load identifier

Warehouse-product reconciliation

Packaging conversion validation

Production-supply process test

Business owner approval
```

This is how a Finding becomes genuinely resolved.

# A manager-focused readiness model

For each logistics material, the programme should classify capabilities separately.

## Ready

The required objects, relationships and Rules are satisfied.

Current Evidence proves the state.

## Controlled

The final condition is incomplete, but an approved Exception and compensating control permit temporary use.

## Not ready

A required capability is missing or unsafe.

No valid control covers it.

## Not assessed

The current baseline has no valid Evidence.

## Not applicable

The capability is outside the approved use of the material.

For AX-4711:

```
Purchasing:
Controlled

Planning:
Not ready

Warehouse receipt:
Ready

Production replenishment:
Not ready

Transportation:
Not assessed
```

This is a more useful management view than:

```
Material load:
Successful
```

# What the Workbench should show

A manager should not have to inspect dozens of SAP tables or Mapping sheets.

The Martenweave Workbench could show a generated summary.

## Material

AX-4711 — Steering Module Assembly

## Intended use

Plant DE10, purchasing organisation P100, warehouse EWM-WH01, line-side production supply.

## Technical migration

- global record created;
- Plant extension created;
- warehouse product created;
- target reconciliation complete.

## Capability readiness

- purchasing: controlled;
- planning: blocked;
- warehouse receipt: ready;
- production replenishment: blocked;
- transportation: not assessed.

## Critical blockers

- Plant planning parameters use an unapproved default;
- replenishment settings are missing;
- pallet conversion conflicts with packaging specification.

## Current controls

- manual purchasing-group fallback;
- no validated production-supply fallback.

## Owners

- planning data owner;
- warehouse data owner;
- packaging owner;
- migration implementation owner.

## Evidence health

- target reconciliation current;
- packaging Evidence stale after latest Mapping change;
- transportation Evidence missing.

This is not a transaction screen.

It is a management explanation of the model state.

# A practical pilot for Martenweave

The best logistics pilot is not to model every material field.

That would be slow and generic.

A focused pilot should select:

- one Plant;
- one warehouse;
- one material category;
- one critical business process;
- one recent migration dataset.

For example:

```
Scope:
Production components for Plant DE10

Warehouse:
EWM-WH01

Capability:
Line-side production supply

Population:
2,000 materials
```

The pilot should answer five questions.

## 1. Which materials are in scope?

Reconcile the population and preserve approved exclusions.

## 2. Which objects and relationships are required?

Material–Plant, warehouse product, unit conversion, packaging and production-supply relationships.

## 3. Which records are incomplete or contradictory?

Detect missing extensions, conflicting conversions and unsupported defaults.

## 4. Which gaps block the process?

Connect Findings to production-supply impact.

## 5. Which current Evidence proves readiness?

Show target reconciliation, validator results, Exceptions and owner approval.

The result is not another data-quality report.

It is a capability-based readiness package.

# What Martenweave should store

The canonical repository could represent:

```
Material

Material–Plant relationship

Material–Warehouse relationship

Packaging level

Unit conversion

Production-supply relationship

Rule

Mapping

Decision

Exception

Evidence

Finding

Readiness assessment

Patch proposal
```

This fits the current Martenweave direction, which already treats domains, entities, attributes, relationships, datasets, mappings, Rules, Evidence, Decisions and change proposals as generic model objects.

The dedicated logistics objects and readiness lifecycle described here should be treated as a proposed domain pack rather than released functionality.

# What Martenweave should not store

Martenweave should not become the operational owner of:

- warehouse tasks;
- stock quantities;
- purchase orders;
- production orders;
- transport orders;
- real-time resource assignments;
- live MRP execution;
- direct SAP updates.

SAP EWM is designed to manage warehouse operations, integrate logistics processes and provide operational visibility and control. Martenweave should not compete with that execution role.

Its purpose is different:

```
Operational systems execute.

Martenweave explains
what the model expects,
why the data has its current meaning,
which gaps affect execution,
and what Evidence proves readiness.
```

# The first product slice

The strongest initial logistics feature would be:

## Material Capability Readiness

### Goal

Determine whether each material can support a defined business process in a defined organisational context.

### Inputs

- material dataset;
- Plant scope;
- warehouse scope;
- canonical Rules;
- required extensions;
- mappings;
- unit conversions;
- packaging relationships;
- Exceptions;
- validation Evidence.

### Outputs

- readiness by capability;
- missing extensions;
- contradictory relationships;
- unapproved defaults;
- critical blockers;
- affected business processes;
- owners;
- proposed remediation;
- evidence-backed closure criteria.

### Initial capabilities

- purchasing;
- planning;
- warehouse receipt;
- production supply;
- transportation.

# Proposed commands

A future CLI might support:

```
martenweave logistics readiness \
  --dataset ./data/materials-rc4.xlsx \
  --plant DE10 \
  --warehouse EWM-WH01 \
  --capability production-supply \
  --repo ./model
```

```
martenweave logistics missing-extensions \
  --plant DE10 \
  --warehouse EWM-WH01 \
  --repo ./model
```

```
martenweave logistics explain-material \
  AX-4711 \
  --plant DE10 \
  --warehouse EWM-WH01 \
  --repo ./model
```

```
martenweave logistics impact \
  ATTR-PALLET-CONVERSION \
  --repo ./model
```

```
martenweave logistics propose-fix \
  FIND-AX-4711-REPLENISHMENT \
  --dry-run \
  --repo ./model
```

These commands are proposed product directions.

They are not part of the currently documented Martenweave CLI.

The existing core already provides canonical files, deterministic validation, dataset-gap detection, lineage, impact analysis and proposal-first change handling that can support this domain slice.

# What managers should change in the programme

The main solution is not a new dashboard.

It is a different control model.

## Stop accepting “loaded” as a readiness status

Require the team to state the intended capability and organisational context.

## Stop measuring only field completion

Measure missing relationships, conflicting authority and unsupported defaults.

## Stop allowing defaults to disappear into normal data

Classify permanent defaults, temporary fallbacks and unapproved constants separately.

## Stop closing Findings when code changes

Require current target Evidence and, for critical capabilities, a business-process test.

## Stop reporting only global material percentages

Show readiness by Plant, warehouse, capability and critical population.

## Stop making data teams responsible for policy ambiguity

Assign business owners to authority, applicability and Exception Decisions.

## Stop treating MDG, migration and EWM reports as competing truths

Use each as Evidence tied to a common canonical model.

# The management questions that expose the real state

Before cutover, leaders should ask:

1. Which business capabilities must each material support on day one?
2. Which organisational extensions are required for those capabilities?
3. Which critical relationships are validated, not merely populated?
4. Which values use approved authority?
5. Which records depend on defaults?
6. Which defaults are permanent, temporary or unapproved?
7. Which materials are usable only under manual controls?
8. Which Exceptions expire before normal operations stabilise?
9. Which Evidence was produced after the latest model and Mapping changes?
10. Which technically loaded materials remain operationally blocked?

A programme that cannot answer these questions does not yet have a trustworthy material-readiness model.

# The business value

The value is not better documentation.

It is fewer operational surprises.

A capability-based material model can reduce:

- failed purchase-order creation;
- incorrect MRP behaviour;
- manual warehouse intervention;
- production-supply disruption;
- packaging and quantity discrepancies;
- transportation-planning errors;
- repeated handoffs between MM, EWM, PP and data teams;
- emergency master-data fixes during hypercare.

It also improves management decisions.

Instead of hearing:

```
99.7% of materials loaded successfully.
```

leaders can hear:

```
119,640 materials were technically created.

118,900 are ready for their intended capabilities.

520 are usable under controlled Exceptions.

140 are blocked by missing organisational extensions.

80 have contradictory unit or packaging relationships.

The production-supply gate remains blocked
for 20 critical components.
```

The second statement is less attractive.

It is much more actionable.

# Final perspective

The material record is not the business outcome.

It is one part of an operational network.

A material becomes useful only when:

- the right organisational extensions exist;
- the required relationships are complete;
- the values have accepted meaning;
- local applicability is understood;
- temporary defaults are controlled;
- downstream systems receive the right state;
- current Evidence proves the intended capability.

The practical test is:

> Can we explain exactly what the material can do, where it can do it, which conditions remain, and which Evidence proves the answer?

When the answer is yes, the material is operationally governed.

When the answer is:

> The material was loaded successfully,

we know that the migration interface completed its work.

We do not yet know whether logistics can.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We are building Martenweave so that logistics migration programmes can distinguish object creation from operational capability and convert scattered model knowledge into a traceable readiness layer.

Our operating model is:

```
Systems execute logistics processes.

Canonical models define expected capability.

Validators detect missing or contradictory context.

Findings explain operational impact.

Exceptions preserve controlled limitations.

Evidence proves readiness.

AI proposes remediation.

Humans approve model truth and cutover risk.
```

Martenweave is an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance, logistics and AMS teams.

## Sources and notes

This article was reviewed on 15 July 2026.

Martenweave Core currently describes an open-source, backend-first model-governance and evidence layer that transforms datasets, validation reports, Decisions and SAP context into canonical model files, deterministic validation, gap reports, lineage, impact analysis and human-approved proposals.

Its current principles keep canonical files authoritative, generated indexes disposable, deterministic validation mandatory and AI-generated changes proposal-first.

The documented pipeline moves from source Evidence through validation, dataset and model gaps, lineage and impact analysis to reviewed proposals and GitHub delivery.

SAP describes SAP EWM as a warehouse management system for high-volume operations that integrates complex supply-chain logistics with warehouse and distribution processes, including quality, production and track-and-trace integration. This supports the article’s central point that warehouse readiness depends on operational relationships and controls beyond creation of a global material record.

SAP describes SAP Master Data Governance as a governance layer for trusted master data, with governed models, golden records, profiling, matching, merging, semantic reconciliation, workflow, business Rules, continuous quality monitoring and auditability. These capabilities can supply important governance Evidence, while Martenweave’s proposed logistics layer connects that Evidence to a specific migration dataset, Mapping, organisational context and operational capability.

Material Capability Readiness, logistics relationship objects, capability gates and the proposed commands are product directions. They should not be interpreted as guarantees of the exact current Martenweave schema, Workbench behaviour or CLI until implemented and released.

Martenweave is independent and is not affiliated with or endorsed by SAP.
