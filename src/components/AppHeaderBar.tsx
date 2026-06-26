import { LanguageSelector } from './LanguageSelector'

/** 우측 상단 고정 헤더 — 언어 선택기만 표시 */
export function AppHeaderBar() {
  return (
    <div className="fixed right-4 top-4 z-50">
      <LanguageSelector />
    </div>
  )
}
