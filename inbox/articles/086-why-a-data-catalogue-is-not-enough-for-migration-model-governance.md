# Why a Data Catalogue Is Not Enough for Migration Model Governance

**Reviewed: 14 July 2026**

A migration team is preparing Product data for SAP S/4HANA.

The source dataset contains:

```text
PRODUCT_ID
PLANNER_GROUP
MRP_TYPE
PROCUREMENT_TYPE
```

The target design expects planning data at Product Plant level.

The dataset does not contain Plant.

A data catalogue can help the team discover the file, inspect its schema, identify its owner, connect columns to glossary terms and show technical lineage. Modern catalogues may also provide data-quality rules, health scores, governance domains, critical data elements and impact analysis across registered data assets. Microsoft, for example, describes Purview Unified Catalog in terms of asset inventory, metadata, lineage, business vocabulary, data products, quality and governance health.

That is valuable.

It still does not answer the migration decision:

> How should the canonical Product planning model change now that the dataset cannot support Product Plant assignments?

The team must determine whether to:

- add Plant to the source extract;
- use another dataset as the Plant authority;
- derive Plant from a cross-reference;
- treat the planning values as global;
- retain a temporary MRP Controller fallback;
- exclude affected Product Plant records;
- change the target design.

This is not only a discovery problem.

It is not only a data-quality problem.

It is not only an operational master-data problem.

It is a governed model-change problem.

> A data catalogue helps an organisation understand its data estate. Migration model governance must decide how new evidence changes the model used to transform, validate and approve data.

The distinction explains why Martenweave should not try to become a general enterprise data catalogue.

Its product opportunity is narrower.

It connects migration evidence to a canonical, version-controlled model and provides a controlled path from Finding to proposed model change, deterministic validation, impact analysis and human approval.

---

# The real pain is fragmented model truth

The migration team rarely lacks information.

The information is simply distributed across different tools.

The catalogue contains:

- the source file;
- its columns;
- a glossary term for Plant;
- an owner;
- technical lineage.

The transformation workbook contains:

- Planner Group mappings;
- target fields;
- temporary defaults;
- comments from previous workshops.

The ticketing system contains:

- an action to request Plant from the source team;
- a deadline;
- an assignee;
- discussion history.

SAP MDG or another MDM platform may contain:

- governed Product or Business Partner records;
- change-request workflows;
- validation rules;
- operational stewardship.

The migration repository may contain:

- scripts;
- value lists;
- validation reports;
- cutover extracts.

A meeting note contains the critical decision:

> Planning responsibility differs by Plant. The values must not be copied globally.

Each tool holds part of the truth.

No single layer necessarily states the complete governed path:

```text
Legacy Planner Group
+
authoritative Plant
→ plant-specific conversion
→ Product Plant MRP Controller
→ SAP planning responsibility
```

That path is the migration model.

It describes:

- the business concept;
- its grain;
- its source authority;
- the transformation;
- the SAP implementation;
- the applicable Rule;
- the fallback;
- the evidence;
- the decision history.

The pain is not that the catalogue failed to scan the source.

The pain is that the accepted meaning of the migration path remains spread across metadata, spreadsheets, code and conversations.

---

# What a data catalogue solves well

It is important not to weaken the argument by pretending catalogues are primitive field lists.

Modern data catalogues can be substantial governance platforms.

They may support:

- data discovery;
- business glossaries;
- asset ownership;
- governance domains;
- technical lineage;
- access policies;
- data products;
- quality rules;
- health scores;
- critical data elements;
- impact views.

Microsoft’s current Purview documentation positions Unified Catalog as a platform for discovery, understanding, curation, access, health and federated governance. It describes an inventory of data assets, metadata and lineage, along with glossary terms, governance domains, critical data elements and data-quality capabilities.

For the Product planning case, the catalogue may answer:

- Which dataset contains `PLANNER_GROUP`?
- Who owns the dataset?
- Where was the file produced?
- Which pipelines use it?
- Which technical assets consume it?
- Is there another field named `PLANT` elsewhere?
- Which glossary concept is attached to the columns?
- What is the null rate?
- Which reports or data products depend on the source?

These are necessary questions.

They are not yet a migration decision.

---

# Discovery does not establish authority

Suppose the catalogue finds two possible Plant sources:

```text
LEGACY_SITE_CODE
CENTRAL_PLANT_CROSS_REFERENCE
```

Both are populated.

Both are owned.

Both have lineage.

They disagree for eight percent of Products.

The catalogue can make the disagreement visible.

It cannot infer authority from availability alone.

The migration programme must decide:

- whether Site Code is semantically equivalent to Plant;
- whether the central cross-reference is current;
- which source applies to the acquired business unit;
- whether the decision changes after cutover;
- whether one source is a fallback;
- how conflicts are reconciled.

A searchable asset is not automatically an authoritative source.

A glossary link is not an approval.

A lineage connection is not a business decision.

This is the first gap between cataloguing and migration model governance.

---

# A glossary term is not an executable model

The catalogue may define Plant as:

> An organisational unit where materials are produced, procured, stored or planned.

That definition helps users understand the concept.

The migration model must go further.

It must specify:

```text
Attribute:
Plant

Required for:
Product Plant MRP Controller Mapping

Source:
Central Plant Cross-Reference

Input role:
Conditional context

Target use:
Select plant-specific MRP Controller conversion

Fallback:
Not permitted for PL20 and PL30
```

This is executable governance.

The model can now be validated.

A dataset can be tested against it.

A Mapping can fail when Plant is absent.

A PatchProposal can add or change the source.

Impact analysis can identify affected planning paths.

A glossary term explains meaning.

A canonical model turns meaning into controlled migration behaviour.

Both are useful.

They are not interchangeable.

---

# Why this becomes urgent during migration

In steady-state governance, ambiguity can sometimes remain visible while owners investigate it.

Migration creates deadlines.

Data must be:

- extracted;
- transformed;
- validated;
- loaded;
- reconciled;
- approved.

When Plant is missing, the migration team cannot leave the issue as general metadata uncertainty.

It must choose an operational response.

The dangerous responses are usually technically convenient:

```text
Copy the same planning value to every Plant.
```

```text
Use controller 001 when the conversion is missing.
```

```text
Load Product data globally and correct the Plants later.
```

Each response may improve technical completion.

Each may create incorrect business meaning.

Migration model governance exists because the programme must convert uncertain evidence into explicit, reviewable decisions before those decisions become production data.

---

# Why a catalogue health score is not migration readiness

A catalogue may report that the Product planning dataset has:

- an owner;
- a glossary assignment;
- lineage;
- a quality score;
- complete metadata;
- a certified status.

The dataset can still be unfit for the migration path.

For example:

```text
Dataset metadata completeness:
100%

Column population:
98%

Product Plant Mapping readiness:
Blocked
```

Why?

Because the required organisational key is absent.

The dataset is well catalogued.

It cannot produce the governed target result.

This is a critical product distinction.

Catalogue health asks whether the asset is understandable, governed and measurable within the data estate.

Migration readiness asks whether the dataset can satisfy a specific transformation and target obligation for a declared scope and baseline.

Martenweave should consume catalogue information where available.

It should not inherit the assumption that a well-governed asset is automatically ready for SAP migration.

---

# What SAP MDG solves

SAP Master Data Governance addresses a different and important problem.

SAP currently presents MDG as a central governance layer for business-critical master data, with governed models, matching and consolidation, change-request workflows, data-quality controls, ownership, workflow routing and auditability.

In the Product planning case, SAP MDG may help govern the operational Product record after the design is established.

It can support:

- controlled master-data changes;
- validation of Product data;
- workflow and stewardship;
- audit trails;
- central or consolidated governance;
- mass changes;
- distribution of trusted master data.

This is not a weakness.

It is the purpose of an MDM platform.

The unresolved migration question occurs earlier:

> What should the approved Product Plant Mapping be, given conflicting source evidence and an incomplete migration dataset?

That question includes artefacts outside the operational master-data workflow:

- source extracts;
- legacy field interpretations;
- dataset profiles;
- migration Mappings;
- temporary cutover defaults;
- mock-load evidence;
- rejected alternatives;
- target endpoints;
- project decisions.

SAP MDG can be part of the governed target landscape.

Martenweave should not attempt to replace it.

---

# The difference between governing records and governing the migration model

SAP MDG governs master-data creation and change.

Martenweave’s intended role is to govern the model used to explain and transform data across the migration lifecycle.

In the Product planning case, SAP MDG may govern the final MRP Controller value.

Martenweave should preserve why that value is expected:

```text
Business Attribute:
MRP Controller

Grain:
Product Plant

Source inputs:
Planner Group and Plant

Transformation:
Plant-specific lookup

Fallback:
Temporary controller only for approved scope

Evidence:
Mock Load 3

Decision:
Planning owners approved plant-specific responsibility
```

The operational record and the migration model are connected.

They are not the same object.

A mature architecture can use both:

```text
Martenweave:
governs migration model truth and evidence

SAP MDG:
governs operational master-data changes and stewardship
```

The boundary should remain explicit.

---

# What ITSM solves

An ITSM platform can manage the work created by the gap.

A ticket might state:

```text
Request Plant field for Product planning extract.
```

ITSM is designed around service delivery, incidents, requests, problems, changes, assignment, status and operational coordination. ServiceNow defines ITSM as the management of end-to-end IT service delivery, including the creation, delivery and support of IT services.

For the Product planning problem, ITSM can answer:

- Who owns the action?
- What is its priority?
- What deadline applies?
- Which team must respond?
- Is the task blocked?
- Which change record implements the solution?
- Has the request been completed?

These are necessary delivery controls.

The ticket still does not define the canonical model delta.

“Add Plant” is ambiguous.

The change could mean:

- add a source column;
- create a new DatasetField object;
- register a source endpoint;
- update one Mapping;
- update three Mappings;
- change Attribute grain;
- restrict a fallback;
- change a Rule;
- invalidate previous Evidence.

ITSM manages the work.

Martenweave should define what model change the work is expected to produce.

---

# Why a ticket description cannot safely become model truth

Assume the ticket is closed with this note:

> Plant added to the extract. Mapping updated.

The statement does not prove:

- which Plant source was used;
- whether it covers the full population;
- which Mapping changed;
- whether the fallback was removed;
- whether the candidate model validated;
- whether previous mock-load evidence remains current;
- whether planning owners approved the result;
- whether the repository reflects the same change.

The ticket is operational history.

It is not necessarily canonical model history.

Martenweave should link to the ticket as Evidence or delivery context.

It should not treat the ticket body as the model itself.

---

# Git solves review of changes, but not semantic preparation

Git and pull requests provide a strong foundation for versioning and review.

GitHub pull-request reviews allow reviewers to comment, approve or request changes before merge, and repositories can require approvals.

This is highly relevant to Martenweave.

Canonical model files should be reviewed through Git.

But a raw file diff may show only:

```text
inputs:
  - PLANNER_GROUP
  - PLANT
```

A business reviewer needs to know:

- why Plant was added;
- which source supplies it;
- how many records are affected;
- what happens to the current default;
- which planning process changes;
- which evidence supports the proposal;
- which assumptions remain unresolved.

Git is the record and merge control.

A PatchProposal is the semantic review package that should precede or accompany the diff.

---

# The Product Plant case across four tools

The same problem appears differently in each system.

## Data catalogue

```text
Asset:
Product planning extract

Observed schema:
PLANNER_GROUP present
PLANT absent

Owner:
Legacy Product Data Team

Related term:
Plant
```

## ITSM

```text
Task:
Provide Plant in the Product planning extract

Assignee:
Legacy ERP Team

Due:
Before Mock Load 3
```

## SAP MDG

```text
Target governance:
Product Plant MRP Controller must pass target validation
and follow controlled change workflow
```

## Git

```text
Proposed file change:
Add Plant input to MRP Controller Mapping
```

Each view is useful.

The missing view is:

```text
Finding:
The current dataset cannot support plant-specific MRP Controller derivation.

Candidate source:
Central Plant Cross-Reference

Proposed model change:
Add Plant as conditional Mapping context.

Fallback effect:
1,840 records lose the global default.

Impact:
PL20 and PL30 require conversion completion or explicit exception.

Evidence:
Dataset profile and Mock Load 2 result.

Reviewers:
Production Planning Data Owner and affected Plant owners.

Validation:
Candidate model passes structural checks.

Decision:
Pending.
```

That is the Martenweave-shaped problem.

---

# The product is not another metadata inventory

A weak version of Martenweave would import catalogue assets and display them in another UI.

That would create duplication.

It would add little value.

The stronger product position is:

> Martenweave stores the governed migration model that existing catalogues, datasets, tickets, validation reports and SAP systems can reference.

The catalogue remains the best place to discover enterprise assets.

ITSM remains the best place to manage service work.

SAP MDG remains the operational master-data governance platform where applicable.

Git remains the version and review record.

Martenweave connects those systems around model truth.

---

# What Martenweave stores that the catalogue usually does not own

For the Product Plant case, Martenweave should own or reference:

## Canonical business objects

- Product;
- Product Plant;
- MRP Controller;
- Plant;
- Planner Group.

## Physical endpoints

- source columns;
- cross-reference fields;
- SAP target fields;
- interface fields.

## Mappings

- Planner Group plus Plant to MRP Controller.

## Rules

- Plant required for plant-specific planning data;
- fallback permitted only in defined scope.

## Evidence

- dataset profile;
- mock-load result;
- source comparison;
- validation report.

## Decisions

- selected Plant authority;
- fallback acceptance;
- effective scope.

## Findings

- current dataset lacks required context.

## PatchProposals

- candidate change to the Mapping and fallback.

This is not a larger catalogue.

It is a narrower model-change system.

---

# Why canonical files matter

A catalogue database may be authoritative for catalogue metadata.

Martenweave uses canonical Markdown and YAML files as the model source of truth, with generated SQLite and JSONL indexes treated as disposable. It validates IDs, types, references and domain context before indexing.

This gives the migration model several useful properties:

- it can be versioned;
- it can be reviewed through Git;
- it can be transferred with the project;
- it can be validated deterministically;
- it can be diffed between releases;
- it can be read by agents and developers;
- it does not depend on a hosted catalogue instance;
- generated search and viewer layers can be rebuilt.

The files are not valuable merely because they are files.

They are valuable because they make the governed model portable and reviewable.

---

# The core workflow

For the Product Plant gap, the useful workflow is:

```text
1. Import or profile the dataset.
2. Compare it with the canonical model.
3. Detect that Plant context is missing.
4. Create a Finding.
5. Retrieve relevant lineage and decisions.
6. Generate one or more PatchProposals.
7. Apply a proposal to a candidate model.
8. Validate the candidate deterministically.
9. Calculate impact and stale evidence.
10. Present the result for review.
11. Apply the approved change through Git.
12. Rerun dataset readiness.
```

This is already aligned with Martenweave’s documented pipeline: evidence and profiling lead to validation, gap detection, lineage, impact, proposals and human-reviewed Git work.

The product should deepen this loop rather than expand sideways into general catalogue functionality.

---

# Where catalogue integration helps

Martenweave should not ignore catalogues.

A catalogue can provide useful input:

- asset IDs;
- dataset ownership;
- descriptions;
- classifications;
- glossary terms;
- technical lineage;
- data-quality metrics;
- access information;
- system metadata.

For the Product planning case, Martenweave could link:

```text
Dataset:
Product Planning Extract

External catalogue reference:
catalog://product-planning-extract

Owner:
Legacy Product Data Team
```

The canonical model then adds migration-specific meaning:

```text
Required by:
MAP-PRODUCT-PLANT-MRP-CONTROLLER

Missing input:
PLANT

Readiness verdict:
Blocked

Candidate remediation:
Use Central Plant Cross-Reference
```

The integration principle is:

> Import context; do not duplicate the entire catalogue.

---

# Where SAP MDG integration helps

SAP MDG can provide:

- target domain context;
- approved target values;
- change-request references;
- stewardship ownership;
- target Rules;
- operational change history.

Martenweave can use that context to strengthen the migration model.

For example:

```text
Target Attribute:
Product Plant MRP Controller

Operational governance:
SAP MDG change process

Migration source:
Legacy Planner Group + Plant

Migration proposal:
Add plant-specific source path
```

The integration principle is:

> Use SAP MDG as operational governance where it fits; use Martenweave to preserve the migration reasoning around it.

---

# Where ITSM integration helps

Once the PatchProposal is reviewed, Martenweave can generate a precise issue:

```text
Goal:
Add authoritative Plant context to the Product planning source path.

Scope:
Update Product Plant MRP Controller Mapping for PL20 and PL30.

Acceptance criteria:
- Plant source registered.
- Candidate model validates.
- No unapproved global fallback remains.
- Mock-load readiness rerun.
- Planning owner approves results.

Validation command:
martenweave validate --repo ./model
```

The ITSM or GitHub issue then manages implementation.

The task is no longer vague because the model change is already defined.

---

# The business value is continuity of reasoning

The main value does not come from another metadata screen.

It comes from preserving the chain:

```text
What did we observe?

What does it mean?

What should change?

What assumptions support the change?

What else is affected?

Who approved it?

Which model version contains the result?
```

Without this chain, migration programmes repeatedly lose reasoning.

A field is added, but nobody remembers why.

A fallback remains after cutover.

A Mapping changes in code but not in documentation.

A later wave reopens the same debate.

An AMS team sees the production value but cannot trace the decision.

Martenweave turns temporary project learning into reusable model knowledge.

---

# The strongest product wedge

The initial sales or pilot story should not be:

> Replace your enterprise data catalogue.

That is strategically weak.

It creates unnecessary competition with mature platforms.

A better story is:

> Use your existing catalogue, tickets and SAP governance tools. Martenweave adds a version-controlled model layer that connects migration evidence to validated, reviewable change.

A focused pilot could use one real Product dataset:

1. register its source fields;
2. profile the file;
3. detect missing Plant context;
4. connect the gap to the MRP Controller Mapping;
5. show affected Product Plant records;
6. generate a PatchProposal;
7. validate the candidate;
8. show impact;
9. approve the change;
10. produce a Git issue or pull request.

This demonstrates an end-to-end outcome.

It does not require an enterprise-wide catalogue replacement.

---

# Current versus proposed Martenweave capability

Martenweave currently documents:

- canonical Markdown and YAML model files;
- deterministic validation;
- disposable SQLite and JSONL indexes;
- dataset readiness;
- gap detection;
- trace and impact;
- health and scorecard commands;
- AI-assisted PatchProposals;
- human-reviewed GitHub issues or pull requests;
- a local Workbench for assessment and controlled review.

The next product improvements should focus on:

- external catalogue references;
- richer Finding objects;
- candidate-state proposal validation;
- semantic before-and-after views;
- role-based reviewers;
- stale-proposal detection;
- structured approval conditions;
- ITSM and Git issue generation;
- SAP MDG references where relevant.

The project should not prioritise:

- enterprise-wide crawling;
- access-policy management;
- general data marketplace features;
- hosted catalogue replacement;
- generic workflow automation;
- direct SAP record maintenance.

Those are different products.

---

# A practical product boundary

The boundary can be stated plainly.

## Data catalogue

Helps users discover, understand, classify and govern data assets.

## SAP MDG

Governs operational master data, workflows, quality and stewardship.

## ITSM

Coordinates incidents, problems, requests and implementation work.

## Git

Versions and reviews file changes.

## Martenweave

Maintains the canonical migration model connecting evidence, Attributes, Mappings, Rules, lineage, impact, Decisions and proposed change.

This is not a hierarchy.

It is a division of responsibility.

---

# Why the boundary matters for AI

AI agents can search catalogues.

They can read tickets.

They can inspect datasets.

They can query SAP metadata.

They can draft pull requests.

Without a canonical model layer, the agent still lacks a stable place to answer:

- Which interpretation is approved?
- Which source is authoritative?
- Which fallback is permitted?
- Which Mapping is current?
- Which Decision superseded the old one?
- Which evidence applies to this baseline?
- Which model changes require approval?

The catalogue improves retrieval.

Martenweave should improve controlled reasoning.

This is what makes the model AI-ready.

AI readiness is not only making metadata searchable by an LLM.

It is making authority, evidence, constraints and change boundaries explicit enough that an agent can propose safely.

---

# Final perspective

A data catalogue is useful because enterprise data is difficult to find, understand and govern.

Migration introduces another problem.

The programme must continuously change its understanding of:

- source meaning;
- target design;
- transformation;
- applicability;
- fallback;
- evidence;
- ownership.

Those changes need a canonical, reviewable model.

The Product Plant example shows the difference.

The catalogue can reveal that Plant is missing.

The migration model must decide:

```text
which Plant;
from which source;
for which population;
used by which Mapping;
with which fallback;
approved by whom;
effective from when.
```

The practical test is:

> Can the organisation move from a discovered metadata gap to an explicit, validated and approved change in migration model truth without reconstructing the reasoning across five different tools?

When the answer is yes, Martenweave has a clear product role.

When the answer is:

> The catalogue already contains the column,

the programme has confused data visibility with migration governance.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first, source-available model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It does not need to replace data catalogues, SAP MDG, ITSM platforms or Git.

It connects them around a missing layer:

```text
traceable migration model truth
+
validated proposed change
+
human approval
```

The product becomes stronger when that boundary remains narrow.

## Sources and notes

This article was reviewed on 14 July 2026.

Microsoft currently positions Purview Unified Catalog around discovery, data understanding, metadata, lineage, governance domains, glossary terms, critical data elements, data products, access, health controls and data quality. These capabilities provide strong catalogue and governance context, but the Martenweave argument in this article concerns the separate need for a version-controlled migration model and proposal workflow.

SAP currently positions SAP Master Data Governance as a central governance layer for business-critical master data, including governed models, golden records, matching and consolidation, change-request workflows, data-quality controls, collaborative routing and audit trails. Martenweave is intended to complement this operational governance with migration evidence, source mappings and Git-based canonical model history.

ServiceNow defines ITSM around end-to-end IT service delivery and support. In the model described here, ITSM remains the system for assigning and coordinating work, while Martenweave defines the model change that the work is expected to implement.

GitHub pull-request reviews allow reviewers to comment, approve or request changes before merge, with optional required approvals. Martenweave uses this as an external review pattern while adding semantic evidence, validation and impact context before a canonical model change is merged.

Martenweave Core currently documents canonical files, deterministic validation, disposable generated indexes, dataset readiness, lineage, impact, AI PatchProposals and human-reviewed Git workflows.

The catalogue connectors, richer proposal-review capabilities and cross-system references described in this article are product directions. They should not be interpreted as guarantees of the exact current schema, integrations, Workbench behaviour or CLI unless separately implemented and published.

Martenweave is independent and is not affiliated with or endorsed by SAP, Microsoft, ServiceNow or GitHub.
