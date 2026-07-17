# How to Build a Migration Finding Taxonomy That Business, Data and SAP Teams Use Consistently

**Reviewed: 14 July 2026**

The migration test reports that 4,860 supplier records failed the Tax Identifier rule.

The business team calls them data-quality issues.

The data team calls them source defects.

The SAP team calls them validation errors.

The country team calls them approved exceptions.

The testing team calls them failed test cases.

The programme manager calls them blockers.

All six descriptions may be partly correct.

They are not interchangeable.

A record may fail a technical validation because the source is incomplete. Another may fail because SAP applies a global rule to the wrong partner category. A third may look invalid but fall under an approved local exemption. A fourth may expose a business situation that the target model has never defined.

When every team uses its own category, the project loses control of the treatment.

The same population can appear simultaneously in:

- a data-cleansing workbook;
- a Jira defect queue;
- an SAP configuration backlog;
- a country exception list;
- a migration risk register;
- an unresolved design-decision log.

Counts no longer reconcile. Owners duplicate work. Issues are closed in one system while remaining unresolved in another.

The problem is not a lack of tools.

The problem is the absence of a shared language between observation and action.

> A migration finding taxonomy should tell the programme what has been observed, what kind of problem it represents, which authority must decide it and what evidence is required to close it.

The taxonomy should not be designed only for reporting.

It should control routing.

A category is useful only when it changes what the programme does next.

---

# The translation problem

Business, data and technical teams naturally describe problems from different perspectives.

A business owner sees:

- incorrect meaning;
- operational risk;
- missing accountability;
- invalid policy;
- unacceptable exception.

A data analyst sees:

- nulls;
- invalid formats;
- duplicate keys;
- unmapped values;
- contradictory columns;
- population distributions.

An SAP consultant sees:

- failed validation;
- missing configuration;
- derivation defect;
- workflow-routing problem;
- field-control mismatch.

A migration lead sees:

- load failure;
- cutover risk;
- remediation volume;
- source dependency;
- wave readiness.

None of these views should be discarded.

The taxonomy must connect them.

Consider a blank Supplier Risk value.

| Perspective | Description |
|---|---|
| Business | Final risk assessment is unavailable |
| Data | Target attribute is null |
| Source | Legacy process does not maintain the value |
| Migration | Applicable population cannot pass activation |
| SAP | Mandatory-field validation blocks the record |
| Governance | No approved temporary treatment exists |

These are not six separate defects.

They are six views of one finding.

The taxonomy must preserve the views without creating six independent truths.

---

# Do not start with categories

Many teams build a taxonomy by creating a drop-down list:

- Data Issue
- Process Issue
- System Issue
- Mapping Issue
- Business Issue
- Other

This appears organised.

It is almost useless.

The categories overlap, and `Other` eventually becomes the largest group.

Start with the questions the programme needs to answer.

For every material result:

1. What was observed?
2. Against which rule, mapping or model expectation?
3. Which population is affected?
4. Can the case be evaluated with available evidence?
5. Does the approved model already define the correct treatment?
6. Does implementation match the model?
7. Is a decision required?
8. What type of action can close the finding?

The taxonomy should emerge from these questions.

---

# Eight objects that teams routinely confuse

A consistent operating model begins by separating eight different objects.

## Observation

A measured fact from a dataset, test, configuration comparison or process.

Examples:

- 1,284 records have blank Supplier Risk.
- SAP accepted 42 records without mandatory evidence.
- Source value `GOV` has no target mapping.
- two active rules overlap for Portuguese non-residents.

An observation does not yet state the cause.

## Finding

A grouped interpretation of one or more observations that share a meaningful condition.

Example:

> ERP_B cannot provide Supplier Risk for active strategic suppliers in Wave 2.

The finding is the stable unit of investigation.

## Defect

A confirmed failure of data, extraction, transformation, configuration or software to implement an already approved expectation.

A defect implies that the correct state is known.

## Gap

A difference between required and available model, data or evidence where the treatment may not yet be known.

A gap can exist without a defect.

For example:

> No authoritative source for Customer Group has been approved.

## Decision

An authorised choice between alternatives that changes or confirms model truth, context, ownership or treatment.

## Exception

An approved case in which the normal rule does not apply for a defined context.

An exception is not a defect merely because it fails the default rule.

## Deviation

A temporary departure from the intended model or control, with bounded scope and an end condition.

## Action

Concrete delivery work:

- correct records;
- fix extraction;
- update configuration;
- investigate meaning;
- approve a mapping;
- implement a control;
- rerun a test.

Confusing these objects causes most backlog pollution.

A finding can produce several actions.

A defect may exist without a decision.

A gap may require a decision before any defect can be raised.

An exception may produce no corrective action.

---

# The primary classification question

The most useful first question is:

> Is the correct intended state already known and approved?

When the answer is yes, the finding probably belongs to an execution category:

- record defect;
- extraction defect;
- transformation defect;
- configuration defect;
- implementation drift.

When the answer is no, the finding belongs to a governance category:

- model ambiguity;
- missing decision;
- unresolved source authority;
- conflicting rules;
- local–global scope question;
- unsupported value treatment.

This one distinction prevents teams from raising technical defects for unanswered business questions.

Example:

```text
Observed:
Source value GOV cannot be loaded.

Approved target treatment:
None.

Classification:
Decision gap, not mapping defect.
```

The mapping developer cannot fix a treatment that the business has not approved.

---

# The taxonomy

The categories below are deliberately based on treatment, not departmental ownership.

## 1. Record-level data defect

The model, rule and implementation are correct. Specific records contain incorrect or incomplete values.

Typical evidence:

- isolated missing values;
- invalid date;
- malformed identifier;
- duplicate created by incorrect source entry;
- incorrect country assignment.

Primary owner:

- source or business data owner.

Normal treatment:

- record remediation;
- prevention control where recurrence matters.

Closure evidence:

- affected population corrected;
- rerun passed;
- source correction or accepted residual documented.

Do not use this category merely because the error appears in data.

A large repeated population may indicate a source capability or model problem.

---

## 2. Source capability gap

The approved model requires information the source process does not maintain or cannot provide reliably.

Typical evidence:

- field absent from the source;
- context maintained only outside the system;
- historical records lack required classification;
- source granularity differs from target granularity.

Primary owner:

- source owner together with domain owner and migration lead.

Possible treatments:

- source remediation;
- enrichment;
- derivation;
- exclusion;
- temporary deviation;
- model reconsideration.

A source capability gap is not automatically a source defect.

The legacy system may never have been designed to supply the new target concept.

---

## 3. Extraction defect

The source contains the approved information, but the extract fails to deliver it correctly.

Typical evidence:

- missing column;
- incorrect join;
- filter excludes applicable records;
- truncation;
- wrong date selection;
- lost leading zeros.

Primary owner:

- extraction or data-engineering team.

Treatment:

- correct extraction;
- reconcile source and staging;
- rerun affected population.

No model decision is normally required.

---

## 4. Mapping or transformation defect

Approved source and target semantics exist, but the implemented transformation is wrong.

Typical evidence:

- value mapped to wrong code;
- source field connected to wrong endpoint;
- context lost;
- obsolete default applied;
- conversion uses superseded decision.

Primary owner:

- migration mapping or integration team.

Treatment:

- correct transformation;
- regression test;
- review affected downstream consumers.

The canonical mapping should not be rewritten to match the defective implementation.

---

## 5. Configuration defect

SAP, an MDM platform or another operational system implements behaviour that differs from the approved model.

Typical evidence:

- validation applies to persons and organisations instead of organisations only;
- warning configured where blocking was approved;
- workflow skips required owner;
- retired value remains selectable;
- local rule applies globally.

Primary owner:

- platform configuration owner.

Treatment:

- correct configuration;
- test positive, negative and contextual cases;
- verify implementation against the canonical rule.

SAP currently positions MDG around governed models, collaborative workflows, validated values, business-rule monitoring, data-quality controls and auditable changes. Those capabilities enforce approved behaviour; they do not remove the need to distinguish configuration mismatch from model uncertainty.

---

## 6. Implementation drift

The implementation was once aligned but no longer matches the current model baseline.

Typical causes:

- model decision changed;
- one interface remained on an old mapping;
- local configuration missed a global update;
- test script references a retired rule;
- operational procedure still follows a temporary migration treatment.

Primary owner:

- depends on the drifted implementation.

Treatment:

- compare baselines;
- assess impact;
- update affected implementation;
- verify all related consumers.

This differs from an initial configuration defect because the historical alignment matters for impact and closure.

---

## 7. Test-specification defect

The test expectation is wrong or based on a superseded model.

Typical evidence:

- test uses central key for an organisational attribute;
- approved local exception is ignored;
- expected value comes from retired mapping;
- lifecycle stage is misunderstood.

Primary owner:

- test owner together with model owner.

Treatment:

- update test;
- link scenario to current rule and baseline;
- rerun.

A test failure does not prove that the product or data is wrong.

The test itself is another implementation of the model.

---

## 8. Model ambiguity

The current model does not describe the observed case precisely enough.

Typical evidence:

- lifecycle point not stated;
- global and local scopes overlap;
- cardinality unclear;
- source and target labels look similar but equivalence is not established;
- rule does not distinguish missing from non-applicable.

Primary owner:

- domain owner or model-governance group.

Treatment:

- investigation;
- decision;
- canonical clarification;
- impact analysis.

A model ambiguity should not be closed by allowing a developer or data analyst to choose a convenient interpretation.

---

## 9. Model defect

The approved model contains an incorrect or internally inconsistent design.

Typical evidence:

- one value list combines risk and workflow status;
- central attribute used for organisational meaning;
- contradictory active rules;
- wrong cardinality;
- local workaround represented as global policy.

Primary owner:

- accountable model authority.

Treatment:

- reviewed PatchProposal;
- semantic diff;
- impact assessment;
- implementation migration;
- regression.

This category should be used carefully.

Not every inconvenient model requirement is a model defect.

---

## 10. Decision gap

The programme has enough information to state the question but no authorised treatment.

Typical examples:

- no approved default;
- no source selected as authoritative;
- local requirement not classified as global or contextual;
- two treatments remain viable;
- residual risk not accepted.

Primary owner:

- role with business decision authority.

Treatment:

- decision record;
- alternatives;
- evidence;
- named approver;
- deadline driven by programme consequence.

A decision gap should not be hidden inside an ordinary issue ticket titled “fix mapping.”

---

## 11. Rule conflict

Two or more approved or proposed rules produce incompatible or ambiguous outcomes in an overlapping context.

Typical evidence:

- global mandatory rule and local optional rule;
- two exceptions overlap;
- permanent policy conflicts with migration concession;
- regional and country rules apply simultaneously.

Primary owner:

- authorities responsible for the conflicting layers.

Treatment:

- normalise rules;
- calculate overlap;
- resolve precedence;
- produce one effective rule;
- update model and implementations.

---

## 12. Approved exception

A normal rule is intentionally not applied to a bounded context.

Required evidence:

- exact scope;
- approving authority;
- rationale;
- effective date;
- required substitute evidence;
- review trigger.

Treatment:

- no defect correction;
- verify that the exception is applied only within scope.

The exception should remain visible in reporting so that apparent failure does not repeatedly return as defect noise.

---

## 13. Temporary deviation

The target model remains valid, but a bounded programme condition permits temporary alternative behaviour.

Required attributes:

- affected population;
- lifecycle stage;
- compensating control;
- owner;
- expiry;
- convergence action.

Example:

> Wave 2 records may load without Supplier Risk into a controlled review queue, but activation remains blocked.

Primary treatment:

- operate control;
- track residual population;
- remove or formally extend before expiry.

A deviation that has no expiry is an unapproved permanent change.

---

## 14. Unevaluable population

The programme lacks the context needed to decide whether the rule applies or what result is correct.

Typical causes:

- missing country;
- unknown strategic status;
- contradictory partner category;
- organisational key unavailable;
- effective date uncertain.

Primary owner:

- usually source or model owner, depending on cause.

Treatment:

- obtain or resolve context;
- do not classify records prematurely as valid or invalid.

This category deserves its own visibility.

Unevaluable does not mean failed.

It means the programme cannot yet make an evidence-based decision.

---

## 15. Expected control result

The system blocked or routed the record exactly as approved.

Examples:

- pending review blocks activation;
- invalid code is rejected;
- missing evidence routes to stewardship;
- out-of-scope value is prevented.

Treatment:

- retain as positive evidence;
- do not create a defect.

A surprising amount of defect noise comes from reporting successful controls as failed business transactions.

---

## 16. Unexpected pass

The record passed when it should have been blocked, reviewed or identified.

Examples:

- missing classification defaulted silently;
- expired exception accepted;
- invalid code converted to a plausible value;
- context missing, causing the rule not to run;
- temporary status distributed as final value.

Primary owner:

- depends on cause.

Priority:

- often higher than a visible failure because the defect may propagate unnoticed.

The taxonomy must capture false success, not only rejected records.

---

# Use primary and secondary classifications

A finding may involve more than one problem.

For example:

> ERP_B cannot provide Supplier Risk, and the current migration default assigns `STANDARD`.

Primary classification:

- source capability gap.

Secondary classification:

- transformation defect;
- unexpected pass;
- model-risk concern.

Do not create an uncontrolled list of many equal categories.

Choose one primary classification based on the first decision or action required.

Secondary classifications provide context.

Example:

```yaml
classification:
  primary: source_capability_gap
  secondary:
    - transformation_defect
    - unexpected_pass
```

The primary category controls routing.

---

# Categories should have entry criteria

A taxonomy becomes political when teams can choose whichever category is most convenient.

For each category, define minimum evidence.

To classify as `configuration_defect`, require:

- approved model or rule;
- implementation evidence;
- demonstrated mismatch.

To classify as `model_defect`, require:

- canonical object;
- observed contradiction or unsupported business behaviour;
- accountable model owner review.

To classify as `approved_exception`, require:

- decision reference;
- explicit scope;
- current status.

To classify as `record_defect`, require:

- correct expected value or rule;
- record-level evidence;
- no unresolved semantic question.

These entry criteria stop teams from calling every difficult requirement a model problem or every business ambiguity a technical defect.

---

# Categories should have exit criteria

A finding is not closed merely because its primary ticket is closed.

Each category needs category-specific closure.

For a mapping defect:

- canonical mapping confirmed;
- implementation corrected;
- affected population rerun;
- regression passed.

For a model ambiguity:

- decision approved;
- canonical model updated or explicitly confirmed;
- affected tests and implementations identified.

For a temporary deviation:

- expired treatment removed or extension approved;
- residual population resolved;
- compensating control verified.

For an unevaluable population:

- missing context supplied or records explicitly excluded by approved decision.

The closure criteria follow the category.

This is the main operational value of the taxonomy.

---

# Who may classify and reclassify

Classification is not a one-time administrative action.

It is a controlled judgement that may change as evidence improves.

A workable authority model is:

## Data analyst

May identify:

- observation;
- population;
- data pattern;
- likely record, extraction or source issue.

Should not independently declare:

- model defect;
- approved exception;
- business-policy change.

## SAP or MDM consultant

May identify:

- configuration mismatch;
- execution timing;
- workflow or validation behaviour;
- implementation limitation.

Should not independently redefine:

- business meaning;
- global–local applicability;
- accepted residual risk.

## Business or domain owner

May decide:

- semantic meaning;
- applicability;
- approved treatment;
- exception;
- ownership.

Should not classify technical root cause without implementation evidence.

## Migration lead

May classify:

- temporary delivery impact;
- wave treatment;
- readiness consequence;
- required containment.

Should not turn a temporary need into permanent model truth.

## Model-governance owner

Should control:

- taxonomy definition;
- cross-category consistency;
- decision and proposal routing;
- reclassification disputes;
- closure evidence requirements.

This is a federated model.

Collibra’s governance guidance emphasises operating models that define roles, responsibilities, domains and authority, including federated structures with multiple governance groups. A migration taxonomy needs the same explicit ownership discipline.

---

# The triage sequence

Classification should happen in a fixed sequence.

## 1. Preserve the observation

Do not edit the raw evidence to fit a category.

Record:

- dataset or test run;
- rule;
- actual result;
- expected result where known;
- affected records;
- context;
- timestamp.

## 2. Establish evaluability

Can the rule be applied with available context?

When no, classify `unevaluable_population` first.

## 3. Check whether the result was expected

When the control behaved correctly, classify `expected_control_result`.

## 4. Confirm the approved model

Is the intended state documented and current?

When no, use a governance category.

## 5. Compare implementation

Does extraction, mapping, configuration or test logic match the approved model?

## 6. Identify the treatment unit

One record, one source population, one mapping, one rule, one model object or one decision?

## 7. Assign primary category

Choose based on the first accountable action required.

## 8. Record confidence

- confirmed;
- strongly supported;
- provisional;
- unresolved.

## 9. Route to the proper workflow

- remediation;
- defect;
- investigation;
- decision;
- exception review;
- PatchProposal;
- risk acceptance.

This sequence can be applied consistently by different teams.

---

# What the taxonomy should not contain

Avoid vague categories such as:

- Functional issue;
- Technical issue;
- Business issue;
- Data issue;
- Process issue;
- Other.

They describe organisational perspective rather than treatment.

Also avoid an excessively detailed list tied to one project’s systems:

- SAP issue;
- MDG issue;
- ETL issue;
- Excel issue;
- Local issue.

The platform where the symptom appears is not necessarily where the cause belongs.

A failed SAP validation may originate in source capability or unresolved policy.

A data-quality platform may detect a model ambiguity.

A Jira issue may represent an approved exception.

---

# The category name should survive tool changes

A taxonomy should remain valid whether the organisation uses:

- SAP MDG;
- another MDM platform;
- Collibra;
- Ataccama;
- Informatica;
- Jira;
- ServiceNow;
- GitHub;
- spreadsheets.

This portability matters.

SAP MDG provides governed master-data models, workflows, validated values, business-rule monitoring and auditable changes. Ataccama provides profiling, reusable governed rule libraries, monitoring, issue analysis and remediation. Collibra provides broader governance structures, data domains, ownership and quality context. Each platform can implement part of the operating model, but none should redefine the taxonomy simply through its internal status names.

Map platform statuses to the taxonomy, not the taxonomy to one platform.

---

# The minimum fields for a finding

A finding should contain enough information to remain stable across tools and test runs.

```yaml
id: FIND-SUPPLIER-RISK-ERP-B-001

title: ERP_B cannot provide Supplier Risk for applicable suppliers

status: decision_required

observation:
  rule: RULE-SUPPLIER-RISK-ACTIVATION
  dataset: ERP_B_supplier_extract_2026-07-12
  affected_records: 1284
  condition: supplier_risk_missing

scope:
  source_systems:
    - ERP_B
  countries:
    - DE
    - AT
  population:
    - active_strategic_supplier_organisations

classification:
  primary: source_capability_gap
  secondary:
    - temporary_treatment_required
  confidence: confirmed

model_assessment:
  approved_model_exists: true
  model_change_required: unresolved
  implementation_matches_model: true

decision:
  required: true
  question: >
    Select source remediation, controlled enrichment,
    exclusion or temporary review treatment.

owners:
  source:
    - ROLE-ERP-B-DATA-OWNER
  business:
    - ROLE-GLOBAL-SUPPLIER-RISK-OWNER
  migration:
    - ROLE-SUPPLIER-MIGRATION-LEAD

evidence:
  - EVID-ERP-B-RISK-PROFILE-2026-07
```

The schema can remain simpler in the first implementation.

The essential fields are:

- identity;
- observation;
- scope;
- classification;
- confidence;
- model assessment;
- owner;
- decision state;
- evidence.

---

# Reporting should use findings and populations

Management needs several numbers, not one total.

A useful report separates:

| Category | Findings | Records | Decision required | Blocking |
|---|---:|---:|---:|---:|
| Record defects | 18 | 5,420 | 0 | 3 |
| Extraction defects | 4 | 2,140 | 0 | 4 |
| Mapping defects | 7 | 1,310 | 1 | 5 |
| Configuration defects | 5 | 740 | 0 | 4 |
| Model ambiguity | 6 | 3,880 | 6 | 5 |
| Decision gaps | 4 | 1,920 | 4 | 3 |
| Approved exceptions | 3 | 460 | 0 | 0 |
| Temporary deviations | 4 | 1,610 | 1 | 1 |
| Unevaluable populations | 5 | 2,940 | 3 | 4 |
| Unexpected passes | 2 | 2,110 | 2 | 2 |

This report answers several different questions:

- how much data is affected;
- how many distinct problems exist;
- where decisions are blocking progress;
- where controls failed silently;
- what kind of governance attention is required.

A single defect count cannot do this.

---

# Ataccama, Collibra and SAP MDG are not competing answers to the taxonomy

Their strengths sit at different points.

Ataccama states that its platform can profile datasets, maintain governed reusable rule libraries, monitor quality, generate issue lists and support prioritisation and remediation by owners.

Collibra describes a broader governance operating model involving domains, business and technical ownership, glossaries, data dictionaries, quality scorecards, systems, policies and formal authority structures.

SAP MDG focuses on governed master-data models, workflows, validated values, business-rule monitoring and auditable operational changes.

A migration finding may move through all three kinds of capability:

```text
Ataccama detects a population issue.

Martenweave classifies it against canonical model context.

Collibra provides enterprise ownership or glossary authority.

SAP MDG implements the approved operational treatment.
```

The exact products may differ.

The separation of responsibilities remains useful.

---

# Martenweave’s role

Martenweave should not become a generic issue-management system.

Its role is to connect classification to model evidence.

The current core already provides:

- canonical files as source of truth;
- deterministic validation;
- rebuildable indexes;
- dataset-gap detection;
- trace;
- impact analysis;
- proposal-first changes;
- GitHub-ready review output.

Its public demo flow also shows dataset readiness producing combined validation, coverage, gap and readiness results, with the ability to promote findings into a pending-review PatchProposal or issue draft.

The finding taxonomy should sit between detection and promotion:

```text
Dataset or test evidence
→ Finding
→ Classification
→ Decision route
→ Issue, remediation or PatchProposal
```

This prevents automatic issue creation from producing a cleaner version of the same defect noise.

---

# A small implementation slice

A useful first version needs only:

## A `Finding` object

With:

- stable ID;
- observation;
- scope;
- primary and secondary classification;
- confidence;
- affected model objects;
- evidence;
- owner;
- decision requirement;
- linked actions.

## A controlled category registry

Each category defines:

- meaning;
- entry criteria;
- permitted statuses;
- required roles;
- closure evidence;
- allowed next actions.

## A classifier command

Not an autonomous decision maker.

It could:

- group dataset results;
- show previous similar findings;
- suggest candidate categories;
- identify missing evidence;
- require human confirmation.

## Validation

Check that:

- defects reference approved expectations;
- exceptions reference decisions;
- deviations have expiry;
- model defects link to proposals;
- closed findings include closure evidence;
- unevaluable populations are not marked passed;
- unexpected passes cannot be ignored as ordinary success.

## Report generation

Produce:

- findings by category;
- affected populations;
- decisions required;
- blocking findings;
- recurrence across runs;
- actions by owner.

This is sufficient to prove whether the taxonomy improves delivery.

---

# A classification disagreement is itself useful evidence

Suppose the data team says:

> Source capability gap.

The business owner says:

> The field is not required for this population.

The SAP team says:

> Configuration applies the rule globally.

This is not an administrative dispute.

It reveals three competing hypotheses:

1. source lacks required data;
2. model applicability is narrower;
3. implementation scope is wrong.

The finding should remain `classification_disputed` until evidence resolves the question.

Do not allow the highest-ranking participant to choose a category merely to move the ticket.

A disputed classification should record:

- competing categories;
- evidence for each;
- decision owner;
- required next evidence;
- delivery consequence.

---

# Naming matters

Category names should be understandable without project-specific abbreviations.

Good:

- Source capability gap
- Configuration defect
- Model ambiguity
- Approved exception
- Temporary deviation
- Unevaluable population

Weak:

- DQ issue
- Functional gap
- CR problem
- Local defect
- Type 4
- Red issue

People should understand the category six months later without locating the original project glossary.

---

# A worked triage

A test reports 5,200 Customer Group failures.

The taxonomy produces the following findings.

## Finding A: wrong test population

Affected records: 2,640.

Observation:

- customers without a sales-area record were expected to contain sales-area Customer Group.

Classification:

- test-specification defect.

Action:

- correct applicability and test key.

No data remediation.

## Finding B: central source used for organisational target

Affected records: 1,430.

Observation:

- one central CRM Segment is proposed for several sales areas.

Classification:

- model ambiguity.

Action:

- investigate semantic and granularity equivalence.

No automatic mapping.

## Finding C: missing source values in the applicable population

Affected records: 920.

Observation:

- sales-area source records exist but Customer Group is blank.

Classification:

- record defect with source-process recurrence.

Action:

- remediate population and add source prevention.

## Finding D: old transformation

Affected records: 210.

Observation:

- source code `05` maps to retired target code.

Classification:

- mapping defect and implementation drift.

Action:

- update transformation and regression test.

The programme moves from 5,200 red rows to four governed findings.

That is the purpose of the taxonomy.

---

# The operating rules

A taxonomy remains useful only when the programme enforces several rules.

### No finding enters delivery without a primary category

Provisional classification is acceptable.

Missing classification is not.

### No category is selected only from the error message

Context and model evidence are required.

### No model defect is closed by data correction alone

Canonical truth must be reviewed.

### No approved exception exists without a decision reference

An email or meeting comment is not enough.

### No temporary deviation exists without expiry and convergence

Otherwise it is permanent drift.

### No unevaluable population is reported as passed

Lack of evidence is not compliance.

### No expected control result becomes a defect

Successful prevention is positive evidence.

### No unexpected pass disappears inside load-success statistics

False success must remain visible.

### No closed finding loses its affected population and baseline

Closure must be reproducible.

---

# Final perspective

A migration finding taxonomy is not a reporting convenience.

It is a control mechanism between evidence and change.

Without it, the programme treats:

- observations as defects;
- defects as decisions;
- exceptions as data errors;
- temporary deviations as local policy;
- model ambiguity as technical implementation;
- successful controls as failed tests.

The result is a large backlog and weak institutional learning.

A useful taxonomy gives business, data and SAP teams different views of one governed finding while preserving one shared classification.

It answers:

- What happened?
- What kind of problem is it?
- Is the intended state already known?
- Which authority must act?
- What is the correct treatment unit?
- What evidence proves closure?

The practical test is:

> Can three teams review the same failed population and agree whether it requires record remediation, source change, configuration correction, model decision, approved exception or temporary deviation?

When they can, the project has a common operating language.

When they cannot, every tool will show a different version of the same problem.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects:

- observations;
- dataset populations;
- canonical rules and mappings;
- findings;
- decisions;
- exceptions;
- deviations;
- impact;
- reviewable changes.

It does not replace enterprise data-quality, governance, MDM or issue-management platforms.

Its role is to preserve the classification and model context that allow those platforms to perform the right kind of work.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP describes SAP Master Data Governance as a governance layer that unifies master data, policy and metadata through governed models, semantic relationships, profiling, validated values, collaborative workflows, business-rule monitoring and auditable changes.

Collibra describes data governance as an organisational discipline supported by an operating model defining roles, responsibilities, domains, ownership, business terms, policies and quality measures. It recognises both centralised and federated authority structures.

Ataccama describes capabilities for dataset profiling, governed reusable rule libraries, automated monitoring, issue identification, prioritisation, remediation and rule reuse across systems and pipelines.

Martenweave Core currently uses canonical model files, deterministic validation, rebuildable generated indexes, dataset-gap analysis, trace, impact analysis and human-reviewed PatchProposal and ChangeRequest workflows.

Its current demo workflow combines validation, dataset coverage, gap detection and readiness reporting and can promote findings into reviewable proposals or GitHub-ready issue drafts.

Martenweave is independent and is not affiliated with or endorsed by SAP, Collibra, Ataccama or other vendors named in this article. Product names and trademarks belong to their respective owners.
