"use server"

import { createClient } from "next-sanity"
import { sanityConfig } from "@/sanity/config"

// Create a Sanity client with the write token for server-side mutations
const writeClient = createClient({
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
    apiVersion: sanityConfig.apiVersion,
    useCdn: false,
    token: process.env.SANITY_WRITE_TOKEN,
})

export async function submitContactMessage(data: { name: string, email: string, phone?: string, subject?: string, message: string }) {
    try {
        await writeClient.create({
            _type: 'contactMessage',
            ...data
        })
        return { success: true }
    } catch (error) {
        console.error("Error submitting contact message:", error)
        return { success: false, error: "Failed to submit message" }
    }
}

export async function submitMembershipApplication(data: { name: string, email: string, phone?: string, profession?: string, motivation?: string }) {
    try {
        await writeClient.create({
            _type: 'membershipApplication',
            ...data,
            status: 'pending' // Enforce initial status
        })
        return { success: true }
    } catch (error) {
        console.error("Error submitting membership application:", error)
        return { success: false, error: "Failed to sumbit application" }
    }
}

export async function submitEventRegistration(data: { name: string, email: string, phone?: string, eventName: string }) {
    try {
        await writeClient.create({
            _type: 'eventRegistration',
            eventName: data.eventName,
            name: data.name,
            email: data.email,
            phone: data.phone
        })
        return { success: true }
    } catch (error) {
        console.error("Error submitting event registration:", error)
        return { success: false, error: "Failed to register for event" }
    }
}
