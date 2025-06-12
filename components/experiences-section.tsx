"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Building2, TrendingUp, Briefcase, Users } from "lucide-react"
import { useExperiences } from "@/hooks/useExperiences"

export default function ExperiencesSection() {
  const { experiences, loading, error } = useExperiences()

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
        <p className="text-red-400">Error loading experiences: {error}</p>
      </div>
    )
  }

  // Separate professional experiences from leadership roles
  const professionalExperiences = experiences.filter(
    (exp) =>
      exp.type === "internship" ||
      exp.type === "full-time" ||
      exp.type === "part-time" ||
      exp.type === "contract" ||
      exp.type === "freelance",
  )

  const leadershipRoles = experiences.filter(
    (exp) =>
      exp.type === "leadership" ||
      exp.role.toLowerCase().includes("coordinator") ||
      exp.role.toLowerCase().includes("advisor") ||
      exp.role.toLowerCase().includes("head"),
  )

  return (
    <div className="space-y-20">
      {/* Professional Experience Section */}
      {professionalExperiences.length > 0 && (
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-2xl md:text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-500">
              Professional Experience
            </span>
            <span className="ml-2 text-white">💼</span>
          </motion.h3>

          <div className="space-y-8">
            {professionalExperiences.map((experience, index) => (
              <ProfessionalExperienceCard key={experience._id} experience={experience} index={index} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Leadership Roles Section */}
      {leadershipRoles.length > 0 && (
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-2xl md:text-3xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-500">
              Leadership Roles
            </span>
            <span className="ml-2 text-white">👥</span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadershipRoles.map((experience, index) => (
              <LeadershipRoleCard key={experience._id} experience={experience} index={index} />
            ))}
          </div>
        </motion.div>
      )}

      {experiences.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No experiences found. Add some experiences to see them here!</p>
        </div>
      )}
    </div>
  )
}

function ProfessionalExperienceCard({ experience, index }: { experience: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative"
    >
      <motion.div
        className="p-6 bg-gradient-to-r from-sky-900/40 to-cyan-900/40 rounded-xl backdrop-blur-sm border-2 border-sky-500/30 hover:border-sky-400 transition-all duration-300 shadow-lg shadow-sky-500/10"
        whileHover={{ scale: 1.02, y: -5 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 p-1 flex items-center justify-center overflow-hidden mb-4 md:mb-0">
            <div className="bg-gray-900 rounded-full w-full h-full flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-sky-400" />
            </div>
          </div>
          <div className="text-center md:text-left flex-1">
            <h3 className="text-2xl font-bold text-white mb-1">{experience.role}</h3>
            <h4 className="text-xl text-sky-400 mb-2">{experience.organization}</h4>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-300 mt-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>
                  {experience.startDate} {experience.endDate ? `- ${experience.endDate}` : "- Present"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span className="capitalize">{experience.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span className="capitalize">{experience.type}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        {experience.achievements && experience.achievements.length > 0 && (
          <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border border-sky-500/20">
            <h5 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Key Achievements
            </h5>
            <ul className="text-sm text-gray-300 space-y-2">
              {experience.achievements.map((achievement: string, achIndex: number) => (
                <li key={achIndex} className="flex items-start gap-2">
                  <span className="text-sky-400 mt-1">•</span>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tools */}
        {experience.tools && experience.tools.length > 0 && (
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
            {experience.tools.map((tool: string, toolIndex: number) => (
              <span
                key={toolIndex}
                className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-sky-500/10 to-cyan-500/10 text-sky-300 border border-sky-500/20"
              >
                {tool}
              </span>
            ))}
          </div>
        )}

        {/* Featured badge */}
        {experience.featured && (
          <div className="absolute top-4 right-4">
            <span className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border border-yellow-500/30">
              Featured
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

function LeadershipRoleCard({ experience, index }: { experience: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="p-6 bg-gray-900/50 rounded-xl backdrop-blur-sm border border-gray-800 hover:border-sky-500/50 transition-all duration-300 relative"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
          <Users className="w-6 h-6 text-sky-400" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-white">{experience.role}</h4>
          <p className="text-sky-400">{experience.organization}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-400">
        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-cyan-500" />
          <span>
            {experience.startDate} {experience.endDate ? `- ${experience.endDate}` : "- Present"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-cyan-500" />
          <span className="capitalize">{experience.location}</span>
        </div>
      </div>

      {/* Achievements */}
      {experience.achievements && experience.achievements.length > 0 && (
        <div className="mt-3 mb-4">
          <h5 className="text-xs font-semibold text-cyan-400 mb-2 uppercase tracking-wider">Achievements</h5>
          <ul className="text-sm text-gray-300 space-y-1.5">
            {experience.achievements.map((achievement: string, achIndex: number) => (
              <li key={achIndex} className="flex items-start gap-2">
                <span className="text-sky-400 mt-0.5">•</span>
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tools */}
      {experience.tools && experience.tools.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto">
          {experience.tools.map((tool: string, toolIndex: number) => (
            <span
              key={toolIndex}
              className="px-2 py-1 text-xs rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20"
            >
              {tool}
            </span>
          ))}
        </div>
      )}

      {/* Featured badge */}
      {experience.featured && (
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border border-yellow-500/30">
            Featured
          </span>
        </div>
      )}
    </motion.div>
  )
}
