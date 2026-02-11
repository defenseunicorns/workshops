# Copyright 2026 Defense Unicorns
# SPDX-License-Identifier: AGPL-3.0-or-later OR LicenseRef-Defense-Unicorns-Commercial

#!/bin/bash

# Check for correct number of arguments (should be 6)
if [ "$#" -ne 6 ]; then
  echo "Usage: $0 pattern1=replacement1 pattern2=replacement2 pattern3=replacement3 pattern4=replacement4 pattern5=replacement5 pattern6=replacement6"
  exit 1
fi

# Parse pattern=replacement pairs
declare -a patterns
declare -a replacements

for pair in "$@"; do
  if [[ "$pair" == *"="* ]]; then
    pattern="${pair%%=*}"
    replacement="${pair#*=}"
    patterns+=("$pattern")
    replacements+=("$replacement")
  else
    echo "Invalid format: '$pair'. Use pattern=replacement."
    exit 1
  fi
done

# Find and process files (excluding binary files)
find . -type f -exec grep -Iq . {} \; -print | while IFS= read -r file; do
  echo "Processing: $file"
  for ((i=0; i<6; i++)); do
    pattern="${patterns[i]}"
    replacement="${replacements[i]}"
    sed "s|${pattern}|${replacement}|g" "$file" >"$file.sed" && mv "${file}.sed" "$file"
  done
done

