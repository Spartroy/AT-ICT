const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      contactNumber,
      alternativeNumber,
      address,
      // Student-specific fields
      year,
      session,
      nationality,
      school,
      isRetaker,
      parentContactNumber,
      techKnowledge,
      otherSubjects,
      // Teacher-specific fields
      qualification,
      experience,
      // Parent-specific fields
      emergencyContact
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'User with this email already exists'
      });
    }

    // Create base user object
    const userData = {
      firstName,
      lastName,
      email,
      password,
      role,
      contactNumber,
      alternativeNumber,
      address
    };

    // Add role-specific data
    switch (role) {
      case 'student':
        userData.studentInfo = {
          year,
          session,
          nationality,
          school,
          isRetaker: isRetaker || false,
          parentContactNumber,
          techKnowledge,
          otherSubjects,
          enrolledDate: new Date()
        };
        // Students need approval
        userData.registrationStatus = 'pending';
        break;

      case 'teacher':
        userData.teacherInfo = {
          qualification,
          experience,
          joinDate: new Date()
        };
        // Teachers are auto-approved for now
        userData.registrationStatus = 'approved';
        break;

      case 'parent':
        userData.parentInfo = {
          emergencyContact,
          children: []
        };
        // Parents are auto-approved
        userData.registrationStatus = 'approved';
        break;

      default:
        return res.status(400).json({
          status: 'error',
          message: 'Invalid role specified'
        });
    }

    // Create user
    const user = await User.create(userData);

    // Generate token
    const token = user.getSignedJwtToken();

    // Remove password from response
    const userResponse = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      registrationStatus: user.registrationStatus,
      dashboardUrl: user.dashboardUrl,
      roleData: user.getRoleData(),
      createdAt: user.createdAt
    };

    res.status(201).json({
      status: 'success',
      message: role === 'student' 
        ? 'Registration successful! Awaiting approval from admin.' 
        : 'Registration successful!',
      data: {
        user: userResponse,
        token
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: 'Validation Error',
        errors: messages
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        status: 'error',
        message: `${field} already exists`
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Server error during registration'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    console.log('🔍 Login attempt for:', req.body.email);
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({
        status: 'error',
        message: 'Please provide email and password'
      });
    }

    // Check for user (include password for comparison)
    console.log('🔎 Looking up user in database...');
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log('❌ User not found');
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    console.log('✅ User found:', user.firstName, user.lastName);

    // Check if account is locked
    console.log('🔒 Checking account lock status...');
    if (user.isLocked()) {
      console.log('❌ Account is locked');
      return res.status(423).json({
        status: 'error',
        message: 'Account temporarily locked due to too many failed login attempts'
      });
    }

    // Check if account is active
    console.log('🔍 Checking if account is active...');
    if (!user.isActive) {
      console.log('❌ Account is not active');
      return res.status(401).json({
        status: 'error',
        message: 'Account has been deactivated'
      });
    }

    // Check password
    console.log('🔐 Checking password...');
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      console.log('❌ Password does not match');
      // Increment login attempts
      await user.incLoginAttempts();
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }
    
    console.log('✅ Password matches');

    // Check registration status for students
    if (user.role === 'student' && user.registrationStatus !== 'approved') {
      let message = 'Your registration is pending approval';
      if (user.registrationStatus === 'rejected') {
        message = 'Your registration has been rejected. Please contact support.';
      }
      return res.status(403).json({
        status: 'error',
        message
      });
    }

    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    console.log('🎫 Generating JWT token...');
    const token = user.getSignedJwtToken();
    console.log('✅ JWT token generated successfully');

    // Prepare user response
    console.log('📦 Preparing user response...');
    const userResponse = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      registrationStatus: user.registrationStatus,
      dashboardUrl: user.dashboardUrl,
      roleData: user.getRoleData(),
      lastLogin: user.lastLogin
    };

    console.log('🎉 Login successful, sending response...');
    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        user: userResponse,
        token
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      status: 'error',
      message: 'Server error during login'
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    const userResponse = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      registrationStatus: user.registrationStatus,
      dashboardUrl: user.dashboardUrl,
      roleData: user.getRoleData(),
      lastLogin: user.lastLogin,
      createdAt: user.createdAt
    };

    res.status(200).json({
      status: 'success',
      data: {
        user: userResponse
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error retrieving user data'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    const {
      firstName,
      lastName,
      contactNumber,
      alternativeNumber,
      address,
      roleSpecificData
    } = req.body;

    // Update basic fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (contactNumber) user.contactNumber = contactNumber;
    if (alternativeNumber) user.alternativeNumber = alternativeNumber;
    if (address) user.address = { ...user.address, ...address };

    // Update role-specific data
    if (roleSpecificData) {
      await user.updateRoleData(roleSpecificData);
    } else {
      await user.save();
    }

    const userResponse = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      registrationStatus: user.registrationStatus,
      dashboardUrl: user.dashboardUrl,
      roleData: user.getRoleData(),
      updatedAt: user.updatedAt
    };

    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      data: {
        user: userResponse
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error updating profile'
    });
  }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide both current and new password'
      });
    }

    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        status: 'error',
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error changing password'
    });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
const logout = async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully',
      data: {}
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during logout'
    });
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'No user found with this email'
      });
    }

    // For now, just return success (implement email functionality later)
    res.status(200).json({
      status: 'success',
      message: 'Password reset instructions sent to email'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error processing forgot password request'
    });
  }
};

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:resettoken
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { resettoken } = req.params;

    // For now, just return success (implement token functionality later)
    res.status(200).json({
      status: 'success',
      message: 'Password has been reset successfully'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error resetting password'
    });
  }
};

// @desc    Get dashboard URL based on user role
// @route   GET /api/auth/dashboard-url
// @access  Private
const getDashboardUrl = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        dashboardUrl: user.dashboardUrl,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Get dashboard URL error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error retrieving dashboard URL'
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  logout,
  getDashboardUrl
}; 