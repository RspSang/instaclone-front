import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../shared/Avatar";

interface SearchUserProps {
  username?: string | null;
  avatar?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const Username = styled.span``;

const Name = styled.span``;

const SearchUser = ({
  username,
  avatar,
  firstName,
  lastName,
  onClick,
}: SearchUserProps) => {
  return (
    <Link to={`/users/${username}`} onClick={onClick}>
      <Avatar size="47px" avatarUrl={avatar} />
      <div>
        <Username>{username}</Username>
        <Name>
          {firstName} {lastName}
        </Name>
      </div>
    </Link>
  );
};

export default SearchUser;
