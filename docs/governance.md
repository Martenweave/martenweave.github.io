# Governance Notes

Martenweave is built around practical data management principles.

It supports common governance work such as definitions, ownership, metadata, lineage, quality checks, stewardship, change control, and evidence-based decisions.

It is not an official DAMA product, certification, or endorsement.

## Definitions

Model objects make definitions explicit.

Examples:

- what an attribute means
- where a field appears physically
- which context changes field behavior
- which value list applies
- which decision explains a rule

## Ownership

Ownership needs to be referenceable, not only remembered.

Martenweave can link model objects to owners, stewards, issues, decisions, and review status so teams can see where accountability is missing.

## Metadata

Metadata becomes more useful when it is connected.

Martenweave connects:

- business meaning
- physical endpoints
- source systems
- mappings
- validation rules
- decisions
- evidence
- change proposals

## Lineage And Impact

Lineage and impact analysis help teams understand change consequences.

Useful questions include:

- What depends on this field?
- Which mappings use this attribute?
- Which decisions explain this rule?
- Which issues or owners are affected?
- Which reports should be reviewed before approval?

## Quality Checks

Validation is deterministic before it is AI-assisted.

Checks can include:

- ID and type validity
- missing required fields
- broken references
- reference type mismatches
- ownership and readiness gaps
- SAP context rules for starter SAP scenarios

## Stewardship

Stewardship work becomes easier when model facts are inspectable.

Martenweave helps stewards review:

- definitions
- owners
- source coverage
- validation gaps
- evidence
- change requests

## Change Control

AI and imports create PatchProposal objects.

Humans approve or reject changes.

Approved changes become ChangeRequests and then canonical updates.

This keeps the review trail visible and prevents silent mutation.

## Practical Governance Boundary

Martenweave is a lightweight model registry and validation layer.

It is not a full enterprise governance suite, enterprise MDM product, ticketing system, or official methodology certification. It can sit beside those tools by making model knowledge structured and validated earlier.
