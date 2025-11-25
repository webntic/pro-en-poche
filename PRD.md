# Planning Guide

A professional services marketplace connecting service providers with clients through direct booking, secure payments, and transparent reviews.

**Experience Qualities**:
1. **Trustworthy** - Users must feel confident in the security of transactions and authenticity of service providers through clear verification, ratings, and escrow payments.
2. **Efficient** - Service discovery, booking, and payment should flow seamlessly with minimal friction between client need and service fulfillment.
3. **Professional** - The interface should convey credibility and polish befitting a platform handling financial transactions and professional reputations.

**Complexity Level**: Complex Application (advanced functionality, accounts)
  - Multi-role authentication system, payment processing, escrow management, booking workflows, and administrative oversight require sophisticated state management and user flows.

## Essential Features

### User Registration & Profiles
- **Functionality**: Dual-role system allowing users to register as service providers or clients with customized profile fields
- **Purpose**: Establishes identity and builds trust through transparent professional information
- **Trigger**: "Sign Up" button in header or prompted when attempting to book/offer services
- **Progression**: Select role (Provider/Client) → Enter basic info (name, email, password) → Complete profile (bio, location, skills/services, rates for providers) → Profile created with confirmation
- **Success criteria**: User can view their complete profile, edit information, and role-appropriate features are accessible

### Service Browse & Filter
- **Functionality**: Searchable directory of service providers with multi-criteria filtering
- **Purpose**: Enables clients to efficiently find qualified providers matching their specific needs
- **Trigger**: Landing page search or "Find Services" navigation
- **Progression**: View service categories → Select category → Apply filters (rating, location, price range) → Browse provider cards → Click for detailed profile
- **Success criteria**: Results update instantly on filter changes, empty states guide users, provider cards show key info (name, rating, price, service)

### Provider Announcement Creation
- **Functionality**: Providers can create, edit, and manage service announcements with detailed information
- **Purpose**: Allows service providers to advertise their offerings with custom pricing, availability, and descriptions
- **Trigger**: "Nouvelle annonce" button in Provider Dashboard
- **Progression**: Provider logs in → Access dashboard → Click create announcement → Fill details (title, description, category, hourly rate, location, availability, services) → Submit → Announcement appears in marketplace
- **Success criteria**: Announcement form validates all required fields, providers can edit/delete announcements, toggle active/inactive status, announcements display in marketplace when active

### Direct Booking System
- **Functionality**: Calendar-based appointment scheduling with instant confirmation
- **Purpose**: Eliminates communication friction by allowing immediate service booking with clear availability
- **Trigger**: "Book Service" button on provider profile
- **Progression**: Select service type → Choose available date/time from calendar → Review booking details → Confirm and pay → Booking confirmation with details
- **Success criteria**: Only available slots shown, double-booking prevented, both parties receive booking notification

### Secure Payment & Escrow
- **Functionality**: Stripe integration with escrow holding funds until service completion
- **Purpose**: Protects both parties - client funds held securely, provider guaranteed payment upon completion
- **Trigger**: Booking confirmation action
- **Progression**: Enter payment details → Process payment → Funds held in escrow → Service completed → Provider marks complete → Client confirms → Funds released
- **Success criteria**: Payment processes without errors, escrow status visible to both parties, automatic release after client confirmation

### Review & Rating System
- **Functionality**: Post-service rating (1-5 stars) and written review submission
- **Purpose**: Maintains quality standards and builds trust through transparent feedback
- **Trigger**: Service marked as complete, prompt sent to client
- **Progression**: Complete service notification → "Leave Review" prompt → Rate experience (stars) → Write optional review → Submit → Review appears on provider profile
- **Success criteria**: Reviews display on provider profiles, average rating calculated and displayed prominently, only verified clients can review

### Admin Dashboard
- **Functionality**: Centralized control panel for platform oversight and management
- **Purpose**: Enables platform governance, dispute resolution, and operational monitoring
- **Trigger**: Admin user login
- **Progression**: Login as admin → Dashboard overview (stats) → Access user management/bookings/payments/disputes sections → Take actions (suspend users, refund payments, resolve disputes)
- **Success criteria**: All users/bookings/payments visible and searchable, actions take effect immediately, audit log of admin actions maintained

### Provider Dashboard
- **Functionality**: Dedicated interface for providers to manage announcements, view bookings, track earnings, and monitor reviews
- **Purpose**: Gives providers complete control over their service offerings and business performance
- **Trigger**: Provider user login and dashboard access
- **Progression**: Login as provider → View stats (announcements, bookings, earnings, rating) → Manage announcements tab → View received bookings → Read customer reviews
- **Success criteria**: All provider-specific data isolated and displayed, real-time updates on bookings and payments, announcement CRUD operations work flawlessly

## Edge Case Handling

- **No-show appointments**: Automatic notification system prompts client to confirm/cancel 24h before, cancellation policy clearly stated during booking
- **Disputed services**: Admin dispute resolution interface allows review of booking details, messages, and evidence before deciding fund distribution
- **Provider unavailability**: Calendar integration requires providers to keep availability current, auto-decline bookings for unavailable slots
- **Failed payments**: Clear error messages with retry option, booking held temporarily (15 min) before release
- **Incomplete profiles**: Progressive disclosure prompts users to complete profiles for full access, visible completion percentage
- **Rating manipulation**: One review per booking, verified completion required, admin can flag suspicious patterns
- **Inactive announcements**: Providers can temporarily deactivate announcements without deletion, allowing seasonal service management
- **Duplicate announcements**: System allows multiple announcements per provider for different service offerings

## Design Direction

The design should feel professional, trustworthy, and efficient - evoking the credibility of financial services with the approachability of a modern marketplace. A minimal interface serves the core purpose best, allowing service offerings and provider credentials to take center stage without visual competition from decorative elements.

## Color Selection

**Triadic** color scheme using professional blue, trust-building green, and warm accent orange to balance corporate credibility with human approachability and energetic action.

- **Primary Color**: Deep Professional Blue (oklch(0.45 0.15 250)) - Communicates trust, stability, and corporate professionalism essential for financial transactions
- **Secondary Colors**: 
  - Forest Green (oklch(0.55 0.12 155)) - Represents growth, success, and verified trust signals
  - Soft Gray (oklch(0.95 0.005 250)) - Neutral background allowing content to breathe
- **Accent Color**: Vibrant Coral (oklch(0.68 0.18 25)) - Energetic call-to-action color that draws attention without aggression
- **Foreground/Background Pairings**:
  - Background (White oklch(0.99 0 0)): Charcoal text (oklch(0.25 0.01 250)) - Ratio 14.2:1 ✓
  - Card (Soft Gray oklch(0.97 0.005 250)): Charcoal text (oklch(0.25 0.01 250)) - Ratio 13.1:1 ✓
  - Primary (Deep Blue oklch(0.45 0.15 250)): White text (oklch(0.99 0 0)) - Ratio 7.8:1 ✓
  - Secondary (Forest Green oklch(0.55 0.12 155)): White text (oklch(0.99 0 0)) - Ratio 4.9:1 ✓
  - Accent (Vibrant Coral oklch(0.68 0.18 25)): White text (oklch(0.99 0 0)) - Ratio 4.6:1 ✓
  - Muted (Light Gray oklch(0.92 0.005 250)): Medium Gray text (oklch(0.50 0.01 250)) - Ratio 6.1:1 ✓

## Font Selection

Typography should convey modern professionalism with excellent readability across dense information displays like booking calendars and service listings - Inter for its technical clarity and neutral character.

- **Typographic Hierarchy**:
  - H1 (Page Titles): Inter Bold / 32px / -0.02em letter spacing / line-height 1.2
  - H2 (Section Headers): Inter Semibold / 24px / -0.01em / line-height 1.3
  - H3 (Card Titles): Inter Medium / 18px / normal / line-height 1.4
  - Body (Primary Text): Inter Regular / 15px / normal / line-height 1.6
  - Small (Metadata): Inter Regular / 13px / normal / line-height 1.5
  - Button Text: Inter Medium / 15px / normal / line-height 1

## Animations

Animations should feel efficient and purposeful - quick transitions that confirm actions without adding delays, subtle hover states that indicate interactivity, and smooth loading states that maintain user confidence during processing.

- **Purposeful Meaning**: Calendar date selections use subtle scale animations to confirm booking selections, payment processing shows secure lock icon pulse to reinforce trust, completed bookings slide in confirmation with gentle celebration
- **Hierarchy of Movement**: High priority: booking confirmation animations and payment processing indicators. Medium priority: filter panel slides and card hover elevations. Low priority: micro-interactions on profile badges and rating stars

## Component Selection

- **Components**:
  - **Dialog**: User registration flows, booking confirmation modals, review submission
  - **Card**: Service provider listings, booking summaries, dashboard stat cards
  - **Calendar**: Date/time picker for booking appointments (react-day-picker)
  - **Select**: Service category filters, location dropdowns, role selection
  - **Input**: Search bars, profile form fields, review text
  - **Button**: Primary actions (Book Service, Sign Up) use filled primary style, secondary actions use outline
  - **Avatar**: User profile images with fallback to initials
  - **Badge**: Service categories, verification status, rating displays
  - **Tabs**: Dashboard sections (Overview, Bookings, Reviews), admin panel navigation
  - **Table**: Admin dashboard for users/bookings/payments listing
  - **Textarea**: Bio fields, review text areas
  - **Slider**: Price range filter
  - **Rating Display**: Custom star rating component using Phosphor Star icons
  - **Toast**: Booking confirmations, payment success, error notifications (sonner)
  
- **Customizations**:
  - **Provider Card Component**: Combines avatar, badge, rating stars, and book button in cohesive layout
  - **Booking Timeline**: Visual stepper showing booking status (Pending → Paid → Completed → Reviewed)
  - **Escrow Status Indicator**: Progress visualization showing payment flow from client → escrow → provider
  - **Filter Panel**: Collapsible sidebar with category, location, price, rating filters
  - **Dashboard Stats**: Metric cards with trend indicators and comparative data
  
- **States**:
  - Buttons: Distinct hover (elevated shadow), active (pressed scale 0.98), loading (spinner), disabled (muted opacity)
  - Inputs: Focus ring in primary color, error state in destructive red with message, success state with green checkmark
  - Cards: Hover elevation increase, selected state with primary border, loading skeleton
  
- **Icon Selection**:
  - MagnifyingGlass (search), Funnel (filters), Calendar (bookings), Star (ratings)
  - CreditCard (payments), MapPin (location), Clock (availability), User (profiles)
  - ShieldCheck (verification), ChatCircle (reviews), Gear (settings), ChartLine (admin stats)
  
- **Spacing**:
  - Container padding: p-6 (desktop), p-4 (mobile)
  - Card spacing: gap-4 for content, p-6 for padding
  - Form fields: gap-4 between inputs, gap-2 for label/input pairs
  - Grid layouts: gap-6 for provider cards, gap-8 for major sections
  
- **Mobile**:
  - Filter panel converts to bottom sheet drawer on mobile
  - Provider cards stack vertically with full width
  - Navigation converts to hamburger menu with slide-out
  - Calendar uses single month view on mobile, multiple on desktop
  - Dashboard tables convert to card list view with key info prioritized
