import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

export interface InputProps extends React.ComponentProps<"input"> {
  sizeVariant?: "default" | "sm" | "lg"
}

function Input({ className, type, sizeVariant = "default", ...props }: InputProps) {
  const sizeClasses = {
    sm: "h-9 px-3 py-1.5 text-xs rounded-md",
    default: "h-10.5 px-3.5 py-2 text-sm rounded-lg",
    lg: "h-12 px-4 py-3 text-base rounded-xl",
  }

  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "w-full min-w-0 border border-input bg-background/50 transition-colors outline-none",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        "placeholder:text-muted-foreground/60 text-foreground",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/25",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        "dark:bg-input/20 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        sizeClasses[sizeVariant],
        className
      )}
      {...props}
    />
  )
}

export { Input }
