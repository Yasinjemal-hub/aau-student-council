import { useState } from "react"
import { SignupForm } from "@/components/auth/SignupForm"
import { LoginForm } from "@/components/auth/LoginForm"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { GraduationCap, Mail, CheckCircle2, Sparkles, Shield, Users } from "lucide-react"

type AuthTab = "login" | "signup"

interface AuthPageProps {
  onAuthSuccess: (user: { email: string }) => void
}

export function AuthPage({ onAuthSuccess }: AuthPageProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>("signup")
  const { toasts, toast, dismiss } = useToast()

  function handleSignupSuccess(data: { studentId: string; email: string }) {
    toast({
      title: "Verification Email Sent!",
      description: `A verification link has been sent to ${data.email}. Please check your inbox to activate your account.`,
      variant: "success",
    })
    // Switch to login after a short delay
    setTimeout(() => setActiveTab("login"), 2000)
  }

  function handleLoginSuccess(data: { email: string }) {
    toast({
      title: "Welcome back!",
      description: `Successfully signed in as ${data.email}`,
      variant: "success",
    })
    setTimeout(() => onAuthSuccess({ email: data.email }), 1000)
  }

  function handleLoginError(message: string) {
    toast({
      title: "Sign-in Failed",
      description: message,
      variant: "destructive",
    })
  }

  return (
    <div className="min-h-dvh bg-background flex">
      {/* Left Panel: Premium Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-900 to-blue-950" />

        {/* Decorative pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="absolute top-1/3 right-0 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-3xl" />
          <div className="absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-yellow-400/5 blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 shadow-lg shadow-yellow-400/25">
                <GraduationCap className="h-8 w-8 text-blue-900" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AAU Student Council</h1>
                <p className="text-sm text-blue-200/70">School of Commerce</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-yellow-400/20 px-4 py-2">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">Student Governance Platform</span>
            </div>
            
            <h2 className="text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight">
              Your Voice.<br />
              Your Council.<br />
              <span className="text-yellow-400">Your Future.</span>
            </h2>
            <p className="text-lg text-blue-100/80 max-w-md leading-relaxed">
              Join the student governance platform that connects you with campus
              leadership, events, and resources.
            </p>

            {/* Feature highlights */}
            <div className="space-y-4 pt-4">
              {[
                { icon: CheckCircle2, text: "Access council announcements & events" },
                { icon: Shield, text: "Submit proposals and feedback securely" },
                { icon: Users, text: "Connect with student representatives" },
              ].map((feature) => (
                <div key={feature.text} className="flex items-center gap-4 group">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 group-hover:bg-yellow-400/20 transition-colors">
                    <feature.icon className="h-5 w-5 text-yellow-400" />
                  </div>
                  <span className="text-sm text-blue-100/80 font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-blue-200/50">
            <Mail className="h-4 w-4" />
            <span>support@aau.edu.et</span>
          </div>
        </div>
      </div>

      {/* Right Panel: Auth Forms */}
      <div className="flex w-full flex-col items-center justify-center px-4 py-8 lg:w-1/2 bg-gradient-to-b from-background to-muted/30">
        {/* Mobile branding */}
        <div className="mb-8 flex items-center gap-4 lg:hidden">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-900 shadow-lg">
            <GraduationCap className="h-7 w-7 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-blue-900">AAU Student Council</h1>
            <p className="text-xs text-muted-foreground">School of Commerce</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="mb-8 w-full max-w-md">
          <div className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-muted p-1.5 shadow-inner">
            <button
              type="button"
              className={`inline-flex flex-1 items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "login"
                  ? "bg-blue-900 text-white shadow-lg shadow-blue-900/25"
                  : "text-muted-foreground hover:text-blue-900"
              }`}
              onClick={() => setActiveTab("login")}
              id="tab-login"
            >
              Sign In
            </button>
            <button
              type="button"
              className={`inline-flex flex-1 items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "signup"
                  ? "bg-blue-900 text-white shadow-lg shadow-blue-900/25"
                  : "text-muted-foreground hover:text-blue-900"
              }`}
              onClick={() => setActiveTab("signup")}
              id="tab-signup"
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Forms */}
        {activeTab === "signup" ? (
          <SignupForm
            onSuccess={handleSignupSuccess}
            onSwitchToLogin={() => setActiveTab("login")}
          />
        ) : (
          <LoginForm
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            onSwitchToSignup={() => setActiveTab("signup")}
          />
        )}

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-muted-foreground max-w-md leading-relaxed">
          By creating an account, you agree to the AAU Student Council{" "}
          <span className="text-blue-900 hover:underline cursor-pointer font-medium">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-blue-900 hover:underline cursor-pointer font-medium">
            Privacy Policy
          </span>
          .
        </p>
      </div>

      {/* Toast notifications */}
      <Toaster toasts={toasts} dismiss={dismiss} />
    </div>
  )
}
