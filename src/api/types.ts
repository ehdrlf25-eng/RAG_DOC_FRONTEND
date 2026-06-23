export interface User {
  id: number
  email: string
  name: string
}

export interface AuthResponse {
  accessToken: string
  tokenType: string
  user: User
}
