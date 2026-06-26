/** 백엔드 API·프론트엔드 공통 타입 정의 */
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
