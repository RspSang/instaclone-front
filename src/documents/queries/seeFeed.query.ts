import { gql } from "@apollo/client";

gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      caption
      createdAt
      isMine
      id
      file
      likes
      commentNumber
      isLiked
      user {
        id
        firstName
        lastName
        username
        avatar
      }
      hashtags {
        id
        hashtag
      }
      comments {
        id
        payload
        isMine
        createdAt
        user {
          id
          username
          avatar
        }
      }
    }
  }
`;
