# Lab: Cypress REST Testing with `cy.request()` (Starter)

## Objective

Install Cypress and complete beginner API tests that validate Express routes using `cy.request()`.

---

## Lab Tasks

1. Install dependencies
2. Run the Express API
3. Complete missing route in `src/app.js`
4. Run Cypress tests
5. Fix failing tests and re-run

---

## Step 1: Install Dependencies

```bash
npm install
```

### Checkpoint

- [ ] Dependencies installed successfully

---

## Step 2: Review API Routes

Open `src/app.js`.

- `GET /` is complete
- `GET /health` is complete
- `GET /api/users` is a TODO (you will complete it)

---

## Step 3: Complete the TODO Route

Implement this route in `src/app.js`:

```js
GET /api/users
```

Expected JSON:

```json
{
  "users": [
    { "id": 1, "name": "Ada" },
    { "id": 2, "name": "Grace" }
  ]
}
```

---

## Step 4: Run Tests with Cypress

```bash
npm test
```

This command starts the API and then runs Cypress in headless mode.

### Checkpoint

- [ ] `cy.request('/')` test passes
- [ ] `cy.request('/health')` test passes
- [ ] `cy.request('/api/users')` test passes

---

## Step 5: Reflection

Answer briefly:

1. Why use `cy.request()` for route tests?
2. What did your `/api/users` test verify?
3. How can this help prevent backend regressions?
