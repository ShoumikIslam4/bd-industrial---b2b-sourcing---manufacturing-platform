# Changelog

All notable changes to the **BD-Industrial B2B Manufacturing Platform** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-10-20

### Added
- **Core Platform Architecture:**
  - Modern high-performance web app built on React 19, TypeScript, and Tailwind CSS v4.
  - Multi-tier database compatibility: PostgreSQL schema and seed (`database/schema.sql`, `database/seed.sql`) alongside hardened Cloud Firestore security rules (`firestore.rules`).
  - Containerization support with multi-stage production `Dockerfile` and `docker-compose.yml`.

- **Editorial Industrial Interface (Human-Crafted Design):**
  - High-impact architectural homepage layout inspired by Matrik Industrial (`image_507aa778.png`).
  - Hero banner with verified Bangladesh manufacturing badge, dual CTA actions, and authentic plant automation photography.
  - Interactive "Innovative Factory Solutions" split-tab showcase with dynamic machinery specs.
  - Strategic Industrial Belts GIS-style logistics corridor map (Gazipur, Adamjee EPZ, Tejgaon, Chittagong Port).
  - Numbered Industrial FAQ Accordion (01 through 05) with dedicated Advisory Desk callout.
  - "Factory Trends & Updates" industrial news card grid and high-visibility crimson red CTA banner.

- **Role-Based Authentication & Security:**
  - Full email/password enterprise authentication supporting Super Admin, Supplier, and Buyer accounts.
  - Multi-tab `AuthModal` with clear demo credentials display for testing.
  - Secure **Admin Gate Screen** preventing unauthorized or 1-click anonymous access to the Admin Dashboard.
  - Dedicated **Admin Dashboard Login** option accessible from within the user profile dropdown.
  - Comprehensive audit logging recording actor email, role, timestamp, and mutating action details.

- **Super Admin Control Center:**
  - Visual Website Builder for dynamic layout reordering, hero customization, and live publishing without touching code.
  - Global Design Settings allowing real-time modification of typography, brand colors, border radius, and announcement banners.
  - Complete Product Catalog CRUD with CSV bulk import and export capabilities.
  - Supplier verification and compliance auditing (NBR e-TIN, Trade License, and BIN validation).
  - Buyer RFQ management, quotation approval, and production order milestone tracking.
  - Dynamic CMS Page Manager (About Us, How It Works, FAQ).

- **Supplier & Buyer Portals:**
  - Buyer Portal: RFQ submission, quotation comparison matrix, downloadable jsPDF quotations, and milestone order tracking.
  - Supplier Portal: Factory profile management, product listing CRUD, open RFQ marketplace, and quote proposal submission.

- **Documentation & Setup:**
  - `HowToSetup.md`: Step-by-step installation instructions for Linux VPS (Node.js/PM2/Nginx) and Docker.
  - `CLAUDE.md` and `AGENTS.md`: Technical architectural guide for AI coding assistants.
  - `docs/API.md`: Complete REST API reference with RBAC permissions.
