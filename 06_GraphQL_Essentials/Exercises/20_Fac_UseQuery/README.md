# 🎣 Facilitator: Apollo `useQuery` Essentials

This Exercise introduces the Apollo Client `useQuery` hook for reading GraphQL data inside React components.

**Estimated time:** 7-10 minutes

## 🎯 Targets

- Explain what `useQuery` does in a React + Apollo app
- Show how `useQuery` handles data, loading, and error states
- Demonstrate `variables` and `skip` options for controlled query execution
- Identify where `useQuery` is implemented in this Exercise

## 🧠 What `useQuery` Does

`useQuery` executes a GraphQL query from a React component and returns a state object you can render from.

Common return values:

- `data`: the successful GraphQL response
- `loading`: `true` while the request is in flight
- `error`: GraphQL/network error details when a request fails

Common options:

- `variables`: values passed into query parameters (e.g., sort, search text, tag)
- `skip`: conditionally disables a query until the component is in the right state

## 🔗 Apollo Docs

- Apollo Client React `useQuery` API: https://www.apollographql.com/docs/react/api/react/useQuery
- Apollo Client queries (overview + patterns): https://www.apollographql.com/docs/react/data/queries
- Apollo Client options (`variables`, `skip`, fetch behavior): https://www.apollographql.com/docs/react/data/queries#options
- Apollo Client + React setup: https://www.apollographql.com/docs/react/get-started

## 🏗️ How We Use It in This Exercise

In `QuestionList`, we use three `useQuery` calls:

1. **All questions query** (`GET_QUESTIONS`) for default list + sorting
2. **Search query** (`SEARCH_QUESTIONS`) when the search filter is active
3. **Tag query** (`GET_QUESTIONS_BY_TAG`) when tag filtering is active

Each query has separate `data`, `loading`, and `error` values, and the component chooses which set to display based on the active filter.

## 📂 Where to Find `useQuery` in This Project

- `frontend/src/components/QuestionList.tsx`
	- `useQuery(GET_QUESTIONS, ...)`
	- `useQuery(SEARCH_QUESTIONS, ...)`
	- `useQuery(GET_QUESTIONS_BY_TAG, ...)`

Supporting query definitions:

- `frontend/src/graphql/queries.ts`

## 💡 Facilitator Talking Points

- `useQuery` is for **read operations** (GraphQL queries), not writes
- `skip` is useful for avoiding unnecessary requests
- Keeping query states separate helps build clean UX for loading/error handling
- `variables` make one query reusable for many UI states

## ✅ Results

By the end of this Exercise, students can describe:

- Why `useQuery` is central to GraphQL data fetching in React
- How component state controls query execution
- How to connect query definitions to UI rendering behavior
