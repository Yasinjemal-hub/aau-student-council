import { useState } from "react"
import { 
  Megaphone, 
  Calendar, 
  MessageSquare, 
  FolderOpen,
  Menu,
  X,
  LogOut,
  Download,
  Upload,
  Users,
  FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectOption } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface CouncilMemberDashboardProps {
  className?: string
}

export function CouncilMemberDashboard({ className }: CouncilMemberDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("announcements")

  // Announcement state
  const [announcementTitle, setAnnouncementTitle] = useState("")
  const [announcementCategory, setAnnouncementCategory] = useState("")
  const [announcementContent, setAnnouncementContent] = useState("")
  const [pinToTop, setPinToTop] = useState(false)
  const [attachments, setAttachments] = useState<File[]>([])

  // Event state
  const [eventTitle, setEventTitle] = useState("")
  const [eventLocation, setEventLocation] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventCapacity, setEventCapacity] = useState("")
  const [events, setEvents] = useState([
    { id: 1, title: "Student Council Meeting", location: "Room 101", date: "2024-06-15", capacity: 50, registered: 32 },
    { id: 2, title: "Campus Clean-up Day", location: "Main Campus", date: "2024-06-20", capacity: 100, registered: 78 },
    { id: 3, title: "Career Fair", location: "Auditorium", date: "2024-07-01", capacity: 200, registered: 145 },
  ])

  // Feedback state
  const [feedbackItems, setFeedbackItems] = useState([
    { id: 1, student: "John Doe", email: "john@university.edu", suggestion: "Extend library hours during finals week", status: "Received", isAnonymous: false, date: "2024-06-10" },
    { id: 2, student: "Anonymous", email: "", suggestion: "Add more vegan options in cafeteria", status: "Under Review", isAnonymous: true, date: "2024-06-11" },
    { id: 3, student: "Jane Smith", email: "jane@university.edu", suggestion: "Create a student mentorship program", status: "Resolved", isAnonymous: false, date: "2024-06-12" },
    { id: 4, student: "Anonymous", email: "", suggestion: "Improve Wi-Fi coverage in dorms", status: "Closed", isAnonymous: true, date: "2024-06-13" },
  ])

  // Resource state
  const [resourceTitle, setResourceTitle] = useState("")
  const [resourceFile, setResourceFile] = useState<File | null>(null)
  const [resources, setResources] = useState([
    { id: 1, title: "Meeting Minutes - May 2024", type: "PDF", size: "245 KB", uploadedBy: "Council President", date: "2024-06-01" },
    { id: 2, title: "Budget Report Q2 2024", type: "XLSX", size: "1.2 MB", uploadedBy: "Treasurer", date: "2024-06-05" },
    { id: 3, title: "Annual Report 2023", type: "PDF", size: "3.5 MB", uploadedBy: "Secretary", date: "2024-06-08" },
  ])

  const sidebarItems = [
    { id: "announcements", label: "Announcements", icon: Megaphone },
    { id: "events", label: "Events", icon: Calendar },
    { id: "feedback", label: "Feedback", icon: MessageSquare },
    { id: "resources", label: "Resources", icon: FolderOpen },
  ]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setAttachments([...attachments, ...newFiles])
    }
  }

  const handleResourceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResourceFile(e.target.files[0])
    }
  }

  const handleAddEvent = () => {
    if (eventTitle && eventLocation && eventDate && eventCapacity) {
      const newEvent = {
        id: events.length + 1,
        title: eventTitle,
        location: eventLocation,
        date: eventDate,
        capacity: parseInt(eventCapacity),
        registered: 0,
      }
      setEvents([...events, newEvent])
      setEventTitle("")
      setEventLocation("")
      setEventDate("")
      setEventCapacity("")
    }
  }

  const handleAddResource = () => {
    if (resourceTitle && resourceFile) {
      const newResource = {
        id: resources.length + 1,
        title: resourceTitle,
        type: resourceFile.name.split('.').pop()?.toUpperCase() || "FILE",
        size: `${(resourceFile.size / 1024).toFixed(1)} KB`,
        uploadedBy: "Council Member",
        date: new Date().toISOString().split('T')[0],
      }
      setResources([...resources, newResource])
      setResourceTitle("")
      setResourceFile(null)
    }
  }

  const handleFeedbackStatusChange = (id: number, newStatus: string) => {
    setFeedbackItems(feedbackItems.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ))
  }

  const exportEventsToCSV = () => {
    const headers = ["ID", "Title", "Location", "Date", "Capacity", "Registered"]
    const rows = events.map(e => [e.id, e.title, e.location, e.date, e.capacity, e.registered])
    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "events.csv"
    a.click()
  }

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
            <h1 className="text-xl font-bold text-foreground">AAU Council</h1>
            <p className="text-sm text-muted-foreground">Member Dashboard</p>
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

            {/* Announcements Tab */}
            {activeTab === "announcements" && (
              <TabsContent className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Manage Announcements</h2>
                  <p className="text-muted-foreground">
                    Create and manage council announcements
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Create New Announcement</CardTitle>
                    <CardDescription>Draft and publish announcements to the student body</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter announcement title"
                        value={announcementTitle}
                        onChange={(e) => setAnnouncementTitle(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        id="category"
                        placeholder="Select category"
                        value={announcementCategory}
                        onChange={(e) => setAnnouncementCategory(e.target.value)}
                      >
                        <SelectOption value="general">General</SelectOption>
                        <SelectOption value="academic">Academic</SelectOption>
                        <SelectOption value="events">Events</SelectOption>
                        <SelectOption value="urgent">Urgent</SelectOption>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        placeholder="Write your announcement content here..."
                        className="min-h-[150px]"
                        value={announcementContent}
                        onChange={(e) => setAnnouncementContent(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="attachments">Attachments</Label>
                      <Input
                        id="attachments"
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                      />
                      {attachments.length > 0 && (
                        <div className="text-sm text-muted-foreground">
                          {attachments.length} file(s) selected
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="pin"
                        checked={pinToTop}
                        onCheckedChange={setPinToTop}
                      />
                      <Label htmlFor="pin">Pin to Top</Label>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4">
                      <Button>Publish</Button>
                      <Button variant="outline">Save as Draft</Button>
                      <Button variant="outline">Schedule</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Events Tab */}
            {activeTab === "events" && (
              <TabsContent className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Events</h2>
                  <p className="text-muted-foreground">
                    Create and manage council events
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Create New Event</CardTitle>
                    <CardDescription>Set up a new event for students</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="eventTitle">Event Title</Label>
                        <Input
                          id="eventTitle"
                          placeholder="Enter event title"
                          value={eventTitle}
                          onChange={(e) => setEventTitle(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="eventLocation">Location</Label>
                        <Input
                          id="eventLocation"
                          placeholder="Enter location"
                          value={eventLocation}
                          onChange={(e) => setEventLocation(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="eventDate">Date</Label>
                        <Input
                          id="eventDate"
                          type="date"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="eventCapacity">Capacity Limit</Label>
                        <Input
                          id="eventCapacity"
                          type="number"
                          placeholder="Enter capacity"
                          value={eventCapacity}
                          onChange={(e) => setEventCapacity(e.target.value)}
                        />
                      </div>
                    </div>

                    <Button onClick={handleAddEvent}>Create Event</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Existing Events</CardTitle>
                    <CardDescription>View and manage upcoming events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-end mb-4">
                      <Button variant="outline" onClick={exportEventsToCSV}>
                        <Download className="h-4 w-4 mr-2" />
                        Export to CSV
                      </Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Capacity</TableHead>
                          <TableHead>Registered</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {events.map((event) => (
                          <TableRow key={event.id}>
                            <TableCell className="font-medium">{event.title}</TableCell>
                            <TableCell>{event.location}</TableCell>
                            <TableCell>{event.date}</TableCell>
                            <TableCell>{event.capacity}</TableCell>
                            <TableCell>{event.registered}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                <Users className="h-4 w-4 mr-2" />
                                View Attendees
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Feedback Tab */}
            {activeTab === "feedback" && (
              <TabsContent className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Feedback Management</h2>
                  <p className="text-muted-foreground">
                    Review and respond to student suggestions
                  </p>
                </div>

                <Card>
                  <CardContent className="pt-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Suggestion</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {feedbackItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              {item.isAnonymous ? (
                                <span className="text-muted-foreground italic">Anonymous</span>
                              ) : (
                                <div>
                                  <div className="font-medium">{item.student}</div>
                                  <div className="text-sm text-muted-foreground">{item.email}</div>
                                </div>
                              )}
                            </TableCell>
                            <TableCell>{item.suggestion}</TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>
                              <Select
                                value={item.status}
                                onChange={(e) => handleFeedbackStatusChange(item.id, e.target.value)}
                                className="w-[160px]"
                              >
                                <SelectOption value="Received">Received</SelectOption>
                                <SelectOption value="Under Review">Under Review</SelectOption>
                                <SelectOption value="Resolved">Resolved</SelectOption>
                                <SelectOption value="Closed">Closed</SelectOption>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Resources Tab */}
            {activeTab === "resources" && (
              <TabsContent className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Shared Resources</h2>
                  <p className="text-muted-foreground">
                    Upload and manage council documents
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Upload New Resource</CardTitle>
                    <CardDescription>Share documents with the council</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="resourceTitle">Document Title</Label>
                      <Input
                        id="resourceTitle"
                        placeholder="Enter document title"
                        value={resourceTitle}
                        onChange={(e) => setResourceTitle(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="resourceFile">File</Label>
                      <Input
                        id="resourceFile"
                        type="file"
                        onChange={handleResourceUpload}
                      />
                      {resourceFile && (
                        <div className="text-sm text-muted-foreground">
                          Selected: {resourceFile.name}
                        </div>
                      )}
                    </div>

                    <Button onClick={handleAddResource}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Available Resources</CardTitle>
                    <CardDescription>Download shared council documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Uploaded By</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {resources.map((resource) => (
                          <TableRow key={resource.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                {resource.title}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs">
                                {resource.type}
                              </span>
                            </TableCell>
                            <TableCell>{resource.size}</TableCell>
                            <TableCell>{resource.uploadedBy}</TableCell>
                            <TableCell>{resource.date}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
    </div>
  )
}
