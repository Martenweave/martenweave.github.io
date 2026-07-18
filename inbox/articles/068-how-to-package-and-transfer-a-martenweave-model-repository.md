# How to Package and Transfer a Martenweave Model Repository

**Reviewed: 14 July 2026**

An SAP migration programme reaches handover.

The implementation partner prepares a package containing:

- the latest mapping workbook;
- several design documents;
- a database file;
- a static model viewer;
- exported validation reports;
- a folder called `final`;
- a second folder called `final_updated`;
- meeting notes;
- unresolved tickets;
- a presentation explaining the model.

The package is large.

It is not necessarily transferable.

The receiving AMS or data-governance team still needs to answer:

- Which files are authoritative?
- Which repository baseline was approved?
- Can the model be validated independently?
- Can generated indexes be rebuilt?
- Which findings remain open?
- Which decisions are temporary?
- Which local deviations are active?
- Which SAP and source-system implementations align with the model?
- Which secrets, production records or client-restricted evidence are included?
- Can the next team propose a change without reconstructing the project first?

A transferable model repository is not merely an archive of project files.

> It is a self-contained, verifiable model baseline that another authorised team can understand, validate, rebuild and continue operating.

Martenweave’s architecture makes this possible because it separates canonical files from generated outputs.

The canonical Markdown and YAML objects preserve approved model truth. SQLite, JSONL, search indexes and static views are derived and rebuildable. Deterministic validation runs before indexing, while proposed changes remain subject to human review.

A proper Martenweave handover package therefore needs to transfer more than the current visual output.

It needs to transfer:

1. canonical truth;
2. exact baseline identity;
3. validation evidence;
4. reproducible build instructions;
5. generated access artefacts where useful;
6. unresolved governance state;
7. security and licensing context;
8. a continuation path.

---

# The package must answer three questions

A successful transfer should let the receiving team establish three things immediately.

## What is authoritative?

The team must know which files define the approved model and which files are only:

- exports;
- caches;
- reports;
- generated viewers;
- proposals;
- evidence;
- external references.

## What exactly was transferred?

The package must identify:

- repository;
- branch or tag;
- commit;
- model baseline;
- schema version;
- Martenweave version;
- generation time;
- validation result.

## Can it be reproduced?

The receiving team should be able to:

```text
unpack or clone
→ validate
→ rebuild indexes
→ run smoke checks
→ inspect trace and impact
```

A handover that answers only the first question is incomplete.

A handover that answers only the second is an archive.

A handover that answers all three is operationally transferable.

---

# Canonical repository versus delivery package

The canonical repository and the delivery package are related but not identical.

The repository contains the governed working material:

```text
model/
docs/
configuration/
tests/
examples or approved supporting material
```

The delivery package may additionally contain generated artefacts:

```text
generated/modelops.db
generated/search_documents.jsonl
generated/lineage_edges.jsonl
generated/site/
reports/
manifest/
checksums/
```

The delivery package should not create a new authority hierarchy.

Its generated database and viewer represent a named repository baseline.

They do not replace it.

A useful transfer structure might look like this:

```text
martenweave-customer-wave3/
├── CANONICAL-BASELINE.md
├── TRANSFER-MANIFEST.json
├── CHECKSUMS.sha256
├── repository/
│   ├── model/
│   ├── docs/
│   ├── pyproject.toml
│   └── ...
├── generated/
│   ├── modelops.db
│   ├── search_documents.jsonl
│   ├── lineage_edges.jsonl
│   └── site/
├── reports/
│   ├── validation.json
│   ├── health.json
│   ├── scorecard.json
│   └── open-findings.md
└── transfer/
    ├── README.md
    ├── verification.md
    ├── security-notes.md
    └── continuation.md
```

This is a recommended package layout, not a claim about an already fixed Martenweave export format.

---

# Start from an immutable baseline

Do not package an uncommitted working directory.

The source should be an identified repository state:

```text
tag:
customer-wave3-approved

commit:
abc123...
```

The transfer manifest should record both.

Why both?

The tag provides a meaningful baseline name.

The commit provides the exact repository snapshot.

The package should not depend only on:

```text
branch: main
```

A branch moves.

A commit does not.

The current Martenweave release history already demonstrates the importance of preserving existing tags rather than moving them: the project created a new `v0.4.1` release instead of reusing an existing `v0.4.0` tag that pointed to an earlier commit.

The same discipline should apply to client model baselines.

---

# The transfer manifest

The manifest is the package’s identity card.

It should be machine-readable and human-reviewable.

Conceptually:

```json
{
  "package_id": "MW-CUSTOMER-WAVE3-2026-07-14",
  "model_baseline": "CUSTOMER-WAVE3-APPROVED",
  "repository": "customer-model",
  "commit": "abc123",
  "tag": "customer-wave3-approved",
  "canonical_schema": "1.0",
  "martenweave_version": "0.5.0",
  "created_at": "2026-07-14T16:00:00Z",
  "scope": {
    "domains": [
      "DOMAIN-CUSTOMER",
      "DOMAIN-BUSINESS-PARTNER"
    ],
    "programme": "S4-MIGRATION",
    "wave": "WAVE-3"
  },
  "validation": {
    "errors": 0,
    "warnings": 4
  },
  "generated_outputs": [
    "generated/modelops.db",
    "generated/search_documents.jsonl",
    "generated/lineage_edges.jsonl"
  ]
}
```

The manifest should state:

- package identifier;
- canonical baseline;
- repository commit;
- tag;
- scope;
- schema;
- tool version;
- validation status;
- included artefacts;
- known exclusions;
- transfer owner;
- receiving owner where known.

It should not attempt to contain the complete model.

It points to and describes the transferred state.

---

# A human-readable baseline statement

A JSON manifest is useful for tools.

The package should also include a short human-readable baseline statement.

Example:

```markdown
# Canonical baseline

This package contains the approved Customer and Business Partner model
for Migration Wave 3.

Canonical source:
repository/model/

Approved tag:
customer-wave3-approved

Commit:
abc123

Generated files under generated/ are derived and may be deleted and rebuilt.

Known limitations:
- ERP_B cannot supply Customer Group without enrichment.
- Portugal Tax Exemption treatment remains time-bounded.
- Two local ownership assignments remain under review.
```

This file should be the first thing a receiving team reads.

It should remove ambiguity about authority immediately.

---

# What must be included

A complete package should include several classes of material.

## Canonical model objects

These are non-negotiable.

Examples:

- Domains;
- Entities;
- Attributes;
- Relationships;
- Rules;
- Mappings;
- FieldEndpoints;
- Decisions;
- Evidence references;
- PatchProposals that remain operationally relevant.

## Repository configuration

Include configuration that changes model interpretation:

- schema settings;
- enabled domain packs;
- ID policy;
- validation profiles;
- repository limits;
- approved import mappings.

Do not depend on undocumented local machine configuration.

## Validation and build instructions

The receiving team needs exact commands.

## Dependency and environment information

Record:

- supported Python version;
- Martenweave version;
- required optional dependency groups;
- operating assumptions.

The current Martenweave package requires Python 3.11 or later and declares its core dependencies in project metadata.

## Open governance state

Include:

- pending proposals;
- unresolved findings;
- temporary deviations;
- known implementation drift;
- expiring exceptions;
- unowned objects;
- stale evidence.

## Licence and notices

Include the applicable licence, notices and any third-party or client-specific restrictions.

The current Martenweave Core package metadata identifies Apache License 2.0 for version 0.5.0.

---

# What should usually be excluded

A good package is not a project dump.

Exclude or control:

- production master-data records;
- credentials;
- tokens;
- `.env` files;
- local caches;
- editor settings;
- personal notes;
- temporary downloads;
- unrestricted ticket exports;
- confidential attachments with no transfer authority;
- duplicate spreadsheet copies;
- build environments;
- uncommitted experiments.

The principle is:

> Transfer enough evidence to understand and verify the model, but do not turn the repository package into an uncontrolled data room.

Evidence references may point to external authorised systems rather than embedding every source artefact.

---

# Generated outputs: include them or rebuild them?

Both options can be correct.

## Include generated outputs when:

- the receiving team needs immediate read-only access;
- the viewer is part of a formal handover;
- an offline review is required;
- a historical release must preserve the exact generated presentation;
- the recipient cannot run the build immediately.

## Omit generated outputs when:

- the recipient can rebuild them;
- package size matters;
- generated state contains environment-specific paths;
- artefacts may expose restricted content;
- the transfer contract is explicitly source-only.

A practical package often includes generated outputs for convenience while clearly marking them as derived.

Martenweave’s documented demo generates `modelops.db`, search-document JSONL and lineage-edge JSONL and describes them as disposable.

---

# Include build provenance

Every generated output should identify its source.

At minimum:

```text
canonical commit
model baseline
schema version
Martenweave version
build configuration
build timestamp
validation summary
```

A generated viewer without provenance is dangerous.

It may be:

- current;
- stale;
- built from another branch;
- built before a critical Decision;
- generated with incompatible code.

The receiver should not need to infer this from file dates.

---

# Checksums verify transfer integrity

A checksum file helps detect accidental package changes during transfer or storage.

For example:

```text
CHECKSUMS.sha256
```

can cover:

- archive;
- manifest;
- canonical source archive;
- generated database;
- JSONL outputs;
- reports;
- viewer package.

Checksums answer:

> Are these bytes the same as the bytes that were packaged?

They do not answer:

- Is the model correct?
- Was it approved?
- Is the package safe?
- Does the archive contain secrets?

Integrity verification and governance validation are different controls.

---

# Signatures and attestations

In regulated or cross-company handovers, teams may need stronger evidence about package origin.

Possible mechanisms include:

- signed Git tags;
- signed release assets;
- detached signatures;
- CI-produced provenance;
- controlled release records.

The appropriate mechanism depends on organisational infrastructure and risk.

Do not add a sophisticated signing system merely for appearance.

First ensure the package already has:

- exact baseline;
- reproducible validation;
- checksum manifest;
- accountable approver;
- controlled distribution.

Cryptographic provenance strengthens a disciplined release.

It does not repair an ambiguous repository.

---

# Archive or full Git history?

There are two main delivery modes.

## Snapshot archive

Contains the files from one selected baseline.

Advantages:

- compact;
- simple;
- easy for non-Git users;
- suitable for read-only handover.

Limitations:

- no complete commit history;
- no branches or tags beyond embedded metadata;
- weaker continuation workflow.

Git’s `archive` command creates an archive from a named tree, commit or tag. When a commit or tag is used, Git can preserve the referenced commit identifier in archive metadata for supported formats.

## Full repository transfer

Contains Git objects and references.

Advantages:

- complete history;
- tags;
- branches;
- commit-level traceability;
- easier continuation.

Limitations:

- larger;
- may include history that should not cross a boundary;
- requires Git competency;
- can expose accidentally committed sensitive material.

The delivery choice depends on whether the receiver needs:

- only the approved baseline;
- or the ability to continue full repository history.

---

# Git bundle for offline transfer

A Git bundle can package Git objects and references into a transferable file.

Git’s official documentation describes bundles as a mechanism for offline transfer without an active server and supports self-contained repository transfer, incremental bundles and verification of prerequisites. A full bundle can be cloned into a new repository.

A full transfer might use:

```bash
git bundle create customer-wave3.bundle --branches --tags
```

The recipient can verify it:

```bash
git bundle verify customer-wave3.bundle
```

and clone it:

```bash
git clone customer-wave3.bundle customer-model
```

Martenweave Core’s changelog records Git bundle generation as an existing project capability around GitHub-ready change and repository transfer workflows.

A Git bundle is useful when:

- network access is restricted;
- client and supplier Git platforms are separate;
- a full auditable repository history must be transferred;
- the recipient needs to continue development.

---

# A bundle is not the entire working environment

Git bundles contain repository objects and references.

They do not automatically contain every piece of local repository state, such as:

- uncommitted working-tree changes;
- stash entries unless referenced appropriately;
- local hooks;
- local configuration;
- credentials;
- external datasets;
- ignored generated artefacts.

Git’s documentation explicitly distinguishes the transferred refs and commits from local working state and repository-specific configuration.

This is beneficial.

A proper handover should not depend on hidden local state.

Anything required to validate or rebuild the model must be included deliberately or documented as an external prerequisite.

---

# Git archive for a clean snapshot

A snapshot archive can be produced from an approved tag:

```bash
git archive \
  --format=tar.gz \
  --prefix=customer-wave3/ \
  customer-wave3-approved \
  -o customer-wave3.tar.gz
```

Git’s archive tooling supports formats such as tar and zip and creates the archive from a specified tree, commit or tag.

This is appropriate when:

- the recipient should not receive development history;
- the package is intended for read-only inspection;
- a regulator or client wants the approved snapshot;
- history will remain in the source platform.

The package should still include the commit and tag in its manifest.

---

# GitHub Release as a distribution surface

A GitHub Release can package a named iteration around a Git tag and attach release notes and additional assets. GitHub also exposes automatically generated source archives for the tagged repository state.

For Martenweave, a release could attach:

- transfer manifest;
- validation report;
- model archive;
- Git bundle;
- generated viewer;
- checksum file;
- semantic diff;
- handover notes.

A release page improves discoverability.

It does not replace governance approval.

The release must still identify:

- model authority;
- scope;
- effective date;
- known limitations;
- accountable owners.

---

# Validation evidence

The receiver should not be told merely:

```text
Validation passed.
```

The package should include:

- validation command;
- structured result;
- error count;
- warning count;
- validation profile;
- Martenweave version;
- canonical commit;
- execution timestamp.

Example:

```json
{
  "baseline": "CUSTOMER-WAVE3-APPROVED",
  "commit": "abc123",
  "tool": "martenweave 0.5.0",
  "command": "martenweave validate --repo ./repository",
  "errors": 0,
  "warnings": 4
}
```

Warnings should be summarised.

A receiver should not need to discover later that the model contained:

- unowned approved Attributes;
- expiring local deviations;
- incomplete source mappings;
- stale evidence.

---

# Verification commands

The handover should give the receiving team a small acceptance script.

For example:

```bash
python -m venv .venv
.venv/bin/python -m pip install -e "./repository[dev]"

.venv/bin/martenweave validate \
  --repo ./repository

.venv/bin/martenweave build-index \
  --repo ./repository \
  --jsonl

.venv/bin/martenweave index-fresh \
  --repo ./repository

.venv/bin/martenweave search \
  "Customer Group" \
  --repo ./repository

.venv/bin/martenweave trace \
  ATTR-CUST-SALES-CUSTOMER-GROUP \
  --repo ./repository

.venv/bin/martenweave impact \
  FEP-S4-KNVV-KDGRP \
  --repo ./repository
```

These operations follow the current public Martenweave demo path: validation, index building, freshness checking, search, trace and impact.

---

# Acceptance should happen on a clean environment

The receiving team should not verify the package in the sender’s prepared working directory.

Use:

- clean machine;
- clean container;
- clean virtual environment;
- clean checkout or extracted archive.

This tests whether the package depends on:

- local caches;
- untracked files;
- developer configuration;
- previously generated databases;
- environment-specific secrets;
- undocumented tools.

A package that works only on the sender’s machine has not been transferred successfully.

---

# Verify generated artefacts by rebuilding

Where generated outputs are included, the receiver should:

1. retain the delivered copies;
2. delete or move them;
3. rebuild from canonical files;
4. compare semantic outputs.

The comparison should check:

- object count;
- stable object IDs;
- relationship count;
- lineage-edge set;
- critical search results;
- trace results;
- impact results;
- viewer manifest.

Byte-for-byte equality may not always be appropriate due to build metadata.

Model-level equivalence is the stronger requirement.

---

# Include the semantic diff from the previous baseline

A handover should explain what changed.

Example:

```text
Previous baseline:
CUSTOMER-WAVE2-APPROVED

Transferred baseline:
CUSTOMER-WAVE3-APPROVED
```

The package should include a concise semantic diff:

- added objects;
- retired objects;
- changed definitions;
- changed mappings;
- changed Rules;
- changed ownership;
- changed physical endpoints;
- implementation consequences.

The receiver should not need to reconstruct the entire project history to understand why the new baseline exists.

---

# Open findings are part of the model’s operating reality

A clean validation result does not mean there are no unresolved risks.

The package should include an open-findings register.

Example:

| Finding | Affected objects | Status | Owner | Due |
|---|---|---|---|---|
| ERP_B lacks Customer Group context | Customer Group Mapping | Open | Migration Data Lead | Before Mock Load 3 |
| Portugal exemption expiry | Tax Rule | Decision required | Local Data Owner | 31 August |
| Custom field retirement | Supplier Review Status | Planned | SAP MDG Lead | Release 2026.09 |

Do not hide open issues to make the handover appear complete.

A transparent incomplete package is safer than a polished package with undisclosed gaps.

---

# Pending proposals

Pending `PatchProposal` objects need explicit treatment.

For each proposal, state:

- why it exists;
- baseline it was created against;
- current review status;
- affected objects;
- evidence;
- decision owner;
- whether it is still valid.

A stale proposal should not be transferred as though it were current work.

It should be:

- refreshed;
- rejected;
- marked superseded;
- transferred with a clear warning.

---

# Temporary deviations

Temporary deviations are frequently lost during handover.

For each deviation, include:

- canonical expectation;
- actual implementation;
- business reason;
- approval;
- scope;
- start date;
- expiry;
- owner;
- required closure action.

Example:

```text
Canonical:
Customer Group requires Sales Area enrichment.

Temporary implementation:
Wave 2 uses one central default.

Expiry:
Before Wave 3 production cutover.

Owner:
Customer Data Lead.
```

Without this, temporary project compromises become permanent AMS behaviour.

---

# Implementation-alignment matrix

The package should distinguish canonical truth from implementation status.

Example:

| Model object | SAP | Source | Interface | Reporting |
|---|---|---|---|---|
| Customer Group | Aligned | Enrichment pending | Aligned | Review required |
| Supplier Risk | Aligned | Gap open | Aligned | Aligned |
| Review Status | Planned | N/A | Pending | Pending |

This shows the receiver where the model is already operational and where delivery work remains.

Do not claim the repository is “implemented” merely because it is approved.

---

# Evidence references need continuity

If a Decision references:

```text
ServiceNow CHG001234
Jira DATA-482
SharePoint design document
dataset profile hash
SAP transport
```

the receiver must know whether those references remain accessible.

For every critical external reference, classify:

- transferred directly;
- accessible in source system;
- access requested;
- unavailable after handover;
- redacted;
- replaced by an extracted evidence summary.

A model that points to inaccessible evidence may remain structurally valid but operationally weak.

---

# Source registry

Martenweave Core’s changelog records source-registry functionality for imported files and external references.

A transfer package should use that concept to identify:

- original source;
- imported date;
- checksum or external identifier;
- licence or confidentiality status;
- whether the source is embedded;
- whether the source must be reacquired.

This reduces the risk of evidence becoming an orphaned filename.

---

# Spreadsheet roundtrip state

Where business review occurred through Excel, include:

- canonical baseline exported;
- workbook identifier;
- export time;
- import result;
- accepted changes;
- rejected changes;
- resulting proposal or Decision.

Martenweave Core records business-review XLSX export and re-import capabilities, as well as Google Sheets import as PatchProposals.

Do not include five competing spreadsheet copies without explaining which edits were incorporated.

---

# Security review before packaging

Before transfer, scan for:

- credentials;
- API tokens;
- private keys;
- personal information;
- client-restricted data;
- embedded production records;
- local configuration;
- machine-specific paths;
- internal URLs;
- unrestricted evidence attachments.

Martenweave Core includes a configuration guard intended to identify secret and configuration risks before release.

The release process should fail or require explicit acknowledgement when restricted content is detected.

---

# Sensitive evidence may require a two-package model

In regulated environments, one package may not be sufficient.

A useful split is:

## Core model package

Contains:

- canonical metadata;
- definitions;
- mappings;
- Rules;
- Decisions;
- redacted evidence summaries;
- generated indexes.

## Restricted evidence package

Contains:

- confidential extracts;
- ticket exports;
- legal documents;
- identifiable production samples;
- access-controlled attachments.

The core package references the restricted evidence through stable identifiers.

This lets more users operate the model without receiving unnecessary sensitive material.

---

# Licensing and client ownership

The package should clearly state:

- software licence;
- model-content ownership;
- third-party-content restrictions;
- redistribution rights;
- client confidentiality requirements;
- permitted use of examples;
- obligations for notices.

The Martenweave software licence and the client’s model content are separate legal subjects.

An open-source tool does not automatically make a client model public.

Likewise, a transferable model package may contain evidence that cannot be redistributed outside the programme.

---

# Operational continuation guide

The handover should include the next routine actions.

For example:

```text
Weekly:
- validate repository;
- review pending proposals;
- check expiring deviations.

For each model change:
- create or update Finding;
- collect Evidence;
- create PatchProposal;
- run validation and impact;
- obtain approval;
- merge canonical change;
- rebuild generated artefacts.

Before each SAP release:
- compare baseline;
- review changed FieldEndpoints;
- reassess global/local overrides;
- update implementation matrix.
```

The continuation guide turns the repository into an operating capability rather than a frozen project archive.

---

# Ownership transfer

Technical transfer is incomplete without authority transfer.

The package should identify new owners for:

- repository administration;
- semantic approval;
- domain stewardship;
- validation policy;
- source imports;
- generated releases;
- security review;
- incident escalation.

A repository with no authorised approver may remain technically usable but cannot govern change.

---

# Access transfer

Check:

- Git repository access;
- release asset access;
- CI permissions;
- issue and pull-request permissions;
- external evidence systems;
- package decryption keys where used;
- domain-owner contact routes.

Do not wait until the first urgent change to discover that the AMS team has read-only access.

---

# Training transfer

A short live or recorded transfer should cover:

1. canonical versus generated files;
2. validation;
3. search and query;
4. trace and impact;
5. dataset gaps;
6. proposals;
7. approval;
8. rebuild;
9. release packaging;
10. open risks.

The objective is not to teach every command.

It is to teach the operating model:

```text
Evidence enters.
Canonical truth remains controlled.
Validators check.
AI or automation proposes.
Humans approve.
Generated views are rebuilt.
```

---

# Transfer modes

Different situations need different packages.

## Consultant-to-client handover

Include:

- full canonical repository;
- full authorised history;
- ownership matrix;
- open findings;
- build and operating instructions;
- generated viewer;
- licence and support information.

## Project-to-AMS handover

Emphasise:

- current production baseline;
- deviations;
- pending changes;
- implementation alignment;
- incident-to-model-change process;
- release cadence.

## Wave-to-wave transfer

Emphasise:

- previous and target baselines;
- semantic diff;
- source-system readiness;
- migration Mapping changes;
- reusable Decisions.

## Regulated archive

Emphasise:

- immutable baseline;
- approval evidence;
- checksums;
- signatures where required;
- restricted evidence references;
- retention policy.

## Offline transfer

Use:

- Git bundle;
- manifest;
- checksum file;
- optional generated viewer;
- verification script.

---

# A transfer acceptance checklist

The receiving team should be able to confirm all of the following.

## Identity

- package ID is present;
- baseline is named;
- commit and tag are recorded;
- scope is clear.

## Canonical content

- model objects are present;
- stable IDs resolve;
- Decisions and evidence references are included;
- pending proposals are classified.

## Validation

- documented command runs;
- no undisclosed errors appear;
- warnings match the manifest.

## Rebuild

- SQLite and JSONL artefacts can be regenerated;
- viewer can be rebuilt;
- freshness check passes.

## Governance

- owners are identified;
- open findings are listed;
- deviations have expiry and accountability;
- approval process is documented.

## Security

- no credentials are present;
- sensitive evidence is handled correctly;
- licence and confidentiality terms are included.

## Continuation

- next change can be proposed;
- impact can be calculated;
- Git review path works;
- receiving team has required access.

---

# Failure modes

## Database-only handover

The receiver can search but cannot reconstruct or govern the model.

## Viewer-only handover

The model is readable but not maintainable.

## Repository without baseline identity

Nobody can prove which commit was approved.

## Archive without history where history is required

Decisions and change evolution become harder to reconstruct.

## Full Git history without security review

Old committed secrets or restricted evidence may cross the boundary.

## Generated reports without their inputs

Verdicts cannot be reproduced.

## Open proposals presented as approved content

The receiving team inherits hidden ambiguity.

## Temporary deviations omitted

Workarounds become permanent.

## Source references without access continuity

Evidence becomes unusable.

## Build instructions that depend on one developer machine

The package is not reproducible.

## Checksums without governance metadata

The files are intact, but their authority remains unclear.

## “Final” folder copied from SharePoint

Document naming substitutes for model control.

---

# What Martenweave should implement next

Martenweave already has much of the foundation:

- canonical files;
- deterministic validation;
- disposable indexes;
- static documentation;
- Git bundle generation;
- GitHub change bundles;
- XLSX roundtrip;
- source registry;
- config guard;
- proposal and ChangeRequest workflows.

The smallest useful product increment would be a dedicated transfer command.

Conceptually:

```bash
martenweave package \
  --repo ./model \
  --baseline customer-wave3-approved \
  --out ./dist/customer-wave3 \
  --include-viewer \
  --include-bundle
```

It could produce:

- baseline manifest;
- canonical archive;
- optional Git bundle;
- validation report;
- build manifest;
- SQLite and JSONL outputs;
- static viewer;
- semantic diff;
- checksum file;
- open-governance summary;
- verification script.

A companion command could verify the package:

```bash
martenweave package-verify ./dist/customer-wave3
```

---

# Proposed package verification

Verification should check:

1. manifest parses;
2. required files exist;
3. checksums match;
4. Git bundle verifies where included;
5. canonical repository validates;
6. generated index rebuilds;
7. index freshness passes;
8. critical trace and impact smoke tests pass;
9. package contains no prohibited secret patterns;
10. reported baseline matches checked-out commit.

The verification result should be machine-readable and human-readable.

Example:

```text
Package:
MW-CUSTOMER-WAVE3-2026-07-14

Integrity:
PASS

Canonical validation:
PASS

Warnings:
4

Generated rebuild:
PASS

Git bundle:
PASS

Security guard:
PASS WITH 1 ACKNOWLEDGED FINDING

Transfer verdict:
ACCEPTABLE WITH DOCUMENTED WARNINGS
```

---

# Package tiers

A single command could support several tiers.

## Source tier

Contains:

- canonical repository snapshot;
- manifest;
- validation report;
- build instructions.

## Review tier

Adds:

- generated viewer;
- search index;
- reports;
- semantic diff.

## Continuation tier

Adds:

- full Git bundle;
- pending proposals;
- issue or PR bundle;
- operating guide.

## Audit tier

Adds:

- approval evidence;
- checksums;
- signatures or attestations where required;
- immutable historical reports;
- restricted-evidence manifest.

This avoids building one oversized package for every use case.

---

# The package must remain explainable without Martenweave

A receiver should ideally be able to inspect the package even before installing the tool.

They should be able to read:

- canonical Markdown;
- YAML frontmatter;
- baseline statement;
- transfer manifest;
- validation summary;
- open-findings report.

Martenweave improves validation, search and analysis.

It should not make the model unreadable without the application.

This is one of the practical benefits of canonical human-readable files.

---

# The transfer should be reversible

A good transfer process should allow the sending team to prove exactly what was handed over later.

Retain:

- package identifier;
- checksum manifest;
- baseline commit;
- release record;
- transfer date;
- recipient;
- acceptance result.

If the receiver later reports:

> The package did not contain Decision 017,

the sender should be able to verify the archived transfer package rather than relying on memory.

---

# Final perspective

A model repository is not transferred successfully when someone uploads a ZIP file.

It is transferred successfully when another authorised team can:

- identify the approved baseline;
- understand what is canonical;
- validate it independently;
- rebuild every generated access layer;
- inspect unresolved risks;
- trace decisions and evidence;
- propose the next change safely;
- continue governance without the original project team.

The package should therefore preserve two things at once:

```text
Durable truth:
canonical model, identity, decisions and history

Operational usability:
indexes, viewer, reports, instructions and continuation process
```

A static viewer without canonical files is a brochure.

A database without rebuild instructions is a dependency.

A repository without baseline identity is an unfinished working directory.

A complete Martenweave transfer package connects all three:

```text
canonical repository
+
immutable baseline
+
verification evidence
+
rebuildable generated artefacts
+
operating handover
```

The practical test is:

> Could an AMS team receive this package on a clean machine, verify its integrity, rebuild the model index, locate Customer Group, trace it to `KNVV-KDGRP`, understand its outstanding enrichment gap and create a reviewable proposal without contacting the original consultant?

When the answer is yes, the model has been transferred.

When the answer is “they will need us to explain which spreadsheet is final,” the handover has transferred documents but not model governance.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

Its canonical files preserve model truth, while generated SQLite, JSONL, lineage, viewer and reporting artefacts make that truth operationally accessible.

A Martenweave handover package is designed to transfer both: durable model authority and the ability to continue using it.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave Core currently defines canonical Markdown and YAML files as the source of truth, generated indexes as disposable, deterministic validation as the first gate and AI-assisted changes as human-reviewed proposals.

The public demo validates a repository, builds `modelops.db`, `search_documents.jsonl` and `lineage_edges.jsonl`, checks freshness, generates a static viewer and supports search, trace and impact operations.

Martenweave Core’s release history records Git bundle generation, GitHub-ready change bundles, Excel review roundtrip, Google Drive and Sheets connectors, a source registry, static documentation and configuration-guard capabilities.

Git’s official documentation describes Git bundles as files for offline transfer of Git objects and references. Bundles can support full or incremental repository transfer, can be verified and can be cloned or fetched from.

Git’s official archive documentation describes creating tar or ZIP archives from a selected tree, commit or tag. Archives created from a commit or tag can retain the referenced commit identity in archive metadata for supported formats.

GitHub Releases are based on Git tags and can package release notes and attached assets around a specific repository point; GitHub also provides source archives for tagged releases.

The package layout, manifest schema, package tiers and proposed `package` and `package-verify` commands in this article describe a recommended Martenweave product direction. They should not be interpreted as guarantees that this exact packaging interface already exists.

Martenweave is independent and is not affiliated with or endorsed by SAP, Git or GitHub.
