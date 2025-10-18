# MongoDB Setup Guide for HealthMate

This guide will help you set up MongoDB for the HealthMate application.

## Option 1: MongoDB Atlas (Cloud - Recommended)

### Step 1: Create a MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Sign Up" and create a free account
3. Verify your email

### Step 2: Create a Cluster
1. After login, click "Create a Deployment"
2. Choose the **Free** tier (M0)
3. Select your preferred region (closest to your location)
4. Click "Create Deployment"
5. Wait for the cluster to be created (usually 5-10 minutes)

### Step 3: Create Database User
1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username: `healthmate_user`
5. Enter a strong password (save it!)
6. Click "Add User"

### Step 4: Whitelist IP Address
1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go back to "Clusters" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Drivers"
4. Select "Node.js" and version "4.x or later"
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `myFirstDatabase` with `healthmate`

Example connection string:
\`\`\`
mongodb+srv://healthmate_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/healthmate?retryWrites=true&w=majority
\`\`\`

### Step 6: Add to Environment Variables
1. Create a `.env.local` file in your project root
2. Add the connection string:
\`\`\`
MONGODB_URI=mongodb+srv://healthmate_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/healthmate?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
\`\`\`

## Option 2: MongoDB Community (Local)

### Step 1: Install MongoDB
- **Windows**: Download from [MongoDB Community](https://www.mongodb.com/try/download/community)
- **Mac**: `brew install mongodb-community`
- **Linux**: Follow [official guide](https://docs.mongodb.com/manual/administration/install-on-linux/)

### Step 2: Start MongoDB Service
- **Windows**: MongoDB should start automatically
- **Mac**: `brew services start mongodb-community`
- **Linux**: `sudo systemctl start mongod`

### Step 3: Add to Environment Variables
Create a `.env.local` file:
\`\`\`
MONGODB_URI=mongodb://localhost:27017/healthmate
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
\`\`\`

## Verify Connection

Run this command to test your connection:
\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` and try to register a new account. If successful, your MongoDB connection is working!

## Database Collections

The app automatically creates these collections:

### Users Collection
\`\`\`javascript
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  name: String,
  createdAt: Date
}
\`\`\`

### Reports Collection
\`\`\`javascript
{
  _id: ObjectId,
  userId: ObjectId,
  fileName: String,
  reportType: String,
  fileSize: Number,
  summary: String,
  analysis: {
    summary_en: String,
    summary_urdu: String,
    abnormal_values: [String],
    doctor_questions: [String],
    foods_to_avoid: [String],
    recommended_foods: [String],
    home_remedies: [String],
    disclaimer: String
  },
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### Vitals Collection
\`\`\`javascript
{
  _id: ObjectId,
  userId: ObjectId,
  type: String, // bp, sugar, weight, heart-rate, temperature, oxygen
  value: String,
  notes: String,
  createdAt: Date
}
\`\`\`

## Troubleshooting

### Connection Refused
- Make sure MongoDB is running
- Check your connection string is correct
- Verify IP whitelist (for Atlas)

### Authentication Failed
- Check username and password
- Ensure database user has access to the database
- Verify the database name in connection string

### Slow Queries
- Add indexes to frequently queried fields
- Consider upgrading your Atlas cluster tier

## Next Steps

1. Set up your `.env.local` file with MongoDB URI
2. Run `npm run dev`
3. Create an account and test the app
4. Upload a medical report to test the full flow

For more help, visit [MongoDB Documentation](https://docs.mongodb.com/)
