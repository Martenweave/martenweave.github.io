# How to Build an Evidence-Based Migration Readiness Report

**Reviewed: 14 July 2026**

The steering committee sees a green dashboard.

Mapping completion is 96%.

Data cleansing is 91%.

Testing is on track.

Only a few critical issues remain open.

The programme concludes that the next mock load is ready to begin.

Three days later, the load is delayed.

Several mandatory target fields have no reliable source. A value mapping marked complete does not cover codes found in the current extract. One country’s dataset was profiled against an older mapping version. A temporary default has no business approval. Several closed issues still require changes to migration logic.

None of these facts is visible in the headline percentages.

The dashboard was not necessarily false.

It measured activity rather than readiness.

A mapping row can be marked complete because someone filled in the target column.

A data-cleansing task can be closed because a report was produced.

A test can pass against a small synthetic sample.

An issue can be closed before the model, code and dataset are reconciled.

The programme has status.

It does not yet have evidence.

This is the difference an evidence-based migration readiness report should make.

> A readiness report should not state that the migration is ready. It should show the evidence supporting that conclusion, the conditions under which it is true and the unresolved risks that could invalidate it.

Readiness is not one percentage.

It is a defensible judgement assembled from several connected forms of evidence.

## A readiness report is a decision instrument

Many migration reports are treated as progress summaries.

They answer:

- How many mappings are complete?
- How many defects are open?
- How many records passed validation?
- How many test cases were executed?
- How many cleansing tasks were closed?

These metrics are useful.

They do not answer the decision the programme actually needs to make:

> Is the current model, dataset, transformation logic and target implementation sufficiently complete and controlled to proceed to the next migration stage?

That decision may concern:

- starting a mock load;
- entering UAT;
- freezing mappings;
- beginning cutover preparation;
- approving production migration;
- accepting a controlled exception.

A readiness report should be designed around the decision, not around the reporting tool.

## Readiness is always readiness for something

“Migration ready” is too broad.

A dataset may be ready for profiling but not for loading.

A mapping may be ready for technical build but not for business approval.

A mock load may be ready to start even though the programme is not ready for cutover.

The report should state the exact decision point.

Examples:

```text id="readiness-01"
Readiness decision:
Proceed with Mock Load 2 for German Customer and Supplier data.
```

```text id="readiness-02"
Readiness decision:
Freeze Business Partner mappings for UAT Cycle 1.
```

```text id="readiness-03"
Readiness decision:
Approve production cutover load for active suppliers.
```

The required evidence changes by stage.

A mock load can tolerate known issues that would be unacceptable at production cutover.

## Green does not mean complete

A useful report should separate three conditions.

### Ready

The evidence meets the agreed criteria.

### Ready with controlled conditions

Known limitations exist, but they are understood, owned and acceptable for this stage.

### Not ready

One or more blockers invalidate the planned migration decision.

This is better than forcing every workstream into red, amber or green independently.

A workstream can be green while the overall migration is not ready.

For example:

- extraction completed successfully;
- mappings signed off;
- target configuration available;
- but required source values are missing for a material population.

The individual activities are complete.

The migration outcome is still at risk.

## Begin with an explicit readiness contract

Before producing the report, define what evidence is required.

We call this the readiness contract.

It should specify:

- migration scope;
- target milestone;
- model baseline;
- dataset versions;
- target-system baseline;
- required controls;
- blocking thresholds;
- acceptable exceptions;
- decision owners.

For example:

```text id="readiness-04"
Scope:
Active German suppliers in Wave 2.

Model baseline:
Supplier Model 1.8.

Source dataset:
ERP_A extract dated 10 July 2026.

Target baseline:
QAS release R3 candidate 2.

Decision:
Proceed with Mock Load 2.

Critical criteria:
- all mandatory target attributes have approved treatment;
- all observed critical source values have mapping coverage;
- no unresolved key or relationship blockers;
- approved deviations have owners and expiry dates;
- target validation is available for test.
```

Without this contract, the report can be assembled selectively after the results are known.

## The readiness report should be baseline-specific

Evidence is meaningful only when tied to identifiable versions.

At minimum, record:

- canonical model version;
- mapping version;
- dataset extraction date;
- transformation build;
- target-system release;
- validation-rules version;
- test cycle.

Suppose the report states:

> All customer mappings are approved.

The programme must be able to answer:

- Approved against which target model?
- Using which source extract?
- Before or after the latest value-list update?
- Is the implemented code based on the same mapping?
- Did testing use that version?

A readiness report without baselines is a current opinion about moving artefacts.

It is not reproducible evidence.

## The report needs several evidence layers

We use seven main evidence layers.

```text id="readiness-05"
1. Scope evidence
2. Model evidence
3. Mapping evidence
4. Dataset evidence
5. Target implementation evidence
6. Test and reconciliation evidence
7. Ownership and exception evidence
```

A programme may add others, such as security or cutover infrastructure.

These seven form the core model-and-data readiness view.

## 1. Scope evidence

The report should define exactly what is being migrated.

Include:

- business domain;
- source systems;
- target objects;
- countries;
- organisational units;
- record populations;
- inclusion and exclusion rules;
- historical-data scope;
- migration wave.

Readiness percentages become misleading when scope is unstable.

For example:

```text id="readiness-06"
Mapping completion:
98%
```

may mean little if 20 new fields were added to scope yesterday but not yet included in the denominator.

The report should show:

- baseline scope;
- changes since the previous report;
- newly added or removed objects;
- impact of scope changes on evidence.

## 2. Model evidence

The target model should be sufficiently defined for the migration stage.

Evidence should cover:

- approved entities;
- attributes;
- relationships;
- contexts;
- value lists;
- rules;
- ownership;
- local variations;
- lifecycle state.

Useful checks include:

- every critical target attribute has a stable identifier;
- mandatory conditions are explicit;
- organisational context is defined;
- active value lists are known;
- unresolved model decisions are visible;
- local exceptions reference global objects;
- retired endpoints are not used by active mappings.

Martenweave’s current public documentation describes structured model objects connecting fields, attributes, rules, owners, issues and decisions, with deterministic validation before indexing.

That is the type of structure needed to make model readiness testable rather than narrative.

## 3. Mapping evidence

Mapping completion should not be measured only by populated rows.

For every critical mapping, the report should show whether the following exist:

- source endpoint;
- business attribute;
- target endpoint;
- applicable context;
- transformation;
- value mapping;
- owner;
- approval;
- implementation reference;
- test evidence where required.

A practical mapping lifecycle may be:

```text id="readiness-07"
Identified
→ Defined
→ Business approved
→ Dataset validated
→ Implemented
→ Tested
```

Only mappings at the required lifecycle stage should count toward readiness.

For a mock load, `Implemented` may be sufficient for selected low-risk fields.

For cutover, critical mappings should usually be tested against representative data.

## Mapping completeness and mapping validity are different

A mapping can be complete but invalid.

Example:

```text id="readiness-08"
Source:
LEGACY_VENDOR.PAY_TERM

Target:
SAP Supplier Payment Terms

Transformation:
Direct mapping

Status:
Complete
```

The current dataset contains descriptive text rather than SAP-compatible codes.

The mapping row is complete.

The transformation is not operationally sufficient.

The report should therefore distinguish:

- documentation completeness;
- structural validity;
- dataset coverage;
- business approval;
- implementation;
- test result.

## 4. Dataset evidence

The report should use the actual dataset planned for the migration stage, or a clearly comparable representative dataset.

Evidence should include:

- extraction date;
- source system;
- record count;
- filters;
- file or table structure;
- keys;
- scope;
- profile results.

For critical fields, report:

- column presence;
- completeness;
- observed values;
- format validity;
- uniqueness;
- reference integrity;
- mapping coverage;
- contextual coverage.

SAP states that automated S/4HANA processes rely heavily on clean and correct master data and recommends curating master data early, before implementation.

A readiness report should turn that general principle into measurable evidence against the actual target model.

## Dataset evidence should be model-aware

A generic profile may state:

```text id="readiness-09"
CUSTOMER_TYPE:
92% complete
```

A model-aware report adds:

```text id="readiness-10"
Target attribute:
Customer Group

Required population:
Active B2B customers

Relevant completeness:
78%

Observed values covered by approved mapping:
96%

Unmapped critical values:
STRAT, KEY

Affected records:
4,620
```

The second view supports a migration decision.

The first is only a descriptive statistic.

## Measure the applicable population

Global averages can hide concentrated failure.

Suppose a tax field is:

- 96% complete globally;
- 99% complete for Germany;
- 84% complete for Portugal;
- 38% complete for one legacy source.

The relevant readiness conclusion depends on the migration scope.

The report should preserve:

- country;
- source system;
- organisational context;
- record status;
- migration wave.

A field may be ready for one wave and not ready for another.

## Report observed value coverage

For categorical fields, completeness is not enough.

The source may be fully populated while the transformation covers only part of the values.

Report:

- distinct values observed;
- record frequency;
- mapped values;
- unmapped values;
- invalid values;
- obsolete values;
- defaulted values;
- ambiguous values.

Example:

| Source value | Records | Treatment | Status |
|---|---:|---|---|
| A1 | 48,120 | Maps to 01 | Approved |
| A2 | 9,881 | Maps to 01 | Approved |
| B1 | 7,104 | Maps to 02 | Approved |
| STRAT | 1,442 | No approved treatment | Blocker |
| UNKNOWN | 963 | Proposed temporary value | Pending decision |

This makes the risk visible in business terms.

## Report key and relationship readiness

Master-data migration is not only field population.

The report should examine:

- source keys;
- target identifiers;
- duplicate keys;
- cross-reference tables;
- parent-child relationships;
- organisational extensions;
- role dependencies;
- partner relationships;
- referential integrity.

Examples of blockers include:

- supplier company-code records without a central supplier;
- customer sales-area records with unknown sales organisations;
- contact persons without valid parent Business Partners;
- product hierarchies with missing parents;
- legacy keys duplicated across source systems.

A dataset can have high field completeness and still be impossible to load coherently.

## 5. Target implementation evidence

The target system must be able to receive and govern the intended data.

Evidence may include:

- required target attributes exist;
- value lists are configured;
- validation rules are available;
- derivations behave as approved;
- migration objects or interfaces include required fields;
- workflow behaviour is understood;
- replication supports critical attributes;
- relevant environment and release are identified.

SAP currently positions MDG around governed models, validated values, monitored business rules, collaborative workflow and auditability.

A readiness report should not merely state that MDG is available. It should show that the configured target behaviour required for this migration scope exists and has been verified.

## Distinguish target design from target availability

A target field may be approved in the model but unavailable in the current environment.

Possible causes include:

- pending transport;
- incomplete extension;
- wrong release;
- missing value list;
- interface not updated;
- role configuration incomplete.

The report should distinguish:

```text id="readiness-11"
Target model approved
```

from:

```text id="readiness-12"
Target implementation available in the test environment
```

Both may be required before a meaningful mock load.

## 6. Test and reconciliation evidence

A migration load is not proven by successful technical execution alone.

The report should include:

- records extracted;
- records transformed;
- records loaded;
- records rejected;
- records activated;
- records reconciled;
- critical field comparison;
- relationship comparison;
- financial or operational reconciliation where relevant.

For each stage, explain the denominator.

Example:

```text id="readiness-13"
Source records:
100,000

Records in migration scope:
92,000

Records transformed:
92,000

Records loaded:
90,800

Expected exclusions:
700

Unexpected failures:
500

Successfully reconciled:
90,600
```

A headline “98.7% load success” hides whether the remaining records are harmless historical exclusions or active high-value suppliers.

## Reconciliation should be risk-based

Not every field requires the same level of evidence.

Prioritise:

- identifiers;
- legal names;
- tax data;
- bank details;
- organisational assignments;
- payment terms;
- critical classifications;
- status;
- relationships;
- fields driving workflow, pricing or compliance.

For critical fields, evidence may require:

- source-to-target value comparison;
- aggregate counts;
- sample review;
- exception analysis;
- owner sign-off.

## Link test evidence to mappings and rules

A test case should identify what it proves.

For example:

```text id="readiness-14"
Test:
TC-SUP-118

Proves:
- MAP-ERP-A-SUPPLIER-RISK
- RULE-SUPPLIER-RISK-REQUIRED
- VLIST-SUPPLIER-RISK
- QAS release R3 candidate 2
- dataset ERP_A_2026_07_10
```

When a mapping or rule changes, the report can identify which evidence is stale.

Without this link, the programme may count a previously passed test after the underlying model changed.

## 7. Ownership and exception evidence

Every material gap should have:

- owner;
- decision status;
- treatment;
- due date;
- affected population;
- business impact.

An issue is not controlled merely because it exists in Jira.

The report should show whether the issue has a credible path to resolution.

For example:

```text id="readiness-15"
Gap:
1,442 active suppliers have source value STRAT
with no approved target mapping.

Owner:
Global Procurement Data Owner

Decision due:
18 July

Migration impact:
Blocks Supplier Classification for Mock Load 2

Current status:
Not ready
```

Compare that with:

```text id="readiness-16"
Gap:
963 inactive historical suppliers use temporary value MIGRATION_REVIEW.

Approval:
Accepted for Mock Load 2

Owner:
Migration Data Lead

Expiry:
Must be remediated before production cutover.

Current status:
Ready with controlled condition
```

The difference is governance, not only defect count.

## Accepted exceptions need evidence

A readiness report should not hide exceptions to produce a green result.

It should show:

- what criterion is not met;
- why proceeding is acceptable;
- which population is affected;
- what controls reduce risk;
- who approved the exception;
- when it expires;
- what happens if it is not resolved.

Useful exception categories include:

- known low-risk data gap;
- temporary migration default;
- deferred inactive population;
- unavailable non-critical field;
- planned later enrichment;
- environment limitation;
- accepted manual reconciliation.

A waived blocker without ownership and expiry is not a controlled exception.

## Build the report from traceable evidence

Every major readiness claim should point to supporting evidence.

Claim:

> All critical target fields have approved source treatment.

Evidence:

- model baseline;
- mapping report;
- list of critical attributes;
- validation result;
- accepted exceptions.

Claim:

> Current dataset values are covered.

Evidence:

- dataset version;
- profile result;
- value-mapping coverage;
- uncovered values;
- execution timestamp.

Claim:

> Target validation is ready.

Evidence:

- rule reference;
- environment;
- test case;
- observed result.

The report should allow a reviewer to move from summary to evidence without asking the author to reconstruct the analysis.

## Evidence should be reproducible

A reviewer should be able to rerun or independently verify the important checks.

Record:

- command or procedure;
- input versions;
- ruleset;
- result;
- timestamp;
- responsible owner.

For deterministic model validation, this might include:

```text id="readiness-17"
Model commit:
abc123

Validator version:
0.4.1

Validation command:
martenweave validate

Result:
0 errors
3 accepted warnings
```

For dataset profiling:

```text id="readiness-18"
Dataset:
supplier_erp_a_2026-07-10.csv

Profile rules:
Supplier readiness ruleset 1.8

Result:
2 blockers
5 warnings
```

Reproducibility improves trust and reduces debate over manually prepared percentages.

## Use thresholds carefully

Thresholds are useful when tied to business consequence.

Weak criterion:

```text id="readiness-19"
Data completeness must exceed 95%.
```

Stronger criterion:

```text id="readiness-20"
Legal Name and Country:
100% for active suppliers.

Payment Terms:
99.5% for suppliers with open purchasing relationships.

Secondary phone:
No blocking threshold.
```

One universal percentage creates false precision.

A missing tax identifier and a missing secondary phone number should not contribute equally to readiness.

## Use weighted readiness only as a summary

A score can help management compare trends.

It should not replace blocker logic.

For example:

```text id="readiness-21"
Overall readiness score:
92%
```

The report must still show:

```text id="readiness-22"
Decision:
Not ready

Reason:
No approved identifier treatment for 8% of active suppliers.
```

A high weighted score cannot neutralise a critical blocker.

We prefer:

- hard blockers;
- controlled conditions;
- weighted supporting indicators.

## A practical readiness scorecard

A useful high-level scorecard might contain:

| Dimension | Status | Evidence | Main concern |
|---|---|---|---|
| Scope stability | Ready | Scope baseline 1.8 | None |
| Model completeness | Ready with condition | 2 approved deviations | Local ownership pending |
| Mapping readiness | Not ready | 97% critical mappings dataset-validated | 3 mandatory attributes lack treatment |
| Dataset readiness | Not ready | Profile dated 10 July | Unmapped supplier classifications |
| Target readiness | Ready | QAS R3 candidate 2 | None |
| Test readiness | Ready with condition | 88% critical tests passed | 4 stale cases |
| Ownership | Ready | All blockers assigned | One decision overdue |

This is more informative than a single green percentage.

## Separate blocker, risk and action

Reports often mix these concepts.

### Blocker

A condition that prevents the migration decision.

Example:

> Required target key cannot be generated for 12% of records.

### Risk

A possible adverse outcome that does not necessarily block the current stage.

Example:

> Temporary supplier classification may increase post-load remediation effort.

### Action

Work required to remove a blocker or reduce a risk.

Example:

> Procurement owner to approve treatment for STRAT values by 18 July.

Keeping these separate improves decision clarity.

## Include what changed since the previous report

Readiness is a movement over time.

The report should show:

- new blockers;
- resolved blockers;
- changed scope;
- mapping changes;
- new dataset findings;
- expired exceptions;
- tests invalidated;
- target release changes.

For example:

```text id="readiness-23"
Since previous readiness review:

Resolved:
- Missing Payment Terms mapping for ERP_A
- Target value 09 configured in QAS

New:
- ERP_B extract removed CUSTOMER_CLASS column
- Decision DEC-0082 changed Tax ID rule
- 6 related test cases now require rerun
```

This prevents the steering committee from seeing only the current colour without understanding the direction and volatility.

## Report evidence freshness

Old evidence may no longer prove the current state.

For each evidence item, assess:

- model version;
- dataset version;
- target release;
- test date;
- relevant changes since execution.

Useful freshness states include:

- current;
- potentially stale;
- invalidated;
- historical only.

A test is invalidated when its mapping, rule, context or target implementation changes materially.

It should not remain counted as passed.

## A worked example: supplier migration readiness

The programme wants to proceed with Mock Load 2 for 80,000 active suppliers.

### Scope

- ERP_A and ERP_B;
- three countries;
- central and company-code data;
- bank details excluded from this cycle.

Status: Ready.

### Model

- 74 critical attributes;
- 72 approved;
- two under controlled temporary decisions.

Status: Ready with conditions.

### Mappings

- 74 critical attributes;
- 71 dataset-validated;
- three mandatory attributes have no approved ERP_B treatment.

Status: Not ready.

### Dataset

- all required columns present in ERP_A;
- one required column absent in ERP_B;
- six uncovered classification values;
- 430 duplicate source keys;
- 97 supplier-company-code records have no central parent.

Status: Not ready.

### Target

- required attributes and value lists available in QAS;
- one local validation transport pending.

Status: Ready with condition.

### Testing

- technical load executed for ERP_A sample;
- ERP_B not yet tested against current mapping;
- four critical test cases refer to model baseline 1.7 rather than 1.8.

Status: Not ready.

### Ownership

- all gaps assigned;
- two decisions due after planned load start.

Status: Not ready.

### Decision

Do not begin the full Mock Load 2.

Proceed only with a controlled ERP_A technical subset while ERP_B mapping and relationship blockers are resolved.

This conclusion is more useful than stating that the programme is “92% ready.”

## Another example: ready with controlled conditions

A customer migration has one known issue:

- 1.2% of inactive historical customers lack a non-critical classification;
- records are not used in active processing;
- an approved temporary value exists;
- the population can be identified;
- remediation is assigned before archive conversion;
- no critical interface consumes the value.

The report may conclude:

```text id="readiness-24"
Ready with controlled condition.
```

The exception should remain visible.

This is not the same as pretending the data is complete.

## The readiness report should support different readers

One report can have several layers.

## Steering view

Contains:

- decision requested;
- overall conclusion;
- blockers;
- accepted conditions;
- business impact;
- required management decisions.

## Delivery view

Contains:

- evidence by dimension;
- owners;
- due dates;
- dependencies;
- changed status.

## Technical evidence

Contains:

- validation results;
- dataset profiles;
- object identifiers;
- commands;
- model versions;
- detailed findings.

This avoids forcing executives to review field-level detail while preserving traceability for specialists.

## Avoid narrative optimism

Readiness reports often use language such as:

- largely complete;
- mostly aligned;
- minor issues remain;
- no major concern expected;
- work is progressing.

These phrases should be backed by defined evidence.

For example:

Instead of:

> Value mapping is largely complete.

Use:

> Approved mappings cover 99.2% of in-scope records. The remaining 0.8% consists of two unapproved values affecting 640 active customers and remains a blocker.

Specificity improves decisions.

## Do not hide uncertainty

The report may contain areas where evidence is insufficient.

Examples:

- source definition unclear;
- dataset not representative;
- target transport pending;
- ownership disputed;
- test result unavailable.

Mark these as unknown.

Unknown is not the same as failed.

It is not ready evidence either.

A programme takes risk when it converts unknown into assumed green.

## Use evidence confidence carefully

Confidence can describe the strength of available evidence.

Example levels:

### High

Current deterministic result, verified against the stated baseline.

### Medium

Representative evidence exists, but scope or freshness is limited.

### Low

Conclusion relies on expert judgement or incomplete artefacts.

### Unknown

No reliable evidence exists.

Confidence should not replace readiness status.

A critical field with low-confidence evidence may be a blocker even when the team expects it to work.

## Make readiness criteria visible before teams report status

Teams should know how their work will be evaluated.

For example, mapping readiness requires:

- valid endpoints;
- approved context;
- transformation;
- dataset coverage;
- owner;
- implementation;
- required test.

This prevents last-minute disputes about whether a mapping marked complete is genuinely ready.

The criterion should be simple enough to use during delivery.

## Generate issues directly from evidence gaps

A readiness finding should be actionable.

For example:

```text id="readiness-25"
Finding:
Observed source value STRAT has no approved target treatment.

Affected object:
MAP-SUPPLIER-CLASS-ERP-B

Affected records:
1,442

Severity:
Blocker

Required action:
Business owner approves mapping, remediation or exclusion.

Validation:
Rerun value-coverage check against current dataset.
```

This can become a well-scoped Jira issue.

The issue should remain linked to the model object and readiness finding.

Closing the issue should require new evidence, not only a status update.

## Readiness should be recalculated after material changes

Trigger a new readiness assessment when:

- scope changes;
- model baseline changes;
- dataset changes;
- mappings change;
- target release changes;
- critical rules change;
- accepted exceptions expire;
- major defects are fixed.

A readiness result is not transferable automatically to another model or dataset version.

## The role of deterministic validation

Deterministic checks provide the foundation for evidence-based reporting.

They can verify:

- unique identities;
- valid references;
- active mappings using active endpoints;
- required ownership;
- complete contextual links;
- valid value-list references;
- missing dataset columns;
- uncovered source values;
- expired deviations.

These findings are repeatable.

They should be included directly in the report rather than manually reinterpreted into optimistic status.

## The role of human judgement

Not every readiness question can be automated.

People must decide:

- whether a source field preserves the correct meaning;
- whether a default is acceptable;
- whether a local exception is justified;
- whether an unresolved population can proceed;
- whether a test sample is representative;
- whether the remaining risk is acceptable for the milestone.

The report should make those decisions explicit.

It should not hide them behind automated scores.

## Where Martenweave fits

Martenweave is designed to turn scattered model knowledge into structured, validated and traceable objects.

Its current public product description includes:

- connections between fields, attributes, rules, owners, issues and decisions;
- reference validation;
- dataset and model gap detection;
- impact analysis;
- reviewable PatchProposals.

The current core includes:

- canonical Markdown and YAML model files;
- deterministic validation;
- generated SQLite and JSONL indexes;
- search and structured query;
- trace and impact analysis;
- dataset profiling and gap detection;
- health, analysis, ownership, audit and scorecard reports;
- CSV and XLSX review flows;
- PatchProposal-to-ChangeRequest lifecycle;
- GitHub-ready issue and change bundles.

These capabilities support an evidence-based readiness process because the report can be generated from connected objects rather than assembled manually from unrelated status updates.

## A Martenweave readiness flow

```text id="readiness-26"
Approved model baseline
        ↓
Current dataset profile
        ↓
Deterministic validation
        ↓
Mapping and value coverage
        ↓
Target and test evidence
        ↓
Gap and ownership analysis
        ↓
Readiness scorecard
        ↓
Issue or PatchProposal
        ↓
Human readiness decision
```

Martenweave should prepare the evidence.

It should not make the final business decision automatically.

## A minimum Martenweave-based report

A practical first report can contain:

1. Decision and scope.
2. Model and dataset baselines.
3. Structural validation result.
4. Critical-attribute coverage.
5. Source-to-target mapping status.
6. Dataset completeness by applicable population.
7. Value-mapping coverage.
8. Key and relationship integrity.
9. Target implementation readiness.
10. Current test evidence.
11. Open blockers and controlled conditions.
12. Ownership and due dates.
13. Changes since previous baseline.
14. Final recommendation requiring human approval.

This is enough to improve decision quality without building a large programme dashboard.

## How AI can help

AI can assist by:

- summarising validation findings;
- grouping related gaps;
- drafting the executive narrative;
- identifying contradictory status claims;
- proposing likely affected objects;
- creating issue drafts;
- explaining technical findings in business language;
- comparing the current report with the previous baseline.

AI should not convert missing evidence into a positive readiness judgement.

It should not decide:

- whether an exception is acceptable;
- whether a dataset is representative;
- whether business risk is tolerable;
- whether production migration should proceed.

The safe pattern is:

```text id="readiness-27"
Tools produce evidence.
AI organises and explains it.
Responsible owners decide.
```

## Readiness anti-patterns

### One overall percentage

It hides critical blockers and different evidence quality.

### Counting completed mapping rows

A row can be complete without being valid, implemented or tested.

### Using the previous dataset profile

Readiness must refer to the current extract or a justified equivalent.

### Counting stale tests

Evidence is invalidated by material model and implementation changes.

### Reporting issue status as evidence

Closed does not mean the underlying model or data changed correctly.

### Hiding accepted exceptions

Controlled conditions should remain visible.

### Treating unknown as green

Missing evidence is not positive evidence.

### Using global averages

They can hide local or source-specific failure.

### Reporting only data quality

Model, mapping, target and ownership readiness also matter.

### Producing a report with no explicit decision

The reader should know exactly what approval is being requested.

## What managers should ask

1. What exact migration decision does this report support?
2. Which model, dataset and target versions were assessed?
3. What are the hard blockers?
4. Which conditions are accepted, by whom and until when?
5. Do mandatory target fields have approved source treatment?
6. Are observed source values covered by current mappings?
7. Are key and relationship structures valid?
8. Is the current target environment able to receive the data?
9. Which tests prove the current baseline?
10. Which evidence is stale or missing?
11. What changed since the previous readiness review?
12. Which result is based on judgement rather than deterministic evidence?
13. Can the critical findings be reproduced?
14. What happens if the programme proceeds despite each blocker?

If the report cannot answer these questions, it is primarily a status report.

## When a lightweight report is sufficient

A small migration may use a controlled spreadsheet containing:

- readiness criteria;
- dataset version;
- critical mappings;
- profile results;
- blockers;
- ownership;
- decision.

This may be enough when:

- one source system is involved;
- scope is stable;
- mappings are simple;
- the team is small;
- local variation is limited.

A registry-based report becomes more valuable when:

- several sources and countries are involved;
- model versions change frequently;
- datasets arrive repeatedly;
- mappings and rules are highly connected;
- multiple partners report status separately;
- evidence must support audit or handover;
- AI agents use the model context.

## Our conclusion

An evidence-based migration readiness report should not reward the programme for completing activities.

It should help responsible people decide whether the current migration state is safe enough for a defined next step.

That requires evidence across:

- scope;
- model;
- mappings;
- datasets;
- target implementation;
- tests;
- ownership;
- exceptions.

The report should be:

- baseline-specific;
- reproducible;
- risk-based;
- contextual;
- explicit about uncertainty;
- traceable to model objects and evidence.

The practical test is:

> Can every green or ready statement be traced to current evidence, and can every exception be traced to an accountable decision?

When the answer is yes, the report supports governance.

When the answer is no, the programme has a visually convincing dashboard built on assumptions.

The purpose of readiness reporting is not to make the programme look ready.

It is to make the decision to proceed explainable.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We build practical model-governance infrastructure for SAP migration, MDG, MDM and AMS teams. Martenweave is designed to connect model baselines, mappings, datasets, rules, decisions and ownership so that migration readiness can be supported by evidence rather than manually assembled status.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer supporting governed models, validated values, centrally managed business rules, collaborative workflow, data-quality monitoring and auditable data changes. SAP also recommends curating clean and correct master data early before an SAP S/4HANA implementation.

Martenweave’s current public documentation describes structured model objects, deterministic validation, dataset and model gap detection, trace and impact analysis, reporting, spreadsheet review flows and controlled PatchProposal and ChangeRequest lifecycles.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
