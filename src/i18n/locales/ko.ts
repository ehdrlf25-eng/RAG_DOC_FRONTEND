export const ko = {
  'common.appName': 'RAG Doc Platform',
  'common.language': '언어',
  'common.email': '이메일',
  'common.password': '비밀번호',
  'common.name': '이름',
  'common.loadingSession': '세션을 확인하는 중...',
  'common.requestError': '요청 처리 중 오류가 발생했습니다.',

  'auth.tagline': '문서 기반 AI 플랫폼을 위한 밝고 직관적인 시작 화면입니다.',
  'auth.feature.jwt': '안전한 JWT 기반 인증',
  'auth.feature.stack': 'Spring Boot + React 아키텍처',

  'login.title': '로그인',
  'login.subtitle': '계정으로 로그인하고 서비스를 시작하세요.',
  'login.passwordPlaceholder': '비밀번호 입력',
  'login.submit': '로그인',
  'login.submitting': '로그인 중...',
  'login.failed': '로그인에 실패했습니다.',
  'login.noAccount': '계정이 없으신가요?',
  'login.signupLink': '회원가입',

  'signup.title': '회원가입',
  'signup.subtitle': '새 계정을 만들고 플랫폼을 이용해 보세요.',
  'signup.namePlaceholder': '홍길동',
  'signup.passwordPlaceholder': '8자 이상',
  'signup.submit': '회원가입',
  'signup.submitting': '가입 중...',
  'signup.failed': '회원가입에 실패했습니다.',
  'signup.hasAccount': '이미 계정이 있으신가요?',
  'signup.loginLink': '로그인',

  'home.title': '홈',
  'home.welcome': '{{name}}님, 환영합니다',
  'home.logout': '로그아웃',
  'home.empty': '홈 화면 콘텐츠는 추후 추가됩니다.',
} as const

export type TranslationKey = keyof typeof ko
