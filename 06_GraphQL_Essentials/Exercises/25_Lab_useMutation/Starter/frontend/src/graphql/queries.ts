import { gql } from '@apollo/client';

export const GET_LATEST_GREETING = gql`
  query GetLatestGreeting {
    latestGreeting {
      id
      name
      message
      createdAt
    }
  }
`;

export const CREATE_GREETING = gql`
  # TODO: Complete this mutation so it:
  # - declares $name as String!
  # - calls createGreeting(name: $name)
  mutation CreateGreeting {
    __typename
  }
`;
