import { getEvents } from "@/sanity/queries"
import { urlFor } from "@/sanity/client"
import EventsPageClient, { SanityEvent } from "@/components/EventsPageClient"

export const revalidate = 0

export default async function EventsPage() {
  const eventsData = await getEvents()

  // Fallback images mapped by slug for events without Sanity images
  const fallbackImageMap: Record<string, string> = {
    "community-health-outreach": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/69c58881-d67a-406e-90cb-83ee422205fc.JPG-668bYka71jdvl0ZqsxAlqtbbVX3j27.jpeg",
    "professional-development-workshop": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/84fbc412-e03a-4332-aa39-eefff0f82432.JPG-c7TMT72VEd9OPqzSmnc6hB5fSwZYmR.jpeg",
    "environmental-cleanup-drive": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e7d1165e-2ed2-414f-81dc-4ec276bd5558.JPG-vGV2zamb4h7gpQriqkjUESo4yYK3ml.jpeg",
    "back-to-school-2023": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/child%20image.jpg-k30ptNMgI2eg80pOn4odjKGwftD4fR.jpeg",
    "end-polio-now": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/69c58881-d67a-406e-90cb-83ee422205fc.JPG-668bYka71jdvl0ZqsxAlqtbbVX3j27.jpeg",
    "youth-leadership-summit": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5a25d605-2641-4917-b96f-a16c2138e5f3.JPG-SPYwb4CXFyefj4AhXTXUQUUE1XxH99.jpeg",
  }

  // Process events: resolve image URLs, with slug-based fallback
  const events: SanityEvent[] = (eventsData || []).map((event: any) => ({
    ...event,
    imageUrl: event.image
      ? urlFor(event.image).url()
      : (event.slug?.current ? fallbackImageMap[event.slug.current] : null) || null,
    registrationCount: event.registrationCount || 0,
  }))

  // Split into upcoming and past based on date
  const now = new Date()
  const upcomingEvents = events
    .filter((e) => new Date(e.date) >= now || e.status === "upcoming" || e.status === "ongoing")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const pastEvents = events
    .filter((e) => new Date(e.date) < now && e.status !== "upcoming" && e.status !== "ongoing")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <EventsPageClient
      upcomingEvents={upcomingEvents}
      pastEvents={pastEvents}
    />
  )
}
