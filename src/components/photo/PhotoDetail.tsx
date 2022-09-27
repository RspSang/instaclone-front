import styled from "styled-components";
import PhotoIcons from "./PhotoIcons";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Link, useNavigate, NavigateFunction } from "react-router-dom";
import {
  useDeleteCommentMutation,
  useDeletePhotoMutation,
  useEditCommentMutation,
  useEditPhotoMutation,
  useSeeCommentsLazyQuery,
  useSeeCommentsQuery,
} from "../../generated/graphql";
import useUser from "../../hooks/useUser";
import Avatar from "../shared/Avatar";
import Username from "../shared/Username";
import Name from "../shared/Name";
import CreatedAt from "../shared/CreatedAt";
import CommentForm from "../comments/CommentForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { ScrollBox } from "../shared/shared";
import Loading from "../shared/Loading";
import TotalLikes from "../shared/TotalLikes";

interface PhotoDetailProps {
  id?: number;
  user?: {
    firstName: string;
    lastName?: string | null;
    username: string;
    avatar?: string | null;
  } | null;
  file?: string;
  isLiked?: boolean;
  likes?: number;
  caption?: string | null;
  comments?: any;
  createdAt?: string;
}

interface FormData {
  payload: string;
}

interface EditPhotoFormData {
  caption: string;
}

interface EditingComment {
  commentId: number | undefined;
  commentText: string;
}

const modalVariants: Variants = {
  start: { opacity: 0, scale: 0.95, translateX: "-50%", translateY: "-50%" },
  end: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const ModalLikeBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalBox = styled(motion.div)`
  max-width: 1700px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95%;
  height: 85%;
  box-sizing: border-box;
  outline: none;
  border-radius: 0 5px 5px 0;
  background-color: ${(props) => props.theme.bgContainerColor};
  overflow: hidden;
  z-index: 120;
`;

const ModalCloseButton = styled.button`
  position: fixed;
  top: 14px;
  right: 14px;
  font-size: 29px;
  font-weight: 100;
  border: none;
  outline: none;
  cursor: pointer;
  z-index: 200;
  color: white;
  background-color: transparent;
`;

const ModalMain = styled(ScrollBox)`
  height: 100%;
`;

const ModalMainContent = styled.div`
  display: flex;
  margin-bottom: 10px;
  height: 100%;
`;

const ModalMainPhoto = styled.div`
  flex: 4;
  max-width: 1300px;
  max-height: 1300px;
  min-height: 450px;
  border-right: 1px solid ${(props) => props.theme.borderColor};
  img {
    width: 100%;
    height: 100%;
  }
`;

const ModalMainInfo = styled.div`
  flex: 1;
  min-width: 400px;
  max-width: 400px;
`;

const ModalMainUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 13px;
`;

const ModalMainUserInfoCaption = styled.div`
  display: flex;
  margin-left: 13px;
  margin-bottom: 0px;
  margin-top: 5px;
  width: 100%;
  a {
  }
  p {
    margin-left: 6px;
    font-weight: 400;
    font-size: 15px;
    width: 230px;
  }
`;

const ModalMainInfoTop = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  padding: 15px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  position: relative;
  a {
    display: flex;
    align-items: center;
  }
`;

const PhotoActionButtons = styled.div`
  position: absolute;
  right: 10px;

  button {
    font-weight: bold;
    border: none;
    background-color: transparent;
    text-align: center;
    padding: 8px;
    cursor: pointer;
    &:first-child {
      color: ${(props) => props.theme.activeColor};
    }
    &:last-child {
      color: ${(props) => props.theme.errorColor};
    }
  }
`;

const ModalMainInfoCenter = styled.div`
  padding: 15px;
  padding-top: 18px;
  height: calc(100% - 245px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
`;

const ModalMainInfoBottom = styled.div`
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const MainUserInfo = styled.div``;

const MainUserAvatar = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const ModalPhotoCommentInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
`;

const ModalUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
  p {
    word-break: break-all;
    line-height: 1.2;
  }
`;

const ModalPhotoComment = styled.div`
  margin-top: 8px;
  display: flex;
  position: relative;
  p {
    word-break: break-all;
  }
`;

const Form = styled.form`
  width: 100%;
  margin-left: 10px;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
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
  right: 8px;
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

const Buttons = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 3px;
  right: 0;
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
  margin-top: 4px;
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

const EditingPhotoForm = styled.form`
  width: 100%;
  margin-left: 5px;
  position: relative;
`;

const EditingPhotoInput = styled.input`
  width: 70%;
  line-height: normal;
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

const EditingPhotoButton = styled.button`
  position: absolute;
  bottom: 8px;
  right: 15px;
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

const PhotoDetail = ({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  createdAt,
}: PhotoDetailProps) => {
  const { data: userData } = useUser();
  const navigate: NavigateFunction = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [editingComment, setEditingComment] = useState<EditingComment>({
    commentId: undefined,
    commentText: "",
  });
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { isValid },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: { payload: editingComment.commentText },
  });
  const {
    register: editPhotoRegister,
    handleSubmit: editPhotoHandleSubmit,
    getValues: editPhotoGetValues,
  } = useForm<EditPhotoFormData>({
    mode: "onChange",
    defaultValues: { caption: caption as string },
  });
  const { data: seeCommentsData } = useSeeCommentsQuery({
    variables: { photoId: id as number, offset: 0 },
  });
  const [seeCommentsLazyQuery] = useSeeCommentsLazyQuery();
  const [deleteCommentMutation, { loading: deleteCommentLoading }] =
    useDeleteCommentMutation({
      update: (cache, { data }) => {
        if (deleteCommentLoading) {
          return;
        }
        cache.evict({ id: `Comment:${data?.deleteComment.id}` });
        cache.gc();
        cache.modify({
          id: `Photo:${id}`,
          fields: {
            commentNumber: (totalComments: number) => totalComments - 1,
          },
        });
        seeCommentsLazyQuery({
          variables: { photoId: id as number, offset: 0 },
        });
      },
    });
  const [editCommentMutation] = useEditCommentMutation({
    update: (cache, { data }) => {
      if (!data?.editComment.ok) {
        return;
      }
      const { payload } = getValues();
      cache.modify({
        id: `Comment:${data?.editComment.id}`,
        fields: {
          payload: () => payload,
        },
      });
      setIsEditing(false);
      seeCommentsLazyQuery({ variables: { photoId: id as number, offset: 0 } });
    },
  });
  const [deletePhotoMutation, { loading: deletePhotoLoading }] =
    useDeletePhotoMutation({
      update: (cache, { data }) => {
        if (deletePhotoLoading) {
          return;
        }
        cache.evict({ id: `Photo:${data?.deletePhoto.id}` });
        cache.gc();
        cache.modify({
          id: `User:${userData?.me?.id}`,
          fields: {
            totalPhotos: (totalPhotos: number) => totalPhotos - 1,
          },
        });
        handleCloseModal();
      },
    });
  const [editPhotoMutation, { loading: editPhotoLoading }] =
    useEditPhotoMutation({
      update: (cache, { data }) => {
        if (!data?.editPhoto.ok) {
          return;
        }
        const { caption } = editPhotoGetValues();
        cache.modify({
          id: `Photo:${data?.editPhoto.id}`,
          fields: {
            caption: () => caption,
          },
        });
        setIsEditingPhoto(false);
      },
    });

  const handleEditPhoto = (): void => {
    setIsEditingPhoto((isEditingPhoto: boolean) => !isEditingPhoto);
  };

  const handleDeletePhoto = (): void => {
    if (deletePhotoLoading === true) {
      return;
    }
    deletePhotoMutation({ variables: { id: id as number } });
  };

  const onEditPhotoValid = (): void => {
    if (editPhotoLoading === true) {
      return;
    }
    const { caption } = editPhotoGetValues();
    if (caption === "") {
      return;
    }
    editPhotoMutation({ variables: { id: id as number, caption } });
  };

  const onValid = (): void => {
    const { payload } = getValues();
    editCommentMutation({
      variables: { id: editingComment.commentId as number, payload },
    });
  };

  const handleEditComment = (
    commentId: number | undefined,
    commentText: string
  ): void => {
    setValue("payload", commentText);
    setIsEditing((isEditing: boolean) => !isEditing);
    setEditingComment({ commentId, commentText });
  };

  const handleDeleteComment = (id: number) => {
    deleteCommentMutation({ variables: { id } });
  };

  const handleCloseModal = (): void => {
    navigate(-1);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <ModalLikeBackground onClick={handleCloseModal}></ModalLikeBackground>
      <AnimatePresence>
        <ModalCloseButton key={"ModalCloseButton"} onClick={handleCloseModal}>
          ✕
        </ModalCloseButton>
        <ModalBox
          variants={modalVariants}
          initial="start"
          animate="end"
          exit="exit"
        >
          <ModalMain>
            <ModalMainContent>
              <ModalMainPhoto>
                <img src={file} alt="" />
              </ModalMainPhoto>
              <ModalMainInfo>
                <ModalMainInfoTop>
                  <Link to={`/users/${user?.username}`}>
                    <Avatar size="32px" avatarUrl={user?.avatar} />
                    <ModalMainUserInfo>
                      <Username size="15px" username={user?.username} />
                      <Name
                        size="13px"
                        name={user?.firstName + " " + user?.lastName}
                      />
                    </ModalMainUserInfo>
                  </Link>
                  {user?.username === userData?.me?.username && (
                    <PhotoActionButtons>
                      <button type="button" onClick={handleEditPhoto}>
                        編集
                      </button>
                      <button type="button" onClick={handleDeletePhoto}>
                        {deletePhotoLoading === true ? (
                          <Loading size="14px" />
                        ) : (
                          "削除"
                        )}
                      </button>
                    </PhotoActionButtons>
                  )}
                </ModalMainInfoTop>
                <ModalMainInfoCenter>
                  <MainUserInfo>
                    <MainUserAvatar>
                      <Link to={`/users/${user?.username}`}>
                        <Avatar size="32px" avatarUrl={user?.avatar} />
                      </Link>
                      <ModalUserInfo>
                        <ModalMainUserInfoCaption>
                          <Link to={`/users/${user?.username}`}>
                            <Username size="15px" username={user?.username} />
                          </Link>
                          {isEditingPhoto === true ? (
                            <EditingPhotoForm
                              onSubmit={editPhotoHandleSubmit(onEditPhotoValid)}
                            >
                              <EditingPhotoInput
                                {...editPhotoRegister("caption", {
                                  required: true,
                                  maxLength: 300,
                                })}
                                type="textarea"
                                placeholder="キャップションを入力"
                                required
                                maxLength={100}
                              />
                              <EditingPhotoButton
                                onClick={editPhotoHandleSubmit(
                                  onEditPhotoValid
                                )}
                                type="submit"
                              >
                                {editPhotoLoading === true ? (
                                  <Loading size="16px" />
                                ) : (
                                  "編集"
                                )}
                              </EditingPhotoButton>
                            </EditingPhotoForm>
                          ) : (
                            <p>{caption}</p>
                          )}
                        </ModalMainUserInfoCaption>
                        <CreatedAt createdAt={createdAt} />
                      </ModalUserInfo>
                    </MainUserAvatar>
                    {seeCommentsData?.seeComments.comments?.map((comment) => (
                      <ModalPhotoComment key={comment?.id}>
                        <Link to={`/users/${comment?.user.username}`}>
                          <Avatar
                            size="32px"
                            avatarUrl={comment?.user.avatar}
                          />
                        </Link>
                        <ModalPhotoCommentInfo>
                          <ModalMainUserInfoCaption>
                            <Link to={`/users/${comment?.user.username}`}>
                              <Username
                                size="15px"
                                username={comment?.user?.username}
                              />
                            </Link>
                            {comment?.user.isMe &&
                            isEditing === true &&
                            editingComment.commentId === comment.id ? null : (
                              <p>{comment?.payload}</p>
                            )}
                            {comment?.user.isMe &&
                              isEditing === true &&
                              editingComment.commentId === comment.id && (
                                <Form onSubmit={handleSubmit(onValid)}>
                                  <Input
                                    {...register("payload", {
                                      required: true,
                                      minLength: 1,
                                      maxLength: 70,
                                    })}
                                    minLength={1}
                                    maxLength={70}
                                    type="text"
                                    placeholder="コメントを追加"
                                  />
                                  <EditingCommentButton
                                    disabled={!isValid}
                                    type="submit"
                                  >
                                    編集
                                  </EditingCommentButton>
                                </Form>
                              )}
                            {comment?.user.isMe && (
                              <Buttons>
                                {!isEditing && (
                                  <>
                                    <EditCommentButton
                                      onClick={() =>
                                        handleEditComment(
                                          comment?.id,
                                          comment.payload
                                        )
                                      }
                                      type="button"
                                    >
                                      <FontAwesomeIcon icon={faPencil} />
                                    </EditCommentButton>
                                    <DeleteCommentButton
                                      onClick={() =>
                                        handleDeleteComment(comment?.id)
                                      }
                                      type="button"
                                    >
                                      ✕
                                    </DeleteCommentButton>
                                  </>
                                )}
                              </Buttons>
                            )}
                          </ModalMainUserInfoCaption>
                          <CreatedAt createdAt={comment?.createdAt} />
                        </ModalPhotoCommentInfo>
                      </ModalPhotoComment>
                    ))}
                  </MainUserInfo>
                </ModalMainInfoCenter>
                <ModalMainInfoBottom>
                  <PhotoIcons id={id} isLiked={isLiked} />
                  <TotalLikes photoId={id} likes={likes} />
                  <CreatedAt createdAt={createdAt} />
                  <CommentForm
                    photoId={id}
                    userData={userData}
                    position="top"
                  />
                </ModalMainInfoBottom>
              </ModalMainInfo>
            </ModalMainContent>
          </ModalMain>
        </ModalBox>
      </AnimatePresence>
    </>
  );
};

export default PhotoDetail;
