# Martenweave Examples

The core repository includes examples that can be validated and indexed locally. They are small enough to inspect, but realistic enough to demonstrate the registry workflow.

Core repository:

https://github.com/metalhatscats/martenweave-core/tree/main/examples

## Customer / Business Partner

Path:

```text
examples/customer_bp_model
```

Best for:

- SAP Business Partner to Customer migration context
- customer sales area and customer group examples
- SAP table/field context such as `KNVV-KDGRP`
- decisions, issues, mappings, value lists, validation rules, and impact analysis

Run:

```bash
.venv/bin/martenweave validate --repo examples/customer_bp_model
.venv/bin/martenweave build-index --repo examples/customer_bp_model --jsonl
.venv/bin/martenweave impact FEP-S4-KNVV-KDGRP --repo examples/customer_bp_model
```

## Supplier / Vendor

Path:

```text
examples/supplier_vendor_model
```

Best for:

- SAP supplier/vendor master-data patterns
- LFA1, LFB1, and LFM1 field endpoint examples
- gap-to-proposal workflow using a synthetic vendor extract

Run:

```bash
.venv/bin/martenweave validate --repo examples/supplier_vendor_model
.venv/bin/martenweave build-index --repo examples/supplier_vendor_model --jsonl
.venv/bin/martenweave gaps \
  examples/supplier_vendor_model/data/samples/vendor_extract.csv \
  --repo examples/supplier_vendor_model \
  --check-model
```

## Simple Product

Path:

```text
examples/simple_product_model
```

Best for:

- first-time onboarding
- simple table mode
- small product CSV profiling
- understanding domains, entities, attributes, field endpoints, and value lists

Run:

```bash
.venv/bin/martenweave validate --repo examples/simple_product_model
.venv/bin/martenweave build-index --repo examples/simple_product_model --jsonl
.venv/bin/martenweave search "product" --repo examples/simple_product_model
```

## Generic Product

Path:

```text
examples/generic_product_model
```

Best for:

- non-SAP model registry use cases
- generic product data model examples
- system lineage and integration-flow examples

Run:

```bash
.venv/bin/martenweave validate --repo examples/generic_product_model
.venv/bin/martenweave build-index --repo examples/generic_product_model --jsonl
.venv/bin/martenweave scorecard --repo examples/generic_product_model
```

## What Examples Are Not

- They are not SAP-certified content.
- They are not customer implementations.
- They are not generated indexes to preserve by hand.
- They are not proof of a hosted SaaS workflow.

They are starter models for testing, learning, and contributing better scenarios.
