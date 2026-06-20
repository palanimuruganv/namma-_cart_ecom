# Shoplyte — MERN Stack Ecommerce App

A full-stack ecommerce application built with **MongoDB, Express, React, and Node.js**, styled with **Tailwind CSS**.

## Features
- Product catalog with search and category filter
- Product detail page, cart, and checkout (with stock-aware order placement)
- User registration & login (JWT auth)
- Order history for logged-in users
- Admin panel: dashboard stats, product CRUD, order management with status updates
- Role-based route protection (user vs admin)

## Project structure
```
ecommerce-mern/
├── backend/      Express API + MongoDB (Mongoose)
└── frontend/     React + Vite + Tailwind CSS
```

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_ecommerce   # or your MongoDB Atlas URI
JWT_SECRET=replace_this_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Make sure MongoDB is running locally, or use a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster and paste its connection string into `MONGO_URI`.

Seed the database with sample products and an admin account:
```bash
node seed.js
```
This creates an admin user: **admin@example.com / admin123**

Start the API:
```bash
npm run dev      # requires nodemon (in devDependencies)
# or
npm start
```
API runs at `http://localhost:5000`.

## 2. Frontend setup

In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
App runs at `http://localhost:5173` and proxies `/api` requests to the backend (see `vite.config.js`).

## 3. Using the app
- Browse products on the home page, search/filter by category.
- Register a new account or log in.
- Add items to cart, go to checkout, fill in shipping details, and place the order.
- View past orders under "My Orders".
- Log in as the seeded admin (admin@example.com / admin123) to access **/admin**:
  - Dashboard: product/order counts and revenue
  - Products: create, edit, delete products
  - Orders: view all orders and update their status

## API overview

| Method | Route                      | Access        | Description                  |
|--------|-----------------------------|--------------|-------------------------------|
| POST   | /api/auth/register          | Public        | Register a new user           |
| POST   | /api/auth/login              | Public        | Login, returns JWT            |
| GET    | /api/auth/profile            | Private       | Get logged-in user profile    |
| GET    | /api/products                | Public        | List products (search/filter) |
| GET    | /api/products/:id            | Public        | Get single product            |
| POST   | /api/products                | Admin         | Create product                |
| PUT    | /api/products/:id            | Admin         | Update product                |
| DELETE | /api/products/:id            | Admin         | Delete product                |
| POST   | /api/orders                  | Private       | Place an order                |
| GET    | /api/orders/myorders         | Private       | Get logged-in user's orders   |
| GET    | /api/orders/:id              | Private       | Get a single order            |
| GET    | /api/orders                  | Admin         | List all orders               |
| PUT    | /api/orders/:id/status       | Admin         | Update order status           |

## Notes
- Passwords are hashed with bcrypt; auth uses JWT bearer tokens.
- Order prices are recalculated server-side from the database (never trusts client-sent prices), and stock is decremented on order placement.
- This project uses Cash on Delivery / placeholder payment methods — no real payment gateway is wired up. To add Stripe or Razorpay, integrate their SDK in `orderController.js` and the `Checkout.jsx` page.
- Tailwind theme colors/fonts are defined in `frontend/tailwind.config.js` — change the `brand` palette to restyle the whole app.
