# How We Model Packaging Hierarchies Without Losing Logistics Meaning

**Reviewed: 15 July 2026**

The material migration team reports that packaging data is complete.

Every material has:

- a base unit;
- an order unit;
- an alternative unit;
- weight and dimensions;
- several conversion factors.

The warehouse team reports that packaging specifications were loaded.

The transport team has pallet dimensions.

Procurement has supplier pack quantities.

The technical results look acceptable.

Then operations begin.

A purchase order is raised for 100 boxes.

The supplier ships 100 cartons.

The warehouse scans the carton identifier and expects a different quantity.

The receipt is posted in pieces.

The pallet label represents another packaging level.

Transportation planning uses the pallet dimensions but the case weight.

Production requests individual components.

Inventory reconciliation shows an unexplained difference.

Every system contains packaging data.

The organisation does not have one agreed packaging model.

> A packaging hierarchy is not a list of units. It is a governed description of how a product is grouped, identified, handled, ordered, stored, transported and broken down across different processes.

This distinction matters because packaging data is often treated as a technical extension of units of measure.

The project creates rows such as:

```
1 BOX = 24 EA
1 CASE = 4 BOX
1 PAL = 20 CASE
```

That is useful arithmetic.

It does not yet explain:

- what kind of box is meant;
- whether the case is supplier packaging or internal warehouse packaging;
- whether the pallet is fixed or variable;
- whether the hierarchy applies globally;
- which location uses it;
- which supplier delivers it;
- which identifier belongs to each level;
- which dimensions and weights describe product, packaging or transport unit;
- whether the warehouse may break a case;
- whether production consumes the inner unit;
- whether the pallet is returnable;
- when the specification became effective.

If this context is lost, the conversion factors remain technically valid while the logistics meaning becomes ambiguous.

Martenweave should not execute packing, warehouse tasks or transportation planning.

Its role is to preserve the model behind those processes:

- packaging levels;
- containment relationships;
- applicability;
- identifiers;
- source authority;
- validation Rules;
- Decisions;
- Exceptions;
- Evidence;
- downstream impact.

The current Martenweave architecture already supports generic entities, attributes, relationships, datasets, mappings, Rules, Evidence, Decisions and change proposals. Canonical files remain the source of truth, deterministic validation runs before indexing, and AI-generated changes require human review.

Packaging is therefore not a separate product direction.

It is a strong logistics domain pack for the existing model-governance core.

# Our running case

We use one automotive component throughout the article.

```
Material:
AX-4711

Description:
Steering Assembly Fastener

Base unit:
EA

Supplier:
SUP-100

Plant:
DE10

Warehouse:
EWM-WH01
```

The intended packaging structure is:

```
Individual item:
1 EA

Supplier box:
24 EA

Warehouse case:
4 supplier boxes
96 EA

Transport pallet:
20 warehouse cases
1,920 EA
```

The project also has three identifiers:

```
GTIN-A:
individual item

GTIN-B:
supplier box

GTIN-C:
warehouse case
```

The pallet is identified through a logistics label created during shipping rather than through the same identifier used for the product packaging levels.

On paper, this appears straightforward.

The complexity begins when different teams describe the structure differently.

Procurement says:

```
1 carton = 24 EA
```

The warehouse says:

```
1 case = 96 EA
```

Transportation says:

```
1 pallet = 20 handling units
```

The supplier catalogue says:

```
1 outer pack = 4 inner packs
```

The words are not necessarily wrong.

They are incomplete.

“Carton,” “case,” “handling unit,” “outer pack” and “pallet” do not automatically form one hierarchy.

The project must establish whether they refer to:

- the same physical packaging level;
- different levels;
- different suppliers;
- different warehouses;
- different operating models;
- temporary repacking.

# Why managers should care

Packaging defects are often reported as local operational problems.

They rarely arrive with the label “packaging hierarchy defect.”

They appear as:

- unexpected receipt quantity;
- warehouse difference;
- over-picking;
- under-picking;
- replenishment failure;
- label mismatch;
- incorrect pallet count;
- transport-capacity error;
- wrong freight cost;
- damaged goods;
- invoice discrepancy;
- production shortage;
- return-processing problem.

The operational team sees the final symptom.

The underlying cause may be a model relationship several systems upstream.

For AX-4711:

```
Wrong case composition
→ wrong pallet quantity
→ wrong warehouse receipt expectation
→ wrong transport weight
→ wrong replenishment quantity
→ inventory difference
```

This is why packaging governance belongs above individual systems.

SAP describes EWM as managing high-volume warehouse operations and integrating warehouse processes with distribution, production, quality and track-and-trace. Packaging meaning therefore affects a broad operational network rather than one isolated field.

# The first mistake: storing the hierarchy as flat alternative units

A common representation is:

| Unit | Conversion to EA |
|---|---:|
| BOX | 24 |
| CASE | 96 |
| PAL | 1,920 |

This provides a conversion result.

It loses the containment structure.

The model no longer explains:

```
CASE contains BOX

PAL contains CASE
```

That matters because business processes may operate at intermediate levels.

The warehouse may receive and store cases.

Transportation may plan pallets.

Procurement may order boxes.

Production may consume pieces.

A flat list tells us that all levels are convertible to `EA`.

It does not tell us how they are physically related.

The hierarchy should preserve both:

## Quantity equivalence

```
1 CASE = 96 EA
```

## Containment relationship

```
1 CASE contains 4 BOX
```

The two statements are related but not identical.

The containment relationship can carry additional properties:

- orientation;
- packaging material;
- stackability;
- maximum layers;
- returnability;
- effective date;
- location applicability;
- supplier applicability.

# The second mistake: using labels as identity

Projects often map packaging levels by text.

Examples:

```
BOX
CASE
CARTON
OUTER
PACK
PALLET
```

The label is not the business identity.

Two systems can both use `CASE` for different levels.

One system may use `BOX` and another `CTN` for the same level.

We therefore need stable canonical packaging concepts.

For example:

```
PKG-AX-4711-EACH

PKG-AX-4711-SUPPLIER-BOX

PKG-AX-4711-WAREHOUSE-CASE

PKG-AX-4711-TRANSPORT-PALLET
```

System-specific codes map to these concepts.

The canonical object stores the meaning.

This prevents a code-conversion exercise from becoming an accidental semantic merge.

# The third mistake: treating every hierarchy as global

The supplier may deliver AX-4711 in boxes of 24.

Another supplier may deliver the same material in boxes of 20.

Warehouse EWM-WH01 may combine four boxes into one case.

Warehouse EWM-WH02 may store the boxes directly and never use the case level.

One distribution centre may build pallets of 20 cases.

Another may build pallets dynamically according to vehicle or customer requirements.

There may be no single global hierarchy.

The correct model may be:

```
Material
+
Supplier
+
Receiving location
+
Packaging specification
+
Effective period
```

Managers should be cautious when a project proposes:

> One standard packaging conversion for the material.

That can be correct.

It must be supported by a business Decision.

Without that Decision, a local packaging model may be applied globally because it is easier to migrate.

# The fourth mistake: confusing commercial packaging and warehouse packaging

Procurement needs to know how the supplier sells the product.

Warehouse operations needs to know how the product is handled internally.

These can be different.

For AX-4711:

```
Supplier commercial box:
24 EA
```

The warehouse may repack the product into:

```
Internal tote:
60 EA
```

The tote is not an alternative commercial order unit.

The supplier box is not necessarily the internal picking unit.

If both are represented simply as alternative units of the material, the model loses process meaning.

We should distinguish packaging roles such as:

- commercial order pack;
- supplier shipping pack;
- receiving unit;
- warehouse storage unit;
- picking unit;
- production-supply container;
- transport unit;
- customer shipping unit;
- returnable asset.

A packaging level can fulfil more than one role.

The role must be explicit.

# The fifth mistake: assuming a pallet is a fixed product unit

A pallet may be:

- a fixed packaging level;
- a transport unit assembled per shipment;
- a returnable asset;
- a mixed-product load carrier;
- a location-specific warehouse standard;
- a customer-specific shipping configuration.

For AX-4711, the programme may define:

```
1 PAL = 20 CASE
```

That can be valid for full-pallet supplier deliveries.

It may not apply when:

- partial pallets are shipped;
- pallets contain mixed materials;
- the warehouse rebuilds pallets;
- the customer requires another stack pattern;
- transport constraints reduce the number of layers.

Managers should ask:

> Is the pallet part of the product’s fixed packaging hierarchy, or is it a logistics unit created by an operational process?

This one question prevents many modelling errors.

A fixed packaging level belongs in the material packaging specification.

A dynamically created transport unit may require a different object and different Evidence.

# The sixth mistake: linking identifiers to the material but not the packaging level

An identifier can represent:

- one individual product;
- a box;
- a case;
- another trade-item configuration.

If the project stores all identifiers directly under the material, a scanner may identify the product without determining the represented quantity.

The relationship should be explicit:

```
Identifier
→ packaging level
→ contained quantity
→ material
```

For AX-4711:

```
GTIN-A
→ individual item
→ 1 EA

GTIN-B
→ supplier box
→ 24 EA

GTIN-C
→ warehouse case
→ 96 EA
```

The validation should detect:

- identifier linked to no level;
- two active identifiers assigned to contradictory levels;
- packaging level without expected identifier;
- identifier retained after packaging composition changed;
- identifier used outside its approved market or supplier scope.

SAP MDG emphasises preserving semantics and relationships across governed business entities, applying validated values and maintaining auditable changes. Packaging identifiers and levels should be governed as relationships, not merely stored as unrelated product attributes.

# The seventh mistake: mixing product dimensions with packaging dimensions

AX-4711 can have several dimensions.

## Product dimensions

The physical dimensions of one fastener.

## Box dimensions

The outer dimensions of the supplier box.

## Case dimensions

The dimensions of the warehouse case.

## Pallet dimensions

The overall dimensions of the transport pallet.

If the migration maps all values to generic fields such as:

```
LENGTH
WIDTH
HEIGHT
```

the target may receive valid numbers with the wrong meaning.

Transportation may plan capacity using product dimensions.

Warehouse slotting may use box dimensions when it needs case dimensions.

Label printing may use outdated pallet values.

The model should state:

```
Dimensions belong to PackagingLevel
```

not only:

```
Dimensions belong to Material
```

The same principle applies to weight.

We should distinguish:

- product net weight;
- packaging tare weight;
- packaging-level gross weight;
- transport-unit gross weight;
- maximum allowed weight;
- measured shipment weight.

# The eighth mistake: forgetting effective dates

Packaging changes.

Suppliers change box composition.

Warehouses introduce new totes.

Sustainability initiatives reduce packaging material.

A customer introduces a new labelling requirement.

A new pallet pattern becomes effective.

The hierarchy therefore needs time.

For example:

```
Until 31 August 2026:
1 BOX = 24 EA

From 1 September 2026:
1 BOX = 20 EA
```

This creates migration and cutover questions:

- Which open purchase orders use the old packaging?
- Which stock is already in the warehouse?
- Which labels are still valid?
- Which conversions should the target use at go-live?
- Can both specifications remain active temporarily?

Overwriting the old hierarchy removes historical meaning.

Keeping both without effective dates creates ambiguity.

# The ninth mistake: losing pack-breaking Rules

Mathematically:

```
1 CASE = 96 EA
```

Operationally, the warehouse may or may not be allowed to break the case.

If case breaking is prohibited:

```
Pick quantity:
multiples of 96 EA
```

If case breaking is allowed:

```
Pick quantity:
individual EA permitted
```

This affects:

- picking;
- replenishment;
- returns;
- inventory counting;
- order fulfilment;
- production supply.

The conversion factor does not express the policy.

We need a separate Rule:

```
Warehouse EWM-WH01
may break warehouse case
for production-supply picking.
```

Another warehouse may prohibit the same action.

The packaging hierarchy defines composition.

Process Rules define permitted handling.

# The tenth mistake: ignoring mixed and partial packaging

A clean hierarchy assumes that every parent contains only one child type and a fixed quantity.

Real logistics can include:

- partial cases;
- mixed pallets;
- nested returnable containers;
- promotional bundles;
- customer-specific assortments;
- variable-weight packs.

The canonical model should not pretend that every logistics unit is a fixed product packaging level.

We should distinguish:

## Fixed packaging specification

Known composition for one product or defined assortment.

## Operational handling unit

Actual logistics unit created, packed or repacked during execution.

Martenweave should govern the specification.

It should not become the runtime warehouse system storing every physical handling unit.

This keeps the product boundary clear.

# The eleventh mistake: treating returnable packaging as disposable hierarchy

Returnable containers, racks and pallets have their own lifecycle.

They may have:

- unique asset identifiers;
- ownership;
- location;
- condition;
- circulation Rules;
- deposit or accounting implications.

A returnable rack that contains 50 components is not only a packaging level.

It is also a managed asset.

For AX-4711, the future production-supply model may use:

```
Returnable tote:
60 EA

Tote owner:
Company

Return required:
Yes
```

The packaging hierarchy should reference the returnable packaging type.

The operational asset lifecycle remains in the appropriate execution system.

# The management solution: model packaging as a set of governed objects

A useful packaging model requires more than one table.

We need at least:

## PackagingLevel

Represents one defined level in the hierarchy.

Examples:

- individual item;
- supplier box;
- warehouse case;
- pallet.

## ContainsRelationship

Defines what one level contains.

Example:

```
1 warehouse case contains 4 supplier boxes
```

## PackagingRole

Defines how the level is used.

Examples:

- order unit;
- receiving unit;
- storage unit;
- picking unit;
- transport unit.

## Applicability

Defines where and when the specification applies.

Examples:

- supplier;
- Plant;
- warehouse;
- customer;
- process;
- effective date.

## IdentifierAssignment

Links an identifier to a packaging level.

## PhysicalProperties

Stores dimensions, tare weight, gross weight or capacity at the correct level.

## HandlingRule

Defines pack breaking, stacking, orientation or other operational restrictions.

## Evidence and Decision

Explains why this specification is accepted.

This looks more complex than a flat conversion table.

The operational complexity already exists.

The model makes it visible.

# A canonical example

The packaging hierarchy for AX-4711 might be represented conceptually as:

```
Individual item
  quantity: 1 EA
  role: production consumption

Supplier box
  contains: 24 individual items
  role:
    - purchasing
    - receiving
  supplier: SUP-100

Warehouse case
  contains: 4 supplier boxes
  total: 96 EA
  role:
    - storage
    - picking
  warehouse: EWM-WH01

Transport pallet
  contains: 20 warehouse cases
  total: 1,920 EA
  role:
    - transportation
  location: DE10
```

This structure allows us to ask:

- Is the hierarchy complete?
- Are the quantities internally consistent?
- Does every identifier reference one level?
- Are dimensions maintained at the correct level?
- Is the specification applicable to the current supplier and warehouse?
- Does the warehouse allow the required handling operation?
- Is the Evidence current?

# We validate the hierarchy, not only the values

Deterministic Rules can detect several important problems.

## Missing parent or child

A case references a box that does not exist.

## Circular containment

```
BOX contains CASE
CASE contains BOX
```

## Contradictory derived quantity

```
CASE contains 4 BOX
BOX contains 24 EA
CASE direct quantity says 80 EA
```

## Duplicate active level

Two active supplier-box specifications apply to the same supplier and period without a selection Rule.

## Missing applicability

A supplier-specific specification is treated as global.

## Identifier ambiguity

One active identifier points to two packaging levels.

## Physical inconsistency

The child packaging dimensions cannot fit the declared parent dimensions under the accepted arrangement.

## Weight inconsistency

Parent gross weight is lower than the combined child net weight.

## Effective-date overlap

Two incompatible packaging compositions are active for the same scope.

## Missing operational Rule

A process requires case breaking, but no approved handling Rule exists.

These validations turn packaging into a governed model rather than a collection of populated fields.

# We connect Findings to business consequences

A validation message should not stop at:

```
Packaging quantity mismatch.
```

For AX-4711, we can explain:

```
Canonical case quantity:
96 EA

EWM case quantity:
80 EA

Affected stock:
12,000 cases

Potential inventory difference:
192,000 EA

Affected processes:
receiving, storage, picking, production replenishment

Cutover consequence:
warehouse quantity reconciliation cannot be approved
```

This helps managers prioritize the issue.

A mismatch affecting a dormant material may be low priority.

A mismatch affecting production-critical components can block cutover.

# We distinguish data correction from model correction

Suppose the warehouse file is changed from 80 to 96 EA.

That may correct the immediate target record.

We still need to ask:

- Why did the file contain 80?
- Which source or Mapping produced it?
- Are other materials affected?
- Will the next load recreate the error?
- Is 96 valid for every supplier and warehouse?
- Does the canonical hierarchy need a new applicability condition?

A local correction can resolve one record.

A model correction prevents recurrence.

Martenweave should preserve both.

# We define evidence-backed closure

The packaging Finding should close only when current Evidence proves:

1. the hierarchy is internally consistent;
2. source authority is approved;
3. applicability is declared;
4. identifiers reference the correct levels;
5. dimensions and weights belong to the correct levels;
6. ERP and EWM use compatible quantities;
7. affected records were regenerated;
8. target reconciliation passes;
9. the required operational process has been tested.

For AX-4711:

```
Supplier box:
24 EA confirmed

Warehouse case:
4 BOX / 96 EA confirmed

Transport pallet:
20 CASE / 1,920 EA confirmed

Identifiers:
linked correctly

ERP target:
aligned

EWM target:
aligned

Receipt test:
passed

Picking test:
passed

Production replenishment test:
passed
```

A changed spreadsheet is not enough.

# The manager-focused dashboard

The Workbench should show packaging exposure in operational terms.

## Scope

```
Plant:
DE10

Warehouse:
EWM-WH01

Material category:
Production components

Materials:
2,000
```

## Packaging model health

```
Complete and consistent:
1,760

Contradictory containment:
65

Missing applicability:
50

Identifier ambiguity:
35

Dimensions assigned to wrong level:
40

Effective-date conflict:
20

Not assessed:
30
```

## Process impact

```
Purchasing affected:
70 materials

Warehouse receiving affected:
95 materials

Picking affected:
80 materials

Production supply affected:
25 critical materials

Transportation affected:
60 materials
```

## Critical Findings

- case quantity differs between ERP and EWM;
- pallet weight uses product rather than packaged weight;
- supplier-specific hierarchy applied globally;
- production tote missing from the model;
- identifier points to the wrong packaging level.

This gives management an actionable view.

# A focused Martenweave pilot

The pilot should remain narrow.

Choose:

```
Plant:
DE10

Warehouse:
EWM-WH01

Supplier:
SUP-100

Material category:
Production components

Population:
500 materials
```

Collect:

- material UoM data;
- supplier packaging specification;
- EWM packaging data;
- identifiers;
- weight and dimensions;
- current target reconciliation;
- operational Rules.

The pilot should answer:

1. What are the canonical packaging levels?
2. How does each level contain the next?
3. Which supplier and warehouse scope applies?
4. Which identifiers belong to which levels?
5. Which dimensions and weights describe each level?
6. Which systems disagree?
7. Which processes are affected?
8. Which current Evidence proves alignment?

This is enough to demonstrate business value.

We do not need to model the entire supply chain.

# The proposed Martenweave capability

## Governed Packaging Hierarchy

### Goal

Preserve packaging meaning across procurement, warehouse, production and transportation systems.

### Initial objects

- PackagingLevel;
- ContainsRelationship;
- PackagingRole;
- IdentifierAssignment;
- PhysicalProperties;
- HandlingRule;
- Applicability;
- Evidence;
- Decision;
- Finding.

### Initial validations

- missing level;
- circular containment;
- contradictory derived quantity;
- overlapping active specifications;
- missing applicability;
- ambiguous identifier;
- invalid weight or dimension relationship;
- missing handling policy;
- stale Evidence.

### Initial outputs

- canonical hierarchy;
- cross-system conflicts;
- affected materials;
- operational impact;
- readiness by process;
- remediation proposal;
- closure criteria.

# A conceptual packaging object

```
---
id: PKG-AX-4711-WAREHOUSE-CASE
type: PackagingLevel

material:
  AX-4711

role:
  - storage
  - picking

contains:
  packaging_level: PKG-AX-4711-SUPPLIER-BOX
  quantity: 4

derived_quantity:
  unit: EA
  value: 96

applicability:
  warehouse: EWM-WH01
  supplier: SUP-100

identifier:
  GTIN-C

physical_properties:
  gross_weight_kg: 59
  length_mm: 600
  width_mm: 400
  height_mm: 300

authority:
  DATASET-APPROVED-PACKAGING-SPEC

owner:
  ROLE-WAREHOUSE-PACKAGING-OWNER
---
```

This is a proposed product direction.

It is not a claim about the exact current Martenweave schema.

# Proposed commands

A future CLI might support:

```
martenweave logistics packaging-hierarchy \
  AX-4711 \
  --repo ./model
```

```
martenweave logistics validate-packaging \
  --dataset ./data/packaging-rc4.xlsx \
  --repo ./model
```

```
martenweave logistics packaging-conflicts \
  --plant DE10 \
  --warehouse EWM-WH01 \
  --repo ./model
```

```
martenweave logistics packaging-impact \
  PKG-AX-4711-WAREHOUSE-CASE \
  --repo ./model
```

```
martenweave logistics propose-packaging-fix \
  FIND-AX-4711-CASE-MISMATCH \
  --dry-run \
  --repo ./model
```

These commands describe a recommended product direction.

They are not part of the currently documented CLI.

The current Martenweave core already provides canonical files, deterministic validation, dataset-gap detection, lineage, impact analysis and proposal-first change handling that can support this slice.

# What managers should require

## Require a hierarchy, not only conversions

Every packaging level should have a stable identity and explicit containment relationship.

## Require scope

Supplier-, warehouse-, customer- and location-specific packaging must remain scoped.

## Require packaging roles

Commercial, warehouse, production and transportation packaging should not be merged without an approved Decision.

## Require identifier-to-level mapping

An identifier should never float under the material without a declared packaging level.

## Require level-specific dimensions and weights

Do not use generic product measurements for every logistics process.

## Require handling Rules

Pack breaking, stacking, orientation and returnability must remain visible.

## Require effective dates

Packaging changes should not overwrite history or create overlapping ambiguity.

## Require cross-system reconciliation

ERP, EWM, supplier data and transportation assumptions should be compared against one canonical hierarchy.

## Require evidence-backed closure

A corrected conversion is not sufficient until the target state and process are revalidated.

# The questions managers should ask

1. What packaging levels exist for this product?
2. Which level contains which other level?
3. Is the hierarchy global, supplier-specific, warehouse-specific or customer-specific?
4. Which packaging level is used for purchasing?
5. Which is used for receiving, storage and picking?
6. Which is used for production supply?
7. Which is used for transportation planning?
8. Which identifier belongs to each level?
9. Which dimensions and weights apply to each level?
10. Are pallets fixed packaging levels or dynamically created transport units?
11. May warehouses break boxes or cases?
12. Which packaging is returnable?
13. Which specifications are active at cutover?
14. Which current Evidence proves that ERP, EWM and partner data agree?

A programme that cannot answer these questions does not yet have a governed packaging model.

# The business value

Packaging governance reduces:

- receiving discrepancies;
- incorrect inventory;
- picking and replenishment errors;
- production shortages;
- labelling mistakes;
- freight-planning errors;
- warehouse-space miscalculations;
- manual repacking;
- repeated disputes between Procurement, warehouse and transport teams.

It also improves management reporting.

Instead of:

```
99 percent of packaging fields are populated.
```

the programme can report:

```
1,760 materials have complete,
consistent and applicable packaging hierarchies.

65 contain contradictory levels.

35 have ambiguous identifiers.

25 production-critical materials
remain unsafe for replenishment.

The warehouse cutover gate is blocked
for eight high-volume components.
```

That statement supports action.

# Final perspective

A packaging hierarchy is not an arithmetic convenience.

It is a model of how the organisation physically and commercially handles a product.

The practical test is:

> Can we trace each order unit, handling unit, identifier, dimension, weight and transport assumption to one explicit packaging level with known applicability and current Evidence?

When the answer is yes, packaging meaning is governed.

When the answer is:

> BOX, CASE and PAL all have conversion factors,

we know that the system can perform arithmetic.

We do not yet know whether Procurement, warehouse, production and transportation are describing the same physical reality.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We are building Martenweave so that packaging structures become traceable model relationships instead of hidden assumptions distributed across material masters, warehouse files, supplier catalogues and transport spreadsheets.

Our operating model is:

```
Packaging levels define physical meaning.

Containment relationships define structure.

Applicability defines where it is valid.

Identifiers connect scans to quantities.

Rules validate consistency.

Lineage shows operational impact.

Evidence proves the current target state.

AI proposes corrections.

Humans approve authority and scope.
```

Martenweave is an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance, logistics and AMS teams.

## Sources and notes

This article was reviewed on 15 July 2026.

Martenweave Core currently describes a backend-first model-governance pipeline that converts datasets, validation reports, Decisions and SAP context into canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-approved proposals.

Its current principles keep canonical files authoritative, generated indexes disposable, validation deterministic and AI-generated changes proposal-first.

Its documented workflow moves from source Evidence through validation, gaps, lineage and impact analysis to reviewed proposals and GitHub delivery.

SAP describes SAP EWM as supporting high-volume warehouse operations and integrating warehouse and distribution processes with production, quality and track-and-trace. This supports the article’s argument that packaging data affects a connected operational network rather than one isolated product field.

SAP describes SAP Master Data Governance as preserving semantics and relationships across governed models, applying validated values and business Rules, supporting matching and reconciliation and maintaining an audit trail. The proposed packaging hierarchy applies these governance principles to cross-system logistics relationships and migration Evidence.

The PackagingLevel, ContainsRelationship, PackagingRole and IdentifierAssignment objects, hierarchy validations and proposed commands are product directions. They should not be interpreted as guarantees of the exact current Martenweave schema, Workbench behaviour or CLI until implemented and released.

Martenweave is independent and is not affiliated with or endorsed by SAP.
