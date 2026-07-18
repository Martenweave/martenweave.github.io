# How to Decide Whether a Local SAP Requirement Belongs in the Global Model

**Reviewed: 14 July 2026**

A country team requests a new field:

> Public-Sector Supplier Category must be added to the global Supplier model.

The request sounds credible. The country has a real reporting obligation, the current SAP design does not represent it, and testing cannot finish without a decision.

The global team asks whether other countries need the same field.

They do not.

The request is therefore rejected as local.

The country team creates a custom attribute in its own configuration and adds a local column to the migration workbook.

A year later, another country asks for Government Supplier Type. A third maintains Public Administration Classification in a source-system extension. Procurement analytics begins combining all three as though they mean the same thing.

The original requirement may have belonged in the global model after all.

Or it may have been a legitimate local extension that was implemented without enough structure.

The number of countries requesting something is not sufficient to decide.

One country may expose an enterprise concept before anyone else has recognised it. Ten countries may share the same temporary workaround without creating a valid global requirement.

The real question is not:

> Is this global or local?

It is:

> Which part of the requirement expresses shared business meaning, which part is contextual, and which part is merely an implementation response?

That distinction determines whether the organisation should:

- change the global semantic model;
- create a contextual extension;
- implement the global model differently in one country;
- approve a temporary deviation;
- reject the request as duplication or misuse.

A reliable decision cannot be made by counting countries, asking who escalated first or treating every legal reference as an automatic local exception.

It requires a disciplined comparison of meaning, scope, authority, data and consequences.

---

## The wrong binary

Global programmes often use a crude decision model:

```text
Global requirement
or
Local requirement
```

This creates avoidable conflict.

The global team fears fragmentation.

The local team fears that real operational needs will be ignored.

Both sides try to force the requirement into one category.

But a single request may contain several layers.

Consider:

> Portuguese regulated suppliers need a Compliance Review Status before activation.

This statement contains at least four possible decisions:

1. **Shared business concept:** an unresolved compliance review is different from final Supplier Risk.
2. **Contextual applicability:** the control currently applies to regulated suppliers in Portugal.
3. **Local process:** the Portuguese compliance team owns the review.
4. **Technical implementation:** SAP workflow and a local interface must carry the status.

The concept may deserve a global definition.

Its applicability may remain local.

The workflow may differ by country.

The interface change may be purely technical.

Calling the whole request “local” loses a reusable business concept.

Calling the whole request “global” may impose an unnecessary process on every country.

The decision should separate these layers rather than classify the request as one indivisible object.

---

# Four possible destinations for a local request

A useful governance process should route a requirement to one of four destinations.

## 1. Global semantic model

The requirement belongs here when it changes or clarifies shared business meaning.

Examples:

- a previously missing enterprise concept;
- a shared relationship between domains;
- a global identifier;
- a classification used across countries;
- a lifecycle state required by several processes;
- a distinction necessary for enterprise reporting.

The global model defines what the concept means.

It does not need to make the concept mandatory everywhere.

## 2. Contextual extension

The requirement belongs here when the concept is valid only in a defined jurisdiction, organisation, process or population.

Examples:

- local regulatory registration;
- country-specific identifier;
- regional approval state;
- local value governed by a local authority;
- additional attribute for one business model.

The extension should inherit the global model and declare its context explicitly.

## 3. Local implementation

The business meaning is already global, but the local system realises it differently.

Examples:

- different source field;
- local transformation;
- enrichment file;
- country-specific workflow route;
- translated label;
- local interface code conversion.

This should not create another business attribute.

## 4. Temporary deviation

The target model remains valid, but the country or source cannot support it yet.

Examples:

- source remediation delayed;
- migration-only default;
- temporary warning instead of blocking validation;
- manual review during one test cycle;
- excluded records pending enrichment.

The deviation needs an owner, restriction, expiry and convergence plan.

These four destinations are materially different.

Many model-governance problems arise because teams send implementation differences into the semantic model or store semantic differences as technical workarounds.

---

# The nine tests

No single test can determine whether a requirement belongs globally.

A practical assessment should use several independent tests.

## Test 1: Meaning

Ask:

> Does the requirement introduce a business concept that can be understood independently of the country requesting it?

Consider the proposed Public-Sector Supplier Category.

Possible meanings include:

- legal sector of the supplier;
- procurement classification;
- government ownership;
- reporting segment;
- tendering status.

These are not equivalent.

The first task is to define the concept without using the requested field name.

Weak definition:

> Category identifying public-sector suppliers.

Stronger definition:

> Classification indicating that the supplier is legally part of, owned by or controlled by a public-administration body under the governing jurisdiction.

The stronger definition can be tested across countries.

A concept can be globally defined even when the legal test for assigning it differs locally.

Conversely, a label that sounds universal may hide a country-specific process.

### Global signal

The meaning is stable across contexts even if applicability differs.

### Local signal

The meaning depends on one jurisdiction’s law, process or organisational structure and cannot be generalised without distortion.

### Warning signal

Different stakeholders use the same label for different concepts.

Do not promote the requirement until the semantic ambiguity is resolved.

---

## Test 2: Granularity

Ask:

> At which level does the concept exist?

Possible levels include:

- Business Partner;
- customer;
- supplier;
- legal entity;
- company code;
- sales area;
- purchasing organisation;
- plant;
- contract;
- address;
- country registration.

A common global–local error is not geographic. It is organisational.

One country requests a central supplier attribute because its source maintains one value.

The target process needs the value by purchasing organisation.

This is not merely a local mapping issue.

The source and target represent different granularities.

A concept should enter the global model only after its intended level is clear.

For example:

```text
Global semantic concept:
Supplier Public-Sector Classification

Granularity:
Supplier legal entity

Local determination:
Based on jurisdiction-specific legal evidence
```

The global model can preserve shared identity and granularity while local rules determine assignment.

---

## Test 3: Business consequence

Ask:

> Which decisions, processes or controls use the information?

A requirement is more likely to need global modelling when it affects:

- enterprise risk;
- compliance;
- consolidated reporting;
- cross-border procurement;
- global matching;
- shared workflow;
- distribution to several systems;
- AI or analytics consuming shared semantics.

A field used only for one local report may remain local.

But usage count alone is not decisive.

A legally critical value used by one country may still need rigorous contextual modelling.

The question is whether the information participates in shared enterprise behaviour.

Suppose Public-Sector Supplier Category controls:

- tendering workflow in one country;
- consolidated ESG reporting globally;
- restricted-payment approval in two regions.

The shared concept has wider consequences even though implementations differ.

---

## Test 4: Independence from current technology

Ask:

> Would the requirement still exist if the source system or SAP configuration changed?

This test separates business need from implementation workaround.

Examples of requirements that may disappear with technology:

- local field created because the source extract lacks a column;
- additional status created because the current workflow cannot represent pending review;
- duplicate value introduced because an interface accepts only one code list;
- country-specific attribute copied because the global field is not exposed on the screen.

If replacing the source or correcting configuration removes the need, the request probably does not belong in the semantic model.

A business concept should survive changes in implementation.

A technical constraint should be represented as implementation evidence, limitation or temporary deviation.

---

## Test 5: Cross-context recognisability

Do not ask only:

> How many countries requested this?

Ask:

> Would responsible owners in other contexts recognise the concept, even if they do not currently use it?

A requirement can be globally meaningful before it is widely implemented.

For example, Supplier Review Status may first appear in Portugal. Other countries may say:

- we have the same condition but track it in spreadsheets;
- our workflow carries it implicitly;
- we do not need it today, but the concept is understandable;
- we call it Due Diligence Status.

This suggests a shared concept with contextual applicability.

By contrast, another country may say:

> Our similarly named field represents a different legal classification.

This is evidence against premature harmonisation.

Recognition is stronger evidence than simple adoption count.

---

## Test 6: Variation pattern

Ask:

> Which parts are shared, and which parts genuinely vary?

A requirement may contain:

| Element | Shared globally | Contextual |
|---|---|---|
| Concept | Compliance review state | — |
| Core values | Pending, cleared, rejected | Additional local reason codes |
| Applicability | — | Regulated Portuguese suppliers |
| Owner type | Compliance function | Portuguese Compliance Owner |
| Workflow | General review principle | Local approval route |
| Evidence | Review must be supported | Country-specific documents |

This pattern supports a global concept with local extensions.

Another requirement may show no stable shared core.

For example, “Local Business Category” may mean unrelated things in every market.

Trying to create one global value list would produce superficial harmonisation and semantic confusion.

The model should globalise what is genuinely shared—not merely what uses a similar label.

---

## Test 7: Data evidence

Ask:

> What does current data reveal about the requirement?

Useful evidence includes:

- population size;
- frequency;
- value distribution;
- source coverage;
- country variation;
- relationships with other attributes;
- invalid or ambiguous cases;
- downstream usage.

Suppose a country requests a new Supplier Type value.

Dataset analysis shows that every affected supplier is already identified through an existing Legal Sector attribute.

The requirement may be a presentation or reporting issue rather than a missing model concept.

Alternatively, analysis may show that the local spreadsheet repeatedly combines two independent attributes because the global model cannot express the distinction.

That supports model change.

Data does not decide semantics.

It can expose duplication, hidden concepts and the practical size of the requirement.

SAP advises organisations to curate master data early because increasingly automated S/4HANA processes depend heavily on clean and correct data. Its current MDG positioning emphasises governed models, preserved semantics and relationships, profiling, matching, workflows, validated values and continuous quality monitoring.

A global–local decision should therefore use current population evidence rather than design opinion alone.

---

## Test 8: Reuse and distribution

Ask:

> Who needs to consume the concept, and can they interpret it consistently?

A concept is a stronger global candidate when it must be:

- replicated across systems;
- used in enterprise analytics;
- included in data products;
- compared across countries;
- exposed to shared services;
- used in common validation;
- available to agents or automated decisions.

The global model should define stable semantics.

Local applications may still use code conversion or subsets.

A local concept distributed globally without a canonical definition produces downstream ambiguity.

A global concept that no system outside one context uses may remain contextual until a broader need appears.

---

## Test 9: Reversibility

Ask:

> What happens if we classify this requirement incorrectly?

If a local field is later promoted globally, migration may be manageable.

If an incorrect local value is added to a widely used global classification, removing it may require:

- data conversion;
- report changes;
- interface revisions;
- historical reinterpretation;
- workflow redesign.

Similarly, forcing a shared concept into local extensions may create several incompatible populations that are expensive to harmonise later.

The less reversible the decision, the stronger the evidence and broader the review should be.

---

# A decision matrix

The nine tests can be summarised in a practical matrix.

| Signal | Global model | Contextual extension | Local implementation | Temporary deviation |
|---|---|---|---|---|
| Shared business meaning | Strong | Often | Already defined | Already defined |
| Context-specific applicability | Possible | Strong | Possible | Strong |
| Survives system replacement | Yes | Yes | No | Usually no |
| Enterprise consumers | Often | Limited or conditional | Same concept | Temporary |
| New semantic distinction | Yes | Yes | No | No |
| Source limitation is primary cause | Weak | Weak | Possible | Strong |
| Explicit expiry needed | No | Usually no | No | Yes |
| Global owner required | Yes | Joint | Existing owner | Existing owner plus risk owner |
| Local owner required | Sometimes | Yes | Yes | Yes |

The matrix guides analysis.

It should not produce an automatic answer.

A requirement may still need investigation where signals conflict.

---

# The global model does not mean globally mandatory

This distinction resolves many governance arguments.

A concept can belong in the global model while applying only in certain contexts.

For example:

```text
Global concept:
Supplier Compliance Review Status

Global semantics:
Represents progress and outcome of formal compliance review.

Permitted core values:
PENDING
CLEARED
REJECTED

Contextual applicability:
Defined by country, supplier category and regulatory population.
```

The model defines the concept globally.

Portugal may use it for regulated suppliers.

Germany may not use it.

Spain may later adopt it with a different workflow.

Global identity gives:

- common meaning;
- shared lineage;
- reusable reporting logic;
- stable integration semantics;
- controlled extension.

It does not require every record to carry a value.

This is more precise than choosing between “global field everywhere” and “country-specific field.”

---

# The local model does not mean unmanaged

A contextual extension remains governed.

It should identify:

- parent global domain or entity;
- local concept definition;
- jurisdiction or organisation;
- owner;
- effective dates;
- source and target implementation;
- value list;
- evidence;
- review triggers.

For example:

```yaml
id: ATTR-PT-SUPPLIER-PUBLIC-ADMIN-TYPE
type: Attribute
extends: ENTITY-GLOBAL-SUPPLIER

context:
  countries:
    - PT

definition: >
  Portuguese public-administration classification used
  for local regulatory reporting.

owner:
  - ROLE-PT-SUPPLIER-COMPLIANCE-OWNER

review_triggers:
  - regulation_changed
  - global_legal_sector_model_introduced
```

The local extension is explicit and searchable.

It does not require contaminating a global Supplier Type value list.

---

# Source weakness is not a local business requirement

This deserves a hard rule.

Suppose the global model requires Supplier Risk.

The Italian legacy system has only 55% coverage.

The country requests that Supplier Risk be optional in Italy.

The missing source does not prove that the business requirement differs.

Possible treatments include:

- source remediation;
- enrichment;
- review status;
- exclusion;
- temporary deviation;
- staged validation.

A permanent local override is justified only when the underlying business applicability genuinely differs.

Otherwise, every weak source creates a weaker model.

The correct decision may be:

```text
Global rule:
Unchanged.

Italian implementation:
Temporary enrichment.

Migration deviation:
Blocking validation delayed until remediation threshold is met.

Expiry:
Before UAT.
```

This preserves the target model while acknowledging delivery reality.

---

# Existing configuration is not proof of local policy

A local SAP system may already contain:

- custom field;
- custom value;
- Z-table;
- validation;
- workflow;
- enhancement.

That implementation is evidence of past behaviour.

It is not automatic proof that the requirement should survive.

The customisation may represent:

- valid local regulation;
- historical workaround;
- obsolete source limitation;
- duplicated global concept;
- abandoned process;
- developer convenience.

The investigation should reconstruct why the configuration exists before using it as target-model authority.

A migration programme that copies every legacy custom field into the new model is not preserving business value.

It is preserving uncertainty.

---

# A local legal requirement can still have a global parent

Country-specific regulation often determines applicability, evidence and values.

The underlying concept may still be shared.

Examples:

- tax registration;
- beneficial ownership;
- sanctions screening;
- public-sector classification;
- company registration;
- consent status;
- environmental certification.

The global model can define:

- concept identity;
- relationship to the entity;
- general lifecycle;
- common evidence pattern;
- ownership class.

The local extension defines:

- legal basis;
- applicable population;
- jurisdiction-specific values;
- validation;
- effective dates.

This reduces duplication without pretending that regulations are identical.

---

# The promotion threshold

When should a local extension become part of the global model?

Not when the second country requests it automatically.

Not only when every country agrees.

Promotion is justified when the organisation has enough evidence that shared modelling creates more clarity than local independence.

A proposed promotion should answer:

### Is there a stable shared meaning?

Countries may use different labels but describe the same concept.

### Is there an identifiable global owner?

Someone must own the canonical definition and shared lifecycle.

### Can local differences be represented through context?

If every country uses fundamentally different semantics, globalisation may be false.

### Will shared identity improve integrations, analytics or governance?

Global modelling should produce practical value.

### Can existing local data be migrated without destructive information loss?

Promotion may require preserving local details as extensions.

### Is the concept likely to persist?

Do not globalise a short-lived project workaround.

### Can the change be implemented without destabilising critical processes?

Impact analysis should precede promotion.

A useful lifecycle is:

```text
Local extension
→ repeated pattern identified
→ cross-context investigation
→ global concept proposal
→ impact and migration plan
→ global approval
→ controlled local convergence
```

Promotion is a model change, not a relabelling exercise.

---

# When a global request should be rejected

Global teams can also overreach.

A request may be labelled global because:

- a senior stakeholder wants one report;
- one source system is dominant;
- standardisation appears cheaper;
- the same field name exists in several systems;
- the implementation partner prefers one template.

Reject or narrow the request when:

- meanings differ materially;
- contexts cannot be represented without distortion;
- common values hide separate dimensions;
- local legal requirements would be lost;
- the proposed standard reflects one source rather than the business;
- no accountable global owner exists;
- downstream consumers do not need shared semantics.

Global consistency is not valuable when it standardises the wrong concept.

---

# Who decides?

The decision authority should depend on what is being changed.

## Local implementation owner

Can usually approve:

- local source mapping;
- code conversion;
- translation;
- configuration reference;
- local evidence attachment;
- non-semantic presentation.

## Local data owner

Should approve:

- local applicability;
- local operational ownership;
- jurisdiction-specific value meaning;
- remediation treatment.

## Global domain owner

Should approve:

- shared definition;
- global identity;
- cardinality;
- shared lifecycle;
- global value semantics;
- promotion from local to global.

## Architecture and integration owners

Should confirm:

- feasibility;
- cross-system impact;
- distribution;
- backward compatibility;
- implementation boundaries.

## Migration owner

Should confirm:

- current data support;
- affected population;
- timing;
- temporary treatment;
- cutover consequences.

## Risk or compliance authority

Should approve:

- legal interpretation;
- residual exposure;
- temporary control where relevant.

This is a federated decision.

The central team should not decide local legal meaning alone.

The country team should not alter enterprise semantics alone.

Collibra’s official governance guidance distinguishes centralised and federated authority structures and stresses the need for explicit operating models, domains, ownership and stewardship roles.

The same principle applies to SAP model decisions: authority should follow the semantic and operational consequence, not simply the organisational hierarchy of the requester.

---

# A review package that forces clarity

A local-to-global decision request should contain only the information needed to decide the destination.

## The requirement in one sentence

What is needed, without embedding the implementation.

## The shared concept candidate

Which business meaning might be global?

## The contextual part

What varies by country, organisation, process or population?

## The implementation constraint

Which part exists because of a current system limitation?

## Evidence

Dataset, regulation, incident, process or source definition.

## Existing model overlap

Which global and local objects may already represent the concept?

## Alternatives

- global concept;
- contextual extension;
- local implementation;
- temporary deviation;
- no model change.

## Impact

Systems, mappings, reports, workflows, tests and existing data.

## Recommendation

Selected destination and rationale.

## Convergence or review trigger

When should the decision be revisited?

This package is more useful than asking a governance board to approve a large country design document.

---

# Worked decision: Public-Sector Supplier Category

A country requests a new global Supplier Type value:

```text
PUBLIC_SECTOR
```

## First observation

The global Supplier Type values describe commercial relationship:

- STANDARD;
- STRATEGIC;
- REGULATED.

`PUBLIC_SECTOR` describes legal or institutional sector.

Adding it would mix classification dimensions.

## Cross-context review

Several countries need to identify government-controlled or public-administration suppliers, but use different legal tests.

## Decision

Do not extend Supplier Type.

Create a global Legal Sector attribute with a general `PUBLIC_SECTOR` concept.

Allow contextual evidence and subcategories by jurisdiction.

## Why global?

- the concept is recognisable across countries;
- enterprise reporting uses it;
- the core meaning is stable;
- local law determines assignment, not identity;
- several systems distribute the result.

## What remains local?

- legal evidence;
- detailed subcategories;
- validation;
- accountable local authority;
- effective dates.

The original local request revealed a global concept but proposed the wrong object.

---

# Worked decision: Portuguese compliance approval

Portugal requests a Compliance Review Status before supplier activation.

## Evidence

- requirement applies only to regulated supplier organisations;
- other countries have similar review processes but represent them inconsistently;
- Supplier Risk is a final classification and should not contain process states.

## Decision

Create a global Supplier Review Status concept.

Define Portuguese applicability and workflow through context.

## Global layer

- status meaning;
- core values;
- relationship to supplier;
- lifecycle;
- rule that unresolved status is not final risk.

## Portuguese layer

- applicable supplier types;
- review owner;
- required evidence;
- workflow route;
- activation rule.

This is not a globally mandatory field.

It is a globally defined concept with contextual use.

---

# Worked decision: Italian Payment Terms gap

The Italian source cannot provide Payment Terms reliably.

## Request

Make Payment Terms optional in Italy.

## Investigation

- the business requirement is unchanged;
- the target process needs Payment Terms;
- source replacement is planned;
- current population can be enriched.

## Decision

Keep the global attribute and requirement.

Approve temporary enrichment and a migration deviation.

## Why not local model change?

The difference is technical and temporary.

Creating an Italian model exception would convert source weakness into business policy.

---

# Worked decision: local tax identifier

A country requires a tax-registration number that does not exist elsewhere.

## Investigation

The value:

- has a country-specific legal format;
- is issued only by the local authority;
- is required only for local entity categories;
- does not participate in global matching;
- must be retained for local reporting.

## Decision

Create a local contextual attribute under the global Tax Registration structure.

## Why not global attribute?

The exact identifier has no cross-country identity.

## Why not unmanaged custom field?

It belongs to a shared Tax Registration concept and must be traceable to the supplier or customer entity, ownership and legal evidence.

---

# Worked decision: central source segment

A country proposes mapping one central CRM segment into a sales-area-specific Customer Group.

## Investigation

- meanings differ;
- granularity differs;
- no approved derivation exists;
- direct replication would affect commercial analytics.

## Decision

Do not add a local override and do not change the global target.

Treat the issue as a source-to-target model gap.

Use controlled enrichment until an authoritative treatment is approved.

The request does not belong in either the global or local semantic model.

It belongs in the migration treatment and decision backlog.

---

# How surrounding platforms fit

Martenweave should not frame this decision as something only SAP MDG can address.

Different platforms own different parts of the control system.

## SAP MDG

SAP currently positions MDG as a central governance layer unifying master data, policy and metadata, with one governed model, preserved semantics and relationships, validated values, stewardship workflows, data-quality monitoring and auditable change.

It can operationalise approved global and contextual rules.

The prior question remains:

> Which parts of the local requirement should become governed shared meaning?

Martenweave can preserve the evidence and decision that answer that question.

## Multidomain MDM platforms

Informatica positions MDM as a way to create trusted, consistent master records across domains and sources, surrounded by data integration, quality, cataloguing and governance capabilities.

Profisee likewise presents its MDM platform around multidomain modelling, governance, matching, stewardship and integration.

These platforms can implement global and contextual master-data structures.

They do not remove the need to distinguish:

- shared business concept;
- local applicability;
- source limitation;
- project-specific migration decision.

The decision should be portable enough to survive a platform change.

## Data-governance platforms

Collibra covers broader enterprise governance concerns: domains, ownership, business glossary, lineage, quality, policy and federated operating structures.

A global concept may be registered and governed there.

Martenweave’s narrower role is to connect it to:

- exact SAP and source endpoints;
- migration datasets;
- mappings;
- local extensions;
- decisions;
- proposal diffs;
- implementation evidence.

## Ticketing and service-management platforms

Jira or ServiceNow can manage:

- request;
- assignment;
- deadline;
- approval workflow;
- implementation tasks;
- incident follow-up.

They should not be the only place where global–local model identity is defined.

A closed ticket should remain linked to the enduring model decision.

---

# What Martenweave should make explicit

The current Martenweave Core describes a backend-first governance and evidence layer built on canonical model files, deterministic validation, generated indexes, gap analysis, trace, impact and human-reviewed proposals.

For global–local decisions, the model should represent relationships such as:

```text
defines_globally
applies_in_context
extends
implements
restricts
strengthens
temporarily_deviates_from
supersedes
promotes_to_global
```

A proposal should state its intended destination.

For example:

```yaml
proposal_type: contextual_extension

global_parent:
  - ENTITY-GLOBAL-SUPPLIER

local_context:
  countries:
    - PT
  supplier_types:
    - regulated

new_objects:
  - ATTR-SUPPLIER-REVIEW-STATUS

global_semantics_changed: false
```

Or:

```yaml
proposal_type: global_concept

originating_context:
  countries:
    - PT

global_semantics_changed: true

local_applicability:
  retained: true
```

This forces the proposer to distinguish semantic promotion from contextual implementation.

---

# Validation rules worth adding

Deterministic checks could detect:

- local object without global parent or explicit standalone justification;
- global object created without global authority;
- local requirement represented as duplicate global identity;
- temporary deviation without expiry;
- local override overlapping another active override;
- country value added to unrelated global dimension;
- local implementation incorrectly marked as semantic extension;
- global promotion with no migration path for existing local objects;
- active implementation linked to superseded decision;
- local object used outside its approved context.

These checks do not determine the correct business model.

They prevent poorly structured decisions from entering the registry unnoticed.

Martenweave’s existing principle—validate IDs, types, references and domain context before indexing—provides the right foundation.

---

# A decision board should receive one recommendation

The analysis should not end with four neutral options.

The author should recommend:

```text
Recommended destination:
Global concept with contextual applicability
```

and explain why:

```text
The review state has shared semantics and cross-country recognisability.
Portugal-specific population, evidence and workflow remain contextual.
A separate Portuguese attribute would duplicate a concept already present
informally in other countries.
```

The board may reject the recommendation.

But forcing the board to perform the entire analysis during the approval meeting creates delay and weak decisions.

---

# Warning signs that the classification is wrong

Revisit the decision when any of these appear.

## The “local” field is used by global reporting

It may contain a shared concept that was incorrectly localised.

## Several countries create near-duplicate fields

The global model may be missing a reusable concept.

## A global value requires country-specific explanations

The global value list may mix several dimensions.

## The local exception exists because data is incomplete

The requirement may be temporary rather than semantic.

## Nobody can name the global owner

The concept may not be ready for globalisation.

## The local owner cannot explain what differs from the global model

The extension may be a copied model rather than a bounded delta.

## The implementation disappears when a source is replaced

It was probably not a semantic requirement.

## Users cannot compare the value across countries

A global label may be hiding local meanings.

## The requirement has no exit or review condition

A workaround may be becoming permanent by default.

---

# The final decision checklist

Before placing a requirement into the global model, confirm:

- The business concept is defined independently of the requesting system.
- Its granularity and cardinality are clear.
- Shared meaning exists across contexts.
- A global owner can govern it.
- Enterprise consumers benefit from common identity.
- Contextual differences can be represented without distorting the concept.
- Existing local data can be migrated or related safely.
- Impact on mappings, rules, interfaces and reports has been assessed.
- The concept is not merely a response to source weakness or configuration limitation.

Before approving a contextual extension, confirm:

- A global parent or domain relationship is identified.
- The local meaning is genuinely additional or narrower.
- Context is machine-readable.
- Local owner and evidence are recorded.
- The extension does not duplicate another concept.
- Effective dates and review triggers exist.
- Global regression is understood.

Before classifying the requirement as local implementation, confirm:

- Business meaning already exists globally.
- The difference is physical, technical or procedural.
- No new semantic object is introduced.
- The local mapping or workflow remains traceable to the global object.

Before approving a temporary deviation, confirm:

- The target model remains valid.
- The deviation is necessary for a bounded period.
- Affected records are identifiable.
- Compensating control exists.
- Owner, expiry and convergence work are assigned.

---

# Final perspective

The choice between global and local is rarely a clean binary.

A local request can reveal:

- a missing global concept;
- a legitimate contextual extension;
- a local implementation difference;
- a temporary inability to comply;
- a duplicate or semantically incorrect proposal.

The quality of the decision depends on separating these possibilities.

A strong global model does not absorb every local detail.

A strong local model does not copy and modify global truth.

The model should be able to say:

> This concept is shared.

> This applicability is local.

> This implementation differs.

> This deviation expires.

That is the standard.

The practical test is:

> Could another country understand which part of the decision it may reuse without inheriting the original country’s law, source limitation or technical workaround?

When the answer is yes, the global–local boundary is well designed.

When the answer is no, the programme has either over-globalised a contextual requirement or localised a concept that should have been shared.

Martenweave’s opportunity is not to become another global-template tool.

It is to preserve the evidence, scope and model relationships that make this distinction reviewable.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects:

- global concepts;
- local extensions;
- source and target implementations;
- datasets;
- investigation cases;
- decisions;
- gaps;
- impact analysis;
- reviewed change proposals.

Its purpose is not to centralise every local detail.

It is to ensure that local reality can be represented without losing the shared meaning on which enterprise processes depend.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer that unifies master data, policy and metadata. Its stated capabilities include a governed model preserving semantics and relationships, profiling, matching, consolidation, workflow, validated values, business-rule monitoring and auditable data changes. SAP also distinguishes MDM from integration: integration distributes the current state of master data, while MDM governs and improves its quality.

Collibra’s official governance guidance describes data governance as an organisational discipline and highlights operating models, data domains, critical data elements, ownership and both centralised and federated authority structures.

Informatica positions MDM around creating trusted master records across sources and domains, supported by related integration, data-quality, cataloguing and governance capabilities.

Profisee presents its MDM platform as a multidomain environment for modelling, stewardship, governance, matching and integration of master data.

Martenweave Core currently uses canonical model files, deterministic validation, rebuildable generated indexes, dataset-gap analysis, trace, impact analysis and reviewable `PatchProposal` and `ChangeRequest` workflows.

Its documented workflow moves from evidence through validation, gap and impact analysis to human-reviewed GitHub-ready changes.

Martenweave is independent and is not affiliated with or endorsed by SAP, Collibra, Informatica, Profisee or other vendors named in this article. Product names and trademarks belong to their respective owners.
