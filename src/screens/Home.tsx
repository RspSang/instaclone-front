import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  useFollowUserMutation,
  useSeeFeedQuery,
  useSeeFollowingQuery,
  useSeeRecommendPhotosQuery,
  useSeeRecommendUsersQuery,
  useUnfollowUserMutation,
} from "../generated/graphql";
import { SEE_FOLLOWERS } from "../documents/queries/seeFollowers.query";
import { SEE_FOLLOWING } from "../documents/queries/seeFollowing.query";
import { useEffect } from "react";
import useUser from "../hooks/useUser";
import Avatar from "../components/shared/Avatar";
import PhotoContainer from "../components/photo/Photo";
import Username from "../components/shared/Username";
import Name from "../components/shared/Name";
import PageTitle from "../components/shared/PageTitle";
import FeedLayout from "../components/shared/FeedLayout";
import Info from "../components/shared/Info";

const Container = styled.section`
  background-color: ${(props) => props.theme.bgColor};
  position: relative;
  display: flex;
  margin-top: 90px;
  margin-bottom: 250px;
`;

const LeftContainer = styled.div`
  max-width: 620px;
  width: 100%;
  height: 300px;
`;

const RightContainer = styled.div`
  max-width: 280px;
  width: 100%;
  margin-top: 15px;
  box-sizing: border-box;
  margin-left: 30px;
`;

const AsideContent = styled.div`
  position: fixed;
  max-width: 280px;
`;

const AsideHeader = styled.div`
  display: flex;
  align-items: center;
`;

const AsideMain = styled.div``;

const AsideMainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  h1 {
    font-size: 14px;
    color: ${(props) => props.theme.grayColor};
    font-weight: bold;
  }
  a {
    font-size: 12px;
  }
`;

const AsideMainInner = styled.div`
  margin-top: 20px;
  margin-bottom: 35px;
`;

const RecommandContent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-left: 13px;
  margin-right: auto;
`;

const FollowButton = styled.button<{ isFollowing: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  font-size: 12px;
  font-weight: bold;
  background-color: transparent;
  color: ${(props) =>
    props.isFollowing === true
      ? props.theme.fontColor
      : props.theme.activeColor};
`;

const FollowingContainer = styled.div`
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgContainerColor};
  .slick-prev {
    z-index: 50;
    &::before {
      position: relative;
      left: 15px;
      color: gray;
    }
  }
  .slick-next {
    z-index: 50;
    &::before {
      position: relative;
      right: 15px;
      color: gray;
    }
  }
  .slick-slide {
    max-width: 65px;
    margin-right: 15px;
  }
  a {
    max-width: 65px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 17px;
    text-align: center;
    &:last-child {
      margin-right: 0;
    }
    h1 {
      margin-top: 7px;
      font-size: 14px;
    }
  }
`;

const Home = () => {
  let followUsername: string | undefined;
  let unfollowUsername: string | undefined;
  const { data: userData } = useUser();
  const { data: seeFeedData } = useSeeFeedQuery({ variables: { offset: 0 } });
  const { data: seeFollowingData } = useSeeFollowingQuery({
    variables: { username: userData?.me?.username || "", page: 1 },
  });
  const { data: seeRecommendUsersData } = useSeeRecommendUsersQuery();
  const { data: seeRecommendPhotosData } = useSeeRecommendPhotosQuery();
  const [followUserMutation, { loading: followUserLoading }] =
    useFollowUserMutation({
      update: (cache, { data }) => {
        if (followUserLoading) {
          return;
        }
        followUsername = data?.followUser?.user?.username;
        cache.modify({
          id: `User:${data?.followUser?.user?.username}`,
          fields: {
            isFollowing: (isFollowing: boolean) => true,
            totalFollowers: (totalFollowers: number) => totalFollowers + 1,
          },
        });
        cache.modify({
          id: `User:${userData?.me?.username}`,
          fields: {
            totalFollowing: (totalFollowing: number) => totalFollowing + 1,
          },
        });
      },
      refetchQueries: [
        {
          query: SEE_FOLLOWERS,
          variables: { username: followUsername as string, page: 1 },
        },
        {
          query: SEE_FOLLOWING,
          variables: { username: userData?.me?.username as string, page: 1 },
        },
      ],
    });
  const [unfollowUserMutation, { loading: unfollowUserLoading }] =
    useUnfollowUserMutation({
      update: (cache, { data }) => {
        if (unfollowUserLoading) {
          return;
        }
        unfollowUsername = data?.unfollowUser?.user?.username;
        cache.modify({
          id: `User:${data?.unfollowUser?.user?.username}`,
          fields: {
            isFollowing: (isFollowing: boolean) => false,
            totalFollowers: (totalFollowers: number) => totalFollowers - 1,
          },
        });
        cache.modify({
          id: `User:${userData?.me?.username}`,
          fields: {
            totalFollowing: (totalFollowing: number) => totalFollowing - 1,
          },
        });
      },
      refetchQueries: [
        {
          query: SEE_FOLLOWERS,
          variables: { username: unfollowUsername as string, page: 1 },
        },
        {
          query: SEE_FOLLOWING,
          variables: { username: userData?.me?.username as string, page: 1 },
        },
      ],
    });
  const sliderSettings = {
    infinite: false,
    speed: 300,
    slidesToShow:
      (seeFollowingData?.seeFollowing.following?.length as number) < 7
        ? seeFollowingData?.seeFollowing.following?.length
        : 7,
    slidesToScroll: 2,
  };

  const handleToggleFollow = (
    isFollowing: boolean | undefined,
    username: string | undefined
  ): void => {
    if (isFollowing === false) {
      followUserMutation({ variables: { username: username as string } });
    } else if (isFollowing === true) {
      unfollowUserMutation({ variables: { username: username as string } });
    }
  };

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  return (
    <FeedLayout>
      <Container>
        <PageTitle title="홈" />
        <LeftContainer>
          {seeFollowingData?.seeFollowing.following === null ||
          seeFollowingData?.seeFollowing.following?.length === 0 ? null : (
            <FollowingContainer>
              <Slider {...sliderSettings}>
                {seeFollowingData?.seeFollowing?.following?.map((following) => (
                  <Link
                    key={following?.id}
                    to={`/users/${following?.username}`}
                  >
                    <Avatar size="65px" avatarUrl={following?.avatar} />
                    <h1>{following?.username}</h1>
                  </Link>
                ))}
              </Slider>
            </FollowingContainer>
          )}
          {seeFeedData?.seeFeed?.map((photo) => (
            <PhotoContainer key={photo?.id} {...photo} />
          ))}
          {seeRecommendPhotosData?.seeRecommendPhotos.photos?.map((photo) => (
            <PhotoContainer key={photo?.id} {...photo} />
          ))}
          <br />
        </LeftContainer>
        <RightContainer>
          <AsideContent>
            <AsideHeader>
              <Link to={`/users/${userData?.me?.username}`}>
                <Avatar size="55px" avatarUrl={userData?.me?.avatar} />
              </Link>
              <UserInfo>
                <Link to={`/users/${userData?.me?.username}`}>
                  <Username username={userData?.me?.username} size="16px" />
                </Link>
                <Name
                  name={userData?.me?.firstName + " " + userData?.me?.lastName}
                  size="14px"
                />
              </UserInfo>
            </AsideHeader>
            <AsideMain>
              <AsideMainHeader>
                <h1>회원님을 위한 추천</h1>
                <Link to="/">
                  <span>모두 보기</span>
                </Link>
              </AsideMainHeader>
              <AsideMainInner>
                {seeRecommendUsersData?.seeRecommendUsers.users?.map((user) => (
                  <RecommandContent key={user?.id}>
                    <Link to={`/users/${user?.username}`}>
                      <Avatar size="32px" avatarUrl={user?.avatar} />
                    </Link>
                    <UserInfo>
                      <Link to={`/users/${user?.username}`}>
                        <Username username={user?.username} size="14px" />
                      </Link>
                      <Name
                        name={user?.firstName + " " + user?.lastName}
                        size="12px"
                      />
                    </UserInfo>
                    <FollowButton
                      onClick={() =>
                        handleToggleFollow(user?.isFollowing, user?.username)
                      }
                      isFollowing={user?.isFollowing || false}
                      type="button"
                    >
                      {user?.isFollowing === true ? "팔로잉" : "팔로우"}
                    </FollowButton>
                  </RecommandContent>
                ))}
              </AsideMainInner>
            </AsideMain>
            <Info />
          </AsideContent>
        </RightContainer>
      </Container>
    </FeedLayout>
  );
};

export default Home;
