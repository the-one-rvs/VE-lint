#!/bin/sh

# Function to uninstall Docker Desktop and all Docker-related components
uninstall_all_docker() {
    echo "Uninstalling all Docker-related components..."

    # Stop Docker services if running
    sudo systemctl stop docker.service
    sudo systemctl stop docker.socket

    # Remove Docker Desktop
    sudo apt-get remove docker-desktop -y

    # Uninstall Docker Engine, CLI, and Containerd
    sudo apt-get purge -y docker-ce docker-ce-cli containerd.io

    # Remove Docker dependencies
    sudo apt-get purge -y docker docker-engine docker.io

    # Remove Docker configuration and state files
    sudo rm -rf /var/lib/docker
    sudo rm -rf /etc/docker
    sudo rm /etc/apparmor.d/docker
    sudo groupdel docker
    sudo rm -rf /var/run/docker.sock

    # Remove Docker Desktop configuration files
    rm -rf ~/.docker

    # Remove Docker APT repository
    sudo rm /etc/apt/sources.list.d/docker.list
    sudo rm /usr/share/keyrings/docker-archive-keyring.gpg

    # Clean up package cache
    sudo apt-get autoremove -y
    sudo apt-get autoclean

    echo "All Docker-related components uninstalled."
}

# Function to install Docker Engine
install_docker_engine() {
    echo "Installing Docker Engine..."

    # Update package index and upgrade existing packages
    sudo apt update && sudo apt upgrade -y

    # Install required packages
    sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

    # Add Docker’s official GPG key
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

    # Set up the Docker repository
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    # Update package index
    sudo apt update

    # Install Docker Engine
    sudo apt install -y docker-ce docker-ce-cli containerd.io

    # Start and enable Docker
    sudo systemctl start docker
    sudo systemctl enable docker

    # Add current user to the Docker group
    sudo usermod -aG docker $USER

    echo "Docker Engine installed."
}

# Function to verify Docker installation
verify_docker_installation() {
    echo "Verifying Docker installation..."

    # Check if Docker is running
    if sudo systemctl status docker | grep -q "active (running)"; then
        echo "Docker is running."
    else
        echo "Docker is not running. Starting Docker..."
        sudo systemctl start docker
    fi

    # Verify Docker installation
    docker run hello-world
}

# Main script
main() {
    uninstall_all_docker
    install_docker_engine
    verify_docker_installation

    # Notify the user to log out and back in for group changes to take effect
    echo "Docker installation complete. Please log out and back in to apply group changes."
}

# Run the main script
main