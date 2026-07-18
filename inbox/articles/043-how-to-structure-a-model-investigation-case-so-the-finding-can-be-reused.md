# How to Structure a Model Investigation Case So the Finding Can Be Reused

**Reviewed: 14 July 2026**

The German migration team spends three weeks investigating why Customer Group cannot be mapped reliably.

They compare CRM fields, inspect SAP targets, interview the sales-process owner, profile current values and discover that the source contains one central marketing segment while the SAP target is maintained separately by sales area.

The team rejects the direct mapping.

They document the conclusion in a meeting presentation, update the German workbook and close the Jira ticket.

Six months later, the Austrian rollout encounters the same problem.

The Austrian team cannot find the original analysis. The presentation explains the decision but does not identify the datasets, model baseline or rejected alternatives. The German mapping workbook contains the final treatment but not the reasoning.

The Austrian team repeats most of the investigation.

A year later, an AMS incident raises the same question again after a source-system upgrade.

The organisation paid for the answer three times.

This is one of the less visible costs of SAP migration and MDM programmes. Teams do not only lose knowledge when documents disappear. They lose it when the result remains available but cannot be safely reused.

A conclusion such as:

> Do not map CRM Customer Segment directly to SAP Customer Group.

is useful only when the next team can determine:

- which business concepts were compared;
- which systems and organisational levels were in scope;
- what evidence supported the conclusion;
- which alternatives were rejected;
- whether the finding still applies;
- what would invalidate it.

That requires more than meeting minutes or a resolved ticket.

It requires a reusable investigation case.

## The expensive part is not always finding the answer

The first investigation usually consumes substantial effort:

- locating source and target definitions;
- finding the current mapping;
- obtaining representative datasets;
- identifying the right owners;
- comparing meanings;
- understanding organisational context;
- testing edge cases;
- assessing downstream impact.

Once the team has done this work, the marginal cost of preserving it properly is relatively small.

Yet programmes often save only the final outcome:

- mapping changed;
- rule narrowed;
- value rejected;
- source selected;
- issue closed.

The evidence chain disappears.

That creates three forms of waste.

### Repeated analysis

Later teams must rediscover the same facts.

### Unsafe copying

A previous conclusion is copied into a new context without checking whether its assumptions still hold.

### Decision drift

The organisation remembers an oversimplified version of the finding.

For example:

> Customer Segment cannot be used.

The actual finding may have been narrower:

> The central CRM Customer Segment cannot be copied directly into the sales-area Customer Group without an approved organisational derivation.

The difference matters.

## A reusable case is not a large report

The answer is not to write a forty-page document for every field issue.

A reusable investigation case is a structured evidence package with a defined scope and conclusion.

It should be small enough to maintain and complete enough to support later decisions.

A useful case answers seven questions:

1. What triggered the investigation?
2. Which model objects and populations were examined?
3. What did the evidence show?
4. Which explanations were tested?
5. What conclusion was reached?
6. Which decision or treatment followed?
7. Under which conditions can the finding be reused?

The final question is what distinguishes a reusable case from ordinary project documentation.

## The case needs a stable identity

A case should have its own identifier.

For example:

```text
INV-CUSTOMER-GROUP-CRM-A-001
```

The identifier allows it to be referenced from:

- model objects;
- mappings;
- decisions;
- gaps;
- risks;
- PatchProposals;
- GitHub issues;
- test cases;
- later investigations.

A title alone is unreliable.

Several teams may create documents called:

- Customer Group Analysis;
- Customer Group Mapping;
- Customer Group Issue;
- Customer Group Decision.

A stable ID makes it clear that they refer to one investigation record.

## Open with the trigger, not the solution

The case should begin with what caused the investigation.

Example:

```text
Trigger:

During Mock Load 2, 18% of German customer sales-area records
had no approved value for SAP Customer Group.
```

This is stronger than:

```text
Request:

Map CRM_A.CUSTOMER_SEGMENT to KNVV-KDGRP.
```

The second statement already assumes the answer.

The trigger should preserve the original symptom so later readers can determine whether their problem is genuinely similar.

Useful trigger types include:

- dataset gap;
- failed migration;
- conflicting mappings;
- validation defect;
- production incident;
- requested local exception;
- source-system retirement;
- changed business policy;
- AI-generated proposal requiring verification.

## Freeze the investigation scope

The case should state what was and was not examined.

For example:

```text
Business domain:
Customer

Countries:
Germany and Austria

Source:
CRM_A

Target:
SAP S/4HANA Customer Group

Organisational level:
Sales area

Population:
Active sold-to parties included in Wave 2

Excluded:
Historical inactive customers and pricing-group analysis
```

This boundary prevents later users from applying the finding too broadly.

A result proven for:

- active customer organisations;
- one source system;
- two countries;
- one SAP target;

should not automatically become a global enterprise rule.

## Record the model baseline

Every investigation takes place against a particular version of model truth.

The case should record:

- canonical model baseline;
- mapping version;
- dataset version;
- relevant implementation release;
- investigation date.

Example:

```text
Canonical model:
customer-model-v2.7

Mapping baseline:
migration-mappings-v4.2

Source extract:
CRM_A_2026-07-10.csv

SAP implementation:
MDG-R3

Investigation completed:
14 July 2026
```

This allows a later team to determine whether the conclusion was based on the same model state it is currently using.

Without baseline information, a finding may appear current while referring to:

- an old value list;
- a retired endpoint;
- a previous source structure;
- a superseded SAP design.

## Build the case around model objects

The investigation should identify the exact objects involved.

For example:

```text
Business attribute:
ATTR-CUST-SALES-CUSTOMER-GROUP

Source endpoint:
FEP-CRM-A-CUSTOMER-SEGMENT

Target endpoint:
FEP-S4-KNVV-KDGRP

Current mapping:
MAP-CRM-A-CUSTOMER-GROUP

Related rule:
RULE-CUSTOMER-GROUP-REQUIRED-DE

Dataset:
DATASET-CRM-A-WAVE-2
```

This converts the case from a narrative document into a reusable part of the model knowledge layer.

The next user can open the target attribute and discover:

- the investigation;
- the decision;
- current mapping;
- related evidence;
- later changes.

Martenweave’s core already models domains, entities, attributes, relationships, datasets, mappings, rules, evidence, decisions and change proposals around canonical files and generated indexes.

The investigation case should connect those existing objects rather than create a parallel document universe.

## Preserve evidence as evidence

An investigation may use several evidence sources:

- source definitions;
- target definitions;
- dataset profiles;
- sample records;
- SAP configuration;
- interface specifications;
- business-owner interviews;
- previous decisions;
- incident history.

Each evidence item should identify:

- type;
- source;
- date;
- owner or producer;
- model objects supported;
- limitations;
- current or superseded status.

Example:

```text
Evidence:
EVID-CRM-A-SEGMENT-PROFILE-2026-07

Type:
Dataset profile

Source:
CRM_A Wave 2 extract

Records:
148,620

Supports:
Source cardinality and value distribution

Limitation:
Extract contains transformed values and does not prove
the original operational maintenance process
```

The limitation is part of the evidence.

A dataset can show what values exist.

It may not prove what those values mean.

## Distinguish evidence from claims

A reusable case should separate raw findings from interpretation.

### Evidence

```text
92% of customers have one CUSTOMER_SEGMENT value.
8% have no value.
No customer has more than one value.
```

### Interpretation

```text
The source represents a central customer-level classification.
```

### Decision relevance

```text
The SAP target permits different values by sales area.
Direct replication would therefore require an explicit rule
for organisational expansion.
```

When these layers are combined into one paragraph, later readers cannot tell which parts were measured and which parts were inferred.

## Keep the hypothesis trail

A good investigation rarely begins with the correct explanation.

The case should preserve serious hypotheses that were tested.

Example:

### Hypothesis 1

`CUSTOMER_SEGMENT` is equivalent to SAP Customer Group.

**Result:** Rejected.

**Reason:** Different organisational granularity and business use.

### Hypothesis 2

The same source value can be repeated across every sales area.

**Result:** Not approved.

**Reason:** No business rule confirms that all sales areas use identical grouping.

### Hypothesis 3

Another CRM field provides sales-area grouping.

**Result:** Unsupported.

**Reason:** No candidate field exists in the current extract.

### Hypothesis 4

Target value should be maintained through controlled enrichment.

**Result:** Recommended for the current migration scope.

This trail prevents a future team from repeating already rejected ideas.

It also reveals which alternatives remain open.

## Record negative findings

Negative findings are often as valuable as positive ones.

Examples:

- no authoritative source exists;
- two fields are not semantically equivalent;
- no evidence supports a global rule;
- current data cannot distinguish two target values;
- direct derivation would lose information;
- the proposed default is not business-valid.

Projects often fail to preserve these findings because they do not produce a new field or mapping.

Later teams rediscover the same dead ends.

A reusable case should treat:

> We proved that this treatment is unsafe

as a valid outcome.

## The finding should be one clear statement

A long investigation needs a concise conclusion.

For example:

> `CRM_A.CUSTOMER_SEGMENT` is not a valid direct source for SAP sales-area Customer Group because it represents one central marketing classification per customer, while the SAP target can vary by sales area and is used for sales processing.

This statement contains:

- source;
- target;
- conclusion;
- main reason.

It is more durable than:

> Mapping not recommended.

## Then state the approved consequence

The finding and the decision are related but separate.

### Finding

The two fields are not directly equivalent.

### Decision

Use controlled business enrichment for Wave 2 and create a separate design decision for future sales-area derivation.

The finding may remain valid even if the treatment changes later.

For example, another source system may eventually become available.

Do not rewrite the original finding merely because the implementation response changes.

## Add reuse conditions

This is the part most project documents omit.

A case should state where its finding may be reused.

Example:

```text
Reusable when:

- the source remains CRM_A.CUSTOMER_SEGMENT;
- the target remains sales-area Customer Group;
- source cardinality remains one value per customer;
- no approved organisational derivation exists.
```

Also state when it must not be reused automatically:

```text
Reinvestigation required when:

- another source field becomes available;
- the CRM definition changes;
- target use changes;
- a country has a separate business rule;
- the source begins storing sales-area-specific values.
```

These conditions turn the case into controlled precedent rather than folklore.

## A case can become precedent without becoming policy

A reusable finding may guide later investigations.

It should not automatically become a global mandatory rule.

Useful case statuses include:

### Local finding

Applies only to the original scope.

### Reusable precedent

May be applied when stated conditions match.

### Global decision evidence

Supports an approved global model decision.

### Superseded

Later evidence invalidated or replaced the conclusion.

### Partially superseded

The finding remains valid for some contexts but not others.

This prevents a German migration conclusion from silently becoming global architecture.

## How other platforms fit around the case

A reusable investigation case does not attempt to replace every data-management platform.

It fills a narrower gap between them.

### SAP MDG

SAP MDG is designed to govern operational master data through governed models, validated values, stewardship workflows, quality monitoring, matching, consolidation and auditable data changes.

It is the appropriate place to enforce an approved master-data rule or route an operational change request.

The investigation case explains why a rule, value or model treatment was selected before or around that implementation.

### Enterprise data catalogues

Collibra describes data catalogues as inventories of enterprise data assets using technical, business and operational metadata to improve discovery, understanding and trust. Its broader platform includes governance, lineage, quality and privacy capabilities.

Alation similarly positions its catalogue around searchable metadata, business context, trust indicators, provenance and source-to-destination lineage.

These platforms are well suited to:

- enterprise discovery;
- business glossary;
- metadata inventory;
- technical lineage;
- stewardship;
- trust and certification.

A Martenweave investigation case is more delivery-specific.

It captures why one model problem was interpreted in a particular way, how dataset evidence affected the conclusion and which model patch or migration treatment followed.

A catalogue may contain or link to the case.

The case should not attempt to replace enterprise metadata harvesting.

### Integrated governance and MDM suites

Informatica presents governance, cataloguing, data quality, observability, integration and MDM as complementary cloud services. Its governance offering links metadata to business context, shows profiling statistics and scorecards, and connects through APIs and scanners.

Such a platform may already provide much of the surrounding enterprise infrastructure.

Martenweave’s useful role remains:

- canonical project model;
- repository-level validation;
- explicit source-to-target mapping knowledge;
- dataset/model gap analysis;
- proposal-first change bundles;
- Git-compatible evidence history.

The case can reference Informatica assets and profiles rather than duplicating them.

### Data-quality platforms

Ataccama describes capabilities for profiling datasets, applying reusable quality rules, monitoring results, analysing lineage, managing remediation and exposing issues to data owners.

These tools can establish that:

- a field is missing;
- values are invalid;
- completeness changed;
- a rule failed;
- a pipeline introduced a problem.

The investigation case connects those observations to a model decision:

- Is the field actually required?
- For which population?
- Does the value have the expected meaning?
- Is the target rule correct?
- Should the model, source, mapping or configuration change?

Data quality provides the signal.

The case preserves the interpretation and decision.

### Jira, ServiceNow and other ticketing systems

A ticket is useful for:

- assignment;
- scheduling;
- escalation;
- delivery status;
- operational communication.

It is rarely sufficient as the only long-term model record.

A case may link several tickets:

- investigation;
- remediation;
- configuration;
- testing;
- source correction.

The finding should remain stable even after those tickets are closed or archived.

## Martenweave’s position is between evidence and controlled change

The product should not claim:

> We replace SAP MDG, Collibra, Alation, Informatica or Ataccama.

That would be inaccurate and strategically weak.

A more defensible position is:

```text
Operational systems and platforms produce evidence.

Martenweave structures the model investigation.

The case links evidence to canonical model objects.

Validators test consistency.

A proposal records the intended change.

Existing delivery and governance tools execute the work.
```

Martenweave’s current documented pipeline already follows this direction:

```text
evidence
→ proposal
→ validation
→ gaps and impact
→ review
→ GitHub issue or pull request
```



The reusable investigation case should sit between evidence and proposal.

```text
evidence
→ investigation case
→ finding
→ decision
→ PatchProposal or issue
```

Not every evidence item should become a proposal.

The case determines whether a model change is justified.

## The anatomy of a practical case

A concise case record can use the following structure.

### Case identity

- case ID;
- title;
- status;
- investigator;
- responsible owner;
- dates.

### Trigger

- observed symptom;
- source of the finding;
- business or migration consequence.

### Scope

- domain;
- systems;
- countries;
- organisational level;
- population;
- exclusions.

### Model references

- affected attributes;
- endpoints;
- mappings;
- rules;
- values;
- datasets;
- decisions.

### Baselines

- canonical model;
- mapping;
- dataset;
- implementation;
- test cycle.

### Evidence

- evidence IDs;
- facts established;
- limitations;
- freshness.

### Hypotheses

- explanation;
- evidence for;
- evidence against;
- result.

### Finding

- concise conclusion;
- confidence;
- unresolved questions.

### Decision

- approved treatment;
- responsible authority;
- conditions;
- expiry.

### Impact

- confirmed dependencies;
- review-required dependencies;
- coverage gaps.

### Reuse

- valid reuse conditions;
- reinvestigation triggers;
- precedent status.

### Follow-up

- PatchProposal;
- ChangeRequest;
- issue;
- remediation;
- implementation;
- test.

This is comprehensive without requiring a narrative report for every case.

## The case should be inspectable as a graph

The case is not isolated.

It links:

```text
Dataset evidence
        ↓
Investigation case
        ↓
Model finding
        ↓
Decision
        ↓
PatchProposal
        ↓
ChangeRequest
        ↓
Mapping, rule or attribute
        ↓
Tests and implementation evidence
```

This structure allows users to approach the knowledge from several directions.

From an attribute:

> Which investigations changed our understanding of this concept?

From a dataset:

> Which model findings were based on this profile?

From a decision:

> Which evidence and hypotheses supported it?

From a production incident:

> Has this problem been investigated before?

## Do not store the entire investigation only as prose

Prose is useful for explaining nuance.

Important elements should also be structured:

- IDs;
- scope;
- statuses;
- baselines;
- evidence links;
- confidence;
- reuse conditions;
- affected objects.

This enables:

- search;
- validation;
- filtering;
- impact analysis;
- stale-evidence detection;
- agent-assisted summarisation.

The prose explains the reasoning.

The structure makes the reasoning reusable.

## Case validation should be deterministic where possible

Martenweave could validate that:

- referenced model objects exist;
- evidence records exist;
- model baselines are identified;
- closed cases contain a finding;
- approved cases identify a decision owner;
- reusable precedents define reuse conditions;
- temporary decisions contain expiry;
- superseded cases identify their replacement;
- proposed changes link to a case or other evidence source.

These checks do not decide whether the finding is correct.

They ensure that the case is complete enough to review and reuse.

This follows Martenweave’s existing principle of validating IDs, types, references and domain-context rules before building generated indexes.

## Detect stale cases

A previously valid case may need review when:

- an affected model object changes;
- a source endpoint is replaced;
- a new country enters scope;
- a dataset contradicts the finding;
- a rejected alternative becomes technically possible;
- target semantics change;
- an accepted condition expires.

A case should not become immutable truth merely because it was approved once.

Useful states include:

- current;
- review required;
- contradicted;
- superseded;
- archived.

For example:

```text
Case:
INV-CUSTOMER-GROUP-CRM-A-001

Status:
Review required

Trigger:
CRM_A now supports sales-area-specific values

Reason:
Original finding assumed one central value per customer
```

The original case remains historically valid.

Its reuse conditions no longer hold.

## Similar cases should not be merged blindly

Two cases may appear identical:

- same target attribute;
- same gap type;
- similar source field.

Before merging or reusing, compare:

- business meaning;
- organisational level;
- population;
- source-system behaviour;
- local requirements;
- target use;
- current baselines.

The right goal is not eliminating all duplicate investigations.

It is avoiding unnecessary repetition while preserving meaningful contextual differences.

## A worked case: Supplier Review Status

### Trigger

ERP_B cannot provide Supplier Risk for 27% of active suppliers included in Wave 2.

### Initial request

Default missing values to `STANDARD`.

### Scope

- ERP_B;
- active supplier organisations;
- Germany and Austria;
- Wave 2;
- Supplier Risk and Compliance Review Status.

### Evidence

Dataset profiling shows:

- 18,040 valid Supplier Risk values;
- 5,600 blanks;
- 1,240 ambiguous codes;
- blanks concentrated among non-strategic suppliers.

Business review establishes:

- Supplier Risk is a final classification;
- unresolved records should not appear final;
- compliance already uses an informal pending-review process.

### Hypotheses

#### The blanks mean standard risk

Rejected.

No evidence supports that conclusion.

#### Supplier Risk should be optional

Rejected as a global treatment.

The requirement remains valid for active strategic suppliers.

#### A separate review status is needed

Supported.

The source gap concerns process state and incomplete assessment, not a final risk value.

### Finding

The source cannot provide a final Supplier Risk for every applicable record, and using `STANDARD` would convert missing knowledge into an apparently valid classification.

### Decision

- do not default Supplier Risk;
- introduce Review Status;
- use `PENDING` for unresolved applicable records;
- block final activation until classification is approved;
- remediate the current population.

### Reuse conditions

The finding may be reused for another source when:

- Supplier Risk remains a final classification;
- unresolved records can be identified;
- no authoritative source provides the final value;
- operational workflow supports a separate review state.

### Reinvestigation triggers

- Supplier Risk definition changes;
- an authoritative source becomes available;
- business approves deterministic derivation;
- Review Status is no longer needed operationally.

This case can later guide another source-system rollout without automatically imposing the same implementation.

## A weak case and a strong case

### Weak

```text
Issue:
Customer Group mapping incorrect.

Decision:
Use manual enrichment.

Status:
Closed.
```

### Strong

```text
Finding:
CRM_A Customer Segment is a central marketing classification
and is not directly equivalent to sales-area Customer Group.

Evidence:
Current source definition, July dataset profile, sales-process
owner review and target-usage analysis.

Decision:
Use controlled enrichment for Wave 2.

Reuse:
Applicable only while CRM_A remains central and no approved
sales-area derivation exists.

Reinvestigate when:
Source granularity or target usage changes.
```

The strong case is not dramatically longer.

It is far more reusable.

## What should be shown to different readers

A migration analyst needs:

- dataset;
- population;
- mapping;
- rejected values;
- next action.

A business owner needs:

- business meaning;
- scope;
- alternatives;
- decision;
- remaining risk.

An architect needs:

- model objects;
- context;
- lineage;
- impact;
- baselines.

AMS needs:

- final finding;
- implementation;
- known limitations;
- reopening triggers.

These should be views of one case.

Do not create separate versions that can diverge.

## AI has a limited but useful role

AI can help:

- extract candidate evidence from tickets and documents;
- group similar cases;
- draft hypothesis comparisons;
- identify missing case fields;
- summarise long investigation histories;
- suggest previous cases that may be relevant.

It should not declare two cases equivalent because their field names match.

It should not convert a previous local finding into a global rule.

A useful agent output is:

> This case resembles `INV-CUSTOMER-GROUP-CRM-A-001`, but the current source stores values by sales organisation rather than centrally. The previous conclusion cannot be reused without checking organisational equivalence.

The agent helps retrieve and challenge precedent.

It does not replace the new decision.

## A small Martenweave implementation slice

The first implementation does not need a full case-management system.

Add one canonical object type:

```text
InvestigationCase
```

Support:

- stable ID;
- status;
- scope;
- affected model references;
- evidence references;
- hypotheses;
- finding;
- confidence;
- decision reference;
- reuse conditions;
- reinvestigation triggers;
- follow-up links.

Then provide:

1. deterministic validation;
2. indexing and search;
3. object-to-case lookup;
4. case-to-proposal linkage;
5. Markdown and HTML rendering;
6. Git diff and review.

A useful first acceptance scenario is:

> A user investigating Customer Group can find an earlier case, see why direct mapping was rejected, determine whether the old scope matches the new one and either reuse the finding or open a related case.

That proves reusable model knowledge without building another generic workflow platform.

## Questions for a programme lead

Before declaring an investigation complete, ask:

- Can another team find it?
- Are the affected model objects identified?
- Is the source evidence still available?
- Are facts separated from interpretation?
- Are rejected alternatives preserved?
- Is the finding concise?
- Is the decision recorded separately?
- Are reuse conditions explicit?
- Are reinvestigation triggers defined?
- Can the case be linked to the resulting model change?
- Does it complement rather than duplicate existing governance platforms?
- Would AMS understand the finding without calling the original consultant?

If several answers are no, the investigation produced a decision but not reusable knowledge.

## Final perspective

SAP programmes do not lack analysis.

They lose analysis after it has been performed.

The answer is not more documentation.

It is a better unit of knowledge.

A reusable model investigation case preserves:

- the original problem;
- the exact scope;
- the evidence;
- the rejected explanations;
- the conclusion;
- the approved treatment;
- the conditions under which the conclusion remains valid.

SAP MDG can operationalise governed master data and workflow. Data catalogues such as Collibra and Alation can provide enterprise metadata discovery, context and lineage. Informatica can combine governance, cataloguing, quality and MDM capabilities. Ataccama can provide profiling, rules, lineage, monitoring and remediation.

Martenweave should not imitate all of them.

Its stronger position is narrower:

> Preserve how project evidence became a model finding, and how that finding became a controlled change.

The practical test is simple:

> When the same model question appears in another country or migration wave, can the new team reuse the old investigation without copying its conclusion blindly?

When the answer is yes, the project has created durable model knowledge.

When the answer is no, the organisation is still paying repeatedly for answers it has already found.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects canonical model objects, datasets, gaps, evidence, decisions, lineage, impact analysis and human-reviewed change proposals.

The objective is not to replace operational MDM, enterprise catalogues, data-quality platforms or delivery tools.

It is to preserve the missing chain between evidence, investigation, decision and approved model change.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP describes SAP Master Data Governance as a central governance layer for master data, policy and metadata, including governed models, semantic relationships, matching, consolidation, steward workflows, validated values, quality monitoring and auditable changes.

Collibra describes data catalogues as metadata-based inventories supporting discovery, description and organisation of enterprise data assets, while its wider platform covers governance, lineage, quality, privacy and access.

Alation describes a data catalogue as a searchable platform combining technical metadata, business context, lineage, trust information and governance.

Informatica presents data governance, cataloguing, quality, observability, integration and MDM as connected platform capabilities and supports metadata linkage, profiling statistics, scorecards, scanners and APIs.

Ataccama describes dataset profiling, quality rules, monitoring, lineage, issue remediation and reusable rule management as integrated data-quality capabilities.

Martenweave Core currently uses canonical model files, deterministic validation, rebuildable generated indexes, dataset-gap analysis, lineage, impact analysis and human-reviewed `PatchProposal` and `ChangeRequest` workflows.

Martenweave is independent and is not affiliated with or endorsed by SAP, Collibra, Alation, Informatica, Ataccama or other vendors named in this article. Product names and trademarks belong to their respective owners.
