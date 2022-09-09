import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDeleteCommentMutation } from "../../generated/graphql";
import Username from "../shared/Username";

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

const CommentDelete = styled.span`
  margin-left: 10px;
  &:hover {
    cursor: pointer;
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
  const [deleteComment] = useDeleteCommentMutation({
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
        <Username value={author} />
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
      {isMine ? (
        <CommentDelete onClick={onDeleteClick}>
          <FontAwesomeIcon icon={faTrashCan} />
        </CommentDelete>
      ) : (
        ""
      )}
    </CommentContainer>
  );
}

export default Comment;
