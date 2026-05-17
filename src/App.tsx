"use client"

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
import { ContactPage } from "@/pages/ContactPage"
import { AboutPage } from "@/pages/AboutPage"
import { StudentDashboard } from "@/pages/StudentDashboard"
import { AdminDashboardPage } from "@/pages/AdminDashboardPage"
import { HeroSection } from "@/components/landing/HeroSection"
import { AboutCouncil } from "@/components/landing/AboutCouncil"
import { LatestAnnouncements } from "@/components/landing/LatestAnnouncements"
import { Testimonials } from "@/components/landing/Testimonials"
import { UpcomingEvents } from "@/components/landing/UpcomingEvents"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import {
  GraduationCap,
  Users,
  Calendar,
  FileText,
  Megaphone,
  MessageSquarePlus,
} from "lucide-react"
import { useState, useEffect } from "react"

type AppView = 
  | "landing" 
  | "auth" 
  | "dashboard" 
  | "admin-dashboard"
  | "announcements" 
  | "suggestions" 
  | "events" 
  | "leadership" 
  | "documents" 
  | "resources"
  | "contact"
  | "about"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [view, setView] = useState<AppView>("landing")
  const [currentUser, setCurrentUser] = useState<{ email: string; role?: string } | null>(null)
  const { toasts, toast, dismiss } = useToast()

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  function handleAuthSuccess(user: { email: string }) {
    // Check if admin
    const isAdmin = user.email.toLowerCase().includes("admin")
    setCurrentUser({ ...user, role: isAdmin ? "admin" : "student" })
    setView(isAdmin ? "admin-dashboard" : "dashboard")
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

  /* ── Admin Dashboard ─────────────────────────────────── */
  if (view === "admin-dashboard" && currentUser?.role === "admin") {
    return (
      <AdminDashboardPage
        user={currentUser}
        onLogout={handleLogout}
        setView={setView}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    )
  }

  /* ── Student Dashboard ───────────────────────────────── */
  if (view === "dashboard" && currentUser) {
    return (
      <StudentDashboard
        user={currentUser}
        onLogout={handleLogout}
        setView={setView}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    )
  }

  /* ── Contact Page ────────────────────────────────────── */
  if (view === "contact") {
    return (
      <>
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          currentView={view}
          setView={setView}
          currentUser={currentUser}
        />
        <ContactPage onBack={() => setView(currentUser ? "dashboard" : "landing")} />
        <Footer setView={setView} />
        <Toaster toasts={toasts} dismiss={dismiss} />
      </>
    )
  }

  /* ── About Page ──────────────────────────────────────── */
  if (view === "about") {
    return (
      <>
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          currentView={view}
          setView={setView}
          currentUser={currentUser}
        />
        <AboutPage 
          onBack={() => setView(currentUser ? "dashboard" : "landing")} 
          setView={setView}
        />
        <Footer setView={setView} />
        <Toaster toasts={toasts} dismiss={dismiss} />
      </>
    )
  }

  /* ── Announcements Page ──────────────────────────────── */
  if (view === "announcements") {
    return (
      <>
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          currentView={view}
          setView={setView}
          currentUser={currentUser}
        />
        <div className="pt-16 lg:pt-20">
          <AnnouncementsPage
            onBack={() => setView(currentUser ? "dashboard" : "landing")}
          />
        </div>
        <Footer setView={setView} />
        <Toaster toasts={toasts} dismiss={dismiss} />
      </>
    )
  }

  /* ── Suggestion / Complaint Page ────────────────────── */
  if (view === "suggestions") {
    return (
      <>
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          currentView={view}
          setView={setView}
          currentUser={currentUser}
        />
        <div className="pt-16 lg:pt-20">
          <SuggestionPage
            onBack={() => setView(currentUser ? "dashboard" : "landing")}
          />
        </div>
        <Footer setView={setView} />
        <Toaster toasts={toasts} dismiss={dismiss} />
      </>
    )
  }

  /* ── Events Page ────────────────────────────────────── */
  if (view === "events") {
    return (
      <>
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          currentView={view}
          setView={setView}
          currentUser={currentUser}
        />
        <div className="pt-16 lg:pt-20">
          <EventsPage
            onBack={() => setView(currentUser ? "dashboard" : "landing")}
          />
        </div>
        <Footer setView={setView} />
        <Toaster toasts={toasts} dismiss={dismiss} />
      </>
    )
  }

  /* ── Leadership Page ────────────────────────────────── */
  if (view === "leadership") {
    return (
      <>
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          currentView={view}
          setView={setView}
          currentUser={currentUser}
        />
        <div className="pt-16 lg:pt-20">
          <LeadershipPage
            onBack={() => setView(currentUser ? "dashboard" : "landing")}
            onComplaint={() => setView("suggestions")}
          />
        </div>
        <Footer setView={setView} />
        <Toaster toasts={toasts} dismiss={dismiss} />
      </>
    )
  }

  /* ── Documents Page ─────────────────────────────────── */
  if (view === "documents") {
    return (
      <>
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          currentView={view}
          setView={setView}
          currentUser={currentUser}
        />
        <div className="pt-16 lg:pt-20">
          <DocumentsPage
            onBack={() => setView(currentUser ? "dashboard" : "landing")}
          />
        </div>
        <Footer setView={setView} />
        <Toaster toasts={toasts} dismiss={dismiss} />
      </>
    )
  }

  /* ── Academic Resources Page ─────────────────────────── */
  if (view === "resources") {
    return (
      <>
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          currentView={view}
          setView={setView}
          currentUser={currentUser}
        />
        <div className="pt-16 lg:pt-20">
          <AcademicResourcesPage
            onBack={() => setView(currentUser ? "dashboard" : "landing")}
          />
        </div>
        <Footer setView={setView} />
        <Toaster toasts={toasts} dismiss={dismiss} />
      </>
    )
  }

  /* ── Landing Page ────────────────────────────────────── */
  return (
    <div className="min-h-dvh bg-background text-foreground transition-colors duration-300">
      {/* Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentView={view}
        setView={setView}
        currentUser={currentUser}
      />

      <main>
        {/* Hero */}
        <HeroSection setView={setView} />

        {/* About Council */}
        <AboutCouncil />

        {/* Latest Announcements */}
        <LatestAnnouncements />

        {/* Testimonials */}
        <Testimonials />

        {/* Upcoming Events */}
        <UpcomingEvents setView={setView} />

        {/* Features */}
        <section className="py-20 sm:py-28 bg-gradient-to-b from-background to-muted/30" aria-labelledby="features-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3
                id="features-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4"
              >
                Everything You Need
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tools and resources to support student governance and campus life.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl border-border/50 hover:border-yellow-400/30 cursor-pointer"
                  onClick={feature.action}
                >
                  <CardHeader>
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-900 to-blue-800 text-yellow-400 transition-all group-hover:from-yellow-400 group-hover:to-yellow-500 group-hover:text-blue-900">
                      <feature.icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950" onClick={feature.action}>
                      Explore &rarr;
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer setView={setView} />

      <Toaster toasts={toasts} dismiss={dismiss} />
    </div>
  )
}

export default App
