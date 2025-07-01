# Docker Setup Guide

This guide explains how to run your React application using Docker.

## Prerequisites
- Docker installed on your system
- Docker Compose (usually comes with Docker)

## Quick Start

### Option 1: Using Docker Commands

#### Development Mode
```bash
# Build the development image
docker build -t midexam-dev .

# Run the development container
docker run -p 5173:5173 -v "${PWD}:/app" -v /app/node_modules midexam-dev
```

#### Production Mode
```bash
# Build the production image
docker build -f Dockerfile.prod -t midexam-prod .

# Run the production container
docker run -p 80:80 midexam-prod
```

### Option 2: Using Docker Compose (Recommended)

#### Development Mode
```bash
# Start development server
docker-compose --profile dev up

# Start development server in detached mode
docker-compose --profile dev up -d

# Stop development server
docker-compose --profile dev down
```

#### Production Mode
```bash
# Start production server
docker-compose --profile prod up

# Start production server in detached mode
docker-compose --profile prod up -d

# Stop production server
docker-compose --profile prod down
```

## Access Your Application

- **Development**: http://localhost:5173
- **Production**: http://localhost

## Docker Commands Reference

### Build Images
```bash
# Development image
docker build -t midexam-dev .

# Production image
docker build -f Dockerfile.prod -t midexam-prod .
```

### Run Containers
```bash
# Development with volume mounting (for hot reload)
docker run -p 5173:5173 -v "${PWD}:/app" -v /app/node_modules --name midexam-dev-container midexam-dev

# Production
docker run -p 80:80 --name midexam-prod-container midexam-prod
```

### Container Management
```bash
# List running containers
docker ps

# Stop a container
docker stop <container-name>

# Remove a container
docker rm <container-name>

# View container logs
docker logs <container-name>

# Execute commands in running container
docker exec -it <container-name> /bin/sh
```

### Image Management
```bash
# List images
docker images

# Remove an image
docker rmi <image-name>

# Remove all unused images
docker image prune
```

## File Structure
```
├── Dockerfile              # Development Dockerfile
├── Dockerfile.prod         # Production Dockerfile
├── docker-compose.yml      # Docker Compose configuration
├── .dockerignore          # Files to exclude from Docker build
└── DOCKER_SETUP.md        # This file
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Change the port mapping
   docker run -p 3000:5173 midexam-dev  # Maps to localhost:3000
   ```

2. **Permission issues on Linux/Mac**
   ```bash
   # Fix permissions
   sudo chown -R $USER:$USER .
   ```

3. **Hot reload not working in development**
   - Make sure you're using volume mounting: `-v "${PWD}:/app"`
   - Ensure the Vite dev server is configured with `--host 0.0.0.0`

4. **Build fails**
   ```bash
   # Clean Docker cache
   docker builder prune
   
   # Rebuild without cache
   docker build --no-cache -t midexam-dev .
   ```

### Useful Commands

```bash
# View container resource usage
docker stats

# Clean up everything
docker system prune -a

# Export container as image
docker commit <container-name> <new-image-name>

# Save image to file
docker save -o midexam.tar midexam-dev

# Load image from file
docker load -i midexam.tar
```

## Environment Variables

You can pass environment variables to your containers:

```bash
# Using docker run
docker run -e NODE_ENV=production -p 5173:5173 midexam-dev

# Using .env file
docker run --env-file .env -p 5173:5173 midexam-dev
```

## Notes

- The development Dockerfile includes volume mounting for hot reload
- The production Dockerfile uses multi-stage build for optimization
- Both configurations use Node.js 18 Alpine for smaller image size
- The .dockerignore file excludes unnecessary files to speed up builds
