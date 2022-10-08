import LoginRoute from "@/features/auth/routes/LoginRoute"
import RegisterRoute from "@/features/auth/routes/RegisterRoute"
import GuildRoute from "@/features/guilds/routes/GuildRoute"
import GuildsPlaceholderRoute from "@/features/guilds/routes/GuildsPlaceholderRoute"
import JoinGuild from "@/features/guilds/routes/JoinGuildRoute"
import ProtectedRoute from "@/router/ProtectedRoute"
import { BASE_ROUTES } from "@/utils/constans"
import React from "react"
import { Route, Routes } from "react-router-dom"

const RootRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={BASE_ROUTES.login} element={<LoginRoute />} />
      <Route path={BASE_ROUTES.register} element={<RegisterRoute />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route
          path={`${BASE_ROUTES.root}`}
          element={<GuildsPlaceholderRoute />}
        />
        <Route path={`${BASE_ROUTES.join}/:code`} element={<JoinGuild />} />
        <Route path={`${BASE_ROUTES.guilds}/:guildId`} element={<GuildRoute />}>
          <Route
            path={`${BASE_ROUTES.guilds}/:guildId/${BASE_ROUTES.channels}/:channelId`}
            element={<GuildRoute />}
          />
        </Route>
      </Route>
    </Routes>
  )
}

export default RootRoutes
