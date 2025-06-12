"use client"

import { useState, useEffect } from "react"
import type { Experience, ApiResponse } from "@/types/portfolio"

export function useExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchExperiences = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/experiences")
      const result: ApiResponse<Experience[]> = await response.json()

      if (result.success && result.data) {
        setExperiences(result.data)
        setError(null)
      } else {
        setError(result.error || "Failed to fetch experiences")
      }
    } catch (err) {
      setError("Failed to fetch experiences")
      console.error("Error fetching experiences:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExperiences()
  }, [])

  const addExperience = async (experienceData: Omit<Experience, "_id" | "createdAt" | "updatedAt">) => {
    try {
      const response = await fetch("/api/experiences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(experienceData),
      })

      const result: ApiResponse<Experience> = await response.json()

      if (result.success && result.data) {
        setExperiences((prev) => [result.data!, ...prev])
        return result.data
      } else {
        throw new Error(result.error || "Failed to add experience")
      }
    } catch (err) {
      console.error("Error adding experience:", err)
      throw err
    }
  }

  const updateExperience = async (id: string, experienceData: Partial<Experience>) => {
    try {
      const response = await fetch(`/api/experiences/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(experienceData),
      })

      const result: ApiResponse<Experience> = await response.json()

      if (result.success && result.data) {
        setExperiences((prev) => prev.map((e) => (e._id === id ? { ...e, ...result.data } : e)))
        return result.data
      } else {
        throw new Error(result.error || "Failed to update experience")
      }
    } catch (err) {
      console.error("Error updating experience:", err)
      throw err
    }
  }

  const deleteExperience = async (id: string) => {
    try {
      const response = await fetch(`/api/experiences/${id}`, {
        method: "DELETE",
      })

      const result: ApiResponse<any> = await response.json()

      if (result.success) {
        setExperiences((prev) => prev.filter((e) => e._id !== id))
      } else {
        throw new Error(result.error || "Failed to delete experience")
      }
    } catch (err) {
      console.error("Error deleting experience:", err)
      throw err
    }
  }

  return {
    experiences,
    loading,
    error,
    addExperience,
    updateExperience,
    deleteExperience,
    refetch: fetchExperiences,
  }
}
