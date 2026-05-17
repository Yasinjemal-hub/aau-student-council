import { useState } from "react"
import { 
  LayoutDashboard, 
  Users, 
  Upload, 
  Shield, 
  Menu, 
  X,
  LogOut
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { DashboardView } from "./DashboardView"
import { UserManagement } from "./UserManagement"
import { BulkImport } from "./BulkImport"
import { ContentModeration } from "./ContentModeration"

interface AdminDashboardProps {
  className?: string
}

export function AdminDashboard({ className }: AdminDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "User Management", icon: Users },
    { id: "import", label: "Bulk Import", icon: Upload },
    { id: "moderation", label: "Content Moderation", icon: Shield },
  ]

  return (
    <div className={cn("min-h-screen bg-background flex", className)}>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="p-6 border-b border-border">
            <h1 className="text-xl font-bold text-foreground">AAU Admin</h1>
            <p className="text-sm text-muted-foreground">Student Council</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setSidebarOpen(false)
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <Tabs className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              {sidebarItems.map((item) => (
                <TabsTrigger 
                  key={item.id} 
                  active={activeTab === item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="gap-2"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {activeTab === "dashboard" && (
              <TabsContent className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                  <p className="text-muted-foreground">
                    Overview of system health and recent activities
                  </p>
                </div>
                <DashboardView />
              </TabsContent>
            )}

            {activeTab === "users" && (
              <TabsContent className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
                  <p className="text-muted-foreground">
                    Manage user accounts and permissions
                  </p>
                </div>
                <UserManagement />
              </TabsContent>
            )}

            {activeTab === "import" && (
              <TabsContent className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Bulk Import</h2>
                  <p className="text-muted-foreground">
                    Import student accounts from Registrar records
                  </p>
                </div>
                <BulkImport />
              </TabsContent>
            )}

            {activeTab === "moderation" && (
              <TabsContent className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Content Moderation</h2>
                  <p className="text-muted-foreground">
                    Review and moderate flagged content
                  </p>
                </div>
                <ContentModeration />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
    </div>
  )
}
