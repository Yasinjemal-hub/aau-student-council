import { useState, useMemo } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Calendar as CalendarIcon,
  MapPin,
  Search,
  ArrowLeft,
  Clock,
  Ticket,
  Info,
  Sparkles,
  Users,
  Filter,
} from "lucide-react"
import { Input } from "@/components/ui/input"

/* Types */
interface CampusEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  capacity: number
  registeredCount: number
  category: "Academic" | "Social" | "Career" | "Council"
  image?: string
}

/* Mock Data */
const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: "evt-1",
    title: "Annual Student Council Town Hall",
    description: "Join the Student Council for an open discussion about campus improvements, budget allocation, and upcoming initiatives. Your voice matters!",
    date: "2026-05-20",
    time: "2:00 PM - 4:00 PM",
    location: "Main Auditorium, Block B",
    capacity: 250,
    registeredCount: 248,
    category: "Council",
  },
  {
    id: "evt-2",
    title: "AAU Commerce Career Fair 2026",
    description: "Meet top employers from the banking, technology, and manufacturing sectors. Bring your CV and prepare for on-the-spot interviews.",
    date: "2026-05-25",
    time: "9:00 AM - 5:00 PM",
    location: "Campus Plaza & Great Hall",
    capacity: 1000,
    registeredCount: 450,
    category: "Career",
  },
  {
    id: "evt-3",
    title: "Fintech Startup Workshop",
    description: "Learn how to build and scale a fintech startup in the Ethiopian market. Hosted by industry experts from Gebeya and Telebirr.",
    date: "2026-05-22",
    time: "10:00 AM - 1:00 PM",
    location: "Innovation Lab, 3rd Floor",
    capacity: 40,
    registeredCount: 40,
    category: "Academic",
  },
  {
    id: "evt-4",
    title: "Inter-Campus Cultural Exchange",
    description: "Celebrate the diversity of AAU with music, traditional food, and performances from all regional student associations.",
    date: "2026-06-01",
    time: "5:00 PM - 9:00 PM",
    location: "Main Campus Athletic Field",
    capacity: 1500,
    registeredCount: 820,
    category: "Social",
  },
  {
    id: "evt-5",
    title: "Digital Marketing Masterclass",
    description: "A deep dive into social media strategy, SEO, and content marketing for commerce students. Certificate provided upon completion.",
    date: "2026-05-28",
    time: "2:00 PM - 5:00 PM",
    location: "Computer Lab 4",
    capacity: 60,
    registeredCount: 52,
    category: "Academic",
  },
  {
    id: "evt-6",
    title: "University Debate Championship",
    description: "Watch the sharpest minds in the School of Commerce battle it out on topics ranging from economic policy to corporate ethics.",
    date: "2026-06-05",
    time: "3:00 PM - 6:00 PM",
    location: "Seminar Room 102",
    capacity: 100,
    registeredCount: 15,
    category: "Academic",
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  Academic: "bg-blue-500/10 text-blue-700 border-blue-200",
  Social: "bg-purple-500/10 text-purple-700 border-purple-200",
  Career: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  Council: "bg-yellow-500/10 text-yellow-700 border-yellow-200",
}

/* Component */
interface EventsPageProps {
  onBack: () => void
}

export function EventsPage({ onBack }: EventsPageProps) {
  const { toast } = useToast()
  const [events, setEvents] = useState<CampusEvent[]>(INITIAL_EVENTS)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [selectedEvent, setSelectedEvent] = useState<CampusEvent | null>(null)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)

  /* Filtered Events */
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.location.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = categoryFilter === "all" || evt.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [events, searchQuery, categoryFilter])

  /* Registration Logic */
  const handleRegisterClick = (event: CampusEvent) => {
    if (event.registeredCount >= event.capacity) return
    setSelectedEvent(event)
    setIsConfirming(true)
  }

  const confirmRegistration = async () => {
    if (!selectedEvent) return
    
    setIsRegistering(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setEvents(prev => prev.map(evt => 
      evt.id === selectedEvent.id 
        ? { ...evt, registeredCount: evt.registeredCount + 1 } 
        : evt
    ))
    
    setIsRegistering(false)
    setIsConfirming(false)
    
    toast({
      title: "Registration Successful!",
      description: `You are now registered for: ${selectedEvent.title}. A confirmation has been sent to your email.`,
      variant: "success",
    })
    
    setSelectedEvent(null)
  }

  /* Date Formatter */
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const categories = ["all", "Academic", "Social", "Career", "Council"]

  return (
    <div className="min-h-dvh bg-gradient-to-b from-background to-muted/30">
      {/* Page Header */}
      <div className="relative overflow-hidden border-b border-border bg-gradient-to-r from-blue-900 to-blue-950">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" aria-hidden="true" />
        
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                aria-label="Go back"
                id="events-back-button"
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 shadow-lg shadow-yellow-400/25">
                <CalendarIcon className="h-7 w-7 text-blue-900" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">Campus Life</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Campus Events
                </h1>
                <p className="text-sm text-blue-200/70">
                  Discover and register for upcoming activities
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/10">
                <Users className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-white">{events.length} Events</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-200/50" />
              <Input
                placeholder="Search events or locations..."
                className="pl-11 h-12 bg-white/10 border-white/10 text-white placeholder:text-blue-200/50 focus:bg-white/15 focus:border-yellow-400/50 rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="events-search"
              />
            </div>
            <Button variant="outline" className="h-12 px-6 bg-white/10 border-white/10 text-white hover:bg-white/15 hover:text-white rounded-xl">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Category Chips */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                categoryFilter === cat
                  ? "bg-blue-900 text-white shadow-lg shadow-blue-900/25"
                  : "bg-card border border-border text-muted-foreground hover:border-blue-900/30 hover:text-blue-900"
              }`}
            >
              {cat === "all" ? "All Events" : cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => {
              const isFull = event.registeredCount >= event.capacity
              const spotsRemaining = event.capacity - event.registeredCount
              const isNearFull = spotsRemaining > 0 && spotsRemaining <= 10
              const percentFull = (event.registeredCount / event.capacity) * 100

              return (
                <Card key={event.id} className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/60 rounded-2xl">
                  {/* Card Header with gradient */}
                  <div className="relative h-3 bg-gradient-to-r from-blue-900 to-blue-800">
                    <div 
                      className={`absolute inset-y-0 left-0 transition-all duration-500 ${
                        isFull ? "bg-red-500" : isNearFull ? "bg-amber-500" : "bg-yellow-400"
                      }`}
                      style={{ width: `${percentFull}%` }}
                    />
                  </div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={`${CATEGORY_COLORS[event.category]} border font-semibold`}>
                        {event.category}
                      </Badge>
                      {isFull ? (
                        <Badge variant="destructive" className="animate-pulse font-semibold">Full</Badge>
                      ) : isNearFull ? (
                        <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50 font-semibold">
                          {spotsRemaining} left!
                        </Badge>
                      ) : null}
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:text-blue-900 transition-colors">
                      {event.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1 space-y-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-900/5">
                          <CalendarIcon className="h-4 w-4 text-blue-900" />
                        </div>
                        <span className="font-medium">{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-900/5">
                          <Clock className="h-4 w-4 text-blue-900" />
                        </div>
                        <span className="font-medium">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-900/5">
                          <MapPin className="h-4 w-4 text-blue-900" />
                        </div>
                        <span className="truncate font-medium">{event.location}</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground font-medium">Registration</span>
                        <span className="font-bold text-blue-900">{event.registeredCount} / {event.capacity}</span>
                      </div>
                      <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 rounded-full ${
                            isFull ? "bg-red-500" : isNearFull ? "bg-amber-500" : "bg-blue-900"
                          }`}
                          style={{ width: `${percentFull}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-4 border-t border-border/50">
                    <Button 
                      className={`w-full font-semibold rounded-xl h-11 ${
                        isFull 
                          ? "" 
                          : "bg-blue-900 hover:bg-blue-800 shadow-lg shadow-blue-900/25"
                      }`}
                      variant={isFull ? "outline" : "default"}
                      disabled={isFull}
                      onClick={() => handleRegisterClick(event)}
                      id={`register-btn-${event.id}`}
                    >
                      {isFull ? (
                        "Registration Closed"
                      ) : (
                        <>
                          <Ticket className="h-4 w-4 mr-2" />
                          Register Now
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )
            })
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
                <Info className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">No events found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => { setSearchQuery(""); setCategoryFilter("all"); }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirming} onOpenChange={setIsConfirming}>
        <DialogContent onClose={() => !isRegistering && setIsConfirming(false)} className="rounded-2xl">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-900/10">
              <CalendarIcon className="h-8 w-8 text-blue-900" />
            </div>
            <DialogTitle className="text-center text-xl">
              Confirm Event Registration
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Confirm registration for <span className="font-bold text-foreground">&quot;{selectedEvent?.title}&quot;</span>? 
              A confirmation email will be sent to your student account.
            </DialogDescription>
          </DialogHeader>

          <div className="my-4 space-y-3 rounded-xl border border-border p-4 bg-muted/30">
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-blue-900" />
              <span>{selectedEvent?.location}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CalendarIcon className="h-4 w-4 text-blue-900" />
              <span>{selectedEvent ? formatDate(selectedEvent.date) : ""}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-blue-900" />
              <span>{selectedEvent?.time}</span>
            </div>
          </div>

          <DialogFooter className="gap-3 sm:gap-0">
            <Button 
              variant="ghost" 
              onClick={() => setIsConfirming(false)} 
              disabled={isRegistering}
              id="cancel-registration"
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmRegistration} 
              disabled={isRegistering}
              className="sm:min-w-[140px] bg-blue-900 hover:bg-blue-800 rounded-xl"
              id="confirm-registration-btn"
            >
              {isRegistering ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-pulse" />
                  Processing...
                </>
              ) : (
                "Confirm & Register"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
