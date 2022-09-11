import { gql } from "@apollo/client";

gql`
  query SeeHashtag($hashtag: String!, $offset: Int!) {
    seeHashtag(hashtag: $hashtag) {
      id
      hashtag
      photos(offset: $offset) {
        id
        file
        likes
        commentNumber
        isLiked
      }
      totalPhotos
    }
  }
`;
