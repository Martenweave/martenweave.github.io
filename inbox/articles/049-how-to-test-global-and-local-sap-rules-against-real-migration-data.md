# How to Test Global and Local SAP Rules Against Real Migration Data

**Reviewed: 14 July 2026**

The global design says that Supplier Risk is mandatory for every active strategic supplier.

The Portuguese design adds another condition: regulated suppliers must complete compliance review before activation.

The migration plan allows incomplete records to enter a temporary review queue during Mock Load 2.

All three rules have been approved.

The team creates six test records:

- one German strategic supplier with valid risk;
- one Portuguese regulated supplier with valid risk and clearance;
- one Portuguese supplier without risk;
- one Italian supplier with incomplete source data;
- one inactive historical supplier;
- one non-resident supplier with an exemption.

Every scripted test produces the expected result.

The rule set is declared ready.

Then the real migration file arrives.

It contains:

- suppliers with several company-code and purchasing-organisation assignments;
- records classified as strategic in one source and ordinary in another;
- blank country codes;
- expired exemption evidence;
- inactive central records with active organisational views;
- unexpected local values;
- suppliers changing legal category during the extraction period;
- duplicates created by source consolidation;
- records already transformed by an old default.

The rules still work technically.

The test data did not represent the population to which they would actually be applied.

This is the gap between rule testing and migration-data testing.

A conventional test asks:

> Does the rule return the expected result for this record?

A migration-data test asks:

> Does the rule produce a controlled result across the real population, including combinations, exceptions and source defects that the design did not anticipate?

Both are necessary.

The first tests logic.

The second tests whether the logic is usable.

---

## Put the real population in the room

Global and local rules are usually approved in abstract language:

> Tax Identifier is required for supplier organisations.

> Portuguese non-residents may use an approved exemption.

> Supplier Risk is mandatory for strategic suppliers.

> Local review status must be cleared before activation.

The statements look clear because each sentence describes one condition.

Real records combine many conditions.

One supplier may be:

- registered centrally in Germany;
- extended to a Portuguese company code;
- purchased from through an Italian purchasing organisation;
- marked strategic in one source;
- marked inactive centrally;
- still active in open purchase orders;
- missing a final risk value;
- covered by a temporary migration exception.

The effective result depends on how these dimensions interact.

Testing rules against isolated examples is therefore insufficient. The programme needs a population in which the important contexts occur together.

A meaningful test dataset must represent:

- business-object category;
- role;
- organisational assignment;
- lifecycle status;
- country and jurisdiction;
- source system;
- migration wave;
- local extension;
- exemption;
- temporary deviation;
- missing or contradictory evidence.

This is not a demand to copy the entire production database into every test environment.

It is a demand to know which combinations exist and which combinations matter.

---

# Three separate things must pass

Teams often report that “the rule passed” without stating what was tested.

There are three different pass conditions.

## The model passes

The rule is structurally coherent.

For example:

- referenced attributes exist;
- contexts are valid;
- global and local relationships are connected;
- an override identifies the rule it overrides;
- temporary deviations have expiry;
- applicable owners exist.

This is deterministic model validation.

It says nothing yet about whether source data can support the rule.

## The data passes

The current population contains enough information to evaluate the rule and reach an approved outcome.

For example:

- required fields are available;
- context can be determined;
- values are valid;
- exceptions are identifiable;
- affected records are measurable;
- no uncontrolled default hides missing data.

This is dataset readiness.

It says nothing yet about whether SAP or another MDM platform implements the rule correctly.

## The implementation passes

The configured system produces the approved outcome.

For example:

- valid records proceed;
- invalid records are blocked;
- exceptions require the right evidence;
- workflow routes correctly;
- downstream systems receive an interpretable state;
- temporary migration behaviour does not leak into operations.

A rule is ready only when these three pass conditions align.

```text
Model validity
+
Dataset evaluability
+
Implementation correctness
=
Usable rule
```

A failure in any layer should not be disguised by success in another.

---

# A small sample can be perfectly misleading

Migration teams often receive a sample file containing a few hundred clean records.

The sample is useful for:

- checking columns;
- testing formats;
- proving basic transformations;
- building initial scripts.

It is weak evidence for population readiness when it was manually selected or cleaned.

A sample may omit:

- rare source values;
- legacy records;
- inactive-but-relevant organisational data;
- combinations created by mergers;
- local exceptions;
- records that fail source joins;
- unusual partner categories;
- multi-organisational assignments.

The sample can prove that a rule works.

It cannot prove how often the rule will encounter an unevaluable or contradictory record.

Before relying on a sample, record:

```text
Selection method:
Random, stratified, manual or convenience sample

Source stage:
Raw extract, transformed staging or post-remediation file

Included contexts:
Countries, systems, roles and organisational levels

Excluded populations:
Historical records, incomplete records, local exceptions

Known limitation:
Does not represent rare value combinations
```

A manually prepared “good example” file should never be mistaken for readiness evidence.

---

# Build populations before test cases

Traditional test design starts with scenarios.

For model rules, it is often better to start with populations.

Suppose the rule is:

> Supplier Risk is required before activation for active strategic supplier organisations.

The relevant populations are not merely “valid” and “invalid.”

They include:

1. active strategic organisations with valid risk;
2. active strategic organisations without risk;
3. active non-strategic organisations;
4. inactive strategic organisations;
5. supplier persons;
6. organisations with conflicting strategic indicators;
7. records where activity status differs by organisational view;
8. records under temporary deviation;
9. records with risk values outside the approved list;
10. records with a plausible default introduced upstream.

For Portugal, the local rule creates further partitions:

- regulated versus non-regulated;
- review cleared versus pending;
- exemption present versus missing;
- resident versus non-resident;
- migration stage versus final activation.

The purpose is not to create hundreds of manual test cases.

It is to expose the dimensions that determine effective behaviour.

---

# Use a population inventory

A population inventory shows whether the dataset actually contains the combinations needed for testing.

| Population | Records | Expected treatment | Evidence quality |
|---|---:|---|---|
| DE active strategic with valid risk | 18,240 | May proceed | Strong |
| DE active strategic without risk | 416 | Block or remediate | Strong |
| PT regulated, risk valid, review cleared | 2,180 | May activate | Strong |
| PT regulated, risk blank, review pending | 284 | Load to review; block activation | Strong |
| PT non-resident with exemption | 96 | Apply approved exemption | Partial |
| IT source-deviation population | 1,420 | Temporary enrichment | Strong |
| Person records incorrectly in supplier scope | 63 | Out of scope | Strong |
| Unknown strategic indicator | 212 | Rule cannot be evaluated | Strong |

The final row is particularly important.

A record may not be valid or invalid.

The system may lack the information required to decide.

That is a distinct outcome:

```text
Pass
Fail
Exempt
Pending remediation
Unevaluable
Out of scope
```

Reducing every record to pass or fail conceals the difference between bad data and incomplete decision context.

---

# Test rule evaluability before compliance

Before checking whether a record complies, determine whether the rule can be evaluated.

For the Supplier Risk rule, the system may require:

- partner category;
- supplier role;
- strategic indicator;
- activity status;
- final risk value;
- effective date;
- country;
- migration stage.

If activity status is missing, the result is not automatically “risk missing.”

The rule cannot determine whether the record is applicable.

An evaluability test asks:

```text
Are all attributes required to determine applicability available,
valid and measured at the correct granularity?
```

Only then should the compliance test run.

This distinction changes reporting.

Weak report:

```text
6,840 records failed Supplier Risk validation.
```

Stronger report:

```text
4,910 applicable records lack Supplier Risk.

1,212 records are not applicable.

718 records cannot be evaluated because strategic status
or lifecycle context is missing.
```

The remediation actions are different.

---

# Context fields deserve the same scrutiny as the governed value

Teams focus on the field being validated and ignore fields used to determine scope.

For example:

> Tax Identifier is required for Portuguese resident supplier organisations.

The test usually examines Tax Identifier completeness.

It should also examine:

- country completeness;
- residence status;
- partner category;
- supplier role;
- effective dates;
- exemption state.

If country is blank, the programme cannot determine whether the local rule applies.

If partner category is wrong, persons may be tested as organisations.

If residence status is derived inconsistently, exemptions may be applied incorrectly.

A rule is only as reliable as the data that selects its population.

---

# Granularity mismatches must fail loudly

A rule may be defined at one level and tested at another.

Example:

```text
Supplier Risk:
Supplier legal-entity level

Activity:
Purchasing-organisation level

Strategic status:
Source-system central level

Compliance review:
Country level
```

A flat migration row may combine these values without indicating their scope.

The test engine can then produce a result that appears precise but has no valid semantic basis.

Before executing the rule, confirm:

- the key of every input;
- whether values are central or organisational;
- whether one value is being repeated across several contexts;
- whether aggregation or derivation is approved.

Consider a supplier active in one purchasing organisation and inactive in another.

A central `ACTIVE = true` flag cannot prove applicability for both.

The test should report a model-to-data granularity gap rather than silently expanding the value.

---

# Test the effective rule, not each sentence separately

Global and local rules should be resolved into effective behaviour before testing.

Suppose the approved rules are:

```text
Global:
Supplier Risk required before activation for active strategic suppliers.

Portugal:
Regulated suppliers require Review Status = CLEARED.

Migration Wave 2:
Missing Supplier Risk may enter a controlled review queue.

Temporary control:
Records in review cannot activate.
```

The effective Portuguese Wave 2 rule is:

```text
A regulated strategic supplier may enter the migration review queue
without final Supplier Risk.

It may not activate until:
- Supplier Risk is approved; and
- Review Status is CLEARED.
```

This effective rule should drive the test.

Do not run four independent checks and expect the reviewer to infer the combined outcome.

---

# Decision tables expose ambiguity

A decision table is often more useful than prose.

| Strategic | Regulated PT | Risk | Review | Migration stage | Expected result |
|---|---|---|---|---|---|
| Yes | Yes | Valid | Cleared | Activation | Pass |
| Yes | Yes | Missing | Pending | Load | Enter review |
| Yes | Yes | Missing | Pending | Activation | Block |
| Yes | Yes | Valid | Pending | Activation | Block |
| Yes | No | Valid | Not applicable | Activation | Pass |
| No | Yes | Missing | Cleared | Activation | Depends on approved non-strategic policy |
| Unknown | Yes | Missing | Pending | Any | Unevaluable |

The sixth row frequently reveals an unresolved policy question.

The seventh reveals missing context.

Do not fabricate an expected result merely to complete the table.

An unresolved cell is useful evidence that the model is not ready.

---

# Positive tests are the least interesting tests

A positive test proves that a clean record can pass.

Most real migration failures occur elsewhere.

A complete rule test set needs several categories.

## Positive

Valid applicable record succeeds.

## Negative

Invalid applicable record is rejected or routed as approved.

## Boundary

A value exactly at the applicability boundary behaves correctly.

Examples:

- activation date equals effective date;
- exception expires today;
- supplier changes from non-strategic to strategic;
- review becomes cleared after load but before activation.

## Out of scope

The rule does not affect unrelated records.

Examples:

- persons;
- inactive records;
- another country;
- non-supplier Business Partners.

## Exception

An approved exemption works only with required evidence.

## Contradiction

Inputs disagree.

Examples:

- strategic in one source, ordinary in another;
- country differs between central and organisational data;
- final risk and review status are logically inconsistent.

## Regression

Existing global contexts remain unchanged after local rule introduction.

## Volume

The rule performs and produces manageable outcomes across the real population.

## Reversibility

Records affected by temporary defaults or transformations can still be identified and corrected.

A rule suite dominated by positive cases creates confidence without much protection.

---

# Test absence, invalidity and uncertainty separately

These conditions are often collapsed into blank.

They are different.

### Absent

No value exists.

### Invalid

A value exists but is not allowed.

### Unmapped

A source value exists, but no target treatment is approved.

### Ambiguous

Several target treatments are plausible.

### Contradictory

Different sources provide incompatible values.

### Not applicable

The field is correctly empty for this context.

### Unknown applicability

The programme cannot determine whether the rule applies.

Each condition needs a distinct result.

For example:

| Condition | Appropriate treatment |
|---|---|
| Absent but required | Remediate or block |
| Invalid code | Reject or map through approved correction |
| Unmapped value | Decision required |
| Ambiguous value | Investigation required |
| Contradictory sources | Authority or survivorship decision |
| Not applicable | Pass |
| Unknown applicability | Context gap |

If all become `FAILED`, the remediation queue becomes noisy and difficult to govern.

If all become `WARNING`, material problems disappear.

---

# The dataset should contain deliberately difficult records

A production extract provides realism.

A deliberately constructed challenge set provides coverage.

Use both.

The challenge set should include:

- each rule boundary;
- each approved exception;
- each temporary deviation;
- contradictory source combinations;
- unknown codes;
- null context fields;
- multi-organisational records;
- expired evidence;
- records created before and after effective dates;
- values from retired mappings;
- records previously touched by defaults.

These records are not meant to estimate population frequency.

They prove that the model can distinguish difficult states correctly.

---

# Then run against the whole representative population

After the challenge set passes, execute the rules against a representative or complete migration population.

Measure:

- number of applicable records;
- pass count;
- fail count;
- exception count;
- unevaluable count;
- out-of-scope count;
- top failure reasons;
- distribution by source, country and organisation;
- concentration among critical records;
- change from previous extract.

This is where hidden problems appear.

Example:

```text
Global Supplier Risk rule

Applicable:
42,810

Pass:
36,905

Pending approved review:
2,140

Fail:
1,118

Unevaluable:
2,647
```

A superficial summary reports:

> 91.9% pass or approved review.

A better analysis notices that 2,647 records cannot be evaluated.

If these are concentrated in one source system, the central issue may be missing strategic classification rather than Supplier Risk itself.

---

# Do not accept a percentage without seeing the residual population

A programme may set readiness thresholds such as:

- 99% complete;
- fewer than 100 open records;
- zero critical failures.

These are programme policies, not universal rules.

Whatever threshold is used, the residual population must remain visible.

Ask:

- Which records failed?
- Are they critical?
- Do they share a source?
- Are they legally sensitive?
- Can they activate?
- Are they new or recurring?
- Is the residual population growing?

A 0.1% failure rate can still include:

- the largest suppliers;
- regulated customers;
- master records required for cutover;
- parent entities;
- records used by several countries.

Volume and materiality must be assessed together.

---

# Cross-country testing should prove containment

A local rule is not safe merely because it works locally.

When a Portuguese rule is introduced, test:

- Portugal in-scope population;
- Portugal out-of-scope population;
- at least one unaffected country;
- shared interfaces;
- global reports;
- common value lists.

A containment report might state:

```text
Portuguese regulated organisations:
New review rule applied.

Portuguese non-regulated organisations:
No review requirement.

German strategic suppliers:
Global risk rule unchanged.

Shared risk value list:
No local process values added.

Global reporting:
Review Status excluded from final risk distribution.
```

This proves that local variation has not leaked into the shared model.

---

# Test migration stage transitions

Rules may differ between:

- source assessment;
- initial load;
- enrichment;
- validation;
- review;
- activation;
- replication;
- hypercare.

A record should be tested across transitions.

Example:

```text
Stage 1:
Loaded with missing Supplier Risk into PENDING review.

Stage 2:
Risk enrichment completed.

Stage 3:
Compliance review cleared.

Stage 4:
Activation succeeds.

Stage 5:
Approved values replicated downstream.
```

Also test failure transitions:

```text
Risk completed, review still pending:
Activation blocked.

Review cleared, risk missing:
Activation blocked.

Temporary deviation expired:
Load no longer permitted.
```

This is more useful than testing each screen or batch independently.

---

# Historical and delta data need different tests

A full migration extract and a post-go-live delta are not equivalent.

Historical migration may contain:

- inactive records;
- obsolete values;
- incomplete organisational structures;
- legacy exceptions;
- low-value history needed only for reference.

Operational delta processing may require:

- complete current values;
- immediate validation;
- stricter ownership;
- no migration defaults;
- real-time distribution.

A rule may therefore permit:

```text
Historical inactive record:
Load with documented exception.
```

while requiring:

```text
New active record:
Block until complete.
```

The test plan should distinguish historical treatment from operational policy.

Otherwise, migration concessions leak into steady-state governance.

---

# Configuration tests are still required

Dataset testing does not prove SAP implementation.

After the model and population are understood, test the configured platform.

For SAP MDG or another MDM solution, verify:

- field behaviour;
- validation timing;
- derivation;
- workflow route;
- authorisation;
- change-request status;
- activation;
- replication;
- audit trail;
- mass-change consequences.

SAP currently positions MDG around one governed model, profiling and reconciliation, validated values, workflows, business-rule monitoring, quality controls and auditable change. Those capabilities can enforce and monitor approved rules, but the programme still needs evidence that the configured rule uses the right context and produces the intended lifecycle outcome.

A configuration test should use records selected from the same population analysis, not unrelated synthetic examples.

---

# Data-quality platforms are execution engines, not semantic authorities

Platforms such as Ataccama and Informatica can profile data, execute quality checks, monitor conditions, expose lineage and support remediation workflows. Ataccama’s current platform description combines data-quality checks, monitoring, lineage, observability, reference data and master-data capabilities.

Informatica’s current data-quality offering describes continuous profiling, cleansing and standardisation, generated quality rules and observability across data, pipelines and business views.

These capabilities are valuable for:

- scanning large populations;
- measuring completeness;
- validating formats;
- monitoring recurring failures;
- applying reusable checks;
- detecting change over time.

They do not independently determine:

- whether the field should be mandatory;
- which population is applicable;
- whether a local exception is legitimate;
- whether two fields mean the same thing;
- whether a temporary migration treatment should become permanent.

The canonical model and approved decision must supply that meaning.

A clean division of responsibility is:

```text
Martenweave:
Defines and traces the rule, context, evidence and approved treatment.

Data-quality platform:
Executes and monitors scalable checks.

SAP or MDM platform:
Enforces operational behaviour.

Test tools:
Verify configured scenarios and regression.

Humans:
Approve meaning, exceptions and residual risk.
```

---

# Keep rule identity stable across tools

The same rule may appear in:

- Martenweave;
- SAP MDG;
- Ataccama;
- Informatica;
- migration scripts;
- test management;
- Jira.

Use one stable rule ID.

For example:

```text
RULE-SUPPLIER-RISK-ACTIVATION-001
```

Each implementation should reference it:

```text
Martenweave:
Canonical definition and context

Ataccama:
Population quality check

SAP MDG:
Activation validation

Migration pipeline:
Readiness gate

Test suite:
Positive, negative and regression scenarios
```

This allows the programme to compare results.

Without stable identity, several rules with similar labels may gradually diverge.

---

# Baselines must agree

A valid test package identifies:

- canonical model commit or version;
- rule version;
- dataset extract;
- transformation version;
- SAP configuration release;
- value-list version;
- test cycle.

Example:

```text
Model:
supplier-model-v3.4

Rule:
RULE-SUPPLIER-RISK-ACTIVATION-001 v2

Dataset:
ERP_B_supplier_extract_2026-07-12

Transformation:
migration-release-4.6

SAP configuration:
MDG-R5

Test cycle:
UAT-1
```

If the dataset was transformed using rule v1 but SAP was tested with rule v2, the evidence does not describe one coherent state.

The tests may all pass individually.

The package still cannot prove readiness.

---

# Testing should produce findings, not only defects

A failed record does not always justify a software defect.

Possible outputs include:

### Data remediation

The model and implementation are correct; records must be fixed.

### Source gap

Required context or value is unavailable from the source.

### Mapping issue

Source and target are approved, but transformation is wrong.

### Model ambiguity

The rule does not define the outcome for the observed combination.

### Configuration defect

SAP or the MDM platform differs from the approved rule.

### Local-policy decision

A contextual requirement has not been approved.

### Temporary-deviation decision

The target rule is valid, but the current migration stage needs bounded treatment.

### Test-data defect

The expected result was based on an incorrect assumption.

A test programme that turns every unexpected result into a configuration ticket will corrupt the model.

---

# A full worked example: Supplier Risk and Review Status

Consider a programme with three rules.

### Global rule

Supplier Risk is mandatory before activation for active strategic supplier organisations.

### Portuguese strengthening

Regulated Portuguese suppliers also require Compliance Review Status = `CLEARED`.

### Italian deviation

Italian Wave 2 records may enter remediation without final Supplier Risk because the source release is delayed. They may not activate.

## Step 1: inspect rule inputs

Required inputs:

- partner category;
- supplier role;
- active status;
- strategic status;
- country;
- regulated status;
- risk value;
- review status;
- migration wave;
- activation stage.

## Step 2: profile the dataset

```text
Total supplier records:
86,420

Applicable active organisations:
62,180

Strategic:
14,480

Portuguese regulated:
2,940

Italian Wave 2:
8,110

Missing strategic status:
1,320

Invalid risk codes:
148

Missing country:
42
```

The 1,320 records with missing strategic status cannot yet be evaluated against the global rule.

## Step 3: build the decision table

| Country | Strategic | Regulated | Risk | Review | Stage | Result |
|---|---|---|---|---|---|---|
| DE | Yes | No | HIGH | N/A | Activation | Pass |
| DE | Yes | No | Blank | N/A | Activation | Block |
| PT | Yes | Yes | HIGH | CLEARED | Activation | Pass |
| PT | Yes | Yes | HIGH | PENDING | Activation | Block |
| PT | Yes | Yes | Blank | PENDING | Load | Review |
| IT | Yes | No | Blank | N/A | Wave 2 load | Remediation queue |
| IT | Yes | No | Blank | N/A | Activation | Block |
| Any | Unknown | Any | Any | Any | Any | Unevaluable |

## Step 4: execute against the population

Results:

```text
Pass:
11,806

Approved temporary review:
1,716

Block:
958

Unevaluable:
1,320

Out of scope:
70,620
```

## Step 5: analyse concentration

The 1,320 unevaluable records are almost entirely from one source.

The primary programme risk is no longer merely missing Supplier Risk.

It is missing strategic-status evidence.

## Step 6: test implementation

SAP MDG testing confirms:

- Portuguese pending review blocks activation;
- valid Portuguese records activate;
- Italian Wave 2 records can enter remediation;
- Italian records cannot activate without risk;
- German behaviour remains unchanged.

## Step 7: test downstream distribution

The outbound interface is checked to ensure:

- no final risk value is invented;
- pending review is identifiable;
- consumers do not treat pending records as approved;
- local review status is not confused with risk classification.

## Step 8: record separate actions

```text
Data action:
Remediate missing strategic-status evidence.

Configuration action:
Correct one Italian activation condition.

Model action:
Clarify lifecycle point for the temporary deviation.

Decision action:
Approve treatment for 42 records with missing country.
```

One test run created four different workstreams.

That is a sign of useful testing.

---

# Where Martenweave fits in the test chain

Martenweave Core already provides the main backend pieces needed to build model-aware testing:

- deterministic validation;
- generated SQLite and JSONL indexes;
- search;
- trace;
- impact analysis;
- governance health and scorecards;
- dataset-to-model gap checks;
- a combined dataset-readiness workflow;
- promotion of gaps into reviewable proposals or GitHub-ready issue drafts.

The current demo flow shows that `dataset-readiness` combines validation, coverage, gaps and a readiness verdict into shareable JSON and Markdown reports. It can also promote findings into a pending-review `PatchProposal`, preserving human review rather than changing canonical files automatically.

This supports an important product boundary:

```text
Martenweave should not become the engine that executes every enterprise data-quality rule.

It should determine which rule is being tested,
against which model and dataset baseline,
for which context,
and what the result means for controlled change.
```

---

# What Martenweave should add for contextual rule testing

A focused implementation could extend dataset readiness with:

## Rule applicability output

For each rule:

- applicable records;
- out-of-scope records;
- unevaluable records;
- reason for unevaluability.

## Context breakdown

Results by:

- source;
- country;
- role;
- organisational level;
- migration wave;
- local extension.

## Outcome classification

- pass;
- fail;
- exception;
- pending;
- out of scope;
- unevaluable.

## Residual-population export

A stable list of records requiring:

- remediation;
- decision;
- configuration correction;
- source investigation.

## Baseline manifest

- repository commit;
- rule IDs;
- dataset checksum;
- profile date;
- mapping version;
- implementation reference.

## Comparison between runs

- new failures;
- resolved failures;
- changed applicability;
- new source values;
- regression by context.

This remains backend-first and deterministic.

It does not require a general test-management platform.

---

# A conceptual report

```yaml
test_run:
  id: TESTRUN-SUPPLIER-RISK-2026-07-14
  model_baseline: supplier-model-v3.4
  dataset: ERP_B_supplier_extract_2026-07-12
  rules:
    - RULE-SUPPLIER-RISK-ACTIVATION-001
    - RULE-PT-COMPLIANCE-CLEARANCE-004
    - DEV-IT-WAVE2-RISK-002

results:
  applicable: 15800
  passed: 11806
  failed: 958
  approved_pending: 1716
  unevaluable: 1320
  out_of_scope: 70620

findings:
  - type: source_context_gap
    population: 1320
    reason: strategic_status_missing
    owner: ROLE-ERP-B-DATA-OWNER

  - type: implementation_mismatch
    population: 118
    reason: italian_activation_rule_not_enforced
    owner: ROLE-MDG-ARCHITECT

readiness:
  verdict: not_ready
  blockers:
    - strategic status unavailable for applicable population
    - Italian activation configuration mismatch
```

This is a conceptual direction, not a claim about the current schema.

---

# The release gate should be evidence-based

Before a global or local rule is declared migration-ready, require:

### Model

- rule identity is stable;
- context is explicit;
- global and local precedence is resolved;
- references validate;
- temporary deviations have expiry.

### Dataset

- applicability inputs are available;
- population is measured;
- unevaluable records are visible;
- unexpected values are classified;
- residual population is owned.

### Implementation

- positive and negative cases pass;
- lifecycle transitions pass;
- local behaviour is contained;
- unaffected global contexts pass regression;
- downstream consumers interpret the result correctly.

### Evidence

- baselines align;
- report is reproducible;
- remaining gaps are linked to owners and actions;
- accepted exceptions are approved;
- reopening triggers exist.

A rule should not pass because one team says its part works.

It should pass when the complete evidence chain describes one coherent state.

---

# The questions that reveal weak testing

Before accepting the report, ask:

- Which exact population was tested?
- How was that population selected?
- Which contexts were absent?
- Can the rule be evaluated for every applicable record?
- How are unevaluable records reported?
- Which granularities do the input fields use?
- Were real source combinations tested?
- Were local rules tested against unaffected countries?
- Were temporary deviations tested after expiry?
- Did the tests use the same model and implementation baseline?
- Are residual failures materially important?
- Did the run produce data, model or configuration actions?
- Can the test be repeated on the next extract?

If the report answers only:

> 25 scenarios passed,

the programme has tested examples, not readiness.

---

# Final perspective

A rule is not proven by a clean test record.

It is proven by controlled behaviour across the population to which it applies.

Real migration data tests more than formatting and completeness. It tests whether the model can survive:

- missing context;
- organisational complexity;
- local exceptions;
- temporary deviations;
- contradictory sources;
- lifecycle transitions;
- unexpected values;
- scale.

SAP MDG and other MDM platforms can enforce approved operational rules. Ataccama, Informatica and other data-quality platforms can profile, validate and monitor large datasets. Test-management tools can organise scenarios and defects.

The missing layer is often the connection between them:

> Which canonical rule was tested, against which effective global–local context, using which dataset and baseline, and what does each result mean for the model?

That is the layer Martenweave can own.

The practical test is:

> Can the programme take a new migration extract, apply the approved effective model, separate failure from exception and unevaluability, trace every material result to a rule and owner, and repeat the same analysis after the next change?

When it can, rule testing becomes evidence.

When it cannot, the programme has a collection of successful examples and an unresolved production risk.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects:

- canonical global and local rules;
- contexts;
- source and target endpoints;
- datasets;
- gaps;
- lineage;
- impact;
- decisions;
- reviewable proposals.

Its role is not to replace SAP validation, enterprise data-quality platforms or test-management applications.

It is to make the tested rule, population, evidence and resulting change traceable as one governed model process.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a governance layer that preserves model semantics and relationships, supports profiling and reconciliation, enforces validated values, routes collaborative workflows, monitors business rules and maintains auditable changes. SAP also recommends curating master data early because automated SAP S/4HANA processes depend increasingly on clean and correct data.

Ataccama currently presents its platform as combining data-quality checks, monitoring, lineage, observability, reference-data and master-data capabilities across end-to-end quality workflows.

Informatica currently describes Data Quality and Observability capabilities that include continuous profiling, cleansing and standardisation, generated rules and monitoring through data, pipeline and business perspectives.

Martenweave’s current public demo path validates canonical files, builds disposable indexes, supports search, trace and impact analysis, reports governance and model-side gaps, compares datasets with expected field endpoints and produces combined readiness reports.

The same dataset-readiness workflow can promote gaps into a pending-review `PatchProposal` or generate a GitHub-ready issue draft, while preserving human review before canonical model changes.

Martenweave is independent and is not affiliated with or endorsed by SAP, Ataccama, Informatica or other vendors named in this article. Product names and trademarks belong to their respective owners.
