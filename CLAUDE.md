# CLAUDE.md — AI Engineering Guide

This document provides architectural guidance, directory structure, coding conventions, and developer commands for AI coding assistants working on the BD-Industrial B2B Manufacturing Platform.

---

## 1. Project Overview & Tech Stack

- **Domain:** B2B Sourcing & Manufacturing Platform for Bangladesh (connecting international/domestic buyers with verified factories in Gazipur, Adamjee EPZ, Tejgaon, and Chittagong).
- **Frontend:** React 19, TypeScript, Tailwind CSS v4 (via `@tailwindcss/vite` and `@import "tailwindcss";` in `src/index.css`), Lucide React icons, Motion (Framer Motion).
- **State & Context:** Centralized reactive store in `src/context/PlatformContext.tsx` with persistence via `localStorage` and optional Cloud Firestore integration.
- **Backend / Database:** Multi-tier support for Cloud Firestore (`firestore.rules`) and Relational SQL (`database/schema.sql`, `database/seed.sql`).
- **Reporting & Export:** Client-side vector PDF generation (`jspdf`) for official quotations, CSV parser/exporter for catalog CRUD.

---

## 2. Directory Structure & Map

```
/
├── HowToSetup.md             # Step-by-step installation (VPS + Docker)
├── README.md                 # Project overview and quick start
├── CHANGELOG.md              # Version release history starting at 1.0.0
├── CLAUDE.md                 # AI coding agent instructions (this file)
├── AGENTS.md                 # Symlink/copy for multi-agent workflows
├── docker-compose.yml        # Docker compose configuration
├── Dockerfile                # Multi-stage production container build
├── package.json              # Dependencies and lifecycle scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite build setup with Tailwind v4 & aliases
├── metadata.json             # AI Studio applet capabilities and metadata
├── firestore.rules           # Hardened Firestore security rules (8 pillars)
├── firebase-blueprint.json   # Firestore intermediate data models
├── database/                 # Relational SQL scripts
│   ├── schema.sql            # PostgreSQL table definitions & indexes
│   └── seed.sql              # Seed data (manufacturers, products, RFQs)
├── docs/                     # Architectural documentation
│   ├── API.md                # REST API reference with RBAC definitions
│   └── api-reference.md      # Extended specification
├── scripts/                  # Utility and migration scripts
│   ├── schema.sql            # Duplicate for backwards compatibility
│   ├── migrate.ts            # Migration runner
│   └── seed-firestore.ts     # Firestore seeder script
├── public/                   # Static assets & photography
│   └── assets/               # Brand and reference assets
└── src/                      # Source code
    ├── main.tsx              # Application entry point
    ├── App.tsx               # Root view router & modal coordinator
    ├── index.css             # Tailwind v4 entry point & typography
    ├── types/                # Core TypeScript interfaces & types
    │   └── index.ts          # User, Supplier, Product, RFQ, Order, CMS models
    ├── context/              # Central state management
    │   └── PlatformContext.tsx# Reactive data store, CRUD, and audit logging
    ├── data/                 # Initial mock data and catalog items
    │   └── mockData.ts       # Authentic Bangladesh industrial seed records
    ├── utils/                # Helper utilities
    │   ├── pdfGenerator.ts   # jsPDF quote generator utility
    │   └── csvHelper.ts      # CSV parser and exporter utility
    ├── services/             # External service wrappers
    │   └── firebase.ts       # Firebase SDK initialization with graceful fallback
    └── components/           # Modular UI components
        ├── common/           # Shared reusable components
        │   ├── Header.tsx    # Responsive navigation & profile dropdown
        │   ├── Footer.tsx    # Industrial black footer with compliance badges
        │   ├── AuthModal.tsx # Enterprise credential modal with demo cards
        │   ├── RFQModal.tsx  # Smart multi-step RFQ submission modal
        │   ├── ToastContainer.tsx # Notification alerts
        │   ├── AnnouncementBar.tsx# Dynamic top announcement banner
        │   └── WhatsAppFloatingButton.tsx # WhatsApp liaison floating CTA
        ├── public/           # Public marketplace views
        │   ├── HomePage.tsx  # Editorial industrial showcase matching reference
        │   ├── ProductDirectory.tsx # Filterable catalog with CSV export
        │   ├── ProductDetailPage.tsx # Tech specs, MOQ tiers & sample request
        │   ├── SupplierDirectory.tsx # Verified factories by EPZ zone
        │   ├── SupplierDetailPage.tsx# Factory floor gallery, audits & products
        │   └── CMSPageView.tsx # Dynamic CMS page viewer (About, FAQ, etc.)
        ├── admin/            # Super Admin Console (Full website control)
        │   └── AdminDashboard.tsx # CMS builder, design, products, users, RFQs
        ├── buyer/            # Buyer Procurement Portal
        │   └── BuyerDashboard.tsx# Active RFQs, received quotes, order milestones
        └── supplier/         # Manufacturer Portal
            └── SupplierDashboard.tsx# Product management, RFQ marketplace, quotes
```

---

## 3. Developer Commands

```bash
# Run local dev server (default port: 3000)
npm run dev

# Check for TypeScript compilation & syntax errors
npm run lint

# Build production bundle
npm run build

# Preview production build locally
npm run preview

# Seed Cloud Firestore with demo records
npm run seed

# Run database migration script
npm run migrate
```

---

## 4. Coding Conventions & Best Practices

1. **Strict TypeScript:**
   - Avoid `any`. Always use domain models defined in `src/types/index.ts`.
   - Ensure null-checks and safe defaults for nested objects (e.g., `pricingTiers`, `specifications`).

2. **Tailwind CSS v4 Styling:**
   - Use standard utility classes with modern color palette (`slate-950`, `red-600`, `neutral-200`).
   - Do not import legacy CSS files or write inline style objects for layout.
   - Maintain high contrast ratios (minimum 4.5:1) for text against backgrounds.

3. **Human-Crafted Editorial Aesthetics (Zero AI Slop):**
   - Strictly avoid generic purple gradients, floating glassy neon orbs, or vague placeholder text.
   - Follow the editorial industrial design of `Matrik BD-Industrial` (`image_507aa778.png`): sharp hairline borders, bold grotesque headlines, wide-letterspaced micro-kickers, and authentic factory photography.

4. **Security & Authorization (RBAC):**
   - Mutating actions (updating CMS theme, approving suppliers, creating quotes, altering user roles) must check authorization.
   - **Never permit 1-click anonymous bypass into `/admin`.** The Admin Control Center enforces credential verification (`admin@bdsource.com.bd` / `admin123456`).
   - Log sensitive state modifications using `addAuditLog(action, details)`.

---

## 5. Demo Credentials Reference

| Role | Email | Password | Primary Capabilities |
|------|-------|----------|----------------------|
| **Super Admin** | `admin@bdsource.com.bd` | `admin123456` | Full website CMS builder, theme, user roles, product CRUD, audit logs |
| **Supplier** | `sales@apexapparels-bd.com` | `supplier123` | Factory profile, quote submission, order production milestones |
| **Buyer** | `procurement@nordicretail.se` | `buyer123` | Post RFQs, compare quotes, PDF download, order tracking |
