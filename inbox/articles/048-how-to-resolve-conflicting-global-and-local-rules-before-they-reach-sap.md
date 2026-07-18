# How to Resolve Conflicting Global and Local Rules Before They Reach SAP Configuration

**Reviewed: 14 July 2026**

The global design states:

> Tax Registration Number is mandatory for supplier organisations.

The Portuguese team adds:

> Non-resident supplier organisations may proceed without a Portuguese tax number when approved exemption evidence exists.

The migration team adds another condition:

> During Mock Load 2, records with missing tax numbers may load with a warning.

The SAP configuration team receives all three requirements.

They must now decide what the system should do for a non-resident Portuguese supplier during Mock Load 2.

Should the record:

- pass because it is non-resident;
- fail because the global rule is mandatory;
- pass with warning because the migration exception is active;
- require exemption evidence;
- remain blocked from final activation?

The configuration team asks for clarification.

The answer arrives in fragments:

- the global rule is in the design workbook;
- the Portuguese exception is in meeting minutes;
- the migration treatment is in Jira;
- the evidence requirement is in a compliance email;
- the final-activation restriction exists only in a test script.

A developer eventually implements an interpretation.

The configuration now works, but nobody can state confidently whether it reflects the approved business model.

This is the critical point:

> When conflicting rules reach SAP configuration unresolved, configuration stops being implementation and starts becoming accidental governance.

The person writing BRFplus logic, a derivation, validation, workflow condition or custom enhancement is forced to decide:

- which rule has priority;
- which context is more specific;
- whether an exception cancels the rule or only postpones it;
- whether a warning is allowed at creation, activation or migration load;
- which evidence is required.

Those are not merely technical decisions.

They define the effective model.

The conflict must therefore be resolved before configuration begins.

---

## Conflict is often hidden by compatible wording

Rules do not need to contradict each other directly to create conflict.

Consider these statements:

```text
Global:
Supplier Risk is required for active strategic suppliers.

Local:
Portuguese regulated suppliers require compliance clearance.

Migration:
Records without Supplier Risk may enter the review queue.

Operational:
Final supplier activation requires all mandatory data.
```

Each statement can be valid.

The conflict appears only when the programme tries to apply them to one record.

For a Portuguese regulated strategic supplier with no Supplier Risk:

- Is review-queue entry permitted?
- Is compliance clearance possible before risk classification?
- Does “required” mean required at creation or activation?
- Is the migration queue a temporary process or a change to the global rule?
- Which status may be distributed to downstream systems?

A rule conflict is therefore not simply:

```text
Rule A says yes.
Rule B says no.
```

It may be:

- different lifecycle moments;
- overlapping contexts;
- inconsistent granularity;
- competing owners;
- unclear precedence;
- one rule about data and another about process;
- permanent policy mixed with temporary treatment.

The resolution process must expose these dimensions.

---

# First, rewrite every rule into the same shape

Conflicts remain difficult when rules are written in different styles.

One may be a business sentence:

> Every strategic supplier needs risk classification.

Another may be technical:

> `ZZ_RISK` must not be initial.

A third may describe workflow:

> Route incomplete records to Compliance Review.

A fourth may describe a migration exception:

> Blank values are tolerated for Wave 2.

Before comparing them, normalise them into a common structure.

A rule packet should contain:

```text
Subject:
Which entity or object does the rule govern?

Condition:
When does it apply?

Obligation:
What must be true?

Lifecycle point:
When must it be true?

Consequence:
What happens if it is not true?

Authority:
Who approved the rule?

Effective period:
When is it active?

Evidence:
What supports it?
```

For example:

```text
Subject:
Supplier organisation

Condition:
Active and strategic

Obligation:
Supplier Risk must contain an approved final value

Lifecycle point:
Before final activation

Consequence:
Activation blocked

Authority:
Global Supplier Risk Owner

Effective period:
Permanent until superseded
```

The Portuguese rule becomes:

```text
Subject:
Supplier organisation

Condition:
Country = PT and regulatory category = regulated

Obligation:
Compliance Review Status must equal CLEARED

Lifecycle point:
Before final activation

Consequence:
Activation blocked

Authority:
Portugal Compliance Data Owner

Effective period:
From 1 October 2026
```

The migration rule becomes:

```text
Subject:
Supplier organisation

Condition:
Migration Wave 2 and Supplier Risk missing

Obligation:
Record enters controlled review queue

Lifecycle point:
During migration load

Consequence:
Load permitted, activation blocked

Authority:
Migration Data Owner with Global Supplier Risk Owner approval

Effective period:
Wave 2 only
```

Once written consistently, the rules may no longer conflict.

They govern different obligations and lifecycle stages.

The problem was not necessarily policy contradiction.

It was incomplete representation.

---

# Distinguish semantic conflict from execution conflict

This separation prevents many unnecessary governance escalations.

## Semantic conflict

Two rules define the same business concept differently.

Example:

```text
Global:
Supplier Risk is a final exposure classification.

Local:
PENDING is a valid Supplier Risk value.
```

These rules conflict because one treats the attribute as final classification and the other mixes in process state.

The semantic model must be corrected before implementation.

## Applicability conflict

Two rules disagree about which records are in scope.

Example:

```text
Global:
Tax number required for all supplier organisations.

Local:
Non-resident supplier organisations are exempt.
```

This requires a contextual decision and precedence.

## Lifecycle conflict

The rules may both be correct at different stages.

Example:

```text
Migration:
Blank value may enter review.

Operational:
Blank value may not be activated.
```

No semantic conflict exists when the lifecycle boundary is explicit.

## Consequence conflict

Rules agree that a condition is invalid but prescribe different responses.

Example:

```text
Rule A:
Reject the record.

Rule B:
Accept the record with warning.

Rule C:
Route to stewardship.
```

The organisation must decide whether these responses apply at different stages or represent genuine disagreement.

## Authority conflict

Global and local owners issue overlapping rules without a clear governance boundary.

The content may be resolvable, but the decision authority is not.

## Implementation conflict

The approved rules are compatible, but SAP configuration, migration code or an interface implements them inconsistently.

This should create an implementation-alignment issue, not another policy debate.

---

# Draw the overlap before debating priority

A rule can only conflict where its scope overlaps another rule.

Use a simple context comparison.

| Dimension | Global rule | Portuguese rule | Migration rule |
|---|---|---|---|
| Country | All | PT | All |
| Entity category | Organisation | Organisation | Organisation |
| Supplier type | Strategic | Regulated | Any in Wave 2 |
| Lifecycle | Final activation | Final activation | Migration load |
| Effective period | Permanent | From October 2026 | Wave 2 |
| Obligation | Risk required | Clearance required | Missing risk enters review |

The overlap may apply only to suppliers that are:

- Portuguese;
- organisations;
- strategic;
- regulated;
- included in Wave 2.

This affected population may be small but material.

The programme should assess exactly that population rather than debating the rules abstractly.

A useful conflict statement is:

> For Portuguese regulated strategic supplier organisations in Wave 2, the model does not yet define whether a missing Supplier Risk blocks load, blocks activation, or is permitted under controlled review.

That is far more actionable than:

> Global and local rules conflict.

---

# Do not use a universal “local beats global” rule

Context specificity matters, but it is not sufficient.

A narrow local rule may be:

- a legitimate regulatory override;
- an unapproved workaround;
- a stale legacy configuration;
- a temporary migration concession;
- a misunderstanding of the global concept.

Likewise, a global rule may be:

- an approved enterprise policy;
- an overgeneralisation;
- a design assumption never validated locally;
- a copy of one dominant source system.

Precedence should depend on authority and rule type, not geography alone.

A defensible order is:

1. fixed semantic definition;
2. approved global policy;
3. approved contextual restriction or strengthening;
4. approved contextual override;
5. temporary deviation;
6. technical implementation.

This hierarchy means:

- local configuration cannot redefine global meaning;
- an approved local legal override can alter applicability;
- a temporary deviation can alter immediate execution without changing permanent policy;
- current implementation remains subordinate to approved model truth.

The order is not “central always wins.”

It is “semantic and governance authority must be explicit.”

---

# Decide whether the local rule narrows, strengthens or replaces

These three operations have very different consequences.

## Narrowing

The local rule reduces the global applicability.

```text
Global:
Tax number required for supplier organisations.

Local narrowing:
Requirement does not apply to approved non-resident organisations.
```

The core concept remains intact.

The local rule defines a smaller applicable population.

## Strengthening

The local context adds another obligation.

```text
Global:
Supplier Risk required before activation.

Local strengthening:
Compliance clearance also required before activation.
```

Both rules apply.

No replacement occurs.

## Replacement

The local rule substitutes another behaviour.

```text
Global:
Supplier Risk required.

Local replacement:
Supplier Risk optional; local risk note used instead.
```

Replacement is the most disruptive option.

It may break:

- cross-country reporting;
- integrations;
- shared validation;
- analytics;
- future harmonisation.

A replacement should require evidence that the global concept or rule is genuinely invalid in the local context.

Weak source data is not sufficient.

---

# Temporary migration rules must never silently alter permanent semantics

Migration projects frequently need controlled concessions.

Examples:

- warning instead of error;
- manual enrichment;
- delayed blocking rule;
- temporary status;
- excluded population;
- staged remediation.

These are valid delivery controls when clearly bounded.

They become dangerous when represented as permanent local policy.

Suppose:

```text
Permanent model:
Supplier Risk required before activation.

Temporary migration treatment:
Wave 2 records may load without Supplier Risk.

Control:
Records enter PENDING review and cannot activate.
```

The effective interpretation is:

```text
Load permitted.
Final activation prohibited.
Permanent requirement unchanged.
```

It is not:

```text
Supplier Risk optional in Wave 2.
```

The wording matters because later teams may copy the rule.

A temporary treatment must include:

- exact population;
- permitted lifecycle step;
- prohibited lifecycle step;
- owner;
- expiry;
- remediation plan;
- evidence of removal.

---

# Resolve the business outcome before choosing SAP technology

Teams often jump too early to implementation questions:

- BRFplus or BAdI?
- derivation or validation?
- change-request step or workflow route?
- custom field or standard field?
- error or warning?

These questions are premature until the effective rule is stated.

The approved business outcome should first read something like:

```text
For Portuguese regulated supplier organisations:

1. Compliance Review Status is required.
2. Supplier Risk remains a separate final classification.
3. During Wave 2, a record may enter review without final Supplier Risk.
4. The record may not activate until:
   - Review Status = CLEARED; and
   - Supplier Risk contains an approved final value.
5. The Wave 2 concession expires before UAT.
```

Only then should the SAP team determine the appropriate configuration.

SAP currently describes MDG as supporting governed models, validated values, collaborative workflows, business-rule definition and monitoring, ownership and auditable changes. Those capabilities are suitable for enforcing an approved rule set; they should not be the place where unresolved policy conflicts are silently settled.

---

# Use a conflict hearing, not a general workshop

A broad workshop often generates more opinions than resolution.

A focused conflict hearing should contain only the roles needed to decide the effective model:

- global semantic owner;
- local business or regulatory owner;
- migration owner;
- SAP or MDM implementation architect;
- data owner for the affected population;
- integration or consumer owner where required;
- decision recorder.

The meeting should receive a prepared conflict packet.

It should not begin by searching for documents.

The packet should show:

1. normalised rules;
2. overlap population;
3. affected model objects;
4. evidence;
5. authority;
6. implementation consequences;
7. proposed resolution;
8. unresolved questions.

The meeting then decides among a limited set of outcomes:

- rules are compatible once lifecycle is clarified;
- local rule narrows the global rule;
- local rule strengthens the global rule;
- local override is approved;
- temporary deviation is approved;
- local rule is rejected;
- global rule requires redesign;
- further investigation is required.

---

# A conflict resolution must produce one effective rule

Do not close the discussion with:

> Global and local teams agreed on an approach.

Write the resulting behaviour in a way that can be tested.

Example:

```text
Effective rule:

For supplier organisations in Portugal:

- Tax Registration Number is required before activation.
- Approved non-resident organisations are exempt from the number.
- Exemption Evidence must be present for exempt records.
- During Mock Load 2, records may load with missing number or evidence.
- Such records remain blocked from activation.
- The Mock Load 2 exception expires on 15 October 2026.
```

This can be converted into:

- canonical rule objects;
- dataset checks;
- SAP configuration;
- workflow tests;
- interface expectations;
- closure criteria.

A statement such as “Portugal exception approved” cannot.

---

# Record the rules that lost

Rejected rules are valuable.

Suppose the local team proposed:

> Disable tax validation for all Portuguese suppliers.

The final decision approves only a non-resident exemption.

Preserve the rejected proposal:

```text
Rejected treatment:
Country-wide tax validation exemption.

Reason:
Evidence supports an exemption only for approved non-resident
supplier organisations. A country-wide exemption would weaken
the rule for records that remain legally in scope.
```

This prevents the broad exemption from returning in another test cycle as though it were new.

---

# Test the resolution against real records

A conflict is not resolved by elegant wording alone.

Construct a small decision table.

| Scenario | Load | Activation | Required evidence |
|---|---|---|---|
| PT resident organisation with tax number | Pass | Pass | Tax number |
| PT resident organisation without tax number | Review or fail by phase | Block | Tax number |
| PT approved non-resident with exemption evidence | Pass | Pass | Exemption evidence |
| PT non-resident without exemption evidence | Review or fail by phase | Block | Exemption evidence |
| German organisation without tax number | Governed by global rule | Block | Tax number |
| Wave 2 unresolved record | Pass to review | Block | Remediation required |

This table exposes ambiguities immediately.

If two stakeholders expect different results for the same row, the conflict remains unresolved.

---

# Test boundary cases, not only ordinary cases

Conflicting rules usually fail at boundaries.

Include:

- record changing country;
- supplier changing from inactive to active;
- organisation versus person;
- strategic and regulated supplier;
- migration exception after expiry;
- exemption evidence revoked;
- record created in one context and activated in another;
- interface update arriving after the status change.

Boundary testing verifies that context and lifecycle are correctly represented.

It also reveals whether a proposed rule depends on data that is not available at the moment when the decision must be made.

---

# Make data availability part of the decision

A rule may be conceptually correct but impossible to evaluate.

Suppose the Portuguese exception depends on:

```text
Residency Status = Non-resident
```

The migration dataset does not contain Residency Status.

The programme then has three separate problems:

1. the business rule;
2. the missing source evidence;
3. the implementation treatment.

Do not weaken the rule merely because the source is incomplete.

Possible responses include:

- enrich Residency Status;
- use approved exemption evidence;
- exclude the population;
- keep records blocked;
- approve a bounded temporary deviation.

Martenweave’s dataset-readiness workflow is designed to compare current dataset evidence with canonical model expectations and promote gaps into reviewable proposals or issue drafts.

That is the correct sequence:

```text
Approved rule
→ dataset support check
→ explicit gap
→ controlled treatment
```

Not:

```text
Dataset lacks field
→ silently weaken rule
```

---

# Separate rule identity from its implementations

The same approved rule may be realised in several places:

- SAP MDG validation;
- SAP workflow;
- migration transformation;
- source-system check;
- interface validation;
- data-quality monitoring;
- downstream control.

Each implementation should reference one rule identity.

For example:

```text
Canonical rule:
RULE-PT-NONRESIDENT-TAX-EXEMPTION

Implemented by:
- SAP MDG validation
- Migration readiness check
- Supplier activation workflow
- Outbound interface test
```

This allows the programme to ask:

- Does every implementation match the same rule version?
- Has one implementation drifted?
- Which systems require change after the rule is revised?
- Which dataset checks should validate it?

Without canonical rule identity, each technology contains its own interpretation.

---

# Data-quality rule libraries solve a related—but different—problem

Data-quality platforms can centralise, version, monitor and reuse executable checks.

Ataccama, for example, describes a central library for governed business-defined rules, along with profiling, lineage, monitoring, remediation and application of reusable rules across datasets and pipelines.

This is valuable after the organisation knows:

- what the rule means;
- which context it governs;
- which population is applicable;
- which result is expected.

A data-quality rule such as:

```text
Tax Registration Number must not be blank
```

is incomplete without applicability.

The full model might be:

```text
Tax Registration Number must not be blank
for active resident supplier organisations,
unless an approved contextual exemption exists.
```

Martenweave should not attempt to replace enterprise profiling and rule-execution platforms.

Its role is to preserve the model-level rule identity, context, evidence and conflict resolution that those platforms can then implement.

---

# Enterprise governance platforms help establish authority

A conflict cannot be resolved reliably when nobody knows who may decide.

Collibra’s governance guidance emphasises operating models, data domains, ownership, business and technical stewards, and centralised or federated authority structures.

That broader governance structure should determine:

- who owns global semantics;
- who owns local applicability;
- who approves regulatory interpretation;
- who accepts temporary risk;
- who confirms technical feasibility.

Martenweave should consume or reference that authority.

It should not invent a second enterprise governance hierarchy.

Its narrower job is to bind authority to the exact rule, context, evidence and model change under review.

---

# Governance suites do not remove the need for a delivery-level rule model

Informatica defines data governance through principles, standards, practices, policies and procedures intended to keep data reliable, consistent and trustworthy. It also recommends starting from specific business drivers and achievable pilots.

A broad governance platform may hold:

- policies;
- critical data elements;
- owners;
- glossary terms;
- quality measures.

A migration programme still needs a more precise delivery representation:

```text
Business attribute
→ applicable context
→ source availability
→ transformation
→ target field
→ validation point
→ workflow consequence
→ temporary deviation
→ test evidence
```

That delivery-level connection is where many SAP rule conflicts become visible.

---

# The decision log must remain linked to change

After conflict resolution, the resulting rule may require:

- model update;
- SAP configuration;
- migration mapping;
- dataset remediation;
- interface change;
- test change;
- local procedure;
- monitoring.

Do not close the conflict when the decision is approved.

Track the implementation alignment separately.

A complete chain is:

```text
Rule conflict
→ investigation
→ effective rule decision
→ PatchProposal
→ validation
→ impact analysis
→ implementation work
→ verification
→ closure
```

Martenweave’s current core follows a related evidence-to-proposal pipeline and requires proposed changes to remain reviewable before becoming approved `ChangeRequest`s.

---

# A compact conflict record

A canonical conflict record could look like this:

```yaml
id: CONFLICT-PT-TAX-004

status: resolved

subject:
  - ATTR-SUPPLIER-TAX-ID

context:
  countries:
    - PT
  partner_categories:
    - ORGANISATION

rules:
  - RULE-GLOBAL-SUPPLIER-TAX-ID
  - RULE-PT-NONRESIDENT-EXEMPTION
  - DEV-WAVE2-TAX-WARNING

conflict:
  type: lifecycle_and_applicability
  question: >
    Determine load and activation behavior for Portuguese
    non-resident supplier organisations with missing tax ID.

resolution:
  - global requirement remains active
  - approved non-residents may use exemption evidence
  - Wave 2 load may proceed to review
  - activation remains blocked until rule conditions are met

authority:
  global:
    - ROLE-GLOBAL-SUPPLIER-DATA-OWNER
  local:
    - ROLE-PT-TAX-DATA-OWNER
  temporary_risk:
    - ROLE-MIGRATION-DATA-OWNER

effective_from: 2026-10-01

temporary_exception_expires: 2026-10-15

affected_objects:
  - ATTR-SUPPLIER-TAX-ID
  - ATTR-TAX-EXEMPTION-EVIDENCE
  - RULE-SUPPLIER-ACTIVATION

follow_up:
  - PATCH-PT-TAX-019
  - TEST-PT-TAX-REGRESSION-07
```

This is a conceptual structure rather than a claim about the current Martenweave schema.

The value is that the conflict, authority and effective outcome remain inspectable after configuration is completed.

---

# What deterministic validation can catch

Some conflict classes can be detected before a human review.

Examples:

- overlapping rules with contradictory obligations;
- local rule missing context;
- override without authority;
- temporary deviation without expiry;
- rule referring to retired attribute;
- global and local rules using different granularity;
- two active decisions for the same context;
- migration exception that permits activation contrary to permanent policy;
- implementation linked to superseded rule;
- local value violating the global classification dimension.

The validator should report:

```text
Potential conflict:
RULE-GLOBAL-TAX-ID and RULE-PT-TAX-OPTIONAL
both apply to Portuguese supplier organisations.

Difference:
required = true
required = false

No approved override relationship found.
```

The validator should not decide which rule is correct.

It should stop the conflict from remaining invisible.

---

# What requires human judgement

Automation cannot settle:

- whether the local regulation has been interpreted correctly;
- whether two terms carry the same business meaning;
- whether the global rule is overbroad;
- whether residual risk is acceptable;
- whether a temporary concession is justified;
- whether the operational cost of harmonisation is proportionate.

These decisions require accountable owners and explicit evidence.

The system can assemble the decision surface.

It should not create false authority.

---

# Three conflict patterns worth recognising early

## The hidden lifecycle conflict

```text
Rule A:
Value required.

Rule B:
Blank value allowed.
```

Often the real distinction is:

```text
Blank allowed during intake.
Value required before activation.
```

Resolve by stating lifecycle points.

## The dimension-mixing conflict

```text
Global values:
LOW, MEDIUM, HIGH

Local value:
PENDING
```

The local value represents status, not risk.

Resolve by separating attributes.

## The source-capability conflict

```text
Global:
Field mandatory.

Local:
Field optional because source cannot provide it.
```

The local statement is not necessarily a business rule.

Resolve through remediation or temporary deviation unless business applicability genuinely differs.

---

# A worked resolution: Supplier Risk in Portugal

### The conflict

Global rule:

> Supplier Risk required for active strategic suppliers.

Portuguese rule:

> Regulated suppliers require Compliance Review Status = CLEARED.

Migration rule:

> ERP_PT records without Supplier Risk may enter Wave 2.

### The ambiguity

For a regulated strategic supplier with missing risk:

- may it load?
- may it activate?
- may compliance clearance happen before risk classification?
- which status is sent downstream?

### The resolved model

```text
1. Supplier Risk remains final classification.
2. Compliance Review Status remains separate.
3. Wave 2 load may create PENDING review records.
4. Activation requires:
   - Supplier Risk approved; and
   - Compliance Review Status = CLEARED.
5. Downstream systems receive no final risk value until approved.
6. Temporary Wave 2 treatment expires before UAT.
```

### Why this works

No global semantic rule is weakened.

The Portuguese rule strengthens activation control.

The migration rule changes only the load stage.

Each rule retains separate identity.

---

# A worked resolution: French Customer Group

### The conflict

Global rule:

> Customer Group is maintained by sales area.

French request:

> Copy the central CRM Segment into every sales area.

### The apparent argument

The local team calls the request a mapping rule.

### The actual conflict

- source is central;
- target is organisational;
- no derivation policy exists;
- direct replication would assert equivalence.

### Resolution

Do not create a local override.

Record a source-to-target model gap.

Use controlled enrichment until a valid sales-area treatment is approved.

This conflict should never reach SAP configuration as a simple field mapping.

---

# A worked resolution: German migration status

### The conflict

Global Supplier Risk values:

```text
LOW
MEDIUM
HIGH
```

German proposal:

```text
UNDER_REVIEW
```

### Finding

`UNDER_REVIEW` is a process state, not final risk.

### Resolution

Reject the value-list extension.

Create or reuse Supplier Review Status.

Migrate existing `UNDER_REVIEW` records into the separate status.

Update rules and reporting.

The conflict is semantic, not merely local.

---

# A worked resolution: Italian Payment Terms

### The conflict

Global rule:

> Payment Terms required before activation.

Italian migration rule:

> Missing Payment Terms allowed for Wave 2.

### Resolution

```text
Load:
Allowed into remediation queue.

Activation:
Blocked.

Permanent model:
Unchanged.

Expiry:
Before UAT.

Implementation:
Controlled enrichment.
```

The rules are compatible after lifecycle and expiry are explicit.

---

# The pre-configuration gate

Before any conflicting rule reaches SAP, MDM or pipeline implementation, require a short gate.

The gate should confirm:

- every rule has stable identity;
- contexts are explicit;
- lifecycle points are explicit;
- overlap population is known;
- semantic conflicts are resolved;
- precedence is approved;
- temporary deviations have expiry;
- effective behaviour is written;
- test scenarios exist;
- affected implementations are identified;
- accountable owners approve.

A rule set that fails this gate is not ready for configuration.

That may feel slower than immediate technical implementation.

It is faster than discovering during UAT that several teams implemented different meanings.

---

# What Martenweave should own

Martenweave should not become a runtime rules engine.

It should not replace:

- SAP MDG validation and workflow;
- MDM stewardship platforms;
- enterprise governance suites;
- data-quality execution platforms;
- Jira or ServiceNow.

Its defensible role is earlier and more specific:

> Preserve the canonical rule identities, contexts, evidence, conflicts, precedence decisions and implementation relationships required to make configuration deterministic.

The current Martenweave core already provides:

- canonical model files;
- deterministic reference validation;
- generated indexes;
- dataset-to-model gap detection;
- trace;
- impact analysis;
- proposal-first change control;
- GitHub-ready review output.

A rule-conflict capability would extend this foundation with:

- normalised Rule objects;
- explicit contexts;
- lifecycle stages;
- precedence relationships;
- Conflict records;
- effective-rule resolution;
- conflict validators;
- test-case generation.

That remains aligned with the product’s north star.

---

# Questions for the rule owner

Before approving the result, ask:

- Are the rules genuinely contradictory, or do they apply at different lifecycle points?
- Do they govern the same business concept?
- Is the local rule a restriction, strengthening or replacement?
- Is a source limitation being presented as policy?
- Which exact population satisfies all overlapping contexts?
- Who has authority over global meaning?
- Who has authority over local applicability?
- Is the temporary rule time-limited?
- What is the effective result for each boundary scenario?
- Which systems must implement the result?
- What evidence proves that implementation matches the decision?
- Can another country understand the rule without copying the local workaround?

---

# Final perspective

Rule conflict is not a configuration defect.

It is unresolved model governance exposed by configuration.

When the conflict reaches the SAP developer, migration analyst or workflow configurator, the organisation has already waited too long.

The resolution must happen where the programme can compare:

- meaning;
- context;
- lifecycle;
- authority;
- evidence;
- population;
- consequence.

The resulting rule must be specific enough to test and stable enough to reuse.

The practical standard is:

> One effective rule for one context at one lifecycle point.

Not one sentence for the global team, another for the country and a third hidden in migration code.

The programme should be able to answer:

> For this record, in this context, at this stage, what must be true—and which approved decision makes that answer authoritative?

When it can, SAP configuration becomes implementation again.

When it cannot, configuration becomes the place where unresolved governance is converted into code.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects:

- global and local rules;
- context;
- datasets;
- source and target endpoints;
- investigations;
- decisions;
- temporary deviations;
- impact;
- reviewable changes.

Its role is not to execute every rule.

It is to make the effective model clear before several platforms implement different interpretations of it.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a governance layer supporting one governed model across business entities, preserved semantics and relationships, profiling and reconciliation, validated values, collaborative workflows, business-rule monitoring and auditable changes.

Collibra describes data governance as an organisational discipline supported by an operating model defining roles, responsibilities, business terms and domains. Its guidance distinguishes centralised from decentralised or federated authority and stresses formalised ownership.

Informatica defines data governance through principles, standards, policies and procedures intended to keep data reliable and consistent, and recommends beginning with specific business drivers and bounded pilot outcomes.

Ataccama describes centralised, reusable and governed data-quality rule libraries, together with profiling, lineage, monitoring, remediation and application of rules across datasets and pipelines.

Martenweave Core currently uses canonical model files, deterministic validation, rebuildable generated indexes, dataset-gap analysis, trace, impact analysis and human-reviewed `PatchProposal` and `ChangeRequest` workflows.

Its documented workflow moves from evidence through validation, gap and impact analysis to human-reviewed GitHub-ready changes.

Martenweave is independent and is not affiliated with or endorsed by SAP, Collibra, Informatica, Ataccama or other vendors named in this article. Product names and trademarks belong to their respective owners.
