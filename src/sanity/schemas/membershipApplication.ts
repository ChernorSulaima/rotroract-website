import { defineType, defineField } from "sanity"

export default defineType({
    name: "membershipApplication",
    title: "Membership Applications",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Full Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: "phone",
            title: "Phone Number",
            type: "string",
        }),
        defineField({
            name: "profession",
            title: "Profession/Occupation",
            type: "string",
        }),
        defineField({
            name: "motivation",
            title: "Motivation to Join",
            type: "text",
        }),
        defineField({
            name: "status",
            title: "Application Status",
            type: "string",
            options: {
                list: [
                    { title: "Pending", value: "pending" },
                    { title: "Reviewed", value: "reviewed" },
                    { title: "Accepted", value: "accepted" },
                    { title: "Declined", value: "declined" },
                ],
                layout: "radio",
            },
            initialValue: "pending",
        }),
        defineField({
            name: "createdAt",
            title: "Submitted Date",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "status",
        },
    },
})
