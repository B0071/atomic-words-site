#!/usr/bin/env bash
set -euo pipefail

MSG="${1:-Update site}"

git add -A
if ! git diff --cached --quiet; then
  git commit -m "$MSG"
  git push origin main
fi
npm run deploy
