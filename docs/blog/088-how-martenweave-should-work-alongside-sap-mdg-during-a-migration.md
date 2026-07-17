# How Martenweave Should Work Alongside SAP MDG During a Migration

**Reviewed: 14 July 2026**

A programme is migrating Supplier bank data from several legacy systems into SAP S/4HANA.

SAP Master Data Governance is part of the target architecture.

The programme has already defined:

- governed Business Partner processes;
- bank-data validation;
- steward responsibilities;
- approval workflows;
- target distribution;
- audit requirements.

Yet the migration team still manages much of its working knowledge in:

- source extracts;
- field-mapping workbooks;
- duplicate-analysis files;
- mock-load reports;
- cutover trackers;
- tickets;
- meeting decisions;
- local transformation scripts.

The result is a common architectural misunderstanding.

Some stakeholders assume:

> SAP MDG is the governance platform, so all migration governance should happen there.

Others react in the opposite direction:

> The migration repository contains all the source knowledge, so it should become the master-data governance platform.

Both positions blur two different responsibilities.

SAP MDG should govern trusted operational master data and the processes used to maintain it.

Martenweave should govern the migration model that explains how fragmented source evidence becomes an approved candidate for that operational master data.

The systems should meet at a controlled handoff.

> Martenweave should prepare, explain and validate the migration path. SAP MDG should govern the resulting operational master-data state.

This is not a competitive positioning claim.

It is an operating model.

SAP currently describes SAP Master Data Governance as a governance layer for business data, with governed models, golden records, profiling, matching, consolidation, workflows, business rules, data-quality monitoring and auditable changes. SAP also positions it as useful for preparing master data for SAP S/4HANA and governing SAP and third-party data.

Martenweave’s current repository defines a different role: a backend-first model-governance and evidence layer that turns spreadsheets, datasets, tickets, validation reports, Decisions and SAP context into canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-approved proposals.

The product value appears in the space between source investigation and target governance.

---

# The pain exists before the first MDG approval

The Supplier bank-data migration includes three source systems.

The Finance system contains:

- IBAN;
- bank country;
- bank key;
- account number.

The Supplier portal contains:

- account-holder name;
- uploaded confirmation;
- a user-facing verification status.

A local purchasing application contains:

- another bank key;
- a more recent update timestamp;
- local Supplier references.

The target SAP model needs one coherent bank account connected to the correct Business Partner.

Before any target workflow can govern that record, the migration team must decide:

- which source owns each Attribute;
- how Supplier identities are matched;
- how conflicting bank records are compared;
- what the verification status means;
- whether a portal confirmation is acceptable evidence;
- when a fallback may be used;
- which records must remain payment-blocked;
- which exceptions can enter the migration wave.

These decisions are not merely preparatory technical details.

They define the candidate data presented to SAP MDG.

If the migration team selects the wrong source, SAP MDG may govern the wrong candidate record correctly.

If a default verification status is inserted during transformation, the target workflow may receive a record that appears complete but lacks defensible provenance.

Target governance cannot compensate automatically for invisible source-to-target assumptions.

---

# One Supplier record, several governance layers

Consider one migrated Supplier.

The final target record contains:

```
Supplier:
1000456

Bank country:
DE

IBAN:
DE...

Account holder:
Example Components GmbH

Verification status:
Verified
```

This simple record hides several layers.

## Source evidence

What did each legacy system contain?

```
Finance system:
IBAN and bank key

Supplier portal:
account holder and uploaded confirmation

Purchasing application:
different bank key and later timestamp
```

## Migration interpretation

How were the values selected?

```
IBAN:
Finance system is authoritative

Account holder:
Supplier portal is authoritative when present

Bank key:
Finance system is primary;
derive from IBAN only when absent

Verification:
Treasury review is required
```

## Candidate target record

What value set will be submitted to SAP?

## Operational governance

Who may approve, activate, maintain and later change the target record?

The first two layers belong to migration-model governance.

The last layer belongs to operational master-data governance.

The candidate target record connects them.

---

# The correct handoff is a governed data contract

Martenweave should not hand SAP MDG an unexplained file.

It should produce a governed migration contract for the target data.

For Supplier bank data, that contract should state:

- the business Attribute;
- the target Entity;
- the physical target endpoint;
- the authoritative source for each component;
- the source-selection logic;
- validation Rules;
- evidence requirements;
- exception policy;
- readiness status;
- unresolved Findings;
- applicable migration baseline.

Conceptually:

```
Business Attribute:
Supplier Bank Account

Target:
SAP Business Partner bank data

IBAN authority:
Legacy Finance System

Account-holder authority:
Supplier Portal

Verification authority:
Treasury Review Dataset

Fallback:
Derive bank key from IBAN where permitted

Payment rule:
Unverified bank accounts remain payment-blocked
```

SAP MDG can then govern the record according to its operational workflow.

Martenweave preserves why this record qualifies for submission.

---

# The handoff should not copy the whole migration repository

A migration repository may contain:

- raw profiles;
- rejected mappings;
- temporary files;
- mock-load diagnostics;
- local test artefacts;
- historical Findings;
- candidate proposals.

SAP MDG does not need all of this attached to every Business Partner.

The handoff should contain only the information required by the target process.

For example:

## Target values

The actual Supplier bank fields.

## Control status

Whether the candidate passed the migration Rules.

## Exception status

Whether the record requires payment block or manual review.

## Provenance reference

A stable Martenweave Evidence or Decision reference.

## Migration baseline

The exact approved model version used to create the record.

This keeps the operational workflow usable while preserving traceability.

---

# Martenweave should own the pre-MDG readiness decision

Before a record enters the MDG-controlled target process, Martenweave should be able to classify it.

Possible states include:

## Ready for target governance

The source path, Mapping, Rules and required Evidence are complete.

## Ready with target control

The record may enter SAP, but a specified control such as payment block must remain active.

## Requires enrichment

A required source or Evidence item is missing.

## Requires business decision

Source authority or exception treatment remains unresolved.

## Excluded from wave

The record cannot be migrated safely in the current scope.

For the Supplier example:

```
Record:
1000456

Migration status:
Ready with target control

Reason:
Bank values are valid,
but Treasury verification is incomplete

Required target control:
Payment block
```

The target workflow should not need to rediscover why the control is required.

---

# SAP MDG should own the operational approval

Once a record enters the target governance process, SAP MDG should remain authoritative for:

- the operational master-data change;
- workflow routing;
- steward approval;
- target validations;
- activation;
- target audit history;
- later maintenance;
- distribution to consuming systems.

SAP describes MDG as supporting workflows, validated values, business rules, data-quality monitoring, source unification and auditable data changes.

Martenweave should not add a competing operational approval that claims to activate the Business Partner independently.

A Martenweave approval means:

> The migration model and candidate path are accepted for this scope.

An SAP MDG approval means:

> The operational master-data change is accepted in the target governance process.

Those approvals are related but not identical.

---

# Two approvals may be necessary

For a sensitive field such as Supplier Bank Account, a robust programme may require two explicit decisions.

## Migration-model approval

Approves:

- source authority;
- Mapping logic;
- fallback;
- evidence requirements;
- affected population;
- migration readiness.

## Operational record approval

Approves:

- the actual target data;
- target workflow;
- steward review;
- activation;
- downstream distribution.

This prevents one approval from being overloaded.

A migration architect should not automatically approve a sensitive operational bank change.

A target steward should not need to reconstruct every source-system Mapping decision.

---

# The model approval can cover a population

Martenweave does not need to approve every Supplier record individually.

The model approval may cover a governed population.

For example:

```
Approved path:
Finance IBAN + Portal account holder + Treasury verification

Scope:
German payment-active Suppliers

Baseline:
WAVE-2-RC4

Fallback:
Bank-key derivation permitted

Exception:
Missing verification requires payment block
```

Individual records are then assessed against the approved path.

SAP MDG handles operational record-level governance where configured.

This division avoids turning Martenweave into a second high-volume workflow system.

---

# The candidate dataset must be traceable to the model baseline

Every generated migration dataset should identify:

- dataset fingerprint;
- extraction date;
- source scope;
- Martenweave model commit;
- Mapping version;
- Rule version;
- Evidence set;
- proposal or Decision references.

Without this, a target load may use values generated under an obsolete policy.

Suppose Treasury changes the verification requirement after Mock Load 3.

The earlier dataset may still be technically loadable.

It is no longer compliant with the current migration model.

Martenweave should detect:

```
Dataset baseline:
WAVE-2-RC3

Current approved model:
WAVE-2-RC4

Material change:
Treasury verification became mandatory

Verdict:
Dataset is stale for payment-active Suppliers
```

SAP MDG can validate the submitted record.

Martenweave should prevent an obsolete candidate dataset from being treated as current migration truth.

---

# Changes in MDG should feed back into Martenweave

The relationship is not one-way.

During target design or testing, the MDG team may change:

- required fields;
- validation Rules;
- workflow expectations;
- target endpoints;
- code lists;
- exception handling;
- target ownership.

These changes affect the migration model.

For example, the MDG design may introduce a requirement:

> Payment-active Suppliers must have bank verification before activation.

Martenweave should translate that into migration obligations:

- Treasury verification Dataset required;
- verification Mapping required;
- readiness Rule required;
- unverified population identified;
- target payment-block control linked;
- earlier Evidence invalidated.

The feedback loop is:

```
MDG target requirement
→ migration model obligation
→ source/dataset gap analysis
→ PatchProposal
→ approved canonical change
→ updated candidate data
```

Without this loop, target governance and migration transformation drift apart.

---

# The product should track target requirements as references

Martenweave should not duplicate every detail of MDG configuration.

It should register the parts relevant to the migration model.

For example:

```
Target Rule reference:
MDG-BP-BANK-VERIFY-01

Business meaning:
Payment-active Supplier requires verified bank account

Migration implication:
Treasury verification status must be present

Fallback:
Payment block

Owner:
Treasury Data Owner
```

This creates traceability without turning Martenweave into an SAP configuration repository.

---

# A change-request ID is evidence, not the whole model

Suppose the MDG team creates a change request that updates bank validation.

Martenweave can reference:

- the change-request identifier;
- status;
- effective release;
- approved Rule;
- relevant target fields.

But the migration model still needs to state:

- which source inputs satisfy the Rule;
- how existing source records are evaluated;
- which dataset must change;
- how many records are affected;
- which earlier mock loads are now stale.

The target change request establishes the operational requirement.

The migration model evaluates its source-to-target consequences.

---

# The gap appears when the target requirement cannot be satisfied

The new target Rule requires Treasury verification.

The source migration dataset contains:

```
SUPPLIER_ID
BANK_COUNTRY
IBAN
ACCOUNT_HOLDER
```

It does not contain:

```
BANK_VERIFICATION_STATUS
```

A simple schema report says:

> Column missing.

Martenweave should produce a model-aware Finding:

```
Finding:
No approved input supplies Bank Verification Status.

Affected Rule:
Payment-active Supplier requires verified bank account.

Affected population:
3,400 Suppliers

Target consequence:
Records cannot be activated for payment without control.

Available fallback:
Payment block

Required decision:
Add Treasury Review Dataset or exclude affected records.
```

This is the point where Martenweave contributes more than a loader, catalogue or target workflow.

It translates a target governance requirement into a source-side migration obligation.

---

# The proposal should be reviewed before transformation code changes

An AI agent may suggest:

```
Add Treasury Review Dataset.

Join by canonical Supplier ID.

Map approval status to Bank Verification Status.

Apply payment block where status is absent.
```

That is a reasonable PatchProposal.

It should be validated before the ETL code is changed.

Candidate-state validation should confirm:

- Treasury Dataset exists;
- Supplier identity keys are compatible;
- the Mapping is typed correctly;
- the Rule applies only to payment-active Suppliers;
- the payment-block fallback is represented;
- downstream target references remain valid;
- no unsupported assumption sets verification to true.

Impact analysis should show:

- affected datasets;
- affected Mappings;
- affected Rules;
- affected population;
- stale readiness Evidence;
- required reviewers.

Only after approval should an implementation issue or Git change be generated.

Martenweave’s documented pipeline already places Evidence, validation, gaps, impact and proposals before human-reviewed Git work.

---

# The implementation handoff should be precise

An approved model proposal can generate an implementation package.

## Goal

Add Treasury verification to the Supplier bank-data migration path.

## Scope

- import Treasury Review Dataset;
- join through canonical Supplier ID;
- map approved Treasury result;
- retain payment block when verification is absent;
- preserve SAP MDG target validations.

## Acceptance criteria

- every payment-active Supplier has verification Evidence or payment block;
- no record is defaulted to verified;
- dataset readiness is recalculated;
- target validation passes;
- Treasury and Supplier data owners approve the result.

## Validation

```
martenweave validate --repo ./model
martenweave run dataset-readiness \
  --repo ./model \
  --dataset ./data/supplier-bank-cutover.csv \
  --out ./reports/bank-readiness
```

The implementation system manages the work.

Martenweave preserves the expected semantic result.

SAP MDG governs the operational record.

---

# Cutover requires a reconciliation between both layers

Before cutover, the programme should reconcile:

## Martenweave view

- which records are ready;
- which source path produced them;
- which exceptions exist;
- which fallbacks are active;
- which Evidence supports the result.

## SAP MDG or target view

- which records were accepted;
- which validations passed;
- which records entered workflow;
- which controls were applied;
- which records were rejected.

The reconciliation should identify differences such as:

```
Martenweave ready:
49,100

Submitted to target:
49,100

Accepted:
48,940

Payment-blocked:
2,800

Rejected:
160
```

Each rejection should be connected back to:

- model Attribute;
- Mapping;
- Rule;
- source data;
- target validation.

This prevents target errors from becoming disconnected technical lists.

---

# A target rejection can reveal different problems

The MDG or target process rejects a Supplier bank record.

Possible causes include:

## Source-data defect

IBAN is invalid.

## Migration Mapping defect

Bank country was normalised incorrectly.

## Model gap

The migration model omitted a target Rule.

## Target-configuration change

The MDG validation changed after the model baseline.

## Identity defect

The bank account was attached to the wrong Supplier.

## Valid target rejection

The record correctly failed a sensitive control.

Martenweave should classify the rejection before proposing a model change.

The target rejection is Evidence.

It is not automatically proof that the canonical model is wrong.

---

# The approved model should not be rewritten to match every rejection

Suppose SAP rejects records without Treasury verification.

The migration team could weaken the model:

```
Verification optional.
```

That would make the data appear more ready.

It would contradict the target governance requirement.

The correct response may be:

- enrich the dataset;
- retain payment block;
- exclude the records;
- correct the source;
- preserve the Rule.

Martenweave should make it difficult to “solve” readiness by lowering the model standard.

---

# Hypercare should preserve the link

After go-live, a Supplier payment incident occurs.

SAP contains the bank account.

The AMS team can inspect the operational record and MDG history.

Martenweave should answer:

- which migration baseline created the account;
- which sources supplied the values;
- whether Treasury verification existed;
- whether payment block was expected;
- whether a fallback was used;
- which Finding or exception applied;
- which Decision authorised the path.

This reduces investigation from archaeology to trace.

The model registry remains useful because it preserves the context that existed before the record entered the target governance process.

---

# The boundary prevents duplicate workflows

A common product mistake would be to add:

- record-by-record bank approval;
- steward inboxes;
- SAP activation;
- distribution;
- operational maintenance.

That duplicates MDG.

Another mistake would be to push all migration-model Decisions into MDG change requests.

That overloads operational workflows with:

- source-field debates;
- mock-load Evidence;
- rejected transformation alternatives;
- temporary migration fallbacks;
- dataset profiles.

The clean boundary is:

```
Martenweave:
approve the model path

SAP MDG:
approve and govern the operational record
```

---

# Martenweave should not depend on MDG

Not every programme uses SAP MDG.

Some use:

- S/4HANA maintenance processes;
- another MDM platform;
- custom governance;
- staged migration approvals;
- manual stewardship.

Martenweave should model the target governance layer generically.

For example:

```
target_governance:
  system: SAP MDG
  process_reference: BP-BANK-CHANGE
  required_control: TREASURY_VERIFICATION
```

Another project can use a different target system without redesigning the core model.

SAP migration and MDM are the first domain pack, not the architectural boundary of Martenweave.

---

# Martenweave should remain useful without deep integration

The first product version does not need to:

- call every MDG API;
- reproduce change-request screens;
- synchronise every workflow event;
- read the full SAP configuration model;
- write target records.

A useful first integration can rely on:

- exported target requirements;
- stable external references;
- validation-result imports;
- load-result evidence;
- change-request IDs;
- manually confirmed status.

The core value comes from the canonical model and traceability, not integration volume.

---

# A practical operating model

The joint process can be organised into six stages.

## 1. Target requirement capture

SAP MDG owners define:

- target fields;
- validations;
- governance process;
- target roles;
- activation conditions.

Martenweave records the migration-relevant references.

## 2. Source-model design

Martenweave defines:

- source authority;
- Attribute meaning;
- Mappings;
- Rules;
- fallbacks;
- Evidence requirements.

## 3. Dataset readiness

Martenweave profiles the candidate dataset and detects gaps against the approved model.

## 4. Candidate preparation

Transformation tooling generates the target candidate data using the approved model baseline.

## 5. Target governance

SAP MDG validates and governs the operational record.

## 6. Reconciliation and learning

Target results return as Evidence.

Findings may create new PatchProposals.

The approved model evolves through review.

---

# Who owns what

A practical responsibility model for the Supplier bank-data case is:

## Migration data lead

Owns:

- dataset readiness;
- transformation implementation;
- load scope;
- reconciliation.

## Treasury data owner

Owns:

- bank verification meaning;
- authority;
- acceptable fallback;
- risk acceptance.

## SAP MDG owner

Owns:

- target governance process;
- target Rules;
- workflow;
- activation.

## Martenweave model owner

Owns:

- canonical model consistency;
- Evidence links;
- Mapping and Rule representation;
- proposal workflow.

## AMS owner

Owns:

- post-go-live incident handling;
- operational correction;
- feedback into Findings.

This avoids the vague statement:

> Data Governance owns it.

---

# The product should expose the handoff explicitly

Martenweave Workbench should show a target-handoff view.

For one migration Attribute, it should display:

## Migration model

- source authority;
- Mapping;
- fallback;
- Evidence;
- readiness.

## Target governance

- target system;
- endpoint;
- target Rule reference;
- required control;
- external workflow reference.

## Current population

- ready;
- controlled exception;
- blocked;
- excluded.

## Open Findings

- missing verification;
- identity conflict;
- invalid value.

## Proposed changes

- candidate model updates;
- validation;
- impact;
- approval status.

Martenweave Workbench is currently described as a local browser UI for assessment, investigation, reports and controlled changes, while canonical truth remains in the model files.

A handoff view would strengthen that role without duplicating the MDG UI.

---

# What not to build

Martenweave should not build:

- a parallel Business Partner maintenance UI;
- operational MDG workflows;
- target activation;
- direct SAP write-back;
- a universal integration bus;
- an enterprise workflow engine;
- an MDG replacement data model.

Those additions would increase complexity while weakening the product thesis.

Martenweave should instead improve:

- source-to-target canonical modelling;
- Evidence ingestion;
- dataset readiness;
- lineage;
- impact;
- PatchProposals;
- target-governance references;
- reconciliation.

---

# The smallest useful product slice

A strong pilot can use one Supplier bank-data flow.

## Input

- Finance bank extract;
- Supplier portal extract;
- Treasury verification file;
- SAP target-field definition;
- target validation result.

## Canonical model

- Supplier Bank Account Attribute;
- source authority;
- field-level Mapping;
- verification Rule;
- target endpoint;
- payment-block fallback.

## Workflow

1. profile the datasets;
2. identify missing verification;
3. calculate affected payment-active Suppliers;
4. generate a PatchProposal;
5. validate the candidate model;
6. approve the migration path;
7. generate the target candidate;
8. import the target result;
9. reconcile rejected records;
10. preserve Evidence.

## Demonstrated value

The programme can explain:

- why each bank value was selected;
- which records are unsafe;
- which control SAP must apply;
- who approved the model;
- which target results differ from expectation.

This is a credible product demonstration.

---

# Current and proposed capability

Martenweave currently provides the relevant foundation:

- canonical files;
- deterministic validation;
- dataset-gap detection;
- lineage;
- impact;
- dataset readiness;
- proposals;
- Git-based review;
- local Workbench.

The next product improvements should include:

- target-governance reference objects;
- external Rule references;
- handoff manifests;
- candidate-dataset baseline metadata;
- target-result Evidence import;
- migration-versus-target reconciliation;
- Workbench handoff view.

These should remain generic enough to support SAP MDG and other governance targets.

---

# Recommended handoff manifest

A simple generated manifest might contain:

```
migration_baseline:
  WAVE-2-RC4

entity:
  Supplier

attribute:
  Supplier Bank Account

target_system:
  SAP MDG

target_process:
  Business Partner bank-data governance

model_commit:
  abc123

input_datasets:
  - FINANCE-BANK-2026-07
  - PORTAL-BANK-2026-07
  - TREASURY-VERIFY-2026-07

rules:
  - IBAN country validation
  - Treasury verification required
  - payment block when verification absent

population:
  ready: 46140
  controlled_exception: 2800
  blocked: 160
```

This is a proposed product direction, not a current guaranteed schema.

The manifest creates a clear handoff without moving canonical truth into the target workflow.

---

# The economic value of cooperation

The value is not merely architectural neatness.

The joint model reduces:

- repeated source-analysis workshops;
- ambiguous mappings;
- late target rejections;
- undocumented defaults;
- manual reconciliation;
- duplicated approval effort;
- hypercare investigation time;
- dependence on individual consultants.

SAP MDG reduces operational master-data risk.

Martenweave should reduce migration-model ambiguity and the cost of reconstructing decisions.

Together, they address different parts of the same data transformation.

---

# Final perspective

Martenweave and SAP MDG should not compete for ownership of the same layer.

Their responsibilities should connect in sequence.

```
Source evidence
→ Martenweave migration model
→ validated candidate dataset
→ SAP MDG target governance
→ target result
→ Martenweave reconciliation evidence
```

For Supplier bank data, Martenweave should answer:

- which source owns each value;
- which Mapping produced the candidate;
- which evidence supports verification;
- which fallback is allowed;
- which population is ready;
- which target control is required.

SAP MDG should answer:

- whether the operational change is accepted;
- which steward approved it;
- which target validations passed;
- when it became active;
- how later changes are governed.

The practical test is:

> Can the programme trace one migrated Supplier bank account from source evidence through an approved migration model into the SAP MDG-governed target record, without asking one system to perform the other system’s job?

When the answer is yes, the architecture is coherent.

When the answer is:

> MDG is present, so the mapping spreadsheet does not need governance,

the programme has protected the target workflow while leaving the path into it fragmented.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It is designed to work alongside SAP MDG:

```
Martenweave governs the migration model.

SAP MDG governs operational master data.

Validators verify.

Humans approve.

Git records.
```

The value comes from the handoff and feedback loop—not from attempting to replace the target governance platform.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer for business-critical master data. Its documented capabilities include governed models, golden records, profiling, matching, consolidation, workflow routing, validated values, business rules, data-quality monitoring, mass changes and auditable data changes.

SAP also recommends curating master data before an SAP S/4HANA move and states that SAP MDG can consolidate and actively govern master data for SAP and third-party applications.

Martenweave Core currently defines canonical Markdown and YAML files as the source of truth, generated indexes as disposable and AI-generated changes as reviewable PatchProposals rather than silent mutations.

Its documented pipeline moves from Evidence and profiling through validation, dataset/model gaps, lineage and impact analysis to proposals and human-reviewed GitHub issues or pull requests.

Martenweave explicitly positions itself as a backend-first model-governance pipeline rather than a hosted MDM platform, generic workflow engine or direct SAP write-back mechanism.

The target-governance references, handoff manifest, reconciliation flow and Workbench handoff view described here are recommended product directions. They should not be interpreted as guarantees of a current deep SAP MDG integration, target workflow connector or direct SAP execution capability.

Martenweave is independent and is not affiliated with or endorsed by SAP.
