# Open Source and Contribution Path

Martenweave Core is open-source software licensed under
[Apache License 2.0](https://github.com/metalhatscats/martenweave-core/blob/main/LICENSE).

## License

The Core may be used, modified, embedded, and distributed, including for internal and commercial
purposes, subject to Apache License 2.0. The license includes an explicit patent grant from
contributors. The repository `LICENSE` and `NOTICE` files are authoritative.

## Optional Commercial Services

Organizations may deploy and extend the Core themselves. They may also engage the Martenweave team
for implementation, SAP/MDM domain modelling, validation packs, integrations, assessments,
support, training, design-partner engagements, and future hosted services. These services are
optional and do not limit the open-source license.

## Contributions

Unless explicitly stated otherwise, contributions intentionally submitted for inclusion are
provided under Apache License 2.0, consistent with Section 5. Contributors must have the right to
submit their work and must preserve required third-party licensing and attribution information. No
contributor license agreement is currently required.

## Historical Note

Version 0.4.1 was originally distributed under MIT. The current supported release and all active
development are licensed under Apache License 2.0.

## Where to Contribute

- Core/product issues: https://github.com/metalhatscats/martenweave-core
- Website/docs issues: https://github.com/Martenweave/martenweave.github.io

See the Core repository [contribution guide](https://github.com/metalhatscats/martenweave-core/blob/main/CONTRIBUTING.md) for validation and pull-request expectations.

## Useful Contributions

- reproducible CLI bugs;
- failing validation cases with synthetic canonical files;
- example-model and domain-pack improvements without private customer data;
- documentation corrections for commands that exist today;
- tests that protect canonical/generated boundaries;
- focused issue drafts with a goal, scope, acceptance criteria, and validation command.

## Contribution Guardrails

Do not contribute real client data, credentials, generated indexes unless requested, unsupported
customer or SAP-relationship claims, UI rewrites that bypass Core, or AI flows that mutate
canonical files without a PatchProposal and human approval.

## Development Checks

```bash
.venv/bin/python -m ruff check .
.venv/bin/python -m ruff format --check .
.venv/bin/python -m pytest
bash scripts/release_smoke.sh
```
