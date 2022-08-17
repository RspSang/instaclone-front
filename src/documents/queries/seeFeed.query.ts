import { gql } from "@apollo/client";

gql`
  query seeFeed($page: Int!) {
    seeFeed(page: $page) {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      commentNumber
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
      createdAt
      isMine
      isLiked
    }
  }
`;
