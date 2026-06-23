import { en } from './locales/en'
import { ko, type TranslationKey } from './locales/ko'

export type Locale = 'ko' | 'en'

export const LOCALES: { value: Locale; label: string }[] = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'English' },
]

const messages: Record<Locale, Record<TranslationKey, string>> = { ko, en }

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

export function getDefaultLocale(): Locale {
  return navigator.language.startsWith('ko') ? 'ko' : 'en'
}

export function getCurrentLocale(): Locale {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  if (stored === 'ko' || stored === 'en') {
    return stored
  }
  return getDefaultLocale()
}

export function toAcceptLanguage(locale: Locale): string {
  return locale === 'en' ? 'en' : 'ko'
}
