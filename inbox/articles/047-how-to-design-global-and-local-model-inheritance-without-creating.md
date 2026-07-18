# How to Design Global and Local Model Inheritance Without Creating Configuration Chaos

**Reviewed: 14 July 2026**

The global supplier model defines `Supplier Risk` as a mandatory final classification for active strategic suppliers.

Portugal adds a compliance-review status before activation.

Italy cannot provide the classification from its legacy source and introduces a temporary enrichment flag.

Germany adds `UNDER_REVIEW` directly to the Supplier Risk value list.

Spain copies the global validation and modifies it locally.

Each change works in its own implementation.

Then the global team changes the definition of an active strategic supplier.

Portugal’s local rule inherits part of the change. Spain’s copied rule does not. Germany’s new value is now interpreted as a final risk category by reporting. Italy’s temporary flag remains in the model after the source remediation is delivered.

Nobody can answer one basic question:

> What is the effective Supplier Risk model for each country?

The programme has global documentation, local specifications and functioning configuration. It does not have controlled inheritance.

This is where global–local governance often collapses. Teams agree that countries may extend a shared model, but they do not define what “extend” means operationally.

Without an inheritance contract, local teams typically choose one of two approaches:

- copy the global model and edit it;
- modify global objects with local values, notes and conditions.

The first creates drift.

The second corrupts shared semantics.

A usable inheritance model needs a third approach:

> Preserve one global semantic object, attach contextual differences as explicit deltas, and calculate the effective model through deterministic precedence rules.

This sounds technical, but the main problem is not software inheritance. It is governance.

The organisation must decide:

- which properties are inherited;
- which may be narrowed;
- which may be extended;
- which must never be overridden locally;
- how conflicts are resolved;
- how temporary differences expire;
- how inherited changes are tested.

The objective is not to reproduce object-oriented programming inside a data-governance repository.

It is to stop every country from becoming a partially disconnected version of the enterprise model.

---

# Start with an inheritance contract

Before building global and local layers, define the rules of inheritance.

A model object contains several kinds of information:

- identity;
- definition;
- domain;
- granularity;
- cardinality;
- lifecycle;
- ownership;
- value semantics;
- applicability;
- validation;
- source and target implementation;
- evidence;
- decisions.

These properties should not all inherit in the same way.

For each property, assign an inheritance policy.

A practical policy set is:

| Policy | Meaning |
|---|---|
| Fixed | Local contexts cannot change it |
| Inherited | Local context receives the global value unless explicitly permitted otherwise |
| Extendable | Local context may add values or relationships without removing the global core |
| Restrictable | Local context may narrow applicability |
| Strengthenable | Local context may add stricter requirements |
| Overridable | Local context may replace behaviour with explicit approval |
| Implemented locally | The semantic value is global, but physical implementation differs |
| Temporary deviation | Local context may differ until a defined expiry |

This table is the beginning of model governance.

Without it, “inheritance” becomes an informal expectation interpreted differently by each team.

---

# Some properties should remain fixed

A local model should rarely be able to redefine the identity of a shared business concept.

For a global attribute such as Supplier Risk, fixed properties may include:

- object ID;
- core business definition;
- classification dimension;
- granularity;
- cardinality;
- relationship to the Supplier entity;
- distinction from review or workflow status.

For example:

```text
Global object:
ATTR-SUPPLIER-RISK

Definition:
The approved final assessment of supplier exposure.

Granularity:
Supplier legal entity.

Cardinality:
One current final classification per supplier.

Not represented:
Review progress, migration completeness or workflow state.
```

Germany should not be able to redefine this as:

> Supplier risk or pending review state.

That is not a local extension. It is a semantic collision.

When a country needs another concept, it should add another contextual or global object rather than alter the dimension represented by the existing attribute.

This fixed semantic core is what makes cross-country comparison possible.

---

# Other properties should inherit automatically

Many global properties should flow into local contexts unless a permitted delta exists.

Examples include:

- default owner role;
- global lifecycle;
- global values;
- shared relationships;
- enterprise labels;
- general evidence requirements;
- baseline quality rules.

Suppose the global value list is:

```text
LOW
MEDIUM
HIGH
```

Portugal inherits all three.

It should not create a separate complete list:

```text
LOW
MEDIUM
HIGH
PENDING
```

because `PENDING` is not another risk level.

A better model is:

```text
Supplier Risk:
LOW
MEDIUM
HIGH

Supplier Review Status:
PENDING
CLEARED
REJECTED
```

The local context may make Review Status applicable only to regulated Portuguese suppliers, but it does not alter the inherited risk semantics.

---

# Extend only along declared extension points

A global model should expose explicit places where contextual additions are allowed.

Possible extension points include:

- local identifiers;
- local evidence types;
- jurisdiction-specific subcategories;
- translated labels;
- source-system mappings;
- additional validation;
- local workflow references;
- implementation references.

For example, the global Tax Registration model might allow:

```text
Global:
Registration jurisdiction
Registration type
Registration number
Validity period
Issuing authority
```

Portugal can then add:

```text
Portuguese registration subtype
Portuguese verification evidence
Local validation pattern
```

The extension remains related to the shared Tax Registration structure.

The country does not invent an unrelated custom field whose connection to the global model exists only in a design document.

---

# Restriction is safer than replacement

Local contexts often need to narrow a global rule.

Consider:

```text
Global rule:
Supplier Classification required for active strategic suppliers.
```

Portugal may restrict the applicable population:

```text
Country = PT
Partner category = Organisation
Supplier type = Strategic
Status = Active
```

This is a contextual restriction.

The global policy remains intact.

A replacement would be:

```text
Portuguese rule:
Supplier Classification optional.
```

That removes the original meaning without explaining why.

A local restriction should state:

- which part of the global applicability remains;
- which part is excluded;
- why;
- who approved the difference.

Restriction is not automatically legitimate, but it is easier to reason about than complete rule replacement.

---

# Strengthening should not change the original concept

A country may add stricter controls.

For example:

```text
Global:
Supplier Risk required before final approval.

Portugal:
Compliance Review Status must be CLEARED
before Supplier Risk can be approved.
```

Portugal strengthens the process.

It does not redefine Supplier Risk.

The effective model contains both rules:

```text
Global final-classification requirement
+
Portuguese pre-approval compliance condition
```

This is a common and valid inheritance pattern.

The danger begins when the local condition is encoded inside the global value list because that is technically easier.

---

# Overrides should be exceptional and visible

Sometimes a local context must replace inherited behaviour.

For example, a global tax rule may not apply to a particular legally defined non-resident category.

The override should be a first-class object or relationship, not a hidden condition in code.

A useful override record includes:

```yaml
id: OVR-PT-TAX-ID-NONRESIDENT

overrides:
  - RULE-GLOBAL-SUPPLIER-TAX-ID

context:
  countries:
    - PT
  residency_status:
    - NON_RESIDENT
  partner_categories:
    - ORGANISATION

replacement_behavior:
  tax_identifier_required: false
  exemption_evidence_required: true

authority:
  - ROLE-PT-TAX-DATA-OWNER

effective_from: 2026-10-01

review_triggers:
  - tax_regulation_changed
  - residency_model_changed
```

The override does not erase the global rule.

It declares where another result takes precedence.

This preserves both global intent and local authority.

---

# Local implementation is not inheritance of meaning

Different systems may represent the same concept differently.

For example:

```text
Global attribute:
Payment Terms

Germany source:
ERP_DE.ZTERM

Portugal source:
ERP_PT.PAYMENT_COND

France source:
MDM_FR.TERM_CODE
```

These are implementations of one inherited concept.

They may have different:

- field names;
- extraction logic;
- code conversions;
- source owners;
- data-quality profiles.

They should not create separate semantic attributes unless the meanings genuinely differ.

A clean model separates:

```text
Global business attribute
        ↓ implemented by
Local source endpoint
        ↓ transformed through
Local mapping
        ↓ represented by
Target endpoint
```

This is particularly important in SAP migration programmes, where each source often creates its own workbook row, transformation and defect history.

Physical diversity is expected.

Semantic duplication is not.

---

# Temporary deviation needs a clock

A temporary local deviation should not look like an ordinary inherited rule.

It needs:

- reason;
- scope;
- compensating control;
- owner;
- effective date;
- expiry;
- convergence action.

Example:

```yaml
id: DEV-IT-PAYMENT-TERMS-WAVE2

deviates_from:
  - RULE-GLOBAL-PAYMENT-TERMS-REQUIRED

context:
  countries:
    - IT
  migration_waves:
    - WAVE_2

temporary_behavior:
  allow_missing_value: true
  activation_allowed: false

reason:
  Source remediation unavailable before Mock Load 2.

expires_on: 2026-10-15

convergence_action:
  issue: MIG-1842
```

A deviation without expiry should fail validation.

A temporary exception that survives three releases is no longer a temporary exception. It is an unreviewed model change.

---

# Do not build inheritance by copying files

The simplest repository structure is often the most dangerous:

```text
global/supplier.yaml
pt/supplier.yaml
de/supplier.yaml
it/supplier.yaml
```

If each country file contains a full Supplier model, the organisation has created several independent snapshots.

The copied files may initially be identical.

They will diverge through:

- global changes not propagated;
- local comments interpreted as rules;
- different value orders;
- copied obsolete relationships;
- different owners;
- conflicting lifecycle states.

A better structure stores the global object once and local deltas separately:

```text
model/global/attributes/supplier-risk.md

model/contexts/pt/extensions/supplier-review-status.md
model/contexts/pt/overrides/tax-id-nonresident.md

model/contexts/it/deviations/payment-terms-wave2.md
model/contexts/de/mappings/supplier-risk-erp-de.md
```

The exact folder layout is secondary.

The principle is not:

> one complete model per country.

It is:

> one semantic model plus explicit contextual differences.

---

# The effective model must be calculated

The repository contains source objects and deltas.

Users and validators need the effective result for a given context.

For example:

```text
Context:
Country = PT
Partner category = Organisation
Supplier type = Regulated
Lifecycle = Active
Date = 2026-11-01
```

The resolver should combine:

1. global entity and attribute definitions;
2. inherited values and relationships;
3. Portuguese extensions;
4. applicable local restrictions;
5. applicable strengthening rules;
6. approved overrides;
7. active temporary deviations;
8. local implementation mappings.

The result might be:

```text
Supplier Risk:
Required

Supplier Review Status:
Required

Activation:
Blocked unless Review Status = CLEARED

Tax Identifier:
Required except approved non-resident category

Payment Terms:
Required

Source mappings:
Resolved by Portuguese source system
```

Without an effective-model resolver, users must mentally combine several documents and rules.

That is configuration chaos even if every file is individually well documented.

---

# Precedence must be deterministic

When multiple rules apply, the system needs a clear precedence model.

A practical hierarchy is:

```text
Fixed global semantics
        ↓
Global default behavior
        ↓
Contextual extension
        ↓
Contextual restriction or strengthening
        ↓
Approved explicit override
        ↓
Temporary deviation
        ↓
Physical implementation
```

This hierarchy does not mean a temporary deviation is more authoritative than global semantics.

It means that for its exact operational scope, it changes the effective behaviour while remaining visibly exceptional.

Precedence should use more than layer order.

It should also consider:

- context specificity;
- effective dates;
- status;
- explicit priority;
- superseding relationship.

A rule for:

```text
Country = PT
```

is less specific than:

```text
Country = PT
Partner category = Organisation
Residency status = Non-resident
```

When both apply, the narrower approved context should usually win.

But this principle should be encoded and documented rather than assumed.

---

# Never allow silent conflict resolution

Suppose two active rules apply:

```text
Rule A:
Supplier Risk required for all active Portuguese suppliers.

Rule B:
Supplier Risk optional for non-strategic Southern Europe suppliers.
```

A Portuguese non-strategic supplier satisfies both scopes.

The system should not simply select the newest file or the highest numerical priority without warning.

The conflict may reflect:

- legitimate override;
- overlapping governance authority;
- stale regional decision;
- ambiguous context design.

The resolver should return:

```text
Effective model unresolved

Conflicting rules:
RULE-PT-SUPPLIER-RISK
RULE-SEU-NONSTRATEGIC-RISK

Required action:
Approve precedence or narrow scope
```

A model that hides conflict produces apparently valid configuration built on unresolved governance.

---

# Inherited changes need compatibility checks

Changing a global object can affect every inheriting context.

Before approval, the impact analysis should identify:

- local extensions;
- local restrictions;
- overrides;
- deviations;
- mappings;
- datasets;
- tests;
- interfaces;
- decisions.

Consider adding a global value:

```text
CRITICAL
```

The change may affect:

- local reporting;
- interface contracts;
- validation;
- workflows;
- country translations;
- historical mappings;
- downstream systems that accept only three values.

The proposal should not ask only:

> Is `CRITICAL` a valid new risk value?

It should also ask:

> Can every inheriting context safely receive it?

Martenweave’s current core already includes trace and impact analysis across canonical objects and generated indexes.

Global–local inheritance should make contextual dependencies part of that impact graph.

---

# Local changes need global regression checks

A Portuguese extension can break the global model even when its context is correct.

Possible failures include:

- local value leaking into global interface;
- override applied without country filter;
- local field reused in common reporting;
- changed value-list validation affecting all records;
- copied global rule diverging silently.

Every material local proposal should test:

```text
Local positive behavior
Local negative behavior
Local out-of-scope behavior
Global regression
Interface containment
Reporting containment
```

For example:

```text
Portuguese regulated supplier:
Review Status required.

Portuguese ordinary supplier:
Review Status not required.

German supplier:
No behavior change.

Global Supplier Risk:
No new value introduced.

Outbound interface:
Local status sent only to consumers that support it.
```

Local success is not enough.

The extension must remain contained.

---

# Ownership should also inherit—but not disappear

A global object may have a global owner.

A local context may add a local operational owner.

For example:

```text
Global Supplier Risk owner:
Global Supplier Governance Owner

Portuguese Review Status owner:
Portugal Compliance Data Owner

Portuguese mapping owner:
ERP_PT Migration Lead
```

The inheritance rules should make accountability visible.

The local owner cannot redefine global semantics alone.

The global owner should not be responsible for daily Portuguese operational review.

Collibra’s current governance guidance emphasises explicit operating models, domains and ownership, including federated structures with multiple groups of authority.

Global–local inheritance is one practical application of that federated principle: authority is divided by semantic and contextual responsibility rather than centralised indiscriminately.

---

# SAP MDG can enforce the result, but it should not be the only specification

SAP currently presents Master Data Governance as a central governance layer with one governed model, preserved semantics and relationships, validated values, ownership, workflow, business-rule monitoring, quality management and auditability.

Those capabilities can operationalise:

- shared attributes;
- contextual validations;
- local workflow;
- ownership;
- controlled change.

But SAP configuration alone is a weak source for inheritance intent.

A BRFplus rule, derivation, change-request step or custom field may show what the system does.

It may not explain:

- whether the behaviour is global or local;
- which global object it extends;
- whether it is temporary;
- which decision authorised it;
- which contexts inherit it;
- what should happen outside SAP.

The inheritance specification should exist independently enough to guide migration, MDG configuration, integrations, tests and AMS.

SAP MDG is an implementation and governance platform.

It should not be forced to carry the entire project reasoning implicitly.

---

# MDM platforms solve operational consistency, not every project inheritance question

Informatica currently describes its MDM and 360 capabilities around integrating data from multiple sources, maintaining high-quality records and connecting multiple domains into an enterprise-wide view. It also positions MDM alongside cataloguing, integration, quality and governance services.

Profisee presents an MDM platform with modelling, rules, workflows, stewardship, integration and quality/governance capabilities.

These platforms can implement sophisticated multidomain and contextual structures.

The project still needs to determine:

- which property is global;
- which difference is contextual;
- which local representation implements the same concept;
- which deviation is temporary;
- how migration evidence supports the decision;
- how source and target model history is preserved.

The inheritance contract should remain portable.

If the organisation later changes MDM platform, it should not have to reverse-engineer the global–local model exclusively from proprietary configuration.

---

# Data catalogues and governance platforms sit above a broader landscape

An enterprise governance platform may contain:

- global business terms;
- domains;
- ownership;
- policies;
- technical lineage;
- certification;
- quality status.

That broader context is useful.

Martenweave should not duplicate all of it.

Its inheritance layer should link enterprise meaning to exact delivery objects:

```text
Global business attribute
→ local contextual extension
→ source endpoint
→ mapping
→ dataset evidence
→ SAP target
→ validation
→ decision
→ change proposal
```

This is a lower-level, delivery-facing problem than a general business glossary.

The two layers should complement one another.

---

# Model inheritance needs version discipline

A local context should state which global baseline it inherits.

Example:

```text
Portugal Supplier context:
inherits global supplier model v3.4
```

After a global release:

```text
Global supplier model v3.5 available
```

The system should determine:

- automatically compatible;
- requires local review;
- blocked by conflict;
- explicitly deferred.

A context should not remain on an older global baseline silently.

Possible states include:

```text
Current
Review required
Upgrade blocked
Approved deferral
Obsolete
```

An approved deferral should have:

- reason;
- owner;
- risk;
- target date.

This prevents local contexts from becoming hidden long-lived branches.

---

# Use semantic versioning carefully

Traditional software semantic versioning does not map perfectly to business models.

Still, changes can be classified.

### Compatible extension

Adds an optional object or value that does not invalidate existing behaviour.

### Context-impacting change

Changes applicability, validation or ownership for some contexts.

### Breaking semantic change

Changes definition, granularity, cardinality or meaning.

### Retirement

Removes or deprecates an object or value.

The classification helps determine review scope.

A new optional description field may need limited review.

Changing Customer Group from central to sales-area granularity requires a migration and implementation assessment.

---

# The “override budget”

Every override increases maintenance cost.

A model with ten local extensions may be manageable.

A model with two hundred overlapping overrides may technically resolve correctly but remain operationally unreadable.

Track:

- overrides per global object;
- countries using overrides;
- duplicated override patterns;
- expired deviations;
- contexts on old baselines;
- objects with several precedence layers;
- rules with unresolved conflicts.

An object with many overrides may indicate:

- poor global abstraction;
- concept mixing;
- excessive centralisation;
- unmanaged legacy differences;
- need for decomposition.

This does not mean every frequently overridden object is badly designed.

It means it deserves investigation.

A useful question is:

> Is the global object stable, or are local teams repeatedly correcting a design that does not represent reality?

---

# Collapse repeated deltas into reusable contextual patterns

Several countries may need the same extension with different applicability.

Instead of copying the extension three times:

```text
PT Supplier Review Status
ES Supplier Review Status
IT Supplier Review Status
```

define one reusable concept:

```text
Supplier Review Status
```

and separate contexts:

```text
PT applicability and workflow
ES applicability and workflow
IT applicability and workflow
```

The semantic model remains shared.

The process details remain contextual.

This reduces duplication without forcing identical operations.

---

# Do not over-normalise local reality

The opposite failure is creating an abstraction so generic that nobody can use it.

For example:

```text
Generic Local Regulatory Status
```

may combine:

- tax validation;
- sanctions review;
- public-sector classification;
- environmental certification.

The object is globally reusable only because it means almost nothing.

Inheritance should preserve genuine shared meaning.

Do not create abstract parent objects merely to satisfy a hierarchy.

A local standalone concept is sometimes more honest than a false global abstraction.

---

# Worked inheritance chain: Supplier Review

The global supplier model contains:

```text
Supplier Risk
Supplier Status
Supplier Activation Rule
```

Portugal requests an additional compliance review.

A sound inheritance design is:

```text
Global:
Supplier Review Status
- PENDING
- CLEARED
- REJECTED

Portugal context:
Applicable to regulated supplier organisations

Portugal strengthening rule:
Activation requires Review Status = CLEARED

Portugal implementation:
Local compliance workflow and interface mapping
```

What does not happen:

- Supplier Risk receives `PENDING`;
- the full Supplier model is copied;
- a Portuguese supplier entity is created;
- the activation rule is rewritten without reference to the global rule.

The effective Portuguese model is richer than the global default but remains semantically compatible.

---

# Worked inheritance chain: Italian source deviation

The global model requires Payment Terms.

Italy’s legacy source is incomplete.

The inheritance design is:

```text
Global:
Payment Terms required.

Italian implementation:
Local source mapping.

Temporary deviation:
Missing value allowed in Mock Load 2.
Activation blocked.
Controlled enrichment required.

Expiry:
Before UAT.
```

What does not happen:

- Italian Payment Terms becomes a different attribute;
- the global rule becomes optional;
- a permanent local override is approved because of current data quality.

The model preserves policy while allowing bounded delivery reality.

---

# Worked inheritance chain: Portuguese tax exemption

The global rule requires Tax Identifier for supplier organisations.

Portugal has an approved non-resident exemption.

The inheritance design is:

```text
Global rule:
Tax Identifier required.

Portuguese override:
Not required for approved non-resident organisations.

Additional local rule:
Exemption evidence required.

Effective model:
Global requirement applies unless the narrower approved context matches.
```

The override is legitimate because it changes applicability, not meaning.

It is explicit and testable.

---

# Worked inheritance failure: German `UNDER_REVIEW`

Germany adds `UNDER_REVIEW` to Supplier Risk.

The global value list is inherited by other contexts and interfaces.

Consequences:

- analytics treats `UNDER_REVIEW` as a final risk level;
- another country begins using it as a migration default;
- rules comparing LOW, MEDIUM and HIGH no longer cover all values;
- data cannot distinguish process status from final classification.

The correct repair is not merely to mark the value local.

It is to:

1. investigate the concept;
2. create or reuse Supplier Review Status;
3. migrate affected records;
4. remove the invalid value;
5. update interfaces and reports;
6. preserve the decision explaining the semantic split.

---

# What Martenweave should calculate

The current Martenweave Core is built around canonical model files, deterministic validation, rebuildable generated indexes, dataset-gap analysis, trace, impact analysis and reviewable proposals.

A global–local inheritance capability should add an effective-model resolution step.

Conceptually:

```text
martenweave resolve \
  --repo ./model \
  --context country=PT \
  --context partner_category=organisation \
  --context supplier_type=regulated \
  --date 2026-11-01
```

The command is a product direction, not a claim about the current CLI.

The output should include:

- inherited objects;
- contextual additions;
- restrictions;
- strengthening rules;
- overrides;
- deviations;
- conflicts;
- source mappings;
- decision references;
- baseline versions.

The same resolution logic should support:

- validation;
- UI inspection;
- dataset readiness;
- impact analysis;
- testing;
- generated documentation.

There must be one resolver.

Do not let the CLI, UI and documentation calculate effective behaviour differently.

---

# Validation rules that matter

A first implementation should detect:

- local extension without a declared parent or standalone justification;
- fixed property overridden locally;
- context missing from a local rule;
- two active overrides with overlapping scope;
- temporary deviation without expiry;
- context inheriting an obsolete global baseline;
- local implementation creating a duplicate semantic object;
- local value violating the global classification dimension;
- override authorised by the wrong governance role;
- global change with unreviewed inheriting contexts;
- local delta referencing a retired global object;
- conflict resolved only by file order.

These are structural checks.

They do not decide whether the business requirement is correct.

They make an incorrect or incomplete inheritance design visible before configuration and data are changed.

---

# The review view should show resolved behaviour

Reviewing only the delta is not enough.

A reviewer should see both:

### Proposed delta

```text
Add Portugal non-resident tax exemption.
```

### Resulting effective model

```text
Portuguese resident supplier organisation:
Tax Identifier required.

Portuguese non-resident supplier organisation:
Tax Identifier optional.
Exemption evidence required.

German supplier organisation:
No change.
```

This is the real decision surface.

A small override can have a large effective consequence.

Conversely, a large-looking local specification may have little semantic impact because it only adds mappings and labels.

Review should focus on resulting behaviour.

---

# A practical repository design

A lightweight canonical structure could distinguish:

```text
model/
  global/
    entities/
    attributes/
    rules/
    values/
    decisions/

  contexts/
    pt/
      extensions/
      overrides/
      deviations/
      mappings/
      evidence/

    de/
      extensions/
      overrides/
      deviations/
      mappings/
      evidence/
```

Generated outputs might include:

```text
.generated/
  effective/
    pt/
    de/
    it/

  conflicts/
  impact/
  indexes/
```

Generated effective models must remain disposable.

The canonical truth is:

- global objects;
- contextual deltas;
- decisions;
- evidence.

This aligns with Martenweave’s existing principle that generated SQLite and JSONL indexes are rebuildable from canonical files.

---

# The smallest useful delivery slice

Do not begin with every inheritance pattern.

Start with:

1. one global attribute;
2. one contextual extension;
3. one restriction;
4. one temporary deviation;
5. two countries;
6. effective-model rendering;
7. conflict validation;
8. impact report.

A realistic pilot could use Supplier Risk:

```text
Global:
Supplier Risk and mandatory rule.

Portugal:
Supplier Review Status and strengthening rule.

Italy:
Temporary source deviation.

Germany:
No local delta.
```

Acceptance should prove:

- Portugal receives global semantics plus local review control;
- Italy receives global semantics plus temporary bounded deviation;
- Germany receives only the global model;
- a global definition change identifies all three contexts;
- an overlapping override fails validation;
- effective models can be generated reproducibly.

This vertical slice proves the inheritance mechanism.

It avoids building a generic rules engine.

---

# What should remain outside Martenweave

Martenweave should not become:

- a full SAP configuration engine;
- a replacement for SAP MDG workflow;
- an enterprise policy-management platform;
- a generic application configuration framework;
- a runtime rules engine;
- a multidomain MDM replacement.

Its role is to specify and validate model inheritance before and around implementation.

Operational platforms still enforce the result.

Ticketing tools still manage delivery.

Enterprise catalogues still provide broader discovery and policy context.

Martenweave keeps the inheritance decision traceable to:

- canonical objects;
- context;
- evidence;
- impact;
- proposal;
- Git history.

---

# Questions worth asking before approval

For a global object:

- Which properties are fixed?
- Which are extendable?
- Which may be restricted or strengthened?
- Which local contexts currently inherit it?
- What would break if it changed?

For a local delta:

- Is this semantic, contextual, technical or temporary?
- Which global object does it relate to?
- Does it add meaning or merely implementation?
- Is its scope machine-readable?
- Does it conflict with another active rule?
- Who has authority?
- What is the resulting effective model?
- Which global regression tests are required?

For the whole inheritance system:

- Can effective behaviour be calculated deterministically?
- Can conflicts remain hidden?
- Can temporary deviations outlive expiry?
- Can a context silently remain on an old baseline?
- Can local values leak into global reporting?
- Can another team explain why the delta exists?

---

# Final perspective

Global–local inheritance is not solved by folders, naming conventions or a country column.

It is solved when the organisation defines:

- one stable semantic core;
- explicit extension points;
- bounded contextual deltas;
- deterministic precedence;
- visible conflicts;
- reviewable effective behaviour;
- controlled upgrade and expiry.

The central rule is:

> Inherit meaning. Extend context. Vary implementation. Time-limit deviation.

A local model should not be a copy of the global model.

A global model should not be a container for every local value and exception.

The effective model should be generated from the relationship between them.

This is what prevents configuration chaos.

The practical test is:

> Can the programme calculate and explain the effective model for one supplier in one country on one date, including every inherited rule, local extension, override and temporary deviation?

When the answer is yes, global–local governance is operational.

When the answer requires several architects to compare spreadsheets and SAP configuration manually, inheritance exists only as an intention.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects:

- global semantic objects;
- contextual extensions;
- local implementations;
- temporary deviations;
- source and target endpoints;
- datasets;
- decisions;
- impact;
- reviewable model changes.

The goal is not to create another configuration platform.

It is to make inherited model behaviour explicit before it becomes scattered across mappings, SAP rules, local workbooks and production exceptions.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer with a governed model across business entities, preserved semantics and relationships, profiling, matching, consolidation, workflow, validated values, business-rule monitoring and auditable changes.

Informatica currently positions its MDM and 360 capabilities around integrating data from multiple sources, maintaining high-quality master records and connecting multiple domains into enterprise-wide views, alongside cataloguing, integration, quality and governance services.

Profisee presents its MDM platform around modelling, rules, automated workflows, stewardship, integration and data-quality governance.

Collibra’s current governance guidance describes operating models with explicit roles, responsibilities, domains and ownership, including centralised and decentralised or federated authority structures.

Martenweave Core currently uses canonical Markdown and YAML model files, deterministic validation, rebuildable SQLite and JSONL indexes, dataset-gap analysis, trace, impact analysis and human-reviewed `PatchProposal` and `ChangeRequest` workflows.

Its current documented pipeline moves from evidence through proposal, validation, gaps and impact to human review and GitHub-ready changes.

Martenweave is independent and is not affiliated with or endorsed by SAP, Informatica, Profisee, Collibra or other vendors named in this article. Product names and trademarks belong to their respective owners.
