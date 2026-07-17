# How Martenweave Represents a Data Model in Markdown and YAML

**Reviewed: 14 July 2026**

A migration team needs to confirm the meaning of `Customer Group`.

The answer appears to exist in several places:

- an Excel mapping workbook says it comes from CRM Segment;
- an SAP design document describes it as sales-area-specific;
- a Jira decision says the central source cannot be used without enrichment;
- a validation report shows that 18% of applicable records are blank;
- the SAP target field is `KNVV-KDGRP`;
- a local team maintains exceptions in another spreadsheet.

None of these artefacts is necessarily wrong.

The problem is that none of them represents the complete governed object.

The team does not merely need another document titled “Customer Group.” It needs a model object that can answer:

- What does the attribute mean?
- At which business and organisational level does it exist?
- Which entity owns it?
- Which source and target endpoints are connected to it?
- Which mappings implement it?
- Which rules govern it?
- Which decisions changed its interpretation?
- Which datasets provide evidence about it?
- Which objects would be affected if it changed?

A conventional document can explain some of this.

A conventional database can store some of this.

Martenweave uses a different arrangement:

> Each governed model object is represented as a canonical, human-readable file containing structured YAML metadata and explanatory Markdown content.

The YAML frontmatter carries the structure that machines must validate and connect.

The Markdown body carries the explanation that humans must understand and review.

The file itself becomes the smallest durable unit of model truth.

Martenweave’s current core explicitly treats Markdown files with YAML frontmatter under `model/` as the source of truth. SQLite and JSONL outputs are generated from those files and are intended to be rebuildable rather than independently authoritative.

This choice sounds simple.

Its consequences are significant.

---

## The model is not one document

Enterprise model specifications often begin as one large workbook or one large document.

That approach is attractive because everything appears to be in one place.

Over time, the file becomes difficult to govern:

- different teams edit different sections;
- references exist only as labels;
- one change creates unrelated review noise;
- merge conflicts become difficult to interpret;
- historical decisions are mixed with current state;
- automated validation requires custom parsing;
- ownership remains document-level rather than object-level.

A model registry should not treat “the supplier model” or “the customer workbook” as the smallest controlled item.

The meaningful unit is usually smaller:

- one domain;
- one entity;
- one attribute;
- one relationship;
- one rule;
- one mapping;
- one decision;
- one evidence item;
- one change proposal.

The current Martenweave product description lists generic model concepts including domains, entities, attributes, relationships, datasets, mappings, rules, evidence, decisions and change proposals. SAP migration and MDM are the first proof domain rather than the limit of the underlying model.

Each object should therefore have:

- stable identity;
- declared type;
- explicit references;
- controlled metadata;
- readable explanation;
- independent change history.

This is why the model is represented as a repository of related objects rather than one monolithic specification.

---

# One file, two audiences

A canonical model file needs to serve both humans and machines.

These audiences need different things.

A machine needs:

- predictable fields;
- identifiers;
- types;
- lists;
- references;
- dates;
- statuses;
- validation constraints.

A human needs:

- context;
- rationale;
- examples;
- boundaries;
- uncertainty;
- implications;
- explanation of rejected alternatives.

Pure YAML is strong for structure but weak for extended explanation.

Pure Markdown is readable but unreliable for deterministic interpretation.

Combining them creates a useful separation.

A conceptual file may look like this:

```markdown
---
id: ATTR-CUSTOMER-GROUP
type: Attribute
name: Customer Group
domain: DOMAIN-CUSTOMER
entity: ENTITY-CUSTOMER-SALES-AREA
status: approved

owners:
  - ROLE-GLOBAL-CUSTOMER-DATA-OWNER

field_endpoints:
  - FEP-S4-KNVV-KDGRP

rules:
  - RULE-CUSTOMER-GROUP-REQUIRED

mappings:
  - MAP-CRM-SEGMENT-TO-CUSTOMER-GROUP
---

# Customer Group

Customer Group is a sales-area-level commercial classification used
for approved downstream sales and reporting processes.

It must not be treated as automatically equivalent to the central CRM
Segment. Any derivation from CRM Segment requires an approved mapping
for the applicable sales-area context.

## Known constraints

The current source landscape does not provide a reliable organisational
value for every customer and sales area.

## Open evidence

The ERP_B migration dataset contains records for which the sales-area
assignment exists but Customer Group remains unavailable.
```

This example is conceptual and should not be treated as the exact current Martenweave schema.

It demonstrates the division of responsibility.

The frontmatter says what the object is and how it connects.

The body explains what the object means and why those connections exist.

---

# YAML should carry facts that must be validated

A useful design rule is:

> If the system must validate, query, compare or traverse it, the information should be structured.

Examples include:

- object ID;
- object type;
- domain;
- entity;
- status;
- owner;
- references;
- applicability;
- effective date;
- superseded objects;
- source and target endpoints;
- linked decisions;
- linked evidence.

Consider ownership.

Weak representation:

```markdown
The Customer Data Owner is responsible for this field.
```

The sentence is readable, but the system cannot reliably determine:

- which owner role is meant;
- whether that role exists;
- whether the assignment is current;
- whether another object references the same role;
- whether the role owns global meaning or only local maintenance.

Structured representation is stronger:

```yaml
owners:
  semantic:
    - ROLE-GLOBAL-CUSTOMER-DATA-OWNER
  operational:
    - ROLE-CUSTOMER-DATA-STEWARD
```

The Markdown can still explain the distinction.

The YAML makes it testable.

---

# Markdown should carry meaning that should not be compressed into fields

The opposite mistake is placing everything into YAML.

A technically complete but unreadable object may contain dozens of fields:

```yaml
definition: "..."
rationale: "..."
usage_notes: "..."
limitations: "..."
examples: "..."
non_examples: "..."
migration_notes: "..."
local_notes: "..."
```

This creates the appearance of structure while turning long-form reasoning into escaped text.

Markdown is better for:

- definitions;
- rationale;
- examples;
- decision context;
- migration notes;
- business consequences;
- known uncertainties;
- implementation guidance;
- explanations of non-equivalence.

A model object is not only a database row.

It is an explanation with a machine-checkable identity and structure.

The design should preserve both.

---

# Critical truth must not exist only in prose

Markdown is useful, but it can become another hiding place.

Suppose a rule object says in its body:

> This rule applies only to supplier organisations in Portugal after final activation.

But its structured metadata contains only:

```yaml
type: Rule
entity: ENTITY-SUPPLIER
```

The system cannot test the real applicability.

It cannot detect overlap with another rule.

It cannot generate the correct population.

It cannot identify whether a local override exists.

The rule’s most important constraints have been left in prose.

Therefore:

- explanation belongs in Markdown;
- governing dimensions belong in YAML;
- the two must agree.

Where that agreement cannot be validated automatically, review should make the limitation explicit.

---

# Stable IDs matter more than file names

Human-readable file names are useful.

They are not sufficient as object identity.

A file may be renamed because:

- terminology improves;
- naming conventions change;
- the object moves between folders;
- the label becomes more precise;
- localisation is introduced.

The identity should survive.

Example:

```yaml
id: ATTR-CUSTOMER-GROUP
```

The filename might initially be:

```text
customer-group.md
```

Later it may become:

```text
sales-area-customer-group.md
```

The ID remains stable.

This is essential because other objects may reference it:

```yaml
attributes:
  - ATTR-CUSTOMER-GROUP
```

Stable IDs make it possible to distinguish:

- a rename;
- a semantic change;
- a replacement;
- a deletion;
- a new object.

Without stable identity, comparison becomes dependent on labels and paths.

---

# An ID should identify the concept, not its current implementation

A common modelling error is tying business identity directly to a technical endpoint.

For example:

```text
ATTR-KNVV-KDGRP
```

This makes the object appear to be the SAP field.

But the business attribute may:

- exist before SAP;
- map from several sources;
- move to another endpoint;
- be represented differently in another target;
- require a separate semantic definition.

A stronger separation is:

```text
ATTR-CUSTOMER-GROUP
FEP-S4-KNVV-KDGRP
```

The first identifies the business attribute.

The second identifies the physical field endpoint.

A mapping or relationship connects them.

This separation allows Martenweave to answer:

- What business concept does the SAP field implement?
- Which other fields implement the same concept?
- What happens if the SAP endpoint changes?
- Which mappings and rules depend on the business attribute?

The repository’s current examples and command documentation explicitly distinguish trace and impact operations for business attributes and field endpoints.

---

# References should be explicit, not inferred from text

Suppose a mapping file contains:

```markdown
This mapping sends Customer Group to KNVV-KDGRP.
```

A human understands the relationship.

A machine may need to guess:

- which Customer Group object;
- which system contains the field;
- which organisational context applies;
- whether this is the current approved endpoint.

Explicit references are safer:

```yaml
source:
  attribute: ATTR-CRM-SEGMENT

target:
  attribute: ATTR-CUSTOMER-GROUP
  endpoint: FEP-S4-KNVV-KDGRP

decision:
  - DEC-CUSTOMER-GROUP-SOURCE-017
```

Deterministic validation can then check:

- whether the referenced objects exist;
- whether object types are compatible;
- whether the mapping remains active;
- whether the decision is superseded;
- whether domain and context rules are satisfied.

Martenweave’s core principle is to validate IDs, types, references and domain-context rules before building its indexes.

---

# Files should express a graph without requiring a graph database

Enterprise model knowledge is relational.

An attribute connects to:

- entity;
- domain;
- owner;
- source field;
- target field;
- mapping;
- rule;
- evidence;
- decision;
- dataset;
- proposal.

This forms a graph.

That does not mean a graph database must be the canonical source of truth.

The canonical files can declare references.

The generated index can resolve them into edges for:

- search;
- trace;
- impact;
- viewer generation;
- reporting.

Martenweave’s demo workflow generates a SQLite database together with search and lineage JSONL outputs from the canonical model repository. Those generated artefacts are described as disposable and rebuildable.

This is an important architectural boundary.

The repository stores truth.

The index optimises access.

The index can be rebuilt.

---

# Why the generated database is not the source of truth

SQLite is useful for:

- indexed queries;
- joins;
- full-text search;
- aggregated reports;
- trace traversal;
- viewer generation;
- API access.

It is not the preferred place for human review of canonical changes.

If the generated database were independently editable, the project would create two truths:

```text
Canonical files
vs.
Database state
```

The same problem would appear with any search index or graph database.

The safer direction is one-way:

```text
Canonical files
→ deterministic validation
→ generated SQLite and JSONL indexes
→ reports, APIs and views
```

If the generated artefacts are deleted, the model remains.

If the canonical files are lost, the model has lost its governed source.

The README states that `build-index` performs a full rebuild of SQLite and JSONL outputs from the canonical files in order to keep index generation deterministic.

---

# Rebuildability is a governance feature

Rebuildability may look like a technical implementation detail.

It provides several governance benefits.

## It prevents hidden state

No manual database edit should become authoritative.

## It exposes incomplete canonical files

If the index cannot be rebuilt, the repository is not self-contained.

## It improves reproducibility

Two users can build from the same model baseline and expect equivalent generated state.

## It simplifies review

Reviewers inspect canonical diffs rather than opaque database changes.

## It supports portability

The model is not trapped in one deployed database instance.

This is especially valuable in consulting, migration and AMS environments where:

- client access changes;
- teams rotate;
- environments are temporary;
- SaaS procurement may be difficult;
- long-term evidence must remain portable.

---

# Validation must happen before indexing

A search index can make invalid objects appear usable.

For example:

- a mapping references a missing attribute;
- a rule points to a retired value list;
- an owner ID does not exist;
- two objects share one ID;
- a decision refers to an unknown proposal.

If these objects are indexed without a validation gate, users may query and report on inconsistent state.

The correct order is:

```text
Parse
→ validate object structure
→ validate references
→ validate contextual constraints
→ build index
```

Martenweave describes deterministic validation as the first gate and exposes a `validate` command before `build-index` in its documented workflow.

The current package also declares Pydantic and PyYAML among its dependencies, supporting typed Python processing of YAML-backed data.

Validation should remain conservative.

It should detect contradictions and missing structure.

It should not invent business meaning.

---

# Structural validation is not semantic approval

A file may pass every schema check and still describe a poor model.

Example:

```yaml
id: ATTR-SUPPLIER-RISK
type: Attribute
name: Supplier Risk
allowed_values:
  - LOW
  - HIGH
  - UNDER_REVIEW
```

The file may be structurally valid.

Semantically, it may mix:

- final risk classification;
- workflow state.

Deterministic validation can detect only what has been encoded as a rule.

It might flag the issue when:

- value dimensions are explicitly declared;
- status values are prohibited for classification attributes;
- another object already defines Review Status;
- a decision marks the value as rejected.

Otherwise, human review remains necessary.

Martenweave should not claim that machine-valid YAML automatically produces a correct enterprise model.

The stronger principle is:

> Validators establish structural and declared consistency. Accountable humans establish meaning.

---

# File structure should support narrow changes

Suppose one decision changes the source treatment for Customer Group.

In a monolithic workbook, the diff may include:

- formatting changes;
- recalculated cells;
- unrelated sheets;
- generated metadata;
- comments.

In an object-based repository, the change can be narrow:

```text
model/mappings/customer-group-source.md
model/decisions/customer-group-source-decision.md
```

The reviewer can see:

- which objects changed;
- which references were added;
- which status moved;
- which wording was updated.

Narrow files improve:

- review quality;
- Git history;
- ownership;
- mergeability;
- impact analysis;
- rollback.

This does not mean every sentence needs its own file.

The object boundary should follow governance identity.

---

# One file per object is a useful default, not a religion

Very small objects may sometimes be grouped.

Very large objects may need supporting files.

The important constraints are:

- stable identity;
- clear review boundary;
- deterministic parsing;
- explicit references;
- manageable ownership.

Avoid both extremes.

## One giant file

Problems:

- noisy diffs;
- broad ownership;
- hard merges;
- weak object history.

## Thousands of trivial fragments

Problems:

- difficult navigation;
- excessive references;
- unnecessary administrative overhead;
- reduced readability.

A practical object should contain one coherent governed concept or evidence item.

---

# Folders help humans, IDs protect machines

A repository may organise files into directories:

```text
model/
  domains/
  entities/
  attributes/
  relationships/
  mappings/
  rules/
  evidence/
  decisions/
  patch-proposals/
```

This makes the repository understandable.

The folder path should not be the only type system.

The object should still declare its type:

```yaml
type: Attribute
```

This allows validation to detect:

- an Attribute placed in the wrong folder;
- a file renamed or moved;
- an unsupported object type;
- an incorrect reference.

Folders are navigation.

Metadata is identity and structure.

---

# Decisions should be objects, not comments

A model frequently changes because someone decided:

- two terms are not equivalent;
- one source is authoritative;
- a rule applies only at activation;
- a local exception is valid;
- a temporary deviation expires;
- a field should be split.

If the decision exists only in:

- email;
- ticket comment;
- meeting notes;
- pull-request discussion;

the model may show what changed but not why.

A Decision object should preserve:

- question;
- alternatives;
- evidence;
- chosen outcome;
- authority;
- date;
- affected objects;
- superseded decisions.

Example:

```markdown
---
id: DEC-CUSTOMER-GROUP-SOURCE-017
type: Decision
status: approved
owners:
  - ROLE-GLOBAL-CUSTOMER-DATA-OWNER
affects:
  - ATTR-CUSTOMER-GROUP
  - MAP-CRM-SEGMENT-TO-CUSTOMER-GROUP
supersedes:
  - DEC-CUSTOMER-GROUP-SOURCE-008
---

# CRM Segment is not automatically equivalent to Customer Group

The central CRM Segment does not provide sufficient organisational
context to determine Customer Group for every sales area.

Direct replication is therefore rejected.

A governed enrichment or sales-area-specific mapping is required.
```

This example is conceptual.

The design principle is essential:

> Current truth and the decision that produced it should remain connected.

---

# Evidence should be referenced, not copied indiscriminately

A model repository should not become a dumping ground for:

- production datasets;
- confidential spreadsheets;
- complete ticket histories;
- large validation exports;
- sensitive emails.

Evidence objects can preserve:

- source reference;
- description;
- checksum or stable identifier;
- extracted facts;
- date;
- owner;
- confidence;
- affected model objects.

The repository stores enough to explain and reproduce the decision where appropriate.

Sensitive or operational evidence can remain in its source system.

This separation supports a backend-first model registry without turning it into a document-management platform.

---

# Proposals should remain separate from approved truth

An AI agent, analyst or imported spreadsheet may suggest:

- new mapping;
- new rule;
- changed ownership;
- new attribute;
- changed definition.

The proposal should not overwrite the canonical approved object immediately.

Martenweave’s current design explicitly states that AI must not silently mutate the model. AI creates `PatchProposal` objects for human review, and approved changes become `ChangeRequest`s.

This separation allows the repository to contain:

- current approved state;
- proposed change;
- supporting evidence;
- review status;
- eventual decision.

The workflow can be expressed as:

```text
Evidence
→ PatchProposal
→ deterministic validation
→ impact analysis
→ human review
→ approved change
```

The README summarises the broader pipeline as evidence moving through proposal, validation, gaps and impact analysis to human-reviewed GitHub issues or pull requests.

---

# Git provides history, but the model must remain explicit

Git can show:

- who changed a file;
- when it changed;
- what lines changed;
- which review approved the change.

That does not remove the need for model-level status and decision objects.

A Git commit such as:

```text
Update customer model
```

cannot reliably explain:

- which business decision was approved;
- whether the change is global or local;
- which evidence supported it;
- whether a previous decision was superseded;
- which implementations must align.

Use Git for durable technical history.

Use canonical objects for durable model meaning.

---

# Markdown and YAML are not automatically business-friendly

Human-readable source files are more approachable than database records.

That does not mean every business owner should edit YAML directly.

Some users will prefer:

- Excel;
- Google Sheets;
- forms;
- generated reports;
- a frontend;
- reviewed issue comments.

Martenweave’s current command set includes import and export paths for spreadsheets and Google Sheets, including importing spreadsheet edits as proposals rather than treating them as direct canonical mutations.

This is the right boundary:

- business users may review and propose through familiar formats;
- canonical truth remains represented in deterministic model objects;
- imported changes become proposals;
- validators and reviewers control acceptance.

The file format is the governance substrate.

It does not need to be every user’s primary editing interface.

---

# Canonical does not mean universally complete

A canonical model repository should not attempt to contain every fact about the enterprise.

It should contain the facts needed to govern model meaning and change.

It may reference:

- SAP configuration;
- data catalogues;
- MDM platforms;
- ITSM systems;
- data-quality tools;
- source repositories;
- test-management systems.

Martenweave is not intended to replace all these applications. The current README explicitly describes it as a backend-first model-governance pipeline rather than a hosted MDM platform, generic workflow engine, chatbot or direct SAP write-back solution.

The canonical repository should answer:

- What is the governed object?
- How is it connected?
- Which evidence and decision support it?
- What is proposed to change?
- What could be affected?

It does not need to operate every downstream process.

---

# A complete object chain

Consider one SAP Customer Group scenario.

A coherent repository might contain:

```text
DOMAIN-CUSTOMER
└── ENTITY-CUSTOMER-SALES-AREA
    └── ATTR-CUSTOMER-GROUP
        ├── FEP-CRM-CUSTOMER-SEGMENT
        ├── FEP-S4-KNVV-KDGRP
        ├── MAP-CRM-SEGMENT-TO-CUSTOMER-GROUP
        ├── RULE-CUSTOMER-GROUP-REQUIRED
        ├── EVID-ERP-B-CUSTOMER-GROUP-PROFILE
        ├── DEC-CUSTOMER-GROUP-SOURCE-017
        └── PATCH-CUSTOMER-GROUP-ENRICHMENT-004
```

Each line represents a separate governed object or reference.

The generated index can then answer:

- show all evidence for Customer Group;
- trace from CRM source to SAP endpoint;
- identify the active mapping;
- show the decision that rejected direct equivalence;
- list open proposals;
- calculate downstream impact.

The repository remains readable.

The index provides efficient query.

---

# What should happen when a file changes

A controlled change should trigger a deterministic sequence.

## 1. Parse

Read the YAML frontmatter and Markdown body.

## 2. Validate the object

Check required fields, types and declared constraints.

## 3. Validate references

Confirm that linked IDs exist and are compatible.

## 4. Validate repository context

Check uniqueness, domain rules, statuses and lifecycle consistency.

## 5. Rebuild or refresh generated indexes

Produce SQLite and JSONL representations from canonical state.

## 6. Run impact analysis

Identify dependent objects and implementations.

## 7. Review the semantic diff

Determine whether the change is merely editorial or modifies model truth.

## 8. Approve and record

Use human review and Git history.

The current CLI exposes commands for validation, index building, freshness checking, diffing, trace, impact analysis, ownership reporting, dataset readiness and proposal creation.

---

# Semantic diff matters more than line diff

Git shows line-level change.

Model governance needs semantic interpretation.

Consider:

```diff
- required: false
+ required: true
```

This may be a one-line change.

Its impact may include:

- source remediation;
- SAP validation;
- migration readiness;
- workflow;
- business process;
- test cases;
- local exceptions.

Another change may rewrite several paragraphs without changing governed behaviour.

A useful model diff should distinguish:

- editorial change;
- metadata correction;
- relationship change;
- applicability change;
- value-list change;
- ownership change;
- lifecycle change;
- breaking semantic change.

The canonical file format makes this analysis possible because critical fields are structured.

---

# Common mistakes

## Treating Markdown as authoritative prose without structured references

The repository becomes searchable documentation, not a validated model.

## Treating YAML as a complete substitute for explanation

The model becomes technically precise but difficult to review responsibly.

## Using filenames as identity

Renames appear as delete-and-create operations.

## Using SAP fields as business-object identity

Business meaning becomes coupled to one implementation.

## Allowing manual database edits

Generated and canonical state diverge.

## Copying every source document into the repository

The registry becomes an unmanaged archive.

## Allowing imported spreadsheets to overwrite canonical state

Business convenience bypasses review.

## Storing proposed and approved truth in the same object without status

Review boundaries disappear.

## Creating object types without clear governance purpose

The schema expands faster than product value.

---

# The smallest useful repository

A pilot does not need hundreds of object types.

A useful first scope may include:

- one domain;
- one or two entities;
- ten critical attributes;
- source and target endpoints;
- mappings;
- a small set of rules;
- evidence from one dataset;
- decisions;
- one proposal.

For example:

```text
Customer
→ Customer Sales Area
→ Customer Group
→ CRM Segment
→ KNVV-KDGRP
→ source mapping
→ readiness evidence
→ approved decision
```

This is sufficient to demonstrate:

- canonical representation;
- validation;
- indexing;
- trace;
- impact;
- reviewable change.

The architecture should prove value on one real chain before expanding into an enterprise metamodel.

---

# Where the approach is weak

Markdown and YAML have limitations.

## Large-scale manual editing

Thousands of objects may require generated or assisted authoring.

## Business-user accessibility

Not every owner is comfortable reviewing source files.

## Complex transactional workflows

Files are not a replacement for operational MDM workflow.

## Fine-grained access control

Git repository permissions may be too broad for some organisational models.

## Real-time runtime enforcement

Canonical files define truth but do not enforce SAP transactions directly.

## Cross-repository consistency

Large organisations may need stronger tooling for dependencies between repositories.

These are legitimate constraints.

They do not invalidate the architecture.

They define where Martenweave should integrate with:

- user-facing review tools;
- enterprise catalogues;
- MDM platforms;
- ITSM systems;
- CI pipelines;
- agent workflows.

---

# Why this architecture fits Martenweave

Martenweave’s north star is not to become another place where model information is manually re-entered.

Its purpose is to convert scattered evidence into a traceable, validated and reviewable model layer.

Markdown and YAML support that purpose because they are:

- portable;
- inspectable;
- diffable;
- versionable;
- scriptable;
- independent of one hosted application.

SQLite and JSONL support the operational side because they are:

- queryable;
- indexable;
- rebuildable;
- suitable for search, APIs and generated views.

Git supports the change record.

Validators support consistency.

AI and imports create proposals.

Humans approve meaning.

The parts have distinct responsibilities:

```text
Markdown:
Explanation

YAML:
Governed structure

Canonical repository:
Source of truth

Validators:
Declared consistency

SQLite and JSONL:
Generated access layer

AI:
Proposal assistance

Humans:
Authority and approval

Git:
Durable change history
```

This division is the architecture.

---

# Final perspective

The value of Markdown and YAML is not that they are simple file formats.

The value is that they allow model truth to remain:

- reviewable by humans;
- processable by machines;
- testable before publication;
- portable across environments;
- versioned through explicit changes;
- independent of generated indexes and user interfaces.

A Martenweave model file should not be merely a page of documentation.

It should be a governed object.

Its YAML should state enough structure for deterministic validation and graph construction.

Its Markdown should explain enough meaning for responsible human review.

Its ID should remain stable.

Its references should be explicit.

Its generated database representation should be disposable.

Its proposed changes should remain separate until approved.

The practical test is:

> If the generated database, search index and viewer disappeared today, could the organisation rebuild them—and still understand the meaning, ownership, evidence and history of every important model object from the canonical repository?

When the answer is yes, the files are the source of truth.

When the answer is no, the repository is only another export from the real system.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It represents model knowledge as canonical, reviewable objects and derives searchable indexes, lineage, impact reports and change proposals from them.

The objective is not to replace enterprise MDM, data catalogues or workflow platforms.

It is to give their shared model knowledge a durable, validated and AI-ready source of truth.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave Core currently describes itself as an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS. It connects spreadsheets, datasets, tickets, validation reports, decisions and SAP context to canonical model files, deterministic validation, dataset-gap reporting, lineage, impact analysis and human-approved proposals.

The current core defines Markdown files with YAML frontmatter under `model/` as the source of truth. Generated SQLite and JSONL artefacts are rebuildable, validation precedes indexing, and AI-generated changes remain reviewable proposals requiring human approval.

The documented workflow moves from evidence to proposal, validation, gap and impact analysis, human review and GitHub issue or pull-request output. Martenweave explicitly does not position itself as a generic workflow platform, hosted MDM product or direct SAP write-back mechanism.

The current package declares Python 3.11 or later and includes Pydantic, PyYAML, Typer, Rich, OpenPyXL, FastAPI and Uvicorn among its core dependencies.

The public demo flow generates a rebuildable SQLite database, search-document JSONL and lineage-edge JSONL from canonical model files and uses those outputs for search, trace, impact and generated local views.

Martenweave is independent and is not affiliated with or endorsed by SAP or other vendors discussed in the broader article series.
