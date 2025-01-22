#!/bin/bash

path=$(find ~ -type d -name "VE-lint" 2>/dev/null)

sh "$path/bash-scripts/setup.sh"

source ~/.bashrc

echo "Setup completed successfully."