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
├── package.json                 # Root workspace scripts
└── readme.md
```

---

## Getting Started

### Prerequisites

- **Node.js** v18+
- **MongoDB** (local or Atlas)
- **Redis** (local or cloud)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd ShopPulse

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

### Running in Development

```bash
# From the root directory:

# Start the backend server (port 5000)
npm run dev:server

# Start the frontend dev server (port 5173)
npm run dev:client
```

Or run each manually:

```bash
# Terminal 1 — Server
cd server && npm run dev

# Terminal 2 — Client
cd client && npm run dev
```

### Seeding the Database

```bash
cd server && npm run seed
```

---

## Environment Variables

Create a `.env` file in `/server` based on `.env.example`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/shoppulse
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_here
```

Additional variables you may need (Cloudinary, Redis, email):

```env
REDIS_URL=redis://localhost:6379
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_HOST=smtp.example.com
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

---

## API Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login & receive JWT cookie |
| POST | `/api/auth/logout` | Logout & clear cookie |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/products` | List products |
| GET | `/api/products/:slug` | Get product by slug |
| GET | `/api/categories` | List categories |
| GET | `/api/orders` | Get user orders |
| POST | `/api/orders` | Create an order |
| GET | `/api/users/:id` | Get user profile |
| PUT | `/api/users/:id` | Update user profile |

---

## Pages & Routes

### Core
| Route | Page |
|---|---|
| `/` | Home |
| `/shop` | Shop / Product Listing |
| `/products/:slug` | Product Details |
| `/cart` | Shopping Cart |
| `/checkout` | Checkout |
| `/order-success` | Order Confirmation |

### Auth
| Route | Page |
|---|---|
| `/login` | Login |
| `/register` | Register |

### Dashboards
| Route | Page |
|---|---|
| `/profile` or `/dashboard` | User Dashboard |
| `/admin` | Admin Dashboard |
| `/vendor` | Vendor Dashboard |

### Client Care
| Route | Page |
|---|---|
| `/track-order` | Track Order |
| `/return-policy` | Return Policy |
| `/shipping` | Shipping Policy |
| `/cricket-bat-guide` | Cricket Bat Care Guide |
| `/warranty` | Warranty Registration |
| `/contact` | Contact Support |

### Company
| Route | Page |
|---|---|
| `/about` | About Us |
| `/brand-partners` | Brand Partners |
| `/sustainability` | Sustainability |
| `/sponsorships` | Sponsorships |
| `/careers` | Careers |
| `/store-locator` | Store Locator |

### Legal
| Route | Page |
|---|---|
| `/privacy-policy` | Privacy Policy |
| `/terms-of-service` | Terms of Service |
| `/security` | Security Policy |
| `/sitemap` | Sitemap |

---

## Scripts

### Root
| Command | Description |
|---|---|
| `npm run dev:server` | Start backend in watch mode |
| `npm run dev:client` | Start frontend dev server |
| `npm run build:client` | Build frontend for production |
| `npm run build:server` | Compile server TypeScript |
| `npm run start` | Start production server |

### Client (`/client`)
| Command | Description |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build |
| `npm run lint` | Lint with oxlint |
| `npm run preview` | Preview production build |

### Server (`/server`)
| Command | Description |
|---|---|
| `npm run dev` | tsx watch mode |
| `npm run build` | Compile TypeScript |
| `npm run start` | Run compiled server |
| `npm run seed` | Seed products into MongoDB |

---

## License

ISC
