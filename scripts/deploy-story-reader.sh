#!/usr/bin/env bash
# Publish only /stories/; retry against the latest Pages tree without force pushes.
set -euo pipefail
cd "$(dirname "$0")/.."
source_branch=${1:-content/events-production-v1}
release=$(git rev-parse HEAD)
STORY_SOURCE_BRANCH="$source_branch" STORY_SOURCE_COMMIT="$release" node scripts/export-story-reader.mjs
publish_tmp=$(mktemp -d)
cleanup() { git worktree remove --force "$publish_tmp/site" >/dev/null 2>&1 || true; rm -rf "$publish_tmp"; }
trap cleanup EXIT
mkdir -p "$publish_tmp/payload/data"
cp story-reader/index.html story-reader/reader.js story-reader/reader-core.js story-reader/reader.css "$publish_tmp/payload/"
mkdir -p "$publish_tmp/payload/shared/$release/"{runtime,world}
cp src/runtime/story-text.js "$publish_tmp/payload/shared/$release/runtime/"
cp src/world/school-subjects.js "$publish_tmp/payload/shared/$release/world/"
sed -i "s|../src/runtime/story-text.js|./shared/$release/runtime/story-text.js|" "$publish_tmp/payload/reader-core.js"
cp -R work/story-reader-data/. "$publish_tmp/payload/data/"
node -e 'const fs=require("fs");const {sourceCommit,sourceBranch,count}=JSON.parse(fs.readFileSync("work/story-reader-data/index.json"));console.log(JSON.stringify({sourceCommit,sourceBranch,count}))' > "$publish_tmp/payload/release.json"
# Cache-bust the module graph and CSS together on each source release.
sed -i "s|./reader.css|./reader.css?v=$release|;s|./reader.js|./reader.js?v=$release|" "$publish_tmp/payload/index.html"
sed -i "s|./reader-core.js|./reader-core.js?v=$release|" "$publish_tmp/payload/reader.js"
for attempt in 1 2 3 4 5; do
  git fetch origin gh-pages
  if test -d "$publish_tmp/site"; then
    git -C "$publish_tmp/site" reset --hard "$(git rev-parse FETCH_HEAD)"
  else
    git worktree add --detach "$publish_tmp/site" FETCH_HEAD
  fi
  before=$(git -C "$publish_tmp/site" rev-parse HEAD)
  rm -rf "$publish_tmp/site/stories"
  cp -R "$publish_tmp/payload" "$publish_tmp/site/stories"
  git -C "$publish_tmp/site" add -A -- stories
  if git -C "$publish_tmp/site" diff --cached --quiet; then
    echo 'Stories already match the published release.'; exit 0
  fi
  test -z "$(git -C "$publish_tmp/site" diff --cached --name-only -- . ':!stories')"
  git -C "$publish_tmp/site" commit -m "Publish story reader $release"
  # Verify every unrelated path is byte-for-byte unchanged.
  test -z "$(git -C "$publish_tmp/site" diff --name-only "$before" HEAD -- . ':!stories')"
  if git -C "$publish_tmp/site" push origin HEAD:refs/heads/gh-pages; then exit 0; fi
  echo "Pages moved during publication; rebuilding commit on latest tree ($attempt/5)."
done
echo 'Pages publication failed after five attempts.' >&2
exit 1
