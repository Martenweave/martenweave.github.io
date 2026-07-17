# How to Design a Closure Evidence Workspace for SAP Migration and MDG

**Reviewed: 14 July 2026**

The programme is preparing for a risk-closure meeting.

The migration lead has a readiness workbook. The SAP team has screenshots from the latest test. The data-quality team has a profiling report. The business owner approved a decision in Jira. The integration team has an email confirming that the new value was accepted.

The risk register says:

> Ready to close.

During the meeting, several questions appear:

- Which model version did the data-quality report validate?
- Was the mapping used in the successful load the approved mapping?
- Does the SAP screenshot show the latest configuration?
- Were all countries included in the test?
- Is the temporary default still active?
- Which downstream systems were checked?
- Who accepted the remaining exceptions?

The evidence exists.

It is not assembled into a coherent proof.

The meeting becomes another reconstruction exercise. Participants search for attachments, compare dates and contact specialists who remember what happened.

Eventually, the risk is closed because the deadline is near and no one can identify a specific reason to keep it open.

That is not evidence-based closure.

It is closure by exhaustion.

> A closure evidence workspace should let reviewers move from a risk to the affected model, data, implementation, tests and residual exposure without reconstructing the programme from separate tools.

The goal is not another executive dashboard.

The goal is a working environment where a qualified reviewer can inspect the claim:

> This model risk is resolved, controlled or consciously accepted.

## Martenweave already has the UI foundation

Martenweave should no longer be described as a backend with a hypothetical future interface.

The repository already contains a browser-based interactive workspace covering:

- Home;
- Models and global search;
- Object detail;
- Lineage;
- Gaps;
- Proposals;
- Proposal review.

These are the correct foundational screens for model-governance investigation.

The current frontend is local-first and uses demo data. It does not yet provide persistence, authentication, a live backend connection or direct mutation of canonical model files. The documented integration direction is to read from the generated SQLite index or a local Martenweave API while retaining the core’s reviewed `PatchProposal` to `ChangeRequest` workflow.

This distinction is important.

The product does not need to invent a dashboard from zero.

It needs to turn the existing model investigation and proposal UI into a connected evidence workspace.

## A closure workspace is not a risk dashboard

A conventional risk dashboard usually shows:

- open risks;
- status;
- probability;
- impact;
- owner;
- due date;
- trend.

This is useful for portfolio management.

It does not prove closure.

A closure workspace must answer a different set of questions:

1. What exactly was the risk?
2. Which model objects were exposed?
3. What treatment was approved?
4. Which canonical changes were made?
5. Does current source data support the new state?
6. Does SAP implement the same approved model?
7. Were connected systems and tests updated?
8. What residual exposure remains?
9. Who reviewed and accepted the conclusion?
10. Can the evidence be reproduced?

The workspace should not merely show that evidence exists.

It should show how the evidence relates.

## Start from the closure claim

Every closure review begins with a claim.

Examples:

> The risk of uncontrolled Supplier Risk defaults has been resolved.

> The risk of mappings referencing a retired target endpoint has been resolved.

> The remaining incomplete tax records have been accepted for cutover under a controlled exception.

> The model risk has been transferred to AMS with an operational control.

This statement should appear at the top of the risk workspace.

Reviewers should immediately see:

- proposed final status;
- affected scope;
- closure owner;
- current baseline;
- decision required.

For example:

```text id="closure-workspace-01"
Risk:
MRISK-SUPPLIER-0048

Closure claim:
Uncontrolled Supplier Risk defaulting has been removed.

Proposed status:
Resolved with accepted residual population

Affected scope:
ERP_B active suppliers, Wave 2

Residual population:
42 inactive suppliers

Closure owner:
Global Supplier Data Owner
```

The rest of the workspace exists to test this claim.

## Design around a proof chain

The core information architecture should follow the closure proof:

```text id="closure-workspace-02"
Risk
→ affected model objects
→ approved treatment
→ canonical model change
→ structural validation
→ dataset evidence
→ implementation evidence
→ test evidence
→ residual risk
→ closure decision
```

A reviewer should be able to move through this chain without opening unrelated systems manually.

The workspace does not need to copy every source document.

It should preserve enough structured metadata and links to establish:

- identity;
- version;
- relationship;
- authority;
- evidence status.

## The workspace should reconcile three forms of truth

A model risk is rarely proven closed by one system.

The workspace needs to compare three states.

## 1. Approved model truth

What the organisation has authorised.

This includes:

- business attributes;
- definitions;
- source and target endpoints;
- mappings;
- rules;
- values;
- contexts;
- ownership;
- decisions.

## 2. Implemented system truth

What SAP MDG, migration code and connected applications currently do.

This includes:

- configured validations;
- workflow behaviour;
- transformations;
- interface contracts;
- active values;
- release state.

## 3. Observed data truth

What current records and datasets actually contain.

This includes:

- available columns;
- completeness;
- observed values;
- key integrity;
- affected populations;
- rejected records;
- exceptions.

Closure becomes credible when these states agree—or when their remaining differences are explicit and accepted.

SAP describes SAP Master Data Governance as a central governance layer that supports governed models, preserved semantics and relationships, validated values, collaborative workflows, business-rule monitoring, quality controls and auditable changes.

The closure workspace should not duplicate those operational capabilities.

It should connect their implementation evidence to the wider migration and model decision context.

## The Home screen should become an evidence queue

Martenweave’s existing Home screen can become the entry point for model investigation and closure work.

It should avoid a generic collection of charts.

The primary content should be actionable queues.

### Risks awaiting evidence

Risks where required proof is incomplete.

### Risks ready for closure review

All mandatory evidence is present, but no accountable closure decision has been made.

### Risks with contradictory evidence

For example:

- model says value retired;
- current dataset still contains it;
- SAP configuration still allows it.

### Expired accepted risks

Residual exposure was accepted temporarily, but the review or expiry date has passed.

### Reopened risks

A monitoring rule or new dataset invalidated the previous closure conclusion.

### High-risk model objects

Attributes, mappings or rules with several unresolved risks.

This makes Home an operational workbench rather than a presentation layer.

## Use meaningful status labels

Avoid relying only on red, amber and green.

Useful closure states include:

- Evidence not started;
- Evidence incomplete;
- Contradictory evidence;
- Ready for review;
- Changes requested;
- Residual acceptance required;
- Closed;
- Transferred to AMS;
- Reopened.

A risk can be green operationally while still requiring an evidence decision.

For example, a successful load may remove immediate urgency while source prevention remains incomplete.

The workspace should allow:

```text id="closure-workspace-03"
Operational status:
Stable

Closure evidence:
Incomplete

Reason:
Current population remediated, but future source control not implemented
```

## Build a dedicated risk detail view

The current UI already has Object Detail. A closure workspace can use the same interaction model for risk records.

The risk detail should show five sections.

## 1. Risk definition

- risk statement;
- cause;
- potential event;
- consequence;
- affected context;
- original likelihood and impact.

## 2. Affected objects

- attributes;
- endpoints;
- mappings;
- rules;
- values;
- datasets;
- decisions;
- integrations.

## 3. Approved treatment

- selected response;
- rejected alternatives;
- responsible owner;
- conditions;
- expiry;
- related change request.

## 4. Closure evidence

- model;
- data;
- implementation;
- testing;
- controls;
- residual-risk approval.

## 5. Final decision

- resolved;
- accepted;
- transferred;
- superseded;
- remains open.

This structure allows a reviewer to understand both the historical risk and the proposed conclusion.

## Reuse Object Detail for model evidence

A reviewer should be able to open any affected model object directly from the risk.

For an attribute, the object view should show:

- definition;
- context;
- lifecycle state;
- owner;
- source and target representations;
- mappings;
- rules;
- values;
- decisions;
- linked risks;
- current validation state;
- last evidence update.

For example:

```text id="closure-workspace-04"
ATTR-SUPPLIER-RISK

Lifecycle:
Active

Owner:
Global Supplier Data Owner

Current source treatments:
ERP_A — direct
ERP_B — reviewed enrichment

Target:
SAP Supplier Risk Classification

Temporary defaults:
None active

Linked open risks:
0

Accepted residual risks:
1
```

This allows the reviewer to verify the current truth instead of relying on the closure report’s summary.

## Use Lineage to show the evidence boundary

The current Martenweave Lineage screen already represents one of the most important parts of closure review.

For a critical attribute, it should show:

```text id="closure-workspace-05"
Dataset column
→ source endpoint
→ mapping
→ business attribute
→ target endpoint
→ validation
→ workflow
→ interface
→ test
```

Evidence status can be shown on the relationships:

- verified;
- changed;
- stale;
- missing;
- out of scope;
- accepted exception.

For example:

```text id="closure-workspace-06"
ERP_B.SUPPLIER_REVIEW_CODE
        ↓ verified
MAP-ERP-B-SUPPLIER-REVIEW
        ↓ verified
ATTR-SUPPLIER-REVIEW-STATUS
        ↓ verified
SAP target endpoint
        ↓ verified
Compliance workflow
        ↓ verified
Outbound analytics
        ↓ evidence missing
```

The closure decision should remain blocked until the missing consumer evidence is reviewed or explicitly declared outside scope.

## Do not make lineage visually impressive but operationally vague

A large graph can create the appearance of control while hiding the actual review question.

The Lineage screen should support focused modes.

### Source trace

Where did the value come from?

### Target trace

Where is the business concept implemented?

### Impact trace

What depends on this object?

### Closure trace

Which dependencies require evidence before this risk can close?

### Historical trace

Which previous mapping or decision produced existing records?

The closure mode should hide unrelated graph nodes and emphasise evidence obligations.

## Turn Gaps into closure blockers

The current Gaps screen should not be limited to dataset-column mismatches.

It can act as the central view for unresolved evidence conditions.

Useful gap types include:

### Model gap

- missing owner;
- missing source;
- missing target;
- unlinked decision;
- invalid context.

### Dataset gap

- required column absent;
- low completeness;
- unmapped values;
- key failure;
- relationship inconsistency.

### Implementation gap

- approved rule not configured;
- active configuration not represented in the model;
- interface missing a field;
- configuration version unknown.

### Test gap

- no negative test;
- stale expected result;
- affected consumer not tested;
- test references an old baseline.

### Closure gap

- residual risk not accepted;
- expiry missing;
- evidence baseline inconsistent;
- prevention control not verified.

Each gap should state whether it:

- blocks closure;
- requires review;
- is informational;
- has been accepted.

## Make closure blockers deterministic where possible

Some closure conditions can be checked automatically.

Examples:

- an active mapping references a retired endpoint;
- a temporary deviation has no expiry;
- a critical object lacks an owner;
- a required evidence category is absent;
- evidence refers to incompatible baselines;
- an approved rule has no linked test;
- a retired value still has active dependencies.

Martenweave Core already prioritises deterministic validation of IDs, types, references and domain-context rules before indexing.

Closure-specific validators can extend the same principle.

They should not decide whether residual business risk is acceptable.

They should prevent obvious structural gaps from being overlooked during review.

## Add an evidence matrix

Every risk detail should include a compact evidence matrix.

| Evidence area | Required | Status | Baseline | Owner |
|---|---:|---|---|---|
| Approved model change | Yes | Complete | supplier-model-v2.8 | Data architect |
| Structural validation | Yes | Passed | supplier-model-v2.8 | Model maintainer |
| Current dataset profile | Yes | Complete | ERP_B 2026-09-01 | Migration lead |
| SAP implementation | Yes | Complete | MDG-R4 | MDG architect |
| Integration verification | Yes | Partial | Contract v6 | Integration owner |
| Regression tests | Yes | Complete | UAT-2 | Test lead |
| Residual-risk approval | Yes | Missing | — | Data owner |

This tells reviewers immediately why closure is not yet available.

The matrix should be generated from structured evidence records rather than maintained manually as another status table.

## Treat evidence as a first-class object

An evidence record should contain more than an attachment.

A useful evidence object includes:

```text id="closure-workspace-07"
Evidence ID:
EVID-SUPPLIER-READINESS-2026-09-01

Type:
Dataset readiness report

Supports:
MRISK-SUPPLIER-0048

Affected objects:
ATTR-SUPPLIER-RISK
MAP-ERP-B-SUPPLIER-RISK

Model baseline:
supplier-model-v2.8

Dataset baseline:
ERP_B extract 2026-09-01

Produced by:
Migration Data Lead

Validation method:
Martenweave dataset-readiness workflow

Result:
Passed with 42 accepted residual records

Status:
Current
```

This allows the workspace to detect stale or incompatible evidence.

## Evidence needs lifecycle state

Evidence should not remain permanently current.

Useful states include:

- Candidate;
- Current;
- Superseded;
- Stale;
- Rejected;
- Missing;
- Accepted with limitation.

A dataset report may become stale when:

- a new extract arrives;
- the mapping changes;
- the target rule changes;
- another country enters scope.

A test may become stale when its model baseline is superseded.

The workspace should flag this automatically where possible.

## Show baseline compatibility

One of the most important workspace functions is determining whether the evidence describes one coherent state.

For each evidence item, compare:

- model baseline;
- dataset version;
- mapping version;
- SAP release;
- interface contract;
- test cycle.

For example:

```text id="closure-workspace-08"
Model evidence:
v2.8

Dataset evidence:
v2.8

SAP implementation:
v2.7

Test evidence:
v2.7

Result:
Closure blocked — SAP and test evidence do not verify the approved model baseline
```

This prevents a common failure where individually valid artefacts are combined into an invalid closure argument.

## Add a before-and-after model view

A closure reviewer should be able to compare:

- state when the risk was opened;
- approved treatment;
- current state.

The view should show semantic differences, not only raw YAML.

For example:

```text id="closure-workspace-09"
Before:
Missing Supplier Risk was defaulted to STANDARD.

After:
No Supplier Risk default is allowed.

New treatment:
Records without classification receive Review Status = PENDING.

Activation:
Blocked until final Supplier Risk is approved.
```

Below this summary, technical users can open the exact canonical file diff.

This serves business and technical reviewers without creating two separate change records.

## Use Proposals to preserve rejected and pending treatments

The current Proposals screen is central to closure evidence.

A risk may have several proposed treatments:

- remediate source;
- introduce default;
- create review status;
- narrow mandatory rule;
- exclude records.

The workspace should show:

- accepted proposal;
- rejected proposals;
- reason for rejection;
- pending follow-up changes.

This is important because closure is not proven merely by showing the implemented solution.

Reviewers need to know whether an unsafe alternative remains active elsewhere.

For example:

```text id="closure-workspace-10"
Rejected proposal:
Default missing values to STANDARD

Reason:
Creates false final classification

Status:
Rejected

Control:
Validator blocks unrestricted default for this attribute
```

## Use Proposal Review as the closure decision surface

Martenweave already has a Proposal Review screen concept. It should also support final closure decisions.

The review should present:

### Closure claim

What status is being requested?

### Semantic summary

What changed?

### Model diff

Which canonical objects changed?

### Validation

Which structural checks passed or failed?

### Evidence matrix

Which proof categories are complete?

### Impact

Which dependencies were reviewed?

### Residual exposure

What remains?

### Coverage limitations

Which external systems or populations were not represented?

### Decision

- Approve closure;
- Approve residual-risk acceptance;
- Transfer to AMS;
- Request changes;
- Reopen investigation.

This keeps the final decision connected to the evidence state.

## Do not combine change approval and closure approval automatically

Approving a model change does not prove that the risk is closed.

The workflow should distinguish:

```text id="closure-workspace-11"
Model change approved
→ implementation
→ data remediation
→ verification
→ closure review
```

For low-risk changes, some stages may be combined.

For material risks, they should remain distinct.

A proposal may be correctly approved but not yet implemented.

The risk should remain open.

## Show coverage limitations prominently

Martenweave can only analyse objects and relationships represented in its model.

A closure report should state:

```text id="closure-workspace-12"
Evidence coverage:

Included:
- ERP_A and ERP_B source mappings
- SAP MDG validation
- supplier outbound interface
- procurement analytics

Not represented:
- local reporting tool in Country X
- historical archive extraction
```

This prevents the UI from creating false confidence.

Unknown coverage should be treated as a review question, not silently assumed unaffected.

## Add role-specific review modes

Different reviewers should see the same closure case through different views.

## Business owner view

Shows:

- original business risk;
- approved treatment;
- affected population;
- remaining exceptions;
- policy impact;
- final acceptance question.

## Migration view

Shows:

- source systems;
- mappings;
- dataset profile;
- remediation;
- rejected records;
- next-load prevention.

## SAP MDG view

Shows:

- target objects;
- validation;
- workflow;
- ownership;
- configuration evidence;
- release and test state.

## Integration view

Shows:

- field and value consumers;
- contract compatibility;
- delivery status;
- failed or missing tests.

## Test view

Shows:

- affected scenarios;
- stale evidence;
- positive and negative cases;
- regression completeness.

## AMS view

Shows:

- continuing control;
- residual risk;
- monitoring;
- temporary deviations;
- reopening triggers;
- next review date.

These should be views over the same evidence graph.

They should not become separate closure documents.

## Make residual risk impossible to hide

A closure workspace should always contain a residual-risk section.

Even when the proposed status is `Resolved`, require an explicit answer:

```text id="closure-workspace-13"
Remaining known exposure:
None identified within stated evidence coverage
```

or:

```text id="closure-workspace-14"
Remaining exposure:
42 inactive suppliers remain PENDING.

Control:
Records cannot be activated.

Owner:
Supplier Data Stewardship.

Review date:
1 December 2026.
```

This prevents “minor exceptions remain” from becoming an ungoverned footnote.

## Build explicit acceptance workflows

When residual risk remains, the workspace should ask:

- What remains?
- Why is further remediation not justified now?
- Which control limits the consequence?
- Who has authority to accept it?
- When will it be reviewed?
- What invalidates the acceptance?

The acceptance record should be distinct from technical evidence.

A developer cannot approve business residual risk simply because all tests passed.

## Add reopening triggers as monitorable rules

Closure should create future monitoring where appropriate.

Examples:

- reopen if an uncontrolled default reappears;
- reopen if completeness falls below the approved programme threshold;
- reopen if a new unmapped value appears;
- reopen when an accepted exception expires;
- reopen if a new country adopts the rule;
- reopen if the source endpoint changes;
- reopen after repeated related incidents.

The workspace can display these triggers on the closed risk.

Where technically feasible, Martenweave validators or dataset-readiness checks can evaluate them.

## Use the workspace after go-live

Closure evidence is not only for migration governance.

It should survive into AMS.

The AMS user should be able to open a production incident and see:

- related model object;
- previous risk;
- approved treatment;
- closure evidence;
- remaining controls;
- reopening conditions.

This allows a recurring incident to challenge a previous closure decision.

For example:

```text id="closure-workspace-15"
Closed risk:
Uncontrolled Customer Group default

New incidents:
12 records received the same default after source upgrade

System action:
Recommend reopening MRISK-CUSTOMER-0031
```

This turns historical closure into operational knowledge rather than an archived report.

## Design the data model before adding more screens

The next product step should not be another dashboard page.

The core needs first-class objects or relationships for:

- ModelRisk;
- Evidence;
- ExitCriterion;
- ResidualRisk;
- ClosureDecision;
- ReopeningTrigger;
- ImplementationReference;
- TestEvidence.

These can connect to existing Martenweave concepts:

- Attribute;
- FieldEndpoint;
- Mapping;
- Rule;
- Dataset;
- Decision;
- PatchProposal;
- ChangeRequest;
- Issue.

The UI can then reuse existing screens and interaction patterns.

Without structured closure objects, the product will display another collection of manually assembled summaries.

## A conceptual closure record

```yaml id="closure-workspace-16"
id: CLOSURE-MRISK-SUPPLIER-0048
risk: MRISK-SUPPLIER-0048
proposed_status: resolved_with_residual

affected_objects:
  - ATTR-SUPPLIER-RISK
  - MAP-ERP-B-SUPPLIER-RISK
  - RULE-SUPPLIER-RISK-REQUIRED

approved_treatment:
  decision: DEC-SUPPLIER-RISK-0094
  change_request: CR-SUPPLIER-RISK-021

evidence:
  model:
    - EVID-MODEL-DIFF-021
    - EVID-VALIDATION-021
  data:
    - EVID-READINESS-ERP-B-2026-09-01
  implementation:
    - EVID-MDG-R4-118
    - EVID-INTERFACE-V6-044
  tests:
    - EVID-UAT2-SUPPLIER-RISK

residual_risk:
  population: 42
  context: inactive_suppliers
  control: activation_blocked
  accepted_by: ROLE-GLOBAL-SUPPLIER-DATA-OWNER
  review_date: 2026-12-01

reopening_triggers:
  - uncontrolled_default_detected
  - completeness_below_approved_threshold
  - new_unmapped_source_value
```

This is a conceptual representation, not a claim about the current Martenweave schema.

The important design principle is that closure becomes a structured, inspectable object rather than a comment on a risk ticket.

## A practical first implementation slice

The smallest useful vertical slice would be:

### Scope

One model risk involving one critical attribute.

### Core additions

- evidence object;
- exit-criteria status;
- closure decision;
- residual-risk record;
- risk-to-model relationships.

### Backend

- load evidence records;
- validate baseline references;
- check required evidence categories;
- generate a closure report;
- prevent closure when blocking criteria fail.

### UI

Reuse existing screens:

- Home: closure queue;
- Object Detail: linked risk and evidence;
- Lineage: closure dependency path;
- Gaps: missing evidence;
- Proposal Review: closure decision.

### Acceptance scenario

A reviewer can:

1. Open a risk.
2. Inspect affected model objects.
3. See the approved treatment.
4. Review model and dataset evidence.
5. Find one missing integration test.
6. Block closure.
7. Attach the missing evidence.
8. Approve closure with an explicit residual population.

This would prove the workspace concept without building a broad risk-management product.

## A second implementation slice

After the first slice works, add:

- evidence staleness;
- baseline compatibility;
- role-specific review views;
- reopening triggers;
- AMS handover state;
- generated closure packs.

Do not begin with:

- enterprise dashboards;
- complex configurable workflows;
- large approval engines;
- direct SAP write-back;
- multi-tenant SaaS architecture.

Those would weaken the backend-first focus before the evidence model proves its value.

## A worked example: closure workspace for a mandatory rule

### Risk

Supplier Classification mandatory rule may block records that lack source support.

### Workspace summary

```text id="closure-workspace-17"
Model baseline:
supplier-model-v2.9

Affected population:
84,000 active suppliers

Valid classification:
82,718

Review Status PENDING:
1,240

Accepted exclusions:
42
```

### Model view

- mandatory rule applies only to active strategic suppliers;
- Review Status is a separate attribute;
- no unrestricted default exists;
- owners and contexts are present.

### Lineage view

- ERP_A direct source verified;
- ERP_B enrichment verified;
- SAP target verified;
- compliance workflow verified;
- analytics consumer verified.

### Gaps view

- no blocking structural gaps;
- one accepted residual population;
- no expired deviation.

### Proposal history

- global default proposal rejected;
- separate Review Status approved;
- mandatory rule narrowed by context.

### Evidence matrix

All required evidence complete.

### Closure decision

Resolved with accepted inactive residual records.

The workspace provides a reusable proof, not just a final meeting deck.

## A worked example: closure blocked by stale evidence

### Risk

Mappings depend on a target endpoint being retired.

### Current evidence

- mappings updated in model version 3.2;
- dataset test used version 3.2;
- SAP test used target configuration from version 3.1;
- one interface test used an old field contract.

### Workspace result

```text id="closure-workspace-18"
Closure status:
Blocked

Reason:
Implementation and integration evidence do not verify model baseline 3.2
```

The team cannot close the risk merely because each evidence category contains an attachment.

The baseline relationship is wrong.

## A worked example: transfer to AMS

### Risk

A source system cannot automatically provide a local tax attribute.

### Migration result

- all cutover records enriched;
- migration completed;
- no load failures;
- future operational records require manual stewardship.

### Workspace decision

```text id="closure-workspace-19"
Migration exposure:
Resolved

Operational exposure:
Transferred to AMS

Control:
Manual stewardship queue

Owner:
Local Tax Data Steward

Monitoring:
Weekly incomplete-record report

Review date:
Quarterly

Reopening trigger:
More than ten overdue records
```

The workspace preserves continuity without keeping the migration programme risk permanently open.

## What the UI should not become

The closure evidence workspace should not become:

- a generic risk-management suite;
- a replacement for Jira or ServiceNow;
- a document repository;
- an SAP monitoring platform;
- a large workflow engine;
- an opaque AI assistant;
- an executive dashboard disconnected from model objects.

Its defensible role is narrower:

> Investigate and prove model-risk treatment through connected model, data, implementation and decision evidence.

That is directly aligned with Martenweave’s north star.

## How AI should appear in the workspace

AI can assist with:

- assembling evidence from tickets and reports;
- drafting the closure claim;
- identifying missing evidence;
- comparing model baselines;
- summarising dataset changes;
- suggesting affected dependencies;
- proposing reopening triggers;
- generating reviewer-specific summaries.

AI output should be visually labelled as:

- suggested;
- inferred;
- incomplete;
- awaiting review.

It should not display:

```text id="closure-workspace-20"
AI confidence: 94%
Risk closed
```

A numeric confidence score does not substitute for authority or evidence completeness.

The safe workflow remains:

```text id="closure-workspace-21"
AI assembles and challenges.

Validators verify structure.

The UI exposes the evidence.

Responsible humans decide.
```

## What management should ask

1. Does the workspace begin from a precise closure claim?
2. Can reviewers see the affected model objects?
3. Does the evidence belong to one coherent baseline?
4. Can the dataset population be inspected?
5. Does the UI distinguish remediation from prevention?
6. Can SAP implementation evidence be compared with the approved model?
7. Are downstream consumers represented?
8. Are missing tests visible as closure gaps?
9. Is residual risk impossible to hide?
10. Does closure require the correct accountable roles?
11. Can closed risks be reopened by new evidence?
12. Can AMS inspect the original closure proof?
13. Does the UI use the existing Models, Object, Lineage, Gaps and Proposals capabilities?
14. Is the workspace connected to the backend rather than maintaining another manual status layer?

If the workspace only shows a green badge and attachments, it has digitised the old meeting process without improving it.

## Common mistakes

### Starting with an executive dashboard

The evidence model remains weak underneath attractive charts.

### Creating a separate closure document

It quickly diverges from the canonical model and current datasets.

### Treating every attachment as current evidence

Evidence needs baseline, scope, owner and lifecycle.

### Hiding contradictions

Conflicting model, data and implementation evidence should block closure.

### Using lineage without evidence state

A graph alone does not prove that dependencies were tested.

### Showing one global status for partial scope

Country, source and population differences become invisible.

### Letting the proposal approval close the risk automatically

Implementation and verification still need to occur.

### Ignoring the existing Martenweave UI

The product already has the right investigation surfaces.

### Building persistence before defining evidence objects

The system would persist weak, unstructured status data.

### Allowing AI to approve closure

Closure remains an accountable governance decision.

## Our conclusion

A closure evidence workspace should not answer only:

> Is the risk closed?

It should allow reviewers to understand why that conclusion is justified.

The workspace should connect:

- risk;
- affected model;
- approved treatment;
- canonical change;
- structural validation;
- dataset evidence;
- SAP and integration implementation;
- tests;
- residual exposure;
- accountable decision.

Martenweave already has the essential UI foundation for this work:

- Home for queues;
- Models for discovery;
- Object Detail for current truth;
- Lineage for dependencies;
- Gaps for blockers;
- Proposals for candidate treatments;
- Proposal Review for controlled decisions.

The next step is not to claim that Martenweave needs a UI.

It is to connect the existing UI to live canonical models, generated indexes, datasets, evidence records and review state.

The practical test is:

> Can a reviewer open one SAP migration risk in Martenweave, inspect the full evidence chain and approve or reject closure without manually reconstructing the story from Excel, Jira, screenshots and individual memory?

When the answer is yes, closure evidence has become an operational capability.

When the answer is no, the programme may have many tools and documents but still depends on meetings to decide whether its own risks are truly controlled.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We build practical model-governance infrastructure for SAP migration, MDG, MDM and AMS teams.

Martenweave combines a backend-first canonical model, deterministic validation, dataset analysis, lineage and proposal workflows with an existing interactive workspace for model search, object investigation, gaps, lineage and review.

The product direction is not another generic dashboard.

It is a connected evidence workspace where teams can investigate model problems, review proposed treatments and prove that risks have reached an approved state.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer that unifies master data, policy and metadata. Its stated capabilities include governed models, preserved semantics and relationships, collaborative workflows, validated values, business-rule monitoring, quality controls, mass changes and auditable data changes. SAP also recommends preparing clean and correct master data early because automated SAP S/4HANA processes rely heavily on it.

The current Martenweave Core README describes Martenweave as an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS. It uses canonical model files, deterministic validation, generated indexes, dataset-gap analysis, trace, impact analysis and human-reviewed proposals.

The Martenweave repository already includes a browser-based interactive workspace with Home, Models, Object Detail, Lineage, Gaps, Proposals and Proposal Review screens. The current frontend is local-first and uses demo data; its documented integration direction is to consume the generated SQLite index or a local Martenweave API while preserving the core review workflow.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
