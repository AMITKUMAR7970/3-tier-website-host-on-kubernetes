// 3-Tier Kubernetes Application JavaScript

class KubernetesApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupTabNavigation();
        this.setupConfigTabs();
        this.setupDockerTabs();
        this.setupFileBrowser();
        this.setupCopyButtons();
        this.setupTierCardInteractions();
        this.initializePrism();
    }

    // Main tab navigation
    setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.nav__tab');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab;
                
                // Remove active classes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active classes
                button.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }

    // Kubernetes configuration tabs
    setupConfigTabs() {
        const configTabs = document.querySelectorAll('.config-tab');
        const configSections = document.querySelectorAll('.config-section');

        configTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetConfig = tab.dataset.config;
                
                // Remove active classes
                configTabs.forEach(t => t.classList.remove('active'));
                configSections.forEach(section => section.classList.remove('active'));
                
                // Add active classes
                tab.classList.add('active');
                document.getElementById(`config-${targetConfig}`).classList.add('active');
            });
        });
    }

    // Docker configuration tabs
    setupDockerTabs() {
        const dockerTabs = document.querySelectorAll('.docker-tab');
        const dockerSections = document.querySelectorAll('.docker-section');

        dockerTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetDocker = tab.dataset.docker;
                
                // Remove active classes
                dockerTabs.forEach(t => t.classList.remove('active'));
                dockerSections.forEach(section => section.classList.remove('active'));
                
                // Add active classes
                tab.classList.add('active');
                document.getElementById(`docker-${targetDocker}`).classList.add('active');
            });
        });
    }

    // File browser functionality
    setupFileBrowser() {
        const treeItems = document.querySelectorAll('.tree-item[data-file]');
        const fileContent = document.querySelector('.file-content');

        // File contents data
        const fileContents = {
            'frontend-folder': {
                type: 'folder',
                content: this.generateFolderView('frontend', [
                    'Dockerfile',
                    'package.json',
                    'public/',
                    'src/',
                    'README.md'
                ])
            },
            'backend-folder': {
                type: 'folder',
                content: this.generateFolderView('backend', [
                    'Dockerfile',
                    'package.json',
                    'server.js',
                    'routes/',
                    'models/',
                    'middleware/',
                    'README.md'
                ])
            },
            'kubernetes-folder': {
                type: 'folder',
                content: this.generateFolderView('kubernetes', [
                    'namespace.yaml',
                    'configmap.yaml',
                    'secrets.yaml',
                    'mongodb/',
                    'backend/',
                    'frontend/',
                    'ingress.yaml'
                ])
            },
            'docker-compose': {
                type: 'file',
                name: 'docker-compose.yml',
                content: `version: '3.8'

services:
  mongodb:
    image: mongo:5.0
    container_name: mongodb
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password123
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./backend
    container_name: backend
    restart: always
    environment:
      DATABASE_URL: mongodb://admin:password123@mongodb:27017/threetierapp?authSource=admin
      JWT_SECRET: mysupersecretjwt
      NODE_ENV: development
    ports:
      - "5000:5000"
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    container_name: frontend
    restart: always
    environment:
      REACT_APP_API_URL: http://localhost:5000
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  mongodb_data:`
            },
            'readme': {
                type: 'file',
                name: 'README.md',
                content: `# 3-Tier Kubernetes Web Application

A complete demonstration of 3-tier architecture deployed on Kubernetes.

## Architecture Overview

This project implements a modern 3-tier web application:

- **Presentation Tier**: React.js frontend
- **Application Tier**: Node.js/Express backend
- **Data Tier**: MongoDB database

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Kubernetes cluster (minikube, EKS, GKE, AKS)
- kubectl configured

### Local Development

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd three-tier-kubernetes-app

# Start with Docker Compose
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# MongoDB: localhost:27017
\`\`\`

### Kubernetes Deployment

\`\`\`bash
# Build and push images
./build-images.sh

# Deploy to Kubernetes
./deploy.sh

# Verify deployment
kubectl get pods -n three-tier-app
\`\`\`

## Project Structure

\`\`\`
├── frontend/          # React.js application
├── backend/           # Node.js/Express API
├── kubernetes/        # Kubernetes manifests
├── docker-compose.yml # Local development
└── deploy.sh         # Deployment script
\`\`\`

## Features

- Containerized microservices
- Kubernetes orchestration
- Persistent data storage
- Horizontal pod autoscaling
- Ingress configuration
- Health checks and monitoring
- CI/CD ready

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License - see LICENSE file for details.`
            },
            'deploy-script': {
                type: 'file',
                name: 'deploy.sh',
                content: `#!/bin/bash

# 3-Tier Kubernetes Application Deployment Script

set -e

echo "🚀 Starting deployment of 3-Tier Kubernetes Application..."

# Colors for output
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
BLUE='\\033[0;34m'
NC='\\033[0m' # No Color

# Configuration
NAMESPACE="three-tier-app"
DOCKER_REGISTRY="your-registry"
FRONTEND_IMAGE="$DOCKER_REGISTRY/frontend:latest"
BACKEND_IMAGE="$DOCKER_REGISTRY/backend:latest"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    if ! command -v kubectl &> /dev/null; then
        print_error "kubectl is not installed"
        exit 1
    fi
    
    if ! command -v docker &> /dev/null; then
        print_error "docker is not installed"
        exit 1
    fi
    
    print_success "Prerequisites check passed"
}

# Build and push Docker images
build_images() {
    print_status "Building Docker images..."
    
    # Build frontend
    print_status "Building frontend image..."
    docker build -t $FRONTEND_IMAGE ./frontend
    
    # Build backend
    print_status "Building backend image..."
    docker build -t $BACKEND_IMAGE ./backend
    
    print_success "Docker images built successfully"
    
    # Push images
    print_status "Pushing images to registry..."
    docker push $FRONTEND_IMAGE
    docker push $BACKEND_IMAGE
    
    print_success "Images pushed to registry"
}

# Deploy to Kubernetes
deploy_kubernetes() {
    print_status "Deploying to Kubernetes..."
    
    # Create namespace
    print_status "Creating namespace..."
    kubectl apply -f kubernetes/namespace.yaml
    
    # Deploy ConfigMap and Secrets
    print_status "Deploying ConfigMap and Secrets..."
    kubectl apply -f kubernetes/configmap.yaml
    kubectl apply -f kubernetes/secrets.yaml
    
    # Deploy MongoDB
    print_status "Deploying MongoDB..."
    kubectl apply -f kubernetes/mongodb/
    
    # Wait for MongoDB to be ready
    print_status "Waiting for MongoDB to be ready..."
    kubectl wait --for=condition=Ready pod -l app=mongodb -n $NAMESPACE --timeout=300s
    
    # Deploy Backend
    print_status "Deploying Backend..."
    kubectl apply -f kubernetes/backend/
    
    # Wait for Backend to be ready
    print_status "Waiting for Backend to be ready..."
    kubectl wait --for=condition=Ready pod -l app=backend -n $NAMESPACE --timeout=300s
    
    # Deploy Frontend
    print_status "Deploying Frontend..."
    kubectl apply -f kubernetes/frontend/
    
    # Wait for Frontend to be ready
    print_status "Waiting for Frontend to be ready..."
    kubectl wait --for=condition=Ready pod -l app=frontend -n $NAMESPACE --timeout=300s
    
    # Deploy Ingress
    print_status "Deploying Ingress..."
    kubectl apply -f kubernetes/ingress.yaml
    
    print_success "Kubernetes deployment completed"
}

# Verify deployment
verify_deployment() {
    print_status "Verifying deployment..."
    
    echo "📊 Deployment Status:"
    kubectl get pods -n $NAMESPACE
    
    echo ""
    echo "🔗 Services:"
    kubectl get services -n $NAMESPACE
    
    echo ""
    echo "🌐 Ingress:"
    kubectl get ingress -n $NAMESPACE
    
    print_success "Deployment verification completed"
}

# Main execution
main() {
    echo "🎯 3-Tier Kubernetes Application Deployment"
    echo "=========================================="
    
    check_prerequisites
    build_images
    deploy_kubernetes
    verify_deployment
    
    echo ""
    print_success "🎉 Deployment completed successfully!"
    echo ""
    print_status "Access your application:"
    print_status "  Frontend: http://threetier.local"
    print_status "  Backend API: http://threetier.local/api"
    echo ""
    print_warning "Make sure to add 'threetier.local' to your /etc/hosts file"
    print_warning "pointing to your ingress controller IP"
}

# Run main function
main "$@"`
            }
        };

        treeItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all items
                treeItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Get file data
                const fileKey = item.dataset.file;
                const fileData = fileContents[fileKey];
                
                if (fileData && fileContent) {
                    this.displayFileContent(fileData, fileContent);
                }
            });
        });
    }

    generateFolderView(folderName, items) {
        return `
            <div class="folder-view">
                <h3><i class="fas fa-folder-open"></i> ${folderName}/</h3>
                <div class="folder-items">
                    ${items.map(item => `
                        <div class="folder-item">
                            <i class="fas ${item.includes('.') ? 'fa-file' : 'fa-folder'}"></i>
                            <span>${item}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="folder-description">
                    <p>This folder contains the ${folderName} tier components of the application.</p>
                    ${this.getFolderDescription(folderName)}
                </div>
            </div>
        `;
    }

    getFolderDescription(folderName) {
        const descriptions = {
            'frontend': `
                <ul>
                    <li><strong>Dockerfile</strong> - Container configuration for React app</li>
                    <li><strong>package.json</strong> - Node.js dependencies and scripts</li>
                    <li><strong>src/</strong> - React components and application logic</li>
                    <li><strong>public/</strong> - Static assets and HTML template</li>
                </ul>
            `,
            'backend': `
                <ul>
                    <li><strong>Dockerfile</strong> - Container configuration for Node.js API</li>
                    <li><strong>server.js</strong> - Express server entry point</li>
                    <li><strong>routes/</strong> - API endpoint definitions</li>
                    <li><strong>models/</strong> - Database schema definitions</li>
                    <li><strong>middleware/</strong> - Custom middleware functions</li>
                </ul>
            `,
            'kubernetes': `
                <ul>
                    <li><strong>namespace.yaml</strong> - Kubernetes namespace definition</li>
                    <li><strong>configmap.yaml</strong> - Configuration data</li>
                    <li><strong>secrets.yaml</strong> - Sensitive data management</li>
                    <li><strong>mongodb/</strong> - Database deployment manifests</li>
                    <li><strong>backend/</strong> - API tier deployment manifests</li>
                    <li><strong>frontend/</strong> - UI tier deployment manifests</li>
                    <li><strong>ingress.yaml</strong> - External access configuration</li>
                </ul>
            `
        };
        
        return descriptions[folderName] || '';
    }

    displayFileContent(fileData, container) {
        if (fileData.type === 'folder') {
            container.innerHTML = fileData.content;
        } else {
            container.innerHTML = `
                <div class="file-view">
                    <div class="file-header">
                        <h3><i class="fas fa-file-code"></i> ${fileData.name}</h3>
                        <button class="copy-btn" onclick="window.copyFileContent('${fileData.name}')">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                    <div class="code-block">
                        <pre><code class="language-${this.getLanguageFromFile(fileData.name)}">${this.escapeHtml(fileData.content)}</code></pre>
                    </div>
                </div>
            `;
            
            // Re-highlight code
            if (window.Prism) {
                setTimeout(() => {
                    window.Prism.highlightAll();
                }, 10);
            }
        }
    }

    getLanguageFromFile(filename) {
        const extension = filename.split('.').pop().toLowerCase();
        const languageMap = {
            'js': 'javascript',
            'yml': 'yaml',
            'yaml': 'yaml',
            'md': 'markdown',
            'sh': 'bash',
            'json': 'json',
            'dockerfile': 'docker'
        };
        
        return languageMap[extension] || 'text';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Copy to clipboard functionality
    setupCopyButtons() {
        if (typeof ClipboardJS !== 'undefined') {
            const clipboard = new ClipboardJS('.copy-btn');
            
            clipboard.on('success', (e) => {
                const button = e.trigger;
                const originalContent = button.innerHTML;
                
                // Show success state
                button.classList.add('copied');
                button.innerHTML = '<i class="fas fa-check"></i>';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    button.classList.remove('copied');
                    button.innerHTML = originalContent;
                }, 2000);
                
                e.clearSelection();
            });
            
            clipboard.on('error', (e) => {
                console.error('Copy failed:', e);
                // Fallback for unsupported browsers
                this.fallbackCopyTextToClipboard(e.text);
            });
        } else {
            // Fallback if ClipboardJS is not available
            document.addEventListener('click', (e) => {
                if (e.target.closest('.copy-btn')) {
                    const button = e.target.closest('.copy-btn');
                    const targetId = button.dataset.clipboardTarget;
                    if (targetId) {
                        const target = document.querySelector(targetId);
                        if (target) {
                            this.fallbackCopyTextToClipboard(target.textContent);
                            this.showCopyFeedback(button);
                        }
                    }
                }
            });
        }
    }

    showCopyFeedback(button) {
        const originalContent = button.innerHTML;
        button.classList.add('copied');
        button.innerHTML = '<i class="fas fa-check"></i>';
        
        setTimeout(() => {
            button.classList.remove('copied');
            button.innerHTML = originalContent;
        }, 2000);
    }

    fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            console.log('Text copied to clipboard');
        } catch (err) {
            console.error('Unable to copy to clipboard', err);
        }
        
        document.body.removeChild(textArea);
    }

    // Tier card interactions - Fixed navigation mapping
    setupTierCardInteractions() {
        const tierCards = document.querySelectorAll('.tier-card[data-tier]');
        
        tierCards.forEach(card => {
            card.addEventListener('click', () => {
                const tier = card.dataset.tier;
                let targetTab = tier;
                
                // Map tier data attributes to actual tab names
                const tierMapping = {
                    'frontend': 'frontend',
                    'backend': 'backend', 
                    'database': 'database'
                };
                
                targetTab = tierMapping[tier] || tier;
                
                // Find the corresponding navigation tab
                const navTab = document.querySelector(`.nav__tab[data-tab="${targetTab}"]`);
                
                if (navTab) {
                    // Trigger the navigation
                    navTab.click();
                    
                    // Scroll to top to show the new content
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    }

    // Initialize Prism.js for syntax highlighting
    initializePrism() {
        if (window.Prism) {
            // Configure Prism
            window.Prism.manual = true;
            
            // Highlight all code blocks
            setTimeout(() => {
                window.Prism.highlightAll();
            }, 100);
        }
    }

    // Utility method to copy file content
    copyFileContent(filename) {
        // This method can be called from inline onclick handlers
        const fileView = document.querySelector('.file-view .code-block code');
        if (fileView) {
            this.fallbackCopyTextToClipboard(fileView.textContent);
            
            // Show success feedback
            const button = event.target.closest('.copy-btn');
            if (button) {
                const originalContent = button.innerHTML;
                button.classList.add('copied');
                button.innerHTML = '<i class="fas fa-check"></i>';
                
                setTimeout(() => {
                    button.classList.remove('copied');
                    button.innerHTML = originalContent;
                }, 2000);
            }
        }
    }

    // Smooth scrolling for anchor links
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Keyboard navigation support
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Arrow key navigation for tabs
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                const activeTab = document.querySelector('.nav__tab.active');
                if (activeTab && document.activeElement === activeTab) {
                    e.preventDefault();
                    
                    const tabs = Array.from(document.querySelectorAll('.nav__tab'));
                    const currentIndex = tabs.indexOf(activeTab);
                    let nextIndex;
                    
                    if (e.key === 'ArrowLeft') {
                        nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
                    } else {
                        nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
                    }
                    
                    tabs[nextIndex].click();
                    tabs[nextIndex].focus();
                }
            }
        });
    }

    // Add search functionality (future enhancement)
    setupSearch() {
        // Placeholder for future search functionality
        // This could search through code examples, documentation, etc.
    }

    // Performance monitoring
    logPerformance() {
        if (window.performance) {
            const navigationTiming = window.performance.getEntriesByType('navigation')[0];
            console.log('Page Load Performance:', {
                domContentLoaded: navigationTiming.domContentLoadedEventEnd - navigationTiming.domContentLoadedEventStart,
                loadComplete: navigationTiming.loadEventEnd - navigationTiming.loadEventStart,
                totalTime: navigationTiming.loadEventEnd - navigationTiming.fetchStart
            });
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new KubernetesApp();
    
    // Log performance metrics
    window.addEventListener('load', () => {
        app.logPerformance();
    });
    
    // Make app globally available for debugging
    window.kubernetesApp = app;
});

// Service Worker registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered: ', registration))
        //     .catch(registrationError => console.log('SW registration failed: ', registrationError));
    });
}

// Handle clipboard API fallback - Global function for inline onclick handlers
window.copyFileContent = function(filename) {
    const fileView = document.querySelector('.file-view .code-block code');
    if (fileView) {
        const textArea = document.createElement('textarea');
        textArea.value = fileView.textContent;
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            
            // Show success feedback
            if (typeof event !== 'undefined') {
                const button = event.target.closest('.copy-btn');
                if (button) {
                    const originalContent = button.innerHTML;
                    button.classList.add('copied');
                    button.innerHTML = '<i class="fas fa-check"></i>';
                    
                    setTimeout(() => {
                        button.classList.remove('copied');
                        button.innerHTML = originalContent;
                    }, 2000);
                }
            }
        } catch (err) {
            console.error('Copy failed:', err);
        }
        
        document.body.removeChild(textArea);
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KubernetesApp;
}