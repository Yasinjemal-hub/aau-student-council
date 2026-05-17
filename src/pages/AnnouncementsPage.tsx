import { useState, useMemo } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectOption } from "@/components/ui/select"
import {
  Search,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Megaphone,
  GraduationCap,
  Trophy,
  Users,
  Building2,
  Clock,
  Pin,
  ArrowLeft,
  Sparkles,
  Bell,
} from "lucide-react"

/* ── Types ───────────────────────────────────────────────── */
type Category = "Academic" | "Social" | "Sports" | "Administrative"

interface Announcement {
  id: string
  title: string
  description: string
  content: string
  category: Category
  date: string
  author: string
  pinned: boolean
}

/* ── Mock Data ───────────────────────────────────────────── */
const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "1",
    title: "Final Exam Schedule Updated for Spring 2026",
    description:
      "The Registrar's Office has released the revised final examination schedule. All students must check their individual timetables on the student portal.",
    content:
      "Please note that some exam venues have been changed due to renovation work in Block C. Students are advised to arrive at least 30 minutes before the scheduled time. Bring your student ID card — no entry without valid identification.",
    category: "Academic",
    date: "2026-05-12",
    author: "Office of the Registrar",
    pinned: true,
  },
  {
    id: "2",
    title: "Campus Closed on May 28 — National Holiday",
    description:
      "The university campus and all administrative offices will be closed on May 28, 2026 in observance of Downfall of the Derg.",
    content:
      "Library and laboratory access will also be unavailable. Online resources will remain accessible. Regular operations resume on May 29. Contact security at ext. 1234 for emergencies.",
    category: "Administrative",
    date: "2026-05-11",
    author: "University Administration",
    pinned: true,
  },
  {
    id: "3",
    title: "Student Council Elections — Nominations Open",
    description:
      "The Student Council is accepting nominations for the 2026/27 academic year. All eligible students may nominate themselves or others.",
    content:
      "Candidates must have a minimum GPA of 2.75 and no disciplinary record. Nomination forms are available at the Student Affairs Office (Room 204) and online at the student portal. Deadline: June 5, 2026.",
    category: "Administrative",
    date: "2026-05-10",
    author: "Electoral Committee",
    pinned: false,
  },
  {
    id: "4",
    title: "Inter-Department Football Tournament Kickoff",
    description:
      "The annual inter-department football tournament begins May 20. All departments have registered teams. Come support your department!",
    content:
      "Matches will be held at the main campus field every Tuesday and Thursday from 4:00–6:00 PM. The final is scheduled for June 15. Refreshments will be available. Volunteers needed for officiating — contact the Sports Committee.",
    category: "Sports",
    date: "2026-05-09",
    author: "Sports Committee",
    pinned: false,
  },
  {
    id: "5",
    title: "Guest Lecture: Digital Transformation in Ethiopian Banking",
    description:
      "The Department of Management invites all students to a guest lecture by Dr. Abebe Tadesse, CTO of the Commercial Bank of Ethiopia.",
    content:
      "Date: May 22, 2026, 10:00 AM. Venue: Auditorium Hall B. The session will cover fintech innovation, mobile banking adoption, and career opportunities in digital banking. Q&A session to follow. Attendance is open to all departments.",
    category: "Academic",
    date: "2026-05-08",
    author: "Department of Management",
    pinned: false,
  },
  {
    id: "6",
    title: "Annual Cultural Night — Tickets Now Available",
    description:
      "The Student Council presents the 2026 Cultural Night celebrating Ethiopia's diverse heritage. Music, dance, poetry, and traditional food.",
    content:
      "Date: June 1, 2026. Venue: Main Auditorium, 6:00 PM onwards. Tickets: 50 ETB (students), 100 ETB (guests). Available at the Student Council office or from department representatives. Performance slots still open — contact the cultural committee.",
    category: "Social",
    date: "2026-05-07",
    author: "Cultural Committee",
    pinned: false,
  },
  {
    id: "7",
    title: "Library Extended Hours During Exam Period",
    description:
      "The university library will extend its operating hours from May 15 through June 20 to support students preparing for final examinations.",
    content:
      "New hours: Monday–Saturday, 7:00 AM to 11:00 PM. Sunday: 8:00 AM to 8:00 PM. The quiet study zones on the 3rd floor will be reserved for exam preparation. Group study rooms must be booked 24 hours in advance.",
    category: "Academic",
    date: "2026-05-06",
    author: "University Library",
    pinned: false,
  },
  {
    id: "8",
    title: "Basketball Team Tryouts — Open to All",
    description:
      "The School of Commerce basketball team is holding tryouts for the 2026/27 season. Open to all registered students.",
    content:
      "Tryouts: May 18 & 19, 3:00–5:00 PM at the indoor gymnasium. Bring proper athletic wear and student ID. Previous experience preferred but not required. Selected players will represent the school in the AAU inter-campus league.",
    category: "Sports",
    date: "2026-05-05",
    author: "Sports Department",
    pinned: false,
  },
  {
    id: "9",
    title: "New Student Counseling Services Available",
    description:
      "The Student Affairs Office now offers free confidential counseling services for academic stress, personal issues, and career guidance.",
    content:
      "Sessions are available Monday–Friday, 9:00 AM to 4:00 PM. No appointment needed for walk-ins, but scheduling is recommended. All sessions are confidential. Contact: studentcounseling@aau.edu.et or visit Room 108, Student Services Building.",
    category: "Administrative",
    date: "2026-05-04",
    author: "Student Affairs Office",
    pinned: false,
  },
  {
    id: "10",
    title: "Community Service Day — Volunteer Signup",
    description:
      "Join fellow students for the annual Community Service Day at local schools in the Addis Ketema sub-city on May 25.",
    content:
      "Activities include tutoring, painting classrooms, and planting trees. Transportation provided. Volunteers will receive a certificate of participation. Sign up at the Student Council office or via the online form by May 20.",
    category: "Social",
    date: "2026-05-03",
    author: "Community Outreach Committee",
    pinned: false,
  },
  {
    id: "11",
    title: "Mid-Semester Grade Reports Available",
    description:
      "Mid-semester progress reports are now available on the student portal. Students below 2.0 GPA should consult their academic advisor.",
    content:
      "Advisors are available by appointment. Students on academic probation must attend the mandatory counseling session on May 16 at 2:00 PM in Room 305. Failure to attend may result in enrollment restrictions.",
    category: "Academic",
    date: "2026-05-02",
    author: "Academic Affairs",
    pinned: false,
  },
  {
    id: "12",
    title: "Photography Club Exhibition — Call for Entries",
    description:
      "The Photography Club invites submissions for its annual exhibition themed 'Campus Life Through Our Lens'. Open to all students.",
    content:
      "Submit up to 3 photos (digital, min 300 DPI) to photoclub@aau.edu.et by May 22. Selected works will be displayed in the main lobby June 3–10. Prizes for top 3 entries. All genres welcome.",
    category: "Social",
    date: "2026-05-01",
    author: "Photography Club",
    pinned: false,
  },
  {
    id: "13",
    title: "Wi-Fi Maintenance — Temporary Disruption Expected",
    description:
      "IT Services will perform maintenance on the campus Wi-Fi network on May 17 from 6:00 AM to 10:00 AM. Intermittent connectivity expected.",
    content:
      "Eduroam and AAU-Student networks will both be affected. Please download any necessary materials in advance. Wired connections in the library and computer labs will remain available during the maintenance window.",
    category: "Administrative",
    date: "2026-04-30",
    author: "IT Services",
    pinned: false,
  },
  {
    id: "14",
    title: "Women's Volleyball Team Wins Regional Championship",
    description:
      "Congratulations to the School of Commerce women's volleyball team for winning the Addis Ababa regional championship!",
    content:
      "The team defeated Hawassa University 3-1 in the final. Special congratulations to captain Sara Mulugeta for being named tournament MVP. A celebration ceremony will be held on May 14 at the main hall. All are welcome!",
    category: "Sports",
    date: "2026-04-29",
    author: "Sports Department",
    pinned: false,
  },
  {
    id: "15",
    title: "Research Methodology Workshop for Final Year Students",
    description:
      "A two-day workshop on research methodology and thesis writing will be conducted for all final-year students.",
    content:
      "Dates: May 23–24, 9:00 AM to 3:00 PM. Venue: Seminar Room 2. Topics: literature review, data collection, SPSS basics, and APA formatting. Registration required — sign up at your department office. Limited to 60 participants.",
    category: "Academic",
    date: "2026-04-28",
    author: "Research & Publications Office",
    pinned: false,
  },
]

const ITEMS_PER_PAGE = 5

const CATEGORY_ICONS: Record<Category, typeof GraduationCap> = {
  Academic: GraduationCap,
  Social: Users,
  Sports: Trophy,
  Administrative: Building2,
}

const CATEGORY_BADGE_VARIANT: Record<Category, "academic" | "social" | "sports" | "administrative"> = {
  Academic: "academic",
  Social: "social",
  Sports: "sports",
  Administrative: "administrative",
}

/* ── Component ───────────────────────────────────────────── */
interface AnnouncementsPageProps {
  onBack: () => void
}

export function AnnouncementsPage({ onBack }: AnnouncementsPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  /* ── Filtered & sorted data ────────────────────────────── */
  const filteredAnnouncements = useMemo(() => {
    let result = [...MOCK_ANNOUNCEMENTS]

    // Sort: pinned first, then by date (most recent)
    result.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

    // Filter by category
    if (categoryFilter !== "all") {
      result = result.filter((a) => a.category === categoryFilter)
    }

    // Search by keyword
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.description.toLowerCase().includes(query) ||
          a.content.toLowerCase().includes(query) ||
          a.author.toLowerCase().includes(query)
      )
    }

    return result
  }, [searchQuery, categoryFilter])

  /* ── Pagination ────────────────────────────────────────── */
  const totalPages = Math.max(1, Math.ceil(filteredAnnouncements.length / ITEMS_PER_PAGE))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const paginatedAnnouncements = filteredAnnouncements.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE
  )

  // Reset page when filters change
  function handleSearchChange(value: string) {
    setSearchQuery(value)
    setCurrentPage(1)
  }
  function handleCategoryChange(value: string) {
    setCategoryFilter(value)
    setCurrentPage(1)
  }

  /* ── Date formatter ────────────────────────────────────── */
  function formatDate(dateStr: string) {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  /* ── Category stats ────────────────────────────────────── */
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MOCK_ANNOUNCEMENTS.length }
    for (const a of MOCK_ANNOUNCEMENTS) {
      counts[a.category] = (counts[a.category] || 0) + 1
    }
    return counts
  }, [])

  return (
    <div className="min-h-dvh bg-gradient-to-b from-background to-muted/30">
      {/* Page Header */}
      <div className="relative overflow-hidden border-b border-border bg-gradient-to-r from-blue-900 to-blue-950">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" aria-hidden="true" />
        
        <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              id="announcements-back"
              aria-label="Go back"
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 shadow-lg shadow-yellow-400/25">
              <Megaphone className="h-7 w-7 text-blue-900" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">Stay Informed</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Announcements
              </h1>
              <p className="text-sm text-blue-200/70">
                Stay up to date with the latest from the Student Council
              </p>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-200/50" />
              <Input
                id="announcements-search"
                type="text"
                placeholder="Search announcements..."
                className="pl-11 h-12 bg-white/10 border-white/10 text-white placeholder:text-blue-200/50 focus:bg-white/15 focus:border-yellow-400/50 rounded-xl"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                aria-label="Search announcements"
              />
            </div>

            {/* Category Filter */}
            <div className="w-full sm:w-52">
              <Select
                id="category-filter"
                value={categoryFilter}
                onChange={(e) => handleCategoryChange(e.target.value)}
                aria-label="Filter by category"
                className="h-12 bg-white/10 border-white/10 text-white rounded-xl"
              >
                <SelectOption value="all">
                  All Categories ({categoryCounts.all})
                </SelectOption>
                <SelectOption value="Academic">
                  Academic ({categoryCounts.Academic || 0})
                </SelectOption>
                <SelectOption value="Social">
                  Social ({categoryCounts.Social || 0})
                </SelectOption>
                <SelectOption value="Sports">
                  Sports ({categoryCounts.Sports || 0})
                </SelectOption>
                <SelectOption value="Administrative">
                  Administrative ({categoryCounts.Administrative || 0})
                </SelectOption>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements Feed */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Category chips */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {(["all", "Academic", "Social", "Sports", "Administrative"] as const).map(
            (cat) => {
              const isActive = categoryFilter === cat
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-blue-900 text-white shadow-lg shadow-blue-900/25"
                      : "bg-card border border-border text-muted-foreground hover:border-blue-900/30 hover:text-blue-900"
                  }`}
                  id={`chip-${cat.toLowerCase()}`}
                >
                  {cat === "all" ? (
                    <Bell className="h-4 w-4" />
                  ) : (
                    (() => {
                      const Icon = CATEGORY_ICONS[cat]
                      return <Icon className="h-4 w-4" />
                    })()
                  )}
                  {cat === "all" ? "All" : cat}
                </button>
              )
            }
          )}
        </div>

        {/* Results count */}
        <p className="mb-4 text-sm text-muted-foreground">
          {filteredAnnouncements.length === 0
            ? "No announcements found"
            : `Showing ${(safeCurrentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(
                safeCurrentPage * ITEMS_PER_PAGE,
                filteredAnnouncements.length
              )} of ${filteredAnnouncements.length} announcement${
                filteredAnnouncements.length !== 1 ? "s" : ""
              }`}
        </p>

        {/* Cards */}
        {paginatedAnnouncements.length === 0 ? (
          <Card className="py-16 text-center rounded-2xl border-border/60">
            <CardContent>
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                <Search className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <p className="text-xl font-bold text-blue-900 mb-2">
                No announcements found
              </p>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-6 rounded-xl"
                onClick={() => {
                  setSearchQuery("")
                  setCategoryFilter("all")
                }}
                id="clear-filters"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {paginatedAnnouncements.map((announcement) => {
              const Icon = CATEGORY_ICONS[announcement.category]
              const isExpanded = expandedId === announcement.id

              return (
                <Card
                  key={announcement.id}
                  className={`group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl border-border/60 overflow-hidden ${
                    announcement.pinned
                      ? "border-yellow-400/30 bg-yellow-50/30"
                      : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        {/* Category icon */}
                        <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-900/10 text-blue-900 group-hover:bg-yellow-400 group-hover:text-blue-900 transition-all">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            {announcement.pinned && (
                              <Pin className="h-4 w-4 text-yellow-500 shrink-0" />
                            )}
                            <Badge variant={CATEGORY_BADGE_VARIANT[announcement.category]}>
                              {announcement.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-base leading-snug sm:text-lg group-hover:text-blue-900 transition-colors">
                            {announcement.title}
                          </CardTitle>
                        </div>
                      </div>

                      {/* Date & author — stacks on mobile */}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground sm:flex-col sm:items-end sm:gap-1 shrink-0">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(announcement.date)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {announcement.author}
                        </span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <CardDescription className="text-sm leading-relaxed">
                      {announcement.description}
                    </CardDescription>

                    {/* Expandable content */}
                    {isExpanded && (
                      <p className="mt-3 text-sm text-foreground/80 leading-relaxed border-t border-border pt-3">
                        {announcement.content}
                      </p>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-3 -ml-2 text-blue-900 hover:text-blue-800 hover:bg-blue-900/10 font-semibold rounded-xl"
                      onClick={() =>
                        setExpandedId(isExpanded ? null : announcement.id)
                      }
                      id={`expand-${announcement.id}`}
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={safeCurrentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              id="page-prev"
              aria-label="Previous page"
              className="rounded-xl"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Page numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={page === safeCurrentPage ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setCurrentPage(page)}
                    id={`page-${page}`}
                    className={`h-10 w-10 text-sm rounded-xl ${page === safeCurrentPage ? "bg-blue-900 hover:bg-blue-800" : ""}`}
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            <Button
              variant="outline"
              size="icon"
              disabled={safeCurrentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              id="page-next"
              aria-label="Next page"
              className="rounded-xl"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Footer info */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Announcements are published by the AAU Student Council and university
          administration.
        </p>
      </div>
    </div>
  )
}
