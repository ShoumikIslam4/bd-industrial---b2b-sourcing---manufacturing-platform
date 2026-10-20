# AGENTS.md — Multi-Agent Engineering System Guide

This file acts as an agent instruction entry point for autonomous coding systems, code review bots, and CI audit engines.

---

## Quick Reference
- **Project Name:** BD-Industrial B2B Manufacturing & Wholesale Platform
- **Production Target:** Node.js 22 LTS / React 19 / Vite / Docker
- **Package Manager:** npm
- **Database:** PostgreSQL (`database/schema.sql`, `database/seed.sql`) & Firestore (`firestore.rules`)
- **Key Guide:** See `CLAUDE.md` for full directory mapping and architectural patterns.
- **Setup Guide:** See `HowToSetup.md` for VPS & Docker deployment instructions.
- **API Spec:** See `docs/API.md` for RBAC endpoints and payload structures.

---

## Critical Rules for Autonomous Agents
1. **No Real Secrets in Code:** Never commit live API keys, private certificates, or production passwords to this repository. All secrets belong in `.env`.
2. **Build Verification:** Run `npm run lint` and `npm run build` after making changes to verify zero regressions.
3. **No 1-Click Admin Bypass:** Admin panel `/admin` requires authenticated login using `admin@bdsource.com.bd` and `admin123456`.
4. **Design Discipline:** Maintain the human-crafted industrial aesthetic inspired by `image_507aa778.png` (crisp white/slate surfaces, deep graphite headers, and crimson red accents).
