import { User } from "firebase/auth"

export interface UserSession extends User {}

export interface UserProfile {
  id: User["uid"]
  username: string
  avatarUrl?: string
}

export interface UserMetadata extends UserProfile {
  email: User["email"]
}
