# RoomieMatch - AI-Powered Roommate Matching Platform

## Overview
RoomieMatch is a roommate matching platform designed for women seeking compatible living companions. It features an AI-powered matching system with a warm, feminine design aesthetic.

## Project Structure
```
src/
├── assets/        # Static assets and images
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── pages/         # Page components
├── services/      # API and business logic services
├── App.tsx        # Main application component
├── main.tsx       # Application entry point
└── index.css      # Global styles and theming
```

## Tech Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: TanStack Query
- **Build Tool**: Vite
- **Backend**: Node.js with Mongoose (MongoDB)

## Running the Application
The application runs on port 5000 using:
```bash
npm run dev
```

## Design System
The platform uses a cozy, feminine color palette:
- Primary: Mauve-pink tones (#C97F7F)
- Secondary: Muted gold accent (#D1B38D)
- Background: Warm cream tones (#FDF6F2)
- Font: Nunito

## Recent Changes
- December 21, 2025: Major UI/UX Enhancements
  - Created beautiful Payment page with 4 payment methods and booking summary
  - Enhanced Landing page with animations, visual effects, and sequential feature showcase
  - Added smooth fade-in, slide-up, floating, and glow animations
  - Implemented "How It Works" section with step indicators
  - Added trust stats section with icons and metrics
  - Created testimonials section with star ratings
  - Enhanced hero section with gradient text and underline effects
  - Floating badges and glow effects on hero image
  
- December 19, 2025: Migrated from Lovable to Replit environment
  - Updated Vite config to use port 5000 with allowedHosts
  - Fixed CSS @import order for Google Fonts
  - Removed lovable-tagger dependency from build
  - Enhanced Login page with modern UI and backend integration
  - Enhanced Signup page with comprehensive form validation
  - Beautifully redesigned Room Selection page with unique animations and theme colors
  - Enhanced Confirmation page with image gallery and AR 3D viewer
  - Created AI-powered Smart Recommendations feature (replaces Profile Settings)
  - Updated Navigation bar to feature Smart Recommendations
  
## Key UI Enhancements

### Landing Page (Enhanced)
- Animated hero section with fade-in and floating effects
- Gradient text effects on main headline
- Floating badges (AI Match, Safe & Verified)
- Glow effects on hero image
- Trust badges with stats and icons
- Features section with 3 key value propositions
- "How It Works" section with 4 sequential steps and connection lines
- Stats section showcasing 2.5K+ matches, 98% satisfaction, 100% verified, 50+ cities
- Testimonials section with star ratings
- Final CTA section with gradient background
- Smooth CSS animations (fade-in, slide-up, float, glow)
- Responsive design with mobile-first approach

### Login/Signup Pages
- Themed cards, form icons, gradient backgrounds
- Proper form validation and error handling

### Room Selection
- Advanced filtering, animated room cards
- Hover effects, decorative elements

### Confirmation Page
- Full image gallery with thumbnail navigation
- Interactive AR 3D model viewer using Google Model Viewer
- Room details card with all specifications
- Roommate matching display for shared rooms
- "What's Next" steps guide

### Smart Recommendations
- AI-powered room recommendations with match scores (98%, 95%, 87%)
- Personalized roommate matches with compatibility ratings
- Tab-based interface for rooms and roommates
- Smart compatibility algorithm based on user preferences
- Visual compatibility scores with progress bars

### Payment Page
- Multiple payment methods: Credit/Debit Card, UPI, Net Banking, Digital Wallets
- Tab-based payment method selection with visual feedback
- Complete payment form with card formatting
- Security badges and encryption messaging
- Sticky booking summary with price breakdown
- Real-time validation for all payment fields

## User Journey/Sequential Flow
1. **Landing Page** - Discover platform with animated hero and features
2. **Login/Signup** - Create account with verified process
3. **Smart Recommendations** - Get AI-powered room and roommate suggestions
4. **Room Selection** - Browse and filter available rooms
5. **Confirmation** - Review room details with AR preview
6. **Payment** - Secure booking with multiple payment options
7. **Success** - Confirmation and next steps

## Navigation Bar Layout

### Desktop View
- **Left**: RoomieMatch logo with heart icon + tagline "AI-Powered Matching"
- **Center**: Navigation buttons (Recommendations, Explore Rooms) - visible when logged in
- **Right**: User profile indicator (initials badge) + Mobile menu toggle

### Mobile View
- **Left**: RoomieMatch logo
- **Right**: Hamburger menu icon leading to organized menu with:
  - **Discover Section**: Smart Recommendations (marked as NEW), Explore Rooms
  - **Account Section**: Profile Settings, Saved Favorites
  - **Sign Out Button** with red styling
  - **Footer Info**: Version info and verification badge

### How to Access Recommendations
1. Log in or sign up
2. Click "Smart Recommendations" in navigation (desktop) or menu (mobile)
3. View two tabs:
   - **Room Matches**: AI-ranked rooms with compatibility scores (98%, 95%, 87%)
   - **Roommate Matches**: Personalized roommate suggestions with compatibility ratings

## Smart Recommendations Feature

### What It Shows
**Room Recommendations:**
- Match score (98%, 95%, 87% etc.)
- Room type (Single Bed, Twin-sharing)
- Monthly cost
- Floor location
- Features (AC, Furnished, Attached Bath, etc.)
- High-quality room images
- "View Room" button to proceed

**Roommate Recommendations:**
- Profile photo and basic info (name, age)
- Compatibility score with progress bar
- Sleep schedule (Early Bird, Regular, Night Owl)
- Interests (Yoga, Reading, Music, etc.)
- "Connect" button to initiate contact

### How It Works
1. **AI Algorithm** analyzes user preferences from signup (lifestyle, schedule, interests, budget)
2. **Smart Matching** ranks rooms and roommates by compatibility score
3. **Results Display** shows top matches first, with highest compatibility scores
4. **Actionable Cards** each card has buttons to explore or connect

### Navigation After Recommendations
- Click "View Room" → Goes to full Room Selection page
- Click "Connect" → Saves roommate as favorite (future feature)
- Click "Explore All Rooms" → Full room listing with filters
- "Back to Home" → Returns to landing page

- All pages use the cozy feminine design system with primary mauve-pink (#C97F7F) and secondary gold (#D1B38D) colors
