import { ApolloCache } from "@apollo/client";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useToggleLikeMutation } from "../../generated/graphql";
import Avatar from "../auth/Avatar";
import { FatText } from "../shared";
import Comments from "./Comments";

const PhotoContainer = styled.div`
  background-color: white;
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

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  min-width: 100%;
  max-width: 100%;
`;

const PhotoData = styled.div`
  padding: 12px 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

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
  const [toggleLikeMutation] = useToggleLikeMutation({
    variables: {
      id: id ? id : 0,
    },
    update: (cache) => {
      cache.modify({
        id: `Photo:${id}`,
        fields: {
          isLiked: (prev) => !prev,
          likes: (prev) => (isLiked ? prev - 1 : prev + 1),
        },
      });
    },
  });

  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Link to={`/users/${user?.username}`}>
          <Avatar lg url={user?.avatar} />
        </Link>
        <Link to={`/users/${user?.username}`}>
          <Username>{user?.username}</Username>
        </Link>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={() => toggleLikeMutation()}>
              <FontAwesomeIcon
                style={{ color: isLiked ? "tomato" : "inherit" }}
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon size={"2x"} icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon size={"2x"} icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon size={"2x"} icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
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
