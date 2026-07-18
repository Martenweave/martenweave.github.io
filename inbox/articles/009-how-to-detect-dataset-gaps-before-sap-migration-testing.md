# How to Detect Dataset Gaps Before SAP Migration Testing

**Reviewed: 14 July 2026**

Many SAP migration programmes treat testing as the first serious encounter between the target model and the source data.

The target structure is designed. Mappings are documented. Transformation routines are built. A migration file is prepared and sent into the first mock load.

Only then does the programme discover that:

- required columns are missing;
- source values do not fit the target code lists;
- relationships cannot be reconstructed;
- mandatory attributes are empty for important populations;
- the same field means different things across countries;
- extraction logic does not match the mapping specification;
- records that looked complete in Excel fail under actual SAP or MDG rules.

These findings are often recorded as testing defects.

Many of them are not testing defects.

They are dataset-to-model gaps that existed before testing began.

The load did not create the problem. It only made the problem visible.

Our approach is to compare representative datasets with the approved model before formal migration testing. The goal is not to predict every possible load error. It is to remove avoidable uncertainty before the programme starts spending test cycles on problems that can be detected directly from the data and model.

> Migration testing should verify implemented behaviour. It should not be the first time the programme checks whether the required data exists.

## What we mean by a dataset gap

A dataset gap is a difference between what the approved migration model expects and what the current dataset can provide or prove.

This definition is broader than a missing column.

A dataset can contain every expected column and still have serious gaps.

For example:

- the column exists but is empty for one country;
- values use codes not represented in the approved mapping;
- the required parent record is missing;
- the field contains several business concepts combined into one string;
- the mapping expects one value per record, but the source contains several;
- a date field contains ambiguous free text;
- an organisational assignment exists in the source but not in the target scope;
- a relationship cannot be linked because identifiers are inconsistent;
- values meet the technical format but not the agreed business definition.

We therefore treat dataset gaps as a family of problems rather than one technical check.

## Why these gaps are found too late

The information needed to identify many gaps exists early in the programme.

The target team knows which attributes and relationships are expected.

The migration team has mapping workbooks.

Source owners can usually provide representative extracts.

Business teams know the most important local variations.

The problem is that these inputs are often reviewed separately.

The target model is reviewed as a design.

The mapping is reviewed as a document.

The source extract is profiled as a data-quality exercise.

No controlled comparison proves that all three remain aligned.

This separation creates a familiar sequence:

```text id="dsgap1"
Target model approved
        ↓
Mappings completed
        ↓
Migration routines built
        ↓
Mock load executed
        ↓
Dataset gaps discovered
```

We prefer a different sequence:

```text id="dsgap2"
Target model defined
        ↓
Representative dataset profiled
        ↓
Model and dataset compared
        ↓
Gaps assigned and resolved
        ↓
Mappings and routines implemented
        ↓
Mock load verifies behaviour
```

The second approach does not eliminate defects.

It improves the quality of the defects reaching testing.

Instead of discovering that a required source field does not exist, the programme can spend the test cycle on whether the agreed treatment works correctly.

## A model is an expectation

A migration model expresses expectations about the data.

It may state that a Business Partner requires:

- a name;
- an address;
- a country;
- one or more roles;
- organisational assignments;
- tax information in defined contexts;
- relationships to other parties;
- controlled code values;
- stable source identifiers.

The dataset provides evidence about whether those expectations can be met.

The two should be compared explicitly.

This sounds obvious, but many mapping processes compare fields only at design time:

```text id="dsgap3"
Expected source field → Target field
```

The programme also needs to compare the current data:

```text id="dsgap4"
Expected field
        ↕
Actual column presence
Actual completeness
Actual values
Actual formats
Actual relationships
Actual population coverage
```

A mapping tells us what should happen.

A profile tells us whether the current population supports it.

## The major types of dataset gaps

We use several categories because each type requires a different response.

# 1. Structural gaps

A structural gap exists when the dataset does not contain the columns, files or relationships expected by the model.

Examples include:

- an expected column is absent;
- a column has been renamed;
- a relationship is supplied in a separate file that was not included;
- a target attribute has no identified source;
- the extract contains a flattened structure while the target requires repeating records;
- the mapping expects several source columns that were combined during extraction;
- the expected key is not included.

Structural checks are the simplest to automate and should happen immediately when a new extract arrives.

They answer questions such as:

- Are all required columns present?
- Are unexpected columns present?
- Does the file structure match the agreed interface?
- Are required keys available?
- Can related files be joined?
- Has the extraction structure changed since the previous version?

A mock load should not be the mechanism used to discover that a required file was omitted.

# 2. Completeness gaps

A column can exist while providing insufficient data.

Completeness must be measured against the relevant population and context.

For example:

- Tax Number is 92% complete globally but 20% complete for one country.
- Purchasing Organisation is populated for active suppliers but absent from blocked suppliers that must still be migrated.
- Customer Group is complete for one source system and largely blank in another.
- A plant-level material attribute exists only for selected plants.

An overall completeness percentage can conceal the operational gap.

We therefore profile completeness by dimensions such as:

- source system;
- country;
- company code;
- sales organisation;
- purchasing organisation;
- plant;
- record type;
- status;
- migration wave;
- business unit.

The relevant question is not:

> How complete is this column?

It is:

> Is this column complete enough for the population and context we intend to migrate?

# 3. Value-domain gaps

A value-domain gap exists when the dataset contains values that are not covered by the approved target list or value mapping.

Examples include:

- unexpected codes;
- inactive codes still used by current records;
- local codes not included in the global design;
- values differing only by spacing or case;
- blank, zero and “unknown” used inconsistently;
- one source value mapping to several possible target values;
- several source values being merged without business approval.

A value-mapping workbook may appear complete because every expected source code has a target.

The real dataset may contain additional values that were never included in the workbook.

This is why we calculate value coverage against actual data:

```text id="dsgap5"
Observed source values
        ↓
Normalisation
        ↓
Mapped values
Unmapped values
Ambiguous values
Deprecated values
```

The programme then decides whether unmatched values should be:

- added to the mapping;
- corrected in the source;
- normalised;
- rejected;
- defaulted;
- excluded;
- reviewed manually.

That decision should happen before the load routine encounters the value.

# 4. Format and representation gaps

Some values contain the right information in a form that does not match the target expectation.

Examples include:

- dates stored in several formats;
- leading zeros removed from identifiers;
- decimal separators varying by country;
- multiple values combined in one field;
- names and addresses stored in unstructured text;
- country codes mixed between ISO forms and local abbreviations;
- boolean values represented as `Y/N`, `1/0`, `true/false` and blanks;
- units stored inside numeric fields;
- invalid character encoding;
- text truncated by the extraction format.

These problems are often described as technical cleansing.

Some are technical. Others require business interpretation.

Removing spaces from a tax identifier may be straightforward. Deciding which of two values in one field is authoritative is not.

We distinguish between:

- syntactic normalisation;
- semantic transformation;
- business decision.

Only the first category should be treated as automatically safe.

# 5. Context gaps

A value can be present but attached to the wrong or incomplete business context.

This is especially important in SAP master data.

Examples include:

- a customer attribute available centrally but required by sales area;
- supplier data available generally but missing by purchasing organisation;
- material data complete at basic level but absent for one plant;
- a local field included without the country or company-code condition that explains it;
- the same source value meaning different things in different organisational units.

A flat dataset may hide these distinctions.

The programme should compare data at the same level at which the target model expects it.

For example:

```text id="dsgap6"
Customer
 ├── Central data
 ├── Company code A
 ├── Company code B
 ├── Sales area 1
 └── Sales area 2
```

A customer record is not complete merely because the central row exists.

If the go-live scope includes Sales Area 2, the required organisational data must also be present.

# 6. Relationship gaps

Enterprise master data is not a collection of independent rows.

Important meaning exists in relationships:

- Business Partner roles;
- customer and supplier links;
- parent and child organisations;
- partner functions;
- material hierarchies;
- product classifications;
- bank details linked to an owner;
- addresses linked to a usage;
- organisational assignments;
- contact relationships.

A relationship gap exists when:

- a child record has no parent;
- a referenced identifier does not exist;
- keys differ between files;
- the relationship type is unknown;
- duplicate records create ambiguous links;
- the source stores the relationship indirectly;
- one part of the relationship is outside the migration scope.

Relationship gaps are frequently discovered late because teams profile files column by column.

We also need cross-file and cross-object checks.

For example:

- Does every sales-area record have a valid customer parent?
- Does every partner function reference a Business Partner included in scope?
- Does every classification value exist in the reference dataset?
- Can every legacy supplier bank record be linked to one supplier?
- Do hierarchy nodes have valid parents?

A file can be internally clean and still be unusable as part of the full model.

# 7. Identifier gaps

Identifiers hold the migration together.

A dataset gap exists when identifiers are:

- missing;
- duplicated unexpectedly;
- unstable between extracts;
- formatted inconsistently;
- reused for different business objects;
- changed without preserving legacy references;
- insufficient to join related datasets.

Identifier problems affect more than loading.

They affect:

- deduplication;
- key mapping;
- reconciliation;
- relationship creation;
- downstream integration;
- auditability;
- post-go-live investigation.

Before testing, the programme should prove that each record can be identified consistently across:

- source extracts;
- mapping logic;
- staging;
- target loading;
- error reports;
- reconciliation;
- key-mapping tables.

If the programme cannot trace a rejected target record back to its source record, the migration process is not operationally ready.

# 8. Rule-coverage gaps

A dataset may contain values, but the programme may not know whether they satisfy the approved rules.

Examples include:

- a mandatory field is populated with a placeholder;
- a date is syntactically valid but outside an allowed range;
- a code is valid globally but invalid for one country;
- two fields contain an inconsistent combination;
- a required relationship exists only for part of the population;
- a bank record passes format checks but lacks required ownership evidence.

Rule-coverage analysis compares the dataset with business and target rules before the full migration routine is executed.

Useful checks include:

- conditional mandatory rules;
- cross-field consistency;
- reference integrity;
- context-specific value restrictions;
- duplicate indicators;
- required relationship presence;
- mutually exclusive values;
- valid date and status combinations.

This is not intended to recreate the full SAP or MDG validation engine.

It identifies whether the dataset contains populations likely to conflict with known rules.

# 9. Scope gaps

A dataset may be high quality but incomplete relative to the migration scope.

Examples include:

- one country was omitted;
- blocked records were excluded without approval;
- records from a recently acquired business unit are missing;
- one legacy system was not included;
- inactive records required for historical relationships were filtered out;
- the extract contains only header data, while organisational extensions are expected.

Scope gaps are difficult to detect through field profiling alone.

The programme needs population expectations:

- expected record counts;
- expected organisations;
- expected source systems;
- expected statuses;
- expected countries;
- expected relationships;
- expected date ranges.

We compare actual coverage with those expectations.

A dataset of 100,000 technically valid records may still be incomplete if 20,000 in-scope records were never extracted.

# 10. Temporal gaps

Data changes during the programme.

A profile from three months ago does not prove that the current extract is ready.

Temporal gaps include:

- new source values appearing;
- previously complete fields becoming less complete;
- extraction logic changing;
- source cleansing altering relationships;
- new records added after the profiling date;
- target rules changing without rechecking the data;
- local scope expanding;
- reference data becoming obsolete.

Every material dataset version should therefore be compared with:

1. the current approved model; and  
2. the previous relevant dataset version.

The first comparison finds model gaps.

The second finds change.

## What to profile before migration testing

A useful pre-test profile should provide more than row counts.

For each dataset, we recommend capturing:

- dataset identifier and version;
- extraction date;
- source system;
- scope and filtering criteria;
- row count;
- column list;
- inferred or declared data types;
- blank counts and rates;
- distinct values;
- minimum and maximum values where useful;
- length distributions;
- pattern distributions;
- duplicate indicators;
- key uniqueness;
- invalid references;
- join coverage;
- unexpected values;
- context-level completeness;
- differences from the previous extract.

Not every field requires the same depth.

Critical and high-risk attributes deserve more detailed analysis.

Examples include:

- identifiers;
- tax information;
- organisational assignments;
- bank data;
- classification fields;
- status fields;
- reference codes;
- relationship keys;
- attributes driving pricing, compliance or workflow.

The profiling strategy should be risk-based rather than mechanically identical for every column.

## The model must be precise enough to compare

Automated gap detection is only as good as the model.

The model should tell us:

- which fields are expected;
- which are required;
- in which context they are required;
- what values are allowed;
- which source endpoint is expected;
- which relationships must exist;
- which rule applies;
- which population is in scope.

If the target model is only a list of field names, the comparison will be shallow.

For example, this requirement is difficult to validate:

```text id="dsgap7"
Tax Number — mandatory
```

A more useful model states:

```text id="dsgap8"
Attribute: Tax Number
Context: Business Partner tax category DE1
Population: Organisations registered in Germany
Requirement: Mandatory unless an approved exemption applies
Source: LEGACY_BP.DE_TAX_ID
Normalisation: Remove spaces, uppercase letters
Invalid treatment: Reject for review
Owner: German Tax Data Owner
```

The second representation allows the programme to profile the relevant population and classify gaps meaningfully.

## Do not confuse detection with resolution

A gap report does not decide automatically what the programme should do.

Suppose 15% of supplier records lack a required classification.

The correct response could be:

- source remediation;
- business enrichment;
- approved derivation;
- temporary default;
- target-model change;
- exclusion from scope;
- accepted post-go-live remediation.

The tool can identify the population and affected model objects.

The programme must make the decision.

We deliberately separate:

```text id="dsgap9"
Detection → Classification → Ownership → Decision → Implementation → Verification
```

Skipping classification creates a defect backlog filled with different kinds of problems.

Skipping ownership creates reports that nobody acts on.

Skipping verification allows the same gap to return in the next extract.

## How to classify gaps

We use a practical classification model.

### Source gap

The required data is absent or unreliable in the source.

### Extraction gap

The source contains the data, but the extract does not.

### Model gap

The approved model does not adequately represent the business requirement or source reality.

### Mapping gap

The source and target exist, but the transformation is missing or ambiguous.

### Value-mapping gap

Observed source values are not covered.

### Context gap

The rule or value cannot be interpreted without missing organisational or business context.

### Relationship gap

Required links between records cannot be constructed.

### Governance gap

A technical treatment is possible, but no owner has approved it.

### Test-evidence gap

The rule is defined and implemented but has not been verified with representative data.

This classification helps management understand whether the migration team can resolve the issue alone.

Often it cannot.

## A practical pre-testing process

We recommend a repeatable cycle rather than a one-time data-quality assessment.

# Step 1: Freeze a model baseline

Identify the approved model version against which the dataset will be checked.

The baseline should include:

- target attributes;
- required contexts;
- source expectations;
- value lists;
- mappings;
- relevant rules;
- scope.

Without a baseline, gap results cannot be interpreted consistently.

# Step 2: Register the dataset

Record:

- source;
- extraction date;
- filters;
- included populations;
- file structure;
- responsible owner;
- intended migration wave.

A file called `Customer_Final.xlsx` is not sufficient dataset identity.

# Step 3: Run structural checks

Check:

- expected columns;
- unexpected columns;
- data types;
- required keys;
- duplicate column names;
- related-file availability;
- join fields.

These checks should produce immediate blockers where appropriate.

# Step 4: Profile critical values

Measure:

- completeness;
- uniqueness;
- distributions;
- patterns;
- lengths;
- invalid references;
- context variation;
- observed source codes.

Do not wait until every field is perfectly modelled. Start with the fields carrying the greatest risk.

# Step 5: Compare the profile with the model

Identify:

- missing expected fields;
- uncovered values;
- insufficient completeness;
- invalid relationships;
- context mismatches;
- source assumptions contradicted by the data;
- target requirements unsupported by the source.

# Step 6: Classify and assign gaps

Each material gap receives:

- type;
- affected model objects;
- affected population;
- severity;
- evidence;
- owner;
- proposed treatment;
- required decision date.

# Step 7: Review with the correct roles

Not every gap needs a programme-wide meeting.

Route gaps appropriately:

- source owners for extract and quality issues;
- business owners for definitions and acceptable treatments;
- MDG architects for target-model and validation questions;
- migration architects for transformations;
- programme management for scope and accepted risk.

# Step 8: Update the model or treatment

If the gap reveals that the model assumption was wrong, update the model through controlled review.

Do not hide the discovery inside migration code.

# Step 9: Re-profile the next dataset

A resolved gap should be verified against a new extract or corrected population.

Closing the ticket is not evidence that the data changed.

## A worked example: Business Partner roles

Suppose the target design requires every migrated organisation to receive one or more Business Partner roles.

The mapping workbook identifies legacy customer and supplier indicators.

The first dataset profile finds:

- 70% of records contain a clear customer indicator;
- 20% contain both customer and supplier indicators;
- 5% contain neither;
- 3% contain values not included in the mapping;
- 2% have conflicting indicators across source files.

Before testing, the programme already has several questions:

- Are records without indicators in scope?
- Can roles be derived from transaction history?
- Should records with both indicators receive both roles?
- Which source is authoritative when indicators conflict?
- Are unexpected values data errors or legitimate local codes?
- Does the target workflow support the resulting roles?
- Will duplicate detection treat the role combinations correctly?

A mock load could expose these questions through failures and unexpected records.

A pre-test gap analysis exposes them as model and governance decisions.

The programme can then test an approved rule rather than improvise during defect triage.

## Another example: customer sales-area data

The central customer dataset contains 50,000 records.

All required central fields are present.

The programme reports good data readiness.

A separate analysis of sales-area assignments shows:

- 12,000 customers lack an expected sales-area record;
- 4,000 use sales organisations outside the target scope;
- 2,500 have incomplete distribution-channel data;
- several legacy systems use a composite key not included in the extract.

The central dataset is structurally complete.

The operational business object is not.

This is why dataset readiness must follow the model structure, including organisational extensions and relationships.

## How early gap detection changes testing

When gaps are detected before testing, the first mock load becomes more useful.

Instead of spending the cycle on basic surprises, the programme can verify:

- transformation correctness;
- SAP and MDG validation behaviour;
- load sequencing;
- matching and duplicate handling;
- key mapping;
- relationship creation;
- workflow behaviour after load;
- replication;
- reconciliation;
- performance and volume.

Testing becomes evidence about the implemented migration process.

It no longer carries the full burden of discovering what the source data contains.

## What managers should ask before approving a mock load

Managers do not need to inspect field-level profiles.

They should ask:

1. Which approved model baseline was used for the comparison?
2. Which representative datasets were profiled?
3. Are all countries and source systems in the wave represented?
4. Which required fields are absent from the extract?
5. Which critical fields have insufficient completeness?
6. Which observed values are not covered by approved mappings?
7. Which relationships cannot be constructed?
8. Which target requirements are unsupported by source data?
9. Which gaps still require business or architecture decisions?
10. Which accepted gaps will deliberately enter testing?
11. Who owns each unresolved population?
12. Will the next extract prove that agreed corrections were made?

A mock load may proceed with known gaps.

The point is that the gaps should be known, owned and intentionally included—not discovered accidentally.

## Severity should reflect business impact

Not every unexpected value should block testing.

We use severity based on questions such as:

- Does the gap prevent loading?
- Does it create an incorrect business meaning?
- Does it affect a critical process?
- Does it create regulatory or compliance exposure?
- Does it break relationships?
- Does it affect a large population?
- Can it be corrected after go-live?
- Is the treatment reversible?
- Does it hide behind a valid-looking default?

A missing optional description is not equivalent to a missing legal identifier.

An unmapped value affecting three obsolete records is not equivalent to an unmapped classification used by half the active customer population.

Gap counts without severity and population context can mislead management.

## Avoid the “clean data” target

Programmes sometimes state that the dataset must be clean before testing.

This sounds responsible but is too vague to govern delivery.

No large legacy dataset is perfectly clean.

We prefer explicit readiness rules:

- all required columns must be present;
- no critical reference relationships may be broken;
- mandatory attributes must meet an agreed completeness threshold;
- all observed critical codes must have an approved treatment;
- unresolved high-severity gaps must have an owner and decision;
- accepted exceptions must be identifiable in the dataset;
- the loaded population must be reconcilable to the source.

These criteria can be reviewed and evidenced.

“Clean enough” cannot.

## Where Martenweave fits

We built Martenweave to compare dataset reality with model expectations before the programme reaches migration testing.

The current SAP migration scenario supports:

- explicit source and target field endpoints;
- contextual attribute definitions;
- source-to-target mappings;
- deterministic model validation;
- CSV and XLSX profiling;
- dataset-to-model gap detection;
- lineage and impact analysis;
- issues, decisions and controlled change proposals.

The broader product model includes canonical Markdown and YAML files, generated SQLite and JSONL indexes, structured queries, ownership and health reports, review exports and a PatchProposal-to-ChangeRequest lifecycle.

A Martenweave workflow can operate as follows:

```text id="dsgap10"
Canonical model
      +
Registered dataset
      ↓
Structural and profile analysis
      ↓
Dataset-to-model comparison
      ↓
Gap objects linked to affected fields and rules
      ↓
Owner review and decision
      ↓
Model patch or data remediation
      ↓
Repeatable validation
```

The dataset does not become the source of model truth.

The model does not pretend that source data is cleaner than it is.

The comparison between them creates the evidence.

## Why canonical model files matter here

A repeatable gap check requires a stable model baseline.

If expectations live only in workbook comments, the programme cannot reliably compare one dataset version with another.

Canonical model objects make it possible to state:

- which field was expected;
- why it was expected;
- in which context;
- against which source endpoint;
- under which rule;
- for which model version.

The generated profile and gap results can be rebuilt when:

- the dataset changes;
- the model changes;
- the scope changes;
- a new country joins;
- a mapping is approved.

This is more useful than a static data-quality report whose assumptions are no longer clear.

## AI can assist, but it should not decide

AI may help with:

- suggesting possible matches between unexpected and known columns;
- grouping similar source values;
- identifying likely code translations;
- summarising gap populations;
- extracting potential rules from project documents;
- drafting issue descriptions;
- suggesting which model objects may be affected.

These are proposals.

An unexpected source value may look similar to a target code and still have a different business meaning.

A missing field may appear derivable but require business approval.

A relationship may look inferable statistically but be unsafe to create automatically.

Our rule remains:

> AI may propose a treatment. Deterministic checks verify structure. Responsible people approve changes to the model or migration rule.

## What Martenweave does not replace

Martenweave does not replace:

- source-system analysis;
- enterprise data-quality platforms;
- migration execution tooling;
- SAP Migration Cockpit or other loading mechanisms;
- SAP MDG validations;
- business ownership;
- specialist cleansing work;
- formal migration testing.

Its role is narrower.

It connects the approved model with representative datasets so gaps can be found, classified and traced earlier.

For small migrations, a profiling script and disciplined workbook may be sufficient.

The need for a model-driven gap layer grows when the programme has:

- several source systems;
- several countries;
- complex organisational contexts;
- many relationships;
- changing target requirements;
- repeated migration waves;
- several delivery partners;
- strict handover or audit requirements.

## Common mistakes

### Profiling without a model

The team produces distributions and completeness percentages but cannot say whether the results are acceptable.

A profile becomes useful when it is compared with explicit expectations.

### Comparing only column names

Presence does not prove completeness, valid values, correct context or relationship coverage.

### Profiling only once

Every significant extract should be checked against the current model.

### Reviewing global averages

Gaps should be analysed by the populations that matter operationally.

### Closing gaps through undocumented code

If a transformation changes the treatment, the model and decision record should be updated.

### Treating every anomaly as a defect

Some anomalies are valid exceptions. They still need classification and evidence.

### Using defaults to hide missing data

A populated target field may remain semantically empty.

### Sending all gaps to the migration team

Many gaps require business, source-system, architecture or governance decisions.

### Starting formal testing with unknown data scope

The programme should know which populations the dataset represents before interpreting test results.

## A minimum pre-test gate

Before formal migration testing, we recommend confirming:

### Dataset identity

- source system known;
- extraction date known;
- filtering criteria recorded;
- migration wave identified;
- expected population defined.

### Structure

- required files present;
- required columns present;
- required keys available;
- related datasets can be joined.

### Content

- critical completeness measured;
- actual code values reviewed;
- invalid formats identified;
- duplicate indicators understood;
- unexpected values classified.

### Relationships

- parent-child integrity checked;
- reference values available;
- organisational assignments covered;
- missing links quantified.

### Model alignment

- current target baseline used;
- mappings refer to current endpoints;
- required contexts included;
- known validation rules considered.

### Governance

- significant gaps have owners;
- treatments are approved or pending visibly;
- accepted exceptions are identifiable;
- revalidation is planned.

A dataset does not need to be perfect to pass the gate.

It needs to be understood well enough that testing results can be interpreted reliably.

## Our conclusion

Dataset gaps should not be treated as surprises produced by migration testing.

Many can be detected earlier by comparing three things that the programme already has:

- the approved model;
- the expected mappings;
- representative source data.

The comparison needs to go beyond column presence.

It should examine:

- completeness;
- value coverage;
- formats;
- organisational context;
- identifiers;
- relationships;
- scope;
- rule coverage;
- change between dataset versions.

Our position is straightforward:

> Testing should confirm that the agreed migration treatment works. It should not be the first point at which the programme discovers that the treatment is impossible.

Finding gaps early does not make difficult decisions disappear.

It gives the correct people time to make them before technical defects, cutover pressure and programme deadlines narrow the available options.

That is how earlier gap detection saves time.

Not by producing fewer reports, but by preventing the programme from building and testing assumptions that the data could have disproved weeks earlier.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We work on practical model governance for SAP migration, MDG, MDM and AMS programmes. Our focus is helping architects and delivery teams compare model expectations with actual data, identify gaps before they become load defects and preserve the evidence needed to make controlled decisions.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP describes SAP Master Data Governance as supporting governed master-data models, validated values, quality monitoring, matching and consolidation, workflow-based changes and auditability. These capabilities provide the operational governance context into which migrated master data must fit.

Martenweave’s SAP migration documentation describes contextual model objects, source-to-target mappings, deterministic validation, CSV and XLSX profiling, dataset gap detection, lineage, impact analysis and human-reviewed model proposals.

The current Martenweave product documentation lists canonical model files, generated indexes, dataset profiling, health and analysis reports, spreadsheet review flows and controlled PatchProposal and ChangeRequest lifecycles.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
