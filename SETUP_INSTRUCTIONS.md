# HealthMate - Complete Setup Instructions

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- MongoDB Atlas account (or local MongoDB)
- Git installed

## Quick Start (5 minutes)

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/YOUR_USERNAME/healthmate.git
cd healthmate
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Set Up MongoDB
Follow the [MongoDB Setup Guide](./MONGODB_SETUP.md)

### 4. Create Environment Variables
Create `.env.local` file in the root directory:
\`\`\`env
MONGODB_URI=mongodb+srv://healthmate_user:PASSWORD@cluster.mongodb.net/healthmate?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### 5. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` in your browser.

## Features

✅ **User Authentication**
- Secure JWT-based login/register
- Password hashing with bcryptjs
- Protected routes

✅ **Medical Report Management**
- Upload PDF, JPG, PNG files
- AI-powered analysis with Gemini
- Bilingual summaries (English + Roman Urdu)

✅ **Health Vitals Tracking**
- Record BP, Blood Sugar, Weight, Heart Rate, Temperature, Oxygen
- Manual entry without lab reports
- Historical tracking

✅ **AI-Powered Insights**
- Abnormal values highlighting
- Doctor questions to ask
- Food recommendations
- Home remedies
- Medical disclaimers

✅ **Timeline View**
- Chronological health history
- Combined reports and vitals
- Easy navigation

## Project Structure

\`\`\`
healthmate/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication routes
│   │   ├── reports/           # Report management
│   │   ├── vitals/            # Vitals tracking
│   │   └── timeline/          # Timeline data
│   ├── dashboard/             # Main dashboard
│   ├── upload-report/         # Report upload page
│   ├── add-vitals/            # Vitals entry page
│   ├── report/[id]/           # Report detail view
│   ├── timeline/              # Timeline view
│   ├── login/                 # Login page
│   ├── register/              # Registration page
│   └── layout.tsx             # Root layout
├── lib/
│   ├── mongodb.ts             # MongoDB connection
│   ├── db.ts                  # Database operations
│   ├── auth.ts                # JWT utilities
│   ├── gemini.ts              # AI integration
│   └── utils.ts               # Helper functions
├── components/                # Reusable components
├── public/                    # Static assets
└── .env.example               # Environment variables template
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Reports
- `GET /api/reports` - Get all reports
- `POST /api/reports/upload` - Upload new report
- `GET /api/reports/[id]` - Get report details
- `POST /api/reports/analyze` - Analyze report with AI

### Vitals
- `GET /api/vitals` - Get all vitals
- `POST /api/vitals/add` - Add new vital

### Timeline
- `GET /api/timeline` - Get combined timeline

## Database Schema

### Users
\`\`\`javascript
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  name: String,
  createdAt: Date
}
\`\`\`

### Reports
\`\`\`javascript
{
  _id: ObjectId,
  userId: ObjectId,
  fileName: String,
  reportType: String,
  fileSize: Number,
  summary: String,
  analysis: Object,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Vitals
\`\`\`javascript
{
  _id: ObjectId,
  userId: ObjectId,
  type: String,
  value: String,
  notes: String,
  createdAt: Date
}
\`\`\`

## Common Issues & Solutions

### MongoDB Connection Error
**Problem**: `MongoServerError: connect ECONNREFUSED`
**Solution**: 
- Verify MongoDB is running
- Check connection string in `.env.local`
- Ensure IP is whitelisted (for Atlas)

### JWT Token Invalid
**Problem**: `Invalid token` error
**Solution**:
- Clear browser cookies
- Log out and log back in
- Check JWT_SECRET is set correctly

### File Upload Fails
**Problem**: Upload returns 500 error
**Solution**:
- Check file size (max 10MB recommended)
- Verify file format (PDF, JPG, PNG)
- Check disk space

### AI Analysis Not Working
**Problem**: Analysis returns empty
**Solution**:
- Verify Gemini API key is set
- Check file is readable
- Ensure file contains text/data

## Development Tips

### Enable Debug Logging
Add to any API route:
\`\`\`typescript
console.log("[v0] Debug info:", data)
\`\`\`

### Test Authentication
\`\`\`bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
\`\`\`

### View MongoDB Data
Use MongoDB Compass or Atlas UI to browse collections

## Performance Optimization

1. **Database Indexes**: Add indexes to frequently queried fields
2. **Caching**: Implement Redis for session caching
3. **Image Optimization**: Use Next.js Image component
4. **Code Splitting**: Lazy load components
5. **API Optimization**: Implement pagination for large datasets

## Security Best Practices

1. ✅ Passwords hashed with bcryptjs
2. ✅ JWT tokens for authentication
3. ✅ Environment variables for secrets
4. ✅ CORS configured
5. ✅ Input validation on all endpoints
6. ✅ SQL injection prevention (using MongoDB)
7. ✅ XSS protection with React
8. ⚠️ TODO: Add rate limiting
9. ⚠️ TODO: Add HTTPS enforcement
10. ⚠️ TODO: Add security headers

## Next Steps

1. [Deploy to Vercel](./DEPLOYMENT_GUIDE.md)
2. Set up file storage (Cloudinary/Firebase)
3. Configure email notifications
4. Add health tips and reminders
5. Implement social sharing
6. Add wearable device integration

## Support

For issues or questions:
1. Check [MongoDB Setup Guide](./MONGODB_SETUP.md)
2. Check [Deployment Guide](./DEPLOYMENT_GUIDE.md)
3. Review API documentation
4. Check browser console for errors

## License

MIT License - feel free to use this project!

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Happy coding! 🚀**
