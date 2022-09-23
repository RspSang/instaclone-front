import styled from "styled-components";

interface TotalCommentsProps {
  commentNumber?: number;
  handleOpenPhotoDetail: () => void;
}

const Container = styled.div`
  padding: 8px 15px;
  padding-top: 0px;
  padding-bottom: 8px;
  font-weight: 400;
  font-size: 14px;
  color: ${(props) => props.theme.grayColor};
  cursor: pointer;
`;

const TotalComments = ({
  commentNumber,
  handleOpenPhotoDetail,
}: TotalCommentsProps) => {
  return (
    <Container onClick={handleOpenPhotoDetail}>
      コメント {commentNumber?.toLocaleString("ja-JP")}件をすべて見る
    </Container>
  );
};

export default TotalComments;
