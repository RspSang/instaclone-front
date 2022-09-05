import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface UploadProps {
  username?: string;
  id?: number;
  avatar?: string;
}

interface FileDataForm {
  imageFile: FileList;
  caption: string;
}

const Container = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const Modal = styled.div`
  z-index: 2;
  background-color: ${(props) => props.theme.bgColor};
  margin: 15% auto;
  border: 1px solid #888;
  width: 70%;
  border-radius: 10px;
`;

const Title = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  border-bottom: 1px solid #888;
  padding: 10px;
`;

const ConfirmTitle = styled(Title)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
`;

const Next = styled.span`
  color: ${(props) => props.theme.accent};
  font-size: 0.9rem;
  cursor: pointer;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20%;
`;

const InputLabel = styled.label`
  margin-top: 2rem;
  background-color: ${(props) => props.theme.accent};
  border-radius: 5px;
  border: none;
  padding: 5px 10px;
  color: ${(props) => props.theme.buttonFontColor};
  font-weight: 600;
  :hover {
    cursor: pointer;
  }
`;

const FileInput = styled.input`
  visibility: hidden;
  display: none;
`;

const ImgContainer = styled.div`
  overflow: hidden;
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ConfirmContainer = styled.div`
  display: flex;
`;

const CaptionContainer = styled.div`
  border-left: 1px solid #888;
`;

const Profile = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
`;

const CaptionInput = styled.input`
  padding: 10px 20px;
`;

const ProfileAvatar = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 10px;
`;

const ProfileName = styled.span`
  margin-left: 10px;
  font-weight: 600;
`;

export default function Upload({ username, avatar }: UploadProps) {
  const { register, handleSubmit, watch, getValues } = useForm<FileDataForm>();
  const [imagePreview, setImagePreview] = useState("");
  const [clicked, setClicked] = useState(false);

  const [] = use

  const handleClicked = () => {
    setClicked((prev) => !prev);
    setImagePreview("");
  };

  const handleBackClicked = () => {
    setImagePreview("");
  };

  const onValid = () => {};

  const imageFile = watch("imageFile");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [imageFile]);

  return (
    <>
      {clicked && (
        <Container onClick={handleClicked}>
          <Modal onClick={(e) => e.stopPropagation()}>
            {imagePreview ? (
              <>
                <ConfirmTitle>
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    onClick={handleBackClicked}
                    style={{ cursor: "pointer" }}
                  />
                  <span>新規投稿を作成</span>
                  <Next onClick={handleSubmit(onValid)}>ジェア</Next>
                </ConfirmTitle>
                <ConfirmContainer>
                  <ImgContainer>
                    <PreviewImg src={imagePreview} />
                  </ImgContainer>
                  <CaptionContainer>
                    <Profile>
                      <ProfileAvatar src={avatar} />
                      <ProfileName>{username}</ProfileName>
                    </Profile>
                    <form>
                      <CaptionInput
                        {...register("caption", { required: true })}
                        type="text"
                        placeholder="キャプションを入力..."
                      />
                    </form>
                  </CaptionContainer>
                </ConfirmContainer>
              </>
            ) : (
              <>
                <Title>新規投稿を作成</Title>
                <form>
                  <InputContainer>
                    <FontAwesomeIcon icon={faPhotoFilm} size="5x" />
                    <InputLabel htmlFor="imageFile">
                      コンピューターから選択
                    </InputLabel>
                    <FileInput
                      type="file"
                      accept="image/*"
                      id="imageFile"
                      {...register("imageFile", { required: true })}
                    />
                  </InputContainer>
                </form>
              </>
            )}
          </Modal>
        </Container>
      )}
      <FontAwesomeIcon icon={faPlusSquare} size="lg" onClick={handleClicked} />
    </>
  );
}
