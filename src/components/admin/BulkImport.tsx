import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react"
import api from "@/api/axios"

interface BulkImportProps {
  className?: string
}

export function BulkImport({ className }: BulkImportProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [uploadProgress, setUploadProgress] = useState(0)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a CSV file.",
          variant: "destructive",
        })
        return
      }
      setFile(selectedFile)
      setUploadStatus("idle")
    }
  }

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a CSV file to upload.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadStatus("idle")
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)

      await api.post('/admin/users/bulk', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setUploadProgress(progress)
          }
        },
      })

      setUploadStatus("success")
      
      toast({
        title: "Upload Successful",
        description: `Successfully imported ${file.name}`,
        variant: "success",
      })

      // Reset file after successful upload
      setTimeout(() => {
        setFile(null)
        setUploadStatus("idle")
        setUploadProgress(0)
      }, 3000)
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus("error")
      
      toast({
        title: "Upload Failed",
        description: "Failed to upload CSV file. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setUploadStatus("idle")
  }

  return (
    <div className={className}>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload CSV File</CardTitle>
            <CardDescription>
              Upload student accounts from Registrar records in CSV format
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="csv-file">CSV File</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="csv-file"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="flex-1"
                />
              </div>
            </div>

            {file && (
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  disabled={isUploading}
                >
                  Clear
                </Button>
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="w-full"
            >
              {isUploading ? (
                <>
                  <Upload className="h-4 w-4 mr-2 animate-spin" />
                  Uploading... {uploadProgress}%
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload CSV
                </>
              )}
            </Button>

            {uploadStatus === "success" && (
              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg text-green-700 dark:text-green-300">
                <CheckCircle className="h-5 w-5" />
                <p className="text-sm font-medium">File uploaded successfully!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions Section */}
        <Card>
          <CardHeader>
            <CardTitle>CSV Format Requirements</CardTitle>
            <CardDescription>
              Follow these guidelines for successful import
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="text-sm font-medium">Required Columns</p>
                  <p className="text-xs text-muted-foreground">
                    email, full_name, department, student_id
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="text-sm font-medium">File Format</p>
                  <p className="text-xs text-muted-foreground">
                    UTF-8 encoded CSV with comma separators
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="text-sm font-medium">Header Row</p>
                  <p className="text-xs text-muted-foreground">
                    First row must contain column names
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="text-sm font-medium">Max File Size</p>
                  <p className="text-xs text-muted-foreground">
                    Maximum 5MB per file
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Example CSV Structure</p>
              </div>
              <pre className="text-xs text-muted-foreground overflow-x-auto">
{`email,full_name,department,student_id
student1@aau.edu.et,John Doe,Computer Science,AAU001
student2@aau.edu.et,Jane Smith,Business,AAU002`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
