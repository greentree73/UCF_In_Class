# 🚀 26_Fac_input_Types

## 🎯 Overview

In this Exercise, Facilitators introduce **GraphQL Input Types** and how Apollo Client sends them in mutation variables.

Input Types let us group related fields into one structured argument (for example, `CreateQuestionInput`), which keeps mutation signatures clean and easier to scale.

## 🧠 Input Types with Apollo Client

When using Apollo Client, Input Types are typically passed through a variable named `input`:

- GraphQL operation: `mutation CreateQuestion($input: CreateQuestionInput!)`
- Apollo call: `createQuestion({ variables: { input } })`

This means:

- The frontend builds one JavaScript object (`input`) from form data.
- Apollo Client sends that object in the GraphQL variables payload.
- GraphQL validates that object against the schema input type before the resolver runs.

## 🔎 Where To Find It In This Exercise

- Frontend mutation definitions with input variables:
	- `frontend/src/graphql/queries.ts`
- Frontend form logic that builds and sends input objects:
	- `frontend/src/components/QuestionForm.tsx`
- Backend schema input type definitions:
	- `backend/src/schema/typeDefs.ts`
- Backend mutation handlers receiving typed input:
	- `backend/src/schema/resolvers.ts`

## 📚 Documentation

- GraphQL Input Object Types:
	- https://graphql.org/learn/schema/#input-types
- Apollo Client Mutations:
	- https://www.apollographql.com/docs/react/data/mutations
- Apollo Client Variables:
	- https://www.apollographql.com/docs/react/data/operation-best-practices/#use-graphql-variables-to-provide-arguments
