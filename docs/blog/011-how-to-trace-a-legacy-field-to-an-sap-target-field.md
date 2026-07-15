# How to Trace a Legacy Field to an SAP Target Field

**Reviewed: 14 July 2026**

A defect appears during the second mock load.

The target SAP field contains the wrong value for several thousand customer records. The technical team finds the transformation that produced it, but the rule itself is not obviously wrong. It was copied from an approved mapping workbook.

The team opens the workbook.

The row says:

```text
Source: CUSTOMER_CLASS
Target: Customer Group
Transformation: Map according to approved values
Status: Approved
```

There are three immediate problems.

Two legacy systems contain a field called `CUSTOMER_CLASS`. They use different codes. The workbook does not identify which version was used for the affected records.

“Customer Group” exists in several project documents, but only one of them states that it applies at sales-area level.

The approved-value table has been updated twice. Nobody can tell which version the migration routine implemented.

The team eventually solves the defect. It takes several meetings, a comparison of old files and help from a consultant who remembers the original workshop.

The problem was not the absence of documentation.

The problem was the absence of traceability.

The programme could see the source label and the target label. It could not reliably reconstruct the path between them.

We use field-level traceability to preserve that path:

```text
Legacy system
→ source dataset
→ source column
→ business attribute
→ mapping and transformation
→ value mapping
→ SAP target endpoint
→ validation rule
→ test evidence
```

Not every mapping requires this amount of detail. For critical fields in a multi-system SAP migration, the programme should be able to follow this chain without relying on one person’s memory.

## A source and target column are not lineage

Many mapping workbooks contain a source column and a target column.

This is useful, but it is only the beginning of lineage.

Consider the following mapping:

```text
LEGACY_CUST.TYPE → KNVV-KDGRP
```

An SAP specialist may recognise `KNVV-KDGRP` as a customer-group field in the sales-area context.

The line still does not tell us:

- which legacy system contains `TYPE`;
- which dataset version supplied it;
- whether `TYPE` means the same thing in every country;
- whether it is a code, a description or a derived value;
- which transformation is applied;
- which target value list is used;
- whether blanks are permitted;
- whether the rule applies to every sales area;
- which business owner approved the interpretation;
- which tests prove the mapping;
- what should happen if the target definition changes.

A pair of field names shows direction.

Traceability shows meaning, evidence and dependencies.

## Start with the business attribute

The most stable centre of the trace is usually not the source field or the SAP field.

It is the business attribute that both are intended to represent.

For example:

```text
Business attribute:
Customer group for sales processing

Legacy representation:
CRM_A.CUST_SEGMENT
ERP_B.CUSTOMER_TYPE

SAP target:
KNVV-KDGRP

Context:
Sales organisation + distribution channel + division
```

This separation matters.

A legacy source field can be replaced without changing the business concept.

An SAP target field can be extended or moved without changing the intended meaning.

Several source fields may contribute to one attribute. One source field may contain several concepts that need to be split.

If lineage is built only from physical field to physical field, it becomes fragile whenever the system landscape changes.

We therefore trace through the business meaning:

```text
Physical source
→ interpreted business attribute
→ physical target
```

This also makes the model understandable to people who do not work directly with SAP table names.

## Why the source field needs its own identity

Field labels are rarely unique across a migration landscape.

Names such as these appear everywhere:

- `TYPE`;
- `STATUS`;
- `CATEGORY`;
- `GROUP`;
- `COUNTRY`;
- `PAYMENT_TERM`;
- `TAX_ID`.

A complete source endpoint should identify more than the column label.

We expect to know:

- source system;
- source object, table or file;
- source column;
- dataset or extraction interface;
- data type;
- business population;
- applicable context;
- lifecycle status;
- owner where relevant.

For example:

```text
Source endpoint ID:
FEP-CRM-A-CUSTOMER-CUST-SEGMENT

System:
CRM_A

Object:
CUSTOMER

Column:
CUST_SEGMENT

Population:
Active B2B customers

Country scope:
DE, AT, CH
```

The stable identifier is important.

A worksheet row number is not a stable source identity. A file path is not enough. A field label is not enough.

The same endpoint should be referenceable from:

- a mapping;
- a dataset profile;
- an issue;
- a transformation;
- a test case;
- a decision;
- a defect;
- an impact report.

## The dataset is part of the trace

Source documentation describes what should exist.

The dataset shows what was actually supplied for a particular migration cycle.

These are different forms of evidence.

A source endpoint may be correctly documented while the extract:

- omits the column;
- renames it;
- changes its type;
- combines it with another value;
- contains only part of the expected population;
- introduces new codes;
- applies filtering not reflected in the mapping;
- uses a different extraction date.

We therefore attach field lineage to identifiable datasets.

A useful dataset record includes:

- source system;
- extraction date;
- scope;
- filters;
- migration wave;
- file or table structure;
- relevant profile results;
- version or checksum where appropriate.

This allows us to answer:

> Which actual source data was used to test this mapping?

Without that connection, lineage remains theoretical.

## Describe the source meaning before designing the transformation

Legacy field names often imply more certainty than the data supports.

A field called `CUSTOMER_CLASS` may contain:

- commercial segmentation;
- account size;
- pricing relevance;
- risk category;
- historical local classification;
- a mixture of several concepts.

The programme should not assume that the source name defines the business meaning.

We normally examine:

- source-system documentation;
- actual value distributions;
- usage in current processes;
- reports consuming the field;
- local business explanations;
- historical changes;
- related fields;
- blank and exceptional populations.

The output is not a perfect semantic model.

It is a defensible interpretation of what the field means for the migration population.

If the source meaning cannot be established, that uncertainty should be explicit.

A mapping marked “approved” should not hide an unresolved semantic question.

## Separate the mapping from the transformation

A mapping states that one object contributes to another.

A transformation states how the contribution is calculated.

These should be separately identifiable.

For example:

```text
Mapping:
CRM_A.CUST_SEGMENT
→ Customer group for sales processing

Transformation:
Normalise source code
→ apply country-specific value mapping
→ reject inactive source values
→ populate SAP target by sales-area context
```

This separation is useful because:

- one transformation may be reused;
- transformations may change without changing the endpoints;
- several source fields may feed one rule;
- one mapping may require ordered steps;
- the implementation may differ by country or source system.

A text cell containing a long formula is not the same as a controlled transformation object.

For critical logic, we expect:

- clear inputs;
- conditions;
- precedence;
- output;
- blank handling;
- invalid-value handling;
- context;
- examples;
- owner;
- approval;
- implementation reference.

## Value mapping is a separate lineage layer

Field-level lineage can look correct while the values are wrong.

Suppose the source field contains:

```text
A1
A2
B1
C
UNKNOWN
blank
```

The SAP target permits:

```text
01
02
03
```

The physical trace is simple:

```text
CRM_A.CUST_SEGMENT → KNVV-KDGRP
```

The operational meaning depends on the value mapping:

```text
A1 → 01
A2 → 01
B1 → 02
C  → 03
UNKNOWN → reject
blank → unresolved
```

This is part of lineage, not a secondary appendix.

We want to know:

- which value-list version was used;
- which source values were observed;
- which values were mapped;
- which were normalised;
- which were merged;
- which were rejected;
- who approved the loss of distinction;
- whether local mappings differ;
- whether the current dataset still has complete coverage.

A field trace that stops at the endpoint cannot explain the value that arrived there.

## Context must remain visible along the path

SAP master data is highly contextual.

A target field may belong to:

- central data;
- company-code data;
- sales-area data;
- purchasing-organisation data;
- plant data;
- partner-role data;
- country-specific extensions.

The same business term may appear in more than one context.

If lineage does not preserve context, it can point to the correct field and still describe the wrong rule.

For example:

```text
Customer Group
```

is not precise enough if the target is maintained by sales area.

The trace should include the relevant organisational keys:

```text
Business Partner
→ Customer role
→ Sales Area
→ KNVV-KDGRP
```

The source side also needs context.

A legacy customer classification may be global even though the SAP target is sales-area-specific. The transformation must then define whether the value is copied to all sales areas, derived by context or restricted to selected organisations.

This decision should not be hidden inside migration code.

## The SAP endpoint needs more than a table and field name

For practical traceability, a target endpoint should include:

- target system;
- object or entity;
- table or API structure where relevant;
- field;
- organisational context;
- role;
- target value domain;
- lifecycle status;
- ownership;
- relevant validations.

SAP currently describes SAP Master Data Governance as a central governance layer supporting governed models, golden records, data quality, workflow-based changes and auditable data changes.

For an MDG programme, the target trace may therefore need to reach beyond the database field.

It may include:

```text
Business attribute
→ MDG entity and attribute
→ change-request process
→ activated SAP field
→ replication endpoint
```

The depth depends on the use case.

For migration mapping, a physical target field may be enough.

For operational impact analysis, the programme may also need the workflow, rule and consuming systems.

## Add validation to the trace

A value can reach the correct target field and still be invalid.

Validation rules explain the conditions under which the mapping result is acceptable.

These may include:

- mandatory rules;
- format checks;
- allowed-value checks;
- cross-field consistency;
- organisational restrictions;
- relationship requirements;
- duplicate checks;
- effective-date rules.

A complete trace for a critical field should show:

```text
Source value
→ transformation
→ target value
→ applicable validation
→ result
```

This helps separate several different failure types.

### Source problem

The source value is missing or incorrect.

### Mapping problem

The wrong target or transformation was selected.

### Value-mapping problem

The source code has no approved target.

### Model problem

The business definition or target requirement is wrong.

### Validation problem

The intended value is valid, but the implemented rule rejects it incorrectly.

Without traceability, all five may appear as the same load error.

## Link tests to the mapping, not only to the process

A test case may say:

> Verify customer migration.

This does not prove that a specific mapping was tested.

For critical fields, we want to know:

- which mapping version was tested;
- which transformation version was used;
- which dataset supplied the value;
- which contexts were included;
- which positive cases passed;
- which invalid cases failed as expected;
- which target validation was exercised;
- which evidence was approved.

The programme should be able to trace in both directions:

```text
Mapping → test evidence
```

and:

```text
Failed test → affected mapping and rule
```

This makes regression planning much easier.

When the mapping changes, the team can identify which evidence is no longer current.

## Preserve the decision behind the mapping

Some mappings are obvious.

Others encode important business compromises.

Examples include:

- merging several legacy codes;
- removing a local classification;
- defaulting missing values;
- deriving data from an indirect source;
- selecting one source system as authoritative;
- excluding unreliable records;
- using one SAP field for a concept previously split across several systems.

The final mapping should be linked to the decision that approved this treatment.

A useful decision record contains:

- issue;
- affected objects;
- alternatives;
- chosen option;
- rationale;
- evidence;
- approver;
- context;
- date;
- review condition.

This is especially important for decisions described as temporary.

Temporary migration logic often survives into production because nobody can later identify why it was introduced.

## A practical field-trace structure

For a critical field, we use a trace structure similar to this:

```text
Domain
└── Business entity
    └── Business attribute
        ├── Business definition
        ├── Owner
        ├── Context
        ├── Source endpoint
        │   └── Dataset evidence
        ├── Mapping
        │   ├── Transformation
        │   └── Value mapping
        ├── SAP target endpoint
        ├── Validation rule
        ├── Decision
        ├── Test evidence
        └── Downstream consumers
```

Not every field requires every element.

We apply more depth where the field is:

- business-critical;
- legally relevant;
- heavily transformed;
- used across several systems;
- context-dependent;
- involved in matching or workflow;
- frequently changed;
- difficult to source;
- expensive to correct after go-live.

Traceability should be risk-based.

## A worked example: supplier payment terms

A programme is migrating supplier payment terms.

At first, the mapping appears direct:

```text
LEGACY_VENDOR.PAYTERM → LFB1-ZTERM
```

The trace reveals more complexity.

### Source

Two legacy ERP systems supply payment terms.

One stores four-character codes. Another stores descriptive labels.

### Business meaning

Payment terms determine payment timing but are also constrained by company-code policy.

### Context

The SAP target is maintained at supplier company-code level.

The legacy source is partly global.

### Transformation

For one source system, the term is copied directly.

For the other, the description must be translated through a local code table.

### Value mapping

Several legacy codes map to one SAP value.

Two codes have no equivalent and require business decisions.

### Validation

Some company codes permit only a restricted subset of terms.

### Operational consequence

The field affects invoice payment behaviour.

### Decision

The programme approves one default only for blocked suppliers that are migrated for historical reference. Active suppliers must be remediated.

### Testing

Tests cover active suppliers, blocked suppliers and company-code-specific rejection.

A two-column mapping would not show this.

The trace allows the programme to answer why a particular target value appeared and whether it was appropriate for that company code.

## Another example: Business Partner tax identifier

Tax data shows why lineage must preserve both context and evidence.

The path may be:

```text
Legacy tax field
→ country-specific normalisation
→ tax-category selection
→ SAP Business Partner tax record
→ validation rule
```

The source field alone may not identify the target category.

The programme may need:

- country;
- legal form;
- identifier format;
- existing tax category;
- exemption status;
- source-system reliability.

The target is not simply “Tax Number.”

It is a tax identifier maintained under a specific category and business context.

If the trace collapses this distinction, the migration can populate a technically valid value under the wrong category.

## Traceability should work in both directions

Most migration documentation is source-driven:

```text
Where does this legacy field go?
```

After go-live, the more common question is often target-driven:

```text
Where did this SAP value come from?
```

A controlled model should support both.

### Forward trace

Used during migration design:

```text
Source endpoint
→ mapping
→ target endpoint
```

### Reverse trace

Used during testing, audit and AMS:

```text
Target endpoint
→ mapping
→ source endpoint and evidence
```

### Semantic trace

Used during architecture:

```text
Business attribute
→ all source and target representations
```

### Change trace

Used during impact analysis:

```text
Changed object
→ affected mappings, data, rules and tests
```

This is one reason a graph of explicit relationships is more useful than a flat mapping table for complex programmes.

## Do not confuse traceability with copying documentation

The answer is not to attach every document to every field.

That creates noise.

We preserve only the evidence required to:

- understand the meaning;
- verify the mapping;
- explain significant decisions;
- assess change;
- reproduce the test;
- support later investigation.

A link to a 200-page design document is not field-level traceability unless the relevant section and decision can be identified.

The objective is not maximum documentation.

It is minimum sufficient evidence.

## How to build field-level traceability

We recommend the following sequence.

### Step 1: Identify the business attribute

Write a working definition and assign a stable identifier.

Do not begin only with the physical field name.

### Step 2: Register the source endpoint

Include system, object, field, context and owner.

### Step 3: Connect representative datasets

Record which extracts contain the field and profile the relevant values.

### Step 4: Define the target endpoint

Include SAP object, physical field and organisational context.

### Step 5: Create the mapping object

Connect source, business attribute and target.

### Step 6: Define transformation and value logic

Make conditions and exception handling explicit.

### Step 7: Attach relevant rules

Show which validations determine whether the target value is acceptable.

### Step 8: Record the decision

Preserve the rationale for material transformations, defaults and exceptions.

### Step 9: Connect implementation and tests

Link the mapping to migration logic, test cases and evidence.

### Step 10: Validate the chain

Check for:

- missing endpoints;
- broken references;
- missing context;
- unowned rules;
- mappings without value coverage;
- tests referring to retired versions.

The trace should be generated from the model where possible, not reconstructed manually for each review.

## What managers should expect

A programme manager should not be asked to inspect detailed lineage for every field.

For critical fields, the programme should be able to demonstrate:

1. The business meaning is defined.
2. The source system and dataset are identified.
3. The source population has been profiled.
4. The transformation is explicit.
5. Current values are covered.
6. The SAP target and context are clear.
7. Validation behaviour is understood.
8. The rule has an accountable owner.
9. Representative tests exist.
10. The decision and change history can be retrieved.

This is enough to distinguish a governed mapping from a field pair stored in a workbook.

## Traceability reduces defect-resolution time

When a migration defect appears, a traceable model narrows the investigation.

The team can determine:

- whether the source supplied the value;
- which dataset was used;
- which transformation version ran;
- which value mapping applied;
- whether the target context was correct;
- which validation rejected the record;
- which decision approved the rule;
- which other mappings may be affected.

Without this information, defect triage repeats discovery.

The team searches files and asks people.

The same mapping may be re-explained several times across design, testing, cutover and AMS.

Traceability does not guarantee fewer defects.

It reduces the cost of understanding and correcting them.

## Traceability makes handover practical

After go-live, the original migration workbook is often retained as documentation.

Its usefulness declines as:

- team members leave;
- SAP configuration changes;
- source systems are retired;
- operational rules evolve;
- local exceptions are introduced;
- later releases reuse the model.

AMS needs more than a historical source-to-target table.

It needs to understand:

- why the field exists;
- how migrated values were produced;
- which exceptions remain;
- which source identifiers were preserved;
- which validation applies now;
- what other objects may be affected by a change.

A traceable model turns migration knowledge into an operational asset.

## Where Martenweave fits

We built Martenweave to store this type of field-level model knowledge.

The public SAP migration scenario includes explicit source-to-target `Mapping` objects, `FieldEndpoint` objects for SAP targets, contextual definitions, deterministic validation, dataset profiling, gap detection, lineage and impact analysis.

The broader Martenweave model connects fields, attributes, rules, owners, issues and decisions. Its current core includes canonical Markdown and YAML model files, generated SQLite and JSONL indexes, search, structured queries, trace and impact analysis, dataset profiling, spreadsheet review flows and controlled change proposals.

A Martenweave trace can therefore follow:

```text
Dataset column
→ source FieldEndpoint
→ Mapping
→ Attribute
→ AttributeUsage and EntityContext
→ SAP target FieldEndpoint
→ Rule, Decision and ChangeRequest
```

The exact chain depends on the domain.

The important point is that each link is an identifiable object rather than an assumption inferred from similar text.

## Why deterministic validation matters

Lineage can look complete while containing broken references.

For example:

- a mapping points to a retired source field;
- a target endpoint was renamed;
- a decision refers to a deleted attribute;
- a value mapping uses an inactive list;
- a test references an old mapping identifier;
- an organisational context is missing.

These are structural errors.

They should be detected automatically before the lineage is presented as evidence.

Martenweave validates model objects and references before generating indexes.

This does not prove that the business rule is correct.

It proves that the represented trace is structurally coherent enough for human review.

## How AI can help

AI can accelerate traceability work by:

- extracting candidate field relationships from documents;
- matching source and target descriptions;
- suggesting business attributes;
- identifying similar transformations;
- summarising mapping decisions;
- finding references in tickets;
- proposing missing lineage links;
- drafting change proposals.

AI should not silently approve the trace.

A source and target field may look semantically similar while representing different contexts.

An old ticket may describe a rule that was later rejected.

A plausible value mapping may still change business meaning.

We use AI as a proposal mechanism:

```text
Evidence
→ AI-generated candidate relationship
→ deterministic validation
→ architect and owner review
→ approved model change
```

## Common mistakes

### Using names as identities

Names change and repeat.

Use stable identifiers.

### Tracing only source to target

Include the business attribute, context and transformation.

### Ignoring dataset versions

A mapping should be connected to the data against which it was validated.

### Treating value mappings as implementation detail

They determine the meaning of the target value.

### Hiding local variants in separate files

Represent them as contextual relationships.

### Linking to whole documents

Preserve the relevant decision and evidence, not only a broad attachment.

### Building lineage after go-live

By then, much of the reasoning may already be lost.

### Attempting full enterprise lineage immediately

Start with critical migration fields and expand where the risk justifies it.

### Generating attractive diagrams without validated relationships

Visual lineage is useful only when the underlying links are trustworthy.

## When lightweight traceability is sufficient

A small migration may not need a dedicated model registry.

A controlled workbook can be sufficient when:

- there is one source system;
- the target model is stable;
- transformations are simple;
- value lists are limited;
- organisational variation is low;
- the team is small;
- the mapping will not be reused;
- the cost of change is low.

Even then, we recommend capturing:

- clear source identity;
- target context;
- transformation;
- owner;
- approval;
- dataset version;
- test evidence.

The operating principle remains the same even when the tooling is simple.

## Our conclusion

A legacy field does not become traceable because a workbook points it to an SAP field.

The programme needs to preserve the path by which the source value was interpreted, transformed, approved, validated and tested.

We begin with the business attribute because it is more stable than either physical endpoint.

We then connect:

- the actual source system and dataset;
- source meaning;
- mapping;
- transformation;
- value conversion;
- SAP target and context;
- validation;
- evidence;
- ownership;
- change history.

This may seem like additional structure around a simple mapping.

For critical fields, the structure already exists in the project. It is simply distributed between workbooks, tickets, code, configuration and people.

Our goal is to make it explicit before the programme needs to reconstruct it under test or cutover pressure.

The practical test is simple:

> Can a new architect explain where this SAP value came from, why it was transformed this way and what else would be affected if the rule changed?

When the answer is yes, the programme has lineage.

When the answer requires finding the original consultant, it has documentation—but not yet traceability.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We work on practical model governance for SAP migration, MDG, MDM and AMS programmes. We focus on helping architects and delivery teams preserve field-level meaning, evidence and dependencies so that mappings remain understandable after the original workshops and consultants are gone.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer that supports governed models, golden records, matching and consolidation, steward workflows, validated values, data-quality monitoring and auditable changes. SAP also states that clean and correct master data should be prepared early before an SAP S/4HANA implementation.

Martenweave’s public SAP migration documentation describes source-to-target mappings, `FieldEndpoint` objects, contextual modelling, deterministic validation, dataset gap detection, lineage and impact analysis.

The current Martenweave product documentation lists canonical model files, generated indexes, search, structured query, trace and impact analysis, dataset profiling, spreadsheet review flows and controlled model-change proposals.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.

