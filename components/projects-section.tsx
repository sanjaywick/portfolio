"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Github, Calendar, Code } from "lucide-react"

interface Project {
  _id: string
  name: string
  description: string
  year: number
  githubLink?: string
  tools: string[]
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects")
        const data = await response.json()
        setProjects(data)
      } catch (err: any) {
        setError(err.message || "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400">Error loading projects: {error}</p>
      </div>
    )
  }

  return (
    <section id="work" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-500">
              Featured Projects
            </span>
            <span className="ml-2 text-white">🏗️</span>
          </motion.h2>

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No projects found. Add some projects to see them here!</p>
            </div>
          ) : (
            <div className="relative overflow-hidden">
              <motion.div
                className="flex gap-8 w-max"
                animate={{ x: [0, -100] }}
                transition={{
                  x: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
              >
                {[...projects].map((project, index) => (
                  <div key={`${project._id}-${index}`} className="w-80 flex-shrink-0">
                    <ProjectCard project={project} index={index} />
                  </div>
                ))}
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03, y: -10 }}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 hover:border-sky-500/50 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative p-6 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors duration-300 mb-2">
              {project.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>{project.year}</span>
            </div>
          </div>
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 transition-all duration-300 text-sm font-medium"
              aria-label="View on GitHub"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          )}
        </div>

        <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-1">{project.description}</p>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium">
            <Code className="w-3.5 h-3.5" />
            <span>Technologies</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(project.tools) &&
              project.tools.map((tool, toolIndex) => (
                <span
                  key={toolIndex}
                  className="px-2.5 py-1 text-xs rounded-full bg-gradient-to-r from-sky-500/10 to-cyan-500/10 text-sky-300 border border-sky-500/20 hover:border-sky-400/40 transition-colors duration-300"
                >
                  {tool}
                </span>
              ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-sky-500/50 group-hover:to-cyan-500/50 transition-all duration-300 pointer-events-none" />
    </motion.div>
  )
}
