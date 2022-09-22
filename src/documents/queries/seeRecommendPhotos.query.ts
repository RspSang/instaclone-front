import { gql } from "@apollo/client";

gql`
  query SeeRecommendPhotos {
    seeRecommendPhotos {
      ok
      error
      photos {
        id
        file
        caption
        likes
        commentNumber
        isMine
        isLiked
        createdAt
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
  }
`;
