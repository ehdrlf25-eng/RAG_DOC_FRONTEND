import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { authApi } from '../api/auth'
import { clearStoredToken, getStoredToken, setStoredToken } from '../api/client'
import type { User } from '../api/types'

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = getStoredToken()
    if (!token) {
      setIsLoading(false)
      return
    }

    authApi
      .me()
      .then(setUser)
      .catch(() => clearStoredToken())
      .finally(() => setIsLoading(false))
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const response = await authApi.login({ email, password })
    setStoredToken(response.accessToken)
    setUser(response.user)
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const response = await authApi.signup({ name, email, password })
    setStoredToken(response.accessToken)
    setUser(response.user)
  }, [])

  const logout = useCallback(() => {
    clearStoredToken()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, isLoading, login, signup, logout }),
    [user, isLoading, login, signup, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
