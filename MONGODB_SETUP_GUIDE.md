# MongoDB Setup and Integration Guide

## 🗄️ Complete Database Integration for AT-ICT LMS

This guide will help you set up MongoDB and connect the AT-ICT Learning Management System with a real database for the role-based authentication system.

## 📋 What You Need

Before starting, ensure you have:
- Node.js installed (v16+)
- Either MongoDB locally OR MongoDB Atlas account
- Git (for cloning the project)

## 🚀 Option 1: Local MongoDB Setup (Recommended for Development)

### Step 1: Install MongoDB

#### Windows:
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Run the installer
3. During installation, install MongoDB as a service
4. Install MongoDB Compass (GUI tool)

#### macOS (using Homebrew):
```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb/brew/mongodb-community
```

#### Linux (Ubuntu/Debian):
```bash
# Import public key
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Step 2: Verify MongoDB Installation
```bash
# Check if MongoDB is running
mongosh

# You should see MongoDB shell
# Type 'exit' to quit
```

## ☁️ Option 2: MongoDB Atlas (Cloud Database)

### Step 1: Create Atlas Account
1. Go to https://www.mongodb.com/atlas
2. Sign up for free account
3. Create a new project

### Step 2: Create Cluster
1. Click "Create a New Cluster"
2. Choose "Shared" (free tier)
3. Select a cloud provider and region
4. Name your cluster (e.g., "at-ict-lms")
5. Click "Create Cluster" (takes 3-5 minutes)

### Step 3: Configure Database Access
1. Go to "Database Access" → "Add New Database User"
2. Create username/password (remember these!)
3. Set permissions to "Read and write to any database"

### Step 4: Configure Network Access
1. Go to "Network Access" → "Add IP Address"
2. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
3. For production: Add only your server's IP

### Step 5: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your actual password

## 🔧 Backend Configuration

### Step 1: Install Dependencies
Navigate to your backend folder and install required packages:

```bash
cd backend
npm install bcryptjs cors dotenv express jsonwebtoken mongoose multer socket.io nodemailer express-validator express-rate-limit helmet morgan colors
```

### Step 2: Create Environment File
Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000

# MongoDB Configuration
# For Local MongoDB:
MONGO_URI=mongodb://localhost:27017/atict_lms

# For MongoDB Atlas (replace with your connection string):
# MONGO_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/atict_lms

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_make_it_very_long_and_secure_2024
JWT_EXPIRE=30d

# Security Settings
BCRYPT_ROUNDS=10

# File Upload Settings
MAX_FILE_UPLOAD=1000000
FILE_UPLOAD_PATH=./public/uploads

# Email Settings (Optional for now)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Client URL for CORS
CLIENT_URL=http://localhost:3000
```

### Step 3: Update package.json Scripts
Make sure your `backend/package.json` has these scripts:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  }
}
```

### Step 4: Start Backend Server
```bash
# From backend directory
npm run dev
```

You should see:
```
🚀 AT-ICT LMS Server running in development mode
📡 Server: http://localhost:5000
🏥 Health: http://localhost:5000/health
🗄️ Database: Connected
```

## 🎨 Frontend Configuration

### Step 1: Install Dependencies
```bash
cd client
npm install
```

### Step 2: Start Frontend
```bash
npm start
```

Frontend will open at http://localhost:3000

## 🧪 Testing the Database Connection

### Test 1: Health Check
Visit http://localhost:5000/health - should return:
```json
{
  "status": "success",
  "message": "AT-ICT LMS API is running",
  "timestamp": "2024-XX-XX...",
  "environment": "development"
}
```

### Test 2: Database Check
Use MongoDB Compass or mongosh to verify:

#### Using MongoDB Compass:
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. You should see `atict_lms` database after first user registration

#### Using Command Line:
```bash
mongosh
use atict_lms
show collections
```

## 👥 Creating Initial Users

### 1. Register a Student (via Frontend)
1. Go to http://localhost:3000/register
2. Fill out the multi-step form
3. Submit registration
4. Student will be in "pending" status

### 2. Create Teacher Account (Manual)
Since teachers need special privileges, create manually in MongoDB:

```javascript
// Connect to MongoDB
mongosh
use atict_lms

// Create teacher account
db.users.insertOne({
  firstName: "Ahmad",
  lastName: "Khoja", 
  email: "teacher@atict.com",
  password: "$2a$10$rEuiSFeFBLlhCJq/VK1r4e/N3R.NGgSLjw8.mVkE.k/TgYF5PHQKO", // "teacher123"
  role: "teacher",
  contactNumber: "+92 300 1234567",
  teacherInfo: {
    subject: "Computer Science",
    qualification: "Masters in Computer Science", 
    experience: 5,
    joinDate: new Date()
  },
  registrationStatus: "approved",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### 3. Login as Teacher and Approve Students
1. Go to http://localhost:3000/signin
2. Login with: teacher@atict.com / teacher123
3. Go to Teacher Dashboard → New Registrations
4. Approve pending student registrations

### 4. Create Parent Account
```javascript
// First, get a student ID
db.users.findOne({role: "student"})
// Copy the _id

// Create parent account
db.users.insertOne({
  firstName: "Sarah",
  lastName: "Ahmed",
  email: "parent@example.com", 
  password: "$2a$10$rEuiSFeFBLlhCJq/VK1r4e/N3R.NGgSLjw8.mVkE.k/TgYF5PHQKO", // "parent123"
  role: "parent",
  contactNumber: "+92 300 9876543",
  parentInfo: {
    children: [{
      studentId: ObjectId("PASTE_STUDENT_ID_HERE"),
      relationship: "mother", 
      isPrimary: true
    }],
    emergencyContact: {
      name: "John Ahmed",
      relationship: "father",
      phone: "+92 300 1111111"
    }
  },
  registrationStatus: "approved",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## 🔍 Database Schema Overview

The system uses these main collections:

### users
Stores all user accounts (students, teachers, parents) with role-specific data:
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String, 
  email: String,
  password: String (hashed),
  role: "student" | "teacher" | "parent",
  contactNumber: String,
  studentInfo: {...}, // Only for students
  teacherInfo: {...}, // Only for teachers  
  parentInfo: {...}, // Only for parents
  registrationStatus: "pending" | "approved" | "rejected",
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### assignments (Future)
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  createdBy: ObjectId (teacher),
  assignedTo: [ObjectId] (students),
  dueDate: Date,
  maxScore: Number,
  submissions: [...],
  createdAt: Date
}
```

## 🐛 Common Issues & Solutions

### Issue 1: "MongooseServerSelectionError"
**Problem**: Can't connect to MongoDB
**Solutions**:
- Check if MongoDB service is running
- Verify MONGO_URI in .env file
- For Atlas: Check network access and credentials

### Issue 2: "Authentication failed"
**Problem**: Wrong MongoDB credentials
**Solutions**:
- Double-check username/password in connection string
- Ensure user has database permissions
- For Atlas: Verify database user is created

### Issue 3: "Port 5000 already in use"
**Problem**: Something else using port 5000
**Solutions**:
```bash
# Kill process on port 5000
npx kill-port 5000

# Or change port in .env file
PORT=5001
```

### Issue 4: "JWT must be provided"
**Problem**: Frontend not sending authentication token
**Solutions**:
- Check localStorage for 'token'
- Verify login is working
- Check browser network tab for Authorization header

## 🚀 Production Considerations

### Security
1. **Strong JWT Secret**: Use a long, random string
2. **Environment Variables**: Never commit .env to git
3. **Database Security**: Restrict IP access, use strong passwords
4. **HTTPS**: Use SSL certificates in production

### Performance
1. **Indexes**: Add database indexes for common queries
2. **Connection Pooling**: MongoDB driver handles this automatically
3. **Caching**: Consider Redis for session storage

### Monitoring
1. **Health Checks**: Use /health endpoint
2. **Logging**: Add structured logging
3. **Error Tracking**: Use tools like Sentry

## 📞 Need Help?

### Debugging Steps:
1. Check server console for error messages
2. Verify .env file configuration
3. Test database connection with MongoDB Compass
4. Use browser dev tools to check network requests
5. Check that all required ports are open

### Common Commands:
```bash
# Check MongoDB status
sudo systemctl status mongod

# Restart MongoDB
sudo systemctl restart mongod

# View logs
sudo journalctl -u mongod

# Connect to database
mongosh atict_lms
```

The database is now fully integrated and ready to support your role-based Learning Management System! 🎉 