"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
    { name: "Membership", href: "/membership" },
    { name: "Contact", href: "/contact" },
    { name: "Donate", href: "/donate" },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/98 shadow-lg backdrop-blur-md"
          : "bg-white/95 backdrop-blur-sm"
          }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Club Name */}
            <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3 flex-shrink-0">
              <div className="relative h-11 w-11 sm:h-10 sm:w-10 overflow-hidden rounded-full ring-2 ring-rcfs-gold/40 shadow-sm flex-shrink-0">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Club%20logo.jpg-CPidqMCeSGEZSyDxJVJppvijlcuQEn.jpeg"
                  alt="Rotaract Club of Freetown Sunset Logo"
                  width={88}
                  height={88}
                  className="object-cover"
                  priority
                  quality={95}
                />
              </div>
              <div>
                <span className="text-gray-900 font-bold text-sm leading-tight block">
                  Rotaract Club
                </span>
                <span className="text-rcfs-blue text-xs font-medium leading-tight block">
                  Freetown Sunset
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${pathname === item.href
                    ? "text-rcfs-blue bg-blue-50"
                    : "text-gray-600 hover:text-rcfs-blue hover:bg-gray-50"
                    }`}
                >
                  {item.name}
                  {pathname === item.href && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-rcfs-blue rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden relative w-11 h-11 flex items-center justify-center rounded-xl text-gray-700 hover:text-rcfs-blue hover:bg-gray-100 transition-all active:scale-95"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className={`transition-all duration-300 ${isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"} absolute`}>
                <Menu size={22} />
              </span>
              <span className={`transition-all duration-300 ${isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"} absolute`}>
                <X size={22} />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${isMenuOpen ? "visible" : "invisible"
          }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[min(320px,85vw)] bg-white shadow-2xl transition-transform duration-300 ease-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex flex-col h-full">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-rcfs-gold/30">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Club%20logo.jpg-CPidqMCeSGEZSyDxJVJppvijlcuQEn.jpeg"
                    alt="Logo"
                    width={36}
                    height={36}
                    className="object-cover"
                  />
                </div>
                <span className="font-bold text-gray-900 text-sm">RCFS</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition-colors active:scale-95"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
              <div className="space-y-1">
                {navItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 active:scale-[0.98] ${pathname === item.href
                      ? "text-rcfs-blue bg-blue-50 shadow-sm"
                      : "text-gray-700 hover:bg-gray-50 hover:text-rcfs-blue"
                      }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full mr-3 transition-colors ${pathname === item.href ? "bg-rcfs-blue" : "bg-gray-300"
                      }`} />
                    {item.name}
                    {item.name === "Donate" && (
                      <span className="ml-auto px-2 py-0.5 text-xs font-semibold bg-rcfs-gold/15 text-rcfs-gold rounded-full">
                        ♥
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Menu Footer */}
            <div className="p-5 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-500 text-center font-medium">
                Service Above Self
              </p>
              <p className="text-xs text-gray-400 text-center mt-1">
                District 9101 • Rotary International
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
