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

// Landing Components
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "@/components/landing/HeroSection"
import { AboutCouncil } from "@/components/landing/AboutCouncil"
import { ExecutiveTeam } from "@/components/landing/ExecutiveTeam"
import { EventsSection } from "@/components/landing/EventsSection"
import { ClubsSection } from "@/components/landing/ClubsSection"
import { GallerySection } from "@/components/landing/GallerySection"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"
import { ContactSection } from "@/components/landing/ContactSection"
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
import { useState, useEffect, useRef } from "react"

type AppView = "landing" | "auth" | "dashboard" | "announcements" | "suggestions" | "events" | "leadership" | "documents" | "resources"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [view, setView] = useState<AppView>("landing")
  const [currentUser, setCurrentUser] = useState<{ email: string } | null>(null)
  const { toasts, toast, dismiss } = useToast()

  // Section refs for smooth scrolling
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({})

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

  function handleNavigate(section: string) {
    // Handle special navigation cases
    if (section === "announcements") {
      setView("announcements")
      return
    }
    if (section === "suggestions") {
      setView("suggestions")
      return
    }
    if (section === "documents") {
      setView("documents")
      return
    }
    if (section === "resources") {
      setView("resources")
      return
    }

    // Smooth scroll to section
    if (view !== "landing") {
      setView("landing")
      setTimeout(() => {
        const element = document.getElementById(section)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    } else {
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      } else if (section === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }
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

  /* -- Auth Page -- */
  if (view === "auth") {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />
  }

  /* -- Announcements Page -- */
  if (view === "announcements") {
    return (
      <AnnouncementsPage
        onBack={() => setView(currentUser ? "dashboard" : "landing")}
      />
    )
  }

  /* -- Suggestion / Complaint Page -- */
  if (view === "suggestions") {
    return (
      <SuggestionPage
        onBack={() => setView(currentUser ? "dashboard" : "landing")}
      />
    )
  }

  /* -- Events Page -- */
  if (view === "events") {
    return (
      <EventsPage
        onBack={() => setView(currentUser ? "dashboard" : "landing")}
      />
    )
  }

  /* -- Leadership Page -- */
  if (view === "leadership") {
    return (
      <LeadershipPage
        onBack={() => setView(currentUser ? "dashboard" : "landing")}
        onComplaint={() => setView("suggestions")}
      />
    )
  }

  /* -- Documents Page -- */
  if (view === "documents") {
    return (
      <DocumentsPage
        onBack={() => setView(currentUser ? "dashboard" : "landing")}
      />
    )
  }

  /* -- Academic Resources Page -- */
  if (view === "resources") {
    return (
      <AcademicResourcesPage
        onBack={() => setView(currentUser ? "dashboard" : "landing")}
      />
    )
  }

  /* -- Dashboard (after login) -- */
  if (view === "dashboard" && currentUser) {
    return (
      <div className="min-h-dvh bg-background text-foreground transition-colors duration-300">
        <header className="sticky top-0 z-50 glass border-b border-border">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1 shadow-sm">
                <img src="/assets/council_logo.png" alt="Council Logo" className="h-full w-full object-contain" />
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
                className="rounded-full"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="rounded-full"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome back!
            </h2>
            <p className="mt-2 text-muted-foreground">
              Here&apos;s what&apos;s happening with the Student Council today.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer rounded-2xl border-border/50 hover:border-secondary/50"
                onClick={feature.action}
              >
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-secondary transition-colors">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" size="sm" className="w-full rounded-full group-hover:bg-secondary/10" onClick={feature.action}>
                    Open
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

  /* -- Landing Page -- */
  return (
    <div className="min-h-dvh bg-background text-foreground transition-colors duration-300">
      {/* Navbar */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onSignIn={() => setView("auth")}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <div id="home">
          <HeroSection
            onGetStarted={() => setView("auth")}
            onLearnMore={() => handleNavigate("about")}
          />
        </div>

        {/* About Section */}
        <div id="about">
          <AboutCouncil />
        </div>

        {/* Executive Team Section */}
        <div id="team">
          <ExecutiveTeam />
        </div>

        {/* Latest Announcements */}
        <LatestAnnouncements />

        {/* Events Section */}
        <div id="events">
          <EventsSection />
        </div>

        {/* Clubs Section */}
        <div id="clubs">
          <ClubsSection />
        </div>

        {/* Gallery Section */}
        <div id="gallery">
          <GallerySection />
        </div>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Contact Section */}
        <div id="contact">
          <ContactSection />
        </div>
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      <Toaster toasts={toasts} dismiss={dismiss} />
    </div>
  )
}

export default App
