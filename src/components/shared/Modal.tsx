import styled from "styled-components";

interface ModalProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  children?: React.ReactNode;
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const Card = styled.div`
  position: absolute;
  width: 90%;
  height: 60%;
  max-width: 1120px;
  max-height: 900px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`;

export default function Modal({ onClick, children }: ModalProps) {
  return (
    <Container onClick={onClick}>
      <Card onClick={(e) => e.stopPropagation()}>{children}</Card>
    </Container>
  );
}
