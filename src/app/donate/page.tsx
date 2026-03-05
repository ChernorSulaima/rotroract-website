"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Heart, Book, Stethoscope, TreePine, Users, Building, Copy, CheckCircle } from "lucide-react"
import Navigation from "@/components/Navigation"
import { NotificationProvider, useNotification } from "@/components/NotificationProvider"

const DonatePageContent = () => {
  const [copiedAccount, setCopiedAccount] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentCode, setPaymentCode] = useState<string | null>(null)

  const { showNotification } = useNotification()
  const searchParams = useSearchParams()

  useEffect(() => {
    window.scrollTo(0, 0)

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

  const bankDetails = {
    accountName: "ROTARACT CLUB OF FREETOWN SUNSET",
    accountNumber: "002011018616767040",
    bankName: "Sierra Leone Commercial Bank",
  }

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(bankDetails.accountNumber)
    setCopiedAccount(true)
    showNotification("success", "Account number copied to clipboard!")
    setTimeout(() => setCopiedAccount(false), 2000)
  }

  const handleDonationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    showNotification(
      "success",
      "Thank you for your interest in donating! Please use the bank details provided or contact us for other donation methods.",
    )
  }

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

            {/* Bank Details */}
            <section className="section-padding bg-gray-50">
              <div className="container-custom">
                <div className="section-header">
                  <h2 className="section-title">How to Donate</h2>
                  <div className="divider"></div>
                  <p className="section-subtitle">
                    Make a direct bank transfer to support our community service projects
                  </p>
                </div>

                <div className="max-w-2xl mx-auto">
                  <div className="card p-8">
                    <div className="text-center mb-8">
                      <Building className="text-rcfs-blue mx-auto mb-4" size={48} />
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Bank Transfer</h3>
                      <p className="text-gray-600">Use the following details to make your donation</p>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm border border-gray-100">
                        <h4 className="font-semibold text-gray-900 mb-4 text-center">Donate Online (Orange/Afrimoney)</h4>

                        {paymentCode ? (
                          <div className="text-center p-6 bg-white rounded-lg border border-green-200">
                            <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
                            <h5 className="text-xl font-bold text-gray-900 mb-2">Payment Code Generated</h5>
                            <p className="text-gray-600 mb-4">Dial the following USSD code on your mobile phone to complete the donation:</p>
                            <div className="bg-gray-100 p-4 rounded-lg text-2xl font-mono font-bold tracking-wider mb-4">
                              {paymentCode}
                            </div>
                            <p className="text-sm text-gray-500 mb-6">
                              Do not close this page until you have approved the payment. Your donation will be confirmed automatically.
                            </p>
                            <button
                              onClick={() => setPaymentCode(null)}
                              className="btn btn-secondary w-full"
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
                            className="space-y-4"
                          >
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (SLE)</label>
                                <input
                                  type="number"
                                  name="amount"
                                  required
                                  min="10"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rcfs-blue focus:border-rcfs-blue"
                                  placeholder="e.g. 100"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                                <select
                                  name="provider"
                                  required
                                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rcfs-blue focus:border-rcfs-blue bg-white"
                                >
                                  <option value="Orange">Orange Money</option>
                                  <option value="Afrimoney">Afrimoney</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                              <input
                                type="tel"
                                name="phoneNumber"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rcfs-blue focus:border-rcfs-blue"
                                placeholder="e.g. 078000000"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                <input
                                  type="text"
                                  name="name"
                                  required
                                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rcfs-blue focus:border-rcfs-blue"
                                  placeholder="John Doe"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                                <input
                                  type="email"
                                  name="email"
                                  required
                                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-rcfs-blue focus:border-rcfs-blue"
                                  placeholder="john@example.com"
                                />
                              </div>
                            </div>

                            <button
                              type="submit"
                              disabled={isLoading}
                              className={`w-full btn btn-primary py-3 flex justify-center items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                              {isLoading ? "Generating Code..." : "Pay Securely with Monime"}
                            </button>
                          </form>
                        )}
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-4 text-center">Or via Bank Transfer</h4>
                        <div className="grid gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                            <p className="text-lg font-semibold text-gray-900">{bankDetails.accountName}</p>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                            <div className="flex items-center space-x-3">
                              <p className="text-lg font-mono font-semibold text-gray-900">
                                {bankDetails.accountNumber}
                              </p>
                              <button
                                onClick={copyAccountNumber}
                                className="btn btn-secondary text-sm px-3 py-1"
                                title="Copy account number"
                              >
                                {copiedAccount ? <CheckCircle size={16} /> : <Copy size={16} />}
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Bank</label>
                            <p className="text-lg font-semibold text-gray-900">{bankDetails.bankName}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-rcfs-blue/5 p-6 rounded-lg border border-rcfs-blue/20">
                        <h4 className="font-semibold text-rcfs-blue mb-3">Important Notes:</h4>
                        <ul className="text-sm text-gray-700 space-y-2">
                          <li>• Please include your name and contact information in the transfer reference</li>
                          <li>• For donation receipts, contact us at freetownsunset21@gmail.com</li>
                          <li>• All donations go directly to funding our community service projects</li>
                          <li>• For large donations or corporate sponsorship, please contact us first</li>
                        </ul>
                      </div>
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
