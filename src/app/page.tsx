import { getHeroSlides, getImpactStats, getFocusAreas } from "@/sanity/queries"
import { urlFor } from "@/sanity/client"
import HomePageClient from "@/components/HomePageClient"

export const revalidate = 0 // Disable cache temporarily to see immediate updates

export default async function HomePage() {
  const slidesData = await getHeroSlides()
  const statsData = await getImpactStats()
  const focusAreasData = await getFocusAreas()

  // Process slides into an easy format for the client
  const parsedSlides = (slidesData || []).map((slide: any) => ({
    ...slide,
    imageUrl: slide.image ? urlFor(slide.image).url() : null
  }))

  const parsedStats = statsData || []

  // Process focus areas
  const parsedFocusAreas = (focusAreasData || []).map((area: any) => ({
    ...area,
    imageUrl: area.image ? urlFor(area.image).url() : null
  }))

  return (
    <HomePageClient
      slides={parsedSlides}
      stats={parsedStats}
      focusAreas={parsedFocusAreas}
    />
  )
}
