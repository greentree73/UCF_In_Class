import { gql } from '@apollo/client';

// `me` returns the current authenticated user from server context.
export const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      email
    }
  }
`;

// Register creates a user and returns JWT + user profile.
export const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

// Login authenticates a user and returns JWT + user profile.
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;
