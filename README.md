# React e-Shop Website

## Overview

A full-featured e-commerce website built with React, React Router, and Firebase Firestore.  
The project demonstrates end-to-end frontend architecture, real-time data handling, and applied use of TypeScript.

---

## Features

### Home Page

- Featured products carousel
- Responsive product grid displaying all available products
- Products fetched dynamically from Firestore (no static data)

---

### Product Page

- Dynamic routing using product ID parameters
- Product variant selection (e.g. size, colour)
- Stock-aware quantity selection
- Add-to-cart functionality
- Product data stored and retrieved from Firestore, including:
  - Name
  - Price per unit
  - Available stock quantity
  - Variants
  - Images
  - Favourite status

---

### Shopping Cart

- Persistent cart stored in Firestore
- Real-time cart updates via Firestore subscriptions
- Stock validation to prevent adding more items than available
- Quantity adjustment directly from the cart
- Remove items from the cart
- Automatically calculated total price

---

### Data & State Management

- Centralised cart state using React Context
- Real-time Firestore listeners for cart updates
- Async data fetching with derived state
- Type-safe models using TypeScript

---

### Routing

- Client-side routing with React Router
- Shared context available across all routes
- Dynamic product routes

---

### Extras

- Written in TypeScript for improved safety and maintainability
- Structured for easy extension (testing, auth, checkout, etc.)
- Ready for future React Testing Library integration
