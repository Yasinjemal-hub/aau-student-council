import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, Megaphone } from "lucide-react"
import { motion } from "framer-motion"

export function LatestAnnouncements() {
  const announcements = [
    {
      id: 1,
      title: "Spring Semester Registration Now Open",
      description: "Registration for the Spring 2026 semester is now open. Ensure you complete your course selection before the deadline.",
      date: "May 15, 2026",
      category: "Academic",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
    },
    {
      id: 2,
      title: "Student Council Elections - Call for Nominations",
      description: "Nominations for the 2026-2027 Student Council are now being accepted. Make your voice heard and lead the change.",
      date: "May 12, 2026",
      category: "Elections",
      image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=600&q=80",
    },
    {
      id: 3,
      title: "Annual Commerce Career Fair",
      description: "Join us for the biggest networking event of the year. Top companies will be recruiting for internships and full-time positions.",
      date: "May 10, 2026",
      category: "Events",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    },
    {
      id: 4,
      title: "New Study Lounge Opening in Building B",
      description: "We are excited to announce the opening of a new modern study lounge equipped with high-speed internet and collaborative spaces.",
      date: "May 8, 2026",
      category: "Facilities",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    },
    {
      id: 5,
      title: "Scholarship Opportunities for Commerce Students",
      description: "Multiple scholarship programs are now available for eligible commerce students. Apply before the end of this month.",
      date: "May 5, 2026",
      category: "Financial Aid",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80",
    },
    {
      id: 6,
      title: "Guest Lecture: Business Leadership in the Digital Age",
      description: "Industry leaders will share insights on navigating the modern business landscape. Open to all commerce students.",
      date: "May 3, 2026",
      category: "Academic",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
    },
  ]

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center mb-16"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2">
            <Megaphone className="h-4 w-4 text-secondary" />
            <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
              Stay Informed
            </span>
          </div>
          <h2 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl text-balance">
            Latest Announcements
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-pretty">
            Stay up-to-date with the latest news, events, and important updates from the Student Council
            and university administration.
          </p>
        </motion.div>

        {/* Announcements Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {announcements.map((announcement, index) => (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="group overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 rounded-2xl border-border/50 hover:border-secondary/50 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={announcement.image}
                    alt={announcement.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-primary">
                      {announcement.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold text-foreground line-clamp-2 group-hover:text-secondary transition-colors">
                    {announcement.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed flex-1">
                    {announcement.description}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{announcement.date}</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full group/btn text-foreground hover:text-secondary hover:bg-secondary/10"
                  >
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button
            size="lg"
            className="bg-secondary text-primary hover:bg-secondary/90 hover:shadow-xl transition-all duration-300 rounded-full px-8 py-6 text-base font-semibold group"
          >
            View All Announcements
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
