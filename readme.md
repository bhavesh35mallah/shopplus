ShopPulse/
│
├── client/
│   ├── public/
│   │
│   └── src/
│       ├── api/
│       │   ├── axios.ts
│       │   ├── authApi.ts
│       │   ├── productApi.ts
│       │   ├── categoryApi.ts
│       │   ├── eventApi.ts
│       │   ├── cartApi.ts
│       │   ├── wishlistApi.ts
│       │   ├── orderApi.ts
│       │   ├── recommendationApi.ts
│       │   └── analyticsApi.ts
│       │
│       ├── assets/
│       │
│       ├── components/
│       │   ├── common/
│       │   ├── layout/
│       │   ├── product/
│       │   ├── event/
│       │   ├── cart/
│       │   ├── checkout/
│       │   ├── recommendation/
│       │   └── ui/
│       │
│       ├── context/
│       │   ├── AuthContext.tsx
│       │   ├── CartContext.tsx
│       │   └── WishlistContext.tsx
│       │
│       ├── hooks/
│       │   ├── useAuth.ts
│       │   ├── useProducts.ts
│       │   ├── useEvents.ts
│       │   ├── useCart.ts
│       │   ├── useWishlist.ts
│       │   ├── useRecommendations.ts
│       │   └── useNotifications.ts
│       │
│       ├── pages/
│       │   ├── auth/
│       │   │   ├── Login.tsx
│       │   │   ├── Register.tsx
│       │   │   ├── ForgotPassword.tsx
│       │   │   └── ResetPassword.tsx
│       │   │
│       │   ├── home/
│       │   │   └── Home.tsx
│       │   │
│       │   ├── products/
│       │   │   ├── Shop.tsx
│       │   │   ├── ProductDetails.tsx
│       │   │   └── Search.tsx
│       │   │
│       │   ├── categories/
│       │   │   └── CategoryProducts.tsx
│       │   │
│       │   ├── events/
│       │   │   ├── Events.tsx
│       │   │   └── EventDetails.tsx
│       │   │
│       │   ├── cart/
│       │   │   └── Cart.tsx
│       │   │
│       │   ├── checkout/
│       │   │   ├── Checkout.tsx
│       │   │   └── OrderSuccess.tsx
│       │   │
│       │   ├── orders/
│       │   │   ├── Orders.tsx
│       │   │   └── OrderDetails.tsx
│       │   │
│       │   ├── profile/
│       │   │   ├── Profile.tsx
│       │   │   ├── Addresses.tsx
│       │   │   ├── Notifications.tsx
│       │   │   ├── FollowedEvents.tsx
│       │   │   └── Rewards.tsx
│       │   │
│       │   └── admin/
│       │       ├── Dashboard.tsx
│       │       ├── Products.tsx
│       │       ├── Categories.tsx
│       │       ├── Orders.tsx
│       │       ├── Customers.tsx
│       │       ├── Events.tsx
│       │       ├── EventMappings.tsx
│       │       ├── HomepageSections.tsx
│       │       ├── Promotions.tsx
│       │       ├── Bundles.tsx
│       │       ├── Analytics.tsx
│       │       └── Settings.tsx
│       │
│       ├── routes/
│       │   ├── AppRoutes.tsx
│       │   ├── ProtectedRoute.tsx
│       │   └── AdminRoute.tsx
│       │
│       ├── types/
│       │   ├── auth.ts
│       │   ├── product.ts
│       │   ├── category.ts
│       │   ├── event.ts
│       │   ├── cart.ts
│       │   ├── order.ts
│       │   └── recommendation.ts
│       │
│       ├── utils/
│       │   ├── formatCurrency.ts
│       │   ├── formatDate.ts
│       │   └── validation.ts
│       │
│       ├── constants/
│       │   └── index.ts
│       │
│       ├── App.tsx
│       ├── main.tsx
│       └── index.css
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.ts
│   │   │   ├── redis.ts
│   │   │   └── cloudinary.ts
│   │   │
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Product.ts
│   │   │   ├── Category.ts
│   │   │   ├── Event.ts
│   │   │   ├── EventProductMapping.ts
│   │   │   ├── HomepageSection.ts
│   │   │   ├── Promotion.ts
│   │   │   ├── Bundle.ts
│   │   │   ├── Cart.ts
│   │   │   ├── Order.ts
│   │   │   ├── Review.ts
│   │   │   └── Notification.ts
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── productController.ts
│   │   │   ├── categoryController.ts
│   │   │   ├── eventController.ts
│   │   │   ├── cartController.ts
│   │   │   ├── wishlistController.ts
│   │   │   ├── orderController.ts
│   │   │   ├── recommendationController.ts
│   │   │   └── analyticsController.ts
│   │   │
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   ├── productService.ts
│   │   │   ├── eventService.ts
│   │   │   ├── recommendationService.ts
│   │   │   ├── orderService.ts
│   │   │   └── notificationService.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── productRoutes.ts
│   │   │   ├── categoryRoutes.ts
│   │   │   ├── eventRoutes.ts
│   │   │   ├── cartRoutes.ts
│   │   │   ├── wishlistRoutes.ts
│   │   │   ├── orderRoutes.ts
│   │   │   ├── recommendationRoutes.ts
│   │   │   └── analyticsRoutes.ts
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.ts
│   │   │   ├── adminMiddleware.ts
│   │   │   ├── errorMiddleware.ts
│   │   │   └── uploadMiddleware.ts
│   │   │
│   │   ├── validators/
│   │   │   ├── authValidator.ts
│   │   │   ├── productValidator.ts
│   │   │   ├── eventValidator.ts
│   │   │   └── orderValidator.ts
│   │   │
│   │   ├── jobs/
│   │   │   ├── eventStatusJob.ts
│   │   │   ├── eventMatchingJob.ts
│   │   │   ├── hotScoreJob.ts
│   │   │   ├── recommendationJob.ts
│   │   │   ├── reminderJob.ts
│   │   │   └── analyticsJob.ts
│   │   │
│   │   ├── queues/
│   │   │   └── queue.ts
│   │   │
│   │   ├── ai/
│   │   │   ├── eventMatcher.ts
│   │   │   └── productTagger.ts
│   │   │
│   │   ├── analytics/
│   │   │   └── analyticsService.ts
│   │   │
│   │   ├── sockets/
│   │   │   └── socket.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── generateToken.ts
│   │   │   ├── slugify.ts
│   │   │   └── calculateTotal.ts
│   │   │
│   │   ├── constants/
│   │   │   └── index.ts
│   │   │
│   │   ├── types/
│   │   │   └── index.ts
│   │   │
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
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