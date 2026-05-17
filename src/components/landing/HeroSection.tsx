import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section 
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/98 via-blue-900/95 to-blue-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-400/10 via-transparent to-transparent" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-yellow-400/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 h-80 w-80 rounded-full bg-blue-400/5 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full border border-white/5" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-5 py-2.5 backdrop-blur-sm shadow-lg shadow-yellow-400/5">
            <Sparkles className="h-4 w-4 text-yellow-400" aria-hidden="true" />
            <span className="text-sm font-semibold text-yellow-400 uppercase tracking-widest">
              Addis Ababa University
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" aria-hidden="true" />
          </div>

          {/* Main Heading */}
          <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-8xl text-balance">
            <span className="block">Student Council</span>
            <span className="block mt-3 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              School of Commerce
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mb-12 max-w-3xl text-xl text-blue-100/90 sm:text-2xl lg:text-3xl font-medium leading-relaxed text-pretty">
            Empowering students through leadership, advocacy, and community engagement.
            <span className="block mt-3 text-lg sm:text-xl text-blue-200/70 font-normal">
              Your voice, your council, your future.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Button
              size="lg"
              className="group bg-yellow-400 text-blue-900 hover:bg-yellow-300 shadow-xl shadow-yellow-400/25 hover:shadow-2xl hover:shadow-yellow-400/30 hover:-translate-y-1 transition-all duration-300 rounded-2xl px-10 py-7 text-lg font-bold"
              aria-label="Get started with student council portal"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl px-10 py-7 text-lg font-semibold backdrop-blur-sm"
              aria-label="Watch introduction video"
            >
              <Play className="mr-2 h-5 w-5" aria-hidden="true" />
              Watch Video
            </Button>
          </div>

          {/* Stats Preview */}
          <div className="mt-20 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
            {[
              { value: "5,000+", label: "Active Students" },
              { value: "50+", label: "Events / Year" },
              { value: "12", label: "Departments" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat, index) => (
              <div 
                key={stat.label} 
                className="group relative text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-yellow-400/30 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="text-3xl font-bold text-yellow-400 sm:text-4xl lg:text-5xl group-hover:scale-105 transition-transform">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-blue-200/80 sm:text-base font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3" aria-hidden="true">
        <span className="text-xs text-blue-200/60 uppercase tracking-widest">Scroll to explore</span>
        <div className="h-12 w-6 rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-sm flex justify-center pt-2">
          <div className="h-2.5 w-1.5 rounded-full bg-yellow-400 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
