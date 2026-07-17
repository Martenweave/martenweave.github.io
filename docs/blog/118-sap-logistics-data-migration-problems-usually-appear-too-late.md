# SAP Logistics Data Migration Problems Usually Appear Too Late

Most SAP logistics migration problems are discovered at the worst possible moment.

Not while the data model is being designed.

Not while mapping spreadsheets are being reviewed.

They appear during test loads, warehouse integration testing or cutover preparation—when changing a field definition already affects several teams, systems and deadlines.

A material fails to load because a mandatory warehouse attribute is missing.

A unit of measure passes the migration check but causes problems in EWM.

A customer is loaded successfully, yet route determination produces an unexpected result.

A 3PL interface accepts the message technically but interprets one of the codes incorrectly.

At that point, the problem is normally classified as a data-quality defect.

Sometimes it is.

Quite often, the real problem is different: the project never had a reliable model connecting the source data, SAP target fields, transformation rules, logistics dependencies and business decisions.

The data was checked.

The model behind the data was not.

## A mapping spreadsheet is not a logistics data model

Most migration projects use mapping spreadsheets.

There is nothing inherently wrong with that. Excel is accessible, familiar and useful for reviewing large numbers of fields.

The problem begins when the spreadsheet is expected to become the complete source of truth.

A typical mapping row contains:

- source field;
- target field;
- transformation;
- mandatory status;
- comments;
- perhaps an owner.

That may be enough to prepare an initial load.

It is rarely enough to control a logistics transformation.

A material attribute can be connected to warehouse processes, units of measure, packaging, plant-specific settings, interfaces, reports and external logistics providers.

A customer shipping attribute can influence deliveries, route determination, scheduling and transportation planning.

A supplier field may be optional globally but mandatory for one purchasing organisation or country.

The spreadsheet shows the field.

It does not reliably show the network around the field.

That network is where the risk sits.

## One missing field is rarely just one missing field

Consider a company preparing material data for an SAP S/4HANA and EWM rollout.

The migration template contains a field for the product’s preferred unit of measure in the warehouse.

The central material team marks the field as optional because it is not required for every material in the ERP migration object.

The warehouse team assumes the field will be derived from packaging data.

The packaging spreadsheet contains the required relationship, but only for one product group.

The legacy warehouse extract uses a different field name.

The interface team expects the warehouse unit in an outbound product message.

Each team has a reasonable explanation.

The combined model is still incomplete.

During the first integration test, several products reach EWM without the expected warehouse unit.

The immediate response is predictable:

1. The test defect is assigned to the data-migration team.
2. The migration team checks its template and confirms that the field was optional.
3. The warehouse team argues that the value is operationally required.
4. The integration team confirms that its mapping followed the interface specification.
5. A temporary derivation is added.
6. The spreadsheet is updated.
7. Nobody checks whether other objects, plants or interfaces use the same assumption.

The defect is closed.

The underlying inconsistency remains.

This is how migration projects accumulate fragile fixes.

## The problem is not always bad data

“Data quality” is often used as a broad label for several different failures.

They should be separated.

### The source data is wrong

A weight is invalid. A customer address is incomplete. A unit conversion is mathematically incorrect.

This is a genuine data-quality problem.

### The source data does not contain what the target model expects

The migration design requires an attribute that is absent from the extract.

This is a dataset-to-model gap.

### The mapping is incomplete

The source value exists, but there is no approved target mapping or transformation.

This is a modelling gap.

### Teams disagree about the meaning of the field

The ERP team, warehouse team and 3PL use the same label for different concepts.

This is a semantic gap.

### A decision was made but not propagated

A workshop or ticket introduced an exception, but the mapping, validation rule and interface specification were not updated together.

This is a governance gap.

### A change has dependencies nobody reviewed

The field was modified correctly, but downstream rules, datasets or interfaces were not considered.

This is an impact-analysis gap.

All six problems may eventually appear as a failed record or rejected message.

Treating all of them as “bad data” hides the actual work required to resolve them.

## Why SAP logistics migrations are particularly exposed

Logistics data crosses organisational boundaries.

A financial field may remain largely within one functional area.

A logistics attribute often travels through several layers:

- source ERP;
- SAP S/4HANA;
- EWM or another warehouse system;
- TM or an external TMS;
- middleware;
- carrier or 3PL platforms;
- reporting and planning systems.

Each layer may use a different representation.

The SAP field may contain an internal code.

The middleware may convert it.

The 3PL may expect another value.

The business may describe the concept using language that appears nowhere in the technical specification.

As long as the existing process continues unchanged, these differences may remain invisible.

They become visible when a company changes ERP, introduces a new warehouse, replaces a logistics provider or adds another country.

The project is then forced to reconstruct the meaning of its own data while simultaneously delivering the transformation.

Current logistics discussions increasingly focus on AI, autonomous planning and real-time optimisation. Yet data silos and poor data quality remain basic obstacles: warehouse, transportation and planning information still frequently live in separate environments that cannot use one another’s context reliably.

Before adding more intelligence, the organisation needs to know what its logistics data means.

## What should be checked before the first load

A logistics migration readiness check should go beyond checking whether columns are populated.

For each important field, the team should be able to answer:

- What business concept does this field represent?
- Where does the value originate?
- Is the source field present in the current extract?
- Is the target field still correct?
- Is the field globally required or conditionally required?
- Which plants, warehouses, countries or process variants use it?
- Which transformation produces the target value?
- Which values remain unmapped?
- Which validation rules apply?
- Which interfaces consume it?
- Who owns the definition?
- Which decision or document supports the rule?
- What else will be affected if the definition changes?

Few projects can answer all of these questions consistently.

The knowledge may exist, but it exists in separate files and separate teams.

That is the problem Martenweave is intended to address.

## What Martenweave changes

Martenweave does not replace the migration tool.

It does not load materials into SAP, configure EWM or execute 3PL interfaces.

It sits before and around those activities.

The application turns scattered project knowledge into a structured model containing objects, attributes, datasets, mappings, validation rules, relationships, decisions, evidence and proposed changes.

Canonical model files remain the source of truth. Generated indexes can be rebuilt. References are validated deterministically. AI-generated changes are proposals that require validation and human approval rather than direct mutation of the model.

For the warehouse-unit example, the model could connect:

- the business attribute `Warehouse Unit of Measure`;
- its legacy source fields;
- the SAP target field;
- the EWM representation;
- packaging relationships;
- applicable product groups;
- plant or warehouse conditions;
- the outbound interface field;
- validation rules;
- the responsible owner;
- the decision explaining whether the value is supplied or derived.

Now the project can check the model before checking thousands of records against it.

## Detecting dataset gaps before they become load errors

Suppose a migration team receives a new XLSX extract from a legacy material system.

Instead of immediately preparing the load file, the dataset can be compared with the approved model.

The check may reveal that:

- one expected column is absent;
- two columns were renamed;
- twelve products have no valid warehouse unit;
- three unit values are not covered by the mapping;
- packaging data is missing for one product group;
- the derivation rule applies only to one warehouse;
- one required attribute has no assigned owner.

This is not yet a failed SAP load.

It is a readiness report.

That distinction matters.

Problems are cheaper to resolve while they are still model and dataset gaps. They become more expensive after they enter migration cycles, integration testing and cutover planning.

Martenweave already supports profiling CSV and XLSX datasets, comparing them with model field definitions, producing readiness reports and turning identified gaps into reviewable proposals or GitHub issue drafts.

The objective is not to generate another report that nobody reads.

The objective is to classify gaps early enough that the correct team can act.

## Showing the impact before changing a field

Finding missing data is only half of the problem.

The other half is change.

During migration, field definitions change constantly.

A source column is replaced.

A target field becomes mandatory.

A derivation is introduced.

A value mapping is extended.

A country-specific exception is approved.

The usual workflow is to update the document where the change was requested.

But the same definition may also appear in:

- another migration object;
- a validation script;
- an EWM template;
- a 3PL specification;
- a test case;
- a reconciliation report;
- a support procedure.

Without impact analysis, the project relies on people remembering all these dependencies.

That works until it does not.

A model registry makes the field a connected object rather than a cell in a spreadsheet.

Before approving a change, the team can see which datasets, mappings, rules, interfaces and decisions refer to it.

This does not remove the need for expert judgement.

It directs that judgement to the places where it is needed.

## Preventing the same defects from returning

The same approach is useful after go-live.

AMS teams regularly resolve logistics incidents caused by missing or inconsistent master data:

- delivery blocks caused by incomplete customer attributes;
- warehouse messages rejected because of product data;
- purchasing failures caused by missing organisational data;
- interface errors caused by unsupported codes;
- incorrect routes caused by inconsistent shipping attributes.

The ticket is fixed and closed.

The next team receives no reusable control.

A better process is to ask whether the incident exposed a missing part of the model.

Should there be a new validation rule?

Was a field definition unclear?

Is an exception undocumented?

Is ownership missing?

Does the dataset-readiness check need another condition?

Martenweave can convert the finding into a patch proposal. The proposal is validated and reviewed before becoming part of the approved model.

Over time, support knowledge stops disappearing into closed tickets.

It becomes part of the prevention layer.

## What managers should ask for

Managers do not need to inspect individual model files.

They need readiness information that can be acted upon.

Instead of:

> Material master data is 95% complete.

they should receive something closer to:

> The material dataset contains all expected structural columns. Four warehouse-relevant attributes are incomplete for Plant 1200, fourteen unit values have no approved mapping, and the packaging derivation for one product group has not been approved by the warehouse owner.

Instead of:

> The 3PL interface is ready.

a more useful statement is:

> All required interface fields are mapped, but three business codes are used differently by SAP and the 3PL. The transformations are documented, while one regional exception remains unresolved.

These statements separate volume from risk.

A dataset can be 99% populated and still be unfit for one critical logistics process.

A model can have only a few gaps and still be unsafe because those gaps sit in high-impact attributes.

## This is not another MDM platform

The scope needs to remain clear.

Martenweave is not intended to become:

- an SAP master-data maintenance screen;
- a warehouse-management system;
- a transportation-management system;
- an integration runtime;
- a workflow platform;
- a logistics control tower.

Those systems execute processes and maintain operational records.

Martenweave maintains the traceable model used to understand and change those records safely.

Its job is to answer a narrower set of questions:

- What does the data mean?
- What does the target process expect?
- Where are the gaps?
- Which rules and decisions support the model?
- What depends on the field we want to change?
- Who must review the proposed correction?

That is enough.

## The first load should confirm the model, not discover it

Some migration defects will always be found during testing.

Real systems contain historical exceptions, local practices and data conditions that no design process captures perfectly.

But the first load should not be the first time the project discovers that teams disagree about a mandatory field.

It should not reveal that the source extract lacks attributes expected by the target model.

It should not be the first place where SAP, warehouse and 3PL code meanings are compared.

Those questions belong earlier.

A migration tool moves data.

A mapping spreadsheet describes parts of the movement.

A model registry controls the meaning and dependencies behind it.

When that layer is missing, logistics projects repeatedly use test loads to discover decisions they should have made before loading anything.

Martenweave exists to move that discovery forward.
