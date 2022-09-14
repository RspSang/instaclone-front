import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { keyframes } from "styled-components";
import { useRef } from "react";
import { SEE_PHOTO_LIKES } from "../../documents/queries/seePhotoLikes.query";
import {
  useSeePhotoLikesLazyQuery,
  useToggleLikeMutation,
} from "../../generated/graphql";

interface PhotoIconsProps {
  id?: number;
  isLiked?: boolean;
  handleSeePhotoDetail?: () => void;
}

const likeAnimation = keyframes`
  0% {
    opacity:1;
    transform:scale(1);
  }
  15% {
    opacity:0.9;
    transform:scale(1.3);
  }
  30% {
    transform:scale(.95);
  }
  45%, 80% {
    opacity:0.9;
    transform:scale(1);
  }
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 15px;
  padding-bottom: 0;
  font-size: 28px;

  div {
    display: flex;
    svg {
      margin-right: 15px;
      cursor: pointer;
      &:last-child {
        margin-right: 0px;
      }
    }
    &:last-child {
      font-size: 22px;
    }
  }
`;

const LikeButton = styled.span`
  margin-right: 15px;

  &.animation {
    animation-name: ${likeAnimation};
    animation-duration: 1000ms;
    animation-timing-function: ease-in-out;
  }
`;

export default function PhotoIcons({
  id,
  isLiked,
  handleSeePhotoDetail,
}: PhotoIconsProps) {
  const likeButton = useRef<HTMLSpanElement>(null);
  const [seePhotoLikesLazyQuery, { loading: seePhotoLikesLoading }] =
    useSeePhotoLikesLazyQuery();
  const [toggleLikePhotoMutation, { loading: toggleLikePhotoLoading }] =
    useToggleLikeMutation({
      update(cache, { data }) {
        if (toggleLikePhotoLoading) {
          return;
        }
        cache.modify({
          id: `Photo:${id}`,
          fields: {
            isLiked: (isLiked: boolean): boolean => !isLiked,
            likes: (totalLikes: number): number =>
              isLiked === true ? totalLikes - 1 : totalLikes + 1,
          },
        });
      },
      refetchQueries: [{ query: SEE_PHOTO_LIKES, variables: { photoId: id } }],
    });
  const handleToggleLikePhoto = (isLiked: boolean | undefined) => {
    if (toggleLikePhotoLoading || seePhotoLikesLoading) {
      return;
    }
    if (likeButton.current) {
      if (isLiked === false) {
        likeButton.current.classList.add("animation");
      } else if (isLiked === true) {
        likeButton.current.classList.remove("animation");
      }
    }
    toggleLikePhotoMutation({ variables: { id: id as number } });
  };

  return (
    <Icons>
      <div>
        <LikeButton
          ref={likeButton}
          onClick={() => handleToggleLikePhoto(isLiked)}
        >
          <FontAwesomeIcon
            style={{ color: isLiked ? "tomato" : "inherit" }}
            icon={isLiked ? SolidHeart : faHeart}
          />
        </LikeButton>
        <FontAwesomeIcon icon={faComment} onClick={handleSeePhotoDetail} />
        <FontAwesomeIcon icon={faPaperPlane} />
      </div>
      <div>
        <FontAwesomeIcon icon={faBookmark} />
      </div>
    </Icons>
  );
}
