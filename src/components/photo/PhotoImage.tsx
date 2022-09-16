import styled from "styled-components";

interface PhotoImageProps {
  file?: string;
  handleSeePhotoDetail: () => void;
}

const Container = styled.div`
  font-size: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  max-height: 750px;
  cursor: pointer;
`;

const PhotoImage = ({ file, handleSeePhotoDetail }: PhotoImageProps) => {
  return (
    <Container onClick={handleSeePhotoDetail}>
      <Image src={file} alt="" />
    </Container>
  );
};

export default PhotoImage;
