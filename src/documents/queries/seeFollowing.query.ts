import { gql } from "@apollo/client";

export const SEE_FOLLOWING = gql`
  query SeeFollowing($username: String!, $page: Int!) {
    seeFollowing(username: $username, page: $page) {
      ok
      error
      following {
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
