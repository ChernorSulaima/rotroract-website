import { NextResponse } from "next/server"
import crypto from "crypto"
import { client } from "@/sanity/client"

export async function POST(req: Request) {
    try {
        // 1. Raw body is needed for signature validation
        const rawBody = await req.text()
        const signatureHeader = req.headers.get("x-monime-signature")

        if (!signatureHeader || !process.env.MONIME_WEBHOOK_SECRET) {
            console.error("Missing webhook signature or secret configured")
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // 2. Validate Signature (HMAC-SHA256)
        const hmac = crypto.createHmac("sha256", process.env.MONIME_WEBHOOK_SECRET)
        const digest = hmac.update(rawBody).digest("hex")

        const sigBuffer = Buffer.from(signatureHeader, "hex")
        const digestBuffer = Buffer.from(digest, "hex")

        if (sigBuffer.length !== digestBuffer.length || !crypto.timingSafeEqual(sigBuffer, digestBuffer)) {
            console.error("Webhook signature mismatch")
            return new NextResponse("Invalid signature", { status: 401 })
        }

        // Parse verified body
        const event = JSON.parse(rawBody)

        // Handle completed session
        if (event.type === "checkout_session.completed") {
            const metadata = event.data?.metadata
            if (!metadata || !metadata.transactionId) {
                console.error("Missing metadata or transactionId in webhook", event)
                return new NextResponse("Missing metadata", { status: 400 })
            }

            // 3. Atomically update Sanity transaction to COMPLETED (preventing double credit)
            const writeClient = client.withConfig({
                token: process.env.SANITY_WRITE_TOKEN,
                useCdn: false,
            })

            const transactionId = metadata.transactionId

            // Verify transaction exists and is PENDING
            const existingTx = await writeClient.fetch(`*[_id == $id][0]`, { id: transactionId })

            if (!existingTx) {
                return new NextResponse("Transaction not found", { status: 404 })
            }

            if (existingTx.status === "COMPLETED") {
                console.log(`Transaction ${transactionId} already marked COMPLETED. Ignoring webhook.`)
                return NextResponse.json({ received: true })
            }

            // Mark transaction as COMPLETED
            await writeClient
                .patch(transactionId)
                .set({ status: "COMPLETED" })
                .commit()

            console.log(`Successfully completed transaction ${transactionId}`)
        }

        return NextResponse.json({ received: true })
    } catch (error: any) {
        console.error("Webhook error:", error)
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 })
    }
}
