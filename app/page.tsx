"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Linkedin, Database, Code, Braces, MessageSquare, Smartphone, Globe, Server } from "lucide-react"
import { Link as ScrollLink } from "react-scroll"
import CustomCursor from "@/components/custom-cursor"
import Navbar from "@/components/navbar"
import SocialIcon from "@/components/social-icon"
import { Button } from "@/components/ui/button"
import AboutMe from "@/components/about-me"
import Loading from "@/components/loading"
import InteractiveShapes from "@/components/InteractiveShapes"
import AnimatedBoxes from "@/components/AnimatedBoxes"
import AnimatedBackground from "@/components/animated-background"
import ProjectsSection from "@/components/projects-section"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  // Parallax effects
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const buttonsY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null
  if (loading) return <Loading />

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form submission prevented")
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <CustomCursor />
      <Navbar />

      {/* Hero Section with Enhanced Animations */}
      <section ref={heroRef} id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* New animated background */}
        <AnimatedBackground />

        {/* Floating shapes in background */}
        <div className="absolute inset-0 z-0">
          <InteractiveShapes />
        </div>

        {/* Animated boxes with parallax effect */}
        <div className="absolute inset-0 z-0">
          <AnimatedBoxes />
        </div>

        {/* Content with parallax effect */}
        <motion.div className="container relative z-10 px-4 mx-auto" style={{ opacity }}>
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-500 to-blue-500"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              style={{ y: titleY }}
            >
              Hey! I'm Sanjay V V
            </motion.h1>
            <motion.h2
              className="text-xl md:text-2xl mb-8 text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{ y: subtitleY }}
            >
              💻 Full-Stack Developer | 🎯 Decision Sciences Student | 🚀 Tech Innovator
            </motion.h2>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              style={{ y: buttonsY }}
            >
              <ScrollLink to="work" smooth={true} duration={500}>
                <Button className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white transform hover:scale-105 transition-all duration-300">
                  View Projects
                </Button>
              </ScrollLink>
              <ScrollLink to="contact" smooth={true} duration={500}>
                <Button
                  variant="outline"
                  className="bg-transparent border-2 border-sky-500 text-white hover:bg-sky-500 hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  Contact Me
                </Button>
              </ScrollLink>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black pointer-events-none"></div>

        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <div className="w-6 h-10 border-2 border-sky-400 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-1.5 bg-sky-400 rounded-full mt-2"
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container px-4 mx-auto">
          <AboutMe />
        </div>
      </section>

      {/* Services Section with Enhanced Animations */}
      <section id="services" className="py-20 bg-black">
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
                My Expertise
              </span>
              <span className="ml-2 text-white">🛠️</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Globe className="w-10 h-10 text-sky-500" />,
                  title: "Website Development",
                  description: "Modern, responsive websites using Next.js, React, and cutting-edge web technologies.",
                },
                {
                  icon: <Database className="w-10 h-10 text-cyan-500" />,
                  title: "Database Management",
                  description:
                    "Efficient database design and management with MySQL, Oracle, and modern database solutions.",
                },
                {
                  icon: <Code className="w-10 h-10 text-sky-500" />,
                  title: "Frontend Engineering",
                  description: "Interactive user interfaces with React, Next.js, and modern frontend frameworks.",
                },
                {
                  icon: <Server className="w-10 h-10 text-cyan-500" />,
                  title: "Backend Engineering",
                  description: "Robust backend systems using Python, Java, Flask, and scalable architectures.",
                },
                {
                  icon: <Braces className="w-10 h-10 text-sky-500" />,
                  title: "Algorithm Visualization",
                  description: "Interactive data structure and algorithm visualizations for enhanced learning.",
                },
                {
                  icon: <MessageSquare className="w-10 h-10 text-cyan-500" />,
                  title: "Digital Marketing",
                  description: "Strategic digital marketing campaigns with proven results in lead generation and SEO.",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 rounded-lg bg-gray-900 border border-gray-800 hover:border-sky-500 transition-all duration-300 text-center md:text-left cursor-pointer"
                >
                  <div className="mb-4 flex justify-center md:justify-start">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* Contact Section with Enhanced Form */}
      <section id="contact" className="py-20 bg-black">
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
                Let's Connect
              </span>
              <span className="ml-2 text-white">🚀</span>
            </motion.h2>
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-sky-500/50 transition-all duration-300">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white px-4 py-3 focus:border-sky-500 focus:ring-sky-500 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white px-4 py-3 focus:border-sky-500 focus:ring-sky-500 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white px-4 py-3 focus:border-sky-500 focus:ring-sky-500 transition-colors duration-300"
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300"
                  >
                    Send Message
                  </Button>
                </form>
                <div className="mt-6 text-center">
                  <p className="text-gray-400 mb-4">Get in touch through:</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a
                      href="mailto:vvsanjay8416@gmail.com"
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 transform hover:scale-105 transition-all duration-300"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Email Me
                    </a>
                    <a
                      href="tel:+919025357750"
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 transform hover:scale-105 transition-all duration-300"
                    >
                      <Smartphone className="mr-2 h-4 w-4" />
                      Call Me
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer with Enhanced Social Links */}
      <footer className="py-12 bg-gradient-to-t from-gray-900 to-black">
        <div className="container px-4 mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SocialIcon icon={<Github />} href="https://github.com/sanjaywick" label="GitHub" />
            <SocialIcon icon={<Linkedin />} href="https://linkedin.com/in/vv-sanjay-a71a7a234" label="LinkedIn" />
            <SocialIcon icon={<MessageSquare />} href="mailto:vvsanjay8416@gmail.com" label="Email" />
            <SocialIcon icon={<Smartphone />} href="tel:+919025357750" label="Phone" />
          </motion.div>
          <motion.div
            className="text-center text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p>© {new Date().getFullYear()} Sanjay V V. All rights reserved.</p>
            <ContactEmail />
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

function ContactEmail() {
  return (
    <div className="mt-2">
      <a
        href="mailto:vvsanjay8416@gmail.com"
        className="text-sky-400 hover:text-sky-300 transition-colors duration-300"
      >
        vvsanjay8416@gmail.com
      </a>
    </div>
  )
}
