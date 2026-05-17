import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80"
          alt="University campus"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-900/85 to-blue-950/90" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 h-32 w-32 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="absolute bottom-20 left-10 h-40 w-40 rounded-full bg-yellow-400/10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-6 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
            <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">
              Addis Ababa University
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">
            Student Council
            <span className="block mt-2 text-yellow-400">
              School of Commerce
            </span>
          </h1>

          {/* Subheading */}
          <p className="mb-10 text-xl text-blue-100 sm:text-2xl lg:text-3xl font-medium leading-relaxed">
            Empowering students through leadership, advocacy, and community engagement.
            <span className="block mt-2 text-blue-200/80">
              Your voice, your council, your future.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-xl px-8 py-6 text-lg font-semibold"
              aria-label="Get started with student council portal"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-xl px-8 py-6 text-lg font-semibold backdrop-blur-sm"
              aria-label="Learn more about the student council"
            >
              Learn More
            </Button>
          </div>

          {/* Stats Preview */}
          <div className="mt-16 grid grid-cols-3 gap-8 sm:gap-12">
            {[
              { value: "5,000+", label: "Active Students" },
              { value: "50+", label: "Events / Year" },
              { value: "12", label: "Departments" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-yellow-400 sm:text-4xl lg:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-blue-200 sm:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-8 w-5 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm">
          <div className="mt-2 h-2 w-2 rounded-full bg-yellow-400" />
        </div>
      </div>
    </section>
  )
}
