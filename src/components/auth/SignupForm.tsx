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
import { GraduationCap, Loader2, Eye, EyeOff, Mail, IdCard } from "lucide-react"
import { useState } from "react"
import api from "@/api/axios"
import { useToast } from "@/hooks/use-toast"

/* ── Zod Schema ──────────────────────────────────────────── */
const signupSchema = z
  .object({
    studentId: z
      .string()
      .min(1, "Student ID is required")
      .regex(/^[A-Za-z]{2,4}\/\d{4,6}\/\d{2,4}$/, "Enter a valid AAU Student ID (e.g. GSR/1234/15)"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address")
      .refine((email) => email.endsWith("@aau.edu.et"), {
        message: "Email must end with @aau.edu.et",
      }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type SignupFormValues = z.infer<typeof signupSchema>

/* ── Component ───────────────────────────────────────────── */
interface SignupFormProps {
  onSuccess: (data: { studentId: string; email: string }) => void
  onSwitchToLogin: () => void
}

export function SignupForm({ onSuccess, onSwitchToLogin }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      studentId: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: SignupFormValues) {
    setIsSubmitting(true)

    try {
      await api.post('/auth/register', {
        studentId: data.studentId,
        email: data.email,
        password: data.password,
      })

      setIsSubmitting(false)
      onSuccess({ studentId: data.studentId, email: data.email })
    } catch (error: any) {
      setIsSubmitting(false)
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed. Please try again.'
      toast({
        title: 'Registration Error',
        description: errorMessage,
        variant: 'destructive',
      })
    }
  }

  return (
    <Card className="w-full max-w-md border-border/60 shadow-xl">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-primary shadow-lg">
          <GraduationCap className="h-7 w-7 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">
          Create Account
        </CardTitle>
        <CardDescription>
          Register with your AAU student credentials
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {/* Student ID */}
          <div className="space-y-2">
            <Label htmlFor="signup-student-id">Student ID</Label>
            <div className="relative">
              <IdCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="signup-student-id"
                placeholder="e.g. GSR/1234/15"
                className="pl-10"
                aria-invalid={!!errors.studentId}
                {...register("studentId")}
              />
            </div>
            {errors.studentId && (
              <p className="text-xs text-destructive" role="alert">
                {errors.studentId.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="signup-email">University Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="signup-email"
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
            <Label htmlFor="signup-password">Password</Label>
            <div className="relative">
              <Input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="Min 8 chars, 1 uppercase, 1 number"
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

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="signup-confirm-password">Confirm Password</Label>
            <div className="relative">
              <Input
                id="signup-confirm-password"
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter your password"
                className="pr-10"
                aria-invalid={!!errors.confirmPassword}
                {...register("confirmPassword")}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
                aria-label={
                  showConfirm ? "Hide password" : "Show password"
                }
                tabIndex={-1}
              >
                {showConfirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-destructive" role="alert">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 pt-2">
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            id="signup-submit-button"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating Account…
              </>
            ) : (
              "Create Account"
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              type="button"
              className="font-medium text-primary hover:underline cursor-pointer"
              onClick={onSwitchToLogin}
              id="switch-to-login"
            >
              Sign in
            </button>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
