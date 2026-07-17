# How to Connect Martenweave’s UI to Live Model, Dataset and Proposal Data

**Reviewed: 14 July 2026**

A migration architect opens Martenweave and searches for `Customer Group`.

The UI returns the business attribute, source fields, target endpoints, mappings and several related gaps.

The architect opens the lineage view and sees that one source maps to a central Business Partner classification while the SAP target is maintained by sales area.

They open the gap.

The screen explains that two source systems provide values at different organisational levels.

The architect then asks the questions that determine whether the product is useful:

- Is this the current approved model?
- Which source dataset produced the gap?
- When was that dataset profiled?
- Does the target mapping come from the canonical repository or demo data?
- Has someone already proposed a correction?
- What would be affected if the target endpoint changed?
- Can the proposed change be reviewed and passed into the existing Git workflow?

If the UI cannot answer these questions, it is still a demonstration.

It may look credible. It may explain the product concept. It does not yet reduce the work required to investigate and govern a real model problem.

This is the next important Martenweave step.

> Connecting the UI to live data is not primarily an API integration task. It is the work of making every visible answer traceable to canonical model truth, current evidence and a controlled proposal lifecycle.

The objective is not to reproduce every CLI command as a button.

The objective is to let an SAP migration, MDG or AMS user complete one difficult investigation without manually reconstructing the answer across Excel, terminal output, GitHub issues and static reports.

## The UI already exists

Martenweave already has a browser-based interactive workspace.

The current frontend covers seven model-governance areas:

- Home;
- Models and global search;
- Object detail;
- Lineage;
- Gaps;
- Proposals;
- Proposal review.

This matters because the product problem is no longer:

> Should Martenweave have a UI?

The relevant question is:

> Which live backend contracts must power the existing screens so that they solve real model-governance work?

The current frontend uses handcrafted demo data and does not persist user state. Its documentation describes it as a local interactive workspace and identifies generated SQLite data or a local API as the intended production integration path.

That is a strong starting position.

The mistake now would be to expand the interface faster than the evidence path underneath it.

## Start from the user’s investigation loop

A connected UI should support one coherent operating loop:

```text
Question
→ search
→ inspect object
→ trace relationships
→ inspect evidence and gaps
→ assess impact
→ propose treatment
→ validate
→ review
→ record approved change
```

This loop is more important than any individual page.

A user rarely opens a data-model registry simply to browse objects.

They arrive because something is unclear or wrong:

- a target field has no source;
- two mappings conflict;
- a dataset does not support the approved rule;
- a value appears in migration data but not in the target model;
- a country requests an exception;
- a proposed change may affect several systems;
- a production incident needs explanation.

The UI should help resolve that question.

Every feature should support one step in the investigation.

## The first product principle: every answer needs provenance

When the UI displays a mapping, it should be able to show where that mapping came from.

Possible provenance includes:

- canonical model file;
- generated index record;
- imported spreadsheet;
- dataset profile;
- decision;
- proposal;
- configuration reference;
- ticket or issue.

For example:

```text
Mapping:
MAP-CRM-A-CUSTOMER-GROUP

Current state:
Approved

Canonical source:
model/mappings/customer-group.yaml

Model baseline:
customer-model-v2.8

Last validated:
14 July 2026

Supporting evidence:
CRM_A dataset profile, 12 July 2026

Related decision:
DEC-CUSTOMER-GROUP-017
```

Without provenance, the UI gives information but not trust.

A model-governance product should make it easy to answer:

> Why should I believe this screen?

## Do not connect the frontend directly to canonical files

Canonical Markdown and YAML files should remain the authoritative model source.

The browser should not repeatedly parse the repository and infer the complete graph itself.

Martenweave Core already separates canonical source from generated indexes. The current architecture treats canonical files as truth and SQLite or JSONL outputs as rebuildable representations for search, query, trace and impact analysis.

The connected architecture should preserve that boundary:

```text
Canonical model files
        ↓
Deterministic validation
        ↓
Generated index and evidence records
        ↓
Local API
        ↓
Martenweave UI
```

This provides several advantages:

- one model interpretation across CLI and UI;
- faster queries;
- consistent validation state;
- no duplicate parsing logic;
- reproducible results;
- clearer security and mutation boundaries.

The UI should consume the model.

It should not become another model engine.

## Use the generated index as the primary read model

The SQLite index is the natural source for most interactive views.

It can serve:

- objects;
- relationships;
- search results;
- ownership;
- lifecycle state;
- source and target endpoints;
- mappings;
- decisions;
- gap references;
- proposal references.

A read-oriented API can expose this information in stable response contracts.

For example:

```text
GET /api/models/search?q=customer+group
GET /api/objects/{object_id}
GET /api/objects/{object_id}/lineage
GET /api/objects/{object_id}/impact
GET /api/objects/{object_id}/evidence
GET /api/gaps
GET /api/proposals
```

These endpoint names are illustrative.

The important requirement is that the API wraps core services rather than implementing different behaviour for the frontend.

## Keep CLI, API and UI semantically identical

A dangerous product split would be:

```text
CLI result:
Generated from canonical repository

UI result:
Generated through separate frontend logic
```

Users would eventually receive different answers.

A stronger contract is:

```text
martenweave search
API search endpoint
UI search screen

all call the same application service
```

The same applies to:

- query;
- trace;
- impact;
- gaps;
- dataset readiness;
- proposal validation.

The CLI and UI may present information differently.

They should not interpret the model differently.

## The Home screen should answer: what needs attention?

The existing Home screen should not become a generic dashboard full of totals.

Users need to know what requires action.

Useful live sections include:

### New high-impact gaps

Examples:

- mandatory target without source treatment;
- active mapping using retired endpoint;
- critical object without owner;
- unsupported observed values.

### Proposals awaiting review

Show:

- title;
- affected objects;
- proposer;
- validation state;
- impact level;
- required reviewers.

### Stale model evidence

Examples:

- dataset profile older than the current mapping;
- test evidence based on superseded model baseline;
- accepted exception past expiry.

### Recently changed critical objects

Show changes that may require other teams to reassess their work.

### Investigation history

Allow users to return to objects, traces and gap cases they recently examined.

The Home screen should answer:

> Where is the highest-value unresolved model work?

It should not merely say:

> The registry contains 418 attributes.

## Models search should be the primary entry point

Search is central because users rarely know the correct internal object ID.

They may search by:

- business term;
- SAP table or field;
- source column;
- value;
- country;
- ticket reference;
- owner;
- alias.

Martenweave Core already provides search and query capabilities over its generated model representation.

The UI should expose search results with enough context to prevent wrong selection.

A result card might show:

```text
Customer Group for Sales Processing
Attribute · Active

SAP target:
KNVV-KDGRP

Context:
Sales area

Sources:
CRM_A, ERP_B

Open gaps:
2

Pending proposals:
1
```

This is more useful than a list of matching labels.

## Search should expose ambiguity

Suppose the user searches for `Customer Group`.

The model may contain:

- customer grouping for pricing;
- customer account group;
- sales-area Customer Group;
- central segmentation;
- source-system classification.

The UI should not silently choose the first match.

It should show the distinctions:

- definition;
- context;
- owner;
- endpoint;
- aliases;
- related systems.

One of Martenweave’s core business values is preventing similar labels from being treated as equivalent concepts.

The search experience should reinforce that discipline.

## Object Detail should become the central investigation page

The Object Detail screen should answer four questions.

## What is this object?

Show:

- name;
- type;
- definition;
- lifecycle;
- context;
- owner;
- aliases.

## How is it implemented?

Show:

- source endpoints;
- target endpoints;
- mappings;
- rules;
- values;
- configuration references.

## What evidence supports it?

Show:

- datasets;
- profiles;
- decisions;
- tests;
- tickets;
- imports.

## What currently requires attention?

Show:

- gaps;
- risks;
- pending proposals;
- stale evidence;
- unresolved ownership.

For example:

```text
ATTR-SUPPLIER-RISK

Status:
Active

Owner:
Global Supplier Data Owner

Target:
SAP Supplier Risk Classification

Sources:
ERP_A — direct
ERP_B — enrichment required

Current gaps:
ERP_B completeness below programme policy

Pending proposal:
Introduce separate Supplier Review Status

Last dataset profile:
12 July 2026
```

This creates a useful home for the model object across its lifecycle.

## Object Detail should not become a document dump

A common mistake would be to show:

- every attached file;
- every related ticket;
- every historical note;
- every graph edge.

The page should prioritise current truth and current decisions.

Historical evidence should remain available but secondary.

A useful ordering is:

1. Current approved state.
2. Current implementation and evidence.
3. Open gaps or proposals.
4. Impact and relationships.
5. Historical changes.

The user should not need to read the project archive to understand the object.

## Lineage should explain, not decorate

The existing lineage canvas is a major product asset.

It should answer practical questions such as:

- Where did this value come from?
- How does this source field become the SAP target?
- Which rule applies?
- Which systems consume the result?
- What breaks if the object changes?

The live graph should be generated from core relationship data rather than frontend demo structures.

Each edge should expose:

- relationship type;
- status;
- context;
- evidence;
- baseline;
- confidence or verification state where relevant.

For example:

```text
CRM_A.CUSTOMER_SEGMENT
    maps_to
ATTR-CUSTOMER-GROUP
    represented_by
SAP KNVV-KDGRP
    consumed_by
Sales Order Processing
```

If a relationship is proposed rather than approved, that state must be visible.

## Use several lineage modes

One large graph is rarely useful.

The UI should offer focused modes:

### Source-to-target

For mapping investigation.

### Business-to-implementation

For architects and owners.

### Impact

For change analysis.

### Evidence

For readiness or closure review.

### Historical

For understanding superseded decisions and migrated records.

These modes can use the same relationship graph with different filters.

This is more valuable than adding more graph visual effects.

## Gaps should become evidence-backed work objects

The Gaps screen is where Martenweave can close a significant pain.

Migration gaps are usually scattered across:

- validation reports;
- mapping workbooks;
- dataset profiles;
- Jira;
- email;
- meeting notes.

A Martenweave gap should connect:

- model expectation;
- observed evidence;
- affected population;
- severity or policy result;
- owner;
- possible treatments;
- related proposals.

Example:

```text
Gap:
Supplier Risk unavailable in ERP_B

Expected:
Active strategic suppliers require approved Supplier Risk

Observed:
27% of applicable ERP_B records are blank

Affected records:
6,840

Evidence:
ERP_B supplier extract, 12 July 2026

Owner:
ERP_B Data Owner

Status:
Treatment decision required
```

This is an actionable gap.

A statement such as `Column missing` is only a diagnostic fragment.

## Gaps should distinguish fact from policy

A dataset result may show:

> 27% of records are blank.

Whether this is a blocking problem depends on:

- applicable population;
- target rule;
- migration phase;
- accepted exceptions;
- business criticality.

The UI should separate:

### Observed fact

27% blank.

### Model expectation

Value required for active strategic suppliers.

### Programme policy result

Fails current Wave 2 readiness criterion.

This avoids presenting programme thresholds as universal product truth.

## Dataset data should be versioned evidence

A live UI must not display dataset metrics without identity.

Every profile should include:

- dataset name;
- source;
- extraction date;
- checksum or stable reference;
- profiling timestamp;
- applicable model baseline;
- filters;
- record count.

For example:

```text
Dataset:
ERP_B_supplier_extract_2026-07-12.xlsx

Records:
24,880

Model baseline:
supplier-model-v2.7

Profile status:
Current

Supersedes:
ERP_B_supplier_extract_2026-06-28.xlsx
```

Without this, a user may compare today’s model with last month’s data and draw the wrong conclusion.

## Dataset upload should not become uncontrolled storage

Martenweave does not need to become an enterprise data lake.

For local workflows, the UI may support file selection or upload for profiling.

The system should retain:

- metadata;
- profiling output;
- evidence reference;
- optional local file path or controlled location.

It should not automatically store sensitive production extracts inside the model repository.

The boundary should remain:

```text
Dataset provides evidence.

Canonical model stores model truth.

Generated profile stores derived findings.
```

## Show dataset readiness from the model object

A user investigating an attribute should not need to open a separate report and manually find the relevant column.

The Object Detail page can show:

```text
Dataset support

ERP_A:
Column present
99.4% applicable completeness
All observed values mapped

ERP_B:
Column absent
Enrichment process proposed

Local Procurement:
Column present
Three unmapped values
```

This connects the model requirement directly to current evidence.

## Impact analysis should be available before proposal creation

A user considering a change should be able to ask:

> What would this affect?

Martenweave Core already supports trace and impact analysis.

The UI should show impact in practical groups:

- model objects;
- mappings;
- datasets;
- rules;
- values;
- decisions;
- owners;
- tests;
- interfaces;
- local variants.

For example:

```text
Proposed change:
Retire Customer Group target endpoint

Confirmed impact:
- 12 active mappings
- 3 country variants
- 8 test references
- 2 interface consumers

Review required:
- Pricing analytics
- historical migration lineage
```

The purpose is not to display the largest graph.

It is to help the reviewer avoid missing work.

## Make model coverage limitations explicit

Impact analysis is only as complete as the registered relationships.

The UI should say:

```text
Impact coverage:

Represented:
SAP target, migration mappings, outbound interface, UAT tests

Not represented:
Country X local reporting tool
```

This is better than implying complete enterprise lineage.

Trust increases when the product is honest about its boundary.

## Proposals should start from evidence

The UI should allow a user to create a proposal from:

- a gap;
- an object;
- an impact result;
- a dataset finding;
- a comparison;
- a decision request.

For example, from a gap:

```text
Gap:
ERP_B cannot provide Supplier Risk

Create proposal:
- add reviewed enrichment source;
- introduce temporary Review Status;
- narrow mandatory rule;
- create issue for source remediation.
```

The proposal should carry the evidence context automatically.

The user should not have to re-enter:

- affected object IDs;
- dataset reference;
- current gap;
- baseline;
- observed population.

This is how the UI reduces real work.

## The UI must preserve proposal versus approved truth

The current frontend documentation is explicit that proposal approval flows are demonstrations and that real model changes must continue through the human-reviewed `PatchProposal` to `ChangeRequest` process.

This boundary should remain visible in the connected UI.

Use clear state labels:

- Draft suggestion;
- PatchProposal;
- Validation failed;
- Ready for review;
- Changes requested;
- Approved ChangeRequest;
- Applied to canonical model;
- Superseded;
- Rejected.

Do not display a proposed mapping as though it were part of the approved lineage.

## Proposal review should combine business and technical views

A reviewer should see:

### Business meaning

What decision changes?

### Exact model diff

Which canonical objects would change?

### Evidence

Which gap, dataset or decision supports it?

### Structural validation

Does the candidate model remain consistent?

### Impact

Which dependencies require review?

### Open questions

Which parts remain uncertain?

### Required approvers

Which roles have authority?

For example:

```text
Proposal:
Replace central Customer Classification target with sales-area Customer Group

Business issue:
Current target does not represent sales-process grouping

Model changes:
- modify mapping target
- add sales-area context
- retire old mapping relationship

Impact:
- six tests
- one outbound interface
- three country mappings

Open question:
CRM_A source is central; organisational expansion treatment not approved
```

This proposal should probably not be approved yet.

The UI should make that clear.

## Do not implement direct canonical mutation first

The tempting next step is:

> Let users edit an object in the UI and save it.

That is the wrong first production write path.

It risks bypassing:

- deterministic validation;
- Git diff;
- proposal review;
- ownership;
- impact analysis;
- audit history.

The first write workflow should be:

```text
UI input
→ PatchProposal
→ validation
→ semantic diff
→ human review
→ ChangeRequest
→ Git issue or pull request
→ canonical update
```

Martenweave’s existing product principle remains:

> Agents propose. Validators verify. Humans approve. Git records.

The UI should make that process easier, not remove it.

## Connect GitHub after the proposal is coherent

GitHub integration is valuable when the UI has already assembled:

- proposal;
- evidence;
- affected objects;
- validation result;
- impact;
- required reviewers.

The user can then create:

- issue draft;
- pull-request-ready patch;
- review package.

Do not use GitHub issue creation as the first response to every gap.

Many gaps require investigation before they are ready for implementation.

A useful lifecycle is:

```text
Gap
→ investigation
→ treatment decision
→ validated proposal
→ GitHub issue or pull request
```

## Persistence should focus on user work, not model truth

The canonical repository remains model truth.

The UI still needs to persist working state such as:

- saved investigations;
- review comments;
- draft proposals;
- evidence selections;
- user filters;
- closure decisions;
- acknowledgement of gaps.

This state should not be mixed into generated search indexes.

A clean separation is:

### Canonical store

Approved model files and Git history.

### Generated read store

SQLite or JSONL index and reports.

### Workspace store

Draft review and investigation state.

The workspace store could remain local initially.

A large multi-tenant persistence platform is not required for the next useful step.

## Use a local API as the product boundary

The frontend documentation already anticipates reading generated SQLite data or a local API rather than static `src/data.js`.

A local API provides a useful boundary for:

- query consistency;
- filesystem access;
- dataset profiling;
- proposal generation;
- validation;
- report generation;
- Git integration.

It also keeps sensitive project data local.

The browser does not need direct access to repository internals or local datasets.

## The API should return decision-ready responses

A weak API response exposes raw rows.

A stronger response supports the screen’s decision.

For example, an object-detail response might include:

```json
{
  "object": {},
  "ownership": [],
  "relationships": [],
  "current_gaps": [],
  "dataset_evidence": [],
  "pending_proposals": [],
  "validation": {},
  "provenance": {}
}
```

This does not mean one large endpoint must do everything.

It means the frontend contract should reflect the investigation needs rather than force the browser to rebuild domain logic.

## Add freshness and health indicators

Users need to know whether the visible result is current.

The UI should show:

- canonical repository commit;
- index build time;
- index freshness;
- last validation;
- dataset profile date;
- model baseline;
- API health.

For example:

```text
Model:
main@7ac29e1

Index:
Current

Validation:
Passed 14 July 2026, 16:20

Dataset evidence:
ERP_B profile from 12 July 2026

Warning:
One proposal was created against an older model baseline
```

Martenweave Core already documents index freshness, health and scorecard-oriented commands.

These should be visible where they affect trust.

## Avoid exposing technical health as product value

Users do not primarily care that SQLite was rebuilt successfully.

They care whether the answer is current.

Translate technical status into user meaning:

Weak:

> Index build completed.

Stronger:

> Search and impact results reflect the current canonical model.

Weak:

> Dataset hash changed.

Stronger:

> Existing readiness evidence is stale because a newer source extract is available.

## Use loading and error states that preserve trust

A model-governance UI must distinguish:

- no results;
- missing relationship;
- backend unavailable;
- index stale;
- validation failed;
- evidence not yet generated;
- user lacks access.

Do not replace all of these with:

> Something went wrong.

For example:

```text
Lineage unavailable

Reason:
The generated model index is older than the canonical repository.

Action:
Rebuild and validate the index before using impact results.
```

This helps the user understand whether the absence is meaningful.

## Do not hide validator failures behind the UI

Suppose a proposal produces an invalid reference.

The UI should show:

```text
Proposal cannot enter review

Validation error:
MAP-CUSTOMER-0042 references retired endpoint FEP-SAP-OLD-KDGRP

Affected objects:
3
```

Do not silently remove the broken relationship from the graph.

The user needs to see why the proposal is unsafe.

## Design one complete vertical slice

The best next implementation is not to connect every screen partially.

Build one end-to-end scenario.

### Suggested scenario

**Investigate a dataset-to-model gap and create a reviewable proposal.**

### User story

A migration analyst uploads or selects a supplier dataset.

Martenweave identifies that Supplier Risk is missing for part of the applicable population.

The user opens the gap, inspects the affected attribute and lineage, assesses the impact, creates a PatchProposal and routes it for review.

### Required live capabilities

1. Load canonical model.
2. Validate it.
3. Build or open the generated index.
4. Search for Supplier Risk.
5. Display Object Detail.
6. Profile the dataset.
7. Generate the gap.
8. Show affected population.
9. Display lineage and impact.
10. Create a PatchProposal.
11. Validate the candidate change.
12. Show semantic diff.
13. Save review state.
14. Produce a GitHub-ready issue or patch bundle.

This single slice proves the product promise.

## The acceptance test should use a real pain scenario

A useful acceptance scenario could be:

```text
Given:
A canonical Supplier Risk attribute is mandatory
for active strategic suppliers.

And:
ERP_B dataset has 27% missing values.

When:
The user profiles the dataset in Martenweave.

Then:
The UI shows the model expectation, observed population,
affected mappings and current owner.

When:
The user proposes a separate Supplier Review Status.

Then:
The UI shows the canonical diff, validation result,
impact on rules, tests and interfaces, and required reviewers.

And:
The approved model is not changed until review is complete.
```

This proves that the connected UI closes work, not just that endpoints respond.

## A second vertical slice: explain one field end to end

After the gap workflow, build:

> Explain this SAP target field.

The user enters:

```text
KNVV-KDGRP
```

The UI should show:

- business meaning;
- organisational context;
- source systems;
- transformations;
- dataset support;
- rules;
- decisions;
- consumers;
- current gaps;
- pending changes.

This is a strong demo and a real implementation need.

Many migration and AMS teams spend hours reconstructing exactly this chain.

## A third vertical slice: review a proposed change

The user opens a proposal to retire a target endpoint.

The UI should show:

- exact proposed change;
- affected mappings;
- country variants;
- current datasets;
- stale tests;
- unresolved consumers;
- reviewer questions.

The reviewer can:

- approve;
- reject;
- request changes;
- create follow-up issues.

This demonstrates controlled change, not only model browsing.

## Do not add a generic chatbot

The UI may include natural-language search or an assistant later.

It should not become the primary product interaction.

A generic chat response such as:

> Customer Group is mapped from CRM_A to KNVV-KDGRP.

is weaker than an inspectable object page showing:

- source;
- target;
- context;
- evidence;
- gaps;
- decision;
- impact.

Natural language should help users reach structured evidence.

It should not replace structured evidence.

## AI should operate inside the visible workflow

Useful AI assistance includes:

- suggesting likely object matches;
- summarising a lineage path;
- extracting candidate mappings from a workbook;
- drafting a gap explanation;
- proposing a patch;
- summarising impact;
- generating reviewer questions.

Each suggestion should link to the underlying objects and evidence.

For example:

```text
AI suggestion:
CRM_A.CUSTOMER_SEGMENT may not be equivalent to
sales-area Customer Group.

Evidence:
- source is central
- target is sales-area-specific
- definitions differ
- three mappings use direct replication

Action:
Open semantic review
```

This is far more useful than an isolated chat answer.

## Keep the product local-first

Martenweave’s current core and frontend direction are local-first. The UI runs locally, and the documented production path is through generated local indexes or a local API.

That is not a weakness for the target audience.

SAP migration and MDM evidence can contain:

- sensitive model details;
- customer and supplier structures;
- source-system information;
- local exceptions;
- sample datasets.

A local-first workspace can reduce deployment and confidentiality barriers during pilots.

Do not add multi-tenant SaaS architecture before the core workflow proves repeated value.

## What the first connected UI should not attempt

Avoid:

- direct SAP mutation;
- complete SAP configuration introspection;
- enterprise authentication platform;
- configurable workflow engine;
- unrestricted browser model editing;
- general project management;
- enterprise data catalogue replacement;
- full graph-database platform;
- broad AI chatbot;
- large dashboard suite.

These features increase complexity without proving the central value.

The first connected UI should solve:

> Find, explain, validate and safely change one important model relationship.

## Measure user value, not endpoint coverage

Weak success metrics include:

- number of API routes;
- percentage of screens connected;
- number of graph nodes rendered;
- number of UI components.

Better measures include:

### Time to explain a field

How long does it take to trace one SAP target field to source, rule and decision?

### Time to identify a dataset gap

Can a user connect a failed column or value to the model expectation?

### Time to assess change impact

Can the user identify affected mappings, tests and consumers?

### Proposal completeness

Does the proposal include evidence, validation and affected objects before review?

### Review efficiency

Can reviewers decide without reopening several workbooks and tickets?

### Reconstruction avoided

How much repeated manual analysis is removed?

These are the pains Martenweave is intended to close.

## A practical implementation sequence

### 1. Establish read contracts

Connect search, object detail, lineage and gaps to the generated index.

### 2. Add provenance and freshness

Show repository baseline, validation and evidence versions.

### 3. Connect dataset readiness

Allow a selected dataset profile to create visible object-level gaps.

### 4. Add impact analysis

Connect object and proposal views to core impact services.

### 5. Add proposal creation

Generate PatchProposal objects from gaps and object views.

### 6. Add proposal validation and semantic diff

Do not add approval before the reviewer can see meaningful consequences.

### 7. Persist review state

Store comments, reviewer decisions and proposal lifecycle.

### 8. Export to GitHub

Create issue or patch bundles after the proposal is coherent.

### 9. Add closure and AMS evidence

Extend the same object and evidence model after the investigation workflow works.

This sequence keeps the product focused.

## What management should ask

1. Which concrete user problem does each connected screen solve?
2. Is every displayed answer traceable to canonical truth?
3. Do CLI, API and UI use the same core services?
4. Can users see the model and dataset baseline?
5. Are proposed and approved states clearly separated?
6. Can a gap be traced to the exact object and population?
7. Can the user assess impact before proposing a change?
8. Does the UI create a PatchProposal rather than mutate the model directly?
9. Can reviewers understand the semantic diff?
10. Are model coverage limitations visible?
11. Can the workflow produce a GitHub-ready review package?
12. Does the connected UI reduce reconstruction work?
13. Is the product still local-first and focused?
14. Are we solving investigation and change control rather than building a generic dashboard?

If the team can answer technical API questions but not these product questions, the integration is being designed from the wrong direction.

## Common mistakes

### Replacing demo data with raw database rows

The interface becomes live but not decision-ready.

### Connecting every screen shallowly

No complete user workflow works end to end.

### Reimplementing core logic in JavaScript

CLI and UI eventually disagree.

### Treating dataset metrics as timeless

Evidence becomes misleading after model or extract changes.

### Showing proposed relationships as approved lineage

Users cannot distinguish truth from suggestion.

### Adding direct editing before proposal control

The UI bypasses the core governance principle.

### Creating GitHub issues too early

Uninvestigated gaps become noisy backlog items.

### Hiding backend health and baseline state

Users cannot judge whether results are current.

### Building a generic chatbot

Structured investigation becomes an opaque conversation.

### Measuring progress by screen coverage

The product may look complete while still failing to solve one real task.

## Our conclusion

Connecting Martenweave’s UI to live data is not a frontend completion exercise.

It is the point where the product must prove its operating model:

- canonical files hold approved model truth;
- deterministic validators check structure;
- generated indexes provide searchable relationships;
- datasets provide current evidence;
- the UI supports investigation and review;
- proposals remain separate from approved state;
- Git records accepted changes;
- humans retain decision authority.

Martenweave already has the correct user-facing foundation:

- search;
- object detail;
- lineage;
- gaps;
- proposals;
- review.

The next useful step is to connect one complete workflow:

> A user finds a real model-to-dataset gap, understands why it exists, sees what it affects, creates a validated proposal and sends a decision-ready change into review.

When that works, the UI is no longer a prototype demonstrating concepts.

It becomes the practical surface through which Martenweave closes one of the most expensive recurring pains in SAP migration and MDG programmes:

> Teams have plenty of evidence, but they cannot reliably connect it to the model decision that must be made.

That is the pain the product should continue to own.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We build Martenweave as a backend-first model-governance and evidence workspace for SAP migration, MDM, data governance and AMS teams.

The product combines:

- canonical model files;
- deterministic validation;
- generated indexes;
- dataset-gap analysis;
- lineage;
- impact analysis;
- proposal-first change control;
- an existing interactive UI for model investigation and review.

The objective is not to build another enterprise dashboard.

It is to give teams one traceable path from scattered evidence to an approved model decision.

## Sources and notes

This article was reviewed on 14 July 2026.

The current Martenweave Core README describes Martenweave as an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS. It uses canonical model files, deterministic validation, rebuildable generated indexes, dataset-gap analysis, trace, impact analysis and human-reviewed proposals.

The core’s current workflow moves from evidence through proposal, validation, gaps and impact to review and GitHub-ready output.

The current CLI documentation includes validation, index health, search, query, trace, impact, proposal, dataset-readiness and issue-draft workflows.

The Martenweave repository already contains a browser-based interactive workspace with Home, Models, Object Detail, Lineage, Gaps, Proposals and Proposal Review screens. The current implementation runs locally with demo data, and its documented integration direction is to consume the generated SQLite index or a local Martenweave API.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
