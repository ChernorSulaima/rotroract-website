"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react"
import Navigation from "@/components/Navigation"
import { NotificationProvider, useNotification } from "@/components/NotificationProvider"

const EventsPage = () => {
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
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/69c58881-d67a-406e-90cb-83ee422205fc.JPG-668bYka71jdvl0ZqsxAlqtbbVX3j27.jpeg",
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
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/84fbc412-e03a-4332-aa39-eefff0f82432.JPG-c7TMT72VEd9OPqzSmnc6hB5fSwZYmR.jpeg",
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
        "Help us protect our environment by participating in our monthly beach cleanup. We'll provide all necessary equipment and refreshments. This is a great opportunity to make a direct impact on our local environment.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e7d1165e-2ed2-414f-81dc-4ec276bd5558.JPG-vGV2zamb4h7gpQriqkjUESo4yYK3ml.jpeg",
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
        "Successfully distributed school supplies, uniforms, and educational materials to over 200 underprivileged children across 5 schools in Freetown. This initiative helped ensure that children could start the new academic year with the necessary tools for learning.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/child%20image.jpg-k30ptNMgI2eg80pOn4odjKGwftD4fR.jpeg",
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
        "Organized a city-wide awareness campaign about polio prevention and vaccination. Our team distributed educational materials, conducted community talks, and supported vaccination drives in partnership with local health authorities.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/69c58881-d67a-406e-90cb-83ee422205fc.JPG-668bYka71jdvl0ZqsxAlqtbbVX3j27.jpeg",
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
        "Hosted a comprehensive leadership development summit for young professionals across Sierra Leone. The event featured keynote speakers, workshops, and networking sessions focused on developing the next generation of leaders.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5a25d605-2641-4917-b96f-a16c2138e5f3.JPG-SPYwb4CXFyefj4AhXTXUQUUE1XxH99.jpeg",
      category: "Leadership",
      attendees: 120,
      impact: "80+ young leaders trained",
    },
  ]

  const handleRegistration = (eventTitle: string) => {
    showNotification("success", `Registration interest noted for "${eventTitle}". We'll contact you with details!`)
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
    const colors = {
      "Community Service": "bg-rcfs-blue",
      "Professional Development": "bg-rcfs-gold",
      Environmental: "bg-green-500",
      Education: "bg-purple-500",
      Health: "bg-red-500",
      Leadership: "bg-rcfs-magenta",
    }
    return colors[category as keyof typeof colors] || "bg-gray-500"
  }

  return (
    <NotificationProvider>
      <div className="min-h-screen">
        <Navigation />
        <main>
          <div className="pt-20">
            {/* Events Navigation */}
            <section className="py-8 bg-white border-b border-gray-200">
              <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Our Events</h1>
                    <p className="text-gray-600">
                      Discover opportunities to get involved and make a difference in our community
                    </p>
                  </div>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setActiveTab("upcoming")}
                      className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                        activeTab === "upcoming"
                          ? "bg-rcfs-blue text-white shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Upcoming Events
                    </button>
                    <button
                      onClick={() => setActiveTab("past")}
                      className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                        activeTab === "past" ? "bg-rcfs-blue text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
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
                  <div className="space-y-8">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="card card-hover overflow-hidden">
                        <div className="grid lg:grid-cols-3 gap-0">
                          <div className="lg:col-span-1">
                            <img
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              className="w-full h-64 lg:h-full object-cover"
                            />
                          </div>
                          <div className="lg:col-span-2 p-8">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <span
                                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-3 ${getCategoryColor(
                                    event.category,
                                  )}`}
                                >
                                  {event.category}
                                </span>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                              </div>
                              {event.isRegistrationOpen && (
                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                                  Registration Open
                                </span>
                              )}
                            </div>

                            <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="mr-2 text-rcfs-blue" size={16} />
                                <span>{formatDate(event.date)}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="mr-2 text-rcfs-blue" size={16} />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="mr-2 text-rcfs-blue" size={16} />
                                <span>{event.location}</span>
                              </div>
                            </div>

                            <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-sm text-gray-500">
                                <Users className="mr-2" size={16} />
                                <span>{event.attendees} registered</span>
                              </div>
                              <button onClick={() => handleRegistration(event.title)} className="btn btn-primary">
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
                  <div className="space-y-8">
                    {pastEvents.map((event) => (
                      <div key={event.id} className="card overflow-hidden">
                        <div className="grid lg:grid-cols-3 gap-0">
                          <div className="lg:col-span-1">
                            <img
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              className="w-full h-64 lg:h-full object-cover"
                            />
                          </div>
                          <div className="lg:col-span-2 p-8">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <span
                                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-3 ${getCategoryColor(
                                    event.category,
                                  )}`}
                                >
                                  {event.category}
                                </span>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                              </div>
                              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                                Completed
                              </span>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="mr-2 text-rcfs-blue" size={16} />
                                <span>{formatDate(event.date)}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="mr-2 text-rcfs-blue" size={16} />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="mr-2 text-rcfs-blue" size={16} />
                                <span>{event.location}</span>
                              </div>
                            </div>

                            <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-6 text-sm">
                                <div className="flex items-center text-gray-500">
                                  <Users className="mr-2" size={16} />
                                  <span>{event.attendees} participants</span>
                                </div>
                                {event.impact && (
                                  <div className="text-rcfs-blue font-medium">Impact: {event.impact}</div>
                                )}
                              </div>
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
            <section className="section-padding rcfs-gradient text-white">
              <div className="container-custom text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Get Involved</h2>
                <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
                  Join us in our upcoming events and be part of the positive change we're creating in our community.
                  Every participation makes a difference!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/membership" className="btn bg-white text-rcfs-blue hover:bg-gray-100 text-lg px-8 py-4">
                    Become a Member
                  </Link>
                  <Link
                    href="/contact"
                    className="btn border-2 border-white text-white hover:bg-white hover:text-rcfs-blue text-lg px-8 py-4"
                  >
                    Contact Us
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

export default EventsPage
