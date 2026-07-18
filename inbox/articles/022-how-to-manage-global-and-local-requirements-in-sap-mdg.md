# How to Manage Global and Local Requirements in SAP MDG

**Reviewed: 14 July 2026**

The global template says the field is mandatory.

The country team says local law does not require it.

The migration team cannot populate it for 40% of the country’s records. The SAP MDG team has already configured one global validation. The process owner refuses to create another local workflow. Testing is blocked while both sides argue about whether the country is asking for a legitimate exception or resisting standardisation.

Eventually, somebody proposes the fastest solution:

> Make the field optional globally.

Testing continues.

A month later, another country discovers that its process depends on the field being mandatory. The global rule is restored, and the original country receives a technical workaround. The workaround is documented in a ticket but not in the model. Migration implements its own exception. AMS inherits three different interpretations of the same requirement.

This is how global templates begin to fragment.

Not through one large architecture decision, but through a sequence of local problems solved in isolation.

The opposite failure is also common.

The global programme rejects every local variation in the name of standardisation. Countries then maintain supplementary spreadsheets, manual approvals and unofficial workarounds outside SAP MDG.

The global model remains clean on paper.

The operating process becomes local anyway.

Managing global and local requirements is therefore not a choice between central control and local freedom.

It is a modelling problem:

> Which parts of the governed model must remain globally consistent, which parts may vary by context, and how should every variation inherit, override or extend the common model?

The answer should be visible in the model itself—not left to separate documents and technical workarounds.

## “Global” does not mean identical everywhere

A global SAP MDG model should create shared meaning and control.

It should not assume that every country, legal entity, business unit and source system operates under identical conditions.

Global consistency may be required for:

- the definition of a Business Partner;
- enterprise identifiers;
- core relationships;
- shared value semantics;
- group reporting;
- integration contracts;
- common governance principles;
- ownership of central attributes.

Local variation may be legitimate for:

- tax identifiers;
- legal registration data;
- address formats;
- payment requirements;
- regulatory classifications;
- language-specific descriptions;
- local approval responsibilities;
- country-specific source systems;
- statutory retention or evidence;
- local organisational structures.

The design objective is not maximum uniformity.

It is controlled variation around a stable core.

## SAP MDG provides the governance platform, but the programme defines the variation model

SAP currently describes SAP Master Data Governance as a central governance layer supporting governed models, preserved semantics and relationships, collaborative workflows, validated values, business rules, quality monitoring and auditable changes.

Those capabilities allow a programme to implement common governance and contextual rules.

They do not decide which requirements should be global or local.

That decision depends on:

- business operating model;
- legal requirements;
- source-system reality;
- target architecture;
- ownership;
- implementation cost;
- long-term support.

The programme must define the variation deliberately.

Otherwise, differences appear through configuration, migration mappings and operational workarounds without one approved model explaining them.

## The first mistake: treating every local request as an exception

The word “exception” suggests a deviation from a correct standard.

Some local requirements are not exceptions.

They are valid parts of the enterprise model.

For example:

- a country-specific tax category;
- a statutory registration identifier;
- a legally required approval step;
- a local address component;
- a regulated supplier classification.

Calling these exceptions creates the wrong governance response.

The programme may repeatedly challenge requirements that should have been modelled as contextual extensions from the beginning.

We distinguish four types of variation.

## 1. Global core

The concept and treatment should be shared across all applicable contexts.

Examples:

- enterprise Business Partner identifier;
- central legal name;
- common lifecycle status;
- global ownership principle;
- shared relationship type.

## 2. Contextual specialisation

The global concept remains, but rules or representations differ by context.

Examples:

- a tax identifier with country-specific formats;
- an attribute mandatory only for selected countries;
- different allowed values by business unit;
- a relationship required only for one partner role.

## 3. Local extension

The requirement exists only in one context and does not redefine the global concept.

Examples:

- local regulatory licence;
- country-specific reporting classification;
- additional local-language field;
- regional onboarding evidence.

## 4. Temporary deviation

The intended model is known, but implementation cannot yet meet it.

Examples:

- source data unavailable until a later release;
- migration uses a temporary default;
- local workflow is postponed;
- remediation continues after go-live.

These four types need different treatment.

A local extension should not be managed as temporary technical debt.

A temporary deviation should not quietly become a permanent local model.

## Build the global model around stable business meaning

A global model should begin with concepts that remain valid across countries.

For example:

```text
Business entity:
Supplier

Business attribute:
Tax Registration Identifier

Global meaning:
An identifier issued by an authorised jurisdiction
for tax registration purposes.
```

The global model should not immediately assume:

- one format;
- one mandatory rule;
- one tax category;
- one source field;
- one approval process.

Those may depend on context.

The model can then specialise the concept:

```text
Global attribute
Tax Registration Identifier
        ↓
Country context: Germany
        ├── applicable category
        ├── format rule
        ├── mandatory conditions
        └── validation owner
        ↓
Country context: Portugal
        ├── applicable category
        ├── format rule
        ├── mandatory conditions
        └── validation owner
```

This preserves common meaning without pretending that implementation is identical.

## Use inheritance before duplication

A common project response to local variation is copying the global design into country workbooks.

The country then changes what it needs.

This is easy initially.

It creates long-term ambiguity:

- Which global changes should propagate locally?
- Which local values intentionally differ?
- Which copied rules are now obsolete?
- Is a difference approved or accidental?
- Which country version should a new rollout copy?

A stronger model uses inheritance.

The local context inherits the global definition and changes only what differs.

```text
Global Customer Group
├── definition
├── owner
├── global value semantics
└── general mapping principle

Germany override
└── mandatory for selected sales organisations

France extension
└── additional local reporting value
```

The local model does not duplicate the complete global object.

It references the global object and declares its variation.

This makes comparison and impact analysis possible.

## Define the difference between extension and override

These terms are often mixed.

An **extension** adds something that the global model does not define.

An **override** changes how an existing global element behaves in a specific context.

### Extension example

The global supplier model does not contain a local construction-sector licence.

One country adds:

```text
Local attribute:
Construction Licence Number

Applies to:
Suppliers performing regulated construction services
```

The global supplier definition remains unchanged.

### Override example

The global model defines Supplier Risk Classification as optional.

One country makes it mandatory for suppliers above a local threshold.

The same attribute exists globally, but local behaviour changes.

The distinction matters because overrides create stronger dependency on the global object.

When the global rule changes, every override must be reviewed.

## Not every difference belongs in the data model

Local requirements may affect different layers.

The programme should identify where the variation actually belongs.

### Semantic variation

The concept means something different locally.

This may justify another attribute rather than an override.

### Value variation

The concept is shared, but allowed values differ.

This may require a contextual value list.

### Validation variation

The same attribute has different mandatory or format rules.

This belongs in contextual rules.

### Workflow variation

The data is the same, but approval responsibilities differ.

This belongs in workflow and ownership design.

### Source variation

The target concept is shared, but countries supply it from different systems or fields.

This belongs in mappings.

### Migration variation

The intended operational model is shared, but historical data requires temporary treatment.

This belongs in migration decisions and deviations.

Failing to separate these layers leads to excessive model duplication.

A different source field does not necessarily mean a different business attribute.

A different approval team does not necessarily mean a different data definition.

## Establish a context hierarchy

Global programmes need a consistent way to represent context.

Possible levels include:

```text
Enterprise
→ Region
→ Country
→ Legal entity
→ Company code
→ Sales organisation
→ Purchasing organisation
→ Plant
→ Business unit
```

The hierarchy should reflect the actual governance model rather than every possible SAP organisational object.

For each rule or mapping, the programme should know the most specific applicable context.

For example:

```text
Rule:
Tax identifier required

Applies to:
Country = DE
Business Partner category = Organisation
Partner role = Customer
Status = Active
```

This is stronger than adding “Germany only” in a comment column.

Structured context allows the programme to:

- validate overlap;
- find conflicts;
- trace impact;
- generate local views;
- determine which global changes require local review.

## Define precedence explicitly

When global and local rules both exist, the programme needs deterministic precedence.

A simple hierarchy may be:

```text
Approved temporary deviation
        ↓
Specific local override
        ↓
Regional rule
        ↓
Global rule
```

The actual order depends on governance policy.

What matters is that it is explicit.

Suppose the global rule says:

```text
Payment Terms:
Optional
```

A country rule says:

```text
Payment Terms:
Mandatory for active suppliers
```

A temporary migration deviation says:

```text
Historical blocked suppliers may be loaded without Payment Terms.
```

All three statements can be valid.

The model must explain which one applies to a specific population.

Without explicit precedence, teams implement whichever rule they find first.

## Avoid unrestricted local overrides

Local flexibility needs boundaries.

A country should not be able to override any global element independently.

Some objects may be declared globally protected:

- enterprise identifiers;
- key relationship semantics;
- global reporting classifications;
- integration-critical codes;
- mandatory compliance controls.

A local request affecting a protected object should require global approval.

Other elements may allow delegated local decisions:

- local descriptions;
- jurisdiction-specific identifiers;
- local steward assignments;
- country-specific evidence requirements.

A useful policy classifies objects as:

### Global locked

No local override permitted without global architecture approval.

### Global governed

Local override permitted through formal review.

### Locally governed

The global model defines the structure, while local owners control values or rules.

### Local only

The object exists only within the local context.

This classification reduces repeated debates over decision authority.

## Create one global identifier for the concept

Different teams may use different labels.

For example:

- Vendor Category;
- Supplier Class;
- Procurement Segment;
- Supplier Group.

Some may describe the same concept.

Others may not.

A stable global identifier provides an anchor:

```text
ATTR-SUPPLIER-CLASSIFICATION
```

Local labels can remain:

```text
Germany:
Lieferantenklassifizierung

France:
Catégorie fournisseur
```

The identifier connects:

- definitions;
- translations;
- source fields;
- SAP endpoints;
- rules;
- decisions;
- tests.

This prevents local language and terminology from creating accidental model duplication.

## Global value list or local value list?

Value lists are a frequent source of conflict.

A global programme may try to create one list containing every local value.

This can produce a large set with unclear semantics.

The opposite approach gives every country an independent list, making global reporting and integration difficult.

We use three patterns.

## Shared global list

Use when values have the same meaning everywhere.

Example:

```text
Supplier Lifecycle Status:
ACTIVE
BLOCKED
INACTIVE
```

## Global list with local applicability

Values are globally defined, but not every value is available in every context.

Example:

```text
Supplier Type:
MANUFACTURER
DISTRIBUTOR
PUBLIC_BODY
INDIVIDUAL

PUBLIC_BODY applicable only where the operating model uses it.
```

## Local extension list

A country may add values that are meaningful only locally.

The model should define whether those values:

- map to a global reporting category;
- remain local;
- may be distributed to all systems;
- require translation;
- affect workflow.

The programme should resist adding local values to a global list without defining their enterprise meaning.

## Local requirements need evidence

A country request should not be accepted or rejected based only on authority or urgency.

The request should include evidence.

Possible evidence includes:

- legal or regulatory source;
- process requirement;
- source-system limitation;
- data profile;
- downstream-system dependency;
- audit finding;
- contractual requirement;
- operational volume;
- failure impact.

The request should answer:

1. What problem does the local requirement solve?
2. Which population does it affect?
3. Is the requirement permanent?
4. Does it change business meaning or only implementation?
5. Can the global model support it through context?
6. Which systems and processes are affected?
7. Who owns the local requirement?
8. What evidence confirms it?

A local request without evidence is not necessarily invalid.

It is not ready to become model truth.

## Global teams also need to justify standardisation

The burden of proof should not rest only with local teams.

A global rule should also have a clear rationale.

The global programme should explain:

- why uniformity is needed;
- which processes depend on it;
- whether it supports integration or reporting;
- which regulatory or audit control it implements;
- what the cost of local variation would be;
- who owns the global decision.

“Because it is the template” is not a business rationale.

Global standards become stronger when teams understand the dependency they protect.

## A practical requirement decision framework

For each local requirement, ask the following questions.

## Question 1: Is the business meaning different?

If yes, consider a separate attribute or entity rather than an override.

## Question 2: Is the meaning shared but the rule contextual?

If yes, use a contextual validation or workflow rule.

## Question 3: Is the difference only in the source?

If yes, keep the global target attribute and create a local source mapping.

## Question 4: Is the difference only in values?

Use a local applicability rule or extension list.

## Question 5: Is the requirement temporary?

Create an explicit deviation with an expiry and owner.

## Question 6: Does the variation affect global integration or reporting?

If yes, require global impact review.

## Question 7: Can the local treatment be represented without duplicating the full model?

Prefer inheritance and explicit variation.

## Question 8: Who has approval authority?

Determine this from the object’s governance classification.

This framework prevents every local problem from becoming a new model branch.

## A worked example: country-specific tax identifiers

The global Business Partner model includes:

```text
Attribute:
Tax Registration Identifier
```

A weak design might define one field as globally mandatory.

A stronger design separates:

### Global semantic definition

What qualifies as a tax registration identifier?

### Country context

Which categories and formats apply?

### Business Partner context

Does the rule differ for organisations and persons?

### Role context

Does it apply to customers, suppliers or both?

### Validation

Which format and completeness checks are needed?

### Source mapping

Which legacy field supplies the identifier?

### Operational ownership

Who confirms exemptions?

For Germany, the rule may require a specific category under defined conditions.

For another country, a different identifier or category may apply.

The global attribute remains stable.

Country rules specialise its operational treatment.

## A second example: supplier payment terms

The global model defines payment terms at supplier company-code level.

Country A sources the value from a legacy company-code record.

Country B stores one global supplier value.

Country C does not maintain reliable payment terms and expects them to be enriched before migration.

These are three source and migration treatments—not necessarily three business models.

The model can represent:

```text
Global attribute:
Supplier Payment Terms

Target context:
Company Code

Country A:
Direct contextual mapping

Country B:
Global source copied to approved company codes

Country C:
No approved source; enrichment required
```

If the countries instead create three independent definitions, the programme loses the ability to compare readiness and apply target changes consistently.

## A third example: local supplier classification

A country requests a classification called `STRATEGIC LOCAL SUPPLIER`.

The programme should determine whether it represents:

- a global supplier strategy concept;
- a country-specific reporting label;
- a procurement workflow trigger;
- a temporary migration category;
- a combination of several concepts.

Possible treatments include:

### Map to global classification

Use when the local value has a clear enterprise equivalent.

### Add local extension

Use when the value is meaningful locally but should not alter global semantics.

### Create another attribute

Use when the local concept is fundamentally different.

### Reject the request

Use when the same need is already represented by an existing attribute.

### Temporary deviation

Use when the value only supports migration remediation.

The correct choice cannot be made from the label alone.

## Migration exposes hidden local models

Before migration, global and local disagreement may remain theoretical.

Source datasets make it measurable.

A country may reveal:

- fields absent from the global mapping;
- local values without target equivalents;
- different relationship structures;
- country-specific identifiers;
- missing mandatory information;
- alternative source authority.

This is not automatically evidence that the global model is wrong.

It is evidence that the programme must choose among:

- source remediation;
- transformation;
- contextual extension;
- local override;
- exclusion;
- target-model revision.

The decision should be recorded against both the model object and the affected dataset.

## Dataset gaps should remain contextual

A global readiness report can hide local risk.

For example:

```text
Tax identifier completeness globally:
94%
```

This may conceal:

```text
Germany:
99%

Country B:
92%

Country C:
41%
```

The global model may be technically supported overall while one local rollout is not ready.

Dataset validation should therefore preserve:

- country;
- source system;
- organisational scope;
- migration wave;
- affected model object.

The programme can then distinguish:

- global design gap;
- local source-data gap;
- temporary extraction problem;
- local mapping gap.

## Workflow should follow decision rights

Global and local workflow differences should reflect governance authority.

Examples:

- central attributes approved globally;
- local tax data approved by country finance;
- supplier compliance reviewed regionally;
- company-code data approved by local accounting;
- local extensions reviewed by local stewards.

A workflow should not be local merely because the users are local.

It should be local because the decision authority is local.

SAP highlights collaborative routing and notifications as part of MDG governance. The programme still needs to define which roles have authority over global and contextual parts of the model.

## The ownership model should mirror the variation model

One generic domain owner is rarely enough.

A practical structure can include:

### Global domain owner

Owns the enterprise definition and global policy.

### Global data architect

Protects model coherence and shared semantics.

### Local business owner

Owns legitimate local policy and regulatory interpretation.

### Local data steward

Operates local data quality and exceptions.

### SAP MDG architect

Implements approved global and contextual behaviour.

### Migration lead

Ensures local source treatment matches the approved target model.

### Integration owner

Assesses whether local variation can be consumed downstream.

For each model object, the programme should know who may:

- propose a local variation;
- approve it;
- implement it;
- review it later;
- retire it.

## Local variation should have a lifecycle

Local requirements change.

A rule may begin as a temporary migration workaround and later become:

- a permanent local rule;
- a global standard;
- an obsolete deviation;
- a separate business attribute.

Use a lifecycle such as:

```text
Proposed
→ Evidence collected
→ Approved local variation
→ Implemented
→ Verified
→ Periodically reviewed
→ Retired or promoted globally
```

A local object should not remain active indefinitely without review.

The review should ask:

- Does the legal or business need still exist?
- Has the global model changed?
- Do other countries need the same treatment?
- Can the local extension now be harmonised?
- Is a temporary deviation overdue?

## Promote repeated local requirements deliberately

If several countries request similar variations, the programme should consider promoting them into the global model.

For example:

- three countries add the same supplier status;
- several regions require the same approval evidence;
- multiple source systems need the same transformation;
- local tax models share one common pattern.

This may indicate that the original global model was too narrow.

Promotion should not happen automatically from frequency alone.

The programme should compare:

- semantics;
- contexts;
- ownership;
- downstream use;
- regulatory basis.

Similar labels do not always mean the same requirement.

## Keep local configuration traceable to the global model

For every local configuration element, the programme should be able to identify:

- global parent object;
- variation type;
- local context;
- reason;
- approving decision;
- implementation reference;
- tests;
- owner.

For example:

```text
Local rule:
RULE-BP-TAX-MANDATORY-DE

Global parent:
ATTR-BP-TAX-REGISTRATION

Variation type:
Contextual override

Reason:
Country-specific operational requirement

Decision:
DEC-0048

Owner:
DE Tax Data Owner
```

This allows a global attribute change to find all dependent local rules.

Without the parent relationship, impact analysis relies on naming conventions and memory.

## Model local differences, do not hide them in comments

A common mapping entry says:

> Except for France and Spain.

The exceptions may be explained elsewhere.

This cannot be validated or traversed reliably.

A structured model should represent:

```text
Global mapping
├── applies to countries A, B, C
├── France override
└── Spain override
```

The same principle applies to:

- value lists;
- mandatory rules;
- workflow;
- source selection;
- ownership;
- migration treatment.

Comments remain useful for explanation.

They should not be the only representation of applicability.

## Impact analysis must travel in both directions

When the global model changes, identify affected local objects.

```text
Global attribute change
→ local overrides
→ mappings
→ datasets
→ rules
→ tests
→ configuration
```

When a local request is proposed, identify its global impact.

```text
Local proposal
→ global parent
→ shared value lists
→ integrations
→ reporting
→ other countries
→ operating policy
```

Local impact analysis prevents a country workaround from damaging the shared model.

Global impact analysis prevents a template change from invalidating legitimate local processes.

## Use explicit decision records

A global/local decision should preserve:

- request;
- context;
- current global state;
- proposed local state;
- evidence;
- alternatives;
- global impact;
- local impact;
- selected treatment;
- approvers;
- review date.

For example:

```text
Decision:
Allow local supplier status UNDER_REVIEW in Country X.

Treatment:
Local extension mapped to global status INCOMPLETE
for group reporting.

Restrictions:
May not be assigned to fully approved suppliers.

Review:
After remediation programme closes.
```

This is more durable than a ticket comment stating that the country may proceed.

## Control the number of local variants

Explicit modelling should not become permission to create unlimited variation.

Track indicators such as:

- overrides per global attribute;
- local-only value lists;
- temporary deviations past expiry;
- duplicate local concepts;
- rules with overlapping context;
- countries using detached mappings;
- local objects without owners.

A high number of variants may indicate:

- weak global design;
- insufficient governance;
- poor source harmonisation;
- over-customisation;
- incorrect modelling of context.

The objective is not zero variation.

It is variation that remains explainable and supportable.

## A practical review board should review differences, not whole models

Global governance becomes slow when every local team presents an entire design.

The review should focus on the delta:

- which global object is affected;
- what local treatment is proposed;
- why it is needed;
- what evidence supports it;
- what else changes;
- whether it is temporary;
- who owns it.

A semantic diff is more useful than comparing two long workbooks.

For example:

```text
Global:
Supplier Classification optional.

Local proposal:
Mandatory for Country X suppliers
above annual spend threshold Y.

Data impact:
8% of active suppliers currently blank.

Workflow impact:
Local procurement approval required.

Integration impact:
No interface change.

Decision requested:
Approve contextual override.
```

This makes governance proportional to the actual change.

## Where Martenweave fits

Martenweave’s current public description positions it as a practical model-control layer that connects fields, attributes, rules, owners, issues and decisions; validates references; detects model and dataset gaps; traces impact; and routes AI-assisted changes through reviewable proposals.

The current core includes:

- canonical Markdown and YAML model files;
- deterministic validation;
- generated SQLite and JSONL indexes;
- search and structured queries;
- trace and impact analysis;
- dataset profiling and gap detection;
- ownership, audit, health and scorecard reports;
- CSV and XLSX review flows;
- PatchProposal-to-ChangeRequest lifecycle.

For global and local requirements, Martenweave can represent:

- global entities and attributes;
- context objects;
- local extensions;
- local overrides;
- parent relationships;
- source and target endpoints;
- contextual mappings;
- validation rules;
- owners;
- decisions;
- temporary deviations.

The canonical model remains shared.

Local teams can receive generated views containing only their applicable objects and inherited global context.

## A Martenweave variation pattern

```text
Global model object
        ↓
Context relationship
        ↓
Local extension or override
        ↓
Local mapping and rule
        ↓
Dataset evidence
        ↓
PatchProposal
        ↓
Global and local owner review
        ↓
Approved contextual model
```

The important point is that a local change does not require a detached copy of the complete model.

It becomes a controlled addition to the shared model graph.

## Deterministic checks for global and local models

Useful checks include:

- every override references an existing global parent;
- every local object declares its context;
- local and global rules do not overlap ambiguously;
- protected global objects cannot be overridden without approval;
- temporary deviations have owners and review dates;
- local value mappings point to valid target values;
- inherited objects are not duplicated unnecessarily;
- local rules have local test evidence;
- active local mappings use current global endpoints.

These checks do not decide whether a local requirement is justified.

They ensure that the approved variation is structurally explicit.

## How AI can help

AI can assist by:

- extracting local requirements from tickets and workshop notes;
- comparing country workbooks with the global model;
- identifying likely duplicates;
- grouping similar local variations;
- proposing parent-child relationships;
- drafting impact analysis;
- finding missing evidence;
- preparing semantic diffs.

AI should not automatically decide that a local requirement is:

- legally required;
- globally applicable;
- equivalent to another country’s requirement;
- safe to map to an existing value;
- approved.

A plausible local interpretation can still change enterprise semantics.

The safe sequence is:

```text
Local evidence
→ AI-assisted proposal
→ deterministic validation
→ global and local review
→ approved contextual change
```

## A practical pilot

Select one domain with visible global/local tension.

For example:

- Business Partner tax data;
- supplier classifications;
- customer sales attributes;
- payment terms;
- local registration data.

Include:

- one global model;
- two or three countries;
- one mapping workbook per country;
- representative datasets;
- several current local issues.

The pilot should prove that the team can:

1. Establish stable global objects.
2. Represent context explicitly.
3. Distinguish extension, override and deviation.
4. Generate country-specific views.
5. Compare local mappings with the global model.
6. Detect conflicting or duplicate rules.
7. Profile datasets by country.
8. Analyse impact in both directions.
9. Create a reviewable local proposal.
10. Preserve the approved decision.

The goal is not to harmonise every difference.

It is to make each difference visible and governed.

## What management should ask

1. What parts of the model are globally locked?
2. Which objects allow local overrides?
3. Which local requirements are permanent extensions?
4. Which differences are temporary deviations?
5. Does every local object reference a global parent or explain why none exists?
6. Are local requirements supported by evidence?
7. Can global changes identify affected countries automatically?
8. Can local changes identify enterprise integration and reporting impact?
9. Are contextual rules represented structurally rather than in comments?
10. Are temporary deviations reviewed?
11. Do local teams work from generated views or detached copies?
12. Can similar local requirements be compared across countries?
13. Who has authority to promote a local requirement into the global model?
14. Does AMS know which rule applies in each context?

If these questions require comparing dozens of country workbooks manually, the programme does not have controlled global/local modelling.

## Common mistakes

### Forcing one rule globally

Uniform implementation is not always correct standardisation.

### Accepting every local request

Local preference is not automatically a legitimate model variation.

### Copying the complete global model for each country

Copies make inheritance and impact analysis difficult.

### Using comments to represent applicability

Context should be explicit and queryable.

### Confusing source variation with business-model variation

Different source fields may populate the same global attribute.

### Treating temporary migration workarounds as local design

Deviations need expiry and remediation.

### Adding every local value to the global list

A global list needs shared semantics, not merely combined codes.

### Making local rules without global parents

This weakens traceability and future impact analysis.

### Requiring central approval for trivial local maintenance

Governance should be proportional to the object and risk.

### Letting AI merge similar local concepts automatically

Similarity is not proof of semantic equivalence.

## When a simpler approach is enough

A controlled workbook may be sufficient when:

- few countries are involved;
- the model is small;
- local variation is limited;
- one stable team owns design;
- changes are infrequent;
- impact is easy to assess.

The workbook should still identify:

- global object;
- context;
- variation type;
- owner;
- decision;
- applicability.

A registry becomes more useful when:

- many countries maintain separate copies;
- local rules change frequently;
- several partners work in parallel;
- mappings depend on local source systems;
- global changes repeatedly create local defects;
- handover spans several waves;
- impact analysis is manual.

## Our conclusion

The global template and local requirements are not natural enemies.

Conflict appears when the programme lacks a precise way to represent their relationship.

A global model should preserve:

- common meaning;
- shared identity;
- enterprise dependencies;
- protected standards.

A local model should express:

- contextual rules;
- legitimate extensions;
- local mappings;
- accountable ownership;
- temporary deviations.

The correct structure is not:

```text
One global model
or
many local models
```

It is:

```text
One shared model
with explicit contextual variation
```

Our practical test is:

> Can the programme show exactly how a local requirement inherits from, extends or overrides the global model—and what would be affected if either side changed?

When the answer is yes, global standardisation can coexist with local reality.

When the answer exists only in separate workbooks and ticket comments, the programme is not managing variation.

It is accumulating it.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We build practical model-governance infrastructure for SAP migration, MDG, MDM and AMS teams. Martenweave is designed to help global programmes preserve one shared model while representing local requirements, mappings and exceptions explicitly rather than through detached copies.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer supporting governed models, preserved semantics and relationships, collaborative workflows, validated values, centrally managed business rules, quality monitoring and auditable data changes.

Martenweave’s current public documentation describes structured model objects, deterministic validation, model and dataset gap detection, trace and impact analysis and reviewable PatchProposals.

The current open-source core includes canonical model files, generated indexes, dataset profiling, ownership and audit reports, spreadsheet review flows and a PatchProposal-to-ChangeRequest lifecycle.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
