// FAQ schema - for the Contact page
const faq = {
    name: "faq",
    title: "FAQ",
    type: "document",
    fields: [
        {
            name: "question",
            title: "Question",
            type: "string",
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "answer",
            title: "Answer",
            type: "text",
            rows: 4,
            validation: (Rule: any) => Rule.required(),
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

export default faq
