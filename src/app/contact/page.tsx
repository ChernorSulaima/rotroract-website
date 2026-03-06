"use client"

import type React from "react"
import { useState, useEffect, FormEvent } from "react"
import { Facebook, Instagram, Plus, Minus } from "lucide-react"
import { submitContactMessage } from "@/app/actions"
import { useNotification } from "@/components/NotificationProvider"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const { showNotification } = useNotification()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const result = await submitContactMessage(formData)

    if (result.success) {
      showNotification(
        "success",
        "Message sent successfully! We will get back to you soon."
      )
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    } else {
      showNotification(
        "error",
        "Failed to send message. Please try again."
      )
    }

    setIsLoading(false)
  }

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      handle: "The Rotaract Club of Freetown Sunset",
      url: "https://www.facebook.com/The-Rotaract-Club-of-Freetown-Sunset",
      color: "hover:bg-blue-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      handle: "@rcfs9101",
      url: "https://www.instagram.com/rcfs9101",
      color: "hover:bg-pink-600",
    },
    {
      name: "TikTok",
      icon: () => (
        <div className="w-5 h-5 bg-current rounded-sm flex items-center justify-center text-xs font-bold">
          T
        </div>
      ),
      handle: "@freetown_sunset",
      url: "https://www.tiktok.com/@freetown_sunset",
      color: "hover:bg-black",
    },
    {
      name: "LinkedIn",
      icon: () => (
        <div className="w-5 h-5 bg-current rounded-sm flex items-center justify-center text-xs font-bold">
          in
        </div>
      ),
      handle: "Rotaract Club of Freetown - Sunset",
      url: "https://www.linkedin.com/company/rotaract-club-of-freetown-sunset",
      color: "hover:bg-blue-700",
    },
  ]

  const faqs = [
    {
      question: "How can I join the Rotaract Club of Freetown-Sunset?",
      answer:
        "To join, you need to attend at least 2 meetings to become a Potential Rotaractor, then participate in 8 or more meetings to get fully involved. After meeting these requirements, you'll be eligible for induction upon paying the required dues.",
    },
    {
      question: "When and where do you meet?",
      answer:
        "We meet every 1st and 3rd Friday from 6:00 PM to 8:00 PM at Manley's Hall, Wilberforce, Freetown.",
    },
    {
      question: "What is the age requirement for membership?",
      answer:
        "Rotaract is for young adults typically aged 18-30 years old. We welcome young professionals and students who are committed to service and leadership.",
    },
    {
      question: "Are there membership fees?",
      answer:
        "Yes, there are induction dues required for membership. Please contact our treasurer Naomi Mansaray or attend a meeting for current fee structure information.",
    },
    {
      question: "What kind of projects does the club undertake?",
      answer:
        "We focus on community service projects including education support, healthcare initiatives, environmental sustainability, and professional development programs.",
    },
  ]

  return (
    <div>
      {/* Contact Form */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="section-header">
            <h1 className="section-title">Get In Touch</h1>
            <div className="divider" />
            <p className="section-subtitle">
              Have questions about membership or want to learn more about our
              projects? Send us a message!
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="card p-5 md:p-8 space-y-4 md:space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rcfs-blue/20 focus:border-rcfs-blue transition-all outline-none"
                    required
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rcfs-blue/20 focus:border-rcfs-blue transition-all outline-none"
                    required
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rcfs-blue/20 focus:border-rcfs-blue transition-all outline-none"
                    placeholder="+232 XX XXX XXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rcfs-blue/20 focus:border-rcfs-blue transition-all outline-none"
                    required
                    placeholder="What's this about?"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rcfs-blue/20 focus:border-rcfs-blue transition-all outline-none resize-none"
                  required
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary text-base md:text-lg px-8 py-3 md:py-4 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto min-w-[200px]"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-header">
            <h2 className="section-title">Connect With Us</h2>
            <div className="divider" />
            <p className="section-subtitle">
              Follow us on social media to stay updated with our latest
              activities
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`card card-hover p-5 md:p-6 text-center transition-all duration-300 ${social.color} hover:text-white group active:scale-95`}
              >
                <div className="flex justify-center mb-3 md:mb-4">
                  <social.icon
                    size={28}
                    className="text-gray-600 group-hover:text-white"
                  />
                </div>
                <h3 className="text-base md:text-xl font-bold text-gray-900 group-hover:text-white mb-1 md:mb-2">
                  {social.name}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-100 text-xs md:text-sm truncate">
                  {social.handle}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="divider" />
          </div>

          <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full p-4 md:p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors active:bg-gray-100"
                >
                  <h3 className="text-sm md:text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${openFAQ === index ? "bg-rcfs-magenta/10 rotate-180" : "bg-gray-100"
                    }`}>
                    {openFAQ === index ? (
                      <Minus size={16} className="text-rcfs-magenta" />
                    ) : (
                      <Plus size={16} className="text-rcfs-magenta" />
                    )}
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${openFAQ === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                    } overflow-hidden`}
                >
                  <div className="px-4 pb-4 md:px-6 md:pb-6">
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
