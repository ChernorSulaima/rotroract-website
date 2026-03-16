// GROQ queries for fetching content from Sanity
import { client } from "./client"

// ── Homepage ──────────────────────────────────────────────

export async function getHeroSlides() {
    return client.fetch(`
    *[_type == "heroSlide"] | order(order asc) {
      _id,
      title,
      subtitle,
      image,
      cta1Text,
      cta1Href,
      cta2Text,
      cta2Href,
      order
    }
  `)
}

export async function getImpactStats() {
    return client.fetch(`
    *[_type == "impactStat"] | order(order asc) {
      _id,
      label,
      number,
      iconName,
      order
    }
  `)
}

export async function getFocusAreas() {
    return client.fetch(`
    *[_type == "focusArea"] | order(order asc) {
      _id,
      title,
      description,
      image,
      colorClass,
      order
    }
  `)
}

// ── Events ────────────────────────────────────────────────

export async function getEvents(status?: string) {
    const filter = status
        ? `*[_type == "event" && status == $status]`
        : `*[_type == "event"]`

    return client.fetch(
        `${filter} | order(date asc) {
      _id,
      title,
      slug,
      date,
      endDate,
      time,
      location,
      description,
      image,
      category,
      attendees,
      isFeatured,
      status,
      impact,
      "registrationCount": count(*[_type == "eventRegistration" && event._ref == ^._id])
    }`,
        status ? { status } : {}
    )
}

export async function getEventBySlug(slug: string) {
    return client.fetch(
        `*[_type == "event" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      date,
      endDate,
      time,
      location,
      description,
      body,
      image,
      category,
      attendees,
      isFeatured,
      status
    }`,
        { slug }
    )
}

// ── Gallery ───────────────────────────────────────────────

export async function getGalleryImages(category?: string) {
    const filter = category
        ? `*[_type == "galleryImage" && category == $category]`
        : `*[_type == "galleryImage"]`

    return client.fetch(
        `${filter} | order(date desc, order asc) {
      _id,
      title,
      image,
      category,
      date,
      description,
      order
    }`,
        category ? { category } : {}
    )
}

// ── About / Team ──────────────────────────────────────────

export async function getTeamMembers() {
    return client.fetch(`
    *[_type == "teamMember"] | order(order asc) {
      _id,
      name,
      role,
      image,
      bio,
      order
    }
  `)
}

// ── Contact / FAQs ────────────────────────────────────────

export async function getFAQs() {
    return client.fetch(`
    *[_type == "faq"] | order(order asc) {
      _id,
      question,
      answer,
      order
    }
  `)
}

// ── Site Settings ─────────────────────────────────────────

export async function getSiteSettings() {
    return client.fetch(`
    *[_type == "siteSettings"][0] {
      clubName,
      tagline,
      logo,
      email,
      phone,
      address,
      meetingSchedule,
      facebookUrl,
      instagramUrl,
      tiktokUrl,
      linkedinUrl
    }
  `)
}
