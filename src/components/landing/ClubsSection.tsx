import { Card, CardContent } from "@/components/ui/card"
import { 
  TrendingUp, 
  Lightbulb, 
  Megaphone, 
  Code, 
  MessageSquare,
  BookOpen 
} from "lucide-react"
import { motion } from "framer-motion"

interface Club {
  id: string
  name: string
  description: string
  members: number
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgColor: string
}

const CLUBS: Club[] = [
  {
    id: "c-1",
    name: "Finance Club",
    description: "Master financial analysis, investment strategies, and market dynamics through hands-on workshops.",
    members: 150,
    icon: TrendingUp,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    id: "c-2",
    name: "Entrepreneurship Club",
    description: "Transform your business ideas into reality with mentorship, resources, and networking opportunities.",
    members: 200,
    icon: Lightbulb,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    id: "c-3",
    name: "Marketing Club",
    description: "Learn cutting-edge marketing strategies, branding, and digital marketing techniques from experts.",
    members: 180,
    icon: Megaphone,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
  {
    id: "c-4",
    name: "Innovation Hub",
    description: "Explore technology, innovation, and digital transformation in the modern business landscape.",
    members: 120,
    icon: Code,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    id: "c-5",
    name: "Debate Club",
    description: "Sharpen your critical thinking and public speaking skills through competitive debates and discussions.",
    members: 90,
    icon: MessageSquare,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "c-6",
    name: "Academic Excellence",
    description: "Peer tutoring, study groups, and academic support to help you achieve your educational goals.",
    members: 250,
    icon: BookOpen,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
]

export function ClubsSection() {
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
          <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
            Get Involved
          </span>
          <h2 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl text-balance">
            Clubs & Departments
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Join one of our vibrant clubs to develop new skills, meet like-minded peers, 
            and enhance your university experience.
          </p>
        </motion.div>

        {/* Clubs Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CLUBS.map((club, index) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="group border-border/50 hover:border-secondary/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 rounded-2xl h-full cursor-pointer">
                <CardContent className="p-8">
                  {/* Icon */}
                  <div className={`h-14 w-14 rounded-2xl ${club.bgColor} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                    <club.icon className={`h-7 w-7 ${club.color}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">
                    {club.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {club.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="h-7 w-7 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-medium text-muted-foreground"
                          >
                            {String.fromCharCode(65 + i)}
                          </div>
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        +{club.members - 3}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                      Join Club
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16"
        >
          <div className="bg-primary rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl lg:text-5xl font-bold text-secondary mb-2">6</p>
                <p className="text-primary-foreground/70 text-sm">Active Clubs</p>
              </div>
              <div>
                <p className="text-4xl lg:text-5xl font-bold text-secondary mb-2">990+</p>
                <p className="text-primary-foreground/70 text-sm">Total Members</p>
              </div>
              <div>
                <p className="text-4xl lg:text-5xl font-bold text-secondary mb-2">50+</p>
                <p className="text-primary-foreground/70 text-sm">Events/Year</p>
              </div>
              <div>
                <p className="text-4xl lg:text-5xl font-bold text-secondary mb-2">25+</p>
                <p className="text-primary-foreground/70 text-sm">Industry Partners</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
