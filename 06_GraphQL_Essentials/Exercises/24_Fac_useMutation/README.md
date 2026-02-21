# 🎯 Facilitator: Apollo `useMutation` Essentials

This Exercise introduces the Apollo Client `useMutation` hook for write operations in a React + GraphQL application.

**Estimated time:** 7-10 minutes

## 🎯 Targets

- Explain what `useMutation` does and when to use it
- Show how to execute mutations with variables
- Demonstrate mutation state handling (`loading`) and UI synchronization
- Identify where `useMutation` is implemented in this project

## 🧠 What `useMutation` Does

`useMutation` prepares a GraphQL mutation and returns:

1. A mutation execution function (for example `createQuestion`)
2. Mutation state metadata (such as `loading`, `error`, `data`)

Common pattern:

- Define mutation in `queries.ts`
- Create mutation hook in the component
- Execute it inside an event handler with `variables`

## 🏗️ How We Use It in This Exercise

- `QuestionForm`
	- `createQuestion` mutation for new posts
	- `updateQuestion` mutation for edits
	- Uses mutation variables (`input`, `id`)
	- Uses `refetchQueries` to refresh question list
- `QuestionCard`
	- `voteQuestion` mutation for up/down voting
	- `deleteQuestion` mutation for removal
	- Uses mutation variables (`id`, `direction`)
	- Uses `optimisticResponse` for instant vote feedback

## 📂 Where to Find `useMutation` in This Project

- `frontend/src/components/QuestionForm.tsx`
- `frontend/src/components/QuestionCard.tsx`

Supporting GraphQL mutation definitions:

- `frontend/src/graphql/queries.ts`

## 🔗 Apollo Docs

- Apollo mutations overview: https://www.apollographql.com/docs/react/data/mutations
- Apollo `useMutation` API: https://www.apollographql.com/docs/react/api/react/useMutation
- Updating local data after mutations: https://www.apollographql.com/docs/react/data/mutations#updating-local-data
- Optimistic UI updates: https://www.apollographql.com/docs/react/performance/optimistic-ui

## ✅ Results

By the end of this Exercise, students can describe:

- Why `useMutation` is used for write operations
- How mutation variables are passed from component state/props
- How `refetchQueries` and optimistic updates affect the UI

