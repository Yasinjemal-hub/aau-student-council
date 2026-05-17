import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, Clock, AlertCircle, Activity } from "lucide-react"
import api from "@/api/axios"

interface DashboardViewProps {
  className?: string
}

interface Metric {
  title: string
  value: string
  change: string
  icon: any
  color: string
}

interface AuditLog {
  id: number
  action: string
  admin: string
  target: string
  timestamp: string
  status: string
}

export function DashboardView({ className }: DashboardViewProps) {
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setIsLoading(true)
        const response = await api.get('/admin/dashboard/metrics')
        setMetrics(response.data.metrics || [])
        setAuditLogs(response.data.auditLogs || [])
        setError(null)
      } catch (err) {
        console.error('Failed to fetch dashboard metrics:', err)
        setError('Failed to load dashboard data')
        // Fallback to mock data if API fails
        setMetrics([
          {
            title: "Active Users",
            value: "1,234",
            change: "+12%",
            icon: Users,
            color: "text-blue-600",
          },
          {
            title: "System Uptime",
            value: "99.9%",
            change: "+0.1%",
            icon: Clock,
            color: "text-green-600",
          },
          {
            title: "Error Rate",
            value: "0.02%",
            change: "-0.01%",
            icon: AlertCircle,
            color: "text-red-600",
          },
          {
            title: "API Requests",
            value: "45.2K",
            change: "+8%",
            icon: Activity,
            color: "text-purple-600",
          },
        ])
        setAuditLogs([
          {
            id: 1,
            action: "User Created",
            admin: "John Doe",
            target: "student@example.com",
            timestamp: "2024-01-15 10:30:00",
            status: "Success",
          },
          {
            id: 2,
            action: "Role Updated",
            admin: "Jane Smith",
            target: "council@example.com",
            timestamp: "2024-01-15 09:45:00",
            status: "Success",
          },
          {
            id: 3,
            action: "Content Deleted",
            admin: "John Doe",
            target: "Announcement #123",
            timestamp: "2024-01-15 08:20:00",
            status: "Success",
          },
          {
            id: 4,
            action: "Bulk Import",
            admin: "Admin User",
            target: "150 students",
            timestamp: "2024-01-14 16:00:00",
            status: "Success",
          },
          {
            id: 5,
            action: "User Deactivated",
            admin: "Jane Smith",
            target: "inactive@example.com",
            timestamp: "2024-01-14 14:30:00",
            status: "Success",
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchMetrics()
  }, [])


  return (
    <div className={className}>
      {error && (
        <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-md">
          {error}
        </div>
      )}
      
      {/* System Health Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-20 mb-2" />
                <Skeleton className="h-3 w-16" />
              </CardContent>
            </Card>
          ))
        ) : (
          metrics.map((metric) => {
            const Icon = metric.icon
            return (
              <Card key={metric.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {metric.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className={metric.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                      {metric.change}
                    </span>{" "}
                    from last month
                  </p>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Audit Log Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Audit Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.action}</TableCell>
                      <TableCell>{log.admin}</TableCell>
                      <TableCell>{log.target}</TableCell>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {log.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
