#!/bin/bash

# ==========================================
# Deployment Variables
# ==========================================
# [USER] Change these to your actual server details
SERVER_USER="yemin"
SERVER_IP="116.62.243.62"
SERVER_PORT="10000"           # Port to expose on the host server

# Docker details
APP_NAME="architect"
IMAGE_NAME="architect:latest"

# ==========================================
# Internal Helper Functions
# ==========================================
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

# ==========================================
# 0. Environment Checks
# ==========================================
if [[ -n "$WSL_DISTRO_NAME" ]]; then
    log_info "Detected WSL environment ($WSL_DISTRO_NAME)."
fi

if ! command -v docker &> /dev/null; then
    log_error "Docker is not installed or not in PATH."
fi

# ==========================================
# Deployment Process
# ==========================================

log_info "🚀 Starting deployment to $SERVER_IP..."

# 1. Build Docker image locally
log_info "📦 Building Docker image..."
docker build -t $IMAGE_NAME . || log_error "Docker build failed."

# 2. Stream image to remote Docker engine
# Note: This uses a pipe to stream the data directly into 'docker load' 
# on the server. No intermediate .tar file is created on the remote disk.
log_info "📤 Streaming image to server... (This may take a minute)"
docker save $IMAGE_NAME | ssh $SERVER_USER@$SERVER_IP "docker load" || log_error "Image transfer failed."

# 3. Stop and Remove old container
log_info "🛑 Cleaning up old container..."
ssh $SERVER_USER@$SERVER_IP "docker stop $APP_NAME || true && docker rm $APP_NAME || true"

# 4. Run new container
log_info "🏃 Running new container on port $SERVER_PORT..."
ssh $SERVER_USER@$SERVER_IP "docker run -d --name $APP_NAME -p $SERVER_PORT:80 --restart always $IMAGE_NAME" || log_error "Failed to run container on server."

log_info "✅ Deployment completed successfully!"
log_info "🌐 Access your app at: http://$SERVER_IP:$SERVER_PORT"
