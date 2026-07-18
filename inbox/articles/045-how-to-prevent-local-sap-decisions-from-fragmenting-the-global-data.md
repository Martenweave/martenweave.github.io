# How to Prevent Local SAP Decisions from Fragmenting the Global Data Model

**Reviewed: 14 July 2026**

A country team raises a reasonable request.

Portuguese supplier organisations require an additional compliance status before activation.

The global SAP model does not contain that status. The programme is approaching testing, and the local team cannot wait for another global design cycle.

A local field is added.

The field solves the immediate problem.

Six months later, Spain introduces a similar field with different values. Italy represents the same process through a workflow status. Germany adds a value to Supplier Risk instead of creating a separate attribute. One source system begins sending the Portuguese status globally because the interface does not preserve country context.

Every local decision had a practical reason.

Together they created four competing representations of the same business condition.

The programme now has:

- several definitions;
- several value lists;
- incompatible mappings;
- duplicated validation;
- country-specific interfaces;
- inconsistent reporting;
- no reliable way to determine which design should survive.

This is how global data models fragment.

It rarely begins with a deliberate decision to create several standards.

It begins with a sequence of justified local responses that were never represented as controlled extensions of a shared model.

> The objective of global model governance is not to eliminate local variation. It is to make every variation explicit, bounded, traceable and reversible.

A global model that ignores legitimate country and business requirements will not survive implementation.

A model that accepts every local solution without structure will stop being global.

The work is to distinguish necessary variation from uncontrolled divergence.

## Fragmentation is not the same as localisation

A local requirement may be entirely valid.

Examples include:

- country-specific tax identifiers;
- legally required classifications;
- regional payment methods;
- local organisational structures;
- market-specific reporting;
- source-system limitations during migration;
- temporary cutover treatment.

Localisation becomes fragmentation when the organisation cannot answer:

- Which global concept does this local element extend?
- Why is a separate local treatment required?
- Where exactly does it apply?
- What remains shared globally?
- Who approved the difference?
- Which systems implement it?
- When should it be reviewed or retired?
- What happens if another country requests something similar?

A properly governed local extension strengthens the model by representing reality.

An undocumented local copy weakens it by creating another truth.

## Four ways global models usually break

Fragmentation often appears through one of four patterns.

### A global object is copied and edited locally

The country takes the global Supplier model, adds several fields, changes definitions and maintains the result separately.

At first, this is convenient.

Later, a global rule changes. The local copy does not inherit it. Teams must compare two large models to determine what differs intentionally and what merely drifted.

### A local requirement is forced into an unrelated global field

The country needs a process status.

Instead of defining a contextual status attribute, it adds `UNDER_REVIEW` to a global risk classification.

The global object remains technically shared, but its meaning becomes unstable.

### A workaround is mistaken for a permanent requirement

A source cannot provide a field before cutover.

The programme introduces a local default.

The source is later replaced, but the default remains in mappings and operational data.

### Several local solutions address the same missing global capability

Each country implements its own version because no shared investigation or decision mechanism exists.

The organisation discovers the common pattern only after several implementations are live.

These failure modes require different treatment. A single rule such as “all countries must use the global template” is not sufficient.

## Start by protecting the global semantic core

A global model does not need to prescribe every implementation detail.

It should define the stable concepts that local extensions must not silently redefine.

For each important attribute, relationship or rule, the semantic core should state:

- business meaning;
- owner;
- identity;
- granularity;
- lifecycle;
- cardinality;
- global value semantics;
- authoritative context;
- permitted extension points.

Consider Supplier Risk.

The global semantic core may state:

```text
Supplier Risk is the approved final assessment of supplier exposure.

It is not:
- a workflow state;
- a migration-completeness indicator;
- a temporary review flag.

Granularity:
Supplier organisation.

Owner:
Global Supplier Risk Owner.
```

A country may still require:

- another review step;
- a local risk dimension;
- a regulatory indicator;
- a different approval threshold.

It should not use the global Supplier Risk attribute for those purposes unless the global meaning is formally changed.

The strongest global models are strict about meaning and flexible about controlled context.

## Use inheritance, not duplication

A local model should normally inherit from the global model.

Conceptually:

```text
Global Supplier Model
        ↓ inherited by
Portugal Supplier Context
        ↓ extends with
Local Compliance Review Status
```

The local context should contain only the difference:

- additional attribute;
- narrower rule;
- allowed local value;
- local source treatment;
- local ownership;
- effective dates.

It should not copy every global object.

This has an important consequence.

When the global definition changes, the local context receives the change unless it has an explicit override.

Without inheritance, every local model becomes a separate branch requiring manual reconciliation.

## Every local variation needs a type

Not all local differences are equivalent.

A useful classification separates at least six forms of variation.

### Local extension

Adds information that does not alter global meaning.

Example:

> Portuguese Tax Registration Type is added for the Portuguese supplier context.

### Contextual restriction

Makes a global rule narrower in a defined context.

Example:

> Supplier Classification is mandatory only for active strategic suppliers.

### Contextual strengthening

Adds an additional local requirement.

Example:

> Portuguese regulated suppliers require Compliance Review Status before activation.

### Approved semantic override

Changes the interpretation of a global element for a bounded context.

This should be rare because it weakens cross-country comparability.

### Temporary deviation

Allows a difference for a limited migration or operational period.

Example:

> ERP_B may leave Review Status pending during Mock Load 2.

### Implementation workaround

Changes technical behaviour without changing the approved model.

Example:

> A local enrichment file supplies an approved global attribute until the source is corrected.

The type determines how the variation should be reviewed and maintained.

A temporary workaround should not be governed like a permanent country attribute.

## Require a parent for every local object

A local object should either:

1. extend a global object;
2. implement a global object in a local system;
3. introduce a genuinely local concept with an explicit domain owner.

For example:

```text
Local object:
ATTR-PT-SUPPLIER-COMPLIANCE-STATUS

Relationship:
extends ATTR-GLOBAL-SUPPLIER-GOVERNANCE

Context:
Country = PT
```

Or:

```text
Local mapping:
MAP-ERP-PT-SUPPLIER-RISK

Relationship:
implements ATTR-GLOBAL-SUPPLIER-RISK

Context:
Source system = ERP_PT
```

An orphaned local object is a warning sign.

It may indicate:

- duplicate global concept;
- unresolved semantic overlap;
- undocumented workaround;
- missing global capability.

Requiring a parent does not mean every local field must have a direct global equivalent.

It means the organisation must state where the local concept belongs in the wider model.

## Scope must be machine-readable, not buried in prose

A note such as:

> This rule applies only in Portugal.

is too weak.

The model should represent scope explicitly.

Possible dimensions include:

- country;
- legal entity;
- company code;
- sales organisation;
- purchasing organisation;
- plant;
- business unit;
- source system;
- Business Partner category;
- role;
- record status;
- migration wave;
- effective dates.

For example:

```yaml
context:
  countries:
    - PT
  partner_categories:
    - organization
  partner_roles:
    - supplier
  supplier_types:
    - regulated
  effective_from: 2026-10-01
```

Machine-readable context supports:

- validation;
- impact analysis;
- conflict detection;
- dataset filtering;
- testing;
- reporting.

A local rule without explicit scope is effectively global by accident.

## Local teams should submit a difference, not a replacement model

A local request should explain the delta from the approved global state.

A useful request might say:

```text
Global state:
Supplier Risk records final risk classification.

Local need:
Portuguese regulated suppliers require an intermediate compliance review.

Proposed difference:
Add local Compliance Review Status.

Unchanged global behaviour:
Supplier Risk meaning and values remain unchanged.

Applicable context:
Portugal, supplier organisations, regulated population.

Implementation:
SAP workflow and local interface.

Review date:
After the first operational quarter.
```

This is far easier to govern than a local design document containing an entire alternative supplier model.

Reviewers can focus on the actual difference.

## The business case for variation should be visible

Local teams should not need to prove that global consistency is always more important than their operation.

They should explain why the variation is necessary.

Useful evidence may include:

- regulation;
- contractual obligation;
- process requirement;
- dataset structure;
- source limitation;
- business-volume impact;
- operational incident;
- language or address standard;
- existing local system behaviour.

The evidence should distinguish:

### Required difference

A local obligation genuinely cannot be represented by the current global model.

### Preferred difference

The local team prefers its existing process or terminology.

### Transitional difference

The local landscape cannot yet support the global model.

### Suspected difference

The team believes its requirement is unique, but comparison with other countries has not been performed.

These categories support a more honest governance discussion.

## Do not use “legal requirement” as an unexamined override

Local requirements are often justified as legal or regulatory.

Some are.

Others are:

- local interpretation;
- historic process;
- system limitation;
- internal control;
- preferred reporting practice.

The decision record should identify:

- the exact requirement;
- applicable population;
- evidence source;
- responsible legal or compliance reviewer;
- effective date;
- consequences of non-compliance.

The model-governance team should not provide legal interpretation.

It should require enough evidence to represent the approved requirement correctly.

## Compare the local need with existing global capabilities

Before creating an extension, ask whether the global model already supports the requirement through:

- context;
- optional attribute;
- relationship;
- value list;
- workflow;
- role;
- reference data;
- exception mechanism.

A local team may request a new attribute because the existing global attribute is poorly documented or not exposed in its current implementation.

The correct action may be:

- improve implementation;
- expose an existing object;
- add a local mapping;
- clarify ownership;
- fix configuration.

Creating another attribute would duplicate the concept.

## Search for the same need in other countries

A “local” requirement may be the first visible instance of a broader need.

Before approving a country-specific object, check:

- open gaps;
- investigation cases;
- decision library;
- local extensions;
- incident history;
- proposed values;
- source-system patterns.

Suppose Portugal requests Review Status.

Spain has an informal spreadsheet flag. Italy uses workflow status. Germany uses `UNDER_REVIEW` inside Supplier Risk.

This is evidence of a missing shared concept.

The correct result may be:

```text
Global concept:
Supplier Review Status

Local applicability:
Defined by country and supplier population

Local workflow:
May differ

Global semantics:
Shared
```

A good governance process uses local requests to improve the global model where repetition justifies it.

## Promote repeated local extensions deliberately

Not every repeated field deserves global promotion.

A local concept may become global when:

- several contexts need it;
- the meaning is sufficiently shared;
- a global owner exists;
- value semantics can be standardised;
- systems can consume it consistently;
- the cost of separate variants exceeds the value of local independence.

Promotion should be an explicit model change.

The process might be:

```text
Local extension
→ evidence from several contexts
→ cross-country investigation
→ global proposal
→ impact analysis
→ global approval
→ migration of local implementations
```

Do not simply rename one local object as global.

The local implementations may differ in important ways.

## Allow local implementation without local semantics

Countries often use different source systems and technical configurations while implementing the same global concept.

For example:

```text
Global attribute:
Payment Terms

Portugal source:
ERP_PT.ZTERM

Germany source:
ERP_DE.PAYMENT_CODE

France source:
MDM_FR.TERM_CLASS
```

Different mappings do not necessarily mean fragmented model truth.

Fragmentation occurs when the countries assign different meanings to the target without explicit contextual decisions.

The model should separate:

- global business concept;
- local physical representation;
- local transformation;
- target implementation.

This is where a project model registry adds value beyond a flat global template.

## Control value-list extensions

Value lists are a frequent source of hidden divergence.

Suppose the global Supplier Type values are:

- STANDARD;
- STRATEGIC;
- REGULATED.

A country requests:

- PUBLIC_SECTOR.

Before adding the value, ask:

1. Does it represent the same classification dimension?
2. Can a supplier be both strategic and public sector?
3. Is it a value or a separate attribute?
4. Is the concept local or globally relevant?
5. Will downstream systems interpret it correctly?
6. Does it change reporting and rules?

If `PUBLIC_SECTOR` describes legal-sector category while the existing values describe commercial importance, adding it to the same value list mixes dimensions.

The problem is not the local value.

The problem is the incorrect global object.

## Keep local labels separate from canonical values

Countries may need local terminology or translations.

That does not always require separate values.

For example:

```text
Canonical code:
PENDING_REVIEW

English label:
Pending review

Portuguese label:
Revisão pendente

German label:
Prüfung ausstehend
```

Creating country-specific codes because labels differ produces unnecessary mapping and reporting complexity.

Canonical identity and local presentation should be separate where possible.

## Use explicit override rules

Sometimes a local rule legitimately changes global behaviour.

The override should state:

- global rule;
- local rule;
- context;
- reason;
- authority;
- priority;
- effective dates;
- tests;
- review trigger.

Example:

```text
Global rule:
Tax Identifier required for supplier organisations.

Portuguese override:
Identifier not required for approved non-resident supplier category.

Priority:
Local override applies only when Country = PT
and Residency Status = Non-resident.

Owner:
Portugal Tax Data Owner.

Review trigger:
Change in local tax policy.
```

The system should be able to determine which rule is effective.

An override stored only in meeting minutes is not operational governance.

## Detect contradictory local decisions

Two local decisions may both be valid in their own context.

Conflict occurs when their scopes overlap.

Example:

```text
Decision A:
Supplier Risk mandatory for all active suppliers in PT.

Decision B:
Supplier Risk optional for non-strategic suppliers in Southern Europe.
```

If Portugal belongs to the Southern Europe context, both may apply.

The model needs a resolution mechanism:

- narrower context wins;
- explicitly higher-priority decision wins;
- conflict requires review;
- effective-date ordering applies.

Do not assume the latest decision always wins.

A later local workaround should not silently supersede a global policy.

## Make precedence simple enough to explain

A practical precedence order might be:

1. current approved global semantic definition;
2. approved domain rule;
3. approved contextual extension or override;
4. temporary deviation;
5. technical implementation;
6. observed data.

This order does not mean global always wins.

It means lower layers cannot silently redefine higher layers.

A local override can change applicable behaviour because it has been explicitly approved.

Current SAP configuration cannot change business policy merely because it exists.

Observed data cannot prove that a value is correct merely because many records contain it.

## Every deviation needs an expiry or review trigger

Permanent local requirements may not need an expiry date.

They still need review triggers.

Examples:

- regulation changes;
- source system replaced;
- global model adds equivalent capability;
- local process harmonised;
- incident volume increases;
- another country adopts the extension;
- downstream interface changes.

Temporary deviations require both:

- expiry;
- cleanup plan.

For example:

```text
Deviation:
ERP_PT may omit Compliance Status during Mock Load 2.

Control:
Affected records cannot activate.

Expiry:
Before UAT Cycle 1.

Cleanup:
Remediate records and remove migration exception.
```

Without cleanup, temporary deviation becomes local architecture.

## Test global behaviour as well as local behaviour

A local extension can work correctly in Portugal while breaking another context.

Testing should cover:

### Local positive case

The Portuguese regulated supplier follows the new review process.

### Local negative case

A Portuguese record missing required information is blocked.

### Global regression

German and Austrian suppliers retain existing behaviour.

### Out-of-scope case

Portuguese non-regulated suppliers are not incorrectly routed.

### Integration case

Consumers receive values only where the contract supports them.

### Reporting case

Global reporting does not treat local process status as global risk classification.

Testing only the local success path is insufficient.

## Keep dataset evidence contextual

A local requirement should be assessed against the applicable population.

Example:

```text
Portugal regulated suppliers:
4,280 records

Compliance Status available:
93%

Pending review:
280

Invalid values:
4
```

Do not evaluate the global supplier population and conclude that the local extension has negligible impact.

Likewise, do not generalise the Portuguese data pattern to every country.

The model and evidence should use the same scope definition.

## Assign two owners where necessary

A local extension may need:

- global semantic owner;
- local operational owner.

For example:

```text
Global owner:
Supplier Governance Owner

Local owner:
Portugal Compliance Data Owner
```

The global owner ensures that the extension does not corrupt shared meaning.

The local owner ensures that the requirement remains correct and operationally maintained.

Neither role should act alone for material semantic changes.

## Use a federated governance model, not central approval for everything

Pure centralisation causes delays and encourages teams to bypass governance.

Pure decentralisation produces incompatible models.

A federated structure can allocate decision authority by change type.

### Local owner may approve

- label translations;
- local source mappings;
- implementation references;
- local evidence;
- non-semantic presentation changes.

### Joint local and global approval

- local value extensions;
- contextual validation;
- local relationships;
- new local attributes;
- temporary deviations affecting global objects.

### Global approval

- global definitions;
- enterprise identifiers;
- shared value semantics;
- cardinality;
- global lifecycle;
- cross-country harmonisation;
- retirement of shared objects.

Collibra’s guidance describes governance operating models as centralised, decentralised or federated and emphasises defined roles, ownership, domains and governance structures. That broader governance principle applies here: authority must be distributed deliberately rather than left to whichever team can make the configuration change.

## A comparison with operational MDM platforms

SAP MDG is designed to govern master data through shared models, ownership, validated values, workflows, business rules, quality monitoring and audit trails. It can enforce approved global and contextual behaviour in operational master-data processes.

Informatica’s MDM offering similarly focuses on integrating sources, maintaining high-quality master records and connecting multiple data domains into enterprise views, with surrounding cataloguing, quality, integration and governance services.

These platforms are appropriate for:

- golden or mastered records;
- operational stewardship;
- matching and merging;
- workflow;
- data distribution;
- enterprise master-data processes.

They do not remove the project-level need to decide:

- whether a local field is genuinely new;
- whether it extends or duplicates a global concept;
- which migration evidence justifies it;
- whether a workaround should become permanent;
- how the local decision relates to canonical project knowledge.

Martenweave should complement those platforms by preserving the model rationale, evidence and controlled difference that precede or surround implementation.

## A comparison with data-governance platforms

A data-governance platform can provide:

- business glossary;
- ownership;
- domains;
- policies;
- metadata;
- lineage;
- quality;
- stewardship workflows.

Collibra positions its platform around cataloguing, governance, lineage, quality, privacy and a governance operating model with defined domains and ownership.

That is broader than Martenweave’s intended role.

Martenweave should not try to become the enterprise governance system for every data asset.

Its narrower contribution is to maintain:

- exact migration and MDM model objects;
- source and target endpoints;
- local inheritance;
- contextual overrides;
- dataset gaps;
- investigation cases;
- decision precedents;
- proposal-ready diffs;
- Git-verifiable model changes.

A global enterprise catalogue may contain the official business definition.

Martenweave can show how that definition is implemented and varied across a specific SAP migration landscape.

## Ticketing systems should carry work, not model identity

A local request may begin in Jira or ServiceNow.

The ticket should manage:

- assignment;
- urgency;
- due date;
- implementation;
- communication.

The controlled model difference should not exist only inside that ticket.

A robust relationship is:

```text
Local request ticket
→ investigation case
→ local or global decision
→ PatchProposal
→ implementation tasks
→ verification
```

Closing the ticket should not delete or obscure the approved model relationship.

## What Martenweave should represent

The current Martenweave core already treats canonical files as source of truth, generated indexes as rebuildable, deterministic validation as a gate and AI-assisted changes as reviewable proposals rather than automatic mutations.

To govern local variation well, the model layer should represent at least:

```text
GlobalObject
LocalExtension
Context
Override
Deviation
Decision
Evidence
Owner
PatchProposal
ChangeRequest
```

Important relationships include:

```text
extends
implements
overrides
restricts
strengthens
temporarily_deviates_from
supersedes
promotes_to_global
```

This is more useful than creating separate global and country folders with no formal connection.

## Deterministic checks can stop basic fragmentation

Validation can detect:

- local object without parent;
- overlapping active overrides;
- temporary deviation past expiry;
- local value duplicating global code;
- local object using a retired parent;
- global object changed without global authority;
- local extension missing context;
- configuration object linked to no current decision;
- local copy repeating the entire global object;
- promoted global concept still duplicated locally.

A validator cannot decide whether the Portuguese requirement is legitimate.

It can ensure that the requirement is represented in a governable way.

## The approval package should show the semantic delta

Reviewers should not need to compare entire repositories manually.

A local proposal should show:

### Shared global state

What remains inherited?

### Local delta

What is added or changed?

### Context

Where does it apply?

### Semantic consequence

Does global meaning change?

### Dataset consequence

Which records are affected?

### Implementation consequence

Which SAP, mapping, interface and test objects change?

### Convergence plan

Could the local difference later become global or be retired?

For example:

```text
Proposal:
Add Portugal Compliance Review Status.

Global objects changed:
None.

Global objects referenced:
Supplier, Supplier Risk, Activation Rule.

Local objects added:
Compliance Review Status.
Portugal Compliance Workflow Rule.

Affected population:
4,280 regulated supplier organisations.

Global regression:
No behaviour change outside Portugal.
```

This is a reviewable extension.

A document stating “Portugal requires additional status” is not enough.

## Three decisions from one local request

A local requirement may produce several distinct decisions.

### Semantic decision

Is this a new concept or an existing global concept in another form?

### Scope decision

Which country, population and lifecycle does it apply to?

### Implementation decision

How will SAP, source systems and interfaces realise it?

Combining all three into one approval creates confusion.

The global owner may approve the semantic relationship but not the local technical design.

The local owner may approve scope but not enterprise interface changes.

## Case study: a local value that should not be local

### Request

Germany requests `UNDER_REVIEW` in Supplier Risk.

### Investigation

The value describes incomplete process state, not risk.

Spain and Portugal have similar process needs.

### Decision

Do not add a local Supplier Risk value.

Create global Supplier Review Status with contextual applicability.

### Result

The local request improves the global model.

The countries may still implement different workflow routes.

The semantic concept remains shared.

## Case study: a legitimate permanent local extension

### Request

Portugal requires a regulatory supplier registration category not used elsewhere.

### Evidence

The category has a defined local legal basis, local owner and stable value list.

### Decision

Create a Portuguese contextual attribute linked to the global Supplier entity.

### Controls

- explicit PT context;
- no use outside Portugal;
- local owner;
- interface scope;
- annual regulatory review trigger;
- no change to global Supplier Type.

### Result

The model remains global while representing a real local requirement.

## Case study: a temporary source-system deviation

### Request

ERP_IT cannot provide global Payment Terms before cutover.

### Proposed local solution

Create an Italian Payment Terms attribute.

### Investigation

The business concept is identical. Only the source capability differs.

### Decision

Do not create a local attribute.

Use temporary enrichment to populate the global attribute.

### Controls

- affected records identifiable;
- local enrichment owner;
- expiry after source release;
- no new semantic object;
- verification against global value list.

### Result

Implementation differs temporarily without fragmenting the model.

## Case study: a local override that should be rejected

### Request

A country wants Supplier Classification optional because current completeness is low.

### Evidence

The business rule applies to the same strategic suppliers as elsewhere. The gap is caused by an incomplete source.

### Decision

Reject the permanent override.

Approve a temporary migration deviation with activation control and remediation deadline.

### Reason

Low data quality does not establish a different business requirement.

This distinction is essential.

Otherwise, every weak source produces a weaker local model.

## Case study: one label hiding two concepts

### Request

France asks for a different Customer Group value list.

### Investigation

The French values describe market segment, while the global Customer Group describes sales-processing treatment.

### Decision

Do not extend Customer Group.

Create or reuse a Market Segment attribute.

### Result

The apparent local variation is actually a separate business dimension.

The investigation prevents semantic contamination of the global object.

## A practical operating rhythm

Local-model governance does not require a large committee for every change.

A workable cadence can be:

### Continuous intake

Local requests enter with:

- problem;
- scope;
- evidence;
- proposed difference;
- urgency.

### Weekly triage

Classify as:

- implementation correction;
- local mapping;
- local extension;
- global gap;
- temporary deviation;
- policy question.

### Focused investigation

Only where meaning, context or overlap is unclear.

### Decision and proposal

Create the smallest appropriate local or global change.

### Validation and impact

Check structure, overlaps, dependencies and dataset consequences.

### Review

Route to roles derived from the change type.

### Verification

Confirm local implementation and global regression.

### Periodic convergence review

Look for:

- repeated local extensions;
- expired deviations;
- duplicate values;
- conflicting definitions;
- candidates for global promotion.

This last step prevents the model from accumulating local debt indefinitely.

## A local-model scorecard should expose concentration, not vanity metrics

Useful indicators include:

- active local extensions by domain;
- extensions without global parent;
- temporary deviations past expiry;
- repeated concepts across countries;
- local objects with no owner;
- conflicting contextual rules;
- global objects with many overrides;
- local treatments eligible for promotion;
- local copies that have drifted from global baseline.

A low number of local extensions is not automatically good.

It may mean local requirements are being hidden in configuration or spreadsheets.

The goal is visible, justified variation.

## What should never be centralised

Some elements belong locally:

- local legal references;
- source-system field mappings;
- local process ownership;
- translation;
- country implementation evidence;
- local remediation populations;
- operational procedures.

Attempting to centralise every detail creates a global model too large to use and too slow to govern.

The global layer should define shared semantics and boundaries.

Local layers should define contextual implementation and legitimate additional meaning.

## What should rarely be local

Some elements usually require global control:

- enterprise identifiers;
- core entity definitions;
- relationship identity;
- shared cardinality;
- global lifecycle states;
- cross-country reference values;
- semantics used by enterprise reporting;
- attributes distributed to many consumers.

Local changes to these objects can create effects far beyond the country that requested them.

They require broader impact analysis and authority.

## Questions that expose fragmentation early

When reviewing a local request, ask:

- Is this genuinely a different business concept?
- Does an existing global object already represent it?
- Is the difference semantic, contextual or merely technical?
- What evidence makes the requirement local?
- Which global object does it extend?
- Can scope be represented explicitly?
- Would another country recognise the same need?
- Does the proposal mix two classification dimensions?
- Is the request caused by poor source data?
- Is it permanent or transitional?
- What will inherit from the global model?
- Which global tests must remain unchanged?
- Can the extension be retired cleanly?
- What would justify promotion to the global model?

These questions are more useful than asking only:

> Does the country approve?

## The position Martenweave can own

SAP MDG and multidomain MDM platforms can govern and distribute approved master data. Enterprise governance platforms can organise domains, ownership, glossary, lineage and policy. Ticketing systems can manage work. Data-quality tools can measure local populations.

The unresolved delivery problem is often the connective tissue:

- why a country differs;
- which global object remains authoritative;
- whether the difference is semantic or technical;
- which evidence supports it;
- how the override is scoped;
- when it expires;
- what would be affected by changing it;
- whether repeated local needs justify global promotion.

Martenweave can own that layer without pretending to replace the surrounding platforms.

Its current core already supports canonical model files, deterministic validation, generated indexes, dataset-gap detection, trace, impact analysis and reviewable proposals.

The additional requirement is disciplined modelling of inheritance, context, overrides and deviations.

## Final perspective

A global data model does not stay global because the programme publishes a template.

It stays global because every local difference is related back to shared meaning.

A mature model can say:

- this is globally identical;
- this is implemented differently;
- this is locally extended;
- this is temporarily deviating;
- this local pattern should become global;
- this request should be rejected because it duplicates or corrupts an existing concept.

That is stronger than either extreme:

> Every country must follow the template exactly.

or:

> Every country may adapt the model as needed.

The first ignores reality.

The second creates fragmentation.

The practical standard is:

> Local freedom inside explicit semantic boundaries.

A country should be able to solve a legitimate problem without creating another independent version of Customer, Supplier, Product or Business Partner truth.

A global owner should be able to see local variation without blocking every implementation detail.

A later programme should be able to understand why the difference exists and whether it still deserves to exist.

That is what controlled global–local governance should deliver.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It is designed to connect:

- global model objects;
- local contexts;
- source and target endpoints;
- mappings;
- dataset evidence;
- investigations;
- decisions;
- overrides;
- temporary deviations;
- impact analysis;
- reviewable model changes.

The objective is not to eliminate local variation.

It is to prevent necessary local decisions from becoming disconnected, duplicated and permanent by accident.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer combining master data, policy and metadata, with governed models, preserved semantics and relationships, workflow, validated values, business-rule monitoring, quality management and auditable changes.

Collibra describes data governance as an organisational discipline supported by an operating model defining roles, responsibilities, domains, ownership and governance structures. Its published guidance recognises centralised, decentralised and federated governance structures.

Informatica describes MDM as the consolidation and maintenance of consistent, high-quality master records across sources and positions its MDM capabilities alongside cataloguing, integration, quality and governance services. It also describes multidomain MDM as connecting multiple domains into enterprise-wide views.

Martenweave Core currently uses canonical Markdown and YAML model files, deterministic validation, rebuildable SQLite and JSONL indexes, dataset-gap analysis, trace, impact analysis and human-reviewed `PatchProposal` and `ChangeRequest` workflows.

Its documented operating pipeline moves from evidence through proposal, validation, gaps and impact to human review and GitHub-ready output.

Martenweave is independent and is not affiliated with or endorsed by SAP, Collibra, Informatica or other vendors named in this article. Product names and trademarks belong to their respective owners.
