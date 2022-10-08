import { LoginForm } from "@/features/auth/components"
import useAuth from "@/features/auth/hooks/useAuth"
import BlankLayout from "@/layouts/BlankLayout/BlankLayout"
import { BASE_ROUTES } from "@/utils/constans"
import React from "react"
import { Navigate } from "react-router-dom"

export interface LoginRouteProps {}

const LoginRoute: React.FC<LoginRouteProps> = () => {
  const { isLoggedIn } = useAuth()

  return isLoggedIn ? (
    <Navigate to={BASE_ROUTES.root} replace />
  ) : (
    <BlankLayout>
      <div className="flex w-full h-full min-h-[468px] sm:py-6 sm:items-center">
        <div className="mx-auto py-8 px-10 w-full bg-dominant text-center border-accent rounded-md sm:max-w-[448px] sm:border">
          <LoginForm />
        </div>
      </div>
    </BlankLayout>
  )
}

export default LoginRoute
