import { createClient } from "next-sanity"
import createImageUrlBuilder from "@sanity/image-url"
import { sanityConfig } from "./config"

export const client = createClient({
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
    apiVersion: sanityConfig.apiVersion,
    useCdn: false, // Set to false to bypass CDN caching delays for fresh data
})

const builder = createImageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
    return builder.image(source)
}
