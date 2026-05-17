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
          alt="University campus with students"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-blue-900/90 to-blue-950/95" />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-400/10 via-transparent to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-yellow-400/20 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-400/15 blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 h-64 w-64 rounded-full bg-yellow-400/10 blur-[80px]" />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/15 px-6 py-2.5 backdrop-blur-md shadow-lg shadow-yellow-400/10">
            <Sparkles className="h-4 w-4 text-yellow-400" aria-hidden="true" />
            <span className="text-sm font-semibold text-yellow-400 uppercase tracking-widest">
              Addis Ababa University
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-8xl">
            <span className="block">Student Council</span>
            <span className="mt-2 block bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              School of Commerce
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mb-12 max-w-3xl text-xl text-blue-100/90 sm:text-2xl lg:text-3xl font-medium leading-relaxed">
            Empowering students through{" "}
            <span className="text-yellow-400 font-semibold">leadership</span>,{" "}
            <span className="text-yellow-400 font-semibold">advocacy</span>, and{" "}
            <span className="text-yellow-400 font-semibold">community</span>.
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
              className="group border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-2xl px-10 py-7 text-lg font-bold backdrop-blur-md"
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
              { value: "50+", label: "Events Yearly" },
              { value: "12", label: "Departments" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="group relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 transition-all duration-300 hover:bg-white/10 hover:border-yellow-400/30"
              >
                <p className="text-3xl font-extrabold text-yellow-400 sm:text-4xl lg:text-5xl tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-blue-200/80 font-medium sm:text-base">
                  {stat.label}
                </p>
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2 border-yellow-400/30 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div
          className="flex flex-col items-center gap-2"
          aria-label="Scroll down for more content"
        >
          <span className="text-xs text-blue-200/60 uppercase tracking-widest font-medium">
            Scroll
          </span>
          <div className="h-12 w-6 rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-sm p-1">
            <div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse mx-auto" />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
