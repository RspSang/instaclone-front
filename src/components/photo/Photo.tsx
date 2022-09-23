import React from "react";
import styled from "styled-components";
import PhotoIcons from "./PhotoIcons";
import PhotoDetail from "./PhotoDetail";
import { AnimatePresence } from "framer-motion";
import {
  Link,
  useMatch,
  PathMatch,
  useNavigate,
  NavigateFunction,
} from "react-router-dom";
import PhotoAuthor from "./PhotoAuthor";
import PhotoImage from "./PhotoImage";
import TotalLikes from "../shared/TotalLikes";
import Username from "../shared/Username";
import CreatedAt from "../shared/CreatedAt";
import CommentForm from "../comments/CommentForm";
import CommentsContainer from "../comments/CommentsContainer";
import TotalComments from "../shared/TotalComments";

interface PhotoContainerProps {
  id?: number;
  user?: {
    username: string;
    firstName: string;
    lastName?: string | null;
    avatar?: string | null;
  } | null;
  file?: string;
  isLiked?: boolean;
  likes?: number;
  commentNumber?: number;
  caption?: string | null;
  comments?: any;
  createdAt?: string;
}

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgContainerColor};
  margin-bottom: 20px;
`;

const CaptionContainer = styled.div`
  padding: 12px 15px;
  padding-top: 5px;
  padding-bottom: 10px;
  overflow: hidden;
`;

const Caption = styled.span`
  margin-left: 5px;
  line-height: 1.2;
  a {
    color: ${(props) => props.theme.hashtagColor};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const PhotoContainer = ({
  id,
  user,
  file,
  isLiked,
  likes,
  commentNumber,
  caption,
  comments,
  createdAt,
}: PhotoContainerProps) => {
  const navigate: NavigateFunction = useNavigate();
  const photoPathMath: PathMatch<"id"> | null = useMatch("/photos/:id");

  const handleOpenPhotoDetail = (id: number | undefined): void => {
    navigate(`/photos/${id}`);
  };

  return (
    <Container>
      <AnimatePresence>
        {photoPathMath && photoPathMath.params.id === String(id) && (
          <PhotoDetail
            id={id}
            user={user}
            file={file}
            isLiked={isLiked}
            likes={likes}
            caption={caption}
            createdAt={createdAt}
          />
        )}
      </AnimatePresence>
      <PhotoAuthor
        name={user?.firstName + " " + user?.lastName}
        username={user?.username}
        avatarUrl={user?.avatar}
      />
      <PhotoImage
        file={file}
        handleSeePhotoDetail={() => handleOpenPhotoDetail(id)}
      />
      <PhotoIcons
        id={id}
        isLiked={isLiked}
        handleSeePhotoDetail={() => handleOpenPhotoDetail(id)}
      />
      <TotalLikes photoId={id} likes={likes} />
      <CaptionContainer>
        <Link to={`/users/${user?.username}`}>
          <Username username={user?.username} size="15px" />
        </Link>
        <Caption>
          {caption?.split(" ").map((word: string, index: number) =>
            /#[a-zA-Z0-9가-힇ㄱ-ㅎㅏ-ㅣぁ-ゔァ-ヴー々〆〤一-龥\w]+/g.test(word) === true ? (
              <Link key={index} to={`/hashtags/${word.replace("#", "")}`}>
                {word}{" "}
              </Link>
            ) : /@[a-zA-Z0-9가-힇ㄱ-ㅎㅏ-ㅣぁ-ゔァ-ヴー々〆〤一-龥\w]+/g.test(word) === true ? (
              <Link key={index} to={`/users/${word.replace("@", "")}`}>
                {word}{" "}
              </Link>
            ) : (
              <React.Fragment key={index}>{word} </React.Fragment>
            )
          )}
        </Caption>
      </CaptionContainer>
      <TotalComments
        commentNumber={commentNumber}
        handleOpenPhotoDetail={() => handleOpenPhotoDetail(id)}
      />
      <CommentsContainer photoId={id} comments={comments} />
      <CreatedAt createdAt={createdAt} />
      <CommentForm photoId={id} position="bottom" />
    </Container>
  );
};

export default PhotoContainer;
