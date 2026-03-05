// Impact Stats schema - the numbers section on the homepage
const impactStat = {
    name: "impactStat",
    title: "Impact Stat",
    type: "document",
    fields: [
        {
            name: "label",
            title: "Label",
            type: "string",
            description: 'e.g. "Active Members", "Community Projects"',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "number",
            title: "Number",
            type: "string",
            description: 'e.g. "150+", "50+"',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: "iconName",
            title: "Icon Name",
            type: "string",
            description: "Lucide icon name: Users, Heart, Globe, Award, etc.",
            options: {
                list: [
                    { title: "Users", value: "Users" },
                    { title: "Heart", value: "Heart" },
                    { title: "Globe", value: "Globe" },
                    { title: "Award", value: "Award" },
                    { title: "Target", value: "Target" },
                    { title: "Star", value: "Star" },
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

export default impactStat
