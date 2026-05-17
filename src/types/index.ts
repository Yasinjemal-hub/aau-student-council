export type AppView = 
  | "landing" 
  | "auth" 
  | "dashboard" 
  | "admin-dashboard"
  | "announcements" 
  | "suggestions" 
  | "events" 
  | "leadership" 
  | "documents" 
  | "resources"
  | "contact"
  | "about"

export type SetViewFunction = (view: AppView) => void
