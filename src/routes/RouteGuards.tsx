import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLocale } from '../contexts/LocaleContext'

/** 로그인 필수 라우트. 세션 복원 중 로딩 UI, 미인증 시 /login으로 리다이렉트 */
export function ProtectedRoute() {
  const { user, isLoading } = useAuth()
  const { t } = useLocale()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="rounded-2xl bg-white px-8 py-6 shadow-card">
          <p className="text-brand-700">{t('common.loadingSession')}</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

/** 비로그인 전용 라우트(로그인·회원가입). 이미 로그인된 사용자는 홈으로 보낸다 */
export function GuestRoute() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return null
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
