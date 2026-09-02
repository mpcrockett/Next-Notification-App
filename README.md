# PT Notifications

An internal clinic tool that streamlines patient room assignment communication 
between front desk staff and physical therapists.

## The Problem

In a busy physical therapy clinic, admins need a fast, reliable way to notify 
therapists when their patients are ready and which room they've been assigned to. 
Phone calls interrupt sessions. Walking to find a therapist wastes time. 

PT Notifications solves this with a simple form that sends an instant SMS to the 
right therapist in seconds.

## Features

- 🔐 Google OAuth login restricted to clinic domain
- 📋 Simple form to select therapist, room number, and appointment time
- 📱 Instant SMS notification via Twilio
- ✅ SMS opt-in consent flow for providers
- 🗃️ Notification history logged to database

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Language** — TypeScript
- **Database** — PostgreSQL via Prisma ORM
- **Auth** — NextAuth.js with Google OAuth
- **SMS** — Twilio
- **Deployment** — coming soon

## Getting Started

### Prerequisites
- Node.js 22+
- PostgreSQL database
- Twilio account
- Google OAuth credentials

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
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number

4. Run database migrations
```bash
   npx prisma migrate dev
```

5. Start the development server
```bash
   npm run dev
```

## Usage

1. Sign in with your clinic Google account
2. Complete profile setup with your phone number and SMS opt-in
3. Select a therapist, room number, and appointment time
4. Hit submit — the therapist receives an SMS instantly

## Background

This app was designed and built by a physical therapy clinic admin who identified 
a real workflow problem and built the solution. It is currently pending Twilio 
toll-free number registration for production deployment.