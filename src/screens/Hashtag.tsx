import styled from "styled-components";
import PageTitle from "../components/PageTitle";

const Header = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-right: 20px;
  background-color: #2c2c2c;
`;

const HashtagTitle = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;

const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
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

export default function Hashtag() {
  return (
    <div>
      <PageTitle title={""} />
      <Header>
        <Avatar src={""} />
        <Row>
          <HashtagTitle>{"HashtagTitle"}</HashtagTitle>
        </Row>
      </Header>
      <Grid>
        {/* {data?.seeProfile?.photos?.map((photo) => (
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
        ))} */}
      </Grid>
    </div>
  );
}
