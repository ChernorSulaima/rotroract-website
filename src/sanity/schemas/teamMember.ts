// Team Member schema - for the About page leadership section
const teamMember = {
    name: "teamMember",
    title: "Team Member",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Full Name",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "role",
            title: "Role / Position",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "image",
            title: "Photo",
            type: "image",
            options: { hotspot: true },
        },
        {
            name: "bio",
            title: "Short Bio",
            type: "text",
            rows: 3,
        },
        {
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Lower numbers appear first",
        },
    ],
    orderings: [
        {
            title: "Display Order",
            name: "orderAsc",
            by: [{ field: "order", direction: "asc" }],
        },
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "role",
            media: "image",
        },
    },
}

export default teamMember
