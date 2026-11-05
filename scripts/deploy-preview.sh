#!/usr/bin/env bash
# Manual Pages publication. Preserve the root and unrelated files in gh-pages.
set -euo pipefail
cd "$(dirname "$0")/.."
npm run build
preview_tmp=$(mktemp -d)
preview_branch="preview-publish-$$"
cleanup() { git worktree remove --force "$preview_tmp/site" >/dev/null 2>&1 || true; rm -rf "$preview_tmp"; git branch -D "$preview_branch" >/dev/null 2>&1 || true; }
trap cleanup EXIT
git fetch origin
if git ls-remote --exit-code --heads origin gh-pages >/dev/null; then
  git fetch origin gh-pages
  git worktree add --detach "$preview_tmp/site" FETCH_HEAD
else
  git worktree add --detach "$preview_tmp/site" HEAD
  git -C "$preview_tmp/site" switch --orphan "$preview_branch"
  git -C "$preview_tmp/site" rm -rf --quiet --ignore-unmatch .
fi
rm -rf "$preview_tmp/site/preview"
mkdir -p "$preview_tmp/site/preview"
cp -R dist/. "$preview_tmp/site/preview/"
touch "$preview_tmp/site/.nojekyll"
git -C "$preview_tmp/site" add -A
if ! git -C "$preview_tmp/site" diff --cached --quiet; then
  git -C "$preview_tmp/site" commit -m "Publish development preview $(git rev-parse --short HEAD)"
  git -C "$preview_tmp/site" push origin HEAD:refs/heads/gh-pages
else
  echo 'Preview already matches the published branch.'
fi
