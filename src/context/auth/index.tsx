import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { AuthContextData, AuthenticateInterface, AuthProviderInterface, User } from './interfaces';

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderInterface) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState('')

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=ea5f579a5fcda4d00bb5`

  async function signIn(gitHubCode: string) {
    const { data } = await api.post<AuthenticateInterface>('authenticate', {
      code: gitHubCode
    })
    const { user, token } = data
    localStorage.setItem('@dowhile:token', token)
    setUser(user)
  }

  function signOut() {
    setUser(null)
    localStorage.removeItem('@dowhile:token')
  }

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token')

    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`

      api.get<User>('user-profile').then(response => {
        setUser(response.data)
      })
    }
  }, [])

  useEffect(() => {
    const url = window.location.href;
    const hasGitHubCode = url.includes('?code=')

    if (hasGitHubCode) {
      const [urlWithoutCode, gitHubCode] = url.split('?code=')
      window.history.pushState({}, '', urlWithoutCode)
      signIn(gitHubCode)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ signInUrl, user, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}