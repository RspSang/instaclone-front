import { Link } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/shared/Footer";
import MainLayout from "../components/shared/MainLayout";
import PageTitle from "../components/shared/PageTitle";

const Container = styled.div`
  margin-top: 90px;
  text-align: center;

  h1 {
    font-size: 22px;
    line-height: 1.6;
    font-weight: 600;
  }
  p {
    margin: 0;
    margin-top: 30px;
    a {
      color: #00376b;
    }
  }
`;

const NotFound = () => {
  return (
    <MainLayout>
      <PageTitle title="ページが見つかりません" />
      <Container>
        <h1>このページはご利用いただけません。</h1>
        <p>
          リンクに問題があるか、ページが削除された可能性があります。{" "}
          <Link to="/">Instagramに戻る</Link>
        </p>
      </Container>
      <Footer />
    </MainLayout>
  );
};

export default NotFound;
