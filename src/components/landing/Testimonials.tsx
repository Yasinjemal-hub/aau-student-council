"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote, Star, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Mekdes Tesfaye",
    role: "Accounting Student, 4th Year",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    quote: "The Student Council has been instrumental in advocating for better academic resources. Their dedication to student welfare is truly commendable.",
    rating: 5,
  },
  {
    id: 2,
    name: "Yonas Bekele",
    role: "Economics Student, 3rd Year",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    quote: "Thanks to the council's career fair initiatives, I secured an internship at a top financial institution. They truly bridge the gap between academics and industry.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sara Alemayehu",
    role: "Marketing Student, 2nd Year",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    quote: "The leadership workshops organized by the council helped me develop skills I never knew I had. I'm now confident in pursuing leadership roles.",
    rating: 5,
  },
  {
    id: 4,
    name: "Daniel Hailu",
    role: "Logistics Student, 4th Year",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    quote: "The complaint resolution system is efficient and transparent. When I raised a concern about facility maintenance, it was addressed within days.",
    rating: 5,
  },
  {
    id: 5,
    name: "Hanna Girma",
    role: "Management Student, 3rd Year",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    quote: "Being part of the council's community outreach programs has been life-changing. We've impacted so many lives together.",
    rating: 5,
  },
  {
    id: 6,
    name: "Abebe Tadesse",
    role: "BAIS Student, 2nd Year",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    quote: "The diversity initiatives by the Women's Affairs sector created a more inclusive environment on campus. Proud to study here!",
    rating: 5,
  },
]

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 3))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(testimonials.length / 3)) % Math.ceil(testimonials.length / 3))
  }

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-28 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden"
      aria-labelledby="testimonials-heading"
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
            <Quote className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wider">
              Student Voices
            </span>
          </div>
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground mb-4"
          >
            What Our Students Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from the students who have experienced the impact of our council's initiatives firsthand.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="h-12 w-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
          </div>
          <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="h-12 w-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Testimonials Container */}
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {testimonials.slice(currentIndex * 3, currentIndex * 3 + 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="h-full group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-border/50 hover:border-yellow-400/30 rounded-2xl overflow-hidden">
                  <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                    {/* Quote Icon */}
                    <div className="mb-6">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-400/20">
                        <Quote className="h-6 w-6 text-blue-900" />
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="flex-1 mb-6">
                      <p className="text-muted-foreground leading-relaxed italic">
                        "{testimonial.quote}"
                      </p>
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-6 border-t border-border">
                      <div className="relative">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="h-12 w-12 rounded-full object-cover ring-2 ring-yellow-400/20"
                        />
                        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-yellow-400 flex items-center justify-center">
                          <GraduationCap className="h-3 w-3 text-blue-900" />
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Navigation */}
          <div className="flex lg:hidden justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === i ? "w-8 bg-yellow-400" : "w-2 bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
