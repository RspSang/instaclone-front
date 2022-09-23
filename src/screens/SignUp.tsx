import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/shared/PageTitle";
import { FatLink } from "../components/shared/shared";
import {
  CreateAccountMutation,
  useCreateAccountMutation,
} from "../generated/graphql";
import routes from "../routes";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

interface FormData {
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  result?: string;
}

function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
  });
  const onCompleted = ({ createAccount }: CreateAccountMutation) => {
    const { username, password } = getValues();
    if (createAccount) {
      const { ok, error } = createAccount;
      if (!ok && error) {
        setError("result", { message: error });
        return;
      }
      navigate(routes.home, {
        state: {
          message: "アカウント生成に成功しました。ログインして下さい。",
          username,
          password,
        },
      });
    }
  };
  const [createAccount, { loading }] = useCreateAccountMutation({
    onCompleted,
  });
  const onSubmitValid: SubmitHandler<FormData> = (data) => {
    if (loading) return;
    createAccount({ variables: { ...data } });
  };
  const clearError = () => {
    clearErrors("result");
  };
  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("firstName", {
              required: "苗字は必須です。",
            })}
            onFocus={clearError}
            type="text"
            placeholder="苗字"
          />
          <FormError message={errors.firstName?.message} />
          <Input
            {...register("lastName")}
            type="text"
            placeholder="名前"
          />
          <Input
            {...register("email", {
              required: "メールアドレスは必須です。",
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/gi,
                message: " メールメール形式のみ有効です。",
              },
            })}
            type="text"
            placeholder="メールメール"
          />
          <FormError message={errors.email?.message} />
          <Input
            {...register("username", {
              required: "ユーザーネームは必須です。",
              minLength: {
                value: 5,
                message: "ユーザーネームは5文字以上必要です。",
              },
            })}
            type="text"
            placeholder="ユーザーネーム"
          />
          <FormError message={errors.username?.message} />
          <Input
            {...register("password", { required: "パスワードは必須です。" })}
            type="password"
            placeholder="パスワード"
          />
          <FormError message={errors.password?.message} />
          <Button
            type="submit"
            value={loading ? "ロード中" : "登録する"}
            disabled={!isValid || loading}
          />
          <FormError message={errors.result?.message} />
        </form>
      </FormBox>
      <BottomBox cta="アカウントをお持ちですか？" linkText="ログインする" link={routes.home} />
    </AuthLayout>
  );
}

export default SignUp;
