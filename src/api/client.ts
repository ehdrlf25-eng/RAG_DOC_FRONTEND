import { getCurrentLocale, toAcceptLanguage, translate, type Locale } from '../i18n'
import type { TranslationKey } from '../i18n/locales/ko'

export interface ApiError {
  message: string
}

const TOKEN_KEY = 'ragdoc_access_token'

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setStoredToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearStoredToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

function getFallbackErrorMessage(locale: Locale): string {
  return translate(locale, 'common.requestError' as TranslationKey)
}

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

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}
