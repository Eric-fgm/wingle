import { Button, Logo, Typography } from "@/components"
import { Input } from "@/features/auth/components"
import useAuth from "@/features/auth/hooks/useAuth"
import { BASE_ROUTES } from "@/utils/constans"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

const RegisterForm = () => {
  const navigate = useNavigate()
  const { isSigningUp, signUp } = useAuth()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = handleSubmit((fields) => {
    signUp(fields)
  })

  return (
    <form onSubmit={onSubmit}>
      <Logo />
      <Typography size="lg" variant="white" className="mt-4">
        Zarejestruj się
      </Typography>
      <Typography size="sm" variant="white" className="mt-0.5">
        za pomocą konta
      </Typography>
      <Input
        {...register("username", { required: true })}
        placeholder="Nazwa użytkownika"
        className="mt-8"
      />
      <Input
        {...register("email", { required: true })}
        placeholder="Adres e-mail"
        className="mt-2.5"
      />
      <div className="mt-2.5 flex gap-2.5">
        <Input
          {...register("password", { required: true })}
          type="password"
          placeholder="Hasło"
        />
        <Input
          {...register("confirmPassword", { required: true })}
          type="password"
          placeholder="Powtórz hasło"
        />
      </div>
      <Typography size="rg" variant="muted" className="mt-4 pr-6 text-left">
        By signing in, you agree to our{" "}
        <Link to="/" className="text-primary">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to="/" className="text-primary">
          Privacy Policy
        </Link>
        .
      </Typography>
      <div className="mt-6 flex">
        <Button
          variant="raw"
          text="Zaloguj się"
          className="-ml-2 px-2 block"
          onClick={() => navigate(BASE_ROUTES.login)}
        />
        <Button
          type="submit"
          text="Zarejestruj się"
          className="ml-auto block"
          isLoading={isSigningUp}
        />
      </div>
    </form>
  )
}

export default RegisterForm
