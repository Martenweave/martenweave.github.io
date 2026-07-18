# How to Define Data Ownership That Still Works After the SAP Programme Ends

**Reviewed: 14 July 2026**

Three months after go-live, an AMS analyst receives an incident.

A new supplier cannot be activated because Supplier Risk is blank.

The validation was introduced during the SAP programme. The configuration is working as designed.

The analyst searches the handover material.

The solution document says Supplier Risk is mandatory. The mapping workbook identifies a legacy source that no longer exists. A decision log names the programme’s Global Supplier Lead, who has left the company. The local data owner listed for Germany belonged to the implementation partner. The source-remediation ticket was closed during cutover.

Nobody currently has authority to answer the actual question:

> Should the new supplier be blocked, enriched, placed under review or treated as outside the rule’s applicable population?

The AMS team can resolve the technical incident in several ways:

- change the validation;
- ask the business user to enter a value;
- copy the value from a similar supplier;
- create a temporary exception;
- escalate to the service manager.

None of these options establishes who owns the model decision.

The project had named owners.

The operating organisation inherited names, documents and configuration, but not durable decision rights.

This is why many ownership models fail shortly after go-live. They are designed to help a programme deliver, not to help an organisation govern the model after the programme disappears.

> Sustainable data ownership is not a list of people responsible during implementation. It is an operating contract that remains valid when projects, suppliers, systems and individuals change.

That contract must define:

- which decisions belong to which role;
- what evidence the role is expected to review;
- which work can be delegated;
- how ownership transfers;
- how AMS and business operations interact;
- who acts when the named owner is absent;
- how an unresolved ownership gap becomes visible.

Without these elements, “data owner” becomes a title attached to someone who receives escalations but lacks the time, evidence or authority to resolve them.

---

## The day after the programme ends

During a large SAP migration or MDG implementation, ownership often appears stronger than it really is.

The programme has:

- domain leads;
- migration object leads;
- process owners;
- country representatives;
- architects;
- data stewards;
- workstream leads;
- design authorities.

Questions can be pushed into workshops. Consultants assemble evidence. Programme managers chase decisions. Senior sponsors resolve deadlocks.

This creates a temporary governance capacity.

When the programme ends, several things happen at once:

1. The migration team is dissolved.
2. External consultants leave.
3. Design authorities stop meeting.
4. Local representatives return to operational roles.
5. Decision logs become archive material.
6. Responsibility shifts to AMS, shared services or business operations.
7. New records and new requirements appear outside the migration scope.

The master-data model continues to change, even when nobody calls the changes “model changes.”

Examples include:

- new source values;
- new country requirements;
- reorganisations;
- new interfaces;
- regulatory updates;
- field retirements;
- recurring incidents;
- manual workarounds;
- mass corrections;
- new reporting needs.

If the operating ownership model cannot process these changes, the organisation will still make decisions. They will simply be made through:

- incident resolution;
- configuration changes;
- local spreadsheets;
- email approvals;
- emergency workarounds;
- undocumented defaults.

Ownership does not disappear.

It becomes implicit.

---

# Three clocks of ownership

A sustainable model must work across three different clocks.

## The programme clock

Measured in:

- sprints;
- mock loads;
- design cycles;
- cutover milestones;
- defect deadlines.

The priority is delivery.

## The operational clock

Measured in:

- incidents;
- service requests;
- onboarding cases;
- daily data maintenance;
- business deadlines;
- SLA targets.

The priority is continuity.

## The model clock

Measured in:

- semantic changes;
- policy revisions;
- source transitions;
- lifecycle changes;
- accumulated exceptions;
- repeated evidence.

The priority is maintaining coherent truth.

These clocks do not naturally align.

AMS may need an answer today.

The model owner may need an investigation before changing the rule.

The business may need to onboard a critical supplier immediately.

A useful ownership model does not pretend these tensions can be removed. It defines who may make which kind of decision under which conditions.

---

# Ownership is a bundle of decision rights

The term “data owner” is often used as though it describes one universal job.

In practice, ownership contains several distinct rights.

## Semantic authority

Who decides what the attribute or entity means?

For Supplier Risk, this includes:

- whether it represents final classification;
- how it differs from review status;
- its granularity;
- its lifecycle;
- its permitted values.

## Applicability authority

Who decides where the rule applies?

For example:

- active suppliers only;
- strategic suppliers;
- organisations but not persons;
- one country;
- one purchasing organisation;
- one regulatory population.

## Source authority

Who confirms which system, process or evidence may provide the value?

## Quality authority

Who defines acceptable completeness, validity and remediation expectations?

## Exception authority

Who may approve a bounded case in which the normal rule does not apply?

## Risk authority

Who may accept temporary exposure when the intended control cannot be satisfied?

## Implementation authority

Who can change SAP MDG, migration logic, interfaces, validation or workflow?

## Operational stewardship

Who corrects records, manages queues and follows up with users?

These rights should not all be assigned to one person.

A business domain owner may define Supplier Risk but should not be expected to maintain every record.

An AMS consultant may implement a validation change but should not redefine the business policy.

A steward may correct data but should not approve a new exception class.

---

# The six roles that usually survive go-live

The exact titles vary, but a durable operating model normally needs six types of role.

## 1. Domain owner

Owns the business meaning and overall policy for a domain such as Supplier, Customer, Product or Business Partner.

This role should decide:

- definitions;
- global semantic boundaries;
- shared lifecycle;
- major ownership conflicts;
- enterprise-level changes.

The role should not be the default assignee for every operational issue.

## 2. Attribute or rule owner

Owns a narrower critical concept.

Examples:

- Supplier Risk;
- Customer Group;
- Tax Identifier;
- Payment Terms;
- Product Classification.

This level is useful when one domain contains too many specialised decisions for one domain owner.

## 3. Contextual owner

Owns legitimate country, business-unit or regulatory applicability.

This role may approve decisions within a defined boundary but should not silently alter global semantics.

## 4. Operational steward

Manages day-to-day records, queues, evidence collection and remediation.

This role needs clear procedures and escalation rights.

It should not be treated as the final authority for unresolved model questions.

## 5. Platform or implementation owner

Owns SAP MDG configuration, MDM workflows, interfaces, rules or other technical implementations.

The role confirms what the system does and implements approved changes.

## 6. Service owner

Owns the operational service across incidents, changes, SLAs and support processes.

This role ensures that findings reach the proper semantic, business or implementation authority instead of circulating indefinitely through AMS.

SAP’s current MDG positioning explicitly includes ownership of specific master-data attributes, collaborative routing, notifications, validated values, monitoring and auditable changes. These capabilities can support an operating ownership model, but they do not define the organisation’s decision rights by themselves.

---

# The owner must have a defined object

“Owner of supplier data” is usually too broad.

Ownership should attach to something concrete:

- domain;
- entity;
- attribute;
- relationship;
- rule;
- value list;
- source;
- country context;
- process stage.

For example:

```text
Role:
Global Supplier Risk Owner

Owns:
- ATTR-SUPPLIER-RISK
- RULE-SUPPLIER-RISK-ACTIVATION
- global risk value semantics

Does not own:
- record-level assessment
- ERP_B extraction
- SAP transport execution
- Portuguese compliance-review workflow
```

This boundary matters after go-live.

When the AMS analyst receives the incident, the system can distinguish:

- semantic question → Supplier Risk Owner;
- incorrect validation → SAP MDG owner;
- incomplete record → operational steward;
- source field missing → source owner;
- urgent temporary exposure → service and risk owner.

Without object-level ownership, every issue is routed to a large domain mailbox.

---

# Ownership must attach to roles, not programme participants

A handover package often contains names:

- Jane — Customer Data Lead;
- Michael — Migration Mapping Lead;
- Anna — Portugal Business Representative.

Names age quickly.

A durable record should state:

```text
Canonical role:
Portugal Supplier Compliance Owner

Current holder:
Anna Silva

Delegate:
Portugal Supplier Governance Deputy

Authority:
- define local compliance applicability;
- approve local evidence requirements;
- propose contextual model changes.

Escalation:
Global Supplier Domain Owner
```

The role remains even when the holder changes.

Collibra’s governance guidance treats an operating model as the foundation for data governance, defining roles, responsibilities, business terms and domains. It also distinguishes business stewards, who own data concerns, from technical stewards, who own supporting infrastructure, within centralised or federated authority structures.

That distinction is important for SAP programmes: business authority and technical capability should remain connected without being collapsed into one role.

---

# Handover must transfer authority, not only knowledge

A conventional handover focuses on:

- solution documentation;
- configuration;
- interfaces;
- support procedures;
- known errors;
- open defects.

A model-governance handover should also transfer:

- active decisions;
- temporary deviations;
- ownership roles;
- escalation paths;
- unresolved investigations;
- pending source-remediation commitments;
- review triggers;
- affected populations;
- model baselines.

The receiving organisation should explicitly accept:

> We now own these model decisions and these unresolved obligations.

Otherwise, the programme closes while its governance debt remains unowned.

A useful acceptance record might state:

```text
Transferred to operations:

Current Supplier Risk policy:
Accepted

Open ERP_B source gap:
Accepted with remediation owner

Wave 2 temporary deviation:
Accepted until 30 September

Portuguese contextual rule:
Accepted by local owner

Unresolved Customer Group source decision:
Not accepted; programme closure blocked
```

The handover is incomplete when operational ownership exists only in theory.

---

# Temporary programme roles must be mapped to permanent roles

Programme roles often do not have direct operational equivalents.

For example:

| Programme role | Permanent destination |
|---|---|
| Migration Object Lead | Domain or attribute owner |
| Country Data Lead | Contextual owner |
| Data Cleansing Lead | Operational stewardship lead |
| Solution Architect | Platform or model architecture owner |
| Cutover Lead | Service transition owner |
| Design Authority | Standing governance forum or domain authority |
| Defect Manager | Service-management process |

This mapping should happen before cutover, not after hypercare.

Where no permanent destination exists, the programme has found an ownership gap.

That gap should be resolved explicitly rather than assigned temporarily to AMS.

---

# The AMS contract must state what AMS may decide

AMS is often given responsibility without authority.

The service is expected to:

- resolve incidents;
- meet SLAs;
- maintain configuration;
- support users;
- execute changes.

But the contract may not state whether AMS can:

- change a mandatory rule;
- add a value;
- approve a default;
- reinterpret a local exception;
- retire an attribute;
- accept missing evidence.

This ambiguity produces two bad outcomes.

### Overreach

AMS changes model behaviour to resolve incidents quickly.

### Paralysis

AMS escalates every question because no decision boundary is defined.

A practical authority matrix could state:

## AMS may do without model approval

- correct implementation to match an approved rule;
- repair extraction defects;
- restore failed interfaces;
- correct record-level technical errors;
- apply documented operational procedures.

## AMS requires domain approval

- change applicability;
- add or remove values;
- introduce a default;
- change cardinality;
- redefine source authority;
- create a permanent exception.

## AMS requires risk approval

- extend a temporary deviation;
- permit activation without required evidence;
- bypass a critical control.

This boundary should be included in the service model, not discovered incident by incident.

---

# Knowledge management is not ownership

An organisation may have excellent support articles and still lack decision authority.

ServiceNow’s current Knowledge Center positioning includes article quality management, gap detection, reusable knowledge blocks, analytics and group ownership for routing feedback and maintenance. These capabilities are useful for preserving operational guidance and assigning responsibility for content.

But ownership of an article is not ownership of the model rule described by the article.

For example:

- the knowledge team may own the article explaining Supplier Risk errors;
- the service team may own the incident process;
- the domain owner still owns the meaning and applicability of Supplier Risk.

The relationships should be explicit:

```text
Knowledge article:
How to resolve missing Supplier Risk

Operational owner:
Supplier Data Support Team

Governed rule:
RULE-SUPPLIER-RISK-ACTIVATION

Semantic owner:
Global Supplier Risk Owner
```

This prevents support documentation from quietly becoming policy.

---

# A data catalogue can hold enterprise ownership, but delivery ownership remains more granular

Enterprise governance platforms can represent:

- domains;
- owners;
- business terms;
- critical data elements;
- policies;
- systems;
- quality scorecards.

Collibra’s published guidance places owners, business glossaries, dictionaries, processes, systems, policies and quality measures inside domain-level governance structures.

That provides a strong enterprise layer.

A migration and AMS model still needs more specific links:

```text
Enterprise term:
Supplier Risk

Canonical model object:
ATTR-SUPPLIER-RISK

SAP endpoint:
Supplier master implementation field

Global rule:
Required before activation for applicable suppliers

Source owners:
ERP_A, ERP_B, MDM_C

Contextual owners:
Portugal, Germany

AMS implementation owner:
SAP MDG Support Team
```

Martenweave should not replace the enterprise catalogue.

It should preserve the delivery and change-control relationships that the catalogue may not hold at this level of detail.

---

# Ownership must include recurring obligations

An owner should not exist only to approve changes.

The role should have a small set of recurring obligations.

For a critical attribute owner:

- review unresolved model findings;
- review repeated exceptions;
- confirm source authority;
- approve semantic changes;
- monitor ownership coverage;
- review expired deviations;
- respond to material incidents;
- confirm successor or delegate.

For an operational steward:

- process remediation queues;
- maintain evidence;
- identify recurring defects;
- escalate model ambiguity;
- confirm closure populations.

For a platform owner:

- maintain implementation alignment;
- document configuration changes;
- provide traceable deployment evidence;
- monitor drift from canonical rules.

Ownership becomes real when the role has an operating rhythm.

---

# Avoid the governance calendar trap

A common solution is to create more meetings:

- monthly data council;
- weekly stewardship forum;
- country governance call;
- quarterly model review.

Meetings are not ownership.

A durable operating model should resolve most findings without requiring a committee.

Use standing forums only for:

- cross-domain changes;
- global–local conflicts;
- material risk acceptance;
- repeated local patterns;
- unresolved authority;
- retirement of shared concepts.

Routine work should flow directly through role-based decision rights.

A useful principle is:

> Most ownership should be exercised asynchronously through bounded review packages. Meetings should handle conflicts, not ordinary approvals.

---

# The owner needs evidence, not a raw ticket

A sustainable model reduces the effort required to make a responsible decision.

A good review package contains:

- decision required;
- affected model object;
- current approved state;
- observed evidence;
- applicable population;
- alternatives;
- downstream impact;
- recommendation;
- deadline;
- required authority.

Example:

```text
Decision required:
Approve permanent treatment for suppliers without final risk.

Affected population:
1,284 ERP_B strategic supplier organisations.

Current policy:
Final risk required before activation.

Temporary state:
Controlled review allowed until 30 September.

Alternatives:
1. Source enhancement
2. Business enrichment
3. Approved derivation
4. Exclusion

Recommendation:
Source enhancement plus continued controlled enrichment.

Decision consequence:
Temporary deviation expires before next release.
```

A data owner who receives this packet can exercise authority.

A data owner who receives “please review defect 8421” will become a routing point.

---

# Ownership should be tested before go-live

Do not assume that assigning roles proves the model works.

Run ownership drills.

## Drill 1: missing critical attribute

A new operational record lacks Supplier Risk.

Can the support team determine:

- whether the rule applies;
- who decides the treatment;
- who corrects the data;
- who changes configuration if needed?

## Drill 2: new local requirement

A country requests a new classification.

Can the organisation determine:

- local or global authority;
- evidence required;
- review path;
- implementation owner?

## Drill 3: expired deviation

A temporary migration exception expires.

Does someone receive the obligation to:

- close it;
- extend it;
- propose permanent change?

## Drill 4: owner leaves

The current attribute owner changes role.

Does the canonical role continue with:

- delegate;
- successor;
- authority;
- open decisions?

## Drill 5: repeated incident

The same validation issue returns five times.

Can the service process escalate from incident resolution to model investigation?

An ownership model that fails these drills is not ready for handover.

---

# The ninety-day transfer

Ownership transition should begin before cutover and continue through early operations.

## Before cutover

- identify permanent roles;
- map programme roles to operational roles;
- resolve ownerless critical objects;
- document decision rights;
- catalogue temporary deviations;
- define AMS boundaries.

## During hypercare

- permanent owners join finding triage;
- programme owners act as advisers, not final authorities;
- operational teams practise evidence-based decisions;
- unresolved ownership gaps remain visible.

## First thirty days

- review all active deviations;
- review recurring incidents;
- confirm delegates;
- compare canonical model with production configuration;
- confirm source-remediation commitments.

## Days thirty to ninety

- transfer remaining decisions;
- retire programme-only roles;
- verify that operational owners have acted;
- measure routing accuracy and decision delay;
- close or reapprove temporary treatments.

## After ninety days

The programme should no longer be the default authority.

Any remaining dependence on former project leads should be treated as transition failure.

---

# What happens when no owner accepts responsibility

This situation should be represented honestly.

Do not assign the object to:

- project manager;
- data governance mailbox;
- AMS lead;
- enterprise architect;

unless that role has accepted authority.

Create an ownership gap:

```text
Object:
ATTR-CUSTOMER-GROUP

Missing authority:
No role owns semantic definition across sales areas.

Operational consequence:
AMS cannot approve mapping or validation changes.

Escalation:
Customer Domain Sponsor

Required resolution:
Appoint role and approve authority scope.
```

An ownerless critical object should affect governance health and readiness.

Martenweave’s current command set includes ownership coverage and steward-workload reporting, while its governance health and scorecard outputs are intended to surface ownership and readiness signals.

That makes ownership gaps visible as product data, not organisational folklore.

---

# Successor planning belongs in the model

For critical roles, record:

- current holder;
- delegate;
- organisational unit;
- effective dates;
- escalation role;
- last confirmed date.

Example:

```yaml
id: ROLE-GLOBAL-SUPPLIER-RISK-OWNER
type: GovernanceRole

authority:
  - approve_attribute_definition
  - approve_global_values
  - approve_applicability
  - approve_semantic_exception

current_holder: PERSON-1042
delegate: PERSON-1180
organisation: Global Procurement Governance
escalates_to: ROLE-SUPPLIER-DOMAIN-SPONSOR
effective_from: 2026-07-01
review_by: 2027-01-01
```

This is a conceptual direction rather than a claim about the current Martenweave schema.

The owner relationship is part of model reliability.

A role with no current holder should be detectable.

---

# Measure behaviour, not coverage alone

A dashboard may report:

> 98% of critical attributes have owners.

That is useful but incomplete.

Better indicators include:

## Ownership coverage

Which objects have no accountable role?

## Authority completeness

Does the role have defined decision rights?

## Owner activity

Has the role reviewed or decided anything recently?

## Decision delay

How long do evidence-ready findings wait?

## Handover dependency

How many decisions still require former programme members?

## Reassignment rate

How often are findings moved because the initial route was wrong?

## Delegate coverage

Which critical roles have no backup?

## Expired ownership

Which assignments are no longer current?

## AMS escalation quality

How many incidents correctly escalate into model findings?

A nominal owner who never receives evidence or exercises authority is not functioning ownership.

---

# How Martenweave should divide responsibilities with other applications

## SAP MDG or another MDM platform

Use it to:

- enforce approved rules;
- route operational change requests;
- support stewardship;
- maintain auditable master-data changes;
- monitor data quality.

SAP describes MDG as a central governance layer providing governed models, attribute ownership, collaborative workflows, validated values, monitoring and auditability.

Martenweave should preserve why those rules and owners exist and how they relate to source evidence, migration decisions and change proposals.

## Enterprise governance platform

Use it for:

- enterprise domains;
- business glossary;
- policy;
- broad ownership;
- stewardship organisation;
- catalogue and lineage context.

Collibra’s published guidance emphasises operating models, formalised ownership, data domains and the distinction between business and technical stewardship.

Martenweave should link those enterprise roles to concrete model objects, mappings, rules and findings.

## ServiceNow or another ITSM platform

Use it for:

- incidents;
- service requests;
- changes;
- knowledge articles;
- operational workflow;
- SLA management.

ServiceNow’s Knowledge Center includes group ownership for routing article feedback and maintenance, alongside knowledge quality, reuse and analytics.

Martenweave should ensure that operational articles and tickets point back to the authoritative model rule and owner.

## Git and GitHub

Use them to:

- preserve canonical diffs;
- review proposals;
- record approvals;
- maintain version history.

Martenweave’s current product principles treat canonical files as source of truth, generated indexes as disposable, AI output as reviewable proposals and Git as the durable change record.

Git records the change.

The ownership model determines who may approve it.

---

# A small Martenweave ownership slice

A useful implementation does not need a complete enterprise organisation model.

Start with:

1. `GovernanceRole`;
2. ownership relationships for domains, attributes, rules and sources;
3. authority types;
4. current holder and delegate;
5. escalation parent;
6. ownership validation;
7. owner-aware finding routing;
8. workload and coverage report.

The first vertical scenario could be:

> A Supplier Risk finding is classified as a source capability gap. Martenweave identifies the global rule owner as decision authority, the ERP_B owner as evidence and remediation contributor, the SAP MDG team as implementation owner and the Supplier Domain Sponsor as fallback. When the current holder is removed, the delegate or escalation route remains valid.

This proves durable ownership better than a large organisation chart.

---

# The final test

A post-programme ownership model is working when an operational team can answer five questions without calling the former project lead:

1. What model object or rule governs this issue?
2. Who has authority to decide its meaning or applicability?
3. Who owns the evidence or source?
4. Who implements the approved treatment?
5. Who may accept temporary risk?

The answer should not be “the data owner.”

It should identify distinct roles.

The purpose of ownership is not to ensure that every issue has someone’s name attached.

It is to ensure that the organisation can continue making controlled model decisions after the temporary governance machinery of the SAP programme has gone.

A project can hand over configuration in one week.

It takes more discipline to hand over authority.

That is the part that determines whether the model remains governed after go-live.

## About the authors

We are Metalhatscats, the team behind Martenweave.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

It connects:

- canonical model objects;
- governance roles;
- source ownership;
- findings;
- decisions;
- temporary deviations;
- implementation actions;
- reviewed model changes.

The purpose is not to create another organisational directory.

It is to ensure that model authority remains traceable when programme roles, employees, implementation partners and operational systems change.

## Sources and notes

This article was reviewed on 14 July 2026.

SAP currently describes SAP Master Data Governance as a central governance layer with one governed model, preserved semantics and relationships, attribute ownership, collaborative workflow routing, validated values, quality monitoring and auditable change.

Collibra’s published governance guidance describes an operating model as the basis of governance, defining roles, responsibilities, domains and business terms. It also distinguishes business stewards from technical stewards and discusses centralised and federated authority structures.

ServiceNow’s current Knowledge Center offering includes knowledge quality management, gap detection, reusable content, analytics and group ownership for article feedback and maintenance.

Martenweave Core currently includes ownership coverage and steward-workload reporting alongside health, scorecard, validation, gap, trace and impact capabilities.

Its public demo describes governance health and scorecards as providing ownership, readiness, coverage and model-side gap signals.

Martenweave is independent and is not affiliated with or endorsed by SAP, Collibra, ServiceNow or other vendors named in this article. Product names and trademarks belong to their respective owners.
