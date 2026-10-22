#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"
if [[ "$(git branch --show-current)" != "aliyun" ]]; then
  echo "Run this script on the aliyun branch." >&2
  exit 1
fi
if [[ -n "$(git status --porcelain)" ]]; then
  echo "Commit or stash local changes before updating." >&2
  exit 1
fi

git reset HEAD^
git clean -fd
git rebase main
pnpm install --frozen-lockfile
pnpm run build
git add -- build
if ! git diff --cached --quiet; then
  HUSKY=0 git commit -m "build"
fi
git push --force-with-lease origin aliyun
