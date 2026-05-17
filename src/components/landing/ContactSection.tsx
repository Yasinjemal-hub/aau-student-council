import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { motion } from "framer-motion"

export function ContactSection() {
  return (
    <section className="py-24 lg:py-32 bg-background">
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
            Get in Touch
          </span>
          <h2 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl text-balance">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Have questions or suggestions? We would love to hear from you. Reach out to the Student Council team.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="border-border/50 rounded-2xl shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-foreground mb-6">Send us a message</h3>
                <form className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@aau.edu.et"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What is this about?"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Write your message here..."
                      className="rounded-xl min-h-[150px] resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-secondary text-primary hover:bg-secondary/90 rounded-full py-6 text-base font-semibold group"
                  >
                    Send Message
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-border/50 rounded-2xl">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-secondary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <p className="text-sm text-muted-foreground">council@aau.edu.et</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 rounded-2xl">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-secondary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                  <p className="text-sm text-muted-foreground">+251 11 123 4567</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 rounded-2xl">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-secondary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Location</h4>
                  <p className="text-sm text-muted-foreground">Block A, Room 101, AAU Main Campus</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 rounded-2xl">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">Office Hours</h4>
                  <p className="text-sm text-muted-foreground">Mon-Fri: 9AM - 5PM</p>
                </CardContent>
              </Card>
            </div>

            {/* Map Embed */}
            <Card className="border-border/50 rounded-2xl overflow-hidden">
              <div className="aspect-[16/10] bg-muted relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.579478837!2d38.7630!3d9.0092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85a41ac0e0c5%3A0x6c98f6c7a18a8e5!2sAddis%20Ababa%20University!5e0!3m2!1sen!2set!4v1620000000000!5m2!1sen!2set"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AAU Location"
                  className="absolute inset-0"
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
