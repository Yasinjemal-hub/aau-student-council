import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Target, Heart, Award, ArrowRight, CheckCircle2 } from "lucide-react"

export function AboutCouncil() {
  const values = [
    {
      icon: Users,
      title: "Student Representation",
      description:
        "We serve as the voice of all commerce students, ensuring your concerns are heard at every level.",
    },
    {
      icon: Target,
      title: "Leadership Development",
      description:
        "Fostering the next generation of leaders through mentorship and hands-on experience.",
    },
    {
      icon: Heart,
      title: "Community Engagement",
      description:
        "Building a vibrant campus community through events and collaborative initiatives.",
    },
    {
      icon: Award,
      title: "Academic Excellence",
      description:
        "Supporting academic success through resources, study groups, and faculty partnerships.",
    },
  ]

  const achievements = [
    "Organized 50+ successful campus events",
    "Represented 5,000+ students annually",
    "Partnered with 20+ industry leaders",
    "Secured student welfare improvements",
  ]

  return (
    <section
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-yellow-400/5 blur-[100px]" />
      <div className="absolute bottom-20 left-0 h-96 w-96 rounded-full bg-blue-900/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-900/10 px-5 py-2.5 border border-blue-900/20">
            <div className="h-2 w-2 rounded-full bg-blue-900 animate-pulse" />
            <span className="text-sm font-bold text-blue-900 uppercase tracking-widest">
              About Us
            </span>
          </div>
          <h2
            id="about-heading"
            className="text-4xl font-extrabold tracking-tight text-blue-900 sm:text-5xl lg:text-6xl mb-6 text-balance"
          >
            About the Council
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
            The AAU School of Commerce Student Council is dedicated to
            representing student interests, fostering academic excellence, and
            creating a vibrant campus community.
          </p>
        </div>

        {/* Mission Statement Card */}
        <div className="mb-20">
          <Card className="overflow-hidden border-0 shadow-2xl rounded-3xl">
            <div className="grid lg:grid-cols-2">
              {/* Image Side */}
              <div className="relative h-72 lg:h-auto min-h-[400px]">
                <img
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80"
                  alt="Students collaborating in university setting"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/70 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-blue-900/50 lg:to-blue-900/90" />
                
                {/* Floating stats on image */}
                <div className="absolute bottom-6 left-6 right-6 lg:hidden">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/95 backdrop-blur-sm p-4 shadow-lg">
                      <p className="text-2xl font-extrabold text-blue-900">5K+</p>
                      <p className="text-xs text-muted-foreground font-medium">Students</p>
                    </div>
                    <div className="rounded-xl bg-white/95 backdrop-blur-sm p-4 shadow-lg">
                      <p className="text-2xl font-extrabold text-yellow-500">50+</p>
                      <p className="text-xs text-muted-foreground font-medium">Events</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <CardContent className="bg-gradient-to-br from-blue-900 via-blue-900 to-blue-950 p-8 sm:p-10 lg:p-12 text-white">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-yellow-400/20 px-4 py-1.5">
                  <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest">
                    Our Mission
                  </span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 leading-tight">
                  Empowering Commerce Students{" "}
                  <span className="text-yellow-400">Since Day One</span>
                </h3>
                
                <p className="text-lg text-blue-100/90 leading-relaxed mb-8">
                  To empower commerce students by providing exceptional
                  representation, fostering inclusive community engagement, and
                  championing academic and personal growth opportunities.
                </p>

                {/* Achievements List */}
                <ul className="space-y-3 mb-8" role="list" aria-label="Key achievements">
                  {achievements.map((achievement) => (
                    <li key={achievement} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-blue-100/90 font-medium">{achievement}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 shadow-lg shadow-yellow-400/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-xl px-6 py-5 font-bold"
                  aria-label="Learn more about the student council"
                >
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Core Values Grid */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-extrabold text-blue-900 sm:text-3xl lg:text-4xl mb-4">
              Our Core Values
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do for our student community.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 rounded-2xl border-2 border-border/50 hover:border-yellow-400/50 bg-card"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-blue-900/0 group-hover:from-yellow-400/5 group-hover:to-blue-900/5 transition-all duration-300" />
                
                <CardContent className="relative p-6 sm:p-8">
                  {/* Icon */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-900 text-yellow-400 shadow-lg shadow-blue-900/20 group-hover:bg-yellow-400 group-hover:text-blue-900 group-hover:shadow-yellow-400/30 transition-all duration-300">
                    <value.icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  
                  {/* Content */}
                  <h4 className="text-lg font-bold text-blue-900 mb-3 group-hover:text-yellow-600 transition-colors duration-300">
                    {value.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>

                  {/* Decorative number */}
                  <div className="absolute top-4 right-4 text-6xl font-extrabold text-blue-900/5 group-hover:text-yellow-400/10 transition-colors duration-300">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
