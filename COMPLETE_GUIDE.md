# HealthMate - Complete Implementation Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Installation](#installation)
4. [MongoDB Setup](#mongodb-setup)
5. [Running the App](#running-the-app)
6. [Features Explained](#features-explained)
7. [API Documentation](#api-documentation)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**HealthMate** is an AI-powered personal health companion app that helps users:
- Upload and manage medical reports
- Get AI-powered analysis in English and Roman Urdu
- Track health vitals (BP, Sugar, Weight, etc.)
- View complete health timeline
- Get personalized health insights

### Key Features
✅ Bilingual Support (English + Roman Urdu)
✅ AI-Powered Medical Report Analysis
✅ Secure User Authentication
✅ Health Vitals Tracking
✅ Timeline View
✅ Mobile Responsive Design

---

## 🛠️ Technology Stack

| Component | Technology |
|-----------|-----------|
| Frontend | Next.js 15, React 19, Tailwind CSS |
| Backend | Next.js API Routes |
| Database | MongoDB Atlas |
| Authentication | JWT + bcryptjs |
| AI | Gemini API |
| Deployment | Vercel |

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB Atlas account
- Git

### Step 1: Clone Repository
\`\`\`bash
git clone https://github.com/YOUR_USERNAME/healthmate.git
cd healthmate
\`\`\`

### Step 2: Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Step 3: Create Environment File
Create `.env.local`:
\`\`\`env
# MongoDB
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/healthmate

# JWT
JWT_SECRET=your-secret-key-here

# Gemini AI (Optional)
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

---

## 🗄️ MongoDB Setup

### Option A: MongoDB Atlas (Cloud - Recommended)

1. **Create Account**
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free

2. **Create Cluster**
   - Click "Create Deployment"
   - Select Free tier (M0)
   - Choose region
   - Click "Create"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `healthmate_user`
   - Password: (strong password)
   - Click "Add User"

4. **Whitelist IP**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere"
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Clusters"
   - Click "Connect"
   - Select "Drivers"
   - Copy connection string
   - Replace `<password>` with your password
   - Replace `myFirstDatabase` with `healthmate`

6. **Add to .env.local**
\`\`\`env
MONGODB_URI=mongodb+srv://healthmate_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/healthmate?retryWrites=true&w=majority
\`\`\`

### Option B: Local MongoDB

1. **Install MongoDB**
   \`\`\`bash
   # macOS
   brew install mongodb-community
   brew services start mongodb-community
   
   # Windows: Download from mongodb.com
   # Linux: Follow official guide
   \`\`\`

2. **Add to .env.local**
   \`\`\`env
   MONGODB_URI=mongodb://localhost:27017/healthmate
   \`\`\`

---

## 🚀 Running the App

### Development Mode
\`\`\`bash
npm run dev
\`\`\`
Visit `http://localhost:3000`

### Production Build
\`\`\`bash
npm run build
npm run start
\`\`\`

### Linting
\`\`\`bash
npm run lint
\`\`\`

---

## ✨ Features Explained

### 1. User Authentication
- **Register**: Create new account with email/password
- **Login**: Secure JWT-based authentication
- **Protected Routes**: Only authenticated users can access dashboard

**Files**: `app/login/`, `app/register/`, `api/auth/`

### 2. Medical Report Upload
- Upload PDF, JPG, PNG files
- Select report type (Blood Test, X-Ray, etc.)
- File stored with metadata

**Files**: `app/upload-report/`, `api/reports/upload/`

### 3. AI Analysis
- Gemini reads uploaded files
- Generates bilingual summaries
- Highlights abnormal values
- Suggests doctor questions
- Recommends foods and remedies

**Files**: `lib/gemini.ts`, `api/reports/analyze/`

### 4. Vitals Tracking
- Record BP, Blood Sugar, Weight, Heart Rate, Temperature, Oxygen
- Manual entry without lab reports
- Track over time

**Files**: `app/add-vitals/`, `api/vitals/`

### 5. Timeline View
- Chronological health history
- Combined reports and vitals
- Easy date-based navigation

**Files**: `app/timeline/`, `api/timeline/`

### 6. Report Details
- View full report information
- Read AI analysis
- Toggle between English and Urdu
- Color-coded sections

**Files**: `app/report/[id]/`

---

## 📡 API Documentation

### Authentication Endpoints

#### Register User
\`\`\`
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}

Response: { token, user }
\`\`\`

#### Login User
\`\`\`
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: { token, user }
\`\`\`

#### Get Current User
\`\`\`
GET /api/auth/me
Authorization: Bearer TOKEN

Response: { id, email, name }
\`\`\`

### Report Endpoints

#### Get All Reports
\`\`\`
GET /api/reports
Authorization: Bearer TOKEN

Response: [{ _id, fileName, reportType, ... }]
\`\`\`

#### Upload Report
\`\`\`
POST /api/reports/upload
Authorization: Bearer TOKEN
Content-Type: multipart/form-data

Form Data:
- file: File
- reportType: string

Response: { _id, fileName, ... }
\`\`\`

#### Get Report Details
\`\`\`
GET /api/reports/[id]
Authorization: Bearer TOKEN

Response: { _id, fileName, analysis, ... }
\`\`\`

#### Analyze Report
\`\`\`
POST /api/reports/analyze
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "reportId": "...",
  "fileContent": "...",
  "reportType": "blood-test"
}

Response: { summary_en, summary_urdu, abnormal_values, ... }
\`\`\`

### Vitals Endpoints

#### Get All Vitals
\`\`\`
GET /api/vitals
Authorization: Bearer TOKEN

Response: [{ _id, type, value, date, ... }]
\`\`\`

#### Add Vital
\`\`\`
POST /api/vitals/add
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "type": "bp",
  "value": "120/80",
  "notes": "After exercise"
}

Response: { _id, type, value, ... }
\`\`\`

### Timeline Endpoint

#### Get Timeline
\`\`\`
GET /api/timeline
Authorization: Bearer TOKEN

Response: [{ _id, type, date, title, ... }]
\`\`\`

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import GitHub repo
   - Click "Import"

3. **Add Environment Variables**
   - Go to Settings → Environment Variables
   - Add all variables from `.env.example`

4. **Deploy**
   - Click "Deploy"
   - Wait for completion
   - Your app is live!

### Deploy to Render

1. Visit [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect GitHub repo
4. Set build command: `npm run build`
5. Set start command: `npm run start`
6. Add environment variables
7. Click "Create Web Service"

### Deploy to Railway

1. Visit [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose repository
5. Add environment variables
6. Railway auto-deploys on push

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error**: `MongoServerError: connect ECONNREFUSED`

**Solutions**:
1. Verify MongoDB is running
2. Check connection string format
3. Ensure IP is whitelisted (Atlas)
4. Verify database user credentials

### Authentication Issues

**Error**: `Invalid token` or `Unauthorized`

**Solutions**:
1. Clear browser cookies
2. Log out and log back in
3. Check JWT_SECRET is set
4. Verify token format in headers

### File Upload Issues

**Error**: `Upload failed` or `413 Payload Too Large`

**Solutions**:
1. Check file size (max 10MB)
2. Verify file format (PDF, JPG, PNG)
3. Check disk space
4. Verify file permissions

### AI Analysis Issues

**Error**: `Analysis failed` or empty results

**Solutions**:
1. Verify Gemini API key
2. Check file is readable
3. Ensure file has text/data
4. Check API rate limits

### Performance Issues

**Slow loading**:
1. Add MongoDB indexes
2. Implement caching
3. Optimize images
4. Enable compression

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [JWT Guide](https://jwt.io)
- [Gemini API](https://ai.google.dev)

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🎉 You're All Set!

Your HealthMate application is ready to use. Start by:

1. ✅ Setting up MongoDB
2. ✅ Creating `.env.local` file
3. ✅ Running `npm run dev`
4. ✅ Registering a new account
5. ✅ Uploading a medical report
6. ✅ Viewing AI analysis

**Happy coding! 🚀**

For questions or issues, refer to the troubleshooting section or check the documentation files.
