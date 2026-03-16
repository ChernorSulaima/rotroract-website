// Events schema - for the Events page
const event = {
    name: "event",
    title: "Event",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Event Title",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title", maxLength: 96 },
        },
        {
            name: "date",
            title: "Event Date",
            type: "datetime",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "endDate",
            title: "End Date (optional)",
            type: "datetime",
        },
        {
            name: "time",
            title: "Time Description",
            type: "string",
            description: 'e.g. "6:00 PM - 8:00 PM"',
        },
        {
            name: "location",
            title: "Location",
            type: "string",
        },
        {
            name: "description",
            title: "Short Description",
            type: "text",
            rows: 3,
        },
        {
            name: "body",
            title: "Full Description",
            type: "array",
            of: [{ type: "block" }],
        },
        {
            name: "image",
            title: "Event Image",
            type: "image",
            options: { hotspot: true },
        },
        {
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "Community Service", value: "community" },
                    { title: "Professional Development", value: "professional" },
                    { title: "Social", value: "social" },
                    { title: "Fundraising", value: "fundraising" },
                    { title: "Meeting", value: "meeting" },
                ],
            },
        },
        {
            name: "attendees",
            title: "Expected Attendees",
            type: "number",
        },
        {
            name: "isFeatured",
            title: "Featured Event",
            type: "boolean",
            initialValue: false,
        },
        {
            name: "impact",
            title: "Impact Summary",
            type: "string",
            description: 'e.g. "200+ children supported" — shown on past events',
        },
        {
            name: "status",
            title: "Status",
            type: "string",
            options: {
                list: [
                    { title: "Upcoming", value: "upcoming" },
                    { title: "Ongoing", value: "ongoing" },
                    { title: "Past", value: "past" },
                ],
            },
            initialValue: "upcoming",
        },
    ],
    orderings: [
        {
            title: "Date Descending",
            name: "dateDesc",
            by: [{ field: "date", direction: "desc" }],
        },
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "date",
            media: "image",
        },
    },
}

export default event
