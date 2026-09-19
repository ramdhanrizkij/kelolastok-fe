import { useState, useId } from 'react'
import {
  Package,
  Boxes,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Search,
  Plus,
  Minus,
  Moon,
  Sun,
  Database,
  Sparkles,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

interface InventoryItem {
  id: string
  name: string
  sku: string
  category: string
  stock: number
  minStock: number
  price: number
}

const INITIAL_ITEMS: InventoryItem[] = [
  {
    id: '1',
    name: 'Wireless Mechanical Keyboard',
    sku: 'KB-WL-01',
    category: 'Aksesoris PC',
    stock: 28,
    minStock: 10,
    price: 850000,
  },
  {
    id: '2',
    name: 'Ultra-wide Gaming Monitor 34"',
    sku: 'MN-UW-34',
    category: 'Display',
    stock: 5,
    minStock: 8,
    price: 5200000,
  },
  {
    id: '3',
    name: 'Ergonomic Mesh Office Chair',
    sku: 'CH-ERGO-09',
    category: 'Furnitur',
    stock: 14,
    minStock: 5,
    price: 1650000,
  },
  {
    id: '4',
    name: 'USB-C Multi-port Hub 8-in-1',
    sku: 'HUB-UC-08',
    category: 'Aksesoris PC',
    stock: 42,
    minStock: 15,
    price: 380000,
  },
  {
    id: '5',
    name: 'Noise Cancelling Headphone Pro',
    sku: 'AU-NCH-77',
    category: 'Audio',
    stock: 3,
    minStock: 6,
    price: 1950000,
  },
]

export default function App() {
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_ITEMS)
  const [search, setSearch] = useState('')
  const [isDark, setIsDark] = useState(true)
  const [newItemName, setNewItemName] = useState('')
  const [newItemSku, setNewItemSku] = useState('')
  const [newItemStock, setNewItemStock] = useState('')
  const [newItemCategory, setNewItemCategory] = useState('')
  const [newItemPrice, setNewItemPrice] = useState('')

  const searchInputId = useId()
  const nameInputId = useId()
  const skuInputId = useId()
  const categoryInputId = useId()
  const stockInputId = useId()
  const priceInputId = useId()

  const toggleTheme = () => {
    const nextDark = !isDark
    setIsDark(nextDark)
    if (nextDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleUpdateStock = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = Math.max(0, item.stock + delta)
          return { ...item, stock: updated }
        }
        return item
      })
    )
  }

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItemName.trim() || !newItemSku.trim()) return

    const newItem: InventoryItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      sku: newItemSku.trim().toUpperCase(),
      category: newItemCategory.trim() || 'Umum',
      stock: parseInt(newItemStock, 10) || 0,
      minStock: 5,
      price: parseInt(newItemPrice, 10) || 0,
    }

    setItems((prev) => [newItem, ...prev])
    setNewItemName('')
    setNewItemSku('')
    setNewItemStock('')
    setNewItemCategory('')
    setNewItemPrice('')
  }

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  )

  const totalSKUs = items.length
  const totalUnits = items.reduce((acc, curr) => acc + curr.stock, 0)
  const totalValuation = items.reduce(
    (acc, curr) => acc + curr.stock * curr.price,
    0
  )
  const lowStockCount = items.filter((item) => item.stock <= item.minStock).length

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Boxes className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight">Kelolastok</span>
                <Badge variant="secondary" className="text-[11px] font-medium">
                  v1.0.0
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Sistem Manajemen Inventaris & Pergudangan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Badge variant="outline" className="hidden border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 md:inline-flex gap-1.5 py-1">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              React 19 • Vite 8 • Tailwind v4
            </Badge>

            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="rounded-lg"
            >
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome & Tech Stack Banner */}
        <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-muted/40 p-6 md:p-8 shadow-sm">
          <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Sparkles className="size-3.5" /> Setup Berhasil & Siap Digunakan
              </div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Modern Inventory Dashboard
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Project Vite telah berhasil dikonfigurasi dengan React 19, Tailwind CSS v4, dan komponen shadcn UI dengan styling modern dan responsif.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href="https://ui.shadcn.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex"
              >
                <Button variant="outline" size="sm" className="gap-1.5">
                  Docs shadcn <ExternalLink className="size-3.5" />
                </Button>
              </a>
              <a
                href="https://react.dev"
                target="_blank"
                rel="noreferrer"
                className="inline-flex"
              >
                <Button variant="outline" size="sm" className="gap-1.5">
                  React 19 Docs <ExternalLink className="size-3.5" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Overview Stats Cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border/60">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="font-medium">Total SKU</CardDescription>
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Package className="size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSKUs}</div>
              <p className="mt-1 text-xs text-muted-foreground">
                Katalog produk aktif terdaftar
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="font-medium">Total Unit Fisik</CardDescription>
              <div className="rounded-lg bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400">
                <Database className="size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUnits.toLocaleString()}</div>
              <p className="mt-1 text-xs text-muted-foreground">
                Unit barang siap kirim di gudang
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="font-medium">Estimasi Nilai Stok</CardDescription>
              <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                Rp {totalValuation.toLocaleString('id-ID')}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Berdasarkan harga pokok per unit
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription className="font-medium">Perlu Restock</CardDescription>
              <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="size-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lowStockCount}</div>
              <p className="mt-1 text-xs text-amber-600 dark:text-amber-400 font-medium">
                {lowStockCount > 0 ? 'Item mendekati batas minimum' : 'Semua stok aman'}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Main Workspace: Inventory & Form */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Inventory Table / List */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-border/60">
              <CardHeader>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-lg">Daftar Inventaris</CardTitle>
                    <CardDescription>
                      Kelola jumlah stok langsung dengan tombol kontrol interaktif
                    </CardDescription>
                  </div>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                    <Input
                      id={searchInputId}
                      type="text"
                      placeholder="Cari nama, SKU, atau kategori..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-y border-border/60 bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <tr>
                        <th className="px-6 py-3">Produk & SKU</th>
                        <th className="px-4 py-3">Kategori</th>
                        <th className="px-4 py-3 text-right">Harga</th>
                        <th className="px-4 py-3 text-center">Status</th>
                        <th className="px-6 py-3 text-center">Stok</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {filteredItems.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-muted-foreground">
                            Tidak ada item yang sesuai dengan pencarian "{search}".
                          </td>
                        </tr>
                      ) : (
                        filteredItems.map((item) => {
                          const isLow = item.stock <= item.minStock
                          return (
                            <tr
                              key={item.id}
                              className="group transition-colors hover:bg-muted/30"
                            >
                              <td className="px-6 py-4">
                                <div className="font-semibold text-foreground">
                                  {item.name}
                                </div>
                                <div className="text-xs font-mono text-muted-foreground">
                                  {item.sku}
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <Badge variant="outline" className="text-[11px]">
                                  {item.category}
                                </Badge>
                              </td>
                              <td className="px-4 py-4 text-right font-medium">
                                Rp {item.price.toLocaleString('id-ID')}
                              </td>
                              <td className="px-4 py-4 text-center">
                                {isLow ? (
                                  <Badge variant="destructive" className="text-[11px]">
                                    Menipis
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="secondary"
                                    className="text-[11px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                                  >
                                    Aman
                                  </Badge>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon-xs"
                                    onClick={() => handleUpdateStock(item.id, -1)}
                                    aria-label="Kurangi Stok"
                                  >
                                    <Minus className="size-3" />
                                  </Button>
                                  <span className="w-8 text-center font-mono font-semibold">
                                    {item.stock}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="icon-xs"
                                    onClick={() => handleUpdateStock(item.id, 1)}
                                    aria-label="Tambah Stok"
                                  >
                                    <Plus className="size-3" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          )
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Add Form & System Overview */}
          <div className="space-y-6">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-base">Tambah Barang Baru</CardTitle>
                <CardDescription>
                  Form input cepat menggunakan komponen shadcn Input & Button
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddItem} className="space-y-3.5">
                  <div className="space-y-1.5">
                    <label htmlFor={nameInputId} className="text-xs font-medium text-muted-foreground">
                      Nama Produk *
                    </label>
                    <Input
                      id={nameInputId}
                      placeholder="Contoh: Barcode Scanner USB"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="space-y-1.5">
                      <label htmlFor={skuInputId} className="text-xs font-medium text-muted-foreground">
                        Kode SKU *
                      </label>
                      <Input
                        id={skuInputId}
                        placeholder="SC-USB-01"
                        value={newItemSku}
                        onChange={(e) => setNewItemSku(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor={categoryInputId} className="text-xs font-medium text-muted-foreground">
                        Kategori
                      </label>
                      <Input
                        id={categoryInputId}
                        placeholder="Hardware"
                        value={newItemCategory}
                        onChange={(e) => setNewItemCategory(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="space-y-1.5">
                      <label htmlFor={stockInputId} className="text-xs font-medium text-muted-foreground">
                        Jumlah Stok
                      </label>
                      <Input
                        id={stockInputId}
                        type="number"
                        placeholder="0"
                        value={newItemStock}
                        onChange={(e) => setNewItemStock(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor={priceInputId} className="text-xs font-medium text-muted-foreground">
                        Harga (Rp)
                      </label>
                      <Input
                        id={priceInputId}
                        type="number"
                        placeholder="150000"
                        value={newItemPrice}
                        onChange={(e) => setNewItemPrice(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full gap-1.5 mt-2">
                    <Plus className="size-4" /> Simpan ke Inventaris
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Checklist Stack */}
            <Card className="border-border/60 bg-muted/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  Status Konfigurasi
                </CardTitle>
                <CardDescription>
                  Rincian pustaka & konfigurasi yang telah terintegrasi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between py-1">
                  <span className="text-muted-foreground">Build Tool</span>
                  <Badge variant="secondary">Vite 8.3 (ESM)</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between py-1">
                  <span className="text-muted-foreground">React Core</span>
                  <Badge variant="secondary">React 19.2 (Latest)</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between py-1">
                  <span className="text-muted-foreground">Styling Engine</span>
                  <Badge variant="secondary">Tailwind CSS v4</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between py-1">
                  <span className="text-muted-foreground">UI Library</span>
                  <Badge variant="secondary">shadcn UI (Base UI)</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between py-1">
                  <span className="text-muted-foreground">Path Alias</span>
                  <code className="text-[11px] font-mono bg-muted px-1.5 py-0.5 rounded">
                    @/* &rarr; ./src/*
                  </code>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <p className="text-[11px] text-muted-foreground">
                  Gunakan <code className="font-mono text-primary">npx shadcn@latest add &lt;komponen&gt;</code> untuk menambah komponen baru.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
