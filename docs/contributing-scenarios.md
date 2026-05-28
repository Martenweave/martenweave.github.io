# Contributing Scenarios

Martenweave benefits most from real model-work pain, described clearly.

You do not need to write code to contribute useful input.

## Good Contributions

Open an issue when you can describe:

- a migration mapping problem
- a validation report that was hard to triage
- an ownership dispute
- a dataset/model gap that appeared too late
- a starter pack need
- a domain-specific validation rule
- an AMS handover problem
- an AI-assisted workflow that would be useful if controlled properly

## What To Include

Useful scenario reports include:

- domain area, for example Customer, Supplier, Product, Finance, or Material
- systems involved, if safe to share
- artifact types involved, for example Excel, ticket, dataset, report, decision log
- the model object that was unclear
- the business impact
- what evidence would have helped
- what a good output should look like

Sanitize client names, proprietary field lists, and sensitive records.

## Example Issue Shape

```text
Title: Validation report has no link back to customer group mapping rule

Context:
During mock load 2, KNVV-KDGRP failed validation for multiple customer sales areas.

Artifacts:
- mapping workbook
- validation report
- data steward comments
- target value list

Problem:
The report showed invalid values but did not connect the failure to the allowed value list,
mapping rule, owner, or prior decision.

What Martenweave should help with:
Link the validation finding to FieldEndpoint, Attribute, ValueList, ValueMapping, owner,
Decision, and Issue objects.
```

## What Not To Include

Do not include:

- client-confidential data
- credentials
- raw production records
- proprietary SAP screenshots
- fake customer testimonials
- claims of certification or partnership

Have a migration horror story? Open an issue. We collect those professionally.
