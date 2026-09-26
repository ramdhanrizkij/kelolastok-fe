src/
├── app/
│   ├── providers/
│   │   ├── AppProviders.tsx
│   │   ├── QueryProvider.tsx
│   │   ├── RouterProvider.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── AuthProvider.tsx
│   │
│   ├── router/
│   │   ├── index.tsx
│   │   ├── routes.tsx
│   │   ├── protected-route.tsx
│   │   └── route-guards.ts
│   │
│   ├── layouts/
│   │   ├── AppLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   └── ErrorLayout.tsx
│   │
│   ├── config/
│   │   ├── env.ts
│   │   ├── app.config.ts
│   │   └── query.config.ts
│   │
│   └── App.tsx
│
├── features/
│   ├── auth/
│   │   ├── api/
│   │   │   ├── login.ts
│   │   │   ├── logout.ts
│   │   │   └── refresh-token.ts
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── ForgotPasswordForm.tsx
│   │   ├── hooks/
│   │   │   ├── use-auth.ts
│   │   │   └── use-permission.ts
│   │   ├── stores/
│   │   │   └── auth.store.ts
│   │   ├── schemas/
│   │   │   └── auth.schema.ts
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   └── index.ts
│   │
│   ├── users/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── schemas/
│   │   ├── stores/
│   │   ├── types/
│   │   └── index.ts
│   │
│   ├── roles/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── schemas/
│   │   ├── types/
│   │   └── index.ts
│   │
│   ├── attendance/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── schemas/
│   │   ├── stores/
│   │   ├── types/
│   │   └── index.ts
│   │
│   ├── leave/
│   ├── overtime/
│   ├── visits/
│   ├── organization/
│   └── timesheet/
│
├── pages/
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   └── ForgotPasswordPage.tsx
│   │
│   ├── dashboard/
│   │   └── DashboardPage.tsx
│   │
│   ├── users/
│   │   ├── UsersPage.tsx
│   │   └── UserDetailPage.tsx
│   │
│   └── attendance/
│       └── AttendancePage.tsx
│
├── shared/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   ├── Table/
│   │   │   └── Select/
│   │   │
│   │   ├── data-table/
│   │   ├── form/
│   │   ├── feedback/
│   │   └── navigation/
│   │
│   ├── hooks/
│   │   ├── use-debounce.ts
│   │   ├── use-pagination.ts
│   │   └── use-media-query.ts
│   │
│   ├── lib/
│   │   ├── axios.ts
│   │   ├── query-client.ts
│   │   ├── logger.ts
│   │   └── storage.ts
│   │
│   ├── utils/
│   │   ├── date.ts
│   │   ├── currency.ts
│   │   ├── string.ts
│   │   └── file.ts
│   │
│   ├── constants/
│   │   ├── routes.ts
│   │   └── permissions.ts
│   │
│   ├── types/
│   │   ├── api.ts
│   │   └── pagination.ts
│   │
│   └── schemas/
│       └── common.schema.ts
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── styles/
│   ├── globals.css
│   ├── variables.css
│   └── theme.css
│
├── main.tsx
└── vite-env.d.ts