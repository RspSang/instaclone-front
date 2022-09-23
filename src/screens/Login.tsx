import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { logUserIn } from "../apollo";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/shared/PageTitle";
import { LoginMutation, useLoginMutation } from "../generated/graphql";

import routes from "../routes";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Notification = styled.div`
  color: #2ecc71;
`;

interface FormData {
  username: string;
  password: string;
  result?: string;
}

interface LoginState {
  username?: string;
  password?: string;
  message?: string;
}

function Login() {
  const location = useLocation();
  const state = location.state as LoginState | null;
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      username: state?.username || "",
      password: state?.password || "",
    },
  });
  const onCompleted = ({ login }: LoginMutation) => {
    if (login) {
      const { ok, error, token } = login;
      if (!ok && error) {
        setError("result", { message: error });
      }
      if (token) {
        logUserIn(token);
      }
    }
  };

  const [login, { loading }] = useLoginMutation({ onCompleted });
  const onSubmitValid: SubmitHandler<FormData> = ({ username, password }) => {
    if (loading) {
      return;
    }
    login({ variables: { username, password } });
  };
  const clearError = () => {
    clearErrors("result");
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <Notification>{state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("username", {
              required: "ユーザーネームは必須です。",
              minLength: {
                value: 5,
                message: "ユーザーネームは5文字以上必要です。",
              },
            })}
            onFocus={clearError}
            type="text"
            placeholder="ユーザーネーム"
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", { required: "パスワードは必須です。" })}
            onFocus={clearError}
            type="password"
            placeholder="パスワード"
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "ロード中" : "登録する"}
            disabled={!isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Facebookでログイン</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="アカウントをお持ちでないですか？"
        linkText="登録する"
        link={routes.signup}
      />
    </AuthLayout>
  );
}
export default Login;
