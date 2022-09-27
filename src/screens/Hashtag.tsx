import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { useSeeHashtagQuery } from "../generated/graphql";
import {
  useParams,
  NavigateFunction,
  useNavigate,
  PathMatch,
  useMatch,
} from "react-router";
import MainLayout from "../components/shared/MainLayout";
import PageTitle from "../components/shared/PageTitle";
import Avatar from "../components/shared/Avatar";
import PhotoDetail from "../components/photo/PhotoDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";

type HashtagParams = {
  hashtag: string;
};

const Container = styled.section`
  margin-top: 58px;
`;

const HashtagHeader = styled.div`
  padding: 30px 0px;
  padding-bottom: 40px;
  display: flex;
`;

const HashtagImage = styled.div`
  flex: 1;
  display: flex;

  img {
    cursor: pointer;
  }
`;

const HashtagInfo = styled.div`
  flex: 3.7;
  padding-top: 15px;
`;

const HashtagName = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-weight: 300;

  span {
    font-size: 30px;
  }
`;

const HashtagPost = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 400;

  span {
    cursor: pointer;

    strong {
      font-weight: 700;
    }
  }
  span:first-child {
    cursor: auto;
  }
`;

const HashtagMain = styled.div`
  border-top: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  justify-content: flex-start;
  max-width: 940px;
  width: 940px;
  flex-wrap: wrap;
  gap: 20px;
  padding: 30px 0px;
`;

const HashtagPhoto = styled.div`
  position: relative;
  cursor: pointer;
`;

const HashtagPhotoImage = styled.img`
  width: 300px;
  height: 300px;
  vertical-align: top;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  &:hover {
    opacity: 1;
  }
`;

const HashtagPhotoIcons = styled.div`
  display: flex;

  span {
    font-weight: bold;
    font-size: 18px;
    display: flex;
    align-items: center;
    margin-right: 30px;
    font-size: 18px;

    &:last-child {
      margin-right: 0px;
    }

    svg {
      margin-right: 10px;
    }
  }
`;

const Hashtag = () => {
  const { hashtag } = useParams<HashtagParams>();
  const navigate: NavigateFunction = useNavigate();
  const photoPathMath: PathMatch<"id"> | null = useMatch(
    "/hashtags/:hashtag/photos/:id"
  );

  const { data: seeHashtagData, loading: seeHashtagLoading } =
    useSeeHashtagQuery({ variables: { hashtag: `#${hashtag}` } });

  const handleOpenPhotoDetail = (id: number | undefined): void => {
    navigate(`/hashtags/${hashtag}/photos/${id}`);
  };

  return (
    <MainLayout>
      <PageTitle title={`#${hashtag} ハッシュタグ`} />
      {!seeHashtagLoading ? (
        <Container>
          <HashtagHeader>
            <HashtagImage>
              <Avatar
                avatarUrl={
                  (seeHashtagData?.seeHashtag?.photos &&
                    seeHashtagData?.seeHashtag?.photos[0]?.file) ||
                  "/images/basic_hashtag.png"
                }
                size="155px"
              />
            </HashtagImage>
            <HashtagInfo>
              <HashtagName>
                <span>#{hashtag}</span>
              </HashtagName>
              <HashtagPost>
                <span>
                  投稿{" "}
                  <strong>{seeHashtagData?.seeHashtag?.totalPhotos}</strong>
                </span>
              </HashtagPost>
            </HashtagInfo>
          </HashtagHeader>
          <HashtagMain>
            {seeHashtagData?.seeHashtag?.photos &&
              seeHashtagData?.seeHashtag?.photos?.map((photo) => (
                <HashtagPhoto key={photo?.id}>
                  {photoPathMath &&
                    photoPathMath.params.id === String(photo?.id) && (
                      <AnimatePresence>
                        <PhotoDetail
                          id={photo?.id}
                          user={photo?.user}
                          file={photo?.file}
                          isLiked={photo?.isLiked}
                          likes={photo?.likes}
                          caption={photo?.caption}
                          createdAt={photo?.createdAt}
                        />
                      </AnimatePresence>
                    )}
                  <Overlay onClick={() => handleOpenPhotoDetail(photo?.id)}>
                    <HashtagPhotoIcons>
                      <span>
                        <FontAwesomeIcon icon={faHeart} />
                        {photo?.likes}
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faComment} />
                        {photo?.commentNumber}
                      </span>
                    </HashtagPhotoIcons>
                  </Overlay>
                  <HashtagPhotoImage src={photo?.file} alt="" />
                </HashtagPhoto>
              ))}
          </HashtagMain>
        </Container>
      ) : null}
    </MainLayout>
  );
};

export default Hashtag;
