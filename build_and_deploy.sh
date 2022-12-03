#!/bin/bash
set -euxo pipefail

ORIGIN='https://github.com/madewithlinux/Freakylay.git'
BUILDDIR='/tmp/Freakylay-build'

rm -rf "$BUILDDIR"
mkdir -p "$BUILDDIR"

cd "$BUILDDIR"
git clone "$ORIGIN" build-clone
cd build-clone

(cd ts/ && npm install && npm run build)
git add -f Freakylay.min.js
git add -f Freakylay.min.js.map

git commit -m 'github pages deployment'
git checkout -b gh-pages
git push -f origin gh-pages
