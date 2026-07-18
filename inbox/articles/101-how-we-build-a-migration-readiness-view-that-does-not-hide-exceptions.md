# How We Build a Migration Readiness View That Does Not Hide Exceptions

**Reviewed: 15 July 2026**

The Supplier migration dashboard shows:

```
Records complete:
99.6%

Validation passed:
99.4%

Load success:
99.8%

Overall readiness:
Green
```

The programme reports that Supplier master data is nearly ready for cutover.

Then Treasury asks a different question:

> How many payment-active Suppliers still have bank details without current verification?

The answer is 40.

Procurement asks:

> How many Suppliers were loaded without the purchasing-organisation extension required for the first purchase orders?

The answer is 70.

The MDM team asks:

> How many Suppliers still belong to unresolved duplicate clusters?

The answer is 110.

The migration lead asks:

> How many records are treated as ready only because a temporary Exception is still active?

The answer is 700.

The dashboard was not mathematically wrong.

It was operationally incomplete.

It measured:

- populated fields;
- passed technical validations;
- successful load messages.

It did not show:

- unresolved identity decisions;
- temporary defaults;
- expiring Exceptions;
- blocked business processes;
- stale Evidence;
- incomplete organisational extensions;
- records that were never assessed under the current Rule set.

This is one of the most persistent pains in SAP migration, MDM and MDG programmes.

A dashboard can become greener while the business risk becomes harder to see.

> A readiness view fails when it converts unresolved conditions into a reassuring average.

We do not want Martenweave to produce another percentage that programme teams can copy into a steering slide.

We want it to answer a harder question:

> Which master-data populations are demonstrably ready for their intended business use, which are ready only under controlled conditions, and which remain unsafe or unproven?

That requires more than counting populated fields.

It requires us to combine:

- canonical model Rules;
- migration scope;
- source authority;
- mappings;
- validation results;
- duplicate-resolution status;
- Decisions;
- Exceptions;
- Evidence freshness;
- target-load results;
- business-process consequences.

Martenweave already provides the architectural foundation for this direction. The current core turns datasets, validation reports, Decisions and SAP context into canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-reviewed proposals. It also exposes a dataset-readiness workflow while keeping canonical files authoritative.

The next step is to make readiness an explainable model assessment rather than a cosmetic score.

# Technical success is not migration readiness

A Supplier record can be technically successful and still be unready.

The load tool may report success because:

- the Business Partner was created;
- the mandatory target fields were accepted;
- no technical error message was returned.

The Supplier may still be unable to support the intended process.

For example:

- the Supplier exists but lacks the required company-code role;
- the company-code role exists but payment methods are incomplete;
- the purchasing organisation is missing;
- the bank account was loaded but is not currently verified;
- tax classification is defaulted rather than approved;
- the Supplier belongs to an unresolved duplicate cluster;
- the target record exists but replication to a consuming system failed;
- the record is valid only because an Exception permits temporary treatment.

The technical load answers:

> Could the system accept this record?

Migration readiness asks:

> Can the organisation safely use this record for the process for which it is being migrated?

Those are different questions.

# MDG status is not automatically migration readiness

SAP positions Master Data Governance around governed master-data models, golden records, matching and merging, workflow-based governance, data-quality Rules, monitoring and auditable changes. Those capabilities are valuable and directly relevant to long-term master-data control.

But an MDG workflow status alone does not answer every migration-readiness question.

A change request may be approved while:

- the migration Mapping still uses an older source extract;
- the approved record has not been replicated to the target landscape;
- the cutover file was produced before approval;
- a duplicate decision applies to one system but not another;
- required organisational extensions remain outside the MDG change;
- the target load produced a different result;
- the Evidence proving the approval has become stale.

Likewise, a consolidated golden record may be governed correctly but not yet included in the current migration wave.

We should therefore not treat any single system status as the whole readiness state.

MDG can contribute authoritative Evidence.

The migration registry must connect that Evidence to the actual wave, dataset, Mapping, target load and business-use scope.

# Our Supplier migration case

We have 50,000 Supplier records in Wave 1.

A conventional dashboard reports:

```
Required fields populated:
49,800

Records passing validation:
49,700

Records loaded:
49,900
```

Depending on the chosen denominator, the programme can report readiness above 99 percent.

We build a different classification.

```
Ready:
48,900

Ready with controlled Exception:
700

Not ready:
220

Not assessed under current baseline:
100

Removed from scope by approved Decision:
80
```

The total remains 50,000.

Nothing disappears into an average.

Each record belongs to one explicit state.

The readiness view can still calculate percentages, but the primary information is categorical.

```
Ready:
97.8%

Controlled:
1.4%

Not ready:
0.44%

Not assessed:
0.20%

Approved out of scope:
0.16%
```

The 0.44 percent may include the most important records in the dataset.

We therefore do not stop at percentages.

# The states we need

A useful migration-readiness view requires a controlled vocabulary.

## Ready

The record satisfies the current Rules for the intended process.

Required Evidence is current.

No unresolved critical Finding applies.

No temporary Exception is required.

## Ready with controlled Exception

The record does not fully satisfy the intended final model, but an approved Exception permits its use under defined controls.

The Exception must have:

- scope;
- owner;
- expiry;
- compensating control;
- closure path.

This is not the same as fully ready.

## Not ready

A current Rule or business gate is not satisfied.

No valid Exception covers the condition.

The record may be technically loadable but operationally unsafe or incomplete.

## Not assessed

The current baseline does not contain valid Evidence for the record.

This may happen because:

- the validator did not run;
- the source dataset was missing;
- the record entered scope after the latest assessment;
- current Evidence became stale;
- a new Rule was introduced.

Not assessed must never be converted into passed.

## Approved out of scope

A current, authorised Decision removes the record from the assessed population.

The Decision and its rationale must remain traceable.

Filtering a record from a file is not enough.

## Blocked by dependency

The record may satisfy its own local checks, but a required related object or process is not ready.

For example:

- Supplier general data exists;
- company-code extension is missing;
- payment readiness is therefore blocked.

This state is often essential in master data, where business use depends on several connected segments.

# Why “complete” is a dangerous label

In master-data projects, completeness often means:

```
Required column is not empty.
```

That is useful but weak.

A populated field can contain:

- a placeholder;
- a default;
- a copied legacy value;
- a value from the wrong authority;
- a technically valid but outdated code;
- a value accepted only for a mock load;
- an unresolved survivor value from duplicate consolidation.

For the Supplier bank case:

```
BANK_VERIFICATION_STATUS = VERIFIED
```

looks complete.

But we still need to know:

- which authority produced the status;
- which bank account it applies to;
- whether the account changed later;
- whether the status remains current;
- whether the target payment control uses it correctly.

The readiness view should distinguish:

```
Populated
```

from:

```
Semantically valid
```

and from:

```
Ready for business use
```

# We classify values by derivation path

A field should not contribute equally to readiness regardless of how it was produced.

For example, MRP Controller, payment terms or tax classification may be derived through:

- approved source authority;
- approved deterministic Mapping;
- steward-approved enrichment;
- controlled temporary fallback;
- unapproved default;
- manual override with no Evidence.

These paths have different governance meaning.

For the Supplier bank case:

```
Current Treasury verification:
ready

Approved temporary payment block:
controlled

Legacy VERIFIED flag:
not ready unless accepted by Decision

Hard-coded VERIFIED value:
invalid
```

The readiness view must retain the derivation path.

Otherwise a default value can make a column appear complete while increasing model debt.

# We expose Exceptions instead of absorbing them

A common readiness formula counts an approved Exception as a pass.

That hides the fact that the final model is not yet satisfied.

Suppose 700 Suppliers are allowed to migrate with payment block while verification is completed.

A conventional dashboard may classify them as ready because cutover can continue.

We classify them separately:

```
Fully ready:
48,900

Ready under Exception:
700
```

The Exception population should show:

- business reason;
- affected process;
- owner;
- expiry;
- current compensating control;
- remaining remediation;
- Evidence freshness.

A steering committee can then make a deliberate decision.

It cannot claim that the 700 records are identical to fully governed Suppliers.

# We show when Exceptions are concentrating

Seven hundred controlled records may be acceptable when distributed across inactive Suppliers.

The same number may be dangerous when concentrated in:

- one critical company code;
- one high-volume purchasing organisation;
- strategic Suppliers;
- the first payment run;
- one Plant needed for production start.

The readiness view should segment controlled populations by business context.

For our case:

```
Controlled Suppliers:
700

Inactive or future-use Suppliers:
420

Payment-blocked Suppliers:
240

Payment-active Suppliers:
40
```

The 40 require a different decision from the 420.

A single Exception count would hide that distinction.

# We do not treat unresolved duplicates as ordinary validation failures

Duplicate management is a core MDM and MDG concern.

A potential duplicate is not merely a missing value.

It raises identity questions:

- Are these records the same business entity?
- Which record survives?
- Which identifiers remain valid?
- Which bank accounts, tax numbers and organisational roles belong to the survivor?
- Which source is authoritative for each Attribute?
- Will open transactions still reference the correct object?
- Does consolidation create a different target key?

SAP describes MDG capabilities around matching, merging, semantic reconciliation and golden-record creation.

For migration readiness, we should distinguish at least:

```
No duplicate candidate:
ready for identity gate

Candidate reviewed and accepted as separate:
ready

Duplicate merged with approved survivor:
ready if downstream mappings are updated

Candidate unresolved:
not ready or explicitly controlled

Automatically matched but not steward-approved:
not yet governed
```

A match score does not equal a business identity Decision.

A readiness percentage that counts every processed match as resolved can hide a serious cutover risk.

# We make organisational extensions visible

Supplier and Business Partner readiness is rarely one flat record.

Different business processes require different segments.

A Supplier may need:

- general Business Partner data;
- Supplier role;
- company-code data;
- purchasing-organisation data;
- bank data;
- withholding-tax data;
- partner functions;
- payment methods;
- reconciliation account;
- purchasing settings.

A global completeness score can hide missing extensions.

For example:

```
Supplier created:
yes

Company-code extension:
yes

Purchasing organisation:
no

Bank verification:
controlled

Overall:
loaded successfully
```

For payment, the record may be controlled.

For procurement, it is not ready.

We therefore need process-specific readiness.

# One record can have several readiness results

The same Supplier can be:

```
Ready for purchasing:
no

Ready for invoice posting:
yes

Ready for payment:
controlled

Ready for reporting:
yes
```

This is not inconsistency.

It reflects how master data supports different processes.

The canonical model should connect Rules and Attributes to the business capabilities they enable.

The readiness view can then answer:

- ready for what;
- under which organisational context;
- using which Evidence;
- with which remaining conditions.

A single Supplier-level traffic light is often too coarse.

# We build readiness from gates

Instead of averaging all checks, we define gates.

For the Supplier case:

## Identity gate

- duplicate status resolved;
- canonical Supplier identity assigned;
- key mappings valid.

## Governance gate

- source authority defined;
- required Decisions approved;
- no expired Exception governs the record.

## Structural gate

- required Supplier roles and organisational extensions exist.

## Data-quality gate

- critical Rules pass;
- required Attributes are semantically valid.

## Payment-control gate

- current bank verification exists;
- or payment block is confirmed under an approved Exception.

## Migration-execution gate

- transformed record matches the approved Mapping;
- target load succeeded;
- target reconciliation completed.

## Evidence gate

- validation and target Evidence are current for the present baseline.

A record is ready for a process only when the required gates are satisfied.

# Gates can have zero-tolerance Rules

We should not average a critical failure into a high score.

Suppose the Supplier has 200 evaluated Attributes.

199 pass.

One fails:

```
Payment-active bank account has no current verification
and no payment block.
```

Attribute-level readiness is:

```
99.5%
```

Business readiness is:

```
Not ready for payment
```

The payment-control gate has zero tolerance.

The readiness model must preserve that policy.

Otherwise the programme can present a near-perfect score while violating the most important control.

# We separate controlled from unresolved

A failed Rule can lead to three different outcomes.

## Resolved

The condition is corrected and current Evidence proves it.

## Controlled

The condition remains, but a valid compensating control and Exception govern it.

## Unresolved

Neither the final condition nor an accepted control is present.

These categories should never be merged into one “accepted” bucket.

For our 180 Suppliers without current verification:

```
Payment block confirmed:
140 controlled

Payment block absent:
40 unresolved
```

Reporting only:

```
180 verification issues
```

is too weak.

Reporting:

```
180 accepted exceptions
```

would be false.

# We show stale Evidence as a readiness gap

A Supplier may have passed validation in RC5.

The Rule or Mapping changes before RC6.

The old result becomes stale.

The Supplier should not remain silently green.

Its state may become:

```
Previously ready

Current readiness:
not assessed

Reason:
bank-verification Mapping changed after latest Evidence
```

This is operationally uncomfortable.

It is correct.

A migration-readiness view should distinguish lack of current proof from confirmed failure.

Both require action, but not the same action.

# We distinguish unknown from zero

This is a basic but frequently violated reporting rule.

These statements are not equivalent:

```
Unresolved duplicate clusters:
0
```

```
Unresolved duplicate clusters:
unknown
```

The second may mean:

- duplicate check not run;
- matching dataset incomplete;
- current Rule unavailable;
- results not imported;
- current wave not assessed.

Dashboards often display blank, null or unavailable values as zero.

Martenweave should fail closed for critical readiness dimensions.

Unknown must remain visible.

# We retain denominators

A percentage without a denominator is dangerous.

For example:

```
Bank readiness:
100%
```

may mean:

- 50,000 of 50,000 assessed records passed;
- 40,000 of 40,000 assessed records passed while 10,000 were not assessed;
- 700 Exception records were counted as passed;
- out-of-scope records were silently removed.

We report:

```
Current scope:
50,000

Assessed:
49,820

Fully ready:
48,900

Controlled:
700

Not ready:
220

Not assessed:
100

Approved out of scope:
80
```

Every percentage can be reconstructed.

# We preserve scope changes

Migration populations change constantly.

Records are:

- added;
- removed;
- deferred;
- merged;
- split;
- reclassified;
- moved to another wave.

A readiness view must explain changes in the denominator.

For example:

```
RC5 scope:
49,800

RC6 scope:
50,000

Added:
280

Removed by approved Decision:
80
```

A percentage improvement may be caused by removing difficult records.

That may be a valid scope Decision.

It must remain visible.

# We make ownership part of readiness

An unresolved critical Finding with no owner is worse than an equivalent Finding with an active remediation plan.

But ownership alone does not make the data ready.

We show it separately:

```
Not-ready records:
220

Owner assigned:
190

Owner unresolved:
30
```

For controlled Exceptions:

```
Valid owner and approver:
680

Owner no longer resolvable:
20
```

The latter 20 may no longer qualify as controlled.

A control without accountable ownership is weak governance.

# We make expiry visible

Temporary decisions must not remain green indefinitely.

The readiness view should show:

```
Controlled Exceptions:
700

Expiring before cutover:
25

Expired:
8

No expiry declared:
3
```

Expired Exceptions should move records out of the controlled state.

They become unresolved until:

- the final condition is met;
- a new extension is approved;
- another valid treatment is established.

# We do not hide readiness behind one composite score

A composite score may still be useful for trend reporting.

It should be secondary.

A score such as:

```
Readiness score:
96
```

cannot explain whether:

- a payment gate is blocked;
- duplicate identity is unresolved;
- current Evidence is missing;
- 700 records rely on temporary Exceptions.

The primary view should show gate states and population categories.

The score can summarise them only after zero-tolerance conditions are applied.

For example:

```
Readiness score:
96

Gate result:
Not ready

Critical blocker:
40 payment-active Suppliers without verified bank control
```

This prevents the score from overruling the model.

# We show progress without disguising risk

Teams need visible progress.

A truthful readiness model can still show improvement.

For example:

```
Mock Load 2

Ready:
42,100

Controlled:
3,000

Not ready:
4,200

Not assessed:
700
```

```
Cutover RC5

Ready:
48,900

Controlled:
700

Not ready:
220

Not assessed:
100
```

The trend is strong.

The remaining 220 still matter.

The team can demonstrate progress without pretending that the last critical blockers disappeared.

# We distinguish remediation backlog from readiness

A record may be ready while improvement work remains.

For example:

- bank verification exists;
- payment control is safe;
- account-holder formatting remains inconsistent.

The formatting issue may remain in the backlog.

It does not necessarily block cutover.

Conversely, a record may have no open issue because nobody created one.

That does not make it ready.

We keep:

```
Readiness state
```

separate from:

```
Delivery-task state
```

This follows Martenweave’s broader boundary: canonical model governance stays in the model layer, while GitHub or ITSM manages execution. The current repository explicitly avoids becoming a generic workflow platform and describes GitHub issues and pull requests as reviewed delivery outputs.

# We make every green state explainable

For a Supplier shown as ready, a user should be able to ask:

- Which Rules were evaluated?
- Which version was used?
- Which dataset contained the record?
- Which Mappings produced the values?
- Which duplicate Decision applies?
- Which organisational contexts were assessed?
- Which target load was reconciled?
- Which Evidence proves the result?
- Which Exceptions were considered?
- When will the Evidence become stale?

The answer should be reproducible.

Green should be a traceable conclusion, not a manually selected colour.

# We build readiness at several levels

## Record level

Is this Supplier ready for a defined business use?

## Segment level

How many Suppliers are ready within a company code, purchasing organisation, source system or wave?

## Finding level

Which unresolved conditions block readiness?

## Gate level

Which business capabilities are blocked?

## Programme level

What is the overall state without hiding critical minority populations?

These levels should reconcile.

The programme total must be explainable through the underlying records and gates.

# A conceptual readiness assessment

A focused assessment might look like:

```
---
id: READINESS-SUPPLIER-WAVE1-RC6
type: ReadinessAssessment

scope:
  domain: supplier
  migration_wave: WAVE-1
  baseline: CUTOVER-RC6

population:
  total: 50000
  ready: 48900
  controlled: 700
  not_ready: 220
  not_assessed: 100
  approved_out_of_scope: 80

gates:
  identity:
    status: blocked
    unresolved_records: 110

  structural:
    status: blocked
    unresolved_records: 70

  payment_control:
    status: blocked
    unresolved_records: 40
    controlled_records: 700

  migration_execution:
    status: ready

  evidence:
    status: partially_ready
    stale_records: 100

overall:
  status: not_ready

critical_reason:
  Payment-active Suppliers remain
  without current verification or confirmed payment block.
---
```

This is a proposed product direction.

It is not a claim about the exact current Martenweave schema.

# We make classifications mutually exclusive

At one assessment baseline, each record should have one top-level readiness state.

A record cannot be counted simultaneously as:

- fully ready;
- controlled;
- not ready.

It may have several underlying Findings.

Its top-level state follows the most restrictive applicable gate.

For example:

```
Identity:
ready

Structure:
ready

Payment:
controlled

Overall:
controlled
```

Another record:

```
Identity:
not ready

Payment:
controlled

Overall:
not ready
```

This prevents double counting.

# We retain the reasons behind the state

The top-level state is not enough.

A controlled record should identify:

- Exception ID;
- affected Rule;
- compensating control;
- expiry;
- approver.

A not-ready record should identify:

- blocking Finding;
- failed gate;
- owner;
- required action.

A not-assessed record should identify:

- missing Evidence;
- stale dependency;
- required validation.

The dashboard becomes an entry point into the model trace.

# We show readiness by business use

For the Supplier domain, the view might include:

```
Purchasing readiness:
49,650 ready
210 controlled
60 not ready
80 not assessed

Payment readiness:
48,900 ready
700 controlled
40 not ready
280 not assessed

Invoice-posting readiness:
49,720 ready
120 controlled
80 not ready
80 not assessed
```

These are conceptual numbers, but the principle is important.

Master data is not ready in the abstract.

It is ready for a defined use under defined conditions.

# We integrate duplicate and consolidation status

For MDM and MDG programmes, duplicate status must participate directly in readiness.

We can classify:

```
No candidate found:
ready

Candidate reviewed, separate entities confirmed:
ready

Merge approved and survivor mapped:
ready

Merge approved but downstream key mapping incomplete:
not ready

Candidate unresolved:
not ready

Auto-match accepted temporarily:
controlled only with explicit Decision
```

This avoids a familiar failure:

- duplicate detection was run;
- match scores were generated;
- the dashboard reports the activity as complete;
- the business identity Decisions remain unresolved.

Process completion is not outcome completion.

# We integrate replication and target state

An MDG record may be approved centrally.

A migration record may be technically transformed.

Readiness still depends on whether the required consuming state exists.

For example:

```
MDG approval:
complete

S/4 Business Partner:
created

Company-code extension:
created

Purchasing extension:
failed

Downstream procurement readiness:
not ready
```

The readiness view should connect governance Evidence with migration and replication Evidence.

No single system has to own the whole process.

Martenweave stores the cross-system model trace.

# We integrate source authority

Two sources may contain payment terms.

Both fields may be populated.

Readiness remains unresolved if the programme has not decided which source is authoritative.

For example:

```
Legacy Finance:
Z030

Procurement Portal:
Z060

Target:
Z030

Authority Decision:
missing
```

A technical validator may accept the target value because it is syntactically valid.

The readiness view should classify the Attribute as unresolved.

Without source authority, a populated value is not governed truth.

# We expose manual overrides

Manual correction is sometimes necessary.

The readiness view must distinguish:

```
Manual correction with approved Evidence:
ready

Manual correction awaiting owner approval:
not assessed or not ready

Manual override contradicting canonical Mapping:
not ready

Manual fallback covered by current Exception:
controlled
```

This is especially important during cutover, when teams may edit files directly under schedule pressure.

A corrected cell must not become invisible model truth.

# We treat defaults as debt

Default values are not inherently bad.

Some are genuine business defaults.

Others are temporary migration conveniences.

The readiness view should classify them by authority.

```
Approved business default:
ready

Temporary fallback:
controlled

Undocumented constant:
not ready

Default applied outside approved scope:
not ready
```

This distinction applies across domains:

- MRP Controller;
- payment terms;
- reconciliation account;
- shipping condition;
- purchasing group;
- tax classification.

The value itself does not reveal whether it is governed.

# The Workbench view we need

A strong readiness page should begin with:

## Overall gate

Not ready.

## Critical blockers

- 40 payment-active Suppliers without verified bank control.
- 110 records in unresolved duplicate clusters.
- 70 records missing required purchasing extension.

## Population state

- 48,900 ready.
- 700 controlled.
- 220 not ready.
- 100 not assessed.
- 80 approved out of scope.

## Exception health

- 700 active.
- 25 expiring.
- 8 expired.
- 3 without valid owner.

## Evidence health

- 49,820 currently assessed.
- 100 stale or missing.
- latest baseline and model commit.

## Process readiness

- purchasing;
- invoicing;
- payment;
- reporting.

## Trace

Every number links to:

- records;
- Findings;
- Rules;
- Decisions;
- Exceptions;
- Evidence;
- owners.

The view should not begin with a large green percentage.

# The first product slice we should build

The next focused Martenweave capability should be **Exception-Aware Migration Readiness**.

## Goal

Produce an explainable readiness assessment that separates fully compliant records, controlled Exceptions, unresolved Findings, unassessed records and approved scope exclusions.

## Initial inputs

- migration population;
- canonical Rules;
- process gates;
- validation results;
- duplicate-resolution Decisions;
- organisational extensions;
- active Exceptions;
- Evidence freshness;
- target reconciliation;
- approved scope Decisions.

## Initial record states

- ready;
- controlled;
- not ready;
- not assessed;
- approved out of scope;
- blocked by dependency.

## Initial gate types

- identity;
- governance;
- structural;
- data quality;
- business control;
- migration execution;
- Evidence freshness.

## Required outputs

- overall gate result;
- population breakdown;
- business-process readiness;
- critical blockers;
- Exception health;
- Evidence health;
- denominator changes;
- traceable reasons;
- targeted remediation list.

# Proposed commands

A future CLI might support:

```
martenweave readiness build \
  --repo ./model \
  --scope supplier-wave1 \
  --dataset ./data/supplier-rc6.csv
```

```
martenweave readiness explain \
  READINESS-SUPPLIER-WAVE1-RC6 \
  --repo ./model
```

```
martenweave readiness gates \
  --scope supplier-wave1 \
  --repo ./model
```

```
martenweave readiness exceptions \
  --scope supplier-wave1 \
  --repo ./model
```

```
martenweave readiness compare \
  READINESS-SUPPLIER-ML2 \
  READINESS-SUPPLIER-RC6 \
  --repo ./model
```

These commands describe a product direction.

They are not part of the currently documented CLI contract.

The existing Martenweave core already includes the canonical-file, validation, dataset-gap, lineage, impact and dataset-readiness foundation required to build this slice.

# Acceptance criteria

We should consider the capability useful when it prevents each of these false-green outcomes:

1. A record with an unapproved default is counted as fully ready.
2. A valid temporary Exception is hidden inside the passed population.
3. An expired Exception remains green.
4. An unresolved duplicate candidate is counted as complete.
5. A Business Partner exists but a required organisational extension is missing.
6. A field is populated from an undefined source authority.
7. A record was never assessed under the current Rule version.
8. old Evidence is reused after a material Mapping change.
9. a successful load is treated as proof of business-process readiness.
10. a 99-percent score hides a zero-tolerance payment-control failure.

The view must also remain usable.

It should explain the blocker without requiring a programme manager to inspect every model file.

# What we should not build

We should not turn Martenweave into:

- a generic BI platform;
- a project portfolio dashboard;
- a replacement for SAP MDG monitoring;
- a replacement for migration load tools;
- a workflow engine;
- a general data-observability platform.

The readiness view should remain a generated assessment over canonical model truth and current Evidence.

Its purpose is:

> Explain whether the current migration population is safe for its intended business use and why.

# The business value

Poor readiness reporting creates predictable damage.

It encourages teams to:

- optimise field completion rather than business safety;
- hide Exceptions inside pass rates;
- count loaded records as usable records;
- postpone duplicate Decisions;
- ignore missing organisational segments;
- reuse stale Evidence;
- remove difficult records without explaining scope changes;
- declare success before business owners can verify the result.

An exception-aware readiness view changes the conversation.

Instead of:

```
Supplier readiness is 99.6%.
```

we can say:

```
48,900 Suppliers are fully ready.

700 are usable only under approved,
time-bounded controls.

220 remain blocked.

100 have no current Evidence.

The payment gate cannot close
because 40 Suppliers remain uncontrolled.
```

That statement is less comfortable.

It is more useful.

# Final perspective

Migration readiness should not be a reward for producing a high percentage.

It should be a defensible statement about business use.

For our Supplier population, we do not ask only:

```
Were the fields populated?

Did the validation job finish?

Did the load succeed?
```

We ask:

```
Is identity resolved?

Is source authority approved?

Are required organisational segments present?

Are critical Rules satisfied?

Are Exceptions current and controlled?

Is Evidence valid for this baseline?

Did the target state preserve the control?

Can the intended process operate safely?
```

The practical test is:

> Can we separate records that satisfy the intended model from records that are usable only because of a temporary control, and can we prevent either category from hiding unresolved or unassessed records?

When the answer is yes, readiness becomes a governance instrument.

When the answer is:

> The dashboard is green because almost every field has a value,

we are measuring file completion rather than migration readiness.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We are building Martenweave so that migration programmes can report progress without converting uncertainty, temporary treatment and unresolved master-data risk into a reassuring average.

Our operating model is:

```
Canonical Rules define readiness.

Validation produces observations.

Findings explain blockers.

Exceptions preserve controlled deviation.

Evidence proves the current state.

Business gates prevent averages
from hiding critical failures.

Humans approve readiness.
```

Martenweave is an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

## Sources and notes

This article was reviewed on 15 July 2026.

Martenweave Core currently describes an open-source, backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS. It turns datasets, tickets, validation reports, Decisions and SAP context into canonical model files, deterministic validation, dataset gaps, lineage, impact analysis and human-approved AI proposals.

Its current principles keep canonical files authoritative, generated indexes disposable, validation deterministic and AI changes proposal-first.

Its documented workflow already includes dataset and model-gap detection, lineage, impact analysis and a one-command dataset-readiness flow.

SAP describes SAP Master Data Governance as a governance layer for master data, with governed models, golden records, profiling, matching, merging, semantic reconciliation, workflow, data-quality Rules, monitoring and auditable data changes. These capabilities provide important governance and quality Evidence; the migration-specific readiness model described here additionally connects them to wave scope, mappings, target loads, Exceptions and business-process gates.

The ReadinessAssessment object, process gates, mutually exclusive readiness states, Exception-health view and proposed commands are product directions. They should not be interpreted as guarantees of the exact current Martenweave schema, Workbench behaviour or CLI until implemented and released.

Martenweave is independent and is not affiliated with or endorsed by SAP.
