# RoomieMatch - Data Flow & Matching System

## 🎯 How the Matching System Works

### Current Implementation Status
- ✅ **Frontend**: User signup form collects preferences
- ✅ **Frontend**: Smart Recommendations page shows AI-ranked matches
- ⏳ **Backend**: Need to implement database + API for matching

---

## 📊 Data Architecture

### 1. User Profile Table (Database)
When a user **signs up**, their details are saved:

```typescript
// Users Table Structure
{
  id: "user_123",
  name: "Jessica Parker",
  email: "jessica@email.com",
  age: 24,
  budget: 12000,
  
  // Lifestyle Preferences (from signup)
  sleepSchedule: "early-bird" | "regular" | "night-owl",
  noiseTolerance: "low" | "medium" | "high",
  lifestyle: "active" | "balanced" | "homebody",
  
  // Interests & Bio
  interests: ["yoga", "reading", "cooking"],
  bio: "Software engineer, love yoga and cooking",
  
  // Location Preference
  city: "Bangalore",
  preferredAreas: ["Koramangala", "Whitefield"],
  
  // Room Preference
  roomType: "single" | "twin-sharing",
  
  // Metadata
  createdAt: "2025-01-15",
  verified: true,
  avatar: "profile_photo.jpg"
}
```

### 2. Roommate Profiles (Database)
Each user's profile is stored and used for matching other users:

```typescript
// When Jessica saves her profile → saved in database
// When Priya signs up → her profile is saved
// When Anjali signs up → her profile is saved

// Priya's Profile
{
  id: "user_456",
  name: "Priya Sharma",
  age: 22,
  sleepSchedule: "early-bird",
  interests: ["yoga", "reading", "photography"],
  lifestyle: "active",
  noiseTolerance: "low",
  budget: 11000,
  roomType: "twin-sharing"
}

// Anjali's Profile
{
  id: "user_789",
  name: "Anjali Gupta",
  age: 21,
  sleepSchedule: "regular",
  interests: ["music", "art", "travel"],
  lifestyle: "balanced",
  noiseTolerance: "medium",
  budget: 10000,
  roomType: "single"
}
```

### 3. Room Listings Table (Database)
Rooms/apartments are stored with details:

```typescript
{
  id: "room_001",
  type: "single-bed" | "twin-sharing",
  floor: "ground" | "1st" | "2nd",
  monthlyRent: 12000,
  securityDeposit: 25000,
  features: ["AC", "Window", "Attached Bath", "Furnished"],
  location: "Koramangala",
  images: ["room_1.jpg", "room_2.jpg"],
  createdAt: "2025-01-10"
}
```

---

## 🤖 Matching Algorithm

### How Recommendations are Generated

```
Step 1: User logs in (Jessica)
         ↓
Step 2: Fetch Jessica's profile from database
         ├─ name, age, budget, lifestyle, interests
         ├─ sleepSchedule, noiseTolerance
         └─ preferredAreas, roomType
         ↓
Step 3: AI Algorithm calculates compatibility scores
         ├─ Get all available roommate profiles
         ├─ Compare each roommate's attributes:
         │  ├─ Sleep schedule match (does early-bird match with?)
         │  ├─ Noise tolerance compatibility
         │  ├─ Lifestyle match (active vs active, etc.)
         │  ├─ Interest overlap (how many shared interests)
         │  ├─ Budget compatibility (within range?)
         │  └─ Location match
         └─ Calculate match score (0-100%)
         ↓
Step 4: AI Algorithm ranks available rooms
         ├─ Get all available rooms in preferred areas
         ├─ Score each room:
         │  ├─ Price match (within budget?)
         │  ├─ Features match (has preferred amenities?)
         │  ├─ Type match (single vs twin-sharing)
         │  ├─ Location preference
         │  └─ Availability
         └─ Rank by score
         ↓
Step 5: Return ranked results to Smart Recommendations page
         ├─ Top 3 Room Matches (98%, 95%, 87% etc.)
         └─ Top 3 Roommate Matches (94%, 89%, 85% etc.)
```

### Example Matching Calculation

```javascript
// Jessica's Preferences
jessica = {
  age: 24,
  budget: 12000,
  sleepSchedule: "early-bird",
  noiseTolerance: "low",
  lifestyle: "active",
  interests: ["yoga", "reading", "cooking"]
}

// Priya's Profile
priya = {
  age: 22,
  budget: 11000,
  sleepSchedule: "early-bird",    // ✅ MATCH
  noiseTolerance: "low",           // ✅ MATCH
  lifestyle: "active",             // ✅ MATCH
  interests: ["yoga", "reading", "photography"]  // ✅ 2/3 overlap
}

// Calculate Compatibility Score
score = 0
score += 20 (sleep schedule match)
score += 20 (noise tolerance match)
score += 15 (lifestyle match)
score += 20 (interests overlap: 2/3 = 67%)
score += 15 (age difference < 5 years)
score += 10 (budget difference < 10%)
// Total: 100/100 = 100% but algorithm caps realistic at 94%

compatibilityScore = 94%  ✅
```

---

## 💾 Data Flow Steps

### 1️⃣ **User Signs Up**
```
User fills signup form:
├─ Basic Info: name, age, email, password
├─ Preferences: sleep schedule, noise tolerance, lifestyle
├─ Interests: yoga, reading, cooking
├─ Budget: ₹12,000/month
├─ Room Type: single bed
└─ Location: Bangalore

     ↓
API Call: POST /api/users/register
     ↓
Save to Database: Users Table
     ↓
Response: { userId: "user_123", token: "abc123" }
     ↓
Frontend: Save token in localStorage
```

### 2️⃣ **User Wants Recommendations**
```
User clicks: "Smart Recommendations"
     ↓
Frontend: Call GET /api/recommendations/{userId}
     ↓
Backend Steps:
  1. Fetch user's profile: SELECT * FROM users WHERE id = "user_123"
  2. Fetch all roommates: SELECT * FROM users WHERE id != "user_123"
  3. Run matching algorithm on each roommate
  4. Sort by compatibility score (highest first)
  5. Also fetch and score available rooms
  6. Return top 3 of each
     ↓
Response:
{
  roomMatches: [
    { id: "room_001", score: 98%, ... },
    { id: "room_002", score: 95%, ... },
    { id: "room_003", score: 87%, ... }
  ],
  roommateMatches: [
    { id: "user_456", name: "Priya", score: 94%, ... },
    { id: "user_789", name: "Anjali", score: 89%, ... },
    { id: "user_999", name: "Shreya", score: 85%, ... }
  ]
}
     ↓
Frontend: Display in tabs
```

### 3️⃣ **User Saves/Favorites a Roommate**
```
User clicks: "Connect" button on Priya's card
     ↓
Frontend: POST /api/favorites
{
  userId: "user_123",
  favoritedUserId: "user_456"
}
     ↓
Backend: Save in Favorites table
{
  id: "fav_001",
  userId: "user_123",
  favoritedUserId: "user_456",
  createdAt: "2025-01-15"
}
     ↓
Frontend: Show "Saved" indicator on card
```

### 4️⃣ **User Views Saved Favorites**
```
User clicks: "Saved Favorites" (future feature)
     ↓
Frontend: GET /api/favorites/{userId}
     ↓
Backend: SELECT * FROM favorites WHERE userId = "user_123"
     ↓
Response:
[
  { id: "user_456", name: "Priya Sharma", score: 94%, ... },
  { id: "user_789", name: "Anjali Gupta", score: 89%, ... }
]
     ↓
Frontend: Show list of saved roommates
```

---

## 🗄️ Database Tables Needed

### 1. Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(500) NOT NULL,
  age INT,
  budget INT,
  sleep_schedule VARCHAR(50),
  noise_tolerance VARCHAR(50),
  lifestyle VARCHAR(50),
  interests TEXT[], -- Array of interests
  bio TEXT,
  city VARCHAR(100),
  preferred_areas TEXT[],
  room_type VARCHAR(50),
  avatar_url VARCHAR(500),
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Rooms Table
```sql
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50),
  floor VARCHAR(50),
  monthly_rent INT,
  security_deposit INT,
  features TEXT[],
  location VARCHAR(100),
  images TEXT[],
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Favorites Table
```sql
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  favorited_user_id UUID REFERENCES users(id),
  room_id UUID REFERENCES rooms(id),
  type VARCHAR(50), -- 'roommate' or 'room'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, favorited_user_id, room_id)
);
```

---

## 📱 User Journey with Data

```
┌─────────────────────────────────────────────────────────────┐
│ 1. SIGNUP FLOW                                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  User enters: Name, Age, Budget, Interests, etc.           │
│       ↓                                                     │
│  POST /api/users/register                                  │
│       ↓                                                     │
│  ✅ Saved in DB: users table                               │
│  ✅ Token created & stored in localStorage                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. SMART RECOMMENDATIONS PAGE                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  User clicks: Smart Recommendations                        │
│       ↓                                                     │
│  GET /api/recommendations/{userId}                         │
│       ↓                                                     │
│  Backend matches algorithm:                                │
│  - Fetches all users & rooms                               │
│  - Calculates compatibility scores                         │
│  - Sorts by best match first                               │
│       ↓                                                     │
│  Response: Top 3 rooms + Top 3 roommates                   │
│       ↓                                                     │
│  ✅ Display in UI with scores                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. CONNECT / SAVE FAVORITES                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  User clicks: "Connect" on Priya's card                    │
│       ↓                                                     │
│  POST /api/favorites                                       │
│  { userId, favoritedUserId, type: 'roommate' }            │
│       ↓                                                     │
│  ✅ Saved in DB: favorites table                           │
│  ✅ UI shows "Saved" indicator                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. VIEW DETAILS & PROCEED                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  User clicks: "View Room" or "Learn More"                 │
│       ↓                                                     │
│  Navigate to Room/Confirmation page with details           │
│       ↓                                                     │
│  ✅ Shows gallery, AR preview, roommate info               │
│  ✅ User can proceed to payment                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Security Considerations

1. **Password**: Hash using bcrypt before storing
2. **User Data**: Encrypt sensitive information
3. **Privacy**: Don't show contact info until matched
4. **Verification**: Check email before full access
5. **API Auth**: Verify token on all requests

---

## 📝 Next Steps to Implement

1. **Create Database Tables** (Users, Rooms, Favorites)
2. **Build API Endpoints**:
   - `POST /api/users/register` - Save user profile
   - `GET /api/recommendations/{userId}` - Get matches
   - `POST /api/favorites` - Save favorite
   - `GET /api/favorites/{userId}` - View saved
3. **Implement Matching Algorithm**
   - Calculate compatibility scores
   - Rank by score
   - Return top results
4. **Connect Frontend to Backend**
   - Update signup to call API
   - Update recommendations to fetch from API
   - Add save/favorite functionality

---

## 💡 Key Points

✅ **User enters details** → Saved to database
✅ **All users' details stored** → Available for matching
✅ **Algorithm compares** → Calculates compatibility
✅ **Best matches shown** → Ranked by score
✅ **User saves favorite** → Stored in favorites table
✅ **Can view saved** → Fetch from favorites table

The system works by storing everyone's data and calculating how compatible they are with each other!
