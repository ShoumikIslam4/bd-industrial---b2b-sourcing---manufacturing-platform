# BD-Industrial B2B Manufacturing Platform — Setup & Deployment Guide

This document provides step-by-step installation instructions for two standard production deployment targets:
- **Target 1: Linux VPS** (Ubuntu/Debian bare-metal or cloud instance with Node.js, PM2, and Nginx)
- **Target 2: Docker & Docker Compose** (Containerized single-command build)

It also covers database initialization, your first administrator login, and changing platform branding.

---

## Table of Contents
1. [System Prerequisites](#1-system-prerequisites)
2. [Target 1: Linux VPS Installation](#2-target-1-linux-vps-installation)
3. [Target 2: Docker & Docker Compose Installation](#3-target-2-docker--docker-compose-installation)
4. [Database Setup & Migrations](#4-database-setup--migrations)
5. [First Administrator Login Walkthrough](#5-first-administrator-login-walkthrough)
6. [Branding & Visual Customization Guide](#6-branding--visual-customization-guide)
7. [Environment Variables Reference](#7-environment-variables-reference)
8. [Health Checks & Verification](#8-health-checks--verification)

---

## 1. System Prerequisites

| Component | Minimum Specification | Recommended |
|-----------|----------------------|-------------|
| Operating System | Ubuntu 22.04 LTS / Debian 12 / Alpine Linux | Ubuntu 24.04 LTS |
| CPU | 1 vCPU | 2+ vCPUs |
| RAM | 1 GB | 2 GB+ |
| Disk Storage | 10 GB SSD | 25 GB SSD |
| Node.js | v20.x or v22.x LTS | v22.x LTS |
| Database | PostgreSQL 14+ or Google Cloud Firestore | PostgreSQL 16 / Firestore |

---

## 2. Target 1: Linux VPS Installation

Follow these steps on a clean Ubuntu or Debian virtual server.

### Step 2.1: Update Server Packages
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git ufw nginx build-essential
```

### Step 2.2: Install Node.js 22 LTS
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
node -v  # Verify: v22.x
npm -v   # Verify: v10.x
```

### Step 2.3: Clone Repository & Install Dependencies
```bash
cd /var/www
git clone <YOUR_GIT_REPOSITORY_URL> bd-industrial
cd bd-industrial

# Install production dependencies
npm install
```

### Step 2.4: Configure Environment Variables
Copy the template configuration file:
```bash
cp .env.example .env
nano .env
```
Update values such as `APP_URL`, `PORT=3000`, and your Firebase or PostgreSQL credentials if applicable.

### Step 2.5: Build the Application
```bash
npm run build
```
This produces optimized production assets in `/var/www/bd-industrial/dist`.

### Step 2.6: Start Application with PM2
```bash
# Start background Node process
pm2 start npm --name "bd-industrial" -- run preview -- --port 3000 --host 127.0.0.1

# Enable automatic restart on server reboot
pm2 save
sudo pm2 startup
```

### Step 2.7: Configure Nginx Reverse Proxy & SSL
Create an Nginx configuration file:
```bash
sudo nano /etc/nginx/sites-available/bd-industrial
```

Paste the following block:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/bd-industrial /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

(Optional) Install free Let's Encrypt SSL:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

## 3. Target 2: Docker & Docker Compose Installation

For containerized environments, the repository includes a multi-stage `Dockerfile` and `docker-compose.yml`.

### Step 3.1: Install Docker Engine & Compose
On Ubuntu:
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

### Step 3.2: Configure Environment
```bash
cp .env.example .env
```

### Step 3.3: Launch with Docker Compose
```bash
# Build images and start containers in detached mode
docker compose up -d --build

# View real-time container logs
docker compose logs -f app
```

### Step 3.4: Verify Container Status
```bash
docker compose ps
```
The application will be accessible at `http://YOUR_SERVER_IP:3000`.

To stop the containers:
```bash
docker compose down
```

---

## 4. Database Setup & Migrations

The platform supports both Relational SQL (PostgreSQL) and Cloud Firestore intermediate storage.

### Option A: PostgreSQL Setup (Relational Mode)
1. Install PostgreSQL on your server:
   ```bash
   sudo apt install -y postgresql postgresql-contrib
   sudo -u postgres psql
   ```
2. Create platform database and user:
   ```sql
   CREATE DATABASE bd_industrial;
   CREATE USER bd_user WITH ENCRYPTED PASSWORD 'ChangeThisStrongPassword!';
   GRANT ALL PRIVILEGES ON DATABASE bd_industrial TO bd_user;
   \q
   ```
3. Execute schema migration:
   ```bash
   psql -U bd_user -d bd_industrial -f database/schema.sql
   ```
4. Seed demo data (manufacturers, garments, corrugated packaging, and admin):
   ```bash
   psql -U bd_user -d bd_industrial -f database/seed.sql
   ```

### Option B: Cloud Firestore Setup
1. Configure `VITE_FIREBASE_API_KEY` and `VITE_FIREBASE_PROJECT_ID` in `.env`.
2. Deploy security rules:
   ```bash
   firebase deploy --only firestore:rules
   ```
3. Run the automated seed script:
   ```bash
   npm run seed
   ```

---

## 5. First Administrator Login Walkthrough

> **Security Notice:** Anonymous 1-click login into the admin dashboard is intentionally disabled. Access requires valid credentials with password verification.

### Step 5.1: Access the Admin Login Gate
- Navigate to your deployed URL in a browser: `https://your-domain.com/admin`
- Alternatively, click the **"Admin Login"** button located in the top navigation bar or inside your profile dropdown menu.

### Step 5.2: Use Pre-Configured Master Credentials
| Field | Value |
|-------|-------|
| **Admin Email** | `admin@bdsource.com.bd` |
| **Password** | `admin123456` *(or `AdminPass@2026!`)* |
| **Role** | Super Administrator (Full website & data control) |

Click **"Sign In to Admin Dashboard"**.

### Step 5.3: Change Default Credentials (Recommended)
1. Once logged into the Admin Console, click **"Buyers & User Roles"** in the sidebar.
2. Locate the Super Admin record (`admin@bdsource.com.bd`).
3. Click **"Edit"** to change the administrator email, phone, and password.
4. Changes take effect immediately and are recorded in the **"System & Audit Logs"**.

---

## 6. Branding & Visual Customization Guide

You can customize the platform's visual branding in two ways:

### Method 1: No-Code Visual Website Builder (Recommended)
Log in to `/admin` as Super Admin:
1. **Hero Section & Messaging:**
   - Go to **"Visual Website Builder"** in the sidebar.
   - Edit the headline, subtitle, primary/secondary button labels, and background photography without touching code.
   - Reorder or toggle section visibility (e.g., Showcase, Industrial Belts, Factory Trends).
   - Click **"Publish Live"** to immediately update the live website.
2. **Global Theme, Colors & Typography:**
   - Go to **"Global Design Settings"**.
   - Change the primary accent color (default: Crimson Red `#DC2626`).
   - Customize font families, corner radius, logo URL, and announcement banner text.
   - Click **"Save Draft"** or **"Publish Theme"**. Rollback history is saved automatically.
3. **CMS Pages & Content:**
   - Go to **"Page & CMS Manager"** to create or edit pages (About Us, How It Works, Terms, FAQ).

### Method 2: Source Code Customization
- **Application Name & Meta Tags:** Edit `metadata.json` and `index.html`.
- **Default Seed Data:** Modify `src/data/mockData.ts` and `database/seed.sql`.
- **Tailwind Styles:** Modify `src/index.css`.

---

## 7. Environment Variables Reference

See `.env.example` for the full template:

```ini
# Application URL
APP_URL="https://your-domain.com"
PORT=3000

# Firebase / Firestore Configuration (Optional)
VITE_FIREBASE_API_KEY="YOUR_FIREBASE_API_KEY"
VITE_FIREBASE_AUTH_DOMAIN="YOUR_PROJECT.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="bd-industrial-prod"
VITE_FIREBASE_STORAGE_BUCKET="YOUR_PROJECT.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="1234567890"
VITE_FIREBASE_APP_ID="1:1234567890:web:abcdef123456"

# Platform Defaults
VITE_PLATFORM_CURRENCY="BDT"
VITE_DEFAULT_LANGUAGE="en"
```

---

## 8. Health Checks & Verification

After deployment, verify system health using:

```bash
# HTTP response check
curl -I http://localhost:3000

# Docker healthcheck status
docker inspect --format='{{json .State.Health}}' bd_industrial_platform
```

You should receive an HTTP `200 OK` status. For technical support or enterprise licensing inquiries, consult the documentation in `docs/` or reach out to the project maintainers.
