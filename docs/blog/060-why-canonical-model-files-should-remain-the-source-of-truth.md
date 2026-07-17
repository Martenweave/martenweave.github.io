# Why Canonical Model Files Should Remain the Source of Truth

**Reviewed: 14 July 2026**

A business owner updates Customer Group in an Excel review file.

An SAP consultant changes the corresponding validation rule.

A developer edits a record through a local API.

The generated SQLite index still contains the previous definition.

A Git branch contains an approved mapping change that has not been merged.

The frontend displays data from the database and allows a reviewer to modify the description.

Which version is now correct?

The answer cannot be:

> Whichever system was updated most recently.

Recency does not establish authority.

Nor can the answer be:

> They should all stay synchronised.

That statement describes an aspiration, not a conflict-resolution rule. The moment two tools accept independent changes, synchronisation becomes a distributed consistency problem.

The organisation needs one place where a proposed change becomes canonical.

Everything else must be classified as one of the following:

- an input;
- a proposal;
- a projection;
- a cache;
- an implementation;
- an evidence source;
- a review surface.

Martenweave makes a deliberate choice:

> The canonical model files are authoritative. Databases, indexes, exports, reports, APIs and user interfaces are derived from them or submit proposals back to them.

The current Martenweave Core README states that Markdown files with YAML frontmatter in the `model/` repository are the source of truth. SQLite and JSONL outputs are rebuildable, and validation occurs before indexing.

That decision is not mainly about preferring files over databases.

It is about preventing multiple tools from becoming independent authorities over the same model.

---

# “Source of truth” is a conflict-resolution rule

Teams often use the phrase loosely.

They may call several things authoritative:

- the approved Excel workbook;
- the SAP configuration;
- the MDM platform;
- the data catalogue;
- the Git repository;
- the migration database;
- the latest signed-off document.

This works until they disagree.

A real source of truth answers a specific question:

> When two representations conflict, which one determines the approved model state?

For Martenweave, the answer should be:

```text
The canonical repository determines approved model truth.

Other systems may:
- provide evidence;
- implement it;
- display it;
- propose changes;
- report divergence.

They do not silently redefine it.
```

Without that rule, the architecture contains several equal writers.

Equal writers create unresolved ownership.

---

# Canonical does not mean operationally dominant

SAP may be the operational system of record for active Business Partner data.

An MDM platform may run stewardship workflows.

A data catalogue may be authoritative for enterprise glossary terms.

Jira or ServiceNow may own ticket status.

GitHub may own pull-request review state.

These systems can remain authoritative for their own responsibilities.

The canonical model repository is authoritative for a narrower class of truth:

- model-object identity;
- approved definitions;
- relationships;
- mappings;
- applicability;
- model rules;
- ownership references;
- decisions;
- proposal status;
- evidence links.

This distinction avoids an unnecessary architecture argument.

Martenweave does not claim:

> All enterprise truth must live in Markdown.

It claims:

> The governed description of the model and its change history needs one canonical representation.

The current product positioning explicitly describes Martenweave as a model-governance and evidence layer rather than a hosted MDM product, generic workflow platform or direct SAP write-back system.

---

# The canonical layer should be smaller than the operational landscape

A canonical model repository should not copy every operational detail.

It does not need:

- every SAP transaction;
- every incident comment;
- every workflow execution;
- every production record;
- every data-quality result;
- every deployment log.

It needs the information required to determine and govern model meaning.

For example:

```yaml
id: ATTR-SUPPLIER-RISK
type: Attribute
name: Supplier Risk
entity: ENTITY-SUPPLIER
definition: Final approved supplier exposure classification
owner: ROLE-GLOBAL-SUPPLIER-RISK-OWNER
status: approved
```

Other systems may contain:

- millions of actual Supplier Risk values;
- open stewardship tasks;
- configuration implementing the rule;
- validation failures;
- support incidents;
- reports using the classification.

The canonical object connects these concerns without absorbing all of them.

A small authoritative layer is easier to validate than a repository that tries to become an enterprise data lake.

---

# A canonical state needs a clear acceptance boundary

A file is not canonical merely because it exists in Git.

The repository may contain:

- drafts;
- evidence;
- proposals;
- approved objects;
- retired objects;
- imported material.

Canonicality therefore needs a state boundary.

A practical model distinguishes:

```text
External evidence
→ imported observation
→ draft proposal
→ validated proposal
→ approved change
→ merged canonical state
```

Only the final state should determine the approved model.

A branch may contain a valid future version.

A spreadsheet may contain an accepted business edit.

An AI-generated proposal may be structurally correct.

None becomes canonical until the defined approval and merge process is complete.

The current Martenweave workflow keeps AI output in `PatchProposal` objects for human review and turns approved work into controlled changes rather than allowing silent mutation.

---

# The canonical repository is not every branch

Git introduces another possible ambiguity.

Suppose:

- `main` contains the current approved model;
- a feature branch contains a reviewed but unmerged change;
- a release branch contains the next migration-wave baseline;
- a local working tree contains uncommitted edits.

All are files.

They are not equally authoritative.

The organisation should define:

```text
Approved production model:
main at approved commit

Next release candidate:
release branch at validated commit

Proposed change:
feature branch or PatchProposal

Personal work:
uncommitted working tree
```

The canonical model is therefore not simply “whatever is in Git.”

It is:

> The accepted repository state at an identified branch, commit or release reference.

Git records project state as a series of snapshots, with commits referring to the complete file state at a point in history. Git also checksums stored content and maintains repository history locally, making precise baselines and comparison possible.

That makes Git suitable for preserving canonical model baselines.

It does not remove the need to define which baseline is approved.

---

# Generated databases should be treated as projections

Martenweave builds generated SQLite and JSONL outputs from canonical model files.

These outputs serve important purposes:

- fast querying;
- full-text search;
- joins;
- graph traversal;
- local API access;
- viewer generation;
- reporting;
- agent retrieval.

They are projections of canonical state.

Conceptually:

```text
Canonical repository
        |
        v
Validated object graph
        |
        +--> SQLite index
        +--> search JSONL
        +--> lineage JSONL
        +--> HTML viewer
        +--> reports
        +--> API responses
```

The generated database may contain additional computed information:

- normalised text;
- search tokens;
- reverse references;
- derived risk flags;
- aggregated counts;
- graph edges;
- cached summaries.

These additions make the projection useful.

They do not make it authoritative.

The current Martenweave demo flow describes the SQLite and JSONL outputs as disposable and rebuildable from canonical files.

---

# Why the database should not accept canonical edits

Technically, SQLite can be edited.

A frontend or script could update an attribute definition directly in the generated database.

That would create two possible states:

```text
Canonical file:
Customer Group is sales-area-specific.

SQLite row:
Customer Group is central.
```

The system would then need to answer:

- Should the database overwrite the file?
- Should the file overwrite the database?
- Which timestamp wins?
- What if both changed?
- How is the human rationale preserved?
- How is the Git diff generated?
- Which review approved the database change?

This is no longer a simple indexing architecture.

It has become bidirectional synchronisation.

A generated database should therefore be treated as read-only from the perspective of canonical model truth.

A UI can still allow editing, but the edit should produce:

- a proposed patch;
- a changed file on a branch;
- a structured `PatchProposal`;
- a review request.

It should not update the accepted model only inside the index.

---

# The frontend is a view and proposal surface

A product UI is useful for:

- search;
- navigation;
- investigation;
- model comparison;
- evidence review;
- proposal authoring;
- impact visualisation;
- approval workflows.

The UI does not need to be the canonical store.

A safe edit path is:

```text
User edits in UI
→ UI creates structured proposal
→ proposal is validated
→ reviewer sees semantic diff
→ approval creates canonical file change
→ index is rebuilt
→ UI displays new canonical state
```

This gives business and technical users a usable interface without making the UI database an independent source of truth.

The browser experience can change.

The canonical model remains portable.

---

# Excel should remain an input and review format

Excel is often the most practical interface for business review.

A domain owner may prefer to assess:

- definitions;
- value lists;
- mappings;
- ownership;
- gaps;

in a workbook rather than in YAML.

That is acceptable.

The dangerous transition is:

```text
Export canonical model to Excel
→ business edits Excel
→ Excel becomes the latest approved truth
→ repository is updated later
```

The phrase “updated later” is where model divergence begins.

A controlled path is:

```text
Canonical model
→ generated Excel review file
→ reviewed spreadsheet edits
→ import as PatchProposal
→ validation and review
→ canonical merge
→ regenerate Excel
```

The current Martenweave command set includes model export to CSV or XLSX, imports from spreadsheet and Google Sheets, and the ability to treat imported edits as proposals.

The spreadsheet remains useful.

It does not receive independent authority.

---

# APIs should expose state, not create another state model

A local API may support:

- retrieving objects;
- search;
- trace;
- impact;
- readiness reports;
- proposal submission.

The API should expose the same canonical baseline as the CLI and generated viewer.

If the API accepts writes, they should follow one of two patterns.

## Proposal write

The API creates a proposed change without modifying approved state.

```text
POST proposal
→ validate
→ store proposal
→ review
```

## Controlled canonical write

The API updates canonical files through the same validation, review and Git process used elsewhere.

```text
POST approved change
→ generate file diff
→ validate
→ commit or pull request
→ rebuild index
```

What it should not do is maintain a hidden relational state that is later “synchronised” with the model repository.

The API is an access path.

It is not a second model authority.

---

# Reports are evidence, not canonical state

A readiness report may say:

> Customer Group completeness is 82%.

This does not alter the definition of Customer Group.

A gap report may identify:

> ERP_B cannot supply Supplier Risk.

This does not automatically make Supplier Risk optional.

An impact report may show:

> Twelve mappings depend on this value list.

This does not approve the proposed value-list change.

Reports provide evidence about canonical objects.

They may generate findings or proposals.

They should not directly mutate model truth.

Martenweave’s documented dataset-readiness flow validates the repository, builds indexes, profiles a dataset, detects gaps and generates readiness output. It can then promote gaps into a reviewable proposal or issue draft.

That separation is important:

```text
Finding is not a change.
Report is not a decision.
Proposal is not approval.
Implementation is not canonical truth.
```

---

# SAP configuration is an implementation of model truth

This distinction can feel uncomfortable.

The SAP system is real. It controls operational behaviour.

If the canonical model says one thing and SAP configuration does another, which is true?

Two truths exist, but they answer different questions.

## Canonical truth

What has the organisation approved as the intended model?

## Implemented truth

What does the current system actually enforce?

Suppose:

```text
Canonical rule:
Supplier Risk is mandatory before activation.

SAP configuration:
Supplier Risk produces only a warning.
```

The correct conclusion is not:

> SAP is the source of truth, so the model should be updated.

Nor is it automatically:

> The repository is correct, so SAP must immediately change.

The discrepancy is a governed finding.

Possible explanations include:

- implementation defect;
- emergency workaround;
- unrecorded approved decision;
- outdated canonical model;
- temporary deviation.

The source-of-truth architecture makes the discrepancy visible instead of resolving it silently by whichever system is running.

---

# The architecture needs a drift concept

If canonical state and implementation state can differ, the product should represent the difference.

A drift finding may contain:

```yaml
id: DRIFT-SUPPLIER-RISK-WARNING
type: ImplementationDrift
canonical_object: RULE-SUPPLIER-RISK-ACTIVATION
implementation_reference: SAP-MDG-RULE-Z_SUPP_RISK
expected_behavior: block activation
observed_behavior: warning only
status: investigation_required
```

The drift is not itself a canonical model update.

It is evidence that one of the following must happen:

- implementation returns to the approved model;
- canonical model changes through review;
- a temporary deviation is recorded;
- the evidence is corrected.

This is a stronger response than synchronising one side automatically.

---

# Canonical truth should be reconstructable

A useful architecture test is destructive:

> Delete every generated artefact. Can the system reconstruct its usable model state?

For Martenweave, that means deleting:

- SQLite database;
- JSONL exports;
- local viewer;
- search cache;
- generated reports.

Then running:

```bash
martenweave validate --repo ./model
martenweave build-index --repo ./model --jsonl
martenweave docs-build --repo ./model --site ./viewer
```

The current CLI exposes validation, full index rebuilding, freshness checking and generated documentation or local viewer output.

If reconstruction fails because critical edits existed only in the database or UI, the files were not the real source of truth.

---

# Rebuildability should be tested continuously

A system may be theoretically rebuildable but operationally dependent on generated state.

This can happen when:

- derived fields are manually corrected;
- index migrations are not reproducible;
- UI-only data is not exported;
- external links are resolved only once;
- generated IDs are unstable;
- build steps rely on local configuration not stored with the repository.

A useful CI check is:

```text
1. Start from a clean checkout.
2. Validate canonical files.
3. Rebuild all generated indexes.
4. Run consistency tests.
5. Compare deterministic outputs where appropriate.
6. Fail if generated state requires manual intervention.
```

The purpose is not byte-for-byte equality for every timestamped report.

The purpose is to prove that all meaningful model state originates from the repository.

---

# Canonical files need schema versioning

A model repository evolves.

Fields may be added.

Object types may change.

Validation rules may become stricter.

The canonical files should therefore declare or inherit a schema version.

Example:

```yaml
schema_version: 1
id: ATTR-CUSTOMER-GROUP
type: Attribute
```

When schema version 2 arrives, the system can:

- migrate old objects;
- validate compatibility;
- reject unsupported structures;
- produce clear upgrade guidance.

Without schema versioning, parser behaviour may change while files appear unchanged.

The source remains canonical only when its interpretation is also controlled.

---

# Canonical state should not depend on hidden configuration

Suppose the same files produce different models because each user has a local configuration containing:

- default domain;
- owner aliases;
- hidden status mappings;
- environment-specific object substitutions.

Then the repository is not fully canonical.

Configuration that changes model meaning should be:

- stored in the repository;
- explicitly referenced;
- versioned;
- validated.

Environment-specific settings may remain external when they affect only:

- output paths;
- logging;
- performance;
- credentials;
- API ports.

The rule is:

> Configuration that changes truth belongs with truth.

---

# Provenance should survive imports

When Excel, tickets, datasets or AI notes create a proposal, the proposal should retain its origin.

Example:

```yaml
id: PATCH-CUSTOMER-GROUP-004
type: PatchProposal
origin:
  source_type: spreadsheet
  source_reference: CUSTOMER_MAPPING_REVIEW_2026_07
  imported_by: ROLE-MIGRATION-ANALYST
  imported_on: 2026-07-14
```

After approval, the canonical change should remain linked to:

- proposal;
- evidence;
- decision;
- reviewer.

This prevents an important failure:

> The canonical file contains the answer, but nobody knows where it came from.

Canonicality should preserve not only current truth but the evidence chain that justified it.

---

# The merge should be the publication event

A useful mental model is to treat merge into the approved branch as publication.

Before merge:

- change is proposed;
- validation may pass;
- reviewers may comment;
- impact may be calculated.

After merge:

- the approved model baseline changes;
- indexes are rebuilt;
- reports and APIs can publish the new state;
- implementation work can reference the accepted decision.

GitHub pull-request reviews allow reviewers to comment, approve or request changes before merge, and repositories can require approvals through protected-branch rules.

This provides a practical technical mechanism.

The organisation still needs to determine whether the reviewers possess the correct model authority.

A technically approved pull request is not sufficient when the wrong people approved the business meaning.

---

# CODEOWNERS is helpful but not the ownership model

GitHub can automatically request reviews from specified people or teams when files matching `CODEOWNERS` rules change.

This can support governance.

For example:

```text
/model/domains/supplier/ @supplier-data-governance
/model/domains/customer/ @customer-data-governance
```

But file ownership and semantic authority are not identical.

One file may affect:

- global owner;
- local owner;
- source owner;
- integration owner;
- compliance owner.

CODEOWNERS can route reviews.

The canonical model should still represent the actual role-based ownership and decision rights.

---

# A canonical object must be able to disagree with an import

Suppose a spreadsheet proposes:

```text
Customer Group source = CRM Segment
```

The canonical model currently states:

```text
Direct equivalence rejected.
Sales-area enrichment required.
```

A weak import process overwrites the canonical mapping because the spreadsheet is newer.

A strong process creates a conflict:

```text
Imported proposal contradicts approved decision
DEC-CUSTOMER-GROUP-SOURCE-017.
```

The import may be valid.

Perhaps the source was redesigned.

But the conflict requires review.

Canonical truth is valuable because new evidence must confront current approved state rather than replace it accidentally.

---

# The latest value is not always the approved value

Timestamp-based resolution is especially dangerous.

Consider:

| Source | Value | Updated |
|---|---|---|
| Canonical model | Sales-area-specific | 1 July |
| Excel review | Central | 12 July |
| SAP configuration | Sales-area-specific | 5 July |
| Jira comment | “Use central for Wave 2” | 13 July |

The newest statement may be:

- a proposal;
- a temporary deviation;
- a misunderstanding;
- a partial decision;
- a local exception.

Authority and lifecycle matter more than modification time.

The canonical model should remain unchanged until the newer evidence is classified and approved.

---

# Human-readable files improve recovery

A canonical store should remain usable under imperfect conditions.

A team may lose access to:

- hosted application;
- external API;
- cloud account;
- production database;
- vendor licence;
- network connection.

Git’s local repository model retains project history and supports many operations without a network connection.

Human-readable model files can still be:

- inspected;
- searched;
- diffed;
- validated locally;
- archived;
- transferred.

This does not eliminate backup and security requirements.

It reduces dependence on one running application.

---

# Human-readable does not mean uncontrolled

Plain text can create a false sense that anyone may safely edit anything.

Canonical files still require:

- schemas;
- validation;
- branch protection;
- reviewer authority;
- naming conventions;
- stable IDs;
- tests;
- release baselines;
- access controls.

A malformed edit is easier to inspect than a hidden database mutation.

It is not automatically safe.

The source-of-truth decision works only when supported by an actual governance process.

---

# Canonical files should remain implementation-neutral where possible

A canonical attribute may map to:

- an SAP field;
- an MDM field;
- a source-system column;
- a reporting dimension.

Its definition should not be rewritten every time one implementation changes.

For example:

```yaml
id: ATTR-CUSTOMER-GROUP
type: Attribute
```

separately linked to:

```yaml
id: FEP-S4-KNVV-KDGRP
type: FieldEndpoint
system: S4
```

This allows the business concept to survive:

- SAP upgrades;
- source replacement;
- field extensions;
- interface redesign;
- migration-wave differences.

The canonical layer holds stable semantics.

Implementation references describe where those semantics appear.

---

# Some generated information may become canonical later

A derived insight can reveal a missing model fact.

For example, dataset profiling may detect:

- a recurring value;
- a hidden relationship;
- a missing source field;
- unexpected cardinality.

Initially, this is evidence.

After review, part of it may become canonical.

The transition should remain explicit:

```text
Derived observation
→ finding
→ decision
→ canonical change
```

The observation should not become canonical merely because an algorithm produced it repeatedly.

This is especially important for AI inference.

Frequency is evidence.

It is not approval.

---

# The architecture should prohibit reverse reconstruction as a normal workflow

It may be technically possible to recreate canonical files from SQLite.

That is useful for disaster recovery in extreme circumstances.

It should not be the normal editing path.

Why?

Because a generated index may omit:

- explanatory Markdown;
- formatting;
- comments;
- ordering;
- unresolved proposals;
- evidence context;
- editorial nuance.

Reverse generation risks creating a lossy version of the model.

The normal direction should remain:

```text
Canonical files → generated representations
```

Reverse reconstruction is an emergency recovery method, not ordinary synchronisation.

---

# A practical authority matrix

| Representation | May contain proposed changes | May define approved model truth | Rebuildable |
|---|---:|---:|---:|
| Canonical model files on approved baseline | No unapproved changes | Yes | Primary source |
| Feature branch | Yes | No | From Git history |
| PatchProposal | Yes | No | From canonical proposal files |
| SQLite index | No canonical edits | No | Yes |
| JSONL exports | No | No | Yes |
| Local viewer | Review or proposal input | No | Yes |
| Excel export | Review input | No | Yes |
| Imported Excel | Yes, as proposal | No | N/A |
| API | Yes, through proposal route | No independent authority | Derived access |
| SAP configuration | Implements model | No, but may expose drift | External |
| Data catalogue | Enterprise reference and ownership context | Authoritative in its own scope | External |
| Jira or ServiceNow | Operational work state | No | External |
| Dataset report | Evidence | No | Generated |

This table eliminates much ambiguity.

Each representation has a defined role.

---

# What happens when canonical state is wrong?

A source of truth can be wrong.

Canonical does not mean infallible.

It means:

> This is the currently approved state against which changes and implementations are assessed.

When new evidence shows it is wrong:

1. record the evidence;
2. create a finding;
3. propose a change;
4. calculate impact;
5. obtain authority;
6. merge the approved correction;
7. rebuild derived outputs;
8. align implementations.

A canonical system becomes dangerous only when “authoritative” is interpreted as “cannot be challenged.”

The model must remain challengeable.

The change path must remain controlled.

---

# Failure modes

## Database-first editing

The UI updates SQLite directly and files are generated later.

Result:

- rationale is lost;
- Git changes become implementation artefacts;
- database state becomes the real authority.

## Spreadsheet approval without immediate canonical update

The business signs off Excel and the repository remains stale.

Result:

- two approved truths exist.

## Direct SAP correction followed by documentation

Configuration is changed under pressure and model files are updated “afterward.”

Result:

- implementation truth outruns model truth.

## Multiple canonical branches without baseline labels

Different teams treat different branches as approved.

Result:

- environment and model version become unclear.

## Generated reports committed as truth

Teams manually edit generated summaries.

Result:

- regeneration overwrites the change or creates divergence.

## API-specific fields absent from canonical files

The API stores additional ownership or status information.

Result:

- the repository cannot reconstruct the full model.

## UI-only decisions

Reviewers approve through a frontend, but the decision is not represented in the repository.

Result:

- auditability depends on the running application.

---

# The canonicality tests

A Martenweave repository can be tested with several direct questions.

## Rebuild test

Can every generated index and viewer be reconstructed from the repository?

## Conflict test

When Excel, UI, SAP and canonical files disagree, is the resolution process explicit?

## Proposal test

Can every external edit enter as a proposal without mutating approved state?

## History test

Can the team identify which approved change introduced the current definition?

## Authority test

Can the team identify who approved the semantic change?

## Portability test

Can another environment validate and index the same repository?

## Independence test

Can the model still be understood without the current UI or database?

## Drift test

Can implementation differences be recorded without silently changing the model?

## Recovery test

Can a clean checkout reproduce the usable model layer?

If the answer to several of these is no, the files are canonical in name only.

---

# The implementation contract

The architecture can be reduced to a small contract.

### Contract 1

Canonical objects live in versioned model files.

### Contract 2

Only the accepted repository baseline defines approved model state.

### Contract 3

Every external edit enters as evidence or a proposal.

### Contract 4

Validation runs before publication and index generation.

### Contract 5

SQLite, JSONL, viewers, APIs and exports are derived representations.

### Contract 6

Implementation systems may diverge, but divergence becomes a finding.

### Contract 7

Approved changes preserve evidence, authority and impact.

### Contract 8

Generated state must be rebuildable from a clean checkout.

This is more important than the specific file extension or database engine.

It prevents ambiguity about authority.

---

# Why this matters for AI agents

Agents need a clear answer to:

> What may I read, what may I propose, and what may I change?

Without a canonical boundary, an agent might:

- update SQLite;
- edit an exported spreadsheet;
- modify an API record;
- change a Markdown file directly;
- send a configuration instruction.

All could appear successful.

A safe agent contract is:

```text
Read:
canonical and derived model context

Analyse:
evidence, gaps, impact and conflicts

Write:
PatchProposal or issue draft

Do not:
silently mutate approved canonical files
or write directly to SAP
```

Martenweave’s documented principle is concise:

> Agents propose. Validators verify. Humans approve. Git records.

That principle depends on canonical files remaining authoritative.

If another editable store can bypass them, the agent-safety boundary is incomplete.

---

# Final perspective

The choice of canonical files is not an argument that files are universally better than databases.

SQLite is better for query.

A UI is better for many review tasks.

Excel is better for some business collaboration.

SAP MDG is better for operational governance and master-data workflow.

ITSM tools are better for incidents and changes.

A data catalogue is better for broad enterprise discovery.

Each tool should do the work it is designed to do.

The architectural mistake is allowing each tool to define an independent version of the same model.

Martenweave needs one accepted point where:

- model identity is stable;
- meaning is explicit;
- references are validated;
- proposals are separated from approval;
- history is durable;
- generated states can be reproduced.

Canonical Markdown and YAML files provide that point.

The SQLite database should make them fast.

The viewer should make them accessible.

The API should make them usable.

Excel should make them reviewable.

AI should make changes easier to propose.

Git should make changes traceable.

None of these should quietly become another source of truth.

The practical test is simple:

> When five tools disagree about Customer Group, can the team identify one approved canonical state, explain why it is current and route every competing version into evidence, drift or a reviewable proposal?

When the answer is yes, the architecture has a source of truth.

When the answer is “we need to compare timestamps,” it has several sources of confusion.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

Its canonical model repository preserves approved definitions, mappings, relationships, ownership, decisions and evidence links.

Generated databases, viewers, exports, APIs and AI workflows make the model usable without replacing its source of truth.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave Core currently defines Markdown and YAML model files as the source of truth. Generated SQLite and JSONL outputs are rebuildable, deterministic validation precedes indexing, and AI-generated changes remain reviewable proposals requiring human approval.

Its current pipeline connects evidence, proposals, validation, gap and impact analysis, human review and GitHub issues or pull requests. Martenweave explicitly does not position itself as a generic workflow platform, hosted MDM product or direct SAP write-back system.

The current demo flow describes generated SQLite, search JSONL and lineage JSONL outputs as disposable and rebuildable from the canonical model repository.

Git’s official documentation explains that Git stores project history as snapshots of the complete file state, checksums stored content and keeps repository history locally. These characteristics support precise, portable model baselines and historical comparison.

GitHub’s official documentation describes pull-request reviews as a mechanism for commenting, requesting changes and approving work before merge. It also supports required reviews and automatic reviewer requests through `CODEOWNERS`.

SQLite’s official documentation describes the complete state of an SQLite database as generally being held in its database file, with journals or write-ahead logs supporting transaction recovery. In Martenweave, that database is deliberately treated as generated access state rather than independent model authority.

Martenweave is independent and is not affiliated with or endorsed by SAP, GitHub, SQLite or other vendors and projects discussed in the broader article series.
