import { ReactNode } from 'react'

export type User = {
  id: string
  name: string
  login: string
  avatar_url: string
}

export type AuthContextData = {
  user: User | null
  signInUrl: string
  signOut: () => void
}

export type AuthProviderInterface = {
  children: ReactNode
}

export type AuthenticateInterface = {
  token: string,
  user: {
    id: string
    avatar_url: string
    name: string
    login: string
  }
}