# What Martenweave Is

Martenweave is an open-source, backend-first model governance and evidence layer for SAP migration, MDM, data governance, and AMS.

It turns scattered model knowledge from spreadsheets, datasets, tickets, validation reports, decisions, and SAP context into structured model objects that can be validated, searched, traced, reviewed, and exported.

## The Problem

Real model knowledge rarely lives in one clean system.

It usually lives across:

- Excel mappings
- dataset extracts
- ticket threads
- validation reports
- migration notes
- decisions
- SAP context
- project history

That makes ownership unclear, validation disputes slow, handover painful, and AI assistance risky because there is no trusted structured context.

## The Product Idea

Martenweave gives teams a practical model control layer.

It helps them:

- capture model knowledge as structured objects
- connect fields, attributes, rules, owners, issues, and decisions
- validate references before indexing
- detect dataset and model gaps
- trace impact across model relationships
- export reports and context
- let AI propose changes only through reviewable PatchProposals

SAP migration and master data are proof domains and starter scenarios. They are not the whole product boundary.

## Who It Is For

Martenweave is for:

- SAP migration teams
- MDM teams
- data governance teams
- data quality teams
- AMS and support teams
- data architects
- data stewards
- consultants working with Customer, Supplier, Product, Material, or similar models

## What Exists Now

The current open-source core is `martenweave-core` version `0.5.0`, licensed under Apache License 2.0.

Available now:

- `martenweave` CLI and compatibility `modelops` CLI
- local API server
- MCP-ready backend
- canonical Markdown and YAML model files
- deterministic validation
- generated SQLite and JSONL indexes
- search and structured query
- trace and impact analysis
- dataset profiling and gap detection
- health, analysis, scorecard, ownership, audit, and usage reports
- CSV and XLSX model review import/export flows
- PatchProposal to ChangeRequest lifecycle
- issue drafts and GitHub-ready change bundles
- example packs for Customer / Business Partner, Supplier / Vendor, simple product, and generic product models

## What It Is Not

Martenweave is not:

- a chatbot
- a SaaS tenant platform
- a full enterprise MDM replacement
- a workflow engine
- a generic data catalog
- a product certified by SAP or affiliated with SAP
- a replacement for SAP MDG, SAP S/4HANA, Jira, Confluence, or enterprise catalog tools

It can work beside those tools by giving teams a validated model registry that starts locally and can grow into integrations.

## Core Principle

Integrations bring input.

Martenweave stores model knowledge.

Validators check consistency.

AI proposes changes.

Humans approve.

Reports create business value.

## Where To Go Next

- Product/core repo: https://github.com/metalhatscats/martenweave-core
- Website repo: https://github.com/Martenweave/martenweave.github.io
- Quickstart: https://martenweave.github.io/docs/quickstart.html
- How it works: https://martenweave.github.io/docs/how-it-works.html
- Import/export notes: https://martenweave.github.io/docs/import-export.html
