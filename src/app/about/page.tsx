"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Users, Target, Award, Globe, Heart, Lightbulb } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Service",
    description:
      "We are committed to serving our community and addressing local needs through impactful projects.",
  },
  {
    icon: Users,
    title: "Fellowship",
    description:
      "Building lasting friendships and professional networks among young leaders.",
  },
  {
    icon: Lightbulb,
    title: "Leadership",
    description:
      "Developing leadership skills and empowering young professionals to create positive change.",
  },
  {
    icon: Globe,
    title: "International Understanding",
    description:
      "Promoting peace and cultural exchange through global connections and partnerships.",
  },
]

const leadership = [
  {
    name: "John Doe",
    position: "President",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/84fbc412-e03a-4332-aa39-eefff0f82432.JPG-c7TMT72VEd9OPqzSmnc6hB5fSwZYmR.jpeg",
    bio: "Leading our club with passion and dedication to community service.",
  },
  {
    name: "Jane Smith",
    position: "Vice President",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5a25d605-2641-4917-b96f-a16c2138e5f3.JPG-SPYwb4CXFyefj4AhXTXUQUUE1XxH99.jpeg",
    bio: "Supporting our mission through strategic planning and member engagement.",
  },
  {
    name: "Mike Johnson",
    position: "Secretary",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/69c58881-d67a-406e-90cb-83ee422205fc.JPG-668bYka71jdvl0ZqsxAlqtbbVX3j27.jpeg",
    bio: "Ensuring effective communication and documentation of our activities.",
  },
]

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      {/* About Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                About Our Club
              </h1>
              <div className="divider mb-4 md:mb-6" style={{ marginLeft: 0 }} />
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed">
                The Rotaract Club of Freetown Sunset is a dynamic organization
                of young professionals dedicated to creating positive change in
                Sierra Leone and beyond. As part of Rotary International
                District 9101, we embody the motto &quot;Service Above
                Self&quot; through meaningful community projects and leadership
                development.
              </p>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                Founded with the vision of empowering young leaders, our club
                serves as a platform for professional growth, community service,
                and international understanding.
              </p>
              <Link
                href="/membership"
                className="btn btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 inline-block"
              >
                Join Our Mission
              </Link>
            </div>
            <div className="relative order-first lg:order-last">
              <div className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5a25d605-2641-4917-b96f-a16c2138e5f3.JPG-SPYwb4CXFyefj4AhXTXUQUUE1XxH99.jpeg"
                  alt="Rotaract Club Members"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-white p-4 md:p-6 rounded-xl shadow-lg max-w-[200px] md:max-w-xs">
                <h4 className="font-bold text-rcfs-blue mb-1 md:mb-2 text-sm md:text-base">
                  District 9101
                </h4>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  Proudly serving Sierra Leone as part of Rotary
                  International&apos;s global network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="card p-6 md:p-8">
              <div className="flex items-center mb-4 md:mb-6">
                <Target className="text-rcfs-blue mr-3 md:mr-4 flex-shrink-0" size={40} />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Our Mission
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                To provide opportunities for young people to enhance their
                knowledge and skills, develop leadership qualities, and address
                the physical and social needs of their communities while
                promoting better relations between all people worldwide.
              </p>
            </div>

            <div className="card p-6 md:p-8">
              <div className="flex items-center mb-4 md:mb-6">
                <Award className="text-rcfs-magenta mr-3 md:mr-4 flex-shrink-0" size={40} />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Our Vision
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                To be a leading force in developing young leaders who are
                committed to creating positive change in Sierra Leone and
                contributing to a more peaceful and prosperous world through
                service and international understanding.
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
            <div className="divider" />
            <p className="section-subtitle">
              The core principles that guide our actions and define our
              commitment to service and leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="card card-hover text-center p-6 md:p-8"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-rcfs-blue to-rcfs-magenta rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                  <value.icon className="text-white" size={28} />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {value.description}
                </p>
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
            <div className="divider" />
            <p className="section-subtitle">
              Meet the dedicated leaders who guide our club&apos;s mission and
              drive our community impact.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {leadership.map((leader, index) => (
              <div
                key={index}
                className="card card-hover text-center p-6 md:p-8"
              >
                <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-6">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover rounded-full shadow-lg"
                    sizes="128px"
                  />
                  <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 w-7 h-7 md:w-8 md:h-8 bg-rcfs-gold rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-xs md:text-sm">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">
                  {leader.name}
                </h3>
                <p className="text-rcfs-blue font-medium mb-3 md:mb-4 text-sm md:text-base">
                  {leader.position}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>
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
            Join Our Community
          </h2>
          <p className="text-base md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed text-white/90">
            Be part of a movement that&apos;s creating positive change in Sierra
            Leone. Together, we can build a better future through service,
            leadership, and international understanding.
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
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
