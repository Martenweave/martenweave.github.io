# Why SAP MDG Is Not a Replacement for a Migration Model Registry

**Reviewed: 14 July 2026**

A programme is migrating Supplier bank data into SAP S/4HANA.

The target organisation uses SAP Master Data Governance to control Business Partner changes.

The MDG design is solid:

- bank data is maintained through governed change requests;
- validations check required values;
- stewards review sensitive changes;
- workflow routes approvals;
- accepted records become part of the governed operational master data;
- changes remain auditable.

The migration team still faces a problem.

Three legacy systems contain different versions of the same Supplier bank account.

One source contains the IBAN.

Another contains the account holder.

A local purchasing system contains a newer bank key.

The migration extract includes a “verified” flag, but nobody can establish whether it means:

- technically validated;
- reviewed by Accounts Payable;
- confirmed with the Supplier;
- merely present in the source system.

A mock load successfully creates the bank data in SAP.

The record passes the technical target validation.

The programme still cannot answer:

> Why do we believe this is the correct bank account for this Supplier, from which source was each value selected, which fallback was used, and what evidence supports payment activation?

SAP MDG can govern the target master-data record.

It does not automatically reconstruct the migration reasoning that produced that record.

That reasoning lives across:

- source extracts;
- mapping workbooks;
- cleansing rules;
- migration code;
- validation reports;
- cutover decisions;
- issue trackers;
- emails;
- temporary exceptions.

This is the product gap a migration model registry should address.

> SAP MDG governs operational master data. A migration model registry governs the evidence, transformations and decisions used to produce that master data during change.

The two systems should complement each other.

Treating one as a replacement for the other creates an incomplete architecture.

SAP currently presents Master Data Governance as a central hub for master-data management and governance, supporting governed models, golden records, matching and consolidation, change-request workflows, business rules, data-quality monitoring, mass changes and auditable data changes.

Martenweave addresses a narrower layer. Its repository describes a backend-first model-governance and evidence pipeline that converts spreadsheets, datasets, tickets, validation reports, decisions and SAP context into canonical model files, deterministic validation, gap reports, lineage, impact analysis and human-approved proposals.

The distinction begins with what each system treats as truth.

---

# The operational record is not the migration explanation

After migration, SAP may contain a valid Supplier bank account:

```
Supplier:
1000456

Bank country:
DE

IBAN:
DE...

Account holder:
Example Components GmbH

Status:
Active
```

SAP MDG can govern future changes to that record.

It can route a change request when the bank account is replaced.

It can validate the submitted data.

It can require approval.

It can preserve an audit trail of the governed change.

But the migration programme also needs to know:

```
IBAN source:
Legacy Finance System

Account-holder source:
Supplier Portal

Bank-key source:
Local Purchasing System

Selection logic:
Prefer verified Finance value;
use Supplier Portal only when Finance value is absent.

Observed conflict:
Local Purchasing System contains a newer bank key.

Migration fallback:
Bank key derived from IBAN where direct value is absent.

Approval:
Treasury Decision TR-017

Evidence:
Mock Load 3 and reconciliation report
```

That is not merely another version of the target record.

It is the model of how the target record was produced.

It explains:

- source authority;
- field-level lineage;
- precedence;
- fallback;
- transformation;
- conflict resolution;
- evidence;
- approval;
- migration scope.

This information may be relevant only during migration and hypercare.

It may also remain useful years later when an AMS team investigates a payment incident.

The operational master record answers:

> What is the currently governed bank account?

The migration model answers:

> Why did this value become the governed bank account, and which assumptions were used to create it?

Both questions matter.

---

# SAP MDG solves a real and substantial problem

The argument for a migration model registry should not depend on understating SAP MDG.

SAP MDG is designed to improve the quality and governance of business-critical master data. SAP’s current product description highlights governed models, golden records, source unification, profiling, matching, merging, semantic reconciliation, collaborative workflows, validated values, data-quality rules and audit trails.

For Supplier bank data, MDG can be the correct place to govern:

- who may request a bank change;
- which fields are required;
- which roles approve the change;
- which validation logic applies;
- how the accepted record is activated;
- how changes are distributed;
- how later modifications are audited.

A migration model registry should not attempt to rebuild those capabilities as a parallel MDM product.

Martenweave should not become:

- a second Business Partner maintenance application;
- a second change-request workflow;
- a substitute for SAP validation;
- a direct SAP write-back service;
- a second golden-record hub.

Its own repository explicitly defines it as a backend-first model-governance pipeline rather than a hosted MDM platform, generic workflow engine or direct SAP write-back mechanism.

The useful question is not:

> Which product should own everything?

The useful question is:

> Which system should own each kind of truth?

---

# Four different kinds of truth

The Supplier bank-data case contains at least four distinct truths.

## Source truth

What did each legacy system contain at a particular time?

This includes:

- raw values;
- timestamps;
- source ownership;
- extraction scope;
- source limitations;
- source conflicts.

## Migration-model truth

How should source values become the target business concept?

This includes:

- Attribute definitions;
- source authority;
- Mapping rules;
- fallback;
- context;
- target endpoint;
- evidence;
- Decisions.

## Operational master-data truth

What is the accepted Supplier bank account in the target landscape?

This is where SAP MDG is strongest.

## Delivery truth

What work remains, who owns it and when must it be completed?

This normally belongs in GitHub, Jira, ServiceNow or another delivery system.

Weak migration architectures force one system to represent all four.

A stronger architecture links them while preserving their boundaries.

---

# The migration question begins before the MDG change request

Suppose the migration team prepares a file containing 50,000 Supplier bank accounts.

Before those records reach the governed SAP process, the programme must already decide:

- which source systems are included;
- how Supplier identities are matched;
- which bank records are in scope;
- which duplicate accounts are allowed;
- how conflicting IBANs are resolved;
- whether account-holder text is authoritative;
- which country-specific validations apply;
- what “verified” means;
- when a fallback can be used;
- which records must remain blocked.

These are not minor technical preparations.

They determine what data will be submitted to the target governance process.

If the migration logic is wrong, an efficient MDG workflow can govern the wrong candidate data very consistently.

Governance at the target does not remove the need to govern how the candidate target state was constructed.

---

# A valid target value can still have weak provenance

The mock load creates a syntactically valid IBAN.

The SAP validation passes.

The bank record is associated with the correct Business Partner.

The result may still be unsafe.

For example:

```
Observed:
IBAN is technically valid.

Unknown:
Whether this account belongs to the Supplier legal entity.

Observed:
The value came from a current extract.

Unknown:
Whether the source system is authoritative.

Observed:
The target record was created successfully.

Unknown:
Whether an unapproved fallback supplied the bank key.
```

Target validation proves that the record satisfies encoded target requirements.

It does not prove every migration assumption.

A model registry must preserve the difference between:

- structurally valid;
- semantically supported;
- operationally approved;
- evidenced for the current migration baseline.

---

# Why migration evidence does not fit naturally inside one master record

Migration evidence is often broader than the object being governed.

For the Supplier bank account, evidence may include:

- a source profile covering 50,000 records;
- a reconciliation report between two systems;
- a duplicate-bank analysis;
- a mock-load execution;
- a Treasury decision;
- a list of accepted exceptions;
- a failed interface result;
- a cutover snapshot fingerprint.

Some evidence supports one record.

Some supports an entire source population.

Some supports a Mapping.

Some supports a fallback policy.

Some disproves a candidate source.

Trying to attach all of this directly to the operational Business Partner record creates the wrong structure.

The evidence belongs to the migration model and its claims.

For example:

```
Claim:
Finance System is authoritative for IBAN.

Evidence:
Reconciliation report REC-BANK-2026-04.

Claim:
Supplier Portal may supply account holder when Finance is blank.

Evidence:
Treasury Decision TR-017.

Claim:
Derived bank key is permitted for German IBANs.

Evidence:
Approved Rule BANK-DERIVE-DE-01.
```

This structure makes evidence reusable across the migration population.

---

# The registry must preserve rejected interpretations

During the bank-data workshop, the team considers using the most recently changed source value.

The proposal appears objective:

```
Choose the bank record with the latest timestamp.
```

The team rejects it.

Why?

Because source timestamps have different meanings:

- one records the last user edit;
- one records nightly replication;
- one records file generation;
- one is frequently overwritten by batch processing.

The selected rule becomes:

```
Use the Finance System as the primary IBAN authority.

Use Supplier Portal only when Finance has no current value.

Do not use the Purchasing System timestamp
to override the Finance value.
```

The rejection matters.

Without it, another team or AI agent may rediscover the “latest timestamp” idea and treat it as an improvement.

SAP MDG can govern the accepted operational change.

The migration registry should preserve why a plausible source-selection rule was rejected.

That is project knowledge with direct operational value.

---

# Change requests do not replace source-to-target lineage

An SAP MDG change request can show:

- which Business Partner is changing;
- which fields are proposed;
- who requested the change;
- workflow status;
- approvers;
- before and after values.

The migration model needs another lineage:

```
Legacy Supplier
→ source bank record
→ Supplier identity resolution
→ bank normalization
→ conflict rule
→ canonical Bank Account Attribute
→ SAP Business Partner bank endpoint
→ payment-readiness control
```

This lineage crosses:

- non-SAP systems;
- migration files;
- project-specific transformations;
- external evidence;
- SAP target structures;
- operational processes.

It exists before and outside the MDG workflow.

A migration model registry gives this lineage stable object identities so that it can be validated, searched, diffed and reviewed.

---

# The model must separate Attribute from implementation

The business concept is:

```
Supplier Bank Account
```

The current target implementation may be an SAP Business Partner bank-data structure.

A future architecture may:

- change the target API;
- introduce a standard field replacing a custom field;
- add a fraud-screening service;
- distribute the data to another platform;
- move part of the validation upstream.

The business Attribute should remain stable even when physical implementations change.

Martenweave’s generic object scope includes Domains, Entities, Attributes, Relationships, Datasets, Mappings, Rules, Evidence, Decisions and change proposals.

This separation allows the model to state:

```
Business Attribute:
Supplier Bank Account

Current target:
SAP Business Partner bank data

Migration source:
Legacy Finance System

Control:
Payment activation requires verified ownership evidence
```

MDG governs the target master data.

Martenweave preserves the cross-system model around it.

---

# The pain becomes visible when the migration design changes

Assume Treasury changes the rule two weeks before cutover.

Previous rule:

```
Finance System is authoritative for all bank data.
```

New rule:

```
Finance System remains authoritative for IBAN.

Supplier Portal becomes authoritative for account holder.

Bank verification status must come from Treasury review.
```

This is not one field correction.

It changes:

- source authority by Attribute;
- the Mapping;
- dataset requirements;
- validation;
- affected records;
- evidence;
- readiness;
- downstream assumptions.

The migration programme needs to calculate:

- which source files require new columns;
- which records lack Treasury status;
- which mock-load results are now stale;
- which Mappings change;
- which records can no longer be activated for payment;
- which interfaces or reports consume the old status.

This is precisely the type of change that a canonical migration model can evaluate.

A master-data workflow can govern the resulting bank records.

It does not automatically provide a Git-diffable candidate version of the external source-to-target model.

---

# A migration model registry is a design-time and evidence layer

The boundary can be expressed clearly.

## SAP MDG

Primary concern:

```
How should governed master data be created,
reviewed, validated, consolidated and maintained?
```

## Martenweave

Primary concern:

```
How do source evidence, migration Mappings,
Rules, Decisions and target endpoints combine
into an approved model path?
```

The relationship is:

```
Martenweave explains and validates
the migration path into governed target data.

SAP MDG governs the operational master data
and its ongoing change process.
```

This is complementary architecture.

---

# Why Git-based canonical files add value

Martenweave keeps canonical model truth in Markdown and YAML files and treats generated SQLite and JSONL indexes as rebuildable outputs. It performs deterministic validation before indexing.

For the Supplier bank-data model, this means the programme can:

- review source-authority changes through Git;
- compare migration releases;
- identify exactly when a fallback was added;
- preserve Decision references;
- validate object references;
- rebuild search and lineage views;
- package the model with project delivery;
- use the model from scripts, CI and agents;
- avoid making a hosted UI the only copy of project reasoning.

Git does not replace MDG.

It gives the migration model a durable review and versioning mechanism.

---

# What the model file might express

A simplified canonical object could state:

```
id: ATTR-SUPPLIER-BANK-ACCOUNT
type: Attribute
entity: ENT-SUPPLIER

definition:
  Bank account approved for Supplier payment.

source_policy:
  iban:
    primary: FEP-FINANCE-IBAN
    fallback: FEP-SUPPLIER-PORTAL-IBAN

  account_holder:
    primary: FEP-SUPPLIER-PORTAL-HOLDER

controls:
  - RULE-BANK-OWNERSHIP-VERIFIED
  - RULE-IBAN-COUNTRY-VALID

target:
  - FEP-S4-BP-BANK-DATA
```

The point is not the exact YAML syntax.

The point is that the source policy, business meaning, controls and target path become:

- explicit;
- typed;
- versioned;
- reviewable;
- machine-validatable.

SAP MDG can then remain the operational governance layer for the target data.

---

# When a migration finding should change the model

The dataset-readiness workflow discovers:

```
BANK_VERIFICATION_STATUS missing
for 3,400 payment-active Suppliers.
```

This finding can mean several things.

## Dataset defect

The authoritative status exists but was omitted from the extract.

## Mapping defect

The status is present under another field but not connected to the canonical Attribute.

## Model gap

The canonical model never represented bank verification as a required control.

## Scope mismatch

The status applies only to payment-active Suppliers, but the dataset includes inactive Suppliers.

## Evidence gap

The verification happened outside the source system and is documented elsewhere.

The first response should not be:

> Add a default status.

The programme must classify the problem.

Martenweave’s proposal-first approach is useful here:

```
Evidence
→ Finding
→ candidate PatchProposal
→ validation
→ impact
→ human review
```

Its documented pipeline explicitly places profiling, validation, gap detection, lineage and impact analysis before AI-generated proposals and human-reviewed Git work.

---

# A concrete proposal

Suppose the investigation confirms that Treasury maintains the verification status in a separate review file.

The proposal becomes:

```
Add Treasury Review Dataset.

Register BANK_VERIFICATION_STATUS as an Evidence-backed input.

Require verified status for payment-active Suppliers.

Allow unverified Suppliers to migrate only with payment block.

Do not default verification to true.
```

The candidate model can now be tested.

Validation checks:

- the Dataset object exists;
- the field is defined;
- Supplier keys are available;
- the Rule references valid objects;
- payment-active applicability is explicit;
- the target path remains coherent.

Impact analysis checks:

- affected Supplier population;
- bank Mapping;
- payment activation Rule;
- readiness evidence;
- cutover controls.

Human reviewers decide:

- whether Treasury is authoritative;
- whether payment block is an acceptable fallback;
- which records are in scope;
- whether the control is sufficient.

After approval, Git records the migration-model change.

SAP MDG or SAP operational controls govern the resulting Supplier data and future changes.

---

# Why direct SAP write-back would weaken the product

It may seem attractive for Martenweave to apply approved changes directly to SAP.

That would blur the boundary.

The registry would begin to require:

- SAP transaction handling;
- authorisation management;
- rollback;
- target-specific workflow;
- operational locking;
- change-document responsibility;
- production support.

Those functions already belong to SAP and its governance processes.

Martenweave’s repository explicitly says that it is not a direct SAP write-back mechanism.

The stronger product remains:

```
Martenweave:
propose and validate model change

SAP MDG:
govern operational data change
```

This keeps each system accountable for the layer it understands best.

---

# Why MDG availability does not remove the need for migration governance

A programme may already have SAP MDG and still use hundreds of spreadsheets for migration design.

That is not necessarily a failure of MDG.

It reflects a different scope.

Migration work contains temporary but important knowledge:

- legacy fields;
- historical systems;
- wave-specific scope;
- cutover defaults;
- data ownership disputes;
- mapping alternatives;
- mock-load findings;
- temporary reconciliation;
- rejected source paths;
- decommissioned endpoints.

Much of this should not become permanent operational master data.

It still must be governed while the transformation is taking place.

A migration model registry creates a controlled home for it.

---

# Why the registry remains useful after go-live

After go-live, the migration model can support AMS.

A payment incident occurs.

The Supplier bank account exists.

The support team needs to know:

- which source supplied the value;
- which Mapping created it;
- whether a fallback was used;
- which verification evidence existed;
- whether the bank account belonged to an exception population;
- which Decision approved the path.

SAP MDG provides operational change history.

Martenweave provides migration provenance and design lineage.

The two views together shorten root-cause analysis.

The registry does not need to remain an active migration platform forever.

It can become a durable evidence and model history layer.

---

# Product boundaries

The architecture is strongest when responsibilities remain explicit.

## SAP MDG should own

- operational master-data governance;
- change requests;
- steward workflows;
- target validations;
- matching and consolidation where configured;
- target audit trail;
- ongoing master-data maintenance.

## Martenweave should own

- canonical migration-model objects;
- source-to-target Mappings;
- source authority;
- dataset expectations;
- transformation Rules;
- field-level and business lineage;
- migration Evidence;
- Decisions;
- Findings;
- PatchProposals;
- candidate impact analysis.

## GitHub or ITSM should own

- implementation work;
- issue assignment;
- pull-request review;
- delivery status.

## SAP migration tooling should own

- extraction and load execution;
- target-specific technical processing;
- operational error handling.

This division avoids building another oversized enterprise platform.

---

# How integration should work

Martenweave does not need deep bidirectional integration on day one.

The first useful integration can be reference-based.

For example:

```
Target system:
SAP MDG

Target domain:
Business Partner

Target endpoint:
Business Partner bank data

Operational rule reference:
MDG bank validation configuration

Migration model:
ATTR-SUPPLIER-BANK-ACCOUNT

Evidence:
EVID-BANK-MOCK-LOAD-3
```

The model can link to:

- SAP domain documentation;
- change-request identifiers;
- configuration references;
- validation results;
- external issue IDs.

The registry owns the relationship.

It does not need to copy the entire SAP configuration.

---

# What current Martenweave already supports

The current repository states that Martenweave provides:

- canonical model files;
- deterministic validation;
- disposable generated indexes;
- dataset gap reports;
- lineage;
- impact analysis;
- human-approved AI PatchProposals;
- a local Workbench for assessment, investigation and controlled changes.

The CLI currently documents operations for:

- validation;
- index building;
- health and scorecards;
- impact;
- trace;
- search;
- query;
- repository diff;
- proposal generation;
- dataset readiness.

That is already enough to support an initial MDG-adjacent pilot without pretending to replace MDG.

---

# What Martenweave should implement next

The next focused product slice should demonstrate cooperation with SAP MDG around one Supplier bank-data flow.

## Goal

Show how migration evidence becomes a validated model proposal and then a target governance requirement.

## Scope

1. Register the Supplier Bank Account Attribute.
2. Register source bank fields from two legacy systems.
3. Register the SAP Business Partner bank-data endpoint.
4. Define authority and fallback by field.
5. profile one migration dataset.
6. detect missing verification evidence.
7. generate a Finding.
8. create a PatchProposal adding Treasury verification.
9. calculate the affected payment-active population.
10. produce a review package for Treasury and the Supplier data owner.
11. generate implementation acceptance criteria.
12. reference the SAP MDG control or change process that will enforce the accepted target behaviour.

## Acceptance criteria

The demonstration must distinguish:

```
Bank account technically loaded
```

from:

```
Bank account approved for payment use
```

It must show:

- source authority;
- field-level lineage;
- fallback;
- evidence;
- affected population;
- target MDG reference;
- human decision.

It must not write directly to SAP.

---

# The implementation issue generated by the model

Once the proposal is approved, Martenweave can create a precise implementation issue:

```
Goal

Add Treasury verification status to the Supplier bank-data migration path.

Scope

- Import Treasury review dataset.
- Join by canonical Supplier ID.
- Require verified status for payment-active Suppliers.
- Apply payment block where verification is incomplete.
- Preserve existing SAP MDG bank validations.

Acceptance criteria

- Every payment-active Supplier has verification evidence.
- Unverified records remain payment-blocked.
- Dataset-readiness report contains no unresolved critical verification gap.
- Candidate model validates.
- Treasury owner approves the result.

Validation command

martenweave validate --repo ./model
```

This is actionable.

The issue tracker manages delivery.

Martenweave preserves what the implementation is expected to mean.

---

# The product message

The message should not be:

> Martenweave does what SAP MDG cannot.

That creates the wrong competitive framing.

The more accurate message is:

> SAP MDG governs trusted operational master data. Martenweave governs the migration model and evidence used to produce and change that data.

A programme may need:

- neither;
- one;
- both.

Martenweave becomes useful where the programme has fragmented source knowledge, repeated Mapping decisions, dataset gaps and weak traceability between migration evidence and approved target design.

---

# The economic pain

The cost of the missing model layer appears in familiar forms:

- repeated workshops;
- conflicting mapping workbooks;
- duplicated validation logic;
- unclear source ownership;
- defaults that nobody can justify;
- late discovery of downstream impact;
- gaps reopened in every mock load;
- support incidents that require archaeology;
- dependency on a few senior consultants.

SAP MDG can reduce the cost of poor operational master-data governance.

Martenweave should reduce the cost of repeatedly reconstructing migration reasoning.

That is a distinct business case.

---

# The strategic boundary

Martenweave becomes weaker when it tries to become:

- a second SAP MDG;
- a general MDM hub;
- a generic workflow engine;
- a direct SAP maintenance tool;
- a large hosted data-governance suite.

It becomes stronger when it remains:

- local-first;
- backend-first;
- canonical;
- deterministic;
- evidence-aware;
- proposal-first;
- Git-native;
- easy to integrate.

Its repository states the principle clearly:

```
Agents propose.
Validators verify.
Humans approve.
Git records.
```



SAP MDG then governs the operational master data according to the organisation’s target process.

---

# Final perspective

SAP MDG is not a replacement for a migration model registry because the two systems govern different transitions.

SAP MDG governs the transition:

```
proposed operational master-data change
→ validated and approved master data
```

Martenweave governs the transition:

```
fragmented source evidence
→ explicit migration model
→ validated proposed model change
```

In the Supplier bank-data case, SAP MDG can ensure that the target bank record follows the organisation’s governed change process.

Martenweave should explain:

- why that account was selected;
- which source supplied each value;
- which fallback was used;
- what “verified” means;
- which evidence supports payment activation;
- which Decision approved the path;
- which population remains unresolved.

The practical test is:

> Can the programme explain how a legacy bank record became an approved SAP Business Partner bank account without relying on one consultant’s memory or a collection of disconnected spreadsheets?

When the answer is yes, the migration model is governed.

When the answer is:

> The record passed MDG validation,

the organisation knows that the target record satisfied the target control.

It still may not know how or why the migration produced it.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It is not intended to replace SAP Master Data Governance.

It is intended to preserve and validate the source-to-target model around SAP governance:

```
sources
→ datasets
→ mappings
→ rules
→ evidence
→ decisions
→ target governance
```

That boundary gives Martenweave a clearer and more credible product role.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central hub and governance layer for business-critical master data. Its documented capabilities include governed models, golden records, profiling, matching, merging, semantic reconciliation, workflow routing, validated values, business rules, data-quality monitoring, mass changes and auditable changes.

SAP also states that MDG can unite SAP and third-party sources, govern unique master-data attributes, enforce validated values and support the preparation of master data for SAP S/4HANA. These capabilities make it a substantial operational MDM and governance platform; the distinction in this article concerns the external migration-model and evidence layer, not an alleged inability of MDG to govern master data.

Martenweave Core currently defines itself as a backend-first model-governance and evidence layer. It turns spreadsheets, datasets, tickets, validation reports, Decisions and SAP context into canonical model files, deterministic validation, gap reports, lineage, impact analysis and human-approved proposals.

The current Martenweave architecture keeps canonical files as the source of truth, generated indexes disposable and AI changes proposal-first. It explicitly excludes hosted MDM replacement, generic workflow orchestration and direct SAP write-back from the core product boundary.

The SAP MDG references, Supplier bank-data workflow and integration pattern described here are architectural guidance. They should not be interpreted as guarantees of an existing deep SAP MDG connector, direct MDG configuration import or automatic target enforcement in the current Martenweave release.

Martenweave is independent and is not affiliated with or endorsed by SAP.
