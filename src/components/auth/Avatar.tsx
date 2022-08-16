import styled from "styled-components";

const SAvatar = styled.div<{ lg?: boolean }>`
  width: ${(props) => (props.lg ? "30px" : "25px")};
  height: ${(props) => (props.lg ? "30px" : "25px")};
  border-radius: 50%;
  background-color: #718093;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

interface AvatarProps {
  url?: string | null;
  lg?: boolean;
}

function Avatar({ url = "", lg = false }: AvatarProps) {
  return (
    <SAvatar lg={lg}>
      {url !== "" ? <Img src={url ? url : ""} /> : null}
    </SAvatar>
  );
}
export default Avatar;
