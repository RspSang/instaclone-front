import {
  faCheckCircle,
  faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useUploadPhotoMutation } from "../../generated/graphql";

interface UploadProps {
  username?: string;
  id?: number;
  avatar?: string;
}

interface FileDataForm {
  imageFile: FileList;
  caption: string;
}

const SContainer = styled.div`
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

const Modal = styled.div`
  position: absolute;
  width: 40%;
  height: 40%;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
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

const Container = styled.div`
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
  width: 500px;
  height: 500px;
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

const Text = styled.span`
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
`;

export default function Upload({ username, avatar }: UploadProps) {
  const { register, handleSubmit, watch, getValues, setValue } =
    useForm<FileDataForm>();
  const [imagePreview, setImagePreview] = useState("");
  const [clicked, setClicked] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const [uploadPhotoMutation, { data, loading }] = useUploadPhotoMutation({
    update: (cache, result) => {
      if (!result.data?.uploadPhoto) return;
      const {
        data: { uploadPhoto },
      } = result;
      if (uploadPhoto.id) {
        cache.modify({
          id: "ROOT_QUERY",
          fields: {
            seeFeed(prev) {
              return [uploadPhoto, ...prev];
            },
          },
        });
      }
    },
  });

  const handleClicked = () => {
    setClicked((prev) => !prev);
    setImagePreview("");
  };

  const handleBackClicked = () => {
    setImagePreview("");
    setValue("caption", "");
    setConfirm(false);
  };

  const onValid = () => {
    if (loading) return;
    const { imageFile, caption } = getValues();
    uploadPhotoMutation({
      variables: {
        file: imageFile[0],
        caption,
      },
    });
  };

  const imageFile = watch("imageFile");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [imageFile]);

  useEffect(() => {
    if (data) {
      setConfirm(true);
    }
  }, [data]);

  return (
    <>
      {clicked && (
        <SContainer onClick={handleClicked}>
          <Modal onClick={(e) => e.stopPropagation()}>
            {confirm ? (
              <>
                <Title>完了</Title>
                <Container>
                  <FontAwesomeIcon icon={faCheckCircle} size="5x" />
                  <Text>投稿完了</Text>
                </Container>
              </>
            ) : (
              <>
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
                      <Container>
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
                      </Container>
                    </form>
                  </>
                )}
              </>
            )}
          </Modal>
        </SContainer>
      )}
      <FontAwesomeIcon icon={faPlusSquare} size="lg" onClick={handleClicked} />
    </>
  );
}
