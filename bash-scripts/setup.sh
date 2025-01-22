#!/bin/sh

if python3 --version &> /dev/null; then
    echo "Python3 is already installed."
else
    echo "Python3 is not installed. Installing Python3..."
    sudo apt-get update
    sudo apt-get install -y python3 python3-venv python3-pip
fi

path=$(find ~ -type d -name "VE-lint" 2>/dev/null)

if  docker --version &> /dev/null; then
    echo "Docker is already installed"
else
    echo "Installing Docker..."
    sh "$path/bash-scripts/docker.sh"
fi

if trivy --version &> /dev/null; then
    echo "Trivy is already installed."
else
    echo "Trivy is not installed. Installing Trivy..."
    sh "$path/bash-scripts/trivy.sh"
fi


if [ -z "$path" ]; then
    echo "Error: Directory 'VE-lint' not found in home directory."
    exit 1
fi

if [ ! -f "$path/bash-scripts/runner.sh" ]; then
    echo "Error: runner.sh not found in $path"
    exit 1
fi

chmod +x "$path/bash-scripts/runner.sh"
chmod +x "$path/bash-scripts/ui_runner.sh"

grep -qxF "alias samadhaan_cli='sh $path/bash-scripts/runner.sh'" ~/.bashrc || echo "alias VE-lint_cli='sh $path/bash-scripts/runner.sh'" >> ~/.bashrc
grep -qxF "alias samadhaan_ui='sh $path/bash-scripts/ui_runner.sh'" ~/.bashrc || echo "alias VE-lint_ui='sh $path/bash-scripts/ui_runner.sh'" >> ~/.bashrc

if [ -n "$BASH_VERSION" ]; then
    . ~/.bashrc
    # source ~/.bashrc
else
    echo "Alias added, but reload .bashrc manually: source ~/.bashrc"
fi

echo "Alias 'VE-lint_cli' added successfully."
echo "Alias 'VE-lint_ui' added successfully."

if [ ! -d "$path/inputs" ]; then
    echo "Inputs folder not found. Creating one..."
    mkdir "$path/inputs"
else
    echo "Inputs folder already exists."
fi

if [ ! -d "$path/outputs" ]; then
    echo "Outputs folder not found. Creating one..."
    mkdir "$path/outputs"
else
    echo "Outputs folder already exists."
fi

if [ ! -d "$path/venv" ]; then
    echo "Virtual environment not found. Creating one..."
    python3 -m venv "$path/venv"
else
    echo "Virtual environment already exists."
fi

. "$path/venv/bin/activate"

pip install -r "$path/requirements.txt"

echo "Dependencies installed successfully."
