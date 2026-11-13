import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

export interface InputProps extends React.ComponentProps<"input"> {
  sizeVariant?: "default" | "sm" | "lg"
}

function Input({ className, type, sizeVariant = "default", ...props }: InputProps) {
  // Bytecode Design System Input Sizes:
  // sm: 36px height, 12px horizontal padding
  // default: 40px height, 12px horizontal padding, 14px font, 6px radius
  // lg: 48px height, 14px horizontal padding, 16px font
  const sizeClasses = {
    sm: "h-9 px-3 py-1.5 text-[13px] rounded-md",
    default: "h-10 px-3 py-2 text-sm rounded-md",
    lg: "h-12 px-3.5 py-2.5 text-base rounded-md",
  }

  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "w-full min-w-0 border border-input bg-background transition-colors outline-none",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        "placeholder:text-muted-foreground/60 text-foreground",
        "focus:border-slate-300 dark:focus:border-slate-600 focus:ring-3 focus:ring-primary/20 focus:outline-none",
        "focus-visible:border-slate-300 dark:focus-visible:border-slate-600 focus-visible:ring-3 focus-visible:ring-primary/20 focus-visible:outline-none",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        "dark:bg-card/40 dark:disabled:bg-muted/40 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/30",
        sizeClasses[sizeVariant],
        className
      )}
      {...props}
    />
  )
}

export { Input }
