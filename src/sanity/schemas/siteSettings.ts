// Site Settings schema - global settings like social links, contact info
const siteSettings = {
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    fields: [
        {
            name: "clubName",
            title: "Club Name",
            type: "string",
            initialValue: "Rotaract Club of Freetown Sunset",
        },
        {
            name: "tagline",
            title: "Tagline",
            type: "string",
        },
        {
            name: "logo",
            title: "Club Logo",
            type: "image",
        },
        {
            name: "email",
            title: "Contact Email",
            type: "string",
        },
        {
            name: "phone",
            title: "Contact Phone",
            type: "string",
        },
        {
            name: "address",
            title: "Meeting Address",
            type: "text",
            rows: 2,
        },
        {
            name: "meetingSchedule",
            title: "Meeting Schedule",
            type: "string",
            description: 'e.g. "Every 1st and 3rd Friday, 6:00 PM - 8:00 PM"',
        },
        {
            name: "facebookUrl",
            title: "Facebook URL",
            type: "url",
        },
        {
            name: "instagramUrl",
            title: "Instagram URL",
            type: "url",
        },
        {
            name: "tiktokUrl",
            title: "TikTok URL",
            type: "url",
        },
        {
            name: "linkedinUrl",
            title: "LinkedIn URL",
            type: "url",
        },
    ],
    // Singleton: only one site settings document should exist
    preview: {
        prepare() {
            return { title: "Site Settings" }
        },
    },
}

export default siteSettings
