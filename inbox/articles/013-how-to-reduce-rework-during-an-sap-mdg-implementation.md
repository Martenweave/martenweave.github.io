# How to Reduce Rework During an SAP MDG Implementation

**Reviewed: 14 July 2026**

The programme has already approved the model.

Workflows are being configured. Migration mappings are mostly complete. Testing has started. The dashboard shows steady progress.

Then one business decision changes.

A field that was optional becomes mandatory. A country requests a local exception. A source system turns out to use the attribute differently. A value list needs another code. A validation blocks records that the migration team expected to load.

The change itself may be reasonable.

The problem is what happens next.

The MDG team updates configuration. The migration team revises its workbook. Testing reopens several cases. Integration checks downstream consumers. The global design document waits for its next scheduled update. A local team continues working from an older export.

The same question is analysed several times by different people.

This is where much of the cost of an SAP MDG implementation accumulates: not in creating the first version of the model, but in repeatedly reconciling all the versions that follow.

We do not think rework can be eliminated. Complex programmes learn as they progress. Data reveals problems. Business requirements improve. Configuration exposes constraints. Local teams identify legitimate differences.

The objective is different:

> Reduce the amount of work that has to be repeated because the programme cannot see, validate or propagate a decision consistently.

That requires more than good project management. It requires control of the model knowledge connecting design, configuration, migration, testing and operations.

## Not all repeated work is waste

Some rework is necessary.

A team may need to revisit a design because:

- a legal requirement was initially missed;
- source-data evidence disproves an assumption;
- users reject an impractical workflow;
- a standard SAP capability behaves differently than expected;
- testing reveals an invalid rule;
- an interface dependency becomes visible;
- the business model has genuinely changed.

This is the programme learning.

We would be concerned if a large MDG implementation never changed its initial design. That would usually mean either the discovery was unusually complete or the programme was not listening to evidence.

The expensive rework is different.

It happens when the programme repeats analysis that it has already performed, or corrects inconsistencies that its own delivery process created.

Examples include:

- rediscovering why a field was made mandatory;
- comparing several mapping files to find the approved rule;
- rebuilding impact analysis for the same attribute;
- correcting migration code after an uncommunicated target change;
- retesting unaffected scenarios because dependencies are unclear;
- reopening a business decision because its evidence was lost;
- documenting configuration manually at the end of the project;
- asking the original consultant to explain a rule months later;
- repeating local workshops because the global model does not show previous exceptions.

This is avoidable rework.

## Why SAP MDG programmes are especially exposed

SAP MDG implementations connect several disciplines that naturally move at different speeds:

- business governance;
- data architecture;
- SAP configuration;
- migration;
- integration;
- data quality;
- testing;
- organisational change;
- release management;
- AMS preparation.

SAP positions MDG as a central governance layer supporting governed models, golden records, profiling, matching and consolidation, workflow-based changes, validated values, data-quality monitoring and auditable data changes.

That operational scope means a design decision can affect much more than one field.

A change to an attribute may affect:

- the governed model;
- change-request workflow;
- validation and derivation;
- matching;
- source-to-target mappings;
- initial migration;
- replication;
- local processes;
- data-quality reporting;
- existing records;
- support procedures.

The implementation is therefore not one linear build.

It is a network of connected workstreams.

Rework increases when those connections remain implicit.

## The first source of rework: unresolved decisions disguised as design

A design can look complete while still containing assumptions.

Typical examples include:

- “Business to confirm.”
- “Use local logic.”
- “Default where missing.”
- “Existing validation applies.”
- “Country exception may be required.”
- “Source to be confirmed.”
- “Follow standard SAP behaviour.”

These statements are understandable during early discovery.

They become dangerous when the corresponding object is reported as approved.

The configuration team then has to interpret the gap.

The migration team may make another interpretation.

Testing eventually compares the two implementations rather than verifying one agreed rule.

We separate three states:

### Decided

The programme has selected and approved a clear treatment.

### Assumed

The team is proceeding with a working interpretation that has not yet been approved.

### Unresolved

No reliable treatment exists.

An assumption may be necessary to keep work moving. It should remain visible as an assumption.

The programme creates rework when it hides uncertainty inside apparently completed artefacts.

## The second source: model changes are communicated as messages

A field changes.

Someone writes in Teams:

> Please use the new code from now on.

A Jira comment says the field is no longer mandatory for one country.

An email confirms that migration may use a default.

These messages can be operationally useful. They are not controlled model changes.

The recipients may update:

- configuration;
- one mapping file;
- one test case;
- one local workbook.

Other dependent artefacts remain unchanged because nobody identified them.

The programme then discovers the inconsistency through defects.

A material model change should identify:

- the object being changed;
- current state;
- proposed state;
- reason;
- affected contexts;
- affected mappings;
- affected datasets;
- affected rules;
- affected tests;
- owner;
- approval;
- effective version.

Communication should follow the model change. It should not be the only representation of it.

## The third source: every team maintains its own interpretation

The MDG team sees entities, attributes, rules and workflows.

The migration team sees sources, targets, transformations and load objects.

Business teams see definitions, policies and exceptions.

Testing sees expected results.

Integration sees messages, APIs and consumers.

Each view is necessary.

The problem begins when each view becomes a separate model.

For example:

- the business glossary says “Supplier Risk Category”;
- MDG configuration calls it “Risk Class”;
- migration maps `VENDOR_GRADE`;
- an interface sends `SUPPLIER_SEGMENT`;
- testing uses “Compliance Level.”

These may refer to the same attribute.

They may also refer to related but different attributes.

Without stable identity and explicit relationships, every review requires teams to reconstruct equivalence from names and context.

This consumes expert time and introduces errors.

We prefer one identifiable business attribute connected to multiple physical representations.

```text
Business attribute
├── legacy source field
├── SAP MDG attribute
├── SAP target field
├── interface field
├── migration mapping
├── validation rule
└── test evidence
```

Teams may continue working through their own views. The underlying object remains the same.

## The fourth source: design and actual data meet too late

A target model can appear coherent until it is compared with representative source data.

The design may assume that:

- a field is widely populated;
- one code list is shared globally;
- identifiers are unique;
- relationships can be constructed;
- country differences are minor;
- a value can be derived reliably.

The dataset may show otherwise.

SAP recommends curating master data early, before an S/4HANA implementation, because automated target processes depend heavily on clean and correct master data.

For us, early curation includes more than a general data-quality assessment.

It means comparing the proposed governed model against actual source populations while design choices are still inexpensive to change.

If this comparison happens only during mock loading, the programme may need to redo:

- the model;
- mappings;
- validation rules;
- value lists;
- configuration;
- migration routines;
- test data;
- test cases;
- business approvals.

The same source limitation discovered two months earlier might have required only a design decision.

## The fifth source: status hides different stages of completion

A field or mapping is marked complete.

But complete may mean:

- defined;
- approved;
- configured;
- mapped;
- implemented;
- tested;
- accepted for cutover.

These are different states.

A programme creates rework when downstream teams assume a stronger state than the upstream team intended.

For critical objects, we use a lifecycle such as:

```text
Identified
→ Defined
→ Approved
→ Implemented
→ Dataset-validated
→ Tested
→ Ready
```

This allows work to proceed without claiming that all evidence already exists.

A mapping can be defined while still awaiting value coverage.

A rule can be configured while still awaiting testing.

A target attribute can be approved while the source-data treatment remains unresolved.

Clear status reduces false handovers between teams.

## The sixth source: local exceptions are handled as detached copies

Global MDG programmes need to support legitimate local variation.

The typical workaround is to copy a global workbook or design and let the country team maintain its own version.

This solves an immediate collaboration problem.

It creates future reconciliation work.

Local changes may include:

- additional attributes;
- different mandatory rules;
- local code translations;
- regulatory exceptions;
- alternative source fields;
- different ownership;
- temporary migration treatments.

When these remain in detached files, the global team cannot see whether a local change:

- extends the model;
- overrides it;
- contradicts it;
- is temporary;
- should become global;
- is already solved elsewhere.

We represent local variation as an explicit relationship to the global model.

```text
Global attribute
├── standard rule
├── country extension
├── approved local override
└── temporary migration exception
```

This does not eliminate local work.

It reduces repeated comparison and prevents local knowledge from disappearing into file versions.

## The seventh source: implementation becomes the decision

A configuration issue appears during testing.

The technical team adjusts the rule so the process can continue.

This may be the correct immediate response.

The risk is that the implementation change is never reconciled with the model.

The new behaviour then becomes accepted because it exists.

Later, the programme updates its documentation to match configuration, without reconsidering whether the configuration reflects the intended governance policy.

We use a stricter distinction:

- the approved model describes intended behaviour;
- configuration implements that behaviour;
- an implementation deviation remains a deviation until reviewed.

Emergency or test workarounds should include:

- affected object;
- reason;
- environment;
- risk;
- owner;
- review date;
- intended final treatment.

A temporary configuration that has no reconciliation date is likely to become permanent architecture.

## The eighth source: defects are fixed without updating the model

A defect may reveal that:

- the source mapping is wrong;
- the target rule is wrong;
- the definition is ambiguous;
- the value list is incomplete;
- the local context is missing;
- the dataset is unreliable;
- the implementation differs from the design.

The defect is corrected and closed.

But only the immediate technical artefact is updated.

If the underlying model does not change, the same issue can reappear in:

- another country;
- another migration wave;
- another interface;
- another environment;
- post-go-live support.

We classify defects by cause:

- source-data defect;
- extraction defect;
- mapping defect;
- model defect;
- configuration defect;
- rule defect;
- integration defect;
- test-data defect;
- decision gap.

When the cause is model-related, closing the defect should require an approved model update or an explicit decision not to change the model.

Otherwise, the team fixes one occurrence while preserving the cause.

## Rework begins before configuration

It is tempting to treat rework as an execution problem.

Much of it begins during discovery.

A weak discovery phase can produce:

- duplicate attributes;
- unclear definitions;
- hidden local variation;
- incomplete ownership;
- inconsistent code lists;
- unsupported mandatory fields;
- undefined remediation responsibility.

These issues move into design and configuration, where they become more expensive to resolve.

We do not recommend an endless discovery phase.

The programme does not need a complete enterprise model before starting.

It does need enough evidence to distinguish:

- known design;
- known gaps;
- assumptions;
- open decisions;
- excluded scope.

The smallest useful preparation is better than a large document that hides uncertainty.

## The controls that reduce rework

We use a small set of controls across the implementation lifecycle.

# 1. Maintain an independent approved model

The programme needs a model baseline independent from one environment, workbook or implementation partner.

It should include the model knowledge required to understand and change the implementation:

- entities;
- attributes;
- contexts;
- relationships;
- mappings;
- value lists;
- rules;
- owners;
- decisions;
- exceptions.

The configured platform remains operational truth.

The independent model preserves implementation intent and its connection to surrounding work.

## 2. Give important objects stable identifiers

Stable identifiers allow the same object to be referenced across:

- design;
- configuration documentation;
- mappings;
- tickets;
- datasets;
- tests;
- defects;
- change requests;
- AMS.

Names can remain business-friendly.

Identifiers preserve continuity when names change or repeat.

## 3. Compare the model with actual datasets early

For every critical attribute, check:

- source availability;
- completeness;
- observed values;
- context coverage;
- relationship integrity;
- source-system variation.

The comparison should happen during design and repeat when datasets or scope change.

## 4. Use explicit change proposals

A change proposal should show:

- what changes;
- why;
- affected objects;
- evidence;
- impact;
- required reviewers;
- proposed effective version.

This is more useful than forwarding an updated workbook and asking everyone to find the difference.

## 5. Run impact analysis before implementation

For a field, rule or value-list change, identify likely effects on:

- source data;
- mappings;
- configuration;
- workflows;
- integrations;
- datasets;
- tests;
- existing records;
- AMS procedures.

Impact analysis does not need to be perfect.

It should be good enough to prevent obvious downstream teams from discovering the change accidentally.

## 6. Validate structure automatically

Architects should not spend review time finding:

- duplicate identifiers;
- broken references;
- missing endpoints;
- retired objects still in use;
- mappings without context;
- rules without owners;
- value mappings using obsolete lists.

These are deterministic checks.

Automating them leaves human review for meaning, trade-offs and risk.

## 7. Connect test evidence to model versions

Test evidence should identify:

- approved model baseline;
- configuration or release version;
- dataset;
- context;
- expected result;
- actual result.

When the model changes, the programme can see which evidence requires renewal.

## 8. Reconcile configuration after each material cycle

Before a major mock load, UAT cycle or release, compare:

- approved model;
- intended configuration;
- actual environment;
- migration mappings;
- open deviations;
- current test evidence.

This does not require checking every technical parameter manually.

Focus on high-risk and recently changed model objects.

## 9. Preserve decisions, not every discussion

We do not need to store every meeting transcript.

We do need to preserve significant decisions:

- issue;
- alternatives;
- selected option;
- rationale;
- evidence;
- approver;
- affected objects;
- review condition.

This prevents repeated workshops whose only purpose is to reconstruct the original reasoning.

## 10. Prepare handover continuously

Do not wait until go-live to explain the model to AMS.

AMS-relevant knowledge should accumulate during delivery:

- current model;
- rules;
- dependencies;
- accepted exceptions;
- unresolved remediation;
- decision history;
- operational ownership;
- known deviations.

Continuous handover reduces the final documentation exercise and improves the quality of operational knowledge.

## A practical delivery loop

We use a repeated loop rather than treating design, build and test as isolated phases.

```text
Evidence from business, data or testing
                ↓
Model issue or change proposal
                ↓
Impact and validation
                ↓
Human decision
                ↓
Configuration, mapping and test updates
                ↓
Verification
                ↓
New approved baseline
```

The loop may run quickly for a small change.

A major cross-country change may require formal governance.

The structure remains the same.

This gives the programme a predictable place for learning to enter the implementation.

## A worked example: adding a supplier classification

A procurement team requests a new supplier classification.

The initial estimate is small:

- add the attribute;
- add a value list;
- include it in the workflow.

Without coordinated model control, the work may unfold like this:

1. MDG adds the attribute.
2. Migration learns about it two weeks later.
3. Two legacy systems have no equivalent field.
4. One country already maintains a similar classification under another name.
5. The team introduces a default.
6. Compliance says one value requires additional approval.
7. Workflow is revised.
8. An outbound interface rejects the new code.
9. Testing creates several defects.
10. Documentation is updated after UAT.

The programme has touched the same concept repeatedly.

A controlled approach begins differently.

### Frame the requirement

Why is the classification needed?

Which decision or process uses it?

### Check existing model objects

Does a similar attribute already exist?

Is the country field truly different?

### Profile source data

Which systems contain relevant evidence?

Can the value be derived reliably?

### Design the value list

Who owns it?

Are local variants needed?

### Assess impact

Which workflows, mappings, interfaces and reports are affected?

### Approve the model change

Record definitions, contexts, rules and treatment for missing data.

### Implement across workstreams

Update configuration, migration, integration and tests against the same approved state.

### Verify

Confirm that actual datasets and operational scenarios support the design.

There may still be substantial work.

The difference is that the work is performed once around a shared decision rather than several times around fragmented discoveries.

## A second example: changing a validation from warning to error

A data-quality review finds that a critical customer attribute is often blank.

The programme proposes changing the MDG validation from warning to error.

The configuration change is trivial.

The impact is not.

The programme should ask:

- How many existing records are blank?
- Can migration populate the field?
- Does every country use the same requirement?
- Will interfaces creating records fail?
- What happens to existing records when edited?
- Who owns remediation?
- Is a phased transition needed?
- Does the business process have a valid exception?
- Which tests must change?

Without this analysis, the error may be removed again after it blocks testing.

That is classic rework: configure, discover, reverse, redesign, configure again.

The better sequence is to quantify and decide first.

## Use rework indicators, not only defect counts

Defect counts do not show how much work the programme is repeating.

We recommend tracking several indicators.

### Reopened model decisions

How often are previously approved decisions reconsidered because evidence or rationale is missing?

### Mapping changes after approval

How many approved mappings change because the target model or source assumptions were incomplete?

### Defects caused by model divergence

How many defects result from teams using different definitions, values or versions?

### Repeated impact analyses

How often does the programme manually rebuild the same dependency view?

### Unplanned configuration reversals

How many rules or fields are configured and later reverted?

### Test cases invalidated by uncontrolled change

How much evidence must be repeated because the tested baseline is unclear?

### Knowledge reconstruction

How often do teams need former consultants or old meeting participants to explain current behaviour?

### Post-go-live design clarification

How many AMS incidents require reopening implementation design questions?

These indicators reveal process problems behind the defect backlog.

## Management has a role in reducing rework

Many rework patterns are encouraged by programme reporting.

If management rewards only visible build progress, teams may:

- mark assumptions as complete;
- configure before decisions are ready;
- hide unresolved local differences;
- defer model reconciliation;
- treat documentation as end-of-project work.

Managers can ask better questions:

1. Which approved model baseline are we implementing?
2. Which material assumptions remain open?
3. Which recent decisions affected several workstreams?
4. Which source-data findings changed the target model?
5. Which configured deviations are temporary?
6. Which mappings were invalidated by target changes?
7. Which defects indicate a model problem rather than an implementation error?
8. Which tests refer to the current baseline?
9. Which local exceptions remain outside the global model?
10. Which knowledge still depends on specific individuals?

These questions shift attention from activity volume to implementation coherence.

## Do not overcorrect with heavy governance

A programme can also create rework through excessive process.

If every field description change requires a large review board, teams will bypass governance or wait unnecessarily.

We classify changes by risk.

### Minor technical correction

No change to meaning, context, values or downstream behaviour.

Use lightweight review.

### Controlled model change

Affects a mapping, rule, value list, owner or limited context.

Require targeted impact analysis and relevant owners.

### Major governance change

Affects definitions, identifiers, several countries, operational workflow, matching or major integrations.

Require formal architecture and business approval.

The objective is not maximum process.

It is the minimum control needed to avoid downstream reconstruction.

## Where Martenweave fits

We built Martenweave around the problem of fragmented model knowledge.

The current product model connects fields, attributes, rules, owners, issues and decisions; validates references; detects model and dataset gaps; traces impact; and supports reviewable change proposals.

The current core includes:

- canonical Markdown and YAML model files;
- deterministic validation;
- generated SQLite and JSONL indexes;
- search and structured queries;
- trace and impact analysis;
- dataset profiling and gap detection;
- health, ownership, audit and scorecard reports;
- CSV and XLSX review flows;
- PatchProposal and ChangeRequest lifecycles.

Martenweave is not intended to replace SAP MDG, Jira, Confluence or migration execution. Its own product boundaries describe it as a validated model registry that can work beside these tools.

For an SAP MDG programme, the intended flow is:

```text
Excel, tickets, datasets, reports and SAP context
                        ↓
              Canonical model objects
                        ↓
        Validation, gaps and impact analysis
                        ↓
             Reviewable change proposal
                        ↓
                  Human approval
                        ↓
 Configuration, migration and test implementation
```

This reduces rework in three ways.

### It preserves object identity

Teams can refer to the same attribute, mapping or rule across tools.

### It detects structural inconsistency

Broken references and missing relationships can be found before review or testing.

### It makes model changes reviewable

AI, scripts or users can propose changes without silently modifying the approved model.

## AI should reduce analysis effort, not create uncontrolled change

AI can help teams:

- extract possible requirements from tickets;
- compare documents;
- suggest affected model objects;
- identify similar rules;
- summarise data gaps;
- draft mapping changes;
- prepare impact reports.

The risk is allowing AI-generated proposals to become accepted model truth without validation.

A plausible mapping can still be wrong.

A ticket may describe an obsolete decision.

Two similarly named fields may have different contexts.

We use AI to prepare proposals and evidence.

Deterministic validators check model structure.

Architects and responsible owners approve the change.

This matters because automated speed is valuable only when it reduces repeated analysis without increasing correction later.

## What a low-rework pilot should prove

A programme does not need to model everything before seeing value.

We recommend selecting:

- one domain;
- one current mapping workbook;
- one representative dataset;
- 30–100 critical attributes;
- several high-risk rules;
- recent change requests or defects.

The pilot should demonstrate that the team can:

1. Create stable model objects.
2. Connect source and target endpoints.
3. Compare the dataset with the model.
4. Detect structural and coverage gaps.
5. Trace one field across mappings and rules.
6. Analyse the impact of one change.
7. Produce a reviewable proposal.
8. Regenerate a business-readable view.
9. Preserve the final decision.
10. Show what evidence must be repeated after the change.

The success measure is not the number of imported rows.

It is whether the team avoids repeating work that previously required several manual investigations.

## When simpler controls are enough

Not every MDG project needs a dedicated model registry.

A disciplined set of workbooks, decisions and change controls may be sufficient when:

- the domain is small;
- there is one source and one target;
- local variation is limited;
- the team is stable;
- the model changes rarely;
- integrations are simple;
- the implementation is short;
- the cost of error is low.

The key is not the tool.

The key is whether the programme can answer impact, ownership and evidence questions without repeated reconstruction.

The need for stronger model control grows with:

- number of systems;
- number of countries;
- number of partners;
- duration;
- model complexity;
- change frequency;
- regulatory exposure;
- handover requirements.

## Our conclusion

Rework in an SAP MDG implementation does not come only from poor configuration or weak testing.

It often comes from fragmented decisions.

The business model changes in one place. Configuration changes in another. Migration, integration and testing discover the difference later.

The programme then pays several teams to reconcile knowledge it already created.

We reduce this by maintaining:

- one identifiable model baseline;
- stable model objects;
- explicit assumptions and deviations;
- early comparison with real data;
- impact analysis before material changes;
- controlled proposals;
- deterministic validation;
- evidence linked to model versions;
- continuous handover.

This does not stop the model from evolving.

It makes evolution cheaper.

Our practical test is:

> When one important model decision changes, can the programme identify every affected mapping, rule, dataset, configuration area and test without starting a new discovery exercise?

If the answer is no, the programme is likely to repeat work whenever the model moves.

If the answer is yes, change remains work—but it no longer becomes avoidable rework.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We work on practical model governance for SAP migration, MDG, MDM and AMS programmes. Our focus is helping architects and delivery teams preserve model decisions, identify impact earlier and reduce the repeated reconciliation work that consumes time without improving the final solution.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer supporting governed models, golden records, profiling, matching and consolidation, workflow-based changes, validated values, data-quality monitoring, mass processing and auditable data changes. SAP also recommends curating master data early before an SAP S/4HANA implementation.

Martenweave’s current public documentation describes structured model objects, deterministic validation, generated indexes, dataset profiling, gap detection, trace and impact analysis, reporting, spreadsheet review flows and controlled PatchProposal and ChangeRequest lifecycles.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
