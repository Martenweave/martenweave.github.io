# SAP MDG Manages Master Data. Who Manages the Implementation Knowledge?

**Reviewed: 14 July 2026**

SAP Master Data Governance can manage governed records, change requests, workflows, data quality rules and the operational lifecycle of master data.

It does not automatically manage every assumption, mapping decision, unresolved question, source-data limitation and design compromise that shaped the implementation.

That distinction matters.

An SAP MDG programme can have a working system, approved workflows and a documented architecture while still depending heavily on spreadsheets, ticket histories and the memory of a few consultants. The platform may know the current value of an attribute. The project team may still struggle to explain why that attribute exists, where its definition came from, which legacy fields feed it and what will be affected if it changes.

This is the implementation-knowledge problem.

It is rarely treated as a separate workstream. It usually becomes visible late: during migration testing, a design review, a country rollout, an audit request or the handover to application support.

By then, reconstructing the reasoning is expensive.

## SAP MDG solves an important operational problem

SAP positions Master Data Governance as a central hub for master data management and governance. Its current capabilities include governed models, golden records, matching and consolidation, change-request workflows, data-quality monitoring, mass processing and auditable changes.

That is substantial scope.

An organisation may use SAP MDG to govern customers, suppliers, products, financial objects or other master-data domains. Data stewards can participate in approval workflows. Business rules can be applied and monitored. Changes can be recorded and distributed into a wider SAP and non-SAP landscape.

When implemented properly, MDG becomes part of the operational data-management architecture.

But an implementation programme produces another kind of asset alongside the system itself: the accumulated knowledge used to design and deliver it.

That knowledge includes much more than the final configuration.

It includes:

- competing definitions collected from business units;
- differences between legacy systems;
- field mappings and transformation logic;
- rejected alternatives;
- country-specific exceptions;
- unresolved ownership questions;
- source-data limitations;
- test evidence;
- migration defects;
- reasons behind validation rules;
- decisions made during workshops;
- temporary assumptions that later became permanent;
- relationships between requirements, mappings, configuration and datasets.

Some of this may eventually appear in MDG configuration. Much of it will not.

## The implementation knows more than the platform

Consider a relatively ordinary attribute such as a customer classification, tax identifier or purchasing block.

The operational system may know:

- the current value;
- the allowed values;
- who approved a change;
- when the change became active.

The implementation team may also need to know:

- which legacy columns supplied the value;
- whether different source systems used different meanings;
- which company codes or sales areas require it;
- whether blank is technically accepted but operationally unsafe;
- which value mappings were agreed for each country;
- which migration wave introduced an exception;
- which defect caused the current validation rule;
- which downstream interfaces consume the value;
- whether changing the definition affects historical loads;
- who has the authority to revisit the decision.

These are related questions, but they are not the same problem.

MDG governs the operational object. The programme still needs a controlled way to govern the knowledge surrounding the object.

Without that layer, important reasoning remains distributed across the delivery environment.

## Where the knowledge usually ends up

Most programmes already have tools for documentation and collaboration. The problem is not a complete lack of repositories.

The problem is fragmentation.

A typical implementation may use:

- Excel for source-to-target mappings;
- Jira or Azure DevOps for requirements and defects;
- Confluence or SharePoint for design documents;
- PowerPoint for governance decisions;
- email and Teams for clarifications;
- test tools for evidence;
- local files for data analysis;
- SAP configuration for the implemented result;
- consultants’ memory for the connections between them.

Each tool may be appropriate for its own purpose. Together, however, they rarely form a coherent model of the programme.

A ticket can describe a missing rule without identifying every affected attribute. A mapping workbook can show a source and target field without preserving the decision that justified the transformation. A design document can describe the target model without reflecting later migration exceptions. Test evidence may prove that a scenario worked without showing which part of the model it actually covered.

The missing element is not another document.

It is a reliable set of relationships between the documents, data, model objects, rules, decisions and changes.

## This becomes a delivery risk

Implementation knowledge may sound like a documentation concern. In practice, it affects schedule, cost and quality.

### Changes take longer to analyse

A field change that appears small may affect mappings, value lists, datasets, validations, interfaces, reports and country variants.

When those relationships are not explicit, impact analysis becomes a search exercise. Architects organise meetings. Consultants inspect old workbooks. Teams ask who remembers the original decision.

The technical change may require a day. Establishing what the change means may require a week.

### Gaps are discovered during testing instead of design

A model can appear complete when viewed as a list of attributes.

The gaps often sit between artefacts:

- the model expects a field that the source dataset does not contain;
- the mapping exists, but the transformation rule is unresolved;
- a country requirement was recorded in a ticket but never added to the model;
- an MDG validation exists, but the migration team has no corresponding data-quality check;
- a value list is approved, but the legacy values have not been mapped.

These are not isolated documentation errors. They produce failed loads, manual corrections and late design changes.

### The programme becomes dependent on individuals

The person who understands why a mapping works may not be the person who configured MDG.

The architect who approved an exception may leave before cutover.

A migration consultant may maintain a local workbook that no one else can interpret confidently.

As long as those people remain available, the programme may appear controlled. Their absence exposes the actual operating model.

### Handover transfers files instead of understanding

A typical handover package can contain hundreds of documents and still leave the AMS team unable to answer basic questions:

- Why does this rule exist?
- Which source requirement created it?
- Is the behaviour global or country-specific?
- Which mappings depend on it?
- Which tests prove it works?
- What should be reviewed before changing it?

Document volume should not be confused with knowledge continuity.

## Who should manage implementation knowledge?

The obvious answer is “the project team.” That is not sufficient.

When ownership is shared across everyone, it is usually enforced by no one.

The responsibility sits between several roles:

- the solution architect owns the coherence of the design;
- the data architect owns model structure and semantics;
- the migration lead owns source-to-target readiness;
- the MDG lead owns platform design and configuration;
- business owners approve definitions and policies;
- data stewards own operational governance;
- testing teams produce evidence;
- project management tracks scope, risks and decisions;
- AMS eventually inherits the result.

None of these roles alone has the complete picture.

The practical answer is therefore not to appoint one person as the keeper of every detail. It is to establish a model-control approach in which the relevant artefacts can be connected and validated.

Ownership remains distributed. The model of the work becomes shared.

## What the control layer should contain

A useful implementation-knowledge layer does not need to reproduce the entire MDG system.

It should capture the parts of the programme that must remain explainable.

At minimum, that means:

### Stable model objects

Domains, entities, attributes, relationships, source fields, target endpoints, rules, value lists and mappings need stable identifiers.

Names alone are not enough. Names change, repeat and become ambiguous.

A stable identifier allows a ticket, test case, dataset gap or decision to refer to the same model object even when the label evolves.

### Explicit context

The same business attribute may behave differently by company code, sales area, purchasing organisation, country or business process.

The context should be part of the model, not buried in a comment column.

Without explicit context, teams create apparently duplicate rules that are actually different requirements—or combine requirements that should remain separate.

### Decisions and evidence

A model should show not only the approved result but also the relevant reason and supporting evidence.

That does not mean preserving every meeting transcript. It means retaining the decisions that another architect or support team would need to understand or safely change the model.

### Dataset relationships

The target model and the actual source data should be compared continuously.

A model that is internally consistent can still be impossible to populate from the available datasets.

Dataset profiling and model-gap detection expose this mismatch before it becomes a load defect.

### Change impact

Before a mapping, attribute or rule is changed, the team should be able to identify affected objects.

Impact analysis does not eliminate architectural judgement. It gives the architect a defensible starting point.

### Controlled proposals

Changes should move through a reviewable process.

This becomes especially important when AI is used to extract information from tickets, propose mappings or draft model updates. AI can accelerate analysis, but it should not silently rewrite the approved model.

## Where Martenweave fits

Martenweave is designed for this control layer.

It turns information from spreadsheets, datasets, tickets, validation reports, decisions and SAP context into structured model objects. These objects can be validated, searched, traced, reviewed and exported.

For SAP migration and MDG programmes, that means the team can represent:

- source and target fields;
- business attributes;
- organisational context;
- mappings and transformations;
- value lists and translations;
- validation rules;
- ownership;
- issues and decisions;
- change requests;
- datasets and detected gaps;
- relationships used for lineage and impact analysis.

The current Martenweave approach uses canonical model files as the source of truth, deterministic validation before indexing, generated search and SQLite indexes, dataset profiling, gap detection, impact analysis and human-reviewed patch proposals.

This is intentionally narrower than SAP MDG.

Martenweave does not create or distribute operational golden records. It does not replace stewardship workflows, mass processing or central master-data maintenance. The project documentation explicitly positions it beside SAP MDG and enterprise tools rather than as their replacement.

The two layers have different responsibilities:

| SAP MDG | Martenweave |
|---|---|
| Governs operational master data | Governs implementation model knowledge |
| Runs change-request workflows | Connects design, mapping, evidence and impact |
| Creates and maintains governed records | Maintains a validated specification of the model |
| Supports stewardship and data quality | Detects model and dataset gaps |
| Records operational changes | Preserves design and delivery reasoning |
| Distributes or integrates master data | Prepares reviewable changes and implementation context |

The boundary will vary by organisation. The principle is more important than the exact tool split.

The operational platform should not be forced to become the complete memory of the implementation. The project repository should not pretend to be an operational MDM system.

## How this works across the programme lifecycle

### Discovery

The team collects existing models, source datasets, mapping workbooks, business definitions and unresolved questions.

Instead of treating discovery as a document-production phase, the programme begins building structured model objects.

Conflicts become visible early:

- two definitions for the same attribute;
- multiple owners;
- different country requirements;
- missing relationships;
- unsupported source fields;
- unclear transformation logic.

### Design

Architects define the target domains, entities, attributes, relationships and rules.

Business definitions can be separated from physical SAP fields while still being connected to them.

Decisions are attached to the affected objects rather than stored only in meeting notes.

### Build

As MDG configuration progresses, the team can compare implementation scope with the approved model.

Unimplemented rules and attributes remain visible. Changes can be assessed against related mappings, datasets and decisions.

### Migration

Source datasets are profiled and compared with expected model endpoints.

Martenweave’s SAP migration scenario is designed to link legacy columns to SAP field endpoints, validate context, detect dataset gaps and trace relationships through mappings and attributes.

This is where the model stops being a static design artefact and becomes a practical readiness control.

### Testing

Tests and defects can be connected back to the model objects they cover.

The programme can distinguish between:

- a workflow that has been tested;
- an attribute that has been tested;
- a rule that has been tested;
- a country scenario that has been tested;
- a mapping that has been tested with representative data.

This gives managers a more useful view than a single overall test-completion percentage.

### Handover

The AMS team receives more than a document archive.

It receives a navigable model showing fields, rules, ownership, decisions, mappings, dependencies and change history.

That does not remove the need for training or proper operational documentation. It reduces the amount of knowledge that has to be reconstructed after the project team leaves.

## What this changes for managers

The value is not primarily “better documentation.”

The value is more controlled delivery.

A programme manager should expect the approach to improve several practical questions:

- Can we prove why a critical rule exists?
- Can we see which mappings are still unresolved?
- Can we compare the model with the actual migration dataset?
- Can we identify what a proposed change will affect?
- Can we separate approved design from assumptions?
- Can we show which model areas have test evidence?
- Can a new architect understand the model without interviewing the original team?
- Can AMS assess a change without reopening the implementation project?

None of these guarantees a successful programme. They reduce avoidable uncertainty.

## A small example

Suppose a global Business Partner programme introduces a harmonised customer-group attribute.

The initial design looks straightforward. One global value list will replace several local classifications.

During discovery, the team finds that:

- one country uses the field for pricing;
- another uses it only for reporting;
- one legacy system stores two separate classifications;
- several records have no value;
- an interface still expects the old local code;
- the migration workbook contains a temporary mapping agreed six months earlier;
- the MDG design document describes only the global definition.

Without a connected model, these facts remain separate.

A controlled model would connect:

- the business attribute;
- each local usage;
- the SAP target field;
- the legacy source fields;
- the transformation and value mappings;
- the affected interface;
- the decision approving the global definition;
- the exception for the pricing country;
- the dataset gap for missing values;
- the tests covering each scenario.

The complexity already exists. The model does not create it.

The model makes it visible early enough to manage.

## What Martenweave does not solve

A model-control layer should not become another oversized platform initiative.

Martenweave will not compensate for:

- missing business ownership;
- a weak governance operating model;
- unqualified architecture decisions;
- poor source-data remediation;
- unclear programme accountability;
- insufficient MDG expertise;
- inadequate testing;
- political disagreement between business units.

It can expose these problems and preserve their consequences. It cannot resolve organisational conflict by itself.

It also should not be used to duplicate every detail already governed reliably elsewhere. The objective is not to copy Jira, SAP MDG, a test tool and a data catalogue into one repository.

The objective is to preserve the relationships required to understand and control the model.

## Questions to ask on an SAP MDG programme

Managers and architects do not need to begin by selecting another tool. They can begin with a few direct questions:

1. Where is the approved model stored?
2. Can it be validated automatically?
3. How are business attributes linked to SAP fields?
4. How are mappings linked to source datasets?
5. Where are country-specific exceptions represented?
6. Can we identify model objects without relying on names?
7. Where are design decisions and their evidence recorded?
8. Can we trace a defect back to the affected rule or mapping?
9. Can we see what will be affected before approving a change?
10. Can the AMS team answer these questions after the project team leaves?

If the answers depend on several people manually reconciling several tools, the programme has an implementation-knowledge risk.

## The practical conclusion

SAP MDG can become the operational governance system for critical master data.

It should not be expected to serve as the complete record of how the programme discovered, debated, mapped, tested and justified the model.

That knowledge needs its own disciplined treatment.

For some organisations, a well-maintained set of repositories and strict delivery standards may be enough. For others, especially multi-country migrations and complex MDM programmes, a validated model registry provides a clearer control point.

Martenweave was created for that role: not to compete with SAP MDG, but to help architects and delivery teams design it more carefully, connect it to migration reality, control changes and preserve the knowledge needed to operate it later.

The question is therefore not whether SAP MDG manages master data.

It does.

The question is whether the programme can still explain its own model when the original project team is no longer in the room.

## About the authors

Martenweave is developed by Metalhatscats, an independent engineering team working on practical model governance, SAP migration, MDM and agent-assisted enterprise workflows.

The team’s focus is straightforward: make complex model knowledge easier to validate, trace, review and hand over without turning every problem into another large platform implementation.

## Sources and notes

This article was reviewed on 14 July 2026.

- SAP Master Data Governance product overview and current capability description: golden records, matching and consolidation, workflows, data quality, audit trails and mass processing.
- Martenweave product model and intended users.
- Martenweave product boundaries and complementary relationship with SAP MDG.
- Martenweave SAP migration scenario, including mappings, context validation, dataset gap detection, lineage and impact analysis.

SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates. Martenweave is an independent project and is not affiliated with or endorsed by SAP.
