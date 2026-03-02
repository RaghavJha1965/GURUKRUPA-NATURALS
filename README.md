# GURUKRUPA NATURALS — Premium Organic E-Commerce Website

A production-ready, premium e-commerce website for **GURUKRUPA NATURALS** — an Indian organic health food brand specializing in Black Garlic, herbal products, and natural wellness foods.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand (cart, wishlist)
- **Icons**: Lucide React
- **Payment**: Razorpay / UPI / COD ready
- **Hosting**: Vercel-ready

## Pages

| Page | URL |
|------|-----|
| Homepage | `/` |
| Products Listing | `/products` |
| Product Detail | `/products/[slug]` |
| About | `/about` |
| Blog | `/blog` |
| Blog Post | `/blog/[slug]` |
| Contact | `/contact` |
| Cart | `/cart` |
| Checkout | `/checkout` |
| Wishlist | `/wishlist` |
| Order Tracking | `/order-tracking` |

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Design System

- **Forest Green** `#2D5016` — Primary
- **Earthy Brown** `#8B4513` — Secondary
- **Turmeric Gold** `#D4A017` — Accent
- **Ivory Cream** `#FAF7F0` — Background
- **Deep Charcoal** `#1A1A1A` — Text

Fonts: **Playfair Display** (headings) + **Lato** (body)

## Key Features

- Persistent cart with localStorage (Zustand)
- Cart drawer (no page redirect)
- Wishlist with move-to-cart
- Promo codes (try: NATURAL10, GURUKRUPA20)
- Product weight variants
- Free shipping progress bar
- Pincode delivery checker
- GST invoice option
- WhatsApp chat support
- Cookie consent banner
- Toast notifications
- Full SEO (meta, OG, JSON-LD, sitemap, robots)
- WCAG 2.1 AA accessible
- HTTP security headers
- Mobile-first responsive

## Folder Structure

```
/app            — Next.js App Router pages
/components     — Reusable UI, layout, and section components
  /layout       — Navbar, Footer, FreeShippingBanner
  /sections     — Hero, FeaturedProducts, Testimonials, etc.
  /ui           — ProductCard, CartDrawer, Toast, etc.
/lib            — Types and product data
/store          — Zustand cart/wishlist store
```

Made with love in India
