# Firebase Security Rules Deployment Guide

This guide will walk you through deploying the Firebase Realtime Database security rules to protect your application data.

## Overview

The security rules have been created in `database.rules.json` and the application code has been updated to:
- Use Firebase UID instead of display names for database paths
- Include authentication tokens in all database requests
- Properly handle guest user access

## Prerequisites

- Access to Firebase Console (https://console.firebase.google.com)
- Admin/Owner permissions for your Firebase project

## Deployment Steps

### Step 1: Access Firebase Console

1. Go to https://console.firebase.google.com
2. Select your project: **precision-gym**
3. In the left sidebar, click on **Realtime Database**

### Step 2: Navigate to Rules Tab

1. In the Realtime Database section, click on the **Rules** tab (at the top)
2. You should see the current rules (likely default rules or empty)

### Step 3: Copy the Security Rules

1. Open the file `database.rules.json` in your project root
2. Copy the **entire contents** of the file
3. Return to Firebase Console

### Step 4: Paste and Publish Rules

1. In the Firebase Console Rules editor, select all existing content (Ctrl+A or Cmd+A)
2. Paste the new rules from `database.rules.json`
3. Click the **Publish** button in the top-right corner
4. Confirm the publication when prompted

### Step 5: Test Rules with Simulator

Before going live, test the rules using Firebase's built-in simulator:

1. Click on the **Rules Playground** tab (next to Rules)
2. Test the following scenarios:

**Test 1: Authenticated User Read (Should Succeed)**
- Location: `/users/{your-uid}/routines`
- Type: Read
- Authentication: Authenticated (your UID)
- Expected: ✅ Allowed

**Test 2: Unauthorized Access (Should Fail)**
- Location: `/users/other-user-id/routines`
- Type: Read
- Authentication: Authenticated (your UID)
- Expected: ❌ Denied

**Test 3: Guest User Access (Should Succeed)**
- Location: `/users/guest/routines`
- Type: Read
- Authentication: Authenticated (any UID)
- Expected: ✅ Allowed

**Test 4: Unauthenticated Access (Should Fail)**
- Location: `/users/{any-uid}/routines`
- Type: Read
- Authentication: None
- Expected: ❌ Denied

### Step 6: Verify Application Still Works

After publishing rules, test your application:

1. Start your development server: `npm run dev`
2. Test the following workflows:

**Sign Up / Sign In:**
- [ ] Create new account
- [ ] Sign in with existing account
- [ ] See your routines loaded correctly

**Create & Read Data:**
- [ ] Create a new routine
- [ ] Add exercises to a routine
- [ ] View existing routines

**Update Data:**
- [ ] Update exercise name
- [ ] Update weight/reps
- [ ] Add a new workout day

**Delete Data:**
- [ ] Delete an exercise
- [ ] Verify data is removed

**Guest Access:**
- [ ] Sign in as guest
- [ ] Create routine as guest
- [ ] Sign out (guest data should be deleted)

### Step 7: Check Browser Console

While testing, keep the browser console open (F12):

- Look for any authentication errors
- Check for "Permission denied" messages
- Verify no unexpected errors

## What the Rules Do

The deployed security rules:

1. **Authentication Required**: All database access requires a valid Firebase authentication token
2. **User Isolation**: Users can only access their own data at `/users/{their-uid}/`
3. **Guest Access**: Special handling for `/users/guest/` path (shared for all guests)
4. **Data Validation**: Validates structure of routines, exercises, sets, and reps
5. **Limits**: Enforces reasonable limits on:
   - String lengths (routine/exercise names: 100 chars max)
   - Numeric ranges (weight: 0-10000 kg, reps: 0-5)
   - Array sizes (max 50 exercises, 20 sets, 50 reps)

## Troubleshooting

### Error: "Permission Denied"

**Cause**: User trying to access data without proper authentication

**Solution**:
- Check that user is signed in
- Verify auth token is being sent in requests
- Check browser console for authentication errors

### Error: "Data validation failed"

**Cause**: Data structure doesn't match security rules validation

**Solution**:
- Check that all required fields are present (id, name, sets for exercises)
- Verify data types (numbers are numbers, strings are strings)
- Check that array sizes are within limits

### Application loads but no data appears

**Cause**: User might be trying to access wrong path or rules are too restrictive

**Solution**:
- Check browser Network tab to see the actual database URL being requested
- Verify the URL uses Firebase UID (not display name)
- Check that response status is 200 (not 401 or 403)

### Guest user cannot access data

**Cause**: Guest path might not be set up correctly

**Solution**:
- Verify guest users have displayName set to "guest"
- Check that code uses "guest" string as path (not Firebase UID)
- Look in Firebase Console → Authentication to see guest user details

## Rollback Instructions

If you need to rollback to previous rules:

1. Go to Firebase Console → Realtime Database → Rules
2. Click on **History** (next to Publish button)
3. Select a previous version
4. Click **Restore**
5. Click **Publish**

## Important Security Notes

⚠️ **Do NOT**:
- Share your Firebase API keys publicly (they're in `.env` file - keep it private)
- Modify rules to allow unauthenticated access
- Remove data validation rules
- Increase limits excessively (can impact performance)

✅ **Do**:
- Keep `.env` file in `.gitignore`
- Regularly review Firebase Console → Authentication for suspicious users
- Monitor Firebase Console → Realtime Database → Usage for unusual patterns
- Update rules if you add new data structures

## Code Changes Made

The following files were modified to work with the security rules:

1. **database.rules.json** (new file)
   - Contains all security rules

2. **src/context/AppProvider.tsx**
   - Added Firebase auth import
   - Created `getUserId()` helper function
   - Created `getAuthHeaders()` helper function
   - Updated all fetch calls to use UID instead of displayName
   - Added authentication tokens to all requests

3. **src/components/auth/AuthDetails.tsx**
   - Updated guest cleanup to only delete guest data
   - Added authentication token to DELETE request

## Next Steps

After successful deployment:

1. Consider setting up Firebase Emulator Suite for local testing
2. Add client-side input validation for better UX
3. Implement rate limiting for write operations
4. Set up monitoring/alerts in Firebase Console
5. Consider migrating to Firebase SDK methods instead of REST API

## Support

If you encounter issues:
- Check Firebase Console → Realtime Database → Usage for error logs
- Review browser console for client-side errors
- Check Network tab to see actual requests being made
- Test rules in Rules Playground before modifying production rules

---

**Deployment Date**: _________________
**Deployed By**: _________________
**Rules Version**: 1.0.0
**Status**: ⬜ Not Deployed | ⬜ Deployed | ⬜ Verified
