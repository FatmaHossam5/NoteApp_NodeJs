# 🚀 Deployment Guide

This guide will help you deploy your NoteApp Backend API to various cloud platforms.

## 📋 Prerequisites

- Node.js 18+ installed locally
- MongoDB database (local or cloud)
- Git repository with your code
- Account on your chosen deployment platform

## 🌐 Deployment Options

### 1. Vercel (Recommended)

Vercel is already configured in your project with `vercel.json`.

#### Steps:
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add all variables from your `.env` file

#### Environment Variables for Vercel:
```
PORT=3000
NODE_ENV=production
DBURI=mongodb+srv://username:password@cluster.mongodb.net/noteapp
signature=your-super-secret-jwt-key
BearerKey=Bearer 
SALTROUND=10
FRONTEND_URL=https://your-frontend-domain.com
```

### 2. Railway

Railway offers easy MongoDB integration.

#### Steps:
1. **Connect GitHub**
   - Go to [Railway.app](https://railway.app)
   - Connect your GitHub account
   - Select your repository

2. **Add MongoDB**
   - Click "New" → "Database" → "MongoDB"
   - Copy the connection string

3. **Set Environment Variables**
   - Go to your project settings
   - Add environment variables

4. **Deploy**
   - Railway will automatically deploy on push to main branch

### 3. Render

Render offers a free tier for Node.js applications.

#### Steps:
1. **Connect Repository**
   - Go to [Render.com](https://render.com)
   - Connect your GitHub account
   - Select your repository

2. **Configure Service**
   - Choose "Web Service"
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Set Environment Variables**
   - Add all required environment variables

4. **Deploy**
   - Click "Create Web Service"

### 4. Heroku

Traditional PaaS option with good Node.js support.

#### Steps:
1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login and Create App**
   ```bash
   heroku login
   heroku create your-noteapp-api
   ```

3. **Add MongoDB**
   ```bash
   heroku addons:create mongolab:sandbox
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set signature=your-jwt-secret
   heroku config:set BearerKey="Bearer "
   heroku config:set SALTROUND=10
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

## 🗄️ Database Setup

### MongoDB Atlas (Recommended for Production)

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free account

2. **Create Cluster**
   - Choose "Free" tier
   - Select your preferred region
   - Create cluster

3. **Configure Access**
   - Add your IP address to whitelist
   - Create database user
   - Get connection string

4. **Connection String Format**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/noteapp?retryWrites=true&w=majority
   ```

### Local MongoDB (Development)

1. **Install MongoDB**
   ```bash
   # macOS with Homebrew
   brew install mongodb-community
   
   # Ubuntu/Debian
   sudo apt-get install mongodb
   
   # Windows
   # Download from https://www.mongodb.com/try/download/community
   ```

2. **Start MongoDB**
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Ubuntu/Debian
   sudo systemctl start mongod
   ```

3. **Connection String**
   ```
   mongodb://localhost:27017/noteapp
   ```

## 🔧 Environment Variables

### Required Variables:
```env
PORT=3000
NODE_ENV=production
DBURI=mongodb+srv://username:password@cluster.mongodb.net/noteapp
signature=your-super-secret-jwt-key-make-it-long-and-random
BearerKey=Bearer 
SALTROUND=10
```

### Optional Variables:
```env
FRONTEND_URL=https://your-frontend-domain.com
nodeMailerEmail=your-email@gmail.com
nodeMailerPassword=your-app-password
```

## 🧪 Testing Deployment

After deployment, test your API:

1. **Health Check**
   ```bash
   curl https://your-api-domain.com/api/v1/auth/signup
   ```

2. **Register User**
   ```bash
   curl -X POST https://your-api-domain.com/api/v1/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"TestPass123","cPassword":"TestPass123"}'
   ```

3. **Login**
   ```bash
   curl -X POST https://your-api-domain.com/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"TestPass123"}'
   ```

## 🔍 Troubleshooting

### Common Issues:

1. **Database Connection Failed**
   - Check MongoDB connection string
   - Verify network access in MongoDB Atlas
   - Ensure database user has proper permissions

2. **Environment Variables Not Set**
   - Double-check all required variables are set
   
   - Restart the application after setting variables

3. **CORS Issues**
   - Set `FRONTEND_URL` environment variable
   - Check CORS configuration in `modules/index.router.js`

4. **JWT Token Issues**
   - Ensure `signature` environment variable is set
   - Check token expiration settings

### Logs and Monitoring:

- **Vercel**: Check function logs in dashboard
- **Railway**: View logs in project dashboard
- **Render**: Check service logs
- **Heroku**: Use `heroku logs --tail`

## 📊 Performance Optimization

1. **Enable Compression**
   ```javascript
   import compression from 'compression';
   app.use(compression());
   ```

2. **Add Caching Headers**
   ```javascript
   app.use((req, res, next) => {
     res.set('Cache-Control', 'public, max-age=300');
     next();
   });
   ```

3. **Database Indexing**
   ```javascript
   // Add to your models
   userSchema.index({ email: 1 });
   noteSchema.index({ userID: 1 });
   ```

## 🔒 Security Checklist

- [ ] Environment variables are properly set
- [ ] Database connection is secure
- [ ] JWT secret is strong and unique
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled
- [ ] Security headers are set (helmet)
- [ ] HTTPS is enforced in production

## 📈 Monitoring and Analytics

Consider adding:
- **Error Tracking**: Sentry, Bugsnag
- **Performance Monitoring**: New Relic, DataDog
- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Logging**: Winston, Morgan

---

**Happy Deploying! 🚀**
