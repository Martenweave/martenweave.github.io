# How to Turn Model Risks into an Actionable SAP Migration Backlog

**Reviewed: 14 July 2026**

The migration programme has identified a serious risk:

> ERP_B cannot provide Supplier Classification for a large part of the active supplier population.

The risk register contains:

- probability: high;
- impact: high;
- owner: migration lead;
- mitigation: cleanse and enrich the data;
- status: amber.

The item is reviewed every week.

For the next two months, almost nothing changes.

The migration team expects the business to define the classification. The business expects the source-system team to provide the missing field. The SAP team continues preparing a mandatory validation. A local consultant proposes a temporary default. Testing assumes that the issue will be resolved before the next mock load.

Everybody is aware of the risk.

Nobody has converted it into an executable set of decisions and tasks.

When the next load begins, the programme discovers that “cleanse and enrich the data” was not a plan. It was a description of the desired outcome.

This is the gap between risk management and delivery.

> A model risk becomes actionable only when the programme separates the decision, model change, data remediation, technical implementation and verification work required to reduce it.

A risk register tells management what could go wrong.

A migration backlog should tell delivery teams what must happen next.

## A risk is not a backlog item

Risks and backlog items serve different purposes.

A risk describes exposure.

A backlog item describes work.

For example:

```text
Risk:
ERP_B cannot populate Supplier Classification.
```

This is not yet an executable task.

The programme may need to decide among several treatments:

- identify another source;
- enrich the data manually;
- derive a value;
- narrow the target requirement;
- introduce a temporary status;
- exclude affected records;
- accept the risk for one migration cycle.

Each treatment creates different work.

Creating a task called:

> Fix Supplier Classification

does not resolve this ambiguity.

The backlog should be generated after—or explicitly around—the decision process.

## Why broad mitigation statements fail

Programme risk registers commonly use mitigation text such as:

- cleanse data;
- confirm mapping;
- align with business;
- complete impact analysis;
- monitor the issue;
- update configuration;
- resolve before cutover.

These are reasonable intentions.

They are not delivery definitions.

A useful backlog item needs:

- a concrete outcome;
- bounded scope;
- accountable owner;
- required inputs;
- completion evidence;
- dependency sequence;
- validation method.

Compare:

### Broad mitigation

> Improve Customer Group mapping.

### Actionable backlog item

> Confirm whether `CRM_A.CUSTOMER_SEGMENT` represents the sales-area Customer Group or a central customer classification. Record the approved business attribute and target context. Acceptance requires approval from the Order-to-Cash Data Owner and SAP architect.

The second item can be assigned, reviewed and completed.

## Start with the risk treatment decision

Before decomposing work, identify the selected—or still required—risk treatment.

Useful treatment categories include:

### Avoid

Remove the risky scope or design.

Example:

> Do not migrate inactive suppliers requiring unavailable classifications.

### Reduce

Lower the likelihood or consequence.

Example:

> Enrich missing classifications before load and add a completeness gate.

### Contain

Prevent the exposure from spreading while the final treatment is prepared.

Example:

> Block use of the uncontrolled default in new mappings.

### Accept temporarily

Proceed with an explicit residual risk and expiry.

Example:

> Allow incomplete records in Mock Load 2, but prevent activation and require remediation before UAT.

### Transfer responsibility

Move execution or contractual responsibility to a qualified party.

This may transfer delivery responsibility.

It rarely transfers full business accountability.

### Investigate

Gather evidence before selecting a treatment.

Example:

> Determine whether the proposed replacement source has equivalent business meaning.

The backlog should reflect which treatment is being pursued.

Otherwise, different teams may implement incompatible responses to the same risk.

## Some risks require a decision backlog before an implementation backlog

Consider this risk:

> Three source systems use different definitions of Customer Status.

The immediate work should not be:

- update mappings;
- change SAP;
- create a conversion table.

The programme first needs decision work:

1. Define the target business meaning.
2. Determine whether the source concepts are equivalent.
3. Decide whether more than one target attribute is required.
4. Assign ownership.
5. approve contextual treatment.

Only then can implementation tasks be created.

This gives two backlog layers:

```text
Decision backlog
→ Delivery backlog
```

The decision backlog resolves what should be true.

The delivery backlog implements and verifies it.

Mixing them often leads technical teams to make semantic decisions implicitly.

## Connect the backlog to stable model objects

A task such as:

> Review payment terms

is difficult to trace and easy to duplicate.

A stronger item identifies the affected objects:

```text
Attribute:
ATTR-SUPPLIER-PAYMENT-TERMS

Source endpoint:
FEP-ERP-B-LFB1-ZTERM

Target endpoint:
FEP-S4-LFB1-ZTERM

Mapping:
MAP-ERP-B-SUPPLIER-PAYMENT-TERMS

Dataset:
DATASET-ERP-B-SUPPLIERS-WAVE-2

Risk:
MRISK-0071
```

Stable identities make it possible to answer:

- Which risks affect this attribute?
- Which tasks address the same mapping?
- Has the source problem already been investigated?
- Which test proves the treatment?
- Which change request altered the model?

This is one reason a model backlog should not live only as unstructured ticket titles.

## Use one risk to create several coordinated work items

A material model risk usually crosses workstreams.

For example:

> Current source data cannot satisfy a mandatory Supplier Risk rule.

A useful decomposition might include:

### Business decision

Define the applicable supplier population and acceptable temporary treatment.

### Source analysis

Confirm whether another reliable field or source exists.

### Dataset analysis

Measure missing and ambiguous values by country and supplier type.

### Model change

Represent the approved rule, context and temporary state.

### Mapping change

Implement source-to-target treatment.

### Data remediation

Correct or enrich the affected records.

### SAP MDG implementation

Configure the approved validation and workflow.

### Integration update

Confirm that consumers support the values.

### Testing

Prove positive, negative, exception and migration scenarios.

### Readiness verification

Confirm that the residual population meets the approved threshold.

This is not unnecessary fragmentation.

These are different responsibilities and completion conditions.

The programme needs a parent relationship so the items remain connected to one risk and one approved treatment.

## Define a practical backlog hierarchy

A workable hierarchy can use four levels.

## Level 1: model risk

Describes the exposure.

Example:

```text
MRISK-0048
Unapproved Supplier Risk default may create false classifications.
```

## Level 2: decision or treatment

Defines how the programme intends to manage the risk.

Example:

```text
DEC-0094
Stop unrestricted defaulting and introduce a controlled Review Status.
```

## Level 3: change package

Groups the model and implementation changes required by the decision.

Example:

```text
CHG-SUPPLIER-RISK-REVIEW-STATUS
```

## Level 4: delivery tasks

Examples:

- add the Review Status attribute;
- update ERP_B mapping;
- update MDG validation;
- revise outbound interface;
- remediate existing records;
- create regression tests.

This hierarchy prevents the original risk from disappearing when the first technical ticket closes.

## Separate model work from data work

SAP migration teams frequently combine these two activities.

### Model work

Determines:

- business meaning;
- source and target relationships;
- rules;
- values;
- context;
- ownership;
- approved exceptions.

### Data work

Changes:

- record values;
- source extracts;
- enrichment files;
- duplicate treatment;
- remediation populations;
- load readiness.

A source population can be remediated without fixing the model.

A model can be corrected without remediating existing records.

Both may be necessary.

For example:

```text
Model task:
Approve a separate Supplier Review Status instead of using Supplier Risk.

Data task:
Convert 7,200 records from MIGRATION_REVIEW to the new controlled status.
```

Completing only the model task leaves incorrect data.

Completing only the data task may reproduce the same problem later.

## Separate model change from SAP configuration

The approved model should state:

> Supplier Review Status is required for regulated suppliers under active compliance assessment.

The SAP implementation task may include:

- add the attribute;
- expose it in the relevant change request;
- restrict maintenance by role;
- route workflow;
- block final approval while unresolved;
- replicate the field.

The model decision is platform-independent.

The configuration task is platform-specific.

This separation matters when:

- configuration is delayed;
- another system also implements the rule;
- a technical limitation requires a temporary deviation;
- future teams need to understand intended behaviour.

SAP positions SAP Master Data Governance as a governance layer supporting governed models, validated values, collaborative workflows, business rules, data-quality monitoring and auditable changes.

Those capabilities can implement operational controls, but the programme still needs a controlled backlog linking the approved model decision to source data, migration, integrations and testing.

## Decompose work by required evidence

One way to make backlog items actionable is to ask:

> What evidence must exist when this item is complete?

Examples:

### Source-analysis item

Completion evidence:

- source-field definition;
- owner confirmation;
- current dataset profile;
- population coverage;
- semantic comparison.

### Mapping item

Completion evidence:

- approved source and target endpoints;
- transformation;
- value coverage;
- owner;
- successful sample conversion.

### Rule item

Completion evidence:

- approved applicability;
- positive test;
- negative test;
- exception test;
- configuration reference.

### Remediation item

Completion evidence:

- affected population identified;
- corrected records;
- unresolved residual count;
- owner sign-off;
- reconciliation output.

### Risk closure item

Completion evidence:

- treatment implemented;
- validation passed;
- residual risk reassessed;
- expired workaround removed;
- current baseline updated.

This prevents backlog items from closing based only on activity.

## Write acceptance criteria around observable outcomes

Weak acceptance criterion:

> Mapping reviewed.

Stronger acceptance criteria:

- Business meaning of `CRM_A.CUSTOMER_SEGMENT` is approved.
- Target context is confirmed as sales area.
- Mapping references an active target endpoint.
- All source values observed in the July dataset have an approved treatment or documented gap.
- The mapping passes deterministic model validation.
- Test case `TC-CUST-118` verifies the approved transformation.

The stronger criteria allow another person to determine whether the item is genuinely complete.

## Include a validation command or method

Martenweave is built around canonical model files, deterministic validation, rebuildable indexes, dataset-gap analysis, trace, impact analysis and reviewable change proposals. The current core describes a pipeline from evidence through validation, gaps and impact to human-reviewed GitHub issues or pull requests.

For agent-ready or technical backlog items, include a validation method.

Examples based on the current CLI include:

```bash
martenweave validate --repo ./model
```

```bash
martenweave impact ATTR-SUPPLIER-RISK --repo ./model
```

```bash
martenweave trace ATTR-SUPPLIER-RISK --repo ./model
```

```bash
martenweave run dataset-readiness \
  --repo ./model \
  --dataset suppliers.xlsx \
  --out ./reports/readiness
```

The current repository documents validation, trace, impact and dataset-readiness commands.

A business decision item may use another validation method:

> Approval recorded from the Global Supplier Data Owner and Portuguese Compliance Owner.

Not every item requires a CLI command.

Every item requires a verifiable completion method.

## Add entry criteria as well as acceptance criteria

Tasks often enter development before required decisions exist.

A backlog item should state what must be true before work begins.

Example:

### Item

Configure Supplier Review Status in MDG.

### Entry criteria

- business definition approved;
- values approved;
- applicability defined;
- owner assigned;
- interface impact reviewed;
- model proposal merged.

### Acceptance criteria

- field available in relevant process;
- authorisation restriction implemented;
- workflow routing verified;
- activation blocked under defined conditions;
- regression tests passed;
- implementation linked to current model baseline.

Entry criteria prevent technical teams from implementing unstable requirements.

## Represent blockers explicitly

A blocked task should identify the blocking decision or evidence.

Weak status:

> Blocked by business.

Stronger status:

```text
Blocked by:
DEC-0094 — decide whether UNDER_REVIEW is a risk value or process status.

Required owner:
Global Supplier Risk Owner.

Decision due:
31 August 2026.

Consequence:
MDG field design and interface contract cannot be finalised.
```

This allows programme management to intervene productively.

“Blocked by business” usually hides the exact question.

## Use dependency order

A typical model-risk treatment may follow:

```text
Clarify meaning
→ approve target model
→ confirm source
→ profile dataset
→ approve mapping
→ implement model change
→ remediate records
→ configure SAP
→ update integrations
→ test
→ reassess risk
```

Some work can run in parallel.

The critical semantic dependencies should not be ignored.

For example, dataset profiling can begin before final approval.

Production mapping should not be finalised before the business meaning is resolved.

## Distinguish investigation tasks from remediation tasks

An investigation produces evidence.

A remediation changes the state.

Example:

### Investigation

Determine whether `ERP_B.VENDOR_CLASS` is semantically equivalent to Supplier Risk.

### Possible result

It is not equivalent.

### Remediation

Identify or create another source treatment.

Closing the investigation does not mean the risk is mitigated.

The backlog should preserve the transition from finding to action.

## Create a specific item for residual-risk acceptance

Sometimes the programme cannot eliminate the risk before a milestone.

Do not hide this inside a technical task.

Create a decision item:

```text
Goal:
Approve proceeding with 1,240 unresolved supplier classifications in Mock Load 2.

Scope:
ERP_B active suppliers.

Current control:
Records remain blocked from activation.

Residual risk:
Migration reconciliation and remediation effort remain.

Expiry:
Before UAT Cycle 1.

Required approvers:
Migration Director and Global Supplier Data Owner.
```

This creates an accountable decision.

It also prevents an accepted risk from being mistaken for a resolved risk.

## Create explicit expiry and cleanup work

Temporary controls create future work.

If a change introduces:

- temporary value;
- warning instead of error;
- manual review;
- migration-only default;
- local interface workaround,

the backlog should immediately include cleanup items.

Example:

```text
Introduce temporary value
        +
Block value for operational creation
        +
Monitor affected population
        +
Remediate records
        +
Retire value
```

Do not wait until after cutover to create the retirement task.

By then, ownership and context may have disappeared.

## Use readiness gates as backlog milestones

A migration backlog should support evidence-based gates.

Examples:

### Model-ready

- critical attributes defined;
- contexts approved;
- ownership assigned;
- structural validation passes.

### Mapping-ready

- source and target endpoints identified;
- transformations approved;
- observed values covered or accepted as gaps.

### Data-ready

- required columns available;
- completeness meets programme policy;
- unresolved populations have owners and treatment.

### Build-ready

- model decisions approved;
- implementation entry criteria satisfied.

### Test-ready

- target configuration available;
- datasets and expected results aligned to the same baseline.

### Cutover-ready

- critical gaps resolved;
- accepted risks current;
- temporary treatments controlled;
- reconciliation method approved.

SAP’s current product guidance notes that clean and correct master data should be curated early because more automated S/4HANA processes rely on it.

A readiness gate should therefore test current model and dataset evidence rather than rely only on task completion percentages.

## Do not turn every risk into dozens of tickets

Over-decomposition creates another failure mode.

The programme may generate:

- hundreds of tiny items;
- extensive cross-linking;
- excessive status maintenance;
- unclear overall responsibility.

A practical rule is:

> Create a separate item when the work has a different owner, completion condition, approval boundary or dependency.

Keep closely related edits together when one team can complete and verify them as a coherent unit.

For example, updating a value list and its description may be one item.

Updating:

- business definition;
- migration mapping;
- interface;
- remediation population

should not be one item.

## Use vertical slices where possible

A vertical slice resolves one bounded risk across the necessary layers.

Example:

> Establish controlled treatment for Supplier Risk in ERP_B Wave 2.

The slice may include:

- approved business treatment;
- canonical model update;
- dataset comparison;
- mapping;
- SAP rule;
- one interface;
- representative tests;
- readiness report.

This is more useful than completing all definitions first, then all mappings, then all rules across the entire domain.

Vertical slices expose whether the full control loop works.

## Prioritise by risk reduction, not by task count

A backlog may contain 80 tasks.

Completing 40 low-risk documentation updates does not necessarily improve readiness more than resolving one source-authority problem.

For each risk-related item, estimate:

- which risk it reduces;
- how much exposure remains;
- whether it unlocks other work;
- whether delay increases cost;
- whether the item is on a critical dependency path.

A useful prioritisation field is:

```text
Expected risk reduction:
High / Medium / Low
```

supported by a brief explanation.

Example:

> High: resolves the only missing source treatment for a mandatory Wave 2 attribute and unblocks mapping, remediation and testing.

## Prioritise decision bottlenecks early

Some small decision items unlock large amounts of delivery work.

Examples:

- confirm business meaning;
- choose global versus local scope;
- assign owner;
- approve target attribute;
- approve temporary exception.

These items may require little implementation effort but deserve high priority.

A backlog that prioritises only estimated development effort will miss them.

## Identify risk-reduction chains

A sequence may look like:

```text
Confirm business definition
        ↓
Identify authoritative source
        ↓
Approve mapping
        ↓
Profile full population
        ↓
Remediate gaps
        ↓
Enable blocking validation
```

The final validation rule may be the visible deliverable.

The earlier decisions reduce most of the uncertainty.

Management should monitor the complete chain.

## Use a standard issue structure

An actionable issue for a model-risk backlog should include:

## Goal

The specific outcome.

## Risk addressed

Risk ID and concise risk statement.

## Scope

Affected domain, objects, systems, country, wave and population.

## Current state

What is known today.

## Required work

The bounded task.

## Out of scope

What this item does not resolve.

## Dependencies

Required decisions, datasets or predecessor items.

## Acceptance criteria

Observable completion conditions.

## Validation command or method

How completion will be verified.

## Evidence

Relevant profile, decision, report or model baseline.

## Owner

Accountable delivery role.

This structure also makes issues more usable by development agents.

## Example: source-analysis issue

### Goal

Determine whether ERP_B has a reliable source for Supplier Risk.

### Risk addressed

`MRISK-0048`: current unrestricted default may create false classifications.

### Scope

- ERP_B;
- active suppliers;
- Wave 2;
- `ATTR-SUPPLIER-RISK`.

### Required work

- inspect candidate source fields;
- document definitions and ownership;
- profile current values;
- compare semantics with target attribute;
- recommend source, enrichment or exception treatment.

### Acceptance criteria

- candidate fields assessed;
- current dataset profile attached;
- semantic comparison completed;
- source owner confirms findings;
- recommendation recorded;
- unresolved assumptions identified.

### Validation method

Review by Global Supplier Data Owner and migration architect.

## Example: mapping-remediation issue

### Goal

Replace the unrestricted Supplier Risk default with approved mapping treatment.

### Dependencies

- source analysis completed;
- target treatment approved;
- affected population identified.

### Acceptance criteria

- mapping references approved source and target endpoints;
- all observed source values have approved treatment or explicit gap;
- no unrestricted default remains;
- affected records remain identifiable;
- model validation passes;
- sample transformation test passes.

### Validation command

```bash
martenweave validate --repo ./model
```

plus the programme’s mapping test.

## Example: temporary-deviation issue

### Goal

Allow incomplete classifications in Mock Load 2 without allowing activation.

### Scope

- ERP_B;
- Mock Load 2 only;
- 1,240 records.

### Acceptance criteria

- records clearly identified;
- activation blocked;
- owner assigned;
- deviation decision approved;
- expiry set before UAT;
- remediation issue linked;
- readiness report shows the condition explicitly.

### Closure condition

The deviation remains open until the affected population is remediated or a new acceptance decision is approved.

## Example: implementation-verification issue

### Goal

Verify that SAP MDG behaviour matches the approved Supplier Review Status model.

### Acceptance criteria

- attribute available in the approved context;
- only authorised role can maintain it;
- workflow route verified;
- final activation blocked while status is unresolved;
- outbound payload confirmed;
- positive and negative tests passed;
- implementation reference linked to the model baseline.

This issue should not change the approved semantic decision.

It proves implementation alignment.

## Use parent risk dashboards, not only task dashboards

A task dashboard shows:

- open;
- in progress;
- done.

A risk-treatment dashboard should show:

- risk;
- selected treatment;
- required decisions;
- open delivery work;
- current residual risk;
- milestone exposure;
- resolution evidence.

Example:

| Risk | Treatment | Tasks complete | Residual risk | Next decision |
|---|---|---:|---|---|
| Supplier Risk default | Replace with controlled status | 4/7 | Medium | Approve ERP_B remediation |
| Customer Group endpoint retirement | Move to supported contextual endpoint | 2/5 | High | Confirm semantic target |
| Temporary tax value | Remediate and retire | 5/6 | Low | Confirm zero remaining records |

This prevents a risk from being marked complete because most tasks finished.

## Reassess risk after delivery

A backlog item can be completed while risk remains.

After the treatment is implemented, reassess:

- likelihood;
- impact;
- affected population;
- detectability;
- reversibility;
- current controls;
- residual uncertainty.

Example:

```text
Before treatment:
High risk — 10,240 records receive uncontrolled default.

After treatment:
Medium risk — new defaulting stopped, but 10,240 historical records still require remediation.

After remediation:
Low risk — 42 exceptional records remain under approved manual review.
```

Only then should the risk status change.

## Require resolution evidence before closing the parent risk

Risk closure may require:

- approved model change;
- current dataset profile;
- successful mapping validation;
- SAP configuration verification;
- passing tests;
- remediation reconciliation;
- removal of temporary controls;
- owner confirmation.

The exact evidence depends on the risk type.

A completed sprint or closed ticket is not enough.

## Preserve rejected treatments

The programme may investigate and reject:

- defaulting;
- deriving from an unrelated field;
- creating a local duplicate attribute;
- weakening a validation globally.

Record why.

Future teams may rediscover the same idea.

A rejected-treatment note can prevent repeated analysis and unsafe reintroduction.

## Keep the backlog connected across tools

The organisation may use:

- Jira for programme delivery;
- service management for incidents;
- GitHub for canonical model changes;
- spreadsheets for business review;
- SAP tools for configuration;
- test-management software for evidence.

Do not duplicate every item everywhere.

Keep stable links:

```text
Model risk
→ decision
→ PatchProposal or ChangeRequest
→ Jira implementation epic
→ system-specific tasks
→ test evidence
→ resolution record
```

Martenweave can act as the model identity and evidence layer while specialist tools retain their operational responsibility.

## Where Martenweave fits

The current Martenweave Core README describes an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS. It converts spreadsheets, datasets, tickets, validation reports, decisions and SAP context into canonical model files, deterministic validation, gap reports, lineage, impact analysis and human-approved patch proposals.

The core’s current pipeline is:

```text
evidence
→ proposal
→ validation
→ gaps and impact
→ review
→ GitHub issue or pull request
```



For model-risk delivery, Martenweave can support:

- stable risk-to-object relationships;
- structural validation;
- dataset readiness;
- trace and impact analysis;
- PatchProposal generation;
- GitHub-ready issue drafts;
- current model baselines;
- human-reviewed changes.

The current implementation remains backend-first and CLI-driven rather than a full project-management or hosted workflow platform.

That boundary should remain.

Martenweave should help create better delivery evidence and issue packages.

It should not attempt to replace Jira, SAP Cloud ALM, ServiceNow or another established planning system.

## A Martenweave risk-to-backlog flow

```text
Dataset, ticket or validation finding
        ↓
Model risk linked to canonical objects
        ↓
Treatment decision
        ↓
Impact analysis
        ↓
Change package
        ↓
Agent-ready issue drafts
        ↓
Implementation in specialist tools
        ↓
Validation and test evidence
        ↓
Residual-risk reassessment
        ↓
Risk closure or renewed acceptance
```

The central principle is:

> The risk remains open until evidence shows that exposure has changed.

## AI can assist with backlog decomposition

AI can help:

- extract risks from reports and tickets;
- identify affected model objects;
- propose task decomposition;
- draft issue goals and acceptance criteria;
- identify likely dependencies;
- generate validation steps;
- group duplicate work;
- summarise residual risk.

This can reduce planning effort.

AI should not autonomously decide:

- which treatment is acceptable;
- who owns business risk;
- whether a temporary default is safe;
- whether the risk may be closed;
- whether evidence is legally sufficient.

AI-created issues should remain proposals.

The appropriate boundary is:

```text
AI drafts the work.
Validators check model references.
Responsible leads approve the treatment and backlog.
Humans verify completion.
```

## What management should ask

1. Which decision is required for each high-risk item?
2. Has the risk been decomposed into model, data, implementation and verification work?
3. Does every task identify the risk it reduces?
4. Are stable model objects referenced?
5. Are semantic decisions separated from technical implementation?
6. Are entry and acceptance criteria clear?
7. Is there a validation method?
8. Are temporary treatments paired with cleanup work?
9. Which small decisions unlock the largest amount of delivery?
10. Are high-risk items prioritised by exposure rather than ticket volume?
11. Does task completion reduce residual risk?
12. What evidence is required before the parent risk closes?
13. Are accepted risks still visible with owner and expiry?
14. Can the backlog survive transfer between teams and suppliers?

If the programme has high-quality risk slides but cannot answer these questions, risk management has not yet become delivery.

## Common mistakes

### Copying the risk statement directly into a ticket

A risk is not a bounded unit of work.

### Creating one generic mitigation task

“Cleanse data” or “fix mapping” hides multiple responsibilities.

### Implementing before the semantic decision

Technical teams make implicit business choices.

### Mixing model, data and configuration work

Completion becomes ambiguous.

### Closing the risk when one task finishes

Residual exposure may remain high.

### Omitting cleanup work for temporary controls

Workarounds become permanent.

### Creating too many tiny tickets

The treatment loses coherence.

### Prioritising by effort rather than risk reduction

Easy work creates progress without improving readiness.

### Treating accepted risk as resolved risk

Acceptance requires owner, control, expiry and reassessment.

### Allowing AI to close the loop autonomously

Business risk reduction requires accountable evidence review.

## When a spreadsheet backlog is enough

A lightweight spreadsheet may be sufficient when:

- one domain is involved;
- a small team owns decisions and delivery;
- dependencies are limited;
- change volume is low.

Useful columns include:

- risk ID;
- affected model ID;
- treatment;
- action;
- owner;
- dependency;
- acceptance criteria;
- validation method;
- residual risk;
- status.

A more connected registry and issue workflow becomes valuable when:

- risks cross several workstreams;
- multiple countries and systems are involved;
- model relationships drive impact;
- tasks are delegated to several partners or agents;
- migration and AMS need the same model history;
- risk closure requires reproducible evidence.

## Our conclusion

A risk register is not a delivery plan.

It becomes useful to delivery only after the programme converts each material risk into:

- a treatment decision;
- affected model objects;
- bounded work packages;
- owners;
- dependencies;
- acceptance criteria;
- validation evidence;
- residual-risk reassessment.

The practical test is:

> Can every high-risk model item be followed from the original exposure through the decision, model change, data remediation, implementation, testing and final resolution evidence?

When the answer is yes, the risk register is connected to execution.

When the answer ends at a mitigation statement such as “cleanse data” or “align with business,” the programme knows what it fears but has not yet defined how to change the outcome.

The purpose of the actionable backlog is not to create more tickets.

It is to make sure that every ticket contributes to a controlled reduction of a known model risk.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We build practical model-governance infrastructure for SAP migration, MDG, MDM and AMS teams.

Martenweave connects canonical model objects, datasets, mappings, rules, evidence, decisions, risks and reviewable change proposals. This provides the foundation for turning broad migration concerns into small, traceable and verifiable delivery work.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer that unifies master data, policy and metadata. Its capabilities include governed models, preservation of semantics and relationships, validated values, collaborative workflows, business-rule monitoring, mass changes and auditable data changes. SAP also recommends curating master data early before an SAP S/4HANA implementation because more automated processes rely heavily on clean and correct master data.

The current Martenweave Core README describes Martenweave as an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS. As of July 2026, the source version is 0.6.1.

The core uses canonical model files, deterministic validation, rebuildable indexes, dataset-gap analysis, trace and impact analysis, and reviewable `PatchProposal` and `ChangeRequest` workflows.

The current core also documents validation, impact, trace, dataset-readiness and GitHub-ready issue-generation workflows.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
