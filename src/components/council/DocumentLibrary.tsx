import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Select, SelectOption } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText, 
  Download, 
  Filter, 
  Calendar,
  FileBox,
  MoreVertical,
  PlusCircle,
  Shield,
} from "lucide-react"
import api from "@/api/axios"
import { useToast } from "@/hooks/use-toast"

interface Document {
  id: string
  name: string
  category: "Minutes" | "Reports" | "Budgets" | "Policy"
  uploadDate: string
  size: string
  author: string
}

const INITIAL_DOCUMENTS: Document[] = [
  {
    id: "doc-1",
    name: "General Council Meeting Minutes - April 2026.pdf",
    category: "Minutes",
    uploadDate: "2026-04-15",
    size: "1.2 MB",
    author: "Elda (Sec. Gen)"
  },
  {
    id: "doc-2",
    name: "Q1 Financial Audit Report.pdf",
    category: "Budgets",
    uploadDate: "2026-04-10",
    size: "3.5 MB",
    author: "Kidus Elias"
  },
  {
    id: "doc-3",
    name: "Campus Safety Initiative Proposal.docx",
    category: "Reports",
    uploadDate: "2026-04-05",
    size: "850 KB",
    author: "Fikremaryam A."
  },
  {
    id: "doc-4",
    name: "Annual Commerce Summit Budget Plan.xlsx",
    category: "Budgets",
    uploadDate: "2026-03-28",
    size: "2.1 MB",
    author: "Rahma Nigusse"
  },
  {
    id: "doc-5",
    name: "Student Constitutional Amendments Draft.pdf",
    category: "Policy",
    uploadDate: "2026-03-20",
    size: "4.2 MB",
    author: "Kidus Elias"
  }
]

export function DocumentLibrary() {
  const [documents] = React.useState<Document[]>(INITIAL_DOCUMENTS)
  const [filter, setFilter] = React.useState<string>("all")
  const [isUploading, setIsUploading] = React.useState(false)
  const [uploadProgress, setUploadProgress] = React.useState(0)
  const { toast } = useToast()

  const filteredDocs = filter === "all" 
    ? documents 
    : documents.filter(doc => doc.category === filter)

  const handleUpload = async (file: File) => {
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)

      await api.post('/council/resources', formData, {
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

      toast({
        title: "Upload Successful",
        description: `Document "${file.name}" uploaded successfully.`,
        variant: "success",
      })
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: "Upload Failed",
        description: "Failed to upload document. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  return (
    <Card className="w-full border-border/60 shadow-xl overflow-hidden bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b border-border/40 bg-muted/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <FileBox className="h-6 w-6 text-primary" />
              Council Resource Library
            </CardTitle>
            <CardDescription>
              Secure management of meeting minutes, budgets, and internal council reports.
            </CardDescription>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-background border border-border rounded-lg px-3 py-1 shadow-sm h-9">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="border-none shadow-none focus-visible:ring-0 h-full text-xs p-0 min-w-[120px]"
              >
                <SelectOption value="all">All Categories</SelectOption>
                <SelectOption value="Minutes">Meeting Minutes</SelectOption>
                <SelectOption value="Reports">Official Reports</SelectOption>
                <SelectOption value="Budgets">Budget Plans</SelectOption>
                <SelectOption value="Policy">Policy Documents</SelectOption>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
               <Input 
                 type="file" 
                 className="hidden" 
                 id="council-file-upload" 
                 onChange={(e) => {
                   const file = e.target.files?.[0]
                   if (file) handleUpload(file)
                 }}
               />
               <Button 
                 asChild 
                 variant="default" 
                 className="shadow-lg shadow-primary/20"
                 disabled={isUploading}
               >
                 <label htmlFor="council-file-upload" className="cursor-pointer flex items-center gap-2">
                   {isUploading ? (
                     <>
                       <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                       <span className="text-xs">{uploadProgress}%</span>
                     </>
                   ) : (
                     <PlusCircle className="h-4 w-4" />
                   )}
                   Upload Document
                 </label>
               </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-[40%]">Document Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Author</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocs.length > 0 ? (
              filteredDocs.map((doc) => (
                <TableRow key={doc.id} className="group transition-colors hover:bg-primary/[0.02]">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold truncate max-w-[200px] sm:max-w-xs">{doc.name}</span>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{doc.size}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-background/50 font-medium">
                      {doc.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <div className="flex items-center gap-2 text-xs">
                      <Calendar className="h-3 w-3" />
                      {doc.uploadDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold">
                        {doc.author.charAt(0)}
                      </div>
                      <span className="text-xs font-medium">{doc.author}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-48 text-center text-muted-foreground italic">
                  <div className="flex flex-col items-center justify-center gap-3 opacity-60">
                    <FileBox className="h-12 w-12" />
                    <p>No documents found in this category.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      
      <div className="p-4 border-t border-border/40 bg-muted/10 text-[10px] text-muted-foreground flex justify-between items-center">
        <p>© 2026 Student Council Internal Resource System</p>
        <p className="flex items-center gap-1">
          <Shield className="h-3 w-3" /> Authorized Personnel Only
        </p>
      </div>
    </Card>
  )
}
