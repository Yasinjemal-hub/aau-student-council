import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { motion } from "framer-motion"

interface Testimonial {
  id: string
  name: string
  role: string
  department: string
  quote: string
  image: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Sara Alemayehu",
    role: "Finance Student",
    department: "4th Year",
    quote: "The Student Council has been instrumental in creating opportunities for professional development. The career fairs and networking events have helped me land my dream internship.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
  },
  {
    id: "t-2",
    name: "Daniel Tesfaye",
    role: "Marketing Student",
    department: "3rd Year",
    quote: "Being part of the Entrepreneurship Club changed my perspective on business. The mentorship and resources provided have been invaluable to my startup journey.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    id: "t-3",
    name: "Helen Girma",
    role: "Accounting Student",
    department: "2nd Year",
    quote: "The council truly represents student voices. When we raised concerns about study facilities, they worked tirelessly to improve our learning environment.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
]

export function TestimonialsSection() {
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
            Student Voices
          </span>
          <h2 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl text-balance">
            What Students Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Hear from fellow students about their experiences with the Student Council.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="h-full border-border/50 hover:border-secondary/30 transition-all duration-500 hover:shadow-xl rounded-2xl bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  {/* Quote Icon */}
                  <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                    <Quote className="h-6 w-6 text-secondary" />
                  </div>

                  {/* Quote */}
                  <blockquote className="text-foreground leading-relaxed mb-8">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.department}
                      </p>
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
