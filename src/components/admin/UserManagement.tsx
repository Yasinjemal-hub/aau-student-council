import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { MoreHorizontal, Edit, Ban, Shield, User } from "lucide-react"
import api from "@/api/axios"

interface UserManagementProps {
  className?: string
}

type UserRole = "General Student" | "Council Member" | "Admin"

interface User {
  id: number
  name: string
  email: string
  role: UserRole
  status: "Active" | "Inactive"
  department: string
  joinedDate: string
}

export function UserManagement({ className }: UserManagementProps) {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        const response = await api.get('/admin/users')
        setUsers(response.data.users || [])
        setError(null)
      } catch (err) {
        console.error('Failed to fetch users:', err)
        setError('Failed to load users')
        // Fallback to mock data if API fails
        setUsers([
          {
            id: 1,
            name: "Abebe Kebede",
            email: "abebe.kebede@aau.edu.et",
            role: "Admin",
            status: "Active",
            department: "Computer Science",
            joinedDate: "2023-09-01",
          },
          {
            id: 2,
            name: "Tigist Haile",
            email: "tigist.haile@aau.edu.et",
            role: "Council Member",
            status: "Active",
            department: "Business Administration",
            joinedDate: "2023-09-15",
          },
          {
            id: 3,
            name: "Dawit Mengistu",
            email: "dawit.mengistu@aau.edu.et",
            role: "General Student",
            status: "Active",
            department: "Economics",
            joinedDate: "2024-01-10",
          },
          {
            id: 4,
            name: "Sara Tesfaye",
            email: "sara.tesfaye@aau.edu.et",
            role: "Council Member",
            status: "Active",
            department: "Law",
            joinedDate: "2023-10-20",
          },
          {
            id: 5,
            name: "Kaleb Alemu",
            email: "kaleb.alemu@aau.edu.et",
            role: "General Student",
            status: "Inactive",
            department: "Engineering",
            joinedDate: "2024-02-05",
          },
          {
            id: 6,
            name: "Hanna Solomon",
            email: "hanna.solomon@aau.edu.et",
            role: "General Student",
            status: "Active",
            department: "Medicine",
            joinedDate: "2024-01-25",
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleEditUser = (userId: number) => {
    console.log("Edit user:", userId)
    // Implement edit functionality
  }

  const handleDeactivateUser = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
        : user
    ))
  }

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case "Admin":
        return "default"
      case "Council Member":
        return "secondary"
      case "General Student":
        return "outline"
      default:
        return "outline"
    }
  }

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "Admin":
        return Shield
      case "Council Member":
        return User
      case "General Student":
        return User
      default:
        return User
    }
  }

  return (
    <div className={className}>
      {error && (
        <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-md">
          {error}
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-28" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-8 w-8" /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  users.map((user) => {
                    const RoleIcon = getRoleIcon(user.role)
                    return (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={getRoleBadgeVariant(user.role)} className="gap-1">
                            <RoleIcon className="h-3 w-3" />
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.joinedDate}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditUser(user.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeactivateUser(user.id)}
                                className={user.status === "Active" ? "text-destructive" : ""}
                              >
                                <Ban className="h-4 w-4 mr-2" />
                                {user.status === "Active" ? "Deactivate" : "Activate"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
