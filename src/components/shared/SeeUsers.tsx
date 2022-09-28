import styled from "styled-components";
import Name from "../shared/Name";
import Avatar from "../shared/Avatar";
import Loading from "../shared/Loading";
import Username from "../shared/Username";
import MainLayout from "../shared/MainLayout";
import { Link } from "react-router-dom";
import { Button } from "../shared/shared";
import useUser from "../../hooks/useUser";
import {
  useFollowUserMutation,
  useSeeUsersQuery,
  useUnfollowUserMutation,
} from "../../generated/graphql";
import { SEE_FOLLOWING } from "../../documents/queries/seeFollowing.query";
import { SEE_FOLLOWERS } from "../../documents/queries/seeFollowers.query";

const LoadingContainer = styled.section`
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  justify-content: center;
  margin-top: 90px;
`;

const Container = styled.section`
  background-color: ${(props) => props.theme.bgColor};
  position: relative;
  display: flex;
  width: 600px;
  max-width: 600px;
  margin: 90px auto;
  display: flex;
  flex-direction: column;

  h1 {
    font-weight: 600;
  }
`;

const UsersContainer = styled.div`
  padding: 15px 15px;
  margin-top: 10px;
  background-color: ${(props) => props.theme.bgContainerColor};
`;

const MainContent = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const MainUser = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;

  a {
    display: flex;
    align-items: center;
  }
`;

const MainUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 13px;
`;

const FollowButton = styled(Button)<{ isFollowing: boolean | undefined }>`
  width: 80px;
  height: 32px;
  text-align: center;
  background-color: ${(props) =>
    props.isFollowing === true ? "white" : props.theme.activeColor};
  color: ${(props) => (props.isFollowing === true ? "gray" : "white")};
  border: 1px solid
    ${(props) =>
      props.isFollowing === true ? props.theme.borderColor : "transparent"};
`;

export default function SeeUsers() {
  let followUsername: string | undefined;
  let unfollowUsername: string | undefined;
  const { data: userData } = useUser();
  const { data: seeUsersData, loading: seeUsersLoading } = useSeeUsersQuery();
  const [followUserMutation, { loading: followUserLoading }] =
    useFollowUserMutation({
      update: (cache, { data }) => {
        if (followUserLoading) {
          return;
        }
        followUsername = data?.followUser?.user?.username;
        cache.modify({
          id: `User:${followUsername}`,
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
          variables: { username: followUsername || "", page: 1 },
        },
        {
          query: SEE_FOLLOWING,
          variables: { username: userData?.me?.username || "", page: 1 },
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
          id: `User:${unfollowUsername}`,
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
          variables: { username: unfollowUsername || "", page: 1 },
        },
        {
          query: SEE_FOLLOWING,
          variables: { username: userData?.me?.username || "", page: 1 },
        },
      ],
    });

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

  return (
    <MainLayout>
      {seeUsersLoading === true ? (
        <LoadingContainer>
          <Loading size="16px" />
        </LoadingContainer>
      ) : (
        <Container>
          <h1>추천</h1>
          <UsersContainer>
            {seeUsersData?.seeUsers.users?.map((user) => (
              <MainContent key={user?.id}>
                <MainUser>
                  <Link to={`/users/${user?.username}`}>
                    <Avatar
                      size="38px"
                      avatarUrl={user?.avatar || "/images/basic_user.jpeg"}
                    />
                    <MainUserInfo>
                      <Username size="15px" username={user?.username} />
                      <Name
                        size="14px"
                        name={user?.firstName + " " + user?.lastName}
                      />
                    </MainUserInfo>
                  </Link>
                </MainUser>
                {user?.isMe === false && (
                  <FollowButton
                    isFollowing={user?.isFollowing}
                    onClick={() =>
                      handleToggleFollow(user?.isFollowing, user?.username)
                    }
                    type="button"
                  >
                    {user?.isFollowing ? "フォロー中" : "フォローする"}
                  </FollowButton>
                )}
              </MainContent>
            ))}
          </UsersContainer>
        </Container>
      )}
    </MainLayout>
  );
}
