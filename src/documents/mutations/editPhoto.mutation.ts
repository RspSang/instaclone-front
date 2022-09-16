import { gql } from "@apollo/client";

gql`
  mutation EditPhoto($id: Int!, $caption: String!) {
    editPhoto(id: $id, caption: $caption) {
      ok
      error
      id
    }
  }
`;
