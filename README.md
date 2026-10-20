# BD-Industrial — B2B Manufacturing & Wholesale Platform

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)]()
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)]()
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4.0-38bdf8.svg)]()
[![License](https://img.shields.io/badge/License-Apache--2.0-yellow.svg)]()

A complete, production-grade B2B manufacturing and wholesale sourcing platform for Bangladesh connecting verified manufacturers, industrial suppliers, distributors, and domestic/international buyers.

---

## 🌟 Live Demo & Test Credentials

Access the live platform in your browser. All major roles are pre-configured:

| Portal | Role | Email | Password | Description |
|--------|------|-------|----------|-------------|
| **Admin Console** (`/admin`) | Super Admin | `admin@bdsource.com.bd` | `admin123456` | Full website control, visual CMS builder, user roles, product CRUD, audit logs |
| **Supplier Portal** (`/supplier-portal`) | Manufacturer | `sales@apexapparels-bd.com` | `supplier123` | Factory profile, RFQ marketplace, quote submission, order tracking |
| **Buyer Portal** (`/buyer-portal`) | Enterprise Buyer | `procurement@nordicretail.se` | `buyer123` | RFQ generator, quote comparison matrix, PDF quotation export, order tracking |

> **Note on Security:** Anonymous 1-click login into the Admin Dashboard is permanently disabled. Access requires valid credentials with password verification.

---

## 🏗️ Platform Capabilities

### 1. Human-Crafted Industrial Public Marketplace
- **Aesthetic Inspiration:** Editorial industrial design inspired by world-class manufacturing brands (`Matrik BD-Industrial`).
- **Interactive Solutions Showcase:** Dynamic tabbed component showcasing RMG Knitwear, Corrugated Packaging, Hydrocarbon-Free Jute, Precision CNC Spares, and QA Labs.
- **Strategic Industrial Belts:** GIS-style logistics corridor map covering Gazipur, Adamjee EPZ, Tejgaon, and Chittagong Port.
- **Numbered Industrial FAQ:** Comprehensive Q&A accordion covering factory audits, AQL 2.5 pass standards, lead times, and MOQs.
- **Product Directory:** Advanced multi-filter catalog with SKU search, category pills, MOQ filters, and bulk CSV export.
- **Supplier Profiles:** Verified factory listings displaying NBR e-TIN, Trade License numbers, employee count, and factory floor galleries.

### 2. Super Admin Control Center (Full Website Control)
- **Visual Website Builder:** Edit headlines, subtitles, button labels, section order, and visibility without touching code.
- **Global Design Settings:** Modify primary accent colors, fonts, border radii, navigation items, and announcement banners.
- **Product Catalog Management:** Full CRUD operations with bulk CSV import and export.
- **Supplier Verification:** Audit compliance, approve/reject factory listings, and track verification expiry dates.
- **RFQ & Quotation Hub:** Review buyer inquiries, assign qualified suppliers, and generate official downloadable PDF quotations.
- **Production Milestone Tracker:** Track production steps from raw material cutting through to port dispatch and customs clearance.
- **System Audit Logs:** Immutable activity logs capturing timestamps, actor emails, roles, and action details.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 20.x or 22.x LTS
- npm 9.x or higher

### Installation
```bash
# 1. Clone repository
git clone <YOUR_REPOSITORY_URL> bd-industrial
cd bd-industrial

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env

# 4. Start local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🐳 Docker Deployment

The repository includes a ready-to-run multi-stage `Dockerfile` and `docker-compose.yml`:

```bash
# Build and run containerized application
docker compose up -d --build

# View container logs
docker compose logs -f app
```

The application will be accessible at `http://localhost:3000`.

---

## 🗄️ Database Setup & Migrations

The platform includes dual database compatibility:

### PostgreSQL (Relational Mode)
```bash
# 1. Create database schema and tables
psql -U your_user -d bd_industrial -f database/schema.sql

# 2. Seed realistic Bangladesh manufacturing records
psql -U your_user -d bd_industrial -f database/seed.sql
```

### Cloud Firestore Mode
```bash
# 1. Deploy hardened security rules
firebase deploy --only firestore:rules

# 2. Run automated seed script
npm run seed
```

---

## 📚 Documentation Set

- **[HowToSetup.md](./HowToSetup.md):** Complete step-by-step installation instructions for Linux VPS (Node.js/PM2/Nginx) and Docker.
- **[CLAUDE.md](./CLAUDE.md):** Architectural guide, directory mapping, and conventions for AI coding tools.
- **[AGENTS.md](./AGENTS.md):** Autonomous multi-agent guidelines.
- **[CHANGELOG.md](./CHANGELOG.md):** Semantic version history starting at 1.0.0.
- **[LICENSE-NOTE.md](./LICENSE-NOTE.md):** Commercial license terms, permitted uses, and redistribution policies.
- **[docs/API.md](./docs/API.md):** REST API reference with role-based access control (RBAC).

---

## 🛡️ License & Compliance

Licensed under the Commercial Single/Multi-site License. See [LICENSE-NOTE.md](./LICENSE-NOTE.md) for full distribution, commercial deployment, and white-labeling terms. Verified for compliance with Bangladesh National Board of Revenue (NBR) and BIDA commercial trade standards.

