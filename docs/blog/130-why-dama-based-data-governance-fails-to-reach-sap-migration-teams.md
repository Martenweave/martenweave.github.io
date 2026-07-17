# Why DAMA-Based Data Governance Fails to Reach SAP Migration Teams

Many companies have a data-governance framework.

They have data owners, stewards, councils, policies, glossaries and quality principles. They may use DAMA-DMBOK as the common language for organising these responsibilities.

Then an SAP migration begins.

Within a few months, the programme is again governed through mapping spreadsheets, Jira tickets, workshop notes, validation scripts and the memory of senior consultants.

The corporate governance model continues to exist. The migration team continues to deliver. The two operate beside each other.

This is one of the most persistent problems in enterprise data management.

The organisation has defined how data should be governed, but the project cannot reliably show:

- which business definition a migration field implements;
- which owner approved it;
- which source dataset can provide it;
- which transformation is current;
- which exceptions apply;
- whether the validation rule reflects the latest decision;
- what will be affected if the field changes.

DAMA-DMBOK is not failing in this situation.

DAMA describes the disciplines, roles and practices an organisation needs. It is intentionally vendor-neutral and non-prescriptive: it does not mandate a specific tool, operating workflow or technical implementation. Organisations are expected to adapt it to their own environments.

The failure happens in the final step.

The company adopts the language of governance but does not create a delivery mechanism that connects governance decisions to the fields, mappings, datasets and rules used by the SAP programme.

The policy reaches the steering committee.

It does not reach the mapping row.

## Governance is usually designed above the project

A typical data-governance operating model defines:

- data domains;
- accountable owners;
- data stewards;
- decision rights;
- approval bodies;
- standards;
- issue-escalation processes;
- quality responsibilities.

These are necessary foundations.

DAMA places accountability, policy and decision rights at the centre of data governance. It also treats metadata, quality, architecture, integration and interoperability as core data-management capabilities.

The difficulty is that an SAP migration works at a much more detailed level.

The programme must decide whether:

- legacy field `CUST_CLASS` represents customer segment or legal category;
- material gross weight applies to the base unit or packaging unit;
- a supplier field is mandatory globally or only for one purchasing organisation;
- an empty tax number is valid for a particular Business Partner type;
- a local shipping condition should be preserved or harmonised;
- a warehouse attribute should be supplied directly or derived.

These decisions are rarely made by the data council.

They are made during design workshops, mapping sessions, defect calls and test cycles.

That is not necessarily wrong. Governance bodies should not approve every transformation rule.

But there must be a controlled connection between the programme’s detailed decisions and the organisation’s governance model.

Usually, that connection is weak.

## The governance artefact and the delivery artefact are different things

The governance organisation may maintain a business glossary containing the definition of “Customer Group.”

The migration team maintains an Excel row mapping a legacy customer classification to SAP.

The integration team maintains a middleware conversion.

The reporting team uses its own grouping logic.

The data-quality team validates an allowed code list.

All five teams may believe they are using the same concept.

They may not be.

The business glossary is a governance artefact.

The mapping row, transformation and validation are delivery artefacts.

A governance programme fails operationally when it assumes that publishing the governance artefact automatically controls the delivery artefacts.

It does not.

Someone must connect them.

The project must be able to show that:

```text
Business definition: Customer Group
    → legacy source field
    → approved source-to-target mapping
    → SAP target attribute
    → validation rule
    → interface conversion
    → reporting dependency
    → accountable owner
    → supporting decision
```

Without this chain, the glossary contains the approved words while the project implements a different reality.

## A practical example: one material attribute, six interpretations

Consider a global SAP S/4HANA and EWM programme.

The organisation has a product-data owner and established data-quality policies. The global template defines a warehouse unit of measure as an important product attribute.

The first rollout begins.

The migration team treats the field as optional because it is not mandatory for every product in the ERP load.

The EWM team expects it for warehouse-relevant products.

The packaging team believes it should be derived from packaging relationships.

A country team maintains a local source field with a similar name.

The 3PL expects another code in its product message.

The quality team checks that any supplied value belongs to an approved unit list.

Every team is following a reasonable local interpretation.

The governance framework has not prevented disagreement.

During testing, products reach EWM without the correct warehouse unit.

The defect is assigned to migration.

The migration team points to the optional status in its workbook.

The EWM team points to the warehouse design.

The packaging team explains that derivation works only for selected product groups.

The country team says its local field was never included in the global extract.

The quality team confirms that all populated unit values are valid.

The organisation has:

- ownership;
- standards;
- metadata;
- data-quality controls;
- project approval processes.

It still does not have one coherent model of the attribute.

This is the point where governance must become more than roles and policies.

## Why the business glossary is not enough

A glossary is useful when teams use different terms or lack agreed definitions.

It can establish that “Warehouse Unit of Measure” means the unit used for warehouse execution rather than the base unit used for inventory valuation.

That removes one ambiguity.

It does not answer:

- Which source field provides it?
- Which products require it?
- Which plants or warehouses are in scope?
- Can it be derived?
- Which packaging dataset supports the derivation?
- Which SAP field receives it?
- Which external message carries it?
- Which exception applies locally?
- Which validation tests the condition?
- Which change request introduced the current rule?

The glossary defines the concept.

The project still needs a controlled implementation model.

Trying to put all implementation detail into the glossary is also a mistake. The glossary becomes overloaded, difficult to maintain and too technical for its original purpose.

The better architecture connects the glossary term to the project model without making either system responsible for everything.

## Why ownership matrices do not create field-level accountability

A governance organisation may assign a Product Data Owner.

That is better than having no owner.

But a domain can contain hundreds or thousands of attributes, rules and mappings.

The owner cannot personally review every issue.

Projects therefore rely on delegated experts, local stewards and functional leads.

This creates several questions:

- Who can approve the global definition?
- Who can approve a local exception?
- Who confirms the source-system meaning?
- Who accepts a temporary migration workaround?
- Who reviews downstream impact?
- Who decides whether a failed quality check reflects bad data or a bad rule?

A RACI spreadsheet rarely captures these distinctions at the level required by delivery.

It may state that Product Management is accountable for product data.

It does not show which person must review a proposed change to warehouse-unit derivation for one product group.

The result is familiar: the migration lead asks several people for approval and records the final answer in a ticket.

The governance framework exists, but the approval path is reconstructed manually for each issue.

A stronger model connects ownership to the relevant object, attribute, rule or decision.

The project can then determine who must review a specific change rather than asking the entire governance structure to participate.

## Why data-quality governance often arrives too late

Data quality is usually the DAMA discipline that reaches SAP projects most visibly.

Projects define completeness, validity, consistency and uniqueness checks. They create dashboards and track failed records.

This is useful, but it often starts after the model has already been defined.

The quality team receives a rule such as:

> Shipping condition is mandatory.

It implements the check.

Later, the project discovers that the field is mandatory only for customers with particular sales-area data and that local-pickup customers are exempt.

The quality tool did not fail.

The model supplied to the quality team was incomplete.

This exposes an important boundary:

- data-quality execution checks records against rules;
- model governance checks whether those rules are correctly defined and connected.

A DAMA-aligned programme needs both.

Otherwise, the organisation can create sophisticated quality monitoring around an obsolete or oversimplified rule.

## Why governance meetings do not solve model drift

A programme may respond to inconsistency by adding governance checkpoints.

Mappings are reviewed monthly.

Data owners attend quality meetings.

Critical changes are escalated.

This can reduce some risks.

It also creates a large coordination burden.

Senior specialists spend time reviewing long lists because the project cannot determine which changes actually affect their domain.

Meetings become a substitute for impact analysis.

A field change is presented to ten people because nobody knows which three are relevant.

The group discusses the issue.

The decision is recorded.

The project then relies on each workstream to update its own artefacts.

The meeting may approve the correct rule while the model continues to drift.

Governance should not be measured by the number of people invited or approvals collected.

It should be measured by whether the approved decision reaches every affected mapping, validation, dataset and interface.

## Why SAP programmes are especially difficult

SAP master data is distributed across domains and organisational levels.

A Business Partner can include:

- general data;
- addresses;
- tax numbers;
- bank details;
- customer roles;
- supplier roles;
- company-code data;
- sales-area data;
- purchasing-organisation data;
- partner relationships.

A product can include:

- basic data;
- units of measure;
- plant data;
- sales data;
- purchasing data;
- accounting data;
- classification;
- warehouse attributes;
- transportation attributes.

Governance ownership does not always follow these technical boundaries.

A global owner may define the business concept.

A local team may own the source data.

An SAP functional team may understand the target rule.

An integration team may maintain the external representation.

A migration team may implement the transformation.

An AMS team may later diagnose operational failures.

The data travels across organisational boundaries before it travels across systems.

This makes field-level traceability essential.

## Where existing tools stop

Most SAP programmes already use several relevant tools.

The problem is not the absence of tooling. It is the boundary between tools.

### SAP MDG

SAP MDG can govern productive master records, validations, workflows and change requests.

It does not automatically govern every legacy source field, temporary migration mapping, dataset expectation or external project decision.

### Data catalog

A catalog can identify technical assets, ownership and lineage.

It may not contain the future-state SAP model, proposed mappings, local rollout exceptions or temporary migration logic.

### Data-quality platform

A quality tool can execute checks over datasets.

It normally assumes that someone has already defined the correct field, population and rule.

### Jira

Jira can preserve discussion, approval and implementation work.

It does not automatically update the model elements affected by the decision.

### Confluence or SharePoint

These systems store designs, meeting notes and workbooks.

They do not usually validate whether the documents still agree.

### Excel

Excel remains effective for reviewing mappings with business users.

It becomes unreliable when it is also expected to manage stable identity, references, evidence, dependencies and change impact.

Each tool solves a valid problem.

None necessarily owns the connected delivery model.

## The missing control: a governed model between policy and execution

This is the role Martenweave is designed to fill.

It does not implement DAMA-DMBOK as a complete software suite.

It does not replace the governance organisation.

It does not become SAP MDG, a data catalog, a quality platform or a migration engine.

It maintains the model that connects their relevant outputs.

Martenweave can represent:

- domains;
- entities;
- attributes;
- source and target fields;
- datasets;
- mappings;
- rules;
- relationships;
- ownership;
- evidence;
- decisions;
- proposed changes.

Canonical files remain the source of truth. Generated SQLite and search indexes can be rebuilt. References are validated before indexing, and AI-assisted modifications remain proposals until reviewed by people.

That creates a practical bridge:

```text
DAMA principles and governance roles
                ↓
owners, definitions, policies and decisions
                ↓
       Martenweave model layer
                ↓
mappings, validations, datasets and impact
                ↓
SAP migration, MDG, integration and testing
```

The framework defines the management intent.

Martenweave connects it to delivery objects that can be checked.

## How the operating model changes

Without a model layer, a change often follows this path:

1. A defect is found.
2. A meeting is organised.
3. A decision is made.
4. A Jira ticket is closed.
5. Teams update their own files.
6. Another workstream continues using the old rule.
7. The defect returns in another wave.

With a governed model layer, the workflow becomes:

1. New evidence is registered.
2. A model change is proposed.
3. The proposal identifies the attribute, mapping or rule affected.
4. Structural validation checks the references.
5. Impact analysis identifies connected datasets, validations and interfaces.
6. The accountable owners review the change.
7. The approved model is updated.
8. Execution artefacts are aligned with the new model.
9. Git records the reviewed change.

Martenweave’s intended pipeline is explicitly proposal-first: evidence leads to a proposal, validation, gap and impact analysis, human review, and then a GitHub issue or pull request.

The important improvement is not another approval.

It is that the approval is attached to a defined model change with visible consequences.

## The warehouse-unit example revisited

Return to the warehouse-unit problem.

In Martenweave, the programme can register:

### Business attribute

`Warehouse Unit of Measure`

### Definition

The unit used for warehouse execution and handling.

### Applicability

Required for warehouse-relevant products in defined plants or warehouse numbers.

### Sources

- legacy warehouse-unit field;
- packaging dataset;
- local product extract.

### Target representations

- SAP product attribute;
- EWM product representation;
- 3PL product-message field.

### Rules

- direct mapping where the legacy field is trusted;
- derivation from packaging where approved;
- no derivation for unsupported product groups;
- explicit exception for one local process.

### Ownership

- global product-data owner;
- warehouse-process approver;
- local source steward.

### Evidence

- design decision;
- interface specification;
- test result;
- approved exception.

Now the project can run several forms of control.

It can detect that a mapping references a missing source field.

It can compare the actual source extract with the expected fields.

It can show that the derivation rule affects EWM and the 3PL interface.

It can identify that the local exception lacks global approval.

It can generate a proposal rather than silently changing the canonical definition.

The DAMA principles have not changed.

They have become connected to an operational object.

## This is not “DAMA compliance”

Martenweave should not claim that using the tool makes an organisation DAMA-compliant.

DAMA-DMBOK is not a legally binding compliance framework or a prescriptive technical standard. It supplies generally accepted principles and practices that organisations adapt to their own needs.

A company can use Martenweave poorly.

It can assign owners who never review anything.

It can create model objects with weak definitions.

It can ignore validation failures.

It can allow the canonical model to become stale.

It can collect evidence without making decisions.

Technology cannot create governance maturity on its own.

The credible claim is narrower:

> Martenweave can provide implementation evidence for selected DAMA-aligned practices within migration and model-change workflows.

For example, it can show that:

- important attributes have owners;
- mappings connect defined source and target fields;
- datasets are checked against model expectations;
- decisions are linked to affected objects;
- proposed changes pass validation and impact review;
- approved and proposed states remain separate;
- model history is versioned.

That is useful evidence of operating governance.

It is not a certificate of organisational maturity.

## Where Martenweave aligns strongly with DAMA

The strongest overlap is in five areas.

### Data governance

Martenweave records ownership, approval state, decisions and controlled proposals.

It does not define the organisation’s decision rights, but it makes them actionable at model level.

### Metadata management

It connects business concepts, technical fields, mappings, rules, evidence and dependencies.

It does not replace enterprise-wide metadata discovery.

### Data modelling and design

It gives model elements stable identity and validates their relationships.

It does not replace every conceptual or enterprise-modelling method.

### Data quality

It checks model consistency and compares real datasets with expected fields and mappings.

It does not replace industrial-scale cleansing or observability.

### Integration and interoperability

It records how the same concept is represented across SAP, legacy systems, warehouses and external providers.

It does not execute runtime integrations.

This limited alignment is more credible than claiming coverage of the entire DAMA wheel.

## Where Martenweave should remain outside

Several DAMA knowledge areas should remain primarily outside Martenweave:

- data security enforcement;
- privacy operations;
- database administration;
- enterprise architecture management;
- data warehousing and analytics;
- document lifecycle management;
- productive master-data stewardship;
- organisation-wide compliance management.

Martenweave may reference evidence from these areas.

A field may carry a security classification.

A decision may cite a privacy requirement.

A model may reference an MDM object.

That does not make Martenweave the operating platform for those disciplines.

A focused tool is more useful than a weak imitation of an enterprise governance suite.

## Why this matters economically

Governance initiatives are often criticised as overhead because their effect is difficult to connect to project delivery.

The programme pays for:

- governance roles;
- glossary implementation;
- policy creation;
- workshops;
- stewardship processes.

Migration teams may still repeat the same mapping analysis and defects.

This creates a legitimate management question:

> What delivery cost is the governance model actually reducing?

A model layer makes the answer more measurable.

The programme can track:

- time required to find an owner;
- time required to trace an old decision;
- mapping changes implemented without full impact review;
- repeated defects across rollout waves;
- dataset gaps found before test loads;
- local exceptions lacking approval;
- manual effort used to reconcile mappings and validations.

If these measures improve, governance is reaching delivery.

If they do not, the programme may have created additional roles without changing how the model is controlled.

## A practical adoption path

The company should not begin by attempting to encode the entire DAMA framework.

Start with one painful migration area.

For example:

> Supplier mappings and country-specific rules repeatedly diverge across rollout waves.

Then implement only the controls needed for that problem.

### Define the governed scope

Identify:

- supplier objects;
- critical attributes;
- responsible owners;
- source systems;
- target representations;
- affected countries.

### Import the current model

Bring in:

- mapping workbooks;
- dataset structures;
- validation rules;
- relevant decisions;
- known exceptions.

Do not hide contradictions during import.

Represent them as gaps.

### Establish stable identity

Give important attributes, fields, mappings and rules stable IDs.

This allows relationships to survive naming changes.

### Validate the model

Check:

- missing references;
- duplicate identifiers;
- undefined fields;
- absent ownership;
- incomplete mappings;
- conflicting active definitions.

### Test a real dataset

Compare an actual supplier extract with the approved expectations.

This proves whether the model can influence delivery rather than remaining a documentation exercise.

### Process one change

Take a real proposed mapping or rule change through:

- evidence;
- proposal;
- validation;
- impact analysis;
- review;
- approval.

### Measure the result

Compare the time and people required with the previous process.

Expand only when the control demonstrably reduces uncertainty or repeated work.

## Questions managers should ask

A manager does not need to inspect every mapping.

They should ask whether governance reaches the implementation.

### Can we trace a critical field from definition to execution?

The answer should include the business concept, source, mapping, target, rule and owner.

### Can we distinguish approved rules from assumptions?

A comment marked “TBD” should not quietly become transformation logic.

### Does the latest dataset satisfy the approved model?

Not merely whether the file is complete, but whether it contains the fields and context required by the model.

### Does a decision update every affected artefact?

The project should show which mappings, validations and interfaces require alignment.

### Can local deviations be separated from the global baseline?

Otherwise, every rollout gradually creates its own governance model.

### Do AI-generated changes remain proposals?

AI can accelerate modelling, but it should not silently redefine governed data.

### Can we reproduce the readiness result?

The same model and dataset should produce the same structural assessment.

These questions test operational governance more effectively than asking how many glossary terms or policies have been published.

## The central lesson

DAMA-based data governance often fails to reach SAP migration teams because it remains organised around frameworks, roles and documents while delivery operates through fields, mappings, datasets and urgent changes.

The gap is not solved by more governance language.

It is solved by connecting governance decisions to the model elements that projects actually change.

DAMA-DMBOK explains why ownership, metadata, quality, modelling and interoperability matter. It intentionally leaves organisations to choose how those principles should be implemented.

Martenweave provides one possible implementation for a narrow, high-friction part of that problem.

It does not replace DAMA.

It does not replace governance leadership.

It does not replace SAP MDG, migration tooling, catalogs or quality platforms.

It creates a controlled bridge between them.

The owner becomes connected to the attribute.

The decision becomes connected to the mapping.

The rule becomes connected to the dataset.

The change becomes connected to its impact.

That is the point where governance stops being a presentation about how data should be managed and starts influencing how an SAP programme actually works.
