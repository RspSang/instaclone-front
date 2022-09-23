import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PageTitle from "../components/shared/PageTitle";
import { useSeeHashtagQuery } from "../generated/graphql";

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-right: 20px;
  background-color: #2c2c2c;
`;

const HashtagTitle = styled.div`
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 0.7rem;
`;

const HashtagCount = styled.div`
  font-size: 1.2rem;
  color: ${(props) => props.theme.fontColor};
`;

const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div<{ bg?: string }>`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  position: relative;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

export default function Hashtag() {
  const { hashtag } = useParams();
  const { data, loading } = useSeeHashtagQuery({
    variables: { hashtag: "#" + hashtag!, offset: 0 },
  });
  return (
    <div>
      <PageTitle
        title={loading ? "ロード中" : `${data?.seeHashtag?.hashtag}`}
      />
      <Header>
        <Avatar
          src={
            data?.seeHashtag?.photos && data?.seeHashtag?.photos?.length > 0
              ? data?.seeHashtag?.photos[0]?.file
              : "/images/basic_user.jpeg"
          }
        />
        <Row>
          <HashtagTitle>{"#" + hashtag}</HashtagTitle>
          <HashtagCount>投稿 {data?.seeHashtag?.totalPhotos} 件</HashtagCount>
        </Row>
      </Header>
      <Grid>
        {data?.seeHashtag?.photos?.map((photo) => (
          <Photo key={photo?.id} bg={photo?.file}>
            <Icons>
              <Icon>
                <FontAwesomeIcon icon={faHeart} />
                {photo?.likes}
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faComment} />
                {photo?.commentNumber}
              </Icon>
            </Icons>
          </Photo>
        ))}
      </Grid>
    </div>
  );
}
