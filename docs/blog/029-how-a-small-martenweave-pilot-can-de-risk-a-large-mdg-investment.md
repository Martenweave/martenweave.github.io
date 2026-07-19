# How a Small Martenweave Pilot Can De-Risk a Large MDG Investment

**Reviewed: 14 July 2026**

The organisation is preparing a major SAP Master Data Governance programme.

The business case includes:

- a governed data model;
- central workflows;
- improved data quality;
- harmonised customer or supplier records;
- integration with SAP S/4HANA;
- stronger ownership;
- better support for future automation and AI.

The platform decision may already be made.

A systems integrator is preparing the implementation plan. Workstreams are being created. Countries are nominating representatives. The programme is discussing timelines, licences, environments and staffing.

Then somebody asks a less comfortable question:

> Can we already prove that we understand the model, sources, mappings and decisions that the MDG implementation will depend on?

The answer is often incomplete.

The organisation may not yet know:

- which source system owns each critical attribute;
- whether current datasets can populate the proposed model;
- how global and local requirements differ;
- whether important terms have shared definitions;
- which migration defaults will be needed;
- who has authority to approve model changes;
- how implementation decisions will survive handover;
- whether the target design can be traced back to evidence.

These uncertainties do not mean the MDG investment is wrong.

They mean the programme is about to scale unresolved model risk.

A small Martenweave pilot can help expose that risk before it becomes embedded in a large implementation.

The pilot should not attempt to prove that SAP MDG can run workflows, validate records or govern master data. SAP already positions the product around governed models, golden records, matching, consolidation, steward workflows, validated values, data-quality monitoring and auditable changes.

The pilot should test something more specific:

> Can this organisation establish and maintain the model truth that its MDG programme will need?

That is a smaller question.

It can be tested before the full programme commits to a large design, extensive customisation and several waves of migration.

## A pilot should reduce uncertainty, not demonstrate software

Many pilots become controlled demonstrations.

The team selects clean sample data, configures a narrow happy path and shows that a tool can produce an expected screen or report.

Management sees a successful demo.

The programme learns very little about its actual implementation risk.

A Martenweave pilot should use real evidence:

- a current mapping workbook;
- an actual source extract;
- open and closed project issues;
- target-model assumptions;
- country-specific requirements;
- recent validation findings;
- existing architecture decisions.

The purpose is not to make the pilot look successful.

The purpose is to discover whether the organisation can control the model before scaling the programme.

A good pilot may produce uncomfortable results:

- no reliable source exists for a mandatory field;
- several countries use conflicting definitions;
- the latest dataset does not match the mapping workbook;
- important rules have no named owner;
- approved decisions cannot be reconstructed;
- target changes have unknown downstream impact.

These findings are not pilot failures.

They are risks discovered at a stage when they are still comparatively cheap to address.

## What a large MDG investment is actually betting on

An MDG programme does not invest only in software.

It is also betting that the organisation can define and operate:

- shared master-data semantics;
- governance ownership;
- source authority;
- validation rules;
- global and local variation;
- integration responsibilities;
- migration treatment;
- change control;
- support processes.

SAP can provide the operational governance platform.

It cannot decide what the organisation means by “strategic supplier,” which legacy source is authoritative or whether a country exception is valid.

SAP describes MDG as a central governance layer that combines master data, policy and metadata, supports ownership of unique attributes, enforces validated values through workflow and monitors established business rules.

The organisation still needs to provide the policies, meanings, decision rights and implementation evidence that make those capabilities useful.

A pilot can test the quality of that foundation.

## The pilot is not a smaller MDG implementation

This distinction matters.

A weak pilot attempts to recreate:

- full change-request workflows;
- large user interfaces;
- stewardship processes;
- record maintenance;
- matching and consolidation;
- production integration.

That would turn the pilot into a second implementation project.

Martenweave is not intended to replace the operational MDG platform.

The current core defines itself as an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS. It turns spreadsheets, datasets, tickets, validation reports, decisions and SAP context into canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-approved AI patch proposals.

The pilot should therefore focus on the model and evidence around the MDG investment.

It should answer questions such as:

- Can we create a canonical model from our current artefacts?
- Can we validate its internal consistency?
- Can we connect actual source data to target requirements?
- Can we detect missing source and value coverage?
- Can we trace one critical attribute end to end?
- Can we analyse one real proposed change?
- Can we preserve a decision and its evidence?
- Can another team understand the model without relying on one expert?

## Select a narrow but painful domain

Do not select the easiest domain merely to produce a clean result.

Select a domain where fragmentation already creates cost.

Suitable examples include:

- Business Partner tax identifiers;
- customer sales attributes;
- supplier classifications;
- payment terms;
- bank-data requirements;
- product classifications;
- Business Partner relationships;
- local registration data.

The pilot domain should have several of the following characteristics:

- more than one source system;
- an active migration or harmonisation need;
- important business rules;
- known data-quality problems;
- local variation;
- recurring defects;
- unclear ownership;
- frequent change;
- high dependence on one expert.

A domain with no conflict, no mappings and no current data will demonstrate only that model objects can be created.

The organisation needs to test whether the layer helps where the work is genuinely difficult.

## Keep the scope small enough to finish

A practical pilot might include:

- one domain;
- one or two source systems;
- one SAP target context;
- one or two countries;
- 30–100 critical attributes;
- a current CSV or XLSX dataset;
- one active mapping workbook;
- several rules and value lists;
- five to ten recent decisions or issues;
- one proposed model change.

This is enough to test the full control loop.

It is not enough to become a parallel enterprise model programme.

The objective is depth over breadth.

Ten thousand imported fields with weak meaning do not prove value.

Fifty well-connected critical attributes can.

## Start with a pilot question

The pilot needs a decision question, not only a feature list.

Examples include:

> Are our supplier mappings and current source datasets sufficiently defined to begin the MDG design for Wave 1?

> Can we control global and country-specific Business Partner tax requirements without maintaining separate model copies?

> Can we identify the impact of changing Customer Group before configuration and migration work begin?

> Can AMS investigate a critical field using maintained model evidence rather than the original project team?

The pilot question determines which evidence matters.

Without it, the team may build an impressive repository that does not support an actual programme decision.

## Step 1: establish the evidence boundary

Identify which inputs will be used.

Possible inputs include:

- target-model workbook;
- source-system field list;
- current migration mapping;
- representative dataset;
- rule catalogue;
- Jira issues;
- Confluence decisions;
- interface specification;
- current SAP endpoint information.

Do not ingest the complete project archive.

Choose evidence that directly supports the pilot question.

For each input, record:

- source;
- owner;
- date;
- version;
- expected authority;
- known limitations.

This immediately exposes an important risk: several artefacts may each claim to be authoritative.

The pilot should not resolve that conflict silently.

It should make it visible.

## Step 2: create stable model objects

Convert the selected knowledge into identifiable objects such as:

- Domain;
- Entity;
- Attribute;
- EntityContext;
- FieldEndpoint;
- Mapping;
- Rule;
- ValueList;
- Dataset;
- Decision;
- Issue.

For example:

```text id="pilot-01"
Attribute:
ATTR-SUPPLIER-RISK

Source endpoint:
FEP-ERP-A-VENDOR-RISK

Target endpoint:
FEP-SAP-SUPPLIER-RISK

Mapping:
MAP-SUPPLIER-RISK-ERP-A

Rule:
RULE-SUPPLIER-RISK-REQUIRED

Decision:
DEC-SUPPLIER-RISK-004
```

The stable identities are important because they allow the same object to appear consistently in:

- mapping exports;
- readiness reports;
- issues;
- tests;
- impact results;
- change proposals.

The pilot is testing whether the organisation can maintain one identity across its delivery tools.

## Step 3: validate the model before analysing it

Martenweave’s current principles require canonical files as the source of truth, disposable generated indexes and deterministic validation of IDs, types, references and domain-context rules before indexing.

The first validation pass may find:

- duplicate identifiers;
- missing source or target endpoints;
- mappings referring to retired objects;
- rules without attributes;
- local overrides without global parents;
- critical objects without owners;
- value mappings using unknown values.

These findings are useful because they reveal structural weaknesses in the model knowledge before the programme begins depending on generated reports or AI analysis.

The pilot should distinguish:

- structural failures;
- missing evidence;
- unresolved business decisions;
- accepted exceptions.

A validator cannot decide which field is semantically correct.

It can ensure that approved objects do not point to something that does not exist.

## Step 4: connect a real dataset

This is where many modelling exercises become practical.

Use an actual source extract or a representative current dataset.

Profile:

- available columns;
- record count;
- completeness;
- distinct values;
- duplicates;
- key integrity;
- relationship integrity;
- source-value coverage.

Then compare the dataset with model expectations.

The current Martenweave core supports CSV/XLSX profiling, dataset-to-model gap detection and a one-command dataset-readiness workflow.

The relevant question is not:

> Does the file contain data?

It is:

> Can the current data support the proposed model for the applicable population?

For example:

```text id="pilot-02"
Target attribute:
Supplier Risk Classification

Required population:
Active suppliers

Expected source:
ERP_A.VENDOR_RISK

Dataset finding:
Column exists, but 18% of active suppliers are blank.

Value coverage:
94% of populated records map to approved target values.

Uncovered values:
STRAT, UNKNOWN
```

This evidence may change the MDG design or migration plan before configuration becomes expensive to revise.

## Step 5: trace one critical attribute end to end

Select one attribute with meaningful business and technical consequences.

Trace:

```text id="pilot-03"
Dataset column
→ source endpoint
→ mapping
→ business attribute
→ target endpoint
→ validation rule
→ decision
→ owner
→ test or consumer
```

The pilot should show whether this trace can be established from available evidence.

Possible outcomes include:

### Complete trace

The organisation can explain the attribute consistently.

### Structural gap

An expected object or relationship is missing.

### Evidence gap

A mapping exists, but no decision or dataset proof is available.

### Conflict

Several sources or definitions compete.

### Ownership gap

The model is clear, but no responsible authority is named.

Each outcome provides useful programme information.

## Step 6: run one real impact analysis

Do not invent a harmless demonstration change.

Use a real request, such as:

- make a field mandatory;
- add a value;
- replace a source field;
- introduce a local exception;
- retire an attribute;
- change a validation from warning to error.

Martenweave currently provides trace and impact commands against the canonical model.

The impact assessment should identify:

- mappings;
- datasets;
- rules;
- value lists;
- contexts;
- decisions;
- owners;
- tests;
- downstream consumers.

The purpose is not to claim that every dependency has been discovered automatically.

It is to compare the result with the current manual process.

Ask:

- How long would the programme normally need?
- Which dependencies were previously invisible?
- Which relationships remain unavailable?
- Which additional model objects would be required?

This tests whether the registry reduces real change-analysis effort.

## Step 7: create a controlled proposal

The pilot should include one change moving through a proposal lifecycle.

For example:

```text id="pilot-04"
Proposed change:
Add local Supplier Risk value UNDER_REVIEW.

Evidence:
1,442 records use source value STRAT.
Current mapping has no approved treatment.

Potential impact:
- value list;
- migration mapping;
- compliance workflow;
- outbound interface;
- test cases.
```

Martenweave’s current design states that AI must not silently mutate the model. AI creates `PatchProposal` objects for human review, while approved changes become `ChangeRequest`s.

The pilot should prove that:

- the proposed state is separate from approved truth;
- structural validation runs against the proposal;
- reviewers can understand the semantic difference;
- evidence and affected objects are visible;
- the decision remains human-owned.

This matters because future MDG programmes are likely to use AI for mapping, documentation and analysis.

The governance boundary should exist before autonomous tooling is introduced.

## Step 8: produce a readiness or risk report

The pilot should end with a decision-oriented report.

It should not simply list the objects created.

A useful report includes:

- pilot scope;
- model baseline;
- dataset baseline;
- structural validation result;
- mapping coverage;
- dataset gaps;
- value coverage;
- unresolved decisions;
- ownership gaps;
- impact-analysis result;
- accepted conditions;
- recommended next action.

For example:

```text id="pilot-05"
Pilot conclusion:

The proposed Supplier Risk model is structurally valid.

ERP_A can support 82% of the active population directly.

Two source values covering 6% of records have no approved mapping.

ERP_B has no reliable source field.

The target requirement should not be made globally mandatory
until ERP_B treatment and temporary-value governance are approved.
```

This is a direct contribution to MDG programme planning.

## What the pilot can de-risk

A small pilot can reduce several categories of uncertainty.

## 1. Scope risk

It can reveal that the proposed domain contains:

- more attributes than expected;
- unclear boundaries;
- hidden local extensions;
- overlapping definitions;
- dependencies on other domains.

This helps prevent underestimating the implementation scope.

## 2. Source-data risk

It can test whether source systems actually contain the required information.

This is especially important because SAP recommends curating master data early, before an S/4HANA implementation, due to the dependence of automated processes on clean and correct master data.

A design that cannot be populated is not ready for large-scale implementation.

## 3. Mapping risk

The pilot can reveal:

- missing source treatments;
- incomplete value coverage;
- wrong organisational context;
- hidden defaults;
- conflicting workbook versions.

This reduces the likelihood that configuration is designed against mappings that have never been validated with current data.

## 4. Governance risk

It can show whether the organisation has:

- named owners;
- clear approval roles;
- decision records;
- global and local authority;
- exception management.

SAP MDG can route decisions through workflow. The organisation still needs to know who has the authority and why.

## 5. Localisation risk

A pilot using two countries can reveal whether the model supports:

- inheritance;
- local extension;
- contextual override;
- temporary deviation.

This is far cheaper than discovering during rollout that every country has built a separate model copy.

## 6. Integration risk

Tracing one critical value to downstream consumers can reveal:

- unsupported codes;
- missing outbound fields;
- interface assumptions;
- reporting dependencies.

The pilot does not need to implement all integrations.

It should test whether dependencies can be identified before the target change is approved.

## 7. Testing risk

Connecting tests to mappings and rules shows whether the organisation can determine:

- what a test proves;
- which baseline it applies to;
- when evidence becomes stale;
- what should be retested after change.

This reduces broad, repetitive regression cycles caused by uncertain impact.

## 8. Handover risk

The pilot can test whether another qualified person can understand the domain from maintained model objects and evidence.

If only the pilot architect can explain the result, the technology worked but the knowledge model did not.

## 9. Vendor-dependency risk

Canonical files, Git history and local execution allow the model to remain under organisational control rather than existing only inside one implementation partner’s proprietary workbook or platform.

The Martenweave core is local-first and currently has no cloud dependency or SaaS lock-in.

This does not remove the need for implementation partners.

It gives the client a more portable representation of the agreed model.

## What the pilot should not claim

A successful pilot does not prove:

- enterprise production scalability;
- complete SAP MDG integration;
- regulatory compliance;
- automatic configuration alignment;
- perfect lineage;
- autonomous model engineering;
- readiness for every domain;
- elimination of Excel, Jira or Confluence.

It proves that a bounded model-control process can provide useful evidence for one real implementation problem.

That is enough for the next decision.

## Current Martenweave maturity matters

As of July 2026, the Martenweave Core README lists source version 0.6.1. It remains a CLI-driven backend and core library intended for pipelines, IDEs, local API processes, MCP servers and agent workflows. It does not include a hosted editable production UI; the static viewer and local frontend prototype are for inspection and demonstration.

This creates both strengths and limitations.

### Strengths

- local-first operation;
- readable canonical files;
- Git-based review;
- deterministic commands;
- low infrastructure requirements;
- easy experimentation;
- no direct production integration required.

### Limitations

- business users may need generated spreadsheets or reports;
- the operating model is still CLI-first;
- enterprise access control and hosted collaboration are not the current product;
- integrations may require project-specific work;
- the pilot needs technical ownership.

These limitations should be part of the pilot assessment.

Do not present an early open-source core as a finished enterprise platform.

## Define success before starting

A pilot should have measurable success criteria.

Useful criteria include:

### Model clarity

Can the team identify the approved model for the selected scope?

### Structural quality

Can the model pass deterministic validation with known exceptions?

### Dataset coverage

Can the current dataset be compared with model expectations?

### Traceability

Can critical fields be traced from source to target and decision?

### Impact speed

Can the team analyse a real change faster or more completely than before?

### Proposal governance

Can a change be proposed, reviewed and kept separate from the approved model?

### Handover

Can another person use the outputs without the pilot author reconstructing them?

### Programme decision

Did the pilot change or confirm a real MDG planning decision?

This final criterion is important.

A technically successful pilot that has no effect on programme planning may be interesting but not valuable.

## Define failure and stop criteria

The pilot should also be allowed to show that Martenweave is not justified.

Possible stop signals include:

- the current workbook already provides reliable control;
- the domain is too small to benefit from a registry;
- users will not maintain stable object identities;
- no owner exists for canonical model approval;
- evidence cannot be accessed;
- the team wants only a document search tool;
- the main problem is operational MDM rather than model governance;
- maintaining the model costs more than repeated investigation.

An honest pilot may conclude:

> The current process is sufficient for this domain.

That is a valid result.

The purpose is to reduce investment uncertainty, including uncertainty about Martenweave itself.

## A sample pilot plan

A compact sequence could look like this.

## Phase 1: baseline

- select domain and decision question;
- identify evidence;
- define critical attributes;
- record scope and current versions.

## Phase 2: model construction

- create entities, attributes and contexts;
- create source and target endpoints;
- import or structure mappings;
- add rules, values, ownership and decisions.

## Phase 3: validation and indexing

- validate IDs, types and references;
- resolve structural failures;
- build the generated index;
- establish a baseline report.

## Phase 4: dataset evidence

- profile the current dataset;
- detect missing columns;
- measure completeness;
- assess value coverage;
- identify key and relationship gaps.

## Phase 5: trace and impact

- trace selected critical fields;
- analyse one real proposed change;
- compare with the existing manual process.

## Phase 6: proposal and review

- create a PatchProposal;
- validate the proposed state;
- conduct human review;
- record the decision or rejection.

## Phase 7: decision report

- summarise findings;
- identify risks for MDG implementation;
- recommend proceed, adjust or stop;
- define the next bounded scope.

This sequence follows the current Martenweave pipeline: import or profile evidence, validate canonical files, build indexes, detect gaps, run lineage and impact analysis, generate proposals and publish reviewable issues or pull requests.

## A worked example: supplier classification

Suppose the future MDG programme plans to govern Supplier Classification.

The target design proposes:

- values `STANDARD`, `STRATEGIC`, `CRITICAL`;
- mandatory classification for active suppliers;
- compliance approval for `CRITICAL`.

The pilot uses two legacy systems and one current extract.

### Model findings

The two source systems use different concepts:

- ERP_A classifies suppliers by spend;
- ERP_B classifies suppliers by relationship type.

Neither is semantically equivalent to the proposed target definition.

### Dataset findings

- ERP_A is fully populated but contains seven source values;
- ERP_B is only 52% complete;
- several high-volume values have no approved target mapping.

### Governance findings

- Procurement owns the target definition;
- Compliance owns the `CRITICAL` process;
- no owner is assigned for local value mappings.

### Impact findings

The proposed mandatory rule affects:

- migration remediation;
- one outbound interface;
- workflow;
- three country variants;
- existing inactive suppliers.

### Pilot conclusion

Do not begin detailed MDG configuration for this attribute yet.

First:

- approve the business definition;
- decide whether spend and relationship type require separate attributes;
- assign value-list ownership;
- define ERP_B remediation;
- confirm interface treatment.

The pilot did not weaken the MDG business case.

It prevented the programme from implementing an ambiguous classification and paying to correct it later.

## Another worked example: Business Partner tax data

The programme wants globally governed tax identifiers.

A pilot using Germany and Portugal may reveal:

- shared global concept;
- different tax categories;
- different mandatory conditions;
- different source fields;
- different exemption handling;
- incomplete Portuguese source coverage;
- one global mapping workbook that hides contextual differences.

The pilot can demonstrate a stronger pattern:

```text id="pilot-06"
Global attribute:
Tax Registration Identifier

Country contexts:
DE and PT

Contextual mappings:
Defined separately

Validation:
Country and Business Partner category specific

Decisions:
Exemptions recorded explicitly

Dataset gaps:
Measured by country and source
```

The MDG programme now has a clearer basis for contextual configuration and migration planning.

## The pilot business case

The pilot should not promise abstract “better governance.”

It should target expensive programme behaviours.

Potential value includes:

- avoiding configuration based on incorrect assumptions;
- discovering source gaps before migration build;
- reducing mapping reconciliation;
- narrowing impact-analysis effort;
- preventing local model duplication;
- preserving decisions for later waves;
- lowering handover dependence;
- improving vendor challenge and oversight;
- making AI-assisted work reviewable.

The financial value comes from avoided rework and better programme decisions.

It does not require Martenweave to replace a major enterprise platform.

## Who should participate

A small pilot still needs cross-functional input.

Useful roles include:

- business data owner;
- SAP MDG architect;
- migration lead;
- source-system expert;
- data architect;
- local representative;
- test or data-quality lead;
- technical Martenweave operator.

Not every role needs full-time involvement.

The pilot should not be run only by developers.

A technically valid model with no responsible business authority cannot de-risk the MDG investment.

## Management review questions

At the end of the pilot, management should ask:

1. Which previously hidden risks were discovered?
2. Which MDG design assumptions were confirmed?
3. Which assumptions were disproved?
4. Can current datasets support the proposed model?
5. Which model decisions remain unresolved?
6. Are global and local requirements represented clearly?
7. How quickly could the team analyse a real change?
8. Which dependencies remain outside the model?
9. Can another team use the outputs?
10. What would it cost to extend the approach to another domain?
11. Which parts should remain manual?
12. Does the organisation have an owner for canonical model truth?
13. Should the larger MDG programme proceed unchanged, be adjusted or pause one workstream?
14. Did Martenweave reduce risk enough to justify continued use?

These questions keep the pilot connected to investment governance.

## Common pilot mistakes

### Selecting only clean sample data

The pilot should expose actual implementation uncertainty.

### Trying to model the entire enterprise

The pilot loses focus and becomes another transformation programme.

### Measuring success by imported-object count

Object quantity does not prove better decisions.

### Ignoring current datasets

A target model without source evidence remains theoretical.

### Treating AI inference as approved mapping

AI output must remain a reviewable proposal.

### Building a large UI first

The core value should be proven through validation, gaps, traceability and impact.

### Duplicating every Jira and Confluence artefact

Store the model identity, relationship and approved outcome.

### Excluding business owners

Technical teams cannot approve business meaning.

### Hiding negative findings

Risk discovery is the purpose of the pilot.

### Automatically expanding after a good demo

The next scope should be selected based on measured value.

## When to scale the pilot

Scale when the pilot demonstrates that:

- critical questions can be answered faster;
- model gaps are found earlier;
- dataset evidence changes decisions;
- relationships remain understandable;
- owners use the outputs;
- proposals can be reviewed safely;
- another domain has the same pain.

Scale incrementally:

```text id="pilot-07"
One domain
→ second source
→ second country
→ another connected domain
→ repeated programme workflow
```

Do not move directly from a 50-attribute pilot to an enterprise metadata programme.

Martenweave’s strength is a focused model-governance pipeline.

Turning it immediately into a broad platform would recreate the investment risk the pilot was meant to reduce.

## Our conclusion

A large SAP MDG programme carries risk long before the first production workflow is activated.

The risk exists in:

- ambiguous definitions;
- weak source authority;
- incomplete datasets;
- inconsistent mappings;
- unclear ownership;
- uncontrolled local variation;
- disconnected decisions;
- uncertain change impact.

A small Martenweave pilot can make those risks visible before the organisation scales them across systems, countries and implementation partners.

The pilot should not ask:

> Can Martenweave store our model?

It should ask:

> Can we use a controlled model and evidence layer to make one important MDG decision with less uncertainty?

The practical test is:

> Did the pilot reveal or resolve something that would otherwise have been discovered later during configuration, migration, testing or handover?

When the answer is yes, the pilot has de-risked the investment.

When the result is only an attractive model viewer or a larger metadata repository, it has not yet proved its value.

The strongest pilot is small enough to finish, difficult enough to be honest and connected closely enough to the MDG programme that its findings change what happens next.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We build practical model-governance infrastructure for SAP migration, MDG, MDM and AMS teams. Martenweave is designed to test and strengthen the model truth surrounding large enterprise programmes before fragmented mappings, datasets and decisions become expensive implementation dependencies.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer for master data, policy and metadata, with governed models, golden records, matching and consolidation, steward workflows, validated values, data-quality monitoring and auditable changes. SAP also recommends curating master data early before an SAP S/4HANA implementation.

The current Martenweave Core README identifies Martenweave as an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS. As of July 2026, the listed source version is 0.6.1.

The current core uses canonical model files, deterministic validation, generated SQLite and JSONL indexes, dataset-gap analysis, trace and impact analysis and human-reviewed `PatchProposal` and `ChangeRequest` workflows.

The current implementation is CLI-driven and backend-first. It does not include a hosted editable production UI or direct SAP write-back.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
