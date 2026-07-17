# Why Generated Indexes Should Be Disposable

**Reviewed: 14 July 2026**

A Martenweave user opens `modelops.db` and corrects the name of an Attribute directly in SQLite.

The search results immediately look better.

The generated viewer now displays the corrected term.

The canonical Markdown file still contains the old name.

A week later, another team member runs:

```bash
martenweave build-index --repo ./model --jsonl
```

The correction disappears.

This may look like a software defect.

It is actually the architecture working as intended.

The edit was made in the wrong layer.

Martenweave separates two kinds of state:

```text
Canonical state:
the approved model objects and their meaning

Generated state:
representations built to make canonical state faster or easier to use
```

Canonical model files are authoritative.

The SQLite database, search documents, lineage edges, static viewer and generated reports are derived artefacts.

They may be important.

They may be distributed to users.

They may take time to build.

They may support nearly every visible product capability.

They should still be disposable.

> A generated artefact is disposable when it can be deleted and recreated from declared canonical inputs without losing approved model meaning, identity, relationships or governance history.

Martenweave’s current public workflow generates:

```text
generated/modelops.db
generated/search_documents.jsonl
generated/lineage_edges.jsonl
```

from canonical model files. Its documentation explicitly describes those outputs as disposable and rebuildable.

This is not housekeeping terminology.

It is an architectural constraint that protects the source of truth.

---

# Disposable does not mean temporary

The word can be misleading.

A generated index may remain in use for months.

It may support:

- search;
- structured queries;
- lineage;
- impact analysis;
- local APIs;
- static documentation;
- dashboards;
- agent retrieval;
- readiness reports.

It may be included in a release package.

It may be backed up for operational convenience.

None of this makes it canonical.

The distinction is not based on lifespan.

It is based on recoverability and authority.

A useful generated artefact can be long-lived.

A canonical artefact can be small.

The question is:

> If this file disappeared, would the organisation lose approved model truth—or only need to rebuild an access layer?

For `modelops.db`, the intended answer is the second.

---

# The deletion test

The simplest architectural test is destructive.

Start with a valid repository.

Delete:

```text
generated/modelops.db
generated/search_documents.jsonl
generated/lineage_edges.jsonl
generated/site/
generated/reports/
```

Then run the documented build process again:

```bash
martenweave validate --repo ./model
martenweave build-index --repo ./model --jsonl
martenweave docs-build --repo ./model --site ./generated/site
```

After the rebuild, the system should recover:

- the same canonical objects;
- the same stable IDs;
- the same approved relationships;
- the same lineage topology;
- equivalent searchable content;
- equivalent model-level query results.

Some non-semantic metadata may differ:

- build timestamp;
- local path;
- tool-runtime information;
- output ordering where not guaranteed.

The governed meaning should not.

If the rebuilt result is missing information that existed only in the deleted database, the database was not truly generated.

It was a hidden source of truth.

---

# The clean-checkout test

Deletion inside one working directory is not enough.

A stronger test begins from a clean checkout:

```text
1. Clone or check out the approved repository baseline.
2. Install the supported Martenweave version.
3. Validate the canonical files.
4. Rebuild all indexes and views.
5. Compare semantic outputs with the published baseline.
```

This test detects hidden dependencies such as:

- manually repaired database rows;
- local configuration that changes model meaning;
- ignored files required for indexing;
- UI-only decisions;
- environment-specific aliases;
- cached relationships not derivable from source;
- undocumented import steps.

A repository is self-contained only when another authorised environment can reproduce its usable model state.

---

# Generated state is a projection

The canonical repository contains object-oriented truth:

- Domains;
- Entities;
- Attributes;
- Relationships;
- Rules;
- Mappings;
- FieldEndpoints;
- Evidence;
- Decisions;
- PatchProposals.

The generated database reorganises that truth for efficient access.

For example, the canonical files may declare only forward references:

```text
Mapping
→ source FieldEndpoint
→ target FieldEndpoint
→ business Attribute
```

The generated index can add reverse navigation:

```text
FieldEndpoint
← targeted by Mapping

Attribute
← implemented by FieldEndpoint

Decision
← referenced by Mapping
```

It may also calculate:

- full-text-search documents;
- reverse relationships;
- graph edges;
- aggregate counts;
- object summaries;
- coverage signals;
- derived risk indicators.

These projections are valuable precisely because they are not constrained to look like the canonical files.

They can be optimised for their consumers.

But every derived fact must either:

1. be reproducibly calculated from canonical input; or
2. be clearly identified as runtime or analytical output rather than approved model truth.

---

# Why a database is useful without being authoritative

SQLite gives Martenweave a compact relational representation suitable for local querying.

An SQLite database generally stores its main state in a database file, while rollback journals or write-ahead logs may participate in transaction recovery. SQLite also maintains internal schema and change metadata inside its file format.

That makes SQLite practical for:

- indexed lookups;
- joins;
- reverse references;
- local APIs;
- static-site generation;
- report production.

Its technical reliability does not determine its governance role.

A database can be highly durable and still be derived.

A Markdown file can be plain text and still be canonical.

Authority comes from the architecture and change process—not from the sophistication of the storage engine.

---

# The danger of an editable generated database

Once a frontend is connected to SQLite, direct editing becomes tempting.

The path seems efficient:

```text
UI form
→ UPDATE objects
→ instant visible result
```

But that introduces several unresolved questions:

- Which canonical file should change?
- How is explanatory Markdown updated?
- How is the Git diff produced?
- Which evidence supports the edit?
- Which Decision authorises it?
- What happens if the repository changed simultaneously?
- Does the database overwrite the file?
- Does the next rebuild overwrite the database?
- Which copy wins during conflict?

The system has moved from one-way generation to bidirectional synchronisation.

That is a different architecture.

It requires:

- conflict detection;
- provenance preservation;
- transaction boundaries across files and database;
- reverse serialisation;
- merge policy;
- approval workflow;
- recovery from partial writes.

Martenweave does not need this complexity merely to offer an editing UI.

A safer route is:

```text
UI edit
→ PatchProposal
→ deterministic validation
→ semantic diff
→ human approval
→ canonical file change
→ index rebuild
```

The user still receives an editing experience.

The generated database remains a projection.

---

# A generated viewer should also be disposable

The current Martenweave demo can generate a static local viewer from `modelops.db`.

The documented outputs include:

- index page;
- object lists;
- object detail pages;
- gap pages;
- decision pages;
- owner pages;
- search index;
- viewer manifest;
- static assets.

The viewer is described as local, static and read-only, while canonical files remain authoritative.

The viewer should therefore be treated like compiled documentation.

Changing:

```text
generated/site/objects/customer-group.html
```

must not change the model.

The edit will disappear on regeneration.

That is desirable.

If a page is wrong, correct:

- the canonical object;
- the rendering logic;
- the viewer template;
- the search projection.

Do not repair the generated page as though it were source content.

---

# Reports need the same boundary

A readiness report may state:

```text
Customer Group readiness: blocked
```

A later analyst may believe the verdict should be:

```text
ready with warnings
```

Editing the Markdown report directly does not change the underlying evidence.

A generated report should remain connected to:

- canonical baseline;
- dataset fingerprint;
- validation profile;
- tool version;
- execution time;
- report parameters.

Changing the verdict requires changing or re-evaluating one of those inputs.

Reports are evidence products.

They are not a backdoor for model decisions.

Martenweave’s current dataset-readiness flow combines validation, indexing, profiling and gap analysis into generated JSON and Markdown reports. It can also promote findings into a draft `PatchProposal`, preserving the distinction between an observation and an approved model change.

---

# Generated issues are drafts, not model truth

A readiness run can create a GitHub-ready issue draft.

That draft may contain:

- gap summary;
- affected fields;
- evidence;
- suggested actions;
- validation output.

The draft is generated from current evidence.

It should not be treated as the canonical model.

Publishing the issue creates an operational work item.

Closing the issue does not automatically change the model either.

The controlled sequence remains:

```text
Generated finding
→ issue or proposal
→ investigation
→ Decision
→ approved canonical change
```

Each layer has a role.

---

# Search indexes must be replaceable

Search implementation evolves.

A product may move from:

- basic substring search;
- SQL filtering;
- SQLite full-text search;
- hybrid lexical ranking;
- semantic retrieval;
- external search engine.

The canonical model should not need to change merely because ranking improves.

A search document may contain:

```text
object ID
type
name
aliases
definition
references
status
domain
```

The search engine can index, tokenise and rank these fields differently over time.

Search rankings are generated behaviour.

They are not model truth.

A new search version may return Customer Group before a related Decision where an older version did the opposite.

Both can represent the same canonical repository.

---

# Embeddings must be disposable too

If Martenweave later introduces vector embeddings for semantic retrieval, those vectors should be treated as another generated projection.

An embedding depends on:

- source text;
- chunking method;
- embedding model;
- model version;
- preprocessing;
- dimensionality;
- normalisation.

Changing any of these may require a complete rebuild.

The repository should not depend on preserving one opaque vector forever.

A retrieval record should remain traceable to:

- canonical object ID;
- canonical baseline;
- source field or content section;
- embedding configuration.

The vector accelerates similarity search.

It does not become the only representation of meaning.

---

# Lineage edges must be reproducible

The generated `lineage_edges.jsonl` should contain relationships derived from canonical object references.

Examples:

```text
source FieldEndpoint
→ Mapping

Mapping
→ business Attribute

business Attribute
→ target FieldEndpoint
```

If a lineage edge exists only because someone inserted it manually into JSONL, it will disappear during rebuild.

The correct response is not to preserve the manual JSONL edit.

The team should determine whether:

- a canonical Relationship is missing;
- a Mapping lacks a reference;
- the lineage-generation rule is incomplete;
- the edge should not exist.

Lineage is trustworthy only when its origin can be explained.

Martenweave’s public demo uses the generated graph for `trace` and `impact` operations across Attributes, physical endpoints, Mappings, Decisions and Evidence.

---

# Derived facts need provenance

Not every generated field is a simple copy.

An index may derive:

```text
object has no owner
object has three downstream mappings
decision evidence is stale
field is on a critical path
proposal affects twelve objects
```

Each derived fact should be explainable.

For example:

```text
Derived signal:
unowned_attribute

Based on:
ATTR-CUSTOMER-GROUP.owners is empty

Rule:
MW-OWN-001

Baseline:
commit abc123
```

This enables:

- reproduction;
- debugging;
- review;
- rule evolution;
- agent explanation.

A generated score without provenance is difficult to trust and difficult to rebuild consistently.

---

# Disposable indexes expose incomplete canonical models

Suppose the team deletes the generated index and discovers that it cannot recreate:

- business aliases;
- reverse mappings;
- local ownership;
- proposal-review status.

This indicates that those facts were stored only in operational state.

The deletion test has found a modelling gap.

The response is to classify each missing item:

## Canonical fact

Move or represent it in canonical model files.

## Reproducible derivation

Implement the build rule.

## External operational state

Keep a reference to the authoritative external system.

## Ephemeral UI preference

Do not treat it as model state.

This classification strengthens the architecture.

---

# Full rebuild reduces stale-data risk

Incremental synchronisation is efficient when implemented correctly.

It creates several failure modes:

- deleted objects remain indexed;
- reverse relationships are not recalculated;
- renamed files create duplicates;
- partial updates leave mixed baselines;
- failed events are not replayed;
- dependency changes do not invalidate related rows.

A full rebuild begins from the complete current canonical state.

Martenweave’s current core documents `build-index` as dropping and recreating generated tables to keep indexing deterministic.

For a repository-sized model registry, this is a rational starting point.

It favours correctness and explainability over premature incremental complexity.

---

# Full rebuild is not always the final scaling strategy

A large repository may eventually make full rebuilds expensive.

Possible future optimisations include:

- content-addressed parsing cache;
- incremental object normalisation;
- dependency-aware edge regeneration;
- partitioned indexes;
- domain-specific builds;
- immutable build layers;
- background index refresh.

These are build strategies.

They do not change the source-of-truth rule.

An incrementally maintained index can remain disposable when:

- every row can still be reproduced;
- deletion and invalidation are reliable;
- a complete rebuild remains possible;
- no independent edits are accepted;
- freshness is verifiable.

The important distinction is:

```text
Disposable:
governance and recoverability property

Full rebuild:
one implementation strategy
```

Do not confuse them.

---

# Atomic publication protects readers

A rebuild may take time.

Readers should not observe:

- new objects with old relationships;
- updated search documents with stale metadata;
- half-populated tables;
- missing indexes;
- incomplete viewer pages.

A safer build sequence is:

```text
1. Validate canonical input.
2. Build into a temporary database or output directory.
3. Verify expected artefacts.
4. Record build metadata.
5. Publish or replace the previous output as one completed unit.
```

SQLite provides transactional mechanisms designed to preserve consistent database state across changes and recovery scenarios.

Martenweave’s specific implementation may evolve, but the product contract should remain:

> A failed rebuild must not publish a generated state that appears complete.

---

# Backups are useful even for disposable state

Calling an index disposable does not mean backups are prohibited.

A backup may save time when:

- the repository is large;
- rebuild dependencies are temporarily unavailable;
- a client package must be restored quickly;
- an investigation needs the exact historical generated output;
- performance regression analysis is required.

SQLite provides an official backup interface for copying a live database safely into another database file.

The governance distinction remains:

```text
Backup purpose:
operational recovery or historical evidence

Canonical authority:
model repository baseline
```

If a backup conflicts with a clean rebuild from the same declared baseline, the difference must be investigated.

The backup does not automatically win.

---

# Historical generated artefacts can still be valuable

A generated index from a past baseline may preserve:

- exact search behaviour at the time;
- an older derivation algorithm;
- the viewer used in an approval;
- a specific readiness report;
- release evidence.

It may be retained as part of a release package.

This does not make it canonical.

The package should identify:

```text
canonical commit
Martenweave version
schema version
build timestamp
validation result
build configuration
```

The canonical repository explains the model.

The archived generated artefact helps reproduce the user experience and analytical outputs of that release.

---

# Generated state must identify its input

Every generated artefact should carry or be accompanied by build metadata.

A manifest can conceptually include:

```yaml
canonical_commit: abc123
canonical_schema: "1.0"
martenweave_version: "0.5.0"
built_at: 2026-07-14T15:30:00Z
validation:
  errors: 0
  warnings: 3
outputs:
  database: generated/modelops.db
  search: generated/search_documents.jsonl
  lineage: generated/lineage_edges.jsonl
```

This enables several checks:

- Does this index represent the current commit?
- Was it built before or after a Decision?
- Which validation profile was used?
- Which tool release generated it?
- Can the outputs be compared with another build?

Without an input identity, “generated” becomes difficult to prove.

---

# Freshness is a first-class state

Martenweave currently exposes `index-fresh` after `build-index` in its public demo flow.

The index should be able to report:

```text
fresh
stale
missing
incompatible
unknown
```

## Fresh

The index matches the declared canonical baseline and supported build configuration.

## Stale

Canonical input changed after the build.

## Missing

No generated index exists.

## Incompatible

The index was created by an unsupported schema or tool version.

## Unknown

The artefact lacks enough metadata to prove its origin.

A stale index should not silently answer governance questions as though it represented current state.

---

# Freshness is not based only on timestamps

Filesystem modification time is convenient.

It is not always reliable enough.

Files can be:

- copied;
- restored;
- checked out;
- generated with preserved timestamps;
- modified through tools that alter metadata unexpectedly.

A stronger freshness mechanism can use:

- repository commit;
- content fingerprint;
- sorted canonical-file hashes;
- schema version;
- build configuration;
- tool version.

The exact mechanism depends on the product contract.

The important point is that freshness should reflect declared input identity rather than only clock comparison.

---

# Generated databases should be read-only by policy

SQLite itself supports writes.

Martenweave can still treat `modelops.db` as read-only at the application level.

Possible safeguards include:

- read-only API access;
- generated-directory warnings;
- integrity checks before use;
- file regeneration during standard workflows;
- no supported canonical-write commands against SQLite;
- clear documentation;
- build manifest comparison.

Technical write protection may not always be practical.

The product boundary must still be explicit.

A user who edits the database manually has changed an unsupported projection, not the model.

---

# Never reverse-generate canonical files as the normal workflow

It may be possible to reconstruct some canonical YAML from database rows.

That does not make reverse generation safe.

The database may not preserve:

- Markdown formatting;
- comments;
- deliberate field ordering;
- nuanced explanation;
- proposal context;
- unresolved drafts;
- source-file organisation;
- historical editorial structure.

A database-to-files reconstruction is potentially lossy.

It can be useful for emergency recovery.

It should not become ordinary synchronisation.

The normal direction remains:

```text
canonical files
→ validation
→ generated index
```

not:

```text
database edits
→ regenerate canonical truth
```

---

# The UI can store its own non-canonical state

Not every piece of application state belongs in canonical files.

A workbench may store:

- last-opened object;
- panel layout;
- search history;
- filter preference;
- table width;
- dismissed hint;
- temporary draft text.

These are legitimate UI concerns.

They should be clearly separated from model truth.

A useful classification is:

| State | Canonical? | Rebuildable? |
|---|---:|---:|
| Attribute definition | Yes | Primary source |
| Mapping reference | Yes | Primary source |
| Reverse relationship | No | Yes |
| Search ranking | No | Yes |
| Viewer HTML | No | Yes |
| Readiness verdict | No | Yes, from declared inputs |
| Pending unsaved form text | No | Not necessarily |
| User layout preference | No | Not relevant |
| Approved Decision | Yes | Primary source |
| API cache | No | Yes |

Not every non-canonical state must be rebuildable.

Only model-derived state should be expected to reproduce from the canonical model.

---

# External operational state should remain external

Some Martenweave views may include information from:

- GitHub issues;
- ServiceNow changes;
- Jira tickets;
- SAP transports;
- CI results;
- external datasets.

This state may not be rebuildable from canonical model files alone.

The index should record:

- external reference;
- retrieval time;
- source authority;
- optional cached projection.

The cache remains disposable.

The external system remains authoritative for its own operational state.

For example:

```text
Canonical model:
Rule definition and affected objects

ServiceNow:
change implementation status

Generated index:
joined view of both
```

Deleting the generated join should not lose either authoritative source.

---

# Do not copy production data into the index unnecessarily

A model registry needs metadata and evidence.

It does not need every customer, supplier or product record.

Copying production data into the generated index creates:

- security exposure;
- larger builds;
- access-control complexity;
- retention obligations;
- confusion between model and instance data.

Dataset profiling can generate summaries:

- field presence;
- datatype;
- value distribution;
- completeness;
- gap evidence.

The generated index may reference those summaries.

It should not become a shadow master-data store.

---

# Disposable does not excuse poor quality

A rebuildable artefact can still be wrong.

Possible defects include:

- missing objects;
- incorrect reverse edges;
- duplicate search documents;
- unstable ordering;
- stale aliases;
- wrong status filters;
- incomplete viewer pages.

“Just rebuild it” is not a substitute for testing.

A trustworthy generated layer needs:

- deterministic build tests;
- example repositories;
- count checks;
- relationship assertions;
- stable output contracts;
- freshness checks;
- release smoke tests.

The current Martenweave demo documents a release smoke command that executes a release-grade command matrix against bundled examples and asserts stable JSON output.

Disposable means recoverable.

It does not mean untested.

---

# Semantic reproducibility matters more than byte equality

Two valid builds may differ at byte level because of:

- timestamps;
- database page layout;
- insertion order;
- local paths;
- tool-library versions;
- generated asset hashes.

The important question is whether they represent the same model state.

Useful semantic comparisons include:

- object ID set;
- object types;
- canonical properties;
- relationship set;
- search-document content;
- lineage-edge set;
- query results;
- validation outcomes.

Where byte-for-byte reproducibility is required, variable metadata should be isolated or normalised.

Do not claim deterministic governance merely because two database files have the same checksum.

Do not reject equivalent builds merely because internal page layout differs.

---

# The build function should be conceptually pure

A useful mental model is:

```text
generated_state =
build(
    canonical_repository,
    schema_version,
    tool_version,
    build_configuration
)
```

The output should not depend on hidden mutable state.

Problematic hidden inputs include:

- previous database contents;
- local manual corrections;
- undocumented environment variables;
- stale remote caches;
- user-specific defaults;
- uncontrolled current time affecting semantic state;
- network calls that alter object meaning.

Some runtime metadata will naturally vary.

The governed model projection should remain reproducible from declared inputs.

---

# Data migrations inside generated storage should be questioned

Suppose the SQLite schema changes between Martenweave releases.

A traditional application might migrate the existing database in place through many historical migrations.

For a disposable index, a simpler approach may be safer:

```text
delete generated database
→ rebuild using the new index schema
```

This avoids preserving years of generated-database migration complexity.

Canonical schema migrations still matter because canonical files carry authoritative data.

Generated-schema migrations are needed only when operational requirements make rebuild impractical.

This is another benefit of disposability:

> It reduces the amount of state the product must preserve indefinitely.

---

# Disposability limits vendor and platform lock-in

A model repository whose truth exists only inside:

- one database schema;
- one hosted search index;
- one proprietary graph;
- one SaaS tenant;

is difficult to move.

When canonical files remain authoritative, the generated layer can change.

Today:

```text
SQLite + JSONL
```

Later, where justified:

```text
PostgreSQL
OpenSearch
graph database
embedded analytics store
```

The model survives because the storage projection is replaceable.

Martenweave’s current principles explicitly describe the core as local-first, with canonical files and disposable generated indexes rather than a hosted MDM platform or SaaS dependency.

---

# Why not use the canonical files directly for everything?

For a very small repository, the CLI could parse files on every operation.

This avoids generated state.

It introduces other costs:

- repeated parsing;
- repeated validation;
- slow reverse lookup;
- expensive graph construction;
- weak full-text search;
- duplicated processing across tools;
- harder API integration.

The generated index is a performance and access optimisation.

It allows canonical files to remain designed for review and governance rather than query execution.

The correct architecture is not:

```text
Files good
Database bad
```

It is:

```text
Files for authority
Database for access
```

---

# A practical release workflow

A release-grade model workflow can use the following sequence.

## 1. Identify the canonical baseline

Use an approved branch, commit or tag.

## 2. Validate

```bash
martenweave validate --repo ./model
```

No blocking structural errors should remain.

## 3. Build into clean generated state

```bash
rm -rf ./model/generated
martenweave build-index --repo ./model --jsonl
```

## 4. Check freshness

```bash
martenweave index-fresh --repo ./model
```

## 5. Run semantic smoke checks

Examples:

```bash
martenweave search "Customer Group" --repo ./model
martenweave trace ATTR-CUSTOMER-GROUP --repo ./model
martenweave impact FEP-S4-KNVV-KDGRP --repo ./model
```

## 6. Generate views and reports

```bash
martenweave docs-build --repo ./model --site ./generated/site
```

## 7. Record build metadata

Include:

- commit;
- schema version;
- Martenweave version;
- validation summary;
- artefact checksums where useful.

## 8. Package or publish

Distribute generated artefacts as a representation of that baseline.

---

# The release package should prove rebuildability

A model handover should include enough information for another team to reproduce the generated layer.

At minimum:

- canonical repository;
- baseline identifier;
- supported Martenweave version;
- dependency instructions;
- validation command;
- index-build command;
- expected artefact list;
- release smoke command;
- known warnings.

A generated database alone is not an adequate handover.

It provides access.

It does not provide durable governance truth.

---

# A disaster-recovery scenario

Assume an AMS server is lost.

The server contained:

- `modelops.db`;
- generated viewer;
- cached reports;
- local API process.

The Git repository remains available.

Recovery should be:

```text
1. Restore the approved canonical repository.
2. Install the supported Martenweave release.
3. Validate the repository.
4. Rebuild indexes.
5. Recreate the viewer.
6. Verify semantic outputs.
7. Resume access.
```

No manual database reconstruction should be required.

If recovery depends on restoring one special SQLite backup because model facts were edited there, the architecture has accumulated hidden canonical state.

---

# A drift scenario

Suppose the canonical files say:

```text
Customer Group:
sales-area-specific
```

but the generated database says:

```text
Customer Group:
central
```

Possible causes include:

- stale index;
- manual database edit;
- failed partial rebuild;
- indexer defect;
- wrong repository baseline;
- wrong build configuration.

The resolution process should be:

1. identify canonical commit;
2. run validation;
3. perform clean rebuild;
4. compare output;
5. investigate builder defect if divergence remains.

The database should not be manually reconciled with the files.

It should be replaced.

---

# An agent scenario

An AI agent searches the index and finds a Mapping.

Before proposing a change, the agent should retain:

- stable object ID;
- canonical source path;
- baseline;
- related evidence;
- current status.

The safe flow is:

```text
Generated index:
find candidate context quickly

Canonical files:
verify authoritative model state

Agent:
produce PatchProposal

Validator:
check candidate state

Human:
approve or reject
```

The index is a retrieval accelerator.

It must not become opaque agent memory detached from source objects.

Martenweave’s current operating principle remains:

> Agents propose. Validators verify. Humans approve. Git records.

Disposable generated state supports that boundary because an agent cannot establish model truth merely by writing to its retrieval database.

---

# Warning signs that generated state has become canonical

Several symptoms indicate architectural drift.

## “Do not rebuild; we will lose corrections.”

The database contains manual truth.

## “This field exists only in the UI.”

The canonical model is incomplete.

## “The repository is updated from the database once a month.”

Two-way synchronisation has replaced source-of-truth discipline.

## “The static viewer is the approved document.”

Generated HTML has become governance evidence without its source baseline.

## “The issue was closed, so the model is updated.”

Operational workflow is being confused with canonical change.

## “Search knows about it, but the files do not.”

The index contains unsupported enrichment or hidden state.

## “Nobody knows which commit created this database.”

The artefact has no reproducible provenance.

## “The old index cannot be rebuilt with the current model.”

Historical inputs or tool versions were not preserved.

---

# What should remain non-disposable?

The following must not be treated as generated cache when they carry approved truth:

- canonical model objects;
- approved Decisions;
- stable identities;
- explicit Relationships;
- current Rules;
- source-to-target Mappings;
- evidence references required to justify decisions;
- approval records or durable links to them;
- model baseline metadata;
- schema migration history;
- human-reviewed change records.

These are the materials from which generated access layers can be recreated and understood.

---

# What can safely remain disposable?

Examples include:

- SQLite index;
- reverse-reference tables;
- search documents;
- lineage-edge export;
- search ranking data;
- static viewer pages;
- generated object summaries;
- aggregate scorecards;
- API cache;
- report rendering;
- vector embeddings;
- temporary import staging;
- build logs after required evidence is retained elsewhere.

Some generated reports may be archived for audit or release evidence.

Their authority still comes from their declared inputs and generation process.

---

# A disposability checklist

A generated artefact is properly disposable when all of the following are true.

## Rebuild source exists

The canonical inputs are versioned and accessible.

## Build process is documented

Another authorised environment can execute it.

## Validation precedes generation

Invalid model state is not silently indexed.

## Input identity is recorded

Commit, schema and tool version are known.

## No supported direct canonical writes exist

Edits enter through proposals or canonical files.

## Reverse derivation is unnecessary

Canonical files are not reconstructed routinely from the index.

## Freshness is checkable

The system can identify stale output.

## Failure is safe

A failed build does not publish partial output as complete.

## Semantic results are testable

Objects and relationships can be compared after rebuild.

## Generated state contains no unique approved facts

Deleting it loses convenience, not model truth.

---

# What Martenweave should strengthen next

The current architecture already has:

- canonical files;
- full index rebuild;
- disposable SQLite and JSONL outputs;
- freshness checking;
- release smoke testing;
- generated static viewer;
- proposal-first changes.

A focused next slice could strengthen the contract with:

## Build manifest

Record canonical commit, schema, tool version and validation result.

## Clean-rebuild command

Delete and rebuild all generated artefacts in one controlled operation.

## Semantic output verification

Compare object and edge fingerprints rather than only file bytes.

## Read-only index guard

Detect unsupported modifications where practical.

## Atomic publication

Build into a temporary location, verify and then publish.

## Provenance endpoint

Allow CLI, API and viewer users to see which baseline produced the current output.

## Release reproducibility test

Rebuild a tagged example from a clean checkout and verify expected semantic state.

These features are practical.

They do not require a distributed platform.

---

# Final perspective

Generated indexes are not a secondary afterthought in Martenweave.

They are what make the canonical model usable for:

- search;
- lineage;
- impact;
- local APIs;
- generated documentation;
- agent retrieval.

Their value does not require them to become authoritative.

The architecture is stronger when generated state is:

- fast;
- rich;
- inspectable;
- testable;
- reproducible;
- replaceable.

The canonical repository should preserve:

- identity;
- meaning;
- relationships;
- evidence;
- decisions;
- approved change history.

The generated layer should provide:

- access;
- acceleration;
- derived navigation;
- reporting;
- presentation.

The practical test is direct:

> Can the organisation delete every generated Martenweave artefact, start from a clean approved repository baseline and reconstruct an equivalent searchable model without manual repair?

When the answer is yes, the generated layer is disposable.

When the answer is “do not delete the database because some corrections exist only there,” the database has quietly become another source of truth.

That is precisely the architecture Martenweave is designed to avoid.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It keeps approved model truth in canonical files and generates SQLite, JSONL, lineage, search, viewer and reporting artefacts from that source.

Generated outputs make the model operationally useful.

Their disposability keeps the model governable.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave’s current public demo validates canonical model files and then generates `modelops.db`, `search_documents.jsonl` and `lineage_edges.jsonl`. The documentation explicitly describes these files as disposable and rebuildable.

The generated static viewer is built from `modelops.db`, remains read-only and does not replace canonical files as the source of truth.

Martenweave Core currently documents full index rebuilding as a deliberate strategy for deterministic generated state. It validates object IDs, types, references and domain-context rules before indexing.

The current dataset-readiness flow produces generated readiness reports and can promote detected gaps into a draft `PatchProposal`, preserving the distinction between analytical output and approved model change.

SQLite’s official file-format documentation explains that the complete database state is generally stored in the main database file, with rollback journals or write-ahead logs participating in transaction recovery. It also documents internal schema, change and application metadata available in the database format.

SQLite’s official documentation separately describes its atomic-commit mechanisms and backup interface. These capabilities make SQLite a reliable generated access format, but they do not determine whether an application treats the database as canonical or derived.

The build-manifest, read-only guard and semantic-reproducibility mechanisms proposed in this article describe recommended product improvements. They should not be interpreted as guarantees that every mechanism is already implemented in the current Martenweave release.

Martenweave is independent and is not affiliated with or endorsed by SAP or SQLite.
