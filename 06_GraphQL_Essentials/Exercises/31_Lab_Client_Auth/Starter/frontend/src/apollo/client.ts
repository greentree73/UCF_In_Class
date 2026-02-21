import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// HTTP link sends GraphQL operations to the backend endpoint.
const httpLink = createHttpLink({
  uri: '/graphql',
});

// authLink runs before every GraphQL request.
// It reads JWT from localStorage and attaches Authorization headers.
// This is the client-side bridge between login state and server context.
const authLink = setContext((_, { headers }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  return {
    headers: {
      ...headers,
      // Apollo Server context expects a Bearer token format.
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Link order matters: authLink first, httpLink second.
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
