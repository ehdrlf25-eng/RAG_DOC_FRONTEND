/**
 * 공통 HTTP 클라이언트.
 * JWT·Accept-Language 헤더를 자동 부착하고, 백엔드 에러 메시지를 Error로 전파한다.
 */
import { getCurrentLocale, toAcceptLanguage, translate, type Locale } from '../i18n'
import type { TranslationKey } from '../i18n/locales/ko'

export interface ApiError {
  message: string
}

const TOKEN_KEY = 'ragdoc_access_token'

/** localStorage에 저장된 JWT Access Token */
export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

/** 로그인·회원가입 성공 시 토큰을 저장한다. */
export function setStoredToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

/** 로그아웃 또는 토큰 만료 시 세션을 제거한다. */
export function clearStoredToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

function getFallbackErrorMessage(locale: Locale): string {
  return translate(locale, 'common.requestError' as TranslationKey)
}

/**
 * 백엔드 API 공통 fetch 래퍼.
 * - Bearer 토큰이 있으면 Authorization 헤더 추가
 * - Accept-Language로 서버 i18n과 프론트 로케일 동기화
 * - FormData 업로드 시 Content-Type은 브라우저가 boundary 포함해 설정하도록 생략
 */
export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken()
  const locale = getCurrentLocale()
  const headers = new Headers(options.headers)

  if (!headers.has('Content-Type') && options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  headers.set('Accept-Language', toAcceptLanguage(locale))

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(path, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = (await response.json().catch(() => ({
      message: getFallbackErrorMessage(locale),
    }))) as ApiError
    throw new Error(error.message)
  }

  // DELETE 등 본문 없는 성공 응답
  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}
