import { useState } from "react"
import { SignupForm } from "@/components/auth/SignupForm"
import { LoginForm } from "@/components/auth/LoginForm"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { GraduationCap, Mail, CheckCircle2 } from "lucide-react"

type AuthTab = "login" | "signup"

interface AuthPageProps {
  onAuthSuccess: (user: { email: string }) => void
}

export function AuthPage({ onAuthSuccess }: AuthPageProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>("signup")
  const { toasts, toast, dismiss } = useToast()

  function handleSignupSuccess(data: { studentId: string; email: string }) {
    toast({
      title: "✉️ Verification Email Sent!",
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
      {/* ── Left Panel: Branding ──────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 aau-gradient" />

        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-white/5" />
          <div className="absolute top-1/3 right-0 h-96 w-96 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 left-1/4 h-64 w-64 rounded-full bg-white/5" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                <GraduationCap className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AAU Student Council</h1>
                <p className="text-sm text-white/70">School of Commerce</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight">
              Your Voice.<br />
              Your Council.<br />
              Your Future.
            </h2>
            <p className="text-lg text-white/80 max-w-md">
              Join the student governance platform that connects you with campus
              leadership, events, and resources.
            </p>

            {/* Feature highlights */}
            <div className="space-y-3 pt-4">
              {[
                "Access council announcements & events",
                "Submit proposals and feedback",
                "Connect with student representatives",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-white/60" />
                  <span className="text-sm text-white/80">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm text-white/50">
            <Mail className="h-4 w-4" />
            <span>support@aau.edu.et</span>
          </div>
        </div>
      </div>

      {/* ── Right Panel: Auth Forms ───────────────────────── */}
      <div className="flex w-full flex-col items-center justify-center px-4 py-8 lg:w-1/2">
        {/* Mobile branding */}
        <div className="mb-8 flex items-center gap-3 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold">AAU Student Council</h1>
            <p className="text-xs text-muted-foreground">School of Commerce</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="mb-6 inline-flex h-10 w-full max-w-md items-center justify-center rounded-lg bg-muted p-1">
          <button
            type="button"
            className={`inline-flex flex-1 items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-all cursor-pointer ${
              activeTab === "login"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("login")}
            id="tab-login"
          >
            Sign In
          </button>
          <button
            type="button"
            className={`inline-flex flex-1 items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-all cursor-pointer ${
              activeTab === "signup"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("signup")}
            id="tab-signup"
          >
            Create Account
          </button>
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
        <p className="mt-8 text-center text-xs text-muted-foreground max-w-md">
          By creating an account, you agree to the AAU Student Council{" "}
          <span className="text-primary hover:underline cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-primary hover:underline cursor-pointer">
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
