// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  },
  STUDENT: {
    DASHBOARD: `${API_BASE_URL}/api/student/dashboard`,
    MATERIALS: `${API_BASE_URL}/api/student/materials`,
    ASSIGNMENTS: `${API_BASE_URL}/api/student/assignments`,
    QUIZZES: `${API_BASE_URL}/api/student/quizzes`,
    SCHEDULE: `${API_BASE_URL}/api/student/schedule`,
  },
  TEACHER: {
    DASHBOARD: `${API_BASE_URL}/api/teacher/dashboard`,
    STUDENTS: `${API_BASE_URL}/api/teacher/students`,
    MATERIALS: `${API_BASE_URL}/api/teacher/materials`,
    SCHEDULE: `${API_BASE_URL}/api/teacher/schedule`,
  },
  PARENT: {
    DASHBOARD: `${API_BASE_URL}/api/parent/dashboard`,
  },
  CHAT: {
    SEND: `${API_BASE_URL}/api/chat/send`,
    CONVERSATIONS: `${API_BASE_URL}/api/chat/conversations`,
    FILES: `${API_BASE_URL}/api/chat/files`,
  },
  ANNOUNCEMENTS: `${API_BASE_URL}/api/announcements`,
  ASSIGNMENTS: `${API_BASE_URL}/api/assignments`,
  QUIZZES: `${API_BASE_URL}/api/quizzes`,
  REGISTRATION: `${API_BASE_URL}/api/registration`,
};

// Utility function to build URLs
export const buildApiUrl = (endpoint, params = {}) => {
  let url = endpoint;
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });
  return url;
};

export default API_ENDPOINTS; 