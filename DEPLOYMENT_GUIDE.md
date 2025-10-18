# Deployment Guide for HealthMate

## Deploy to Vercel (Recommended)

### Step 1: Push to GitHub
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/healthmate.git
git push -u origin main
\`\`\`

### Step 2: Connect to Vercel
1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Click "Import"

### Step 3: Add Environment Variables
1. In Vercel dashboard, go to "Settings" → "Environment Variables"
2. Add these variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `NEXT_PUBLIC_GEMINI_API_KEY`: Your Gemini API key (optional)

### Step 4: Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Your app is now live!

## Deploy to Render

### Step 1: Create Render Account
1. Go to [Render](https://render.com)
2. Sign up with GitHub

### Step 2: Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Fill in the details:
   - **Name**: healthmate
   - **Environment**: Node
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`

### Step 3: Add Environment Variables
1. Scroll to "Environment"
2. Add all variables from `.env.example`

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait for deployment

## Deploy to Railway

### Step 1: Create Railway Account
1. Go to [Railway](https://railway.app)
2. Sign up with GitHub

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository

### Step 3: Add Environment Variables
1. Go to "Variables"
2. Add all variables from `.env.example`

### Step 4: Deploy
1. Railway automatically deploys on push
2. Your app is live!

## Production Checklist

- [ ] MongoDB Atlas cluster created and secured
- [ ] JWT_SECRET changed to a strong random string
- [ ] All environment variables set in production
- [ ] CORS configured if needed
- [ ] SSL/HTTPS enabled
- [ ] Database backups configured
- [ ] Error logging set up
- [ ] Rate limiting configured
- [ ] Security headers added

## Monitoring

### Set up Error Tracking
- Use [Sentry](https://sentry.io) for error tracking
- Use [LogRocket](https://logrocket.com) for session replay

### Monitor Performance
- Use Vercel Analytics
- Monitor MongoDB performance in Atlas dashboard
- Set up alerts for high error rates

## Scaling Tips

1. **Database**: Add indexes to frequently queried fields
2. **API**: Implement caching with Redis
3. **Storage**: Use CDN for file storage (Cloudinary)
4. **Frontend**: Enable image optimization
5. **Monitoring**: Set up performance alerts

For more help, visit the deployment platform's documentation.
