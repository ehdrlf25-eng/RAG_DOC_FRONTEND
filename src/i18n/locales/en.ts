import type { TranslationKey } from './ko'

export const en: Record<TranslationKey, string> = {
  'common.appName': 'RAG Doc Platform',
  'common.language': 'Language',
  'common.email': 'Email',
  'common.password': 'Password',
  'common.name': 'Name',
  'common.loadingSession': 'Checking your session...',
  'common.requestError': 'An error occurred while processing the request.',

  'auth.tagline': 'A bright, intuitive starting point for your document-based AI platform.',
  'auth.feature.jwt': 'Secure JWT-based authentication',
  'auth.feature.stack': 'Spring Boot + React architecture',

  'login.title': 'Log in',
  'login.subtitle': 'Sign in to your account and get started.',
  'login.passwordPlaceholder': 'Enter your password',
  'login.submit': 'Log in',
  'login.submitting': 'Signing in...',
  'login.failed': 'Failed to log in.',
  'login.noAccount': "Don't have an account?",
  'login.signupLink': 'Sign up',

  'signup.title': 'Sign up',
  'signup.subtitle': 'Create a new account and start using the platform.',
  'signup.namePlaceholder': 'John Doe',
  'signup.passwordPlaceholder': 'At least 8 characters',
  'signup.submit': 'Sign up',
  'signup.submitting': 'Signing up...',
  'signup.failed': 'Failed to sign up.',
  'signup.hasAccount': 'Already have an account?',
  'signup.loginLink': 'Log in',

  'home.title': 'Home',
  'home.welcome': 'Welcome, {{name}}',
  'home.logout': 'Log out',
  'home.empty': 'Home screen content will be added later.',
}
