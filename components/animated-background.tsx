"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const particlesRef = useRef<Particle[]>([])
  const requestRef = useRef<number>()

  // Initialize dimensions and particles
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const width = window.innerWidth
        const height = window.innerHeight
        canvasRef.current.width = width
        canvasRef.current.height = height
        setDimensions({ width, height })

        // Reset particles when resizing
        particlesRef.current = createParticles(width, height, 100)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsHovering(true)

      // Reset hovering state after a delay
      setTimeout(() => setIsHovering(false), 100)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Draw and update particles
      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > dimensions.width) {
          particle.speedX *= -1
        }
        if (particle.y < 0 || particle.y > dimensions.height) {
          particle.speedY *= -1
        }

        // Mouse interaction
        if (isHovering) {
          const dx = mousePosition.x - particle.x
          const dy = mousePosition.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 200

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance
            particle.speedX -= (dx / distance) * force * 0.5
            particle.speedY -= (dy / distance) * force * 0.5

            // Limit speed
            const maxSpeed = 3
            const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY)
            if (currentSpeed > maxSpeed) {
              particle.speedX = (particle.speedX / currentSpeed) * maxSpeed
              particle.speedY = (particle.speedY / currentSpeed) * maxSpeed
            }
          }
        }

        // Draw particle
        ctx.beginPath()
        const baseColor = particle.color.replace(")", "").replace("rgba(", "").split(", ")
        const r = baseColor[0]
        const g = baseColor[1]
        const b = baseColor[2]
        const a = baseColor[3]

        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size)
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a})`)
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

        ctx.fillStyle = gradient
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw connections
      drawConnections(ctx, particlesRef.current, 150)

      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [dimensions, mousePosition, isHovering])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  )
}

// Helper function to create particles
function createParticles(width: number, height: number, count: number): Particle[] {
  const particles: Particle[] = []
  const colors = [
    { r: 14, g: 165, b: 233 }, // sky-500
    { r: 6, g: 182, b: 212 }, // cyan-500
    { r: 56, g: 189, b: 248 }, // sky-400
  ]

  for (let i = 0; i < count; i++) {
    const colorIndex = Math.floor(Math.random() * colors.length)
    const color = colors[colorIndex]
    const alpha = Math.random() * 0.5 + 0.1

    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: alpha,
      color: `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`,
    })
  }

  return particles
}

// Draw connections between nearby particles
function drawConnections(ctx: CanvasRenderingContext2D, particles: Particle[], maxDistance: number) {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < maxDistance) {
        const opacity = 1 - distance / maxDistance
        ctx.beginPath()
        ctx.strokeStyle = `rgba(14, 165, 233, ${opacity * 0.2})`
        ctx.lineWidth = 0.5
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
      }
    }
  }
}
