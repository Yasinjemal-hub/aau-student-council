"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Users, Calendar, Award, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

interface HeroSectionProps {
  setView: (view: string) => void
}

const stats = [
  { value: 5000, suffix: "+", label: "Active Students", icon: Users },
  { value: 50, suffix: "+", label: "Events / Year", icon: Calendar },
  { value: 12, suffix: "", label: "Departments", icon: Award },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 50
    const stepValue = value / steps
    const stepDuration = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current += stepValue
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export function HeroSection({ setView }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 lg:pt-20">
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80"
          alt="University campus"
          className="h-full w-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-blue-900/90 to-blue-950/95" />
        
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-400/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-6 py-2.5 backdrop-blur-sm"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-yellow-400"
            />
            <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">
              Addis Ababa University
            </span>
            <Sparkles className="h-4 w-4 text-yellow-400" />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
          >
            <span className="block">Student Council</span>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block mt-2 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent"
            >
              School of Commerce
            </motion.span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10 text-lg text-blue-100/90 sm:text-xl lg:text-2xl font-medium leading-relaxed max-w-3xl mx-auto"
          >
            Empowering students through leadership, advocacy, and community engagement.
            <span className="block mt-2 text-blue-200/70">
              Your voice, your council, your future.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={() => setView("auth")}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 hover:from-yellow-300 hover:to-yellow-400 shadow-xl shadow-yellow-400/30 hover:-translate-y-1 transition-all duration-300 rounded-xl px-8 py-6 text-lg font-bold"
                aria-label="Get started with student council portal"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setView("about")}
                className="border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 hover:-translate-y-1 transition-all duration-300 rounded-xl px-8 py-6 text-lg font-semibold backdrop-blur-sm group"
                aria-label="Learn more about the student council"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 grid grid-cols-3 gap-4 sm:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/0 rounded-2xl blur-xl group-hover:from-yellow-400/10 transition-all duration-500" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-yellow-400/30 transition-all duration-300">
                  <div className="flex items-center justify-center mb-3">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-yellow-400/10 flex items-center justify-center">
                      <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-4xl lg:text-5xl font-black text-yellow-400">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-blue-200/70 font-medium">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/50 font-medium uppercase tracking-widest">Scroll</span>
          <div className="h-12 w-6 rounded-full border-2 border-white/30 bg-white/5 backdrop-blur-sm flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-2 w-2 rounded-full bg-yellow-400"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
