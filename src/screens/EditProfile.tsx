import styled from "styled-components";
import useUser from "../hooks/useUser";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  margin: auto;
  width: 70%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 80px 40px;
  display: flex;
  flex-direction: column;
`;

const ProfileContainer = styled.div`
  margin-right: 1rem;
  width: 40%;
  text-align: right;
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;

const ProfileInfo = styled.div`
  width: 100%;
`;

const Name = styled.span`
  display: block;
  font-size: 1.3rem;
`;

const Edit = styled.span`
  color: ${(props) => props.theme.accent};
  font-weight: 600;
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

const Button = styled.div`
  margin: 0 auto;
  background-color: ${(props) => props.theme.accent};
  padding: 5px 10px;
  border-radius: 5px;
  color: ${(props) => props.theme.buttonFontColor};
  font-weight: 600;
`;

export default function EditProfile() {
  const { data: userData } = useUser();
  return (
    <Container>
      <Form>
        <Row>
          <ProfileContainer>
            <ProfileImage src={userData?.me.avatar} />
          </ProfileContainer>
          <ProfileInfo>
            <Name>{userData?.me.username}</Name>
            <Edit>プロフィール写真を変更</Edit>
          </ProfileInfo>
        </Row>
        <Row>
          <Label>苗字</Label>
          <Input></Input>
        </Row>
        <Row>
          <Label>名前</Label>
          <Input></Input>
        </Row>
        <Row>
          <Label>ユーザーネーム</Label>
          <Input></Input>
        </Row>
        <Row>
          <Label>自己紹介</Label>
          <Input></Input>
        </Row>
      </Form>
      <Button>送信する</Button>
    </Container>
  );
}
