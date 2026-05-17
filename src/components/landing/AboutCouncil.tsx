import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Target, Heart, Award, ArrowRight, Quote } from "lucide-react"

export function AboutCouncil() {
  const values = [
    {
      icon: Users,
      title: "Student Representation",
      description: "We serve as the voice of all commerce students, ensuring your concerns are heard and addressed at every level.",
    },
    {
      icon: Target,
      title: "Leadership Development",
      description: "Fostering the next generation of leaders through mentorship programs and hands-on governance experience.",
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

  return (
    <section 
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" aria-hidden="true" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden="true" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-900/10 px-5 py-2">
            <span className="h-2 w-2 rounded-full bg-blue-900" aria-hidden="true" />
            <span className="text-sm font-semibold text-blue-900 uppercase tracking-widest">
              Who We Are
            </span>
          </div>
          <h2 
            id="about-heading"
            className="text-4xl font-extrabold tracking-tight text-blue-900 sm:text-5xl lg:text-6xl mb-6 text-balance"
          >
            About the Council
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
            The AAU School of Commerce Student Council is dedicated to representing student interests,
            fostering academic excellence, and creating a vibrant campus community.
          </p>
        </div>

        {/* Mission Statement - Featured Card */}
        <div className="mb-20">
          <Card className="relative bg-gradient-to-br from-blue-900 via-blue-900 to-blue-950 text-white border-0 shadow-2xl rounded-3xl overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10" aria-hidden="true">
              <div className="absolute top-10 right-10 w-32 h-32 rounded-full border-2 border-yellow-400" />
              <div className="absolute top-20 right-20 w-48 h-48 rounded-full border border-yellow-400/50" />
              <div className="absolute bottom-10 right-32 w-24 h-24 rounded-full border border-yellow-400/30" />
            </div>
            
            <CardContent className="relative p-8 sm:p-12 lg:p-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-yellow-400/20 px-4 py-2 mb-6">
                    <Quote className="h-4 w-4 text-yellow-400" aria-hidden="true" />
                    <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">Our Mission</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                    Empowering Commerce Students for a{" "}
                    <span className="text-yellow-400">Brighter Future</span>
                  </h3>
                  <p className="text-lg text-blue-100/90 leading-relaxed mb-8">
                    To empower commerce students by providing exceptional representation, fostering
                    inclusive community engagement, and championing academic and personal growth
                    opportunities that prepare students for leadership roles in their future careers.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-8">
                    {["Inclusive Representation", "Transparent Governance", "Student-Centered"].map((item) => (
                      <div key={item} className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                        <div className="h-2 w-2 rounded-full bg-yellow-400" aria-hidden="true" />
                        <span className="text-sm text-blue-100 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 shadow-lg shadow-yellow-400/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-xl px-6 py-6 text-base font-semibold group"
                  >
                    Meet Our Team
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Button>
                </div>
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80"
                      alt="Students collaborating together in a study session"
                      className="w-full h-72 sm:h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent" />
                  </div>
                  {/* Floating stat card */}
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-border/50">
                    <p className="text-4xl font-bold text-blue-900">15+</p>
                    <p className="text-sm text-muted-foreground font-medium">Years of Excellence</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Core Values Grid */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-blue-900 sm:text-3xl">
              Our Core Values
            </h3>
            <p className="mt-3 text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="group relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 rounded-2xl border-2 border-border/50 hover:border-yellow-400/50 bg-card overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/5 group-hover:to-transparent transition-all duration-300" aria-hidden="true" />
                
                <CardContent className="relative p-8">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-900 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-blue-900 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-110">
                    <value.icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <h4 className="text-xl font-bold text-blue-900 mb-3">
                    {value.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
