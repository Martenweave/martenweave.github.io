# How We Model Data Quality Rules Without Mixing Business Policy and Technical Validation

**Reviewed: 15 July 2026**

A migration programme is preparing Supplier bank data for SAP.

The business requirement sounds simple:

> A payment-active Supplier must have a bank account that has been verified by Treasury.

The team turns this statement into a validation:

```text
BANK_VERIFICATION_STATUS must equal VERIFIED.
```

The check fails for 3,400 Suppliers.

The migration team now has a problem.

Some records have no verification status because the Treasury review file was not included in the extract.

Some Suppliers are not payment-active and do not require a bank account at all.

Some bank accounts were technically validated but were never confirmed by Treasury.

Some Suppliers were approved for migration with a payment block.

Some records use the word `VERIFIED`, but the status came from a legacy portal whose approval process is unknown.

A single validation statement has mixed together several different questions:

- What business outcome do we require?
- Which Suppliers are in scope?
- What does “verified” mean?
- Which source is authorised to establish verification?
- Which technical field represents the result?
- How should missing or invalid data be detected?
- What is the operational consequence of failure?
- Can an exception be accepted?
- Which evidence proves that the rule was executed?

This is where many data-quality frameworks become difficult to govern.

The business policy, technical check and validation result are compressed into one rule.

The rule may run successfully, but nobody can explain whether it tests the right obligation.

Or the rule fails, and the team cannot determine whether it found:

- bad source data;
- a missing integration;
- an incorrect model;
- an out-of-scope record;
- an accepted exception;
- a genuinely unsafe Supplier.

> A technical test can tell us whether data satisfies an encoded condition. It cannot, by itself, prove that the encoded condition represents the correct business policy.

We therefore model data quality in layers.

For the Supplier bank-verification case, we separate:

```text
Business policy
→ model obligation
→ technical validation
→ execution result
→ Finding
→ remediation or exception
```

This separation is central to Martenweave.

Martenweave’s current model scope includes Rules, Attributes, Datasets, Mappings, Evidence, Decisions and change proposals. Its architecture places deterministic validation around canonical files while keeping AI-generated changes subject to human review.

Our goal is not to build another generic data-quality execution platform.

Our goal is to preserve the meaning, authority and consequences around the checks that matter to migration, MDM, governance and AMS work.

---

# The business statement is not yet a technical rule

We begin with the policy:

> A payment-active Supplier must have a Treasury-verified bank account.

This statement contains several business concepts:

- Supplier;
- payment-active status;
- bank account;
- Treasury verification;
- obligation.

It does not identify:

- a database column;
- a file;
- a target SAP field;
- a SQL query;
- a severity code;
- a remediation workflow.

That is useful.

A business policy should be able to survive implementation changes.

Today, Treasury verification may come from an Excel file.

Later, it may come from:

- SAP MDG workflow;
- a supplier portal;
- an external verification service;
- a Treasury approval application.

The policy remains the same.

If we define the rule only as:

```text
BANK_VERIFICATION_STATUS = "VERIFIED"
```

we bind business meaning to one current implementation.

A future system may use:

```text
APPROVAL_STATE = "APPROVED"
```

or:

```text
VERIFICATION_LEVEL >= 2
```

The business obligation should not disappear because a column was renamed.

We therefore model the business policy separately from the technical assertion.

---

# We make the policy explicit

A conceptual business-policy object might state:

```text
Policy:
Payment-active Suppliers require a verified bank account.

Purpose:
Prevent payment activation using bank details
that have not been reviewed by an authorised Treasury process.

Applies to:
Suppliers eligible for outgoing payment.

Owner:
Treasury Data Owner.
```

This object explains why the control exists.

It also provides the basis for later decisions.

For example:

- Does the policy apply to one-time Suppliers?
- Does it apply before migration or before payment activation?
- Can an unverified Supplier migrate with a payment block?
- Which process qualifies as Treasury verification?

Those are policy questions.

They should not be hidden inside validation code.

---

# We define the model obligation

The business policy must be translated into an obligation that the canonical model can understand.

For our case:

```text
When Supplier payment status is active:

- one current bank account must exist;
- verification evidence must exist;
- the verification source must be authorised;
- the verification must apply to the current account;
- otherwise payment must remain blocked.
```

This is more precise than the original policy.

It defines the required relationships between model objects.

The obligation can reference:

- Supplier;
- Supplier Bank Account;
- Payment Status;
- Bank Verification Status;
- verification Evidence;
- payment block.

It still does not prescribe one SQL statement.

That separation allows several technical validators to implement the same obligation in different stages.

---

# One policy may require several technical checks

The Supplier bank-verification policy cannot be proven by checking one field.

We may need to verify:

1. the Supplier is payment-active;
2. a bank account exists;
3. the account has a stable identity;
4. verification Evidence exists;
5. the Evidence refers to the same account;
6. the verification source is approved;
7. the verification is current;
8. a payment block exists when verification is absent.

These are separate assertions.

A single pass/fail result would hide which part failed.

We therefore allow one business obligation to be implemented by multiple validation checks.

Conceptually:

```text
Business policy:
Payment-active Supplier requires verified bank account.

Implemented by:
- CHECK-BANK-ACCOUNT-PRESENT
- CHECK-BANK-VERIFICATION-PRESENT
- CHECK-BANK-VERIFICATION-AUTHORITY
- CHECK-BANK-VERIFICATION-CURRENT
- CHECK-PAYMENT-BLOCK-WHEN-UNVERIFIED
```

This makes failures actionable.

A missing account and an unapproved verification source are not the same problem.

---

# We distinguish policy scope from query filters

A technical query may contain:

```text
WHERE PAYMENT_ACTIVE = 'X'
```

That filter implements part of the scope.

It does not define why the scope exists.

The canonical Rule should state the applicability in business terms:

```text
Applies to:
Suppliers authorised for outgoing payment.

Does not apply to:
- Suppliers migrated for historical reference only;
- payment-blocked Suppliers with no planned activation;
- records excluded from the current migration wave.
```

The technical validator then maps those concepts to dataset fields.

This distinction matters when source systems encode payment activity differently.

One source may use:

```text
PAYMENT_ACTIVE = "X"
```

Another may derive it from:

- company-code status;
- deletion flag;
- payment block;
- Supplier category.

The policy scope remains stable.

The implementation can change by dataset.

---

# We separate the Rule from the validator

We use the word “Rule” carefully.

A canonical Rule represents the governed obligation.

A validator is the executable mechanism that tests a particular dataset or model state against that obligation.

The Rule says:

```text
A payment-active Supplier must have current,
authorised bank-verification evidence.
```

The validator says:

```text
For dataset SUPPLIER_BANK_CUTOVER:

fail when PAYMENT_ACTIVE = true
and no matching Treasury verification record exists.
```

The Rule may have several validators:

- source-readiness validator;
- transformed-dataset validator;
- target-load validator;
- post-load reconciliation validator.

All test the same underlying obligation at different points.

This gives us continuity across the migration lifecycle.

---

# We identify what exactly is being validated

A validation result is meaningful only when we know its subject.

Possible subjects include:

## Canonical model

Does the Rule reference valid Attributes, Datasets and owners?

## Dataset schema

Are the required fields present?

## Dataset records

Do individual Suppliers comply?

## Mapping definition

Does the Mapping produce the required verification status?

## Target result

Did the loaded Supplier retain the required payment block?

## Evidence package

Is current verification Evidence available?

We should not report all of these as:

```text
Bank verification rule failed.
```

A better result states:

```text
Subject:
Supplier bank cutover dataset

Validation:
Treasury verification record required

Result:
3,400 records failed

Failure type:
missing evidence input
```

The failed subject changes the remediation.

---

# We distinguish model validation from data validation

Martenweave already uses deterministic validation to check canonical objects, including IDs, types, references and domain context.

That is model validation.

For example, it can check:

- the Rule has a stable ID;
- the referenced Attribute exists;
- the owner exists;
- the scope is valid;
- the validator references a known Dataset;
- severity values are allowed.

Data validation asks whether actual records satisfy the Rule.

For example:

```text
Does every payment-active Supplier
have matching Treasury verification Evidence?
```

Both are deterministic.

They validate different things.

A structurally valid Rule can still be a poor business rule.

A correct business Rule can be implemented by a broken validator.

We must be able to identify which layer failed.

---

# We distinguish validation from inference

Suppose the dataset has no explicit verification status.

An AI agent notices that Suppliers with an uploaded bank letter were usually approved by Treasury.

It proposes:

```text
Treat uploaded bank letter as verified.
```

That is not validation.

It is an inference about business meaning.

The agent may propose the interpretation, but it cannot quietly incorporate it into the validator.

The proper sequence is:

```text
Observed correlation
→ Finding
→ candidate Decision
→ business review
→ approved model change
→ validator update
```

Otherwise, the technical validation begins to encode an unapproved policy.

---

# We define authority for the expected value

The dataset contains:

```text
BANK_VERIFICATION_STATUS = VERIFIED
```

That does not prove that verification occurred.

We need to know which source has authority to make the claim.

Possible sources include:

- Treasury Review Dataset;
- Supplier Portal;
- legacy Finance system;
- SAP MDG workflow;
- manually maintained cutover file.

The Rule should specify the accepted authority.

For example:

```text
Accepted verification authority:
Treasury Review Dataset.

Portal self-declaration:
not sufficient.

Legacy Finance verified flag:
supporting evidence only.
```

The technical validator must check both:

- the value;
- the provenance of the value.

A value can be syntactically correct and semantically unauthorised.

---

# We make evidence a first-class requirement

The policy does not require only a status.

It requires evidence that supports the status.

For our case, a verification Evidence record might include:

- Supplier ID;
- bank-account fingerprint;
- verification result;
- reviewer or authorised system;
- verification date;
- source;
- applicable migration baseline.

The Rule can require:

```text
Verification Evidence must:

- identify the Supplier;
- identify the bank account;
- come from an authorised process;
- be current for the migration baseline.
```

This avoids the dangerous pattern:

```text
status = VERIFIED
```

without any proof of what was verified.

---

# We model time explicitly

Verification can become stale.

A bank account may change after approval.

A Treasury review from six months earlier may refer to a different IBAN.

The Rule must define freshness.

For example:

```text
Verification is valid when:

- it refers to the current bank-account fingerprint;
- it was completed after the latest bank-account change;
- it remains valid at the dataset baseline date.
```

A technical check can then compare:

- account fingerprint;
- account update timestamp;
- verification timestamp;
- dataset extraction date.

Without temporal context, an old valid status may incorrectly validate a new account.

---

# We do not use severity as a substitute for meaning

Teams often debate whether a rule should be:

- error;
- warning;
- information.

Severity matters.

It does not define the Rule.

For the Supplier case:

## Before mock load

Missing verification may be a warning because the Treasury file is not yet available.

## Before cutover approval

The same failure may be critical.

## After load with payment block

It may remain an accepted controlled condition.

The business obligation did not change.

The enforcement policy changed by stage.

We therefore separate:

```text
Rule:
what must ultimately be true

Enforcement profile:
how failure is treated at a specific stage
```

For example:

```text
Mock Load 1:
warning

Cutover readiness:
blocking error

Post-load with payment block:
controlled exception
```

W3C SHACL provides a useful technical precedent for separating constraints, targets and validation reports, including severity, focus nodes, result paths and source constraints. It treats validation as checking a data graph against explicitly declared conditions and producing structured results rather than conflating the condition with the result.

Martenweave does not need to adopt SHACL or RDF.

The separation is still useful.

---

# We distinguish failure from consequence

When a Supplier lacks verification, the validation result is:

```text
Verification requirement not satisfied.
```

The business consequence may be:

```text
Supplier cannot be activated for outgoing payment.
```

The remediation may be:

```text
Obtain Treasury verification.
```

The migration treatment may be:

```text
Migrate with payment block.
```

These are four different things.

If we store them in one validation message, future teams cannot change the treatment without rewriting the Rule.

We model:

- violation;
- consequence;
- remediation;
- temporary treatment.

This allows the organisation to preserve the business obligation while adjusting delivery handling.

---

# We represent an accepted exception separately

The programme may approve migration of unverified Suppliers with payment block.

That does not mean the bank-verification Rule passed.

It means an Exception permits a bounded deviation under a compensating control.

The state should be:

```text
Rule result:
failed

Exception:
approved

Compensating control:
payment block active

Readiness:
controlled exception
```

It should not be:

```text
Rule result:
passed
```

This preserves honest reporting.

The previous article described how we model temporary exceptions with scope, owner, expiry, controls and closure conditions. The same lifecycle applies here.

---

# We preserve the validation result as Evidence

A validation execution should produce an Evidence object or linked report containing:

- Rule ID;
- validator version;
- dataset fingerprint;
- model baseline;
- execution timestamp;
- population size;
- failed-record count;
- failure categories;
- result fingerprint.

Conceptually:

```text
Rule:
RULE-SUPPLIER-BANK-VERIFICATION

Dataset:
SUPPLIER-BANK-CUTOVER-RC4

Model commit:
abc123

Population:
50,000 Suppliers

Passed:
46,600

Controlled exception:
3,200

Unresolved:
200
```

The result is Evidence about a particular model and dataset state.

It is not the Rule itself.

When either the dataset or Rule changes, the Evidence may become stale.

---

# We make validation reproducible

A result is difficult to trust if nobody can reproduce it.

We need to know:

- which input dataset was used;
- which model version applied;
- which validator implementation ran;
- which parameters were supplied;
- which exclusions were active;
- which exception set was recognised.

This is especially important when an AI agent summarises results.

The summary may say:

> Bank verification readiness is 99.6 percent.

We must be able to inspect the underlying execution.

Reproducibility is more important than a polished score.

---

# We keep aggregate quality separate from record-level compliance

The Supplier dataset may achieve:

```text
Verification completeness:
99.6%
```

That sounds strong.

The remaining 0.4 percent may include 200 high-value Suppliers scheduled for immediate payment.

An aggregate percentage does not express business risk.

The Rule should preserve:

- failed records;
- organisational scope;
- payment exposure;
- criticality;
- exception status.

We can calculate a score for reporting.

The score must not replace the underlying findings.

ISO/IEC 25012 defines a general data-quality model for structured data used by people and systems. The standard is useful as a vocabulary for thinking about quality characteristics, but a migration programme still needs context-specific Rules, scope, ownership and consequences rather than relying on a generic quality dimension alone.

---

# We avoid turning every policy into executable code immediately

Some policies are not ready for deterministic validation.

For example:

> Treasury must be satisfied that the Supplier bank account is credible.

This statement is too subjective.

We should not pretend that an AI confidence score makes it deterministic.

We may decompose it into measurable controls:

- account identity matched;
- bank-country consistency;
- authorised reviewer;
- approved evidence type;
- no unresolved conflict.

The residual judgement may remain human.

A Rule object can state:

```text
Validation mode:
human decision supported by technical checks
```

Not every business obligation must become a Boolean query.

The model should make the boundary visible.

---

# We allow multiple implementation levels

For Supplier bank verification, we may have:

## Level 1: structural validation

Required fields and references exist.

## Level 2: syntactic validation

IBAN format and country relationship are valid.

## Level 3: semantic validation

Verification Evidence refers to the same account.

## Level 4: authority validation

Evidence came from an accepted source.

## Level 5: operational validation

Payment block is active when verification is absent.

These levels help us explain why a record can pass one check and fail another.

A technically valid IBAN is not automatically an authorised bank account.

---

# A conceptual Martenweave Rule

A simplified canonical Rule might look like:

```text
---
id: RULE-SUPPLIER-BANK-VERIFICATION
type: Rule
status: approved

policy:
  Payment-active Suppliers require current,
  authorised bank-account verification.

applies_to:
  entity: ENT-SUPPLIER
  condition: payment_active

requires:
  - ATTR-SUPPLIER-BANK-ACCOUNT
  - ATTR-SUPPLIER-BANK-VERIFICATION
  - EVIDENCE-TYPE-TREASURY-BANK-APPROVAL

owner:
  ROLE-TREASURY-DATA-OWNER

failure_consequence:
  payment_block_required

validators:
  - VAL-SUPPLIER-BANK-PRESENT
  - VAL-SUPPLIER-BANK-VERIFICATION-MATCH
  - VAL-SUPPLIER-BANK-VERIFICATION-AUTHORITY
---
```

This is a recommended direction, not a claim about the exact current Rule schema.

The important separation is visible:

- business statement;
- applicability;
- required model objects;
- owner;
- consequence;
- executable validators.

---

# A conceptual validator

One validator may state:

```text
---
id: VAL-SUPPLIER-BANK-VERIFICATION-MATCH
type: Validator

implements:
  RULE-SUPPLIER-BANK-VERIFICATION

subject:
  dataset: DATASET-SUPPLIER-BANK-CUTOVER

inputs:
  - SUPPLIER_ID
  - BANK_ACCOUNT_FINGERPRINT
  - PAYMENT_ACTIVE
  - VERIFICATION_ACCOUNT_FINGERPRINT
  - VERIFICATION_STATUS

failure_when:
  payment_active
  and current_bank_account_exists
  and no matching approved verification exists
---
```

The validator is tied to a dataset implementation.

The Rule is not.

A different dataset can implement another validator for the same Rule.

---

# We validate the Rule definition before running it

A Rule should fail model validation when:

- the owner is missing;
- applicability references an unknown Attribute;
- the required Evidence type does not exist;
- no consequence is defined for a critical failure;
- validators refer to unknown datasets;
- the Rule contradicts an active Decision;
- an enforcement profile uses an invalid stage;
- an Exception references the Rule outside its scope.

This is where Martenweave’s deterministic model validation creates value before any data is processed.

---

# We turn execution failures into Findings

A validation failure is an observation.

It should not automatically rewrite the Rule or Mapping.

For the 3,400 Suppliers, we create grouped Findings such as:

```text
Finding:
Treasury verification input is unavailable
for 3,200 payment-active Suppliers.

Likely cause:
Treasury Review Dataset was not included.

Model implication:
None confirmed.

Delivery implication:
Dataset enrichment required.
```

And:

```text
Finding:
200 Suppliers contain a legacy VERIFIED flag
without authorised Treasury Evidence.

Model implication:
Legacy verification source is not approved.

Risk:
Payment activation must remain blocked.
```

We do not create one issue per failed record.

We group failures by coherent cause and treatment.

---

# We do not weaken the Rule to improve the score

A common failure pattern is:

1. readiness score is low;
2. team makes the Rule optional;
3. readiness score improves;
4. underlying risk remains.

For our case, the team might propose:

```text
Bank verification recommended but not required.
```

That may be a valid policy change.

It must not happen as an undocumented validator adjustment.

The correct sequence is:

```text
Finding
→ policy-change proposal
→ impact analysis
→ Treasury review
→ approved Decision
→ Rule update
→ validator update
```

The score must follow the policy.

The policy must not follow the desired score.

---

# We connect Rules to impact analysis

When Treasury changes the policy, Martenweave should identify affected objects.

For example, changing:

```text
Verification required before payment activation
```

to:

```text
Verification required before migration load
```

affects:

- dataset readiness;
- target Mapping;
- payment-block treatment;
- Exception scope;
- cutover sequencing;
- Evidence requirements;
- affected Supplier population.

The text change may be small.

The operating impact may be large.

Rules must therefore participate in lineage and impact analysis like Attributes and Mappings.

---

# We keep Rule versions tied to evidence

Suppose Mock Load 3 was validated against Rule version 2.

Before cutover, Rule version 3 changes the accepted verification authority.

The old validation result is now stale.

Martenweave should report:

```text
Evidence:
EVID-MOCK3-BANK-VERIFICATION

Validated against:
RULE-SUPPLIER-BANK-VERIFICATION v2

Current Rule:
v3

Material difference:
legacy Finance verification no longer accepted

Status:
revalidation required
```

This prevents teams from presenting an old green report as evidence for a changed standard.

---

# We design the Workbench around explanation

The Rule page should not show only code and pass rate.

It should answer:

## What do we require?

Payment-active Suppliers need verified bank accounts.

## Why?

To prevent payment activation using unreviewed bank details.

## Who owns the policy?

Treasury Data Owner.

## Which records are in scope?

Payment-active Suppliers in the declared migration wave.

## How is it tested?

Through linked validators.

## What counts as Evidence?

An authorised Treasury verification linked to the current bank account.

## What happens on failure?

Payment block or migration block, depending on stage.

## Which exceptions exist?

Bounded, approved deviations with expiry and controls.

## What is the latest result?

Passed, controlled-exception and unresolved populations.

This is more useful than a generic rule catalogue.

---

# The first product slice we should build

The next focused Martenweave capability should be **Rule Layering and Validation Evidence**.

## Goal

Represent one business data-quality obligation independently from its technical validators and execution results.

## Initial scope

Support:

- Rule ID;
- business statement;
- purpose;
- applicability;
- owner;
- required Attributes and Evidence;
- failure consequence;
- validator references;
- enforcement profiles;
- related Decisions;
- active Exceptions.

## Validator scope

Support:

- implemented Rule;
- subject dataset;
- required fields;
- deterministic condition;
- execution parameters;
- output classification.

## Result scope

Support:

- dataset fingerprint;
- model baseline;
- Rule and validator versions;
- passed population;
- controlled exceptions;
- unresolved failures;
- Evidence output.

---

# Proposed commands

A future CLI could expose:

```text
martenweave rule show \
  RULE-SUPPLIER-BANK-VERIFICATION \
  --repo ./model
```

```text
martenweave rule validate \
  RULE-SUPPLIER-BANK-VERIFICATION \
  --repo ./model \
  --dataset ./data/supplier-bank.csv
```

```text
martenweave rule impact \
  RULE-SUPPLIER-BANK-VERIFICATION \
  --repo ./model
```

```text
martenweave rule evidence \
  RULE-SUPPLIER-BANK-VERIFICATION \
  --repo ./model
```

These commands describe a product direction, not the currently documented CLI.

Martenweave’s current documented foundation already includes canonical files, deterministic validation, dataset-gap detection, lineage, impact analysis, dataset readiness and proposal-first change.

---

# What we should not build

We should not turn Martenweave into:

- a full data-observability platform;
- an ETL runtime;
- a generic SQL testing framework;
- an SAP validation replacement;
- a business-rules execution engine;
- a workflow platform.

Existing tools can execute tests efficiently.

For example, dbt data tests are assertions about models and resources and return failing rows when the assertion is violated. That is useful execution behaviour. Martenweave’s role is different: preserving which business Rule the assertion implements, why it exists, where it applies, what Evidence it produced and which change process governs it.

Our product boundary remains the canonical model and governance context.

---

# The business value

Separating policy from technical validation reduces several recurring costs:

- validators that test outdated assumptions;
- duplicate Rules implemented differently across datasets;
- unclear ownership;
- quality scores that hide accepted exceptions;
- false confidence from technically valid values;
- business policies buried in SQL;
- unnecessary rework when source systems change;
- weak auditability of why a record was accepted.

It also makes AI assistance safer.

An agent can:

- identify candidate validators;
- compare implementations;
- summarise failure patterns;
- propose Rule changes;
- detect missing Evidence.

It cannot silently turn a correlation into policy or lower severity to improve readiness.

---

# Final perspective

We do not model data quality as a list of SQL conditions.

We model a chain of meaning and evidence.

For the Supplier bank-verification case:

```text
Business policy:
Payment-active Suppliers require verified bank accounts.

Model obligation:
Current, authorised verification Evidence
must exist for the current bank account.

Technical validators:
Check presence, matching account,
authority and freshness.

Execution result:
Passed, controlled exception or unresolved failure.

Consequence:
Payment activation allowed, blocked or deferred.
```

The practical test is:

> Can we change the technical implementation of bank verification without losing the business obligation, and can we change the business policy without hiding that change inside validator code?

When the answer is yes, the Rule is governed.

When the answer is:

> The SQL returned no rows, so the policy is satisfied,

we know only that one technical assertion passed against one dataset.

We do not yet know whether it represented the right business requirement.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We are building Martenweave so that enterprise data-quality controls remain connected to:

- business meaning;
- scope;
- ownership;
- source authority;
- Evidence;
- consequences;
- Decisions;
- approved exceptions.

Our model is:

```text
Business policy defines the obligation.

Canonical Rules preserve it.

Validators test it.

Results become Evidence.

Findings explain failures.

Humans approve changes.
```

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

## Sources and notes

This article was reviewed on 15 July 2026.

Martenweave Core currently includes Rules, Evidence, Decisions, Mappings and change proposals in its generic canonical model. It keeps canonical files authoritative, performs deterministic validation and requires human review for AI-generated changes.

Its documented pipeline moves from Evidence and profiling through validation, gap detection, lineage and impact analysis to proposals and human-reviewed Git delivery.

The W3C Shapes Constraint Language specification defines a model for validating data graphs against explicitly declared conditions. It distinguishes shapes, constraints, targets and structured validation reports, including focus nodes, result paths, source constraints, messages and severity. Martenweave does not need to adopt RDF or SHACL, but this separation supports the layered validation approach described here.

ISO/IEC 25012 defines a general data-quality model for structured data in computer systems. It provides useful quality-model context, while the specific Rules, ownership, applicability and consequences described in this article remain project and domain concerns.

dbt data tests are assertions about models and other resources; their execution returns failing records when the assertion is violated. This is a useful technical-test pattern, but Martenweave’s intended role is to connect such executable assertions to canonical business Rules, Evidence, impact and governed change.

The separate Policy, Rule, Validator and Validation Result objects, enforcement profiles and proposed commands described here are product directions. They should not be interpreted as guarantees of the exact current Martenweave schema, Workbench behaviour or CLI until implemented and released.

Martenweave is independent and is not affiliated with or endorsed by SAP, W3C, ISO or dbt Labs.
