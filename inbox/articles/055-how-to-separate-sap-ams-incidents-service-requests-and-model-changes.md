# How to Separate SAP AMS Incidents, Service Requests and Model Changes Without Losing Traceability

**Reviewed: 14 July 2026**

A user reports that a supplier cannot be activated in SAP.

The service desk creates an incident.

The AMS analyst finds that Supplier Risk is blank and asks the business to provide a value.

The business replies:

> This new supplier category should not require Supplier Risk.

The incident now contains two different questions:

1. How should service be restored for the blocked supplier?
2. Should the Supplier Risk rule apply to this category at all?

The first question belongs to incident management.

The second is a model decision.

A third question may also appear:

> Can the business request a controlled review process for this supplier category?

That may become a service request once the service and approval path are defined.

If all three questions remain inside one incident ticket, several outcomes are likely:

- the analyst changes validation to resolve the incident;
- the business request is implemented as an informal workaround;
- the ticket closes after activation succeeds;
- no canonical model decision is recorded;
- the same question returns with the next supplier.

The incident was resolved.

The model was changed without admitting that a model change occurred.

> Traceability is not achieved by putting every discussion in one ticket. It is achieved by preserving explicit relationships between different kinds of work.

An effective AMS operating model should distinguish:

- an unplanned service failure;
- a request for a known service;
- a proposed change to model truth;
- the technical change required to implement an approved decision.

These records should remain linked.

They should not be collapsed into one workflow.

---

# Three envelopes

A useful way to understand the distinction is to imagine three envelopes arriving at the AMS team.

## Envelope 1: Something is not working

Examples:

- supplier activation fails;
- an interface rejects records;
- replication stops;
- a validation behaves incorrectly;
- a workflow sends the request to the wrong team;
- users cannot maintain an approved value.

This is an incident candidate.

The immediate purpose is to restore expected service or reduce operational impact.

Atlassian defines incident management around responding to an unplanned interruption or reduction in service quality and restoring the service to its operational state. It distinguishes the incident from the underlying problem that may be causing repeated incidents.

ServiceNow similarly positions incident management around tracking and resolving issues, restoring services and routing incidents to appropriate support groups.

## Envelope 2: A user wants a known service

Examples:

- create a new approved value;
- onboard a supplier through an existing process;
- request a mass correction;
- add an authorised local mapping;
- request a standard report;
- assign an approved role.

This is a service-request candidate.

The required service already exists, and the organisation knows:

- who may request it;
- what information is needed;
- who approves it;
- how it is fulfilled;
- what result is expected.

Atlassian describes service-request management as a distinct workstream used to standardise how organisations receive, coordinate and fulfil requests.

ServiceNow similarly positions request management around published services, request workflows, approvals and service-level commitments.

## Envelope 3: The organisation may need a different model

Examples:

- a new attribute is proposed;
- a mandatory rule should become contextual;
- a source should become authoritative;
- a value list needs another semantic dimension;
- a temporary exception should become permanent;
- a local concept should become global;
- two rules conflict.

This is a model-change candidate.

Its purpose is not to restore a service or fulfil a predefined request.

Its purpose is to determine whether approved model truth should change.

This third envelope is often missing from ordinary AMS operating models.

As a result, incidents and service requests become informal containers for design decisions.

---

# The three records answer different questions

The distinction becomes clearer when each record is expressed as a question.

## Incident

> What stopped working, what is the impact, and how do we restore expected service?

## Service request

> Which predefined service does the user need, and how do we fulfil it under the approved process?

## Model change

> Which definition, rule, mapping, source, context or ownership relationship should become different?

These questions have different closure conditions.

An incident may close when service is restored.

A service request may close when the requested outcome is delivered.

A model change may close only after:

- a decision is approved;
- canonical model state is updated;
- impact is assessed;
- implementations are aligned;
- evidence confirms the new state.

Closing one record does not automatically close the others.

---

# One business event may create several linked records

Consider the blocked supplier again.

## Incident

```text
INC-4821

Symptom:
Supplier cannot be activated.

Immediate cause:
Supplier Risk is blank.

Impact:
Urgent supplier onboarding is blocked.
```

## Temporary containment

```text
Record remains blocked.
Business review is initiated.
No default value is created.
```

## Model finding

```text
FIND-017

Question:
Does the Supplier Risk rule apply to the new supplier category?

Current model:
Supplier Risk is required for active strategic suppliers.

Uncertainty:
The new category has not been classified as strategic or non-strategic.
```

## Model decision

```text
DEC-029

Decision:
The new category remains subject to Supplier Risk.

Treatment:
Introduce controlled review before activation.

No semantic exception is approved.
```

## Service request

Once the process is defined:

```text
REQ-SUPPLIER-RISK-REVIEW

Service:
Request risk assessment for a supplier without final classification.

Approver:
Supplier Risk Owner.

Outcome:
Approved risk value or rejected activation.
```

## Implementation change

```text
CHG-9132

Implement:
- review status;
- workflow;
- activation control;
- operational notifications.
```

The incident, request, decision and change remain related.

None of them needs to contain the complete history of every other record.

---

# Incident status must not become model status

An incident commonly uses statuses such as:

- New;
- In progress;
- Resolved;
- Closed.

These statuses describe service restoration.

They should not be used to infer that a model question is resolved.

Example:

```text
Incident:
Resolved

Service:
Supplier activated through approved temporary review.

Model finding:
Still open

Permanent question:
Should the review treatment become a standard service?
```

The service may be restored while the structural issue remains.

This is not a failure of incident management.

It becomes a failure only when the organisation treats incident closure as proof that the model no longer needs attention.

---

# Service requests should be repetitive by design

A service request is useful when the organisation wants the same kind of work to happen consistently.

For example:

> Request addition of an already approved local value to a country-specific list.

A mature request definition can specify:

- permitted requester;
- required evidence;
- applicable context;
- approval role;
- implementation steps;
- expected completion;
- validation.

A service request should not ask the fulfiller to invent policy.

Weak request:

```text
Please add PUBLIC_SECTOR to Supplier Type.
```

Stronger request:

```text
Please implement approved value PUBLIC_SECTOR
under Legal Sector for Portugal.

Decision:
DEC-LEGAL-SECTOR-014

Approved scope:
Country = PT

Required implementation:
SAP field, source mapping and reporting.
```

The second request fulfils an approved change.

The first asks the fulfiller to decide whether the model should change.

---

# Model changes begin where the catalogue ends

A request catalogue can standardise known services.

It cannot safely predefine every future model question.

A model-change process is required when the requester asks for something that the current catalogue cannot fulfil without changing:

- semantics;
- applicability;
- value identity;
- granularity;
- cardinality;
- ownership;
- source authority;
- lifecycle;
- permanent exception policy.

Examples:

| User wording | Actual work type |
|---|---|
| Add a value | Possibly a model change |
| Make field optional | Rule applicability decision |
| Copy value from source field | Semantic mapping decision |
| Create local exception | Contextual model decision |
| Fix validation | Incident or configuration defect |
| Add another approval | Possibly service or model change |
| Upload corrected values | Service request or remediation |

The wording of the request does not determine the work type.

Classification does.

---

# The branching point

Every AMS intake should include one branching question:

> Can this work be completed without changing approved model meaning or policy?

When yes, continue through incident, request or implementation-change handling.

When no or uncertain, create a linked model finding.

A compact decision tree is enough.

```text
Is service unexpectedly degraded?
    Yes → incident

Is the requested outcome already approved and repeatable?
    Yes → service request

Does delivery require changing meaning, applicability,
source authority, values or ownership?
    Yes or uncertain → model finding/change proposal

Does approved implementation need technical deployment?
    Yes → implementation change
```

The branches are not mutually exclusive.

An incident may lead to a model finding and an implementation change.

A service request may require an implementation change.

A model decision may create a new future service request.

---

# Preserve the operational origin

When a model finding is created from an incident, do not remove the incident context.

The finding should record:

- originating ticket;
- observed symptom;
- affected service;
- affected records;
- operational impact;
- containment;
- current SLA or business deadline.

This matters because the same model issue may appear through several incidents.

For example:

```text
FIND-SUPPLIER-REVIEW-001
├── INC-4821: supplier activation blocked
├── INC-4930: interface rejected supplier
├── INC-5014: local team applied manual default
└── REQ-2088: request to add UNDER_REVIEW value
```

The finding shows that apparently separate tickets share one underlying model problem.

This is where AMS begins to generate model intelligence rather than only close individual cases.

---

# Preserve the model origin in operational work

Traceability must work in the other direction too.

An incident or request involving governed data should reference:

- canonical object;
- rule;
- mapping;
- source;
- active decision;
- model baseline.

Example:

```text
Affected attribute:
ATTR-SUPPLIER-RISK

Effective rule:
RULE-SUPPLIER-RISK-ACTIVATION

Implementation:
SAP MDG validation Z_SUPP_RISK_04

Current decision:
DEC-SUPPLIER-RISK-017

Model baseline:
supplier-model-v3.4
```

The AMS analyst should not need to identify the governing model from field labels and custom code.

---

# The four closures

A complex AMS case may require four separate closures.

## Service closure

The user can continue working or the operational impact is contained.

## Request closure

The approved service has been delivered.

## Technical-change closure

The planned implementation has been deployed and verified.

## Model closure

The canonical model, decision, ownership and implementation evidence agree.

For a simple incident, only the first may be needed.

For a model-driven incident, all four may be relevant.

This prevents a common false state:

```text
Incident closed
Change deployed
Model documentation still obsolete
Temporary workaround still active
```

Operational success should not conceal model debt.

---

# A model change should not inherit the incident SLA blindly

Incidents are often urgent.

Model decisions may require evidence and accountable review.

Applying the incident SLA directly to the permanent model decision creates pressure to approve weak changes.

The organisation needs two clocks.

## Restoration clock

How quickly must service impact be reduced?

## Governance clock

By when must the permanent decision be made?

Example:

```text
Operational containment:
Within four hours

Permanent model decision:
Within ten business days

Temporary treatment expiry:
Fifteen business days
```

The exact durations are organisation-specific.

The principle is to separate immediate containment from permanent meaning.

---

# A service request should not become a back door around governance

Users learn which request types produce fast results.

They may submit:

> Update reference data

when the real request is:

> Create a new classification concept.

The service team should be allowed to reject or reroute requests that exceed the approved service definition.

A request catalogue item should specify its semantic boundary.

Example:

```text
Service:
Add approved local reference value

Permitted:
- value already approved;
- existing classification dimension;
- explicit country context;
- current owner.

Not permitted:
- new classification dimension;
- global value;
- change to meaning;
- change to applicability.
```

This protects both the service team and the model.

---

# A model change should not become another ITSM megaworkflow

The solution is not to add dozens of model-governance states to the incident system.

A model finding needs only a small lifecycle:

```text
Observed
→ Classified
→ Decision required
→ Approved or rejected
→ Implementing
→ Verified
→ Closed
```

Some organisations may need additional states, but the process should remain smaller than a full project lifecycle.

The model record should preserve:

- question;
- current state;
- evidence;
- scope;
- decision;
- impact;
- verification.

The ITSM platform can continue to manage operational work.

---

# The role of problem management

Repeated incidents may indicate a shared underlying cause.

Atlassian’s incident-management guidance distinguishes incidents from problems and supports linking multiple incident records to a larger problem record. It also describes post-incident reviews as a way to feed longer-term fixes back into planning.

For SAP AMS, problem management can serve as an intermediate layer.

Example:

```text
Incidents:
Several supplier activations fail.

Problem:
Supplier Risk process does not cover the new supplier category.

Model finding:
Applicability and lifecycle are undefined.
```

The problem record investigates recurrence and operational cause.

The model finding determines whether model truth should change.

These may be linked but remain distinct.

A problem is not automatically a model defect.

It may ultimately reveal:

- source weakness;
- training issue;
- incorrect configuration;
- model ambiguity;
- poor operational procedure.

---

# The role of implementation change management

Once a model decision is approved, technical delivery may require a formal change record.

ServiceNow positions change management around tailored change models, approval policies, risk assessment, scheduling, impact visibility and controlled deployment.

That is the appropriate place to govern:

- transport;
- deployment window;
- technical risk;
- rollback;
- conflicts;
- release dependency.

The model record should not replicate those details.

It should provide:

- approved target behaviour;
- affected objects;
- semantic impact;
- required verification.

The change record governs how the implementation enters production.

---

# Semantic impact and operational impact are separate

A useful routing matrix has two axes.

| Semantic impact | Operational impact | Example | Required control |
|---|---|---|---|
| Low | Low | Correct label | Standard request/change |
| Low | High | Replace broken interface | Incident and technical change |
| High | Low | Add one global value | Model approval |
| High | High | Change global cardinality | Model and technical governance |

The number of configuration lines is not a measure of semantic impact.

Adding one value can be more significant than replacing an entire technical component.

The model process governs semantic impact.

The ITSM process governs operational implementation impact.

---

# Worked case: validation is incorrectly global

A Portuguese validation applies to all countries.

## Incident

German suppliers cannot be activated.

## Investigation

The approved decision states that the validation is Portugal-specific.

## Classification

Configuration defect.

## Model change

None.

## Technical change

Restrict SAP validation to Portugal.

## Closure

- service restored;
- configuration corrected;
- global regression passed;
- existing model remains unchanged.

Creating a new model proposal would add unnecessary bureaucracy.

---

# Worked case: local team requests a new value

The request says:

> Add `UNDER_REVIEW` to Supplier Risk.

## Service request

Rejected as outside the permitted value-maintenance service.

## Model finding

`UNDER_REVIEW` appears to represent workflow status rather than final risk classification.

## Decision

Create Supplier Review Status as a separate concept.

## Technical changes

- SAP field and workflow;
- migration treatment;
- reporting;
- interface mapping.

## Future service request

After implementation, the business may use a standard request to initiate supplier review.

The original request did not simply fulfil a service.

It revealed a missing model concept.

---

# Worked case: urgent supplier onboarding

A critical supplier lacks a final classification.

## Incident

Business operation is blocked.

## Containment

Manual expedited review is initiated. Activation remains blocked until approval.

## Service request

Expedited risk review may already be a defined service.

## Model change

None when the existing rule and service cover the situation.

The presence of urgency does not automatically justify a model exception.

---

# Worked case: repeated manual enrichment

Every month, AMS receives a spreadsheet to populate a local status.

## Service requests

Each upload is processed successfully.

## Problem

The recurring service creates operational effort and risk.

## Model finding

The status may represent a persistent contextual concept and source relationship.

## Decision

Either:

- formalise it as an approved local source and service;
- integrate the process;
- retire the status;
- replace it with a global concept.

The service requests remain valid evidence.

They should not remain the permanent design.

---

# The minimum relationship model

Martenweave does not need to become an ITSM database.

It needs stable references.

A model finding could store:

```yaml
id: FIND-SUPPLIER-RISK-017
origin:
  incidents:
    - INC-4821
    - INC-4930
  requests:
    - REQ-2088
  problems:
    - PRB-0142

affected_objects:
  - ATTR-SUPPLIER-RISK
  - RULE-SUPPLIER-RISK-ACTIVATION

decision:
  - DEC-SUPPLIER-REVIEW-029

implementation_changes:
  - CHG-9132

verification:
  - TEST-SUPPLIER-REVIEW-044
```

This is a conceptual direction, not a claim about the current Martenweave schema.

The external records remain in their operational systems.

Martenweave preserves the model-level chain.

---

# One chain, several systems of record

A sensible division is:

## ITSM system

Authoritative for:

- incident status;
- request fulfilment;
- problem investigation;
- implementation change;
- SLA;
- operational communication.

## Martenweave

Authoritative for:

- canonical model objects;
- model findings;
- decision context;
- semantic impact;
- proposal;
- model verification.

## SAP MDG or another MDM platform

Authoritative for:

- operational master-data workflow;
- configured rules;
- approved master-data changes;
- activation;
- data-quality execution where implemented.

SAP describes MDG as supporting governed models, preserved semantics and relationships, validated values, attribute ownership, collaborative workflows and quality monitoring.

## Git

Authoritative for:

- exact canonical diff;
- review history;
- approved model baseline.

Martenweave’s current core explicitly treats canonical Markdown and YAML files as the source of truth, generated indexes as rebuildable, and AI-produced changes as reviewable proposals rather than silent mutations.

---

# Do not duplicate operational data unnecessarily

Martenweave does not need to copy:

- every incident comment;
- SLA calculations;
- user communications;
- assignment history;
- change calendar;
- work notes.

It needs enough evidence to retain model context:

- external ID;
- record type;
- title or summary;
- current status where imported;
- relevant excerpt or evidence;
- relationship to canonical objects;
- link to the source system.

The integration principle is:

> Reference operational work. Preserve model meaning.

This keeps Martenweave backend-first and prevents it from becoming another service-management platform.

The core currently positions itself as a model-governance pipeline rather than a generic workflow engine or hosted MDM product.

---

# When an incident should create a model finding

Not every incident requires model governance.

Create a model finding when at least one of these is true:

- approved intent is unclear;
- the same issue recurs;
- containment changes model behaviour;
- a new value, rule or attribute is proposed;
- local and global rules conflict;
- current configuration may be correct but business outcome is disputed;
- a temporary workaround may become permanent;
- several systems implement different interpretations;
- the incident exposes an ownerless critical concept.

A normal technical incident should remain a normal technical incident.

That boundary is essential to keeping the model process lightweight.

---

# When a service request should create a model finding

Create a linked finding when fulfilment would require:

- an unapproved value;
- a new semantic attribute;
- a new source relationship;
- a change to mandatory applicability;
- a new permanent exception;
- a change to global or local inheritance;
- a choice between several plausible mappings.

Do not ask service agents to decide these questions inside fulfilment comments.

---

# When a model finding should create a service request

After a model decision is approved, it may define a new repeatable service.

Examples:

- request supplier risk review;
- request local regulatory classification;
- request approved value extension;
- request source-authority reassessment;
- request exception renewal.

The service catalogue should evolve from governed decisions.

It should not evolve from accumulated workarounds.

---

# Traceability across closure

The key relationship should remain queryable after every operational ticket closes.

A future analyst should be able to ask:

- Which incidents led to this rule change?
- Which decision authorised this value?
- Which technical change implemented it?
- Which service request now operationalises the process?
- Which model objects were affected?
- Which test evidence proved alignment?
- Is the original temporary containment still active?

This is more valuable than retaining one enormous ticket.

---

# Reporting without double counting

Linked records create a reporting risk.

One underlying problem may appear as:

- five incidents;
- one problem;
- one model finding;
- one decision;
- three technical changes;
- one new service request.

These are not eleven independent business problems.

Reports should distinguish:

## Operational volume

How many incidents and requests occurred?

## Structural findings

How many distinct model questions were identified?

## Decisions

How many changes to model truth were approved?

## Implementations

How many technical changes were required?

## Recurrence

Did the operational volume fall after the structural treatment?

This prevents management from interpreting every linked record as another unique defect.

---

# Deterministic checks Martenweave could add

A focused integration layer could validate that:

- every permanent model change references a finding or explicit rationale;
- findings created from incidents preserve the origin reference;
- service requests cannot implement unapproved values where policy requires approval;
- temporary containment has expiry;
- closed findings reference verification;
- external changes identify the approved decision;
- repeated incidents can be grouped under one finding;
- implementation changes reference the affected canonical objects;
- model updates do not claim that external ITSM records are closed unless status evidence is available.

These checks improve traceability without reproducing ITSM workflows.

---

# What AI may assist with

AI can help:

- summarise incident evidence;
- identify likely canonical objects;
- detect repeated tickets describing the same model question;
- suggest whether a request exceeds the current service definition;
- draft a model finding;
- propose links between incident, decision and implementation change;
- identify missing closure evidence.

AI should not decide that:

- a service request is authorised;
- an incident justifies permanent exception;
- a repeated workaround is approved policy;
- a model change is complete because the operational ticket is closed.

The current Martenweave principle remains appropriate:

> Agents propose. Validators verify. Humans approve. Git records.

---

# An operating policy in six lines

A practical organisation can state the policy simply.

### 1. Incidents restore expected service.

They may use reversible containment but do not redefine model truth.

### 2. Service requests fulfil approved, repeatable services.

They do not invent new semantics.

### 3. Model findings capture unresolved questions about meaning, scope, ownership or source authority.

### 4. Model decisions approve or reject changes to canonical truth.

### 5. Implementation changes deploy approved behaviour.

### 6. Every record remains linked to the evidence chain that created it.

This is enough to establish a strong separation.

The details can be adapted to the organisation’s ITSM platform.

---

# Final perspective

The mistake is not using incidents, requests or technical changes.

The mistake is expecting one of them to carry every kind of truth.

An incident is designed to restore service.

A service request is designed to fulfil an approved service.

A technical change is designed to deploy controlled implementation.

A model change is designed to alter or confirm meaning.

These records belong to the same operational story but answer different questions.

ServiceNow and Jira Service Management both distinguish incident, request and change-oriented workflows because each has a different operational purpose. ServiceNow presents incident management around service restoration, request management around published services and fulfilment, and change management around controlled changes, risk and approval.

Martenweave should not replace those workflows.

Its role is to preserve the missing semantic chain:

> Operational signal → model finding → decision → canonical diff → implementation → verification.

The practical test is:

> Can the organisation close an incident without losing the unresolved model question, fulfil a service request without granting it design authority, and implement a model decision without copying the complete ITSM workflow into the model registry?

When the answer is yes, operational efficiency and model governance can coexist.

When the answer is no, the organisation will either overload its service desk with architecture work or continue changing model truth through closed support tickets.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects:

- incidents and requests;
- model findings;
- canonical rules and mappings;
- decisions;
- implementation changes;
- impact;
- verification evidence;
- Git-recorded model state.

It does not replace ITSM platforms, SAP MDG, service catalogues or change-management systems.

Its purpose is to keep model truth traceable while operational work moves through the systems already designed to manage it.

## Sources and notes

This article was reviewed on 14 July 2026.

Atlassian defines incident management as the practice of responding to unplanned service interruptions or reductions in service quality and restoring the service to its operational state. Its guidance also distinguishes incidents from underlying problems and supports post-incident reviews and linked problem records.

Atlassian describes service-request management as a distinct workstream for standardising the intake, coordination and fulfilment of customer or employee requests through defined workflows, approvals, queues and service-level targets.

ServiceNow positions Incident Management around service restoration and issue resolution, Request Management around published services and automated fulfilment, and Change Management around differentiated change models, approval policies, risk assessment, scheduling and impact visibility.

SAP currently describes SAP Master Data Governance as providing a governed model across business entities while preserving semantics and relationships.

Martenweave Core currently uses canonical model files, deterministic validation, rebuildable generated indexes and proposal-first changes requiring human review.

Its documented pipeline connects evidence, proposals, validation, gap and impact analysis, human review and GitHub issue or pull-request output, while explicitly avoiding the role of a generic workflow engine or direct SAP write-back platform.

Martenweave is independent and is not affiliated with or endorsed by SAP, ServiceNow, Atlassian or other vendors named in this article. Product names and trademarks belong to their respective owners.
