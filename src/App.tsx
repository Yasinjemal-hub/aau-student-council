import "./App.css"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { AuthPage } from "@/pages/AuthPage"
import { AnnouncementsPage } from "@/pages/AnnouncementsPage"
import { SuggestionPage } from "@/pages/SuggestionPage"
import { EventsPage } from "@/pages/EventsPage"
import { LeadershipPage } from "@/pages/LeadershipPage"
import { DocumentsPage } from "@/pages/DocumentsPage"
import { AcademicResourcesPage } from "@/pages/AcademicResourcesPage"
import { HeroSection } from "@/components/landing/HeroSection"
import { AboutCouncil } from "@/components/landing/AboutCouncil"
import { LatestAnnouncements } from "@/components/landing/LatestAnnouncements"
import {
  GraduationCap,
  Users,
  Calendar,
  FileText,
  Megaphone,
  MessageSquarePlus,
  Sun,
  Moon,
  LogOut,
} from "lucide-react"
import { useState, useEffect } from "react"

type AppView = "landing" | "auth" | "dashboard" | "announcements" | "suggestions" | "events" | "leadership" | "documents" | "resources"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [view, setView] = useState<AppView>("landing")
  const [currentUser, setCurrentUser] = useState<{ email: string } | null>(null)
  const { toasts, toast, dismiss } = useToast()

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  function handleAuthSuccess(user: { email: string }) {
    setCurrentUser(user)
    setView("dashboard")
  }

  function handleLogout() {
    setCurrentUser(null)
    setView("landing")
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    })
  }

  const features = [
    {
      icon: Megaphone,
      title: "Announcements",
      description:
        "View the latest announcements, updates, and important notices.",
      action: () => setView("announcements"),
    },
    {
      icon: MessageSquarePlus,
      title: "Suggestions & Complaints",
      description:
        "Submit anonymous feedback, suggestions, or complaints to the council.",
      action: () => setView("suggestions"),
    },
    {
      icon: Users,
      title: "Student Council",
      description:
        "Manage council members, departments, and leadership structure.",
      action: () => setView("leadership"),
    },
    {
      icon: Calendar,
      title: "Events & Activities",
      description:
        "Organize campus events, meetings, and student engagements.",
      action: () => setView("events"),
    },
    {
      icon: FileText,
      title: "Document Management",
      description:
        "Handle proposals, reports, meeting minutes, and official records.",
      action: () => setView("documents"),
    },
    {
      icon: GraduationCap,
      title: "Academic Resources",
      description:
        "Access academic materials, announcements, and student services.",
      action: () => setView("resources"),
    },
  ]

  /* ── Auth Page ───────────────────────────────────────── */
  if (view === "auth") {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />
  }

  /* ── Announcements Page ──────────────────────────────── */
  if (view === "announcements") {
    return (
      <AnnouncementsPage
        onBack={() => setView(currentUser ? "dashboard" : "landing")}
      />
    )
  }

  /* ── Suggestion / Complaint Page ────────────────────── */
  if (view === "suggestions") {
    return (
      <SuggestionPage
        onBack={() => setView(currentUser ? "dashboard" : "landing")}
      />
    )
  }

  /* ── Events Page ────────────────────────────────────── */
  if (view === "events") {
    return (
      <EventsPage
        onBack={() => setView(currentUser ? "dashboard" : "landing")}
      />
    )
  }

  /* ── Leadership Page ────────────────────────────────── */
  if (view === "leadership") {
    return (
      <LeadershipPage
        onBack={() => setView(currentUser ? "dashboard" : "landing")}
        onComplaint={() => setView("suggestions")}
      />
    )
  }

  /* ── Documents Page ─────────────────────────────────── */
  if (view === "documents") {
    return (
      <DocumentsPage
        onBack={() => setView(currentUser ? "dashboard" : "landing")}
      />
    )
  }

  /* ── Academic Resources Page ─────────────────────────── */
  if (view === "resources") {
    return (
      <AcademicResourcesPage
        onBack={() => setView(currentUser ? "dashboard" : "landing")}
      />
    )
  }

  /* ── Dashboard (after login) ─────────────────────────── */
  if (view === "dashboard" && currentUser) {
    return (
      <div className="min-h-dvh bg-background text-foreground transition-colors duration-300">
        <header className="sticky top-0 z-50 glass border-b border-border">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold leading-tight tracking-tight text-foreground">
                  AAU Student Council
                </h1>
                <p className="text-xs text-muted-foreground">School of Commerce</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {currentUser.email}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle dark mode"
                id="dashboard-theme-toggle"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                id="logout-button"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome back! 👋
            </h2>
            <p className="mt-2 text-muted-foreground">
              Here's what's happening with the Student Council today.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                onClick={feature.action}
              >
                <CardHeader>
                  <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" size="sm" className="w-full" onClick={feature.action}>
                    Open →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        <Toaster toasts={toasts} dismiss={dismiss} />
      </div>
    )
  }

  /* ── Landing Page ────────────────────────────────────── */
  return (
    <div className="min-h-dvh bg-background text-foreground transition-colors duration-300">
      {/* ── Header ──────────────────────────────────────── */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight tracking-tight text-foreground">
                AAU Student Council
              </h1>
              <p className="text-xs text-muted-foreground">School of Commerce</p>
            </div>
          </div>

          <nav
            className="hidden items-center gap-1 md:flex"
            role="navigation"
            aria-label="Main navigation"
          >
            {["Home", "Announcements", "Council", "Events", "Documents"].map((item) => (
              <Button
                key={item}
                variant="ghost"
                size="sm"
                id={`nav-${item.toLowerCase()}`}
                onClick={
                  item === "Announcements"
                    ? () => setView("announcements")
                    : undefined
                }
              >
                {item}
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
              id="theme-toggle"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              size="sm"
              id="sign-in-button"
              onClick={() => setView("auth")}
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────── */}
      <main>
        <HeroSection />

        {/* ── About Council ─────────────────────────────── */}
        <AboutCouncil />

        {/* ── Latest Announcements ───────────────────────── */}
        <LatestAnnouncements />

        {/* ── Features ──────────────────────────────────── */}
        <section className="py-16 sm:py-20" aria-labelledby="features-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3
                id="features-heading"
                className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl"
              >
                Everything You Need
              </h3>
              <p className="mt-3 text-muted-foreground">
                Tools and resources to support student governance and campus life.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl border-2 border-border/50 hover:border-yellow-400/50 cursor-pointer"
                  onClick={feature.action}
                >
                  <CardHeader>
                    <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-900 text-yellow-400 transition-colors group-hover:bg-yellow-400 group-hover:text-blue-900">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base text-blue-900">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} Addis Ababa University — School of
            Commerce Student Council. All rights reserved.
          </p>
        </div>
      </footer>

      <Toaster toasts={toasts} dismiss={dismiss} />
    </div>
  )
}

export default App
