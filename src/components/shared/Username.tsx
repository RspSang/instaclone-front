import styled from "styled-components";

interface UsernameProps {
  value?: string;
  margin?: boolean;
}

const Text = styled.span<{ margin?: boolean }>`
  font-weight: 600;
  margin-left: ${(props) => (props.margin ? "15px" : "0px")};
`;

export default function Username({ value, margin }: UsernameProps) {
  return <Text margin={margin}>{value}</Text>;
}
