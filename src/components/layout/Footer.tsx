import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  ArrowRight
} from "lucide-react"
import { motion } from "framer-motion"

interface FooterProps {
  onNavigate: (section: string) => void
}

const FOOTER_LINKS = {
  quickLinks: [
    { label: "Home", section: "home" },
    { label: "About Us", section: "about" },
    { label: "Leadership", section: "team" },
    { label: "Events", section: "events" },
    { label: "Clubs", section: "clubs" },
  ],
  resources: [
    { label: "Announcements", section: "announcements" },
    { label: "Documents", section: "documents" },
    { label: "Academic Resources", section: "resources" },
    { label: "Suggestions", section: "suggestions" },
    { label: "FAQs", section: "faqs" },
  ],
  connect: [
    { label: "Contact Us", section: "contact" },
    { label: "Office Location", section: "contact" },
    { label: "Office Hours", section: "contact" },
    { label: "Report an Issue", section: "suggestions" },
  ],
}

const SOCIAL_LINKS = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="border-b border-primary-foreground/10"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-md">
              <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                Stay Updated
              </h3>
              <p className="text-primary-foreground/70">
                Subscribe to our newsletter for the latest news, events, and announcements.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-12 h-14 rounded-full bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-secondary"
                />
              </div>
              <Button className="h-14 px-8 bg-secondary text-primary hover:bg-secondary/90 rounded-full font-semibold group">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-2 shadow-lg">
                <img
                  src="/assets/council_logo.png"
                  alt="Council Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-lg font-bold text-primary-foreground">
                  AAU Student Council
                </h2>
                <p className="text-xs text-primary-foreground/60">
                  School of Commerce
                </p>
              </div>
            </div>
            <p className="text-primary-foreground/70 leading-relaxed mb-6 max-w-sm">
              Empowering students through leadership, advocacy, and community engagement. 
              Your voice, your council, your future.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-6">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.section)}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-6">
              Resources
            </h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.section)}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-6">
              Connect
            </h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.connect.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.section)}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-primary-foreground/50">
              &copy; {new Date().getFullYear()} Addis Ababa University — School of Commerce Student Council. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-primary-foreground/50">
              <button className="hover:text-secondary transition-colors">Privacy Policy</button>
              <button className="hover:text-secondary transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
