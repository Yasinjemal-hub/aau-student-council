import { useState, useCallback } from "react"

export type ToastVariant = "default" | "success" | "destructive"

export interface Toast {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
}

let toastCount = 0

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(
    ({
      title,
      description,
      variant = "default",
    }: Omit<Toast, "id">) => {
      const id = String(++toastCount)
      const newToast: Toast = { id, title, description, variant }
      setToasts((prev) => [...prev, newToast])

      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 5000)

      return id
    },
    []
  )

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, toast, dismiss }
}
