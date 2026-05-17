import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Heart, Award, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

const VALUES = [
  {
    icon: Users,
    title: "Student Representation",
    description: "We serve as the voice of all commerce students, ensuring your concerns are heard at every level.",
  },
  {
    icon: Target,
    title: "Leadership Development",
    description: "Fostering the next generation of leaders through mentorship and hands-on governance experience.",
  },
  {
    icon: Heart,
    title: "Community Engagement",
    description: "Building a vibrant campus community through events and collaborative projects.",
  },
  {
    icon: Award,
    title: "Academic Excellence",
    description: "Supporting academic success through resource sharing and partnerships with faculty.",
  },
]

export function AboutCouncil() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center mb-20"
        >
          <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
            Who We Are
          </span>
          <h2 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6 text-balance">
            About the Council
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            The AAU School of Commerce Student Council is dedicated to representing student interests,
            fostering academic excellence, and creating a vibrant campus community.
          </p>
        </motion.div>

        {/* Mission Statement Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <Card className="overflow-hidden border-0 shadow-2xl bg-primary text-primary-foreground rounded-3xl">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 mb-6">
                    <Sparkles className="h-5 w-5 text-secondary" />
                    <span className="text-secondary text-sm font-semibold uppercase tracking-wider">
                      Our Mission
                    </span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight">
                    Empowering Commerce Students for a Better Tomorrow
                  </h3>
                  <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8">
                    To empower commerce students by providing exceptional representation, fostering
                    inclusive community engagement, and championing academic and personal growth
                    opportunities that prepare students for leadership roles in their future careers.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "Inclusive Representation",
                      "Transparent Governance",
                      "Student-Centered Approach",
                      "Continuous Improvement"
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-secondary" />
                        <span className="text-sm text-primary-foreground/70">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative aspect-square lg:aspect-auto min-h-[300px]">
                  <img
                    src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80"
                    alt="Students collaborating"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-primary/20 to-primary/60 lg:bg-gradient-to-r lg:from-primary/80 lg:via-transparent lg:to-transparent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Core Values Grid */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-foreground text-center mb-12"
          >
            Our Core Values
          </motion.h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="group h-full border-border/50 hover:border-secondary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-all duration-300 group-hover:bg-secondary group-hover:text-primary">
                      <value.icon className="h-7 w-7" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
                      {value.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
