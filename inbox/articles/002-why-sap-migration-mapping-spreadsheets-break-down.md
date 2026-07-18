# Why SAP Migration Mapping Spreadsheets Break Down

**Reviewed: 14 July 2026**

Most SAP migration programmes begin with a mapping spreadsheet.

This is not a mistake.

A spreadsheet is quick to create, familiar to business and technical teams, easy to filter and simple to exchange with an implementation partner. During early discovery, it may be the most practical place to record legacy columns, SAP target fields, transformation notes and open questions.

The problem begins when the spreadsheet quietly becomes more than a working document.

It becomes the model specification, decision log, issue register, value-mapping repository, test catalogue, migration status report and historical record of the programme—all at the same time.

At that point, the team is no longer managing a spreadsheet. It is trying to operate a model-governance system through rows, comments, colours and file versions.

We have seen the pattern repeatedly: the workbook continues to look structured while the knowledge behind it becomes increasingly difficult to validate, trace and change safely.

The issue is not Excel itself. The issue is the amount of responsibility assigned to a document that was never designed to carry the complete implementation model.

## A mapping workbook usually starts well

At the beginning of a migration, the task appears straightforward.

For every source field, the team records:

- the source system;
- the source table or file;
- the source column;
- the target SAP object;
- the target field;
- a transformation rule;
- perhaps an owner and a status.

For a small domain, this may work perfectly well.

A workbook with 40 fields, one source system and one target context can remain understandable throughout the project. The team knows each other. Decisions are made quickly. Most exceptions can be explained in a short note.

This is why we do not argue that every spreadsheet should immediately be replaced by a platform.

The operating model changes when the programme introduces:

- several source systems;
- several countries;
- global and local requirements;
- different SAP organisational contexts;
- repeated migration waves;
- evolving target design;
- value mappings;
- conditional mandatory fields;
- data-quality rules;
- several consulting teams;
- formal approvals;
- testing evidence;
- post-go-live support requirements.

The workbook grows, but the problem grows faster than the number of rows.

## One row begins carrying several different meanings

A typical migration row may appear to describe one mapping:

```text
Legacy customer class → SAP customer group
```

In practice, that row can contain several separate model decisions:

- the business meaning of customer classification;
- the legacy system in which it exists;
- the physical source column;
- the applicable country;
- the applicable sales area;
- the SAP target field;
- the transformation rule;
- the value mapping;
- the defaulting behaviour;
- the treatment of blank values;
- the responsible business owner;
- the approval decision;
- the validation rule;
- the migration-wave status.

These elements have different lifecycles.

The business definition may remain stable while the source column changes. The SAP endpoint may remain stable while the value mapping changes. One country may approve a local exception while the global definition remains untouched.

A spreadsheet row tends to compress these separate objects into one visual unit. That makes the document easy to read initially, but difficult to maintain precisely.

When one part changes, the team has to determine manually which other parts of the row still remain valid.

## Context is usually stored as prose

SAP master data is highly contextual.

A customer attribute may apply:

- centrally;
- by company code;
- by sales area;
- by partner function;
- by country;
- by business process.

A supplier attribute may vary by purchasing organisation or company code. A material attribute may apply at basic-data, plant, storage-location, sales or valuation level.

The mapping workbook often represents this through:

- a free-text context column;
- comments;
- different worksheet tabs;
- repeated rows;
- colour coding;
- naming conventions understood by the current team.

That works until someone needs to answer a precise question:

> Does this rule apply to every sales area, only to one country, or only to records created through a particular process?

If the context is not represented as a structured relationship, the answer depends on interpretation.

This creates two common errors.

First, genuinely different requirements are combined because they use the same field name.

Second, identical requirements are duplicated because they appear in different tabs or project streams.

Both errors increase review effort and make later impact analysis unreliable.

## Field names are not stable identifiers

Most mapping workbooks identify objects by labels:

- Customer Group;
- Tax Number;
- Partner Function;
- Payment Terms;
- Material Status.

Labels are useful for people. They are weak identifiers for a model.

The same label may refer to different contexts. Different labels may refer to the same business concept. A name may change after a design workshop while the underlying attribute remains the same.

Physical fields create another problem.

A target such as `KNVV-KDGRP` may be unambiguous to an SAP specialist, but the business meaning still depends on context and intended use. The same business attribute may also appear in an interface model, an MDG entity, a migration template and a validation report under different names.

Without stable object identifiers, relationships are maintained through text matching and team memory.

This makes automated validation difficult. It also makes it harder to connect mappings to tickets, decisions, datasets and test evidence.

## The workbook describes the expected data, not necessarily the available data

A mapping workbook is usually design-driven.

It describes what the source-to-target transformation is supposed to be.

The actual migration dataset may tell a different story:

- the expected column is absent;
- the column uses a different name;
- the data type differs;
- mandatory values are blank;
- unexpected codes appear;
- a reference value has no mapping;
- a field exists only for some countries;
- the source extract contains columns not represented in the model.

These gaps are often discovered manually during file reviews or during mock-load preparation.

SAP itself recommends curating master data early, before an S/4HANA implementation, because the value of the target processes depends heavily on clean and correct master data.

However, a spreadsheet does not automatically prove that the current dataset matches the approved model.

A mapping row can be marked “complete” while:

- the source field is unavailable;
- the transformation has never been tested;
- the value mapping covers only part of the data;
- the target requirement has changed;
- the relevant source extract belongs to another wave.

This is one reason mapping completion and migration readiness should not be treated as the same metric.

## Status columns create an illusion of control

Most programmes eventually add a status column:

- Open;
- In progress;
- Mapped;
- Approved;
- Tested;
- Complete.

The status appears objective, but its meaning is often unclear.

What does “Approved” mean?

- The business definition was approved?
- The target field was approved?
- The transformation was approved?
- The value mapping was approved?
- The migration dataset was checked?
- The rule was configured in MDG?
- The scenario passed testing?

A single status cannot reliably represent several independent states.

This leads to false progress reporting.

A workbook may show 95% completion while many rows still contain:

- unresolved local requirements;
- incomplete value mappings;
- missing source data;
- untested default logic;
- undocumented exceptions;
- decisions awaiting confirmation.

The percentage is mathematically correct according to the selected column. It is operationally misleading.

## Decisions are separated from the objects they affect

Important mapping decisions are rarely made inside the spreadsheet alone.

They emerge from:

- design workshops;
- emails;
- Jira discussions;
- defect analysis;
- calls with local business teams;
- data profiling;
- MDG configuration reviews;
- migration test results.

The workbook usually preserves only the final instruction:

> Map value A to value B.

It may not preserve:

- why the decision was made;
- who approved it;
- which alternatives were rejected;
- which evidence supported it;
- whether it is temporary;
- which countries or systems it applies to;
- which downstream objects depend on it.

A comment such as “confirmed with business” is not a durable decision record.

Six months later, a new architect may see the rule and reasonably question it. The team then repeats part of the original analysis because the decision cannot be reconstructed confidently.

This is expensive not because the question is complex, but because the evidence has become detached from the model.

## Version control becomes social rather than technical

Mapping workbooks often acquire names such as:

```text
Customer_Mapping_Final_v7_Approved_Updated.xlsx
```

The file name is doing work that should be handled by a controlled change process.

Teams try to manage this through SharePoint, Teams or document repositories. These tools can preserve file versions, but they do not necessarily explain the model-level difference between two versions.

A document history may tell us that a file changed on Tuesday.

It may not tell us:

- which mapping objects changed;
- which fields were added;
- which transformation rules were removed;
- whether a value list changed;
- which dependencies are now affected;
- which approval is required.

The result is a manual comparison exercise.

People compare worksheets, highlight cells and send summaries through email. That process works until several teams modify the workbook in parallel.

At that point, version control becomes a negotiation between people:

- Which copy is current?
- Whose updates should be retained?
- Was the local-country version merged?
- Did the approved rule survive the latest update?
- Was the test team using the same version?

## Impact analysis becomes a meeting

Suppose the project changes one SAP target attribute.

The team needs to identify:

- source fields feeding it;
- transformation logic;
- value mappings;
- country variants;
- migration datasets;
- validation rules;
- test cases;
- interfaces;
- reports;
- related decisions;
- affected owners.

In a spreadsheet-based model, these relationships may exist implicitly across multiple tabs and documents.

The impact analysis therefore takes the form of:

1. searching the workbook;
2. asking subject-matter experts;
3. checking Jira;
4. reviewing design documents;
5. comparing test cases;
6. contacting local teams;
7. preparing another spreadsheet with the results.

The team may eventually produce the correct answer. The process remains slow and difficult to reproduce.

For critical changes, meetings are appropriate. The problem is when the meeting is required simply to reconstruct relationships the project already knew.

## Multiple workbooks create multiple truths

Large programmes rarely have only one mapping workbook.

They may have separate files for:

- Customer;
- Supplier;
- Business Partner;
- Material;
- Finance;
- countries;
- migration waves;
- interfaces;
- value mappings;
- validation rules;
- defects.

The files may share concepts without sharing structure.

A country workbook may override a global rule. A value-mapping file may use different target labels. A defect workbook may introduce a workaround that never reaches the main mapping.

This is where the phrase “single source of truth” becomes misleading.

The organisation may have designated one file as the official source. Operationally, the real truth is distributed across all the places where decisions continue to be made.

Declaring one workbook authoritative does not make all other knowledge disappear.

The task is to connect the knowledge and control how approved changes enter the model.

## Testing exposes the limitations late

During testing, the project starts asking questions the mapping workbook was not built to answer:

- Which rules have test coverage?
- Which attributes were tested with representative data?
- Which country exceptions remain untested?
- Which failed tests indicate a data problem?
- Which failures indicate a model problem?
- Which defects changed an approved mapping?
- Which dataset version was used?
- Which evidence supports cutover approval?

Teams often add more columns or create new worksheets.

This increases the amount of information but not necessarily the quality of the relationships.

A test case number in a cell does not prove that the test covers the intended rule. A defect number does not reveal which other mappings may be affected by the correction.

The workbook continues to expand because every new project concern is represented as another column.

Eventually, it becomes difficult to distinguish between:

- model structure;
- delivery status;
- historical notes;
- temporary analysis;
- operational evidence.

## Handover is where the real cost becomes visible

While the original team is present, fragmented knowledge can remain usable.

People know:

- which tabs matter;
- which comments are obsolete;
- which exceptions are intentional;
- which business owner approved a workaround;
- which file should be ignored;
- which transformation was implemented differently from the specification.

After go-live, that context starts disappearing.

The AMS team receives the files but not always the mental model required to interpret them.

The team may know that a field is mapped. It may not know:

- why;
- under which conditions;
- based on whose decision;
- against which source data;
- with what downstream impact.

At this point, the organisation begins paying to reconstruct knowledge that it already paid to create during the implementation.

## The answer is not to ban spreadsheets

We do not recommend removing Excel from SAP migration programmes.

Spreadsheets remain useful for:

- initial inventories;
- business review;
- bulk editing;
- data analysis;
- offline collaboration;
- import and export;
- familiar review formats.

The better distinction is:

> A spreadsheet can be an input and review surface without being the only source of model truth.

This allows teams to retain the practical value of Excel while moving critical relationships into a structure that can be validated and traced.

## What a governed mapping model requires

A stronger operating model separates the concerns compressed into workbook rows.

### Business attributes

The business concept should exist independently from any physical source or target field.

### Source and target endpoints

Legacy columns, files, SAP fields and interface attributes should be represented explicitly.

### Context

Country, company code, sales area, purchasing organisation and other relevant contexts should be structured rather than stored only in prose.

### Mappings and transformations

The connection between source and target should be its own object, with status, ownership and evidence.

### Value lists and value mappings

Code translations should be separately reviewable and testable.

### Validation rules

A model should state what must be checked and under which context.

### Decisions and issues

Approved choices, unresolved gaps and exceptions should be linked to the affected model objects.

### Datasets

The expected model should be compared with actual source extracts.

### Change proposals

Changes should be reviewed as identifiable differences rather than passed through revised file copies.

## Where Martenweave fits

We built Martenweave around this separation.

Martenweave stores canonical model objects for domains, entities, attributes, relationships, field endpoints, mappings, value lists, rules, evidence, decisions and change proposals.

Its purpose is not to remove the project’s existing tools.

Instead, it provides a model-control layer between them:

```text
Excel, datasets, tickets, reports and decisions
                         ↓
                   Martenweave
     validated model objects and relationships
                         ↓
         migration, MDG, testing and AMS
```

The current Martenweave core supports canonical Markdown and YAML model files, deterministic validation, generated SQLite and JSONL indexes, search, trace and impact analysis, dataset profiling, gap detection, reports and reviewable patch proposals.

For SAP migration, it can connect legacy source columns to SAP field endpoints, represent organisational context, compare datasets with the expected model and trace dependencies before a rule changes.

We deliberately do not position this as a replacement for SAP MDG.

SAP MDG provides operational master-data governance, including governed models, golden records, matching, consolidation, workflows, quality monitoring and auditability.

Martenweave addresses the implementation knowledge surrounding that platform:

- what the team intends to build;
- how legacy data maps into it;
- what evidence supports the design;
- what remains incomplete;
- what a change will affect;
- what needs to survive into support.

## A practical transition from a mapping workbook

A programme does not need to convert every cell immediately.

We recommend beginning with one critical domain and a limited set of objects.

### Step 1: Profile the workbook

Identify which columns represent:

- business definitions;
- source fields;
- targets;
- transformations;
- contexts;
- owners;
- statuses;
- decisions;
- unresolved issues.

The objective is to understand what the workbook is already trying to model.

### Step 2: Assign stable identifiers

Create identifiers for the business attributes, source fields, SAP endpoints and mappings.

This allows other project artefacts to refer to the same objects reliably.

### Step 3: Separate context from comments

Move repeated organisational and country conditions into explicit model relationships.

Keep free text for explanation, not for the basic structure.

### Step 4: Connect the current dataset

Profile an actual migration extract and compare it with the expected endpoints.

This usually reveals gaps that cannot be seen from the mapping workbook alone.

### Step 5: Validate references and completeness

Check for:

- missing targets;
- broken references;
- duplicate IDs;
- mappings without owners;
- unresolved transformations;
- expected fields absent from the dataset.

### Step 6: Produce a reviewable report

Do not ask stakeholders to inspect the entire model repository.

Export the information into formats appropriate for each role:

- a workbook for business review;
- a gap report for migration;
- an impact report for architects;
- a readiness summary for management;
- a change proposal for approval.

The governed model should improve collaboration, not force every stakeholder to work like a developer.

## What managers should ask about a mapping workbook

A manager does not need to review thousands of mapping rows.

A smaller set of questions is more useful:

1. Does every critical mapping have a clear owner?
2. Can we distinguish business approval from technical completion?
3. Are country and organisational contexts represented explicitly?
4. Has the current dataset been compared with the approved model?
5. Can we identify mappings with unresolved transformations?
6. Can we identify missing value mappings?
7. Can we trace a rule back to its decision and evidence?
8. Can we assess the impact of a target-field change?
9. Can we compare changes between two approved versions?
10. Will the AMS team understand the mappings after the project ends?

If these questions require manual reconciliation across several files and several people, the programme has outgrown a spreadsheet-only operating model.

## When a spreadsheet is still enough

We should also be clear about the opposite case.

A dedicated model registry may be unnecessary when:

- the domain is small;
- there is one source and one target;
- context differences are limited;
- the team is stable;
- the project is short;
- mappings rarely change;
- formal lineage and impact analysis are not required;
- the knowledge will not need to be reused.

In that situation, introducing additional structure may create more overhead than value.

The need for a governed model increases with complexity, duration, number of teams and cost of change.

## Our conclusion

Mapping spreadsheets do not fail because teams use them badly.

They fail because successful programmes keep asking them to carry more kinds of knowledge:

- model definitions;
- technical mappings;
- local exceptions;
- evidence;
- decisions;
- quality rules;
- dataset readiness;
- test coverage;
- change history.

Eventually, a document designed for flexible tabular work becomes the informal database of the implementation.

We prefer a different division of responsibility.

Spreadsheets remain valuable for collection, analysis and review. The approved model, its relationships and its change history should live in a structure that can be validated, traced and compared.

That is the role we designed Martenweave to support.

The objective is not to produce a more sophisticated mapping document.

The objective is to help the team know what has been agreed, what remains incomplete, what the current data can support and what will be affected by the next change.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We work on practical approaches to SAP migration, MDM, model governance and agent-assisted enterprise delivery. Our focus is not to replace every platform already used by a programme. We focus on the model knowledge that often remains fragmented between those platforms—and on making that knowledge easier to validate, review and hand over.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP describes SAP Master Data Governance as a central governance layer supporting governed models, golden records, matching and consolidation, collaborative workflows, data-quality monitoring and audit trails. SAP also recommends curating master data early, before an S/4HANA implementation.

Martenweave product scope, current capabilities and intended users are documented in the public product materials.

The Martenweave SAP migration scenario documents field-level mappings, contextual modelling, deterministic validation, dataset gap detection, lineage, impact analysis and human-reviewed change proposals.

SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates. Martenweave is an independent project and is not affiliated with or endorsed by SAP.
