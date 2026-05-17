"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowUp,
  Send,
} from "lucide-react"
import { useState } from "react"

const footerLinks = {
  quickLinks: [
    { label: "Home", href: "#" },
    { label: "About Us", href: "#" },
    { label: "Leadership", href: "#" },
    { label: "Events", href: "#" },
    { label: "News", href: "#" },
    { label: "Contact", href: "#" },
  ],
  resources: [
    { label: "Student Portal", href: "#" },
    { label: "Academic Calendar", href: "#" },
    { label: "Library", href: "#" },
    { label: "Career Services", href: "#" },
    { label: "Student Handbook", href: "#" },
    { label: "FAQs", href: "#" },
  ],
  services: [
    { label: "Complaint System", href: "#" },
    { label: "Document Library", href: "#" },
    { label: "Event Registration", href: "#" },
    { label: "Peer Tutoring", href: "#" },
    { label: "Counseling", href: "#" },
    { label: "Health Services", href: "#" },
  ],
}

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#", color: "hover:bg-blue-600" },
  { icon: Twitter, label: "Twitter", href: "#", color: "hover:bg-sky-500" },
  { icon: Instagram, label: "Instagram", href: "#", color: "hover:bg-pink-600" },
  { icon: Linkedin, label: "LinkedIn", href: "#", color: "hover:bg-blue-700" },
  { icon: Youtube, label: "YouTube", href: "#", color: "hover:bg-red-600" },
]

interface FooterProps {
  setView: (view: string) => void
}

export function Footer({ setView }: FooterProps) {
  const [email, setEmail] = useState("")

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-gradient-to-b from-blue-950 to-blue-900 text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
      </div>

      {/* Main Footer Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center justify-between gap-8"
          >
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay Updated with Council News
              </h3>
              <p className="text-blue-200/70 max-w-md">
                Subscribe to our newsletter for the latest announcements, events, and student initiatives.
              </p>
            </div>
            <div className="flex w-full max-w-md gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-300/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all"
                />
              </div>
              <Button className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 px-6 rounded-xl font-semibold">
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Links Grid */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2 md:col-span-4 lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-lg">
                <GraduationCap className="h-7 w-7 text-blue-900" />
              </div>
              <div>
                <h2 className="text-lg font-bold">AAU Student Council</h2>
                <p className="text-xs text-blue-200/70">School of Commerce</p>
              </div>
            </div>
            <p className="text-sm text-blue-200/70 mb-6 leading-relaxed">
              Empowering commerce students through leadership, advocacy, and community engagement since 1975.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-colors ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-sm font-bold uppercase tracking-wider text-yellow-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-blue-200/70 hover:text-yellow-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-sm font-bold uppercase tracking-wider text-yellow-400 mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-blue-200/70 hover:text-yellow-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-sm font-bold uppercase tracking-wider text-yellow-400 mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-blue-200/70 hover:text-yellow-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-sm font-bold uppercase tracking-wider text-yellow-400 mb-4">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                <span className="text-sm text-blue-200/70">
                  Addis Ababa University<br />
                  School of Commerce<br />
                  Mexico Square, Addis Ababa
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-yellow-400 shrink-0" />
                <a href="tel:+251111234567" className="text-sm text-blue-200/70 hover:text-yellow-400 transition-colors">
                  +251 11 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-yellow-400 shrink-0" />
                <a href="mailto:council@aau.edu.et" className="text-sm text-blue-200/70 hover:text-yellow-400 transition-colors">
                  council@aau.edu.et
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-blue-200/50 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Addis Ababa University — School of Commerce Student Council. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-blue-200/50">
            <a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 h-12 w-12 flex items-center justify-center rounded-full bg-yellow-400 text-blue-900 shadow-lg shadow-yellow-400/30 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </footer>
  )
}
