export const BASE_ROUTES = {
  root: "/",
  guilds: "/guilds",
  channels: "channels",
  users: "users",
  login: "/login",
  register: "/register",
  join: "/join",
} as const

export const TIME_AS_MILISECONDS = {
  minute: 60 * 1000,
  hour: 3600 * 1000,
}

export const ROLES_MAP = {
  admin: "Administrator",
  moderator: "Moderator",
  member: "Członek",
  guest: "Gość",
}
