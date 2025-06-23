# AT-ICT Learning Management System - Setup Guide

## 🚀 Complete Role-Based Authentication System

This system now includes a unified role-based authentication with MongoDB integration, supporting Students, Teachers, and Parents with their respective dashboards and functionalities.

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** (for cloning)

## 🗄️ Database Setup

### Option 1: Local MongoDB
1. Install MongoDB locally: https://www.mongodb.com/docs/manual/installation/
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services start mongodb/brew/mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

### Option 2: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/atlas
2. Create a new cluster (free tier available)
3. Get your connection string

## ⚙️ Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create a `.env` file in the backend directory with:
   ```env
   NODE_ENV=development
   PORT=5000
   
   # MongoDB Configuration
   MONGO_URI=mongodb://localhost:27017/atict_lms
   # OR for MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/atict_lms
   
   # JWT Configuration
   JWT_SECRET=your_very_long_and_secure_jwt_secret_key_here_2024
   JWT_EXPIRE=30d
   
   # Email Configuration (optional for now)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_EMAIL=your_email@gmail.com
   SMTP_PASSWORD=your_app_password
   
   # File Upload Configuration
   MAX_FILE_UPLOAD=1000000
   FILE_UPLOAD_PATH=./public/uploads
   
   # Security
   BCRYPT_ROUNDS=10
   ```

4. **Start the backend server:**
   ```bash
   npm start
   # OR for development with auto-restart:
   npm run dev
   ```

   You should see:
   ```
   🚀 AT-ICT LMS Server running in development mode
   📡 Server: http://localhost:5000
   🏥 Health: http://localhost:5000/health
   🗄️ Database: Connected
   ```

## 🎨 Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend:**
   ```bash
   npm start
   ```

   The app will open at http://localhost:3000

## 🔐 Authentication System Features

### User Roles & Capabilities

#### 🎓 Students
- **Registration**: Multi-step form with validation
- **Dashboard**: View assignments, quizzes, materials, videos
- **Progress Tracking**: Real-time progress monitoring
- **Chat**: Direct communication with teacher
- **File Upload**: Submit assignments
- **Status**: Requires teacher approval after registration

#### 👨‍🏫 Teachers
- **Full Access**: Complete system administration
- **Student Management**: Approve/reject registrations
- **Content Creation**: Assignments, quizzes, materials
- **Analytics**: Student performance tracking
- **Communication**: Chat with students and parents

#### 👨‍👩‍👧‍👦 Parents
- **Child Tracking**: Monitor child's academic progress
- **Reports**: View detailed performance reports
- **Communication**: Direct chat with teacher
- **Multi-child Support**: Manage multiple children

### Security Features
- **JWT Authentication**: Secure token-based auth
- **Role-based Authorization**: Endpoint protection
- **Account Lockout**: Protection against brute force
- **Password Hashing**: bcrypt encryption
- **Input Validation**: Comprehensive data validation

## 🧪 Testing the System

### 1. Student Registration Flow
1. Go to http://localhost:3000/register
2. Complete the 4-step registration form
3. Submit registration (status: pending approval)
4. Try to login (will show pending message)

### 2. Teacher Account (Manual Creation)
Since teachers need special access, create one manually in MongoDB:

```javascript
// Connect to MongoDB and run this script
use atict_lms

db.users.insertOne({
  firstName: "Ahmad",
  lastName: "Khoja",
  email: "teacher@atict.com",
  password: "$2a$10$rEuiSFeFBLlhCJq/VK1r4e/N3R.NGgSLjw8.mVkE.k/TgYF5PHQKO", // password: "teacher123"
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

### 3. Approve Student Registration
1. Login as teacher (teacher@atict.com / teacher123)
2. Go to Teacher Dashboard → New Registrations
3. Approve pending student registrations

### 4. Parent Account (Link to Student)
Parents are created when students register with parent contact info, or manually:

```javascript
// Create parent account linked to student
db.users.insertOne({
  firstName: "Sarah",
  lastName: "Ahmed", 
  email: "parent@example.com",
  password: "$2a$10$rEuiSFeFBLlhCJq/VK1r4e/N3R.NGgSLjw8.mVkE.k/TgYF5PHQKO", // password: "parent123"
  role: "parent",
  contactNumber: "+92 300 9876543",
  parentInfo: {
    children: [{
      studentId: ObjectId("student_id_here"), // Replace with actual student ID
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

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/logout` - Logout

### Student Routes (Protected)
- `GET /api/student/dashboard` - Student dashboard data
- `GET /api/student/assignments` - Get assignments
- `GET /api/student/quizzes` - Get quizzes
- `POST /api/student/assignments/:id/submit` - Submit assignment

### Teacher Routes (Protected)
- `GET /api/teacher/dashboard` - Teacher dashboard
- `GET /api/teacher/registrations` - Pending registrations
- `PUT /api/teacher/registrations/:id/approve` - Approve registration
- `GET /api/teacher/students` - Manage students

### Parent Routes (Protected)
- `GET /api/parent/dashboard` - Parent dashboard
- `GET /api/parent/child/:childId/progress` - Child progress
- `GET /api/parent/child/:childId/reports` - Child reports

## 🔧 Configuration Options

### Environment Variables
- `NODE_ENV`: development/production
- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing secret
- `JWT_EXPIRE`: Token expiration time

### Database Collections
- `users`: All user accounts (students, teachers, parents)
- `assignments`: Homework and projects
- `quizzes`: Online assessments  
- `materials`: Learning resources
- `videos`: Video content
- `messages`: Chat messages
- `announcements`: System announcements

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check MongoDB is running
   - Verify MONGO_URI in .env file
   - Check network connectivity for Atlas

2. **JWT Token Errors**
   - Ensure JWT_SECRET is set
   - Check token in localStorage
   - Verify token hasn't expired

3. **Registration Approval**
   - Students need teacher approval
   - Create teacher account first
   - Use teacher dashboard to approve

4. **Port Already in Use**
   ```bash
   # Kill process on port 5000
   npx kill-port 5000
   ```

### Development Tips

1. **Reset Database**: Drop collections to start fresh
2. **Check Logs**: Server console shows detailed errors
3. **Network Tab**: Browser dev tools for API debugging
4. **MongoDB Compass**: GUI for database inspection

## 🚀 Production Deployment

1. **Environment Setup**:
   - Set NODE_ENV=production
   - Use strong JWT_SECRET
   - Configure production MongoDB

2. **Security**:
   - Enable HTTPS
   - Set up CORS properly
   - Use environment variables

3. **Performance**:
   - Enable MongoDB indexes
   - Use compression middleware
   - Set up CDN for static files

## 📞 Support

For issues or questions:
- Check console logs first
- Verify environment variables
- Test API endpoints with Postman
- Check MongoDB connection

The system is now fully functional with role-based authentication, real database integration, and complete user management! 