import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Avatar from "../components/shared/Avatar";
import MainLayout from "../components/shared/MainLayout";
import { ME } from "../documents/queries/me.query";
import { useEditProfileMutation } from "../generated/graphql";
import useUser from "../hooks/useUser";

interface FormData {
  avatar?: FileList;
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  bio?: string;
  password?: string;
  error?: string;
  result?: string;
}

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  margin: auto;
  margin-top: 128px;
  width: 70%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 30px 40px 70px;
  display: flex;
  flex-direction: column;
`;

const ProfileContainer = styled.div`
  margin-right: 1rem;
  width: 40%;
  text-align: right;
`;

const ProfileInfo = styled.div`
  width: 100%;
`;

const Name = styled.span`
  display: block;
  font-size: 1.3rem;
`;

const Edit = styled.label`
  color: ${(props) => props.theme.accent};
  font-weight: 600;
  cursor: pointer;
`;

const Form = styled.form`
  padding: 10px 0;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  :first-child {
    margin-bottom: 2rem;
  }
`;

const Label = styled.label`
  font-size: 1.1rem;
  font-weight: 700;
  text-align: right;
  margin-right: 1rem;
  width: 40%;
`;

const Input = styled.input`
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  width: 100%;
  padding: 5px 10px;
`;

const FileInput = styled.input`
  display: none;
  visibility: hidden;
`;

const Button = styled.div<{ loading: boolean; valid: boolean }>`
  margin: 0 auto;
  background-color: ${(props) => props.theme.accent};
  padding: 8px 16px;
  border-radius: 5px;
  color: ${(props) => props.theme.buttonFontColor};
  font-weight: 600;
  cursor: pointer;
  opacity: ${(props) => (props.loading || !props.valid ? "0.5" : "1")};
  pointer-events: ${(props) => (props.valid ? "all" : "none")};
`;

const Alert = styled.div<{ show?: boolean; errors?: boolean }>`
  opacity: ${(props) => (props.show ? 1 : 0)};
  background-color: ${(props) => (props.errors ? "#F4E1E1" : "#c3f3d7")};
  color: ${(props) => (props.errors ? "#D71537" : "#25ad5d")};
  margin: auto;
  padding: 12px 20px;
  border-radius: 5px;
`;

export default function EditProfile() {
  const [valid, setValid] = useState(false);
  const [show, setShow] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const { data: userData } = useUser();

  const [editProfile, { data, loading }] = useEditProfileMutation({
    refetchQueries: [{ query: ME }],
  });
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
  } = useForm<FormData>();

  const onValid = ({
    avatar,
    firstName,
    lastName,
    username,
    email,
    bio,
    password,
  }: FormData) => {
    if (loading) return;
    editProfile({
      variables: {
        avatar: avatar && avatar[0],
        firstName,
        lastName,
        username,
        email,
        bio,
        password,
      },
    });
  };

  const imageFile = watch("avatar");

  const onChange = useCallback(() => {
    setValid(true);
    setShow(false);
    clearErrors();
  }, [clearErrors]);

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      onChange();
      const file = imageFile[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [imageFile, onChange]);

  useEffect(() => {
    if (data && data.editProfile.error) {
      setError("result", { message: data.editProfile.error });
    }
    if (data) setShow(true);
  }, [data, setError]);

  useEffect(() => {
    if (userData?.me) {
      setImagePreview(userData.me.avatar || "");
      setValue("firstName", userData.me.firstName);
      setValue("lastName", userData.me.lastName || "");
      setValue("username", userData.me.username);
      setValue("email", userData.me.email);
      setValue("bio", userData.me.bio || "");
    }
  }, [userData, setValue]);

  return (
    <MainLayout>
      <Container>
        <Alert show={show} errors={Boolean(Object.keys(errors).length)}>
          {data?.editProfile.ok ? (
            <>
              <FontAwesomeIcon
                icon={faCircleCheck}
                style={{ marginRight: "10px" }}
              />
              <span>????????????????????????????????????????????????</span>
            </>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faWarning}
                style={{ marginRight: "10px" }}
              />
              <span>{errors.result?.message}</span>
            </>
          )}
        </Alert>
        <Form>
          <Row>
            <ProfileContainer>
              {imagePreview ? (
                <Avatar avatarUrl={imagePreview} size="48px" />
              ) : null}
            </ProfileContainer>
            <ProfileInfo>
              <Name>{userData?.me?.username}</Name>
              <Edit htmlFor="image">?????????????????????????????????</Edit>
              <FileInput
                id="image"
                type="file"
                accept="image/*"
                {...register("avatar")}
              />
            </ProfileInfo>
          </Row>
          <Row>
            <Label>??????</Label>
            <Input
              {...register("firstName", {
                required: "????????????????????????",
              })}
              onChange={onChange}
            />
          </Row>
          <Row>
            <Label>??????</Label>
            <Input {...register("lastName")} />
          </Row>
          <Row>
            <Label>?????????????????????</Label>
            <Input
              {...register("username", {
                required: "???????????????????????????????????????",
              })}
              onChange={onChange}
            />
          </Row>
          <Row>
            <Label>E?????????</Label>
            <Input
              {...register("email", {
                required: "???????????????????????????????????????",
              })}
              onChange={onChange}
            />
          </Row>
          <Row>
            <Label>????????????</Label>
            <Input {...register("bio")} onChange={onChange} />
          </Row>
          <Row>
            <Label>???????????????</Label>
            <Input
              {...register("password")}
              onChange={onChange}
              type="password"
            />
          </Row>
        </Form>
        <Button onClick={handleSubmit(onValid)} loading={loading} valid={valid}>
          {loading ? "?????????" : "????????????"}
        </Button>
      </Container>
    </MainLayout>
  );
}
