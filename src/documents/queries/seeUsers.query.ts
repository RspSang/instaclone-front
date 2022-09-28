import { gql } from "@apollo/client";

gql`
  query SeeUsers {
    seeUsers {
      ok
      error
      users {
        id
        username
        avatar
        isFollowing
        firstName
        lastName
        email
        bio
        isMe
        following {
          id
          firstName
          lastName
          username
          avatar
          isFollowing
        }
        followers {
          id
          firstName
          lastName
          username
          avatar
          isFollowing
        }
      }
    }
  }
`;
