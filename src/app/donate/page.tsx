"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  Heart,
  Book,
  Stethoscope,
  TreePine,
  Users,
  Building,
  CheckCircle,
  Smartphone,
  Shield,
  Sparkles,
  ArrowRight,
  ChevronRight,
} from "lucide-react"
import { useNotification } from "@/components/NotificationProvider"

const presetAmounts = [50, 100, 250, 500, 1000]

const DonatePageContent = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentCode, setPaymentCode] = useState<string | null>(null)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [selectedProvider, setSelectedProvider] = useState("Orange")
  const [currentStep, setCurrentStep] = useState(1)
  const { showNotification } = useNotification()
  const searchParams = useSearchParams()

  useEffect(() => {
    const paymentStatus = searchParams.get("payment")
    if (paymentStatus === "success") {
      showNotification(
        "success",
        "Thank you! Your donation was successful and is being processed."
      )
    } else if (paymentStatus === "cancelled") {
      showNotification(
        "error",
        "The payment was cancelled or failed. Please try again."
      )
    }
  }, [searchParams, showNotification])

  const actualAmount = selectedAmount || (customAmount ? Number(customAmount) : 0)

  const impactAreas = [
    {
      icon: Book,
      title: "Education",
      description: "School supplies, uniforms & scholarships",
      impact: "50 students/year",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      icon: Stethoscope,
      title: "Health",
      description: "Health camps & awareness campaigns",
      impact: "1,000+ reached",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      icon: TreePine,
      title: "Environment",
      description: "Sustainability & cleanup drives",
      impact: "15 communities",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      icon: Users,
      title: "Leadership",
      description: "Workshops & training programs",
      impact: "80+ youth",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
  ]

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount(null)
  }

  return (
    <div>
      {/* Compact Impact Banner */}
      <section className="py-6 md:py-10 bg-white border-b border-gray-100">
        <div className="container-custom">
          <div className="text-center mb-5 md:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Support Our Mission
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto">
              Every contribution fuels real change in Sierra Leone
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {impactAreas.map((area, index) => (
              <div
                key={index}
                className={`${area.bgColor} border ${area.borderColor} rounded-2xl p-3 md:p-5 text-center transition-all hover:shadow-md group`}
              >
                <div className="flex items-center justify-center mb-2 md:mb-3">
                  <area.icon className={`${area.color} group-hover:scale-110 transition-transform`} size={20} />
                </div>
                <h3 className="text-xs md:text-sm font-bold text-gray-900 mb-0.5">
                  {area.title}
                </h3>
                <p className="text-[10px] md:text-xs text-gray-500 leading-snug hidden sm:block">
                  {area.description}
                </p>
                <div className="mt-1.5 md:mt-2">
                  <span className={`text-[10px] md:text-xs font-semibold ${area.color}`}>
                    {area.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form - The Focus */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-lg mx-auto">
            {/* Form Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-rcfs-blue to-blue-700 p-5 md:p-6 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-rcfs-gold rounded-full blur-2xl" />
                  <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white rounded-full blur-2xl" />
                </div>
                <div className="relative">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Heart className="text-white" size={24} />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold mb-1">Donate Now</h2>
                  <p className="text-blue-200 text-xs md:text-sm">
                    Secure mobile money payment
                  </p>
                </div>
              </div>

              {paymentCode ? (
                /* Success State */
                <div className="p-5 md:p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                      <CheckCircle className="text-green-500" size={32} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      Payment Code Ready!
                    </h3>
                    <p className="text-gray-500 text-sm mb-5">
                      Dial this USSD code on your phone to complete
                    </p>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-2xl border-2 border-green-200 mb-5">
                      <div className="text-3xl md:text-4xl font-mono font-bold text-green-700 tracking-wider">
                        {paymentCode}
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-6">
                      <Shield size={14} />
                      <span>Keep this page open until payment is confirmed</span>
                    </div>

                    <button
                      onClick={() => {
                        setPaymentCode(null)
                        setCurrentStep(1)
                        setSelectedAmount(null)
                        setCustomAmount("")
                      }}
                      className="btn btn-secondary w-full py-3 text-sm font-semibold rounded-xl"
                    >
                      Make Another Donation
                    </button>
                  </div>
                </div>
              ) : (
                /* Multi-step Form */
                <form
                  onSubmit={async (e) => {
                    e.preventDefault()
                    setIsLoading(true)
                    const fd = new FormData(e.currentTarget)
                    const name = fd.get("name")
                    const email = fd.get("email")
                    const phoneNumber = fd.get("phoneNumber")

                    try {
                      showNotification("info", "Generating payment code...")
                      const res = await fetch("/api/payments/monime/initiate", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          amount: actualAmount,
                          donorName: name,
                          donorEmail: email,
                          phoneNumber,
                          provider: selectedProvider,
                          type: "donation",
                        }),
                      })
                      const data = await res.json()
                      if (data.ussdCode) {
                        setPaymentCode(data.ussdCode)
                        showNotification("success", "Payment code generated!")
                      } else {
                        throw new Error(data.error || "Failed to start payment")
                      }
                    } catch (error: unknown) {
                      const msg =
                        error instanceof Error
                          ? error.message
                          : "Payment failed. Please try again."
                      showNotification("error", msg)
                    } finally {
                      setIsLoading(false)
                    }
                  }}
                >
                  {/* Step Progress */}
                  <div className="px-5 md:px-6 pt-5 md:pt-6">
                    <div className="flex items-center justify-between mb-1">
                      {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center flex-1 last:flex-none">
                          <button
                            type="button"
                            onClick={() => {
                              if (step < currentStep) setCurrentStep(step)
                            }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all flex-shrink-0 ${step === currentStep
                                ? "bg-rcfs-blue text-white shadow-md shadow-rcfs-blue/30 scale-110"
                                : step < currentStep
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                          >
                            {step < currentStep ? (
                              <CheckCircle size={16} />
                            ) : (
                              step
                            )}
                          </button>
                          {step < 3 && (
                            <div
                              className={`flex-1 h-0.5 mx-2 rounded-full transition-colors ${step < currentStep ? "bg-green-500" : "bg-gray-100"
                                }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] md:text-xs text-gray-400 font-medium">
                      <span>Amount</span>
                      <span>Payment</span>
                      <span>Details</span>
                    </div>
                  </div>

                  {/* Step 1: Amount */}
                  <div className={`${currentStep === 1 ? "block" : "hidden"}`}>
                    <div className="p-5 md:p-6 space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Choose an amount
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                          {presetAmounts.map((amount) => (
                            <button
                              key={amount}
                              type="button"
                              onClick={() => handleAmountSelect(amount)}
                              className={`py-2.5 md:py-3 px-2 rounded-xl text-sm md:text-base font-bold transition-all active:scale-95 ${selectedAmount === amount
                                  ? "bg-rcfs-blue text-white shadow-lg shadow-rcfs-blue/30 ring-2 ring-rcfs-blue ring-offset-2"
                                  : "bg-gray-50 text-gray-700 border border-gray-200 hover:border-rcfs-blue hover:bg-blue-50"
                                }`}
                            >
                              {amount >= 1000
                                ? `${(amount / 1000).toFixed(0)}K`
                                : amount}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="relative">
                        <div className="flex items-center justify-center gap-3 py-2">
                          <div className="flex-1 h-px bg-gray-200" />
                          <span className="text-xs text-gray-400 font-medium">or enter custom</span>
                          <div className="flex-1 h-px bg-gray-200" />
                        </div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="text-gray-400 font-semibold text-sm">
                              SLE
                            </span>
                          </div>
                          <input
                            type="number"
                            value={customAmount}
                            onChange={(e) => handleCustomAmountChange(e.target.value)}
                            min="10"
                            className={`w-full pl-14 pr-4 py-3.5 border-2 rounded-xl text-lg font-bold transition-all outline-none ${customAmount
                                ? "border-rcfs-blue bg-blue-50/50 text-rcfs-blue"
                                : "border-gray-200 bg-gray-50 text-gray-700"
                              } focus:border-rcfs-blue focus:bg-blue-50/50`}
                            placeholder="Enter amount"
                          />
                        </div>
                      </div>

                      {actualAmount > 0 && (
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Sparkles size={16} className="text-rcfs-blue" />
                            <span className="text-sm text-gray-600">Your donation</span>
                          </div>
                          <span className="text-lg font-bold text-rcfs-blue">
                            Le {actualAmount.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="px-5 md:px-6 pb-5 md:pb-6">
                      <button
                        type="button"
                        disabled={actualAmount < 10}
                        onClick={() => setCurrentStep(2)}
                        className={`w-full py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all ${actualAmount >= 10
                            ? "bg-rcfs-blue text-white shadow-lg shadow-rcfs-blue/20 hover:shadow-rcfs-blue/40 hover:-translate-y-0.5 active:translate-y-0"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                      >
                        Continue
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Step 2: Payment Method */}
                  <div className={`${currentStep === 2 ? "block" : "hidden"}`}>
                    <div className="p-5 md:p-6 space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Select payment method
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {/* Orange Money */}
                          <button
                            type="button"
                            onClick={() => setSelectedProvider("Orange")}
                            className={`relative p-4 md:p-5 rounded-2xl border-2 transition-all active:scale-95 text-left ${selectedProvider === "Orange"
                                ? "border-orange-400 bg-orange-50 shadow-lg shadow-orange-100"
                                : "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50/50"
                              }`}
                          >
                            {selectedProvider === "Orange" && (
                              <div className="absolute top-2 right-2 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                                <CheckCircle size={12} className="text-white" />
                              </div>
                            )}
                            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-2">
                              <Smartphone className="text-orange-600" size={20} />
                            </div>
                            <div className="font-bold text-sm text-gray-900">Orange Money</div>
                            <div className="text-[10px] md:text-xs text-gray-500 mt-0.5">
                              Dial USSD code
                            </div>
                          </button>

                          {/* Afrimoney */}
                          <button
                            type="button"
                            onClick={() => setSelectedProvider("Afrimoney")}
                            className={`relative p-4 md:p-5 rounded-2xl border-2 transition-all active:scale-95 text-left ${selectedProvider === "Afrimoney"
                                ? "border-green-400 bg-green-50 shadow-lg shadow-green-100"
                                : "border-gray-200 bg-white hover:border-green-300 hover:bg-green-50/50"
                              }`}
                          >
                            {selectedProvider === "Afrimoney" && (
                              <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                <CheckCircle size={12} className="text-white" />
                              </div>
                            )}
                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-2">
                              <Smartphone className="text-green-600" size={20} />
                            </div>
                            <div className="font-bold text-sm text-gray-900">Afrimoney</div>
                            <div className="text-[10px] md:text-xs text-gray-500 mt-0.5">
                              Dial USSD code
                            </div>
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="text-gray-400 text-sm">+232</span>
                          </div>
                          <input
                            type="tel"
                            name="phoneNumber"
                            required
                            className="w-full pl-16 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-rcfs-blue focus:bg-white transition-all outline-none text-base"
                            placeholder="78 000 000"
                          />
                        </div>
                        <p className="text-[10px] md:text-xs text-gray-400 mt-1.5 ml-1 flex items-center gap-1">
                          <Shield size={10} />
                          The number used to approve payment
                        </p>
                      </div>
                    </div>

                    <div className="px-5 md:px-6 pb-5 md:pb-6 flex gap-3">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="px-5 py-3.5 rounded-xl font-semibold text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all active:scale-95"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="flex-1 py-3.5 rounded-xl font-semibold text-base bg-rcfs-blue text-white shadow-lg shadow-rcfs-blue/20 hover:shadow-rcfs-blue/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 transition-all"
                      >
                        Continue
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Step 3: Personal Details + Submit */}
                  <div className={`${currentStep === 3 ? "block" : "hidden"}`}>
                    <div className="p-5 md:p-6 space-y-4">
                      {/* Summary */}
                      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Amount</span>
                          <span className="font-bold text-gray-900">
                            Le {actualAmount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Payment</span>
                          <span className="font-semibold text-gray-700">
                            {selectedProvider === "Orange" ? "Orange Money" : "Afrimoney"}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-rcfs-blue focus:bg-white transition-all outline-none"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-rcfs-blue focus:bg-white transition-all outline-none"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="px-5 md:px-6 pb-5 md:pb-6 space-y-3">
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="px-5 py-3.5 rounded-xl font-semibold text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all active:scale-95"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className={`flex-1 py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all ${isLoading
                              ? "bg-gray-400 text-white cursor-not-allowed"
                              : "bg-gradient-to-r from-rcfs-blue to-blue-700 text-white shadow-xl shadow-rcfs-blue/30 hover:shadow-rcfs-blue/50 hover:-translate-y-0.5 active:translate-y-0"
                            }`}
                        >
                          {isLoading ? (
                            <>
                              <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                              Generating Code...
                            </>
                          ) : (
                            <>
                              <Shield size={18} />
                              Pay Le {actualAmount.toLocaleString()}
                            </>
                          )}
                        </button>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-[10px] md:text-xs text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5 text-green-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Secured by Monime Payments</span>
                      </div>
                    </div>
                  </div>

                  {/* Hidden fields */}
                  <input type="hidden" name="amount" value={actualAmount} />
                  <input type="hidden" name="provider" value={selectedProvider} />
                </form>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: "Secure" },
                { icon: Smartphone, label: "Mobile" },
                { icon: Heart, label: "Direct" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-white rounded-xl border border-gray-100 text-xs text-gray-500"
                >
                  <item.icon size={14} className="text-rcfs-blue" />
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Donations */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="section-header">
            <h2 className="section-title">Need Help?</h2>
            <div className="divider" />
            <p className="section-subtitle">
              Contact our team for assistance with donations or sponsorship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
            <div className="card p-5 md:p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Heart className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">
                  Donation Help
                </h3>
                <p className="text-gray-500 text-xs md:text-sm mb-2">
                  Questions about making a donation?
                </p>
                <a href="mailto:freetownsunset21@gmail.com" className="text-rcfs-blue text-xs md:text-sm font-medium hover:underline flex items-center gap-1">
                  freetownsunset21@gmail.com
                  <ChevronRight size={14} />
                </a>
              </div>
            </div>

            <div className="card p-5 md:p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Building className="text-rcfs-gold" size={20} />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">
                  Sponsorship
                </h3>
                <p className="text-gray-500 text-xs md:text-sm mb-2">
                  Corporate partnership opportunities
                </p>
                <a href="tel:+23276845903" className="text-rcfs-blue text-xs md:text-sm font-medium hover:underline flex items-center gap-1">
                  +232 76 845 903
                  <ChevronRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-rcfs-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rcfs-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rcfs-magenta rounded-full blur-3xl" />
        </div>
        <div className="container-custom text-center relative">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
            Every Donation Makes a Difference
          </h2>
          <p className="text-base md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed text-white/90">
            Your support empowers young leaders to make a lasting impact in
            Sierra Leone.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link
              href="/contact"
              className="btn bg-white text-rcfs-blue hover:bg-gray-100 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 font-semibold shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Contact Us
            </Link>
            <Link
              href="/membership"
              className="btn border-2 border-white/70 text-white hover:bg-white hover:text-rcfs-blue text-base md:text-lg px-6 md:px-8 py-3 md:py-4 transition-all"
            >
              Become a Member
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function DonatePage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-rcfs-blue/20 border-t-rcfs-blue rounded-full animate-spin" />
        </div>
      }
    >
      <DonatePageContent />
    </React.Suspense>
  )
}
