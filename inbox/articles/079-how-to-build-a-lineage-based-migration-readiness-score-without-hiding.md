# How to Build a Lineage-Based Migration Readiness Score Without Hiding Risk

**Reviewed: 14 July 2026**

A migration dashboard shows:

```text
Overall readiness: 92%
```

The programme reports green status.

Most fields are mapped.

Most records load successfully.

Most validation checks pass.

Then the details emerge:

- supplier bank data is only partially verified;
- one Product Plant Mapping uses a broad default;
- several Cost Centres have invalid go-live dates;
- a mandatory tax identifier has no authoritative source for one country;
- customer partner-function counts reconcile, but some roles belong to the wrong Sales Area;
- the only evidence for a critical interface comes from an obsolete mock load.

The score is mathematically correct according to its formula.

It is operationally misleading.

The main problem is not that readiness was calculated.

The problem is that weak and strong evidence, critical and optional fields, direct and fallback paths, and blockers and warnings were averaged into one reassuring number.

> A migration-readiness score should summarise evidence without allowing aggregation to hide a critical break in lineage.

Lineage provides a better foundation than simple field-completion metrics because it evaluates the whole path:

```text
source
→ dataset
→ Mapping
→ business Attribute
→ SAP endpoint
→ Rule
→ evidence
→ downstream use
```

A target field can be populated while this path remains incomplete.

A Mapping can exist while its source is unavailable.

A Rule can be documented while its implementation has not been tested.

A fallback can improve completeness while increasing business risk.

A serious readiness score must reflect those differences.

Martenweave already positions deterministic validation, dataset-gap detection, lineage, impact analysis and human-approved PatchProposals as parts of one backend-first governance pipeline. It also exposes health and scorecard commands alongside dataset-readiness, trace and impact operations.

The correct next step is not to create a more decorative dashboard.

It is to define a score whose components remain explainable and whose blockers cannot be averaged away.

---

# Readiness is not completeness

Completeness asks:

> Is a value present?

Readiness asks:

> Is the value available, correctly interpreted, properly transformed, valid for the target context, supported by evidence and safe to use?

Consider Product Plant MRP Type.

A load file contains a nonblank value for every Product Plant record.

Completeness is 100 percent.

But suppose:

- 76 percent came from an approved direct conversion;
- 14 percent came from an approved plant-specific lookup;
- 10 percent received a global default of `PD`;
- the default has not been approved for two plants.

The target field is complete.

The migration path is not fully ready.

A readiness score should therefore separate:

```text
technical completeness
from
governed conformance
```

The first is useful.

The second determines whether the result can be trusted.

---

# A score is a summary, not a verdict

One number can help compare:

- migration objects;
- domains;
- waves;
- model versions;
- progress over time.

It should not replace the underlying findings.

A score of 84 may result from:

- many minor warnings;
- one critical unresolved bank-data issue;
- low evidence coverage;
- several missing optional fields;
- one untested interface;
- broad use of defaults.

These situations require different decisions.

Every score should therefore be accompanied by:

- readiness verdict;
- critical blockers;
- dimension scores;
- evidence confidence;
- affected scope;
- trend;
- explanation.

The number helps navigation.

The findings govern release decisions.

---

# Start with a readiness verdict

Before calculating a percentage, define the possible verdicts.

A practical set is:

## Ready

No blocking condition exists. Critical paths are sufficiently evidenced for the declared scope.

## Ready with warnings

No blocker exists, but bounded risks or incomplete low-criticality evidence remain.

## Conditionally ready

Release is possible only under explicit conditions, temporary controls or accepted residual risk.

## Blocked

At least one release-gate condition is unresolved.

## Not assessed

Evidence is too incomplete to provide a defensible verdict.

Martenweave’s current dataset-readiness workflow already produces `ready`, `ready_with_warnings` or `blocked` outcomes while combining validation, indexing, profiling and gap detection.

A broader lineage-based model can extend this pattern without reducing everything to a percentage.

---

# Blockers must override averages

Suppose a Supplier migration receives these scores:

| Dimension | Score |
|---|---:|
| Source availability | 98 |
| Mapping coverage | 96 |
| Target persistence | 99 |
| Evidence coverage | 90 |
| Downstream verification | 88 |

The weighted result may be 95.

Now add one condition:

```text
Supplier bank-account ownership is not verified
for 3,400 active suppliers.
```

The migration should not become ready because unrelated dimensions score well.

The correct result may be:

```text
Score: 95
Verdict: Blocked
Reason: Critical bank-data ownership control unresolved
```

This is not contradictory.

The score measures aggregate preparation.

The verdict applies release policy.

---

# Define critical-path assertions first

A readiness model should begin with deterministic assertions, not weights.

Examples:

```text
Every mandatory SAP target Attribute
must have at least one approved source or creation path.
```

```text
Every critical Mapping
must have current evidence for its required context.
```

```text
No active fallback may be used outside its approved scope.
```

```text
Every Supplier bank account
must have a traceable ownership and validation path.
```

```text
Every Product Plant record
must contain the organisational keys required by its Mapping.
```

```text
Every production interface consuming a changed value list
must have compatibility evidence.
```

If a critical assertion fails, the verdict may be blocked regardless of the numerical score.

---

# Readiness dimensions

A lineage-based score can use several dimensions.

The precise weights can vary by programme, but the dimensions should remain stable and interpretable.

## 1. Model integrity

Does the canonical model validate?

Checks include:

- IDs;
- object types;
- references;
- domain context;
- status compatibility;
- effective periods;
- orphaned critical objects.

This is the foundation.

A model with broken references should not receive a reliable readiness score.

## 2. Source readiness

Are the required source fields, keys and contexts available?

Checks include:

- expected fields present;
- source authority declared;
- required keys available;
- source grain compatible;
- values profiled;
- relevant source snapshot identified.

## 3. Mapping readiness

Can approved Mappings produce the target values for the intended population?

Checks include:

- source and target connected;
- transformation classified;
- applicability complete;
- value conversions valid;
- fallback controlled;
- population coverage measured.

## 4. Rule readiness

Are required controls defined, implemented and tested?

Checks include:

- requiredness;
- format;
- value domain;
- cross-field checks;
- lifecycle behaviour;
- exceptions;
- implementation evidence.

## 5. Target readiness

Can the SAP target represent and persist the governed result?

Checks include:

- endpoint available;
- datatype compatible;
- organisational context correct;
- target object extendable;
- field persistence verified;
- required configuration available.

## 6. Evidence readiness

Is the path verified for the current baseline and scope?

Checks include:

- current evidence;
- dataset identity;
- implementation version;
- claim coverage;
- review acceptance;
- no unresolved contradiction.

## 7. Downstream readiness

Will consuming systems and processes interpret the result correctly?

Checks include:

- interfaces;
- reports;
- code lists;
- process controls;
- operational tests;
- ownership.

## 8. Operational readiness

Can cutover and hypercare manage remaining exceptions?

Checks include:

- exception owners;
- fallback tracking;
- reconciliation;
- remediation deadlines;
- rollback or correction path;
- hypercare handover.

A score that measures only source fields and target loads misses most of these dimensions.

---

# Do not assign equal weight to every field

One missing optional Product description is not equivalent to:

- missing Supplier bank country;
- missing Customer Sales Area key;
- invalid Tax Identifier category;
- missing Cost Centre validity;
- unresolved Business Partner role;
- incorrect Product base unit.

Objects need criticality.

A simple criticality model might include:

## Critical

Failure blocks migration or creates unacceptable legal, financial, operational or integrity risk.

## High

Failure materially affects core processes or large populations.

## Medium

Failure creates controlled operational degradation or manual work.

## Low

Failure affects convenience, description or nonessential reporting.

This criticality should influence both:

- score contribution;
- release-gate policy.

A critical failure may block.

A low-criticality failure may reduce the score without blocking.

---

# Criticality belongs to a business path

Avoid rating only the physical SAP field.

For example:

```text
Supplier Bank Account
```

may be critical for active payable suppliers but irrelevant for prospects not yet approved for payment.

```text
MRP Type
```

may be critical for manufacturing plants but low priority for nonstock products.

```text
Tax Identifier
```

may be mandatory in one country and conditional in another.

Criticality should therefore be scoped by:

- Attribute;
- population;
- organisational context;
- lifecycle;
- migration wave;
- business process.

---

# Example 1: Supplier bank-data readiness

A Supplier Bank Account readiness assessment might include:

## Model integrity

- Bank Account Attribute exists.
- Supplier-bank relationship is defined.
- target endpoint is registered.

## Source readiness

- bank country present;
- IBAN or account number present;
- bank key present where required;
- source ownership known.

## Mapping readiness

- country-specific normalisation defined;
- duplicate-account handling defined;
- account-holder treatment defined.

## Rule readiness

- IBAN validation;
- account-number rules;
- duplicate ownership checks;
- blocked-country policy.

## Evidence readiness

- source profile;
- validation results;
- target creation;
- reviewed exceptions.

## Operational readiness

- unresolved bank records isolated;
- payment block policy;
- correction ownership.

Possible outcome:

```text
Aggregate score: 93

Verdict: Blocked

Critical finding:
Bank ownership not verified for 680 payment-active suppliers.
```

The score shows substantial progress.

The verdict prevents false confidence.

---

# Example 2: Product units of measure

For Product units of measure, the critical path may include:

```text
source unit
→ canonical unit meaning
→ conversion ratio
→ SAP base and alternative units
→ sales or warehouse interface
```

Readiness dimensions include:

- base unit available;
- alternative units available;
- conversion numerator and denominator valid;
- no circular conversions;
- interface code compatibility;
- target persistence;
- order and warehouse scenarios tested.

A Product might load successfully with:

```text
Base unit: PC
Alternative unit: BOX
```

while the conversion ratio is missing.

Field completeness appears high.

Operational readiness is low.

A useful score penalises the missing transformation relationship more heavily than an absent marketing description.

---

# Example 3: Cost Centre validity

Cost Centre readiness requires more than object creation.

The path includes:

```text
source Cost Centre
+
controlling area
+
valid-from date
+
valid-to date
+
responsible organisational context
→ SAP Cost Centre
```

A mock load may create all records.

Readiness should still assess:

- controlling-area Mapping;
- uniqueness;
- validity at go-live;
- hierarchy assignment;
- company-code compatibility;
- posting test;
- downstream reporting.

Possible result:

```text
Object creation: 100%
Validity at go-live: 94%
Posting verification: 82%
Hierarchy assignment: 97%

Verdict: Blocked
```

Why blocked?

Because 6 percent of active Cost Centres cannot receive postings on the planned go-live date.

The overall percentage should not conceal that.

---

# Example 4: Customer partner functions

A readiness model for partner functions should not count only partner records.

It should evaluate:

- Customer identity;
- Sales Area;
- partner role;
- partner identity;
- mandatory-role combination;
- cardinality;
- self-partner default;
- unresolved external partners.

A load may reconcile 100 percent of source rows.

But if Bill-to and Payer were reversed for one sales organisation, the migration is not ready.

Suggested dimension scores:

| Dimension | Score |
|---|---:|
| Source field availability | 100 |
| Key Mapping | 96 |
| Role conversion | 89 |
| Target persistence | 99 |
| Mandatory-role conformance | 84 |
| Business sample approval | 72 |

Verdict:

```text
Conditionally ready
```

Condition:

```text
Resolve Payer/Bill-to conversion for Sales Organisation 2200.
```

---

# Example 5: Supplier tax identifiers

Tax-Identifier readiness should distinguish:

- presence;
- syntax;
- category;
- country applicability;
- legal evidence;
- uniqueness;
- target persistence.

Possible results:

```text
Presence: 98%
Format: 97%
Country/category match: 88%
Legal evidence: 76%
Target persistence: 99%
```

A naive average gives 92.

That may still be blocked if the programme cannot determine which tax category applies to a critical country population.

The category problem is semantic.

Target completeness does not compensate for it.

---

# Example 6: Product profit centre

Profit centre derivation may depend on:

```text
plant
+
product family
+
company structure
→ profit centre
```

Readiness should assess:

- plant coverage;
- source classification;
- derivation Rule;
- valid profit centre;
- effective period;
- finance-owner acceptance;
- posting simulation.

A default regional Profit Centre may improve completeness from 91 to 100 percent.

The readiness score should not reward it without qualification.

Instead:

```text
Target completeness: 100%
Approved derivation: 91%
Temporary fallback: 9%
Verdict: Ready with conditions
```

Condition:

```text
Fallback population must be remediated before first month-end close.
```

---

# Score lineage paths, not only objects

A FieldEndpoint may be valid.

A Mapping may be valid.

A Rule may be valid.

Yet the complete path may still fail.

Example:

```text
source Product Status
→ Mapping
→ Product Lifecycle Status
→ SAP endpoint
```

All objects exist.

But the source population covers only active products, while the target scope includes discontinued products.

The path has a coverage gap.

Readiness should therefore evaluate path assertions such as:

- source exists;
- required context exists;
- Mapping applies;
- output belongs to value domain;
- target supports result;
- Rule accepts result;
- evidence covers population.

A path receives readiness only when these conditions align.

---

# Path-level readiness states

A useful path classification can include:

## Complete

All required components and current evidence are present.

## Complete with controlled fallback

The path relies on an approved fallback within declared scope.

## Partially covered

Only part of the intended population has a valid path.

## Unverified

The design path exists but current evidence is missing.

## Nonconformant

Observed behaviour differs from approved lineage.

## Broken

A required source, Mapping, context or target is unavailable.

These path states can feed the aggregate score.

They should also remain visible individually.

---

# Evidence confidence must affect the score

A path supported by:

- current cutover rehearsal;
- identified dataset;
- known implementation version;
- reviewed result;

is stronger than one supported by:

- an old spreadsheet;
- unknown dataset;
- no baseline;
- unreviewed assertion.

Possible confidence levels:

## High

Current, reproducible and reviewed evidence.

## Medium

Current but partial evidence, or reviewed evidence with limited scope.

## Low

Indirect, stale, incomplete or unreviewed evidence.

## None

No supporting evidence.

A score can include an evidence-confidence factor.

However, low confidence for a critical path should often change the verdict to `not assessed` or `blocked`, rather than merely reducing the percentage slightly.

---

# Evidence age should not be treated uniformly

A six-month-old source profile may still be useful for a stable reference table.

A one-week-old interface test may be stale if:

- the API version changed;
- the value list changed;
- the Mapping changed;
- the target endpoint changed.

Evidence freshness should depend on model changes, not only calendar age.

An Evidence object becomes stale when its tested assumptions no longer match the current baseline.

---

# Scoring fallbacks

Fallbacks need separate treatment.

A readiness formula that treats:

```text
value successfully produced
```

as full credit will reward defaults and manual workarounds.

Instead, classify fallback quality.

## Approved equivalent fallback

Nearly full readiness credit.

Example:

- current verified replica of authoritative source.

## Approved transformable fallback

Reduced credit until transformation and reconciliation are verified.

## Manual governed fallback

Partial credit, limited by capacity and evidence.

## Approximate fallback

Low credit and likely conditional readiness.

## Undocumented fallback

No readiness credit and possible blocker.

## Expired fallback

Blocker for affected critical scope.

This keeps technical completeness from disguising weak provenance.

---

# Example 7: Business Partner time zone

A migration derives Time Zone from country.

For countries with one time zone, this may be reliable.

For countries with several time zones, it is approximate.

A readiness report might show:

```text
Direct source value: 61%
Deterministic country derivation: 24%
Regional derivation: 10%
Approximate country default: 5%
```

The field is 100 percent populated.

Path readiness is lower.

The five-percent approximate population should remain visible by country and risk.

---

# Example 8: Product serial-number profile

Serial-number profile affects operational processing.

Readiness may require:

- source profile;
- product type;
- plant or business context;
- conversion;
- SAP target;
- inventory and delivery tests.

A wrong profile may not prevent product creation.

It can break warehouse or delivery execution after go-live.

Therefore, the downstream-process dimension may carry more weight than simple target persistence.

This is a good example of a field whose migration risk appears only after examining the process lineage.

---

# Example 9: Supplier purchasing block

A Supplier may have several block types:

- central block;
- company-code posting block;
- purchasing-organisation block;
- deletion indicator;
- workflow review state.

A readiness score that groups them as “Supplier Block” can be misleading.

The score should assess:

- semantic separation;
- organisational level;
- source authority;
- Mapping;
- expected operational behaviour.

A complete target field with the wrong block type is worse than a missing optional field.

---

# Example 10: Customer shipping condition

Shipping Condition may be sourced from:

- Customer Sales Area;
- order defaults;
- route-determination policy;
- local commercial practice.

Readiness should verify:

- correct Sales Area grain;
- valid target values;
- local conversion;
- downstream order test;
- no unapproved global default.

A score based only on nonblank target values will miss incorrect logistics behaviour.

---

# Avoid one universal formula

Different migration domains have different risk structures.

Supplier bank data should emphasise:

- authority;
- validation;
- ownership;
- payment usability.

Product planning data should emphasise:

- plant context;
- derivation;
- downstream planning behaviour.

Tax data should emphasise:

- category;
- country;
- legal evidence;
- uniqueness.

Partner functions should emphasise:

- keys;
- cardinality;
- role combinations;
- Sales Area.

The score framework should remain consistent.

Dimension weights and blockers should be domain-specific.

---

# A two-layer scoring model

A practical approach uses two layers.

## Layer 1: release gates

Boolean or categorical conditions.

Examples:

- no critical broken lineage;
- no expired critical fallback;
- no unresolved mandatory target;
- current evidence exists;
- no high-risk source-authority gap.

These determine the verdict.

## Layer 2: weighted readiness dimensions

Used to measure progress and compare areas.

Example:

```text
Model integrity: 15%
Source readiness: 15%
Mapping readiness: 20%
Rule readiness: 10%
Target readiness: 10%
Evidence readiness: 15%
Downstream readiness: 10%
Operational readiness: 5%
```

The exact numbers should be configurable.

The two-layer model prevents a high aggregate score from overriding a failed gate.

---

# Example formula

For each path, a score might be based on:

```text
Path readiness =
model integrity
× source factor
× Mapping factor
× target factor
× evidence factor
```

A multiplicative approach reflects an important principle:

> A missing essential component can make the path unusable.

If source readiness is zero, the path should not receive a high score because its target and documentation are excellent.

At a higher level, dimension scores can be aggregated using weights.

The calculation should remain transparent.

---

# Why multiplication can be useful

Consider:

```text
Source readiness: 0.2
Mapping readiness: 1.0
Target readiness: 1.0
Evidence readiness: 0.8
```

A simple average gives:

```text
0.75
```

That suggests moderate readiness.

A multiplicative result gives:

```text
0.16
```

This better reflects that the path lacks usable source coverage.

However, multiplication can also become too punitive for partial evidence.

The correct approach may combine:

- hard gates;
- minimum thresholds;
- weighted dimensions;
- controlled multiplication for essential path components.

The formula should reflect programme policy, not mathematical elegance.

---

# Use floors for essential dimensions

Another approach is to limit the final score by the weakest essential dimension.

Example:

```text
Aggregate weighted score: 91
Lowest essential dimension: 54
Final displayed score: 54
```

This makes bottlenecks visible.

Possible essential dimensions:

- source;
- Mapping;
- target;
- evidence.

A domain can choose which dimensions are essential.

---

# Do not hide denominators

A readiness percentage should always expose what was counted.

Example:

```text
Mapping readiness: 92%
```

should explain:

```text
46 of 50 critical Mapping paths verified
```

not only the percentage.

Also show:

- excluded paths;
- out-of-scope paths;
- not-assessed paths;
- fallback paths;
- blocked paths.

A score can rise artificially when hard objects are moved to “out of scope.”

Scope changes should be reviewed.

---

# Population-weighted and object-weighted scores

These answer different questions.

## Object-weighted

Each Attribute or Mapping contributes equally.

Useful for model completeness.

## Population-weighted

Contribution depends on affected record count.

Useful for operational exposure.

Example:

- one broken Mapping affects 80 percent of suppliers;
- five broken Mappings affect ten records each.

Object-weighted scoring may make the second situation look worse.

Population-weighted scoring shows the first has greater exposure.

A mature report should show both.

---

# Criticality-weighted score

Criticality weighting focuses on business importance.

Example:

```text
Missing optional Product subtitle:
low weight

Missing Supplier bank country:
critical weight
```

This helps prioritisation.

It should not replace population weighting.

A critical issue affecting one record may still require a block.

---

# Three parallel views

A useful scorecard can show:

## Model view

How many objects and paths are structurally ready?

## Population view

How many records are covered by ready paths?

## Risk view

How much critical business exposure remains?

Example:

| View | Score |
|---|---:|
| Model readiness | 91 |
| Population coverage | 97 |
| Critical risk readiness | 68 |

This is more informative than one blended figure.

---

# Example 11: Product Plant planning data

Suppose:

- 96 percent of Product Plant records have MRP Type;
- 94 percent have MRP Controller;
- 99 percent have Procurement Type;
- 82 percent have verified planning strategy;
- 12 percent use a temporary MRP Controller default.

Possible views:

```text
Field completeness: 95
Model-path readiness: 86
Population readiness: 92
Critical risk readiness: 71
Verdict: Conditionally ready
```

Condition:

```text
Remove or formally approve the temporary MRP Controller fallback
before the first production planning cycle.
```

---

# Example 12: Finance payment terms

Payment Terms readiness may score highly because the field is widely populated.

But analysis finds:

- company-code context missing for acquired-company suppliers;
- a central source term is copied to every company code;
- local finance owners have not approved the result.

Possible report:

```text
Technical completeness: 99
Contextual Mapping readiness: 74
Owner acceptance: 63
Population affected: 18%
Verdict: Blocked for acquired-company population
```

The migration object may remain ready for other populations.

Readiness should support scoped verdicts.

---

# Scoped readiness

Avoid declaring an entire domain ready or blocked when only one context is affected.

Possible scopes:

- country;
- company code;
- plant;
- Sales Organisation;
- supplier category;
- migration wave;
- source system;
- legal entity.

Example:

```text
Supplier domain:
Ready with warnings

Portugal tax scope:
Blocked

Germany bank-data scope:
Ready

Acquired-company payment terms:
Conditionally ready
```

This allows proportionate decisions without hiding local blockers.

---

# Readiness aggregation hierarchy

Scores can roll up through several levels:

```text
Field or Rule
→ lineage path
→ business Attribute
→ Entity
→ migration object
→ domain
→ wave
→ programme
```

Every roll-up should preserve:

- blockers;
- lowest critical score;
- evidence gaps;
- affected scope.

The programme score should never erase a blocked lower-level critical path.

---

# Red, amber and green need definitions

Colour alone is not governance.

Define thresholds and gates.

Example:

## Green

- score at least 85;
- no blocker;
- critical evidence current;
- fallback within policy.

## Amber

- score from 65 to 84;
- or controlled warning;
- or incomplete noncritical evidence.

## Red

- score below 65;
- or any critical gate failure;
- or not-assessed critical path.

A score of 91 can still be red if a critical gate fails.

This should be intentional, not treated as a dashboard defect.

---

# Unknown is not green

Many programmes score only what has been assessed.

Unassessed objects disappear from the denominator.

This inflates readiness.

Use an explicit state:

```text
Not assessed
```

Critical unassessed paths should reduce evidence coverage and may block release.

The organisation should not receive readiness credit for missing information.

---

# Evidence confidence and uncertainty

A score should expose uncertainty.

Example:

```text
Readiness score: 82
Evidence confidence: Low
```

This is materially different from:

```text
Readiness score: 82
Evidence confidence: High
```

Confidence may depend on:

- evidence freshness;
- scope coverage;
- reproducibility;
- reviewer acceptance;
- baseline match;
- contradictory findings.

---

# Readiness trends

Trend is useful when interpreted carefully.

Example:

```text
Mock Load 1: 54
Mock Load 2: 68
Mock Load 3: 79
Cutover rehearsal: 83
```

The trend suggests progress.

But the report should also show:

- blockers opened;
- blockers closed;
- scope expanded;
- scoring policy changed;
- evidence invalidated.

A score can drop because the model became more honest.

That may be progress.

---

# Do not optimise for the score

Once a metric becomes a target, teams may:

- lower criticality;
- move objects out of scope;
- convert errors to warnings;
- count defaults as mapped;
- reuse old evidence;
- close Findings without remediation;
- reduce test scope.

Controls should include:

- reviewed criticality;
- reviewed exclusions;
- transparent denominators;
- evidence freshness;
- immutable history;
- score-policy versioning.

The score is an instrument.

It should not become a game.

---

# Score-policy versioning

When weights, thresholds or blockers change, record the policy version.

Example:

```text
Readiness policy:
MW-READINESS-2.1
```

A score of 82 under one policy may not be comparable to 82 under another.

Store:

- policy ID;
- weights;
- thresholds;
- gates;
- criticality rules;
- date;
- approving Decision.

---

# Score explanations

For every result, produce a concise explanation.

Weak:

```text
Product readiness: 73
```

Stronger:

```text
Product readiness: 73

Primary constraints:
- MRP Controller fallback used for 12% of Product Plant records
- serial-number profile not tested in warehouse process
- three plant mappings lack current evidence

Blockers:
none

Verdict:
Ready with conditions
```

The explanation should be generated from structured findings, not manually rewritten each time.

---

# Recommended scorecard layout

## Overall verdict

```text
Conditionally ready
```

## Overall score

```text
81 / 100
```

## Confidence

```text
Medium
```

## Blocking conditions

```text
None
```

## Release conditions

```text
- Resolve Cost Centre validity for company code 3100
- Reconcile temporary Product profit-centre fallback before month-end
```

## Dimension scores

| Dimension | Score |
|---|---:|
| Model integrity | 98 |
| Source readiness | 86 |
| Mapping readiness | 78 |
| Rule readiness | 84 |
| Target readiness | 95 |
| Evidence readiness | 69 |
| Downstream readiness | 71 |
| Operational readiness | 80 |

## Critical low points

- Supplier bank ownership verification;
- Product Plant fallback usage;
- partner-function role conversion;
- tax-category evidence.

## Trend

```text
+6 since Mock Load 3
```

## Scope

```text
Wave 1, Germany and Portugal
```

---

# Release-gate examples

## Supplier bank data

Block when:

- bank ownership unresolved;
- IBAN validation absent for critical population;
- duplicate account ownership unresolved;
- sensitive evidence uncontrolled.

## Product planning

Block when:

- mandatory plant context missing;
- critical Product Plants use unapproved defaults;
- planning-process test fails.

## Tax data

Block when:

- category and country conflict;
- mandatory legal evidence missing;
- duplicate tax identity unresolved.

## Cost Centres

Block when:

- validity excludes go-live date;
- controlling-area Mapping missing;
- posting test fails.

## Partner functions

Block when:

- mandatory role missing;
- partner identity unresolved;
- role assigned to wrong Sales Area.

These gates should be domain policy, not ad hoc dashboard interpretation.

---

# Readiness findings should produce action

Each low score or failed gate should identify:

- affected object;
- affected path;
- scope;
- severity;
- owner;
- evidence;
- suggested next action.

Example:

```text
Finding:
Product Plant MRP Controller fallback exceeds approved scope

Affected path:
Legacy Planner Group
→ MRP Controller Mapping
→ Product Plant MRP Controller

Scope:
PL20, PL30

Population:
8,420 records

Owner:
Production Planning Data Lead

Action:
Provide plant-specific conversion or approve bounded fallback
```

The score points to the problem.

The Finding drives delivery.

---

# Patch proposals and readiness

A gap should not automatically rewrite the model.

The flow remains:

```text
readiness finding
→ Evidence
→ PatchProposal
→ validation
→ candidate impact
→ human approval
```

Martenweave’s current architecture explicitly keeps AI and automation in a proposal-first role rather than permitting silent canonical mutation.

This matters because a low score can result from:

- model defect;
- source-data defect;
- implementation defect;
- missing evidence;
- legitimate exception.

Only some cases require a canonical model change.

---

# What AI can contribute

AI can help:

- summarise score drivers;
- group related Findings;
- explain why the verdict is blocked;
- identify recurring low-readiness patterns;
- draft remediation plans;
- suggest candidate tests;
- compare scorecards between baselines.

AI should not autonomously:

- change criticality;
- exclude scope;
- downgrade a blocker;
- approve fallback;
- reuse stale evidence;
- adjust weights to improve status.

The scoring policy must remain deterministic and reviewable.

---

# A focused Martenweave implementation slice

Martenweave already includes:

- deterministic validation;
- health and scorecard commands;
- lineage and impact analysis;
- dataset readiness with explicit verdicts;
- Evidence, Decisions and PatchProposals;
- a generated index that remains disposable.

The next vertical slice should introduce a **lineage-based readiness policy**.

## Goal

Calculate readiness from complete governed paths while preventing critical failures from being hidden by aggregation.

## Initial dimensions

- model integrity;
- source readiness;
- Mapping readiness;
- Rule readiness;
- target readiness;
- evidence readiness;
- downstream readiness;
- operational readiness.

## Required capabilities

- type- and path-level scoring;
- object criticality;
- scope-specific verdicts;
- hard release gates;
- fallback penalties;
- evidence-confidence factor;
- object- and population-weighted views;
- transparent denominators;
- score-policy versioning.

## Acceptance criteria

The scorecard must distinguish:

```text
Supplier bank target populated
```

from:

```text
Supplier bank path verified for ownership, validity and payment use
```

It must distinguish:

```text
Product MRP Type nonblank
```

from:

```text
Product MRP Type produced through the approved plant-specific path
```

It must allow:

```text
Score: 94
Verdict: Blocked
```

when a critical release gate fails.

## Existing commands

```bash
martenweave validate --repo ./model
martenweave health --repo ./model
martenweave scorecard --repo ./model
martenweave run dataset-readiness \
  --repo ./model \
  --dataset ./data/mock-load-3.xlsx \
  --out ./reports/readiness
```

## Future policy-aware operation

```bash
martenweave scorecard \
  --repo ./model \
  --policy ./policies/migration-readiness.yaml \
  --scope WAVE-1
```

The policy-aware arguments describe a recommended product direction rather than the current documented CLI contract.

---

# Final perspective

A migration-readiness score is useful only when it makes risk easier to see.

It becomes dangerous when it converts:

- critical failures;
- missing evidence;
- approximate fallbacks;
- context gaps;
- untested consumers;

into small reductions in an otherwise green percentage.

The right model is:

```text
deterministic release gates
+
transparent readiness dimensions
+
path-level evidence
+
criticality
+
scope
+
explainable aggregation
```

The practical test is:

> Can a reviewer understand why the score has its current value, which critical paths remain unsafe, which populations are affected and what evidence would change the verdict?

When the answer is yes, the score supports migration governance.

When the answer is:

> We are 92 percent ready,

without a clear explanation of the remaining eight percent, the score is hiding precisely the part that matters.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects canonical model objects, source datasets, Mappings, Rules, physical endpoints, Evidence, Decisions and proposals so that readiness can be calculated from governed paths rather than isolated field counts.

The objective is not to manufacture a reassuring score.

It is to make incomplete or unsafe migration paths difficult to ignore.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave Core currently treats canonical files as the source of truth, validates IDs, types, references and domain context before generating disposable indexes and exposes health, scorecard, lineage, impact and dataset-readiness operations through its CLI.

The current dataset-readiness workflow orchestrates validation, indexing, dataset profiling, gap detection and summarisation into a report with an explicit readiness verdict. It can promote detected gaps into reviewable PatchProposals rather than mutating the canonical model automatically.

Martenweave’s product contract remains backend-first and proposal-first: evidence enters the pipeline, validators and impact analysis assess the model, and human review controls accepted changes.

The weighting models, critical-path gates, confidence factors and policy-aware scorecard described in this article are recommended Martenweave directions. They should not be interpreted as guarantees of the exact current scorecard implementation unless separately implemented and published.

Martenweave is independent and is not affiliated with or endorsed by SAP.
