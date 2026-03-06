import { createClient } from "@sanity/client"
import { config } from "dotenv"
config({ path: "/Users/mac/rotroract/.env.local" })

const client = createClient({
    projectId: "z0a6znwh",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false
})

async function run() {
    const data = await client.fetch(`*[_type == "heroSlide"] | order(order asc) {
      _id,
      title,
      image
  }`)
    console.log(JSON.stringify(data, null, 2))
}

run()
