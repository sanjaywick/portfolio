"use client"

import { motion } from "framer-motion"
import { MessageSquare, Smartphone, Mail, ExternalLink } from "lucide-react"

export default function ContactForm() {
  return (
    <motion.div
      className="max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 hover:border-sky-500/50 transition-all duration-300">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Let's Connect!</h3>
          <p className="text-gray-400">
            Ready to collaborate or have a question? Reach out through any of these channels:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Email */}
          <motion.a
            href="mailto:vvsanjay10102003@gmail.com"
            className="group p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-sky-500 transition-all duration-300 text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-sky-500/25 transition-all duration-300">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Email</h4>
            <p className="text-gray-400 text-sm mb-3">Send me a message</p>
            <div className="flex items-center justify-center gap-2 text-sky-400 group-hover:text-sky-300 transition-colors">
              <span className="text-sm">vvsanjay10102003@gmail.com</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </motion.a>

          {/* Phone */}
          <motion.a
            href="tel:+919025357750"
            className="group p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-cyan-500 transition-all duration-300 text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Phone</h4>
            <p className="text-gray-400 text-sm mb-3">Give me a call</p>
            <div className="flex items-center justify-center gap-2 text-cyan-400 group-hover:text-cyan-300 transition-colors">
              <span className="text-sm">+91 90253 57750</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/919025357750"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-green-500 transition-all duration-300 text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-green-500/25 transition-all duration-300">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">WhatsApp</h4>
            <p className="text-gray-400 text-sm mb-3">Quick chat</p>
            <div className="flex items-center justify-center gap-2 text-green-400 group-hover:text-green-300 transition-colors">
              <span className="text-sm">Message me</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </motion.a>
        </div>

        <div className="mt-8 text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500/10 to-cyan-500/10 rounded-full border border-sky-500/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Available for new opportunities</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
