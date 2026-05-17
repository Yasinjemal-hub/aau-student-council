"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, ArrowRight, CalendarDays, Sparkles } from "lucide-react"

interface UpcomingEventsProps {
  setView: (view: string) => void
}

const events = [
  {
    id: 1,
    title: "Annual Commerce Leadership Summit",
    description: "Join industry leaders and alumni for an inspiring day of keynotes, panels, and networking opportunities.",
    date: "June 15, 2026",
    time: "9:00 AM - 5:00 PM",
    location: "Main Auditorium, Block A",
    category: "Conference",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    attendees: 250,
    featured: true,
  },
  {
    id: 2,
    title: "Career Fair 2026",
    description: "Meet recruiters from top companies and explore internship and job opportunities in commerce and business.",
    date: "June 20, 2026",
    time: "10:00 AM - 4:00 PM",
    location: "Student Center Hall",
    category: "Career",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    attendees: 500,
    featured: false,
  },
  {
    id: 3,
    title: "Student Council Elections",
    description: "Cast your vote and elect the next generation of student leaders who will represent your voice.",
    date: "June 25, 2026",
    time: "8:00 AM - 6:00 PM",
    location: "Multiple Polling Stations",
    category: "Elections",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=600&q=80",
    attendees: 3000,
    featured: false,
  },
  {
    id: 4,
    title: "Business Plan Competition",
    description: "Showcase your entrepreneurial ideas and compete for seed funding and mentorship from industry experts.",
    date: "July 5, 2026",
    time: "1:00 PM - 6:00 PM",
    location: "Innovation Hub, Block C",
    category: "Competition",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=80",
    attendees: 150,
    featured: false,
  },
]

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Conference: "bg-blue-500",
    Career: "bg-emerald-500",
    Elections: "bg-purple-500",
    Competition: "bg-orange-500",
    Workshop: "bg-pink-500",
    Social: "bg-cyan-500",
  }
  return colors[category] || "bg-gray-500"
}

export function UpcomingEvents({ setView }: UpcomingEventsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const featuredEvent = events.find((e) => e.featured)
  const otherEvents = events.filter((e) => !e.featured)

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-28 bg-gradient-to-b from-blue-950 to-blue-900 overflow-hidden"
      aria-labelledby="events-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 px-4 py-2 mb-6">
            <CalendarDays className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">
              Mark Your Calendar
            </span>
          </div>
          <h2
            id="events-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4"
          >
            Upcoming Events
          </h2>
          <p className="text-lg text-blue-200/70 max-w-2xl mx-auto">
            Don&apos;t miss out on these exciting opportunities to learn, connect, and grow with your fellow students.
          </p>
        </motion.div>

        {/* Featured Event */}
        {featuredEvent && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <Card className="overflow-hidden border-0 bg-gradient-to-r from-yellow-400/10 to-yellow-400/5 backdrop-blur-sm rounded-3xl group">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img
                    src={featuredEvent.image}
                    alt={featuredEvent.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:bg-gradient-to-l" />
                  <div className="absolute top-6 left-6 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-400 text-blue-900 text-xs font-bold">
                      <Sparkles className="h-3 w-3" />
                      Featured Event
                    </span>
                    <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${getCategoryColor(featuredEvent.category)}`}>
                      {featuredEvent.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                    {featuredEvent.title}
                  </h3>
                  <p className="text-blue-200/70 leading-relaxed mb-6">
                    {featuredEvent.description}
                  </p>

                  {/* Event Details */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3 text-sm text-blue-100">
                      <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-blue-200/50 text-xs">Date</p>
                        <p className="font-medium">{featuredEvent.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-blue-100">
                      <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-blue-200/50 text-xs">Time</p>
                        <p className="font-medium">{featuredEvent.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-blue-100">
                      <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-blue-200/50 text-xs">Location</p>
                        <p className="font-medium">{featuredEvent.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-blue-100">
                      <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-blue-200/50 text-xs">Expected</p>
                        <p className="font-medium">{featuredEvent.attendees}+ attendees</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-fit bg-yellow-400 text-blue-900 hover:bg-yellow-300 shadow-lg shadow-yellow-400/20 rounded-xl font-semibold">
                    Register Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Other Events Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {otherEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <Card className="h-full overflow-hidden border-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 rounded-2xl group">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-white text-xs font-bold ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-bold text-lg leading-tight">{event.title}</p>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <p className="text-blue-200/60 text-sm line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-blue-100">
                      <Calendar className="h-4 w-4 text-yellow-400" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-100">
                      <Clock className="h-4 w-4 text-yellow-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-100">
                      <MapPin className="h-4 w-4 text-yellow-400" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 rounded-xl"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Events Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Button
            size="lg"
            onClick={() => setView("events")}
            className="bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm rounded-xl px-8 font-semibold"
          >
            View All Events
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
