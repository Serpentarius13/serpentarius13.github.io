#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MARKER="obs-host-sync"
CRON_SH="${ROOT}/sync.sh"

if crontab -l >/dev/null 2>&1; then
  crontab -l | grep -v "${MARKER}" | grep -v "${CRON_SH}" | grep -v "sync-cron.sh" | crontab -
else
  crontab -r 2>/dev/null || true
fi

rm -f "${ROOT}/.sync.lock"
echo "removed cron job: ${CRON_SH}"
