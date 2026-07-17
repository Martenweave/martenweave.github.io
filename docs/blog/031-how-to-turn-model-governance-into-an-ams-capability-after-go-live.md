# How to Turn Model Governance into an AMS Capability After Go-Live

**Reviewed: 14 July 2026**

The implementation programme has ended.

SAP MDG is live. The migration team has completed cutover. The project repository contains mapping workbooks, design documents, test evidence and decision logs. The main implementation partner has reduced its team.

Responsibility moves to Application Management Services.

During the first months, support incidents appear:

- a validation blocks a legitimate local case;
- an interface rejects a newly introduced value;
- a migrated record contains an unexplained default;
- a country requests another attribute;
- a workflow routes requests to an outdated role;
- a source system changes the meaning of a field;
- a business owner asks why a rule exists.

AMS resolves each ticket.

Configuration is corrected. A mapping spreadsheet is updated. A workaround is added to the knowledge base. The ticket closes.

Six months later, the model has changed in several places.

No one has updated the complete model baseline.

The project had model governance.

AMS has ticket management.

This is one of the most common ways implementation knowledge begins to disappear after go-live.

The system remains operational. Individual incidents are resolved. But each change gradually separates:

- approved business meaning;
- SAP configuration;
- integration behaviour;
- migration history;
- documentation;
- support knowledge.

The problem is not that AMS is performing badly.

The operating model has defined support as restoring service rather than maintaining model truth.

> Model governance becomes an AMS capability when every material incident and change is reconciled back into the approved model—not merely resolved in the operational system.

That requires more than handing project documents to support.

It requires a repeatable process for understanding, proposing, validating, approving and preserving model changes throughout the operational lifecycle.

## Go-live does not stabilise the model permanently

Projects often treat the production release as the point at which the model becomes complete.

In reality, go-live exposes the model to new evidence.

The organisation begins learning from:

- real user behaviour;
- production data;
- new countries;
- additional interfaces;
- regulatory changes;
- acquisitions;
- process redesign;
- source-system replacement;
- data-quality incidents;
- support tickets.

Some incidents reveal implementation defects.

Others reveal that the approved model was incomplete, ambiguous or based on assumptions that no longer hold.

For example:

- a mandatory rule may be too broad;
- a value list may not support a legitimate business case;
- a source mapping may lose reliability;
- a local exception may need promotion into the global model;
- a temporary migration default may remain in active records;
- an attribute may be used differently by downstream systems.

AMS therefore does not merely maintain configuration.

It continuously receives evidence about the model.

## SAP MDG remains the operational governance platform

SAP currently positions SAP Master Data Governance as a central governance layer combining master data, policy and metadata. Its capabilities include governed models, golden records, matching and consolidation, collaborative workflows, validated values, monitored business rules, data-quality management and auditable data changes.

These capabilities remain central after go-live.

SAP MDG should continue to govern:

- operational master-data creation and maintenance;
- change-request processing;
- workflow routing;
- validations and derivations;
- stewardship;
- activation;
- matching and consolidation where implemented;
- monitoring of operational data quality;
- audit of governed record changes.

The missing AMS capability is not another operational master-data system.

It is the ability to maintain the implementation knowledge explaining:

- what the governed model means;
- why the rules have their current form;
- which systems supply and consume each attribute;
- which local differences are approved;
- what a change will affect;
- which evidence supports the new state.

## AMS usually manages symptoms before it manages model causes

A support ticket begins with an observed problem.

For example:

> Supplier cannot be activated because classification is missing.

The immediate investigation may identify:

- validation rule fired;
- record is missing a value;
- user cannot maintain the field;
- source interface did not send it.

The operational fix might be:

- correct the authorisation;
- populate the value;
- adjust the interface;
- change the validation.

The model questions are broader:

- Is the classification genuinely mandatory for this supplier type?
- Which source should provide it?
- Does the rule apply globally?
- Is the field available at the correct organisational level?
- Which workflow depends on it?
- Are other records affected?
- Does the approved model match current configuration?

Closing the ticket without answering these questions may restore one process while preserving the underlying inconsistency.

## Classify tickets by model significance

Not every incident requires a model change.

A practical AMS process should classify each relevant ticket.

## 1. Data correction

The model and configuration are correct. One or more records contain bad data.

Example:

- user entered an invalid identifier before a rule was activated;
- migrated record contains a one-off error;
- source system sent a corrupt value.

Required action:

- correct the records;
- investigate repeated source failure if necessary;
- leave the model unchanged.

## 2. Configuration defect

The approved model is correct, but SAP implementation does not match it.

Example:

- rule applies to persons instead of organisations;
- local value is active globally;
- workflow uses the wrong approval role.

Required action:

- correct configuration;
- verify behaviour;
- preserve evidence that configuration now matches the approved model.

## 3. Mapping or integration defect

The model is correct, but an interface or migration treatment implements it incorrectly.

Example:

- wrong source field;
- incomplete code conversion;
- outbound message omits an attribute.

Required action:

- correct mapping or integration;
- update tests and implementation evidence;
- leave semantic model unchanged unless the investigation reveals a design issue.

## 4. Documentation defect

The operational model is correct, but maintained guidance is stale or ambiguous.

Required action:

- correct documentation or generated views;
- link them to the current model baseline.

## 5. Model ambiguity

The current approved model does not answer the operational question clearly.

Example:

- “active suppliers” is not defined precisely;
- a value has unclear semantics;
- precedence between global and local rules is missing.

Required action:

- create a model clarification proposal;
- obtain responsible-owner approval;
- update the canonical model and implementation where necessary.

## 6. Model change

Business requirements, regulation or operating conditions have changed.

Example:

- new local identifier;
- new supplier-risk category;
- revised ownership;
- source-system replacement;
- retired attribute.

Required action:

- run formal impact analysis;
- create a controlled change proposal;
- implement only after approval.

## 7. Accepted operational deviation

The system intentionally differs from the target model for a limited period.

Example:

- warning used instead of blocking error;
- temporary value remains until remediation;
- one interface cannot consume the new attribute until the next release.

Required action:

- record owner, reason, risk and expiry;
- continue reporting the deviation until resolved.

This classification prevents every ticket from becoming either “just data” or “change the system.”

## A ticket should not become the permanent model record

Service-management systems are designed to track work:

- incident status;
- priority;
- assignment;
- response time;
- resolution;
- communication.

They are not naturally organised around the long-term lifecycle of model objects.

A ticket may contain the full history of a difficult decision.

After closure, future users usually start from the attribute or rule—not from the ticket number.

A stronger lifecycle is:

```text
Incident or request
→ model significance classified
→ affected model objects identified
→ evidence gathered
→ correction or proposal processed
→ canonical model reconciled
→ implementation verified
→ ticket closed
```

The ticket keeps the support history.

The model keeps the approved operational truth.

## Establish a maintained operational baseline

AMS needs an identifiable model baseline.

It should include current:

- entities;
- attributes;
- contexts;
- endpoints;
- mappings;
- value lists;
- rules;
- ownership;
- local variations;
- decisions;
- known deviations.

The baseline must be distinguishable from:

- the original go-live design;
- proposed future state;
- historical migration model;
- previous release configuration.

For example:

```text
Operational model baseline:
BP-AMS-2.4

Effective release:
September 2026

Applicable countries:
DE, AT, PT

Open approved deviations:
3

Supersedes:
BP-GOLIVE-1.9
```

Without an operational baseline, support teams may continue using project documentation that no longer describes production.

## Reconcile three states

After go-live, AMS should compare three states.

## Approved model

What the organisation has authorised.

## Configured model

What SAP MDG and related systems implement.

## Observed behaviour

What users, records and integrations actually experience.

These can diverge.

| Object | Approved model | Configuration | Observed behaviour |
|---|---|---|---|
| Supplier risk | Mandatory for active suppliers | Rule configured | Also blocks inactive suppliers |
| Local tax value | Portugal only | Portugal context configured | Correct |
| Payment terms | Company-code level | Company-code field | Source sends one global value |
| Temporary status | Migration only | Still active | Users continue assigning it |

The AMS task is not only to fix observed behaviour.

It is to reconcile all three states.

## Make model reconciliation part of ticket closure

A material AMS ticket should not close until the team has answered:

1. Which model object was affected?
2. Was the approved model correct?
3. Was configuration aligned?
4. Did observed data reveal another issue?
5. Was a decision or deviation created?
6. Were related tests updated?
7. Does the operational baseline now reflect the result?

This does not need to burden every minor incident.

Apply it to changes affecting:

- critical attributes;
- validations;
- mappings;
- value lists;
- workflow;
- global and local behaviour;
- interfaces;
- ownership;
- high-volume data populations.

## Use stable identifiers in support work

A ticket title such as:

> Customer group issue

is too ambiguous.

The issue should identify relevant objects:

```text
Attribute:
ATTR-CUST-SALES-CUSTOMER-GROUP

Rule:
RULE-CUST-GROUP-MANDATORY-DE

Mapping:
MAP-CRM-A-CUST-GROUP

Target endpoint:
FEP-S4-KNVV-KDGRP
```

Stable identifiers help connect:

- incident;
- model;
- configuration;
- tests;
- decision;
- release.

Users do not need to memorise the identifiers.

They give the support process a reliable internal reference.

## Maintain source and target lineage after migration

Projects often stop maintaining migration mappings after cutover.

This is a mistake when migrated data continues influencing operations.

AMS may need to answer:

- Why does this record contain this value?
- Was it migrated or operationally maintained?
- Which source field produced it?
- Was a default used?
- Which value list applied at the time?
- Does the original source still exist?

Historical lineage remains valuable for:

- incident investigation;
- remediation;
- audit;
- data correction;
- later migration waves;
- source-system retirement.

The lineage can be marked historical without being deleted.

```text
Historical migration source
→ migration mapping
→ target attribute
→ operational rule
```

This allows AMS to separate migration defects from current operational behaviour.

## Treat recurring incidents as model evidence

One incident may be a data error.

Twenty similar incidents may indicate:

- wrong model optionality;
- unclear process ownership;
- unreliable source;
- poor value semantics;
- incorrect workflow;
- incomplete training;
- missing automation.

AMS should aggregate incidents by model object.

For example:

```text
ATTR-SUPPLIER-RISK

Incidents this quarter:
27

Main causes:
- 14 missing source values
- 8 incorrect local default
- 5 authorisation failures
```

This view is more useful than a list of unrelated ticket numbers.

It may support a model change such as:

- revise source responsibility;
- introduce a controlled temporary state;
- narrow the mandatory rule;
- change the maintenance process.

## Track operational model debt

Some post-go-live gaps cannot be resolved immediately.

Examples:

- source remediation postponed;
- local interface remains on old value list;
- manual enrichment continues;
- temporary default remains active;
- configuration differs from the target model.

These should become visible model debt.

For each item, record:

- affected object;
- current state;
- intended state;
- operational consequence;
- owner;
- due date;
- review trigger;
- related incidents.

Model debt differs from generic technical debt because it concerns the meaning and governance of business data.

A workaround may function technically while weakening the approved model.

## Temporary values require aggressive governance

Migration and early support often introduce values such as:

- UNKNOWN;
- TO_BE_REVIEWED;
- MIGRATION_DEFAULT;
- NOT_AVAILABLE.

These values are operationally dangerous because they can appear valid.

AMS should know:

- which records contain them;
- whether users may assign them;
- which processes consume them;
- who owns remediation;
- when they expire.

A temporary value should have a lifecycle:

```text
Introduced
→ restricted
→ monitored
→ remediated
→ blocked for new use
→ retired
```

Without this control, temporary migration logic becomes permanent master-data policy.

## Revalidate decisions when their conditions change

Many project decisions are conditional.

For example:

> Payment Terms may be defaulted until ERP_B provides the source field.

When ERP_B is replaced or enhanced, AMS should review the decision.

Useful review triggers include:

- source-system replacement;
- new country rollout;
- regulatory change;
- large incident volume;
- remediation completion;
- integration redesign;
- ownership change.

A decision without a review trigger tends to survive longer than its rationale.

## Build a model change calendar

Operational model governance should have a regular cadence.

A practical calendar might include:

### Weekly

- classify new model-significant tickets;
- review blockers;
- identify urgent proposals.

### Monthly

- review material model changes;
- inspect recurring incidents;
- assess model debt and temporary deviations;
- approve low- and medium-risk changes.

### Quarterly

- review ownership;
- review temporary values and exceptions;
- analyse model-health trends;
- inspect high-impact changes;
- confirm critical lineage and test freshness.

### Per release

- establish model baseline;
- validate references;
- compare configuration;
- update impact and regression scope;
- publish release change summary.

### Annually

- review domain scope;
- retire obsolete objects;
- confirm governance roles;
- assess whether operational support still matches business needs.

The cadence should remain proportional to actual change volume.

## Define change classes

Not every model change requires the same governance.

## Class 1: documentation correction

Examples:

- typo;
- clearer description;
- additional alias.

Approval:

- model owner or maintainer.

## Class 2: implementation correction

The approved meaning does not change.

Examples:

- fix wrong mapping;
- correct configuration context;
- restore missing interface field.

Approval:

- relevant technical owners;
- business confirmation where behaviour changes.

## Class 3: bounded model change

Examples:

- add local value;
- revise mapping;
- change ownership;
- introduce a contextual exception.

Approval:

- business owner;
- architecture or domain owner;
- affected local owner.

## Class 4: material model change

Examples:

- change global definition;
- introduce or retire a critical attribute;
- change identifier strategy;
- make field globally mandatory;
- alter significant workflow authority.

Approval:

- formal governance authority;
- architecture;
- affected business owners;
- implementation and testing plan.

This keeps governance efficient without making major changes informal.

## Connect each change to regression evidence

A change should identify which tests become stale.

For example:

```text
Change:
Add supplier-risk value UNDER_REVIEW.

Affected tests:
- value-help test
- validation test
- workflow-routing test
- outbound interface test
- reporting test
```

After implementation, new evidence should be linked to the current model baseline.

This prevents AMS from relying on project tests that proved an older state.

## Generate release notes from model changes

Traditional release notes often list technical transports or ticket titles.

A model-aware release note can explain:

- attribute changed;
- previous state;
- new state;
- applicable context;
- reason;
- affected processes;
- required user action;
- related decision.

Example:

```text
Supplier Risk Classification

Change:
Added local value UNDER_REVIEW for Portugal.

Reason:
Support controlled investigation before final classification.

Restriction:
Not available outside Portugal.
Cannot be used for fully approved suppliers.

Affected areas:
Workflow, outbound supplier interface and quality report.
```

This is more useful for business owners and AMS teams than a list of configuration objects.

## Preserve negative decisions

AMS regularly receives requests that should not be implemented.

Examples:

- reuse an existing field for another meaning;
- introduce a local duplicate of a global value;
- make a critical field optional to reduce incidents;
- retain a temporary default indefinitely.

Rejected requests should be recorded when they are likely to return.

The record should explain:

- requested treatment;
- affected model object;
- rejection reason;
- alternative;
- approver.

This reduces repeated analysis and prevents another support team from approving the same weak change later.

## Separate emergency fixes from final model decisions

Production incidents sometimes require immediate action.

The team may:

- reduce validation severity;
- disable a rule;
- allow a temporary value;
- reroute workflow.

Emergency action can be legitimate.

It should create two linked items:

1. Emergency operational change.
2. Required model reconciliation.

The operational fix should have:

- reason;
- scope;
- owner;
- expiry;
- rollback or permanent-decision path.

An emergency change should never silently become the new model because nobody revisited it.

## Model governance needs named operational roles

A sustainable AMS model usually requires several responsibilities.

## Model owner

Owns the current approved model for a domain.

## Business data owner

Approves material meaning, policy and risk decisions.

## SAP MDG owner

Confirms platform configuration and operational behaviour.

## Integration owner

Confirms consumers and distribution dependencies.

## Source owner

Maintains source definition and quality where inbound data remains relevant.

## Local owner

Approves legitimate country or organisational variation.

## Model maintainer

Operates repository validation, indexing, reports and proposal processing.

## Test owner

Maintains current regression evidence.

One person may hold several roles in a small organisation.

The responsibilities should still be explicit.

## AMS service levels should include model work

Traditional service levels focus on:

- response time;
- resolution time;
- availability;
- ticket backlog.

Model governance needs additional expectations.

Examples:

- material incidents classified within two business days;
- temporary deviations receive expiry dates;
- model baseline updated for each release;
- critical change impact analysed before implementation;
- recurring model issues reviewed monthly;
- configuration alignment checked after material change.

These measures prevent model reconciliation from being treated as optional documentation work.

## Measure more than incident closure

Useful AMS model-governance metrics include:

### Unreconciled model changes

Configuration or mapping changes not yet reflected in the approved model.

### Recurring incidents by model object

Indicates unresolved root causes.

### Temporary deviations past expiry

Shows unmanaged operational exceptions.

### Change-impact completeness

How often implementation discovers missed dependencies.

### Decision retrieval time

How long support needs to explain why a rule exists.

### Stale test evidence

Tests referring to superseded model states.

### Unowned critical objects

Attributes, rules or values with no accountable owner.

### Model baseline age

Time since the last verified baseline.

The goal is not to create a large KPI system.

It is to make model drift visible.

## Where Martenweave fits

The current Martenweave Core README describes Martenweave as an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS. It turns spreadsheets, datasets, tickets, validation reports, decisions and SAP context into canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-approved AI patch proposals.

The current source version is listed as 0.5.0. The project remains CLI-driven and backend-first rather than a hosted editable production application.

Its core principles are directly relevant to AMS:

- canonical model files remain the source of truth;
- SQLite and JSONL indexes can be rebuilt;
- deterministic validation runs before indexing;
- AI cannot silently mutate the model;
- approved proposals become controlled change requests;
- operation remains local-first.

## A Martenweave AMS flow

```text
Support ticket or change request
        ↓
Affected model objects identified
        ↓
Evidence and current behaviour collected
        ↓
Classification:
data, configuration, mapping or model
        ↓
Impact analysis
        ↓
PatchProposal where model change is required
        ↓
Deterministic validation
        ↓
Business and technical approval
        ↓
ChangeRequest and implementation
        ↓
Verification
        ↓
New operational model baseline
```

This flow does not replace the ITSM system.

It connects service-management work to the maintained model.

## Martenweave can support recurring AMS questions

Current commands include capabilities for:

- validating canonical files;
- rebuilding indexes;
- checking index freshness;
- producing health and scorecard reports;
- running trace and impact analysis;
- searching and querying model objects;
- comparing repositories;
- proposing patches;
- profiling datasets;
- detecting model-to-dataset gaps;
- generating issue-ready outputs.

Examples of operational use include:

```text
Why is this target field mandatory?
→ trace Attribute to Rule and Decision
```

```text
What will be affected if this value is retired?
→ run impact analysis
```

```text
Does the current source extract still support the mapping?
→ rerun dataset readiness
```

```text
Which approved objects have missing ownership?
→ run health or scorecard analysis
```

## Do not turn Martenweave into the service desk

Martenweave’s current boundaries are explicit.

It is not:

- a generic workflow platform;
- a hosted MDM system;
- an ITSM replacement;
- a chatbot;
- an autonomous mutation engine;
- a direct SAP write-back tool.

The service desk should continue to manage:

- communication;
- prioritisation;
- assignment;
- escalation;
- service levels;
- ticket closure.

Martenweave should manage:

- model identity;
- relationships;
- evidence;
- validation;
- impact;
- approved model changes.

The two systems should link rather than duplicate each other.

## Do not force every AMS analyst to edit canonical files

The canonical model provides control.

It should not impose a developer workflow on every support user.

Possible interaction surfaces include:

- generated spreadsheet reviews;
- static model views;
- impact reports;
- semantic diffs;
- issue templates;
- proposal forms;
- local frontend views.

Technical maintainers can operate the canonical files and Git workflow.

Business and functional reviewers can approve meaningful changes through readable views.

## AI can improve AMS investigation

AI can assist with:

- summarising long incident histories;
- finding related model objects;
- comparing current and previous configuration descriptions;
- grouping recurring incidents;
- extracting candidate decisions;
- drafting impact summaries;
- preparing PatchProposals;
- generating release explanations.

This is useful because AMS contains large volumes of repetitive and fragmented evidence.

AI should not decide that:

- a validation should be weakened;
- two business values are equivalent;
- a local exception should become global;
- a temporary default is safe;
- a model change is approved.

The safe boundary remains:

```text
AI organises evidence and proposes.
Validators check structure.
Responsible owners approve.
```

## Recovering model governance after go-live

Some organisations reach this point without a maintained operational model.

The original project documents are stale, and production has already changed.

Recovery should not attempt to reconstruct everything immediately.

Choose one incident-heavy domain.

### Step 1: establish the current model

Use production behaviour, configuration evidence and responsible-owner review.

### Step 2: identify critical objects

Focus on attributes, rules, mappings and values generating operational cost.

### Step 3: recover material decisions

Extract candidate rationale from tickets and documents, then confirm it.

### Step 4: connect recurring incidents

Link support history to model objects.

### Step 5: record deviations

Make configuration differences and temporary workarounds visible.

### Step 6: validate structure

Find broken or incomplete relationships.

### Step 7: introduce proposal-based changes

Ensure the next change is governed properly.

The objective is to create a trustworthy current baseline—not to produce a perfect historical archive.

## A worked example: recurring customer-group incidents

AMS receives repeated tickets because Customer Group is missing or incorrect.

Investigation reveals:

- CRM_A supplies a global customer segment;
- SAP target stores Customer Group by sales area;
- migration copied the same value to every sales area;
- Germany later introduced a contextual validation;
- one interface still sends the original global field;
- project documentation calls both concepts “Customer Group.”

A model-governance response would:

1. Separate the two business meanings.
2. Identify the current target attribute and context.
3. Record historical migration mapping.
4. identify the operational source.
5. connect the German rule.
6. identify affected interfaces and tests.
7. create a controlled change proposal.
8. update the operational model after approval.

A ticket-only response might correct individual records repeatedly without resolving the conceptual mismatch.

## Another example: temporary supplier status

Migration introduced `MIGRATION_REVIEW`.

After go-live, users continue assigning it because it bypasses classification decisions.

AMS should not merely close data-quality tickets.

The model-governance review asks:

- Was the value intended for operational use?
- Which records still contain it?
- Which workflow and interfaces recognise it?
- Who owns remediation?
- Should it now be blocked?
- Is another legitimate operational status required?

The likely change package includes:

- value-list restriction;
- validation;
- remediation report;
- workflow update;
- communication;
- retirement decision.

## Another example: local tax exception

A local team asks AMS to disable a tax validation.

The incident volume is high.

Before changing the rule, the team should analyse:

- affected Business Partner categories;
- current source completeness;
- legal or process evidence;
- existing exemptions;
- other countries using the same rule;
- impact on integration and reporting.

The final outcome may be:

- fix source data;
- correct the context;
- add an approved exemption;
- revise the global rule;
- reject the request.

AMS becomes a governance capability when it can process this evidence rather than choosing the quickest configuration change.

## A minimum AMS model-governance package

For one domain, a practical package should include:

1. Current operational model baseline.
2. Critical object inventory.
3. Source and target lineage.
4. Active rules and value lists.
5. Current ownership.
6. Local variations.
7. Known model debt and temporary deviations.
8. Material decision history.
9. Current test and implementation evidence.
10. Model-significant incident links.
11. Change classification and approval rules.
12. Validation and reporting runbook.

This is enough to establish continuity without recreating the full project repository.

## What management should ask

1. What is the current approved operational model?
2. Does it match production configuration?
3. Which material changes occurred after go-live?
4. Were those changes reconciled back into the model?
5. Which incidents recur around the same attributes or rules?
6. Which temporary migration treatments remain active?
7. Which deviations have passed their expiry dates?
8. Are support tickets linked to affected model objects?
9. Can AMS perform impact analysis before changing configuration?
10. Are current tests connected to the model they prove?
11. Can the team explain why critical rules exist?
12. Which questions still require the original project team?
13. Are AI-generated fixes routed through reviewable proposals?
14. Does each release produce a new verified model baseline?

If these questions cannot be answered, AMS may be maintaining system availability while the model gradually drifts.

## Common mistakes

### Treating the go-live design as permanently current

Production changes begin immediately.

### Updating configuration without updating model truth

This turns configuration into an undocumented architecture decision.

### Closing tickets before model reconciliation

The symptom is resolved, but the next team cannot reuse the result.

### Treating repeated data incidents as unrelated records

Recurring incidents may reveal a model or process defect.

### Leaving migration mappings behind

Historical lineage remains valuable for production investigations.

### Allowing temporary values to remain assignable

Migration workarounds become operational policy.

### Using only service-level metrics

Fast closure can coexist with growing model debt.

### Creating a separate AMS model copy

The operational model should be the continuing canonical baseline.

### Making every change follow a heavy governance board

Change classes should determine proportional approval.

### Letting AI apply configuration or model fixes directly

AI may prepare evidence and proposals, not assume authority.

## When a lightweight approach is enough

A small stable environment may use:

- one controlled model workbook;
- linked tickets;
- a decision register;
- release-based review;
- named owners.

This may be sufficient when:

- one country is involved;
- few integrations exist;
- model changes are rare;
- the same team owns design and support;
- impact analysis is simple.

A registry-based approach becomes more valuable when:

- several countries and sources exist;
- the model changes frequently;
- multiple suppliers support the system;
- mappings and rules interact;
- AMS repeatedly contacts the project team;
- temporary migration treatments remain active;
- AI-assisted support is being introduced.

## Our conclusion

Model governance should not end when the implementation project closes.

After go-live, the model encounters its strongest evidence:

- real records;
- real users;
- real interfaces;
- real exceptions;
- real support incidents.

AMS can treat that evidence in two ways.

It can resolve each ticket locally and allow the model to fragment.

Or it can use incidents and changes to maintain a verified operational baseline.

The practical test is:

> After resolving a material AMS ticket, can the organisation show whether the data, configuration, mapping or approved model changed—and prove that all affected artefacts now agree?

When the answer is yes, model governance has become an operational capability.

When the answer is no, AMS may keep the system running while implementation knowledge slowly disappears.

The objective is not to make every support ticket an architecture project.

It is to ensure that operational changes with model consequences do not vanish when the ticket closes.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We help SAP migration, MDG, MDM, data-governance and AMS teams preserve model truth across project delivery and long-term operations.

Martenweave provides a backend-first foundation for canonical model files, deterministic validation, lineage, impact analysis, dataset evidence and human-approved change proposals.

It does not replace SAP MDG or the service desk.

It connects operational support decisions back to the model the organisation intends to govern.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a governance layer that unifies master data, policy and metadata. Its current capabilities include governed models, golden records, matching and consolidation, collaborative workflows, validated values, monitored business rules, data-quality management and auditable data changes.

SAP also distinguishes master-data integration as the distribution layer that provides applications with a harmonised view of master data in its current state.

The current Martenweave Core README describes Martenweave as an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS. The current source version is listed as 0.5.0.

Martenweave uses canonical model files, deterministic validation, disposable generated indexes, dataset-gap analysis, trace and impact analysis, and reviewable `PatchProposal` and `ChangeRequest` workflows.

The current implementation is CLI-driven and backend-first. It is not a hosted MDM platform, generic workflow engine, autonomous mutation system or direct SAP write-back tool.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
