import { LanguageSelector } from './LanguageSelector'

export function AppHeaderBar() {
  return (
    <div className="fixed right-4 top-4 z-50">
      <LanguageSelector />
    </div>
  )
}
