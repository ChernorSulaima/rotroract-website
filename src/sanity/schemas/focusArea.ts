// Focus Areas schema - the 3 pillars on the homepage
const focusArea = {
    name: "focusArea",
    title: "Focus Area",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            options: { hotspot: true },
        },
        {
            name: "colorClass",
            title: "Color Class",
            type: "string",
            description: "Tailwind background color class, e.g. bg-rcfs-blue",
            options: {
                list: [
                    { title: "Blue", value: "bg-rcfs-blue" },
                    { title: "Gold", value: "bg-rcfs-gold" },
                    { title: "Magenta", value: "bg-rcfs-magenta" },
                ],
            },
        },
        {
            name: "order",
            title: "Display Order",
            type: "number",
        },
    ],
    orderings: [
        {
            title: "Display Order",
            name: "orderAsc",
            by: [{ field: "order", direction: "asc" }],
        },
    ],
}

export default focusArea
