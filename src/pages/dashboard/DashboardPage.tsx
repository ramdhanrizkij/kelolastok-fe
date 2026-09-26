import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import Chart from "react-apexcharts"
import type { ApexOptions } from "apexcharts"
import {
  TrendingUp,
  Package,
  AlertTriangle,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  Boxes,
  Warehouse,
  Plus,
  FileSpreadsheet,
  CheckCircle2,
  Calendar,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react"

import { ROUTES } from "@/shared/constants/routes"
import { useAuthStore } from "@/features/auth/stores/auth.store"
import { cn } from "@/shared/lib/utils"

export function DashboardPage() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const [period, setPeriod] = React.useState<"7d" | "30d" | "this_month" | "this_year">("this_month")

  // Theme detector for ApexCharts
  const [isDark, setIsDark] = React.useState(() => {
    return typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  })

  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"))
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  // Currency formatter
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val)
  }

  // --- 1. APEXCHARTS CONFIG: INBOUND VS OUTBOUND TREND (Area Chart) ---
  const movementChartOptions: ApexOptions = React.useMemo(() => ({
    chart: {
      type: "area",
      height: 320,
      toolbar: { show: false },
      fontFamily: "inherit",
      background: "transparent",
      animations: {
        enabled: true,
        speed: 500,
      },
    },
    theme: {
      mode: isDark ? "dark" : "light",
    },
    colors: ["#2563eb", "#10b981"],
    stroke: {
      curve: "smooth",
      width: 2.5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: isDark ? 0.45 : 0.35,
        opacityTo: 0.05,
        stops: [0, 95, 100],
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: isDark ? "#94a3b8" : "#64748b",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => `${val.toLocaleString()} Unit`,
        style: {
          colors: isDark ? "#94a3b8" : "#64748b",
          fontSize: "11px",
        },
      },
    },
    grid: {
      borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
      strokeDashArray: 4,
      padding: { top: 10, right: 10, bottom: 0, left: 10 },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      y: {
        formatter: (val: number) => `${val.toLocaleString()} Unit`,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      fontSize: "12px",
      labels: {
        colors: isDark ? "#cbd5e1" : "#475569",
      },
      markers: {
        size: 5,
      },
    },
  }), [isDark])

  const movementSeries = React.useMemo(() => [
    {
      name: "Barang Masuk (Inbound)",
      data: period === "7d" ? [320, 410, 390, 520, 480, 610, 590] : [1850, 2240, 1980, 2750, 3100, 2890, 3420],
    },
    {
      name: "Barang Keluar (Outbound)",
      data: period === "7d" ? [290, 380, 370, 460, 450, 550, 540] : [1620, 1950, 2100, 2480, 2800, 3050, 3280],
    },
  ], [period])

  // --- 2. APEXCHARTS CONFIG: CATEGORY COMPOSITION (Donut Chart) ---
  const categoryChartOptions: ApexOptions = React.useMemo(() => ({
    chart: {
      type: "donut",
      height: 320,
      fontFamily: "inherit",
      background: "transparent",
    },
    theme: {
      mode: isDark ? "dark" : "light",
    },
    labels: [
      "Elektronik & Gadget",
      "Pakaian & Tekstil",
      "Bahan Baku & F&B",
      "Perabotan & Rumah",
      "Kosmetik & Perawatan",
    ],
    colors: ["#2563eb", "#06b6d4", "#10b981", "#f59e0b", "#8b5cf6"],
    stroke: {
      width: 2,
      colors: [isDark ? "#0f172a" : "#ffffff"],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      fontSize: "12px",
      labels: {
        colors: isDark ? "#cbd5e1" : "#475569",
      },
      itemMargin: { horizontal: 8, vertical: 4 },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "72%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "12px",
              color: isDark ? "#94a3b8" : "#64748b",
            },
            value: {
              show: true,
              fontSize: "18px",
              fontWeight: 700,
              color: isDark ? "#f8fafc" : "#0f172a",
              formatter: (val: string) => `${Number(val)}%`,
            },
            total: {
              show: true,
              label: "Total Nilai",
              fontSize: "12px",
              color: isDark ? "#94a3b8" : "#64748b",
              formatter: () => "Rp 1.48 M",
            },
          },
        },
      },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      y: {
        formatter: (val: number) => `${val}% dari Total Inventori`,
      },
    },
  }), [isDark])

  const categorySeries = [36, 25, 19, 12, 8]

  // --- 3. APEXCHARTS CONFIG: WAREHOUSE UTILIZATION (Horizontal Bar Chart) ---
  const warehouseChartOptions: ApexOptions = React.useMemo(() => ({
    chart: {
      type: "bar",
      height: 250,
      toolbar: { show: false },
      fontFamily: "inherit",
      background: "transparent",
    },
    theme: {
      mode: isDark ? "dark" : "light",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
        barHeight: "55%",
        distributed: true,
      },
    },
    colors: ["#2563eb", "#3b82f6", "#06b6d4", "#10b981"],
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: {
        colors: ["#ffffff"],
        fontSize: "11px",
        fontWeight: 600,
      },
      formatter: (val: number) => `${val}% Terpakai`,
      offsetX: 10,
    },
    xaxis: {
      categories: [
        "Gudang Utama Jakarta",
        "Hub Distribusi Surabaya",
        "Gudang Transit Bandung",
        "Gudang Retur & Sortir",
      ],
      max: 100,
      labels: {
        formatter: (val: string) => `${val}%`,
        style: {
          colors: isDark ? "#94a3b8" : "#64748b",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? "#e2e8f0" : "#1e293b",
          fontWeight: 500,
        },
      },
    },
    grid: {
      borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)",
      strokeDashArray: 4,
    },
    legend: { show: false },
    tooltip: {
      theme: isDark ? "dark" : "light",
      y: {
        formatter: (val: number) => `${val}% Kapasitas Ruang Terisi`,
      },
    },
  }), [isDark])

  const warehouseSeries = [
    {
      name: "Tingkat Utilisasi",
      data: [86, 68, 48, 28],
    },
  ]

  // --- 4. APEXCHARTS CONFIG: INVENTORY HEALTH (Radial Bar Gauge) ---
  const healthChartOptions: ApexOptions = React.useMemo(() => ({
    chart: {
      type: "radialBar",
      height: 250,
      fontFamily: "inherit",
      background: "transparent",
    },
    theme: {
      mode: isDark ? "dark" : "light",
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          size: "68%",
        },
        track: {
          background: isDark ? "rgba(255, 255, 255, 0.08)" : "#f1f5f9",
          strokeWidth: "100%",
        },
        dataLabels: {
          name: {
            show: true,
            color: isDark ? "#94a3b8" : "#64748b",
            fontSize: "12px",
            offsetY: 20,
          },
          value: {
            show: true,
            color: isDark ? "#f8fafc" : "#0f172a",
            fontSize: "26px",
            fontWeight: 800,
            offsetY: -16,
            formatter: (val: number) => `${val}/100`,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#10b981"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    colors: ["#2563eb"],
    stroke: {
      dashArray: 4,
    },
    labels: ["Skor Kesehatan"],
  }), [isDark])

  const healthSeries = [92]

  // Urgent low stock items data
  const urgentLowStock = [
    {
      sku: "SKU-EL-001",
      name: "Mouse Wireless Ergonomis Pro",
      category: "Elektronik",
      stock: 4,
      min: 20,
      status: "Kritis",
      warehouse: "Gudang Utama Jakarta",
    },
    {
      sku: "SKU-FB-012",
      name: "Biji Kopi Arabika Gayo 1kg",
      category: "Bahan Baku",
      stock: 8,
      min: 25,
      status: "Menipis",
      warehouse: "Gudang Utama Jakarta",
    },
    {
      sku: "SKU-PK-088",
      name: "Kaos Polos Cotton Combed 30s L",
      category: "Pakaian",
      stock: 12,
      min: 30,
      status: "Menipis",
      warehouse: "Hub Surabaya",
    },
    {
      sku: "SKU-PR-005",
      name: "Organizer Rak Akrilik 3 Susun",
      category: "Perabotan",
      stock: 3,
      min: 15,
      status: "Kritis",
      warehouse: "Gudang Transit Bandung",
    },
  ]

  // Recent movement transactions
  const recentActivities = [
    {
      id: "ACT-101",
      type: "inbound",
      title: "Penerimaan PO #PO-2026-089",
      desc: "150 Unit Biji Kopi dari PT Sumber Hasil Alam",
      time: "10 menit yang lalu",
      status: "Selesai",
    },
    {
      id: "ACT-102",
      type: "outbound",
      title: "Pengiriman DO #DO-2026-342",
      desc: "24 Unit Mouse Wireless dikirim via SiCepat",
      time: "35 menit yang lalu",
      status: "Dalam Pengiriman",
    },
    {
      id: "ACT-103",
      type: "transfer",
      title: "Transfer Stok Antar Gudang",
      desc: "50 Unit Kaos Polos: Jakarta → Hub Surabaya",
      time: "2 jam yang lalu",
      status: "Transit",
    },
    {
      id: "ACT-104",
      type: "inbound",
      title: "Penerimaan PO #PO-2026-087",
      desc: "80 Unit Organizer Rak Akrilik tiba di gudang",
      time: "4 jam yang lalu",
      status: "Selesai",
    },
  ]

  return (
    <div className="space-y-6 pb-8">
      {/* 1. Header Banner & Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-card border border-border/80 p-5 sm:p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <Zap className="size-3" /> Live Analytics
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="size-3" /> {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1.5">
            Selamat Datang, {user?.name || "Budi Santoso"} 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Berikut ringkasan performa inventori, pergerakan stok, dan status operasional gudang hari ini.
          </p>
        </div>

        {/* Filter Periode & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex p-1 bg-muted/60 rounded-xl border border-border/70 text-xs">
            <button
              type="button"
              onClick={() => setPeriod("7d")}
              className={cn(
                "px-2.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer",
                period === "7d" ? "bg-background text-foreground shadow-2xs font-semibold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              7 Hari
            </button>
            <button
              type="button"
              onClick={() => setPeriod("this_month")}
              className={cn(
                "px-2.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer",
                period === "this_month" ? "bg-background text-foreground shadow-2xs font-semibold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Bulan Ini
            </button>
            <button
              type="button"
              onClick={() => setPeriod("this_year")}
              className={cn(
                "px-2.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer",
                period === "this_year" ? "bg-background text-foreground shadow-2xs font-semibold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Tahun Ini
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={ROUTES.INBOUND.RECEIVING}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="size-3.5" />
              <span>Barang Masuk</span>
            </Link>
            <Link
              to={ROUTES.OUTBOUND.DELIVERIES}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border bg-background hover:bg-muted text-foreground text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
            >
              <ArrowUpFromLine className="size-3.5" />
              <span>Pengiriman</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Executive KPI Summary Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Nilai Stok */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs transition-all hover:border-primary/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total Nilai Stok
            </span>
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Boxes className="size-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold tracking-tight text-foreground block">
              {formatIDR(1485250000)}
            </span>
            <div className="flex items-center gap-1.5 mt-2 text-xs">
              <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
                <TrendingUp className="size-3" /> +12.4%
              </span>
              <span className="text-muted-foreground">vs bulan lalu</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Total SKU Aktif */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs transition-all hover:border-primary/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total SKU Barang
            </span>
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Package className="size-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold tracking-tight text-foreground block">
              1.248 <span className="text-sm font-normal text-muted-foreground">SKU</span>
            </span>
            <div className="flex items-center gap-1.5 mt-2 text-xs">
              <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
                <CheckCircle2 className="size-3" /> 98.6%
              </span>
              <span className="text-muted-foreground">tersedia di gudang</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Peringatan Stok Rendah */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs transition-all hover:border-rose-500/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Peringatan Stok
            </span>
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="size-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold tracking-tight text-foreground block">
              18 <span className="text-sm font-normal text-muted-foreground">Produk</span>
            </span>
            <div className="flex items-center gap-1.5 mt-2 text-xs">
              <span className="inline-flex items-center gap-0.5 text-rose-600 dark:text-rose-400 font-semibold bg-rose-500/10 px-1.5 py-0.5 rounded-md">
                4 Kritis
              </span>
              <span className="text-muted-foreground">perlu segera restok</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Perputaran Persediaan (Turnover) */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs transition-all hover:border-primary/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Perputaran Stok
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <RefreshCw className="size-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold tracking-tight text-foreground block">
              5.2x <span className="text-sm font-normal text-muted-foreground">/ Tahun</span>
            </span>
            <div className="flex items-center gap-1.5 mt-2 text-xs">
              <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded-md">
                <Sparkles className="size-3" /> Optimal
              </span>
              <span className="text-muted-foreground">siklus ~28 hari</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Analytics Grid (Charts Section) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Chart: Tren Mutasi Inbound vs Outbound (Span 8 Cols) */}
        <div className="lg:col-span-8 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base font-bold text-foreground tracking-tight flex items-center gap-2">
                Tren Mutasi Stok Barang Masuk vs Keluar
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Perbandingan volume penerimaan dari pemasok dan pengiriman ke pelanggan
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-blue-600" />
                <span className="text-muted-foreground">Inbound: <strong className="text-foreground">3.420</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-emerald-500" />
                <span className="text-muted-foreground">Outbound: <strong className="text-foreground">3.280</strong></span>
              </div>
            </div>
          </div>

          <div className="w-full">
            <Chart
              options={movementChartOptions}
              series={movementSeries}
              type="area"
              height={320}
            />
          </div>
        </div>

        {/* Right Chart: Komposisi Nilai per Kategori (Span 4 Cols) */}
        <div className="lg:col-span-4 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-foreground tracking-tight">
              Komposisi Nilai Stok
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Proporsi valuasi modal persediaan per kategori produk
            </p>
          </div>

          <div className="my-auto py-2">
            <Chart
              options={categoryChartOptions}
              series={categorySeries}
              type="donut"
              height={310}
            />
          </div>
        </div>
      </div>

      {/* 4. Second Analytics Row: Warehouse Capacity & Health Score */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Warehouse Capacity Utilization (Span 7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-foreground tracking-tight flex items-center gap-2">
                <Warehouse className="size-4.5 text-primary" />
                Utilisasi Kapasitas Gudang
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Persentase okupansi ruang simpan di setiap titik fasilitas
              </p>
            </div>
            <Link
              to={ROUTES.WAREHOUSES.CAPACITY}
              className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              Detail Gudang <ChevronRight className="size-3.5" />
            </Link>
          </div>

          <Chart
            options={warehouseChartOptions}
            series={warehouseSeries}
            type="bar"
            height={240}
          />
        </div>

        {/* Inventory Health Score (Span 5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-base font-bold text-foreground tracking-tight flex items-center gap-2">
                <ShieldCheck className="size-4.5 text-emerald-600 dark:text-emerald-400" />
                Indeks Kesehatan Inventori
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Skor gabungan akurasi, perputaran, dan efisiensi stok
              </p>
            </div>
          </div>

          <div className="py-1">
            <Chart
              options={healthChartOptions}
              series={healthSeries}
              type="radialBar"
              height={230}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/60 text-center text-xs">
            <div className="p-2 rounded-xl bg-muted/40">
              <span className="text-[11px] text-muted-foreground block">Akurasi Opname</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">99.4%</span>
            </div>
            <div className="p-2 rounded-xl bg-muted/40">
              <span className="text-[11px] text-muted-foreground block">Dead Stock</span>
              <span className="font-bold text-foreground text-sm">2.1%</span>
            </div>
            <div className="p-2 rounded-xl bg-muted/40">
              <span className="text-[11px] text-muted-foreground block">On-Time Deliver</span>
              <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">98.2%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom Operations Row: Urgent Restock Table & Recent Movements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Urgent Low Stock Alerts Table (Span 7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-foreground tracking-tight flex items-center gap-2">
                  <AlertTriangle className="size-4.5 text-rose-500" />
                  Peringatan Stok Menipis Perlu Restok
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Produk yang stok fisiknya telah mencapai batas aman minimum
                </p>
              </div>
              <Link
                to={ROUTES.INVENTORY.ALERTS}
                className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
              >
                Lihat Semua (18) <ChevronRight className="size-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border/70 text-muted-foreground font-semibold">
                    <th className="pb-2.5">Produk & SKU</th>
                    <th className="pb-2.5">Gudang</th>
                    <th className="pb-2.5 text-center">Sisa Stok</th>
                    <th className="pb-2.5 text-center">Min. Stok</th>
                    <th className="pb-2.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {urgentLowStock.map((item) => (
                    <tr key={item.sku} className="hover:bg-muted/40 transition-colors">
                      <td className="py-3">
                        <div className="font-semibold text-foreground">{item.name}</div>
                        <div className="font-mono text-[10px] text-muted-foreground">{item.sku} • {item.category}</div>
                      </td>
                      <td className="py-3 text-muted-foreground text-[11px]">{item.warehouse}</td>
                      <td className="py-3 text-center">
                        <span className="font-bold text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-md bg-rose-500/10">
                          {item.stock} Unit
                        </span>
                      </td>
                      <td className="py-3 text-center text-muted-foreground font-medium">
                        {item.min} Unit
                      </td>
                      <td className="py-3 text-right">
                        <button
                          type="button"
                          onClick={() => navigate(ROUTES.INBOUND.PURCHASE_ORDERS)}
                          className="px-2.5 py-1 rounded-lg bg-primary hover:bg-primary-active text-primary-foreground text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                          Restok
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Live Activity Feed (Span 5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-foreground tracking-tight flex items-center gap-2">
                  <Clock className="size-4.5 text-primary" />
                  Aktivitas Mutasi Terkini
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Catatan transaksi keluar masuk barang secara real-time
                </p>
              </div>
              <Link
                to={ROUTES.REPORTS.MOVEMENTS}
                className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
              >
                Riwayat <ChevronRight className="size-3.5" />
              </Link>
            </div>

            <div className="space-y-3.5">
              {recentActivities.map((act) => (
                <div
                  key={act.id}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={cn(
                      "p-2 rounded-xl shrink-0 mt-0.5",
                      act.type === "inbound"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : act.type === "outbound"
                        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                        : "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                    )}
                  >
                    {act.type === "inbound" ? (
                      <ArrowDownToLine className="size-4" />
                    ) : act.type === "outbound" ? (
                      <ArrowUpFromLine className="size-4" />
                    ) : (
                      <ArrowLeftRight className="size-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-semibold text-foreground truncate">
                        {act.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                        {act.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                      {act.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-border/60">
            <Link
              to={ROUTES.INVENTORY.OPNAME}
              className="w-full py-2 px-3 rounded-xl border border-dashed border-border bg-muted/30 hover:bg-muted/60 text-xs font-medium text-foreground flex items-center justify-center gap-2 transition-colors"
            >
              <FileSpreadsheet className="size-3.5 text-primary" />
              <span>Mulai Sesi Stock Opname Baru</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
