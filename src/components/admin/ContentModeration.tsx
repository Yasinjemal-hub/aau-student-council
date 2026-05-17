import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Eye, AlertTriangle, MessageSquare, Megaphone } from "lucide-react"

interface ContentModerationProps {
  className?: string
}

type ContentType = "Announcement" | "Feedback"
type FlagReason = "Inappropriate Language" | "Spam" | "Misinformation" | "Harassment" | "Other"

interface FlaggedContent {
  id: number
  type: ContentType
  title: string
  content: string
  author: string
  flagReason: FlagReason
  flagCount: number
  flaggedDate: string
  status: "Pending" | "Reviewed" | "Deleted"
}

export function ContentModeration({ className }: ContentModerationProps) {
  const [flaggedContent, setFlaggedContent] = useState<FlaggedContent[]>([
    {
      id: 1,
      type: "Announcement",
      title: "Urgent Meeting Notice",
      content: "All students must attend the emergency meeting tomorrow...",
      author: "Council Member",
      flagReason: "Misinformation",
      flagCount: 5,
      flaggedDate: "2024-01-15 14:30:00",
      status: "Pending",
    },
    {
      id: 2,
      type: "Feedback",
      title: "Complaint about library hours",
      content: "The library hours are completely unreasonable and...",
      author: "student1@aau.edu.et",
      flagReason: "Inappropriate Language",
      flagCount: 3,
      flaggedDate: "2024-01-15 12:15:00",
      status: "Pending",
    },
    {
      id: 3,
      type: "Announcement",
      title: "Free scholarship opportunity",
      content: "Click here to get a free scholarship - no application needed...",
      author: "Unknown",
      flagReason: "Spam",
      flagCount: 12,
      flaggedDate: "2024-01-15 10:00:00",
      status: "Pending",
    },
    {
      id: 4,
      type: "Feedback",
      title: "Report on campus facilities",
      content: "Multiple reports of broken equipment in the science labs...",
      author: "student2@aau.edu.et",
      flagReason: "Harassment",
      flagCount: 2,
      flaggedDate: "2024-01-14 16:45:00",
      status: "Reviewed",
    },
    {
      id: 5,
      type: "Announcement",
      title: "Event cancellation",
      content: "Due to unforeseen circumstances, the annual cultural event...",
      author: "Council Member",
      flagReason: "Other",
      flagCount: 1,
      flaggedDate: "2024-01-14 09:30:00",
      status: "Deleted",
    },
  ])

  const handleDelete = (contentId: number) => {
    setFlaggedContent(flaggedContent.map(content =>
      content.id === contentId
        ? { ...content, status: "Deleted" as const }
        : content
    ))
  }

  const handleView = (contentId: number) => {
    console.log("View content:", contentId)
    // Implement view functionality (could open a dialog/modal)
  }

  const getTypeIcon = (type: ContentType) => {
    return type === "Announcement" ? Megaphone : MessageSquare
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Pending":
        return "destructive"
      case "Reviewed":
        return "secondary"
      case "Deleted":
        return "outline"
      default:
        return "outline"
    }
  }

  const getFlagReasonColor = (reason: FlagReason) => {
    switch (reason) {
      case "Inappropriate Language":
        return "text-red-600"
      case "Spam":
        return "text-orange-600"
      case "Misinformation":
        return "text-purple-600"
      case "Harassment":
        return "text-red-700"
      default:
        return "text-gray-600"
    }
  }

  const pendingCount = flaggedContent.filter(c => c.status === "Pending").length

  return (
    <div className={className}>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <span className="text-lg font-semibold">
            {pendingCount} items pending review
          </span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Flagged Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Flag Reason</TableHead>
                  <TableHead>Flags</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {flaggedContent.map((content) => {
                  const TypeIcon = getTypeIcon(content.type)
                  return (
                    <TableRow key={content.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TypeIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{content.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium max-w-xs">
                        <div className="truncate">{content.title}</div>
                      </TableCell>
                      <TableCell>{content.author}</TableCell>
                      <TableCell>
                        <span className={`text-sm font-medium ${getFlagReasonColor(content.flagReason)}`}>
                          {content.flagReason}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          {content.flagCount}
                        </Badge>
                      </TableCell>
                      <TableCell>{content.flaggedDate}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(content.status)}>
                          {content.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleView(content.id)}
                            disabled={content.status === "Deleted"}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(content.id)}
                            disabled={content.status === "Deleted"}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
