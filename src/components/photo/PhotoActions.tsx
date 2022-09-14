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
import { FatText } from "../shared/shared";

interface PhotoActionsProps {
  id?: number;
  isLiked?: boolean;
  likes?: number;
}

const Actions = styled.div`
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

const Action = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

export default function PhotoActions({
  id,
  isLiked,
  likes,
}: PhotoActionsProps) {
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
    <>
      <Actions>
        <div>
          <Action onClick={() => toggleLikeMutation()}>
            <FontAwesomeIcon
              style={{ color: isLiked ? "tomato" : "inherit" }}
              icon={isLiked ? SolidHeart : faHeart}
            />
          </Action>
          <Action>
            <FontAwesomeIcon size={"2x"} icon={faComment} />
          </Action>
          <Action>
            <FontAwesomeIcon size={"2x"} icon={faPaperPlane} />
          </Action>
        </div>
        <div>
          <FontAwesomeIcon size={"2x"} icon={faBookmark} />
        </div>
      </Actions>
      {likes ? <Likes>いいね！ {likes}件</Likes> : null}
    </>
  );
}
