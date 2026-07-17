# Why AI Should Propose Model Changes but Never Approve Them

**Reviewed: 14 July 2026**

A Product migration dataset contains `PLANNER_GROUP`, `MRP_TYPE` and `PROCUREMENT_TYPE`.

It does not contain Plant.

Martenweave compares the dataset with the canonical model and identifies a problem:

```text
Product planning values are expected at Product Plant level.

The dataset identifies only Product.

The current Mapping cannot determine which plant-specific conversion applies.
```

An AI agent inspects:

- the source columns;
- existing Product Plant Attributes;
- the current Mappings;
- earlier mock-load reports;
- a workshop note mentioning plant-specific planning responsibility;
- a temporary default that assigns MRP Controller `001`.

The agent produces a sensible proposal:

```text
Add Plant as a required contextual input.

Change the MRP Controller Mapping from global to plant-specific.

Remove the temporary default for PL20 and PL30.
```

The proposal is plausible.

It may even be correct.

The AI should still not approve it.

The reason is not simply that “humans should remain in the loop.”

That phrase is too vague to define a product.

The real reason is that the proposal contains several decisions that cannot be established through pattern recognition or structural validation alone:

- whether Plant is the correct governing context;
- whether the available Plant field is authoritative;
- whether the source covers every relevant Product Plant;
- whether controller `001` may remain as a fallback;
- whether PL20 and PL30 are in the current migration wave;
- whether removing the fallback creates an unacceptable cutover risk;
- whether Production Planning accepts the resulting ownership model;
- whether existing evidence must be repeated.

The AI can assemble the evidence.

It can identify the inconsistency.

It can draft the smallest candidate change.

It can apply that change to an isolated candidate model.

It can run validation and calculate impact.

It cannot assume the authority to decide what the enterprise model now means.

> AI can produce a reasoned candidate state. Approval establishes organisational truth.

That distinction is central to Martenweave.

Martenweave Core currently treats canonical model files as the source of truth, requires deterministic validation before indexing, and defines AI output as reviewable `PatchProposal` objects rather than silent mutations. Approved proposals become controlled change objects instead of bypassing human review.

The product is therefore not built around the claim that an agent can maintain the model autonomously.

It is built around a more defensible claim:

> An agent can reduce the work required to investigate, formulate and validate a model change without taking ownership of the final decision.

---

# The pain is not insufficient automation

Migration programmes already contain substantial automation.

Scripts compare schemas.

Profilers detect missing fields.

ETL jobs transform values.

Data-quality tools identify invalid records.

Issue trackers assign remediation tasks.

AI can now read workbooks, summarise tickets and suggest mappings.

The persistent problem is not that nobody can generate a change.

The problem is that the change often crosses boundaries that the automation cannot see clearly.

In the Product planning case, adding Plant appears technical.

It is not only technical.

It changes:

- the grain of the planning model;
- the expected source dataset;
- the applicability of several Mappings;
- responsibility for MRP Controller values;
- the fallback policy;
- the evidence required for migration readiness;
- the population that can be loaded safely.

A quick automated fix may produce better-looking data while weakening governance.

A conservative organisation may respond by prohibiting AI-generated changes entirely.

That also wastes value.

Analysts continue to reconstruct the same dependencies manually.

Reviewers receive vague tickets rather than validated candidate states.

The productive middle is proposal-first automation.

---

# Three different kinds of authority

The Product planning case exposes three forms of authority that should not be collapsed.

## Analytical authority

The ability to inspect evidence and form a reasonable hypothesis.

AI can be strong here.

It can recognise that:

- Product Plant Attributes require Plant context;
- the dataset has no Plant;
- the current default is covering the gap;
- earlier evidence shows different controller assignments by Plant.

## Validation authority

The ability to determine whether a candidate model complies with explicit structural and domain rules.

Deterministic software should own this layer.

It can test:

- whether referenced objects exist;
- whether input roles are allowed;
- whether the target Attribute belongs to Product Plant;
- whether the proposed Mapping creates broken references;
- whether required properties are present;
- whether the candidate graph remains coherent.

## Decision authority

The ability to accept the meaning, scope, risk and ownership consequences of the change.

This belongs to accountable people.

Only the relevant owners can decide:

- that Plant is the governing business context;
- that the proposed source is authoritative;
- that the fallback can be removed;
- that the migration can accept the resulting uncovered population;
- that the planning organisation accepts the new assignments.

AI can support all three layers.

It should own only the first.

Validators should own the second.

Humans must retain the third.

This is more precise than a generic human-in-the-loop statement.

---

# Why validation is not approval

Assume the AI-generated candidate passes every deterministic check.

The model is structurally valid:

```text
Product Plant MRP Controller

Inputs:
- Planner Group
- Plant

Transformation:
plant-specific lookup

Target:
SAP Product Plant MRP Controller
```

No references are broken.

The Entity grain is consistent.

The default Mapping has been removed cleanly.

The impact report identifies all affected objects.

The candidate is valid.

That still does not prove it is acceptable.

Validation can confirm that the proposal conforms to rules already encoded in the system.

It cannot establish every business premise that those rules depend on.

For example, validation may confirm that a Plant endpoint exists.

It cannot determine from existence alone that:

- the Plant value is complete;
- it is sourced from the right system;
- it represents the target Plant rather than a legacy location;
- it is approved for the migration wave;
- local planning owners accept the conversion.

A validator can prove consistency with declared constraints.

Approval establishes that the declarations themselves are accepted.

The distinction matters because a perfectly consistent model can still encode the wrong business decision.

---

# Why a successful test is not approval

The candidate Mapping is tested against Mock Load 3.

Results improve:

```text
Approved plant-specific derivation:
94%

Unmapped:
6%

Global fallback:
0%
```

Previously:

```text
Approved derivation:
82%

Global fallback:
18%
```

The new proposal clearly improves lineage quality.

It also leaves six percent of Product Plant records without an MRP Controller.

The AI could calculate that:

- 1,840 records are affected;
- PL20 and PL30 contain most of them;
- the first MRP run is approaching;
- the removed fallback previously kept the target field complete.

It cannot decide whether:

- the six percent should block cutover;
- the fallback should remain temporarily;
- affected Plants should be deferred;
- local owners should complete the conversion manually;
- controller `001` is operationally acceptable for a bounded period.

These are risk-acceptance decisions.

The test tells the organisation what happens.

It does not decide whether the outcome is acceptable.

---

# Why business approval cannot be inferred from previous behaviour

The AI sees that controller `001` was used during two mock loads.

It may infer:

```text
Controller 001 is an accepted fallback.
```

That inference may be wrong.

The value may have been:

- a technical placeholder;
- an emergency test default;
- accepted only for one mock load;
- tolerated because records were not operational;
- assigned without the planning owner’s knowledge;
- scheduled for removal before cutover.

Observed use is evidence of behaviour.

It is not automatically evidence of authority.

This is the same distinction Martenweave makes between observed runtime evidence and approved model truth.

The agent should report:

```text
Controller 001 was observed as a fallback in Mock Loads 2 and 3.

No current Decision authorising production use was found.
```

It should not silently convert historical behaviour into policy.

---

# Approval is a change in organisational commitment

Before approval, the proposed Mapping means:

> This is a candidate interpretation supported by current evidence.

After approval, it means:

> This is the model the organisation has agreed to use for the declared scope.

That transition carries consequences.

Teams may:

- build transformation code from it;
- block datasets that do not satisfy it;
- use it during cutover;
- rely on it during AMS investigations;
- reject alternate source interpretations;
- apply it in later migration waves;
- train agents to treat it as accepted context.

Approval is therefore not a quality score.

It is an organisational commitment.

An AI system has no independent mandate to make that commitment.

---

# Accountability cannot be delegated to a probability

Suppose the proposal later causes planning assignments to route to the wrong team.

The organisation will need to answer:

- Who approved Plant as the context?
- Who accepted the source Mapping?
- Who accepted removal of the fallback?
- Which evidence supported the decision?
- What scope was approved?
- Which conditions applied?
- Was the proposal changed after review?

“AI confidence was 91 percent” is not an adequate governance record.

Confidence can help reviewers understand uncertainty.

It cannot replace accountable approval.

NIST’s AI Risk Management Framework is intended to help organisations incorporate trustworthiness considerations into the design, use and evaluation of AI systems. The framework’s purpose is risk management, not the transfer of organisational accountability to the model producing the recommendation.

For Martenweave, that means every accepted model change should have:

- an identifiable proposal;
- supporting evidence;
- deterministic validation;
- named reviewers;
- a recorded decision;
- an applied Git change;
- post-application verification.

---

# The AI’s real job is larger than generating YAML

A weak AI integration would take a note and produce a file edit.

For example:

```text
“Plant is missing. Fix the MRP Controller mapping.”
```

The agent changes the Mapping file and opens a pull request.

That is faster typing.

It does not solve the governance problem.

The useful AI role is broader.

For the Product planning gap, the agent should:

1. identify the Finding;
2. retrieve the affected Attribute and Mapping;
3. locate relevant source endpoints;
4. inspect previous Decisions and Evidence;
5. detect the current fallback;
6. formulate a bounded proposal;
7. state its assumptions;
8. generate the candidate state;
9. run deterministic validation;
10. calculate lineage and impact differences;
11. identify stale Evidence;
12. identify required reviewers;
13. explain unresolved questions;
14. prepare a Git-ready change only after approval.

The value is not that AI writes a few lines of YAML.

The value is that it compresses investigation and prepares a decision.

---

# The smallest defensible proposal

An AI agent should not use one gap as permission to redesign an entire domain.

In the Product planning case, it may discover related weaknesses:

- Procurement Type also needs Plant;
- Profit Centre has a similar context issue;
- MRP Type uses a broad default;
- several planning Rules have weak ownership.

A large proposal could attempt to solve everything.

That would be difficult to validate and harder to review.

The safer proposal is:

```text
Add Plant as a conditional input
to the Product Plant MRP Controller Mapping.

Do not change Procurement Type or Profit Centre
in this proposal.

Flag those paths as separate Findings.
```

This is the smallest defensible change that addresses the current evidence.

Small proposals reduce:

- hidden assumptions;
- reviewer burden;
- conflicting ownership;
- accidental scope growth;
- rollback complexity.

AI should optimise for bounded correctness, not maximal activity.

---

# The proposal must state what it does not know

A high-quality proposal should include uncertainty explicitly.

For example:

```text
Confirmed:
- MRP Controller belongs to Product Plant.
- Current Mapping lacks Plant context.
- Global default is active for PL20 and PL30.

Unresolved:
- Whether the source Plant field is authoritative.
- Whether all Wave 1 records contain Plant.
- Whether controller 001 remains acceptable temporarily.
- Whether PL30 is included in the first planning cycle.
```

An agent that hides these uncertainties produces a cleaner-looking proposal and a weaker decision.

The purpose of the proposal is not to persuade reviewers that the AI is correct.

It is to make the decision surface complete.

---

# Sometimes the correct output is no proposal

The AI may find two plausible Plant sources:

```text
Legacy Site Code

Central Plant Cross-Reference
```

Both cover most records.

Their values disagree for part of the population.

No approved source-authority Decision exists.

The correct result is:

```text
Finding confirmed.

No safe model patch generated.

Reason:
Plant source authority is unresolved.

Required decision:
Migration Architecture and Production Planning must select
the authoritative Plant source for Wave 1.
```

This is not agent failure.

It is the system correctly refusing to manufacture certainty.

A proposal-first product must make “insufficient evidence” a valid outcome.

Otherwise, every investigation becomes pressure to generate a patch whether or not one is justified.

---

# Deterministic checks should constrain the agent

The AI should not be trusted to remember every modelling rule.

It should work inside constraints enforced by software.

For the Product planning proposal, validators can check:

- the Mapping exists;
- the proposed input exists;
- the input is allowed for the Domain;
- the Attribute belongs to Product Plant;
- the relationship type is valid;
- the candidate contains no duplicate active Mapping;
- the fallback removal does not create an invalid reference;
- the model index can be rebuilt;
- the proposal references a current base commit.

This division is important.

AI handles ambiguous evidence and language.

Validators handle explicit invariants.

Humans handle authority and risk.

Martenweave’s current product contract already follows this sequence: evidence enters the pipeline, canonical files are validated, generated indexes are rebuilt, gaps and impact are calculated, AI produces proposals, and GitHub issues or pull requests are created for human review rather than automatic acceptance.

---

# Approval should be role-specific

The Product planning proposal should not be approved by any available user.

Different parts require different authority.

## Production Planning owner

Approves:

- the meaning of MRP Controller;
- Plant-specific applicability;
- planning responsibility;
- fallback acceptability.

## Source data owner

Confirms:

- the Plant source;
- coverage;
- data maintenance;
- effective timing.

## Migration lead

Confirms:

- wave scope;
- cutover feasibility;
- remediation capacity;
- evidence plan.

## Technical reviewer

Confirms:

- implementation mapping;
- target compatibility;
- validation;
- deployment implications.

One individual may hold several roles.

The product should still record which authority was exercised.

This is stronger than a generic “approved by user” event.

---

# Approval can be conditional

The reviewers may accept the proposal under specific conditions:

```text
Approved for PL10 and PL20.

PL30 remains on the current fallback
until the local conversion is completed.

Fallback expires before the first full MRP run.

Affected records must remain identifiable.
```

This is not a simple approve/reject decision.

The resulting accepted model may require:

- narrower applicability;
- effective dates;
- a retained fallback;
- a new Rule;
- remediation evidence.

Martenweave should support approval conditions as model content, not merely as a comment beside the proposal.

Otherwise, the patch may be approved while the conditions remain disconnected from the canonical model.

---

# Approval should be invalidated by material change

Assume the proposal was reviewed against:

```text
Model commit:
abc123
```

Before it is applied, another accepted change updates the Product Plant model.

The proposal may now have different impact.

Approval should not survive every model change automatically.

The system should check:

- whether proposal targets changed;
- whether assumptions still hold;
- whether new conflicting paths exist;
- whether affected population changed;
- whether evidence remains current.

A stale approved proposal should return to review when material conditions change.

This is similar to the logic behind protected pull-request reviews: repositories can require approving reviews and dismiss stale approvals when new commits materially change the proposed code. GitHub’s review model distinguishes comments, approval and requested changes before merge.

Martenweave should apply the same principle to semantic model changes.

---

# Approval and application must remain separate

A reviewer may approve the proposal.

The system then attempts to apply it.

Application may fail because:

- the base commit changed;
- a referenced object was retired;
- another proposal changed the Mapping;
- the generated patch no longer applies cleanly;
- post-application validation detects a new conflict.

The product should preserve separate states:

```text
proposed
validated
approved
applied
verified
```

An approved proposal is not complete until:

- the intended operations are applied;
- validation passes again;
- the index rebuilds;
- impact is recalculated;
- the resulting commit is recorded.

This prevents approval from becoming a ceremonial button detached from actual model state.

---

# What happens when AI can approve its own work

Allowing the same agent to propose and approve creates a circular control.

The agent:

1. interprets the evidence;
2. selects an explanation;
3. generates a change;
4. validates the change against known rules;
5. declares the result acceptable;
6. changes the source of truth.

Any mistaken assumption can pass through the whole sequence without an independent challenge.

In the Product planning case, the AI may assume:

```text
Every legacy Site Code maps one-to-one to SAP Plant.
```

The candidate validates structurally.

The Mapping produces target values.

The test dataset looks good.

The assumption is still false for one acquired business unit.

Self-approval turns the agent’s hypothesis into canonical truth before the missing business context is exposed.

The danger is not that AI always makes obvious errors.

The more serious danger is that it can produce a coherent, plausible and well-documented wrong model.

---

# Separation of duties for agentic model change

A safe architecture separates responsibilities.

## Evidence agent

Extracts relevant facts from datasets, tickets, reports and notes.

## Proposal agent

Forms one or more bounded candidate changes.

## Deterministic validator

Checks schemas, references, constraints and candidate coherence.

## Impact engine

Calculates affected model paths and evidence.

## Human reviewers

Decide meaning, authority, scope and risk.

## Application service

Applies only approved operations against the expected base.

## Git

Records the accepted state and history.

These can be implemented as services, commands or agent tools.

They should not collapse into one autonomous “model manager.”

Martenweave remains backend-first precisely because these controls belong in a dependable model layer rather than inside a conversational interface.

---

# The Workbench should make approval difficult in the right ways

Martenweave Workbench is currently positioned as a local browser UI for assessment, investigation, review, reports and controlled changes. It reads from the local API and does not maintain independent model truth outside the canonical files.

For the Product planning proposal, the review screen should show:

## What was observed

Plant context is missing from the current dataset path.

## What AI proposes

Add Plant to the MRP Controller Mapping and restrict the default.

## What changes

Current and candidate lineage.

## Why

Evidence and Finding.

## What is affected

Product Plant records, fallback coverage, Rules and test evidence.

## What validation proved

Structural and domain consistency.

## What remains unresolved

Authority, scope and fallback acceptability.

## Who must approve

Named roles and owners.

## What happens after approval

Candidate application, revalidation and Git commit.

The UI should not reduce this to:

```text
AI recommendation: 91% confidence

Approve
Reject
```

That would make approval fast and weak.

The Workbench should make the reasoning inspectable while keeping the decision focused.

---

# This is not anti-automation

Requiring approval does not mean requiring people to perform every analytical step manually.

The human should not need to:

- search through every Mapping;
- calculate all downstream impact;
- compare every file;
- find stale evidence;
- build the patch;
- identify all validators;
- write the issue.

Those are appropriate automation tasks.

Human effort should concentrate on the irreducible decisions:

- meaning;
- authority;
- acceptable risk;
- scope;
- ownership.

The system is successful when a two-day investigation becomes a focused 20-minute review—not when the review disappears entirely.

---

# The business value of the boundary

The separation between proposal and approval creates several practical benefits.

## Faster investigation

AI assembles relevant evidence and model context.

## Safer change

Deterministic checks prevent structurally invalid candidates.

## Better review

Humans see a bounded decision rather than scattered documents.

## Traceability

Accepted changes retain their evidence and rationale.

## Reusability

Later migration waves inherit approved model knowledge.

## Agent safety

AI cannot convert an unsupported hypothesis directly into source-of-truth data.

## Accountability

The organisation knows who accepted the meaning and risk.

This is the commercial and operational value—not simply “AI governance.”

---

# A concrete Product slice for Martenweave

The most useful next vertical slice should use the Product planning case end to end.

## Input

A dataset-readiness report identifies that Plant is missing from the Product planning dataset.

## Finding

Product Plant MRP Controller cannot be derived through the approved Mapping.

## AI proposal

Add Plant as a conditional Mapping input and restrict the global default.

## Candidate model

The proposal is applied to an isolated repository state.

## Deterministic checks

- model validation;
- reference validation;
- Entity-grain checks;
- fallback coverage;
- index rebuild;
- lineage comparison;
- impact calculation.

## Review package

- before and after;
- affected population;
- lost fallback coverage;
- stale evidence;
- unresolved authority questions;
- required reviewers.

## Human outcome

- approve;
- approve with conditions;
- request changes;
- reject;
- defer.

## Application

Approved operations are applied only if the base state still matches.

## Verification

The model is validated again and Git records the accepted change.

This one slice would demonstrate Martenweave’s core thesis more clearly than a broader autonomous-agent feature.

---

# Required product rules

The proposal workflow should enforce several non-negotiable rules.

## AI cannot set approval state

Only an authenticated human reviewer with an allowed role can approve.

## AI cannot modify canonical files directly

It operates through PatchProposals and candidate states.

## Validation cannot imply approval

A green validation result means structurally acceptable, not organisationally accepted.

## Approval is bound to a model baseline

Material changes can invalidate approval.

## Conditions must be structured

Conditional approval must change applicability, effective dates, Rules or obligations—not remain only in comments.

## Application must be deterministic

Approved operations should not require fresh AI interpretation.

## Post-application validation is mandatory

The accepted result must be verified again.

## Every accepted change must retain provenance

Finding, Evidence, reviewers, decision and commit remain linked.

These rules form the actual product boundary.

---

# Existing and proposed Martenweave capability

Martenweave Core already documents the main principles required for this design:

- Markdown and YAML canonical files own model truth;
- generated indexes are disposable;
- deterministic validation happens before indexing;
- AI produces `PatchProposal` objects;
- approved proposals become controlled changes;
- the pipeline runs from evidence through gaps and impact to human-reviewed Git work.

The CLI also currently documents `propose-patch` alongside validation, repository diff, trace, impact, health and dataset-readiness commands.

The following capabilities remain the important product direction:

- role-aware approval;
- candidate-state rendering;
- structured approval conditions;
- stale-approval detection;
- proposal conflicts and dependencies;
- deterministic application;
- post-application verification;
- Workbench review experience.

These are more important than adding a more autonomous agent.

---

# Final perspective

AI is valuable because enterprise model work contains large amounts of fragmented evidence and repetitive analysis.

It can:

- read;
- compare;
- retrieve;
- classify;
- propose;
- validate;
- explain.

It should not approve its own interpretation of organisational truth.

The correct operating model is:

```text
AI proposes.

Validators verify.

Humans approve.

Git records.
```

That sequence is not a slogan attached to the product.

It is the product architecture.

The practical test is:

> Can the agent prepare a complete, validated and impact-aware Product Plant Mapping proposal while remaining unable to declare the Plant source authoritative, accept the fallback risk or modify the canonical model without accountable review?

When the answer is yes, the organisation gains useful agentic automation.

When the answer is no, it has built an autonomous mechanism for turning plausible assumptions into permanent model drift.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

Martenweave is a backend-first, source-available model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It is designed to turn scattered evidence into precise model proposals while preserving deterministic validation, human authority and Git-based history.

The purpose is not to keep AI outside enterprise data work.

It is to put AI where it creates leverage and keep approval where accountability belongs.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave Core currently defines canonical files as the source of truth, generated indexes as disposable, deterministic validation as the first control and AI-generated `PatchProposal` objects as reviewable changes rather than silent mutations.

Its documented pipeline moves from evidence and profiling through validation, dataset/model gaps, lineage and impact analysis to AI proposals and human-reviewed GitHub issues or pull requests.

Martenweave Workbench is documented as a local browser interface for assessment, investigation, review, reports and controlled changes. It reads through the local API and does not store canonical truth independently of the model files.

NIST describes the AI Risk Management Framework as a voluntary framework intended to help organisations incorporate trustworthiness considerations into the design, development, use and evaluation of AI systems. NIST also notes that the AI RMF is currently being revised.

GitHub pull-request reviews distinguish comments, approval and requested changes before merge. That review model is a useful implementation pattern for Martenweave, although semantic model approval requires additional business context beyond a code diff.

The role-aware approval model, stale-approval detection, structured conditions and candidate-state review workflow described here are recommended Martenweave directions. They should not be interpreted as guarantees of the exact current PatchProposal schema, Workbench behaviour or CLI unless separately implemented and published.

Martenweave is independent and is not affiliated with or endorsed by SAP, NIST or GitHub.
