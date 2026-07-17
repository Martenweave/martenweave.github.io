# How Better Model Traceability Reduces Rework

**Reviewed: 14 July 2026**

A migration defect appears during UAT.

One customer field contains the wrong value. The mapping team checks its workbook and confirms that the transformation is correct. The SAP team checks the target configuration and confirms that the field accepts the value. The business team says the requirement changed several months ago. Testing finds a Jira issue where the change was discussed, but the final decision is unclear.

The issue is assigned to architecture.

Architecture reconstructs the path:

- the source field was reinterpreted;
- a value list changed;
- one country received an exception;
- migration code still uses the previous rule;
- two test cases were never updated;
- a downstream interface expects the older values.

A corrected design is agreed.

The mapping is updated. Code is changed. Tests are repeated. Documentation is revised.

Three months later, another country encounters almost the same problem.

The programme repeats much of the analysis because the first investigation produced a defect fix, not a durable trace connecting the field, mapping, rule, decision, dataset and affected consumers.

This is the type of rework that model traceability should reduce.

The problem is not that teams failed to solve the first defect.

The problem is that the solution remained attached to one incident instead of becoming part of the reusable model knowledge.

> Better traceability reduces rework by allowing teams to reuse previous analysis, identify affected objects earlier and update connected implementation artefacts together.

It does not remove legitimate design changes.

It reduces the amount of work spent rediscovering relationships that the programme has already encountered.

## Rework is often repeated discovery

When programmes discuss rework, they usually focus on outputs that need to be redone:

- mapping updated again;
- validation reconfigured;
- code changed;
- test rerun;
- document revised;
- load repeated.

The visible repetition is only part of the cost.

Before those outputs can be changed, teams often repeat discovery:

- What does this field mean?
- Where does the value come from?
- Which rule applies?
- Why was the current treatment selected?
- Which countries use it?
- Which systems consume it?
- Which test proves it?
- Who can approve the change?

The organisation may already have answered these questions.

The answers are distributed across people and artefacts.

Rework therefore begins with reconstruction.

The team does not immediately correct the model. It first rebuilds enough understanding to decide what correction is safe.

## The relationship is usually more valuable than the document

A programme can retain every source document and still struggle with traceability.

Suppose the following evidence exists:

- a source-system specification;
- an Excel mapping;
- an SAP design document;
- a validation-rule catalogue;
- a closed Jira decision;
- a test case;
- an interface specification.

The key operational knowledge is the relationship between them:

```text id="trace-rework-01"
Legacy field
→ business attribute
→ approved mapping
→ SAP target endpoint
→ validation rule
→ decision
→ test
→ downstream consumer
```

If these links are not explicit, each new investigation has to infer them again.

Search can find the documents.

It cannot automatically prove that they describe the same concept, the same context and the same approved model version.

## SAP MDG increases the value of connected model knowledge

SAP currently positions SAP Master Data Governance as a central governance layer combining master data, policy and metadata. It highlights governed models, preserved semantics and relationships, steward workflows, validated values, business rules, monitoring and auditable changes.

Those capabilities provide operational governance for master records.

An MDG implementation still connects to a broader delivery landscape:

- legacy data;
- migration mappings;
- target configuration;
- integrations;
- testing;
- local requirements;
- architecture decisions;
- AMS knowledge.

The operational record may be governed inside MDG.

The explanation of how the record reached its current structure often remains outside it.

Traceability connects these layers without pretending that one platform owns all of them.

## Traceability is not only source-to-target mapping

A source-to-target line is useful:

```text id="trace-rework-02"
LEGACY_CUSTOMER.TYPE → SAP Customer Group
```

It does not answer enough questions to prevent repeated analysis.

A stronger trace includes:

- source system;
- source dataset;
- source field;
- business meaning;
- transformation;
- value mapping;
- target context;
- target endpoint;
- validation;
- decision;
- ownership;
- test evidence;
- consumers.

For example:

```text id="trace-rework-03"
CRM_A.CUSTOMER_TYPE
→ Customer Group for sales processing
→ normalise legacy values
→ apply DE value mapping
→ SAP sales-area Customer Group
→ mandatory for active German B2B customers
→ decision DEC-0142
→ tested in TC-882
→ consumed by pricing and reporting
```

The longer trace is not needed for every low-risk field.

It is valuable for fields where a misunderstanding would create significant rework.

## There are several forms of traceability

A useful model should support more than one direction.

## Source traceability

Answers:

> Where did this SAP value come from?

```text id="trace-rework-04"
Target field
→ mapping
→ transformation
→ source field
→ source dataset
```

## Target traceability

Answers:

> Where should this legacy field go?

```text id="trace-rework-05"
Source field
→ business attribute
→ target endpoint
```

## Rule traceability

Answers:

> Why is this field rejected or required?

```text id="trace-rework-06"
Attribute
→ validation rule
→ context
→ decision
→ owner
```

## Change traceability

Answers:

> What must be reviewed if this object changes?

```text id="trace-rework-07"
Changed attribute
→ mappings
→ rules
→ values
→ datasets
→ tests
→ integrations
```

## Historical traceability

Answers:

> Why was this state introduced?

```text id="trace-rework-08"
Current object
→ previous versions
→ decisions
→ releases
→ superseded treatments
```

## Ownership traceability

Answers:

> Who has authority to clarify or approve the treatment?

```text id="trace-rework-09"
Model object
→ business owner
→ technical owner
→ local owner
```

Rework decreases when the programme can move through these traces without beginning another manual discovery exercise.

## Traceability shortens defect triage

Consider a migration record rejected by a tax validation.

Without traceability, the triage process may involve:

1. Check the error message.
2. Ask the SAP team which rule fired.
3. Find the field in the target design.
4. Search for the migration mapping.
5. Compare source extracts.
6. Ask the country team about exemptions.
7. Find the original decision.
8. determine whether the test expectation is current.

With a connected model, the starting object can expose:

- rule identifier;
- affected attribute;
- applicable country and role;
- source mapping;
- known dataset gap;
- exemption decision;
- owner;
- related tests.

The team may still need expert judgement.

It no longer needs to locate every component separately.

## Traceability prevents narrow fixes

A defect often produces a local repair.

For example:

> Add missing target value `09`.

That repair may be technically correct.

A trace can reveal that the value also affects:

- two source value mappings;
- one workflow condition;
- one interface code list;
- several test cases;
- reporting logic;
- another country using a local copy.

Without traceability, the project fixes the immediate point of failure.

The remaining dependencies create later defects.

Better traceability encourages complete change packages rather than isolated corrections.

## Traceability reduces repeated workshops

Many project workshops are not discovering new requirements.

They are reconstructing previous decisions.

A typical meeting begins with:

- Which version is correct?
- Was this agreed globally?
- Does the exception apply only to migration?
- Why was this value removed?
- Who approved the default?

Participants search old files and contact former team members.

A decision trace can show:

- question;
- alternatives;
- selected treatment;
- evidence;
- scope;
- approvers;
- review condition.

The meeting can then focus on whether current conditions justify changing the previous decision.

This is productive reconsideration rather than historical reconstruction.

## Traceability reduces unnecessary retesting

Testing teams often rerun a broad set of cases because the effect of a change is uncertain.

Suppose a value list changes.

Without traceability, the team may repeat:

- all field validations;
- complete workflow scenarios;
- several integrations;
- full migration samples.

A traceable model can identify:

- attributes using the list;
- mappings producing the affected values;
- rules checking those values;
- workflows branching on them;
- interfaces consuming them;
- existing tests covering them.

The regression scope becomes targeted.

This does not justify minimal testing where risk remains uncertain.

It gives the test lead evidence for selecting the appropriate scope.

## Traceability reduces mapping rework

Mappings are frequently revised because target or source assumptions change.

A mapping row alone may not show why it was created.

When a source field is replaced, the team has to determine:

- which business attribute it represented;
- whether the replacement has the same meaning;
- which transformation is reusable;
- whether value coverage differs;
- which countries used the old source;
- which tests need revision.

If the mapping is connected through a stable business attribute, the source can change without rebuilding the target interpretation from the beginning.

```text id="trace-rework-10"
Old source endpoint
        ↓
Business attribute
        ↓
Target endpoint
```

becomes:

```text id="trace-rework-11"
New source endpoint
        ↓
Same business attribute
        ↓
Same or reviewed target endpoint
```

The stable semantic layer preserves previous analysis.

## Traceability reduces local/global reconciliation work

Global programmes often maintain:

- one global model;
- several local mappings;
- country-specific rules;
- temporary deviations.

When relationships are unclear, every global change triggers manual comparison across local workbooks.

For example:

> Global Supplier Classification value list changed.

The programme must ask every country whether it:

- copied the list;
- extended it;
- mapped local codes;
- used the values in workflow;
- introduced migration defaults.

If each local object references its global parent, impact analysis can identify the affected variants directly.

The local teams still review the change.

The global team no longer has to rediscover which local artefacts exist.

## Traceability reduces handover rework

AMS often begins with a second implementation-discovery phase.

The system is live, but support must reconstruct:

- model meaning;
- mappings;
- rules;
- exceptions;
- ownership;
- integration dependencies.

Every incident becomes a small handover exercise.

A traceable model gives AMS a path from the incident to the implementation knowledge.

For example:

```text id="trace-rework-12"
Production validation error
→ configured rule
→ approved business rule
→ affected attribute
→ owner
→ exception process
→ decision
→ regression tests
```

This does not remove the need for SAP expertise.

It prevents experts from spending most of their time locating historical context.

## Traceability reduces dependence on key individuals

A senior consultant may appear uniquely productive because they can recall relationships that are not represented elsewhere.

They know:

- which source field is reliable;
- which mapping is outdated;
- which local exception was approved;
- which test covers the rule;
- which integration will fail.

This knowledge is genuinely valuable.

The problem is that the organisation cannot reuse it without the individual.

Traceability captures repeatable knowledge so experts can focus on new judgement.

It does not attempt to capture every intuition or replace experience.

It preserves the relationships the programme has already accepted as part of its operating model.

## Traceability should be risk-based

Modelling every dependency in exhaustive detail can create its own overhead.

Not every descriptive field needs:

- full decision history;
- source lineage;
- integration impact;
- detailed test references.

Prioritise traceability where one or more conditions apply:

- legally or financially significant;
- mandatory;
- heavily transformed;
- sourced from several systems;
- used in matching or workflow;
- consumed by important integrations;
- frequently changed;
- subject to local variation;
- difficult to remediate;
- likely to generate support incidents.

This creates a practical rule:

> Trace critical model decisions deeply. Trace low-risk descriptive content lightly.

## Stable identifiers are the foundation

Traceability becomes fragile when it relies on names.

Names change.

The same name can refer to different contexts.

Different names can refer to the same business concept.

Stable identifiers allow relationships to survive changes in labels and presentation.

Examples:

```text id="trace-rework-13"
ATTR-SUPPLIER-RISK
FEP-ERP-A-VENDOR-RISK
FEP-SAP-SUPPLIER-RISK
MAP-SUPPLIER-RISK-ERP-A
RULE-SUPPLIER-RISK-HIGH
DEC-SUPPLIER-RISK-004
```

The identifiers can appear in:

- canonical files;
- Excel exports;
- Jira issues;
- test cases;
- reports;
- configuration documentation.

A user does not need to memorise them.

The system uses them to preserve identity.

## Traceability needs explicit relationship types

A generic link is often insufficient.

The system should know whether an object:

- maps to;
- derives from;
- validates;
- owns;
- implements;
- supersedes;
- tests;
- consumes;
- extends;
- overrides;
- depends on.

For example:

```text id="trace-rework-14"
RULE-SUPPLIER-RISK-HIGH
validates
ATTR-SUPPLIER-RISK
```

is different from:

```text id="trace-rework-15"
WF-SUPPLIER-COMPLIANCE
depends on
ATTR-SUPPLIER-RISK
```

Typed relationships improve impact analysis and reporting.

They also make invalid connections easier to detect deterministically.

## Traceability needs version context

A relationship may be true for one baseline and false for another.

For example:

- Mapping version 1 used source field A.
- Version 2 replaced it with source field B.
- Test cycle 1 proved version 1.
- Test cycle 2 proved version 2.

If the registry shows only the current mapping, historical defects become difficult to explain.

If it shows every mapping as simultaneously active, current impact analysis becomes misleading.

Record:

- effective model baseline;
- activation date;
- retirement or supersession;
- migration wave;
- applicable release.

This supports both operational and historical questions.

## Traceability must distinguish current and proposed states

A proposed mapping should not appear as an approved relationship.

Useful states include:

- candidate;
- proposed;
- approved;
- implemented;
- verified;
- deprecated;
- retired.

AI-generated relationships are especially important here.

An AI may suggest that two fields represent the same concept.

That suggestion should be traceable as a proposal with evidence and assumptions.

It should not enter approved lineage until responsible people review it.

## Traceability should include uncertainty

Some links remain uncertain.

For example:

- source documentation is incomplete;
- two candidate fields exist;
- local usage is inconsistent;
- no approval evidence was found.

The system should allow the relationship to be represented as:

```text id="trace-rework-16"
Candidate source:
ERP_B.CUST_CLASS

Confidence:
Low

Reason:
Name and value distribution are similar,
but no confirmed business definition exists.
```

This helps the programme manage the gap.

A false definitive relationship may reduce short-term reporting noise while increasing later rework.

## A worked example: changing supplier payment terms

The programme decides to change how supplier payment terms are sourced for one country.

### Without traceability

The team updates:

- one mapping workbook;
- one transformation routine;
- one test.

Later it discovers:

- the same source field is used for another company code;
- a default is documented in a closed ticket;
- an interface expects a different code;
- an AMS report groups suppliers by the old mapping.

### With traceability

The source endpoint shows relationships to:

- two mappings;
- one transformation;
- one value list;
- three company-code contexts;
- one decision;
- five test cases;
- one downstream consumer.

The programme can create one change package covering all affected objects.

The change still requires analysis.

The dependency discovery is not repeated manually.

## Another example: retiring a customer classification

The business retires an old customer classification.

Traceability should identify:

- source systems still providing it;
- target fields storing it;
- value mappings;
- validations;
- workflows;
- reports;
- interfaces;
- historical migration decisions;
- local extensions;
- test cases.

The programme may then decide:

- stop populating the field;
- retain historical values;
- convert records;
- update reporting;
- retire related rules;
- preserve an alias for search.

Without the trace, retirement is likely to be implemented as a field-level change while dependencies remain active.

## Another example: adding a local value

A country requests value `UNDER_REVIEW` for Supplier Risk.

A trace can show:

- global value list;
- local extension relationship;
- migration mapping;
- workflow dependency;
- integration consumers;
- data-quality report;
- decision owner.

The programme sees immediately that the value is not only a dropdown entry.

This reduces the chance of configuring it first and discovering its operational meaning later.

## Traceability and impact analysis

Traceability provides the graph.

Impact analysis asks which part of the graph is relevant to a proposed change.

For example:

```text id="trace-rework-17"
Change:
Make Customer Group mandatory in Germany.
```

Possible impact paths:

```text id="trace-rework-18"
Attribute
→ DE validation rule
→ source mappings
→ datasets
→ incomplete records
→ tests
→ remediation owner
```

and:

```text id="trace-rework-19"
Attribute
→ outbound interface
→ pricing consumer
```

Not every connected object is equally affected.

Impact analysis should classify relationships:

- direct;
- indirect;
- informational;
- requires review;
- likely unaffected.

The objective is not to produce a huge graph.

It is to identify the work that should not be forgotten.

## Traceability and deterministic validation

A trace is useful only when its references are structurally reliable.

Deterministic checks can identify:

- missing referenced objects;
- duplicate identities;
- mappings without endpoints;
- active objects linked to retired objects;
- local overrides without parents;
- test evidence referring to obsolete mappings;
- decisions without affected objects.

Martenweave’s current public documentation states that references are validated before indexing and that the core supports trace and impact analysis.

This matters because a visually impressive lineage diagram built on broken references creates false confidence.

## Traceability and generated views

The canonical model should preserve the relationships.

Different users need different views.

### Migration view

Shows:

- source;
- transformation;
- target;
- dataset coverage;
- gaps.

### Business view

Shows:

- definition;
- ownership;
- values;
- context;
- decisions.

### SAP view

Shows:

- target endpoints;
- rules;
- workflow dependencies;
- implementation references.

### Testing view

Shows:

- mappings;
- rules;
- expected behaviour;
- evidence;
- stale tests.

### AMS view

Shows:

- current object;
- owner;
- dependencies;
- known exceptions;
- history.

This avoids asking every stakeholder to navigate the full graph directly.

## Traceability should integrate with existing tools

Martenweave should not become another system requiring teams to duplicate all project content.

A practical pattern is:

- keep narrative design in Confluence;
- keep delivery work in Jira;
- keep business review in Excel where useful;
- keep operational master data in SAP MDG;
- keep canonical model identities and relationships in Martenweave.

The registry stores:

- model object;
- relationship;
- evidence reference;
- approved outcome.

It does not need to copy every discussion or attachment.

The product earns its place when it reduces reconciliation between the existing tools.

## Where Martenweave fits

Martenweave’s current public description presents the product as a practical model-control layer for knowledge scattered across spreadsheets, datasets, tickets, validation reports, decisions, SAP context and project history. It connects fields, attributes, rules, owners, issues and decisions, validates references, detects gaps and traces impact.

The current open-source core includes:

- canonical Markdown and YAML files;
- deterministic validation;
- generated SQLite and JSONL indexes;
- search and structured queries;
- trace and impact analysis;
- dataset profiling and gap detection;
- ownership, audit, analysis and scorecard reports;
- CSV and XLSX review flows;
- PatchProposal-to-ChangeRequest lifecycle;
- issue drafts and GitHub-ready change bundles.

For traceability, the important architectural flow is:

```text id="trace-rework-20"
Canonical objects
→ validated relationships
→ generated index
→ trace and impact analysis
→ reviewable report
→ controlled change proposal
```

The graph is generated from the approved model rather than maintained as a separate diagram.

## A Martenweave trace can connect

```text id="trace-rework-21"
Dataset column
→ source FieldEndpoint
→ Mapping
→ Attribute
→ EntityContext
→ target FieldEndpoint
→ Rule
→ Decision
→ Issue
→ ChangeRequest
```

The exact object model can evolve.

The core value is stable identity and explicit connection.

## A practical implementation approach

Do not begin by tracing every object in a large programme.

Start with one rework-heavy scenario.

Examples:

- repeated tax-validation defects;
- unclear supplier classifications;
- frequently changing customer mappings;
- local payment-term differences;
- unexplained migration defaults.

### Step 1: Select critical objects

Choose 30–100 fields, mappings and rules.

### Step 2: Assign stable identifiers

Make sure the same objects can be referenced across tools.

### Step 3: Connect source and target endpoints

Include applicable context.

### Step 4: Add rules and value lists

Focus on controls that generate defects or repeated reviews.

### Step 5: Link decisions and ownership

Preserve why the current treatment exists.

### Step 6: Connect datasets and tests

Show which evidence supports the mapping.

### Step 7: Run validation

Remove broken references and ambiguous identities.

### Step 8: Test impact analysis

Use one real proposed change.

### Step 9: Measure investigation effort

Compare the time needed before and after the trace exists.

This keeps the pilot tied to operational value.

## How to measure rework reduction

The benefit should not be measured only by the number of model objects stored.

Useful indicators include:

### Investigation time

How long does it take to explain a defect or field?

### Repeated-analysis rate

How often is the same requirement or mapping reconsidered without new evidence?

### Change completeness

How often does a model change miss a mapping, rule, test or consumer?

### Defect recurrence

How often does a previously solved model problem reappear in another wave or country?

### Regression scope effort

How long does it take to identify affected tests?

### Handover dependency

How often must AMS contact the original project team?

### Mapping reconciliation effort

How much time is spent comparing files and versions?

### Decision retrieval

Can teams find why a rule exists without reading long ticket histories?

The goal is not perfect trace coverage.

It is measurable reduction in reconstruction work.

## The danger of tracing everything

Traceability can become an architecture hobby.

Teams may create:

- huge graphs;
- many relationship types;
- exhaustive metadata;
- complex visualisations.

If users still cannot answer a practical change question, the model is not helping.

Every relationship should support at least one useful job:

- validation;
- impact analysis;
- issue resolution;
- readiness;
- testing;
- handover;
- audit.

Avoid storing relationships only because they may be interesting later.

## The danger of stale traceability

A trace that is not maintained becomes another misleading document.

Traceability must update through the change process.

A material change should update:

- object state;
- relationships;
- decision;
- affected evidence;
- version;
- implementation status.

The definition of done should include model reconciliation.

Otherwise, the trace describes the previous implementation while users assume it describes the current one.

## The danger of automated inference

AI can infer many likely relationships from:

- similar names;
- shared descriptions;
- documents;
- code;
- datasets.

This can accelerate model building.

Inferred links should remain proposals.

For example:

```text id="trace-rework-22"
AI suggestion:
CRM_A.CUST_SEGMENT may map to ATTR-CUSTOMER-GROUP.

Evidence:
Similar descriptions and overlapping values.

Conflict:
Source is global; target is sales-area-specific.
```

This is useful analysis.

It is not an approved mapping.

The same principle applies when AI attempts to infer decisions or ownership.

## What managers should ask

1. Can a critical target field be traced to its source and decision?
2. Can a source field be traced to every target use?
3. Can the programme identify mappings affected by a rule change?
4. Are local variants linked to global parent objects?
5. Are tests connected to the mappings and rules they prove?
6. Are migrated defaults linked to affected populations and remediation?
7. Can AMS retrieve ownership and rationale?
8. Are proposed relationships distinguished from approved ones?
9. Does traceability refer to identifiable model baselines?
10. Are broken references detected automatically?
11. How much time is spent reconstructing information that already exists?
12. Has traceability reduced that time in a real scenario?

A large lineage diagram is not an answer to these questions.

## Common mistakes

### Treating traceability as a visual diagram

The graph should be generated from validated relationships.

### Tracing only technical fields

Business meaning, context and decisions are required to explain implementation.

### Linking only documents

Link the actual model objects and use documents as evidence.

### Relying on names

Stable identifiers reduce ambiguity.

### Ignoring versions

Historical and current relationships should not be mixed.

### Treating every link as equally important

Prioritise critical objects and typed dependencies.

### Allowing proposed links into approved lineage

Candidate relationships need review.

### Capturing traceability only at handover

The most useful relationships should be created during delivery.

### Maintaining traceability outside change control

It will become stale.

### Measuring success by object count

Measure reduced investigation and change effort.

## When a lightweight approach is enough

A controlled workbook may provide sufficient traceability when:

- one source and one target exist;
- mappings are simple;
- the domain is small;
- the same team handles design, migration and support;
- changes are infrequent.

At minimum, maintain:

- stable mapping IDs;
- business attribute;
- source;
- target;
- context;
- owner;
- rule;
- decision;
- test reference.

A registry becomes more useful when:

- several source systems are involved;
- several countries maintain variations;
- the model changes frequently;
- different partners own different workstreams;
- impact analysis takes days;
- knowledge must survive several waves;
- AI agents consume the model.

## Our conclusion

Rework is not caused only by incorrect design.

It is caused by the cost of repeatedly understanding how design, data and implementation are connected.

Better traceability preserves those connections.

It allows teams to move from:

- a field to its source;
- a rule to its decision;
- a change to its dependencies;
- a defect to its evidence;
- a local variant to its global parent;
- a test to the model version it proves.

The practical test is:

> When one critical field changes, can the programme identify the affected mappings, datasets, rules, decisions, tests and consumers without organising another discovery exercise?

When the answer is yes, traceability is reducing rework.

When the answer requires searching several tools and interviewing the original team, the organisation is paying again for knowledge it already produced.

The purpose of a model registry is not to make every relationship visible.

It is to preserve the relationships expensive enough that the programme should not have to rediscover them twice.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We build practical model-governance infrastructure for SAP migration, MDG, MDM and AMS teams. Martenweave is designed to preserve validated relationships between fields, mappings, rules, datasets, decisions and changes so that delivery teams spend less time reconstructing their own implementation knowledge.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer combining master data, policy and metadata. Its listed capabilities include governed models, preserved semantics and relationships, collaborative workflows, validated values, monitored business rules and auditable data changes. SAP also recommends curating clean and correct master data well before an SAP S/4HANA implementation.

Martenweave’s current public documentation describes a model-control layer connecting fields, attributes, rules, owners, issues and decisions, with deterministic validation, dataset and model gap detection, trace and impact analysis, reporting and reviewable model proposals.

The current open-source core includes canonical model files, generated indexes, search, trace and impact analysis, dataset profiling, ownership and audit reports, spreadsheet review flows and a PatchProposal-to-ChangeRequest lifecycle.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
