// Gallery Image schema - for the Gallery page
const galleryImage = {
    name: "galleryImage",
    title: "Gallery Image",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title / Caption",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            options: { hotspot: true },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "Community Service", value: "Community Service" },
                    { title: "Events", value: "Events" },
                    { title: "Professional Development", value: "Professional Development" },
                    { title: "Social", value: "Social" },
                    { title: "Awards", value: "Awards" },
                ],
            },
        },
        {
            name: "date",
            title: "Date Taken",
            type: "date",
        },
        {
            name: "description",
            title: "Description",
            type: "text",
            rows: 2,
        },
        {
            name: "order",
            title: "Display Order",
            type: "number",
        },
    ],
    orderings: [
        {
            title: "Date Descending",
            name: "dateDesc",
            by: [{ field: "date", direction: "desc" }],
        },
        {
            title: "Display Order",
            name: "orderAsc",
            by: [{ field: "order", direction: "asc" }],
        },
    ],
    preview: {
        select: {
            title: "title",
            subtitle: "category",
            media: "image",
        },
    },
}

export default galleryImage
