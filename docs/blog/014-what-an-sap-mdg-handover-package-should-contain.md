# What an SAP MDG Handover Package Should Contain

**Reviewed: 14 July 2026**

The SAP MDG programme goes live on Friday.

On Monday, the project team begins to leave.

The AMS team receives:

- a solution-design document;
- configuration workbooks;
- several hundred test cases;
- migration mappings;
- a list of open defects;
- recordings from knowledge-transfer sessions;
- links to Jira and Confluence;
- folders organised by project workstream.

Formally, the handover is complete.

Two weeks later, a steward reports that a supplier record cannot be approved.

AMS finds the validation error but cannot explain why the rule exists. The design document describes an earlier version. The relevant Jira issue is closed. The mapping workbook contains a temporary default. The workflow diagram does not show the country-specific exception added before cutover.

Someone contacts the former implementation consultant.

The project delivered documentation.

It did not transfer operational understanding.

This is the distinction we use when assessing an SAP MDG handover:

> A handover package is complete when the receiving team can understand, operate, investigate and safely change the governed model without depending on the original project team.

The number of files is not the measure.

The measure is whether the knowledge remains usable after the people who created it are gone.

## Why traditional handover packages fail

Most SAP programmes do not ignore handover.

They produce substantial documentation.

The problem is usually structural.

Project knowledge has been organised around delivery activities:

- design;
- build;
- migration;
- integration;
- testing;
- deployment;
- defects.

AMS works differently.

Support starts from operational questions:

- Why did this validation fail?
- Who owns this attribute?
- Which records are affected?
- Is this behaviour global or local?
- Where does the value come from?
- What happens if we change the rule?
- Which interfaces consume the field?
- Was this exception intentional?
- Is there unresolved remediation?
- Which document reflects production?

A folder structure based on project phases does not answer these questions directly.

The receiving team has to reconstruct the model by navigating across workstream artefacts.

That reconstruction is expensive and unreliable.

## SAP MDG handover is not just technical handover

SAP currently describes SAP Master Data Governance as a central governance layer for business-critical data, including governed models, golden records, data-quality rules, collaborative workflows, matching and consolidation, mass changes and auditable data changes.

Operating such a solution requires more than knowing where configuration is stored.

The receiving organisation needs to understand:

- the governed business model;
- ownership and stewardship;
- workflow responsibilities;
- data-quality policy;
- validation and derivation logic;
- source and distribution architecture;
- exceptions;
- existing data populations;
- operational monitoring;
- change control.

A technical handover may explain how a rule was configured.

A complete MDG handover should also explain:

- what business policy the rule implements;
- which populations it affects;
- who may approve a change;
- which exceptions are valid;
- what downstream behaviour depends on it.

The platform configuration and the operating model have to be handed over together.

## The handover should be organised around the model

We recommend structuring the package around governed objects rather than project phases.

For a Business Partner domain, the core structure may include:

- central identity;
- roles;
- addresses;
- tax information;
- bank information;
- relationships;
- customer company-code data;
- customer sales-area data;
- supplier company-code data;
- supplier purchasing-organisation data.

For each area, the receiving team should be able to find:

```text id="mdg-handover-1"
Business definition
        ↓
Approved model object
        ↓
SAP MDG implementation
        ↓
Source and migration treatment
        ↓
Rules and workflow
        ↓
Interfaces and consumers
        ↓
Tests and known issues
        ↓
Operational owner
```

This does not mean copying all information into one document.

It means preserving a navigable connection between the relevant artefacts.

## 1. The approved model baseline

The first component of the handover should be the model that the production implementation is intended to represent.

It should be clearly identified by:

- version;
- approval date;
- production release;
- applicable domains;
- countries or organisations;
- known deviations.

The model baseline should include:

- entities;
- attributes;
- relationships;
- organisational contexts;
- definitions;
- ownership;
- value lists;
- critical rules;
- target endpoints;
- lifecycle status.

The receiving team should not have to determine the current model by comparing design documents with production manually.

A handover statement such as “use the final design documents” is insufficient when several final versions exist.

The package should state explicitly:

> Production release X implements model baseline Y, subject to the following approved deviations.

## 2. A model-to-configuration reference

The handover should explain how the approved model is represented in SAP MDG.

For critical objects, provide references to:

- MDG entities and attributes;
- relevant data-model extensions;
- validation and derivation implementations;
- workflow configuration;
- user interfaces;
- change-request types;
- replication or distribution configuration;
- relevant custom developments;
- transport or release references.

The purpose is not to reproduce every configuration setting.

The purpose is to help AMS move from a business question to the relevant implementation area.

For example:

```text id="mdg-handover-2"
Business attribute:
Supplier Risk Classification

Model ID:
ATTR-SUPPLIER-RISK

MDG representation:
Supplier entity / risk attribute

Rule:
High-risk suppliers require compliance approval

Workflow:
Additional compliance step

Consumers:
Procurement analytics, supplier onboarding interface
```

This is more useful than an isolated screenshot of the configuration.

## 3. Business definitions and ownership

Every critical attribute should have a clear business definition.

The handover should identify:

- what the attribute means;
- where it applies;
- who owns the definition;
- who maintains the data;
- who approves exceptions;
- which process depends on it;
- whether it is global or local.

Ownership should be assigned at a useful level.

A general statement such as “Business owns customer data” does not help AMS resolve a disputed tax rule or value-list change.

Useful roles may include:

- domain owner;
- attribute owner;
- data steward;
- value-list owner;
- rule owner;
- workflow approver;
- source-system owner;
- interface owner;
- AMS technical owner.

These roles may belong to different people.

The handover should explain both responsibility and escalation.

## 4. Validation and derivation catalogue

A list of rules is one of the most important handover components.

For each critical rule, record:

- stable identifier;
- business description;
- affected attributes;
- applicable contexts;
- conditions;
- expected behaviour;
- warning or error severity;
- exception process;
- owner;
- implementation reference;
- test evidence;
- known limitations.

A useful catalogue separates the business rule from its technical implementation.

For example:

```text id="mdg-handover-3"
Business rule:
Active German organisational Business Partners require
an approved German tax identifier unless an exemption exists.

Implementation:
MDG validation rule X

Migration treatment:
Missing values rejected for active records

Operational exception:
Approved legal exemption recorded under process Y
```

This allows AMS to determine whether an incident is caused by:

- invalid data;
- incorrect configuration;
- an outdated business rule;
- an unhandled exception;
- a migration defect.

SAP describes MDG as supporting centrally catalogued data-quality business rules, validated values and continuous monitoring. The project still needs to transfer the specific rule definitions, ownership and operating procedures used by the implementation.

## 5. Workflow and approval model

Workflow handover should go beyond a process diagram.

The receiving team needs to know:

- what starts each change-request process;
- which roles participate;
- how routing is determined;
- which attributes affect the route;
- how local and global approvals differ;
- how substitutions are managed;
- what happens after rejection;
- how stalled requests are monitored;
- which emergency or mass-change paths exist;
- which steps may be bypassed and under what authority.

SAP highlights collaborative workflow routing and notifications as part of MDG’s operational governance capabilities.

AMS also needs operational procedures:

- how to identify a stuck change request;
- who can restart or correct it;
- when a technical intervention is allowed;
- how to distinguish role problems from rule problems;
- how escalations are recorded;
- how workflow changes are approved.

A workflow can function technically while routing data to the wrong business owner.

The handover must include the governance logic behind the route.

## 6. Source, mapping and migration lineage

Go-live does not make migration knowledge irrelevant.

AMS will eventually receive questions such as:

- Why does this record contain this value?
- Which legacy system supplied it?
- Was it defaulted?
- Which code conversion was used?
- Why are similar records different?
- Which migrated populations require remediation?

The handover should therefore preserve lineage for critical fields:

```text id="mdg-handover-4"
Legacy source
→ source field
→ transformation
→ value mapping
→ governed attribute
→ SAP target field
```

Include:

- source-system identity;
- source endpoints;
- transformation rules;
- value mappings;
- defaults;
- merge or survivorship decisions;
- excluded records;
- legacy key strategy;
- migration-wave context.

This information does not need to remain active for every minor field forever.

It should be retained for attributes where migration treatment affects operational interpretation.

## 7. Accepted migration exceptions

Every migration introduces some accepted exceptions.

Examples include:

- temporary default values;
- incomplete enrichment;
- unresolved duplicates;
- missing optional data;
- records excluded from the first wave;
- local codes awaiting harmonisation;
- relationships to be completed later;
- legacy identifiers retained temporarily.

The handover package should not hide these under “known issues.”

For each exception, record:

- affected population;
- model objects;
- business impact;
- reason for acceptance;
- approving authority;
- owner;
- remediation plan;
- due date;
- monitoring method;
- closure evidence.

“Fix after go-live” is not an operational plan.

A useful statement is:

> 4,620 active supplier records use temporary classification `UNDER_REVIEW`. Procurement Data Operations owns remediation by 30 September. Records are available through report X and cannot bypass compliance approval.

The specificity matters.

## 8. Dataset and population evidence

AMS needs an initial understanding of the data it has inherited.

The package should include relevant baseline metrics:

- record counts;
- organisational coverage;
- completeness of critical attributes;
- duplicate populations;
- unmatched or exceptional values;
- unresolved quality issues;
- migrated versus newly governed records;
- key remediation populations.

SAP positions MDG as supporting rule definition, validation, data-quality monitoring and analysis of data-management performance.

The project should provide the starting baseline against which future quality trends can be interpreted.

Without a baseline, the support team cannot easily tell whether a problem:

- existed at go-live;
- was introduced by operations;
- appeared after a release;
- affects a known migration population;
- represents genuine deterioration.

## 9. Value lists and reference-data ownership

Value lists often appear simple until someone needs to change them.

The handover should explain:

- the active values;
- definitions;
- ownership;
- local variants;
- source-code mappings;
- inactive values;
- effective dates;
- consumers;
- approval process;
- deployment process.

For critical value lists, AMS should know:

- whether adding a code affects interfaces;
- whether reports require updates;
- whether old records must be converted;
- whether local values may be introduced;
- whether the list is owned inside or outside MDG.

A value-list change can be technically small and operationally broad.

## 10. Integration and replication inventory

The package should identify where governed data goes.

For each relevant integration, record:

- source object;
- target system;
- interface or API;
- trigger;
- frequency;
- relevant model objects;
- transformation ownership;
- error handling;
- monitoring;
- reconciliation;
- support owner;
- known constraints.

SAP distinguishes master-data governance from master-data integration: integration distributes data in its current state, while governance and quality controls determine the trusted state being distributed.

AMS needs to understand that distinction.

A record may be correct in MDG but fail in distribution.

Another record may replicate correctly while containing an incorrect governed value.

The handover should help support identify where the failure belongs.

## 11. Monitoring and operational reports

The package should explain which signals indicate that MDG is functioning correctly.

Examples include:

- change-request volumes;
- approval-cycle time;
- rejected requests;
- stalled workflows;
- validation failures;
- replication errors;
- duplicate candidates;
- data-quality scores;
- remediation backlog;
- mass-change results;
- interface reconciliation;
- unresolved exceptions.

For each report or monitor, include:

- purpose;
- data source;
- owner;
- expected frequency;
- relevant thresholds;
- escalation procedure;
- known false positives;
- actions expected from AMS or business stewards.

A dashboard without an operating response is only a display.

The receiving team should know what to do when a measure changes.

## 12. Security, roles and access model

The handover should describe:

- key technical and business roles;
- approval-role assignments;
- steward access;
- administrative access;
- emergency access;
- segregation-of-duties considerations;
- role-maintenance process;
- substitution process;
- access-review responsibility.

For workflow-driven governance, role problems frequently appear as process problems.

A request may be stuck because:

- an approver is missing;
- the role assignment is outdated;
- a substitution expired;
- organisational context is incorrect;
- the workflow resolved the wrong group.

AMS needs enough information to diagnose this without redesigning the authorisation model during an incident.

## 13. Known deviations between design and production

The package should state clearly where production differs from the approved target model.

Possible deviations include:

- temporary validation behaviour;
- missing workflow steps;
- local exceptions;
- configuration postponed to a later release;
- migration-only defaults;
- technical constraints;
- emergency corrections;
- inactive interfaces;
- unresolved performance workarounds.

For each deviation, include:

- intended state;
- production state;
- reason;
- risk;
- owner;
- approval;
- target resolution;
- review date.

A handover that presents production as perfectly aligned when it is not creates false confidence.

Known deviations are manageable.

Undocumented deviations become support incidents and audit findings.

## 14. Open defects and design debt

Do not hand over only the defect-management export.

Classify unresolved work by meaning.

Useful categories include:

- operational defect;
- data defect;
- configuration defect;
- integration defect;
- model ambiguity;
- missing decision;
- temporary workaround;
- technical debt;
- deferred enhancement;
- post-go-live remediation.

For every material item, AMS needs:

- affected model objects;
- business impact;
- workaround;
- priority;
- owner;
- dependency;
- expected resolution;
- evidence collected so far.

A closed project ticket does not necessarily mean the underlying model problem has been resolved.

The handover review should check whether defect closure updated:

- model definitions;
- rules;
- mappings;
- configuration;
- tests;
- operational documentation.

## 15. Test evidence and regression scope

AMS does not need every project test presented with equal importance.

It needs a usable regression foundation.

The package should identify:

- critical end-to-end scenarios;
- critical validation tests;
- workflow-routing tests;
- integration tests;
- role and security tests;
- mass-change tests;
- migration reconciliation evidence;
- known untested areas;
- required regression after common changes.

Test evidence should refer to:

- model baseline;
- production release;
- relevant context;
- test data;
- expected result;
- actual result.

This helps AMS understand which tests remain valid after a model change.

A folder containing 2,000 test cases is not the same as a maintainable regression pack.

## 16. Change-management process

The receiving team must know how the model may be changed after go-live.

The process should define:

- how a change is requested;
- which model objects are affected;
- who performs impact analysis;
- which owners approve;
- how configuration is updated;
- how mappings and integrations are reviewed;
- which tests are mandatory;
- how release evidence is recorded;
- how the approved model baseline changes.

This is especially important for changes that appear small:

- adding a value;
- changing optionality;
- adjusting a warning;
- introducing a local exception;
- replacing a source field;
- modifying workflow routing.

A production support process focused only on technical tickets will gradually disconnect configuration from the governed model.

## 17. Impact-analysis procedure

AMS should not need to invent impact analysis after the first change request.

The package should explain how to identify:

- affected attributes;
- mappings;
- rules;
- contexts;
- value lists;
- datasets;
- interfaces;
- reports;
- tests;
- existing records;
- owners.

For a critical field change, the team should be able to answer:

> What else becomes invalid or incomplete if we make this change?

This capability is more valuable than a static dependency diagram because the model will continue to evolve.

## 18. Decision register

The decision register should contain important model and governance decisions, not every project discussion.

For each decision, retain:

- issue;
- alternatives;
- selected option;
- rationale;
- evidence;
- affected objects;
- approvers;
- date;
- review condition.

Examples include:

- why a field is mandatory;
- why one source is authoritative;
- why several codes were merged;
- why a local exception exists;
- why a default was accepted;
- why an attribute was excluded;
- why a workflow step was added.

The decision register protects AMS from having to reconstruct intent from closed tickets and meeting recordings.

## 19. Operational runbooks

The handover package should include focused runbooks for recurring or high-risk procedures.

Examples include:

- stuck change-request investigation;
- replication failure;
- invalid-value correction;
- workflow substitution;
- mass-change execution;
- duplicate review;
- value-list change;
- role-assignment correction;
- data-quality exception;
- emergency configuration correction;
- post-release validation.

A runbook should contain:

- trigger;
- diagnostic steps;
- relevant objects;
- decision points;
- permitted actions;
- escalation;
- evidence to retain;
- rollback where applicable.

It should not pretend that every incident follows one exact script.

Its purpose is to give support a safe starting point.

## 20. Contact and escalation map

People remain part of the operating model.

The package should identify:

- business owners;
- data stewards;
- domain architects;
- SAP MDG technical owners;
- integration owners;
- source-system owners;
- security owners;
- compliance contacts;
- external support partners;
- escalation authority.

Avoid a static list of names without roles.

People change.

Roles should be durable, with current assignees maintained operationally.

For critical decisions, the team should know which role has authority—not merely who attended the original workshop.

## 21. Release and transport history

AMS should know which production behaviour arrived through which release.

Provide:

- release baseline;
- major model changes;
- associated transport or deployment references;
- known failed or partial deployments;
- emergency fixes;
- configuration differences by environment;
- post-deployment verification.

The objective is not to archive every technical movement.

It is to support questions such as:

- When did this rule change?
- Which release introduced the new value?
- Was the migration mapping updated at the same time?
- Which tests proved the deployed state?
- Does quality contain a later version than production?

## 22. A concise model overview for new team members

The handover package needs a short entry point.

A new AMS consultant should not begin with hundreds of files.

The overview should explain:

- the domains governed;
- key business entities;
- main workflows;
- important organisational contexts;
- major integrations;
- critical rules;
- known exceptions;
- model ownership;
- where deeper information is stored.

Keep this overview compact.

Its purpose is orientation, not full specification.

A good overview allows a new team member to understand the shape of the solution before exploring the details.

## What should not be treated as sufficient

Several artefacts are useful but cannot carry the handover alone.

### The solution-design document

It explains architecture but may not reflect the latest production changes.

### The configuration workbook

It describes implementation but may not explain business intent.

### The migration mapping

It explains initial data movement but not the full operational model.

### Jira history

It preserves discussion but does not present the current approved state.

### Test evidence

It proves selected behaviour but does not explain ownership or change control.

### Recorded knowledge-transfer sessions

They are difficult to search, validate and maintain.

### A folder of screenshots

Screenshots show a point-in-time interface but rarely preserve meaning or relationships.

The handover needs these artefacts connected around the current model.

## A minimum viable handover package

Not every project needs an enormous deliverable.

At minimum, we would expect:

1. Current approved model baseline.
2. Model-to-configuration references.
3. Business definitions and ownership.
4. Critical rules and workflow logic.
5. Source-to-target lineage for important fields.
6. Value lists and mapping logic.
7. Integration inventory.
8. Known deviations and exceptions.
9. Open remediation and design debt.
10. Data-quality baseline.
11. Operational monitoring and runbooks.
12. Regression-test scope.
13. Change and impact-analysis process.
14. Decision register.
15. Role-based escalation map.

This package should be navigable.

A receiving team should not need project-specific knowledge to find the relevant section.

## Handover should be tested through scenarios

Document review is not enough.

We recommend testing the handover with realistic operational scenarios.

Give the receiving team questions such as:

### Scenario 1

A customer cannot be approved because a tax field is blank.

Can the team identify:

- the applicable rule;
- affected context;
- business owner;
- valid exception;
- source or migration history;
- permitted correction?

### Scenario 2

A country asks for a new supplier classification value.

Can the team identify:

- value-list ownership;
- affected mappings;
- workflow impact;
- integration consumers;
- required regression tests;
- approval process?

### Scenario 3

A migrated record contains a suspicious default.

Can the team identify:

- which population received it;
- why it was accepted;
- remediation owner;
- related decision;
- reporting mechanism?

### Scenario 4

A downstream system rejects replicated records.

Can the team determine:

- whether the master record is valid;
- which interface transformed it;
- who owns the consumer;
- how reconciliation works;
- which model objects are involved?

If the team cannot resolve these scenarios using the handover package, knowledge transfer is not complete.

## Handover should be measured by independence

We use several practical indicators.

### Investigation independence

Can AMS investigate common incidents without the project team?

### Change independence

Can it assess and safely deliver a small model change?

### Ownership clarity

Can it identify the right business and technical owners?

### Evidence retrieval

Can it find the decision, rule and test supporting current behaviour?

### Deviation visibility

Does it know where production differs from the intended model?

### Remediation continuity

Can it continue unresolved data-quality work?

### Model continuity

Can it update the model without creating another parallel source of truth?

The goal is not zero questions after handover.

The goal is that questions no longer depend on private memory.

## The handover package should remain live

A handover package that is frozen on go-live day begins becoming obsolete immediately.

After go-live:

- rules change;
- owners change;
- value lists evolve;
- interfaces are revised;
- exceptions are closed;
- new defects reveal model problems;
- local requirements appear;
- releases alter configuration.

The receiving team needs a maintainable model repository, not only a historical archive.

We separate:

### Historical evidence

Approved project documents, test results, migration files and release records.

### Living operational model

Current attributes, rules, ownership, mappings, dependencies, exceptions and decisions.

Historical evidence explains how the programme reached go-live.

The living model explains how the system should be operated now.

## Where Martenweave fits

We built Martenweave around the problem that model knowledge is normally scattered across spreadsheets, datasets, tickets, validation reports, decisions, SAP context and project history. Its current public description positions it as a control layer that connects fields, attributes, rules, owners, issues and decisions, validates references, detects gaps and traces impact.

The current core includes:

- canonical Markdown and YAML model files;
- deterministic validation;
- generated SQLite and JSONL indexes;
- search and structured query;
- trace and impact analysis;
- dataset profiling and gap detection;
- health, ownership, audit and scorecard reports;
- CSV and XLSX review flows;
- PatchProposal-to-ChangeRequest lifecycle;
- issue drafts and GitHub-ready change bundles.

For handover, this means the project can transfer more than static documents.

It can transfer a validated model containing:

- attributes;
- contexts;
- source and target endpoints;
- mappings;
- rules;
- owners;
- issues;
- decisions;
- accepted deviations;
- datasets;
- change history.

Martenweave does not replace SAP MDG, Jira, Confluence, enterprise catalogues or operational support tools. The current project boundaries explicitly position it beside those systems rather than as their replacement.

## A Martenweave-based handover flow

```text id="mdg-handover-5"
Project evidence
Excel, Jira, datasets, reports and SAP context
                        ↓
              Canonical model objects
                        ↓
       Validation, lineage and impact analysis
                        ↓
      Operational reports and role-specific views
                        ↓
          AMS-owned change proposal process
                        ↓
            Maintained post-go-live model
```

The important transition is ownership.

During implementation, the project team maintains the model.

Before go-live, the AMS and governance teams begin reviewing changes.

After handover, the receiving organisation owns the approved baseline and change process.

## AI can help prepare handover, but not certify it

AI can assist by:

- extracting candidate rules from documentation;
- summarising closed decisions;
- linking issues to model objects;
- identifying conflicting definitions;
- drafting runbooks;
- finding objects without owners;
- proposing missing lineage;
- generating role-specific summaries.

This is useful because project evidence is large and fragmented.

But an AI-generated handover should not be accepted without review.

The source material may contain:

- obsolete designs;
- rejected proposals;
- temporary workarounds;
- contradictory tickets;
- incorrect assumptions;
- incomplete context.

AI may propose the structure.

Deterministic validators can check object references.

Architects, business owners and AMS must confirm that the resulting model describes production reality.

## What management should ask before accepting handover

A programme manager does not need to count documents.

We recommend asking:

1. Can AMS identify the current approved model baseline?
2. Can it connect critical attributes to production configuration?
3. Can it explain the main validation and workflow rules?
4. Does every critical rule have an owner?
5. Are migration defaults and exceptions visible?
6. Can migrated values be traced to their source treatment?
7. Are open remediation populations quantified and assigned?
8. Are integration and replication responsibilities clear?
9. Does AMS know where production differs from the intended design?
10. Can it assess the impact of a small model change?
11. Can it execute the critical regression scope?
12. Can it investigate common incidents without calling the project team?
13. Is there a process for keeping the model current after go-live?

If the answers rely on future knowledge-transfer sessions, handover is not complete.

## Common handover mistakes

### Starting documentation near go-live

By then, much of the reasoning has already been lost.

### Measuring handover by artefact count

More files can create more search and reconciliation work.

### Transferring technical configuration without business meaning

AMS can see what exists but cannot judge whether it is correct.

### Hiding unresolved exceptions in defect lists

Operational remediation needs explicit population, ownership and monitoring.

### Providing mappings without lineage

A source and target pair does not explain transformation or approval.

### Handing over outdated test evidence

Tests should refer to the production model and release baseline.

### Using recordings as the primary knowledge repository

Recordings are supporting evidence, not maintainable model documentation.

### Leaving model changes with the implementation partner

The client operating organisation should own its post-go-live model baseline.

### Treating handover as one event

Knowledge transfer should be exercised before go-live and maintained afterward.

## Our conclusion

An SAP MDG handover package should not be designed as a project archive.

It should be designed as an operating system for the receiving team.

The archive answers:

> What did the project produce?

The handover must also answer:

> How does the governed model work now, why does it work this way and how can we change it safely?

That requires:

- an approved model baseline;
- business definitions;
- configuration references;
- ownership;
- rules and workflows;
- lineage;
- data-quality evidence;
- exceptions;
- integrations;
- tests;
- decisions;
- runbooks;
- change control.

Our practical test is simple:

> Can the receiving team investigate an incident, explain a critical value and assess a small model change without contacting the original project team?

If not, the programme has transferred files but retained the knowledge inside people.

A successful handover moves the model knowledge with the operational responsibility.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We work on practical model governance for SAP migration, MDG, MDM and AMS programmes. We focus on helping teams preserve model meaning, lineage, ownership and decision history so that operational support does not begin with another discovery project.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a governance layer supporting governed models, golden records, profiling, matching and consolidation, collaborative workflows, validated values, data-quality monitoring, mass changes and auditable data changes. SAP also distinguishes master-data governance from the integration layer that distributes master data to consuming applications.

Martenweave’s current public product description explains that it turns knowledge from spreadsheets, datasets, tickets, validation reports, decisions and SAP context into structured, validated and traceable model objects.

The current core includes canonical files, deterministic validation, generated indexes, search, trace and impact analysis, dataset profiling, reports, spreadsheet review flows and controlled PatchProposal and ChangeRequest lifecycles.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
