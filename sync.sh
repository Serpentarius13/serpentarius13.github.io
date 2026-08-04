#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE="${SOURCE:-/home/shared/archlinuxenjoyer/articles to read.md}"

python3 "${ROOT}/sync.py" "${SOURCE}"
git add . && git commit -m 'chore: push with new obs html contents' && git push