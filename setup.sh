#!/bin/bash

path=$(find ~ -type d -name "VE-lint" 2>/dev/null)

sh "$path/setup-1.sh"

source ~/.bashrc

echo "Setup completed successfully."