import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDeleteCommentMutation } from "../../generated/graphql";
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
  id?: number;
  author?: string;
  photoId?: number;
  payload?: string | null;
  isMine?: boolean;
}

function Comment({ id, author, photoId, payload, isMine }: CommentProps) {
  const [deleteComment, { loading }] = useDeleteCommentMutation({
    variables: { id: id! },
    update: (cache, result) => {
      if (!result?.data?.deleteComment) return;
      const {
        data: {
          deleteComment: { ok },
        },
      } = result;
      if (ok) {
        cache.evict({ id: `Comment:${id}` });
        cache.modify({
          id: `Photo:${photoId}`,
          fields: {
            commentNumber(prev) {
              return prev - 1;
            },
          },
        });
      }
    },
  });
  const onDeleteClick = () => {
    deleteComment();
  };
  return (
    <CommentContainer>
      <Link to={`/users/${author}`}>
        <FatText>{author}</FatText>
      </Link>
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
      {isMine ? <button onClick={onDeleteClick}>x</button> : ""}
    </CommentContainer>
  );
}

export default Comment;
