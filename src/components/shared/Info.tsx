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
              基本データ
            </a>
          </li>
          <span>∙</span>
          <li>
            <a
              href="https://help.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              ヘルプ
            </a>
          </li>
          <span>∙</span>
          <li>
            <a
              href="https://about.instagram.com/blog"
              target="_blank"
              rel="noreferrer"
            >
              ブログ
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
              求人
            </a>
          </li>
          <span>∙</span>
          <li>
            <a
              href="https://help.instagram.com/519522125107875/?maybe_redirect_pol=0"
              target="_blank"
              rel="noreferrer"
            >
              プライバシー
            </a>
          </li>
          <span>∙</span>
          <li>
            <a
              href="https://help.instagram.com/581066165581870"
              target="_blank"
              rel="noreferrer"
            >
              利用規約
            </a>
          </li>
          <span>∙</span>
          <li>
            <a
              href="https://www.instagram.com/explore/locations"
              target="_blank"
              rel="noreferrer"
            >
              所在地
            </a>
          </li>
          <span>∙</span>
          <li>
            <a
              href="https://www.instagram.com/directory/profiles"
              target="_blank"
              rel="noreferrer"
            >
              人気アカウント
            </a>
          </li>
          <span>∙</span>
          <li>
            <a
              href="https://www.instagram.com/directory/hashtags"
              target="_blank"
              rel="noreferrer"
            >
              ハッシュタグ
            </a>
          </li>
        </ul>
      </Nav>
      <span>© {new Date().getFullYear()} INSTAGRAM FROM META</span>
    </NavContent>
  );
}
