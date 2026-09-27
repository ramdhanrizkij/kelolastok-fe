import * as React from "react"
import {
  Building2,
  Camera,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Store,
  UserRound,
} from "lucide-react"

import { useAuthStore } from "@/features/auth/stores/auth.store"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { cn } from "@/shared/lib/utils"

type Tab = "profile" | "company" | "security"

interface CompanyProfile {
  name: string
  type: string
  phone: string
  email: string
  address: string
  city: string
  postalCode: string
  taxId: string
}

const tabs = [
  { id: "profile" as const, label: "Profil", icon: UserRound },
  { id: "company" as const, label: "Perusahaan", icon: Building2 },
  { id: "security" as const, label: "Keamanan", icon: ShieldCheck },
]

const fieldClassName = "h-11 rounded-xl bg-background px-3"

export default function ProfileSettingsPage() {
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [activeTab, setActiveTab] = React.useState<Tab>("profile")
  const [message, setMessage] = React.useState("")
  const [showPasswords, setShowPasswords] = React.useState(false)
  const [avatar, setAvatar] = React.useState(user?.avatar || "")
  const [profile, setProfile] = React.useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
  })
  const [company, setCompany] = React.useState<CompanyProfile>(() => {
    const saved = localStorage.getItem("kelolastok-company-profile")
    if (saved) {
      try {
        return JSON.parse(saved) as CompanyProfile
      } catch {
        localStorage.removeItem("kelolastok-company-profile")
      }
    }
    return {
      name: user?.storeName || "",
      type: "Perdagangan / Retail",
      phone: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      taxId: "",
    }
  })
  const [passwords, setPasswords] = React.useState({ current: "", next: "", confirm: "" })

  const initials = (profile.name || "Pengguna")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const notify = (text: string) => {
    setMessage(text)
    window.setTimeout(() => setMessage(""), 3500)
  }

  const handleAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith("image/") || file.size > 1024 * 1024) {
      notify("Gunakan file JPG, PNG, atau WebP maksimal 1 MB.")
      event.target.value = ""
      return
    }
    const reader = new FileReader()
    reader.onload = () => setAvatar(String(reader.result))
    reader.readAsDataURL(file)
  }

  const saveProfile = (event: React.FormEvent) => {
    event.preventDefault()
    if (!user) return
    setUser({ ...user, ...profile, avatar })
    notify("Profil berhasil diperbarui.")
  }

  const saveCompany = (event: React.FormEvent) => {
    event.preventDefault()
    localStorage.setItem("kelolastok-company-profile", JSON.stringify(company))
    if (user) setUser({ ...user, storeName: company.name })
    notify("Data perusahaan berhasil diperbarui.")
  }

  const savePassword = (event: React.FormEvent) => {
    event.preventDefault()
    if (passwords.next.length < 8) {
      notify("Password baru minimal 8 karakter.")
      return
    }
    if (passwords.next !== passwords.confirm) {
      notify("Konfirmasi password tidak cocok.")
      return
    }
    setPasswords({ current: "", next: "", confirm: "" })
    notify("Password berhasil diperbarui.")
  }

  return (
    <div className="mx-auto w-full max-w-6xl pb-10">
      <div className="mb-7">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Pengaturan akun</p>
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Profil & Perusahaan</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Kelola identitas akun, informasi usaha, dan keamanan akses KelolaStok Anda.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-border/70 bg-card p-2 shadow-xs lg:sticky lg:top-24">
          <nav aria-label="Pengaturan profil" className="flex gap-1 overflow-x-auto lg:flex-col">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex min-w-max items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-colors lg:w-full",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="size-4.5" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
          <div className="mt-2 hidden rounded-xl bg-muted/50 p-4 lg:block">
            <p className="text-xs font-semibold text-foreground">Akun aktif</p>
            <p className="mt-1 truncate text-xs text-muted-foreground">{user?.email || "-"}</p>
          </div>
        </aside>

        <section className="min-w-0 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
          {activeTab === "profile" && (
            <form onSubmit={saveProfile}>
              <SectionHeader icon={UserRound} title="Informasi pribadi" description="Informasi ini digunakan untuk mengenali akun Anda di dalam sistem." />
              <div className="space-y-8 p-5 sm:p-7">
                <div className="flex flex-col gap-5 rounded-2xl border border-dashed border-border bg-muted/20 p-5 sm:flex-row sm:items-center">
                  <div className="relative w-fit">
                    <Avatar className="size-24 shadow-md ring-4 ring-background">
                      <AvatarImage src={avatar} alt={profile.name} />
                      <AvatarFallback className="bg-primary-soft text-xl font-bold text-primary">{initials}</AvatarFallback>
                    </Avatar>
                    <button type="button" onClick={() => fileInputRef.current?.click()} aria-label="Ganti foto profil" className="absolute -bottom-1 -right-1 flex size-9 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-md transition-transform hover:scale-105">
                      <Camera className="size-4" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-foreground">Foto profil</h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">JPG, PNG, atau WebP. Ukuran maksimal 1 MB.</p>
                    <div className="mt-3 flex gap-2">
                      <Button type="button" variant="outline" size="lg" onClick={() => fileInputRef.current?.click()}>Pilih foto</Button>
                      {avatar && <Button type="button" variant="ghost" size="lg" onClick={() => setAvatar("")}>Hapus</Button>}
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleAvatar} className="sr-only" />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Nama lengkap" icon={UserRound}>
                    <Input required value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} className={fieldClassName} placeholder="Nama lengkap" />
                  </Field>
                  <Field label="Username" icon={UserRound}>
                    <Input required minLength={3} value={profile.username} onChange={(event) => setProfile({ ...profile, username: event.target.value })} className={fieldClassName} placeholder="username" />
                  </Field>
                  <Field label="Email" icon={Mail} className="sm:col-span-2">
                    <Input required type="email" value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} className={fieldClassName} placeholder="nama@perusahaan.com" />
                  </Field>
                  <Field label="Peran akun" icon={ShieldCheck} className="sm:col-span-2">
                    <Input disabled value={user?.role || "Owner / Admin"} className={fieldClassName} />
                  </Field>
                </div>
              </div>
              <FormFooter message={message} />
            </form>
          )}

          {activeTab === "company" && (
            <form onSubmit={saveCompany}>
              <SectionHeader icon={Building2} title="Data perusahaan" description="Lengkapi profil usaha agar dokumen dan laporan inventori tampil akurat." />
              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-7">
                <Field label="Nama perusahaan / toko" icon={Store} className="sm:col-span-2">
                  <Input required value={company.name} onChange={(event) => setCompany({ ...company, name: event.target.value })} className={fieldClassName} placeholder="Contoh: Toko Berkah Mandiri" />
                </Field>
                <Field label="Jenis usaha" icon={Building2}>
                  <select required value={company.type} onChange={(event) => setCompany({ ...company, type: event.target.value })} className={cn(fieldClassName, "w-full border border-input text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50 dark:bg-input/30")}>
                    <option>Perdagangan / Retail</option>
                    <option>Manufaktur</option>
                    <option>Food & Beverage</option>
                    <option>Jasa</option>
                    <option>Lainnya</option>
                  </select>
                </Field>
                <Field label="NPWP / NIB" icon={ShieldCheck}>
                  <Input value={company.taxId} onChange={(event) => setCompany({ ...company, taxId: event.target.value })} className={fieldClassName} placeholder="Opsional" />
                </Field>
                <Field label="Nomor telepon" icon={Phone}>
                  <Input type="tel" value={company.phone} onChange={(event) => setCompany({ ...company, phone: event.target.value })} className={fieldClassName} placeholder="08xxxxxxxxxx" />
                </Field>
                <Field label="Email perusahaan" icon={Mail}>
                  <Input type="email" value={company.email} onChange={(event) => setCompany({ ...company, email: event.target.value })} className={fieldClassName} placeholder="usaha@email.com" />
                </Field>
                <Field label="Alamat usaha" icon={MapPin} className="sm:col-span-2">
                  <textarea required rows={4} value={company.address} onChange={(event) => setCompany({ ...company, address: event.target.value })} className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/50 dark:bg-input/30" placeholder="Nama jalan, nomor bangunan, kecamatan" />
                </Field>
                <Field label="Kota / Kabupaten" icon={MapPin}>
                  <Input required value={company.city} onChange={(event) => setCompany({ ...company, city: event.target.value })} className={fieldClassName} placeholder="Kota / Kabupaten" />
                </Field>
                <Field label="Kode pos" icon={MapPin}>
                  <Input inputMode="numeric" value={company.postalCode} onChange={(event) => setCompany({ ...company, postalCode: event.target.value })} className={fieldClassName} placeholder="12345" />
                </Field>
              </div>
              <FormFooter message={message} />
            </form>
          )}

          {activeTab === "security" && (
            <form onSubmit={savePassword}>
              <SectionHeader icon={LockKeyhole} title="Ubah password" description="Gunakan minimal 8 karakter dan hindari password yang pernah digunakan." />
              <div className="space-y-5 p-5 sm:p-7">
                <div className="rounded-2xl border border-primary/15 bg-primary-soft/40 p-4 text-sm leading-6 text-foreground">
                  <div className="flex gap-3"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" /><p>Setelah password diubah, gunakan password baru saat login berikutnya.</p></div>
                </div>
                <PasswordField label="Password saat ini" value={passwords.current} visible={showPasswords} onChange={(value) => setPasswords({ ...passwords, current: value })} />
                <PasswordField label="Password baru" value={passwords.next} visible={showPasswords} onChange={(value) => setPasswords({ ...passwords, next: value })} />
                <PasswordField label="Konfirmasi password baru" value={passwords.confirm} visible={showPasswords} onChange={(value) => setPasswords({ ...passwords, confirm: value })} />
                <button type="button" onClick={() => setShowPasswords(!showPasswords)} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                  {showPasswords ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  {showPasswords ? "Sembunyikan password" : "Tampilkan password"}
                </button>
              </div>
              <FormFooter message={message} label="Ubah password" />
            </form>
          )}
        </section>
      </div>
    </div>
  )
}

function SectionHeader({ icon: Icon, title, description }: { icon: React.ComponentType<{ className?: string }>; title: string; description: string }) {
  return (
    <header className="flex items-start gap-4 border-b border-border/70 px-5 py-5 sm:px-7">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary"><Icon className="size-5" /></div>
      <div><h2 className="font-bold text-foreground">{title}</h2><p className="mt-1 text-sm leading-5 text-muted-foreground">{description}</p></div>
    </header>
  )
}

function Field({ label, icon: Icon, className, children }: { label: string; icon: React.ComponentType<{ className?: string }>; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-foreground"><Icon className="size-4 text-muted-foreground" />{label}</Label>
      {children}
    </div>
  )
}

function PasswordField({ label, value, visible, onChange }: { label: string; value: string; visible: boolean; onChange: (value: string) => void }) {
  return (
    <Field label={label} icon={LockKeyhole}>
      <Input required minLength={8} type={visible ? "text" : "password"} value={value} onChange={(event) => onChange(event.target.value)} className={fieldClassName} autoComplete={label === "Password saat ini" ? "current-password" : "new-password"} />
    </Field>
  )
}

function FormFooter({ message, label = "Simpan perubahan" }: { message: string; label?: string }) {
  return (
    <footer className="flex min-h-20 flex-col gap-3 border-t border-border/70 bg-muted/15 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
      <div aria-live="polite" className="flex min-h-5 items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
        {message && <><CheckCircle2 className="size-4" />{message}</>}
      </div>
      <Button type="submit" size="lg" className="h-10 px-5">{label}</Button>
    </footer>
  )
}
