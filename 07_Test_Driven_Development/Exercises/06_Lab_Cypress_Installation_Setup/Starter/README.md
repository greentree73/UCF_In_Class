# Lab: Cypress Installation & Setup (Starter)

## 🎯 Objective
Perform the Cypress installation and setup steps for this API project so the project is ready for API test authoring in the next activities.

## ⏱️ Estimated Time
15-20 minutes

## 🧱 Starting State
This project already has an API server (Express + Apollo + Mongoose), but Cypress is **not fully set up** yet.

Your task is to complete the setup.

## ✅ What You Will Complete
- Install Cypress as a dev dependency.
- Initialize Cypress to generate project scaffolding.
- Add/update Cypress scripts in `package.json` if needed.
- Ensure Cypress config points to this API.
- Create the API test folder structure where tests will go.

## 🚀 Setup Steps

### 1) Install project dependencies
```bash
npm install
```

### 2) Start the API server in one terminal
```bash
npm run dev
```

### 3) Install Cypress
```bash
npm install -D cypress
```

### 4) Initialize Cypress
```bash
npx cypress open
```

### 5) Confirm package scripts
Ensure these scripts are available:
- `npm run cypress:open`
- `npm run cypress:run`

### 6) Configure Cypress for this API
In `cypress.config.ts` (or `.js`), confirm:
- `baseUrl: "http://localhost:4000"`
- `specPattern: "cypress/e2e/**/*.cy.ts"`
- `env.apiPath: "/graphql"`

### 7) Create test folders (no tests yet)
Create these directories:
- `cypress/e2e/api/`
- `cypress/fixtures/`
- `cypress/support/`

## ❓ Reflection Questions
- Is Cypress installed correctly?
- How do you verify that setup is complete before writing tests?
- Where should API tests live in this repo and why?

## ✅ Success Criteria
- [ ] `cypress` appears in `devDependencies`.
- [ ] `npm run cypress:open` launches Cypress.
- [ ] `npm run cypress:run` executes without config errors.
- [ ] Cypress config includes API `baseUrl` and `apiPath`.
- [ ] API test folder structure is present.

## 📚 Resources
- [Cypress Docs](https://docs.cypress.io/)
- [Cypress Configuration](https://docs.cypress.io/app/references/configuration)
- [Cypress CLI](https://docs.cypress.io/guides/guides/command-line)
- [Cypress `cy.request()`](https://docs.cypress.io/api/commands/request)
