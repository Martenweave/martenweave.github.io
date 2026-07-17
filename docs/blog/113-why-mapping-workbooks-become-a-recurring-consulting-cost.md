# Why Mapping Workbooks Become a Recurring Consulting Cost

**Reviewed: 15 July 2026**

How many times should a transformation programme pay to map the same 1,400 legacy codes?

The first mapping team analyses them during design.

A second team reviews them before the first migration rehearsal.

The implementation team translates the workbook into transformation logic.

The test team creates another comparison.

A new country joins the programme and asks whether the mapping still applies.

An interface consultant discovers that one downstream system uses an older target value list.

Before cutover, the programme reconciles the workbook again.

After go-live, AMS investigates an incident and rebuilds part of the same logic from tickets, code and old spreadsheets.

The mapping has been reviewed repeatedly.

The organisation still does not own it as a governed, reusable asset.

This is one of the quietest sources of consulting cost in SAP data programmes.

It does not appear as one large failure.

It appears as repeated work:

- finding the latest workbook;
- comparing versions;
- interpreting comments;
- confirming target values;
- checking transformation code;
- tracing interface dependencies;
- rebuilding exception lists;
- preparing workshop packs;
- recreating test evidence;
- explaining old Decisions to new consultants.

> Mapping becomes expensive when it is treated as a project document rather than durable model infrastructure.

A spreadsheet can be a useful authoring surface.

It is a weak long-term source of truth for a mapping that must survive:

- multiple migration waves;
- changing source systems;
- target-model changes;
- interface redesign;
- MDG governance;
- cutover;
- hypercare;
- AMS.

Martenweave can reduce this recurring cost by turning mappings into canonical, validated and traceable model objects.

It does not remove mapping workshops.

It does not decide business meaning automatically.

It does not replace SAP MDG, SAP Integration Suite or migration tooling.

Its role is narrower:

```text
Preserve the approved mapping.

Connect it to business meaning.

Validate its structure.

Show its dependencies.

Compare it with datasets and implementation.

Let AI propose changes.

Require humans to approve them.
```

The economic benefit comes from reuse.

The first mapping cycle still requires experts.

The second, third and fourth cycles should not begin from zero.

# Our running case

Consider a global SAP S/4HANA transformation migrating material data from seven legacy ERP systems.

The programme must map local material groups to one target classification.

The current landscape contains:

```text
Legacy systems:
7

Legacy material-group codes:
1,400

Target material groups:
220

Materials in scope:
850,000

Migration waves:
6

Countries:
14
```

The legacy codes include:

```text
System A:
ELEC_COMPONENT

System B:
EC-01

System C:
1007

System D:
ELECTRO-MECH

System E:
LOCAL_MISC_42
```

Several codes refer to the same business concept.

Some contain mixed populations.

Others have no direct target equivalent.

The target model has:

```text
Target material group:
MG-042 — Electrical Components
```

The mapping initially looks simple:

```text
ELEC_COMPONENT → MG-042
EC-01 → MG-042
1007 → MG-042
ELECTRO-MECH → review required
LOCAL_MISC_42 → no direct mapping
```

Then the real questions begin.

- Does `ELECTRO-MECH` contain both electrical and mechanical materials?
- Is the mapping global or Plant-specific?
- Should service parts use another target group?
- Does the target group affect purchasing responsibility?
- Is it used by analytics?
- Does an interface send it to a procurement platform?
- Which materials need manual classification?
- Who can approve a new target value?
- Does the next migration wave use the same source meaning?

The mapping is not merely:

```text
source code → target code
```

It is a governed Decision about meaning, applicability and downstream use.

# Why mapping workbooks multiply

One workbook rarely remains one workbook.

The programme creates:

- design mapping;
- migration mapping;
- interface mapping;
- MDG mapping;
- local business mapping;
- testing mapping;
- cutover mapping;
- defect-correction mapping.

Each copy has a rational purpose.

The problem is that every copy can become partially authoritative.

A typical folder may contain:

```text
Material_Mapping_v12.xlsx

Material_Mapping_v12_FINAL.xlsx

Material_Mapping_v13_business_review.xlsx

Material_Mapping_v13_approved.xlsx

Material_Mapping_v13_cutover_fix.xlsx

Material_Mapping_v14_working_copy.xlsx
```

The filename is not the main problem.

The deeper problem is that important context sits in places software cannot validate reliably:

- cell colour;
- comments;
- hidden sheets;
- email approvals;
- manually inserted notes;
- formulas copied from previous versions.

A consultant can interpret the workbook.

The organisation cannot easily prove that:

- all source codes are covered;
- no source code maps to conflicting active targets;
- all exceptions have owners;
- target values remain valid;
- implementation matches the approved mapping;
- current Evidence uses the latest version.

# The first recurring cost: mapping discovery

Before a consultant can analyse a change, the consultant must locate the mapping.

Questions include:

- Which file is current?
- Which sheet applies to this wave?
- Which columns are authoritative?
- Are comments still valid?
- Was the country-specific version approved?
- Did implementation use the same file?
- Were cutover fixes added later?

This discovery can consume days before substantive analysis begins.

With a canonical registry, the starting point is a stable object:

```text
Mapping:
MAP-MATERIAL-GROUP-LEGACY-A-TO-S4

Status:
approved

Scope:
Legacy System A
Wave 3
Plants DE10 and DE20

Effective from:
RC5

Supersedes:
MAP-MATERIAL-GROUP-LEGACY-A-TO-S4-V2
```

The consultant may still inspect source documents.

The current governed state is no longer inferred from filenames.

# The second recurring cost: semantic reconstruction

Two source codes can look similar while representing different populations.

```text
EC-01
ELEC_COMPONENT
```

The labels suggest equivalence.

The source definitions may differ.

One could mean:

> Electrical production components.

The other could mean:

> All electrically related materials, including tools, spare parts and services.

Mapping both directly to `MG-042` may be wrong.

A spreadsheet often records only the selected target.

A canonical mapping should preserve:

- source concept;
- source definition;
- target concept;
- transformation type;
- applicability;
- business rationale;
- owner;
- Evidence.

For example:

```text
Source code:
EC-01

Source meaning:
Electrical production components

Target:
MG-042

Mapping type:
direct semantic equivalence

Authority:
Material Governance Board

Evidence:
Source profiling and business review
```

Another source code may require conditional mapping:

```text
Source code:
ELECTRO-MECH

Rule:
If product family = ELECTRICAL,
map to MG-042.

If product family = MECHANICAL,
map to MG-061.

Otherwise:
manual review.
```

The mapping is now explainable.

The next consultant does not have to reconstruct the rationale from workshop minutes.

# The third recurring cost: coverage analysis

Managers often receive:

```text
Mapping completion:
98%
```

The number raises more questions than it answers.

Does 98 percent refer to:

- source codes;
- material records;
- transaction volume;
- active materials;
- financially material stock;
- values reviewed by the business?

In our case:

```text
Source codes mapped:
1,372 of 1,400
= 98%

Material records covered:
832,000 of 850,000
= 97.9%
```

But the 18,000 uncovered records include:

```text
Production-critical materials:
4,200

Materials with open purchase orders:
2,600

Materials with stock:
6,100
```

The remaining two percent may carry disproportionate business risk.

Martenweave should calculate coverage across several denominators:

```text
Code coverage

Record coverage

Active-use coverage

Stock coverage

Open-business coverage

Critical-process coverage
```

The mapping team then focuses on business exposure rather than a comfortable percentage.

# The fourth recurring cost: cross-wave reconciliation

A programme may approve the mapping for Wave 1.

Wave 2 introduces:

- another country;
- another legacy system;
- new target codes;
- local exceptions;
- changed product taxonomy.

Consultants reopen the original workbook and ask:

- Which mappings are reusable?
- Which mappings are source-specific?
- Which Decisions were temporary?
- Which Rules should become global?
- Which exceptions should remain local?

Without explicit applicability, reuse becomes guesswork.

The canonical mapping must declare its scope.

```text
Applicable to:
- Source System A
- Material type ROH
- Plants DE10 and DE20
- Effective from Wave 1

Not applicable to:
- Service materials
- Consignment products
- Plant FR10
```

When Wave 2 adds FR10, the system can identify that the mapping does not automatically apply.

This is more reliable than copying the Wave 1 workbook and adjusting it manually.

# The fifth recurring cost: implementation reconciliation

The approved workbook says:

```text
1007 → MG-042
```

The transformation code says:

```text
1007 → MG-024
```

Which is correct?

Possible explanations include:

- implementation defect;
- workbook not updated;
- emergency cutover correction;
- local override;
- target code changed;
- test environment differs from production.

A traditional reconciliation requires consultants to compare:

- workbook;
- code;
- migration output;
- target extract;
- defect tickets.

The canonical registry provides a reference state.

Implementation Evidence can then be compared against it.

```text
Approved mapping:
1007 → MG-042

Implemented mapping:
1007 → MG-024

Status:
contradiction

Affected materials:
12,480

Affected wave:
Wave 3

Readiness:
blocked
```

The registry does not fix the code.

It makes the contradiction deterministic and visible.

# The sixth recurring cost: interface reconciliation

The migration maps material group to `MG-042`.

An outbound interface still translates the value to an older external code:

```text
MG-042 → EXT-17
```

A procurement platform expects:

```text
EXT-21
```

The material is correct in S/4HANA.

The consuming system receives an outdated classification.

This is where mapping governance must connect migration and interfaces.

SAP Integration Suite is intended to connect applications, data, APIs, events and partner environments across SAP and third-party landscapes. SAP also emphasises central governance, reusable integrations, AI-assisted development and mapping for B2B scenarios.

Martenweave should not duplicate integration runtime capabilities.

It should preserve the business lineage:

```text
Canonical Material Group
→ migration mapping
→ S/4HANA field
→ outbound interface field
→ external classification
→ consuming process
```

A target-value change can then expose downstream mappings that require review.

# The seventh recurring cost: rule reconstruction

Some mappings are not static lookup tables.

They contain Rules.

For example:

```text
If legacy group = LOCAL_MISC_42
and material type = ROH
and purchasing category = ELECTRICAL,
map to MG-042.
```

Another Rule may default:

```text
If no mapping exists,
map to MG-999.
```

The second Rule can make completion statistics look better while hiding unresolved classification.

The canonical model should distinguish:

- direct mapping;
- conditional mapping;
- derived mapping;
- approved default;
- temporary fallback;
- manual review.

This gives managers a clearer readiness view.

```text
Directly mapped:
760,000 records

Conditionally mapped:
62,000

Approved default:
8,000

Temporary fallback:
5,000

Manual review:
15,000
```

A record using a temporary fallback should not be counted as fully governed.

# The eighth recurring cost: approval reconstruction

The workbook may contain a green cell.

Who approved it?

Was the approval:

- global;
- country-specific;
- temporary;
- conditional;
- limited to one wave?

A canonical mapping should reference a Decision.

```text
Decision:
DEC-MATERIAL-GROUP-ELECTRICAL

Outcome:
Approve MG-042 as target classification

Scope:
Production materials from Systems A, B and C

Excluded:
Service and maintenance materials

Approver:
Global Material Data Owner

Effective from:
Wave 1
```

The next wave can reuse the Decision where applicable.

Consultants no longer need to infer approval from email history.

SAP describes SAP Master Data Governance as a central governance layer that preserves semantics and relationships, allows teams to own specific Attributes, validates business Rules and maintains an audit trail.

Martenweave complements that governance by connecting the approved meaning to migration datasets, interface mappings, project Evidence and cross-wave Decisions.

# The ninth recurring cost: testing reconstruction

Every mapping change affects testing.

The test team asks:

- Which source values changed?
- Which target records are affected?
- Which interfaces consume the result?
- Which business processes use the classification?
- Which previous Evidence is stale?

Without lineage, consultants build a test-impact spreadsheet.

With a canonical registry, the programme can generate a candidate test scope.

For our example:

```text
Changed mapping:
ELECTRO-MECH conditional split

Affected source records:
21,400

Affected target groups:
MG-042 and MG-061

Affected interfaces:
3

Affected reports:
2

Affected business processes:
Purchasing responsibility
Spend analytics
Warehouse classification

Previous Evidence:
RC4 mapping test is stale
```

The testing lead still approves the scope.

The dependency search is largely reusable.

# The tenth recurring cost: consultant turnover

Mapping knowledge often sits with a small number of people.

A consultant knows:

- why one code was excluded;
- which Plant uses a local override;
- why a default was accepted;
- which workbook comment is obsolete.

When that consultant leaves, the programme pays for knowledge transfer.

If the transfer is incomplete, it pays again through defects and investigation.

A canonical mapping registry converts personal knowledge into:

- model objects;
- Decisions;
- Evidence;
- history;
- validation Rules.

This does not eliminate expert knowledge.

It makes the result of expert work durable.

# What Martenweave already contributes

Martenweave Core currently positions itself as a backend-first model-governance and Evidence layer for migration, MDM, governance and AMS. It converts spreadsheets, datasets, tickets, validation reports, Decisions and SAP context into canonical model files, deterministic validation, gap reports, lineage, impact analysis and human-approved AI patch proposals.

Its generic model includes:

- entities;
- Attributes;
- relationships;
- datasets;
- mappings;
- Rules;
- Evidence;
- Decisions;
- change proposals.

Canonical Markdown and YAML files remain authoritative, generated indexes are rebuildable, validation is deterministic, and AI cannot silently mutate the model.

The detailed mapping-lifecycle capability described in this article is a proposed domain extension of that foundation.

# The canonical mapping object

A mapping should be more than a source and target value.

Conceptually:

```text
---
id: MAP-MATERIAL-GROUP-SYS-A-1007
type: Mapping

source:
  system: LEGACY-A
  object: MATERIAL
  field: MAT_GROUP
  value: "1007"

target:
  system: SAP-S4
  object: MATERIAL
  field: MATERIAL_GROUP
  value: MG-042

mapping_type:
  direct

scope:
  material_types:
    - ROH
  plants:
    - DE10
    - DE20

authority:
  DEC-MATERIAL-GROUP-ELECTRICAL

owner:
  ROLE-GLOBAL-MATERIAL-DATA-OWNER

evidence:
  - PROFILE-LEGACY-A-MAT-GROUP
  - TEST-RC5-MATERIAL-GROUP

status:
  approved
---
```

A conditional mapping would reference a Rule rather than pretending to be a simple lookup.

# Deterministic validations

Useful checks include:

## Source uniqueness

One active source condition should not resolve to conflicting target values.

## Target validity

Every target value must exist in the approved target model.

## Scope completeness

Every production mapping needs declared applicability.

## Owner and Decision

An approved mapping must reference an accountable owner and approval Decision.

## Default classification

Defaults must be marked as permanent, temporary or uncontrolled.

## Dataset coverage

Current datasets should identify unmapped and ambiguously mapped values.

## Implementation consistency

Observed transformation results should match the approved mapping.

## Interface impact

Changes to canonical target values should identify connected interface mappings.

## Evidence freshness

Evidence generated before a material mapping change should become stale where affected.

These are repeatable controls.

They reduce manual review without replacing business approval.

# Where AI helps

AI can reduce mapping preparation effort.

It can:

- extract candidate mappings from spreadsheets;
- normalise source descriptions;
- cluster similar legacy values;
- identify likely target concepts;
- compare workbook versions;
- detect comments suggesting exceptions;
- propose missing applicability;
- draft mapping Decisions;
- prepare impact summaries;
- generate PatchProposals.

For example, AI may suggest:

```text
Legacy codes:
ELEC_COMPONENT
EC-01
1007

Likely target:
MG-042

Confidence:
high

Reason:
Descriptions and profiled material populations align.
```

This is useful.

It is not an approval.

The proposal still needs:

- deterministic structural validation;
- dataset profiling;
- business-owner review;
- controlled application.

The Martenweave operating principle remains:

```text
AI proposes.

Validators expose contradictions.

Experts assess semantics.

Humans approve.

Git records.
```

# The baseline cost model

The following financial model is illustrative.

It is not a market benchmark or guaranteed saving.

Assume a blended external consulting rate of:

```text
€1,200 per consultant-day
```

The programme runs six migration waves per year.

Without a canonical mapping registry, each wave consumes the following mapping-related effort.

| Activity | Consultant-days per wave |
|---|---:|
| Locate and reconcile current mappings | 25 |
| Profile new source values | 30 |
| Conduct business-mapping workshops | 35 |
| Reconcile global and local exceptions | 25 |
| Compare mapping with implementation | 20 |
| Analyse interface and reporting impact | 20 |
| Prepare testing and Evidence | 15 |
| Approval and cutover reconciliation | 10 |
| **Total** | **180** |

Annual baseline:

```text
6 waves × 180 days
= 1,080 consultant-days
```

Annual consulting cost:

```text
1,080 × €1,200
= €1,296,000
```

This is not the total programme cost.

It is the mapping-related consulting effort targeted by the registry.

# Future-state effort

Assume the canonical mapping registry is operating.

The first year still includes substantial expert work.

For each wave:

| Activity | Consultant-days per wave |
|---|---:|
| Import and profile new source values | 15 |
| Review generated mapping differences | 12 |
| Resolve genuinely new business semantics | 15 |
| Validate local exceptions | 8 |
| Review implementation and interface impact | 8 |
| Approve Evidence and changes | 7 |
| **Total** | **65** |

Annual recurring wave effort:

```text
6 waves × 65 days
= 390 consultant-days
```

Annual recurring consulting cost:

```text
390 × €1,200
= €468,000
```

Recurring consultant-days avoided:

```text
1,080 − 390
= 690 days
```

Gross annual consulting-cost avoidance:

```text
690 × €1,200
= €828,000
```

# First-year implementation cost

The registry requires investment.

## Canonical mapping onboarding

Assume:

```text
220 consultant-days × €1,200
= €264,000
```

This includes:

- importing priority workbooks;
- defining mapping objects;
- modelling applicability;
- creating validators;
- establishing Decisions and ownership;
- connecting interfaces;
- configuring review and CI;
- training the core team.

## Tooling, integration and support

Illustrative annual cost:

```text
€80,000
```

## Internal stewardship

Illustrative annual cost:

```text
€60,000
```

## Total incremental first-year investment

```text
€264,000
+ €80,000
+ €60,000
= €404,000
```

# First-year TCO

```text
Recurring wave consulting:
€468,000

Initial onboarding:
€264,000

Tooling and support:
€80,000

Internal stewardship:
€60,000

First-year TCO:
€872,000
```

Baseline:

```text
€1,296,000
```

First-year net cost reduction:

```text
€1,296,000 − €872,000
= €424,000
```

# First-year ROI

Gross benefit:

```text
€828,000
```

Incremental investment:

```text
€404,000
```

ROI:

```text
(€828,000 − €404,000)
÷ €404,000
= approximately 105%
```

Illustrative first-year ROI:

```text
105%
```

Estimated payback:

```text
approximately 5.9 months
```

# Break-even threshold

At a consulting rate of €1,200 per day:

```text
€404,000 ÷ €1,200
= approximately 337 consultant-days
```

The programme must avoid approximately:

```text
337 consultant-days
```

The model assumes 115 days avoided per wave:

```text
180 − 65
= 115 days
```

Break-even therefore requires approximately:

```text
3 migration waves
```

This matters.

A small one-off migration with one narrow mapping cycle may not justify the full operating model.

A multi-wave transformation, rollout or long-lived MDM environment is a stronger fit.

# Three-year TCO

## Baseline

```text
€1,296,000 × 3
= €3,888,000
```

## Martenweave year one

```text
€872,000
```

## Martenweave years two and three

Each later year includes:

```text
Recurring wave consulting:
€468,000

Tooling and support:
€80,000

Internal stewardship:
€60,000

Annual TCO:
€608,000
```

Three-year Martenweave TCO:

```text
€872,000
+ €608,000
+ €608,000
= €2,088,000
```

Three-year cost reduction:

```text
€3,888,000 − €2,088,000
= €1,800,000
```

TCO reduction:

```text
46.3%
```

Illustrative three-year ROI on platform implementation, support and stewardship investment:

```text
approximately 263%
```

The value increases because the canonical mappings are reused across later waves, interfaces and AMS.

# A conservative scenario

Assume the programme has only four waves.

Assume future-state effort falls from 180 to 95 days rather than 65.

Days avoided:

```text
4 × 85
= 340 consultant-days
```

Gross benefit:

```text
340 × €1,200
= €408,000
```

Incremental first-year investment:

```text
€404,000
```

Net first-year benefit:

```text
€4,000
```

First-year ROI is approximately:

```text
1%
```

This conservative scenario is close to break-even.

That is useful information.

It shows that the business case depends on:

- number of waves;
- reuse across domains;
- quality of the initial registry;
- continued stewardship;
- retirement of duplicate workbooks;
- adoption by implementation and AMS teams.

Installing the tool does not create the saving.

Changing the mapping operating model creates the saving.

# Costs that must remain in TCO

A credible TCO must include:

- initial model design;
- workbook import and cleanup;
- validator development;
- integration with repositories and CI;
- user training;
- mapping stewardship;
- review of AI proposals;
- support and maintenance;
- parallel operation during transition.

The programme should not assume that mappings govern themselves.

A registry without ownership becomes another stale repository.

# Benefits that should be measured

The programme can track:

## Time to find the current mapping

Baseline:

```text
hours or days spent locating and confirming the file
```

## Time to onboard a new wave

Measure effort needed before genuinely new mapping work begins.

## Reuse rate

```text
Mappings reused without semantic redesign
÷ total mappings assessed
```

## Automated validation rate

How many structural mapping defects are found before workshops or testing?

## Implementation mismatch rate

How often does implementation differ from approved mapping?

## Unmapped-value detection time

How quickly are new source values identified?

## Evidence preparation time

How much effort is required to create a current mapping-readiness package?

## Consultant-days per mapping wave

This is the central financial metric.

# The manager-focused dashboard

A mapping dashboard should not begin with the number of populated rows.

It should show:

```text
Source codes:
1,400

Approved direct mappings:
1,210

Conditional mappings:
110

Controlled temporary defaults:
25

Manual review:
27

Unmapped:
28
```

It should also show:

```text
Record coverage:
97.9%

Critical-process coverage:
94.3%

Implementation contradictions:
12

Mappings with stale Evidence:
36

Mappings without owner:
18

Interface mappings affected by current changes:
7
```

Managers can then see:

- how much work remains;
- where the risk sits;
- which mappings are reusable;
- where consulting attention is needed.

# The first product slice

The focused capability should be:

## Canonical Mapping Registry and Reconciliation

### Goal

Turn migration and interface mappings into versioned, validated and reusable model objects.

### Initial inputs

- mapping workbooks;
- source value profiles;
- target value lists;
- transformation outputs;
- interface field mappings;
- Decisions;
- Exceptions;
- test Evidence.

### Initial outputs

- canonical mapping objects;
- unmapped values;
- conflicting mappings;
- applicability gaps;
- implementation differences;
- interface impact;
- Evidence freshness;
- proposed remediation;
- wave-reuse report.

### Initial AI support

- workbook extraction;
- candidate mapping suggestions;
- semantic clustering;
- version comparison;
- exception extraction;
- proposed PatchProposals.

### Human controls

- target meaning approval;
- authority;
- applicability;
- exception acceptance;
- final change review.

# Proposed commands

A future CLI could support:

```text
martenweave mappings import \
  --file ./input/material-mapping.xlsx \
  --domain material \
  --repo ./model
```

```text
martenweave mappings coverage \
  --dataset ./data/material-wave3.csv \
  --mapping MAP-MATERIAL-GROUP \
  --repo ./model
```

```text
martenweave mappings conflicts \
  --mapping MAP-MATERIAL-GROUP \
  --repo ./model
```

```text
martenweave mappings compare-implementation \
  --approved MAP-MATERIAL-GROUP \
  --actual ./reports/transformation-output.csv \
  --repo ./model
```

```text
martenweave mappings propose \
  --unmapped-report ./reports/unmapped-values.json \
  --dry-run \
  --repo ./model
```

These commands describe a proposed capability.

They are not part of the currently documented Martenweave CLI.

# What managers should require

## Require canonical mapping identity

A mapping needs a stable ID, not only a workbook row.

## Require business meaning

Source and target definitions must be explicit.

## Require applicability

Global, local, wave-specific and temporary mappings must remain distinguishable.

## Require mapping type

Direct, conditional, derived, default and manual-review mappings should not be mixed.

## Require ownership and Decision

Every approved mapping needs accountable authority.

## Require dataset coverage

Mapping completion must be measured against actual records and business exposure.

## Require implementation comparison

The approved mapping and executed transformation should be reconciled.

## Require interface impact

Target-value changes must expose downstream consumers.

## Require Evidence freshness

Old mapping tests should not silently support a changed model.

## Require measurable reuse

The registry must demonstrate reduced effort across waves.

# The management questions

1. Which mapping version is authoritative?
2. What business concept does each source value represent?
3. Which mappings are direct and which are conditional?
4. Which mappings are global, local or wave-specific?
5. Which defaults are permanent and which are temporary?
6. Who approved each target meaning?
7. Which current records remain unmapped?
8. Which critical processes depend on those records?
9. Does implementation match the approved mapping?
10. Which interfaces consume the target value?
11. Which Evidence became stale after the latest change?
12. How many consultant-days did the last mapping cycle consume?
13. How many mappings were genuinely reused?
14. How many mapping defects were detected automatically?

A programme that cannot answer these questions does not yet own its mappings.

It owns a set of project files.

# Final perspective

Mapping is not clerical translation.

It is a series of business Decisions about how one operating model becomes another.

That work deserves expert attention.

The waste comes from paying experts to repeatedly reconstruct mappings that were supposedly completed in an earlier phase.

The practical test is:

> After a mapping has been approved, can the organisation reuse its meaning, scope, Decision, implementation Evidence and downstream impact without rebuilding the analysis?

When the answer is yes, consulting effort compounds into organisational capability.

When the answer is no, every wave pays again.

Martenweave is maintained by Dzmitryi Kharlanau.

We are building Martenweave so that mappings become durable model infrastructure:

```text
Workbooks provide input.

Canonical objects preserve meaning.

Validators detect contradictions.

Datasets prove coverage.

Lineage exposes impact.

AI proposes mappings and changes.

Experts resolve ambiguity.

Humans approve.

Git records the history.
```

The cost reduction does not come from eliminating mapping expertise.

It comes from ensuring that expert mapping work is paid for once and reused many times.

## Sources and notes

This article was reviewed on 15 July 2026.

The financial model is illustrative. It assumes six mapping waves per year, 180 baseline consultant-days per wave, 65 future-state days per wave, a blended external rate of €1,200 per day, 220 onboarding days, €80,000 annual tooling and support and €60,000 annual internal stewardship. These are modelling assumptions, not market benchmarks, vendor guarantees or financial advice.

Martenweave Core currently describes a backend-first model-governance and Evidence layer that turns spreadsheets, datasets, tickets, validation reports, Decisions and SAP context into canonical files, deterministic validation, dataset gaps, lineage, impact analysis and human-approved proposals.

Its generic model includes domains, entities, Attributes, relationships, datasets, mappings, Rules, Evidence, Decisions and change proposals.

Its current principles keep canonical files authoritative, generated indexes disposable, validation deterministic and AI-generated changes proposal-first.

SAP describes SAP Master Data Governance as a central governance layer that preserves semantics and relationships, supports governed ownership of Attributes, validates business Rules and maintains an audit trail of data changes. SAP also distinguishes master-data integration from quality improvement: integration distributes data in its current state, while governance establishes trusted meaning and control.

SAP describes SAP Integration Suite as a platform for connecting applications, data, APIs, events and partners across SAP and third-party landscapes. SAP highlights central governance, monitoring, reusable integrations, AI-assisted development and mapping capabilities. The proposed Martenweave mapping registry complements this runtime and integration-governance layer by preserving canonical business meaning, cross-system mapping lineage and project Evidence.

The Canonical Mapping Registry, detailed mapping objects, proposed commands, ROI calculations and operating model are product directions. They should not be interpreted as guarantees of the exact current Martenweave schema, Workbench functionality, commercial pricing or achieved savings.

Martenweave is independent and is not affiliated with or endorsed by SAP.
