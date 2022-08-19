import { gql } from "@apollo/client";

gql`
  query seeProfile($username: String!, $page: Int!) {
    seeProfile(username: $username) {
      firstName
      lastName
      bio
      username
      avatar
      photos(page: $page) {
        id
        file
        likes
        commentNumber
        isLiked
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
`;
