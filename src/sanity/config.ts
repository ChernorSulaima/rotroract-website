// Sanity configuration
// Set these in your .env.local file:
//   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
//   NEXT_PUBLIC_SANITY_DATASET=production

export const sanityConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "z0a6znwh",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    // Set to false if you want to use the CDN for faster responses (recommended for production)
    useCdn: process.env.NODE_ENV === "production",
}
