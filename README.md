## 🔗 Project Link

Explore the deployed 3-tier web application hosted on Kubernetes here:  
https://amitkumar7970.github.io/3-tier-website-host-on-kubernetes/


# 3-Tier Web Application on Kubernetes

## 🚀 Project Overview

This repository demonstrates a **complete 3-tier web architecture** deployed on **Kubernetes**, following modern cloud-native best practices. The stack includes:

- **Frontend:** React.js
- **Backend:** Node.js/Express.js API
- **Database:** MongoDB with persistent volume storage

It’s designed for production readiness, educational use, and rapid deployment—locally or on any managed Kubernetes service (EKS, GKE, AKS).

***

## 🏗️ Architecture Diagram

```
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   Frontend    │    │   Backend     │    │   Database    │
│   (React)     │<--►│(Node/Express) │<--►│ (MongoDB)     │
│ Port: 3000    │    │ Port: 5000    │    │ Port: 27017   │
└───────────────┘    └───────────────┘    └───────────────┘
```


***

## 📦 File Structure

```text
.
├── frontend/                  # React.js app
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── backend/                   # Node.js API
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   ├── routes/
│   └── models/
├── kubernetes/                # Manifests for K8s
│   ├── namespace.yaml
│   ├── configmap.yaml
│   ├── secrets.yaml
│   ├── mongodb/
│   ├── backend/
│   ├── frontend/
│   ├── ingress.yaml
│   ├── hpa.yaml
│   └── network-policy.yaml
├── scripts/
│   └── mongo-init.js
├── docker-compose.yml         # Local dev setup
├── deploy.sh                  # Automated K8s deployment
├── nginx.conf                 # Proxy config (optional)
├── .gitignore
└── README.md
```


***

## 🖥️ Technology Stack

- **Frontend:** React.js, Axios, Responsive CSS
- **Backend:** Node.js, Express.js, Mongoose ODM, JWT Auth, Helmet, Rate Limiting, CORS
- **Database:** MongoDB, PersistentVolume, Sample data init
- **DevOps:** Docker, Docker Compose, Kubernetes manifests, Scripts for deployment/cleanup

***

## ⚡ Quick Start

### Local Development

```bash
# Clone the repository
git clone <your-repo-url>
cd <repo-dir>

# Start all services locally
docker-compose up -d

# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MongoDB: localhost:27017
```


### Kubernetes Deployment

#### Automated Deployment

```bash
# Make deploy script executable
chmod +x deploy.sh

# Deploy everything
./deploy.sh deploy

# Cleanup resources
./deploy.sh cleanup
```


#### Manual Steps

```bash
kubectl apply -f kubernetes/namespace.yaml
kubectl apply -f kubernetes/configmap.yaml
kubectl apply -f kubernetes/secrets.yaml
kubectl apply -f kubernetes/mongodb/
kubectl apply -f kubernetes/backend/
kubectl apply -f kubernetes/frontend/
kubectl apply -f kubernetes/ingress.yaml
kubectl apply -f kubernetes/hpa.yaml
kubectl apply -f kubernetes/network-policy.yaml
```


***

## 🔧 Configuration

### Backend `.env` Example

```bash
DATABASE_URL=mongodb://mongodb-service:27017/threetierapp
JWT_SECRET=your-super-secret-key
NODE_ENV=production
PORT=5000
```


### Kubernetes Secrets

Secrets are base64-encoded. Example:

```bash
echo -n "your-secret" | base64
```


***

## 🌐 Ingress Configuration

Edit `kubernetes/ingress.yaml` and set `host` to your domain.

***

## 📊 Monitoring \& Scaling

- **Health Checks:** Built into all components (`/health` endpoints)
- **Auto Scaling:** Horizontal Pod Autoscaler (HPA) for frontend and backend
- **Resource Limits:** Set for all pods
- **Network Policies:** Restrict traffic, secure access between pods

***

## 🔒 Security Highlights

- **Secrets Management:** All sensitive configs encrypted with K8s Secrets
- **Network Policies:** Only allow necessary traffic (backend <-> database, frontend <-> backend, ingress <-> frontend/backend)
- **Container Security:** Minimal base images, non-root users
- **Rate Limiting:** Protects backend API
- **RBAC:** Add/extend as needed

***

## 📋 API Endpoints

**User API Example:**

- `GET /api/users` — List all users
- `POST /api/users` — Create new user
- `PUT /api/users/:id` — Update user
- `DELETE /api/users/:id` — Delete user

Request bodies:

```json
{
  "name": "Alice Smith",
  "email": "alice@example.com"
}
```


***

## 🛠️ Customization

1. Edit Docker image path in `deploy.sh` and K8s manifest files
2. Update Ingress hostname for your domain
3. Change secrets in `secrets.yaml`
4. Adjust resource requests/limits as needed
5. Extend API, frontend features, add CI/CD

***

## 🧪 Testing

### Local

```bash
cd backend && npm test
cd frontend && npm test
```


### Kubernetes

```bash
kubectl get pods -n three-tier-app
kubectl logs deployment/backend -n three-tier-app
kubectl logs deployment/frontend -n three-tier-app
kubectl port-forward svc/frontend-service 3000:80 -n three-tier-app
kubectl port-forward svc/backend-service 5000:80 -n three-tier-app
```


***

## 🚨 Troubleshooting

1. **Pod stuck/crash:** Check resource limits, logs (`kubectl describe pod`)
2. **DB connection fails:** Correct service names, network policy
3. **Ingress unreachable:** Confirm controller is installed and configured
4. **Image pull errors:** Verify tags, registry credentials

***

## 🛡️ Production Checklist

- Setup backups for MongoDB
- Add Prometheus/Grafana for monitoring
- Set up TLS for Ingress
- Enable logging (ELK, Fluentd)
- Review security and RBAC

***

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit \& push changes
4. Create a Pull Request

***

## 📄 License

MIT License. See `LICENSE` for details.

***

## 🙌 Credits

- Kubernetes, React, Node.js, MongoDB teams
- NGINX for ingress controller
- DevOps and cloud community

***

**Happy coding and deploying! 🚀**

***

Feel free to update this README as you evolve your project. For detailed file-level documentation and code samples, see the respective folders and files in this repo.

