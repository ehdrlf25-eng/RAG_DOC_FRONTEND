import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { LOCALES } from '../i18n'
import { useLocale } from '../contexts/LocaleContext'

/** ko/en 로케일 전환 — 변경 시 localStorage 및 API Accept-Language에 반영 */
export function LanguageSelector() {
  const { locale, setLocale, t } = useLocale()

  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2 shadow-sm backdrop-blur">
      <FontAwesomeIcon icon={faGlobe} className="text-brand-500" aria-hidden="true" />
      <label htmlFor="language-select" className="sr-only">
        {t('common.language')}
      </label>
      <select
        id="language-select"
        value={locale}
        onChange={(event) => setLocale(event.target.value as 'ko' | 'en')}
        className="cursor-pointer bg-transparent text-sm font-medium text-slate-700 outline-none"
        aria-label={t('common.language')}
      >
        {LOCALES.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}
