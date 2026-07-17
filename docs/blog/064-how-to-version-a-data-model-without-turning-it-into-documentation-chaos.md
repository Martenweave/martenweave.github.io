# How to Version a Data Model Without Turning It into Documentation Chaos

**Reviewed: 14 July 2026**

A Customer Group rule changes during an SAP programme.

The project team records the change in several ways:

- the mapping workbook becomes version 14;
- the design document becomes version 2.7;
- the Git repository receives three new commits;
- the Martenweave object schema remains version 1.0;
- the target SAP release is Wave 3;
- the rule becomes effective on 1 October;
- one country continues using the previous treatment until January;
- the Martenweave software package moves from 0.4.1 to 0.5.0.

All of these are versions.

They do not describe the same thing.

When a team uses one number to represent all of them, confusion follows quickly:

> Is version 3 the third document, the third model baseline, the third SAP deployment or the third schema format?

This is how version control becomes documentation administration.

Files receive labels such as:

```text
Customer_Model_v7_FINAL.xlsx
Customer_Model_v7_FINAL_2.xlsx
Customer_Model_v8_APPROVED.xlsx
Customer_Model_v8_APPROVED_LATEST.xlsx
```

The labels attempt to carry several independent facts:

- content history;
- approval state;
- business-effective date;
- programme wave;
- implementation status;
- document format.

One filename cannot carry all of them safely.

> A governed data model should separate content history, model identity, schema compatibility, business effectiveness and implementation release.

Git can preserve exact content history.

Canonical object metadata can preserve lifecycle and effective periods.

Tags can identify approved repository baselines.

Schema versions can describe the format understood by Martenweave.

Implementation references can show where and when the model was deployed.

These mechanisms work together.

They should not be collapsed into one universal version number.

---

# Five kinds of version

A practical Martenweave repository needs to distinguish at least five concepts.

## 1. File revision

A file revision records that the text or structured metadata changed.

Examples:

- definition corrected;
- owner added;
- typo fixed;
- relationship changed;
- status updated.

Git commits already provide this history.

A separate `version: 17` inside every file is usually unnecessary when it merely repeats the number of edits.

## 2. Model-object lifecycle

The object itself can move through states:

```text
draft
pending_review
approved
superseded
retired
```

This is not file history.

A file may receive five editorial commits while the object remains `approved`.

Another file may change once and move from `draft` to `approved`.

## 3. Model baseline

A baseline identifies a complete, consistent repository state that a team intends to use for a purpose.

Examples:

```text
Customer model approved for Mock Load 2
Supplier model baseline for Wave 3 build
AMS production model as of 2026-10-01
```

A Git tag or immutable commit reference can identify that repository snapshot.

Git tags are designed to mark significant points in repository history, commonly including release points. Annotated tags can also carry tagger information, date and a message.

## 4. Schema version

The schema version describes the format of canonical objects.

Example:

```yaml
schema_version: "1.0"
```

It answers:

> Which fields, object types and structural rules are required to parse this object?

It does not answer:

> Which Customer Group definition is currently approved?

Martenweave’s changelog records the addition of schema versioning and migration support, together with normalisation of example canonical objects to schema version 1.0.

## 5. Effective business version

A model decision may be approved now but become effective later.

It may also apply differently by:

- country;
- company code;
- migration wave;
- source system;
- operational environment.

An effective period answers:

> In which context and during which period should this rule be treated as active?

This cannot be inferred reliably from the file’s last modification date.

---

# Add a sixth version: implementation state

The canonical model describes intended approved truth.

SAP, MDM, interfaces and reports implement that truth.

Implementation may occur later.

For example:

```text
Model decision approved:
15 July

Canonical baseline published:
18 July

SAP configuration transported:
2 August

Migration transformation deployed:
5 August

Business-effective date:
1 October
```

Calling all of these “version 3” removes critical information.

A change can be:

- approved but not implemented;
- implemented in test but not production;
- effective for one wave but not another;
- active in SAP but missing from an interface;
- retired canonically but still present in historical datasets.

Implementation state should therefore be referenced separately from canonical versioning.

---

# Software version is another independent dimension

Martenweave itself has a software version.

The current repository package identifies version `0.5.0`, and its changelog distinguishes product releases such as `0.4.0`, `0.4.1` and `0.5.0`.

This version describes the capabilities and behaviour of the Martenweave software.

It may determine:

- which schema versions can be read;
- which validation rules run;
- which commands are available;
- how indexes are generated.

It does not identify the version of a client’s Customer model.

A repository may contain Customer Model Baseline 12 while being processed by Martenweave 0.5.0.

These numbers should not be forced to match.

---

# Do not put a version counter on every object by default

A canonical object might be written as:

```yaml
id: ATTR-CUSTOMER-GROUP
version: 7
```

This appears useful.

It immediately raises difficult questions:

- Does a typo increment the version?
- Does adding evidence increment it?
- Does moving the file increment it?
- Who increments it?
- What happens when two branches both create version 8?
- Does version 7 refer to the object or the whole repository?
- Can version 7 exist in several baselines?

Git already records every content revision.

An internal object counter adds value only when external consumers require an explicit monotonic identifier for an object revision.

Without that requirement, it often creates manual administration without improving traceability.

A stable object ID plus Git history is usually stronger:

```text
Object identity:
ATTR-CUSTOMER-GROUP

Historical states:
identified by commit or tag
```

---

# Stable ID, changing state

An object’s identity should survive ordinary evolution.

Suppose the definition of Customer Group is clarified.

Before:

```markdown
Customer Group is a customer classification.
```

After:

```markdown
Customer Group is a sales-area-specific commercial classification.
```

The object remains:

```text
ATTR-CUSTOMER-GROUP
```

Creating a new ID for every wording change would fragment history and break references.

A new object identity is justified when the concept itself has changed so substantially that treating it as the same governed object would be misleading.

Examples include:

- one Attribute is split into two independent concepts;
- a lifecycle status is separated from a final classification;
- a central concept is replaced by an organisational one;
- an object’s meaning is intentionally discontinued and replaced.

The decision should be semantic, not based on the number of edited lines.

---

# Rename is not replacement

Consider this change:

```text
Old label:
Customer Classification Group

New label:
Customer Group
```

When the meaning and identity remain stable, this is a rename.

The ID can remain unchanged.

```yaml
id: ATTR-CUSTOMER-GROUP
name: Customer Group
aliases:
  - Customer Classification Group
```

Impact may be limited to:

- display labels;
- search aliases;
- documentation;
- exports.

A replacement is different.

Example:

```text
Old concept:
Supplier Risk includes pending assessment state.

New model:
Supplier Risk contains only final classification.
Supplier Review Status contains lifecycle state.
```

This is not a rename.

It is a model decomposition.

The old concept may need to be:

- superseded;
- mapped to two new objects;
- retained for historical interpretation;
- removed from active use.

Versioning must preserve this distinction.

---

# Git history is not the model lifecycle

Git records that files changed.

It does not inherently know whether the change represents:

- an editorial correction;
- a draft proposal;
- an approved semantic change;
- a temporary local deviation;
- a retirement;
- an implementation update.

That meaning belongs in model objects and decisions.

For example:

```yaml
id: ATTR-SUPPLIER-RISK
type: Attribute
status: superseded
superseded_by:
  - ATTR-SUPPLIER-RISK
  - ATTR-SUPPLIER-REVIEW-STATUS
```

The exact structure may vary, and a self-reference would not be appropriate in a real schema. The important point is that the canonical model should explicitly record the semantic transition rather than expecting readers to infer it from commit messages.

Git answers:

> What changed in the repository?

The model lifecycle answers:

> What does that change mean for this object?

---

# Do not rewrite approved history

Once a baseline has been used for:

- migration load;
- testing;
- design approval;
- production deployment;
- audit evidence;

it should remain identifiable.

An approved tag should not be moved silently to another commit.

The Martenweave changelog documents a concrete example: the existing remote `v0.4.0` tag was preserved, and a new `v0.4.1` release was created rather than moving or reusing the old tag.

The same discipline should apply to model baselines.

Suppose:

```text
model-customer-wave2-approved
```

points to a specific commit.

A later correction should create a new baseline:

```text
model-customer-wave2-approved.1
```

or a clearer organisational equivalent.

The original reference should continue identifying what Wave 2 actually used.

Otherwise, future analysis cannot reconstruct historical decisions or test results.

---

# Use tags for important snapshots, not every commit

Git already stores every commit.

Tagging every small edit creates another numbering bureaucracy.

Tags are most useful for repository states that matter outside ordinary development:

- approved model baseline;
- migration-wave freeze;
- mock-load input baseline;
- production-effective model;
- handover package;
- audit snapshot.

A tag should answer:

> Why is this particular repository state worth naming?

A useful annotated tag message might record:

```text
Customer and Business Partner model approved for Mock Load 3.

Scope:
- Customer central data
- Customer sales-area data
- Business Partner roles

Known limitations:
- ERP_B Customer Group enrichment remains open
- Portugal tax exemption treatment is provisional
```

The tag identifies the snapshot.

The message explains its intended use.

---

# Do not use branches as permanent version labels

Branches are useful for active lines of work:

```text
main
feature/customer-group-enrichment
release/wave-3
```

They are poor permanent historical identifiers because branches move as commits are added.

A statement such as:

> The migration used `release/wave-3`

is incomplete.

Which commit on that branch?

A durable record should use:

- commit SHA;
- immutable tag;
- release identifier resolving to a fixed commit.

Branches describe moving workstreams.

Tags and commits identify fixed states.

---

# Repository baseline versus domain baseline

A repository may contain several domains.

One change to Product data technically creates a new repository commit even when the Customer model is unchanged.

This creates a useful question:

> Does every domain need an independent version number?

Not necessarily.

The Git repository baseline already identifies the complete state.

Domain-specific releases may be useful when domains have genuinely independent:

- ownership;
- release cycles;
- implementation schedules;
- access controls.

Possible approaches include:

## One repository baseline

Simplest.

```text
model-baseline-2026.10
```

All domains share one repository snapshot.

## Repository baseline with domain manifest

The repository is tagged once, while a manifest states which domain versions or effective decisions are included.

## Separate repositories

Appropriate when governance and delivery boundaries are genuinely independent.

Avoid adding domain version counters merely because stakeholders request “a Customer version number.”

First determine which operational question that number must answer.

---

# Model baseline should be a set, not a document label

A usable baseline includes more than one design file.

It may include:

- Entities;
- Attributes;
- Relationships;
- Rules;
- Mappings;
- Decisions;
- accepted deviations;
- evidence references;
- ownership;
- schema version;
- generated build manifest.

This is why a repository snapshot is more reliable than a workbook filename.

The baseline represents the complete connected model state.

A mapping workbook called version 12 may not indicate which Rule, Decision or Entity definition accompanied it.

---

# Separate schema migration from business-model change

Suppose Martenweave schema version 2 introduces a structured ownership field.

Before:

```yaml
owner: Customer Data Team
```

After:

```yaml
owners:
  semantic:
    - ROLE-CUSTOMER-DATA-OWNER
```

The canonical file changes.

The business meaning may remain the same.

This is a schema migration.

Now consider:

```yaml
owners:
  semantic:
    - ROLE-SALES-OPERATIONS
```

This is a business-governance change.

The line-level diff may look similar.

The change classification is different.

A migration tool should ideally preserve semantic content while transforming object structure.

Martenweave’s changelog records schema-version migration support as a distinct capability, which is the correct architectural direction.

---

# Schema versions need explicit compatibility rules

A schema version should answer:

- Can the current Martenweave version read it?
- Can it validate it?
- Can it migrate it?
- Will any information be lost?
- Can the new representation be written back to the old version?

Possible relationships include:

```text
read-compatible
write-compatible
migratable
unsupported
```

Example:

```text
Martenweave 0.5.0
reads schema 1.0
writes schema 1.0
migrates schema 0.9 to 1.0
```

These are examples, not claims about the exact current compatibility matrix.

The important point is that software version and schema version must be related explicitly rather than assumed.

---

# Semantic Versioning is useful for software, not automatically for every model

Semantic Versioning defines a `MAJOR.MINOR.PATCH` convention tied to incompatible API changes, backward-compatible functionality and backward-compatible fixes.

This is useful for software packages with a declared public API.

Applying the same pattern directly to a business data model can create false precision.

What is a “backward-compatible” change to Supplier Risk?

- adding a value may break downstream consumers;
- clarifying a definition may expose old misuse;
- making a field optional may preserve records but change controls;
- adding an Attribute may be harmless for one interface and breaking for another.

A model can use semantic-style numbering if compatibility rules are explicitly defined.

Without those rules, `2.1.3` is just a label.

For many Martenweave use cases, named baselines and impact classification are clearer:

```text
customer-wave3-approved
customer-ams-2026-10
```

combined with:

```text
change classification:
breaking
non-breaking
editorial
```

---

# Define model-change classes

A useful versioning policy distinguishes several change classes.

## Editorial

Examples:

- spelling correction;
- formatting;
- clearer prose without changed meaning;
- additional example.

Expected treatment:

- no implementation impact;
- ordinary review;
- no new business-effective version.

## Metadata

Examples:

- owner contact updated;
- source reference corrected;
- tag added;
- classification updated.

Expected treatment depends on whether metadata controls governance.

## Additive

Examples:

- new Attribute;
- new Evidence object;
- new optional Relationship;
- new endpoint.

Potentially non-breaking, but impact still requires review.

## Restrictive

Examples:

- field becomes mandatory;
- allowed-value set narrows;
- lifecycle transition is prohibited;
- applicability expands.

Often operationally breaking.

## Semantic

Examples:

- definition changes;
- source equivalence is rejected;
- granularity changes;
- one concept is split;
- authority changes.

Requires explicit decision and impact analysis.

## Retirement

Examples:

- Attribute removed from active model;
- Mapping superseded;
- Rule no longer valid;
- endpoint decommissioned.

Requires dependant analysis and historical treatment.

These classes are more actionable than incrementing a number mechanically.

---

# Effective dates belong to decisions and applicability

A model baseline may be approved on 15 July.

A rule may become effective on 1 October.

A local exception may remain valid until 31 December.

Do not use the Git commit date as the business-effective date.

Model metadata may need:

```yaml
approved_on: 2026-07-15
effective_from: 2026-10-01
effective_to: null
```

A contextual override may add:

```yaml
scope:
  country: PT
effective_from: 2026-10-01
effective_to: 2026-12-31
```

These dates answer different questions:

- When was the decision authorised?
- When does the rule apply?
- When does the exception expire?

File modification time answers none of them reliably.

---

# Bitemporal questions appear quickly

Enterprise teams often need two timelines:

## Valid time

When the model rule applies to the business.

## Record time

When the repository learned or recorded that rule.

Example:

```text
Decision recorded:
15 November

Business-effective correction:
1 October
```

This may happen when an unrecorded production decision is formalised after the fact.

The repository should not pretend that the file existed on 1 October.

It should preserve both:

- recorded on 15 November;
- effective from 1 October.

This supports honest historical reconstruction.

A full bitemporal database is not required for the first MVP.

The conceptual distinction is still necessary.

---

# Global and local versions should use applicability, not copied files

A common versioning pattern creates:

```text
Global_Customer_Model_v5
Germany_Customer_Model_v3
Portugal_Customer_Model_v8
```

Soon, nobody can explain:

- which global version each country extends;
- which local changes remain valid;
- whether a later global version includes the local treatment;
- which file should be used for impact analysis.

A stronger representation keeps one global object and explicit contextual overrides.

```text
Global rule:
RULE-TAX-IDENTIFIER

Local override:
RULE-PT-TAX-IDENTIFIER
overrides RULE-TAX-IDENTIFIER
```

Each object has:

- stable identity;
- lifecycle;
- effective period;
- scope;
- decision.

Repository baselines then capture the complete combination.

This avoids maintaining independent copies of the same model.

---

# Migration waves are deployment contexts, not model identities

Wave 2 and Wave 3 may use different model states.

That does not mean every object requires a `wave_version` field.

Instead, a baseline manifest can identify:

```text
Wave 2 uses:
model-customer-wave2-approved

Wave 3 uses:
model-customer-wave3-approved
```

If one rule differs temporarily, record:

- baseline;
- contextual deviation;
- effective period;
- implementation reference.

Do not fork the entire model for one change unless the programme truly needs an independent long-lived line.

---

# Keep historical interpretation

When an object is retired, historical datasets may still contain its values.

Deleting every trace of the old object makes historical analysis harder.

A retired object can remain canonical history with:

```yaml
status: retired
effective_to: 2026-09-30
replaced_by:
  - ATTR-SUPPLIER-RISK
  - ATTR-SUPPLIER-REVIEW-STATUS
```

The current model should exclude it from ordinary active queries.

Historical searches and migration analysis should still be able to find it.

Versioning is not only about finding the newest state.

It is about interpreting older evidence correctly.

---

# Model diffs should compare baselines, not document names

A useful diff operation asks:

```text
Compare:
customer-wave2-approved
with:
customer-wave3-approved
```

The output should classify changes:

```text
Added:
ATTR-SUPPLIER-REVIEW-STATUS

Changed:
RULE-SUPPLIER-RISK-ACTIVATION
- warning
+ blocking at activation

Retired:
VALUE-SUPPLIER-RISK-UNDER-REVIEW

Unchanged but impacted:
MAP-ERP-B-RISK-TO-S4
```

Martenweave’s changelog records a repository diff command as an existing capability.

The valuable next step is semantic classification, not merely listing changed files.

---

# Version manifests can make baselines understandable

A tag identifies a commit.

A manifest explains the baseline.

Conceptually:

```yaml
id: BASELINE-CUSTOMER-WAVE-3
type: ModelBaseline
repository_commit: abc123
approved_on: 2026-08-14
effective_from: 2026-10-01
scope:
  domains:
    - DOMAIN-CUSTOMER
    - DOMAIN-BUSINESS-PARTNER
purpose: Wave 3 migration and production deployment
known_deviations:
  - DEV-ERP-B-CUSTOMER-GROUP
```

This is a product direction rather than a claim about the current Martenweave schema.

A manifest can connect:

- fixed repository state;
- approval;
- scope;
- purpose;
- effective period;
- known deviations;
- implementation releases.

It prevents the tag name from carrying every piece of context.

---

# Release is not approval

GitHub releases can package software and release notes around a tag, with each release based on a Git tag marking a point in repository history.

For model repositories, a release page may be useful for:

- distributing a handover baseline;
- attaching generated reports;
- publishing change notes;
- documenting known limitations.

But publishing a release does not create business authority automatically.

The baseline still needs:

- accountable approver;
- approval evidence;
- scope;
- effective context.

Tool publication and governance approval are different acts.

---

# Do not version generated outputs independently

Generated files may include:

- `modelops.db`;
- search JSONL;
- lineage JSONL;
- static viewer;
- readiness reports.

These outputs should identify the canonical baseline and tool version that produced them.

They do not need independent manual version histories.

Example:

```text
Generated from:
commit abc123

Martenweave:
0.5.0

Schema:
1.0

Built:
2026-07-14T15:00:00Z
```

If generated outputs receive their own unrelated versions, teams must reconcile:

```text
Model baseline 8
Database version 11
Viewer version 4
Report version 19
```

That is avoidable.

Regenerate them from the named canonical baseline.

The current Martenweave architecture treats SQLite and JSONL outputs as disposable and rebuildable.

---

# Do not commit every generated artefact as historical truth

Committing generated outputs can be useful when:

- a release package requires them;
- deterministic output is being tested;
- an offline consumer needs them.

It can also create noise:

- large diffs;
- merge conflicts;
- stale generated state;
- reviewers inspecting generated changes instead of canonical changes.

A practical policy is:

```text
Canonical files:
always versioned

Generated outputs:
recreated in CI or release packaging unless a specific consumer requires them
```

The baseline remains the canonical commit.

Generated outputs reference it.

---

# Change logs should explain semantic releases

A model changelog should not list every edited sentence.

It should communicate changes that matter to consumers.

Useful entries include:

- new governed concept;
- changed definition;
- changed applicability;
- added or retired values;
- changed source authority;
- changed ownership;
- breaking implementation consequence;
- accepted deviation;
- migration action required.

Example:

```markdown
## Customer model baseline — 2026-10

### Changed

- Customer Group is now explicitly sales-area-specific.
- Direct equivalence with CRM Segment is rejected.
- ERP_B requires governed enrichment before S/4HANA load.

### Migration impact

- Existing central mappings must be reviewed.
- Mock Load 3 datasets require Sales Area keys.
```

This is more useful than:

```text
Updated five model files.
```

---

# Keep release notes separate from permanent decisions

A release note summarises what changed in one baseline.

A Decision object preserves why a particular choice was made.

The release note may say:

> Supplier Review Status added.

The Decision should preserve:

- the incidents and evidence;
- rejected alternatives;
- approving authority;
- consequence for Supplier Risk.

Do not rely on release notes as the only historical rationale.

Release notes are navigational summaries.

Decisions are governed evidence.

---

# Avoid version numbers in filenames

Prefer:

```text
customer-group.md
supplier-risk-activation.md
customer-group-source-decision.md
```

over:

```text
customer-group-v7.md
supplier-risk-activation-final-v3.md
```

The repository history already preserves previous states.

Version suffixes create problems:

- references must change;
- old and new files coexist accidentally;
- search results duplicate concepts;
- users edit the wrong copy;
- IDs and filenames drift.

A new filename is appropriate for a genuinely new object, not a new revision of the same object.

---

# One object should have one canonical active file

Keeping several active revisions side by side is usually a mistake:

```text
customer-group-v1.md
customer-group-v2.md
customer-group-v3.md
```

Which one should references use?

A better pattern is:

```text
customer-group.md
```

with historical revisions available through Git.

When the old state must remain queryable as a retired concept, preserve it as an explicitly separate historical object only when semantic identity has changed.

Do not use copied files as a substitute for history.

---

# Merge conflicts are model signals

When two branches change the same object, Git reports a textual conflict.

The semantic conflict may be larger or smaller than the text suggests.

Example:

Branch A:

```yaml
required: true
```

Branch B:

```yaml
applicability:
  supplier_category:
    - STRATEGIC
```

These changes might be compatible:

> Required only for strategic suppliers.

Or they may reflect conflicting assumptions.

Conflict resolution should ask:

- Are the changes editorial or semantic?
- Do they affect the same context?
- Which Decision authorises each change?
- Does combining them create a valid Rule?
- Has impact been recalculated?

Do not resolve model conflicts merely by keeping both lines.

---

# Parallel branches need an explicit convergence strategy

SAP programmes often have:

- Wave 2 production support;
- Wave 3 build;
- global template evolution;
- local rollout branches.

Long-lived branches create risk when model changes must be copied manually.

A critical production correction may need to move into:

- current production baseline;
- future release branch;
- global template.

The repository should record whether a change was:

- merged forward;
- intentionally excluded;
- replaced by another decision.

Otherwise, the same model issue reappears in later waves.

Avoid long-lived branches when contextual applicability can represent the difference more clearly.

Use branches for genuine parallel delivery states, not every local variation.

---

# Reverting a commit does not always revert the business

Git can restore an earlier repository state.

The operational landscape may already have changed.

Suppose a Rule becomes mandatory and is deployed to SAP.

The model commit is then reverted.

That does not automatically:

- reverse SAP configuration;
- correct records created under the new rule;
- update interfaces;
- inform users;
- restore prior exceptions.

A model rollback needs an implementation and data plan.

The repository history provides the previous definition.

It does not execute operational reversal.

---

# Emergency changes need retroactive alignment

An AMS team may change production under urgent conditions before the canonical model is updated.

Pretending this never happens is unrealistic.

The process should record:

```text
Emergency implementation:
CHG-501

Observed production state:
Supplier Risk changed from error to warning

Canonical status:
Deviation pending review

Expiry:
2026-08-15
```

Then one of three outcomes should occur:

1. implementation is reverted;
2. canonical model is changed through approval;
3. bounded deviation is extended explicitly.

Do not silently edit history to make it appear that the canonical model always matched production.

Versioning should preserve the actual sequence.

---

# AI-generated changes need a baseline anchor

An agent should not propose a change against an unspecified “current model.”

A PatchProposal should identify:

- target object IDs;
- baseline commit or fingerprint;
- expected previous values;
- proposed values.

Conceptually:

```yaml
baseline_commit: abc123
operations:
  - object: RULE-SUPPLIER-RISK-ACTIVATION
    expected:
      severity: warning
    proposed:
      severity: error
```

If the repository changes before the proposal is applied, the system can detect that the proposal may be stale.

This is analogous to optimistic concurrency.

It prevents an agent from overwriting a newer human decision with a proposal based on older context.

---

# Proposed versions are not released versions

A branch or PatchProposal may describe a candidate model.

Do not present it as “Model version 12” before approval.

Use explicit labels:

```text
draft
candidate
pending review
approved baseline
effective baseline
retired baseline
```

This prevents stakeholders from treating a technically generated proposal as authorised design.

---

# Versioning policy should answer concrete questions

A useful policy should allow teams to answer:

- What is the current approved model?
- Which baseline did Mock Load 2 use?
- Which baseline is planned for Wave 3?
- Which schema version do these files use?
- Which changes are approved but not effective?
- Which local deviations remain active?
- Which SAP release implements the baseline?
- Why was this Attribute changed?
- Can we interpret a dataset created last year?
- Which generated index corresponds to this baseline?

If the policy answers only:

> The latest file is version 9,

it is insufficient.

---

# A minimum viable versioning policy

Martenweave does not need a complex configuration-management platform.

A practical first policy can use the following rules.

## Rule 1

Stable object IDs do not change for ordinary revisions.

## Rule 2

Git commits preserve all file history.

## Rule 3

The approved branch identifies current canonical working state.

## Rule 4

Annotated tags identify important fixed baselines.

## Rule 5

Schema version is separate from model baseline.

## Rule 6

Approval date and effective date are explicit where relevant.

## Rule 7

Retired and superseded objects remain historically traceable.

## Rule 8

Generated outputs identify their canonical commit and tool version.

## Rule 9

Semantic changes reference Decisions and impact evidence.

## Rule 10

Published tags and used baselines are never silently moved.

This is enough to eliminate most “final-final-v2” behaviour.

---

# A worked example: Customer Group

## Baseline A

Tag:

```text
customer-wave2-approved
```

Model:

```text
Customer Group is treated as centrally derived from CRM Segment.
```

## New evidence

Wave 2 shows that several customers require different Customer Groups by Sales Area.

## Decision

```text
DEC-CUSTOMER-GROUP-GRANULARITY-017

Customer Group is sales-area-specific.
Direct central equivalence is rejected.
```

## Candidate change

- update Attribute definition;
- change Entity from Customer to Customer Sales Area;
- retire direct Mapping;
- add enrichment requirement;
- update affected Rules.

## Baseline B

Tag:

```text
customer-wave3-approved
```

Effective date:

```text
2026-10-01
```

## Historical treatment

Wave 2 test results continue to reference Baseline A.

Wave 3 uses Baseline B.

The old baseline is not renamed or deleted.

---

# A worked example: Supplier Risk decomposition

## Old model

```text
Supplier Risk:
LOW
STANDARD
HIGH
UNDER_REVIEW
```

## Finding

`UNDER_REVIEW` is lifecycle state, not final classification.

## New model

```text
Supplier Risk:
LOW
STANDARD
HIGH

Supplier Review Status:
PENDING
CLEARED
REJECTED
```

## Versioning treatment

This is a semantic breaking change.

Required actions:

- new Attribute ID for Review Status;
- Customer—or Supplier—Risk object remains stable but loses an invalid value;
- old value is retired;
- historical Mapping is preserved;
- conversion proposal is linked;
- baseline changes;
- implementation release is recorded separately.

Incrementing a generic file version does not communicate this impact.

The semantic diff does.

---

# A worked example: schema-only migration

## Before

```yaml
schema_version: "0.9"
owner: Customer Data Team
```

## After

```yaml
schema_version: "1.0"
owners:
  semantic:
    - ROLE-CUSTOMER-DATA-OWNER
```

Assume the role resolves to the same authority.

Classification:

```text
Schema migration
No intended business-semantic change
```

The repository commit changes.

Generated indexes may change.

The business-effective model baseline may remain equivalent.

This distinction prevents unnecessary implementation work.

---

# Common anti-patterns

## Version in every filename

Creates duplicate canonical candidates.

## One global “model version” counter

Cannot explain domain, schema or effective context.

## Tags moved after approval

Historical evidence becomes unreliable.

## Branch name used as historical proof

Branches move.

## Commit date used as effective date

Recording time and business-valid time are confused.

## Software version used as model version

Product release and client model baseline become coupled.

## Schema migration treated as business change

Teams perform unnecessary impact work.

## Semantic change treated as editorial correction

Implementation impact is missed.

## Old objects deleted completely

Historical datasets become hard to interpret.

## Generated database versioned independently

Another reconciliation problem is created.

## Local copies labelled as country versions

Global/local inheritance disappears.

---

# What Martenweave should implement next

The current core already has several foundations:

- canonical Git-backed files;
- schema versioning and migration;
- repository diff;
- deterministic validation;
- generated indexes;
- proposal and ChangeRequest workflows;
- impact analysis.

A focused next increment could add a small explicit baseline capability.

## Baseline manifest

Record:

- baseline ID;
- commit;
- scope;
- approval;
- purpose;
- effective period;
- known deviations.

## Semantic change classes

Classify diff results as:

- editorial;
- additive;
- restrictive;
- semantic;
- retirement.

## Baseline comparison report

Show:

- added objects;
- changed definitions;
- changed relationships;
- changed Rules;
- retired objects;
- impacted dependants.

## Proposal baseline check

Reject or warn when a proposal was generated against an outdated baseline.

## Generated-artifact manifest

Record:

- canonical commit;
- schema version;
- Martenweave version;
- build time;
- validation result.

This is a small vertical slice.

It adds practical version governance without building a full configuration-management system.

---

# Versioning should remain boring

Good versioning should not demand constant meetings or manual numbering.

Most ordinary work should follow naturally:

```text
Edit canonical object
→ validate
→ review diff
→ merge
```

Only meaningful baselines require explicit publication:

```text
Validated repository
→ approval
→ annotated tag
→ baseline manifest
→ generated release artefacts
```

The system should automate:

- fingerprints;
- commit references;
- diff generation;
- generated-artifact metadata;
- schema migrations;
- stale-proposal detection.

Humans should decide:

- semantic identity;
- approval;
- effective date;
- breaking impact;
- retirement.

---

# Final perspective

Versioning a data model is not the task of placing a number beside every document.

It is the task of preserving several independent truths:

```text
What changed?
Git commit

Which complete state was approved?
Model baseline

Which object format is used?
Schema version

When does the rule apply?
Effective period

Where has it been implemented?
Implementation release

Why did it change?
Decision

What did it affect?
Impact analysis
```

Confusion begins when one label attempts to answer all seven questions.

Martenweave’s canonical-file architecture provides a strong foundation because:

- Git preserves exact repository history;
- stable IDs preserve object identity;
- schema versions preserve parseability;
- tags can preserve important baselines;
- Decisions preserve rationale;
- impact analysis preserves consequences;
- generated indexes remain tied to canonical state.

The practical test is:

> Can the team reconstruct exactly which model baseline was approved, which schema interpreted it, when it became effective, which SAP release implemented it and why it differed from the previous baseline?

When the answer is yes, the model is versioned.

When the answer is “open the latest spreadsheet and check the filename,” the team is still managing documents rather than governing model history.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It uses canonical files, deterministic validation, Git history, generated indexes, decisions and reviewable proposals to preserve model change without turning every revision into another manually maintained document version.

## Sources and notes

This article was reviewed on 14 July 2026.

Git’s official documentation describes tags as references used to mark important points in repository history, commonly including releases. It distinguishes lightweight tags from annotated tags, which can store the tagger, date, message and signature information.

Semantic Versioning defines software versions around incompatible API changes, backward-compatible functionality and backward-compatible fixes. Applying that convention to a business model requires an explicit definition of model compatibility rather than copying the numbering pattern mechanically.

GitHub’s official documentation describes releases as deployable iterations based on Git tags, with release notes and distributable assets. A release can package a model baseline, but organisational approval and business-effective dates remain separate governance facts.

Martenweave Core’s current changelog records schema-version migration, repository diffing, proposal impact analysis, approval gates and generated search/index capabilities as existing foundations.

The changelog also documents the decision not to move or reuse an existing `v0.4.0` tag, instead creating `v0.4.1` from the validated branch. This same immutability principle is appropriate for model baselines already used as programme or audit evidence.

Martenweave’s generated SQLite and JSONL artefacts are documented as disposable and rebuildable from canonical model files. They should therefore identify their originating baseline rather than develop independent authoritative version histories.

The conceptual baseline-manifest and metadata examples in this article describe a recommended product direction and should not be treated as guarantees of the exact current Martenweave schema.

Martenweave is independent and is not affiliated with or endorsed by GitHub, Git, SAP or Semantic Versioning.
