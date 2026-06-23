import type { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-cyan-50">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-10 lg:flex-row lg:gap-16">
        <section className="mb-10 max-w-lg text-center lg:mb-0 lg:text-left">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-card">
            <FontAwesomeIcon icon={faFileLines} className="text-2xl" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">RAG Doc Platform</h1>
          <p className="mt-4 text-lg text-slate-600">
            문서 기반 AI 플랫폼을 위한 밝고 직관적인 시작 화면입니다.
          </p>
          <div className="mt-8 grid gap-3 text-left text-sm text-slate-600">
            <div className="rounded-xl border border-brand-100 bg-white/80 px-4 py-3 shadow-sm">
              안전한 JWT 기반 인증
            </div>
            <div className="rounded-xl border border-brand-100 bg-white/80 px-4 py-3 shadow-sm">
              Spring Boot + React 아키텍처
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
