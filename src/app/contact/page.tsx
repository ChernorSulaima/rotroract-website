"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Facebook, Instagram, Plus, Minus } from "lucide-react"
import Navigation from "@/components/Navigation"
import { NotificationProvider, useNotification } from "@/components/NotificationProvider"

const ContactPage = () => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      showNotification("success", "Message sent successfully! We will get back to you soon.")
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
      setIsLoading(false)
    }, 2000)
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
        <div className="w-5 h-5 bg-current rounded-sm flex items-center justify-center text-xs font-bold">T</div>
      ),
      handle: "@freetown_sunset",
      url: "https://www.tiktok.com/@freetown_sunset",
      color: "hover:bg-black",
    },
    {
      name: "LinkedIn",
      icon: () => (
        <div className="w-5 h-5 bg-current rounded-sm flex items-center justify-center text-xs font-bold">in</div>
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
      answer: "We meet every 1st and 3rd Friday from 6:00 PM to 8:00 PM at Manley's Hall, Wilberforce, Freetown.",
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
        "We focus on community service projects including education support, healthcare initiatives, environmental sustainability, and professional development programs. Recent projects include our Back to School initiative and End Polio Now campaign.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <NotificationProvider>
      <div className="min-h-screen">
        <Navigation />
        <main>
          <div className="pt-20">
            {/* Contact Form */}
            <section className="section-padding bg-gray-50">
              <div className="container-custom">
                <div className="section-header">
                  <h2 className="section-title">Get In Touch</h2>
                  <div className="divider"></div>
                  <p className="section-subtitle">
                    Have questions about membership or want to learn more about our projects? Send us a message!
                  </p>
                </div>

                <div className="max-w-4xl mx-auto">
                  <form onSubmit={handleSubmit} className="card p-8 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="form-label">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="form-input"
                          required
                        />
                      </div>
                      <div>
                        <label className="form-label">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="form-input"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="form-label">Subject *</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="form-input"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="spinner" />
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
                  <div className="divider"></div>
                  <p className="section-subtitle">
                    Follow us on social media to stay updated with our latest activities and events
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`card card-hover p-6 text-center transition-all duration-300 ${social.color} hover:text-white group`}
                    >
                      <div className="flex justify-center mb-4">
                        <social.icon size={32} className="text-gray-600 group-hover:text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-2">{social.name}</h3>
                      <p className="text-gray-600 group-hover:text-gray-100 text-sm">{social.handle}</p>
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
                  <div className="divider"></div>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="card overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                        {openFAQ === index ? (
                          <Minus size={20} className="text-rcfs-magenta flex-shrink-0" />
                        ) : (
                          <Plus size={20} className="text-rcfs-magenta flex-shrink-0" />
                        )}
                      </button>

                      <div
                        className={`transition-all duration-300 ease-in-out ${openFAQ === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                          } overflow-hidden`}
                      >
                        <div className="px-6 pb-6">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </NotificationProvider>
  )
}

export default ContactPage
