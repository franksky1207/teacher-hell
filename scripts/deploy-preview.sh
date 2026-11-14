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
# Each publication gets one self-contained module graph. A cached prior JS module
# cannot silently mix with freshly deployed notebook/CSS after a Pages release.
version=$(git rev-parse --short=12 HEAD)
mkdir -p "$preview_tmp/site/preview/assets/$version"
cp -R dist/src dist/web "$preview_tmp/site/preview/assets/$version/"
# The preview loads portrait PNGs and calibration from /preview/web/.
# Version only the module graph: do not publish a second 500 MiB student art tree.
student_art="$preview_tmp/site/preview/web/assets/characters/students"
versioned_art="$preview_tmp/site/preview/assets/$version/web/assets/characters/students"
test -f "$student_art/student-001/student-001-full-sheet-uniform-summer.png"
rm -rf "$versioned_art"
# Backgrounds are also loaded from the stable unversioned preview/web/assets directory.
# Do not duplicate the same 82 large background files in the versioned JS module tree.
rm -rf "$preview_tmp/site/preview/assets/$version/web/assets/backgrounds"
# Seven music files share one stable URL tree, never duplicate per JS revision.
rm -rf "$preview_tmp/site/preview/assets/$version/web/assets/music"
for music in school conflict serious home playful touching absurd; do
  test -s "$preview_tmp/site/preview/web/assets/music/$music.ogg"
done
test ! -e "$versioned_art"
sed "s#\\./web/#./assets/$version/web/#g" dist/index.html > "$preview_tmp/site/preview/index.html"
test -f "$preview_tmp/site/preview/assets/$version/web/game.js"
test -f "$preview_tmp/site/preview/assets/$version/web/notebook-view.js"
test -f "$preview_tmp/site/preview/assets/$version/src/runtime/views.js"
touch "$preview_tmp/site/.nojekyll"
git -C "$preview_tmp/site" add -A
if ! git -C "$preview_tmp/site" diff --cached --quiet; then
  git -C "$preview_tmp/site" commit -m "Publish development preview $(git rev-parse --short HEAD)"
  git -C "$preview_tmp/site" push origin HEAD:refs/heads/gh-pages
else
  echo 'Preview already matches the published branch.'
fi
