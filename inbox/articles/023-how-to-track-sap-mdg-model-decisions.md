# How to Track SAP MDG Model Decisions

**Reviewed: 14 July 2026**

During a design workshop, the programme agrees that a supplier classification should be mandatory.

The decision appears straightforward.

The architect updates the design deck. The SAP MDG team configures a validation. The migration team adds the field to its mapping workbook. A Jira ticket is closed with the comment:

> Confirmed with business. Please proceed.

Eight months later, the rule blocks a large population of suppliers.

The new business owner asks why the classification is mandatory.

The design deck says that it supports compliance. The ticket contains several competing options. One workshop participant remembers that the requirement applied only to high-risk suppliers. Another believes it was introduced as a temporary control until source-data remediation was complete.

Production configuration applies the rule to all active suppliers.

The programme can see what was implemented.

It cannot reconstruct exactly what was decided.

This is not a rare documentation gap. It is a structural weakness in how model decisions are recorded.

Most projects track activities well:

- a workshop happened;
- an issue was raised;
- a document was updated;
- configuration was transported;
- testing was completed.

They are often less precise about the decision connecting those activities:

- What exactly changed?
- Which model objects were affected?
- Which alternatives were rejected?
- What evidence supported the choice?
- Who had authority to approve it?
- Under which conditions should it be reviewed?
- Which implementation artefacts were expected to change?

A decision should not disappear into the documents and tickets created around it.

It should remain an identifiable part of the model history.

> A model decision is the controlled explanation of why the approved model has one state rather than another.

Without that explanation, teams can maintain configuration but struggle to govern change.

## SAP MDG records operational changes, but implementation decisions extend beyond records

SAP currently describes SAP Master Data Governance as a central governance layer that combines master data, policy and metadata, with governed models, collaborative workflows, business rules, data-quality controls and an audit trail of data changes.

These capabilities are central to operational governance.

They allow organisations to control:

- who changes master data;
- which values are valid;
- which approvals are required;
- how records are matched, consolidated or activated;
- how changes are audited.

An implementation programme also makes decisions about the model surrounding those processes.

Examples include:

- why one attribute exists;
- why another was excluded;
- why a rule is global or local;
- why one source was selected as authoritative;
- why several legacy values were merged;
- why a temporary default was accepted;
- why a workflow step was added;
- why a target extension was preferred over standard behaviour;
- why a dataset gap was accepted for one migration wave.

These decisions may influence SAP MDG configuration, but they are usually discussed across a wider toolset:

- workshops;
- Jira;
- Confluence;
- Excel mappings;
- architecture boards;
- test defects;
- migration reports;
- email;
- meeting notes.

The organisation needs to preserve them as part of the implementation model.

## A ticket is not automatically a decision

A Jira issue is an effective way to track work.

It can show:

- requester;
- assignee;
- discussion;
- status;
- attachments;
- implementation tasks;
- closure date.

The issue may contain a decision.

It is not necessarily a clean decision record.

A typical issue thread may include:

1. Initial request.
2. Technical objection.
3. Local business clarification.
4. Alternative proposal.
5. Temporary workaround.
6. Meeting note.
7. Final implementation comment.
8. Closure.

Months later, a reader must infer which statement represents the approved model.

The ticket summary may no longer reflect the result.

The ticket may have been closed because configuration was delivered, even though the underlying business interpretation remained provisional.

We separate the roles:

```text
Issue:
Tracks the problem and work.

Decision:
Records the approved outcome and rationale.

Model change:
Updates the authoritative model state.
```

The issue can remain linked to the decision.

The decision should remain usable after the issue closes.

## A meeting conclusion is not durable enough

Many important model choices happen in workshops.

This is normal. The right people are present, alternatives can be discussed and trade-offs become visible.

The risk appears after the meeting.

The result may be recorded as:

- a sentence in meeting minutes;
- a highlighted slide;
- a chat message;
- an updated spreadsheet cell;
- the memory of the solution architect.

These forms are difficult to validate and connect to downstream work.

A durable decision should identify:

- the problem;
- the affected model objects;
- the selected treatment;
- the reason;
- the evidence;
- the approvers;
- the consequences;
- the review condition.

This does not require bureaucratic minutes for every discussion.

It requires extracting the final authoritative outcome from the discussion.

## What qualifies as a model decision

Not every edit needs a formal decision object.

Correcting a typo in a description is usually not a material architecture decision.

A model decision is worth tracking when it changes or confirms something that affects implementation, governance or future interpretation.

Typical examples include:

### Business definition

What does the attribute actually mean?

### Scope

Which domains, countries, organisations or populations does it apply to?

### Source authority

Which source system or field should be trusted?

### Target representation

Which SAP object or attribute should represent the concept?

### Transformation

How should values be derived, merged, split or converted?

### Validation

When should a value be mandatory, rejected or warned?

### Workflow

Which owner or approver should participate?

### Value semantics

Which codes are valid, equivalent or obsolete?

### Exception

Which deviation from the intended model is accepted?

### Lifecycle

When should an object become active, deprecated or retired?

### Risk acceptance

Which known gap may proceed to the next stage?

The common feature is consequence.

The decision changes what the programme builds, migrates, tests or operates.

## The anatomy of a useful decision record

A practical decision record should be compact enough to maintain and structured enough to query.

We recommend the following fields.

## Decision identifier

A stable reference such as:

```text
DEC-BP-0048
```

This can be used in:

- model files;
- mappings;
- tickets;
- tests;
- release notes;
- configuration documentation.

## Title

A concise statement of the choice.

Example:

```text
Require German tax identifier for active organisational customers
```

## Problem

What question required resolution?

Example:

> The target model requires tax identification, but source availability and exemption handling differ by Business Partner category and country.

## Affected model objects

List stable identifiers for:

- attributes;
- mappings;
- rules;
- value lists;
- contexts;
- endpoints.

## Alternatives

What realistic options were considered?

For example:

1. Mandatory globally.
2. Mandatory only in Germany.
3. Warning during migration, error after go-live.
4. Keep optional and monitor through data-quality reporting.

## Selected option

State the outcome without forcing future readers to infer it.

## Rationale

Why was this option selected?

The rationale should mention the actual trade-off, not generic language such as “best practice.”

## Evidence

Examples:

- legal requirement;
- dataset profile;
- process analysis;
- source-system documentation;
- test result;
- audit finding;
- volume estimate.

## Approvers

Record roles as well as people.

People change. Authority usually belongs to a role.

## Effective scope

Specify:

- countries;
- organisations;
- populations;
- release;
- migration wave.

## Conditions

Identify assumptions or limitations.

Example:

> The rule applies only after the remediation population falls below the agreed threshold.

## Review trigger

State when the decision must be reconsidered.

Examples:

- new country rollout;
- source-system replacement;
- remediation completion;
- legal change;
- target-model redesign.

## Implementation references

Link the decision to:

- SAP MDG configuration;
- mapping;
- code;
- workflow;
- release;
- test evidence.

This turns a historical statement into an operational control object.

## Record rejected alternatives

Teams often record only the chosen option.

Rejected alternatives are valuable because future teams may propose them again.

Suppose the programme decides not to create a new custom attribute and instead reuses a standard SAP field.

Six months later, another workstream suggests the custom field again.

Without the original rationale, the organisation repeats the analysis.

A concise rejected-option record can state:

```text
Alternative:
Create local custom supplier classification.

Rejected because:
- duplicates the global risk concept;
- not supported by two downstream systems;
- introduces a second ownership model;
- prevents comparable reporting.
```

This does not mean every brainstorming idea must be stored.

Preserve serious alternatives that were analysed and could plausibly return.

## Distinguish decisions from assumptions

Projects frequently proceed before every question is resolved.

That is acceptable.

The problem begins when an assumption is stored as if it were an approved decision.

For example:

```text
Assumption:
Legacy CUSTOMER_TYPE represents SAP Customer Group.
```

The team may need this assumption to continue mapping work.

It should remain visibly provisional until evidence and responsible-owner approval exist.

Useful states include:

- Proposed;
- Assumed;
- Under review;
- Approved;
- Superseded;
- Rejected;
- Expired.

An assumption may later become a decision.

The history should show the transition.

## Distinguish decisions from requirements

A requirement states a need.

A decision states how the programme will address it.

Requirement:

> The organisation must identify suppliers requiring enhanced compliance review.

Possible decisions:

- create a new classification attribute;
- derive the classification from risk indicators;
- reuse an existing status;
- keep the classification outside MDG;
- route suppliers through a separate workflow.

Treating the requirement and decision as the same object hides the design choice.

This matters because requirements may remain stable while implementation decisions change.

## Distinguish decisions from configuration

Configuration shows the implemented state.

A decision explains why that state was selected.

For example:

```text
Configuration:
Validation severity = Error
```

The decision may explain:

- why an error was required rather than a warning;
- which population it covers;
- what exception process applies;
- which source-data gap was accepted;
- when the severity should be reviewed.

If the configuration changes without a decision update, the programme should know whether:

- the model changed;
- an implementation defect was corrected;
- a temporary workaround was introduced;
- the system has diverged from the approved state.

## Link decisions directly to model objects

A decision register organised only by date or meeting becomes difficult to use.

Future questions usually begin with a model object:

- Why is this field mandatory?
- Why does this source map here?
- Why does this value exist?
- Why is this country different?
- Why was this attribute retired?

The object should show its related decisions.

For example:

```text
Attribute:
ATTR-SUPPLIER-RISK

Related decisions:
- DEC-0021: Adopt global risk classification
- DEC-0037: Add HIGH compliance workflow
- DEC-0049: Permit local UNDER_REVIEW extension
- DEC-0062: Retire temporary UNKNOWN default
```

The decision register can still provide a chronological view.

The model relationship provides operational usefulness.

## One decision may affect several objects

Avoid attaching a decision to only one field when the consequence is broader.

A decision to add `UNDER_REVIEW` may affect:

- value list;
- attribute;
- workflow rule;
- migration mapping;
- interface contract;
- data-quality report;
- test cases;
- remediation backlog.

A structured decision should list all known affected objects.

This allows impact analysis to travel in both directions:

```text
Decision → affected model objects
```

and:

```text
Model object → decisions that shaped it
```

## Preserve context

A decision without context is easily misapplied.

Suppose the record says:

> Customer Group is mandatory.

The missing context may include:

- Germany only;
- active B2B customers;
- selected sales organisations;
- new operational records;
- post-remediation release;
- migration excluded.

The decision object should reference structured context where possible.

This prevents local decisions from becoming global assumptions.

## Preserve time and model version

A decision may be correct for one model baseline and obsolete for another.

Record:

- decision date;
- effective model version;
- effective release;
- superseding decision if applicable.

For example:

```text
DEC-0048
Effective in model baseline 1.7
Superseded by DEC-0091 in baseline 2.1
```

Do not erase the old decision.

Historical mappings, datasets and tests may still depend on it.

## Use supersession, not silent editing

A common mistake is editing the original decision record when policy changes.

That destroys historical meaning.

Suppose a field was originally mandatory and later made optional.

The organisation needs to know:

- when the mandatory rule applied;
- which migration wave used it;
- why it changed;
- which tests and records were affected.

Create a new decision that supersedes the old one.

```text
DEC-0048:
Mandatory for active German customers.

DEC-0091:
Supersedes DEC-0048.
Optional when approved exemption type EX-02 exists.
```

This supports historical reconstruction.

## Track decision conditions

Some decisions are intentionally temporary or conditional.

Examples:

- default allowed only for Mock Load 1;
- local value accepted until global harmonisation;
- warning used until source remediation is complete;
- manual ownership permitted during pilot;
- legacy identifier retained until system retirement.

These decisions need:

- expiry date;
- review date;
- measurable trigger;
- owner.

Poor condition:

> Temporary until later.

Useful condition:

> Reassess after ERP_B provides the source field or before production cutover, whichever occurs first.

Conditional decisions without review triggers become permanent by inertia.

## Track evidence strength

Not all decisions are supported equally.

Useful evidence levels might include:

### Confirmed policy evidence

Legal requirement, approved policy or signed business decision.

### Operational evidence

Observed process, system usage or production behaviour.

### Dataset evidence

Profiled values, completeness, duplicates or population analysis.

### Expert judgement

Reasoned recommendation by accountable specialists.

### Working assumption

Necessary but not yet confirmed.

The decision record should not hide weak evidence.

An approved decision can still be based on limited evidence when the programme consciously accepts the risk.

## A worked example: supplier classification default

The target model requires Supplier Classification.

One legacy system has no equivalent field.

The migration team proposes defaulting every affected supplier to `STANDARD`.

A useful decision record would look like this:

```text
Decision:
DEC-SUP-0072

Problem:
ERP_B has no reliable source for Supplier Classification.

Affected objects:
ATTR-SUPPLIER-CLASS
MAP-ERP-B-SUPPLIER-CLASS
VLIST-SUPPLIER-CLASS
RULE-SUPPLIER-CLASS-REQUIRED

Alternatives:
1. Default all records to STANDARD.
2. Derive from annual spend.
3. Manually enrich active suppliers.
4. Make target field optional for migration.

Selected option:
Manually enrich active suppliers.
Blocked and historical suppliers may use temporary value
MIGRATION_REVIEW.

Rationale:
STANDARD would appear as a genuine business classification.
Spend does not represent the approved classification meaning.

Conditions:
MIGRATION_REVIEW may not be assigned to newly created suppliers.

Review trigger:
Temporary population must be remediated before 31 December.

Approvers:
Global Procurement Data Owner
Migration Lead
SAP MDG Architect
```

This is more useful than a mapping comment stating:

> Use migration default where blank.

## Another example: local tax rule

A country team requests a mandatory tax identifier.

The decision should clarify whether it is:

- a new global attribute;
- a country-specific rule on an existing attribute;
- a migration-only requirement;
- a workflow condition;
- a legal exception.

Possible record:

```text
Selected treatment:
Use existing global Tax Registration Identifier attribute.

Add country-specific validation for organisational Business Partners.

Do not alter the global optionality rule.

Historical inactive records are excluded from migration remediation.
```

The decision prevents the local requirement from being interpreted as a global model change.

## Another example: retiring an attribute

The programme wants to remove an obsolete customer classification.

The decision should not only state that the field is retired.

It should include:

- why the concept is no longer needed;
- replacement attribute, if any;
- mappings that must stop populating it;
- interfaces consuming it;
- historical reporting treatment;
- existing-record conversion;
- effective release;
- rollback or transition plan.

Retirement is a model decision with downstream consequences.

## Decisions should drive implementation work

An approved decision should produce or update the necessary delivery tasks.

For example:

```text
Approved decision
        ↓
Update canonical model
        ↓
Update SAP MDG configuration
        ↓
Update migration mapping
        ↓
Update dataset checks
        ↓
Update interfaces
        ↓
Update tests
        ↓
Verify implementation
```

Jira can track these tasks.

The decision remains the shared source explaining why they exist.

## Close the loop after implementation

Approval is not the end of decision tracking.

The programme should verify that the decision was implemented as intended.

Record:

- implementation status;
- release or transport;
- validation result;
- test evidence;
- deviations discovered;
- final effective model baseline.

This prevents a decision register from becoming a list of intentions disconnected from production.

A useful state flow is:

```text
Proposed
→ Approved
→ Implementation in progress
→ Implemented
→ Verified
→ Superseded or retired
```

## Decisions and defects

A defect can reveal that the model decision was wrong or incomplete.

Classify the outcome.

### Implementation defect

The approved decision remains correct. Configuration or mapping is fixed.

### Decision clarification

The intention was valid but insufficiently precise. The decision record is amended through controlled clarification.

### Model decision change

The programme selects a different treatment. A new decision supersedes the original.

This distinction protects history.

Do not rewrite an old decision to make it appear that the programme always intended the final outcome.

## Decisions and local requirements

Global programmes should connect local decisions to global parent objects.

Example:

```text
Local decision:
DEC-DE-0034

Global parent:
ATTR-BP-TAX-REGISTRATION

Treatment:
Country-specific validation override

Scope:
Germany, organisational customers

Global model impact:
No change to global definition
```

This allows future global changes to identify affected local decisions.

It also prevents local tickets from becoming disconnected architecture.

## Decision ownership

Different decisions require different authority.

Examples:

### Definition change

Business domain owner and data architect.

### Source selection

Business owner, source-system owner and migration lead.

### Target-model change

Data architect and SAP MDG architect.

### Validation severity

Business rule owner and process owner.

### Local legal requirement

Local legal or business owner plus global governance review.

### Temporary migration default

Business owner, migration lead and data-quality owner.

The system should derive required reviewers from the type and affected objects where possible.

## Decision quality is more important than decision volume

A programme can create too many decision records.

If every small edit produces a formal record, the register becomes noise.

Prioritise decisions with one or more of these characteristics:

- material business meaning;
- several realistic alternatives;
- cross-workstream impact;
- local/global tension;
- accepted risk;
- temporary deviation;
- high remediation cost;
- likely future challenge;
- significant downstream dependency.

The objective is not to document every thought.

It is to preserve choices that future teams would otherwise need to reconstruct.

## Use a decision backlog

Open model questions should be visible before they block testing.

A decision backlog can show:

- question;
- affected objects;
- owner;
- evidence status;
- required approvers;
- target date;
- delivery impact.

This is different from a general project issue backlog.

It focuses specifically on unresolved model truth.

Useful categories include:

- definition;
- source authority;
- target design;
- transformation;
- value mapping;
- validation;
- ownership;
- local variation;
- accepted gap.

A decision backlog helps management see where “design completion” is hiding unresolved choices.

## Decision ageing is a risk signal

Track how long material decisions remain unresolved.

An ageing decision may indicate:

- missing owner;
- insufficient evidence;
- cross-country disagreement;
- unclear governance authority;
- unresolved target architecture;
- source-data uncertainty.

Ageing matters because downstream teams often proceed with assumptions while waiting.

The programme may appear to maintain schedule while accumulating rework.

## Use semantic decision diffs

Reviewers should see what the decision changes in business terms.

For example:

```text
Current state:
Customer Group optional globally.

Proposed state:
Mandatory for active German B2B customers.

Data impact:
4,620 affected records are currently blank.

Mapping impact:
ERP_B has no reliable source.

Configuration impact:
New contextual validation required.

Test impact:
Seven scenarios require revision.

Decision requested:
Approve rule and remediation plan.
```

This is more useful than asking decision-makers to compare two YAML files or two workbook versions.

## Where Martenweave fits

Martenweave’s current public description states that it turns scattered knowledge from spreadsheets, datasets, tickets, validation reports, decisions and SAP context into structured model objects. It connects fields, attributes, rules, owners, issues and decisions, validates references, detects gaps and traces impact.

The current core includes:

- canonical Markdown and YAML model files;
- deterministic validation;
- generated SQLite and JSONL indexes;
- search and structured query;
- trace and impact analysis;
- dataset profiling and gap detection;
- ownership, audit, health and scorecard reports;
- CSV and XLSX review flows;
- PatchProposal-to-ChangeRequest lifecycle;
- issue drafts and GitHub-ready change bundles.

A Martenweave decision object can connect:

```text
Issue
→ Decision
→ affected Attribute, Mapping, Rule or Context
→ approved ChangeRequest
→ implementation evidence
→ new model baseline
```

This converts decision tracking from a narrative archive into part of the model graph.

## A practical Martenweave decision flow

```text
Evidence collected
        ↓
Model question identified
        ↓
Options structured
        ↓
Impact analysis
        ↓
PatchProposal
        ↓
Required owners review
        ↓
Decision approved
        ↓
ChangeRequest created
        ↓
Canonical model updated
        ↓
Implementation verified
```

AI can assist with the preparation:

- extract candidate decisions from tickets;
- summarise alternatives;
- locate conflicting evidence;
- identify affected model objects;
- draft the decision record;
- generate implementation tasks.

AI should not approve the decision.

It does not own the business policy, legal interpretation or risk.

## Deterministic validation for decisions

Decision objects can also be validated structurally.

Useful checks include:

- every approved decision has an approver;
- every decision references existing model objects;
- every superseded decision identifies its replacement;
- temporary decisions have review triggers;
- rejected decisions cannot remain active dependencies;
- model changes reference an approved decision where policy requires it;
- decisions do not reference retired objects without historical context;
- implementation verification exists before status becomes Verified.

These checks do not prove the rationale is good.

They prevent incomplete decisions from being treated as formally governed.

## AI can recover decisions from old projects—but only as candidates

Many existing programmes already have years of fragmented history.

AI can help reconstruct candidate decision records from:

- Jira threads;
- Confluence pages;
- meeting notes;
- mapping comments;
- test defects;
- configuration documentation.

For example, it may produce:

```text
Candidate decision:
Make Supplier Risk mandatory for high-spend suppliers.

Evidence found:
- Workshop note dated 12 March
- Jira comment in issue 482
- UAT test case 119

Conflict:
Current configuration applies rule to all active suppliers.

Approval evidence:
Not found.
```

This is valuable.

It should be reviewed and confirmed before entering the approved decision history.

The absence of approval evidence is itself a finding.

## Decision reports for management

A useful management view should show:

- open decisions by impact;
- ageing;
- missing owners;
- decisions blocking configuration;
- decisions blocking migration;
- temporary deviations nearing expiry;
- approved decisions not yet implemented;
- implemented decisions not yet verified;
- recent decisions with high downstream impact;
- superseded decisions still referenced by active objects.

This is more informative than reporting only the number of open design issues.

## What managers should ask

1. Which model decisions remain unresolved?
2. Which workstreams are proceeding on assumptions?
3. Does every material decision identify affected model objects?
4. Are alternatives and rationale recorded?
5. Is evidence attached or referenced?
6. Did the correct roles approve the choice?
7. Are local decisions connected to global parent objects?
8. Do temporary decisions have review triggers?
9. Are approved decisions reflected in the canonical model?
10. Are configuration, mappings and tests aligned with them?
11. Are superseded decisions still influencing active artefacts?
12. Can AMS retrieve the reason behind a critical rule without contacting the original project team?

If the last question requires searching meeting recordings, decision tracking is not working.

## Common mistakes

### Treating Jira closure as decision approval

Work status and model authority are different.

### Recording only the selected option

Preserve serious alternatives and why they were rejected.

### Writing vague rationale

“Best practice” and “business requirement” are not enough.

### Editing historical decisions

Use supersession to preserve the state that applied at the time.

### Omitting scope

A local or temporary decision can be misapplied globally.

### Omitting review triggers

Temporary choices become permanent by inertia.

### Linking decisions only to documents

Link them directly to the affected model objects.

### Recording approval without authority

The approver must hold the relevant decision right.

### Stopping after approval

Verify that the decision was implemented.

### Generating decisions automatically from AI summaries

AI can produce candidates. Responsible people must confirm authority and meaning.

## When a simple decision log is enough

A spreadsheet or Confluence table may be sufficient when:

- the domain is small;
- few decisions occur;
- the team is stable;
- dependencies are simple;
- the project is short.

At minimum, include:

- ID;
- question;
- affected object;
- outcome;
- rationale;
- approver;
- date;
- status;
- review condition.

A structured registry becomes more valuable when:

- several countries are involved;
- model decisions change frequently;
- many mappings and rules depend on them;
- multiple vendors work in parallel;
- handover spans several years;
- AI agents consume the model;
- impact analysis is otherwise manual.

## Our conclusion

SAP MDG model decisions should not be preserved only as workshop memory, Jira discussion or configuration outcome.

They are part of the model.

A good decision record explains:

- what question was resolved;
- which model objects were affected;
- which options were considered;
- why one option was selected;
- what evidence supported it;
- who had authority;
- where it applies;
- when it should be reviewed;
- how it was implemented and verified.

The practical test is simple:

> Can someone who did not attend the original workshop explain why this attribute, mapping or rule has its current state?

When the answer is yes, the programme has preserved a decision.

When the answer requires reading several ticket threads and calling a former consultant, the programme has preserved activity—but not model knowledge.

The goal is not to document every conversation.

It is to ensure that important choices remain visible after the conversations have ended.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We build practical model-governance infrastructure for SAP migration, MDG, MDM and AMS teams. Martenweave is designed to connect model decisions directly to attributes, mappings, rules, datasets and approved changes so that implementation reasoning survives beyond workshops and project teams.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer that combines master data, policy and metadata and supports governed models, collaborative workflows, established business rules, validated values, quality monitoring and an audit trail of changes.

Martenweave’s current public documentation describes a model-control layer that connects fields, attributes, rules, owners, issues and decisions and supports deterministic validation, gap detection, traceability, impact analysis and reviewable model proposals.

The current open-source core includes canonical model files, generated indexes, ownership and audit reports, spreadsheet review flows, issue drafts and a PatchProposal-to-ChangeRequest lifecycle.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
