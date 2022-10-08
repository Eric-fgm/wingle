import { Button, Logo, Typography } from "@/components"
import { Input } from "@/features/auth/components"
import useAuth from "@/features/auth/hooks/useAuth"
import { BASE_ROUTES } from "@/utils/constans"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

const LoginForm = () => {
  const navigate = useNavigate()
  const { isSigningIn, signIn } = useAuth()
  const { register, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = handleSubmit((fields) => {
    signIn(fields)
  })

  return (
    <form onSubmit={onSubmit}>
      <Logo />
      <Typography size="lg" variant="white" className="mt-4">
        Zaloguj się
      </Typography>
      <Typography size="sm" variant="white" className="mt-0.5">
        za pomocą konta
      </Typography>
      <Input
        {...register("email", { required: true })}
        placeholder="Adres e-mail"
        className="mt-8"
      />
      <Input
        {...register("password", { required: true })}
        type="password"
        placeholder="Hasło"
        className="mt-2.5"
      />
      {/* <div className="flex items-center">
        <span className="mr-2 flex-1 h-px bg-accent" />
        <Typography size="rg" variant="muted" className="my-5">
          Or continue with
        </Typography>
        <span className="ml-2 flex-1 h-px bg-accent" />
      </div>
      <div className="mb-6 flex gap-4 items-center">
        <ProviderButton className="flex-1" />
        <ProviderButton variant="twitter" className="flex-1" />
      </div> */}
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
          text="Utwórz konto"
          className="-ml-2 px-2 block"
          onClick={() => navigate(BASE_ROUTES.register)}
        />
        <Button
          type="submit"
          text="Zaloguj się"
          className="ml-auto block"
          isLoading={isSigningIn}
        />
      </div>
    </form>
  )
}

export default LoginForm
