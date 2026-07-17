# How to Keep SAP MDG Design and Configuration Aligned

**Reviewed: 14 July 2026**

The design document says the field is optional.

The migration workbook says it is mandatory.

The quality system rejects records when the field is blank.

Development accepts them.

One country has a local exception recorded in Jira. Another country copied the original global rule into its own mapping file and changed it six weeks ago.

During the design review, everyone says they are following the approved model.

They are simply following different versions of it.

This is not an unusual failure in SAP MDG programmes. The initial design may be coherent, reviewed and formally approved. The divergence appears later, one reasonable change at a time:

- a validation is adjusted to unblock testing;
- a local requirement is accepted through a ticket;
- a target attribute is renamed;
- migration introduces a temporary default;
- an interface requires another value;
- a rule is corrected directly in configuration;
- a transport reaches one environment but not another;
- the design document is left for a later update.

No single change looks serious.

After several months, the programme no longer has one model. It has a design model, a configured model, a migration model, a test model and several local interpretations.

The problem is not that the design changed.

A model should change when the programme learns something important.

The problem is that the changes did not move through the entire delivery system together.

Our approach is to treat alignment as a continuous control:

> The approved design, SAP MDG configuration, migration mappings, datasets, tests and operational documentation should describe the same intended model—or show their differences explicitly.

Alignment does not mean that every artefact must be identical.

It means that differences are intentional, traceable and owned.

## Configuration is not the end of design

A common project assumption is that design happens first and configuration follows.

In reality, configuration generates new design information.

The team may discover that:

- a standard entity behaves differently from the initial assumption;
- a validation is needed at another point in the process;
- a workflow requires additional context;
- a field cannot be reused as planned;
- a local extension has wider consequences;
- the migration population cannot support a mandatory rule;
- matching behaviour creates unexpected results;
- a downstream interface depends on the old structure.

These discoveries may justify changing the model.

That is healthy.

What creates risk is allowing the configuration decision to become the new design without an explicit review.

The sequence becomes:

```text
Design approved
      ↓
Configuration exposes a problem
      ↓
Technical workaround implemented
      ↓
Workaround becomes operational behaviour
      ↓
Design documentation remains unchanged
```

Months later, a new team compares the documented design with the system and assumes that one of them is wrong.

Sometimes the configuration is wrong.

Sometimes the document is obsolete.

Often nobody can prove which one represents the approved decision.

## SAP MDG contains operational truth, not the whole implementation truth

SAP describes SAP Master Data Governance as a governance layer that supports governed models, golden records, matching and consolidation, workflow-based changes, validated values, data-quality monitoring and auditable data changes.

That makes the configured platform a critical source of operational truth.

It shows what the system currently does.

The complete implementation truth is wider.

It also includes:

- why the model was designed this way;
- which requirement introduced the field;
- which source systems can populate it;
- which mappings depend on it;
- which countries have exceptions;
- which target rule was approved;
- which temporary deviations remain;
- which tests prove the intended behaviour;
- which configuration changes are planned but not yet transported;
- which data populations require remediation.

The configured system cannot preserve all of this automatically because much of it exists outside the operational platform.

The programme therefore needs a controlled relationship between design intent and configured behaviour.

## There are several kinds of alignment

Teams often discuss alignment as if it were one comparison between a document and a system.

We separate it into several distinct questions.

### Semantic alignment

Does the configured attribute still mean what the approved business definition says it means?

A field can retain the same name while its business use changes.

### Structural alignment

Do the entities, attributes, relationships and contexts in configuration match the approved model?

### Rule alignment

Do validations, derivations and workflow conditions implement the approved business rules?

### Mapping alignment

Do migration and integration mappings point to the current target attributes and values?

### Environment alignment

Do development, quality and production represent the intended states for their respective stages?

### Evidence alignment

Do tests and approvals refer to the model and configuration versions actually being delivered?

### Operational alignment

Do stewards and AMS documentation describe the behaviour users will encounter after go-live?

A programme may be aligned in one area and divergent in another.

For example, the configured field may exist correctly, while the migration mapping still points to the previous value list.

## The approved model needs its own identity

The programme should be able to name the model baseline being implemented.

Not just:

> the latest design

but something identifiable, such as:

```text
Customer/Business Partner model baseline 1.7
Approved: 18 June
Applicable wave: Germany and Austria
```

The baseline should include or reference:

- business entities;
- attributes;
- relationships;
- organisational contexts;
- definitions;
- allowed values;
- rules;
- ownership;
- target endpoints;
- approved exceptions.

This does not mean freezing the model permanently.

It means changes occur relative to a known state.

Without a baseline, the programme cannot answer:

- What changed?
- When did it change?
- Who approved it?
- Which configuration implements it?
- Which tests remain valid?
- Which mappings require review?

“The latest version” is not useful when several teams maintain different latest versions.

## Configuration objects should refer back to model objects

A field in SAP configuration should be traceable to an approved model object.

The exact mechanism may vary, but the programme should maintain a relationship such as:

```text
Business attribute
→ approved target endpoint
→ MDG entity or attribute
→ implemented rule or workflow behaviour
```

This helps avoid two common problems.

### Configuration without design

A technical object exists, but nobody can identify the business concept or approved requirement behind it.

### Design without implementation

The approved model includes an attribute or rule that was never configured.

Both situations should be visible before formal testing.

A stable model identifier is particularly useful.

For example:

```text
ATTR-BP-TAX-REGISTRATION
RULE-BP-TAX-MANDATORY-DE
FEP-MDG-BP-TAXNUM
```

These identifiers can be referenced from:

- configuration documentation;
- migration mappings;
- Jira changes;
- tests;
- defect reports;
- release notes;
- AMS procedures.

The identifiers do not need to be exposed to every business user. They provide a stable connection between artefacts.

## Build a design-to-configuration matrix

A practical alignment control is a design-to-configuration matrix.

For each critical model object, record:

| Model element | Approved state | Configuration reference | Environment | Verification status |
|---|---|---|---|---|
| Attribute | Optional in DE sales area | MDG attribute/config reference | DEV/QAS | Verified |
| Validation rule | Mandatory for active B2B customers | Rule implementation reference | QAS | Pending test |
| Value list | Codes 01–08 | Configured list reference | DEV/QAS | Difference found |
| Workflow condition | High-risk supplier requires compliance review | Workflow step reference | DEV | Not transported |

The matrix should not become another manually maintained mega-spreadsheet.

Its purpose is to expose critical differences.

For larger programmes, it should be generated or partially generated from structured model and configuration evidence.

The useful statuses are not only `Complete` and `Incomplete`.

We prefer:

- Aligned;
- Planned;
- Implemented but not verified;
- Approved deviation;
- Unapproved deviation;
- Obsolete;
- Unknown.

`Unknown` is important.

It is better to show that alignment has not been proven than to infer it from the absence of a defect.

## Changes should begin in the model, not in configuration

The cleanest change process begins with the intended model state.

```text
Current approved model
        ↓
Proposed model change
        ↓
Impact analysis
        ↓
Approval
        ↓
Configuration and mapping changes
        ↓
Testing
        ↓
Verified model baseline
```

This order keeps configuration as implementation rather than decision-making by accident.

There will be urgent cases where a technical correction must happen first.

The programme should treat these as controlled deviations:

1. Record the emergency change.
2. Identify the affected model objects.
3. Explain why the normal sequence was bypassed.
4. Review the intended model state.
5. Update or revert the configuration.
6. Reconcile mappings, tests and documentation.

An emergency change that is never reconciled becomes hidden architecture.

## Do not let Jira become the unofficial design authority

Many model changes are discussed and approved in Jira or Azure DevOps.

This is practical. Tickets provide history, comments, assignment and workflow.

The risk is that the final model decision remains only in the issue.

For example:

> Country team confirms that field X is not mandatory for Portugal.

The issue closes.

The global design still says the field is mandatory. The configuration team adds a local exception. Migration creates a local rule. Testing updates one scenario.

Now the ticket is the only place that explains why the model differs.

A better pattern is:

```text
Issue discussion
      ↓
Decision
      ↓
Approved model change
      ↓
Configuration and delivery updates
```

Jira tracks the work and discussion.

The model records the approved result.

Closing the issue should trigger or require verification that the relevant model objects were updated.

## Environment differences should be explicit

Development, quality and production will not always be identical.

That is normal during delivery.

The programme should know why they differ.

A simple environment-alignment view can show:

| Model object | DEV | QAS | PRD | Intended state |
|---|---|---|---|---|
| Tax validation | New rule | Old rule | Old rule | QAS after transport 142 |
| Customer Group list | Codes 01–09 | Codes 01–08 | Codes 01–08 | 01–09 after release |
| Supplier workflow | Updated | Updated | Previous | Production after UAT |

The danger is not temporary difference.

The danger is unexplained difference.

Common causes include:

- pending transports;
- failed transports;
- direct corrections;
- environment-specific settings;
- incomplete deployment;
- emergency fixes;
- manual configuration;
- changes made outside the expected release.

Alignment review should therefore distinguish:

- design difference;
- deployment difference;
- intended environment difference;
- defect;
- unapproved change.

## Migration mappings must follow the model baseline

Migration often develops at a different speed from MDG configuration.

The mapping team may need early target information before configuration is complete. Later target changes may not flow back into the mapping workbooks or migration code.

Typical divergence includes:

- target field renamed or replaced;
- context changed;
- optional field made mandatory;
- value list updated;
- derivation moved from migration to MDG;
- validation severity changed;
- local extension added;
- relationship model revised.

Every material model change should answer:

- Which mappings reference this object?
- Which transformations depend on it?
- Which datasets need revalidation?
- Which value mappings need updates?
- Which load templates change?
- Which tests become obsolete?

The migration team should not learn about target changes through failed loads.

## Design and actual data must also remain aligned

A design may match configuration and still be disconnected from the source data.

Suppose the approved and configured model makes an attribute mandatory.

The configuration is aligned perfectly.

The current dataset has the value for only 55% of in-scope records.

This is not a configuration-alignment defect.

It is still an implementation risk.

We therefore include dataset evidence in model reviews:

- expected source fields;
- actual column availability;
- completeness;
- observed values;
- context coverage;
- relationship integrity;
- known remediation.

SAP states that automated S/4HANA processes rely heavily on clean and correct master data and recommends curating that data early.

For an MDG programme, early curation should include comparing the target design with representative source data—not only assessing data independently.

## Rule alignment deserves its own review

Rules are especially prone to divergence because they may be implemented in several places:

- source system;
- migration transformation;
- staging validation;
- SAP MDG rule;
- workflow condition;
- integration layer;
- downstream application;
- manual stewardship procedure.

The programme needs one approved business-rule definition.

Each technical implementation should refer to it.

For example:

```text
Business rule:
German organisational Business Partners require tax category DE1
unless an approved exemption exists.
```

Possible implementations:

- migration pre-check;
- MDG validation;
- data-quality report;
- operational steward guidance.

These implementations may behave differently by design.

The migration pre-check may produce a warning during early test cycles. MDG may block new operational records after go-live.

That difference is acceptable when it is explicit.

It is a problem when each team thinks it has implemented the definitive rule.

## Workflow alignment is not only about steps

A workflow can match the approved process diagram and still implement the wrong governance model.

We check:

- what event starts the workflow;
- which attributes determine routing;
- which roles approve;
- whether context affects the approver;
- which changes require additional review;
- how exceptions are handled;
- what happens after rejection;
- which mass-change or emergency paths bypass normal routing;
- whether the approved data ownership model matches actual role assignments.

SAP highlights collaborative workflow routing and notifications as part of MDG’s governance capabilities.

The programme must still prove that the configured workflow reflects the organisation’s approved responsibilities.

A technically functioning workflow can route a decision to the wrong owner with perfect reliability.

## Testing should verify alignment, not only functionality

A test that proves a field can be saved does not prove alignment.

We recommend tests that connect:

```text
Approved model requirement
→ configured behaviour
→ representative data
→ expected result
```

For a critical rule, evidence should identify:

- model baseline;
- configuration version or release;
- environment;
- dataset or test data;
- context;
- expected result;
- actual result;
- defect or approval.

This allows the programme to answer:

> Which version of the model did this test prove?

Without that connection, a successful test may refer to a model that has already changed.

## Use three kinds of alignment review

A single large review at the end of design is not enough.

We use three different review patterns.

## 1. Continuous change review

Triggered by a material model proposal.

Checks:

- affected design objects;
- configuration impact;
- mapping impact;
- dataset impact;
- test impact;
- owner approval.

This keeps changes aligned as they occur.

## 2. Release alignment review

Performed before a transport bundle, mock load or formal test cycle.

Checks:

- approved baseline;
- intended release content;
- environment state;
- mappings;
- open deviations;
- test readiness.

This ensures all teams test the same intended state.

## 3. Periodic model reconciliation

Performed at agreed milestones.

Checks:

- configured objects without approved model references;
- approved model objects not implemented;
- obsolete mappings;
- undocumented exceptions;
- environment differences;
- closed issues not reflected in the model;
- active rules without owners;
- outdated test evidence.

This catches slow drift that individual change reviews may miss.

## A worked example: supplier risk classification

The approved design defines three risk levels:

- Low;
- Medium;
- High.

The target value list is global.

During configuration, the compliance team requests an additional value:

- Under Review.

The value is added in development to support testing.

The design is not updated because the team considers it temporary.

Migration later receives records with no reliable risk classification and maps them to Under Review.

A workflow condition routes Under Review suppliers to compliance.

An outbound interface does not recognise the new value and rejects replication.

Testing records the interface failures as technical defects.

The real issue is design-to-configuration divergence.

The new value changed:

- the business value list;
- migration treatment;
- workflow routing;
- interface contract;
- operational ownership;
- remediation population.

A controlled change would have required:

1. defining the meaning of Under Review;
2. deciding whether it is a permanent governed value;
3. identifying who may assign and clear it;
4. quantifying migrated records;
5. updating the global model;
6. reviewing downstream consumers;
7. configuring the value;
8. updating mappings;
9. testing the full lifecycle.

The configuration change itself may take minutes.

The model change is larger.

## Another example: optional tax field

The design says a tax identifier is optional because several legacy systems do not contain reliable values.

A country later confirms that the identifier is legally required for a specific organisation type.

The configuration team adds a mandatory rule for that country.

Migration continues using the original global design.

The next load produces hundreds of errors.

The migration team introduces a placeholder to proceed.

Now the programme has:

- correct local configuration;
- outdated migration logic;
- invalid placeholder values;
- no remediation owner;
- global documentation that still says optional.

The solution is not simply to update the mapping.

The programme needs to reconcile:

- global definition;
- local context;
- source-data availability;
- exception policy;
- configured validation;
- migration treatment;
- operational correction.

Alignment means all these parts reflect one approved decision.

## Manage deviations explicitly

Perfect alignment at every moment is unrealistic.

A programme needs controlled deviations.

A deviation record should include:

- affected model object;
- intended design;
- actual implementation;
- reason;
- environment;
- owner;
- risk;
- expiry or reconciliation date;
- required follow-up.

Useful deviation types include:

- temporary test workaround;
- source-data limitation;
- local legal exception;
- delayed configuration;
- planned future enhancement;
- production emergency change;
- accepted technical constraint.

The important point is that deviation is a status, not a hidden fact.

A programme can proceed with known differences.

It cannot manage differences it does not know about.

## Alignment needs ownership

No single person can own every element.

We divide responsibility.

### Business owner

Owns meaning, policy and acceptance of business exceptions.

### Data or domain architect

Owns model coherence and semantic alignment.

### SAP MDG architect

Owns configured implementation of the approved model.

### Migration lead

Owns alignment of mappings and transformation with the target model.

### Integration architect

Owns downstream contract alignment.

### Test lead

Owns evidence that approved behaviour is implemented.

### Release or configuration manager

Owns environment and deployment visibility.

### AMS lead

Owns operational understanding after handover.

One role should coordinate the alignment process, but the evidence is distributed.

The model should make responsibility explicit at object and change level.

## Where Martenweave fits

We built Martenweave as a practical model-control layer between design, configuration, migration and support.

The current product model can connect fields, attributes, rules, owners, issues and decisions, validate references, detect model and dataset gaps, trace impact and produce reviewable change proposals.

Its current core includes:

- canonical Markdown and YAML model files;
- deterministic validation;
- generated SQLite and JSONL indexes;
- search and structured query;
- trace and impact analysis;
- dataset profiling and gap detection;
- ownership, audit and scorecard reports;
- CSV and XLSX review flows;
- PatchProposal and ChangeRequest lifecycle.

For an MDG implementation, a Martenweave model can represent:

- approved business attributes;
- contexts;
- target field endpoints;
- mappings;
- rules;
- decisions;
- issues;
- ownership;
- datasets;
- proposed changes.

The SAP configuration remains the operational implementation.

Martenweave provides the independent model baseline against which configuration and related delivery artefacts can be reviewed.

It does not replace SAP MDG, Jira, Confluence or migration tooling. The project explicitly positions it beside those tools as a validated model registry.

## A practical Martenweave alignment flow

```text
Approved model objects
        ↓
PatchProposal describes intended change
        ↓
Deterministic validation
        ↓
Impact analysis across mappings, rules and datasets
        ↓
Human approval
        ↓
SAP MDG configuration and related delivery changes
        ↓
Verification evidence
        ↓
New approved model baseline
```

The flow protects two boundaries.

First, configuration should not redefine the model silently.

Second, AI or automation should not update the approved model directly.

AI may extract a possible change from a ticket or compare documents. It should produce a proposal.

Validators check structural consistency.

Responsible people approve the model change.

## What can be checked automatically

Not all alignment can be automated.

Business meaning and architecture still require judgement.

Deterministic checks can identify useful classes of divergence:

- mappings referencing retired endpoints;
- missing model objects;
- duplicate identifiers;
- rules without owners;
- attributes without configuration references;
- configuration references without approved attributes;
- value mappings using obsolete lists;
- datasets missing newly required fields;
- tests linked to an older model version;
- unresolved deviations past their review date.

These checks remove clerical inconsistencies from architecture reviews.

They also make it easier to find drift before a formal milestone.

## What managers should ask

A manager does not need to compare configuration tables with design documents.

We recommend asking:

1. What is the current approved model baseline?
2. Which release or configuration state implements it?
3. Which approved model objects are not yet configured?
4. Which configured objects do not have an approved model reference?
5. Which deviations are temporary?
6. Which local exceptions have been incorporated into the global model?
7. Which target changes affected migration mappings?
8. Which datasets were revalidated after the latest model change?
9. Which tests prove the current configuration?
10. Are development, quality and production differences understood?
11. Which emergency changes still require reconciliation?
12. Can AMS explain the current behaviour from the approved model?

If these questions require several days of manual investigation, alignment is not under control.

## Warning signs

We would investigate immediately when:

- teams refer to different “latest” design files;
- configuration decisions are approved only in tickets;
- local workbooks contain fields absent from the global model;
- migration defects repeatedly result from target changes;
- development and quality behave differently without a clear release explanation;
- test evidence does not name a model or release baseline;
- temporary values or defaults have no expiry;
- closed issues did not update the model;
- the design document is updated only before audits or handover;
- AMS documentation is written from memory after go-live.

Each sign indicates that model knowledge is moving through informal channels.

## Alignment should not become bureaucracy

There is a risk of turning every label correction into a large governance process.

We avoid that by classifying changes.

### Minor technical correction

No semantic or downstream effect.

Lightweight review and record update.

### Controlled model change

Affects one or more rules, mappings, values or contexts.

Impact review and responsible-owner approval.

### Major cross-domain change

Affects definitions, identifiers, several countries, workflows or integrations.

Formal architecture and programme decision.

The process should match the risk.

The key control is not the number of approvals.

It is that the intended state is known before implementation and verified afterward.

## The cost of misalignment

Misalignment creates work that appears in other budgets:

- migration defects;
- repeated testing;
- configuration rework;
- interface corrections;
- business review meetings;
- emergency data fixes;
- cutover delays;
- handover effort;
- AMS investigations;
- dependency on original consultants.

This is why alignment can look like documentation overhead while actually being delivery control.

The programme pays for alignment either early through structured change management or later through reconstruction and correction.

The later version is usually more expensive because it happens under schedule pressure.

## Our conclusion

The design and configuration of SAP MDG will not remain aligned automatically.

They are changed by different people, in different tools, at different speeds and for different reasons.

The solution is not to freeze the design.

The solution is to make change controlled and visible.

We maintain:

- an identifiable approved model baseline;
- stable model objects;
- references from configuration to design;
- explicit deviations;
- impact analysis before material changes;
- migration and dataset reconciliation;
- evidence that the intended model was implemented;
- periodic reviews for slow drift.

The central question is not:

> Does the configuration match the document?

It is:

> Can the programme prove that the configured behaviour, migration logic and operational process still implement the same approved model?

When the answer is yes, design changes become manageable.

When the answer depends on which team is asked, the system may be functioning—but the programme is no longer controlling its model.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We work on practical model governance for SAP migration, MDG, MDM and AMS programmes. We focus on helping architects and delivery teams keep business intent, model design, configuration, mappings and evidence aligned as the implementation changes.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a governance layer supporting governed models, golden records, matching and consolidation, collaborative workflows, validated values, data-quality monitoring, mass changes and auditable data changes. SAP also recommends preparing clean and correct master data early before an SAP S/4HANA implementation.

Martenweave’s current public documentation describes structured model objects, deterministic validation, generated indexes, dataset gap detection, trace and impact analysis, ownership and audit reports, spreadsheet review flows and controlled PatchProposal and ChangeRequest lifecycles.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
