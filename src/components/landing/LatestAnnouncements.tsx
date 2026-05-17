import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, Megaphone, Clock, ChevronRight } from "lucide-react"

export function LatestAnnouncements() {
  const announcements = [
    {
      id: 1,
      title: "Spring Semester Registration Now Open",
      description:
        "Registration for the Spring 2026 semester is now open. Ensure you complete your course selection before the deadline to secure your preferred classes.",
      date: "May 15, 2026",
      category: "Academic",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
      featured: true,
    },
    {
      id: 2,
      title: "Student Council Elections - Call for Nominations",
      description:
        "Nominations for the 2026-2027 Student Council are now being accepted. Make your voice heard and lead the change you want to see.",
      date: "May 12, 2026",
      category: "Elections",
      image:
        "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=600&q=80",
      featured: true,
    },
    {
      id: 3,
      title: "Annual Commerce Career Fair",
      description:
        "Join us for the biggest networking event of the year. Top companies will be recruiting for internships and full-time positions.",
      date: "May 10, 2026",
      category: "Events",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
      featured: false,
    },
    {
      id: 4,
      title: "New Study Lounge Opening in Building B",
      description:
        "We're excited to announce the opening of a new modern study lounge equipped with high-speed internet and collaborative spaces.",
      date: "May 8, 2026",
      category: "Facilities",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
      featured: false,
    },
    {
      id: 5,
      title: "Scholarship Opportunities for Commerce Students",
      description:
        "Multiple scholarship programs are now available for eligible commerce students. Apply before the end of this month.",
      date: "May 5, 2026",
      category: "Financial Aid",
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80",
      featured: false,
    },
    {
      id: 6,
      title: "Guest Lecture: Business Leadership in the Digital Age",
      description:
        "Industry leaders will share insights on navigating the modern business landscape. Open to all commerce students.",
      date: "May 3, 2026",
      category: "Academic",
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
      featured: false,
    },
  ]

  const featuredAnnouncements = announcements.filter((a) => a.featured)
  const regularAnnouncements = announcements.filter((a) => !a.featured)

  const categoryColors: Record<string, string> = {
    Academic: "bg-blue-900 text-white",
    Elections: "bg-yellow-400 text-blue-900",
    Events: "bg-green-600 text-white",
    Facilities: "bg-purple-600 text-white",
    "Financial Aid": "bg-orange-500 text-white",
  }

  return (
    <section
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden bg-muted/30"
      aria-labelledby="announcements-heading"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-900/10 px-5 py-2.5 border border-blue-900/20">
            <Megaphone className="h-4 w-4 text-blue-900" aria-hidden="true" />
            <span className="text-sm font-bold text-blue-900 uppercase tracking-widest">
              Stay Informed
            </span>
          </div>
          <h2
            id="announcements-heading"
            className="text-4xl font-extrabold tracking-tight text-blue-900 sm:text-5xl lg:text-6xl mb-6 text-balance"
          >
            Latest Announcements
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
            Stay up-to-date with the latest news, events, and important updates
            from the Student Council and university administration.
          </p>
        </div>

        {/* Featured Announcements - Large Cards */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          {featuredAnnouncements.map((announcement) => (
            <Card
              key={announcement.id}
              className="group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 rounded-3xl border-0 bg-card"
            >
              {/* Image with overlay */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={announcement.image}
                  alt={announcement.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/60 to-transparent" />
                
                {/* Category badge */}
                <div className="absolute top-5 left-5">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide shadow-lg ${
                      categoryColors[announcement.category] || "bg-blue-900 text-white"
                    }`}
                  >
                    {announcement.category}
                  </span>
                </div>

                {/* Featured badge */}
                <div className="absolute top-5 right-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400 px-3 py-1.5 text-xs font-bold text-blue-900 shadow-lg">
                    Featured
                  </span>
                </div>

                {/* Title on image */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300">
                    {announcement.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-blue-100/80">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      <span>{announcement.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                  {announcement.description}
                </p>
                <Button
                  variant="ghost"
                  className="group/btn w-full justify-between text-blue-900 hover:text-white hover:bg-blue-900 rounded-xl py-5 font-semibold transition-all duration-300"
                  aria-label={`Read more about ${announcement.title}`}
                >
                  Read Full Announcement
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Regular Announcements - Smaller Cards Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {regularAnnouncements.map((announcement) => (
            <Card
              key={announcement.id}
              className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl border-2 border-border/50 hover:border-yellow-400/50 bg-card"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={announcement.image}
                  alt={announcement.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent" />
                
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide shadow-md ${
                      categoryColors[announcement.category] || "bg-blue-900 text-white"
                    }`}
                  >
                    {announcement.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <CardHeader className="pb-2 pt-4">
                <CardTitle className="text-sm font-bold text-blue-900 line-clamp-2 leading-snug group-hover:text-yellow-600 transition-colors duration-300">
                  {announcement.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4 pt-0 space-y-3">
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {announcement.description}
                </p>

                {/* Meta & CTA */}
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    <span>{announcement.date}</span>
                  </div>
                  <button
                    className="inline-flex items-center gap-0.5 text-xs font-semibold text-blue-900 hover:text-yellow-600 transition-colors"
                    aria-label={`Read more about ${announcement.title}`}
                  >
                    Read
                    <ChevronRight className="h-3 w-3" aria-hidden="true" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Button
            size="lg"
            className="group bg-blue-900 text-white hover:bg-blue-800 shadow-xl shadow-blue-900/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-2xl px-10 py-7 text-lg font-bold"
            aria-label="View all announcements"
          >
            View All Announcements
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}
