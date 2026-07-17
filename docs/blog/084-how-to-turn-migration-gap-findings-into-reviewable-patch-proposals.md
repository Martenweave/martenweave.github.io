# How to Turn Migration Gap Findings into Reviewable Patch Proposals

**Reviewed: 14 July 2026**

A profiling script finds that the Product migration dataset has no Plant field.

A validation report finds 1,840 records using an unapproved Profit Centre default.

A business workshop concludes that the Supplier Payment Method must be maintained by Company Code rather than centrally.

An AMS ticket shows that an outbound interface still reads a retired custom field.

A tax specialist explains in an email that one country requires two different tax-number categories.

All five findings may be correct.

None of them changes the model.

They remain distributed across:

- Excel workbooks;
- PowerPoint action lists;
- Jira or ServiceNow tickets;
- validation reports;
- emails;
- meeting minutes;
- chat conversations;
- transformation code;
- individual memory.

A week later, the same problem appears in another discussion.

Someone creates a new spreadsheet column.

Someone else changes the transformation script.

A third person updates an SAP configuration document.

The canonical model still describes the old state.

This is one of the most persistent problems in migration and data-governance work:

> Detecting a problem is much easier than turning it into a precise, validated and reviewable change to model truth.

Most programmes have tools for identifying defects.

They have fewer controls for answering:

- What exactly should change?
- Which canonical object owns the change?
- Is the finding evidence or merely an interpretation?
- Does the proposed correction preserve historical meaning?
- What other mappings, rules and datasets would be affected?
- Does the candidate model still validate?
- Who is qualified to approve the change?
- How do we prevent an AI agent or hurried developer from silently rewriting the model?
- How do we know that the proposal is still valid when it is finally reviewed?

This is the product problem that PatchProposals are meant to solve.

Martenweave is built around a controlled sequence in which evidence leads to a proposal, the proposal is validated against the model, gaps and impact are recalculated, and only then is the change presented for human review. Canonical files remain authoritative, generated indexes are disposable, and AI must not modify model truth silently.

A PatchProposal is therefore not an AI-generated edit.

It is a governed candidate state.

---

# The missing middle between a finding and a model change

Most enterprise programmes already have two ends of the process.

At one end, they have evidence:

```text
The Plant key is missing.
The source value list contains an unknown code.
The target Rule rejected 600 records.
The custom field is no longer used.
The business owner wants a new definition.
```

At the other end, they have implementation:

```text
Change the workbook.
Update the Mapping.
Modify the validation Rule.
Add a field.
Remove the custom endpoint.
Change the transformation script.
```

The missing middle is the disciplined reasoning that connects them.

That middle must preserve:

1. the original evidence;
2. the interpretation of the evidence;
3. the proposed model change;
4. the assumptions behind the proposal;
5. the candidate-state validation;
6. the expected impact;
7. the required reviewers;
8. the final decision.

Without this layer, organisations tend to choose one of two unsafe operating modes.

## Nothing changes

The team records gaps but never incorporates the accepted learning into the reusable model.

The next wave rediscovers the same issue.

## Changes happen too quickly

A developer, analyst or AI agent changes a Mapping because the correction appears obvious.

The change solves one visible case but creates:

- a new source-authority conflict;
- a broken historical path;
- an unintended value conversion;
- a downstream interface defect;
- an invalid Rule;
- a model that no longer explains earlier evidence.

Patch proposals exist to make model learning actionable without making model truth easy to corrupt.

---

# Why a ticket is not enough

A ticket is useful for assigning work.

It usually does not define a candidate model state precisely enough.

Consider this ticket:

```text
Add Plant to Product planning mapping.
```

It does not answer:

- Which Dataset object changes?
- Is Plant a direct input, a conditional input or a key?
- Which Mappings require it?
- Does the Attribute belong to Product or Product Plant?
- Which Plants are in scope?
- Does the source contain a reliable Plant identifier?
- Which fallback should be removed?
- Which evidence becomes stale?
- Which validation commands prove the change?

The ticket can point to the work.

The PatchProposal should describe the model delta.

The relationship should be:

```text
Finding
→ PatchProposal
→ validated candidate
→ issue or pull request
```

not:

```text
Finding
→ vague ticket
→ developer interpretation
→ direct edit
```

GitHub pull requests provide a useful review pattern because proposed changes can be commented on, approved or rejected before they are merged, and repositories can require reviews before acceptance.

Martenweave applies the same principle one level earlier: before a pull request changes canonical files, the intended semantic change should already be explicit and validated.

---

# A PatchProposal is not the same as a Git diff

A Git diff shows textual changes.

A PatchProposal explains why those changes form a coherent model change.

Suppose a proposal updates three files:

```text
Product Plant MRP Controller Attribute
Planner Group to MRP Controller Mapping
Plant planning Rule
```

The Git diff can show the modified lines.

It cannot, by itself, explain:

- which gap triggered the change;
- why Plant became a required context;
- which populations are affected;
- which fallback becomes invalid;
- which downstream planning process needs retesting;
- which business owner must approve the new meaning.

A useful PatchProposal contains both:

```text
machine-applicable change
+
human-reviewable intent
```

The textual diff remains necessary.

It is not sufficient.

---

# The core product promise

Martenweave should make the following transition reliable:

```text
unstructured evidence
→ structured Finding
→ bounded PatchProposal
→ candidate model
→ deterministic validation
→ impact assessment
→ accountable review
→ accepted canonical change
```

Each stage solves a different failure mode.

## Unstructured evidence

Captures reality but may be ambiguous.

## Finding

States what appears wrong or incomplete without pretending the correction is already known.

## PatchProposal

Defines one candidate correction.

## Candidate model

Shows what the repository would look like if the proposal were accepted.

## Validation

Determines whether the candidate is structurally coherent.

## Impact assessment

Shows what else may change or require review.

## Human decision

Establishes model authority.

## Canonical change

Records the approved truth in Git.

This is not a generic workflow engine.

It is a narrow governance loop for model change.

That focus is important.

---

# Findings should not contain hidden solutions

A Finding should describe the observed problem.

Example:

```text
Finding:
Product planning dataset contains Planner Group
but does not contain Plant.

Consequence:
The approved Product Plant MRP Controller Mapping
cannot select a plant-specific conversion.
```

A weak Finding might say:

```text
Add Plant column and use mapping table version 4.
```

That statement already assumes:

- Plant is available;
- the correct solution is source extraction;
- mapping table version 4 is approved;
- no alternate source should be used.

Those assumptions belong in a proposal.

Separating Finding from PatchProposal preserves the difference between:

```text
what we observed
```

and:

```text
what we think should change
```

That difference is essential when AI is involved.

---

# One Finding may produce several proposals

Suppose a Supplier dataset lacks Payment Method.

The programme might consider four responses.

## Proposal A: extend the source extract

Add the authoritative source payment instruction and Company Code context.

## Proposal B: derive from existing fields

Use country, payment channel and Supplier category.

## Proposal C: use manual enrichment

Require Accounts Payable review for affected records.

## Proposal D: defer affected Suppliers

Exclude them from the first migration wave.

The Finding is stable:

```text
No approved source path covers Supplier Company Code Payment Method.
```

The proposals represent competing responses.

Martenweave should not force the first generated proposal to become the only interpretation.

Reviewers need to compare alternatives.

---

# Example 1: Product Plant context is missing

## Evidence

A source dataset contains:

```text
PRODUCT_ID
PLANNER_GROUP
MRP_TYPE
PROCUREMENT_TYPE
```

It does not contain Plant.

## Finding

Several target Attributes belong to Product Plant, but the dataset can identify only Product.

## Business pain

The migration team has a workbook full of plausible planning values.

It cannot assign them safely.

The usual emergency responses are:

- copy the same values to every Plant;
- apply global defaults;
- reject all records;
- ask local teams to correct the values manually after load.

Each response creates cost or risk.

## Candidate proposal

```text
Add Plant as a required DatasetField.

Update the following Mappings to require Plant context:
- MRP Controller
- Procurement Type
- Profit Centre

Retire the global MRP Controller default
for Plants PL20 and PL30.
```

## Candidate-state questions

- Does every source record now identify a valid Plant?
- Are Product-to-Plant relationships present?
- Do all referenced Mappings remain valid?
- Which records lose fallback coverage?
- Which mock-load evidence becomes stale?
- Which planning scenarios must be repeated?

The proposal is not “add one column.”

It is a controlled change to target grain and several dependent paths.

---

# The proposal must target stable model objects

A PatchProposal should refer to canonical IDs, not only labels or file paths.

Weak:

```text
Change MRP Controller mapping.
```

Stronger:

```text
Update:
MAP-PRODUCT-PLANT-MRP-CONTROLLER

Add input:
FEP-LEGACY-PLANT

Input role:
conditional_context
```

Stable object references make it possible to:

- validate the target;
- calculate impact;
- detect stale proposals;
- link Evidence;
- assign reviewers;
- generate a precise diff;
- preserve history when files move.

Labels can change.

Paths can change.

Stable IDs preserve intent.

---

# A proposal needs a base state

A proposal is valid only relative to a known model version.

Suppose an agent proposes:

```text
Replace Supplier Review Status custom endpoint
with the standard SAP endpoint.
```

Before review, another change already:

- retired the custom endpoint;
- updated the Attribute;
- moved one interface;
- changed the value list.

The original proposal is now stale.

Applying it blindly may:

- duplicate relationships;
- restore retired objects;
- overwrite newer decisions;
- remove valid changes.

A PatchProposal should therefore record:

```text
base commit
base model version
expected current values
```

This is analogous to applying a structured patch against an expected target state.

JSON Patch, for example, defines ordered operations such as add, remove, replace and test against a target document; its `test` operation can verify that an expected value exists before later operations proceed.

Martenweave does not need to use JSON Patch as its canonical proposal format.

It does need the same safety concept:

> Apply the proposal only if the assumptions about the base state still hold.

---

# Test before replace

Consider a proposal that changes a Rule severity:

```text
Current:
warning

Proposed:
error
```

The proposal should assert:

```text
The current Rule severity is still warning.
```

If the Rule has already been changed to:

```text
critical_error
```

the proposal should fail as stale rather than overwrite the newer state.

The same principle applies to:

- source authority;
- object status;
- value lists;
- Mapping inputs;
- target endpoints;
- ownership;
- effective dates.

A proposal without preconditions is a delayed direct edit.

---

# Example 2: Supplier tax category

## Evidence

The source dataset contains Country and Tax Identifier.

No source field distinguishes between two legally different identifier categories in one jurisdiction.

## Finding

Country-only derivation cannot determine the correct target category for 1,240 Suppliers.

## Product pain

In a traditional programme, the problem may produce:

- an Excel comment;
- a tax-team email;
- a temporary transformation rule;
- a generic Jira ticket;
- a manual correction list.

None becomes reusable model knowledge.

## Proposal A

Create a manual enrichment DatasetField for Tax Identifier Category.

Require Tax owner approval.

## Proposal B

Add a second authoritative source from the national registry.

## Proposal C

Split the population using Supplier legal type, subject to evidence.

## Review requirement

Tax experts decide semantic validity.

Migration developers decide technical feasibility.

The PatchProposal keeps these responsibilities separate.

An AI agent may identify that legal type appears correlated with category.

It must not promote correlation into model truth without review.

---

# A proposal should explain why alternatives were rejected

A good proposal does not only describe the selected change.

It records the important alternatives.

Example:

```text
Rejected alternative:
Use generic tax category for all affected Suppliers.

Reason:
Generic category would satisfy target format
but would not preserve the country-specific legal meaning.
```

Another:

```text
Rejected alternative:
Copy central Payment Terms to all Company Codes.

Reason:
Three Company Codes maintain approved local terms.
```

Rejected alternatives prevent the same unsafe idea from returning in:

- another wave;
- another ticket;
- another AI session;
- a later support incident.

This is a meaningful product advantage.

Martenweave is not only storing the accepted answer.

It is retaining decision boundaries.

---

# A PatchProposal must state the business effect

Reviewers should not be asked to approve raw model operations without understanding their consequence.

A proposal to add a Mapping input should say:

```text
Business effect:
MRP Controller will be derived per Product Plant
instead of copied globally.
```

A proposal to replace a target endpoint should say:

```text
Business effect:
Supplier Review Status will remain the same business Attribute,
but the standard SAP field becomes the active implementation.
```

A proposal to change a value list should say:

```text
Business effect:
Two valuation categories previously treated separately
will become one target value for valuation area A100.
```

The semantic summary is what business owners approve.

The operations are what validators and developers verify.

---

# Example 3: replacing a custom SAP field

## Evidence

A standard SAP field now supports the required Supplier Review Status.

The old custom field remains connected to:

- one Mapping;
- one validation Rule;
- one report;
- one outbound interface;
- two mock-load reports.

## Finding

The model contains competing active implementations of the same business Attribute.

## Naive change

Delete the custom endpoint and point the Attribute to the standard field.

## Product-aware proposal

1. Mark the standard endpoint as the candidate active implementation.
2. Redirect current Mappings.
3. update Rule implementation references.
4. mark the old endpoint as deprecated.
5. preserve historical Evidence on the old endpoint.
6. identify report and interface changes.
7. define the coexistence period.
8. define retirement criteria.

## Why this matters

The technical field replacement is easy.

The difficult part is preserving:

- historical interpretation;
- downstream compatibility;
- Rule continuity;
- evidence validity;
- rollback options.

This is exactly where a model registry adds value beyond a data catalogue or field mapping workbook.

---

# Candidate-state validation

A proposal should be applied to a temporary candidate model before approval.

Conceptually:

```text
current canonical repository
+
PatchProposal
=
candidate repository
```

Then run:

```text
schema validation
reference validation
domain-context validation
orphan checks
lineage checks
impact analysis
dataset-gap recalculation
health and scorecard
```

The candidate may be rejected even when every individual operation is syntactically valid.

Example:

- the proposed Mapping target exists;
- the source exists;
- both IDs are valid;
- but their Entity grains are incompatible.

Another:

- the proposal retires a custom field;
- all direct references are updated;
- but one critical interface remains dependent on it.

Candidate-state validation turns review from speculation into evidence.

---

# Validation is not approval

A candidate model can validate successfully and still be wrong.

Validation can prove:

- IDs resolve;
- object types are allowed;
- required properties exist;
- structural Rules pass;
- graph paths remain coherent;
- no declared invariant is broken.

Validation cannot independently prove:

- the business meaning is correct;
- a source is authoritative;
- a legal interpretation is acceptable;
- a fallback risk is tolerable;
- Finance accepts the Profit Centre result;
- Operations accepts the planning outcome.

The review loop must preserve both:

```text
machine validity
+
human authority
```

Martenweave’s product principle is explicit: agents propose, validators verify, humans approve, and Git records the result.

---

# Example 4: Product unit conversion

## Evidence

Products contain Base Unit and Sales Unit, but no conversion ratio.

## Finding

The model cannot establish how many base units belong to one sales unit.

## Proposed change

Add an alternative-unit conversion relationship sourced from packaging data.

## Candidate validation

- Base Unit exists.
- Alternative Unit exists.
- numerator and denominator are positive.
- no circular conversion is introduced.
- target unit codes are valid.

## Business review

- Does the packaging relationship represent actual order quantity?
- Is conversion different by Plant or market?
- Does the warehouse use the same unit?
- Can existing stock be interpreted safely?

## Impact

- sales orders;
- warehouse messages;
- pricing;
- quantity conversion;
- reports;
- open transactional data.

The PatchProposal must carry this impact into review.

Otherwise, reviewers see a harmless pair of numbers.

---

# Impact should be calculated before review, not after merge

A common process is:

1. approve the apparent fix;
2. implement it;
3. discover downstream consequences;
4. create more tickets.

A better process is:

1. generate candidate change;
2. calculate impact;
3. identify required reviewers;
4. validate;
5. approve with known consequences.

Impact categories can include:

## Must change

The dependent object becomes invalid.

## Must retest

The object may remain correct, but existing Evidence is stale.

## Must review

Business compatibility is uncertain.

## Historical only

Preserve the existing reference.

## Notify

No model change expected, but an owner should know.

This classification reduces reviewer overload.

---

# The proposal should select reviewers from the model

A change to Supplier Bank Account may require:

- Treasury;
- Accounts Payable;
- Supplier data owner;
- SAP functional owner;
- migration lead.

A Product MRP Type proposal may require:

- Production Planning;
- Plant data owner;
- migration lead.

A tax-category proposal may require:

- Tax;
- local legal or compliance owner;
- SAP Business Partner owner.

Reviewer selection should derive from:

- affected Attribute;
- Domain;
- organisational scope;
- Rule authority;
- impacted interfaces;
- risk level.

The user should not need to remember the full stakeholder map every time.

This is a concrete product capability, not only process advice.

---

# Example 5: Cost Centre valid-from date

## Evidence

The source file lacks `VALID_FROM`.

Mock Load 2 defaulted it to the extract date.

Seventy-four Cost Centres are not valid on the intended go-live date.

## Finding

The source does not provide a reliable effective-start date for the affected Cost Centres.

## Proposal A

Use the programme go-live date for currently active Cost Centres.

## Proposal B

Obtain authoritative validity dates from Finance.

## Proposal C

Defer future Cost Centres and migrate only active ones.

## Candidate impact

- posting readiness;
- Cost Centre hierarchy;
- dependent internal orders;
- historical reporting;
- reconciliation.

## Required decision

Finance must decide whether go-live date is a valid business default.

The migration developer cannot determine this from the dataset.

The PatchProposal should make the decision boundary visible.

---

# Proposal size matters

A proposal should be small enough to review coherently.

Bad proposal:

```text
Fix all Supplier data gaps.
```

It might change:

- tax categories;
- bank verification;
- Payment Methods;
- purchasing blocks;
- source authority;
- several value lists.

Different owners are required.

Different risks apply.

A better approach is to create bounded proposals:

```text
Add Company Code context to Payment Method Mapping.

Define Tax Category enrichment for Portugal.

Add bank-verification Evidence requirement.

Retire obsolete Purchasing Block conversion.
```

Small proposals support:

- focused validation;
- clear impact;
- correct reviewers;
- easier rejection;
- safer merging;
- better historical explanation.

Do not confuse small proposal scope with small business importance.

---

# One proposal should represent one coherent decision

A useful rule is:

> If reviewers could reasonably approve one part and reject another, the proposal is probably too large.

Exceptions exist when several changes are inseparable.

Example:

```text
Replace custom Supplier Review Status endpoint
and update its Mapping, Rule implementation and interface contract.
```

These changes may belong together because partial acceptance would create an invalid transition.

The proposal should explain why they are atomic.

---

# Proposal operations

A PatchProposal may contain operations such as:

```text
create object
update property
add relationship
remove relationship
deprecate object
retire object
replace implementation
change applicability
change value-list membership
add owner
attach Evidence
supersede Decision
```

The operations should use domain language where possible.

A reviewer understands:

```text
deprecate old endpoint
```

better than:

```text
replace YAML status value at line 17
```

The system can translate domain operations into file changes.

That translation is part of the product value.

---

# Semantic operations versus textual operations

Consider:

```text
Move Attribute to Product Plant context.
```

This semantic operation may require:

- changing the Attribute parent;
- updating Mappings;
- updating Rules;
- updating examples;
- invalidating Evidence;
- changing target relationships.

A raw text patch cannot know the full intent.

A semantic PatchProposal can calculate the required candidate changes and surface unresolved consequences.

Martenweave should remain cautious here.

It should not automatically invent every dependent edit.

It should identify required follow-up and fail validation where the candidate remains incomplete.

---

# Example 6: Customer partner functions

## Evidence

Partner role and Partner ID exist.

Sales Area keys are missing.

The migration currently applies self-Payer fallback broadly.

## Finding

The dataset cannot reconstruct Sales Area-specific Payer relationships.

## Candidate proposal

- add Sales Area key fields to the Dataset definition;
- change Payer Mapping applicability to Customer Sales Area;
- restrict self-Payer fallback to records with approved exception;
- add a Rule requiring unresolved external Payers to remain blocked.

## Impact

- billing;
- invoice routing;
- credit processing;
- customer interfaces;
- historical mock-load evidence.

## Reviewers

- Order-to-Cash process owner;
- Customer data owner;
- local sales owners for affected organisations.

The proposal translates a spreadsheet gap into a controlled relationship-model change.

---

# Evidence must travel with the proposal

A reviewer should not need to search through multiple systems to understand why a proposal exists.

The proposal should link:

- original dataset profile;
- sample affected records;
- validation report;
- business Decision or workshop note;
- incident or ticket;
- previous rejected alternatives;
- current model baseline.

Do not copy sensitive production data unnecessarily.

Use:

- aggregate results;
- hashes;
- redacted samples;
- restricted references;
- stable external identifiers.

The proposal should remain reviewable without becoming a data leak.

---

# Evidence can support different parts of the proposal

One Evidence object may support the problem.

Another supports the proposed solution.

Example:

```text
Evidence A:
Plant is missing from the source extract.

Evidence B:
A separate Plant-assignment dataset exists.

Evidence C:
Mock Load 3 shows different Planner Group conversions by Plant.
```

Together they support:

```text
Use Plant-assignment dataset as a contextual input.
```

A proposal supported only by Evidence A may establish the gap but not the correction.

This distinction should be visible.

---

# Proposal confidence

AI-generated proposals should carry confidence at the level of claims.

Example:

```text
High confidence:
Plant is required by the current Mapping.

Medium confidence:
Plant-assignment dataset is the correct alternate source.

Low confidence:
All existing defaults can be retired immediately.
```

Do not compress these into:

```text
proposal confidence: 82%
```

Reviewers need to know where uncertainty resides.

---

# AI should propose the smallest defensible change

An agent may find that Product planning lacks Plant context.

A reckless proposal could:

- redesign the Product model;
- create new Attributes;
- change several Mappings;
- remove defaults;
- add Rules;
- update documentation.

A safer agent asks:

> What is the smallest candidate change that resolves the observed gap without making unsupported assumptions?

That might be:

```text
Add Plant as a required context field
for one existing MRP Controller Mapping.
```

Further changes can follow after validation.

This approach limits hallucination and review burden.

---

# AI should be allowed to say “insufficient evidence”

A proposal generator should not always produce a patch.

Possible result:

```text
Finding confirmed.

No safe PatchProposal generated.

Reason:
Two plausible source-authority interpretations remain unresolved.

Required next step:
Tax owner decision.
```

This is a successful product outcome.

Refusing to fabricate a model change is part of agent safety.

---

# Proposal review should show before and after

Reviewers need to compare the current and candidate states.

## Current

```text
Product MRP Controller:
global default used when Planner Group conversion is missing.
```

## Candidate

```text
Product MRP Controller:
derived by Plant-specific conversion.
No fallback for PL20 or PL30.
```

## Consequence

```text
1,840 records lose current fallback coverage
until new conversions are supplied.
```

A raw file diff may not make this consequence obvious.

The Workbench or generated report should.

Martenweave Workbench is currently positioned as a local browser interface for assessment, investigation, review, reports and controlled changes, while canonical truth remains in the model files.

This review experience is where the Workbench can add real value without becoming a hosted MDM platform.

---

# Proposal review should show unresolved questions

A candidate can be structurally valid while still needing decisions.

Example:

```text
Unresolved:
- Is Plant PL30 in Wave 1 scope?
- Who owns fallback approval?
- Must previous mock-load evidence be rerun?
- Does the downstream planning interface consume MRP Controller?
```

The proposal should not hide these because validation passed.

A review page that shows only green checks encourages premature approval.

---

# Review outcomes

A proposal should support more than approve or reject.

Useful outcomes include:

## Approve

The candidate is accepted.

## Approve with conditions

The change is accepted subject to explicit controls or follow-up.

## Request changes

The proposal direction is valid, but the candidate must be revised.

## Reject

The proposed correction is not acceptable.

## Supersede

Another proposal or Decision replaces it.

## Defer

The proposal remains valid but is outside the current baseline or wave.

These outcomes preserve governance history.

---

# Approved proposal versus applied change

Approval does not necessarily mean the files were changed successfully.

Separate states:

```text
proposed
validated
reviewed
approved
applied
verified
```

Possible failure:

- proposal approved;
- branch changed in the meantime;
- application fails;
- validation after application fails.

The system should not record the proposal as complete merely because someone clicked Approve.

The accepted operations must be applied against the expected base and validated again.

---

# Post-application verification

After applying an approved proposal:

1. validate canonical files;
2. rebuild the index;
3. rerun health checks;
4. recalculate lineage and impact;
5. rerun affected dataset readiness;
6. confirm no unexpected gaps appeared;
7. record the commit;
8. update proposal state.

The applied model can differ from the reviewed candidate if:

- merge conflicts occurred;
- another proposal landed first;
- manual edits were added;
- files were reformatted incorrectly.

Verification closes the loop.

---

# Example 7: expired Product Profit Centre fallback

## Evidence

Plant PL30 Product records use a regional Profit Centre.

The fallback was approved only until first month-end close.

The deadline has passed.

## Finding

An expired fallback remains active for 1,842 Product Plant records.

## Proposal

- add the missing plant-specific derivation;
- identify affected records;
- retire the regional fallback for new records;
- create a remediation requirement for existing records;
- add a Rule preventing future fallback use.

## Candidate impact

- inventory postings;
- finance reporting;
- Product Plant records;
- first-close evidence;
- local Finance ownership.

## Why a PatchProposal matters

A direct data correction would fix current records.

It would not prevent new records from using the expired fallback.

The proposal changes both:

```text
current data-remediation expectation
+
future model behaviour
```

Martenweave’s scope remains model truth and governed change.

It should not perform direct SAP write-back.

---

# Proposal staleness

A proposal can become stale because:

- target object changed;
- Mapping was already updated;
- Finding was disproved;
- affected scope changed;
- another proposal was approved;
- baseline advanced;
- evidence expired;
- source system was replaced.

Staleness should be detectable before review.

Possible diagnostics:

```text
Proposal target no longer matches expected state.

Proposal impact changed after baseline update.

Proposal references retired Evidence.

Proposal conflicts with approved Decision.

Proposal has been functionally superseded.
```

A stale proposal should not remain in a generic Open state indefinitely.

---

# Conflicting proposals

Two proposals may modify the same model path.

Example:

## Proposal A

Use Plant-specific MRP Controller conversion.

## Proposal B

Make MRP Controller manually maintained in SAP.

Both may be valid alternatives.

They should be presented as a conflict requiring a Decision.

Do not apply them in sequence merely because both validate independently.

Conflict detection should consider:

- same object property;
- overlapping applicability;
- competing source authority;
- contradictory Rules;
- mutually exclusive target implementations.

---

# Proposal dependencies

Some proposals must be applied in sequence.

Example:

```text
Proposal 1:
Create Plant-assignment Dataset.

Proposal 2:
Use Plant assignment in MRP Controller Mapping.

Proposal 3:
Retire global default.
```

Proposal 3 should not be approved as immediately applicable if Proposal 1 and Proposal 2 are not accepted.

Dependencies should be explicit.

This prevents a proposal from producing a valid-looking but unusable candidate state.

---

# Review burden is a product problem

Enterprise model changes can generate too much review information.

A useful proposal should not present every downstream object equally.

It should highlight:

- critical direct changes;
- broken paths;
- stale Evidence;
- required retests;
- uncertain business interpretations;
- impacted owners.

Allow deeper expansion for technical detail.

The objective is not maximum information on one screen.

It is sufficient information for a defensible decision.

---

# Proposal quality gates

Before a PatchProposal reaches a business reviewer, it should satisfy basic quality checks.

## Evidence gate

The proposal references a real Finding or Decision.

## Scope gate

Affected objects and contexts are explicit.

## Operation gate

Requested changes are machine-interpretable.

## Preconditions gate

Expected base state is recorded.

## Validation gate

Candidate structure passes deterministic checks.

## Impact gate

Affected paths are calculated.

## Ownership gate

Required reviewers are identified.

## Explanation gate

Business effect is understandable.

A proposal that fails these gates is a draft, not a review-ready change.

---

# Suggested PatchProposal structure

A conceptual proposal might contain:

```yaml
id: PP-PRODUCT-MRP-CONTROLLER-PLANT-CONTEXT
type: PatchProposal

based_on:
  model_commit: abc123
  findings:
    - FIND-PRODUCT-PLANT-CONTEXT-MISSING
  evidence:
    - EVID-MOCK3-PLANNING-PROFILE

summary:
  Add Plant as required context for Product Plant
  MRP Controller derivation.

operations:
  - action: add_mapping_input
    target: MAP-PRODUCT-PLANT-MRP-CONTROLLER
    input: FEP-LEGACY-PLANT
    role: conditional_context

  - action: restrict_fallback
    target: MAP-MRP-CONTROLLER-DEFAULT
    scope:
      exclude:
        - PL20
        - PL30

preconditions:
  - object: MAP-PRODUCT-PLANT-MRP-CONTROLLER
    expected_status: approved

review:
  required_roles:
    - Production Planning Data Owner
    - Plant Data Owner

validation:
  status: passed

impact:
  affected_records: 1840
  retest:
    - MRP planning scenario
```

This is a recommended modelling direction, not a claim about the exact current schema.

The key is the separation between:

- evidence;
- intent;
- operations;
- assumptions;
- validation;
- impact;
- review.

---

# Patch operations should be deterministic

Once a proposal is approved, applying it should not require another round of interpretation.

Weak operation:

```text
Improve the Supplier Payment Method Mapping.
```

Strong operation:

```text
Add FEP-LEGACY-PAYMENT-INSTRUCTION
as a direct input to
MAP-SUPPLIER-COMPANY-CODE-PAYMENT-METHOD.
```

Weak operation:

```text
Fix Review Status.
```

Strong operation:

```text
Replace the active implementation relationship
from FEP-S4-ZZ-REVIEW-STATUS
to FEP-S4-STANDARD-REVIEW-STATUS
effective from baseline RELEASE-2026-10.
```

Ambiguous proposals are just another form of ticket.

---

# The proposal is also a knowledge object

A PatchProposal should remain useful after it is closed.

Later teams should be able to ask:

- Why was Plant added?
- Why was the generic tax category rejected?
- Why did the standard endpoint replace the custom field?
- Which evidence justified the change?
- Which alternatives were considered?
- Which impact was expected?
- Which reviewers approved it?

The proposal becomes part of project memory.

This reduces dependence on the people who happened to attend the original workshop.

---

# How this differentiates Martenweave

Many adjacent tools solve parts of the problem.

## Spreadsheets

Good for collaborative inspection.

Weak as a durable typed change model.

## ITSM and issue trackers

Good for assignment and status.

Weak at expressing candidate model state and validating references.

## Data catalogues

Good for discovery and ownership.

Often weaker at proposal-first modification of a canonical migration model.

## Data-quality platforms

Good for detecting anomalies and executing checks.

They do not necessarily determine which governed model object should change.

## SAP MDG

Good for governing operational master-data creation and change in supported domains and processes.

It does not automatically preserve the migration programme’s external source evidence, mapping reasoning, dataset gaps and Git-based model repository.

## Git pull requests

Good for reviewing textual changes.

They do not independently explain business meaning or generate semantic impact from the model.

Martenweave’s product position is the connective layer:

```text
evidence from existing tools
→ canonical model reasoning
→ validated semantic proposal
→ human-approved Git change
```

It complements those systems rather than replacing them.

---

# The first product wedge

The strongest initial use case is not:

> Build a complete enterprise data-governance platform.

It is:

> Take one real migration gap report and turn selected findings into validated, reviewable model changes.

A useful pilot can demonstrate:

1. profile one migration dataset;
2. detect several model gaps;
3. connect each gap to affected Attributes and Mappings;
4. select one meaningful Finding;
5. generate a PatchProposal;
6. validate the candidate model;
7. show impact;
8. approve or reject;
9. produce a Git-ready change.

That is a complete vertical slice.

It is understandable to a migration lead.

It creates value without requiring a large platform deployment.

---

# A measurable product outcome

The value of PatchProposals can be measured through operational questions.

Before Martenweave:

- How long does it take to determine what should change?
- How often are gaps reopened?
- How many model edits have no linked evidence?
- How often do reviewers discover impact after implementation?
- How many temporary defaults remain undocumented?
- How many decisions depend on unavailable individuals?

After Martenweave:

- percentage of accepted changes with linked Evidence;
- percentage validated before review;
- time from Finding to decision;
- number of stale proposals caught;
- number of impacted objects identified before merge;
- number of rejected alternatives retained;
- number of recurring gaps linked to prior decisions.

These metrics describe governance throughput, not generic AI productivity.

---

# What Martenweave should implement next

Martenweave already declares the essential product contract:

- canonical files own truth;
- deterministic validation happens first;
- AI creates PatchProposals rather than silently changing files;
- approved proposals become controlled changes;
- evidence, gaps, lineage and impact precede GitHub issue or pull-request review.

The next product slice should make that contract visible end to end.

## Goal

Turn one structured Finding into a candidate model change that can be understood, validated and approved without manual reconstruction.

## Initial capabilities

1. Select a Finding.
2. Generate one or more candidate PatchProposals.
3. Record base commit and preconditions.
4. Apply proposal to an isolated candidate state.
5. Run deterministic validation.
6. calculate lineage and impact differences.
7. identify required reviewers.
8. show before-and-after business explanation.
9. approve, reject, request changes or supersede.
10. generate a Git-ready patch only after approval.

## Required proposal fields

- proposal ID;
- source Finding;
- linked Evidence;
- base model version;
- business summary;
- exact operations;
- preconditions;
- affected scope;
- validation result;
- impact result;
- unresolved questions;
- reviewers;
- status.

## Acceptance criteria

The workflow must distinguish:

```text
Finding:
Plant context is missing.
```

from:

```text
Proposal:
Add Plant as a conditional Mapping input.
```

It must allow competing proposals for the same Finding.

It must refuse to apply a proposal when the base state no longer matches.

It must show when a candidate validates structurally but still requires business approval.

It must preserve historical Evidence when an implementation endpoint is replaced.

It must not write directly to SAP.

## Existing command

```text
martenweave propose-patch \
  --from ./note.md \
  --repo ./model
```

The repository currently documents `propose-patch` as part of its CLI workflow.

## Recommended next command set

```text
martenweave proposal validate \
  PP-PRODUCT-MRP-CONTROLLER-PLANT-CONTEXT \
  --repo ./model

martenweave proposal impact \
  PP-PRODUCT-MRP-CONTROLLER-PLANT-CONTEXT \
  --repo ./model

martenweave proposal render \
  PP-PRODUCT-MRP-CONTROLLER-PLANT-CONTEXT \
  --audience business-owner \
  --repo ./model

martenweave proposal apply \
  PP-PRODUCT-MRP-CONTROLLER-PLANT-CONTEXT \
  --repo ./model \
  --dry-run
```

These focused commands describe a recommended product direction rather than the current documented CLI contract.

---

# Final perspective

The fundamental pain is not that migration teams cannot find problems.

They find problems constantly.

The pain is that accepted learning does not move reliably into reusable model truth.

Findings remain in reports.

Decisions remain in meetings.

Workarounds remain in code.

Temporary defaults remain in production.

The next team has to reconstruct the reasoning.

A PatchProposal creates a controlled bridge:

```text
we observed something
→ we interpreted it
→ we propose a precise change
→ we test the candidate
→ we understand the impact
→ the right people approve
→ Git records the new truth
```

The practical test is:

> Can a reviewer see exactly what will change, why it should change, what evidence supports it, which assumptions must still hold and what else will be affected—before the canonical model is modified?

When the answer is yes, AI assistance becomes useful without becoming dangerous.

When the answer is:

> The agent updated the Mapping because the field looked similar,

the organisation has automated model drift.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

Martenweave is a backend-first, source-available model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

Its product purpose is to turn scattered operational evidence into canonical, validated and reviewable model change.

The PatchProposal is central to that purpose.

It prevents two equally damaging outcomes:

- useful findings that never improve the model;
- plausible automated changes that bypass governance.

Martenweave Workbench provides a local browser interface for investigation, review, reports and controlled changes, while the canonical files remain authoritative through the backend-first core.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave Core currently defines canonical files as the source of truth, generated indexes as disposable, deterministic validation as the first control and AI PatchProposals as reviewable objects rather than silent mutations.

Its documented workflow runs from evidence and profiling through validation, gap detection, lineage, impact analysis and AI proposals to human-reviewed GitHub issues or pull requests.

The current CLI documents a `propose-patch` operation alongside repository validation, diffing, trace, impact, health, scorecard and dataset-readiness commands.

GitHub pull-request reviews allow reviewers to comment, approve or request changes before merging, and repositories can require approvals before acceptance. This provides a useful external review pattern, while Martenweave’s PatchProposal layer is intended to make the semantic model change explicit before or alongside the Git diff.

RFC 6902 defines JSON Patch as an ordered sequence of operations such as add, remove, replace, move, copy and test. Its precondition-like `test` operation illustrates the broader safety principle that a patch should verify its expected target state before modifying it. Martenweave proposals may use another representation, but should preserve that principle.

The candidate-state workflow, proposal operations, review states and recommended proposal command set described here are product directions. They should not be interpreted as guarantees of the exact current PatchProposal schema, Workbench implementation or CLI unless separately implemented and published.

Martenweave is independent and is not affiliated with or endorsed by SAP, GitHub or the IETF.
