# Why Mapping Completion Is Not Migration Readiness

**Reviewed: 14 July 2026**

A migration programme reports that 96% of mappings are complete.

On the surface, this sounds reassuring. Most source fields have targets. Transformation rules have been entered. The workbook contains owners and statuses. Only a small number of rows remain open.

Then the next mock load begins.

The team discovers that several required source columns are missing from the latest extract. A large part of one value list is unmapped. A target validation introduced by the MDG team rejects records that previously passed migration checks. One country has been using a different business definition. Some mappings marked as approved have never been tested against representative data.

The reported mapping completion was not false.

It was simply answering the wrong question.

It measured whether mapping activities had been recorded as complete. It did not prove that the domain was ready to migrate.

We see this distinction as one of the most important controls in SAP data migration.

> Mapping completion tells us whether the mapping work has progressed. Migration readiness tells us whether the model, source data, transformation logic, target system and operating organisation can produce and sustain a reliable result.

A programme needs both measures. It should never use one as a substitute for the other.

## Why mapping completion is attractive

Mapping completion is easy to understand.

A programme has a known number of mapping rows. Each row has a status. Management can calculate a percentage and compare it across domains or migration waves.

For example:

```text id="fr1f6v"
Total mappings: 1,000
Completed mappings: 940
Mapping completion: 94%
```

The metric is simple, visible and suitable for a status report.

It also gives delivery teams a practical way to track their work.

The problem is not that the metric exists.

The problem begins when it is presented as evidence that the migration object itself is ready.

A completed mapping row may still depend on:

- unavailable source data;
- unresolved business meaning;
- incomplete value conversion;
- an outdated target model;
- an untested transformation;
- missing organisational context;
- unapproved defaulting;
- a temporary assumption;
- an owner who has not accepted the result.

None of these conditions is visible in the headline percentage unless the programme measures them separately.

## What does “mapping complete” actually mean?

Before using the metric, we ask teams to define what the status means.

A mapping might be considered complete when:

- a source field has been identified;
- a target field has been assigned;
- a transformation note has been written;
- a consultant has finished the row;
- a business owner has reviewed it;
- the MDG architect has confirmed the target;
- the value mapping has been approved;
- the rule has been implemented;
- the rule has been tested;
- the current dataset has passed the rule.

These are different milestones.

If one team marks a row complete after identifying the target while another waits for business approval and testing, their percentages cannot be compared meaningfully.

A mapping status should therefore be specific.

For example:

- Source identified;
- Target identified;
- Transformation defined;
- Business approved;
- Implemented;
- Dataset validated;
- Tested;
- Ready for load.

This may appear more complicated than one completion flag.

The complexity already exists. A single flag only hides it.

## A mapping describes intention

At its simplest, a mapping expresses an intended relationship:

```text id="qcalpp"
Source field → transformation → target field
```

That relationship is necessary.

It does not prove that the source data exists, that the transformation is valid for all records or that the target system will accept the result.

Consider a simple rule:

```text id="3c7yma"
LEGACY_CUSTOMER.TYPE → SAP_BP.CUSTOMER_GROUP
```

The mapping may be recorded and approved.

Readiness still depends on several other questions:

- Is `TYPE` populated for all relevant records?
- Does it mean the same thing in every source system?
- Does the target value list contain equivalent values?
- Are unexpected source codes present?
- Is Customer Group mandatory in every target context?
- Does pricing or reporting depend on the value?
- Does the migration rule align with MDG validation?
- Have country exceptions been approved?
- Has the rule been tested with actual data?

A completed mapping expresses the intended route.

Migration readiness requires evidence that the route can be used safely.

## The source field may exist only on paper

Mapping teams often work from:

- data dictionaries;
- source-system specifications;
- previous project templates;
- interviews with system owners;
- older extracts;
- legacy mapping documents.

These are useful inputs.

They do not replace profiling the current migration dataset.

A source field described in documentation may be:

- absent from the current extract;
- renamed;
- available only in one system;
- populated only for historic records;
- empty for the target migration population;
- derived during extraction;
- stored in a separate file;
- used differently by different countries.

The mapping can be logically complete while the source is operationally unavailable.

We therefore separate two statements:

> A source field has been identified.

and:

> The required source data is available and sufficiently reliable for the current migration population.

Only the second supports readiness.

## The target can change after the mapping is completed

Target models evolve during SAP and MDG implementations.

This is normal.

Design workshops clarify business meaning. Configuration exposes technical constraints. Migration analysis reveals source limitations. Testing introduces new rules. Local teams raise requirements that were missed during the global design.

A mapping completed against target model version 3 may no longer be valid against version 5.

Changes may include:

- a field becoming mandatory;
- a field moving to another context;
- a new validation rule;
- a revised value list;
- a different organisational assignment;
- a change in identifier strategy;
- a new relationship requirement;
- a field being retired or replaced.

If mapping status is not connected to a model baseline, the programme can report completed mappings that refer to an outdated target.

We recommend recording the approved model version against which each mapping was reviewed and tested.

A mapping should be reconsidered when the affected model object changes.

## Field mapping and value mapping are not the same

A common source of false readiness is treating field mapping as if it also proves value readiness.

Suppose a legacy field maps directly to an SAP target field.

The field relationship is clear.

The actual data contains:

```text id="hkb4y1"
A
B
C
D
99
UNKNOWN
blank
```

The approved target value list contains:

```text id="o4iu59"
01
02
03
```

The field mapping is complete.

The value mapping is not.

The programme still needs to decide:

- which source codes correspond to which target values;
- whether multiple source values may merge;
- how blank values are treated;
- whether unknown values are rejected;
- whether local codes have global equivalents;
- who approves the translation;
- whether the conversion changes business meaning.

We track value-list coverage against the current dataset, not only against an intended list supplied during design.

A value mapping is ready when it accounts for the values that actually occur in the relevant migration population—or when the treatment of unmatched values has been explicitly agreed.

## Transformation text may not be implementable

Mapping workbooks often contain descriptions such as:

- Convert to SAP format;
- Derive based on country;
- Use existing logic;
- Take latest value;
- Map according to business rules;
- Default where missing;
- Clean before load.

These statements may be useful reminders for the person who wrote them.

They are not yet testable transformation specifications.

A migration-ready rule should clarify:

- input fields;
- applicable conditions;
- order of operations;
- output;
- handling of blank values;
- handling of invalid values;
- context;
- error behaviour;
- examples;
- owner;
- approval.

For example:

> If Country = DE and Tax Category = DE1, remove spaces from the source value, convert letters to uppercase and reject records whose normalised value does not match the approved format. Do not generate missing values.

This rule can be implemented and tested.

“Clean tax number” cannot.

A mapping should not be considered ready simply because a transformation column contains text.

## Business approval may not cover technical consequences

Business owners are often asked to approve mapping workbooks.

This is necessary, but approval can be ambiguous.

A business reviewer may confirm:

- the intended meaning;
- the target attribute;
- the value conversion;
- a local exception.

They may not be reviewing:

- data type compatibility;
- extract availability;
- technical dependency;
- target validation;
- load sequence;
- downstream integration;
- test coverage.

Conversely, a technical reviewer may confirm that a rule can be implemented without confirming that the transformation preserves business meaning.

Readiness therefore requires several kinds of evidence:

- business approval;
- architecture alignment;
- source-data evidence;
- implementation evidence;
- testing evidence.

One “Approved” column cannot show all of them reliably.

## Defaults can make incomplete mappings look complete

Defaults are useful and sometimes necessary.

A target field may be mandatory even though the legacy landscape does not contain the required value for every record.

The programme may introduce:

- a fixed default;
- a country-specific default;
- a derived fallback;
- a temporary migration value;
- a placeholder requiring later remediation.

The mapping can then be marked complete because every record will receive a value.

This can create a dangerous illusion.

A technically populated field is not necessarily a meaningful field.

Before accepting a default, we ask:

- Is the value valid for business use?
- Does it influence downstream processing?
- Will users interpret it as real data?
- Does it affect matching, pricing, taxation or reporting?
- Is the default allowed after go-live?
- Can affected records be identified?
- Who owns remediation?
- Is there a deadline?
- Is the exception visible to data stewards?

A default should close a technical gap only when the associated business risk is controlled.

## Organisational context is often missing

SAP target fields frequently depend on context:

- company code;
- sales area;
- purchasing organisation;
- plant;
- storage location;
- country;
- partner role;
- business process.

A mapping row may identify a source and target without stating clearly where the rule applies.

This creates several risks:

- one global rule is assumed where local rules are required;
- repeated rows are mistaken for duplicates;
- local exceptions are not visible to the global team;
- mandatory conditions are applied too broadly;
- a rule is tested in one context and assumed to work everywhere.

For example, a customer classification may be valid at sales-area level rather than globally.

A mapping that ignores this context may populate the correct field for the wrong organisational unit.

We therefore treat context as a first-class part of the mapping, not as optional commentary.

## Dataset readiness changes over time

Even when a mapping has been tested successfully, later extracts may introduce new problems.

Source data is not static.

Between mock loads:

- new records are created;
- values change;
- cleansing is performed;
- extraction logic is modified;
- countries join the scope;
- source systems are patched;
- new codes appear;
- filters change;
- previously excluded populations are added.

A mapping that covered 100% of the first extract may cover only 92% of the next one.

Readiness needs to be recalculated against the current dataset.

This is why we prefer repeatable profiling and validation over one-time sign-off.

The mapping remains part of the approved model. Its data coverage is a current-state measure.

## A completed mapping may conflict with target validation

Migration and MDG teams sometimes implement similar rules in different places.

The migration team checks one set of conditions. SAP MDG applies another.

For example:

- migration allows a blank value while MDG treats it as mandatory;
- migration uses a local code that the target value list rejects;
- migration derives a value after the point where target validation occurs;
- MDG duplicate detection identifies records that migration treated as separate;
- a field is accepted during initial loading but cannot be maintained through the operational workflow.

This conflict may not appear in the mapping workbook.

It appears when the record reaches the target process.

SAP currently positions SAP Master Data Governance as a central governance layer supporting governed models, validated values, workflows, data-quality rules and auditable changes.

Migration readiness therefore has to include alignment with the operational governance behaviour—not only successful preparation of a file.

## A successful technical load is still not full readiness

Suppose all records are loaded without technical errors.

The migration team has achieved an important milestone.

The programme should still verify:

- Are values correct?
- Are relationships intact?
- Are organisational assignments complete?
- Are duplicate outcomes acceptable?
- Can records be changed through the intended process?
- Are validation rules active?
- Did replication reach downstream systems?
- Can stewards identify migrated exceptions?
- Can the results be reconciled with the source?
- Can support teams explain how values were derived?

Technical load success means the system accepted the records.

It does not prove that the records are fit for operational use.

## Readiness needs a chain of evidence

We prefer to evaluate migration readiness as a chain:

```text id="iu6l6h"
Approved business definition
        ↓
Approved target model
        ↓
Available source data
        ↓
Defined mapping and transformation
        ↓
Complete value coverage
        ↓
Aligned target validation
        ↓
Representative test evidence
        ↓
Operational ownership
```

If one link is missing, the mapping may still be complete as a project artefact.

The migration object is not fully ready.

This chain also helps teams identify the actual reason for delay.

Instead of reporting “mapping issue,” the programme can state:

- source-data gap;
- target-model gap;
- value-mapping gap;
- business-decision gap;
- validation conflict;
- test-evidence gap;
- ownership gap.

That classification directs the problem to the right team.

## What should replace the single completion percentage?

We do not recommend removing mapping completion from reporting.

We recommend placing it inside a broader readiness view.

A practical scorecard may include:

| Measure | Question |
|---|---|
| Mapping definition | Is the source-to-target logic documented? |
| Business approval | Is the meaning and transformation approved? |
| Source availability | Does the required data exist in the current extract? |
| Value coverage | Are actual source values covered? |
| Target alignment | Does the mapping match the approved target model? |
| Validation alignment | Will target rules accept the intended result? |
| Test coverage | Has the rule been tested with representative data? |
| Operational ownership | Can the result be governed after go-live? |

These measures should not always be averaged.

A critical mandatory field with no source should remain a blocker even if the other measures are green.

## A better mapping status model

For critical mappings, we use a lifecycle such as:

### Identified

The relevant business attribute, source and target have been identified.

### Defined

The transformation, context and value treatment are sufficiently precise.

### Approved

The appropriate business and architecture owners have accepted the rule.

### Implemented

The rule exists in the migration solution.

### Dataset-validated

The rule has been checked against the current migration dataset.

### Tested

Representative records have passed the relevant technical and business tests.

### Ready

The mapping is aligned with the approved model, target validations and operational ownership.

This lifecycle makes progress more visible, not less.

A manager can see whether a domain is delayed because definitions are missing, source data is unavailable or tests have not been completed.

## How management can detect false readiness

A manager does not need to inspect every row.

We recommend asking a small number of direct questions.

### Which model baseline are the mappings based on?

If the answer is unclear, completion cannot be trusted.

### How many completed mappings have been validated against the latest extract?

A mapping reviewed against an old file may no longer have full coverage.

### Which mandatory target attributes have no reliable source?

These should be visible separately from general mapping progress.

### How many value mappings contain unmatched current values?

Field-level completion may hide large conversion gaps.

### Which rules still use temporary defaults?

Defaults should be reviewed as risks, not hidden as completed logic.

### Which mappings differ by country or organisational context?

Global completion percentages often hide local incompleteness.

### Which completed mappings have not been tested?

Definition completion and test completion should be reported separately.

### Which mappings conflict with current MDG validations?

The load and operational governance model must agree.

### Which accepted exceptions have post-go-live owners?

A migration exception without ownership is deferred failure.

## A practical example

Consider a supplier payment-method attribute.

The mapping workbook shows:

```text id="zud75x"
Legacy payment method → SAP payment method
Status: Complete
```

The details reveal:

- four source systems use different codes;
- one country stores multiple payment methods in one field;
- several values are obsolete;
- the target list contains fewer values;
- blank values occur in 18% of active suppliers;
- the migration team proposes a default;
- the business owner has approved the target list but not the default;
- MDG validation rejects the default for one company code;
- no test covers the multi-value source case.

The mapping is complete in the narrow sense that source and target have been selected.

It is not ready.

The remaining work includes:

- value mapping;
- context definition;
- business approval;
- blank-value treatment;
- validation alignment;
- representative testing.

This is not an argument for keeping the mapping open forever.

It is an argument for reporting its state accurately.

## The relationship with SAP MDG

SAP MDG can govern operational master data through models, workflows, validated values, quality rules and auditability. SAP also recommends curating master data early, before an SAP S/4HANA implementation, because automated target processes depend on clean and correct master data.

Migration is responsible for creating the initial population that enters this governed environment.

The mapping therefore needs to satisfy two conditions:

1. It must transform legacy data into the approved target structure.
2. The resulting record must remain meaningful and maintainable under the operational governance model.

A rule that produces loadable data but unusable operational data is not ready.

This is why migration and MDG teams need shared model control rather than separate completion reports.

## Where Martenweave fits

We built Martenweave to make the difference between mapping status and migration readiness visible.

Martenweave can represent separately:

- business attributes;
- source fields;
- target endpoints;
- organisational contexts;
- mappings;
- transformations;
- value lists;
- value mappings;
- validation rules;
- ownership;
- decisions;
- datasets;
- gaps;
- change proposals.

The current core supports canonical model files, deterministic validation, generated indexes, dataset profiling, gap detection, trace and impact analysis, reports and reviewable model changes.

For SAP migration, the model can connect a legacy column to an SAP field endpoint, compare the expected structure with actual CSV or XLSX datasets, identify missing coverage and trace affected objects before a change is approved.

This supports a more useful readiness view:

```text id="e6kou7"
Mapping defined
        +
Source present
        +
Values covered
        +
Target aligned
        +
Validation passed
        +
Evidence available
        =
Ready for migration review
```

Martenweave does not decide that a domain is ready automatically.

It provides the model relationships and deterministic checks that allow architects, migration leads and business owners to make that decision with better evidence.

## A minimal readiness report

For each critical mapping, we recommend exposing:

- mapping identifier;
- business attribute;
- context;
- source endpoint;
- target endpoint;
- transformation status;
- business approval;
- source availability;
- current dataset coverage;
- unmapped values;
- validation status;
- test evidence;
- open issues;
- owner;
- accepted exceptions.

For management, these details can be summarised by domain:

- total critical mappings;
- defined;
- approved;
- validated against current data;
- tested;
- blocked;
- accepted with exceptions.

This is more informative than one completion percentage while remaining manageable.

## When mapping completion is sufficient

There are smaller scenarios where mapping completion is a reasonable proxy.

For example:

- one source system;
- one stable target;
- a small number of fields;
- no complex value lists;
- limited organisational variation;
- reliable data;
- a stable team;
- low operational risk.

In that situation, the additional readiness dimensions may be simple to verify informally.

We do not recommend introducing heavy governance where the cost of failure is low and the relationships are easy to understand.

The need for formal readiness control grows with:

- number of systems;
- number of countries;
- model complexity;
- business criticality;
- duration;
- number of vendors;
- volume of change;
- cost of rework.

## Common reporting mistakes

### Reporting percentages without definitions

A number has little value when teams interpret “complete” differently.

### Combining critical and non-critical mappings

A missing optional description field should not offset a missing mandatory tax or organisational attribute.

### Averaging blockers into a positive score

A domain can be 95% complete and still be unfit for loading.

### Using old dataset evidence

Readiness should reflect the current migration population.

### Treating accepted risk as resolved work

An accepted exception remains an exception. It needs ownership and follow-up.

### Reporting activity instead of evidence

Completed workshops and updated workbooks do not prove model and data alignment.

## Our conclusion

Mapping completion is a useful delivery metric.

It should remain in the programme dashboard.

But it should be labelled honestly.

It tells us how much mapping work has been recorded as complete. It does not tell us whether:

- the current source data supports the target;
- actual values are covered;
- transformations are precise and approved;
- MDG validations are aligned;
- representative tests have passed;
- accepted exceptions have operational owners.

We use migration readiness as the broader decision.

Our practical rule is:

> A mapping is complete when its logic has been documented and approved. It is ready when the programme has evidence that the logic works against the current data, target model and operational controls.

This distinction may reduce the headline percentage reported during early phases.

It gives management a more accurate picture of risk.

That is preferable to discovering after a mock load that a programme with 96% mapping completion was never 96% ready.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We work on practical model governance for SAP migration, MDG, MDM and AMS programmes. Our focus is helping architects and delivery teams separate visible activity from actual readiness, find model and dataset gaps earlier and reduce expensive rework during testing and cutover.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP describes SAP Master Data Governance as a central governance layer supporting governed models, golden records, matching and consolidation, workflows, validated values, data-quality monitoring and auditable changes. SAP also recommends curating master data early before an SAP S/4HANA implementation.

Martenweave’s public product materials describe canonical model files, deterministic validation, dataset profiling, gap detection, traceability, impact analysis and reviewable model-change proposals.

The Martenweave SAP migration scenario documents explicit source-to-target mappings, contextual modelling, dataset gap detection and lineage.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
