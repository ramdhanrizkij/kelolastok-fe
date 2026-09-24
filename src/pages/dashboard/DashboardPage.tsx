export interface DashboardPageProps {
  onNavigate?: (page: string) => void
}

export function DashboardPage({ onNavigate: _onNavigate }: DashboardPageProps) {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Selamat datang di platform manajemen inventori & stok KelolaStok.
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-xs space-y-2">
          <h2 className="text-base font-semibold text-foreground">Ringkasan Sistem</h2>
          <p className="text-sm text-muted-foreground">
            KelolaStok telah dikonfigurasi dengan arsitektur modular terkini. Silakan navigasikan ke menu Inventory & Stock untuk mengelola stok barang Anda.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
