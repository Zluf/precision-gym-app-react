# Precision Gym App

[https://precision-gym.netlify.app/](https://precision-gym.netlify.app/)

## About the app

The purpose of this app is track the progress of a user's performance in the gym. The user would be able to manually add/edit their exercises and input statistics specific for each exercise. Added exercises could then be save in routines. The routines would be displayed in the UI.

### Personal note

As a gym-goer I'm interested in the progress of my performance. To do that I make notes tracking the amount of sets and repetitions (reps) in each exercise. Often towards the end of an exercise rep performance may slip as the muscles get fatigued. So I thought it would be a good idea to also track the **performance of each individal rep**. However, that would take too many notes, so it makes sense to have that in an app.

## Setup & Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the project root with your Firebase credentials:
   ```
   VITE_API_KEY=your_api_key
   VITE_AUTH_DOMAIN=your_auth_domain
   VITE_DATABASE_URL=your_database_url
   VITE_PROJECT_ID=your_project_id
   VITE_STORAGE_BUCKET=your_storage_bucket
   VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_APP_ID=your_app_id
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Firebase Configuration

This app uses Firebase for backend services:

- **Authentication**: User sign-up, sign-in, and guest access
- **Realtime Database**: Storing user routines, exercises, and workout data

### Security Rules

Firebase security rules are implemented to protect user data:
- ✅ Users can only access their own data (`/users/{uid}/`)
- ✅ All database operations require authentication
- ✅ Data structure validation ensures data integrity
- ✅ Guest users have special shared access to `/users/guest/`. 
All new data is deleted after the user logs out of the guest account.

For detailed security rules deployment instructions, see [FIREBASE_SECURITY_DEPLOYMENT.md](./FIREBASE_SECURITY_DEPLOYMENT.md)

### Database Structure

```
users/
  {userId}/
    routines/
      {routineName}/
        routineName: string (required)
        routineId: number (optional)
        logbook/
          {date}/           # YYYY-MM-DD format
            [exerciseIndex]/
              id: number (required)
              name: string (required)
              sets/
                [setIndex]/
                  weight: number (required)
                  reps: array (required)
```

## Status

### Authentication:

- [x] Basic sign in and log in options with name, email and password
- [x] Option to explore the app's feature as a guest.

### User Dashboard features:

- [x] Adding routines which would store exercises.
- [x] Assigning dates to each performed routine.
- [x] Adding the current date to a routine
- [x] Adding and deleting exercises
- [x] Modifying the name of each exercise
- [x] Adding and removing sets
- [x] Modifying the used weight in each set
- [x] Adding and removing reps in each set
- [x] Modifying the performance of each rep on a 1-5 scale

### Database:

- [x] Fetching the user's stored data upon loggin in
- [x] Updating the online database whenever user provides or modifies data

### Security:

- [x] Firebase security rules implementation
- [x] User data isolation (users can only access their own data)
- [x] Authentication required for all database operations
- [x] Data structure validation (required fields, type checking)
- [x] Guest user special handling

### UI:

- [x] Information hierarchy of input data
- [x] Basic CSS styling of components
- [ ] Responsive Web Design
- [ ] Implemented guidelines of app's features
- [ ] Accessibility

## Technologies used

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Component-scoped CSS
- **Backend**: Firebase Realtime Database
- **Authentication**: Firebase Authentication
- **Security**: Firebase Security Rules (see [database.rules.json](./database.rules.json))
- **Deployment**: Netlify

## Performance & Optimization

This app implements several React performance patterns to minimize unnecessary re-renders and maintain smooth UX.

### 1. Split Context Architecture

**Pattern:** Separate data context from actions context
```typescript
// src/context/app-context.ts
export const AppDataContext = createContext<AppDataContextType>({
  authUser: null,
  routineList: [],      // Changes frequently
  modalWindowIsOpen: false,
  currentRoutine: null,
});

export const AppActionsContext = createContext<AppActionsContextType>({
  updateExercise: async () => {},  // Stable functions
  deleteExercise: async () => {},
  // ...
});
```

**Why:** Components that only need actions (like buttons) don't re-render when data changes.

**Impact:** Prevents ~20+ action-only consumers from re-rendering on every exercise update.

### 2. Component Memoization Strategy

**Where it matters:** Components rendered many times (ExSet - 50+ instances)
```typescript
// src/components/UI/UserDashboard/Routine/Exercise/ExSet.tsx:19-25
const arePropsEqual = (prevProps: ExSetProps, nextProps: ExSetProps) => {
  return prevProps.set === nextProps.set;  // Only check set reference
};

const ExSet = memo((props: ExSetProps) => {
  // Component implementation
}, arePropsEqual);
```

**Why:** When updating one exercise, only the modified ExSet re-renders instead of all 50+.

**Where it doesn't matter:** Parent components with cheap renders (App.tsx)
- App re-render: ~0.1ms (just JSX creation)
- Not worth the complexity of additional context splitting

### 3. Stable Keys (Critical!)

**❌ Bad:** Dynamic keys based on mutable data
```typescript
// WRONG - causes remounts when name changes
<Exercise key={`${exercise.name}-${i}`} />
```

**✅ Good:** Stable keys based on IDs
```typescript
// src/components/UI/UserDashboard/Routine.tsx:109
<Exercise key={exercise.id} />  // Stable across updates
```

**Why:** Changing keys triggers component remounts, bypassing ALL memo optimizations.

**Impact:** This single fix prevented entire Exercise trees from remounting on name changes.

### 4. Centralized Mutation Pattern

**Pattern:** Discriminated union for all update types
```typescript
// src/types.ts
export type UpdateMutation =
  | { type: "updateRepValues"; setIndex: number; newReps: number[] }
  | { type: "updateSetWeight"; setIndex: number; newWeight: number }
  | { type: "updateExerciseName"; newName: string }
  | { type: "addOrDeleteRep"; setIndex: number; repIndex: number; action: "add" | "delete" }
  | { type: "addOrDeleteSet"; setIndex: number; action: "add" | "delete" }
  | { type: "addNewExercise"; exercise: Exercise };

// src/context/AppProvider.tsx:43-179
const updateExercise = useCallback(
  async (routineName: string, exerciseId: number, mutation: UpdateMutation, routineDate: string) => {
    // Centralized update logic with switch statement
  },
  [firebaseApi]
);
```

**Benefits:**
- Type-safe mutations
- Centralized update logic
- No prop drilling of Exercise objects
- Easier to add undo/redo or logging

### 5. useCallback + useMemo for Context Stability

**Why both are needed:**
```typescript
// src/context/AppProvider.tsx

// 1. useCallback keeps function references stable
const updateExercise = useCallback(async (...) => { ... }, [firebaseApi]);

// 2. useMemo keeps context object reference stable
const actionsContext = useMemo(
  () => ({ updateExercise, ... }),
  [updateExercise, ...]  // All stable → context stable
);
```

**Without useCallback:** Functions recreate on every render → context recreates → all subscribers re-render

**Without useMemo:** New object `{}` on every render → context changes → all subscribers re-render

**Result:** Only re-render when actual dependencies change.

### 6. Performance Measurement Guidelines

**When to optimize:**
- ✅ Components rendered 50+ times (ExSet)
- ✅ Operations > 16ms (causes frame drops at 60 FPS)
- ✅ Measured bottlenecks (React DevTools Profiler)
- ✅ O(n²) algorithms on large datasets (1000+ items)

**When NOT to optimize:**
- ❌ Parent components with cheap renders (~0.1ms)
- ❌ Operations on small datasets (< 100 items)
- ❌ Premature optimization without measurement
- ❌ Theoretical concerns without profiling

**Tools:**
- React DevTools Profiler (identify slow components)
- `console.time()` / `console.timeEnd()` (measure specific operations)
- Browser Performance tab (overall rendering performance)

### 7. Key Lessons Learned

1. **Profile first, optimize second** - Don't guess what's slow
2. **Stable keys are critical** - Dynamic keys break everything
3. **Optimize high-count components** - 50 ExSets matter, 1 App doesn't
4. **Context subscriptions are broad** - Any change triggers all subscribers
5. **Big O notation matters at scale** - O(n²) is fine for 10 items, terrible for 1000

### Performance Impact Summary

**Before optimizations:**
- Change exercise name → ~100+ component re-renders
- Modify one rep → ~100+ component re-renders
- Recursive render loops

**After optimizations:**
- Change exercise name → ~5 component re-renders (only modified chain)
- Modify one rep → ~3 component re-renders (only modified set)
- No recursive loops

**Estimated improvement:** 95% reduction in unnecessary re-renders

## Security & Privacy

- All user data is isolated and protected by Firebase security rules
- Authentication required for all database operations
- Users can only access their own data at `/users/{uid}/`
- Guest accounts use a shared data space (`/users/guest/`) that is cleared on sign-out
- Environment variables keep Firebase credentials secure
- Data structure validation prevents malformed or malicious data
- See [FIREBASE_SECURITY_DEPLOYMENT.md](./FIREBASE_SECURITY_DEPLOYMENT.md) for implementation details

## Deployment

### Application Deployment
The app is deployed on Netlify: [https://precision-gym.netlify.app/](https://precision-gym.netlify.app/)

### Firebase Security Rules Deployment
Security rules must be deployed separately to Firebase Console.

See [FIREBASE_SECURITY_DEPLOYMENT.md](./FIREBASE_SECURITY_DEPLOYMENT.md) for complete step-by-step instructions on:
- Deploying rules via Firebase Console
- Testing rules with Firebase Rules Playground
- Verifying security implementation
- Troubleshooting common issues

## User Stories & Features

![User Stories 01](./user-stories/user-stories-01.png)
![User Stories 01](./user-stories/user-stories-02.png)
![User Stories 01](./user-stories/user-stories-03.png)
