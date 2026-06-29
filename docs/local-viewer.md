# Local generated read-only viewer

Martenweave Core can generate a local static viewer from the SQLite index. It is for inspection,
demo, and review context. It is not a hosted UI and it is not an editing workflow.

## Build it locally

```bash
martenweave build-index --repo examples/customer_bp_model --jsonl
martenweave docs-build --repo examples/customer_bp_model --site /tmp/martenweave-viewer
```

Open `/tmp/martenweave-viewer/index.html` directly, or serve it with a local HTTP server:

```bash
cd /tmp/martenweave-viewer
python3 -m http.server 8000
```

Then open `http://127.0.0.1:8000/`.

## What it generates

- `index.html` dashboard
- `objects.html` searchable object list
- `objects/<safe-object-id>.html` object detail pages
- `gaps.html`
- `decisions.html`
- `owners.html`
- `assets/viewer.css`
- `assets/viewer.js`
- `search-index.json`
- `viewer-manifest.json`

Search runs locally from embedded object rows, so the viewer also works when opened directly from
disk. The `search-index.json` file is generated as a reusable artifact.

## Boundaries

Canonical Markdown and YAML files remain authoritative. The SQLite index and viewer files are
derived artifacts that can be deleted and rebuilt.

The viewer does not include:

- hosted accounts or login
- editing or approval workflows
- SAP write-back
- direct dataset row browsing
- telemetry, external fonts, or CDN dependencies
- AI auto-mutation of canonical model files

If the index is stale, the viewer still builds but shows a warning and records freshness status in
`viewer-manifest.json`. If the index is missing, `docs-build` fails and tells you to run
`build-index` first.
