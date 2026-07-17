# Data Model Registry vs Data Catalog

**Reviewed: 14 July 2026**

A migration manager searches the enterprise data catalogue for a customer field.

The catalogue finds it immediately.

It shows the table, column, data type, owner, description and upstream lineage. The field appears in two legacy systems, several reports and one integration flow.

The manager then asks the questions that are blocking the SAP programme:

- Which source field has been approved for migration?
- Which business attribute does it represent?
- Which transformation should be applied?
- Which SAP target field should receive it?
- Does the rule differ by country?
- Which value mapping was approved?
- Which dataset was used to validate the mapping?
- What happens if the target field becomes mandatory?

The catalogue can help locate relevant assets.

It may not contain the approved implementation decision.

This is where teams often confuse two useful but different product categories.

A **data catalogue** helps an organisation discover, understand and govern data assets across its landscape.

A **data model registry** controls the specification used to design, migrate, validate and change a particular model.

The simplest distinction is:

```text
Data catalogue:
What data assets exist, where are they, and can people trust and use them?

Data model registry:
What model has been approved, how is it implemented, and what changes if it moves?
```

There is real overlap.

Both categories may contain:

- datasets;
- tables;
- columns;
- definitions;
- ownership;
- lineage;
- relationships;
- policies;
- quality information.

The difference is not the presence of metadata.

The difference is the operating purpose.

## The wrong expectation placed on a data catalogue

Enterprise catalogues are often selected to solve broad discovery and governance problems.

Current catalogue products emphasise capabilities such as:

- inventorying enterprise data assets;
- extracting technical metadata;
- searching for datasets and reports;
- attaching business definitions and policies;
- showing lineage;
- displaying quality or trust indicators;
- connecting owners and users;
- helping people find appropriate data.

Collibra describes a data catalogue as an inventory of enterprise data assets that uses technical, business and operational metadata to make datasets easier to discover, describe, organise, use and trust.

Alation similarly presents its catalogue around finding data assets, understanding definitions and policies, viewing lineage and trust information, and integrating metadata from databases, files, BI systems, applications and other sources.

These are important capabilities.

They help answer:

- Where is customer data stored?
- Which table contains this field?
- Who owns this dataset?
- Which reports use it?
- What does the term mean?
- How does data move through the landscape?
- Has the asset been certified?
- Is the dataset reliable enough for analysis?

The mistake is expecting the same catalogue automatically to become the authoritative system for SAP migration design and model change control.

A catalogue can show that five versions of a customer classification exist.

It does not necessarily decide:

- which one the programme will use;
- how the values will be harmonised;
- which target field represents the approved concept;
- which local exceptions are permitted;
- which migration default has been accepted;
- which tests prove the implementation;
- whether the decision is approved or merely proposed.

Discovery and implementation control are connected problems.

They are not identical.

## The central object is different

A useful way to distinguish the categories is to ask:

> What is the primary object being governed?

## In a data catalogue

The primary objects are usually enterprise data assets and their metadata.

Examples include:

- databases;
- schemas;
- tables;
- columns;
- files;
- datasets;
- reports;
- dashboards;
- data products;
- APIs;
- pipelines;
- models;
- business terms.

The catalogue helps people discover and evaluate these assets.

## In a data model registry

The primary objects are elements of an approved model specification.

Examples include:

- domain;
- business entity;
- attribute;
- organisational context;
- source endpoint;
- target endpoint;
- mapping;
- transformation rule;
- value list;
- value mapping;
- validation rule;
- decision;
- issue;
- dataset expectation;
- change proposal.

The registry helps a delivery or operations team control how these objects fit together.

Consider the difference.

A catalogue may record:

```text
Asset:
LEGACY_CUSTOMER.CUSTOMER_TYPE

Type:
VARCHAR(4)

Owner:
CRM Data Team

Used by:
12 reports and 3 pipelines
```

A model registry may record:

```text
Business attribute:
Customer group for sales processing

Approved source:
LEGACY_CUSTOMER.CUSTOMER_TYPE

Target:
SAP sales-area customer group field

Context:
Sales area

Transformation:
Country-specific value mapping

Current limitation:
Source unavailable for system B

Decision:
Blank values may not be defaulted for active customers
```

The catalogue describes the source asset.

The registry describes the approved implementation relationship.

## A catalogue optimises for breadth

A catalogue is expected to cover a large and diverse data landscape.

Its value grows as it includes more:

- platforms;
- databases;
- datasets;
- reports;
- pipelines;
- owners;
- users;
- domains.

It supports broad organisational questions.

For example:

- What customer datasets do we have?
- Where does this metric come from?
- Which reports contain personal data?
- Which data products are certified?
- Who owns this table?
- Which pipeline will be affected if a column changes?

Alation, for example, markets connectors across databases, files, BI systems, applications and AI assets, together with metadata extraction, search and lineage.

This breadth is a strength.

A data model registry is intentionally narrower.

It may cover one domain, programme or governed model in much greater implementation detail.

For example:

- Business Partner migration;
- Customer model harmonisation;
- Supplier MDG implementation;
- Product model redesign;
- one SAP rollout wave.

The registry does not need to discover every table in the enterprise.

It needs to control the specific objects and decisions required to deliver the model safely.

## A registry optimises for decision precision

A model registry should know the difference between:

- current state;
- proposed state;
- approved state;
- implemented state;
- tested state;
- retired state.

This matters because an implementation programme contains competing possibilities.

The target field proposed in February may be rejected in March.

A local mapping may be accepted only for one wave.

A temporary default may exist during testing but be prohibited at cutover.

A configuration change may be implemented in development but not yet approved for production.

A general catalogue can store status metadata.

A model registry makes the lifecycle of the model decision central.

For example:

```text
Attribute status:
Approved

Mapping status:
Dataset validated

Configuration status:
Implemented in DEV

Test status:
Pending

Deviation:
Local migration default expires before cutover
```

This level of distinction is essential when the question is not merely “What exists?” but “What is the programme authorised to implement?”

## Discovery lineage and implementation lineage

Both catalogues and registries can provide lineage.

The word means different things depending on the job.

## Catalogue lineage

Catalogue lineage typically shows how data moves and transforms across technical assets:

```text
Source table
→ transformation pipeline
→ warehouse table
→ semantic model
→ report
```

This helps users understand provenance, downstream impact and trust.

Collibra describes catalogue and lineage capabilities around discovering enterprise assets and visualising how data flows, transforms and is used across the landscape.

Alation similarly presents end-to-end lineage and links between assets, sources, definitions, policies and quality information.

## Registry lineage

A model registry needs semantic and decision lineage as well:

```text
Legacy source field
→ business interpretation
→ approved mapping
→ value transformation
→ organisational context
→ SAP target endpoint
→ validation rule
→ decision
→ test evidence
```

This path may include elements that do not exist as technical data flows.

For example:

- a rejected mapping option;
- a manual enrichment rule;
- a temporary default;
- a legal exception;
- a business approval;
- a dataset gap;
- a test obligation.

The catalogue may know how data currently moves.

The registry should know why the programme has chosen that movement and whether the choice is approved.

## A technical column is not the same as a business attribute

Catalogues often connect technical metadata with business glossaries.

This is valuable.

A column can be linked to a business term, owner and policy.

A model registry needs to go further when one business attribute has several physical representations.

For example:

```text
Business attribute:
Supplier payment terms

Representations:
- ERP_A.VENDOR.PAY_TERM
- ERP_B.SUPPLIER.PAYMENT_CODE
- SAP company-code supplier payment terms
- outbound procurement API field
```

The implementation may require:

- source-specific mappings;
- company-code context;
- value conversions;
- treatment of obsolete codes;
- migration exceptions;
- downstream compatibility.

The business term helps users understand the concept.

The registry controls how the concept is realised in the implementation.

## A catalogue may show all possible sources

A migration programme needs the approved source

Suppose the catalogue identifies four systems containing customer-industry data.

That discovery is useful.

The programme must still decide:

- Which system is authoritative?
- Does authority differ by country?
- Which source has acceptable completeness?
- Are the definitions equivalent?
- What happens when sources conflict?
- Which value list maps to the SAP target?
- Will historical records use a different treatment?
- Who approved the source-selection rule?

The catalogue provides the candidates and evidence.

The registry records the selected treatment.

This is a strong integration pattern:

```text
Data catalogue
Discovers candidate assets and technical lineage
                    ↓
Data model registry
Records approved model, mappings and decisions
                    ↓
SAP, MDM or migration implementation
Executes the approved treatment
```

The registry should not attempt to recrawl the whole enterprise if the catalogue already does that well.

The catalogue should not be expected to infer programme approval from asset availability.

## A data catalogue is not automatically a migration specification

A catalogue entry can be rich and still be insufficient for migration.

A migration specification may need:

- source-selection rules;
- filtering;
- defaulting;
- derivation;
- splitting and concatenation;
- code conversion;
- load sequencing;
- relationship reconstruction;
- key mapping;
- error handling;
- migration-wave applicability;
- cutover treatment;
- reconciliation evidence.

These elements describe intended delivery behaviour.

Some catalogue platforms can be extended to store them.

The question is whether doing so produces a clear operating model or turns the catalogue into a customised project application.

A model registry makes these relationships first-class by design.

## A registry is not a smaller catalogue

This distinction protects Martenweave from product drift.

It would be easy to expand the product backlog with catalogue features:

- automatic enterprise scanning;
- hundreds of connectors;
- organisation-wide business glossary;
- dataset marketplace;
- access-request workflow;
- privacy classification;
- broad analytics discovery;
- usage popularity;
- report certification.

These are legitimate catalogue capabilities.

They are not the initial Martenweave product.

Martenweave should not compete on the number of systems it can scan.

It should compete on whether a team can:

- represent the approved model precisely;
- validate its references;
- connect real datasets;
- find gaps;
- trace implementation relationships;
- assess change impact;
- review model proposals;
- preserve decisions for AMS.

The registry is narrower, but deeper in the delivery process.

## A practical capability comparison

| Capability | Data model registry | Data catalogue |
|---|---:|---:|
| Inventory enterprise data assets | Limited | Primary |
| Scan databases and platforms | Not a core requirement | Primary |
| Search for datasets and reports | Supporting | Primary |
| Business glossary | Focused on model objects | Common core capability |
| Technical metadata extraction | Via integration where useful | Primary |
| Technical data lineage | Supporting or imported | Primary |
| Approved target-model specification | Primary | Possible, but not usually central |
| Source-to-target migration mappings | Primary | Possible through custom metadata |
| Transformation approval | Primary | Not usually central |
| Dataset-to-model gap detection | Primary | Quality and profiling may overlap |
| Model-baseline comparison | Primary | Product-dependent |
| Proposed vs approved model state | Primary | Product-dependent |
| Impact analysis across mappings, rules and tests | Primary | Strong for data assets; weaker for project decisions |
| Decision rationale | Primary | Possible through governance workflows |
| Model patch proposals | Primary | Not normally the main purpose |
| Data discovery for broad user populations | Limited | Primary |
| Data marketplace and access discovery | No | Common catalogue capability |
| Privacy and policy classification | Referenced where relevant | Common catalogue capability |

This is not a claim that catalogues are incapable of storing model information.

Modern catalogue and data-intelligence platforms are broad.

The table shows which capability is central to each product’s purpose.

## Example: finding a missing migration source

The SAP target model requires a customer classification.

### What the catalogue contributes

The catalogue may identify:

- four source tables containing classification-like fields;
- field descriptions;
- owners;
- data types;
- usage;
- pipelines;
- technical lineage;
- quality indicators.

This dramatically reduces discovery effort.

### What the registry contributes

The registry records:

- the approved business definition;
- selected source by system and context;
- rejected alternative sources;
- source-to-target mapping;
- value translation;
- completeness evidence;
- local exceptions;
- owner approval;
- test status.

The catalogue answers:

> What could we use?

The registry answers:

> What have we decided to use, and under which conditions?

## Example: changing an SAP field

A target attribute becomes mandatory.

### Catalogue impact analysis

The catalogue may identify technical consumers and upstream sources:

- tables;
- pipelines;
- reports;
- interfaces.

### Registry impact analysis

The registry adds:

- source systems unable to provide the value;
- migration mappings requiring revision;
- country-specific rules;
- accepted defaults;
- current dataset populations;
- related decisions;
- tests requiring renewal;
- operational remediation owners.

Both views are valuable.

The catalogue shows technical landscape impact.

The registry shows delivery and governance impact.

## Example: a local value-list exception

A country requests an additional supplier-risk value.

### Catalogue role

The catalogue may document:

- the field;
- business glossary term;
- datasets containing the value;
- reports consuming it;
- owner;
- lineage.

### Registry role

The registry determines whether the new value is:

- part of the global list;
- a local extension;
- a temporary migration status;
- an override;
- an invalid duplication of another concept.

It then connects the decision to:

- mappings;
- workflow rules;
- interfaces;
- tests;
- affected records;
- approval.

The catalogue documents and exposes the asset.

The registry controls the model change.

## Where a catalogue may already be enough

An organisation may not need a separate registry if its catalogue already supports the required model-governance workflow effectively.

This can be true when:

- the model is stable;
- migration is simple;
- custom object types are supported;
- mappings and rules are represented clearly;
- approval states are controlled;
- dataset gaps are linked to model objects;
- impact analysis includes project decisions;
- delivery teams actively use the catalogue;
- handover knowledge remains current.

The product label is not important.

If the catalogue can operate as the required model registry without heavy customisation or ambiguous authority, introducing another tool may be unnecessary.

We care about the operating capability, not category purity.

## Signs that the catalogue is not enough

A separate registry becomes more justifiable when:

- the catalogue contains assets but not the approved migration treatment;
- source-to-target mappings remain in Excel;
- model decisions remain in Jira;
- target-model versions cannot be compared;
- proposed and approved states are mixed;
- dataset profiles are not checked against target requirements;
- local variants are hard to represent;
- test evidence is disconnected from model changes;
- SAP configuration changes are not reflected;
- the catalogue team and migration team work through separate processes;
- adapting the catalogue would require a large custom programme.

In this situation, the organisation may have strong asset discovery and weak model delivery control.

## When a registry is needed without a catalogue

A company may have no enterprise catalogue and still benefit from a registry.

This is common in a bounded migration or MDG programme.

The team may need to control:

- 100 critical attributes;
- three source systems;
- one SAP target;
- mappings;
- value lists;
- dataset gaps;
- decisions;
- change impact.

It does not necessarily need to catalogue every database and report in the enterprise.

A registry can start locally and remain focused on the programme.

This is one of Martenweave’s strongest practical positions.

It can solve the immediate model-delivery problem without requiring a broad enterprise metadata initiative.

## When both are needed

A mature organisation may use both layers.

The catalogue provides:

- broad asset discovery;
- automated metadata ingestion;
- technical lineage;
- enterprise glossary;
- policy and privacy context;
- data-product discovery.

The registry provides:

- approved model baselines;
- programme-specific mappings;
- transformation decisions;
- dataset expectations;
- model gaps;
- implementation impact;
- change proposals;
- delivery and AMS continuity.

A useful integration pattern is:

```text
Catalogue asset ID
        ↓
Registry SourceEndpoint or TargetEndpoint
        ↓
Mapping, Attribute, Rule and Decision
        ↓
Approved implementation change
```

The registry should reuse catalogue identities rather than duplicate asset discovery.

The catalogue can link back to the approved model specification where useful.

## When neither is needed

A small project may be adequately controlled through:

- one workbook;
- clear ownership;
- limited source systems;
- stable definitions;
- simple mappings;
- low change volume.

A registry is not justified merely because metadata exists.

A catalogue is not justified merely because users occasionally search for a table.

The cost of the problem should determine the control.

## The governance workflow differs

A catalogue governance workflow may focus on:

- assigning asset ownership;
- completing descriptions;
- certifying datasets;
- applying classifications;
- approving access;
- resolving quality issues.

A registry workflow focuses on changes to the model specification:

- propose a new attribute;
- revise a mapping;
- add a local context;
- change a value list;
- retire an endpoint;
- update a rule;
- approve a migration default;
- record an implementation decision.

The first governs how assets are understood and used.

The second governs what the implementation team is authorised to build.

## The users differ

Data catalogues serve broad data communities:

- analysts;
- data scientists;
- data engineers;
- business users;
- governance teams;
- privacy teams;
- data-product owners.

A model registry primarily serves people responsible for model delivery and change:

- SAP and MDM architects;
- migration leads;
- data architects;
- mapping teams;
- data-governance leads;
- test leads;
- data stewards;
- AMS analysts;
- implementation partners.

There is overlap.

An enterprise architect may use both.

The difference is the job being performed.

## AI does not remove the distinction

Catalogue vendors increasingly position AI around search, metadata curation and helping people find and understand enterprise information. Alation, for example, currently describes AI-assisted metadata curation and natural-language discovery as catalogue capabilities.

AI can also help a registry:

- extract candidate mappings;
- compare definitions;
- suggest model relationships;
- identify gaps;
- draft impact analysis;
- propose changes.

The governance requirement is different.

A catalogue AI can help a user discover relevant assets.

A registry AI may be proposing a change to the approved implementation model.

That proposal requires a stricter boundary:

```text
Evidence
→ AI proposal
→ deterministic validation
→ responsible-owner review
→ approved model change
```

Finding a plausible source field is not the same as approving it for migration.

## Where Martenweave fits

Martenweave’s current public documentation describes the problem of model knowledge being scattered across spreadsheets, datasets, tickets, validation reports, decisions, SAP context and project history. It positions the product as a control layer that connects fields, attributes, rules, owners, issues and decisions, validates references, detects gaps and traces impact.

The current core provides:

- canonical Markdown and YAML model files;
- deterministic validation;
- generated SQLite and JSONL indexes;
- search and structured query;
- trace and impact analysis;
- dataset profiling and gap detection;
- ownership, audit, health and scorecard reports;
- CSV and XLSX review flows;
- PatchProposal-to-ChangeRequest lifecycle;
- issue drafts and GitHub-ready change bundles.

These capabilities position Martenweave as a model registry rather than a full catalogue.

Its purpose is not to inventory the whole enterprise.

Its purpose is to maintain a validated model specification connecting:

- business attributes;
- source and target endpoints;
- mappings;
- contexts;
- rules;
- datasets;
- decisions;
- changes.

## Martenweave should integrate with catalogues

If an enterprise catalogue already exists, Martenweave should not duplicate it.

A future integration should be able to:

- reference catalogue asset identifiers;
- import selected technical metadata;
- link endpoints to catalogue pages;
- reuse ownership information;
- consume lineage evidence;
- send approved model context back where useful.

The boundary should remain clear.

```text
Catalogue:
Discovers and governs enterprise assets.

Martenweave:
Selects and governs their role in an approved model implementation.
```

This is stronger than attempting to replace a mature catalogue.

## Martenweave should not become a crawler platform

Protecting scope matters.

The current Martenweave documentation explicitly states that the product is not a generic data catalogue or a replacement for enterprise catalogue tools.

That means the early product should avoid:

- building hundreds of connectors;
- indexing every database automatically;
- creating a company-wide data marketplace;
- competing on natural-language dataset discovery;
- managing data-access requests;
- becoming a privacy-classification platform;
- scanning the entire analytics estate.

Those are large product categories.

They would pull development away from the core problem:

- canonical model files;
- validation;
- dataset gaps;
- lineage;
- impact;
- controlled proposals;
- human approval.

## A sensible combined architecture

For an enterprise using SAP MDG, a catalogue and Martenweave, responsibilities can be separated as follows.

### Data catalogue

Maintains broad metadata about:

- source systems;
- tables;
- fields;
- data products;
- reports;
- technical lineage;
- ownership;
- policy classifications.

### Martenweave

Maintains:

- approved business-model specification;
- selected source and target endpoints;
- migration mappings;
- transformations;
- value mappings;
- contextual rules;
- dataset expectations;
- decisions;
- change proposals.

### SAP MDG

Operates:

- governed master records;
- stewardship;
- workflow;
- validation;
- matching and consolidation where implemented;
- activation;
- distribution.

### Jira and Confluence

Maintain:

- delivery work;
- defects;
- collaboration;
- narrative documentation;
- procedures.

This architecture has several tools.

It should still have clear authority.

## A practical pilot

Do not begin by integrating the whole enterprise catalogue.

Choose one domain and one problem.

For example:

- Business Partner;
- 50 critical attributes;
- three source systems;
- one current mapping workbook;
- one representative dataset;
- several catalogue asset references;
- five recent model changes.

The pilot should prove:

1. Catalogue assets can be referenced without copying all metadata.
2. Business attributes have stable identities.
3. Approved source and target endpoints are explicit.
4. Mappings can be validated.
5. The dataset can be compared with model expectations.
6. Uncovered values and missing fields are visible.
7. A field change produces a useful impact view.
8. A proposed change can be reviewed before approval.
9. A role-specific report can be generated.
10. The model remains understandable to AMS.

The pilot should not attempt to replace catalogue search or technical lineage ingestion.

## How to measure the difference in value

Catalogue value may be measured through:

- search adoption;
- metadata coverage;
- certified assets;
- time saved finding data;
- ownership coverage;
- lineage coverage;
- data-product usage.

Registry value should be measured differently:

- time required to identify the approved mapping;
- model gaps found before testing;
- time required for impact analysis;
- percentage of critical attributes with source and target lineage;
- dataset coverage against model expectations;
- reduction in repeated mapping reconciliation;
- decisions connected to affected objects;
- time required for AMS to explain a field;
- changes processed without model divergence.

Using catalogue adoption metrics to assess a registry would miss its primary benefit.

## Common misconceptions

### “A data catalogue already contains columns, so a registry is unnecessary”

Columns are only part of the model. The registry also controls approved mappings, contexts, decisions and change states.

### “A registry is just a small catalogue”

A registry is narrower but is organised around model delivery rather than enterprise asset discovery.

### “A catalogue can never support migration mappings”

It can, especially with custom asset types and workflows. The question is whether this is a central, maintainable use case in the organisation.

### “We need to choose one”

Large organisations may benefit from both, with explicit integration and authority.

### “The registry should ingest everything from the catalogue”

Only the assets relevant to the model should be referenced or imported.

### “Better search solves model governance”

Search helps locate evidence. It does not determine which evidence represents the approved decision.

### “AI can infer the correct mapping from catalogue metadata”

AI can propose a mapping. Business meaning, context and approval still need verification.

## A decision framework

Ask these questions before selecting or extending a tool.

### Do users mainly need to find data?

This points toward a catalogue.

### Does the organisation need broad technical metadata and lineage?

This points toward a catalogue.

### Does the programme need to control an approved target model?

This points toward a registry.

### Does the team need source-to-target mappings with transformation decisions?

This points toward a registry.

### Does the team need dataset-gap checks against model expectations?

This is a strong registry use case, although catalogue quality tooling may contribute evidence.

### Does the organisation need enterprise glossary, certification and data-product discovery?

This points toward a catalogue.

### Does a model change need to trigger mapping, test and decision impact?

This points toward a registry.

### Are both broad discovery and precise implementation control needed?

Use both layers and connect their objects.

## Our conclusion

A data catalogue and a data model registry both organise metadata.

They are not interchangeable.

A catalogue helps an organisation understand its data landscape:

- what assets exist;
- where they live;
- how they flow;
- who owns them;
- whether users can trust them.

A registry helps a programme control an implementation model:

- which attributes are approved;
- which sources were selected;
- how values are transformed;
- which target endpoints apply;
- which rules and contexts govern them;
- which decisions created the current state;
- what will be affected by change.

The catalogue is broad and discovery-oriented.

The registry is narrow and decision-oriented.

Our practical rule is:

> Use a catalogue to find and understand candidate data assets. Use a registry to record how selected assets participate in the approved model.

When one platform can perform both jobs cleanly, another product may not be necessary.

When migration mappings, target decisions and change evidence remain outside the catalogue, a registry provides a focused control layer rather than another enterprise inventory.

Martenweave should stay on that side of the boundary.

Its value is not knowing about every table in the company.

Its value is knowing exactly why the critical fields in one governed model are connected the way they are.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We build practical model-governance infrastructure for SAP migration, MDG, MDM and AMS teams. Martenweave is intended to work beside enterprise catalogues by controlling the approved mappings, rules, evidence and change decisions required to deliver and maintain a model.

## Sources and notes

This article was reviewed on 14 July 2026.

Collibra describes a data catalogue as an enterprise inventory that uses technical, business and operational metadata to support discovery, description, organisation, ownership, lineage and trust in data assets.

Alation currently presents its data catalogue around asset discovery, descriptions and definitions, policies, lineage, trust indicators, metadata extraction, connectors and AI-assisted curation.

Martenweave’s current public documentation describes structured model objects, deterministic validation, generated indexes, dataset profiling, gap detection, trace and impact analysis, spreadsheet review flows and controlled PatchProposal and ChangeRequest lifecycles.

Martenweave’s documented boundaries state that it is not a generic data catalogue or a replacement for SAP MDG, Jira, Confluence or enterprise catalogue tools.

Martenweave is an independent project and is not affiliated with or endorsed by Collibra, Alation or SAP. Product and company names mentioned in this article may be trademarks of their respective owners.
