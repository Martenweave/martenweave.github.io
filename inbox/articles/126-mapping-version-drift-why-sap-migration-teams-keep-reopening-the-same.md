# Mapping Version Drift: Why SAP Migration Teams Keep Reopening the Same Decisions

Most migration teams believe they have a mapping problem only when a field is missing.

The more dangerous problem is different.

The mapping exists, but nobody is completely sure which version is current.

One team uses the workbook approved two weeks ago.

Another team works from a local copy with country-specific changes.

The transformation developer has already implemented a later rule from Jira.

The validation script still follows the original design.

The business owner remembers approving an exception, but cannot see whether it reached the migration logic.

The project therefore has several internally reasonable versions of the same model.

This is mapping version drift.

It is one of the main reasons migration defects return after they were supposedly resolved.

## The mapping is rarely stored in one place

A migration mapping is often described as a simple relationship:

```text
Source field → transformation → target field
```

In a real SAP programme, the full mapping may be distributed across:

- an Excel workbook;
- transformation code;
- migration-tool configuration;
- validation scripts;
- Jira decisions;
- SharePoint documents;
- SAP design specifications;
- country-specific files;
- interface mappings;
- test-case expectations.

Each artefact may contain part of the current logic.

The workbook may identify the source and target fields.

The code contains the implemented transformation.

The ticket contains the exception.

The validation script defines what values are accepted.

The interface specification shows how the result is sent downstream.

The problem begins when one part changes and the others do not.

No dramatic technical failure is required.

The project simply starts to operate with several versions of the truth.

## A practical example: customer group mapping

Consider an SAP S/4HANA migration in which a legacy customer classification is mapped to the SAP customer group.

The first approved mapping is:

```text
A → 01
B → 02
C → 03
```

During testing, the business discovers that classification `C` contains two different customer populations.

The decision is changed:

```text
C + domestic customer → 03
C + export customer → 04
```

The Jira ticket is approved.

The migration developer updates the transformation.

The next load produces the expected values.

The problem appears solved.

But several things have not changed:

- the main mapping workbook still contains `C → 03`;
- the validation script accepts only `01`, `02` and `03`;
- the reconciliation report groups all legacy `C` customers under target group `03`;
- the interface team uses the workbook to prepare a downstream mapping;
- another country copies the original rule for its migration wave.

The first load may succeed.

The inconsistency appears later as:

- validation failures;
- reconciliation differences;
- incorrect reporting;
- rejected interface values;
- repeated clarification requests;
- defects in another rollout.

The project reopens the same business decision because the change was implemented in one place but never became the new canonical model.

## Why document versioning does not solve the whole problem

Teams often try to control mapping drift through document management.

The workbook is stored in SharePoint.

Version history is enabled.

Editing permissions are restricted.

A naming convention is introduced.

This helps.

It establishes which file changed, when it changed and who changed it.

It does not prove that the wider migration model is aligned.

SharePoint can show that version 14 is the latest workbook.

It cannot automatically confirm that:

- the transformation code implements version 14;
- the validation rules use the same value set;
- the current source extract contains the expected fields;
- a Jira decision has been incorporated;
- another migration object uses the same business definition;
- the 3PL mapping reflects the updated code.

Document version control answers:

> Which version of this document is current?

Migration governance needs to answer:

> Which version of the model is implemented across all affected artefacts?

Those are different questions.

## Why Git alone is not enough

Technical teams may propose Git as the solution.

Git provides strong version control.

It records changes, authors, branches, reviews and merges.

For model-as-code approaches, it is an excellent foundation.

But Git cannot govern relationships that have not been represented.

If the mapping workbook, validation script and business decision remain unrelated files, Git can show that each one changed.

It cannot determine whether they still agree.

A pull request may contain a transformation update.

Unless the dependency is explicit, the reviewer may not know that the change also requires:

- a rule update;
- a dataset change;
- a report adjustment;
- an interface review;
- a new approval.

Git records change well.

A model registry provides the context needed to review that change.

The two should work together.

## Why migration platforms do not automatically prevent drift

A migration platform can centralise transformations and load logic.

This reduces some version problems.

Instead of distributing scripts across individual machines, the project can manage execution within one controlled environment.

But the platform normally controls the version of the executable migration logic.

It may not control every supporting decision and dependency.

The implemented mapping can still differ from:

- the business-approved mapping workbook;
- the target design;
- the validation framework;
- the interface specification;
- the current dataset expectation.

The platform can prove which transformation was executed.

It may not prove that this transformation reflects the latest approved business decision.

This distinction matters during audits and defect analysis.

“Version 27 was executed” is not the same as “version 27 implements the currently approved model.”

## Why Jira does not become the model

Jira is often where the most important changes are recorded.

A ticket may contain:

- the defect;
- screenshots;
- business comments;
- proposed mapping;
- test evidence;
- approval.

The issue is resolved and closed.

Months later, somebody asks why the mapping works this way.

The ticket may be difficult to find.

Even when found, it may not show whether the decision was propagated everywhere.

Jira proves that work was discussed and approved.

It does not automatically update the model elements affected by the decision.

A closed ticket can coexist with:

- an obsolete mapping workbook;
- an unchanged validation rule;
- an old interface conversion;
- a source extract missing the new condition.

The decision exists.

Its implementation status across the model remains uncertain.

## Why Excel becomes the visible victim

Excel usually receives the blame because version drift is easiest to see there.

Multiple copies circulate.

Local changes appear.

Comments are added without formal review.

Tabs become inconsistent.

But Excel is only the visible surface.

The real problem is not that teams use spreadsheets.

The real problem is that the project has no controlled relationship between the spreadsheet and the other artefacts.

A workbook can be effective when used as:

- an import format;
- an export format;
- a business review surface;
- a bulk-editing tool.

It becomes dangerous when every team assumes that its own copy represents the complete approved model.

The answer is not necessarily to remove Excel.

The answer is to stop treating it as the only authoritative layer.

## What mapping drift costs

Mapping drift rarely appears as one large failure.

It creates repeated small losses across the programme.

### Repeated analysis

The same decision is explained several times because later teams cannot trace its current status.

### Rework

Transformations, validations and reports are updated at different times.

Each inconsistency creates another correction cycle.

### Unreliable testing

A failed test may reflect bad data, an obsolete rule or an outdated expectation.

The team spends time identifying which version is being tested.

### Weak readiness reporting

Management sees that mappings are “approved” without knowing whether they are implemented consistently.

### Cross-wave defects

A later country or business unit copies an earlier mapping that had already been corrected elsewhere.

### Dependence on individuals

The only person who understands the differences between versions becomes a critical project dependency.

None of these costs looks dramatic on its own.

Together, they consume a significant part of migration effort.

## The real control should be model state

A migration programme needs more than file versions.

It needs an explicit model state.

For every important mapping, the project should know:

- which source field is approved;
- which target field is approved;
- which transformation version is current;
- which conditions apply;
- which decision authorised the rule;
- which datasets are expected to provide the inputs;
- which validations use the mapping;
- which interfaces depend on it;
- whether a proposed change is still under review;
- which model version is implemented in each execution environment.

This creates a stronger baseline.

The project no longer asks only:

> Which workbook is latest?

It asks:

> Which approved mapping version is current, and where has it been implemented?

## How Martenweave addresses mapping version drift

Martenweave treats mappings as model objects rather than rows that exist only inside a workbook.

A mapping can have:

- a stable identifier;
- source and target references;
- transformation logic;
- status;
- owner;
- evidence;
- related decisions;
- affected rules and datasets;
- version history.

The canonical model files represent the approved state.

Generated indexes and reports can be rebuilt from those files.

This means the project has one controlled model baseline instead of several independently maintained interpretations.

### Workbook changes become proposals

A team can still edit or deliver mappings through CSV or XLSX.

But the imported change should not immediately replace the approved model.

It becomes a proposal.

The proposal can show:

- which mappings are new;
- which mappings changed;
- which fields were removed;
- which references are unknown;
- which approved rules may be affected.

This separates convenience from authority.

The spreadsheet remains easy to use.

The canonical model remains controlled.

### Decisions are connected to affected mappings

A Jira ticket or workshop note can be registered as evidence.

The decision is linked to the mapping it changes.

Later, the project can trace:

```text
Decision
→ mapping change
→ validation rule
→ dataset expectation
→ downstream dependency
```

This reduces the need to reconstruct the reason from comments and memory.

### Validation catches structural divergence

Martenweave can check conditions such as:

- the mapping references a source field that no longer exists;
- the target field is unknown;
- an active mapping uses a deprecated value;
- a validation rule still references the earlier mapping;
- the required decision or owner is absent;
- two active mappings conflict for the same context.

Deterministic validation does not prove that the business decision is correct.

It proves that the approved model is structurally coherent.

### Impact analysis shows what must move together

Before changing a mapping, the project can inspect connected elements.

For the customer-group example, the impact result may show:

- one source field;
- one conditional transformation;
- two validation rules;
- one reconciliation report definition;
- one interface mapping;
- one country rollout;
- one approved decision.

The change can then be reviewed as one model update rather than a series of unrelated file edits.

### Dataset checks reveal implementation gaps

The approved model may require an additional condition such as domestic or export status.

Martenweave can compare the current dataset with this expectation.

It may reveal that:

- one country extract lacks the required field;
- another extract uses a renamed column;
- some records contain no value for the new condition;
- the migration mapping cannot be executed safely for the affected population.

This prevents the team from approving a mapping that the available data cannot support.

## Comparison of responsibilities

| Tool | What it controls | What may remain unresolved |
|---|---|---|
| Excel | Mapping review and bulk editing | Canonical state, references, impact |
| SharePoint | Document versions and access | Agreement across artefacts |
| Git | File and code history | Business meaning and unmodelled dependencies |
| Jira | Work, discussion and approval records | Propagation into mappings and rules |
| Migration platform | Executable transformation and load logic | Independent approved model |
| Data-quality tool | Data conformance to rules | Whether the current rule is approved |
| Martenweave | Connected mapping model, evidence, validation and impact | Runtime migration execution |

Martenweave does not replace these tools.

It provides the layer that shows whether the versions managed inside them still describe the same model.

## What a manager should request

A migration status report should not say only:

> Customer mapping version 14 is approved.

It should say:

> Customer mapping model version 14 is approved. The transformation and validation rules are aligned. One downstream interface still uses version 13. The next country extract does not yet contain the field required by the new conditional mapping.

This is more uncomfortable than a green status.

It is also more useful.

Managers should ask:

- Which model version is approved?
- Which execution artefacts implement it?
- Which artefacts still differ?
- Which datasets can support it?
- Which decisions explain the latest changes?
- Which downstream dependencies require review?
- Can the same model state be reproduced after the current team leaves?

If the project cannot answer these questions, version control exists only at document level.

## The goal is not one giant system

The solution is not to force every project activity into Martenweave.

That would recreate the same problem inside a larger product.

Excel should remain useful for review.

Jira should remain useful for work management.

Git should record file changes.

Migration platforms should execute transformations.

Quality tools should run record-level checks.

Martenweave should remain the small control layer connecting their relevant outputs to the approved model.

The architecture should look like this:

```text
Excel, Jira, migration tools, validation reports
                ↓
            evidence
                ↓
     Martenweave canonical model
                ↓
 validation → impact → proposal → review
                ↓
  approved change returned to execution tools
```

The strength comes from clear boundaries, not from moving every function into one platform.

## The management lesson

Mapping version drift is not a file-naming problem.

It is not solved completely by SharePoint, Git, Jira or a migration platform.

Those tools control versions of documents, code, tickets and execution logic.

The programme still needs to know whether all of those versions represent the same approved model.

Martenweave addresses this by making mappings, fields, rules, datasets, decisions and dependencies part of one validated model state.

The question changes from:

> Which file is latest?

to:

> Which model is approved, what implements it, and where has the programme drifted away from it?

That is the question that prevents the same migration decision from returning as a defect in every new wave.
