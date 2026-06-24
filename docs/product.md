# What Martenweave Is

Martenweave is a backend-first agentic data model registry.

It helps SAP migration, master data management, data governance, data quality, and AMS/support teams turn scattered model knowledge into a traceable, validated, AI-ready model layer.

## The Problem

Real model knowledge rarely lives in one clean system.

It usually leaks across:

- Excel mappings
- ticket threads
- validation reports
- datasets
- migration notes
- decisions
- SAP context
- project history
- tribal knowledge

That makes ownership unclear, validation disputes slow, handover painful, and AI assistance risky because the model truth is not structured.

## The Product Boundary

Martenweave is:

- a model truth layer
- a canonical file store
- a deterministic validator
- a generated index and reporting layer
- an AI-assisted proposal workflow
- a local-first CLI/backend library

Martenweave is not:

- a chatbot
- a generic data catalog
- a workflow engine
- a SaaS tenant platform
- a replacement for SAP MDG, SAP S/4HANA, Jira, Confluence, or enterprise catalogs
- an official SAP-certified or SAP-affiliated product

SAP migration is a strong starter scenario and domain context. It is not the whole product boundary.

## What Exists Now

The core repository is `martenweave-core` version `0.4.1`.

Current public capabilities include:

- `martenweave` and `modelops` CLI commands
- local API server
- MCP-ready backend
- canonical Markdown + YAML model files
- deterministic validation
- SQLite and JSONL generated indexes
- search and structured query
- trace and impact analysis
- dataset profiling and gap detection
- health, analysis, scorecard, ownership, audit, and usage reports
- export/import workflows for CSV and XLSX review
- PatchProposal to ChangeRequest lifecycle
- issue drafts and GitHub-ready change bundles
- example packs for Customer / Business Partner, Supplier / Vendor, and generic product models

## Core Principle

Integrations bring input.

Martenweave stores model truth.

Validators check consistency.

AI proposes changes.

Humans approve.

Reports create business value.

## Where To Go Next

- Product/core repo: https://github.com/metalhatscats/martenweave-core
- Website repo: https://github.com/Martenweave/martenweave.github.io
- Docs index: https://martenweave.github.io/docs.html
- Quickstart: https://martenweave.github.io/docs/quickstart.html
- Examples: https://martenweave.github.io/docs/examples.html
