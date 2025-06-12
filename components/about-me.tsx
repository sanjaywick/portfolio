"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useExperiences } from "@/hooks/useExperiences"
import { Calendar, MapPin, Award, Users, Briefcase, Building2, TrendingUp } from "lucide-react"

// Leadership Roles - roles and responsibilities (static data)
const leadershipData = [
  {
    id: 1,
    organization: "Coimbatore Institute of Technology",
    role: "Internship Coordinator",
    period: "Jun 2025 - present",
    location: "Coimbatore",
    type: "Leadership Role",
    logo: "/placeholder.svg?height=48&width=48",
    tools: ["Event Management", "Industry Relations", "Market Research"],
    achievements: [
      "Organized events with 300+ attendees",
      "Analyzed trends across 15+ industries",
      "Connected students with employers",
    ],
  },
  {
    id: 2,
    organization: "403 Strategists",
    role: "Student Advisor",
    period: "Jun 2024 - Apr 2025",
    location: "Remote",
    type: "Advisory Role",
    logo: "/placeholder.svg?height=48&width=48",
    tools: ["Leadership Development", "Event Planning", "Strategic Recruitment"],
    achievements: ["Mentored 25+ students", "Achieved 95% event success rate", "Increased membership by 40%"],
  },
  {
    id: 3,
    organization: "Datalytics Club",
    role: "Head of Internal Affairs",
    period: "Jun 2022 - Mar 2023",
    location: "Coimbatore",
    type: "Leadership Role",
    logo: "/placeholder.svg?height=48&width=48",
    tools: ["Team Management", "Process Improvement", "Event Execution"],
    achievements: ["Conducted 48+ weekly meetings", "Increased efficiency by 30%", "Executed 12+ events successfully"],
  },
]

const skillsData = {
  "Programming Languages": [
    { name: "Python", proficiency: 85 },
    { name: "Java", proficiency: 70 },
    { name: "JavaScript", proficiency: 70 },
    { name: "SQL", proficiency: 90 },
    { name: "R", proficiency: 70 },
  ],
  "Web Development": [
    { name: "Next.js", proficiency: 80 },
    { name: "React", proficiency: 80 },
    { name: "HTML/CSS", proficiency: 95 },
    { name: "TypeScript", proficiency: 75 },
    { name: "Flask", proficiency: 75 },
  ],
  "Tools & Technologies": [
    { name: "MySQL", proficiency: 85 },
    { name: "Oracle", proficiency: 75 },
    { name: "VS Code", proficiency: 85 },
    { name: "Power BI", proficiency: 80 },
    { name: "Git", proficiency: 85 },
  ],
}

const educationData = [
  {
    degree: "M.Sc Decision and Computing Sciences",
    institution: "Coimbatore Institute of Technology",
    period: "Nov 2021 - May 2026",
    grade: "CGPA: 8.4 (Till Sem 7)",
    status: "Current",
  },
  {
    degree: "Higher Secondary Certificate",
    institution: "Vikas Vidyalaya, Tiruppur",
    period: "2020 - 2021",
    grade: "84%",
    status: "Completed",
  },
]

export default function AboutMe() {
  return (
    <section className="py-12">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-500">About Me</span>
            <span className="ml-2">👨‍💻</span>
          </motion.h2>

          {/* Profile Section */}
          <motion.div
            className="flex flex-col md:flex-row-reverse items-center gap-8 mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="md:w-1/3">
              <motion.div
                className="relative w-64 h-64 mx-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/placeholder.svg?height=256&width=256"
                  alt="Sanjay V V"
                  fill
                  className="rounded-lg object-cover shadow-lg border-2 border-sky-500/20"
                />
              </motion.div>
            </div>
            <div className="md:w-2/3">
              <div className="prose prose-invert max-w-none text-center md:text-left">
                {/* Mobile description */}
                <motion.p
                  className="text-lg leading-relaxed md:hidden"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Aspiring Full-Stack Developer 💻 with expertise in modern web technologies. Passionate about creating
                  innovative digital solutions and learning cutting-edge technologies. 🚀✨
                </motion.p>
                {/* Desktop description */}
                <div className="hidden md:block">
                  <motion.p
                    className="text-xl mb-4"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    🚀 <strong>Hey, I'm Sanjay V V!</strong>
                  </motion.p>
                  <motion.p
                    className="mb-4"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    An <strong>aspiring Full-Stack Developer 💻</strong> and{" "}
                    Decision Sciences student 🎯with a passion for creating innovative digital
                    solutions. I specialize in <strong>modern web technologies</strong> like{" "}
                    <strong>Next.js, React, and TypeScript</strong>, bringing ideas to life through code.
                  </motion.p>
                  <motion.p
                    className="mb-4"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    My journey spans from <strong>heading Internal Affaris division</strong> to <strong>becoming Internship Coordinator </strong>{" "}
                    . I love turning complex problems into elegant,
                    user-friendly solutions. When I'm not coding, you'll find me exploring new technologies, mentoring
                    fellow students, or working on exciting projects that push the boundaries of what's possible.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    Let's <strong>connect and build something amazing together!</strong> The future is digital, and I'm
                    here to shape it. ⚡🔥
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-500">Education</span>
              <span className="ml-2 text-white">🎓</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {educationData.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="p-6 bg-gray-900/50 rounded-xl backdrop-blur-sm border border-gray-800 hover:border-sky-500/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-1">{edu.degree}</h4>
                      <p className="text-sky-400 mb-2">{edu.institution}</p>
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>{edu.period}</span>
                      </div>
                      <p className="text-cyan-400 font-semibold">{edu.grade}</p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs mt-2 ${
                          edu.status === "Current"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        }`}
                      >
                        {edu.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Professional Experience Section (from database) */}
          <ProfessionalExperienceInAbout />

          {/* Leadership Roles Section (static data) */}
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
              {leadershipData.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="p-6 bg-gray-900/50 rounded-xl backdrop-blur-sm border border-gray-800 hover:border-sky-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                      <Users className="w-6 h-6 text-sky-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{item.role}</h4>
                      <p className="text-sky-400">{item.organization}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                      <span>{item.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mt-3 mb-4">
                    <h5 className="text-xs font-semibold text-cyan-400 mb-2 uppercase tracking-wider">Achievements</h5>
                    <ul className="text-sm text-gray-300 space-y-1.5">
                      {item.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start gap-2">
                          <span className="text-sky-400 mt-0.5">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tools */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {item.tools.map((tool, toolIndex) => (
                      <span
                        key={toolIndex}
                        className="px-2 py-1 text-xs rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-500">
                Technical Arsenal
              </span>
              <span className="ml-2 text-white">⚔️</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
                <motion.div
                  key={category}
                  className="p-6 bg-gray-900/50 rounded-xl backdrop-blur-sm border border-gray-800 hover:border-sky-500/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <h4 className="text-xl font-bold mb-4 text-sky-400 text-center md:text-left">{category}</h4>
                  {skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <SkillBar name={skill.name} proficiency={skill.proficiency} />
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function SkillBar({ name, proficiency }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-gray-300">{name}</span>
        <span className="text-gray-400">{proficiency}%</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-full bg-gradient-to-r from-sky-500 to-cyan-500"
        />
      </div>
    </div>
  )
}

function ProfessionalExperienceInAbout() {
  const { experiences, loading: experiencesLoading, error: experiencesError } = useExperiences()

  // Only get professional experiences from database
  const experienceData = experiences.filter(
    (exp) =>
      exp.type === "internship" ||
      exp.type === "full-time" ||
      exp.type === "part-time" ||
      exp.type === "contract" ||
      exp.type === "freelance",
  )

  if (experiencesLoading) {
    return (
      <div className="flex justify-center items-center py-10 mb-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
      </div>
    )
  }

  if (experiencesError) {
    return (
      <div className="text-center py-10 mb-20">
        <p className="text-red-400">Error loading experiences: {experiencesError}</p>
      </div>
    )
  }

  if (experienceData.length === 0) {
    return null
  }

  return (
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

      {/* Experience Cards */}
      <div className="space-y-8">
        {experienceData.map((item, index) => (
          <motion.div
            key={item._id}
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
                  <h3 className="text-2xl font-bold text-white mb-1">{item.role}</h3>
                  <h4 className="text-xl text-sky-400 mb-2">{item.organization}</h4>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-300 mt-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      <span>{`${item.startDate}${item.endDate ? ` - ${item.endDate}` : " - Present"}`}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      <span className="capitalize">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-cyan-400" />
                      <span className="capitalize">{item.type}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border border-sky-500/20">
                <h5 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Key Achievements
                </h5>
                <ul className="text-sm text-gray-300 space-y-2">
                  {item.achievements.map((achievement, achIndex) => (
                    <li key={achIndex} className="flex items-start gap-2">
                      <span className="text-sky-400 mt-1">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools */}
              {item.tools && item.tools.length > 0 && (
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                  {item.tools.map((tool, toolIndex) => (
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
              {item.featured && (
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border border-yellow-500/30">
                    Featured
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
