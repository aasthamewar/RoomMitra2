# RoomieMatch Navigation Guide

## 🎯 Navigation Bar Overview

The navigation bar is the central hub for accessing all features. It's optimized for both desktop and mobile devices.

---

## 📱 Mobile Navigation (< 1024px)

### Navigation Bar
```
[❤️ RoomieMatch] ≡ MENU
 AI-Powered
 Matching
```

### Mobile Menu Structure
```
═══════════════════════════════════════════════
    RoomieMatch
    AI-Powered Matching
───────────────────────────────────────────────

  ⭐ DISCOVER
  
  ✨ Smart Recommendations    [NEW]
  🏠 Explore Rooms

───────────────────────────────────────────────

  👤 ACCOUNT
  
  ⚙️  Profile Settings
  💕 Saved Favorites

───────────────────────────────────────────────

  🚪 Sign Out  (Red button)

───────────────────────────────────────────────
  Version 1.0.0 • All women verified
═══════════════════════════════════════════════
```

---

## 🖥️ Desktop Navigation (≥ 1024px)

### Navigation Bar
```
[❤️ RoomieMatch]    [✨ Recommendations] [🏠 Explore Rooms]    [JD Profile]
 AI-Powered Matching
```

- **Left**: Logo + Brand name + Tagline
- **Center**: Navigation buttons (only visible when logged in)
- **Right**: User profile badge (initials) + Mobile menu trigger

---

## 🔄 How to Access Smart Recommendations

### Step-by-Step Flow

```
┌─────────────────────────────────┐
│   You are on any page           │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│  Click "Smart Recommendations"  │
│  (Navigation bar or menu)       │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────┐
│   Smart Recommendations Page                        │
│                                                     │
│  [🏠 Room Matches] [👥 Roommate Matches]           │
│                                                     │
│  ┌──────────────┬──────────────┬──────────────┐    │
│  │ Single Bed   │ Twin-sharing │ Single Bed   │    │
│  │ 98% Match    │ 95% Match    │ 87% Match    │    │
│  │ ₹12,000/mo   │ ₹10,000/mo   │ ₹9,000/mo    │    │
│  │ [View Room]  │ [View Room]  │ [View Room]  │    │
│  └──────────────┴──────────────┴──────────────┘    │
└─────────────────────────────────────────────────────┘
             │
    ┌────────┼────────┐
    │        │        │
    ▼        ▼        ▼
 [View]  [Connect]  [Explore
  Room   (Future)   All Rooms]
```

---

## 🎯 Recommendations Display

### Room Matches Tab

Each room card shows:
```
┌─────────────────────────────────┐
│  [Room Image]                   │
│              [98% ⬆]  (Match Score)
│                                 │
│  🏠 Single Bed                  │
│  ₹12,000/month (first month)    │
│                                 │
│  Features:                      │
│  [Window View] [AC] [Attached]  │
│  [Furnished]                    │
│                                 │
│  [View Room →]                  │
└─────────────────────────────────┘
```

### Roommate Matches Tab

Each roommate card shows:
```
┌─────────────────────────────────┐
│         [Avatar]                │
│      Priya Sharma               │
│      22 years old               │
│                                 │
│  Compatibility: ████████░░ 94%  │
│                                 │
│  Sleep Schedule:                │
│  [Early Bird]                   │
│                                 │
│  Interests:                     │
│  [Yoga] [Reading] [Cooking]     │
│                                 │
│  [💖 Connect]                   │
└─────────────────────────────────┘
```

---

## 🔗 What Happens When You Click Buttons

| Button | Action | Page |
|--------|--------|------|
| **View Room** | Opens full room details with gallery and AR preview | Room Selection |
| **Connect** | Saves roommate as favorite (future feature) | Stays on page |
| **Explore All Rooms** | Shows all available rooms with filters | Room Selection |
| **Back to Home** | Returns to landing page | Landing Page |

---

## 🎨 Navigation Design Details

### Desktop Features
- ✅ Sticky navigation bar (stays on top while scrolling)
- ✅ Active page highlighting
- ✅ Smooth hover effects
- ✅ User profile indicator with initials badge
- ✅ Responsive to screen size
- ✅ Dark mode support

### Mobile Features
- ✅ Hamburger menu icon
- ✅ Organized sections with headers
- ✅ "NEW" badge on Smart Recommendations
- ✅ Color-coded buttons (red for Sign Out)
- ✅ Version info in footer
- ✅ Trust indicator "All women verified"

### Color Scheme
- **Primary**: Mauve-pink (#C97F7F) - Main actions
- **Secondary**: Gold (#D1B38D) - Accents
- **Destructive**: Red - Sign Out button
- **Background**: Warm cream (#FDF6F2)

---

## 🚀 User Flow Diagram

```
Landing Page
    ↓
    → Click "Get Started"
    ↓
Login / Signup
    ↓
    → Create account (provide preferences)
    ↓
Smart Recommendations ⭐ [You are here!]
    ├→ View Room Matches (98%, 95%, 87% compatibility)
    ├→ View Roommate Matches (personalized)
    └→ Click "View Room" or "Explore All Rooms"
    ↓
Room Selection
    ├→ Filter by price, location, features
    ├→ View detailed room info
    └→ Select a room
    ↓
Confirmation
    ├→ View room gallery
    ├→ AR 3D preview
    └→ "Proceed to Payment"
    ↓
Payment
    ├→ Choose payment method
    ├→ Enter payment details
    └→ Pay (₹37,500 total)
    ↓
Success ✅
    └→ Booking confirmed!
```

---

## 📌 Navigation Tips

1. **Always logged in?** Desktop nav shows Recommendations and Explore Rooms buttons
2. **On mobile?** Tap the hamburger menu (≡) in top right corner
3. **Want recommendations?** Click "Smart Recommendations" - it's the feature that replaces old Profile Settings
4. **Go back anytime?** Click RoomieMatch logo to return home
5. **Confused?** Check the sequential flow - each page flows logically to the next

---

## 🔒 Navigation Security

- ✅ Logout removes auth token from localStorage
- ✅ Login state determines what menu items appear
- ✅ All women verified badge indicates safety
- ✅ Encrypted payment information

---

**Navigation last updated: December 21, 2025**
**Version: 1.0.0**
