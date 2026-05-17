import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, Megaphone, Clock, ChevronRight } from "lucide-react"

export function LatestAnnouncements() {
  const announcements = [
    {
      id: 1,
      title: "Spring Semester Registration Now Open",
      description: "Registration for the Spring 2026 semester is now open. Ensure you complete your course selection before the deadline.",
      date: "May 15, 2026",
      category: "Academic",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
      featured: true,
    },
    {
      id: 2,
      title: "Student Council Elections - Call for Nominations",
      description: "Nominations for the 2026-2027 Student Council are now being accepted. Make your voice heard and lead the change.",
      date: "May 12, 2026",
      category: "Elections",
      image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=600&q=80",
      featured: true,
    },
    {
      id: 3,
      title: "Annual Commerce Career Fair",
      description: "Join us for the biggest networking event of the year. Top companies will be recruiting for internships and full-time positions.",
      date: "May 10, 2026",
      category: "Events",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
      featured: true,
    },
    {
      id: 4,
      title: "New Study Lounge Opening in Building B",
      description: "We're excited to announce the opening of a new modern study lounge equipped with high-speed internet and collaborative spaces.",
      date: "May 8, 2026",
      category: "Facilities",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
      featured: false,
    },
    {
      id: 5,
      title: "Scholarship Opportunities for Commerce Students",
      description: "Multiple scholarship programs are now available for eligible commerce students. Apply before the end of this month.",
      date: "May 5, 2026",
      category: "Financial Aid",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80",
      featured: false,
    },
    {
      id: 6,
      title: "Guest Lecture: Business Leadership in the Digital Age",
      description: "Industry leaders will share insights on navigating the modern business landscape. Open to all commerce students.",
      date: "May 3, 2026",
      category: "Academic",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
      featured: false,
    },
  ]

  const featuredAnnouncements = announcements.filter(a => a.featured)
  const regularAnnouncements = announcements.filter(a => !a.featured)

  return (
    <section 
      className="relative py-20 sm:py-28 lg:py-32 bg-gradient-to-b from-background to-muted/20"
      aria-labelledby="announcements-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -right-32 w-64 h-64 rounded-full bg-blue-900/5 blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-64 h-64 rounded-full bg-yellow-400/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-blue-900/10 px-5 py-2.5 shadow-sm">
            <Megaphone className="h-4 w-4 text-blue-900" aria-hidden="true" />
            <span className="text-sm font-semibold text-blue-900 uppercase tracking-widest">
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
            Stay up-to-date with the latest news, events, and important updates from the Student Council
            and university administration.
          </p>
        </div>

        {/* Featured Announcements - Large Cards */}
        <div className="grid gap-8 lg:grid-cols-3 mb-12">
          {featuredAnnouncements.map((announcement, index) => (
            <Card
              key={announcement.id}
              className={`group relative overflow-hidden transition-all duration-500 hover:shadow-2xl rounded-3xl border-0 bg-card ${
                index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
              }`}
            >
              {/* Image with overlay */}
              <div className={`relative overflow-hidden ${index === 0 ? 'h-80 lg:h-full' : 'h-56'}`}>
                <img
                  src={announcement.image}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-900/60 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <span className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-1.5 text-xs font-bold text-blue-900 uppercase tracking-wider shadow-lg">
                    {announcement.category}
                  </span>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                  <div className="flex items-center gap-3 text-blue-200/80 text-sm mb-3">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    <time>{announcement.date}</time>
                  </div>
                  <h3 className={`font-bold text-white mb-3 leading-tight group-hover:text-yellow-400 transition-colors ${
                    index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'
                  }`}>
                    {announcement.title}
                  </h3>
                  <p className={`text-blue-100/80 leading-relaxed ${index === 0 ? 'text-base lg:text-lg line-clamp-3' : 'text-sm line-clamp-2'}`}>
                    {announcement.description}
                  </p>
                  <Button 
                    variant="ghost" 
                    className="mt-4 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 p-0 h-auto font-semibold group/btn"
                  >
                    Read More
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Regular Announcements - Compact Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regularAnnouncements.map((announcement) => (
            <Card
              key={announcement.id}
              className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl border-2 border-border/50 hover:border-yellow-400/50 bg-card"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={announcement.image}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-blue-900 shadow-md">
                    {announcement.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <CardHeader className="pb-2 pt-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  <time>{announcement.date}</time>
                </div>
                <CardTitle className="text-lg font-bold text-blue-900 line-clamp-2 group-hover:text-yellow-600 transition-colors leading-snug">
                  {announcement.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pb-6">
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {announcement.description}
                </p>

                {/* Read More Link */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full group/btn text-blue-900 hover:text-white hover:bg-blue-900 font-semibold rounded-xl transition-all duration-300"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Button
            size="lg"
            className="bg-blue-900 text-white hover:bg-blue-800 shadow-xl shadow-blue-900/25 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-2xl px-10 py-7 text-lg font-bold group"
          >
            View All Announcements
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}
