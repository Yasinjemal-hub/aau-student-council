import { Card, CardContent } from "@/components/ui/card"
import { Mail, Briefcase, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
}

interface TeamMember {
  id: string
  name: string
  role: string
  email: string
  bio: string
  year: string
  image: string
}

const TEAM: TeamMember[] = [
  {
    id: "l-1",
    name: "Kidus Elias",
    role: "President",
    email: "kidus.e@aau.edu.et",
    bio: "Visionary leader focused on academic excellence and student-led innovation within the School of Commerce.",
    year: "Economics 4th Year",
    image: "/assets/kidus-Elias.jpg",
  },
  {
    id: "l-2",
    name: "Rahma Nigusse",
    role: "Council Ambassador",
    email: "rahma.n@aau.edu.et",
    bio: "Dedicated to representing the student body at international forums and building strategic partnerships.",
    year: "BAIS 3rd Year",
    image: "/assets/Rahma.jpg",
  },
  {
    id: "l-3",
    name: "Elda",
    role: "Secretary General",
    email: "elda.s@aau.edu.et",
    bio: "Expert in administrative efficiency and cross-departmental coordination for seamless council operations.",
    year: "Accounting 3rd Year",
    image: "/assets/Elda.jpg",
  },
  {
    id: "l-4",
    name: "Fikremaryam Asmamaw",
    role: "Discipline & Ethics Head",
    email: "fikremaryam.a@aau.edu.et",
    bio: "Ensuring the highest standards of conduct and ethical behavior across all student organizations.",
    year: "Logistics 2nd Year",
    image: "/assets/Fekremariam.jpg",
  },
  {
    id: "l-5",
    name: "Abdulhafiz",
    role: "PR & Communications",
    email: "abdulhafiz.c@aau.edu.et",
    bio: "Managing the council's public image and ensuring effective communication with the student body.",
    year: "Marketing 3rd Year",
    image: "/assets/Abdulhafiz.jpg",
  },
]

export function ExecutiveTeam() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          {...fadeInUp}
          className="mx-auto max-w-3xl text-center mb-20"
        >
          <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
            Meet the Team
          </span>
          <h2 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6 text-balance">
            Executive Leadership
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            Our dedicated team of student leaders works tirelessly to represent your interests,
            drive positive change, and build a stronger campus community.
          </p>
        </motion.div>

        {/* Featured President Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <Card className="overflow-hidden border-0 shadow-2xl bg-primary text-primary-foreground rounded-3xl">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative aspect-[4/3] lg:aspect-auto">
                  <img
                    src={TEAM[0].image}
                    alt={TEAM[0].name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary/80 hidden lg:block" />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-2 text-secondary text-sm font-semibold uppercase tracking-wider mb-4">
                    <span className="h-1 w-8 bg-secondary rounded-full" />
                    Student Council President
                  </span>
                  <h3 className="text-3xl lg:text-4xl font-bold mb-2">{TEAM[0].name}</h3>
                  <p className="text-primary-foreground/60 text-sm mb-6">{TEAM[0].year}</p>
                  <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8">
                    {TEAM[0].bio} Kidus drives strategic initiatives that bridge the gap between 
                    academic theory and practical industry experience, ensuring every student has 
                    the opportunity to excel.
                  </p>
                  <div className="flex items-center gap-4">
                    <a
                      href={`mailto:${TEAM[0].email}`}
                      className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      {TEAM[0].email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    <a
                      href="#"
                      className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all"
                    >
                      <Briefcase className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Team Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.slice(1).map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="group overflow-hidden border-border/50 hover:border-secondary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 rounded-2xl h-full">
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Overlay Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="inline-block px-3 py-1 rounded-full bg-secondary/90 text-primary text-xs font-semibold mb-3">
                        {member.role}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                      <p className="text-white/70 text-sm">{member.year}</p>
                    </div>

                    {/* Hover Social Icons */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={`mailto:${member.email}`}
                        className="h-9 w-9 rounded-full bg-white/90 flex items-center justify-center text-primary hover:bg-secondary transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                      <a
                        href="#"
                        className="h-9 w-9 rounded-full bg-white/90 flex items-center justify-center text-primary hover:bg-secondary transition-colors"
                      >
                        <Briefcase className="h-4 w-4" />
                      </a>
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
