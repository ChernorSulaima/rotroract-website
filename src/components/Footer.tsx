import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Club Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Club%20logo.jpg-CPidqMCeSGEZSyDxJVJppvijlcuQEn.jpeg"
                alt="Rotaract Club Logo"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-lg">Rotaract Club</h3>
                <p className="text-sm text-gray-300">Freetown Sunset</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering young professionals to create positive change through service, leadership, and international
              understanding.
            </p>
            <p className="text-rcfs-gold font-semibold">Service Above Self</p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-rcfs-blue flex-shrink-0" />
                <a
                  href="mailto:info@rotaractfreetownsunset.org"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  info@rotaractfreetownsunset.org
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-rcfs-blue flex-shrink-0" />
                <a href="tel:+23276123456" className="text-gray-300 hover:text-white transition-colors text-sm">
                  +232 76 123 456
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-rcfs-blue flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Freetown, Sierra Leone</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors text-sm">
                About Us
              </Link>
              <Link href="/events" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Events
              </Link>
              <Link href="/gallery" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Gallery
              </Link>
              <Link href="/membership" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Membership
              </Link>
              <Link href="/donate" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Donate
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/rotaractfreetownsunset"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/rotaractfreetownsunset"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com/company/rotaract-freetown-sunset"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
            <div className="text-sm text-gray-400">
              <p>District 9101</p>
              <p>Rotary International</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2024 Rotaract Club of Freetown Sunset. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
