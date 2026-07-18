# From Mapping Spreadsheet to Governed Data Model

Most migration programmes begin with a spreadsheet.

That is not a problem.

The spreadsheet is familiar. Business users can review it. Consultants can filter it. Developers can use it to prepare transformations. Project managers can count completed rows.

For a while, it works.

Then the workbook grows.

More tabs appear. More colours are introduced. Comments become longer. Local exceptions are added. New versions circulate by email. One team adds technical fields. Another adds business rules. A third team creates a separate file because the original workbook has become too difficult to maintain.

Eventually, the programme still has a mapping spreadsheet, but it no longer has a reliable mapping model.

This is the point many projects reach without noticing.

The document still opens.

The rows are still there.

The project can still report that 87% of fields are mapped.

But nobody can confidently answer which version is authoritative, whether the rules still agree, or what else will be affected if one field changes.

The problem is not Excel.

The problem is that a spreadsheet has gradually been asked to become a database, a workflow, a decision log, a validation engine and an impact-analysis tool.

It was never designed to do all of that.

## Why mapping spreadsheets become central

Migration programmes need a practical way to connect source and target systems.

A spreadsheet is the obvious starting point.

A typical row may include:

- source table;
- source field;
- target object;
- target field;
- transformation;
- mandatory status;
- owner;
- comment;
- status.

This gives the project a useful working surface.

The source team can confirm whether a field exists.

The business can review the target meaning.

The migration developer can implement the transformation.

The project manager can track progress.

For a small and stable migration, this may be sufficient.

The difficulty appears when the mapping begins to carry more than a direct source-to-target relationship.

A field may be mandatory only for one country.

A transformation may depend on two other fields.

A value mapping may differ by company code.

A local system may use the same code with another meaning.

A business exception may have been approved in a ticket.

An interface may consume the target value.

A validation script may implement an older rule.

The row no longer describes a mapping.

It describes a network of conditions and dependencies.

A flat table can represent parts of that network.

It cannot govern it reliably.

## The first warning sign: the workbook needs interpretation

A healthy mapping workbook should be understandable from its content.

An unhealthy workbook requires one or two people to explain what the colours, abbreviations and comments actually mean.

Typical warning signs include:

- yellow means “under discussion” on one tab and “business approved” on another;
- mandatory status is written as `Y`, `M`, `C`, `Required` and `Yes`;
- several rows refer to “the rule discussed in the workshop”;
- source fields are identified by labels rather than stable IDs;
- mappings reference other spreadsheets;
- comments contain newer logic than the transformation column;
- one country keeps a separate local version;
- nobody wants to delete obsolete rows because they may still be needed;
- formulas and macros are understood by only one person.

At this stage, the workbook is no longer self-explanatory.

It depends on oral tradition.

That is a serious project risk.

A document that requires a particular consultant to interpret it is not a durable source of truth.

## The second warning sign: status is confused with correctness

Migration programmes often focus on completion status.

How many fields are mapped?

How many mappings are approved?

How many objects are ready?

These are reasonable questions.

But a completed mapping is not necessarily a correct mapping.

A row may be marked complete even though:

- the source field is absent from the latest extract;
- the target definition has changed;
- the value mapping does not cover all observed values;
- the transformation contradicts a validation rule;
- a required exception is documented elsewhere;
- the business owner approved the field before a later change;
- another object uses a conflicting definition.

The status column tells management that an activity took place.

It does not prove that the resulting model is coherent.

This is why a project can report high mapping completion and still produce a large number of test-load defects.

The rows were completed individually.

The model was never checked as a whole.

## The third warning sign: every change creates another version

Versioning through filenames works until several people edit the same workbook.

Then the project starts producing files such as:

```text
Customer_Mapping_v7.xlsx
Customer_Mapping_v7_final.xlsx
Customer_Mapping_v7_final_reviewed.xlsx
Customer_Mapping_v8_country_updates.xlsx
Customer_Mapping_v8_FINAL2.xlsx
```

This is not merely untidy.

It creates uncertainty about the approved state.

The project may try to solve the issue by moving the file to SharePoint or another collaborative platform.

That improves document access and editing.

It does not automatically solve model control.

A shared workbook can still contain contradictory rules, broken references and unclear approval states.

Collaboration is not the same as governance.

The real question is not whether everyone can access the file.

The real question is whether the project can reproduce the approved model from it.

## A governed model is different

A governed data model treats each important element as something that can be identified, related, validated and changed deliberately.

Instead of one large row containing all available information, the model separates the concepts.

For example:

```text
Business attribute: Shipping Condition
Source field: LEGACY_CUSTOMER.SHIP_COND
Target field: SAP Customer Sales Area Shipping Condition
Transformation: approved value mapping
Validation rule: mandatory for selected sales areas
Exception: local pickup customers in Country A
Owner: Global Order-to-Cash Data Owner
Used by: migration, route determination review, 3PL outbound interface
Decision: logistics design approval 2026-04
```

The difference is not cosmetic.

Each item has its own identity.

The mapping references the source and target fields.

The validation rule references the business attribute.

The exception references the rule.

The decision provides evidence.

The interface relationship shows downstream impact.

Now the model can be checked.

If the source field is removed, the mapping becomes invalid.

If the target field changes, affected mappings can be found.

If the exception is deleted, the validation rule can be reviewed.

If the attribute changes, downstream dependencies become visible.

The project no longer relies entirely on people noticing inconsistencies manually.

## The spreadsheet should remain—but change its role

Moving to a governed model does not require banning Excel.

That would be impractical.

Business users are comfortable with spreadsheets. Large mapping sets are often easier to review in tabular form. External partners may deliver data only through XLSX or CSV.

The better approach is to change the spreadsheet’s role.

It should become:

- an import format;
- an export format;
- a review surface;
- a bulk-editing tool;
- an evidence source.

It should not remain the only source of truth.

A governed workflow might look like this:

1. The current model is exported to a spreadsheet.
2. Business and functional teams review the fields.
3. Proposed edits are imported as a change proposal.
4. Automated validation checks IDs, references and required properties.
5. Impact analysis shows affected rules, datasets and interfaces.
6. The responsible owners review the proposal.
7. Approved changes update the canonical model.
8. A fresh workbook and reports can be generated from that model.

This preserves the practical value of Excel without making the entire programme dependent on one workbook.

## What should become structured first

A programme does not need to model everything at once.

Trying to convert every spreadsheet, document and decision into a complete enterprise model will slow the project and create resistance.

The transition should begin with the elements that create the most risk when they are inconsistent.

## Stable identifiers

Every object, attribute, field, mapping and rule should have a stable ID.

Names change.

Labels differ by language.

Technical field descriptions are revised.

An identifier allows relationships to survive those changes.

For example, the business attribute “Customer Group” may have one stable ID even if different systems call it:

- Customer Classification;
- Account Segment;
- Client Group;
- `KDGRP`;
- `CUST_CLASS`.

Without stable identity, the project repeatedly confuses naming differences with business differences.

## Source and target definitions

The model should clearly separate:

- business attribute;
- source field;
- target field.

These are not interchangeable.

A business concept may be represented by several source fields and several target fields.

Treating the technical field as the definition makes future change harder.

## Transformation rules

Transformations should not remain only as free-text comments.

The model should distinguish:

- direct mapping;
- value conversion;
- conditional derivation;
- concatenation;
- default;
- lookup;
- manual population;
- approved null.

This makes the logic easier to validate and report.

## Conditional requirements

“Mandatory” is rarely just yes or no.

A field may be mandatory:

- for one country;
- for one company code;
- for one material type;
- for external suppliers only;
- for a warehouse-managed plant;
- when another attribute has a particular value.

These conditions should be represented explicitly.

Otherwise, the project ends up with a mandatory column and several paragraphs explaining why it is not always mandatory.

## Evidence and decisions

The model should preserve why a rule exists.

A decision may come from:

- business approval;
- SAP design;
- legal requirement;
- interface constraint;
- source-system limitation;
- test finding.

Without this evidence, later teams cannot tell whether a rule is essential, temporary or obsolete.

## Ownership

Ownership should be attached to the relevant model element.

The owner of a source table may not be the owner of the business meaning.

The migration developer may implement the rule without having authority to approve it.

The system should make those distinctions visible.

## What should be validated automatically

A governed model becomes valuable when it can be checked.

Some checks are simple but important:

- every mapping references an existing source field;
- every target field belongs to a known object;
- every validation rule references an existing attribute;
- every identifier is unique;
- deprecated fields are not used by active mappings;
- approved mappings contain required ownership and evidence;
- conditional rules contain defined conditions;
- unresolved proposals are not presented as approved truth.

These checks do not require AI.

They require discipline and deterministic validation.

That distinction matters because many organisations are now tempted to use AI to review large mapping workbooks.

AI can identify suspicious rows, suggest mappings and summarise comments.

It should not be the only control protecting model consistency.

A language model may produce a plausible interpretation.

A deterministic validator should still confirm that the referenced objects exist and the structure is internally valid.

## A practical example: supplier payment terms

Consider a supplier migration involving several business units.

The workbook contains a direct mapping from the legacy payment-term code to SAP.

Most codes map cleanly.

One code, `30D`, appears across several source systems.

The mapping team assigns it to one SAP payment term.

Later, testing reveals that `30D` has different operational meanings:

- one business unit calculates from invoice date;
- another uses goods-receipt date;
- one country applies an additional local condition.

The original workbook row was technically complete.

The model was semantically incomplete.

The project must now identify:

- which suppliers belong to each interpretation;
- which source system contains enough information to distinguish them;
- whether separate target terms are required;
- which business owners can approve the resolution;
- which reconciliation checks must be updated;
- which interfaces and reports use the resulting code.

In a spreadsheet-only approach, this produces more rows, comments and tabs.

In a governed model, the team can separate:

- the business concepts;
- source representations;
- conditional mappings;
- regional exceptions;
- decisions;
- affected datasets.

The issue becomes explicit.

The project can see which records cannot yet be mapped safely.

That is more useful than marking the original row “reopened.”

## Better reporting for managers

A governed model changes the quality of status reporting.

Instead of reporting:

> 94% of supplier fields are mapped.

the programme can say:

> All supplier target attributes have defined source strategies. Four conditional mappings remain unapproved. Two source codes have conflicting meanings across business units. One critical payment-term rule has no confirmed business owner.

The first statement is simpler.

The second is more useful.

A percentage compresses different risks into one number.

A model-based report can distinguish:

- missing work;
- unresolved meaning;
- incomplete datasets;
- conflicting rules;
- missing ownership;
- high-impact changes.

This helps managers decide where intervention is actually needed.

## The goal is not perfect documentation

A governed model can also become excessive.

Teams may try to document every field, every meeting and every minor decision.

That creates another maintenance burden.

The objective is not completeness for its own sake.

The objective is control over the model elements that influence delivery risk.

A useful rule is:

> Structure the information that must remain consistent across teams, tools or migration waves.

A temporary analyst note may not belong in the canonical model.

A country-specific rule affecting thousands of supplier records probably does.

A one-off formatting observation may remain in a profiling report.

A transformation used by several objects should be governed.

The model should remain smaller than the total documentation around it.

## A sensible transition path

Managers do not need to launch a large model-governance programme.

The transition can be incremental.

### Step 1: Freeze the current baseline

Identify which workbook or set of workbooks represents the best current state.

Do not pretend it is perfect.

Use it as the starting baseline.

### Step 2: Define the minimum model

Choose the core object types:

- business objects;
- attributes;
- source fields;
- target fields;
- mappings;
- rules;
- datasets;
- owners;
- decisions.

Avoid modelling everything else initially.

### Step 3: Assign stable IDs

Do this before building complex workflows.

Stable identity is the foundation for traceability.

### Step 4: Import the existing mappings

Preserve the original source file as evidence.

Do not silently clean uncertain content during import.

Convert ambiguity into visible gaps.

### Step 5: Validate the structure

Find:

- missing references;
- duplicates;
- absent owners;
- incomplete mappings;
- invalid object relationships;
- deprecated fields.

### Step 6: Compare real datasets with the model

Check whether the current extracts contain what the approved mappings expect.

This usually reveals that the workbook and the actual files have already diverged.

### Step 7: Introduce proposal-based changes

New spreadsheet edits should create reviewable proposals rather than immediately replacing the approved model.

### Step 8: Generate reports from the model

Once reports and exports are generated from the canonical model, the programme has less incentive to maintain parallel truth manually.

## Where Martenweave fits

Martenweave uses canonical model files as the controlled source of truth.

It can import spreadsheet-based model changes as proposals, validate object references, build generated indexes, profile CSV and XLSX datasets, detect gaps and show impact across connected model elements. AI-assisted changes remain proposals until they are reviewed and approved.

This approach does not ask managers or business users to abandon Excel.

It separates convenient editing from authoritative model control.

The spreadsheet remains useful.

It simply stops carrying responsibilities it cannot reliably support.

## The management decision

The question is not whether spreadsheets are good or bad.

The question is whether the current workbook can still provide the level of control the programme needs.

Can the team identify the approved version?

Can it validate references automatically?

Can it show what a proposed change affects?

Can it distinguish approved rules from assumptions?

Can it compare actual datasets with expected fields?

Can it explain why a mapping exists?

Can it reproduce the same readiness report next week?

When the answer becomes no, the spreadsheet has reached its natural limit.

That is not a failure.

It is a sign that the programme has become complex enough to need a model rather than only a workbook.
