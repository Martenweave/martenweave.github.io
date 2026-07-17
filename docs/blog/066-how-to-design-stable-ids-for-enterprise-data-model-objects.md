# How to Design Stable IDs for Enterprise Data Model Objects

**Reviewed: 14 July 2026**

A Customer Group attribute begins its life in one migration workbook.

The team gives it an identifier:

```text
CRM_KNVV_KDGRP_WAVE2_DE
```

At the time, the identifier appears helpful.

It tells the reader:

- the source is CRM;
- the target is SAP table `KNVV`;
- the field is `KDGRP`;
- the object belongs to Wave 2;
- the country is Germany.

Then the model changes.

The source is no longer only CRM.

The attribute is confirmed as global rather than German.

The migration moves to Wave 3.

A new enrichment process is introduced.

The physical SAP endpoint stays the same for now, but a future implementation may replace it.

The identifier has not become technically invalid.

It has become historically wrong.

The team now has several unattractive options:

1. keep the misleading identifier;
2. rename it and update every reference;
3. create a new object and fragment the history;
4. add aliases until nobody knows which name is canonical.

This is not a naming problem.

It is an identity-design problem.

> A stable ID should identify the governed object, not describe every condition that happens to be true about it today.

Names, systems, teams, countries, projects, statuses and implementations change.

The identity of a governed concept should survive those changes for as long as the concept remains meaningfully the same.

Martenweave depends on this distinction because its canonical objects are connected through explicit references. Validation checks IDs, types, references and domain context before indexing. Generated search, lineage and impact capabilities rely on those references remaining coherent.

Stable IDs therefore support much more than convenient filenames.

They support:

- repository validation;
- model diffing;
- lineage;
- impact analysis;
- proposal review;
- evidence linkage;
- historical reconstruction;
- agent-safe retrieval.

A poor ID scheme makes every one of these capabilities less reliable.

---

# An ID is not a name

A name is meant to communicate meaning to humans.

An ID is meant to preserve identity across systems and time.

For example:

```yaml
id: ATTR-CUSTOMER-GROUP
name: Customer Group
```

The name may later change to:

```yaml
name: Sales Area Customer Group
aliases:
  - Customer Group
```

The stable ID can remain:

```text
ATTR-CUSTOMER-GROUP
```

This is appropriate when the organisation has clarified the label but still considers it the same governed concept.

The distinction is similar to the broader principle used for persistent web identifiers: implementation details, ownership, status and organisational classifications should not be embedded in identifiers when those properties may change. The W3C’s guidance on persistent URIs argues that stable identifiers require deliberately leaving changeable information out of the identifier and separating the abstract identity from its current file or implementation location.

For Martenweave:

```text
ID:
Who is this object?

Name:
What do people currently call it?

Definition:
What does it currently mean?

Path:
Where is its canonical file stored?

Endpoint:
Where is it physically implemented?
```

These fields are related.

They are not interchangeable.

---

# Identity is a governance decision

A model object does not receive its identity merely because a row exists in Excel or a field exists in SAP.

The team must decide what is being identified.

Consider:

```text
KNVV-KDGRP
```

Possible interpretations include:

- the physical SAP field;
- the business concept Customer Group;
- the mapping into the field;
- a value list used by the field;
- a validation rule governing it.

These should not share one ID.

A clearer model separates them:

```text
ATTR-CUSTOMER-GROUP
FEP-S4-KNVV-KDGRP
MAP-CRM-SEGMENT-TO-CUSTOMER-GROUP
RULE-CUSTOMER-GROUP-REQUIRED
```

The prefix expresses object type.

The remainder expresses a stable human-readable identity.

The IDs may appear verbose.

They prevent much more expensive ambiguity later.

---

# Stable does not mean immutable meaning

A stable ID may survive changes to the object.

That does not mean any change can be placed behind the same ID.

The key question is:

> Would a reasonable consumer still understand this as the same governed concept?

The answer is usually yes for:

- corrected spelling;
- improved description;
- additional examples;
- new ownership;
- changed physical endpoint;
- new evidence;
- additional source mapping;
- clarified applicability that does not redefine the concept.

The answer may be no for:

- one concept split into two;
- two concepts merged;
- central Attribute replaced by an organisational Attribute;
- classification replaced by workflow status;
- materially different business meaning reused under the same label.

Stable identity requires semantic judgement.

It is not achieved by refusing to create new IDs under any circumstances.

---

# The rename test

Suppose:

```text
Customer Classification Group
```

is renamed:

```text
Customer Group
```

Ask:

- Does it still describe the same property?
- Does it belong to the same Entity?
- Do existing values retain their meaning?
- Do existing Rules still apply?
- Can historical evidence be interpreted through the updated label?

When the answer is yes:

```text
Keep the ID.
Change the name.
Preserve the old label as an alias if useful.
```

Example:

```yaml
id: ATTR-CUSTOMER-GROUP
name: Customer Group
aliases:
  - Customer Classification Group
```

Creating `ATTR-CUSTOMER-GROUP-V2` would incorrectly suggest a new concept.

---

# The reimplementation test

Suppose a custom SAP field is replaced by a standard field.

Before:

```text
Business Attribute:
ATTR-SUPPLIER-REVIEW-STATUS

Physical endpoint:
FEP-S4-ZZ-REVIEW-STATUS
```

After:

```text
Business Attribute:
ATTR-SUPPLIER-REVIEW-STATUS

Physical endpoint:
FEP-S4-STANDARD-REVIEW-STATUS
```

The business Attribute remains the same.

The endpoint identity changes.

The Mapping and implementation references change.

This is one reason business IDs should not be derived directly from SAP table or field names.

If the Attribute ID were:

```text
ATTR-ZZ-REVIEW-STATUS
```

the implementation replacement would force a misleading rename or identity change.

A stable business ID preserves the distinction:

```text
Business meaning:
stable

Implementation:
replaceable
```

---

# The split test

Suppose the programme originally models:

```text
ATTR-SUPPLIER-CLASSIFICATION
```

with values:

```text
LOW
STANDARD
HIGH
UNDER_REVIEW
```

Later, the team concludes that `UNDER_REVIEW` is not a classification.

The old object is split into:

```text
ATTR-SUPPLIER-RISK
ATTR-SUPPLIER-REVIEW-STATUS
```

This is not a rename.

The original identity represented an overloaded concept that no longer exists in approved form.

A controlled transition may look like:

```yaml
id: ATTR-SUPPLIER-CLASSIFICATION
status: retired
replaced_by:
  - ATTR-SUPPLIER-RISK
  - ATTR-SUPPLIER-REVIEW-STATUS
```

The new objects receive new IDs.

Historical references to the old object remain interpretable.

This is stronger than reusing the old ID for one of the two new concepts and pretending the other part never existed.

---

# The merge test

Two objects may be discovered to represent the same governed concept.

Example:

```text
ATTR-CUSTOMER-SEGMENT
ATTR-CUSTOMER-CLASSIFICATION
```

The team decides that the distinction was accidental.

One object becomes canonical.

The other is retired with a redirect or replacement reference.

```yaml
id: ATTR-CUSTOMER-CLASSIFICATION
status: retired
replaced_by:
  - ATTR-CUSTOMER-SEGMENT
```

Do not simply delete the duplicate.

Evidence, mappings and decisions may still reference it.

The merge must preserve the old identity as historical context.

---

# Do not encode current organisational structure

An ID such as:

```text
ATTR-SALES-OPS-CUSTOMER-GROUP
```

may become misleading when ownership moves from Sales Operations to Master Data Governance.

Ownership should be represented separately:

```yaml
id: ATTR-CUSTOMER-GROUP
owners:
  semantic:
    - ROLE-GLOBAL-CUSTOMER-DATA-OWNER
```

The W3C’s long-standing identifier guidance warns against embedding ownership and organisational structure in persistent identifiers because maintainers and organisational boundaries change.

The same reasoning applies to model-object IDs.

Avoid embedding:

- employee names;
- team names;
- vendors;
- consulting companies;
- temporary programme workstreams.

---

# Do not encode lifecycle status

Weak IDs:

```text
DRAFT-ATTR-CUSTOMER-GROUP
APPROVED-ATTR-CUSTOMER-GROUP
OLD-ATTR-CUSTOMER-GROUP
```

Status changes.

Identity should not.

Use:

```yaml
id: ATTR-CUSTOMER-GROUP
status: approved
```

The object can later become:

```yaml
status: retired
```

without changing every inbound reference.

---

# Do not encode release or wave

Weak IDs:

```text
ATTR-CUSTOMER-GROUP-WAVE2
ATTR-CUSTOMER-GROUP-2026
ATTR-CUSTOMER-GROUP-V3
```

These IDs may be valid when the object is genuinely wave-specific or version-specific.

Most governed concepts are not.

Migration Wave 2 is an applicability or baseline fact:

```yaml
applicable_to:
  migration_waves:
    - WAVE-2
```

The same Attribute can later be used by Wave 3 without receiving a new identity.

---

# Do not encode country unless the concept is truly country-specific

A local Rule may deserve a country-qualified ID:

```text
RULE-PT-TAX-IDENTIFIER-EXEMPTION
```

A global Tax Identifier Attribute usually should not:

```text
ATTR-DE-TAX-IDENTIFIER
```

unless Germany genuinely uses a separate governed concept rather than a contextual form of the global one.

The distinction is:

```text
Country affects applicability:
keep a global object and model context.

Country defines a separate semantic object:
create a local identity.
```

Do not create country copies merely because separate teams maintain the data.

---

# Do not encode the source system in business IDs

Weak:

```text
ATTR-CRM-CUSTOMER-SEGMENT
```

This may be appropriate when the object explicitly represents the CRM concept.

It is inappropriate when the object represents enterprise Customer Segment and CRM is merely the current source.

Separate:

```text
ATTR-CUSTOMER-SEGMENT
FEP-CRM-CUSTOMER-SEGMENT
```

The first is business identity.

The second is implementation identity.

The Mapping connects them.

---

# Do not encode the repository path

A file may move from:

```text
model/customer/attributes/customer-group.md
```

to:

```text
model/domains/customer/sales-area/customer-group.md
```

The path changes to improve repository organisation.

The object identity should not change.

This is another application of separating abstract identity from physical location. Persistent identifiers work best when the storage or implementation path is allowed to change independently.

---

# Human-readable IDs versus opaque IDs

There are two broad approaches.

## Human-readable

```text
ATTR-CUSTOMER-GROUP
```

Advantages:

- understandable in logs and diffs;
- easier to review;
- useful in issue titles;
- convenient for CLI;
- recognisable in lineage.

Risks:

- naming collisions;
- temptation to encode too much meaning;
- renaming pressure;
- language dependence;
- manual allocation.

## Opaque

```text
6ba7b810-9dad-11d1-80b4-00c04fd430c8
```

Advantages:

- globally unique generation;
- no naming collision;
- works across distributed systems;
- identity does not depend on current terminology.

Risks:

- difficult for humans;
- noisy diffs;
- poor CLI usability;
- requires labels for every review;
- easy to copy incorrectly.

RFC 9562 defines UUIDs as 128-bit identifiers intended for uniqueness across space and time and notes that they can be generated without a central registration process, making them useful in distributed systems.

Neither approach is universally superior.

For a human-reviewed canonical registry, a hybrid is often strongest.

---

# Hybrid identity

A hybrid design can preserve both durable uniqueness and readable references.

Example:

```yaml
id: ATTR-CUSTOMER-GROUP
uid: 0190d5f1-7f3a-7ab0-9c7a-21d89337e412
name: Customer Group
```

The readable `id` is used in:

- canonical references;
- CLI commands;
- reports;
- Git diffs;
- issue discussions.

The opaque `uid` supports:

- cross-repository federation;
- imports;
- collision handling;
- external API identity;
- distributed object creation.

This adds complexity.

It should be introduced only when the product has a real federation or distributed-authoring requirement.

For a single controlled repository, one validated readable ID may be sufficient.

---

# UUID version choice should follow the use case

UUIDs are not all identical.

RFC 9562 defines several layouts, including random, name-based and time-ordered forms. It also discusses distributed generation, collision resistance, sorting and opacity.

For model registries:

## Random UUID

Useful when:

- IDs must be generated independently;
- ordering is irrelevant;
- no natural namespace exists.

## Name-based UUID

Useful when:

- the same source identity must deterministically produce the same UUID;
- imports need repeatable identity;
- a controlled namespace is available.

Risk:

- changes to the input name may create a new UUID even when the semantic object is unchanged.

## Time-ordered UUID

Useful when:

- database locality or creation-time ordering matters;
- many distributed objects are generated.

The UUID should not become a replacement for semantic identity decisions.

A globally unique identifier can still be attached to the wrong conceptual boundary.

---

# Sequential IDs

Another option is:

```text
ATTR-000184
```

Advantages:

- short;
- stable;
- easy to validate;
- avoids embedding mutable meaning.

Disadvantages:

- requires central allocation;
- offers no semantic clue;
- difficult across repositories;
- manual conversations need a lookup.

Sequential IDs work well in centrally governed registries.

They work less well when multiple teams create objects offline.

---

# Namespace design

A stable ID needs a controlled namespace.

A simple Martenweave pattern may be:

```text
<TYPE>-<SLUG>
```

Examples:

```text
DOMAIN-CUSTOMER
ENTITY-CUSTOMER-SALES-AREA
ATTR-CUSTOMER-GROUP
RULE-CUSTOMER-GROUP-REQUIRED
MAP-CRM-SEGMENT-TO-CUSTOMER-GROUP
FEP-S4-KNVV-KDGRP
DEC-CUSTOMER-GROUP-SOURCE
```

The namespace should define:

- allowed prefixes;
- allowed characters;
- case;
- maximum length;
- uniqueness scope;
- reuse policy;
- retirement policy.

Without these rules, naming conventions become informal and drift quickly.

---

# Prefixes should represent stable object type

Useful prefixes can improve readability:

```text
DOMAIN
ENTITY
ATTR
REL
RULE
MAP
FEP
DATASET
EVID
FIND
DEC
PATCH
```

A prefix is valuable when the object type itself is stable.

Do not encode transient state:

```text
DRAFT
APPROVED
OLD
```

Type prefixes also improve deterministic validation.

A validator can detect:

```text
ID prefix ATTR
but declared type Rule
```

This can be:

- error;
- warning;
- migration issue;

depending on policy.

---

# Keep the slug concise

An ID should not become a sentence.

Weak:

```text
ATTR-GLOBAL-CUSTOMER-SALES-AREA-COMMERCIAL-CLASSIFICATION-GROUP
```

Better:

```text
ATTR-CUSTOMER-GROUP
```

Context such as Entity and Domain belongs in structured properties:

```yaml
domain: DOMAIN-CUSTOMER
entity: ENTITY-CUSTOMER-SALES-AREA
```

The ID needs enough information to remain recognisable.

It should not duplicate the entire object definition.

---

# Should the Entity appear in the Attribute ID?

There is no universal answer.

Compare:

```text
ATTR-CUSTOMER-GROUP
```

with:

```text
ATTR-CUSTOMER-SALES-AREA-CUSTOMER-GROUP
```

The longer form reduces ambiguity.

The shorter form survives certain modelling changes more easily.

Use Entity-qualified IDs when:

- the same Attribute name exists on several Entities;
- collision risk is high;
- context is fundamental to semantic identity.

Avoid it when:

- the Entity assignment may still be under investigation;
- the name is already unique;
- it creates excessive duplication.

A stable ID policy should prefer predictable rules over case-by-case improvisation.

---

# Duplicate names are acceptable

Two objects can share a display name when their identity and context differ.

Example:

```text
ATTR-CUSTOMER-PAYMENT-TERMS
ATTR-SUPPLIER-PAYMENT-TERMS
```

Both may display:

```text
Payment Terms
```

The IDs distinguish the governed concepts.

This is better than forcing unnatural names merely to keep labels globally unique.

Names serve users.

IDs serve identity.

---

# ID reuse should be prohibited

Once an ID has been assigned, do not reuse it for a different concept—even after the original object is retired.

Suppose:

```text
ATTR-CUSTOMER-SEGMENT
```

is retired.

Three years later, another team wants the same ID for a new segmentation model.

Reusing it would make historical references ambiguous.

The new object should receive a new ID:

```text
ATTR-CUSTOMER-STRATEGIC-SEGMENT
```

or another appropriate identity.

Retired IDs remain reserved.

This is the same general principle that makes persistent identifiers useful: previous references must continue to resolve to the same historical identity rather than silently changing meaning.

---

# Tombstones

Deleting an object file can leave broken references and erase context.

A lightweight tombstone can preserve:

- ID;
- type;
- previous name;
- retirement status;
- replacement;
- last valid baseline.

Example:

```yaml
id: ATTR-CUSTOMER-CLASSIFICATION
type: Attribute
name: Customer Classification
status: retired
replaced_by:
  - ATTR-CUSTOMER-GROUP
retired_on: 2026-07-14
```

The full old definition remains available in Git history.

The tombstone supports current validation and historical trace.

---

# Alias handling

Aliases are useful for:

- previous labels;
- source-system terminology;
- common abbreviations;
- local names;
- spelling variants.

Example:

```yaml
id: ATTR-BUSINESS-PARTNER-TYPE
name: Business Partner Type
aliases:
  - BP Type
  - Partner Category
```

Aliases should improve search.

They should not become alternative canonical IDs unless external compatibility requires them.

If an old ID must remain resolvable, represent it explicitly:

```yaml
legacy_ids:
  - ATTR-BP-TYPE
```

The validator can prevent another object from claiming the legacy ID.

---

# External identifiers

An object may have IDs in other systems:

```yaml
external_ids:
  sap_mdg: Z_BP_TYPE
  data_catalog: glossary-1842
  jira_component: customer-data
```

These identifiers should not replace the Martenweave ID.

External IDs have their own:

- lifecycle;
- namespace;
- ownership;
- stability.

The registry should preserve mappings between identifier systems.

---

# Cross-repository identity

A single repository can enforce uniqueness locally.

Several repositories create new questions:

- Can both contain `ATTR-CUSTOMER-GROUP`?
- Are they the same object?
- Which repository owns the identity?
- How are forks represented?
- How does impact analysis cross boundaries?

Possible strategies include:

## Repository-scoped IDs

```text
ATTR-CUSTOMER-GROUP
```

Unique only inside one repository.

Cross-repository references add repository identity:

```text
martenweave://customer-core/ATTR-CUSTOMER-GROUP
```

## Organisation-wide IDs

One central namespace allocates:

```text
MW-ATTR-CUSTOMER-GROUP
```

## Opaque global UID plus readable local ID

```yaml
id: ATTR-CUSTOMER-GROUP
uid: 0190d5f1-7f3a-7ab0-9c7a-21d89337e412
```

Martenweave should not add a federation layer before the product needs it.

But ID design should avoid making later federation impossible.

---

# URI-style identifiers

A future registry may expose objects as persistent resources:

```text
martenweave://model/customer/ATTR-CUSTOMER-GROUP
```

or through an HTTP-based URI.

The same design principles apply:

- avoid file extensions;
- avoid current software mechanism;
- avoid mutable organisational ownership;
- avoid status in the URI;
- keep identity distinct from storage location.

W3C’s identifier guidance specifically recommends separating persistent identity from current filesystem, software and organisational implementation.

For the current Martenweave core, plain stable IDs are sufficient.

URI design becomes relevant when objects are referenced across registries, APIs or organisations.

---

# ID creation should be a controlled operation

A user or agent creating an object should not invent IDs casually.

The system can provide:

```text
martenweave create-id --type Attribute --name "Customer Group"
```

Conceptually, the command could:

1. normalise the proposed slug;
2. check active and retired IDs;
3. check legacy aliases;
4. suggest existing similar objects;
5. create a candidate ID;
6. record the reservation.

This reduces:

- duplicates;
- near-duplicates;
- inconsistent prefixes;
- accidental reuse.

The user still decides whether a new object is semantically justified.

---

# Detecting near-duplicate IDs

These may represent one object:

```text
ATTR-CUSTOMER-GROUP
ATTR-CUST-GROUP
ATTR-CUSTOMER-GRP
```

A deterministic validator cannot always prove duplication.

It can flag similarity:

```text
Possible duplicate object identity:

ATTR-CUSTOMER-GROUP
ATTR-CUST-GROUP

Similarity:
high

Action:
confirm separate semantics or merge.
```

AI can assist by comparing definitions, Entity, mappings and evidence.

It should not merge objects automatically.

---

# Imports should not dictate canonical identity

A spreadsheet may contain:

```text
Row ID:
17
```

A source catalogue may contain:

```text
Object ID:
CUST_GRP_004
```

A ticket may contain:

```text
Component:
KDGRP
```

These are source identifiers.

When imported into Martenweave, they can be preserved as external references.

They should not automatically become the canonical ID.

The canonical identity must reflect the governed object boundary.

---

# Deterministic import identity

Repeated imports need deduplication.

Suppose the same external mapping row is imported twice.

A stable import key can combine:

- source registry ID;
- source object ID;
- row identifier;
- source checksum.

This can produce a deterministic import identity separate from canonical model identity.

Example:

```text
External evidence ID:
EVID-IMPORT-ERP-B-ROW-1842
```

The evidence may support:

```text
ATTR-CUSTOMER-GROUP
```

Do not use the evidence row ID as the Attribute ID.

---

# IDs in PatchProposals

A proposal should reference existing objects by exact stable ID:

```yaml
operations:
  - action: update
    object_id: ATTR-CUSTOMER-GROUP
```

For a new object, the proposal should declare a candidate ID:

```yaml
operations:
  - action: add
    object_id: ATTR-SUPPLIER-REVIEW-STATUS
```

Validation should check:

- uniqueness;
- prefix/type match;
- reserved IDs;
- collision with retired or legacy IDs;
- similarity to existing objects;
- valid references.

Martenweave’s proposal-first workflow relies on validators checking changes before human approval and canonical publication.

---

# IDs and optimistic concurrency

A stable object ID identifies what should change.

It does not identify which revision the proposal was based on.

A proposal should also carry baseline information:

```yaml
object_id: ATTR-CUSTOMER-GROUP
base_commit: 4f7a9c2
```

or an object fingerprint.

This allows the system to detect:

- object still exists;
- meaning changed during review;
- proposal is based on stale state.

Identity and revision are separate concerns.

Do not put commit hashes into the object ID.

---

# IDs in lineage

Lineage edges should reference stable IDs:

```text
FEP-CRM-CUSTOMER-SEGMENT
→ MAP-CUSTOMER-GROUP-ENRICHMENT
→ ATTR-CUSTOMER-GROUP
→ FEP-S4-KNVV-KDGRP
```

If the file path changes, the lineage remains valid.

If the display name changes, the lineage remains valid.

If the physical endpoint changes, the Attribute lineage can be redirected without redefining the business object.

This is why stable IDs are foundational to Martenweave’s generated search and lineage layers. The current demo builds a SQLite index, search documents and lineage edges from canonical files and uses stable object references for trace and impact operations.

---

# IDs in model diffing

A semantic diff matches objects primarily by stable ID.

Without stable IDs, a file move may appear as:

```text
Deleted:
old/customer-group.md

Added:
new/sales-area/customer-group.md
```

With stable ID:

```text
Object:
ATTR-CUSTOMER-GROUP

Changes:
- file path moved;
- Entity changed;
- definition clarified.
```

The second result preserves history and makes the real semantic change visible.

---

# IDs in impact analysis

Impact analysis begins with an object identity:

```text
impact ATTR-CUSTOMER-GROUP
```

The system finds:

- Rules;
- Mappings;
- endpoints;
- Decisions;
- Evidence;
- proposals;
- datasets.

If the ID changes merely because the owner or path changed, the impact graph fragments.

A stable ID allows dependencies to accumulate over the life of the object.

---

# IDs and search

Human-readable IDs improve exact retrieval.

A search for:

```text
ATTR-CUSTOMER-GROUP
```

should return one canonical object.

Aliases and descriptive text support broader discovery:

```text
customer classification
sales area group
KDGRP
```

The search engine should distinguish:

- exact ID;
- legacy ID;
- alias;
- display name;
- related endpoint.

The exact ID should carry the highest identity confidence.

---

# Security and opacity

Readable IDs can reveal:

- domain names;
- internal systems;
- sensitive classifications;
- organisational terminology.

Opaque UUIDs reveal less direct meaning, though they are not automatically secret.

RFC 9562 explicitly discusses opacity and security considerations, including that some UUID forms may expose information or be predictable depending on generation method. UUIDs should not be treated as access-control tokens merely because they are difficult to guess.

For Martenweave:

- IDs are identifiers, not credentials;
- access control must be separate;
- sensitive names should be handled through repository and export policy;
- opacity should not be confused with security.

---

# Case sensitivity

An ID policy should decide whether these are equivalent:

```text
ATTR-CUSTOMER-GROUP
attr-customer-group
Attr-Customer-Group
```

Case-sensitive IDs create avoidable errors in manually maintained YAML.

A practical policy is:

```text
Canonical format:
uppercase ASCII with hyphens

Comparison:
strict after normalisation

References:
must use canonical form
```

Another valid policy is lowercase.

Consistency matters more than the chosen case.

---

# Allowed characters

A conservative ID alphabet simplifies:

- YAML;
- URLs;
- CLI;
- shell scripts;
- databases;
- filenames;
- APIs.

Example:

```text
A–Z
0–9
hyphen
```

Avoid where possible:

- spaces;
- slashes;
- backslashes;
- punctuation with escaping meaning;
- non-normalised Unicode;
- leading or trailing separators.

Display names can preserve natural language.

IDs should prioritise interoperability.

---

# Length

An ID should be long enough to avoid ambiguity and short enough for daily use.

Weak extremes:

```text
A17
```

and:

```text
ATTR-GLOBAL-ENTERPRISE-CUSTOMER-SALES-AREA-COMMERCIAL-CLASSIFICATION-GROUP-MASTER-DATA-VALUE
```

A good ID communicates object type and recognisable concept without reproducing the full hierarchy.

Structured metadata carries the rest.

---

# ID allocation policy

A minimal policy can state:

1. every canonical object has one primary ID;
2. the ID is unique within the namespace;
3. retired IDs are never reused;
4. object type is represented by a controlled prefix;
5. status, release, owner and file path are excluded;
6. source and target implementation details are excluded from business-object IDs;
7. external IDs are stored separately;
8. rename does not automatically change identity;
9. split and merge require explicit replacement relationships;
10. validators enforce syntax, uniqueness and reference integrity.

This is enough for a strong first implementation.

---

# A registry of reserved identities

The repository can derive an ID registry from:

- active objects;
- retired objects;
- legacy IDs;
- tombstones;
- pending proposals.

The validator should reject a new object that claims any reserved identity.

Example:

```text
ERROR MW-ID-REUSE

Proposed:
ATTR-CUSTOMER-CLASSIFICATION

Conflict:
ID was retired in baseline MODEL-CUSTOMER-2026-04.

Replacement:
ATTR-CUSTOMER-GROUP
```

This preserves historical interpretation.

---

# What should trigger a new ID?

Create a new ID when:

- a new concept is introduced;
- one concept is split;
- several concepts are merged into a new concept;
- semantic identity changes materially;
- historical consumers must distinguish old and new meaning;
- an implementation object represents a different physical endpoint;
- the object belongs to another identity namespace.

Do not create a new ID merely because:

- wording changes;
- ownership changes;
- a file moves;
- a new source is added;
- the project wave changes;
- the SAP release changes;
- a proposal revision changes;
- the object becomes approved or retired.

---

# A worked example: Customer Group

## Initial model

```yaml
id: ATTR-CUSTOMER-GROUP
name: Customer Group
entity: ENTITY-CUSTOMER
```

## New evidence

The value varies by Sales Area.

## Updated model

```yaml
id: ATTR-CUSTOMER-GROUP
name: Customer Group
entity: ENTITY-CUSTOMER-SALES-AREA
```

Should the ID stay?

This depends on the approved semantic interpretation.

### Keep the ID when:

The organisation confirms that the concept was always intended to mean Customer Group, but its granularity was previously modelled incorrectly.

The Entity change is breaking.

The identity remains.

### Create a new ID when:

The old object represented a genuinely central customer classification, while the new object represents a separate sales-area classification.

Then:

```text
ATTR-CENTRAL-CUSTOMER-SEGMENT
ATTR-CUSTOMER-GROUP
```

should coexist or be connected through replacement.

The validator cannot decide this from names alone.

A Decision must establish the identity treatment.

---

# A worked example: SAP field replacement

Before:

```text
FEP-S4-ZZ-CUSTOMER-GROUP
```

After:

```text
FEP-S4-KNVV-KDGRP
```

The physical endpoint changes.

The business Attribute remains:

```text
ATTR-CUSTOMER-GROUP
```

The old endpoint can be retired:

```yaml
id: FEP-S4-ZZ-CUSTOMER-GROUP
status: retired
replaced_by:
  - FEP-S4-KNVV-KDGRP
```

This preserves historical lineage for datasets and interfaces that used the custom field.

---

# A worked example: local tax identifier

The global model contains:

```text
ATTR-TAX-IDENTIFIER
```

Portugal requires:

- a local format Rule;
- an exemption structure;
- jurisdiction-specific evidence.

Do not automatically create:

```text
ATTR-PT-TAX-IDENTIFIER
```

when the governed property remains Tax Identifier.

Instead:

```text
ATTR-TAX-IDENTIFIER
RULE-PT-TAX-IDENTIFIER-FORMAT
ENTITY-TAX-EXEMPTION
```

A separate local Attribute is justified only when the meaning itself differs, not merely the Rule.

---

# A worked example: Business Partner roles

The model contains:

```text
ENTITY-BUSINESS-PARTNER
REL-BUSINESS-PARTNER-CUSTOMER-ROLE
REL-BUSINESS-PARTNER-SUPPLIER-ROLE
```

Do not encode role membership into the Entity ID:

```text
ENTITY-CUSTOMER-BUSINESS-PARTNER-WAVE3
```

The Business Partner identity remains stable.

Roles are represented through Relationships or contextual objects.

This supports one partner holding several roles.

---

# Machine-generated IDs need human-readable labels

When opaque IDs are used, every interface must display:

```text
Customer Group
ATTR-CUSTOMER-GROUP
0190d5f1-7f3a-7ab0-9c7a-21d89337e412
```

not only:

```text
0190d5f1-7f3a-7ab0-9c7a-21d89337e412
```

Reviewers need to understand what they are approving.

Opaque identity should never make governance opaque.

---

# AI and identifier creation

AI can assist with:

- suggesting a readable slug;
- detecting similar existing objects;
- recommending aliases;
- identifying likely split or merge cases;
- checking whether the proposed ID embeds mutable context.

AI should not decide autonomously that:

- a new concept exists;
- two objects are equivalent;
- an old ID may be reused;
- one object can replace another;
- a local concept should become global.

The safe flow is:

```text
AI suggests identity
→ deterministic checks run
→ similar objects are displayed
→ human confirms semantic boundary
→ ID is reserved
```

---

# Validation rules

A stable-ID validator should check:

## Syntax

Does the ID match the allowed pattern?

## Prefix

Does the prefix match the declared object type?

## Uniqueness

Is the ID unique across active objects?

## Historical reservation

Was the ID previously retired or used as a legacy ID?

## Reference integrity

Do all referenced IDs exist?

## Case normalisation

Are references using canonical case?

## Near duplicates

Are highly similar IDs present?

## Mutable components

Does the ID contain prohibited wave, status or version patterns?

## Replacement integrity

Do split, merge and retirement references resolve?

Some checks can block.

Others should warn.

---

# Do not over-police readability

A validator should not reject every unfamiliar abbreviation.

Organisations have legitimate terminology.

The policy should be strict about:

- uniqueness;
- stability;
- syntax;
- type;
- reuse.

It should be cautious about judging whether a slug is “good English.”

Naming quality can be reviewed.

Identity integrity must be deterministic.

---

# Migration from poor IDs

Most programmes already have inconsistent identifiers.

A safe migration should not rename everything at once without preserving compatibility.

Steps:

1. inventory current IDs;
2. detect duplicates and collisions;
3. identify stable semantic objects;
4. define canonical IDs;
5. preserve old IDs as aliases or legacy references;
6. update canonical references;
7. generate a redirect map;
8. validate no unresolved old references remain;
9. publish a migration report;
10. reserve all retired IDs.

Example redirect map:

```yaml
legacy_id_map:
  CUST_GRP:
    canonical: ATTR-CUSTOMER-GROUP

  CRM_KNVV_KDGRP_WAVE2_DE:
    canonical: ATTR-CUSTOMER-GROUP

  CUSTOMER_CLASSIFICATION:
    canonical: ATTR-CUSTOMER-GROUP
```

This mapping is transitional.

New objects should use the canonical namespace.

---

# Do not rename only for cosmetic consistency

Renaming hundreds of stable IDs to match a new preferred style can create:

- noisy diffs;
- broken external links;
- migration work;
- confused historical reports.

Aesthetics alone may not justify the disruption.

Use aliases, display-name improvements and validation for new IDs.

Rename existing IDs when:

- ambiguity creates real risk;
- collision exists;
- identity is genuinely misleading;
- external federation requires it.

Stable imperfection is sometimes safer than elegant churn.

---

# IDs in public and client repositories

Public examples can use readable IDs:

```text
ATTR-CUSTOMER-GROUP
```

Client repositories may require:

- namespace prefixes;
- anonymised terminology;
- opaque UUIDs;
- restricted aliases.

The design should support both without changing the conceptual model.

Example:

```yaml
id: ATTR-CUSTOMER-GROUP
uid: 0190d5f1-7f3a-7ab0-9c7a-21d89337e412
display_name: Customer Group
```

A client export could expose only the permitted fields.

---

# What Martenweave should implement

The current core already depends on stable IDs for validation, references, index generation, trace and impact.

A focused ID-governance slice could add:

## ID policy configuration

```yaml
id_policy:
  case: upper
  separator: "-"
  reserved_prefixes:
    - ATTR
    - ENTITY
    - RULE
    - MAP
    - FEP
```

## Reservation registry

Track active, retired and legacy IDs.

## ID creation command

Suggest and validate candidate IDs.

## Similarity warnings

Detect probable duplicates.

## Replacement metadata

Support split, merge, replacement and retirement.

## Legacy-ID resolution

Allow imports and searches to resolve former IDs.

## Federation-ready UID

Optional, not mandatory for ordinary repositories.

This remains a small backend-first capability.

It does not require a new platform or central identity service.

---

# Acceptance criteria

A stable-ID implementation should pass several tests.

## Rename

Changing the display name does not break references.

## Move

Changing the file path does not change identity.

## Endpoint replacement

Changing physical SAP implementation does not change the business Attribute ID.

## Retirement

Retired IDs cannot be reused.

## Split

The old object remains traceable to the new objects.

## Merge

All replaced objects remain historically resolvable.

## Import

External IDs are preserved without becoming canonical automatically.

## Diff

Moved and renamed objects are matched by stable ID.

## Impact

Dependencies remain connected across ordinary edits.

## Proposal

A new object cannot claim an existing or historically reserved ID.

---

# Common anti-patterns

## IDs copied from spreadsheet row numbers

They lose meaning when rows move.

## Business IDs copied from SAP fields

Identity becomes coupled to implementation.

## Country included everywhere

Local applicability becomes mistaken for separate semantics.

## Version suffix in every ID

History fragments into pseudo-objects.

## Status in the ID

Approval changes require identity changes.

## Owner or team in the ID

Organisational restructuring breaks identity.

## Reusing retired IDs

Historical evidence becomes ambiguous.

## Renaming IDs for cosmetic reasons

Large reference churn creates no business value.

## Deleting duplicate objects without redirect

Old evidence loses its target.

## UUID used as proof of correct modelling

Uniqueness does not prove semantic identity.

---

# Final perspective

Stable IDs are easy to underestimate because they look like naming conventions.

They are part of the model’s architecture.

A stable identifier should survive:

- file moves;
- display-name changes;
- ownership changes;
- migration waves;
- source-system replacement;
- SAP endpoint replacement;
- status changes;
- documentation restructuring.

It should change when the governed identity itself changes.

The practical separation is:

```text
ID:
stable identity

Name:
current human label

Definition:
current approved meaning

Path:
current storage location

Status:
current lifecycle

Endpoint:
current physical implementation

Baseline:
current approved repository state
```

When these facts are compressed into one identifier, the identifier ages badly.

When they are represented separately, the model can evolve without breaking every reference.

The practical test is:

> Can Customer Group move from one folder to another, gain a clearer label, acquire a new source, replace its SAP endpoint and enter a new migration wave while every Decision, Rule, Mapping and Evidence object continues to reference the same governed concept?

When the answer is yes, the ID is stable.

When the answer requires renaming the object after every project change, the ID describes the current implementation rather than identifying the model object.

## About the authors

Martenweave is maintained by Dzmitryi Kharlanau.

Martenweave is a backend-first model-governance and evidence layer for SAP migration, MDM, data governance and AMS teams.

Its canonical objects use explicit identities so that mappings, rules, evidence, decisions, lineage and proposals remain connected as files, systems and implementation details evolve.

Stable IDs are not an administrative detail.

They are what allows the model registry to preserve continuity.

## Sources and notes

This article was reviewed on 14 July 2026.

Martenweave Core currently treats canonical Markdown and YAML objects as the source of truth, validates their IDs, types, references and domain context before indexing, and generates disposable SQLite and JSONL projections from them.

The current public demo generates searchable and lineage projections and uses stable object references for trace and impact operations connecting business Attributes, physical SAP FieldEndpoints, Mappings, Decisions and Evidence.

The W3C’s guidance on persistent URIs argues that durable identifiers should avoid mutable information such as ownership, status, software mechanism, file extensions and organisational classification. The general principle is directly relevant to enterprise model-object IDs: identity should remain separate from current storage and implementation.

RFC 9562 defines UUIDs as 128-bit identifiers intended for uniqueness across space and time and describes random, name-based, time-ordered and other UUID layouts, along with considerations for distributed generation, collision resistance, opacity and database usage.

The ID formats, optional UID field and reservation mechanisms proposed in this article describe a recommended Martenweave product direction. They should not be treated as a guarantee of the exact current canonical schema unless separately published and versioned.

Martenweave is independent and is not affiliated with or endorsed by SAP, W3C or the IETF.
