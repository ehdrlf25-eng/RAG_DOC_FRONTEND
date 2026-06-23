import { apiRequest } from './client'
import type { User, AuthResponse } from './types'

export const authApi = {
  signup(payload: { email: string; password: string; name: string }) {
    return apiRequest<AuthResponse>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  login(payload: { email: string; password: string }) {
    return apiRequest<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  me() {
    return apiRequest<User>('/api/auth/me')
  },
}
