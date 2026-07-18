# How Martenweave Builds a Searchable SQLite Model Index

**Reviewed: 14 July 2026**

A migration analyst searches for:

```text
Customer Group
```

The expected answer is not one document.

The analyst needs to find a connected set of objects:

- the business attribute;
- the SAP field endpoint;
- source fields;
- active mappings;
- validation rules;
- ownership;
- migration evidence;
- approved decisions;
- open proposals;
- downstream dependencies.

The canonical Martenweave repository may contain each of these as a separate Markdown and YAML object.

That arrangement is useful for governance and review.

It is not the most efficient representation for every query.

Answering one search directly from the files could require the system to:

1. discover every model file;
2. parse YAML frontmatter;
3. read Markdown bodies;
4. validate object types;
5. resolve references;
6. build reverse relationships;
7. search text;
8. rank results;
9. calculate connected objects.

Repeating that process for every query would be wasteful.

Martenweave therefore separates canonical storage from query access.

> Canonical files preserve model truth. A generated SQLite index makes that truth searchable, queryable and traversable.

The public Martenweave demo flow currently validates the canonical repository and then generates three principal artefacts:

```text
generated/modelops.db
generated/search_documents.jsonl
generated/lineage_edges.jsonl
```

The documentation describes all three as disposable and rebuildable.

This architecture creates two layers:

```text
Canonical layer:
human-readable, versioned model objects

Generated layer:
optimised query, search and relationship projections
```

The SQLite database is not a second model.

It is a compiled representation of the canonical one.

---

# Think of the index as a build artefact

A useful comparison is software compilation.

Source code is written for review, maintenance and version control.

A compiled artefact is created for execution.

The executable may be faster and more convenient for a machine, but developers do not normally edit the executable to change the source programme.

Martenweave follows a similar principle:

```text
Markdown and YAML model files
→ parse
→ validate
→ normalise
→ resolve references
→ build SQLite and JSONL artefacts
```

The generated index is designed for consumption by:

- command-line queries;
- local APIs;
- generated viewers;
- agents;
- reports;
- impact analysis;
- lineage traversal.

A model change still begins with canonical files or with a proposal that may eventually change them.

It does not begin by editing a row in `modelops.db`.

---

# The pipeline begins before SQLite

The most important part of index construction happens before the first row is inserted.

A reliable build should proceed through several gates.

## File discovery

The builder identifies canonical files inside the repository.

It must distinguish them from:

- generated outputs;
- reports;
- sample datasets;
- documentation;
- archived material;
- temporary files.

## Parsing

For each canonical object, the builder reads:

- YAML frontmatter;
- Markdown content;
- repository path;
- file metadata needed for the build.

## Structural validation

The object is checked against its declared type.

An Attribute and a Decision should not require the same fields.

## Identity validation

The system checks:

- missing IDs;
- duplicate IDs;
- unsupported object types;
- invalid statuses;
- malformed references.

## Reference validation

Links between objects are checked before they are projected into database relationships.

## Contextual validation

Domain-specific rules can determine whether an object is structurally plausible in its declared context.

Only after these stages should the system publish a searchable index.

The Martenweave README explicitly places deterministic validation before indexing and states that object IDs, types, references and domain-context rules are validated.

---

# Why validation must precede search

Search systems can make invalid information look authoritative.

Suppose a mapping refers to:

```text
ATTR-CUSTOMER-GRUP
```

when the real object is:

```text
ATTR-CUSTOMER-GROUP
```

If the index accepts the broken reference:

- the mapping may appear in search;
- the attribute may appear separately;
- trace may fail to connect them;
- impact analysis may undercount dependencies;
- users may assume no relationship exists.

The search result is technically available but structurally misleading.

The same problem appears when:

- two objects share an ID;
- a rule references a retired attribute;
- a mapping points to a Decision instead of an Attribute;
- an owner reference does not exist;
- an object declares an unsupported status.

An index builder should therefore refuse or clearly qualify invalid state rather than make it easier to browse.

Searchability is not a substitute for integrity.

---

# The full rebuild is deliberate

Martenweave currently documents `build-index` as a full rebuild that drops and recreates generated database tables. The design is intended to keep generated state deterministic and aligned with canonical files.

A full rebuild may appear less sophisticated than incremental synchronisation.

For the current product stage, it has strong advantages.

## Deleted objects disappear reliably

If a canonical file is removed, the corresponding database representation disappears during rebuild.

No special delete event needs to be preserved.

## Renamed objects do not leave stale rows

The new build reflects the current canonical baseline.

## Changed relationships are recalculated

Reverse links and graph edges do not depend on correctly processing every historical update event.

## Schema migrations are simpler

The builder can recreate the generated schema from the currently supported definition.

## Debugging becomes easier

Given the same repository baseline and compatible build version, the team can investigate the same input state.

## Hidden database edits are erased

A manual modification to the generated database does not survive the next build.

This is a governance property, not only a technical convenience.

---

# Full rebuild versus incremental update

A future large-scale deployment may eventually need more incremental behaviour.

That does not mean the canonical architecture should change.

The distinction is:

```text
Canonical authority:
always repository files

Build strategy:
full or incremental projection
```

An incremental builder could process only changed files while still treating the database as disposable.

But incremental indexing introduces more complexity:

- change detection;
- delete handling;
- dependency invalidation;
- reverse-edge updates;
- failed partial builds;
- schema migrations;
- recovery from interrupted writes;
- stale-cache detection.

A full rebuild is often the safer first implementation when the model repository remains within a manageable size.

The current README notes that a configurable warning may be emitted as a repository grows and that very large repositories may eventually require a higher limit or separation into multiple repositories.

That is a reasonable boundary.

Do not introduce distributed indexing machinery before repository scale proves it necessary.

---

# From heterogeneous objects to a common projection

Canonical objects are not identical.

An Attribute may contain:

- definition;
- entity;
- domain;
- owners;
- value list;
- endpoints.

A Mapping may contain:

- source;
- target;
- transformation;
- conditions;
- decision references.

A Rule may contain:

- applicability;
- expression;
- severity;
- lifecycle stage.

A Decision may contain:

- question;
- alternatives;
- outcome;
- authority;
- affected objects.

The database needs to preserve their differences while still supporting common queries.

A conceptual projection can be divided into three layers.

## Object registry

One row per canonical object with common fields such as:

```text
id
type
name
status
domain
path
title
summary
```

## Type-specific properties

Structured data that differs by object type.

This can be represented through:

- dedicated tables;
- normalised property tables;
- JSON columns;
- a combination of these approaches.

## Relationships

Explicit links between object IDs.

Examples:

```text
Attribute → Entity
Mapping → Source endpoint
Mapping → Target endpoint
Rule → Attribute
Decision → Affected object
Evidence → Supported finding
Proposal → Changed object
```

The exact current Martenweave table schema is not documented as a public compatibility contract.

That is appropriate.

Users should depend on supported CLI, export and API behaviour rather than on undocumented internal table names.

---

# Do not make the database schema the public model schema

This distinction is easy to miss.

There are at least three schemas involved:

## Canonical object schema

Defines what an Attribute, Mapping, Decision or other model object means.

## Generated database schema

Defines how those objects are efficiently stored for local querying.

## External API or export schema

Defines what supported consumers receive.

These schemas may overlap.

They should not be assumed to be identical.

For example, the database may contain:

- normalised lowercase text;
- computed search fields;
- reverse relationships;
- build metadata;
- source-file hashes;
- cached risk scores.

These fields help indexing.

They are not necessarily canonical model properties.

Keeping the layers separate allows database optimisation without redefining the product’s domain model.

---

# Search needs a document representation

Relational filtering is useful when the user knows exactly what to request:

```text
Show every object of type Attribute.
```

The Martenweave demo exposes this through a type-oriented query command:

```bash
martenweave query --type Attribute --repo examples/customer_bp_model
```

It also exposes a free-text search command:

```bash
martenweave search "Customer Group" --repo examples/customer_bp_model
```

Both commands are part of the public demo path.

Free-text search requires a different projection.

A search document may combine selected information from the canonical object:

```text
ID:
ATTR-CUST-SALES-CUSTOMER-GROUP

Type:
Attribute

Name:
Customer Group

Domain:
Customer

Body:
Customer Group is a sales-area-level commercial classification...

References:
FEP-S4-KNVV-KDGRP
MAP-CRM-SEGMENT-TO-CUSTOMER-GROUP
DEC-CUSTOMER-GROUP-SOURCE-017
```

This flattened document allows a search engine to find the object through:

- exact ID;
- label;
- body text;
- SAP field name;
- linked decision;
- aliases;
- related source terms.

The public build generates `search_documents.jsonl`, which makes the search projection portable outside SQLite as well.

---

# Why produce both SQLite and JSONL?

SQLite and JSONL solve different access problems.

## SQLite

Useful for:

- structured filters;
- joins;
- counts;
- local API queries;
- reverse relationships;
- combined search and metadata filtering;
- generated views.

## Search JSONL

Useful for:

- inspection;
- external indexing;
- agent pipelines;
- transfer into another search system;
- debugging the search projection;
- line-oriented processing.

## Lineage JSONL

Useful for:

- graph traversal;
- external visualisation;
- agent context;
- inspecting derived edges;
- integrating with another lineage consumer.

The generated files represent different projections of the same canonical repository.

They should agree on object identity.

They do not need to contain the same fields.

---

# SQLite is a practical local index

SQLite is suitable for a backend-first local model registry for several reasons.

It stores a complete relational database in a portable file format and supports indexes, transactions and SQL querying without requiring a separately managed database server. Its official documentation defines a stable on-disk database format and describes the database as a structured collection of pages containing tables, indexes and related database structures.

For Martenweave, this means the generated index can be:

- built locally;
- passed to another process;
- opened by the CLI;
- used by a local API;
- consumed by a static-viewer generator;
- deleted and recreated.

The choice fits the product’s current local-first direction.

Martenweave does not need PostgreSQL, Elasticsearch, Kafka or a graph platform merely to make a repository of model objects searchable.

Those tools may become relevant under different scale or concurrency requirements.

They are not prerequisites for proving the core value.

---

# Full-text search is not the same as SQL filtering

A normal relational query may find:

```sql
SELECT *
FROM objects
WHERE type = 'Attribute';
```

It is less suitable for a user entering:

```text
customer group sales area mapping
```

A full-text index tokenises documents and allows the engine to retrieve documents containing relevant terms.

SQLite provides the FTS5 virtual-table extension for full-text search. FTS5 supports term, phrase, prefix, proximity, column-filter and Boolean queries, as well as relevance ordering and snippet or highlighting functions.

However, Martenweave’s public documentation does not currently promise that every `search` implementation detail is based specifically on FTS5.

That internal choice should remain replaceable.

The public product contract should focus on behaviour:

- find objects by ID;
- find objects by name;
- search explanatory text;
- filter by type and context;
- return stable object references;
- connect results to trace and impact.

An internal search implementation can evolve without changing canonical model files.

---

# Search ranking should reflect model intent

Plain text frequency is not enough.

A query for:

```text
Customer Group
```

should probably rank:

1. the Attribute named Customer Group;
2. its SAP field endpoint;
3. active mappings;
4. governing decisions;
5. rules;
6. evidence mentioning the term;
7. unrelated objects where the phrase appears incidentally.

A useful ranking model can assign different weights to:

- exact ID match;
- exact name match;
- alias match;
- field-endpoint match;
- title match;
- type;
- status;
- body occurrence;
- relationship distance.

For example:

```text
Exact object ID:
very strong

Exact canonical name:
strong

Alias or SAP field:
strong

Markdown body:
moderate

Indirect linked object:
contextual boost
```

The ranking policy is part of product usefulness.

It should not become canonical truth.

Two ranking versions may order results differently while representing the same underlying model.

---

# Search should preserve object type

A user must be able to distinguish:

```text
Customer Group — Attribute
Customer Group mapping — Mapping
Customer Group mandatory rule — Rule
Customer Group source decision — Decision
Customer Group profile — Evidence
```

Returning one flattened list without object types recreates document-search ambiguity.

Each search result should expose enough structured context:

- ID;
- type;
- name or title;
- status;
- domain;
- short excerpt;
- key relationships;
- source path.

This allows the user or agent to decide which object to inspect next.

---

# Search should not hide lifecycle state

A retired rule and an approved rule may contain the same words.

A rejected proposal may describe a change more clearly than the active object.

Search results therefore need lifecycle context.

Examples:

```text
APPROVED
DRAFT
PENDING_REVIEW
RETIRED
REJECTED
SUPERSEDED
```

The system may rank approved objects higher by default.

It should still allow users to find:

- historical decisions;
- rejected proposals;
- retired mappings;
- superseded definitions.

Otherwise, search becomes convenient but historically misleading.

---

# The index turns forward references into reverse navigation

Canonical objects often declare forward references.

A Mapping may declare:

```yaml
source: FEP-CRM-SEGMENT
target: FEP-S4-KNVV-KDGRP
```

The SAP field endpoint does not need to list every mapping that targets it.

During indexing, the system can derive the reverse relationship:

```text
FEP-S4-KNVV-KDGRP
← targeted by MAP-CRM-SEGMENT-TO-CUSTOMER-GROUP
```

This is one of the main values of the generated index.

It can answer:

- Which mappings target this field?
- Which rules govern this attribute?
- Which decisions affect this object?
- Which proposals modify it?
- Which evidence supports it?

The canonical repository remains normalised around explicit references.

The index adds efficient reverse lookup.

---

# Lineage edges are another compiled output

Martenweave separately generates `lineage_edges.jsonl`.

That output can represent relationships such as:

```text
source field
→ mapping
→ business attribute
→ target field
→ rule
→ downstream consumer
```

The demo flow uses `trace` and `impact` to show how a business attribute, physical SAP field endpoint, mappings, issues, decisions and evidence stay connected.

This separation is useful.

The relational database may contain all object and relationship information.

The line-oriented edge export provides a simple integration format for:

- graph visualisation;
- external analytics;
- agent retrieval;
- troubleshooting;
- alternative graph stores.

Again, the JSONL file is generated.

An edge becomes canonical only because it is derived from approved object references—not because someone manually edited `lineage_edges.jsonl`.

---

# Freshness is part of correctness

A generated index can be structurally correct and still be outdated.

Suppose a canonical mapping changes after the last build.

The database continues returning the old mapping.

This is a stale-index problem.

Martenweave exposes an `index-fresh` command alongside `build-index` in its demo and README.

A freshness check may conceptually compare:

- canonical file modification state;
- repository or content hash;
- build manifest;
- index build timestamp;
- expected schema version.

The exact mechanism may evolve.

The user-facing result should remain simple:

```text
Fresh:
Index represents current canonical state.

Stale:
Canonical repository changed after the index build.

Missing:
No generated index exists.

Incompatible:
Index was built with an unsupported schema or tool version.
```

Search results should not silently come from stale state.

---

# Build metadata should be explicit

A generated index should identify its origin.

Useful build metadata includes:

```text
tool version
schema version
repository path
canonical baseline or commit
build timestamp
object count
relationship count
validation result
content fingerprint
```

This supports several questions:

- Which model baseline produced this database?
- Was validation successful?
- Was the database generated before or after a particular decision?
- Can the same result be rebuilt?
- Is an attached database safe to compare with another one?

Build metadata is generated evidence.

It does not belong in every canonical object.

---

# Determinism has practical limits

A deterministic build does not necessarily mean every output byte must always be identical.

Outputs may include:

- timestamps;
- filesystem paths;
- environment details;
- tool-version metadata.

The stronger requirement is semantic determinism:

> The same canonical model baseline should produce the same governed objects, references, searchable content and lineage relationships.

Where exact reproducibility matters, variable metadata can be separated from core index content.

The release smoke described in the current demo documentation runs the command matrix against bundled examples and asserts stable JSON output.

This is useful because deterministic interfaces are easier to test and integrate.

---

# Search documents should be inspectable

Generated search content can fail in subtle ways:

- important fields omitted;
- Markdown headings duplicated;
- IDs not indexed;
- status missing;
- sensitive evidence copied unintentionally;
- body text truncated too aggressively;
- aliases ignored.

A line-oriented search-document export gives developers and evaluators a way to inspect what the search layer actually sees.

For each object, they can verify:

- identity;
- title;
- searchable text;
- metadata;
- source path;
- linked terms.

This is especially important for agent integration.

An agent can only retrieve what the index exposes.

If the search projection omits ownership, decisions or applicability, the agent may produce incomplete analysis even though the canonical files contain the information.

---

# Do not index every piece of evidence indiscriminately

Searchability can create information-governance risks.

A canonical evidence object may reference:

- confidential ticket;
- personal data;
- sensitive dataset;
- client document;
- restricted legal analysis.

The generated search document should include only the information appropriate for the index.

Possible approaches include:

- indexing evidence metadata but not full content;
- storing a redacted summary;
- keeping secure source references;
- excluding sensitive fields;
- separating indexes by access boundary.

The local-first architecture does not automatically solve access control.

It reduces hosted dependencies.

Repository and generated-artifact permissions still matter.

---

# Query and search are complementary

A structured query answers:

```text
Show approved Attributes in the Customer domain.
```

A full-text search answers:

```text
Where is sales-area customer classification discussed?
```

A graph traversal answers:

```text
What is connected to KNVV-KDGRP?
```

An impact analysis answers:

```text
What may be affected if Customer Group changes?
```

These are different operations.

A mature model index supports all four without forcing them into one search box.

The current Martenweave command set already separates:

- `query`;
- `search`;
- `trace`;
- `impact`;
- `owners`;
- `health`;
- `scorecard`;
- `gap-report`.

This separation reflects the different questions users ask of the same model.

---

# Search should lead to investigation, not act as the conclusion

A result for Customer Group should be an entry point.

From the result, a user should be able to inspect:

- the canonical object;
- active mappings;
- decisions;
- evidence;
- upstream sources;
- downstream fields;
- open proposals;
- ownership.

A search engine that returns only text snippets risks reducing the model registry to document search.

Martenweave’s value is that the result has identity and relationships.

The user can continue from:

```text
search
→ object
→ trace
→ evidence
→ impact
→ proposal
```

That sequence turns discovery into governed investigation.

---

# Static viewer generation uses the same index

The current public demo can generate a local static viewer from `modelops.db`.

Expected viewer outputs include:

- object lists;
- object detail pages;
- gap pages;
- decision pages;
- owner pages;
- a search index;
- a viewer manifest.

The viewer is documented as local, static and read-only; canonical files remain authoritative.

This demonstrates why the generated database is useful.

The same index can support several delivery surfaces without changing the canonical layer:

```text
CLI
local API
static viewer
reports
agent tools
```

The product can improve its user experience while retaining one model source.

---

# A read-only viewer is an architectural safeguard

An editable viewer may be useful later.

The current read-only design avoids an unresolved write path.

If a viewer allows direct updates, it must answer:

- Does the edit change SQLite only?
- Does it edit a canonical file?
- Does it create a proposal?
- Which validator runs?
- Which branch receives the change?
- Who approves it?
- How is the index refreshed?

Until this path is explicit, read-only access is safer.

The user can inspect the model without creating a second authority.

---

# Index failure should not corrupt canonical truth

A build may fail because:

- one object is invalid;
- the database file is locked;
- disk space is insufficient;
- an unsupported schema is encountered;
- generated output cannot be written.

The canonical repository should remain untouched.

A robust builder should avoid leaving a half-published index that appears current.

Possible strategies include:

1. build into a temporary location;
2. complete validation and writes;
3. verify generated artefacts;
4. replace the previous index atomically where practical;
5. update build metadata only after success.

The precise implementation may differ.

The principle is stable:

> Failure to build an access layer must not mutate model truth.

---

# Transactions matter during generation

SQLite supports transactional updates, allowing a set of database changes to commit together or roll back on failure.

For a generated index, this helps ensure that users do not observe:

- new objects with old edges;
- updated search text with stale metadata;
- partially deleted rows;
- incomplete reverse relationships.

SQLite’s file format and transaction mechanisms are designed around maintaining a consistent database state across commits and recovery.

Even when the builder performs a full rebuild, transactional publication or temporary-database replacement can reduce partial-state risks.

---

# Indexes inside the index

The term “index” is overloaded.

`modelops.db` is an application-level generated model index.

Inside SQLite, database indexes may also accelerate particular queries.

Examples include indexes on:

- object ID;
- type;
- status;
- domain;
- source path;
- relationship source;
- relationship target.

SQLite’s query-planning documentation explains how indexes can reduce the amount of data scanned for supported queries and how the query planner selects among available access paths.

The internal indexes should follow observed query patterns.

Creating many speculative indexes can increase build cost and storage without improving real usage.

---

# Scale should be measured by operations, not object count alone

Two repositories with the same object count may behave differently.

One may contain:

- short definitions;
- few relationships;
- simple queries.

Another may contain:

- large Markdown bodies;
- dense lineage;
- thousands of evidence links;
- many full-text terms;
- broad impact traversals.

Useful scale measures include:

- canonical file count;
- total searchable text;
- edge count;
- rebuild duration;
- database size;
- search latency;
- trace depth;
- impact fan-out;
- memory usage.

Optimisation should target measured bottlenecks.

A million-object distributed architecture is irrelevant if the current pilot contains two hundred governed objects.

---

# Repository partitioning is a governance decision

When a model grows, one response is to split it into several repositories.

Possible boundaries include:

- domain;
- programme;
- region;
- client;
- environment;
- data-product group.

This affects:

- ownership;
- cross-repository references;
- releases;
- search;
- impact analysis;
- access control.

Partitioning should not be introduced merely because a directory feels large.

The team first needs to understand:

- whether the full rebuild is genuinely slow;
- whether ownership boundaries differ;
- whether security requires separation;
- whether cross-domain analysis remains important.

A single repository gives simple global consistency.

Multiple repositories give stronger isolation but require a federation strategy.

---

# What the index should never become

The generated database should not become:

## A hidden write store

Canonical changes must not live only in SQLite.

## A second approval system

Review state belongs in canonical or operational workflow records.

## A production master-data database

It indexes model knowledge, not every business record.

## A replacement for SAP MDG

It does not run master-data governance transactions.

## A general enterprise search platform

Its search is scoped to registered model knowledge.

## An opaque agent memory

Every retrieved result should remain traceable to canonical objects.

Protecting these boundaries keeps the product focused.

---

# A practical build sequence

A current Martenweave evaluation can demonstrate the architecture with the bundled Customer and Business Partner example.

```bash
martenweave validate --repo examples/customer_bp_model

martenweave build-index \
  --repo examples/customer_bp_model \
  --jsonl

martenweave index-fresh \
  --repo examples/customer_bp_model

martenweave search "Customer Group" \
  --repo examples/customer_bp_model

martenweave query \
  --type Attribute \
  --repo examples/customer_bp_model

martenweave trace \
  ATTR-CUST-SALES-CUSTOMER-GROUP \
  --repo examples/customer_bp_model

martenweave impact \
  FEP-S4-KNVV-KDGRP \
  --repo examples/customer_bp_model
```

These commands reflect the documented public demo sequence.

The evaluation should then delete the generated directory and rebuild it.

That proves the most important property:

> Search and lineage are generated capabilities, not hidden authoritative state.

---

# Acceptance criteria for a trustworthy index

A searchable model index is useful when it satisfies several conditions.

## Complete

Every valid canonical object expected in the build is represented.

## Referentially coherent

Relationships connect stable object IDs.

## Fresh

The index identifies whether it matches the current repository baseline.

## Rebuildable

Deleting generated files does not lose model truth.

## Inspectable

Search documents and lineage edges can be examined.

## Traceable

Every database result leads back to a canonical source object.

## Deterministic

Equivalent canonical input produces equivalent semantic output.

## Read-only as authority

No independent database edit changes approved truth.

## Portable

The index can be used locally without requiring a hosted service.

## Replaceable

Internal search implementation can evolve without changing canonical model files.

---

# Common failure modes

## Indexing before validation

Broken references become searchable.

## Updating rows incrementally without reliable deletion

Removed objects remain visible.

## Omitting source paths

Users cannot trace results back to canonical files.

## Treating search ranking as truth

Popular or frequently mentioned objects appear more authoritative than approved ones.

## Hiding status

Retired and approved objects look equivalent.

## Indexing sensitive evidence bodies

Local search leaks information beyond its intended scope.

## Allowing UI edits directly against SQLite

The generated database becomes a shadow source of truth.

## Storing computed relationships only in the database

The repository cannot explain how edges were derived.

## No freshness check

Users search an outdated baseline.

## Publishing half-built output

Objects, search documents and edges disagree.

---

# Future improvements should preserve the contract

Martenweave may later improve:

- search ranking;
- tokenisation;
- multilingual search;
- fuzzy matching;
- prefix search;
- aliases;
- filtering;
- incremental builds;
- cross-repository search;
- vector retrieval;
- graph visualisation.

These changes can be valuable.

They should preserve the architectural contract:

```text
Canonical files remain authoritative.

Generated indexes remain reproducible.

Search results remain traceable.

Writes become proposals or controlled file changes.

Implementation details remain replaceable.
```

Vector embeddings, for example, may improve semantic retrieval.

They should be another generated projection.

An embedding should never become the only representation of model meaning.

---

# Why this architecture matters for agents

An agent investigating Customer Group needs fast context.

Reading every repository file on every request is inefficient.

The generated index can provide:

- candidate objects;
- exact IDs;
- summaries;
- related mappings;
- decisions;
- evidence;
- lineage edges.

The agent can then retrieve the canonical objects needed for deeper analysis.

A safe pattern is:

```text
Agent query
→ generated search index
→ stable object IDs
→ canonical source retrieval
→ trace and impact
→ reviewable proposal
```

The index improves recall and speed.

Canonical files preserve evidence and authority.

The agent should not cite an opaque search-result row as model truth without retaining the source-object reference.

---

# Final perspective

The SQLite index is not the heart of Martenweave.

The canonical model repository is.

But without an index, the repository would be harder to use for:

- search;
- querying;
- trace;
- impact analysis;
- local APIs;
- generated viewers;
- agent retrieval.

The generated index turns reviewed model objects into an operationally useful knowledge layer.

Its design depends on several disciplined choices:

1. validate before indexing;
2. rebuild from canonical state;
3. preserve stable IDs;
4. compile explicit relationships;
5. create searchable documents;
6. expose freshness;
7. keep outputs inspectable;
8. prevent database edits from becoming authoritative;
9. retain traceability back to source files;
10. scale only when measured need appears.

SQLite is valuable here because it offers a compact, portable and queryable relational layer without requiring a separately operated database service. SQLite also offers optional full-text-search capabilities and ordinary relational indexes when those mechanisms fit the implementation.

The specific table layout can evolve.

The architectural promise should not:

> Delete `modelops.db`, rebuild it from the canonical repository, and recover the same approved model relationships and searchable knowledge.

That is what makes the database an index rather than another source of truth.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It keeps model truth in canonical files and generates SQLite, search and lineage projections for efficient local use.

The objective is not to create another database that teams must reconcile manually.

It is to make a governed model repository fast enough for real investigation, reporting and agent workflows while remaining fully rebuildable.

## Sources and notes

This article was reviewed on 14 July 2026.

The current Martenweave public demo validates canonical files and generates `modelops.db`, `search_documents.jsonl` and `lineage_edges.jsonl`. The artefacts are documented as disposable and rebuildable.

The same demo exposes separate commands for free-text search, type-based query, trace and impact analysis, and uses the generated database to create a static local read-only viewer.

Martenweave Core currently defines canonical Markdown and YAML files as the source of truth, generated indexes as disposable, deterministic validation as the first gate and full index rebuilding as the current consistency strategy.

The current command set includes validation, index building, freshness checking, search, structured query, trace, impact, ownership analysis, health reporting, scorecards and dataset-readiness operations.

SQLite’s official documentation describes FTS5 as a virtual-table module for full-text search, supporting phrases, prefixes, proximity, column filters, Boolean expressions and relevance-related functions.

SQLite’s official query-planner documentation explains how relational indexes support efficient lookup paths, while its file-format documentation describes the structured portable database-file representation used by SQLite.

The exact internal Martenweave database schema and search implementation should not be treated as a stable public contract unless separately documented. Users should depend on canonical schemas and supported CLI, API and export interfaces.

Martenweave is independent and is not affiliated with or endorsed by SQLite or SAP.
