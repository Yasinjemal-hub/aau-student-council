import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GraduationCap, Loader2, Eye, EyeOff, Mail } from "lucide-react"
import { useState } from "react"
import api from "@/api/axios"

/* ── Zod Schema ──────────────────────────────────────────── */
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .refine((email) => email.endsWith("@aau.edu.et"), {
      message: "Email must end with @aau.edu.et",
    }),
  password: z.string().min(1, "Password is required"),
})

type LoginFormValues = z.infer<typeof loginSchema>

/* ── Component ───────────────────────────────────────────── */
interface LoginFormProps {
  onSuccess: (data: { email: string }) => void
  onError: (message: string) => void
  onSwitchToSignup: () => void
}

export function LoginForm({ onSuccess, onError, onSwitchToSignup }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: LoginFormValues) {
    setIsSubmitting(true)

    try {
      const response = await api.post('/auth/login', {
        email: data.email,
        password: data.password,
      })

      const { token } = response.data

      // Save JWT token to localStorage
      localStorage.setItem('supabase_token', token)

      setIsSubmitting(false)

      // Call success callback with email
      onSuccess({ email: data.email })
    } catch (error: any) {
      setIsSubmitting(false)
      const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please try again.'
      onError(errorMessage)
    }
  }

  return (
    <Card className="w-full max-w-md border-border/60 shadow-xl">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-primary shadow-lg">
          <GraduationCap className="h-7 w-7 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">
          Welcome Back
        </CardTitle>
        <CardDescription>
          Sign in to your AAU Student Council account
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="login-email">University Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="login-email"
                type="email"
                placeholder="name@aau.edu.et"
                className="pl-10"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-destructive" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="login-password">Password</Label>
              <button
                type="button"
                className="text-xs text-primary hover:underline cursor-pointer"
                id="forgot-password-link"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pr-10"
                aria-invalid={!!errors.password}
                {...register("password")}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 pt-2">
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            id="login-submit-button"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing In…
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="font-medium text-primary hover:underline cursor-pointer"
              onClick={onSwitchToSignup}
              id="switch-to-signup"
            >
              Create one
            </button>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
