# How Deterministic Model Validation Works

**Reviewed: 14 July 2026**

A migration analyst adds a new mapping:

```yaml
id: MAP-CRM-SEGMENT-TO-CUSTOMER-GROUP
type: Mapping
source: ATTR-CRM-SEGMENT
target: ATTR-CUSTOMER-GROUP
decision: DEC-CUSTOMER-GROUP-SOURCE-017
```

The file looks reasonable.

The names are plausible. The YAML parses. The source and target appear related.

But the repository contains several problems:

- `ATTR-CRM-SEGMENT` does not exist;
- the actual source object is a physical field endpoint, not a business attribute;
- the referenced decision was rejected;
- the target attribute belongs to a sales-area entity, while the proposed source is central;
- another active mapping already covers the same target population;
- the proposal contains no transformation or applicability context.

A text editor may show no problem.

A generic YAML parser may show no problem.

A search index may happily ingest the file.

The failure becomes visible only when the migration team tries to use the mapping.

Deterministic validation exists to catch as much of this as possible before invalid model state becomes searchable, reviewable or executable.

> A deterministic model validator evaluates declared model state against explicit, repeatable rules and produces the same logical result for the same input and validation version.

It does not ask an AI whether the mapping “looks right.”

It does not rely on who authored the file.

It does not assume that plausible terminology proves semantic equivalence.

It applies known checks to known structures.

Martenweave currently places deterministic validation before indexing. Its public product principles state that objects are checked for IDs, types, references and domain-context rules before generated indexes are built.

That makes validation the gate between human-readable model files and the operational model index.

---

# Deterministic does not mean simplistic

The word “deterministic” is sometimes interpreted as:

> Check whether required fields are present.

That is only the first layer.

A useful enterprise model validator needs to reason across several scopes:

1. file syntax;
2. individual fields;
3. complete object structure;
4. identity across the repository;
5. references between objects;
6. lifecycle and status;
7. domain-specific constraints;
8. repository-wide consistency;
9. proposal and change safety;
10. generated-artifact readiness.

Each layer answers a different question.

A file may pass one layer and fail another.

For example:

```yaml
id: ATTR-SUPPLIER-RISK
type: Attribute
name: Supplier Risk
status: approved
```

This may be valid YAML.

It may satisfy a minimal Attribute schema.

It may still fail repository validation because:

- its entity does not exist;
- no domain is declared;
- another object uses the same ID;
- `approved` objects require an owner;
- an active rule references an older retired version.

Validation should therefore be understood as a pipeline, not one schema check.

---

# Layer 1: Can the file be parsed?

The first question is purely structural:

> Can the system read the file as the expected document format?

Possible failures include:

- malformed YAML frontmatter;
- missing frontmatter delimiters;
- invalid indentation;
- duplicate or malformed keys;
- unsupported text encoding;
- frontmatter that is not a mapping;
- an unreadable file.

Example:

```yaml
---
id: ATTR-CUSTOMER-GROUP
type Attribute
name: Customer Group
---
```

The missing colon after `type` prevents correct YAML parsing.

This is not a business-model error.

It is a document-format error.

The validator should report:

- file path;
- approximate location;
- error class;
- useful message;
- whether further checks were skipped.

YAML itself is a data-serialization language with mappings, sequences and scalar values. Correct YAML syntax only proves that the content can be represented as YAML; it does not prove that the resulting keys and values form a valid Martenweave object.

That distinction matters:

```text
Valid YAML
does not imply
valid model object.
```

---

# Layer 2: Does the object match its declared type?

Once parsed, the object can be checked against a typed structure.

An Attribute may require fields such as:

- ID;
- name;
- entity;
- domain;
- status.

A Mapping may require:

- source;
- target;
- mapping status;
- applicable context.

A Decision may require:

- question;
- outcome;
- authority;
- affected objects.

The exact Martenweave object schemas can evolve. The principle remains:

> The declared object type determines which fields, value types and constraints are allowed or required.

Typical checks include:

- required field present;
- string where string is expected;
- list where list is expected;
- valid enumeration value;
- correct date format;
- non-empty identifier;
- prohibited field combination;
- unexpected field handling.

Martenweave Core currently declares Pydantic as a core dependency. Pydantic supports typed model validation and allows custom checks at both field and whole-model levels.

A typed validation layer might reject:

```yaml
owners: ROLE-CUSTOMER-OWNER
```

when `owners` must be a list:

```yaml
owners:
  - ROLE-CUSTOMER-OWNER
```

It may also reject:

```yaml
status: complete
```

when the permitted lifecycle states are:

```text
draft
pending_review
approved
rejected
retired
```

These checks are deterministic because the accepted structure is declared in code or schema.

---

# Layer 3: Is the individual object internally coherent?

Field validation checks values separately.

Object validation checks whether they make sense together.

Consider:

```yaml
type: Decision
status: approved
approved_by: []
```

Each field may have a valid data type.

The object is internally inconsistent.

Other examples include:

- retired object without retirement date;
- approved proposal without reviewer;
- local override without context;
- temporary deviation without expiry;
- Mapping whose source and target are identical;
- object marked both current and superseded;
- Attribute declaring a value list and free-text-only datatype simultaneously;
- Decision that claims to supersede itself.

These checks require seeing the complete object.

Pydantic’s current validation model distinguishes field-level validators from model-level validators that can evaluate the complete model state.

For Martenweave, the practical distinction is:

```text
Field validation:
Is this value allowed here?

Object validation:
Can these values coexist in this object?
```

---

# Layer 4: Is every object identity valid and unique?

Stable identity is fundamental to a registry.

The validator should check:

- every canonical object has an ID;
- the ID follows the supported pattern;
- no two active files define the same object ID;
- object identity is not silently derived from the filename;
- reserved prefixes are used consistently where required;
- references use IDs rather than ambiguous labels.

Duplicate identity is particularly dangerous.

Suppose two files define:

```yaml
id: ATTR-CUSTOMER-GROUP
```

One describes a central attribute.

The other describes a sales-area attribute.

A search index could:

- overwrite one row;
- retain both unpredictably;
- attach relationships to the wrong object;
- produce unstable results depending on load order.

The validator should stop the build before such ambiguity enters generated state.

The error should identify both files:

```text
Duplicate object ID: ATTR-CUSTOMER-GROUP

Defined in:
- model/attributes/customer-group.md
- model/attributes/sales-area-customer-group.md
```

This is more useful than reporting only the second occurrence.

---

# Layer 5: Do references resolve?

Canonical model objects form a graph.

A Mapping references Attributes or FieldEndpoints.

A Rule references an Attribute.

Evidence supports a Finding.

A Decision affects several objects.

A proposal modifies approved objects.

Every declared reference should be checked.

Basic reference validation asks:

> Does the referenced ID exist?

Example:

```yaml
target: FEP-S4-KNVV-KDGRP
```

If no object with that ID exists, the mapping is incomplete.

But existence alone is insufficient.

The next question is:

> Is the referenced object of an allowed type?

A Mapping source may allow:

- Attribute;
- FieldEndpoint;
- DatasetField.

It should not normally accept:

- Decision;
- Owner;
- PatchProposal.

Therefore, this may still be invalid even when the ID exists:

```yaml
target: DEC-CUSTOMER-GROUP-SOURCE-017
```

Reference validation may also check:

- reference lifecycle;
- domain compatibility;
- direction;
- allowed cardinality;
- circularity where prohibited.

Martenweave’s current product principles explicitly include validation of object references before indexing.

---

# Broken references are not all equivalent

A useful validator should distinguish several cases.

## Missing reference

No object with the ID exists.

```text
MAP-001 references unknown target FEP-S4-KNVV-KDGRP.
```

## Wrong-type reference

The ID exists but represents an incompatible object.

```text
Mapping target must be Attribute or FieldEndpoint,
but DEC-017 is a Decision.
```

## Inactive reference

The object exists but has been retired or rejected.

```text
MAP-001 references retired endpoint FEP-LEGACY-KDGRP.
```

## Ambiguous lifecycle reference

The reference points to a proposal rather than approved state.

```text
Approved Mapping cannot depend on pending PatchProposal PATCH-004.
```

## Missing reciprocal or required relationship

An Entity lists an Attribute, but the Attribute points to another Entity.

Each case has a different remedy.

Clear error codes make automated handling and testing easier.

---

# Layer 6: Does the lifecycle make sense?

Model objects change over time.

A validator should enforce allowed lifecycle transitions and dependencies where they are represented.

Possible states include:

- draft;
- pending review;
- approved;
- rejected;
- superseded;
- retired.

The validator can detect impossible combinations such as:

```yaml
status: approved
rejection_reason: "Semantics not accepted"
```

or:

```yaml
status: retired
effective_to: null
```

More importantly, it can validate cross-object lifecycle relationships.

Examples:

- an approved Mapping must not depend on a rejected Decision;
- a current Rule should not reference a retired Attribute;
- a superseding Decision must reference the Decision it replaces;
- an approved proposal should have a resulting change or application state;
- a retired value should not appear in an active rule without an explicit historical context.

Lifecycle validation prevents obsolete objects from remaining operational merely because their IDs still exist.

---

# Layer 7: Are domain and context rules satisfied?

Generic schemas cannot express every business-model constraint.

Martenweave therefore distinguishes basic structure from domain-context rules.

A generic validator may know:

- a Rule has an affected attribute;
- a Mapping has a source and target;
- an override has a context.

A domain validator may know:

- Customer Group belongs to a sales-area context;
- Supplier Risk should not use workflow states as final classifications;
- an SAP field endpoint must declare its system and physical locator;
- a local override must identify its parent global object;
- an activation rule must declare a lifecycle stage.

The current README explicitly states that validation covers domain-context rules in addition to IDs, types and references.

This is where deterministic validation becomes more valuable than a generic JSON or YAML schema.

Example:

```yaml
id: RULE-CUSTOMER-GROUP-REQUIRED
type: Rule
attribute: ATTR-CUSTOMER-GROUP
scope: global
```

The object may be structurally valid.

But if Customer Group is organisational and requires sales-area context, a domain rule may warn or fail because the rule does not specify the organisational key.

---

# Generic validation and domain validation should remain separate

Mixing every SAP-specific rule into the generic object schema creates a rigid product.

A better architecture separates:

## Core invariants

Applicable to every domain:

- unique ID;
- valid type;
- valid status;
- resolvable references;
- correct lifecycle;
- valid ownership reference.

## Domain-pack rules

Applicable only to selected domains:

- SAP Business Partner role relationships;
- Customer sales-area context;
- Supplier purchasing-organisation context;
- field-endpoint naming;
- required migration mappings;
- global/local inheritance.

This reflects Martenweave’s current positioning: SAP migration and MDM are the first domain pack and proof case, not the product boundary.

A generic data-model repository should not fail because it lacks an SAP table name.

An SAP-specific repository should receive stronger checks where SAP context is declared.

---

# Layer 8: Is the repository consistent as a whole?

Some errors can be detected only after every object has been loaded.

Examples include:

- duplicate IDs;
- circular relationships;
- two active mappings claiming exclusive authority for the same context;
- object without any owner;
- entity referencing an attribute that references another entity;
- approved rule with no applicable endpoint;
- proposal modifying an unknown object;
- global object with conflicting local overrides;
- several active decisions claiming to supersede the same baseline.

This is repository-level validation.

It needs a complete registry in memory or an equivalent intermediate representation.

The order is important:

```text
Parse every candidate object
→ validate object structures
→ build identity registry
→ resolve references
→ run repository-wide rules
```

Running repository rules while files are loaded one by one can produce order-dependent results.

Order dependence weakens determinism.

---

# Determinism requires stable input ordering

Suppose two invalid objects create the same conflicting relationship.

If filesystem order changes, the validator should not report a different “winner.”

Useful practices include:

- sort discovered file paths;
- sort object IDs before repository checks;
- sort diagnostics by file, object and error code;
- avoid first-loaded-object authority;
- make duplicate reports symmetrical;
- avoid timestamps in semantic results.

This improves:

- test stability;
- CI output;
- comparison across environments;
- agent interpretation;
- developer trust.

A deterministic validator should not merely find the same number of errors.

It should provide predictably ordered and identifiable diagnostics.

---

# Validation output needs stable error codes

Human-readable messages are essential.

Stable codes make validation operational.

Example:

```text
MW-ID-001
Duplicate object ID

MW-REF-002
Referenced object does not exist

MW-REF-004
Referenced object has incompatible type

MW-LIFE-003
Approved object depends on rejected object

MW-CTX-SAP-007
Sales-area attribute lacks organisational context
```

Stable codes allow:

- tests to assert specific failures;
- CI to classify results;
- documentation to explain remedies;
- integrations to display targeted guidance;
- agents to propose narrow corrections;
- teams to track recurring model-quality problems.

Messages may improve over time.

The meaning of an error code should remain controlled.

---

# Error, warning and information are different

Not every finding should block the build.

A useful severity model may include:

## Error

Canonical or generated state would be structurally unsafe.

Examples:

- duplicate ID;
- malformed object;
- missing required reference;
- approved object depends on rejected object.

## Warning

The model is valid enough to process but carries a governance or methodology risk.

Examples:

- approved Attribute has no owner;
- evidence is stale;
- mapping has no transformation rationale;
- an expected enrichment remains unresolved.

## Information

A useful observation that requires no immediate correction.

Examples:

- optional description omitted;
- object has no downstream references;
- proposal affects no currently indexed implementation.

The current Martenweave demo expects zero validation errors while allowing methodology warnings because the bundled example intentionally retains certain enrichment gaps for demonstration.

That is a useful distinction.

A repository may be technically valid but not operationally ready.

---

# Warnings should not become ignorable noise

Warnings are often introduced because a team does not want to block delivery.

Over time, hundreds accumulate.

Users stop reading them.

A warning should therefore have:

- code;
- object;
- explanation;
- likely consequence;
- remediation;
- suppression policy where justified.

A repository-level scorecard can track warning trends.

For example:

```text
Unowned approved attributes: 7
Mappings without supporting decision: 3
Temporary deviations nearing expiry: 2
Stale evidence references: 11
```

The goal is not zero warnings in every pilot.

The goal is to prevent accepted incompleteness from becoming invisible.

Martenweave’s current command set separates validation from health, scorecard and broader analysis commands, which supports this distinction between structural errors and governance readiness.

---

# Validation should not silently repair canonical truth

Some validation frameworks can coerce values.

For example:

```yaml
owners: ROLE-OWNER
```

might be automatically transformed into:

```yaml
owners:
  - ROLE-OWNER
```

Coercion can improve usability.

It can also hide errors.

The validator should distinguish:

- harmless normalisation;
- potentially semantic transformation.

Safe normalisation may include:

- trimming surrounding whitespace;
- normalising line endings;
- standardising a date representation after valid parsing.

Risky coercion includes:

- converting one owner into several;
- interpreting a string as an object reference;
- changing status aliases;
- inventing missing context;
- replacing an unknown value with a default.

Pydantic supports validators that can check or transform values, including before, after and whole-model validators.

Martenweave should use this capability conservatively for canonical model truth.

Validation should report semantic ambiguity rather than silently resolve it.

---

# Strict input is especially important for IDs

Consider:

```yaml
id: 10001
```

A permissive parser might convert the number into a string.

But object IDs may follow a controlled namespace:

```text
ATTR-CUSTOMER-GROUP
```

Accepting arbitrary coercion weakens identity rules.

The same concern applies to:

- booleans represented as strings;
- dates parsed differently by environments;
- scalar values accidentally interpreted as numbers;
- identifiers with leading zeros.

YAML supports several scalar forms, so typed model validation should define what Martenweave accepts rather than relying only on a parser’s implicit interpretation.

---

# Validation should be side-effect free

Running validation should not:

- modify canonical files;
- create approved objects;
- change statuses;
- call SAP;
- write tickets;
- apply proposals;
- repair references silently.

The command may generate:

- console diagnostics;
- structured JSON output;
- temporary analysis state;
- validation reports.

But the same repository should remain unchanged after validation.

This property matters for:

- CI;
- local experimentation;
- agent workflows;
- pull-request review;
- reproducibility.

A validator is a gate and diagnostic tool.

It is not an autonomous remediation engine.

---

# Validation and model inference are different operations

A dataset may contain a column:

```text
SUPPLIER_REVIEW_STATUS
```

An inference tool may propose an Attribute.

A validator can check whether the resulting proposal has:

- valid ID;
- valid type;
- domain;
- references;
- status;
- required metadata.

It cannot prove merely from the column that the proposed business concept is correct.

Inference asks:

> What model might explain this evidence?

Validation asks:

> Does this declared model satisfy explicit constraints?

The distinction is critical for AI-assisted workflows.

---

# Validation and data-quality checking are also different

Model validation checks canonical model structure.

Dataset validation checks records against expectations.

Examples:

## Model validation

- Rule references a valid Attribute.
- Mapping source exists.
- Attribute has an owner.
- local override has a parent.

## Dataset validation

- required column exists;
- values conform to allowed codes;
- completeness meets the stated condition;
- records satisfy a rule.

The two interact.

A dataset-readiness run first needs a valid model against which the dataset can be compared.

Martenweave’s current one-command readiness flow combines repository validation, index generation, dataset profiling, gap detection and report creation.

The sequence matters:

```text
Validate model
before
judging dataset against model.
```

---

# Proposal validation should be stricter than draft validation

A draft object may be incomplete.

A proposal submitted for review should meet a higher standard.

An approved change should meet a higher standard again.

Possible validation profiles include:

## Draft profile

Allows:

- missing owner;
- unresolved reference placeholder;
- incomplete rationale.

## Review profile

Requires:

- affected objects;
- evidence;
- proposed change;
- accountable reviewer;
- valid references.

## Approval profile

Requires:

- no blocking errors;
- resolved critical impact;
- approved authority;
- valid target state;
- closure of incompatible decisions.

This avoids one of two extremes:

- rejecting early drafts before they can be discussed;
- allowing incomplete proposals to reach approval.

Validation should therefore consider both object type and lifecycle stage.

---

# A PatchProposal must not validate only as a document

A proposal may contain valid metadata and still be unsafe.

Proposal validation should ask:

- Do target objects exist?
- Does the proposal add, modify, retire or replace them?
- Are proposed IDs unique?
- Does it reference evidence?
- Does it reference current baseline state?
- Would it create broken references?
- Would it leave active dependants pointing to a retired object?
- Does the reviewer have the required authority?
- Does it conflict with another pending proposal?

The current Martenweave workflow promotes generated findings into `PatchProposal` objects in `pending_review` status and keeps them subject to human review.

A proposal-first architecture becomes useful only when proposals are validated as prospective model changes, not just well-formed files.

---

# Prospective validation is more valuable than post-change validation

Ordinary validation checks the repository as it exists now.

Prospective validation checks:

> What would the repository look like if this proposal were applied?

Conceptually:

```text
Current canonical state
+
proposed patch
=
candidate state

Validate candidate state
before merge.
```

This can reveal:

- references broken by retirement;
- duplicate IDs introduced by addition;
- ownership gaps;
- overlapping rules;
- invalid lifecycle transitions;
- incompatible context changes.

The proposal can fail before it modifies approved state.

This is one of the strongest uses of deterministic validation in an agentic system.

---

# Change validation should consider impact boundaries

A one-line change may be structurally valid:

```diff
- required: false
+ required: true
```

But validation may require accompanying objects or evidence.

For example, making a field mandatory could require:

- an active rule;
- applicable lifecycle stage;
- source capability;
- test evidence;
- approved decision;
- exception treatment.

Not all these conditions should be hard-coded universally.

Domain packs can define change-policy checks such as:

```text
A mandatory SAP target attribute must have:
- at least one governed source or enrichment path;
- a defined applicability context;
- an accountable owner;
- a linked approved decision.
```

This turns validation into a delivery-risk control without pretending that it proves implementation readiness completely.

---

# A worked example: missing source reference

Proposed Mapping:

```yaml
id: MAP-ERP-B-RISK-TO-S4
type: Mapping
source: FEP-ERP-B-SUPPLIER-RISK
target: FEP-S4-SUPPLIER-RISK
status: approved
```

Repository state:

- target exists;
- source does not exist.

Validation result:

```text
ERROR MW-REF-002

Object:
MAP-ERP-B-RISK-TO-S4

Field:
source

Reference:
FEP-ERP-B-SUPPLIER-RISK

Reason:
Referenced object does not exist.
```

The validator does not guess that another similarly named field was intended.

The author must:

- add the missing source endpoint;
- correct the ID;
- reject the Mapping.

---

# A worked example: semantically suspicious but structurally valid

Attribute:

```yaml
id: ATTR-SUPPLIER-RISK
type: Attribute
allowed_values:
  - LOW
  - STANDARD
  - HIGH
  - UNDER_REVIEW
```

Basic schema:

- valid.

Reference checks:

- valid.

Possible domain rule:

```text
WARNING MW-DOMAIN-011

Value UNDER_REVIEW appears to represent lifecycle state
inside a classification attribute.

Review whether Supplier Review Status should be modelled separately.
```

The validator should not automatically split the Attribute.

It identifies a declared anti-pattern and routes it to human review.

---

# A worked example: approved mapping depends on rejected decision

Mapping:

```yaml
id: MAP-CRM-SEGMENT-TO-CUSTOMER-GROUP
type: Mapping
status: approved
decision:
  - DEC-CUSTOMER-GROUP-SOURCE-017
```

Decision:

```yaml
id: DEC-CUSTOMER-GROUP-SOURCE-017
type: Decision
status: rejected
```

Validation:

```text
ERROR MW-LIFE-006

Approved Mapping depends on rejected Decision
DEC-CUSTOMER-GROUP-SOURCE-017.
```

The objects are individually parseable.

The repository is inconsistent.

---

# A worked example: local override without global parent

Rule:

```yaml
id: RULE-PT-TAX-IDENTIFIER
type: Rule
scope: local
country: PT
overrides: RULE-GLOBAL-TAX-IDENTIFIER
```

No global rule with that ID exists.

Possible result:

```text
ERROR MW-REF-002
Unknown override target.

ERROR MW-CTX-LOCAL-003
Local override requires a valid global parent.
```

One missing reference creates two meaningful diagnostics:

- the direct reference is broken;
- the global/local governance structure is incomplete.

---

# A worked example: warning rather than failure

Approved Attribute:

```yaml
id: ATTR-CUSTOMER-GROUP
type: Attribute
status: approved
owners: []
```

The repository can still be indexed.

But governance is weak.

Possible result:

```text
WARNING MW-OWN-001

Approved Attribute has no accountable owner.
```

Whether this blocks publication depends on the selected validation profile and organisational policy.

A pilot may permit it.

A production governance baseline may not.

---

# Configuration should control policy without changing meaning

Useful configuration may define:

- which warnings become errors;
- which domain packs are active;
- permitted ID patterns;
- repository size thresholds;
- required fields by lifecycle;
- ignored paths;
- output format.

The same repository validated under a stricter profile may produce more blocking findings.

That does not violate determinism when the validation profile is part of the declared input.

The complete deterministic input is:

```text
canonical repository
+
validator version
+
schema version
+
validation profile
+
domain-pack version
```

If any of these change, results may legitimately change.

---

# Versioning validation rules is essential

A repository that passed validation last year may fail under a newer validator.

Possible reasons:

- new inconsistency check;
- deprecated status;
- stricter ownership requirement;
- corrected schema;
- new domain rule.

This is not necessarily a product defect.

But the change must be controlled.

A validation release should explain:

- new rules;
- changed severities;
- deprecated fields;
- migration path;
- compatibility impact.

Otherwise, teams experience validation as arbitrary.

The current Martenweave source identifies its package version and exposes release-grade smoke testing against bundled examples.

Stable examples help detect unintentional changes in validation behaviour.

---

# Validation should work locally and in CI

A strong workflow runs the same validator in several places.

## Local authoring

The analyst validates before committing.

## Pull request

CI validates the proposed branch.

## Release build

The accepted repository is validated before indexes and artefacts are published.

## Agent workflow

An agent validates a draft proposal before presenting it.

## Scheduled health check

The repository is revalidated after tool or domain-pack updates.

The command should remain consistent:

```bash
martenweave validate --repo ./model
```

The current public demo begins with this validation step and expects zero blocking errors before index generation.

---

# Structured output matters for automation

Human-readable console output is useful.

Machines need structured results.

A validation result can conceptually contain:

```json
{
  "valid": false,
  "errors": 2,
  "warnings": 1,
  "diagnostics": [
    {
      "code": "MW-REF-002",
      "severity": "error",
      "object_id": "MAP-ERP-B-RISK-TO-S4",
      "field": "source",
      "reference": "FEP-ERP-B-SUPPLIER-RISK"
    }
  ]
}
```

The exact schema is a product contract that should be versioned when exposed publicly.

Structured output enables:

- CI annotations;
- IDE integration;
- API responses;
- issue generation;
- agent remediation proposals;
- governance dashboards.

It should not omit the human explanation.

---

# Validation should fail safely

When one file cannot be parsed, the validator has a choice:

- stop immediately;
- continue checking independent files;
- skip repository checks that require complete state.

A useful result may report:

```text
1 parsing error
3 object errors
Repository-wide reference validation incomplete
```

This is more informative than stopping at the first error.

But it must not claim complete repository validity when some objects could not be loaded.

The report should distinguish:

- checks executed;
- checks skipped;
- checks incomplete;
- overall reliability of the result.

---

# What deterministic validation cannot prove

This boundary must remain explicit.

A validator cannot prove that:

- the business definition is correct;
- two fields are genuinely semantically equivalent;
- an owner has enough organisational authority;
- a source will provide complete data;
- a proposed default is ethically or commercially acceptable;
- an SAP configuration actually matches the model;
- a local legal interpretation is correct;
- a decision was politically legitimate;
- a Markdown explanation is truthful.

It can validate only what has been formalised.

For example:

```yaml
source_equivalent_to_target: true
```

may be structurally valid.

The validator cannot know that the claim is true unless supporting rules and evidence have been encoded in a checkable form.

This is why deterministic validation and human approval are complementary.

---

# More rules do not always mean better validation

A validator can become unusable when it attempts to encode every methodological preference as a hard error.

Consequences include:

- teams bypass validation;
- drafts become difficult to create;
- local legitimate variation is rejected;
- warnings become overwhelming;
- the schema becomes coupled to one programme.

A good rule should satisfy several conditions:

- it detects a meaningful failure;
- the condition is objectively testable;
- the remediation is understandable;
- false positives are limited;
- scope is clear;
- severity is proportionate.

When a rule depends heavily on judgement, it may be better represented as:

- warning;
- review checklist;
- scorecard signal;
- evidence prompt.

---

# The validator should explain, not merely reject

Weak diagnostic:

```text
Invalid object.
```

Stronger diagnostic:

```text
Approved local Rule RULE-PT-TAX-IDENTIFIER
references missing global parent RULE-GLOBAL-TAX-IDENTIFIER.

Add the parent reference, change the rule scope,
or keep the rule in draft status.
```

A useful diagnostic tells the author:

- what failed;
- where;
- why it matters;
- likely correction paths.

This is especially important for business-facing contributors who may encounter validation through an imported spreadsheet or UI rather than in source code.

---

# Auto-fix should remain narrow

Some failures can be corrected mechanically:

- trailing whitespace;
- known field-name migration;
- deterministic ordering;
- missing final newline;
- deprecated but unambiguous status alias.

Other corrections require judgement:

- selecting an owner;
- choosing a source;
- splitting an attribute;
- resolving a rule conflict;
- changing scope.

A safe auto-fix policy is:

```text
Auto-fix presentation and unambiguous syntax.

Propose semantic changes.

Never silently approve them.
```

An agent can draft the correction.

The resulting change should still enter the proposal and review path.

---

# Validation is the safety boundary for AI

AI can create plausible but structurally invalid objects.

Typical failures include:

- invented IDs;
- references to non-existent rules;
- wrong object types;
- unsupported statuses;
- local overrides without parents;
- duplicate attributes;
- proposals based on rejected decisions.

Deterministic validation catches these failures without needing another AI judgement.

The safe sequence is:

```text
AI extracts or proposes
→ deterministic validator checks
→ impact analysis runs
→ human reviews meaning
→ approved change is recorded
```

The current Martenweave principle is explicit:

> Agents propose. Validators verify. Humans approve. Git records.

The validator does not make AI trustworthy by itself.

It narrows the space of structurally permitted output.

---

# Validation also protects humans from humans

Many model inconsistencies are not caused by AI.

They come from:

- copy-and-paste;
- stale Excel imports;
- renamed files;
- mistyped IDs;
- forgotten dependencies;
- emergency edits;
- parallel teams;
- local changes;
- incomplete handovers.

Deterministic validation provides the same gate regardless of author.

That neutrality is valuable.

A senior architect’s file should fail for the same broken reference as an agent-generated file.

---

# Validation should precede every generated view

Martenweave can generate:

- SQLite index;
- search documents;
- lineage edges;
- readiness reports;
- static viewer;
- issue drafts;
- proposal outputs.

Each generated view can amplify invalid state.

Therefore, the default workflow should remain:

```text
canonical files
→ validation
→ generated artefacts
```

The public demo follows exactly this order: validate first, then build `modelops.db`, search documents and lineage edges.

A development override may allow inspection of invalid state.

It should be explicit and clearly marked.

---

# Validation and health should not be collapsed

A repository can be valid but unhealthy.

Valid:

- all IDs unique;
- references resolve;
- schemas pass.

Unhealthy:

- many objects lack owners;
- evidence is stale;
- mappings are incomplete;
- decisions remain pending;
- temporary deviations are expiring;
- dataset coverage is weak.

Martenweave exposes separate commands for:

- `validate`;
- `health`;
- `scorecard`;
- `owners`;
- `analyze`;
- `gap-report`.

This is the correct distinction.

Validation answers:

> Is declared model state internally processable and consistent?

Health answers:

> Is the model sufficiently complete, governed and ready for its purpose?

---

# A practical validation ladder

A team adopting Martenweave can increase strictness gradually.

## Level 1: Parse and identity

- every file parses;
- every object has a unique ID;
- object type is supported.

## Level 2: Typed objects

- required fields;
- allowed values;
- correct field types;
- internal object consistency.

## Level 3: References

- all links resolve;
- referenced types are compatible;
- lifecycle references are valid.

## Level 4: Governance

- approved objects have owners;
- decisions have authority;
- exceptions have scope;
- deviations have expiry.

## Level 5: Domain rules

- SAP context;
- global/local inheritance;
- lifecycle applicability;
- mapping granularity;
- endpoint requirements.

## Level 6: Change safety

- proposals validate against candidate state;
- retirements do not break dependants;
- breaking changes require impact evidence.

This ladder allows a pilot to begin without pretending it already has enterprise-grade model completeness.

---

# Acceptance criteria for deterministic validation

A trustworthy validator should be:

## Repeatable

The same declared input produces the same logical diagnostics.

## Explainable

Every result refers to a rule and affected object.

## Side-effect free

Validation does not mutate canonical truth.

## Layered

Syntax, object, references, repository and domain checks remain distinguishable.

## Versioned

Rule changes are tied to validator and schema versions.

## Automatable

Results can be consumed by CI, APIs and agents.

## Human-readable

Authors can understand and correct failures.

## Conservative

It does not invent missing business meaning.

## Extensible

Domain packs can add rules without corrupting the generic core.

## Proportionate

Hard errors are reserved for conditions that should block publication or generation.

---

# Final perspective

Deterministic validation is not a claim that enterprise data models can be reduced to code.

It is a claim that many expensive model failures are objectively detectable.

A machine can reliably detect:

- malformed files;
- missing required fields;
- duplicate identities;
- unknown references;
- incompatible object types;
- invalid lifecycle relationships;
- declared context violations;
- structurally unsafe proposals.

It cannot decide:

- whether Customer Group truly equals CRM Segment;
- whether Supplier Risk should be mandatory;
- whether a Portuguese exception is legally justified;
- whether a business owner should accept the change.

Those questions remain with accountable humans.

The architecture is strongest when each part does the work it can actually perform:

```text
Schemas check shape.

Validators check declared consistency.

Dataset tests check observed data.

Impact analysis checks connected consequences.

AI proposes interpretations and changes.

Humans decide meaning and authority.

Git records the accepted state.
```

Martenweave’s product direction depends on keeping these boundaries clear.

Without deterministic validation, canonical files are only organised documentation.

With validation but no human authority, the repository becomes a technically consistent model that may still be wrong.

The practical test is:

> Can two independent environments validate the same repository with the same rule set and receive the same blocking results—while every semantic judgement remains traceable to an explicit human decision?

When the answer is yes, validation is functioning as an engineering control.

When the result depends on who runs it, which file loads first or what an AI happens to infer, it is not deterministic governance.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

Its validators check canonical model structure, identity, references and declared domain constraints before generated indexes, reports and proposals are published.

The objective is not to automate business authority.

It is to make invalid or inconsistent model state difficult to publish accidentally.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave Core currently defines deterministic validation as a core principle and states that model objects are checked for IDs, types, references and domain-context rules before indexing.

The public demo starts with `martenweave validate`, expects zero blocking validation errors and allows explicitly retained methodology warnings before generated indexes are built.

The current command set separates structural validation from repository health, scorecards, ownership analysis, broader readiness analysis and gap reporting.

Martenweave Core currently declares Pydantic and PyYAML among its core dependencies.

Pydantic’s current official documentation distinguishes built-in type validation, field validators and whole-model validators for enforcing more complex constraints. It also documents that validators may check or transform values, which is why canonical-model coercion should be used conservatively.

The YAML 1.2.2 specification defines YAML as a data-serialization language with mappings, sequences and scalar nodes. Correct YAML syntax establishes parseability, not conformance with a Martenweave object schema or business model.

Martenweave is independent and is not affiliated with or endorsed by Pydantic, YAML, SAP or other projects and vendors discussed in the broader series.
