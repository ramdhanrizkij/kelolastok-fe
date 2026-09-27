import * as React from "react"
import {
  Check,
  CheckCircle2,
  Clipboard,
  Moon,
  Palette,
  PanelLeft,
  RotateCcw,
  Sun,
} from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { Switch } from "@/shared/components/ui/switch"
import { THEME_CONFIG, THEME_VARIANTS } from "@/shared/config/theme.config"
import { useTheme } from "@/shared/hooks/use-theme"
import { cn } from "@/shared/lib/utils"

export default function ThemeConfigurationPage() {
  const { theme, isDark, variant, themedSidebar, setTheme, setVariant, setThemedSidebar } = useTheme()
  const [copied, setCopied] = React.useState(false)
  const selectedVariant = THEME_VARIANTS.find((item) => item.value === variant) ?? THEME_VARIANTS[0]

  const copyConfig = async () => {
    await navigator.clipboard.writeText(JSON.stringify({ theme, variant, themedSidebar }, null, 2))
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  const resetConfig = () => {
    setTheme("light")
    setVariant(THEME_CONFIG.defaultVariant)
    setThemedSidebar(THEME_CONFIG.defaultThemedSidebar)
  }

  return (
    <div className="mx-auto w-full max-w-6xl pb-10">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">System Configuration</p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Theme Configuration</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Atur mode tampilan, warna brand, dan gaya sidebar KelolaStok.
          </p>
        </div>
        <Button type="button" variant="outline" size="lg" onClick={resetConfig}>
          <RotateCcw className="size-4" /> Reset default
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <SettingCard icon={Moon} title="Mode tampilan" description="Pilih tampilan terang atau gelap sesuai kebutuhan.">
            <div className="flex items-center justify-between gap-5 rounded-xl border border-border bg-muted/20 p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  {isDark ? <Moon className="size-5" /> : <Sun className="size-5" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Dark Mode</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Switch theme to dark mode</p>
                </div>
              </div>
              <Switch checked={isDark} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} aria-label="Aktifkan dark mode" />
            </div>
          </SettingCard>

          <SettingCard icon={PanelLeft} title="Nav Mode" description="Pilih sidebar netral atau sidebar berwarna tema.">
            <div className="grid gap-3 sm:grid-cols-2">
              <NavOption label="Default" description="Sidebar putih dan netral" selected={!themedSidebar} onClick={() => setThemedSidebar(false)} themed={false} />
              <NavOption label="Themed" description="Rail mengikuti warna tema" selected={themedSidebar} onClick={() => setThemedSidebar(true)} themed />
            </div>
          </SettingCard>

          <SettingCard icon={Palette} title="Warna tema" description="Warna diterapkan ke komponen brand dan chart utama.">
            <div className="grid gap-3 sm:grid-cols-2">
              {THEME_VARIANTS.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setVariant(item.value)}
                  aria-pressed={variant === item.value}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border p-4 text-left transition-all",
                    variant === item.value
                      ? "border-primary bg-primary-soft ring-2 ring-primary/15"
                      : "border-border hover:border-muted-foreground/40 hover:bg-muted/40"
                  )}
                >
                  <span className="size-9 rounded-xl shadow-sm ring-1 ring-black/5" style={{ backgroundColor: item.color }} />
                  <span className="flex-1">
                    <span className="block text-sm font-semibold text-foreground">{item.label}</span>
                    <span className="mt-0.5 block font-mono text-xs text-muted-foreground">{item.color}</span>
                  </span>
                  {variant === item.value && <CheckCircle2 className="size-5 text-primary" />}
                </button>
              ))}
            </div>
          </SettingCard>
        </div>

        <aside className="h-fit overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:sticky lg:top-24">
          <div className="border-b border-border px-5 py-4">
            <h2 className="font-bold text-foreground">Live Preview</h2>
            <p className="mt-1 text-xs text-muted-foreground">Perubahan tersimpan otomatis.</p>
          </div>
          <div className="p-5">
            <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
              <div className="flex h-8 items-center gap-1.5 border-b border-border px-3">
                <span className="size-2 rounded-full bg-danger" />
                <span className="size-2 rounded-full bg-warning" />
                <span className="size-2 rounded-full bg-success" />
              </div>
              <div className="flex h-64">
                <div className={cn("flex w-12 flex-col items-center gap-3 py-3", themedSidebar ? "bg-primary" : "border-r border-border bg-sidebar")}>
                  <span className={cn("size-7 rounded-lg", themedSidebar ? "bg-white/25" : "bg-primary")} />
                  <span className={cn("flex size-7 items-center justify-center rounded-lg", themedSidebar ? "bg-black/20 text-white" : "bg-primary-soft text-primary")}><PanelLeft className="size-3.5" /></span>
                  <span className={cn("size-7 rounded-lg", themedSidebar ? "bg-white/10" : "bg-muted")} />
                </div>
                <div className="w-24 border-r border-border bg-sidebar p-2.5">
                  <div className="h-2.5 w-14 rounded bg-foreground/15" />
                  <div className="mt-5 h-6 rounded-md bg-primary-soft" />
                  <div className="mt-2 h-6 rounded-md bg-muted" />
                  <div className="mt-2 h-6 rounded-md bg-muted" />
                </div>
                <div className="flex-1 p-3">
                  <div className="h-2.5 w-20 rounded bg-foreground/15" />
                  <div className="mt-4 rounded-lg border border-border bg-card p-3">
                    <div className="h-2 w-14 rounded bg-muted-foreground/20" />
                    <div className="mt-2 h-5 w-20 rounded bg-foreground/10" />
                  </div>
                  <div className="mt-3 flex gap-2">
                    <div className="h-7 flex-1 rounded-md bg-primary" />
                    <div className="h-7 w-8 rounded-md bg-primary-soft" />
                  </div>
                </div>
              </div>
            </div>

            <dl className="mt-5 space-y-3 text-sm">
              <SummaryRow label="Mode" value={isDark ? "Dark" : "Light"} />
              <SummaryRow label="Sidebar" value={themedSidebar ? "Themed" : "Default"} />
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Theme</dt>
                <dd className="flex items-center gap-2 font-semibold text-foreground"><span className="size-3 rounded-full" style={{ backgroundColor: selectedVariant.color }} />{selectedVariant.label}</dd>
              </div>
            </dl>
          </div>
          <div className="border-t border-border bg-muted/15 p-5">
            <Button type="button" size="lg" className="h-11 w-full" onClick={copyConfig}>
              {copied ? <Check className="size-4" /> : <Clipboard className="size-4" />}
              {copied ? "Config tersalin" : "Copy config"}
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}

function SettingCard({ icon: Icon, title, description, children }: { icon: React.ComponentType<{ className?: string }>; title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <header className="flex items-start gap-3 border-b border-border px-5 py-4 sm:px-6">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary"><Icon className="size-4.5" /></div>
        <div><h2 className="font-bold text-foreground">{title}</h2><p className="mt-1 text-sm text-muted-foreground">{description}</p></div>
      </header>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  )
}

function NavOption({ label, description, selected, themed, onClick }: { label: string; description: string; selected: boolean; themed: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={selected} className={cn("rounded-xl border p-3 text-left transition-all", selected ? "border-primary bg-primary-soft ring-2 ring-primary/15" : "border-border hover:bg-muted/40")}>
      <div className="mb-3 flex h-20 overflow-hidden rounded-lg border border-border bg-background">
        <div className={cn("w-5", themed ? "bg-primary" : "border-r border-border bg-sidebar")} />
        <div className="w-8 border-r border-border bg-sidebar p-1"><div className="mt-2 h-1.5 rounded bg-foreground/15" /><div className="mt-2 h-3 rounded bg-primary-soft" /></div>
        <div className="flex-1 bg-muted/30" />
      </div>
      <div className="flex items-center gap-2"><span className={cn("flex size-4 items-center justify-center rounded-full border", selected && "border-primary bg-primary text-primary-foreground")}>{selected && <Check className="size-3" />}</span><span className="text-sm font-semibold text-foreground">{label}</span></div>
      <p className="mt-1 pl-6 text-xs text-muted-foreground">{description}</p>
    </button>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4"><dt className="text-muted-foreground">{label}</dt><dd className="font-semibold text-foreground">{value}</dd></div>
}
