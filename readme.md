# 🛒 ShopPulse

> A modern, full-stack e-commerce platform built for sports & cricket equipment — featuring real-time updates, AI-powered recommendations, role-based dashboards, and a rich shopping experience.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Pages & Routes](#pages--routes)
- [Scripts](#scripts)

---

## Overview

ShopPulse is a full-stack e-commerce platform targeting sports and cricket enthusiasts. It supports three user roles — **Customer**, **Vendor**, and **Admin** — each with a dedicated dashboard. The platform includes real-time features via Socket.IO, background job processing with BullMQ + Redis, and a rich home page packed with smart shopping sections.

---

## Tech Stack

### Frontend (`/client`)

| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI framework |
| Vite 8 | Build tool & dev server |
| TailwindCSS 4 | Styling |
| React Router DOM 7 | Client-side routing |
| React Hook Form + Zod | Forms & validation |
| Axios | HTTP client |
| Socket.IO Client | Real-time communication |
| Recharts | Analytics charts |
| Swiper | Carousel / sliders |
| Lucide React | Icon library |

### Backend (`/server`)

| Technology | Purpose |
|---|---|
| Node.js + Express 5 | HTTP server |
| TypeScript | Type safety |
| MongoDB + Mongoose | Database & ODM |
| Redis + BullMQ | Caching & job queues |
| Socket.IO | Real-time events |
| JWT + bcryptjs | Authentication |
| Cloudinary + Multer | Image uploads |
| Nodemailer | Email notifications |
| Helmet + CORS | Security |
| Zod | Server-side validation |

---

## Features

### 🛍️ Shopping Experience
- Product listing with filters, search, and category browsing
- Detailed product pages with variants (`/products/:slug`)
- Shopping cart with persistent state
- Multi-step checkout flow with order confirmation

### 🏠 Rich Home Page Sections
| Section | Description |
|---|---|
| **Almost Sold Out** | Urgency-driven low-stock highlights |
| **Buy More Save More** | Bundle/tiered discount promotions |
| **Compare & Decide** | Side-by-side product comparison |
| **Complete The Look** | Cross-sell outfit/kit recommendations |
| **Context Aware Section** | Personalized content based on user state |
| **Live Shopping Pulse** | Real-time activity feed |
| **Mystery Deals** | Gamified hidden offers |
| **Premium Collection** | Curated high-end products |
| **Product Battle** | Head-to-head product voting |
| **Recently Viewed** | Personalized browsing history |
| **Rewards & Points** | Loyalty points display |
| **Seasonal Calendar** | Event/season-based promotions |
| **Shop By Need** | Need-based product discovery |
| **Social Feed** | Community posts and highlights |
| **Spin & Win** | Gamified discount wheel |
| **Upcoming Event Countdown** | Pre-event deal timers |
| **Weekly Awards** | Top-rated products of the week |

### 👤 Authentication & Roles
- JWT-based auth with HTTP-only cookie sessions
- Role-based access: `customer`, `vendor`, `admin`
- Demo role switcher for exploring dashboards without signup

### 📊 Dashboards
- **Admin Dashboard** — store analytics, user management, order overview
- **Vendor Dashboard** — product management, sales insights
- **User Dashboard** — order history, profile, rewards

### 🌐 Company & Legal Pages
- About Us, Brand Partners, Sustainability, Sponsorships, Careers, Store Locator
- Privacy Policy, Terms of Service, Security Policy, Sitemap

### 🎧 Client Care Pages
- Track Order, Return Policy, Shipping Policy, Cricket Bat Care Guide, Warranty Registration, Contact Support

---

## Project Structure

```
ShopPulse/
├── client/                      # React frontend (Vite + TypeScript)
│   └── src/
│       ├── api/                 # Axios API functions
│       ├── assets/              # Static assets
│       ├── components/
│       │   ├── cart/
│       │   ├── checkout/
│       │   ├── common/          # Shared UI (ScrollToTop, etc.)
│       │   ├── event/
│       │   ├── home/            # 17 home page sections
│       │   ├── layout/          # Navbar, Footer, Layout wrappers
│       │   ├── product/
│       │   ├── recommendation/
│       │   └── ui/              # Generic UI primitives
│       ├── constants/
│       ├── context/
│       │   └── AuthContext.tsx  # Global auth state
│       ├── hooks/               # Custom React hooks
│       ├── pages/
│       │   ├── admin/
│       │   ├── auth/            # Login, Register
│       │   ├── cart/
│       │   ├── categories/
│       │   ├── checkout/
│       │   ├── common/          # NotFound, Maintenance
│       │   ├── events/
│       │   ├── footer/          # All footer-linked pages
│       │   ├── home/
│       │   ├── orders/
│       │   ├── products/        # Shop, ProductDetails
│       │   ├── profile/
│       │   └── vendor/
│       ├── routes/
│       │   └── AppRoutes.tsx    # Centralized routing
│       ├── types/
│       └── utils/
│
├── server/                      # Express backend (TypeScript)
│   └── src/
│       ├── ai/                  # AI/recommendation logic
│       ├── analytics/           # Analytics processing
│       ├── config/              # DB, Redis, Cloudinary configs
│       ├── constants/
│       ├── controllers/         # Route handlers
│       ├── jobs/                # BullMQ job definitions
│       ├── middleware/          # Auth, error handling, rate limiting
│       ├── models/              # Mongoose schemas
│       │   ├── User.ts
│       │   ├── Product.ts
│       │   ├── Category.ts
│       │   └── Order.ts
│       ├── queues/              # BullMQ queue setup
│       ├── routes/              # Express route definitions
│       ├── sockets/             # Socket.IO event handlers
│       ├── types/
│       ├── utils/               # Helpers, seed scripts
│       └── validators/          # Zod schemas
│
├── .gitignore
├── README.md
└── package.json

---

## 🌿 Git Branching Strategy

| Branch Name | Task / Scope | Includes |
|---|---|---|
| `main` | Production Ready | Stable releases only |
| `develop` | Integration Branch | Merged features before release |
| `feature/auth` | Authentication & Users | Login, Register, JWT, AuthContext, User Model |
| `feature/products` | Products & Categories | Product catalog, Shop, Categories, Search, Filters |
| `feature/cart-wishlist` | Cart & Wishlist | Cart drawer, Wishlist state, Local/DB sync |
| `feature/orders-checkout` | Checkout & Orders | Checkout flow, Order summary, Payment, Order details |
| `feature/events` | Event System | Event listings, Event Details, Event Product Mappings |
| `feature/admin-dashboard` | Admin Panel | Dashboard stats, Manage products, categories, orders |
| `feature/ai-recommendations` | AI & Analytics | Recommendation engine, Event matching jobs, Analytics |

### 🛠️ Common Git Commands

```bash
# Switch to a feature branch to start working:
git checkout feature/auth

# Save and commit your work:
git add .
git commit -m "feat(auth): implement user registration and login"

# Push branch to GitHub:
git push -u origin feature/auth
```
