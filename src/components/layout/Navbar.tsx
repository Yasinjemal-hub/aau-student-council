import { Button } from "@/components/ui/button"
import { Sun, Moon, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface NavbarProps {
  darkMode: boolean
  onToggleDarkMode: () => void
  onSignIn: () => void
  onNavigate: (section: string) => void
}

const NAV_ITEMS = [
  { label: "Home", section: "home" },
  { label: "About", section: "about" },
  { label: "Team", section: "team" },
  { label: "Events", section: "events" },
  { label: "Clubs", section: "clubs" },
  { label: "Contact", section: "contact" },
]

export function Navbar({ darkMode, onToggleDarkMode, onSignIn, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center gap-3 group"
            >
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1.5 shadow-md ring-1 ring-black/5 transition-transform group-hover:scale-105">
                <img
                  src="/assets/council_logo.png"
                  alt="Council Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className={`text-lg font-bold leading-tight tracking-tight transition-colors ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}>
                  AAU Student Council
                </h1>
                <p className={`text-xs transition-colors ${
                  isScrolled ? "text-muted-foreground" : "text-white/70"
                }`}>
                  School of Commerce
                </p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-1"
              role="navigation"
              aria-label="Main navigation"
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.section}
                  onClick={() => onNavigate(item.section)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all hover:bg-white/10 ${
                    isScrolled
                      ? "text-foreground hover:bg-muted"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleDarkMode}
                aria-label="Toggle dark mode"
                className={`rounded-full ${
                  isScrolled
                    ? "text-foreground hover:bg-muted"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <Button
                onClick={onSignIn}
                className="hidden sm:flex bg-secondary text-primary hover:bg-secondary/90 rounded-full px-6 font-semibold"
              >
                Sign In
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
                className={`lg:hidden rounded-full ${
                  isScrolled
                    ? "text-foreground hover:bg-muted"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 lg:hidden"
          >
            <div className="mx-4 rounded-2xl glass shadow-2xl border border-border/50 overflow-hidden">
              <nav className="p-4 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.section}
                    onClick={() => {
                      onNavigate(item.section)
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full text-left px-4 py-3 text-base font-medium text-foreground rounded-xl hover:bg-muted transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 border-t border-border mt-4">
                  <Button
                    onClick={() => {
                      onSignIn()
                      setIsMobileMenuOpen(false)
                    }}
                    className="w-full bg-secondary text-primary hover:bg-secondary/90 rounded-xl py-6 font-semibold"
                  >
                    Sign In
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
