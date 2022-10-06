import styled from "styled-components";
import { useParams } from "react-router";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { SEE_FOLLOWERS } from "../documents/queries/seeFollowers.query";
import { SEE_FOLLOWING } from "../documents/queries/seeFollowing.query";
import {
  Link,
  NavigateFunction,
  useNavigate,
  useMatch,
} from "react-router-dom";
import {
  useFollowUserMutation,
  useSeeFollowersLazyQuery,
  useSeeFollowersQuery,
  useSeeFollowingQuery,
  useSeeProfileQuery,
  useUnfollowUserMutation,
} from "../generated/graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import useUser from "../hooks/useUser";
import MainLayout from "../components/shared/MainLayout";
import {
  Button,
  ModalBackground,
  ScrollBox,
} from "../components/shared/shared";
import Loading from "../components/shared/Loading";
import Avatar from "../components/shared/Avatar";
import Username from "../components/shared/Username";
import Name from "../components/shared/Name";
import PageTitle from "../components/shared/PageTitle";
import PhotoDetail from "../components/photo/PhotoDetail";

type ProfileParams = {
  username: string;
};

const modalVariants: Variants = {
  start: { opacity: 0, scale: 0.95, translateX: "-50%", translateY: "-50%" },
  end: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const Container = styled.section`
  margin-top: 58px;
`;

const ProfileHeader = styled.div`
  padding: 30px 70px;
  padding-bottom: 40px;
  display: flex;
`;

const ProfileImage = styled.div`
  flex: 1;
  display: flex;

  img {
    cursor: pointer;
  }
`;

const ProfileUserInfo = styled.div`
  flex: 2.4;
  padding-top: 15px;
`;

const ProfileUser = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 30px;
    font-weight: 400;
    margin-right: 40px;
  }
  a {
    border: 1px solid ${(props) => props.theme.borderColor};
    padding: 7px 10px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 500;
  }
  button {
    box-sizing: border-box;
    width: 95px;
    padding: 7px 0;
    margin: 0px;
    margin-left: 7px;
  }
`;

const ProfilePost = styled.div`
  margin-top: 30px;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
  max-width: 280px;

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

const ProfileDescription = styled.div`
  h1 {
    font-weight: 600;
    margin-bottom: 10px;
  }
  p {
    line-height: 1.4;
  }
`;

const ProfileMain = styled.div`
  border-top: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  justify-content: flex-start;
  max-width: 940px;
  width: 940px;
  flex-wrap: wrap;
  gap: 20px;
  padding: 30px 0px;
`;

const ProfilePhoto = styled.div`
  position: relative;
  cursor: pointer;
`;

const ProfilePhotoImage = styled.img`
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

const ProfilePhotoIcons = styled.div`
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

const ModalBox = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  box-sizing: border-box;
  outline: none;
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgContainerColor};
  overflow: hidden;
  z-index: 120;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding: 12px 0;

  h1 {
    font-weight: 600;
    font-size: 16px;
  }
  button {
    position: absolute;
    top: 5px;
    right: 4px;
    font-size: 22px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: ${(props) => props.theme.bgContainerColor};
    color: ${(props) => props.theme.fontColor};
  }
`;

const ModalMain = styled(ScrollBox)`
  padding: 10px 18px;
  padding-bottom: 0;
  overflow-y: scroll;
  height: 355px;
`;

const ModalMainContent = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const ModalMainUser = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;

  a {
    display: flex;
    align-items: center;
  }
`;

const ModalMainUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 13px;
`;

const FollowButton = styled(Button)<{ isFollowing: boolean | undefined }>`
  width: 60px;
  height: 32px;
  text-align: center;
  background-color: ${(props) =>
    props.isFollowing === true ? "white" : props.theme.activeColor};
  color: ${(props) => (props.isFollowing === true ? "gray" : "white")};
  border: 1px solid
    ${(props) =>
      props.isFollowing === true ? props.theme.borderColor : "transparent"};
`;

export default function Profile() {
  const navigate: NavigateFunction = useNavigate();
  const followersPathMath = useMatch("/users/:username/followers");
  const followingPathMath = useMatch("/users/:username/following");
  const photoPathMath = useMatch("/users/:username/photos/:id");
  const { data: userData } = useUser();
  const { username } = useParams<ProfileParams>();
  const [seeFollowersLazyQuery] = useSeeFollowersLazyQuery();
  const { data: seeProfileData, loading: seeProfileLoading } =
    useSeeProfileQuery({
      variables: { username: username as string, page: 1 },
    });
  const { data: seeFollowersData } = useSeeFollowersQuery({
    variables: { username: username as string, page: 1 },
  });
  const { data: seeFollowingData } = useSeeFollowingQuery({
    variables: { username: username as string, page: 1 },
  });
  const [
    followUserMutation,
    { data: followUserData, loading: followUserLoading },
  ] = useFollowUserMutation({
    update: (cache, { data }) => {
      if (followUserLoading) {
        return;
      }
      if (data?.followUser && data?.followUser.user?.username === username) {
        cache.modify({
          id: `User:${seeProfileData?.seeProfile?.username}`,
          fields: {
            isFollowing: (isFollowing: boolean) => true,
            totalFollowers: (totalFollowers: number) => totalFollowers + 1,
          },
        });
      } else {
        seeFollowersLazyQuery({
          variables: {
            username: data?.followUser?.user?.username as string,
            page: 1,
          },
        });
        cache.modify({
          id: `User:${data?.followUser?.user?.username}`,
          fields: {
            isFollowing: (isFollowing: boolean) => true,
            totalFollowers: (totalFollowers: number) => totalFollowers + 1,
          },
        });
      }

      cache.modify({
        id: `User:${userData?.me?.id}`,
        fields: {
          totalFollowing: (totalFollowing: number) => totalFollowing + 1,
        },
      });
    },
    refetchQueries: [
      { query: SEE_FOLLOWERS, variables: { username, page: 1 } },
      {
        query: SEE_FOLLOWING,
        variables: { username: userData?.me?.username, page: 1 },
      },
    ],
  });
  const [
    unfollowUserMutation,
    { data: unfollowUserData, loading: unfollowUserLoading },
  ] = useUnfollowUserMutation({
    update: (cache, { data }) => {
      if (unfollowUserLoading) {
        return;
      }
      if (data?.unfollowUser?.user?.username === username) {
        cache.modify({
          id: `User:${seeProfileData?.seeProfile?.username}`,
          fields: {
            isFollowing: (isFollowing: boolean) => false,
            totalFollowers: (totalFollowers: number) => totalFollowers - 1,
          },
        });
      } else {
        seeFollowersLazyQuery({
          variables: {
            username: data?.unfollowUser?.user?.username as string,
            page: 1,
          },
        });
        cache.modify({
          id: `User:${data?.unfollowUser?.user?.id}`,
          fields: {
            isFollowing: (isFollowing: boolean) => false,
            totalFollowers: (totalFollowers: number) => totalFollowers - 1,
          },
        });
      }
      cache.modify({
        id: `User:${userData?.me?.username}`,
        fields: {
          totalFollowing: (totalFollowing: number) => totalFollowing - 1,
        },
      });
    },
    refetchQueries: [
      { query: SEE_FOLLOWERS, variables: { username, page: 1 } },
      {
        query: SEE_FOLLOWING,
        variables: { username: userData?.me?.username, page: 1 },
      },
    ],
  });

  const handleFollowUser = (): void => {
    if (followUserLoading) {
      return;
    }
    followUserMutation({ variables: { username: username as string } });
  };

  const handleUnfollowUser = (): void => {
    if (unfollowUserLoading) {
      return;
    }
    unfollowUserMutation({ variables: { username: username as string } });
  };

  const handleSeeFollowers = (): void => {
    document.body.style.overflow = "hidden";
    navigate(`/users/${username}/followers`);
  };

  const handleSeeFollowing = (): void => {
    document.body.style.overflow = "hidden";
    navigate(`/users/${username}/following`);
  };

  const handleCloseModal = (): void => {
    document.body.style.overflow = "auto";
    navigate(-1);
  };

  const handleToggleFollow = (
    isFollowing: boolean | undefined,
    username: string | undefined
  ): void => {
    if (isFollowing) {
      unfollowUserMutation({
        variables: { username: username as string },
      });
    } else {
      followUserMutation({ variables: { username: username as string } });
    }
  };
  const handleOpenPhotoDetail = (id: number | undefined): void => {
    navigate(`/users/${username}/photos/${id}`);
  };
  return (
    <MainLayout>
      {(followersPathMath !== null || followingPathMath !== null) && (
        <AnimatePresence>
          <ModalBackground onClick={handleCloseModal} />
          <ModalBox
            variants={modalVariants}
            initial="start"
            animate="end"
            exit="exit"
          >
            <ModalHeader>
              <h1>{followersPathMath ? "フォロワー" : "フォロー"}</h1>
              <button onClick={handleCloseModal}>✕</button>
            </ModalHeader>
            <ModalMain>
              {followersPathMath &&
                seeFollowersData?.seeFollowers.followers?.map((follower) => (
                  <ModalMainContent key={follower?.id}>
                    <ModalMainUser>
                      <Link to={`/users/${follower?.username}`}>
                        <Avatar size="38px" avatarUrl={follower?.avatar} />
                        <ModalMainUserInfo>
                          <Username size="15px" username={follower?.username} />
                          <Name
                            size="14px"
                            name={
                              follower?.firstName + " " + follower?.lastName
                            }
                          />
                        </ModalMainUserInfo>
                      </Link>
                    </ModalMainUser>
                    {follower?.isMe === false && (
                      <FollowButton
                        isFollowing={follower?.isFollowing}
                        onClick={() =>
                          handleToggleFollow(
                            follower?.isFollowing,
                            follower?.username
                          )
                        }
                        type="button"
                      >
                        {followUserLoading&&
                        followUserData?.followUser?.user?.username ===
                          follower?.username ? (
                          <Loading size="12px" />
                        ) : follower?.isFollowing? (
                          "フォロー中"
                        ) : (
                          "フォロー"
                        )}
                      </FollowButton>
                    )}
                  </ModalMainContent>
                ))}
              {followingPathMath &&
                seeFollowingData?.seeFollowing.following?.map((following) => (
                  <ModalMainContent key={following?.id}>
                    <ModalMainUser>
                      <Link to={`/users/${following?.username}`}>
                        <Avatar size="38px" avatarUrl={following?.avatar} />
                        <ModalMainUserInfo>
                          <Username
                            size="15px"
                            username={following?.username}
                          />
                          <Name
                            size="14px"
                            name={
                              following?.firstName + " " + following?.lastName
                            }
                          />
                        </ModalMainUserInfo>
                      </Link>
                    </ModalMainUser>
                    {!following?.isMe && (
                      <FollowButton
                        isFollowing={following?.isFollowing}
                        onClick={() =>
                          handleToggleFollow(
                            following?.isFollowing,
                            following?.username
                          )
                        }
                        type="button"
                      >
                        {followUserLoading &&
                        followUserData?.followUser?.user?.username ===
                          following?.username ? (
                          <Loading size="12px" />
                        ) : following?.isFollowing ? (
                          "フォロー中"
                        ) : (
                          "フォロー"
                        )}
                      </FollowButton>
                    )}
                  </ModalMainContent>
                ))}
            </ModalMain>
          </ModalBox>
        </AnimatePresence>
      )}
      <PageTitle
        title={
          seeProfileLoading === true
            ? "ロード中"
            : username || "ページが見つかりません"
        }
      />
      {!seeProfileLoading ? (
        <Container>
          <ProfileHeader>
            <ProfileImage>
              <Avatar
                avatarUrl={seeProfileData?.seeProfile?.avatar}
                size="155px"
              />
            </ProfileImage>
            <ProfileUserInfo>
              <ProfileUser>
                <span>{seeProfileData?.seeProfile?.username}</span>
                {seeProfileData?.seeProfile?.isMe === true && (
                  <Link to={`/users/${userData?.me?.username}/edit`}>
                    プロフィールを編集
                  </Link>
                )}
                {seeProfileData?.seeProfile?.isMe === false &&
                  seeProfileData.seeProfile.isFollowing === true && (
                    <Button onClick={handleUnfollowUser} type="button">
                      {unfollowUserLoading === true &&
                      unfollowUserData?.unfollowUser?.user?.username ===
                        username ? (
                        <Loading size="12px" />
                      ) : (
                        "フォロー中"
                      )}
                    </Button>
                  )}
                {seeProfileData?.seeProfile?.isMe === false &&
                  seeProfileData.seeProfile.isFollowing === false && (
                    <Button onClick={handleFollowUser} type="button">
                      {followUserLoading === true &&
                      followUserData?.followUser?.user?.username ===
                        username ? (
                        <Loading size="12px" />
                      ) : (
                        "フォロー"
                      )}
                    </Button>
                  )}
              </ProfileUser>
              <ProfilePost>
                <span>
                  投稿{" "}
                  <strong>{seeProfileData?.seeProfile?.totalPhotos}</strong>
                </span>
                <span onClick={handleSeeFollowers}>
                  フォロワー{" "}
                  <strong>{seeProfileData?.seeProfile?.totalFollowers}</strong>
                </span>
                <span onClick={handleSeeFollowing}>
                  フォロー{" "}
                  <strong>{seeProfileData?.seeProfile?.totalFollowing}</strong>
                </span>
              </ProfilePost>
              <ProfileDescription>
                <h1>
                  {seeProfileData?.seeProfile?.firstName +
                    " " +
                    seeProfileData?.seeProfile?.lastName}
                </h1>
                <p>{seeProfileData?.seeProfile?.bio}</p>
              </ProfileDescription>
            </ProfileUserInfo>
          </ProfileHeader>
          <ProfileMain>
            {seeProfileData?.seeProfile?.photos?.map((photo) => (
              <ProfilePhoto key={photo?.id}>
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
                  <ProfilePhotoIcons>
                    <span>
                      <FontAwesomeIcon icon={faHeart} />
                      {photo?.likes}
                    </span>
                    <span>
                      <FontAwesomeIcon
                        icon={faComment}
                        style={{ transform: "rotateY(180deg)" }}
                      />
                      {photo?.commentNumber}
                    </span>
                  </ProfilePhotoIcons>
                </Overlay>
                <ProfilePhotoImage src={photo?.file} alt="" />
              </ProfilePhoto>
            ))}
          </ProfileMain>
        </Container>
      ) : null}
    </MainLayout>
  );
}
