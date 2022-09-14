import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../shared/Avatar";
import Comments from "../feed/Comments";
import Username from "../shared/Username";
import PhotoActions from "./PhotoActions";

export interface IComment {
  id: number;
  payload: string;
  isMine: boolean;
  createdAt: string;
  user: {
    username: string;
    avatar?: string | null;
  };
}

interface PhotoProps {
  id?: number;
  user?: { username: string; avatar?: string | null } | null;
  file?: string;
  caption?: string | null;
  likes?: number;
  commentNumber?: number;
  comments?: (IComment | null)[] | null;
  createdAt?: string;
  isMine?: boolean;
  isLiked?: boolean;
}

const PhotoContainer = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 60px;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const PhotoFile = styled.img`
  min-width: 100%;
  max-width: 100%;
`;

const PhotoData = styled.div`
  padding: 12px 15px;
`;

function Photo({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments,
}: PhotoProps) {
  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Link to={`/users/${user?.username}`}>
          <Avatar avatarUrl={user?.avatar} size="28px" />
        </Link>
        <Link to={`/users/${user?.username}`}>
          <Username username={user?.username} size="15px" />
        </Link>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions id={id} isLiked={isLiked} likes={likes} />
        <Comments
          photoId={id}
          author={user?.username}
          caption={caption}
          commentNumber={commentNumber}
          comments={comments}
        />
      </PhotoData>
    </PhotoContainer>
  );
}

export default Photo;
