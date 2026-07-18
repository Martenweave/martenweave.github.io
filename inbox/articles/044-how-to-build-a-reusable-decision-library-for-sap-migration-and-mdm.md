# How to Build a Reusable Decision Library for SAP Migration and MDM

**Reviewed: 14 July 2026**

A programme has an approved decision:

> Customer Group will be maintained at sales-area level.

The decision appears in a steering presentation. A related Jira ticket is closed. The mapping workbook contains the selected SAP field. Meeting minutes record that the business accepted the approach.

Nine months later, another country asks whether it can use one central source value for every sales area.

The project team searches for the original decision.

They find several fragments:

- a slide containing the final sentence;
- a Jira issue discussing the implementation;
- a Confluence page with three abandoned options;
- a mapping row without rationale;
- an email from the original architect;
- an SAP configuration that does not exactly match any of them.

The decision exists.

Its usable context does not.

The new team cannot determine:

- why sales-area granularity was selected;
- which source systems were investigated;
- whether the decision was global or limited to two countries;
- what assumptions supported it;
- what alternatives were rejected;
- whether later evidence changed the conclusion;
- who has authority to revise it.

The team now has two unsafe choices.

It can repeat the investigation.

Or it can reuse the old conclusion without knowing whether the conditions still match.

This is why a decision library must be more than a searchable list of approved statements.

> A reusable decision library preserves not only what was decided, but the scope, evidence, alternatives, authority and conditions that make the decision valid.

The objective is not to document every meeting.

It is to stop important model decisions from becoming detached from the problem they solved.

## Decisions disappear in several ways

Knowledge loss does not require documents to be deleted.

A decision can remain technically available and still become unusable.

### The decision is buried inside delivery work

A Jira issue may contain the reasoning, but its title describes implementation:

> Configure Supplier Classification validation.

Later users searching for the business decision may never find it.

### The outcome survives, but the alternatives disappear

The final mapping exists, but nobody remembers why another target was rejected.

A later team proposes the same unsafe alternative.

### The scope disappears

A local Portuguese exception is remembered as a general rule.

A migration-only default becomes part of operational design.

### Evidence ages silently

The decision relied on a dataset profile produced before source remediation or system replacement.

The page remains marked “Approved.”

### Implementation becomes confused with policy

Teams infer the business decision from current SAP configuration, even when configuration contains a defect or temporary workaround.

### The original authority leaves

The programme knows who made the decision, but not which governance role gave that person authority.

The practical result is the same: the organisation cannot reuse its own conclusions safely.

## A decision statement is not a decision record

Consider this sentence:

> Use `PENDING` for suppliers without a final risk classification.

It looks precise.

It leaves important questions unanswered:

- Is `PENDING` part of Supplier Risk or a separate Review Status?
- Does it apply to all suppliers?
- Is it migration-only?
- Can operational users assign it?
- Does it block activation?
- Which source systems may use it?
- When must it be removed?
- Who approved the exception?

A decision record must provide enough context to distinguish the approved treatment from other plausible interpretations.

A useful test is:

> Could a team that did not attend the original discussion implement the decision correctly without calling the original author?

When the answer is no, the record contains an outcome but not a reusable decision.

## The library should contain model decisions—not every project choice

A programme makes thousands of decisions:

- workshop date;
- spreadsheet format;
- sprint assignment;
- test-environment sequence;
- meeting frequency.

A Martenweave decision library should focus on choices that affect persistent model truth or its controlled implementation.

Examples include:

- business definition;
- authoritative source;
- source-to-target relationship;
- organisational granularity;
- value semantics;
- global versus local applicability;
- mandatory rules;
- derivation;
- default policy;
- ownership;
- lifecycle;
- accepted exception;
- retirement;
- risk acceptance.

The library should not become a complete project diary.

Its value comes from preserving decisions that future teams are likely to question, reuse or accidentally contradict.

## A useful decision has a boundary

Every model decision should state where it applies.

For example:

```text id="dec-01"
Decision:
Customer Group is maintained at sales-area level.

Applies to:
- active sold-to customers;
- SAP sales processing;
- Germany and Austria;
- CRM_A migration;
- Wave 2 and subsequent operational maintenance.

Does not determine:
- marketing segmentation;
- account-group assignment;
- pricing-group design;
- historical inactive customers.
```

The exclusion section is important.

Without it, a correct decision may be reused for another concept simply because the terminology is similar.

## Write the decision as a change in model truth

Weak wording:

> Agreed to update the mapping.

Stronger wording:

> `CRM_A.CUSTOMER_SEGMENT` will not be treated as a direct source for the sales-area Customer Group. Customer Group values for Wave 2 will be provided through controlled enrichment until an approved organisational derivation or authoritative source is available.

The stronger version identifies:

- rejected relationship;
- approved temporary treatment;
- applicable scope;
- condition for future change.

A decision should describe what becomes true after approval.

## Keep the problem beside the outcome

A reusable record needs a short problem statement.

Example:

```text id="dec-02"
Problem:

CRM_A stores one central marketing segment per customer.
The SAP target Customer Group can differ by sales area
and influences sales-processing analysis.
```

This explains why a direct mapping was questioned.

Without the problem, later users see only the chosen solution and may apply it in a context where the original issue does not exist.

## Preserve the considered alternatives

Atlassian’s current decision-documentation guidance recommends recording context, involved roles, options, advantages and disadvantages, action items and the final outcome. Its DACI structure also distinguishes the driver, approver, contributors and informed participants.

That is a useful general collaboration pattern.

For a model decision, alternatives should be more tightly connected to model consequences.

For example:

### Option A: copy central segment to every sales area

Rejected because:

- source and target granularity differ;
- no approved business rule supports repetition;
- local variation would be lost.

### Option B: derive Customer Group by sales area

Deferred because:

- derivation rules are not agreed;
- required organisational evidence is incomplete.

### Option C: controlled enrichment

Approved for Wave 2 because:

- business owners can provide contextual values;
- unresolved records remain visible;
- the approach does not falsely redefine the source field.

### Option D: leave target blank

Rejected for the applicable population because:

- downstream sales processing requires the value;
- readiness policy does not permit unresolved cutover records.

Future readers can now understand why the approved option was selected.

They can also reassess the deferred option when circumstances change.

## Record rejected defaults explicitly

Defaults deserve special treatment because they often reappear.

A decision should state:

```text id="dec-03"
Rejected treatment:
Default blank Supplier Risk to STANDARD.

Reason:
Absence of classification does not establish standard risk.
The default would create a plausible final value and hide
which records still require assessment.
```

This is valuable institutional knowledge.

Without it, another team may reintroduce the same default as an apparently practical improvement.

## Distinguish the finding from the decision

An investigation produces a finding.

An authority makes a decision.

Example:

### Finding

The central CRM segment is not semantically equivalent to sales-area Customer Group.

### Decision

Use controlled enrichment for the current migration wave.

The finding may remain valid for years.

The implementation decision may be temporary.

Keeping them separate allows the library to evolve correctly.

A future authoritative source may replace enrichment without invalidating the original finding about semantic non-equivalence.

## Authority should be represented as a role

A decision record should identify:

- driver;
- accountable approver;
- contributors;
- affected owners;
- parties informed.

But permanent model authority should normally be represented through governance roles rather than only individual names.

Example:

```text id="dec-04"
Approving role:
Global Customer Data Owner

Current approver:
Jane Smith

Technical concurrence:
SAP Customer Architect

Local concurrence:
Germany Sales Data Owner
Austria Sales Data Owner
```

If Jane Smith leaves, the organisation still knows which role may review or supersede the decision.

This is stronger than treating the original meeting attendees as permanent authorities.

## Decision status needs more precision than Approved or Rejected

Useful lifecycle states include:

### Draft

The question and alternatives are still being prepared.

### Decision required

Evidence is sufficient, but the accountable authority has not selected an option.

### Approved

The decision is current for its stated scope.

### Approved with conditions

The decision applies only while explicit conditions are maintained.

### Temporary

The decision has an expiry or review trigger.

### Superseded

A later decision replaces it.

### Partially superseded

The decision remains valid for part of its original scope.

### Withdrawn

The decision was cancelled before becoming effective.

### Review required

New evidence may invalidate the decision.

### Rejected

The proposal was considered and not accepted.

This lifecycle prevents “Approved” from becoming a permanent label after the underlying conditions have changed.

## Temporary decisions need a built-in ending

A temporary migration decision should include:

- effective date;
- expiry date;
- permitted population;
- restriction;
- owner;
- cleanup action;
- review trigger.

For example:

```text id="dec-05"
Decision:
Allow Review Status = PENDING during Mock Load 2.

Scope:
ERP_B active suppliers with unresolved classification.

Restriction:
Records cannot be activated.

Expiry:
Before UAT Cycle 1.

Required follow-up:
Remediate population and retire migration-only treatment.
```

A temporary decision without an ending is usually a permanent model defect waiting to happen.

## Reuse conditions are the heart of the library

A decision library becomes useful when it tells teams whether an earlier decision can be applied again.

Example:

```text id="dec-06"
Reusable when:

- the source remains central;
- the target remains sales-area-specific;
- no approved organisational derivation exists;
- the same business definitions apply;
- affected records remain within the stated customer population.
```

Then add:

```text id="dec-07"
New review required when:

- a source becomes sales-area-specific;
- another target attribute is proposed;
- a country uses Customer Group for a different purpose;
- target semantics change;
- new evidence contradicts the original source analysis.
```

Without these fields, a decision library encourages blind copying.

With them, it supports controlled precedent.

## A reusable decision is not automatically a global standard

Decisions can have different levels of authority.

### Case-specific decision

Applies only to one incident, dataset or migration batch.

### Source-specific decision

Applies to one legacy system.

### Contextual decision

Applies to a country, business unit or organisational level.

### Domain precedent

May guide similar cases but still requires scope confirmation.

### Global model policy

Applies across the governed domain unless an approved exception exists.

A German mapping decision should not become a global policy simply because no other decision exists.

The library should make authority level visible.

## Decisions should link to canonical objects

A record becomes far more useful when it is connected to what it governs.

For example:

```text id="dec-08"
Decision:
DEC-CUSTOMER-GROUP-017

Governs:
- ATTR-CUST-SALES-CUSTOMER-GROUP
- FEP-CRM-A-CUSTOMER-SEGMENT
- FEP-S4-KNVV-KDGRP
- MAP-CRM-A-CUSTOMER-GROUP
- RULE-CUSTOMER-GROUP-REQUIRED
```

This enables questions such as:

- Which decisions define this attribute?
- Which decision approved this mapping?
- Which active objects still depend on a superseded decision?
- Which local rules have no recorded decision?
- Which decisions may be affected by retiring this endpoint?

Martenweave’s current core already uses canonical objects for domains, entities, attributes, relationships, datasets, mappings, rules, evidence, decisions and proposals, with deterministic validation and generated indexes.

A decision library should strengthen those relationships rather than exist as a separate document repository.

## Link decisions to evidence without copying everything

Evidence may live in:

- dataset reports;
- data-quality platforms;
- enterprise catalogues;
- SAP configuration;
- Jira;
- ServiceNow;
- Confluence;
- GitHub;
- test tools.

The decision record should preserve:

- evidence ID or reference;
- type;
- date;
- producer;
- model baseline;
- what claim it supports;
- known limitations.

Example:

```text id="dec-09"
Evidence:
EVID-CRM-A-CUSTOMER-SEGMENT-PROFILE

Supports:
Source cardinality is one value per customer.

Does not prove:
Whether the source value has the same business meaning
as SAP Customer Group.
```

This prevents data statistics from being treated as semantic authority.

## Keep operational workflow in the appropriate platform

SAP MDG is designed to govern operational master data through models, validations, ownership, matching, consolidation, workflows, quality monitoring and auditable changes.

The decision library should not recreate SAP MDG change-request processing.

Instead, it should answer:

- why a model rule exists;
- which evidence supported it;
- what scope was approved;
- which alternatives were rejected;
- what should trigger review.

The approved decision may then be implemented through SAP MDG workflow and configuration.

## Confluence is good at collaborative decision pages

Confluence’s DACI decision template is designed to record status, context, impact, participants, options, trade-offs, action items and final outcomes.

That makes Confluence a reasonable authoring and collaboration surface.

Its limitation is not that it cannot store decisions.

The limitation appears when model-specific relationships remain only in prose:

- affected object IDs;
- target endpoints;
- mapping versions;
- datasets;
- decision lifecycle;
- superseding relationships;
- deterministic consistency.

Martenweave should not attempt to replace Confluence’s broad collaboration capabilities.

It can make the decision structurally connected to the model.

A programme may still publish a readable Confluence view generated from or linked to the canonical decision record.

## ServiceNow is appropriate for operational knowledge and workflow

ServiceNow positions its knowledge-management capability around contextual knowledge bases, self-service and agent productivity, within a broader platform covering workflows, risk, operations and service management.

That makes it suitable for:

- operational knowledge articles;
- incident resolution;
- service procedures;
- approval workflows;
- AMS support.

A Martenweave decision may be referenced from a ServiceNow knowledge article:

> Why does the system block activation while Supplier Review Status is pending?

The ServiceNow article explains operational handling.

The decision library retains:

- model rationale;
- evidence;
- affected objects;
- approved scope;
- change history.

## Data-governance platforms can carry enterprise context

Collibra and Informatica provide broad data-governance capabilities around policies, metadata, ownership, data understanding, quality and enterprise governance.

They may be the appropriate enterprise systems for:

- business glossary;
- data ownership;
- certification;
- policy;
- metadata discovery;
- data-quality governance.

Martenweave’s role should remain more delivery-specific:

- exact source and target endpoints;
- migration mappings;
- dataset-to-model gaps;
- local and global context;
- model investigations;
- reviewable file-level changes;
- Git history.

The library can reference enterprise catalogue assets and owners.

It does not need to duplicate the complete catalogue.

## Jira is useful for action, not as the only memory

A Jira issue can track:

- required decision;
- owner;
- due date;
- implementation tasks;
- progress;
- blockers.

But when the issue closes, its content may become hard to discover outside the original project context.

The decision record should remain independently discoverable from the model objects it governs.

A clean chain is:

```text id="dec-10"
Investigation
→ decision record
→ PatchProposal or ChangeRequest
→ Jira implementation tasks
→ verification evidence
```

The decision explains why.

Jira tracks delivery.

## Git provides durable model-change history

Git is especially useful for preserving:

- exact canonical diff;
- reviewer comments;
- approvals;
- baseline;
- superseding change.

But Git history alone does not guarantee a reusable decision.

A commit message such as:

> Update Supplier Risk logic

does not explain the business context.

The decision record should link the semantic rationale to the exact model change.

Martenweave’s existing operating principle is:

> Agents propose. Validators verify. Humans approve. Git records.

The decision library supplies the reasoning that Git should record beside the diff.

## A decision record should be small enough to complete

A practical schema might contain:

```yaml id="dec-11"
id: DEC-CUSTOMER-GROUP-017
title: Treat Customer Group as a sales-area attribute
status: approved_with_conditions
authority_level: domain_precedent

problem: >
  CRM_A provides one central marketing segment,
  while SAP Customer Group is maintained by sales area.

decision: >
  Do not use CRM_A.CUSTOMER_SEGMENT as an unrestricted
  direct source for Customer Group. Use controlled enrichment
  for Wave 2.

scope:
  countries:
    - DE
    - AT
  source_systems:
    - CRM_A
  population:
    - active_sold_to_customers
  organisational_level:
    - sales_area

affected_objects:
  - ATTR-CUST-SALES-CUSTOMER-GROUP
  - FEP-CRM-A-CUSTOMER-SEGMENT
  - FEP-S4-KNVV-KDGRP

evidence:
  - EVID-CRM-A-PROFILE-2026-07
  - INV-CUSTOMER-GROUP-CRM-A-001

alternatives:
  rejected:
    - direct_replication
  deferred:
    - organisational_derivation

approving_role:
  - ROLE-GLOBAL-CUSTOMER-DATA-OWNER

reuse_conditions:
  - source remains central
  - target remains sales-area-specific

review_triggers:
  - source granularity changes
  - target semantics change
  - new authoritative source becomes available
```

This is a conceptual example.

The important point is that the record is structured enough to validate and search, while still leaving room for concise human explanation.

## Decisions need relationships to one another

A library is not merely a list.

Decisions can:

- supersede;
- refine;
- restrict;
- extend;
- temporarily override;
- implement;
- reject;
- depend on.

Example:

```text id="dec-12"
DEC-GLOBAL-SUPPLIER-RISK-001
        ↓ refined_by
DEC-PT-SUPPLIER-RISK-004
        ↓ temporarily_overridden_by
DEC-PT-MIGRATION-EXCEPTION-009
        ↓ superseded_by
DEC-PT-SOURCE-REMEDIATION-014
```

This allows users to determine which decision is currently effective for a particular context.

Without explicit relationships, the newest document is often assumed to replace everything that came before.

That may be wrong.

## Determine the effective decision by context

Suppose the global rule states:

> Supplier Risk is mandatory for active strategic suppliers.

A Portuguese decision adds:

> Individual suppliers are out of scope.

A migration decision permits:

> During Mock Load 2, unresolved records may remain pending but cannot be activated.

All three decisions may be active simultaneously.

The library should resolve them by:

- domain;
- country;
- entity type;
- lifecycle;
- migration phase;
- effective dates.

This is more useful than treating decisions as one flat chronological log.

## A decision can be implemented incorrectly

The library should distinguish:

```text id="dec-13"
Approved decision:
Rule applies only to organisations.

Current implementation:
Rule applies to organisations and persons.
```

This should create an implementation-alignment gap.

Do not rewrite the decision to match the system.

The decision library protects intended truth from accidental configuration.

## A decision can become stale without being wrong

A decision may still describe its original context correctly while no longer supporting the current one.

Example:

- it assumed one source system;
- a second source was added;
- it assumed one country;
- rollout expanded;
- it relied on a temporary value list;
- the target model changed.

Mark it:

> Review required

rather than deleting or silently editing it.

Historical decisions explain how existing data and configuration came into existence.

## Use review triggers instead of arbitrary annual reviews

Some decisions require periodic review.

Others should be reviewed only when relevant conditions change.

Useful triggers include:

- source-system replacement;
- target-field retirement;
- value-list change;
- new country rollout;
- new regulatory requirement;
- dataset contradiction;
- repeated incidents;
- expired exception;
- ownership change;
- proposal affecting governed objects.

Trigger-based review is more meaningful than asking owners to reread every decision once a year.

## Make contradictions visible

A library should detect or expose:

- two active decisions governing the same object and context;
- local exception with no global parent;
- temporary decision past expiry;
- current mapping linked to a superseded decision;
- rule implemented without an approved decision;
- decision referencing retired objects;
- approved decision with missing authority.

Some of these can be deterministic validation failures.

Others require human resolution.

The important point is that contradiction should not remain buried in documents.

## What should be validated automatically

Martenweave could check that:

- decision ID is unique;
- status is valid;
- affected objects exist;
- approver role exists;
- temporary decisions have expiry;
- superseded decisions identify replacements;
- reusable decisions define scope;
- active decisions do not reference retired objects without explanation;
- implementation objects link to a current decision where policy requires it;
- review triggers are well formed.

The validator cannot determine whether the business decision is wise.

It can determine whether the decision is structurally governable.

## Search must work from the user’s language

Users may search for:

- Customer Group;
- KNVV-KDGRP;
- CRM segment;
- German exception;
- missing Supplier Risk;
- migration default;
- `PENDING`;
- the related Jira number.

The library should search:

- decision title;
- problem;
- outcome;
- aliases;
- affected object IDs;
- values;
- systems;
- countries;
- evidence references;
- implementation links.

A decision that can only be found by its internal ID will not be reused.

## Reuse should start with comparison, not copying

When a user finds a previous decision, the system should prompt a scope comparison.

For example:

| Dimension | Previous decision | Current case |
|---|---|---|
| Source | CRM_A | CRM_B |
| Source granularity | Central | Sales organisation |
| Target | Customer Group | Customer Group |
| Countries | DE, AT | FR |
| Business definition | Sales-processing group | Sales-processing group |
| Value model | One source value | Several organisational values |

The previous conclusion may not apply because the source granularity differs.

The library has still saved work:

- target definition is known;
- previous alternatives are available;
- comparison dimensions are established.

Reuse means carrying forward verified knowledge, not copying the final sentence.

## A worked decision: Supplier Review Status

### The question

How should suppliers without a completed risk assessment be represented during migration?

### The evidence

- final Supplier Risk values drive compliance handling;
- ERP_B cannot provide the value for part of the applicable population;
- defaulting to `STANDARD` would conceal missing assessment;
- an operational review process already exists informally.

### Options considered

1. Default Supplier Risk to `STANDARD`.
2. Make Supplier Risk optional.
3. Exclude all unresolved suppliers.
4. Introduce a separate Review Status.

### Decision

Introduce Review Status with `PENDING`, `CLEARED` and `REJECTED`.

Supplier Risk remains a final classification.

Records with `PENDING` cannot be activated.

### Authority level

Domain precedent.

### Scope

Supplier organisations requiring compliance assessment.

### Conditions

- Review Status must be separate from Supplier Risk.
- Operational ownership must be assigned.
- Downstream reporting must not treat `PENDING` as final classification.

### Reuse

Other sources may reuse the treatment when they lack a final classification but can identify records requiring review.

### New review required

- final Supplier Risk becomes deterministically derivable;
- another MDM platform represents the process differently;
- activation policy changes;
- downstream systems cannot accept the status.

This decision is now reusable without being universal.

## A second worked decision: local tax exception

### Original request

Disable Tax Identifier validation for Portugal.

### Investigation result

Failures affected individual suppliers because configuration ignored Business Partner category.

### Decision

Retain the tax rule for supplier organisations.

Correct category context.

Do not introduce a country-wide exemption.

### Why it matters in the library

A later project may search for:

> Portugal tax exception

and find that the requested exception was explicitly rejected.

This prevents the same broad exemption from being proposed again.

The library preserves negative decisions as well as approved changes.

## A third worked decision: target endpoint retirement

### Trigger

A target field is scheduled for retirement.

### Finding

The proposed replacement has a similar label but different organisational scope.

### Decision

Do not automatically migrate mappings to the replacement endpoint.

Open separate investigations by affected business attribute.

### Implementation consequence

- freeze automatic replacement;
- create impact report;
- assign owners;
- review twelve mappings.

The decision prevents a technically efficient bulk change from creating semantic errors.

## The smallest useful Martenweave implementation

Martenweave already includes decision objects in its broader canonical model and supports validation, search, trace, impact, proposals and Git-oriented review workflows.

The next useful decision-library slice should avoid becoming a large knowledge-management feature.

### Add or strengthen these fields

- decision authority level;
- scope;
- exclusions;
- affected model objects;
- alternatives;
- approving role;
- reuse conditions;
- review triggers;
- effective dates;
- superseding relationships.

### Add validation

- active decision consistency;
- expiry;
- references;
- authority;
- superseding chain.

### Add read operations

- decisions for an object;
- currently effective decisions by context;
- decisions requiring review;
- conflicting decisions;
- precedents for a new investigation.

### Connect to proposals

A PatchProposal should identify which decision authorises it—or state that a new decision is required.

### Generate human-readable views

- Markdown;
- static HTML;
- GitHub issue or pull-request summary;
- optional Confluence or ServiceNow reference.

This is enough to prove value.

## What not to build

Do not turn Martenweave into:

- a generic meeting-decision app;
- a broad wiki;
- a replacement for Confluence;
- an enterprise knowledge base;
- a workflow suite;
- a full data catalogue;
- a policy-management platform.

Its decision library should remain anchored to model objects, migration evidence and controlled changes.

That is what differentiates it.

## How to measure whether the library works

Do not count only the number of decisions recorded.

Better indicators include:

### Decision retrieval

Can a new team find the relevant decision from a field, mapping or value?

### Decision reuse

Did a later wave reuse verified evidence or precedent?

### Repeated-analysis reduction

Were previously rejected options avoided?

### Contradiction detection

Did the library identify conflicting active decisions?

### Time to impact assessment

Can a reviewer identify affected objects and implementations?

### Handover quality

Can AMS understand why a rule exists without contacting the project team?

### Stale-decision control

Are expired and contradicted decisions surfaced?

A library containing hundreds of unread decisions is not successful.

## Questions to ask before approving a decision record

- What problem does the decision resolve?
- Is the decision itself stated clearly?
- What scope does it govern?
- What is explicitly out of scope?
- Which evidence supports it?
- Which serious alternatives were rejected?
- Which role had authority?
- Is it permanent, temporary or conditional?
- Which model objects does it govern?
- Which implementation must follow?
- Under which conditions may it be reused?
- What should trigger review?
- Does it replace an earlier decision?
- Can another team find it from the affected field or mapping?

A record that cannot answer these questions is likely to become another project note.

## Final perspective

A decision library should not preserve the past merely for audit.

It should make future work cheaper and safer.

The organisation should be able to move from a current problem to:

- previous investigations;
- relevant evidence;
- active decisions;
- rejected alternatives;
- applicable conditions;
- current implementation;
- required review.

SAP MDG, enterprise catalogues, governance platforms, Confluence, ServiceNow, Jira and Git each solve important parts of the wider process. SAP MDG governs operational master data. Catalogues and governance suites organise enterprise metadata, ownership and policy. Confluence supports collaborative decision documentation. ServiceNow manages operational knowledge and workflow. Jira manages delivery. Git records exact model changes.

The gap Martenweave can own is narrower:

> Connect a model decision to the exact evidence, objects, context and reviewed change that made it necessary.

The practical test is:

> When a similar question appears in another country or migration wave, can the team determine whether the previous decision still applies without repeating the complete investigation or copying the conclusion blindly?

When the answer is yes, the organisation has a reusable decision library.

When the answer is no, it has a searchable archive of old conclusions.

Those are not the same thing.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects:

- canonical model objects;
- datasets;
- mappings;
- rules;
- investigations;
- evidence;
- decisions;
- impact;
- reviewable proposals;
- Git-recorded changes.

The purpose of the decision library is not to replace the organisation’s existing knowledge, governance or operational platforms.

It is to preserve the missing link between why a model decision was made and the exact model state it governs.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP describes SAP Master Data Governance as a central governance layer with governed models, preserved semantics and relationships, validated values, stewardship workflows, quality controls and auditable master-data changes.

Atlassian’s DACI decision template recommends recording decision status, context, impact, participants, options, trade-offs, actions and final outcomes, with clear driver, approver, contributor and informed roles.

ServiceNow positions Knowledge Management as a contextual knowledge base supporting self-service and agent productivity within a wider workflow and service-management platform.

Collibra and Informatica provide broader enterprise data-governance capabilities spanning metadata, policy, ownership, data understanding, quality and governance processes.

Martenweave Core currently uses canonical model files, deterministic validation, rebuildable indexes, dataset-gap analysis, trace, impact analysis and human-reviewed proposal workflows. Its documented operating pipeline moves from evidence through proposal, validation, gaps and impact to human review and GitHub-ready output.

Martenweave is independent and is not affiliated with or endorsed by SAP, Atlassian, ServiceNow, Collibra, Informatica or other vendors named in this article. Product names and trademarks belong to their respective owners.
