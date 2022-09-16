import { gql } from "@apollo/client";

gql`
  mutation DeletePhoto($id: Int!) {
    deletePhoto(id: $id) {
      ok
      error
      id
    }
  }
`;
