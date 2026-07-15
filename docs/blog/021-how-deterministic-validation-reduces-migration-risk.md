# How Deterministic Validation Reduces Migration Risk

**Reviewed: 14 July 2026**

The migration workbook looks complete.

Every critical target field has a source. Owners are assigned. Transformation rules are documented. The latest file has passed business review.

Then the model is loaded into the migration process.

One mapping refers to a target field that was retired two releases ago. A value mapping uses an obsolete code list. A country-specific rule points to a global context. Two attributes have the same identifier. One source endpoint was renamed, but only half of its references were updated.

None of these problems is conceptually difficult.

They are still enough to invalidate test results, create avoidable defects and send several teams back into manual reconciliation.

An architect eventually finds the errors.

The expensive part is not correcting them. The expensive part is discovering them after mappings, configuration and tests have already started depending on them.

This is where deterministic validation creates practical value.

It checks the parts of the model that should not require human interpretation:

- Does the referenced object exist?
- Is the identifier unique?
- Is the relationship allowed?
- Is the required context present?
- Does the mapping have valid endpoints?
- Is an active object referring to something already retired?
- Does the model conform to its declared structure?

The same input produces the same result every time.

There is no confidence score. No semantic guess. No “probably correct.”

A rule either passes or fails.

> Deterministic validation reduces migration risk by preventing structurally invalid model knowledge from moving deeper into delivery.

It does not prove that the business model is correct.

It removes avoidable inconsistency so human experts can focus on the decisions that actually require judgement.

## The defect that validation finds is usually cheap

Consider a mapping that references:

```text id="det-val-01"
FEP-SAP-BP-TAX-NUMBER
```

The approved endpoint is now:

```text id="det-val-02"
FEP-SAP-BP-TAX-NUMBER-DE
```

The old identifier was retired after the programme separated a global field into country-specific tax contexts.

If a validator detects this immediately, the correction may take minutes.

If it reaches migration testing, the programme may spend time on:

- analysing rejected records;
- checking extraction logic;
- reviewing SAP configuration;
- discussing business requirements;
- comparing workbook versions;
- rerunning transformations;
- retesting the load.

A broken reference is a small defect with a large investigation radius.

Deterministic checks reduce that radius.

## Migration risk starts before data is loaded

Migration risk is often discussed in terms of bad records:

- missing values;
- invalid formats;
- duplicates;
- broken relationships;
- incorrect transformations.

There is another layer of risk: defects in the model describing how migration should work.

Examples include:

- a mapping points to the wrong endpoint;
- a target field has no source treatment;
- two objects use the same identity;
- a rule references a missing attribute;
- a local exception lacks a context;
- a value mapping points to a retired list;
- an approved object depends on a draft object;
- a dataset profile refers to an older model version;
- ownership is missing for a critical rule.

The records may be clean.

The model used to interpret them is not.

If that model is fragmented between spreadsheets, tickets and documents, these inconsistencies are difficult to check systematically.

The programme waits until implementation behaviour exposes them.

## What deterministic means

A deterministic validator applies explicit rules to structured input.

For the same model state and validation version, it produces the same findings.

For example:

```text id="det-val-03"
Rule:
Every Mapping must reference
one existing source FieldEndpoint
and one existing target FieldEndpoint.
```

If a referenced endpoint does not exist, validation fails.

The validator does not ask:

- whether the mapping looks reasonable;
- whether a similarly named endpoint might have been intended;
- whether the missing object can be inferred;
- whether the programme probably wants to continue.

It reports the inconsistency.

A separate proposal process may suggest a correction. The approved model should not silently repair itself through inference.

## Deterministic validation and business validation are different

The word “validation” is used for several activities.

It helps to separate them.

## Structural validation

Checks whether the model is internally well formed.

Examples:

- unique identifiers;
- required properties;
- valid references;
- valid object types;
- allowed relationships;
- lifecycle consistency.

This is the core deterministic layer discussed in this article.

## Data validation

Checks whether a dataset meets explicit expectations.

Examples:

- required columns;
- data types;
- completeness thresholds;
- allowed values;
- key uniqueness;
- reference integrity.

Much of this can also be deterministic.

## Business validation

Checks whether the represented rule or decision is correct for the organisation.

Examples:

- Is Customer Group the correct target concept?
- Is the default acceptable?
- Should the rule be global?
- Does the source preserve the intended meaning?
- Is the exception legally valid?

This requires responsible human judgement.

## Operational validation

Checks records during creation, change, approval or migration execution.

SAP currently describes SAP Master Data Governance as supporting validated values, centrally defined and monitored business rules, workflow-based governance, quality monitoring and auditable data changes.

That is the operational environment into which the migrated model and data must fit.

These forms of validation complement each other.

A structurally valid mapping can still be a bad business mapping.

A business-approved mapping can still contain a broken technical reference.

A record can pass migration checks and fail an MDG rule.

The controls should not be collapsed into one status.

## The first validation layer: object identity

Every model object needs a stable identity.

Examples include:

```text id="det-val-04"
ATTR-CUSTOMER-GROUP
FEP-CRM-CUSTOMER-SEGMENT
FEP-SAP-KNVV-KDGRP
MAP-CUSTOMER-GROUP-0042
RULE-CUSTOMER-GROUP-MANDATORY-DE
```

A deterministic validator can check:

- Is every identifier unique?
- Does it follow the expected format?
- Is the object type consistent with the identifier?
- Has the identifier already been retired?
- Are aliases accidentally being used as identities?
- Is the object defined more than once?

Duplicate identities create serious ambiguity.

Suppose two mappings use `MAP-CUSTOMER-0042`.

Search, impact analysis and change history may combine unrelated objects.

The individual mapping rows may look correct. The registry can no longer distinguish them reliably.

This is the type of problem that should never reach architectural review.

## The second layer: reference integrity

Structured model objects refer to one another.

A mapping may reference:

- business attribute;
- source endpoint;
- target endpoint;
- context;
- transformation;
- owner;
- decision.

A rule may reference:

- attribute;
- entity;
- context;
- value list;
- severity;
- owner.

A validator can confirm that every declared reference resolves to a real object.

For example:

```yaml id="det-val-05"
id: MAP-CUSTOMER-GROUP-0042
attribute: ATTR-CUSTOMER-GROUP
source: FEP-CRM-CUSTOMER-SEGMENT
target: FEP-SAP-KNVV-KDGRP
context: CTX-SALES-AREA
```

Validation should fail if:

- `ATTR-CUSTOMER-GROUP` does not exist;
- the source endpoint was retired;
- the target identifier contains a typo;
- `CTX-SALES-AREA` is defined as another object type;
- the mapping points to itself through an invalid relationship.

This is referential integrity applied to implementation knowledge.

## The third layer: object-schema validation

Different object types require different properties.

A mapping may require:

- source;
- target;
- attribute;
- status.

A decision may require:

- issue;
- selected option;
- rationale;
- approver.

A dataset may require:

- source;
- extraction date;
- structure;
- scope.

A validator can check:

- required fields are present;
- values use allowed types;
- statuses come from controlled sets;
- lists contain valid entries;
- dates use expected formats;
- cardinality rules are respected.

For example, an active critical rule should not be accepted with:

```text id="det-val-06"
owner: null
```

The validator is not deciding who the owner should be.

It is enforcing that the organisation must name one before treating the rule as operationally ready.

## The fourth layer: relationship semantics

A reference may exist and still represent an invalid relationship.

For example:

- a source endpoint may not map to another source endpoint as a target;
- a value mapping should belong to a value list;
- a validation rule should reference an attribute or entity;
- a test-evidence object should reference a testable rule or mapping;
- a local override should identify its parent global object.

A deterministic relationship rule can state:

```text id="det-val-07"
Mapping.source must reference FieldEndpoint(role=source).
Mapping.target must reference FieldEndpoint(role=target).
```

This catches a class of errors that simple existence checks miss.

The endpoint exists.

It is being used incorrectly.

## The fifth layer: lifecycle consistency

Model objects move through states.

A simple lifecycle may include:

```text id="det-val-08"
draft
→ proposed
→ approved
→ active
→ deprecated
→ retired
```

Deterministic rules can prevent inconsistent dependencies.

Examples:

- an approved mapping references a draft target;
- an active rule refers to a retired attribute;
- a test claims to validate a mapping that did not yet exist;
- a production baseline includes an unapproved value list;
- a retired object remains required by an active context.

Lifecycle validation is important because old objects often remain in repositories for historical traceability.

Retired does not mean deleted.

The validator needs to distinguish valid historical reference from invalid active dependency.

## The sixth layer: context validation

Many SAP migration defects are caused by incorrect context rather than incorrect fields.

A target attribute may apply by:

- company code;
- sales area;
- purchasing organisation;
- plant;
- country;
- partner role.

A deterministic validator can check whether context is present and structurally compatible.

For example:

```text id="det-val-09"
Target:
Customer Group

Expected context:
Sales Area

Mapping context:
Global
```

The validator may not know whether the business wants to copy the global value into every sales area.

It can still flag that the mapping and target context differ and require an explicit treatment.

This changes an implicit assumption into a visible review item.

## The seventh layer: value-list integrity

Value mappings create their own structural risks.

A validator can check:

- source values are unique within the applicable context;
- target values exist in the active target list;
- inactive values are not introduced as new targets;
- required mappings have a treatment;
- defaults refer to valid values;
- context-specific mappings identify their context;
- effective dates do not conflict.

Suppose a value mapping states:

```text id="det-val-10"
LEGACY_CODE_A → TARGET_09
```

But `TARGET_09` was removed from the current target value list.

The mapping can appear complete in Excel.

It is structurally invalid against the approved model.

A deterministic check can find this before a load or interface rejects the value.

## The eighth layer: model completeness rules

Some requirements are not universal, but the programme can encode them as policy.

Examples:

- every critical attribute must have an owner;
- every required target field must have a source treatment;
- every active mapping must have an approved transformation;
- every mandatory rule must have test evidence;
- every temporary default must have an expiry or review date;
- every local override must reference a global object;
- every accepted gap must have an owner;
- every production object must belong to an approved baseline.

These are deterministic policy checks.

They do not prove that the model is good.

They prevent the programme from declaring it ready while required governance elements are missing.

## Why spreadsheets make these checks difficult

Excel can implement many validations through:

- formulas;
- data validation;
- lookups;
- macros;
- Power Query;
- conditional formatting.

A disciplined workbook can be highly controlled.

The difficulty appears when model knowledge spans several files and object types.

For example:

- mappings in one workbook;
- value lists in another;
- rules in Confluence;
- ownership in Jira;
- endpoints in a technical specification;
- current datasets in shared folders.

A formula cannot reliably enforce reference integrity across uncontrolled copies.

Even within one workbook, several challenges remain:

- row identity changes;
- local copies diverge;
- formulas are overwritten;
- hidden columns carry control logic;
- validation ranges become outdated;
- copied tabs retain old references;
- reviewers receive values rather than formulas.

The issue is not that spreadsheets cannot validate.

The issue is maintaining a deterministic control system across distributed model knowledge.

## Validation before indexing

Martenweave’s architecture treats canonical files as the source of model truth and generated indexes as derived artefacts.

The validation sequence should be:

```text id="det-val-11"
Canonical model files
        ↓
Schema and reference validation
        ↓
Policy validation
        ↓
Index generation
        ↓
Search, lineage, impact and reports
```

This order matters.

If invalid objects enter the generated index, every downstream function may produce misleading results.

For example:

- search may return duplicate objects;
- lineage may stop at missing references;
- impact analysis may omit dependencies;
- ownership reports may show false gaps;
- AI context may include conflicting definitions.

The Martenweave core currently documents canonical Markdown and YAML files, deterministic validation, generated SQLite and JSONL indexes, search, structured queries, trace, impact analysis, dataset profiling and gap detection as existing capabilities.

Validation protects the boundary between authoritative model content and derived use.

## Validation before AI

Deterministic validation also improves AI-assisted work.

Without validation, an AI agent may receive:

- duplicate objects;
- unresolved references;
- outdated endpoints;
- conflicting status;
- orphaned rules.

It may attempt to explain or repair these inconsistencies through inference.

The output can look coherent while building on a corrupted model.

A safer sequence is:

```text id="det-val-12"
Validate current model
        ↓
Expose known gaps
        ↓
Give validated context to AI
        ↓
AI creates PatchProposal
        ↓
Validate proposed model state
        ↓
Human review
```

This does not prevent the AI from working with incomplete evidence.

It ensures that structural incompleteness is explicit rather than silently interpreted.

## Validation of the current state and the proposed state

A model change should be tested twice.

### Current-state validation

Confirms whether the baseline is already consistent.

### Proposed-state validation

Applies the candidate patch in isolation and checks the resulting model.

This distinction matters.

Suppose the existing model already contains three unrelated errors.

An AI or human proposes one valid mapping change.

The review should show:

- pre-existing failures;
- new failures introduced by the proposal;
- failures resolved by the proposal.

Otherwise, reviewers may incorrectly attribute existing problems to the new change—or approve a proposal that adds another failure to an already invalid model.

## Dataset validation should use the model as expectation

The model can also drive deterministic checks against migration datasets.

For example, the model states:

```text id="det-val-13"
Expected source column:
CUSTOMER_TYPE

Required for:
Active B2B customers from CRM_A

Allowed blank rate:
0%

Expected value mapping:
VLIST-CUSTOMER-TYPE-CRM-A
```

A dataset validator can check:

- column presence;
- data type;
- applicable population;
- blank values;
- observed codes;
- mapping coverage.

The findings become linked to the relevant model object.

This is stronger than a generic data-quality profile because it explains why a particular condition matters.

## Structural gap versus business gap

Deterministic findings should be classified clearly.

### Structural failure

Example:

> Mapping references target endpoint `FEP-SAP-CUSTOMER-GRP`, which does not exist.

This is an objective inconsistency.

### Policy failure

Example:

> Critical attribute `ATTR-CUSTOMER-GROUP` has no owner.

The organisation has chosen to require ownership.

### Dataset failure

Example:

> Required column `CUSTOMER_TYPE` is missing from dataset version 2026-07-10.

The dataset does not meet the declared expectation.

### Business review required

Example:

> Source context is global; target context is sales area.

The mismatch is detected deterministically. The correct treatment requires judgement.

The validator should not pretend that every finding has an automatic correction.

## Severity should be rule-based

Validation output becomes noisy when every finding has the same importance.

We recommend explicit severity levels.

### Error

The model cannot be considered structurally valid.

Examples:

- duplicate identifier;
- missing required reference;
- invalid object relationship;
- active mapping references retired endpoint.

### Blocker

The model may be structurally valid, but migration cannot proceed safely under programme policy.

Examples:

- mandatory target has no source treatment;
- critical value mapping has uncovered observed values;
- required key is missing from the dataset.

### Warning

The model may be acceptable, but review is required.

Examples:

- missing optional description;
- no test evidence for a low-risk mapping;
- global-to-local context transformation not yet documented.

### Information

Useful observation with no immediate action requirement.

Examples:

- object has not changed since the previous baseline;
- local mapping duplicates a global rule;
- dataset contains unused optional columns.

Severity should be encoded in the rule or policy.

AI may help explain a finding. It should not decide silently that an error is unimportant.

## Validation needs actionable messages

A finding should tell the team:

- what failed;
- where;
- why it matters;
- which object is affected;
- what type of action is expected.

Poor message:

> Invalid reference.

Better message:

```text id="det-val-14"
ERROR MW-REF-002

Mapping:
MAP-CUSTOMER-GROUP-0042

Field:
target

Referenced object:
FEP-SAP-CUSTOMER-GRP

Problem:
The target FieldEndpoint does not exist in model baseline 1.7.

Suggested action:
Select an active target endpoint or create a reviewed proposal
for the missing endpoint.
```

Actionable validation reduces the temptation to bypass the control.

## Validation should run continuously

Validation is most valuable when it runs at several points.

### During local editing

Fast checks catch mistakes immediately.

### During spreadsheet import

Imported changes are validated before becoming proposals.

### During proposal creation

Candidate patches are checked in isolation.

### During pull-request or change review

The complete proposed state is validated.

### Before index generation

Only valid baselines become searchable operational context.

### Before a migration milestone

The model and current datasets are rechecked together.

### During AMS change

Post-go-live changes follow the same control.

Validation should not be a one-time gate immediately before cutover.

Its value comes from shortening the distance between introducing and detecting an inconsistency.

## A worked example: renamed target endpoint

The target team replaces one SAP endpoint with a more precise contextual endpoint.

Old object:

```text id="det-val-15"
FEP-SAP-BP-TAX-ID
```

New objects:

```text id="det-val-16"
FEP-SAP-BP-TAX-ID-DE
FEP-SAP-BP-TAX-ID-PT
```

The model update retires the old endpoint.

Several mappings are updated.

One country workbook is not.

### Without deterministic validation

The outdated mapping remains marked approved.

The next migration load fails or populates the wrong structure.

The team investigates the source data, transformation and SAP configuration.

### With deterministic validation

The active mapping referencing the retired endpoint fails immediately.

The impact report identifies:

- mapping;
- country context;
- affected dataset;
- related rule;
- owner.

The business question remains:

> Which new endpoint should this mapping use?

The structural error is already isolated.

## Another example: duplicate mapping identity

Two local teams independently create:

```text id="det-val-17"
MAP-SUPPLIER-PAYMENT-001
```

The mappings have different sources and country contexts.

### Without validation

Search and reports may combine them.

An issue or test referring to the identifier becomes ambiguous.

### With validation

The baseline cannot be approved until each object has a unique identity.

The validator does not decide the naming convention.

It prevents ambiguity from becoming part of the model.

## Another example: incomplete value mapping

The approved target value list contains:

```text id="det-val-18"
LOW
MEDIUM
HIGH
```

The source dataset contains:

```text id="det-val-19"
L
M
H
STRATEGIC
UNKNOWN
```

Mappings exist for `L`, `M` and `H`.

A deterministic dataset check reports:

- 96.4% of records covered;
- `STRATEGIC`: 2.1%;
- `UNKNOWN`: 1.5%;
- no approved treatment for either value.

The validator should not map `STRATEGIC` to `HIGH` because the words appear related.

It converts hidden incompleteness into a visible decision.

## Validation and SAP MDG

Deterministic validation in Martenweave should not attempt to replace operational SAP MDG validation.

SAP MDG currently provides capabilities for enforcing validated values, defining and monitoring business rules, routing collaborative workflows and auditing changes to governed data.

The responsibilities differ.

### Martenweave validates

- model-file structure;
- object identity;
- references;
- relationships;
- lifecycle state;
- mapping completeness;
- dataset expectations;
- proposal consistency.

### SAP MDG validates

- operational master-data records;
- configured business rules;
- workflow conditions;
- governed values;
- activation behaviour.

A migration-ready design should align both layers.

For example:

```text id="det-val-20"
Martenweave:
Rule object exists, has owner, context and test reference.

SAP MDG:
Rule is configured and rejects invalid operational data.

Testing:
Implemented behaviour matches the approved rule.
```

Each layer provides different evidence.

## Deterministic validation improves reviews

Without automated checks, expert reviews are consumed by clerical errors.

Architects spend time finding:

- typos;
- missing references;
- duplicated entries;
- inconsistent status;
- absent ownership.

These are important problems.

They do not require the most expensive people in the programme.

Automated validation changes the review conversation.

Instead of:

> This mapping points to a field that does not exist.

the architect can focus on:

> Is this the correct business attribute and context?

Instead of:

> This rule has no owner.

the reviewer can focus on:

> Is the named owner the right authority?

Automation does not remove expert review.

It raises the level at which expert time is used.

## Deterministic validation creates reproducible evidence

A migration-readiness statement should be reproducible.

If the programme claims:

> Model baseline 1.7 passed validation.

another team should be able to run the same validation against the same baseline and obtain the same result.

Record:

- model version or commit;
- validator version;
- ruleset;
- execution time;
- findings;
- accepted exceptions.

This creates better auditability than an informal statement that an architect reviewed the workbook.

Human approval remains necessary.

The deterministic evidence shows what was checked consistently.

## Accepted exceptions should not disappear

A programme may choose to proceed with a known validation failure.

For example:

- a source endpoint will be delivered before cutover;
- a local mapping is awaiting final owner confirmation;
- one low-risk test is deferred;
- an inactive value remains in historical data.

This can be reasonable.

The exception should be explicit.

Record:

- failed rule;
- affected objects;
- reason;
- approving authority;
- risk;
- expiry or review date;
- required follow-up.

The validator should continue reporting the finding as accepted or waived, not silently stop checking it.

Otherwise, temporary exceptions become invisible permanent gaps.

## The risk of too many rules

A deterministic system can become rigid and noisy.

Possible failure modes include:

- validating optional details as blockers;
- enforcing one project’s conventions globally;
- creating hundreds of low-value warnings;
- making legitimate local variation difficult;
- rejecting proposals before enough information exists;
- coupling model structure too tightly to one SAP implementation.

Validation rules should be layered.

### Core structural rules

Apply to every model.

Examples:

- unique IDs;
- valid references;
- correct object types.

### Domain rules

Apply to a domain such as Business Partner or Product.

### Programme policy

Applies to a specific implementation.

Examples:

- every critical attribute requires an owner;
- every mandatory field requires test evidence.

### Milestone rules

Apply only at a delivery stage.

A draft model may allow missing ownership.

A cutover baseline may not.

This prevents early design exploration from being blocked by production-readiness standards.

## Validation rules themselves need governance

A validator is not neutral merely because it is deterministic.

Someone chooses the rules.

For every significant validation rule, the team should understand:

- purpose;
- scope;
- severity;
- owner;
- version;
- exceptions;
- examples;
- expected remediation.

A bad deterministic rule will produce the same bad result reliably.

That is better than unpredictability, but not sufficient.

Validation-policy changes should follow review, especially when they alter readiness or approval outcomes.

## AI can explain validation but should not override it

AI is useful for turning technical findings into practical guidance.

For example, it can:

- summarise related failures;
- suggest likely missing objects;
- explain affected business areas;
- draft issues;
- propose model patches;
- identify similar valid examples.

It should not decide that a deterministic failure can be ignored.

A safe interaction is:

```text id="det-val-21"
Validator:
Mapping target does not exist.

AI:
The missing target may be the recently introduced
FEP-SAP-BP-TAX-ID-DE endpoint. Three related mappings
were updated to it. This proposal requires architect review.
```

The AI accelerates diagnosis.

The validator remains authoritative about structural state.

## What Martenweave currently provides

Martenweave’s public documentation describes a model-control layer that captures knowledge as structured objects, connects fields, attributes, rules, owners, issues and decisions, validates references before indexing, detects dataset and model gaps, traces impact and routes AI-generated changes through reviewable PatchProposals.

The current core includes:

- canonical Markdown and YAML model files;
- deterministic validation;
- generated SQLite and JSONL indexes;
- search and structured query;
- trace and impact analysis;
- dataset profiling and gap detection;
- health, ownership, audit and scorecard reports;
- CSV and XLSX review flows;
- PatchProposal-to-ChangeRequest lifecycle;
- issue drafts and GitHub-ready change bundles.

The architectural sequence is deliberate:

```text id="det-val-22"
Canonical files
→ deterministic validation
→ generated indexes
→ analysis and reports
→ reviewable proposals
→ human-approved change
```

Generated views can be rebuilt.

Canonical model truth remains protected.

## A minimum validation set for an SAP migration model

A practical first implementation does not need hundreds of rules.

We would begin with:

### Identity

- IDs are unique.
- IDs match object type conventions.

### References

- every referenced object exists;
- active objects do not depend on retired objects.

### Mappings

- source and target endpoints exist;
- endpoint roles are correct;
- business attribute is identified;
- context is explicit where required.

### Ownership

- critical objects have owners;
- accepted gaps have owners.

### Values

- target values exist in active value lists;
- observed critical source values have an approved treatment.

### Datasets

- required columns exist;
- keys are available;
- dataset scope and version are recorded.

### Change control

- approved objects do not depend on draft proposals;
- temporary defaults have review dates;
- model updates are linked to approved change requests.

### Testing

- critical mandatory rules have test references before readiness approval.

This small ruleset can remove a substantial amount of avoidable delivery noise.

## A practical validation report

A useful report should summarise:

### Baseline

- model version;
- validator version;
- date;
- scope.

### Result

- pass;
- pass with accepted exceptions;
- fail.

### Findings by severity

- errors;
- blockers;
- warnings;
- information.

### Findings by domain

- Business Partner;
- Customer;
- Supplier;
- Product.

### Affected objects

Stable identifiers and readable names.

### New and resolved findings

Differences from the previous baseline.

### Accepted exceptions

Owner and review date.

### Recommended actions

Direct, bounded remediation steps.

The report should be readable by both architects and delivery managers.

## What managers should ask

Managers do not need to review every validation rule.

They should ask:

1. Which model baseline was validated?
2. Which ruleset and validator version were used?
3. Are any duplicate or unresolved identities present?
4. Do all active mappings have valid source and target endpoints?
5. Do mandatory targets have a source or approved treatment?
6. Are current dataset values covered by approved value mappings?
7. Do active rules have owners and contexts?
8. Are any active objects dependent on retired objects?
9. Which failures are being accepted?
10. Who approved the exceptions?
11. When will temporary waivers be reviewed?
12. Does the same validation run before indexing and before model approval?
13. Are business decisions still reviewed by accountable people?

A clean validation report is not proof that migration is ready.

An invalid model is strong evidence that it is not.

## Common mistakes

### Treating validation as a final gate

Run it continuously so defects are found near the moment they are introduced.

### Confusing structural correctness with business correctness

A passing model can still represent the wrong decision.

### Allowing the validator to auto-repair canonical objects

Suggested repairs should become proposals.

### Using names instead of stable identifiers

Names are ambiguous and change over time.

### Reporting hundreds of unactionable warnings

Rules need severity, ownership and practical messages.

### Hard-coding one project’s policy into the core schema

Separate universal structure from programme-specific readiness rules.

### Suppressing accepted exceptions

Continue reporting them with owner and expiry.

### Giving AI authority to override deterministic failures

AI can explain or propose a correction, not redefine whether the rule passed.

### Validating the model but not the current dataset

Both specification and data need checks.

### Rebuilding indexes from invalid content

Derived analysis should come only from a known model state.

## When validation may be simpler

A small migration may need only:

- a controlled workbook;
- unique row IDs;
- reference lookups;
- required-column checks;
- a small profiling script;
- version control.

That may be enough when:

- one source exists;
- the model is stable;
- transformations are simple;
- the team is small;
- local variation is limited.

The principle matters more than the platform.

The need for a registry-grade validator grows with:

- number of model objects;
- number of sources;
- number of countries;
- number of workstreams;
- frequency of change;
- use of AI agents;
- cost of incorrect impact analysis;
- handover duration.

## Our conclusion

Deterministic validation does not solve migration architecture.

It does something more modest and highly valuable.

It prevents the programme from building architecture on top of structurally inconsistent model knowledge.

It catches:

- duplicate identities;
- missing references;
- invalid relationships;
- lifecycle conflicts;
- unsupported values;
- missing ownership;
- dataset-to-model mismatches.

These are rarely the hardest migration questions.

They are common, expensive when found late and suitable for automation.

The correct division of work is:

```text id="det-val-23"
Machines check what can be expressed as stable rules.

Architects review meaning, context and trade-offs.

Business owners approve policy and risk.

SAP and migration systems enforce the approved operational behaviour.
```

A deterministic validator should not tell the organisation which customer classification is correct.

It should ensure that the approved classification does not point to a missing field, obsolete list or invalid context.

That distinction is the source of its value.

The best migration teams do not use expert judgement to compensate for broken structure.

They validate the structure first, then use judgement where judgement is actually required.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We build practical model-governance infrastructure for SAP migration, MDG, MDM and AMS teams. Martenweave uses deterministic validation to protect canonical model knowledge before it becomes search context, impact analysis, AI input or implementation guidance.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as supporting governed models, validated values, centrally defined and monitored business rules, collaborative workflows, data-quality monitoring and auditable changes. SAP also recommends curating clean and correct master data well before an SAP S/4HANA implementation.

Martenweave’s current public documentation states that the product captures structured model objects, connects fields, attributes, rules, owners, issues and decisions, validates references before indexing, detects model and dataset gaps and supports reviewable PatchProposals.

The current core includes canonical Markdown and YAML model files, deterministic validation, generated SQLite and JSONL indexes, search, trace and impact analysis, dataset profiling, reports and a PatchProposal-to-ChangeRequest lifecycle.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.

