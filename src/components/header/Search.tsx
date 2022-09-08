import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

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

export default function Search() {
  const { register, watch, handleSubmit } = useForm();
  const [focuse, setFocuse] = useState(false);
  const handleFocuse = () => {
    setFocuse((prev) => !prev);
  };
  const onValid = () => {};
  return (
    <>
      <SearchForm onSubmit={handleSubmit(onValid)}>
        {focuse && (
          <SearchModal>
            <p>
              @ユーザーネーム, #ハッシュタグを利用して
              ユーザー、ハッシュタグを検索してみてください。
            </p>
            {/* {searchedUsers.map((searchedUser: SearchedUser | null) => (
          <SearchUser key={searchedUser?.id} {...searchedUser} />
        ))}
        {searchedHashtags.map((searchedHashtag: SearchedHashtag | null) => (
          <SearchHashtag key={searchedHashtag?.id} {...searchedHashtag} />
        ))} */}
          </SearchModal>
        )}
        <SearchInputContainer>
          <FontAwesomeIcon icon={faSearch} />
          <SearchInput
            placeholder="検索"
            onFocus={handleFocuse}
            onBlur={handleFocuse}
          />
        </SearchInputContainer>
      </SearchForm>
    </>
  );
}
