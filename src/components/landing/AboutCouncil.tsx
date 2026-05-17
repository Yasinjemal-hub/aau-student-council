import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Heart, Award } from "lucide-react"

export function AboutCouncil() {
  const values = [
    {
      icon: Users,
      title: "Student Representation",
      description: "We serve as the voice of all commerce students, ensuring your concerns are heard and addressed at every level of university administration.",
    },
    {
      icon: Target,
      title: "Leadership Development",
      description: "Fostering the next generation of leaders through mentorship programs, workshops, and hands-on governance experience.",
    },
    {
      icon: Heart,
      title: "Community Engagement",
      description: "Building a vibrant campus community through events, initiatives, and collaborative projects that bring students together.",
    },
    {
      icon: Award,
      title: "Academic Excellence",
      description: "Supporting academic success through resource sharing, study groups, and partnerships with faculty and administration.",
    },
  ]

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight text-blue-900 sm:text-5xl lg:text-6xl mb-6">
            About the Council
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The AAU School of Commerce Student Council is dedicated to representing student interests,
            fostering academic excellence, and creating a vibrant campus community. We work tirelessly
            to ensure every student's voice is heard and their needs are met.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mb-16">
          <Card className="bg-gradient-to-br from-blue-900 to-blue-950 text-white border-0 shadow-2xl rounded-2xl overflow-hidden">
            <CardContent className="p-8 sm:p-12 lg:p-16">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">Our Mission</h3>
                  <p className="text-lg text-blue-100 leading-relaxed mb-6">
                    To empower commerce students by providing exceptional representation, fostering
                    inclusive community engagement, and championing academic and personal growth
                    opportunities that prepare students for leadership roles in their future careers.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-yellow-400" />
                      <span className="text-sm text-blue-200">Inclusive Representation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-yellow-400" />
                      <span className="text-sm text-blue-200">Transparent Governance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-yellow-400" />
                      <span className="text-sm text-blue-200">Student-Centered Approach</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80"
                    alt="Students collaborating"
                    className="rounded-xl shadow-2xl w-full h-64 sm:h-80 object-cover"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-blue-900/50 to-transparent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Core Values Grid */}
        <div>
          <h3 className="text-2xl font-bold text-blue-900 text-center mb-8 sm:text-3xl">
            Our Core Values
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card
                key={value.title}
                className="group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl border-2 border-border/50 hover:border-yellow-400/50"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-900 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-blue-900 transition-all duration-300">
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h4 className="text-lg font-bold text-blue-900 mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
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
