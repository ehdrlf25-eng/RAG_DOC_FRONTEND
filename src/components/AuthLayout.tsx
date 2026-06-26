import type { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import { useLocale } from '../contexts/LocaleContext'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
}

/** 인증 페이지(로그인/회원가입) 공통 레이아웃 — 브랜딩 영역 + 폼 카드 */
export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  const { t } = useLocale()

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-cyan-50">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-10 pt-20 lg:flex-row lg:gap-16">
        <section className="mb-10 max-w-lg text-center lg:mb-0 lg:text-left">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-card">
            <FontAwesomeIcon icon={faFileLines} className="text-2xl" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">{t('common.appName')}</h1>
          <p className="mt-4 text-lg text-slate-600">{t('auth.tagline')}</p>
          <div className="mt-8 grid gap-3 text-left text-sm text-slate-600">
            <div className="rounded-xl border border-brand-100 bg-white/80 px-4 py-3 shadow-sm">
              {t('auth.feature.jwt')}
            </div>
            <div className="rounded-xl border border-brand-100 bg-white/80 px-4 py-3 shadow-sm">
              {t('auth.feature.stack')}
            </div>
          </div>
        </section>

        <section className="w-full max-w-md rounded-3xl border border-white/70 bg-white/90 p-8 shadow-card backdrop-blur">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
            <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
          </div>
          {children}
        </section>
      </div>
    </div>
  )
}
