#!/usr/bin/env python3
"""Reject public-site version copy that drifts from the Core package metadata."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


def version_from_pyproject(path: Path) -> str:
    match = re.search(r'^version\s*=\s*"([^"]+)"', path.read_text(encoding="utf-8"), re.M)
    if match is None:
        raise ValueError(f"Could not read project version from {path}")
    return match.group(1)


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: check-core-version-copy.py /path/to/martenweave-core/pyproject.toml")
        return 2

    core_version = version_from_pyproject(Path(sys.argv[1]))
    root = Path(__file__).resolve().parents[1]
    ai = json.loads((root / "ai.json").read_text(encoding="utf-8"))
    candidates = {
        "ai.json packageVersion": ai.get("packageVersion"),
        "ai.json corePackage.version": ai.get("corePackage", {}).get("version"),
    }
    for file_name in ("llms.txt", "llms-full.txt", "ai.txt"):
        text = (root / file_name).read_text(encoding="utf-8")
        if core_version not in text:
            candidates[file_name] = "missing"

    drift = [f"{name}={value!r}" for name, value in candidates.items() if value != core_version]
    if drift:
        print(f"Core version is {core_version}; public copy drift: {', '.join(drift)}")
        return 1

    print(f"Core version copy is synchronized at {core_version}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
