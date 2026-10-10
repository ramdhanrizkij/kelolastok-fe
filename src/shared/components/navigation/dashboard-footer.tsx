export function DashboardFooter() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-background/80 py-4 px-4 md:px-6 lg:px-8 backdrop-blur-xs">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <p className="font-medium text-foreground/80">
          @copyright 2026 Bytecode.id
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground/70">
          <span>KelolaStok Dashboard</span>
        </div>
      </div>
    </footer>
  )
}

export default DashboardFooter
