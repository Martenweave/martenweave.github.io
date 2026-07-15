# Pilot Projects

A Martenweave pilot is a small, evidence-based way to test whether a controlled model layer improves a real delivery problem. It is not a promise to replace SAP MDG, a data catalogue, or the programme’s existing delivery tools.

## A useful pilot scope

Choose one bounded area where model uncertainty already creates rework:

- a Business Partner, Customer, Supplier, Material, or product model slice;
- a migration mapping workbook and representative extracts;
- a high-risk interface or local-country variation;
- a recurring AMS incident pattern; or
- a readiness decision that needs better evidence.

The scope should be small enough to validate in weeks, yet real enough to contain ambiguous definitions, source/target mappings, rules, ownership, and change history.

## What the pilot produces

1. A validated canonical model baseline.
2. A documented evidence set and deterministic validation result.
3. Dataset or model gaps with clear supporting evidence.
4. Trace and impact views for selected high-risk objects.
5. A reviewable backlog of proposals and decisions, not silent model edits.
6. A handover pack that distinguishes authoritative files from derived reports and indexes.

## What we need to start

- a named delivery question and accountable reviewer;
- representative, approved-to-share inputs (for example, a mapping extract and sample dataset);
- an agreed boundary for confidential information; and
- a short review cadence for findings and proposed changes.

## Beginning with a mapping workbook

If an approved source-to-target workbook is the starting point, the local Core can initialize an
empty pilot repository with `bootstrap-assessment`. It profiles the `.xlsx` evidence, creates a
deterministic draft `PatchProposal`, and writes a bootstrap report for review. It does not convert
inference into canonical truth automatically. Optional CSV/XLSX extracts can be profiled alongside
the workbook without becoming model truth.

## Safe by design

Pilot inputs remain inputs. Martenweave does not write back to SAP, and AI-assisted work produces proposals for review rather than direct canonical changes. The pilot can run entirely locally.

## Discuss a pilot

Read the [engagement process](/docs/engagement.html) or use the [contact page](/docs/contact.html) to describe the model slice, evidence available, and decision you need to make.
