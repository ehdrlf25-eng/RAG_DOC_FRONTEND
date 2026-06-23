import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faLock,
  faUser,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import { AuthLayout } from '../components/AuthLayout'
import { useAuth } from '../contexts/AuthContext'
import { useLocale } from '../contexts/LocaleContext'

export function SignupPage() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const { t } = useLocale()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await signup(name, email, password)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : t('signup.failed'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout title={t('signup.title')} subtitle={t('signup.subtitle')}>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">{t('common.name')}</span>
          <div className="relative">
            <FontAwesomeIcon
              icon={faUser}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400"
            />
            <input
              type="text"
              required
              minLength={2}
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
              placeholder={t('signup.namePlaceholder')}
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">{t('common.email')}</span>
          <div className="relative">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
              placeholder="you@example.com"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">{t('common.password')}</span>
          <div className="relative">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400"
            />
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
              placeholder={t('signup.passwordPlaceholder')}
            />
          </div>
        </label>

        {error ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3 font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FontAwesomeIcon icon={faUserPlus} />
          {isSubmitting ? t('signup.submitting') : t('signup.submit')}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        {t('signup.hasAccount')}{' '}
        <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700">
          {t('signup.loginLink')}
        </Link>
      </p>
    </AuthLayout>
  )
}
