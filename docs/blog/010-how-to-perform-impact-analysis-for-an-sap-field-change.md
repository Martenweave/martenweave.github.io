# How to Perform Impact Analysis for an SAP Field Change

**Reviewed: 14 July 2026**

On Monday, a country team asks for one SAP field to become mandatory.

The request looks small. The field already exists. No new entity is required. The change can probably be configured quickly.

By Thursday, the programme has discovered that the field is missing from two legacy systems, populated differently in three countries, used by an outbound interface and defaulted by the migration team. One test case assumes that blanks are valid. A local value list contains codes that the global team has never reviewed. The AMS team does not know why the field was optional in the first place.

The technical change is still small.

The impact is not.

This is how many model changes behave in SAP, MDG and migration programmes. A request is described as a change to one field, but the field sits inside a network of definitions, mappings, rules, datasets, organisational contexts and operational processes.

If those relationships are not visible, impact analysis becomes a sequence of meetings and searches:

- Who owns this field?
- Which systems populate it?
- Which countries use it?
- Does migration already apply a default?
- Will MDG validation reject existing records?
- Which interface consumes it?
- Which tests need to be repeated?
- What happens to records already in production?

We perform impact analysis to answer these questions before the change becomes configuration, code or a cutover problem.

The objective is not to predict every possible consequence.

The objective is to identify enough of the affected model that responsible people can make a controlled decision.

## “It is only one field” is usually the wrong unit of analysis

A physical SAP field is only one representation of a wider business concept.

Consider a field such as:

- Customer Group;
- Payment Terms;
- Tax Number;
- Supplier Account Group;
- Material Status;
- Purchasing Group;
- Product Hierarchy;
- Partner Function.

The field may participate in:

- a business definition;
- one or more organisational contexts;
- source-to-target mappings;
- value mappings;
- validation and derivation rules;
- workflows;
- matching logic;
- migration routines;
- interfaces;
- reports;
- authorisations;
- tests;
- local exceptions;
- support procedures.

Changing the field may mean changing only one technical property.

It may also mean changing the behaviour of the business concept across several systems.

We therefore begin with a simple distinction:

> A field change is a technical event. Its impact is a model question.

If the programme analyses only the technical object, it can miss most of the work.

## What counts as a field change?

Impact analysis should not be limited to adding or deleting fields.

We treat all of the following as field changes:

- making a field mandatory or optional;
- changing its definition;
- changing its owner;
- changing allowed values;
- changing its organisational context;
- changing its source;
- changing its target endpoint;
- introducing a default;
- removing a default;
- modifying a transformation;
- changing validation severity;
- adding a local exception;
- changing effective dates;
- changing data type or length;
- replacing one field with another;
- deprecating the attribute;
- changing how it is distributed;
- changing how it participates in matching or derivation.

Some changes are technically minor but semantically significant.

Changing a description may have little impact. Changing the meaning of a code without changing the field structure may affect migration, reporting and operations across several systems.

The impact depends on meaning and use, not only on the size of the configuration task.

## Why impact analysis often starts too late

In many programmes, impact analysis begins after someone has already decided that the change should happen.

The sequence looks like this:

```text
Business request
      ↓
Configuration or development estimate
      ↓
Change implemented
      ↓
Migration, integration and testing teams informed
      ↓
Unexpected consequences discovered
```

The team is then no longer analysing a proposal. It is managing the consequences of an implementation direction that already has momentum.

We prefer another sequence:

```text
Change proposal
      ↓
Affected model objects identified
      ↓
Data, process and system impact assessed
      ↓
Decision and conditions agreed
      ↓
Implementation
      ↓
Verification
```

This does not mean every field change needs an architecture board.

The level of analysis should match the risk.

But the programme should know what it is changing before configuration becomes the decision.

## Start with the reason for the change

Before tracing technical dependencies, we ask why the change is being requested.

Typical reasons include:

- a legal requirement;
- a new business process;
- a migration gap;
- a data-quality defect;
- a country rollout;
- a reporting need;
- an interface requirement;
- an audit finding;
- a harmonisation initiative;
- an operational workaround;
- an SAP design constraint;
- a request to simplify the model.

The reason affects how the impact should be evaluated.

A legal requirement may justify local variation.

A migration gap may indicate that the source data is insufficient rather than that the target model should change.

A reporting request may be better solved outside the governed master-data model.

A request to make a field mandatory may hide a process problem: users are not maintaining the data because ownership is unclear.

We therefore record:

- the problem;
- the requested outcome;
- the affected population;
- the urgency;
- the evidence;
- the requester;
- the decision deadline.

Without this information, the programme can perform a detailed impact analysis on a poorly framed solution.

## Identify the business attribute before the technical field

The first object we look for is the business attribute behind the field.

For example:

```text
Physical field: KNVV-KDGRP
Business attribute: Customer group for sales processing
Context: Sales area
```

The distinction matters because the business attribute may also be represented in:

- another SAP table;
- an MDG entity;
- a legacy source field;
- a migration template;
- an interface;
- a reporting model;
- a local application.

If the programme starts and ends with `KNVV-KDGRP`, it may miss every dependency that does not use the same technical name.

The impact analysis should therefore ask:

1. What business concept does the field represent?
2. Does the concept have one meaning or several?
3. At which organisational level does it apply?
4. Where else is the concept represented?
5. Who owns its definition?

This gives the analysis a stable centre.

## The eight impact areas

We use eight main areas to structure field-level impact analysis.

# 1. Model impact

The first question is how the proposed change affects the governed model.

Check:

- Does the business definition change?
- Does the attribute remain the same object?
- Is the scope becoming broader or narrower?
- Does the organisational context change?
- Are relationships affected?
- Does the field replace another attribute?
- Does the status change from optional to required?
- Does the change create a new local variant?
- Are any existing model objects now obsolete?

A technical change may require no model change.

For example, increasing the physical field length while preserving meaning may be mostly technical.

Making a sales-area field globally mandatory changes the model and should be treated accordingly.

## Definition changes are especially dangerous

A field can retain the same name and technical endpoint while its meaning changes.

Suppose “Customer Group” previously represented a sales classification and is now expected to represent customer profitability.

The target field still accepts the same type of code.

Existing mappings and reports may still run.

The model is no longer coherent.

Definition changes require review of every use of the attribute, not only the target field.

# 2. Source-data impact

The programme must determine whether the relevant source systems can support the proposed state.

Check:

- Which source systems provide the attribute?
- Is the source column present?
- How complete is it?
- Is completeness different by country or business unit?
- Are values reliable?
- Does the source use the same definition?
- Can missing values be derived?
- Does enrichment require manual work?
- Will the next extract include the field?
- Are historical records affected?

If a field becomes mandatory, source-data profiling should happen before approval.

The target requirement may be reasonable. The programme still needs to know the cost of reaching it.

A field that is 98% complete globally may be only 40% complete in the country requesting the change.

Global averages are not sufficient.

# 3. Mapping and transformation impact

Every mapping connected to the field should be reviewed.

Check:

- Which source fields map to it?
- Are there different mappings by source system?
- Are there country-specific transformations?
- Are defaults used?
- Are values derived from other attributes?
- Are several source fields combined?
- Does the mapping change business meaning?
- Are value mappings affected?
- Does load sequence matter?
- Is the rule implemented in one place or several?

A change from optional to mandatory may require:

- a new source;
- a new derivation;
- a controlled default;
- manual enrichment;
- rejection of incomplete records;
- reduced migration scope.

Each option has different cost and risk.

The change request should not be approved before the treatment is understood.

# 4. Value-list impact

Field changes often affect values rather than structure.

Check:

- Does the target value list change?
- Are new codes being introduced?
- Are existing codes being retired?
- Do local code lists still map correctly?
- Will many source values collapse into one target value?
- Do downstream systems understand the new values?
- Are defaults still valid?
- Are inactive values present in current data?
- Are effective dates required?

A new target code may appear harmless.

It can require updates to:

- migration mappings;
- MDG validations;
- interfaces;
- reports;
- analytics;
- local applications;
- test cases;
- training materials.

The field has not changed physically. Its usable domain has.

# 5. Rule and workflow impact

SAP MDG can govern validated values, business rules, change processes, quality monitoring and auditable data changes. A field change may therefore affect more than the model structure.

Check:

- Is the field used in validation?
- Is it derived?
- Does it influence workflow routing?
- Does it determine an approver?
- Is it used in duplicate detection or matching?
- Does it affect data-quality measurement?
- Does it trigger a warning or error?
- Is the same rule implemented during migration?
- Are emergency or mass-change processes affected?

Making a field mandatory can produce different behaviour depending on where the rule is enforced:

- user interface;
- MDG validation;
- migration staging;
- API;
- interface;
- downstream system.

The programme needs one approved business rule and a clear view of its technical implementations.

Otherwise, different channels can accept different versions of the same record.

# 6. Integration and downstream impact

A field may be consumed outside SAP MDG or S/4HANA.

Check:

- Which interfaces distribute it?
- Is it included in IDocs, APIs or middleware mappings?
- Do downstream systems require the current value set?
- Is it used in reporting?
- Is it used in analytics or segmentation?
- Is it part of an external regulatory feed?
- Is it copied into transactional documents?
- Will existing consumers ignore, reject or misinterpret the new value?

This analysis cannot depend only on a list of interfaces containing the physical field name.

The same business attribute may be renamed or transformed across systems.

The impact model should connect business meaning to physical endpoints.

## “The consumer does not use the field” needs evidence

This statement is often based on memory.

We prefer evidence such as:

- interface mapping;
- data lineage;
- report definition;
- API contract;
- consumer owner confirmation;
- usage analysis.

An undocumented assumption that no one uses the field is not a safe basis for removal.

# 7. Testing impact

A field change creates a test obligation.

Check:

- Which existing test cases cover the field?
- Do they cover all contexts?
- Are country variants tested?
- Are negative cases included?
- Are migration and operational scenarios both covered?
- Are interfaces included?
- Does regression testing need to expand?
- Which existing evidence becomes obsolete?
- Which test datasets need updating?

The programme should distinguish between:

- testing that the field can be populated;
- testing that the rule behaves correctly;
- testing that downstream systems understand it;
- testing that existing records remain valid;
- testing that stewards can maintain it after go-live.

A successful technical update does not prove that the complete business behaviour remains correct.

# 8. Operational and AMS impact

Every model change eventually becomes an operational responsibility.

Check:

- Who owns the field after go-live?
- Do data stewards understand the new rule?
- Will existing records need remediation?
- Are support procedures affected?
- Will monitoring detect invalid values?
- Are quality thresholds changing?
- Will training or user guidance change?
- Can AMS explain why the change was made?
- Is rollback possible?
- Does the change create a temporary exception population?

This area is frequently omitted because AMS is consulted after implementation.

That is too late.

A field can be easy to configure and expensive to operate.

## Assess the existing population

A model change does not affect only future records.

The programme must decide what happens to existing data.

For example, when a field becomes mandatory:

- Are existing blanks grandfathered?
- Must all records be remediated?
- Will only changed records be validated?
- Will a mass update be required?
- Can values be derived?
- Does remediation happen before or after deployment?
- What happens to interfaces during the transition?
- How is progress measured?

SAP currently describes MDG capabilities including mass processing, validation, quality monitoring and governed change workflows. Those capabilities can support operational treatment, but the programme still has to define which records are affected and what outcome is acceptable.

The impact analysis should quantify the population.

“Some records are blank” is not enough.

A better statement is:

> 18,420 active customer sales-area records are blank. Of those, 12,700 belong to countries where the proposed rule would apply. Reliable derivation exists for 8,100 records. The remaining 4,600 require enrichment or an approved exception.

This allows management to make an informed decision.

## Distinguish design impact from implementation effort

Two measures should be reported separately.

### Design impact

How many parts of the model and operating process are affected?

### Implementation effort

How much work is required to implement the approved change?

A change can have broad design impact but low technical effort.

For example, adding one allowed value may require minimal configuration but affect many reports, mappings and interfaces.

Another change can have narrow design impact but high implementation effort.

For example, changing one physical integration field may require difficult middleware development while leaving the business model unchanged.

Combining impact and effort into one estimate hides this distinction.

## Use impact tiers

Not every change requires the same process.

We use a practical tier model.

### Tier 1: Local technical change

Examples:

- description correction;
- non-functional metadata update;
- technical length adjustment with no semantic effect;
- internal implementation correction.

Expected review:

- technical owner;
- basic regression check;
- model record updated where relevant.

### Tier 2: Controlled model change

Examples:

- value-list update;
- transformation change;
- ownership change;
- optionality change for a limited context;
- new local mapping.

Expected review:

- business owner;
- model or MDG architect;
- migration and test impact;
- affected consumers.

### Tier 3: Cross-programme change

Examples:

- global definition change;
- identifier strategy change;
- mandatory-field change across countries;
- removal of an attribute;
- change affecting matching, workflow or multiple interfaces.

Expected review:

- formal architecture and governance decision;
- quantified data impact;
- migration, integration and AMS plans;
- explicit rollout and remediation approach.

This prevents a heavy process for trivial corrections while protecting changes with broad consequences.

## A practical impact-analysis method

We use the following sequence.

# Step 1: Register the proposal

Record:

- requested change;
- current state;
- proposed state;
- reason;
- requester;
- affected scope;
- evidence;
- required date.

Avoid vague requests such as “update field logic.”

# Step 2: Identify the model object

Find:

- business attribute;
- physical endpoints;
- relevant contexts;
- owner;
- lifecycle status.

If no stable model object exists, create or clarify it before continuing.

# Step 3: Traverse direct dependencies

Identify directly connected:

- source fields;
- target fields;
- mappings;
- transformations;
- value lists;
- rules;
- contexts;
- owners.

This produces the first impact boundary.

# Step 4: Traverse downstream relationships

Identify:

- datasets;
- interfaces;
- reports;
- tests;
- related entities;
- decisions;
- defects;
- support procedures.

Not every possible link needs to be followed indefinitely.

Stop when additional relationships are unlikely to affect the decision.

# Step 5: Profile the affected data

Use current data to determine:

- population size;
- completeness;
- value distributions;
- source coverage;
- country or organisational variation;
- invalid and exceptional populations.

This prevents the impact assessment from remaining theoretical.

# Step 6: Classify consequences

For each impact, classify:

- model;
- data;
- mapping;
- rule;
- workflow;
- integration;
- test;
- operational;
- compliance;
- cost or schedule.

Assign severity and owner.

# Step 7: Define treatment options

Do not present only one implementation path.

Possible options may include:

- implement globally;
- implement for selected contexts;
- introduce a local extension;
- derive the value;
- enrich data;
- retain optionality;
- create a warning instead of an error;
- postpone the change;
- solve the requirement downstream;
- reject the proposal.

The impact analysis should help decision-makers compare options.

# Step 8: Record the decision

Capture:

- selected option;
- rationale;
- approvers;
- rejected alternatives;
- conditions;
- effective date;
- remediation obligations;
- review trigger.

# Step 9: Implement and verify

After implementation, confirm that:

- the approved model was updated;
- configuration matches the decision;
- mappings were updated;
- value lists align;
- datasets were revalidated;
- tests passed;
- downstream consumers were informed;
- AMS received the context.

The analysis is not complete when the decision is approved.

It is complete when the affected system of work is aligned again.

## A worked example: making Customer Group mandatory

A regional manager requests mandatory Customer Group maintenance for every customer.

The stated reason is reporting consistency.

At first, this appears to be one validation change.

Our impact analysis finds the following.

### Model

Customer Group is currently defined at sales-area level, not centrally.

The request uses the word “customer” globally but applies only to selected sales organisations.

### Source data

Two legacy systems supply a classification.

One system has no equivalent field.

Completeness varies from 30% to 99% by country.

### Mapping

Some countries map local segments directly.

Others derive the value from sales channel and market segment.

One country uses a default value.

### Value list

The global target list contains eight codes.

The current data contains 23 source codes and several free-text values.

### Rules

MDG currently issues a warning in selected contexts.

The proposal requests a blocking error for all sales areas.

### Integration

A reporting platform consumes the target code.

A pricing interface also reads it for one country, which was not mentioned in the request.

### Testing

Existing tests cover record creation with a value.

They do not cover changes to old records where the field is blank.

### Operations

Approximately 14,000 existing records would fail the proposed rule when edited.

No remediation owner has been assigned.

The change is no longer “make one field mandatory.”

The programme now has several options:

1. Make it mandatory only for new records in selected sales areas.
2. Introduce a warning while historical remediation proceeds.
3. Derive the value where reliable source logic exists.
4. Separate reporting classification from pricing use.
5. Retain optionality until the global definition is harmonised.

The impact analysis does not choose automatically.

It makes the trade-offs visible before the change is implemented.

## Impact analysis should include non-change

Sometimes the right decision is to make no change.

A request may be rejected because:

- the business problem belongs to reporting rather than master data;
- the source cannot support the requirement;
- the field already has a different governed meaning;
- the proposed value duplicates another attribute;
- implementation cost exceeds expected value;
- a local exception would damage the global model;
- the requirement is temporary;
- an existing process already provides sufficient control.

A recorded non-change decision is valuable.

It prevents the same request from being analysed repeatedly without reference to the previous reasoning.

## Where Martenweave fits

We built Martenweave to make field-level impact analysis possible without manually searching every project repository.

The current model can connect:

- business attributes;
- entity contexts;
- source and target field endpoints;
- mappings;
- value lists and value mappings;
- validation rules;
- owners;
- issues;
- decisions;
- change requests;
- datasets.

The SAP migration scenario specifically supports tracing a legacy column through mappings, attributes and contexts to SAP field endpoints, together with impact analysis before changing a rule.

The current core also provides deterministic validation, generated indexes, structured queries, trace and impact commands, dataset profiling, reports and a reviewable PatchProposal-to-ChangeRequest lifecycle.

A practical Martenweave flow looks like this:

```text
Proposed field change
        ↓
Affected model object identified
        ↓
Relationships traversed
        ↓
Datasets and current values profiled
        ↓
Impact report generated
        ↓
Patch proposal reviewed
        ↓
Human approval
        ↓
Model and implementation updated
```

Martenweave does not decide whether a change is good.

It gives the architect and responsible owners a more complete view of what the change touches.

## Why deterministic relationships matter

AI can read tickets and suggest likely impacts.

It may notice that a field appears in several documents or infer that a value-list change affects a mapping.

This is useful.

It is not enough for approval.

Impact analysis needs deterministic relationships where possible:

- this mapping references this endpoint;
- this rule references this attribute;
- this dataset contains this source field;
- this value mapping belongs to this list;
- this decision changed this object.

AI can propose additional relationships or identify missing evidence.

Validators and people should confirm them.

Our rule is the same across Martenweave:

> AI proposes. Validators verify. Humans approve.

## What management should receive

A manager does not need a diagram containing every relationship.

A useful impact summary should contain:

### The request

What is changing and why?

### Affected scope

Which domains, countries, organisations and systems are involved?

### Current-data impact

How many records are affected? Which populations have gaps?

### Delivery impact

Which mappings, rules, interfaces and tests require changes?

### Operational impact

What remediation, training or support changes are required?

### Options

What realistic implementation choices exist?

### Recommendation

Which option does the architecture and delivery team recommend, and why?

### Decision conditions

What must be completed before implementation or activation?

This is enough for informed governance without forcing management into field-level detail.

## Common impact-analysis failures

### Searching only for the SAP field name

Dependencies may use business names, aliases or transformed endpoints.

Start from the business attribute.

### Asking only the configuration team

Configuration is one part of the impact.

Migration, integration, testing, business ownership and AMS may see different consequences.

### Using outdated datasets

Impact should be quantified against the current population.

### Treating all countries as one context

Global attributes often have local use and completeness differences.

### Counting dependencies without assessing severity

Ten trivial references may matter less than one critical regulatory interface.

### Ignoring existing records

A rule for future creation may still affect old records when they are changed.

### Implementing first and documenting later

This turns the implemented solution into the decision.

### Recording only the selected option

Rejected alternatives and rationale help future teams avoid repeating the same analysis.

### Closing the change after transport

Mappings, tests, datasets, reports and AMS knowledge may still be misaligned.

## When lightweight analysis is enough

Not every field change needs a large assessment.

A short review may be sufficient when:

- the business meaning does not change;
- the field has no known downstream use;
- no current data requires remediation;
- no mapping or value list is affected;
- the change is limited to one controlled context;
- rollback is easy;
- regression testing is small.

The important point is that these conditions should be checked, not assumed.

A five-minute dependency query can justify a lightweight path.

Without the query, “low impact” may simply mean “we did not look.”

## Our conclusion

A field change rarely stays inside one field.

It can affect:

- business meaning;
- source-data availability;
- migration mappings;
- target validations;
- workflows;
- value lists;
- interfaces;
- test evidence;
- historical records;
- operational ownership.

The purpose of impact analysis is not to slow the programme with another approval process.

It is to prevent a small request from becoming a large surprise.

We start from the business attribute, identify direct and downstream relationships, examine the current data and present decision-makers with realistic options.

The most important question is not:

> How quickly can we configure this field?

It is:

> What else becomes true, invalid or incomplete if we make this change?

When the programme can answer that question before implementation, changes move faster because teams spend less time repairing consequences they could have seen.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We work on practical model governance for SAP migration, MDG, MDM and AMS programmes. We focus on helping architects and delivery teams understand the real impact of model changes, connect decisions to evidence and reduce the rework caused by changes made in isolation.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer supporting governed models, golden records, matching and consolidation, collaborative workflows, validated values, data-quality monitoring, audit trails and mass changes.

Martenweave’s public SAP migration documentation describes field-level mappings, contextual model objects, deterministic validation, dataset gap detection, lineage, impact analysis and human-reviewed change proposals.

The current Martenweave product documentation lists canonical model files, generated indexes, structured search, trace and impact analysis, dataset profiling, reports and the PatchProposal-to-ChangeRequest lifecycle.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.

