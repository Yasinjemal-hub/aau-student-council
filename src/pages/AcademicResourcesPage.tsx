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
  BookOpen,
  Search,
  Filter,
  ArrowLeft,
  ExternalLink,
  GraduationCap,
  FileText,
  Video,
  Link as LinkIcon,
  Clock,
} from "lucide-react"

interface Resource {
  id: string
  title: string
  category: string
  type: "document" | "video" | "link" | "course"
  author: string
  date: string
  duration?: string
  url?: string
  description: string
  tags: string[]
}

interface AcademicResourcesPageProps {
  onBack: () => void
}

export function AcademicResourcesPage({ onBack }: AcademicResourcesPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { toast } = useToast()

  const resources: Resource[] = [
    {
      id: "RES-001",
      title: "Introduction to Student Leadership",
      category: "Leadership",
      type: "course",
      author: "Student Affairs Office",
      date: "2026-04-01",
      duration: "2 hours",
      description: "Comprehensive course on developing leadership skills and understanding student governance structures.",
      tags: ["leadership", "governance", "skills"],
    },
    {
      id: "RES-002",
      title: "Academic Writing Guide",
      category: "Academic Skills",
      type: "document",
      author: "Academic Support Center",
      date: "2026-03-15",
      description: "Essential guide for academic writing, including research methods, citation styles, and paper structure.",
      tags: ["writing", "research", "citations"],
    },
    {
      id: "RES-003",
      title: "Time Management Workshop",
      category: "Study Skills",
      type: "video",
      author: "Counseling Services",
      date: "2026-04-20",
      duration: "45 minutes",
      description: "Interactive workshop on effective time management strategies for university students.",
      tags: ["time management", "productivity", "study skills"],
    },
    {
      id: "RES-004",
      title: "Library Research Portal",
      category: "Research",
      type: "link",
      author: "University Library",
      date: "2026-01-10",
      url: "https://library.aau.edu.et",
      description: "Access to digital library resources, databases, and research materials.",
      tags: ["library", "research", "databases"],
    },
    {
      id: "RES-005",
      title: "Exam Preparation Strategies",
      category: "Study Skills",
      type: "document",
      author: "Academic Success Center",
      date: "2026-05-01",
      description: "Proven strategies for effective exam preparation and stress management during finals.",
      tags: ["exams", "preparation", "stress management"],
    },
    {
      id: "RES-006",
      title: "Career Development Workshop",
      category: "Career",
      type: "video",
      author: "Career Services",
      date: "2026-04-25",
      duration: "1 hour 30 minutes",
      description: "Workshop covering resume writing, interview skills, and career planning for students.",
      tags: ["career", "resume", "interview"],
    },
    {
      id: "RES-007",
      title: "Digital Learning Tools",
      category: "Technology",
      type: "link",
      author: "IT Services",
      date: "2026-02-28",
      url: "https://learn.aau.edu.et",
      description: "Guide to using digital learning platforms and educational technology tools.",
      tags: ["technology", "digital learning", "tools"],
    },
    {
      id: "RES-008",
      title: "Research Methodology Course",
      category: "Research",
      type: "course",
      author: "Graduate School",
      date: "2026-03-10",
      duration: "4 hours",
      description: "Advanced course on research methodology, data collection, and analysis techniques.",
      tags: ["research", "methodology", "data analysis"],
    },
  ]

  const categories = ["all", "Leadership", "Academic Skills", "Study Skills", "Research", "Career", "Technology"]

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory =
      selectedCategory === "all" || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  function handleAccess(resource: Resource) {
    if (resource.type === "link" && resource.url) {
      toast({
        title: "Opening Resource",
        description: `Opening ${resource.title} in a new tab...`,
        variant: "success",
      })
      // In production, this would open the actual URL
    } else {
      toast({
        title: "Accessing Resource",
        description: `Opening ${resource.title}...`,
        variant: "success",
      })
    }
  }

  function getTypeIcon(type: string) {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "link":
        return <LinkIcon className="h-4 w-4" />
      case "course":
        return <GraduationCap className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  function getTypeColor(type: string) {
    switch (type) {
      case "document":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400"
      case "video":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-400"
      case "link":
        return "bg-green-500/10 text-green-700 dark:text-green-400"
      case "course":
        return "bg-orange-500/10 text-orange-700 dark:text-orange-400"
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400"
    }
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-lg font-semibold">Academic Resources</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <BookOpen className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Academic Resources</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access comprehensive learning materials, courses, and resources to support your academic journey at AAU School of Commerce.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
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

        {/* Resources Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <Card
              key={resource.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/60"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${getTypeColor(resource.type)}`}>
                    {getTypeIcon(resource.type)}
                  </div>
                  <Badge variant="outline">{resource.category}</Badge>
                </div>
                <CardTitle className="text-base line-clamp-2">{resource.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {resource.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {resource.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{resource.author}</span>
                  {resource.duration && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {resource.duration}
                    </span>
                  )}
                </div>
                <Button
                  className="w-full"
                  size="sm"
                  onClick={() => handleAccess(resource)}
                >
                  {resource.type === "link" ? (
                    <>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Resource
                    </>
                  ) : (
                    <>
                      <BookOpen className="h-4 w-4 mr-2" />
                      Access Resource
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Quick Access Section */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Quick Access</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Library Portal",
                description: "Access digital library resources",
                icon: <BookOpen className="h-5 w-5" />,
              },
              {
                title: "Learning Management",
                description: "Online courses and materials",
                icon: <GraduationCap className="h-5 w-5" />,
              },
              {
                title: "Career Services",
                description: "Job opportunities and guidance",
                icon: <FileText className="h-5 w-5" />,
              },
              {
                title: "Academic Support",
                description: "Tutoring and study resources",
                icon: <Video className="h-5 w-5" />,
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="hover:shadow-md transition-all duration-300 cursor-pointer border-border/60"
              >
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
                    {item.icon}
                  </div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
