import { cn } from "@/lib/utils"
import type { Toast as ToastType } from "@/hooks/use-toast"
import { X } from "lucide-react"

interface ToasterProps {
  toasts: ToastType[]
  dismiss: (id: string) => void
}

export function Toaster({ toasts, dismiss }: ToasterProps) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="alert"
          aria-live="assertive"
          className={cn(
            "pointer-events-auto relative flex w-full items-start gap-3 rounded-lg border p-4 shadow-lg transition-all animate-in slide-in-from-bottom-4 fade-in duration-300",
            toast.variant === "destructive"
              ? "border-destructive/50 bg-destructive text-destructive-foreground"
              : toast.variant === "success"
                ? "border-emerald-500/30 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100 dark:border-emerald-500/20"
                : "border-border bg-card text-card-foreground"
          )}
        >
          {/* Accent bar */}
          <div
            className={cn(
              "absolute left-0 top-0 h-full w-1 rounded-l-lg",
              toast.variant === "destructive"
                ? "bg-destructive-foreground/30"
                : toast.variant === "success"
                  ? "bg-emerald-500"
                  : "bg-primary"
            )}
          />

          <div className="flex-1 pl-2">
            <p className="text-sm font-semibold">{toast.title}</p>
            {toast.description && (
              <p className="mt-1 text-sm opacity-80">{toast.description}</p>
            )}
          </div>

          <button
            onClick={() => dismiss(toast.id)}
            className="shrink-0 rounded-md p-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
