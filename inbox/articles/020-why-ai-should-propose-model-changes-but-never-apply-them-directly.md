# Why AI Should Propose Model Changes but Never Apply Them Directly

**Reviewed: 14 July 2026**

An AI agent reviews a migration workbook and finds an obvious inconsistency.

The target field is mandatory. One legacy system has no corresponding source field. Thousands of records will fail the next mock load.

The agent proposes a solution:

- derive the value from another source attribute;
- add a default for the remaining records;
- update the mapping;
- modify the validation rule;
- mark the gap as resolved.

The proposal is clear, technically plausible and presented with confidence.

The team accepts it automatically.

Two weeks later, the default is found in production-like data. It looks like a valid business value, so users cannot distinguish it from genuinely maintained information. The derived value is correct for most countries but wrong for one local process. A downstream interface uses the field for pricing. The business owner never approved the loss of distinction.

The AI did not produce nonsense.

It produced a reasonable answer to an incomplete problem.

That is the more dangerous failure mode.

Obvious errors are usually caught. Plausible changes can pass unnoticed because they fit the structure, compile successfully and remove an immediate blocker.

This is why our principle for Martenweave is strict:

> AI may propose a model change. It must not decide that the proposed change has become model truth.

The approved model affects migration, validation, integration, testing and operations. Changing it is not merely a content-generation task. It is a governance decision.

## The problem is not that AI makes mistakes

People also make incorrect mappings, misunderstand source fields and approve weak defaults.

The reason for controlling AI changes is not that human judgement is always correct.

The difference is how AI produces its answer.

A language model can generate a convincing proposal from:

- incomplete evidence;
- conflicting documents;
- obsolete tickets;
- ambiguous field names;
- statistical similarity;
- patterns learned from unrelated projects;
- assumptions not stated in the output.

The generated result may be useful. It may even be better than a hurried human draft.

It does not carry authority.

NIST’s AI Risk Management Framework is intended to help organisations incorporate trustworthiness considerations into the design, development, use and evaluation of AI systems. Its supporting playbook structures risk work around the functions Govern, Map, Measure and Manage rather than treating model output as self-validating.

That distinction is critical for model governance.

An AI-generated change is evidence or analysis entering a controlled process. It is not the process itself.

## A model change is a decision, not a text edit

In a file-based registry, changing a model may appear technically simple.

The agent edits a YAML or Markdown object:

```yaml
attribute: CustomerGroup
mandatory: true
```

The file remains syntactically valid.

References resolve.

Tests pass.

But this small edit may imply:

- source systems must provide the value;
- migration mappings need revision;
- incomplete records require remediation;
- validation behaviour changes;
- local exceptions become invalid;
- user interfaces change;
- APIs may reject records;
- existing records may fail when edited;
- downstream consumers may interpret blanks differently;
- new regression tests are required.

The text edit is trivial.

The decision is not.

A safe architecture separates these two actions:

```text
Generate proposed change
          ↓
Validate structure
          ↓
Analyse impact
          ↓
Review evidence
          ↓
Human approval
          ↓
Apply approved change
```

Removing the approval boundary means allowing the system that generates an option to declare that option correct.

## Plausibility is not evidence

AI is particularly effective at producing plausible mappings.

Suppose it sees:

```text
Legacy field: CUST_SEGMENT
Target field: Customer Group
```

The semantic similarity is strong.

The mapping may still be wrong because:

- the source field represents marketing segmentation;
- the target field controls sales processing;
- meanings differ by country;
- the source value is global while the target is sales-area-specific;
- only inactive records contain reliable values;
- the target is already populated from another source;
- the field names were reused historically.

The AI can suggest the relationship.

Approval requires evidence such as:

- source-system definition;
- value distributions;
- process usage;
- business-owner confirmation;
- target context;
- existing mappings;
- test results.

A model registry should preserve the difference between:

```text
Candidate relationship
```

and:

```text
Approved mapping
```

Without that distinction, the registry becomes a collection of highly organised assumptions.

## The source material may itself be wrong

AI systems are often described as being grounded in enterprise content.

Grounding improves relevance. It does not make every source authoritative.

A project repository may contain:

- obsolete designs;
- rejected options;
- duplicated workbooks;
- temporary testing rules;
- local exceptions;
- unresolved comments;
- copied errors;
- configuration notes from the wrong environment;
- migration logic that was later replaced.

An agent searching these artefacts may find several confident statements about the same field.

For example:

```text
Document A:
Tax ID is mandatory globally.

Ticket B:
Tax ID is optional for Portugal.

Mapping C:
Blank values default to UNKNOWN.

Current configuration:
Mandatory only for selected tax categories.
```

The AI cannot determine the approved truth from recency or wording alone.

It can:

- identify the conflict;
- summarise the evidence;
- propose a resolution;
- list affected objects.

A responsible owner must decide which rule should govern the model.

## Direct application turns uncertainty into hidden certainty

A good AI proposal can express uncertainty:

- source meaning is ambiguous;
- value coverage is incomplete;
- local context is missing;
- two rules conflict;
- no approval evidence was found.

If the agent is allowed to apply the change directly, the model usually cannot preserve this uncertainty naturally.

The resulting object simply states:

```yaml
mandatory: true
```

The uncertain proposal has become an apparently certain fact.

This is a serious governance failure.

The next team sees only the final model and assumes the question was resolved.

A safer proposal object should retain:

- requested change;
- supporting evidence;
- conflicting evidence;
- assumptions;
- confidence;
- unresolved questions;
- affected objects;
- validation results;
- proposed reviewers.

The approval process then converts a documented proposal into an authorised model change.

## Why deterministic validation is necessary but insufficient

Martenweave uses deterministic validation because many model problems should not require human discovery.

Validators can detect:

- duplicate identifiers;
- missing references;
- invalid object types;
- mappings without endpoints;
- references to retired objects;
- missing required fields;
- invalid status transitions;
- broken context links.

This is valuable.

It does not prove that a proposed mapping is semantically correct.

A structurally valid model can still contain:

- the wrong source field;
- an invalid business definition;
- an inappropriate default;
- a local rule presented as global;
- an incomplete value mapping;
- a rule owned by the wrong function.

Deterministic validation answers:

> Is the proposed model internally well formed according to the rules we can encode?

Human review answers:

> Is this the model the organisation intends to govern?

The two controls solve different problems.

## Why human approval alone is also insufficient

“Human in the loop” can become a superficial slogan.

A user receives a large proposal, clicks Approve and becomes nominally responsible for a decision they did not meaningfully review.

Effective oversight requires more than placing a confirmation button after the AI output.

The reviewer needs:

- a clear summary of the change;
- the exact affected objects;
- the evidence used;
- unresolved conflicts;
- structural validation results;
- current-data impact;
- downstream dependencies;
- a readable diff;
- authority to reject or modify;
- sufficient time and competence.

OWASP identifies excessive autonomy as a source of risk in agentic systems and recommends requiring human approval for high-impact actions, limiting tool functionality and permissions, and enforcing authorisation in downstream systems rather than relying on the model to decide what is allowed.

For model governance, a human approval step should therefore be an actual decision point, not a decorative confirmation.

## The approval should occur in a trusted control layer

The AI agent should not be responsible for deciding whether approval is required.

That rule must be enforced outside the model.

A weak pattern is:

```text
AI decides change is low risk
→ AI applies change automatically
```

A stronger pattern is:

```text
Policy classifies change type
→ system determines required approval
→ AI cannot bypass policy
```

For example:

### Low-risk suggestion

- wording improvement;
- proposed alias;
- non-authoritative summary;
- missing documentation hint.

This may use a lightweight review.

### Controlled model change

- mapping update;
- value-list addition;
- ownership change;
- local-context rule;
- transformation revision.

This requires affected owners.

### High-impact model change

- global definition change;
- mandatory-field change;
- identifier strategy;
- removal of an attribute;
- matching or workflow change;
- broad migration default.

This requires formal business and architecture approval.

The AI may recommend a risk class.

The approval policy should be deterministic and independently enforced.

## Least privilege matters

An AI system that only needs to inspect the model should have read access.

An AI system that drafts proposals should have permission to create proposal artefacts.

It should not automatically receive permission to:

- update canonical files;
- merge approved branches;
- change SAP configuration;
- close governance issues;
- alter production datasets;
- publish new value lists.

OWASP’s guidance on excessive agency emphasises limiting agent functionality, permissions and autonomy to the minimum required, including using read-only access when write access is unnecessary.

For Martenweave, that suggests a simple permission boundary:

```text
Read model and evidence:
Allowed

Create PatchProposal:
Allowed

Run validation and impact analysis:
Allowed

Apply to canonical model:
Restricted to approved change process

Write to SAP production:
Not part of the product
```

The architecture should make the unsafe action unavailable rather than instructing the AI not to use it.

## Why rollback is not enough

A common argument for autonomous changes is:

> We have Git history. We can revert the change if it is wrong.

Version control is necessary.

It does not remove the risk.

Before the error is noticed, the change may have influenced:

- generated mapping exports;
- migration code;
- test expectations;
- issue creation;
- architecture documentation;
- downstream agents;
- management reports;
- SAP configuration work;
- data-remediation decisions.

Reverting the source file does not automatically reverse these consequences.

A wrong model change can spread because other work treats the registry as trusted context.

The stronger the registry becomes, the more important the approval boundary becomes.

## Why sandboxing is not enough

Another argument is:

> The AI applies the change only in a development branch or sandbox.

This is safer than direct production modification.

It is still not approval.

A sandbox answers:

- Does the model parse?
- Do validators pass?
- Can indexes be generated?
- Do selected tests pass?

It may not reveal:

- business-meaning errors;
- missing countries;
- incomplete datasets;
- legal exceptions;
- downstream consumers not represented in tests;
- operational ownership gaps.

Sandbox execution should be part of proposal evaluation.

It should not be confused with business authorisation.

## A good proposal should be inspectable

An AI-generated model proposal should be structured for review.

At minimum, it should contain:

### Proposed change

A precise description of the intended modification.

### Current state

The model objects and values before the change.

### Proposed state

The model objects and values after the change.

### Reason

The problem the proposal is attempting to solve.

### Evidence

The documents, datasets, tickets, reports or rules used.

### Assumptions

Anything inferred rather than directly established.

### Conflicts

Evidence that points toward another interpretation.

### Affected objects

Mappings, fields, rules, values, contexts and decisions.

### Dataset impact

Known populations, missing values and uncovered codes.

### Validation result

Structural checks passed or failed.

### Required reviewers

Roles with authority over the affected area.

### Suggested verification

Tests or commands needed before acceptance.

This structure changes the reviewer’s task from “judge an AI answer” to “review a model change.”

## Diffs should show meaning, not only files

A Git diff is useful for technical reviewers.

Business and programme reviewers need a semantic diff.

Instead of showing only:

```diff
- mandatory: false
+ mandatory: true
```

the review should explain:

```text
Attribute:
Customer Group

Context:
German sales areas

Current rule:
Optional

Proposed rule:
Mandatory for active B2B customers

Affected sources:
CRM_A, ERP_B

Data impact:
4,620 current records are blank

Related mappings:
3

Related tests:
7

Open issue:
No reliable source exists in ERP_B
```

This makes human approval realistic.

Reviewers should not need to reverse-engineer model semantics from file changes.

## The AI should be required to cite its evidence

A proposal without evidence is an idea.

That may still be useful, but it should be labelled accordingly.

For evidence-based proposals, every material claim should trace back to:

- model object;
- document section;
- ticket;
- dataset profile;
- validation report;
- configuration reference;
- test result.

For example:

```text
Claim:
Customer Group is mandatory in Germany.

Evidence:
- Approved decision DEC-0142
- Rule RULE-CUST-GROUP-DE
- UAT test TC-882
```

If the agent cannot find approval evidence, it should say:

> I found the rule in configuration notes and one mapping workbook, but no approved business decision.

That absence is valuable information.

The system should not reward the agent for producing a complete-looking answer when the evidence is incomplete.

## Proposals should be allowed to fail

An AI workflow becomes dangerous when success is defined as always producing a patch.

Sometimes the correct result is:

- insufficient evidence;
- conflicting definitions;
- no reliable source field;
- approval owner unknown;
- target context unclear;
- dataset unavailable;
- change too broad for automated analysis.

A mature agent should be able to produce a **gap report** instead of a patch.

For example:

```text
No safe mapping proposal generated.

Reason:
Two candidate source fields use incompatible definitions.

Required action:
Business owner must confirm whether the target represents
commercial segmentation or pricing classification.
```

This is better than selecting the most semantically similar field to complete the task.

## Human approval should be role-based

Not every reviewer has authority over every aspect of the proposal.

A mapping change may require:

- business owner for meaning;
- source-system owner for source reliability;
- MDG architect for target implementation;
- migration lead for transformation;
- integration owner for downstream effect;
- test lead for verification scope.

The approval model should reflect the type of change.

For example:

| Change | Required approval |
|---|---|
| Description wording | Model owner |
| Source mapping | Business owner + migration lead |
| Target endpoint | Data architect + SAP architect |
| Value-list change | Value-list owner |
| Mandatory rule | Business owner + architecture |
| Global identifier strategy | Formal governance board |

The AI may identify suggested reviewers from ownership metadata.

The system should enforce required roles.

## Approval should produce accountability

Approval should record:

- approver;
- role;
- date;
- approved change;
- evidence reviewed;
- conditions;
- effective version;
- implementation owner.

This is not about blaming the approver later.

It creates a durable explanation of how a proposal became authoritative.

Without this record, future teams may know that AI suggested a change but not who accepted the business consequences.

## The agent should not be both author and verifier

Using one AI call to generate a proposal and then asking the same system to approve its own output creates weak separation of duties.

A safer workflow may use several layers:

```text
Agent A:
Extracts evidence and proposes change

Deterministic validators:
Check model structure

Impact engine:
Finds connected objects

Agent B or separate analysis:
Challenges assumptions and identifies omissions

Human reviewers:
Decide
```

A second AI reviewer is not a replacement for human approval.

It can improve proposal quality by searching for contradictions, missing contexts and unsupported claims.

The key is that no generative component has final authority.

## Example: AI proposes a field mapping

The agent receives:

- legacy schema;
- target SAP fields;
- business glossary;
- sample dataset.

It proposes:

```text
LEGACY_CUSTOMER.SEGMENT
→ SAP Customer Group
```

A safe proposal should also show:

- similarity between descriptions;
- source value distribution;
- target value list;
- unmapped values;
- applicable organisational context;
- competing candidate fields;
- missing approval evidence;
- suggested test records.

The migration architect may approve the candidate mapping for further business review.

The business owner may reject it because `SEGMENT` means marketing segment rather than sales-processing group.

The AI saved discovery time.

It did not create an incorrect canonical mapping.

## Example: AI proposes a default

A target field is mandatory and 20% of source records are blank.

The agent proposes defaulting the value to `UNKNOWN`.

The proposal should trigger high scrutiny because a default can create valid-looking but semantically empty data.

The review should ask:

- Is `UNKNOWN` an approved business value?
- Which processes consume it?
- Can affected records be identified?
- Does it influence workflow, pricing or reporting?
- Is it temporary?
- Who owns remediation?
- Will operational creation also permit it?
- How will the value be removed?

The final decision may be:

- reject incomplete records;
- enrich them manually;
- allow a temporary code;
- change the target requirement;
- exclude the population.

The agent can enumerate options.

It should not choose the organisation’s risk appetite.

## Example: AI updates a value mapping

The source dataset contains new codes not present in the approved mapping.

The AI observes naming similarity:

```text
CORP → CORPORATE
GOV → GOVERNMENT
IND → INDIVIDUAL
```

Two values remain:

```text
STRAT
KEY
```

The agent may infer both map to `STRATEGIC`.

That could be correct.

It could also erase an intentional distinction between strategic accounts and key accounts.

The safe output is:

- propose high-confidence translations;
- flag ambiguous values;
- quantify affected records;
- identify owners;
- retain unmapped status until approval.

Automation should reduce repetitive work without converting ambiguity into an irreversible merge.

## Example: AI changes a validation rule

Defect history shows repeated failures caused by one rule.

The agent proposes changing the rule from error to warning.

This may improve test throughput.

It may also weaken a regulatory or operational control.

The proposal should include:

- rule definition;
- original decision;
- defect population;
- countries affected;
- source-data cause;
- temporary workarounds;
- downstream risk;
- alternative remediation;
- reviewers.

Changing severity is not a technical optimisation.

It changes what the organisation permits.

## Proposed does not mean untrusted

A proposal should not be treated as low-quality simply because it came from AI.

AI can provide substantial value:

- reading large document sets;
- extracting candidate objects;
- comparing mapping versions;
- finding conflicts;
- identifying missing references;
- summarising dataset gaps;
- producing structured diffs;
- drafting impact reports;
- preparing issue descriptions.

The proposal state is not a criticism of AI.

Human-created changes should also enter through proposals.

The same governance model can apply to:

- consultant edits;
- spreadsheet imports;
- migration findings;
- configuration discoveries;
- AI suggestions;
- automated schema comparisons.

The important boundary is not human versus machine.

It is **proposed versus approved**.

## The Martenweave change model

Martenweave’s public product description states that the platform connects fields, attributes, rules, owners, issues and decisions, validates references, detects gaps, traces impact and allows AI to propose changes only through reviewable PatchProposals.

The current core also includes a PatchProposal-to-ChangeRequest lifecycle, issue drafts and GitHub-ready change bundles.

The intended lifecycle is:

```text
Evidence collected
        ↓
PatchProposal created
        ↓
Deterministic validation
        ↓
Impact analysis
        ↓
Human review
        ↓
ChangeRequest approved
        ↓
Canonical model updated
        ↓
Indexes and reports regenerated
```

This architecture allows AI to be productive without making it authoritative.

## What PatchProposal should mean

A PatchProposal should represent a candidate modification to the canonical model.

It should be:

- explicit;
- reviewable;
- attributable;
- reversible;
- evidence-linked;
- validation-aware;
- separate from approved truth.

Possible proposal sources include:

- AI extraction;
- spreadsheet import;
- dataset-gap analysis;
- manual architect change;
- Jira issue;
- configuration comparison;
- external schema change.

A proposal may fail validation and remain useful.

For example, it may reveal that the requested mapping references a source endpoint that has never been modelled.

## What ChangeRequest should mean

A ChangeRequest should represent a proposal that has entered formal governance.

It should define:

- required approvers;
- implementation scope;
- conditions;
- validation requirements;
- target baseline;
- affected artefacts;
- planned release.

Approval of the ChangeRequest authorises the model update.

It does not necessarily apply the change directly to SAP or another operational platform.

That remains within the relevant technical and release process.

## Why the canonical model should remain protected

The canonical files are the source from which Martenweave generates:

- indexes;
- search results;
- reports;
- lineage;
- impact analysis;
- review exports;
- agent context.

If AI can change these files directly, it can alter the context used by every subsequent process.

One incorrect mapping may then influence:

- future AI suggestions;
- impact results;
- readiness reports;
- issue drafts;
- handover material.

This creates compounding error.

Protecting the canonical model is therefore more important than protecting an ordinary document.

It is the context layer for other decisions.

## Required technical controls

A safe implementation should include several controls.

### Read-only default

Agents receive read access unless write capability is explicitly necessary.

### Proposal-only write path

AI writes proposals to a separate area, not canonical files.

### Schema validation

Every proposal is checked against object schemas.

### Reference validation

All identifiers and relationships are resolved.

### Policy checks

High-impact changes require defined approval roles.

### Semantic diff

Reviewers see business meaning and impact, not only raw files.

### Audit trail

Proposal source, evidence, validation and decisions are recorded.

### Branch or isolated workspace

Proposal changes are evaluated without contaminating the approved baseline.

### No direct SAP write-back

Martenweave should not grant agents production configuration or master-data write permissions.

### Regeneration after approval

Indexes and reports are rebuilt from the approved canonical state.

These controls turn the principle into architecture.

## Required organisational controls

Technical restrictions are not enough.

The organisation also needs:

- named model owners;
- defined approval roles;
- change classification;
- review service levels;
- escalation for unresolved evidence;
- accepted-risk process;
- periodic review of temporary rules;
- ownership of AI-generated proposals.

Someone must be responsible for deciding whether a proposed change is acceptable.

“Reviewed by the project” is not a sufficient owner.

## Approval latency is a real concern

A slow approval process can cause teams to bypass governance.

The answer is not to remove approval.

It is to design proportional review.

For low-risk changes:

- one owner;
- compact diff;
- asynchronous approval.

For medium-risk changes:

- targeted reviewers;
- automated impact summary;
- specific acceptance criteria.

For high-risk changes:

- formal decision;
- dataset evidence;
- architecture review;
- regression plan.

The proposal should reduce reviewer effort by preparing the evidence and impact automatically.

AI creates value when it makes good governance faster—not when it removes governance.

## The system should learn from approval outcomes

Rejected and modified proposals are useful feedback.

The system can record:

- which assumptions were wrong;
- which evidence was missing;
- which fields were confused;
- which contexts were overlooked;
- which rules caused rejection.

This can improve future proposal generation.

However, learning from approvals should not silently modify policy or the model.

Changes to prompts, matching logic or agent behaviour should remain controlled technical changes.

## Metrics for safe AI-assisted model change

Useful measures include:

### Proposal acceptance rate

How many proposals are approved without modification?

A very low rate suggests poor proposals.

A perfect rate may suggest weak review.

### Modification rate

Which parts are commonly corrected?

### Unsupported-claim rate

How often does a proposal lack sufficient evidence?

### Validation-failure rate

How many proposals contain broken references or schema errors?

### Review time

Does AI reduce the time required to prepare and assess changes?

### Impact completeness

How often do reviewers find material dependencies missing from the proposal?

### Escaped change defects

How many approved changes later prove incorrect?

### Temporary-rule ageing

How many AI-assisted defaults or exceptions remain beyond their review date?

The goal is not maximum automated change volume.

It is better proposals with lower review and rework cost.

## When automatic application may be acceptable

There are narrow cases where generated updates can be applied automatically.

Examples may include:

- rebuilding indexes;
- regenerating reports;
- formatting;
- updating derived counts;
- refreshing non-authoritative summaries;
- synchronising metadata that has one deterministic source;
- applying an already approved change bundle.

The key conditions are:

- no new business decision is introduced;
- the result is deterministic;
- the source is authoritative;
- the change is reversible;
- policy explicitly permits it;
- validation is complete.

This is different from allowing AI to decide that a mapping, rule or definition should change.

A useful rule is:

> Automate derived artefacts. Review authoritative model changes.

## Common objections

### “People approve AI output without checking anyway”

That is a process failure, not a reason to remove approval.

Improve the review surface and accountability.

### “Direct application is faster”

It is faster until a plausible error propagates into mappings, tests and configuration.

### “We can set a confidence threshold”

Model confidence is not business authority. High similarity does not resolve context or ownership.

### “The model is stored in Git, so it is safe”

Git provides history and rollback. It does not provide semantic approval or prevent downstream consequences.

### “The agent only changes development”

Development changes can still become the de facto design and influence other workstreams.

### “Humans make more errors”

The proposal boundary should apply to human and AI changes alike.

### “We need autonomous agents to obtain real value”

Autonomy should be applied to evidence gathering, validation, reporting and proposal preparation before it is applied to authoritative change.

## What management should ask

Before approving AI-assisted model changes, management should ask:

1. Can the AI modify the canonical model directly?
2. Which tools and permissions does it have?
3. Is every model change represented as a proposal?
4. Can reviewers see the evidence and assumptions?
5. Are conflicts shown or hidden?
6. Does deterministic validation run before review?
7. Is impact analysis included?
8. Are required approvers based on change type?
9. Can approval be audited?
10. Are temporary rules given review dates?
11. Can the system apply anything directly to SAP production?
12. How are rejected proposals used to improve the process?
13. Which actions are safely automated because they are derived and deterministic?

If the answer to the first or eleventh question is yes, the architecture needs strong justification.

For Martenweave, our answer should remain no.

## Our conclusion

AI is well suited to the expensive preparation around model change.

It can:

- read fragmented evidence;
- find candidate mappings;
- compare versions;
- detect conflicts;
- quantify gaps;
- identify likely dependencies;
- draft structured changes;
- prepare review material.

It should not decide that its proposal has become approved model truth.

The reason is not simply that AI can hallucinate.

The deeper reason is that model changes combine technical structure, business meaning, organisational authority and risk acceptance.

No language model owns those decisions.

Our principle is therefore:

```text
AI proposes.
Validators verify structure.
Impact analysis exposes consequences.
Humans approve.
Canonical model changes only after approval.
Operational platforms implement through their own controls.
```

This boundary may appear conservative.

It is what allows AI to be used more aggressively in the earlier stages.

When the canonical model is protected, agents can explore, compare and propose without silently corrupting the context on which the programme depends.

The objective is not less automation.

It is automation placed on the correct side of authority.

## About the authors

We are Metalhatscats, the team behind Martenweave.

We build practical model-governance infrastructure for SAP migration, MDG, MDM and AMS teams. Martenweave is designed to let AI perform substantial evidence and proposal work while keeping model authority with deterministic controls and accountable human reviewers.

## Sources and notes

This article was reviewed on 14 July 2026.

NIST describes its AI Risk Management Framework as a voluntary framework for incorporating trustworthiness considerations into the design, development, use and evaluation of AI systems. The associated playbook organises suggested risk-management actions around Govern, Map, Measure and Manage.

OWASP identifies “Excessive Agency” as a risk when LLM-based systems receive unnecessary functionality, permissions or autonomy. Its mitigation guidance includes least privilege, restricted tools, independently enforced authorisation and human approval before high-impact actions.

Martenweave’s current public documentation states that the product connects fields, attributes, rules, owners, issues and decisions; validates references; detects gaps; traces impact; and allows AI-assisted changes only through reviewable PatchProposals.

The current core includes canonical model files, deterministic validation, generated indexes, trace and impact analysis, dataset profiling and a PatchProposal-to-ChangeRequest lifecycle.

Martenweave is an independent project and is not affiliated with or endorsed by SAP, NIST or OWASP. SAP, SAP S/4HANA and SAP Master Data Governance are trademarks or registered trademarks of SAP SE or its affiliates.
