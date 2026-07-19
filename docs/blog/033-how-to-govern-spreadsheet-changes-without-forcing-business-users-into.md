# How to Govern Spreadsheet Changes Without Forcing Business Users into Git

**Reviewed: 14 July 2026**

The business owner receives a mapping workbook.

It contains 4,000 rows, 28 columns, several colour codes and three hidden sheets. The owner is asked to approve changes to customer and supplier mappings.

The technical team expects the workbook to become part of a Git-controlled model repository.

The business owner is told to:

- clone a repository;
- create a branch;
- edit YAML;
- commit the changes;
- open a pull request;
- review the diff.

The process is technically controlled.

It is operationally unrealistic.

The owner returns the workbook by email with comments highlighted in yellow.

A consultant copies those comments into the model files. Some are implemented. Some are interpreted differently. Several rows contain new values but no decision rationale. The resulting pull request is reviewed by developers who did not participate in the business discussion.

Git now contains a clean technical history.

It does not contain a reliable record of what the business actually approved.

This creates a false choice:

```text id="xls-gov-01"
Either business users work directly in Git

or

spreadsheet changes remain uncontrolled.
```

That choice is unnecessary.

Business users can continue working in Excel while the programme maintains a canonical, validated and Git-controlled model.

The important design principle is:

> Excel should be a governed review and input surface, not an independent source of model truth.

The business user works in a familiar interface.

The model-governance layer controls:

- stable object identity;
- allowed changes;
- structural validation;
- comparison with the approved baseline;
- proposal creation;
- impact analysis;
- approval;
- final merge.

The spreadsheet does not need to become the architecture.

It needs to participate safely in the architecture.

## Why Excel remains difficult to replace

Excel is not used only because organisations have failed to modernise.

It remains useful because it supports work that is naturally tabular:

- reviewing many mappings at once;
- filtering by country, object or owner;
- comparing source and target fields;
- adding comments;
- sorting gaps;
- reviewing value lists;
- working offline;
- sharing with external teams;
- collecting decisions during workshops.

For many SAP migration, MDM and governance teams, these are legitimate requirements.

A business owner may need to review 300 supplier attributes.

A local team may need to filter only its country mappings.

A migration analyst may need to compare current source values with proposed target values.

A spreadsheet can be more efficient for these tasks than opening hundreds of model objects individually.

The problem is not the spreadsheet interface.

The problem appears when the workbook becomes:

- the only source of truth;
- detached from stable identities;
- copied into many local versions;
- edited without structural validation;
- approved without a precise change boundary;
- difficult to reconcile with configuration and datasets.

The objective should therefore be controlled spreadsheet participation, not spreadsheet elimination.

## Excel already provides useful local controls

Excel supports data-validation rules that can restrict entered values, provide dropdown lists, display input guidance and show errors or warnings when users enter invalid content. Microsoft documents support for list, numeric, date, time, text-length and custom-formula validation rules, as well as configurable error behaviour.

These features can help create a safer review workbook.

For example, the workbook can restrict:

- review status;
- object type;
- change action;
- country code;
- mapping status;
- severity;
- approval response.

A reviewer might select only:

```text id="xls-gov-02"
Approve
Reject
Needs clarification
```

rather than entering arbitrary status text.

The workbook can display guidance when a user selects a cell:

```text id="xls-gov-03"
Enter a proposed target value only when the mapping decision
has been confirmed by the responsible data owner.
```

This reduces accidental variation.

It does not make the workbook a fully governed model system.

Spreadsheet validation is a useful first boundary, not the final control layer.

## Version history is necessary but insufficient

SharePoint document libraries can retain document versions, distinguish draft and published versions, support content approval, and use check-in and check-out controls with change comments. Microsoft describes these capabilities as mechanisms for controlling document versions through their lifecycle.

This is better than distributing files through email.

A team may be able to determine:

- who changed the workbook;
- when it changed;
- which file version was approved;
- whether an earlier file can be restored.

But file version history still works at the document level.

It does not automatically explain:

- which model objects changed;
- whether a referenced endpoint exists;
- whether a local override conflicts with a global rule;
- whether an observed source value has a valid target treatment;
- whether the change affects tests or interfaces;
- whether a proposed row is approved model truth or only a suggestion.

Document control answers:

> Which workbook version was published?

Model governance answers:

> Which model changes were approved, why, and what do they affect?

Both layers can be used together.

They should not be confused.

## The canonical model should remain outside the workbook

A controlled architecture separates three things.

```text id="xls-gov-04"
Canonical model
        ↓
Generated review workbook
        ↓
Imported change proposal
```

### Canonical model

The current approved state.

It contains stable, structured model objects and relationships.

### Review workbook

A generated or controlled representation prepared for business review.

It contains the relevant subset of model information in a usable tabular form.

### Change proposal

The structured difference extracted from the returned workbook.

It remains proposed until validation and human approval are complete.

The returned workbook should not overwrite the canonical model directly.

This boundary is essential.

A spreadsheet can contain:

- accidental edits;
- broken formulas;
- deleted rows;
- copied content from an old version;
- comments without implementation intent;
- formatting changes;
- conflicting user edits.

Those changes must be interpreted and validated before becoming model truth.

## Generate the workbook from a known baseline

Do not create a new review workbook manually from several files.

Generate it from an identifiable canonical model baseline.

For example:

```text id="xls-gov-05"
Review package:
SUPPLIER-MAPPING-DE-2026-07

Generated from model baseline:
supplier-model-v2.4

Generated at:
14 July 2026

Scope:
Germany supplier mappings and contextual rules
```

This establishes the starting state.

When the workbook returns, the import process can compare it with the same baseline.

Without the baseline reference, the programme cannot distinguish:

- a genuine new change;
- an edit already approved elsewhere;
- a value copied from an older workbook;
- a row removed because the reviewer filtered it incorrectly;
- a change based on a superseded model.

## Give every row a stable identifier

The most important spreadsheet column may not be the source or target field.

It is the stable object identifier.

Examples:

```text id="xls-gov-06"
MAP-SUPPLIER-RISK-ERP-A
ATTR-SUPPLIER-RISK
RULE-SUPPLIER-RISK-REQUIRED-DE
VLIST-SUPPLIER-RISK
```

The identifier allows the importer to determine which model object the row represents.

Do not rely only on:

- row number;
- field label;
- worksheet position;
- source-field name;
- target-field name.

Rows move.

Names change.

Two contexts may use the same display name.

Stable identities allow the workbook to remain a view of the model rather than a detached table.

## Protect identity columns from casual editing

Some workbook fields should be read-only.

Examples include:

- object ID;
- baseline version;
- object type;
- current lifecycle state;
- generated source reference;
- internal relationship IDs.

Business reviewers normally do not need to edit these values.

Allowing changes creates ambiguity:

```text id="xls-gov-07"
Did the reviewer rename the object?

Did they create a new object?

Did they accidentally overwrite the identifier?
```

The workbook should separate:

### Controlled identity fields

Generated and protected.

### Reviewable current-state fields

Visible for context.

### Proposal fields

Explicitly editable.

This is better than giving users a complete export and asking them to change anything they think is necessary.

## Separate current state from proposed state

A review workbook should not require reviewers to overwrite the current approved value.

Use separate columns.

For example:

| Model ID | Current target | Proposed target | Review status | Rationale |
|---|---|---|---|---|
| MAP-CUST-0042 | KNVV-KDGRP | BUT000-BPKIND | Needs clarification | Current target appears incorrect |

This preserves the original state in the workbook.

The importer can identify the proposed difference explicitly.

A weaker workbook contains only one `Target Field` column.

After editing, the reader cannot see what changed without comparing file versions.

Separate fields make the proposal visible even before Git processing.

## Require an explicit change action

A modified cell is not always an intentional model proposal.

The reviewer may have:

- corrected spelling;
- added a note;
- pasted a value temporarily;
- changed formatting;
- replaced a formula.

Use an explicit action column:

```text id="xls-gov-08"
No change
Modify
Add
Retire
Request clarification
Reject current treatment
```

Only rows with a relevant action should be imported as candidate model changes.

This avoids treating every workbook difference as semantic intent.

## Require rationale for material changes

A reviewer changing a mapping should explain why.

Useful rationale categories include:

- incorrect source interpretation;
- incorrect target context;
- new business requirement;
- current dataset evidence;
- local legal requirement;
- target-model change;
- implementation defect;
- obsolete value;
- temporary deviation.

The workbook can provide a controlled category and a free-text explanation.

For example:

```text id="xls-gov-09"
Change reason:
Target context correction

Rationale:
Customer Group is maintained by sales area.
The current mapping points to a central Business Partner field.
```

The rationale does not need to be an essay.

It should be sufficient for another reviewer to understand the requested decision.

## Do not use cell colour as the only meaning

Programmes frequently assign meaning through colours:

- green means approved;
- yellow means review;
- red means rejected;
- blue means local change.

This is visually convenient.

It is structurally weak.

Colours can be:

- copied accidentally;
- interpreted differently;
- lost during export;
- inaccessible to some users;
- difficult to validate automatically.

Colour may support the interface.

The authoritative meaning should remain in explicit values:

```text id="xls-gov-10"
review_status: approved
```

not only a green background.

## Comments are evidence, not structured decisions

Spreadsheet comments are useful for discussion.

They are poor as the only representation of a model change.

A comment might say:

> Use the local code here.

The importer cannot determine reliably:

- which code;
- which country;
- whether this is a proposal;
- who may approve it;
- whether it replaces the current value.

Use comments for explanation.

Use structured cells for:

- proposed value;
- context;
- action;
- status;
- rationale;
- owner.

## Design the workbook for one review task

Do not create one giant workbook for every audience.

A business owner does not need every technical column.

A migration analyst may need source details that a legal reviewer does not.

Generate role-specific workbooks.

### Business definition review

Show:

- attribute;
- definition;
- context;
- owner;
- proposed change;
- rationale.

### Mapping review

Show:

- source endpoint;
- business attribute;
- target endpoint;
- transformation;
- dataset coverage;
- proposal.

### Value-list review

Show:

- source value;
- frequency;
- current treatment;
- proposed target;
- applicability;
- decision.

### Ownership review

Show:

- model object;
- current owner;
- proposed owner;
- criticality;
- open issues.

The canonical objects remain the same.

Only the review surface changes.

## Keep technical metadata available but secondary

A workbook may still include technical metadata in protected or secondary sheets:

- internal identifiers;
- relationship references;
- export timestamp;
- checksum;
- baseline commit;
- import schema version.

These fields help the import process confirm that the workbook is valid.

They should not dominate the main review sheet.

A useful pattern is:

```text id="xls-gov-11"
Sheet 1:
Review

Sheet 2:
Instructions

Sheet 3:
Reference values

Sheet 4:
Technical metadata
```

Do not hide essential business meaning in technical sheets.

## Use controlled lists from the canonical model

Dropdown values should be generated from current model state where practical.

Examples include:

- allowed lifecycle statuses;
- valid countries;
- current target endpoints;
- approved value lists;
- named owners;
- change-reason categories.

This reduces free-text variation.

However, a reviewer may need to propose something that does not yet exist.

Provide an explicit route:

```text id="xls-gov-12"
Target selection:
NEW OBJECT PROPOSED

Proposed name:
Supplier Review Status

Reason:
No current target attribute represents the concept.
```

Do not force users to select an incorrect existing value merely because the dropdown lacks the correct future option.

## Validate the workbook before import

The returned workbook should pass basic technical checks.

Examples:

- expected worksheets exist;
- required columns exist;
- baseline identifier is present;
- object IDs are not duplicated;
- protected identity values are unchanged;
- action values are valid;
- proposed changes contain rationale;
- mandatory proposal fields are complete;
- rows belong to the exported scope.

A failed workbook should produce an actionable report.

For example:

```text id="xls-gov-13"
Workbook import failed.

Row 142:
Object ID was changed from MAP-CUST-0042 to MAP-CUST-042.

Row 287:
Action is Modify, but Proposed Target is blank.

Row 401:
Object does not belong to baseline supplier-model-v2.4.
```

The system should not silently ignore invalid rows.

## Compare the workbook with the baseline, not with the latest model

Suppose the workbook was generated from baseline 2.4.

While the business reviews it, another approved change creates baseline 2.5.

The returned workbook should first be interpreted against 2.4 because that is the state the reviewer saw.

Then the proposal should be checked against the current 2.5 model.

This is similar to rebasing a change.

Possible outcomes include:

### No conflict

The reviewed proposal still applies cleanly.

### Technical conflict

The same object changed in 2.5.

### Semantic conflict

The latest model introduced a related decision that changes the proposal’s meaning.

### Superseded proposal

The requested change has already been implemented.

Do not import the workbook blindly into the latest state.

## Convert spreadsheet changes into PatchProposals

Martenweave’s current architecture uses canonical Markdown and YAML files, deterministic validation before indexing and proposal-first changes. AI-generated changes must not mutate the model silently; they enter as `PatchProposal` objects and become `ChangeRequest`s only after approval.

Spreadsheet changes should follow the same boundary.

```text id="xls-gov-14"
Returned workbook
        ↓
Import and structural checks
        ↓
Candidate row changes
        ↓
PatchProposal
        ↓
Validation
        ↓
Impact analysis
        ↓
Human review
        ↓
ChangeRequest
        ↓
Canonical model update
```

The spreadsheet itself is evidence of the reviewer’s input.

The PatchProposal is the controlled representation of what that input would change.

## Generate a semantic diff for final approval

The business reviewer may approve the spreadsheet content.

A separate final approval may still be required after import because:

- the importer interprets the changes;
- related canonical objects may need updates;
- impact analysis may reveal additional consequences;
- the current baseline may have changed.

The final review should show a semantic diff.

Example:

```text id="xls-gov-15"
Reviewed workbook proposal:
Change Customer Group target.

Canonical changes generated:
- Modify MAP-CUST-0042 target endpoint
- Add sales-area context relationship
- Mark previous central endpoint mapping as retired
- Invalidate tests TC-CUST-18 and TC-CUST-22
- Request review from Integration Owner

No automatic SAP change will be performed.
```

The reviewer can confirm whether the imported proposal reflects their intent.

## Do not treat spreadsheet sign-off as unlimited approval

A user may approve one row without understanding every generated consequence.

The approval scope should be explicit.

For example:

```text id="xls-gov-16"
Business owner approval:
Approves the target business meaning and country scope.

Does not approve:
- technical implementation;
- interface compatibility;
- migration timing.
```

Other reviewers may still be required.

The workbook should not create the impression that one signature approves every architectural consequence.

## Preserve the returned workbook as evidence

The workbook can be retained as part of the proposal evidence.

Record:

- file identifier;
- generated baseline;
- reviewer;
- submission date;
- checksum;
- imported changes;
- import result.

Do not treat the workbook as the current model after import.

It remains evidence of the review interaction.

The canonical model and approved change history determine current truth.

## Use SharePoint approval for document publication, not model merge

SharePoint versioning and content approval can help control which workbook is considered the published review package. It can retain successive versions and distinguish drafts from approved published content.

This is useful for:

- distributing one controlled workbook;
- preventing uncontrolled email copies;
- identifying the returned approved version;
- retaining document history.

But a SharePoint content approval should not automatically merge model changes.

The approved workbook still needs:

- structural import validation;
- baseline comparison;
- model validation;
- impact review.

Document approval confirms the business-review artefact.

Model approval confirms the canonical state change.

## Avoid simultaneous free-form editing

Coauthoring can be useful for workshops and joint review.

It can also make proposal boundaries harder to understand.

For critical model review, define:

- review period;
- named participants;
- editing responsibilities;
- comment resolution process;
- submission cutoff;
- final reviewer.

The goal is not to prohibit collaboration.

It is to know when the workbook moves from:

```text id="xls-gov-17"
work in progress
```

to:

```text id="xls-gov-18"
submitted proposal evidence
```

A continuously changing shared workbook should not be imported repeatedly without a defined submission event.

## Do not ask users to manage workbook formulas

The programme should avoid controls that depend on reviewers preserving complex formulas manually.

Users may:

- paste values over formulas;
- insert rows outside the controlled range;
- copy sheets;
- delete hidden references.

Where formulas are necessary:

- protect them;
- validate them during import;
- treat their output as guidance rather than authoritative truth.

Critical model validation should run outside the spreadsheet against structured objects.

## Allow offline review, but control re-entry

Offline work is often necessary:

- external partners;
- restricted environments;
- travel;
- workshop settings;
- limited repository access.

An offline workbook can still participate in governance when it contains:

- baseline ID;
- export timestamp;
- scope;
- stable object IDs;
- schema version.

When returned, it goes through the same import and conflict process.

The programme should not refuse offline work.

It should prevent an old offline workbook from silently overwriting a newer model.

## Handle added rows carefully

A reviewer may add a row for a genuinely missing field.

This should create a proposed new object, not an immediate canonical object.

Required fields might include:

- proposed object type;
- business name;
- definition;
- context;
- owner;
- reason;
- evidence;
- suggested source or target.

The import process should assign or propose a stable identifier according to policy.

Example:

```text id="xls-gov-19"
New object proposal:
Local Construction Licence Number

Type:
Attribute

Context:
Country X, regulated construction suppliers

Owner:
Country Compliance

Evidence:
Local registration process

Status:
Candidate
```

The new object remains a proposal until reviewed.

## Handle deleted rows carefully

A missing row does not necessarily mean the reviewer wants to retire an object.

It may have been:

- filtered out;
- deleted accidentally;
- omitted by copy-paste;
- moved to another worksheet.

Retirement should require an explicit action:

```text id="xls-gov-20"
Action:
Retire

Reason:
Attribute no longer used after source-system replacement.

Replacement:
ATTR-SUPPLIER-RISK-V2
```

Never interpret row absence alone as approval to delete model truth.

## Handle conflicting reviewers explicitly

Two reviewers may return different changes to the same object.

For example:

- global owner approves one target;
- country owner requests another;
- migration architect proposes a default.

Do not merge the workbooks in Excel and choose the most recent cell.

Create competing proposals or one proposal with unresolved alternatives.

```text id="xls-gov-21"
Object:
ATTR-SUPPLIER-CLASS

Global proposal:
Use standard global classification.

Country proposal:
Add local regulatory category.

Conflict:
Local requirement may be a separate attribute rather than a value.
```

The conflict is a governance decision.

The importer should expose it rather than solve it through last-write-wins behaviour.

## Use issue creation for unresolved rows

Not every workbook row should become a model patch.

Some rows indicate missing knowledge.

Examples:

- source field unknown;
- owner not agreed;
- legal evidence missing;
- target context disputed;
- dataset unavailable.

These should become structured gaps or issue drafts.

Martenweave’s current pipeline supports evidence processing, gap and impact analysis, PatchProposals, and GitHub-ready issue or pull-request outputs.

A useful distinction is:

```text id="xls-gov-22"
Known treatment:
Create PatchProposal.

Unresolved question:
Create issue or decision request.
```

Do not force uncertainty into a premature model value.

## A worked example: customer mapping review

The canonical model contains:

```text id="xls-gov-23"
MAP-CUSTOMER-GROUP-CRM-A

Source:
CRM_A.CUSTOMER_SEGMENT

Target:
SAP central BP classification

Status:
Approved
```

A generated workbook shows the current mapping.

The business reviewer selects:

```text id="xls-gov-24"
Action:
Modify

Proposed target:
SAP sales-area Customer Group

Reason:
Current target does not represent sales-process segmentation.

Context:
Germany sales areas
```

The import process creates a proposal.

Validation and impact analysis identify:

- target context changes from central to sales area;
- organisational expansion is required;
- six tests become stale;
- one interface consumes the central field;
- another country uses the same source mapping;
- no approved decision yet distinguishes segmentation from classification.

The final result is not an automatic mapping update.

It is a decision package.

The spreadsheet made business input efficient.

The model layer prevented a small-looking cell edit from becoming an uncontrolled architecture change.

## Another example: value-mapping review

The source dataset contains:

```text id="xls-gov-25"
A
B
C
STRAT
UNKNOWN
```

The generated workbook includes record frequencies and current treatments.

The reviewer proposes:

| Source | Records | Current treatment | Proposed treatment |
|---|---:|---|---|
| A | 48,000 | STANDARD | No change |
| B | 12,000 | STANDARD | No change |
| C | 7,000 | CRITICAL | Modify to STRATEGIC |
| STRAT | 1,400 | Unmapped | STRATEGIC |
| UNKNOWN | 900 | Unmapped | MIGRATION_REVIEW |

The importer can create candidate value mappings.

The governance process should still ask:

- Does `C` really mean `STRATEGIC`?
- Is `MIGRATION_REVIEW` an approved target value?
- Is it temporary?
- Which records may use it?
- Do interfaces support it?
- Who owns remediation?

The spreadsheet is well suited to reviewing the population.

It should not bypass the value-governance decision.

## Another example: ownership review

A generated workbook lists critical objects without owners.

Business users propose names.

The importer should distinguish:

- person;
- role;
- accountable owner;
- operational steward;
- reviewer.

An employee name should not become permanent governance architecture without a role.

For example:

```text id="xls-gov-26"
Proposed role:
German Tax Data Owner

Current assignee:
Jane Smith
```

The role belongs in the model.

The current person assignment may belong in an identity or operational system.

## A minimum spreadsheet-governance design

A practical first implementation should include:

1. Canonical model baseline.
2. Generated workbook scoped to one review task.
3. Stable object identifiers.
4. Protected identity and metadata columns.
5. Separate current and proposed values.
6. Explicit change-action column.
7. Controlled status and reason lists.
8. Mandatory rationale for material changes.
9. Import validation.
10. Baseline conflict detection.
11. PatchProposal generation.
12. Semantic diff.
13. Human approval.
14. Git-recorded canonical change.
15. Retained workbook evidence.

This is enough to create a safe bridge between Excel and Git.

## Where Martenweave fits

The current Martenweave Core README describes Martenweave as an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS. It transforms spreadsheets, datasets, tickets, validation reports, decisions and SAP context into canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-approved AI patch proposals.

As of July 2026, the source version is 0.6.1. The product remains CLI-driven and backend-first rather than a hosted editable enterprise application.

Its current capabilities include:

- canonical Markdown and YAML files;
- deterministic validation;
- rebuildable SQLite and JSONL indexes;
- dataset profiling;
- gap detection;
- search;
- trace and impact analysis;
- patch proposals;
- issue-draft generation;
- CSV and XLSX-oriented workflows.

The appropriate product direction is not to force every reviewer into the CLI.

It is to make spreadsheets safe input and review surfaces around the canonical model.

## A Martenweave spreadsheet flow

```text id="xls-gov-27"
Canonical model in Git
        ↓
Generate scoped XLSX review package
        ↓
Business review in Excel
        ↓
Submit controlled workbook version
        ↓
Validate workbook structure
        ↓
Compare with exported baseline
        ↓
Create PatchProposal or issue drafts
        ↓
Run model validation and impact analysis
        ↓
Generate semantic review report
        ↓
Human approval
        ↓
Merge approved canonical change
```

This preserves the roles of both tools.

Excel supports human review.

Git protects model history.

Martenweave connects them.

## AI can help interpret spreadsheet feedback

AI may assist with:

- extracting proposed changes from comments;
- categorising rationale;
- identifying likely affected model objects;
- comparing workbook versions;
- drafting PatchProposals;
- detecting contradictory reviewer input;
- producing semantic summaries.

AI output should remain provisional.

A comment such as:

> Use group here.

may refer to:

- Customer Group;
- Account Group;
- Pricing Group;
- local classification.

An AI can suggest the likely interpretation.

It should not silently select the target and modify the canonical model.

The safe pattern remains:

```text id="xls-gov-28"
AI interprets.
Validator checks.
Human confirms.
Git records.
```

## What business users should see

The process should feel simple.

A reviewer should be able to:

1. Open the workbook.
2. Filter to their scope.
3. See the current approved state.
4. Enter a proposed value.
5. Select a change reason.
6. Add a concise rationale.
7. Mark the row ready for submission.
8. Return or submit the workbook.

They should not need to understand:

- Git branches;
- YAML syntax;
- SQLite indexes;
- object graph internals;
- merge strategies.

Governance complexity belongs in the supporting system.

It should not be transferred to every business participant.

## What technical maintainers should see

The technical process needs more detail:

- workbook schema;
- baseline commit;
- object identifiers;
- imported delta;
- structural errors;
- conflicts;
- impact report;
- generated PatchProposal;
- canonical diff;
- required reviewers.

This separation allows business accessibility without sacrificing technical control.

## What management should ask

1. Which system contains approved model truth?
2. From which baseline was the workbook generated?
3. Does every row have a stable model identifier?
4. Are current and proposed values separated?
5. Can reviewers state explicit change intent?
6. Are spreadsheet validation rules used for basic input control?
7. Can a returned workbook overwrite the model directly?
8. How are deleted or added rows interpreted?
9. What happens when the model changes during spreadsheet review?
10. Are conflicting reviewers handled explicitly?
11. Does the importer generate a semantic diff?
12. Who gives final business and technical approval?
13. Is the approved canonical change recorded in Git?
14. Can business users participate without using developer tooling?

A process that answers only the last question has optimised usability but not governance.

A process that answers only the first thirteen has optimised control but may fail adoption.

Both sides matter.

## Common mistakes

### Making Excel the canonical source

Multiple copies and weak relationship control eventually create competing truth.

### Forcing business owners to edit YAML

Technical purity can destroy practical participation.

### Exporting a workbook with no baseline identifier

The returned changes cannot be reconciled safely.

### Using names instead of stable IDs

Rows become ambiguous after renaming or reordering.

### Overwriting current values

Review intent becomes difficult to distinguish.

### Treating all cell changes as proposals

Formatting and accidental edits create noise.

### Treating workbook approval as automatic model merge

Structural validation and impact review are still required.

### Interpreting deleted rows as retirement

Retirement must be explicit.

### Relying on colour and comments

Important meaning should be stored in structured values.

### Allowing AI to infer final intent

Ambiguous spreadsheet feedback requires human confirmation.

## When a controlled workbook alone may be enough

A Git-backed registry may be unnecessary when:

- the domain is small;
- one workbook is authoritative;
- changes are rare;
- one stable team reviews them;
- dependencies are limited;
- version history and approval are sufficient.

In that situation, improve the workbook with:

- stable IDs;
- data validation;
- explicit actions;
- versioning;
- approval;
- decision records.

A model-registry workflow becomes more useful when:

- several workbooks represent the same model;
- multiple countries submit changes;
- mappings depend on datasets and rules;
- AI generates proposals;
- exact impact matters;
- later waves reuse the model;
- configuration and documentation frequently diverge.

## Our conclusion

Business users should not be forced into Git merely because model governance requires version control.

They should work through interfaces suited to their task.

For many SAP migration and MDG processes, that interface will remain Excel.

The governance boundary should sit behind it.

A safe process uses:

- a canonical model;
- generated scoped workbooks;
- stable identities;
- explicit proposed values;
- controlled spreadsheet input;
- validated import;
- semantic diff;
- proposal-based approval;
- Git-recorded history.

The practical test is:

> Can a business owner review and propose a change in Excel while the programme still proves exactly which canonical objects would change, which dependencies are affected and who approved the final state?

When the answer is yes, the organisation has combined accessibility with control.

When the answer is no, it will usually choose one failure mode:

- uncontrolled spreadsheets;
- or a technically governed process that business users avoid.

The goal is not to replace Excel.

It is to stop Excel from having to carry responsibilities it was never designed to carry alone.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We build practical model-governance infrastructure for SAP migration, MDG, MDM and AMS teams.

Martenweave uses canonical model files, deterministic validation, dataset evidence, traceability and proposal-first change control. Spreadsheets remain useful review and input surfaces, while Git records the approved model history.

## Sources and notes

This article was reviewed on 14 July 2026.

Microsoft documents that Excel data validation can restrict entered values, provide dropdown lists, display input messages and produce configurable errors or warnings.

Microsoft also documents SharePoint document-library controls including versioning, major and minor versions, content approval, and check-in/check-out with change comments. These controls support document governance but do not by themselves create object-level model validation or impact analysis.

The current Martenweave Core README describes an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS. As of July 2026, the source version is 0.6.1.

The core uses canonical model files, deterministic validation, rebuildable generated indexes, dataset-gap analysis, trace and impact analysis, and reviewable `PatchProposal` and `ChangeRequest` workflows.

Martenweave is an independent project and is not affiliated with or endorsed by Microsoft, SAP or GitHub. Microsoft Excel, SharePoint, SAP, SAP S/4HANA, SAP Master Data Governance and GitHub are trademarks or registered trademarks of their respective owners.
