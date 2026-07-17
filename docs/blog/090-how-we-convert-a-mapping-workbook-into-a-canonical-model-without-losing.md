# How We Convert a Mapping Workbook into a Canonical Model Without Losing Business Context

**Reviewed: 14 July 2026**

When we receive a migration mapping workbook, our first instinct should not be to convert every row into YAML.

That would preserve the cells.

It might lose the model.

A serious mapping workbook contains more than source and target fields. It usually contains years of accumulated project knowledge:

- business definitions;
- field interpretations;
- organisational scope;
- exceptions;
- temporary defaults;
- unresolved questions;
- workshop decisions;
- technical assumptions;
- ownership;
- evidence references;
- implementation status.

Much of this context is not stored in clearly labelled columns.

It may exist in:

- cell comments;
- colours;
- hidden sheets;
- merged cells;
- formulas;
- notes such as “check with Finance”;
- filenames such as `FINAL_v8_APPROVED`;
- conversations outside the workbook.

If we simply import rows, we can create a structured representation that looks cleaner while becoming less truthful.

The real product problem is therefore not:

> How do we move Excel into Markdown or YAML?

It is:

> How do we identify the business objects, claims, decisions and dependencies hidden inside a workbook, preserve their context, and turn them into a model that can be validated and changed safely?

Our answer is not to eliminate the workbook.

We change its role.

The workbook remains a useful review and collaboration surface.

The canonical model becomes the source of truth.

Martenweave’s current architecture is designed around that separation. Canonical model files own truth, generated indexes remain disposable, deterministic validation happens before indexing, and AI-generated changes are represented as reviewable proposals rather than silent mutations.

Our working principle is:

```
Workbook:
human collaboration and evidence intake

Canonical model:
stable business and technical truth

Generated workbook:
reviewable projection of the model

Workbook edits:
candidate changes, not automatic truth
```

This article explains how we make that transition using one continuous Product planning case.

---

# The workbook we receive

The migration team gives us a workbook called:

```
Product_Planning_Mapping_FINAL_v7.xlsx
```

The main sheet contains rows for Product planning fields.

One row looks approximately like this:

| Source | Target | Mapping | Status | Comment |
|---|---|---|---|---|
| `PLANNER_GROUP` | MRP Controller | Lookup | Approved | Plant-specific; default 001 where missing |

At first glance, the row appears understandable.

It tells us that:

- Planner Group is the source;
- MRP Controller is the target;
- a lookup performs the conversion;
- the Mapping is approved;
- Plant affects the result;
- `001` is used as a default.

But the row hides almost every question that matters.

What does “Plant-specific” mean?

Where does Plant come from?

Is Plant a Mapping input or only a comment?

Which lookup table is current?

Does default `001` apply to every Plant?

Was the default approved for production or only for a mock load?

Does “Approved” apply to the Mapping, the target field, the default or the entire row?

Who approved it?

Which evidence supports the conclusion?

How many Product Plant records use the fallback?

Does the implemented transformation match the workbook?

A direct row-to-object conversion cannot answer these questions.

We need to reconstruct the model that the row is trying to describe.

---

# We begin by treating the workbook as evidence

The workbook is not automatically authoritative because somebody called it “final.”

We first register it as an observed source.

Conceptually:

```
Evidence:
Product_Planning_Mapping_FINAL_v7.xlsx

Observed:
Sheet contains a row linking PLANNER_GROUP
to MRP Controller.

Observed note:
“Plant-specific; default 001 where missing.”

Authority:
Not yet established.
```

This distinction is essential.

The workbook proves that the project documented a particular interpretation.

It does not by itself prove that:

- the interpretation is current;
- the logic was implemented;
- the default was formally approved;
- no later Decision superseded it.

We preserve the workbook, its fingerprint, its date and its source.

We do not immediately promote every cell into canonical truth.

The W3C PROV model makes a similar general distinction useful for provenance systems: information can be represented as entities generated or used by activities and associated with agents, while derivation and attribution remain explicit relationships rather than implicit assumptions.

Martenweave does not need to reproduce PROV-O in full.

We do need the same discipline:

> We record where a claim came from before deciding whether the claim becomes model truth.

---

# We reconstruct the business sentence

Before modelling fields, we write the business interpretation in plain language.

From the workbook row, source data and project notes, we may derive this candidate statement:

> For each Product Plant, MRP Controller is derived from legacy Planner Group through a Plant-specific conversion. Where no approved conversion exists, controller `001` has been used as a temporary fallback.

This sentence is more valuable than the original row because it exposes the important concepts:

- Product Plant;
- MRP Controller;
- Planner Group;
- Plant;
- conversion;
- fallback;
- temporary status.

It also exposes uncertainty.

The sentence does not yet tell us whether the fallback is approved for the current baseline.

That becomes an explicit Finding rather than an assumption hidden in a comment.

---

# We identify the grain before the fields

The most important modelling decision is not the source column.

It is the business grain.

The workbook says:

```
Target:
MRP Controller
```

We need to know whether MRP Controller belongs to:

- global Product;
- Product Plant;
- MRP Area;
- another planning context.

In our case, it belongs to Product Plant.

That changes the entire interpretation.

The Mapping is not:

```
Planner Group
→ MRP Controller
```

It is:

```
Planner Group
+
Plant
→ Product Plant MRP Controller
```

Without this distinction, we might import a technically neat but semantically wrong model.

We therefore create or confirm the relevant canonical objects:

```
Entity:
Product

Entity:
Plant

Entity:
Product Plant

Relationship:
Product is extended to Plant

Attribute:
Product Plant MRP Controller
```

The workbook row becomes meaningful only after it is attached to the correct Entity grain.

---

# We separate business Attributes from physical fields

The workbook places source and target columns side by side.

That format encourages us to treat the physical fields as the model.

We do not.

We separate three layers.

## Business concept

```
Product Plant MRP Controller
```

## Source implementation

```
Legacy field:
PLANNER_GROUP
```

## Target implementation

```
SAP Product Plant MRP Controller endpoint
```

Plant is represented separately as a contextual source input.

This allows the business Attribute to remain stable even when:

- the source system changes;
- the source column is renamed;
- the SAP endpoint changes;
- another interface consumes the value;
- a custom implementation is retired.

The workbook row described one implementation path.

The canonical model describes the reusable concept and its current implementation.

---

# We assign stable IDs

The workbook identifies the logic through:

- sheet name;
- row number;
- human-readable labels.

Those references are fragile.

We create stable IDs such as:

```
ENT-PRODUCT
ENT-PLANT
ENT-PRODUCT-PLANT

ATTR-PRODUCT-PLANT-MRP-CONTROLLER

FEP-LEGACY-PLANNER-GROUP
FEP-LEGACY-PLANT
FEP-S4-PRODUCT-PLANT-MRP-CONTROLLER

MAP-PRODUCT-PLANT-MRP-CONTROLLER
```

The exact naming convention can vary.

The requirement does not.

Each important object needs an identity that survives:

- workbook sorting;
- file renaming;
- documentation changes;
- implementation replacement;
- new migration waves.

Stable IDs let the same Mapping be referenced from:

- dataset readiness;
- validation diagnostics;
- Evidence;
- Decisions;
- Findings;
- PatchProposals;
- GitHub issues;
- AMS incidents.

The model becomes a connected system rather than a set of document locations.

---

# We split the row into distinct canonical objects

The original row combined several concerns.

We separate them.

## The Attribute

```
Product Plant MRP Controller
```

It contains:

- definition;
- Entity context;
- owner;
- business purpose;
- criticality.

## The source endpoints

```
Legacy Planner Group
Legacy Plant
```

They contain:

- source system;
- physical location;
- datatype;
- observed values;
- dataset references.

## The Mapping

```
Planner Group + Plant
→ Product Plant MRP Controller
```

It contains:

- direct input;
- contextual input;
- transformation type;
- value-list reference;
- applicability.

## The fallback

```
MRP Controller 001
```

It contains:

- scope;
- reason;
- owner;
- expiry;
- status.

## The Evidence

```
Workbook version
Mock-load profile
Transformation output
```

## The Decision

```
Plant-specific derivation approved
```

## The Finding

```
Fallback approval for the current baseline is unclear
```

The workbook did not explicitly distinguish these objects.

That is why the conversion requires interpretation rather than simple extraction.

---

# We distinguish direct inputs from context

The workbook often lists one source field per target field.

Real transformations frequently use other fields that do not directly supply the output value.

In this case:

```
Planner Group:
supplies the classification used for conversion

Plant:
selects which conversion table entry applies
```

Plant is not merely another source value.

It changes the applicability of the Mapping.

We model the roles explicitly:

```
Planner Group:
direct input

Plant:
conditional context
```

This distinction improves validation.

If Planner Group is missing, the main source value is unavailable.

If Plant is missing, the conversion cannot be selected deterministically.

Those are different gap types and should produce different diagnostics.

---

# We turn the comment into a governed fallback

The workbook comment says:

```
default 001 where missing
```

That sentence is dangerous because it lacks boundaries.

We refuse to model it as a simple default value.

We ask:

- Missing what?
- Missing Planner Group?
- Missing conversion?
- Missing Plant?
- Which Plants?
- Which records?
- Which migration phase?
- Who accepts the operational consequence?
- When does the fallback expire?
- How will affected records be identified?

After investigation, the real rule may be:

> Use controller `001` only for Product Plant records in PL20 and PL30 where Planner Group is present but no approved conversion exists. The fallback is permitted through Mock Load 3 and must not be used for production cutover without renewed approval.

Now we can represent it explicitly.

Conceptually:

```
Fallback:
FALLBACK-MRP-CONTROLLER-001

Value:
001

Applies when:
Planner Group exists
and approved conversion is absent

Scope:
PL20
PL30

Valid until:
Mock Load 3 completion

Production use:
Not approved

Owner:
Production Planning Data Owner
```

The original workbook comment survives.

Its meaning becomes testable.

---

# We preserve uncertainty instead of forcing completion

During conversion, teams often feel pressure to fill every structured field.

That creates false certainty.

Suppose we cannot find evidence that production use of fallback `001` was approved.

We do not set:

```
status:
approved
```

We create a Finding:

```
Finding:
Current workbook describes fallback 001,
but no Decision authorising production use
was found.

Affected scope:
PL20 and PL30

Required action:
Production Planning owner review
```

This is one of the main reasons to separate Evidence, Finding and Decision.

The workbook can be accurately imported even when the business conclusion remains unresolved.

A canonical model should make uncertainty visible.

It should not hide it to produce a cleaner diagram.

---

# We compare the workbook with implementation

The workbook may not match transformation code.

We inspect the implemented path and observe:

```
Workbook:
default 001 where conversion is missing

Implementation:
PL30 receives controller 030 through a hard-coded exception
```

Now we have a discrepancy.

We do not choose one silently.

We record:

```
Documented model:
global fallback 001

Observed implementation:
PL30 exception to 030

Canonical status:
disputed

Required decision:
confirm whether PL30 exception is approved
```

This is where the product begins to create real value.

The model is not simply a cleaned copy of the workbook.

It becomes the place where documented, implemented and observed states can be compared.

---

# We link evidence to claims

We avoid attaching a folder of documents to the Mapping and calling it traceability.

We state what each item proves.

For example:

```
Claim:
MRP Controller must vary by Plant.

Evidence:
Planning workshop Decision record.

Claim:
Plant-specific conversion covers 94% of Wave 1 records.

Evidence:
Mock Load 3 profile.

Claim:
Fallback 001 was used in PL20 and PL30.

Evidence:
Transformation output and target validation report.

Claim:
Production use of the fallback is approved.

Evidence:
Not found.
```

This is much stronger than a generic `evidence_files` list.

The model can now distinguish:

- supported claims;
- unsupported claims;
- stale claims;
- contradictory claims.

---

# We create a candidate canonical representation

Once the objects and relationships are understood, we create the candidate model.

A simplified Mapping object could look like this:

```
---
id: MAP-PRODUCT-PLANT-MRP-CONTROLLER
type: Mapping
status: candidate

source_inputs:
  - id: FEP-LEGACY-PLANNER-GROUP
    role: direct

  - id: FEP-LEGACY-PLANT
    role: conditional_context

target:
  id: ATTR-PRODUCT-PLANT-MRP-CONTROLLER

transformation:
  type: value_lookup
  value_list: VL-PLANT-PLANNER-MRP-CONTROLLER

fallback:
  id: FALLBACK-MRP-CONTROLLER-001

evidence:
  - EVID-MAPPING-WORKBOOK-V7
  - EVID-MOCK-LOAD-3-MRP-COVERAGE
---

Derive Product Plant MRP Controller from legacy
Planner Group using the Plant-specific conversion.
```

This is an illustrative direction rather than a guarantee of the exact current Martenweave schema.

The important properties are:

- stable identity;
- explicit input roles;
- explicit target;
- transformation reference;
- fallback reference;
- Evidence;
- human-readable description.

---

# We validate the candidate model

The conversion is not complete when the files are generated.

We validate them.

For this case, deterministic checks should ask:

- Does every referenced object exist?
- Is the target Attribute attached to Product Plant?
- Is Plant represented as a valid contextual input?
- Does the value list exist?
- Does the fallback reference a valid object?
- Does the fallback scope use known Plants?
- Are IDs unique?
- Are required owners present?
- Are statuses valid?
- Are there conflicting active Mappings?

The candidate may fail.

That is useful.

A failed import reveals assumptions that the workbook allowed to remain implicit.

Martenweave’s current core already follows the principle that model objects should be validated for IDs, types, references and domain context before indexing.

The conversion process should use those validators rather than create a parallel validation system.

---

# We calculate what the workbook never showed clearly

Once the canonical objects exist, we can ask questions that were expensive to answer from the workbook.

For example:

- Which datasets supply Plant?
- Which Mappings depend on Planner Group?
- Which records use fallback `001`?
- Which Plants remain uncovered?
- Which Evidence supports the current Mapping?
- Which Decision approved the conversion?
- What changes if PL30 is removed from fallback scope?
- Which test results become stale?

The model is not valuable merely because it is structured.

It is valuable because the structure supports these operations deterministically.

---

# We generate the workbook back from the model

This is the point at which many conversion projects fail.

They import Excel once and expect business users to work only in model files or a new UI.

We take a different approach.

We generate a review workbook from the canonical model.

The exported row may include:

| Mapping ID | Business Attribute | Direct input | Context | Target | Fallback | Validation | Finding |
|---|---|---|---|---|---|---|---|
| `MAP-PRODUCT-PLANT-MRP-CONTROLLER` | MRP Controller | Planner Group | Plant | SAP Product Plant | `001`, limited scope | Passed | Production fallback approval missing |

This workbook is better than the historical version because:

- stable IDs are visible;
- direct and contextual inputs are separated;
- fallback is explicit;
- validation state is generated;
- unresolved Findings are visible;
- the model commit can be recorded.

Business users retain the familiar tabular surface.

The workbook no longer owns the logic independently.

---

# We compare the generated workbook with the original

We do not assume that the structured model preserved everything.

We run a deliberate review.

We ask the planning owner:

- Is the business wording still correct?
- Did we preserve the meaning of the comments?
- Did we classify Plant correctly?
- Did we misinterpret `Approved`?
- Are the fallback boundaries accurate?
- Is any important local exception missing?
- Does the generated view remain usable?

This review is essential because some workbook meaning is social rather than structural.

A yellow cell may have been meaningful only because the team agreed it meant “requires local confirmation.”

During conversion, we must either:

- model that state explicitly;
- preserve it as a Finding;
- discard it deliberately.

We should not lose it accidentally.

---

# We treat corrections as PatchProposals

Suppose the business owner reviews the generated workbook and changes:

```
Fallback Plant scope:
PL20 and PL30
```

to:

```
Fallback Plant scope:
PL20 only
```

We do not overwrite the canonical model immediately.

We generate a PatchProposal:

```
Proposal:
Remove PL30 from fallback 001 applicability.

Reason:
PL30 plant-specific conversion is now available.

Affected records:
640 Product Plant records.

Required validation:
Mapping coverage and MRP planning test.

Required reviewer:
PL30 Production Planning Owner.
```

The proposal is:

- validated;
- impact-assessed;
- reviewed;
- applied through Git if approved.

This preserves spreadsheet usability without giving spreadsheet edits uncontrolled authority.

Martenweave’s documented operating model is already proposal-first: agents propose, validators verify, humans approve and Git records the accepted result.

GitHub’s pull-request review model similarly separates proposed changes from approval and merge, which provides a useful external pattern for reviewing canonical file changes.

---

# We preserve the original workbook

Moving to a canonical model does not mean deleting historical workbooks.

The original file remains Evidence.

We preserve:

- filename;
- checksum;
- import date;
- sheet names;
- conversion report;
- unresolved cells;
- model objects created from it;
- Findings raised during import.

This allows us to answer:

> What did version 7 of the workbook say?

and separately:

> What did we accept into the canonical model?

That distinction protects historical interpretation.

---

# We produce an import report

A serious workbook conversion should end with a report.

For this case:

```
Workbook:
Product_Planning_Mapping_FINAL_v7.xlsx

Rows inspected:
46

Canonical objects matched:
31

New candidate objects:
8

Findings:
5

Conflicting interpretations:
2

Unresolved approvals:
1

Rows imported without ambiguity:
29

Rows requiring human review:
17
```

The objective is not a 100 percent automatic import rate.

The objective is a truthful model.

An importer that claims complete success by guessing every ambiguity is less useful than one that exposes the difficult decisions clearly.

---

# We use AI as an interpreter, not an authority

AI can help us:

- identify candidate business objects;
- detect repeated terms;
- interpret comments;
- suggest stable IDs;
- group similar mappings;
- draft plain-language definitions;
- identify potential contradictions;
- propose model operations.

AI should not silently decide:

- that a yellow cell means approved;
- that `001` is a production-safe fallback;
- that two similarly named fields are equivalent;
- that the latest workbook is authoritative;
- that a hard-coded implementation exception is valid.

The safe output is:

```
Candidate interpretation

Supporting evidence

Confidence

Unresolved question

Proposed model change
```

Human reviewers remain responsible for authority and meaning.

---

# We avoid over-modelling the first workbook

A common mistake is to design a universal enterprise ontology before importing the first Mapping.

We do not need that.

For the Product planning case, the smallest useful model contains:

- Product;
- Plant;
- Product Plant;
- Planner Group;
- MRP Controller;
- two source endpoints;
- one target endpoint;
- one Mapping;
- one value list;
- one fallback;
- one Rule;
- Evidence;
- one Decision or unresolved Finding.

That is enough to prove the workflow.

We can extend the model when new use cases require it.

The product should grow from real migration pain, not from theoretical completeness.

---

# What we refuse to do

We should not:

- convert every row automatically and call it canonical;
- preserve colours without explaining their meaning;
- flatten comments into generic notes;
- treat workbook status as formal approval;
- combine Mapping, Rule, Evidence and Decision into one object;
- replace unresolved ambiguity with AI confidence;
- force business users to abandon spreadsheets immediately;
- allow round-trip imports to overwrite canonical files directly.

These shortcuts make the conversion appear successful.

They recreate the original technical debt in another format.

---

# The product workflow we should build

The focused Martenweave capability should be **Workbook-to-Model Assessment**.

## Step 1: inspect

Read workbook structure, sheets, columns, comments and stable identifiers where available.

## Step 2: classify

Identify candidate:

- Entities;
- Attributes;
- FieldEndpoints;
- Mappings;
- Rules;
- Evidence;
- Decisions;
- Findings.

## Step 3: match

Connect rows to existing canonical objects.

## Step 4: propose

Create candidate objects and PatchProposals for unresolved additions or changes.

## Step 5: validate

Run deterministic model validation.

## Step 6: assess impact

Identify dependencies and affected scope.

## Step 7: render

Generate a review workbook and static report.

## Step 8: approve

Apply only accepted proposals through Git.

This is not generic spreadsheet ingestion.

It is a model-governance workflow for a specific enterprise artefact.

---

# Proposed commands

A future focused interface could look like:

```
martenweave workbook assess \
  ./inputs/product-planning-mapping.xlsx \
  --repo ./model \
  --out ./reports/workbook-assessment
```

Then:

```
martenweave workbook propose \
  ./inputs/product-planning-mapping.xlsx \
  --repo ./model
```

And:

```
martenweave workbook render \
  --repo ./model \
  --scope product-planning \
  --out ./reviews/product-planning.xlsx
```

These commands are recommended product directions, not claims about the current CLI.

The current Martenweave CLI already exposes the underlying building blocks for validation, index generation, trace, impact, diff, proposal generation and dataset readiness.

---

# Acceptance criteria for the first slice

We should consider the first implementation successful when we can take the Product planning workbook and answer:

1. What is the canonical Mapping ID?
2. What is the business target Attribute?
3. What is its Entity grain?
4. Which source input supplies the value?
5. Which input supplies context?
6. Which value list performs the conversion?
7. Which fallback exists?
8. What is its approved scope?
9. Which Evidence supports the Mapping?
10. Which questions remain unresolved?
11. What changes between the workbook and implementation?
12. Can we regenerate a business-review workbook from the canonical model?

The system should not claim success merely because it created files.

It succeeds when we can explain the model more reliably than the original workbook could.

---

# The business outcome

The immediate benefit is not that the programme stops using Excel.

The benefit is that the programme stops depending on Excel as the only place where model meaning exists.

This reduces:

- version confusion;
- duplicate analysis;
- hidden defaults;
- undocumented implementation drift;
- repeated workshops;
- weak handover;
- unsafe AI interpretation.

It also changes how later work is performed.

A new mock-load Finding can point to a stable Mapping.

A proposed fallback change can show impact before implementation.

An AMS incident can trace back to the migration Decision.

A later wave can reuse the accepted model rather than reopening the original workbook debate.

---

# Final perspective

When we convert a mapping workbook, our job is not to preserve every cell exactly.

Our job is to preserve the meaning that the programme relies on.

For the Product Plant MRP Controller case, that means retaining:

- the business Attribute;
- the Product Plant grain;
- Planner Group as direct input;
- Plant as context;
- the conversion table;
- fallback `001`;
- its scope and expiry;
- supporting Evidence;
- unresolved approval;
- the difference between documented and implemented behaviour.

The transformation is:

```
Workbook row
→ observed evidence
→ business interpretation
→ canonical objects
→ deterministic validation
→ reviewable model
→ generated workbook
```

The practical test is:

> Can we discard the working copy of the workbook, rebuild a reviewable version from canonical files, and still explain why the Mapping exists, how it works, what remains uncertain and who approved it?

When the answer is yes, we have preserved business context.

When the answer is:

> We successfully converted 46 rows to YAML,

we may only have moved the technical debt.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We are building Martenweave as a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

We do not want to remove spreadsheets from enterprise work.

We want to stop critical model truth from depending on:

- one workbook copy;
- one consultant’s memory;
- one undocumented colour convention;
- one unreviewed AI interpretation.

Our model is simple:

```
Spreadsheets bring evidence and collaboration.

Martenweave stores canonical model truth.

Validators check consistency.

AI proposes changes.

Humans approve.

Git records the result.
```

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave Core currently defines itself as a backend-first model-governance and evidence layer that turns spreadsheets, datasets, tickets, validation reports, Decisions and SAP context into canonical model files, deterministic validation, gap reports, lineage, impact analysis and human-approved proposals.

The current architecture keeps Markdown and YAML model files authoritative, treats generated indexes as disposable, validates IDs, types, references and domain context before indexing, and prevents AI from silently mutating model truth.

Martenweave’s documented pipeline moves from Evidence and profiling through validation, indexing, gap detection, lineage, impact and PatchProposals to human-reviewed GitHub issues or pull requests.

W3C PROV-O provides a general model for representing and exchanging provenance information across systems and contexts, including entities, activities, agents, derivation and attribution. Martenweave does not need to implement PROV-O directly, but the distinction between an observed artefact, the activity that produced it and the agent responsible for it supports the evidence-first approach described here.

GitHub pull-request reviews separate proposed changes from approval and merge, allowing reviewers to comment, approve or request changes. That review pattern is relevant to canonical model files, although Martenweave must add semantic Evidence and impact context beyond the textual Git diff.

The workbook assessment, round-trip rendering and proposed commands described in this article are product directions. They should not be interpreted as guarantees of the exact current workbook importer, canonical schema, Workbench behaviour or CLI unless separately implemented and published.

Martenweave is independent and is not affiliated with or endorsed by SAP, W3C or GitHub.
