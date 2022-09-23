import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useDeleteCommentMutation,
  useEditCommentMutation,
  User,
} from "../../generated/graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import Username from "../shared/Username";

interface CommentContentProps {
  photoId?: number;
  id: number;
  payload: string;
  user: User;
  isMine: boolean;
  createdAt: string;
}

interface FormData {
  payload: string;
}

const Container = styled.div`
  padding-left: 15px;
  margin-bottom: 5px;
  display: flex;
`;

const Text = styled.span`
  margin-left: 5px;
  font-size: 15px;
  margin-right: auto;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
`;

const EditCommentButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  color: ${(props) => props.theme.fontColor};
  font-size: 14px;
  padding: 0;
  margin-right: 2px;
  margin-top: 2px;
`;

const DeleteCommentButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  margin-right: 12px;
  background-color: transparent;
  color: ${(props) => props.theme.fontColor};
  font-size: 13px;
`;

const Form = styled.form`
  width: 100%;
  margin-left: 5px;
  position: relative;
`;

const Input = styled.input`
  width: 97%;
  background-color: ${(props) => props.theme.bgColor};
  padding: 13px 12px;
  padding-right: 65px;
  border-radius: 5px;
  font-size: 13px;
  color: ${(props) => props.theme.fontColor};
  &::placeholder {
    font-size: 13px;
  }
`;

const EditingCommentButton = styled.button`
  position: absolute;
  top: 8px;
  right: 25px;
  border: none;
  color: white;
  text-align: center;
  padding: 5px 8px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${(props) =>
    props.disabled ? props.theme.inactiveColor : props.theme.activeColor};
`;

const CommentContent = ({
  photoId,
  id,
  payload,
  user,
  isMine,
}: CommentContentProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm<FormData>({ mode: "onChange", defaultValues: { payload } });
  const [deleteCommentMutation] = useDeleteCommentMutation({
    variables: { id: id },
    update: (cache, { data }) => {
      if (data?.deleteComment.ok === false) {
        return;
      }
      cache.evict({ id: `Comment:${id}` });
      cache.gc();
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          totalComments: (totalComments: number) => totalComments - 1,
        },
      });
    },
  });
  const [editCommentMutation] = useEditCommentMutation({
    update: (cache, { data }) => {
      if (data?.editComment.ok === false) {
        return;
      }
      const { payload } = getValues();
      cache.modify({
        id: `Comment:${id}`,
        fields: {
          payload: () => payload,
        },
      });
      setIsEditing(false);
    },
  });

  const onValid = (): void => {
    const { payload } = getValues();
    editCommentMutation({ variables: { id: id, payload } });
  };

  const handleEditComment = (): void => {
    setIsEditing((isEditing: boolean) => {
      return !isEditing;
    });
  };

  const handleDeleteComment = (): void => {
    deleteCommentMutation();
  };

  return (
    <div>
      {isMine === true && isEditing === true ? (
        <Container>
          <Link to={`/users/${user.username}`}>
            <Username username={user.username} size="15px" />
          </Link>
          <Form onSubmit={handleSubmit(onValid)}>
            <Input
              {...register("payload", {
                required: "コメントを入力して下さい。",
                minLength: 1,
                maxLength: 70,
              })}
              minLength={1}
              maxLength={70}
              type="text"
              placeholder="コメントを追加..."
            />
            <EditingCommentButton disabled={!isValid} type="submit">
              수정
            </EditingCommentButton>
          </Form>
          <Buttons>
            <EditCommentButton onClick={handleEditComment} type="button">
              <FontAwesomeIcon icon={faPencil} />
            </EditCommentButton>
            <DeleteCommentButton onClick={handleDeleteComment} type="button">
              ✕
            </DeleteCommentButton>
          </Buttons>
        </Container>
      ) : (
        <Container>
          <Link to={`/users/${user.username}`}>
            <Username username={user.username} size="15px" />
          </Link>
          <Text>
            {payload.length < 50 ? payload : `${payload.slice(0, 38)}...`}
          </Text>
          {isMine === true && (
            <Buttons>
              <EditCommentButton onClick={handleEditComment} type="button">
                <FontAwesomeIcon icon={faPencil} />
              </EditCommentButton>
              <DeleteCommentButton onClick={handleDeleteComment} type="button">
                ✕
              </DeleteCommentButton>
            </Buttons>
          )}
        </Container>
      )}
    </div>
  );
};

export default CommentContent;
