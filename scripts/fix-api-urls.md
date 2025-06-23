# Fix Hardcoded API URLs

## Files that need to be updated:

Based on the search results, these files contain hardcoded `localhost:5000` URLs that need to be replaced:

### Authentication Files:
- `client/src/pages/auth/SignIn.jsx` (Line 84)
- `client/src/pages/auth/Registration.jsx` (Lines 183, 185)

### Dashboard Files:
- `client/src/pages/portal/TeacherDashboard.jsx` (Lines 174, 194)
- `client/src/pages/portal/StudentDashboard.jsx` (Line 154)
- `client/src/pages/portal/ParentDashboard.jsx` (Line 66)

### Teacher Components:
- `client/src/components/teacher/StudentManagement.jsx` (Lines 59, 81, 103, 130, 160, 191)
- `client/src/components/teacher/ScheduleBuilder.jsx` (Lines 53, 83, 116)
- `client/src/components/teacher/PendingRegistrations.jsx` (Lines 28, 54)
- `client/src/components/teacher/MaterialsCenter.jsx` (Lines 55, 132, 133, 137, 188, 222, 575)
- `client/src/components/teacher/CreateQuizModal.jsx` (Lines 61, 96)
- `client/src/components/teacher/CreateAssignmentModal.jsx` (Lines 57, 153)
- `client/src/components/teacher/ChatCenter.jsx` (Lines 51, 81, 134, 181, 200)
- `client/src/components/teacher/AssignmentSubmissions.jsx` (Lines 31, 57)
- `client/src/components/teacher/AnnouncementCenter.jsx` (Lines 61, 128, 177)

### Student Components:
- `client/src/components/student/ScheduleTab.jsx` (Line 126)
- `client/src/components/student/QuizzesTab.jsx` (Lines 53, 169, 209)
- `client/src/components/student/MaterialsTab.jsx` (Lines 39, 65, 155, 456)
- `client/src/components/student/DashboardOverview.jsx` (Lines 26, 298)
- `client/src/components/student/ChatTab.jsx` (Lines 48, 74, 119, 149, 168)

## How to Fix:

1. **Import the API config** at the top of each file:
```javascript
import { API_ENDPOINTS } from '../../config/api';
```

2. **Replace hardcoded URLs** with the appropriate endpoint from API_ENDPOINTS

## Example Fixes:

### Before:
```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
```

### After:
```javascript
import { API_ENDPOINTS } from '../../config/api';
const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
```

### For dynamic URLs:
```javascript
// Before:
const response = await fetch(`http://localhost:5000/api/teacher/students/${studentId}`, {

// After:
const response = await fetch(`${API_ENDPOINTS.BASE_URL}/api/teacher/students/${studentId}`, {
```

## Total Files to Update: ~15 files with 40+ URL instances

This is the most critical fix needed for production deployment! 