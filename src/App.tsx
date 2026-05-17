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
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-900 shadow-lg shadow-blue-900/20">
              <GraduationCap className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold leading-tight tracking-tight text-blue-900">
                AAU Student Council
              </h1>
              <p className="text-xs font-medium text-muted-foreground">School of Commerce</p>
            </div>
          </div>

          <nav
            className="hidden items-center gap-1 lg:flex"
            role="navigation"
            aria-label="Main navigation"
          >
            {[
              { name: "Home", action: undefined },
              { name: "Announcements", action: () => setView("announcements") },
              { name: "Leadership", action: () => setView("leadership") },
              { name: "Events", action: () => setView("events") },
              { name: "Documents", action: () => setView("documents") },
            ].map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                size="sm"
                className="text-foreground/80 hover:text-blue-900 hover:bg-blue-900/5 font-medium rounded-xl px-4"
                id={`nav-${item.name.toLowerCase()}`}
                onClick={item.action}
              >
                {item.name}
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
              id="theme-toggle"
              className="rounded-xl hover:bg-blue-900/5"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              size="sm"
              id="sign-in-button"
              onClick={() => setView("auth")}
              className="bg-blue-900 text-white hover:bg-blue-800 shadow-lg shadow-blue-900/20 rounded-xl px-6 font-semibold"
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
        <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden" aria-labelledby="features-heading">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-yellow-400/5 blur-[100px]" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-900/10 px-5 py-2.5 border border-blue-900/20">
                <span className="text-sm font-bold text-blue-900 uppercase tracking-widest">
                  Quick Access
                </span>
              </div>
              <h3
                id="features-heading"
                className="text-4xl font-extrabold tracking-tight text-blue-900 sm:text-5xl mb-6"
              >
                Everything You Need
              </h3>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Tools and resources to support student governance and campus life.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card
                  key={feature.title}
                  className="group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 rounded-2xl border-2 border-border/50 hover:border-yellow-400/50 cursor-pointer bg-card"
                  onClick={feature.action}
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-blue-900/0 group-hover:from-yellow-400/5 group-hover:to-blue-900/5 transition-all duration-300" />
                  
                  <CardHeader className="relative pb-4">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-900 text-yellow-400 shadow-lg shadow-blue-900/20 group-hover:bg-yellow-400 group-hover:text-blue-900 group-hover:shadow-yellow-400/30 transition-all duration-300">
                      <feature.icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-lg font-bold text-blue-900 group-hover:text-yellow-600 transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>

                  {/* Decorative number */}
                  <div className="absolute top-4 right-4 text-6xl font-extrabold text-blue-900/5 group-hover:text-yellow-400/10 transition-colors duration-300">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="relative border-t border-border bg-blue-900 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400 shadow-lg">
                  <GraduationCap className="h-7 w-7 text-blue-900" />
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-white">AAU Student Council</h4>
                  <p className="text-sm text-blue-200">School of Commerce</p>
                </div>
              </div>
              <p className="text-blue-200/80 leading-relaxed max-w-md mb-6">
                Empowering students through leadership, advocacy, and community engagement. Your voice matters, and we are here to represent you.
              </p>
              <div className="flex items-center gap-4">
                {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300"
                    aria-label={`Follow us on ${social}`}
                  >
                    <span className="sr-only">{social}</span>
                    <span className="text-xs font-bold">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-sm font-bold text-yellow-400 uppercase tracking-widest mb-4">
                Quick Links
              </h5>
              <ul className="space-y-3">
                {["Announcements", "Events", "Leadership", "Documents", "Resources"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-blue-200/80 hover:text-yellow-400 transition-colors font-medium">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="text-sm font-bold text-yellow-400 uppercase tracking-widest mb-4">
                Contact Us
              </h5>
              <ul className="space-y-3 text-blue-200/80">
                <li>School of Commerce Building</li>
                <li>Addis Ababa University</li>
                <li>Addis Ababa, Ethiopia</li>
                <li className="pt-2">
                  <a href="mailto:council@aau.edu.et" className="hover:text-yellow-400 transition-colors font-medium">
                    council@aau.edu.et
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-blue-200/60">
              &copy; {new Date().getFullYear()} Addis Ababa University — School of Commerce Student Council. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-blue-200/60">
              <a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <Toaster toasts={toasts} dismiss={dismiss} />
    </div>
  )
}

export default App
