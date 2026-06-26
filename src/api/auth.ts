import { apiRequest } from './client'
import type { User, AuthResponse } from './types'

/** 인증 API. signup/login은 공개, me는 JWT 필요 */
export const authApi = {
  /** 회원가입 후 accessToken·user를 반환 */
  signup(payload: { email: string; password: string; name: string }) {
    return apiRequest<AuthResponse>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  /** 이메일·비밀번호 로그인 */
  login(payload: { email: string; password: string }) {
    return apiRequest<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  /** JWT로 현재 로그인 사용자 프로필 조회 */
  me() {
    return apiRequest<User>('/api/auth/me')
  },
}
