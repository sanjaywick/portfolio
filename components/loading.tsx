"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

export default function Loading() {
  const [progress, setProgress] = useState(0)
  const controls = useAnimation()

  useEffect(() => {
    const duration = 12 // Total duration in seconds
    const interval = 50 // Update interval in milliseconds

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 100 / ((duration * 500) / interval)
        if (next >= 100) {
          clearInterval(timer)
          return 100
        }
        return next
      })
    }, interval)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    controls.start({ width: `${progress}%` })
  }, [progress, controls])

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <div className="w-64 relative">
        {/* Main loading bar container */}
        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden relative">
          {/* Gradient background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-sky-600 via-cyan-500 to-sky-600"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 6,
              ease: "linear",
            }}
          />

          {/* Progress bar */}
          <motion.div
            className="h-full bg-gradient-to-r from-sky-500 to-cyan-500"
            initial={{ width: 0 }}
            animate={controls}
            transition={{ duration: 0.1 }}
          />

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-cyan-500/20 blur-sm"
            initial={{ width: 0 }}
            animate={controls}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Percentage text */}
        <div className="mt-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent"
          >
            {Math.round(progress)}%
          </motion.div>
        </div>

        {/* Loading text with glitch effect */}
        <motion.div
          className="mt-2 text-center text-gray-400 text-sm relative"
          animate={{
            textShadow: [
              "0 0 0px rgba(14, 165, 233, 0)",
              "0 0 2px rgba(14, 165, 233, 0.5)",
              "0 0 0px rgba(14, 165, 233, 0)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          Loading...
        </motion.div>
      </div>
    </div>
  )
}
