import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import {
  FileText,
  Download,
  Search,
  Filter,
  ArrowLeft,
  Calendar,
  User,
  FileCheck,
  Clock,
  Upload,
} from "lucide-react"

interface Document {
  id: string
  title: string
  category: string
  type: string
  author: string
  date: string
  size: string
  status: "approved" | "pending" | "draft"
  description: string
}

interface DocumentsPageProps {
  onBack: () => void
}

export function DocumentsPage({ onBack }: DocumentsPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const { toast } = useToast()

  const documents: Document[] = [
    {
      id: "DOC-001",
      title: "Student Council Meeting Minutes - May 2026",
      category: "Meeting Minutes",
      type: "PDF",
      author: "Secretary Office",
      date: "2026-05-10",
      size: "2.4 MB",
      status: "approved",
      description: "Official minutes from the monthly student council meeting discussing budget allocation and upcoming events.",
    },
    {
      id: "DOC-002",
      title: "Budget Proposal Q3 2026",
      category: "Proposals",
      type: "PDF",
      author: "Finance Committee",
      date: "2026-05-08",
      size: "1.8 MB",
      status: "pending",
      description: "Quarterly budget proposal for student activities and council operations.",
    },
    {
      id: "DOC-003",
      title: "Annual Activity Report 2025",
      category: "Reports",
      type: "PDF",
      author: "President Office",
      date: "2026-04-15",
      size: "5.2 MB",
      status: "approved",
      description: "Comprehensive annual report covering all student council activities and achievements in 2025.",
    },
    {
      id: "DOC-004",
      title: "Campus Event Guidelines",
      category: "Policies",
      type: "PDF",
      author: "Administrative Board",
      date: "2026-03-20",
      size: "890 KB",
      status: "approved",
      description: "Official guidelines and procedures for organizing campus events and activities.",
    },
    {
      id: "DOC-005",
      title: "Student Representative Handbook",
      category: "Resources",
      type: "PDF",
      author: "Leadership Team",
      date: "2026-02-10",
      size: "3.1 MB",
      status: "approved",
      description: "Comprehensive handbook for student representatives including roles, responsibilities, and best practices.",
    },
    {
      id: "DOC-006",
      title: "Constitution Amendment Draft",
      category: "Proposals",
      type: "DOCX",
      author: "Constitutional Committee",
      date: "2026-05-12",
      size: "450 KB",
      status: "draft",
      description: "Draft amendments to the student council constitution for review and discussion.",
    },
  ]

  const categories = ["all", "Meeting Minutes", "Proposals", "Reports", "Policies", "Resources"]

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  function handleDownload(doc: Document) {
    toast({
      title: "Download Started",
      description: `Downloading ${doc.title}...`,
      variant: "success",
    })
  }

  function handleView(doc: Document) {
    setSelectedDocument(doc)
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "approved":
        return "bg-green-500/10 text-green-700 dark:text-green-400"
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
      case "draft":
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400"
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400"
    }
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case "approved":
        return <FileCheck className="h-3 w-3" />
      case "pending":
        return <Clock className="h-3 w-3" />
      case "draft":
        return <FileText className="h-3 w-3" />
      default:
        return <FileText className="h-3 w-3" />
    }
  }

  if (selectedDocument) {
    return (
      <div className="min-h-dvh bg-background text-foreground">
        <header className="sticky top-0 z-50 glass border-b border-border">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Button variant="ghost" size="sm" onClick={() => setSelectedDocument(null)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Documents
            </Button>
            <h1 className="text-lg font-semibold">Document Details</h1>
            <div className="w-20" />
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <Card className="border-border/60 shadow-xl">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getStatusColor(selectedDocument.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(selectedDocument.status)}
                        {selectedDocument.status}
                      </span>
                    </Badge>
                    <Badge variant="outline">{selectedDocument.category}</Badge>
                  </div>
                  <CardTitle className="text-2xl">{selectedDocument.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {selectedDocument.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Author</p>
                    <p className="font-medium">{selectedDocument.author}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{selectedDocument.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">File Type</p>
                    <p className="font-medium">{selectedDocument.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <Download className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">File Size</p>
                    <p className="font-medium">{selectedDocument.size}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                <Button
                  className="flex-1"
                  onClick={() => handleDownload(selectedDocument)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Document
                </Button>
                <Button variant="outline" onClick={() => setSelectedDocument(null)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-lg font-semibold">Document Management</h1>
          <Button size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((doc) => (
            <Card
              key={doc.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/60"
              onClick={() => handleView(doc)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <Badge className={getStatusColor(doc.status)}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(doc.status)}
                      {doc.status}
                    </span>
                  </Badge>
                </div>
                <CardTitle className="text-base line-clamp-2">{doc.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {doc.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{doc.type}</span>
                  <span>{doc.size}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No documents found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
