import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@/components/theme-provider'
import './index.css'
import App from './App.tsx'

async function enableMocking() {
  // Hanya aktifkan MSW jika VITE_ENABLE_MOCK diatur ke "true" di .env
  if (import.meta.env.VITE_ENABLE_MOCK !== 'true') {
    return
  }

  const { worker } = await import('./mocks/browser')

  // Mulai worker dan abaikan request non-API (seperti static assets, woff2, gambar)
  return worker.start({
    onUnhandledRequest: 'bypass',
  })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StrictMode>,
  )
})
