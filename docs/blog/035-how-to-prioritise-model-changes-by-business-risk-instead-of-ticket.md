# How to Prioritise Model Changes by Business Risk Instead of Ticket Urgency

**Reviewed: 14 July 2026**

A senior stakeholder opens a ticket:

> Change the supplier description immediately. This is blocking the executive dashboard.

The ticket is marked urgent.

Several teams join the call. A developer prepares a correction. Testing is accelerated. The change reaches the next release.

In the same backlog, another issue has been open for six weeks:

> Several active customer mappings reference a target endpoint scheduled for retirement.

The ticket has no executive sponsor.

No production incident has occurred yet. The affected mappings still run. The issue remains medium priority.

Two months later, the target endpoint is removed.

Migration testing fails across three countries. Interfaces and test cases depend on the same field. The programme now needs emergency analysis, mapping changes, remediation and regression testing.

The urgent ticket was visible.

The risky ticket was quiet.

This is a recurring weakness in SAP, migration and data-governance programmes.

Work is prioritised according to:

- who raised the request;
- how frequently they escalate;
- whether a deadline is near;
- how many users are complaining;
- whether the issue already caused an incident;
- which workstream has available capacity.

These signals matter.

They do not reliably describe business risk.

> Ticket urgency measures how strongly work is being demanded. Model risk measures what may happen if the model is wrong, incomplete or changed badly.

A good prioritisation process considers both.

It should not allow urgency to replace risk assessment.

## The loudest ticket is not necessarily the most important change

A request may be urgent because:

- a senior manager is waiting;
- a user cannot complete one task;
- a presentation is approaching;
- a local team has escalated;
- a service-level deadline is close.

The underlying model impact may still be narrow and reversible.

Another issue may have no immediate user-visible consequence but affect:

- enterprise identifiers;
- mandatory migration fields;
- legal or tax data;
- value semantics;
- several countries;
- critical integrations;
- a large record population;
- future cutover readiness.

The second issue may deserve earlier architectural attention even when nobody is escalating it.

This does not mean user complaints should be ignored.

It means the programme needs a separate way to evaluate the consequence of model decisions.

## Risk prioritisation supports decisions, not mathematical certainty

NIST describes risk assessment as part of an overall risk-management process that provides senior leaders with information needed to determine appropriate courses of action.

The same principle is useful for model governance.

The objective is not to calculate a scientifically precise number for every mapping or field.

The objective is to give decision-makers enough structured evidence to distinguish:

- genuinely urgent high-risk changes;
- high-risk changes that are not yet visible operationally;
- urgent but contained corrections;
- low-value requests that can wait;
- uncertain proposals requiring investigation before implementation.

A risk score is useful only when it improves the decision.

It should not become another status number that teams learn to manipulate.

## Incident urgency and model-change priority are different dimensions

An incident-management system may assign urgency based on how quickly the issue needs attention.

A model-governance process should assess the proposed change or unresolved defect separately.

For example:

| Situation | Operational urgency | Model risk |
|---|---:|---:|
| One user cannot edit a non-critical description | High | Low |
| A mandatory tax rule applies to the wrong country | High | High |
| A retired target endpoint remains in 40 mappings | Low today | High |
| Typo in an attribute definition | Low | Low |
| Unapproved default used for 12% of active suppliers | Medium | High |
| Executive report label is incorrect | High visibility | Medium or low |

Both dimensions should remain visible.

A high-urgency incident may require immediate containment even if the underlying model change is low risk.

A high-risk structural issue may require priority investigation even before it creates a production incident.

## The first question: what happens if we do nothing?

Every material backlog item should include a consequence-of-delay statement.

Weak statement:

> Mapping needs review.

Stronger statement:

> If the endpoint is retired before the mapping is corrected, three migration waves will lose the approved target for Customer Group. Twelve test cases and two outbound consumers may also require revision.

The statement should answer:

- What business process could fail?
- Which population is affected?
- When could the failure become real?
- Is the effect reversible?
- Can it be detected before damage occurs?
- Is there a safe workaround?
- Who carries the risk?

This is more useful than assigning a red label without explanation.

## Risk begins with the importance of the model object

Not every model object deserves the same treatment.

A change to a secondary description is different from a change to:

- enterprise identifier;
- legal name;
- tax registration;
- bank details;
- payment terms;
- organisational assignment;
- lifecycle status;
- compliance classification;
- matching key;
- relationship structure.

A practical criticality classification may be:

### Critical

Failure can cause legal, financial, compliance, cutover or major operational consequences.

### High

Failure can disrupt important processes, integrations or large populations.

### Medium

Failure creates local process issues, manual work or limited data-quality degradation.

### Low

Failure is primarily descriptive, cosmetic or easily reversible.

Criticality should reflect business use, not technical complexity.

A technically simple field can carry high business risk.

## Assess the breadth of impact

A model change affecting one local report is different from one affecting:

- several countries;
- several source systems;
- multiple migration waves;
- SAP configuration;
- workflow;
- integrations;
- analytics;
- AMS.

Useful breadth questions include:

1. How many model objects are directly affected?
2. How many countries or organisational units use them?
3. How many records are in the applicable population?
4. How many systems supply or consume the information?
5. How many tests and operational controls depend on it?
6. Does the change alter global or only local behaviour?

Martenweave’s trace and impact capabilities are intended to make these relationships visible from the canonical model instead of relying only on the requester’s estimate. The current core supports canonical objects, deterministic validation, generated indexes, search, trace, impact analysis and dataset-gap detection.

## Assess the affected data population

A field-level change may sound small while affecting millions of records.

The request should identify:

- number of current records;
- active versus historical population;
- affected source systems;
- country or organisational distribution;
- incomplete or invalid records;
- values requiring conversion;
- remediation effort.

Example:

```text id="risk-priority-01"
Change:
Make Supplier Classification mandatory.

Applicable population:
84,000 active suppliers.

Current valid coverage:
73%.

Records requiring remediation:
22,680.

Sources without reliable field:
ERP_B and two local procurement systems.
```

The change may still be correct.

Its implementation priority and sequencing should account for the population risk.

SAP currently states that automated S/4HANA processes depend heavily on clean and correct master data and recommends curating that data early, before implementation.

A model change that current data cannot support needs a remediation plan, not merely a high ticket priority.

## Assess semantic depth

Some changes alter presentation.

Others alter meaning.

### Shallow change

- description;
- alias;
- display order;
- explanatory text.

### Structural change

- source or target endpoint;
- context;
- cardinality;
- relationship;
- lifecycle state.

### Semantic change

- definition;
- value meaning;
- ownership;
- authoritative source;
- global versus local interpretation.

### Policy change

- mandatory rule;
- approval authority;
- allowed exception;
- activation condition;
- regulatory treatment.

The deeper the change, the more likely it is to affect several delivery layers.

A change from `warning` to `error` may be only one technical property.

It is a material policy change because it alters which records may proceed.

## Assess reversibility

A reversible change can be corrected with limited consequence.

An irreversible or expensive-to-reverse change deserves stronger review.

Relatively reversible examples:

- wording correction;
- non-persistent UI display change;
- report label.

Harder-to-reverse examples:

- merging two previously distinct values;
- changing enterprise identifier strategy;
- deleting historical mappings;
- converting large record populations;
- removing an attribute consumed by other systems;
- changing relationship direction;
- introducing a default that appears as genuine business data.

Ask:

- Can the previous model state be restored?
- Can affected records be identified?
- Can converted values be reconstructed?
- Will downstream systems preserve the original distinction?
- Is rollback technically and operationally possible?

A change with poor reversibility may require priority analysis even when implementation is not immediate.

## Assess detectability

Some failures are obvious.

Others remain hidden until they have spread.

Highly detectable failure:

- validation produces a clear error immediately;
- interface rejects every invalid code;
- automated reconciliation reports the difference.

Poorly detectable failure:

- source field has similar name but different meaning;
- two values are merged incorrectly;
- default value looks legitimate;
- local rule is applied globally without visible error;
- downstream analytics interpret the value incorrectly.

Low detectability increases risk.

A wrong value that fails loudly may be safer than a plausible wrong value accepted by every system.

## Assess evidence confidence

A proposal supported by verified evidence is different from one based on assumption.

Evidence may include:

- current dataset profile;
- approved business policy;
- confirmed source specification;
- tested system behaviour;
- incident history;
- regulatory interpretation;
- responsible-owner decision.

Useful confidence levels include:

### High confidence

Current, reproducible evidence supports the conclusion.

### Medium confidence

Evidence is representative but incomplete.

### Low confidence

Conclusion relies substantially on expert interpretation or old artefacts.

### Unknown

No reliable evidence exists.

Low evidence confidence does not always mean low priority.

It may mean the first priority is investigation.

For example:

> We do not know whether two source classifications have the same business meaning.

The safe next action is not immediate mapping.

It is semantic clarification.

## Assess time exposure

Risk can increase as a milestone approaches.

Relevant dates include:

- target endpoint retirement;
- mock-load start;
- mapping freeze;
- UAT;
- legal effective date;
- interface release;
- cutover;
- source-system decommissioning.

An issue may not be urgent today but have a predictable future deadline.

Example:

```text id="risk-priority-02"
Current state:
Old endpoint still operational.

Retirement date:
30 September.

Affected mappings:
42.

Next mock load:
15 September.
```

This is a high-priority preventive change even if no failure has occurred.

The programme should not wait for the endpoint to disappear before treating the issue as urgent.

## Assess the cost of delay

The cost of delay may include:

- duplicated build work;
- repeated testing;
- blocked migration;
- expanding remediation population;
- parallel local workarounds;
- additional interface changes;
- contract or vendor dependency;
- missed regulatory deadline;
- growing AMS incident volume.

A model decision made late can be more expensive than the same decision made early.

For example, changing a target attribute during conceptual design may require a document update.

Changing it after:

- migration code;
- SAP configuration;
- interfaces;
- tests;
- training

have been built creates wider rework.

Priority should therefore consider not only current harm but how quickly the correction cost is increasing.

## Assess the risk of the proposed change itself

A high-risk current state does not mean every proposed fix should be fast-tracked.

The fix may introduce another risk.

Example:

Current problem:

> Supplier Classification is frequently blank.

Proposed change:

> Default every blank value to `STANDARD`.

The proposal reduces completeness errors.

It may create false business data and conceal suppliers that were never classified.

The change request should assess:

```text id="risk-priority-03"
Risk of doing nothing
versus
risk introduced by the proposed treatment
```

Possible outcomes include:

- implement the proposed change;
- choose another treatment;
- contain the issue temporarily;
- collect more evidence;
- accept the current risk for a defined period.

## Use risk dimensions rather than one subjective priority field

A single `High`, `Medium` or `Low` field is easy to use.

It often hides why the priority was assigned.

A practical model-change assessment can use several dimensions:

| Dimension | Question |
|---|---|
| Business criticality | What process, control or obligation depends on this? |
| Population | How many and which records are affected? |
| Breadth | How many systems, countries and model objects depend on it? |
| Semantic depth | Does meaning or only presentation change? |
| Reversibility | Can the change be safely undone? |
| Detectability | Would an incorrect result be noticed quickly? |
| Evidence confidence | How reliable is the supporting evidence? |
| Time exposure | Is a deadline or retirement event approaching? |
| Cost of delay | Will waiting increase rework or remediation? |
| Proposed-change risk | Could the proposed solution cause new harm? |

This does not require a complicated algorithm.

The dimensions force the programme to discuss the actual consequence.

## A lightweight risk score

For teams needing a comparative score, use a small scale.

For example, score each dimension from 1 to 4:

```text id="risk-priority-04"
1 = limited
2 = moderate
3 = significant
4 = critical
```

High-risk dimensions can be weighted more strongly:

- business criticality;
- breadth;
- irreversibility;
- time exposure.

However, the score should not override hard rules.

Example:

```text id="risk-priority-05"
Overall score:
22 of 40

Mandatory escalation:
Yes

Reason:
Change affects legal identifier and production cutover.
```

The mandatory escalation matters more than the total.

## Use hard risk triggers

Some changes should automatically receive formal review regardless of calculated score.

Possible triggers include:

- enterprise identifier changes;
- legal, tax or bank-data changes;
- global mandatory-rule changes;
- deletion or retirement of critical attributes;
- value merging that loses distinctions;
- changes affecting production cutover;
- new unapproved defaults;
- changes affecting several countries;
- uncertain source authority;
- changes with no practical rollback;
- emergency changes bypassing normal review.

Hard triggers prevent a serious change from being diluted by lower scores in unrelated dimensions.

## Priority should determine the next action—not only queue position

A risk assessment can produce different actions.

## Immediate containment

Use when harm is already occurring.

Examples:

- stop invalid interface output;
- disable dangerous default;
- restrict an incorrect value;
- restore previous configuration.

Containment is not necessarily the final model decision.

## Priority investigation

Use when uncertainty is itself the risk.

Examples:

- unclear source authority;
- suspected semantic mismatch;
- unknown downstream consumers.

## Accelerated model review

Use when evidence and impact are sufficiently clear and delay is costly.

## Planned change

Use when risk is material but controlled within a normal release.

## Monitor

Use when impact is limited and current controls are adequate.

## Reject or defer

Use when the requested change has low value or creates more risk than it removes.

This makes prioritisation operational.

A “high” label with no defined action is weak governance.

## Use separate queues for different kinds of work

One backlog often mixes:

- production incidents;
- model defects;
- enhancement requests;
- data remediation;
- technical debt;
- governance questions.

These items compete poorly.

A practical structure can include:

### Expedite

Current severe operational or compliance exposure.

### Fixed-date

Legal, release, retirement or cutover deadline.

### Risk reduction

Structural issue likely to create future failure or large rework.

### Standard model change

Normal approved enhancement or correction.

### Investigation

Evidence or semantic uncertainty must be resolved first.

This allows a quiet structural defect to receive dedicated attention without pretending it is already a production emergency.

## Reassess priority when evidence changes

Priority should not be permanent.

Reassessment triggers include:

- new dataset profile;
- increased affected population;
- approaching milestone;
- another country reporting the same issue;
- target configuration change;
- interface dependency discovered;
- workaround failure;
- incident recurrence;
- evidence showing lower impact than expected.

A medium-risk issue may become high risk as cutover approaches.

A high-priority request may become low after evidence shows that only inactive historical records are affected.

## Avoid requester-controlled priority

The requester should describe urgency and business need.

They should not be the sole authority assigning final priority.

Otherwise:

- influential teams dominate;
- risk is inflated to obtain attention;
- enterprise dependencies remain invisible;
- local optimisation wins over programme value.

Priority should be reviewed by roles capable of assessing:

- business consequence;
- model coherence;
- data population;
- technical impact;
- timing.

This may be a small triage group rather than a large governance board.

## Define who may override the risk order

Sometimes management must prioritise a lower-risk request for strategic reasons.

Examples:

- contractual commitment;
- executive demonstration;
- customer deadline;
- regulatory communication;
- dependency on another release.

This is legitimate.

The override should be explicit:

```text id="risk-priority-06"
Risk-based rank:
7

Management priority:
2

Reason:
Required for contractual milestone.

Approver:
Programme Sponsor

Consequence:
Two higher-risk preventive changes deferred by one sprint.
```

This preserves transparency.

Risk-based prioritisation guides the decision.

It does not eliminate accountable management judgement.

## A worked example: executive label correction

### Request

Change a supplier category label before an executive presentation.

### Urgency

High.

### Risk assessment

- business criticality: low;
- population: all report users, but no record values change;
- semantic depth: presentation only;
- reversibility: high;
- detectability: immediate;
- deadline: tomorrow.

### Decision

Expedite the label correction.

No formal model-governance board is required if the underlying value meaning remains unchanged.

This is urgent work with low model risk.

## A worked example: retired endpoint

### Issue

Forty-two active mappings still reference a target endpoint scheduled for retirement.

### Urgency

Low current user visibility.

### Risk assessment

- business criticality: high;
- breadth: three countries and two integrations;
- reversibility after retirement: difficult;
- detectability: likely only during load or interface failure;
- time exposure: retirement in six weeks;
- cost of delay: rapidly increasing;
- evidence confidence: high.

### Decision

Prioritise investigation and migration to supported endpoints before less risky enhancements.

This is high model risk without a current incident.

## A worked example: mandatory tax rule

### Request

Make Tax Registration Identifier mandatory globally.

### Business reason

Reduce missing tax data.

### Risk assessment

- criticality: high;
- population: broad;
- semantic depth: policy;
- local variation: substantial;
- current source completeness: uneven;
- legal interpretation: country-specific;
- rollback: possible but disruptive;
- proposed-change risk: may block legitimate records.

### Decision

Do not prioritise global implementation as one urgent ticket.

Split into:

1. Confirm global attribute meaning.
2. Assess country rules.
3. Profile applicable source populations.
4. Define exemptions.
5. Introduce contextual changes through controlled releases.

The request concerns important data.

The proposed global solution is not yet safe.

## A worked example: unapproved migration default

### Finding

Twelve percent of active suppliers without classification are defaulted to `STANDARD`.

### Current incident status

No active tickets.

### Risk assessment

- criticality: high because classification drives compliance review;
- detectability: low because the value appears legitimate;
- population: material;
- reversibility: possible only if affected records remain identifiable;
- evidence confidence: confirmed;
- cost of delay: remediation population continues to grow.

### Decision

Treat as a high-priority model and data risk.

Immediate actions:

- identify all defaulted records;
- prevent new unrestricted defaulting;
- review business treatment;
- create remediation plan;
- assess downstream decisions made from the false classification.

This issue should outrank many visible usability tickets.

## Link priority to the affected model objects

A risk assessment should not exist only on the ticket.

Connect it to:

- attribute;
- mapping;
- rule;
- value list;
- dataset;
- decision;
- source or target endpoint.

This allows the programme to identify patterns.

For example:

```text id="risk-priority-07"
ATTR-SUPPLIER-RISK

Open high-risk items:
- unapproved default;
- incomplete ERP_B mapping;
- unsupported outbound value;
- expired local deviation.
```

The model object has concentrated risk even if each ticket is owned by a different team.

## Aggregate risk by domain and dependency

Management views should show more than ticket counts.

Useful aggregations include:

- critical attributes with open model risk;
- high-risk mappings by source;
- expired deviations;
- high-risk changes approaching cutover;
- unowned risk items;
- repeated incidents by model object;
- local issues affecting global objects;
- high-impact changes with low evidence confidence.

Ten low-risk tickets should not automatically appear worse than one unresolved enterprise-identifier problem.

## Risk acceptance should be explicit

Not every high-risk item can be resolved immediately.

The programme may proceed because:

- deadline cannot move;
- remediation requires another release;
- affected population is contained;
- manual control is available;
- cost of immediate correction is disproportionate.

Record:

- risk;
- affected objects;
- consequence;
- temporary control;
- accountable approver;
- expiry;
- review trigger.

Example:

```text id="risk-priority-08"
Accepted risk:
ERP_B cannot populate Supplier Review Status for Mock Load 2.

Temporary control:
Affected records excluded from activation.

Owner:
Migration Director.

Expiry:
Before UAT Cycle 1.
```

Risk acceptance is not the same as lowering the ticket priority until it disappears.

## Use evidence-based priority in readiness reporting

A migration-readiness report should identify:

- blockers;
- high-risk unresolved model issues;
- accepted conditions;
- risk owners;
- dates when exposure becomes critical.

A workstream can report 95% completion and still be not ready because the remaining 5% includes:

- target keys;
- legal identifiers;
- critical relationships;
- source authority.

Risk-based prioritisation ensures that completion percentages do not hide the significance of what remains.

## Use risk-based review depth

Priority should influence review depth.

### Low-risk editorial change

- one maintainer;
- basic validation;
- normal release.

### Medium contextual correction

- domain owner;
- technical owner;
- impact check;
- targeted tests.

### High-risk semantic or policy change

- full model change request;
- dataset evidence;
- impact analysis;
- cross-functional approval;
- rollback or remediation plan;
- release verification.

### Critical emergency

- immediate containment;
- authorised emergency approval;
- preserved evidence;
- mandatory follow-up reconciliation.

This makes governance proportional rather than uniformly heavy.

## How Martenweave supports risk-based prioritisation

The current Martenweave Core README describes an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS. It converts spreadsheets, datasets, tickets, validation reports, decisions and SAP context into canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-approved patch proposals.

Its core workflow is:

```text id="risk-priority-09"
evidence
→ proposal
→ validation
→ gaps and impact
→ review
→ GitHub issue or pull request
```



This enables a risk assessment to use model evidence rather than ticket description alone.

For a proposed change, Martenweave can help identify:

- affected canonical objects;
- broken or dependent references;
- related mappings and rules;
- dataset gaps;
- ownership;
- local variants;
- likely impact paths;
- existing decisions.

The tool should not assign final business priority autonomously.

It prepares evidence for accountable triage.

## A Martenweave risk object

A model-risk record could include:

```text id="risk-priority-10"
Risk ID:
RISK-SUPPLIER-0042

Affected objects:
ATTR-SUPPLIER-RISK
MAP-ERP-B-SUPPLIER-RISK
RULE-SUPPLIER-RISK-REQUIRED

Risk statement:
Unapproved default creates apparently valid classifications.

Affected population:
10,240 active suppliers.

Current controls:
Records remain traceable through migration batch ID.

Business impact:
Compliance routing may be bypassed.

Evidence confidence:
High.

Time exposure:
Growing with each migration run.

Owner:
Global Supplier Data Owner.

Decision:
Immediate containment and priority remediation.
```

This provides a more durable risk view than a ticket priority field.

## Deterministic checks can identify risk signals

Validators can identify conditions such as:

- active mapping references retired endpoint;
- critical attribute has no owner;
- temporary deviation is expired;
- mandatory target has no source treatment;
- value mapping does not cover observed source values;
- approved object depends on draft object;
- test evidence refers to an old baseline.

These findings do not automatically determine business priority.

They provide consistent signals.

A missing owner on a low-risk description is different from a missing owner on a bank-data rule.

The model context supplies the distinction.

## AI can assist risk triage

AI can help:

- summarise incident and ticket history;
- group related issues by model object;
- draft consequence statements;
- identify likely affected dependencies;
- compare similar historical changes;
- prepare risk scorecards;
- flag missing evidence;
- suggest review roles.

AI should not decide final priority based only on ticket language.

A forceful request may sound high risk.

A quiet validator finding may be more important.

AI also cannot independently determine:

- legal consequence;
- acceptable operational risk;
- political or contractual priority;
- business criticality;
- authority to accept delay.

The safe pattern remains:

```text id="risk-priority-11"
Tools gather evidence.
AI organises the evidence.
Responsible owners prioritise and accept risk.
```

## A minimum triage process

A practical weekly model-risk triage can be compact.

For each new or materially changed item:

1. Identify affected model objects.
2. State the consequence of doing nothing.
3. Define the affected population and context.
4. Check known dependencies.
5. Assess evidence confidence.
6. Identify time exposure.
7. Assess reversibility and detectability.
8. Classify the next action.
9. Name the risk owner.
10. Record any management override.

The process should take minutes for simple items.

Complex, high-risk items should move into formal analysis.

## What management should ask

1. Is priority based on consequence or requester pressure?
2. Which high-risk issues have no active incidents yet?
3. Which model objects concentrate the most unresolved risk?
4. Which changes affect critical or regulated data?
5. Which populations are affected?
6. Which risks become more expensive as cutover approaches?
7. Which proposed fixes create their own semantic risk?
8. Which items have low evidence confidence?
9. Which changes are difficult to reverse?
10. Which accepted risks have expired?
11. Which priorities were overridden for strategic reasons?
12. What higher-risk work was deferred as a result?
13. Does every high-risk item have an accountable owner?
14. Can the assessment be traced to current model and dataset evidence?

If the backlog can be reordered by the loudest meeting participant, the programme does not have risk-based prioritisation.

## Common mistakes

### Equating severity with stakeholder seniority

Authority to request work is not evidence of model consequence.

### Waiting for production failure

Structural risks are cheaper to address before they become incidents.

### Using one overall score without explanation

The dimensions and hard triggers matter more than false precision.

### Ignoring the affected population

A small configuration change may affect millions of records.

### Measuring only probability

Low-probability irreversible changes may still need strong control.

### Ignoring detectability

Plausible wrong data can be more dangerous than visible rejection.

### Prioritising the proposed solution instead of the underlying problem

The urgent fix may create more risk than the current state.

### Treating risk acceptance as backlog closure

Accepted risk needs owner, controls and expiry.

### Giving every change the same review process

Governance should be proportional to risk.

### Allowing AI to rank the backlog autonomously

Risk involves organisational authority and business judgement.

## When a simpler approach is enough

A small programme may use a spreadsheet containing:

- ticket;
- affected object;
- business consequence;
- population;
- deadline;
- owner;
- priority decision.

This can be sufficient when:

- the model is small;
- dependencies are understood;
- one team owns the work;
- changes are infrequent.

A connected model registry becomes more useful when:

- several countries and sources are involved;
- ticket descriptions hide cross-system impact;
- change volume is high;
- datasets affect priority;
- model objects have many dependencies;
- different partners maintain separate backlogs;
- AI-assisted triage is introduced.

## Our conclusion

Ticket urgency is useful.

It tells the programme how quickly someone believes an issue needs attention.

It does not reliably tell the programme what will happen if the model remains wrong or the proposed change is implemented badly.

Risk-based prioritisation asks broader questions:

- Which business process depends on this?
- How many records and systems are affected?
- Does meaning change?
- Can the change be reversed?
- Would an error be detected?
- How strong is the evidence?
- Is a deadline approaching?
- Will delay increase rework?
- Could the proposed fix cause another problem?

The practical test is:

> Would the programme still assign the same priority if the requester’s name and ticket severity were hidden and reviewers saw only the model objects, evidence, impact and time exposure?

When the answer is yes, prioritisation is probably grounded in risk.

When the answer changes dramatically, the backlog may be governed by organisational volume rather than business consequence.

The objective is not to remove urgency or management judgement.

It is to ensure that quiet structural risks receive attention before they become loud operational failures.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We build practical model-governance infrastructure for SAP migration, MDG, MDM and AMS teams.

Martenweave connects model objects, datasets, mappings, rules, decisions and impact evidence so that change priority can be assessed from business consequence rather than ticket wording alone.

## Sources and notes

This article was reviewed on 14 July 2026.

NIST describes risk assessment as part of an overall risk-management process that provides leaders with information needed to determine appropriate courses of action in response to identified risks. Although NIST SP 800-30 focuses on information-system risk, the general principle of structured evidence supporting accountable decisions is also useful for model-change governance.

SAP currently describes SAP Master Data Governance as a central governance layer combining master data, policy and metadata, with governed models, attribute ownership, validated values, collaborative workflows, monitored business rules, mass changes and auditable data changes. SAP also recommends curating clean and correct master data early before an SAP S/4HANA implementation.

The current Martenweave Core README describes an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS. The current source version is listed as 0.5.0.

Martenweave uses canonical model files, deterministic validation, rebuildable generated indexes, dataset-gap analysis, trace and impact analysis, and reviewable `PatchProposal` and `ChangeRequest` workflows.

Martenweave is an independent project and is not affiliated with or endorsed by SAP or NIST. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
