# FutureInterns Store

A full-stack e-commerce web application with Firebase authentication, a Firestore-backed order history, and a live product catalogue sourced from the [Fake Store API](https://fakestoreapi.com).

## Tech Stack

- **Next.js 15** (App Router, Server Components, Turbopack)
- **React 19** with TypeScript
- **Tailwind CSS v4**
- **Firebase** — Authentication (email/password) + Firestore (orders)
- **Fake Store API** — product data
- **Vercel** — deployment

## Features

- Product catalogue with live search and category filter
- Individual product detail pages
- Shopping cart with quantity controls and order summary
- Firebase email/password sign-up and login
- Protected checkout — saves full order to Firestore
- Order history page per user, sorted by date
- Account dashboard with protected route (auto-redirects to login)
- Responsive layout across mobile, tablet, and desktop

## Project Structure

```
src/
├── app/
│   ├── page.tsx               # Home — product listing (Server Component)
│   ├── products/[id]/
│   │   ├── page.tsx           # Product detail (Server Component)
│   │   └── ProductDetailsClient.tsx  # Add-to-cart button (Client Component)
│   ├── cart/page.tsx          # Shopping cart
│   ├── checkout/page.tsx      # Checkout form → saves order to Firestore
│   ├── orders/page.tsx        # Order history (reads from Firestore)
│   ├── account/page.tsx       # Account dashboard (protected)
│   ├── login/page.tsx         # Firebase email/password login
│   ├── signup/page.tsx        # New account registration
│   ├── thank-you/page.tsx     # Order confirmation
│   ├── components/
│   │   ├── Header.tsx         # Nav with cart badge + auth state
│   │   └── ProductList.tsx    # Search + filter + product grid
│   └── types.ts               # Shared TypeScript interfaces
├── context/
│   ├── CartContext.tsx        # Cart state (add / remove / update / clear)
│   └── AuthContext.tsx        # Firebase auth state across the app
lib/
└── firebase.ts                # Firebase app, Firestore, and Auth initialisation
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Firebase

This project uses Firebase for auth and order storage. The config lives in `lib/firebase.ts`. For your own deployment, replace the values there with your own Firebase project credentials, or use environment variables:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

In your Firebase console, enable **Email/Password** sign-in and create a **Firestore** database. The orders collection requires a composite index on `(userId ASC, createdAt DESC)` — Firestore will prompt you with a direct link to create it the first time the orders page is loaded.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Deployment

Deploy to [Vercel](https://vercel.com) by connecting your repository. Add the Firebase environment variables in the Vercel project settings under **Environment Variables** before deploying.
