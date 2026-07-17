# Schema Registry vs Model Registry: Technical Compatibility Is Not Business Meaning

A message can be technically valid and still be wrong.

It may contain every required field.

The JSON may match the approved schema.

The Avro record may pass compatibility checks.

The API may return a successful response.

The receiving system may process the payload without an error.

And yet the business meaning of the message may be incorrect.

This is the boundary between a schema registry and a model registry.

A schema registry controls technical data structures exchanged between systems. It helps producers and consumers agree on field names, datatypes, required properties and compatible schema changes.

A model registry controls a wider question:

> What do those fields mean, how should they be populated, which rules apply, and what else depends on them?

Both forms of control matter.

The mistake is assuming that one automatically provides the other.

## What a schema registry protects

Modern enterprise systems exchange large numbers of messages.

An application publishes an order event.

A warehouse receives a product update.

A carrier platform receives a shipment request.

A finance system consumes a customer change.

Each participant needs to understand the technical structure of the message.

A schema might define that a shipment event contains:

- a shipment identifier;
- a customer identifier;
- a shipping condition;
- a planned dispatch date;
- a unit of measure;
- a list of delivery positions.

It may also define:

- which fields are strings;
- which fields are numeric;
- which fields are required;
- which enumerations are accepted;
- how nested objects are structured;
- whether new fields can be introduced safely.

The registry gives producers and consumers a controlled reference for that technical contract.

This prevents a common class of integration failure.

A producer cannot silently change a numeric field into free text without consequences.

A required property cannot simply disappear.

A new schema version can be checked against compatibility rules before it is released.

This is valuable engineering discipline.

It is especially important in event-driven architectures, APIs and integration landscapes where many applications evolve independently.

But a schema registry protects structure.

It does not automatically protect interpretation.

## The field can remain compatible while its meaning changes

Suppose a message contains this field:

```text
shippingCondition: string
```

Version one uses the following values:

```text
STANDARD
EXPRESS
PICKUP
```

Later, the business changes its fulfilment model.

`EXPRESS` no longer means a guaranteed express service. It now means that the order should be prioritised for warehouse processing, while the final carrier service is selected separately.

The technical field remains a string.

The same values may remain allowed.

The schema does not need to change.

Every producer and consumer remains technically compatible.

But the meaning has changed.

A warehouse may interpret `EXPRESS` as a picking priority.

A 3PL may continue interpreting it as a carrier-service instruction.

A reporting system may classify it as premium delivery.

A migration mapping may still assign the value based on the customer master.

Nothing in the technical schema necessarily reveals the conflict.

This is not schema incompatibility.

It is semantic incompatibility.

## Compatibility is a narrower promise than people assume

When an integration team says that two schema versions are compatible, managers may hear:

> The change is safe.

What the technical statement often means is narrower:

> Existing consumers should still be able to parse the structure.

That is useful, but it does not prove that:

- consumers interpret the values correctly;
- the business definition has remained stable;
- source-to-target mappings still apply;
- validation rules remain current;
- required fields are populated from the correct source;
- regional exceptions have been considered;
- downstream processes still behave as expected.

Technical compatibility reduces the risk of software breakage.

It does not remove the risk of business misinterpretation.

The distinction matters because business misinterpretation can be more dangerous than a visible technical error.

A rejected message is investigated.

A successfully processed message containing the wrong meaning may remain unnoticed until it affects deliveries, invoices, inventory or reporting.

## A practical example: product weight

Consider a product message sent from SAP to a warehouse system.

The schema defines:

```text
weight: decimal
weightUnit: string
```

The schema may also restrict the unit to approved values such as kilograms and grams.

From a technical perspective, the contract is clear.

Now consider the business questions.

Does `weight` describe:

- one base unit;
- one sales unit;
- one consumer package;
- one carton;
- one pallet;
- gross weight;
- net weight?

A value of `12.5 KG` can be structurally perfect and still be meaningless without that context.

Suppose SAP sends the gross weight of the base unit.

The warehouse assumes the value describes one carton.

The 3PL uses it for freight calculation.

All systems accept the message.

The schema validation passes.

The transport cost is wrong.

The schema registry did its job.

The model was incomplete.

## What a model registry adds

A model registry connects the technical field to the wider business model.

For the weight example, it could describe:

```text
Business attribute: Product Gross Weight
Reference quantity: One base unit
Source field: Legacy material extract GROSS_WEIGHT
Source unit field: WEIGHT_UNIT
Target field: SAP product gross weight
Outbound field: ProductMessage.weight
Applicability: Physical products only
Validation: Greater than zero when transportation-relevant
Owner: Product Data Governance
Evidence: Approved logistics design decision
Consumers: SAP, warehouse system, freight-planning interface
```

This gives the field a place in a controlled network of definitions.

The model can now answer questions that the schema alone cannot:

- Which business concept does this message field represent?
- Which source field populates it?
- Which transformation applies?
- Which population requires it?
- Who owns the definition?
- Which decision approved the interpretation?
- Which systems depend on it?
- What must be reviewed if its meaning changes?

The schema says that the field is a decimal.

The model says what the decimal means.

## A schema is not a source-to-target mapping

Another common confusion appears during migration and integration design.

A target API publishes a clear schema.

The project knows the expected field names and datatypes.

The team assumes that half the mapping work is already complete.

In reality, the schema defines only the receiving structure.

It does not determine:

- which legacy field should supply each target property;
- whether several source fields must be combined;
- how local codes map to global codes;
- which default values are permitted;
- when an empty field is acceptable;
- how conflicting source values should be resolved;
- which business owner approves the transformation.

Suppose a target schema requires:

```text
customerCategory: string
```

The source landscape contains:

- customer class;
- account group;
- market segment;
- legal entity type;
- local customer category.

All are strings.

All could technically populate the target field.

Only one may represent the intended concept.

The schema cannot select it.

That requires model knowledge.

## A model registry is not a better schema registry

The distinction also works in the other direction.

A model registry should not try to replace technical schema management.

A model file may state that `shippingCondition` is a controlled business attribute.

That does not provide all the capabilities needed for runtime integration governance.

A specialised schema registry may be needed to:

- store machine-readable schemas;
- version message contracts;
- enforce compatibility rules;
- support serialisation formats;
- integrate with producer and consumer applications;
- prevent incompatible deployments;
- distribute schemas at runtime.

These are engineering responsibilities.

Rebuilding them inside a migration or model-governance product would add complexity without solving the model problem better.

A model registry should reference technical schemas where useful.

It should not become the runtime infrastructure for every message exchange.

## The two registries manage different kinds of change

The easiest way to understand the difference is to examine what each system considers a change.

### Schema change

Examples include:

- adding a field;
- removing a field;
- changing a datatype;
- renaming a property;
- modifying a nested structure;
- changing whether a field is required;
- updating an enumeration.

The concern is whether producers and consumers remain technically compatible.

### Model change

Examples include:

- redefining what a field means;
- changing the authoritative source;
- replacing a value mapping;
- introducing a country exception;
- changing a mandatory condition;
- assigning a new owner;
- connecting the attribute to another process;
- withdrawing an earlier business decision.

Some model changes require a schema change.

Many do not.

A field may retain the same name and datatype while its source, meaning or conditions change completely.

That is why schema versioning alone cannot provide full change control.

## One schema field can represent several business attributes

Technical models often optimise for message structure rather than conceptual purity.

A generic property may be reused across process variants.

For example:

```text
priorityCode: string
```

In one message, it may refer to warehouse picking priority.

In another, it may describe customer service level.

In a third, it may influence transportation planning.

Technically, each message uses the same datatype and perhaps the same code format.

Business users may assume that the values are comparable.

They may not be.

A model registry should make the contextual distinction explicit.

The business attribute is not simply `priorityCode`.

It may be:

- warehouse execution priority;
- customer delivery priority;
- transport planning priority.

Each can then reference the relevant technical field in its own context.

Without this separation, technical reuse gradually creates semantic confusion.

## Several schema fields can represent one business attribute

The opposite pattern is equally common.

The business concept “customer delivery priority” may appear as:

- a field in a legacy customer table;
- a property in a migration file;
- an SAP master-data field;
- a value in an outbound delivery message;
- a code used by a 3PL;
- a reporting dimension.

The technical names may all differ.

A schema registry can manage each structure separately.

It does not automatically know that all these fields represent the same business concept.

A model registry can connect them.

This creates a traceable chain:

```text
Business attribute
    → legacy source field
    → migration mapping
    → SAP target field
    → outbound message field
    → external provider code
```

Now a proposed definition change can be assessed across the whole chain.

## Why this matters in SAP landscapes

SAP programmes are particularly exposed to the gap between technical and business compatibility.

A business attribute may be represented through:

- SAP tables;
- CDS views;
- IDocs;
- APIs;
- migration templates;
- middleware mappings;
- warehouse messages;
- external-provider payloads.

Each interface may have a valid technical schema.

The difficult questions remain:

- Which SAP field is authoritative?
- Does the field have the same meaning in every process?
- Which organisational level applies?
- Is the value global, plant-specific or sales-area-specific?
- Which local exceptions exist?
- Is the value entered, derived or defaulted?
- Which downstream process consumes it?
- Who may approve a change?

The schema is necessary for moving data between applications.

The model is necessary for understanding what is being moved.

## A second example: supplier status

Suppose a supplier interface contains:

```text
status: string
```

The accepted values are:

```text
ACTIVE
BLOCKED
INACTIVE
```

The schema is clear.

But what does `BLOCKED` mean?

It might mean:

- blocked for purchasing;
- blocked for posting;
- blocked for one company code;
- blocked for one purchasing organisation;
- globally blocked;
- temporarily blocked pending review.

A single technical status may be unable to represent the required business distinctions.

Or different systems may collapse several SAP statuses into one external field.

The integration may still be technically valid.

A model registry should document:

- which source statuses contribute;
- how the target value is derived;
- which organisational levels are considered;
- what information is lost;
- which processes may rely on the simplified status;
- which owner accepted the design.

This is not only documentation.

It is a record of an intentional semantic compromise.

Without it, future teams may treat the simplified interface value as equivalent to the full SAP status model.

## Data contracts sit between the two

The term **data contract** is increasingly used to describe an agreement between data producers and consumers.

A mature data contract can include more than a technical schema.

It may define:

- field structure;
- semantics;
- quality expectations;
- ownership;
- service-level expectations;
- change procedures.

This brings data contracts closer to model governance.

But the same caution applies.

A contract is only as complete as the information represented in it.

A contract may define one dataset or message well while the wider migration model remains fragmented.

It may not connect the field to:

- other source datasets;
- SAP target mappings;
- project decisions;
- country exceptions;
- support incidents;
- proposed model changes.

A model registry can use data contracts as important evidence.

It can also connect several contracts to the wider domain model.

The categories overlap.

The management responsibility is to understand which relationships remain uncontrolled.

## Technical enforcement and business approval are different controls

A schema registry can often enforce rules automatically.

A deployment may be rejected because the new schema is incompatible with an earlier version.

This is strong preventive control.

Business-model changes are harder to automate fully.

A system can detect that a mapping references an unknown field.

It can detect that a mandatory rule conflicts structurally with an exception.

It can show that several interfaces depend on the attribute.

It cannot independently decide whether the company should redefine the business concept.

That requires ownership and approval.

A practical model-change workflow therefore looks different:

```text
New evidence
    → proposed model change
    → deterministic validation
    → dependency and impact analysis
    → business review
    → approved model update
```

Technical compatibility can often be evaluated by rules.

Business meaning must remain accountable to people.

## Why AI makes the distinction more important

AI systems can generate mappings, infer field relationships and propose schema changes quickly.

This is useful.

It also increases the risk of plausible but incorrect alignment.

An AI model may infer that `CUST_TYPE` maps to `customerCategory` because the names are similar.

The datatypes match.

The schema accepts the value.

The mapping may still be wrong because `CUST_TYPE` represents legal form while the target field represents market segmentation.

A schema validator will not detect that semantic error.

An AI-generated proposal therefore needs:

- source evidence;
- model context;
- deterministic validation;
- impact analysis;
- human approval.

AI can propose.

The registry should show what the proposal affects.

The schema infrastructure should ensure that approved technical changes remain compatible.

Each control has a separate role.

## What managers should ask about schema governance

Managers do not need to become specialists in Avro, JSON Schema or Protobuf.

They should still ask several questions.

### Which technical contracts are controlled?

Not every interface in the landscape may use the registry.

Coverage matters.

### What compatibility rules are enforced?

Backward compatibility, forward compatibility and full compatibility protect different deployment scenarios.

The technical team should explain which one is required and why.

### Who owns schema changes?

A technically compatible addition may still create business obligations for consumers.

### Are field descriptions treated as documentation or as governed meaning?

A short schema description may not be enough for a critical business attribute.

### How are schema changes connected to testing and release management?

Registration alone does not prove that every consumer behaves correctly.

## What managers should ask about model governance

The wider model requires another set of questions.

### What business attribute does the field represent?

The technical name is not sufficient.

### Where does the value originate?

The current producer may itself derive the value from several sources.

### Which rules and exceptions apply?

These may differ by region, organisation or process.

### Who owns the meaning?

The integration developer should not become the accidental business owner.

### What depends on the definition?

This includes mappings, validations, processes, reports and external consumers.

### How is a proposed meaning change reviewed?

A schema-compatible semantic change can still require broad approval and retesting.

## When a schema registry is enough

A schema registry may be sufficient when:

- the business meaning is already stable;
- the main risk is technical contract evolution;
- producers and consumers agree on semantics;
- source-to-target mappings are simple;
- organisational exceptions are limited;
- the architecture is primarily event or API driven;
- model decisions are governed elsewhere.

In that environment, adding a separate model registry may create duplicate maintenance.

The objective is not to register every possible kind of knowledge.

It is to close real control gaps.

## When a model registry becomes necessary

The case becomes stronger when:

- the same concept appears in many systems;
- technical fields have ambiguous meanings;
- several source systems use different codes;
- migration mappings change frequently;
- business rules vary by country or organisation;
- schemas remain stable while semantics evolve;
- decisions live in tickets and spreadsheets;
- external providers interpret values differently;
- the programme needs impact analysis before changing definitions;
- AI is proposing mappings or model changes.

At that point, technical compatibility is only one part of the problem.

## How the two can work together

A sensible architecture does not force a choice.

### The schema registry controls

- machine-readable message structures;
- schema versions;
- datatypes;
- required properties;
- compatibility;
- producer and consumer integration.

### The model registry controls

- business attributes;
- source and target relationships;
- mappings;
- transformations;
- rules;
- exceptions;
- decisions;
- ownership;
- impact;
- proposed changes.

The model registry can reference the schema and its fields.

The schema registry can remain the technical enforcement point.

For example:

```text
Business attribute: Delivery Priority
    → SAP source field
    → approved transformation
    → schema: ShipmentEvent v4
    → field: priorityCode
    → consumer: 3PL platform
```

A schema change can trigger model-impact analysis.

A model change can indicate whether the schema and consumers need to be updated.

That is a useful division of responsibility.

## Where Martenweave fits

Martenweave is not intended to replace runtime schema infrastructure.

Its role is to govern the wider model around technical fields.

Canonical files can describe domains, entities, attributes, field endpoints, mappings, datasets, rules, evidence, decisions and change proposals. References are validated before generated indexes are built. Dataset gaps, lineage and change impact can then be assessed against the approved model.

This allows a technical schema field to be connected to:

- its business meaning;
- its approved source;
- the transformation that populates it;
- the validation rules that apply;
- the systems that consume it;
- the evidence supporting the design;
- the proposal that seeks to change it.

Martenweave should integrate with schema registries where appropriate.

It should not reproduce their runtime responsibilities.

## The management rule

The distinction can be reduced to two questions.

**A schema registry asks:**

> Can systems continue to exchange and parse this data safely?

**A model registry asks:**

> Are the meaning, source, rules and dependencies of this data still correct?

A mature architecture needs both answers.

A technically incompatible change usually fails visibly.

A semantically incompatible change may pass quietly through every system.

That is why technical compatibility is necessary but insufficient.

The message must be valid.

The model behind the message must also be true.
