import { gql } from "@apollo/client";

export const SEE_PHOTO_LIKES = gql`
  query SeePhotoLikes($photoId: Int!) {
    seePhotoLikes(photoId: $photoId) {
      ok
      error
      users {
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
