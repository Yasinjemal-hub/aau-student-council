import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        academic: "border-transparent bg-aau-blue-100 text-aau-blue-800 dark:bg-aau-blue-900 dark:text-aau-blue-200",
        social: "border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
        sports: "border-transparent bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
        administrative: "border-transparent bg-aau-gold-100 text-aau-gold-800 dark:bg-aau-gold-900 dark:text-aau-gold-200",
        council: "border-transparent bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
        career: "border-transparent bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof badgeVariants>) {
  return (
    <div
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
