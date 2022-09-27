import { gql } from "@apollo/client";

gql`
  query SeeHashtag($hashtag: String!) {
    seeHashtag(hashtag: $hashtag) {
      id
      hashtag
      photos {
        id
        file
        likes
        caption
        commentNumber
        isLiked
        createdAt
        user {
          firstName
          lastName
          username
          avatar
        }
      }
      totalPhotos
    }
  }
`;
