import { defineType, defineField } from "sanity"

export default defineType({
    name: "eventRegistration",
    title: "Event Registrations",
    type: "document",
    fields: [
        defineField({
            name: "event",
            title: "Event",
            type: "reference",
            to: [{ type: "event" }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "name",
            title: "Attendee Name",
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
            name: "createdAt",
            title: "Registration Date",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "event.title",
        },
    },
})
