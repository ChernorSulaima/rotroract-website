import { NextResponse } from "next/server"
import { client } from "@/sanity/client"
import crypto from "crypto"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { amount, donorName, donorEmail, type = "donation" } = body

        if (!amount || amount <= 0) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
        }

        if (!process.env.MONIME_API_KEY || !process.env.MONIME_SPACE_ID) {
            console.error("Monime API keys are missing")
            return NextResponse.json({ error: "Payment gateway not configured" }, { status: 500 })
        }

        // 1. Create PENDING transaction in Sanity using write token
        // Our normal client from "@/sanity/client" might not have a write token if configured only for reads
        // Since we're in an API route, let's create a server-side client with the write token
        const writeClient = client.withConfig({
            token: process.env.SANITY_WRITE_TOKEN,
            useCdn: false,
        })

        const reference = `TX_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

        const sanityTransaction = await writeClient.create({
            _type: "transaction",
            reference,
            amount: Number(amount),
            type,
            status: "PENDING",
            donorName,
            donorEmail,
        })

        // 2. Call Monime to create a payment code
        const monimePayload = {
            amount: Number(amount) * 100, // CRITICAL: Minor units as per guide!
            provider: body.provider === "Afrimoney" ? "AFRICELL" : "ORANGE",
            phoneNumber: body.phoneNumber,
            customerName: donorName || "Guest Donor",
            duration: "1h",
            mode: "one_time",
            metadata: {
                transactionId: sanityTransaction._id,
                reference: reference,
                type,
            },
        }

        const idempotencyKey = crypto.randomUUID()

        const monimeResponse = await fetch("https://api.monime.io/v1/payment-codes", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.MONIME_API_KEY}`,
                "Monime-Space-Id": process.env.MONIME_SPACE_ID,
                "Idempotency-Key": idempotencyKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(monimePayload),
        })

        if (!monimeResponse.ok) {
            const errorText = await monimeResponse.text()
            console.error("Monime API Error:", errorText)

            // Update transaction to failed
            await writeClient
                .patch(sanityTransaction._id)
                .set({ status: "FAILED" })
                .commit()

            return NextResponse.json({ error: "Failed to initialize payment gateway" }, { status: 500 })
        }

        const monimeData = await monimeResponse.json()
        const ussdCode = monimeData.ussdCode || monimeData.result?.ussdCode || monimeData.data?.ussdCode
        const pId = monimeData.id || monimeData.result?.id || monimeData.data?.id

        if (!ussdCode) {
            throw new Error("Missing ussdCode in Monime response")
        }

        // Save session/payment code id to transaction
        if (pId) {
            await writeClient
                .patch(sanityTransaction._id)
                .set({ monimeSessionId: pId })
                .commit()
        }

        return NextResponse.json({ ussdCode, transactionId: sanityTransaction._id })

    } catch (error: any) {
        console.error("Monime init error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
