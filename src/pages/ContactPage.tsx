"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Building2,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react"
import { useState } from "react"

interface ContactPageProps {
  onBack: () => void
}

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["Addis Ababa University", "School of Commerce", "Mexico Square, Addis Ababa"],
    action: "Get Directions",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+251 11 123 4567", "+251 11 123 4568"],
    action: "Call Now",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["council@aau.edu.et", "support@aau.edu.et"],
    action: "Send Email",
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: ["Monday - Friday: 8:30 AM - 5:30 PM", "Saturday: 9:00 AM - 12:00 PM"],
    action: "Book Appointment",
  },
]

const departments = [
  { name: "Student Services", email: "services@aau.edu.et", phone: "+251 11 123 4571" },
  { name: "Academic Affairs", email: "academic@aau.edu.et", phone: "+251 11 123 4572" },
  { name: "Women's Affairs", email: "women@aau.edu.et", phone: "+251 11 123 4573" },
  { name: "Ethics & Peace", email: "ethics@aau.edu.et", phone: "+251 11 123 4574" },
  { name: "Special Needs", email: "inclusion@aau.edu.et", phone: "+251 11 123 4575" },
]

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
]

export function ContactPage({ onBack }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

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
              <MessageSquare className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">
                Get in Touch
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
              Contact Us
            </h1>
            <p className="text-lg sm:text-xl text-blue-200/70 max-w-2xl mx-auto">
              Have questions, suggestions, or concerns? We&apos;re here to help. Reach out to the Student Council and let us assist you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-border/50 hover:border-yellow-400/30 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center mb-4 group-hover:from-yellow-400 group-hover:to-yellow-500 transition-all duration-300">
                      <info.icon className="h-7 w-7 text-yellow-400 group-hover:text-blue-900" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">{info.title}</h3>
                    <div className="flex-1 space-y-1 mb-4">
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="w-fit text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950 p-0">
                      {info.action} &rarr;
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-border/50 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Send us a Message</h2>
                  <p className="text-muted-foreground mb-6">
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all"
                        placeholder="How can we help?"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all resize-none"
                        placeholder="Tell us more about your inquiry..."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white rounded-xl py-6 font-semibold"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Department Directory & Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Department Directory */}
              <Card className="border-border/50 rounded-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-lg bg-blue-900 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-yellow-400" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Department Directory</h2>
                  </div>

                  <div className="space-y-4">
                    {departments.map((dept, index) => (
                      <div
                        key={dept.name}
                        className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div>
                          <p className="font-medium text-foreground">{dept.name}</p>
                          <p className="text-sm text-muted-foreground">{dept.email}</p>
                        </div>
                        <a
                          href={`tel:${dept.phone}`}
                          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
                        >
                          {dept.phone}
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="border-border/50 rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-64 bg-muted">
                    <img
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                      alt="Campus Map"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-2 text-white mb-2">
                        <MapPin className="h-5 w-5 text-yellow-400" />
                        <span className="font-semibold">AAU School of Commerce</span>
                      </div>
                      <p className="text-white/70 text-sm">Mexico Square, Addis Ababa, Ethiopia</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="border-border/50 rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold text-foreground">Follow Us</h3>
                  </div>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center hover:bg-blue-900 hover:text-white transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon className="h-5 w-5" />
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
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
