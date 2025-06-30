# Google Authentication Integration Guide

## Overview
This document outlines the steps needed to integrate Google OAuth 2.0 authentication with the frontend application.

## Frontend Implementation Status
✅ **Completed:**
- Google login button added to LoginPage component
- Loading states implemented
- UI/UX design completed
- Placeholder handler function created

## Backend Implementation Required

### 1. Google OAuth Setup
```bash
# Install required packages
npm install google-auth-library
# or
npm install passport passport-google-oauth20
```

### 2. Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/auth/google/callback` (development)
   - `https://yourdomain.com/auth/google/callback` (production)

### 3. Environment Variables
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
```

### 4. Backend Endpoints Needed

#### POST /auth/google
- Receives Google ID token from frontend
- Verifies token with Google
- Creates/updates user in database
- Returns JWT token and user data

```javascript
// Example response
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@gmail.com",
    "name": "User Name",
    "avatar": "profile_image_url"
  }
}
```

### 5. Frontend Integration Points

#### File: `src/components/LoginPage.tsx`
- **Function:** `handleGoogleLogin()` on line ~23
- **Current Status:** Placeholder implementation
- **Required:** Replace with actual Google OAuth flow

#### Expected Flow:
1. User clicks "Masuk dengan Google" button
2. Frontend calls Google OAuth API
3. User completes Google authentication
4. Google returns ID token
5. Frontend sends token to backend `/auth/google` endpoint
6. Backend validates token and returns JWT
7. Frontend stores JWT and calls `onLogin()`

### 6. Security Considerations
- Validate Google ID tokens server-side
- Implement proper CORS settings
- Use HTTPS in production
- Store JWT securely (httpOnly cookies recommended)
- Implement token refresh mechanism

### 7. Database Schema
```sql
-- Users table example
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar VARCHAR(500),
  google_id VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 8. Testing
- Test with multiple Google accounts
- Test error scenarios (cancelled login, network errors)
- Test token expiration handling
- Test on different devices/browsers

## Frontend Code Locations
- **Login Component:** `src/components/LoginPage.tsx`
- **Google Login Handler:** Line ~23 in LoginPage.tsx
- **App Component:** `src/App.tsx` (handles login state)

## Notes for Frontend Team
- The `handleGoogleLogin` function currently simulates the flow
- Loading states are already implemented
- Error handling UI can be added as needed
- The function calls `onLogin()` on successful authentication
