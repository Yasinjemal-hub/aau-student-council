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
  Menu,
  X,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react"
import { useState, useEffect } from "react"

type AppView = "landing" | "auth" | "dashboard" | "announcements" | "suggestions" | "events" | "leadership" | "documents" | "resources"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [view, setView] = useState<AppView>("landing")
  const [currentUser, setCurrentUser] = useState<{ email: string } | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-blue-900 shadow-lg shadow-blue-900/25">
              <GraduationCap className="h-7 w-7 text-yellow-400" aria-hidden="true" />
              <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-yellow-400 border-2 border-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight tracking-tight text-blue-900">
                AAU Student Council
              </h1>
              <p className="text-xs text-muted-foreground font-medium">School of Commerce</p>
            </div>
          </div>

          <nav
            className="hidden items-center gap-1 lg:flex"
            role="navigation"
            aria-label="Main navigation"
          >
            {[
              { name: "Home", action: () => setView("landing") },
              { name: "Announcements", action: () => setView("announcements") },
              { name: "Council", action: () => setView("leadership") },
              { name: "Events", action: () => setView("events") },
              { name: "Documents", action: () => setView("documents") },
            ].map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                size="sm"
                className="text-blue-900/80 hover:text-blue-900 hover:bg-blue-900/5 font-medium rounded-lg px-4"
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
              className="hidden sm:flex text-blue-900/70 hover:text-blue-900 hover:bg-blue-900/5 rounded-lg"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              size="sm"
              onClick={() => setView("auth")}
              className="hidden sm:flex bg-blue-900 text-white hover:bg-blue-800 shadow-lg shadow-blue-900/25 rounded-xl px-6 font-semibold"
            >
              Sign In
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-blue-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-lg">
            <nav className="mx-auto max-w-7xl px-4 py-4 space-y-2">
              {[
                { name: "Home", action: () => { setView("landing"); setMobileMenuOpen(false); } },
                { name: "Announcements", action: () => { setView("announcements"); setMobileMenuOpen(false); } },
                { name: "Council", action: () => { setView("leadership"); setMobileMenuOpen(false); } },
                { name: "Events", action: () => { setView("events"); setMobileMenuOpen(false); } },
                { name: "Documents", action: () => { setView("documents"); setMobileMenuOpen(false); } },
              ].map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start text-blue-900 hover:bg-blue-900/5 font-medium"
                  onClick={item.action}
                >
                  {item.name}
                </Button>
              ))}
              <div className="pt-4 border-t border-border/50 flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDarkMode(!darkMode)}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <Button
                  size="sm"
                  onClick={() => { setView("auth"); setMobileMenuOpen(false); }}
                  className="flex-1 bg-blue-900 text-white hover:bg-blue-800"
                >
                  Sign In
                </Button>
              </div>
            </nav>
          </div>
        )}
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-900 to-blue-950" aria-hidden="true" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" aria-hidden="true" />
          
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-yellow-400/20 px-5 py-2.5">
                <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" aria-hidden="true" />
                <span className="text-sm font-semibold text-yellow-400 uppercase tracking-widest">
                  What We Offer
                </span>
              </div>
              <h3
                id="features-heading"
                className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl mb-4"
              >
                Everything You Need
              </h3>
              <p className="text-lg text-blue-100/80 max-w-2xl mx-auto">
                Tools and resources to support student governance and campus life.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card
                  key={feature.title}
                  className="group bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-yellow-400/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 rounded-2xl cursor-pointer overflow-hidden"
                  onClick={feature.action}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-blue-900 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                      <feature.icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-blue-100/70">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full text-yellow-400 hover:text-blue-900 hover:bg-yellow-400 font-semibold rounded-xl group/btn"
                    >
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Section ───────────────────────────────── */}
        <section className="py-20 sm:py-28 bg-gradient-to-b from-background to-muted/30">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl font-extrabold tracking-tight text-blue-900 sm:text-4xl lg:text-5xl mb-6">
              Ready to Get Involved?
            </h3>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of commerce students who are actively shaping their university experience. Your voice matters.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => setView("auth")}
                className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 shadow-xl shadow-yellow-400/25 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-2xl px-10 py-7 text-lg font-bold group"
              >
                Join the Council
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setView("suggestions")}
                className="border-2 border-blue-900/20 text-blue-900 hover:bg-blue-900 hover:text-white hover:border-blue-900 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl px-10 py-7 text-lg font-semibold"
              >
                Submit Feedback
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="relative bg-blue-950 text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" aria-hidden="true" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-16 grid gap-12 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400">
                  <GraduationCap className="h-7 w-7 text-blue-900" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">AAU Student Council</h4>
                  <p className="text-sm text-blue-200/70">School of Commerce</p>
                </div>
              </div>
              <p className="text-blue-200/70 leading-relaxed mb-6">
                Empowering students through leadership, advocacy, and community engagement since 2010.
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-blue-200/70 hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300"
                    aria-label={`Social media link ${index + 1}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-6">Quick Links</h5>
              <ul className="space-y-3">
                {["Home", "About Us", "Announcements", "Events", "Documents"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-blue-200/70 hover:text-yellow-400 transition-colors font-medium">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h5 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-6">Resources</h5>
              <ul className="space-y-3">
                {["Academic Calendar", "Student Portal", "Library", "Career Services", "Support"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-blue-200/70 hover:text-yellow-400 transition-colors font-medium">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-6">Contact Us</h5>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-yellow-400 mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="text-blue-200/70">School of Commerce, AAU, Addis Ababa, Ethiopia</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-yellow-400 shrink-0" aria-hidden="true" />
                  <a href="mailto:council@aau.edu.et" className="text-blue-200/70 hover:text-yellow-400 transition-colors">
                    council@aau.edu.et
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-yellow-400 shrink-0" aria-hidden="true" />
                  <a href="tel:+251111234567" className="text-blue-200/70 hover:text-yellow-400 transition-colors">
                    +251 11 123 4567
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-blue-200/60">
                &copy; {new Date().getFullYear()} Addis Ababa University — School of Commerce Student Council. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-blue-200/60 hover:text-yellow-400 transition-colors">Privacy Policy</a>
                <a href="#" className="text-blue-200/60 hover:text-yellow-400 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <Toaster toasts={toasts} dismiss={dismiss} />
    </div>
  )
}

export default App
