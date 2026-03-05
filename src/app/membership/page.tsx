"use client"

import type React from "react"
import { useState } from "react"
import { Users, Heart, Globe, Award, CheckCircle, ArrowRight } from "lucide-react"
import { useNotification } from "@/components/NotificationProvider"

export default function MembershipPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
    motivation: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showNotification } = useNotification()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    showNotification("success", "Application submitted successfully! We'll be in touch soon.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      profession: "",
      motivation: "",
    })
    setIsSubmitting(false)
  }

  const benefits = [
    {
      icon: <Users className="h-8 w-8 text-rcfs-blue" />,
      title: "Leadership Development",
      description: "Develop essential leadership skills through hands-on experience and mentorship opportunities.",
    },
    {
      icon: <Heart className="h-8 w-8 text-rcfs-red" />,
      title: "Community Impact",
      description: "Make a meaningful difference in your community through service projects and initiatives.",
    },
    {
      icon: <Globe className="h-8 w-8 text-rcfs-gold" />,
      title: "Global Network",
      description: "Connect with like-minded young professionals from around the world through Rotary International.",
    },
    {
      icon: <Award className="h-8 w-8 text-rcfs-blue" />,
      title: "Professional Growth",
      description:
        "Enhance your career prospects through networking, skill development, and recognition opportunities.",
    },
  ]

  const requirements = [
    "Age between 18-30 years",
    "Commitment to community service",
    "Professional or student status",
    "Willingness to participate actively",
    "Adherence to Rotary's Four-Way Test",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rcfs-blue to-blue-800 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 fade-in">
              Join Our Community of
              <span className="text-rcfs-gold block">Young Leaders</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100 fade-in">
              Become part of a global network dedicated to service, leadership, and positive change
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in">
              <a href="#application" className="btn-member inline-flex items-center justify-center">
                Become a Member
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a href="#benefits" className="btn-secondary inline-flex items-center justify-center">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Why Join Rotaract?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the incredible opportunities and benefits that come with being a Rotaract member
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="card p-8 text-center hover:shadow-2xl transition-all duration-300">
                <div className="flex justify-center mb-6">{benefit.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Membership Requirements</h2>
              <p className="text-xl text-gray-600">Here's what we look for in our members</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{requirement}</span>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-br from-rcfs-blue to-blue-800 text-white p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h3>
                <p className="text-blue-100 mb-6">
                  Join us in creating positive change in our community and beyond. Your journey as a young leader starts
                  here.
                </p>
                <div className="text-rcfs-gold font-semibold text-lg">"Service Above Self"</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Apply for Membership</h2>
              <p className="text-xl text-gray-600">Take the first step towards becoming a Rotaract member</p>
            </div>

            <div className="card p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rcfs-blue focus:border-transparent transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rcfs-blue focus:border-transparent transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rcfs-blue focus:border-transparent transition-colors"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-2">
                      Profession/Field of Study *
                    </label>
                    <input
                      type="text"
                      id="profession"
                      name="profession"
                      value={formData.profession}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rcfs-blue focus:border-transparent transition-colors"
                      placeholder="Your profession or field of study"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                    Why do you want to join Rotaract? *
                  </label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rcfs-blue focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us about your motivation to join and how you'd like to contribute..."
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-member inline-flex items-center justify-center min-w-[200px]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-r from-rcfs-blue to-blue-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join a community of passionate young leaders committed to making a positive impact. Your adventure in
            service and leadership begins with Rotaract.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-secondary inline-flex items-center justify-center">
              Contact Us
            </a>
            <a
              href="/events"
              className="btn-primary inline-flex items-center justify-center bg-white text-rcfs-blue hover:bg-gray-100"
            >
              View Our Events
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
