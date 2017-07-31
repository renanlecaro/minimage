#!/bin/bash

# fail and stop on any error
set -e

# Prettify code
prettier src/*.js --write
prettier src/*.less --write
prettier ./*.json --write
prettier ./*.js --write


# clean "build" folder used by weback-web-server (our build is in the root folder)
rm -rf build
# remove old builds. We create a useless bundle.exemple file to avoid having the rm fail 
touch bundle.exemple
rm ./bundle.*

# build actuall app in production mode (-p ) in "dist" folder
webpack -p

# updates index links to generated files to have a random number as params to force cache refesh
sed -i "s/cachebust=.*\"/cachebust=$RANDOM\"/g" index.html

# if everything went well, ask for a commit message and push
git add . --all
git commit
git push
