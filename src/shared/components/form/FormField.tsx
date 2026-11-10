import * as React from "react"
import { cn } from "@/shared/lib/utils"

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    return (
      <div className="space-y-2 w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-semibold text-foreground tracking-tight">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full h-10.5 rounded-lg border border-input bg-background/50 px-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-ring focus:ring-3 focus:ring-ring/25 focus:outline-none",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20",
            className
          )}
          {...props}
        />
        {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
        {error && <p className="text-xs text-destructive font-medium">{error}</p>}
      </div>
    )
  }
)

FormField.displayName = "FormField"

export default FormField
