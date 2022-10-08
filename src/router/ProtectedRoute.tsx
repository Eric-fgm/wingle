import useAuth from "@/features/auth/hooks/useAuth"
import DefaultLayout from "@/layouts/DefaultLayout/DefaultLayout"
import { BASE_ROUTES } from "@/utils/constans"
import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute: React.FC = () => {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) return <Navigate to={BASE_ROUTES.login} replace />

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  )
}

export default ProtectedRoute
