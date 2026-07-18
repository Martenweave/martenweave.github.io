# Why Migration Mapping Workbooks Become Technical Debt—and What Should Replace Them

**Reviewed: 14 July 2026**

A migration programme creates a mapping workbook for Product planning data.

At first, the workbook is useful.

It contains:

- source columns;
- SAP target fields;
- transformation notes;
- value mappings;
- requiredness;
- responsible owners;
- comments from workshops.

The file gives business experts and migration developers a shared place to work. It can be opened without specialist software. Rows can be filtered, coloured and discussed during meetings.

Then the programme progresses.

A Plant column is added to the source extract.

The MRP Controller logic becomes Plant-specific.

A temporary fallback is introduced for two Plants.

One workshop changes the interpretation of Planner Group.

Mock Load 2 exposes several unmapped values.

Mock Load 3 uses a revised conversion table.

A developer implements another exception directly in transformation code.

A local business owner approves the fallback in an email.

Someone adds a yellow comment to the workbook:

> Check before cutover.

Another person creates `Product_Mapping_FINAL_v7_reviewed.xlsx`.

The original workbook is still open on a shared drive.

A copy is attached to a ticket.

Another copy is stored in the cutover folder.

The transformation code no longer matches any single version exactly.

The programme still says:

> The mapping workbook is our source of truth.

It is not.

It has become a partial, manually maintained representation of a model that now exists across:

- spreadsheet cells;
- comments;
- colour conventions;
- transformation code;
- validation reports;
- tickets;
- decisions;
- individual memory.

This is the central problem.

> A mapping workbook becomes technical debt when it stops being a temporary collaboration surface and starts acting as an unvalidated executable model.

The problem is not that spreadsheets are inherently bad.

The problem is that the programme begins to depend on a spreadsheet for responsibilities it cannot reliably fulfil:

- stable object identity;
- deterministic validation;
- reference integrity;
- versioned semantic change;
- lineage;
- impact analysis;
- evidence linkage;
- automated reuse;
- controlled AI access.

Research on operational spreadsheets has repeatedly found that errors can occur in real spreadsheet use and that some errors have material consequences, while error detection depends heavily on inspection and user behaviour.

A migration workbook can remain helpful.

It should not own model truth.

Martenweave’s product position is that spreadsheets, datasets, tickets, validation reports, decisions and SAP context should feed a canonical model layer rather than collectively pretending to be one. The current repository describes canonical files, deterministic validation, gap detection, lineage, impact analysis and human-approved proposals as the controlled pipeline around that model.

---

# The workbook begins as a view and becomes a system

The Product planning workbook starts with a familiar structure:

| Source field | Target field | Rule | Status |
|---|---|---|---|
| `PLANNER_GROUP` | MRP Controller | Convert through lookup | Approved |
| `MRP_TYPE` | MRP Type | Direct with value conversion | Approved |
| `PROCUREMENT_TYPE` | Procurement Type | Direct | Approved |

This is easy to understand.

The hidden complexity appears when the team discovers that planning data belongs to Product Plant rather than global Product.

The MRP Controller Mapping actually needs:

```text
Planner Group
+
Plant
→ plant-specific MRP Controller
```

The workbook now has to represent more than a field-to-field mapping.

It must represent:

- the Product Plant Entity;
- Plant as a contextual key;
- the relationship between Product and Plant;
- the applicable source system;
- a plant-specific value table;
- a temporary fallback;
- the scope of that fallback;
- its expiry;
- the evidence supporting it;
- the owner who approved it.

A row-oriented spreadsheet can store text describing all of this.

That does not make the structure explicit.

The programme has moved from documenting a transformation to maintaining a model.

---

# The first debt: meaning is encoded in layout

Spreadsheet logic often depends on conventions that are clear only to the current team.

For example:

- yellow means business review required;
- green means approved;
- grey means out of scope;
- blank means either not applicable or not yet analysed;
- comments contain exceptions;
- strikethrough means retired;
- a separate tab contains the latest value mapping;
- bold rows identify critical fields.

These conventions are readable to people who already know them.

They are weak machine contracts.

A validator cannot safely infer whether:

```text
blank status
```

means:

```text
not applicable
```

or:

```text
decision missing
```

An AI agent may interpret colour, comments and neighbouring cells, but the result remains probabilistic.

The model needs explicit states:

```text
status: approved
applicability: product_plant
fallback_status: temporary
decision_required: false
```

When meaning depends on presentation, the workbook is not merely storing data.

Its visual structure is carrying business logic.

That logic is difficult to test.

---

# The second debt: one row hides several objects

The workbook row says:

```text
PLANNER_GROUP → MRP Controller
```

The actual model contains several distinct objects:

- Planner Group business Attribute;
- source FieldEndpoint;
- Product Plant MRP Controller Attribute;
- SAP target FieldEndpoint;
- Mapping;
- Plant contextual input;
- conversion value list;
- validation Rule;
- temporary fallback;
- Evidence;
- Decision.

These objects have different lifecycles.

The source field may be retired.

The business Attribute may remain.

The Mapping may change.

The target implementation may move to another API or field.

The fallback may expire.

The Evidence may become stale.

The Decision may be superseded.

When everything is represented by one workbook row, the programme loses these distinctions.

A change to any part becomes an edit to the same row.

The row no longer communicates which object changed.

---

# The third debt: there is no stable identity

The workbook identifies the Mapping by its position:

```text
Sheet: Product Planning
Row: 47
```

Then someone sorts the sheet.

Another person inserts ten rows.

A new version renames the tab.

A developer copies the row into a technical specification.

A ticket refers to:

> MRP Controller mapping in the latest workbook.

None of these references is stable.

A canonical registry should use an identifier such as:

```text
MAP-PRODUCT-PLANT-MRP-CONTROLLER
```

Then the same Mapping can be referenced by:

- a dataset gap;
- a validation error;
- a Decision;
- a PatchProposal;
- an issue;
- a test;
- an AMS incident;
- an AI agent.

Stable identity turns a temporary document location into a reusable project object.

---

# The fourth debt: changes cannot be interpreted reliably

Two workbook versions can be compared at the file level.

The comparison does not necessarily explain the semantic change.

Suppose version 6 says:

```text
Default MRP Controller:
001
```

Version 7 says:

```text
Default MRP Controller:
001, except PL20 and PL30
```

What changed?

Possibilities include:

- the fallback scope narrowed;
- new plant-specific conversions were approved;
- the Plants moved into another wave;
- the fallback was found unsafe;
- the target configuration changed;
- someone edited the note without changing the code.

A spreadsheet diff can show that text changed.

A model diff should say:

```text
Fallback applicability changed.

Removed scope:
- PL20
- PL30

Affected Mapping:
MAP-PRODUCT-PLANT-MRP-CONTROLLER

Affected population:
1,840 Product Plant records

Required retest:
Plant planning scenario
```

This is the difference between file comparison and model comparison.

---

# The fifth debt: reference errors remain invisible

The workbook may refer to:

- a source field that was renamed;
- a target field that was retired;
- a value list that no longer exists;
- an owner who left the programme;
- a Rule stored on another tab;
- a Plant outside the current wave.

Spreadsheets can validate cell formats and formulas.

They do not automatically validate a typed enterprise model unless substantial custom logic is built around them.

A canonical registry can enforce:

- every referenced object exists;
- IDs are unique;
- Mapping inputs have allowed types;
- target Attributes belong to the correct Entity;
- contextual keys match the target grain;
- fallback references are valid;
- ownership and domain requirements are satisfied.

Martenweave’s current core principles explicitly place deterministic validation before indexing and treat generated SQLite and JSONL outputs as rebuildable rather than authoritative.

That design matters because a model error should fail predictably.

It should not remain hidden in a comment until cutover.

---

# The sixth debt: the workbook and implementation drift apart

The Product planning workbook specifies:

```text
Use Planner Group and Plant.
```

The transformation code implements:

```text
Use Planner Group and Plant.

When conversion is missing:
assign controller 001.
```

Later, a developer adds:

```text
For PL30:
use controller 030.
```

The workbook is not updated.

Mock Load 3 succeeds.

The team begins treating the production output as evidence that the Mapping is correct.

There are now at least three states:

## Documented state

What the workbook says.

## Implemented state

What the code does.

## Observed state

What the mock load produced.

Without a canonical model, the programme cannot compare them cleanly.

The transformation code may become the de facto source of truth even though business owners cannot review it.

Alternatively, the workbook may remain the declared source of truth even though it no longer describes execution.

Both conditions are dangerous.

---

# The seventh debt: evidence is disconnected from the mapping

Mock Load 3 shows that 94 percent of Product Plant records receive an approved MRP Controller.

Six percent use fallback `001`.

The result is stored in a validation report.

The workbook contains:

```text
Status:
Approved
```

What does “Approved” mean?

- The business logic was approved?
- The Mapping was technically implemented?
- The mock-load result was accepted?
- The fallback was approved?
- The six percent were reviewed?
- The whole wave is ready?

The status compresses several distinct claims into one cell.

A model registry should link evidence to specific claims:

```text
Claim:
Plant-specific Mapping covers 94% of Wave 1 Product Plant records.

Evidence:
EVID-MOCK3-MRP-CONTROLLER-COVERAGE

Claim:
Fallback 001 is permitted for the remaining population.

Decision:
DEC-PLANNING-FALLBACK-017
```

Evidence does not merely sit beside the Mapping.

It supports a declared assertion about it.

---

# The eighth debt: temporary logic becomes permanent

Migration workbooks contain many practical compromises:

- default values;
- manual corrections;
- temporary source precedence;
- wave-specific exceptions;
- cutover-only rules.

These are often necessary.

The debt appears when the workbook cannot enforce:

- expiry;
- scope;
- owner;
- remediation;
- prohibition of future use.

In the Product planning case, fallback `001` may have been approved for Mock Load 2 only.

Because it remains in the workbook and code, it survives into Mock Load 3 and cutover rehearsal.

The temporary path becomes permanent through inertia.

A governed fallback should state:

```text
fallback:
  value: "001"
  scope:
    plants:
      - PL20
      - PL30
  valid_until: 2026-09-30
  approved_by: ROLE-PRODUCTION-PLANNING-OWNER
  remediation: complete plant-specific conversion
```

The exact schema may differ.

The essential point is that temporariness must be machine-visible.

---

# The ninth debt: impact is reconstructed manually

A business owner proposes changing the Product Plant MRP Controller logic.

The team asks:

> What else is affected?

People search:

- workbook tabs;
- technical specifications;
- transformation jobs;
- test scripts;
- interface documents;
- issue trackers.

The answer depends on who remembers the landscape.

A canonical model can traverse from the Mapping to:

- source DatasetFields;
- Product Plant Attribute;
- target endpoint;
- validation Rule;
- fallback;
- Evidence;
- downstream interface;
- planning process;
- owner.

The impact set may still require business interpretation.

It should not require document archaeology.

---

# The tenth debt: AI amplifies ambiguity

Without a structured model, an AI agent can read the workbook and propose changes.

It may do so convincingly.

The problem is that the workbook contains implicit conventions and outdated fragments.

The agent may:

- treat a comment as approved policy;
- use the newest worksheet as authoritative;
- interpret a blank as optional;
- merge conflicting rows;
- mistake an example value for a default;
- update one workbook copy while implementation uses another.

AI does not remove spreadsheet ambiguity.

It can make ambiguous interpretation faster.

Martenweave’s current product principle is that AI produces `PatchProposal` objects for review rather than silently changing canonical files.

That principle becomes useful only when the canonical model itself is explicit.

An agent cannot propose safely against a source of truth that nobody can identify.

---

# What should replace the workbook as source of truth

The answer is not a larger spreadsheet.

It is also not a large new SaaS application.

The replacement should be a small set of canonical, typed, version-controlled objects.

For the Product planning case, the minimum model includes:

## Entity

```text
Product Plant
```

## Attributes

```text
Planner Group
Plant
MRP Controller
```

## Field endpoints

```text
Legacy planner-group column
Legacy Plant column
SAP MRP Controller field
```

## Mapping

```text
Planner Group + Plant
→ plant-specific MRP Controller
```

## Rule

```text
Plant is required for Product Plant planning assignment.
```

## Fallback

```text
Controller 001 for explicitly approved scope only.
```

## Evidence

```text
Mock Load 3 coverage report.
```

## Decision

```text
Production Planning approval of plant-specific derivation.
```

## Finding

```text
Six percent of records remain outside approved conversion.
```

## PatchProposal

```text
Add PL30 conversions and retire fallback for that Plant.
```

This is enough to create a usable governance loop.

---

# What the canonical representation could look like

A simplified Mapping object might be:

```
---
id: MAP-PRODUCT-PLANT-MRP-CONTROLLER
type: Mapping
status: approved

source_inputs:
  - id: FEP-LEGACY-PLANNER-GROUP
    role: direct
  - id: FEP-LEGACY-PLANT
    role: conditional_context

target:
  id: ATTR-PRODUCT-PLANT-MRP-CONTROLLER

transformation:
  type: value_lookup
  value_list: VL-PLANT-PLANNER-TO-MRP-CONTROLLER

fallback:
  id: FALLBACK-MRP-CONTROLLER-001
---

Derive the MRP Controller from legacy Planner Group
using the Plant-specific conversion table.
```

This is not intended as a guarantee of the current Martenweave schema.

It illustrates the properties the model needs:

- stable ID;
- type;
- explicit inputs;
- input roles;
- target;
- transformation;
- fallback reference;
- readable explanation.

The object can be validated without removing its human-readable form.

---

# The workbook should remain as an interface

Replacing the workbook as source of truth does not mean banning Excel.

Business users may still prefer a tabular review.

Martenweave should generate or import workbook views.

The correct relationship is:

```text
Canonical model
→ generated review workbook
```

and:

```text
edited workbook
→ proposed model changes
→ validation
→ review
```

It should not be:

```text
edited workbook
→ silent overwrite of model truth
```

A generated workbook can include:

- business labels;
- source and target fields;
- Mapping status;
- owners;
- open Findings;
- readiness;
- evidence links.

It becomes a view of the model.

It is disposable and reproducible.

---

# Workbook edits should become proposals

Suppose a business owner changes fallback scope in the workbook:

```text
Remove PL30 from controller 001 fallback.
```

The import process should create:

```text
PatchProposal:
Restrict FALLBACK-MRP-CONTROLLER-001.

Removed scope:
PL30.

Affected records:
640.

Required reviewer:
Plant PL30 Planning Owner.
```

The proposal is then:

- validated;
- impact-assessed;
- reviewed;
- accepted or rejected.

This preserves the convenience of spreadsheet collaboration without granting every cell edit authority over the canonical model.

---

# The product value is not file conversion

A weak product would convert Excel rows into YAML.

That is useful for initial import.

It is not the main value.

The product must preserve distinctions that the workbook blurred:

- business object versus physical field;
- direct input versus contextual input;
- Mapping versus Rule;
- observed evidence versus approved Decision;
- fallback versus normal path;
- current state versus candidate state;
- model change versus implementation task.

Martenweave becomes valuable when those distinctions drive:

- validation;
- gap detection;
- lineage;
- impact;
- proposals;
- review.

File conversion is only the entry point.

---

# A realistic migration path away from workbook ownership

Programmes cannot replace a large workbook in one step.

A practical transition can use five stages.

## Stage 1: inventory

Identify:

- workbook versions;
- tabs;
- owners;
- mappings;
- code lists;
- comments;
- unresolved decisions.

Do not attempt full automation yet.

## Stage 2: extract stable objects

Create canonical objects for:

- important Entities;
- critical Attributes;
- source and target endpoints;
- high-risk Mappings.

Start with one domain slice.

## Stage 3: validate references

Check:

- missing endpoints;
- duplicate mappings;
- incompatible grain;
- unresolved owners;
- invalid value-list references.

## Stage 4: generate the workbook

Create a review view from canonical files.

Compare it with the historical workbook.

## Stage 5: proposal-only imports

Treat future workbook edits as candidate changes rather than direct truth.

This transition reduces risk without requiring the programme to abandon familiar working practices.

---

# The first Martenweave pilot should use one mapping workbook

A strong pilot does not need the entire migration estate.

Use the Product planning workbook.

## Input

- current mapping workbook;
- one source dataset;
- one mock-load report;
- one target-field list;
- one planning Decision.

## Canonical scope

- Product Plant;
- Plant;
- Planner Group;
- MRP Controller;
- one Mapping;
- one fallback;
- one Rule;
- one Evidence object.

## Demonstration

1. import the workbook;
2. create stable model objects;
3. validate references;
4. profile the source dataset;
5. detect missing or incomplete Plant context;
6. show current lineage;
7. render the workbook from the model;
8. propose a fallback-scope change;
9. calculate affected records;
10. approve through Git review.

The pilot demonstrates the whole product thesis with one meaningful Mapping.

---

# What current Martenweave already provides

The current repository describes Martenweave as a backend-first canonical model layer designed to be embedded in pipelines, IDEs, local APIs, MCP servers and agent workflows. Its Workbench reads through the local API and does not store independent model truth.

Its documented pipeline includes:

- evidence import and profiling;
- deterministic validation;
- generated indexing;
- dataset and model gap detection;
- lineage;
- impact analysis;
- AI PatchProposals;
- human-reviewed GitHub issues and pull requests.

That foundation is suitable for replacing workbook ownership without replacing workbook usability.

---

# What Martenweave should implement next

The next focused product slice should be **Mapping Workbook Intake and Round-Trip Review**.

## Goal

Convert one mapping workbook into validated canonical model objects while preserving Excel as a review interface.

## Initial scope

Support a controlled workbook template with:

- source field;
- source system;
- business Attribute;
- target field;
- Mapping type;
- contextual inputs;
- value-list reference;
- Rule reference;
- owner;
- status;
- notes.

## Import behaviour

The importer should:

1. identify existing canonical objects by stable ID;
2. propose new objects where no match exists;
3. detect duplicate or conflicting rows;
4. separate comments from structured fields;
5. create Findings for unresolved ambiguity;
6. generate PatchProposals rather than overwrite files.

## Export behaviour

The exporter should generate a workbook containing:

- stable IDs;
- business labels;
- source and target endpoints;
- Mapping summary;
- validation status;
- Evidence status;
- open Findings;
- proposal status.

## Acceptance criteria

The Product planning workbook must no longer be the only place where the MRP Controller logic exists.

The system must be able to answer:

- What is the canonical Mapping ID?
- Which inputs are direct and contextual?
- Which Plant scope uses fallback?
- Which Evidence supports the Mapping?
- Which records are affected by a proposed change?
- Which workbook version was generated from which model commit?

## Proposed commands

```
martenweave workbook import \
  ./inputs/product-planning-mapping.xlsx \
  --repo ./model \
  --proposal-only
```

```
martenweave workbook export \
  --repo ./model \
  --domain product-planning \
  --out ./reviews/product-planning-mapping.xlsx
```

These commands describe a recommended product direction rather than the current documented CLI contract.

---

# The governance rule that matters

The migration team should adopt one simple rule:

> A spreadsheet can propose model truth, but it cannot silently own it.

That rule allows:

- business-friendly collaboration;
- local analysis;
- filters and comments;
- familiar review.

It prevents:

- uncontrolled copies;
- invisible semantic changes;
- implementation drift;
- unvalidated references;
- unaudited AI edits.

The canonical model remains in version-controlled files.

The workbook remains a generated or importable interface.

---

# Why not store everything in a database UI

A central application could solve part of the workbook problem.

It might provide:

- forms;
- permissions;
- audit logs;
- workflows;
- validation.

That can be useful.

It also creates a new dependency:

- the UI becomes the only place where the model can be edited;
- exporting the complete model becomes difficult;
- automation depends on application APIs;
- local project use may become costly;
- AI agents require another hosted service;
- the organisation may inherit vendor lock-in.

Martenweave’s local-first, file-canonical design avoids making the Workbench the owner of truth. The repository explicitly defines the Workbench as a local review and investigation surface over the backend model rather than an independent hosted application.

The point is not that databases are wrong.

The point is that the model should remain portable, reviewable and reconstructable outside one UI.

---

# The economic pain behind the workbook

The technical debt creates measurable costs:

- repeated mapping workshops;
- manual comparison of workbook versions;
- uncertainty over which file is current;
- duplicate implementation;
- delayed impact analysis;
- defects rediscovered in each mock load;
- consultants spending time reconstructing decisions;
- fragile handover to AMS;
- weak reuse between migration waves.

The workbook seems inexpensive because the software already exists.

The cost appears later as coordination, rework and lost reasoning.

A canonical registry does not remove the need for business discussion.

It prevents each discussion from starting from incomplete memory.

---

# Final perspective

Migration mapping workbooks are useful because they provide a flexible shared surface during uncertain work.

They become technical debt when the programme expects them to behave like a governed model system.

The Product planning workbook illustrates the transition.

At first, it documents:

```text
Planner Group → MRP Controller
```

Later, it must also represent:

- Product Plant grain;
- Plant context;
- source authority;
- value mappings;
- fallback scope;
- expiry;
- Evidence;
- Decisions;
- affected population;
- downstream impact.

At that point, the workbook is no longer a simple specification.

It is an implicit model registry without reliable validation, identity or change control.

The replacement should not eliminate the workbook.

It should change its role:

```text
Workbook:
human review and collaboration

Martenweave:
canonical model truth

Validators:
structural assurance

AI:
candidate proposals

Git:
approved history
```

The practical test is:

> Can the programme regenerate the mapping workbook from a validated model, explain every important Mapping through stable objects and Evidence, and treat workbook edits as proposals rather than silent truth?

When the answer is yes, Excel remains useful without carrying the full governance burden.

When the answer is:

> The latest workbook is somewhere in the cutover folder,

the programme is operating a critical model through document archaeology.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

Its role is not to ban spreadsheets.

Its role is to convert spreadsheet knowledge into:

- stable canonical objects;
- deterministic validation;
- traceable lineage;
- impact-aware change;
- reviewable proposals;
- reusable project memory.

The workbook should remain familiar.

The model underneath it should become dependable.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave currently states that spreadsheets, datasets, tickets, validation reports, Decisions and SAP context feed a canonical model layer with deterministic validation, dataset-gap reports, lineage, impact analysis and human-approved PatchProposals.

Its current principles define canonical Markdown and YAML files as the source of truth, generated SQLite and JSONL indexes as disposable, deterministic validation as mandatory before indexing and AI changes as proposal-first.

The current documented pipeline moves from evidence and profiling through validation, indexing, gap detection, lineage and impact to proposals and human-reviewed Git work.

An empirical study of operational spreadsheets found formula-cell errors across the audited spreadsheets and showed that the practical impact ranged from immaterial to substantial. Another experimental study found that error correction was related to how thoroughly users inspected spreadsheet cells. These studies do not prove that every migration workbook contains defects, but they support the general control concern that spreadsheet correctness depends heavily on human inspection and that material errors can survive in operational use.

The workbook importer, round-trip export and proposed commands described here are product directions. They should not be interpreted as guarantees of the exact current importer, workbook schema or CLI unless separately implemented and published.

Martenweave is independent and is not affiliated with or endorsed by SAP or Microsoft.
