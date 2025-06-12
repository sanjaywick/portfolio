"use client"

import { useState, useTransition } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { submitContactForm } from "@/app/actions/contact"
import { CheckCircle, AlertCircle, Send } from "lucide-react"

export default function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null)

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const response = await submitContactForm(formData)
      setResult(response)

      // Clear the form if successful
      if (response.success) {
        const form = document.getElementById("contact-form") as HTMLFormElement
        if (form) {
          form.reset()
        }
      }
    })
  }

  return (
    <div>
      <form id="contact-form" action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={isPending}
            className="w-full rounded-md bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            disabled={isPending}
            className="w-full rounded-md bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            disabled={isPending}
            className="w-full rounded-md bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed resize-vertical"
            placeholder="Tell me about your project or just say hello..."
          />
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 disabled:transform-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Send Message
            </div>
          )}
        </Button>
      </form>

      {/* Result Message */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 p-4 rounded-lg border ${
            result.success
              ? "bg-green-500/10 border-green-500/30 text-green-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}
        >
          <div className="flex items-center gap-2">
            {result.success ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <p className="text-sm">{result.success ? result.message : result.error}</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
