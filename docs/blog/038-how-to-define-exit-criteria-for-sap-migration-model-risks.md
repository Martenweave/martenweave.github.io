# How to Define Exit Criteria for SAP Migration Model Risks

**Reviewed: 14 July 2026**

The programme has completed the remediation task.

A missing Supplier Classification was added to the migration file. The mapping ticket is closed. The SAP validation passed in the latest test. The risk register now shows:

```text
Status:
Resolved
```

Two weeks later, the same gap appears in a new extract.

The source system was never corrected. The migration team fixed only the current file. New records still arrive without classification. The temporary default remains available, and nobody has confirmed whether downstream systems interpret it correctly.

The task was completed.

The risk was not removed.

This happens frequently in SAP migration and MDG programmes because teams use delivery activity as evidence of risk closure.

They ask:

- Was the ticket completed?
- Was the configuration transported?
- Did the latest load succeed?
- Was the workbook updated?
- Did the owner approve the mitigation?

These are useful milestones.

They do not necessarily prove that the underlying exposure has ended.

> A model risk should leave the active register only when predefined evidence shows that its cause, affected population, model dependencies and residual exposure have reached an approved state.

That evidence is the risk’s exit criteria.

Without explicit exit criteria, risks tend to close when the programme becomes tired of discussing them.

## Completion and risk closure are different events

A backlog item can be complete while the parent risk remains open.

Consider this sequence:

```text
Risk:
Supplier Classification is unavailable for ERP_B records.

Task:
Add classifications to the Wave 2 migration file.

Task result:
Completed.

Remaining condition:
The next ERP_B extract will still omit the field.
```

The task reduced immediate migration exposure.

It did not resolve the source-model risk.

A better status would be:

```text
Risk status:
Mitigated for Wave 2

Residual risk:
New and changed ERP_B suppliers remain unsupported

Next exit condition:
Operational source or controlled enrichment process implemented
```

This distinction prevents temporary success from being reported as permanent resolution.

## Exit criteria define the state that must be true

Acceptance criteria usually describe what a delivery item must produce.

Exit criteria describe what must be true before a risk can leave a defined lifecycle stage.

For example:

### Task acceptance criterion

> Update the mapping so source value `STRAT` converts to `STRATEGIC`.

### Risk exit criterion

> Every source value observed in the agreed population has an approved target treatment, and the mapping remains valid against the current source dataset.

The first proves that one change was made.

The second proves that the mapping risk has reached an acceptable state.

## Exit criteria should be agreed when the risk is opened

Teams often define closure evidence at the end.

This creates a conflict of interest.

By then:

- deadlines are near;
- owners want to close items;
- the remaining exposure is inconvenient;
- evidence may be expensive to produce;
- temporary controls have become normal.

Define exit criteria when the risk is assessed and the treatment is selected.

At that point, reviewers should answer:

> What evidence would convince us that this risk is no longer active—or has been reduced to an explicitly accepted residual level?

This makes the expected outcome visible before work begins.

## Not every risk exits by becoming zero

Many enterprise risks cannot be eliminated completely.

A risk may leave active treatment through several valid outcomes.

## Resolved

The cause and material exposure have been removed.

Example:

- retired endpoint replaced;
- all active mappings updated;
- tests passed;
- old endpoint no longer referenced.

## Reduced to an accepted residual level

Some exposure remains, but responsible authorities approve it.

Example:

- 25 historical inactive records remain incomplete;
- they cannot be activated;
- the business owner accepts no further remediation.

## Transferred into an operational control

The risk becomes part of a stable process.

Example:

- source cannot provide a field automatically;
- a controlled stewardship process now maintains it;
- ownership, service level and monitoring are established.

## Superseded

The affected scope or model is no longer relevant.

Example:

- migration wave cancelled;
- legacy source decommissioned;
- target attribute removed through another approved decision.

## Converted into a known issue or model debt

The programme cannot resolve the exposure before handover.

It remains visible with:

- owner;
- operational control;
- expiry or review date;
- AMS treatment.

This is not the same as resolution.

The exit is from one programme process into another explicitly governed process.

## Exit criteria must match the risk type

A generic criterion such as:

> Owner confirms resolution.

is weak.

Different risks require different evidence.

## Source risk

Example risk:

> The source system does not reliably provide Tax Registration Identifier.

Possible exit criteria:

- authoritative source confirmed;
- field definition approved;
- current extract contains the expected column;
- completeness meets the approved contextual requirement;
- source owner accepts ongoing responsibility;
- extraction is reproducible;
- unresolved populations have approved treatment.

A one-time corrected file is insufficient when the source process remains unchanged.

## Mapping risk

Example risk:

> Several source values have no approved target treatment.

Possible exit criteria:

- all observed values are profiled;
- each material value has an approved mapping or explicit gap treatment;
- transformation is linked to active source and target endpoints;
- no unrestricted default remains;
- sample conversion passes;
- mapping is approved by the responsible business and technical owners.

## Rule risk

Example risk:

> A mandatory validation applies too broadly.

Possible exit criteria:

- applicability is represented explicitly;
- approved model contains the correct context;
- SAP configuration matches it;
- positive, negative and exception tests pass;
- affected populations are reassessed;
- no active unapproved deviation remains.

## Value-list risk

Example risk:

> Temporary value `MIGRATION_REVIEW` is being treated as a normal classification.

Possible exit criteria:

- new operational use is blocked;
- remaining records are identified;
- remediation is complete or formally accepted;
- downstream reports and interfaces no longer treat the value as final;
- the value is retired or clearly restricted;
- no active mapping produces it outside approved scope.

## Ownership risk

Example risk:

> No accountable owner exists for Supplier Risk values.

Possible exit criteria:

- governance role is defined;
- accountable role accepts responsibility;
- operational assignee is identified;
- approval authority is documented;
- review cadence is established;
- open changes and exceptions are transferred to the owner.

Naming a person in a spreadsheet is not enough if the role and authority remain unclear.

## Context risk

Example risk:

> A German validation is represented as a global rule.

Possible exit criteria:

- global and local treatments are separated;
- applicable country and entity context is explicit;
- configuration is verified;
- other countries are assessed for unintended impact;
- regression tests prove global and local behaviour.

## Implementation-alignment risk

Example risk:

> SAP configuration does not match the approved model.

Possible exit criteria:

- approved model baseline identified;
- configuration difference documented;
- correction or approved deviation implemented;
- verification evidence attached;
- current model and configuration states are reconciled;
- related tests refer to the same baseline.

## Traceability risk

Example risk:

> A critical target field cannot be traced to its source and decision.

Possible exit criteria:

- source and target endpoints are identified;
- mapping and transformation are connected;
- applicable rule and owner are linked;
- decision or accepted rationale is available;
- current dataset evidence is attached;
- trace passes structural validation.

## Exit criteria should cover five dimensions

For material model risks, we recommend checking five dimensions.

## 1. Model state

Has the approved model been corrected or clarified?

Evidence may include:

- approved attribute definition;
- mapping;
- rule;
- context;
- lifecycle status;
- decision.

## 2. Data state

Does the affected population now satisfy the approved treatment?

Evidence may include:

- current profile;
- completeness;
- value coverage;
- duplicate analysis;
- remediation reconciliation.

## 3. Implementation state

Do SAP and connected systems implement the approved model?

Evidence may include:

- configuration reference;
- interface test;
- transformation result;
- successful activation;
- release baseline.

## 4. Control state

Can the problem reappear without detection?

Evidence may include:

- source validation;
- monitoring;
- ownership;
- exception process;
- automated check;
- operating procedure.

## 5. Residual-risk state

What exposure remains, and who has accepted it?

Evidence may include:

- remaining record count;
- scope restrictions;
- compensating control;
- approver;
- review date.

A risk should not be called resolved when only one dimension has changed.

## Use measurable population criteria

Many risks concern a population of records.

Exit criteria should state:

- which population;
- which baseline;
- which measurement;
- what unresolved treatment is permitted.

Weak criterion:

> Data quality improved.

Stronger criterion:

> All active German supplier organisations in the approved Wave 3 extract contain either a valid Tax Registration Identifier or an approved exemption code.

Another:

> At least 99% of applicable records map to approved target values, and every remaining record is listed in a signed exception register.

Thresholds should be programme policies, not universal industry rules.

The critical point is that the population and allowed exceptions are explicit.

## Do not use percentages without materiality

A 99.9% result can still hide a serious problem.

The remaining 0.1% may contain:

- the largest customers;
- regulated suppliers;
- records required for cutover;
- parent entities in important relationships;
- high-risk bank details.

Exit criteria should therefore combine percentage and material checks.

For example:

```text
Completeness:
At least 99%

And:

No missing values for suppliers with active purchase orders
or regulated supplier status
```

This prevents averages from hiding critical exceptions.

## Define the relevant baseline

Evidence has meaning only relative to a known state.

A risk exit should identify:

- model baseline;
- dataset version;
- mapping version;
- SAP release or transport;
- test cycle.

For example:

```text
Model baseline:
supplier-model-v2.7

Dataset:
ERP_B_supplier_extract_2026-09-01

Implementation release:
MDG-R4

Test cycle:
UAT-2
```

Without baseline alignment, teams may close a risk using:

- an old dataset;
- a previous mapping;
- configuration not yet in the target environment;
- test results from a superseded rule.

## Require current evidence

A risk discovered from a July dataset should not necessarily close based on the same July dataset after a manual correction.

Ask whether evidence reflects the current process.

Useful rules include:

- rerun profile after source remediation;
- use a fresh extract;
- verify after transport deployment;
- test after interface change;
- confirm after data conversion.

The evidence does not need to be generated on the day of closure.

It should be current enough to prove the new state rather than the old problem.

## Distinguish one-time remediation from recurring prevention

Suppose 8,000 records are corrected manually.

The current population is now clean.

If the source continues producing bad values, the risk remains.

Exit criteria should distinguish:

### Remediation evidence

Existing affected records corrected.

### Prevention evidence

New or changed records cannot reproduce the same uncontrolled condition—or the condition will be detected and routed.

A complete exit may require both.

```text
Existing population:
Reconciled

Future prevention:
Source validation active and monitored
```

## Verify that temporary controls have been removed or formalised

Risks often accumulate temporary treatments:

- warning instead of error;
- manual approval;
- special load exclusion;
- temporary value;
- local script;
- default;
- additional spreadsheet check.

Before closure, ask:

- Is the temporary control still needed?
- Has it become part of the permanent operating model?
- Was it removed?
- Does it have an owner?
- Is it documented?
- Could it create another risk?

A risk should not close while an unmanaged workaround remains active.

## Use negative evidence

Positive evidence shows that expected behaviour works.

Negative evidence shows that invalid behaviour is prevented.

For a mandatory-rule risk, test:

### Positive

A valid applicable record succeeds.

### Negative

An invalid applicable record fails.

### Exception

An approved exempt record succeeds.

### Out-of-scope

A record outside the rule’s context is not blocked.

This is more reliable than showing only one successful test case.

## Test dependencies, not only the changed component

A value-list risk is not closed merely because the new value appears in SAP MDG.

Check:

- mappings;
- workflow;
- interface payload;
- consumers;
- reports;
- tests;
- remediation.

A source-field replacement is not closed merely because the extract contains the new column.

Check:

- semantic equivalence;
- transformation;
- organisational level;
- value coverage;
- target behaviour.

Impact analysis should define which dependencies require evidence.

The current Martenweave core supports canonical model validation, trace, impact analysis, dataset profiling and gap detection, which can help identify the objects that should be included in closure evidence.

## Exit criteria should be binary where possible

A criterion should allow a reviewer to decide whether it is met.

Weak:

> Mapping quality acceptable.

Stronger:

- active source endpoint confirmed;
- all observed values have treatment;
- no unrestricted default;
- mapping passes validation;
- sample conversion approved.

Some judgements will remain qualitative.

Even then, record the responsible decision.

For example:

> The Global Customer Data Owner confirms that the remaining difference between source and target definitions is understood and acceptable for the stated context.

## Avoid criteria that depend only on status fields

Weak exit evidence includes:

- Jira item closed;
- risk marked green;
- owner says complete;
- transport imported;
- workshop held;
- document updated.

These may be part of the evidence.

They do not prove the underlying state.

A transport can be imported with incorrect configuration.

A workbook can be updated with an unsupported mapping.

A workshop can end without a durable decision.

## Assign an exit-criteria owner

The risk owner remains accountable for closure.

Different people may provide evidence:

- source owner;
- migration lead;
- SAP architect;
- integration owner;
- test lead;
- business owner.

The risk record should state who confirms each dimension.

Example:

| Exit dimension | Evidence owner |
|---|---|
| Business meaning | Supplier Data Owner |
| Source availability | ERP_B Owner |
| Dataset state | Migration Data Lead |
| SAP implementation | MDG Architect |
| Regression evidence | Test Lead |
| Residual-risk acceptance | Programme Data Owner |

This prevents the person completing the last technical task from closing the entire risk unilaterally.

## Use independent verification for high-risk items

For critical risks, the person implementing the treatment should not be the only person verifying closure.

Independent review may include:

- another architect;
- data owner;
- test lead;
- audit or control function;
- receiving AMS team.

This is especially important for changes involving:

- legal identifiers;
- bank data;
- enterprise keys;
- global mandatory rules;
- destructive transformations;
- low-detectability defaults;
- large migration populations.

Independent verification does not mean recreating the whole analysis.

It confirms that the agreed evidence supports closure.

## Define hard blockers to closure

Some conditions should prevent closure automatically.

Examples:

- critical affected object has no owner;
- unresolved active mapping points to a retired endpoint;
- temporary deviation has no expiry;
- current dataset has not been rechecked;
- implementation differs from the approved model;
- high-risk residual exposure has no formal acceptance;
- required negative test failed;
- affected population cannot be identified;
- rollback or remediation tracking has been lost.

These blockers should be programme policy.

They should not be waived informally during status meetings.

## Allow conditional exit

Sometimes a risk can leave one stage with conditions.

For example:

```text
Exit from migration-design risk:
Approved

Conditions:
- ERP_B enrichment complete before Mock Load 3
- blocking validation remains disabled until coverage reaches the approved level
- weekly gap report continues
```

This is not full resolution.

It is a controlled transition.

Useful statuses include:

- exited design phase with conditions;
- accepted for test;
- accepted for cutover;
- transferred to AMS;
- permanently resolved.

This provides more precision than one final `Closed` status.

## Define exit criteria for migration gates

## Exit from model design

Possible criteria:

- business meaning approved;
- scope and context defined;
- owner assigned;
- source and target endpoints identified;
- structural validation passes;
- unresolved assumptions documented.

## Exit from mapping design

Possible criteria:

- transformations approved;
- observed values covered;
- defaults controlled;
- local variations explicit;
- current dataset tested.

## Exit from remediation

Possible criteria:

- affected population identified;
- corrected records reconciled;
- residual records classified;
- prevention control implemented;
- owner accepts remaining exceptions.

## Exit from testing

Possible criteria:

- positive, negative and exception scenarios pass;
- failed records explained;
- expected results use the approved baseline;
- critical integrations verified;
- no unresolved blocking defect remains.

## Exit for cutover

Possible criteria:

- critical risks resolved or formally accepted;
- accepted conditions have controls and owners;
- temporary treatments are identifiable;
- rollback or contingency exists;
- reconciliation process approved;
- AMS receives remaining risks.

## Exit from hypercare

Possible criteria:

- recurring incidents assessed;
- emergency changes reconciled;
- temporary workarounds removed or formalised;
- operational baseline updated;
- residual model risks transferred to named AMS owners.

## A risk should not close because the milestone passed

A programme may reach cutover while risks remain.

The risk register should not be cleaned up merely because the migration phase ends.

Possible outcomes are:

- resolved;
- accepted for cutover;
- transferred to hypercare;
- transferred to AMS;
- superseded by another risk;
- reopened after new evidence.

Preserve the continuity.

Otherwise, post-go-live support inherits the exposure without the original rationale or evidence.

## Transfer criteria are as important as closure criteria

When a risk moves from project to AMS, define what must be transferred.

Possible criteria include:

- current risk statement;
- affected model objects;
- remaining population;
- temporary controls;
- owner;
- expiry;
- monitoring method;
- linked incidents;
- approved residual risk;
- next review date.

The receiving team should confirm that it can operate the control.

A risk is not transferred merely because the project document was uploaded.

## Reopen risks when the evidence changes

Closure should not make a risk invisible forever.

Reopening triggers may include:

- new source values;
- data-quality regression;
- configuration change;
- new country rollout;
- changed legal requirement;
- repeated incidents;
- expired control;
- source-system replacement;
- evidence that the original assumption was wrong.

For example:

```text
Risk closed:
ERP_A mapping covers all approved values.

Reopening trigger:
New source value observed without approved treatment.
```

The trigger can become a deterministic or monitoring rule.

## Connect exit criteria to deterministic validation

Some criteria can be checked automatically.

Examples:

- no active reference to retired object;
- every critical mapping has source, target and owner;
- temporary deviation has expiry;
- no approved object depends on draft object;
- local override identifies parent;
- required evidence reference exists.

Martenweave’s current principles place deterministic validation before indexing and treat generated indexes as rebuildable from canonical files.

This supports repeatable structural exit checks.

Automation should not approve semantic or business-risk criteria.

It can show whether the model meets the rules the programme has already defined.

## Connect exit criteria to dataset readiness

For data-related risks, current profiling is often essential.

The current Martenweave core documents dataset profiling, model-to-dataset gap detection and a dataset-readiness workflow.

A data-risk exit might require:

```text
Expected column:
Present

Applicable completeness:
Meets approved programme threshold

Value coverage:
All material observed values treated

Key integrity:
No unresolved critical failures

Remaining exceptions:
Listed with owners
```

The report should reference the same model baseline and population used for approval.

## Connect exit criteria to impact analysis

Before closing a change-related risk, confirm that affected dependencies were reviewed.

For example:

```text
Changed object:
VLIST-SUPPLIER-RISK

Reviewed dependencies:
- mappings;
- rules;
- workflows;
- interfaces;
- tests;
- reports.
```

The current Martenweave CLI includes trace and impact commands over the canonical model.

The impact result does not prove every external dependency exists in the registry.

It proves that the dependencies represented in the approved model were considered.

Known coverage limits should be stated.

## A conceptual exit record

```yaml
risk_id: MRISK-0048
status: ready_for_closure

model_baseline: supplier-model-v2.8
dataset_baseline: ERP_B_supplier_extract_2026-09-01

exit_criteria:
  - criterion: Unrestricted default removed
    status: met
    evidence: CHANGE-SUPPLIER-RISK-021

  - criterion: Current active population has approved treatment
    status: met
    evidence: READINESS-ERP-B-2026-09-01

  - criterion: Future source process is controlled
    status: met
    evidence: SOURCE-CONTROL-ERP-B-17

  - criterion: SAP rule matches approved context
    status: met
    evidence: TEST-MDG-R4-118

  - criterion: Residual records accepted
    status: met
    evidence: DEC-ERP-B-EXCEPTIONS-04

residual_population: 42
residual_risk: low
accepted_by: ROLE-GLOBAL-SUPPLIER-DATA-OWNER
review_date: 2026-12-01
```

This is a conceptual representation rather than a statement of one mandatory Martenweave schema.

The value lies in the explicit evidence chain.

## A worked example: missing source attribute

### Risk

ERP_B cannot provide Supplier Classification.

### Weak closure

The Wave 2 file was manually enriched and loaded successfully.

### Remaining exposure

- future extracts remain incomplete;
- new suppliers remain unsupported;
- enrichment logic is not controlled;
- operational owner is unclear.

### Better exit criteria

- target definition approved;
- authoritative source or enrichment method approved;
- current dataset meets agreed coverage;
- enrichment process is reproducible;
- owner and service level assigned;
- no uncontrolled default remains;
- future gaps are detected automatically;
- residual population formally accepted.

### Possible outcome

Risk is not fully resolved at Wave 2.

It is marked:

> Mitigated for migration and transferred to operational data stewardship.

That is more honest and more useful.

## A worked example: incorrect mandatory rule

### Risk

Customer Group validation blocks inactive customers and countries where the attribute is not used.

### Treatment

Introduce contextual applicability.

### Exit criteria

- approved business contexts recorded;
- global rule replaced by contextual rule;
- SAP configuration updated;
- active applicable records fail when missing;
- inactive or out-of-scope records are not blocked;
- country-specific exceptions pass;
- no broader workflow impact found;
- current model baseline published.

### Closure evidence

- model diff;
- configuration reference;
- positive and negative test results;
- country-owner approval.

## A worked example: retired target endpoint

### Risk

Active mappings reference a target endpoint scheduled for retirement.

### Weak closure

A replacement field was added to the mapping workbook.

### Better exit criteria

- replacement business meaning confirmed;
- target endpoint active;
- every dependent mapping updated;
- transformation consequences assessed;
- interfaces reviewed;
- old endpoint has no active dependencies;
- tests updated;
- target retirement completed or formally scheduled;
- impact report shows no unaddressed critical path.

The risk closes only after the old dependency has been removed from the applicable model state.

## A worked example: temporary migration value

### Risk

`MIGRATION_REVIEW` is treated as a normal Supplier Classification.

### Exit criteria

- operational creation cannot assign the value;
- all records containing it are identified;
- remediation treatment approved;
- records converted or accepted as exceptions;
- downstream reports no longer treat it as final;
- mappings no longer generate it;
- value retired from active model;
- no active rule depends on it.

If 20 records remain under an approved legal hold, the risk may close with a documented residual population rather than requiring artificial zero.

## A worked example: unclear ownership

### Risk

No accountable owner exists for Customer Group mappings.

### Weak closure

A consultant is assigned to review the current workbook.

### Better exit criteria

- business ownership role defined;
- role authority documented;
- operational assignee named;
- current mappings reviewed;
- open decisions transferred;
- future change process includes the owner;
- backup or escalation route established.

The consultant may perform the analysis.

They should not become the permanent governance model by default.

## Use a closure review, not an administrative status update

For material risks, conduct a short closure review.

The reviewer should see:

1. Original risk statement.
2. Approved treatment.
3. Exit criteria.
4. Evidence for each criterion.
5. Current residual exposure.
6. Remaining assumptions.
7. Required monitoring or reopening trigger.
8. Proposed final status.

The review should answer:

> Has the exposure changed enough to justify the proposed status?

It should not become a general project presentation.

## Record unmet criteria explicitly

A risk may be close to resolution.

Do not hide the remaining gap.

Example:

| Criterion | Status |
|---|---|
| Current population remediated | Met |
| Uncontrolled default removed | Met |
| Future source process corrected | Not met |
| Operational owner assigned | Met |
| Monitoring active | Partial |

Proposed status:

> Mitigated, not resolved.

This gives management a truthful decision surface.

## Use waivers sparingly

Sometimes the programme needs to close or transfer a risk with an unmet criterion.

The waiver should identify:

- criterion not met;
- reason;
- consequence;
- compensating control;
- approver;
- expiry;
- reopening trigger.

Example:

```text
Unmet criterion:
ERP_B source process corrected

Waiver:
Accepted for cutover because affected records remain blocked
and source correction is scheduled for the first post-go-live release.

Expiry:
30 November 2026
```

A waiver without expiry is usually permanent acceptance disguised as temporary relief.

## AI can help assemble closure evidence

AI may assist with:

- summarising completed tasks;
- comparing risk criteria with available evidence;
- identifying missing proof;
- grouping test results;
- drafting closure reports;
- finding contradictory status updates;
- suggesting reopening triggers.

AI should not decide that a risk is closed.

It cannot independently determine:

- whether evidence is materially sufficient;
- whether residual business risk is acceptable;
- whether a local legal exception is valid;
- whether an owner has accepted responsibility.

The safe boundary is:

```text
AI assembles and challenges evidence.
Validators check deterministic criteria.
Accountable owners approve the final status.
```

## Where Martenweave fits

The current Martenweave Core README describes an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS. It turns spreadsheets, datasets, tickets, validation reports, decisions and SAP context into canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-approved patch proposals.

Its operating pipeline is:

```text
evidence
→ proposal
→ validation
→ gaps and impact
→ review
→ GitHub issue or pull request
```



For model-risk exit, Martenweave can help preserve:

- affected model objects;
- approved model baseline;
- validation results;
- dataset-readiness evidence;
- impact relationships;
- decisions;
- reviewable model changes;
- issue and change history.

Martenweave should not become a general enterprise risk-management platform.

Its role is to make model-risk evidence traceable to the model state that created or resolved the exposure.

## A Martenweave risk-exit flow

```text
Model risk
        ↓
Approved treatment
        ↓
Exit criteria attached to affected objects
        ↓
Model, data and implementation work completed
        ↓
Deterministic validation
        ↓
Dataset readiness and impact evidence
        ↓
Residual-risk assessment
        ↓
Human closure or transfer decision
        ↓
Current baseline and monitoring updated
```

The core principle is:

> Closing the ticket records completed work. Closing the risk records proven change in exposure.

## A minimum exit-criteria template

### Risk identification

- risk ID;
- affected model objects;
- applicable scope;
- original risk statement.

### Approved treatment

- selected response;
- owner;
- decision reference.

### Required model state

- approved definition;
- mapping;
- rule;
- context;
- lifecycle state.

### Required data state

- population;
- measurement;
- threshold or treatment;
- exception policy.

### Required implementation state

- configuration;
- integration;
- transformation;
- release.

### Required control state

- prevention;
- detection;
- owner;
- monitoring.

### Required evidence

- model baseline;
- dataset baseline;
- validation;
- tests;
- reconciliation;
- approvals.

### Residual risk

- remaining exposure;
- affected population;
- approver;
- expiry or review date.

### Reopening triggers

- new value;
- regression;
- source change;
- incident threshold;
- expired control.

### Final decision

- resolved;
- accepted;
- transferred;
- superseded;
- remains open.

## What management should ask

1. What exact state must be true before this risk closes?
2. Were exit criteria agreed before treatment began?
3. Does the evidence use the current model and dataset baseline?
4. Was the underlying cause corrected, or only the current population?
5. Can the condition reappear?
6. Were affected dependencies tested?
7. Have temporary controls been removed or formalised?
8. What residual population remains?
9. Who accepted the residual risk?
10. Does the risk need transfer rather than closure?
11. What event should reopen it?
12. Has AMS received any remaining control?
13. Are deterministic and semantic criteria clearly separated?
14. Can another reviewer reproduce the closure conclusion?

If the only evidence is a closed ticket or successful load, the exit criteria are probably incomplete.

## Common mistakes

### Closing risk when the mitigation task closes

Activity completion does not prove changed exposure.

### Using one successful migration load as permanent evidence

The next source extract may reproduce the problem.

### Requiring zero defects without defining materiality

Teams may hide or reclassify legitimate residual exceptions.

### Using percentages without examining critical records

Small residual populations can still carry high risk.

### Ignoring prevention

Corrected records do not guarantee future control.

### Leaving temporary workarounds active

The original risk may be replaced by model debt.

### Closing before implementation alignment is verified

The model may be correct while SAP remains different.

### Treating transfer to AMS as resolution

Transferred risks need owners, controls and review dates.

### Allowing the implementer to self-certify every criterion

High-risk closure benefits from independent review.

### Letting AI infer final closure

Residual-risk acceptance remains a human governance decision.

## When a lightweight approach is sufficient

A small programme may manage exit criteria in a controlled spreadsheet.

Useful fields include:

- risk ID;
- exit criterion;
- evidence;
- evidence owner;
- status;
- residual exposure;
- approver;
- reopening trigger.

This may be sufficient when:

- one domain is involved;
- dependencies are simple;
- risks are few;
- one team owns treatment and verification.

A registry-based approach becomes more useful when:

- one risk affects many model objects;
- several sources and countries are involved;
- dataset evidence changes by cycle;
- risks move from project to AMS;
- trace and impact analysis are required;
- several implementation partners provide closure evidence;
- AI assists with evidence processing.

## Our conclusion

A risk is not closed because the programme has done something.

It is closed—or consciously transferred or accepted—because evidence shows that the relevant exposure has reached an approved state.

Good exit criteria connect:

- the original cause;
- affected model objects;
- current data population;
- implementation;
- preventive controls;
- residual risk;
- accountable approval.

The practical test is:

> Could another qualified reviewer examine the stated criteria and evidence and reach the same conclusion about whether the risk is resolved?

When the answer is yes, closure is evidence-based.

When the answer depends on the risk owner saying “the task is done,” the programme has recorded progress but not proven risk reduction.

The purpose of exit criteria is not to make risk closure bureaucratic.

It is to prevent incomplete treatments, temporary workarounds and one successful test cycle from being mistaken for durable model control.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We build practical model-governance infrastructure for SAP migration, MDG, MDM and AMS teams.

Martenweave connects canonical model objects, datasets, mappings, rules, risks, decisions and reviewable changes. This creates a traceable evidence layer for showing not only that remediation work was completed, but that the underlying model exposure actually changed.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as the governance layer of a business data fabric, with governed models, preserved semantics and relationships, collaborative workflows, validated values, business-rule monitoring, mass changes and auditable data changes. SAP also recommends curating clean and correct master data early, before an SAP S/4HANA implementation, because more automated processes rely heavily on it.

The current Martenweave Core README describes Martenweave as an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS. The current source version is listed as 0.5.0.

Martenweave uses canonical model files, deterministic validation, rebuildable generated indexes, dataset-gap analysis, trace and impact analysis, and reviewable `PatchProposal` and `ChangeRequest` workflows.

The current core documents validation, trace, impact and dataset-readiness commands that can support reproducible risk-exit evidence.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
