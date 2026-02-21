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
  # - declares $input as CreateGreetingInput!
  # - calls createGreeting(input: $input)
  mutation CreateGreeting {
    __typename
  }
`;
