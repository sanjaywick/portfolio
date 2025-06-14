"use client"

import { useState, useEffect } from "react"
import type { Project, ApiResponse } from "@/lib/types"

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/projects")
      const result: ApiResponse<Project[]> = await response.json()

      if (result.success && result.data) {
        setProjects(result.data)
        setError(null)
      } else {
        setError(result.error || "Failed to fetch projects")
      }
    } catch (err) {
      setError("Failed to fetch projects")
      console.error("Error fetching projects:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const addProject = async (projectData: Omit<Project, "_id" | "createdAt" | "updatedAt">) => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      })

      const result: ApiResponse<Project> = await response.json()

      if (result.success && result.data) {
        setProjects((prev) => [result.data!, ...prev])
        return result.data
      } else {
        throw new Error(result.error || "Failed to add project")
      }
    } catch (err) {
      console.error("Error adding project:", err)
      throw err
    }
  }

  const updateProject = async (id: string, projectData: Partial<Project>) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      })

      const result: ApiResponse<Project> = await response.json()

      if (result.success && result.data) {
        setProjects((prev) => prev.map((p) => (p._id === id ? { ...p, ...result.data } : p)))
        return result.data
      } else {
        throw new Error(result.error || "Failed to update project")
      }
    } catch (err) {
      console.error("Error updating project:", err)
      throw err
    }
  }

  const deleteProject = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      })

      const result: ApiResponse<any> = await response.json()

      if (result.success) {
        setProjects((prev) => prev.filter((p) => p._id !== id))
      } else {
        throw new Error(result.error || "Failed to delete project")
      }
    } catch (err) {
      console.error("Error deleting project:", err)
      throw err
    }
  }

  return {
    projects,
    loading,
    error,
    addProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects,
  }
}
