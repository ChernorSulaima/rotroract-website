"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react"
import { useNotification } from "@/components/NotificationProvider"
import { submitEventRegistration } from "@/app/actions"

// Types matching the Sanity event schema
export interface SanityEvent {
  _id: string
  title: string
  slug?: { current: string }
  date: string
  endDate?: string
  time?: string
  location?: string
  description?: string
  imageUrl?: string
  category?: string
  attendees?: number
  isFeatured?: boolean
  status?: string
  impact?: string
  registrationCount: number
}

interface EventsPageClientProps {
  upcomingEvents: SanityEvent[]
  pastEvents: SanityEvent[]
}

export default function EventsPageClient({ upcomingEvents, pastEvents }: EventsPageClientProps) {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [selectedEvent, setSelectedEvent] = useState<SanityEvent | null>(null)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showNotification } = useNotification()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const isEventPassed = (dateString: string) => {
    const eventDate = new Date(dateString)
    const now = new Date()
    eventDate.setHours(23, 59, 59, 999)
    return now > eventDate
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegistrationClick = (event: SanityEvent) => {
    setSelectedEvent(event)
  }

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedEvent) return
    setIsSubmitting(true)

    const result = await submitEventRegistration({
      eventId: selectedEvent._id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    })

    if (result.success) {
      showNotification(
        "success",
        `Registration interest noted for "${selectedEvent.title}". We'll contact you with details!`
      )
      setSelectedEvent(null)
      setFormData({ name: "", email: "", phone: "" })
    } else {
      showNotification(
        "error",
        "Failed to register for the event. Please try again."
      )
    }

    setIsSubmitting(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "community": "bg-rcfs-blue",
      "Community Service": "bg-rcfs-blue",
      "professional": "bg-rcfs-gold",
      "Professional Development": "bg-rcfs-gold",
      "social": "bg-green-500",
      "Environmental": "bg-green-500",
      "fundraising": "bg-purple-500",
      "Education": "bg-purple-500",
      "meeting": "bg-gray-500",
      "Health": "bg-red-500",
      "Leadership": "bg-rcfs-magenta",
    }
    return colors[category] || "bg-gray-500"
  }

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      "community": "Community Service",
      "professional": "Professional Development",
      "social": "Social",
      "fundraising": "Fundraising",
      "meeting": "Meeting",
    }
    return labels[category] || category
  }

  return (
    <div>
      {/* Events Navigation */}
      <section className="py-6 md:py-8 bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
                Our Events
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Discover opportunities to get involved and make a difference
              </p>
            </div>
            <div className="flex bg-gray-100 rounded-xl p-1 self-stretch sm:self-auto">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`flex-1 sm:flex-none px-5 md:px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "upcoming"
                  ? "bg-rcfs-blue text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`flex-1 sm:flex-none px-5 md:px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "past"
                  ? "bg-rcfs-blue text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                Past Events
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Content */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {activeTab === "upcoming" && (
            <div className="space-y-6 md:space-y-8">
              {upcomingEvents.length === 0 && (
                <div className="text-center py-16">
                  <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
                  <h3 className="text-xl font-semibold text-gray-500 mb-2">No upcoming events</h3>
                  <p className="text-gray-400">Check back soon for new events!</p>
                </div>
              )}
              {upcomingEvents.map((event) => (
                <div key={event._id} className="card card-hover overflow-hidden">
                  <div className="grid lg:grid-cols-3 gap-0">
                    <div className="lg:col-span-1 relative h-48 sm:h-56 lg:h-full min-h-[200px]">
                      {event.imageUrl ? (
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <Calendar className="text-gray-400" size={48} />
                        </div>
                      )}
                    </div>
                    <div className="lg:col-span-2 p-5 md:p-8">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3 md:mb-4">
                        <div>
                          {event.category && (
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-2 md:mb-3 ${getCategoryColor(
                                event.category
                              )}`}
                            >
                              {getCategoryLabel(event.category)}
                            </span>
                          )}
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">
                            {event.title}
                          </h3>
                        </div>
                        {!isEventPassed(event.date) ? (
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
                            Open
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
                            Event Passed
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="mr-2 text-rcfs-blue flex-shrink-0" size={16} />
                          <span className="truncate">{formatDate(event.date)}</span>
                        </div>
                        {event.time && (
                          <div className="flex items-center">
                            <Clock className="mr-2 text-rcfs-blue flex-shrink-0" size={16} />
                            <span>{event.time}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center">
                            <MapPin className="mr-2 text-rcfs-blue flex-shrink-0" size={16} />
                            <span className="truncate">{event.location}</span>
                          </div>
                        )}
                      </div>

                      {event.description && (
                        <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base line-clamp-3">
                          {event.description}
                        </p>
                      )}

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="mr-2" size={16} />
                          <span>{event.registrationCount} registered</span>
                        </div>
                        {!isEventPassed(event.date) ? (
                          <button
                            onClick={() => handleRegistrationClick(event)}
                            className="btn btn-primary flex items-center text-sm md:text-base w-full sm:w-auto justify-center"
                          >
                            Register Interest
                            <ArrowRight className="ml-2" size={16} />
                          </button>
                        ) : (
                          <span className="text-sm text-gray-400 italic">
                            Registration closed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "past" && (
            <div className="space-y-6 md:space-y-8">
              {pastEvents.length === 0 && (
                <div className="text-center py-16">
                  <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
                  <h3 className="text-xl font-semibold text-gray-500 mb-2">No past events</h3>
                  <p className="text-gray-400">Events will appear here after they&apos;ve concluded.</p>
                </div>
              )}
              {pastEvents.map((event) => (
                <div key={event._id} className="card overflow-hidden">
                  <div className="grid lg:grid-cols-3 gap-0">
                    <div className="lg:col-span-1 relative h-48 sm:h-56 lg:h-full min-h-[200px]">
                      {event.imageUrl ? (
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <Calendar className="text-gray-400" size={48} />
                        </div>
                      )}
                    </div>
                    <div className="lg:col-span-2 p-5 md:p-8">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3 md:mb-4">
                        <div>
                          {event.category && (
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-2 md:mb-3 ${getCategoryColor(
                                event.category
                              )}`}
                            >
                              {getCategoryLabel(event.category)}
                            </span>
                          )}
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">
                            {event.title}
                          </h3>
                        </div>
                        <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">
                          Completed
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="mr-2 text-rcfs-blue flex-shrink-0" size={16} />
                          <span className="truncate">{formatDate(event.date)}</span>
                        </div>
                        {event.time && (
                          <div className="flex items-center">
                            <Clock className="mr-2 text-rcfs-blue flex-shrink-0" size={16} />
                            <span>{event.time}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center">
                            <MapPin className="mr-2 text-rcfs-blue flex-shrink-0" size={16} />
                            <span className="truncate">{event.location}</span>
                          </div>
                        )}
                      </div>

                      {event.description && (
                        <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base line-clamp-3">
                          {event.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center text-gray-500">
                          <Users className="mr-2" size={16} />
                          <span>{event.registrationCount > 0 ? event.registrationCount : event.attendees || 0} participants</span>
                        </div>
                        {event.impact && (
                          <div className="text-rcfs-blue font-semibold bg-blue-50 px-3 py-1 rounded-full text-xs">
                            {event.impact}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-rcfs-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rcfs-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rcfs-magenta rounded-full blur-3xl" />
        </div>
        <div className="container-custom text-center relative">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
            Get Involved
          </h2>
          <p className="text-base md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed text-white/90">
            Join us in our upcoming events and be part of the positive change
            we&apos;re creating in our community!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link
              href="/membership"
              className="btn bg-white text-rcfs-blue hover:bg-gray-100 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 font-semibold shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Become a Member
            </Link>
            <Link
              href="/contact"
              className="btn border-2 border-white/70 text-white hover:bg-white hover:text-rcfs-blue text-base md:text-lg px-6 md:px-8 py-3 md:py-4 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Register Interest
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Fill out the form below to register your interest for <span className="font-semibold text-gray-900">{selectedEvent.title}</span>.
              </p>

              <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rcfs-blue/20 focus:border-rcfs-blue transition-all outline-none"
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
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rcfs-blue/20 focus:border-rcfs-blue transition-all outline-none"
                    placeholder="you@example.com"
                  />
                </div>

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

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(null)}
                    className="flex-1 btn btn-outline border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 btn btn-primary px-4 py-3 disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Confirm"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
