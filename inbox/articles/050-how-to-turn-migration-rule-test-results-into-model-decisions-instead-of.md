# How to Turn Migration Rule Test Results into Model Decisions Instead of Defect Noise

**Reviewed: 14 July 2026**

The first migration-rule test produces 8,420 failures.

The project creates 8,420 defect records.

Some are grouped by error message. Others are assigned by country, source system or migration object. The testing team reports a large red backlog. The migration team starts correcting records. SAP consultants inspect validation logic. Business owners receive spreadsheets asking them to confirm exceptions.

After two weeks, the backlog has fallen to 5,900.

Then the next extract arrives.

The test produces 7,600 failures.

Many look familiar, but the identifiers have changed. Some corrected records failed again because the source was never fixed. Some “defects” are legitimate non-applicable records. Others expose a missing mapping decision. Several come from one global rule being applied at the wrong organisational level. Hundreds are copies of the same unsupported source value.

The programme is busy.

It is not learning.

This is what happens when every failed rule result is treated as an independent defect.

A test result is an observation.

A defect is only one possible interpretation.

The real work is to determine whether the result points to:

- bad data;
- an extraction problem;
- an incorrect mapping;
- a missing model decision;
- an invalid rule;
- wrong SAP configuration;
- an approved exception;
- a temporary migration treatment;
- a source-system capability gap;
- a test expectation that is itself wrong.

Without this classification, the defect backlog becomes a noisy mixture of records, causes, decisions and implementation tasks.

The backlog grows faster than the model improves.

> A migration programme should not ask only how many records failed. It should ask what kind of model knowledge each failure reveals.

That shift changes testing from record correction into governed model improvement.

---

## The defect factory

Migration testing often follows a straightforward pattern:

```text
Run validation
→ export failures
→ create defects
→ assign owners
→ correct records
→ rerun
```

This works reasonably well for isolated technical errors.

It works poorly for model-level problems.

Suppose 3,200 suppliers fail because source value `S1` has no approved target mapping.

Creating 3,200 defects does not create 3,200 useful work items.

It creates one unresolved value-mapping decision affecting 3,200 records.

Suppose 860 customer records fail because Customer Group is mandatory.

Further analysis shows that:

- 600 are not in an applicable sales area;
- 180 use a source field with different granularity;
- 80 genuinely lack required values.

The initial failure count says 860.

The model work consists of at least three different findings.

A defect-centric process tends to flatten these distinctions.

It optimises for ticket closure rather than explanation.

Atlassian describes Jira as a system for capturing, assigning, prioritising and tracking bugs and other work items through configurable workflows. That is useful once the programme knows what work needs to be done. It does not by itself determine whether a failed migration rule represents a record defect, model ambiguity, source limitation or policy decision.

The limitation is not Jira.

The limitation is sending unclassified test output directly into an issue tracker.

---

## One failed record can represent six different problems

Consider a supplier rejected because Supplier Risk is blank.

The visible condition is simple:

```text
Supplier Risk = blank
```

The underlying explanation may be completely different.

### The record is wrong

The source contains the approved value, but it was not extracted or transformed correctly.

This is a data or pipeline defect.

### The source cannot provide the value

The source process never maintained Supplier Risk.

This is a source-capability gap.

### The rule applies to the wrong population

The supplier is not strategic, but the validation applies to all suppliers.

This is a rule-context or configuration defect.

### The record is legitimately incomplete

The supplier is still under review and should not yet contain a final risk classification.

This may require a separate lifecycle status.

### The value is present under another concept

A field called `RISK_STATUS` contains workflow state rather than final risk classification.

This is a semantic-mapping problem.

### The programme has never decided what should happen

The source lacks the value, no approved default exists, and the business has not selected enrichment, exclusion or review.

This is a model decision gap.

All six produce a blank Supplier Risk result.

They should not become the same defect type.

---

# The translation layer between test and action

A mature testing process needs a translation layer between raw results and delivery work.

The sequence should be:

```text
Raw test result
→ grouped finding
→ root classification
→ model or implementation decision
→ action package
```

The raw result remains important.

It preserves evidence.

But it should not be the primary unit of governance.

The primary unit should be the finding.

A finding groups results that share:

- the same rule;
- the same model context;
- the same observed condition;
- the same likely cause;
- the same treatment.

For example:

```text
Finding:
ERP_B does not provide Supplier Risk for active strategic suppliers.

Affected records:
1,284

Rule:
RULE-SUPPLIER-RISK-ACTIVATION

Sources:
ERP_B

Countries:
DE, AT

Current interpretation:
Source-capability gap

Decision required:
Choose enrichment, exclusion or controlled review treatment.
```

One finding can support several delivery actions:

- business decision;
- source remediation;
- mapping change;
- SAP configuration;
- data correction;
- regression testing.

This is far more useful than 1,284 nearly identical tickets.

---

# A taxonomy that prevents backlog pollution

Every material test finding should be classified before it enters the delivery backlog.

A practical taxonomy can include the following categories.

## Record defect

The approved model, rule and implementation are correct, but one or more records contain wrong data.

Examples:

- invalid date;
- malformed identifier;
- missing approved value;
- duplicate record caused by source entry.

Primary action:

- remediate records;
- correct the originating process where possible.

Model impact:

- usually none.

## Extraction defect

The source contains the required information, but the migration extract omits, truncates or alters it.

Examples:

- missing column;
- incorrect filter;
- lost leading zeros;
- wrong organisational join.

Primary action:

- correct extraction or staging logic.

Model impact:

- none unless the extraction exposed an undocumented source relationship.

## Transformation or mapping defect

The approved source and target concepts are known, but the transformation is wrong.

Examples:

- wrong value conversion;
- incorrect target endpoint;
- context lost during mapping;
- old default still active.

Primary action:

- correct mapping implementation;
- rerun affected population.

Model impact:

- normally none if canonical mapping already states the right behaviour.

## Configuration defect

The approved model is correct, but SAP, an MDM platform or another consuming system implements different behaviour.

Examples:

- global rule applied to persons and organisations;
- warning configured where error was approved;
- workflow skips required local owner;
- retired value still selectable.

Primary action:

- correct configuration;
- verify against the approved rule.

Model impact:

- none unless the approved model is incomplete.

## Model ambiguity

The canonical model does not define the observed case clearly.

Examples:

- rule does not specify lifecycle stage;
- organisational granularity is unclear;
- local exception overlaps a global rule;
- source and target terms have no approved semantic relationship.

Primary action:

- investigate;
- make a model decision;
- update canonical objects.

## Model defect

The approved model itself is wrong or internally inconsistent.

Examples:

- one attribute mixes classification and workflow state;
- cardinality does not reflect business reality;
- value list combines unrelated dimensions;
- global rule contradicts approved local regulation.

Primary action:

- create a reviewed PatchProposal;
- assess impact;
- update implementations after approval.

## Policy or ownership decision

The model identifies the question, but accountable owners have not decided the required business treatment.

Examples:

- whether a default is acceptable;
- who owns a derived classification;
- whether local variation should become global;
- which source is authoritative.

Primary action:

- decision record;
- named authority;
- explicit alternatives and consequences.

## Approved exception

The result fails the normal rule but complies with an approved contextual exception.

Primary action:

- preserve evidence;
- do not count as an ordinary defect;
- verify that the exception scope and expiry remain valid.

## Temporary deviation

The permanent model remains unchanged, but the programme has approved bounded temporary behaviour.

Examples:

- load permitted but activation blocked;
- warning allowed during Mock Load 2;
- manual enrichment until source release.

Primary action:

- operate the control;
- track expiry;
- verify convergence.

## Test-specification defect

The expected result is wrong.

Examples:

- test assumes a field is mandatory for all suppliers;
- expected value comes from a superseded mapping;
- scenario ignores an approved local exception.

Primary action:

- correct the test;
- link it to the current rule baseline.

This taxonomy keeps the project from treating every red line as the same type of failure.

---

# Stop creating one defect per record

Record-level traceability is still necessary.

Each affected record should remain identifiable.

But issue creation should follow the treatment unit, not the row count.

Consider 2,600 failed records caused by five conditions:

| Finding | Records | Appropriate work unit |
|---|---:|---|
| Unsupported source value `S1` | 1,400 | One value-mapping decision |
| Missing strategic status in ERP_B | 720 | One source-context gap |
| Incorrect SAP rule scope | 310 | One configuration defect |
| Expired exemption evidence | 140 | Remediation population |
| Corrupted identifiers | 30 | Record-level correction batch |

The programme may create five primary work items, not 2,600.

Each work item should retain the affected-record list as evidence.

This produces a backlog that reflects actual decisions and implementation changes.

---

# Grouping by error message is not enough

Two records can show the same error message while having different causes.

Likewise, one root cause may produce several messages.

Example:

```text
Message:
Supplier Risk is required.
```

Potential causes:

- missing final value;
- wrong applicability;
- missing strategic-status input;
- temporary review state;
- old mapping removed the value;
- target rule executed too early.

Grouping only by message creates false unity.

A stronger grouping key uses:

- canonical rule ID;
- model object;
- effective context;
- lifecycle stage;
- source system;
- observed condition;
- suspected cause.

For example:

```text
Rule:
RULE-SUPPLIER-RISK-ACTIVATION

Context:
Country = PT
Supplier type = regulated
Stage = activation

Condition:
Risk missing
Review status = pending

Classification:
Expected block, not defect
```

The same visible error becomes an approved rule outcome.

---

# A failed rule can be evidence that the rule works

This distinction is routinely lost in defect reporting.

Suppose a Portuguese regulated supplier has:

- Supplier Risk = `HIGH`;
- Review Status = `PENDING`;
- Activation attempted.

The system blocks activation.

The test result is technically a failure to complete activation.

It is a successful rule result.

A good report separates:

```text
Expected prevention
Unexpected failure
Unexpected pass
Unevaluable
Approved exception
```

The categories matter.

### Expected prevention

The system correctly blocked an invalid state.

No defect exists.

### Unexpected failure

A record that should pass was blocked.

Possible configuration, data or model problem.

### Unexpected pass

A record that should be blocked succeeded.

Usually more serious because the control failed silently.

### Unevaluable

Required context was missing or contradictory.

The programme cannot determine the right outcome.

### Approved exception

The record followed a valid contextual or temporary treatment.

A report that marks every blocked record as failed will punish the controls for working.

---

# Unexpected passes deserve more attention than visible failures

A rejected record is visible.

An incorrectly accepted record may enter production unnoticed.

Examples include:

- missing Supplier Risk defaulted to `STANDARD`;
- expired exemption accepted;
- local process status treated as final classification;
- person record accepted under an organisation-only rule;
- invalid value mapped to a valid-looking target.

These conditions often appear in dashboards as successful loads.

A migration test should therefore search for false success.

Useful checks include:

- records receiving defaults;
- values created by fallback logic;
- rules bypassed by missing context;
- accepted records with contradictory source evidence;
- exceptions without approval;
- activation completed while temporary status remains.

The programme should create findings for unexpected passes even when no SAP error message exists.

---

# The triage ledger

A useful migration-rule triage ledger is not a list of every failed row.

It is a list of findings.

| Finding ID | Rule | Population | Classification | Decision state | Primary owner |
|---|---|---:|---|---|---|
| FIND-001 | Supplier Risk required | 1,284 | Source-capability gap | Decision required | ERP_B owner |
| FIND-002 | Tax ID applicability | 310 | Configuration defect | Treatment known | MDG architect |
| FIND-003 | Customer Group mapping | 642 | Model ambiguity | Investigation open | Customer owner |
| FIND-004 | Exemption expired | 140 | Record remediation | No model change | Local steward |
| FIND-005 | `STANDARD` default | 2,110 | Unexpected pass/model risk | Patch proposed | Global risk owner |

The ledger should answer:

- what happened;
- how many records are affected;
- which canonical object or rule is involved;
- what type of problem it is;
- whether a decision is needed;
- what action should follow;
- which evidence supports the classification.

This can coexist with Jira or ServiceNow.

The issue tracker manages execution.

The ledger preserves the relationship between test evidence and model meaning.

---

# One finding may need several linked tickets

A source-capability gap can require:

- business-decision ticket;
- source remediation;
- temporary enrichment;
- migration-script change;
- SAP validation update;
- test update;
- data correction.

The project should not force all work into one giant ticket.

It should preserve one parent finding and create linked implementation tasks.

For example:

```text
FIND-ERP-B-SUPPLIER-RISK
├── DECISION: approve temporary review treatment
├── SOURCE: add Supplier Risk to ERP_B feed
├── MIGRATION: implement enrichment queue
├── SAP: block activation while pending
├── TEST: add lifecycle scenarios
└── DATA: remediate current population
```

This structure prevents teams from closing the finding when only one task is complete.

---

# The model decision gate

Not every finding should change the model.

Before creating a PatchProposal, ask four questions.

## Does the approved model already describe the correct state?

When yes, fix data, extraction, mapping or configuration.

Do not rewrite the model to match an implementation error.

## Does the current model omit the observed case?

When yes, investigate whether a new context, value, relationship or lifecycle state is required.

## Is the issue only temporary?

When yes, create a deviation or control, not a permanent semantic change.

## Is the business authority clear?

When no, create a decision request rather than an implementation proposal.

A PatchProposal is justified when evidence indicates that model truth itself may need to change.

Martenweave’s current core explicitly separates proposed changes from approved state: generated `PatchProposal` objects remain reviewable and become `ChangeRequest`s only after human approval.

---

# What a model decision package should contain

When test results justify a model decision, the package should include:

### The test finding

What happened and how often?

### The affected population

Which records, systems, countries and lifecycle states are involved?

### The current canonical model

What does it currently say?

### The contradiction or gap

Why can the existing model not explain or govern the result?

### Alternatives

What treatments were considered?

### Recommended change

Which attribute, mapping, rule, context or lifecycle should change?

### Impact

Which mappings, tests, interfaces, reports and local contexts may be affected?

### Residual uncertainty

Which evidence remains incomplete?

### Approval roles

Who has authority over meaning, context and risk?

The model decision should not be reconstructed from the defect comments after the fact.

---

# A test result can challenge the test model itself

Consider Customer Group.

The test expectation says:

> Every active customer must have one Customer Group.

The migration dataset contains one record per sales area.

Some customers operate in three sales areas and have different values.

The test reports duplicates and inconsistent values.

The defect may not be in the data.

The test expectation assumed central cardinality.

The correct result may be:

```text
Finding:
Test specification uses customer-level cardinality.

Canonical target:
Customer Group is sales-area-specific.

Classification:
Test-specification defect.

Action:
Rewrite the test by sales-area key.
```

This is why the canonical model should be linked to test design.

Otherwise, test scripts become another independent source of model truth.

---

# Repeated remediation is evidence of a missing control

Suppose the same source defect returns in every extract.

The team repeatedly corrects 400 records.

The defect backlog shows successful closure each cycle.

The recurring pattern indicates that record remediation is not enough.

Possible missing controls include:

- source validation;
- extraction check;
- ownership;
- reference-data distribution;
- model rule;
- recurring monitoring;
- source-system change.

A finding should carry recurrence information:

```text
First observed:
Mock Load 1

Repeated in:
Mock Load 2
Mock Load 3

Corrected records:
1,140

Source prevention:
Not implemented
```

After repeated recurrence, the issue should be escalated from remediation to structural treatment.

The exact escalation threshold should be programme-specific.

The principle is stable:

> A defect that returns unchanged is evidence that the programme is correcting outcomes rather than causes.

---

# Compare runs at the finding level

Record identifiers may change between extracts.

Finding identity should remain stable.

For example:

```text
FIND-SUPPLIER-RISK-ERP-B
```

Across runs:

| Run | Affected | New | Resolved | Recurring |
|---|---:|---:|---:|---:|
| Mock Load 1 | 1,284 | 1,284 | — | — |
| Mock Load 2 | 1,050 | 210 | 444 | 840 |
| Mock Load 3 | 1,190 | 390 | 250 | 800 |

This tells a different story from the raw failure count.

The population fell after remediation, then increased because new records entered the source.

The finding remains active.

A simple dashboard showing “1,284 → 1,050 → 1,190” cannot explain whether the control is improving.

---

# Defect severity should follow business consequence, not volume alone

A finding affecting 20 records may be more serious than one affecting 20,000.

High-severity examples:

- strategic suppliers required for cutover;
- legal identifiers for regulated records;
- parent entities used by many relationships;
- incorrect values that allow activation;
- classifications affecting payment or compliance;
- errors that propagate to several systems.

Lower-volume findings may carry systemic risk.

Likewise, a high-volume format correction may be operationally easy and semantically harmless.

Prioritisation should consider:

- affected population;
- business criticality;
- detectability;
- propagation;
- reversibility;
- regulatory consequence;
- cutover dependency;
- recurrence;
- model centrality.

Ticketing tools can prioritise work once these attributes are known. Atlassian’s Jira materials describe assignment, prioritisation, custom workflows, reporting and integration across the software-delivery lifecycle. The model-governance process must provide the classification and consequence that make those prioritisation fields meaningful.

---

# The role of SAP MDG and other operational platforms

SAP currently describes SAP Master Data Governance as a central governance layer for master data, policy and metadata, with governed models, preserved semantics and relationships, profiling, matching, validated values, workflow, data-quality monitoring and audit trails.

That makes SAP MDG an appropriate place to implement and monitor approved master-data behaviour.

It does not mean that every migration test result should become an SAP MDG defect.

A failed result may belong to:

- a legacy source;
- a migration transformation;
- a contextual model decision;
- a test expectation;
- a local process;
- a separate data-quality platform.

The model-governance layer should identify where the treatment belongs before the work is assigned.

---

# Why a ticketing system should not become the model registry

Jira and similar tools are effective for recording, assigning, prioritising and progressing issues through configurable workflows. They can preserve descriptions, severity, versions, screenshots and implementation links.

They become weak as the only model record when:

- one finding creates many tickets;
- tickets close while the model decision remains active;
- several projects use different issue taxonomies;
- the affected canonical objects are only mentioned in prose;
- evidence baselines are not stable;
- issue status is mistaken for model status.

A closed configuration ticket does not prove that:

- the source was corrected;
- the residual population was remediated;
- the canonical rule was updated;
- affected tests were revised;
- local contexts were checked;
- the next extract will pass.

The ticket should link to the model finding.

It should not replace it.

---

# A practical pipeline for Martenweave

Martenweave already supports a backend-first flow in which canonical model files are validated, indexed and compared with datasets. Its current demo workflow includes deterministic validation, generated SQLite and JSONL indexes, search, trace, impact analysis, gap reporting and one-command dataset readiness.

The current dataset-readiness flow can also promote identified gaps into a pending-review `PatchProposal` or generate a GitHub-ready issue draft.

The missing classification layer should sit between readiness output and proposal or issue generation.

```text
Dataset-readiness result
→ finding classification
→ action decision
→ PatchProposal, issue draft or remediation population
```

Without this step, automated issue generation risks accelerating defect noise.

---

# A conceptual finding object

```yaml
id: FIND-SUPPLIER-RISK-ERP-B-001
status: decision_required

rule:
  - RULE-SUPPLIER-RISK-ACTIVATION

model_objects:
  - ATTR-SUPPLIER-RISK
  - FEP-ERP-B-SUPPLIER-RISK
  - MAP-ERP-B-SUPPLIER-RISK

evidence:
  dataset: ERP_B_supplier_extract_2026-07-12
  applicable_records: 1284
  condition: supplier_risk_missing

classification:
  primary: source_capability_gap
  secondary:
    - model_decision_gap

assessment:
  current_model_valid: true
  implementation_defect: false
  record_remediation_required: true
  permanent_model_change_required: unresolved

decision_required:
  question: >
    Select source remediation, controlled enrichment,
    temporary review treatment or exclusion.

owners:
  business:
    - ROLE-GLOBAL-SUPPLIER-RISK-OWNER
  source:
    - ROLE-ERP-B-DATA-OWNER
  migration:
    - ROLE-SUPPLIER-MIGRATION-LEAD
```

This is a conceptual direction, not a claim about the current Martenweave schema.

The important change is that the finding remains stable while individual records, tasks and test runs change.

---

# Deterministic checks can prevent weak triage

Martenweave could validate that:

- every finding references an existing rule or model object;
- affected population and dataset are identified;
- a `model_defect` classification links to a proposal or decision request;
- a `configuration_defect` identifies an implementation reference;
- an `approved_exception` links to a current decision;
- a `temporary_deviation` has expiry;
- a closed finding contains verification evidence;
- a recurring finding cannot be marked resolved without prevention or explicit acceptance;
- one record is not assigned contradictory final treatments;
- proposed patches identify supporting findings.

These checks do not determine the root cause automatically.

They make incomplete triage visible.

---

# What automation may safely do

Automation can help with:

- grouping results by rule and context;
- detecting repeated patterns;
- comparing runs;
- identifying shared source values;
- linking failures to canonical objects;
- finding previous decisions;
- drafting a finding summary;
- suggesting likely classifications.

It should not silently conclude:

> 1,284 missing values mean the field should be optional.

That is a business and model decision.

A safer automated output is:

```text
Observed:
1,284 applicable ERP_B records lack Supplier Risk.

Repeated:
Same pattern appeared in the previous two extracts.

Likely classifications:
- source-capability gap;
- recurring remediation failure.

Not established:
- whether the global rule should change;
- whether a default is valid;
- whether the population may be excluded.
```

This is useful assistance without invented authority.

---

# The triage meeting should decide causes, not read spreadsheets

A focused migration-rule triage should review findings, not individual rows.

For each finding, decide:

1. Is the result expected?
2. Is the rule evaluable?
3. Does the approved model define the case?
4. Does implementation match the model?
5. Is the issue record-specific or structural?
6. Is a decision required?
7. What is the treatment unit?
8. Which owner is accountable?
9. What evidence will prove closure?

The record-level list remains available for remediation.

It should not consume the governance meeting.

---

# Closure should follow the classification

Different finding types need different closure evidence.

## Record defect

- affected records corrected;
- source prevention verified where required;
- next extract checked.

## Extraction defect

- extraction logic changed;
- source-to-staging reconciliation passed;
- affected population rerun.

## Mapping defect

- canonical mapping confirmed;
- transformation corrected;
- regression performed.

## Configuration defect

- approved rule linked;
- configuration updated;
- positive and negative tests passed.

## Model ambiguity or defect

- decision approved;
- canonical model changed;
- impact reviewed;
- implementations aligned.

## Approved exception

- scope verified;
- evidence current;
- expiry or review trigger valid.

## Temporary deviation

- control operated;
- residual population tracked;
- deviation removed or formally extended.

A generic status of `Done` is not sufficient.

---

# A worked example: 3,200 “defects” become four findings

A migration test reports 3,200 Customer Group failures.

Initial backlog:

```text
3,200 records
3,200 defect rows
```

After classification:

## Finding 1: wrong applicability

```text
Records:
1,740

Cause:
Test expects Customer Group for customers without an applicable sales-area record.

Classification:
Test-specification defect.
```

Action:

- correct test key and population;
- no data correction.

## Finding 2: source-to-target granularity gap

```text
Records:
920

Cause:
Central CRM Segment is being considered as a source
for sales-area Customer Group.

Classification:
Model ambiguity.
```

Action:

- open investigation;
- do not create direct mapping.

## Finding 3: missing approved values

```text
Records:
480

Cause:
Applicable sales-area records lack Customer Group.

Classification:
Record remediation and source-process gap.
```

Action:

- enrich current records;
- assign source owner.

## Finding 4: invalid transformation

```text
Records:
60

Cause:
Approved value `05` transformed to retired target code.

Classification:
Mapping defect.
```

Action:

- correct transformation;
- rerun regression.

The project now has four governed findings rather than 3,200 undifferentiated defects.

---

# Another example: a test failure becomes a model improvement

Supplier records with `UNDER_REVIEW` fail the approved Supplier Risk value list.

The immediate response could be:

> Add `UNDER_REVIEW` to the list.

Classification shows:

- `LOW`, `MEDIUM` and `HIGH` represent final risk;
- `UNDER_REVIEW` represents lifecycle;
- several countries have similar informal statuses;
- reporting currently treats all values as comparable risk levels.

The result is classified as a model defect.

The approved change becomes:

- retain Supplier Risk as final classification;
- create Supplier Review Status;
- migrate affected records;
- update workflow and reporting;
- reject future use of process status in risk values.

The failed test did not merely reveal bad data.

It revealed a missing shared concept.

---

# A failure that should not change the model

Italian Payment Terms completeness is 55%.

The local team requests that Payment Terms become optional.

Classification shows:

- the global process still requires Payment Terms;
- the Italian source release is delayed;
- values can be enriched;
- the limitation is temporary.

The finding becomes:

```text
Primary classification:
Source-capability gap

Treatment:
Temporary enrichment and migration deviation

Permanent model:
Unchanged
```

The test result does not justify a local semantic override.

---

# A failure that is actually a successful control

A Portuguese supplier with valid risk but `Review Status = PENDING` cannot activate.

The test report marks activation as failed.

Classification shows:

```text
Expected result:
Block activation.

Actual result:
Block activation.

Finding:
Control operating correctly.
```

No defect is created.

The result remains as positive evidence for the local rule.

This simple distinction can remove substantial noise from a test backlog.

---

# Reporting should show decisions, not only counts

A useful management report might contain:

| Category | Findings | Records | Decision required | Blocking |
|---|---:|---:|---:|---:|
| Record remediation | 12 | 4,820 | 0 | 2 |
| Extraction defects | 4 | 2,100 | 0 | 3 |
| Mapping defects | 7 | 1,240 | 1 | 5 |
| Configuration defects | 5 | 910 | 0 | 4 |
| Model ambiguity | 6 | 3,880 | 6 | 5 |
| Model defect | 2 | 2,170 | 2 | 2 |
| Approved exceptions | 3 | 420 | 0 | 0 |
| Temporary deviations | 4 | 1,600 | 1 extension | 1 |
| Unevaluable populations | 5 | 2,940 | 3 | 4 |

This report tells management where governance attention is required.

A single count of 20,080 failed records does not.

---

# The test backlog should shrink as knowledge improves

A healthy programme may still find new record defects.

But repeated testing should reduce uncertainty.

Over time, the organisation should see:

- fewer unclassified results;
- fewer recurring causes;
- fewer model ambiguities;
- more stable rule identities;
- faster grouping;
- better source prevention;
- smaller unevaluable populations;
- fewer defects created per affected record.

The objective is not zero failed records at every stage.

The objective is a model and control system that explains failures consistently and turns them into the right form of work.

---

# Final perspective

Migration testing can generate enormous amounts of activity without producing durable knowledge.

The difference lies in the unit of work.

When the unit is the failed row, the programme builds a defect factory.

When the unit is the classified finding, the programme can distinguish:

- correction;
- remediation;
- configuration;
- investigation;
- policy;
- exception;
- controlled model change.

SAP MDG can govern and enforce approved master-data behaviour. Jira and similar tools can organise and progress implementation work. Dataset and testing tools can execute checks at scale. SAP explicitly positions MDG around governed models, validated values, business rules, workflow, monitoring and auditable change; Atlassian positions Jira around capturing, prioritising and tracking issues through configurable workflows.

The gap Martenweave can close is the translation between those layers:

> Turn repeated test output into evidence about the model, then route that evidence into the correct decision or implementation workflow.

The practical test is:

> Can the programme explain why 8,420 failed results represent 14 remediation populations, 3 mapping defects, 2 configuration defects, 4 unresolved model decisions and 1 valid control?

When it can, testing is improving the model.

When it cannot, the programme is converting every uncertainty into another ticket.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects:

- canonical rules;
- dataset evidence;
- failed populations;
- investigation findings;
- decisions;
- lineage;
- impact;
- reviewable model changes;
- delivery issues.

The purpose is not to replace test-management or defect-tracking systems.

It is to prevent their backlogs from becoming the only place where the organisation attempts to understand its data model.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP describes SAP Master Data Governance as a central governance layer that combines governed models, preserved semantics and relationships, profiling, matching, validated values, collaborative workflows, business-rule monitoring, data-quality controls and auditable changes.

Atlassian describes Jira bug tracking as a way to capture, assign, prioritise, document and track bugs and other work items through configurable workflows, reporting, automation and development-tool integrations.

Martenweave’s current demo workflow validates canonical files, builds disposable indexes, supports search, trace, impact and gap analysis, and produces combined dataset-readiness reports.

The same workflow can promote dataset gaps into a pending-review `PatchProposal` or generate a GitHub-ready issue draft while preserving human review.

Martenweave is independent and is not affiliated with or endorsed by SAP, Atlassian or other vendors named in this article. Product names and trademarks belong to their respective owners.
