import { gql } from "@apollo/client";

gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
    }
  }
`;
