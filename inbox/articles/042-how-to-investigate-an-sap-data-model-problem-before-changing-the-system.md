# How to Investigate an SAP Data Model Problem Before Changing the System

**Reviewed: 14 July 2026**

A migration test fails because Customer Group is missing.

The defect is assigned to the mapping team.

An analyst opens the mapping workbook, finds a source field named `CUSTOMER_SEGMENT` and maps it to the SAP target field used for Customer Group. The next load succeeds.

The issue appears resolved.

Several weeks later, the sales organisation reports inconsistent customer grouping. The same customer has different commercial treatment across sales areas, but the source field contains one central value.

The migration change was technically successful.

It was semantically wrong.

The original investigation answered:

> Which available source field can populate this SAP target?

It did not answer:

> Does the source field represent the same business concept, at the same organisational level, for the same applicable population?

This distinction is central to SAP migration, MDG and MDM work.

Many model problems first appear as:

- missing fields;
- rejected records;
- incomplete mappings;
- invalid values;
- workflow errors;
- duplicate data;
- inconsistent reports;
- repeated support incidents.

The first visible symptom is rarely the complete problem.

Yet programme pressure often pushes teams directly toward a solution:

- change the mapping;
- create a default;
- disable the validation;
- add another value;
- introduce a local field;
- copy a configuration rule;
- correct the current dataset.

Sometimes that response is appropriate.

Sometimes it removes the visible error while creating a more expensive semantic or operational defect.

> A model investigation is the disciplined process of determining what is actually wrong before deciding whether the data, mapping, model, configuration or business policy should change.

The purpose is not to delay delivery with analysis.

It is to prevent teams from implementing the wrong answer quickly.

## Investigation should begin before solution design

A typical defect description already contains a proposed treatment:

> Map `CUSTOMER_SEGMENT` to Customer Group.

> Make Supplier Classification optional.

> Add `UNKNOWN` to the target value list.

> Disable the tax validation for Portugal.

This wording narrows the investigation too early.

A stronger starting point describes the observed condition:

> Customer Group is missing for 18% of applicable migrated customers.

> Active suppliers from ERP_B cannot satisfy the proposed Supplier Classification rule.

> Source value `STRAT` has no approved target treatment.

> Individual suppliers in Portugal are being blocked by a validation intended for organisations.

The observed condition leaves room to determine whether the cause lies in:

- source data;
- source definition;
- mapping;
- target design;
- context;
- SAP configuration;
- integration;
- ownership;
- business policy.

A model investigation should therefore start with a neutral problem statement.

## Separate four layers immediately

The most useful first step is to separate four kinds of information.

## 1. Observed fact

What happened?

Examples:

- 4,800 records have a blank value.
- SAP rejected records with message X.
- source value `C` has no mapping.
- a workflow routed to the wrong team.
- two systems provide different values.

This should be reproducible where possible.

## 2. Interpretation

What do people think the fact means?

Examples:

- the source field is incomplete;
- the target rule is too strict;
- two values are equivalent;
- the local process is different;
- the current mapping is wrong.

Interpretations may be reasonable without yet being proven.

## 3. Decision

What should the approved model say?

Examples:

- Supplier Risk is mandatory only for active strategic suppliers;
- Customer Group is maintained at sales-area level;
- `UNDER_REVIEW` is a process status, not a final classification;
- Portugal has an approved contextual exception.

This requires accountable human authority.

## 4. Implementation

How should the approved model be realised?

Examples:

- SAP validation;
- mapping transformation;
- source remediation;
- workflow routing;
- interface update;
- migration rule.

Programmes often mix these four layers.

A system error is treated as proof that the business model is wrong.

A convenient mapping is treated as a business decision.

An SAP limitation is allowed to redefine the target concept.

A structured investigation keeps the layers distinct.

## Define the exact investigation question

“Investigate Customer Group” is too broad.

A good investigation question should identify:

- model concept;
- observed symptom;
- scope;
- decision needed.

For example:

> Determine whether `CRM_A.CUSTOMER_SEGMENT` is a valid source for the SAP sales-area Customer Group for German and Austrian customers, and identify the correct treatment for customers with multiple sales areas.

Another:

> Determine whether blank Supplier Classification values in ERP_B represent missing data, non-applicable records or an unresolved business decision before the global validation becomes blocking.

The investigation question prevents scope drift.

It also makes the final conclusion testable.

## Establish the current approved baseline

Before investigating a potential defect, identify what the programme currently considers approved.

Possible artefacts include:

- canonical model;
- mapping baseline;
- target-design workbook;
- approved decision;
- SAP configuration specification;
- migration transformation;
- local extension;
- test expectation.

These artefacts may conflict.

The investigation should record:

```text id="inv-01"
Approved model baseline:
customer-model-v2.7

Current mapping baseline:
mapping-release-4.2

SAP implementation baseline:
MDG-R3

Dataset:
CRM_A extract dated 10 July 2026
```

Without a baseline, teams may compare:

- a new dataset;
- an old mapping;
- future target design;
- current SAP configuration.

The resulting conclusion may be internally inconsistent.

## Identify the business object before the physical fields

A common investigation failure begins with field names.

A source field resembles a target field, so the team assumes equivalence.

Instead, identify the business concept first.

For Customer Group, ask:

- What business decision does the attribute support?
- Is it central or organisational?
- Is it descriptive or process-controlling?
- Who owns it?
- Can one customer have several values?
- Does it differ from Account Group, segmentation or pricing classification?

Only then examine physical representations.

For example:

```text id="inv-02"
Business attribute:
Customer Group for Sales Processing

Source representation:
CRM_A.CUSTOMER_SEGMENT

Target representation:
SAP KNVV-KDGRP
```

The investigation must determine whether both physical fields implement the same business attribute.

Similar labels are evidence to inspect, not proof of equivalence.

## Test semantic equivalence explicitly

Two fields are semantically equivalent only when their meanings align sufficiently for the intended use.

Compare:

### Definition

What does each value mean?

### Granularity

Customer, sales area, company code, purchasing organisation or another level?

### Cardinality

One value or several values per business object?

### Lifecycle

When and by whom can the value change?

### Allowed values

Do the lists represent the same distinctions?

### Business use

Does the value drive the same workflow, reporting or process?

### Applicability

Does it apply to the same populations and contexts?

Example:

```text id="inv-03"
CRM_A.CUSTOMER_SEGMENT

Meaning:
Central marketing segment

Cardinality:
One value per customer

Usage:
Campaign selection
```

```text id="inv-04"
SAP Customer Group

Meaning:
Sales-processing classification

Cardinality:
One value per sales area

Usage:
Commercial processing and reporting
```

The fields may correlate.

They are not automatically equivalent.

A direct copy may create apparently complete but incorrect data.

## Identify the organisational context

Many SAP model problems are context problems disguised as missing data.

A value may be maintained by:

- client;
- company code;
- sales area;
- purchasing organisation;
- plant;
- country;
- partner role;
- Business Partner category.

A source value at one level cannot always populate a target value at another level without an approved rule.

Suppose one central customer segment must populate three sales areas.

Possible treatments include:

- repeat the value across all sales areas;
- derive values by sales area;
- use another source;
- maintain the target after migration;
- redesign the target concept.

Each treatment carries different meaning.

The investigation should never allow organisational expansion to happen invisibly inside technical mapping code.

## Define the applicable population

A gap percentage is meaningless without scope.

Consider:

> Supplier Classification is 70% complete.

Questions:

- 70% of all suppliers?
- active suppliers?
- strategic suppliers?
- supplier organisations only?
- one country?
- one migration wave?
- records required for cutover?

The investigation should define the population precisely.

For example:

```text id="inv-05"
Applicable population:

Country:
Germany and Austria

Business Partner category:
Organisation

Role:
Supplier

Status:
Active

Supplier segment:
Strategic

Migration wave:
Wave 2
```

This affects whether the observed gap is material.

A blank field may represent:

- a defect;
- legitimate non-applicability;
- historical data;
- an unapproved exception;
- unresolved scope.

## Inspect real dataset evidence early

Do not investigate model problems only through documentation.

Profile a current, representative dataset.

Useful checks include:

- column presence;
- completeness;
- distinct values;
- frequency;
- duplicates;
- key integrity;
- relationship integrity;
- value combinations;
- population by context.

SAP currently recommends preparing clean and correct master data well before an SAP S/4HANA implementation because increasingly automated processes depend on it.

The investigation should connect this principle to the exact model question.

For example:

```text id="inv-06"
Applicable suppliers:
24,880

Valid classifications:
18,040

Blank:
5,600

Unknown source values:
1,240

Blank distribution:
- ERP_A: 2%
- ERP_B: 41%
- Local System C: 7%
```

This result changes the investigation.

The issue may not be a global model problem.

It may be concentrated in one source system.

## Do not treat the current dataset as complete truth

Dataset evidence also has limitations.

A profile may cover:

- only one extract;
- only active records;
- only one country;
- a transformed staging file rather than the original source;
- values already changed by migration code.

Record:

- source;
- extraction date;
- filters;
- transformation state;
- record count;
- model baseline;
- known limitations.

Example:

```text id="inv-07"
Evidence limitation:

The profile uses the transformed staging file.
It cannot prove whether missing source values were defaulted
before the file was produced.
```

This may require inspecting the raw source or transformation logic.

## Trace the value end to end

A model investigation should trace the complete route:

```text id="inv-08"
business meaning
→ source representation
→ extraction
→ transformation
→ mapping
→ target representation
→ validation
→ workflow
→ consumer
```

A problem may be introduced at any point.

For example:

- source contains the correct value;
- extraction omits the field;
- transformation uses an old code list;
- mapping sends it to the wrong endpoint;
- SAP validation interprets it in the wrong context;
- outbound interface drops it;
- report assigns another meaning.

Stopping after source-to-target mapping may miss the actual defect.

Martenweave’s current core is designed around canonical model objects, generated indexes, search, trace and impact analysis.

That is the technical foundation for preserving the investigation path rather than reconstructing it repeatedly.

## Compare approved model with implemented behaviour

An investigation should reconcile at least three states.

### Approved model

What should be true?

### Implemented model

What SAP, mappings and interfaces actually implement?

### Observed data

What records currently show?

Example:

| Layer | Supplier Classification |
|---|---|
| Approved model | Mandatory for active strategic suppliers |
| SAP configuration | Mandatory for all active suppliers |
| Source data | ERP_B incomplete for 41% |
| Observed test result | Many non-strategic suppliers blocked |

The correct treatment is not simply “clean the source.”

The investigation has identified both:

- configuration misalignment;
- source limitation.

These require separate actions.

SAP MDG supports governed models, ownership, validated values, workflows, business-rule monitoring and auditable changes.

Those controls are effective only when the rule they implement has been correctly defined and scoped.

## Inspect the decision history

Many apparently irrational model elements were introduced for a reason.

A temporary default may have been approved for:

- an early mock load;
- one country;
- historical inactive records;
- a source system scheduled for replacement.

Before removing or expanding it, find:

- original problem;
- considered alternatives;
- approver;
- scope;
- expiry;
- assumptions.

Example:

```text id="inv-09"
Decision:
Use MIGRATION_REVIEW for unresolved Wave 1 suppliers.

Scope:
Inactive suppliers only.

Expiry:
Before UAT.

Restriction:
Not available in operational creation.
```

If the value is now used for active operational suppliers, the problem may be lifecycle drift rather than a bad original decision.

## Investigate ownership

A model problem may persist because authority is unclear.

Ask:

- Who owns the business meaning?
- Who owns the source?
- Who owns the target implementation?
- Who approves local exceptions?
- Who accepts residual migration risk?
- Who maintains the model after go-live?

Avoid treating the implementation consultant as the default decision owner.

The person who can configure the field is not necessarily authorised to define its meaning.

An investigation should distinguish:

```text id="inv-10"
Business owner:
Defines intended policy

Source owner:
Confirms source meaning and reliability

SAP architect:
Confirms implementation

Migration lead:
Confirms population and delivery impact

Local owner:
Confirms contextual requirement
```

## Determine whether the problem is actually a model problem

Not every migration defect requires changing the model.

A useful classification is:

## Data defect

The model and implementation are correct, but records are wrong.

Example:

- isolated invalid value;
- missing record enrichment;
- duplicate caused by source error.

## Extraction defect

The source contains the information, but the extract omits or alters it.

## Mapping defect

The approved source and target are correct, but transformation is wrong.

## Configuration defect

The approved model is correct, but SAP implements another scope or rule.

## Documentation defect

The model is correct, but supporting documentation is stale.

## Model ambiguity

The approved model does not answer the question clearly.

## Model defect

The approved model contains the wrong meaning, context or relationship.

## Policy change

The model was correct, but the business requirement has changed.

This classification determines the correct change path.

A configuration defect should not automatically rewrite the canonical model to match the current system.

A data defect should not be solved by weakening a valid business rule.

## Search for repeated symptoms

One incident may be local.

Repeated symptoms may indicate a structural model problem.

Look for:

- similar gaps in other countries;
- repeated incidents around one attribute;
- several mappings using different meanings;
- recurring manual defaults;
- multiple local exceptions;
- frequent test expectation changes.

Example:

```text id="inv-11"
ATTR-CUSTOMER-GROUP

Related findings:
- German mapping uses CRM segment
- Austria uses manual enrichment
- France uses pricing class
- three AMS incidents concern sales-area variation
```

The correct investigation scope may be broader than the original defect.

However, do not automatically launch an enterprise redesign.

Identify the shared root question first.

## Examine local and global variants

A local difference may be:

### Legitimate variation

Required by regulation, process or market structure.

### Implementation workaround

Introduced because the global design was unavailable or late.

### Historical residue

No longer needed but never retired.

### Semantic conflict

Local teams use the same term for another concept.

The investigation should ask:

- Does the local requirement represent a new context?
- Is it another value of the same attribute?
- Is it a separate attribute?
- Is it a temporary deviation?
- Should it remain local?

Avoid two symmetrical mistakes:

- forcing every local need into the global model;
- allowing every local difference to create a separate model copy.

## Inspect defaults with particular suspicion

Defaults can make migration statistics look better while reducing model quality.

A default may be valid when:

- business meaning is genuinely deterministic;
- applicability is clear;
- source conditions are explicit;
- affected records remain traceable;
- owners approve the rule.

A default is dangerous when it:

- hides missing knowledge;
- creates a plausible final value;
- collapses distinct source meanings;
- removes the ability to identify unresolved records;
- continues beyond migration.

Investigation questions include:

1. Why was the default introduced?
2. Which records receive it?
3. Can they be identified later?
4. Is the value semantically true?
5. Does it trigger downstream behaviour?
6. May users assign it operationally?
7. What is the retirement plan?

A missing value is visible uncertainty.

A false default can be invisible incorrect certainty.

## Inspect value mappings as business decisions

A value mapping table may appear technical:

```text id="inv-12"
A → STANDARD
B → STANDARD
C → STRATEGIC
```

But each row asserts semantic equivalence.

The investigation should examine:

- source definitions;
- target definitions;
- frequency;
- context;
- exceptions;
- information loss.

If both `A` and `B` map to `STANDARD`, ask whether the distinction can be discarded safely.

If the source distinction is lost, rollback may become impossible after migration.

## Test assumptions against edge cases

A proposed treatment may work for common records and fail at boundaries.

Useful edge cases include:

- multi-sales-area customers;
- suppliers with several roles;
- person versus organisation;
- inactive records;
- records transferred between countries;
- missing organisational assignments;
- historical values no longer allowed;
- source records with several candidate values.

For example, copying one central segment to every sales area may work for customers with one sales area.

It fails to prove the model for customers with several.

Edge cases should be selected based on model structure, not randomly.

## Assess downstream consequences before recommending a change

A proposed change may affect:

- mappings;
- validation;
- workflow;
- interface contracts;
- reports;
- analytics;
- local variants;
- test cases;
- remediation;
- AMS procedures.

Martenweave’s current workflow explicitly includes lineage and impact analysis before proposal publication.

The investigation should distinguish:

### Confirmed impact

A represented dependency will change.

### Review required

A dependency exists, but the consequence needs expert judgement.

### Unknown coverage

A system or relationship may exist outside the current model.

A credible investigation report should not claim complete enterprise impact when the registry has incomplete coverage.

## Do not let urgency determine the conclusion

A migration deadline may require fast action.

It does not change semantic truth.

When the final decision cannot be completed before a milestone, use a controlled temporary treatment:

- contain the affected population;
- preserve unresolved identity;
- block final activation;
- introduce an explicit temporary status;
- record owner and expiry;
- create the permanent decision backlog.

Do not pretend that a temporary technical workaround is the final approved model.

## Develop alternative treatments

A good investigation does not only identify the problem.

It evaluates realistic treatments.

Example problem:

> ERP_B cannot provide Supplier Risk.

Possible alternatives:

### Option A: source remediation

Benefits:

- establishes durable authority;
- supports future records.

Risks:

- may require source release;
- could miss migration timeline.

### Option B: controlled enrichment

Benefits:

- can support migration;
- keeps business review explicit.

Risks:

- creates operational process;
- needs ownership and audit.

### Option C: derivation

Benefits:

- scalable when reliable rules exist.

Risks:

- may create false certainty;
- rule may not cover exceptions.

### Option D: separate Review Status

Benefits:

- preserves unresolved state without corrupting final classification.

Risks:

- requires model, workflow and interface changes.

### Option E: exclude affected records

Benefits:

- protects model integrity.

Risks:

- business scope may be delayed.

### Option F: uncontrolled default

Benefits:

- fastest load completion.

Risks:

- false classification;
- low detectability;
- weak reversibility.

The investigation should recommend one treatment and explain why others were rejected or deferred.

## Separate immediate containment from permanent treatment

Some problems need an immediate operational response.

Example:

> An invalid default is currently assigning `STANDARD` to unclassified suppliers.

Immediate containment:

- stop new defaulting;
- identify affected records;
- prevent final activation where necessary.

Permanent treatment:

- define source responsibility;
- introduce approved review process;
- remediate existing population;
- update model and interfaces.

Containment prevents additional harm.

It should not be mistaken for complete resolution.

## Produce an investigation finding, not only meeting notes

A useful investigation record should contain:

## Problem statement

Neutral description of the observed condition.

## Scope

Domain, system, country, population and baseline.

## Affected model objects

Attributes, endpoints, mappings, rules, values and decisions.

## Observed evidence

Dataset and implementation facts.

## Interpretations assessed

Candidate explanations and their evidence.

## Root finding

Best-supported explanation.

## Classification

Data, extraction, mapping, configuration, model, policy or mixed issue.

## Alternatives

Serious treatments and trade-offs.

## Recommendation

Proposed next action.

## Impact

Known dependencies and coverage limitations.

## Decisions required

Exact questions and responsible owners.

## Proposed follow-up

PatchProposal, issue, remediation or configuration correction.

This turns the investigation into reusable programme knowledge.

## Use explicit finding confidence

Not every conclusion will be fully proven.

Useful confidence levels include:

### Confirmed

Direct, reproducible evidence supports the finding.

### Strongly supported

Several evidence sources agree, but one limitation remains.

### Provisional

The explanation is plausible but requires additional evidence.

### Unresolved

Competing explanations remain.

Example:

```text id="inv-13"
Finding:
CRM_A.CUSTOMER_SEGMENT is not semantically equivalent
to SAP sales-area Customer Group.

Confidence:
Strongly supported

Remaining limitation:
French local process definition has not yet been reviewed.
```

This is better than presenting all conclusions as certain.

## Define the stop condition

Investigations can expand indefinitely.

Before beginning, define what is enough to make the required decision.

For example:

> Stop when the programme can determine whether direct mapping is valid, whether contextual derivation is required, or whether another target concept must be selected.

Do not require complete enterprise documentation before fixing a bounded problem.

The goal is decision-quality evidence, not perfect knowledge.

## Know when not to change the canonical model

Do not create a model change when the investigation finds:

- one bad record;
- extraction omission;
- coding defect;
- configuration mismatch;
- stale documentation;
- failed transport.

Instead:

- correct the relevant implementation;
- link evidence to the approved model;
- verify alignment.

Changing the canonical model merely to match an implementation error destroys the distinction between intended and actual state.

## Know when a PatchProposal is appropriate

Create a PatchProposal when the investigation concludes that approved model truth may need to change.

Examples:

- new contextual rule;
- corrected business definition;
- new source or target relationship;
- retirement of obsolete value;
- changed ownership;
- new local extension;
- revised lifecycle.

Martenweave’s core explicitly requires AI-assisted changes to enter as reviewable `PatchProposal` objects and become `ChangeRequest`s only after approval.

The proposal should carry:

- investigation finding;
- evidence;
- affected objects;
- semantic diff;
- impact;
- open questions;
- required reviewers.

## Know when to create an issue instead

Create an issue when the treatment is not yet known or requires work outside the canonical model.

Examples:

- source evidence unavailable;
- owner unresolved;
- legal clarification required;
- interface consumer not assessed;
- dataset remediation needed;
- SAP configuration differs.

Martenweave’s current pipeline supports moving evidence through gap and impact analysis before generating GitHub-ready issues or proposals.

Do not force every uncertainty into a premature patch.

## A worked example: Customer Group

### Symptom

Customer Group is blank for customers migrated from CRM_A.

### Proposed quick fix

Map `CUSTOMER_SEGMENT` to SAP Customer Group.

### Investigation

#### Business concept

SAP target is sales-area-specific and controls sales processing.

#### Source concept

CRM segment is central and used for marketing.

#### Dataset

Most customers have one segment but several sales areas.

#### Existing decisions

No approved decision states that the segment should be copied to every sales area.

#### Impact

Direct replication would affect pricing reports and sales analytics.

### Finding

The source field is not semantically equivalent to the target.

### Classification

Target-source model gap, not merely missing mapping.

### Recommendation

- define the intended sales-area classification;
- identify another source or controlled derivation;
- do not use CRM segment as an unrestricted direct mapping;
- create a decision issue;
- preserve current missing values as an explicit migration gap.

The investigation prevents false completeness.

## A worked example: Supplier Classification

### Symptom

SAP validation rejects ERP_B suppliers.

### Proposed quick fix

Make the field optional.

### Investigation

#### Approved model

Classification is mandatory for active strategic suppliers.

#### SAP implementation

Rule applies to all active suppliers.

#### Dataset

ERP_B lacks classification mainly for non-strategic suppliers.

#### Source evidence

Strategic supplier population has acceptable coverage.

### Finding

The primary defect is configuration context.

A smaller source gap remains inside the genuinely applicable population.

### Classification

Mixed configuration and data issue.

### Recommendation

1. Correct the SAP rule context.
2. Profile the remaining strategic population.
3. Remediate or approve treatment for true gaps.
4. Keep the approved business policy.

Making the field optional globally would solve the visible error by weakening the correct model.

## A worked example: tax validation

### Symptom

Portuguese suppliers cannot be activated.

### Proposed quick fix

Disable the validation for Portugal.

### Investigation

#### Affected population

Most failures are individual suppliers.

#### Approved rule

Tax identifier mandatory for supplier organisations.

#### Configuration

Rule applies to persons and organisations.

#### Local evidence

No evidence supports a complete Portuguese exemption.

### Finding

The issue is an incorrect category context, not a country-level policy defect.

### Recommendation

Correct the configuration to apply only to organisations and retain the approved rule.

## A worked example: temporary migration value

### Symptom

Reports contain many suppliers classified as `MIGRATION_REVIEW`.

### Investigation

#### Decision history

Value was approved for inactive Wave 1 suppliers only.

#### Current model

Value remains active without context restriction.

#### Data

Operational users continue assigning it.

#### Consumers

Reporting treats it as a final classification.

### Finding

The original temporary decision has escaped its approved lifecycle and context.

### Recommendation

- block new operational use;
- create an explicit Review Status if the business process still needs it;
- identify and remediate existing records;
- retire the migration-only value;
- update reporting.

## How Martenweave supports the investigation

The current Martenweave Core describes itself as a backend-first model-governance and evidence layer that turns spreadsheets, datasets, tickets, validation reports, decisions and SAP context into canonical model files, deterministic validation, gap reports, lineage, impact analysis and human-approved patch proposals.

A practical investigation can use the existing workflow.

## 1. Validate the current model

```bash id="inv-14"
martenweave validate --repo ./model
```

This identifies structural inconsistencies before semantic investigation.

## 2. Check index freshness

```bash id="inv-15"
martenweave index-fresh --repo ./model
```

The investigator should not rely on stale search or lineage results.

## 3. Search for the concept

```bash id="inv-16"
martenweave search "Customer Group" --repo ./model
```

This helps locate attributes, aliases, endpoints and related objects.

## 4. Trace the object

```bash id="inv-17"
martenweave trace ATTR-CUST-SALES-CUSTOMER-GROUP --repo ./model
```

The trace should reveal represented source, target and relationship paths.

## 5. Profile the current dataset

```bash id="inv-18"
martenweave run dataset-readiness \
  --repo ./model \
  --dataset ./data/customers.xlsx \
  --out ./reports/customer-group
```

This connects the model expectation to observed evidence.

## 6. Run impact analysis

```bash id="inv-19"
martenweave impact ATTR-CUST-SALES-CUSTOMER-GROUP --repo ./model
```

This identifies represented dependencies before proposing a treatment.

## 7. Promote only a supported finding

Where the evidence supports a model change, the dataset-readiness workflow can promote gaps into a reviewable proposal or generate an issue draft.

The tools support the investigation.

They do not replace semantic and business judgement.

## AI should challenge the hypothesis, not confirm it

AI can help with:

- locating similarly named fields;
- summarising definitions;
- comparing mapping versions;
- extracting decision history;
- grouping dataset findings;
- identifying possible dependencies;
- drafting alternative treatments.

A dangerous AI workflow begins with:

> Find a field that can populate this target.

A stronger workflow asks:

> Compare candidate source fields against the target business attribute by meaning, granularity, context, lifecycle and value semantics. Identify missing evidence and do not propose a mapping when equivalence is unsupported.

AI should be encouraged to disprove the initial hypothesis.

It should label:

- facts;
- inferences;
- assumptions;
- unresolved questions.

The safe boundary remains:

```text id="inv-20"
AI organises and challenges evidence.

Validators test structural consistency.

Responsible experts decide the model treatment.
```

## A minimum investigation checklist

### Problem

- Is the symptom described without embedding a solution?
- Is the investigation question precise?

### Baseline

- Is the current approved model identified?
- Are mapping, dataset and implementation versions known?

### Meaning

- Is the business concept defined?
- Are similarly named fields distinguished?
- Is semantic equivalence tested?

### Context

- Is organisational level explicit?
- Is applicable population defined?
- Are local and global variations separated?

### Evidence

- Is a current representative dataset profiled?
- Are evidence limitations recorded?
- Are defaults and transformations visible?

### Implementation

- Does SAP configuration match the approved model?
- Are integrations and consumers assessed?
- Are repeated incidents or defects connected?

### Decision

- Is the issue classified correctly?
- Are alternatives evaluated?
- Is immediate containment separated from permanent treatment?
- Are the required owners identified?

### Output

- Is there a reusable finding?
- Is confidence stated?
- Is impact recorded?
- Is the next action a proposal, issue, correction or remediation?

## What management should ask

1. What fact triggered this investigation?
2. What solution was initially assumed?
3. What is the exact business concept?
4. Are source and target meanings genuinely equivalent?
5. At which organisational level does each field operate?
6. Which population is actually affected?
7. Does current dataset evidence support the conclusion?
8. Does SAP implement the approved model or another rule?
9. Is the problem data, mapping, configuration, model or policy?
10. Which alternatives were considered?
11. What happens if the quick fix is wrong?
12. Which dependencies would change?
13. Which conclusion is confirmed, and which remains provisional?
14. What is the smallest safe next action?
15. Is a model change genuinely required?

If the investigation begins and ends with “we found a field with a similar name,” the programme has not investigated the model.

## Common mistakes

### Beginning with the desired fix

Evidence is interpreted to justify the requested solution.

### Treating labels as semantic definitions

Similar names conceal different business concepts.

### Ignoring organisational granularity

Central values are copied into contextual targets without approval.

### Profiling the wrong population

Global completeness hides the records to which the rule actually applies.

### Trusting transformed data as raw source evidence

Defaults and conversions may already have changed the result.

### Rewriting the model to match incorrect configuration

The distinction between intended and implemented state disappears.

### Treating one successful record as proof

Common cases pass while edge cases remain invalid.

### Solving visible blanks with plausible defaults

Uncertainty becomes undetectable incorrect data.

### Ignoring decision history

Temporary or contextual treatments are expanded beyond their scope.

### Creating a PatchProposal before the finding is supported

Uncertainty is converted into premature design.

### Allowing AI to optimise for completion

The agent finds a technically possible mapping rather than a semantically valid treatment.

## When a lightweight investigation is enough

A short investigation may be sufficient when:

- one system is involved;
- the business meaning is stable;
- the error is isolated;
- no context variation exists;
- impact is limited;
- evidence is clear.

A concise record may contain:

- observed fact;
- affected object;
- classification;
- correction;
- verification.

A fuller investigation is justified when:

- source and target meanings differ;
- several systems or countries are involved;
- the change affects critical attributes;
- defaults or information loss are proposed;
- organisational levels differ;
- current evidence conflicts;
- AI-generated mappings are being considered;
- the result will be reused across waves or AMS.

## Our conclusion

Most expensive model defects do not begin as dramatic architecture failures.

They begin as reasonable shortcuts:

- use the similarly named field;
- add a default;
- disable the rule;
- copy the local treatment;
- correct the current file.

The shortcut succeeds technically.

The hidden semantic problem survives.

A disciplined model investigation asks:

- What exactly happened?
- What is fact and what is interpretation?
- Which business concept is involved?
- What is the current approved baseline?
- Do source and target meanings align?
- At what context and granularity?
- What does the current dataset show?
- Does implementation match the model?
- Which treatment reduces the real risk?
- Does the canonical model actually need to change?

The practical test is:

> Could another qualified architect reproduce the investigation, inspect the same model and evidence, and understand why the recommended treatment is safer than the apparent quick fix?

When the answer is yes, the programme has created a defensible model decision.

When the answer is no, the team may have resolved the current error while leaving the underlying model problem to return in testing, cutover or production support.

This is the pain Martenweave should continue to close:

> Turning scattered symptoms and evidence into a traceable investigation before anyone changes model truth.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We build Martenweave as a model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

Martenweave connects:

- canonical model objects;
- source and target endpoints;
- datasets;
- mappings;
- rules;
- evidence;
- decisions;
- impact;
- reviewable proposals.

The product does not decide business meaning automatically.

It gives teams a controlled way to investigate model problems, test assumptions and create a reviewable change only when the evidence supports it.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer unifying master data, policy and metadata. Its capabilities include governed models, preserved semantics and relationships, data profiling and reconciliation, stewardship workflows, validated values, business-rule monitoring, quality management and auditable changes.

SAP also recommends curating clean and correct master data well before an SAP S/4HANA implementation because increasingly automated processes depend heavily on master-data quality.

The current Martenweave Core README describes Martenweave as a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS. It converts spreadsheets, datasets, tickets, validation reports, decisions and SAP context into canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-reviewed patch proposals.

The current core uses canonical Markdown and YAML files as source of truth, rebuildable SQLite and JSONL indexes, deterministic validation and proposal-first AI-assisted changes.

The documented workflow includes evidence profiling, validation, index generation, dataset/model gap detection, lineage, impact analysis, PatchProposal generation and GitHub-ready issue or pull-request output.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
