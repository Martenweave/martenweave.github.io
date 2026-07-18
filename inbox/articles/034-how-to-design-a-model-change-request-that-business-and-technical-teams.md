# How to Design a Model Change Request That Business and Technical Teams Can Review Together

**Reviewed: 14 July 2026**

A business owner requests a change:

> Make Supplier Classification mandatory.

The request sounds clear.

The SAP team asks which field should become mandatory.

The migration team asks which source systems can populate it.

The country teams ask whether the rule applies globally.

The integration team asks whether downstream applications accept every classification value.

The test lead asks which scenarios should now fail.

The business owner is surprised.

They were asking for a governance control, not a technical investigation.

A technical change request is created. It lists:

- target field;
- validation object;
- transport;
- estimated effort;
- test environment.

The business owner approves it because the title still says “Make Supplier Classification mandatory.”

During testing, thousands of suppliers fail validation.

The source field is incomplete in one ERP. Historical suppliers were never intended to be included. One country uses Supplier Classification for a different purpose. A downstream interface does not recognise two of the target values.

The implementation team delivered the requested technical change.

The programme never created a shared review object connecting business intent with implementation consequences.

This is the purpose of a model change request.

> A model change request should allow business and technical reviewers to evaluate the same proposed model state from their respective responsibilities without forcing either group to infer what the other means.

The business reviewer should understand:

- what business meaning changes;
- where it applies;
- why it is needed;
- which risks are accepted.

The technical reviewer should understand:

- which model objects change;
- what dependencies are affected;
- whether current data and systems support the proposal;
- how implementation will be verified.

Neither group should approve a vague summary that hides the part it does not understand.

## A model change request is not merely a ticket

A ticket is useful for managing work.

It can contain:

- requester;
- priority;
- assignee;
- due date;
- status;
- discussion;
- attachments.

A model change request has a different purpose.

It should define the proposed movement from one approved model state to another.

```text
Current approved state
        ↓
Proposed model difference
        ↓
Business and technical impact
        ↓
Required decisions
        ↓
Approval or rejection
```

The delivery ticket may be created before, during or after this process.

But work should not begin merely because a ticket exists.

The programme should first determine whether the requested change is:

- clearly defined;
- supported by evidence;
- structurally valid;
- reviewed by the right authorities;
- feasible across affected systems.

## SAP MDG workflow does not remove the need for cross-team model review

SAP currently describes SAP Master Data Governance as supporting governed models, collaborative change-request workflows, validated values, attribute ownership, business-rule monitoring and auditable changes.

These capabilities are relevant to operational master-data governance.

A programme still needs to determine what a proposed implementation change means across:

- business definitions;
- data sources;
- migration;
- SAP configuration;
- local contexts;
- integrations;
- testing;
- AMS.

The platform can route an approved operational change to the right participants.

It does not automatically create a complete implementation decision package from a sentence such as:

> Add a new supplier category.

The programme needs a model-level review before the requested behaviour is treated as approved design.

## Begin with the decision—not the requested solution

Many change requests arrive as solutions:

- add a field;
- create a value;
- make the field mandatory;
- change the target;
- disable the validation;
- add an approval step.

The first section of the model change request should describe the problem independently of the proposed solution.

Weak problem statement:

> We need value `UNDER_REVIEW`.

Stronger problem statement:

> Suppliers requiring additional compliance investigation cannot currently be represented without assigning a final risk classification. Users are applying inconsistent workarounds, and 1,442 migrated suppliers remain unresolved.

The stronger statement allows reviewers to consider alternatives.

Possible treatments may include:

- new value;
- separate status attribute;
- workflow state;
- temporary migration marker;
- existing exception process;
- no model change, but process correction.

Starting from the requested field or value can prematurely lock the discussion into one technical design.

## Show the current approved state

Reviewers need to know what exists before they can judge the change.

The request should identify:

- model baseline;
- affected objects;
- current meaning;
- current context;
- current owner;
- current implementation;
- known deviations.

For example:

```text
Model baseline:
Supplier Model 2.4

Attribute:
ATTR-SUPPLIER-RISK

Current values:
LOW, MEDIUM, HIGH

Current rule:
Mandatory for active strategic suppliers

Current workflow:
HIGH requires Compliance approval

Known deviation:
ERP_B migration population uses temporary blank treatment
until remediation is complete.
```

Without the current state, the request can misrepresent the change as smaller than it is.

“Add one value” may actually alter:

- business semantics;
- workflow;
- migration logic;
- interfaces;
- reporting.

## Describe the proposed state precisely

The proposed state should be written in business-readable terms and supported by structured model changes.

Business-readable description:

> Introduce `UNDER_REVIEW` as a temporary Supplier Risk value for suppliers undergoing compliance assessment. The value may be assigned only in Portugal, cannot be used for final supplier approval and must trigger a compliance review workflow.

Structured model implications:

```text
Modify:
VLIST-SUPPLIER-RISK

Add value:
UNDER_REVIEW

Context:
Country = PT

Modify:
RULE-SUPPLIER-RISK-APPROVAL

Modify:
WF-SUPPLIER-COMPLIANCE

Add:
Temporary-value monitoring rule
```

The business statement explains the intended policy.

The structured list explains what would change in the model.

Both are necessary.

## Separate meaning from implementation

A model change request should distinguish at least three layers.

## Business change

What policy, meaning or ownership changes?

Example:

> Suppliers under active investigation need a non-final classification.

## Model change

Which attributes, values, relationships, rules or contexts change?

Example:

> Add contextual value `UNDER_REVIEW` to Supplier Risk and define restrictions.

## Implementation change

Which systems and components must be updated?

Example:

- SAP MDG value list;
- workflow route;
- validation;
- outbound interface;
- migration mapping;
- quality report;
- tests.

This separation prevents a technical limitation from silently redefining the business requirement.

It also prevents a business approval from being interpreted as approval of every implementation detail.

## Use stable object identifiers

The request should identify affected model objects precisely.

Examples:

```text
ATTR-SUPPLIER-RISK
VLIST-SUPPLIER-RISK
RULE-SUPPLIER-RISK-REQUIRED
WF-SUPPLIER-COMPLIANCE
MAP-ERP-B-SUPPLIER-RISK
```

Names are useful for readers.

Identifiers provide reliable references across:

- canonical model files;
- Excel reviews;
- GitHub;
- Jira;
- test systems;
- implementation documentation.

The reviewer should not need to understand the identifier format.

The delivery system needs the identity to avoid ambiguity.

## Define scope and applicability explicitly

A model change request should never rely on phrases such as:

- for selected countries;
- for active records;
- where applicable;
- except historical data;
- only for important suppliers.

These phrases need structured scope.

For example:

```text
Country:
Portugal

Business Partner category:
Organisation

Role:
Supplier

Status:
Active

Supplier segment:
Regulated

Effective release:
R4

Migration applicability:
New and active migrated suppliers only
```

Scope is not a minor detail.

It determines:

- dataset population;
- validation behaviour;
- workflow routing;
- remediation effort;
- testing;
- local ownership.

## Distinguish permanent changes from temporary deviations

A temporary workaround should not be presented like a permanent model enhancement.

The request should classify the proposed change as one of:

- permanent global model change;
- permanent local extension;
- contextual override;
- temporary operational deviation;
- migration-only treatment;
- implementation correction;
- documentation clarification.

Temporary changes require:

- owner;
- expiry date;
- measurable review trigger;
- remediation plan;
- restrictions on new use.

Example:

```text
Change type:
Temporary migration deviation

Expiry:
Before production cutover

Review trigger:
ERP_B source remediation completed

Restriction:
Value may not be assigned through operational creation workflow
```

Without these conditions, temporary values and defaults tend to survive indefinitely.

## Include the evidence

The request should show why the change is being considered.

Useful evidence may include:

- dataset profile;
- incident volume;
- legal requirement;
- process analysis;
- test defect;
- source-system specification;
- interface rejection;
- business decision;
- audit finding.

Example:

```text
Dataset:
erp_b_suppliers_2026-07-10.csv

Affected records:
1,442 active suppliers

Current source values:
STRAT, PENDING, blank

Current approved target coverage:
88%

Related incidents:
27 in the previous quarter
```

Evidence should be referenced, not replaced by broad statements such as:

> Business requires this.

The request may still rely partly on expert judgement.

That should be visible.

## State the evidence quality

Not all evidence has equal strength.

A useful classification is:

### Confirmed

Approved policy, validated dataset result or tested system behaviour.

### Representative

Evidence exists but covers only part of the scope.

### Expert judgement

Responsible experts support the conclusion, but direct evidence is limited.

### Assumption

The programme needs to proceed, but the statement is not yet confirmed.

### Unknown

No reliable evidence is currently available.

For example:

```text
Source completeness for ERP_A:
Confirmed

Source completeness for ERP_B:
Representative sample only

Downstream reporting impact:
Unknown
```

This prevents reviewers from interpreting all listed facts as equally certain.

## Present realistic alternatives

A change request should not be written as if only one solution exists.

For a material change, show the serious alternatives considered.

Example:

### Option A: add `UNDER_REVIEW` to Supplier Risk

Benefits:

- easy to understand;
- supports current workflow need.

Risks:

- mixes final classification with process status;
- may be consumed incorrectly downstream.

### Option B: create a separate Review Status attribute

Benefits:

- preserves Supplier Risk semantics;
- separates process and classification.

Risks:

- requires new field and interface work.

### Option C: use workflow state only

Benefits:

- no additional business value.

Risks:

- status may not be visible in all consumers.

### Option D: no model change

Benefits:

- avoids expansion.

Risks:

- current workaround and incident pattern remain.

Reviewers can now evaluate the actual trade-off.

## State the recommended option without hiding alternatives

The author of the change request should make a recommendation.

A request containing only neutral options transfers the analysis burden entirely to the governance board.

Example:

> Recommend Option B. `UNDER_REVIEW` describes process state rather than supplier risk. A separate status preserves the approved meaning of Supplier Risk and prevents downstream systems from treating an unresolved supplier as a final classification.

The recommendation may be rejected.

The reasoning should still be explicit.

## Show dataset impact

A model change can be structurally sensible and operationally unrealistic.

The request should assess the current data population.

For affected attributes, include:

- column availability;
- completeness;
- observed values;
- mapping coverage;
- affected record count;
- key or relationship gaps;
- required remediation.

Example:

```text
Current active suppliers in scope:
24,800

Valid existing risk classification:
22,458

Blank:
900

Pending or ambiguous source values:
1,442

Source systems without direct support:
ERP_B
```

This gives the business reviewer a view of implementation consequence.

It also prevents the technical team from configuring a rule that the current population cannot satisfy.

## Show migration impact separately

Operational and migration treatments may differ.

The request should answer:

- Does this apply to existing migrated records?
- Does historical data require remediation?
- Can the source populate the proposed value?
- Is a temporary default needed?
- Will the next mock load fail?
- Which migration waves are affected?

For example:

```text
Operational creation:
New status must be selected by Compliance.

Migration:
Existing ERP_B records may be assigned temporary status
only when included in the approved remediation population.

Cutover:
No unrestricted default permitted.
```

The change should not accidentally convert a migration workaround into the permanent operating model.

## Show SAP MDG impact

The SAP or MDM implementation section should identify expected technical areas without pretending the final build design is already complete.

Possible areas include:

- entity or attribute configuration;
- value list;
- UI;
- validation;
- derivation;
- change-request type;
- workflow routing;
- authorisation;
- activation;
- replication.

For example:

```text
Expected SAP MDG impact:

- add Review Status attribute;
- expose field in supplier change request;
- restrict maintenance to Compliance role;
- route PENDING status to compliance approval;
- prevent final activation while status remains PENDING;
- include status in outbound interface.
```

The responsible SAP architect should confirm technical feasibility.

Business approval alone should not be interpreted as technical acceptance.

## Show integration and consumer impact

Every new or changed value should be assessed against consuming systems.

Questions include:

- Is the field replicated?
- Which systems consume it?
- Do consumers validate allowed values?
- Does the field drive reporting, pricing or workflow?
- Is code conversion required?
- Can an old consumer ignore the new value safely?
- Does the interface contract need a new version?

Example:

| Consumer | Current use | Change impact | Owner |
|---|---|---|---|
| Procurement analytics | Groups suppliers by risk | New status must be excluded from final risk distribution | Analytics owner |
| Compliance workflow | Routes HIGH risk | New status requires separate queue | Compliance IT |
| Legacy portal | Displays risk code | Does not support new field | Portal owner |

A new value that works inside MDG can still break the enterprise process.

## Show ownership impact

A change may introduce new responsibilities.

The request should identify:

- business owner;
- data owner;
- local owner;
- operational steward;
- technical owner;
- remediation owner.

For example:

```text
Business meaning:
Global Supplier Risk Owner

Operational status:
Compliance Process Owner

Portugal applicability:
PT Procurement Data Owner

Source remediation:
ERP_B Data Owner

Technical implementation:
SAP MDG Product Owner
```

A model element with no owner is not ready merely because it is technically implementable.

## Show control and compliance impact

Where relevant, the request should assess:

- segregation of duties;
- regulatory obligation;
- audit evidence;
- retention;
- data privacy;
- approval authority.

Do not add a generic “Compliance impact: none” field to every request.

Use this section where the change genuinely affects control design.

The evidence may still need specialist review.

A model-governance workflow should not infer legal approval from a business owner’s agreement.

## Show impact on tests

A model change request should identify existing evidence that becomes stale.

Examples:

- value-list tests;
- mandatory-rule tests;
- workflow tests;
- authorisation tests;
- migration tests;
- interface tests;
- reports.

Use a minimum regression map:

```text
Existing tests affected:
TC-SUP-114
TC-SUP-118
TC-INT-042
TC-MIG-207

New tests required:
- PENDING status creation
- non-Compliance user restriction
- activation blocked while PENDING
- outbound interface handling
```

Testing should prove the proposed business behaviour, not merely that the transport succeeds.

## Show risk in business terms

A change request should not rely only on technical severity.

Useful risk statements include:

- legitimate suppliers may be blocked;
- unresolved classifications may be reported as final;
- source remediation may delay cutover;
- local values may become visible globally;
- interface consumers may reject records;
- AMS may inherit an unowned temporary process.

For each risk, identify:

- likelihood;
- consequence;
- control;
- owner;
- residual risk.

The framework can remain lightweight.

The objective is to ensure reviewers understand the operational trade-off.

## Define the approval question precisely

A review meeting often ends with:

> Approved.

But what exactly was approved?

The request should state the decision explicitly.

For example:

> Approve the introduction of a separate Supplier Review Status attribute for Portuguese regulated suppliers, with values `PENDING`, `CLEARED` and `REJECTED`, subject to interface support and completion of regression testing.

This is better than:

> Approve supplier classification change.

The approval statement should identify:

- model treatment;
- scope;
- conditions;
- effective release.

## Separate approval domains

One approval status is often too coarse.

A request may need distinct decisions.

### Business semantic approval

Is the meaning and policy correct?

### Data approval

Can sources and current populations support the change?

### Architecture approval

Is the model coherent?

### Implementation approval

Is the design technically feasible?

### Local approval

Is the contextual treatment correct?

### Risk acceptance

May unresolved conditions proceed?

### Release approval

Is implementation ready to deploy?

The model change should not become approved merely because one of these is complete.

A practical request can show a review matrix:

| Review | Responsible role | Status |
|---|---|---|
| Business meaning | Global Supplier Risk Owner | Approved |
| Portugal scope | PT Data Owner | Approved |
| Dataset feasibility | Migration Lead | Approved with condition |
| SAP implementation | MDG Architect | Pending |
| Interface compatibility | Integration Owner | Pending |
| Final model approval | Data Governance Authority | Not started |

## Do not ask reviewers to approve areas outside their authority

The business owner should not be asked to certify:

- YAML validity;
- interface design;
- transport completeness.

The developer should not be asked to approve:

- business meaning;
- legal applicability;
- risk acceptance.

Each reviewer should receive a clear question.

For example:

### Question to business owner

> Does the proposed Review Status preserve the intended meaning of Supplier Risk and correctly represent the business process?

### Question to migration lead

> Can the current source population support this treatment, including the proposed temporary migration rule?

### Question to integration owner

> Can each identified consumer receive or safely ignore the new attribute and values?

This produces meaningful approval rather than ritual sign-off.

## Use one shared request with role-specific views

Business and technical teams should review the same underlying proposal.

They do not need the same presentation.

### Executive summary

Shows:

- problem;
- proposed outcome;
- major impact;
- decision required.

### Business view

Shows:

- meaning;
- scope;
- values;
- policy;
- ownership;
- evidence;
- alternatives.

### Technical view

Shows:

- object IDs;
- mappings;
- validation;
- interfaces;
- implementation components;
- tests.

### Detailed evidence

Shows:

- dataset results;
- issue links;
- model diff;
- affected objects.

The views should be generated from one change object.

Do not create separate business and technical documents that can diverge.

## Keep proposed and approved state separate

A model change request should never directly modify the canonical model merely because it has been submitted.

Martenweave’s current design explicitly separates proposals from approved changes. Its canonical files remain the source of truth, deterministic validation runs before indexing, and proposed AI-assisted changes enter as `PatchProposal` objects before approved changes become `ChangeRequest`s.

The same lifecycle should apply to all sources of change:

- spreadsheet input;
- Jira request;
- workshop decision;
- dataset finding;
- architect proposal;
- AI suggestion.

```text
Evidence
→ model change request
→ PatchProposal
→ validation
→ impact analysis
→ review
→ approved ChangeRequest
→ canonical update
```

The source of the proposal does not determine its authority.

## Use deterministic validation before review

Before asking business owners to review meaning, basic structural checks should pass.

Examples:

- affected object IDs exist;
- proposed references resolve;
- object types are valid;
- local override identifies a global parent;
- new value code is unique;
- retired objects have no unaddressed active dependencies;
- mandatory ownership fields are present;
- context is structurally valid.

This prevents reviewers from spending time on a proposal that cannot be represented consistently.

The validator should not decide:

- whether the new value is meaningful;
- whether the business risk is acceptable;
- whether the local requirement is justified.

It prepares a clean decision surface.

## Generate an impact report before approval

The model change request should not depend only on the author’s list of affected areas.

Run trace and impact analysis against the canonical model.

Martenweave currently supports validated canonical model files, generated indexes, trace, impact analysis, dataset gap detection and proposal-oriented workflows.

The impact report may identify:

- direct dependencies;
- local variants;
- affected mappings;
- relevant datasets;
- rules;
- decisions;
- tests;
- owners.

The output should distinguish:

### Confirmed impact

Known dependency will change.

### Review required

Relationship exists, but consequence requires judgement.

### Informational

Connected object is unlikely to require implementation work.

This keeps the report usable.

## Use draft status for incomplete proposals

Not every model request is ready for formal review.

GitHub supports draft pull requests as work-in-progress proposals that cannot be merged until marked ready for review.

The same concept is useful regardless of the review tool.

Suggested lifecycle:

```text
Draft
→ Evidence gathering
→ Ready for review
→ Changes requested
→ Approved
→ Implementation
→ Verified
→ Closed
```

A request should remain Draft when:

- the problem is unclear;
- evidence is missing;
- alternatives have not been assessed;
- affected objects are unidentified;
- the owner is unknown.

Do not schedule governance approval simply because a ticket has reached its due date.

## Record reviewer comments against the proposal

GitHub pull-request reviews allow reviewers to comment, approve or request changes, and conversations can be retained as part of the review history. Required approvals can also be used to prevent premature merging.

A model change review should preserve the same basic concepts even when business reviewers use another interface:

- comment;
- approve;
- reject;
- request clarification;
- request modification.

Comments should attach to:

- an affected model object;
- a specific proposed value;
- a rule;
- a stated risk;
- an alternative.

A general email saying “looks okay” is weak evidence for a material change.

## Re-review after material changes

Review applies to a specific proposal state.

Suppose reviewers approve:

> Add a local warning.

The proposal is later changed to:

> Add a global blocking error.

The previous approvals no longer apply.

The process should detect material changes to:

- meaning;
- scope;
- severity;
- values;
- owner;
- migration treatment;
- affected systems.

Then request review again from the relevant roles.

Minor wording corrections may not require complete reapproval.

The policy should distinguish editorial and material changes.

## Define the implementation boundary

Approval of the model does not mean implementation is complete.

After model approval, create implementation tasks for affected systems.

For example:

```text
Approved model change
        ↓
SAP MDG configuration task
Migration mapping task
Interface task
Test task
Documentation task
Data-remediation task
```

The approved change request should remain linked to these tasks.

The model status may progress through:

```text
Approved
→ Implementing
→ Implemented
→ Verified
→ Effective
```

This avoids treating governance approval as evidence that production already matches the model.

## Verify the implemented result

After implementation, compare:

- approved model;
- configured state;
- observed behaviour.

Verification evidence may include:

- SAP configuration reference;
- successful positive test;
- successful negative test;
- interface result;
- migration reconciliation;
- authorisation check;
- release version.

If implementation differs, classify the difference:

- implementation defect;
- approved deviation;
- model clarification;
- new change request.

Do not silently update the model to match whatever was implemented.

## A worked example: mandatory Supplier Classification

### Request

Make Supplier Classification mandatory.

### Problem

Suppliers without classification bypass risk-based review and create inconsistent reporting.

### Current model

Supplier Classification is optional globally.

### Scope analysis

The request affects active strategic suppliers in Germany and Austria—not all suppliers globally.

### Dataset evidence

- Germany: 98.7% complete;
- Austria: 96.1% complete;
- ERP_B population: 72.4% complete;
- historical inactive suppliers: 41% complete.

### Alternatives

1. Mandatory globally.
2. Mandatory only for active strategic suppliers.
3. Warning first, error after remediation.
4. Keep optional and monitor quality.

### Recommendation

Option 3:

- introduce contextual warning;
- complete ERP_B remediation;
- convert warning to error at defined threshold.

### Model changes

- add DE/AT context;
- update rule;
- add quality threshold;
- record remediation decision;
- define severity transition.

### Technical impact

- SAP validation;
- MDG message;
- dataset check;
- migration readiness;
- regression tests.

### Approval questions

Business owner:

> Is the contextual population correct?

Migration owner:

> Is the remediation threshold achievable?

MDG architect:

> Can severity change be controlled by release without inconsistent behaviour?

### Result

Approved with conditions.

The original one-sentence request becomes a controlled, staged policy change rather than a global blocking rule.

## Another worked example: disabling a tax validation

### Request

Disable tax validation because users cannot complete supplier creation.

### Evidence

- 38 incidents in one country;
- most failures concern individual suppliers;
- approved rule was intended for organisations;
- configuration applies to both categories.

### Classification

Configuration defect—not a model-policy change.

### Correct action

- correct configured context;
- rerun tests;
- preserve approved model;
- link verification evidence.

A weak process might ask the business owner to approve disabling the rule.

A good model change request identifies that no model change is needed.

## Another worked example: changing a source field

### Request

Replace source field `CUSTOMER_SEGMENT` with `CUSTOMER_CLASS`.

### Evidence

The original field is being retired.

### Questions

- Does the new field have the same business meaning?
- Is its organisational level the same?
- Are values compatible?
- Is historical coverage available?
- Which mappings and tests depend on the old endpoint?

### Finding

The new field represents enterprise classification, while the target Customer Group is sales-area-specific.

### Result

Reject direct replacement.

Create a separate design decision to determine whether:

- organisational expansion is valid;
- another target attribute should be used;
- the source requires enrichment.

The change request prevents a technically convenient but semantically incorrect substitution.

## A minimum model change request template

A practical template can contain:

### Identification

- request ID;
- title;
- requester;
- change class;
- model baseline.

### Problem

- observed issue;
- affected business process;
- urgency.

### Current state

- affected model objects;
- current meaning;
- current scope;
- current implementation.

### Proposed state

- business outcome;
- model changes;
- context;
- effective release.

### Evidence

- datasets;
- incidents;
- policy;
- tests;
- assumptions.

### Alternatives

- realistic options;
- trade-offs;
- recommendation.

### Impact

- business;
- data;
- migration;
- SAP MDG;
- integrations;
- testing;
- ownership;
- AMS.

### Risk and conditions

- main risks;
- mitigations;
- accepted deviations;
- review triggers.

### Validation

- structural checks;
- dataset checks;
- impact-analysis result.

### Review matrix

- required roles;
- exact approval question;
- status.

### Verification

- implementation tasks;
- expected evidence;
- final effective baseline.

This may sound substantial.

For a small correction, many sections can remain brief.

The template should scale with change risk.

## Use change classes to control the review burden

### Class 1: editorial correction

Examples:

- description;
- alias;
- typo.

Review:

- model maintainer.

### Class 2: implementation correction

Approved meaning stays the same.

Examples:

- fix mapping endpoint;
- correct configuration context;
- restore missing interface field.

Review:

- technical owner plus business confirmation where needed.

### Class 3: bounded contextual change

Examples:

- add local value;
- add country-specific rule;
- change a source mapping.

Review:

- domain, local and technical owners.

### Class 4: material model change

Examples:

- change global definition;
- add or retire a critical attribute;
- alter enterprise identifier;
- change global mandatory policy.

Review:

- formal governance authority and all affected functions.

This prevents every minor change from becoming a committee event.

It also prevents a major semantic change from being approved like a routine defect.

## Common mistakes

### Starting with a technical solution

The programme may implement the wrong treatment efficiently.

### Omitting the current baseline

Reviewers cannot see the real difference.

### Using only business narrative

Technical dependencies remain implicit.

### Using only object-level diffs

Business meaning and risk remain unclear.

### Asking one reviewer to approve everything

Authority and expertise differ by review domain.

### Listing no alternatives

The request becomes a justification document for a predetermined solution.

### Ignoring current datasets

The target rule may be impossible to satisfy.

### Mixing permanent and temporary treatment

Temporary workarounds become policy.

### Treating approval as implementation

The configured and observed state must still be verified.

### Creating separate business and technical requests

They can diverge and receive contradictory approval.

### Letting AI create the final request without owner review

AI can assemble evidence and draft impacts, but it cannot assign organisational authority or accept business risk.

## How AI can help

AI can assist by:

- extracting the problem from tickets;
- summarising incident history;
- identifying candidate affected objects;
- comparing current and proposed model states;
- grouping dataset findings;
- drafting alternatives;
- creating an initial impact summary;
- generating role-specific review views;
- preparing implementation tasks.

AI should explicitly mark:

- uncertain relationships;
- missing evidence;
- inferred ownership;
- unresolved semantic conflicts.

It should not determine:

- whether the business meaning is correct;
- whether legal evidence is sufficient;
- whether an exception is acceptable;
- whether the change is approved.

The operating boundary remains:

```text
AI prepares.
Validators check.
Reviewers decide.
Git records.
```

## Where Martenweave fits

The current Martenweave Core README describes the project as an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS. It converts spreadsheets, datasets, tickets, validation reports, decisions and SAP context into canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-approved patch proposals.

Its current principles define:

- canonical files as the source of truth;
- generated indexes as rebuildable;
- deterministic validation before indexing;
- AI proposals as reviewable rather than self-applying;
- local-first operation.

The pipeline is described as:

```text
evidence
→ proposal
→ validation
→ gaps and impact
→ review
→ GitHub issue or pull request
```



A Martenweave model change request should therefore act as the human-readable decision layer around this pipeline.

It connects:

- evidence;
- canonical objects;
- proposed diff;
- deterministic checks;
- dataset findings;
- impact;
- reviewers;
- final approval.

## What management should ask

1. What problem is this change solving?
2. What is the current approved state?
3. What exactly will be different?
4. Where does the change apply?
5. Which evidence supports it?
6. Which alternatives were considered?
7. Can current datasets support it?
8. Which SAP components and integrations are affected?
9. Which tests become stale?
10. Which risks and temporary conditions remain?
11. Does each reviewer have one precise approval question?
12. Is the proposed state separate from canonical truth?
13. Will material edits trigger re-review?
14. How will implementation be verified?
15. Which model baseline becomes effective after completion?

If the request cannot answer these questions, it is probably not ready for approval.

## When a lightweight request is sufficient

A small change may need only:

- affected object;
- current value;
- proposed value;
- reason;
- owner;
- validation result;
- reviewer;
- verification.

This may be enough when:

- business meaning does not change;
- one system is affected;
- no local variation exists;
- impact is easily understood;
- rollback is simple.

A fuller model change request is appropriate when:

- meaning or scope changes;
- several sources or consumers exist;
- migration populations are affected;
- global and local rules interact;
- temporary deviations are introduced;
- change impact is uncertain;
- several authorities must review.

## Our conclusion

Business and technical teams do not need separate versions of the truth.

They need different views of the same proposed model change.

A good model change request connects:

- business problem;
- current model;
- proposed state;
- evidence;
- alternatives;
- data feasibility;
- technical impact;
- ownership;
- risk;
- approval;
- verification.

The practical test is:

> Can the business owner explain what policy and meaning will change, while the technical team can explain exactly which objects, systems and tests are affected—without either side contradicting the other?

When the answer is yes, the request is ready for shared review.

When the business approves a title and the technical team approves a field change, the programme has two partial approvals rather than one governed decision.

The purpose of the model change request is not to add documentation.

It is to create one decision boundary where business intent and implementation consequence become visible at the same time.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We build practical model-governance infrastructure for SAP migration, MDG, MDM and AMS teams.

Martenweave provides canonical model files, deterministic validation, dataset evidence, lineage, impact analysis and proposal-first change control. Model change requests provide the shared review layer through which business and technical authorities can make informed decisions.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a governance layer that combines master data, policy and metadata and supports governed models, collaborative change-request workflows, validated values, ownership, business-rule monitoring and auditable master-data changes.

GitHub documents pull requests as proposals that allow changes to be discussed, reviewed, checked and compared before they are merged. Its review model supports comments, approvals, requested changes, requested reviewers and required approvals.

The current Martenweave Core README identifies Martenweave as an open-source, backend-first model-governance and evidence layer. The current source version is listed as 0.5.0.

Martenweave uses canonical model files, deterministic validation, rebuildable generated indexes, dataset-gap analysis, trace and impact analysis, and reviewable `PatchProposal` and `ChangeRequest` workflows.

Martenweave is an independent project and is not affiliated with or endorsed by SAP or GitHub. SAP, SAP S/4HANA, SAP Master Data Governance and GitHub are trademarks or registered trademarks of their respective owners.
