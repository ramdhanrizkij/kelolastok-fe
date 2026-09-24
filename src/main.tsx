import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/app/App'

async function enableMocking() {
  // Aktifkan MSW jika VITE_ENABLE_MOCK bernilai "true" atau default aktif saat mode development (kecuali diset "false")
  const isMockEnabled =
    import.meta.env.VITE_ENABLE_MOCK === 'true' ||
    (import.meta.env.DEV && import.meta.env.VITE_ENABLE_MOCK !== 'false')

  if (!isMockEnabled) {
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
      <App />
    </StrictMode>,
  )
})
