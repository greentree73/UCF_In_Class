import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Create HTTP link to our GraphQL endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
  // Include credentials if needed for authentication
  credentials: 'omit', // 'include' for cookies, 'same-origin' for same callback
});

// Initialize Apollo Client with cache and link
export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    // Configure cache policies for better performance
    typePolicies: {
      Query: {
        fields: {
          questions: {
            // Merge new questions with existing ones
            merge(existing = [], incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  // Enable developer tools in development
  connectToDevTools: process.env.NODE_ENV === 'development',
  // Default options for queries
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});