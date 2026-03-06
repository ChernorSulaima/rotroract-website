"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Users, Heart, Globe, Award, Target, BookOpen, CheckCircle, ArrowRight } from "lucide-react"
import { submitMembershipApplication } from "@/app/actions"
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const result = await submitMembershipApplication(formData)

    if (result.success) {
      showNotification(
        "success",
        "Application submitted successfully! We'll be in touch soon."
      )
      setFormData({
        name: "",
        email: "",
        phone: "",
        profession: "",
        motivation: "",
      })
    } else {
      showNotification(
        "error",
        "Failed to submit application. Please try again."
      )
    }

    setIsSubmitting(false)
  }

  const benefits = [
    {
      icon: <Users className="h-7 w-7 md:h-8 md:w-8 text-rcfs-blue" />,
      title: "Leadership Development",
      description:
        "Develop essential leadership skills through hands-on experience and mentorship.",
    },
    {
      icon: <Heart className="h-7 w-7 md:h-8 md:w-8 text-rcfs-magenta" />,
      title: "Community Impact",
      description:
        "Make a meaningful difference through service projects and initiatives.",
    },
    {
      icon: <Globe className="h-7 w-7 md:h-8 md:w-8 text-rcfs-gold" />,
      title: "Global Network",
      description:
        "Connect with like-minded young professionals worldwide through Rotary International.",
    },
    {
      icon: <Award className="h-7 w-7 md:h-8 md:w-8 text-rcfs-blue" />,
      title: "Professional Growth",
      description:
        "Enhance your career through networking, skill development, and recognition.",
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
      <section className="bg-gradient-to-br from-rcfs-blue to-blue-800 text-white section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rcfs-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rcfs-magenta rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 fade-in leading-tight">
              Join Our Community of
              <span className="text-rcfs-gold block mt-1">Young Leaders</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl mb-6 md:mb-8 text-blue-100 fade-in max-w-2xl mx-auto">
              Become part of a global network dedicated to service, leadership,
              and positive change
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center fade-in">
              <a
                href="#application"
                className="btn-member inline-flex items-center justify-center active:scale-95 transition-transform"
              >
                Become a Member
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#benefits"
                className="btn-secondary inline-flex items-center justify-center active:scale-95 transition-transform"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Why Join Rotaract?
            </h2>
            <div className="divider" />
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto mt-4">
              Discover the incredible opportunities that come with membership
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="card p-5 md:p-8 text-center hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="flex justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                Membership Requirements
              </h2>
              <div className="divider" />
              <p className="text-base md:text-xl text-gray-600 mt-4">
                Here&apos;s what we look for in our members
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div className="space-y-3 md:space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-base md:text-lg">
                      {requirement}
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-br from-rcfs-blue to-blue-800 text-white p-6 md:p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rcfs-gold rounded-full blur-2xl" />
                </div>
                <div className="relative">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                    Ready to Make a Difference?
                  </h3>
                  <p className="text-blue-100 mb-4 md:mb-6 text-sm md:text-base">
                    Join us in creating positive change in our community and
                    beyond. Your journey as a young leader starts here.
                  </p>
                  <div className="text-rcfs-gold font-semibold text-base md:text-lg">
                    &quot;Service Above Self&quot;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                Apply for Membership
              </h2>
              <div className="divider" />
              <p className="text-base md:text-xl text-gray-600 mt-4">
                Take the first step towards becoming a Rotaract member
              </p>
            </div>

            <div className="card p-5 md:p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rcfs-blue/20 focus:border-rcfs-blue transition-all outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rcfs-blue/20 focus:border-rcfs-blue transition-all outline-none"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rcfs-blue/20 focus:border-rcfs-blue transition-all outline-none"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="profession"
                      className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2"
                    >
                      Profession/Field of Study *
                    </label>
                    <input
                      type="text"
                      id="profession"
                      name="profession"
                      value={formData.profession}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rcfs-blue/20 focus:border-rcfs-blue transition-all outline-none"
                      placeholder="Your profession or field"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="motivation"
                    className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2"
                  >
                    Why do you want to join Rotaract? *
                  </label>
                  <textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rcfs-blue/20 focus:border-rcfs-blue transition-all resize-none outline-none"
                    placeholder="Tell us about your motivation..."
                  />
                </div>

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-member inline-flex items-center justify-center min-w-[200px] w-full sm:w-auto active:scale-95 transition-transform"
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
      <section className="section-padding bg-gradient-to-r from-rcfs-blue to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rcfs-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rcfs-magenta rounded-full blur-3xl" />
        </div>
        <div className="container-custom text-center relative">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-base md:text-xl text-blue-100 mb-6 md:mb-8 max-w-3xl mx-auto">
            Join a community of passionate young leaders committed to making a
            positive impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link
              href="/contact"
              className="btn-secondary inline-flex items-center justify-center active:scale-95 transition-transform"
            >
              Contact Us
            </Link>
            <Link
              href="/events"
              className="btn-primary inline-flex items-center justify-center bg-white text-rcfs-blue hover:bg-gray-100 active:scale-95 transition-transform"
            >
              View Our Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
