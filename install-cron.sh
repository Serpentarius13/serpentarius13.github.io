#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MARKER="obs-host-sync"
CRON_SH="${ROOT}/sync.sh"

if [[ ! -x "${CRON_SH}" ]]; then
  chmod +x "${CRON_SH}"
fi

BLOCK="$(cat <<EOF
# ${MARKER} BEGIN
0 */4 * * * ${CRON_SH}
# ${MARKER} END
EOF
)"

(
  crontab -l 2>/dev/null | grep -v "${MARKER}" | grep -v "${CRON_SH}" || true
  printf '%s\n' "${BLOCK}"
) | crontab -

echo "installed cron job (every 4 hours): ${CRON_SH}"
