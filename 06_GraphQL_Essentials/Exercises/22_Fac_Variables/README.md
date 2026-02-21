# 🎯 Facilitator: GraphQL Variables in Apollo Client

This Exercise introduces GraphQL variables and shows how Apollo Client sends dynamic values from React components into queries and mutations.

**Estimated time:** 7-10 minutes

## 🎯 Targets

- Explain what GraphQL variables are and why they matter
- Show variable declaration and usage in GraphQL operations
- Connect Apollo variables objects in React to GraphQL operation variables
- Identify where variable patterns appear in this Exercise

## 🧠 Variable Introduction

GraphQL variables let us parameterize operations instead of hard-coding values.

Pattern:

1. Declare variables in the operation signature
	- Example: `query GetQuestion($id: ID!)`
2. Use those variables in fields/arguments
	- Example: `question(id: $id)`
3. Pass runtime values from Apollo Client
	- Example: `variables: { id: questionId }`

## 🏗️ How Variables Are Used Here

- Query variables in `QuestionList`
  - Sorting with `$sortBy`
  - Searching with `$query`
  - Tag filtering with `$tag`
- Mutation variables in `QuestionForm` and `QuestionCard`
  - Create with `$input`
  - Update with `$id` + `$input`
  - Delete with `$id`
  - Vote with `$id` + `$direction`

## 📂 Where to Find It in This Project

- `frontend/src/graphql/queries.ts`
- `frontend/src/components/QuestionList.tsx`
- `frontend/src/components/QuestionForm.tsx`
- `frontend/src/components/QuestionCard.tsx`

## 🔗 Apollo Docs

- Apollo Client queries overview: https://www.apollographql.com/docs/react/data/queries
- Apollo Client query options (includes variables): https://www.apollographql.com/docs/react/data/queries#options
- Apollo React useQuery API: https://www.apollographql.com/docs/react/api/react/useQuery
- Apollo mutations with variables: https://www.apollographql.com/docs/react/data/mutations

## ✅ Results

By the end of this Exercise, students can describe:

- How `$variables` are declared and consumed in GraphQL documents
- How React state values flow into Apollo `variables` objects
- How variable-driven queries and mutations support dynamic UI behavior

