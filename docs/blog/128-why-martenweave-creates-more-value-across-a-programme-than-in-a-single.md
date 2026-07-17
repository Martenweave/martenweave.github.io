# Why Martenweave Creates More Value Across a Programme Than in a Single Project

A small migration project may not need Martenweave.

That should be stated clearly.

If one team is moving one object from one source system into one target system, the mapping is stable and the same people remain involved from design to cutover, a disciplined spreadsheet may be enough.

Add version control, a few validation scripts and clear ownership, and the project may have all the governance it needs.

The economics change when the organisation stops running one project and starts running a programme.

A programme has several waves, countries, systems, vendors and teams. The same customer, supplier or material model is interpreted repeatedly. Decisions made in the first rollout must survive into the second and third. Defects found in one country should prevent defects elsewhere.

In practice, this knowledge rarely travels cleanly.

Each new project begins with the previous project’s documents, but not with its full understanding.

The workbook is copied.

The design is adapted.

Old Jira tickets are difficult to interpret.

Temporary exceptions look like global rules.

New consultants challenge decisions whose original reasoning cannot be found.

The programme pays again to reconstruct knowledge it has already created.

This is where Martenweave becomes economically more interesting.

Its value does not come mainly from storing one project’s mappings.

It comes from making useful model knowledge reusable across a series of changes.

## Projects end, but the model remains

A project has a defined delivery scope.

It may migrate customer data for one country, implement a new warehouse or integrate one logistics provider.

When the project closes, its team disbands. External consultants move to other clients. Business users return to operational roles.

The resulting data model does not disappear.

The company still needs to understand:

- what each attribute means;
- which system is authoritative;
- which mappings were approved;
- which exceptions apply;
- which validations are required;
- which interfaces depend on the field;
- why a particular design choice was made.

The next rollout will need many of the same answers.

Without a governed model, the next team receives documents.

Documents are useful, but they rarely preserve the complete context.

A spreadsheet can show that code `A` maps to code `01`.

It may not explain:

- why this mapping was chosen;
- whether it applies globally;
- which alternatives were rejected;
- which exception was introduced during testing;
- whether the downstream interface was updated;
- who has authority to change it.

The project created knowledge.

The programme preserved files.

Those are not the same thing.

## The repeated-start problem

Multi-wave programmes often claim that later rollouts will be faster because they can reuse the template.

Sometimes they are.

Often, the template contains more uncertainty than management realises.

The next country begins by asking:

- Is this field really mandatory?
- Does this mapping apply to us?
- Why is this value derived?
- Is this exception still valid?
- Which version was finally loaded?
- Was this rule corrected after go-live?
- Who owns the global definition?

The original team may know the answers.

The new team may not know whom to ask.

The programme then spends weeks repeating analysis that has already happened.

This is the repeated-start cost.

It appears in:

- discovery workshops;
- mapping reviews;
- fit-gap sessions;
- defect analysis;
- local template adaptations;
- interface clarification;
- data-quality rule design;
- test preparation.

The organisation calls this localisation.

Part of it is legitimate localisation.

Part of it is knowledge recovery.

A model registry should help distinguish the two.

## Reuse should mean more than copying a workbook

Copying a workbook is not model reuse.

It is document reuse.

Real model reuse means that the next project inherits:

- stable business definitions;
- approved source and target relationships;
- mapping rules;
- validation conditions;
- known exceptions;
- ownership;
- evidence;
- previous defects;
- impact relationships;
- change history.

The new project should then identify differences against that baseline.

For example:

> The global material model requires warehouse unit, packaging level and dangerous-goods status. Country B follows the global rules except for two locally approved packaging codes and one additional regulatory field.

This is a more useful starting point than:

> Here is the material mapping workbook from Country A. Please review every row.

The first approach treats the existing model as a baseline.

The second treats the previous project as a source of hints.

## One defect should improve every later wave

Consider a supplier migration.

During the first country rollout, the team discovers that one legacy payment-term code has two meanings.

The original mapping treated both populations identically.

The defect is analysed.

A conditional rule is introduced.

The load is corrected.

The country goes live.

What happens next determines whether the programme learns.

In a project-based model, the correction may remain in:

- one transformation;
- one Jira ticket;
- one updated workbook;
- one test report.

The next country receives the earlier template and repeats the mistake.

The programme pays again for:

- defect detection;
- investigation;
- business clarification;
- mapping correction;
- retesting;
- reporting.

In a programme model, the defect produces a governed change:

- the payment-term definition is clarified;
- the source condition is recorded;
- the mapping is updated;
- the validation rule is added;
- the evidence is linked;
- affected future waves are identified.

The defect becomes an asset.

That is the economic difference.

## The value compounds through reuse

The first Martenweave implementation requires effort.

Existing mappings must be imported.

Identifiers must be established.

Ambiguous rules must be clarified.

Dependencies must be connected.

Owners must be assigned.

This can make the first project look more expensive than continuing with spreadsheets.

The value grows when the resulting model is reused.

Suppose the first project invests €60,000 in model setup, integration and governance.

If the project is isolated, the investment must justify itself within that one delivery.

That may be difficult.

Now suppose the same model supports five rollout waves.

The initial setup cost remains substantial, but later waves can reuse:

- object definitions;
- mappings;
- validations;
- ownership;
- evidence;
- reports;
- lessons from previous defects.

Even if each later wave saves only €20,000 in repeated analysis and rework, the programme avoids €80,000 across four subsequent waves.

The model has paid back more than it saved in the first project.

This is why Martenweave should not be positioned only as a project tool.

Its strongest economic argument is cumulative.

## A simple programme-level model

The programme benefit can be described as:

```text
Programme value =
first-project savings
+ reuse savings across later waves
+ avoided repeated defects
+ reduced onboarding and handover effort
+ lower ongoing support investigation
− setup and operating cost
```

The most important term is reuse.

A single project can save time through validation and impact analysis.

A programme can save the same type of time repeatedly.

## A conservative example

Assume a company plans four SAP rollout waves.

Without a shared model, each wave spends approximately:

- €25,000 reconstructing mappings and decisions;
- €15,000 resolving repeated model inconsistencies;
- €10,000 preparing and reconciling readiness reports.

That gives €50,000 of model-related coordination per wave.

Across four waves:

```text
4 × €50,000 = €200,000
```

Now assume Martenweave costs:

- €60,000 for initial implementation and model setup;
- €15,000 per year for operation and maintenance during the programme.

For a two-year programme:

```text
€60,000 + €30,000 = €90,000
```

Suppose it reduces model-related coordination by:

- 15% in the first wave;
- 35% in the second;
- 45% in the third;
- 50% in the fourth.

The savings are:

```text
Wave 1: €7,500
Wave 2: €17,500
Wave 3: €22,500
Wave 4: €25,000
Total: €72,500
```

On these assumptions, the tool has not yet paid for itself.

That is a useful result, not a failure of the calculation.

Now include the cost of three repeated defects avoided in later waves, each requiring €12,000 in cross-team analysis, correction and retesting:

```text
3 × €12,000 = €36,000
```

Total benefit becomes:

```text
€72,500 + €36,000 = €108,500
```

Net benefit:

```text
€108,500 − €90,000 = €18,500
```

The business case is positive, but not spectacular.

This is a credible outcome.

A registry should not be justified through exaggerated savings. It should be justified when measurable reuse and avoided repetition exceed the cost of maintaining the model.

## The economics improve with programme complexity

Martenweave becomes easier to justify when the programme has:

- several countries;
- several migration waves;
- repeated use of the same master-data objects;
- different source systems;
- several implementation partners;
- local exceptions;
- SAP plus EWM, TM, MDG or external platforms;
- high consultant rates;
- long support horizons;
- frequent changes after the first go-live.

The same field may be analysed once and reused ten times.

The same validation may prevent defects across several datasets.

The same decision may support migration, integration and AMS.

This is where the model begins to behave like infrastructure rather than project documentation.

## The economics weaken when every wave is genuinely different

Reuse should not be assumed.

A programme may consist of projects that share a brand but not a meaningful model.

One country may use a different ERP.

Another may have a separate product structure.

A third may have unique regulatory requirements.

If each rollout requires rebuilding most mappings and rules, the compounding value is lower.

Martenweave can still provide local validation and traceability, but the programme-level business case becomes weaker.

Managers should therefore measure actual reuse potential.

Ask:

- What percentage of objects are common?
- What percentage of attributes are shared?
- How many mappings are expected to remain stable?
- Which validation rules can be reused?
- How many local differences exist?
- Are differences explicit, or must they be rediscovered?

The answer should determine the investment.

## Martenweave as a programme memory

A transformation programme needs more than a document archive.

It needs memory that can be queried and validated.

A useful programme memory should know:

- what the global model says;
- where a local project differs;
- why the difference exists;
- who approved it;
- which future waves may be affected;
- whether the implementation still matches the approved state.

Martenweave can provide this through canonical model files, deterministic validation, generated indexes, dataset gap detection and impact analysis.

The important point is not that the tool stores more information.

The important point is that later teams can reuse the information without trusting it blindly.

They can validate it against their datasets and identify explicit differences.

## Global model and local overlays

For programme use, Martenweave should distinguish between:

- global definitions;
- local extensions;
- approved exceptions;
- temporary deviations;
- proposed changes.

This prevents two common failures.

The first is forcing every country into a supposedly global model that does not reflect reality.

The second is allowing every country to create an independent model, destroying reuse.

A practical pattern is:

```text
Global baseline
    → local extension
    → validation
    → explicit deviation report
    → approval
```

The local team should not copy the entire model and silently edit it.

It should inherit the global baseline and state where it differs.

Managers can then see whether the programme is converging or gradually fragmenting.

## Comparison with programme templates

Most SAP programmes already have templates.

They include:

- process designs;
- configuration;
- mapping workbooks;
- migration objects;
- validation scripts;
- test cases;
- deployment procedures.

Why add Martenweave?

Because the template often exists as a collection of deliverables.

Martenweave can connect the data-model parts of those deliverables into a validated state.

A template document may say that a field is mandatory.

The registry can connect that rule to:

- the attribute;
- the applicable object;
- the source dataset;
- the validation;
- the owner;
- the local exceptions.

The template remains the wider delivery package.

Martenweave becomes the controlled model inside it.

## Comparison with a centre of excellence

A data or migration centre of excellence often performs the role informally.

Experienced specialists remember previous decisions, review mappings, maintain standards and help new projects.

This can work well.

The problem is scalability.

The same experts are repeatedly asked to:

- explain old mappings;
- review similar changes;
- identify dependencies;
- locate decisions;
- compare local deviations.

Martenweave does not replace the centre of excellence.

It reduces the amount of context that exists only in the experts’ memory.

The CoE can spend more time on genuine judgement and less time reconstructing previous work.

## Comparison with enterprise MDM

An MDM system may persist long after the transformation programme.

It governs productive records and workflows.

Why is a separate programme model needed?

Because rollout knowledge includes more than productive master data:

- legacy source fields;
- migration mappings;
- temporary transformations;
- dataset expectations;
- local decisions;
- cutover constraints;
- external interface mappings.

Some of this knowledge should eventually be retired.

Some should remain as operational governance.

Martenweave can preserve the reasoning and transition history without forcing all of it into the productive MDM platform.

## Comparison with a data catalog

A data catalog can provide enterprise-wide discovery and technical lineage.

This helps later projects understand the existing landscape.

But a programme also needs to know the intended model and approved differences between rollouts.

The catalog answers:

> What data assets exist?

Martenweave answers:

> Which programme model should this rollout implement, and where does it differ?

Again, the systems can complement each other.

## AMS extends the value beyond the programme

The strongest long-term case may not end at go-live.

After the transformation programme closes, AMS teams continue to handle:

- data defects;
- mapping questions;
- interface failures;
- change requests;
- new organisational units;
- new suppliers, customers or product types.

Without a maintained model, project knowledge gradually disappears.

Support teams solve incidents locally.

The same problems return.

If Martenweave remains part of the operating model, support incidents can create structured improvements:

- a new validation rule;
- a clarified definition;
- a registered exception;
- an updated dependency;
- a proposed mapping change.

The programme model becomes an operational knowledge base.

This extends the return period beyond the original implementation.

It also introduces a condition: somebody must continue maintaining it.

A stale registry has little value.

## Programme governance without a giant platform

The programme-level argument does not mean Martenweave should become a large enterprise suite.

Its advantage is the opposite.

It can remain a focused layer around:

- canonical model files;
- validation;
- generated indexes;
- dataset gaps;
- impact analysis;
- controlled proposals;
- Git-based review.

The programme can use existing systems for:

- execution;
- MDM;
- issue tracking;
- documentation;
- data quality;
- runtime schemas;
- technical lineage.

Martenweave only needs to preserve and validate the model relationships that must survive between projects.

## What managers should measure

To evaluate programme value, track:

- time required to start a new rollout;
- percentage of model reused without change;
- number of local deviations;
- time spent reconstructing prior decisions;
- repeated defects across waves;
- time to onboard new consultants;
- time to assess cross-wave impact;
- manual effort required to prepare readiness reports;
- number of exceptions copied without approval;
- number of model corrections reused by later projects.

These measures show whether the programme is actually learning.

A programme that repeats the same analysis is not gaining scale.

It is running several projects under one budget.

## When to introduce Martenweave

The best moment is not necessarily at the start of the entire programme.

The first project may reveal which parts of the model are stable enough to govern.

A sensible path is:

1. Choose one high-value domain.
2. Capture the model from an active project.
3. Validate it against real datasets.
4. Record decisions and defects.
5. Use it as the baseline for the next wave.
6. Measure how much work was reused or avoided.
7. Expand only where the result is positive.

This is safer than trying to design a complete enterprise model before delivery begins.

## The management rule

For one small project, Martenweave may be optional.

For a multi-wave programme, the question changes.

The organisation must decide whether it wants every rollout to rediscover the same model—or whether it wants the programme to accumulate validated knowledge over time.

A project creates deliverables.

A programme should create reusable capability.

Martenweave is economically useful when it helps convert one project’s decisions, mappings, validations and defects into a stronger starting point for the next.

Its value is not only in preventing one mistake.

It is in preventing the organisation from paying for the same understanding more than once.
