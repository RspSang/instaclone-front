import styled from "styled-components";
import Header from "../header/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const Wrapper = styled.div``;

const Container = styled.div``;

const Content = styled.div`
  margin: 0 auto;
  max-width: 940px;
  width: 940px;
  display: flex;
  flex-direction: column;
`;

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Wrapper>
      <Header />
      <Container>
        <Content>{children}</Content>
      </Container>
    </Wrapper>
  );
};

export default MainLayout;
