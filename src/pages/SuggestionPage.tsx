"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { SuggestionForm } from "@/components/forms/SuggestionForm"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageSquarePlus,
  Search,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  ChevronRight,
  ArrowLeft,
} from "lucide-react"

interface SuggestionPageProps {
  onBack: () => void
}

const getStatusIcon = (status: string) => {
  const icons: Record<string, any> = {
    pending: Clock,
    "in-progress": AlertTriangle,
    resolved: CheckCircle2,
    rejected: XCircle,
  }
  return icons[status] || Clock
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    "in-progress": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    resolved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  }
  return colors[status] || "bg-gray-100 text-gray-700"
}

// Mock data for tracking
const mockSubmissions = [
  {
    id: "FB-2026-00123",
    subject: "Library AC Temperature Issues",
    category: "Library",
    status: "in-progress",
    date: "May 15, 2026",
    description: "The air conditioning in the main library reading room has been malfunctioning...",
  },
  {
    id: "FB-2026-00098",
    subject: "Cafeteria Menu Variety",
    category: "Cafeteria",
    status: "resolved",
    date: "May 10, 2026",
    description: "Request for more vegetarian options in the cafeteria...",
  },
  {
    id: "FB-2026-00076",
    subject: "Parking Lot Security Cameras",
    category: "Campus Safety",
    status: "pending",
    date: "May 5, 2026",
    description: "The security cameras in parking lot B appear to be non-functional...",
  },
]

export function SuggestionPage({ onBack }: SuggestionPageProps) {
  const [activeTab, setActiveTab] = useState("submit")
  const [trackingId, setTrackingId] = useState("")
  const [searchResult, setSearchResult] = useState<typeof mockSubmissions[0] | null>(null)
  const [searchError, setSearchError] = useState("")

  const handleTrackSearch = () => {
    setSearchError("")
    const found = mockSubmissions.find((s) => s.id.toLowerCase() === trackingId.toLowerCase())
    if (found) {
      setSearchResult(found)
    } else {
      setSearchResult(null)
      setSearchError("No submission found with this tracking ID. Please check and try again.")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 px-4 py-2 mb-6">
              <MessageSquarePlus className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">
                Your Voice Matters
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
              Feedback & Complaint System
            </h1>
            <p className="text-lg text-blue-200/70 max-w-2xl mx-auto">
              Share your suggestions, report issues, and track the status of your submissions. We&apos;re committed to addressing your concerns.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2 h-14 p-1 bg-muted/50 border border-border rounded-xl mb-8">
              <TabsTrigger
                value="submit"
                className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm h-full text-base font-semibold"
              >
                <MessageSquarePlus className="h-4 w-4 mr-2" />
                Submit Feedback
              </TabsTrigger>
              <TabsTrigger
                value="track"
                className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm h-full text-base font-semibold"
              >
                <Search className="h-4 w-4 mr-2" />
                Track Status
              </TabsTrigger>
            </TabsList>

            {/* Submit Tab */}
            <TabsContent value="submit" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <SuggestionForm onBack={onBack} />
              </motion.div>
            </TabsContent>

            {/* Track Tab */}
            <TabsContent value="track" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Search Card */}
                <Card className="border-border/50 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl">Track Your Submission</CardTitle>
                    <CardDescription>
                      Enter your tracking ID to check the status of your feedback or complaint.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="text"
                          value={trackingId}
                          onChange={(e) => setTrackingId(e.target.value)}
                          placeholder="Enter tracking ID (e.g., FB-2026-00123)"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all font-mono"
                        />
                      </div>
                      <Button
                        onClick={handleTrackSearch}
                        className="bg-blue-900 hover:bg-blue-800 rounded-xl px-6"
                      >
                        Search
                      </Button>
                    </div>

                    {/* Search Error */}
                    {searchError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 flex items-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50"
                      >
                        <XCircle className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-700 dark:text-red-400">{searchError}</p>
                      </motion.div>
                    )}

                    {/* Search Result */}
                    {searchResult && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-6 rounded-xl bg-muted/50 border border-border"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-xs font-mono text-muted-foreground mb-1">{searchResult.id}</p>
                            <h3 className="text-lg font-bold text-foreground">{searchResult.subject}</h3>
                          </div>
                          {(() => {
                            const StatusIcon = getStatusIcon(searchResult.status)
                            return (
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(searchResult.status)}`}>
                                <StatusIcon className="h-3.5 w-3.5" />
                                {searchResult.status.charAt(0).toUpperCase() + searchResult.status.slice(1).replace("-", " ")}
                              </span>
                            )
                          })()}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Category</p>
                            <p className="text-sm font-medium text-foreground">{searchResult.category}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Submitted</p>
                            <p className="text-sm font-medium text-foreground">{searchResult.date}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Description</p>
                          <p className="text-sm text-muted-foreground">{searchResult.description}</p>
                        </div>

                        {/* Status Timeline */}
                        <div className="mt-6 pt-6 border-t border-border">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Status Timeline</p>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">Submitted</p>
                                <p className="text-xs text-muted-foreground">{searchResult.date}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                searchResult.status !== "pending" 
                                  ? "bg-emerald-100 dark:bg-emerald-900/30" 
                                  : "bg-muted"
                              }`}>
                                <FileText className={`h-4 w-4 ${
                                  searchResult.status !== "pending" 
                                    ? "text-emerald-600" 
                                    : "text-muted-foreground"
                                }`} />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">Under Review</p>
                                <p className="text-xs text-muted-foreground">
                                  {searchResult.status !== "pending" ? "Completed" : "Pending"}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                searchResult.status === "resolved" 
                                  ? "bg-emerald-100 dark:bg-emerald-900/30" 
                                  : "bg-muted"
                              }`}>
                                <CheckCircle2 className={`h-4 w-4 ${
                                  searchResult.status === "resolved" 
                                    ? "text-emerald-600" 
                                    : "text-muted-foreground"
                                }`} />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">Resolved</p>
                                <p className="text-xs text-muted-foreground">
                                  {searchResult.status === "resolved" ? "Action taken" : "In progress"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Submissions */}
                <Card className="border-border/50 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-lg">Your Recent Submissions</CardTitle>
                    <CardDescription>
                      Quick access to your latest feedback submissions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockSubmissions.map((submission) => {
                      const StatusIcon = getStatusIcon(submission.status)
                      return (
                        <button
                          key={submission.id}
                          onClick={() => {
                            setTrackingId(submission.id)
                            setSearchResult(submission)
                            setSearchError("")
                          }}
                          className="w-full flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-left"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${getStatusColor(submission.status)}`}>
                              <StatusIcon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{submission.subject}</p>
                              <p className="text-xs text-muted-foreground">
                                {submission.id} &middot; {submission.date}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </button>
                      )
                    })}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Back Button */}
      <div className="fixed bottom-8 left-8 z-50">
        <Button
          onClick={onBack}
          variant="outline"
          className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>
    </div>
  )
}
