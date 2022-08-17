import styled from "styled-components";
import { FatText } from "../shared";

const CommentContainer = styled.div``;
const CommentCaption = styled.span`
  margin-left: 10px;
`;

interface CommentProps {
  author?: string;
  payload?: string | null;
}

function Comment({ author, payload }: CommentProps) {
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption>{payload}</CommentCaption>
    </CommentContainer>
  );
}

export default Comment;
