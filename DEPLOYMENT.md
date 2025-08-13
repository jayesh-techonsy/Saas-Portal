# 🚀 Render Deployment Guide for Wassal SaaS

This guide will help you deploy your SaaS application to Render.

## 📋 Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Database**: PostgreSQL database (Supabase recommended)

## 🔧 Backend Deployment

### 1. Connect Repository to Render

1. Go to [render.com](https://render.com) and sign in
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Select the repository containing your SaaS project

### 2. Configure Backend Service

**Service Name**: `saas-backend`
**Runtime**: `Python 3`
**Build Command**: `cd saas-backend && pip install -r requirements.txt`
**Start Command**: `cd saas-backend && python start.py`
**Plan**: Free (or choose paid plan for production)

### 3. Environment Variables

Set these environment variables in Render:

#### Required Variables:
```
SUPABASE_DB_HOST=your-db-host.supabase.co
SUPABASE_DB_PORT=5432
SUPABASE_DB_NAME=postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your-db-password
```

#### Optional Variables:
```
ERP_WALLET_API=your-erp-wallet-api-url
ERP_API_TOKEN=your-erp-api-token
ERP_BASE_URL=your-erp-base-url
SSH_HOSTNAME=your-ssh-hostname
SSH_USERNAME=your-ssh-username
SSH_KEY_PATH=your-ssh-key-path
DOCKER_CONTAINER_NAME=your-docker-container-name
FRONTEND_URL=https://your-frontend-domain.com
```

### 4. Deploy Backend

1. Click "Create Web Service"
2. Wait for the build to complete
3. Note your backend URL (e.g., `https://saas-backend.onrender.com`)

## 🌐 Frontend Deployment

### 1. Create Static Site

1. Click "New +" and select "Static Site"
2. Connect the same GitHub repository
3. Configure as follows:

**Site Name**: `saas-frontend`
**Build Command**: `cd frontend && npm ci && npm run build`
**Publish Directory**: `frontend/dist`

### 2. Set Frontend Environment Variable

Set this environment variable:
```
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```

### 3. Deploy Frontend

1. Click "Create Static Site"
2. Wait for the build to complete
3. Note your frontend URL

## 🔗 Update CORS in Backend

After getting your frontend URL, update the backend environment variable:
```
FRONTEND_URL=https://your-frontend-url.onrender.com
```

## 📱 Testing Your Deployment

### Backend Health Check
- Visit: `https://your-backend-url.onrender.com/health`
- Should return: `{"status": "healthy", "message": "Backend is running"}`

### Frontend
- Visit your frontend URL
- Check browser console for any API connection errors
- Test login and other functionality

## 🚨 Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check requirements.txt for missing dependencies
   - Ensure Python version compatibility

2. **Database Connection Errors**:
   - Verify database credentials
   - Check if database allows external connections

3. **CORS Errors**:
   - Ensure FRONTEND_URL is set correctly
   - Check browser console for CORS policy errors

4. **Environment Variables**:
   - Double-check all required variables are set
   - Ensure no typos in variable names

### Logs and Debugging:

1. **Backend Logs**: Check Render dashboard for backend service logs
2. **Frontend Build Logs**: Check static site build logs
3. **Database Logs**: Check your database provider's logs

## 🔄 Continuous Deployment

Render automatically redeploys when you push to your main branch. To disable:
1. Go to your service settings
2. Toggle "Auto-Deploy" off

## 📊 Monitoring

- **Health Checks**: Render automatically monitors your backend health
- **Uptime**: Check service status in Render dashboard
- **Performance**: Monitor response times and errors

## 🆘 Support

- **Render Documentation**: [docs.render.com](https://docs.render.com)
- **FastAPI Documentation**: [fastapi.tiangolo.com](https://fastapi.tiangolo.com)
- **React Documentation**: [react.dev](https://react.dev)

---

**Happy Deploying! 🎉** 