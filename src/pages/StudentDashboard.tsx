"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  GraduationCap,
  Bell,
  Calendar,
  FileText,
  MessageSquarePlus,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  BookOpen,
  Award,
  Megaphone,
  Settings,
  LogOut,
  Sun,
  Moon,
  ChevronRight,
} from "lucide-react"

import type { AppView } from "@/types"

interface StudentDashboardProps {
  user: { email: string }
  onLogout: () => void
  setView: (view: AppView) => void
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}

const quickActions = [
  { icon: MessageSquarePlus, label: "Submit Feedback", view: "suggestions", color: "bg-blue-500" },
  { icon: Calendar, label: "View Events", view: "events", color: "bg-emerald-500" },
  { icon: Megaphone, label: "Announcements", view: "announcements", color: "bg-orange-500" },
  { icon: Users, label: "Leadership", view: "leadership", color: "bg-purple-500" },
]

const recentAnnouncements = [
  {
    id: 1,
    title: "Spring Semester Registration Open",
    date: "2 hours ago",
    category: "Academic",
    priority: "high",
  },
  {
    id: 2,
    title: "Career Fair Registration Deadline",
    date: "1 day ago",
    category: "Events",
    priority: "medium",
  },
  {
    id: 3,
    title: "Library Extended Hours",
    date: "2 days ago",
    category: "Facilities",
    priority: "low",
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Leadership Summit",
    date: "June 15, 2026",
    time: "9:00 AM",
    location: "Main Auditorium",
  },
  {
    id: 2,
    title: "Career Fair 2026",
    date: "June 20, 2026",
    time: "10:00 AM",
    location: "Student Center",
  },
  {
    id: 3,
    title: "Council Elections",
    date: "June 25, 2026",
    time: "8:00 AM",
    location: "Multiple Locations",
  },
]

const myComplaints = [
  {
    id: "C-2024-001",
    title: "Library AC Issue",
    status: "In Progress",
    date: "May 10, 2026",
    statusColor: "text-orange-500",
  },
  {
    id: "C-2024-002",
    title: "Cafeteria Food Quality",
    status: "Resolved",
    date: "May 5, 2026",
    statusColor: "text-emerald-500",
  },
]

const stats = [
  { label: "Events Attended", value: "12", icon: Calendar, trend: "+3 this month" },
  { label: "Complaints Filed", value: "4", icon: MessageSquarePlus, trend: "2 resolved" },
  { label: "Notifications", value: "8", icon: Bell, trend: "3 unread" },
  { label: "Documents", value: "15", icon: FileText, trend: "5 new" },
]

export function StudentDashboard({ user, onLogout, setView, darkMode, setDarkMode }: StudentDashboardProps) {
  const userName = user.email.split("@")[0]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-900 to-blue-800">
                <GraduationCap className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Student Dashboard</h1>
                <p className="text-xs text-muted-foreground">AAU School of Commerce</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="sm" onClick={onLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {userName}!
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening with the Student Council today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={stat.label} className="border-border/50 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-900/10 to-blue-800/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xs text-emerald-600 mt-2">{stat.trend}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setView(action.view)}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-yellow-400/30 hover:shadow-lg transition-all duration-300"
              >
                <div className={`h-12 w-12 rounded-xl ${action.color} flex items-center justify-center`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">{action.label}</p>
                  <p className="text-xs text-muted-foreground">Click to open</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Announcements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-lg">Recent Announcements</CardTitle>
                  <CardDescription>Stay updated with the latest news</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setView("announcements")}>
                  View All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAnnouncements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div className={`h-2 w-2 rounded-full mt-2 ${
                      announcement.priority === "high" ? "bg-red-500" :
                      announcement.priority === "medium" ? "bg-orange-500" : "bg-emerald-500"
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{announcement.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground">{announcement.date}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-background text-muted-foreground">
                          {announcement.category}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* My Complaints */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-border/50 h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-lg">My Complaints</CardTitle>
                  <CardDescription>Track your submissions</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setView("suggestions")}>
                  New
                  <MessageSquarePlus className="h-4 w-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {myComplaints.map((complaint) => (
                  <div
                    key={complaint.id}
                    className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-muted-foreground">{complaint.id}</span>
                      <span className={`text-xs font-medium ${complaint.statusColor}`}>
                        {complaint.status}
                      </span>
                    </div>
                    <p className="font-medium text-foreground text-sm">{complaint.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{complaint.date}</p>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setView("suggestions")}
                >
                  Submit New Complaint
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8"
        >
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
                <CardDescription>Don&apos;t miss these opportunities</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setView("events")}>
                View Calendar
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 rounded-xl bg-gradient-to-br from-blue-900/5 to-blue-800/5 border border-blue-900/10 hover:border-yellow-400/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-lg bg-blue-900 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{event.date}</p>
                        <p className="text-xs text-blue-600 font-medium">{event.time}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-foreground mb-1">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.location}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
