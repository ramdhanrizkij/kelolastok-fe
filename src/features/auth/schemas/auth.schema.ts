export interface LoginFormValues {
  email: string
  password: string
  remember?: boolean
}

export interface ForgotPasswordFormValues {
  email: string
}

export interface RegisterFormValues {
  name: string
  username: string
  email: string
  password: string
  storeName?: string
  agreeTerms?: boolean
}

export interface ResetPasswordFormValues {
  password: string
  confirmPassword: string
}

