import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  getDefaultLocale,
  LOCALE_STORAGE_KEY,
  translate,
  type Locale,
} from '../i18n'
import type { TranslationKey } from '../i18n/locales/ko'

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey, params?: Record<string, string>) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

/** UI 로케일 및 t() 번역 함수 제공. 선택 값은 localStorage에 유지된다. */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => getDefaultLocale())

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    localStorage.setItem(LOCALE_STORAGE_KEY, next)
  }, [])

  useEffect(() => {
    // 접근성·브라우저 기본 언어와 동기화
    document.documentElement.lang = locale
  }, [locale])

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string>) => translate(locale, key, params),
    [locale],
  )

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }
  return context
}
