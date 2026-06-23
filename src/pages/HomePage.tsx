import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../contexts/AuthContext'

export function HomePage() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-sky-50">
      <header className="border-b border-white/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white">
              <FontAwesomeIcon icon={faFileLines} />
            </div>
            <div>
              <p className="font-semibold text-slate-900">RAG Doc Platform</p>
              <p className="text-xs text-slate-500">홈</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">{user?.name}님, 환영합니다</span>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-200 hover:text-brand-700"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <section className="rounded-3xl border border-dashed border-brand-200 bg-white/70 p-16 text-center shadow-sm">
          <p className="text-lg text-slate-500">홈 화면 콘텐츠는 추후 추가됩니다.</p>
        </section>
      </main>
    </div>
  )
}
