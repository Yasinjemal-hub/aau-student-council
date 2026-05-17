"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  Target,
  Heart,
  Award,
  GraduationCap,
  Globe,
  Lightbulb,
  Shield,
  ArrowRight,
  CheckCircle2,
  Quote,
} from "lucide-react"

interface AboutPageProps {
  onBack: () => void
  setView: (view: string) => void
}

const values = [
  {
    icon: Users,
    title: "Student Representation",
    description: "We serve as the voice of all commerce students, ensuring your concerns are heard and addressed at every level.",
  },
  {
    icon: Target,
    title: "Leadership Development",
    description: "Fostering the next generation of leaders through mentorship programs, workshops, and hands-on experience.",
  },
  {
    icon: Heart,
    title: "Community Engagement",
    description: "Building a vibrant campus community through events, initiatives, and collaborative projects.",
  },
  {
    icon: Award,
    title: "Academic Excellence",
    description: "Supporting academic success through resource sharing, study groups, and faculty partnerships.",
  },
]

const stats = [
  { value: "48+", label: "Years of Service" },
  { value: "5,000+", label: "Students Represented" },
  { value: "100+", label: "Annual Events" },
  { value: "12", label: "Active Departments" },
]

const milestones = [
  { year: "1975", title: "Council Founded", description: "Establishment of the first student representative body" },
  { year: "1995", title: "Major Expansion", description: "Introduction of sector-based governance structure" },
  { year: "2010", title: "Digital Transformation", description: "Launch of online complaint and feedback systems" },
  { year: "2024", title: "Modern Era", description: "Implementation of comprehensive digital council platform" },
]

const principles = [
  "Transparent and accountable governance",
  "Inclusive representation for all students",
  "Evidence-based decision making",
  "Continuous improvement and innovation",
  "Respect for diversity and inclusion",
  "Commitment to academic integrity",
]

export function AboutPage({ onBack, setView }: AboutPageProps) {
  const statsRef = useRef<HTMLDivElement>(null)
  const isStatsInView = useInView(statsRef, { once: true })

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 px-4 py-2 mb-6">
              <GraduationCap className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">
                About Us
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
              Empowering Students,
              <span className="block bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                Building Leaders
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-200/70 max-w-3xl mx-auto">
              The AAU School of Commerce Student Council has been championing student rights, fostering academic excellence, and building community since 1975.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-12 -mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((stat, index) => (
              <Card key={stat.label} className="border-border/50 rounded-2xl overflow-hidden bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <p className="text-3xl sm:text-4xl font-black text-yellow-500 mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-border/50 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900 to-blue-950 text-white">
                <CardContent className="p-8 lg:p-10">
                  <div className="h-14 w-14 rounded-xl bg-yellow-400 flex items-center justify-center mb-6">
                    <Target className="h-7 w-7 text-blue-900" />
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4">Our Mission</h2>
                  <p className="text-blue-100/80 leading-relaxed text-lg">
                    To empower commerce students by providing exceptional representation, fostering inclusive community engagement, and championing academic and personal growth opportunities that prepare students for leadership roles in their future careers.
                  </p>
                  <div className="mt-8 space-y-3">
                    {principles.slice(0, 3).map((principle) => (
                      <div key={principle} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-yellow-400 shrink-0" />
                        <span className="text-blue-100/70 text-sm">{principle}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full border-border/50 rounded-2xl overflow-hidden">
                <CardContent className="p-8 lg:p-10">
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center mb-6">
                    <Lightbulb className="h-7 w-7 text-yellow-400" />
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    To be the leading student governance body in Ethiopia, recognized for innovative leadership, transparent operations, and meaningful impact on student life and academic success.
                  </p>
                  <div className="mt-8 space-y-3">
                    {principles.slice(3).map((principle) => (
                      <div key={principle} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                        <span className="text-muted-foreground text-sm">{principle}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do as student representatives.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-border/50 hover:border-yellow-400/30 rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center mb-4 group-hover:from-yellow-400 group-hover:to-yellow-500 transition-all duration-300">
                      <value.icon className="h-7 w-7 text-yellow-400 group-hover:text-blue-900" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Key milestones in our history of serving students.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden lg:block" />

            <div className="space-y-12 lg:space-y-0">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative lg:w-1/2 ${index % 2 === 0 ? "lg:pr-12 lg:ml-auto lg:text-left" : "lg:pl-12 lg:text-right"}`}
                >
                  {/* Timeline Dot */}
                  <div className={`hidden lg:block absolute top-6 ${index % 2 === 0 ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"} w-4 h-4 rounded-full bg-yellow-400 border-4 border-background`} />

                  <Card className="border-border/50 rounded-2xl overflow-hidden">
                    <CardContent className="p-6">
                      <span className="inline-block px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-600 text-sm font-bold mb-3">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-bold text-foreground mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Quote className="h-12 w-12 text-yellow-400/30 mx-auto mb-6" />
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 max-w-4xl mx-auto leading-relaxed">
              "Together, we build bridges between students and administration, creating a campus where every voice matters."
            </blockquote>
            <p className="text-blue-200/70 mb-8">- AAU School of Commerce Student Council</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => setView("leadership")}
                className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 rounded-xl px-8 font-semibold"
              >
                Meet Our Leaders
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={() => setView("contact")}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8 font-semibold"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back Button */}
      <div className="fixed bottom-8 left-8 z-50">
        <Button
          onClick={onBack}
          variant="outline"
          className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm"
        >
          &larr; Back
        </Button>
      </div>
    </div>
  )
}
