#!/bin/bash

set -e # Exit on any errors

# Get the directory of this script:
# https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd "$DIR"

# Only do git dirty checks if this script was called with the "check" argument.
if [ "$1" = "check" ]; then
  echo "Checking to see if git is dirty before generating..."
  npx git-dirty
fi

npm run generate

if [ "$1" = "check" ]; then
  echo "Checking to see if any files have changed..."
  npx git-dirty
fi

echo "All generation scripts were successful."
