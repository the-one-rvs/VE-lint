#!/bin/sh

path=$(find ~ -type d -name "VE-lint" 2>/dev/null)
if [ -z "$path" ]; then
    echo "Error: Directory 'VE-lint' not found in home directory."
    exit 1
fi

cd "$path/VE-lint_ui_kit" || { echo "Error: Directory 'VE-lint_ui_kit' not found."; exit 1; }

pwd

npm install
npm run dev &

cd "$path/VE-lint_ui_kit/uifront" || { echo "Error: Directory 'VE-lint_ui_kit/uifront' not found."; exit 1; }

npm install
npm start