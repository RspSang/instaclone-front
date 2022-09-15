import { gql } from "@apollo/client";

gql`
  mutation EditComment($id: Int!, $payload: String!) {
    editComment(id: $id, payload: $payload) {
      ok
      error
      id
    }
  }
`;
