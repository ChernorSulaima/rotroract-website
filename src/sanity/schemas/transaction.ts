export default {
    name: "transaction",
    title: "Transaction",
    type: "document",
    fields: [
        {
            name: "reference",
            title: "Reference ID",
            type: "string",
        },
        {
            name: "amount",
            title: "Amount (SLE)",
            type: "number",
        },
        {
            name: "type",
            title: "Transaction Type",
            type: "string",
            options: {
                list: [
                    { title: "Donation", value: "donation" },
                    { title: "Membership Dues", value: "membership" },
                ],
            },
        },
        {
            name: "status",
            title: "Status",
            type: "string",
            options: {
                list: [
                    { title: "Pending", value: "PENDING" },
                    { title: "Completed", value: "COMPLETED" },
                    { title: "Failed", value: "FAILED" },
                ],
            },
            initialValue: "PENDING",
        },
        {
            name: "donorName",
            title: "Donor / Member Name",
            type: "string",
        },
        {
            name: "donorEmail",
            title: "Donor / Member Email",
            type: "string",
        },
        {
            name: "monimeSessionId",
            title: "Monime Session ID",
            type: "string",
        },
    ],
    preview: {
        select: {
            title: "donorName",
            subtitle: "status",
            amount: "amount",
        },
        prepare(selection: any) {
            const { title, subtitle, amount } = selection
            return {
                title: `${title} - SLE ${amount}`,
                subtitle: subtitle,
            }
        },
    },
}
