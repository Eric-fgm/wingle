import type { UserSession } from "@/features/auth/types"

const SESSION_KEY = "aqozwqtkqvwezfxdsvwn-auth-token"

export const userSession = {
  get: () =>
    JSON.parse(
      localStorage.getItem(SESSION_KEY) ?? "null"
    ) as UserSession | null,
  set: (value: UserSession | null) =>
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(value)),
  remove() {
    this.set(null)
  },
}
