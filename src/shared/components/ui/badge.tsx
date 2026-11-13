import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "group/badge inline-flex h-[22px] w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-[4px] border border-transparent px-2 text-xs font-medium leading-4 whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-primary [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        // Primary
        default:
          "bg-primary text-primary-foreground",
        // Neutral / Secondary
        secondary:
          "bg-muted text-secondary-foreground border-border/60",
        // Bytecode Semantic Status Variants:
        // Success: Completed, Active, Approved
        success:
          "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
        // Warning: Pending, Attention Required
        warning:
          "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
        // Danger / Destructive: Rejected, Failed, Error
        destructive:
          "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800",
        danger:
          "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800",
        // Info: In Progress, Processing
        info:
          "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
        // Outline
        outline:
          "border-border text-foreground bg-transparent",
        ghost:
          "hover:bg-muted hover:text-muted-foreground text-muted-foreground",
        link:
          "text-primary underline-offset-4 hover:underline p-0 h-auto",
      },
      shape: {
        default: "rounded-[4px]",
        pill: "rounded-full px-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  shape = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, shape }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
