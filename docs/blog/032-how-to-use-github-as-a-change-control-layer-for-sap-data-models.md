# How to Use GitHub as a Change-Control Layer for SAP Data Models

**Reviewed: 14 July 2026**

A country team changes one row in a mapping workbook.

The row now points to a different SAP target field. A short comment says that the previous field was incorrect. The file is uploaded to SharePoint with a new suffix:

```text
Customer_Mapping_Final_v12_Approved.xlsx
```

The migration developer updates the transformation.

The SAP architect does not see the change. The test team continues using the previous expected result. The global data owner never reviews whether the new target preserves the intended business meaning.

Several weeks later, the discrepancy appears during testing.

The programme can usually determine who uploaded the workbook.

It is harder to establish:

- exactly what changed;
- what evidence supported it;
- which dependencies were checked;
- who approved the semantic change;
- which version should be restored if the decision was wrong.

The problem is not that the programme lacks a change process.

It may already use Jira, service-management workflows, design authorities and formal approvals.

The missing element is a controlled, reviewable representation of the model change itself.

A ticket describes requested work.

An approval email records consent.

A meeting records discussion.

None of them necessarily shows the precise difference between the current approved model and the proposed new one.

This is where GitHub can provide practical value outside software development.

> GitHub can act as a change-control layer for SAP data models when canonical model files are treated like controlled source: changes are proposed as explicit diffs, validated automatically, reviewed by accountable owners and merged only after approval.

This does not mean business users should become software developers.

It means the model needs the same basic control principles already used for important code:

- identifiable baseline;
- visible difference;
- automated checks;
- responsible review;
- preserved history;
- reversible change.

## GitHub should not become the business application

GitHub is not an MDM platform.

It does not provide operational master-data stewardship, record matching, SAP change-request processing or business workflow execution.

SAP currently describes SAP Master Data Governance as a central governance layer for master data, policy and metadata, with governed models, golden records, matching and consolidation, steward workflows, validated values, quality monitoring and auditable data changes.

Those responsibilities remain in SAP MDG or another operational master-data platform.

GitHub’s role is narrower.

It can control the files and proposals describing:

- business attributes;
- entities and relationships;
- source and target endpoints;
- mappings;
- validation rules;
- value lists;
- contexts;
- ownership;
- model decisions;
- accepted deviations.

It controls model definition and change evidence.

It does not govern individual customer or supplier records.

## Git is useful because a model has state

A programme frequently treats its model as a collection of documents.

A stronger view is:

```text
The approved model is a defined state.

A change is the difference between two states.
```

For example, the current state may contain:

```yaml
id: RULE-SUPPLIER-RISK-REQUIRED
attribute: ATTR-SUPPLIER-RISK
context: ACTIVE_SUPPLIERS
severity: warning
```

A proposal changes:

```yaml
severity: warning
```

to:

```yaml
severity: error
```

That one-line difference may affect:

- source-data remediation;
- migration readiness;
- user workflow;
- test cases;
- interfaces;
- operational incident volume.

Git records the textual change precisely.

Martenweave adds the model context required to explain what the change means.

## A repository is not automatically a governance system

Moving spreadsheets or YAML files into GitHub does not solve governance by itself.

A weak repository can still have:

- unclear ownership;
- direct edits to the main branch;
- no model validation;
- large unreadable changes;
- technical reviewers approving business decisions;
- obsolete branches;
- vague commit messages;
- undocumented emergency fixes.

GitHub supplies mechanisms.

The programme must establish the operating rules.

The essential control chain is:

```text
Current approved model
        ↓
Proposed change branch
        ↓
Visible semantic and file diff
        ↓
Automated validation
        ↓
Required owner review
        ↓
Approval
        ↓
Merge into approved baseline
        ↓
Implementation and verification
```

## The main branch should represent approved model truth

A simple convention is:

```text
main = current approved canonical model
```

This does not mean everything in `main` is unquestionably correct.

It means that any correction must enter through controlled change rather than silent replacement.

Other branches represent proposed states.

For example:

```text
proposal/de-supplier-tax-rule
fix/customer-group-target-endpoint
change/retire-legacy-risk-value
```

A branch should be temporary.

It exists to make a bounded proposal reviewable.

After the change is approved and merged, the branch can be removed.

## Protect the approved baseline

GitHub supports protected branches that can prevent direct or destructive changes and require specific conditions before merging. Available controls include required pull-request reviews, successful status checks, resolved conversations, signed commits, restricted pushes and restrictions against bypassing the rules.

For a canonical model repository, a practical starting policy is:

- no direct push to `main`;
- changes require a pull request;
- deterministic model validation must pass;
- at least one independent reviewer must approve;
- critical directories require owner approval;
- unresolved review comments block merge;
- stale approvals are dismissed after material new changes;
- force pushes and branch deletion remain disabled.

These controls do not prove that the business decision is correct.

They prevent unreviewed model state from becoming the official baseline.

## A pull request is a model-change proposal

In software development, a pull request proposes merging one set of changes into another.

For model governance, the same object can represent:

- change request;
- evidence package;
- semantic diff;
- validation result;
- review record;
- approval boundary.

A useful pull request should answer:

### What is changing?

List affected stable model identifiers.

### Why is it changing?

State the problem and evidence.

### Where does it apply?

Specify domain, country, organisation, population and release.

### What is affected?

Include mappings, datasets, rules, interfaces and tests.

### Which decision is required?

Make approval explicit.

### What has been validated?

Show deterministic checks and remaining business questions.

### How will implementation be verified?

State the expected configuration, migration or test result.

This is more valuable than a pull request saying:

> Update supplier mapping.

## Use a structured pull-request template

A model-change template can include:

```text
## Goal

What business or implementation problem does this change address?

## Affected model objects

- ATTR-...
- MAP-...
- RULE-...
- VLIST-...

## Current state

What does the approved model say today?

## Proposed state

What will become different?

## Evidence

Which dataset, issue, decision, regulation or test supports the proposal?

## Context

Where does the change apply?

## Impact

Which mappings, rules, datasets, tests, interfaces or countries require review?

## Validation

Which deterministic checks passed?

## Open questions

Which semantic or risk decisions still require human judgement?

## Required approvers

Which roles have authority?

## Verification

How will the implemented result be tested?
```

The template should remain short enough to use.

Its purpose is not administrative completeness.

It is to prevent reviewers from approving a change without understanding its boundary.

## The diff is the central review object

Traditional model approval frequently reviews the new document.

A Git-based process reviews the difference.

Suppose the proposed change:

- adds one value;
- modifies two mappings;
- changes one validation severity;
- updates one decision;
- retires one source endpoint.

Reviewers can inspect only those differences rather than rereading the complete domain model.

This supports a better question:

> Do these specific changes correctly move the approved model from its current state to the proposed state?

The diff is especially valuable when the change has hidden side effects.

A reviewer may notice that an AI proposal updated the mapping but not:

- the value list;
- the local context;
- the related rule;
- the decision record.

## File diff and semantic diff are not the same

A raw Git diff shows lines.

A business reviewer needs meaning.

For example:

```diff
-severity: warning
+severity: error
```

A semantic view should explain:

```text
Rule:
Supplier Risk Classification Required

Change:
Validation becomes blocking.

Applicable population:
Active suppliers in Germany.

Dataset impact:
8,420 records currently lack a valid value.

Migration impact:
Mock Load 3 would reject these records.

Decision required:
Approve blocking behaviour and remediation plan.
```

Martenweave should generate or support this semantic layer.

Git remains the authoritative record of exact file change.

The generated report makes the change reviewable by non-developers.

## Use CODEOWNERS to route model review

GitHub supports a `CODEOWNERS` file that assigns responsibility for repository files or directories to individuals or teams. Code owners can be automatically requested for review, and protected-branch settings can require their approval before affected changes merge.

In a model repository, ownership can follow domain structure.

For example:

```text
/model/business-partner/      @bp-domain-owners
/model/customer/              @customer-data-owners
/model/supplier/              @supplier-data-owners
/model/local/de/              @de-data-governance
/model/integration/           @integration-architecture
/model/rules/                 @mdg-architecture
```

This can ensure that a supplier model change reaches the supplier owners.

But there is an important limitation:

> File ownership is not always equivalent to decision authority.

A change may affect:

- supplier business meaning;
- German tax policy;
- SAP implementation;
- integration consumers.

No single directory owner represents every required approval.

CODEOWNERS should provide a baseline routing mechanism.

The pull request and model impact analysis should identify additional reviewers.

## Separate technical review from business approval

A technically competent reviewer can confirm that:

- YAML is valid;
- references resolve;
- naming conventions are followed;
- tests pass;
- the proposal can be indexed.

They may not have authority to decide that:

- a field should become mandatory;
- two classifications are equivalent;
- a country exception is legally justified;
- a migration default is acceptable.

A robust review can require several perspectives.

### Model maintainer

Confirms structural consistency.

### Domain owner

Approves business meaning and policy.

### SAP MDG architect

Confirms target implementation feasibility.

### Migration owner

Confirms source and transformation consequences.

### Local owner

Approves contextual variation.

### Integration owner

Confirms downstream compatibility.

Not every change needs all six.

The affected objects and change classification should determine the review set.

## Automated checks should run before human review

Human reviewers should not spend their time finding basic structural problems.

Martenweave’s current core treats Markdown and YAML model files as canonical truth, rebuilds disposable SQLite and JSONL indexes, validates IDs, types, references and domain-context rules before indexing, and requires AI-generated changes to enter through reviewable proposals.

For every pull request, automated checks can run:

```bash
martenweave validate --repo ./model
martenweave build-index --repo ./model --jsonl
martenweave index-fresh --repo ./model
martenweave health --repo ./model
```

Additional checks may include:

- duplicate IDs;
- invalid references;
- lifecycle conflicts;
- missing ownership;
- local override without global parent;
- active mapping using retired endpoint;
- invalid value-list reference;
- stale generated files;
- tests.

GitHub protected branches can require status checks to succeed before a change is merged.

The validator reports whether the proposal is structurally acceptable.

It does not approve the business decision.

## Validate the proposed full state, not only changed files

A small change can break objects elsewhere.

For example:

- retiring an endpoint breaks five unchanged mappings;
- renaming an ID invalidates old decisions;
- removing a value breaks a local rule;
- changing a context creates overlapping requirements.

The validation should therefore apply the proposed branch as a complete model state.

The process should answer:

```text
Does the complete repository remain valid after this change?
```

not only:

```text
Are the edited files individually valid?
```

This is one reason generated indexes should be disposable.

They can be rebuilt from the candidate canonical state during review.

## Use baseline comparison for impact analysis

The pull request naturally provides two states:

```text
Base branch:
Current approved model

Proposal branch:
Candidate future model
```

Martenweave can compare them and generate:

- added objects;
- changed objects;
- retired objects;
- changed relationships;
- affected mappings;
- affected rules;
- affected datasets;
- affected ownership;
- potentially stale tests.

The current CLI includes repository comparison, trace and impact commands alongside validation and indexing.

The result should become part of review evidence.

## Do not store generated truth as canonical truth

The canonical files should be reviewed and merged.

Generated indexes and reports should normally be reproducible.

Martenweave explicitly treats SQLite and JSONL outputs as disposable and rebuildable from canonical files.

This reduces several risks:

- reviewers approving opaque database changes;
- stale index files appearing authoritative;
- merge conflicts in generated artefacts;
- inability to reconstruct the model from readable sources.

Generated reports may be attached to the pull request or produced by CI.

The canonical model remains the controlled input.

## Keep business evidence outside the repository when necessary

A repository should not become an uncontrolled archive for:

- personal data;
- confidential contracts;
- large production datasets;
- regulated documents;
- credentials.

The model can store references and evidence metadata:

```yaml
evidence:
  type: dataset_profile
  source: controlled-data-platform
  reference: PROFILE-2026-0714-ERP-A-SUPPLIERS
  reviewed_by: supplier-data-owner
```

The principle is:

```text
Preserve enough evidence to understand and verify the decision.

Do not copy every sensitive source into Git.
```

Access, retention and classification requirements still apply.

## Use issues for problems, pull requests for model state

GitHub issues and pull requests serve different purposes.

### Issue

Tracks a problem, question, gap or required work.

Examples:

- source field missing;
- value mapping incomplete;
- ownership unresolved;
- configuration differs from design.

### Pull request

Proposes a specific change to the canonical model.

An issue may remain open while evidence is gathered.

When the treatment is known, a pull request can implement the proposed model update.

A useful chain is:

```text
Dataset finding
→ GitHub issue
→ model decision
→ pull request
→ validation and approval
→ merge
→ implementation task
→ verification
```

Martenweave’s current pipeline similarly moves from evidence through proposal, validation, gap and impact review to a GitHub issue or pull request for human review.

## Do not approve by ticket status alone

A Jira ticket may show “Approved.”

That approval may refer to:

- budget;
- requirement;
- technical implementation;
- sprint completion;
- business acceptance.

The GitHub pull request should show the exact model change being approved.

The Jira issue can remain the programme record for scheduling and delivery.

The pull request becomes the authoritative review of model state.

Link them.

Do not assume they are interchangeable.

## Use small pull requests

A pull request changing 400 model objects across six domains is difficult to govern.

Reviewers may approve it because understanding every change is impractical.

Prefer bounded changes such as:

- add one contextual rule;
- retire one value and update dependencies;
- correct one mapping;
- add one local extension;
- introduce one dataset expectation;
- record one material decision.

A small model change should include all affected dependencies.

“Small” does not mean changing only one file.

It means representing one coherent decision.

## One decision per pull request is a useful default

Suppose the programme wants to:

1. Add value `UNDER_REVIEW`.
2. Change the global owner.
3. Retire a source field.
4. Fix an unrelated description.

These changes should usually not share one approval.

They have different:

- evidence;
- reviewers;
- risks;
- implementation plans;
- rollback paths.

A practical default is:

```text
One material model decision per pull request.
```

Minor supporting updates required by that decision should remain in the same pull request.

## Use commit history carefully

A pull request may contain several working commits:

- initial proposal;
- reviewer corrections;
- validation fixes;
- evidence updates.

The merged history should remain understandable.

A squash merge can create one concise approved change record.

A merge commit may preserve more detailed development history.

The team should choose one consistent approach.

The important outcome is that the final merged change can be identified and reversed.

GitHub notes that enforcing a linear history can make changes easier to revert, although the precise merge strategy should fit the repository workflow.

## Use tags or releases for approved baselines

The `main` branch represents the current state.

Programmes also need named historical baselines.

Examples:

```text
model-v1.8-mock-load-2
model-v2.0-uat
model-v2.1-production
```

A baseline can record:

- model version;
- date;
- migration wave;
- applicable SAP release;
- validation result;
- approved deviations.

This supports questions such as:

- Which model did Mock Load 2 use?
- Which decisions applied at cutover?
- Did UAT test the same mappings as production?
- When was this rule introduced?

A branch is not a good permanent baseline.

Tags or releases are more appropriate for identifiable approved states.

## Do not rewrite historical model state

When a decision changes, create a new change.

Do not edit old tags or rewrite history to make the past appear consistent with the present.

Historical truth matters because:

- old migration loads used earlier rules;
- incidents may concern previous configuration;
- test evidence belongs to a specific baseline;
- local programmes may still run an older release.

A new pull request can supersede an earlier decision.

The original decision remains visible.

## Use emergency-change rules

Production incidents may require urgent model or configuration action.

A normal review process may be too slow.

The repository should define an emergency path.

For example:

1. Create a narrowly scoped emergency branch.
2. Record the incident and immediate risk.
3. Run mandatory structural validation.
4. Obtain one authorised emergency approval.
5. Merge and tag the emergency baseline.
6. Create a mandatory follow-up review.
7. Confirm whether the emergency state becomes permanent or is reversed.

Emergency access should not mean invisible direct editing.

GitHub branch protection can also be configured to limit bypassing and restrict direct pushes.

## Approval should follow the latest diff

A reviewer approves a specific proposed state.

If the author changes the branch materially after approval, the previous approval may no longer be valid.

GitHub can dismiss stale pull-request approvals when commits change the reviewed diff, or require approval of the most recent reviewable push by someone other than the person who made it.

For model governance, this is important.

An author should not be able to:

1. Obtain approval for a contextual warning.
2. Change it to a global blocking error.
3. Merge using the earlier approval.

Materially changed proposals should be reviewed again.

## Resolve review conversations before merge

A review comment may identify:

- missing context;
- unreviewed downstream consumer;
- incorrect ownership;
- unsupported value;
- weak evidence.

Leaving the comment open while merging weakens the approval record.

GitHub protected branches can require review conversations to be resolved before merge.

Resolution should mean one of:

- proposal updated;
- evidence added;
- concern accepted with explanation;
- separate follow-up issue created and linked;
- change rejected.

It should not mean hiding an unresolved concern to achieve a green status.

## A worked example: making Supplier Risk mandatory

The current model contains:

```text
Attribute:
ATTR-SUPPLIER-RISK

Rule:
Optional for all suppliers
```

The business proposes:

```text
Mandatory for active strategic suppliers.
```

### Issue

The business owner reports inconsistent compliance processing.

### Evidence

- 94% of applicable suppliers have valid classifications;
- 6% are blank;
- blanks are concentrated in ERP_B;
- the compliance workflow depends on `HIGH`.

### Pull request changes

- update the rule context;
- add dataset expectation;
- link the responsible owner;
- record the business decision;
- identify ERP_B remediation gap;
- update related test references.

### Automated checks

- all object references resolve;
- context is valid;
- target value list exists;
- no active mapping uses retired endpoints;
- generated index rebuilds.

### Human review

- Procurement approves the meaning;
- Compliance approves workflow impact;
- Migration approves remediation treatment;
- SAP architect confirms implementability.

### Merge

The model becomes approved.

### After merge

Separate delivery tasks implement:

- SAP validation;
- source remediation;
- test update;
- readiness reporting.

The pull request does not itself change SAP.

It establishes the model state that implementation must follow.

## Another example: correcting a target mapping

Current mapping:

```text
CRM_A.CUSTOMER_SEGMENT
→ SAP central Business Partner classification
```

Proposed correction:

```text
CRM_A.CUSTOMER_SEGMENT
→ SAP sales-area Customer Group
```

The raw file edit may look small.

The pull-request impact report reveals:

- the target context changes from central to sales area;
- the transformation needs organisational expansion;
- several tests become stale;
- one integration consumes the central field;
- the original decision did not confirm semantic equivalence.

The proposal may be rejected or split into:

1. Clarify the business attribute.
2. Decide target representation.
3. Implement the approved mapping.

GitHub did not determine the correct design.

The controlled diff prevented a silent field substitution.

## Another example: retiring a temporary value

Temporary value:

```text
MIGRATION_REVIEW
```

The pull request proposes retirement.

It should include:

- current records still using the value;
- whether users can still assign it;
- related mappings;
- workflow branches;
- interface consumers;
- remediation owner;
- effective release.

Validation should fail if active model objects still depend on the retired value.

This turns retirement into a complete change rather than removing one line from a value-list file.

## AI-generated changes fit naturally into pull requests

AI can help:

- extract proposed objects from notes;
- compare mapping versions;
- draft decisions;
- suggest impact relationships;
- generate patch content;
- prepare issue descriptions.

The current Martenweave principle is explicit:

> AI must not silently mutate.

AI proposals become `PatchProposal` objects; approved changes become `ChangeRequest`s.

A GitHub pull request provides an additional review surface:

```text
AI-generated proposal
→ canonical file diff
→ deterministic validation
→ owner review
→ merge or rejection
```

The reviewer sees what the AI wants to change.

The agent does not gain authority merely because it produced valid YAML.

## GitHub is not sufficient for business accessibility

A pure GitHub workflow may fail if reviewers cannot understand or access it.

Possible barriers include:

- unfamiliar interface;
- technical diffs;
- YAML syntax;
- repository permissions;
- notification overload;
- lack of mobile or corporate access.

The operating model should provide alternative review surfaces:

- generated XLSX review packs;
- semantic HTML reports;
- static viewers;
- concise issue summaries;
- meeting-based approval with recorded model identifiers.

The approval must still connect to the exact proposed state.

For example, a business owner may approve a generated semantic report.

The pull request records:

- report version;
- model commit;
- approval evidence;
- responsible reviewer.

The goal is controlled state, not forcing everyone to use developer tooling directly.

## Security and confidentiality still matter

A repository containing model knowledge may expose:

- system architecture;
- field-level business rules;
- regulatory decisions;
- interface dependencies;
- local exceptions.

Use appropriate:

- repository visibility;
- permissions;
- team access;
- evidence references;
- secret scanning;
- retention policy;
- backup;
- ownership continuity.

Do not commit:

- credentials;
- production personal data;
- unredacted sensitive extracts;
- secrets embedded in configuration.

Git history is intentionally persistent.

Sensitive content remains difficult to remove completely once committed.

## A minimum repository structure

A small model repository might contain:

```text
model/
  domains/
  entities/
  attributes/
  contexts/
  endpoints/
  mappings/
  rules/
  value-lists/
  decisions/
  datasets/
  proposals/

reports/
  generated/

.github/
  workflows/
  pull_request_template.md
  CODEOWNERS

docs/
  operating-model.md
  review-guide.md
```

The structure should follow how teams review and own the model.

Do not create excessive directory depth merely to appear organised.

## A minimum GitHub control setup

For an initial pilot:

1. Protect `main`.
2. Require pull requests.
3. Require one independent approval.
4. Require Martenweave validation.
5. Require resolved conversations.
6. Add domain-level CODEOWNERS.
7. Use a model-change template.
8. Use stable model IDs.
9. Tag milestone baselines.
10. Document an emergency path.

This is enough to create a meaningful control boundary.

A complex ruleset is unnecessary before the workflow proves useful.

## What GitHub should record

GitHub is well suited to preserving:

- exact file changes;
- proposal discussions;
- reviewer comments;
- approvals;
- validation status;
- merge history;
- baseline tags;
- linked issues.

It is less suited to being the primary place for:

- operational master-data records;
- large datasets;
- confidential legal evidence;
- broad business collaboration;
- programme scheduling;
- user-facing stewardship workflows.

Use GitHub for the part it controls well.

## What managers should ask

1. What does the `main` branch represent?
2. Can anyone change it directly?
3. Which automated checks run before approval?
4. Does the pull request show the semantic effect of the change?
5. Are business owners reviewing meaning, not only file syntax?
6. Does ownership follow the affected domain and context?
7. Are approvals invalidated after material new edits?
8. Are unresolved concerns blocking merge?
9. Can the programme identify which baseline supported each test or migration wave?
10. Are emergency changes reconciled later?
11. Can business reviewers participate without editing YAML?
12. Are sensitive datasets kept outside the repository?
13. Can a merged model change be reverted?
14. Does the Git history connect to actual SAP implementation and verification?

If only developers can answer these questions, the repository is being used for storage rather than model governance.

## Common mistakes

### Allowing direct changes to the approved branch

This removes the review boundary.

### Treating a passing validator as business approval

Structural correctness does not prove correct meaning.

### Making large cross-domain pull requests

Review becomes superficial.

### Using only raw diffs

Business reviewers need semantic explanation.

### Treating CODEOWNERS as complete governance

File ownership may not represent every required decision role.

### Merging after the proposal changes materially

Review must apply to the latest state.

### Committing generated indexes as authoritative artefacts

Generated views should normally be reproducible.

### Storing sensitive source data in Git

Preserve evidence references rather than unnecessary raw data.

### Using pull requests without implementation reconciliation

An approved model change is not proof that SAP and integrations were updated.

### Forcing all business users into a developer workflow

Provide readable generated review views.

## When GitHub may be the wrong choice

A Git-based model-control process may be excessive when:

- the model is very small;
- one stable team owns all changes;
- changes are rare;
- a controlled workbook already provides reliable history;
- users cannot access the repository;
- no technical maintainer exists.

A version-controlled workbook plus a decision log may be sufficient.

GitHub becomes more useful when:

- several teams change the model;
- AI agents generate proposals;
- deterministic validation exists;
- model objects have stable identities;
- exact historical diffs matter;
- configuration and migration evolve through releases;
- vendor and staff continuity are concerns.

## Where Martenweave fits

The current Martenweave Core README describes an open-source, backend-first governance and evidence layer for SAP migration, MDM, data governance and AMS. It turns spreadsheets, datasets, tickets, validation reports, decisions and SAP context into canonical model files, deterministic validation, dataset-gap reports, lineage, impact analysis and human-approved AI patch proposals. The current source version is listed as 0.5.0.

Its pipeline is:

```text
evidence
→ proposal
→ validation
→ gaps and impact
→ review
→ GitHub issue or pull request
```

The project summarises the operating principle as:

> Agents propose. Validators verify. Humans approve. Git records.



This is the precise relationship between Martenweave and GitHub.

Martenweave provides:

- model objects;
- validation;
- traceability;
- impact analysis;
- dataset evidence;
- proposal structure.

GitHub provides:

- diff;
- review;
- approval mechanics;
- protected baseline;
- durable change history.

SAP MDG provides:

- operational master-data governance.

## Our conclusion

SAP data-model changes should not be approved only as tickets, spreadsheet replacements or meeting conclusions.

They should be reviewed as explicit changes to an identifiable approved state.

GitHub can provide that control when:

- canonical model files represent the baseline;
- changes enter through pull requests;
- validators test structural consistency;
- accountable owners review meaning and impact;
- protected branches prevent silent mutation;
- merged history records the approved evolution.

The practical test is:

> Can the programme show the exact model difference that was approved, the evidence supporting it, the people who reviewed it and the validation result that applied to that same version?

When the answer is yes, GitHub is acting as a model change-control layer.

When the answer is no, it is only another file repository.

The objective is not to turn SAP architects and data owners into software developers.

It is to give critical model decisions a controlled lifecycle that is more precise than replacing `Final_v11` with `Final_v12`.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

We build practical model-governance infrastructure for SAP migration, MDG, MDM and AMS teams.

Martenweave uses canonical model files, deterministic validation, dataset evidence, traceability and proposal-first change control. GitHub can provide the review and history layer around those changes.

SAP MDG remains the operational governance platform.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a governance layer that combines master data, policy and metadata, including governed models, golden records, workflow, validated values, business-rule monitoring, data-quality controls and auditable changes.

GitHub documents that protected branches can require pull-request approval, successful status checks, conversation resolution, signed commits, restricted pushes and controls preventing rule bypass.

GitHub also supports `CODEOWNERS` files for assigning individuals or teams responsibility for repository paths, with optional mandatory code-owner review on protected branches.

The current Martenweave Core README defines canonical files as the source of truth, generated indexes as disposable, deterministic validation as a pre-indexing requirement and AI changes as reviewable proposals rather than silent mutations.

Martenweave is an independent project and is not affiliated with or endorsed by SAP or GitHub. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates. GitHub is a trademark of GitHub, Inc.
