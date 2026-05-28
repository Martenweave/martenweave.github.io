# AI Governance

Martenweave has a simple AI rule:

```text
AI proposes.
Validators verify.
Humans approve.
```

This is not a slogan. It is the safety model.

## What AI May Do

AI may help with:

- extracting evidence from notes, tickets, validation reports, and workshop summaries
- drafting PatchProposals
- drafting GitHub issues
- suggesting affected model objects
- explaining impact from structured model context
- preparing validation or review checklists
- summarizing handover context for AMS/support teams

## What AI Must Not Do

AI must not:

- silently mutate canonical model files
- bypass deterministic validation
- mark a finding as validated without evidence
- invent SAP technical facts
- delete approved objects without explicit review
- treat raw datasets as model truth
- send raw client datasets to an external provider by default

## Why This Matters

AI is useful at turning messy project evidence into draft structure.

AI is not a reliable source of model truth by itself.

Martenweave keeps AI inside a controlled change workflow:

1. Start from bounded context or evidence.
2. Create a structured PatchProposal.
3. Validate IDs, types, references, and domain rules.
4. Review impact and diff.
5. Approve or reject as a human action.
6. Apply only approved changes.
7. Record the change trail.

## Good AI Outputs

Good outputs are reviewable:

- “This note appears to affect `ATTR-CUST-SALES-CUSTOMER-GROUP`.”
- “Create a draft issue for missing mapping evidence.”
- “Propose a value-list update, status `review`.”
- “Explain downstream impact for `FEP-S4-KNVV-KDGRP`.”

Bad outputs pretend to be truth:

- “I updated the model.”
- “This SAP mapping is correct” without evidence.
- “Delete these canonical files.”
- “Validation passed” without deterministic validation.

Martenweave is built for the first category.
