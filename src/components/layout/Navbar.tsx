"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  GraduationCap,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  Users,
  Calendar,
  Megaphone,
  FileText,
  MessageSquarePlus,
  Phone,
  Home,
  Info,
  LayoutDashboard,
} from "lucide-react"

interface NavbarProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
  currentView: string
  setView: (view: string) => void
  currentUser: { email: string } | null
}

const navItems = [
  { id: "landing", label: "Home", icon: Home },
  { id: "about", label: "About Us", icon: Info },
  { id: "leadership", label: "Leadership", icon: Users },
  { id: "events", label: "Events", icon: Calendar },
  { id: "announcements", label: "News", icon: Megaphone },
  { id: "suggestions", label: "Feedback", icon: MessageSquarePlus },
  { id: "contact", label: "Contact", icon: Phone },
]

export function Navbar({ darkMode, setDarkMode, currentView, setView, currentUser }: NavbarProps) {
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
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass shadow-lg shadow-black/5"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Logo */}
            <motion.button
              onClick={() => setView("landing")}
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-900 to-blue-800 shadow-lg shadow-blue-900/20 overflow-hidden">
                <img 
                  src="/assets/council_logo.png" 
                  alt="AAU Logo"
                  className="h-8 w-8 lg:h-10 lg:w-10 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling?.classList.remove('hidden')
                  }}
                />
                <GraduationCap className="h-5 w-5 lg:h-6 lg:w-6 text-yellow-400 hidden" />
              </div>
              <div className="hidden sm:block">
                <h1 className={`text-base lg:text-lg font-bold leading-tight tracking-tight transition-colors ${
                  isScrolled || currentView !== "landing" ? "text-foreground" : "text-white"
                }`}>
                  AAU Student Council
                </h1>
                <p className={`text-[10px] lg:text-xs transition-colors ${
                  isScrolled || currentView !== "landing" ? "text-muted-foreground" : "text-white/70"
                }`}>
                  School of Commerce
                </p>
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentView === item.id
                      ? "text-yellow-500"
                      : isScrolled || currentView !== "landing"
                        ? "text-foreground/70 hover:text-foreground hover:bg-muted"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {currentView === item.id && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-yellow-400 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Theme Toggle */}
              <motion.button
                onClick={() => setDarkMode(!darkMode)}
                className={`flex h-9 w-9 lg:h-10 lg:w-10 items-center justify-center rounded-lg transition-colors ${
                  isScrolled || currentView !== "landing"
                    ? "hover:bg-muted text-foreground"
                    : "hover:bg-white/10 text-white"
                }`}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle dark mode"
              >
                <AnimatePresence mode="wait">
                  {darkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Auth Buttons */}
              {currentUser ? (
                <Button
                  onClick={() => setView("dashboard")}
                  size="sm"
                  className="hidden sm:flex bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 hover:from-yellow-300 hover:to-yellow-400 shadow-lg shadow-yellow-400/20 font-semibold"
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              ) : (
                <Button
                  onClick={() => setView("auth")}
                  size="sm"
                  className="hidden sm:flex bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 hover:from-yellow-300 hover:to-yellow-400 shadow-lg shadow-yellow-400/20 font-semibold"
                >
                  Sign In
                </Button>
              )}

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                  isScrolled || currentView !== "landing"
                    ? "hover:bg-muted text-foreground"
                    : "hover:bg-white/10 text-white"
                }`}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-card border-l border-border shadow-2xl lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <span className="font-bold text-lg">Menu</span>
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-muted"
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        setView(item.id)
                        setIsMobileMenuOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                        currentView === item.id
                          ? "bg-yellow-400/10 text-yellow-600 border border-yellow-400/30"
                          : "hover:bg-muted"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  ))}
                </nav>

                {/* Menu Footer */}
                <div className="p-4 border-t border-border space-y-3">
                  {currentUser ? (
                    <Button
                      onClick={() => {
                        setView("dashboard")
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 hover:from-yellow-300 hover:to-yellow-400"
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        setView("auth")
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 hover:from-yellow-300 hover:to-yellow-400"
                    >
                      Sign In
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
