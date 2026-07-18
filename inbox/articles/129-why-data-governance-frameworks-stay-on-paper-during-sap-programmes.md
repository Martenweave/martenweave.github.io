# Why Data Governance Frameworks Stay on Paper During SAP Programmes

Many organisations already know what good data management should look like.

They know that important data needs owners.

Definitions should be consistent.

Metadata should be maintained.

Quality rules should be measurable.

Changes should be controlled.

Master and reference data should be governed.

Integration should preserve meaning across system boundaries.

None of these ideas is new.

DAMA-DMBOK has spent years giving data professionals a common vocabulary and a broad framework for organising these responsibilities. DAMA describes it as a globally recognised framework covering the principles, practices and functions required to build and govern data-management programmes. It is deliberately vendor-neutral and non-prescriptive: it explains the disciplines an organisation needs, but does not prescribe a particular tool or implementation method.

The difficulty begins when a company tries to apply those principles inside a real SAP transformation.

The programme has mapping workbooks, Jira tickets, migration tools, data-quality checks, interface specifications and governance meetings.

It may even have a formal data-governance organisation.

Yet the project still cannot answer basic questions reliably:

- Which definition is currently approved?
- Who owns this attribute?
- Does the latest dataset satisfy the agreed model?
- Which mapping implements the business rule?
- Why does a local exception exist?
- What will be affected if the field changes?
- Has a decision been reflected in the validations and interfaces?
- Is the proposed AI-generated correction safe to apply?

The framework exists.

The operating control does not.

This is where Martenweave and DAMA-DMBOK intersect.

Martenweave is not an alternative to DAMA-DMBOK. It is not another data-management framework, certification system or enterprise governance methodology.

It is a technical implementation layer for a narrow but difficult part of the framework:

> keeping data definitions, mappings, rules, datasets, evidence and proposed changes consistent during migration and transformation work.

DAMA-DMBOK provides the management disciplines.

Martenweave turns selected parts of those disciplines into model objects, validation rules, gap reports, impact analysis and reviewable changes.

## The difference between a framework and an operating control

A framework helps an organisation understand what capabilities it needs.

It may explain the importance of:

- governance;
- ownership;
- metadata;
- data modelling;
- architecture;
- data quality;
- master and reference data;
- integration and interoperability.

DAMA currently describes data management as the development, execution and supervision of the plans, policies and practices used to deliver, control, protect and improve data throughout its lifecycle. Its public overview organises the discipline into 11 knowledge areas and highlights governance, quality, security, architecture, metadata, and integration as especially important.

But a framework does not automatically create a working control.

A policy may say that every critical data element needs an owner.

That does not tell the migration team which of its 1,800 mapped fields are critical, which owner is missing, or whether a proposed mapping was reviewed by the correct person.

A metadata principle may say that definitions, lineage and usage should be documented.

That does not automatically connect a business attribute in SAP to a legacy source column, an Excel mapping, a validation rule and a 3PL interface.

A quality-management policy may require measurable controls.

That does not guarantee that the quality rule uses the latest approved business definition.

The gap between the principle and daily execution is where many governance programmes weaken.

The organisation has governance language.

The project still operates through documents and memory.

## A practical example: the rule exists, but the model does not

Consider a material migration into SAP S/4HANA and EWM.

The programme has adopted sensible governance principles.

The product domain has an owner.

Material attributes are classified.

Data-quality rules are documented.

Mappings pass through approval.

The warehouse unit of measure is considered a critical attribute.

On paper, the controls look adequate.

During testing, products arrive in EWM without the expected warehouse unit.

The investigation finds several problems:

- the migration workbook marks the field as optional;
- the warehouse design treats it as mandatory for selected product groups;
- the source extract does not contain it for one plant;
- a packaging dataset can derive it, but only for part of the population;
- the validation checks that the resulting value is valid, but not whether the derivation is applicable;
- a local decision recorded in Jira introduced an exception;
- the exception never reached the main mapping model.

Nothing here disproves the value of DAMA-DMBOK.

The framework would recognise several relevant disciplines:

- data governance;
- data modelling;
- metadata management;
- data quality;
- master data;
- integration.

The problem is that the programme has not connected these disciplines at field level.

The owner exists in one system.

The rule exists in another.

The mapping exists in Excel.

The evidence exists in Jira.

The dataset exists in a file share.

The implementation exists in transformation code.

The governance model is fragmented across its own tools.

Martenweave addresses this specific fragmentation.

It can represent the warehouse unit as one governed attribute connected to:

- its business definition;
- source fields;
- target fields;
- applicable product groups;
- migration datasets;
- derivation rules;
- validations;
- warehouse dependencies;
- decisions;
- owners;
- proposed changes.

The framework tells the organisation that these controls matter.

Martenweave gives the project a place to connect and validate them.

## Data governance: DAMA defines accountability; Martenweave records it in the model

Data governance is central to DAMA’s view of data management. DAMA’s public description frames governance around accountability, policies and decision rights.

This is primarily an organisational discipline.

The company must decide:

- who owns customer data;
- who may approve changes;
- who acts as steward;
- how disputes are resolved;
- which policies apply;
- how exceptions are governed.

Martenweave cannot establish genuine accountability.

It cannot force a business unit to appoint an owner.

It cannot resolve a disagreement between global and local process teams.

It cannot replace a data council.

What it can do is make the consequences of missing governance visible inside the working model.

For example, it can show that:

- a critical attribute has no owner;
- a mapping has not been approved;
- an exception has no supporting decision;
- a proposed change affects fields owned by several domains;
- a validation rule exists without accountable business ownership.

This is a useful distinction.

DAMA-DMBOK addresses the **governance operating model**.

Martenweave supports the **governed artefact**.

The governance organisation decides who has authority.

Martenweave records which model elements fall under that authority and which proposed changes require review.

## Metadata management: from descriptions to connected evidence

DAMA describes metadata management as providing context and meaning so that data is discoverable, usable and auditable.

This intersects directly with Martenweave.

A migration programme produces several forms of metadata:

- business definitions;
- source and target field descriptions;
- datatypes;
- mappings;
- transformation logic;
- validation rules;
- ownership;
- lineage;
- decisions;
- evidence;
- implementation status.

The problem is rarely that none of this metadata exists.

The problem is that it exists in incompatible forms.

A business definition is written in Confluence.

The source field is documented in a workbook.

The transformation is implemented in SQL.

The decision is recorded in Jira.

The validation appears in Python.

The target structure comes from SAP documentation.

A conventional metadata repository may catalogue some of these assets.

Martenweave focuses on connecting the parts required to control a project model.

Its canonical files can represent domains, entities, attributes, field endpoints, mappings, datasets, rules, evidence, decisions and proposals. Generated SQLite and search indexes can be rebuilt from those canonical definitions rather than becoming another independent source of truth.

This supports a DAMA-style metadata objective, but in a narrower context.

Martenweave is not an enterprise metadata platform.

It does not attempt to scan every database, dashboard and pipeline.

It manages the metadata needed to answer a project-level question:

> What is the approved model, and do the available evidence and datasets support it?

## Data modelling and design: the model becomes executable enough to check

A data model is often treated as a diagram or design deliverable.

During migration, however, the model is also distributed through field mappings, code lists, transformations, mandatory conditions and relationships.

A model can look correct at entity level while remaining inconsistent at implementation level.

For example, the conceptual model may define a supplier.

The logical model may define payment terms as an attribute.

The migration workbook maps a legacy code.

The SAP target uses a specific payment-term key.

The local business interprets the source code differently.

The validation checks only whether the target code exists.

The design is not wrong because the diagram is wrong.

It is wrong because the layers do not agree.

Martenweave treats these parts as addressable model objects with stable references.

This allows deterministic checks such as:

- does the mapping reference a known source field?
- does the target field belong to the correct object?
- does the rule reference an existing attribute?
- is an active mapping using a deprecated endpoint?
- are required relationships complete?
- are identifiers unique?
- is the proposed change structurally valid?

This is where the abstract principle of controlled modelling becomes operational.

The system does not judge whether the business has chosen the best supplier classification.

It checks whether the recorded model is internally coherent.

## Data quality: checking the rules before checking the records

DAMA treats data quality as a core discipline concerned with reliable and trustworthy data.

Most programmes implement this through profiling and record-level checks:

- mandatory fields;
- allowed values;
- duplicate detection;
- formats;
- ranges;
- referential integrity.

Martenweave does not replace a specialised data-quality engine.

Its contribution happens one level earlier.

A data-quality tool can check:

> Is the shipping condition populated?

Martenweave can help check:

- is shipping condition expected in this dataset?
- which business attribute does the source field represent?
- is it mandatory for every record or only under defined conditions?
- does an approved exception exist?
- which mapping populates it?
- is the quality rule based on the current model?
- which downstream processes depend on it?

This matters because clean data can still implement the wrong rule.

A tax identifier can be perfectly formatted but mapped into the wrong SAP tax category.

A product weight can be populated and positive but refer to the wrong packaging level.

A supplier classification can belong to an approved code list but represent another business meaning in one source system.

Martenweave’s dataset-readiness workflow validates the model, builds the generated index, profiles a CSV or XLSX dataset, identifies gaps and produces a readiness report. Findings can also be promoted into a reviewable proposal or issue draft.

This translates data-quality principles into a concrete distinction:

- data quality checks whether records comply;
- model validation checks whether the programme is using a coherent definition of compliance.

## Master and reference data: Martenweave governs the transition model, not the productive record

DAMA-DMBOK covers master and reference data management as an enterprise discipline.

This includes the consistent management of entities such as customers, suppliers, products and standardised code sets.

Martenweave intersects with this area, but it is not an MDM platform.

It does not:

- create productive Business Partners;
- perform enterprise matching and merging;
- maintain golden records;
- distribute master data;
- replace SAP MDG workflows.

Its role is closer to the model surrounding master and reference data:

- how legacy records map to the target;
- which attributes are expected;
- how local codes are harmonised;
- which reference values are approved;
- which exceptions exist;
- which datasets support the transition;
- which decisions explain the design.

This boundary is important.

SAP MDG may govern the final supplier record.

Martenweave can govern the mapping and evidence used to migrate the supplier into that governed environment.

The productive master record belongs to MDM.

The migration and change model belongs to Martenweave.

## Integration and interoperability: preserving meaning across boundaries

DAMA identifies integration and interoperability as a major data-management capability. Its public overview describes the discipline as enabling data from different sources to be combined and used effectively across systems.

This is another strong intersection.

Integration teams usually control technical movement:

- APIs;
- IDocs;
- event schemas;
- middleware mappings;
- files;
- transformations.

But technical interoperability does not guarantee semantic interoperability.

A message may be valid while the receiving system interprets a value differently.

A 3PL may accept `EXPRESS`, but use it as a carrier-service level while SAP uses it as a customer delivery priority.

A warehouse may receive a valid weight and assume it applies to a carton when SAP sends the base-unit weight.

A supplier status may be reduced from several SAP blocking levels into one external code.

Martenweave can record these semantic relationships and compromises.

It can connect:

- the business attribute;
- SAP representation;
- external representation;
- conversion rule;
- applicable scope;
- owner;
- supporting decision;
- downstream dependency.

It does not execute the interface.

It provides a governed model of what the interface is supposed to mean.

## Data architecture: Martenweave is one component, not the architecture

DAMA frames data architecture as the blueprint for how data is collected, stored, integrated and used across the organisation.

Martenweave does not define the entire data architecture.

It will not decide whether the company needs:

- a data warehouse;
- lakehouse;
- event platform;
- enterprise MDM hub;
- integration platform;
- operational data store.

Its architectural role is narrower.

It can serve as a model-governance layer between evidence-producing systems and execution systems:

```text
Source systems, files, tickets and catalogues
                    ↓
                 evidence
                    ↓
          Martenweave model layer
                    ↓
 validation → gaps → impact → proposal → review
                    ↓
Migration, MDM, integration and Git workflows
```

This fits within a wider DAMA-style architecture.

It should not become the centre of every data-management activity.

## Where the overlap is strongest

Martenweave has its strongest DAMA-DMBOK alignment in five areas.

### Metadata management

It stores structured context around model objects, mappings, decisions and evidence.

### Data modelling and design

It represents the intended model through canonical, referenceable objects.

### Data quality

It validates the model and compares real datasets with model expectations.

### Data governance

It supports ownership, controlled proposals, review and auditability.

### Integration and interoperability

It preserves source-to-target and cross-system meaning.

These areas meet inside a common problem:

> the organisation needs to change data safely across several tools and teams.

That is the practical centre of Martenweave.

## Where the overlap is weak or deliberately absent

Martenweave should not claim complete DAMA-DMBOK coverage.

That would be inaccurate and strategically harmful.

It is not currently the primary system for:

- data security management;
- privacy management;
- database operations;
- data warehousing and business intelligence;
- document and content lifecycle management;
- enterprise data strategy;
- organisation-wide governance policy;
- regulatory compliance management;
- productive MDM;
- enterprise-wide technical metadata discovery.

Some of these areas may provide evidence to Martenweave.

For example:

- a security classification can become an attribute of a model element;
- a catalogue can supply source metadata;
- an MDM platform can supply target definitions;
- a quality platform can provide validation results.

But Martenweave should not absorb their operational responsibilities.

DAMA-DMBOK is broad by design.

Martenweave should remain narrow by design.

## A simple comparison

| DAMA-DMBOK responsibility | Martenweave contribution | What remains outside |
|---|---|---|
| Data governance | Ownership, reviewable proposals, decision traceability | Governance councils, policies, decision rights |
| Metadata management | Canonical model metadata, evidence and relationships | Enterprise-wide automated discovery |
| Data modelling | Entities, attributes, fields, mappings and rules | Full enterprise modelling methodology |
| Data quality | Model validation and dataset gap detection | Large-scale cleansing and operational monitoring |
| Master/reference data | Migration mappings and code relationships | Golden records and productive stewardship |
| Integration | Source-to-target semantics and dependency tracking | Runtime message execution |
| Data architecture | Model layer within a wider architecture | Enterprise architecture design |
| Security/privacy | Can record classifications and evidence | Enforcement, access control and compliance operations |

This table is the real answer to how the two intersect.

DAMA-DMBOK tells the organisation what good data management contains.

Martenweave implements a selected operational slice.

## The real problem: DAMA programmes often become policy-heavy

A company may launch a DAMA-inspired initiative and produce:

- a governance charter;
- a data-owner matrix;
- a business glossary;
- a quality framework;
- a metadata policy;
- a stewardship process.

These artefacts can be useful.

But project teams may continue to work as before.

Mappings remain in Excel.

Decisions remain in Jira.

Validation rules remain in scripts.

Ownership remains in a RACI document.

The governance programme sits above delivery rather than inside it.

This creates two parallel realities:

### Governance reality

The organisation has defined policies, roles and standards.

### Delivery reality

The project changes fields, mappings and rules through local tools and urgent decisions.

Martenweave can help connect these realities by attaching governance information directly to the model elements used in delivery.

The owner is not only listed in a governance document.

The owner is connected to the attribute.

The decision is not only stored in Jira.

It is connected to the mapping it changes.

The quality rule is not only executable code.

It is connected to the business definition it enforces.

This is how a framework begins to influence daily work.

## Martenweave should not become “DAMA in software”

That would be the wrong product direction.

DAMA-DMBOK is intentionally broad and adaptable. DAMA explicitly states that it is not a prescriptive standard, technology manual or one-size-fits-all implementation method.

Trying to turn every knowledge area, activity and role into Martenweave functionality would create an enormous governance platform.

The result would likely be:

- too complex for migration teams;
- too narrow for enterprise data management;
- expensive to maintain;
- difficult to explain;
- dependent on heavy configuration.

The better position is:

> Martenweave operationalises model governance where enterprise data-management principles meet project delivery.

It gives DAMA-aligned organisations a practical control for model-heavy changes.

It also helps teams that have never formally adopted DAMA, because the underlying problems are the same.

## What a manager should expect

A manager should not expect Martenweave to demonstrate that the organisation is “DAMA compliant.”

DAMA-DMBOK is not a compliance mandate or rigid certification standard for organisational implementations. It is a reference framework that organisations must adapt to their own needs.

A manager can reasonably expect Martenweave to provide evidence that selected data-management practices are operating.

For example:

### Governance evidence

- critical attributes have owners;
- changes have proposals and approvals;
- decisions are traceable.

### Metadata evidence

- business attributes are connected to technical fields;
- mappings and dependencies are searchable;
- definitions have stable identifiers.

### Quality evidence

- model references pass deterministic validation;
- actual datasets are checked against expectations;
- unresolved gaps are visible.

### Change-control evidence

- proposed changes show affected objects;
- approved and proposed states remain separate;
- model versions can be compared.

### Reuse evidence

- later migration waves inherit an explicit baseline;
- local deviations are visible;
- defects can become reusable validation rules.

This makes governance measurable at the point of delivery.

## A practical adoption model

An organisation should not begin by modelling every DAMA knowledge area.

It should begin with one expensive operational problem.

For example:

> Material mappings and warehouse rules repeatedly diverge across SAP rollout waves.

Then apply a small set of DAMA-aligned controls.

### Step 1: define governance scope

Identify the object, accountable owner and approval route.

### Step 2: build the canonical model

Register the attributes, fields, mappings, rules and datasets.

### Step 3: connect metadata and evidence

Attach decisions, specifications and relevant tickets.

### Step 4: validate

Check references and compare a real dataset with model expectations.

### Step 5: assess change impact

Test one proposed mapping or rule change.

### Step 6: measure the result

Track:

- investigation time;
- repeated defects;
- missing dataset fields;
- approval traceability;
- reuse in the next wave.

This is a more credible DAMA implementation than beginning with a large governance portal and hoping projects will eventually use it.

## Why this matters for AI

The intersection becomes more important as organisations introduce AI into data-management work.

AI can propose:

- field mappings;
- model objects;
- data-quality rules;
- classifications;
- glossary definitions;
- impact relationships.

But AI needs boundaries.

A DAMA-style governance model establishes accountability, ownership and control principles.

Martenweave can provide the technical proposal boundary:

```text
Evidence
→ AI proposal
→ deterministic validation
→ impact analysis
→ human review
→ approved model change
```

Martenweave’s core principle is that AI should not silently mutate canonical model truth. AI creates proposals; validators check them; humans approve changes.

This is a practical example of turning governance principles into an AI-safe operating pattern.

DAMA supplies the organisational rationale.

Martenweave supplies the change mechanism.

## The management lesson

DAMA-DMBOK and Martenweave do not compete.

They operate at different levels.

DAMA-DMBOK gives the organisation a common understanding of data-management disciplines and responsibilities.

Martenweave provides a technical control for one difficult intersection of those disciplines:

- models;
- metadata;
- mappings;
- datasets;
- quality rules;
- decisions;
- ownership;
- controlled change.

The framework tells managers that data must be governed.

Martenweave helps a project prove that a specific field, mapping or rule is governed.

The framework explains why metadata matters.

Martenweave connects the metadata to the implementation.

The framework establishes data-quality principles.

Martenweave checks whether the dataset and the model agree.

The framework defines accountability.

Martenweave shows which model elements still lack it.

That is the useful relationship.

DAMA-DMBOK describes the management system.

Martenweave operates as one of its delivery controls.

The value is not in claiming complete framework coverage.

The value is in preventing good data-management principles from remaining only in policies, training materials and governance presentations.
