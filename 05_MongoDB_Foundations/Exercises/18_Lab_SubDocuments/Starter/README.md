# 🛍️ Lab: Product Reviews as Subdocuments

## 📘 Lab Overview

In this lab, you will use Mongoose subdocuments to store **reviews embedded inside products** in the `ecommerce` database.

You only need to complete:

1. **One controller**: `addReview`
2. **One route**: `POST /products/:id/reviews`

All other routes and controllers are already completed.

## 🎯 Goal

As a shopper,
I want to add a review to a product,
so that feedback is stored directly with that product.

## 🏗️ Project Structure

```
Starter/
├── src/
│   ├── config/
│   │   └── db.ts
│   ├── models/
│   │   ├── index.ts
│   │   └── PRODUCT.ts
│   ├── controllers/
│   │   └── productController.ts  # addReview TODO
│   ├── routes/
│   │   └── productRoutes.ts      # missing review POST route
│   └── app.ts
├── .env.example
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create your env file:

```bash
cp .env.example .env
```

3. Start MongoDB locally.

4. Run the server:

```bash
npm run dev
```

## 📋 Tasks

### Task 1: Complete `addReview` controller

File: `src/controllers/productController.ts`

Requirements:

- Find product by `req.params.id`
- Return `404` if product does not exist
- Push new review subdocument with:
  - `username` from request body
  - `rating` from request body
  - `comment` from request body
- Save product
- Return `201` with the newly added review and updated review count

### Task 2: Add review route

File: `src/routes/productRoutes.ts`

Add this route:

```ts
router.post('/:id/reviews', addReview);
```

## 🧪 Test Flow

1. Create product

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mechanical Keyboard",
    "price": 99.99,
    "category": "Electronics",
    "inStock": true
  }'
```

2. Add review (your new route/controller)

```bash
curl -X POST http://localhost:3000/products/{id}/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "username": "Knightro",
    "rating": 5,
    "comment": "Great typing feel and build quality."
  }'
```

3. Verify reviews list

```bash
curl http://localhost:3000/products/{id}/reviews
```

## ✅ Success Checklist

- `POST /products/:id/reviews` is registered in routes
- `addReview` saves a subdocument in `reviews`
- Product not found returns `404`
- Success returns `201` and includes the created review

## ✅ Facilitator Checkoff Rubric

- Student added `POST /products/:id/reviews` route in `src/routes/productRoutes.ts`
- Student implemented `addReview` in `src/controllers/productController.ts`
- Controller handles missing product with `404`
- Controller pushes review subdocument and saves parent `Product`
- Success response returns `201` and includes created review plus updated review count
