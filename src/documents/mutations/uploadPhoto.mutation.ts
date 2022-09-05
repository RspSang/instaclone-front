import { gql } from "@apollo/client";

gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      id
      file
      likes
      commentNumber
      isLiked
      user {
        id
        username
        avatar
      }
      caption
      createdAt
      isMine
    }
  }
`;
