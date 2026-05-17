"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  GraduationCap,
  Bell,
  Users,
  FileText,
  MessageSquarePlus,
  TrendingUp,
  TrendingDown,
  Calendar,
  Settings,
  LogOut,
  Sun,
  Moon,
  LayoutDashboard,
  Megaphone,
  Shield,
  ChevronRight,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Trash2,
  Edit,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

import type { AppView } from "@/types"

interface AdminDashboardPageProps {
  user: { email: string }
  onLogout: () => void
  setView: (view: AppView) => void
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: Users, label: "Users", count: 5420 },
  { icon: MessageSquarePlus, label: "Complaints", count: 48 },
  { icon: Megaphone, label: "Announcements" },
  { icon: Calendar, label: "Events" },
  { icon: FileText, label: "Documents" },
  { icon: Shield, label: "Moderation" },
  { icon: Settings, label: "Settings" },
]

const stats = [
  { 
    label: "Total Students", 
    value: "5,420", 
    change: "+12.5%", 
    trend: "up",
    icon: Users,
    color: "bg-blue-500" 
  },
  { 
    label: "Active Complaints", 
    value: "48", 
    change: "-8.2%", 
    trend: "down",
    icon: MessageSquarePlus,
    color: "bg-orange-500" 
  },
  { 
    label: "Events This Month", 
    value: "12", 
    change: "+25%", 
    trend: "up",
    icon: Calendar,
    color: "bg-emerald-500" 
  },
  { 
    label: "Announcements", 
    value: "156", 
    change: "+5.8%", 
    trend: "up",
    icon: Megaphone,
    color: "bg-purple-500" 
  },
]

const recentComplaints = [
  {
    id: "C-2024-048",
    title: "Library WiFi Connectivity Issues",
    student: "Mekdes T.",
    department: "Student Service",
    status: "pending",
    priority: "high",
    date: "2 hours ago",
  },
  {
    id: "C-2024-047",
    title: "Cafeteria Cleanliness Concern",
    student: "Yonas B.",
    department: "Student Service",
    status: "in-progress",
    priority: "medium",
    date: "5 hours ago",
  },
  {
    id: "C-2024-046",
    title: "Grade Appeal Request",
    student: "Sara A.",
    department: "Academic Affairs",
    status: "resolved",
    priority: "high",
    date: "1 day ago",
  },
  {
    id: "C-2024-045",
    title: "Parking Lot Security",
    student: "Daniel H.",
    department: "Ethics & Peace",
    status: "pending",
    priority: "low",
    date: "2 days ago",
  },
]

const recentUsers = [
  { name: "Hanna Girma", email: "hanna.g@aau.edu.et", role: "Student", department: "Management", joined: "Today" },
  { name: "Abebe Tadesse", email: "abebe.t@aau.edu.et", role: "Student", department: "BAIS", joined: "Yesterday" },
  { name: "Tigist Haile", email: "tigist.h@aau.edu.et", role: "Student", department: "Accounting", joined: "2 days ago" },
]

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    "in-progress": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    resolved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  }
  return colors[status] || "bg-gray-100 text-gray-700"
}

const getStatusIcon = (status: string) => {
  const icons: Record<string, any> = {
    pending: Clock,
    "in-progress": AlertTriangle,
    resolved: CheckCircle2,
    rejected: XCircle,
  }
  return icons[status] || Clock
}

const getPriorityColor = (priority: string) => {
  const colors: Record<string, string> = {
    high: "bg-red-500",
    medium: "bg-orange-500",
    low: "bg-emerald-500",
  }
  return colors[priority] || "bg-gray-500"
}

export function AdminDashboardPage({ user, onLogout, setView, darkMode, setDarkMode }: AdminDashboardPageProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        className={`fixed left-0 top-0 bottom-0 w-[280px] bg-card border-r border-border z-40 flex flex-col ${
          sidebarOpen ? "" : "-translate-x-full"
        } transition-transform lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <h1 className="font-bold text-foreground">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">AAU Student Council</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                item.active
                  ? "bg-gradient-to-r from-blue-900 to-blue-800 text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="flex-1 font-medium">{item.label}</span>
              {item.count && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  item.active ? "bg-white/20" : "bg-muted"
                }`}>
                  {item.count.toLocaleString()}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-blue-900 font-bold">
              {user.email[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.email}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onLogout} className="shrink-0">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-[280px]">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <LayoutDashboard className="h-5 w-5" />
              </Button>
              <div>
                <h2 className="text-xl font-bold text-foreground">Dashboard Overview</h2>
                <p className="text-sm text-muted-foreground">Welcome back, Admin</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                  5
                </span>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-8">
          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <Card key={stat.label} className="border-border/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`h-12 w-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                      stat.trend === "up" ? "text-emerald-500" : "text-red-500"
                    }`}>
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Complaints Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <Card className="border-border/50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Recent Complaints</CardTitle>
                    <CardDescription>Manage and respond to student complaints</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
                      <Plus className="h-4 w-4 mr-2" />
                      New
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">ID</th>
                          <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title</th>
                          <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Student</th>
                          <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                          <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Priority</th>
                          <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentComplaints.map((complaint) => {
                          const StatusIcon = getStatusIcon(complaint.status)
                          return (
                            <tr key={complaint.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                              <td className="py-4 px-4">
                                <span className="text-xs font-mono text-muted-foreground">{complaint.id}</span>
                              </td>
                              <td className="py-4 px-4">
                                <div>
                                  <p className="font-medium text-foreground text-sm">{complaint.title}</p>
                                  <p className="text-xs text-muted-foreground">{complaint.department}</p>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <span className="text-sm text-foreground">{complaint.student}</span>
                              </td>
                              <td className="py-4 px-4">
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                                  <StatusIcon className="h-3 w-3" />
                                  {complaint.status}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <span className={`inline-block h-2 w-2 rounded-full ${getPriorityColor(complaint.priority)}`} />
                              </td>
                              <td className="py-4 px-4 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Users */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-border/50 h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Recent Users</CardTitle>
                    <CardDescription>New student registrations</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    View All
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentUsers.map((user) => (
                    <div
                      key={user.email}
                      className="flex items-center gap-4 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.department}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{user.joined}</span>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Analytics Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Analytics Overview</CardTitle>
                  <CardDescription>Complaint resolution trends</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Bar
                  </Button>
                  <Button variant="ghost" size="sm">
                    <PieChart className="h-4 w-4 mr-2" />
                    Pie
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/30 rounded-xl border border-dashed border-border">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Analytics visualization</p>
                    <p className="text-xs text-muted-foreground">Chart integration coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
