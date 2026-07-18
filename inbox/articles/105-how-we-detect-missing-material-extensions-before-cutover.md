# How We Detect Missing Material Extensions Before Cutover

**Reviewed: 15 July 2026**

The material migration team reports:

```
Materials in scope: 120,000
Materials created: 119,640
Technical success rate: 99.7%
```

The result looks strong.

The material numbers exist in SAP S/4HANA. Descriptions, material types, base units and several global attributes are populated. The final rehearsal produced few technical errors.

Then the operational teams ask different questions.

Procurement asks:

> Are the materials extended to every purchasing context required on day one?

Production planning asks:

> Do the materials exist in the Plants where MRP and production will actually run?

Warehouse operations asks:

> Which materials are available as warehouse products with the data required for receiving, putaway, replenishment and picking?

Finance asks:

> Which valuation and accounting contexts are missing?

The answers are no longer 99.7 percent.

Hundreds of materials exist globally but are missing one or more operational extensions.

Some can be displayed but not purchased.

Some can be purchased but not planned.

Some can be planned but not received into the intended warehouse.

Some can be received but not replenished to production.

The migration has created the material numbers.

It has not completed the operational network around them.

> A missing material extension is not a missing field. It is a missing permission for the business process to use the material in a specific organisational context.

This distinction matters for managers because extension gaps are often discovered late.

They may remain invisible during:

- global material validation;
- basic load reconciliation;
- sample-based testing;
- central MDG approval;
- high-level migration reporting.

They become visible when a Plant, purchasing organisation, storage location or warehouse tries to execute a real process.

By then, the programme is already in cutover or hypercare.

The management objective should therefore be:

> Detect every required material–organisation relationship before cutover, explain which business process depends on it, and prove that the relationship exists in the current target baseline.

Martenweave can support this without becoming another ERP or migration tool.

Its current architecture is built around canonical model files, deterministic validation, dataset-gap detection, lineage, impact analysis and human-reviewed proposals. It treats entities, attributes, relationships, datasets, mappings, rules, evidence and decisions as model objects rather than isolated spreadsheet columns.

That makes material extensions a natural use case.

# Why managers underestimate extension risk

A global material record is visible.

An extension is relational and contextual.

The project can point to material `AX-4711` in the target system and conclude that the migration succeeded.

The missing extension is harder to see because the question is not:

```
Does AX-4711 exist?
```

It is:

```
Does AX-4711 exist
for Plant DE10,
purchasing organisation P100,
storage location 0001,
warehouse EWM-WH01
and the processes expected after go-live?
```

The second question requires the programme to know the intended operating scope.

That scope is often fragmented across:

- production plans;
- purchasing lists;
- warehouse-product files;
- stock migration scope;
- source lists;
- bills of material;
- open purchase orders;
- planning combinations;
- cutover spreadsheets;
- local business knowledge.

The data team may know what was extracted.

It may not know what the business will need.

The business may know which materials it uses.

It may not know which target extensions and relationships are required to enable that use.

The functional team may know the SAP configuration.

It may not know which migration population should satisfy each configured process.

The gap survives because no artefact connects all three perspectives.

# Our running case

We use one material throughout the article.

```
Material:
AX-4711

Description:
Steering Module Assembly

Material category:
Externally procured production component

Required Plant:
DE10

Required purchasing organisation:
P100

Required storage location:
0001

Required warehouse:
EWM-WH01

Required process:
Purchase, receive, store and replenish to production
```

The global material is created successfully.

The migration report shows:

```
Global material:
created

Plant DE10:
created

Purchasing data:
created

Storage location 0001:
missing

Warehouse product EWM-WH01:
missing

Production-supply relationship:
missing
```

A global completion metric may still show the material as loaded.

Operationally, the result is incomplete.

The missing relationships create a chain of consequences.

```
Storage-location extension missing
→ stock cannot be managed in the intended local context

Warehouse product missing
→ warehouse-specific execution data is unavailable

Production-supply relationship missing
→ line-side replenishment cannot follow the intended process
```

The manager does not need to inspect every technical table.

The manager needs to know:

- which capability is blocked;
- how many materials are affected;
- whether the affected materials are operationally critical;
- which team owns the missing relationship;
- whether a safe fallback exists;
- what Evidence will prove closure.

# The first mistake: defining scope from the source extract

Many programmes begin with a list of source materials.

That list becomes the migration scope.

This is necessary but insufficient.

A source extract can tell us:

- which materials exist;
- where they currently have data;
- which historical organisational relationships are present.

It cannot, by itself, define the target operating model.

The target may introduce:

- new Plants;
- consolidated purchasing organisations;
- embedded or decentralised EWM;
- new storage locations;
- different production-supply concepts;
- new planning responsibilities;
- changed sourcing patterns.

If scope is copied directly from the legacy system, the programme can reproduce old extensions and still miss new ones.

The correct scope question is:

> Which material–organisation combinations are required by the target processes?

That requires business and process Evidence.

# The second mistake: assuming that transactions reveal the full scope

Projects often derive extension requirements from historical transactions.

For example:

- purchase-order history suggests purchasing extensions;
- inventory balances suggest Plant and storage-location extensions;
- warehouse stock suggests warehouse-product scope;
- production orders suggest production-use scope.

Historical transactions are valuable Evidence.

They are not a complete future-state specification.

A material may have no recent purchase orders but still be required for:

- service parts;
- emergency maintenance;
- seasonal production;
- new product launch;
- safety stock;
- planned supplier transition.

A material may have historical stock in a warehouse that will not exist after transformation.

The programme should combine transaction history with:

- future process design;
- open business;
- planning scope;
- approved organisational model;
- business-owner confirmation.

# The third mistake: creating every possible extension

When managers recognise the risk, the opposite reaction can occur:

> Extend every material everywhere.

This reduces some missing-extension errors.

It creates other problems.

Unnecessary extensions can:

- increase maintenance volume;
- make ownership unclear;
- create incorrect planning combinations;
- expose materials in processes where they should not be used;
- increase data-governance workload;
- complicate reporting and lifecycle management.

The goal is not maximum extension coverage.

The goal is justified extension coverage.

Every relationship should have a reason.

```
Material AX-4711
requires Plant DE10
because it is used in the DE10 production model.

Material AX-4711
requires warehouse EWM-WH01
because DE10 production supply is executed through that warehouse.
```

The reason should be traceable to Evidence.

# The fourth mistake: treating all missing extensions equally

A missing storage-location relationship for a dormant material is not equivalent to a missing Plant extension for a component required during the first production shift.

Managers need impact segmentation.

For each extension gap, we should know:

- business capability;
- Plant or warehouse;
- first required date;
- stock or demand exposure;
- criticality of the material;
- fallback;
- reversibility;
- owner.

For AX-4711:

```
Missing relationship:
Material–Warehouse EWM-WH01

Affected capability:
Production replenishment

First required use:
First production shift after go-live

Fallback:
Manual warehouse handling

Fallback capacity:
Not validated

Priority:
Critical
```

This is a management Finding.

“Warehouse product missing” is only the technical symptom.

# The fifth mistake: validating the extension without validating its content

An extension may exist and still be unusable.

A material can be extended to a Plant with:

- placeholder MRP data;
- wrong procurement type;
- unapproved planning parameters;
- an inappropriate default controller;
- missing production-storage location.

A warehouse product can exist with incomplete or contradictory warehouse-process data.

SAP describes EWM as managing high-volume warehouse operations and integrating warehouse and distribution processes with quality, production and track-and-trace. That means warehouse readiness depends on more than the presence of a replicated product identifier.

We therefore separate two checks.

## Relationship existence

Does the material have the required organisational extension?

## Relationship readiness

Does the extension contain the governed data required for its intended capability?

For AX-4711:

```
Plant extension:
exists

Planning readiness:
fails

Reason:
MRP controller is an unapproved migration default
```

Counting the extension as complete would hide the real problem.

# The management solution: create an extension obligation model

The programme needs an explicit list of required relationships.

We call each required relationship an **extension obligation**.

Conceptually:

```
Material:
AX-4711

Required relationship:
Material–Plant DE10

Reason:
Production demand exists in DE10

Required capability:
Material planning

Evidence:
Approved production scope
```

Another obligation:

```
Material:
AX-4711

Required relationship:
Material–Warehouse EWM-WH01

Reason:
DE10 production supply uses EWM-WH01

Required capability:
Line-side replenishment

Evidence:
Approved warehouse and production-supply design
```

The extension obligation is not the extension itself.

It is the reason the extension must exist.

This gives us three states.

## Required and present

The relationship exists. Its content must still be validated.

## Required and missing

A migration gap exists.

## Present but not required

Possible over-extension or obsolete scope.

This third category is often ignored.

It can reveal poor scope control.

# How we derive extension obligations

The obligation model should combine several sources.

## Future organisational model

Which Plants, storage locations, purchasing organisations and warehouses will operate?

## Material-use classification

Which materials will be purchased, produced, stored, sold or transported?

## Operational relationships

Which Plant uses which warehouse? Which production process requires which storage location?

## Open business

Which purchase orders, stock balances, production requirements and deliveries cross cutover?

## Planning scope

Which product-location combinations are expected to participate in planning?

## Approved Decisions

Which materials are intentionally excluded, deferred or replaced?

No single source is sufficient.

The canonical model records the resulting obligation and its Evidence.

# We classify extension obligations by capability

Managers do not need a flat list of technical relationships.

They need grouped business meaning.

## Purchasing capability

Possible obligations:

- Material–Plant;
- purchasing context;
- order unit;
- purchasing group or responsibility;
- source relationship where required.

## Planning capability

Possible obligations:

- Material–Plant;
- planning parameters;
- procurement treatment;
- relevant production or sourcing relationship;
- planning calendar where applicable.

## Inventory capability

Possible obligations:

- Material–Plant;
- Material–Storage Location;
- stock-management context;
- batch or serial-number treatment where required.

## Warehouse capability

Possible obligations:

- material or product replication;
- warehouse-product relationship;
- required packaging and unit relationships;
- process-specific warehouse data.

## Production-supply capability

Possible obligations:

- production Plant;
- storage or supply-area relationship;
- warehouse product;
- staging and replenishment treatment.

The exact requirements remain programme-specific.

Martenweave should not hard-code one universal SAP template.

It should let the project define capability profiles.

# We compare obligations with actual target state

Once obligations are known, detection becomes deterministic.

```
Required extensions
minus
confirmed target extensions
equals
missing-extension Findings
```

For AX-4711:

```
Required:
Plant DE10
Purchasing organisation P100
Storage location 0001
Warehouse EWM-WH01

Confirmed:
Plant DE10
Purchasing organisation P100

Missing:
Storage location 0001
Warehouse EWM-WH01
```

We then validate the relationships that exist.

```
Plant DE10:
present but planning content incomplete

Purchasing P100:
present and ready
```

The result is more precise than “two extensions missing.”

# We preserve evidence for both sides

The obligation must have Evidence.

The target state must also have Evidence.

## Obligation Evidence

Why is the extension required?

Examples:

- approved process scope;
- production model;
- open stock;
- active demand;
- business-owner Decision.

## Existence Evidence

How do we know the target extension exists?

Examples:

- current target extract;
- load reconciliation;
- API response;
- replication result;
- validated target report.

## Readiness Evidence

How do we know the extension supports the process?

Examples:

- Rule execution;
- process test;
- target configuration check;
- business-owner approval.

This prevents an Excel checkmark from becoming the only proof.

# We keep source authority separate from extension ownership

An extension may contain values from several authorities.

For a Plant extension:

- planning parameters may belong to planning;
- procurement treatment may belong to Procurement;
- production-storage location may belong to production logistics;
- costing attributes may belong to Finance.

The team responsible for loading the extension does not own all of its meaning.

Managers should avoid assigning the entire extension to “the data team.”

Typed ownership is better.

```
Extension delivery owner:
Material Migration Team

Planning attributes owner:
Plant Planning Owner

Procurement attributes owner:
Procurement Data Owner

Closure approver:
Plant Business Owner
```

# We detect partial extensions

A common problem is that the relationship appears to exist because one segment was loaded.

For example:

```
Material–Plant relationship:
present

Purchasing-relevant data:
present

Planning-relevant data:
missing
```

If the project checks only for the Plant key, it reports success.

We need capability-specific completeness inside the relationship.

For AX-4711:

```
Plant DE10

Purchasing gate:
ready

Planning gate:
not ready

Production-supply gate:
not ready
```

One extension can therefore have several readiness results.

# We detect extensions that exist in the wrong scope

A material may be extended to:

```
Plant DE01
```

when the approved target scope requires:

```
Plant DE10
```

A simple count shows one Plant extension.

The required relationship remains missing.

This happens after:

- Plant consolidation;
- code conversion;
- carve-out;
- template redesign;
- incorrect Mapping.

The Finding should state:

> Material is extended, but not to the required target organisational unit.

That is different from complete absence.

# We detect orphaned local extensions

Some target extensions may have no current justification.

For example:

```
Material AX-4711
exists in warehouse EWM-WH09
```

but EWM-WH09 is not part of the target operating scope for this material.

This may indicate:

- obsolete legacy replication;
- incorrect rule applicability;
- over-extension;
- scope contamination.

The immediate risk may be lower than a missing critical extension.

It still matters for governance and lifecycle management.

# We detect extension contradictions

The relationship exists, but connected values disagree.

For example:

```
Plant DE10 procurement type:
External

Approved sourcing model:
In-house production
```

Or:

```
ERP packaging conversion:
48 EA per pallet

Warehouse packaging specification:
40 EA per pallet
```

The extension should not be classified as ready merely because all fields are populated.

Martenweave should connect related objects and surface contradictions through deterministic Rules.

# We detect hidden defaults

A migration file may fill every missing MRP Controller with `001`.

The Plant extensions now pass a non-empty check.

The extension-obligation model should still report:

```
Plant extension:
present

Planning responsibility:
temporary fallback

Readiness:
controlled

Exception:
required
```

This is a better management result than “100 percent complete.”

# We detect missing extension Evidence

Sometimes the extension probably exists, but current proof is unavailable.

For example:

- the latest target extract was not delivered;
- the reconciliation used an earlier load;
- the validation ran before the final Mapping change.

The correct state is:

```
Not assessed
```

not:

```
Missing
```

and not:

```
Ready
```

This avoids converting absence of Evidence into either failure or success.

# We connect extension gaps to cutover gates

A missing extension should affect the correct business gate.

For AX-4711:

```
Missing storage location:
Inventory gate blocked

Missing warehouse product:
Warehouse execution gate blocked

Missing production-supply relationship:
Production replenishment gate blocked
```

The global material-load gate may still be green.

That is acceptable as long as the operational gates remain visible.

A programme can then decide:

- block cutover;
- remove the material from the day-one scope;
- create a controlled manual fallback;
- complete the extension before activation.

# We define controlled temporary operation carefully

Some materials may be loaded before every extension is complete.

This can be rational.

For example, AX-4711 may be purchased and received into a temporary non-EWM process while the final warehouse setup is completed.

That requires an Exception.

The Exception should define:

- affected materials;
- allowed process;
- prohibited process;
- compensating control;
- owner;
- expiry;
- closure condition.

```
Allowed:
Purchase and receive through temporary process

Not allowed:
Automated line-side replenishment

Control:
Manual release by warehouse supervisor

Expiry:
Before production ramp-up
```

Without those boundaries, “manual workaround available” is not a controlled state.

# We close gaps with target Evidence

A developer or data specialist adds the missing warehouse relationship.

The Finding should not close immediately.

We need to prove:

1. the extension was created for the correct material and warehouse;
2. the current cutover dataset includes it;
3. required content is present;
4. connected units and packaging are consistent;
5. the intended process can execute;
6. no unrelated materials were extended incorrectly.

For AX-4711:

```
Warehouse product:
confirmed

Packaging relationship:
confirmed

Replenishment treatment:
confirmed

Target reconciliation:
passed

Production-supply test:
passed

Business owner:
approved
```

Only then is the capability ready.

# A manager-focused extension dashboard

The Workbench should not begin with a list of missing SAP views.

It should begin with business exposure.

## Scope

Production components for Plant DE10 and warehouse EWM-WH01.

## Population

```
Materials:
2,000
```

## Extension state

```
Fully extended and ready:
1,860

Required extension missing:
70

Extension present but incomplete:
40

Controlled by Exception:
20

Not assessed:
10
```

## Business impact

```
Purchasing blocked:
15 materials

Planning blocked:
25 materials

Warehouse execution blocked:
50 materials

Production supply blocked:
20 critical materials
```

## Critical Findings

- warehouse product missing for line-start components;
- production-storage relationship missing;
- packaging contradiction;
- unapproved planning default.

## Evidence health

- target extract current;
- packaging validation stale;
- ten materials added after latest validation.

This is the level at which a manager can act.

# The first Martenweave logistics slice

The focused capability should be:

## Material Extension Obligations

### Goal

Compare required material–organisation relationships with current target Evidence and explain the operational impact of every gap.

### Initial relationship types

- Material–Plant;
- Material–Storage Location;
- Material–Purchasing Context;
- Material–Warehouse;
- Material–Planning Location;
- Material–Production Supply.

### Initial inputs

- material population;
- target organisational model;
- business-capability profiles;
- open business and planning Evidence;
- approved scope Decisions;
- target extension extracts;
- active Exceptions.

### Initial outputs

- missing required extensions;
- incomplete existing extensions;
- present but unjustified extensions;
- contradictory extension data;
- affected capabilities;
- owners;
- priority;
- closure criteria.

# A conceptual obligation object

```
---
id: OBL-AX-4711-EWM-WH01
type: ExtensionObligation

material:
  AX-4711

relationship_type:
  material_warehouse

target:
  EWM-WH01

required_for:
  production_supply

reason:
  DE10 line-side supply is executed
  through EWM-WH01

evidence:
  - DEC-DE10-PRODUCTION-SCOPE
  - DATASET-DE10-LINE-COMPONENTS

required_by:
  cutover

owner:
  ROLE-WAREHOUSE-DATA-OWNER
---
```

This is a proposed product direction, not a claim about the current Martenweave schema.

# Proposed commands

A future CLI might support:

```
martenweave logistics extension-obligations \
  --dataset ./data/material-scope.xlsx \
  --plant DE10 \
  --warehouse EWM-WH01 \
  --repo ./model
```

```
martenweave logistics missing-extensions \
  --capability production-supply \
  --repo ./model
```

```
martenweave logistics explain-extension \
  AX-4711 \
  --target EWM-WH01 \
  --repo ./model
```

```
martenweave logistics validate-extension \
  OBL-AX-4711-EWM-WH01 \
  --target-evidence ./reports/warehouse-products.csv \
  --repo ./model
```

```
martenweave logistics propose-extension-fix \
  FIND-AX-4711-WAREHOUSE-MISSING \
  --dry-run \
  --repo ./model
```

These commands describe a recommended capability, not the current published CLI.

The existing Martenweave foundation already supports the canonical model, deterministic validation, gap detection, lineage, impact analysis and human-reviewed proposal flow needed for the slice.

# What managers should require before cutover

A practical control checklist is short.

## Require a target capability list

For each material population, define whether it must support:

- purchasing;
- planning;
- inventory;
- warehouse execution;
- production supply;
- transportation.

## Require explicit organisational scope

Name the Plants, storage locations, purchasing contexts and warehouses.

## Require obligation-to-target reconciliation

Do not rely only on source extracts or global material counts.

## Require separate reporting for missing and incomplete extensions

“Present” is not the same as “ready.”

## Require exception visibility

Temporary workarounds must remain outside the fully ready population.

## Require business-impact prioritisation

Twenty missing extensions for production-critical components may matter more than thousands of minor field gaps.

## Require current Evidence

The report must match the final model, Mapping, dataset and target load.

# The questions managers should ask

1. Which materials must operate in each Plant after go-live?
2. Which materials need purchasing, planning, storage, warehouse and production-supply extensions?
3. What Evidence created each requirement?
4. Which required relationships are completely absent?
5. Which relationships exist but contain defaults or missing process data?
6. Which materials are extended to the wrong organisational units?
7. Which materials have unnecessary or obsolete extensions?
8. Which gaps block a day-one capability?
9. Which workarounds are validated and time-bounded?
10. Which target Evidence proves that the final extension state exists?

These questions move the programme from object migration to operational readiness.

# The business value

Missing extensions create predictable post-go-live incidents:

- purchase orders cannot be created;
- MRP does not plan expected materials;
- stock cannot be managed in the intended location;
- warehouse processes fail or require manual handling;
- production replenishment is interrupted;
- logistics teams create emergency master-data changes;
- hypercare tickets move between MM, PP, EWM and data teams.

Detecting the gaps before cutover reduces:

- emergency extensions;
- production disruption;
- manual warehouse work;
- duplicated investigation;
- unclear ownership;
- false-green reporting.

The value is not just earlier error detection.

It is clearer operational scope.

Instead of reporting:

```
99.7% of materials were loaded.
```

the programme can report:

```
119,640 materials were created.

118,900 are fully extended for their intended capabilities.

410 require controlled temporary treatment.

210 have missing organisational relationships.

90 contain incomplete or contradictory extension data.

Twenty production-critical components
still block the production-supply gate.
```

That is a management statement.

It supports a real decision.

# Final perspective

A material extension is not a technical detail attached to a global record.

It is the relationship that permits the material to participate in a specific part of the operating model.

The practical test is:

> Can we prove that every material has every justified organisational relationship required for its day-one capabilities—and no critical relationship is being inferred from a global load-success rate?

When the answer is yes, extension readiness is governed.

When the answer is:

> The material number exists in the target,

we have proven identity creation.

We have not proven that purchasing, planning, inventory, warehouse or production can use it.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We are building Martenweave so that missing operational relationships are detected before they become warehouse, planning and production incidents.

Our operating model is:

```
Business capability defines the need.

Extension obligation defines the relationship.

Target Evidence proves existence.

Rules prove readiness.

Findings explain operational impact.

Exceptions preserve temporary limits.

AI proposes remediation.

Humans approve scope and model truth.
```

Martenweave is an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance, logistics and AMS teams.

## Sources and notes

This article was reviewed on 15 July 2026.

Martenweave Core currently describes a backend-first model-governance and Evidence layer that converts datasets, validation reports, Decisions and SAP context into canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-approved proposals.

Its current principles keep canonical files authoritative, generated indexes disposable, validation deterministic and AI-generated changes proposal-first.

Its documented workflow includes dataset and model-gap detection, lineage, impact analysis and a dataset-readiness command.

SAP describes SAP EWM as a warehouse-management system for high-volume operations that integrates warehouse and distribution processes with quality, production and track-and-trace. This supports the article’s argument that a material identifier alone does not establish warehouse or production-supply readiness.

SAP describes SAP Master Data Governance as a governance layer that preserves governed models, semantics and relationships, applies business Rules, supports matching and consolidation and maintains an audit trail. It also states that master-data integration distributes data in its current state rather than improving its quality. This distinction supports connecting MDG and replication Evidence to a separate migration-readiness assessment.

ExtensionObligation objects, capability profiles, extension-readiness states and the proposed commands are product directions. They should not be interpreted as guarantees of the exact current Martenweave schema, Workbench behaviour or CLI until implemented and released.

Martenweave is independent and is not affiliated with or endorsed by SAP.
