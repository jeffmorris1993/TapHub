# Tap Hub - C4 Architecture Model (Modular Monolith on GCP)

## Executive Summary

Tap Hub is a mobile-first, tap-to-engage church communication platform designed as a **modular monolith** with background job processing, deployed on **Google Cloud Platform (GCP)** and integrated with **Google Workspace** for single sign-on (SSO).

**Architecture Pattern:** Modular Monolith with Async Background Jobs
**Cloud Platform:** Google Cloud Platform (GCP)
**Authentication:** Google Workspace SSO
**Why:** Single church use case, low traffic volume, simple workflows, native Google integration, cost-effective

**Technology Stack:**
- Frontend: React + TypeScript + Emotion CSS
- Backend: Python FastAPI (Single Application)
- Background Jobs: Cloud Tasks (or Celery + Redis)
- Database: Cloud SQL (PostgreSQL)
- Authentication: Google Workspace SSO
- Deployment: Cloud Run (Serverless Containers)

---

## Level 1: System Context Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Tap Hub Ecosystem                            │
│                         (Google Cloud Platform)                     │
│                                                                     │
│  ┌──────────────┐          ┌─────────────────┐                    │
│  │   Visitors   │◄─────────┤   Public Hub    │                    │
│  │  & Members   │          │  (React SPA)    │                    │
│  │              │          │  Cloud Storage  │                    │
│  └──────────────┘          └────────┬────────┘                    │
│                                     │                              │
│  ┌──────────────┐          ┌────────▼────────┐                    │
│  │   Pastors    │◄─────────┤   Admin Hub     │                    │
│  │  & Leaders   │  Google  │  (React SPA)    │                    │
│  │              │  Workspace│  Cloud Storage  │                    │
│  │              │    SSO    │                 │                    │
│  └──────────────┘          └────────┬────────┘                    │
│                                     │                              │
│                            ┌────────▼────────┐                     │
│                            │   Tap Hub API   │                     │
│                            │   (Cloud Run)   │                     │
│                            └────────┬────────┘                     │
│                                     │                              │
│              ┌──────────────────────┼──────────────────┐           │
│              │                      │                  │           │
│     ┌────────▼────────┐    ┌───────▼──────┐  ┌────────▼────────┐ │
│     │  Google         │    │  Cloud SQL   │  │  Cloud Tasks    │ │
│     │  Calendar API   │    │ (PostgreSQL) │  │  (Background    │ │
│     │                 │    │              │  │   Jobs)         │ │
│     └─────────────────┘    └──────────────┘  └────────┬────────┘ │
│                                                        │          │
│                                               ┌────────▼────────┐ │
│                                               │  Memorystore    │ │
│                                               │  (Redis)        │ │
│                                               └─────────────────┘ │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘

External Google Services (Native Integration):
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ Google          │  │ Google          │  │ Google          │
│ Workspace       │  │ Calendar API    │  │ Identity        │
│ (@church.org)   │  │                 │  │ Platform (SSO)  │
└─────────────────┘  └─────────────────┘  └─────────────────┘

External Services:
┌─────────────────┐  ┌─────────────────┐
│  SendGrid       │  │  NFC/QR Code    │
│  (Email)        │  │  Scanners       │
└─────────────────┘  └─────────────────┘
```

**Key Relationships:**
- **Visitors/Members** → Access Public Hub (hosted on Cloud Storage CDN)
- **Pastors/Leaders** → Sign in via Google Workspace SSO → Admin Hub
- **Admin Hub** → Calls Tap Hub API (Cloud Run)
- **Cloud Run** → Reads/writes Cloud SQL PostgreSQL
- **Cloud Tasks** → Handle async jobs (Google Calendar sync, email notifications)
- **Google Calendar** → Syncs when events are approved (via Cloud Tasks)

---

## Level 2: Container Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      Tap Hub Platform (GCP)                             │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                      Frontend Layer                              │  │
│  │                                                                  │  │
│  │  ┌────────────────────┐         ┌───────────────────┐          │  │
│  │  │   Public Hub SPA   │         │  Admin Hub SPA    │          │  │
│  │  │                    │         │                   │          │  │
│  │  │  • React 18+       │         │  • React 18+      │          │  │
│  │  │  • TypeScript      │         │  • TypeScript     │          │  │
│  │  │  • Emotion CSS     │         │  • Emotion CSS    │          │  │
│  │  │  • React Router    │         │  • React Router   │          │  │
│  │  │  • Axios           │         │  • Google OAuth   │          │  │
│  │  │  • Mobile-first    │         │  • Role-based UI  │          │  │
│  │  │                    │         │                   │          │  │
│  │  │  Hosted on:        │         │  Hosted on:       │          │  │
│  │  │  Cloud Storage     │         │  Cloud Storage    │          │  │
│  │  │  + CDN             │         │  + CDN            │          │  │
│  │  └──────────┬─────────┘         └─────────┬─────────┘          │  │
│  │             │                             │                    │  │
│  └─────────────┼─────────────────────────────┼────────────────────┘  │
│                │                             │                        │
│                └──────────────┬──────────────┘                        │
│                               │                                       │
│  ┌────────────────────────────▼─────────────────────────────────────┐ │
│  │           Cloud Load Balancer (HTTPS)                            │ │
│  │                                                                  │ │
│  │  • SSL/TLS termination                                           │ │
│  │  • DDoS protection (Cloud Armor)                                 │ │
│  │  • Rate limiting (100 req/min per IP)                            │ │
│  │  • Global CDN                                                    │ │
│  │  • Health checks                                                 │ │
│  └──────────────────────────┬───────────────────────────────────────┘ │
│                             │                                         │
│  ┌──────────────────────────▼───────────────────────────────────────┐ │
│  │                 Cloud Run Service (FastAPI)                      │ │
│  │                                                                  │ │
│  │  ┌────────────────────────────────────────────────────────────┐ │ │
│  │  │                 Application Core                           │ │ │
│  │  │                                                            │ │ │
│  │  │  ┌──────────────────────────────────────────────────────┐ │ │ │
│  │  │  │             API Routes Layer                         │ │ │ │
│  │  │  │                                                      │ │ │ │
│  │  │  │  /api/events          /api/announcements            │ │ │ │
│  │  │  │  /api/approvals       /api/auth/google              │ │ │ │
│  │  │  │  /api/users           /api/calendar                 │ │ │ │
│  │  │  │  /api/submissions     /api/rsvp                     │ │ │ │
│  │  │  └──────────────────────┬───────────────────────────────┘ │ │ │
│  │  │                         │                                 │ │ │
│  │  │  ┌──────────────────────▼───────────────────────────────┐ │ │ │
│  │  │  │            Domain Services Layer                     │ │ │ │
│  │  │  │                                                      │ │ │ │
│  │  │  │  ┌───────────┐  ┌───────────┐  ┌──────────────┐   │ │ │ │
│  │  │  │  │  Events   │  │Announce-  │  │  Approvals   │   │ │ │ │
│  │  │  │  │  Module   │  │ments      │  │   Module     │   │ │ │ │
│  │  │  │  │           │  │Module     │  │              │   │ │ │ │
│  │  │  │  └─────┬─────┘  └─────┬─────┘  └──────┬───────┘   │ │ │ │
│  │  │  │        │              │                │           │ │ │ │
│  │  │  │  ┌─────▼─────┐  ┌─────▼─────┐  ┌──────▼───────┐   │ │ │ │
│  │  │  │  │   Auth    │  │   Users   │  │    RSVP      │   │ │ │ │
│  │  │  │  │  Module   │  │  Module   │  │   Module     │   │ │ │ │
│  │  │  │  │           │  │           │  │              │   │ │ │ │
│  │  │  │  │ • Google  │  │           │  │              │   │ │ │ │
│  │  │  │  │   OAuth   │  │           │  │              │   │ │ │ │
│  │  │  │  │   Verify  │  │           │  │              │   │ │ │ │
│  │  │  │  └─────┬─────┘  └─────┬─────┘  └──────┬───────┘   │ │ │ │
│  │  │  │        │              │                │           │ │ │ │
│  │  │  └────────┼──────────────┼────────────────┼───────────┘ │ │ │
│  │  │           │              │                │             │ │ │
│  │  │  ┌────────▼──────────────▼────────────────▼───────────┐ │ │ │
│  │  │  │          Database Access Layer (SQLAlchemy)        │ │ │ │
│  │  │  │                                                    │ │ │ │
│  │  │  │  • ORM Models                                      │ │ │ │
│  │  │  │  • Repository Pattern                              │ │ │ │
│  │  │  │  • Query Builders                                  │ │ │ │
│  │  │  └────────────────────────┬───────────────────────────┘ │ │ │
│  │  │                           │                             │ │ │
│  │  └───────────────────────────┼─────────────────────────────┘ │ │
│  │                              │                               │ │
│  │  ┌───────────────────────────▼─────────────────────────────┐ │ │
│  │  │          Integration Layer                              │ │ │
│  │  │                                                         │ │ │
│  │  │  • Google Calendar Client (Service Account)            │ │ │
│  │  │  • Google OAuth Client (ID Token verification)         │ │ │
│  │  │  • SendGrid Email Client                               │ │ │
│  │  │  • Cloud Tasks Client (Queue jobs)                     │ │ │
│  │  └─────────────────────────────────────────────────────────┘ │ │
│  │                                                              │ │
│  │  Auto-scaling: 0 to 10 instances                             │ │
│  │  Region: us-central1                                         │ │
│  │  Request timeout: 300s                                       │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │               Background Job Processing                      │ │
│  │                                                              │ │
│  │  ┌────────────────────────────────────────────────────────┐ │ │
│  │  │           Cloud Tasks (HTTP Tasks)                     │ │ │
│  │  │                                                        │ │ │
│  │  │  Task Queues:                                         │ │ │
│  │  │  • calendar-sync-queue                                │ │ │
│  │  │  • notification-queue                                 │ │ │
│  │  │  • email-queue                                        │ │ │
│  │  │                                                        │ │ │
│  │  │  Tasks (HTTP POST to Cloud Run):                      │ │ │
│  │  │  • /tasks/sync-calendar                               │ │ │
│  │  │  • /tasks/send-approval-notification                  │ │ │
│  │  │  • /tasks/send-change-request-email                   │ │ │
│  │  │  • /tasks/send-rsvp-confirmation                      │ │ │
│  │  └────────────────────┬───────────────────────────────────┘ │ │
│  │                       │                                     │ │
│  │  ┌────────────────────▼───────────────────────────────────┐ │ │
│  │  │          Cloud Scheduler (Cron Jobs)                   │ │ │
│  │  │                                                        │ │ │
│  │  │  Scheduled Tasks:                                     │ │ │
│  │  │  • send-weekly-digest (Mon 8am)                       │ │ │
│  │  │  • cleanup-old-submissions (Daily 2am)                │ │ │
│  │  └────────────────────────────────────────────────────────┘ │ │
│  │                                                              │ │
│  │  Alternative: Celery Workers (if preferred)                 │ │
│  │  ┌────────────────────────────────────────────────────────┐ │ │
│  │  │  Cloud Run Service (Celery Worker)                     │ │ │
│  │  │  • Min instances: 1                                    │ │ │
│  │  │  • Max instances: 5                                    │ │ │
│  │  │  • CPU always allocated                                │ │ │
│  │  └────────────────────┬───────────────────────────────────┘ │ │
│  │                       │                                     │ │
│  │  ┌────────────────────▼───────────────────────────────────┐ │ │
│  │  │          Memorystore for Redis                         │ │ │
│  │  │                                                        │ │ │
│  │  │  • Celery broker/backend (if using Celery)            │ │ │
│  │  │  • Session cache                                      │ │ │
│  │  │  • Rate limiting data                                 │ │ │
│  │  │                                                        │ │ │
│  │  │  Tier: Basic (1GB)                                    │ │ │
│  │  │  Region: us-central1                                  │ │ │
│  │  └────────────────────────────────────────────────────────┘ │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                     Data Layer                               │ │
│  │                                                              │ │
│  │  ┌────────────────────────────────────────────────────────┐ │ │
│  │  │            Cloud SQL for PostgreSQL                    │ │ │
│  │  │                                                        │ │ │
│  │  │  Instance: db-f1-micro (MVP) → db-g1-small (Prod)     │ │ │
│  │  │  Region: us-central1                                  │ │ │
│  │  │  Version: PostgreSQL 15                               │ │ │
│  │  │                                                        │ │ │
│  │  │  Features:                                             │ │ │
│  │  │  • Automated backups (daily)                           │ │ │
│  │  │  • Point-in-time recovery                              │ │ │
│  │  │  • High availability (99.95% SLA)                      │ │ │
│  │  │  • Private IP (VPC)                                    │ │ │
│  │  │  • SSL/TLS encryption                                  │ │ │
│  │  │                                                        │ │ │
│  │  │  Tables:                                               │ │ │
│  │  │  • events                                              │ │ │
│  │  │  • announcements                                       │ │ │
│  │  │  • users                                               │ │ │
│  │  │  • approvals                                           │ │ │
│  │  │  • rsvps                                               │ │ │
│  │  │  • submissions (forms)                                 │ │ │
│  │  └────────────────────────────────────────────────────────┘ │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                  GCP Platform Services                       │ │
│  │                                                              │ │
│  │  ┌────────────────────────────────────────────────────────┐ │ │
│  │  │  Secret Manager                                        │ │ │
│  │  │                                                        │ │ │
│  │  │  • Google OAuth credentials                            │ │ │
│  │  │  • Database passwords                                  │ │ │
│  │  │  • API keys (SendGrid, Twilio)                         │ │ │
│  │  │  • JWT secret key                                      │ │ │
│  │  │  • Google Calendar service account JSON                │ │ │
│  │  └────────────────────────────────────────────────────────┘ │ │
│  │                                                              │ │
│  │  ┌────────────────────────────────────────────────────────┐ │ │
│  │  │  Cloud Storage                                         │ │ │
│  │  │                                                        │ │ │
│  │  │  Buckets:                                              │ │ │
│  │  │  • taphub-public-hub (React build)                     │ │ │
│  │  │  • taphub-admin-hub (React build)                      │ │ │
│  │  │  • taphub-event-images (uploaded images)               │ │ │
│  │  │                                                        │ │ │
│  │  │  Features:                                             │ │ │
│  │  │  • CDN-enabled                                         │ │ │
│  │  │  • Public read access (static sites)                   │ │ │
│  │  │  • Signed URLs (uploaded files)                        │ │ │
│  │  └────────────────────────────────────────────────────────┘ │ │
│  │                                                              │ │
│  │  ┌────────────────────────────────────────────────────────┐ │ │
│  │  │  Cloud Logging & Monitoring                            │ │ │
│  │  │                                                        │ │ │
│  │  │  • Application logs (stdout/stderr)                    │ │ │
│  │  │  • Error reporting                                     │ │ │
│  │  │  • Request tracing                                     │ │ │
│  │  │  • Performance metrics                                 │ │ │
│  │  │  • Uptime checks                                       │ │ │
│  │  │  • Alerts (Email/Slack)                                │ │ │
│  │  └────────────────────────────────────────────────────────┘ │ │
│  │                                                              │ │
│  │  ┌────────────────────────────────────────────────────────┐ │ │
│  │  │  Identity Platform (Google OAuth)                      │ │ │
│  │  │                                                        │ │ │
│  │  │  • OAuth 2.0 for Google Workspace                      │ │ │
│  │  │  • Domain restriction (@nehemiahstemple.org)           │ │ │
│  │  │  • ID token verification                               │ │ │
│  │  │  • User info endpoint                                  │ │ │
│  │  └────────────────────────────────────────────────────────┘ │ │
│  └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘

External Services:
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  Google         │  │  Google         │  │  SendGrid       │
│  Calendar API   │  │  Workspace      │  │  Email API      │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

**Container Responsibilities:**

1. **Public Hub SPA**: Mobile-first React app for visitors
   - View announcements, events, service times
   - Submit forms (new visitor, feedback, prayer)
   - RSVP to events
   - Hosted as static site on Cloud Storage with CDN

2. **Admin Hub SPA**: Protected React app for church leadership
   - Sign in with Google Workspace SSO
   - Create/edit events and announcements
   - Approve/reject submissions
   - Request changes with feedback
   - Hosted as static site on Cloud Storage with CDN

3. **Cloud Load Balancer**: Global HTTPS entry point
   - SSL/TLS termination
   - DDoS protection (Cloud Armor)
   - Rate limiting (100 req/min per IP)
   - CDN for static assets
   - Health checks for Cloud Run

4. **Cloud Run (FastAPI)**: Serverless container platform
   - Auto-scales from 0 to 10 instances
   - Pay only for actual requests
   - ACID transactions via Cloud SQL
   - Google OAuth verification
   - Easy to debug and maintain

5. **Cloud Tasks**: Managed task queue service
   - HTTP-based tasks (calls Cloud Run endpoints)
   - Automatic retries with exponential backoff
   - Better than Celery for GCP (serverless, managed)
   - No Redis required

6. **Cloud Scheduler**: Cron job service
   - Scheduled periodic tasks
   - Sends weekly digest every Monday
   - Triggers Cloud Tasks or Cloud Run directly

7. **Cloud SQL (PostgreSQL)**: Managed database
   - ACID transactions
   - Automated backups
   - High availability (99.95% SLA)
   - Point-in-time recovery

8. **Memorystore (Redis)**: Optional - only if using Celery
   - Managed Redis service
   - Session cache
   - Rate limiting data
   - NOT needed if using Cloud Tasks

---

## Level 3: Component Diagram (Application Internal Structure)

### FastAPI Application Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FastAPI Application                              │
│                      (Cloud Run Container)                          │
│                                                                     │
│  app/                                                               │
│  │                                                                  │
│  ├── main.py                    ← Application entry point          │
│  ├── config.py                  ← GCP environment config           │
│  ├── database.py                ← Cloud SQL connection             │
│  │                                                                  │
│  ├── api/                       ← API Routes Layer                 │
│  │   ├── deps.py                ← Dependencies (auth, db)          │
│  │   └── v1/                                                       │
│  │       ├── __init__.py                                           │
│  │       ├── events.py          ← GET/POST /api/v1/events          │
│  │       ├── announcements.py   ← GET/POST /api/v1/announcements   │
│  │       ├── approvals.py       ← POST /api/v1/approvals           │
│  │       ├── auth.py            ← POST /api/v1/auth/google         │
│  │       ├── users.py           ← GET/POST /api/v1/users           │
│  │       ├── rsvp.py            ← POST /api/v1/rsvp                │
│  │       ├── submissions.py     ← POST /api/v1/submissions         │
│  │       └── tasks.py           ← POST /api/v1/tasks/* (Cloud Tasks)│
│  │                                                                  │
│  ├── domains/                   ← Domain/Business Logic Layer      │
│  │   │                                                             │
│  │   ├── events/                                                   │
│  │   │   ├── __init__.py                                           │
│  │   │   ├── models.py          ← SQLAlchemy Event model           │
│  │   │   ├── schemas.py         ← Pydantic request/response        │
│  │   │   ├── service.py         ← Business logic                   │
│  │   │   └── repository.py      ← Data access layer                │
│  │   │                                                             │
│  │   ├── announcements/                                            │
│  │   │   ├── models.py                                             │
│  │   │   ├── schemas.py                                            │
│  │   │   ├── service.py                                            │
│  │   │   └── repository.py                                         │
│  │   │                                                             │
│  │   ├── approvals/                                                │
│  │   │   ├── models.py          ← Approval workflow                │
│  │   │   ├── schemas.py                                            │
│  │   │   ├── service.py         ← State machine logic              │
│  │   │   └── repository.py                                         │
│  │   │                                                             │
│  │   ├── auth/                                                     │
│  │   │   ├── models.py          ← User model (no passwords!)       │
│  │   │   ├── schemas.py                                            │
│  │   │   ├── service.py         ← Google OAuth verification        │
│  │   │   ├── repository.py                                         │
│  │   │   └── permissions.py     ← RBAC logic                       │
│  │   │                                                             │
│  │   └── rsvp/                                                     │
│  │       ├── models.py                                             │
│  │       ├── schemas.py                                            │
│  │       ├── service.py                                            │
│  │       └── repository.py                                         │
│  │                                                                  │
│  ├── integrations/              ← External Service Clients         │
│  │   ├── __init__.py                                               │
│  │   ├── google_calendar.py    ← Google Calendar API wrapper       │
│  │   ├── google_oauth.py       ← OAuth ID token verification       │
│  │   ├── sendgrid.py           ← Email sending via SendGrid        │
│  │   ├── cloud_tasks.py        ← Cloud Tasks queue client          │
│  │   └── secret_manager.py     ← GCP Secret Manager client         │
│  │                                                                  │
│  ├── workers/                   ← Background Job Handlers          │
│  │   ├── __init__.py                                               │
│  │   ├── task_handlers.py      ← Cloud Tasks HTTP handlers         │
│  │   └── celery_app.py         ← (Optional) Celery config          │
│  │                                                                  │
│  ├── core/                      ← Shared Utilities                 │
│  │   ├── security.py           ← JWT generation                    │
│  │   ├── exceptions.py         ← Custom exceptions                 │
│  │   ├── gcp.py                ← GCP service initializers          │
│  │   └── utils.py              ← Helper functions                  │
│  │                                                                  │
│  └── tests/                     ← Test Suite                       │
│      ├── test_events.py                                            │
│      ├── test_approvals.py                                         │
│      ├── test_auth.py                                              │
│      └── test_google_oauth.py                                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Component Details: Google OAuth SSO Flow

### Authentication with Google Workspace

```
┌─────────────────────────────────────────────────────────────────┐
│                  Google OAuth SSO Flow                          │
│                                                                 │
│  1. User clicks "Sign in with Google" in Admin Hub             │
│     │                                                           │
│     ├──> React app redirects to Google OAuth consent screen    │
│     │    https://accounts.google.com/o/oauth2/v2/auth          │
│     │    ?client_id=xxx                                        │
│     │    &redirect_uri=https://admin.church.org/callback       │
│     │    &scope=openid email profile                           │
│     │    &hd=nehemiahstemple.org  ← DOMAIN RESTRICTION         │
│     │                                                           │
│  2. User authenticates with Google Workspace                   │
│     │                                                           │
│     ├──> Google verifies user is @nehemiahstemple.org          │
│     ├──> Google shows consent screen (first time only)         │
│     ├──> Google generates ID token + access token              │
│     │                                                           │
│  3. Google redirects back to app with tokens                   │
│     │                                                           │
│     └──> https://admin.church.org/callback?code=xxx            │
│                                                                 │
│  4. React app exchanges code for ID token                      │
│     │                                                           │
│     ├──> POST https://oauth2.googleapis.com/token              │
│     │    Body: { code, client_id, client_secret }              │
│     │                                                           │
│     └──> Response: { id_token, access_token }                  │
│                                                                 │
│  5. React app sends ID token to FastAPI backend                │
│     │                                                           │
│     ├──> POST /api/v1/auth/google                              │
│     │    Body: { token: "eyJhbGc..." }                          │
│     │                                                           │
│  6. FastAPI verifies ID token with Google                      │
│     │                                                           │
│     ├──> google.oauth2.id_token.verify_oauth2_token()          │
│     │    • Validates signature                                 │
│     │    • Checks expiration                                   │
│     │    • Verifies issuer (accounts.google.com)               │
│     │    • Confirms audience (your client_id)                  │
│     │                                                           │
│     └──> Returns: {                                            │
│              sub: "google_user_id_12345",                      │
│              email: "pastor@nehemiahstemple.org",              │
│              name: "John Smith",                               │
│              email_verified: true,                             │
│              hd: "nehemiahstemple.org"                         │
│          }                                                      │
│                                                                 │
│  7. FastAPI checks email domain                                │
│     │                                                           │
│     ├──> if not email.endswith("@nehemiahstemple.org"):        │
│     │        raise HTTPException(403, "Domain not allowed")    │
│     │                                                           │
│  8. FastAPI creates/updates user in Cloud SQL                  │
│     │                                                           │
│     ├──> user = db.query(User).filter_by(email=email).first() │
│     │    if not user:                                          │
│     │        user = User(                                      │
│     │            email=email,                                  │
│     │            name=name,                                    │
│     │            google_id=google_user_id,                     │
│     │            role=auto_assign_role(email)                  │
│     │        )                                                 │
│     │        db.add(user)                                      │
│     │        db.commit()                                       │
│     │                                                           │
│  9. FastAPI generates app JWT token                            │
│     │                                                           │
│     ├──> jwt_token = create_access_token(                      │
│     │        data={"sub": user.id, "role": user.role}          │
│     │    )                                                      │
│     │                                                           │
│  10. FastAPI returns JWT + user info to frontend               │
│      │                                                          │
│      └──> {                                                     │
│               access_token: "eyJhbGc...",                       │
│               token_type: "bearer",                             │
│               user: {                                           │
│                   id: "uuid",                                   │
│                   email: "pastor@nehemiahstemple.org",          │
│                   name: "John Smith",                           │
│                   role: "pastor"                                │
│               }                                                 │
│           }                                                     │
│                                                                 │
│  11. React app stores JWT in memory/localStorage               │
│      │                                                          │
│      └──> All subsequent API requests include:                 │
│           Authorization: Bearer eyJhbGc...                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Background Jobs: Cloud Tasks vs Celery

### Option 1: Cloud Tasks (Recommended for GCP)

```
┌─────────────────────────────────────────────────────────────────┐
│                     Cloud Tasks Architecture                    │
│                                                                 │
│  How it works:                                                  │
│  1. FastAPI queues task → Cloud Tasks                           │
│  2. Cloud Tasks makes HTTP POST → Cloud Run endpoint            │
│  3. Cloud Run executes task logic                               │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Approval Service (domains/approvals/service.py)         │  │
│  │                                                          │  │
│  │  def approve(approval_id, approver_id):                  │  │
│  │      # 1. Update database (ACID transaction)            │  │
│  │      db.begin_transaction()                              │  │
│  │      approval.status = "approved"                        │  │
│  │      event.status = "approved"                           │  │
│  │      db.commit()                                         │  │
│  │                                                          │  │
│  │      # 2. Queue Cloud Tasks (non-blocking)               │  │
│  │      from integrations.cloud_tasks import queue_task     │  │
│  │                                                          │  │
│  │      queue_task(                                         │  │
│  │          queue_name="calendar-sync",                     │  │
│  │          url="/api/v1/tasks/sync-calendar",              │  │
│  │          payload={"event_id": event.id}                  │  │
│  │      )                                                   │  │
│  │                                                          │  │
│  │      queue_task(                                         │  │
│  │          queue_name="notifications",                     │  │
│  │          url="/api/v1/tasks/send-approval-email",        │  │
│  │          payload={"approval_id": approval.id}            │  │
│  │      )                                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Cloud Tasks Client (integrations/cloud_tasks.py)        │  │
│  │                                                          │  │
│  │  from google.cloud import tasks_v2                       │  │
│  │                                                          │  │
│  │  def queue_task(queue_name, url, payload, delay_secs=0): │  │
│  │      client = tasks_v2.CloudTasksClient()                │  │
│  │                                                          │  │
│  │      # Create task that POSTs to Cloud Run              │  │
│  │      task = {                                            │  │
│  │          "http_request": {                               │  │
│  │              "http_method": "POST",                      │  │
│  │              "url": f"{CLOUD_RUN_URL}{url}",             │  │
│  │              "headers": {                                │  │
│  │                  "Content-Type": "application/json"      │  │
│  │              },                                          │  │
│  │              "body": json.dumps(payload).encode(),       │  │
│  │              "oidc_token": {  # Auth with service acct   │  │
│  │                  "service_account_email": SA_EMAIL       │  │
│  │              }                                           │  │
│  │          },                                              │  │
│  │          "schedule_time": now + timedelta(secs=delay)    │  │
│  │      }                                                   │  │
│  │                                                          │  │
│  │      # Queue it!                                         │  │
│  │      client.create_task(parent=queue_path, task=task)    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Task Handlers (api/v1/tasks.py)                        │  │
│  │                                                          │  │
│  │  @router.post("/tasks/sync-calendar")                    │  │
│  │  async def sync_calendar_task(payload: dict):            │  │
│  │      """Cloud Tasks calls this endpoint"""               │  │
│  │      event_id = payload["event_id"]                      │  │
│  │      event = db.query(Event).get(event_id)               │  │
│  │      calendar_client = GoogleCalendarClient()            │  │
│  │                                                          │  │
│  │      try:                                                │  │
│  │          calendar_client.create_event(event)             │  │
│  │      except Exception as e:                              │  │
│  │          # Cloud Tasks will auto-retry on error!         │  │
│  │          raise HTTPException(500, str(e))                │  │
│  │                                                          │  │
│  │  @router.post("/tasks/send-approval-email")              │  │
│  │  async def send_approval_email_task(payload: dict):      │  │
│  │      approval_id = payload["approval_id"]                │  │
│  │      # Send email logic...                               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Benefits:                                                      │
│  ✅ Serverless (no worker containers to manage)                │
│  ✅ Automatic retries with exponential backoff                 │
│  ✅ No Redis needed                                            │
│  ✅ Pay only for executed tasks                                │
│  ✅ Native GCP integration                                     │
│  ✅ Task deduplication built-in                                │
│                                                                 │
│  Free Tier:                                                     │
│  • 1 million task dispatches/month                             │
│  • 100,000 Cloud Run invocations/month                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Option 2: Celery (If You Want to Learn It)

```
┌─────────────────────────────────────────────────────────────────┐
│                     Celery Architecture (Alternative)           │
│                                                                 │
│  Requires:                                                      │
│  • Memorystore for Redis (message broker)                      │
│  • Separate Cloud Run service for Celery worker                │
│  • Cloud Scheduler to trigger Celery Beat                      │
│                                                                 │
│  workers/tasks.py                                               │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  from celery import Celery                               │  │
│  │                                                          │  │
│  │  celery_app = Celery(                                    │  │
│  │      'tasks',                                            │  │
│  │      broker=os.getenv('REDIS_URL'),                      │  │
│  │      backend=os.getenv('REDIS_URL')                      │  │
│  │  )                                                       │  │
│  │                                                          │  │
│  │  @celery_app.task(bind=True, max_retries=3)             │  │
│  │  def sync_event_to_calendar(self, event_id: str):       │  │
│  │      try:                                                │  │
│  │          event = db.query(Event).get(event_id)           │  │
│  │          calendar = GoogleCalendarClient()               │  │
│  │          calendar.create_event(event)                    │  │
│  │      except Exception as exc:                            │  │
│  │          # Retry with exponential backoff                │  │
│  │          countdown = 2 ** self.request.retries           │  │
│  │          raise self.retry(exc=exc, countdown=countdown)  │  │
│  │                                                          │  │
│  │  @celery_app.task                                        │  │
│  │  def send_approval_notification(approval_id: str):       │  │
│  │      # Email sending logic...                            │  │
│  │      pass                                                │  │
│  │                                                          │  │
│  │  # Scheduled task                                        │  │
│  │  @celery_app.on_after_finalize.connect                   │  │
│  │  def setup_periodic_tasks(sender, **kwargs):             │  │
│  │      sender.add_periodic_task(                           │  │
│  │          crontab(day_of_week=1, hour=8),                 │  │
│  │          send_weekly_digest.s()                          │  │
│  │      )                                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Deployment:                                                    │
│  • Cloud Run service for worker (CPU always allocated)         │
│  • Memorystore Redis instance (~$30/month)                     │
│  • Cloud Scheduler for periodic tasks                          │
│                                                                 │
│  Pros:                                                          │
│  ✅ Industry standard (learn valuable skill)                   │
│  ✅ Rich ecosystem of plugins                                  │
│  ✅ Advanced features (chaining, groups, etc.)                 │
│                                                                 │
│  Cons:                                                          │
│  ❌ Need to manage Redis                                       │
│  ❌ Worker container always running (costs more)               │
│  ❌ More complex than Cloud Tasks                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Recommendation:** Start with **Cloud Tasks** (simpler, cheaper, native GCP). Add Celery later if you need advanced features.

---

## Request Flow Examples

### Example 1: Creating and Approving an Event (with Cloud Tasks)

```
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│  Admin   │   │ Cloud Run│   │Cloud SQL │   │  Cloud   │   │  Google  │
│   Hub    │   │ (FastAPI)│   │(Postgres)│   │  Tasks   │   │ Calendar │
└────┬─────┘   └────┬─────┘   └────┬─────┘   └────┬─────┘   └────┬─────┘
     │              │              │              │              │
     │ POST /events │              │              │              │
     │ (Google JWT) │              │              │              │
     ├─────────────>│              │              │              │
     │              │              │              │              │
     │              │ Verify JWT   │              │              │
     │              ├─────────┐    │              │              │
     │              │         │    │              │              │
     │              │<────────┘    │              │              │
     │              │              │              │              │
     │              │ BEGIN TX     │              │              │
     │              ├─────────────>│              │              │
     │              │              │              │              │
     │              │ INSERT event │              │              │
     │              ├─────────────>│              │              │
     │              │              │              │              │
     │              │ INSERT approval (pending)   │              │
     │              ├─────────────>│              │              │
     │              │              │              │              │
     │              │ COMMIT       │              │              │
     │              ├─────────────>│              │              │
     │              │              │              │              │
     │ 201 Created  │              │              │              │
     │<─────────────┤              │              │              │
     │              │              │              │              │
     │              │              │              │              │
     │ POST /approvals/{id}/approve │             │              │
     ├─────────────>│              │              │              │
     │              │              │              │              │
     │              │ BEGIN TX     │              │              │
     │              ├─────────────>│              │              │
     │              │              │              │              │
     │              │ UPDATE approval='approved'  │              │
     │              ├─────────────>│              │              │
     │              │              │              │              │
     │              │ UPDATE event='approved'     │              │
     │              ├─────────────>│              │              │
     │              │              │              │              │
     │              │ COMMIT       │              │              │
     │              ├─────────────>│              │              │
     │              │              │              │              │
     │              │ Queue Task: sync-calendar   │              │
     │              ├──────────────┴──────────────>│              │
     │              │                              │              │
     │              │ Queue Task: send-email       │              │
     │              ├──────────────┴──────────────>│              │
     │              │                              │              │
     │ 200 OK       │                              │              │
     │<─────────────┤                              │              │
     │              │                              │              │
     │              │                    Cloud Tasks dispatches   │
     │              │                    task after ~10 seconds   │
     │              │                              │              │
     │              │ POST /tasks/sync-calendar    │              │
     │              │<─────────────────────────────┤              │
     │              │                              │              │
     │              │ Fetch event                  │              │
     │              ├─────────────>│              │              │
     │              │              │              │              │
     │              │ Sync to Calendar             │              │
     │              ├──────────────┴──────────────┴──────────────>│
     │              │                                             │
     │              │                              200 OK         │
     │              │<────────────────────────────────────────────┤
     │              │                              │              │
     │              │ UPDATE event.google_cal_id   │              │
     │              ├─────────────>│              │              │
     │              │              │              │              │
     │              │ 200 OK (to Cloud Tasks)      │              │
     │              ├──────────────┴──────────────>│              │
     │              │                              │              │
```

**Key Points:**
- Single ACID transaction for approval (atomic, consistent)
- Background jobs queued AFTER commit succeeds
- Cloud Tasks auto-retries on failure (exponential backoff)
- If Google Calendar fails, task retries up to 100 times over 24 hours
- Serverless: Only pay when task executes

---

## Database Schema (Cloud SQL PostgreSQL)

```sql
-- Events Table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    time_start TIME NOT NULL,
    time_end TIME,
    location VARCHAR(255) NOT NULL,
    image_url TEXT,
    is_virtual BOOLEAN DEFAULT FALSE,
    virtual_link TEXT,
    status VARCHAR(50) DEFAULT 'draft',
    google_calendar_id VARCHAR(255),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT valid_status CHECK (
        status IN ('draft', 'pending', 'changes_requested', 'approved', 'rejected', 'published')
    )
);

-- Announcements Table
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50),
    color VARCHAR(50),
    publish_date DATE,
    status VARCHAR(50) DEFAULT 'draft',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT valid_status CHECK (
        status IN ('draft', 'pending', 'changes_requested', 'approved', 'rejected', 'published')
    )
);

-- Users Table (Google SSO - NO PASSWORDS!)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,

    -- Google Workspace SSO fields
    google_id VARCHAR(255) UNIQUE NOT NULL,
    google_picture_url TEXT,

    -- NO password_hash field! SSO only!

    subscribed_to_digest BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT valid_role CHECK (
        role IN ('pastor', 'ministry_leader', 'volunteer')
    ),
    CONSTRAINT valid_email_domain CHECK (
        email LIKE '%@nehemiahstemple.org'
    )
);

-- Approvals Table
CREATE TABLE approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID NOT NULL,
    item_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    requested_by UUID REFERENCES users(id),
    approved_by UUID REFERENCES users(id),
    change_notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT valid_status CHECK (
        status IN ('pending', 'approved', 'rejected', 'changes_requested')
    ),
    CONSTRAINT valid_item_type CHECK (
        item_type IN ('event', 'announcement')
    )
);

-- RSVPs Table
CREATE TABLE rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    guest_count INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),

    UNIQUE(event_id, email)
);

-- Submissions Table (for forms)
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(50) NOT NULL,
    data JSONB NOT NULL,
    anonymous BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT valid_type CHECK (
        type IN ('new_visitor', 'feedback', 'prayer_request')
    )
);

-- Indexes for performance
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_created_by ON events(created_by);

CREATE INDEX idx_announcements_status ON announcements(status);
CREATE INDEX idx_announcements_publish_date ON announcements(publish_date);

CREATE INDEX idx_approvals_status ON approvals(status);
CREATE INDEX idx_approvals_item ON approvals(item_id, item_type);

CREATE INDEX idx_rsvps_event ON rsvps(event_id);
CREATE INDEX idx_rsvps_email ON rsvps(email);

CREATE INDEX idx_submissions_type ON submissions(type);
CREATE INDEX idx_submissions_created_at ON submissions(created_at);

CREATE INDEX idx_users_google_id ON users(google_id);
CREATE INDEX idx_users_email ON users(email);
```

---

## Deployment Architecture (GCP)

```
┌─────────────────────────────────────────────────────────────────┐
│              Google Cloud Platform (us-central1)                │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │         Cloud Load Balancer (Global HTTPS)              │   │
│  │                                                         │   │
│  │  taphub.nehemiahstemple.org                             │   │
│  │                                                         │   │
│  │  • SSL certificate (auto-managed)                       │   │
│  │  • DDoS protection (Cloud Armor)                        │   │
│  │  • Rate limiting (100 req/min per IP)                   │   │
│  │  • CDN enabled                                          │   │
│  │  • Health checks                                        │   │
│  └──────────────────────┬──────────────────────────────────┘   │
│                         │                                       │
│         ┌───────────────┼───────────────┐                      │
│         │               │               │                      │
│  ┌──────▼──────┐ ┌─────▼──────┐ ┌─────▼──────┐              │
│  │  Backend    │ │  Backend   │ │  Backend   │              │
│  │  Neg Group  │ │  NEG Group │ │  NEG Group │              │
│  │             │ │            │ │            │              │
│  │  Cloud Run  │ │  Cloud Run │ │  Cloud Run │              │
│  │  (FastAPI)  │ │  (FastAPI) │ │  (FastAPI) │              │
│  │             │ │            │ │            │              │
│  │  Auto-scale │ │  Auto-scale│ │  Auto-scale│              │
│  │  0-10 inst  │ │  0-10 inst │ │  0-10 inst │              │
│  └──────┬──────┘ └─────┬──────┘ └─────┬──────┘              │
│         │               │               │                      │
│         └───────────────┼───────────────┘                      │
│                         │                                       │
│  ┌──────────────────────▼──────────────────────────────────┐   │
│  │         Cloud Tasks                                     │   │
│  │                                                         │   │
│  │  Queues:                                                │   │
│  │  • calendar-sync-queue (max 100/sec)                    │   │
│  │  • notification-queue (max 500/sec)                     │   │
│  │  • email-queue (max 1000/sec)                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │         Cloud Scheduler                                 │   │
│  │                                                         │   │
│  │  Jobs:                                                  │   │
│  │  • send-weekly-digest (Mon 8am)                         │   │
│  │  • cleanup-old-submissions (Daily 2am)                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │         Cloud SQL for PostgreSQL                        │   │
│  │                                                         │   │
│  │  Instance: taphub-db                                    │   │
│  │  Tier: db-f1-micro (MVP) → db-g1-small (Prod)           │   │
│  │  Storage: 10GB SSD (auto-increase)                      │   │
│  │  Backups: Daily automated                               │   │
│  │  HA: Single zone (MVP) → Multi-zone (Prod)              │   │
│  │  Connections: Private IP (VPC)                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │         Memorystore for Redis (Optional)                │   │
│  │                                                         │   │
│  │  Instance: taphub-redis                                 │   │
│  │  Tier: Basic (1GB)                                      │   │
│  │  Version: Redis 7.0                                     │   │
│  │  Use: Celery broker (if using Celery)                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │         Cloud Storage                                   │   │
│  │                                                         │   │
│  │  Buckets:                                               │   │
│  │  • taphub-public-hub (React SPA)                        │   │
│  │  • taphub-admin-hub (React SPA)                         │   │
│  │  • taphub-event-images (uploaded files)                 │   │
│  │                                                         │   │
│  │  CDN: Enabled on all buckets                            │   │
│  │  CORS: Configured for API access                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │         Secret Manager                                  │   │
│  │                                                         │   │
│  │  Secrets:                                               │   │
│  │  • google-oauth-client-id                               │   │
│  │  • google-oauth-client-secret                           │   │
│  │  • database-password                                    │   │
│  │  • jwt-secret-key                                       │   │
│  │  • sendgrid-api-key                                     │   │
│  │  • google-calendar-service-account                      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │         Cloud Logging & Monitoring                      │   │
│  │                                                         │   │
│  │  • Application logs (Cloud Logging)                     │   │
│  │  • Error Reporting                                      │   │
│  │  • Cloud Trace (request tracing)                        │   │
│  │  • Cloud Monitoring (metrics)                           │   │
│  │  • Uptime checks                                        │   │
│  │  • Alerts → Email/Slack                                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

External Services:
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  Google         │  │  Google         │  │  SendGrid       │
│  Workspace      │  │  Calendar API   │  │  Email API      │
│  (SSO)          │  │                 │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### Deployment Regions

**Recommended:** `us-central1` (Iowa)
- Closest to US East Coast (Michigan)
- Lower latency for your church members
- Lower cost than coastal regions

**Alternative:** `us-east4` (Virginia)
- Closer to East Coast
- Slightly higher cost

---

## Docker Compose (Local Development)

```yaml
# docker-compose.yml
version: '3.8'

services:
  # PostgreSQL (Matches Cloud SQL locally)
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: taphub
      POSTGRES_PASSWORD: dev_password
      POSTGRES_DB: taphub
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  # Redis (Optional - only if using Celery)
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  # FastAPI Application
  api:
    build: ./backend
    command: uvicorn app.main:app --host 0.0.0.0 --port 8080 --reload
    volumes:
      - ./backend:/app
    ports:
      - "8080:8080"  # Cloud Run uses port 8080
    environment:
      # Database
      DATABASE_URL: postgresql://taphub:dev_password@db:5432/taphub

      # Google OAuth (from GCP Console)
      GOOGLE_CLIENT_ID: ${GOOGLE_CLIENT_ID}
      GOOGLE_CLIENT_SECRET: ${GOOGLE_CLIENT_SECRET}
      ALLOWED_DOMAIN: nehemiahstemple.org

      # JWT
      SECRET_KEY: ${SECRET_KEY}

      # SendGrid
      SENDGRID_API_KEY: ${SENDGRID_API_KEY}

      # Google Calendar
      GOOGLE_CALENDAR_ID: ${GOOGLE_CALENDAR_ID}
      GOOGLE_SERVICE_ACCOUNT_JSON: ${GOOGLE_SERVICE_ACCOUNT_JSON}

      # GCP Project (for Cloud Tasks in local dev)
      GCP_PROJECT_ID: ${GCP_PROJECT_ID}
      CLOUD_RUN_URL: http://localhost:8080

      # Redis (optional)
      REDIS_URL: redis://redis:6379/0

    depends_on:
      - db

  # Celery Worker (Optional - only if using Celery instead of Cloud Tasks)
  celery_worker:
    build: ./backend
    command: celery -A app.workers.celery_app worker --loglevel=info
    volumes:
      - ./backend:/app
    environment:
      DATABASE_URL: postgresql://taphub:dev_password@db:5432/taphub
      REDIS_URL: redis://redis:6379/0
    depends_on:
      - db
      - redis

  # Celery Beat (Optional - for scheduled tasks)
  celery_beat:
    build: ./backend
    command: celery -A app.workers.celery_app beat --loglevel=info
    volumes:
      - ./backend:/app
    environment:
      DATABASE_URL: postgresql://taphub:dev_password@db:5432/taphub
      REDIS_URL: redis://redis:6379/0
    depends_on:
      - db
      - redis

volumes:
  postgres_data:
```

---

## GCP Cost Estimates

### MVP Phase (0-500 users) - **$7-12/month**

```
Cloud Run (FastAPI):         FREE   (2M requests/month free tier)
Cloud SQL (db-f1-micro):     $7/mo  (Smallest instance)
Cloud Tasks:                 FREE   (1M tasks/month free)
Cloud Storage:               $0.02  (1GB storage)
Cloud Load Balancer:         FREE   (Under 5 forwarding rules)
Secret Manager:              FREE   (6 secrets × 10k accesses)
Cloud Logging:               FREE   (50GB/month free)
──────────────────────────────────────────────────────────────
Total:                       ~$7-12/month
```

**Free Tier Option** (Use Supabase for database):
```
Cloud Run:                   FREE   (2M requests/month)
Supabase PostgreSQL:         FREE   (500MB database)
Cloud Tasks:                 FREE   (1M tasks/month)
Cloud Storage:               FREE   (5GB free)
──────────────────────────────────────────────────────────────
Total:                       $0/month! 🎉
```

### Small Church (500-2000 users) - **$50-80/month**

```
Cloud Run (auto-scale):      $20/mo
Cloud SQL (db-g1-small):     $25/mo
Memorystore Redis (1GB):     $15/mo (optional - only if using Celery)
Cloud Tasks:                 $5/mo  (Beyond free tier)
Cloud Storage:               $1/mo
Load Balancer:               $18/mo (Fixed cost)
Cloud Logging:               $5/mo
──────────────────────────────────────────────────────────────
Total:                       ~$74/month (without Redis)
                             ~$89/month (with Redis for Celery)
```

### Multi-Church Platform (2000+ users) - **$150-250/month**

```
Cloud Run (high traffic):    $60/mo
Cloud SQL (db-n1-standard-1):$80/mo
Memorystore Redis (5GB):     $45/mo
Cloud Tasks:                 $15/mo
Cloud Storage + CDN:         $10/mo
Load Balancer + Armor:       $30/mo
Cloud Monitoring:            $10/mo
──────────────────────────────────────────────────────────────
Total:                       ~$250/month
```

**Cost Optimization Tips:**
1. Use Cloud Tasks instead of Celery → Save $15-45/month (no Redis)
2. Start with db-f1-micro → Upgrade only when needed
3. Use Cloud Run min-instances=0 → Pay only for actual usage
4. Enable Cloud CDN → Reduce Cloud Run requests

---

## Technology Stack

### Backend
- **Framework**: FastAPI 0.104+
- **Language**: Python 3.11+
- **ASGI Server**: Uvicorn + Gunicorn (production)
- **ORM**: SQLAlchemy 2.0
- **Migrations**: Alembic
- **Validation**: Pydantic v2
- **Authentication**: Google OAuth + JWT
- **Background Jobs**: Cloud Tasks (or Celery 5.3)
- **Testing**: pytest + pytest-asyncio

### Frontend
- **Framework**: React 18+
- **Language**: TypeScript 5+
- **Styling**: Emotion 11
- **Routing**: React Router 6
- **State**: React Context + Hooks
- **HTTP**: Axios
- **Forms**: React Hook Form
- **UI**: Radix UI (headless components)
- **Build**: Vite
- **Testing**: Vitest + React Testing Library
- **OAuth**: @react-oauth/google

### GCP Infrastructure
- **Compute**: Cloud Run (serverless containers)
- **Database**: Cloud SQL (PostgreSQL 15)
- **Cache/Queue**: Memorystore for Redis (optional)
- **Background Jobs**: Cloud Tasks + Cloud Scheduler
- **Storage**: Cloud Storage (static files)
- **Secrets**: Secret Manager
- **Load Balancing**: Cloud Load Balancing
- **Monitoring**: Cloud Logging + Monitoring
- **Authentication**: Google Identity Platform

### External Services
- **Email**: SendGrid API
- **Calendar**: Google Calendar API
- **SSO**: Google Workspace OAuth 2.0
- **SMS** (optional): Twilio

---

## Development Workflow

### Local Development

```bash
# 1. Clone repository
git clone https://github.com/nehemiahstemple/tap-hub.git
cd tap-hub

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your Google OAuth credentials

# 3. Start all services
docker-compose up -d

# 4. Run migrations
docker-compose exec api alembic upgrade head

# 5. Create admin user (auto via first Google login!)

# 6. Access applications
# Public Hub: http://localhost:3000
# Admin Hub: http://localhost:3001
# API Docs: http://localhost:8080/docs
```

### Testing Cloud Tasks Locally

```bash
# Install Cloud Tasks emulator
gcloud components install cloud-tasks-emulator

# Start emulator
gcloud beta emulators tasks start

# Test queuing a task
curl -X POST http://localhost:8080/api/v1/approvals/approve \
  -H "Authorization: Bearer YOUR_JWT" \
  -d '{"approval_id": "uuid"}'

# Monitor task execution
docker-compose logs -f api
```

---

## Production Deployment (GCP)

### 1. Setup GCP Project

```bash
# Install gcloud CLI
# https://cloud.google.com/sdk/docs/install

# Login
gcloud auth login

# Create project
gcloud projects create nehemiahs-temple-tap-hub
gcloud config set project nehemiahs-temple-tap-hub

# Enable APIs
gcloud services enable \
  run.googleapis.com \
  sql-component.googleapis.com \
  sqladmin.googleapis.com \
  cloudtasks.googleapis.com \
  cloudscheduler.googleapis.com \
  secretmanager.googleapis.com \
  storage-api.googleapis.com
```

### 2. Deploy Cloud SQL

```bash
# Create PostgreSQL instance
gcloud sql instances create taphub-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1

# Create database
gcloud sql databases create taphub \
  --instance=taphub-db

# Create user
gcloud sql users create taphub \
  --instance=taphub-db \
  --password=YOUR_SECURE_PASSWORD
```

### 3. Store Secrets

```bash
# Google OAuth credentials
echo -n "YOUR_CLIENT_ID" | gcloud secrets create google-oauth-client-id --data-file=-
echo -n "YOUR_CLIENT_SECRET" | gcloud secrets create google-oauth-client-secret --data-file=-

# JWT secret
openssl rand -base64 32 | gcloud secrets create jwt-secret-key --data-file=-

# Database password
echo -n "YOUR_DB_PASSWORD" | gcloud secrets create database-password --data-file=-
```

### 4. Deploy to Cloud Run

```bash
# Build and deploy
cd backend
gcloud run deploy taphub-api \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="ALLOWED_DOMAIN=nehemiahstemple.org" \
  --add-cloudsql-instances=nehemiahs-temple-tap-hub:us-central1:taphub-db \
  --set-secrets="GOOGLE_CLIENT_ID=google-oauth-client-id:latest,GOOGLE_CLIENT_SECRET=google-oauth-client-secret:latest,SECRET_KEY=jwt-secret-key:latest,DATABASE_PASSWORD=database-password:latest" \
  --min-instances=0 \
  --max-instances=10 \
  --timeout=300
```

### 5. Deploy Frontend to Cloud Storage

```bash
# Build React apps
cd frontend/public-hub
npm run build

# Create bucket
gsutil mb -l us-central1 gs://taphub-public-hub

# Upload files
gsutil -m cp -r build/* gs://taphub-public-hub

# Make public
gsutil iam ch allUsers:objectViewer gs://taphub-public-hub

# Enable CDN
gcloud compute backend-buckets create taphub-public-hub-backend \
  --gcs-bucket-name=taphub-public-hub \
  --enable-cdn

# Repeat for admin-hub
```

### 6. Setup Cloud Tasks Queue

```bash
# Create queue
gcloud tasks queues create calendar-sync-queue \
  --location=us-central1 \
  --max-dispatches-per-second=100

gcloud tasks queues create notification-queue \
  --location=us-central1 \
  --max-dispatches-per-second=500
```

### 7. Setup Cloud Scheduler

```bash
# Weekly digest (every Monday at 8am)
gcloud scheduler jobs create http send-weekly-digest \
  --location=us-central1 \
  --schedule="0 8 * * 1" \
  --uri="https://taphub-api-HASH-uc.a.run.app/api/v1/tasks/weekly-digest" \
  --http-method=POST \
  --oidc-service-account-email=PROJECT_ID@appspot.gserviceaccount.com
```

---

## Next Steps

Would you like me to:

1. **Generate the complete GCP-ready codebase** with:
   - Google OAuth SSO implementation
   - Cloud Tasks integration
   - Cloud SQL connection setup
   - Secret Manager integration
   - Deployment scripts

2. **Create detailed GCP setup guide** with:
   - Step-by-step Google Cloud Console configuration
   - OAuth client creation walkthrough
   - Cloud SQL setup
   - Domain configuration

3. **Build the frontend with Google Sign-In** ready to go

Which would be most helpful?