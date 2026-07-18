# How to Separate Design-Time Lineage from Runtime Evidence

**Reviewed: 14 July 2026**

A migration design states:

```text
CRM Segment
+
Sales Area
→ Customer Group enrichment
→ SAP KNVV-KDGRP
```

The Mapping is approved.

The source fields are registered.

The target endpoint is known.

The Rule says Customer Group must be present before Customer Sales Area activation.

This is the intended lineage.

Then Mock Load 3 runs.

The output shows that `KNVV-KDGRP` was populated for 98.7 percent of records.

At first, the result appears to confirm the design.

A closer review finds that:

- the Sales Area field was absent from one extract;
- a transformation script used a default value;
- the default was not documented in the approved Mapping;
- 640 records followed the fallback path;
- the load report did not identify those records separately;
- the target field was technically complete but not fully source-derived.

The approved design did not execute as intended.

The runtime result was not a simple failure either.

Most records followed the approved path. Some did not.

A useful model must preserve both facts:

```text
Design-time lineage:
what should happen

Runtime evidence:
what happened in one observed execution
```

These two layers are related.

They must not be collapsed.

> Design-time lineage describes an approved dependency model. Runtime evidence describes a particular observation of an implementation operating against particular inputs at a particular time.

OpenLineage formalises a similar separation. Its current object model uses design-time `JobEvent` and `DatasetEvent` records for declared metadata, while `RunEvent` describes a specific execution occurrence and its state. Design events are not associated with a run; runtime events represent observations such as a job starting or completing.

For Martenweave, the distinction should be:

```text
Canonical model objects
→ approved design-time lineage

Datasets, validation results, load reports and execution observations
→ runtime Evidence
```

The canonical path should not be rewritten merely because one run behaved differently.

The runtime discrepancy should become a Finding, Evidence object or PatchProposal candidate.

---

# Why the distinction matters

Without separation, two dangerous shortcuts appear.

## Shortcut 1: implementation becomes truth

A transformation happens to use a source field.

The model is updated automatically to reflect it.

No one verifies whether:

- the field is authoritative;
- its meaning matches the Attribute;
- the path was temporary;
- a defect caused the behaviour;
- the implementation violated an approved Decision.

Runtime behaviour silently becomes governance.

## Shortcut 2: design hides reality

The approved Mapping remains in the repository.

Every report continues to show the intended path.

Actual migration runs use:

- defaults;
- different fields;
- manual fixes;
- local conversion tables;
- undocumented exclusions.

The design remains elegant while operations diverge.

A trustworthy registry must allow users to ask:

```text
What is approved?

What was observed?

Where do they differ?

What evidence supports the conclusion?

Who must decide what happens next?
```

---

# Design-time lineage

Design-time lineage represents the stable, reviewable model of how data is intended to move and transform.

It may include:

- source Systems and Applications;
- source FieldEndpoints;
- expected DatasetFields;
- Mappings;
- TransformationRules;
- business Attributes;
- Rules;
- target FieldEndpoints;
- interfaces;
- Decisions;
- source authority;
- fallback policy;
- applicability;
- effective periods.

Example:

```text
FEP-CRM-CUSTOMER-SEGMENT
+
FEP-LEGACY-SALES-AREA
→ MAP-CUSTOMER-GROUP-ENRICHMENT
→ ATTR-CUSTOMER-GROUP
→ FEP-S4-KNVV-KDGRP
```

The design states that:

- CRM Segment is a direct input;
- Sales Area is contextual input;
- the transformation is enrichment rather than direct copying;
- the result represents Customer Group;
- the SAP target is `KNVV-KDGRP`.

This path should be versioned, validated and approved independently of any particular migration execution.

Martenweave already uses canonical files as the source of truth, validates IDs, types and references before indexing, and then runs lineage and impact analysis over generated projections. AI-assisted changes remain proposals until human review.

---

# Runtime evidence

Runtime evidence records an observation of the implemented process.

For example:

```text
Run:
MOCK-LOAD-3-CUSTOMER

Started:
2026-07-12 22:10 UTC

Input:
customer_wave3_extract.csv

Transformation:
customer_transform version 3.8.2

Output:
customer_sales_area_load.csv

Result:
98.7% Customer Group populated
```

A stronger runtime record also captures:

- canonical baseline used;
- Mapping or Rule versions expected;
- source dataset fingerprint;
- output dataset fingerprint;
- implementation version;
- start and completion times;
- row counts;
- rejected rows;
- fallback counts;
- validation results;
- target-load result;
- known errors;
- links to restricted execution logs.

OpenLineage models a `Run` as one occurrence of a `Job` in time. Individual runs carry a unique run identity, while more stable Job and Dataset metadata is represented separately.

This pattern is useful for Martenweave:

```text
Mapping:
stable design object

Execution:
one observed application of that Mapping

Evidence:
summary and provenance of what occurred
```

---

# A run is not a model object

An approved Mapping might operate thousands of times.

Creating a new canonical Mapping for every execution would produce noise and confuse design with operations.

Use separate identities:

```text
MAP-CUSTOMER-GROUP-ENRICHMENT
```

and:

```text
RUN-MOCK3-CUSTOMER-2026-07-12
```

The Mapping answers:

> What transformation is approved?

The run answers:

> When and how was an implementation executed?

The Evidence object answers:

> What relevant result was observed and what claim does it support?

---

# Evidence should support a claim

A load report by itself is an attachment.

A useful Evidence object explains why the report matters.

Examples:

```text
Claim:
The approved Customer Group Mapping produced a valid target value.

Claim:
The source extract contained all required Sales Area keys.

Claim:
The SAP target field was populated for the approved population.

Claim:
The runtime implementation used an undocumented default.
```

The same execution report may support several claims.

Each claim can have a different conclusion.

Example:

```text
Source-field availability:
failed

Target-field completeness:
passed

Approved-path conformance:
failed

Technical load execution:
passed with warnings
```

This is more accurate than one overall “Mock Load 3 passed” label.

---

# Design validity and execution success are separate dimensions

A design can be valid while one execution fails.

Examples:

- corrupted input file;
- unavailable server;
- expired credential;
- incomplete extract;
- transient SAP error.

The failed run does not prove that the canonical Mapping is wrong.

Likewise, a run can complete successfully while the design is invalid or bypassed.

Examples:

- undocumented default populated the target;
- stale source was used;
- incorrect values passed technical validation;
- records outside the intended population were excluded;
- manual corrections hid a broken Mapping.

The correct result matrix is:

| Design | Execution | Interpretation |
|---|---|---|
| Valid | Successful and conformant | Strong supporting evidence |
| Valid | Failed | Operational or input defect |
| Invalid | Successful | Implementation may be producing ungoverned results |
| Invalid | Failed | Both model and execution require investigation |
| Unknown | Successful | Result cannot establish governance compliance |
| Valid | Successful but divergent | Implementation drift |

This prevents one green technical status from closing a semantic review.

---

# Five comparison outcomes

When runtime evidence is compared with approved lineage, classify the result.

## Conformant

The observed path matches the approved path within declared tolerances.

Example:

```text
Expected:
CRM Segment + Sales Area
→ enrichment
→ Customer Group

Observed:
same source fields
same transformation version
same target endpoint
```

## Partially conformant

Part of the approved path executed, but some context, population or evidence is missing.

Example:

```text
CRM Segment present
Sales Area absent for 4% of records
```

## Undocumented path

Runtime used an additional or alternative dependency not represented in the canonical model.

Example:

```text
Local conversion workbook used for one country
```

## Contradictory path

Runtime behaviour conflicts with an explicit Mapping, Rule or Decision.

Example:

```text
Approved:
direct CRM equivalence prohibited

Observed:
CRM Segment copied directly to Customer Group
```

## Not observed

The approved path exists but no usable runtime evidence confirms it for the selected period or scope.

This does not prove the path is wrong.

It means it remains unverified.

---

# Design-time objects should remain relatively stable

Canonical design objects should change when:

- business meaning changes;
- source authority changes;
- an approved Mapping changes;
- a Rule changes;
- an endpoint is replaced;
- applicability changes;
- fallback policy changes.

They should not change merely because:

- one run failed;
- one file was malformed;
- one dataset was incomplete;
- a runtime service was unavailable;
- one execution used the wrong version;
- a temporary incident workaround occurred.

Those events belong in Evidence and Findings.

The model changes only after review determines that the approved design itself must change.

---

# Runtime evidence should be immutable

Once recorded, execution evidence should not be edited to make it agree with the model.

If an initial report is wrong:

1. preserve the original report;
2. add corrected Evidence;
3. explain the correction;
4. link supersession or invalidation;
5. retain the original run identity.

Runtime evidence is useful because it records what was observed at that time.

Editing it retrospectively destroys that value.

---

# Corrected interpretation versus corrected execution

Suppose a load report originally states:

```text
Customer Group completeness: 98.7%
```

A later analysis discovers that defaulted values were incorrectly counted as source-complete.

The source report may remain intact.

A new Evidence interpretation can state:

```text
Technical completeness:
98.7%

Authoritative-source completeness:
91.2%

Fallback population:
7.5%
```

The run did not change.

The interpretation became more precise.

This distinction should be visible.

---

# Bind evidence to a canonical baseline

Runtime evidence is difficult to interpret without knowing which model state it tested.

Every significant Evidence object should identify:

- canonical commit or model baseline;
- schema version;
- relevant Mapping and Rule IDs;
- implementation version;
- dataset identity;
- execution time.

Conceptually:

```yaml
id: EVID-MOCK3-CUSTOMER-GROUP
type: Evidence
baseline: CUSTOMER-WAVE3-RC2
commit: abc123
run: RUN-MOCK3-CUSTOMER-2026-07-12
supports:
  - MAP-CUSTOMER-GROUP-ENRICHMENT
  - RULE-CUSTOMER-GROUP-REQUIRED
```

Without a baseline, later reviewers cannot determine whether the evidence verified:

- the current design;
- a superseded Mapping;
- a draft proposal;
- an older value list;
- a different Rule severity.

---

# Bind evidence to datasets

A statement such as:

```text
Customer Group Mapping passed.
```

is incomplete without the tested input.

Record:

- dataset name;
- dataset version;
- checksum or fingerprint;
- source-system snapshot;
- row count;
- applicable population;
- excluded records.

OpenLineage distinguishes more stable Dataset metadata from run-specific input and output facets. It also supports dataset-level and column-level data-quality metrics and assertions as runtime-related observations.

For Martenweave, the canonical Dataset object can describe what is expected.

Runtime Evidence describes the specific dataset instance that was observed.

---

# Dataset definition versus dataset instance

Design-time Dataset:

```text
DATASET-CUSTOMER-WAVE3-EXTRACT
```

defines:

- expected fields;
- keys;
- business scope;
- source;
- owner;
- required formats.

Runtime dataset instance:

```text
customer_extract_2026-07-12.csv
```

has:

- actual columns;
- row count;
- fingerprint;
- extract time;
- profiling results;
- missing fields;
- unexpected fields.

Do not alter the canonical Dataset definition to mirror every malformed extract.

Create a gap report against the expected definition.

Martenweave’s dataset-readiness workflow already orchestrates validation, indexing, profiling and gap detection and can promote detected gaps into a draft PatchProposal rather than silently mutating canonical files.

---

# Bind evidence to implementation version

The same canonical Mapping can be implemented by several technical versions.

Example:

```text
Mapping:
MAP-CUSTOMER-GROUP-ENRICHMENT

Implementation:
customer_transform.py

Version:
3.8.2
```

A later version may fix a defect:

```text
Version 3.8.3:
corrects Sales Area lookup
```

The runtime result must identify which implementation executed.

Otherwise, evidence from the corrected version and defective version becomes indistinguishable.

Where available, record:

- Git commit;
- package version;
- transport;
- configuration version;
- conversion-table version;
- SAP transport or release reference.

---

# Bind evidence to the actual path

Do not assume a configured Mapping was the Mapping that executed.

Runtime evidence should record observed inputs and outputs where possible.

Example:

```text
Declared inputs:
SEGMENT_CODE
SALES_ORG
DIST_CHANNEL
DIVISION

Observed inputs:
SEGMENT_CODE
SALES_ORG

Observed additional input:
DEFAULT_CUSTOMER_GROUP
```

This reveals:

- missing context;
- unapproved fallback;
- partial implementation;
- configuration drift.

Column-level lineage systems use field dependency metadata to show which input columns contribute directly or indirectly to output columns. OpenLineage distinguishes direct derivation from indirect influence such as joins, filters and conditional logic.

A Martenweave Evidence comparison should preserve the same distinction.

---

# Direct and indirect runtime observations

Suppose `CUSTOMER_GROUP` is derived using:

```text
SEGMENT_CODE:
direct input

SALES_ORG:
conditional input

ACTIVE_FLAG:
filter input
```

Runtime Evidence should not reduce this to:

```text
All three fields produced Customer Group.
```

A better record states:

```text
SEGMENT_CODE:
value dependency observed

SALES_ORG:
lookup-selection dependency observed

ACTIVE_FLAG:
population-filter dependency observed
```

This matters when a field is missing or changes.

A missing direct input affects the output value.

A missing conditional input may cause the wrong conversion.

A changed filter affects which records appear at all.

---

# Runtime evidence should be scoped

A result can apply to:

- one migration wave;
- one country;
- one business unit;
- one SAP client;
- one load object;
- one interface version;
- one subset of records.

Example:

```text
Customer Group path verified
for Germany Wave 3 customers only.
```

Do not present it as:

```text
Customer Group lineage verified globally.
```

Evidence scope should be no broader than the observed population.

---

# Positive evidence does not prove universal correctness

One successful run confirms that the path worked for the observed input and conditions.

It does not prove:

- every value combination;
- every country;
- every fallback;
- every organisational context;
- future runs;
- all historical data;
- every implementation environment.

The model should support evidence accumulation.

Example:

```text
Mock Load 1:
basic source path

Mock Load 2:
local exceptions

Mock Load 3:
full Sales Area coverage

Cutover rehearsal:
production-scale volume
```

Together, these provide stronger support.

No single run becomes absolute proof.

---

# Negative evidence does not automatically invalidate design

Suppose a run fails because `SALES_ORG` is missing.

Possible conclusions include:

- dataset extraction failed;
- expected Dataset definition is wrong;
- Mapping requirements are unrealistic;
- source system cannot provide the field;
- source authority decision is incomplete.

The evidence identifies a discrepancy.

Human review determines whether the fix belongs in:

- source extraction;
- implementation;
- canonical Mapping;
- fallback policy;
- business design.

---

# Evidence confidence

A useful classification may include:

## Observed

Directly recorded from a run, dataset or report.

## Reproduced

Observed in more than one controlled execution.

## Verified

Reviewed and accepted as supporting the stated claim.

## Contradicted

Another credible Evidence object conflicts with it.

## Superseded

A later run or corrected analysis replaces its operational relevance.

## Inconclusive

The evidence exists but cannot support a firm conclusion.

Confidence should attach to the claim, not merely the file.

---

# Evidence hierarchy

Different evidence types answer different questions.

## Configuration evidence

Shows what the implementation was configured to do.

Examples:

- Mapping configuration;
- SQL;
- transformation code;
- conversion table.

## Execution evidence

Shows that a run occurred and its technical outcome.

Examples:

- logs;
- run state;
- transport execution;
- job status.

## Data evidence

Shows properties of actual inputs and outputs.

Examples:

- profile;
- row counts;
- null rates;
- value distributions;
- reconciliation.

## Business evidence

Shows acceptance of meaning or outcomes.

Examples:

- owner approval;
- reviewed sample;
- Decision;
- signed validation result.

A successful job log is not business evidence that Customer Group means the right thing.

A business approval is not technical evidence that every record was loaded.

---

# The runtime Evidence object

A practical object may include:

```yaml
id: EVID-MOCK3-CUSTOMER-GROUP
type: Evidence
evidence_type: runtime_lineage
baseline: CUSTOMER-WAVE3-RC2
run_id: RUN-MOCK3-CUSTOMER-2026-07-12
observed_at: 2026-07-12T22:10:00Z
implementation:
  version: 3.8.2
input_dataset:
  id: DATASET-CUSTOMER-WAVE3-EXTRACT
  fingerprint: sha256-example
output_dataset:
  id: DATASET-CUSTOMER-WAVE3-LOAD
claims:
  - claim: target_population_complete
    result: partial
  - claim: approved_mapping_conformance
    result: failed
```

This is a recommended direction rather than the exact current schema.

The object should point to large or sensitive logs rather than embedding them when unnecessary.

---

# Avoid copying production records into the registry

Runtime evidence can be valuable without storing complete business datasets.

Prefer:

- hashes;
- aggregate profiles;
- row counts;
- value distributions;
- sample identifiers under controlled access;
- external restricted references;
- redacted examples.

Avoid placing:

- customer names;
- bank details;
- tax identifiers;
- supplier personal data;
- complete source extracts;

inside the canonical model repository.

Martenweave is a model-governance and evidence layer, not a shadow master-data system.

---

# Runtime evidence can reveal model gaps

A run may expose an unknown source dependency.

Example:

```text
Observed:
COUNTRY_CODE used to select Customer Group conversion table.

Canonical Mapping:
COUNTRY_CODE not declared.
```

The correct response is:

```text
Finding:
Undocumented conditional dependency
```

Then:

1. inspect implementation;
2. determine whether dependency is intentional;
3. assess business meaning;
4. create PatchProposal if the Mapping should change;
5. validate impact;
6. obtain approval.

Do not automatically add the edge merely because it appeared at runtime.

The implementation may itself be wrong.

---

# Runtime evidence can reveal implementation drift

The canonical Mapping remains correct.

The implementation changes without an approved model change.

Example:

```text
Approved:
CRM Segment + Sales Area enrichment

Observed:
CRM Segment direct copy
```

This is implementation drift.

The preferred remediation may be:

- correct the code;
- correct configuration;
- restore conversion table;
- re-run affected records.

Changing the model to match the drift would institutionalise a defect.

---

# Runtime evidence can reveal outdated design

Sometimes the implementation reflects a legitimate change that was never captured.

Example:

- business approved a new source in a meeting;
- implementation changed;
- model repository was not updated;
- several runs confirm the new path;
- source owner accepts the change.

The evidence supports a model-update proposal.

It still does not bypass the proposal process.

The model should change through:

```text
Evidence
→ Finding
→ Decision
→ PatchProposal
→ validation
→ human approval
```

Martenweave’s operating model explicitly places evidence, proposals, validation, gaps and impact before GitHub review, with no silent AI mutation.

---

# Runtime evidence and fallback paths

Fallbacks are particularly important to observe.

The design may declare:

```text
Primary:
Global Customer Reference

Fallback:
manual enrichment when primary value is absent
```

Runtime Evidence should report:

- records using primary path;
- records using fallback;
- fallback reason;
- fallback approval;
- expired fallback use;
- unresolved reconciliation.

A fallback used in 1 percent of records may be acceptable.

A fallback used in 80 percent may indicate that the preferred design is not operationally viable.

Do not automatically promote the fallback to authority.

Create a Finding.

---

# Runtime evidence and source conflicts

Suppose the approved policy says:

```text
Global source wins over ERP replica.
```

Runtime data shows 2,400 conflicting values.

The execution may still select the correct source.

The conflicts are operational evidence that:

- replication may be stale;
- upstream governance is weak;
- fallback could be dangerous;
- reconciliation is needed.

The Evidence should connect to source-policy health, not only to the final target population.

---

# Runtime evidence and Rules

A Rule has at least three relevant states.

## Declared Rule

The canonical behaviour.

```text
Customer Group required before activation.
```

## Implemented Rule

The technical control configured in SAP, migration tooling or MDM.

```text
Missing value produces error.
```

## Observed Rule behaviour

What happened during one run.

```text
42 missing values rejected.
3 missing values passed through an exception route.
```

These states can diverge.

A complete comparison asks:

- Does implementation match declared Rule?
- Did the run exercise the implementation?
- Were exceptions authorised?
- Did the evidence cover relevant contexts?

---

# Runtime evidence and value lists

A Mapping may be approved to produce:

```text
STANDARD
STRATEGIC
HIGH_VALUE
```

A run produces:

```text
01
02
03
UNKNOWN
```

Possible explanations:

- implementation outputs physical SAP codes;
- canonical-to-physical conversion was expected;
- `UNKNOWN` is an undocumented fallback;
- value-list versions differ;
- source data contains invalid values.

The evidence comparison needs the value-domain layer.

A technically populated field can still violate the canonical value model.

---

# Runtime evidence and target systems

A successful output file does not prove successful SAP persistence.

Evidence stages may include:

```text
Transformation output created

Load file accepted

SAP API or migration object processed

Target record created

Target field persisted

Post-load validation passed

Downstream replication completed
```

Each stage supports a different claim.

Do not call the full path verified when only the transformation output was checked.

---

# End-to-end evidence chain

For a critical Attribute, the strongest evidence chain may be:

```text
Source profile
→ Mapping execution
→ transformation validation
→ SAP load result
→ target-field verification
→ downstream reconciliation
→ business owner acceptance
```

A gap at one stage should remain visible.

Example:

```text
Source:
verified

Transformation:
verified

SAP persistence:
verified

Downstream interface:
not tested

Business acceptance:
pending
```

This is more honest than one overall status.

---

# Evidence freshness

Runtime evidence loses relevance when:

- Mapping changes;
- Rule changes;
- value list changes;
- source system changes;
- target endpoint changes;
- implementation version changes;
- dataset scope changes.

A previously verified path may become unverified after a material change.

The evidence itself remains valid historically.

Its applicability to the current model expires.

A freshness check should compare:

```text
Evidence baseline
vs.
current canonical baseline
```

and:

```text
tested implementation version
vs.
current implementation version
```

---

# Invalidation rules

A model change should identify which Evidence objects require reassessment.

Examples:

## Mapping source changed

Invalidate source-profile and Mapping-execution evidence.

## Target endpoint changed

Invalidate load and target-persistence evidence.

## Rule severity changed

Invalidate behavioural test evidence.

## Value meaning changed

Invalidate business-acceptance and historical interpretation evidence.

## Documentation changed only

Evidence may remain applicable.

The result should say:

```text
Evidence remains historically valid.

Current verification status:
stale
```

not delete the evidence.

---

# Evidence coverage

A coverage report should measure claims, not attachments.

Weak metric:

```text
Customer Group has five evidence files.
```

Stronger metrics:

| Claim | Status |
|---|---|
| Authoritative source available | Verified |
| Required context available | Partial |
| Mapping conforms to design | Failed |
| SAP target populated | Verified |
| Fallback within approved scope | Failed |
| Downstream interface verified | Not tested |

This makes evidence gaps actionable.

Martenweave’s current Model Ledger workbench includes evidence coverage, impact context, ownership and validation state, while its governance views combine source, Mapping, Decision, Evidence and approval context.

---

# Evidence aggregation

Several runs can support one design-time claim.

Example:

```text
Mock Load 1:
Germany

Mock Load 2:
Portugal

Mock Load 3:
full Wave 3 population
```

An aggregate assessment might state:

```text
Approved Mapping:
verified for Germany and Portugal

Not verified:
remaining countries

Known exception:
ERP_B population
```

Aggregation should preserve the individual runs.

Do not merge them into one synthetic report without provenance.

---

# Contradictory runtime evidence

Two runs may produce different conclusions.

Example:

```text
Run 184:
Customer Group fallback 2%

Run 191:
Customer Group fallback 37%
```

Possible reasons:

- different population;
- source outage;
- code change;
- conversion-table version;
- configuration drift;
- evidence defect.

The contradiction should create investigation, not average the results automatically.

---

# Failed evidence collection

Sometimes the run occurs, but evidence is incomplete.

Examples:

- logs unavailable;
- dataset fingerprint missing;
- implementation version unknown;
- record counts inconsistent;
- report generated manually;
- scope undocumented.

Classify:

```text
Execution:
reported successful

Evidence quality:
insufficient

Lineage verification:
inconclusive
```

The absence of proof is not proof of failure.

It is still a governance gap.

---

# Runtime Evidence retention

Not every execution needs permanent model-level retention.

Retain detailed Evidence when it supports:

- release approval;
- mock-load sign-off;
- cutover;
- critical defect analysis;
- source-authority Decision;
- exception approval;
- audit requirement.

Routine successful runs may remain in operational logging systems.

Martenweave can retain:

- summary;
- identifiers;
- relevant metrics;
- external references;
- model claims supported.

This keeps the repository useful rather than turning it into a log archive.

---

# Runtime systems remain authoritative for their own logs

Martenweave should not replace:

- ETL monitoring;
- SAP application logs;
- interface monitoring;
- job orchestration;
- incident management;
- data-quality execution platforms.

Those systems remain authoritative for operational execution details.

Martenweave stores or references the Evidence needed to evaluate model truth.

The separation is:

```text
Operational platform:
what executed

Martenweave:
what that execution means for the governed model
```

---

# Evidence and Git

Canonical Evidence summaries can be versioned in Git when they form part of model governance.

Large execution files may remain external.

Git records:

- Evidence object;
- supported claim;
- baseline;
- conclusion;
- references;
- later supersession.

This provides reviewable history without committing every runtime log.

---

# AI use

AI can assist with:

- summarising execution reports;
- extracting observed source and target fields;
- identifying deviations from approved paths;
- classifying failures;
- drafting Findings;
- proposing missing Evidence links;
- generating a test summary.

AI should not autonomously decide:

- that runtime behaviour is correct;
- that the canonical Mapping should be rewritten;
- that one successful run proves universal conformance;
- that a fallback is acceptable;
- that contradictory evidence can be ignored.

The deterministic layer compares IDs, versions, paths and expected fields.

Humans decide whether the discrepancy requires an implementation fix or a model change.

---

# Candidate-state testing

A proposed Mapping or Rule change should be tested without replacing the approved baseline immediately.

The sequence is:

```text
Current canonical model
+
PatchProposal
=
candidate model

candidate model
→ expected lineage
→ test execution
→ runtime Evidence
→ comparison
→ approval decision
```

This allows reviewers to see:

- whether candidate lineage is implementable;
- whether required datasets exist;
- whether target fields are populated;
- whether new Rules behave correctly;
- whether fallback use increases;
- whether downstream consumers remain compatible.

---

# A worked Customer Group example

## Approved design

```text
CRM Segment
+
Sales Area
→ Customer Group enrichment
→ KNVV-KDGRP
```

## Expected Rule

```text
Customer Group required before Sales Area activation.
```

## Mock Load 3 observation

```text
Input records:
50,000

Approved path:
45,600

Manual fallback:
3,760

Undocumented default:
640

Rejected:
0
```

## Initial technical report

```text
Target completeness:
100%
```

## Model-aware assessment

```text
Technical target completeness:
100%

Approved-path conformance:
91.2%

Approved fallback:
7.52%

Undocumented fallback:
1.28%

Readiness:
blocked pending review of undocumented default
```

The runtime execution succeeded technically.

The lineage evidence did not fully conform.

---

# A worked Supplier Risk example

## Approved design

```text
External Risk Score
+
Supplier Category
+
Compliance Status
→ approved derivation Rule
→ Supplier Risk
```

## Observed execution

The external score service was unavailable.

The implementation copied the previous ERP Risk value.

## Result

SAP target populated for every supplier.

## Assessment

```text
Target completeness:
passed

Authoritative-source conformance:
failed

Fallback policy:
not defined

Historical source:
used as undocumented runtime fallback
```

The correct next action is not to declare ERP authoritative.

Create a Finding and decide whether:

- the run must be corrected;
- a bounded fallback should be approved;
- affected values require later reconciliation.

---

# A worked Rule example

## Canonical Rule

```text
Missing Tax Identifier blocks activation.
```

## Implementation

SAP validation is configured as error.

## Runtime Evidence

Five records with missing Tax Identifier became active.

Investigation finds that a manual emergency override was used.

## Assessment

```text
Rule implementation:
present

Observed behaviour:
exception path used

Exception authority:
unknown

Model impact:
no immediate canonical change

Required action:
record and review override policy
```

A runtime exception does not automatically invalidate the Rule.

It exposes an ungoverned exception path.

---

# A worked target-replacement example

## Approved candidate design

```text
Supplier Review Status
→ new standard SAP endpoint
```

## Runtime Evidence

Mock Load 4 confirms:

- new field populated;
- old custom field still populated;
- outbound interface still reads old field;
- validation Rule checks new field;
- report reads old field.

## Assessment

```text
Target replacement:
partially implemented

Canonical Attribute:
stable

Dual-write state:
observed but not fully documented

Downstream continuity:
incomplete
```

The target load succeeded.

The end-to-end lineage transition remains unfinished.

---

# Detection workflow

A practical comparison can follow these steps.

## 1. Select canonical baseline

Identify commit, tag or approved model version.

## 2. Select Evidence scope

Run, dataset, mock load, interface execution or validation report.

## 3. Validate canonical model

Ensure expected paths are structurally coherent.

## 4. Resolve expected lineage

Identify source, Mapping, Attribute, Rules and targets.

## 5. Extract observed lineage

Use logs, profiles, dataset schemas and implementation metadata.

## 6. Compare paths

Classify match, partial match, undocumented path, contradiction or no observation.

## 7. Compare versions

Check Mapping, Rule, dataset and implementation versions.

## 8. Compare scope

Country, wave, organisation and population.

## 9. Evaluate claims

Source availability, transformation conformance, target persistence and business acceptance.

## 10. Generate Findings

Separate implementation drift, data gaps and possible model changes.

---

# Suggested diagnostics

```text
MW-EVID-001
Runtime Evidence has no canonical baseline.

MW-EVID-002
Observed source field differs from approved Mapping.

MW-EVID-003
Required conditional input was not observed.

MW-EVID-004
Runtime used an undocumented fallback.

MW-EVID-005
Evidence verifies a superseded Mapping or Rule.

MW-EVID-006
Implementation version is unknown.

MW-EVID-007
Target completeness passed but approved-path conformance failed.

MW-EVID-008
Evidence scope is narrower than the claimed verification scope.

MW-EVID-009
Observed path contradicts an approved Decision.

MW-EVID-010
Runtime result lacks dataset identity or fingerprint.

MW-EVID-011
Current model changed after Evidence was collected.

MW-EVID-012
Conflicting Evidence exists for the same claim and scope.
```

These diagnostics should not automatically modify canonical lineage.

---

# Release gates

A migration release should be blocked when:

- critical lineage has no runtime evidence;
- runtime uses an unapproved source;
- required context fields are missing;
- undocumented defaults populate mandatory fields;
- target verification is incomplete;
- Evidence belongs to a superseded baseline;
- observed Rule behaviour contradicts the approved control;
- fallback usage exceeds approved scope;
- implementation version cannot be identified;
- contradictory evidence remains unresolved.

Warnings may remain when:

- low-risk downstream paths are not yet tested;
- evidence covers only a subset of countries;
- historical runs have incomplete metadata;
- optional fields lack end-to-end verification.

---

# What Martenweave should implement next

Martenweave already has the main foundations:

- canonical model files;
- deterministic validation;
- Dataset and Mapping objects;
- system lineage;
- Evidence and Decisions;
- dataset readiness;
- lineage and impact analysis;
- PatchProposal workflow;
- Model Ledger evidence coverage.

The next focused vertical slice should be **runtime Evidence comparison**.

## Goal

Compare one observed execution or dataset result with the approved design-time lineage.

## Scope

Support:

- canonical baseline identity;
- run identity;
- input and output dataset fingerprints;
- expected and observed FieldEndpoints;
- implementation version;
- Mapping and Rule references;
- fallback counts;
- validation outcomes.

## Comparison results

- conformant;
- partially conformant;
- undocumented path;
- contradictory path;
- not observed;
- inconclusive evidence.

## Acceptance criteria

For the Customer Group example, the system must distinguish:

```text
Target field populated
```

from:

```text
Approved source and transformation path followed
```

It must report undocumented default usage even when target completeness is 100 percent.

## Existing workflow

```bash
martenweave run dataset-readiness \
  --repo examples/customer_bp_model \
  --dataset customers.xlsx \
  --out ./reports/readiness
```

## Future focused operation

```bash
martenweave evidence-compare \
  --repo examples/customer_bp_model \
  --baseline CUSTOMER-WAVE3-RC2 \
  --run ./evidence/mock-load-3.json
```

The second command describes a recommended direction rather than a current documented CLI contract.

---

# Final perspective

Design-time lineage and runtime evidence answer different questions.

Design-time lineage asks:

> What dependency path has been approved?

Runtime evidence asks:

> What happened during this execution against this input using this implementation?

The complete governance loop is:

```text
approved design
→ implementation
→ runtime observation
→ evidence comparison
→ Finding
→ Decision
→ proposal where required
```

The approved design should not hide runtime divergence.

Runtime behaviour should not silently redefine the design.

The practical test is:

> Can the programme show that Customer Group was populated not only technically, but through the approved source, context, transformation, target and Rule path for the claimed population and baseline?

When the answer is yes, runtime evidence supports the design.

When the answer is only:

> The mock load was green,

the programme has execution status.

It does not yet have lineage conformance.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It separates canonical model truth from observed datasets, validation reports and execution evidence so that implementation behaviour can be compared with approved lineage rather than silently replacing it.

The interactive UI exists as a local Model Ledger prototype for review and investigation. It is not a hosted production application and does not replace the canonical file and validation workflow.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave Core currently treats canonical files as the source of truth, generates disposable indexes, validates references before lineage and impact analysis and routes AI-assisted changes through PatchProposals and human approval.

Martenweave 0.5.0 added a one-command dataset-readiness workflow combining validation, indexing, profiling, gap detection and readiness reporting. It can promote detected gaps into draft PatchProposals and generate issue drafts while preserving human approval.

OpenLineage’s object model separates runtime `RunEvent` observations from design-time `JobEvent` and `DatasetEvent` metadata. It defines a Run as one occurrence of a Job and allows input and output dataset information to be attached to runtime state updates.

OpenLineage’s column-level lineage facet records which input fields contribute to output fields and distinguishes direct value derivation from indirect influences such as joins, filters and conditional logic.

The runtime Evidence object, comparison diagnostics and proposed `evidence-compare` command in this article describe recommended Martenweave improvements. They should not be interpreted as guarantees of the exact current canonical schema or CLI unless separately implemented and published.

Martenweave is independent and is not affiliated with or endorsed by SAP or OpenLineage.
