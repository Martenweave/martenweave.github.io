# How to Build an AMS Model Change Process That Does Not Recreate the SAP Project

**Reviewed: 14 July 2026**

Six months after go-live, a country requests a new Supplier Classification value.

The request enters the AMS queue as a service ticket:

> Add `PUBLIC_SECTOR` to the Supplier Type value list.

The change appears small.

The SAP analyst confirms that the value can be added quickly. A transport could be ready within days.

Then several questions emerge:

- Does `PUBLIC_SECTOR` describe the same classification dimension as the existing values?
- Can a supplier be both strategic and public sector?
- Is the value needed only in one country?
- Will interfaces accept it?
- Will global reports interpret it correctly?
- Does the request reveal a separate Legal Sector attribute?
- Which owner may approve the change?

The service ticket is escalated.

A meeting is scheduled with the original programme architect, the former migration lead, local business representatives, SAP consultants, integration teams and reporting owners.

The organisation has recreated part of the implementation project to decide one value-list change.

The opposite response is also common.

AMS treats the request as ordinary configuration maintenance. The value is added, the ticket is closed and downstream consequences appear later.

Neither approach is sustainable.

> AMS needs a model-change process that is lighter than a transformation programme but stronger than an ordinary technical change ticket.

The process must preserve two capabilities at once:

1. fast restoration and operational delivery;
2. controlled changes to model meaning.

It should not send every issue to a design board.

It should not allow model decisions to hide inside incident resolution.

The goal is a small, repeatable operating loop.

---

# Two operating systems exist after go-live

Post-go-live organisations usually run two different systems of work.

The first is the service-management system.

It handles:

- incidents;
- service requests;
- problem records;
- changes;
- releases;
- SLAs;
- technical ownership.

The second is the model-governance system.

It handles:

- definitions;
- applicability;
- mappings;
- source authority;
- global and local variation;
- business rules;
- exceptions;
- model impact;
- ownership of meaning.

The same event may touch both.

A supplier activation incident may reveal:

- incorrect configuration;
- missing source data;
- unresolved rule applicability;
- a new local requirement;
- a temporary exception that never expired.

The service process needs to restore operations.

The model process needs to decide whether the incident changes what the organisation considers true.

Confusion begins when one system attempts to replace the other.

---

# The incident must not become the design authority

Consider a production incident:

> Supplier cannot be activated because Supplier Risk is blank.

AMS investigates and discovers that the source system cannot provide the value for a new supplier category.

The immediate operational options include:

- request manual enrichment;
- hold the supplier;
- apply a temporary exception;
- change the validation;
- add a default.

The incident team should not make a permanent model decision merely because it needs a fast resolution.

A safe response separates two clocks.

## Operational containment

What is required now to restore or protect the service?

## Model resolution

What permanent treatment should govern this situation in the future?

For example:

```text
Immediate containment:
Keep activation blocked.
Route the record to controlled business review.

Permanent question:
Should the new supplier category require Supplier Risk,
use another classification, or be excluded from the rule?
```

The incident can be contained before the model question is fully resolved.

That is preferable to either leaving the business blocked indefinitely or embedding a permanent workaround under time pressure.

---

# Not every operational change is a model change

The first control should be a simple test:

> Does the requested change alter approved meaning, applicability, ownership or model behaviour?

When the answer is no, AMS can usually proceed through its normal change process.

Examples:

- correct configuration to match an approved rule;
- restore a failed interface;
- repair an extraction job;
- fix a transformation that contradicts the approved mapping;
- update a label without changing canonical meaning;
- correct an obsolete implementation reference.

When the answer is yes or uncertain, the request needs model review.

Examples:

- add a value;
- redefine a field;
- change mandatory applicability;
- introduce a default;
- approve a new source;
- change cardinality;
- create a permanent exception;
- retire a model object;
- convert a local attribute into a global one.

The distinction should be visible in intake.

AMS should not need a workshop to determine which path applies.

---

# The five-minute intake test

A practical intake can use five questions.

## 1. Is the intended state already approved?

When yes, this is likely an implementation correction.

## 2. Does the request alter business meaning?

When yes, it is a model change.

## 3. Does the request alter the population to which a rule applies?

When yes, it is a model or contextual-governance change.

## 4. Is the treatment temporary and bounded?

When yes, it may be a deviation rather than a permanent change.

## 5. Could the change affect another system, country or model object?

When yes, impact analysis is required before implementation.

The outcome should be one of four routes:

```text
Direct operational fix
Controlled implementation change
Temporary deviation
Model change proposal
```

This is enough for intake.

Do not ask the requester to complete a long architecture template before the issue is understood.

---

# The smallest viable AMS model-change loop

A sustainable process can be expressed as seven stages:

```text
Signal
→ classify
→ contain
→ assess
→ decide
→ implement
→ verify
```

Each stage should have one clear purpose.

---

## 1. Signal

A potential model change may originate from:

- incident;
- service request;
- recurring defect;
- local regulatory request;
- source-system change;
- SAP release;
- interface change;
- data-quality trend;
- user feedback;
- audit finding.

The signal should remain linked to its original operational record.

Do not force the user to create several independent requests.

The service ticket is the entry point.

The model finding becomes the durable interpretation.

---

## 2. Classify

Determine whether the signal represents:

- record defect;
- extraction defect;
- mapping defect;
- configuration defect;
- model ambiguity;
- model defect;
- decision gap;
- approved exception;
- temporary deviation.

Classification should answer:

> Is the intended state already known?

When yes, fix the implementation.

When no, route the question to model authority.

A request to “add a value” should not automatically be classified as configuration change.

The value may introduce another business dimension.

---

## 3. Contain

Contain operational risk before debating permanent design.

Possible containment includes:

- hold activation;
- route to manual review;
- restrict the affected population;
- disable incorrect distribution;
- revert an implementation;
- apply an existing approved fallback.

Containment should be:

- explicit;
- reversible;
- scoped;
- time-bound where temporary;
- recorded against the affected rule.

A containment measure must not silently become the permanent solution.

---

## 4. Assess

The assessment should answer only what is needed to decide the treatment.

A small assessment package contains:

### Current approved model

What does the canonical model currently say?

### Observed condition

What happened in production?

### Scope

Which countries, records, systems and processes are affected?

### Proposed change

What would become different?

### Alternatives

Can the issue be resolved without changing model truth?

### Impact

Which mappings, rules, interfaces, tests and reports may be affected?

### Authority

Who may approve the result?

This is not a full project design phase.

The purpose is to produce a decision-ready delta.

---

## 5. Decide

The accountable owner should select one treatment:

- reject the requested change;
- correct implementation;
- approve a contextual extension;
- approve a global change;
- approve a temporary deviation;
- require further investigation.

The decision should state:

- what becomes true;
- where it applies;
- when it becomes effective;
- what remains unchanged;
- who approved it;
- what evidence supported it.

A comment such as “business approved” is not enough.

---

## 6. Implement

The approved decision may create several technical actions:

- canonical model update;
- SAP configuration;
- workflow change;
- interface update;
- mapping change;
- data correction;
- monitoring change;
- knowledge-article update.

Each implementation should reference the same model decision.

Do not allow each team to reinterpret the change independently.

---

## 7. Verify

Closure requires evidence that:

- canonical model reflects the decision;
- implementation matches the model;
- affected population behaves correctly;
- unrelated contexts have not changed;
- temporary containment has been removed or retained intentionally;
- operational documentation is current.

The ticket should not close merely because a transport reached production.

---

# Three change lanes are enough

A lightweight operating model does not need a large hierarchy of boards.

Three lanes can handle most post-go-live work.

## Lane A: Standard correction

Used when approved intent is known.

Examples:

- wrong configuration;
- extraction failure;
- mapping implementation error;
- obsolete validation reference.

Approval:

- normal AMS or platform change authority.

Model review:

- not required unless the investigation reveals ambiguity.

## Lane B: Bounded model change

Used when one domain or context changes without broad enterprise impact.

Examples:

- local validation;
- contextual extension;
- clarified definition;
- new source mapping;
- approved value under an existing dimension.

Approval:

- accountable domain or contextual owner.

Review:

- targeted impact assessment.

## Lane C: Material model change

Used when the change affects:

- global semantics;
- shared value lists;
- several countries;
- enterprise reporting;
- several integrations;
- critical compliance rules;
- object identity or cardinality.

Approval:

- broader model authority or governance forum.

Review:

- formal impact and migration plan.

The majority of AMS work should remain in Lane A.

A healthy process does not treat every change as architecture governance.

---

# The change package should be short

A post-go-live model change should not require the programme’s full design-document structure.

A concise proposal can contain:

```yaml
id: CHANGE-SUPPLIER-LEGAL-SECTOR-014
origin: AMS-INC-4821
change_type: bounded_model_change

problem: >
  Public-sector status is currently being proposed as a Supplier Type,
  but existing Supplier Type values represent commercial relationship.

current_model:
  object: ATTR-SUPPLIER-TYPE
  values:
    - STANDARD
    - STRATEGIC
    - REGULATED

proposal: >
  Introduce Legal Sector as a separate attribute.
  Do not add PUBLIC_SECTOR to Supplier Type.

scope:
  countries:
    - PT

impact:
  mappings:
    - MAP-ERP-PT-SUPPLIER
  interfaces:
    - INT-SUPPLIER-REPORTING
  rules:
    - RULE-PT-TENDERING

decision_owner:
  - ROLE-GLOBAL-SUPPLIER-DATA-OWNER
```

The exact schema is secondary.

The package must make the semantic delta visible.

---

# Emergency changes need two closures

Sometimes operations cannot wait.

An urgent production workaround may be necessary.

For example:

- disable a broken rule;
- permit manual maintenance;
- stop an interface;
- apply a temporary value;
- bypass a failed derivation.

The emergency process should create two closure obligations.

## Operational closure

Was service restored safely?

## Model closure

Was the temporary treatment:

- removed;
- formally approved;
- replaced with another design;
- extended through explicit risk acceptance?

Without the second closure, emergency behaviour becomes hidden model drift.

A useful emergency record includes:

```text
Temporary behaviour:
Validation changed from error to warning.

Reason:
Production onboarding blocked.

Scope:
Portugal supplier organisations.

Expiry:
Ten business days.

Permanent decision required:
Confirm whether the local population is genuinely exempt.
```

The emergency change is complete only when the model question is closed.

---

# Repeated incidents should trigger model review

One incident may be operational noise.

A pattern of incidents is model evidence.

Examples:

- recurring missing field;
- repeated manual value creation;
- the same exception requested monthly;
- several countries requesting equivalent local fields;
- one validation repeatedly disabled;
- frequent support questions about the same definition.

AMS should have a trigger that converts recurrence into a model finding.

The trigger does not need to rely on one universal count.

Materiality matters.

A single incident can justify model review when it exposes:

- incorrect semantic definition;
- compliance risk;
- uncontrolled distribution;
- enterprise-wide impact.

The principle is:

> Repetition or materiality should move the issue from case handling to model investigation.

---

# The change board should not read every ticket

A traditional change advisory process may examine operational risk, scheduling, dependencies and implementation readiness.

A model-governance review examines different questions:

- Is meaning changing?
- Is scope changing?
- Is a local exception becoming permanent?
- Does the proposal duplicate another concept?
- Which model objects and consumers are affected?
- Who has authority?

The same group does not need to perform both reviews.

Atlassian’s current change-management guidance distinguishes change enablement from rigid, approval-heavy processes and argues for balancing governance with faster, collaborative delivery rather than treating every change through the same heavy mechanism.

A practical design is:

```text
Model authority approves meaning.
Service/change authority approves implementation and release.
```

For a standard correction, model approval is unnecessary.

For a model change, both approvals may be required—but for different reasons.

---

# Do not confuse risk assessment with semantic approval

A change can be technically low risk and semantically significant.

Adding one value to a table may be easy to deploy.

It may still alter:

- enterprise classification;
- analytics;
- workflow;
- downstream integrations;
- local-global consistency.

Conversely, a technically complex interface repair may not change model meaning at all.

Use two impact dimensions:

## Semantic impact

Does the change alter what the model means?

## Operational impact

How difficult or risky is implementation?

This creates a more useful matrix.

| Semantic impact | Operational impact | Treatment |
|---|---|---|
| Low | Low | Standard correction |
| Low | High | Technical change governance |
| High | Low | Model approval plus simple implementation |
| High | High | Full model and change review |

A one-line configuration change can belong in the third category.

---

# What SAP MDG should own

SAP currently positions MDG as a central governance layer with governed master-data models, preserved semantics and relationships, ownership of attributes, validated values, collaborative workflows, business-rule monitoring and auditable changes.

Within an AMS operating model, SAP MDG can own:

- operational change-request workflows;
- stewardship tasks;
- validations;
- derivations;
- controlled activation;
- audit trail;
- data-quality monitoring.

It should not be the only place where model intent is stored.

A BRFplus rule or workflow condition shows executable behaviour.

It may not explain:

- why the rule exists;
- which evidence justified it;
- whether it is global or contextual;
- what alternative was rejected;
- which temporary deviation preceded it.

Martenweave should preserve that surrounding model context.

---

# What the ITSM platform should own

The ITSM platform should remain the operational system of record for:

- incident;
- service request;
- problem;
- implementation change;
- SLA;
- release;
- support communication.

It should contain links to the relevant:

- model object;
- finding;
- decision;
- proposal;
- verification evidence.

Do not reproduce the entire service-management workflow in Martenweave.

The relationship can be simple:

```text
Incident
→ model finding
→ model decision
→ implementation change
→ verification
→ incident/problem closure
```

The ITSM record answers:

> What operational work is happening?

Martenweave answers:

> Which model truth is being questioned or changed?

---

# What Git should own

Git should preserve:

- exact canonical diff;
- proposal history;
- reviewer comments;
- approval record;
- effective baseline.

The current Martenweave core is explicitly built around canonical Markdown and YAML files, deterministic validation, rebuildable indexes, reviewable `PatchProposal` objects and human-approved changes recorded through Git-oriented workflows.

Its documented pipeline is:

```text
evidence → proposal → validation → gaps/impact → review → GitHub issue/PR
```

Martenweave does not position itself as a generic workflow platform or direct SAP write-back mechanism.

That boundary is useful for AMS.

The ITSM platform runs the service process.

Git records the approved model change.

Martenweave connects evidence, model and proposal.

---

# The model repository cannot wait for quarterly documentation updates

One of the most damaging AMS patterns is:

1. configuration changes today;
2. specification updated later;
3. later never arrives.

The canonical model should change before or with implementation.

For emergency changes, the temporary record should be created immediately and reconciled afterward.

A practical rule is:

> No permanent implementation change is complete until its canonical model change is merged.

This does not mean every record correction needs a repository commit.

It means that changes to:

- definitions;
- rules;
- mappings;
- values;
- ownership;
- exceptions;
- source authority;

must be reflected in the model source of truth.

---

# Model drift detection belongs in AMS

AMS should regularly compare:

- canonical model;
- current SAP configuration;
- active mappings;
- operational procedures;
- monitoring rules;
- known exceptions.

The comparison may begin manually.

The goal is to detect:

- configuration without model decision;
- model decision not implemented;
- retired value still active;
- expired deviation still operating;
- test script on old baseline;
- knowledge article describing obsolete behaviour.

Martenweave’s current command set includes deterministic validation, repository health, governance scorecards, trace, impact, diff, ownership reporting and dataset-readiness functions.

Those capabilities provide the foundation for a lightweight AMS alignment check.

They do not yet replace direct SAP configuration inspection.

They provide the canonical side against which implementation evidence can be compared.

---

# A weekly model-maintenance review can be fifteen minutes

Do not recreate a programme design authority.

A small weekly or biweekly review can focus only on:

- new decision-required findings;
- emergency changes awaiting model closure;
- temporary deviations nearing expiry;
- repeated incidents;
- proposals with material cross-context impact;
- ownerless critical questions.

Most corrections should never enter this meeting.

The review should not include long status reporting.

Every item should arrive with:

- one decision question;
- evidence;
- recommendation;
- authority;
- deadline.

A meeting becomes bureaucratic when it is used to discover the issue.

It remains useful when it resolves a prepared conflict.

---

# The monthly review should look for patterns, not individual tickets

A monthly operating review can inspect:

- recurring model findings;
- high-override objects;
- repeated local extensions;
- owner bottlenecks;
- expired deviations;
- unresolved source commitments;
- drift between model and implementation;
- changes closed without evidence.

This is where AMS becomes a source of product and model intelligence.

The goal is not to count tickets.

It is to ask:

> What is the operational system repeatedly telling us about the model?

---

# Closure evidence must match the change type

A configuration correction closes with:

- approved rule reference;
- corrected configuration;
- regression evidence;
- affected population rerun.

A mapping correction closes with:

- canonical mapping confirmation;
- transformation update;
- dataset comparison;
- downstream verification.

A contextual model change closes with:

- decision;
- canonical diff;
- local scope validation;
- global regression.

A temporary deviation closes with:

- residual population resolved;
- temporary implementation removed;
- expiry recorded;
- permanent model unchanged or formally updated.

A global model change closes with:

- approved semantic diff;
- impact assessment;
- affected contexts reviewed;
- implementation plan;
- consumer alignment.

One generic closure field cannot prove all of these.

---

# Worked case: add `PUBLIC_SECTOR`

The country request says:

> Add `PUBLIC_SECTOR` to Supplier Type.

## Intake

The request changes shared value semantics.

It is not a standard configuration correction.

## Assessment

Existing Supplier Type values describe commercial relationship:

- standard;
- strategic;
- regulated.

`PUBLIC_SECTOR` describes legal or institutional sector.

## Decision

Do not add the value to Supplier Type.

Introduce Legal Sector as a separate attribute, initially applicable to Portugal.

## Model implementation

Create:

- Legal Sector attribute;
- Portugal contextual applicability;
- source mapping;
- reporting relationship;
- ownership.

## SAP implementation

Add the field and local validation only after the model decision is approved.

## Verification

Confirm:

- existing Supplier Type behaviour unchanged;
- public-sector reporting uses the new attribute;
- interfaces do not interpret the new field as commercial classification.

A technically simple request became a bounded model change without requiring a full implementation programme.

---

# Worked case: mandatory validation blocks a new supplier category

A new supplier category cannot provide Supplier Risk.

## Containment

Activation remains blocked. Manual review is available for urgent cases.

## Classification

Decision gap, not configuration defect.

## Decision

Determine whether:

- category remains in scope;
- another risk treatment applies;
- source enrichment is required;
- a contextual exception is justified.

## Implementation

Only after approval does AMS change configuration or workflow.

This prevents a production incident from redefining global policy.

---

# Worked case: known configuration error

A global rule for supplier organisations is incorrectly applied to persons.

## Classification

Configuration defect.

## Decision required

None. The approved model is clear.

## Route

Directly to SAP MDG configuration owner.

## Verification

- person records pass;
- organisation records remain controlled;
- no local behaviour changes.

This item should not enter a governance forum.

A lightweight process is defined partly by what it excludes.

---

# Worked case: recurring local workaround

A country asks AMS every month to load an enrichment spreadsheet containing Compliance Review Status.

## First occurrence

Operational workaround.

## Repeated pattern

Potential missing source capability or permanent contextual process.

## Model review

Determine whether:

- the status belongs in the canonical model;
- the local process should become an approved source;
- the workaround should be replaced by integration;
- the concept exists in other countries.

## Outcome

The recurring workaround is converted into either:

- governed permanent design;
- planned remediation;
- explicit retirement.

AMS stops treating the same structural issue as a new request every month.

---

# A conceptual AMS change object

```yaml
id: AMS-MODEL-CHANGE-0021
origin:
  type: incident
  reference: INC-4821

status: under_review
lane: bounded_model_change

finding:
  classification: model_ambiguity
  summary: >
    Public-sector status is being represented through Supplier Type,
    but the existing values describe commercial relationship.

affected_objects:
  - ATTR-SUPPLIER-TYPE
  - MAP-ERP-PT-SUPPLIER-TYPE
  - RULE-PT-TENDERING

containment:
  action: manual_review
  expires_on: 2026-08-15

decision:
  owner: ROLE-GLOBAL-SUPPLIER-DATA-OWNER
  recommendation: >
    Introduce Legal Sector as a separate contextual attribute.

implementation:
  itsm_change: CHG-9132
  model_proposal: PATCH-SUPPLIER-LEGAL-SECTOR-008

verification:
  required:
    - canonical_model_valid
    - local_rule_passes
    - global_supplier_type_regression_passes
```

This is a conceptual direction, not a claim about the present Martenweave schema.

It demonstrates the separation between:

- operational origin;
- model interpretation;
- decision;
- implementation;
- verification.

---

# Deterministic checks worth adding

Martenweave could validate that:

- permanent model changes reference a proposal;
- emergency changes have expiry;
- deviations link to a current owner;
- closed model changes include verification evidence;
- implementation tickets reference the approved model decision;
- global changes include impact analysis;
- local changes define explicit context;
- configuration defects do not create unnecessary semantic proposals;
- expired temporary treatments are not still active;
- a proposal cannot be approved while critical affected objects are ownerless.

The validator does not manage the service process.

It ensures that the model side of the service process is complete.

---

# What AI may safely contribute

AI can assist by:

- summarising the incident;
- finding affected model objects;
- locating similar past decisions;
- proposing classification;
- drafting the change package;
- identifying likely impact;
- suggesting missing evidence;
- drafting a `PatchProposal`.

AI should not:

- approve the change;
- classify an emergency workaround as permanent;
- invent a business owner;
- apply a direct SAP change;
- infer that repeated data means approved policy.

The current Martenweave principle remains appropriate:

> Agents propose. Validators verify. Humans approve. Git records.

---

# Indicators that the process is too heavy

The process is recreating the project when:

- every field change needs a large design board;
- the same information is copied into several templates;
- implementation teams wait for meetings despite clear approved intent;
- model owners review routine technical corrections;
- emergency containment cannot proceed safely;
- more time is spent assigning reviewers than assessing impact;
- local changes require global approval even when semantics are unchanged.

The remedy is not to remove governance.

It is to narrow governance to decisions about meaning, scope, ownership and risk.

---

# Indicators that the process is too weak

The process is under-governed when:

- incidents routinely change validation behaviour;
- new values appear without model decisions;
- temporary defaults remain after closure;
- configuration becomes the only current specification;
- service tickets close without canonical updates;
- repeated local workarounds never trigger model review;
- downstream consumers learn about changes after production release.

The remedy is not a larger committee.

It is a reliable model-change gate.

---

# The practical operating policy

A concise policy can be stated in five rules.

### Rule 1

AMS may correct implementation when approved intent is clear.

### Rule 2

AMS may contain urgent operational risk through explicit, reversible treatment.

### Rule 3

AMS may not redefine model meaning, applicability or source authority without the accountable model owner.

### Rule 4

Every permanent model change must update the canonical model and pass impact review.

### Rule 5

Every emergency or temporary change must receive a second closure for model reconciliation.

These five rules are stronger than a long process diagram that nobody follows.

---

# Final perspective

A post-go-live model-change process should not look like a smaller copy of the SAP implementation programme.

The programme existed to design and deploy a large target state.

AMS exists to maintain service while the model continues to evolve through smaller signals.

The right process is therefore selective.

It sends:

- known defects directly to implementation;
- ambiguous cases to focused investigation;
- semantic changes to the correct owner;
- material changes to broader review;
- temporary changes to controlled expiry.

SAP MDG can enforce approved data governance through governed models, attribute ownership, workflows, validated values, monitoring and auditable change.

ITSM platforms can manage the operational lifecycle of incidents, requests and releases. Change-management guidance increasingly emphasises balancing control with faster, collaborative delivery rather than using one rigid approval mechanism for every change.

Martenweave’s role is narrower:

> Preserve the connection between the operational signal, the affected model truth, the approved decision, the canonical diff and the evidence that implementation now matches it.

That is enough.

The practical test is:

> Can AMS resolve a technical correction in hours, contain an urgent model issue safely, and route a semantic change to the correct authority without rebuilding the original programme organisation?

When the answer is yes, model governance has become operational.

When the answer is no, the organisation will choose between two failures: project bureaucracy or uncontrolled support changes.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects:

- operational findings;
- canonical model objects;
- ownership;
- decisions;
- temporary deviations;
- impact analysis;
- reviewable proposals;
- implementation evidence.

It does not replace SAP MDG, ITSM platforms, workflow systems or AMS delivery.

Its purpose is to ensure that operational changes do not become undocumented changes to model truth.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer with one governed model, preserved semantics and relationships, attribute ownership, validated values, collaborative workflow routing, business-rule monitoring, continuous data-quality capabilities and auditable changes.

Atlassian’s current change-management guidance argues for change enablement that balances governance with faster, collaborative delivery and avoids relying on one rigid, approval-heavy mechanism for every change.

Martenweave Core currently defines canonical Markdown and YAML files as the source of truth, rebuildable generated indexes, deterministic validation and a proposal-first workflow in which AI does not silently mutate approved model state.

The current documented pipeline connects evidence, proposals, validation, gap and impact analysis, human review and GitHub issue or pull-request output. Martenweave explicitly does not position itself as a generic workflow engine, hosted MDM platform or direct SAP write-back system.

Its current command set includes validation, health, scorecards, ownership reporting, gap analysis, dataset readiness, trace, impact, model diffs, reviewable patch proposals, local API and MCP integration.

Martenweave is independent and is not affiliated with or endorsed by SAP, Atlassian or other vendors named in this article. Product names and trademarks belong to their respective owners.
