import { gql } from "@apollo/client";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useToggleLikeMutation } from "../../generated/graphql";
import Avatar from "../auth/Avatar";
import { FatText } from "../shared";

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

interface PhotoProps {
  id?: number;
  user?: { username: string; avatar?: string | null } | null;
  file?: string;
  caption?: string | null;
  likes?: number;
  comments?: number;
  createdAt?: string;
  isMine?: boolean;
  isLiked?: boolean;
}

function Photo({ id, user, file, isLiked, likes }: PhotoProps) {
  const [toggleLikeMutation, { loading }] = useToggleLikeMutation();

  const handleToggleLike = () => {
    if (loading) return;
    if (id) {
      toggleLikeMutation({
        variables: { id },
        update: (caches, result: any) => {
          const {
            data: {
              toggleLike: { ok },
            },
          } = result;
          if (ok) {
            const fragmentId = `Photo:${id}`;
            const fragment = gql`
              fragment BSName on Photo {
                isLiked
                likes
              }
            `;
            const result: any = caches.readFragment({
              id: fragmentId,
              fragment,
            });
            if ("isLiked" in result && "likes" in result) {
              const { isLiked: cacheIsLiked, likes: cacheLikes } = result;
              caches.writeFragment({
                id: fragmentId,
                fragment,
                data: {
                  isLiked: !cacheIsLiked,
                  likes: cacheIsLiked ? cacheLikes - 1 : cacheLikes + 1,
                },
              });
            }
          }
        },
      });
    }
  };

  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Avatar lg url={user?.avatar} />
        <Username>{user?.username}</Username>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={handleToggleLike}>
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
      </PhotoData>
    </PhotoContainer>
  );
}

export default Photo;