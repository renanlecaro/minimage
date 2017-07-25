#!/bin/bash
set -e
rm -rf build
webpack -p
git add . --all
git commit
git push
