import { gql } from "@apollo/client";

gql`
  query seeFeed($page: Int!) {
    seeFeed(page: $page) {
      user {
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
