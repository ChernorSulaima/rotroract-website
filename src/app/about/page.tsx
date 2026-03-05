"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Users, Target, Award, Globe, Heart, Lightbulb } from "lucide-react"
import Navigation from "@/components/Navigation"
import { NotificationProvider } from "@/components/NotificationProvider"

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const values = [
    {
      icon: Heart,
      title: "Service",
      description: "We are committed to serving our community and addressing local needs through impactful projects.",
    },
    {
      icon: Users,
      title: "Fellowship",
      description: "Building lasting friendships and professional networks among young leaders.",
    },
    {
      icon: Lightbulb,
      title: "Leadership",
      description: "Developing leadership skills and empowering young professionals to create positive change.",
    },
    {
      icon: Globe,
      title: "International Understanding",
      description: "Promoting peace and cultural exchange through global connections and partnerships.",
    },
  ]

  const leadership = [
    {
      name: "John Doe",
      position: "President",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/84fbc412-e03a-4332-aa39-eefff0f82432.JPG-c7TMT72VEd9OPqzSmnc6hB5fSwZYmR.jpeg",
      bio: "Leading our club with passion and dedication to community service.",
    },
    {
      name: "Jane Smith",
      position: "Vice President",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5a25d605-2641-4917-b96f-a16c2138e5f3.JPG-SPYwb4CXFyefj4AhXTXUQUUE1XxH99.jpeg",
      bio: "Supporting our mission through strategic planning and member engagement.",
    },
    {
      name: "Mike Johnson",
      position: "Secretary",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/69c58881-d67a-406e-90cb-83ee422205fc.JPG-668bYka71jdvl0ZqsxAlqtbbVX3j27.jpeg",
      bio: "Ensuring effective communication and documentation of our activities.",
    },
  ]

  return (
    <NotificationProvider>
      <div className="min-h-screen">
        <Navigation />
        <main>
          <div className="pt-20">
            {/* About Introduction */}
            <section className="section-padding bg-white">
              <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">About Our Club</h1>
                    <div className="divider mb-6" style={{ marginLeft: 0 }}></div>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      The Rotaract Club of Freetown Sunset is a dynamic organization of young professionals dedicated to
                      creating positive change in Sierra Leone and beyond. As part of Rotary International District
                      9101, we embody the motto "Service Above Self" through meaningful community projects and
                      leadership development.
                    </p>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      Founded with the vision of empowering young leaders, our club serves as a platform for
                      professional growth, community service, and international understanding. We believe in the power
                      of collective action to address local challenges and create lasting impact.
                    </p>
                    <Link href="/membership" className="btn btn-primary text-lg px-8 py-4">
                      Join Our Mission
                    </Link>
                  </div>
                  <div className="relative">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5a25d605-2641-4917-b96f-a16c2138e5f3.JPG-SPYwb4CXFyefj4AhXTXUQUUE1XxH99.jpeg"
                      alt="Rotaract Club Members"
                      className="rounded-xl shadow-2xl w-full h-96 object-cover"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg max-w-xs">
                      <h4 className="font-bold text-rcfs-blue mb-2">District 9101</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Proudly serving Sierra Leone as part of Rotary International's global network.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Mission & Vision */}
            <section className="section-padding bg-gray-50">
              <div className="container-custom">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="card p-8">
                    <div className="flex items-center mb-6">
                      <Target className="text-rcfs-blue mr-4" size={48} />
                      <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      To provide opportunities for young people to enhance their knowledge and skills, develop
                      leadership qualities, and address the physical and social needs of their communities while
                      promoting better relations between all people worldwide.
                    </p>
                  </div>

                  <div className="card p-8">
                    <div className="flex items-center mb-6">
                      <Award className="text-rcfs-magenta mr-4" size={48} />
                      <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      To be a leading force in developing young leaders who are committed to creating positive change in
                      Sierra Leone and contributing to a more peaceful and prosperous world through service and
                      international understanding.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Our Values */}
            <section className="section-padding bg-white">
              <div className="container-custom">
                <div className="section-header">
                  <h2 className="section-title">Our Values</h2>
                  <div className="divider"></div>
                  <p className="section-subtitle">
                    The core principles that guide our actions and define our commitment to service and leadership.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {values.map((value, index) => (
                    <div key={index} className="card card-hover text-center p-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-rcfs-blue to-rcfs-magenta rounded-full flex items-center justify-center mx-auto mb-6">
                        <value.icon className="text-white" size={32} />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Leadership Team */}
            <section className="section-padding bg-gray-50">
              <div className="container-custom">
                <div className="section-header">
                  <h2 className="section-title">Our Leadership Team</h2>
                  <div className="divider"></div>
                  <p className="section-subtitle">
                    Meet the dedicated leaders who guide our club's mission and drive our community impact.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {leadership.map((leader, index) => (
                    <div key={index} className="card card-hover text-center p-8">
                      <div className="relative w-32 h-32 mx-auto mb-6">
                        <img
                          src={leader.image || "/placeholder.svg"}
                          alt={leader.name}
                          className="w-full h-full object-cover rounded-full shadow-lg"
                        />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-rcfs-gold rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{leader.name}</h3>
                      <p className="text-rcfs-blue font-medium mb-4">{leader.position}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{leader.bio}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="section-padding rcfs-gradient text-white">
              <div className="container-custom text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Join Our Community</h2>
                <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
                  Be part of a movement that's creating positive change in Sierra Leone. Together, we can build a better
                  future through service, leadership, and international understanding.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/membership" className="btn bg-white text-rcfs-blue hover:bg-gray-100 text-lg px-8 py-4">
                    Become a Member
                  </Link>
                  <Link
                    href="/contact"
                    className="btn border-2 border-white text-white hover:bg-white hover:text-rcfs-blue text-lg px-8 py-4"
                  >
                    Get in Touch
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

export default AboutPage
