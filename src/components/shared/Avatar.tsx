import styled from "styled-components";

interface AvatarProps {
  size: string;
  avatarUrl?: string | null | undefined;
}

const Image = styled.img<{ size: string }>`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 50%;
`;

export default function Avatar({ size, avatarUrl }: AvatarProps) {
  return (
    <Image size={size} src={avatarUrl || "/images/basic_user.jpeg"} alt="" />
  );
}
