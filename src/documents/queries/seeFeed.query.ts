import { gql } from "@apollo/client";

gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      user {
        id
        username
        avatar
      }
      comments {
        id
        user {
          username
          avatar
        }
        payload
        isMine
        createdAt
      }
      caption
      createdAt
      isMine
      id
      file
      likes
      commentNumber
      isLiked
    }
  }
`;
