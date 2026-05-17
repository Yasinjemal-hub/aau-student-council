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
  ArrowLeft,
  Calendar,
  User,
  FileCheck,
  Clock,
  Upload,
  Sparkles,
  FolderOpen,
  Eye,
  X,
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

  function getStatusConfig(status: string) {
    switch (status) {
      case "approved":
        return { 
          bg: "bg-emerald-500/10", 
          text: "text-emerald-700", 
          border: "border-emerald-200",
          icon: FileCheck 
        }
      case "pending":
        return { 
          bg: "bg-amber-500/10", 
          text: "text-amber-700", 
          border: "border-amber-200",
          icon: Clock 
        }
      case "draft":
        return { 
          bg: "bg-slate-500/10", 
          text: "text-slate-700", 
          border: "border-slate-200",
          icon: FileText 
        }
      default:
        return { 
          bg: "bg-slate-500/10", 
          text: "text-slate-700", 
          border: "border-slate-200",
          icon: FileText 
        }
    }
  }

  if (selectedDocument) {
    const statusConfig = getStatusConfig(selectedDocument.status)
    const StatusIcon = statusConfig.icon
    
    return (
      <div className="min-h-dvh bg-gradient-to-b from-background to-muted/30 text-foreground">
        <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Button variant="ghost" size="sm" onClick={() => setSelectedDocument(null)} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Documents
            </Button>
            <h1 className="text-sm font-semibold text-muted-foreground">Document Details</h1>
            <Button variant="ghost" size="icon" onClick={() => setSelectedDocument(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
          <Card className="border-border/60 shadow-xl rounded-2xl overflow-hidden">
            {/* Header stripe */}
            <div className="h-2 bg-gradient-to-r from-blue-900 to-blue-800" />
            
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={`${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border font-semibold`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {selectedDocument.status}
                    </Badge>
                    <Badge variant="outline" className="font-medium">{selectedDocument.category}</Badge>
                  </div>
                  <CardTitle className="text-2xl text-blue-900">{selectedDocument.title}</CardTitle>
                  <CardDescription className="mt-3 text-base leading-relaxed">
                    {selectedDocument.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border/50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900/10">
                    <User className="h-5 w-5 text-blue-900" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Author</p>
                    <p className="font-semibold">{selectedDocument.author}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border/50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900/10">
                    <Calendar className="h-5 w-5 text-blue-900" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Date</p>
                    <p className="font-semibold">{selectedDocument.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border/50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900/10">
                    <FileText className="h-5 w-5 text-blue-900" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">File Type</p>
                    <p className="font-semibold">{selectedDocument.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border/50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-900/10">
                    <Download className="h-5 w-5 text-blue-900" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">File Size</p>
                    <p className="font-semibold">{selectedDocument.size}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-border">
                <Button
                  className="flex-1 bg-blue-900 hover:bg-blue-800 shadow-lg shadow-blue-900/25 rounded-xl h-12 font-semibold"
                  onClick={() => handleDownload(selectedDocument)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Document
                </Button>
                <Button variant="outline" onClick={() => setSelectedDocument(null)} className="rounded-xl h-12 px-6">
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
    <div className="min-h-dvh bg-gradient-to-b from-background to-muted/30 text-foreground">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-border bg-gradient-to-r from-blue-900 to-blue-950">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" aria-hidden="true" />
        
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 shadow-lg shadow-yellow-400/25">
                <FolderOpen className="h-7 w-7 text-blue-900" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">Council Resources</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Document Library
                </h1>
                <p className="text-sm text-blue-200/70">
                  Access official documents, reports, and resources
                </p>
              </div>
            </div>

            <Button className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 shadow-lg shadow-yellow-400/25 rounded-xl font-semibold">
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>

          {/* Search Bar */}
          <div className="mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-200/50" />
              <Input
                placeholder="Search documents..."
                className="pl-11 h-12 bg-white/10 border-white/10 text-white placeholder:text-blue-200/50 focus:bg-white/15 focus:border-yellow-400/50 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Category Chips */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-xl font-semibold ${
                selectedCategory === category 
                  ? "bg-blue-900 hover:bg-blue-800 shadow-lg shadow-blue-900/25" 
                  : "hover:border-blue-900/30 hover:text-blue-900"
              }`}
            >
              {category === "all" ? "All Documents" : category}
            </Button>
          ))}
        </div>

        {/* Documents Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((doc) => {
            const statusConfig = getStatusConfig(doc.status)
            const StatusIcon = statusConfig.icon
            
            return (
              <Card
                key={doc.id}
                className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-border/60 rounded-2xl overflow-hidden"
                onClick={() => handleView(doc)}
              >
                {/* Top stripe */}
                <div className="h-1.5 bg-gradient-to-r from-blue-900 to-blue-800 group-hover:from-yellow-400 group-hover:to-yellow-500 transition-colors" />
                
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-900/10 text-blue-900 group-hover:bg-yellow-400 group-hover:text-blue-900 transition-colors">
                      <FileText className="h-6 w-6" />
                    </div>
                    <Badge className={`${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border font-semibold`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {doc.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-base line-clamp-2 group-hover:text-blue-900 transition-colors">
                    {doc.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mt-2">
                    {doc.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/50">
                    <span className="font-medium">{doc.type}</span>
                    <span className="font-medium">{doc.size}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-4 text-blue-900 hover:bg-blue-900/10 font-semibold rounded-xl group/btn"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-20">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
              <FileText className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">No documents found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button 
              variant="outline" 
              onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
              className="rounded-xl"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
