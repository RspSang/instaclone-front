import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FatText } from "../shared";

const CommentContainer = styled.div``;
const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

interface CommentProps {
  author?: string;
  payload?: string | null;
}

function Comment({ author, payload }: CommentProps) {
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption>
        {payload?.split(" ").map((word, index) =>
          /#[a-zA-Z0-9가-힇ㄱ-ㅎㅏ-ㅣぁ-ゔァ-ヴー々〆〤一-龥\w]+/g.test(
            word
          ) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
    </CommentContainer>
  );
}

export default Comment;
