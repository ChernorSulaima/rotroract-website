"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react"
import { useNotification } from "@/components/NotificationProvider"

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const { showNotification } = useNotification()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const upcomingEvents = [
    {
      id: 1,
      title: "Community Health Outreach",
      date: "2024-02-15",
      time: "9:00 AM - 4:00 PM",
      location: "Wilberforce Community Center",
      description:
        "Join us for a comprehensive health screening and awareness program for the local community. We'll provide free health checks, distribute health education materials, and connect residents with healthcare resources.",
      image: "/hero-3.png",
      category: "Community Service",
      attendees: 45,
      isRegistrationOpen: true,
    },
    {
      id: 2,
      title: "Professional Development Workshop",
      date: "2024-02-22",
      time: "6:00 PM - 8:00 PM",
      location: "Manley's Hall, Wilberforce",
      description:
        "Enhance your leadership and professional skills in this interactive workshop. Topics include effective communication, project management, and career development strategies for young professionals.",
      image: "/hero-2.png",
      category: "Professional Development",
      attendees: 30,
      isRegistrationOpen: true,
    },
    {
      id: 3,
      title: "Environmental Cleanup Drive",
      date: "2024-03-01",
      time: "8:00 AM - 12:00 PM",
      location: "Aberdeen Beach",
      description:
        "Help us protect our environment by participating in our monthly beach cleanup. We'll provide all necessary equipment and refreshments.",
      image: "/hero-1.png",
      category: "Environmental",
      attendees: 25,
      isRegistrationOpen: true,
    },
  ]

  const pastEvents = [
    {
      id: 4,
      title: "Back to School Initiative 2023",
      date: "2023-09-15",
      time: "10:00 AM - 3:00 PM",
      location: "Various Schools in Freetown",
      description:
        "Successfully distributed school supplies, uniforms, and educational materials to over 200 underprivileged children across 5 schools in Freetown.",
      image: "/hero-1.png",
      category: "Education",
      attendees: 50,
      impact: "200+ children supported",
    },
    {
      id: 5,
      title: "End Polio Now Campaign",
      date: "2023-10-24",
      time: "8:00 AM - 5:00 PM",
      location: "Central Freetown",
      description:
        "Organized a city-wide awareness campaign about polio prevention and vaccination. Our team distributed educational materials and supported vaccination drives.",
      image: "/hero-3.png",
      category: "Health",
      attendees: 75,
      impact: "1000+ people reached",
    },
    {
      id: 6,
      title: "Youth Leadership Summit",
      date: "2023-11-18",
      time: "9:00 AM - 6:00 PM",
      location: "Freetown International Conference Center",
      description:
        "Hosted a comprehensive leadership development summit for young professionals across Sierra Leone.",
      image: "/hero-2.png",
      category: "Leadership",
      attendees: 120,
      impact: "80+ young leaders trained",
    },
  ]

  const handleRegistration = (eventTitle: string) => {
    showNotification(
      "success",
      `Registration interest noted for "${eventTitle}". We'll contact you with details!`
    )
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
      "Community Service": "bg-rcfs-blue",
      "Professional Development": "bg-rcfs-gold",
      Environmental: "bg-green-500",
      Education: "bg-purple-500",
      Health: "bg-red-500",
      Leadership: "bg-rcfs-magenta",
    }
    return colors[category] || "bg-gray-500"
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
              {upcomingEvents.map((event) => (
                <div key={event.id} className="card card-hover overflow-hidden">
                  <div className="grid lg:grid-cols-3 gap-0">
                    <div className="lg:col-span-1 relative h-48 sm:h-56 lg:h-full min-h-[200px]">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    </div>
                    <div className="lg:col-span-2 p-5 md:p-8">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3 md:mb-4">
                        <div>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-2 md:mb-3 ${getCategoryColor(
                              event.category
                            )}`}
                          >
                            {event.category}
                          </span>
                          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">
                            {event.title}
                          </h3>
                        </div>
                        {event.isRegistrationOpen && (
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
                            Open
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="mr-2 text-rcfs-blue flex-shrink-0" size={16} />
                          <span className="truncate">{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 text-rcfs-blue flex-shrink-0" size={16} />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 text-rcfs-blue flex-shrink-0" size={16} />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base line-clamp-3">
                        {event.description}
                      </p>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="mr-2" size={16} />
                          <span>{event.attendees} registered</span>
                        </div>
                        <button
                          onClick={() => handleRegistration(event.title)}
                          className="btn btn-primary flex items-center text-sm md:text-base w-full sm:w-auto justify-center"
                        >
                          Register Interest
                          <ArrowRight className="ml-2" size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "past" && (
            <div className="space-y-6 md:space-y-8">
              {pastEvents.map((event) => (
                <div key={event.id} className="card overflow-hidden">
                  <div className="grid lg:grid-cols-3 gap-0">
                    <div className="lg:col-span-1 relative h-48 sm:h-56 lg:h-full min-h-[200px]">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    </div>
                    <div className="lg:col-span-2 p-5 md:p-8">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3 md:mb-4">
                        <div>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-2 md:mb-3 ${getCategoryColor(
                              event.category
                            )}`}
                          >
                            {event.category}
                          </span>
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
                        <div className="flex items-center">
                          <Clock className="mr-2 text-rcfs-blue flex-shrink-0" size={16} />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 text-rcfs-blue flex-shrink-0" size={16} />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base line-clamp-3">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center text-gray-500">
                          <Users className="mr-2" size={16} />
                          <span>{event.attendees} participants</span>
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
    </div>
  )
}
