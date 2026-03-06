import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-8 md:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Club Information */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-rcfs-gold/30 flex-shrink-0">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Club%20logo.jpg-CPidqMCeSGEZSyDxJVJppvijlcuQEn.jpeg"
                  alt="Rotaract Club Logo"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-base md:text-lg">Rotaract Club</h3>
                <p className="text-xs md:text-sm text-gray-300">Freetown Sunset</p>
              </div>
            </div>
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
              Empowering young professionals to create positive change through
              service, leadership, and international understanding.
            </p>
            <p className="text-rcfs-gold font-semibold text-sm">Service Above Self</p>
          </div>

          {/* Contact Information */}
          <div className="space-y-3 md:space-y-4">
            <h4 className="font-semibold text-sm md:text-lg mb-2 md:mb-4">Contact Us</h4>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center space-x-2 md:space-x-3">
                <Mail size={14} className="text-rcfs-blue flex-shrink-0" />
                <a
                  href="mailto:freetownsunset21@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors text-xs md:text-sm break-all"
                >
                  freetownsunset21@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3">
                <Phone size={14} className="text-rcfs-blue flex-shrink-0" />
                <a
                  href="tel:+23234769022"
                  className="text-gray-300 hover:text-white transition-colors text-xs md:text-sm"
                >
                  +232 34 769 022
                </a>
              </div>
              <div className="flex items-start space-x-2 md:space-x-3">
                <MapPin size={14} className="text-rcfs-blue flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-xs md:text-sm">
                  Freetown, Sierra Leone
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 md:space-y-4">
            <h4 className="font-semibold text-sm md:text-lg mb-2 md:mb-4">Quick Links</h4>
            <div className="space-y-1.5 md:space-y-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/events", label: "Events" },
                { href: "/gallery", label: "Gallery" },
                { href: "/membership", label: "Membership" },
                { href: "/donate", label: "Donate" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-300 hover:text-white transition-colors text-xs md:text-sm py-0.5"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-3 md:space-y-4">
            <h4 className="font-semibold text-sm md:text-lg mb-2 md:mb-4">Follow Us</h4>
            <div className="flex space-x-3 md:space-x-4">
              <a
                href="https://facebook.com/rotaractfreetownsunset"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-10 md:h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-rcfs-blue transition-all active:scale-95"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com/rcfs9101"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-10 md:h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-pink-600 transition-all active:scale-95"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com/company/rotaract-freetown-sunset"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 md:w-10 md:h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-blue-700 transition-all active:scale-95"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
            <div className="text-xs md:text-sm text-gray-400">
              <p>District 9101</p>
              <p>Rotary International</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center">
          <p className="text-gray-400 text-xs md:text-sm">
            © {new Date().getFullYear()} Rotaract Club of Freetown Sunset. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
