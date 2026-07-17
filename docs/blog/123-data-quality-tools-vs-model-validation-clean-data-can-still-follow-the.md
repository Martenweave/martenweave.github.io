# Data Quality Tools vs Model Validation: Clean Data Can Still Follow the Wrong Rules

A data-quality report can be completely green while the migration is still wrong.

Every required field is populated.

Dates follow the expected format.

Codes belong to approved lists.

Duplicates remain below the accepted threshold.

Referential checks pass.

The dataset satisfies every rule it was given.

Then the first business test begins, and the team discovers that the wrong rule was implemented.

This is not an unusual edge case. It is one of the central weaknesses in how enterprise programmes discuss data quality.

Projects spend considerable effort checking whether data conforms to rules. They spend much less effort checking whether those rules form a coherent model.

The distinction matters because a data-quality tool and a model validator answer different questions.

A data-quality tool asks:

> Does this dataset satisfy the defined expectations?

A model validator asks:

> Are the expectations, mappings, fields, dependencies and decisions themselves consistent?

Both controls are necessary.

Neither can safely replace the other.

## Data quality starts after someone has defined “good”

Every data-quality check contains an assumption about the desired state.

A field should not be empty.

A date should fall within a valid range.

A customer number should be unique.

A country code should belong to an approved list.

A material weight should be greater than zero.

Great Expectations describes an Expectation as an explicit definition of the state to which data should conform. Expectations can then be grouped and run against a dataset to produce validation results.

Soda follows a similar principle through checks over metrics such as missing values, freshness, distributions, schema, references and reconciliation.

These tools are useful because they turn vague statements such as “the data should be clean” into executable checks.

But they cannot escape the first question:

**Who decided what the correct expectation is?**

Suppose a project defines this rule:

> Shipping condition must not be empty for every customer.

The tool can execute it perfectly.

It can identify every empty value.

It can block the load.

It can produce a clear failure report.

The rule may still be wrong.

Perhaps shipping condition is mandatory only for customers with a sales-area extension.

Perhaps it should be derived for one business unit.

Perhaps local-pickup customers are allowed to leave it empty.

Perhaps the field is no longer populated from the legacy system because SAP determines it through another rule.

The data-quality tool has not failed.

It has correctly enforced an incomplete model.

## The dangerous comfort of a green dashboard

Managers understandably prefer clear status.

A dashboard showing 99.8% data quality appears reassuring. A report containing thousands of rows and several unresolved definitions does not.

This creates pressure to reduce complex readiness questions to a single score.

The score may combine measures such as:

- completeness;
- validity;
- uniqueness;
- consistency;
- conformity;
- freshness.

These are useful dimensions.

But they measure the data against the rules that have been configured.

They do not prove that:

- the correct source field was selected;
- the target attribute has the right meaning;
- the rule applies to the correct population;
- local exceptions have been represented;
- the mapping reflects the latest decision;
- downstream systems use the same definition;
- two checks do not contradict one another.

A dataset can achieve excellent quality against the wrong target.

This is the data equivalent of manufacturing a component with perfect precision from an outdated drawing.

The production process may be controlled.

The design is still wrong.

## A practical example: material gross weight

Consider a material migration into SAP S/4HANA.

The project defines a quality rule:

> Gross weight must be greater than zero.

The source dataset is checked.

Several thousand materials fail because gross weight is empty.

The business enriches the records.

The next report is green.

During warehouse testing, the team discovers that many values are technically valid but operationally meaningless.

For some materials, weight was entered in grams while the weight-unit field says kilograms.

For others, the source value describes one consumer package while SAP expects the base unit.

A third group contains estimated values copied from a product family because no measured value was available.

Every record satisfies the original check:

- gross weight is populated;
- gross weight is numeric;
- gross weight is greater than zero;
- weight unit contains an approved code.

The data passes.

The model does not.

The project never defined clearly:

- what physical object the weight describes;
- which unit of measure provides the reference quantity;
- whether estimated values are allowed;
- which source system is authoritative;
- how packaging levels should be distinguished;
- which warehouse and transportation processes consume the value.

Adding more row-level checks may catch some symptoms.

It will not automatically produce the missing definition.

## Data quality validates instances

A dataset contains instances.

A customer row is an instance of a customer model.

A material row is an instance of a material model.

A supplier record is an instance of a supplier model.

Data-quality checks usually evaluate those instances.

They ask questions such as:

- Is the value present?
- Does it have the expected format?
- Does it fall within an accepted range?
- Is it unique?
- Does it match a reference list?
- Is it consistent with another value?
- Has the dataset arrived on time?

This is essential work.

A migration cannot succeed if records are malformed, incomplete or internally inconsistent.

But the checks assume that the project already knows what the fields mean, which rules apply and which relationships are correct.

That assumption is often unsafe.

## Model validation checks the structure behind the instances

Model validation operates one level earlier.

It checks whether the definitions used to assess the data are internally coherent.

A model validator may verify that:

- every mapping references an existing source field;
- every target field belongs to a defined target object;
- every validation rule references a known attribute;
- every conditional rule uses defined conditions;
- every active mapping points to an approved transformation;
- every exception refers to an existing rule;
- every dataset expectation corresponds to a registered field;
- deprecated fields are not used by active mappings;
- identifiers are unique;
- required ownership and evidence are present;
- approved and proposed states are kept separate.

These checks do not tell us whether a customer row contains a valid postal code.

They tell us whether the postal-code rule is attached to a real attribute, applies to the intended population and remains connected to the current mapping.

This is a different layer of control.

## The difference between a bad value and a bad rule

Managers need to distinguish two failure types.

### A bad value

The rule says that payment terms must use an approved target code.

A supplier record contains an unknown code.

The model may be correct. The data is wrong or incomplete.

### A bad rule

The project maps legacy code `30D` to one SAP payment term for every supplier.

Later, it discovers that one business unit uses `30D` with a different baseline-date calculation.

Every supplier record may contain a valid code.

The rule itself is incomplete.

The first problem can be solved through cleansing, enrichment or rejection.

The second requires business analysis, model correction, impact review and approval.

Treating both as ordinary data-quality failures leads to the wrong work.

The data team keeps correcting records when the programme should be correcting the model.

## When more checks make the problem worse

A common response to migration defects is to add another validation rule.

A field was missing, so a completeness check is introduced.

A code failed in SAP, so a reference-list check is added.

An interface rejected a value, so a format check is created.

This is sensible when the underlying rule is understood.

It becomes dangerous when each defect produces an isolated check without updating the model around it.

Over time, the project accumulates validations that:

- use different names for the same concept;
- apply to overlapping populations;
- encode temporary workarounds;
- conflict with approved exceptions;
- refer to obsolete source fields;
- duplicate rules implemented elsewhere;
- cannot be traced to a business decision.

The number of checks increases.

Confidence should not necessarily increase with it.

A large rule library is valuable only when the rules remain connected to clear definitions, ownership and evidence.

Otherwise, the project creates what might be called **validation debt**: a growing collection of executable logic that nobody can confidently explain or change.

## One rule can be correct in one system and wrong in another

Data quality is contextual.

A value can be valid for the source system and unsuitable for the target.

A blank field may be acceptable in the legacy system because the process derives it later. The SAP target may require the value during creation.

A local supplier classification may be valid in one country but cannot be used in the global target model.

A material description may meet source-system length limits but be truncated in an external warehouse.

A technically valid date may violate a business sequence when combined with another event.

This is why migration quality cannot be assessed only by profiling the source in isolation.

The data must be checked against the intended target model and process context.

That requires explicit relationships between:

- source fields;
- business attributes;
- target fields;
- transformations;
- rules;
- datasets;
- organisational conditions;
- external consumers.

Without that model, the team can prove that the source data is internally clean and still fail to prove that it is fit for migration.

## Dataset profiling is not dataset readiness

Profiling tells the team what a dataset contains.

It may report:

- column names;
- datatypes;
- null percentages;
- distinct values;
- minimum and maximum values;
- common patterns;
- duplicate rates.

This is valuable evidence.

But profiling does not by itself determine readiness.

Suppose a supplier extract contains 98 columns, low null rates and no duplicate supplier IDs.

The profile looks healthy.

The approved migration model expects an additional tax-classification field for suppliers in two countries.

That field does not exist in the extract.

Nothing in the profile is necessarily wrong.

The dataset is still not ready.

Readiness is relational.

It compares the data that exists with the model that must be satisfied.

This is one of the main reasons a model registry is useful around data-quality tooling.

The quality tool can evaluate the supplied columns.

The registry can determine whether the correct columns were supplied in the first place.

## A second example: customer tax numbers

Consider a Business Partner migration.

The programme defines several checks:

- tax number must not contain spaces;
- value must fit the target-field length;
- country-specific format must be respected;
- duplicates are not allowed within a tax-number category.

The checks are implemented well.

The dataset passes.

During business validation, the tax team discovers that the project used the customer’s registration number where the target design expected a VAT number for one country.

The values are real.

They are correctly formatted.

They are unique.

They fit the target field.

They represent the wrong business concept.

No amount of generic profiling could have discovered this without an approved semantic definition and source-to-target relationship.

The project needs to know:

- which tax identifier the source field represents;
- which SAP tax-number category should receive it;
- whether the rule differs for organisations and individuals;
- which countries use the field;
- which evidence supports the mapping;
- which interfaces consume the target value.

The defect is not dirty data.

It is semantic misalignment.

## Clean data can preserve a bad decision

A rule may be technically and semantically clear but based on an obsolete decision.

Suppose a migration design states that every customer in a region should receive a particular delivery priority.

The business later changes the policy.

The decision is recorded in a ticket.

The mapping workbook is updated, but the data-quality check still validates against the previous value.

The dataset now fails because the validation is stale.

Or worse: the dataset is produced using the old mapping and passes the old check.

The whole control chain agrees with itself while disagreeing with the current business decision.

This is why evidence and change history matter.

A rule should not exist only as executable code.

The team should be able to trace it to:

- the attribute it validates;
- the population to which it applies;
- the decision that authorised it;
- the model version in which it became active;
- the owner responsible for approving changes.

Without this traceability, a passing test proves only that the data matches some rule—not that it matches the currently approved rule.

## Model validation should happen before dataset validation

The normal sequence is often:

1. receive a dataset;
2. run quality checks;
3. review failures;
4. correct data;
5. repeat.

A stronger sequence begins earlier:

1. validate the model;
2. confirm that mappings and rules are structurally coherent;
3. build the expected dataset specification;
4. compare the supplied dataset with that expectation;
5. run record-level quality checks;
6. review failures in their model context;
7. approve any model changes separately from data corrections.

This order avoids a basic waste: repeatedly validating records against an inconsistent design.

It also helps classify findings correctly.

When a check fails, the team can ask:

- Is the record wrong?
- Is the supplied dataset incomplete?
- Is the mapping wrong?
- Is the validation rule wrong?
- Is an exception missing?
- Has the model changed without the check being updated?

That classification determines who should act.

## Different teams own different failures

One reason data-quality programmes become overloaded is that every problem is routed to the data team.

But not every failed check is a data-remediation task.

Consider several examples:

| Finding | Likely owner |
|---|---|
| Missing value in a valid required field | Source-data owner |
| Source column absent from the extract | Extraction or source-system team |
| Target field incorrectly marked mandatory | Functional or solution-design owner |
| Legacy code has two business meanings | Business owner |
| Transformation references an obsolete field | Migration-development team |
| Approved exception missing from validation | Model or governance owner |
| Interface uses another code definition | Integration and business owners |

The tool may detect the symptom.

The model helps route the issue.

Without that distinction, the data team becomes the project’s general repair department.

## What data-quality tools do particularly well

The argument is not against data-quality tooling.

These systems are strong where the problem is executable assessment of data.

They can provide:

- reusable checks;
- repeatable validation;
- failed-record details;
- metrics and trends;
- alerts;
- pipeline integration;
- threshold-based acceptance;
- profiling;
- schema monitoring;
- reconciliation.

Great Expectations, for example, ties data batches to collections of Expectations and returns detailed validation results, including failed counts and percentages.

Soda supports a broad set of check types, including missing-value, numeric, freshness, schema, reference, distribution and reconciliation checks.

OpenMetadata also places quality tests within a wider metadata and observability environment.

These are useful capabilities for operating data pipelines and migration checks.

A model registry should not attempt to rebuild all of them.

## What model validation adds

A model registry adds the context that quality checks normally assume.

It can establish that:

- the checked column corresponds to an approved business attribute;
- the attribute is expected in this dataset;
- the rule applies only under defined conditions;
- the value mapping has an owner;
- an exception has been approved;
- the field is used by several downstream objects;
- a proposed rule change affects other datasets;
- the current check reflects the latest model version.

The quality engine executes the rule.

The registry explains why the rule exists and whether it still belongs in the model.

## The two layers should be connected

A practical architecture should not force teams to choose between data-quality checks and model validation.

The systems should reinforce each other.

The model registry can define:

- which attributes require checks;
- which dataset contains them;
- which conditions apply;
- which owner is responsible;
- which evidence supports the rule;
- which severity should be assigned;
- which model version introduced the rule.

The quality tool can execute the checks and return:

- pass or fail status;
- failed counts;
- affected records;
- observed values;
- execution time;
- trend information.

The result can then become evidence in the registry.

This creates a useful loop:

```text
Approved model
    → executable quality checks
    → validation results
    → model evidence
    → proposed correction
    → impact review
    → approved model change
```

The registry should not replace the quality engine.

The quality engine should not become the only place where the model exists.

## What managers should ask when a quality report is green

A green report should trigger confidence, but not automatic acceptance.

Managers should ask five additional questions.

### Were the right fields checked?

A report may cover every column in the supplied file while the file itself is missing an expected field.

### Were the right rules used?

The checks may be technically valid but based on an obsolete workbook or incomplete requirement.

### Were the rules applied to the right population?

A global mandatory check may hide country, role, plant or customer-type conditions.

### Do the checks agree with the mappings and target design?

A rule can validate one interpretation while the transformation implements another.

### What important conditions are not covered?

Not every business dependency is executable as a simple row-level check.

The report should state its coverage and limitations.

## What managers should ask when a quality report is red

A failed check is not yet a diagnosis.

Ask:

- Is the source value actually wrong?
- Is the dataset missing required context?
- Is the rule too broad?
- Is the target expectation correct?
- Does an approved exception exist?
- Did the model change after the check was implemented?
- Which team has authority to resolve the underlying issue?

This prevents the common cycle in which analysts modify records simply to make the dashboard green.

A corrected percentage is not the same as a resolved business problem.

## How Martenweave fits

Martenweave is not intended to replace Great Expectations, Soda or enterprise data-quality platforms.

Its role is to control the model around the checks.

Canonical model files can describe objects, attributes, fields, mappings, datasets, rules, evidence and decisions. The core validates IDs, references and domain relationships before building its generated indexes. It can profile CSV and XLSX datasets, identify dataset-to-model gaps, trace dependencies and turn findings into reviewable patch proposals.

This allows Martenweave to answer questions that a record-level check alone cannot:

- Is this field expected in the dataset?
- Which attribute does it represent?
- Which mapping populates it?
- Which rule should validate it?
- Which exception modifies the rule?
- Which decision approved the current definition?
- What else must be reviewed if the rule changes?

The actual row-level validation may remain in a specialised quality tool.

Martenweave provides the governed context and change model around it.

## When a data-quality tool may be enough

A separate model registry may add little value when:

- the data model is stable;
- one team owns both definitions and checks;
- mappings are simple;
- few systems are involved;
- rules rarely change;
- exceptions are limited;
- dataset schemas are controlled;
- quality checks are already traceable to approved requirements.

In such an environment, adding another layer may create unnecessary maintenance.

The smallest sufficient solution is usually the better one.

## When model validation becomes necessary

The need becomes stronger when:

- several source systems use different meanings;
- mappings change across migration waves;
- rules vary by country, plant or organisational level;
- business decisions live outside the quality tool;
- different teams maintain mappings and validations;
- datasets frequently change structure;
- external warehouses or 3PLs use the same fields differently;
- AI is generating candidate mappings or rules;
- the same failed checks return after supposed resolution;
- management cannot explain what the readiness score actually covers.

At that point, the project is not dealing only with dirty data.

It is dealing with model uncertainty.

## The management rule

The distinction can be reduced to two questions.

**Data-quality validation asks:**

> Does the data comply with the rules?

**Model validation asks:**

> Are these the correct, complete and internally consistent rules for this data?

A mature programme needs both answers.

Data-quality tools prevent invalid records from moving forward.

Model validation prevents the programme from confidently validating the wrong design.

Clean data is valuable.

But clean data following the wrong rule is not readiness.

It is a well-tested mistake.
