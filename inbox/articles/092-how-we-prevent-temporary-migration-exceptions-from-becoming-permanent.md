# How We Prevent Temporary Migration Exceptions from Becoming Permanent Rules

**Reviewed: 15 July 2026**

During Mock Load 2, the Product planning migration has a coverage problem.

The approved Plant-specific conversion does not produce an MRP Controller for every Product Plant record.

The migration team has three weeks before the next rehearsal.

A planning owner agrees to a temporary fallback:

```text
When no approved conversion exists,
assign MRP Controller 001.
```

The fallback unblocks the load.

The target field becomes complete.

The mock load finishes.

The readiness dashboard improves.

The programme moves on.

Several months later, controller `001` is still being assigned.

The original approval was given for two Plants and one mock load. The transformation now applies the fallback to four Plants. Nobody knows whether the planning owner approved the expanded scope.

The mapping workbook still describes the value as temporary.

The transformation code treats it as normal logic.

The validation report checks only that MRP Controller is populated.

The migration team reports 100 percent field completeness.

A temporary exception has become part of the effective model without ever being approved as a permanent rule.

This is not an unusual edge case.

Temporary migration logic appears whenever a programme must continue despite incomplete data, delayed decisions or unavailable integrations.

The real problem is not that exceptions exist.

The problem is that most programmes represent them badly.

They store exceptions as:

- comments in mapping workbooks;
- hard-coded defaults;
- ticket descriptions;
- email approvals;
- transformation branches;
- manually maintained exclusion lists;
- values described as “temporary” without an expiry mechanism.

Once the exception enters code, it behaves like any other rule.

The system cannot tell that it was supposed to disappear.

> A temporary exception becomes permanent when its implementation survives longer than the decision that authorised it.

We prevent this by modelling the exception as a governed object with its own lifecycle.

It must have:

- a reason;
- a precisely bounded scope;
- an accountable owner;
- supporting Evidence;
- an effective start;
- an expiry condition;
- compensating controls;
- an exit plan;
- identifiable affected records;
- explicit approval;
- a rule for what happens when it expires.

The exception must not hide inside the Mapping it temporarily modifies.

Martenweave already provides the foundations for this approach. Its canonical files are the source of truth, deterministic validation happens before indexing, AI-generated changes require human review, and the pipeline connects Evidence, proposals, gaps, impact and Git-based delivery.

A dedicated exception lifecycle is the next logical product layer.

---

# Why migration programmes need exceptions

A rigid model that permits no exceptions is rarely realistic.

During migration, the programme may face:

- incomplete value mappings;
- missing local decisions;
- unavailable source fields;
- delayed SAP configuration;
- unresolved ownership;
- limited remediation capacity;
- dependencies on another release;
- cutover deadlines that cannot move.

In the MRP Controller case, the correct long-term logic is clear:

```text
Planner Group + Plant
→ approved Plant-specific MRP Controller
```

The conversion is not yet complete for every record.

The programme has several possible responses:

1. stop the migration wave;
2. exclude uncovered records;
3. complete the conversion manually;
4. use a controlled fallback temporarily.

The fourth option may be rational.

The danger begins when we implement the fallback without modelling the obligation to remove it.

The code remembers the value.

It does not remember the promise.

---

# We separate the rule from the exception

The approved model rule is:

```text
MRP Controller must be derived
from the Plant-specific conversion.
```

The temporary exception is:

```text
For a bounded population during Mock Load 2,
controller 001 may be used when no approved conversion exists.
```

These are not two versions of the same rule.

They have different authority and lifecycle.

The main Rule describes the desired model.

The Exception temporarily permits deviation from it.

When we merge the fallback directly into the Mapping, the distinction disappears:

```text
Use Plant-specific conversion.
Otherwise use 001.
```

That implementation looks permanent.

A future reviewer cannot determine whether `001` is:

- an approved business default;
- a technical emergency value;
- a testing convenience;
- a risk-accepted workaround;
- an accidental implementation detail.

We therefore preserve two separate objects:

```text
Rule:
Plant-specific MRP Controller derivation required.

Exception:
Temporary fallback 001 for approved uncovered population.
```

The Mapping may reference both, but it must not erase the difference between them.

---

# We begin with the deviation

An exception should state which accepted obligation it violates or postpones.

Weak:

```text
Use 001 temporarily.
```

Stronger:

```text
Deviation:
Records covered by this exception do not satisfy
RULE-PLANT-SPECIFIC-MRP-CONTROLLER.

Temporary treatment:
Assign controller 001.
```

This matters because the exception is not meaningful in isolation.

It is meaningful only relative to the rule it relaxes.

If we cannot identify the governing Rule, we may not be dealing with an exception at all. We may be dealing with:

- an undefined Mapping;
- an unresolved design;
- an undocumented default;
- an actual business rule.

Calling something temporary does not make it an exception.

We need a declared expected state first.

---

# We define scope so that the exception cannot expand silently

The original agreement may cover:

- Plants PL20 and PL30;
- active Product Plant records;
- one legacy source;
- Mock Load 2;
- records without an approved conversion.

If the implementation says only:

```text
if mapping_missing:
    mrp_controller = "001"
```

the scope is broader than the decision.

It may apply to:

- every Plant;
- every migration wave;
- new source systems;
- records missing Plant itself;
- records with invalid Planner Group;
- production cutover.

We represent applicability explicitly:

```text
Scope:

Plants:
- PL20
- PL30

Migration stage:
Mock Load 2

Source system:
LEGACY-EU

Applies when:
- Plant is present
- Planner Group is present
- no approved conversion exists

Does not apply when:
- Plant is missing
- Planner Group is invalid
- record belongs to production cutover
```

The validator can compare actual use against this scope.

If the fallback appears in PL40, the result is not merely another successful Mapping.

It is an unauthorised exception expansion.

---

# We identify the affected population

An exception that cannot identify its affected records cannot be controlled.

We need more than:

```text
Approximately 600 records.
```

We need a reproducible population definition:

```text
All Wave 1 Product Plant records where:

Plant in {PL20, PL30}
and Planner Group is populated
and no approved Plant-specific conversion exists.
```

From that definition, we can generate:

- a count;
- a record list;
- a fingerprint;
- a readiness segment;
- a remediation backlog;
- a later reconciliation report.

This gives us an essential control:

> Every record that used the exception remains identifiable after the load.

Without that control, we cannot reliably remove or remediate the fallback later.

---

# We assign an accountable owner

The exception needs someone who owns the accepted risk.

That owner is not necessarily the developer who implements it.

For the MRP Controller fallback, responsibility may be split.

## Production Planning owner

Accepts the business consequence of controller `001`.

## Plant data owner

Confirms the affected scope.

## Migration lead

Accepts the delivery treatment for the rehearsal.

## Developer

Implements the bounded fallback.

We should still identify one accountable exception owner.

For example:

```text
Accountable owner:
Production Planning Data Owner

Implementation owner:
Migration Transformation Team
```

This distinction prevents a technical team from becoming the accidental owner of a business-risk decision.

Broader risk-management guidance similarly emphasises structured processes, continuous monitoring, responsibility and accountability rather than treating authorisation as a one-time technical event.

---

# We require an expiry condition

“Temporary” is not an expiry condition.

“Before go-live” is often too vague.

A controlled exception needs a machine-evaluable boundary.

It can expire by date:

```text
expires_on:
2026-08-15
```

It can expire after an event:

```text
expires_after:
Mock Load 2 completion
```

It can expire when a condition is achieved:

```text
expires_when:
approved conversion coverage reaches 100%
```

For the MRP Controller case, we may use both:

```text
Valid through:
Mock Load 2

Absolute expiry:
15 August 2026

Earlier closure condition:
All affected Planner Group and Plant combinations
have approved conversions.
```

The absolute date protects us if the event definition becomes ambiguous.

The condition allows earlier closure.

---

# Expiry must change system behaviour

Many governance processes record expiry dates but do nothing when the date passes.

That is calendar decoration.

For Martenweave, expiry should produce deterministic consequences.

Before expiry:

```text
Exception status:
active

Readiness treatment:
controlled exception
```

Near expiry:

```text
Exception status:
expiring

Readiness treatment:
warning

Required action:
close, replace or formally extend
```

After expiry:

```text
Exception status:
expired

Validation:
failed for affected production scope

Readiness:
blocked
```

The exact severity may depend on policy.

The important point is that an expired exception cannot remain invisible while the Mapping continues to populate values.

---

# We define the exit before approving the exception

A temporary workaround without a removal plan is deferred design, not controlled risk acceptance.

The exit plan for the MRP Controller fallback might be:

```text
1. Collect missing Planner Group and Plant combinations.
2. Obtain approved controller assignments from each Plant owner.
3. Update the canonical conversion value list.
4. Rerun affected Product Plant records.
5. Confirm zero production records use fallback 001.
6. Close the exception.
```

We also need closure evidence:

```text
Closure Evidence:
- approved conversion table;
- zero-fallback readiness report;
- planning-owner sign-off;
- successful MRP scenario test.
```

The exception should not be closed merely because someone removed a comment from the workbook.

It closes when the governed exit conditions are met.

---

# We distinguish exit from extension

The team may reach the expiry date without completing the conversion.

The easiest response is to edit:

```text
expires_on:
2026-08-15
```

to:

```text
expires_on:
2026-09-30
```

That destroys the decision history.

An extension is a new risk decision.

It should require a new proposal:

```text
PatchProposal:
Extend EXC-MRP-CONTROLLER-001
through Cutover Rehearsal 1.

Reason:
PL30 conversion approval remains incomplete.

Changed risk:
Fallback population increased from 640 to 910 records.

Required approval:
Production Planning Data Owner.
```

The original expiry remains visible.

We can then see:

- how often the exception was extended;
- whether the population grew;
- whether remediation progressed;
- whether the risk owner repeatedly deferred closure.

Repeated extensions are themselves a risk signal.

---

# We do not allow automatic renewal

Automated renewal would optimise for keeping the pipeline green.

It would remove the forcing function that makes exceptions temporary.

AI may prepare an extension proposal.

It may collect:

- current affected population;
- remediation status;
- changed impact;
- available Evidence;
- the consequences of expiry.

It must not approve the extension.

The owner must decide again whether the risk remains acceptable.

Our principle remains:

```text
AI prepares the case.

Validators enforce policy.

Humans renew or close the exception.
```

---

# We require compensating controls

The temporary fallback may be acceptable only because another control reduces its risk.

For the MRP Controller case, compensating controls might include:

- Product Plant records using `001` are reported separately;
- affected records are excluded from the first operational MRP run;
- Plant owners review the fallback population;
- no new Product is added to the exception automatically;
- the fallback is prohibited for production cutover.

We record these controls as part of the exception.

```text
Compensating controls:

- Tag every fallback record.
- Produce Plant-level exception report.
- Prevent production release without renewed approval.
- Reconcile affected records after conversion completion.
```

If a required control is absent, the exception is no longer valid even if its date has not expired.

---

# We preserve the risk being accepted

The exception should explain the consequence, not merely the deviation.

For example:

```text
Accepted risk:

Products using controller 001 may be assigned
to a temporary planning responsibility that does not
reflect the final Plant operating model.

Potential consequence:

Manual planning review and incorrect work allocation
during the rehearsal.
```

This helps reviewers judge whether the exception is proportionate.

It also prevents later reinterpretation.

The decision was not:

> `001` is correct.

The decision was:

> The programme accepts the bounded consequence of using `001` temporarily under specified controls.

That difference must survive.

---

# We represent the exception separately from the Mapping

A conceptual exception object could look like this:

```text
---
id: EXC-MRP-CONTROLLER-FALLBACK-001
type: Exception
status: active

deviates_from:
  - RULE-PLANT-SPECIFIC-MRP-CONTROLLER

implemented_by:
  - MAP-PRODUCT-PLANT-MRP-CONTROLLER

temporary_value:
  "001"

scope:
  plants:
    - PL20
    - PL30
  migration_stage:
    - MOCK-LOAD-2
  source_system:
    - LEGACY-EU

applies_when:
  - planner_group_present
  - plant_present
  - approved_conversion_missing

owner:
  ROLE-PRODUCTION-PLANNING-DATA-OWNER

expires_on:
  2026-08-15

exit_criteria:
  - approved_conversion_coverage_100_percent
  - zero_records_using_fallback

evidence:
  - EVID-MOCK2-MRP-CONTROLLER-GAP
  - DEC-MOCK2-FALLBACK-APPROVAL
---
```

This is a proposed product direction.

The current Martenweave repository supports canonical objects such as Rules, Evidence, Decisions and proposals, but our repository inspection did not identify a dedicated first-class Exception lifecycle in the current public model. The object above should therefore be understood as a recommended extension, not a description of guaranteed current functionality.

---

# We validate the exception itself

A valid exception should pass rules such as:

- `deviates_from` references an active Rule;
- the owner exists;
- the scope is not empty;
- the expiry is present;
- the exit criteria are defined;
- Evidence is linked;
- the implementation path exists;
- affected records can be identified;
- production use is not broader than the approval;
- the exception has not expired;
- extensions do not overwrite previous approvals.

We can introduce deterministic diagnostics such as:

```text
MW-EXC-001
Exception has no accountable owner.

MW-EXC-002
Exception has no expiry condition.

MW-EXC-003
Exception scope is broader than approved Decision.

MW-EXC-004
Expired exception remains referenced by active Mapping.

MW-EXC-005
Exception has no reproducible affected population.

MW-EXC-006
Required compensating control is missing.

MW-EXC-007
Exception was extended without a new Decision.

MW-EXC-008
Exception has no exit criteria.

MW-EXC-009
Production dataset contains records using test-only exception.
```

The diagnostics turn governance expectations into executable controls.

---

# We integrate exceptions into dataset readiness

A field should not be reported simply as complete because the fallback populated it.

For the Product planning dataset, a better readiness report is:

```text
MRP Controller:

Approved derivation:
94.0%

Controlled temporary exception:
6.0%

Unresolved:
0.0%

Technically populated:
100.0%
```

This preserves two different truths:

- every record has a value;
- not every value follows the intended final model.

A readiness score that counts fallback records as fully resolved rewards the continued use of exceptions.

We should instead distinguish:

```text
complete
```

from:

```text
complete through accepted exception
```

and:

```text
complete through expired or unauthorised fallback
```

Only the first two may be acceptable, and only within the approved scope.

---

# We integrate exceptions into impact analysis

When someone proposes changing the main Mapping, Martenweave should show related exceptions.

For example:

```text
Proposed change:
Remove controller 001 fallback logic.

Affected exception:
EXC-MRP-CONTROLLER-FALLBACK-001

Affected records:
640

Current status:
Active

Closure criteria:
Not yet met
```

Conversely, when the exception expires, impact analysis should show:

- affected datasets;
- affected records;
- affected Plants;
- related Mappings;
- blocked readiness reports;
- required owners;
- stale Evidence.

The exception becomes part of the dependency graph rather than an external note.

---

# We tag the records that used the exception

The canonical model alone cannot prove which actual records followed the fallback.

The transformation output should include a trace marker or produce a sidecar report.

Conceptually:

```text
PRODUCT_ID:
P-100045

PLANT:
PL30

MRP_CONTROLLER:
001

DERIVATION_PATH:
EXC-MRP-CONTROLLER-FALLBACK-001
```

This does not mean exposing internal governance IDs to every target system.

The marker can exist in:

- a load manifest;
- a reconciliation dataset;
- migration logs;
- Evidence output.

The essential requirement is that we can recover the population later.

Without record-level attribution, exception closure becomes guesswork.

---

# We verify that implementation matches the exception

The canonical exception says:

```text
PL20 and PL30 during Mock Load 2 only.
```

The transformation code may accidentally apply it to every Plant.

We need implementation evidence.

The readiness run should report:

```text
Approved exception usage:
640 records

Out-of-scope fallback usage:
73 records

Unexpected Plants:
PL40
```

The 73 records are not covered by the risk acceptance.

They are defects.

This prevents a common failure in which the existence of an approved exception is used to justify any similar fallback behaviour.

---

# We close exceptions through evidence, not status editing

The PL30 conversion is eventually completed.

The team updates the value list and reruns the dataset.

The report shows:

```text
Approved conversion:
100%

Fallback 001:
0 records
```

The planning owner confirms the result.

We close the exception with:

- closure date;
- closure Evidence;
- final affected population;
- remediation reference;
- model commit;
- replacement state.

The exception remains in history.

Its status becomes:

```text
closed
```

We do not delete it.

Later teams can understand:

- why fallback `001` appeared in Mock Load 2;
- which records were affected;
- why it was permitted;
- when it stopped;
- which change replaced it.

---

# We treat repeated exceptions as a model signal

One exception may be a reasonable response to a temporary constraint.

Repeated exceptions around the same Rule indicate a deeper problem.

If every mock load requires another MRP Controller fallback extension, the issue may be:

- incomplete source authority;
- weak ownership;
- an unrealistic target design;
- missing value-list governance;
- incorrect Product Plant grain;
- insufficient remediation capacity.

Martenweave should surface patterns such as:

```text
Rule:
RULE-PLANT-SPECIFIC-MRP-CONTROLLER

Exceptions:
4

Extensions:
3

Total duration:
126 days

Current affected population:
1,240 records
```

At that point, the programme should stop treating the issue as temporary.

It needs a model or delivery decision.

---

# We give the Workbench an exception view

Martenweave Workbench is currently positioned as a local interface for assessment, investigation, review, reports and controlled changes while canonical truth remains in model files.

A focused Exception view should show:

## Why the exception exists

The missing conversion and accepted risk.

## What Rule it deviates from

The expected Plant-specific derivation.

## Where it applies

Plants, wave, source, population and condition.

## Who owns it

Business owner and implementation owner.

## When it expires

Date, event and exit criteria.

## Which records use it

Count and reproducible population reference.

## Which controls are required

Reports, blocks and reviews.

## What happens next

Close, extend through a new proposal or allow expiry to block readiness.

This is much more useful than a generic list of open exceptions.

---

# The first product slice we should build

The next focused Martenweave capability should be **Temporary Exception Control**.

We do not need a generic enterprise waiver platform.

We need a narrow model-governance feature tied to Rules, Mappings, datasets and readiness.

## Goal

Prevent an approved migration fallback from remaining active outside its authorised scope or lifecycle.

## Initial scope

Support exceptions with:

- stable ID;
- governing Rule;
- implementation Mapping;
- business reason;
- accepted risk;
- scope;
- owner;
- start;
- expiry;
- compensating controls;
- exit criteria;
- Evidence;
- affected-population query;
- status.

## Required behaviour

1. Validate the exception definition.
2. Detect missing owner or expiry.
3. identify records using the exception.
4. separate exception coverage from normal readiness.
5. fail when usage exceeds scope.
6. warn before expiry.
7. block or downgrade readiness after expiry.
8. require a new proposal for extension.
9. preserve historical exception versions.
10. verify closure through Evidence.

---

# Proposed commands

A future CLI could expose:

```text
martenweave exception list \
  --repo ./model \
  --status active
```

```text
martenweave exception check \
  EXC-MRP-CONTROLLER-FALLBACK-001 \
  --repo ./model \
  --dataset ./data/product-plant.csv
```

```text
martenweave exception impact \
  EXC-MRP-CONTROLLER-FALLBACK-001 \
  --repo ./model
```

```text
martenweave exception close \
  EXC-MRP-CONTROLLER-FALLBACK-001 \
  --evidence EVID-MOCK3-ZERO-FALLBACK \
  --dry-run
```

These commands describe a product direction. They are not part of the currently documented CLI contract.

The current Martenweave foundation already covers canonical model files, deterministic validation, gap detection, lineage, impact, dataset readiness and human-reviewed proposals.

---

# We define success operationally

The feature succeeds when we can answer:

1. Which Rule is being bypassed?
2. Why was the deviation accepted?
3. Who accepted it?
4. Which records and organisational scopes are covered?
5. Which records actually used it?
6. Which controls reduce the risk?
7. When does it expire?
8. What must happen before closure?
9. Has it been extended before?
10. What happens automatically when it expires?

It does not succeed merely because we created an Exception object.

The object must influence:

- validation;
- readiness;
- impact;
- proposals;
- reporting;
- closure.

---

# What we should not build

We should not turn Martenweave into:

- a generic policy-waiver platform;
- an enterprise risk-management suite;
- a ticketing system;
- a workflow engine;
- a direct SAP remediation service.

The exception feature belongs inside the model layer.

It exists to govern deviations from canonical model Rules during migration, MDM, data governance and AMS work.

That boundary keeps the product focused.

---

# The economic pain we remove

Temporary exceptions create hidden costs when they are not controlled:

- incorrect records survive into production;
- defaults conceal incomplete mappings;
- readiness scores become misleading;
- local workarounds spread to other scopes;
- teams repeat manual remediation;
- expired approvals remain in code;
- AMS inherits unexplained behaviour;
- future programmes treat a workaround as design.

The cost is not only the wrong value.

It is the loss of distinction between:

```text
accepted temporary risk
```

and:

```text
approved permanent model
```

Martenweave should preserve that distinction explicitly.

---

# Final perspective

We do not prevent temporary migration exceptions by banning them.

We prevent them from becoming permanent by giving them an enforceable lifecycle.

For the MRP Controller fallback, we preserve:

- the Rule being bypassed;
- the reason for the deviation;
- the approved Plants and migration stage;
- the affected population;
- the accepted business risk;
- the accountable owner;
- the compensating controls;
- the expiry;
- the exit criteria;
- the Evidence required for closure.

The correct chain is:

```text
Gap
→ Decision
→ bounded Exception
→ monitored usage
→ remediation
→ evidenced closure
```

The dangerous chain is:

```text
Gap
→ default value
→ successful load
→ forgotten workaround
→ permanent behaviour
```

The practical test is:

> Can the system distinguish a record that satisfies the approved model from a record that is populated only because a temporary, still-valid exception was applied?

When the answer is yes, readiness becomes honest.

When the answer is:

> Both records have an MRP Controller, so both are complete,

the programme has allowed technical completeness to hide model debt.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We are building Martenweave so that temporary migration decisions remain temporary in practice—not only in meeting notes.

Our operating model is:

```text
Canonical Rules define the expected state.

Exceptions permit bounded deviation.

Validators enforce scope and expiry.

AI prepares proposals and Evidence.

Humans accept or renew risk.

Git records the history.
```

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

## Sources and notes

This article was reviewed on 15 July 2026.

Martenweave Core currently defines canonical files as the source of truth, generated indexes as disposable, deterministic validation as mandatory before indexing and AI-generated changes as reviewable proposals.

Its documented pipeline moves from Evidence and profiling through validation, dataset and model gaps, lineage, impact and PatchProposals to human-reviewed GitHub issues or pull requests.

NIST’s Risk Management Framework describes risk management as a disciplined, structured and flexible lifecycle process that includes control implementation, assessment, authorisation and continuous monitoring. It also emphasises responsibility and accountability for implemented controls. The framework concerns security and privacy risk rather than migration mappings specifically, but its lifecycle and accountability principles support the approach to time-bounded exceptions described here.

NIST SP 800-53 describes controls as flexible and customisable components of an organisation-wide risk-management process and distinguishes both control functionality and assurance. This article applies a similar general distinction: implementing a fallback is not enough; we also need confidence that its scope, approval, monitoring and expiry are being enforced.

A dedicated Exception object, exception-specific diagnostics, record-level usage tracking, expiry enforcement and the proposed CLI commands are product directions. Our current repository inspection did not identify these as a complete first-class lifecycle in the published Martenweave model. They should not be interpreted as guaranteed current functionality until implemented and released.

Martenweave is independent and is not affiliated with or endorsed by SAP or NIST.
