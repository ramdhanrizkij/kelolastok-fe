export interface User {
  id: string
  name: string
  username: string
  email: string
  role: string
  permissions?: string[]
  avatar?: string
  storeName?: string
  createdAt?: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn?: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  username: string
  email: string
  password: string
  storeName?: string
}

export interface AuthResponse {
  success: boolean
  message?: string
  data?: {
    user: User
    accessToken: string
    refreshToken: string
    expiresIn?: number
  }
}

export interface ProfileResponse {
  success: boolean
  message?: string
  data?: {
    user: User
  }
}

export interface RefreshResponse {
  success: boolean
  message?: string
  data?: {
    accessToken: string
    refreshToken: string
    expiresIn?: number
  }
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ForgotPasswordResponse {
  success: boolean
  message: string
  data?: {
    resetLink?: string
    resetToken?: string
  }
}

export interface ResetPasswordPayload {
  token: string
  password: string
  email?: string
}

export interface ResetPasswordResponse {
  success: boolean
  message: string
}

