# PT Notifications

An internal clinic tool that streamlines patient room assignment communication 
between front desk staff and physical therapists.

## The Problem

In a busy physical therapy clinic, admins need a fast, reliable way to notify 
therapists when their patients are ready and which room they've been assigned to. 
Phone calls interrupt sessions. Walking to find a therapist wastes time. 

PT Notifications solves this with a simple form that sends an instant push notification
to the right therapist in seconds.

## Features

-  Google OAuth login restricted to clinic domain
-  Simple form to select therapist, room number, and appointment time
-  Instant push notifications via ntfy.sh
-  UUID-based personal notification channels for provider privacy
-  Notification history logged to database
-  Role-based onboarding for providers and admins

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Language** — TypeScript
- **Database** — PostgreSQL via Prisma ORM
- **Auth** — NextAuth.js with Google OAuth
- **Notifications** — ntfy.sh
- **Testing** — Jest
- **Deployment** — coming soon

## Getting Started

### Prerequisites
- Node.js 22+
- PostgreSQL database
- Google OAuth credentials
- ntfy.sh app installed on provider devices ([iOS](https://apps.apple.com/us/app/ntfy/id1625396347) / [Android](https://play.google.com/store/apps/details?id=io.heckel.ntfy))

### Installation

1. Clone the repo
```bash
git clone https://github.com/mpcrockett/Next-Notification-App.git
cd Next-Notification-App
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables — create a `.env.local` file:
DATABASE_URL=your_postgres_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NTFY_BASE_URL=https://ntfy.sh

4. Run database migrations
```bash
npx prisma migrate dev
```

5. Start the development server
```bash
npm run dev
```

## Usage

### Providers (Physical Therapists)
1. Sign in with your clinic Google account
2. Select your role during onboarding
3. Download ntfy.sh and subscribe to your personal topic (your user ID)
4. Send a test notification to confirm setup
5. Complete onboarding

### Admins
1. Sign in with your clinic Google account
2. Select your role as Admin during onboarding
3. Use the notification form to select a therapist, room, and appointment time
4. Hit submit — the therapist receives an instant push notification

## How Notifications Work

Each provider is assigned a unique UUID as their personal ntfy.sh channel during 
account creation. This means notification channels are unguessable and private — 
no configuration required beyond installing the ntfy.sh app.

## Background

This app was designed and built by a physical therapy clinic admin who identified 
a real workflow problem and built the solution. It is actively used at the clinic 
and open to contributions.

## Running Tests

```bash
npm test
```