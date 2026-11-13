import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-all duration-150 outline-none select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // 1. Primary Solid Brand (Main action)
        default:
          "bg-primary text-primary-foreground hover:bg-primary-active shadow-xs shadow-primary/20",
        // 2. Outline (Alternative action with visible boundary)
        outline:
          "border border-border bg-background text-foreground hover:bg-muted/70 hover:text-foreground shadow-xs dark:border-border/70 dark:bg-card/40 dark:hover:bg-muted/60",
        // 3. Secondary (Supporting action)
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs",
        // 4. Ghost (Low-emphasis action)
        ghost:
          "text-muted-foreground hover:text-foreground hover:bg-muted/60",
        // 5. Solid Dark
        dark:
          "bg-foreground text-background hover:bg-foreground/90 shadow-xs",
        // 6. Soft Primary Tint
        soft:
          "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20",
        // 7. Destructive (Delete or irreversible action)
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-xs shadow-destructive/20",
        // 8. Destructive Soft Tint
        "destructive-soft":
          "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20",
        // 9. Success
        success:
          "bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs shadow-emerald-600/20",
        // 10. Success Soft Tint
        "success-soft":
          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20",
        // 11. Warning
        warning:
          "bg-amber-500 text-white hover:bg-amber-600 shadow-xs shadow-amber-500/20",
        // 12. Warning Soft Tint
        "warning-soft":
          "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20",
        // 13. Purple
        purple:
          "bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs shadow-indigo-600/20",
        // 14. Purple Soft Tint
        "purple-soft":
          "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20",
        // 15. Link
        link:
          "text-primary underline-offset-4 hover:underline p-0 h-auto font-medium active:scale-100",
      },
      size: {
        // Bytecode Design System Button Dimensions:
        // Small: 32px height, 12px horizontal padding, 13px font
        sm: "h-8 px-3 py-1.5 text-[13px] font-medium rounded-md gap-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        // Medium / Default: 36px height, 16px horizontal padding, 14px font (Default for dense admin toolbars)
        default: "h-9 px-4 py-2 text-sm font-medium rounded-md gap-2 [&_svg:not([class*='size-'])]:size-4",
        md: "h-9 px-4 py-2 text-sm font-medium rounded-md gap-2 [&_svg:not([class*='size-'])]:size-4",
        // Large: 40px height, 20px horizontal padding, 14px font (Prominent form actions)
        lg: "h-10 px-5 py-2.5 text-sm font-semibold rounded-md gap-2 [&_svg:not([class*='size-'])]:size-4.5",
        // Extra Large: 44px height, 24px horizontal padding, 16px font
        xl: "h-11 px-6 py-2.5 text-base font-semibold rounded-lg gap-2.5 [&_svg:not([class*='size-'])]:size-5",
        // Micro / Extra Small (backward compatibility)
        xs: "h-7 px-2.5 py-1 text-xs font-medium rounded-md gap-1 [&_svg:not([class*='size-'])]:size-3",
        // Icon variants matching Bytecode specifications:
        // Icon Small: 32px
        "icon-sm": "size-8 rounded-md [&_svg:not([class*='size-'])]:size-3.5",
        // Icon Medium / Default: 36px
        icon: "size-9 rounded-md [&_svg:not([class*='size-'])]:size-4",
        "icon-md": "size-9 rounded-md [&_svg:not([class*='size-'])]:size-4",
        // Icon Large: 40px
        "icon-lg": "size-10 rounded-md [&_svg:not([class*='size-'])]:size-4.5",
        // Icon Extra Large: 44px
        "icon-xl": "size-11 rounded-lg [&_svg:not([class*='size-'])]:size-5",
        "icon-xs": "size-7 rounded-md [&_svg:not([class*='size-'])]:size-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
