import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useSearchUsersLazyQuery } from "../../generated/graphql";
import SearchUser from "./SearchUser";

interface FormData {
  keyword: string;
}

interface SearchedUser {
  __typename?: "User";
  id: number;
  username: string;
  avatar?: string | null;
}

const ScrollBox = styled.div`
  &::-webkit-scrollbar {
    width: 9px;
    height: 9px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${(props) => props.theme.bgColor};
    &:hover {
      background-color: gray;
    }
    &:active {
      background-color: gray;
    }
  }
  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.bgColor};
  }
`;

const SearchForm = styled.form`
  width: 250px;
  position: relative;
`;

const SearchModal = styled(ScrollBox)`
  width: 370px;
  height: 350px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 10px;
  position: absolute;
  top: 43px;
  left: -68px;
  background-color: ${(props) => props.theme.bgColor};
  overflow-y: scroll;
  padding: 10px 0;
  z-index: 1;
  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 1.5;
    color: ${(props) => props.theme.fontColor};
    font-size: 14px;
    font-weight: 400;
    width: 230px;
    text-align: center;
  }
  a {
    display: flex;
    align-items: center;
    padding: 5px 15px;
    padding-right: 0;
    &:hover {
      background-color: ${(props) => props.theme.bgColor};
    }
    img {
      margin-right: 13px;
    }
    div {
      display: flex;
      flex-direction: column;
    }
  }
`;

const SearchInputContainer = styled.div`
  width: 100%;
  background-color: #efefef;
  color: #a8a8a8;
  border-radius: 8px;
  padding: 11px 15px;
`;

const SearchInput = styled.input`
  padding-left: 10px;
  &::placeholder {
    font-size: 14px;
  }
`;

const Back = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default function Search() {
  const [searchedUsers, setSearchedUsers] = useState<(SearchedUser | null)[]>(
    []
  );
  const { register, handleSubmit } = useForm<FormData>({
    mode: "onChange",
  });
  const [searchUsers, { loading: searchUsersLoading }] =
    useSearchUsersLazyQuery();
  const [focuse, setFocuse] = useState(false);
  const handleFocuse = () => {
    setFocuse((prev) => !prev);
  };
  const onValid = () => {};
  return (
    <>
      <SearchForm onSubmit={handleSubmit(onValid)} id="search">
        {focuse && (
          <>
            <SearchModal>
              {searchedUsers.length === 0 && (
                <p>
                  @ユーザーネーム, #ハッシュタグを利用して
                  ユーザー、ハッシュタグを検索してみてください。
                </p>
              )}
              {searchedUsers.map((searchedUser: SearchedUser | null) => (
                <SearchUser
                  key={searchedUser?.id}
                  {...searchedUser}
                  onClick={handleFocuse}
                />
              ))}

              {/* {searchedUsers.map((searchedUser: SearchedUser | null) => (
          <SearchUser key={searchedUser?.id} {...searchedUser} />
        ))}
        {searchedHashtags.map((searchedHashtag: SearchedHashtag | null) => (
          <SearchHashtag key={searchedHashtag?.id} {...searchedHashtag} />
        ))} */}
            </SearchModal>
            <Back onClick={handleFocuse} />
          </>
        )}
        <SearchInputContainer>
          <FontAwesomeIcon icon={faSearch} />
          <SearchInput
            onFocus={handleFocuse}
            placeholder="検索"
            type="text"
            {...register("keyword", {
              minLength: 1,
              maxLength: 30,
              validate: {
                searchingUser: async (keyword: string): Promise<boolean> => {
                  if (keyword.match(/@\w/g) && !searchUsersLoading) {
                    const replacedUsername: string = keyword.replaceAll(
                      "@",
                      ""
                    );
                    const { data } = await searchUsers({
                      variables: { keyword: replacedUsername, offset: 0 },
                    });
                    if (data?.searchUsers && data?.searchUsers.length > 0) {
                      setSearchedUsers(data.searchUsers);
                    }
                  } else {
                    setSearchedUsers([]);
                  }
                  return true;
                },
              },
            })}
          />
        </SearchInputContainer>
      </SearchForm>
    </>
  );
}
