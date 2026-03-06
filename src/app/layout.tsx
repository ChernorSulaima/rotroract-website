import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { NotificationProvider } from "@/components/NotificationProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rotaract Club of Freetown Sunset | Empowering Young Leaders",
  description:
    "Join the Rotaract Club of Freetown Sunset in Sierra Leone. We empower young professionals through service, leadership development, and community impact projects.",
  keywords: "Rotaract, Freetown, Sierra Leone, community service, leadership, young professionals, volunteer, charity",
  authors: [{ name: "Rotaract Club of Freetown Sunset" }],
  openGraph: {
    title: "Rotaract Club of Freetown Sunset",
    description: "Empowering young leaders through service and community impact in Sierra Leone",
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotificationProvider>
          <Navigation />
          <main className="pt-16">{children}</main>
          <Footer />
        </NotificationProvider>
      </body>
    </html>
  )
}
