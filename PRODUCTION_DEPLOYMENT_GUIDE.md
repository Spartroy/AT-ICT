# Production Deployment Guide

## 🚨 Critical Issues to Fix Before Production

Your current architecture requires several changes to work in production. Here's what you need to do:

## 1. Environment Configuration

### Backend Environment Variables (.env)
Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
NODE_ENV=production
PORT=5000

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/atict

# JWT Configuration  
JWT_SECRET=your_super_secure_jwt_secret_key_here_minimum_32_characters
JWT_EXPIRE=30d

# Client Configuration
CLIENT_URL=https://your-frontend-domain.com

# Cloudinary Configuration (for file uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_SIZE=5242880
```

### Frontend Environment Variables (.env)
Create a `.env` file in the `client/` directory:

```env
# Backend API URL
REACT_APP_API_URL=https://your-backend-domain.com

# Socket.IO URL (should match backend URL)  
REACT_APP_SOCKET_URL=https://your-backend-domain.com
```

## 2. Update Frontend API Calls

**CRITICAL**: You have 40+ hardcoded `localhost:5000` URLs in your frontend that will break in production.

I've created `client/src/config/api.js` to centralize API URLs. You need to:

1. Import the API configuration in each component
2. Replace hardcoded URLs with the centralized config

Example fix for SignIn.jsx:
```javascript
// OLD (will break in production):
const response = await fetch('http://localhost:5000/api/auth/login', {

// NEW (production ready):
import { API_ENDPOINTS } from '../../config/api';
const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
```

## 3. File Upload Configuration

Your app currently stores files locally in `uploads/` which won't work in production. You're already configured for Cloudinary, so ensure:

1. Set Cloudinary environment variables
2. All file uploads go through Cloudinary (already implemented in your middleware)

## 4. Database Configuration

1. Use MongoDB Atlas for production
2. Set up proper database indexes
3. Configure IP whitelist for your server
4. Use connection string with authentication

## 5. Security Enhancements

### JWT Secret
Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### CORS Configuration
Your CORS is already configured properly to use `CLIENT_URL` environment variable.

### Rate Limiting
Already implemented - just set appropriate values in environment variables.

## 6. Deployment Options

### Option A: Separate Deployments (Recommended)
- **Frontend**: Deploy to Vercel, Netlify, or AWS S3 + CloudFront  
- **Backend**: Deploy to Railway, Render, Heroku, or AWS EC2

### Option B: Single Server Deployment
- Deploy both to same server (requires serving React build from Express)

## 7. Build Commands

### Frontend Build:
```bash
cd client
npm run build
```

### Backend Production:
```bash
cd backend  
npm start
```

## 8. Environment-Specific Scripts

Add to `backend/package.json`:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "production": "NODE_ENV=production node server.js"
  }
}
```

## 9. Health Checks

Your backend already has a health endpoint at `/health` - use this for monitoring.

## 10. Socket.IO Configuration

Update frontend Socket.IO connection:
```javascript
const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000');
```

## 🚀 Quick Start for Production

1. **Set up MongoDB Atlas**
2. **Create environment files** with real values
3. **Update all hardcoded URLs** in frontend components
4. **Set up Cloudinary** for file uploads
5. **Deploy backend** to cloud service
6. **Build and deploy frontend** with correct API URL
7. **Test all functionality** in production environment

## 📋 Pre-deployment Checklist

- [ ] Environment variables configured
- [ ] Database connection working
- [ ] All hardcoded URLs replaced  
- [ ] File uploads tested with Cloudinary
- [ ] CORS configured for production domain
- [ ] JWT secret is secure and not exposed
- [ ] Rate limiting configured
- [ ] Health check endpoint accessible
- [ ] Socket.IO working with production URLs
- [ ] All API endpoints tested

## 🔍 Common Issues

1. **CORS errors**: Check CLIENT_URL matches your frontend domain exactly
2. **File upload fails**: Verify Cloudinary credentials
3. **Database connection**: Check MongoDB Atlas IP whitelist
4. **Socket.IO not connecting**: Ensure same domain/port for API and Socket.IO
5. **Login fails**: Verify JWT_SECRET is set and secure

Your architecture is solid but needs these configuration changes for production! 