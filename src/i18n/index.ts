import { en } from './locales/en'
import { ko, type TranslationKey } from './locales/ko'

export type Locale = 'ko' | 'en'

export const LOCALES: { value: Locale; label: string }[] = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'English' },
]

const messages: Record<Locale, Record<TranslationKey, string>> = { ko, en }

/** {{name}} 플레이스홀더 치환 지원 번역 함수 */
export function translate(
  locale: Locale,
  key: TranslationKey,
  params?: Record<string, string>,
): string {
  let text = messages[locale][key] ?? messages.ko[key] ?? key

  if (params) {
    Object.entries(params).forEach(([name, value]) => {
      text = text.replaceAll(`{{${name}}}`, value)
    })
  }

  return text
}

export const LOCALE_STORAGE_KEY = 'ragdoc_locale'

/** 브라우저 언어 설정 기반 기본 로케일 (ko 접두사면 한국어) */
export function getDefaultLocale(): Locale {
  return navigator.language.startsWith('ko') ? 'ko' : 'en'
}

/** localStorage 우선, 없으면 브라우저 기본 로케일 */
export function getCurrentLocale(): Locale {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  if (stored === 'ko' || stored === 'en') {
    return stored
  }
  return getDefaultLocale()
}

/** API 요청용 Accept-Language 헤더 값 */
export function toAcceptLanguage(locale: Locale): string {
  return locale === 'en' ? 'en' : 'ko'
}
