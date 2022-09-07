import { gql } from "@apollo/client";

gql`
  mutation editProfile(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $bio: String
    $password: String
    $avatar: Upload
  ) {
    editProfile(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      bio: $bio
      password: $password
      avatar: $avatar
    ) {
      ok
      error
    }
  }
`;
