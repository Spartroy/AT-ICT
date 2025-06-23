const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  // Basic Information
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxLength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxLength: [50, 'Last name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  
  // Role-based Information
  role: {
    type: String,
    enum: ['student', 'teacher', 'parent'],
    required: [true, 'Role is required']
  },
  
  // Contact Information
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required']
  },
  alternativeNumber: {
    type: String
  },
  
  // Address
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String
  },
  
  // Student-specific fields
  studentInfo: {
    studentId: {
      type: String,
      unique: true,
      sparse: true // Only applies when field exists
    },
    year: {
      type: Number,
      enum: [10, 11, 12]
    },
    session: {
      type: String,
      enum: ['NOV 25', 'JUN 26']
    },
    nationality: String,
    school: String,
    isRetaker: {
      type: Boolean,
      default: false
    },
    parentContactNumber: String,
    techKnowledge: {
      type: Number,
      min: 1,
      max: 10
    },
    otherSubjects: String,
    currentGrade: String,
    targetGrade: {
      type: String,
      default: 'A*'
    },
    overallProgress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    enrolledDate: Date,
    isActive: {
      type: Boolean,
      default: true
    }
  },
  
  // Teacher-specific fields
  teacherInfo: {
    employeeId: {
      type: String,
      unique: true,
      sparse: true
    },
    subject: {
      type: String,
      default: 'Computer Science'
    },
    qualification: String,
    experience: Number,
    joinDate: Date,
    isActive: {
      type: Boolean,
      default: true
    }
  },
  
  // Parent-specific fields
  parentInfo: {
    children: [{
      studentId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      relationship: {
        type: String,
        enum: ['mother', 'father', 'guardian']
      },
      isPrimary: {
        type: Boolean,
        default: false
      }
    }],
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String
    },
    notificationPreferences: {
      email: {
        grades: { type: Boolean, default: true },
        attendance: { type: Boolean, default: true },
        assignments: { type: Boolean, default: true },
        announcements: { type: Boolean, default: true },
        fees: { type: Boolean, default: true }
      },
      sms: {
        grades: { type: Boolean, default: false },
        attendance: { type: Boolean, default: true },
        assignments: { type: Boolean, default: false },
        announcements: { type: Boolean, default: false },
        fees: { type: Boolean, default: true }
      }
    }
  },
  
  // Registration status
  registrationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  
  // Security and tracking
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  lastLogin: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date,
  
  // Profile
  avatar: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ 'studentInfo.studentId': 1 });
userSchema.index({ 'teacherInfo.employeeId': 1 });
userSchema.index({ registrationStatus: 1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash password if it has been modified
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Pre-save middleware to generate student ID
userSchema.pre('save', async function(next) {
  if (this.role === 'student' && this.isNew && !this.studentInfo.studentId) {
    const year = new Date().getFullYear();
    const count = await this.constructor.countDocuments({ 
      role: 'student',
      'studentInfo.studentId': { $exists: true }
    });
    this.studentInfo.studentId = `AT${year}${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Pre-save middleware to generate employee ID
userSchema.pre('save', async function(next) {
  if (this.role === 'teacher' && this.isNew && !this.teacherInfo.employeeId) {
    const count = await this.constructor.countDocuments({ 
      role: 'teacher',
      'teacherInfo.employeeId': { $exists: true }
    });
    this.teacherInfo.employeeId = `EMP${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Instance method to check password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Instance method to generate JWT token
userSchema.methods.getSignedJwtToken = function() {
  const jwtSecret = process.env.JWT_SECRET || 'fallback_jwt_secret_for_development';
  const jwtExpire = process.env.JWT_EXPIRE || '30d';
  
  return jwt.sign(
    { 
      id: this._id, 
      role: this.role,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName
    },
    jwtSecret,
    { expiresIn: jwtExpire }
  );
};

// Instance method to check if account is locked
userSchema.methods.isLocked = function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
};

// Instance method to increment login attempts
userSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked()) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 };
  }
  
  return this.updateOne(updates);
};

// Instance method to reset login attempts
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: {
      loginAttempts: 1,
      lockUntil: 1
    }
  });
};

// Static method to find users by role
userSchema.statics.findByRole = function(role) {
  return this.find({ role, isActive: true });
};

// Static method to find pending registrations
userSchema.statics.findPendingRegistrations = function() {
  return this.find({ 
    registrationStatus: 'pending',
    role: 'student'
  }).sort({ createdAt: -1 });
};

// Static method to find students by parent
userSchema.statics.findStudentsByParent = function(parentId) {
  return this.find({
    'parentInfo.children.studentId': parentId
  }).populate('parentInfo.children.studentId');
};

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for dashboard URL based on role
userSchema.virtual('dashboardUrl').get(function() {
  switch(this.role) {
    case 'student': return '/student-dashboard';
    case 'teacher': return '/teacher-dashboard';
    case 'parent': return '/parent-dashboard';
    default: return '/';
  }
});

// Method to get role-specific data
userSchema.methods.getRoleData = function() {
  switch(this.role) {
    case 'student':
      return this.studentInfo;
    case 'teacher':
      return this.teacherInfo;
    case 'parent':
      return this.parentInfo;
    default:
      return {};
  }
};

// Method to update role-specific data
userSchema.methods.updateRoleData = function(data) {
  switch(this.role) {
    case 'student':
      this.studentInfo = { ...this.studentInfo, ...data };
      break;
    case 'teacher':
      this.teacherInfo = { ...this.teacherInfo, ...data };
      break;
    case 'parent':
      this.parentInfo = { ...this.parentInfo, ...data };
      break;
  }
  return this.save();
};

module.exports = mongoose.model('User', userSchema); 