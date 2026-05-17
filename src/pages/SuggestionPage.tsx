import { SuggestionForm } from "@/components/forms/SuggestionForm"
import { Button } from "@/components/ui/button"
import { GraduationCap, Sun, Moon, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"

interface SuggestionPageProps {
  onBack: () => void
}

export function SuggestionPage({ onBack }: SuggestionPageProps) {
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  )

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  return (
    <div className="min-h-dvh bg-background text-foreground transition-colors duration-300">
      {/* ── Header ────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              aria-label="Go back"
              id="suggestion-page-back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold leading-tight tracking-tight text-foreground">
                AAU Student Council
              </h1>
              <p className="text-xs text-muted-foreground">School of Commerce</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
            id="suggestion-theme-toggle"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* ── Content ───────────────────────────────────────── */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <SuggestionForm onBack={onBack} />
      </main>
    </div>
  )
}
