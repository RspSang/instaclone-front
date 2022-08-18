import { gql } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { useCreateCommentMutation } from "../../generated/graphql";
import useUser from "../../hooks/useUser";
import Comment from "./Comment";
import { IComment } from "./Photo";

const CommentsContainer = styled.div`
  margin-top: 20px;
`;
const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 10px;
`;

interface CommentsProps {
  photoId?: number;
  author?: string;
  caption?: string | null;
  commentNumber?: number;
  comments?: (IComment | null)[] | null;
}

interface FormData {
  photoId: number;
  payload: string;
}

function Comments({
  photoId,
  author,
  caption,
  commentNumber,
  comments,
}: CommentsProps) {
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, getValues } = useForm<FormData>({});
  const [createComment, { loading }] = useCreateCommentMutation();
  const onValid: SubmitHandler<FormData> = ({ payload }) => {
    if (loading) {
      return;
    }
    if (photoId) {
      createComment({
        variables: { photoId, payload },
        update: (cache, result) => {
          if (!result?.data?.createComment) return;
          const { payload } = getValues();
          setValue("payload", "");

          const {
            data: {
              createComment: { ok, id },
            },
          } = result;
          if (ok && userData.me) {
            const newComment = {
              __typename: "Comment",
              createdAt: Date.now() + "",
              id,
              isMine: true,
              payload,
              user: {
                ...userData.me,
              },
            };
            const newCacheComment = cache.writeFragment({
              data: newComment,
              fragment: gql`
                fragment BSName on Comment {
                  id
                  createdAt
                  isMine
                  payload
                  user {
                    username
                    avatar
                  }
                }
              `,
            });
            cache.modify({
              id: `Photo:${photoId}`,
              fields: {
                comments(prev) {
                  return [...prev, newCacheComment];
                },
                commentNumber(prev) {
                  return prev + 1;
                },
              },
            });
          }
        },
      });
    }
  };
  return (
    <CommentsContainer>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment?.id}
          author={comment?.user.username}
          payload={comment?.payload}
        />
      ))}
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("payload", { required: true })}
            type="text"
            placeholder="Write a comment..."
          />
        </form>
      </div>
    </CommentsContainer>
  );
}

export default Comments;
