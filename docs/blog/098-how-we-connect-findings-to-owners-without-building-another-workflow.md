# How We Connect Findings to Owners Without Building Another Workflow Engine

**Reviewed: 15 July 2026**

We confirm a critical Supplier bank-data Finding.

Forty payment-active Suppliers have expired bank verification, but the expected payment block is not active.

*The scenario and figures in this opening are illustrative modelling assumptions, not a customer result or a measured outcome.*

The Finding is clear enough:

> Payment may remain enabled for bank details that are no longer covered by current Treasury verification.

The next question sounds simple:

> Who owns this?

The migration team assigns the Finding to a developer.

The developer can change the transformation.

They cannot decide:

- whether expired verification must block payment;
- whether the affected Suppliers may remain in the cutover wave;
- whether Treasury accepts another evidence source;
- whether a temporary exception is acceptable;
- whether the Finding is resolved from a business perspective.

The issue is reassigned to Treasury.

Treasury can define the verification requirement.

They cannot implement the migration Mapping, update the cutover dataset or validate the target payment block alone.

The issue is then assigned to the Supplier migration lead.

The migration lead coordinates the work but does not own the bank-control policy.

Several people are involved.

Nobody has a precise accountability.

This is how Findings become stuck even when they are technically well described.

> A Finding does not need one generic owner. It needs explicit ownership for the different decisions and actions required to resolve it.

At the same time, we do not want Martenweave to become:

- a workflow engine;
- a ticketing platform;
- an organisational directory;
- a project-management system;
- an approval inbox;
- a replacement for GitHub, Jira or ServiceNow.

Our role is narrower.

We preserve who is accountable for the model meaning, who owns the affected data, who must implement the remediation and who has authority to accept the remaining risk.

The delivery system manages:

- assignment;
- status;
- due dates;
- comments;
- sprints;
- notifications;
- escalation.

Martenweave manages the ownership contract around canonical model truth.

The distinction is:

```
Martenweave:
Who must decide, provide evidence,
implement and approve closure?

Delivery system:
Who is currently doing which task,
and what is its delivery status?
```

Martenweave’s current architecture supports this boundary. The product is defined as a backend-first model-governance pipeline with canonical files, deterministic validation, lineage, impact analysis and human-reviewed proposals. It explicitly avoids becoming a generic workflow platform or hosted multi-tenant application.

---

# The word “owner” is too ambiguous

In enterprise migration work, “owner” may refer to several different responsibilities.

For the Supplier bank-verification Finding, possible owners include:

## Business policy owner

Defines what verified bank data means and what control is required.

In our case:

```
Treasury Data Owner
```

## Data owner

Owns the authoritative Treasury verification dataset and its quality.

## Model owner

Owns the canonical representation of Supplier Bank Verification, its Rule and its source authority.

## Migration owner

Owns the readiness of the Supplier migration scope.

## Implementation owner

Changes the Mapping, transformation or target-control logic.

## Risk owner

Accepts or rejects the remaining business exposure.

## Finding coordinator

Makes sure the investigation, remediation and Evidence remain connected.

All of these may be called “the owner” in a meeting.

They are not interchangeable.

If we store only:

```
owner:
Supplier Migration Lead
```

we have not solved ownership.

We have compressed a multi-party accountability model into one label.

---

# Our running case

The Finding is:

```
Finding:
Expired Supplier bank verification
without confirmed payment block

Affected population:
40 payment-active Suppliers

Business process:
Outgoing Supplier Payment

Required Rule:
Unverified or expired bank details
must not remain payment-enabled
```

The remediation may require four different actions:

1. confirm the accepted business treatment;
2. identify the correct affected population;
3. implement or correct the payment-block path;
4. rerun validation and approve closure.

No single person necessarily has authority and capability across all four.

We therefore assign roles to obligations rather than assigning the whole Finding to one person.

---

# We start with accountability, not task assignment

The most important ownership question is:

> Who has authority to decide what must be true?

For the Supplier case, Treasury may be accountable for the policy:

```
Expired verification requires payment block.
```

The Supplier migration team cannot redefine this requirement merely because implementation is difficult.

The developer cannot decide that a legacy `VERIFIED` flag is an acceptable substitute.

An AI agent cannot lower the Rule severity to improve readiness.

The accountable business role establishes the accepted state.

That role should be represented in the canonical model.

For example:

```
Rule:
RULE-SUPPLIER-BANK-VERIFICATION

Policy owner:
ROLE-TREASURY-DATA-OWNER

Risk acceptance authority:
ROLE-TREASURY-CONTROL-OWNER
```

The model does not need the current person’s name in every object.

It needs the stable organisational role responsible for the meaning.

---

# Roles are more stable than people

Projects last longer than individual assignments.

A named owner may:

- leave the programme;
- change teams;
- move to another country scope;
- become unavailable during cutover;
- be replaced by a successor.

If the canonical model says:

```
owner:
Jane Smith
```

the model becomes stale when Jane leaves.

A better primary reference is:

```
owner_role:
Treasury Data Owner
```

We may resolve that role to the current person through project configuration or a delivery-system integration.

The canonical responsibility remains stable.

The current assignment can change.

This separation gives us:

```
Canonical ownership:
Treasury Data Owner

Current person:
resolved from project configuration

Delivery assignee:
stored in GitHub or ITSM
```

Martenweave should not become an HR master-data system.

It should preserve the role contract.

---

# We distinguish accountable from responsible

For the Finding, Treasury may be accountable for the control.

The migration integration team may be responsible for implementation.

The distinction is practical.

## Accountable

Has authority to accept the intended meaning and final outcome.

## Responsible

Performs the work needed to achieve that outcome.

For our case:

```
Accountable:
Treasury Data Owner

Responsible:
Supplier Migration Integration Team
```

If the integration team changes the Mapping without Treasury agreement, the implementation may be complete but semantically unapproved.

If Treasury approves the treatment but nobody implements it, the policy is clear but the Finding remains unresolved.

We need both relationships.

---

# We add evidence ownership

Some Findings remain open because nobody owns the missing Evidence.

The Supplier bank Finding requires proof that:

- the current bank account is identified;
- verification is expired;
- payment block is active after remediation;
- the affected population has been revalidated.

The implementation owner may update the transformation.

Another team may need to produce the target reconciliation file.

We therefore represent:

```
Evidence provider:
Supplier Cutover Reporting Team

Evidence approver:
Treasury Control Owner
```

The provider generates the artefact.

The approver determines whether it is sufficient to close the Finding.

These roles should not be silently collapsed.

---

# We add data ownership

The Finding may expose a problem in the Treasury Review Dataset.

The Treasury Dataset Owner is responsible for questions such as:

- whether every relevant Supplier is covered;
- whether verification refers to the current account;
- whether identifiers are reliable;
- whether the extract is current;
- whether the status values have consistent meaning.

The data owner is not automatically the policy owner.

A team may maintain the dataset operationally while another role defines the control.

For example:

```
Policy owner:
Treasury Control Owner

Authoritative dataset owner:
Treasury Operations Data Steward
```

This distinction becomes important when the dataset does not support the business policy correctly.

---

# We add model ownership

The canonical Rule and Attribute may be represented incorrectly.

Suppose verification was modelled at Supplier level, while Treasury verifies a specific bank account.

Changing that model requires a model owner.

The Treasury owner supplies the business Decision.

The model owner ensures that the canonical objects express it consistently.

For example:

```
Business decision owner:
Treasury Data Owner

Canonical model owner:
Supplier Domain Model Owner
```

The model owner does not invent policy.

They protect the structure, consistency and impact of the approved interpretation.

---

# We add implementation ownership only after remediation is classified

Before assigning implementation work, we diagnose the Finding.

The remediation may be:

- data correction;
- dataset integration;
- Mapping change;
- implementation correction;
- model change;
- controlled Exception.

Each path has a different implementation owner.

For the Supplier case, investigation shows:

```
Canonical Rule:
correct

Payment-block requirement:
approved

Target block Mapping:
correct in canonical model

Cutover transformation:
uses an outdated implementation
```

This is implementation drift.

The implementation owner is the cutover transformation team.

We should not assign the task before establishing that classification.

Otherwise, the wrong team receives an unclear issue and must repeat the investigation.

---

# We add closure authority

A delivery team may complete the code change.

That does not automatically close the Finding.

Closure requires a person or role with authority to accept the new Evidence.

For the Supplier case:

```
Implementation owner:
Cutover Transformation Team

Closure evidence provider:
Migration Validation Team

Closure approver:
Treasury Data Owner
```

The Finding is resolved only when:

- the control is implemented;
- the affected dataset is regenerated;
- the payment block is confirmed;
- the Rule is rerun;
- Treasury accepts the Evidence.

A merged pull request proves that code changed.

It does not prove that the business control is effective.

---

# We keep risk acceptance separate from resolution

The programme may not be able to resolve all 40 records before cutover.

Treasury may approve a bounded Exception:

```
Affected Suppliers remain payment-blocked
until current verification is obtained.
```

The Finding may then become:

```
controlled
```

rather than:

```
resolved
```

The risk owner approves the Exception.

The implementation owner applies the block.

The data owner continues remediation.

These are distinct responsibilities.

We should not mark the Finding resolved merely because the risk was accepted temporarily.

---

# A practical ownership contract

For the Supplier Finding, the ownership contract might be:

```
Finding:
FIND-BANK-VERIFY-NO-BLOCK

Business policy owner:
Treasury Data Owner

Risk acceptance authority:
Treasury Control Owner

Authoritative dataset owner:
Treasury Review Data Steward

Canonical model owner:
Supplier Domain Model Owner

Finding coordinator:
Supplier Migration Lead

Implementation owner:
Cutover Transformation Team

Evidence provider:
Migration Validation Team

Closure approver:
Treasury Data Owner
```

This looks more complex than one assignee.

It is also much closer to how the work actually happens.

The complexity already exists.

The model makes it explicit.

---

# We do not build a full RACI matrix for every object

We should avoid over-modelling.

Not every Attribute needs eight ownership roles.

For ordinary objects, we may need only:

```
owner_role
```

For critical Findings, we add the roles required by the remediation.

A practical minimum is:

## Decision owner

Who has authority over business meaning or risk treatment?

## Delivery owner

Who implements the approved remediation?

## Evidence owner

Who produces proof of the outcome?

## Closure approver

Who accepts the result?

In simpler Findings, one role may fulfil several responsibilities.

The model should permit that.

It should not force artificial organisational complexity.

---

# We separate canonical ownership from current assignment

Martenweave should store:

```
implementation_owner_role:
ROLE-CUTOVER-TRANSFORMATION-TEAM
```

The generated GitHub issue may assign:

```
current assignee:
@migration-developer
```

The role is canonical.

The username is delivery state.

GitHub’s own documentation describes assignees as a way to clarify who is working on specific issues and pull requests, and GitHub allows multiple assignees on one item.

That is useful for current work allocation.

It does not replace the model’s need to preserve business accountability, Evidence responsibility and closure authority.

---

# We use delivery tools for execution

Once the ownership contract is clear, Martenweave can generate an implementation issue.

For example:

```
Goal

Apply and verify the payment block for Suppliers
whose bank verification is expired.

Business owner

Treasury Data Owner

Implementation owner

Cutover Transformation Team

Scope

40 payment-active Suppliers in Cutover RC4.

Acceptance criteria

- Every affected Supplier has payment block active.
- The block is visible in the target reconciliation.
- No expired verification is classified as current.
- The bank-verification Rule is rerun.
- Treasury approves the closure Evidence.

Validation command

martenweave run dataset-readiness \
  --repo ./model \
  --dataset ./data/supplier-bank-rc5.csv \
  --out ./reports/supplier-bank-rc5
```

The delivery tool can manage:

- assignees;
- status;
- comments;
- branches;
- pull requests;
- milestones.

Martenweave retains the semantic contract behind the issue.

---

# We allow one Finding to create several issues

The Supplier Finding may require:

## Issue 1

Correct the cutover payment-block implementation.

## Issue 2

Generate the target reconciliation report.

## Issue 3

Obtain current Treasury verification for the remaining accounts.

## Issue 4

Update the rollout template so the control is included in Wave 2.

All four issues relate to one root Finding.

We should not create four separate Findings merely because four teams have work.

The relationship is:

```
One governed problem
→ several delivery tasks
```

This preserves root-cause visibility while allowing distributed execution.

---

# We allow one issue to support several Findings

A reusable Mapping correction may resolve multiple Findings.

For example, implementing account-fingerprint matching may help:

- expired verification detection;
- duplicate bank-account investigation;
- target reconciliation.

One GitHub issue can reference several Finding IDs.

We should not duplicate implementation merely to maintain a one-to-one relationship.

Martenweave needs a many-to-many link:

```
Finding
↔ implementation issue
```

The delivery tool remains responsible for task execution.

The canonical model preserves which governed problems the task is intended to address.

---

# We do not copy delivery status into canonical truth blindly

A GitHub issue may be:

```
closed
```

That does not necessarily mean:

```
Finding resolved
```

The issue may have been closed because:

- the code was merged;
- the work moved to another issue;
- the scope changed;
- the team decided not to implement it;
- the issue was duplicated;
- the technical task finished but Evidence is missing.

Martenweave may import the status as Evidence:

```
Delivery issue:
closed
```

It should not automatically set:

```
Finding:
resolved
```

Closure remains governed by the Finding’s criteria.

---

# We treat ownership gaps as Findings about governance

Sometimes no valid owner exists.

For example:

- Treasury says migration owns the issue;
- migration says Treasury owns the control;
- the local company says global design owns it;
- global design says local operations owns it.

The correct response is not to assign the Finding to a random coordinator.

We record:

```
Ownership status:
unresolved

Missing role:
risk acceptance authority

Consequence:
Exception cannot be approved
and cutover gate cannot close
```

An unresolved ownership relationship is itself a material gap.

Martenweave should surface it before implementation begins.

---

# We distinguish no owner from no available person

The canonical role may be clear:

```
Treasury Data Owner
```

But no current person is configured.

That is an assignment-resolution problem.

It differs from:

```
No role has authority to decide this policy.
```

We model them separately.

## Role defined, person unresolved

Operational assignment problem.

## Role undefined

Governance-design problem.

The first can be resolved through project configuration.

The second requires an organisational Decision.

---

# We validate ownership structurally

Deterministic checks can detect:

- critical Rule has no policy owner;
- Finding has no decision owner;
- implementation issue has no implementation-owner role;
- closure criteria exist but no closure approver;
- Exception has no risk-acceptance authority;
- referenced role does not exist;
- owner role is outside the Finding’s domain without an explicit relationship.

Example diagnostics:

```
MW-OWN-001
Critical Finding has no decision owner.

MW-OWN-002
Finding requires implementation,
but no implementation-owner role is defined.

MW-OWN-003
Closure Evidence is required,
but no closure approver is assigned.

MW-OWN-004
Exception references no risk-acceptance authority.

MW-OWN-005
Canonical owner role cannot be resolved
for the current project configuration.
```

These checks do not decide who should own the Finding.

They prevent ownership from remaining invisible.

---

# We derive candidate owners from the model

Martenweave can suggest ownership from relationships.

For example:

```
Affected Rule owner:
Treasury Data Owner

Affected Dataset owner:
Treasury Review Data Steward

Affected Mapping owner:
Supplier Migration Integration Team

Affected domain owner:
Supplier Domain Model Owner
```

From this context, an AI agent can propose:

```
Decision owner:
Treasury Data Owner

Implementation owner:
Supplier Migration Integration Team

Evidence provider:
Migration Validation Team
```

The proposal should explain its basis.

Humans approve or correct it.

AI should not assign business accountability solely from names or previous tickets.

---

# We avoid ownership by whoever discovered the problem

The validation engineer may create the Finding.

That does not make them the owner.

The person who observes a problem is often best placed to provide initial Evidence.

They are not necessarily authorised to define the business response.

We distinguish:

```
reported_by
```

from:

```
decision_owner
```

and:

```
implementation_owner
```

This small distinction prevents many Findings from remaining with the wrong team.

---

# We avoid ownership by system boundary

Teams often assign a Finding to the system where the error appeared.

The target SAP load rejects the record, so the SAP team receives the issue.

But the cause may be:

- missing Treasury Evidence;
- incorrect source authority;
- an obsolete Mapping;
- a source-data defect.

The target system is the observation point.

It is not automatically the ownership boundary.

Lineage should guide ownership.

We trace upstream until we find the failing obligation and responsible role.

---

# We avoid assigning business risk to developers

A developer may propose:

```
Use legacy VERIFIED flag
when Treasury evidence is missing.
```

That is not merely a coding choice.

It changes accepted source authority and risk treatment.

The developer can implement the proposal after approval.

They should not approve it through a code change.

Martenweave should detect that the PatchProposal affects:

- the Rule;
- source authority;
- payment control;
- risk treatment.

The required reviewers should include Treasury.

---

# We avoid assigning implementation details to business owners

The opposite failure also occurs.

A business owner receives a technical issue containing:

- field names;
- join conditions;
- SQL logic;
- file paths;
- test commands.

They cannot execute the task.

We should generate two linked views.

## Business review

```
Decision required:
Can Suppliers without current verification
remain in scope if payment block is confirmed?
```

## Implementation task

```
Implement account-specific verification matching
and payment-block derivation.
```

The same Finding connects them.

Each role receives an appropriate responsibility.

---

# We model delegation without transferring accountability

A Treasury owner may delegate investigation to a data steward.

The steward may:

- profile the dataset;
- confirm coverage;
- collect Evidence;
- prepare a recommendation.

The policy owner remains accountable for the final Decision.

We should not overwrite:

```
decision_owner
```

when work is delegated.

We can represent:

```
delegate:
Treasury Data Steward

delegated_activity:
Evidence collection
```

This keeps accountability stable while allowing practical execution.

---

# We model temporary ownership during cutover

Cutover may require temporary operational roles.

For example:

```
Cutover Finding coordinator:
Supplier Cutover Lead

Valid during:
Cutover window
```

This does not replace the long-term Treasury policy owner.

We separate:

- enduring model ownership;
- project ownership;
- temporary execution ownership.

Otherwise, the cutover lead may remain recorded as the owner years after the project ends.

---

# We connect ownership to scope

A global role may own the Rule.

A local role may own a country-specific occurrence.

For example:

```
Global Rule owner:
Treasury Control Owner

Wave 2 occurrence owner:
North America Supplier Migration Lead

Local Evidence approver:
North America Treasury Data Steward
```

The root Finding can preserve global accountability.

The scoped occurrence can preserve local delivery responsibility.

This is particularly important across migration waves.

The same root problem may require different local teams while remaining governed by one global policy.

---

# We preserve ownership decisions as history

Ownership can change.

A later Decision may move verification responsibility from Treasury Operations to a central Master Data team.

We do not rewrite historical Evidence to make it appear that the new team always owned the process.

We record:

```
Effective until 2026-12-31:
Treasury Operations Data Steward

Effective from 2027-01-01:
Central Master Data Steward
```

Historical Findings retain the ownership context valid at the time.

Current Findings resolve the current role.

This matters during audits and AMS investigations.

---

# We keep sensitive personal data out of canonical files where possible

The canonical model should normally store role references.

Current person resolution may remain in:

- repository configuration;
- GitHub teams;
- an ITSM directory;
- a local project mapping file;
- another authorised source.

This reduces unnecessary personal data in long-lived model repositories.

It also makes the model more portable between organisations and projects.

The canonical statement is:

```
Role:
Treasury Data Owner
```

The project integration resolves the current person.

---

# A conceptual ownership model

A Finding might contain:

```
---
id: FIND-BANK-VERIFY-NO-BLOCK
type: Finding
status: confirmed

decision_owner:
  role: ROLE-TREASURY-DATA-OWNER

risk_acceptance_authority:
  role: ROLE-TREASURY-CONTROL-OWNER

data_owner:
  role: ROLE-TREASURY-REVIEW-DATA-STEWARD

model_owner:
  role: ROLE-SUPPLIER-DOMAIN-MODEL-OWNER

finding_coordinator:
  role: ROLE-SUPPLIER-MIGRATION-LEAD

implementation_owner:
  role: ROLE-CUTOVER-TRANSFORMATION-TEAM

evidence_provider:
  role: ROLE-MIGRATION-VALIDATION-TEAM

closure_approver:
  role: ROLE-TREASURY-DATA-OWNER
---
```

This is a proposed product direction.

It is not a claim about the exact current Martenweave Finding schema.

The important part is that ownership is typed rather than represented by one ambiguous field.

---

# A conceptual role object

A role may be represented as:

```
---
id: ROLE-TREASURY-DATA-OWNER
type: Role

title:
  Treasury Data Owner

domain:
  supplier_bank_data

responsibilities:
  - define verification authority
  - approve verification policy
  - approve Finding closure evidence

may_approve:
  - RULE-SUPPLIER-BANK-VERIFICATION
  - EXC-SUPPLIER-BANK-VERIFICATION

current_assignment:
  project_config_reference
---
```

Again, this is a proposed direction.

Martenweave does not need to reproduce a complete organisational chart.

It needs only the roles relevant to model governance.

---

# The Workbench view we need

The Finding page should show an ownership section that answers:

## Who decides?

Treasury Data Owner.

## Who accepts residual risk?

Treasury Control Owner.

## Who owns the source Evidence?

Treasury Review Data Steward.

## Who coordinates the Finding?

Supplier Migration Lead.

## Who implements?

Cutover Transformation Team.

## Who produces closure Evidence?

Migration Validation Team.

## Who approves closure?

Treasury Data Owner.

## Where is the delivery work?

Linked GitHub issues or external ITSM references.

This view prevents “Owner: Migration” from becoming the whole accountability model.

---

# We show missing ownership as a blocker

If the closure approver is unresolved, the Workbench should not display:

```
Ready for closure
```

It should display:

```
Closure blocked:
No authorised closure approver resolved
```

If the risk owner is missing, an Exception proposal should fail validation.

If the implementation owner is missing, the Finding may remain confirmed but cannot be promoted into an agent-ready task.

Ownership should influence workflow readiness without Martenweave becoming the workflow engine.

---

# We generate different artefacts for different owners

From one Finding, Martenweave can generate:

## Decision brief

For the business owner:

```
Decision:
Confirm whether payment block is sufficient
for Suppliers with expired verification.

Affected population:
40.

Cutover implication:
Payment activation gate remains open.
```

## Implementation issue

For the technical owner:

```
Apply and verify payment block
for the governed population.
```

## Evidence request

For the validation team:

```
Produce target reconciliation showing
zero unblocked expired-verification records.
```

## Closure review

For Treasury:

```
Review the RC5 Evidence
against the closure criteria.
```

These artefacts remain linked to one Finding.

We avoid forcing every participant into one generic ticket description.

---

# We keep notifications outside the core

Martenweave may publish an issue or expose a machine-readable owner reference.

It should not build:

- email notification rules;
- escalation schedules;
- reminder queues;
- team calendars;
- inbox management.

Those functions belong in existing delivery platforms.

The current Martenweave repository explicitly defines the product as a pipeline coordinating canonical files and Git, not as a generic workflow platform or hosted application.

The boundary protects the core from unnecessary expansion.

---

# The first product slice we should build

The next focused capability should be **Typed Finding Ownership and Delivery Handoff**.

## Goal

Connect every important Finding to the roles required for Decision, implementation, Evidence and closure without implementing task workflow inside Martenweave.

## Initial role types

- decision owner;
- data owner;
- model owner;
- implementation owner;
- Evidence provider;
- risk-acceptance authority;
- closure approver;
- Finding coordinator.

## Initial validation

- critical Finding requires decision owner;
- model change requires model owner;
- implementation task requires implementation owner;
- Exception requires risk-acceptance authority;
- closure criteria require closure approver;
- referenced roles must exist;
- scoped occurrences may override delivery roles without replacing global policy ownership.

## Initial delivery integration

Generate:

- GitHub issue;
- issue body;
- suggested assignees;
- required reviewers;
- Finding reference;
- acceptance criteria;
- validation command.

The delivery platform remains authoritative for task state.

---

# Proposed commands

A future CLI might support:

```
martenweave findings owners \
  FIND-BANK-VERIFY-NO-BLOCK \
  --repo ./model
```

```
martenweave findings suggest-owners \
  FIND-BANK-VERIFY-NO-BLOCK \
  --repo ./model
```

```
martenweave findings validate-ownership \
  FIND-BANK-VERIFY-NO-BLOCK \
  --repo ./model
```

```
martenweave findings handoff \
  FIND-BANK-VERIFY-NO-BLOCK \
  --to github \
  --dry-run
```

```
martenweave roles unresolved \
  --repo ./model \
  --scope cutover
```

These commands describe a product direction rather than the current documented CLI.

The current Martenweave foundation already provides the canonical-file, validation, gap, impact and proposal-first architecture required to support this slice.

---

# Acceptance criteria

We should consider the capability useful when it can take the Supplier bank Finding and answer:

1. Who owns the business Rule?
2. Who may accept an Exception?
3. Who owns the authoritative verification dataset?
4. Who owns the canonical model objects?
5. Who must implement the approved remediation?
6. Who produces closure Evidence?
7. Who may approve closure?
8. Which roles are global and which are wave-specific?
9. Which current delivery issue and assignees implement the work?
10. Is closure blocked by unresolved ownership?

The result should remain useful even when individual people change.

---

# What we should not build

We should not build:

- generic workflow states;
- universal approval chains;
- organisational chart management;
- employee directories;
- resource planning;
- sprint management;
- notification orchestration;
- a replacement for GitHub, Jira or ServiceNow.

We need only enough ownership structure to protect canonical meaning and produce a precise delivery handoff.

---

# The business value

Ambiguous ownership creates several recurring costs:

- Findings assigned to people without decision authority;
- technical teams making business-policy choices;
- business owners receiving implementation tasks they cannot execute;
- completed code changes without closure Evidence;
- Exceptions approved by the wrong role;
- cutover gates blocked because nobody can accept residual risk;
- repeated reassignment and escalation;
- unresolved Findings labelled as “owned by migration.”

Typed ownership reduces these costs.

It makes clear:

```
who decides,
who acts,
who proves,
and who closes.
```

That is enough to make delivery systems substantially more effective.

---

# Final perspective

We do not solve Finding ownership by adding one assignee field.

For the Supplier bank-verification case, one person cannot reasonably own:

- Treasury policy;
- source-data quality;
- canonical modelling;
- transformation implementation;
- validation Evidence;
- cutover risk acceptance;
- final closure.

We separate the responsibilities.

The operating chain is:

```
Business owner defines the accepted outcome.

Data owner provides authoritative input.

Model owner protects canonical meaning.

Implementation owner changes the delivery path.

Evidence provider proves the result.

Risk owner accepts any remaining deviation.

Closure approver resolves the Finding.

GitHub or ITSM tracks the work.
```

The practical test is:

> Can every participant see the decision or action they own without forcing Martenweave to manage their daily workflow?

When the answer is yes, the ownership model is useful.

When the answer is:

> The ticket is assigned to the migration lead,

we still do not know who can define the Rule, implement the fix, accept the risk or approve closure.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We are building Martenweave so that enterprise model Findings do not disappear into ambiguous ownership labels.

Our product boundary is deliberate:

```
Martenweave preserves accountability
around model truth.

Delivery platforms coordinate execution.

AI suggests roles and prepares handoffs.

Humans accept responsibility,
approve risk and close Findings.
```

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

## Sources and notes

This article was reviewed on 15 July 2026.

Martenweave Core currently defines a backend-first pipeline that converts spreadsheets, datasets, tickets, validation reports, Decisions and SAP context into canonical model files, deterministic validation, dataset gaps, lineage, impact analysis and human-approved proposals.

The current product principles keep canonical files authoritative, generated indexes disposable, validation deterministic and AI-generated changes proposal-first.

The repository explicitly positions Martenweave as a model-governance pipeline rather than a generic workflow platform and describes GitHub issues and pull requests as human-review delivery outputs.

GitHub documents assignees as a mechanism that clarifies who is working on specific issues and pull requests. It also supports multiple assignees on an issue or pull request. In the architecture described here, assignees represent current delivery work, while Martenweave preserves policy ownership, Evidence responsibility, risk authority and closure accountability.

Typed ownership roles, Role objects, ownership validation, scoped role resolution and the proposed handoff commands are product directions. They should not be interpreted as guarantees of the exact current Martenweave schema, Workbench behaviour or CLI until implemented and released.

Martenweave is independent and is not affiliated with or endorsed by SAP or GitHub.
