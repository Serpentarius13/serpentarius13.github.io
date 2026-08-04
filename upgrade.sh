#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CHART="${ROOT}/chart"
RELEASE="${RELEASE:-obs-host}"
NAMESPACE="${NAMESPACE:-obs-host}"

cp "${ROOT}/contents.html" "${CHART}/contents.html"

helm upgrade --install "${RELEASE}" "${CHART}" \
  --namespace "${NAMESPACE}" \
  --create-namespace \
  --wait \
  --timeout 2m
