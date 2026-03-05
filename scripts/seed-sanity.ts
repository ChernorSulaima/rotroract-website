// Seed script to populate Sanity with existing hardcoded content
// Run with: npx tsx scripts/seed-sanity.ts

import { createClient } from "@sanity/client"

const client = createClient({
    projectId: "z0a6znwh",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
    token: process.env.SANITY_WRITE_TOKEN, // needs write token
})

async function seed() {
    console.log("🌱 Seeding Sanity database...\n")

    // ── Site Settings ─────────────────────────────────────
    console.log("📋 Creating Site Settings...")
    await client.createOrReplace({
        _id: "siteSettings",
        _type: "siteSettings",
        clubName: "Rotaract Club of Freetown Sunset",
        tagline: "Service Above Self",
        email: "info@rotaractfreetownsunset.org",
        phone: "+232 76 123 456",
        address: "Manley's Hall, Wilberforce, Freetown, Sierra Leone",
        meetingSchedule: "Every 1st and 3rd Friday, 6:00 PM - 8:00 PM",
        facebookUrl: "https://www.facebook.com/The-Rotaract-Club-of-Freetown-Sunset",
        instagramUrl: "https://www.instagram.com/rcfs9101",
        tiktokUrl: "https://www.tiktok.com/@freetown_sunset",
        linkedinUrl: "https://www.linkedin.com/company/rotaract-club-of-freetown-sunset",
    })
    console.log("  ✅ Site Settings created\n")

    // ── Hero Slides ───────────────────────────────────────
    console.log("🖼️  Creating Hero Slides...")
    const heroSlides = [
        {
            _type: "heroSlide",
            title: "Service Above Self",
            subtitle: "Empowering young professionals to create positive change in their communities across Sierra Leone",
            cta1Text: "Join Our Mission",
            cta1Href: "/membership",
            cta2Text: "Learn More About Us",
            cta2Href: "/about",
            order: 1,
        },
        {
            _type: "heroSlide",
            title: "Building Tomorrow's Leaders",
            subtitle: "Developing leadership skills and fostering international understanding among young professionals",
            cta1Text: "Become a Member",
            cta1Href: "/membership",
            cta2Text: "View Our Events",
            cta2Href: "/events",
            order: 2,
        },
        {
            _type: "heroSlide",
            title: "Making a Difference Together",
            subtitle: "Join us in creating lasting impact through community service and professional development",
            cta1Text: "Get Involved",
            cta1Href: "/contact",
            cta2Text: "See Our Impact",
            cta2Href: "/gallery",
            order: 3,
        },
    ]
    for (const slide of heroSlides) {
        await client.create(slide)
    }
    console.log(`  ✅ ${heroSlides.length} Hero Slides created\n`)

    // ── Impact Stats ──────────────────────────────────────
    console.log("📊 Creating Impact Stats...")
    const impactStats = [
        { _type: "impactStat", label: "Active Members", number: "150+", iconName: "Users", order: 1 },
        { _type: "impactStat", label: "Community Projects", number: "50+", iconName: "Heart", order: 2 },
        { _type: "impactStat", label: "Communities Served", number: "25+", iconName: "Globe", order: 3 },
        { _type: "impactStat", label: "Awards Received", number: "10+", iconName: "Award", order: 4 },
    ]
    for (const stat of impactStats) {
        await client.create(stat)
    }
    console.log(`  ✅ ${impactStats.length} Impact Stats created\n`)

    // ── Focus Areas ───────────────────────────────────────
    console.log("🎯 Creating Focus Areas...")
    const focusAreas = [
        {
            _type: "focusArea",
            title: "Community Service",
            description: "Addressing local needs through sustainable projects that create lasting positive change.",
            colorClass: "bg-rcfs-blue",
            order: 1,
        },
        {
            _type: "focusArea",
            title: "Professional Development",
            description: "Building leadership skills and fostering career growth among young professionals.",
            colorClass: "bg-rcfs-gold",
            order: 2,
        },
        {
            _type: "focusArea",
            title: "International Understanding",
            description: "Promoting peace and cultural exchange through global connections and partnerships.",
            colorClass: "bg-rcfs-magenta",
            order: 3,
        },
    ]
    for (const area of focusAreas) {
        await client.create(area)
    }
    console.log(`  ✅ ${focusAreas.length} Focus Areas created\n`)

    // ── Team Members ──────────────────────────────────────
    console.log("👥 Creating Team Members...")
    const teamMembers = [
        {
            _type: "teamMember",
            name: "John Doe",
            role: "President",
            bio: "Leading our club with passion and dedication to community service.",
            order: 1,
        },
        {
            _type: "teamMember",
            name: "Jane Smith",
            role: "Vice President",
            bio: "Supporting our mission through strategic planning and member engagement.",
            order: 2,
        },
        {
            _type: "teamMember",
            name: "Mike Johnson",
            role: "Secretary",
            bio: "Ensuring effective communication and documentation of our activities.",
            order: 3,
        },
    ]
    for (const member of teamMembers) {
        await client.create(member)
    }
    console.log(`  ✅ ${teamMembers.length} Team Members created\n`)

    // ── Events ────────────────────────────────────────────
    console.log("📅 Creating Events...")
    const events = [
        {
            _type: "event",
            title: "Community Health Outreach",
            slug: { _type: "slug", current: "community-health-outreach" },
            date: "2024-02-15T09:00:00Z",
            time: "9:00 AM - 4:00 PM",
            location: "Wilberforce Community Center",
            description: "Join us for a comprehensive health screening and awareness program for the local community. We'll provide free health checks, distribute health education materials, and connect residents with healthcare resources.",
            category: "community",
            attendees: 45,
            isFeatured: true,
            status: "upcoming",
        },
        {
            _type: "event",
            title: "Professional Development Workshop",
            slug: { _type: "slug", current: "professional-development-workshop" },
            date: "2024-02-22T18:00:00Z",
            time: "6:00 PM - 8:00 PM",
            location: "Manley's Hall, Wilberforce",
            description: "Enhance your leadership and professional skills in this interactive workshop. Topics include effective communication, project management, and career development strategies for young professionals.",
            category: "professional",
            attendees: 30,
            isFeatured: true,
            status: "upcoming",
        },
        {
            _type: "event",
            title: "Environmental Cleanup Drive",
            slug: { _type: "slug", current: "environmental-cleanup-drive" },
            date: "2024-03-01T08:00:00Z",
            time: "8:00 AM - 12:00 PM",
            location: "Aberdeen Beach",
            description: "Help us protect our environment by participating in our monthly beach cleanup. We'll provide all necessary equipment and refreshments.",
            category: "community",
            attendees: 25,
            status: "upcoming",
        },
        {
            _type: "event",
            title: "Back to School Initiative 2023",
            slug: { _type: "slug", current: "back-to-school-2023" },
            date: "2023-09-15T10:00:00Z",
            time: "10:00 AM - 3:00 PM",
            location: "Various Schools in Freetown",
            description: "Successfully distributed school supplies, uniforms, and educational materials to over 200 underprivileged children across 5 schools in Freetown.",
            category: "community",
            attendees: 50,
            status: "past",
        },
        {
            _type: "event",
            title: "End Polio Now Campaign",
            slug: { _type: "slug", current: "end-polio-now" },
            date: "2023-10-24T08:00:00Z",
            time: "8:00 AM - 5:00 PM",
            location: "Central Freetown",
            description: "Organized a city-wide awareness campaign about polio prevention and vaccination. Our team distributed educational materials and supported vaccination drives.",
            category: "community",
            attendees: 75,
            status: "past",
        },
        {
            _type: "event",
            title: "Youth Leadership Summit",
            slug: { _type: "slug", current: "youth-leadership-summit" },
            date: "2023-11-18T09:00:00Z",
            time: "9:00 AM - 6:00 PM",
            location: "Freetown International Conference Center",
            description: "Hosted a comprehensive leadership development summit for young professionals across Sierra Leone.",
            category: "professional",
            attendees: 120,
            status: "past",
        },
    ]
    for (const event of events) {
        await client.create(event as any)
    }
    console.log(`  ✅ ${events.length} Events created\n`)

    // ── FAQs ──────────────────────────────────────────────
    console.log("❓ Creating FAQs...")
    const faqs = [
        {
            _type: "faq",
            question: "How can I join the Rotaract Club of Freetown-Sunset?",
            answer: "To join, you need to attend at least 2 meetings to become a Potential Rotaractor, then participate in 8 or more meetings to get fully involved. After meeting these requirements, you'll be eligible for induction upon paying the required dues.",
            order: 1,
        },
        {
            _type: "faq",
            question: "When and where do you meet?",
            answer: "We meet every 1st and 3rd Friday from 6:00 PM to 8:00 PM at Manley's Hall, Wilberforce, Freetown.",
            order: 2,
        },
        {
            _type: "faq",
            question: "What is the age requirement for membership?",
            answer: "Rotaract is for young adults typically aged 18-30 years old. We welcome young professionals and students who are committed to service and leadership.",
            order: 3,
        },
        {
            _type: "faq",
            question: "Are there membership fees?",
            answer: "Yes, there are induction dues required for membership. Please contact our treasurer Naomi Mansaray or attend a meeting for current fee structure information.",
            order: 4,
        },
        {
            _type: "faq",
            question: "What kind of projects does the club undertake?",
            answer: "We focus on community service projects including education support, healthcare initiatives, environmental sustainability, and professional development programs. Recent projects include our Back to School initiative and End Polio Now campaign.",
            order: 5,
        },
    ]
    for (const faq of faqs) {
        await client.create(faq)
    }
    console.log(`  ✅ ${faqs.length} FAQs created\n`)

    // ── Gallery Images ────────────────────────────────────
    console.log("🖼️  Creating Gallery entries (text only, images need manual upload)...")
    const galleryImages = [
        { _type: "galleryImage", title: "Community Outreach", category: "Community Service", date: "2023-11-18", description: "Members visiting rural communities to assess needs and provide support", order: 1 },
        { _type: "galleryImage", title: "Professional Networking Event", category: "Events", date: "2023-12-02", description: "Members networking at our annual professional development gathering", order: 2 },
        { _type: "galleryImage", title: "Youth Leadership Workshop", category: "Professional Development", date: "2023-10-15", description: "Empowering young people with leadership and entrepreneurship skills", order: 3 },
        { _type: "galleryImage", title: "Rural Community Project", category: "Community Service", date: "2023-11-18", description: "Visiting rural communities to provide healthcare and educational support", order: 4 },
        { _type: "galleryImage", title: "Training Session", category: "Events", date: "2023-09-20", description: "Professional development and capacity building session for members", order: 5 },
        { _type: "galleryImage", title: "Education Support Program", category: "Community Service", date: "2023-09-15", description: "Supporting children's education through our scholarship program", order: 6 },
        { _type: "galleryImage", title: "End Polio Now Campaign", category: "Community Service", date: "2023-10-24", description: "Polio awareness campaign and community health initiative", order: 7 },
        { _type: "galleryImage", title: "Back to School Project", category: "Community Service", date: "2023-09-15", description: "Providing school supplies and support to underprivileged children", order: 8 },
        { _type: "galleryImage", title: "Club Meeting", category: "Events", date: "2023-12-05", description: "Regular club meeting with members and guests", order: 9 },
        { _type: "galleryImage", title: "Community Partnership", category: "Community Service", date: "2023-11-25", description: "Building partnerships with local organizations and community leaders", order: 10 },
    ]
    for (const image of galleryImages) {
        await client.create(image)
    }
    console.log(`  ✅ ${galleryImages.length} Gallery entries created\n`)

    console.log("🎉 Seeding complete! You can now upload images via the Sanity Studio at /studio")
    console.log("   Note: Hero slides, focus areas, team members, and gallery images need their photos uploaded manually in the Studio.")
}

seed().catch((err) => {
    console.error("❌ Seeding failed:", err)
    process.exit(1)
})
