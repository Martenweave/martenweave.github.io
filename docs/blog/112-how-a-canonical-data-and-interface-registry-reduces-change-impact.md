# How a Canonical Data and Interface Registry Reduces Change-Impact Consulting Costs

**Reviewed: 15 July 2026**

Why can changing one master-data field require six weeks of analysis?

The field may contain only four characters.

The change request may sound simple:

> Finance will become the authority for Supplier payment terms. Update the migration logic and all affected integrations.

The first consultant opens the migration workbook.

A second consultant searches the MDG design.

An integration architect asks for the current interface inventory.

The AMS team checks production incidents.

The testing lead wants to know which scenarios must be repeated.

The business owner asks which Suppliers will change.

Nobody disputes that the work is necessary.

The problem is that the programme must reconstruct the dependency chain before it can assess the change.

The field exists in several places:

- a legacy Supplier table;
- an SAP S/4HANA company-code segment;
- an MDG governance process;
- a migration mapping;
- an inbound interface;
- an outbound interface;
- a reporting extract;
- validation Rules;
- test cases;
- historical Decisions.

The project has documents for many of these elements.

It does not have one controlled registry connecting them.

> Change-impact analysis becomes expensive when the organisation stores implementation artefacts but does not preserve the model relationships between them.

This is a major source of consulting cost in SAP transformation and AMS.

It is not the cost of making the final Decision.

It is the cost of discovering:

- what the field means;
- who owns it;
- where it originates;
- how it is transformed;
- which interfaces carry it;
- which Rules depend on it;
- which datasets must be retested;
- which previous Evidence becomes stale.

Martenweave can reduce this cost by maintaining one canonical registry for data objects, mappings, Rules, Decisions, Evidence and interface dependencies.

It does not replace SAP Integration Suite, middleware monitoring, SAP MDG, test management or expert architecture.

SAP Integration Suite is designed to connect applications, data, APIs, events and business partners across SAP and third-party environments, with central governance and monitoring of integration flows. Martenweave addresses a different but adjacent problem: preserving the governed meaning and dependency model of the data moving through those integrations.

The value comes from turning repeated discovery into reusable model infrastructure.

# Our running case

We use one change throughout the article.

The canonical business Attribute is:

```
Supplier Payment Terms
```

The current landscape contains:

```
Legacy Supplier System
Field: VENDOR.ZTERM

SAP MDG
Attribute: BP_COMPANY.PAYMENT_TERMS

SAP S/4HANA
Target: Supplier Company Code Payment Terms

Migration Mapping
VENDOR.ZTERM
→ PAYMENT_TERMS

Supplier Portal Interface
Field: paymentTermCode

Procurement Analytics
Field: supplier_payment_terms

Invoice Automation
Field: defaultPaymentTerms
```

The existing authority Decision is unclear.

Some teams believe Procurement owns the value.

Finance believes it should own company-code payment terms.

The Supplier portal allows a local buyer to propose a value.

MDG applies a validation Rule.

The migration uses the legacy ERP value.

The analytics interface receives the S/4HANA value.

The proposed change is:

> Finance becomes the authoritative owner. Portal values become proposals. MDG approval determines the governed value distributed to S/4HANA and consuming systems.

This change affects much more than one field.

It affects:

- source authority;
- data ownership;
- migration precedence;
- MDG workflow;
- validation Rules;
- interface transformations;
- existing Supplier records;
- testing;
- reporting;
- cutover Evidence;
- AMS procedures.

The expensive part is establishing the full scope.

# What a traditional impact assessment looks like

A competent consulting team will usually perform several investigations.

## Definition investigation

The team determines whether “payment terms” means:

- default purchasing terms;
- company-code payment terms;
- contractual terms;
- invoice-processing terms;
- a portal preference.

Similar field labels may represent different concepts.

## Source investigation

The team asks:

- Which system currently owns the value?
- Which system should own it after transformation?
- Can the portal override it?
- Does Finance maintain local exceptions?
- Which legacy value is trusted for migration?

## Mapping investigation

The team compares:

- migration workbook;
- transformation code;
- MDG mapping;
- integration mappings;
- analytics mappings.

## Interface investigation

The team identifies:

- inbound messages;
- outbound messages;
- APIs;
- files;
- events;
- reports;
- external consumers.

## Rule investigation

The team searches for:

- allowed value lists;
- country or company-code restrictions;
- defaulting Rules;
- approval requirements;
- reconciliation logic.

## Data investigation

The team calculates:

- affected Suppliers;
- conflicting values;
- missing values;
- local overrides;
- Suppliers using deprecated codes.

## Testing investigation

The team identifies scenarios for:

- migration;
- MDG;
- replication;
- purchasing;
- invoice processing;
- interface regression;
- reporting.

## Decision investigation

The team looks for:

- previous approvals;
- temporary Exceptions;
- ownership agreements;
- cutover Decisions;
- unresolved disputes.

Each activity is reasonable.

The inefficiency comes from repeating it for every significant change.

# Why an interface catalogue alone is not enough

Many organisations already maintain an interface inventory.

It may list:

- source system;
- target system;
- interface name;
- technology;
- owner;
- status.

That is useful operational information.

It may not answer:

> Which business Attributes move through this interface, and how does their meaning change?

For the Supplier portal interface, the catalogue may say:

```
Interface:
Supplier Portal to SAP MDG

Type:
REST API

Owner:
Integration Team
```

The impact assessment needs a deeper relationship:

```
Canonical Attribute:
Supplier Payment Terms

Source field:
paymentTermCode

Meaning:
Supplier-proposed commercial terms

Transformation:
Mapped to MDG proposal field

Authority:
Not authoritative until Finance approval

Consumer:
SAP MDG change request

Validation:
Company-code value list

Downstream use:
S/4HANA, invoice automation, analytics
```

This is not runtime integration monitoring.

It is model lineage.

SAP Integration Suite provides capabilities for application integration, API lifecycle management, event-driven architecture, B2B integration and central integration governance. Martenweave should complement such platforms by linking canonical business Attributes to the relevant messages, mappings and consumers.

# The canonical registry we need

The registry should represent the field as a connected model.

```
Canonical Attribute
Supplier Payment Terms
```

Connected to:

```
Business definition
Source authority
Business owner
Source fields
Target fields
Mappings
Interfaces
Validation Rules
Decisions
Exceptions
Datasets
Evidence
Tests
Findings
```

For our example:

```
ATTR-SUPPLIER-PAYMENT-TERMS
├── owned by ROLE-FINANCE-DATA-OWNER
├── sourced from SAP MDG approved value
├── mapped from VENDOR.ZTERM during migration
├── proposed by Supplier Portal paymentTermCode
├── consumed by SAP S/4HANA
├── consumed by Invoice Automation
├── consumed by Procurement Analytics
├── validated by RULE-PAYMENT-TERMS-COMPANY-CODE
├── governed by DEC-PAYMENT-TERMS-AUTHORITY
└── evidenced by RC6 reconciliation
```

A change-impact assessment can now begin with an existing graph.

Consultants still verify that the graph is current.

They do not start from an empty spreadsheet.

# What Martenweave already provides

Martenweave Core currently defines a backend-first model-governance pipeline that converts spreadsheets, datasets, tickets, validation reports, Decisions and SAP context into canonical model files, deterministic validation, gap reports, lineage, impact analysis and human-reviewed patch proposals. Its generic model includes domains, entities, Attributes, relationships, datasets, mappings, Rules, Evidence, Decisions and change proposals.

Canonical Markdown and YAML files remain authoritative. Generated SQLite and JSONL indexes are disposable. Objects are validated before indexing, and AI-generated changes are represented as proposals rather than silent mutations.

The current pipeline already includes dataset and model-gap detection, lineage and impact analysis.

The interface-specific objects, cost metrics and automation described in this article are a proposed extension of that foundation.

# How the future-state impact assessment works

When Finance proposes the authority change, the process becomes:

## 1. Register the proposed change

```
Change:
Finance becomes authority
for Supplier Payment Terms.
```

The proposal references:

- canonical Attribute;
- current Decision;
- proposed Decision;
- affected organisational scope;
- intended effective date.

## 2. Generate known impact

Martenweave identifies connected objects:

```
3 source fields
4 target fields
5 mappings
4 interfaces
2 validation Rules
3 datasets
6 Evidence objects
2 active Findings
1 temporary Exception
```

## 3. Detect missing knowledge

The validator identifies:

```
One interface field has no canonical Attribute reference.

One analytics mapping has no current owner.

One Evidence object predates the latest mapping.

One temporary Exception has no expiry.
```

## 4. Prepare AI-assisted analysis

AI drafts:

- plain-language impact summary;
- likely test scope;
- candidate owners;
- affected Evidence;
- proposed model changes;
- GitHub issue content.

## 5. Validate deterministically

Validators confirm:

- references exist;
- mappings are structurally consistent;
- active Decisions do not conflict;
- affected interfaces are declared;
- required Evidence is not silently reused.

## 6. Expert review

The experts decide:

- whether Finance authority applies globally;
- whether local company-code Exceptions remain;
- whether existing Supplier values should be remediated;
- when the new model becomes effective;
- which interfaces change immediately.

## 7. Record the approved change

The approved proposal becomes a reviewed change to the canonical model.

The Decision and Evidence remain attached.

The next impact assessment starts from the new state.

# Where AI reduces consulting effort

AI is useful when it performs preparation work over a controlled model.

For our payment-terms change, AI can:

- compare mapping definitions;
- identify likely field correspondences;
- summarise interface usage;
- draft an affected-system list;
- classify test scenarios;
- identify stale Evidence;
- propose updates to model objects;
- prepare issue and pull-request descriptions.

AI should not decide:

- that Finance has authority;
- that a local Exception is acceptable;
- that a missing interface can be ignored;
- that old Evidence remains valid;
- that production data should be changed.

The Martenweave boundary remains:

```
AI proposes.

Validators check structure.

Experts assess meaning.

Humans approve.

Git records.
```

This is consistent with the current core design, which explicitly requires human review and excludes autonomous mutation or direct SAP write-back.

# The baseline cost of one impact assessment

We now calculate an illustrative cost.

The numbers below are explicit assumptions, not market benchmarks.

Assume a blended external consulting rate of:

```
€1,200 per consultant-day
```

A traditional impact assessment for the payment-terms change may require:

| Activity | Consultant-days |
|---|---:|
| Clarify business definition and ownership | 6 |
| Locate and reconcile mappings | 10 |
| Identify interfaces and consumers | 12 |
| Analyse Rules and data population | 7 |
| Define regression-test scope | 6 |
| Reconstruct Decisions and Exceptions | 4 |
| Prepare impact report and approval pack | 5 |
| **Total** | **50** |

Cost per change:

```
50 days × €1,200
= €60,000
```

This does not include implementation.

It is the cost of understanding and approving the change.

# Why 50 days is not necessarily excessive

The effort is often spread across several people:

```
Data architect:
8 days

MDG consultant:
7 days

Migration consultant:
8 days

Integration architect:
10 days

Functional consultants:
8 days

Test lead:
4 days

Project and governance support:
5 days
```

No individual works for 50 calendar days.

The programme consumes 50 consultant-days.

The elapsed time may still be four to six weeks because:

- experts are shared;
- workshops depend on each other;
- documents are incomplete;
- external partners respond slowly;
- findings trigger another review cycle.

The business cost is therefore both:

- consulting effort;
- delayed Decision-making.

# Future-state cost with Martenweave

Assume the canonical model and interface registry are already operating.

The same assessment may require:

| Activity | Consultant-days |
|---|---:|
| Validate generated impact graph | 4 |
| Resolve business authority and Exceptions | 5 |
| Review data-impact analysis | 3 |
| Confirm interface and test scope | 3 |
| Review AI-generated proposals | 2 |
| Approve and publish change package | 1 |
| **Total** | **18** |

Cost:

```
18 days × €1,200
= €21,600
```

Consultant effort avoided:

```
50 − 18
= 32 days
```

Cost avoided per change:

```
32 × €1,200
= €38,400
```

This is a 64 percent reduction in analysis effort.

It is not a 64 percent reduction in expert judgement.

The remaining 18 days are concentrated on:

- authority;
- applicability;
- risk;
- remediation;
- approval.

# Annual portfolio model

Assume the programme processes 20 significant data and interface changes per year.

Examples include:

- source-authority changes;
- field deprecations;
- new country Rules;
- new integration consumers;
- interface replacements;
- MDG model changes;
- data-quality control changes;
- migration-wave extensions.

## Baseline

```
20 changes × 50 days
= 1,000 consultant-days
```

Annual cost:

```
1,000 × €1,200
= €1,200,000
```

## Future state

```
20 changes × 18 days
= 360 consultant-days
```

Annual consulting cost:

```
360 × €1,200
= €432,000
```

Gross annual consulting-cost avoidance:

```
€1,200,000 − €432,000
= €768,000
```

# First-year Martenweave investment

The first year includes implementation.

Assume:

## Canonical model and interface-registry setup

```
180 consultant-days × €1,200
= €216,000
```

This includes:

- defining interface-related object types;
- importing priority mappings;
- connecting canonical Attributes to interfaces;
- implementing validators;
- establishing CI and review;
- training the core team.

## Tooling, integration and support

```
€80,000
```

## Internal model stewardship

```
€50,000
```

## Total incremental first-year investment

```
€216,000
+ €80,000
+ €50,000
= €346,000
```

# First-year ROI

Gross benefit:

```
€768,000
```

Investment:

```
€346,000
```

Net benefit:

```
€768,000 − €346,000
= €422,000
```

ROI:

```
(€768,000 − €346,000)
÷ €346,000
= 122%
```

Illustrative first-year ROI:

```
122%
```

Estimated payback:

```
approximately 5.4 months
```

# Three-year TCO

## Baseline three-year cost

```
€1,200,000 × 3
= €3,600,000
```

## Martenweave year one

```
Impact-assessment consulting:
€432,000

Initial implementation:
€216,000

Tooling and support:
€80,000

Internal stewardship:
€50,000

Year-one TCO:
€778,000
```

## Martenweave years two and three

For each year:

```
Impact-assessment consulting:
€432,000

Tooling and support:
€80,000

Internal stewardship:
€50,000

Annual TCO:
€562,000
```

Three-year TCO:

```
€778,000
+ €562,000
+ €562,000
= €1,902,000
```

Three-year cost reduction:

```
€3,600,000 − €1,902,000
= €1,698,000
```

TCO reduction:

```
47.2%
```

The illustrative three-year ROI on implementation, tooling and stewardship investment is approximately:

```
280%
```

The improvement comes from reuse.

The organisation does not rebuild the dependency model for every change.

# Break-even threshold

Managers should calculate the minimum number of avoided days.

```
First-year investment:
€346,000

Consulting rate:
€1,200 per day
```

Break-even effort:

```
€346,000 ÷ €1,200
= approximately 289 consultant-days
```

The programme needs to avoid:

```
289 consultant-days
```

At 32 days avoided per significant change, break-even requires:

```
approximately 10 changes
```

This is a practical commercial threshold.

A programme expecting only two or three meaningful changes may not justify the investment on impact assessment alone.

A multi-wave SAP transformation with continuous MDG, interface and AMS changes is a much stronger fit.

# Conservative scenario

Assume only 15 significant changes per year.

Assume Martenweave reduces each assessment from 50 to 26 days rather than 18.

Days avoided:

```
15 × 24
= 360 consultant-days
```

Gross benefit:

```
360 × €1,200
= €432,000
```

Net first-year benefit:

```
€432,000 − €346,000
= €86,000
```

First-year ROI:

```
24.9%
```

The conservative scenario still produces a positive result.

It also shows how easily the business case can fail when:

- the registry covers too little scope;
- mappings are not maintained;
- interfaces remain undocumented;
- teams continue using unofficial workbooks;
- model stewardship is not funded.

The tool does not create ROI by installation.

The operating model creates ROI through reuse.

# Which changes produce the largest savings

Not every change needs a full impact assessment.

The strongest candidates are changes involving several domains.

## Source-authority changes

These affect:

- governance;
- migration;
- interfaces;
- data remediation;
- ownership.

## Canonical-code changes

Examples include:

- payment terms;
- country codes;
- account groups;
- product classifications;
- units;
- partner roles.

## Interface replacement

A legacy IDoc, file or API is replaced.

The programme must understand all canonical data dependencies.

## MDG model change

A new validation or workflow changes how a governed Attribute is created and distributed.

## Organisational restructuring

Company codes, Plants, purchasing organisations or warehouses are consolidated or split.

## Regulatory change

New mandatory fields or validation Rules affect several systems and reports.

These changes justify a reusable model far more than isolated technical fixes.

# The cost of false completeness

A weak interface registry can create false confidence.

Suppose the model knows that the payment-terms Attribute is used by four interfaces.

A fifth interface exists only in an old spreadsheet.

The generated impact report is incomplete.

This is why Martenweave must show coverage and uncertainty.

```
Known interfaces:
4

Unresolved candidate interfaces:
1

Interface coverage status:
Incomplete

Overall impact confidence:
Not sufficient for approval
```

The registry should not hide missing knowledge.

Unknown dependency is itself a Finding.

# Provenance matters for cost control

An impact report must explain how it was produced.

For our example:

```
Model commit:
abc789

Interface inventory:
2026-07-10

Migration mapping:
RC6

MDG model:
version 12

Production interface extract:
2026-07-12

Generated:
2026-07-15
```

W3C PROV provides a standard model for representing provenance across different systems and contexts. Its distinction between entities, activities and agents is useful here: the programme should be able to identify which artefacts were used, which analysis produced the result and which people or systems were responsible.

Without provenance, automation can generate an impact report quickly but cannot establish that the report is current.

Speed without traceability is not a saving.

It is a faster way to make an incomplete Decision.

# How the registry supports AMS

The strongest long-term value may appear after go-live.

An AMS ticket says:

> Supplier invoice uses unexpected payment terms.

Without the registry, support investigates:

- Supplier master;
- purchase order;
- invoice;
- MDG change history;
- portal interface;
- mapping;
- local defaults;
- recent changes.

With Martenweave, the investigation begins with:

```
Canonical Attribute:
Supplier Payment Terms

Current authority:
Finance through SAP MDG

Known consumers:
S/4HANA
Invoice Automation
Procurement Analytics

Recent change:
Authority model updated in July

Active Exception:
Company code FR01

Relevant interface:
Supplier Portal to MDG
```

The consultant still analyses the transaction.

The project history is no longer missing.

This reduces mean investigation effort and lowers dependence on the original implementation team.

# How the registry reduces onboarding cost

A new integration architect usually needs to learn:

- system landscape;
- interface naming;
- data ownership;
- transformation conventions;
- key exceptions;
- active migration scope.

Documentation is rarely organised around the exact question the architect has.

A canonical registry provides a queryable entry point.

The architect can start from:

- canonical Attribute;
- system;
- interface;
- domain;
- Decision;
- Finding.

The registry does not replace knowledge transfer.

It makes knowledge transfer evidence-based.

# The first product slice

The next focused capability should be:

## Data-to-Interface Impact Registry

### Goal

Connect canonical data objects to interface fields, mappings, consumers, Rules and Evidence so that change-impact analysis begins from a known dependency graph.

### Initial objects

- Interface;
- InterfaceField;
- InterfaceMapping;
- Producer;
- Consumer;
- CanonicalAttributeReference;
- Transformation;
- ContractVersion;
- Evidence;
- Decision;
- Finding.

### Initial validations

- interface field has no canonical reference;
- canonical Attribute has undocumented consumers;
- active mapping references a retired field;
- source and target semantics conflict;
- contract version is missing;
- owner is unresolved;
- current Evidence predates the Mapping;
- change proposal has no test scope;
- production interface is absent from the approved registry.

### Initial outputs

- affected interfaces;
- affected fields;
- transformation path;
- consumer list;
- stale Evidence;
- proposed test scope;
- ownership gaps;
- confidence and coverage;
- cost estimate for assessment.

# A conceptual interface-field object

```
---
id: IFIELD-SUPPLIER-PORTAL-PAYMENT-TERM
type: InterfaceField

interface:
  IF-SUPPLIER-PORTAL-TO-MDG

field:
  paymentTermCode

canonical_attribute:
  ATTR-SUPPLIER-PAYMENT-TERMS

semantic_role:
  proposed_value

producer:
  Supplier Portal

consumer:
  SAP MDG

transformation:
  MAP-PORTAL-PAYMENT-TERMS

authority:
  non_authoritative

validation:
  RULE-PAYMENT-TERMS-COMPANY-CODE

owner:
  ROLE-SUPPLIER-PORTAL-INTEGRATION-OWNER
---
```

This is a proposed product direction, not a claim about the exact current Martenweave schema.

# Proposed commands

A future CLI could support:

```
martenweave interfaces impact \
  ATTR-SUPPLIER-PAYMENT-TERMS \
  --repo ./model
```

```
martenweave interfaces coverage \
  --domain supplier \
  --repo ./model
```

```
martenweave interfaces compare-contracts \
  IF-SUPPLIER-PORTAL-TO-MDG \
  --from v3 \
  --to v4 \
  --repo ./model
```

```
martenweave interfaces stale-evidence \
  --change CHANGE-PAYMENT-TERMS-AUTHORITY \
  --repo ./model
```

```
martenweave interfaces propose-impact \
  CHANGE-PAYMENT-TERMS-AUTHORITY \
  --dry-run \
  --repo ./model
```

These commands describe a recommended capability.

They are not part of the currently documented CLI contract.

# What managers should require

## Require canonical Attribute references

Every important interface field should connect to a governed business concept.

## Require semantic role

The field may be:

- authoritative;
- proposed;
- derived;
- copied;
- informational.

The role should be explicit.

## Require producer and consumer lineage

Do not stop at system-to-system diagrams.

## Require transformation visibility

A value can change meaning inside an interface.

## Require versioned contracts

Current and retired interface structures must remain distinguishable.

## Require Evidence coverage

A registered interface without current Evidence is not proven current.

## Require confidence reporting

Unknown interfaces and undocumented fields must remain visible.

## Require expert approval

Generated impact does not approve the change.

## Require cost metrics

Measure whether the registry actually reduces assessment effort.

# The management questions

1. Which canonical Attributes does each interface carry?
2. Which system is the producer of each value?
3. Which system is the authority?
4. Where are transformations applied?
5. Which consumers depend on the current semantics?
6. Which interfaces are active, retired or transitional?
7. Which Rules and value lists apply?
8. Which contract versions are deployed?
9. Which Evidence proves the production state?
10. Which dependencies remain undocumented?
11. How long did the last comparable impact assessment take?
12. How many consultant-days were spent on discovery rather than Decision-making?

A programme that cannot answer these questions does not yet have a reliable basis for automated impact analysis.

# Final perspective

A field change becomes expensive when its dependencies exist only in people’s memories and disconnected project artefacts.

The practical test is:

> Can we identify every known producer, transformation, consumer, Rule, Decision and Evidence object for a canonical Attribute without starting a new investigation?

When the answer is yes, consulting effort moves from discovery to judgement.

When the answer is no, every change begins by rebuilding the enterprise model manually.

Martenweave is maintained by Dzmitryi Kharlanau.

We are building Martenweave so that data and interface knowledge becomes a reusable organisational asset:

```
Canonical Attributes preserve meaning.

Interface relationships preserve movement.

Mappings preserve transformation.

Lineage preserves dependency.

Evidence preserves trust.

AI prepares the analysis.

Validators expose contradictions.

Experts approve the change.

Git preserves the Decision.
```

The economic benefit is not that changes become free.

It is that the programme stops paying senior specialists to rediscover the same dependency graph for every change.

## Sources and notes

This article was reviewed on 15 July 2026.

The financial model is illustrative. It assumes 20 significant changes per year, 50 baseline consultant-days per change, 18 future-state consultant-days, a blended rate of €1,200 per day, 180 implementation days, €80,000 annual tooling and support, and €50,000 annual internal stewardship. These are modelling assumptions, not market benchmarks, vendor guarantees or financial advice.

Martenweave Core currently describes a backend-first model-governance pipeline that converts datasets, validation reports, Decisions and SAP context into canonical files, deterministic validation, dataset gaps, lineage, impact analysis and human-reviewed proposals.

Its current principles keep canonical files authoritative, generated indexes disposable, validation deterministic and AI changes proposal-first.

Its documented workflow includes gap detection, lineage, impact analysis and reviewed GitHub delivery.

SAP describes SAP Integration Suite as a platform for connecting SAP and third-party applications, data, APIs, events and partners, with central integration governance, monitoring and security. SAP also positions reusable integrations and AI-assisted development as methods for reducing manual effort and improving delivery productivity.

W3C PROV-O is a W3C Recommendation for representing and exchanging provenance information generated by different systems and under different contexts. The article uses this provenance principle to support traceable impact reports rather than requiring Martenweave to implement the full ontology.

The Interface, InterfaceField, ContractVersion and Data-to-Interface Impact Registry objects, proposed commands and financial results are product and operating-model directions. They should not be interpreted as guarantees of the exact current Martenweave schema, Workbench functionality, commercial pricing or achieved savings.

Martenweave is independent and is not affiliated with or endorsed by SAP or W3C.
