import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, ArrowRight, Users } from "lucide-react"
import { motion } from "framer-motion"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  attendees: number
  image: string
  featured?: boolean
}

const EVENTS: Event[] = [
  {
    id: "e-1",
    title: "Annual Commerce Career Fair",
    description: "Connect with top employers and explore internship and career opportunities in commerce and business.",
    date: "May 25, 2026",
    time: "9:00 AM - 5:00 PM",
    location: "Main Campus Hall",
    category: "Career",
    attendees: 500,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    featured: true,
  },
  {
    id: "e-2",
    title: "Leadership Workshop Series",
    description: "Develop essential leadership skills through interactive workshops and mentorship sessions.",
    date: "June 3, 2026",
    time: "2:00 PM - 6:00 PM",
    location: "Block A, Room 201",
    category: "Workshop",
    attendees: 120,
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
  },
  {
    id: "e-3",
    title: "Business Plan Competition",
    description: "Showcase your entrepreneurial ideas and compete for seed funding and mentorship opportunities.",
    date: "June 15, 2026",
    time: "10:00 AM - 4:00 PM",
    location: "Innovation Hub",
    category: "Competition",
    attendees: 200,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
  },
  {
    id: "e-4",
    title: "Networking Night",
    description: "Build connections with alumni, industry professionals, and fellow students in a relaxed setting.",
    date: "June 20, 2026",
    time: "6:00 PM - 9:00 PM",
    location: "Campus Garden",
    category: "Networking",
    attendees: 300,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
  },
]

export function EventsSection() {
  const featuredEvent = EVENTS.find(e => e.featured)
  const regularEvents = EVENTS.filter(e => !e.featured)

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
              Upcoming Events
            </span>
            <h2 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl text-balance">
              Events & Activities
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl text-pretty">
              Join us for exciting events that foster learning, networking, and community building.
            </p>
          </div>
          <Button variant="outline" className="rounded-full group">
            View All Events
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        {/* Featured Event */}
        {featuredEvent && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <Card className="overflow-hidden border-0 shadow-2xl rounded-3xl group">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative aspect-[16/10] lg:aspect-auto">
                    <img
                      src={featuredEvent.image}
                      alt={featuredEvent.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 lg:from-transparent lg:via-transparent lg:to-card/90" />
                    <div className="absolute top-6 left-6">
                      <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-secondary text-primary text-sm font-bold">
                        Featured Event
                      </span>
                    </div>
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center bg-card">
                    <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold w-fit mb-4">
                      {featuredEvent.category}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                      {featuredEvent.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {featuredEvent.description}
                    </p>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-secondary" />
                        {featuredEvent.date}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-secondary" />
                        {featuredEvent.time}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-secondary" />
                        {featuredEvent.location}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Users className="h-4 w-4 text-secondary" />
                        {featuredEvent.attendees}+ Expected Attendees
                      </div>
                    </div>
                    <Button className="bg-secondary text-primary hover:bg-secondary/90 rounded-full w-fit group/btn">
                      Register Now
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Events Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regularEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="group overflow-hidden border-border/50 hover:border-secondary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 rounded-2xl h-full flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-secondary text-primary text-xs font-semibold">
                      {event.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <Calendar className="h-4 w-4" />
                      {event.date}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
