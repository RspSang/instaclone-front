import styled from "styled-components";

const Container = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
`;

const Content = styled.div`
  margin: 0 auto;
  max-width: 650px;
  width: 650px;
  display: flex;
  flex-direction: column;
  margin-bottom: 35px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;

  a {
    color: ${(props) => props.theme.grayColor};
    font-size: 12px;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;

  span {
    color: ${(props) => props.theme.grayColor};
    font-size: 12px;
    &:first-child {
      margin-right: 10px;
    }
  }
`;

export default function Footer() {
  return (
    <Container>
      <Content>
        <Nav>
          <a
            href="https://about.facebook.com/meta"
            target="_blank"
            rel="noreferrer"
          >
            Meta
          </a>
          <a
            href="https://about.instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            
          </a>
          <a
            href="https://about.instagram.com/blog"
            target="_blank"
            rel="noreferrer"
          >
            ブログ
          </a>
          <a
            href="https://about.instagram.com/about-us/careers"
            target="_blank"
            rel="noreferrer"
          >
            求人
          </a>
          <a href="https://help.instagram.com" target="_blank" rel="noreferrer">
            ヘルプ
          </a>
          <a
            href="https://developers.facebook.com/docs/instagram"
            target="_blank"
            rel="noreferrer"
          >
            API
          </a>
          <a
            href="https://help.instagram.com/519522125107875/?maybe_redirect_pol=0"
            target="_blank"
            rel="noreferrer"
          >
            プライバシー
          </a>
          <a
            href="https://help.instagram.com/581066165581870"
            target="_blank"
            rel="noreferrer"
          >
            利用規約
          </a>
          <a
            href="https://www.instagram.com/directory/profiles"
            target="_blank"
            rel="noreferrer"
          >
            人気アカウント
          </a>
          <a
            href="https://www.instagram.com/directory/hashtags"
            target="_blank"
            rel="noreferrer"
          >
            ハッシュタグ
          </a>
          <a
            href="https://www.instagram.com/explore/locations"
            target="_blank"
            rel="noreferrer"
          >
            所在地
          </a>
          <a
            href="https://www.instagram.com/web/lite"
            target="_blank"
            rel="noreferrer"
          >
            Instagram Lite
          </a>
        </Nav>
        <Info>
          <span>日本語</span>
          <span>© {new Date().getFullYear()} Instagram from Meta</span>
        </Info>
      </Content>
    </Container>
  );
}
