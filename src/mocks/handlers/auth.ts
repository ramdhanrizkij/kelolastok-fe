import { http, HttpResponse, delay } from "msw"

export interface MockUser {
  id: string
  name: string
  username: string
  email: string
  role: string
  avatar?: string
  storeName?: string
  createdAt: string
}

// In-memory mock database of users
const mockUsers: MockUser[] = [
  {
    id: "usr-001",
    name: "Budi Santoso",
    username: "budisantoso",
    email: "owner@tokoukm.id",
    role: "Owner / Admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop",
    storeName: "Toko Berkah Mandiri",
    createdAt: "2026-01-15T08:00:00Z",
  },
]

// Helper to generate mock JWT tokens
function generateTokens(userId: string) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }))
  const payloadAccess = btoa(
    JSON.stringify({
      sub: userId,
      type: "access",
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
      iat: Math.floor(Date.now() / 1000),
    })
  )
  const payloadRefresh = btoa(
    JSON.stringify({
      sub: userId,
      type: "refresh",
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
      iat: Math.floor(Date.now() / 1000),
    })
  )
  const signature = btoa("mock-jwt-signature-kelolastok")

  return {
    accessToken: `${header}.${payloadAccess}.${signature}`,
    refreshToken: `${header}.${payloadRefresh}.${signature}`,
    expiresIn: 3600,
  }
}

export const authHandlers = [
  // 1. POST /api/v1/auth/login
  http.post("/api/v1/auth/login", async ({ request }) => {
    await delay(400) // Simulate network latency

    let body: { email?: string; password?: string }
    try {
      body = (await request.json()) as { email?: string; password?: string }
    } catch {
      return HttpResponse.json(
        { success: false, message: "Format payload request tidak valid" },
        { status: 400 }
      )
    }

    const { email, password } = body

    if (!email || !password) {
      return HttpResponse.json(
        {
          success: false,
          message: "Email dan password wajib diisi",
        },
        { status: 400 }
      )
    }

    // Find user by email or username
    let user = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() || u.username.toLowerCase() === email.toLowerCase()
    )

    // For demo/mock convenience, if user doesn't exist yet, auto-create
    if (!user) {
      user = {
        id: `usr-${Date.now().toString(36)}`,
        name: email.split("@")[0] || "User Demo",
        username: (email.split("@")[0] || "user").toLowerCase().replace(/[^a-z0-9]/g, ""),
        email: email,
        role: "Store Manager",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop",
        storeName: "Toko Retail UMKM",
        createdAt: new Date().toISOString(),
      }
      mockUsers.push(user)
    }

    const tokens = generateTokens(user.id)

    return HttpResponse.json({
      success: true,
      message: "Login berhasil",
      data: {
        user,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: tokens.expiresIn,
      },
    })
  }),

  // 2. POST /api/v1/auth/register
  http.post("/api/v1/auth/register", async ({ request }) => {
    await delay(500)

    let body: {
      name?: string
      username?: string
      email?: string
      password?: string
    }
    try {
      body = (await request.json()) as typeof body
    } catch {
      return HttpResponse.json(
        { success: false, message: "Format payload request tidak valid" },
        { status: 400 }
      )
    }

    const { name, username, email, password } = body

    if (!name || !username || !email || !password) {
      return HttpResponse.json(
        {
          success: false,
          message: "Nama, username, email, dan password wajib diisi",
        },
        { status: 400 }
      )
    }

    // Check duplicate
    const exists = mockUsers.some(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() ||
        u.username.toLowerCase() === username.toLowerCase()
    )

    if (exists) {
      return HttpResponse.json(
        {
          success: false,
          message: "Email atau username sudah terdaftar",
        },
        { status: 409 }
      )
    }

    const newUser: MockUser = {
      id: `usr-${Date.now().toString(36)}`,
      name,
      username: username.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      role: "Owner / Administrator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop",
      storeName: `${name} Store`,
      createdAt: new Date().toISOString(),
    }

    mockUsers.push(newUser)
    const tokens = generateTokens(newUser.id)

    return HttpResponse.json(
      {
        success: true,
        message: "Pendaftaran akun berhasil",
        data: {
          user: newUser,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          expiresIn: tokens.expiresIn,
        },
      },
      { status: 201 }
    )
  }),

  // 3. GET /api/v1/auth/profile
  http.get("/api/v1/auth/profile", async ({ request }) => {
    await delay(200)

    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return HttpResponse.json(
        {
          success: false,
          message: "Akses ditolak: Token autentikasi tidak ditemukan",
        },
        { status: 401 }
      )
    }

    const token = authHeader.replace("Bearer ", "").trim()
    try {
      const parts = token.split(".")
      if (parts.length < 2) throw new Error("Invalid token format")
      const payload = JSON.parse(atob(parts[1]))
      const userId = payload.sub

      const user = mockUsers.find((u) => u.id === userId) || mockUsers[0]
      return HttpResponse.json({
        success: true,
        data: {
          user,
        },
      })
    } catch {
      // Default to first user if token parsing in mock is lenient
      return HttpResponse.json({
        success: true,
        data: {
          user: mockUsers[0],
        },
      })
    }
  }),

  // 4. POST /api/v1/auth/refresh
  http.post("/api/v1/auth/refresh", async ({ request }) => {
    await delay(300)

    let body: { refreshToken?: string }
    try {
      body = (await request.json()) as { refreshToken?: string }
    } catch {
      return HttpResponse.json(
        { success: false, message: "Payload tidak valid" },
        { status: 400 }
      )
    }

    const { refreshToken } = body
    if (!refreshToken) {
      return HttpResponse.json(
        {
          success: false,
          message: "Refresh token wajib disertakan",
        },
        { status: 400 }
      )
    }

    try {
      const parts = refreshToken.split(".")
      if (parts.length < 2) throw new Error("Format token tidak valid")
      const payload = JSON.parse(atob(parts[1]))
      const userId = payload.sub || mockUsers[0].id

      const newTokens = generateTokens(userId)

      return HttpResponse.json({
        success: true,
        message: "Token berhasil diperbarui",
        data: {
          accessToken: newTokens.accessToken,
          refreshToken: newTokens.refreshToken,
          expiresIn: newTokens.expiresIn,
        },
      })
    } catch {
      return HttpResponse.json(
        {
          success: false,
          message: "Refresh token kedaluwarsa atau tidak valid",
        },
        { status: 401 }
      )
    }
  }),
]
