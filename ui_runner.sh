#!/bin/sh

path=$(find ~ -type d -name "samadhaan" 2>/dev/null)
if [ -z "$path" ]; then
    echo "Error: Directory 'samadhaan' not found in home directory."
    exit 1
fi

cd "$path/samadhaan_ui_kit" || { echo "Error: Directory 'samadhaan_ui_kit' not found."; exit 1; }

pwd

npm install
npm run dev &

cd "$path/samadhaan_ui_kit/uifront" || { echo "Error: Directory 'samadhaan_ui_kit/uifront' not found."; exit 1; }

npm install
npm start