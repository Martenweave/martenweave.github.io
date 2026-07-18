# How Much Does a Green Dashboard Cost When Every Team Rebuilds the Evidence Behind It?

**Reviewed: 15 July 2026**

How much consulting effort sits behind one green status on a steering-committee slide?

The dashboard may contain a simple line:

```
Material data readiness: Green
```

Behind that line, several teams may have spent days assembling the evidence.

The migration team exports load results.

The data-quality team runs validation.

The functional team checks unresolved defects.

The integration team confirms that replication completed.

The business team reviews exceptions.

The cutover team reconciles scope.

The project-management office copies the results into a presentation.

A senior consultant then explains why the numbers from different reports do not match.

Two weeks later, a mapping changes.

A new dataset is loaded.

Several previous checks become stale.

The programme rebuilds the readiness pack.

The dashboard is green again.

The consulting cost is largely invisible because the deliverable looks small.

> The expensive part of readiness reporting is not the colour on the dashboard. It is repeatedly proving what the colour means.

This is a recurring cost in SAP migration, MDM, integration, cutover and AMS programmes.

The problem is not that teams collect evidence.

They must.

The problem is that evidence is usually assembled as a temporary reporting exercise rather than maintained as part of the model.

Reports are generated from different:

- datasets;
- model versions;
- mapping versions;
- system extracts;
- scopes;
- execution dates;
- validation Rules;
- exclusion lists.

The programme then asks consultants to reconcile the differences manually.

Martenweave can reduce that effort by treating Evidence, Findings, Exceptions, Decisions and readiness criteria as connected model objects.

It does not replace project management.

It does not replace cutover governance.

It does not decide whether the business should go live.

It provides the traceable layer needed to answer:

- What exactly was tested?
- Against which model version?
- Which dataset was used?
- Which Rules passed?
- Which Findings remain?
- Which Exceptions are active?
- Which changes made previous Evidence stale?
- Who approved the current status?

The result is not “automatic go-live approval.”

The result is a readiness process that does not need to reconstruct its own evidence every time it runs.

# The recurring readiness factory

A large SAP programme may have several formal readiness cycles.

Examples include:

- mock-load readiness;
- test-cycle entry;
- test-cycle exit;
- dress rehearsal;
- cutover rehearsal;
- final cutover approval;
- hypercare exit;
- transition to AMS.

Each cycle asks similar questions.

## Scope

Which objects, countries, Plants, interfaces and datasets are included?

## Completion

What was loaded, tested or validated?

## Quality

Which records passed the Rules?

## Gaps

Which required objects or relationships remain missing?

## Findings

Which defects or contradictions remain open?

## Exceptions

Which unresolved conditions are temporarily accepted?

## Evidence

Which reports prove the current state?

## Approval

Who accepts the residual risk?

The questions are stable.

The answers change.

Most programmes rebuild the package because the answers are distributed across:

- Excel workbooks;
- Jira tickets;
- test-management tools;
- migration logs;
- integration-monitoring reports;
- email approvals;
- PowerPoint decks;
- shared folders;
- local consultant notes.

The programme may have all the information.

It does not have one evidence model.

# Our running case

Consider an SAP S/4HANA transformation with:

```
Migration domains:
Business Partner
Supplier
Customer
Material
Finance master data

Countries:
12

Migration waves:
4

Critical interfaces:
35

Formal readiness cycles per year:
8
```

The final material-readiness dashboard says:

```
Materials in scope:
850,000

Loaded successfully:
846,400

Validation pass rate:
98.7%

Critical Findings:
12

Approved Exceptions:
8

Readiness:
Green with conditions
```

The numbers come from different sources.

```
Scope:
cutover tracker

Load success:
migration tool report

Validation pass rate:
data-quality workbook

Findings:
Jira export

Exceptions:
governance presentation

Interface confirmation:
integration status report

Business approval:
meeting minutes
```

The programme has no deterministic guarantee that all of those artefacts refer to the same baseline.

The scope report may use RC5.

The quality report may use RC4.

The interface report may have been produced before the latest mapping change.

The exception presentation may omit two recently added materials.

The steering committee sees one status.

The underlying evidence has several versions of reality.

# Why a readiness dashboard can be correct and still be misleading

Suppose the dashboard says:

```
Validation pass rate:
98.7%
```

That percentage may be mathematically correct.

But managers still need to know:

- What is the denominator?
- Were inactive materials excluded?
- Were records with approved defaults counted as passed?
- Were materials missing from the dataset counted?
- Were all Plants included?
- Did the validation use the final mapping?
- Did the report cover the target system or only the load file?

A number without provenance is difficult to challenge.

A number with provenance can be explained.

For example:

```
Metric:
Material validation pass rate

Result:
98.7%

Dataset:
DATASET-MATERIAL-RC5

Model commit:
7fa21d

Rule set:
RULESET-MATERIAL-CUTOVER-V6

Execution:
RUN-2026-07-14-03

Included records:
850,000

Passed:
838,950

Controlled by Exception:
6,200

Failed:
4,850

Generated by:
Martenweave validator

Approved for reporting by:
Material Data Lead
```

This does not make the result good or bad.

It makes the result inspectable.

# The first recurring cost: collecting the same evidence

Before each readiness meeting, consultants ask teams for:

- latest files;
- latest reports;
- updated counts;
- refreshed defect lists;
- current Exceptions;
- approval confirmation.

The work is partly administrative.

It also requires senior knowledge because someone must decide whether the artefacts are comparable.

The consultant needs to recognise that:

- one report uses a different scope;
- another contains old source codes;
- one exception expired;
- one test used an outdated interface contract;
- the latest mapping invalidated a previous result.

This is not simply copying files into a folder.

It is model reconciliation.

Martenweave reduces the cost by attaching Evidence to the model objects it supports.

```
Evidence
→ generated from Dataset
→ using RuleSet
→ against ModelVersion
→ supports ReadinessClaim
→ addresses Finding
→ approved by Owner
```

The package can then be generated from relationships rather than assembled manually.

# The second recurring cost: reconciling denominators

Readiness teams frequently report different totals.

The migration team says:

```
850,000 materials
```

The quality team says:

```
842,000 materials
```

The warehouse team says:

```
210,000 warehouse-relevant products
```

The business says:

```
795,000 active materials
```

These figures may all be valid.

They describe different populations.

The consulting effort begins when nobody can explain the relationship among them.

A canonical model should preserve named populations.

```
POP-MATERIAL-CUTOVER:
850,000

POP-MATERIAL-ACTIVE:
795,000

POP-MATERIAL-EWM:
210,000

POP-MATERIAL-PRODUCTION-CRITICAL:
14,200
```

Each readiness metric should declare its population.

This stops teams from comparing percentages with different denominators.

It also makes exclusions visible.

```
Excluded:
8,000 obsolete materials

Reason:
Approved retirement Decision

Decision:
DEC-MATERIAL-RETIREMENT-WAVE-3
```

The denominator is no longer buried in a workbook filter.

# The third recurring cost: proving that Evidence is current

A report can remain correct for the state it assessed.

It can still be unusable for the current Decision.

Suppose a validation report was generated on 1 July.

On 5 July:

- the material-group mapping changed;
- 12,000 records were reclassified;
- two interfaces were updated;
- a new Plant entered scope.

The old report is historical Evidence.

It is not current readiness Evidence.

Martenweave should identify the dependency chain.

```
Changed:
MAP-MATERIAL-GROUP

Affected:
12,000 material records
2 interface mappings
3 validation Rules
1 readiness metric
4 Evidence objects
```

The Evidence objects should be marked:

```
Status:
stale

Reason:
Dependent mapping changed

Required action:
revalidate affected population
```

This is where lineage creates direct economic value.

Without lineage, consultants manually decide which reports must be rerun.

With lineage, the system produces the candidate impact.

Experts still confirm whether the change is material.

# The fourth recurring cost: closing Findings without proving closure

A Jira ticket is closed.

The dashboard removes it from the open count.

But what does closure prove?

The ticket may show that:

- code was changed;
- mapping was updated;
- a record was corrected;
- a transport was imported.

It may not prove that:

- the affected population was reprocessed;
- the target system contains the new result;
- downstream interfaces remain aligned;
- the relevant business process works;
- no new contradiction was introduced.

The readiness model should separate:

## Implementation complete

The proposed fix was applied.

## Validation complete

The model and datasets pass the required Rules.

## Target confirmation complete

The current target state matches the intended result.

## Business closure complete

The owner accepts the Evidence and residual risk.

A Finding should not disappear simply because one implementation task is closed.

For example:

```
Finding:
Material packaging mismatch

Implementation:
mapping corrected

Validation:
passed for affected dataset

Target reconciliation:
passed

Warehouse test:
passed

Owner approval:
complete

Status:
closed
```

This makes closure reproducible.

# The fifth recurring cost: managing Exceptions in presentations

Exceptions are often maintained in a separate tracker or steering deck.

An Exception may state:

> Forty Suppliers will use a temporary payment-terms default during cutover.

The programme needs more than that statement.

It should know:

- affected population;
- reason;
- approved fallback;
- operational limitation;
- owner;
- expiry;
- closure condition;
- monitoring requirement.

Conceptually:

```
Exception:
EXC-SUPPLIER-PAYMENT-TERMS

Affected records:
40

Temporary value:
PT30

Allowed use:
Cutover only

Owner:
Finance Data Owner

Expiry:
30 September 2026

Closure condition:
Approved terms loaded and reconciled

Current capacity:
Manual review of all affected invoices
```

A slide can summarise the Exception.

The canonical object should preserve it.

This reduces repeated consulting effort spent reconstructing:

- what was accepted;
- by whom;
- for how long;
- under which control.

# The sixth recurring cost: rebuilding management explanations

The steering committee does not need raw validation output.

It needs an explanation.

Consultants repeatedly transform technical evidence into management language.

For example:

```
Technical:
2,400 materials missing warehouse-product relationship
```

Management explanation:

```
Twenty production-critical components cannot use
the intended line-side replenishment process.

A manual process exists for twelve components.

Eight remain cutover blockers.
```

AI can help produce this translation when the model already contains:

- affected object;
- business capability;
- criticality;
- fallback;
- owner;
- status.

AI should not invent the business impact.

It can draft the explanation from governed relationships.

The expert then reviews it.

This is a strong automation opportunity because it reduces reporting preparation without removing accountability.

# The seventh recurring cost: preparing different views from the same state

Different stakeholders require different views.

## Steering committee

Needs:

- critical blockers;
- risk;
- Decisions;
- trend;
- owner.

## Data lead

Needs:

- failed Rules;
- affected populations;
- mapping issues;
- evidence freshness.

## Integration lead

Needs:

- interface impact;
- contract changes;
- failed messages;
- unresolved consumers.

## Cutover lead

Needs:

- sequence dependencies;
- entry criteria;
- rollback implications;
- final approvals.

## Auditor or assurance reviewer

Needs:

- provenance;
- approvals;
- scope;
- execution history;
- exception controls.

Traditional programmes create separate packs manually.

A canonical evidence registry can generate different views from the same underlying state.

The value is not one dashboard.

The value is avoiding five independent interpretations of the same programme.

# The eighth recurring cost: consultant rotation

A new readiness lead joins the programme.

The lead must learn:

- which reports are trusted;
- which exclusions are legitimate;
- which Exceptions are politically sensitive;
- which metrics are misleading;
- which team owns each Decision.

Without a registry, this knowledge is transferred in meetings.

Important context remains personal.

With Martenweave, the new lead can inspect:

- metric definition;
- supporting Evidence;
- population;
- Rule set;
- Findings;
- Exceptions;
- Decision history;
- owners.

The consultant still needs project context.

The starting point is materially better.

# What Martenweave already supports

Martenweave Core currently defines an open-source, backend-first model-governance and Evidence layer for SAP migration, MDM, data governance and AMS. It turns spreadsheets, datasets, tickets, validation reports, Decisions and SAP context into canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-approved AI patch proposals.

Its generic model includes domains, entities, Attributes, relationships, datasets, mappings, Rules, Evidence, Decisions and change proposals.

Canonical Markdown and YAML files remain the source of truth. Generated indexes are disposable. Objects are validated before indexing, and AI cannot silently mutate the model.

The current pipeline already includes evidence import, validation, gap detection, lineage, impact analysis and reviewed proposal delivery.

The readiness and financial capabilities described below are proposed extensions of that foundation.

# The canonical readiness model

A readiness status should be a derived result.

It should not be an independently maintained colour.

Conceptually:

```
ReadinessClaim
├── applies to Population
├── requires Criteria
├── supported by Evidence
├── blocked by Findings
├── constrained by Exceptions
├── derived from ModelVersion
├── generated by AssessmentRun
└── approved by DecisionOwner
```

For example:

```
Claim:
Material domain ready for Wave 3 cutover

Population:
POP-MATERIAL-WAVE-3

Criteria:
CRITERIA-MATERIAL-CUTOVER-V5

Assessment:
RUN-MATERIAL-RC5

Blocking Findings:
8

Controlled Findings:
12

Exceptions:
4

Status:
Green with conditions

Approved by:
Material Data Lead
Cutover Lead
Business Owner
```

The traffic light is now an output.

The evidence model is the source.

# Deterministic readiness checks

Useful checks include:

## Every claim has a population

No readiness percentage without a denominator.

## Every claim has criteria

“Ready” must mean something explicit.

## Every metric references Evidence

No manually entered number without source.

## Evidence references model and dataset versions

The result must identify what was assessed.

## Open blockers prevent green status

Unless an explicit Decision changes the gate.

## Controlled Findings require valid Exceptions

A risk cannot be labelled controlled without a control.

## Exceptions require owners and expiry

Permanent temporary exceptions should be detected.

## Changed dependencies invalidate Evidence

Affected reports must be rerun or reapproved.

## Approvals reference the assessed state

Approval of RC4 does not automatically approve RC5.

## Generated views remain reproducible

The programme should be able to rebuild the reported status from canonical objects.

# Evidence provenance

A readiness result should retain provenance.

W3C PROV-O defines a model for representing provenance information generated in different systems and contexts. Its core concepts include entities, activities and agents, as well as relationships describing what was used, generated, derived or attributed.

Martenweave does not need to implement the entire ontology to follow the discipline.

A validation result can be treated as:

```
Entity:
validation report

Generated by:
validation execution

Used:
dataset
model version
Rule set

Associated with:
validator
responsible owner

Derived from:
source extract
mapping baseline
```

This gives the programme a defensible chain from reported status back to source evidence.

# Where AI reduces consulting effort

AI can assist with:

- extracting Evidence from reports;
- matching reports to model objects;
- summarising Findings;
- drafting management explanations;
- identifying likely stale Evidence;
- suggesting readiness dependencies;
- preparing exception summaries;
- generating steering-pack text;
- drafting GitHub issues;
- preparing PatchProposals.

For example:

```
AI draft:

Twenty production-critical materials remain blocked
because their warehouse-product relationships
have not been confirmed in the current EWM extract.

Twelve are covered by a validated manual process.
Eight have no accepted fallback.
```

The draft is useful only if the model contains the supporting facts.

AI should not:

- turn a red gate green;
- accept an Exception;
- suppress an unknown population;
- treat a closed ticket as proof;
- reuse stale Evidence automatically;
- approve cutover risk.

The operating model remains:

```
Evidence informs.

AI prepares.

Validators verify.

Experts interpret.

Humans approve.

Git records.
```

# The baseline consulting-cost model

The following financial model is illustrative.

It is not a market benchmark, contractual commitment or guaranteed saving.

Assume:

```
Formal readiness cycles per year:
8

Blended external consulting rate:
€1,200 per consultant-day
```

For each cycle, the programme uses the following effort.

| Readiness activity | Consultant-days per cycle |
|---|---:|
| Collect and confirm source reports | 20 |
| Reconcile populations and denominators | 18 |
| Reconcile Findings and defect status | 16 |
| Review Exceptions and controls | 12 |
| Assess Evidence freshness | 14 |
| Prepare management explanations | 18 |
| Build steering and cutover packs | 20 |
| Review, challenge and revise the pack | 22 |
| **Total** | **140** |

Annual baseline effort:

```
8 cycles × 140 days
= 1,120 consultant-days
```

Annual consulting cost:

```
1,120 × €1,200
= €1,344,000
```

This is not the full programme-management cost.

It is the readiness and evidence-preparation effort targeted by the proposed Martenweave operating model.

# Future-state effort

Assume the canonical model, Evidence registry and readiness Rules are operating.

Experts still need to:

- review new Findings;
- assess risk;
- approve Exceptions;
- challenge evidence quality;
- prepare Decisions.

The repeated collection and reconciliation effort falls.

| Readiness activity | Consultant-days per cycle |
|---|---:|
| Import and validate new Evidence | 8 |
| Review generated population reconciliation | 6 |
| Assess critical Findings | 10 |
| Review Exceptions and controls | 8 |
| Confirm stale or missing Evidence | 7 |
| Review AI-generated explanations | 6 |
| Approve and publish the pack | 10 |
| **Total** | **55** |

Annual future-state effort:

```
8 cycles × 55 days
= 440 consultant-days
```

Annual recurring consulting cost:

```
440 × €1,200
= €528,000
```

Consultant-days avoided:

```
1,120 − 440
= 680 days
```

Gross annual consulting-cost avoidance:

```
680 × €1,200
= €816,000
```

# First-year investment

The registry and operating model require implementation.

## Readiness-model onboarding

Assume:

```
180 consultant-days × €1,200
= €216,000
```

This includes:

- defining readiness Claims and criteria;
- importing priority Evidence;
- connecting Findings and Exceptions;
- modelling populations;
- creating validators;
- configuring CI and review;
- building initial reporting views;
- training the team.

## Tooling, integration and support

Illustrative annual cost:

```
€80,000
```

## Internal Evidence stewardship

Illustrative annual cost:

```
€60,000
```

## Incremental first-year investment

```
€216,000
+ €80,000
+ €60,000
= €356,000
```

# First-year TCO

```
Recurring readiness consulting:
€528,000

Initial implementation:
€216,000

Tooling and support:
€80,000

Internal stewardship:
€60,000

First-year TCO:
€884,000
```

Baseline:

```
€1,344,000
```

First-year net cost reduction:

```
€1,344,000 − €884,000
= €460,000
```

# First-year ROI

Gross benefit:

```
€816,000
```

Incremental investment:

```
€356,000
```

ROI:

```
(€816,000 − €356,000)
÷ €356,000
= approximately 129%
```

Illustrative first-year ROI:

```
129%
```

Estimated payback:

```
approximately 5.2 months
```

# Break-even threshold

At €1,200 per consultant-day:

```
€356,000 ÷ €1,200
= approximately 297 consultant-days
```

The programme must avoid approximately:

```
297 consultant-days
```

The model assumes 85 days avoided per cycle:

```
140 − 55
= 85 days
```

Break-even therefore requires approximately:

```
4 readiness cycles
```

This is a practical threshold.

A small programme with one final readiness exercise may not justify a dedicated evidence platform on this use case alone.

A multi-wave programme with repeated testing, rehearsal, cutover and AMS transitions is a stronger fit.

# Three-year TCO

## Baseline

```
€1,344,000 × 3
= €4,032,000
```

## Martenweave year one

```
€884,000
```

## Martenweave years two and three

Each later year includes:

```
Recurring readiness consulting:
€528,000

Tooling and support:
€80,000

Internal stewardship:
€60,000

Annual TCO:
€668,000
```

Three-year Martenweave TCO:

```
€884,000
+ €668,000
+ €668,000
= €2,220,000
```

Three-year cost reduction:

```
€4,032,000 − €2,220,000
= €1,812,000
```

TCO reduction:

```
44.9%
```

The illustrative three-year ROI on implementation, support and stewardship investment is approximately:

```
285%
```

The economic improvement comes from reuse.

The programme does not rebuild its evidence structure for every readiness cycle.

# Conservative scenario

Assume:

```
Readiness cycles:
6 per year

Baseline effort:
140 days per cycle

Future-state effort:
80 days per cycle
```

Consultant-days avoided:

```
6 × 60
= 360 days
```

Gross benefit:

```
360 × €1,200
= €432,000
```

Incremental investment:

```
€356,000
```

Net benefit:

```
€76,000
```

First-year ROI:

```
approximately 21%
```

The conservative scenario remains positive but modest.

It also shows how the business case can fail.

ROI weakens when:

- only a few cycles occur;
- evidence is not imported consistently;
- teams continue maintaining separate shadow dashboards;
- Exceptions remain in presentations;
- model changes do not invalidate old Evidence;
- internal stewardship is not funded.

The software does not create the saving by existing.

The programme creates the saving by using one readiness model.

# The cost of maintaining two truths

During transition, the programme may maintain:

- the Martenweave registry;
- the old Excel readiness pack.

This is reasonable for one or two cycles.

It is expensive as a permanent operating model.

If the old process remains authoritative, Martenweave becomes another reporting layer.

The programme should decide:

## Canonical truth

Which objects and relationships are authoritative in Martenweave?

## Generated views

Which spreadsheets and slides should be produced from the registry?

## External systems

Which tools remain authoritative for task execution, testing or incidents?

## Reconciliation

How are external states imported as Evidence?

The goal is not to replace every tool.

The goal is to stop maintaining the same readiness meaning independently in every tool.

# What should remain outside Martenweave

Martenweave should not become:

- a generic project-management system;
- a test-execution platform;
- a ticketing replacement;
- a cutover scheduler;
- an integration-monitoring runtime;
- an autonomous approval engine.

The current core explicitly defines itself as a canonical model-governance pipeline rather than a generic workflow platform, hosted MDM application or direct SAP write-back system.

External tools should continue to execute their responsibilities.

Martenweave should connect their outputs to model truth.

```
Jira executes issue workflow.

Test tools execute test cases.

Migration tools perform loads.

Integration tools move and monitor messages.

Martenweave connects the Evidence,
meaning, scope, Findings and Decisions.
```

# The manager-focused readiness view

The Workbench should show the current state without hiding uncertainty.

## Readiness claim

```
Material domain ready for Wave 3 cutover
```

## Status

```
Green with conditions
```

## Population

```
850,000 materials
```

## Evidence coverage

```
Current:
92%

Stale:
5%

Missing:
3%
```

## Findings

```
Critical blockers:
8

Controlled critical Findings:
12

Medium Findings:
46
```

## Exceptions

```
Active:
4

Expiring within 14 days:
2

Missing closure Evidence:
1
```

## Change impact

```
Latest mapping change invalidated:
3 Evidence objects
2 readiness metrics
1 interface test
```

## Confidence

```
Sufficient for conditional approval
```

This is more useful than an unexplained green icon.

# The first product slice

The focused capability should be:

## Evidence-Backed Readiness Registry

### Goal

Generate reproducible readiness Claims from current model objects, datasets, Rules, Findings, Exceptions and approvals.

### Initial objects

- Population;
- ReadinessCriterion;
- ReadinessClaim;
- AssessmentRun;
- Metric;
- Evidence;
- Finding;
- Exception;
- Approval;
- ModelVersion;
- DatasetVersion.

### Initial validations

- readiness Claim without population;
- metric without provenance;
- stale Evidence supporting current status;
- open blocker under green gate;
- controlled Finding without valid Exception;
- expired Exception;
- approval referencing old assessment;
- denominator mismatch;
- missing owner;
- manually overridden status without Decision.

### Initial outputs

- readiness by domain and capability;
- evidence coverage;
- stale-evidence report;
- blocking Findings;
- active Exceptions;
- approval status;
- management summary;
- generated readiness pack;
- historical trend.

# A conceptual readiness Claim

```
---
id: READY-MATERIAL-WAVE-3
type: ReadinessClaim

scope:
  population: POP-MATERIAL-WAVE-3
  wave: WAVE-3

criteria:
  - CRIT-MATERIAL-LOAD
  - CRIT-MATERIAL-VALIDATION
  - CRIT-MATERIAL-INTERFACE
  - CRIT-MATERIAL-BUSINESS-APPROVAL

assessment:
  RUN-MATERIAL-RC5

model_version:
  commit: 7fa21d

evidence:
  - EVID-MATERIAL-LOAD-RC5
  - EVID-MATERIAL-VALIDATION-RC5
  - EVID-MATERIAL-INTERFACE-RC5

blocking_findings:
  - FIND-MATERIAL-001
  - FIND-MATERIAL-002

exceptions:
  - EXC-MATERIAL-DEFAULT-001

status:
  green_with_conditions

approvers:
  - ROLE-MATERIAL-DATA-LEAD
  - ROLE-CUTOVER-LEAD
---
```

This is a proposed product direction.

It is not a claim about the exact current Martenweave schema.

# Proposed commands

A future CLI could support:

```
martenweave readiness assess \
  --claim READY-MATERIAL-WAVE-3 \
  --repo ./model
```

```
martenweave readiness stale-evidence \
  --since CHANGE-MATERIAL-GROUP-MAPPING \
  --repo ./model
```

```
martenweave readiness blockers \
  --wave WAVE-3 \
  --domain material \
  --repo ./model
```

```
martenweave readiness generate-pack \
  --wave WAVE-3 \
  --out ./reports/wave-3-readiness \
  --repo ./model
```

```
martenweave readiness propose-update \
  --claim READY-MATERIAL-WAVE-3 \
  --dry-run \
  --repo ./model
```

These commands describe a recommended capability.

They are not part of the currently documented CLI.

# What managers should require

## Require named populations

No metric without a clear denominator.

## Require versioned criteria

“Ready” must have an explicit, reviewable definition.

## Require Evidence provenance

Every result should identify the dataset, model, Rules, execution and responsible agent that produced it.

## Require automatic staleness checks

A changed dependency should invalidate affected Evidence.

## Require Findings and Exceptions to remain separate

An accepted risk is not the same as a resolved issue.

## Require expiry and closure criteria

Temporary controls must not become permanent invisibly.

## Require generated management views

Do not manually restate the same status across several packs.

## Require human approval

Automation prepares the Decision.

It does not accept the risk.

## Require financial measurement

Track consultant-days per readiness cycle before and after adoption.

# The management questions

1. What exactly does the green status mean?
2. Which population does it cover?
3. Which Rules and criteria define readiness?
4. Which Evidence supports the status?
5. Which model and dataset versions were assessed?
6. Which Findings remain open?
7. Which Findings are controlled by Exceptions?
8. Which Exceptions are close to expiry?
9. Which recent changes made previous Evidence stale?
10. Which metrics use different denominators?
11. Who approved the current state?
12. Can the readiness pack be reproduced from the registry?
13. How many consultant-days were required to prepare it?
14. How much of that effort involved judgement rather than evidence reconstruction?

A programme that cannot answer these questions has a reporting process.

It does not yet have an evidence-backed readiness model.

# Final perspective

A green dashboard should be the result of governed Evidence.

It should not be a manually negotiated summary of disconnected reports.

The practical test is:

> Can we regenerate the current status, trace every number to its source and explain which changes would invalidate it?

When the answer is yes, readiness becomes reusable programme infrastructure.

When the answer is no, every reporting cycle becomes another consulting project.

We are Metalhatscats, the team behind Martenweave.

We are building Martenweave so that readiness reporting becomes a controlled output of model truth:

```
Datasets define the assessed population.

Rules define the criteria.

Evidence proves the result.

Lineage detects what became stale.

Findings expose the remaining gaps.

Exceptions preserve controlled risk.

AI prepares the explanation.

Experts interpret the consequences.

Humans approve.

Git preserves the history.
```

The cost reduction does not come from producing prettier dashboards.

It comes from stopping the repeated reconstruction of the evidence behind them.

## Sources and notes

This article was reviewed on 15 July 2026.

The financial model is illustrative. It assumes eight readiness cycles per year, 140 baseline consultant-days per cycle, 55 future-state days per cycle, a blended external rate of €1,200 per day, 180 implementation days, €80,000 annual tooling and support, and €60,000 annual internal stewardship. These are modelling assumptions, not market benchmarks, vendor guarantees or financial advice.

Martenweave Core currently describes an open-source, backend-first model-governance and Evidence layer for SAP migration, MDM, data governance and AMS. It turns datasets, validation reports, Decisions and SAP context into canonical model files, deterministic validation, dataset gaps, lineage, impact analysis and human-approved proposals.

Its generic model includes domains, entities, Attributes, relationships, datasets, mappings, Rules, Evidence, Decisions and change proposals.

Its current principles keep canonical files authoritative, generated indexes disposable, validation deterministic and AI-generated changes proposal-first.

Its documented workflow moves from source Evidence through validation, gap detection, lineage and impact analysis to reviewed GitHub delivery.

W3C PROV-O is a W3C Recommendation that provides classes and relationships for representing and interchanging provenance information generated by different systems and under different contexts. Its core model connects entities, activities and agents and supports relationships such as generation, usage, derivation and attribution. The article uses this provenance discipline as a reference principle; it does not require Martenweave to implement the complete ontology.

The Evidence-Backed Readiness Registry, readiness objects, proposed commands, financial model and projected savings are product and operating-model directions. They should not be interpreted as guarantees of the exact current Martenweave schema, Workbench functionality, commercial pricing or achieved savings.

Martenweave is independent and is not affiliated with or endorsed by SAP or W3C.
