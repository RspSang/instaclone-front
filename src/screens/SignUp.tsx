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
          message: "Account created. Please log in.",
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
              required: "First Name is required",
            })}
            onFocus={clearError}
            type="text"
            placeholder="First Name"
          />
          <FormError message={errors.firstName?.message} />
          <Input
            {...register("lastName")}
            type="text"
            placeholder="Last Name"
          />
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/gi,
                message: "Only allow email",
              },
            })}
            type="text"
            placeholder="Email"
          />
          <FormError message={errors.email?.message} />
          <Input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 chars.",
              },
            })}
            type="text"
            placeholder="Username"
          />
          <FormError message={errors.username?.message} />
          <Input
            {...register("password", { required: "Password is required." })}
            type="password"
            placeholder="Password"
          />
          <FormError message={errors.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!isValid || loading}
          />
          <FormError message={errors.result?.message} />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
}

export default SignUp;
