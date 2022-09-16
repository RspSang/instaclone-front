import { gql } from "@apollo/client";

export const SEE_FOLLOWERS = gql`
  query SeeFollowers($username: String!, $page: Int!) {
    seeFollowers(username: $username, page: $page) {
      ok
      error
      followers {
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
