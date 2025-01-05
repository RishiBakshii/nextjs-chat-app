'use client';
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateLogin } from "../../hooks/useAuth/useUpdateLogin";
import type { loginSchemaType } from "@/schemas/auth.schema";
import { useLogin } from "../../hooks/useAuth/useLogin";
import { FormInput } from "../ui/FormInput";
import { SubmitButton } from "../ui/SubmitButton";
import { loginSchema } from "@/schemas/auth.schema";
import { AuthRedirectLink } from "./AuthRedirectLink";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginForm = () => {
  const { login, data, isLoading, isSuccess } = useLogin();
  useUpdateLogin(isSuccess, data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<loginSchemaType> = (data) => login(data);

  return (
    <form className="flex flex-col gap-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-1">
          <FormInput
            autoComplete="email webauthn"
            placeholder="Email"
            register={register("email")}
            error={errors.email?.message}
          />
        </div>

        <div className="flex flex-col gap-y-1">
          <FormInput
            type="password"
            autoComplete="current-password webauthn"
            placeholder="Password"
            register={register("password")}
            error={errors.password?.message}
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <SubmitButton disabled={isLoading} btnText="Login" />
        </div>

        <div className="flex justify-between items-center flex-wrap gap-1">
          <AuthRedirectLink
            pageName="Signup"
            text="Already a member?"
            to="/auth/signup"
          />
          <AuthRedirectLink
            pageName="forgot password"
            text="Need Help?"
            to="/auth/forgot-password"
          />
        </div>
      </div>
    </form>
  );
};
