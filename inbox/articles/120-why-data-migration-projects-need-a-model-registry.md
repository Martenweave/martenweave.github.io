# Why Data Migration Projects Need a Model Registry

Most migration programmes do not fail because nobody created a mapping.

They fail because the project cannot reliably answer whether the mapping is still correct.

At the beginning, the structure usually looks manageable.

There is a source system. There is a target system. There is a migration workbook. Each field receives a source, a target, a transformation and an owner.

Then the project starts moving.

A source extract changes. A business rule is clarified. A country introduces an exception. One target field becomes mandatory. A warehouse team adds another dependency. An interface uses the same value differently. A defect leads to a temporary workaround.

After several months, the project still has mapping documents.

What it often no longer has is one coherent model.

That difference is easy to miss.

The documents are present. The status reports are green. The teams are busy. Yet the project has lost the ability to see whether its own definitions still agree.

This is why complex migration programmes need a model registry.

Not because they need another repository.

Because they need a controlled way to manage the meaning, dependencies and change history behind the migration.

## The first mapping is rarely the problem

The first version of a mapping workbook is usually straightforward.

The source field is known.

The target field is known.

The transformation appears reasonable.

The business confirms the requirement.

The real difficulty begins with the second, third and tenth change.

Suppose a customer group is mapped from a legacy field into SAP.

Later, the business changes the classification logic.

The mapping workbook is updated.

But the same customer group is also used by:

- a validation rule;
- a migration reconciliation report;
- an outbound interface;
- a country-specific exception;
- a test-data generator;
- a reporting extract.

The project now has two problems.

The first is the requested business change.

The second is finding every place where the old meaning still exists.

The first problem may take one hour to understand.

The second can consume several weeks of coordination, testing and defect correction.

Most migration governance focuses on approving the first problem.

A model registry helps control the second.

## A migration is a network, not a sequence of spreadsheets

Migration is often managed as a sequence:

```text
Extract → transform → validate → load → reconcile
```

Technically, that is correct.

From a management perspective, however, the project behaves more like a network.

A target attribute may depend on:

- several source fields;
- a value mapping;
- a business rule;
- an organisational condition;
- an approved exception;
- an external dataset;
- another migration object;
- a downstream interface.

A decision made in one workstream may affect several others.

The customer team may change a field that matters to logistics.

The material team may update a unit of measure that matters to warehousing and pricing.

The supplier team may introduce a local exception that affects procurement and compliance.

When these dependencies are stored only in separate workbooks and tickets, they are effectively invisible until someone remembers them.

That is not a robust control model.

It is institutional memory with file attachments.

## The hidden cost of late discovery

A missing source field found during data profiling is inconvenient.

The same missing field found during the first test load is expensive.

Found during integration testing, it is more expensive again.

Found during cutover, it may become a business risk.

The defect itself has not changed.

Its position in the programme has.

Late discovery creates additional work:

- the mapping must be corrected;
- the extraction may need to change;
- the transformation must be updated;
- test data must be regenerated;
- validation results must be repeated;
- interfaces may need retesting;
- reconciliation logic may need adjustment;
- documentation must be aligned;
- approvals may need to be reopened.

The project does not pay only for fixing the field.

It pays for repeating the process around the field.

This is why the phrase “we will find it during testing” is dangerous.

Testing should confirm that the agreed model works in the target environment.

It should not be the main mechanism for discovering that the project never agreed on the model.

## One practical example: unit of measure migration

Consider a material migration into SAP S/4HANA and EWM.

The legacy system stores a product in pieces.

The warehouse handles the same product in boxes.

The sales organisation sells it in cartons.

The source extract contains the base unit and one alternative unit.

A separate packaging file contains the conversion to boxes.

The migration workbook defines the SAP target fields.

The EWM team expects warehouse units to be available after replication.

Everything appears covered.

Then the first end-to-end test starts.

Several products arrive in EWM without the expected warehouse unit.

The teams investigate.

The packaging file uses a different product identifier for one business unit.

The derivation rule covers standard products but not configurable products.

One plant uses a local conversion that was approved in a workshop but never added to the mapping.

The outbound interface uses the sales unit instead of the warehouse unit for one message type.

The problem appears as a missing value.

It is actually a combination of four model failures:

- incomplete dataset coverage;
- incomplete derivation logic;
- undocumented local exception;
- inconsistent interface meaning.

A normal defect process can fix the immediate records.

A model registry is needed to fix the structure that allowed the defect to exist.

It should connect the business attribute “warehouse unit” to:

- source fields;
- packaging datasets;
- SAP target fields;
- transformation logic;
- plant-specific conditions;
- product-type exceptions;
- EWM dependencies;
- interface fields;
- business ownership;
- approval evidence.

Only then can the project check whether a proposed correction is complete.

## Why mapping spreadsheets stop scaling

Excel is not the enemy.

It is still one of the best tools for reviewing tabular mappings with business users.

The problem is not using spreadsheets.

The problem is asking them to perform work they were not designed to perform.

A spreadsheet is effective when the question is:

> Which source field maps to which target field?

It is weaker when the questions become:

- Which rules depend on this field?
- Which datasets are expected to provide it?
- Which other mappings use the same business attribute?
- Which exceptions apply by country or plant?
- Which decisions justify the current design?
- Which interfaces will be affected by a change?
- Which fields are still based on assumptions?
- Which references are now obsolete?

Teams usually respond by adding more tabs, colours, comments and cross-references.

This creates a larger workbook, not a stronger model.

The workbook becomes difficult to review, difficult to validate and dangerous to change.

A model registry does not have to replace Excel.

It should turn spreadsheet content into governed model objects and use the spreadsheet as one input or review surface.

That is a more realistic transition than asking every business user to work directly with YAML files or technical repositories.

## What the registry controls

A useful migration registry should control five things.

## 1. The approved model

The project needs a clear distinction between:

- approved definitions;
- proposed changes;
- unresolved assumptions;
- temporary workarounds;
- deprecated rules.

These states should not be mixed in one comment column.

A manager should be able to ask:

> Are we looking at the approved model, or at a draft somebody is still discussing?

That question sounds basic.

Many projects cannot answer it consistently.

## 2. Relationships and dependencies

The registry should show that a field is not isolated.

A target field may be connected to a source field, transformation, validation rule, dataset, owner, decision and interface.

Once those relationships exist, impact analysis becomes possible.

The project can see that changing one field affects three mappings, two datasets and one external message.

That does not mean the change should be rejected.

It means the right people should review it.

## 3. Dataset readiness

The project should be able to compare real extracts against the approved model.

This includes checking:

- missing expected fields;
- unexpected fields;
- renamed columns;
- unsupported values;
- incomplete mandatory attributes;
- missing identifiers;
- uncovered transformations;
- structural differences between migration waves.

This is different from general data-quality profiling.

Profiling tells the project what is in the dataset.

Readiness analysis tells the project whether the dataset can satisfy the model.

Both are necessary.

## 4. Change history

A migration programme changes constantly.

The registry should preserve:

- what changed;
- why it changed;
- who proposed it;
- which evidence supported it;
- which dependencies were reviewed;
- who approved it;
- when it became part of the model.

Without this history, projects repeatedly reopen settled questions or keep obsolete decisions because nobody understands their origin.

## 5. Validation

The model itself should be checked.

Every mapping should reference an existing field.

Every rule should reference a known attribute.

Every relationship should point to an existing object.

Every identifier should be unique.

Every approved object should contain the required properties.

These checks should be deterministic.

The same model should produce the same result each time.

Expert review remains essential, but experts should review business meaning and risk—not search manually for broken references.

## The manager’s problem is not data volume

Large data volumes are visible.

Model complexity is less visible.

A project may have only 50,000 records and still be difficult if it contains:

- several source systems;
- many local exceptions;
- multiple target applications;
- inconsistent identifiers;
- complex derivations;
- unclear ownership;
- frequent rule changes.

Another project may contain millions of records but remain manageable because the model is stable and well understood.

Managers should therefore avoid using record count as the main measure of migration difficulty.

A better question is:

> How many meanings, rules, exceptions and dependencies must remain aligned?

That is where a model registry provides value.

## Better readiness reporting

Traditional migration reporting tends to focus on quantities:

- percentage of fields mapped;
- percentage of records cleansed;
- number of defects;
- number of completed objects;
- number of successful loads.

These indicators are useful, but incomplete.

A field can be mapped and still have no approved business meaning.

A record can pass technical validation and still be unsuitable for a warehouse process.

A migration object can be marked complete while one high-impact field remains unresolved.

A better readiness report should include statements such as:

> All required customer fields are structurally mapped. Five source values remain without approved target mappings. One shipping attribute has conflicting definitions between the migration and interface teams.

Or:

> The material dataset satisfies the general SAP target structure. Warehouse-specific attributes are incomplete for two plants, and the unit conversion for configurable products remains unapproved.

These reports are less comfortable than a single percentage.

They are also more useful.

## The registry should reduce meetings, not create them

Any governance tool can become bureaucracy.

A model registry is no exception.

If every small change requires a large committee, the solution has failed.

The objective is not to introduce more process.

The objective is to move uncertainty into a visible, reviewable form.

A good workflow might be:

```text
New evidence → proposed model change → automated validation → impact report → focused review → approval
```

Only people affected by the change need to participate.

The review should show exactly:

- what changed;
- why;
- what depends on it;
- which validations pass;
- which questions remain open.

This is more efficient than inviting several workstreams to a meeting because nobody knows where the impact may be.

## Where AI fits

Migration projects are full of unstructured information.

Decisions sit in meeting notes.

Mappings appear in spreadsheets.

Defects contain evidence.

Design documents describe rules in prose.

AI can help extract and organise this information.

It can propose:

- candidate model objects;
- source-to-target relationships;
- validation rules;
- ownership assignments;
- missing dependencies;
- changes derived from new evidence.

But AI should not be allowed to silently alter the approved model.

A generated proposal can be plausible and still be wrong.

The safer pattern is:

```text
AI proposes.
Validators check.
Humans approve.
Git records.
```

Martenweave follows this proposal-first approach. Canonical files remain the source of truth, generated indexes are rebuildable, model references are validated, and AI-assisted changes are expected to pass through human review rather than direct mutation.

That is a practical use of AI in enterprise migration.

It accelerates analysis without removing accountability.

## When the registry becomes necessary

A small migration may not need a dedicated model registry.

A disciplined workbook, clear ownership and version control may be enough.

The case becomes stronger when the project has several of these conditions:

- multiple source systems;
- several migration waves;
- more than one target system;
- SAP plus EWM, TM, MDG or external platforms;
- country-specific rules;
- complex value mappings;
- external warehouses or 3PL providers;
- large consulting teams;
- frequent design changes;
- regulatory evidence requirements;
- recurring defects caused by unclear data meaning;
- dependence on a few senior specialists.

At that point, the project is already managing a model registry informally.

It is simply doing so across spreadsheets, tickets, meetings and personal memory.

The question is whether to continue managing it accidentally or make it explicit.

## What a model registry should not become

The solution should remain narrow.

A model registry should not try to become:

- a full migration execution platform;
- an enterprise MDM system;
- a data catalog;
- a generic workflow engine;
- a replacement for SAP;
- a large editable portal for every possible metadata type.

Its purpose is not to own all enterprise data activity.

Its purpose is to keep the migration model coherent.

For an initial implementation, the essential capabilities are enough:

- canonical model definitions;
- deterministic validation;
- dataset profiling;
- gap detection;
- lineage and impact analysis;
- controlled change proposals;
- human approval;
- audit history.

More functionality should be added only when real project use justifies it.

## How Martenweave supports this approach

Martenweave is designed as a backend-first model governance layer.

It stores canonical model files, validates their structure and references, builds searchable indexes, profiles CSV and XLSX datasets, detects dataset-to-model gaps and shows impact across connected objects.

The application can also turn findings into reviewable patch proposals or issue drafts rather than modifying approved model truth automatically.

This does not replace migration execution.

It improves the quality of the model on which migration execution depends.

## The decision managers need to make

The question is not whether the project needs another tool.

The question is whether the current method gives management enough control over model change.

Can the project identify contradictions before testing?

Can it show what a field change will affect?

Can it compare the latest dataset with the approved model?

Can it distinguish an approved rule from a temporary workaround?

Can it explain why the current mapping exists?

Can it reproduce the same readiness assessment tomorrow?

If the answer is no, the project already has a model-governance gap.

The cost appears as repeated analysis, late defects, retesting, dependency on individuals and unreliable readiness reporting.

A model registry does not remove those risks entirely.

It makes them visible early enough to manage.
