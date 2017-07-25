#!/bin/bash
set -e
rm -rf build
webpack -p
# updates cachebust param to random number
sed -i "s/cachebust=.*\"/cachebust=$RANDOM\"/g" index.html
git add . --all
git commit
git push
