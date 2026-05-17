import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectOption } from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  ShieldAlert,
  Upload,
  X,
  FileIcon,
  Loader2,
  CheckCircle2,
  Copy,
  ClipboardCheck,
  AlertTriangle,
} from "lucide-react"

/* ── Constants ───────────────────────────────────────────── */
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const CATEGORIES = [
  "Cafeteria",
  "Library",
  "Curriculum",
  "Campus Safety",
  "Student Services",
] as const


/* ── Zod Schema ──────────────────────────────────────────── */
const suggestionSchema = z.object({
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(120, "Subject must be under 120 characters"),
  category: z.enum(CATEGORIES),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description must be under 2,000 characters"),
})

type SuggestionFormValues = z.infer<typeof suggestionSchema>

/* ── Helper: generate tracking ID ────────────────────────── */
function generateTrackingId() {
  const year = new Date().getFullYear()
  const num = String(Math.floor(Math.random() * 99999) + 1).padStart(5, "0")
  return `FB-${year}-${num}`
}

/* ── Helper: format file size ────────────────────────────── */
function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/* ── Component ───────────────────────────────────────────── */
interface SuggestionFormProps {
  onBack: () => void
}

export function SuggestionForm({ onBack }: SuggestionFormProps) {
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successDialog, setSuccessDialog] = useState<{
    open: boolean
    trackingId: string
  }>({ open: false, trackingId: "" })
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SuggestionFormValues>({
    resolver: zodResolver(suggestionSchema),
    defaultValues: {
      subject: "",
      category: undefined,
      description: "",
    },
  })

  const descriptionLength = watch("description")?.length || 0

  /* ── File handling ─────────────────────────────────────── */
  function handleFileAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const newFiles = Array.from(e.target.files || [])
    setFileError(null)

    for (const file of newFiles) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError(
          `"${file.name}" exceeds the 5 MB limit (${formatFileSize(file.size)}). Please choose a smaller file.`
        )
        return
      }
    }

    setFiles((prev) => [...prev, ...newFiles])

    // Reset input so same file can be re-selected
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  function handleFileRemove(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setFileError(null)
  }

  /* ── Submit ────────────────────────────────────────────── */
  async function onSubmit(data: SuggestionFormValues) {
    setIsSubmitting(true)

    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1800))

    // Mock: store submission
    const trackingId = generateTrackingId()
    const submission = {
      ...data,
      anonymous: isAnonymous,
      files: files.map((f) => f.name),
      trackingId,
      submittedAt: new Date().toISOString(),
    }

    const submissions = JSON.parse(
      localStorage.getItem("aau_suggestions") || "[]"
    )
    submissions.push(submission)
    localStorage.setItem("aau_suggestions", JSON.stringify(submissions))

    setIsSubmitting(false)
    setSuccessDialog({ open: true, trackingId })

    // Reset form
    reset()
    setFiles([])
    setIsAnonymous(false)
  }

  /* ── Copy tracking ID ──────────────────────────────────── */
  function handleCopyTrackingId() {
    navigator.clipboard.writeText(successDialog.trackingId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto border-border/60 shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl sm:text-2xl">
                Suggestion / Complaint Form
              </CardTitle>
              <CardDescription>
                Share your feedback to help improve campus life
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {/* ── Anonymous Toggle ────────────────────────── */}
            <div className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Label
                      htmlFor="anonymous-switch"
                      className="text-sm font-medium cursor-pointer"
                    >
                      Submit Anonymously
                    </Label>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Hide your identity from reviewers
                    </p>
                  </div>
                </div>
                <Switch
                  id="anonymous-switch"
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                  aria-label="Toggle anonymous submission"
                />
              </div>

              {/* Anonymous warning */}
              {isAnonymous && (
                <div className="mt-3 flex items-start gap-2.5 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 p-3">
                  <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
                  <p className="text-xs leading-relaxed text-amber-800 dark:text-amber-300">
                    Your identity will be hidden from all reviewers. The council
                    cannot contact you directly.
                  </p>
                </div>
              )}
            </div>

            {/* ── Subject ────────────────────────────────── */}
            <div className="space-y-2">
              <Label htmlFor="suggestion-subject">
                Subject <span className="text-destructive">*</span>
              </Label>
              <Input
                id="suggestion-subject"
                placeholder="Brief title for your feedback"
                aria-invalid={!!errors.subject}
                {...register("subject")}
              />
              {errors.subject && (
                <p className="text-xs text-destructive" role="alert">
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* ── Category ───────────────────────────────── */}
            <div className="space-y-2">
              <Label htmlFor="suggestion-category">
                Category <span className="text-destructive">*</span>
              </Label>
              <Select
                id="suggestion-category"
                aria-invalid={!!errors.category}
                defaultValue=""
                {...register("category")}
              >
                <SelectOption value="" disabled>
                  Select a category
                </SelectOption>
                {CATEGORIES.map((cat) => (
                  <SelectOption key={cat} value={cat}>
                    {cat}
                  </SelectOption>
                ))}
              </Select>
              {errors.category && (
                <p className="text-xs text-destructive" role="alert">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* ── Description ────────────────────────────── */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="suggestion-description">
                  Description <span className="text-destructive">*</span>
                </Label>
                <span
                  className={`text-xs ${
                    descriptionLength > 1800
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }`}
                >
                  {descriptionLength} / 2,000
                </span>
              </div>
              <Textarea
                id="suggestion-description"
                placeholder="Provide a detailed description of your suggestion or complaint. Include specific examples, dates, and locations if applicable."
                className="min-h-[140px]"
                aria-invalid={!!errors.description}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-xs text-destructive" role="alert">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* ── File Attachments ───────────────────────── */}
            <div className="space-y-2">
              <Label>File Attachments</Label>
              <p className="text-xs text-muted-foreground">
                Optional — attach images or documents (max 5 MB per file)
              </p>

              {/* Upload area */}
              <div
                className="relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-input p-6 transition-colors hover:border-primary/50 hover:bg-muted/30 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                aria-label="Upload file"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    fileInputRef.current?.click()
                  }
                }}
              >
                <Upload className="h-8 w-8 text-muted-foreground/60" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-primary">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-muted-foreground/70">
                  PNG, JPG, PDF, DOCX up to 5 MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                  multiple
                  onChange={handleFileAdd}
                  id="suggestion-file-input"
                />
              </div>

              {/* File error */}
              {fileError && (
                <div className="flex items-start gap-2 rounded-md bg-destructive/10 border border-destructive/20 p-2.5">
                  <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-destructive" />
                  <p className="text-xs text-destructive">{fileError}</p>
                </div>
              )}

              {/* Attached files */}
              {files.length > 0 && (
                <div className="space-y-2 mt-2">
                  {files.map((file, i) => (
                    <div
                      key={`${file.name}-${i}`}
                      className="flex items-center justify-between gap-3 rounded-md border border-border bg-muted/30 px-3 py-2"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <FileIcon className="h-4 w-4 shrink-0 text-primary" />
                        <div className="min-w-0">
                          <p className="text-sm truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleFileRemove(i)}
                        className="shrink-0 rounded-md p-1 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                        aria-label={`Remove ${file.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Submit ─────────────────────────────────── */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={onBack}
                id="suggestion-cancel"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                id="suggestion-submit"
                className="sm:min-w-[180px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>

      {/* ── Success Dialog ───────────────────────────────── */}
      <Dialog
        open={successDialog.open}
        onOpenChange={(open) =>
          setSuccessDialog((prev) => ({ ...prev, open }))
        }
      >
        <DialogContent
          onClose={() =>
            setSuccessDialog((prev) => ({ ...prev, open: false }))
          }
        >
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <DialogTitle className="text-center text-xl">
              Feedback Submitted Successfully!
            </DialogTitle>
            <DialogDescription className="text-center">
              {isAnonymous
                ? "Your anonymous feedback has been recorded."
                : "Your feedback has been recorded and will be reviewed by the council."}
            </DialogDescription>
          </DialogHeader>

          <div className="my-4 rounded-lg border border-border bg-muted/50 p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">
              Your Tracking ID
            </p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-2xl font-bold font-mono tracking-wider text-primary">
                {successDialog.trackingId}
              </p>
              <button
                type="button"
                onClick={handleCopyTrackingId}
                className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                aria-label="Copy tracking ID"
                id="copy-tracking-id"
              >
                {copied ? (
                  <ClipboardCheck className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Save this ID to track the status of your submission
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setSuccessDialog({ open: false, trackingId: "" })
                onBack()
              }}
              id="dialog-go-back"
            >
              Back to Dashboard
            </Button>
            <Button
              onClick={() =>
                setSuccessDialog({ open: false, trackingId: "" })
              }
              id="dialog-submit-another"
            >
              Submit Another
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
