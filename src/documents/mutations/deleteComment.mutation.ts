import { gql } from "@apollo/client";

gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
      id
    }
  }
`;
