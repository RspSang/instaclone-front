import { gql } from "@apollo/client";

gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
      error
      user {
        id
        firstName
        lastName
        username
      }
    }
  }
`;
