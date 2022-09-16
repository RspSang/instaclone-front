import gql from "graphql-tag";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Reference } from "@apollo/client";
import { MeQuery, useCreateCommentMutation } from "../../generated/graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import useUser from "../../hooks/useUser";

interface CommentFormProps {
  photoId?: number;
  position: string;
  userData?: MeQuery;
}

interface FormData {
  payload: string;
}

const Form = styled.form`
  border-top: 1px solid ${(props) => props.theme.borderColor};
  padding: 12px 15px;
  display: flex;
  margin-top: 20px;
`;

const Emoji = styled.div`
  position: relative;

  svg {
    font-size: 25px;
    cursor: pointer;
  }
`;

const Input = styled.input`
  padding-left: 10px;
  margin-right: auto;
  font-size: 14px;
  width: 80%;
  border-radius: 3px;
  background-color: ${(props) => props.theme.bgContainerColor};
  color: ${(props) => props.theme.fontColor};

  &::placeholder {
    font-size: 14px;
    color: ${(props) => props.theme.grayColor};
  }
`;

const Button = styled.button`
  color: ${(props) =>
    props.disabled === true
      ? props.theme.inactiveColor
      : props.theme.activeColor};
  font-size: 14px;
  font-weight: bold;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
`;

const PickerBox = styled.div<{ position: string }>`
  position: absolute;
  top: ${(props) => (props.position === "bottom" ? "30px" : "-330px")};
  left: 0px;
`;

const CommentForm = ({ photoId, position }: CommentFormProps) => {
  const { data: userData } = useUser();
  const [isEmoji, setIsEmoji] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { isValid },
  } = useForm<FormData>({ mode: "onChange", defaultValues: { payload: "" } });
  const [createCommentMutation, { loading: createCommentLoading }] =
    useCreateCommentMutation({
      update: (cache, { data }) => {
        if (createCommentLoading) {
          return;
        }
        const { payload } = getValues();
        setValue("payload", "");

        const commentReference: Reference | undefined = cache.writeFragment({
          fragment: gql`
            fragment CommentName on Comment {
              id
              payload
              user {
                username
                avatar
              }
              isMine
              createdAt
            }
          `,
          data: {
            __typename: "Comment",
            id: data?.createComment?.id,
            payload,
            user: {
              ...userData?.me,
            },
            isMine: true,
            createdAt: String(Date.now()),
          },
        });
        cache.modify({
          id: `Photo:${photoId}`,
          fields: {
            comments: (comments) => [...comments, commentReference],
            commentNumber: (totalComments: number): number => totalComments + 1,
          },
        });
        cache.modify({
          id: "ROOT_QUERY",
          fields: {
            seeComments(prev) {},
          },
        });
      },
    });

  const onValid = (): void => {
    if (photoId) {
      const { payload } = getValues();
      createCommentMutation({
        variables: { photoId: photoId as number, payload },
      });
      setIsEmoji(false);
    }
  };

  const handleShowEmoji = (): void => {
    setIsEmoji((isEmoji: boolean) => !isEmoji);
  };

  const onEmojiClick = (event: React.MouseEvent, emojiObject: any): void => {
    const { payload } = getValues();
    setValue("payload", payload + emojiObject.emoji);
    setIsEmoji(false);
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Emoji>
        <FontAwesomeIcon icon={faSmile} onClick={handleShowEmoji} />
        {isEmoji === true && (
          <PickerBox position={position}>
            <Picker onEmojiClick={onEmojiClick} disableSearchBar={true} />
          </PickerBox>
        )}
      </Emoji>
      <Input
        {...register("payload", {
          required: true,
          minLength: 1,
          maxLength: 70,
        })}
        type="text"
        minLength={1}
        maxLength={70}
        placeholder="コメントを追加"
      />
      <Button onClick={handleSubmit(onValid)} type="submit" disabled={!isValid}>
        게시
      </Button>
    </Form>
  );
};

export default CommentForm;
