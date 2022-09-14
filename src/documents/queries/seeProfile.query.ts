import { gql } from "@apollo/client";

gql`
  query seeProfile($username: String!, $page: Int!) {
    seeProfile(username: $username) {
      id
      firstName
      lastName
      bio
      username
      avatar
      photos(page: $page) {
        id
        file
        caption
        likes
        commentNumber
        isLiked
        createdAt
        user {
          id
          username
          firstName
          lastName
          avatar
        }
      }
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
      totalFollowing
      totalFollowers
      totalPhotos
      isMe
      isFollowing
    }
  }
`;
