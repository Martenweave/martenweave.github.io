# How to Retire SAP AMS Workarounds Without Breaking the Business Process

**Reviewed: 14 July 2026**

A temporary Supplier Risk workaround has been running for nine months.

When the legacy source cannot provide a final risk classification, AMS enters `STANDARD` in SAP so that the supplier can continue through onboarding. The real state is maintained in a spreadsheet:

- pending assessment;
- waiting for evidence;
- approved temporarily;
- ready for correction.

The source-system enhancement is finally delivered.

Management gives a simple instruction:

> Remove the workaround.

The AMS team disables the support procedure and stops accepting new spreadsheet entries.

Within two days:

- urgent suppliers are blocked because the new source feed does not cover every category;
- reporting changes because historical `STANDARD` values are still indistinguishable from genuine classifications;
- one interface sends blank values after its old conversion logic is removed;
- several spreadsheet records have no corresponding SAP identifier;
- local users continue applying the workaround from an old knowledge article;
- previously approved temporary suppliers cannot be identified reliably.

The workaround has been stopped.

The dependency has not been retired.

This distinction matters.

> Retiring a workaround is not the act of turning it off. It is the controlled migration of records, processes, decisions and dependencies back to an approved model.

A workaround that has existed long enough may be embedded in:

- data;
- SAP configuration;
- integrations;
- reports;
- operational procedures;
- service requests;
- knowledge articles;
- local spreadsheets;
- user behaviour.

Removing only the visible mechanism can break the business process while leaving the semantic damage behind.

The retirement process therefore needs two outcomes:

1. the business can continue operating under an approved target state;
2. the workaround no longer defines or modifies model meaning anywhere in the landscape.

---

# Do not begin with removal

The first step should not be:

> Disable the workaround.

The first step should be:

> Define what will replace every function currently performed by the workaround.

A workaround may be performing several functions simultaneously.

For example, the Supplier Risk workaround may:

- allow records to progress;
- signal that assessment is incomplete;
- identify records needing follow-up;
- provide a value required by an interface;
- prevent a report from counting incomplete suppliers;
- give AMS a repeatable operational procedure.

If the new source feed replaces only the missing value, it may not replace:

- the pending lifecycle;
- the review queue;
- the exception approval;
- the reporting distinction;
- the operational ownership.

A retirement plan that treats the workaround as one mechanism will miss these hidden functions.

---

# The retirement equation

A workaround is retired only when five conditions are true:

```text
No new use
+
Existing population converted
+
Business process replaced
+
Dependent implementations aligned
+
Residual risk verified
=
Workaround retired
```

Stopping new use is only the first term.

Many organisations complete that term and declare success.

The remaining population and dependencies continue to carry the old model.

---

# Establish the target state before touching production

The target state should answer four questions.

## What will the business concept mean?

For Supplier Risk:

> Supplier Risk remains the final approved exposure classification.

It must not continue to mean “assessment unavailable” for some sources.

## How will incomplete cases be represented?

Possible target:

> Incomplete assessment is represented through Supplier Review Status, not through a temporary risk value.

## What may the business do while review is incomplete?

Possible target:

- record may be created;
- review workflow may begin;
- final activation remains blocked;
- approved emergency treatment requires explicit authority.

## Where will the authoritative state live?

Possible target:

- Supplier Risk in SAP MDG;
- Review Status in the governed model;
- source evidence in the approved source;
- no authoritative spreadsheet.

Without this target, retirement becomes a technical cleanup exercise rather than a model transition.

---

# Freeze expansion before conversion

Once retirement is approved, stop the workaround from spreading.

This may mean:

- no new placeholder values;
- no new spreadsheet entries;
- no new local exception codes;
- no new consumers of workaround data;
- no new knowledge articles referencing the old procedure;
- no new interface logic based on it.

The freeze may need a controlled exception for urgent cases.

That exception should be narrower than the old workaround and explicitly recorded.

Example:

```text
New use prohibited after:
1 August 2026

Emergency use permitted only when:
- supplier is cutover-critical;
- business owner approves;
- final review is scheduled;
- record is added to the retirement population.
```

A freeze prevents the target from moving while the team is trying to migrate it.

---

# Build the real population

The workaround population is rarely identical to the spreadsheet or ticket list.

Records may have entered through:

- manual maintenance;
- mass upload;
- interface default;
- copied master data;
- local scripts;
- historical migration;
- direct correction;
- another country reusing the procedure.

The population should be reconstructed from several signals.

## Persisted values

Which records contain:

- placeholder codes;
- suspected defaults;
- workaround-specific statuses;
- local custom values?

## Provenance

Can the system identify how the value was created?

Examples:

- user;
- interface;
- source system;
- change request;
- migration load;
- timestamp.

## External registers

Which records appear in:

- spreadsheets;
- exception lists;
- service requests;
- known-error records;
- knowledge-article procedures?

## Behavioural evidence

Which records are:

- excluded from reports;
- converted by interfaces;
- routed through special workflow;
- maintained manually?

The result should classify records into confidence levels.

| Population | Interpretation |
|---|---|
| Confirmed workaround | Direct evidence shows workaround use |
| Probable workaround | Value, source and timing strongly match |
| Possible workaround | Ambiguous; investigation required |
| Genuine approved value | Evidence confirms normal meaning |
| Unresolved | Current evidence cannot distinguish |

Do not convert ambiguous records as though they were confirmed.

The workaround itself may have destroyed the evidence needed to distinguish them.

---

# Preserve record identity across systems

A spreadsheet row may identify a supplier by:

- legacy number;
- SAP Business Partner;
- tax number;
- name;
- local system key.

These identifiers may no longer align.

Before conversion, establish a reliable identity bridge.

Example:

```text
Legacy supplier:
ERP_B-004817

SAP Business Partner:
1000458921

Supplier role:
FLVN00 / FLVN01

Country context:
DE

Workaround register row:
WRK-2026-0184
```

Where identity cannot be established confidently, create a separate investigation population.

Do not guess by supplier name alone.

A false match can replace a genuine approved value or leave an affected record untreated.

---

# Split the population by required treatment

Not every workaround record should receive the same conversion.

For example:

## Final assessment now available

Action:

- replace temporary value with approved classification;
- close pending status.

## Assessment still required

Action:

- create explicit review status;
- retain activation control;
- assign owner.

## Record no longer active

Action:

- decide whether historical correction is required;
- preserve audit evidence.

## Record was never in scope

Action:

- remove the workaround value;
- document non-applicability.

## Genuine `STANDARD` value

Action:

- preserve it;
- remove false workaround classification.

## Identity unresolved

Action:

- block automatic conversion;
- investigate manually.

This classification should be approved before the update is executed.

A mass replacement such as:

```text
All ERP_B STANDARD values → blank
```

is not a retirement plan.

It is another unvalidated transformation.

---

# Replace the lifecycle, not only the value

Long-lived workarounds often create a hidden lifecycle.

Example:

```text
Default assigned
→ waiting for business
→ evidence received
→ ready to correct
→ closed
```

If retirement removes the spreadsheet without replacing the lifecycle, work remains unmanaged.

The target model may need explicit states such as:

```text
PENDING
IN_REVIEW
CLEARED
REJECTED
```

These states should be defined as a separate concept when they are not the same as the final business classification.

This prevents the organisation from moving the shadow lifecycle into another informal list.

---

# Replace operational ownership

The workaround may have its own de facto owner:

- AMS analyst;
- local data coordinator;
- migration lead;
- spreadsheet maintainer.

The target process needs permanent ownership.

Define:

- who initiates review;
- who supplies evidence;
- who decides;
- who corrects the master record;
- who monitors overdue cases;
- who may approve an emergency exception.

Retirement is incomplete when the old spreadsheet owner stops maintaining the file but no one owns the replacement queue.

---

# Trace every dependency before the cutover

A workaround can affect much more than the field it changes.

A dependency review should include:

## SAP or MDM configuration

- validations;
- derivations;
- workflows;
- field controls;
- value lists;
- authorisations;
- mass-processing logic.

## Interfaces

- source transformations;
- outbound conversions;
- blank handling;
- default logic;
- consumer-specific mappings.

## Reports and analytics

- exclusion filters;
- derived statuses;
- completeness metrics;
- risk calculations;
- manual reconciliation.

## Operational procedures

- knowledge articles;
- service requests;
- work instructions;
- escalation paths;
- manual uploads.

## Tests

- scenarios expecting the workaround;
- test data containing placeholders;
- scripts that treat warning as normal.

## Data-quality rules

- checks that ignore workaround values;
- dashboards reporting them as valid;
- monitoring built around an external register.

SAP currently positions SAP Master Data Governance around a governed model, preserved semantics and relationships, ownership of attributes, validated values, workflow routing, business-rule monitoring and auditable changes.

A workaround-retirement plan should restore alignment across those dimensions rather than update one technical component.

---

# Build a dependency matrix

| Dependency | Current workaround behaviour | Target behaviour | Owner | Verification |
|---|---|---|---|---|
| SAP risk field | `STANDARD` used temporarily | Final approved risk only | MDG owner | Population comparison |
| Review spreadsheet | Holds pending state | Governed Review Status | Business owner | No active rows |
| Outbound interface | Converts temporary `STANDARD` to blank | Sends risk and review state separately | Integration owner | Consumer test |
| Risk dashboard | Excludes workaround population | Uses explicit review status | Reporting owner | Metric reconciliation |
| Service request | Requests temporary default | Requests formal risk review | Service owner | Catalogue updated |
| Knowledge article | Describes workaround | Describes target process | AMS owner | Old article retired |

The matrix exposes whether the replacement is complete.

---

# Choose a retirement strategy

There are four common strategies.

## Big-bang retirement

The workaround is removed and all affected data and processes switch at once.

Appropriate when:

- population is small;
- dependencies are known;
- rollback is straightforward;
- target process is already proven.

Risk:

- hidden consumers appear after removal.

## Parallel operation

Old and new processes run together for a limited period.

Appropriate when:

- target process needs operational validation;
- historical population is still being converted;
- business continuity is critical.

Risk:

- users continue preferring the old process.

Parallel operation needs a hard end date and rules preventing new long-term workaround use.

## Cohort migration

Records or contexts move in groups.

Examples:

- one country;
- one source;
- one supplier category;
- one organisational unit.

Appropriate when:

- dependencies differ by context;
- evidence quality varies;
- business impact is material.

Risk:

- different populations temporarily operate under different states.

The effective model must make those boundaries explicit.

## Contain and redesign

The workaround remains under stronger control while the target model is redesigned.

Appropriate when:

- the current workaround is unsafe to remove;
- the proposed replacement does not yet represent business reality;
- dependencies are poorly understood.

Risk:

- “temporary redesign period” becomes another indefinite extension.

---

# Use parallel operation carefully

Parallel operation should compare results, not merely keep both processes available.

For each record, compare:

- workaround result;
- target result;
- reason for difference;
- expected business treatment.

Example:

| Record | Workaround | Target process | Difference |
|---|---|---|---|
| Supplier A | `STANDARD` | Risk `HIGH`, Review `CLEARED` | Temporary value was incorrect |
| Supplier B | `STANDARD` | Review `PENDING` | Final classification unavailable |
| Supplier C | `STANDARD` | Risk `STANDARD` | Value was genuine |
| Supplier D | Exempt spreadsheet | Exemption expired | Old process allowed invalid state |

This evidence shows whether the target process actually improves interpretation.

---

# Stop users from returning to the workaround

Users may resist retirement because the workaround is familiar and fast.

Common responses include:

- keep old spreadsheet “as backup”;
- maintain the old service request;
- leave the placeholder value selectable;
- preserve the warning-only validation;
- allow manual fallback without tracking.

This creates dual operation without governance.

Retirement controls may include:

- remove obsolete value from selection;
- disable old upload;
- archive spreadsheet read-only;
- redirect old service request;
- update knowledge search results;
- monitor new placeholder creation;
- alert on use of retired rules.

The old path must become harder or impossible to use.

Training alone is insufficient when the system still permits the workaround.

---

# Historical records require an explicit policy

Correcting active records is usually the priority.

Historical records still matter for:

- audit;
- reporting;
- analytics;
- legal evidence;
- future reactivation;
- machine-learning datasets.

Decide whether historical workaround values will be:

- fully corrected;
- corrected only for active or material records;
- preserved with explicit provenance;
- mapped to a historical status;
- excluded from selected uses through approved policy.

Do not leave historical treatment implicit.

A report that combines corrected current values with ambiguous historical values may remain misleading.

---

# Reconcile reports before and after conversion

A retirement can produce apparent changes in business performance.

For example:

- risk distribution changes;
- completeness improves or falls;
- supplier counts move between categories;
- exception totals decrease;
- overdue reviews become visible.

These may be data corrections rather than real business changes.

Prepare reconciliation.

```text
Before:
1,800 suppliers recorded as STANDARD

After:
720 genuine STANDARD
640 HIGH
210 LOW
190 PENDING REVIEW
40 inactive/unresolved
```

Management should understand that the previous figure contained overloaded semantics.

Without reconciliation, stakeholders may distrust the target model or demand that the workaround be restored.

---

# Test downstream consumers for meaning, not only format

An interface test often confirms:

- field exists;
- message is accepted;
- code length is correct.

Retirement requires semantic testing.

Ask each consumer:

- What did the workaround value mean here?
- Did the consumer apply special conversion?
- Can it represent the new review state?
- Does it need final risk only?
- What happens when assessment is pending?
- Are historical values cached?

A consumer may accept the new message technically while interpreting it incorrectly.

---

# The rollback plan must not recreate the shadow model

A standard rollback might restore the old workaround.

That may be necessary during a failed deployment, but it should be controlled.

Define:

- maximum rollback period;
- records created during rollback;
- additional reconciliation required;
- authority to continue beyond the period;
- whether the old spreadsheet or service request may reopen.

Rollback should restore service.

It should not silently cancel retirement.

---

# Verification should prove absence

Most implementation tests prove that the target process works.

Retirement also needs proof that the workaround no longer operates.

Verify:

- no new placeholder values created;
- no active spreadsheet rows;
- old service request disabled or redirected;
- old knowledge article retired;
- no interface conversion remains;
- no report filter uses the workaround;
- no active configuration references the old rule;
- no temporary deviation remains open;
- affected records have approved target treatment.

This is negative verification:

> Prove that the old path is no longer in use.

---

# Monitor for recurrence

After retirement, monitor signals that the workaround is returning.

Examples:

- new `999`, `UNKNOWN` or temporary values;
- manual uploads;
- support requests using old terminology;
- users recreating local spreadsheets;
- recurring activation incidents;
- interface blanks from the old conversion;
- emergency requests to restore warning-only validation.

A recurrence may indicate:

- incomplete training;
- missing target functionality;
- unconverted population;
- incorrect target design;
- unresolved source limitation.

Do not assume every recurrence is user resistance.

It may be evidence that the replacement does not cover real operational needs.

---

# Closure needs a retirement certificate

A retirement record should summarise:

## Original workaround

What did it do, and why was it introduced?

## Population

How many records and contexts were affected?

## Target model

Which approved concepts and processes replaced it?

## Data conversion

How were existing records treated?

## Dependency removal

Which configurations, interfaces, reports and procedures were changed?

## Residuals

Which records or contexts remain unresolved?

## Verification

What proves no new workaround use?

## Ownership

Who monitors recurrence?

Example:

```yaml
id: RETIRE-WRK-SUPPLIER-RISK-001
status: verified

workaround:
  - WRK-SUPPLIER-RISK-ERP-B-001

replacement:
  model_objects:
    - ATTR-SUPPLIER-RISK
    - ATTR-SUPPLIER-REVIEW-STATUS
  decision:
    - DEC-SUPPLIER-REVIEW-029

population:
  confirmed: 1800
  converted: 1760
  unresolved: 40

dependencies_retired:
  - temporary STANDARD default
  - spreadsheet review register
  - dashboard exclusion
  - outbound blank conversion
  - old service request
  - workaround knowledge article

monitoring:
  owner: ROLE-SUPPLIER-DATA-SERVICE-OWNER
  checks:
    - no new temporary STANDARD values
    - no old request submissions
    - no active spreadsheet updates
```

This is a conceptual product direction rather than a claim about the current Martenweave schema.

---

# Problem closure and model closure are different

Problem management focuses on removing underlying causes and preventing recurrence. Atlassian’s guidance describes problem management as managing the causes of incidents, maintaining known errors and workarounds, and developing longer-term solutions; ServiceNow similarly emphasises known-error visibility, workarounds, root-cause analysis and remediation plans.

For a model-affecting workaround, technical root-cause closure is not sufficient.

Example:

```text
Root cause:
ERP_B did not provide Supplier Risk.

Technical resolution:
ERP_B now provides Supplier Risk.
```

Model closure still requires:

- correcting old defaulted values;
- replacing hidden review state;
- removing report exclusions;
- removing interface translations;
- retiring operational procedures.

A problem can be technically solved while its workaround-created model remains active.

---

# Retirement should be proposal-first

The target transition should be reviewable before execution.

A proposal should show:

- canonical model additions or corrections;
- values to retire;
- contexts affected;
- mappings changed;
- deviations closed;
- anticipated impact.

Martenweave currently treats canonical Markdown and YAML model files as the source of truth, generated SQLite and JSONL indexes as rebuildable, deterministic validation as the first gate, and AI output as reviewable `PatchProposal` objects requiring human approval.

That approach fits workaround retirement:

```text
Operational evidence
→ retirement proposal
→ validation
→ impact analysis
→ human approval
→ data and implementation migration
→ verification
```

The retirement should not begin with an undocumented production correction and attempt to update the model afterward.

---

# What impact analysis must cover

Before approval, trace from the workaround to:

- canonical attribute;
- rules;
- mappings;
- source endpoints;
- target endpoints;
- datasets;
- decisions;
- reports;
- interfaces;
- local contexts;
- tests;
- active incidents and requests.

Martenweave’s current core supports trace, impact analysis, repository diffing, ownership reports, governance scorecards and dataset-readiness workflows.

It does not directly inspect every SAP configuration or external report.

Those dependencies need imported evidence or registered references.

The model registry should make the retirement chain visible, not pretend to control every platform.

---

# Deterministic retirement checks

A focused capability could validate that:

- the workaround has a target replacement;
- no active rule references a retired placeholder;
- affected population is recorded;
- unresolved records have an owner;
- every dependent mapping is reviewed;
- expiry and retirement dates are consistent;
- closed deviations reference convergence evidence;
- retired values cannot be used by active proposals;
- a knowledge or service reference remains linked for follow-up;
- verification includes absence checks.

The validator cannot prove that users stopped maintaining a private spreadsheet.

It can prove that the governed retirement record is structurally complete.

---

# What AI may safely assist with

AI can help:

- find references to the workaround across tickets and documents;
- identify likely affected objects;
- group the historical population;
- detect interface or reporting references;
- draft the dependency matrix;
- propose conversion categories;
- generate test scenarios;
- draft the retirement proposal.

AI should not:

- decide that ambiguous records may be overwritten;
- infer final classifications without approved evidence;
- declare a workaround retired because one configuration was removed;
- choose residual-risk acceptance;
- close unresolved identities.

A safe output is:

> 1,800 records are probable workaround users. Of these, 1,420 have supporting spreadsheet evidence, 340 match the source-and-date pattern only, and 40 cannot be linked confidently. Automatic conversion should be restricted to the confirmed population until the ambiguous groups are reviewed.

That improves execution without replacing accountable judgement.

---

# A worked retirement: ERP_B Supplier Risk

## Current workaround

- missing risk becomes `STANDARD`;
- spreadsheet tracks pending review;
- dashboard excludes temporary records;
- outbound interface converts temporary `STANDARD` to blank;
- AMS fulfils monthly default requests.

## Target model

- Supplier Risk remains final classification;
- Supplier Review Status represents lifecycle;
- ERP_B provides assessment evidence;
- activation requires final risk and cleared review.

## Freeze

- no new temporary `STANDARD` after 1 August;
- emergency cases enter explicit review.

## Population

- 1,800 confirmed or probable records;
- 40 identities unresolved.

## Conversion

- genuine `STANDARD`: retain;
- completed assessment: replace with approved risk;
- pending assessment: create Review Status `PENDING`;
- inactive historical: preserve with explicit provenance;
- unresolved: manual investigation.

## Dependency changes

- remove interface blank conversion;
- update dashboard to use Review Status;
- replace monthly default request with Risk Review request;
- retire spreadsheet as authority;
- archive old knowledge article.

## Verification

- no new workaround values;
- target process works for new suppliers;
- active population fully classified or under explicit review;
- downstream consumers receive separate risk and review state;
- old report exclusions removed.

## Closure

- 1,760 records converted;
- 40 unresolved records assigned;
- workaround remains closed to new use;
- residual population tracked outside the closure claim.

This is controlled retirement.

It does not claim perfection where evidence remains incomplete.

---

# A worked retirement: tax-exemption spreadsheet

## Existing process

A local spreadsheet authorises suppliers without a tax identifier.

## Target model

Contextual exemption object containing:

- supplier;
- jurisdiction;
- reason;
- evidence;
- approval;
- valid-from;
- valid-to;
- owner.

## Retirement risk

Several spreadsheet rows lack a stable SAP identifier.

## Strategy

Cohort migration:

1. migrate confidently matched active suppliers;
2. manually investigate ambiguous active suppliers;
3. preserve inactive historical entries in an archive;
4. block new spreadsheet approvals;
5. redirect requests into governed workflow.

## Verification

- SAP validation reads the approved exemption;
- expired exemptions block correctly;
- no active spreadsheet row controls production;
- every active exemption has evidence and owner.

The spreadsheet may remain archived.

It no longer defines current model truth.

---

# A worked retirement: warning-only validation

## Existing workaround

A mandatory field was changed from error to warning during hypercare.

## Target state

The field is mandatory before activation.

## Retirement sequence

1. profile records created under warning-only behaviour;
2. classify and remediate the population;
3. prove the source and process can supply the field;
4. restore blocking in a test environment;
5. test affected contexts;
6. communicate the activation date;
7. restore the error;
8. monitor attempted violations.

## Why immediate restoration is unsafe

Thousands of active records may fail, users may lack the required process, and source systems may still omit the value.

## Why indefinite warning is unsafe

The operational model has already changed mandatory policy into recommendation.

The controlled sequence protects operations without preserving the weaker model.

---

# Anti-patterns

## “The source fix is live, so close the workaround”

The historical population and dependencies remain.

## “Delete the spreadsheet”

If the spreadsheet contains the only state or evidence, deletion destroys governance rather than restoring it.

## “Replace every placeholder automatically”

Some values may be genuine; others may need investigation.

## “Keep the old path as backup”

A permanent fallback often becomes the preferred process again.

## “Correct only active records”

This may be valid, but historical treatment must be an explicit policy.

## “Update SAP first, documents later”

This recreates implementation-model drift.

## “Close when the transport succeeds”

The business process, data population and consumers may still depend on the workaround.

---

# Measures that show whether retirement succeeded

Useful measures include:

## New-use rate

Are new records still entering the workaround?

## Conversion coverage

How much of the known population received approved target treatment?

## Unresolved population

Which records remain ambiguous or blocked?

## Dependency closure

How many known interfaces, reports and procedures were aligned?

## Recurrence

Are incidents or requests trying to restore the old behaviour?

## Semantic reconciliation

Can values now be interpreted without external workaround knowledge?

## Operational performance

Did onboarding time, error volume or service load worsen after retirement?

## Residual risk

Which accepted gaps remain, and who owns them?

The success measure is not:

> Workaround status = Closed.

---

# The final decision gate

Before declaring retirement complete, ask:

- Can new records follow the target process?
- Are all known affected records classified?
- Were ambiguous records protected from unsafe conversion?
- Is the hidden lifecycle represented or intentionally removed?
- Are reports and interfaces aligned?
- Are service requests and knowledge articles updated?
- Has the old path been disabled?
- Can the old semantics still enter through another source?
- Are remaining residuals explicitly owned?
- Can a new analyst interpret the data without knowing the workaround history?

The last question is the strongest.

If workaround history is still required to interpret current values, retirement is incomplete.

---

# Final perspective

Retiring an SAP AMS workaround is a migration programme in miniature.

Not because it needs a large project organisation, but because it changes:

- data;
- process;
- ownership;
- rules;
- interfaces;
- reports;
- operational behaviour.

The work should remain proportionate.

A small workaround may need only a short population check and controlled configuration update.

A workaround that has created parallel state and downstream dependencies needs a real transition plan.

SAP MDG can govern approved models, attribute ownership, workflows, validated values, quality rules and auditable changes.

Problem-management platforms can preserve known errors, workarounds, investigations and remediation plans.

Martenweave’s role is to hold the connecting evidence:

> Which model object was distorted, which population depends on the workaround, what replaces it, what must change, and what proves convergence?

The practical test is:

> Can the organisation stop new workaround use, convert the existing population, remove every dependent interpretation and continue the business process under one approved model?

When the answer is yes, the workaround is retired.

When only the support instruction has been disabled, the organisation has not removed the workaround.

It has merely hidden the path through which it was created.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects:

- canonical model objects;
- operational workarounds;
- affected populations;
- sources and mappings;
- dependencies;
- decisions;
- impact analysis;
- retirement proposals;
- verification evidence.

It does not replace SAP MDG, problem management, data-migration tooling or AMS delivery.

Its purpose is to make workaround retirement traceable enough that the organisation can remove temporary behaviour without losing the business function it was quietly providing.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer with a governed model across business entities, preserved semantics and relationships, ownership of attributes, validated values, workflow routing, business-rule monitoring, mass-change support and auditable changes.

Atlassian describes problem management as managing the causes of incidents, known errors and workarounds and developing longer-term solutions that reduce recurrence and business impact.

ServiceNow describes Problem Management around known-error and workaround visibility, root-cause analysis, remediation plans and prevention of recurring incidents.

Martenweave Core currently defines canonical files as the source of truth, generated indexes as rebuildable, deterministic validation as the first gate and AI-produced changes as reviewable proposals requiring human approval.

Its current CLI includes validation, health, scorecards, ownership reporting, dataset readiness, trace, impact, diffing and proposal generation, providing a foundation for governed workaround-retirement evidence without becoming a generic workflow or SAP write-back platform.

Martenweave is independent and is not affiliated with or endorsed by SAP, Atlassian, ServiceNow or other vendors named in this article. Product names and trademarks belong to their respective owners.
