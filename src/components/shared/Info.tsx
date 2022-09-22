import styled from "styled-components";

const NavContent = styled.div`
  span {
    color: ${(props) => props.theme.grayColor};
    font-size: 13px;
    font-weight: 400;
    margin: 0 1px;
  }
`;

const Nav = styled.nav`
  margin-bottom: 15px;
  ul {
    max-width: 310px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    li {
      margin-bottom: 2px;
      a {
        color: ${(props) => props.theme.grayColor};
        font-size: 12px;
      }
    }
  }
`;

export default function Info() {
  return (
    <NavContent>
      <Nav>
        <ul>
          <li>
            <a
              href="https://about.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              소개
            </a>
          </li>
          <span>∙</span>
          <li>
            <a
              href="https://help.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              도움말
            </a>
          </li>
          <span>∙</span>
          <li>
            <a
              href="https://about.instagram.com/blog"
              target="_blank"
              rel="noreferrer"
            >
              홍보 센터
            </a>
          </li>
          <span>∙</span>
          <li>
            <a
              href="https://developers.facebook.com/docs/instagram"
              target="_blank"
              rel="noreferrer"
            >
              API
            </a>
          </li>
          <span>∙</span>
          <li>
            <a
              href="https://about.instagram.com/about-us/careers"
              target="_blank"
              rel="noreferrer"
            >
              채용 정보
            </a>
          </li>
          <span>∙</span>
          <li>
            <a
              href="https://help.instagram.com/519522125107875/?maybe_redirect_pol=0"
              target="_blank"
              rel="noreferrer"
            >
              개인정보처리방침
            </a>
          </li>
          <span>∙</span>
          <li>
            <a
              href="https://help.instagram.com/581066165581870"
              target="_blank"
              rel="noreferrer"
            >
              약관
            </a>
          </li>
          <span>∙</span>
          <li>
            <a
              href="https://www.instagram.com/explore/locations"
              target="_blank"
              rel="noreferrer"
            >
              위치
            </a>
          </li>
          <span>∙</span>
          <li>
            <a
              href="https://www.instagram.com/directory/profiles"
              target="_blank"
              rel="noreferrer"
            >
              인기 계정
            </a>
          </li>
          <span>∙</span>
          <li>
            <a
              href="https://www.instagram.com/directory/hashtags"
              target="_blank"
              rel="noreferrer"
            >
              해시태그
            </a>
          </li>
        </ul>
      </Nav>
      <span>© {new Date().getFullYear()} INSTAGRAM FROM META</span>
    </NavContent>
  );
}
