import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  GraduationCap,
  Mail,
  Phone,
  AlertTriangle,
  Users,
  Shield,
  BookOpen,
  User,
  Heart,
  ArrowLeft,
  Trophy,
  FileBox,
} from "lucide-react"
import { DocumentLibrary } from "@/components/council/DocumentLibrary"

/* ── Types ───────────────────────────────────────────────── */
interface Leader {
  id: string
  name: string
  role: string
  email: string
  phone: string
  bio: string
  year: string
  image?: string
}

interface Sector {
  id: string
  title: string
  icon: any
  overview: string
  responsibilities: string[]
  services: string[]
  contact: {
    office: string
    email: string
    phone: string
  }
}

/* ── Mock Data ───────────────────────────────────────────── */
const LEADERS: Leader[] = [
  {
    id: "l-3",
    name: "Kidus Elias",
    role: "President",
    email: "kidus.e@aau.edu.et",
    phone: "+251 911 22 33 44",
    bio: "Visionary leader focused on academic excellence and student-led innovation within the School of Commerce. Kidus drives strategic initiatives that bridge the gap between academic theory and practical industry experience.",
    year: "Economics 4th Year",
    image: "/assets/leadership/kidus.png",
  },
  {
    id: "l-1",
    name: "Rahma Nigusse",
    role: "Council Ambassador",
    email: "rahma.n@aau.edu.et",
    phone: "+251 922 33 44 55",
    bio: "Dedicated to representing the student body at international forums and building strategic partnerships. Rahma specializes in cross-cultural communication and diplomatic student relations.",
    year: "BAIS 3rd Year",
    image: "/assets/leadership/rahma.png",
  },
  {
    id: "l-4",
    name: "Elda",
    role: "Secretary General",
    email: "elda.s@aau.edu.et",
    phone: "+251 933 44 55 66",
    bio: "Expert in administrative efficiency and cross-departmental coordination. Elda ensures the seamless execution of council resolutions and manages all internal organizational logistics.",
    year: "Accounting 3rd Year",
    image: "/assets/leadership/elda.png",
  },
  {
    id: "l-2",
    name: "Fikremaryam Asmamaw",
    role: "Discipline and Ethics Head",
    email: "fikremaryam.a@aau.edu.et",
    phone: "+251 944 55 66 77",
    bio: "Ensuring the highest standards of conduct and ethical behavior across all student organizations. Fikremaryam leads the ethics committee and oversees conflict resolution frameworks.",
    year: "Logistics 2nd Year",
    image: "/assets/leadership/fikremaryam.png",
  },
  {
    id: "l-5",
    name: "Abdulhafiz",
    role: "PR & Communications Head",
    email: "abdulhafiz.c@aau.edu.et",
    phone: "+251 955 66 77 88",
    bio: "Managing the council's public image and ensuring effective communication between the council and the student body. Abdulhafiz leads all digital presence and media engagement strategies.",
    year: "Marketing 3rd Year",
    image: "/assets/leadership/abdulhafiz.png",
  },
]

const LEADERBOARD_STATS = [
  { name: "Kidus Elias", score: 980, rank: 1, change: "+12", badge: "Visionary", color: "bg-amber-500" },
  { name: "Rahma Nigusse", score: 945, rank: 2, change: "+25", badge: "Ambassador", color: "bg-blue-500" },
  { name: "Elda", score: 910, rank: 3, change: "+8", badge: "Organizer", color: "bg-emerald-500" },
  { name: "Fikremaryam A.", score: 885, rank: 4, change: "+15", badge: "Ethicist", color: "bg-purple-500" },
  { name: "Abdulhafiz", score: 860, rank: 5, change: "+10", badge: "Communicator", color: "bg-orange-500" },
]

const SECTORS: Sector[] = [
  {
    id: "student-service",
    title: "Student Service",
    icon: Users,
    overview: "The Student Service sector is dedicated to enhancing the daily life of students on campus, from cafeteria standards to facility maintenance.",
    responsibilities: [
      "Monitoring cafeteria hygiene and food quality",
      "Overseeing student lounge and recreational spaces",
      "Coordination of campus-wide sanitation initiatives",
      "Liaising with university housing administration",
    ],
    services: [
      "Facility reporting and maintenance requests",
      "ID card replacement assistance",
      "Lost and found coordination",
      "Campus transport support",
    ],
    contact: {
      office: "Block A, Room 102",
      email: "service.council@aau.edu.et",
      phone: "+251 11 123 4567",
    },
  },
  {
    id: "academic-affairs",
    title: "Academic Affairs",
    icon: BookOpen,
    overview: "Protecting student academic rights and facilitating a conducive learning environment through policy advocacy and resource management.",
    responsibilities: [
      "Reviewing grading policies and academic disputes",
      "Coordinating peer tutoring and study groups",
      "Monitoring library resources and study hall availability",
      "Organizing academic workshops and seminars",
    ],
    services: [
      "Grade appeal consultancy",
      "Departmental transfer guidance",
      "Academic scholarship information",
      "Course registration assistance",
    ],
    contact: {
      office: "Main Library, 2nd Floor",
      email: "academic.council@aau.edu.et",
      phone: "+251 11 123 4568",
    },
  },
  {
    id: "womens-affairs",
    title: "Women's Affairs",
    icon: User,
    overview: "Empowering female students through leadership programs, safety initiatives, and advocacy for gender equality across campus.",
    responsibilities: [
      "Organizing women's leadership and mentorship programs",
      "Monitoring campus safety and reporting harassment",
      "Advocating for gender-sensitive campus policies",
      "Hosting annual Women in Commerce summit",
    ],
    services: [
      "Safety escort services (evening)",
      "Gender-based grievance reporting",
      "Health and wellness workshops",
      "Women-only networking events",
    ],
    contact: {
      office: "Student Center, Room 205",
      email: "women.council@aau.edu.et",
      phone: "+251 11 123 4569",
    },
  },
  {
    id: "ethics-peace",
    title: "Ethics & Peace",
    icon: Shield,
    overview: "Promoting a culture of transparency, integrity, and conflict resolution within the student community.",
    responsibilities: [
      "Mediating conflicts between student organizations",
      "Upholding the student code of conduct",
      "Organizing peace and diversity workshops",
      "Auditing council financial transparency",
    ],
    services: [
      "Peer mediation sessions",
      "Ethics training for club leaders",
      "Conflict reporting platform",
      "Diversity & Inclusion advocacy",
    ],
    contact: {
      office: "Block B, Room 304",
      email: "ethics.council@aau.edu.et",
      phone: "+251 11 123 4570",
    },
  },
  {
    id: "special-needs",
    title: "Special Needs",
    icon: Heart,
    overview: "Ensuring an inclusive and accessible campus environment for all students with disabilities.",
    responsibilities: [
      "Monitoring physical accessibility (ramps, elevators)",
      "Advocating for accessible learning materials (Braille, digital)",
      "Sensitizing the campus community to inclusive practices",
      "Assisting in exams and academic accommodations",
    ],
    services: [
      "Mobility assistance coordination",
      "Exam scribes and time extension requests",
      "Assistive technology hub access",
      "Disability-inclusive event planning",
    ],
    contact: {
      office: "Block C, Room 101",
      email: "inclusion.council@aau.edu.et",
      phone: "+251 11 123 4571",
    },
  },
]

/* \u2500\u2500 Component \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
interface LeadershipPageProps {
  onBack: () => void
  onComplaint: () => void
}

export function LeadershipPage({ onBack, onComplaint }: LeadershipPageProps) {
  return (
    <div className="min-h-dvh bg-background">
      {/* \u2500\u2500 Header \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              aria-label="Go back"
              id="leadership-back-button"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2 shadow-lg ring-1 ring-border/50">
              <img src="/assets/council_logo.png" alt="Council Logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Council Leadership & Sectors
              </h1>
              <p className="text-sm text-muted-foreground">
                Meet your representatives and explore council departments
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-20">
        {/* ── Council Leaderboard Section ───────────────────────────── */}
        <section aria-labelledby="leaderboard-heading" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-background to-primary/5 border border-primary/10 p-8 sm:p-12">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 rounded-full bg-secondary/5 blur-3xl" />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                <Shield className="h-3 w-3" />
                Council Impact
              </div>
              <h2 id="leaderboard-heading" className="text-3xl sm:text-4xl font-black tracking-tight mb-6">
                Council Leaderboard
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Recognizing the most active and impactful council members based on project completion, student engagement, and policy implementation.
              </p>

              <div className="space-y-4">
                {LEADERBOARD_STATS.slice(0, 3).map((stat) => (
                  <div key={stat.name} className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border shadow-sm group hover:border-primary/50 transition-colors">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-white ${stat.color}`}>
                      #{stat.rank}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-bold">{stat.name}</p>
                        <span className="text-xs font-medium text-emerald-500">{stat.change} pts</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted font-medium text-muted-foreground">{stat.badge}</span>
                        <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full ${stat.color}`} style={{ width: `${(stat.score / 1000) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-muted border border-border shadow-2xl">
                <img
                  src="/assets/leadership/rahma.png"
                  alt="Featured Leader"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white/60 text-xs font-medium uppercase tracking-widest">Featured Active Leader</p>
                      <h3 className="text-white text-2xl font-bold">Rahma Nigusse</h3>
                      <p className="text-primary font-medium text-sm">945 Impact Points</p>
                    </div>
                    <div className="h-12 w-12 rounded-full border-2 border-primary flex items-center justify-center bg-black/40 backdrop-blur-sm">
                      <Trophy className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* \u2500\u2500 1. Leadership Grid Section \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
        <section aria-labelledby="leadership-heading">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 id="leadership-heading" className="text-3xl font-bold tracking-tight">
                Leadership Grid
              </h2>
              <p className="text-muted-foreground mt-2">Comprehensive profiles of your current Executive Council</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/50 px-4 py-2 rounded-full border border-border">
              <Users className="h-4 w-4 text-primary" />
              <span>{LEADERS.length} Active Members</span>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {LEADERS.map((leader) => (
              <Card key={leader.id} className="group overflow-hidden border-border/60 transition-all hover:shadow-2xl hover:border-primary/20 flex flex-col">
                <div className="aspect-[16/9] relative bg-muted flex items-center justify-center overflow-hidden">
                  {/* Photo with Overlay */}
                  {leader.image ? (
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                      <User className="h-20 w-20 text-primary/20" />
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-primary border border-primary/20 flex items-center gap-1.5 shadow-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active Member
                    </div>
                  </div>

                  {/* Info Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                        {leader.year}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl leading-tight">{leader.name}</h3>
                    <p className="text-xs text-white/70 font-medium">{leader.role}</p>
                  </div>
                </div>

                <CardContent className="p-6 space-y-6 flex-1 flex flex-col">
                  <div className="space-y-4 flex-1">
                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Biography</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "{leader.bio}"
                    </p>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-border/40">
                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Contact Information</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <a
                        href={`mailto:${leader.email}`}
                        className="flex items-center gap-3 p-2 rounded-xl bg-muted/30 hover:bg-primary/5 hover:text-primary transition-all text-xs group/link border border-transparent hover:border-primary/10"
                      >
                        <div className="h-8 w-8 rounded-lg bg-background flex items-center justify-center border border-border shadow-sm group-hover/link:bg-primary group-hover/link:text-white transition-colors">
                          <Mail className="h-4 w-4" />
                        </div>
                        <span className="truncate">{leader.email}</span>
                      </a>
                      <a
                        href={`tel:${leader.phone}`}
                        className="flex items-center gap-3 p-2 rounded-xl bg-muted/30 hover:bg-primary/5 hover:text-primary transition-all text-xs group/link border border-transparent hover:border-primary/10"
                      >
                        <div className="h-8 w-8 rounded-lg bg-background flex items-center justify-center border border-border shadow-sm group-hover/link:bg-primary group-hover/link:text-white transition-colors">
                          <Phone className="h-4 w-4" />
                        </div>
                        <span>{leader.phone}</span>
                      </a>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4 group/btn" size="sm">
                    View Impact Report
                    <ArrowLeft className="h-3 w-3 ml-2 rotate-180 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 2. Sectors Section ───────────────────────────── */}
        <section aria-labelledby="sectors-heading">
          <div className="text-center mb-12">
            <h2 id="sectors-heading" className="text-3xl font-bold tracking-tight">
              Council Sectors
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Our departments work tirelessly to serve different aspects of student life. Select a sector to learn more about their responsibilities and services.
            </p>
          </div>

          <Tabs defaultValue="student-service" className="w-full">
            <TabsList className="w-full grid grid-cols-2 lg:grid-cols-5 h-auto p-1 bg-muted/50 border border-border">
              {SECTORS.map((sector) => (
                <TabsTrigger
                  key={sector.id}
                  value={sector.id}
                  className="py-3 px-2 text-xs sm:text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                >
                  <sector.icon className="h-4 w-4 mr-2 hidden sm:inline" />
                  {sector.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {SECTORS.map((sector) => (
              <TabsContent key={sector.id} className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300" data-value={sector.id}>
                <Card className="border-border/40 shadow-sm overflow-hidden">
                  <div className="grid lg:grid-cols-12 gap-0">
                    {/* Left Panel: Info */}
                    <div className="lg:col-span-8 p-6 sm:p-10 space-y-10">
                      <div>
                        <h3 className="text-2xl font-bold flex items-center gap-3">
                          <sector.icon className="h-7 w-7 text-primary" />
                          {sector.title} Overview
                        </h3>
                        <p className="mt-4 text-muted-foreground leading-relaxed text-lg">
                          {sector.overview}
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-10">
                        <div>
                          <h4 className="font-bold text-sm uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Responsibilities
                          </h4>
                          <ul className="space-y-3">
                            {sector.responsibilities.map((item, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" />
                            Services Provided
                          </h4>
                          <ul className="space-y-3">
                            {sector.services.map((item, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Right Panel: Contact & Action */}
                    <div className="lg:col-span-4 bg-muted/30 border-l border-border p-6 sm:p-10 space-y-8">
                      <div>
                        <h4 className="font-bold text-sm uppercase tracking-widest text-foreground mb-6">
                          Contact Center
                        </h4>
                        <div className="space-y-6">
                          <div className="flex gap-4">
                            <div className="h-10 w-10 rounded-lg bg-background flex items-center justify-center border border-border shadow-sm">
                              <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-muted-foreground uppercase">Office Location</p>
                              <p className="text-sm font-medium">{sector.contact.office}</p>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <div className="h-10 w-10 rounded-lg bg-background flex items-center justify-center border border-border shadow-sm">
                              <Mail className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-muted-foreground uppercase">Official Email</p>
                              <p className="text-sm font-medium truncate max-w-[200px]">{sector.contact.email}</p>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <div className="h-10 w-10 rounded-lg bg-background flex items-center justify-center border border-border shadow-sm">
                              <Phone className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-muted-foreground uppercase">Phone Extension</p>
                              <p className="text-sm font-medium">{sector.contact.phone}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-border/60">
                        <p className="text-xs text-muted-foreground mb-4 italic">
                          Found an issue related to this sector? Submit a formal complaint or suggestion below.
                        </p>
                        <Button className="w-full shadow-lg" onClick={onComplaint}>
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Submit Sector Complaint
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* ── 3. Document Management Resource Library ──────────────── */}
        <section aria-labelledby="resource-library-heading">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <FileBox className="h-6 w-6" />
            </div>
            <div>
              <h2 id="resource-library-heading" className="text-3xl font-bold tracking-tight">
                Resource Library
              </h2>
              <p className="text-muted-foreground text-sm">Internal document management for authorized council members</p>
            </div>
          </div>
          
          <DocumentLibrary />
        </section>
      </main>

      {/* ── Footer Info ───────────────────────────────────── */}
      <footer className="border-t border-border py-12 bg-muted/10">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
          <p>The Student Council is elected annually by the student body of Addis Ababa University, School of Commerce.</p>
          <div className="mt-4 flex items-center justify-center gap-6">
            <button className="hover:text-primary">Electoral Rules</button>
            <span className="h-4 w-px bg-border" />
            <button className="hover:text-primary">Council Constitution</button>
            <span className="h-4 w-px bg-border" />
            <button className="hover:text-primary">Archive (2025)</button>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ── Inline MapPin replacement since I missed it in imports ─ */
function MapPin({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
