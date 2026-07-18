# How to Use Lineage Evidence During Mock Loads, Cutover and Hypercare

**Reviewed: 14 July 2026**

Lineage is often treated as design documentation.

A migration team defines:

```text
source field
→ transformation
→ target field
```

The diagram is reviewed during design.

Then execution begins.

Mock loads produce extracts, rejected records, defaults, manual corrections and load reports. Cutover introduces time pressure, partial source availability and emergency decisions. Hypercare reveals downstream failures that were invisible during migration testing.

At that point, static lineage is not enough.

The programme needs evidence showing whether the approved path actually worked for a particular dataset, load cycle, migration wave and target population.

> Lineage evidence connects the approved model path to observable execution results.

It should help answer:

- Did the expected source fields arrive?
- Did the approved transformation run?
- Were required context fields available?
- Which fallback paths were used?
- Did the value reach the correct SAP object and organisational level?
- Did downstream consumers receive the same meaning?
- Which results were verified during mock loads?
- Which assumptions changed during cutover?
- Which failures remain active in hypercare?

The evidence required changes across the migration lifecycle.

A mock load is primarily a learning and correction cycle.

Cutover is an execution-control period.

Hypercare is a production-conformance and defect-isolation period.

Using one generic “migration validation report” for all three phases loses the distinction.

---

# The three phases ask different questions

## Mock loads

The central question is:

> Does the designed migration path work against realistic data?

Mock loads should expose:

- missing source fields;
- incorrect grain;
- broken mappings;
- invalid value conversions;
- insufficient context;
- undocumented defaults;
- manual workload;
- target-structure misunderstandings.

A mock load can fail productively if it identifies these issues early.

## Cutover

The central question becomes:

> Did the approved and tested path execute completely within the controlled cutover scope?

Cutover evidence should establish:

- correct input snapshot;
- correct model baseline;
- approved implementation version;
- complete execution;
- rejected and deferred records;
- fallback use;
- target reconciliation;
- release decision.

## Hypercare

The central question changes again:

> Does the production result behave correctly across downstream processes and real operational use?

Hypercare evidence should identify:

- latent semantic defects;
- downstream interpretation problems;
- missing replication;
- incorrect organisational assignments;
- unresolved fallback values;
- master-data incidents linked to migration decisions;
- defects requiring model changes rather than record corrections.

The lineage model can remain stable across all three phases.

The evidence and verdicts should not.

---

# Design path, execution path and outcome path

A useful migration view separates three paths.

## Design path

What is approved.

```text
source endpoint
→ Mapping
→ business Attribute
→ SAP endpoint
```

## Execution path

What a particular run used.

```text
extract column
→ transformation version
→ load structure
→ SAP load process
```

## Outcome path

What persisted and was consumed.

```text
SAP field
→ replication or interface
→ process or report
```

A successful execution path does not always produce a correct outcome path.

A product record may load successfully into SAP but fail to replicate to a planning system.

A supplier bank account may be stored correctly but blocked by a payment control.

A partner function may exist in SAP but be assigned to the wrong Sales Area.

Evidence should follow the complete path relevant to the business outcome.

---

# Model baseline is the first piece of evidence

Every mock load, cutover run and hypercare investigation should identify the canonical model baseline it relates to.

Record:

- model tag or commit;
- schema version;
- approved Mapping IDs;
- Rule versions;
- value-list version;
- target endpoint definitions;
- applicable Decisions.

Without this, the statement:

```text
Mock Load 3 passed
```

has limited value.

The repository may have changed after the load.

A Mapping may have been updated.

A Rule may have moved from warning to error.

A target endpoint may have been replaced.

Martenweave currently treats canonical Markdown and YAML files as the source of truth, validates them before building disposable indexes and exposes trace, impact, health and dataset-readiness operations over that model.

The run must therefore point back to the model state it tested.

---

# Evidence identity

A migration evidence record should be identifiable independently from the design object.

Example:

```text
EVID-MOCK2-SUPPLIER-BANK-2026-08-14
```

It may reference:

```text
baseline:
SUPPLIER-WAVE1-RC3

run:
MOCK-LOAD-2

dataset:
supplier_bank_extract_2026-08-13.csv

mapping:
MAP-SUPPLIER-BANK-TO-SAP

target:
FEP-S4-BP-BANK-IBAN
```

The Mapping is a reusable design object.

The evidence describes one observation.

OpenLineage uses a comparable distinction between design-time Job and Dataset metadata and runtime `RunEvent` observations. A Run represents one occurrence of a Job and can include information about its input and output datasets.

Martenweave does not need to become a complete runtime observability platform to use this principle.

It needs enough execution identity to make model claims verifiable.

---

# Mock-load evidence should test assumptions, not just totals

A mock-load report often starts with:

```text
Input records: 100,000
Loaded: 98,600
Rejected: 1,400
```

These numbers are useful.

They do not explain whether the model worked.

The evidence should also test:

- source-field availability;
- Mapping coverage;
- required context;
- value-domain compatibility;
- defaults;
- target grain;
- key construction;
- Rule behaviour;
- downstream propagation.

A result can have a high load rate and weak lineage conformance.

---

# Example 1: Supplier bank data

Consider supplier bank migration.

The design path is:

```text
Legacy bank country
+
legacy bank key
+
account number
+
IBAN
→ bank validation and normalisation
→ Supplier Bank Account
→ SAP Business Partner bank details
```

A mock load reports:

```text
Bank records loaded: 99.4%
```

That does not answer:

- Was IBAN used when available?
- Were country-specific bank keys validated?
- Were duplicate accounts merged?
- Did the same bank account attach to several suppliers?
- Were invalid IBANs rejected or silently stripped?
- Did the source account belong to the correct legal entity?
- Were sensitive values protected in the evidence package?

A better evidence summary separates claims:

| Claim | Result |
|---|---|
| Required source fields available | Partial |
| IBAN format valid | 97.8% |
| Duplicate account review complete | No |
| Target bank details created | 99.4% |
| Business ownership verified | 93.1% |
| Records using manual correction | 4.7% |

The technical target population can be high while business verification remains incomplete.

For sensitive bank data, Martenweave should store aggregate findings, hashes or restricted references rather than complete account values.

---

# Example 2: Product Plant MRP Type

A product migration includes MRP Type.

The approved design states:

```text
Legacy planning method
+
plant mapping
→ MRP Type conversion
→ Product Plant MRP Type
→ SAP plant-specific product data
```

The first mock load shows 100 percent target completeness.

Investigation finds that every missing planning method was defaulted to `PD`.

The field is populated.

The lineage is not fully conformant.

Evidence should show:

```text
Directly mapped:
72%

Converted through approved lookup:
18%

Defaulted to PD:
10%
```

The 10 percent default population then needs to be classified:

- approved temporary fallback;
- acceptable permanent policy;
- unresolved data-quality problem;
- cutover blocker.

The critical issue is not whether the SAP field is blank.

It is whether `PD` reflects a valid planning decision for the relevant Product Plant.

---

# Example 3: Customer partner functions

Partner-function migration is not a single-field exercise.

A path may require:

```text
customer identifier
+
Sales Area
+
partner role
+
partner identifier
→ partner-function Mapping
→ SAP Customer Sales Area partner assignment
```

A record-count comparison can pass while assignments are wrong.

Examples:

- ship-to party assigned to the wrong Sales Area;
- bill-to and payer reversed;
- partner role copied centrally instead of per Sales Area;
- self-partner default applied where an external payer was required;
- duplicate partner assignments collapsed incorrectly.

The evidence should test:

- role mapping;
- partner-number mapping;
- Sales Area keys;
- cardinality;
- required partner combinations;
- self-partner defaults;
- unresolved external partners.

This is why field-level and key-level lineage must be evaluated together.

---

# Example 4: Product units of measure

A source product uses:

```text
base unit:
PC

sales unit:
BOX

conversion:
1 BOX = 12 PC
```

The migration loads the Product and both units successfully.

The downstream order interface fails during hypercare because it sends `EA`, while SAP expects `PC`.

The source-to-SAP migration path was technically valid.

The end-to-end semantic path was incomplete.

Lineage evidence should include:

```text
source unit
→ canonical unit meaning
→ SAP unit
→ interface unit representation
→ downstream consumer
```

The hypercare Finding may concern:

- missing interface conversion;
- inconsistent code list;
- duplicate business meaning under `EA` and `PC`;
- incorrect target configuration.

The correct response is not necessarily to change the migrated Product.

---

# Evidence during mock loads

Mock-load evidence should be deliberately diagnostic.

A useful evidence pack includes several layers.

## Input evidence

- source extract identity;
- fingerprint;
- extraction time;
- source-system snapshot;
- field list;
- row count;
- key uniqueness;
- missing fields;
- unexpected fields.

## Transformation evidence

- implementation version;
- Mapping IDs;
- conversion-table version;
- input-to-output counts;
- rejected values;
- defaults;
- fallback use;
- manually changed records.

## Target evidence

- records accepted;
- records rejected;
- SAP object created;
- target field persisted;
- organisational assignments;
- target value distributions.

## Reconciliation evidence

- source-to-target totals;
- key reconciliation;
- transformation-category counts;
- unresolved differences;
- duplicates;
- excluded records.

## Business evidence

- reviewed samples;
- owner acceptance;
- approved exceptions;
- unresolved Findings;
- release verdict.

The programme should not require every evidence layer to be stored directly in the model repository.

It should retain the summary, provenance and reference needed to support model decisions.

---

# Mock-load evidence should be cumulative

Each mock load should build on the previous one.

Example:

## Mock Load 1

Purpose:

- prove basic object creation;
- validate source and target structures;
- identify missing fields.

## Mock Load 2

Purpose:

- validate transformations;
- test organisational contexts;
- exercise local exceptions.

## Mock Load 3

Purpose:

- production-scale volume;
- cutover-like sequencing;
- complete reconciliation;
- operational ownership.

The evidence model should show which claim became stronger across runs.

A later successful run does not erase earlier failures.

Those earlier failures may explain why the design changed.

---

# Example 5: Supplier tax identifiers

Tax identifiers are context-sensitive.

The design may include:

```text
country
+
tax-number category
+
tax identifier
+
exemption evidence
→ tax Mapping and validation
→ SAP Business Partner tax number
```

Mock-load evidence should distinguish:

- syntax validation;
- country/category compatibility;
- uniqueness;
- duplicate legal entities;
- exemption handling;
- missing legal evidence;
- target persistence.

A tax number can pass a format check and still use the wrong category.

A record can load and still create a legal or operational defect.

The evidence claim should therefore be precise:

```text
format valid
```

is not equivalent to:

```text
legal treatment approved
```

---

# Example 6: Payment Terms

Payment Terms may exist at different organisational levels and for different roles.

A Supplier may have:

- company-code payment terms;
- purchasing-organisation-related process assumptions;
- source terms inherited from a contract;
- local exceptions.

A cutover dataset may contain one field called `PAYMENT_TERMS`.

The target may require several contextual assignments.

Evidence should test:

- source authority;
- company-code context;
- value conversion;
- local override;
- missing company codes;
- conflicting terms;
- target assignment.

A global count of nonblank values is almost meaningless without organisational grain.

---

# Move from mock load to cutover

Cutover evidence should be based on previously verified model paths.

Cutover is not the right moment to discover basic semantics.

It is the moment to confirm that the approved package executed under controlled conditions.

The evidence focus narrows from design discovery to execution control.

---

# Cutover evidence package

A cutover evidence package should identify:

## Baseline

- canonical model commit;
- approved proposal set;
- transformation version;
- SAP release or target configuration reference.

## Input control

- extract timestamp;
- source freeze point;
- dataset fingerprint;
- population definition;
- delta policy.

## Execution control

- job or load IDs;
- start and finish times;
- implementation versions;
- errors;
- retries;
- manual interventions.

## Result control

- accepted records;
- rejected records;
- deferred records;
- defaults and fallbacks;
- target reconciliation;
- business sign-off.

## Decision control

- go/no-go verdict;
- accepted residual risk;
- rollback or correction plan;
- hypercare ownership.

A cutover run should be reproducible enough to explain later why a particular record received a particular result.

---

# Example 7: Product profit centre assignment

Product or Material data may require a profit centre at plant level.

The cutover design might be:

```text
legacy site
+
product family
+
company structure
→ profit centre derivation
→ SAP Product Plant profit centre
```

During cutover, a mapping table for one newly created plant is missing.

An emergency default assigns the regional profit centre.

The load succeeds.

This should create explicit evidence:

```text
fallback:
regional profit centre

affected plant:
PL30

affected products:
1,842

approval:
Finance Data Lead

expiry:
before first month-end close
```

Without this, hypercare may discover cost postings against the wrong organisational responsibility.

The lineage evidence should connect the temporary assignment to:

- Mapping;
- plant context;
- finance owner;
- affected population;
- remediation deadline.

---

# Example 8: Business Partner time zone

A source system does not provide time zone for a large customer population.

Cutover applies a country-based derivation.

```text
country
→ time-zone lookup
→ SAP Business Partner time zone
```

This may be acceptable for countries with one time zone.

It may be unsafe for countries with several.

Evidence should separate:

- direct source value;
- deterministic country derivation;
- regional derivation;
- unresolved multi-time-zone population;
- manual correction.

A 100 percent populated target field can hide low-confidence derivation.

---

# Manual cutover interventions

Manual interventions are common.

The problem is not that they occur.

The problem is when they disappear from the lineage.

Examples:

- conversion table edited during cutover;
- rejected records corrected in a spreadsheet;
- SAP target values changed manually;
- source extract patched;
- interface replayed with different filters;
- temporary Rule disabled.

Each intervention should record:

- reason;
- authorised person or role;
- affected object;
- affected population;
- time;
- before and after state;
- whether the canonical model must change;
- whether the action was one-time.

Do not automatically treat a successful manual correction as evidence that the approved design works.

It may be evidence that the design or implementation failed.

---

# Cutover evidence and chain of custody

For critical datasets, the programme should know which exact data moved through each stage.

A practical chain may include:

```text
source snapshot
→ extracted file
→ transformed file
→ approved load file
→ SAP load result
→ post-load extract
```

Each stage can have:

- fingerprint;
- record count;
- timestamp;
- owner;
- transformation reference.

This is particularly important for:

- supplier bank data;
- tax identifiers;
- customer credit data;
- finance master data;
- regulated classifications.

The purpose is not to build a forensic platform.

It is to prevent ambiguity over which file and transformation produced the production state.

---

# Cutover exceptions should feed hypercare

Every unresolved cutover exception should become a hypercare item with lineage context.

Weak handover:

```text
1,200 records need follow-up.
```

Stronger handover:

```text
1,200 Product Plant records
lack approved MRP Controller assignment.

Temporary value:
001

Affected plants:
PL20, PL30

Canonical objects:
ATTR-MRP-CONTROLLER
MAP-PLANT-MRP-CONTROLLER

Remediation owner:
Production Planning Data Lead

Deadline:
before first planning run
```

The hypercare team can then trace:

- source gap;
- temporary Mapping;
- target field;
- operational consequence;
- correction evidence.

---

# Hypercare is where downstream lineage becomes visible

Mock loads usually focus on source-to-SAP movement.

Hypercare reveals whether the data functions correctly after go-live.

The path expands:

```text
source
→ migration
→ SAP master data
→ interface
→ business process
→ report or operational result
```

A production defect may originate in:

- source interpretation;
- migration Mapping;
- target configuration;
- downstream conversion;
- process Rule;
- local operational workaround.

Lineage evidence helps isolate the layer.

---

# Example 9: Product ATP checking group

A Product is loaded with the expected checking group.

Sales orders still fail availability checks.

Possible causes include:

- field loaded at the wrong organisational level;
- related MRP settings missing;
- downstream rule configuration;
- plant-specific record absent;
- interface-created product missing an extension.

The migrated field itself may be correct.

The outcome path is incomplete.

A hypercare investigation should connect:

```text
Product Attribute
→ SAP endpoint
→ related plant context
→ operational process
→ observed defect
```

This avoids reopening the entire Product migration design unnecessarily.

---

# Example 10: Supplier purchasing block

A Supplier is unexpectedly blocked during purchase-order creation.

The migrated central block flag is blank.

The actual issue is a purchasing-organisation block copied from a local source.

Evidence should distinguish:

```text
central Supplier block
purchasing-organisation block
company-code posting block
workflow review status
```

A table-level investigation may simply report that the Supplier contains a block.

A lineage-aware investigation identifies:

- which source field produced it;
- at which organisational level;
- which Mapping applied;
- which Decision permitted the value;
- which purchasing process failed.

---

# Example 11: Customer unloading point

Unloading points may migrate successfully as address-related or customer-specific data.

Hypercare reveals that delivery scheduling ignores them.

Possible reasons:

- unloading point attached to the wrong ship-to;
- source key mapped to sold-to rather than ship-to;
- calendar or receiving-hours data missing;
- downstream delivery interface does not consume the field.

The evidence path extends beyond the target field.

The data may exist and still fail to produce the intended process result.

---

# Example 12: Cost centre validity

A Cost Centre migration loads all records.

Hypercare postings fail because several cost centres have validity dates that begin after go-live.

The field lineage is structurally correct.

The temporal Rule is not.

Evidence should include:

- source validity interval;
- Mapping treatment;
- target validity interval;
- controlling-area context;
- first operational posting result.

This is a good example of why lineage evidence must include Rules and time, not only source and target fields.

---

# Hypercare Findings should preserve phase context

A hypercare defect should record whether it relates to:

- design defect;
- implementation defect;
- cutover execution defect;
- source-data defect;
- target configuration;
- downstream integration;
- business-process misunderstanding;
- temporary exception.

This prevents every production issue from becoming a model change.

Example:

```text
Finding:
Supplier bank account not available in payment run

Root cause:
bank details loaded correctly;
payment-method configuration incomplete

Model change:
none

Operational correction:
configuration update
```

Another example:

```text
Finding:
Product MRP Type incorrect for plant PL20

Root cause:
global default used during cutover

Model change:
fallback policy must be restricted

Data correction:
required
```

The evidence determines where remediation belongs.

---

# Evidence should support defect isolation

A good hypercare trace should answer:

1. What business Attribute is affected?
2. Which target endpoint stores it?
3. Which Mapping produced it?
4. Which source and dataset instance were used?
5. Which run loaded it?
6. Was a fallback applied?
7. Did post-load validation pass?
8. Which downstream process failed?
9. Is the defect isolated or systematic?
10. Does the canonical model need to change?

This reduces dependence on individuals who remember the migration.

---

# Runtime events and data-quality metrics

OpenLineage’s object model allows runtime events to carry input and output dataset information. It also defines facets for dataset-level and column-level quality metrics, assertions and output statistics, including row counts and null counts.

This is a useful pattern for Martenweave Evidence summaries.

A migration run can report:

```text
input rows
output rows
rejected rows
null count
distinct-value count
assertion results
```

But the metrics should be interpreted through the model.

A null count matters differently for:

- optional Product description;
- mandatory Supplier bank country;
- conditional Tax Identifier;
- derived Profit Centre;
- retired Customer classification.

---

# Direct and indirect evidence

Field-level lineage distinguishes direct value dependencies from indirect fields used in joins, filters and conditions. OpenLineage’s column-lineage model formalises that distinction.

Migration evidence should preserve it.

Example: Product MRP Type.

```text
Legacy planning method:
direct value input

Plant:
conditional lookup input

Product status:
filter input
```

If Plant is missing, the planning method may still be available.

The Mapping result can still be wrong.

A field-presence report alone will not detect this.

---

# Evidence verdicts

Avoid only two statuses:

```text
pass
fail
```

A more useful set is:

## Verified

Evidence supports the approved claim for the stated scope.

## Verified with exceptions

The main path worked, but bounded exceptions remain.

## Partially verified

Only part of the path or population was tested.

## Nonconformant

Observed behaviour conflicts with the approved model.

## Inconclusive

Evidence quality is insufficient.

## Not tested

No evidence exists for the claim.

## Superseded

Evidence remains historical but does not verify the current baseline.

This allows realistic release decisions without hiding uncertainty.

---

# Evidence must age with the model

When a Mapping, Rule, value list or endpoint changes, earlier evidence may become stale.

Examples:

- Supplier bank validation Rule changed;
- Product Plant Mapping gained a new context input;
- Tax Identifier categories changed;
- Partner-function conversion changed;
- target API replaced;
- profit centre derivation updated.

The previous mock-load report remains valid for the earlier baseline.

It should no longer count as current verification.

Martenweave should distinguish:

```text
historically valid evidence
```

from:

```text
current evidence coverage
```

---

# Evidence invalidation by change type

## Source-field change

Recheck:

- source availability;
- profiling;
- Mapping inputs;
- authority.

## Mapping change

Recheck:

- transformation;
- affected population;
- values;
- reconciliation.

## Rule change

Recheck:

- positive and negative scenarios;
- exception behaviour;
- lifecycle stage.

## Target-field change

Recheck:

- load structure;
- persistence;
- interface consumption;
- reports.

## Value-list change

Recheck:

- existing values;
- source conversions;
- downstream code lists;
- historical interpretation.

Impact analysis should identify the evidence claims that need revalidation.

---

# Do not promote every hypercare correction into canonical truth

During hypercare, teams often fix records quickly.

Examples:

- manually update a missing bank key;
- change Product MRP Controller;
- correct partner function;
- remove a purchasing block;
- adjust Cost Centre validity.

These corrections may solve individual incidents.

They do not necessarily define the correct general model.

The workflow should be:

```text
incident correction
→ evidence
→ root-cause Finding
→ pattern assessment
→ model proposal where justified
```

A one-off correction should not automatically create a new global Rule.

---

# Pattern detection during hypercare

Repeated incidents can reveal a model defect.

Example:

- 47 products in Plant PL30 have incorrect MRP Type;
- all came from the same source classification;
- all used the same fallback;
- the Mapping did not include plant context.

This is no longer a record-level issue.

It is evidence for a Mapping change.

Another pattern:

- several suppliers fail payment because bank data is valid but payment methods are missing.

This may indicate a separate Attribute or process dependency rather than a bank-data Mapping defect.

Lineage helps separate correlated symptoms from actual shared cause.

---

# Evidence ownership

Different evidence needs different owners.

| Evidence | Likely owner |
|---|---|
| Source profile | Source data lead |
| Mapping result | Migration lead |
| SAP target validation | SAP functional lead |
| Bank-data approval | Treasury or finance owner |
| Tax treatment | Tax or legal owner |
| Product planning result | Production-planning owner |
| Interface verification | Integration owner |
| Hypercare incident pattern | Data governance or AMS lead |

A report with no accountable reviewer is only an artefact.

---

# Evidence acceptance

Evidence should record who accepted the claim and for what purpose.

Examples:

```text
Accepted for:
Mock Load 2 continuation
```

```text
Accepted for:
Production cutover
```

```text
Accepted with residual risk:
temporary Product Plant default
```

```text
Not accepted:
Supplier Tax Identifier legal treatment unresolved
```

Acceptance of a mock-load result does not automatically approve production cutover.

The scope of acceptance matters.

---

# A phase-based evidence matrix

| Evidence type | Mock load | Cutover | Hypercare |
|---|---|---|---|
| Source schema | Discover and correct | Confirm frozen input | Investigate deltas |
| Mapping coverage | Test and improve | Confirm approved version | Diagnose patterns |
| Fallback usage | Measure and reduce | Control and approve | Reconcile and remove |
| Target persistence | Validate | Prove completeness | Investigate incidents |
| Downstream interfaces | Partial testing | Critical-path confirmation | Production behaviour |
| Business acceptance | Design validation | Go-live approval | Operational confirmation |
| Model update | Frequent proposals | Strictly controlled | Pattern-based |

This matrix helps prevent evidence expectations from remaining static across phases.

---

# Suggested Martenweave Evidence model

A practical runtime Evidence summary could contain:

```yaml
id: EVID-CUTOVER-PRODUCT-PLANT-001
type: Evidence
phase: cutover
baseline: PRODUCT-WAVE1-APPROVED
run_id: CUTOVER-PRODUCT-2026-10-03
scope:
  plants:
    - PL10
    - PL20
claims:
  - subject: MAP-PRODUCT-MRP-TYPE
    claim: approved_mapping_conformance
    verdict: verified_with_exceptions
  - subject: FEP-S4-PRODUCT-PLANT-MRP-TYPE
    claim: target_persistence
    verdict: verified
exceptions:
  - finding: FIND-PL20-MRP-DEFAULT
```

This is a recommended direction rather than the exact current schema.

---

# Suggested diagnostics

```text
MW-PHASE-EVID-001
Evidence has no migration phase.

MW-PHASE-EVID-002
Mock-load Evidence is being used as cutover approval.

MW-PHASE-EVID-003
Cutover run does not identify the canonical baseline.

MW-PHASE-EVID-004
Target completeness passed while Mapping conformance failed.

MW-PHASE-EVID-005
Fallback records are not identifiable.

MW-PHASE-EVID-006
Manual intervention has no owner or affected population.

MW-PHASE-EVID-007
Hypercare incident cannot be traced to a source dataset or load run.

MW-PHASE-EVID-008
Evidence verifies a superseded Mapping.

MW-PHASE-EVID-009
Critical downstream consumer was not tested.

MW-PHASE-EVID-010
Residual cutover exception has no hypercare owner.

MW-PHASE-EVID-011
Sensitive evidence is embedded without restriction metadata.

MW-PHASE-EVID-012
Runtime correction was promoted to canonical policy without review.
```

---

# Operational reports

Martenweave should be able to produce several concise reports.

## Mock-load lineage report

Shows:

- tested model baseline;
- expected paths;
- observed paths;
- Mapping conformance;
- source gaps;
- fallback usage;
- proposed corrections.

## Cutover lineage report

Shows:

- approved input snapshot;
- executed versions;
- critical path completion;
- manual interventions;
- reconciliation;
- residual exceptions;
- go/no-go verdict.

## Hypercare lineage report

Shows:

- incidents by Attribute and Mapping;
- recurring source causes;
- unresolved fallback values;
- downstream failures;
- candidate model changes;
- data-correction backlog.

The reports should derive from canonical IDs and structured Evidence rather than separate hand-maintained spreadsheets.

---

# What Martenweave should implement next

Martenweave already has:

- canonical model objects;
- deterministic validation;
- dataset profiling and readiness;
- lineage and impact;
- Evidence, Decisions and proposals;
- a Model Ledger workbench with evidence coverage and detailed object context.

The next focused slice should add **phase-aware lineage evidence**.

## Goal

Use the same canonical lineage across mock load, cutover and hypercare while applying different evidence and acceptance policies.

## Initial scope

Support phases:

- mock_load;
- cutover_rehearsal;
- cutover;
- hypercare.

Support evidence claims:

- source availability;
- Mapping conformance;
- Rule conformance;
- target persistence;
- fallback usage;
- reconciliation;
- downstream verification;
- business acceptance.

## Acceptance criteria

The system must distinguish:

```text
Product Plant MRP Type populated
```

from:

```text
Product Plant MRP Type produced through the approved plant-context Mapping
```

It must also distinguish:

```text
Supplier bank account loaded
```

from:

```text
Supplier bank account validated, uniquely assigned and approved for payment use
```

## Existing workflow

```bash
martenweave run dataset-readiness \
  --repo ./model \
  --dataset ./data/mock-load-3.xlsx \
  --out ./reports/mock-load-3
```

## Future phase-aware operation

```bash
martenweave evidence-assess \
  --repo ./model \
  --phase cutover \
  --run ./evidence/cutover-product-run.json
```

The second command is a product direction, not a current documented CLI guarantee.

---

# Final perspective

Lineage evidence should evolve with the migration lifecycle.

During mock loads, it should reveal whether the design is implementable.

During cutover, it should prove that the approved path executed under controlled conditions.

During hypercare, it should connect production symptoms to the correct source, Mapping, Rule, endpoint or downstream consumer.

The complete loop is:

```text
approved model
→ mock-load evidence
→ corrected design
→ cutover evidence
→ production result
→ hypercare evidence
→ governed improvement
```

The practical test is not:

> Did the load finish successfully?

It is:

> Can the programme prove how each critical value was sourced, transformed, loaded, verified and consumed for the relevant population and model baseline?

For Supplier Bank Account, that means more than a populated IBAN.

For Product MRP Type, it means more than a nonblank SAP field.

For Partner Functions, it means more than matching record counts.

For Tax Identifiers, it means more than passing a format check.

For Cost Centre validity, it means more than creating the master record.

When lineage evidence answers those questions, mock loads, cutover and hypercare become connected governance phases rather than separate reporting exercises.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects canonical model truth with dataset profiles, validation reports, migration evidence, Decisions and reviewable change proposals.

The purpose is not to replace migration execution tools, SAP logs, interface monitoring or incident-management systems.

The purpose is to preserve what those observations mean for the governed model.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave Core currently treats canonical files as the source of truth, validates them deterministically, builds disposable SQLite and JSONL indexes and provides dataset-readiness, trace, impact, health, scorecard and proposal workflows.

The current Martenweave product contract is backend-first and CLI-driven. It can generate a local static viewer and includes a local interactive frontend prototype for review, but it does not present that prototype as a hosted production application.

OpenLineage’s current object model separates design-time Job and Dataset metadata from runtime Run events. Runs represent individual occurrences and may carry information about input and output datasets, quality metrics, assertions and output statistics.

OpenLineage’s column-lineage facet describes which input fields contribute to output fields and distinguishes direct value derivation from indirect dependencies such as joins, filters and conditional logic.

The phase-aware Evidence model, diagnostics and proposed `evidence-assess` command described here are recommended Martenweave improvements. They should not be interpreted as guarantees of the exact current schema or CLI unless separately implemented and published.

Martenweave is independent and is not affiliated with or endorsed by SAP or OpenLineage.
