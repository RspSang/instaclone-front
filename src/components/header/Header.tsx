import { useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHome, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar, logUserOut } from "../../apollo";
import useUser from "../../hooks/useUser";
import routes from "../../routes";
import DarkMode from "../shared/DarkMode";
import Avatar from "../shared/Avatar";
import Search from "./Search";
import FileUpload from "./FileUpload";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-left: 15px;
`;

const LogoutNav = styled.nav`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 22px;
  a {
    color: inherit;
    &:last-child {
      margin-left: 25px;
    }
  }
`;

const LoginLink = styled(Link)`
  background-color: ${(props) => props.theme.activeColor};
  padding: 7px 20px;
  border-radius: 5px;
  span {
    color: white;
    font-size: 14px;
    font-weight: bold;
    vertical-align: middle;
  }
`;

const SignupLink = styled(Link)`
  span {
    color: ${(props) => props.theme.activeColor};
    font-size: 14px;
    font-weight: bold;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </Link>
        </Column>
        <Column>
          <Search />
        </Column>
        <Column>
          {isLoggedIn ? (
            <>
              <IconsContainer>
                <Icon>
                  <Link to={routes.home}>
                    <FontAwesomeIcon icon={faHome} size="lg" />
                  </Link>
                </Icon>
                <Icon>
                  <FontAwesomeIcon icon={faPaperPlane} size="lg" />
                </Icon>
                <Icon>
                  <FileUpload {...data?.me} />
                </Icon>
                <Icon>
                  <Link to={`/users/${data?.me?.username}`}>
                    <Avatar avatarUrl={data?.me?.avatar} size="28px" />
                  </Link>
                </Icon>
                <Icon>
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    onClick={() => logUserOut()}
                    size="lg"
                    style={{ cursor: "pointer" }}
                  />
                </Icon>
                <Icon>
                  <DarkMode />
                </Icon>
              </IconsContainer>
            </>
          ) : (
            <LogoutNav>
              <LoginLink to={routes.login}>
                <span>ログイン</span>
              </LoginLink>
              <SignupLink to={routes.signup}>
                <span>会員登録</span>
              </SignupLink>
            </LogoutNav>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
}
export default Header;
