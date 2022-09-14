import { Link } from "react-router-dom";
import Avatar from "../shared/Avatar";
import Name from "../shared/Name";
import Username from "../shared/Username";

interface SearchUserProps {
  username?: string;
  avatar?: string | null;
  firstName?: string;
  lastName?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

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
        <Username size="15px" username={username} />
        <Name name={firstName + " " + lastName} size={"25px"} />
      </div>
    </Link>
  );
};

export default SearchUser;
