# Martenweave vs Excel, Jira and Confluence

**Reviewed: 14 July 2026**

The programme already has an approved toolset.

Excel stores the mappings.

Jira tracks open questions, defects and changes.

Confluence contains the design, workshop notes and architecture decisions.

No one wants another platform.

Then a target field changes.

The MDG team updates configuration. The migration team edits the mapping workbook. A Jira issue records the requested change. Confluence still describes the previous rule. One country works from an older Excel export. The latest dataset contains source values that do not appear in the approved mapping.

Every required piece of information exists somewhere.

The programme still cannot answer a simple question:

> What is the currently approved model, and what else is affected by this change?

This is the problem Martenweave is intended to address.

It is not a replacement for Excel, Jira or Confluence.

Each of those tools solves an important part of programme delivery:

- Excel is effective for tabular analysis, bulk review and familiar business collaboration.
- Jira is effective for tracking work, issues, ownership and workflow.
- Confluence is effective for narrative documentation, shared knowledge and collaborative context.

Microsoft currently presents Excel as a collaborative spreadsheet for analysing, organising and sharing data. Atlassian positions Jira as project and work management, while Confluence is positioned as a workspace for ideas, documents, knowledge and team collaboration.

The limitation is not that these tools are weak.

The limitation is that none of them is naturally responsible for maintaining a validated network of model objects across the full SAP delivery lifecycle.

Martenweave adds that missing control layer.

## The wrong question is “Which tool should we replace?”

Tool comparisons often begin with feature competition:

- Can Martenweave store tables like Excel?
- Can it manage issues like Jira?
- Can it publish documents like Confluence?
- Can AI search all of them?

These questions lead the product in the wrong direction.

Martenweave should not try to become a better spreadsheet, issue tracker or enterprise wiki.

Those are mature categories with broad functionality and established user behaviour.

The more useful question is:

> Which type of information should be authoritative in each tool?

Our answer is:

```text id="tool-boundary-1"
Excel:
Review, bulk editing and exchange

Jira:
Work, defects, ownership and delivery status

Confluence:
Narrative explanation and shared documentation

Martenweave:
Canonical model objects, relationships, validation and controlled model change
```

The tools can work together when their responsibilities remain clear.

Problems begin when each tool contains a separate interpretation of the model.

## What Excel does well

Excel remains one of the most practical tools in SAP migration and MDM programmes.

That is not an accident.

A spreadsheet allows teams to:

- review hundreds of mappings quickly;
- filter by domain, country, status or owner;
- compare source and target fields;
- add comments;
- sort and group data;
- work offline;
- exchange information with vendors;
- use formulas and lookups;
- prepare bulk uploads;
- present information in a format business users already understand.

Microsoft also emphasises spreadsheet collaboration, data analysis and sharing as core Excel capabilities.

For many small and medium-sized mapping exercises, Excel is sufficient.

The problem is not the presence of Excel.

The problem is assigning Excel responsibilities it cannot perform reliably without substantial custom control.

## Where Excel begins to break down

A mapping workbook normally treats each row as the complete representation of a model relationship.

A row might contain:

```text id="tool-boundary-2"
Source system
Source field
Target field
Transformation
Status
Owner
Comment
```

As complexity grows, the row starts representing several distinct objects:

- business attribute;
- source endpoint;
- target endpoint;
- organisational context;
- mapping;
- transformation;
- value list;
- value mapping;
- validation rule;
- owner;
- decision;
- evidence.

These objects have different lifecycles.

A business attribute may remain stable while the source system changes.

A target endpoint may be replaced while the business meaning remains the same.

A transformation may change without changing the mapping.

One rule may apply to several mappings.

One value list may be used by several fields.

The spreadsheet row compresses these differences into columns.

That is convenient for review and increasingly difficult for model control.

## Excel has no natural stable object identity

Most workbooks identify information through:

- row numbers;
- worksheet names;
- combinations of source and target text;
- manually assigned IDs;
- file names.

These references become fragile when:

- rows move;
- worksheets are copied;
- names change;
- local versions are created;
- files are merged;
- fields are renamed;
- one mapping is split into several mappings.

A stable model object should survive changes in presentation.

For example:

```text id="tool-boundary-3"
Attribute:
ATTR-CUSTOMER-SALES-GROUP

Source endpoint:
FEP-CRM-CUSTOMER-SEGMENT

Target endpoint:
FEP-SAP-KNVV-KDGRP

Mapping:
MAP-CUSTOMER-SEGMENT-0042
```

Excel can display these identifiers.

It is not naturally responsible for validating all relationships between them.

## Excel does not reliably distinguish canonical data from a copy

A programme may have:

- global mapping workbook;
- country workbook;
- migration-vendor copy;
- business-review export;
- UAT version;
- corrected version;
- final version;
- final version 2.

SharePoint or OneDrive versioning improves file control.

It does not automatically resolve semantic divergence between several workbooks that were all intentionally created.

The programme must still decide:

- Which file is canonical?
- Which files are generated views?
- Which copies may propose changes?
- How are local changes brought back?
- What happens when two versions conflict?
- Which version was used for testing?

Martenweave does not remove the need for spreadsheets.

It makes the spreadsheet a review and exchange surface rather than the only model authority.

## What Jira does well

Jira is highly effective for managing units of work.

In an SAP MDG or migration programme, teams can use it to track:

- open requirements;
- mapping questions;
- defects;
- configuration work;
- business decisions;
- migration gaps;
- test failures;
- change requests;
- technical debt;
- post-go-live remediation.

It gives the programme:

- ownership;
- status;
- prioritisation;
- comments;
- attachments;
- workflow;
- reporting;
- audit history;
- links between issues.

Atlassian positions Jira around project and work management, which is consistent with this role.

Jira should remain the system that answers:

> What work needs to happen, who owns it and where is it in the delivery process?

## Where Jira begins to break down

An issue is not the same thing as a model object.

Consider a ticket:

> Make Customer Group mandatory for Germany.

The issue can track:

- requester;
- assignee;
- priority;
- discussion;
- implementation status;
- approval;
- release.

It does not automatically know that the change affects:

- a business attribute;
- a sales-area context;
- three legacy source fields;
- two value mappings;
- one migration default;
- a validation rule;
- an outbound interface;
- 12,000 existing records;
- seven regression tests.

These relationships can be added manually through links and custom fields.

As the model grows, the issue tracker begins carrying an indirect representation of the architecture.

The issue remains centred on the lifecycle of work.

The model needs to remain centred on the lifecycle of the object.

## Tickets close, but model objects remain

A Jira issue may be closed after:

- configuration is changed;
- a defect is fixed;
- a business decision is made;
- a workaround is accepted.

The affected attribute, mapping or rule remains active for years.

If the approved outcome exists only inside the closed issue, future teams must search ticket history to reconstruct the current model.

This creates a common pattern:

```text id="tool-boundary-4"
Open issue
→ discussion
→ technical change
→ issue closed
→ model decision remains buried in issue history
```

A better pattern is:

```text id="tool-boundary-5"
Open issue
→ discussion
→ approved model decision
→ canonical model updated
→ implementation verified
→ issue closed
```

Jira keeps the work history.

Martenweave keeps the approved model result.

## Jira status is not model readiness

A mapping issue may be marked Done.

That can mean:

- source and target fields were identified;
- the transformation was written;
- business approval was received;
- code was implemented;
- testing passed.

These are different states of model readiness.

Jira can represent them through workflow design, but a project workflow is not necessarily the best representation of every model object’s lifecycle.

Martenweave can maintain object-level states such as:

- proposed;
- defined;
- approved;
- validated;
- implemented;
- tested;
- retired.

The corresponding Jira issue can still track the delivery work required to move between those states.

## What Confluence does well

Confluence is useful where narrative and collaborative explanation matter.

Atlassian currently presents it as a workspace for ideas, documents and knowledge, with pages, live documents, whiteboards, databases, search and integrations.

In an SAP programme, Confluence can contain:

- architecture explanations;
- domain overviews;
- workshop outcomes;
- design principles;
- decision summaries;
- operating procedures;
- onboarding material;
- meeting notes;
- handover guidance;
- links to related project systems.

It is well suited to answering:

> What does this area mean, and how should a person understand or use it?

That is a necessary capability.

A model registry should not try to replace good explanatory documentation with raw object files.

## Where Confluence begins to break down

Narrative documentation is flexible because its structure is loose.

That flexibility makes it difficult to validate automatically.

A Confluence page may state that:

- an attribute is mandatory;
- a country exception exists;
- a mapping changed;
- a value list contains eight codes.

The platform does not inherently know whether:

- another page contradicts the statement;
- the target endpoint still exists;
- a mapping references the previous version;
- the latest dataset supports the requirement;
- the rule has an owner;
- the decision has expired;
- tests refer to the new state;
- production configuration matches the page.

Confluence can contain the information.

It does not automatically convert the information into a validated model.

## Pages can remain readable while becoming obsolete

A well-written architecture page can remain convincing long after production behaviour changes.

The page structure does not visibly break when:

- configuration changes;
- migration mappings are revised;
- a value is added;
- a local exception is approved;
- an interface is replaced.

This is a subtle risk.

Broken code usually produces an error.

Broken documentation often continues looking correct.

A structured model can at least detect certain classes of inconsistency:

- broken references;
- missing owners;
- duplicate IDs;
- retired endpoints still in use;
- mappings without context;
- rules referring to missing attributes.

It cannot prove that the business meaning is correct.

It can make structural drift visible.

## Confluence pages should explain the model, not become the model

We prefer to generate or maintain role-specific documentation from controlled model objects where practical.

For example, a Confluence page may explain a supplier classification:

- business purpose;
- examples;
- process context;
- ownership;
- operating guidance.

Martenweave may store the structured elements:

- attribute identifier;
- value-list reference;
- contexts;
- mapping relationships;
- validation rule;
- affected endpoints;
- decision history.

The page remains readable.

The model remains queryable and validatable.

The relationship is:

```text id="tool-boundary-6"
Martenweave:
Structured approved model

Confluence:
Human-readable explanation and collaboration
```

Neither layer replaces the other.

## The central distinction: documents, work and model truth

The tools can be separated by the primary question they answer.

| Tool | Primary question |
|---|---|
| Excel | How can we review, calculate, filter or exchange this tabular information? |
| Jira | What work is required, who owns it and what is its status? |
| Confluence | What should people understand about this topic? |
| Martenweave | What model objects exist, how are they related, and is the represented model structurally consistent? |

The distinction is not absolute.

Excel can contain documentation.

Jira can contain model fields.

Confluence can contain databases.

Martenweave can produce reports and review tables.

The primary responsibility should still remain clear.

## What Martenweave adds

Martenweave’s current public description presents it as a practical model-control layer for knowledge scattered across spreadsheets, datasets, tickets, validation reports, decisions, SAP context and project history. It connects fields, attributes, rules, owners, issues and decisions, validates references, detects gaps and traces impact.

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

These capabilities add several things that the existing tool stack does not naturally provide as one controlled model layer.

## 1. Canonical model objects

Martenweave separates:

- attributes;
- source endpoints;
- target endpoints;
- mappings;
- contexts;
- rules;
- value lists;
- decisions;
- issues;
- ownership.

These objects can be displayed together in Excel while remaining distinct in the canonical model.

## 2. Stable identifiers

The same model object can be referenced from:

- Excel exports;
- Jira issues;
- Confluence pages;
- datasets;
- validation reports;
- tests;
- change requests.

This reduces dependence on names and row positions.

## 3. Deterministic validation

The model can be checked for structural problems such as:

- missing references;
- duplicate identifiers;
- invalid object relationships;
- mappings without endpoints;
- references to retired objects;
- missing required metadata.

The current project documentation explicitly lists deterministic validation as a core capability.

## 4. Dataset-to-model comparison

Martenweave can compare actual CSV or XLSX datasets with model expectations.

This helps identify:

- missing columns;
- unexpected columns;
- incomplete source coverage;
- uncovered values;
- structural gaps;
- differences between datasets and approved mappings.

Excel can profile a dataset with sufficient effort.

Martenweave connects the result directly to the relevant model objects.

## 5. Lineage and impact analysis

The model can support paths such as:

```text id="tool-boundary-7"
Legacy field
→ mapping
→ business attribute
→ SAP target field
→ validation rule
→ decision
```

It can also support the reverse question:

> Which mappings, datasets, rules and tests may be affected if this attribute changes?

Jira issue links and Confluence references can support parts of this manually.

Martenweave treats these dependencies as core model relationships.

## 6. Controlled model proposals

A spreadsheet import, Jira issue or AI analysis should not silently change the approved model.

Martenweave’s proposal lifecycle allows a candidate change to be:

- represented;
- validated;
- reviewed;
- approved or rejected;
- converted into a controlled change request.

This is particularly important when AI is used to extract or suggest mappings.

## The comparison in practical terms

| Capability | Excel | Jira | Confluence | Martenweave |
|---|---:|---:|---:|---:|
| Bulk tabular review | Strong | Limited | Moderate | Via generated review views |
| Calculations and ad hoc analysis | Strong | Limited | Limited | Focused model analysis |
| Work assignment and workflow | Limited | Strong | Moderate | Model change lifecycle only |
| Narrative documentation | Limited | Limited | Strong | Structured content and generated reports |
| Stable model-object identity | Manual | Possible through customisation | Manual | Core |
| Deterministic reference validation | Custom | Not model-specific | Not model-specific | Core |
| Source-to-target lineage | Manual | Issue-link based | Document-link based | Core |
| Dataset-to-model gap detection | Custom | No | No | Core |
| Model impact analysis | Manual | Issue dependency based | Manual | Core |
| Canonical model baseline | Possible but fragile | Not primary purpose | Possible as documents | Core |
| AI change proposals with review boundary | Custom | Work-item based | Content based | Core product principle |
| Operational master-data governance | No | No | No | No |

The last row matters.

Martenweave is not an MDM platform and does not replace SAP MDG.

Its own documented boundaries also state that it is not a workflow engine, generic data catalogue or replacement for Jira, Confluence or enterprise platforms.

## How the tools should work together

A practical operating model can preserve each tool’s strengths.

## Excel as the business-review interface

The programme exports a mapping or attribute view from Martenweave.

Business and migration teams review it in Excel.

The export contains stable identifiers and a model-baseline reference.

Reviewers may propose:

- definition corrections;
- ownership changes;
- mapping changes;
- new local exceptions;
- value translations.

The reviewed workbook is imported as a proposal.

Martenweave validates the changes and displays the difference.

Approved changes update the canonical model.

A new Excel view is generated.

Excel remains part of the daily workflow without becoming a detached source of truth.

## Jira as the work-management interface

A detected model or dataset gap can create a Jira-ready issue draft.

The issue contains:

- clear goal;
- affected model objects;
- scope;
- evidence;
- acceptance criteria;
- validation requirement.

The team performs the work through Jira.

When the issue is resolved, the approved result updates or confirms the model.

Martenweave retains the relationship between the closed work item and the current model state.

Jira answers what happened operationally.

Martenweave answers what became true in the model.

## Confluence as the explanation interface

A domain page in Confluence can explain:

- purpose;
- architecture;
- governance model;
- process;
- key concepts;
- operating guidance.

The page can reference generated model reports or stable object identifiers.

When structured facts change, the programme knows which explanatory pages may require review.

Confluence remains the place where people learn and collaborate.

It does not need to perform structural model validation.

## Example: a new supplier classification

The business requests a new supplier classification called `UNDER_REVIEW`.

### In Confluence

The team explains:

- business purpose;
- stewardship process;
- when the classification should be used;
- how it should be cleared.

### In Jira

The programme tracks:

- business approval;
- MDG configuration;
- migration updates;
- integration changes;
- testing;
- deployment.

### In Excel

Business users review:

- source codes;
- target values;
- affected countries;
- proposed mappings;
- existing record populations.

### In Martenweave

The programme maintains:

- the classification attribute;
- value-list object;
- value definition;
- contexts;
- source mappings;
- workflow-rule dependency;
- affected interfaces;
- dataset evidence;
- approved decision;
- model-change history.

Each tool contributes.

No tool is forced to become something it was not designed to be.

## Example: a missing source field

A migration dataset does not contain a field required by the approved target model.

### Excel

The missing column may be noticed during manual review or profiling.

### Jira

A gap issue is assigned to the source-system owner.

### Confluence

The target requirement and business rationale are explained.

### Martenweave

The gap is connected directly to:

- expected source endpoint;
- target attribute;
- mapping;
- applicable context;
- dataset version;
- affected population;
- decision status.

When the source field is added or an alternative treatment is approved, the model and evidence are updated.

The issue can close without losing the final treatment.

## Example: changing a validation rule

A country asks for a mandatory rule to become optional.

### Jira

Tracks the request and implementation work.

### Confluence

Contains the policy explanation and local operating guidance.

### Excel

May be used to review affected records and completeness.

### Martenweave

Performs the model-level work:

- identifies the attribute and context;
- traces source and target mappings;
- identifies datasets and affected populations;
- finds related value lists and decisions;
- shows downstream rule dependencies;
- creates a reviewable model proposal.

The MDG team still performs the actual SAP configuration change.

## Why not build all of this in Jira?

A sufficiently customised Jira environment can represent model objects, dependencies, approval workflows and structured fields.

That does not mean it is the best architectural choice.

The organisation would need to design and maintain:

- custom issue types;
- custom fields;
- object schemas;
- validation logic;
- dependency semantics;
- dataset profiling;
- indexing;
- model exports;
- baseline comparison;
- specialist automation.

The result risks becoming a model registry implemented indirectly through issue records.

Jira should remain optimised for units of work.

A business attribute should not need to remain an open issue to exist as a model object.

## Why not build all of this in Confluence?

Confluence can contain structured templates, databases and linked pages. Atlassian also positions it as a connected knowledge workspace with multiple content types and integrations.

A disciplined Confluence implementation can document a substantial model.

The challenge is maintaining:

- strict object identity;
- reference integrity;
- deterministic validation;
- dataset comparison;
- reproducible indexes;
- machine-readable change proposals;
- model baselines;
- impact traversal.

These requirements push Confluence away from narrative knowledge management and toward a custom application built on pages and macros.

Confluence should explain the model.

It should not need to become the validation engine for it.

## Why not stay only with Excel?

For a small project, this may be the correct decision.

A disciplined workbook can provide enough control when:

- one domain is involved;
- there are few sources;
- mappings are simple;
- local variation is limited;
- the team is stable;
- changes are infrequent;
- handover risk is low.

The question is not whether Excel is professional enough.

The question is whether the model has outgrown a file-centred representation.

Warning signs include:

- several mapping workbooks need reconciliation;
- one field appears differently across countries;
- impact analysis takes days;
- old mapping approvals cannot be connected to the current target;
- model decisions live in closed tickets;
- new datasets repeatedly reveal unknown gaps;
- only one consultant understands the relationships;
- AI cannot be trusted because the source context conflicts.

At this point, adding more columns and governance tabs may postpone the problem without resolving it.

## When the existing stack is enough

Martenweave should not be introduced only because a programme uses Excel, Jira and Confluence.

The existing stack may be sufficient when the team can already answer:

- What is the approved model?
- Which source and target fields represent each critical attribute?
- Which values are valid?
- Which local exceptions exist?
- Which dataset supports the mapping?
- What is affected by a model change?
- Who owns each rule?
- Which decision produced the current state?
- Can AMS maintain this knowledge after go-live?

If these answers are reliable and inexpensive to obtain, a new model layer may add unnecessary complexity.

## When Martenweave becomes justified

Martenweave becomes more useful when:

- the model spans several source systems;
- the programme covers several countries;
- field and value mappings change frequently;
- target design and configuration diverge;
- repeated migration waves reuse the same knowledge;
- important decisions are buried in tickets;
- datasets need continuous gap checks;
- impact analysis is manual;
- handover depends on key individuals;
- several vendors maintain separate artefacts;
- AI-assisted model work is being introduced.

The business case should be based on reduced reconstruction and rework, not on replacing software licences.

## A sensible adoption pattern

Do not begin by importing the entire project archive.

Select one painful scenario.

For example:

- one domain;
- one active Excel mapping;
- one representative dataset;
- recent Jira issues;
- one Confluence design page;
- 30–100 critical attributes;
- several high-risk rules.

The pilot should prove that the team can:

1. Create stable model objects.
2. Import or connect existing mappings.
3. Validate references.
4. Compare a dataset with the model.
5. Identify missing coverage.
6. Trace one field from source to SAP target.
7. Analyse the impact of one rule change.
8. produce a reviewable Excel view.
9. prepare a Jira-ready issue.
10. preserve the approved result independently from the issue and document.

The success measure is not how much information was imported.

It is whether the team can answer a previously expensive question faster and with better evidence.

## Avoid creating a fourth disconnected tool

Martenweave will fail if it becomes another place where users manually copy the same information.

The integration principle should be:

```text id="tool-boundary-8"
Do not duplicate the full artefact.
Store the model object and the relationship.
Link or generate the appropriate view.
```

For example:

- do not copy the full Jira discussion into Martenweave;
- store the issue reference and approved model outcome;
- do not reproduce a whole Confluence architecture page;
- store the structured model objects and link the explanation;
- do not maintain another manually edited Excel copy;
- generate and re-import controlled review views.

The product earns its place only when it reduces reconciliation.

## AI makes the boundary more important

Modern Excel, Jira and Confluence offerings increasingly include AI-assisted functionality, including spreadsheet assistance, content search, summaries and work automation.

That does not remove the need for model control.

AI can help find and summarise information across tools.

It still needs to distinguish:

- approved and rejected decisions;
- current and obsolete mappings;
- global and local contexts;
- business attributes with similar names;
- implementation state and proposed state.

Searching fragmented knowledge faster is useful.

It does not automatically make the knowledge consistent.

Martenweave’s role is to provide the structured and validated context against which AI suggestions can be reviewed.

The rule remains:

> AI may propose a mapping, relationship or model change. It should not silently decide which artefact represents the approved truth.

## Our conclusion

Excel, Jira and Confluence are not competitors that Martenweave needs to defeat.

They are part of the environment in which Martenweave needs to work.

Excel is effective for tabular review and exchange.

Jira is effective for managing work and issues.

Confluence is effective for explaining and sharing knowledge.

The missing layer appears when the programme needs to maintain:

- stable model objects;
- explicit relationships;
- deterministic validation;
- dataset alignment;
- lineage;
- impact analysis;
- controlled model changes;
- durable handover knowledge.

Martenweave should own that layer and nothing more.

Our practical test is:

> Can the programme identify the current approved model without manually reconciling spreadsheets, ticket histories and documentation pages?

If the answer is yes, the current stack may already be enough.

If the answer is no, Martenweave provides a way to connect those tools without replacing the work they already perform well.

The objective is not fewer tools.

It is fewer competing truths.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We build practical model-governance infrastructure for SAP migration, MDG, MDM and AMS teams. Our goal is not to replace the collaboration tools teams already use. It is to provide the validated model layer that keeps mappings, datasets, decisions and changes coherent across them.

## Sources and notes

This article was reviewed on 14 July 2026.

Microsoft currently presents Excel as an online collaborative spreadsheet product for analysing, organising, editing and sharing data.

Atlassian currently positions Jira as a project and work-management product and Confluence as a workspace for documents, knowledge and collaboration.

Martenweave’s current public documentation describes it as a practical model-control layer that connects fields, attributes, rules, owners, issues and decisions and supports deterministic validation, dataset-gap detection, traceability, impact analysis and reviewable PatchProposals.

The current open-source core includes canonical model files, generated indexes, search, structured queries, trace and impact analysis, dataset profiling, reports, spreadsheet review flows and the PatchProposal-to-ChangeRequest lifecycle.

Martenweave’s documented boundaries state that it is not a workflow engine, generic data catalogue or replacement for SAP MDG, Jira, Confluence or enterprise platforms.

Martenweave is an independent project and is not affiliated with or endorsed by Microsoft, Atlassian or SAP. Excel and Microsoft 365 are trademarks of Microsoft. Jira and Confluence are trademarks of Atlassian. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
