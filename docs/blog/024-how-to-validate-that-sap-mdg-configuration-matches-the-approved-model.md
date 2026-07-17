# How to Validate That SAP MDG Configuration Matches the Approved Model

**Reviewed: 14 July 2026**

The design review is complete.

The model has been approved. Configuration has been transported. Unit tests are green. The programme moves into UAT believing that the intended governance design now exists in the system.

Then users start testing.

A field that should be optional produces an error.

A country-specific rule applies globally.

A workflow routes the request to the wrong team.

A value shown in the approved list cannot be selected.

One attribute appears on the user interface but is missing from replication.

Another field is technically available but never becomes active because the derivation overwrites it.

Every individual component appears to have been delivered.

Together, they do not implement the approved model.

The usual response is to open defects one by one.

That may fix the immediate symptoms. It does not answer the wider question:

> Does the SAP MDG configuration, as a whole, represent the model that the programme approved?

A successful transport proves that configuration moved between environments.

A successful unit test proves that selected technical behaviour worked under selected conditions.

Neither proves complete alignment with the intended business model.

We treat design-to-configuration alignment as its own validation problem.

The approved model states what should be true.

SAP MDG configuration determines what the system actually permits, requires, derives, routes and distributes.

The programme needs explicit evidence connecting the two.

## A functioning system can still implement the wrong model

Configuration defects are not always technical failures.

A validation may work exactly as configured and still be wrong because:

- the approved context was narrower;
- a temporary requirement was implemented permanently;
- the wrong attribute was used;
- an exception was omitted;
- a warning became an error;
- a local rule was treated as global;
- the approved value list changed after configuration started.

The system is not malfunctioning.

It is faithfully enforcing the wrong interpretation.

This distinction matters during testing.

Technical teams often investigate whether configuration behaves consistently.

Business and data teams need to determine whether the behaviour matches the approved model.

Both questions are necessary.

## The approved model and the configured model are different artefacts

The approved model may contain:

- business entities;
- attributes;
- relationships;
- definitions;
- organisational contexts;
- value lists;
- ownership;
- validation rules;
- workflow principles;
- local variations;
- source and target endpoints;
- decisions.

SAP MDG configuration may implement these through:

- data-model entities and attributes;
- user-interface configuration;
- change-request types;
- validations and derivations;
- workflow routing;
- value help;
- authorisations;
- replication;
- custom logic;
- environment-specific settings.

The relationship is not always one-to-one.

One approved rule may require several technical components.

One configuration object may support several model elements.

For example:

```text
Approved rule:
High-risk suppliers require compliance approval.
```

Its implementation may involve:

```text
Supplier Risk attribute
→ allowed value list
→ validation of required evidence
→ workflow routing condition
→ compliance approval role
→ activation condition
→ outbound replication
```

Checking only the field or only the workflow does not prove that the complete rule has been implemented.

## SAP MDG provides the operational governance layer

SAP currently describes SAP Master Data Governance as a central governance layer that unifies master data, policy and metadata. Its listed capabilities include governed models, preserved semantics and relationships, validated values, collaborative workflow routing, business-rule validation, data-quality monitoring and auditable changes.

Those capabilities make MDG the operational platform in which the approved governance design is executed.

The implementation programme still needs to demonstrate that its particular configuration correctly reflects:

- the selected business meanings;
- contextual rules;
- ownership model;
- migration decisions;
- local requirements;
- downstream dependencies.

The existence of platform capability does not prove the correctness of one implementation.

## Begin with an identifiable model baseline

Validation cannot begin from “the latest design.”

The programme needs a named baseline.

For example:

```text
Business Partner Model Baseline: 1.8
Approved: 6 July 2026
Applicable release: R3
Countries: DE, AT, PT
```

The baseline should state:

- which objects are approved;
- which objects remain proposed;
- which local variations apply;
- which deviations are accepted;
- which release should implement the model.

Without this, different teams may validate against different states.

The configuration team may have implemented baseline 1.7.

Migration may be using 1.8.

Testing may use a design document updated after 1.8 but never formally approved.

Every team can be internally consistent and still disagree.

## Identify the configuration baseline as well

The configured state must also be identifiable.

Useful references may include:

- environment;
- release;
- transport collection;
- configuration export;
- build version;
- deployment date;
- relevant custom-code version.

For example:

```text
Environment:
QAS

Application release:
R3 candidate 2

Transport set:
MDG-R3-2026-07-11

Configuration verification date:
13 July 2026
```

A model-to-configuration comparison without a configuration baseline cannot be reproduced.

The system may change while the review is taking place.

## Build a trace from every critical model object to its implementation

For each critical attribute, rule or relationship, the programme should identify how it is implemented.

A practical trace may look like:

```text
Business attribute
→ MDG entity and attribute
→ UI representation
→ validation or derivation
→ workflow use
→ replication endpoint
→ test evidence
```

Not every attribute needs all of these elements.

The trace should include the elements that determine its operational behaviour.

For example:

```text
Attribute:
Supplier Risk Classification

MDG representation:
Supplier Risk attribute

Value list:
LOW, MEDIUM, HIGH, UNDER_REVIEW

Validation:
Mandatory for active strategic suppliers

Workflow:
HIGH routes to Compliance

Replication:
Included in Supplier outbound message

Test evidence:
TC-SUP-114, TC-SUP-118
```

This lets the reviewer ask whether the configured behaviour implements the whole approved concept.

## Validate existence first

The first comparison is basic:

- Does every approved entity exist?
- Does every approved attribute exist?
- Does every approved relationship exist?
- Does every approved value exist?
- Does every approved rule have an implementation reference?
- Does every required workflow path exist?

This catches missing implementation.

The reverse check is equally important:

- Which configured attributes have no approved model reference?
- Which active rules are absent from the design?
- Which value-list entries were added directly?
- Which workflow conditions do not correspond to an approved decision?

This catches undocumented implementation.

Both directions matter:

```text
Approved but not configured
```

and:

```text
Configured but not approved
```

## Validate business meaning, not only technical names

A configuration object may have the expected name while representing another concept.

For example:

```text
Design:
Supplier Classification
```

Configuration:

```text
Supplier Category
```

These may be equivalent.

They may also differ.

Validation should compare:

- business definition;
- scope;
- owner;
- intended process use;
- context;
- value semantics.

Technical naming similarity is weak evidence.

This is especially important where existing standard fields are reused.

Reusing a field can be sensible, but the programme should prove that its original meaning and technical behaviour fit the approved concept.

## Validate organisational context

Many alignment failures are actually context failures.

An attribute may be approved for:

- central Business Partner data;
- company-code data;
- sales-area data;
- purchasing-organisation data;
- plant data;
- one country;
- one partner role.

The configured field may exist but apply at another level.

For example:

```text
Approved:
Customer classification by sales area.

Configured:
One central Business Partner classification.
```

Both fields may contain valid classifications.

The configured model cannot represent the approved variation.

Context validation should check:

- level at which the value is stored;
- keys determining uniqueness;
- roles to which it applies;
- organisational restrictions;
- local or global scope;
- inheritance or default behaviour.

## Validate optionality and conditional mandatory rules

“Mandatory” is rarely one simple property.

A field may be:

- always mandatory;
- mandatory for one country;
- mandatory for one Business Partner category;
- mandatory for active records;
- mandatory only during one workflow;
- required before activation but not at initial creation;
- optional for historical migration records;
- mandatory after a remediation deadline.

The approved model should state the condition clearly.

The configuration review should test that exact condition.

For example:

```text
Approved rule:
Tax Registration Identifier is mandatory when:
- Country = DE
- Business Partner Category = Organisation
- Role = Customer
- Status = Active
- No approved exemption exists
```

Testing only one successful German customer is insufficient.

The validation set should include:

- positive case;
- each non-applicable context;
- valid exemption;
- invalid format;
- historical record where special treatment applies.

## Validate rule severity

A rule may be correctly implemented but with the wrong severity.

Approved design:

```text
Warning during early migration testing.
Error before production cutover.
```

Configured behaviour:

```text
Error in every environment.
```

This can block testing unnecessarily.

The reverse is more dangerous:

```text
Approved:
Blocking error.

Configured:
Warning.
```

Records then pass despite violating the intended governance control.

For each rule, verify:

- severity;
- environment;
- effective date;
- applicable process;
- exception path;
- message presented to users.

## Validate derivations and precedence

A field can appear correctly configured but receive the wrong value because several derivations interact.

Possible sources include:

- user input;
- source mapping;
- default;
- derivation;
- workflow update;
- replication logic;
- custom code.

The programme should establish precedence.

For example:

```text
1. Approved manually maintained value
2. Country-specific derivation
3. Global derivation
4. Temporary migration default
```

Questions to test include:

- Can a derivation overwrite a steward’s approved value?
- Does a default run when the source value is blank or also when it is invalid?
- Does local logic override global logic?
- Does the same derivation run during migration and operational maintenance?
- Does recalculation change existing records?

A configuration review that checks only whether the derivation exists is incomplete.

## Validate value lists semantically

Compare the approved and configured value lists.

Check:

- value code;
- description;
- status;
- applicability;
- effective dates;
- translations;
- local extensions;
- mapping from old values;
- downstream compatibility.

A configured list can contain all expected codes and still be misaligned if:

- a value is active globally instead of locally;
- two values have lost their distinction;
- an obsolete value remains selectable;
- descriptions imply another meaning;
- interfaces expect another code;
- local values are missing a global reporting mapping.

Value-list alignment is both structural and semantic.

## Validate relationships

For Business Partner and other master-data domains, relationships can be as important as attributes.

The approved model may require:

- parent-child relationships;
- contact-person links;
- customer-supplier relationships;
- organisational assignments;
- ownership relationships.

Configuration validation should check:

- relationship type;
- direction;
- cardinality;
- applicable roles;
- validity dates;
- approval process;
- replication;
- migration treatment.

A relationship may exist technically but be created in the wrong direction or without the context needed by consuming systems.

## Validate workflow against decision rights

A workflow diagram can look correct while routing decisions to the wrong authority.

The review should confirm:

- what starts the workflow;
- which change-request type is used;
- which attributes influence routing;
- which roles participate;
- whether global and local approvals differ;
- what happens after rejection;
- whether substitutions work;
- whether escalation exists;
- whether emergency paths bypass controls.

SAP identifies collaborative routing and notifications as part of its MDG capabilities. The programme must still verify that the configured route reflects the approved ownership model.

For example:

```text
Approved:
Local tax data approved by Country Finance.

Configured:
All tax changes routed to Global Data Steward.
```

The workflow functions.

The governance model does not.

## Validate user-interface behaviour

The data model can be correct while the user interface makes the intended process impossible or misleading.

Check:

- field visibility;
- editability;
- mandatory indication;
- grouping;
- descriptions;
- value help;
- context;
- role-based visibility;
- error messages.

For example:

- the field is mandatory but hidden for the role expected to populate it;
- an optional field is visually marked as required;
- a local attribute appears for every country;
- two values use indistinguishable labels;
- an error message does not explain the valid correction.

UI validation is not cosmetic.

It determines whether users can execute the approved governance process.

## Validate ownership and authorisation

The approved model should define who owns and maintains important data.

Configuration should reflect this through:

- role assignments;
- edit permissions;
- approval permissions;
- visibility;
- segregation of duties;
- emergency access.

Check whether:

- the right role can edit the field;
- the same person can create and approve where this is prohibited;
- local owners can act only in their context;
- global owners can review protected attributes;
- departed users have been removed;
- substitutions preserve decision rights.

A field with the correct rule but the wrong authorisation still implements the wrong operating model.

## Validate replication and downstream representation

An approved attribute may exist and work correctly in MDG but fail to reach consuming systems.

Validation should include:

- activation;
- outbound structure;
- transformation;
- code translation;
- consumer field;
- error handling;
- reconciliation.

For example:

```text
Approved model:
Supplier Risk Classification is globally governed
and consumed by procurement analytics.

Configured:
Field maintained and approved in MDG.

Replication:
Field omitted from outbound interface.
```

The MDG configuration is internally correct.

The implemented enterprise model is incomplete.

SAP distinguishes master-data governance from the integration layer that distributes master data to applications. Both layers need to align with the approved model.

## Validate migration behaviour separately

Operational maintenance and migration may use different paths.

A rule can behave correctly for a new change request and incorrectly during initial loading.

Check:

- migration staging structure;
- load sequence;
- field availability;
- defaulting;
- validation timing;
- bypassed workflow;
- post-load derivations;
- activation;
- reconciliation.

For each critical attribute, compare:

```text
Approved operational treatment
```

with:

```text
Approved migration treatment
```

Differences may be legitimate.

They should be explicit.

For example:

```text
Operational:
Tax identifier required before approval.

Migration:
Inactive historical records may load without the value.

Post-load:
Records remain blocked from operational reactivation until corrected.
```

## Validate global and local behaviour

A global programme should test inheritance and overrides explicitly.

For every local rule, confirm:

- global parent;
- local context;
- precedence;
- approval;
- configuration reference;
- tests.

A country-specific rule should not rely only on a comment such as:

```text
Applies to Portugal.
```

The context should be represented in the configured conditions.

Test at least:

- one applicable local case;
- one non-applicable country;
- interaction with the global rule;
- local exception;
- downstream replication.

## Validate negative cases

Projects naturally focus on the process that should succeed.

Alignment defects often appear in cases that should not apply.

Examples:

- the local rule triggers in another country;
- a person receives an organisation-only requirement;
- a blocked historical record enters the active workflow;
- an obsolete value remains selectable;
- a local approver can approve global data;
- a derivation runs when a manual value exists.

A complete validation pack should include negative cases proving the boundaries of the model.

## Use model-based test generation

The approved model can help generate the minimum required test set.

For a rule containing five conditions, derive cases covering:

- all conditions true;
- each condition false;
- each valid exception;
- boundary values;
- local/global interaction;
- migration versus operational treatment.

This does not automate business acceptance.

It reduces the chance that testing proves only the obvious happy path.

## Compare expected and observed configuration

A useful validation record contains three states:

| Element | Approved model | Configured state | Observed behaviour |
|---|---|---|---|
| Tax ID mandatory | DE organisations only | Condition configured for DE | Also triggers for persons |
| Supplier risk values | LOW, MEDIUM, HIGH | All three configured | HIGH missing in one UI value help |
| Compliance approval | HIGH only | Workflow condition HIGH | Correct in QAS |
| Local exception | Exemption type EX-02 | Rule excludes EX-02 | Correct |

This distinction matters.

Configuration documentation may say one thing.

Observed behaviour may reveal another due to:

- custom code;
- rule precedence;
- authorisation;
- environment differences;
- missing transport;
- derivation side effects.

## Classify alignment findings

Not every difference has the same cause.

Useful categories include:

### Missing implementation

Approved model element is not configured.

### Undocumented configuration

Configured behaviour has no approved model reference.

### Incorrect implementation

Configuration exists but does not match the approved rule.

### Environment divergence

The intended configuration exists in another environment or release.

### Test-evidence gap

Configuration may be correct, but no reliable evidence proves it.

### Model ambiguity

The approved specification is not precise enough to validate.

### Approved deviation

Configuration intentionally differs for a controlled reason.

This classification prevents every finding from becoming a generic configuration defect.

## Approved deviations should remain visible

Sometimes configuration cannot yet match the intended model.

Examples:

- local workflow delayed;
- source data unavailable;
- interface release postponed;
- performance workaround active;
- temporary warning used instead of error.

For each deviation, record:

- approved model state;
- current configured state;
- reason;
- affected environment;
- risk;
- owner;
- expiry or review date;
- required reconciliation.

The validation report should not simply show a pass because the difference was accepted.

It should show:

```text
Pass with approved deviations
```

and list them clearly.

## Validate after transport, not only before it

Configuration can be correct in development and wrong in quality because:

- a transport was incomplete;
- object sequence caused an issue;
- manual settings were missed;
- environment-specific configuration differs;
- custom code version is inconsistent;
- role assignments were not replicated.

The validation should therefore run against the target environment after deployment.

Recommended checkpoints include:

- development completion;
- quality transport;
- formal test-cycle entry;
- pre-production rehearsal;
- production deployment;
- post-go-live verification.

## Revalidate after model changes

Any material model change should trigger targeted configuration validation.

Examples:

- attribute optionality changes;
- value list changes;
- new local context;
- validation severity change;
- workflow ownership change;
- retired field;
- interface dependency.

Impact analysis should identify which configuration evidence and tests become stale.

A test result does not remain valid forever simply because the same technical object still exists.

## Revalidate after configuration changes

The reverse also applies.

An emergency configuration correction may change the model in practice.

After the change, the programme should ask:

- Was the approved model updated?
- Was this only a technical correction?
- Did business behaviour change?
- Which mappings and tests are affected?
- Is a new decision required?
- Did the change create a deviation?

This prevents configuration from becoming the unreviewed source of model truth.

## Use deterministic checks where possible

Some alignment checks can be automated.

Examples include:

- approved object has no configuration reference;
- configuration reference points to a retired model object;
- active rule lacks an owner;
- local rule lacks context;
- approved value missing from configured evidence;
- temporary deviation has expired;
- test evidence refers to an older baseline;
- configuration object exists only in development.

Other checks require human judgement:

- does the configured field preserve business meaning?
- is the workflow authority correct?
- is the derivation acceptable?
- is the error message operationally usable?
- is the local variation justified?

Automation should prepare the comparison, not pretend to replace business validation.

## A worked example: supplier risk classification

The approved model states:

```text
Attribute:
Supplier Risk Classification

Values:
LOW, MEDIUM, HIGH

Rule:
HIGH requires Compliance approval.

Context:
Active suppliers.

Owner:
Global Supplier Risk Owner.
```

The configuration review finds:

### Data model

Attribute exists.

### Value list

LOW, MEDIUM and HIGH exist.

An additional value, `UNDER_REVIEW`, is configured but absent from the approved model.

### Validation

Field is mandatory for all suppliers, including inactive historical records.

The model requires it only for active suppliers.

### Workflow

HIGH routes correctly to Compliance.

`UNDER_REVIEW` follows the normal approval route.

### Migration

Suppliers with missing source data were defaulted to `UNDER_REVIEW`.

### Replication

All four values are sent to a consuming procurement system, which recognises only three.

This is not one defect.

It is a chain of alignment findings:

- undocumented value;
- overbroad mandatory rule;
- undefined workflow treatment;
- migration default;
- interface incompatibility.

Fixing only the interface rejection leaves the model inconsistency in place.

## Another example: local tax validation

The approved model states:

```text
German organisational customers require tax category DE1
unless exemption EX-02 is approved.
```

Configuration verification should check:

- Germany condition;
- organisation category;
- customer role;
- DE1 category;
- EX-02 exemption;
- error severity;
- workflow evidence;
- migration population;
- UI visibility;
- replication.

A single test showing that a German organisation without DE1 receives an error proves only one part.

The validation set should also show:

- a German person is not incorrectly blocked;
- an Austrian organisation is not affected;
- EX-02 works;
- DE1 is available in value help;
- the correct role can maintain it;
- the value reaches the consumer.

## The role of Martenweave

Martenweave provides an independent model baseline against which implementation evidence can be compared.

Its current public description states that it captures structured model knowledge, connects fields, attributes, rules, owners, issues and decisions, validates references, detects gaps and traces impact.

The current core includes:

- canonical Markdown and YAML model files;
- deterministic validation;
- generated SQLite and JSONL indexes;
- search and structured query;
- trace and impact analysis;
- dataset profiling and gap detection;
- ownership, audit and scorecard reports;
- spreadsheet review flows;
- PatchProposal-to-ChangeRequest lifecycle.

For configuration alignment, Martenweave can maintain:

- approved attributes and relationships;
- target endpoints;
- contexts;
- rules;
- value lists;
- owners;
- decisions;
- implementation references;
- test evidence;
- deviations.

It does not inspect every SAP configuration object automatically today.

Its role is to provide the controlled model and evidence structure required for comparison.

SAP MDG remains the operational platform.

## A Martenweave alignment flow

```text
Approved canonical model
        ↓
Generated alignment checklist
        ↓
SAP configuration references and evidence
        ↓
Observed behaviour from tests
        ↓
Difference report
        ↓
Defect, deviation or model clarification
        ↓
PatchProposal or implementation task
        ↓
Verification
        ↓
New approved baseline
```

This turns alignment into a repeatable process rather than a one-time design review.

## Use AI to assist comparison, not declare alignment

AI can help by:

- extracting configuration descriptions;
- matching technical objects to model attributes;
- comparing design documents with test evidence;
- identifying possible missing implementations;
- summarising differences;
- drafting defects or PatchProposals;
- proposing test scenarios.

AI should not independently certify that configuration matches the model.

Possible failure modes include:

- matching similar but different fields;
- using obsolete documentation;
- missing hidden configuration precedence;
- treating one successful test as complete proof;
- confusing a local rule with a global one.

A safe process is:

```text
AI prepares candidate comparison
→ deterministic checks validate references
→ technical team confirms configuration
→ business owner confirms intended behaviour
→ evidence is approved
```

## A minimum alignment pack

For a bounded domain, we would expect:

1. Approved model baseline.
2. Configuration baseline.
3. Model-to-configuration matrix.
4. Critical rule catalogue.
5. Value-list comparison.
6. Workflow-routing comparison.
7. Role and authorisation evidence.
8. Migration-treatment comparison.
9. Replication verification.
10. Positive and negative test evidence.
11. Open deviations.
12. Alignment sign-off by responsible roles.

The pack should be generated and maintained from structured objects where possible.

It should not become another disconnected spreadsheet manually recreated before every milestone.

## A practical model-to-configuration matrix

For each critical object, record:

| Model object | Approved state | Configuration evidence | Observed result | Status |
|---|---|---|---|---|
| ATTR-SUP-RISK | Active supplier attribute | Entity/attribute reference | Visible and editable | Aligned |
| VLIST-SUP-RISK | LOW/MEDIUM/HIGH | Config reference | Extra value present | Divergent |
| RULE-SUP-RISK-REQ | Mandatory for active suppliers | Validation reference | Applies to inactive records | Divergent |
| WF-SUP-HIGH | Compliance approval | Workflow reference | Correct | Aligned |
| MAP-SUP-RISK | Source-specific mapping | Migration reference | ERP_B uses default | Approved deviation |

This view supports both technical review and management reporting.

## Sign-off should be distributed

One architect should not sign off every aspect.

Possible responsibilities include:

### Business owner

Confirms meaning, scope and acceptable exceptions.

### Data architect

Confirms model coherence and context.

### SAP MDG architect

Confirms technical implementation.

### Migration lead

Confirms migration treatment.

### Integration owner

Confirms replication and consumers.

### Security owner

Confirms access and decision rights.

### Test lead

Confirms evidence and regression scope.

### AMS lead

Confirms operational understandability.

A combined alignment decision is stronger than a generic “solution accepted” status.

## What managers should ask

1. Which approved model baseline are we validating?
2. Which exact environment and release are being compared?
3. Which approved objects are not configured?
4. Which configured objects lack approval?
5. Do mandatory rules apply in the correct contexts?
6. Are value lists semantically and technically aligned?
7. Do workflow routes reflect the approved decision rights?
8. Can expected users see and maintain the required fields?
9. Are migration and operational behaviours intentionally different?
10. Are fields replicated to all required consumers?
11. Have negative and boundary cases been tested?
12. Which deviations remain open?
13. Who owns each reconciliation?
14. Will this validation be repeated after the next transport or model change?

If the programme cannot answer the first two questions precisely, the remaining evidence is difficult to trust.

## Common mistakes

### Validating only that configuration exists

Existence does not prove correct meaning or behaviour.

### Using the design document without a baseline

Reviewers may compare against different versions.

### Testing only happy paths

Context and precedence failures often appear in negative cases.

### Ignoring migration behaviour

Initial load and operational maintenance may use different controls.

### Ignoring replication

A field can work in MDG and still fail in the enterprise process.

### Treating every difference as a defect

Some are approved deviations or model ambiguities.

### Accepting screenshots as complete evidence

Screenshots show selected states but rarely prove conditions and relationships.

### Checking development but not quality or production

Transport and environment differences are common sources of divergence.

### Letting configuration silently redefine the model

Material behaviour changes require model reconciliation.

### Asking AI to certify alignment

AI can prepare the comparison, but responsible owners must confirm meaning and evidence.

## When a lightweight approach is enough

A small implementation may validate alignment through:

- one controlled model workbook;
- one configuration matrix;
- targeted tests;
- named sign-off.

This may be sufficient when:

- one domain is involved;
- few attributes are critical;
- local variation is limited;
- integrations are simple;
- the same team owns design and build.

A registry-based approach becomes more useful when:

- many countries are involved;
- the model changes frequently;
- configuration and migration move at different speeds;
- several partners maintain different artefacts;
- impact analysis is manual;
- handover is complex;
- AI agents consume the model.

## Our conclusion

Validating SAP MDG configuration is not the same as confirming that transports succeeded or that technical tests passed.

The real question is whether configured behaviour implements the approved business model.

That requires comparing:

- entities;
- attributes;
- contexts;
- value lists;
- rules;
- workflows;
- ownership;
- migration behaviour;
- replication;
- observed test results.

The comparison must work in both directions:

```text
Approved but not configured
```

and:

```text
Configured but not approved
```

The practical test is:

> Can the programme take any critical model object and prove how the approved meaning, rule and ownership are represented in the tested SAP MDG environment?

When the answer is yes, the configuration is traceable to the model.

When the answer is based only on successful transports, screenshots and isolated test cases, the programme has evidence that the system works—but not yet that it implements the right model.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We build practical model-governance infrastructure for SAP migration, MDG, MDM and AMS teams. Martenweave provides the independent model baseline, relationships and change evidence needed to compare intended governance with actual implementation behaviour.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer that unifies master data, policy and metadata and supports governed models, preserved semantics, validated values, collaborative workflows, monitored business rules and auditable data changes.

SAP also distinguishes master-data governance from master-data integration, which distributes data to consuming applications in its current state.

Martenweave’s current public documentation describes structured model objects, deterministic validation, generated indexes, dataset gap detection, trace and impact analysis, spreadsheet review flows and controlled PatchProposal and ChangeRequest lifecycles.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
