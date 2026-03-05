// Hero Slides schema - controls the homepage hero carousel
const heroSlide = {
    name: "heroSlide",
    title: "Hero Slide",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "subtitle",
            title: "Subtitle",
            type: "text",
            rows: 3,
        },
        {
            name: "image",
            title: "Background Image",
            type: "image",
            options: { hotspot: true },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "cta1Text",
            title: "Primary Button Text",
            type: "string",
        },
        {
            name: "cta1Href",
            title: "Primary Button Link",
            type: "string",
        },
        {
            name: "cta2Text",
            title: "Secondary Button Text",
            type: "string",
        },
        {
            name: "cta2Href",
            title: "Secondary Button Link",
            type: "string",
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

export default heroSlide
