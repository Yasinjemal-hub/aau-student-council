import { SuggestionForm } from "@/components/forms/SuggestionForm"
import { Button } from "@/components/ui/button"
import { GraduationCap, Sun, Moon, ArrowLeft, MessageSquarePlus, Sparkles } from "lucide-react"
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
    <div className="min-h-dvh bg-gradient-to-b from-background to-muted/30 text-foreground transition-colors duration-300">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-border bg-gradient-to-r from-blue-900 to-blue-950">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" aria-hidden="true" />
        
        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                aria-label="Go back"
                id="suggestion-page-back"
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 shadow-lg shadow-yellow-400/25">
                <MessageSquarePlus className="h-7 w-7 text-blue-900" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">Your Voice Matters</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Submit Feedback
                </h1>
                <p className="text-sm text-blue-200/70">
                  Share your ideas, suggestions, or concerns with the council
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
              id="suggestion-theme-toggle"
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="py-10 px-4 sm:px-6 lg:px-8">
        <SuggestionForm onBack={onBack} />
      </main>
    </div>
  )
}
