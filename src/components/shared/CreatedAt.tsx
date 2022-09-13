import "moment/locale/ja";
import Moment from "react-moment";
import styled from "styled-components";

interface CreatedAtProps {
  createdAt?: string | number;
}

const Container = styled.span`
  color: ${(props) => props.theme.grayColor};
  padding: 7px 13px;
  font-size: 11px;
`;

const CreatedAt = ({ createdAt = "" }: CreatedAtProps) => {
  const dateToFormat = new Date(+createdAt);
  return (
    <Container>
      <Moment fromNow locale="ja">
        {dateToFormat}
      </Moment>
    </Container>
  );
};

export default CreatedAt;
