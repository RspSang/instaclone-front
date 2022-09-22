import { gql } from "@apollo/client";

gql`
  query SeeRecommendUsers {
    seeRecommendUsers {
      ok
      error
      users {
        id
        firstName
        lastName
        username
        avatar
        isFollowing
        isMe
      }
    }
  }
`;
