# 🛍️ Lab: Product Virtuals

## 📘 Lab Overview

In this lab, you will create **one Mongoose virtual** on the `Product` model using the `ecommerce` database.

- Controllers are complete
- Routes are complete
- Your task is only in the model

## 🎯 Goal

As a shopper,
I want to see a product’s price with tax,
so that I know the estimated checkout amount.

## 📁 Where to Work

- Complete one TODO in `src/models/PRODUCT.ts`

## 🧩 Task

Create one virtual named `priceWithTax` that:

- Uses a 7% tax rate
- Returns a number rounded to 2 decimals
- Is computed from the product `price`

## 💡 Hint

Use:

```ts
productSchema.virtual('virtualName').get(function () {
  return ...;
});
```

And make sure virtuals are included in responses with schema options:

```ts
toJSON: { virtuals: true }
toObject: { virtuals: true }
```

## 🚀 Run

```bash
npm install
cp .env.example .env
npm run dev
```

## 🧪 Quick Test

1. Create a product:

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Gaming Mouse",
    "price": 50,
    "category": "Electronics",
    "inStock": true
  }'
```

2. Fetch all products and verify `priceWithTax` exists.

```bash
curl http://localhost:3000/products
```

## ✅ Facilitator Checkoff Rubric

- Student implemented exactly one virtual named `priceWithTax` in `src/models/PRODUCT.ts`
- Virtual uses `price` and applies 7% tax correctly
- Virtual value is rounded to 2 decimal places
- Response from `GET /products` includes `priceWithTax` (virtuals enabled in schema options)
- Controllers and routes remain unchanged and still function
