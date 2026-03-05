"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Users, Heart, Globe, Award } from "lucide-react"

const heroSlides = [
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5a25d605-2641-4917-b96f-a16c2138e5f3.JPG-SPYwb4CXFyefj4AhXTXUQUUE1XxH99.jpeg",
    title: "Service Above Self",
    subtitle: "Empowering young professionals to create positive change in their communities across Sierra Leone",
    cta1: { text: "Join Our Mission", href: "/membership" },
    cta2: { text: "Learn More About Us", href: "/about" },
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/69c58881-d67a-406e-90cb-83ee422205fc.JPG-668bYka71jdvl0ZqsxAlqtbbVX3j27.jpeg",
    title: "Building Tomorrow's Leaders",
    subtitle: "Developing leadership skills and fostering international understanding among young professionals",
    cta1: { text: "Become a Member", href: "/membership" },
    cta2: { text: "View Our Events", href: "/events" },
  },
  {
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/84fbc412-e03a-4332-aa39-eefff0f82432.JPG-c7TMT72VEd9OPqzSmnc6hB5fSwZYmR.jpeg",
    title: "Making a Difference Together",
    subtitle: "Join us in creating lasting impact through community service and professional development",
    cta1: { text: "Get Involved", href: "/contact" },
    cta2: { text: "See Our Impact", href: "/gallery" },
  },
]

const impactStats = [
  { icon: Users, number: "150+", label: "Active Members" },
  { icon: Heart, number: "50+", label: "Community Projects" },
  { icon: Globe, number: "25+", label: "Communities Served" },
  { icon: Award, number: "10+", label: "Awards Received" },
]

const focusAreas = [
  {
    title: "Community Service",
    description: "Addressing local needs through sustainable projects that create lasting positive change.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e7d1165e-2ed2-414f-81dc-4ec276bd5558.JPG-vGV2zamb4h7gpQriqkjUESo4yYK3ml.jpeg",
    color: "bg-rcfs-blue",
  },
  {
    title: "Professional Development",
    description: "Building leadership skills and fostering career growth among young professionals.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/84fbc412-e03a-4332-aa39-eefff0f82432.JPG-c7TMT72VEd9OPqzSmnc6hB5fSwZYmR.jpeg",
    color: "bg-rcfs-gold",
  },
  {
    title: "International Understanding",
    description: "Promoting peace and cultural exchange through global connections and partnerships.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5a25d605-2641-4917-b96f-a16c2138e5f3.JPG-SPYwb4CXFyefj4AhXTXUQUUE1XxH99.jpeg",
    color: "bg-rcfs-magenta",
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <div>
      {/* Hero Section - Properly Centered */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50" />
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="text-center text-white px-4 max-w-6xl mx-auto">
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
                        {slide.title}
                      </h1>
                      <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in-up">
                        {slide.subtitle}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
                        <Link href={slide.cta1.href} className="btn btn-primary text-lg px-8 py-4">
                          {slide.cta1.text}
                        </Link>
                        <Link
                          href={slide.cta2.href}
                          className="btn btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900"
                        >
                          {slide.cta2.text}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-rcfs-gold transition-colors z-20"
                aria-label="Previous slide"
              >
                <ChevronLeft size={48} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-rcfs-gold transition-colors z-20"
                aria-label="Next slide"
              >
                <ChevronRight size={48} />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </section>

            {/* Impact Stats */}
            <section className="section-padding bg-gray-50">
              <div className="container-custom">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {impactStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-rcfs-blue text-white rounded-full mb-4">
                        <stat.icon size={32} />
                      </div>
                      <div className="text-3xl lg:text-4xl font-bold text-rcfs-blue mb-2">{stat.number}</div>
                      <div className="text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Focus Areas */}
            <section className="section-padding">
              <div className="container-custom">
                <div className="section-header">
                  <h2 className="section-title">Our Focus Areas</h2>
                  <div className="divider"></div>
                  <p className="section-subtitle">
                    We focus on three key areas that drive meaningful change in our communities and develop the next
                    generation of leaders.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {focusAreas.map((area, index) => (
                    <div key={index} className="card card-hover">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={area.image || "/placeholder.svg"}
                          alt={area.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div
                          className={`absolute top-4 left-4 w-12 h-12 ${area.color} rounded-full flex items-center justify-center`}
                        >
                          <span className="text-white font-bold text-lg">{index + 1}</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{area.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{area.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="section-padding bg-rcfs-blue text-white">
              <div className="container-custom text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
                <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                  Join our community of young professionals dedicated to creating positive change in Sierra Leone and
                  beyond.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/membership" className="btn btn-secondary text-lg px-8 py-4">
                    Become a Member
                  </Link>
                  <Link
                    href="/contact"
                    className="btn btn-outline border-white text-white hover:bg-white hover:text-rcfs-blue text-lg px-8 py-4"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
      </section>
    </div>
  )
}
