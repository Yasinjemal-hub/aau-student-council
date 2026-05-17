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
} from "lucide-react"
import { Input } from "@/components/ui/input"

/* ── Types ───────────────────────────────────────────────── */
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

/* ── Mock Data ───────────────────────────────────────────── */
const INITIAL_EVENTS: CampusEvent[] = [
  {
    id: "evt-1",
    title: "Annual Student Council Town Hall",
    description: "Join the Student Council for an open discussion about campus improvements, budget allocation, and upcoming initiatives. Your voice matters!",
    date: "2026-05-20",
    time: "2:00 PM – 4:00 PM",
    location: "Main Auditorium, Block B",
    capacity: 250,
    registeredCount: 248, // Near capacity
    category: "Council",
  },
  {
    id: "evt-2",
    title: "AAU Commerce Career Fair 2026",
    description: "Meet top employers from the banking, technology, and manufacturing sectors. Bring your CV and prepare for on-the-spot interviews.",
    date: "2026-05-25",
    time: "9:00 AM – 5:00 PM",
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
    time: "10:00 AM – 1:00 PM",
    location: "Innovation Lab, 3rd Floor",
    capacity: 40,
    registeredCount: 40, // FULL
    category: "Academic",
  },
  {
    id: "evt-4",
    title: "Inter-Campus Cultural Exchange",
    description: "Celebrate the diversity of AAU with music, traditional food, and performances from all regional student associations.",
    date: "2026-06-01",
    time: "5:00 PM – 9:00 PM",
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
    time: "2:00 PM – 5:00 PM",
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
    time: "3:00 PM – 6:00 PM",
    location: "Seminar Room 102",
    capacity: 100,
    registeredCount: 15,
    category: "Academic",
  },
]

/* ── Component ───────────────────────────────────────────── */
interface EventsPageProps {
  onBack: () => void
}

export function EventsPage({ onBack }: EventsPageProps) {
  const { toast } = useToast()
  const [events, setEvents] = useState<CampusEvent[]>(INITIAL_EVENTS)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<CampusEvent | null>(null)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)

  /* ── Filtered Events ───────────────────────────────────── */
  const filteredEvents = useMemo(() => {
    return events.filter((evt) =>
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [events, searchQuery])

  /* ── Registration Logic ────────────────────────────────── */
  const handleRegisterClick = (event: CampusEvent) => {
    if (event.registeredCount >= event.capacity) return
    setSelectedEvent(event)
    setIsConfirming(true)
  }

  const confirmRegistration = async () => {
    if (!selectedEvent) return
    
    setIsRegistering(true)
    // Simulate API call
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

  /* ── Date Formatter ────────────────────────────────────── */
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-dvh bg-background">
      {/* ── Page Header ───────────────────────────────────── */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                aria-label="Go back"
                id="events-back-button"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CalendarIcon className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Campus Events
                </h1>
                <p className="text-sm text-muted-foreground">
                  Discover and register for upcoming activities
                </p>
              </div>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search events or locations..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="events-search"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Events Grid ───────────────────────────────────── */}
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => {
              const isFull = event.registeredCount >= event.capacity
              const spotsRemaining = event.capacity - event.registeredCount
              const isNearFull = spotsRemaining > 0 && spotsRemaining <= 10

              return (
                <Card key={event.id} className="flex flex-col overflow-hidden transition-all hover:shadow-md border-border/60">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={event.category.toLowerCase() as any}>
                        {event.category}
                      </Badge>
                      {isFull ? (
                        <Badge variant="destructive" className="animate-pulse">Full</Badge>
                      ) : isNearFull ? (
                        <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                          {spotsRemaining} spots left!
                        </Badge>
                      ) : null}
                    </div>
                    <CardTitle className="text-xl leading-tight">{event.title}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                      {event.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CalendarIcon className="h-4 w-4 shrink-0 text-primary" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4 shrink-0 text-primary" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                        <MapPin className="h-4 w-4 shrink-0 text-primary" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground font-medium">Capacity</span>
                        <span className="font-semibold">{event.registeredCount} / {event.capacity}</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            isFull ? "bg-destructive" : isNearFull ? "bg-amber-500" : "bg-primary"
                          }`}
                          style={{ width: `${(event.registeredCount / event.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-2 border-t border-border/50 bg-muted/20">
                    <Button 
                      className="w-full font-semibold"
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
              <Info className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-semibold">No events found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </main>

      {/* ── Confirmation Dialog ───────────────────────────── */}
      <Dialog open={isConfirming} onOpenChange={setIsConfirming}>
        <DialogContent onClose={() => !isRegistering && setIsConfirming(false)}>
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CalendarIcon className="h-8 w-8 text-primary" />
            </div>
            <DialogTitle className="text-center text-xl">
              Confirm Event Registration
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Confirm registration for <span className="font-bold text-foreground">"{selectedEvent?.title}"</span>? 
              A confirmation email will be sent to your student account.
            </DialogDescription>
          </DialogHeader>

          <div className="my-4 space-y-3 rounded-lg border border-border p-4 bg-muted/30">
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{selectedEvent?.location}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CalendarIcon className="h-4 w-4 text-primary" />
              <span>{selectedEvent ? formatDate(selectedEvent.date) : ""}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span>{selectedEvent?.time}</span>
            </div>
          </div>

          <DialogFooter className="gap-3 sm:gap-0">
            <Button 
              variant="ghost" 
              onClick={() => setIsConfirming(false)} 
              disabled={isRegistering}
              id="cancel-registration"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmRegistration} 
              disabled={isRegistering}
              className="sm:min-w-[140px]"
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
