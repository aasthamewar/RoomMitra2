# ROOMIEMATCH - FULL-STACK IMPLEMENTATION ROADMAP

---

## 📌 EXECUTIVE SUMMARY

### Current State
✅ **Frontend**: Fully functional UI with authentication, FormShare integration, ML score display
❌ **Backend**: ML model exists but NOT database-connected, NO user data storage, NO real authentication

### Goal
Convert from **Frontend-only prototype** → **Production-ready full-stack application**

### Timeline
- **Current**: 2-3 weeks for full implementation
- **MVP**: 1 week for critical features (auth + database)
- **Beta**: 2 weeks total with messaging + payments

---

## 🔍 WHAT I COMPLETED (QUICK SUMMARY)

### ✅ Frontend Features
| Component | Status | Details |
|-----------|--------|---------|
| Sign up / Login | ✅ Done | localStorage-based, no backend needed |
| FormShare Integration | ✅ Done | Form ID: 0rHXDfX8KM, webhook ready |
| ML Compatibility Display | ✅ Done | Fetches real scores, shows analysis |
| Room Selection | ✅ Done | UI complete, AR preview functional |
| Payment Flow | ✅ Done | UI complete, integration pending |
| Match Results Page | ✅ Done | Shows score + AI analysis |
| Smart Recommendations | ✅ Done | Dynamic scores based on ML model |
| Admin Dashboard | ✅ Partial | UI sketched, no backend |

---

## 🔴 BACKEND CURRENT STATE

### What Exists
```
✅ ML Model: backend/compatibility_model.pkl
   • Trained: TF-IDF + LinearRegression
   • Input: User answers text
   • Output: Score (0-100)
   • Accuracy: Depends on training data

✅ FastAPI Server: backend/ml_api.py
   • Endpoints: /form-webhook, /latest-score, /predict-behavior
   • CORS: Enabled for frontend
   • Keyword Analysis: Working

❌ Database Integration: MISSING
   • Saves to: latest_score.txt (text file, not DB)
   • No user persistence
   • No score history
   • No real authentication
```

### What's NOT Working Production-Ready
- ❌ No PostgreSQL integration
- ❌ No user authentication (JWT)
- ❌ No password hashing
- ❌ No data persistence
- ❌ No messaging system
- ❌ No payment processing
- ❌ No review system
- ❌ No real room listings database

---

## ⚡ PART 1: MUST-HAVE BACKEND COMPONENTS

### 1. DATABASE SCHEMA (PostgreSQL + Drizzle ORM)

Create file: `shared/schema.ts`

**Core Tables:**

```typescript
// Users table
users:
  - id: serial (primary key)
  - email: varchar unique
  - passwordHash: varchar
  - profileName: varchar
  - avatarUrl: text
  - createdAt: timestamp
  - updatedAt: timestamp

// User form responses
formResponses:
  - id: serial (primary key)
  - userId: integer (FK → users)
  - answers: json
  - submittedAt: timestamp

// ML Compatibility scores
compatibilityScores:
  - id: serial (primary key)
  - userId: integer (FK → users)
  - score: integer (0-100)
  - whyMatch: json
  - conflicts: json
  - summary: text
  - calculatedAt: timestamp
  - modelVersion: varchar

// Room listings
rooms:
  - id: serial (primary key)
  - userId: integer (FK → users)
  - title: varchar
  - description: text
  - type: varchar (Single/Twin)
  - floor: varchar
  - cost: integer
  - features: json
  - images: json
  - location: text
  - createdAt: timestamp

// Messages
messages:
  - id: serial (primary key)
  - senderId: integer (FK → users)
  - receiverId: integer (FK → users)
  - content: text
  - readAt: timestamp nullable
  - createdAt: timestamp

// Reviews/Ratings
reviews:
  - id: serial (primary key)
  - reviewerId: integer (FK → users)
  - reviewedUserId: integer (FK → users)
  - rating: integer (1-5)
  - reviewText: text
  - createdAt: timestamp

// Video Verification
videoVerification:
  - id: serial (primary key)
  - userId: integer (FK → users)
  - videoUrl: text
  - verified: boolean
  - verifiedAt: timestamp nullable

// Payments
payments:
  - id: serial (primary key)
  - userId: integer (FK → users)
  - amount: integer
  - status: varchar
  - stripeTransactionId: varchar
  - createdAt: timestamp
```

---

### 2. AUTHENTICATION SYSTEM

**Create file: `server/auth.ts`**

```typescript
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// Verify password
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Generate JWT
export function generateToken(userId: number): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
}

// Verify JWT
export function verifyToken(token: string): number | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: number };
    return decoded.userId;
  } catch {
    return null;
  }
}
```

**Create file: `server/middleware/authMiddleware.ts`**

```typescript
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../auth";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  const userId = verifyToken(token);

  if (!userId) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.userId = userId;
  next();
}
```

---

### 3. AUTHENTICATION ENDPOINTS

**Add to `server/routes.ts`:**

```typescript
import express from "express";
import { db } from "./db";
import { users } from "@shared/schema";
import {
  hashPassword,
  verifyPassword,
  generateToken,
} from "./auth";
import { eq } from "drizzle-orm";
import { authMiddleware } from "./middleware/authMiddleware";

const router = express.Router();

// Register
router.post("/auth/register", async (req, res) => {
  try {
    const { email, password, profileName } = req.body;

    // Check if user exists
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existing.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const result = await db
      .insert(users)
      .values({
        email,
        passwordHash,
        profileName,
      })
      .returning();

    const user = result[0];
    const token = generateToken(user.id);

    res.json({ token, userId: user.id, email: user.email });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (result.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result[0];

    // Verify password
    const valid = await verifyPassword(password, user.passwordHash);

    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user.id);
    res.json({ token, userId: user.id, email: user.email });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Get current user
router.get("/auth/me", authMiddleware, async (req, res) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, req.userId!))
    .limit(1);

  res.json(user[0]);
});

export default router;
```

---

### 4. ML INTEGRATION WITH DATABASE

**Update `backend/ml_api.py`:**

```python
# Instead of saving to latest_score.txt
# Send to backend API endpoint

from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, JSON, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/roomiematch")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class CompatibilityScore(Base):
    __tablename__ = "compatibility_scores"
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    score = Column(Integer)
    why_match = Column(JSON)
    conflicts = Column(JSON)
    summary = Column(String)
    calculated_at = Column(DateTime, default=datetime.utcnow)

@app.post("/form-webhook")
async def form_webhook(request: Request, payload: FormWebhookPayload):
    # ... existing ML logic ...
    
    # NEW: Save to database instead of file
    db = SessionLocal()
    try:
        score_record = CompatibilityScore(
            user_id=user_id,  # Extract from webhook or auth
            score=score,
            why_match=positives,
            conflicts=negatives,
            summary=summary,
        )
        db.add(score_record)
        db.commit()
        
        return {
            "status": "received",
            "score": score,
            "used_text": combined_text
        }
    finally:
        db.close()
```

---

### 5. ML SCORING ENDPOINT (BACKEND)

**Add to `server/routes.ts`:**

```typescript
import { compatibilityScores, formResponses } from "@shared/schema";

// Calculate and store ML score
router.post("/ml/calculate-score", authMiddleware, async (req, res) => {
  try {
    const { answers } = req.body;
    const userId = req.userId!;

    // Store form response
    await db.insert(formResponses).values({
      userId,
      answers,
    });

    // Call Python ML API
    const mlResponse = await fetch("http://localhost:8000/form-webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: answers.split("|").map(a => ({ answer: a })) }),
    });

    const mlData = await mlResponse.json();

    // Store score in database
    const result = await db
      .insert(compatibilityScores)
      .values({
        userId,
        score: mlData.score,
        whyMatch: mlData.why_match,
        conflicts: mlData.conflicts,
        summary: mlData.summary,
      })
      .returning();

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Score calculation failed" });
  }
});

// Get user's latest score
router.get("/ml/user-score", authMiddleware, async (req, res) => {
  const result = await db
    .select()
    .from(compatibilityScores)
    .where(eq(compatibilityScores.userId, req.userId!))
    .orderBy(desc(compatibilityScores.calculatedAt))
    .limit(1);

  res.json(result[0] || { score: null });
});
```

---

## 🔧 PART 2: HOW TO IMPLEMENT (STEP-BY-STEP)

### Step 1: Initialize Database (TODAY - 30 mins)

```bash
# 1. Create PostgreSQL database
npm install drizzle-orm pg

# 2. Add to .env
DATABASE_URL=postgresql://user:password@localhost:5432/roomiematch

# 3. Create schema file (shared/schema.ts) with tables above

# 4. Run migrations
npm run db:push
```

### Step 2: Implement Authentication (1-2 hours)

```bash
# 1. Install auth packages
npm install bcrypt jsonwebtoken
npm install -D @types/bcrypt @types/jsonwebtoken

# 2. Create auth.ts file (see code above)

# 3. Create authMiddleware.ts (see code above)

# 4. Add auth endpoints to routes.ts (see code above)
```

### Step 3: Update Frontend to Use Backend (1-2 hours)

**Update `src/lib/auth.ts`:**

```typescript
// Replace localStorage logic with API calls
export async function signup(email: string, password: string, profileName: string) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, profileName }),
  });

  const data = await response.json();
  localStorage.setItem("token", data.token);
  localStorage.setItem("userId", data.userId);
  return data;
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  localStorage.setItem("token", data.token);
  localStorage.setItem("userId", data.userId);
  return data;
}

// Get API headers with token
export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}
```

### Step 4: Connect ML Scoring to Database (2-3 hours)

```typescript
// Update src/lib/compatibilityScore.ts
export async function calculateCompatibilityScore(answers: string) {
  const headers = getAuthHeaders();

  const response = await fetch(`${API_URL}/ml/calculate-score`, {
    method: "POST",
    headers,
    body: JSON.stringify({ answers }),
  });

  return response.json();
}

export async function getUserScore() {
  const headers = getAuthHeaders();

  const response = await fetch(`${API_URL}/ml/user-score`, {
    headers,
  });

  return response.json();
}
```

---

## 📊 PART 3: PRIORITY IMPLEMENTATION ORDER

### Priority 1: CRITICAL (Days 1-2)
- [ ] PostgreSQL setup
- [ ] Database schema
- [ ] User authentication (JWT)
- [ ] Password hashing (bcrypt)
- [ ] Register/login endpoints
- [ ] Auth middleware
- [ ] Frontend auth integration

### Priority 2: CORE (Days 3-4)
- [ ] Form response storage
- [ ] ML score database storage
- [ ] User profile endpoints
- [ ] Room CRUD endpoints
- [ ] Room search/filter

### Priority 3: FEATURES (Days 5-7)
- [ ] Messaging system
- [ ] Reviews & ratings
- [ ] Payment processing (Stripe)
- [ ] Video verification
- [ ] Recommendations engine

### Priority 4: POLISH (Week 2)
- [ ] Testing
- [ ] Error handling
- [ ] Rate limiting
- [ ] Caching
- [ ] Admin dashboard

---

## 🚀 QUICK-START CHECKLIST

### Week 1: MVP (Auth + Database)
```
Day 1:
  [ ] Set up PostgreSQL
  [ ] Define schema in Drizzle
  [ ] Run migrations

Day 2:
  [ ] Implement JWT auth
  [ ] Add password hashing
  [ ] Create register/login endpoints

Day 3:
  [ ] Add auth middleware
  [ ] Connect ML to database
  [ ] Update frontend auth

Day 4:
  [ ] Test complete auth flow
  [ ] Fix bugs
  [ ] Documentation

Day 5:
  [ ] Room CRUD endpoints
  [ ] User profile endpoints
  [ ] Testing
```

### Week 2: Features
```
Day 6-7: Messaging system
Day 8: Reviews & ratings
Day 9: Stripe payment
Day 10: Video verification
Day 11-13: Testing & fixes
```

---

## 🔐 SECURITY CHECKLIST

- [ ] Passwords hashed with bcrypt
- [ ] JWT tokens with expiration
- [ ] HTTPS enforced
- [ ] CORS properly configured
- [ ] Input validation with Zod
- [ ] SQL injection protection (Drizzle)
- [ ] Rate limiting
- [ ] Environment variables for secrets
- [ ] httpOnly cookies for tokens
- [ ] CSRF protection

---

## 📈 DEPLOYMENT READINESS

### Current Status
✅ Frontend: Ready for testing
⚠️ Backend ML: Ready (but file-based, not production)
❌ Full Stack: Not ready for production

### After Implementation
✅ Frontend: Production-ready
✅ Backend: Production-ready
✅ Full Stack: Production-ready

---

## 💾 ENVIRONMENT VARIABLES NEEDED

```
DATABASE_URL=postgresql://user:password@localhost:5432/roomiematch
JWT_SECRET=your-super-secret-key-here
API_URL=http://localhost:5000 (or your deployed URL)
STRIPE_SECRET_KEY=sk_test_...
OPENAI_API_KEY=sk-... (optional)
```

---

## ✅ SUCCESS CRITERIA

Your full-stack app is complete when:

- [ ] User can register with email/password
- [ ] User login persists across sessions
- [ ] FormShare answers stored in database
- [ ] ML score calculated and stored
- [ ] Room listings persist in database
- [ ] Users can message each other
- [ ] Users can rate/review others
- [ ] Payment processing works
- [ ] No data loss on refresh
- [ ] Deployment works on Replit

---

## 📞 NEXT STEPS

1. **Immediate**: Create database schema (30 mins)
2. **Short-term**: Implement authentication (2 hours)
3. **Medium-term**: Connect ML to database (2-3 hours)
4. **Long-term**: Add remaining features (week 2)

**Total: 2-3 weeks for complete full-stack solution**

---

*This roadmap is actionable, sequential, and realistic.*
