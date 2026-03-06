"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Users, Heart, Globe, Award } from "lucide-react"

const heroSlides = [
  {
    image: "/hero-1.png",
    title: "Service Above Self",
    subtitle:
      "Empowering young professionals to create positive change in their communities across Sierra Leone",
    cta1: { text: "Join Our Mission", href: "/membership" },
    cta2: { text: "Learn More", href: "/about" },
  },
  {
    image: "/hero-2.png",
    title: "Building Tomorrow's Leaders",
    subtitle:
      "Developing leadership skills and fostering international understanding among young professionals",
    cta1: { text: "Become a Member", href: "/membership" },
    cta2: { text: "View Events", href: "/events" },
  },
  {
    image: "/hero-3.png",
    title: "Making a Difference Together",
    subtitle:
      "Join us in creating lasting impact through community service and professional development",
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
    description:
      "Addressing local needs through sustainable projects that create lasting positive change.",
    image: "/hero-3.png",
    color: "bg-rcfs-blue",
  },
  {
    title: "Professional Development",
    description:
      "Building leadership skills and fostering career growth among young professionals.",
    image: "/hero-2.png",
    color: "bg-rcfs-gold",
  },
  {
    title: "International Understanding",
    description:
      "Promoting peace and cultural exchange through global connections and partnerships.",
    image: "/hero-1.png",
    color: "bg-rcfs-magenta",
  },
]

// Animated counter hook
function useCountUp(target: string, duration: number = 2000, startCounting: boolean = false) {
  const [count, setCount] = useState(0)
  const numericTarget = parseInt(target.replace(/[^0-9]/g, ""), 10)

  useEffect(() => {
    if (!startCounting) return
    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      setCount(Math.floor(eased * numericTarget))
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [numericTarget, duration, startCounting])

  return count
}

function StatCard({ stat, index }: { stat: typeof impactStats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const suffix = stat.number.replace(/[0-9]/g, "")
  const count = useCountUp(stat.number, 2000, isVisible)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="text-center group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-rcfs-blue text-white rounded-2xl mb-3 md:mb-4 shadow-lg shadow-rcfs-blue/20 group-hover:scale-110 transition-transform duration-300">
        <stat.icon size={28} className="md:w-8 md:h-8" />
      </div>
      <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-rcfs-blue mb-1 md:mb-2 tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-gray-600 font-medium text-sm md:text-base">{stat.label}</div>
    </div>
  )
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return
      setIsTransitioning(true)
      setCurrentSlide(index)
      setTimeout(() => setIsTransitioning(false), 1000)
    },
    [isTransitioning]
  )

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % heroSlides.length)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)
  }, [currentSlide, goToSlide])

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [nextSlide])

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const diff = touchStartX.current - touchEndX.current
    const minSwipe = 50
    if (Math.abs(diff) > minSwipe) {
      if (diff > 0) nextSlide()
      else prevSlide()
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[100svh] min-h-[500px] flex items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
              }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center text-white px-5 max-w-5xl mx-auto">
                <h1
                  className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight transition-all duration-700 ${index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                    }`}
                  style={{ transitionDelay: "200ms" }}
                >
                  {slide.title}
                </h1>
                <p
                  className={`text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed text-white/90 transition-all duration-700 ${index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                    }`}
                  style={{ transitionDelay: "400ms" }}
                >
                  {slide.subtitle}
                </p>
                <div
                  className={`flex flex-col sm:flex-row gap-3 md:gap-4 justify-center transition-all duration-700 ${index === currentSlide
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                    }`}
                  style={{ transitionDelay: "600ms" }}
                >
                  <Link
                    href={slide.cta1.href}
                    className="btn btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 shadow-xl shadow-rcfs-blue/30 hover:shadow-rcfs-blue/50 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  >
                    {slide.cta1.text}
                  </Link>
                  <Link
                    href={slide.cta2.href}
                    className="btn btn-outline text-base md:text-lg px-6 md:px-8 py-3 md:py-4 border-white/70 text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm active:scale-95 transition-all"
                  >
                    {slide.cta2.text}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows - Hidden on mobile, touch swipe instead */}
        <button
          onClick={prevSlide}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-all z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-all z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight size={28} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-2.5 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${index === currentSlide
                  ? "w-8 h-2.5 bg-white"
                  : "w-2.5 h-2.5 bg-white/50 hover:bg-white/70"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden md:block">
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-2">
            <div className="w-1 h-2.5 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="section-padding bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-rcfs-blue rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rcfs-gold rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {impactStats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="section-header">
            <h2 className="section-title">Our Focus Areas</h2>
            <div className="divider" />
            <p className="section-subtitle">
              We focus on three key areas that drive meaningful change in our
              communities and develop the next generation of leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {focusAreas.map((area, index) => (
              <div
                key={index}
                className="card card-hover group"
              >
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <Image
                    src={area.image}
                    alt={area.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div
                    className={`absolute top-4 left-4 w-10 h-10 md:w-12 md:h-12 ${area.color} rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-white font-bold text-base md:text-lg">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-rcfs-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-rcfs-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rcfs-magenta rounded-full blur-3xl" />
        </div>
        <div className="container-custom text-center relative">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-base md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed text-white/90">
            Join our community of young professionals dedicated to creating
            positive change in Sierra Leone and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link
              href="/membership"
              className="btn bg-white text-rcfs-blue hover:bg-gray-100 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              Become a Member
            </Link>
            <Link
              href="/contact"
              className="btn btn-outline border-white/70 text-white hover:bg-white hover:text-rcfs-blue text-base md:text-lg px-6 md:px-8 py-3 md:py-4 active:scale-95 transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
