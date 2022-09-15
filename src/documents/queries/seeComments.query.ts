import { gql } from "@apollo/client";

gql`
  query SeeComments($photoId: Int!, $offset: Int) {
    seeComments(photoId: $photoId, offset: $offset) {
      ok
      error
      comments {
        id
        payload
        user {
          id
          username
          avatar
          isMe
        }
        isMine
        createdAt
      }
    }
  }
`;
