# How to Route Migration Findings to the Right Owner Without Creating Another Governance Bureaucracy

**Reviewed: 14 July 2026**

A migration-readiness run identifies 1,284 strategic suppliers without Supplier Risk.

The finding is assigned to the supplier data owner.

The data owner replies that the source system does not maintain Supplier Risk.

The finding is reassigned to the legacy-system team.

The legacy team explains that adding the field would require a release after cutover.

The migration lead receives it next and proposes a temporary default.

The global Supplier Risk owner rejects the default because absence of assessment does not mean standard risk.

The SAP team is then asked to create a pending status.

They respond that the model contains no such attribute.

The finding reaches the governance board three weeks after it was first detected.

Nothing has changed except the assignee.

This is a common failure mode in migration governance. The programme knows that ownership matters, so it creates more assignment steps, more groups and more escalation paths.

The result is not accountability.

It is routing by organisational guesswork.

> A migration finding should be routed according to the decision it requires, not merely according to the field, system or team where the symptom appeared.

The missing Supplier Risk value contains several different responsibilities:

- the source owner can confirm what the source can provide;
- the business owner can decide what Supplier Risk means;
- the migration lead can propose temporary containment;
- the SAP architect can implement an approved treatment;
- the risk owner can accept or reject residual exposure.

No single owner can resolve the complete finding.

But one role must own the next decision.

That is the distinction that prevents governance from becoming another queue.

---

# Ownership is not one field

Most issue-management tools provide an assignee field.

That field is useful for identifying who currently performs work.

It is not sufficient for model governance.

A migration finding may need several different forms of ownership:

### Evidence owner

Can provide or verify the source information.

### Model owner

Has authority over business meaning, scope and model policy.

### Implementation owner

Can change extraction, mapping, SAP configuration or an interface.

### Decision owner

Can select between valid treatments.

### Risk owner

Can accept a temporary deviation or unresolved residual population.

### Action owner

Is responsible for completing a specific task.

These roles may belong to different people.

The programme creates confusion when it expects the current ticket assignee to perform all six functions.

A source-system developer may be able to add a field.

That developer is not automatically authorised to decide that the field is mandatory.

A global data owner may define the rule.

That owner may not understand the effort required to change a legacy extract before cutover.

A migration lead may contain the problem.

That lead should not convert temporary containment into permanent model truth.

---

# Route the decision before routing the work

The first routing question should be:

> What must be decided next?

Not:

> Which team does this field belong to?

Consider the Supplier Risk finding.

The immediate decision is not yet “fix the source.”

It is:

> What approved treatment should apply when the source cannot provide final Supplier Risk before cutover?

Possible treatments include:

- source remediation;
- business enrichment;
- deterministic derivation;
- exclusion;
- controlled pending review;
- delayed activation.

The next owner should be the role authorised to choose among those treatments, supported by source, migration and technical evidence.

Only after the decision should implementation tasks be routed.

A useful sequence is:

```text
Finding
→ next decision
→ accountable authority
→ implementation actions
```

The weak sequence is:

```text
Finding
→ system team
→ another system team
→ governance board
```

The first sequence reduces handoffs.

The second produces them.

---

# Separate accountable authority from contributors

Many projects use RACI-like terminology but still create ambiguous ownership because too many people are marked responsible.

For each finding stage, identify one accountable decision role.

Contributors may provide evidence and recommendations.

For example:

```text
Finding:
ERP_B cannot provide Supplier Risk.

Decision owner:
Global Supplier Risk Owner

Required contributors:
ERP_B Source Owner
Migration Lead
SAP MDG Architect
Compliance Owner

Decision:
Approve controlled review treatment until source remediation.
```

After approval:

```text
Source-remediation task owner:
ERP_B Product Owner

Migration-enrichment task owner:
Supplier Migration Lead

SAP activation-control owner:
MDG Configuration Lead
```

One finding can therefore have:

- one decision owner;
- several action owners.

This is not duplication.

It is separation of authority from execution.

---

# Ownership should follow the finding taxonomy

A useful taxonomy already tells the programme what kind of problem it has.

Routing should use that classification.

| Finding type | Primary decision or action owner |
|---|---|
| Record defect | Source or business data steward |
| Extraction defect | Extraction or data-engineering owner |
| Mapping defect | Mapping or integration owner |
| Configuration defect | SAP or MDM configuration owner |
| Source capability gap | Source owner plus domain decision owner |
| Model ambiguity | Domain model owner |
| Model defect | Accountable global or contextual model owner |
| Decision gap | Authority responsible for the business choice |
| Rule conflict | Owners of the conflicting rule layers |
| Approved exception | Contextual policy owner |
| Temporary deviation | Migration owner and risk-acceptance authority |
| Unevaluable population | Owner of missing context or evidence |
| Unexpected pass | Control owner, then root-cause owner |

The category should determine the default route.

It should not determine the final answer automatically.

A finding can be reclassified when evidence changes.

---

# Do not assign a model question to a technical team

Several routing errors recur across SAP programmes.

## “SAP error” goes to the SAP team

A validation message appears in SAP, so the finding is assigned to the SAP consultant.

But the configuration may correctly implement an unresolved or incorrect business rule.

The SAP team can explain what the system does.

It cannot decide what the business model should mean.

## “Missing field” goes to the source team

The source team may confirm that the field does not exist.

It cannot decide whether the target field should be derived, enriched, optional or excluded.

## “Mapping failure” goes to the migration analyst

The analyst can implement an approved mapping.

The analyst should not invent semantic equivalence between similarly named fields.

## “Local exception” goes to the country team

The country team can explain local need.

It should not unilaterally override a global concept used by other countries and systems.

The symptom location is useful evidence.

It is not a complete routing rule.

---

# Assign to roles, not named individuals

A finding should route to:

```text
ROLE-GLOBAL-SUPPLIER-RISK-OWNER
```

not only to:

```text
Jane Smith
```

The current role holder may still be shown.

The canonical ownership relationship should survive staff changes, vacations and project transitions.

A practical owner record might include:

```text
Role:
Global Supplier Risk Owner

Current holder:
Jane Smith

Authority:
- approve global definition;
- approve value semantics;
- approve exceptions affecting shared meaning.

Does not own:
- ERP_B source remediation;
- SAP transport execution;
- record-level correction.
```

Role descriptions should contain:

- scope;
- authority;
- obligations;
- escalation path;
- delegate;
- effective dates.

A title without decision rights is not enough.

Two projects may both use the title “Data Owner” while giving it completely different authority.

---

# Use model context to derive the initial route

Manual assignment should not be required for every finding.

The model already contains useful routing signals:

- domain;
- object;
- country;
- source system;
- rule;
- lifecycle;
- finding category;
- impact level.

From these, Martenweave can propose an initial route.

Example:

```text
Finding:
Missing Tax Identifier

Domain:
Supplier

Country:
Portugal

Source:
ERP_PT

Classification:
Unevaluable population

Missing context:
Residency Status
```

Suggested routing:

```text
Primary:
ERP_PT Residency Status Data Owner

Consult:
Portugal Tax Data Owner

Escalate when:
Residency treatment is not defined by the current local model.
```

Another example:

```text
Finding:
`UNDER_REVIEW` used as Supplier Risk

Classification:
Model defect

Affected scope:
Germany, shared risk reporting
```

Suggested routing:

```text
Primary:
Global Supplier Risk Owner

Consult:
Germany Supplier Data Owner
Reporting Owner
SAP MDG Architect
```

The system can recommend the route.

It should not invent authority that is absent from the model.

---

# Missing ownership is itself a finding

When the system cannot determine an owner, do not route everything to the programme manager.

Create an ownership gap.

For example:

```text
Ownership gap:
No accountable owner exists for Customer Group semantics.

Known operational contacts:
Sales Data Lead
Customer Migration Lead

Decision affected:
Whether Customer Group is central or sales-area-specific.
```

The ownership gap should be visible in:

- governance health;
- readiness reports;
- impact analysis;
- proposal review.

The current Martenweave command reference already includes an `owners` capability described as reporting ownership coverage and steward workload, alongside health, scorecard and broader analysis commands.

Its demo flow also describes governance health and scorecard output as covering model completeness, ownership and readiness signals.

That is the right product direction.

A missing owner should not become an invisible administrative inconvenience.

It is a model-governance risk.

---

# Use a fallback ladder, not a giant central queue

Ownership cannot be perfect before the programme starts.

A fallback route is needed.

A practical ladder is:

1. exact object owner;
2. contextual owner;
3. domain owner;
4. source or implementation owner for evidence;
5. programme governance owner;
6. accountable sponsor for unresolved authority.

Example:

```text
ATTR-SUPPLIER-RISK owner unavailable
→ Global Supplier Domain Owner

No current global domain owner
→ Data Governance Lead

Authority dispute remains
→ Programme Data Sponsor
```

The fallback should stop as soon as a role with sufficient authority is found.

Do not copy every higher level on every finding.

Escalation is not visibility.

It is a transfer of unresolved authority.

---

# Escalate by consequence, not by age alone

A finding that remains open for ten days is not automatically more important than a new finding.

Escalation should consider:

- cutover dependency;
- affected population;
- legal or compliance consequence;
- number of dependent systems;
- irreversible transformation;
- unexpected pass;
- absence of accountable owner;
- decision deadline;
- temporary-deviation expiry.

A good escalation rule might say:

```text
Escalate immediately when:
- incorrect data can activate or replicate;
- a global rule conflict blocks several countries;
- no authority exists for a cutover-critical decision;
- a temporary deviation expires before the next test cycle.
```

A weaker rule says:

```text
Escalate every finding open longer than five days.
```

Age is still relevant.

It should not be the only signal.

---

# The owner should receive a decision-ready packet

Routing fails when an owner receives a vague ticket.

Example:

> Please confirm Supplier Risk treatment urgently.

The owner then has to reconstruct:

- applicable population;
- source limitation;
- current rule;
- alternatives;
- impact;
- deadline.

A routed finding should contain:

### The decision required

One explicit question.

### Current model

What is approved now?

### Evidence

What did the dataset, source or implementation show?

### Scope

Which records, countries, systems and lifecycle stages are affected?

### Alternatives

What treatments are realistically available?

### Consequence of delay

What milestone, control or downstream process is blocked?

### Recommendation

What does the investigation team propose?

### Required authority

Why is this owner the correct decision role?

Example:

```text
Decision required:
Approve the Wave 2 treatment for ERP_B suppliers
without final Supplier Risk.

Applicable records:
1,284 active strategic supplier organisations.

Current policy:
Final Supplier Risk required before activation.

Source constraint:
ERP_B cannot supply the value before cutover.

Recommended treatment:
Controlled enrichment and PENDING review;
activation remains blocked.

Decision deadline:
Before Mock Load 3 preparation.
```

This reduces meetings because the owner receives a bounded decision.

---

# Do not route every finding to a governance board

A governance board is useful for:

- cross-domain conflicts;
- global policy changes;
- unresolved authority;
- material risk acceptance;
- repeated local patterns requiring global promotion.

It should not review:

- isolated invalid records;
- obvious extraction defects;
- implementation drift with known treatment;
- standard mapping corrections.

A useful principle is:

> Governance decides meaning and authority. Delivery teams execute known treatments.

If the board reviews every data issue, governance becomes a bottleneck.

If the board reviews nothing until escalation, technical teams make model decisions informally.

The operating model should define a clear decision threshold.

---

# Create decision lanes

A simple model uses four lanes.

## Lane 1: Direct remediation

Used when the intended state and owner are known.

Examples:

- record defect;
- extraction defect;
- mapping implementation error.

No governance approval is required unless impact changes model truth.

## Lane 2: Domain decision

Used for questions within one data domain.

Examples:

- default policy;
- ownership;
- source authority;
- lifecycle rule;
- value semantics.

The accountable domain owner decides.

## Lane 3: Contextual decision

Used for country, business-unit or local-process differences.

The local owner decides within approved authority, often with global concurrence.

## Lane 4: Cross-domain or enterprise decision

Used when the change affects:

- several domains;
- enterprise identifiers;
- shared integrations;
- global semantics;
- material risk.

A broader governance body is justified.

The lane should be derived from impact and authority, not requester seniority.

---

# Keep approval chains short

A weak governance process requires sequential approval from:

1. local data steward;
2. local owner;
3. migration lead;
4. global owner;
5. solution architect;
6. programme architect;
7. governance board;
8. sponsor.

Some participants need to contribute.

They do not all need veto authority.

For each finding, identify:

- one accountable approver;
- mandatory contributors;
- informed parties.

SAP describes MDG as supporting ownership of specific master-data attributes and collaborative workflow routing, with standardised routing and notifications intended to bring the right people into the process at the right time.

The phrase “at the right time” matters.

A workflow that sends every finding to everyone is not stronger governance.

It is an expensive notification system.

---

# The tool should route tasks after the model routes authority

Jira can assign, prioritise and track work, use custom workflows, send notifications and automate assignment. Those capabilities are useful after the programme knows what work type it is routing and who owns the next action.

The wrong sequence is:

```text
Create Jira issue
→ assign team
→ discuss what the issue means
→ reassign repeatedly
```

The stronger sequence is:

```text
Classify finding
→ determine decision owner
→ approve treatment
→ create implementation tasks
```

Jira, ServiceNow or GitHub should execute the routing decision.

They should not be forced to infer model authority from component names or ticket queues.

---

# Avoid ownership by workload dumping

A common anti-pattern is:

> Assign every Customer issue to the Customer Data Owner.

The Customer Data Owner becomes responsible for:

- missing records;
- SAP defects;
- source extracts;
- mappings;
- tests;
- local exceptions;
- project coordination.

This does not establish accountability.

It makes the role a mailbox.

Ownership should mean one of two things:

### Authority ownership

The role can make the required decision.

### Execution ownership

The role can complete the assigned action.

Do not use a senior data owner as the default execution owner for every issue in the domain.

---

# Stewardship workload should be visible

Even well-designed ownership can fail when one role receives too much work.

Track:

- open findings by owner;
- decisions awaiting one role;
- number of impacted records;
- age by consequence;
- repeated evidence requests;
- delegated versus non-delegable decisions;
- upcoming deviation expiries.

A large queue may indicate:

- role undercapacity;
- overly centralised authority;
- unclear delegation;
- too many findings reaching governance because classification is weak;
- poor source controls generating repeated work.

The response should not always be “add more stewards.”

Sometimes the operating model needs fewer approval points and better automated evidence.

---

# Delegate bounded decisions

A global owner should not personally approve every country mapping.

Delegation can be defined by scope.

Example:

```text
Portugal Supplier Data Owner may approve:
- local source mappings;
- Portuguese labels;
- evidence references;
- local remediation treatment.

Joint approval required for:
- local values added to shared classifications;
- overrides of global mandatory rules;
- new attributes distributed outside Portugal.

Global approval required for:
- definition;
- granularity;
- cardinality;
- shared value semantics.
```

Delegation reduces bureaucracy without weakening governance.

The authority boundary remains explicit.

---

# Use pre-approved treatment patterns

Many findings repeat.

The programme can define treatment patterns for common cases.

Examples:

### Missing optional source field

Route directly to source assessment and mapping update.

### Missing mandatory field with no source

Route to domain decision with standard alternatives:

- enrichment;
- derivation;
- exclusion;
- controlled review.

### Unknown value

Route to value owner with frequency, examples and downstream impact.

### Configuration differs from approved rule

Route directly to implementation owner and require regression evidence.

### Temporary deviation nearing expiry

Route to migration owner and risk authority with three choices:

- close;
- extend;
- convert into permanent proposal.

Treatment patterns reduce meeting design and repeated interpretation.

They should not predetermine the business decision.

---

# A finding can have a moving owner without losing accountability

The owner of the finding lifecycle may change.

For example:

```text
Investigation stage:
Migration Data Analyst

Decision stage:
Global Supplier Risk Owner

Implementation stage:
SAP MDG Lead and ERP_B Product Owner

Verification stage:
Test Lead

Closure authority:
Supplier Migration Lead
```

This is acceptable when the transitions are explicit.

The problem is uncontrolled reassignment where responsibility disappears at each handoff.

A lifecycle record should show:

- current stage;
- stage owner;
- accountable decision owner;
- pending action;
- evidence required to advance.

---

# Closure authority should match the original problem

The person who implemented a change should not always be the person who closes the finding.

Examples:

- the SAP consultant confirms configuration transport;
- the test lead confirms expected behaviour;
- the data owner confirms affected population;
- the model owner confirms semantic alignment.

For a model defect, closure should require:

- canonical model updated;
- implementation aligned;
- affected population assessed;
- regression passed.

A technical task may be complete while the finding remains open.

This distinction prevents false closure.

---

# Worked route: missing Supplier Risk

### Observation

1,284 ERP_B strategic suppliers have no final Supplier Risk.

### Classification

Source capability gap plus decision gap.

### Initial decision owner

Global Supplier Risk Owner.

### Contributors

- ERP_B Source Owner;
- Migration Lead;
- Compliance Owner;
- SAP MDG Architect.

### Decision

Approve controlled enrichment and PENDING review. Final activation remains blocked.

### Action routing

- source enhancement: ERP_B Product Owner;
- enrichment process: Migration Lead;
- review-status model proposal: Global Supplier Model Owner;
- SAP activation control: MDG Configuration Lead;
- regression: Test Lead.

### Closure

Supplier Migration Lead closes the finding only after:

- current population treated;
- activation control verified;
- source remediation tracked;
- temporary treatment given an expiry or permanent approval.

One finding, one decision owner, several action owners.

---

# Worked route: Portuguese tax exemption

### Observation

Portuguese non-resident supplier organisations fail the global Tax Identifier rule.

### Classification

Potential contextual exception.

### Decision owner

Portugal Tax Data Owner.

### Required concurrence

Global Supplier Data Owner because the rule affects a shared attribute.

### Evidence contributors

- local tax specialist;
- source owner;
- SAP architect.

### Decision

Approve exemption only for non-resident organisations with valid exemption evidence.

### Action routing

- model override: model-governance owner;
- source field for residency: ERP_PT owner;
- SAP validation: MDG lead;
- test scenarios: test owner.

### Escalation

Only if local and global owners disagree about semantic scope.

The governance board does not need to review the configuration details.

---

# Worked route: incorrect SAP validation

### Observation

Supplier Risk validation applies to persons and organisations.

### Approved model

Rule applies only to supplier organisations.

### Classification

Configuration defect.

### Owner

SAP MDG Configuration Lead.

### Consulted

Supplier Model Owner to confirm current baseline.

### No decision required

The intended behaviour is already approved.

### Closure

- configuration corrected;
- person and organisation regression cases passed;
- affected records rerun.

Sending this finding through a governance board would add delay without adding authority.

---

# Worked route: unknown Customer Group source

### Observation

No authoritative source for sales-area Customer Group has been approved.

### Classification

Model ambiguity and source-authority decision.

### Owner

Global Customer Data Owner.

### Contributors

- sales-process owner;
- CRM source owner;
- migration architect;
- reporting owner.

### Why not the mapping team?

The mapping team cannot create an authoritative source.

### Decision outputs

- selected source or enrichment process;
- organisational granularity;
- owner;
- treatment of existing gaps;
- impact on analytics.

Only after that should mapping work be created.

---

# A routing object for Martenweave

A conceptual finding could contain:

```yaml
id: FIND-SUPPLIER-RISK-ERP-B-001
classification: source_capability_gap
stage: decision_required

affected_objects:
  - ATTR-SUPPLIER-RISK
  - FEP-ERP-B-SUPPLIER-RISK

scope:
  source_systems:
    - ERP_B
  population:
    - active_strategic_supplier_organisations

routing:
  accountable_role:
    - ROLE-GLOBAL-SUPPLIER-RISK-OWNER

  contributors:
    - ROLE-ERP-B-DATA-OWNER
    - ROLE-SUPPLIER-MIGRATION-LEAD
    - ROLE-MDG-ARCHITECT

  fallback_role:
    - ROLE-GLOBAL-SUPPLIER-DOMAIN-OWNER

  escalation_triggers:
    - decision_due_before_mock_load_3
    - no_authorised_owner
    - unexpected_activation_possible

decision_required: >
  Approve treatment for suppliers that cannot receive
  final Supplier Risk from ERP_B before cutover.
```

This is a product direction, not a claim about the current schema.

The routing information should be derived from:

- classification;
- affected objects;
- context;
- role registry;
- impact.

---

# Deterministic routing checks

Martenweave could validate that:

- every decision-required finding has one accountable role;
- every role exists;
- the owner’s authority covers the object and context;
- temporary deviations include risk authority;
- local overrides include contextual authority;
- global model changes include global authority;
- implementation defects are not routed to governance without reason;
- fallback ownership exists for critical domains;
- closed findings identify verification authority;
- one person is not used as the only canonical owner where a role should exist.

The validator should not decide who the organisation appoints.

It should detect when the model cannot route its own governance work.

---

# Automatic routing should remain explainable

A suggested route should include a reason.

Weak output:

```text
Assigned to: Global Supplier Risk Owner
```

Stronger output:

```text
Suggested accountable role:
Global Supplier Risk Owner

Reason:
The finding is classified as a source capability gap,
but the next action requires selection of an approved treatment
for the global Supplier Risk attribute.
```

This allows users to challenge the route.

Opaque routing creates another form of bureaucracy: people follow a queue without understanding why.

---

# What AI may do safely

AI can help:

- classify likely finding type;
- identify affected model objects;
- find current ownership;
- suggest contributors;
- compare previous similar routes;
- draft the decision packet;
- detect missing authority.

It should not appoint owners or approve decisions.

A useful output is:

> The current assignee owns ERP_B extraction, but the finding requires a decision about Supplier Risk treatment. The canonical role for that decision is Global Supplier Risk Owner. ERP_B ownership remains required as evidence contributor and source-remediation owner.

That is materially better than:

> Reassign to data governance.

---

# The anti-bureaucracy rules

A routing model should obey several constraints.

### One accountable decision role per stage

Several contributors are acceptable. Several equal approvers usually create delay.

### No board review when the intended state is already approved

Known defects go directly to implementation.

### No technical team receives an unanswered semantic question as a fix request

Decision first, work second.

### No finding is assigned only because of the system where it appeared

Route by cause and decision type.

### No temporary deviation bypasses risk authority and expiry

Delivery urgency does not erase accountability.

### No missing owner is hidden through assignment to the programme manager

Record the ownership gap.

### No action ticket replaces the enduring finding

Execution may move across tools. Model context must remain stable.

### No escalation copies everyone

Escalation transfers unresolved authority to the next valid role.

### No approval chain is longer than the semantic impact requires

Local implementation should not need enterprise governance approval.

---

# What to measure

The wrong metric is:

> Percentage of findings assigned.

A finding can be assigned and still have no accountable authority.

Better measures include:

### First-route accuracy

How often is the finding sent to the correct decision or action role initially?

### Handoff count

How many ownership transfers occur before a treatment is approved?

### Unowned critical findings

How many cutover-critical findings lack an authorised owner?

### Decision waiting time

How long do decision-required findings wait after evidence is ready?

### Governance-board leakage

How many known implementation defects reach the board unnecessarily?

### Reopened findings

How often is a finding closed by one team and reopened because another responsibility remained incomplete?

### Steward concentration

Which roles have become bottlenecks?

### Routing explainability

Can users see why a role was selected?

These metrics show whether governance is working or merely assigning work.

---

# Where other platforms fit

SAP MDG can route operational change requests and bring designated participants into collaborative workflows. SAP’s current product description also emphasises attribute ownership, validated values, automated routing, notifications and auditable changes.

Collibra’s published governance guidance treats the operating model as the basis for governance and describes it as defining roles, responsibilities, business terms and domains. It also distinguishes centralised from federated authority and discusses business and technical stewards operating within formal ownership structures.

Jira can capture, assign, prioritise and route work through configurable workflows and automation.

These capabilities are complementary.

The missing project-level question is:

> Which role has authority over this specific finding, given its model object, context, classification and required decision?

Martenweave should answer that question and pass the resulting work into the existing workflow platform.

It should not recreate Jira, ServiceNow, SAP workflow or enterprise stewardship tooling.

---

# A focused Martenweave delivery slice

The smallest useful ownership-routing capability would contain:

## Role objects

With:

- authority scope;
- domains;
- contexts;
- decision types;
- current holder;
- delegate;
- escalation parent.

## Ownership relationships

For:

- domains;
- entities;
- attributes;
- rules;
- sources;
- local contexts.

## Routing rules

Based on:

- finding classification;
- affected object;
- country;
- source;
- lifecycle stage;
- impact.

## Ownership-gap detection

Show:

- objects without owners;
- findings without authority;
- overloaded roles;
- expired assignments.

## Decision packet generation

Produce a concise review package for the accountable owner.

## Issue export

Create Jira-, ServiceNow- or GitHub-ready actions after treatment is selected.

This remains consistent with Martenweave’s backend-first direction. Canonical model files remain authoritative, generated indexes remain rebuildable, and proposals remain subject to human review rather than silent mutation.

---

# The final standard

A finding is correctly routed when the recipient can answer the next required question.

Not when the recipient owns the table.

Not when the recipient’s team name matches the error message.

Not when the recipient is the most senior person available.

The route should be explainable as:

```text
This finding requires this decision.

This role has authority over that decision.

These contributors possess the required evidence.

These teams will implement the approved treatment.
```

That is enough governance.

Everything beyond it should justify its cost.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects:

- findings;
- model objects;
- contexts;
- ownership roles;
- decisions;
- implementation actions;
- impact;
- reviewable changes.

The objective is not to create another approval platform.

It is to prevent migration findings from circulating between teams because the programme cannot distinguish the owner of the data, the owner of the decision and the owner of the work.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as supporting governed models, ownership of master-data attributes, validated values, collaborative workflow routing, notifications, business-rule monitoring and auditable change.

Collibra’s published data-governance guidance describes the operating model as the basis for governance, defining roles, responsibilities, domains and business terms. It recognises centralised and federated authority structures and distinguishes business stewardship from technical stewardship.

Atlassian describes Jira as supporting capture, assignment, prioritisation, custom workflows, notifications and automated routing of issues and work items.

Martenweave Core currently includes ownership coverage and steward-workload reporting in its command set, alongside health, scorecard, validation, gap, trace and impact capabilities.

Its public demo flow describes governance health and scorecard output as providing ownership, readiness and model-coverage signals.

Martenweave is independent and is not affiliated with or endorsed by SAP, Collibra, Atlassian or other vendors named in this article. Product names and trademarks belong to their respective owners.
