import { gql } from "@apollo/client";

gql`
  query searchHashtags($keyword: String!, $offset: Int!) {
    searchHashtags(keyword: $keyword, offset: $offset) {
      id
      hashtag
      totalPhotos
    }
  }
`;
