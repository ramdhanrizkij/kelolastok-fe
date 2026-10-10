import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-all duration-150 outline-none select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // 1. Primary Solid Brand
        default:
          "bg-primary text-primary-foreground hover:bg-primary-active shadow-sm shadow-primary/20",
        // 2. Outline / White Card with border
        outline:
          "border border-border/80 bg-background text-foreground hover:bg-muted/70 hover:text-foreground shadow-2xs dark:border-border/70 dark:bg-card/40 dark:hover:bg-muted/60",
        // 3. Secondary Neutral
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-2xs",
        // 4. Ghost / Transparent
        ghost:
          "text-muted-foreground hover:text-foreground hover:bg-muted/60",
        // 5. Solid Dark / Black in Light, White in Dark
        dark:
          "bg-foreground text-background hover:bg-foreground/90 shadow-sm",
        // 6. Soft Primary Tint
        soft:
          "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20",
        // 7. Destructive Solid Red
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm shadow-destructive/20",
        // 8. Destructive Soft Tint
        "destructive-soft":
          "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20",
        // 9. Success Solid Green
        success:
          "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-600/20",
        // 10. Success Soft Tint
        "success-soft":
          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20",
        // 11. Warning Solid Amber
        warning:
          "bg-amber-500 text-white hover:bg-amber-600 shadow-sm shadow-amber-500/20",
        // 12. Warning Soft Tint
        "warning-soft":
          "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20",
        // 13. Purple Solid
        purple:
          "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-600/20",
        // 14. Purple Soft Tint
        "purple-soft":
          "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20",
        // 15. Link Underline
        link:
          "text-primary underline-offset-4 hover:underline p-0 h-auto font-medium active:scale-100",
      },
      size: {
        // Large (~44px) - Matches 'Large' in Buttons.png
        lg: "h-11 px-5 py-2.5 text-base font-semibold rounded-xl gap-2.5 [&_svg:not([class*='size-'])]:size-5",
        // Medium / Standard (~40px) - Matches 'Medium' in Buttons.png
        default:
          "h-10 px-4 py-2 text-sm font-medium rounded-lg gap-2 [&_svg:not([class*='size-'])]:size-4",
        // Small (~34px) - Matches 'Small' in Buttons.png
        sm: "h-8.5 px-3 py-1.5 text-xs font-medium rounded-md gap-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        // Extra Small (~28px)
        xs: "h-7 px-2.5 py-1 text-xs font-medium rounded-md gap-1 [&_svg:not([class*='size-'])]:size-3",
        // Icon Large (~44px)
        "icon-lg": "size-11 rounded-xl [&_svg:not([class*='size-'])]:size-5",
        // Icon Medium / Default (~40px)
        icon: "size-10 rounded-lg [&_svg:not([class*='size-'])]:size-4.5",
        // Icon Small (~34px)
        "icon-sm": "size-8.5 rounded-md [&_svg:not([class*='size-'])]:size-4",
        // Icon Extra Small (~28px)
        "icon-xs": "size-7 rounded-md [&_svg:not([class*='size-'])]:size-3.5",
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
