import { gql } from "@apollo/client";

export const ME = gql`
  query me {
    me {
      id
      firstName
      lastName
      username
      email
      avatar
      bio
      isMe
    }
  }
`;
