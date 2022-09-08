import { gql } from "@apollo/client";

gql`
  query SearchUsers($keyword: String!, $offset: Int!) {
    searchUsers(keyword: $keyword, offset: $offset) {
      id
      avatar
      username
      firstName
      lastName
    }
  }
`;
