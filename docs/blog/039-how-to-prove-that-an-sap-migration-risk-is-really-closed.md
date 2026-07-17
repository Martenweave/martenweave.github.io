# How to Prove That an SAP Migration Risk Is Really Closed

**Reviewed: 14 July 2026**

The steering committee asks whether a critical migration risk has been closed.

The migration lead answers:

> Yes. The remediation task is complete.

The SAP team confirms that the latest load succeeded.

The business owner says the affected records were reviewed.

The project manager changes the risk status from amber to green.

Three weeks later, the same problem appears in the next source extract.

The records fixed for the previous load remain correct. The underlying source process was never changed. The uncontrolled default is still present in the transformation. The new records were not included in the earlier remediation population.

The programme closed the work.

It did not close the risk.

This is a common failure in SAP migration and MDG programmes. Risk closure becomes an administrative conclusion based on activity:

- ticket completed;
- transport imported;
- workbook updated;
- load passed;
- owner confirmed;
- deadline reached.

These events matter.

They do not prove that the exposure has disappeared, become controlled or been consciously accepted.

> A migration risk is really closed only when the programme can reproduce the chain of evidence showing that the approved model, affected data, implementation behaviour and continuing controls now agree.

The key word is **prove**.

Proof does not require absolute certainty.

It requires enough current, connected and reviewable evidence for another qualified person to reach the same conclusion.

## A green status is a claim

When a risk changes to green or closed, the programme is making a claim:

> The remaining exposure is no longer significant enough to require active treatment under the agreed scope.

That claim should be testable.

For a material model risk, another reviewer should be able to ask:

- What was the original risk?
- Which model objects were affected?
- Which population was exposed?
- What treatment was approved?
- What changed in the model?
- What changed in the data?
- What changed in SAP or connected systems?
- Which tests prove the intended behaviour?
- What residual exposure remains?
- Who accepted it?
- What would reopen the risk?

If those questions cannot be answered without reconstructing the project history, closure is weak.

## Risk closure is not the same as successful execution

A successful load proves that one dataset passed one process under one model and implementation state.

It does not automatically prove that:

- the next extract will behave the same way;
- the source has been corrected;
- all affected countries were included;
- the correct business population was tested;
- downstream systems received the right values;
- temporary workarounds were removed;
- the model and SAP configuration remain aligned.

Likewise, a successful SAP validation test proves that the configured rule behaved as expected for the test cases used.

It does not prove that:

- the business rule itself is correct;
- the context is complete;
- source data can satisfy it;
- migration treatment is controlled;
- all legitimate exceptions are represented.

SAP positions SAP Master Data Governance as a central governance layer supporting governed models, preserved semantics and relationships, validated values, collaborative workflows, business-rule monitoring, quality controls and auditable data changes.

Those capabilities can enforce and monitor operational master-data behaviour.

The programme must still prove that the implemented governance reflects the approved migration and business model.

## Begin with the original risk statement

A risk cannot be proved closed if the original exposure was never stated precisely.

Weak risk:

> Supplier data quality is poor.

This can never be closed objectively because “poor” has no defined boundary.

Stronger risk:

> Because ERP_B does not provide Supplier Risk Classification for all active suppliers, there is a risk that migration will either reject 10,240 records or assign an unapproved default, resulting in delayed activation and unreliable compliance routing.

This statement identifies:

- cause;
- event;
- population;
- business consequence.

Closure must address those same elements.

If the team only fixes the latest file, it may reduce the record-rejection risk while leaving the unapproved-default risk active.

## Preserve the affected model objects

The risk should link to identifiable model objects.

For example:

```text
Risk:
MRISK-SUPPLIER-0048

Affected objects:
ATTR-SUPPLIER-RISK
FEP-ERP-B-SUPPLIER-RISK
MAP-ERP-B-SUPPLIER-RISK
VLIST-SUPPLIER-RISK
RULE-SUPPLIER-RISK-REQUIRED
```

This gives closure a concrete boundary.

The programme can verify whether:

- the source endpoint changed;
- the mapping changed;
- the value list changed;
- the rule changed;
- any dependent object remains unresolved.

Without object-level linkage, the risk may be closed while one of its technical or semantic dependencies still contains the original problem.

## Identify the approved treatment

Closure evidence must prove the treatment that was actually approved.

Suppose the programme considered four options:

1. Remediate ERP_B.
2. Derive the classification.
3. Use a temporary review status.
4. Exclude affected suppliers from the wave.

The closure package must identify which option was selected.

For example:

```text
Approved treatment:

Introduce Supplier Review Status as a separate process attribute.

Do not default Supplier Risk.

Block final supplier activation until review is complete.

Remediate the existing ERP_B population before UAT.
```

Without the approved treatment, teams may provide evidence for different solutions.

The source team proves enrichment.

The SAP team proves a new status.

The migration team proves an exclusion.

Each result may be technically valid while the combined operating model remains inconsistent.

## Prove the model state

The first evidence layer is the approved model.

The programme should be able to show:

- previous model state;
- approved change;
- current model state;
- decision and owner;
- applicable context;
- lifecycle of any retired or temporary elements.

A semantic change summary might state:

```text
Before:
Missing Supplier Risk values were assigned STANDARD during migration.

After:
No automatic Supplier Risk default is permitted.

Records without final classification receive Supplier Review Status = PENDING.

Final activation requires an approved Supplier Risk value.
```

The exact canonical diff should also remain available.

This is where Git-based model control is useful: it preserves the exact difference between the approved states.

The human-readable summary explains what the difference means.

## Prove that the model is structurally valid

A semantically approved change can still create broken model relationships.

Deterministic validation should confirm that:

- affected object identifiers are valid;
- referenced objects exist;
- active mappings use active endpoints;
- new values are unique;
- retired values have no unexplained active dependencies;
- contexts are structurally valid;
- required ownership exists;
- temporary elements have lifecycle controls.

Martenweave Core treats canonical Markdown and YAML files as the source of truth, rebuilds generated indexes from them and validates identifiers, object types, references and domain-context rules before indexing.

A passing validator does not prove that the business decision is correct.

It proves that the approved decision has been represented consistently enough for further analysis.

## Prove the data state

The second evidence layer is the affected data population.

The closure package should identify:

- dataset;
- extraction date;
- source system;
- applicable filters;
- record count;
- completeness;
- valid-value coverage;
- exceptions;
- reconciliation result.

For example:

```text
Dataset:
ERP_B active suppliers, extracted 1 September 2026

Applicable records:
24,880

Final Supplier Risk available:
23,604

PENDING review status:
1,234

Approved exclusions:
42

Uncontrolled STANDARD defaults:
0
```

This is much stronger than:

> Data was cleaned.

It shows the current state of the exact population relevant to the risk.

## Prove material completeness, not just a percentage

A high percentage can hide critical records.

Suppose 99.8% of suppliers are correctly classified.

The remaining 0.2% may contain:

- regulated suppliers;
- suppliers with active purchase orders;
- strategic vendors;
- records needed for cutover;
- parent entities used by dependent relationships.

Closure criteria should combine quantitative coverage with materiality.

For example:

```text
At least 99% of applicable active suppliers must have approved treatment.

Additionally:

No unresolved records may remain among regulated suppliers,
strategic suppliers or suppliers required for cutover.
```

The threshold is a programme decision, not a universal SAP rule.

The important point is that the programme defines what residual population can be tolerated.

## Prove that the cause was treated

A one-time data correction may remove the visible population while leaving the cause intact.

For example:

```text
Current records:
Corrected

Source process:
Still does not provide the field

Transformation:
Still contains the uncontrolled default
```

This is not full closure.

The closure package should show what prevents recurrence.

Possible evidence includes:

- source-system correction;
- controlled enrichment process;
- source-quality validation;
- new extraction rule;
- monitored exception queue;
- removal of the default;
- explicit operational stewardship.

A practical closure question is:

> What happens when the next record is created or the next extract is produced?

If the answer recreates the original condition, the risk remains active.

## Prove the mapping and transformation

For a mapping risk, closure should show:

- approved source endpoint;
- approved target endpoint;
- transformation logic;
- value mapping;
- context;
- treatment of null and unknown values;
- observed-value coverage;
- sample results.

For example:

```text
Source:
ERP_B.SUPPLIER_REVIEW_CODE

Target:
Supplier Review Status

Transformation:
P → PENDING
C → CLEARED
R → REJECTED

Null treatment:
Gap—no automatic default

Invalid value treatment:
Reject and route to remediation
```

A mapping workbook marked approved is not sufficient if the running transformation uses another rule.

The programme should connect approved mapping evidence to implementation evidence.

## Prove the SAP implementation state

The third evidence layer is implemented behaviour.

The programme should verify that SAP MDG or the target application now follows the approved model.

Depending on the change, evidence may include:

- configuration reference;
- active rule;
- change-request behaviour;
- workflow route;
- value availability;
- authorisation;
- activation result;
- outbound message;
- release or transport reference.

SAP describes MDG as supporting governed models, ownership, validated values, workflow routing, rule monitoring, audit trails and data-quality controls.

Risk closure should show how the relevant capabilities were configured and tested for the approved scenario.

## Test positive, negative, exception and out-of-scope cases

One successful test does not prove the rule boundary.

For example, if Supplier Risk is mandatory for active regulated suppliers in Portugal, test at least:

### Positive case

A valid applicable record with Supplier Risk succeeds.

### Negative case

An applicable record without Supplier Risk is blocked.

### Exception case

A record with an approved exemption follows the agreed process.

### Out-of-scope case

An inactive or non-regulated supplier is not incorrectly blocked.

### Authorisation case

Only the intended role can clear the review status.

### Integration case

The approved result is distributed correctly to consumers.

These scenarios prove both intended enforcement and boundary control.

## Prove downstream compatibility

A model risk is not closed when only the central platform works.

A changed field or value may affect:

- SAP S/4HANA;
- interfaces;
- procurement systems;
- CRM;
- reporting;
- analytics;
- data-quality monitoring;
- local applications.

SAP distinguishes master-data management from master-data integration: integration distributes the current state of master data to applications but does not itself improve that data’s quality.

Closure should therefore verify that the governed result can be distributed and interpreted safely.

For a new value, ask:

- Does the interface allow it?
- Can each consumer store it?
- Does reporting classify it correctly?
- Does an old consumer ignore it safely?
- Does workflow react as designed?

A new value accepted by MDG but rejected by a procurement portal means the enterprise risk remains unresolved.

## Prove that old behaviour is no longer active

Programmes often verify the new state but forget to remove the old state.

For example:

- new mapping exists, but old mapping still runs for one source;
- new rule is active, but temporary warning remains elsewhere;
- new value is available, but users can still select the migration default;
- new endpoint exists, but several mappings still reference the retired one.

Closure should include negative confirmation:

```text
No active mapping produces MIGRATION_REVIEW.

No operational user can assign MIGRATION_REVIEW.

No active rule depends on MIGRATION_REVIEW.

No current interface treats MIGRATION_REVIEW as final classification.
```

The old behaviour must be removed, retired or explicitly preserved for a defined historical scope.

## Prove the impact boundary

A risk may appear closed because the team tested only the objects already known to be affected.

Impact analysis should identify direct and transitive dependencies represented in the model.

For example:

```text
Changed value list
→ mapping
→ validation
→ workflow
→ interface
→ report
→ tests
```

The current Martenweave core includes search, trace and impact analysis over the canonical model.

The closure package should state:

- which dependencies were found;
- which required action;
- which were reviewed and found unaffected;
- which external areas remain outside current model coverage.

This last point matters.

A registry cannot prove dependencies it does not contain.

A credible closure report states its coverage boundary.

## Prove that the evidence belongs to the same baseline

Closure evidence can appear complete while combining incompatible versions.

For example:

- model baseline 2.7;
- mapping workbook from 2.5;
- dataset from before remediation;
- SAP test from a previous transport;
- interface test using an older value list.

Every material evidence item should identify its baseline.

A closure package might include:

```text
Canonical model:
supplier-model-v2.8

Dataset:
ERP_B_supplier_extract_2026-09-01

Mapping implementation:
migration-release-4.3

SAP implementation:
MDG-R4 transport set

Test cycle:
UAT-2

Interface version:
supplier-contract-v6
```

This proves that the evidence describes one coherent operating state.

## Prove that the evidence is reproducible

A screenshot can support closure.

A reproducible check is stronger.

Examples include:

- validator command;
- dataset profiling command;
- impact query;
- saved test case;
- reconciliation query;
- generated report.

The current Martenweave core supports validation, indexing, health, trace, impact and dataset-readiness operations.

For example:

```bash
martenweave validate --repo ./model
```

```bash
martenweave impact ATTR-SUPPLIER-RISK --repo ./model
```

```bash
martenweave run dataset-readiness \
  --repo ./model \
  --dataset ./data/erp_b_suppliers.xlsx \
  --out ./reports/supplier-risk-closure
```

A future reviewer should be able to rerun the checks against the stated inputs.

## Build a closure evidence package

A material risk should have one evidence package rather than references spread across many tickets.

A practical package contains:

### 1. Risk statement

Cause, event and consequence.

### 2. Affected objects

Attributes, endpoints, mappings, rules, values and contexts.

### 3. Approved treatment

Decision, owner, conditions and scope.

### 4. Model diff

Previous and current canonical states.

### 5. Structural validation

Validator result and unresolved warnings.

### 6. Data evidence

Population, profile, coverage and exceptions.

### 7. Implementation evidence

SAP, transformation and interface references.

### 8. Test evidence

Positive, negative, exception and regression results.

### 9. Impact review

Dependencies checked and coverage limitations.

### 10. Residual risk

Remaining population, controls and approver.

### 11. Reopening triggers

Events that invalidate closure.

### 12. Final decision

Resolved, accepted, transferred or superseded.

This is not intended as a large document.

Much of it can be generated from structured objects and reports.

## Use Martenweave’s UI as the closure workbench

Martenweave is not only a CLI.

The current repository includes a browser-based interactive workspace with seven model-governance screens:

- Home;
- Models and global search;
- Object detail;
- Lineage;
- Gaps;
- Proposals;
- Proposal review.

These screens create a natural foundation for proving risk closure.

## Home: closure overview

The Home screen can show:

- risks awaiting evidence;
- risks ready for closure review;
- overdue residual-risk decisions;
- reopened risks;
- model-health changes.

The objective is not another generic dashboard.

It should direct users toward unresolved evidence.

## Models and search: find the affected objects

A reviewer can search for:

- attribute;
- endpoint;
- mapping;
- rule;
- value;
- decision.

This allows them to inspect closure from the model object rather than starting from the ticket.

## Object detail: inspect current truth

The object view can show:

- current lifecycle;
- owner;
- source and target relationships;
- linked risks;
- current decisions;
- evidence;
- last validated state.

This helps answer:

> What exactly is now approved?

## Lineage: verify the dependency path

The lineage view can show:

```text
source
→ mapping
→ attribute
→ target
→ rule
→ consumer
```

The reviewer can inspect whether the closure evidence covers the meaningful dependency chain.

## Gaps: confirm that unresolved exposure is visible

The Gaps screen can show:

- missing source fields;
- incomplete value coverage;
- ownership gaps;
- broken references;
- remaining exceptions.

A closure review should not depend on a manually curated success narrative while known gaps remain elsewhere in the system.

## Proposals: distinguish treatment from approved state

The Proposals screen can show which changes were considered and which remain pending.

This prevents a draft correction from being mistaken for an approved model state.

## Proposal review: preserve the decision boundary

The review screen can present:

- semantic diff;
- validation result;
- impact;
- evidence;
- reviewer decision.

This is the right place to approve the model change that supports risk closure.

The current UI is already an interactive local workspace for these concepts. Its present implementation uses demo data and does not yet persist or write directly to canonical files; production integration is expected to read generated SQLite data or a local API and retain the core’s reviewed `PatchProposal` to `ChangeRequest` workflow.

That means the product already has the user-facing investigation and review shape.

The next product step is to connect those views to live risk, evidence and closure state—not to invent a UI from zero.

## Show closure as a chain, not a status badge

A green badge is useful as a summary.

The user should be able to drill into the proof chain:

```text
Risk
→ affected objects
→ treatment decision
→ model change
→ validation
→ data evidence
→ implementation
→ tests
→ residual risk
→ closure decision
```

Every step should show:

- state;
- owner;
- evidence;
- date;
- baseline.

This is more valuable than a dashboard tile saying:

> Risk closed.

## Use a closure score carefully

The UI may summarise evidence completeness.

For example:

```text
Model evidence: complete
Dataset evidence: complete
Implementation evidence: complete
Regression evidence: partial
Residual-risk approval: missing
```

This is useful.

Avoid turning it into an opaque score such as `87% closed`.

Risk closure is not a weighted average.

A missing residual-risk approval or failed negative test can block closure regardless of the overall percentage.

## Separate evidence completeness from closure approval

The system can determine that required evidence exists.

It should not autonomously close a material risk.

A useful UI state model is:

```text
Evidence incomplete
→ Evidence ready for review
→ Closure review requested
→ Changes required
→ Closed
```

For accepted residual risk:

```text
Evidence ready
→ Residual risk accepted
→ Monitoring active
```

This keeps human authority explicit.

## Define who may approve closure

Different evidence should be reviewed by different roles.

### Business data owner

Confirms intended business treatment and residual risk.

### Migration lead

Confirms population and remediation evidence.

### SAP MDG architect

Confirms implementation alignment.

### Integration owner

Confirms consumer compatibility.

### Test lead

Confirms regression evidence.

### Risk owner

Makes or escalates the final closure recommendation.

For high-risk items, the person who implemented the treatment should not be the only closure approver.

## Do not hide partial closure

A risk can be resolved for one scope and remain active for another.

Example:

```text
Germany:
Resolved

Portugal:
Resolved with approved exceptions

ERP_B Wave 2:
Mitigated, operational source still unresolved

Future operational creation:
Transferred to AMS control
```

The system should represent this explicitly.

A single closed status across the global risk would conceal remaining exposure.

## Use residual populations explicitly

Suppose remediation leaves 42 records unresolved.

The closure package should show:

- which records;
- why they remain;
- whether they can be activated;
- who owns them;
- which control applies;
- who accepted the residual risk.

Avoid:

> Minor exceptions remain.

That phrase is difficult to govern.

## Include reopening triggers

A closed risk should define what evidence would invalidate closure.

Possible triggers include:

- new unmapped source value;
- completeness drops below approved threshold;
- new country adopts the model;
- source endpoint changes;
- temporary control expires;
- related incident volume exceeds threshold;
- SAP configuration changes;
- downstream consumer rejects the new value.

For example:

```text
Reopen MRISK-SUPPLIER-0048 when:

- any uncontrolled Supplier Risk default is detected;
- ERP_B completeness falls below the approved level;
- a new source value lacks target treatment;
- operational users can assign a migration-only value.
```

These triggers can later become automated checks or alerts.

## A worked example: closing an unapproved default risk

### Original risk

ERP_B migration assigns `STANDARD` when Supplier Risk is blank.

### Exposure

10,240 active suppliers may appear classified without business review.

### Approved treatment

- remove the default;
- introduce Review Status;
- block activation while review remains pending;
- remediate existing records.

### Model evidence

- Review Status added;
- Supplier Risk semantics unchanged;
- default removed from approved mapping;
- temporary value retired.

### Data evidence

- all defaulted records identified through migration batch IDs;
- 10,198 remediated;
- 42 remain under approved exception;
- no new uncontrolled defaults found in the current extract.

### SAP evidence

- activation blocked for `PENDING`;
- authorised compliance role can clear status;
- final Supplier Risk required before activation.

### Integration evidence

- outbound interface includes Review Status;
- analytics excludes `PENDING` from final risk distribution.

### Test evidence

- valid classification succeeds;
- blank classification enters review;
- unauthorised user cannot clear status;
- final activation fails while pending;
- exempt records follow approved route.

### Residual risk

42 inactive suppliers remain pending and cannot be activated.

### Closure decision

Original uncontrolled-default risk resolved.

Residual inactive population accepted and monitored separately.

This is a defensible closure.

## Another worked example: a risk that should remain open

### Risk

Target Customer Group mapping may use the wrong organisational level.

### Completed work

- workbook updated;
- target field changed;
- one sample record loaded successfully.

### Missing evidence

- business meanings not reconciled;
- other countries not assessed;
- source remains central while target is sales-area-specific;
- interface impact unknown;
- previous tests now stale.

### Correct status

Not closed.

Recommended next step:

> Return to decision required and complete semantic and impact analysis.

A successful sample load does not prove that the model is correct.

## Another worked example: closing a retired-endpoint risk

### Original risk

Forty-two mappings depend on a target endpoint scheduled for retirement.

### Required proof

- replacement target meaning approved;
- all dependent mappings updated;
- transformation differences assessed;
- current datasets tested;
- interfaces reviewed;
- old endpoint has no active references;
- regression tests updated;
- retirement completed.

### Closure check

An impact query finds one local mapping still referencing the old endpoint.

### Correct status

Closure blocked.

This is the value of model-level proof: one hidden dependency prevents a premature green status.

## Another worked example: transfer rather than closure

### Original risk

A legacy source cannot provide a required operational tax attribute.

### Project treatment

- migration population enriched;
- cutover completed successfully;
- future records require manual stewardship.

### Project conclusion

Migration exposure resolved.

### Remaining operational exposure

- manual process must continue;
- service level and owner required;
- source replacement planned next year.

### Correct status

Migration risk closed.

Related operational model risk transferred to AMS with:

- owner;
- runbook;
- monitoring;
- review date;
- evidence package.

This avoids keeping the project risk open indefinitely while preserving the continuing issue.

## AI can prepare closure evidence

AI can help:

- collect related tickets;
- summarise decisions;
- identify affected objects;
- compare before and after model states;
- group tests;
- detect missing evidence;
- draft a closure narrative;
- propose reopening triggers.

The Martenweave UI can make these suggestions visible inside the relevant object, gap or proposal views.

AI should not decide that a risk is closed.

It may miss:

- an unmodelled consumer;
- weak legal evidence;
- hidden source behaviour;
- a politically significant residual population;
- an unacceptable control dependency.

The safe principle remains:

```text
AI assembles and challenges the evidence.

Deterministic validators verify structure.

Responsible humans decide whether the proof is sufficient.
```

## A minimum proof-of-closure checklist

### Risk definition

- Original cause, event and consequence are explicit.
- Affected population and context are known.
- Affected model objects are linked.

### Treatment

- Approved treatment is recorded.
- Rejected alternatives are preserved where material.
- Temporary conditions have owners and expiry.

### Model

- Canonical model was updated.
- Exact diff is available.
- Structural validation passes.
- Old active dependencies were removed or justified.

### Data

- Current dataset was assessed.
- Applicable population is defined.
- Residual records are identified.
- Material exceptions have approved treatment.
- Prevention of recurrence was addressed.

### Implementation

- SAP behaviour matches the approved model.
- Transformation and interfaces are aligned.
- Relevant release and configuration evidence exists.

### Testing

- Positive case passed.
- Negative case passed.
- Exception case passed.
- Out-of-scope case passed.
- Impacted regression scope passed.

### Residual risk

- Remaining exposure is explicit.
- Owner and control are named.
- Acceptance is recorded.
- Review or expiry date exists.

### Continuity

- Evidence belongs to one coherent baseline.
- Checks can be reproduced.
- Reopening triggers are defined.
- AMS transfer is complete where required.

## What management should ask

1. What exact claim are we making by closing this risk?
2. Which model objects were affected?
3. Which approved treatment was implemented?
4. Does current data prove that the affected population is controlled?
5. Was the underlying cause addressed or only the latest extract?
6. Does SAP implement the same model that was approved?
7. Were downstream systems tested?
8. Is old behaviour still active anywhere?
9. Do all evidence items belong to the same baseline?
10. Can the checks be rerun?
11. What residual population remains?
12. Who accepted the residual risk?
13. What event would reopen the risk?
14. Can the complete proof chain be inspected in the Martenweave UI?

If the answer to the final question is only:

> The ticket is closed,

the risk has not been proven closed.

## Common mistakes

### Treating one successful load as proof

It may prove only one dataset and one moment in time.

### Fixing the population but not the source process

The next extract reproduces the problem.

### Verifying the new state without removing the old state

Obsolete defaults, mappings or values remain active.

### Combining evidence from different baselines

The proof describes no real coherent state.

### Checking SAP but ignoring integrations

The governed value may fail outside the platform.

### Using percentages without inspecting critical exceptions

A small residual population may carry disproportionate risk.

### Marking transferred risk as resolved

The exposure continues under another operating model.

### Allowing the implementer to approve closure alone

Independent review is appropriate for material risk.

### Using the UI only as a status dashboard

The UI should expose the evidence and dependency chain.

### Letting AI generate the green status

AI can prepare the case, not assume risk authority.

## Where Martenweave fits

Martenweave Core is an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS. It converts spreadsheets, datasets, tickets, validation reports, decisions and SAP context into canonical model files, deterministic validation, gap reports, lineage, impact analysis and human-approved patch proposals.

Martenweave also has an interactive UI workspace.

The current interface includes model search, object detail, lineage, gap workflows, proposals and proposal review.

Together, the layers support a practical proof process:

```text
Core:
Stores, validates, profiles, traces and compares.

UI:
Lets people investigate, review and understand.

Git:
Records the approved model history.

SAP and connected systems:
Implement the governed operational behaviour.

Humans:
Approve the treatment and accept residual risk.
```

The product should not become a generic enterprise risk platform.

Its role is narrower and more defensible:

> Martenweave makes the evidence behind model-risk closure traceable to the model, dataset, decision and change that actually resolved—or contained—the exposure.

## Our conclusion

A migration risk is not really closed because the programme completed a task, passed a load or changed a status field.

It is closed when the programme can demonstrate a coherent new state:

- the approved model is clear;
- structural relationships are valid;
- current data supports the treatment;
- SAP and integrations implement it;
- tests prove the intended boundary;
- old behaviour is no longer active;
- residual exposure is visible and accepted;
- recurrence will be detected.

The practical test is:

> Can another qualified reviewer open the risk, inspect the affected model and lineage, examine the dataset and implementation evidence, reproduce the checks and understand why the remaining exposure is acceptable?

When the answer is yes, closure is proven.

When the answer depends on a project lead explaining from memory what happened, the programme has completed work but has not created durable evidence.

The goal is not more closure documentation.

It is a verifiable chain connecting risk, model, data, implementation and decision.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We build practical model-governance infrastructure for SAP migration, MDG, MDM and AMS teams.

Martenweave combines a backend-first canonical model and validation engine with an interactive workspace for search, lineage, gaps, proposals and review. Together, these capabilities help teams show not only that corrective work was performed, but that the model risk genuinely changed.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer that unifies master data, policy and metadata. Its stated capabilities include governed models, preserved semantics and relationships, collaborative workflows, validated values, business-rule monitoring, data-quality management and auditable data changes. SAP also recommends curating clean and correct master data early because more automated SAP S/4HANA processes depend on it.

The current Martenweave Core README describes canonical model files, deterministic validation, rebuildable generated indexes, dataset-gap analysis, trace, impact analysis and human-reviewed `PatchProposal` and `ChangeRequest` workflows.

The Martenweave repository also contains a browser-based interactive workspace with Home, Models, Object Detail, Lineage, Gaps, Proposals and Proposal Review screens. The current implementation is local-first and uses demo data; the documented production direction is integration with the generated SQLite index or a local Martenweave API.

Martenweave is an independent project and is not affiliated with or endorsed by SAP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
