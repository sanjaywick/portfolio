export interface Project {
  _id?: string
  name: string
  year: string
  description: string
  tools: string[]
  githubLink?: string
  featured?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface Experience {
  _id?: string
  role: string
  organization: string
  startDate: string
  endDate?: string // Optional for ongoing positions
  location: "onsite" | "remote" | "hybrid"
  type: "internship" | "full-time" | "part-time" | "contract" | "freelance" | "leadership"
  achievements: string[]
  tools: string[]
  featured?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
