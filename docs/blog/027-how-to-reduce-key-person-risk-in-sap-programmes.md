# How to Reduce Key-Person Risk in SAP Programmes

**Reviewed: 14 July 2026**

The programme has one person who knows how everything fits together.

They know why a standard field was not used. They remember which country received an exception. They know that one mapping workbook is obsolete even though it is labelled “final.” They understand which migration default was temporary, which Jira decision superseded another and which SAP validation will break if a source field changes.

When a defect appears, everyone calls them.

When a new rollout starts, they explain the model again.

When a change is proposed, they identify dependencies no document shows.

Management may describe this person as indispensable.

Operationally, that is a risk.

The problem becomes visible when the person:

- moves to another project;
- leaves the supplier;
- goes on extended leave;
- becomes overloaded;
- is unavailable during cutover;
- remembers the decision differently from another expert.

The team still has documentation.

It may have thousands of pages, mapping workbooks, tickets, test results and configuration records.

What it does not have is the connected knowledge that allows another qualified person to reach the same conclusion without reconstructing the programme from the beginning.

> Key-person risk is not simply a shortage of documentation. It is a shortage of transferable decision context.

Reducing that risk does not mean replacing senior experts with documents or AI.

It means converting important implementation knowledge from personal memory into a controlled model that others can inspect, validate and maintain.

## Expertise is not the risk

Experienced architects and consultants are essential in complex SAP programmes.

They contribute:

- pattern recognition;
- domain judgement;
- understanding of SAP behaviour;
- knowledge of business processes;
- awareness of implementation trade-offs;
- ability to challenge weak requirements;
- judgement under incomplete evidence.

The programme should not attempt to eliminate dependence on expertise.

The risk appears when expertise is the only place where critical relationships exist.

For example:

```text
Legacy field
→ business meaning
→ approved mapping
→ SAP target
→ validation rule
→ local exception
→ test evidence
```

If only one person understands this path, the programme is not merely benefiting from their expertise.

It is depending on their continued availability as a runtime component of the delivery model.

## The strongest experts often hide the weakest knowledge systems

A capable lead can compensate for poor structure.

They may know:

- which documents are current;
- which team owns each decision;
- which defects are symptoms of the same root cause;
- which configuration differs from approved design;
- which local requirement is legitimate;
- which workaround should not reach production.

Because the person resolves problems quickly, the organisation may underestimate the underlying weakness.

The programme appears controlled.

In reality, the expert is performing manual integration between:

- Excel;
- Jira;
- Confluence;
- datasets;
- SAP configuration;
- test-management tools;
- project history.

When that person is absent, the integration disappears.

The immediate reaction is often to request more documentation.

That is necessary but insufficient.

The organisation needs to preserve not only documents but the relationships and decisions that the expert carries mentally.

## SAP MDG governs operational data, not every implementation memory

SAP currently describes SAP Master Data Governance as a central governance layer that unifies master data, policy and metadata. Its capabilities include governed models, preserved semantics and relationships, ownership of attributes, validated values, collaborative workflows, monitored business rules and auditable data changes.

These controls reduce dependence on individuals for operational master-data processing.

The platform can make explicit:

- who may change a master record;
- which values are valid;
- which approvals are required;
- how records are governed;
- how data changes are audited.

An SAP MDG implementation still creates important knowledge outside those operational controls:

- source-to-target mappings;
- legacy-field interpretation;
- migration defaults;
- configuration rationale;
- local variations;
- rejected design options;
- dataset gaps;
- test coverage;
- implementation dependencies;
- handover conditions.

This wider implementation knowledge must also become governable.

Otherwise, the organisation can have a well-controlled MDG workflow and still depend on one architect to explain why the workflow was designed that way.

## The different forms of key-person dependency

Key-person risk does not have one cause.

We separate it into several forms.

## 1. Knowledge-location dependency

Only one person knows where the relevant information is stored.

The information may exist, but others cannot find it efficiently.

Typical statements include:

- “Ask Anna; she knows which workbook is current.”
- “Mark has the latest version.”
- “The real decision is in an old Jira issue.”
- “The specification is not accurate; speak to the consultant.”

This is a discoverability problem.

## 2. Interpretation dependency

Several artefacts exist, but only one person understands how to reconcile them.

For example:

- design says the field is mandatory;
- mapping says optional;
- SAP configuration uses a warning;
- test cases assume an error.

The expert knows the history and can explain the intended state.

This is a model-coherence problem.

## 3. Decision dependency

Only one person remembers why a design choice was made.

The result may be documented.

The alternatives, evidence and conditions are not.

This is a decision-traceability problem.

## 4. Relationship dependency

Only one person can identify what is affected by a change.

They know which:

- mappings;
- countries;
- rules;
- interfaces;
- tests;
- datasets

depend on the field.

This is a lineage and impact-analysis problem.

## 5. Execution dependency

Only one person can perform a critical task.

Examples include:

- generating a readiness report;
- running validation;
- preparing a load file;
- diagnosing a failed replication;
- applying a model update.

This is a process and automation problem.

## 6. Authority dependency

The organisation has not clearly assigned decision rights.

One senior person becomes the default approver because nobody else is recognised as authorised.

This is a governance problem.

Each form requires a different response.

Adding another consultant may reduce execution dependency without resolving decision or relationship dependency.

## Why traditional handover often fails

Handover is commonly treated as a final project phase.

The delivery team prepares:

- solution documentation;
- configuration guides;
- process diagrams;
- mapping workbooks;
- known-error lists;
- training sessions.

The receiving team attends presentations and signs acceptance.

A few weeks later, AMS begins contacting the original project team.

The handover failed because it transferred artefacts but not enough operational understanding.

Common causes include:

- documents do not identify which version is authoritative;
- mappings are not linked to current target objects;
- decisions are buried in closed tickets;
- local exceptions are described only in comments;
- test evidence is disconnected from model versions;
- temporary workarounds are not labelled as temporary;
- ownership changed but documents did not;
- implementation differs from the approved design.

A document repository can preserve content.

It does not automatically preserve the model connecting that content.

## Start by identifying where the programme is fragile

Do not begin by demanding that every expert document everything they know.

First identify the dependencies with material delivery impact.

Ask:

- Which person is contacted for most complex model questions?
- Which work stops when that person is unavailable?
- Which decisions cannot be explained without them?
- Which reports or processes can only they run?
- Which mappings do they maintain personally?
- Which local exceptions are known mainly through memory?
- Which configuration areas lack a second reviewer?
- Which upcoming project milestone depends on them?

A practical inventory might look like this:

| Knowledge area | Primary expert | Backup | Current evidence | Risk |
|---|---|---|---|---|
| Business Partner tax model | Lead MDG architect | None | Design deck and tickets | High |
| Supplier migration mappings | Migration lead | Junior analyst | Excel workbook | Medium |
| Local value-list exceptions | Country consultant | None | Workbook comments | High |
| Readiness reporting | Data-quality lead | None | Local scripts | High |
| Workflow configuration | SAP developer | Second developer | Technical documentation | Medium |

The purpose is not to evaluate individuals.

It is to identify system weaknesses.

## Do not ask experts to “write everything down”

This creates large, low-quality documentation tasks.

Experts are asked to describe entire domains from memory.

The result often contains:

- general explanations;
- copied configuration details;
- screenshots;
- broad process descriptions.

The most valuable knowledge may still be missing:

- why one option was chosen;
- which dependency is non-obvious;
- which source cannot be trusted;
- which workaround expires;
- which local rule overrides the global model.

A better approach is to capture knowledge through operational objects and questions.

For each critical model element, record:

- What is it?
- Where does it come from?
- Where is it implemented?
- Which rule applies?
- Who owns it?
- Which decision explains it?
- What changes if it moves?
- Which evidence proves the current state?

This turns knowledge capture into model construction rather than memoir writing.

## Capture decisions while they are made

The cheapest time to preserve a decision is at the point of approval.

The most expensive time is months later, during an incident, after participants have left.

For material decisions, record:

- problem;
- affected model objects;
- alternatives;
- selected option;
- rationale;
- evidence;
- scope;
- approvers;
- review condition;
- implementation references.

For example:

```text
Decision:
Allow temporary supplier classification MIGRATION_REVIEW.

Reason:
Legacy ERP_B has no reliable classification source.

Scope:
Inactive and blocked suppliers in Wave 2.

Restriction:
May not be used for newly created suppliers.

Owner:
Global Procurement Data Owner.

Expiry:
Before production cutover.
```

Another architect can now understand the treatment without contacting the original workshop participants.

## Stable model objects reduce reliance on terminology memory

One expert may know that the following terms refer to the same approved concept:

- Vendor Group;
- Supplier Classification;
- Procurement Segment;
- LIFNR grouping;
- local field `SUPP_CAT`.

Another person may reasonably assume they represent different concepts.

Stable identifiers provide an anchor:

```text
ATTR-SUPPLIER-CLASSIFICATION
```

The object can connect:

- business definition;
- local labels;
- source endpoints;
- SAP target;
- value lists;
- rules;
- decisions;
- tests.

This does not remove the need for domain interpretation.

It preserves the interpretation once it has been approved.

## Preserve source-to-target lineage

A support analyst investigating a target field should be able to trace it back to:

- source system;
- source field;
- transformation;
- value mapping;
- dataset evidence.

For example:

```text
SAP Supplier Risk
→ MAP-SUPPLIER-RISK-ERP-A
→ ERP_A.VENDOR_RISK
→ value mapping VLIST-RISK-ERP-A
→ dataset profile dated 10 July
```

Without this path, the analyst depends on the migration lead to explain how the value was produced.

This dependency often survives long after migration because bad or unclear converted data continues generating support incidents.

## Preserve target-to-consumer lineage

The reverse direction also matters.

A change to a target field may affect:

- workflow;
- integration;
- analytics;
- authorisations;
- test cases;
- local processes.

The expert may know these dependencies from previous incidents.

The model should represent them explicitly where material.

```text
Supplier Risk
→ compliance workflow
→ outbound supplier interface
→ procurement reporting
→ data-quality rule
```

This allows another qualified person to assess change impact without relying only on institutional memory.

## Separate model truth from personal working files

Experts often maintain private helper files because project tools are slow or fragmented.

These may include:

- corrected mapping workbooks;
- local scripts;
- personal decision notes;
- reconciliation queries;
- lists of trusted data sources.

These files are valuable.

They are also dangerous when they become the real operating model.

The programme should determine:

- Which content is authoritative?
- Which content is personal analysis?
- Which parts should enter the canonical model?
- Which scripts should be version controlled?
- Which outputs can be regenerated?
- Who else can execute the process?

Do not prohibit personal tools.

Prevent them from becoming undocumented production dependencies.

## Use canonical files and generated views

Martenweave’s architecture uses canonical model files as the source of truth and generated indexes, reports and review views as derived artefacts. The current core documents canonical Markdown and YAML, deterministic validation, generated SQLite and JSONL indexes, trace and impact analysis, dataset profiling, reports and controlled change proposals.

This supports continuity in several ways.

### The model is portable

It is not locked inside one person’s local workbook or proprietary interface.

### Changes are reviewable

Version history shows what changed.

### Views can be regenerated

A report does not depend on one expert manually rebuilding it every month.

### Relationships can be validated

Broken references become visible.

### Automation can be documented

Commands and outputs can be reproduced by another team member.

The business user does not need to edit YAML.

They can work through spreadsheets, reports or a UI generated from the controlled model.

## Deterministic validation transfers tacit checking knowledge

A senior architect may automatically notice that:

- a mapping points to a retired endpoint;
- a local rule lacks context;
- a mandatory target has no source;
- a value list is incomplete;
- an approved object depends on a draft object.

Less experienced team members may not recognise these patterns.

Encoding them as deterministic validation rules transfers part of the expert’s checking process into the system.

For example:

```text
Rule:
Every active critical Mapping must reference
one active source endpoint,
one active target endpoint
and one accountable owner.
```

The validator does not replace the architect’s judgement.

It ensures that basic structural weaknesses do not depend on the architect noticing them manually.

## Encode programme policy, not individual preference

Not every expert habit should become a validation rule.

The programme should distinguish:

- universal structural requirements;
- approved governance policy;
- one person’s preferred working style.

Good deterministic rules include:

- unique identifiers;
- valid references;
- required ownership;
- explicit context;
- expiry for temporary deviations.

Poor rules may enforce:

- one consultant’s naming preference;
- unnecessary documentation detail;
- one project’s workflow on every domain.

Validation rules themselves require ownership and review.

## Create reproducible operating commands

A key-person dependency often exists because one person knows how to run the tools.

Important processes should have:

- documented command;
- input location;
- required environment;
- expected output;
- validation result;
- troubleshooting guidance.

Examples include:

```text
Validate canonical model.
Build generated index.
Profile migration dataset.
Detect model gaps.
Generate impact report.
Export review workbook.
Create issue bundle.
```

The process should be tested by someone other than its author.

A written command that has never been executed by a second person is not yet a reliable handover.

## Use the “two-person execution” test

For each critical operation, ask:

> Can a second qualified person execute this process from the maintained instructions and controlled inputs?

This can be tested through:

- shadowing;
- reverse shadowing;
- simulated absence;
- peer execution;
- runbook exercises.

The second person should not merely observe the expert.

They should perform the process while the expert reviews the result.

This reveals:

- missing assumptions;
- undocumented access;
- private scripts;
- unclear inputs;
- knowledge hidden in naming conventions.

## Use pair ownership for critical domains

Every critical domain should have:

- accountable primary owner;
- named secondary owner;
- shared access to artefacts;
- regular involvement of the secondary person.

A backup who never participates is not a practical backup.

Possible practices include:

- rotating design reviews;
- joint approval of material changes;
- alternating readiness-report preparation;
- shared defect triage;
- peer review of mappings;
- secondary ownership of validation rules.

The objective is not to duplicate every role.

It is to prevent critical knowledge from remaining single-threaded.

## Rotate explanation, not only execution

A person may learn to run a process without understanding why it exists.

Ask different team members to explain:

- one critical attribute;
- one mapping;
- one local exception;
- one validation;
- one decision;
- one readiness finding.

The explanation should cover:

- business meaning;
- technical representation;
- evidence;
- ownership;
- change impact.

This tests whether model understanding has transferred.

## Use incidents as knowledge-capture opportunities

Every difficult defect reveals a gap in the knowledge system.

After resolving the issue, ask:

- Which relationship was difficult to find?
- Which decision was unclear?
- Which evidence was missing?
- Which dependency surprised the team?
- Which check could become deterministic?
- Which runbook needs revision?

Then update:

- model objects;
- decisions;
- lineage;
- tests;
- validation rules;
- issue templates.

Otherwise, the expert solves the incident and retains the new knowledge personally, increasing dependency further.

## Do not transfer knowledge only through meetings

Meetings are useful for explanation and discussion.

They are weak as the only durable output.

A knowledge-transfer session should produce or verify:

- updated model objects;
- decision records;
- runbooks;
- test references;
- ownership;
- known gaps.

Recording the meeting can help.

Future teams should not need to watch several hours of video to understand one mapping.

## Use generated handover packages

A handover package should be produced from the current model rather than assembled manually at the end.

For a domain, it can include:

- domain overview;
- object inventory;
- critical attributes;
- source-to-target mappings;
- rules;
- global and local variations;
- owners;
- open gaps;
- decisions;
- implementation references;
- current test evidence;
- temporary deviations;
- operating commands.

Because the package is generated from controlled objects, it can be refreshed after changes.

This is more durable than a frozen project archive.

## The receiving team must validate the handover

Handover is not complete when documents are delivered.

The AMS or operations team should demonstrate that it can:

- find a critical attribute;
- trace its source and target;
- explain a validation;
- identify the owner;
- assess a sample change;
- run the core reports;
- investigate a known defect;
- locate temporary deviations.

This tests operational usability.

A formal sign-off without these exercises may confirm receipt rather than understanding.

## Distinguish platform knowledge from programme knowledge

Some knowledge is generic SAP expertise:

- how change requests work;
- how validations are implemented;
- how workflow routing operates;
- how replication is configured.

Other knowledge is specific to the organisation:

- why one source is authoritative;
- why a local exception exists;
- why a default was accepted;
- which interface depends on a field;
- which business owner has authority.

Training and vendor documentation may reduce dependence on generic platform expertise.

Only the programme can preserve its own decisions and context.

Both are required.

## Reduce dependency on implementation partners without rejecting them

External partners provide necessary specialist capacity.

The risk arises when the organisation cannot maintain or challenge the delivered model without the same partner.

A responsible engagement should ensure:

- canonical artefacts belong to the client;
- object identifiers are portable;
- decisions are recorded;
- scripts are version controlled;
- validation is reproducible;
- configuration references are accessible;
- client owners participate in review;
- handover is tested before release.

The goal is not to remove the partner.

It is to prevent commercial continuity from becoming the only form of knowledge continuity.

## Avoid the “more people” solution without structure

Adding another consultant does not automatically reduce key-person risk.

The second person may:

- rely on the same lead;
- work only on separate tasks;
- use separate files;
- receive conclusions without rationale;
- leave before gaining context.

Staff redundancy without knowledge-system redundancy is fragile.

A stronger combination is:

```text
Stable model objects
+ shared evidence
+ reproducible processes
+ secondary ownership
+ tested handover
```

## AI can accelerate knowledge capture

AI can help process fragmented project history.

Useful tasks include:

- extracting candidate mappings from workbooks;
- summarising Jira threads;
- identifying conflicting definitions;
- proposing decision records;
- connecting similar field names;
- drafting runbooks;
- generating handover summaries;
- identifying objects with missing owners;
- suggesting impact relationships.

This can reduce the burden on senior experts.

Instead of writing the complete model manually, the expert reviews structured proposals.

## AI can also create a new key-person problem

An opaque AI workflow can become another dependency.

For example:

- only one person knows the prompts;
- source selection is undocumented;
- generated results are not validated;
- the model silently changes;
- automation depends on one local environment;
- nobody understands why the agent produced a result.

The AI process should therefore be reproducible and governed.

Record:

- input sources;
- agent version or workflow;
- proposal output;
- validation results;
- human approval;
- final model change.

The goal is not to replace one expert dependency with one agent dependency.

## AI should propose; people should approve

Martenweave’s public product description states that AI-assisted changes should pass through reviewable PatchProposals rather than altering the canonical model directly. It also describes structured connections among fields, attributes, rules, owners, issues and decisions.

This supports continuity because:

- proposed knowledge is visible;
- evidence can be reviewed;
- incorrect inference does not become truth automatically;
- decisions remain attributable;
- another reviewer can reproduce the reasoning.

Human approval is not only a safety control.

It is part of preserving organisational authority.

## Build a key-person-risk scorecard

A practical scorecard can assess critical model areas.

For each domain or process, evaluate:

### Primary owner

Is one accountable person named?

### Secondary owner

Can another person perform and explain the work?

### Canonical artefacts

Is the current authoritative model identifiable?

### Decision traceability

Can important choices be explained?

### Relationship traceability

Can changes identify their dependencies?

### Reproducibility

Can reports and validations be rerun?

### Operational evidence

Are tests and implementation references current?

### Access

Do the necessary people have access to tools and repositories?

A simple rating can be used:

- Controlled;
- Partially controlled;
- Person-dependent;
- Unknown.

The purpose is to prioritise remediation, not produce another decorative maturity score.

## Indicators of high key-person risk

Warning signs include:

- one person attends every critical meeting;
- questions are answered from memory rather than evidence;
- the “real” model differs from published documentation;
- only one person can generate key reports;
- private spreadsheets override shared artefacts;
- important scripts are stored locally;
- no one else reviews complex mappings;
- approval authority is unclear;
- AMS repeatedly contacts the project team;
- planned leave creates delivery concern;
- vendor replacement is considered impossible;
- AI workflows depend on one operator.

One sign alone may be manageable.

Several together indicate structural dependency.

## A practical remediation plan

Do not attempt to solve every dependency at once.

Choose one high-risk domain.

For example:

- Business Partner tax model;
- supplier migration mappings;
- customer value conversions;
- MDG workflow rules.

### Step 1: Identify critical questions

List the questions currently routed to one person.

### Step 2: Create stable model objects

Represent the affected attributes, endpoints, mappings, rules and contexts.

### Step 3: Record material decisions

Capture rationale, evidence and approval.

### Step 4: Connect implementation evidence

Add configuration, datasets, tests and issue references.

### Step 5: Encode basic validation

Automate repeatable checks.

### Step 6: Document operating commands

Make reports and analyses reproducible.

### Step 7: Assign a secondary owner

The second person reviews and executes the process.

### Step 8: Run an absence simulation

Resolve a sample issue without the primary expert leading.

### Step 9: Measure remaining dependency

Identify what still requires personal knowledge.

This creates a bounded improvement rather than a general documentation campaign.

## A worked example: Business Partner tax governance

The programme depends on one architect to explain country tax treatment.

The risk areas include:

- tax categories;
- mandatory conditions;
- exemptions;
- legacy source fields;
- local mappings;
- migration defaults;
- MDG validations;
- test cases.

The remediation model might include:

```text
Global attribute:
Tax Registration Identifier

Country contexts:
DE, PT, ES

Source endpoints:
Defined per legacy system

Mappings:
Connected to each country context

Rules:
Mandatory and format conditions

Decisions:
Approved exemptions and temporary deviations

Tests:
Positive, negative and exemption cases

Owners:
Global tax-data owner and local finance owners
```

A secondary architect is then asked to investigate a failed German tax record using only the maintained model and evidence.

Any information they cannot find becomes a concrete knowledge-system gap.

## Another example: migration readiness reporting

Only one data-quality lead can produce the readiness report.

They use:

- personal scripts;
- locally stored extracts;
- manual workbook corrections;
- knowledge of which issues are real blockers.

To reduce dependency:

- move scripts into version control;
- document environment and command;
- identify canonical dataset inputs;
- generate reports from model rules;
- encode blocker classifications;
- link exceptions to owners and decisions;
- have another analyst reproduce the report.

The objective is not merely that the second person can run the script.

They should understand why the report reaches its conclusion.

## Another example: local value mappings

A country consultant maintains local value mappings in a private workbook.

The global team relies on them during each test cycle.

Remediation includes:

- stable value-list and mapping IDs;
- import of approved mappings into the canonical model;
- explicit local context;
- dataset coverage check;
- named local and global owners;
- generated country review workbook;
- proposal-based updates.

The consultant retains domain expertise.

The mapping no longer disappears when their contract ends.

## What should remain human

Some knowledge cannot be reduced completely to model objects.

Experienced people still need to interpret:

- ambiguous regulation;
- political ownership;
- undocumented legacy behaviour;
- acceptable business risk;
- stakeholder incentives;
- practical implementation trade-offs.

The objective is not complete codification.

It is to ensure that the next qualified person starts from preserved evidence and decisions rather than from an empty desk.

## What managers should ask

1. Which people are currently indispensable to critical model decisions?
2. What work stops when they are absent?
3. Is the current model identifiable without asking them?
4. Can another person trace critical fields from source to target?
5. Are material decisions recorded with rationale and approval?
6. Are local exceptions explicit?
7. Can another person run validation and readiness reports?
8. Are scripts and commands version controlled?
9. Does every critical area have a participating secondary owner?
10. Has the receiving team demonstrated understanding?
11. Are difficult incidents used to improve the model?
12. Can the organisation change implementation partners without losing model truth?
13. Are AI workflows reproducible and reviewable?
14. Which dependencies remain intentionally person-based?

The final question matters.

Some dependency on rare expertise may be an accepted business choice.

It should be conscious rather than discovered during a crisis.

## Common mistakes

### Producing more documents without establishing authority

The team receives more files but still cannot identify the approved state.

### Waiting until handover

Knowledge should be captured through delivery and change.

### Treating recordings as structured knowledge

Recordings are useful evidence but expensive operational references.

### Naming a backup who does not participate

A passive backup is unlikely to be ready.

### Expecting junior staff to absorb context through observation

They need controlled opportunities to execute and explain.

### Documenting configuration without rationale

Future teams see what exists but not why.

### Keeping scripts on personal machines

This turns reporting and validation into individual capabilities.

### Attempting to capture every expert thought

Focus on material model objects, relationships and decisions.

### Replacing an expert with AI

AI can prepare proposals and summaries but cannot inherit business authority.

### Treating key-person risk as an HR issue only

It is also an architecture, governance and knowledge-model issue.

## When a lightweight approach is enough

A small project may use:

- controlled mapping workbook;
- decision log;
- shared runbooks;
- paired ownership;
- version-controlled scripts.

This may be sufficient when:

- one domain is involved;
- the project is short;
- mappings are simple;
- local variation is limited;
- the same team will support the solution.

A model registry becomes more useful when:

- several countries are involved;
- sources and mappings are complex;
- implementation partners change;
- several releases reuse the same model;
- impact analysis depends on experts;
- AMS handover is difficult;
- AI agents consume project knowledge.

## Where Martenweave fits

Martenweave is intended to turn knowledge scattered across spreadsheets, datasets, tickets, validation reports, decisions, SAP context and project history into structured, connected model objects. Its public documentation describes validation, gap detection, traceability, impact analysis and human-reviewed model proposals.

The current open-source core includes canonical model files, generated indexes, dataset profiling, reports, spreadsheet review flows and a PatchProposal-to-ChangeRequest lifecycle.

For key-person risk, its role is practical:

```text
Expert knowledge and project evidence
        ↓
Structured model objects and decisions
        ↓
Deterministic validation
        ↓
Generated views and reproducible reports
        ↓
Shared review and ownership
        ↓
Transferable operational knowledge
```

Martenweave does not make specialists interchangeable.

It makes the results of specialist work less dependent on one person’s memory.

## Our conclusion

Key-person risk in SAP programmes is rarely solved by one final handover workshop.

It is reduced when important knowledge becomes part of the delivery system while the programme is still active.

That means preserving:

- stable model objects;
- source and target lineage;
- material decisions;
- local variations;
- ownership;
- implementation evidence;
- reproducible processes;
- deterministic checks.

The practical test is:

> Can another qualified person explain and safely change a critical part of the model without the original expert reconstructing the context for them?

When the answer is no, the programme remains person-dependent even if documentation exists.

When the answer is yes, expertise has begun to become organisational capability.

The objective is not to make experts less valuable.

It is to stop wasting their value on repeatedly explaining facts and relationships that the programme should already know.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We build practical model-governance infrastructure for SAP migration, MDG, MDM and AMS teams. Martenweave is designed to preserve model objects, evidence, decisions and relationships so that implementation knowledge survives staff changes, partner transitions and the move from project delivery to long-term support.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer that unifies master data, policy and metadata. Its stated capabilities include governed models, preserved semantics and relationships, ownership of master-data attributes, validated values, collaborative workflows, monitored business rules and auditable data changes.

Martenweave’s public documentation describes a model-control layer that connects fields, attributes, rules, owners, issues and decisions and supports deterministic validation, dataset-gap detection, traceability, impact analysis and reviewable model proposals.

The current open-source core includes canonical model files, generated indexes, search, trace and impact analysis, dataset profiling, ownership and audit reports, spreadsheet review flows and a PatchProposal-to-ChangeRequest lifecycle.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
