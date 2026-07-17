# How SAP Data Migration and MDG Implementation Should Work Together

**Reviewed: 14 July 2026**

SAP data migration and SAP Master Data Governance are often organised as separate workstreams.

One team designs the governed target model, workflows and validation rules. Another team extracts legacy data, builds mappings, cleans records and prepares migration loads.

On a programme plan, this separation looks reasonable. The teams have different specialists, tools, milestones and technical responsibilities.

In practice, they are working on two sides of the same model.

The MDG team defines how master data should be governed in the target landscape. The migration team determines whether the existing data can be transformed into that target model without losing meaning, violating rules or creating operational problems.

When these teams work independently, the differences eventually appear during testing.

The target model expects attributes the source systems cannot supply. The migration workbook contains transformations that were never discussed with the MDG architects. Validation rules reject records that previously passed migration checks. Local exceptions are implemented in one workstream but unknown to the other.

These are not unusual edge cases. They are the predictable result of separating target design from migration reality.

We believe the two workstreams need distinct responsibilities, but they must share one controlled model of the domain.

## MDG and migration solve different problems

SAP Master Data Governance provides a central governance layer for business-critical master data. SAP describes capabilities including governed models, golden records, profiling, matching, consolidation, workflow-based change requests, data-quality monitoring, mass processing and auditable changes.

Data migration has a different purpose.

Its job is to move selected data from the existing landscape into the target environment while applying the agreed rules for:

- extraction;
- filtering;
- transformation;
- harmonisation;
- validation;
- key mapping;
- error handling;
- reconciliation;
- loading.

MDG is concerned with how master data will be governed and maintained.

Migration is concerned with how the organisation reaches the initial governed state.

The distinction is useful, but it should not become an organisational wall.

A migration cannot be designed reliably without the governed target model. An MDG model cannot be considered ready until it has been tested against the data that must populate it.

## The two teams usually begin from opposite directions

The MDG team often starts with the target.

It asks:

- What should the global model contain?
- Which attributes should be governed?
- Which workflows are required?
- Which validations should prevent bad data?
- Which roles should approve changes?
- How should trusted records be distributed?

The migration team starts with the sources.

It asks:

- Which systems contain the data?
- Which fields are actually populated?
- Which values are inconsistent?
- Which records should be migrated?
- How will legacy identifiers be handled?
- Which transformations are necessary?
- Which defects can be corrected before cutover?

Both views are valid.

The risk appears when one side assumes that the other will resolve the difference.

The MDG team may define a mandatory target field and assume migration will provide it.

The migration team may default the value and assume the business accepts the rule.

The business may approve the target model without seeing the effect on legacy data.

Testing then becomes the first place where the assumptions meet.

## Migration is an early test of the target model

A target model may be logically consistent and still be difficult to populate.

For example, the target design may require:

- a global customer classification;
- a standard supplier category;
- a harmonised product hierarchy;
- a mandatory tax identifier;
- a single country code convention;
- explicit organisational assignments.

The source landscape may contain:

- several incompatible classifications;
- blank or unreliable values;
- fields used differently by each country;
- relationships stored outside the main system;
- classifications maintained only in free text;
- values that cannot be converted without a business decision.

This does not automatically mean the target model is wrong.

It means the programme must choose how to close the difference.

Possible responses include:

- correct the data in the source system;
- derive the value using an approved rule;
- enrich the data before migration;
- introduce a controlled default;
- allow a temporary exception;
- change the target requirement;
- exclude records from the migration;
- accept remediation after go-live.

Each option has a different owner, cost and risk.

We therefore treat migration analysis as part of model validation, not merely as a downstream technical activity.

SAP itself recommends curating master data early, before an SAP S/4HANA implementation, because more automated target processes depend on clean and correct master data.

## The target model must be more than a field list

Migration teams often receive a target template containing physical fields and technical descriptions.

That is not always enough to build a reliable mapping.

For each important target attribute, the team also needs to understand:

- its business meaning;
- the context in which it applies;
- whether it is global or local;
- when it is mandatory;
- which values are permitted;
- whether derivation is allowed;
- who owns the definition;
- which processes consume it;
- which validation rules apply;
- whether it participates in matching or duplicate detection.

Consider a field called “Customer Group.”

The migration team can locate an SAP target field. That does not answer:

- Is this the same business classification in every sales area?
- Can countries maintain different values?
- Is it required for all customers?
- Does pricing depend on it?
- Can it be derived from a legacy segment?
- What should happen when the legacy value is blank?
- Which team approves the value mapping?

Without this context, the mapping may be technically correct and operationally wrong.

## The migration mapping must be visible to the MDG team

The opposite problem is equally common.

Migration mappings contain decisions that affect the governed model:

- one source field feeds several target attributes;
- several legacy fields are combined;
- invalid values are replaced;
- default values are introduced;
- country codes are translated;
- relationships are reconstructed;
- duplicate records are merged;
- records are excluded;
- identifiers are changed.

These are not merely technical ETL instructions.

They shape the initial state of the governed data.

The MDG team should know where migration introduces values, removes distinctions or creates exceptions. Otherwise, the platform may begin operating with data that follows rules not represented in the governance design.

A default value is a simple example.

The target field is mandatory. The legacy system does not contain reliable data. The migration team introduces a default so the load can proceed.

The immediate technical issue is solved.

But the programme still needs to decide:

- Is the default a valid business value?
- Should it trigger remediation?
- Can new records use the same value after go-live?
- Should MDG reject it in normal maintenance?
- Who owns records migrated with the default?
- How will the exception be reported?

If these questions remain inside the migration workbook, the operational governance model begins with an undocumented compromise.

## One model does not mean one tool

When we say that MDG and migration should share one model, we do not mean that both teams must perform all work in the same application.

The teams will continue to use specialised tools:

- SAP MDG configuration and workflows;
- migration tooling;
- data-profiling tools;
- spreadsheets;
- test-management systems;
- Jira or Azure DevOps;
- integration platforms;
- documentation repositories.

The shared model is the controlled set of relationships between their work.

It should connect:

```text id="aojfc2"
Business definition
        ↓
Governed attribute
        ↓
SAP target field and context
        ↓
Source field
        ↓
Transformation and value mapping
        ↓
Dataset evidence
        ↓
Validation and test result
        ↓
Decision and approved change
```

The information may originate in several tools. The programme still needs a reliable way to know that these artefacts refer to the same object.

## Where the responsibilities should sit

We find it useful to define ownership at the level of decisions rather than entire documents.

### The MDG architecture team should own

- the governed business model;
- domain and entity boundaries;
- target attributes and relationships;
- organisational contexts;
- operational validations;
- workflow design;
- stewardship roles;
- matching and consolidation principles;
- distribution and integration architecture;
- long-term change governance.

### The migration team should own

- source-system analysis;
- data extraction;
- source-field profiling;
- source-to-target mappings;
- migration transformations;
- initial-load filtering;
- value conversion;
- load execution;
- reconciliation;
- migration error handling.

### Business owners should own

- business definitions;
- acceptable values;
- global and local distinctions;
- remediation priorities;
- exceptions;
- approval of transformations that change meaning;
- acceptance of migrated data.

### Both workstreams should jointly own

- target-field readiness;
- mandatory-field strategy;
- identifier strategy;
- duplicate handling;
- value mappings;
- data-quality thresholds;
- migration-specific defaults;
- model changes caused by source limitations;
- cutover readiness;
- handover of unresolved data issues.

This shared area is where programmes need the most explicit control.

## A practical joint operating model

We recommend building the collaboration around several recurring controls.

## 1. A shared domain inventory

Both teams should begin with the same list of:

- business entities;
- attributes;
- relationships;
- organisational contexts;
- source systems;
- target endpoints;
- critical code lists.

The inventory does not need to contain every field at the beginning.

It should establish the object boundaries and stable identifiers that both workstreams use.

Without this, the MDG and migration teams can discuss the same concept under different names—or different concepts under the same name.

## 2. A target-model readiness review

Before detailed mapping begins, the target model should be reviewed from a migration perspective.

For each critical attribute, ask:

- Is the definition clear?
- Is the target context explicit?
- Is it mandatory?
- Is the source available?
- Is the source value reliable?
- Is transformation required?
- Is enrichment required?
- Are value mappings available?
- Is a business decision still open?
- Can the rule be tested with representative data?

This review often finds that the target model is not yet ready for mapping, even if the technical field list is available.

That is useful information.

It is cheaper to clarify the model before hundreds of mapping rows and transformation routines depend on it.

## 3. Continuous dataset profiling

Data profiling should not happen once at the start of migration.

Source extracts change. New countries join. Filtering rules evolve. Legacy systems are cleaned. Target requirements are updated.

The programme should compare representative datasets with the approved model throughout delivery.

Useful checks include:

- expected columns missing from the extract;
- unexpected columns;
- blank rates;
- distinct values;
- invalid reference values;
- format variation;
- relationship coverage;
- duplicate candidates;
- context-specific completeness;
- value-list coverage.

A mapping marked complete should not remain complete if the current dataset no longer supports it.

## 4. A controlled gap register

Not every gap is the same.

We recommend separating at least five types.

### Model gap

The target model is missing an attribute, relationship, context or rule.

### Source-data gap

The target requires information that is not present or reliable in the source.

### Mapping gap

The source and target exist, but the transformation is unresolved.

### Value gap

The field mapping exists, but source codes cannot be translated completely.

### Governance gap

The technical solution is possible, but ownership or business approval is missing.

A single “Open” status hides these differences.

Each type requires different people and a different resolution path.

## 5. Joint change impact analysis

A target-model change should automatically trigger migration questions.

If an attribute becomes mandatory:

- Which source systems can provide it?
- Which datasets are affected?
- Which mappings need updates?
- Which countries have missing values?
- Which transformation rules must change?
- Which tests must be repeated?

A migration change should also trigger MDG questions.

If several legacy values are consolidated:

- Does the governed value list reflect the decision?
- Does matching logic depend on the old distinction?
- Will stewards understand the migrated result?
- Should post-go-live validation permit the converted values?
- Are downstream systems affected?

The two workstreams should not approve significant changes independently.

## 6. Shared evidence for readiness

The MDG team may report model completion.

The migration team may report mapping completion.

The testing team may report execution progress.

Management needs a combined view.

For a domain to be ready, the programme should be able to show:

- the model is approved;
- required attributes have owners;
- mappings exist;
- transformations are agreed;
- value mappings cover the source values;
- representative datasets have been profiled;
- critical gaps are resolved or accepted;
- validation rules are implemented;
- test evidence exists;
- unresolved exceptions have owners;
- cutover and post-go-live treatment is defined.

Readiness is not the average of several percentages.

It is evidence that the model, data and operating process can work together.

## Common failure patterns

## The MDG model is designed without source-data evidence

The team creates a clean global model based on workshops and reference designs.

Migration later finds that several mandatory attributes are unavailable or mean something different across systems.

The programme then either changes the model late or introduces migration exceptions that weaken it.

A better approach is to profile representative data during model design.

## Migration uses its own target model

The migration workbook evolves faster than the MDG documentation.

New fields, transformations and country exceptions are added to support loading.

The configured MDG model and migration model gradually diverge.

The issue becomes visible when a load fails or a steward cannot maintain a migrated value after go-live.

A better approach is to use stable shared identifiers and review every material mapping change against the governed model.

## Validation logic is duplicated inconsistently

One rule exists in the migration transformation. Another version exists in MDG. A third appears in an interface.

The conditions and error behaviour differ.

The programme needs one business rule definition, even if the rule is implemented in several technical layers.

Each implementation should refer back to that definition and explain its purpose.

## Migration defaults become permanent business values

A temporary default is introduced to unblock testing.

The exception is never formally reviewed.

After go-live, thousands of records contain a value that appears valid but has no useful business meaning.

Defaults should have:

- an owner;
- a rationale;
- an expiry or review condition;
- reporting;
- a remediation plan.

## Country exceptions are managed outside the global model

Local teams maintain separate mapping files.

The global MDG team sees only the standard model.

During migration, local requirements introduce additional fields, rules or code translations.

Some exceptions are legitimate. They still need to be visible as explicit variants of the governed model.

## Testing checks the load but not the governance process

Records are loaded successfully.

The programme does not confirm that:

- stewards can understand the values;
- future changes follow the intended workflow;
- migrated exceptions can be corrected;
- replication works after activation;
- operational validations behave as expected.

Migration testing and MDG testing should overlap at the point where migrated records enter their future lifecycle.

## A worked example: Business Partner tax data

Consider a Business Partner migration involving tax identifiers.

The MDG team defines:

- tax categories;
- mandatory rules by country;
- validation behaviour;
- stewardship workflow;
- approved target structure.

The migration team discovers:

- different source fields by country;
- multiple identifiers stored in one column;
- inconsistent formatting;
- invalid historical values;
- records with no identifier;
- country-specific exemptions;
- values maintained in a separate application.

Neither team can finish the design alone.

The target model determines which identifiers should exist and under which context.

The source-data analysis determines what can be migrated, derived, corrected or left unresolved.

The joint model should connect:

- the business concept;
- country context;
- target tax category;
- source fields;
- normalisation logic;
- validation rule;
- exception policy;
- data-quality results;
- unresolved records;
- test evidence;
- responsible owner.

When one of these elements changes, the team can identify the affected mappings, datasets and rules.

Without those connections, the programme manages the scenario through repeated discussions and local spreadsheets.

## Where Martenweave fits

We built Martenweave for the control layer between target design and migration delivery.

The SAP migration scenario in the current product supports explicit mappings from legacy columns to SAP field endpoints, contextual definitions, deterministic validation, dataset profiling, gap detection, lineage, impact analysis and human-reviewed change proposals.

A Martenweave model can represent:

- business attributes;
- entity contexts;
- source fields;
- SAP target endpoints;
- mappings;
- transformation notes;
- value lists;
- value mappings;
- validation rules;
- issues;
- decisions;
- change requests;
- datasets and detected gaps.

This allows the migration and MDG teams to use one set of model objects without forcing every stakeholder into the same tool.

Excel can remain a review and import format.

Jira can remain the issue-management system.

SAP MDG remains the operational governance platform.

Migration tools continue to execute extraction, transformation and loading.

Martenweave stores and validates the relationships that otherwise tend to remain distributed between them. The current core also provides generated indexes, search, reports and proposal-based model changes rather than allowing AI or automation to modify the approved model silently.

## A suggested programme rhythm

We recommend a simple recurring cycle.

### Before each design cycle

- profile representative source data;
- review new local requirements;
- update the gap register;
- identify decisions needed from business owners.

### During model design

- define or update model objects;
- confirm contexts and ownership;
- record decisions;
- assess migration feasibility.

### Before mapping approval

- compare expected fields with actual datasets;
- confirm transformation logic;
- review value coverage;
- identify unresolved gaps.

### Before build or configuration changes

- perform impact analysis;
- identify affected mappings and tests;
- approve the model change;
- update related artefacts.

### Before each mock load

- validate model references;
- check current dataset structure;
- review open source and mapping gaps;
- confirm target-model changes;
- generate a readiness report.

### After each test cycle

- connect defects to model objects;
- distinguish data, mapping, model and configuration problems;
- update decisions and rules;
- repeat affected validation.

### Before cutover

- confirm model, mapping and dataset alignment;
- review accepted exceptions;
- assign post-go-live remediation;
- prepare the AMS handover model.

This rhythm does not need to create a heavy governance process.

The goal is to ensure that the teams meet around evidence rather than around different versions of the truth.

## What management should ask

Managers do not need to review every field mapping.

They should ask whether the workstreams can answer the following questions consistently:

1. Do MDG and migration use the same approved target model?
2. Has the model been checked against representative source data?
3. Which required attributes cannot currently be populated?
4. Which mappings still depend on open business decisions?
5. Are value mappings complete for the current datasets?
6. Are migration defaults visible to the MDG team?
7. Can we distinguish model gaps from source-data gaps?
8. What will be affected by the latest model change?
9. Which areas have both migration and operational test evidence?
10. Which exceptions will remain after go-live?
11. Can AMS trace migrated values back to the relevant rule and decision?
12. Who owns unresolved remediation after cutover?

If the answers differ by workstream, the programme has an alignment problem regardless of the reported completion percentages.

## How this approach reduces time

Creating shared model control may look like additional work.

It replaces work that the programme otherwise performs repeatedly:

- reconciling different mapping versions;
- rediscovering why a rule exists;
- repeating workshops after team changes;
- manually searching for affected fields;
- explaining migration defaults during testing;
- comparing source extracts by hand;
- rebuilding handover documentation;
- correcting late model and dataset mismatches.

The largest time saving does not come from typing mappings faster.

It comes from reducing the number of times the programme has to understand the same decision.

## What this approach does not solve

A shared model cannot replace business ownership.

It cannot make unavailable source data appear.

It cannot resolve political disagreement between local and global teams.

It cannot compensate for weak MDG architecture or poor migration engineering.

It does, however, make these problems visible and connect them to the parts of the programme they affect.

That is important.

Unresolved problems can be managed. Hidden assumptions usually become defects.

## Our conclusion

SAP MDG and data migration should remain distinct delivery disciplines.

They should not maintain separate interpretations of the target model.

MDG defines how master data will be governed after go-live. Migration proves whether the existing organisation can reach that state and identifies the decisions required to do so.

We bring the two workstreams together around:

- shared model objects;
- stable identifiers;
- representative datasets;
- explicit gaps;
- traceable decisions;
- joint impact analysis;
- evidence-based readiness.

This does not eliminate complexity. It prevents complexity from being hidden until testing or cutover.

Our position is straightforward:

> The MDG model is not ready until migration has tested it against real source data. The migration mapping is not approved until it reflects the governed target model.

When both conditions are enforced, the programme moves faster because fewer decisions need to be reconstructed and fewer contradictions survive into later stages.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We work on practical model governance for SAP migration, MDM, MDG and AMS programmes. We focus on helping architects and delivery teams connect target design with source-data reality, find gaps earlier and preserve the reasoning needed to operate the model after go-live.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP describes SAP Master Data Governance as a central hub supporting governed models, golden records, profiling, matching, consolidation, workflows, data-quality monitoring, mass processing and auditability. SAP also recommends curating master data before an SAP S/4HANA implementation.

Martenweave’s SAP migration documentation describes explicit source-to-target mappings, organisational context, deterministic validation, dataset gap detection, lineage, impact analysis and reviewable AI-assisted proposals.

The current Martenweave product description documents canonical model objects, generated indexes, dataset profiling, reports and the PatchProposal-to-ChangeRequest lifecycle.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
