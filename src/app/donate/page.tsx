"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Heart, Book, Stethoscope, TreePine, Users, Building, Copy, CheckCircle } from "lucide-react"
import Navigation from "@/components/Navigation"
import { NotificationProvider, useNotification } from "@/components/NotificationProvider"

const DonatePageContent = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentCode, setPaymentCode] = useState<string | null>(null)

  const { showNotification } = useNotification()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check for Monime redirect status
    const paymentStatus = searchParams.get("payment")
    if (paymentStatus === "success") {
      showNotification("success", "Thank you! Your donation was successful and is being processed.")
    } else if (paymentStatus === "cancelled") {
      showNotification("error", "The payment was cancelled or failed. Please try again.")
    }
  }, [searchParams, showNotification])

  const impactAreas = [
    {
      icon: Book,
      title: "Education Support",
      description: "Help us provide school supplies, uniforms, and scholarships to underprivileged children",
      impact: "50 students supported annually",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Stethoscope,
      title: "Health Initiatives",
      description: "Support our health camps, medical outreach, and awareness campaigns like End Polio Now",
      impact: "1,000+ people reached",
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      icon: TreePine,
      title: "Environmental Projects",
      description: "Fund our environmental sustainability drives and community cleanup initiatives",
      impact: "15 communities served",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Users,
      title: "Leadership Development",
      description: "Enable workshops, seminars, and training programs for young professionals",
      impact: "80+ youth trained",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  // Removing unused bank details and functions

  return (
    <NotificationProvider>
      <div className="min-h-screen">
        <Navigation />
        <main>
          <div className="pt-20">
            {/* Donation Impact */}
            <section className="section-padding bg-white">
              <div className="container-custom">
                <div className="section-header">
                  <h2 className="section-title">Your Impact</h2>
                  <div className="divider"></div>
                  <p className="section-subtitle">
                    See how your generous contribution helps us implement impactful projects across our focus areas
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {impactAreas.map((area, index) => (
                    <div key={index} className="card card-hover text-center p-8">
                      <div
                        className={`w-16 h-16 ${area.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
                      >
                        <area.icon className={area.color} size={24} />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{area.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{area.description}</p>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-rcfs-blue">{area.impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Donation Form */}
            <section className="section-padding bg-gray-50">
              <div className="container-custom">
                <div className="section-header">
                  <h2 className="section-title">Make a Donation</h2>
                  <div className="divider"></div>
                  <p className="section-subtitle">
                    Support our community service projects securely via Orange Money or Afrimoney
                  </p>
                </div>

                <div className="max-w-xl mx-auto">
                  <div className="card shadow-lg p-8 md:p-10 bg-white border border-gray-100 rounded-2xl">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="text-rcfs-blue" size={32} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Donate Online</h3>
                      <p className="text-gray-500 text-sm">Fast, secure, and direct with Mobile Money</p>
                    </div>

                    <div className="space-y-6">
                      {paymentCode ? (
                        <div className="text-center p-8 bg-green-50/50 rounded-xl border border-green-200 shadow-sm animate-fade-in">
                          <CheckCircle className="mx-auto text-green-500 mb-5" size={56} />
                          <h5 className="text-2xl font-bold text-gray-900 mb-3">Payment Code Generated</h5>
                          <p className="text-gray-600 mb-6 text-sm">Dial the following USSD code on your mobile phone to complete the donation:</p>
                          <div className="bg-white p-5 rounded-xl border border-green-300 shadow-inner text-3xl font-mono font-bold text-green-700 tracking-wider mb-6">
                            {paymentCode}
                          </div>
                          <p className="text-sm text-gray-500 mb-8 max-w-xs mx-auto">
                            Do not close this page until you have approved the payment. Your donation will be confirmed automatically.
                          </p>
                          <button
                            onClick={() => setPaymentCode(null)}
                            className="btn btn-secondary w-full py-3 text-base font-medium rounded-xl hover:bg-gray-100 transition-colors"
                          >
                            Make Another Donation
                          </button>
                        </div>
                      ) : (
                        <form
                          onSubmit={async (e) => {
                            e.preventDefault()
                            setIsLoading(true)
                            const formData = new FormData(e.currentTarget)
                            const amount = formData.get("amount")
                            const name = formData.get("name")
                            const email = formData.get("email")
                            const phoneNumber = formData.get("phoneNumber")
                            const provider = formData.get("provider")

                            try {
                              showNotification("info", "Generating payment code securely...")
                              const res = await fetch("/api/payments/monime/initiate", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ amount, donorName: name, donorEmail: email, phoneNumber, provider, type: "donation" }),
                              })
                              const data = await res.json()
                              if (data.ussdCode) {
                                setPaymentCode(data.ussdCode)
                                showNotification("success", "Payment code generated successfully.")
                              } else {
                                throw new Error(data.error || "Failed to start payment")
                              }
                            } catch (error: any) {
                              showNotification("error", error.message || "Payment initiation failed. Please try again.")
                            } finally {
                              setIsLoading(false)
                            }
                          }}
                          className="space-y-5"
                        >
                          <div className="grid grid-cols-2 gap-5">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center justify-between">
                                Amount (SLE) <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <span className="text-gray-500 font-medium">Le</span>
                                </div>
                                <input
                                  type="number"
                                  name="amount"
                                  required
                                  min="10"
                                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rcfs-blue/20 focus:border-rcfs-blue transition-all"
                                  placeholder="100"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center justify-between">
                                Provider <span className="text-red-500">*</span>
                              </label>
                              <select
                                name="provider"
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rcfs-blue/20 focus:border-rcfs-blue transition-all appearance-none outline-none"
                              >
                                <option value="Orange">Orange Money</option>
                                <option value="Afrimoney">Afrimoney</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center justify-between">
                              Mobile Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="tel"
                              name="phoneNumber"
                              required
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rcfs-blue/20 focus:border-rcfs-blue transition-all"
                              placeholder="e.g. 078000000"
                            />
                            <p className="text-xs text-gray-500 mt-2 ml-1">The number you will use to approve the payment.</p>
                          </div>

                          <div className="grid grid-cols-2 gap-5 pt-2">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center justify-between">
                                Your Name <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                name="name"
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rcfs-blue/20 focus:border-rcfs-blue transition-all"
                                placeholder="John Doe"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center justify-between">
                                Your Email <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="email"
                                name="email"
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rcfs-blue/20 focus:border-rcfs-blue transition-all"
                                placeholder="john@example.com"
                              />
                            </div>
                          </div>

                          <div className="pt-4">
                            <button
                              type="submit"
                              disabled={isLoading}
                              className={`w-full btn btn-primary py-4 text-lg font-semibold rounded-xl flex justify-center items-center shadow-md hover:shadow-lg transition-all ${isLoading ? 'opacity-70 cursor-not-allowed scale-[0.99]' : 'hover:-translate-y-0.5'}`}
                            >
                              {isLoading ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Generating...
                                </>
                              ) : (
                                "Pay Securely"
                              )}
                            </button>
                            <div className="flex items-center justify-center space-x-2 mt-4 text-xs text-gray-500 font-medium">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                              </svg>
                              <span>Secured by Monime Payments</span>
                            </div>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact for Donations */}
            <section className="section-padding bg-white">
              <div className="container-custom">
                <div className="section-header">
                  <h2 className="section-title">Need Help with Your Donation?</h2>
                  <div className="divider"></div>
                  <p className="section-subtitle">
                    Contact our team for assistance with donations or to discuss corporate sponsorship opportunities
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div className="card p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="text-green-600" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Donation Inquiries</h3>
                    <p className="text-gray-600 mb-4">Questions about making a donation or need a receipt?</p>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>Email: freetownsunset21@gmail.com</p>
                      <p>Phone: +232 34769022 (Secretary)</p>
                    </div>
                  </div>

                  <div className="card p-8 text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Building className="text-rcfs-gold" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Corporate Sponsorship</h3>
                    <p className="text-gray-600 mb-4">Interested in partnering with us for specific projects?</p>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>Contact: Dolly Jaiah (Fundraising Chair)</p>
                      <p>Phone: +232 76845903 (President)</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="section-padding rcfs-gradient text-white">
              <div className="container-custom text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Every Donation Makes a Difference</h2>
                <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
                  Join us in creating positive change in Sierra Leone. Your support enables us to continue our mission
                  of service above self and empowers young leaders to make a lasting impact.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" className="btn bg-white text-rcfs-blue hover:bg-gray-100 text-lg px-8 py-4">
                    Contact Us
                  </Link>
                  <Link
                    href="/membership"
                    className="btn border-2 border-white text-white hover:bg-white hover:text-rcfs-blue text-lg px-8 py-4"
                  >
                    Become a Member
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </NotificationProvider>
  )
}

export default function DonatePage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen">Loading...</div>}>
      <DonatePageContent />
    </React.Suspense>
  )
}
