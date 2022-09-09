import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../shared/Avatar";
import Username from "../shared/Username";

interface SearchUserProps {
  username?: string;
  avatar?: string | null;
  firstName?: string;
  lastName?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const Name = styled.span`
  color: ${(props) => props.theme.grayColor};
  padding-top: 2px;
`;

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
        <Username value={username} />
        <Name>
          {firstName} {lastName}
        </Name>
      </div>
    </Link>
  );
};

export default SearchUser;
