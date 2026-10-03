# NexaStore — Modern E-Commerce Product Catalog

> **Task 5: Full-Stack Deployment & Project Architecture**  
> **Internship Milestone:** Days 29 & 30 (October 2026)  
> **Student / Engineer:** College Internship Capstone Demonstration  

---
## 🌐 Live Demo

👉 **[Click Here to View Live Demo](task5-nexastore.netlify.app)**

## 1. Project Overview

**NexaStore** is a modern, responsive, production-ready e-commerce product catalog designed and built to demonstrate frontend architecture, modular component design, client-side routing, interactive filtering, and persistent cart/wishlist management.

The storefront is tailored for high-quality everyday lifestyle products spanning **Electronics & Audio**, **Modern Apparel**, **Everyday Accessories**, and **Home & Living**. All catalog items feature pricing formatted in the **Indian Rupee (INR)** numbering system (`₹`), transparent stock counts, detailed highlight specifications, and resilient media loading with zero-broken-image fallbacks.

### Project & Ethics Disclosure
NexaStore is an honest educational catalog and architecture prototype. It does not pretend to process live bank transfers, nor does it collect real payment details or contact sensitive financial gateways. An interactive checkout demonstration is provided with simulated methods (Cash on Delivery, UPI Simulator, and Card Sandbox) for functional verification.

---

## 2. Main Features

### A. Modular Component Architecture
- **Strict Separation of Concerns:** Divided cleanly into common UI atoms, layout wrappers, domain-specific product modules, cart drawers/summaries, and full-page routes.
- **Top Bar Contract:** Strict three-zone header layout (Single text wordmark, clean text navigation links, functional interactive actions).
- **Zero-Pill Metadata Discipline:** Unboxed metadata using typographic separators (`·` and `/`) for clean, human-designed aesthetics.

### B. Client-Side Routing (React Router v7)
- `/` — Storefront homepage featuring campaign banner, curated categories, trending items, and store pillars.
- `/products` — Complete product catalog with real-time URL parameter synchronization (`?category=...`, `?search=...`, `?sort=...`).
- `/products/:id` — Contiguous Purchase Module (PDP) showing high-resolution imagery, specifications, live stock availability, quantity selector, add-to-cart, wishlist toggle, and related products.
- `/wishlist` — Dedicated saved items manager with one-click "Add to Cart" and "Move All to Cart" capabilities.
- `/cart` — Comprehensive shopping bag with stepper quantity adjustment, dynamic subtotal, coupon engine, free-shipping tier calculator, and demo checkout flow.
- `*` — Accessible 404 Not Found page with return routes.
- `ScrollToTop` controller ensuring smooth view positioning across route transitions.

### C. Search, Multi-Facet Filters & Sorting
- **Real-Time Search:** Live debounced search across product titles, descriptions, categories, and technical tags.
- **Multi-Filter Engine:** Filter by category, interactive price range slider (min/max bounds in INR), in-stock availability flag, and minimum customer ratings.
- **Bi-Directional Sorting:** Sort by Featured collection, Price: Low to High, Price: High to Low, Highest Customer Rating, and Alphabetical (A-Z).
- **Filter Reset & State Counts:** Immediate feedback on result counts and one-click filter reset.

### D. Shopping Cart & State Persistence
- **LocalStorage Backing:** Shopping bag items, selected quantities, and custom promo codes persist across browser refreshes and session restarts.
- **Quantity Boundary Enforcement:** Prevents ordering less than 1 or exceeding verified warehouse stock limits.
- **Financial Computations:** Real-time Indian Rupee (INR) subtotal, ₹1,999 free express shipping threshold progress bar, and coupon discounts (`NEXAFREE` for 10% off, `INTERN20` for 20% off).
- **Clear Cart Safety:** Confirmation modal prevents accidental shopping bag deletion.

### E. Wishlist Management
- Universal heart toggle available on every product card and product detail view.
- LocalStorage persistence synchronized with header badge count.
- Dedicated view with bulk cart transfer capabilities.

### F. Accessibility & Polish
- **Semantic HTML & ARIA:** Labeled dialogs, live notification regions, accessible form controls, and keyboard navigation.
- **Zero Broken Images:** Image fallback containers prevent unstyled broken image frames in restricted network environments.
- **Toast Notifications:** Inline feedback for cart additions, wishlist updates, and coupon applications.

---

## 3. Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 (`react`, `react-dom`) |
| **Language** | TypeScript 5+ (`tsx`, `esbuild`, `tsc`) |
| **Bundler & Dev Server** | Vite 8+ |
| **Routing** | React Router (`react-router-dom` v7) |
| **Styling & Palette** | Tailwind CSS v4 with bespoke **Aurora (`#8ea4c4`)** and **Wisteria (`#6e5a88`)** theme |
| **Icons** | Lucide React |
| **State Persistence** | Browser `localStorage` with error handling |
| **Deployment Target** | Netlify / Vercel SPA static hosting |

---

## 4. Folder Structure

```text
/
├── public/
│   └── _redirects                  # Netlify SPA 200 rewrite rule
├── src/
│   ├── assets/
│   │   └── images/                 # Optimized product & hero imagery
│   ├── components/
│   │   ├── cart/
│   │   │   ├── CartItem.tsx        # Quantity stepper, item summary & removal
│   │   │   ├── CartSummary.tsx     # Subtotal, shipping progress & promo engine
│   │   │   └── CheckoutModal.tsx   # Simulated checkout & confirmation receipt
│   │   ├── common/
│   │   │   ├── Button.tsx          # Accessible polymorphic button
│   │   │   ├── EmptyState.tsx      # Reusable empty view state
│   │   │   ├── ErrorMessage.tsx    # Accessible error boundary fallback
│   │   │   ├── ImageWithFallback.tsx # Zero-broken-image resilient container
│   │   │   ├── Input.tsx           # Controlled input with error & icon slots
│   │   │   ├── LoadingState.tsx    # Accessible loading indicator
│   │   │   └── ScrollToTop.tsx     # Route transition scroll manager
│   │   ├── layout/
│   │   │   ├── AnnouncementBar.tsx # Dismissible top promotional banner
│   │   │   ├── Footer.tsx          # 4-column footer with honest policies
│   │   │   └── Navbar.tsx          # 3-zone Top Bar Contract with mobile drawer
│   │   └── products/
│   │       ├── ProductCard.tsx     # Standard retail card with INR formatting
│   │       ├── ProductFilters.tsx  # Multi-parameter sidebar filters
│   │       ├── ProductGrid.tsx     # Responsive adaptive product grid
│   │       └── ProductSearch.tsx   # Debounced search & sorting toolbar
│   ├── context/
│   │   ├── CartContext.tsx         # Cart state, LocalStorage, coupons
│   │   ├── ToastContext.tsx        # Accessible toast notification dispatch
│   │   └── WishlistContext.tsx     # Wishlist state and LocalStorage sync
│   ├── data/
│   │   ├── categories.ts           # Category definitions & imagery
│   │   └── products.ts             # 16 typed catalog products with INR pricing
│   ├── hooks/
│   │   ├── useCart.ts              # Consumer hook for CartContext
│   │   └── useWishlist.ts          # Consumer hook for WishlistContext
│   ├── pages/
│   │   ├── CartPage.tsx            # Full shopping bag view & checkout trigger
│   │   ├── HomePage.tsx            # Campaign hero, categories, trust pillars
│   │   ├── NotFoundPage.tsx        # 404 handler with return navigation
│   │   ├── ProductDetailsPage.tsx  # Contiguous Purchase Module (PDP)
│   │   ├── ProductsPage.tsx        # Filterable, searchable catalog
│   │   └── WishlistPage.tsx        # Saved products manager
│   ├── types/
│   │   ├── cart.ts                 # Cart item and checkout data models
│   │   └── product.ts              # Product, category, and filter interfaces
│   ├── utils/
│   │   ├── currency.ts             # Indian numbering system INR formatter
│   │   └── storage.ts              # Resilient LocalStorage helpers
│   ├── App.tsx                     # Application route definitions & providers
│   ├── index.css                   # Tailwind CSS v4 entrypoint & fonts
│   └── main.tsx                    # React 19 DOM mount entrypoint
├── index.html                      # HTML entry with OpenGraph & theme metadata
├── package.json                    # Dependencies & build scripts
├── tsconfig.json                   # Strict TypeScript compiler options
├── vercel.json                     # Vercel SPA rewrite configuration
├── vite.config.ts                  # Vite bundler configuration
└── README.md                       # Complete documentation & deployment guide
```

---

## 5. Installation & Local Development

### Prerequisites
- Node.js (version 18.x or 20.x recommended)
- npm (version 9.x or higher)

### Setup Steps

1. **Clone or download the project repository:**
   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd <PROJECT_DIR>
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   The development server will launch at `http://localhost:3000`.

4. **Verify TypeScript & Syntax:**
   ```bash
   npm run lint
   ```

---

## 6. Production Build Instructions

To generate an optimized, minified production build:

```bash
npm run build
```

This compiles TypeScript source code, bundles assets with Vite and Rollup, minifies CSS via `@tailwindcss/vite`, and outputs static assets into the `/dist` directory.

To preview the production build locally before publishing:
```bash
npm run preview
```

---

## 7. Step-by-Step Deployment Instructions

### A. Deploying to Netlify
1. Connect your GitHub / GitLab repository to Netlify.
2. In the Netlify build settings:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
3. Single Page Application (SPA) routing is pre-configured via `public/_redirects` (`/* /index.html 200`), ensuring direct URLs like `/products` and `/cart` resolve smoothly without 404 errors.
4. Click **Deploy Site**.

### B. Deploying to Vercel
1. Import your project repository in the Vercel dashboard.
2. Vercel automatically detects the **Vite** framework preset:
   - **Build Command:** `vite build` or `npm run build`
   - **Output Directory:** `dist`
3. SPA routing is pre-configured in `vercel.json` with universal route rewrites to `/index.html`.
4. Click **Deploy**.

---

## 8. Verification & Testing Checklist

The following items were verified during local compilation and test runs:

- [x] **Zero TypeScript Errors:** Verified via `tsc --noEmit` (`npm run lint`).
- [x] **Clean Production Compilation:** Verified via `vite build` (`npm run build`).
- [x] **Storefront Hero & Navigation:** Top Bar contract adheres to 3-zone specification.
- [x] **Product Catalog:** 16 typed sample products loaded across 4 distinct categories.
- [x] **Search & Multi-Filtering:** Real-time search, price range filtering, category tabs, and rating filters operate in tandem.
- [x] **INR Currency Formatting:** All prices correctly formatted according to Indian numbering standards (e.g., `₹14,999`).
- [x] **Contiguous Purchase Module (PDP):** Stable purchase layout with quantity stepper, stock limits, and related items.
- [x] **Shopping Bag (Cart):** Item addition, quantity increment/decrement, bounds check, LocalStorage persistence, and coupon validation (`NEXAFREE`).
- [x] **Wishlist:** Toggle from cards and PDP, header badge count, and persistent state.
- [x] **Demonstration Checkout:** Honest simulation with clear disclosures, customer validation, and receipt generation.
- [x] **Fallback Protection:** Zero-broken-image fallback container in place for network interruptions.
- [x] **404 Routing:** Unmatched routes gracefully caught with clear navigation options.

---

## 9. Known Limitations

1. **Demonstration Checkout Only:** Does not connect to live banking rails or payment gateways (Razorpay, Stripe, Paytm). Designed strictly as an architectural simulation.
2. **Local Client Persistence:** Cart and wishlist persist locally in the user's browser `localStorage`. Changes do not synchronize across separate devices.
3. **Sample Product Reviews:** Review ratings and review counts represent typed sample data rather than live user-submitted reviews.

---

## 10. Deployment Links & Repository

* **Source Repository:** `[Insert GitHub Repository URL]`
* **Live Deployment URL:** `[Insert Live Netlify or Vercel URL]`
* **Evaluation Date:** October 2026
* **Capstone Status:** Ready for Assessment
