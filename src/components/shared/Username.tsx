import styled from "styled-components";

interface UsernameProps {
  username?: string | null;
  size: string;
  textDecoration?: boolean;
}

const Container = styled.span<{ size: string; textDecoration: boolean }>`
  font-size: ${(props) => props.size};
  font-weight: bold;
  cursor: pointer;
  &:hover {
    text-decoration: ${(props) =>
      props.textDecoration ? "underline" : "none"};
  }
`;

const Username = ({
  username,
  size,
  textDecoration = false,
}: UsernameProps) => {
  return (
    <Container size={size} textDecoration={textDecoration}>
      {username}
    </Container>
  );
};

export default Username;
