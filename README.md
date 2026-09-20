<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/logo-white.png">
    <source media="(prefers-color-scheme: light)" srcset="public/logo.png">
    <img src="public/logo-white.png" alt="Oryo Logo" width="260" />
  </picture>
</p>

<p align="center">
  <strong>Modern open-source interactive quote generator and freelance business suite.</strong>
</p>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#key-features">Features</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#switching-to-production-supabase">Supabase Setup</a> •
  <a href="#codebase-architecture">Architecture</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-black?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-black?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Supabase-Auth%20%26%20PostgreSQL-black?style=flat-square&logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/i18n-FR%20%2F%20EN-black?style=flat-square" alt="i18n" />
  <img src="https://img.shields.io/badge/License-MIT-black?style=flat-square" alt="License" />
</p>

---

## ⚡ Overview

**Oryo** is a modern, high-performance business suite and interactive PDF quote generator crafted for freelancers, agencies, and small businesses.

Designed with **Clean Architecture (Repository Pattern)**, Oryo runs out-of-the-box with a **Zero-Configuration Demo Mode**: clone the repository, run one command, and immediately interact with pre-seeded mock data saved directly to browser `localStorage`—no database setup or third-party API keys required. When ready for production, plug in your Supabase credentials to unlock live PostgreSQL storage, secure authentication, and Row Level Security (RLS).

- **100% Free & Fully Unlocked**: Unlimited quotes, margin calculations, exports, and product catalog items without paywalls.
- **Dual-Mode Repository Architecture**: Seamless runtime transition between offline mock data and live Supabase cloud database.
- **Interactive PDF Engine**: Live visual quote preview with instant branding, custom color palettes, and high-resolution PDF download.
- **Bilingual Support (FR / EN)**: Type-safe, instant language toggle in the header with persistent user preferences.

---

## ✨ Key Features

- ⚡ **Dual-Mode Repository Architecture**:
  - **Demo / Mock Mode (Default)**: Zero external setup required. Pre-seeded with realistic mock data, an active demo user session, and browser `localStorage` persistence.
  - **Production Mode**: Seamlessly switches to live Supabase backend when credentials are provided in `.env.local`.
- 🌐 **Visual Bilingual Internationalization (FR / EN)**:
  - Interactive language switcher toggle in the navigation header and mobile menu.
  - Complete, type-safe translation dictionaries with instant UI updates and persistent language preferences (`localStorage` + cookie).
- 🔓 **100% Free & Fully Unlocked**:
  - Unlimited quotes, calculations, exports, and library catalog entries.
  - Full access to all customization features, styles, and templates.
- 🔐 **Complete Authentication System**:
  - Sign up, sign in, password recovery, email updates, and account deletion.
  - Secure session management via Supabase Auth.
- 📑 **Interactive PDF Quote Builder**:
  - Real-time quote preview and live customization (branding colors, company details, line items, discounts, VAT rates, and signature).
  - High-resolution PDF export powered by `html2canvas` and `jspdf`.
- 🧮 **Profitability & Margin Calculator**:
  - Calculate gross/net margins, platform commission fees, payment fees, hourly rates, and target prices.
- 📚 **Micro-CRM & Product Catalog Library**:
  - Manage clients, reusable product cards, saved calculations, and quote drafts.
- 🛡️ **PostgreSQL Database & Row Level Security (RLS)**:
  - Turnkey SQL schema ([supabase/schema.sql](supabase/schema.sql)) with strict user isolation policies.

---

## ⚡ Quick Start

### 1. Clone the repository and install dependencies

```bash
git clone https://github.com/baptiste1307/Oryo.git
cd Oryo
npm install
```

### 2. Run the application (Demo Mode — 0 Config Required)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** The application automatically detects when environment keys are absent and starts in **Demo Mode**. You are automatically signed in as `demo@oryo.dev` with sample quotes, clients, and calculations ready to test.

---

## 🛠️ Switching to Production (Supabase)

To connect your own live Supabase cloud database:

### 1. Configure the Supabase Database

1. Create a free project on [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Paste the contents of [supabase/schema.sql](supabase/schema.sql) and click **Run**.
   _(All tables, foreign keys, RLS security policies, and performance indexes are created automatically)._

### 2. Configure Environment Variables

Copy the environment template:

```bash
cp .env.example .env.local
```

Populate your keys in `.env.local`:

```env
# Supabase URL and public keys
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Restart the dev server

```bash
npm run dev
```

The application will automatically detect your configured keys and connect to your live Supabase database.

---

## 🏗️ Codebase Architecture

<details>
  <summary>🔍 <strong>Click to inspect the directory structure & module map</strong></summary>

```
├── app/                  # Next.js App Router
│   ├── (private)/        # Authenticated routes (Dashboard, Quotes, Account)
│   ├── (public)/         # Public routes (Landing, Auth, Legal)
│   └── api/              # Secure API route handlers (Account deletion)
├── components/           # Reusable UI component modules
│   ├── account/          # Account preferences and danger zone
│   ├── auth/             # Login, signup, and OAuth identity buttons
│   ├── devis/            # Quote builder, parameter panels, and PDF preview
│   ├── global/           # Header, logo, mobile menu, language switcher, footer
│   └── profit-calculator/# Margin & turnover projection calculators
├── context/              # React Context Providers (Auth, i18n, Quote, Viewport, UI)
├── lib/                  # Deep business logic modules
│   ├── config/           # Site configuration and environment detection
│   ├── i18n/             # Type-safe dictionaries (English & French) + helpers
│   ├── repository/       # Clean Dual-Mode Repository Pattern
│   │   ├── mock/         # LocalStorage mock adapter & seed data
│   │   ├── supabase/     # Live Supabase PostgreSQL adapter
│   │   └── index.ts      # Automatic runtime switcher
│   ├── calculations.ts   # Profit and margin calculation operations
│   ├── library.ts        # Client and product catalog operations
│   ├── plans.ts          # Unlocked feature configurations
│   ├── quoteDrafts.ts    # Quote persistence and draft management
│   ├── supabase.ts       # Client-side Supabase instance
│   └── supabaseAdmin.ts  # Privileged server-side administrative client
├── public/               # Static assets & optimized transparent logo
└── supabase/
    └── schema.sql        # Complete idempotent database DDL + RLS policies
```

</details>

---

## 🧪 Quality & Verification

```bash
# Type check with zero errors
npm run type-check

# Production build verification
npm run build
```

---

## 🤖 AI-Assisted Engineering

This codebase was developed and refactored leveraging state-of-the-art AI pair programming workflows, demonstrating modern software craft:

- **Clean Architecture & Deep Modules**: Strict dual-mode repository pattern (mock vs. live Supabase), decoupled business operations, and clean abstractions inspired by _A Philosophy of Software Design_.
- **Modern Full-Stack Standards**: Next.js 16 (Turbopack, App Router), React 19, TypeScript strict mode, and PostgreSQL Row-Level Security (RLS).
- **Quality & Hygiene**: Rigorous type safety (`tsc --noEmit`), automated build verification, and strict zero-secret credential protection.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute it for personal, commercial, or open-source projects.
